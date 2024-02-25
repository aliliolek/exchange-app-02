import { Contacts, InputDetailsProps, cardPaymentOptions } from '@/types/new';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import React from 'react';
import { useFormikContext } from 'formik';

export const ContactsInputs = () => {
  const { values, handleChange } = useFormikContext<{
    contacts: Contacts;
  }>();

  return (
    <div className="details flex flex-col gap-4">
      <Input
        name={`contacts.email`}
        className="details__input input"
        label="Email"
        placeholder="example@nomail.com"
        required
        value={values.contacts.email}
        onChange={handleChange}
      />
      <Input
        name={`contacts.phoneNumber`}
        className="details__input input"
        label="Phone Number"
        placeholder="+380"
        required
        value={values.contacts.phoneNumber}
        onChange={handleChange}
      />
      <Input
        name={`contacts.telegram`}
        className="details__input input"
        label="Telegram"
        placeholder="@username"
        required
        value={values.contacts.telegram}
        onChange={handleChange}
      />
    </div>
  );
};
