import { Inter, Playfair_Display } from "next/font/google";
import { ColorModeScript } from "@chakra-ui/react";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Zura — Create. Connect. Collaborate. Grow.",
  description: "A home for creators to build, share, learn and find opportunities together.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <ColorModeScript initialColorMode="light" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
