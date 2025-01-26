from fastapi import FastAPI, BackgroundTasks, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel

from src.config import config, logger
from src.mail_service import resend_form_data_to_email
from src.captcha_service import captcha_dependency


app = FastAPI(
    debug=config.DEBUG,
    redoc_url="/redoc" if config.DEBUG else None,
    docs_url="/docs" if config.DEBUG else None,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=config.ALLOWED_METHODS,
    allow_headers=config.ALLOWED_HEADERS,
)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=config.ALLOWED_HOSTS
)


class FormData(BaseModel):
    name: str
    phone: str
    email: str
    message: str = None


@app.get("/api/health")
async def health():
    logger.debug("Received request to check health.")
    return {"status": "ok"}


@app.post(
    "/api/send_form",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(captcha_dependency)],
)
async def send_form(
    form_data: FormData,
    background_tasks: BackgroundTasks,
):
    logger.debug("Received request to send form.")
    background_tasks.add_task(
        resend_form_data_to_email,
        form_data.name,
        form_data.phone,
        form_data.email,
        form_data.message,
    )
    logger.debug("Completed request to send form.")
