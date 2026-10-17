import { getDeliveryOption } from "./deliveryOption.js";

export async function calcuateDeliveryDate() {
  const response = await fetch(`/api/backend/orders/`)
  const orders = await response.json()

  const deliveryDate = orders.flatMap(order => {
    const createdAt = order.createdAt;
    const createdDay = new Date(createdAt)

    return order.productObj.map(product => {
      createdDay.setDate(createdDay.getDate() + getDeliveryOption(product.deliveryOptionId).deliveryDays - 1)
      
      const dateString = createdDay.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });

      return dateString;
    })
  })

  return deliveryDate;
}

export async function renderStuff() {
  const dateString = await calcuateDeliveryDate()
  const deliveryHTML = `Arriving on ${dateString.at(-1)}`
  await updateProgress()

  document.querySelector('.js-delivery-date').innerHTML = deliveryHTML;
}

renderStuff()

export async function updateProgress() {
  const marker = document.querySelector('.progress-marker');
  const progressBar = document.querySelector('.progress-bar');
  const currentStatus = document.querySelectorAll('.progress-label')

  const response = await fetch('/api/backend/orders/');
  const orders = await response.json();

  const currentProductName = document.querySelector('.js-product-info').textContent.trim();

  const matchingOrder = orders.find(order =>
    order.productObj?.some(product =>
      product.name?.trim() === currentProductName
    )
  );

  if (matchingOrder == undefined) {
    console.log('product undefined')
  }

  const orderedProduct = matchingOrder.productObj.find(
    product => product.name?.trim() === currentProductName
  );

  const deliveryDays = orderedProduct.deliveryOptions.deliveryDays + 3;
  const orderTime = new Date(matchingOrder.createdAt).getTime();
  const currentTime = Date.now()
  const elapsedTime = currentTime - orderTime;
  const deliveryTime = deliveryDays * 24 * 60 * 60 * 1000;

  let progress = (elapsedTime / deliveryTime) * 100;
  progress = Math.max(0, Math.min(progress, 94));

  const progressNum = parseInt(progress, 10) + 7;
  const progressBarNum = progressNum.toString()

  marker.style.left = `${progress}%`;
  progressBar.style.setProperty('--target-width', `${progressBarNum}%`);

  if (progress > 49 && progress < 94) {
    currentStatus[1].classList.add('current-status')
  } 
  if (progress >= 94) {
    currentStatus[0].classList.add('current-status')
    currentStatus[1].classList.add('current-status')
    currentStatus[2].classList.add('current-status')
  } else {
    currentStatus[0].classList.add('current-status')
  }
}