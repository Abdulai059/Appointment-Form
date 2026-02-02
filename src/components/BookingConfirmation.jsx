import { useLocation } from "react-router";
import { CheckCircle, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import PatientDataPreview from "./PatientDataPreview";

export default function BookingConfirmation({ onNewBooking }) {
  const location = useLocation();
  const { guestData } = location.state || {};
  const printRef = useRef(null);

  const handleDownload = async () => {
    if (!printRef.current || !guestData) return;

    // Small delay to ensure offscreen div renders
    await new Promise((r) => setTimeout(r, 100));

    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#F9FAFB", // hard-coded background
      });

      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("booking_confirmation.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  if (!guestData) {
    return <p className="text-center mt-10">No booking data available.</p>;
  }

  return (
    <div className="min-h-screen md:py-20 py-12 px-4">
      {/* Offscreen div for PDF generation */}
      <div
        ref={printRef}
        style={{
          position: "absolute",
          top: "-10000px",
          left: "-10000px",
          width: "210mm",
          padding: "0px",
          backgroundColor: "#F9FAFB", // hex, html2canvas-safe
          color: "#111827", // text color in hex
        }}
      >
        {/* Render the PDF-safe preview */}
        <PatientDataPreview
          patientDataOverride={guestData}
          pdfSafe={true} // ensures PDF-safe colors
        />
      </div>

      {/* Visible confirmation UI */}
      <div className="max-w-2xl mx-auto">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            padding: "2rem",
            borderRadius: "0.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              margin: "0 auto 1rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #16A34A, #059669)",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <CheckCircle style={{ width: 32, height: 32, color: "#FFFFFF" }} />
          </div>

          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            Booking Confirmed! 🎉
          </h1>

          <p
            style={{
              fontSize: "0.875rem",
              color: "#4B5563",
              marginBottom: "2rem",
            }}
          >
            Your reservation has been successfully created
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <button
              onClick={handleDownload}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "1rem",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#FFFFFF",
                background: "linear-gradient(90deg, #2563EB, #4F46E5)",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Download style={{ width: 20, height: 20 }} />
              Download Confirmation
            </button>

            <button
              onClick={onNewBooking || (() => (window.location.href = "/"))}
              style={{
                padding: "0.75rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#374151",
                backgroundColor: "#F3F4F6",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create New Booking
            </button>
          </div>

          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "#DBEAFE",
              border: "1px solid #BFDBFE",
              borderRadius: "0.75rem",
              padding: "1rem",
            }}
          >
            <p style={{ fontSize: "0.75rem", color: "#1D4ED8" }}>
              A confirmation email has been sent to{" "}
              <strong>{guestData.communicationInfo?.emailAddress}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
