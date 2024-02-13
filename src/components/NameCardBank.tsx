import { Input } from '@nextui-org/react';
import React from 'react';

interface NameCardBankProps {
    prefix: string;
  userDetails: {
    card: string;
    name: string;
    bank: string;
  }
  errors: any;
  touched: any;
  isValid: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCardNumberKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const NameCardBank: React.FC<NameCardBankProps> = ({
    prefix,
    userDetails,
    errors,
    touched,
    isValid,
    handleChange,
    handleCardChange,
    handleCardNumberKeyPress,
}) => {


  return (
    <div className="form__item flex flex-col gap-4">
    <Input
        name={`${prefix}.card`}
        type="text"
        label="Card Number"
        labelPlacement="outside"
        value={`${userDetails.card}`}
        onChange={handleCardChange}
        onKeyDown={handleCardNumberKeyPress}
        placeholder='____ ____ ____ ____'
        errorMessage={errors?.card && touched?.card}
        isInvalid={!isValid && touched?.card}
    />
    <Input
        name={`${prefix}.name`}
        type="text"
        placeholder="Full Name"
        label="Full Name"
        labelPlacement="outside"
        value={`${userDetails.name}`}
        onChange={handleChange}
        errorMessage={errors?.name && touched?.name}
        isInvalid={!isValid && touched?.name}
    />
    <Input
        name={`${prefix}.bank`}
        type="text"
        placeholder="Bank Name"
        label="Bank Name"
        labelPlacement="outside"
        value={`${userDetails.bank}`}
        onChange={handleChange}
        errorMessage={errors?.bank && touched?.bank}
        isInvalid={!isValid && touched?.bank}
    />
</div>
  );
};
