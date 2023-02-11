const axios = require('axios');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

const fetchPrivatBankData = async () => {
    const { data } = await axios.get(`https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5`);
    return data;
};

const fetchMonoBankData = async () => {
    const { data } = await axios.get(`https://api.monobank.ua/bank/currency`);
    myCache.set('monoBankData', data);
    return data;
};

const fetchExchangeRates = async key => {
    try {
        const privatBankData = await fetchPrivatBankData();

        const currencyPb = privatBankData.find(({ ccy }) => key === ccy);

        const monoBankData = (await myCache.get('monoBankData')) || (await fetchMonoBankData());

        const currencyMbUsd = monoBankData.find(
            ({ currencyCodeA, currencyCodeB }) => currencyCodeA === 840 && currencyCodeB === 980
        );
        const currencyMbEur = monoBankData.find(
            ({ currencyCodeA, currencyCodeB }) => currencyCodeA === 978 && currencyCodeB === 980
        );

        if (!currencyMbUsd || !currencyMbEur)
            return console.log('Sorry we dont find usd or eur currency to uah');

        const monoBankResult = key === 'EUR' ? currencyMbEur : currencyMbUsd;

        const iconCurrensy = key === 'EUR' ? 'EUR 💶' : 'USD 💵';

        return `
🏦 PrivatBank Exchange Rates:

Currency: ${iconCurrensy}

🌍 Base currency: UAH ₴

🪙 Buy: ${currencyPb.buy.toString().slice(0, 5)}

🪙 Sale: ${currencyPb.sale.toString().slice(0, 5)}


🏦 Monobank Exchange Rates:

Currency: ${iconCurrensy}

🌍 Base currency: UAH ₴

🪙 Buy: ${monoBankResult.rateBuy.toString().slice(0, 5)}

🪙 Sale: ${monoBankResult.rateSell.toString().slice(0, 5)}

📅 ${new Date(monoBankResult.date * 1000).toLocaleString()} 
`;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchExchangeRates;
