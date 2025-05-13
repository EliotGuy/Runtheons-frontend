"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { HeaderType, FooterType } from "@/types/sanity";

const ClientLayout = ({ children, header, footer }: {
  children: React.ReactNode;
  header: HeaderType;
  footer: FooterType;
}) => {
  return (
    <>
      <Header data={header} />
      <main>{children}</main>
      <Footer data={footer} />
    </>
  );
};

export default ClientLayout;
