
from fastapi import Request, HTTPException


async def auth_check(request: Request):
    if not request.headers.get("authorization"):
        raise HTTPException(status_code=401, detail="Unauthorized")
    else:
        return request.headers.get("authorization")
