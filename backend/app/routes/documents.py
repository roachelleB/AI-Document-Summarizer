from fastapi import APIRouter, UploadFile, File, Depends
from app.services.extraction_service import extract_text_from_pdf
from app.services.document_service import create_document, get_documents_by_user
from app.utils.security import get_current_user_id

router = APIRouter(prefix="/documents", tags=["Documents"])

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id)
):
    content = await file.read()

    if file.filename.lower().endswith(".txt"):
        text = content.decode("utf-8")

    elif file.filename.lower().endswith(".pdf"):
        text = extract_text_from_pdf(content)

    else:
        return {"message": "Only PDF and TXT files are supported"}

    saved_document = create_document(
    user_id=user_id,
    filename=file.filename,
    file_type="pdf" if file.filename.lower().endswith(".pdf") else "txt",
    original_text=text
)
    
    return {
    "message": "Document uploaded successfully",
    "document": saved_document
}

@router.get("/history")
def get_document_history(
    user_id: str = Depends(get_current_user_id)
):
    documents = get_documents_by_user(user_id)

    return {
        "documents": documents
    }