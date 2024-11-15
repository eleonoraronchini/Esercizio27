// dati API
const endpointURL = "https://striveschool-api.herokuapp.com/api/product/";
const psw =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBjNjhhZDEyOTAwMTU4NzZiZDMiLCJpYXQiOjE3MzE2NzcxMzMsImV4cCI6MTczMjg4NjczM30.WxW7X3ETsZWE6mo-KrV8IK2zST5I9wMTPPLhnbT1DGs";

// Clear row
const clearProductRow = function () {
  const productsRow = document.getElementById("productsRow");
  productsRow.innerHTML = "";
};

// Generate Cards
const generateCards = function (array) {
  clearProductRow();
  const row = document.getElementById("productsRow");
  array.forEach((product) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `
      <div class="card d-flex flex-column customShadow">
        <img src="${product.imageUrl}" class="card-img-top" alt="${
      product.name
    }'s picture">
        <div class="card-body d-flex flex-column justify-content-around bg-dark text-secondary">
          <h5 class="card-title mb-0">${product.name}</h5>
          <p class="card-text mb-0">${product.description}</p>
          <p class="card-text mb-0">${product.brand}</p>
          <p class="card-text mb-0">${parseFloat(product.price).toFixed(2)}€</p>
          <div class="d-flex justify-content-between">
            <a href="details.html?id=${
              product._id
            }" class="btn btn-info">More info</a>
          </div>
        </div>
      </div>`;
    row.appendChild(col);
  });
};

// Show Spinner
const showSpinner = function () {
  const spinnerHTML = `
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
  document.getElementById("productsRow").innerHTML = spinnerHTML;
};

// Fetch data from API
const getCards = function () {
  fetch(endpointURL, {
    headers: {
      "Content-type": "application/json",
      Authorization: psw,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella creazione del prodotto");
      }
    })
    .then((array) => {
      generateCards(array);
    })
    .catch((error) => {
      console.log("Errore:", error);
      alert("Errore:", error);
    });
};

// Onload
document.addEventListener("DOMContentLoaded", () => {
  showSpinner();
  getCards();
});
