'use client';
import React, { useState } from 'react'
import { TransactionDetails, initialTransaction } from '@/types';
import { SelectCurrency } from '../SelectCurrency';
import { SetDetails } from '../SetDetails';
import { Divider } from '@nextui-org/react';
import { ConfirmDetails } from '../ConfirmDetails';


export default function NewOrder() {
    const [transaction, setTransaction] = useState<TransactionDetails>(initialTransaction);
    const [step, setStep] = useState(0);

    const updateTransactionState = (updates: Partial<TransactionDetails>) => {
        setTransaction((prevState) => ({
            ...prevState,
            ...updates,
        }));
    };

  return (
    <div className="flex flex-col gap-6">
      {step === 0 && (
        <SelectCurrency
          transaction={transaction}
          updateTransactionState={updateTransactionState}
          setStep={setStep}
        />
      )}

      {step === 1 && (
        <SetDetails 
          transaction={transaction}
          updateTransactionState={updateTransactionState}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <ConfirmDetails 
          transaction={transaction}
          updateTransactionState={updateTransactionState}
          setStep={setStep}
        />
      )}
    </div>
  )
}
