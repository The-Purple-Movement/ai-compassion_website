import { Libre_Baskerville, Sen, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import TopReadingProgress from "@/components/readingProgress";

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre",
  display: "swap",
});

const sen = Sen({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sen",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://aicompassion.world'),
  title: "AI+Compassion Global Forum 2026 — Kyoto & Global Relay",
  description: "The Global Forum on AI + Compassion unites innovators, policymakers, and cultural leaders to explore how artificial intelligence can serve humanity and the planet.",
  icons: {
    icon: '/og-image.jpg',
    shortcut: '/og-image.jpg',
    apple: '/og-image.jpg',
  },
  openGraph: {
    title: "AI+Compassion Global Forum 2026",
    description: "The Global Forum on AI + Compassion unites innovators, policymakers, and cultural leaders to explore how artificial intelligence can serve humanity and the planet.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://aicompassion.world",
    siteName: 'AI + Compassion',
    images: [
      {
        url: 'https://aicompassion.world/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: "AI + Compassion Global Forum 2026",
      },
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: "AI + Compassion Global Forum 2026",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI+Compassion Global Forum 2026",
    description: "The Global Forum on AI + Compassion unites innovators, policymakers, and cultural leaders to explore how artificial intelligence can serve humanity and the planet.",
    images: ['https://aicompassion.world/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="AI + Compassion" />
        <meta property="og:image" content="https://aicompassion.world/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://aicompassion.world/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://aicompassion.world/og-image.jpg" />
        <link rel="image_src" href="https://aicompassion.world/og-image.jpg" />
      </head>
      <body
        className={`${libre.variable} ${sen.variable} ${jakarta.variable} font-sans antialiased text-[#171918] bg-[#F8F6F0] selection:bg-[#163B32] selection:text-[#F8F6F0]`}
      >
        <TopReadingProgress />
        <SmoothScrollProvider>
          <Navbar />
          <main className="relative flex flex-col w-full min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}