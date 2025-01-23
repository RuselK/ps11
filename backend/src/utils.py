
def mask_ip(ip: str | None) -> str | None:
    if not ip:
        return None
    mid = len(ip) // 2
    return ip[:mid] + "*" * (len(ip) - mid)
