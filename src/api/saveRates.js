const fs = require('fs/promises');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const apiKey = '3fb3134b89ad549244b7461c';
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const getAndSaveExchangeRates = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const rates = data.conversion_rates;

        const directoryPath = path.join(__dirname, '..', 'data');
        const filePath = path.join(directoryPath, 'rates.json');

        
        await fs.mkdir(directoryPath, { recursive: true });

        
        await fs.writeFile(filePath, JSON.stringify(rates, null, 2), 'utf8');
        
        console.log("JSON file has been saved.");
    } catch (error) {
        console.error("Error fetching exchange rates: ", error);
    }
};

getAndSaveExchangeRates();
