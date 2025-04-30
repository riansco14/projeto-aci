# main.py
from typing import Optional, Any, Union

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from services.ia.rag_with_fewshot import generate_response_from_prompt

#from services.ia.llama_query import generate_response_from_prompt

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["*"] para liberar geral (menos seguro)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class QueryRequest(BaseModel):
    pergunta: str

class QueryResponse(BaseModel):
    resposta: Optional[str] = None
    shape: Optional[Union[int,tuple[int, ...]]] = None
    colunas: Optional[list[Any]] = None
    dados: Optional[list[list[Any]]] = None


@app.post("/consultar", response_model=QueryResponse)
def consultar(request: QueryRequest):
    try:
        resultado = generate_response_from_prompt(request.pergunta)
        return QueryResponse(**resultado)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
