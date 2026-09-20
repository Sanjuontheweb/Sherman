export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  price: 0
}, {
  id: '2',
  deliveryDays: 3,
  price: 39
}, {
  id: '3',
  deliveryDays: 1,
  price: 99
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

/* Better way to update the page,
just put the whole codein a function to rerun the code
 it works
 
 recursion - function re-running 
 
 MVC[Model - view - controller] - updting and re-running all the HTML 
 
 Model - saves and manages the data
 View - takes the data and displays on the page 
 Controller - runs some code when we interact with the page
 here, the list wad created to view on the page. when interacted with the view, the controller runs. it inturn updates the model. Finally the model regenerates the view

 Design patterns - Many frameworks are sdesigned around MVC
 
 it loops through each 3. THus MVC*/