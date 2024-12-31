// Select elements
const balanceAmount = document.getElementById("balance-amount");
const totalIncome = document.getElementById("total-income");
const totalExpenses = document.getElementById("total-expenses");
const expenseList = document.getElementById("expense-list");
const entryForm = document.getElementById("entry-form");

// Initialize data
let data = JSON.parse(localStorage.getItem("expenseTracker")) || [];

// Update UI with data
function updateUI() {
  let income = 0;
  let expenses = 0;

  // Clear the expense list
  expenseList.innerHTML = "";

  // Iterate through data to calculate totals and populate rows
  data.forEach((entry, index) => {
    if (entry.type === "income") {
      income += entry.amount;
    } else if (entry.type === "expense") {
      expenses += entry.amount;
    }

    // Create a table row for the entry
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.amount}</td>
      <td>${entry.type}</td>
      <td><button onclick="deleteEntry(${index})">Delete</button></td>
    `;
    expenseList.appendChild(row);
  });

  // Update totals and balance
  totalIncome.textContent = income;
  totalExpenses.textContent = expenses;
  balanceAmount.textContent = income - expenses;
}

// Add new entry
entryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("entry-type").value;
  const name = document.getElementById("entry-name").value.trim();
  const amount = parseFloat(document.getElementById("entry-amount").value);

  // Validate input
  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please provide valid name and amount.");
    return;
  }

  // Add entry to data
  data.push({ type, name, amount });
  localStorage.setItem("expenseTracker", JSON.stringify(data));

  // Reset form and update UI
  entryForm.reset();
  updateUI();
});

// Delete entry
function deleteEntry(index) {
  data.splice(index, 1);
  localStorage.setItem("expenseTracker", JSON.stringify(data));
  updateUI();
}

// Initial UI update
updateUI();
