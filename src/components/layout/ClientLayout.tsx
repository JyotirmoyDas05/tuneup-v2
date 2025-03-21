"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <>
      <Header />
      {children}
      {!isAuthPage && <Newsletter />}
      <Footer />
    </>
  );
} 