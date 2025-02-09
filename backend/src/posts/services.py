from datetime import datetime, date
from typing import Optional

from fastapi import HTTPException, status
from redis import Redis
from sqlalchemy import select, Select, func
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import logger
from src.redis import RedisManager, POST_VIEWS_KEY
from src.db import async_session_maker
from .models import Post, PostView
from .schemas import (
    PostCreate,
    PostUpdate,
    PostCreateDB,
    PostUpdateDB,
    PostStatistics,
    PostViewsStatistics,
    MostViewedPostRead,
)


class PostService:

    @classmethod
    async def get_published_posts_query(cls) -> Select:
        return select(Post).where(
            Post.is_published
        ).order_by(Post.created_at.desc())

    @classmethod
    async def get_all_posts_query(cls) -> Select:
        return select(Post).order_by(Post.created_at.desc())

    @classmethod
    async def get_post_by_id(
        cls, session: AsyncSession, post_id: int, raise_exception: bool = True
    ) -> Post:
        query = select(Post).where(Post.id == post_id)
        result = await session.execute(query)
        post = result.scalar_one_or_none()
        if not post and raise_exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found",
            )
        return post

    @classmethod
    async def get_post_by_slug(
        cls, session: AsyncSession, slug: str, raise_exception: bool = True
    ) -> Post:
        query = select(Post).where(Post.slug == slug)
        result = await session.execute(query)
        post = result.scalar_one_or_none()
        if not post and raise_exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found",
            )
        return post

    @classmethod
    async def get_post_by_title(
        cls, session: AsyncSession, title: str
    ) -> Post:
        query = select(Post).where(Post.title == title)
        result = await session.execute(query)
        return result.scalar_one_or_none()

    @classmethod
    async def create_post(
        cls,
        session: AsyncSession,
        post: PostCreate,
    ) -> Post:
        if await cls.get_post_by_title(session, post.title):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Post with this title already exists",
            )

        post_db = PostCreateDB(**post.model_dump())
        if post_db.slug == "statistics":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This slug is reserved for statistics",
            )

        same_slug_post = await cls.get_post_by_slug(
            session, post_db.slug, raise_exception=False
        )
        if same_slug_post:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Post with this title already exists",
            )

        post = Post(**post_db.model_dump())
        session.add(post)
        await session.commit()
        await session.refresh(post)
        return post

    @classmethod
    async def update_post(
        cls,
        session: AsyncSession,
        post_id: int,
        post: PostUpdate,
    ) -> Post:
        post_db = await cls.get_post_by_id(session, post_id)
        post_in = PostUpdateDB(**post.model_dump())
        post_db.title = post_in.title
        post_db.content = post_in.content
        post_db.is_published = post_in.is_published
        post_db.slug = post_in.slug
        session.add(post_db)
        await session.commit()
        await session.refresh(post_db)
        return post_db

    @classmethod
    async def delete_post(cls, session: AsyncSession, post_id: int) -> None:
        post = await cls.get_post_by_id(session, post_id)
        if post:
            await session.delete(post)
            await session.commit()

    @classmethod
    async def get_post_statistics(
        cls, session: AsyncSession
    ) -> PostStatistics:
        query = select(func.count(Post.id)).select_from(Post)
        result = await session.execute(query)
        total_posts = result.scalar_one()

        query = select(func.count(Post.id)).where(Post.is_published)
        result = await session.execute(query)
        total_published_posts = result.scalar_one()

        query = select(func.count(Post.id)).where(Post.is_published == False) # noqa
        result = await session.execute(query)
        total_draft_posts = result.scalar_one()

        return PostStatistics(
            total_posts=total_posts,
            total_published_posts=total_published_posts,
            total_draft_posts=total_draft_posts,
        )


class PostViewService:

    @classmethod
    async def get_post_views_today(
        cls, session: AsyncSession, post_id: int
    ) -> PostView:
        query = select(PostView).where(
            PostView.post_id == post_id,
            PostView.date == datetime.now().date(),
        )
        result = await session.execute(query)
        return result.scalars().first()

    @classmethod
    async def create_post_view(
        cls, session: AsyncSession, post_id: int
    ) -> PostView:
        post_view = PostView(
            post_id=post_id,
            date=datetime.now().date(),
        )
        session.add(post_view)
        await session.commit()
        await session.refresh(post_view)
        return post_view

    @classmethod
    async def compare_unique_views(
        cls, redis: Redis, post_id: int, unique_views: int
    ) -> None:
        key = POST_VIEWS_KEY.format(
            post_id=post_id, date=datetime.now().date()
        )
        views_for_today = await RedisManager.get_set(redis, key)
        if len(views_for_today) > unique_views:
            return True
        return False

    @classmethod
    async def track_post_view(
        cls,
        post_id: int,
        redis: Redis,
    ) -> None:
        async with async_session_maker() as session:
            try:

                post_view = await cls.get_post_views_today(session, post_id)

                # if post view does not exist, create it
                if not post_view:

                    # if post does not exist, return
                    post = await PostService.get_post_by_id(
                        session, post_id, raise_exception=False
                    )
                    if not post:
                        logger.warning(
                            f"Post with id {post_id} not found to track view."
                        )
                        return

                    post_view = await cls.create_post_view(session, post_id)

                post_view.view_count += 1
                # if the number unique views for today is greater than the
                # unique views in db, increment the unique views
                if await cls.compare_unique_views(
                    redis, post_id, post_view.unique_views
                ):
                    post_view.unique_views += 1

                await session.commit()
                await session.refresh(post_view)
            finally:
                await session.close()

        return post_view

    @classmethod
    async def get_post_views_statistics(
        cls,
        session: AsyncSession,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
    ) -> list[PostViewsStatistics]:
        query = (
            select(
                PostView.date,
                func.sum(PostView.view_count).label("total_views"),
                func.sum(PostView.unique_views).label("total_unique_views"),
            )
            .group_by(PostView.date)
        )
        if start_date:
            query = query.filter(PostView.date >= start_date)
        if end_date:
            query = query.filter(PostView.date <= end_date)

        result = await session.execute(query)
        return result.mappings().all()

    @classmethod
    async def get_most_viewed_posts(
        cls,
        session: AsyncSession,
        limit: int = 5,
    ) -> list[MostViewedPostRead]:
        query = (
            select(
                Post.id.label("post_id"),
                Post.title.label("title"),
                func.sum(PostView.view_count).label("total_views"),
                func.sum(PostView.unique_views).label("unique_views"),
            )
            .join(PostView, Post.id == PostView.post_id)
            .group_by(Post.id)
            .order_by(func.sum(PostView.view_count).desc())
            .limit(limit)
        )
        result = await session.execute(query)
        rows = result.all()

        return [
            MostViewedPostRead(
                post_id=row.post_id,
                title=row.title,
                total_views=row.total_views,
                unique_views=row.unique_views,
            )
            for row in rows
        ]
