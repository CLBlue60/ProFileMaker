import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

export default function DownloadProfilePDF({ children }) {
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    html2pdf().from(pdfRef.current).save();
  };

  return (
    <div>
      <div ref={pdfRef}>
        {children}
      </div>
      <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
  );
}