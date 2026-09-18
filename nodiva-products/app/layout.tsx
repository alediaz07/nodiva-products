import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NODIVA PRODUCTS S.A. | Soluciones de alimentación",
  description:
    "Gestión integral de comedores estudiantiles, sodas institucionales y catering en Costa Rica.",
  icons: {
    icon: "/images/nodiva-logo.jpeg",
    shortcut: "/images/nodiva-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
