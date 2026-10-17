import { products } from "./products.js"

let productHTML = '';

products.forEach((product) => {
  productHTML += `<div class="product-container" onclick="window.location.href = '/details/${product.id}'">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-spacer"></div>

        </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;