import type { Metadata } from "next";
import "./globals.css";

const siteUrl = new URL("https://nodivaproducts.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "NODIVA PRODUCTS | Comedores, Catering y Alimentación en Costa Rica",
  description:
    "Soluciones integrales de alimentación para empresas, instituciones y centros educativos en Costa Rica. Comedores, sodas institucionales, catering y gestión operativa.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: siteUrl,
    siteName: "NODIVA PRODUCTS S.A.",
    title: "NODIVA PRODUCTS | Soluciones de alimentación en Costa Rica",
    description:
      "Comedores, sodas institucionales, catering y soluciones integrales de alimentación para empresas, instituciones y centros educativos.",
    // Add a branded 1200 x 630 image before configuring openGraph.images.
  },
  twitter: {
    card: "summary_large_image",
    title: "NODIVA PRODUCTS | Soluciones de alimentación en Costa Rica",
    description:
      "Comedores, sodas institucionales, catering y soluciones integrales de alimentación en Costa Rica.",
    // Reuse the Open Graph image here once a suitable branded image exists.
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NODIVA PRODUCTS S.A.",
    url: siteUrl.href,
    logo: new URL("/images/nodiva-logo.jpeg", siteUrl).href,
  };

  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
