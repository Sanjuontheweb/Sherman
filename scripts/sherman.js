import {list, addToList} from "./lists.js";
import {products} from "./products.js";

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

updateListQuantity();

export function updateListQuantity() {
  let listQuantity = 0;
    list.forEach((item) => {
      listQuantity += item.quantity;
    });

    document.querySelector('.js-list-quantity').innerHTML = listQuantity;
};

document.querySelectorAll('.js-add-to-list').forEach((button) => {
  button.addEventListener('click',() => {
    const productId = button.dataset.productId;
    addToList(productId);
    updateListQuantity();

    const checkMark = button.parentNode.querySelector('.js-added-to-list');

    check();

    function check() {
      checkMark.style.opacity = '1';
    }

    setTimeout(() => {
      checkMark.style.opacity = '0';
    }, 2200);
  });
});

/* first, we generate the html so we dont have to make it again and again
  then, we crete a variable to store the array, which contains all the info of the products
  
  then, we loop the array and create a variable to put the loop in.
  
  then we change the names,image... using ${}
  
  we put the html into JS using querySelector
  
  .toFixed - converts the number ino decimal and can be given to show upto given no of decimals
  
  Then add the eventListener to make the buttons interactive
  
  a data attribute in HTML is just another attribute, but allows to store info in the element
  like this,
  data-(any name) = "${/value}" 
  
  .dataset - gives the data attribute attached to the value,
  then used to get which product to add to list using product.id
  then,to increase the quantity, not increase products put through if
  then, make the no on the page interactive by DOM
  
  naming-Conflict - when a variable with same name is declared at 2 different files, the website breaks
  
  modules - contains the variable inside the file, avoids naming conflicts and can be used in another file
  by not loading it with <script> tag 
  
  ways to get a variable out of a file :
  1. type="module" - a html attribute enables to get smtg out/into of file
  2. export - the required variable
  3. import - import {/variable} from '../data/list.js'; (../ to get out of the folder
   ./ if its the same folder) 
   
  import {} from './.js'
  sometimes, the variable should have a different name from the file name
  the only <script> file that remains in the HTML is called entry point
  
  counter is used to run a function every second */