import { InputDetailsProps, cardPaymentOptions } from '@/types/new';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import React from 'react';
import { useFormikContext } from 'formik';

export const CardInputs: React.FC<InputDetailsProps> = ({
  currency,
  direction,
}) => {
  const { values, handleChange } = useFormikContext<{
    fromDetails: { bank: string; accountNumber: string; ownerName: string };
    toDetails: { bank: string; accountNumber: string; ownerName: string };
  }>();

  return (
    <div className="details flex flex-col gap-4">
      {/* <Autocomplete
        name={`${direction}Details.bank`}
        size="lg"
        className="w-full min-h-16"
        allowsCustomValue
        label={`${direction === 'from' ? "Sender's Bank" : "Recepient's Bank"}`}
        defaultItems={cardPaymentOptions[currency].map((option) => ({
          value: option,
          label: option,
        }))}
        value={values[`${direction}Details`].bank}
        onChange={handleChange}
      >
        {(item) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete> */}
      <Input
        name={`${direction}Details.bank`}
        className="details__input input"
        label="Bank"
        placeholder="Select Bank Name"
        required
        value={values[`${direction}Details`].bank}
        onChange={handleChange}
      />
      <Input
        name={`${direction}Details.accountNumber`}
        className="details__input input"
        label="Card Number"
        placeholder="0000 0000 0000 0000"
        required
        value={values[`${direction}Details`].accountNumber}
        onChange={handleChange}
      />
      <Input
        name={`${direction}Details.ownerName`}
        className="details__input input"
        label="Card Holder"
        placeholder="John Doe"
        required
        value={values[`${direction}Details`].ownerName}
        onChange={handleChange}
      />
    </div>
  );
};
