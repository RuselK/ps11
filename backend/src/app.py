from fastapi import FastAPI, BackgroundTasks, status, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel

from src.config import config, logger
from src.mail_service import resend_form_data_to_email
from src.captcha_service import check_captcha


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


@app.post("/api/send_form", status_code=status.HTTP_204_NO_CONTENT)
async def send_form(
    form_data: FormData,
    token: str,
    background_tasks: BackgroundTasks,
    request: Request,
):
    print(request.client.host)
    forwarded_ip = request.headers.get("x-forwarded-for")
    print(f"Forwarded IP: {forwarded_ip}")
    logger.debug("Received request to send form.")
    if not await check_captcha(token, request.client.host):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid captcha",
        )
    background_tasks.add_task(
        resend_form_data_to_email,
        form_data.name,
        form_data.phone,
        form_data.email,
        form_data.message,
    )
    logger.debug("Completed request to send form.")
