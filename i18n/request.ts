
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const NAMESPACES = ['navbar', 'common', 'homepage', 'programs', 'dashboard', 'auth', 'payment'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const imports = await Promise.all(
    NAMESPACES.map((ns) => import(`../messages/${locale}/${ns}.json`))
  );

  const messages = imports.reduce((acc, mod) => ({ ...acc, ...mod.default }), {});

  return {
    locale,
    messages,
  };
});