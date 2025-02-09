from fastapi import APIRouter, BackgroundTasks, Depends, status
from pydantic import BaseModel, EmailStr

from src.services.mail import resend_form_data_to_email
from src.services.captcha import captcha_dependency


router = APIRouter(prefix="/contacts", tags=["Contacts"])


class FormData(BaseModel):
    name: str
    phone: str
    email: EmailStr
    message: str = None


@router.post(
    "/send_form",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(captcha_dependency)],
)
async def send_form(
    form_data: FormData,
    background_tasks: BackgroundTasks,
):
    background_tasks.add_task(
        resend_form_data_to_email,
        form_data.name,
        form_data.phone,
        form_data.email,
        form_data.message,
    )
