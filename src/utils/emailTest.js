import { Resend } from "resend";
import { render } from "@react-email/render";
import DoctorNotification from "../emails/DoctorNotification.jsx";
import PatientConfirmation from "../emails/PatientConfirmation.jsx";

// Test function to verify React Email + Resend setup
export async function testEmailSetup() {
  const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);
  
  // Test patient data
  const testPatientData = {
    surname: "Test",
    otherNames: "Patient",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    mobileNumber: "+1234567890",
    emailAddress: "test@example.com",
    postalAddress: "123 Test St",
    nameOfNearestRelative: "Test Relative",
    mobileNoOfNearestRelative: "+0987654321",
    insurance: "Test Insurance",
    insuranceNumber: "12345",
    insuranceSerialNumber: "67890",
    expiringDate: "2025-12-31",
    insuranceScheme: "Premium",
    paymentMethod: "Credit Card",
    paymentResponsibility: "Self",
  };

  try {
    console.log("Testing React Email rendering...");
    
    // Test doctor notification template
    const doctorHtml = await render(
      DoctorNotification({ patientData: testPatientData })
    );
    console.log("Doctor notification HTML generated:", doctorHtml.length, "characters");
    
    // Test patient confirmation template
    const patientHtml = await render(
      PatientConfirmation({ patientData: testPatientData })
    );
    console.log("Patient confirmation HTML generated:", patientHtml.length, "characters");
    
    console.log("React Email setup is working correctly!");
    console.log("Resend API key configured:", !!import.meta.env.VITE_RESEND_API_KEY);
    
    return {
      doctorHtml: doctorHtml.length,
      patientHtml: patientHtml.length,
      success: true
    };
    
  } catch (error) {
    console.error("Email setup test failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Test Resend connection (without sending actual email)
export async function testResendConnection() {
  const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);
  
  try {
    // Test API connection by checking domains
    const { data, error } = await resend.domains.list();
    
    if (error) {
      console.error("Resend connection test failed:", error);
      return { success: false, error: error.message };
    }
    
    console.log("Resend connection successful!");
    console.log("Available domains:", data?.length || 0);
    
    return { success: true, domains: data?.length || 0 };
    
  } catch (error) {
    console.error("Resend connection test failed:", error);
    return { success: false, error: error.message };
  }
}
