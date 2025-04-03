import { Rubik } from "next/font/google";
import "./globals.css";
import { GeolocationProvider } from "./_components/GeolocationContext";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

export const metadata = {
  title: "IP Address Tracker",
  description: "Search up any IP address or domain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rubik.className}>
      <body>
        <GeolocationProvider>{children}</GeolocationProvider>
      </body>
    </html>
  );
}
