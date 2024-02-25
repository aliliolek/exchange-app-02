import { Input } from '@nextui-org/react';
import React from 'react';
import { useFormikContext } from 'formik';
import { InputDetailsProps } from '@/types/new';

export const CryptoInputs: React.FC<InputDetailsProps> = ({
  currency,
  direction,
}) => {
  const { values, handleChange } = useFormikContext<{
    fromDetails: { walletAddress: string };
    toDetails: { walletAddress: string };
  }>();

  return (
    <div className="details flex flex-col gap-4">
      <Input
        name={`${direction}Details.walletAddress`}
        className="details__input input"
        label="Wallet Address"
        placeholder="0x"
        required
        value={values[`${direction}Details`].walletAddress}
        onChange={handleChange}
      />
    </div>
  );
};
