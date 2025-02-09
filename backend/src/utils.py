import hmac
import hashlib

from src.config import config


def mask_ip(ip: str | None) -> str | None:
    if not ip:
        return None
    mid = len(ip) // 2
    return ip[:mid] + "*" * (len(ip) - mid)


def hash_ip(ip: str | None) -> str | None:
    if not ip:
        return None
    message_bytes = ip.encode("utf-8")
    key_bytes = config.SECRET.encode("utf-8")

    return hmac.new(
        key=key_bytes,
        msg=message_bytes,
        digestmod=hashlib.sha256,
    ).hexdigest()
