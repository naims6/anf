// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // পাথটি লক্ষ্য করুন: এই ফাইল থেকে এক ধাপ পেছনে গেলে messages ফোল্ডার পাওয়া যাবে
    messages: (await import(`../messages/${locale}.json`)).default
  };
});