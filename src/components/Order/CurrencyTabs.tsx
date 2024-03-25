import { Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { SelectPaymentMethod } from './SelectPaymentMethod';
import {
  PaymentDirection,
  PaymentMethodType,
  PaymentOptionType,
  TabConfiguration,
} from '@/types/new';
import { useTransactionContext } from '@/hooks/useTransactionContext';
import { onValue, ref } from 'firebase/database';
import { database } from '@/lib/firebase/firebase-config';

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
  //firebase
  const [tabsConfiguration, setTabsConfiguration] = useState<
    TabConfiguration[]
  >([]);

  useEffect(() => {
    const currenciesRef = ref(database, 'Currencies');
    onValue(currenciesRef, (snapshot) => {
      const currencies = snapshot.val();

      const newTabsConfig = Object.keys(currencies).map((type) => {
        const optionLabel =
          type === PaymentMethodType.BankTransfer
            ? PaymentOptionType.Bank
            : type === PaymentMethodType.Cash
            ? PaymentOptionType.City
            : PaymentOptionType.Network;

        return {
          type,
          optionLabel,
          data: currencies[type],
        };
      });

      if (newTabsConfig.length > 0) {
        console.log(newTabsConfig);
        setTabsConfiguration(newTabsConfig as TabConfiguration[]);
      }
    });
  }, []);

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
        {tabsConfiguration.map(({ type, optionLabel, data }, index) => (
          <Tab key={type} title={type} className="w-full">
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
