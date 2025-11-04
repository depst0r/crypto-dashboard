import '/src/sass/style.scss';
import { getCryptoPrice } from './api.js';
import "tailwindcss";



window.addEventListener('DOMContentLoaded', () => {
    const cryptocurrencies = ['BTC', 'ETH', 'ADA', 'DOGE', 'LTC', 'XRP', 'DOT', 'LINK'];

    getCryptoPrice('BTC').then(data => {
        const { name, symbol, price, lastUpdated } = data;
    })
});