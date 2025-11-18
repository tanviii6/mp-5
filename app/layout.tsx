import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Shortner | MP-5",
  description: "URL Shortner App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
        
      </body>
    </html>
  );
}
