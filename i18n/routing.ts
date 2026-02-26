import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['en', 'bn'],
    defaultLocale: 'en'
});
// এই লাইনটি অবশ্যই যোগ করুন
export default routing;

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);