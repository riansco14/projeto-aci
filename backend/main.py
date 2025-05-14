# main.py
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from config.database import Base, engine
from routes import auth, llm_custom

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no banco
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(llm_custom.router)


