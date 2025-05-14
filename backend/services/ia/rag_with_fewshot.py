import os

from llama_index.core import Settings, VectorStoreIndex
from llama_index.core.schema import TextNode
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core.prompts import RichPromptTemplate
from sqlalchemy.orm import Session

from config.env import openai_key
from repositories import user_repository
from services.sql.sql_exec import exec_sql_command

import numpy as np

from utils.utils import count_tokens

# Configurar chave
os.environ["OPENAI_API_KEY"] = openai_key

text_to_sql_prompt_tmpl_str = """\
Você é um especialista em SQL. Receberá uma consulta em linguagem natural e seu trabalho é convertê-la em uma consulta SQL.
Você tem o seguinte banco de dados:
<database>
TABLE "notas" (
	"ID"	INTEGER,
	"id_estudante"	TEXT,
	"nome_curso"	TEXT,
	"fk_situacao_id"	TEXT,
	"media_final"	TEXT,
	"periodo_letivo"	TEXT,
	"nome_disciplina"	TEXT,
	FOREIGN KEY("fk_situacao_id") REFERENCES "situacao_nota_disciplina",
	PRIMARY KEY("ID" AUTOINCREMENT)
);
TABLE "situacao_nota_disciplina" (
	"id"	TEXT,
	"descricao"	TEXT,
	PRIMARY KEY("id")
);
</database>

Abaixo estão alguns exemplos de como você deve converter linguagem natural em SQL:
<examples>
{{ examples }}
</examples>

Agora é a sua vez.

Consulta: {{ query_str }}
SQL:
"""

# Set global default LLM and embed model
Settings.llm = OpenAI(model="gpt-4o-mini")
Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small")

# Setup few-shot examples
example_nodes = [
    TextNode(
        text="Query: Me diga qual foi a maior nota no periodo de 2024.1 na disciplina de PORTUGUÊS INSTRUMENTAL ?\nSQL: SELECT MAX(media_final) AS maior_nota FROM notas WHERE periodo_letivo = '2024.1' AND nome_disciplina = 'PORTUGUÊS INSTRUMENTAL';"
    ),
    TextNode(
        text="Query: Me diga qual foi a media da turma no periodo de 2024.1 na disciplina de PORTUGUÊS INSTRUMENTAL ?\nSQL: SELECT AVG(media_final) AS media_turma FROM notas WHERE periodo_letivo = '2024.1' AND nome_disciplina = 'PORTUGUÊS INSTRUMENTAL';"
    ),

    TextNode(
        text="Query: Me retorne as medias das turmas em PORTUGUÊS INSTRUMENTAL durante todos os periodos disponiveis?\nSQL: SELECT nome_disciplina, AVG(media_final) AS media_turma FROM notas WHERE nome_disciplina = 'PORTUGUÊS INSTRUMENTAL' GROUP BY periodo_letivo;"
    ),
    TextNode(
        text="Query: Me mostre as notas que tiveram a situação de APROVADO na disciplina de PORTUGUÊS INSTRUMENTAL no periodo de 2024.1\nSQL: SELECT * FROM notas INNER JOIN situacao_nota_disciplina ON notas.fk_situacao_id = situacao_nota_disciplina.id WHERE notas.periodo_letivo = '2024.1' AND notas.nome_disciplina = 'PORTUGUÊS INSTRUMENTAL' AND situacao_nota_disciplina.descricao ='APROVADO';"
    ),

]

# Create index
index = VectorStoreIndex(nodes=example_nodes)

# Create retriever
retriever = index.as_retriever(similarity_top_k=1)


def get_examples_fn(**kwargs):
    query = kwargs["query_str"]
    examples = retriever.retrieve(query)
    return "\n\n".join(node.text for node in examples)


prompt_tmpl = RichPromptTemplate(
    text_to_sql_prompt_tmpl_str,
    function_mappings={"examples": get_examples_fn},
)


def gerar_prompt_interpretacao(pergunta: str, resultado: list) -> str:
    # Verifica se é uma lista de listas (array 2D)
    if all(isinstance(item, (list, tuple)) for item in resultado):
        # É uma tabela (matriz)
        resultado_formatado = "\n".join(str(linha) for linha in resultado)
        tipo_resultado = "uma tabela de dados"
    else:
        # É uma lista simples
        resultado_formatado = str(resultado)
        tipo_resultado = "um valor ou uma lista simples"

    prompt = f"""
Você é um assistente inteligente que ajuda a interpretar respostas de bancos de dados.

Pergunta feita pelo usuário:
"{pergunta}"

Resposta do banco ({tipo_resultado}):
{resultado_formatado}

Com base nesses dados, explique o que o resultado significa de maneira clara e resumida.
"""
    return prompt


def convert_to_np_array(arr):
    try:
        if arr is None:
            raise ValueError("A lista está vazia (None).")
        if not isinstance(arr, (list, tuple)):
            raise TypeError(f"Tipo inválido: {type(arr)}. Esperado list, tuple ou ndarray.")

        array = np.array(arr)

        return array

    except Exception as e:
        raise ValueError("Problema durante a conversão do tipo")


def generate_response_from_prompt(db: Session, user_id: str, query_str: str) -> dict:
    prompt = prompt_tmpl.format(
        query_str=query_str
    )
    response = Settings.llm.complete(prompt)
    qntd_tokens = count_tokens(prompt)
    user_repository.add_tokens_in_user(db, user_id, qntd_tokens)
    print(response.text)
    result_query_sql = exec_sql_command(response.text)

    result_np_array = convert_to_np_array(result_query_sql["rows"])

    if result_np_array.size == 0 or result_np_array.size == 1 and result_np_array.item() is None:
        return {"resposta": "Sem resultados para essa consulta"}

    if result_np_array.size == 1:
        prompt_to_interpreter = gerar_prompt_interpretacao(query_str, result_query_sql["rows"])
        response_interpreter = Settings.llm.complete(prompt_to_interpreter)
        qntd_tokens_interpreter = count_tokens(prompt_to_interpreter)
        user_repository.add_tokens_in_user(db, user_id, qntd_tokens_interpreter)
        return {"resposta": str(response_interpreter.text), "shape": 1}

    print(result_np_array.size)
    if result_np_array.size <= 12:
        prompt_to_interpreter = gerar_prompt_interpretacao(query_str, result_query_sql["rows"])
        response_interpreter = Settings.llm.complete(prompt_to_interpreter)
        qntd_tokens_interpreter = count_tokens(prompt_to_interpreter)
        user_repository.add_tokens_in_user(db, user_id, qntd_tokens_interpreter)
        return {"resposta": str(response_interpreter.text), "colunas": result_query_sql["columns"] ,"shape": result_np_array.shape, "dados": result_query_sql["rows"]}
    else:
        return {"resposta": None, "shape": result_np_array.shape,"colunas": result_query_sql["columns"] , "dados": result_query_sql["rows"]}

    return {}
