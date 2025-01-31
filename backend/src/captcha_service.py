from aiohttp import ClientSession, ClientTimeout
from aiohttp.client_exceptions import ClientConnectorError
from fastapi import Request, HTTPException, status

from src.config import config, logger
from src.utils import mask_ip


async def check_captcha(token: str, ip_address: str) -> bool:
    """
    Check if captcha token is valid.
    """
    try:
        logger.debug(
            f"Checking captcha token for IP address: "
            f"{mask_ip(ip_address)}, token: {token}"
        )
        async with ClientSession(
            timeout=ClientTimeout(total=5)
        ) as session:
            async with session.post(
                "https://smartcaptcha.yandexcloud.net/validate",
                data={
                    "secret": config.SMARTCAPTCHA_SERVER_KEY,
                    "token": token,
                    "ip": ip_address,
                },
            ) as response:
                server_output = await response.json()
                if response.status != 200 or server_output["status"] != "ok":
                    logger.warning(
                        "Captcha token is not valid for "
                        f"IP address: {mask_ip(ip_address)}, token: {token}"
                    )
                    return False
                logger.debug(
                    f"Captcha token is valid for IP address: "
                    f"{mask_ip(ip_address)}, token: {token}"
                )
                return True
    except ClientConnectorError:
        logger.error(
            f"Error checking captcha token for IP address: "
            f"{mask_ip(ip_address)}, token: {token}"
        )
        return False


async def captcha_dependency(token: str, request: Request) -> None:
    """
    Dependency to check if captcha is valid.
    """
    client_ip = request.client.host
    if not await check_captcha(token, client_ip):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid captcha",
        )
