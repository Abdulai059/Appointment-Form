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
    <section className="rounded px-6 overflow-hidden max-w-6xl mx-auto my-4">
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
                className="px-4 py-3 text-center text-sm text-gray-900 font-normal"
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
    <div className="max-w-6xl mx-auto bg-white">
      <div className="text-center px-6 py-6 mb-6 bg-green-50">
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

      <section className="rounded px-6 shadow overflow-hidden max-w-6xl mx-auto py-4">
        <h2 className="font-semibold text-xl p-6 pb-4 border-b border-gray-200 text-center">
          Billing Information
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Payment Method",
                  "Payment Responsibility",
                  "Address",
                  "City",
                  "Region",
                  "Phone",
                  "Email",
                  "Emergency Contact",
                ].map((label, idx) => (
                  <th
                    key={idx}
                    className="px-2 py-3 text-center text-gray-600 font-medium"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  patientData.billingInfo?.paymentMethod,
                  patientData.billingInfo?.paymentResponsibility,
                  patientData.billingInfo?.billingAddress,
                  patientData.billingInfo?.billingCity,
                  patientData.billingInfo?.billingRegion,
                  patientData.billingInfo?.billingPhone,
                  patientData.billingInfo?.billingEmail,
                  patientData.billingInfo?.emergencyBillingContact,
                  // patientData.billingInfo?.emergencyBillingPhone,
                ].map((value, idx) => (
                  <td
                    key={idx}
                    className="px-2 py-3 text-center text-sm text-gray-900 font-normal break-words"
                  >
                    {display(value)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

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
