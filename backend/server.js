// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------------
//  🔹 Grundkonfiguration
// ------------------------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend läuft auf http://localhost:${PORT}`);
});

// ------------------------------------
//  🔹 Simple Root-Check
// ------------------------------------
app.get("/", (req, res) => {
  res.json({ ok: true, message: "HygieneTool Backend aktiv" });
});

// ------------------------------------
//  🔹 Dummy-Endpunkt: Schulungslink generieren
// ------------------------------------
//
// später mit Stripe + E-Mail-Versand kombiniert
//
app.post("/api/training/create", (req, res) => {
  const { name, email, typ, sprache } = req.body;

  if (!name || !email || !typ) {
    return res.status(400).json({ success: false, message: "Fehlende Angaben" });
  }

  // generiere eindeutigen Token
  const token = Math.random().toString(36).substring(2, 10);
  const link = `https://hygienetool-schulung.de/start?token=${token}&lang=${sprache || "de"}&type=${typ}`;

  const preis = typ === "erstbelehrung" ? 15 : 10;

  res.json({
    success: true,
    message: "Schulungslink generiert",
    link,
    preis,
    token,
  });
});

// ------------------------------------
//  🔹 (später) Stripe-Zahlung (Platzhalter)
// ------------------------------------
app.post("/api/training/pay", (req, res) => {
  // später: Stripe Checkout integrieren
  res.json({
    success: true,
    checkoutUrl: "https://checkout.stripe.com/fake-session",
  });
});

// ------------------------------------
//  🔹 (später) Abschluss & Zertifikat generieren
// ------------------------------------
app.post("/api/training/complete", (req, res) => {
  const { name, email } = req.body;

  // später: PDF generieren + E-Mail-Versand
  const fakeCertificate = `https://hygienetool.de/zertifikate/${Date.now()}.pdf`;

  res.json({
    success: true,
    certificateUrl: fakeCertificate,
  });
});

// ------------------------------------
//  🔹 Test-Mailer (Vorbereitung für später)
// ------------------------------------
// Damit kannst du später automatisch Zertifikate versenden.
app.post("/api/mail/test", async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(400).json({ success: false, message: "Empfänger fehlt" });

  // Test-Mailer über Ethereal (Fake-Mailbox)
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"HygieneTool" <no-reply@hygienetool.de>',
    to,
    subject: "Test-Mail vom HygieneTool",
    text: "Hallo 👋, das ist eine Test-E-Mail aus deinem HygieneTool-Backend.",
  });

  res.json({
    success: true,
    previewUrl: nodemailer.getTestMessageUrl(info),
  });
});
