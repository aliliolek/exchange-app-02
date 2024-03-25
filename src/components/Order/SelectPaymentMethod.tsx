import { useTransactionContext } from '@/hooks/useTransactionContext';
import { Currencies, PaymentDirection, PaymentMethodType } from '@/types/new';
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spacer,
} from '@nextui-org/react';
import React, { use, useEffect, useState } from 'react';

interface SelectPaymentMethodProps {
  direction: PaymentDirection;
  tab: PaymentMethodType;
  values: Currencies;
  valueLabel: string;
  optionLabel: string;
}

export const SelectPaymentMethod: React.FC<SelectPaymentMethodProps> = ({
  direction,
  tab,
  values,
  valueLabel,
  optionLabel,
}) => {
  const { transaction, setTransaction } = useTransactionContext();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    setSelectedValue(transaction[`${direction}Details`].currency);
    setSelectedOption(transaction[`${direction}Details`].option);
  }, [tab, transaction, direction]);

  const currencyOptions = selectedValue ? values[selectedValue]?.options : {};

  const optionsList = currencyOptions
    ? Object.keys(currencyOptions).filter((option) => currencyOptions[option])
    : [];

  const handleChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [`${direction}Details`]: {
        ...prevTransaction[`${direction}Details`],
        currency: newValue,
        option: '',
      },
    }));
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = e.target.value;

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [`${direction}Details`]: {
        ...prevTransaction[`${direction}Details`],
        option: newOption,
      },
    }));
  };

  const filteredValues = Object.keys(values).filter((key) => {
    if (direction === PaymentDirection.To) {
      return key !== transaction[`${PaymentDirection.From}Details`].currency;
    } else {
      return key !== transaction[`${PaymentDirection.To}Details`].currency;
    }
  });

  return (
    <Card>
      <CardBody className="flex flex-col gap-4">
        <Select
          label={valueLabel}
          labelPlacement="outside"
          className="w-full min-h-16"
          selectedKeys={selectedValue ? [selectedValue] : []}
          disabledKeys={[selectedValue]}
          onChange={handleChangeValue}
        >
          {filteredValues.map((currency) => (
            <SelectItem key={currency} value={currency} textValue={currency}>
              {currency}
            </SelectItem>
          ))}
        </Select>

        {selectedValue || !optionsList.length ? (
          <Select
            size="lg"
            className="w-full min-h-16"
            label={optionLabel}
            labelPlacement="outside"
            selectedKeys={selectedOption ? [selectedOption] : []}
            disabledKeys={[selectedOption]}
            onChange={handleChangeOption}
          >
            {optionsList.map((option) => (
              <SelectItem key={option} value={option} textValue={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <Select
            isDisabled
            className="w-full min-h-16 "
            selectorIcon={<Spacer />}
            label={optionLabel}
            labelPlacement="outside"
            disabled
          >
            <SelectItem
              key="placeholder"
              textValue="temporary empty select"
              className=""
            >
              <Skeleton className="rounded-lg ">
                <div className="bg-default-300 ">{''}</div>
              </Skeleton>
            </SelectItem>
          </Select>
        )}
      </CardBody>
    </Card>
  );
};
