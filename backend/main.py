from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.documents import router as documents_router
from app.routes.summaries import router as summaries_router

app = FastAPI(title="AI Document Summarizer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(documents_router)
app.include_router(summaries_router)

@app.get("/")
def root():
    return {"message": "API is running!"}