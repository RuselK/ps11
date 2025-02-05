from typing import TypeVar

from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination import Page, Params
from fastapi_pagination.customization import CustomizedPage, UseParams

from src.posts.schemas import PostCreate, PostRead, PostUpdate
from src.posts.services import PostService
from src.users.utils import current_superuser
from src.db import get_async_session


router = APIRouter(prefix="/posts", tags=["Posts"])


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
    query = await PostService.get_all_posts_query()
    return await paginate(session, query)


@router.get("/{post_id}", response_model=PostRead)
async def get_post(
    post_id: int,
    session: AsyncSession = Depends(get_async_session),
):
    return await PostService.get_post_by_id(session, post_id)


@router.post(
    "/",
    response_model=PostRead,
    dependencies=[Depends(current_superuser)],
)
async def create_post(
    post: PostCreate,
    session: AsyncSession = Depends(get_async_session),
) -> PostRead:
    return await PostService.create_post(session, post)


@router.put(
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


@router.delete(
    "/{post_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(current_superuser)],
)
async def delete_post(
    post_id: int,
    session: AsyncSession = Depends(get_async_session),
) -> None:
    await PostService.delete_post(session, post_id)
