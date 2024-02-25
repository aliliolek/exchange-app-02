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
import { ContactsInputs } from '../ContactsInpurs';

interface SetDetailsFormProps {
  formId: string;
}

export const SetContactsForm: React.FC<SetDetailsFormProps> = ({ formId }) => {
  const { isLoadingFrom, setIsLoadingFrom, isLoadingTo, setIsLoadingTo } =
    useFormContext();
  const { transaction, setTransaction } = useTransactionContext();

  return (
    <div>
      <Formik
        initialValues={{
          contacts: {
            email: '',
            phoneNumber: '',
            telegram: '',
          },
        }}
        // validationSchema={detailsValidationSchema}
        onSubmit={(values) => {
          setTransaction((prev) => ({
            ...prev,
            contacts: {
              email: values.contacts.email,
              phoneNumber: values.contacts.phoneNumber,
              telegram: values.contacts.telegram,
            },
            step: prev.step + 1,
          }));
        }}
      >
        <Form id={formId} className="flex flex-col gap-8 p-5">
          <div className="flex flex-col gap-4">
            <ContactsInputs />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
