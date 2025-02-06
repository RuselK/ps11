from fastapi import APIRouter, File, UploadFile, Depends, status
from pydantic import BaseModel

from src.users.utils import current_superuser
from .service import ImageService
from src.config import config

router = APIRouter(prefix="/images", tags=["Images"])


class Image(BaseModel):
    url: str


@router.post(
    "/",
    response_model=Image,
    dependencies=[Depends(current_superuser)],
)
async def upload_image(
    image: UploadFile = File(...),
):
    image = await ImageService.upload_image(image)
    return Image(url=f"{config.DOMAIN}/{image}")


@router.delete(
    "/{filename}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(current_superuser)],
)
async def delete_image(filename: str):
    await ImageService.delete_image(filename)
