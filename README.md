# AI Document Summarizer

AI Document Summarizer is a web application that uses artificial intelligence to convert lengthy documents into concise, structured summaries.

The application allows users to upload PDF or TXT documents, generate summaries of different lengths, view previous summaries, and export generated summaries as PDF files.

## Live Application

https://frontend-sable-five-46.vercel.app

## GitHub Repository

https://github.com/roachelleB/AI-Document-Summarizer

## Features

- User registration and login
- Secure user authentication using JWT
- PDF and TXT document upload
- Automatic text extraction from uploaded documents
- AI-powered document summarization using Google Gemini
- Three summary lengths:
  - Short
  - Medium
  - Detailed
- Structured summaries with key points and conclusions
- Summary and document history
- User-specific document storage
- Export summaries as PDF
- Persistent storage using MongoDB Atlas

## How the Application Works

The application follows the workflow below:

1. The user creates an account or logs into an existing account.
2. The user uploads a PDF or TXT document.
3. The backend extracts the text from the uploaded document.
4. The extracted text is sent to the AI service for processing.
5. Google Gemini generates a structured summary based on the selected summary length.
6. The document and generated summary are stored in MongoDB.
7. The user can view previously generated summaries from the history section.
8. The generated summary can be exported as a PDF.

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- jsPDF

### Backend

- Python
- FastAPI
- PyMongo
- JWT Authentication
- Argon2 Password Hashing
- pypdf

### Artificial Intelligence

- Google Gemini API

### Database

- MongoDB Atlas

### Deployment

- Vercel for the frontend
- Render for the backend
- MongoDB Atlas for database storage

## User Guide

### 1. Create an Account

Open the live application and select **Sign up**.

Enter your name, email address, and password, then create your account.

### 2. Log In

Use your registered email address and password to log into the application.

### 3. Upload a Document

From the dashboard, upload a supported PDF or TXT document.

### 4. Generate a Summary

Select the required summary length:

- Short: concise summary for quick reading
- Medium: balanced summary with more context
- Detailed: longer summary containing additional information

Generate the summary using the AI summarization feature.

### 5. View Summary History

Previously uploaded documents and generated summaries can be accessed from the dashboard.

### 6. Export a Summary

Generated summaries can be exported as PDF files for offline use or sharing.

## System Architecture

```text
User
  |
  v
React Frontend
  |
  v
FastAPI Backend
  |
  +-------------------+
  |                   |
  v                   v
Gemini API        MongoDB Atlas
  |
  v
Generated Summary

## Project Structure

```text
AI-Document-Summarizer/
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md