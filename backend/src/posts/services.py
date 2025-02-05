from sqlalchemy import select, Select
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import logger
from .models import Post
from .schemas import PostCreate, PostUpdate


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
        return result.scalar_one_or_none()

    @classmethod
    async def create_post(
        cls,
        session: AsyncSession,
        post: PostCreate,
    ) -> Post:
        logger.info(f"Creating post: {post}")
        post = Post(**post.model_dump())
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
        post = await cls.get_post_by_id(session, post_id)
        if post:
            logger.info(f"Post found: {post}")
            post.title = post.title
            post.content = post.content
            post.is_published = post.is_published
            session.add(post)
            await session.commit()
            logger.info(f"Post updated: {post}")
        return post

    @classmethod
    async def delete_post(cls, session: AsyncSession, post_id: int) -> None:
        logger.info(f"Deleting post: {post_id}")
        post = await cls.get_post_by_id(session, post_id)
        if post:
            logger.info(f"Post found: {post}")
            await session.delete(post)
            await session.commit()
