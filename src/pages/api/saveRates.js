const fs = require('fs/promises');
const path = require('path');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const url = `https://api.binance.com/api/v3/ticker/price`;

const getAndSaveExchangeRates = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const rates = data;

    const directoryPath = path.join(__dirname, '..', 'config');
    const filePath = path.join(directoryPath, 'ratesBinance.json');

    await fs.mkdir(directoryPath, { recursive: true });

    await fs.writeFile(filePath, JSON.stringify(rates, null, 2), 'utf8');

    console.log('JSON file has been saved.');
  } catch (error) {
    console.error('Error fetching exchange rates: ', error);
  }
};

getAndSaveExchangeRates();
