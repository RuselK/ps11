from datetime import datetime

from fastapi import Depends, BackgroundTasks, Request
from sqlalchemy.ext.asyncio import AsyncSession
from redis.asyncio import Redis

from src.utils import hash_ip
from src.redis import (
    RedisManager,
    get_broker_redis,
    POST_VIEWS_KEY,
    POST_CACHE_KEY,
)
from src.db import get_async_session
from .models import Post
from .services import PostService, PostViewService
from .schemas import PostRead


async def get_post_by_slug(
    slug: str,
    session: AsyncSession = Depends(get_async_session),
    redis: Redis = Depends(get_broker_redis),
) -> PostRead:
    key = POST_CACHE_KEY.format(slug=slug)
    post_cache = await RedisManager.get_from_cache(redis, key)
    if post_cache:
        return PostRead.model_validate_json(post_cache)
    post = await PostService.get_post_by_slug(session, slug)
    await RedisManager.add_to_cache(
        redis,
        key,
        PostRead.model_validate(post).model_dump_json(),
    )
    return post


async def track_post_view(
    request: Request,
    post: Post = Depends(get_post_by_slug),
    redis: Redis = Depends(get_broker_redis),
    background_tasks: BackgroundTasks = BackgroundTasks(),
) -> None:
    key = POST_VIEWS_KEY.format(post_id=post.id, date=datetime.now().date())
    hashed_ip = hash_ip(request.client.host)
    await RedisManager.add_to_set(redis, key, hashed_ip)

    background_tasks.add_task(
        PostViewService.track_post_view,
        post.id,
        redis,
    )
