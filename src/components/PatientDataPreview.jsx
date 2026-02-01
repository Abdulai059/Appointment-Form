import { usePatientForm } from "../context/PatientFormContext";
import Button from "./Button";
import { useAddPatientBooking } from "../service/useAddBooking";
import emailjs from "@emailjs/browser";

export default function PatientDataPreview() {
  const { patientData, getCombinedData } = usePatientForm();
  const { mutate, isLoading, isError, error } = useAddPatientBooking();

  const display = (value) => value || "-";
  const handleBack = () => window.history.back();

  const sendBookingEmail = async (data) => {
    const templateParams = {
      name: `${data.personalInfo?.surname || ""} ${data.personalInfo?.otherNames || ""}`,
      dob: data.personalInfo?.dateOfBirth || "-",
      gender: data.personalInfo?.gender || "-",

      phone: data.communicationInfo?.mobileNumber || "-",
      email: data.communicationInfo?.emailAddress || "-",
      address: data.communicationInfo?.postalAddress || "-",

      emergencyName: data.communicationInfo?.nameOfNearestRelative || "-",
      emergencyPhone: data.communicationInfo?.mobileNoOfNearestRelative || "-",

      paymentMethod: data.billingInfo?.paymentMethod || "-",
      insurance: data.healthInsuranceInfo?.insurance || "-",
      insuranceNumber: data.healthInsuranceInfo?.insuranceNumber || "-",
      insuranceExpiry: data.healthInsuranceInfo?.expiringDate || "-",
    };

    await emailjs.send(
      "service_qahdkyi",
      "template_1jjrjzh",
      templateParams,
      "-60hM25v-wrJ-vuf_",
    );
  };

  const handleSubmitAll = () => {
    const combinedData = getCombinedData();

    mutate(combinedData, {
      onSuccess: async () => {
        await sendBookingEmail(combinedData);
      },
    });
  };

  const renderRowTable = (title, labels, values) => (
    <section className="rounded px-4 md:px-6 overflow-hidden max-w-6xl mx-auto my-4">
      <h2 className="font-semibold text-xl p-4 md:p-6 pb-3 md:pb-4 border-b border-gray-200 text-center">
        {title}
      </h2>

      <div className="hidden md:block">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              {labels.map((label, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-center text-gray-600 font-medium"
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
                  className="px-4 py-3 text-center text-sm text-gray-900 break-words"
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
            className="flex justify-between gap-4 py-3 border-b border-gray-200"
          >
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <span className="text-sm text-gray-900 text-right break-words max-w-[60%]">
              {display(values[idx])}
            </span>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto bg-white">
      <div className="text-center px-6 py-6 mb-6 bg-green-50">
        <img
          src="/logo-ling.webp"
          alt="Hospital Logo"
          className="h-14 md:h-16 mx-auto mb-3"
        />
        <h2 className="md:text-2xl text-xl font-semibold mb-1">
          Patient Registration Summary
        </h2>
        <p className="text-sm text-gray-600">
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
          "Payment Responsibility",
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

      <div className="flex gap-4 pt-6 px-4 md:px-0">
        <Button onClose={handleBack} label="Back" />
        <Button
          onSubmit={handleSubmitAll}
          label={isLoading ? "Submitting..." : "Submit All Data"}
          variant="submit"
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
