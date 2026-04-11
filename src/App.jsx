import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { PatientFormProvider } from "./context/PatientFormContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PersonalInfo from "./components/PersonalInfo";
import HealthInsurance from "./components/HealthInsurance";
import BillingInfo from "./components/BillingInfo";
import CommunicationInfo from "./components/CommunicationInfo";
import PatientDataPreview from "./components/PatientDataPreview";
import BookingConfirmation from "./components/BookingConfirmation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <PatientFormProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* HOME = start form directly */}
            <Route path="/" element={<PersonalInfo />} />

            {/* FLAT STEPS */}
            <Route path="/communication" element={<CommunicationInfo />} />
            <Route path="/health" element={<HealthInsurance />} />
            <Route path="/billing" element={<BillingInfo />} />
            <Route path="/preview" element={<PatientDataPreview />} />

            {/* CONFIRMATION */}
            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />

            {/* fallback */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </PatientFormProvider>
  );
}
