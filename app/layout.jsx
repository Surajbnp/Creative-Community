import { Inter, Playfair_Display } from "next/font/google";
import { ColorModeScript } from "@chakra-ui/react";
import Providers from "./providers";
import PwaRegister from "../pwa-register";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Zura — Create. Connect. Collaborate. Grow.",
  description:
    "A home for creators to build, share, learn and find opportunities together.",
  applicationName: "Zura",
  appleWebApp: {
    capable: true,
    title: "Zura",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  other: { "mobile-web-app-capable": "yes" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ColorModeScript initialColorMode="light" />
        <Providers>{children}</Providers>
        <PwaRegister />
      </body>
    </html>
  );
}
