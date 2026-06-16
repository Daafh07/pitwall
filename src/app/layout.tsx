import type { Metadata } from "next";
import { Bebas_Neue, Mona_Sans, Big_Shoulders, Permanent_Marker } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  weight: ["300"],
  subsets: ["latin"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "PITWALL",
  description: "Formula 1 information dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${monaSans.variable} ${bigShoulders.variable} ${permanentMarker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        <Header />
        {children}
        <Footer />
        
      </body>
    </html>
  );
}
