import { Button, Container, Heading, Html, Text, Section, Row, Column } from "@react-email/components";

export default function DoctorNotification({ patientData }) {
  return (
    <Html>
      <Container style={container}>
        <Heading style={heading}>New Patient Appointment Booking</Heading>
        
        <Section style={section}>
          <Text style={text}>Dear Doctor,</Text>
          <Text style={text}>
            A new patient appointment has been booked. Here are the details:
          </Text>
        </Section>

        <Section style={section}>
          <Heading as="h2" style={subheading}>Patient Information</Heading>
          <Row>
            <Column style={column}>
              <Text style={label}>Name:</Text>
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
              <Text style={label}>Phone:</Text>
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
              <Text style={label}>Name:</Text>
              <Text style={value}>{patientData.nameOfNearestRelative}</Text>
            </Column>
            <Column style={column}>
              <Text style={label}>Phone:</Text>
              <Text style={value}>{patientData.mobileNoOfNearestRelative}</Text>
            </Column>
          </Row>
        </Section>

        <Section style={section}>
          <Heading as="h2" style={subheading}>Insurance Information</Heading>
          <Row>
            <Column style={column}>
              <Text style={label}>Insurance:</Text>
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
              <Text style={label}>Scheme:</Text>
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

        <Section style={section}>
          <Text style={text}>
            Booking Date: {new Date().toLocaleDateString()}
          </Text>
          <Text style={text}>
            Please review the patient information and prepare for the appointment.
          </Text>
        </Section>

        <Button 
          href="https://your-hospital.com/admin" 
          style={button}
        >
          View Patient Details
        </Button>
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
  fontSize: "24px",
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

const section = {
  marginBottom: "20px",
  padding: "15px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
};

const text = {
  fontSize: "14px",
  color: "#4b5563",
  marginBottom: "10px",
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
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "bold",
};
