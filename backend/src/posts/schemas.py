from datetime import datetime
from typing import Self

from pydantic import BaseModel, Field, ConfigDict, model_validator
from slugify import slugify

from src.posts.models import POST_TITLE_MAX_LENGTH


class PostBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str = Field(..., max_length=POST_TITLE_MAX_LENGTH)
    content: str
    is_published: bool


class PostCreate(PostBase):
    pass


class PostCreateDB(PostCreate):
    slug: str | None = None

    @model_validator(mode="after")
    def validate_slug(cls, data) -> Self:
        if data.slug is None:
            data.slug = slugify(data.title)
        return data


class PostUpdate(PostCreate):
    pass


class PostUpdateDB(PostCreateDB):
    pass


class PostRead(PostBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime


class PostStatistics(BaseModel):
    total_posts: int
    total_published_posts: int
    total_draft_posts: int
