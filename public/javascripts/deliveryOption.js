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