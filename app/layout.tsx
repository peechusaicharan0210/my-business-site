import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agriwerk LLP | Practical agriculture, grown together",
  description: "Agriwerk LLP supports resilient farms, stronger supply chains, and better outcomes for agriculture.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
