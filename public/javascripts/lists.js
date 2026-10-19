export let list;

loadFromStorage();

export function loadFromStorage() {
  list = JSON.parse(localStorage.getItem('list'));

if (!list) {
  list = [
    {
    productId: '3b7d6jfe-3jdo-7o93-r04c-ba8924h0w851',
    quantity: 2,
    deliveryOptionId: '1'
  }];
  }
}

export function saveToLocalStorage() {
  localStorage.setItem('list', JSON.stringify(list));
};

export function addToList(productId) {
  let mathingItem;

    list.forEach((item) => {
      if (productId === item.productId) {
        mathingItem = item;
      }
    });

    if (mathingItem) {
      mathingItem.quantity += 1;
    } else {
      list.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });  
    } 

    saveToLocalStorage();
  }
    
export function removeList(productId) {
  const newList = [];

  list.forEach((item) => {
    if (item.productId !== productId) {
      newList.push(item);
    }
  });

  list = newList;
  saveToLocalStorage();
}

export function updateDeliveryOptions (productId, deliveryOptionId) {
  let mathingItem;

    list.forEach((item) => {
      if (productId === item.productId) {
        mathingItem = item;
      }
    });

    mathingItem.deliveryOptionId = deliveryOptionId;

    saveToLocalStorage();
}