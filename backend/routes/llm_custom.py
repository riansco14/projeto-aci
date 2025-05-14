from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db
from schemas.query import QueryResponse, QueryRequest
from services.ia.rag_with_fewshot import generate_response_from_prompt
from utils.auth_utils import verificar_token

router = APIRouter(prefix="/consultar", tags=["llm_custom"])

@router.post("/", response_model=QueryResponse)
def consultar(request: QueryRequest, user_id = Depends(verificar_token), db: Session = Depends(get_db)):
    try:
        resultado = generate_response_from_prompt(db, user_id, request.pergunta)
        return QueryResponse(**resultado)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
