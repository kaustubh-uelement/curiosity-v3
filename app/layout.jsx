import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://curiosityai.in"),
  title: {
    default: "Curiosity AI | Compute AI Infrastructure Platform for Abundant Intelligence",
    template: "%s | Curiosity AI",
  },
  description:
    "Curiosity AI is a full-stack compute AI infrastructure platform bringing 5MW to 100MW+ of AI Factory capacity online for large-scale neo-clouds and enterprise AI.",
  applicationName: "Curiosity AI",
  authors: [{ name: "Curiosity AI", url: "https://curiosityai.in" }],
  creator: "Curiosity AI",
  publisher: "Curiosity AI",
  keywords: [
    "Curiosity AI",
    "AI Compute",
    "AI Infrastructure",
    "NVIDIA Blackwell B300",
    "NVIDIA GB300",
    "AMD Instinct MI400",
    "AI Factories",
    "GPUaaS",
    "Bare Metal GPU",
    "India AI Data Centres",
    "Megawatt AI Scale",
    "Abundant Intelligence",
  ],
  icons: {
    icon: [
      { url: "/curiosity-ai-icon-blue.png", type: "image/png" },
      { url: "/curiosity-ai-icon-blue.png", sizes: "32x32", type: "image/png" },
      { url: "/curiosity-ai-icon-blue.png", sizes: "192x192", type: "image/png" },
      { url: "/curiosity-ai-icon-blue.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/curiosity-ai-icon-blue.png"],
    apple: [
      { url: "/curiosity-ai-icon-blue.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Curiosity AI | Compute AI Infrastructure Platform for Abundant Intelligence",
    description:
      "Bringing 5MW to 100MW+ of AI compute infrastructure online with AI Factories across India.",
    type: "website",
    locale: "en_US",
    url: "https://curiosityai.in",
    siteName: "Curiosity AI",
    images: [
      {
        url: "/curiosity-og-image.png",
        width: 1894,
        height: 826,
        alt: "Curiosity AI | Compute AI Infrastructure Platform for Abundant Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curiosity AI | Compute AI Infrastructure Platform for Abundant Intelligence",
    description:
      "Bringing 5MW to 100MW+ of AI compute infrastructure online with AI Factories across India.",
    images: ["/curiosity-og-image.png"],
  },
  alternates: {
    canonical: "https://curiosityai.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0A0611",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      id="top"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} scroll-smooth`}
    >
      <body className="bg-ink text-tx font-body antialiased selection:bg-electric selection:text-white">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

