import {
  useFormContext,
  useTransactionContext,
} from '@/hooks/useTransactionContext';
import { PaymentDirection, PaymentMethodType } from '@/types/new';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { CurrencyCard } from './CurrencyCard';
import { ContactsCard } from './ContactsCard';

export const TransactionTable = () => {
  const { isLoadingFrom, isLoadingTo } = useFormContext();
  const { transaction, setTransaction } = useTransactionContext();

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {transaction.step >= 1 ? (
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <CurrencyCard direction={PaymentDirection.From} />
          <CurrencyCard direction={PaymentDirection.To} />
        </div>
      ) : (
        ''
      )}
      {transaction.step >= 3 ? (
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <ContactsCard />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
