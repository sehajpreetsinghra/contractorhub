import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SRIC Contractor Management Portal | ContractorHub",
  description: "Corporate contractor work authorization, compliance, access, and audit management portal."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
