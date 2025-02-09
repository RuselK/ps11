from typing import TypeVar

from fastapi import Query
from fastapi_pagination import Page, Params
from fastapi_pagination.customization import CustomizedPage, UseParams


T = TypeVar("T")


class MyParams(Params):
    size: int = Query(10, ge=1, le=100, alias="pageSize")
    page: int = Query(1, ge=1, alias="pageNumber")


PaginatedPage = CustomizedPage[
    Page[T],
    UseParams(MyParams),
]
