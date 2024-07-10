import * as React from "react";

interface EmailTemplateProps {
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  message,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
    <h2 style={{ color: "#005A9C" }}>New Message from Your Portfolio</h2>
    <p>
      <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
    </p>
    <p>
      <strong>Message:</strong>
    </p>
    <p>{message}</p>
  </div>
);
