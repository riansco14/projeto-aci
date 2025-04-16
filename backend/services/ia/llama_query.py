# llama_query.py
import os
from llama_index.core import SQLDatabase, VectorStoreIndex
from llama_index.llms.openai import OpenAI
from sqlalchemy import inspect, create_engine
from llama_index.core.indices.struct_store.sql_query import SQLTableRetrieverQueryEngine
from llama_index.core.objects import SQLTableNodeMapping, ObjectIndex, SQLTableSchema

from config.env import openai_key

# Configurar chave
os.environ["OPENAI_API_KEY"] = openai_key

# Configurar engine
base_wta = os.path.join(os.path.dirname(__file__), "../../database.db")
engine = create_engine("sqlite:///" + base_wta)

table_names = inspect(engine).get_table_names()


# Preparar o SQLDatabase e o LLM
llm = OpenAI(temperature=0.1, model="gpt-3.5-turbo")
sql_database = SQLDatabase(engine, include_tables=["notas", "situacao_nota_disciplina"])

# Criar schema
table_node_mapping = SQLTableNodeMapping(sql_database)
table_schema_objs = [
    SQLTableSchema(
        table_name="notas",
        context_str="Esta tabela armazena o desempenho dos estudantes em disciplinas. Contém: 'id_estudante', 'nome_curso', 'id_situacao', 'media_final', 'periodo_letivo'."
    ),
    SQLTableSchema(
        table_name="situacao_nota_disciplina",
        context_str="Tabela com tipos de situação como aprovado, reprovado etc. Campos: 'id' e 'descricao'."
    ),
]

obj_index = ObjectIndex.from_objects(table_schema_objs, table_node_mapping, VectorStoreIndex)

# Criar engine de consulta
query_engine = SQLTableRetrieverQueryEngine(sql_database, obj_index.as_retriever(similarity_top_k=1))


def generate_response_from_prompt(query_str: str) -> str:
    response = query_engine.query(query_str)
    return str(response)
