from typing import Optional, Any, Union
from pydantic import BaseModel


class QueryRequest(BaseModel):
    pergunta: str

class QueryResponse(BaseModel):
    resposta: Optional[str] = None
    shape: Optional[Union[int,tuple[int, ...]]] = None
    colunas: Optional[list[Any]] = None
    dados: Optional[list[list[Any]]] = None
