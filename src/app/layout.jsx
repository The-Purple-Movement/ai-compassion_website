import { Libre_Baskerville, Sen } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre",
});

const sen = Sen({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sen",
});

export const metadata = {
  title: "AI + Compassion",
  description: "The Global Forum on AI + Compassion unites innovators, policymakers, and cultural leaders to explore how artificial intelligence can serve humanity and the planet. ",
  openGraph: {
    title: "AI + Compassion",
    description: "The Global Forum on AI + Compassion unites innovators, policymakers, and cultural leaders to explore how artificial intelligence can serve humanity and the planet. ",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'AI + Compassion',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/web-app-manifest-192x192.png`,
        width: 256,
        height: 75,
        alt: "AI + Compassion",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="AI + Compassion" />
      </head>
      <body
        className={`${libre.variable} ${sen.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}