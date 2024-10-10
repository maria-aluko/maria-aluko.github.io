
const gridContainer = document.querySelector('.gridContainer');

// fetch data
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    displayCards(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// loop through data, create a div per user and display data inside the div, append to the main div

function displayCards(users) {
  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('card');

    const avatar = `https://robohash.org/${user.id}?set=set4`;
    card.innerHTML = `
    <img src='${avatar}'>
    <p id="userName"><strong>${user.name}</strong></p>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    `;
    gridContainer.appendChild(card);
  });
}

fetchData();