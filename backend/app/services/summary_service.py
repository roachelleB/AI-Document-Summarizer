from app.database.mongodb import database

summaries_collection = database["summaries"]

def create_summary(
    document_id: str,
    user_id: str,
    summary_length: str,
    title: str,
    summary: str,
    key_points: list[str],
    conclusion: str,
    word_count: int
):
    summary_document = {
        "document_id": document_id,
        "user_id": user_id,
        "summary_length": summary_length,
        "title": title,
        "summary": summary,
        "key_points": key_points,
        "conclusion": conclusion,
        "word_count": word_count,
    }

    result = summaries_collection.insert_one(summary_document)

    return {
        "id": str(result.inserted_id),
        "title": title,
        "summary": summary,
        "key_points": key_points,
        "conclusion": conclusion,
        "word_count": word_count,
    }

def get_summaries_by_user(user_id: str):
    summaries = summaries_collection.find(
        {"user_id": user_id}
    ).sort("_id", -1)

    return [
        {
            "id": str(summary["_id"]),
            "document_id": summary["document_id"],
            "title": summary["title"],
            "summary": summary["summary"],
            "key_points": summary["key_points"],
            "conclusion": summary["conclusion"],
            "word_count": summary["word_count"],
            "summary_length": summary["summary_length"],
        }
        for summary in summaries
    ]