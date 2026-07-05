
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['en', 'bn'],
    defaultLocale: 'en'
});
export default routing;

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);