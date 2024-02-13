import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const selectCurrencySchema = yup.object({
    amountFrom: yup
        .number('Amount From must be a number')
        .positive('Amount From must be a positive number')
        .min(1000, 'min: 1000')
        .max(100000, 'max: 100000')
        .required('Amount From is required'),
    amountTo: yup
        .number()
        .positive('Amount To must be a positive number')
        .required('Amount To is required'),
    currencyFrom: yup.string()
      .required('Currency From is required'),
    currencyTo: yup.string()
      .required('Currency To is required'),
  });

  const cardSchema = yup.number()
    .required('Card number is required');
  const nameSchema = yup.string()
    .required('Name is required');
  const bankSchema = yup.string()
    .required('Bank name is required');
  const telegramSchema = yup.string()
    .required('Telegram is required');
  const phoneSchema = yup.string()
    .required('Phone is required').test(
      'is-valid-phone',
      'Phone number is not valid',
      value => isValidPhoneNumber(value) // Тут використовується для перевірки номера телефону
    );
  const emailSchema = yup.string()
    .email('Invalid email')
    .required('Email is required');
  
export const setDetailsSchema = yup.object().shape({
    senderDetails: yup.object().shape({
      card: cardSchema,
      name: nameSchema,
      bank: bankSchema,
    }),
    recipientDetails: yup.object().shape({
      card: cardSchema,
      name: nameSchema,
      bank: bankSchema,
    }),
    contactInfo: yup.object().shape({
      telegram: telegramSchema,
      phone: phoneSchema,
      email: emailSchema,
    }),
  });