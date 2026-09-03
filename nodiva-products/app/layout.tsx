import type { Metadata } from "next";
import "./globals.css";

const imagePath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const metadata: Metadata = {
  title: "NODIVA PRODUCTS S.A. | Soluciones de alimentación",
  description:
    "Gestión integral de comedores estudiantiles, sodas institucionales y catering en Costa Rica.",
  icons: {
    icon: imagePath("/images/nodiva-logo.jpeg"),
    shortcut: imagePath("/images/nodiva-logo.jpeg"),
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
