import { addToList } from './lists.js';
import { updateListQuantity } from './productView.js';
import { calcuateDeliveryDate } from './tracking.js';

export async function renderOrders() {
  const response = await fetch(`/api/backend/orders/`)
  
  const orders = await response.json()

  const deliveryDate = await calcuateDeliveryDate();

  updateListQuantity();

  const grid = document.querySelector('.js-orders-grid')

  grid.innerHTML = orders.map(order => `
    <div class="order-container">
      <div class="order-card-header">
        <div class="order-card-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${order.createdAt.split('T')[0]}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>₹ ${order.total}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order._id}</div>
        </div>
      </div>

      <div class="order-products">
        ${order.productObj.map(product => {
          return `

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDate.at(-1)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id=${product.id}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
              </button>
            </div>

            <div class="product-actions">
              <a href="/tracking/order?productId=${product.id}&quantity=${product.quantity}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
      `;}).join('')}
      </div>
    </div>
  `).join('')

  document.querySelectorAll('.js-buy-again').forEach((buttonn) => {
    buttonn.addEventListener('click', () => {
      addToList(buttonn.dataset.productId);
      window.location.href = "/checkout";
    })
  })
}

renderOrders()