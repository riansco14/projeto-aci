from dotenv import load_dotenv
import os

# Carrega variáveis do .env
load_dotenv()

# Agora você pode acessar normalmente
openai_key = os.getenv("OPENAI_API_KEY")

