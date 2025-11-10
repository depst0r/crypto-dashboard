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

    const buyHistory = [{
        amount: 0.005623,
        crypto: "BTC",
        currency: "USD",
        date: "07.11.2025, 12:46:17",
        price: 253.04,
    },
    {
        amount: 11.012,
        crypto: "ADA",
        currency: "USD",
        date: "07.11.2025, 13:14:46",
        price: 5.51,
    }
    ];


    function showError(message) {
        const errorModal = document.getElementById('errorModal');
        const errorMessage = document.getElementById('errorMessage');

        errorMessage.textContent = message;
        errorModal.classList.remove('hidden');
    }


    function hideError() {
        const errorModal = document.getElementById('errorModal');
        errorModal.classList.add('hidden');
    }


    document.getElementById('errorClose').addEventListener('click', hideError);


    document.getElementById('errorModal').addEventListener('click', function (e) {
        if (e.target === this) {
            hideError();
        }
    });

    form.addEventListener('submit', e => {
        e.preventDefault();

        const amount = parseFloat(cryptoAmount.value);
        const price = parseFloat(priceResult.value);

        if (!cryptoAmount.value.trim() || !priceResult.value.trim()) {
            showError('Заполните все поля');
            return;
        }


        if (isNaN(amount) || isNaN(price)) {
            showError('Введите корректные числа');
            return;
        }


        if (amount <= 0 || price <= 0) {
            showError('Значения должны быть больше 0');
            return;
        }

        const newPurchase = {
            currency: cyrrencySelect.value,
            crypto: cryptoSelect.value,
            amount: parseFloat(cryptoAmount.value),
            price: parseFloat(priceResult.value),
            date: new Date().toLocaleString()
        };


        buyHistory.unshift(newPurchase);
        buyCrupto()
        form.reset();
    });


    function buyCrupto() {

        const transaction = document.querySelector('.transaction');

        transaction.innerHTML = '';

        buyHistory.map(data => {
            transaction.innerHTML += `
    <div class="transcation-buy flex flex-row justify-between">
        <div class="transcation-crupto flex flex-col">
            <span class="font-medium text-white text-[15px]">Buy ${data.crypto}</span>
            <span class="font-normal text-xs text-gray-500">${data.date}</span>
        </div>
        <div class="transcation-trade flex flex-col text-end">
            <span class="text-[15px] text-green-600 font-semibold">+${data.amount}</span>
            <span class="font-normal text-xs text-gray-500">${data.currency} ${data.price}</span>
        </div>
    </div>
            `
        })
    };

    buyCrupto()

    function calculatePrice() {
        const crypto = cryptoSelect.value;
        const amount = parseFloat(cryptoAmount.value) || 0;

        if (isNaN(amount) || amount <= 0) {
            priceResult.value = '';
            return;
        }

        const price = testPrices[crypto];
        const total = amount * price;
        priceResult.value = total.toFixed(2);
    }

    function calculateCryptoFromUSD() {
        const crypto = cryptoSelect.value;
        const usdAmount = parseFloat(priceResult.value) || 0;

        if (isNaN(amount) || usdAmount <= 0) {
            cryptoAmount.value = '';
            return;
        }

        const price = testPrices[crypto];
        const cryptoAmountResult = usdAmount / price;
        cryptoAmount.value = cryptoAmountResult.toFixed(6);
    }

    priceResult.addEventListener('input', calculateCryptoFromUSD);

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

    function createBarChart() {
        const ctx = document.getElementById('cryptoChart').getContext('2d');

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
                datasets: [{
                    label: 'Price Change',
                    data: [200, -400, 700, 300, 100, 200, 100],
                    backgroundColor: function (context) {
                        const value = context.dataset.data[context.dataIndex];
                        return value >= 0 ? '#10b981' : '#ef4444';
                    },
                    borderColor: function (context) {
                        const value = context.dataset.data[context.dataIndex];
                        return value >= 0 ? '#10b981' : '#ef4444';
                    },
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
                    y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } }
                }
            }
        });
    }
    createBarChart()
    calculatePrice();
});