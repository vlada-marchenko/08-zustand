
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { Metadata } from "next";
import { Roboto } from 'next/font/google'
import { swap } from "formik";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you`re at home or on the go. The app provides a clean interface for writing, editing, and browsing notes. With support for keyword search and structured organization, NoteHub offers a streamlined experience for anyone who values clarity and productivity.',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you`re at home or on the go. The app provides a clean interface for writing, editing, and browsing notes. With support for keyword search and structured organization, NoteHub offers a streamlined experience for anyone who values clarity and productivity.',
    url: 'https://08-zustand-five.vercel.app',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'NoteHub'
    }]
  }
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
        <Header />
        {children}
        {modal}
        <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
