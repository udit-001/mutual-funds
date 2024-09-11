from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class BuyMF(BaseModel):
    qty: int
    scheme_code: str
    purchase_nav: float
