from pydantic import BaseModel, computed_field


class MutualFundFamily(BaseModel):
    items: list[str] = [
        "ITI Mutual Fund",
        "Aditya Birla Sun Life Mutual Fund",
        "Axis Mutual Fund",
        "Bank of India Mutual Fund",
        "BOI AXA Mutual Fund",
        "Canara Robeco Mutual Fund",
        "DSP Mutual Fund",
        "Edelweiss Mutual Fund",
        "Franklin Templeton Mutual Fund",
        "HDFC Mutual Fund",
        "ICICI Prudential Mutual Fund",
        "Kotak Mahindra Mutual Fund",
        "Mirae Asset Mutual Fund",
        "Motilal Oswal Mutual Fund",
        "Nippon India Mutual Fund",
        "Quantum Mutual Fund",
        "SBI Mutual Fund",
        "Shriram Mutual Fund",
        "Sundaram Mutual Fund",
        "UTI Mutual Fund",
    ]


class MutualFundScheme(BaseModel):
    scheme_code: int
    scheme_name: str
    net_asset_value: float
    date: str
    scheme_type: str
    scheme_category: str
    mutual_fund_family: str


class GetSchemesResponse(BaseModel):
    items: list[MutualFundScheme]

    @computed_field
    @property
    def count(self) -> int:
        return len(self.items)
