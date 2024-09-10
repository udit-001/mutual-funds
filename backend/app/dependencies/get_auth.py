
from fastapi import Request


async def get_auth_details(request: Request):
    return request.cookies.get("access_token")
