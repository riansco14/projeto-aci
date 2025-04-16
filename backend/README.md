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

1. **Clone o projeto**:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd nome-do-projeto
```

2. **Clone o projeto**:

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
