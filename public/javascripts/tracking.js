import {products} from 'products.js'

const url = new URL(window.location.href);
console.log(url.searchParams.get('orderId'));
console.log(url.searchParams.get('productId'));