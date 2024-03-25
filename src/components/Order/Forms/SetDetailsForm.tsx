import {
  useFormContext,
  useTransactionContext,
} from '@/hooks/useTransactionContext';
import React, { useEffect, useState } from 'react';
import { CardInputs } from '../CardInputs';
import { CashInputs } from '../CashInputs';
import { CryptoInputs } from '../CryptoInputs';
import { PaymentDirection, PaymentMethodType } from '@/types/new';
import { Form, Formik, useFormik } from 'formik';
import { detailsValidationSchema } from '@/schemas/detailsValidationSchema';

interface SetDetailsFormProps {
  formId: string;
}

export const SetDetailsForm: React.FC<SetDetailsFormProps> = ({ formId }) => {
  const { isLoadingFrom, setIsLoadingFrom, isLoadingTo, setIsLoadingTo } =
    useFormContext();
  const { transaction, setTransaction } = useTransactionContext();

  const getInputsComponent = (
    direction: PaymentDirection,
    methodType: PaymentMethodType,
    currency: string
  ) => {
    switch (methodType) {
      case PaymentMethodType.BankTransfer:
        return <CardInputs currency={currency} direction={direction} />;
      case PaymentMethodType.Cash:
        return <CashInputs currency={currency} direction={direction} />;
      case PaymentMethodType.CryptoWallet:
        return direction === PaymentDirection.To ? (
          <CryptoInputs currency={currency} direction={direction} />
        ) : null;
      default:
        return null;
    }
  };

  const renderDetails = (
    direction: PaymentDirection,
    methodType: PaymentMethodType,
    currency: string
  ) => {
    return (
      <div className="w-full font-semibold flex flex-col gap-4">
        <h3>
          {direction === PaymentDirection.From ? "Sender's " : "Recipient's "}
          details:
        </h3>
        {getInputsComponent(direction, methodType, currency)}
      </div>
    );
  };

  useEffect(() => {
    console.log('transaction', transaction);
  }, [transaction]);

  return (
    <div>
      <Formik
        initialValues={{
          fromDetails: {
            methodType: transaction.fromDetails.methodType,
            currency: transaction.fromDetails.currency,
            option: transaction.fromDetails.option,
            bank: '',
            accountNumber: '',
            fullName: '',
            walletAdress: '',
          },
          toDetails: {
            methodType: transaction.toDetails.methodType,
            currency: transaction.toDetails.currency,
            option: transaction.toDetails.option,
            bank: '',
            accountNumber: '',
            fullName: '',
            walletAdress: '',
          },
        }}
        // validationSchema={detailsValidationSchema}
        onSubmit={(values) => {
          setTransaction((prev) => ({
            ...prev,
            fromDetails: values.fromDetails,
            toDetails: values.toDetails,
            step: prev.step + 1,
          }));
        }}
      >
        <Form id={formId} className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {renderDetails(
              PaymentDirection.From,
              transaction.fromDetails.methodType,
              transaction.fromDetails.currency
            )}
            {renderDetails(
              PaymentDirection.To,
              transaction.toDetails.methodType,
              transaction.toDetails.currency
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};
