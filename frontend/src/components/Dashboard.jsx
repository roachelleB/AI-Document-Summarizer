import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { jsPDF } from "jspdf"

function Dashboard() {
    const navigate = useNavigate()

    const handleLogout = () => {
  localStorage.removeItem("access_token")
  navigate("/")
}

    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadedDocument, setUploadedDocument] = useState(null)
    const [generatedSummary, setGeneratedSummary] = useState(null)
    const [summaryLength, setSummaryLength] = useState("medium")

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log("Please select a file first")
            return
        }
        
        const formData = new FormData()
        formData.append("file", selectedFile)
        const token = localStorage.getItem("access_token")

const response = await axios.post(
  "https://ai-document-summarizer-mgq6.onrender.com/documents/upload",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)

console.log("Upload successful:", response.data)
setUploadedDocument(response.data.document)
console.log("Uploaded document:", response.data.document)
    }

    const handleGenerateSummary = async () => {
  const token = localStorage.getItem("access_token")
  console.log("Selected summary length:", summaryLength)

  const response = await axios.post(
    "https://ai-document-summarizer-mgq6.onrender.com/summaries/generate",
    {
      document_id: uploadedDocument.id,
      summary_length: summaryLength,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  console.log("Summary generated:", response.data)
  setGeneratedSummary(response.data.summary)
}

const handleExportPDF = () => {
  if (!generatedSummary) {
    return
  }

  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.text(generatedSummary.title, 20, 20)

  doc.setFontSize(12)
  doc.text("Summary", 20, 35)

  const summaryLines = doc.splitTextToSize(
    generatedSummary.summary,
    170
  )

  doc.text(summaryLines, 20, 45)

  let yPosition = 45 + summaryLines.length * 7

doc.setFontSize(12)
doc.text("Key Points", 20, yPosition)

yPosition += 10

generatedSummary.key_points.forEach((point) => {
  const pointLines = doc.splitTextToSize(
    `• ${point}`,
    170
  )

  doc.text(pointLines, 20, yPosition)

  yPosition += pointLines.length * 7 + 3
})

doc.setFontSize(12)
doc.text("Conclusion", 20, yPosition)

yPosition += 10

const conclusionLines = doc.splitTextToSize(
  generatedSummary.conclusion,
  170
)

doc.text(conclusionLines, 20, yPosition)

yPosition += conclusionLines.length * 7 + 5

doc.setFontSize(10)
doc.text(
  `Summary word count: ${generatedSummary.word_count}`,
  20,
  yPosition
)

  doc.save("summary.pdf")
}

return (
<div className="min-h-screen bg-gray-100">
    <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
  <h1 className="text-xl font-bold text-gray-900">
    AI Document Summarizer
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
  >
    Logout
  </button>
</nav>
            
            <main className="max-w-6xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold text-gray-900">
                    Dashboard
                    </h2>
                    
                    <p className="text-gray-500 mt-2">
                        Upload a document and generate an AI-powered summary.
                        </p>
                        
                        <div className="mt-8 bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Upload a document
                                </h3>
                                
                                <p className="text-gray-500 mt-2">
                                    Upload a PDF or TXT file to generate an AI summary.
                                    </p>

                                    <div className="mt-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Summary Length
  </label>

  <select
    value={summaryLength}
    onChange={(e) => setSummaryLength(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="short">Short</option>
    <option value="medium">Medium</option>
    <option value="detailed">Detailed</option>
  </select>
</div>
                                    
                                    <div className="mt-6">
                                        <input
                                        type="file"
                                        accept=".pdf,.txt"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        className="block w-full text-sm text-gray-600
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:bg-blue-600 file:text-white
                                        hover:file:bg-blue-700"/>
                                        </div>
                                        
                                        <button
                                        onClick={handleUpload}
                                        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                        >
                                            Upload Document
                                            </button>
                                            {uploadedDocument && (
                                                <button
                                                onClick={handleGenerateSummary}
                                                className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                                                >
                                                    Generate Summary
                                                    </button>
                                                )
                                                }
                                                {generatedSummary && (
  <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">

    <h3 className="text-xl font-semibold text-gray-900">
  {generatedSummary.title}
</h3>

<p className="text-gray-700 mt-4">
  {generatedSummary.summary}
</p>

<ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
  {generatedSummary.key_points.map((point, index) => (
    <li key={index}>{point}</li>
  ))}
</ul>

<h4 className="text-lg font-semibold text-gray-900 mt-6">
  Conclusion
</h4>

<p className="text-gray-700 mt-3">
  {generatedSummary.conclusion}
</p>

<p className="text-sm text-gray-500 mt-6">
  Summary word count: {generatedSummary.word_count}
</p>

<button
  onClick={handleExportPDF}
  className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
>
  Export Summary as PDF
</button>
  </div>
)}
                                                </div>
                                                </main>
                                                </div>
                                                )
                                            }
                                            export default Dashboard