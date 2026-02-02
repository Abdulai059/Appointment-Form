import { usePatientForm } from "../context/PatientFormContext";
import Button from "./Button";
import { useAddPatientBooking } from "../service/useAddBooking";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useNavigate } from "react-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function PatientDataPreviewInner({ patientData, pdfSafe }) {
  const display = (value) => value || "-";

  const renderRowTable = (title, labels, values) => (
    <section
      className="rounded px-0 md:px-0 overflow-hidden max-w-pull mx-auto my-4"
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
          patientData.billingInfo?.paymentMethod,
          patientData.billingInfo?.paymentResponsibility,
          patientData.billingInfo?.billingAddress,
          patientData.billingInfo?.billingCity,
          patientData.billingInfo?.billingRegion,
          patientData.billingInfo?.billingPhone,
          patientData.billingInfo?.billingEmail,
          patientData.billingInfo?.emergencyBillingContact,
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
  const { mutate, isLoading, isError, error } = useAddPatientBooking();
  const navigate = useNavigate();
  const pdfRef = useRef(null);

  const handleBack = () => window.history.back();

  // MAP function to flatten data for Supabase & EmailJS
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

    paymentMethod: patientData.billingInfo?.paymentMethod,
    paymentResponsibility: patientData.billingInfo?.paymentResponsibility,
    billingAddress: patientData.billingInfo?.billingAddress,
    billingCity: patientData.billingInfo?.billingCity,
    billingRegion: patientData.billingInfo?.billingRegion,
    billingPhone: patientData.billingInfo?.billingPhone,
    billingEmail: patientData.billingInfo?.billingEmail,
    emergencyBillingContact: patientData.billingInfo?.emergencyBillingContact,
  });

  const sendBookingEmail = async (data) => {
    // data is the object returned from Supabase
    const templateParams = {
      name: `${data.surname} ${data.otherNames}`,
      dob: data.dateOfBirth,
      gender: data.gender,

      phone: data.mobileNumber,
      email: data.emailAddress,
      address: data.postalAddress,

      emergencyName: data.nameOfNearestRelative,
      emergencyPhone: data.mobileNoOfNearestRelative,

      paymentMethod: data.paymentMethod,
      insurance: data.insurance,
      insuranceNumber: data.insuranceNumber,
      insuranceExpiry: data.expiringDate,
    };

    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );
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

  const handleSubmitAll = () => {
    const payload = mapPatientToPayload(patientData);

    mutate(payload, {
      onSuccess: async () => {
        await sendBookingEmail(payload);
        await generatePDF();
        navigate("/booking-confirmation", {
          state: { guestData: payload },
        });
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PatientDataPreviewInner patientData={patientData} pdfSafe={false} />

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
        <PatientDataPreviewInner patientData={patientData} pdfSafe={true} />
      </div>

      <div className="flex gap-4 pt-6 px-4 md:px-0">
        <Button
          onClose={handleBack}
          onSubmit={handleSubmitAll}
          variant="submit"
          loading={isLoading}
        />
      </div>

      {isError && (
        <p className="mt-4 text-red-500 text-center">
          Error submitting data: {error?.message}
        </p>
      )}
    </div>
  );
}
