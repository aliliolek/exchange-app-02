'use client';
import { getExchangeRateLocal as getExchangeRate } from '@/api/exchangeRateLocal';
import { siteConfig } from '@/config/site'
import { TransactionDetails } from '@/types';
import { ArrowPathRoundedSquareIcon, ClockIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody, CardHeader, Divider, Input, Select, SelectItem, Selection, Spacer, Chip, Checkbox } from '@nextui-org/react'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { selectCurrencySchema } from '@/schemas';
import { calcExchangeValues } from '@/utils/calc';
import { RateAndTimer } from './RateAndTimer';

interface SelectCurrencyProps {
    transaction: TransactionDetails;
    updateTransactionState: (updates: Partial<TransactionDetails>) => void;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectCurrency: React.FC<SelectCurrencyProps> = ({ transaction, updateTransactionState, setStep }) => {
    const [lastFocused, setLastFocused] = useState<'amountFrom' | 'amountTo'>('amountFrom');
    const [secondsLeft, setSecondsLeft] = useState(900);
    const [termsAndConditions, setTermsAndConditions] = React.useState(false);

    const { 
        values, 
        handleChange, 
        handleBlur, 
        setValues, 
        handleSubmit, 
        errors, 
        setFieldError, 
        touched, 
        isValid, 
        dirty,
    } = useFormik({
        initialValues: {
            amountFrom: transaction.amountFrom || 1000,
            currencyFrom: (transaction.currencyFrom !== undefined && transaction.currencyFrom !== '') ? transaction.currencyFrom : 'USD',
            amountTo: transaction.amountTo || 0,
            currencyTo: (transaction.currencyTo !== undefined && transaction.currencyTo !== '') ? transaction.currencyTo : 'EUR',
            rate: 0,
            lastFocused: 'amountFrom',
        },
        onSubmit: (values) => {
            updateTransactionState({
                amountFrom: values.amountFrom,
                currencyFrom: values.currencyFrom,
                amountTo: values.amountTo,
                currencyTo: values.currencyTo,
                rate: values.rate,
                lastFocused: lastFocused,
            });
            setStep(prev => prev + 1);

            console.log('onSubmit', values.amountFrom, values.currencyFrom, values.amountTo, values.currencyTo, values.rate);
        },
        validationSchema: selectCurrencySchema,
    });

    const swapCurrency = () => {
        if (lastFocused === 'amountFrom') {
            setValues((prev) => ({
                ...prev,
                amountTo: prev.amountFrom,
                currencyFrom: prev.currencyTo,
                currencyTo: prev.currencyFrom,
            }));

            setLastFocused('amountTo');
        } else {
            setValues((prev) => ({
                ...prev,
                amountFrom: prev.amountTo,
                currencyFrom: prev.currencyTo,
                currencyTo: prev.currencyFrom,
            }));

            setLastFocused('amountFrom');
        }
    };

    const handleCalculation = async (lastField: 'amountFrom' | 'amountTo' = lastFocused) => {
        const result = await calcExchangeValues({
            details: {
                amountFrom: values.amountFrom,
                amountTo: values.amountTo,
                currencyFrom: values.currencyFrom,
                currencyTo: values.currencyTo,
            },
            lastField,
        });

        setValues(prev => ({ ...prev, ...result }));
    };

    useEffect(() => {
        handleCalculation();
    }, [values.amountFrom, values.currencyFrom, values.amountTo, values.currencyTo, values.rate]); 

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    useEffect(() => {
        if (secondsLeft === 0) {
            handleCalculation();
            setSecondsLeft(900);
        }

        const intervalId = setInterval(() => {
            setSecondsLeft(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsLeft]);

    const handleCurrencyFromSelect = (e: any) => {
        const { name, value } = e.target;
        if (value === values.currencyTo) {
            setValues(prevValues => ({
                ...prevValues,
                currencyFrom: values.currencyTo,
                currencyTo: values.currencyFrom,
            }));
        } else {
            handleChange(e);
        }

        setFieldError(name, '');
    };

    const handleCurrencyToSelect = (e: any) => {
        const { name, value } = e.target;

        if (value === values.currencyFrom) {
            setValues(prevValues => ({
                ...prevValues,
                currencyFrom: values.currencyTo,
                currencyTo: values.currencyFrom,
            }));
        } else {
            handleChange(e);
        }

        setFieldError(name, '');
    };

    const handleFocus = (e: any) => {
        const { name } = e.target;

        setLastFocused(name);
    };

  return (
    <Card>
        <CardHeader className="px-4 flex-row">
            <h2 className="font-semibold">
                Select Amount & Currency
            </h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
            <Divider />
            <form className="form flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="form__item-container">
                    <p className="p-1">From:</p>
                    <div className="form__item flex flex-col md:flex-row gap-4">
                        <Input
                            name="amountFrom"
                            type="number"
                            labelPlacement="inside"
                            value={`${values.amountFrom}`}
                            onChange={handleChange}
                            onBlur={handleBlur}   
                            onFocus={handleFocus}
                            errorMessage={errors.amountFrom}
                            isInvalid={!isValid}
                            className="min-h-20"
                        />
                        <Select
                            className="min-h-20"
                            aria-label='currencyFrom'
                            name="currencyFrom"
                            placeholder="Select currency"
                            startContent="$"
                            selectedKeys={[values.currencyFrom]}
                            onChange={handleCurrencyFromSelect}
                            // onChange={handleChange} 
                            onBlur={handleBlur}
                            disabledKeys={[values.currencyFrom]}
                            >
                            {siteConfig.currencies.map((currency) => (
                                <SelectItem 
                                    key={currency.value} 
                                    value={currency.value}
                                >
                                {currency.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="form__item flex justify-center">
                    <Button 
                        variant="light"
                        onClick={swapCurrency}
                    >
                        <ArrowPathRoundedSquareIcon />
                    </Button>
                </div>
                <div className="form__item-container">                    
                    <p className="p-1">To:</p>
                    <div className="form__item flex flex-col md:flex-row gap-4">
                        <Input
                            name="amountTo"
                            type='number'
                            labelPlacement="inside"
                            value={`${values.amountTo}`}
                            onChange={handleChange} 
                            onBlur={handleBlur}     
                            onFocus={handleFocus} 
                            errorMessage={errors.amountTo}
                            className="min-h-20"
                            isInvalid={!isValid}           
                        />
                        <Select
                                className="min-h-20"
                                aria-label='currencyTo'
                                name="currencyTo"
                                placeholder="Select currency"
                                startContent="$"
                                selectedKeys={[values.currencyTo]}
                                onChange={handleCurrencyToSelect}
                                // onChange={handleChange} 
                                onBlur={handleBlur} 
                                disabledKeys={[values.currencyTo]} 
                            >
                            {siteConfig.currencies.map((currency) => (
                                <SelectItem key={currency.value} value={currency.value}>
                                {currency.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <RateAndTimer 
                    currencyFrom={values.currencyFrom}
                    currencyTo={values.currencyTo}
                    rate={values.rate}
                    minutes={minutes}
                    seconds={seconds}
                />
                <Divider />
                <div className="form__item-container">
                <Checkbox 
                    isSelected={termsAndConditions} 
                    onValueChange={() => setTermsAndConditions(!termsAndConditions)} 
                    radius="full"
                    className=""
                >
                    I agree to the Terms and Conditions
                </Checkbox>
                <Button
                    className="w-full mt-2"
                    type="submit"
                    color="primary"
                    isDisabled={!isValid || !dirty || !touched || !termsAndConditions}
                >
                    Continue
                </Button>
                </div>
            </form>

        </CardBody>
    </Card>
  )
};
