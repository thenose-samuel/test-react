import "./globals.css";
import { Inter } from "next/font/google";
import "@fontsource/ibm-plex-sans";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NFT Warranty",
  description: "A nft based warranty system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
