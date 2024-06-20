import Header from "@/components/large/Header";
import "./app.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

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
          <Header />
          {children}
        </div>
        <br />
        <br />
        <br />
        <br />
      </body>
    </html>
  );
}
