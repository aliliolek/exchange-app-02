interface Rate {
  symbol: string;
  price: string; // Assuming price is provided as a string by the API
}

const getAdjustedRate = (rates: Rate[], currency: string) => {
  if (currency === 'USDT' || currency === 'USD') return 1;

  const found = rates.find(
    (item) =>
      item.symbol === `USDT${currency}` || item.symbol === `${currency}USDT`
  );

  if (!found) {
    throw new Error(`Cannot find rate for ${currency}`);
  }

  return found.symbol.startsWith('USDT') ? +found.price : 1 / +found.price;
};

export const getExchangeRateBinance = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  if (!fromCurrency || !toCurrency) {
    console.log('Currency parameters are required and cannot be empty.');
    // throw new Error('Currency parameters are required and cannot be empty.');

    return 0;
  }

  const url = `https://api.binance.com/api/v3/ticker/price`;

  try {
    const response = await fetch(url);
    const rates = await response.json();

    const rateFrom = +getAdjustedRate(rates, fromCurrency);
    const rateTo = +getAdjustedRate(rates, toCurrency);

    console.log(`Exchange rates: From - ${rateFrom}, To - ${rateTo}`);

    if (rateFrom && rateTo) {
      const exchangeRate = rateTo / rateFrom;
      return exchangeRate;
    } else {
      throw new Error(`Cannot find rates for ${fromCurrency} or ${toCurrency}`);
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
