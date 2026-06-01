import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MotorMedic — Performance & Workshop Services",
  description:
    "MotorMedic — Advanced automotive engineering, diagnostics, servicing and performance tuning in Auckland.",
  metadataBase: new URL("https://motormedic.co.nz"),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "MotorMedic — Automotive Workshop",
    description: "Advanced automotive engineering and diagnostics for modern performance vehicles.",
    url: "https://motormedic.co.nz",
    siteName: "MotorMedic",
    images: [{ url: "https://motormedic.co.nz/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "MotorMedic", description: "Advanced automotive engineering", images: ["https://yourdomain.com/og-image.jpg"] },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD structured data for SEO (server-side only) */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              "@id": "https://motormedic.co.nz/#organization",
              "url": "https://motormedic.co.nz",
              "name": "MotorMedic",
              "telephone": "+64279165555",
              "email": "motormedicnz@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "5 Wingate Street",
                "addressLocality": "Avondale",
                "addressRegion": "Auckland",
                "postalCode": "0600",
                "addressCountry": "NZ"
              },
              "image": "https://motormedic.co.nz/og-image.jpg",
              "logo": "https://motormedic.co.nz/brand/LOGO PNG.png",
              "sameAs": [
                "https://www.instagram.com/motormedic.autoz/",
                "https://www.facebook.com/profile.php?id=61590655644061"
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  "opens": "08:30",
                  "closes": "17:00"
                }
              ]
            }),
          }}
          type="application/ld+json"
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
