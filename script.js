const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = getFromLocalStorage();

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value === '' || amount.value === '') {
    alert('Please enter all fields');
  } else {
    const transaction = {
      text: text.value,
      amount: +amount.value,
      id: Math.floor(Math.random() * 100000000),
    };

    list.innerHTML = '';

    transactions.push(transaction);
    updateDOM();
    updateValues();
    addToLocalStorage(transaction);

    text.value = '';
    amount.value = '';
  }
}

// get transaction from localStorage
function getFromLocalStorage() {
  let items;

  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  return items;
}

// add transaction to localStorage
function addToLocalStorage(item) {
  let items = getFromLocalStorage();
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

// remove from local storage
function removeFromLocalStorage(id) {
  let items = getFromLocalStorage();

  items.forEach((item, index) => {
    if (item.id === id) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}

// Update DOM
function updateDOM() {
  transactions.forEach((transaction) => {
    const li = document.createElement('li');
    const sign = transaction.amount < 0 ? '-' : '+';
    li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    li.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
        `;

    list.appendChild(li);
  });
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  removeFromLocalStorage(id);
  init();
}

// Update Values
function updateValues() {
  const total = transactions
    .reduce((total, item) => total + item.amount, 0)
    .toFixed(2);

  const income = transactions
    .filter((item) => item.amount > 0)
    .reduce((total, item) => total + item.amount, 0)
    .toFixed(2);

  const expense = transactions
    .filter((item) => item.amount < 0)
    .reduce((total, item) => total + item.amount, 0)
    .toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Add Eventlistener
form.addEventListener('submit', addTransaction);

function init() {
  list.innerHTML = '';

  updateDOM();
  updateValues();
}

init();


