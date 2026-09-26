from pypdf import PdfReader
from io import BytesIO


def extract_text_from_pdf(file_content: bytes) -> str:
    pdf = PdfReader(BytesIO(file_content))

    text = ""

    for page in pdf.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text