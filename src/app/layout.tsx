import type { Metadata } from "next";
import { Bebas_Neue, Mona_Sans, Big_Shoulders, Permanent_Marker, Figtree, Oswald, Sedgwick_Ave, Belanosima } from "next/font/google";
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

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const sedgwickAve = Sedgwick_Ave({
  variable: "--font-sedgwick-ave",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const belanosima = Belanosima({
  variable: "--font-belanosima",
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
      className={`${bebasNeue.variable} ${monaSans.variable} ${bigShoulders.variable} ${permanentMarker.variable} ${figtree.variable} ${oswald.variable} ${sedgwickAve.variable} ${belanosima.variable} h-full antialiased`}
    >
      <body className="min-h-full select-none flex flex-col">

        <Header />
        {children}
        <Footer />
        
      </body>
    </html>
  );
}
