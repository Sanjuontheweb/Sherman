export let list;

loadFromStorage();

export function loadFromStorage() {
  list = JSON.parse(localStorage.getItem('list'));

if (!list) {
  list = [
    {
    productId: '0d7f9qha-4efe-4r89-r0ff-ba8363e0a642',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '4d7d7qfa-3tfe-4e48-r06f-ba8353h0w602',
    quantity: 3,
    deliveryOptionId: '2'
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

/* normalizing - an array conists of the products data, then to access it in another page, u just get the productid as it contains the rest of the data, and can save time/complication 

To save the list in localStorage, u need to use it and stringify it as localS only supports strings, while getting it *.getItem() out convert it back by JSON.parse() and set a default value */