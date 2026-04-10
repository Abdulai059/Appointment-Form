import { usePatientForm } from "../context/PatientFormContext";
import Button from "./Button";
import { createCustomResend } from "../utils/resendClient";
import { useRef } from "react";
import { useNavigate } from "react-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { render } from "@react-email/render";
import PatientConfirmation from "../emails/PatientConfirmation";

function PatientDataPreviewInner({ patientData, pdfSafe }) {
  const display = (value) => value || "-";

  const renderRowTable = (title, labels, values) => (
    <section
      className="rounded px-4 md:px-0 overflow-hidden max-w-pull mx-auto my-4"
      style={{ backgroundColor: pdfSafe ? "#F9FAFB" : "#F9FAFB" }}
    >
      <h2
        className="font-semibold text-xl p-4 md:p-6 pb-3 md:pb-4 text-center"
        style={{
          color: "#111827",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {title}
      </h2>

      <div className="hidden md:block">
        <table
          className="w-full table-fixed"
          style={{ backgroundColor: "#F3F4F6" }}
        >
          <thead>
            <tr>
              {labels.map((label, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-center font-medium"
                  style={{ color: "#6B7280" }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {values.map((value, idx) => (
                <td
                  key={idx}
                  className="px-4 py-3 text-center text-sm break-words"
                  style={{ color: "#111827" }}
                >
                  {display(value)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y">
        {labels.map((label, idx) => (
          <div
            key={idx}
            className="flex justify-between gap-4 py-3 border-b"
            style={{ borderColor: "#E5E7EB" }}
          >
            <span className="text-sm font-medium" style={{ color: "#6B7280" }}>
              {label}
            </span>
            <span
              className="text-sm text-right break-words max-w-[60%]"
              style={{ color: "#111827" }}
            >
              {display(values[idx])}
            </span>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div style={{ padding: 20 }}>
      <div
        className="text-center px-0 py-6 mb-6"
        style={{ backgroundColor: "#ECFDF5", color: "#111827" }}
      >
        <img
          src="/logo-ling.webp"
          alt="Hospital Logo"
          className="h-14 md:h-16 mx-auto mb-3"
        />
        <h2 className="md:text-2xl text-xl font-semibold mb-1">
          Patient Registration Summary
        </h2>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Please present this document at the hospital reception.
        </p>
      </div>

      {renderRowTable(
        "Personal Information",
        [
          "Full Name",
          "Date of Birth",
          "Gender",
          "Marital Status",
          "Occupation",
        ],
        [
          `${patientData.personalInfo?.surname || ""} ${patientData.personalInfo?.otherNames || ""}`,
          patientData.personalInfo?.dateOfBirth,
          patientData.personalInfo?.gender,
          patientData.personalInfo?.maritalStatus,
          patientData.personalInfo?.occupation,
        ],
      )}

      {renderRowTable(
        "Communication Information",
        [
          "Postal Address",
          "Email",
          "Mobile",
          "Nearest Relative",
          "Relative Mobile",
        ],
        [
          patientData.communicationInfo?.postalAddress,
          patientData.communicationInfo?.emailAddress,
          patientData.communicationInfo?.mobileNumber,
          patientData.communicationInfo?.nameOfNearestRelative,
          patientData.communicationInfo?.mobileNoOfNearestRelative,
        ],
      )}

      {renderRowTable(
        "Health Insurance",
        [
          "Insurance",
          "Scheme",
          "Insurance Number",
          "Serial Number",
          "Expiry Date",
        ],
        [
          patientData.healthInsuranceInfo?.insurance,
          patientData.healthInsuranceInfo?.insuranceScheme,
          patientData.healthInsuranceInfo?.insuranceNumber,
          patientData.healthInsuranceInfo?.insuranceSerialNumber,
          patientData.healthInsuranceInfo?.expiringDate,
        ],
      )}

      {renderRowTable(
        "Billing Information",
        [
          "Payment Method",
          "Payment Respon.",
          "Address",
          "City",
          "Region",
          "Phone",
          "Email",
          "Emergency Contact",
        ],
        [
          patientData.billingInfo?.paymentMethod || "-",
          patientData.billingInfo?.paymentResponsibility || "-",
          patientData.billingInfo?.billingAddress || "-",
          patientData.billingInfo?.billingCity || "-",
          patientData.billingInfo?.billingRegion || "-",
          patientData.billingInfo?.billingPhone || "-",
          patientData.billingInfo?.billingEmail || "-",
          patientData.billingInfo?.emergencyBillingContact || "-",
        ],
      )}
    </div>
  );
}

export default function PatientDataPreview({
  pdfSafe = false,
  patientDataOverride,
}) {
  const { patientData: contextData } = usePatientForm();
  const patientData = patientDataOverride || contextData;
  const navigate = useNavigate();
  const pdfRef = useRef(null);

  const handleBack = () => window.history.back();

  // Flatten patient data
  const mapPatientToPayload = (patientData) => ({
    registrationDate: new Date().toISOString(),
    surname: patientData.personalInfo?.surname,
    otherNames: patientData.personalInfo?.otherNames,
    dateOfBirth: patientData.personalInfo?.dateOfBirth,
    ageInYears: patientData.personalInfo?.ageInYears,
    gender: patientData.personalInfo?.gender,
    maritalStatus: patientData.personalInfo?.maritalStatus,
    occupation: patientData.personalInfo?.occupation,

    postalAddress: patientData.communicationInfo?.postalAddress,
    emailAddress: patientData.communicationInfo?.emailAddress,
    mobileNumber: patientData.communicationInfo?.mobileNumber,
    nameOfNearestRelative: patientData.communicationInfo?.nameOfNearestRelative,
    mobileNoOfNearestRelative:
      patientData.communicationInfo?.mobileNoOfNearestRelative,

    insurance: patientData.healthInsuranceInfo?.insurance,
    insuranceNumber: patientData.healthInsuranceInfo?.insuranceNumber,
    insuranceSerialNumber:
      patientData.healthInsuranceInfo?.insuranceSerialNumber,
    expiringDate: patientData.healthInsuranceInfo?.expiringDate,
    insuranceScheme: patientData.healthInsuranceInfo?.insuranceScheme,

    paymentMethod: patientData.billingInfo?.paymentMethod || "",
    paymentResponsibility: patientData.billingInfo?.paymentResponsibility || "",
    billingAddress: patientData.billingInfo?.billingAddress || "",
    billingCity: patientData.billingInfo?.billingCity || "",
    billingRegion: patientData.billingInfo?.billingRegion || "",
    billingPhone: patientData.billingInfo?.billingPhone || "",
    billingEmail: patientData.billingInfo?.billingEmail || "",
    emergencyBillingContact:
      patientData.billingInfo?.emergencyBillingContact || "",
  });

  const sendBookingEmail = async (data) => {
    const resend = createCustomResend(import.meta.env.VITE_RESEND_API_KEY);

    try {
      console.log("Sending email to:", data.emailAddress);
      console.log("Full data object:", data);

      if (!data.emailAddress) {
        console.error("No email address found in data!");
        throw new Error("Patient email address is required");
      }

      // Render the React Email component to HTML
      const emailHtml = await render(
        <PatientConfirmation patientData={data} />,
      );

      const emailClient = resend.emails();
      // For testing, send to your verified email instead of patient email
      const { data: emailData, error } = await emailClient.send({
        from: "onboarding@resend.dev",
        to: "abdulaiosman8080@gmail.com", // Use verified email for testing
        subject: `TEST: Appointment Confirmation for ${data.surname} ${data.otherNames}`,
        html: emailHtml,
      });

      if (error) {
        console.error("Error sending email:", error);
        throw error;
      }
      return emailData;
    } catch (error) {
      console.error("Failed to send email:", error);
      throw error;
    }
  };

  const generatePDF = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#F9FAFB",
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
  };

  const handleSubmitAll = async () => {
    console.log("Submit button clicked!");
    console.log("Patient data:", patientData);

    if (!patientData) {
      console.error("No patient data available!");
      return;
    }

    const payload = mapPatientToPayload(patientData);
    console.log("Payload prepared:", payload);

    try {
      // Send patient confirmation email
      await sendBookingEmail(payload);
      console.log("Patient confirmation email sent!");

      // Send doctor notification email
      const resend = createCustomResend(import.meta.env.VITE_RESEND_API_KEY);
      const DoctorNotification = (await import("../emails/DoctorNotification"))
        .default;

      const doctorHtml = await render(
        DoctorNotification({ patientData: payload }),
      );

      const doctorEmailClient = resend.emails();
      const { data, error } = await doctorEmailClient.send({
        from: "onboarding@resend.dev",
        to: "abdulaiosman8080@gmail.com", // Send as string, not array
        subject: "TEST: New Patient Appointment Booking",
        html: doctorHtml,
      });

      if (error) {
        console.error("Error sending doctor notification:", error);
      } else {
        console.log("Doctor notification sent successfully!");
      }

      // Generate PDF
      await generatePDF();
      console.log("PDF generated!");

      // Navigate to confirmation
      navigate("/booking-confirmation", { state: { guestData: payload } });
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* On-screen preview with billing fallback */}
      <PatientDataPreviewInner
        patientData={{
          ...patientData,
          billingInfo: patientData.billingInfo || {},
        }}
        pdfSafe={false}
      />

      {/* PDF hidden render */}
      <div
        ref={pdfRef}
        style={{
          position: "absolute",
          top: "-10000px",
          left: "-10000px",
          width: "210mm",
          padding: "0px",
          backgroundColor: "#F9FAFB",
        }}
      >
        <PatientDataPreviewInner
          patientData={{
            ...patientData,
            billingInfo: patientData.billingInfo || {},
          }}
          pdfSafe={true}
        />
      </div>

      <div className="flex gap-4 pt-6 px-4 md:px-0">
        <Button
          onClose={handleBack}
          onSubmit={handleSubmitAll}
          variant="submit"
          loading={false}
        />
      </div>
    </div>
  );
}
