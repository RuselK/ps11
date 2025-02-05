from datetime import datetime

from pydantic import BaseModel, Field, ConfigDict
from src.posts.models import POST_TITLE_MAX_LENGTH


class PostBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str = Field(..., max_length=POST_TITLE_MAX_LENGTH)
    content: str
    is_published: bool


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    pass


class PostRead(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime
