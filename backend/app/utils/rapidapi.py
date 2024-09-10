import httpx
from config import settings
from sample_data import DATA

async def fetch_open_ended_schemes(mutual_fund_family: str):
    if settings.use_sample_data == True:
        if mutual_fund_family == "ITI Mutual Fund":
            return DATA

    url = "https://latest-mutual-fund-nav.p.rapidapi.com/latest"

    querystring = {
        "Scheme_Type": "Open",
        "Mutual_Fund_Family": mutual_fund_family
    }

    headers = {
        "x-rapidapi-key": settings.rapidapi_key,
        "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=querystring)

    return response.json()
