import Header from "@/components/large/Header";
import "./app.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/large/Footer";
import Providers from "@/components/medium/Providers";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {/* container */}
        <div className="max-w-4xl mx-auto px-2 pt-5 text-grayColor">
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
