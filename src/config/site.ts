export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Next.js + NextUI',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'Exchange',
      href: '/exchange',
    },
    {
      label: 'Reviews',
      href: '/reviews',
    },
    {
      label: 'DASH',
      href: '/dashboard',
    },
    {
      label: 'Rules',
      href: '/rules',
    },
    {
      label: 'FAQ',
      href: '/faq',
    },
    {
      label: 'Contacts',
      href: '/contacts',
    },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
  currencies: [
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
    {
      label: 'PLN',
      value: 'PLN',
    },
    {
      label: 'UAH',
      value: 'UAH',
    },
    // {
    // 	label: "RUB",
    // 	value: "RUB",
    // },
  ],
  banksByCurrency: {
    USD: ['Revolut', 'Wise', 'Cash USD'],
    EUR: ['Revolut', 'Wise', 'Cash EUR'],
    PLN: ['Blik Phone Number', 'BNP Paribas', 'Revolut', 'Wise', 'Cash PLN'],
    UAH: ['VISA/Mastercard UAH', 'Mono', 'Privat UAH', 'Cash'],
  },
};
