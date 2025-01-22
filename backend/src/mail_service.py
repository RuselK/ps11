from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi_mail.errors import ConnectionErrors
from pydantic import BaseModel

from src.config import config, logger


mail_config = ConnectionConfig(
    MAIL_USERNAME=config.EMAIL_HOST_USER,
    MAIL_PASSWORD=config.EMAIL_HOST_PASSWORD,
    MAIL_FROM=config.EMAIL_HOST_USER,
    MAIL_PORT=config.EMAIL_PORT,
    MAIL_SERVER=config.EMAIL_HOST,
    MAIL_FROM_NAME=config.EMAIL_FROM_NAME,
    MAIL_STARTTLS=config.EMAIL_STARTTLS,
    MAIL_SSL_TLS=config.EMAIL_SSL_TLS,
    USE_CREDENTIALS=config.USE_CREDENTIALS,
    VALIDATE_CERTS=config.VALIDATE_CERTS,
)


fm = FastMail(mail_config)


class Message(BaseModel):
    subject: str
    body: str
    recipients: list[str]


MESSAGE_BODY = """
<h1>Получено новое сообщение</h1>
<p>Имя: {name}</p>
<p>Телефон: {phone}</p>
<p>Email: {email}</p>
<p>Сообщение: {message}</p>
"""


async def send_email(message: Message):
    logger.debug("Sending email...")
    message = MessageSchema(
        subject=message.subject,
        body=message.body,
        recipients=message.recipients,
        subtype=MessageType.html,
    )
    try:
        await fm.send_message(message)
        logger.debug("Email sent.")
    except ConnectionErrors as e:
        logger.error(f"Error sending email: {e}")


async def resend_form_data_to_email(
    name: str,
    phone: str,
    email: str,
    message: str = None,
):
    logger.debug("Resending form data to email...")
    message = Message(
        subject="Новое сообщение",
        body=MESSAGE_BODY.format(
            name=name,
            phone=phone,
            email=email,
            message=message or "",
        ),
        recipients=config.RESEND_MAIL_TO,
    )
    await send_email(message)
    logger.debug("Form data sent.")
