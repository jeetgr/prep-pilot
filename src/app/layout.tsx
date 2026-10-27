import "./globals.css";

import type { Metadata } from "next";
import {
  Familjen_Grotesk,
  Hanken_Grotesk,
  Spline_Sans_Mono,
} from "next/font/google";

// Display: headings and the wordmark. Used sparingly.
const display = Familjen_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

// Body: UI text, forms, paragraphs.
const body = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

// Utility: scores, labels, metadata.
const utility = Spline_Sans_Mono({
  variable: "--font-utility",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "PrepPilot", template: "%s · PrepPilot" },
  description: "AI interview prep with scored feedback.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${utility.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
