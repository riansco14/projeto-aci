# 🧠 API de Consulta com FastAPI

Esta API recebe uma pergunta, gera um sql e consulta a base de dados.

---

## 🚀 Tecnologias utilizadas

- [FastAPI](https://fastapi.tiangolo.com/)
- [LlamaIndex](https://www.llamaindex.ai/)
- [OpenAI API](https://platform.openai.com/)
- [SQLite + SQLAlchemy](https://www.sqlalchemy.org/)

---

## 📦 Instalação

1. **Acesse a pasta do backend:**:

```bash
cd backend
```

2. **Instalar bibliotecas**:

```bash
pip install -r requirements.txt
```

3. **Crie um arquivo .env na raiz com as chaves necessárias**:

```bash
OPENAI_API_KEY=sk-sua-chave-openai-aqui
```

4. **Crie um arquivo .env na raiz com as chaves necessárias**:

```bash
uvicorn main:app --reload
```

Por padrão, estará em: http://127.0.0.1:8000

Link Python 3.12:
https://www.python.org/downloads/release/python-3120/
