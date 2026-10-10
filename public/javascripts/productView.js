import {list, addToList} from "./lists.js";

export function updateListQuantity() {
  let listQuantity = 0;
    list.forEach((item) => {
      listQuantity += item.quantity;
    });
};

document.querySelectorAll('.js-add-to-list').forEach((button) => {
  button.addEventListener('click',() => {
    const productId = button.dataset.productId;
    addToList(productId);
    updateListQuantity();
  });
});