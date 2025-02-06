from fastapi import HTTPException, status
from sqlalchemy import select, Select, func
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import logger
from .models import Post
from .schemas import PostCreate, PostUpdate, PostCreateDB, PostUpdateDB, PostStatistics


class PostService:

    @classmethod
    async def get_all_posts_query(cls) -> Select:
        logger.info("Getting all posts query.")
        return select(Post).order_by(Post.created_at.desc())

    @classmethod
    async def get_post_by_id(cls, session: AsyncSession, post_id: int) -> Post:
        logger.info(f"Getting post by id: {post_id}")
        query = select(Post).where(Post.id == post_id)
        result = await session.execute(query)
        post = result.scalar_one_or_none()
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found",
            )
        return post

    @classmethod
    async def get_post_by_slug(cls, session: AsyncSession, slug: str) -> Post:
        logger.info(f"Getting post by slug: {slug}")
        query = select(Post).where(Post.slug == slug)
        result = await session.execute(query)
        post = result.scalar_one_or_none()
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found",
            )
        return post

    @classmethod
    async def get_post_by_title(
        cls, session: AsyncSession, title: str
    ) -> Post:
        logger.info(f"Getting post by title: {title}")
        query = select(Post).where(Post.title == title)
        result = await session.execute(query)
        return result.scalar_one_or_none()

    @classmethod
    async def create_post(
        cls,
        session: AsyncSession,
        post: PostCreate,
    ) -> Post:
        logger.info(f"Creating post: {post}")

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

        post = Post(**post_db.model_dump())
        session.add(post)
        await session.commit()
        return post

    @classmethod
    async def update_post(
        cls,
        session: AsyncSession,
        post_id: int,
        post: PostUpdate,
    ) -> Post:
        logger.info(f"Updating post: {post_id} with: {post}")
        post_db = await cls.get_post_by_id(session, post_id)
        post_in = PostUpdateDB(**post.model_dump())
        post_db.title = post_in.title
        post_db.content = post_in.content
        post_db.is_published = post_in.is_published
        post_db.slug = post_in.slug
        session.add(post_db)
        await session.commit()
        logger.info(f"Post updated: {post}")
        return post_db

    @classmethod
    async def delete_post(cls, session: AsyncSession, post_id: int) -> None:
        logger.info(f"Deleting post: {post_id}")
        post = await cls.get_post_by_id(session, post_id)
        if post:
            logger.info(f"Post found: {post}")
            await session.delete(post)
            await session.commit()

    @classmethod
    async def get_post_statistics(
        cls, session: AsyncSession
    ) -> PostStatistics:
        logger.info("Getting post statistics")

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
