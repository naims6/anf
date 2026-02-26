import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/Providers/StoreProviders";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { BottomNav } from "@/components/shared/Navbar/BottomNav";
import { FloatingActionButton } from "@/components/shared/FloatingButton/FloatingButton";
import {routing} from '@/i18n/routing';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {LanguageProvider} from '@/contexts/LanguageContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "An Nusra Foundation",
  description: "An Nusra Foundation is a non-profit Islamic organization platform designed to support charity-based activities such as Zakat, Sadaqah, Emergency Aid, Education Funds, etc.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  // Next.js 15 এ params একটি Promise, তাই await করা জরুরি
  const {locale} = await params;
  const messages = await getMessages();
  
  return (
    <html lang={locale || 'en'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* locale={locale} প্রপটি যোগ করা হয়েছে যাতে Client Provider ঠিকমতো ভাষা বুঝতে পারে */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageProvider initialLocale={locale as 'en' | 'bn'}>
            <StoreProvider>
              <div>
                <Navbar />
                <BottomNav />
                <FloatingActionButton />
                <div className="min-h-[calc(100vh-600px)]">
                  {children}
                </div>
                <Footer />
              </div>
            </StoreProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}