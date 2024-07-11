import {list, removeList, updateDeliveryOptions} from './lists.js';
import {products, getProduct} from './products.js'; 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from './deliveryOption.js';
import {renderPaymentSummary} from './paymentSummary.js';
import './utilities/lists-oop.js';

export function renderOrdersSummary() {
  let listSummaryHTML = '';

  list.forEach((item) => {
    const productId = item.productId;

    const mathingProduct = getProduct(productId);

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
                      Delete
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
/* to actually delete the order created, first need to add event listener to get the button. Then, to delete the product slected and nothing else, add data-product-id to link the Productid to the button

Then,also for the products to have a different radio button for each product seperately, use ${id} to seperate the radio options of each product

Then, as the delete button(span) gets the specific ID of each product, link it by creating a class js-list-container-${id} and link the class to the product iD to get the whole HTML of the product in list
By adding .remove() by DOM, the product gets deleted.

That's how we make the delete button functional

if u want to make ur code cleaner, use export default, so u dont have to use {}
but it can be used only once in a file 

Naming can be a headache bcoz of the scope in func,
remember
deliveryOption(update) - 
1. wrote the deliveryOptions, with an id, deliveryDays and price
2. got the html, looped the deliveryOptions and calculated the days using dayjs and formatted it 
3.calculated the price, according to the options.
4. created a variable to store the array, then returned it
5. updated the delivery date above by looping through the list, then mathing the date and storing it, then displaying on the page
6.to make it so that it changes with the options, looping through list, then update the DeliveryOption of the product
7. add eventListeners to each of the options, add data attributes to get productId, deliveryptions and get the attributes. DONE */