from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    username: str
    password: str
    rapidapi_key: str
    use_sample_data: bool = False

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
