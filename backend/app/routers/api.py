import random

from app.dependencies.auth_check import auth_check
from app.models.request_schemas import BuyMF, LoginRequest
from app.models.response_schemas import (
    GetSchemesResponse,
    MutualFundFamily,
    MutualFundScheme,
)
from app.utils.rapidapi import fetch_open_ended_schemes
from config import settings
from fastapi import APIRouter, Depends, HTTPException
from starlette.responses import JSONResponse

router = APIRouter()


def generate_simple_token():
    return f"token_{random.randint(1, 100)}"


@router.get("/mutual-fund-families", dependencies=[Depends(auth_check)])
async def get_mutual_fund_families():
    return MutualFundFamily().model_dump()


@router.post("/buy/")
async def buy_mf(item: BuyMF):
    print(
        f"Scheme : {item.scheme_code}, Qty: {item.qty} bought at NAV: {item.purchase_nav} successfully."
    )
    return {
        "message": "Mutual Fund bought successfully",
    }


@router.get("/get-schemes", dependencies=[Depends(auth_check)])
async def get_schemes(mutual_fund_family: str):
    schemes = await fetch_open_ended_schemes(mutual_fund_family)

    formatted_schemes = [
        MutualFundScheme(
            scheme_code=scheme["Scheme_Code"],
            scheme_name=scheme["Scheme_Name"],
            net_asset_value=scheme["Net_Asset_Value"],
            date=scheme["Date"],
            scheme_type=scheme["Scheme_Type"],
            scheme_category=scheme["Scheme_Category"],
            mutual_fund_family=scheme["Mutual_Fund_Family"],
        )
        for scheme in schemes
    ]

    return GetSchemesResponse(items=formatted_schemes)


@router.post("/login")
async def login(request: LoginRequest, response: JSONResponse):

    if request.username != settings.username or request.password != settings.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = generate_simple_token()

    return JSONResponse(content={"access_token": access_token})
