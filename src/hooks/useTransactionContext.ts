import { useContext } from 'react';
import { TransactionContext } from '@/app/exchange/page';
import { FormContext } from '@/components/Order/Order';

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      'useTransactionContext must be used within a TransactionContext.Provider'
    );
  }
  return context;
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(
      'useFormContext must be used within a FormContext.Provider'
    );
  }
  return context;
};
