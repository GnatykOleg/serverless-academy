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

        const currencyMbUsd = monoBankData.find(({ currencyCodeA }) => currencyCodeA === 840);
        const currencyMbEur = monoBankData.find(({ currencyCodeA }) => currencyCodeA === 978);

        const monoResult = key === 'EUR' ? currencyMbEur : currencyMbUsd;

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

🪙 Buy: ${monoResult.rateBuy.toString().slice(0, 5)}

🪙 Sale: ${monoResult.rateSell.toString().slice(0, 5)}
`;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchExchangeRates;
//
