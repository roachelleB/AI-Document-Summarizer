from fastapi import APIRouter, Depends
from app.models.summary import SummaryRequest
from app.services.document_service import get_document_by_id
from app.services.ai_service import summarize_text
from app.services.summary_service import create_summary, get_summaries_by_user
from app.utils.security import get_current_user_id

router = APIRouter(prefix="/summaries", tags=["Summaries"])

@router.post("/generate")
def generate_summary(
    request: SummaryRequest,
    user_id: str = Depends(get_current_user_id)
):
    document = get_document_by_id(request.document_id)

    if not document:
        return {"message": "Document not found"}
    if document["user_id"] != user_id:
        return {"message": "You do not have access to this document"}

    summary = summarize_text(
    document["original_text"],
    request.summary_length
    )
    
    saved_summary = create_summary(
    document_id=request.document_id,
    user_id=document["user_id"],
    summary_length=request.summary_length,
    title=summary.title,
    summary=summary.summary,
    key_points=summary.key_points,
    conclusion=summary.conclusion,
    word_count=summary.word_count
    )
    
    return {
    "message": "Summary generated successfully",
    "filename": document["filename"],
    "summary_length": request.summary_length,
    "summary": saved_summary
    }

@router.get("/history")
def get_summary_history(
    user_id: str = Depends(get_current_user_id)
):
    summaries = get_summaries_by_user(user_id)

    return {
        "summaries": summaries
    }