import { Card, Spinner } from '@nextui-org/react';
import React, { createContext, useState } from 'react';
import { SetCurrencyForm } from './Forms/SetCurrencyForm';
import { useTransactionContext } from '@/hooks/useTransactionContext';
import { SetDetailsForm } from './Forms/SetDetailsForm';
import { TimerIndicator } from './TimerIndicator';
import { TransactionTable } from './Transaction/TransactionTable';
import RateIndicator from './RateIndicator';
import { calcExchangeValues } from '@/utils/calc';
import { FormActionButtons } from './Forms/FormActionButtons';
import { SetContactsForm } from './Forms/SetContactsForm';

interface FormContextType {
  isLoadingFrom: boolean;
  setIsLoadingFrom: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingTo: boolean;
  setIsLoadingTo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormContext = createContext<FormContextType | null>(null);

export const Order = () => {
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [isLoadingTo, setIsLoadingTo] = useState(false);
  const { transaction, setTransaction } = useTransactionContext();

  const recalcOnTimerExpired = () => {
    calcExchangeValues(
      transaction,
      setTransaction,
      setIsLoadingFrom,
      setIsLoadingTo
    );
  };

  const getFormId = (step: number) => {
    switch (step) {
      case 0:
        return 'setCurrencyForm';
      case 1:
        return 'setDetailsForm';
      case 2:
        return 'setContactsForm';
      default:
        return '';
    }
  };
  return (
    <FormContext.Provider
      value={{
        isLoadingFrom,
        setIsLoadingFrom,
        isLoadingTo,
        setIsLoadingTo,
      }}
    >
      <Card isBlurred className="flex flex-col gap-8 p-4 md:p-10">
        {/* {transaction.step === 0 && <SetCurrency />}
      {transaction.step === 1 && <SetDetails />} */}
        <h2 className="font-bold">
          {transaction.id && transaction.step > 0
            ? `Order #${transaction.id}`
            : 'Set data to make an exchange'}
        </h2>
        <div className="flex flex-row gap-4">
          <TimerIndicator onTimerComplete={recalcOnTimerExpired} />
          {transaction.commercialRate ? <RateIndicator /> : ''}
        </div>
        {transaction.step > 0 && <TransactionTable />}
        {transaction.step === 0 && (
          <SetCurrencyForm formId={getFormId(transaction.step)} />
        )}
        {transaction.step === 1 && (
          <SetDetailsForm formId={getFormId(transaction.step)} />
        )}
        {transaction.step === 2 && (
          <SetContactsForm formId={getFormId(transaction.step)} />
        )}
        {transaction.step === 2 && <Spinner />}
        <FormActionButtons formId={getFormId(transaction.step)} />
      </Card>
    </FormContext.Provider>
  );
};
