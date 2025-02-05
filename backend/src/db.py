from collections.abc import AsyncGenerator

from sqlalchemy import inspect
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from src.config import config, logger


class Base(DeclarativeBase):
    pass


engine = create_async_engine(config.DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def create_db_and_tables() -> None:
    async with engine.begin() as conn:
        existing_tables = await conn.run_sync(
            lambda sync_conn: inspect(sync_conn).get_table_names()
        )
        if not existing_tables:
            logger.info("No tables found. Creating database tables.")
            await conn.run_sync(Base.metadata.create_all)
        else:
            logger.info(
                f"Skipping creation. Tables already exist: {existing_tables}"
            )


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
