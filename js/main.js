function updateBalance() {
  // URL API
  const apiUrl = "http://79.174.83.69:8080/api/money";

  // Символ рубля
  const rubleSymbol = "₽";

  // Элементы для отображения баланса и депозита
  const balanceDiv = document.getElementById("balance_balance");
  const depositDiv = document.getElementById("balance_deposit");

  // Прозвон API через fetch
  fetch(apiUrl, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Обновление содержимого div'ов
      balanceDiv.textContent = `${data.balance} ${rubleSymbol}`;
      depositDiv.textContent = `${data.deposit} ${rubleSymbol}`;
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
}

updateBalance();

// Положить на баланс
document.getElementById("deposit").addEventListener("click", () => {
  const inputElement = document.getElementById("deposit_balance_input");
  const value = parseInt(inputElement.value, 10);

  if (isNaN(value)) {
    console.error("Некорректное значение в поле ввода.");
  } else {
    console.log(value);

    // Прозвон бэкенда
    const apiUrl = `http://79.174.83.69:8080/api/money/funds/add?money=${value}`;

    fetch(apiUrl, { method: "PATCH" }).then(
      setTimeout(() => {
        updateBalance();
      }, 100)
    );
  }
});

// Снять деньги с баланса
document.getElementById("withdraw").addEventListener("click", () => {
  const inputElement = document.getElementById("take_balance_input");
  const value = parseInt(inputElement.value, 10);

  if (isNaN(value)) {
    console.error("Некорректное значение в поле ввода.");
  } else {
    console.log(value);
    const apiUrl = `http://79.174.83.69:8080/api/money/funds/withdraw?money=${value}`;

    fetch(apiUrl, { method: "PATCH" }).then(
      setTimeout(() => {
        updateBalance();
      }, 100)
    );
  }
});

// Положить деньги на счет
document.getElementById("deposit_vklad").addEventListener("click", () => {
  const inputElement = document.getElementById("deposit_deposit_input");
  const value = parseInt(inputElement.value, 10);

  if (isNaN(value)) {
    console.error("Некорректное значение в поле ввода.");
  } else {
    console.log(value);
    const apiUrl = `http://79.174.83.69:8080/api/money/deposits/add?money=${value}`;

    fetch(apiUrl, { method: "PATCH" }).then(
      setTimeout(() => {
        updateBalance();
      }, 100)
    );
  }
});

// Снять деньги со счёта

document.getElementById("withdraw_vklad").addEventListener("click", () => {
  const inputElement = document.getElementById("take_deposit_input");
  const value = parseInt(inputElement.value, 10);

  if (isNaN(value)) {
    console.error("Некорректное значение в поле ввода.");
  } else {
    console.log(value);
    const apiUrl = `http://79.174.83.69:8080/api/money/deposits/withdraw?money=${value}`;

    fetch(apiUrl, { method: "PATCH" }).then(
      setTimeout(() => {
        updateBalance();
      }, 100)
    );
  }
});
