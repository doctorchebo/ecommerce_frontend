"use client";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import "./globals.css";
import { store } from "./store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
