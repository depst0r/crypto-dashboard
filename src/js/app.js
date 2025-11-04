import '/src/sass/style.scss';
import { getCryptoPrice } from './api.js';
import "tailwindcss";



window.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelector('.cards');
    const mainCryptocurrencies = ['BTC', 'ETH', 'ADA'];

    mainCryptocurrencies.forEach(symbol => {
        getCryptoPrice(symbol).then(data => {
            console.log(data.symbol)
            const card = document.createElement('div');
            card.className = 'col-span-12 md:col-span-4 xl:col-span-3';
            card.innerHTML = `
            <div class="bg-gray-800 rounded-2xl p-6 h-40 relative overflow-hidden">
                <div class="absolute inset-0 bg-cover bg-center opacity-20"
                    style="background-image: url('/src/img/Looper-3.png')"></div>
                <div class="crypto flex flex-col gap-[19px]">
                    <div class="crypto-logo flex items-center gap-4">
                        <img src=${data.image} alt="${data.name}" class="relative z-10 w-[35px] h-[35px]"> 
                    <div class="crypto-name flex flex-col">
                        <span>${data.name}</span>
                        <span class="text-[10px] text-green-500">${Math.abs(data.price_change_percentage_24h).toFixed(2)}%</span>
                    </div>
                    </div>
                    <div class="crypto-price flex flex-col">
                        <span class="text-[20px] font-semibold">${(data.current_price / 1000).toFixed(4)} ${data.symbol.toUpperCase()}</span>
                        <span>$${data.current_price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;

            cards.insertAdjacentHTML('afterbegin', card.outerHTML);
        });
    });
})