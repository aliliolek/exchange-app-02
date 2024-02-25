import { useTransactionContext } from '@/hooks/useTransactionContext';
import React from 'react';

export default function RateIndicator() {
  const { transaction } = useTransactionContext();

  const displayRate =
    transaction.rate >= 1
      ? `1 ${
          transaction.fromDetails.currency
        } = ${transaction.commercialRate.toFixed(6)} ${
          transaction.toDetails.currency
        }`
      : `${(1 / transaction.commercialRate).toFixed(6)} ${
          transaction.fromDetails.currency
        } = 1 ${transaction.toDetails.currency}`;
  return <span>{displayRate}</span>;
}
