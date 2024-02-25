import { Select, Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { SelectPaymentMethod } from './SelectPaymentMethod';
import {
  PaymentDirection,
  PaymentMethodType,
  tabsConfiguration,
} from '@/types/new';
import { useTransactionContext } from '@/hooks/useTransactionContext';

interface CurrencyTabsProps {
  direction: PaymentDirection;
  selected: PaymentMethodType;
  handleSelectionChange: (
    direction: PaymentDirection,
    key: string | number
  ) => void;
}

export const CurrencyTabs: React.FC<CurrencyTabsProps> = ({
  direction,
  selected,
  handleSelectionChange,
}) => {
  const { transaction, setTransaction } = useTransactionContext();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const wrappedHandleSelectionChange = (key: string | number) => {
    handleSelectionChange(direction, key);

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [`${direction}Details`]: {
        ...prevTransaction[`${direction}Details`],
        methodType: key as PaymentMethodType,
        currency: '',
        option: '',
      },
      [`${direction}Amount`]: 0,
    }));
  };

  return (
    <div className="flex w-full flex-col">
      <h2 className="font-semibold">{capitalizeFirstLetter(direction)}</h2>
      <Tabs
        aria-label="Options"
        className="w-full"
        size="lg"
        radius="sm"
        selectedKey={selected}
        onSelectionChange={wrappedHandleSelectionChange}
      >
        {tabsConfiguration.map(({ type, label, optionLabel, data }, index) => (
          <Tab key={type} title={label} className="w-full">
            <SelectPaymentMethod
              direction={direction}
              tab={type}
              values={data}
              valueLabel="Select Currency"
              optionLabel={`Select ${optionLabel}`}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
