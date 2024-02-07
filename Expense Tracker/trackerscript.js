// Function to add expense
function addExpense() {
  var expenseInput = document.getElementById("expenseInput");
  var expenseText = expenseInput.value.trim();
  if (expenseText !== "") {
      var expenseList = document.getElementById("expenseList");
      var li = document.createElement("li");
      li.textContent = expenseText;
      li.innerHTML += ' <button onclick="editExpense(this)">Edit</button>';
      li.innerHTML += ' <button onclick="deleteExpense(this)">Delete</button>';
      expenseList.appendChild(li);
      saveExpenses();
      expenseInput.value = "";
  } else {
      alert("Please enter an expense.");
  }
}

// Function to edit expense
function editExpense(button) {
  var li = button.parentElement;
  var currentExpense = li.firstChild.textContent.trim();
  var newText = prompt("Enter new expense", currentExpense);
  if (newText !== null) {
      li.firstChild.textContent = newText;
      saveExpenses();
  }
}


// Function to delete expense
function deleteExpense(button) {
  if (confirm("Are you sure you want to delete this expense?")) {
      button.parentElement.remove();
      saveExpenses();
  }
}

// Function to save expenses to local storage
function saveExpenses() {
  var expenses = [];
  var expenseList = document.getElementById("expenseList").getElementsByTagName("li");
  for (var i = 0; i < expenseList.length; i++) {
      expenses.push(expenseList[i].textContent.trim());
  }
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to load expenses from local storage
function loadExpenses() {
  var expenses = JSON.parse(localStorage.getItem("expenses"));
  if (expenses) {
      var expenseList = document.getElementById("expenseList");
      expenses.forEach(function(expense) {
          var li = document.createElement("li");
          li.textContent = expense;
          li.innerHTML += ' <button onclick="editExpense(this)">Edit</button>';
          li.innerHTML += ' <button onclick="deleteExpense(this)">Delete</button>';
          expenseList.appendChild(li);
      });
  }
}

// Load expenses when the page loads
window.onload = loadExpenses;
