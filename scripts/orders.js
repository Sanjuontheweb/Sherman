import {list, loadFromStorage, addToList} from './lists.js';
import {products, getProduct} from './products.js'; 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {renderPaymentSummary} from "./paymentSummary.js";
import {getDeliveryOption} from "./deliveryOption.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function renderOrders() {
  let ordersHTML = '';

  const paymentSummaryies = renderPaymentSummary();
  const total = paymentSummaryies.total;
  console.log(total);

orders.forEach((order) => {

    const productId = order.productId;

    const mathingProduct = getProduct(productId);

    const today = dayjs();
    const deliveryDate = today.add(
      getdeliveryOption(order.deliveryOptionId).deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'MMMM D'
    );
    console.log(today);

  ordersHTML += `
    <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>₹ ${order.totalCost}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${mathingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${mathingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${order.estimatedDeliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${order.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${order.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
  `

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

document.querySelectorAll('.js-buy-again').forEach((buttonn) => {
  buttonn.addEventListener('click', () => {
    addToList(productId);
    window.location.href = "checkout.html";
  })
})

})
}