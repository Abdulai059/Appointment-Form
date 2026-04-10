import { Button, Container, Heading, Html, Text, Section, Row, Column } from "@react-email/components";

export default function PatientConfirmation({ patientData }) {
  return (
    <Html>
      <Container style={container}>
        <Heading style={heading}>Appointment Confirmation</Heading>
        
        <Section style={headerSection}>
          <Text style={greeting}>Dear {patientData.surname} {patientData.otherNames},</Text>
          <Text style={text}>
            Your appointment has been successfully booked! We're looking forward to seeing you.
          </Text>
        </Section>

        <Section style={section}>
          <Heading as="h2" style={subheading}>Your Appointment Details</Heading>
          <Row>
            <Column style={column}>
              <Text style={label}>Patient Name:</Text>
              <Text style={value}>{patientData.surname} {patientData.otherNames}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={column}>
              <Text style={label}>Date of Birth:</Text>
              <Text style={value}>{patientData.dateOfBirth}</Text>
            </Column>
            <Column style={column}>
              <Text style={label}>Gender:</Text>
              <Text style={value}>{patientData.gender}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={column}>
              <Text style={label}>Contact Phone:</Text>
              <Text style={value}>{patientData.mobileNumber}</Text>
            </Column>
            <Column style={column}>
              <Text style={label}>Email:</Text>
              <Text style={value}>{patientData.emailAddress}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={column}>
              <Text style={label}>Address:</Text>
              <Text style={value}>{patientData.postalAddress}</Text>
            </Column>
          </Row>
        </Section>

        <Section style={section}>
          <Heading as="h2" style={subheading}>Emergency Contact</Heading>
          <Row>
            <Column style={column}>
              <Text style={label}>Emergency Contact:</Text>
              <Text style={value}>{patientData.nameOfNearestRelative}</Text>
            </Column>
            <Column style={column}>
              <Text style={label}>Emergency Phone:</Text>
              <Text style={value}>{patientData.mobileNoOfNearestRelative}</Text>
            </Column>
          </Row>
        </Section>

        <Section style={section}>
          <Heading as="h2" style={subheading}>Insurance Information</Heading>
          <Row>
            <Column style={column}>
              <Text style={label}>Insurance Provider:</Text>
              <Text style={value}>{patientData.insurance}</Text>
            </Column>
            <Column style={column}>
              <Text style={label}>Insurance Number:</Text>
              <Text style={value}>{patientData.insuranceNumber}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={column}>
              <Text style={label}>Expiry Date:</Text>
              <Text style={value}>{patientData.expiringDate}</Text>
            </Column>
            <Column style={column}>
              <Text style={label}>Insurance Scheme:</Text>
              <Text style={value}>{patientData.insuranceScheme}</Text>
            </Column>
          </Row>
        </Section>

        <Section style={section}>
          <Heading as="h2" style={subheading}>Payment Information</Heading>
          <Row>
            <Column style={column}>
              <Text style={label}>Payment Method:</Text>
              <Text style={value}>{patientData.paymentMethod}</Text>
            </Column>
            <Column style={column}>
              <Text style={label}>Payment Responsibility:</Text>
              <Text style={value}>{patientData.paymentResponsibility}</Text>
            </Column>
          </Row>
        </Section>

        <Section style={importantSection}>
          <Heading as="h2" style={subheading}>Important Information</Heading>
          <Text style={text}>
            <strong>Booking Date:</strong> {new Date().toLocaleDateString()}
          </Text>
          <Text style={text}>
            Please arrive 15 minutes before your scheduled appointment time.
          </Text>
          <Text style={text}>
            Please bring this confirmation email and a valid ID to your appointment.
          </Text>
          <Text style={text}>
            If you need to reschedule or cancel, please call us at least 24 hours in advance.
          </Text>
        </Section>

        <Section style={contactSection}>
          <Text style={text}>
            If you have any questions, please don't hesitate to contact us:
          </Text>
          <Text style={text}>
            <strong>Phone:</strong> +1 (555) 123-4567<br />
            <strong>Email:</strong> info@yourhospital.com<br />
            <strong>Address:</strong> 123 Hospital Street, Medical City, MC 12345
          </Text>
        </Section>

        <Button 
          href="https://your-hospital.com/patient-portal" 
          style={button}
        >
          Access Patient Portal
        </Button>

        <Section style={footerSection}>
          <Text style={footerText}>
            Thank you for choosing our hospital for your healthcare needs!
          </Text>
          <Text style={footerText}>
            Best regards,<br />
            The Hospital Team
          </Text>
        </Section>
      </Container>
    </Html>
  );
}

const container = {
  backgroundColor: "#ffffff",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  maxWidth: "600px",
  margin: "0 auto",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#1f2937",
  textAlign: "center",
  marginBottom: "20px",
};

const subheading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#374151",
  marginBottom: "10px",
};

const headerSection = {
  marginBottom: "20px",
  textAlign: "center",
};

const section = {
  marginBottom: "20px",
  padding: "15px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
};

const importantSection = {
  marginBottom: "20px",
  padding: "15px",
  backgroundColor: "#fef3c7",
  borderRadius: "8px",
  border: "1px solid #fbbf24",
};

const contactSection = {
  marginBottom: "20px",
  padding: "15px",
  backgroundColor: "#dbeafe",
  borderRadius: "8px",
};

const footerSection = {
  marginTop: "30px",
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#f3f4f6",
  borderRadius: "8px",
};

const greeting = {
  fontSize: "16px",
  color: "#1f2937",
  marginBottom: "10px",
  fontWeight: "bold",
};

const text = {
  fontSize: "14px",
  color: "#4b5563",
  marginBottom: "10px",
  lineHeight: "1.5",
};

const label = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#6b7280",
  marginBottom: "2px",
};

const value = {
  fontSize: "14px",
  color: "#1f2937",
  marginBottom: "10px",
};

const column = {
  padding: "5px",
};

const button = {
  backgroundColor: "#10b981",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "20px auto",
  textAlign: "center",
};

const footerText = {
  fontSize: "14px",
  color: "#6b7280",
  fontStyle: "italic",
};
