import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface TransactionDetails {
  amountFrom: number;
  currencyFrom: string;
  amountTo: number;
  currencyTo: string;
  rate: number;
  lastFocused: 'amountFrom' | 'amountTo';
  senderDetails: {
    card: string;
    name: string;
    bank: string;
  };
  recipientDetails: {
    card: string;
    name: string;
    bank: string;
  };
  contactInfo: {
    telegram: string;
    phone: string;
    email: string;
  };
  status: 'Pending Payment' | 'Under Review' | 'In Process' | 'Completed' | 'Cancelled' | null;
  date: Date | null;
  id: number | null;
};

export interface Currency {
  label: string;
  value: string;
};

export const noneCurrency: Currency = {
  label: 'Select currency',
  value: '',
};

export interface TransactionFieldConfig {
  key: string;
  label: string;
}

export const initialTransaction: TransactionDetails = {
  amountFrom: 0,
  currencyFrom: '',
  amountTo: 0,
  currencyTo: '',
  rate: 0,
  lastFocused: 'amountFrom',
  senderDetails: {
    card: '',
    name: '',
    bank: '',
  },
  recipientDetails: {
    card: '',
    name: '',
    bank: '',
  },
  contactInfo: {
    telegram: '',
    phone: '',
    email: '',
  },
  status: null,
  date: null,
  id: null,
};

export const getEmptyDetails = () => ({
  senderDetails: {
    card: '',
    name: '',
    bank: '',
  },
  recipientDetails: {
    card: '',
    name: '',
    bank: '',
  },
  contactInfo: {
    telegram: '',
    phone: '',
    email: '',
  },
});

export const transactionFieldsLabels = [
  { key: 'amountFrom', label: 'Amount From' },
  { key: 'currencyFrom', label: 'Currency From' },
  { key: 'amountTo', label: 'Amount To' },
  { key: 'currencyTo', label: 'Currency To' },
  { key: 'rate', label: 'Exchange Rate' },
  { key: 'senderDetails.card', label: 'Sender Card Number' },
  { key: 'senderDetails.name', label: 'Sender Name' },
  { key: 'senderDetails.bank', label: 'Sender Bank' },
  { key: 'recipientDetails.card', label: 'Recipient Card Number' },
  { key: 'recipientDetails.name', label: 'Recipient Name' },
  { key: 'recipientDetails.bank', label: 'Recipient Bank' },
  { key: 'contactInfo.telegram', label: 'Telegram' },
  { key: 'contactInfo.phone', label: 'Phone Number' },
  { key: 'contactInfo.email', label: 'Email Address' }
];