import StoreProvider from "@/Providers/StoreProviders";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { BottomNav } from "@/components/shared/Navbar/BottomNav";
import { FloatingActionButton } from "@/components/shared/FloatingButton/FloatingButton";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {LanguageProvider} from '@/contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';
import { getSession } from "@/app/actions/auth";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {

  const {locale} = await params;
  const messages = await getMessages();
  const session = await getSession();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider initialLocale={locale as 'en' | 'bn'}>
        <StoreProvider>
          <Navbar user={session?.user || null} />
          <BottomNav />
          <FloatingActionButton />
            <div className="min-h-[calc(100vh-600px)]">
              {children}
            </div>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "14px",
                },
              }}
            />
        </StoreProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
