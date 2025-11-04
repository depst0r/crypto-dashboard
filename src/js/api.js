export async function getCryptoPrice(cryptoSymbol) {
    const apiDataResponse = document.querySelectorAll('.apiResponse');

    apiDataResponse.forEach(res => {
        res.innerHTML = `⏳ <span class="text-sm text-gray-500">Запрашиваем данные для:</span> <span class="text-sm text-yellow-500">${cryptoSymbol}</span>`;
    });
    try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`;


        const response = await fetch(url);
        console.log(response)

        apiDataResponse.forEach(res => {
            res.innerHTML = `✔️ <span class="text-sm text-gray-500">Статус ответа:</span> <span class="text-sm text-green-500">${response.status}</span>`;
        })

        const data = await response.json();

        const crypto = data.find(item =>
            item.symbol.toLowerCase() === cryptoSymbol.toLowerCase()
        );

        if (!crypto) {
            apiDataResponse.forEach(result => {
                result.innerHTML = `❌ <span class="text-sm text-gray-500">Нет данных от API:</span>`;
            })
            return;
        }

        return crypto;

    } catch (error) {
        apiDataResponse.forEach(res => {
            res.innerHTML = `🔴 <span class="text-sm text-red-500">Ошибка: ${error.message}</span>  `;
        });
        return null;
    };
}