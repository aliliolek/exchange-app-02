import { getExchangeRateLocal } from "@/api/exchangeRateLocal";
import { TransactionDetails } from "@/types";

interface CalcExchangeValuesParams {
    details: Partial<TransactionDetails>;
    lastField: 'amountFrom' | 'amountTo';
}

interface CalcExchangeResult {
    amountFrom?: number;
    amountTo?: number;
    rate: number;
}


export const calcExchangeValues = async ({
    details:{
    amountFrom = 0,
    amountTo = 0,
    currencyFrom,
    currencyTo,
},
    lastField,
}: CalcExchangeValuesParams): Promise<CalcExchangeResult> => {

    const momentRate = await getExchangeRateLocal(currencyFrom, currencyTo);
    let result = 0;
    const commercialRate = momentRate - momentRate * 0.07;

    if (lastField === 'amountFrom') {
        result = amountFrom * commercialRate;
        return {
            amountTo: +result.toFixed(2),
            rate: commercialRate,
        };
    } else {
        result = amountTo / commercialRate;
        
        return {
            amountFrom: +result.toFixed(2),
            rate: commercialRate,
        };
    }
};