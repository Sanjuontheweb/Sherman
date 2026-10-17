function List(localStorageKey) {
  const list = {
    listItems: undefined,
  
    loadFromStorage() {
      this.listItems = JSON.parse(localStorage.getItem(localStorageKey));
    
    if (!this.listItems) {
      this.listItems = [
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
    },
  
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.listItems));
    },
  
    addToList(productId) {
      let mathingItem;
    
        this.listItems.forEach((item) => {
          if (productId === item.productId) {
            mathingItem = item;
          }
        });
    
        if (mathingItem) {
          mathingItem.quantity += 1;
        } else {
          this.listItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
          });  
        } 
    
        this.saveToLocalStorage();
      },
  
      removeList(productId) {
        const newList = [];
  
        this.listItems.forEach((item) => {
          if (item.productId !== productId) {
            newList.push(item);
          }
        });
  
        this.listItems = newList;
        this.saveToLocalStorage();
      },
  
      updateDeliveryOptions (productId, deliveryOptionId) {
        let mathingItem;
      
          this.listItems.forEach((item) => {
            if (productId === item.productId) {
              mathingItem = item;
            }
          });
      
          mathingItem.deliveryOptionId = deliveryOptionId;
      
          this.saveToLocalStorage();
      }
    
  };

  return list;
}

const list = List('list-oop');
const businesslist = List('list-business');

list.loadFromStorage();

businesslist.loadFromStorage();