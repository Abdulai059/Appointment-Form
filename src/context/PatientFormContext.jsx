import { createContext, useContext, useState } from "react";

const PatientFormContext = createContext(null);

export function PatientFormProvider({ children }) {
  const [patientData, setPatientData] = useState({
    personalInfo: {},
    communicationInfo: {},
    healthInsuranceInfo: {},
    billingInfo: {},
  });

  const updateSection = (section, data) => {
    setPatientData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  return (
    <PatientFormContext.Provider value={{ patientData, updateSection }}>
      {children}
    </PatientFormContext.Provider>
  );
}

export function usePatientForm() {
  const context = useContext(PatientFormContext);
  if (!context) {
    throw new Error("usePatientForm must be used inside PatientFormProvider");
  }
  return context;
}
