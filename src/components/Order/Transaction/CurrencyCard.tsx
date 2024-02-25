import {
  useFormContext,
  useTransactionContext,
} from '@/hooks/useTransactionContext';
import { PaymentDirection } from '@/types/new';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import classNames from 'classnames';

import React from 'react';
import { DetailsCard } from './DetailsCard';

interface CurrencyCardProps {
  direction: PaymentDirection;
}

// Define props for the component, including direction and transaction details
export const CurrencyCard: React.FC<CurrencyCardProps> = ({ direction }) => {
  const { isLoadingFrom, isLoadingTo } = useFormContext();
  const { transaction, setTransaction } = useTransactionContext();

  const isLoading =
    direction === PaymentDirection.From ? isLoadingFrom : isLoadingTo;

  return (
    <Card className="md:py-4 w-full">
      <CardHeader className="pb-0 pt-2 flex-row gap-2 items-center">
        <p className="text-tiny uppercase font-bold">{`${direction}:`}</p>
        <Chip variant="bordered" color="primary">
          {transaction[`${direction}Details`].methodType}
        </Chip>
      </CardHeader>
      <CardBody className="overflow-visible md:py-2 flex flex-col gap-2">
        <p
          className={classNames(' text-sm', {
            'opacity-50': isLoading,
          })}
        >
          Amount:{' '}
          <span className="font-semibold">
            {`${transaction[`${direction}Amount`]} ${
              transaction[`${direction}Details`].currency
            }`}
          </span>
        </p>

        <p className="text-sm">
          Option:{' '}
          <span className="font-semibold">
            {`${transaction[`${direction}Details`].option}`}
          </span>
        </p>
      </CardBody>
      {transaction.step >= 2 ? <DetailsCard direction={direction} /> : ''}
    </Card>
  );
};
