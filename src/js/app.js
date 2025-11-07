import '/src/sass/style.scss';
import { getCryptoPrice } from './api.js';
import "tailwindcss";

window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');
    const form = document.querySelector('form');
    const cryptoSelect = document.getElementById('crypto-select');
    const cryptoIcon = document.getElementById('crypto-icon');
    const cyrrencySelect = document.getElementById('cyrrency-select');
    const currencyIcon = document.getElementById('cyrrency-icon');
    const tradeBtnText = document.querySelector('.crypto-btn');
    const cryptoAmount = document.getElementById('crypto-amount');
    const priceResult = document.getElementById('price-result');

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


    const testPrices = {
        'BTC': 45000,
        'ETH': 3000,
        'ADA': 0.5
    };

    const buyHistory = [];

    form.addEventListener('submit', e => {
        e.preventDefault();

        const newPurchase = {
            currency: cyrrencySelect.value,
            crypto: cryptoSelect.value,
            amount: parseFloat(cryptoAmount.value),
            price: parseFloat(priceResult.value),
            date: new Date().toLocaleString()
        };

        buyHistory.push(newPurchase);
        console.log(buyHistory)
    });

    function calculatePrice() {
        const crypto = cryptoSelect.value;
        const amount = parseFloat(cryptoAmount.value) || 0;

        if (amount <= 0) {
            priceResult.value = '0';
            return;
        }


        const price = testPrices[crypto];
        const total = amount * price;
        priceResult.value = total.toFixed(2);
    }

    cryptoSelect.addEventListener('change', function () {
        const selectedCrypto = this.value;
        cryptoIcon.src = cryptoIcons[selectedCrypto];

        if (selectedCrypto === 'BTC') tradeBtnText.textContent = 'Bitcoin';
        else if (selectedCrypto === 'ETH') tradeBtnText.textContent = 'Ethereum';
        else if (selectedCrypto === 'ADA') tradeBtnText.textContent = 'Cardano';

        calculatePrice();
    });

    cryptoAmount.addEventListener('input', calculatePrice);

    cyrrencySelect.addEventListener('change', function () {
        currencyIcon.src = fiatIcons[this.value];
    });

    cryptoIcon.src = cryptoIcons['BTC'];
    currencyIcon.src = fiatIcons['USD'];


    mainCryptocurrencies.forEach(symbol => {
        getCryptoPrice(symbol).then(data => {
            const cardHTML = `
                <div class="col-span-12 md:col-span-4 xl:col-span-3">
                    <div class="bg-gray-800 rounded-2xl p-6 h-40 relative overflow-hidden">
                        <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/src/img/Looper-3.png')"></div>
                        <div class="crypto flex flex-col gap-[19px]">
                            <div class="crypto-logo flex items-center gap-4">
                                <img src="${data.image}" alt="${data.name}" class="relative z-10 w-[35px] h-[35px]"> 
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
                </div>
            `;
            cards.insertAdjacentHTML('afterbegin', cardHTML);
        });
    });
    calculatePrice();
});