import { TransactionDetails, transactionFieldsLabels } from '@/types';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Button, Card, CardBody, CardHeader, Divider, Select } from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import React, { useEffect, useState } from 'react';
import { formatCardNumber, hasCardNumberReachedMaxLength, isHighlighted } from '@/utils/formatter';
import { formatNumber } from 'libphonenumber-js';
import { useFormik } from 'formik';
import { setDetailsSchema } from '@/schemas';
import { calcExchangeValues } from '@/utils/calc';
import { RateAndTimer } from './RateAndTimer';
import { NameCardBank } from './NameCardBank';
import TransactionTable from './TransactionTable';

interface ConfirmDetailsProps {
  transaction: TransactionDetails;
  updateTransactionState: (updates: Partial<TransactionDetails>) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}


export const ConfirmDetails: React.FC<ConfirmDetailsProps> = ({ transaction, updateTransactionState, setStep }) => {
  const [secondsLeft, setSecondsLeft] = useState(900);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const handleCalculation = async (lastField: 'amountFrom' | 'amountTo' = transaction.lastFocused) => {
    const result = await calcExchangeValues({
        details: {
            amountFrom: transaction.amountFrom,
            amountTo: transaction.amountTo,
            currencyFrom: transaction.currencyFrom,
            currencyTo: transaction.currencyTo,
        },
        lastField,
    });

    setValues(prev => ({ ...prev, ...result }));
};

useEffect(() => {
    if (secondsLeft === 0) {
        handleCalculation();
        setSecondsLeft(900);
    }

    const intervalId = setInterval(() => {
        setSecondsLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
}, [secondsLeft]);
  

  return (
    <Card>
        <CardHeader className="flex justify-between gap-4 px-4">
            <Button 
                variant="light" 
                radius="full" 
                className="p-2 min-w-0"
                onClick={() => setStep((prev) => prev - 1)}
            >
                <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <h2 className="font-semibold">
                Your Order
            </h2>
            <Button 
                variant="light" 
                radius="full" 
                className="p-2 min-w-0"
                onClick={() => setStep(0)}
            >
                <XMarkIcon className="w-4 h-4" />
            </Button>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
            <Divider />
                <div className="order__text-container">

                    <RateAndTimer 
                        currencyFrom={transaction.currencyFrom}
                        currencyTo={transaction.currencyTo}
                        rate={transaction.rate}
                        minutes={minutes}
                        seconds={seconds}
                    />
                </div>
                <TransactionTable
                    transaction={
                        {
                            amountFrom: transaction.amountFrom,
                            currencyFrom: transaction.currencyFrom,
                            amountTo: transaction.amountTo,
                            currencyTo: transaction.currencyTo,
                            rate: transaction.rate,
                            senderDetails: {
                                card: transaction.senderDetails.card,
                                name: transaction.senderDetails.name,
                                bank: transaction.senderDetails.bank,
                            },
                            recipientDetails: {
                                card: transaction.recipientDetails.card,
                                name: transaction.recipientDetails.name,
                                bank: transaction.recipientDetails.bank,
                            },
                            contactInfo: {
                                telegram: transaction.contactInfo.telegram,
                                phone: transaction.contactInfo.phone,
                                email: transaction.contactInfo.email,
                            },
                        }
                    }
                    fieldsConfig={[
                      { key: 'amountFrom', label: 'Amount From' },
                      { key: 'currencyFrom', label: 'Currency From' },
                      { key: 'amountTo', label: 'Amount To' },
                      { key: 'currencyTo', label: 'Currency To' },
                      { key: 'rate', label: 'Exchange Rate' },
                      { key: 'senderDetails.card', label: 'Sender Card Number' },
                      { key: 'senderDetails.name', label: 'Sender Name' },
                      { key: 'senderDetails.bank', label: 'Sender Bank' },
                      { key: 'recipientDetails.card', label: 'Recipient Card Number' },
                      { key: 'recipientDetails.name', label: 'Recipient Name' },
                      { key: 'recipientDetails.bank', label: 'Recipient Bank' },
                      { key: 'contactInfo.telegram', label: 'Telegram' },
                      { key: 'contactInfo.phone', label: 'Phone Number' },
                      { key: 'contactInfo.email', label: 'Email Address' }
                    ]}
                />
            <Divider />
        </CardBody>
    </Card>
  )
}
