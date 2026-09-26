from app.database.mongodb import database

documents_collection = database["documents"]

def create_document(user_id: str, filename: str, file_type: str, original_text: str):
    document = {
        "user_id": user_id,
        "filename": filename,
        "file_type": file_type,
        "original_text": original_text,
    }

    result = documents_collection.insert_one(document)

    return {
        "id": str(result.inserted_id),
        "filename": filename,
        "file_type": file_type,
    }

def get_document_by_id(document_id: str):
    from bson import ObjectId

    document = documents_collection.find_one({
        "_id": ObjectId(document_id)
    })

    return document

def get_documents_by_user(user_id: str):
    documents = documents_collection.find(
        {"user_id": user_id}
    ).sort("_id", -1)

    return [
        {
            "id": str(document["_id"]),
            "filename": document["filename"],
            "file_type": document["file_type"],
        }
        for document in documents
    ]