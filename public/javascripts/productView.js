import {list, addToList} from "./lists.js";
import { products } from "./productData.js"

let productHTML = '';

products.forEach((product) => {
  productHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

           <div class="product-price">
            ${product.getPrice()}
          </div>

           <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStars()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-list js-added-to-list">
            <img src="images/icons/checkmark.png">
          </div>

          <button class="add-to-list-button button-primary js-add-to-list" data-product-id = "${product.id}">
            Add now
          </button>
        </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;