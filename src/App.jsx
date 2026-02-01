import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { PatientFormProvider } from "./context/PatientFormContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PatientForm from "./components/PatientForm";
import PersonalInfo from "./components/PersonalInfo";
import HealthInsurance from "./components/HealthInsurance/InsuranceInfo";
import BillingInfo from "./components/BillingInfo";
import CommunicationInfo from "./components/ CommunicationInfo";
import PatientDataPreview from "./components/PatientDataPreview";
import BookingConfirmation from "./components/BookingConfirmation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <PatientFormProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/patient" replace />} />

            <Route path="/patient" element={<PatientForm />}>
              <Route index element={<Navigate to="personal" replace />} />
              <Route path="personal" element={<PersonalInfo />} />
              <Route path="communication" element={<CommunicationInfo />} />
              <Route path="health" element={<HealthInsurance />} />
              <Route path="billing" element={<BillingInfo />} />
              <Route path="preview" element={<PatientDataPreview />} />
            </Route>

            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />

            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </PatientFormProvider>
  );
}
