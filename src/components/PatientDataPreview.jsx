import { usePatientForm } from "../context/PatientFormContext";
import Button from "./Button";
import { useAddPatientBooking } from "../service/useAddBooking";

export default function PatientDataPreview() {
  const { patientData } = usePatientForm();
  const { mutate, isLoading, isError, error } = useAddPatientBooking();

  const display = (value) => value || "-";

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmitAll = () => {
    const combinedData = {
      ...patientData.personalInfo,
      ...patientData.communicationInfo,
      ...patientData.healthInsurance,
      ...patientData.billingInfo,
    };
    mutate(combinedData);
  };

  const renderRowTable = (title, labels, values) => (
    <section className="bg-gray-50 rounded shadow overflow-hidden max-w-6xl mx-auto my-4">
      <h2 className="font-semibold text-xl p-6 pb-4 border-b border-gray-200 text-center">
        {title}
      </h2>
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
                className="px-4 py-3 text-center text-gray-900 font-semibold"
              >
                {display(value)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto py-6 bg-green-50">
      <div className="text-center mb-6">
        <img
          src="/logo-ling.webp"
          alt="Hospital Logo"
          className="h-16 mx-auto mb-3"
        />
        <h2 className="text-2xl font-semibold mb-1">
          Patient Registration Summary
        </h2>
        <p className="text-sm text-gray-600">
          Please download or present this document at the hospital reception
          during your visit.
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
          patientData.healthInsurance?.insurance,
          patientData.healthInsurance?.insuranceScheme,
          patientData.healthInsurance?.insuranceNumber,
          patientData.healthInsurance?.insuranceSerialNumber,
          patientData.healthInsurance?.expiringDate,
        ],
      )}

      {renderRowTable(
        "Billing Information",
        [
          "Payment Method",
          "Payment Responsibility",
          "Billing Address",
          "Billing City",
          "Billing Region",
          "Postal Code",
          "Billing Phone",
          "Billing Email",
          "Emergency Contact",
          "Emergency Phone",
          "Special Instructions",
        ],
        [
          patientData.billingInfo?.paymentMethod,
          patientData.billingInfo?.paymentResponsibility,
          patientData.billingInfo?.billingAddress,
          patientData.billingInfo?.billingCity,
          patientData.billingInfo?.billingRegion,
          patientData.billingInfo?.billingPostalCode,
          patientData.billingInfo?.billingPhone,
          patientData.billingInfo?.billingEmail,
          patientData.billingInfo?.emergencyBillingContact,
          patientData.billingInfo?.emergencyBillingPhone,
          patientData.billingInfo?.specialInstructions,
        ],
      )}

      <div className="flex gap-4 pt-4 bg-white">
        <Button onClose={handleBack} label="Back" />
        <Button
          onSubmit={handleSubmitAll}
          label={isLoading ? "Submitting..." : "Submit All Data"}
          variant="submit"
        />
      </div>

      {isError && (
        <p className="mt-4 text-red-500">
          Error submitting data: {error?.message}
        </p>
      )}
    </div>
  );
}
