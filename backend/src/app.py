from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1"]
)


class FormData(BaseModel):
    name: str
    phone: str
    email: str
    message: str = None


@app.post("/api/send_form")
def send_form(
    form_data: FormData,
    token: str = None,
):
    # TODO: check capcha
    # TODO: send form data to email
    return {"message": "Hello, World!"}
