import os

from sqlalchemy import text, create_engine


# Configurar engine
base_wta = os.path.join(os.path.dirname(__file__), "../../database.db")
engine = create_engine("sqlite:///" + base_wta)

PROIBIDOS = [
    "INSERT", "UPDATE", "ALTER TABLE", "CREATE TABLE",
    "DELETE", "TRUNCATE TABLE", "DROP TABLE", "DROP DATABASE", "DROP COLUMN"
]

def clean_query(query_markdown: str) -> str:
    # Remove o início e o fim do bloco
    return query_markdown.strip('`').replace('sql', '').strip()
def exec_sql_command(query):
    query_upper = query.upper()

    if "sql" in query:
        query = clean_query(query)

    if "SELECT" not in query_upper:
        raise ValueError("Consulta inválida.")

    if any(comando in query_upper for comando in PROIBIDOS):
        raise ValueError("Comando SQL proibido detectado na query. Execução bloqueada.")



    with engine.connect() as conn:
        result = conn.execute(text(query))

        columns = list(result.keys())
        rows = [list(row) for row in result.fetchall()]
    return {"columns": columns, "rows": rows}

