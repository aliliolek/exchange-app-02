'use client';
import { Order } from '@/components/Order/Order';
import { PaymentDirection, PaymentMethodType, Transaction } from '@/types/new';
import React from 'react';
import { createContext, useState } from 'react';

interface TransactionContextType {
  transaction: Transaction;
  setTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
}

export const TransactionContext = createContext<TransactionContextType | null>(
  null
);

const Exchange = () => {
  const [transaction, setTransaction] = useState<Transaction>({
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
    rate: 0,
    serviceDetails: {
      methodType: PaymentMethodType.BankTransfer,
      currency: '',
      option: '',
    },
    commercialRate: 0,
    lastFocusedField: PaymentDirection.From,
    step: 0,
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-12">
      <section className="w-full ">
        <h1 className="font-bold text-5xl lg:text-6xl py-6 text-center">
          Buying and selling digital assets (Exchange Page)
        </h1>
        <p className="font-semibold text-md lg:text-xl text-center">
          Buy and sell Bitcoin, Ethereum, XRP and many more cryptocurrencies
          using fiat or crypto.
        </p>
      </section>
      <section className="w-full md:max-w-7xl">
        <TransactionContext.Provider value={{ transaction, setTransaction }}>
          <Order />
        </TransactionContext.Provider>
      </section>
    </main>
  );
};

export default Exchange;
