// Визначення типу для курсів валют
interface Rates {
    [key: string]: number;
  }
  
  // Припускаємо, що `rates` імпортується з JSON файлу
  import rates from '../config/rates.json';
  
  export const getExchangeRateLocal = (fromCurrency: string = '', toCurrency: string = ''): number => {
    // Переконуємо TypeScript, що `rates` відповідає інтерфейсу Rates
    const ratesTyped: Rates = rates;
  
    const rateFrom = ratesTyped[fromCurrency];
    const rateTo = ratesTyped[toCurrency];

    if (!rateFrom || !rateTo) {
      return 0;
    }
  
    // Перевірка, що обидва курси існують, перед обчисленням обмінного курсу
    if (typeof rateFrom === 'number' && typeof rateTo === 'number') {
      const exchangeRate = rateTo / rateFrom;
      return exchangeRate;
    } else {
      throw new Error(`Cannot find rates for ${fromCurrency} or ${toCurrency}`);
    }
  };
  