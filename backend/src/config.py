from pathlib import Path
import logging
from logging.handlers import RotatingFileHandler

from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    DEBUG: bool = False

    # Directories
    BASE_DIR: Path = Path(__file__).parent.parent
    LOG_DIR: Path = BASE_DIR / "logs"
    LOG_DIR.mkdir(parents=True, exist_ok=True)

    # Capcha
    SMARTCAPTCHA_SERVER_KEY: str

    # CORS
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]
    ALLOWED_HOSTS: list[str] = ["localhost", "127.0.0.1"]
    ALLOWED_METHODS: list[str] = ["POST"]
    ALLOWED_HEADERS: list[str] = ["Content-Type"]

    # Email
    EMAIL_HOST: str
    EMAIL_PORT: int = 587
    EMAIL_HOST_USER: str
    EMAIL_HOST_PASSWORD: str
    EMAIL_FROM: str
    EMAIL_FROM_NAME: str
    EMAIL_STARTTLS: bool = True
    EMAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    RESEND_MAIL_TO: list[str]

    # Logging
    LOG_FILE_PATH: Path = LOG_DIR / "app.log"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    LOG_LEVEL: int = logging.DEBUG

    model_config = SettingsConfigDict(
        env_file=BASE_DIR.parent / ".env",
    )


def setup_logging(
    log_file_path: str,
    log_format: str,
    log_level: int,
):
    logger = logging.getLogger(__name__)
    logger.setLevel(log_level)
    file_handler = RotatingFileHandler(
        log_file_path,
        maxBytes=5 * 1024 * 1024,  # 5MB
        backupCount=3,
    )
    file_handler.setLevel(log_level)
    file_handler.setFormatter(logging.Formatter(log_format))

    logger.addHandler(file_handler)
    return logger


config = Config()
logger = setup_logging(
    log_file_path=config.LOG_FILE_PATH,
    log_format=config.LOG_FORMAT,
    log_level=config.LOG_LEVEL,
)
