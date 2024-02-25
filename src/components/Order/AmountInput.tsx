import { useTransactionContext } from '@/hooks/useTransactionContext';
import { PaymentDirection } from '@/types/new';
import { Card, CardBody, Input, Spinner } from '@nextui-org/react';
import React, { ChangeEvent } from 'react';

interface AmountInputProps {
  isLoading: boolean;
  label: string;
  value: number;
  handleChange: (value: string) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  isLoading,
  label,
  value,
  handleChange,
}) => {
  const { transaction, setTransaction } = useTransactionContext();

  const isDisabled = (direction: string) => {
    if (direction === PaymentDirection.From) {
      return transaction.fromDetails.option === '';
    }

    return transaction.toDetails.option === '';
  };

  return (
    <Card className="w-full">
      <CardBody className="">
        <Input
          label={`Amount ${label}`}
          labelPlacement="outside"
          type="number"
          className="w-full"
          value={`${value}`}
          onValueChange={handleChange}
          isDisabled={isDisabled(label.toLowerCase()) || isLoading}
          endContent={
            isLoading ? (
              <Spinner
                size="sm"
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
              />
            ) : (
              ''
            )
          }
        />
      </CardBody>
    </Card>
  );
};
