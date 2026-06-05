import type { Metadata } from "next";
import { Inter, Darker_Grotesque, Cairo, Sofia_Sans, Dancing_Script, Outfit, Plus_Jakarta_Sans, Geist, Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "San Diego Website Experts | Turn Your Website Into a Lead Machine",
  description: "San Diego's top web design & development agency. We build custom, conversion-focused websites that generate leads, rank on Google, and grow your business. Get a free website audit today.",
  keywords: ["web design San Diego", "web development San Diego", "SEO San Diego", "lead generation website", "conversion focused web design", "San Diego website agency"],
  authors: [{ name: "San Diego Website Experts" }],
  metadataBase: new URL("https://sandiego.agency"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "San Diego Website Experts | Turn Your Website Into a Lead Machine",
    description: "San Diego's top web design & development agency. We build custom, conversion-focused websites that generate leads, rank on Google, and grow your business.",
    url: "https://sandiego.agency",
    siteName: "San Diego Website Experts",
    images: [{ url: "/hero-banner.png", width: 1284, height: 720, alt: "San Diego Website Experts" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "San Diego Website Experts | Turn Your Website Into a Lead Machine",
    description: "San Diego's top web design & development agency. Custom websites that generate leads and grow your business.",
    images: ["/hero-banner.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${darkerGrotesque.variable} ${cairo.variable} ${sofiaSans.variable} ${plusJakartaSans.variable} ${dancingScript.variable} ${outfit.variable} ${geist.variable} ${urbanist.variable} antialiased bg-[#E3EEFB] overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
