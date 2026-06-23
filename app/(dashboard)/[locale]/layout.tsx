import StoreProvider from "@/Providers/StoreProviders";
import { AuthProvider } from "@/contexts/AuthContext";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {LanguageProvider} from '@/contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';

export default async function DashboardRootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {

  const {locale} = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider initialLocale={locale as 'en' | 'bn'}>
        <StoreProvider>
          <AuthProvider>
            {children}
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
          </AuthProvider>
        </StoreProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
