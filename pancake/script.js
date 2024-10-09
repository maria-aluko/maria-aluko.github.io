"use strict"

// variables
const pancakeType = document.getElementById('type');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const displayPrices = document.querySelectorAll('#totalPrice');
const radios = document.querySelectorAll('input[type="radio"]');
const seeOrderBtn = document.getElementById('seeOrderBtn');
const displayDiv = document.getElementById('displayDiv');
const orders = [];
const shakeMe = document.querySelector('.price-banner');

// Calculate price

function calcPrice() {
  const typeSelected = pancakeType.options[pancakeType.selectedIndex];
  let totalPrice = +typeSelected.value;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      totalPrice += +checkbox.value;
    }
  });

  radios.forEach((radio) => {
    if (radio.checked) {
      totalPrice += +radio.value;
    }
  });

  displayPrices.forEach((displayPrice) => {
    displayPrice.textContent = `$${totalPrice}`;
  });
}

// Display order
function testDisplay() {
  const toppings = document.querySelectorAll('.customization-section1 input[type="checkbox"]');
  const extras = document.querySelectorAll('.customization-section2 input[type="checkbox"]');
  const customer = document.getElementById('customerName').value || 'Guest';
  const typeSelected = pancakeType.options[pancakeType.selectedIndex].textContent.split('-')[0].trim();
  const selectedToppings = [];
  const selectedExtras = [];
  let selectedDelivery = '';
  let toppingsText;
  let extrasText;

  toppings.forEach((topping) => {
    if (topping.checked) {
      selectedToppings.push(topping.parentElement.textContent);
    } if (selectedToppings.length == 0) {
      toppingsText = 'You did not choose any toppings.';
    } else {
      toppingsText = '';
    }
  });

  extras.forEach((extra) => {
    if (extra.checked) {
      selectedExtras.push(extra.parentElement.textContent.split('-')[0].trim());
    } if (selectedExtras.length == 0) {
      extrasText = 'You did not choose any extras.';
    } else {
      extrasText = '';
    }
  });

  radios.forEach((radio) => {
    if (radio.checked) {
      selectedDelivery = radio.parentElement.textContent.split('-')[0].trim();
    }
  });


  class Order {
    constructor(typeSelected, selectedToppings, selectedExtras, customer, selectedDelivery, totalPrice) {
      this.typeSelected = typeSelected;
      this.selectedToppings = selectedToppings;
      this.selectedExtras = selectedExtras;
      this.customer = customer;
      this.selectedDelivery = selectedDelivery
      this.totalPrice = totalPrice;
    }
  }

  const newOrder = new Order(typeSelected, selectedToppings, selectedExtras, customer, selectedDelivery, totalPrice[0].textContent);
  orders.push(newOrder);

  displayDiv.style.display = 'block';
  displayDiv.innerHTML = `
    <p><strong>Order no:</strong> ${orders.indexOf(newOrder)}</p>
    <p><strong>Name:</strong> ${customer}</p>
    <p><strong>Selected pancake:</strong> ${typeSelected}</p>
    <p><strong>Chosen toppings:</strong> ${selectedToppings.join(', ')}${toppingsText}</p>
    <p><strong>Chosen extras:</strong> ${selectedExtras.join(', ')}${extrasText}</p>
    <p><strong>Delivery method:</strong> ${selectedDelivery}</p>
    <p id="totalOrder"><strong>Total Price: ${totalPrice[0].textContent}</strong> </p>
    `;
  console.log(orders);
}

// Animation for price change
function makePriceShake() {
  shakeMe.classList.add('shake');
  setTimeout(() => {
    shakeMe.classList.remove('shake');
  }, 300);
}

// Event Listeners
pancakeType.addEventListener('change', calcPrice);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', calcPrice);
});

radios.forEach((radio) => {
  radio.addEventListener('change', calcPrice);
});

seeOrderBtn.addEventListener('click', testDisplay);

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', makePriceShake);
});

radios.forEach((radio) => {
  radio.addEventListener('change', makePriceShake);
});

pancakeType.addEventListener('change', makePriceShake);