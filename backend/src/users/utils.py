import uuid
from collections.abc import AsyncGenerator

from fastapi import Depends
from fastapi_users import BaseUserManager, UUIDIDMixin, FastAPIUsers
from fastapi_users.exceptions import UserNotExists
from fastapi_users.authentication import (
    CookieTransport,
    JWTStrategy,
    AuthenticationBackend,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import config, logger
from src.db import get_async_session, async_session_maker
from .models import User
from .schemas import UserCreate


cookie_transport = CookieTransport(
    cookie_name="authtoken",
    cookie_max_age=config.COOKIE_AGE,
    cookie_secure=False,  # TODO: change to True in production
)


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=config.SECRET, lifetime_seconds=config.JWT_AGE)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = config.SECRET
    verification_token_secret = config.SECRET


async def get_user_manager(
    user_db=Depends(get_user_db),
) -> AsyncGenerator[UserManager, None]:
    yield UserManager(user_db)


fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

current_superuser = fastapi_users.current_user(active=True, superuser=True)


async def create_superuser() -> None:
    async with async_session_maker() as session:
        user_db = SQLAlchemyUserDatabase(session, User)
        user_manager = UserManager(user_db)

        try:
            await user_manager.get_by_email(config.ADMIN_EMAIL)
        except UserNotExists:
            user_in = UserCreate(
                email=config.ADMIN_EMAIL,
                password=config.ADMIN_PASSWORD,
                is_superuser=True,
                is_active=True,
                is_verified=True,
            )
            await user_manager.create(user_in)
            logger.info("Superuser created.")
        else:
            logger.info("Superuser already exists.")
