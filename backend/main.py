from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import api

def create_app():
    app = FastAPI(title="Mutual Funds API", version="1.0")

    origins = [
        "http://localhost",
        "http://localhost:8000",
        "http://localhost:5173",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api.router, prefix="/api")

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
