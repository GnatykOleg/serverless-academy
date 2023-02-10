const axios = require('axios');

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

const fetchMonobankData = async () => {
    const { data } = await axios.get(`https://api.monobank.ua/bank/currency`);
    myCache.set('monobankData', data);
    return data;
};

const fetchPrivatBankData = async () => {
    const { data } = await axios.get(`https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5`);

    return data;
};

const fetchExchangeRates = async key => {
    try {
        const monobankData = (await myCache.get('monobankData')) || (await fetchMonobankData());
        const privatBankData = await fetchPrivatBankData();

        const usd = monobankData.find(el => el.currencyCodeA === 840);
        const eur = monobankData.find(el => el.currencyCodeA === 978);

        const result = privatBankData.find(el => key === el.ccy);

        const monoResult = key === 'EUR' ? eur : usd;

        const iconCurrensy = key === 'EUR' ? '€' : '$';

        return `
💱 PrivatBank Exchange Rates:

Сurrency: ${result.ccy} ${iconCurrensy}

Base currency: UAH ₴

🛒 Buy: ${result.buy.slice(0, 5)}

🛒 Sale: ${result.sale.slice(0, 5)}

💱 Monobank Exchange Rates:

Сurrency: ${result.ccy} ${iconCurrensy}

Base currency: UAH ₴

🛒 Buy: ${monoResult.rateBuy}

🛒 Sale: ${monoResult.rateSell}
`;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchExchangeRates;
