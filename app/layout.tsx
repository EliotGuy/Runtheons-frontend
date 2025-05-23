import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { client } from "@/lib/sanity";
import { HeaderType, FooterType } from "@/types/sanity";
import ThemeProvider from "@/components/ThemeProvider";
import ClientLayout from "@/components/ClientLayout"; // ✅ Import the client component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

async function getHeaderData() {
  return client.fetch<HeaderType>('*[_type == "globalHeader"][0]');
}

async function getFooterData() {
  return client.fetch<FooterType>('*[_type == "footer"][0]');
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const header = await getHeaderData();
  const footer = await getFooterData();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black font-satoshi`}>
        <ThemeProvider>
          <ClientLayout header={header} footer={footer}>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
