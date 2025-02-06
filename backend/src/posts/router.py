from typing import TypeVar

from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination import Page, Params
from fastapi_pagination.customization import CustomizedPage, UseParams

from src.users.utils import current_superuser
from src.db import get_async_session
from .schemas import (
    PostCreate,
    PostRead,
    PostUpdate,
    PostStatistics,
    PostViewsStatistics,
)
from .services import PostService, PostViewService
from .dependencies import track_post_view, get_post_by_slug


router = APIRouter(prefix="/posts", tags=["Posts"])
admin_router = APIRouter(prefix="/admin/posts", tags=["Admin Posts"])


T = TypeVar("T")


class MyParams(Params):
    size: int = Query(10, ge=1, le=100, alias="pageSize")
    page: int = Query(1, ge=1, alias="pageNumber")


CustomPage = CustomizedPage[
    Page[T],
    UseParams(MyParams),
]


@router.get("/", response_model=CustomPage[PostRead])
async def get_posts(
    session: AsyncSession = Depends(get_async_session),
):
    query = await PostService.get_published_posts_query()
    return await paginate(session, query)


@router.get(
    "/{slug}",
    response_model=PostRead,
    dependencies=[Depends(track_post_view)],
)
async def get_post(
    post: PostRead = Depends(get_post_by_slug),
):
    return post


@admin_router.get(
    "/",
    response_model=CustomPage[PostRead],
    dependencies=[Depends(current_superuser)],
)
async def get_all_posts(
    session: AsyncSession = Depends(get_async_session),
):
    query = await PostService.get_all_posts_query()
    return await paginate(session, query)


@admin_router.get(
    "/statistics",
    response_model=PostStatistics,
    dependencies=[Depends(current_superuser)],
)
async def get_post_statistics(
    session: AsyncSession = Depends(get_async_session),
) -> PostStatistics:
    return await PostService.get_post_statistics(session)


@admin_router.get(
    "/views",
    response_model=list[PostViewsStatistics],
    # dependencies=[Depends(current_superuser)],
)
async def get_post_views_statistics(
    session: AsyncSession = Depends(get_async_session),
) -> list[PostViewsStatistics]:
    return await PostViewService.get_post_views_statistics(session)


@admin_router.get(
    "/{post_id}",
    response_model=PostRead,
    dependencies=[Depends(current_superuser)],
)
async def get_post_by_id(
    post_id: int,
    session: AsyncSession = Depends(get_async_session),
):
    return await PostService.get_post_by_id(session, post_id)


@admin_router.post(
    "/",
    response_model=PostRead,
    dependencies=[Depends(current_superuser)],
)
async def create_post(
    post: PostCreate,
    session: AsyncSession = Depends(get_async_session),
):
    return await PostService.create_post(session, post)


@admin_router.put(
    "/{post_id}",
    response_model=PostRead,
    dependencies=[Depends(current_superuser)],
)
async def update_post(
    post_id: int,
    post: PostUpdate,
    session: AsyncSession = Depends(get_async_session),
) -> PostRead:
    return await PostService.update_post(session, post_id, post)


@admin_router.delete(
    "/{post_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(current_superuser)],
)
async def delete_post(
    post_id: int,
    session: AsyncSession = Depends(get_async_session),
) -> None:
    await PostService.delete_post(session, post_id)
