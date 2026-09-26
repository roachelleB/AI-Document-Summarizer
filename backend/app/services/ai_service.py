import os

from dotenv import load_dotenv
from google import genai
from app.models.summary import AIResponse

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

def summarize_text(text: str, summary_length: str = "medium"):
    prompt = f"""
Create a {summary_length} summary of the following document.

Summary length requirements:
- If the requested length is "short", write approximately 80-120 words.
- If the requested length is "medium", write approximately 150-250 words.
- If the requested length is "detailed", write approximately 300-450 words.

The summary length must follow the requested range as closely as possible.

Return:
- A suitable title
- A clear summary
- The main key points
- A conclusion
- The word count of the summary

Requested summary length:
{summary_length}

Document:
{text}
"""

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": AIResponse,
        },
    )

    return AIResponse.model_validate_json(response.text)