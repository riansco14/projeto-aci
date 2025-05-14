from sqlalchemy import Column, Integer, String
from config.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    nome = Column(String)
    senha = Column(String)
    qntd_tokens = Column(Integer, default=0)
