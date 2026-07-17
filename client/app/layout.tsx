import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Factory Owner Overview",
  description: "Real-time industrial factory monitoring and control dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F4F5F7] text-gray-900 antialiased">{children}</body>
    </html>
  );
}
