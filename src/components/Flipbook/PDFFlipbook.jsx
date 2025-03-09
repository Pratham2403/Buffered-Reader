import React, { useState, useEffect } from "react"; // Import useEffect
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for fetching the PDF

// Set up the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.mjs`;

const PdfViewer = () => {
  const location = useLocation();
  const fileId = location.state?.pdfUrl || ""; // Get the file ID from location state
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null); // Blob URL for the PDF
  const [numPages, setNumPages] = useState(null); // Total number of pages
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    if (!fileId) {
      setError("No file ID provided.");
      return;
    }

    // Fetch the PDF file using the proxy server
    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/download?fileId=${fileId}`,
          { responseType: "arraybuffer" }
        );

        // Convert the file content to a Blob URL
        const blob = new Blob([response.data], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(blobUrl);
      } catch (err) {
        console.error("Error fetching PDF:", err);
        setError("Failed to fetch the PDF. Please check the file ID and try again.");
      }
    };

    fetchPdf();
  }, [fileId]);

  // Handle PDF load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to the first page when a new PDF is loaded
  };

  return (
    <div className="pdf-viewer">
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="back-button">
            ⬅ Back to Archive
          </button>

          {/* PDF Document */}
          {pdfBlobUrl && (
            <Document
              file={pdfBlobUrl} // Use the Blob URL
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => console.error("Error loading PDF:", error)}
            >
              <Page pageNumber={pageNumber} width={800} />
            </Document>
          )}

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pageNumber === 1}
            >
              ⬅ Previous
            </button>
            <button
              onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
              disabled={pageNumber === numPages}
            >
              Next ➡
            </button>
          </div>

          {/* Page Indicator */}
          <p className="page-indicator">
            Page {pageNumber} of {numPages}
          </p>
        </>
      )}
    </div>
  );
};

export default PdfViewer;