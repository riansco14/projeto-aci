from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    nome: str
    senha: str

class UserLogin(BaseModel):
    email: str
    senha: str

class UserResponse(BaseModel):
    id: int
    email: str
    nome: str
    qntd_tokens: int

    class Config:
        orm_mode = True
