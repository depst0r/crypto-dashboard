const API_KEY = 'MFFQ01LPDIUI4H4S';

export async function getCryptoPrice(cryptoSymbol) {
    const apiDataResponse = document.querySelectorAll('.apiResponse');
    apiDataResponse.forEach(res => {
        res.innerHTML = `⏳ <span class="text-sm text-gray-500">Запрашиваем данные для:</span> <span class="text-sm text-yellow-500">${cryptoSymbol}</span>`;
    });
    try {
        const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cryptoSymbol}&to_currency=USD&apikey=${API_KEY}`;

        const response = await fetch(url);
        apiDataResponse.forEach(res => {
            res.innerHTML = `✔️ <span class="text-sm text-gray-500">Статус ответа:</span> <span class="text-sm text-green-500">${response.status}</span>`;
        })

        const data = await response.json();
        console.log(' Данные от API:', data);

        return data;

    } catch (error) {
        apiDataResponse.forEach(res => {
            res.innerHTML = `🔴 <span class="text-sm text-red-500">Ошибка: ${error.message}</span>  `;
        });
        return null;
    };
};