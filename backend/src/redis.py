from redis.asyncio import ConnectionPool, Redis

from src.config import config


def create_redis_pool(db: int) -> ConnectionPool:
    return ConnectionPool(
        host=config.REDIS_HOST,
        port=config.REDIS_PORT,
        username=config.REDIS_USERNAME,
        password=config.REDIS_PASSWORD,
        db=db,
        encoding="utf-8",
        decode_responses=True,
    )


broker_pool = create_redis_pool(config.REDIS_BROKER_DB)


async def get_broker_redis() -> Redis:
    return Redis(connection_pool=broker_pool)


POST_VIEWS_KEY = "post:{post_id}:date:{date}:views"
POST_CACHE_KEY = "post:{slug}:cache"

EXPIRATION_TIME = 60 * 60 * 24  # 24 hours
CACHE_EXPIRATION_TIME = 60  # 1 minute


class RedisManager:
    @classmethod
    async def add_to_set(cls, redis: Redis, key: str, value: str) -> None:
        await redis.sadd(key, value)

    @classmethod
    async def get_set(cls, redis: Redis, key: str) -> list[str]:
        return await redis.smembers(key)

    @classmethod
    async def is_in_set(cls, redis: Redis, key: str, value: str) -> bool:
        return await redis.sismember(key, value)

    @classmethod
    async def add_to_cache(cls, redis: Redis, key: str, value: str) -> None:
        await redis.set(key, value, ex=CACHE_EXPIRATION_TIME)

    @classmethod
    async def get_from_cache(cls, redis: Redis, key: str) -> str:
        return await redis.get(key)
