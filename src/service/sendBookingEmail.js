import axios from "axios";

export default async function handler(req, res) {
  const { patient } = req.body;
  const frontDeskEmail = "abdulaiosman8080@gmail.com";

  if (!patient || !patient.surname || !patient.emailAddress) {
    return res.status(400).json({ error: "Patient name or email missing" });
  }

  try {
    const patientHtml = `
      <h2>Booking Confirmation</h2>
      <p>Hi ${patient.surname} ${patient.otherNames || ""},</p>
      <p>Your appointment has been successfully booked!</p>
      <p><strong>Phone:</strong> ${patient.mobileNumber}</p>
      <p><strong>Registration Date:</strong> ${patient.registrationDate}</p>
    `;

    const frontDeskHtml = `
      <h2>New Patient Booking</h2>
      <p><strong>Name:</strong> ${patient.surname} ${patient.otherNames || ""}</p>
      <p><strong>Email:</strong> ${patient.emailAddress}</p>
      <p><strong>Phone:</strong> ${patient.mobileNumber}</p>
    `;

    // Send patient email
    await axios.post(
      "https://api.resend.com/emails",
      {
        from: "Clinic <no-reply@yourclinic.com>",
        to: [patient.emailAddress],
        subject: "Booking Confirmation",
        html: patientHtml,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // Send front desk email
    await axios.post(
      "https://api.resend.com/emails",
      {
        from: "Clinic <no-reply@yourclinic.com>",
        to: [frontDeskEmail],
        subject: "New Patient Booking Received",
        html: frontDeskHtml,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email sending failed:", err.message);
    res.status(500).json({ error: "Email sending failed" });
  }
}
