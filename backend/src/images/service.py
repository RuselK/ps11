
import aiofiles
from fastapi import UploadFile, HTTPException, status
from slugify import slugify

from src.config import config


class ImageService:

    @classmethod
    async def upload_image(cls, image: UploadFile) -> str:
        filename = slugify(image.filename)
        async with aiofiles.open(config.MEDIA_DIR / filename, "wb") as f:
            await f.write(await image.read())
        return f"media/{filename}"

    @classmethod
    async def delete_image(cls, filename: str) -> None:
        image_path = config.MEDIA_DIR / filename
        if not image_path.exists():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Image not found",
            )
        image_path.unlink()
