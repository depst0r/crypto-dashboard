// src/api.js
const API_KEY = 'MFFQ01LPDIUI4H4S';

// Самая простая функция для получения данных
export async function getCryptoPrice(cryptoSymbol) {
    console.log('🔹 Запрашиваем данные для:', cryptoSymbol);

    try {
        const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cryptoSymbol}&to_currency=USD&apikey=${API_KEY}`;

        const response = await fetch(url);
        console.log(' Статус ответа:', response.status);

        const data = await response.json();
        console.log(' Данные от API:', data);

        return data;

    } catch (error) {
        console.error(' Ошибка:', error.message);
        return null;
    }
}