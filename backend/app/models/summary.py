from pydantic import BaseModel

class SummaryCreate(BaseModel):
    document_id: str
    user_id: str
    summary_length: str
    title: str
    summary: str
    key_points: list[str]
    conclusion: str
    word_count: int

class SummaryRequest(BaseModel):
    document_id: str
    summary_length: str

class AIResponse(BaseModel):
    title: str
    summary: str
    key_points: list[str]
    conclusion: str
    word_count: int