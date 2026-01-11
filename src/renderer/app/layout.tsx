import "../styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { BreadcrumbGenerator } from "@/components/breadcrumb-generator";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teqvention - Unmatched Media",
  description: "Manage and deploy AI-powered media bots with ease.",
};

const THEME_INIT = `
(function () {
  try {
    var base = localStorage.getItem("base") || "slate";
    var palette = localStorage.getItem("palette") || "neutral";
    document.documentElement.dataset.base = base;
    document.documentElement.dataset.palette = palette;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <>
          dangerouslySetInnerHTML={{ __html: THEME_INIT }}
          id="theme-init"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-h-screen w-screen overflow-hidden antialiased`}
      >
        <Providers>
          <AppSidebar />
          <main className="flex h-screen w-full flex-col">
            <BreadcrumbGenerator />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
