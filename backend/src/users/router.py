from fastapi import APIRouter, Depends

from src.services.captcha import captcha_dependency
from .utils import auth_backend, fastapi_users


router = APIRouter(prefix="/auth", tags=["Auth"])


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
router.include_router(logout_route)
router.include_router(login_route, dependencies=[Depends(captcha_dependency)])
