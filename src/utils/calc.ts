import { getExchangeRateBinance } from '@/pages/api/exchangeRateAPIbinance';
import { PaymentDirection, PaymentMethodType, Transaction } from '@/types/new';

export const calcExchangeValues = async (
  transaction: Transaction,
  setTransaction: React.Dispatch<React.SetStateAction<Transaction>>,
  setIsLoadingFrom: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoadingTo: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (transaction.lastFocusedField === PaymentDirection.From) {
    setIsLoadingTo(true);
  }
  if (transaction.lastFocusedField === PaymentDirection.To) {
    setIsLoadingFrom(true);
  }

  const momentRate = await getExchangeRateBinance(
    transaction.fromDetails.currency,
    transaction.toDetails.currency
  );
  setTransaction((prev) => ({
    ...prev,
  }));

  let result = 0;
  const commercialRate = momentRate - momentRate * 0.07;

  if (transaction.lastFocusedField === PaymentDirection.From) {
    result = transaction.fromAmount * commercialRate;

    if (transaction.toDetails.methodType === PaymentMethodType.CryptoWallet) {
      result = +result.toFixed(6);
    } else {
      result = +result.toFixed(2);
    }

    setTransaction((prev) => ({
      ...prev,
      commercialRate,
      toAmount: result,
    }));

    setIsLoadingTo(false);
  } else {
    result = transaction.toAmount / commercialRate;

    if (transaction.fromDetails.methodType === PaymentMethodType.CryptoWallet) {
      result = +result.toFixed(6);
    } else {
      result = +result.toFixed(2);
    }

    setTransaction((prev) => ({
      ...prev,
      commercialRate,
      fromAmount: +result.toFixed(6),
    }));

    setIsLoadingFrom(false);
  }
};
