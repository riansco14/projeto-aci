import tiktoken
from passlib.hash import pbkdf2_sha256

def hash_password(password: str) -> str:
    return pbkdf2_sha256.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pbkdf2_sha256.verify(plain_password, hashed_password)

def count_tokens(query: str):
    encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")

    tokens = encoding.encode(query)
    qntd_tokens = len(tokens)

    return qntd_tokens