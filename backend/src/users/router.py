from fastapi import APIRouter, Depends

from src.services.captcha import captcha_dependency
from .utils import auth_backend, fastapi_users
from .schemas import UserRead, UserUpdate


auth_router = APIRouter(prefix="/auth", tags=["Auth"])
user_router = APIRouter(prefix="/users", tags=["Users"])

logout_route = fastapi_users.get_auth_router(auth_backend)
logout_route.routes = [
    route
    for route in logout_route.routes
    if route.name not in ["auth:jwt.login"]
]
login_route = fastapi_users.get_auth_router(auth_backend)
login_route.routes = [
    route
    for route in login_route.routes
    if route.name not in ["auth:jwt.logout"]
]
auth_router.include_router(logout_route)
auth_router.include_router(
    login_route,
    dependencies=[Depends(captcha_dependency)]
)

user_route = fastapi_users.get_users_router(UserRead, UserUpdate)
user_route.routes = [
    route
    for route in user_route.routes
    if route.name in ["users:current_user"]
]
user_router.include_router(user_route)
