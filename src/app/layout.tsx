import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NTL 95 Barber Shop | Đặt Lịch Cắt Tóc Online",
  description: "Hệ thống đặt lịch cắt tóc online tại NTL 95 Barber Shop. Đặt lịch nhanh chóng, tiện lợi. Tích điểm đổi quà.",
  keywords: ["barber", "cắt tóc", "đặt lịch", "NTL 95", "barber shop"],
  authors: [{ name: "NTL 95 Barber Shop" }],
  openGraph: {
    title: "NTL 95 Barber Shop | Đặt Lịch Cắt Tóc Online",
    description: "Hệ thống đặt lịch cắt tóc online tại NTL 95 Barber",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
