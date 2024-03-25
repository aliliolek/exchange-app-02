// your-project-name/
// ├── src/
// │   ├── app/
// │   │   ├── providers/
// │   │   │   ├── AuthProvider.tsx
// │   │   │   └── ThemeProvider.tsx
// │   │   ├── page.tsx
// │   │   └── layout.tsx
// │   ├── api/
// │   │   ├── user.ts
// │   │   ├── exchange.ts
// │   │   └── transactions.ts
// │   ├── auth/                      # Автентифікація та управління користувачами
// │   │   ├── login.tsx              # Сторінка входу
// │   │   └── signup.tsx             # Сторінка реєстрації
// │   ├── components/
// │   │   ├── layout/
// │   │   │   ├── Header.tsx
// │   │   │   ├── Footer.tsx
// │   │   │   ├── Navbar.tsx
// │   │   │   └── Layout.tsx
// │   │   ├── ui/
// │   │   │   ├── Button.tsx
// │   │   │   ├── Input.tsx
// │   │   │   ├── Modal.tsx
// │   │   │   └── ToggleSwitch.tsx
// │   │   ├── exchange/
// │   │   │   ├── CurrencyToggle.tsx
// │   │   │   ├── CurrencyInput.tsx
// │   │   │   ├── CurrencySelect.tsx
// │   │   │   ├── BankSelect.tsx
// │   │   │   ├── NetworkSelect.tsx
// │   │   │   ├── RateDisplay.tsx
// │   │   │   ├── OrderSummary.tsx
// │   │   │   ├── PaymentDetailsForm.tsx
// │   │   │   └── OrderStatus.tsx
// │   │   └── common/
// │   │       ├── FAQItem.tsx
// │   │       ├── ReviewCard.tsx
// │   │       └── ContactForm.tsx
// │   ├── config/
// │   │   └── index.ts
// │   ├── schemas/
// │   │   └── transactionSchema.ts
// │   ├── utils/
// │   │   ├── api.ts
// │   │   └── helpers.ts
// │   ├── lib/
// │   ├── models/
// │   ├── services/
// │   ├── context/
// │   ├── export constants/
// │   └── types/
// ├── public/
// └── styles/

type TransactionStatus =
  | 'awaitingPaymentFromUser' // очікування оплати від користувача
  | 'expired' // транзакція прострочена, не отримали від користувача оплату у вказаний термін
  | 'checkingPaymentByAdmin' // перевірка оплати адміністратором
  | 'paymentVerificationFailed' // оплата від користувача не отримана
  | 'paymentVerificationPassed' // оплата від користувача отримана
  | 'awaitingPaymentFromService' // ми намагаємося відправити оплату на реквізити користувача
  | 'paymentSent' // оплата відправлена
  | 'paymentFailed' // сервіс не зміг відправити оплату на реквізити користувача
  | 'error'
  | 'completed';

export interface ProcessingTimes {
  userPaymentConfirmationTime?: number; // Час від "Я оплатив" до підтвердження оплати
  adminPaymentVerificationTime?: number; // Час, який знадобився адміністратору для перевірки оплати
  completionTime?: number; // Час від підтвердження оплати до завершення транзакції
}

export interface Feedback {
  userFeedback?: string; // Відгук від користувача
  adminFeedback?: string; // Відгук від адміністратора
}

export enum PaymentMethodRole {
  Sender = 'sender',
  Recipient = 'recipient',
  Service = 'service', // Для службових реквізитів обмінки
}

export enum PaymentDirection {
  From = 'from',
  To = 'to',
}

export enum PaymentMethodType {
  BankTransfer = 'bank',
  Cash = 'cash',
  CryptoWallet = 'crypto',
}

export enum PaymentOptionType {
  Bank = 'bank',
  City = 'city',
  Network = 'network',
}

export interface NewPaymentMethod {
  methodType: PaymentMethodType;
  currency: string;
  option: PaymentOptionType;
  bank?: string;
  accountNumber?: string;
  city?: string;
  fullName?: string;
  walletAddress?: string;
}

export interface Contacts {
  email: string; // Обов'язкове
  phoneNumber: string;
  telegram: string; // Нікнейм у Telegram
}

export interface Transaction {
  id: string;
  userId?: string; // Ідентифікатор користувача, який ініціював транзакцію
  adminId?: string; // Ідентифікатор адміністратора, що обробляє транзакцію
  fromDetails: NewPaymentMethod; // Метод оплати для віддачі
  toDetails: NewPaymentMethod; // Метод оплати для отримання
  fromAmount: number; // Сума, яку віддаємо
  toAmount: number; // Сума, яку отримуємо
  termsAndConditions?: boolean; // Погодження з умовами обміну
  rate: number; // Курс обміну
  commercialRate: number; // Комерційний курс обміну
  lastFocusedField: PaymentDirection; // Останнє поле, на яке клікнули
  contacts?: Contacts;
  serviceDetails?: NewPaymentMethod; // Метод оплати для віддачі
  status?: TransactionStatus; // Статус транзакції
  createdAt?: Date; // Дата та час створення заявки
  paidAt?: Date; // Дата та час підтвердження оплати користувачем
  feedback?: Feedback; // Відгуки за транзакцією
  processingTimes?: ProcessingTimes; // Часові показники обробки транзакції
  step: number; // Крок транзакції
}

