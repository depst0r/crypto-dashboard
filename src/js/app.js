import '/src/sass/style.scss';
import { getCryptoPrice } from './api.js';
import "tailwindcss";



window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');
    const form = document.querySelector('form');
    const cryptoSelect = form.querySelector('#crypto-select');
    const cryptoIcon = document.getElementById('crypto-icon');
    const cyrrencySelect = form.querySelector('#cyrrency-select');
    const currencyIcon = document.getElementById('cyrrency-icon');
    const tradeBtnText = form.querySelector('.crypto-btn');

    const mainCryptocurrencies = ['BTC', 'ETH', 'ADA'];

    const cryptoIcons = {
        'BTC': 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
        'ETH': 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
        'ADA': 'https://assets.coingecko.com/coins/images/975/small/cardano.png'
    };

    const fiatIcons = {
        'USD': 'https://flagcdn.com/us.svg',
        'EUR': 'https://flagcdn.com/eu.svg',
    };

    form.addEventListener('submit', e => {
        e.preventDefault()
    });

    cryptoSelect.addEventListener('change', function() {
        const selectedCrypto = this.value;
        cryptoIcon.src = cryptoIcons[selectedCrypto];
        cryptoIcon.alt = selectedCrypto;

        if (selectedCrypto === 'BTC') {
            tradeBtnText.textContent = 'Bitcoin';
        } else if (selectedCrypto === 'ETH') {
            tradeBtnText.textContent = 'Ethereum';
        } else if (selectedCrypto === 'ADA') {
            tradeBtnText.textContent = 'Cardano';
        }
    });

    cryptoIcon.src = cryptoIcons['BTC'];

    cyrrencySelect.addEventListener('change', function() {
        const selectedCyrrency = this.value;
        currencyIcon.src = fiatIcons[selectedCyrrency];
        currencyIcon.alt = selectedCyrrency;
    });

    currencyIcon.src = fiatIcons['USD'];

    mainCryptocurrencies.forEach(symbol => {
        getCryptoPrice(symbol).then(data => {
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