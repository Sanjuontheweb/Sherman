import {getProduct, Product} from './products.js'; 
import {renderPaymentSummary} from './paymentSummary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {list, removeList, updateDeliveryOptions} from './lists.js';
import {deliveryOptions, getDeliveryOption} from './deliveryOption.js';
import './utilities/lists-oop.js';

export function renderOrdersSummary() {
  let listSummaryHTML = '';

  list.forEach((item) => {
    const productId = item.productId;

    const matchingProducts = getProduct(productId);
    const mathingProduct = new Product(matchingProducts)

    const deliveryOptionId = item.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

  const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    listSummaryHTML += `<div class="list-item-container js-list-item-container-${mathingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="list-item-details-grid">
          <img class="product-image"
            src="${mathingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${mathingProduct.name}
            </div>
            <div class="product-price">
              ${mathingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
              </span>
              <div class = "delete-div">
              <span class="delete-quantity-link link-primary js-delete-link"
              data-product-id = "${mathingProduct.id}">
                ❌
              </span>
              </div>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose your delivery option:
            </div>
            ${deliveryOptionsHTML(mathingProduct, item)}
          </div>
        </div>
      </div>`;
  });

  function deliveryOptionsHTML(mathingProduct, item) {
  let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.price === 0
      ? 'FREE'
      : `₹ ${deliveryOption.price}`;

      const isChecked = deliveryOption.id === item.deliveryOptionId;

      html +=
      `
      <div class="delivery-option js-delivery-option"
      data-product-id = "${mathingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked' : ''} 
        class="delivery-option-input"
            name="delivery-option-${mathingProduct.id}">
        <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString}
        </div>
      </div>
      </div>`
    });

    return html;
  }
  
  document.querySelector('.js-order-summary').innerHTML = listSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeList(productId);  
      
      const container = document.querySelector(`.js-list-item-container-${productId}`);

      container.remove();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener ('click', () => { 
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOptions(productId, deliveryOptionId);
      renderOrdersSummary();
      renderPaymentSummary();
    });
  });

}

renderOrdersSummary();
renderPaymentSummary();