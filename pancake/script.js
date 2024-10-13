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
const homeDelivery = document.getElementById('delivery');
const eatIn = document.getElementById('eatIn');
const pickUp = document.getElementById('pickUp');
const address = document.getElementById('address');
const postcode = document.getElementById('postcode');
const city = document.getElementById('city');
const confirmButton = document.getElementById('confirmButton');

// Calculate total price
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
    displayPrice.textContent = `$${totalPrice.toFixed(2)}`;
  });
}

// Display order
function testDisplay() {
  const customer = document.getElementById('customerName').value || 'Guest';
  const toppings = document.querySelectorAll('.customization-section1 input[type="checkbox"]');
  const extras = document.querySelectorAll('.customization-section2 input[type="checkbox"]');
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
      this.selectedDelivery = selectedDelivery;
      this.totalPrice = totalPrice;
    }
  }

  const newOrder = new Order(typeSelected, selectedToppings, selectedExtras, customer, selectedDelivery, totalPrice[0].textContent);
  orders.push(newOrder);

  let orderNumber = orders.indexOf(newOrder) + 1;
  let customerAddress = '';

  if (selectedDelivery === 'Home Delivery') {
    customerAddress = `to ${address.value}, ${postcode.value}, ${city.value}`;
  } else {
    customerAddress = '';
  }

  displayDiv.style.display = 'block';
  displayDiv.innerHTML = `
    <p><strong>Order no:</strong> ${orderNumber}</p>
    <p><strong>Name:</strong> ${customer}</p>
    <p><strong>Selected pancake:</strong> ${typeSelected}</p>
    <p><strong>Chosen toppings:</strong> ${selectedToppings.join(', ')}${toppingsText}</p>
    <p><strong>Chosen extras:</strong> ${selectedExtras.join(', ')}${extrasText}</p>
    <p><strong>Delivery method:</strong> ${selectedDelivery} ${customerAddress}</p>
    <p id="totalOrder"><strong>Total Price: ${totalPrice[0].textContent}</strong> </p>
    `;
}

// Animation for price change
function makePriceShake() {
  shakeMe.classList.add('shake');
  setTimeout(() => {
    shakeMe.classList.remove('shake');
  }, 300);
}

// Change checkbox style to "selected" when checked
const labels = document.querySelectorAll('.option');
checkboxes.forEach((checkbox, i) => {
  checkbox.addEventListener('click', function () {
    if (checkbox.checked) {
      labels[i].className = 'optionChecked';
    } else {
      labels[i].className = 'option';
    }
  });
});

// Change radio button style, keep one chosen by default
const radioLabels = document.querySelectorAll('.radioOption');

function updateRadioClasses() {
  radios.forEach((radio, i) => {
    if (radio.checked) {
      radioLabels[i].className = 'radioChecked';
    } else {
      radioLabels[i].className = 'radioOption';
    }
  });
}
updateRadioClasses();


// Make address field visible for home delivery
const customerDiv = document.querySelector('.customerAddress');
function getAddress() {
  customerDiv.classList.remove('hidden');
}

function hideAddress() {
  customerDiv.classList.add('hidden');
}

function showConfirm() {
  confirmButton.classList.remove('confirmHidden');
}

function confirmOrder() {
  if (homeDelivery.checked) {
    if (!city.value) {
      alert('Please enter city name.');
      return;
    }
    if (!address.value) {
      alert('Please enter your address.');
      return;
    }
    if (!postcode.value) {
      alert('Please enter your postcode.');
      return;
    }
  }
  localStorage.setItem('orders', JSON.stringify(orders));
  alert(`Thank you for your order!`);
  location.reload();
}

function loadFromLocalStorage() {
  const storedOrders = localStorage.getItem('orders');
  if (storedOrders) {
    const parseOrders = JSON.parse(storedOrders);
    parseOrders.forEach((order) => {
      orders.push(order);
    })
    console.log(orders);
  } else {
    console.log('No orders saved in local storage');
  }
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

radios.forEach((radio, i) => {
  radio.addEventListener('click', updateRadioClasses);
});

homeDelivery.addEventListener('click', getAddress);
eatIn.addEventListener('click', hideAddress);
pickUp.addEventListener('click', hideAddress);

seeOrderBtn.addEventListener('click', showConfirm);

confirmButton.addEventListener('click', confirmOrder);

window.addEventListener('load', loadFromLocalStorage);