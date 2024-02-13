export const getExchangeRate = async (fromCurrency: string, toCurrency: string): Promise<number> => {
    const apiKey = '8c48aa3d54691cb2a00613d0';
    // Завжди використовуємо USD як базову валюту для запиту
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rates = data.conversion_rates;

        const rateFrom = rates[fromCurrency];
        const rateTo = rates[toCurrency];

        if (rateFrom && rateTo) {
            const exchangeRate = rateTo / rateFrom;
            return exchangeRate;
        } else {
            throw new Error(`Cannot find rates for ${fromCurrency} or ${toCurrency}`);
        }
    } catch (error) {
        console.error("Error fetching exchange rates: ", error);
        throw error;
    }
};
