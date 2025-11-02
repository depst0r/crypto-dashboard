import '/src/sass/style.scss';
import { getCryptoPrice } from './api.js';
import "tailwindcss";



window.addEventListener('DOMContentLoaded', () => {
    const cryptocurrencies = ['BTC', 'ETH', 'ADA', 'DOGE', 'LTC', 'XRP', 'DOT', 'LINK'];

    console.log(' Запускаем тест API...');

    getCryptoPrice('BTC').then(data => {
        console.log(' Результат:', data);
    });
});