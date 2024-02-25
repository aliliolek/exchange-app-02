import {
  useFormContext,
  useTransactionContext,
} from '@/hooks/useTransactionContext';
import { PaymentDirection, PaymentMethodType } from '@/types/new';
import { CardBody } from '@nextui-org/react';

import React from 'react';

interface CurrencyCardProps {
  direction: PaymentDirection;
}

export const DetailsCard: React.FC<CurrencyCardProps> = ({ direction }) => {
  const { transaction, setTransaction } = useTransactionContext();

  const details = transaction[`${direction}Details`];
  const renderDetails = () => {
    switch (details.methodType) {
      case PaymentMethodType.BankTransfer:
        return (
          <div className="flex flex-col gap-2">
            <p className=" text-sm">
              Bank Name: <span className="font-semibold">{details.bank}</span>
            </p>
            <p className="text-sm">
              Card Number:{' '}
              <span className="font-semibold">{details.accountNumber}</span>
            </p>
            <p className="text-sm">
              Owner's Name:{' '}
              <span className="font-semibold">{details.ownerName}</span>
            </p>
          </div>
        );
      case PaymentMethodType.Cash:
        return (
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              Person's Name:{' '}
              <span className="font-semibold">{details.ownerName}</span>
            </p>
          </div>
        );
      case PaymentMethodType.CryptoWallet:
        return (
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              Wallet Adress:{' '}
              <span className="font-semibold">{details.walletAddress}</span>
            </p>
            ;
          </div>
        );
      default:
        {
          (' ');
        }
        return '';
    }
  };

  return (
    <CardBody className="overflow-visible md:{' '}py-2">
      {renderDetails()}
    </CardBody>
  );
};
