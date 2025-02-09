from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi_mail.errors import ConnectionErrors
from pydantic import BaseModel

from src.config import config, logger


mail_config = ConnectionConfig(
    MAIL_USERNAME=config.MAIL_USERNAME,
    MAIL_PASSWORD=config.MAIL_PASSWORD,
    MAIL_FROM=config.MAIL_FROM,
    MAIL_PORT=config.MAIL_PORT,
    MAIL_SERVER=config.MAIL_SERVER,
    MAIL_FROM_NAME=config.MAIL_FROM_NAME,
    MAIL_STARTTLS=config.MAIL_STARTTLS,
    MAIL_SSL_TLS=config.MAIL_SSL_TLS,
    USE_CREDENTIALS=config.USE_CREDENTIALS,
    VALIDATE_CERTS=config.VALIDATE_CERTS,
)
fm = FastMail(mail_config)


MESSAGE_BODY = """
<h1>Получены новые данные с формы</h1>
<p>Имя: {name}</p>
<p>Телефон: {phone}</p>
<p>Email: {email}</p>
<p>Сообщение: {message}</p>
"""
SUBJECT = "Новые данные с формы"


class Message(BaseModel):
    subject: str
    body: str
    recipients: list[str]


async def send_email(message: Message) -> None:
    """
    Send email.
    """
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
) -> None:
    """
    Resend form data to email.
    """
    message = Message(
        subject=SUBJECT,
        body=MESSAGE_BODY.format(
            name=name,
            phone=phone,
            email=email,
            message=message or "",
        ),
        recipients=config.RESEND_MAIL_TO,
    )
    await send_email(message)
