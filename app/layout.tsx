import type { Metadata } from "next";
import "./globals.css";
import { ShortlistProvider } from "./components/ShortlistProvider";

export const metadata: Metadata = {
  title: "Dune & Oak — Interior Architecture, Hospitality & Styling",
  description:
    "Space to settle in. Dune & Oak is an interior design studio focused on warm residential interiors, boutique hospitality spaces, and tactile furniture styling in solid oak, stone, lime plaster, and linen.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ShortlistProvider>{children}</ShortlistProvider>
      </body>
    </html>
  );
}
