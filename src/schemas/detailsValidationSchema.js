import { PaymentMethodType } from '@/types/new';
import * as Yup from 'yup';

const paymentMethodDetailsSchema = () => ({
  methodType: Yup.string().required('Payment method is required'),
  currency: Yup.string().required('Currency is required'),
  option: Yup.string().required('Option is required'), // Тепер option завжди вимагається
  bankName: Yup.string().when('methodType', {
    is: PaymentMethodType.BankTransfer,
    then: Yup.string().required('Bank name is required for Bank Transfer'),
  }),
  accountNumber: Yup.string().when('methodType', {
    is: PaymentMethodType.BankTransfer,
    then: Yup.string()
      .matches(/^\d+$/, 'Account number must be digits')
      .required('Account number is required for Bank Transfer'),
  }),
  ownerName: Yup.string().when('methodType', {
    is: (val) =>
      val === PaymentMethodType.BankTransfer || val === PaymentMethodType.Cash,
    then: Yup.string().required(
      'Owner name is required for Bank Transfer and Cash'
    ),
  }),
  walletAddress: Yup.string().when('methodType', {
    is: PaymentMethodType.CryptoWallet,
    then: Yup.string().required('Wallet address is required for Crypto Wallet'),
  }),
});

export const detailsValidationSchema = Yup.object({
  fromDetails: Yup.object(paymentMethodDetailsSchema()),
  toDetails: Yup.object(paymentMethodDetailsSchema()),
});
