import Providers from "@/providers/providers";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Staking Info",
  description: "Solana Staking Metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AntdRegistry>{children}</AntdRegistry>
        </Providers>
        {/* <Dashboard> */}
        {/* </Dashboard> */}
      </body>
    </html>
  );
}