export const initialTransaction: Transaction = {
  id: '',
  fromDetails: {
    methodType: PaymentMethodType.BankTransfer,
    currency: '',
    option: '',
  },
  toDetails: {
    methodType: PaymentMethodType.BankTransfer,
    currency: '',
    option: '',
  },
  fromAmount: 0,
  toAmount: 0,
  lastFocusedField: PaymentDirection.From,
  rate: 0,
  commercialRate: 0,
  step: 0,
};

export interface User {
  id: string;
  fullName: string; // Обов'язкове
  email: string; // Обов'язкове
  phoneNumber?: string;
  telegram?: string; // Нікнейм у Telegram
  nickname?: string; // Додатковий нікнейм
  passwordHash: string; // Хеш пароля
  role: 'user' | 'admin'; // Роль користувача в системі
}

export interface CryptoCurrencyNetworks {
  [currency: string]: string[];
}

export const cryptoCurrencyNetworks: CryptoCurrencyNetworks = {
  USDT: ['ERC20', 'TRC20', 'BEP20', 'SOL', 'AVAXC', 'MATIC', 'OMNI'],
  ETH: ['ERC20', 'Arbitrum One', 'Optimism', 'LINEA'],
  BTC: ['BTC'],
};

export interface CashCurrencyCities {
  [currency: string]: string[];
}

export const commonCities: string[] = ['Kyiv', 'Warsaw'];
export const uniqueCities = {
  UAH: ['Lviv', 'Odesa'],
  PLN: ['Krakow', 'Gdansk'],
  EUR: ['Madrid', 'Rome', 'Paris', 'Berlin'],
};

export const cashCurrencyCities: CashCurrencyCities = {
  USD: [...commonCities],
  PLN: [...commonCities, ...uniqueCities.PLN],
  EUR: [...commonCities, ...uniqueCities.EUR],
  UAH: [...commonCities, ...uniqueCities.UAH],
};

export interface CardPaymentOptions {
  [currency: string]: string[];
}

export const cardPaymentOptions: CardPaymentOptions = {
  UAH: ['Visa/Mastercard Any Bank UAH', 'Mono UAH', 'Privat UAH'],
  PLN: ['Revolut PLN', 'Wise PLN', 'Blik Phone Number PLN', 'BNP Paribas PLN'],
  EUR: ['Revolut EUR', 'Wise EUR'],
  USD: ['Revolut USD', 'Wise USD', 'PayPal USD'],
};

export interface CurrencyOption {
  [optionName: string]: boolean;
}

export interface Currency {
  active: boolean;
  name: string;
  options: CurrencyOption;
}

export interface Currencies {
  [currencyCode: string]: Currency;
}

export interface DataStructure {
  bank: Currencies;
  cash: Currencies;
  crypto: Currencies;
}

export interface TabConfiguration {
  type: PaymentMethodType;
  optionLabel: PaymentOptionType;
  data: Currencies;
}

// export const tabsConfiguration = [
//   {
//     type: PaymentMethodType.CryptoWallet,
//     optionLabel: 'Network',
//     data: cryptoCurrencyNetworks,
//   },
//   {
//     type: PaymentMethodType.Cash,
//     optionLabel: 'City',
//     data: cashCurrencyCities,
//   },
//   {
//     type: PaymentMethodType.BankTransfer,
//     optionLabel: 'Bank',
//     data: cardPaymentOptions,
//   },
// ];

export interface InputDetailsProps {
  currency: string;
  direction: PaymentDirection;
}

interface ServiceBankDetails {
  currency: string;
  bankName: string;
  accountNumber: string;
  ownerName: string;
}

interface ServiceCashDetails {
  currency: string;
  city: string;
  address: string;
}

interface ServiceCryptoDetails {
  currency: string;
  network: string;
  walletAddress: string;
}

// Далі створюємо зберігаці масиви або об'єкти для кожного типу оплати
const bankDetails: ServiceBankDetails[] = [
  {
    currency: 'USD',
    bankName: 'Bank A',
    accountNumber: '123',
    ownerName: 'Exchange A',
  },
  // Додаємо інші банки та валюти за потреби
];

const cashDetails: ServiceCashDetails[] = [
  { currency: 'USD', city: 'Kyiv', address: 'Main Street 1' },
  // Додаємо інші міста та валюти за потреби
];

const cryptoDetails: ServiceCryptoDetails[] = [
  { currency: 'BTC', network: 'Bitcoin', walletAddress: '1A1zP1...' },
  // Додаємо інші криптовалюти та мережі за потреби
];
