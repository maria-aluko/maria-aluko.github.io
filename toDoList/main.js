const listContainer = document.getElementById('list-container');
const inputBox = document.getElementById('input-box');
const addButton = document.getElementById('addButton');

function addTask() {
  if (inputBox.value === '') {
    alert('You have to write something!');
  } else {
    let newList = document.createElement('li');
    newList.textContent = inputBox.value;
    listContainer.appendChild(newList);
    let span = document.createElement('span');
    span.textContent = '\u00d7';
    newList.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}

function clickFunction(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }
} false;


addButton.addEventListener('click', addTask);

listContainer.addEventListener('click', clickFunction);

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem('data');
}

showTasks();