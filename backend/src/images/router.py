from fastapi import APIRouter, File, UploadFile, Depends, status

from src.users.utils import current_superuser
from .service import ImageService


router = APIRouter(prefix="/images", tags=["Images"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(current_superuser)],
)
async def upload_image(
    image: UploadFile = File(...),
):
    return await ImageService.upload_image(image)


@router.delete(
    "/{filename}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(current_superuser)],
)
async def delete_image(filename: str):
    await ImageService.delete_image(filename)
