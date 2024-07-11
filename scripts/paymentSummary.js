import {list} from './lists.js';
import {getProduct} from './products.js';
import {getDeliveryOption} from './deliveryOption.js';
import {addOrders, orders} from './orders.js';

export function renderPaymentSummary() {
  let productPrice = 0;
  let shippingPrice = 0;

  list.forEach((item) => {
    const product = getProduct(item.productId);
    productPrice += product.price * item.quantity;

    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingPrice += deliveryOption.price;
  });

 const totalBeforeTax = productPrice + shippingPrice;
 const discount = Math.round(totalBeforeTax * 0.15);
 const tax = (totalBeforeTax * 0.1).toFixed(2);
 const total = totalBeforeTax + Math.round(tax);

 const paymentSummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items Price(3):</div>
    <div class="payment-summary-money">₹ ${productPrice}</div>
  </div>

  <div class="payment-summary-row">
    <div>Discount(15%):</div>
    <div class = "payment-summary-money">₹ ${discount}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">₹ ${totalBeforeTax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">₹ ${tax}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div class = "order-total">Order total:</div>
    <div class="payment-summary-money">₹ ${total}</div>
  </div>

  <div class = "UPI-options">
    <label for = "checkUPI" class = "UPI-option">
    </label>
      <input type = "checkbox" id = "checkUPI" checked onchange = "
        const upiBox = document.querySelector('.js-upi-box');
        if (this.checked) {
          upiBox.style.display = 'block';
        } else {
          upiBox.style.display = 'none';
        }
      ">
      <img src = "images/UPI-sign.png" class = "upi-sign">
  </div>

  <a href = "https://accounts.razorpay.com/auth/?redirecturl=https%3A%2F%2Feasy.razorpay.com&auth_intent=signup&cta_btn=Navbar_Header" target = '_blank'><button class = "upi-box js-upi-box">
    <img src = "images/razorpay.png" class = "upi-box-image">
  </button>
  </a>

  <button class="place-order-button button-primary js-place-order">
    Place your order
  </button>
 `;

 document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

 document.querySelector('.js-place-order').addEventListener('click', async() => {
  try {
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: list
      })
    });
  
    const order = await response.json();
    addOrders(order);
  }
   catch(error) {
    console.log("Ofc it's an error and u dont know what , Go bang ur head");
  }

  window.location.href = "orders.html";
 });
};

// headers gives the backend more request info bout our requst

//window.location - controls the URL and let's change the URL