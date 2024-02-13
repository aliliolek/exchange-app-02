import { TransactionDetails, getEmptyDetails, transactionFieldsLabels } from '@/types';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import { Button, Card, CardBody, CardHeader, Checkbox, Divider, Select } from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import React, { useEffect, useState } from 'react';
import { formatCardNumber, hasCardNumberReachedMaxLength, isHighlighted } from '@/utils/formatter';
import { formatNumber } from 'libphonenumber-js';
import { useFormik } from 'formik';
import { setDetailsSchema } from '@/schemas';
import { calcExchangeValues } from '@/utils/calc';
import { RateAndTimer } from './RateAndTimer';
import { NameCardBank } from './NameCardBank';
import TransactionTable from './TransactionTable';


interface SetDetailsProps {
    transaction: TransactionDetails;
    updateTransactionState: (updates: Partial<TransactionDetails>) => void;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const SetDetails: React.FC<SetDetailsProps> = ({ transaction, updateTransactionState, setStep }) => {
    const [secondsLeft, setSecondsLeft] = useState(900);

    const { 
        values, 
        handleChange, 
        handleBlur, 
        setValues, 
        setFieldValue, 
        handleSubmit,
        handleReset,
        errors,
        touched,
        isValid,
    } = useFormik({
        initialValues: {
            senderDetails: {
                card: 'transaction.senderDetails.card',
                name: 'transaction.senderDetails.name',
                bank: 'transaction.senderDetails.bank',
              },
              recipientDetails: {
                card: 'transaction.recipientDetails.card',
                name: 'transaction.recipientDetails.name',
                bank: 'transaction.recipientDetails.bank',
              },
              contactInfo: {
                telegram: 'transaction.contactInfo.telegram',
                phone: 'transaction.contactInfo.phone',
                email: 'transaction.contactInfo.email',
              },
        },
        onSubmit: (values) => {
            updateTransactionState({
                senderDetails: {
                    card: values.senderDetails.card,
                    name: values.senderDetails.name,
                    bank: values.senderDetails.bank,
                },
                recipientDetails: {
                    card: values.recipientDetails.card,
                    name: values.recipientDetails.name,
                    bank: values.recipientDetails.bank,
                },
                contactInfo: {
                    telegram: values.contactInfo.telegram,
                    phone: values.contactInfo.phone,
                    email: values.contactInfo.email,
                },
            });
            setStep(prev => prev + 1);
        },
        onReset: () => {
            setValues(prev => ({ ...prev, ...getEmptyDetails()}));
            updateTransactionState(getEmptyDetails());
        },
        validationSchema: setDetailsSchema,
    });

    const handleCardNumberKeyPress = (e: any) => {
        const value = e.target.value;
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

        if (value && !isHighlighted() && !allowedKeys.includes(e.key)) {
          const valueLength = value.split(' ').join('').length;
          if (hasCardNumberReachedMaxLength(value, valueLength) || valueLength >= 19) {
            e.preventDefault();
            console.log(value);
          }
        }
    };

    const handleCardChange = (e: any) => {
        const { name, value} = e.target;
        const formattedValue = formatCardNumber(value);
        setFieldValue(name, formattedValue);
    };

    const handlePhoneChange = (e: any) => {
        const { name, value } = e.target;

        let formattedValue = value;

        if (value.length > 6) {
            formattedValue = formatNumber(value, 'INTERNATIONAL');
        }

        setFieldValue(name, formattedValue);
    };

    const handleCalculation = async (lastField: 'amountFrom' | 'amountTo' = transaction.lastFocused) => {
        const result = await calcExchangeValues({
            details: {
                amountFrom: transaction.amountFrom,
                amountTo: transaction.amountTo,
                currencyFrom: transaction.currencyFrom,
                currencyTo: transaction.currencyTo,
            },
            lastField,
        });

        setValues(prev => ({ ...prev, ...result }));
    };

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

return (
    <Card>
        <CardHeader className="flex justify-between gap-4 px-4">
            <Button 
                variant="light" 
                radius="full" 
                className="p-2 min-w-0"
                onClick={() => setStep((prev) => prev - 1)}
            >
                <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <h2 className="font-semibold">
                Your Order
            </h2>
            <Button 
                variant="light" 
                radius="full" 
                className="p-2 min-w-0"
                type="submit"
                isDisabled={!isValid || !touched}
                form="setDetailsForm"
            >
                <ArrowRightIcon className="w-4 h-4" />
            </Button>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
            <Divider />
                <div className="order__text-container">

                    <RateAndTimer 
                        currencyFrom={transaction.currencyFrom}
                        currencyTo={transaction.currencyTo}
                        rate={transaction.rate}
                        minutes={minutes}
                        seconds={seconds}
                    />
                </div>
                <TransactionTable
                    transaction={
                        {
                            amountFrom: transaction.amountFrom,
                            currencyFrom: transaction.currencyFrom,
                            amountTo: transaction.amountTo,
                            currencyTo: transaction.currencyTo,
                            rate: transaction.rate,
                        }
                    }
                    fieldsConfig={[
                        { key: 'amountFrom', label: 'Amount From' },
                        { key: 'currencyFrom', label: 'Currency From' },
                        { key: 'amountTo', label: 'Amount To' },
                        { key: 'currencyTo', label: 'Currency To' },
                        { key: 'rate', label: 'Exchange Rate' },
                    ]}
                />
            <Divider />
            <form 
                className="form flex flex-col gap-4" 
                onSubmit={handleSubmit}
                onReset={handleReset}
                id="setDetailsForm"
            >
                <div className="form__section">
                    <h3 className="font-semibold pb-4">
                        {`Sender's Details`}
                    </h3>
                    <NameCardBank 
                        prefix='senderDetails'
                        userDetails={values.senderDetails}
                        errors={errors.senderDetails}
                        touched={touched.senderDetails}
                        isValid={isValid}
                        handleChange={handleChange}
                        handleCardChange={handleCardChange}
                        handleCardNumberKeyPress={handleCardNumberKeyPress}
                    />
                </div>
                <Divider />
                <div className="form__section">
                    <h3 className="font-semibold pb-4">
                        {`Recipient's Details`}
                    </h3>
                    <NameCardBank 
                        prefix='recipientDetails'
                        userDetails={values.recipientDetails}
                        errors={errors.recipientDetails}
                        touched={touched.recipientDetails}
                        isValid={isValid}
                        handleChange={handleChange}
                        handleCardChange={handleCardChange}
                        handleCardNumberKeyPress={handleCardNumberKeyPress}
                    />
                </div>
                <Divider />
                <div className="form__section">
                    <h3 className="font-semibold pb-4">
                        {`Contact Information`}
                    </h3>
                    <div className="form__item flex flex-col gap-4">
                        <Input
                            name="contactInfo.telegram"
                            type="text"
                            placeholder="@user"
                            label="Telegram"
                            labelPlacement="outside"
                            value={`${values.contactInfo.telegram}`}
                            onChange={handleChange}
                            errorMessage={errors.contactInfo?.telegram && touched.contactInfo?.telegram}
                            isInvalid={!isValid && touched.contactInfo?.telegram}
                        />
                        <Input
                            name="contactInfo.phone"
                            type="text"
                            label="Phone"
                            placeholder="+380 99 000 00 00"
                            labelPlacement="outside"
                            value={`${values.contactInfo.phone}`}
                            onChange={handlePhoneChange}
                            errorMessage={errors.contactInfo?.phone && touched.contactInfo?.phone}
                            isInvalid={!isValid && touched.contactInfo?.phone}
                        />
                        <Input
                            name="contactInfo.email"
                            type="text"
                            label="Email"
                            placeholder="email@example.com"
                            labelPlacement="outside"
                            value={`${values.contactInfo.email}`}
                            onChange={handleChange}
                            errorMessage={errors.contactInfo?.email && touched.contactInfo?.email}
                            isInvalid={!isValid && errors.contactInfo?.email !== ''}
                        />
                    </div>
                </div>
                <Divider />
                <Button
                    className="w-full"
                    type="reset"
                    variant='bordered'
                    color="default"
                    form="setDetailsForm"
                >
                    Reset
                </Button>
                <Button
                    className="w-full"
                    type="submit"
                    color="primary"
                    isDisabled={!isValid || !touched}
                    form="setDetailsForm"
                >
                    Continue
                </Button>
            </form>
        </CardBody>
    </Card>
  )
}
