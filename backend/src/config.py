from pathlib import Path
import logging
from logging.handlers import RotatingFileHandler

from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    DEBUG: bool = False
    BASE_DIR: Path = Path(__file__).parent.parent
    MEDIA_DIR: Path = BASE_DIR / "media"
    MEDIA_DIR.mkdir(parents=True, exist_ok=True)

    DOMAIN: str

    SECRET: str
    COOKIE_AGE: int = 3600
    JWT_AGE: int = 3600

    # Admin
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str

    # Directories
    BASE_DIR: Path = Path(__file__).parent.parent
    LOG_DIR: Path = BASE_DIR / "logs"
    LOG_DIR.mkdir(parents=True, exist_ok=True)

    # Capcha
    SMARTCAPTCHA_SERVER_KEY: str

    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:80",
        "http://127.0.0.1:80",
        "http://localhost",
    ]
    ALLOWED_HOSTS: list[str] = ["localhost", "127.0.0.1"]
    ALLOWED_METHODS: list[str] = ["POST"]
    ALLOWED_HEADERS: list[str] = ["Content-Type"]

    # Database
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"  # noqa

    # Email
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int = 587
    MAIL_SERVER: str
    MAIL_FROM_NAME: str
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    RESEND_MAIL_TO: list[str]

    # Logging
    LOG_FILE_PATH: Path = LOG_DIR / "app.log"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    LOG_LEVEL: int = logging.DEBUG

    model_config = SettingsConfigDict(
        env_file=BASE_DIR.parent / ".env",
        extra="ignore",
    )


def setup_logging(
    log_file_path: str,
    log_format: str,
    log_level: int,
):
    """
    Setup logging.
    """
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
