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
  openGraph: {
    title: "Curiosity AI | Compute AI Infrastructure Platform for Abundant Intelligence",
    description:
      "Bringing 5MW to 100MW+ of AI compute infrastructure online with AI Factories across India.",
    type: "website",
    locale: "en_US",
    url: "https://curiosityai.in",
    siteName: "Curiosity AI",
  },
  robots: {
    index: true,
    follow: true,
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

