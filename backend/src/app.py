from fastapi import FastAPI, APIRouter, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi_pagination import add_pagination

from src.config import config, logger
from src.users.router import user_router, auth_router
from src.contacts.router import router as contacts_router
from src.posts.router import router as posts_router
from src.posts.router import admin_router as admin_posts_router
from src.images.router import router as images_router


app = FastAPI(
    debug=config.DEBUG,
    redoc_url="/redoc" if config.DEBUG else None,
    docs_url="/docs" if config.DEBUG else None,
)

add_pagination(app)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=config.ALLOWED_METHODS,
    allow_headers=config.ALLOWED_HEADERS,
)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=config.ALLOWED_HOSTS
)

# API
api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(contacts_router)
api_router.include_router(posts_router)
api_router.include_router(admin_posts_router)
api_router.include_router(user_router)
api_router.include_router(images_router)


@api_router.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(api_router, prefix="/api")

# Media
if config.DEBUG:
    app.mount("/media", StaticFiles(directory=config.MEDIA_DIR), name="media")


# Exception handlers
@app.exception_handler(Exception)
async def exception_handler(request: Request, exc: Exception):
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal Server Error"}
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.error(f"HTTP error. code: {exc.status_code}. detail: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )
