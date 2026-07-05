import StoreProvider from "@/Providers/StoreProviders";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {LanguageProvider} from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/sonner';

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
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
              }}
            />
        </StoreProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
