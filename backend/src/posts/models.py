from datetime import datetime
from typing import List

from sqlalchemy import (
    Integer,
    String,
    Text,
    DateTime,
    Boolean,
    ForeignKey,
    Date,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db import Base


POST_TITLE_MAX_LENGTH = 255


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(
        String(POST_TITLE_MAX_LENGTH), unique=True
    )
    content: Mapped[str] = mapped_column(Text)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)
    slug: Mapped[str] = mapped_column(
        String, unique=True, index=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )

    views: Mapped[List["PostView"]] = relationship(
        "PostView", back_populates="post", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Post(id={self.id}, title={self.title}, slug={self.slug})>"


class PostView(Base):
    __tablename__ = "post_views"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    post_id: Mapped[int] = mapped_column(Integer, ForeignKey("posts.id"))
    view_count: Mapped[int] = mapped_column(Integer, default=0)
    unique_views: Mapped[int] = mapped_column(Integer, default=0)
    date: Mapped[datetime.date] = mapped_column(
        Date, default=datetime.now().date()
    )

    post: Mapped["Post"] = relationship(
        "Post", back_populates="views"
    )

    def __repr__(self) -> str:
        return (
            f"<PostView(id={self.id}, post_id={self.post_id}, "
            f"view_count={self.view_count}, unique_views={self.unique_views}, "
            f"date={self.date})>"
        )
