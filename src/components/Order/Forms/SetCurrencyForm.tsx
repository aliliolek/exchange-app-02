import {
  useFormContext,
  useTransactionContext,
} from '@/hooks/useTransactionContext';
import { PaymentDirection, PaymentMethodType } from '@/types/new';
import { Button, Checkbox } from '@nextui-org/react';
import React, { FormEvent, use, useContext, useEffect, useState } from 'react';
import { CurrencyTabs } from '../CurrencyTabs';
import { AmountInput } from '../AmountInput';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { getExchangeRateBinance } from '@/pages/api/exchangeRateAPIbinance';
import { calcExchangeValues } from '@/utils/calc';

interface SetCurrencyFormProps {
  formId: string;
}

export const SetCurrencyForm: React.FC<SetCurrencyFormProps> = ({ formId }) => {
  const { isLoadingFrom, setIsLoadingFrom, isLoadingTo, setIsLoadingTo } =
    useFormContext();
  const { transaction, setTransaction } = useTransactionContext();
  const [tabFrom, setTabFrom] = React.useState<PaymentMethodType>(
    transaction.fromDetails.methodType
  );
  const [tabTo, setTabTo] = React.useState<PaymentMethodType>(
    transaction.toDetails.methodType
  );

  const swapCurrencies = () => {
    const { fromDetails, toDetails } = transaction;

    setTabFrom(tabTo);
    setTabTo(tabFrom);

    if (transaction.lastFocusedField === PaymentDirection.From) {
      setTransaction((prev) => ({
        ...prev,
        lastFocusedField: PaymentDirection.To,
        toAmount: prev.fromAmount,
        fromDetails: toDetails,
        toDetails: fromDetails,
      }));
    } else {
      setTransaction((prev) => ({
        ...prev,
        lastFocusedField: PaymentDirection.From,
        fromAmount: prev.toAmount,
        fromDetails: toDetails,
        toDetails: fromDetails,
      }));
    }
  };

  const handleSelectionChange = (
    direction: PaymentDirection,
    key: string | number
  ) => {
    const newMethodType = key as PaymentMethodType;

    if (direction === PaymentDirection.From) {
      setTabFrom(newMethodType);
    } else {
      setTabTo(newMethodType);
    }

    setTransaction((prev) => ({
      ...prev,
      [direction === PaymentDirection.From ? 'fromDetails' : 'toDetails']: {
        ...prev[
          direction === PaymentDirection.From ? 'fromDetails' : 'toDetails'
        ],
        methodType: newMethodType,
      },
    }));
  };

  const handleChangeAmount = (
    direction: PaymentDirection,
    newValue: string
  ) => {
    const value = parseFloat(newValue);

    setTransaction((prev) => ({
      ...prev,
      [direction === PaymentDirection.From ? 'fromAmount' : 'toAmount']: value,
      lastFocusedField: direction,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTransaction((prev) => ({
      ...prev,
      id: Date.now().toString(),
      step: prev.step + 1,
    }));
  };

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const rate = await getExchangeRateBinance(
        transaction.fromDetails.currency,
        transaction.toDetails.currency
      );

      setTransaction((prev) => ({
        ...prev,
        rate: rate,
      }));
    };

    fetchExchangeRate();
  }, [transaction.fromDetails, transaction.toDetails]);

  useEffect(() => {
    calcExchangeValues(
      transaction,
      setTransaction,
      setIsLoadingFrom,
      setIsLoadingTo
    );
  }, [transaction.toAmount, transaction.fromAmount, transaction.rate]);

  return (
    <form id={formId} className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex flex-col gap-4 w-full">
          <CurrencyTabs
            direction={PaymentDirection.From}
            selected={tabFrom}
            handleSelectionChange={handleSelectionChange}
          />
          <div className="w-full">
            <AmountInput
              isLoading={isLoadingFrom}
              label={PaymentDirection.From}
              value={transaction.fromAmount}
              handleChange={(newValue) =>
                handleChangeAmount(PaymentDirection.From, newValue)
              }
            />
          </div>
        </div>
        <Button
          variant="light"
          size="sm"
          color="primary"
          className="w-full md:max-w-5"
          onClick={swapCurrencies}
        >
          <ArrowPathIcon />
        </Button>
        <div className="flex flex-col gap-4 w-full">
          <CurrencyTabs
            direction={PaymentDirection.To}
            selected={tabTo}
            handleSelectionChange={handleSelectionChange}
          />
          <div className="w-full">
            <AmountInput
              isLoading={isLoadingTo}
              label={PaymentDirection.To}
              value={transaction.toAmount}
              handleChange={(newValue) =>
                handleChangeAmount(PaymentDirection.To, newValue)
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
};
