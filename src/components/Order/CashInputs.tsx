import { InputDetailsProps } from '@/types/new';
import { Input } from '@nextui-org/react';
import { useFormikContext } from 'formik';
import React from 'react';

export const CashInputs: React.FC<InputDetailsProps> = ({
  currency,
  direction,
}) => {
  const { values, handleChange } = useFormikContext<{
    fromDetails: { ownerName: string };
    toDetails: { ownerName: string };
  }>();

  return (
    <div className="details flex flex-col gap-4">
      <Input
        name={`${direction}Details.ownerName`}
        className="details__input input"
        label="Full Name"
        placeholder="John Doe"
        required
        value={values[`${direction}Details`].ownerName}
        onChange={handleChange}
      />
    </div>
  );
};
