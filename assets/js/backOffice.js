const endpointURL = "https://striveschool-api.herokuapp.com/api/product/";
const psw =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBjNjhhZDEyOTAwMTU4NzZiZDMiLCJpYXQiOjE3MzE2NzcxMzMsImV4cCI6MTczMjg4NjczM30.WxW7X3ETsZWE6mo-KrV8IK2zST5I9wMTPPLhnbT1DGs";

// Classe per dati prodotto
class ProductData {
  constructor(name, description, brand, imageUrl, price) {
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.imageUrl = imageUrl;
    this.price = price;
  }
}

// Submit form
const submitEvent = function (e) {
  e.preventDefault();

  // Recupera i valori del form
  const productName = document.getElementById("productName").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productBrand = document.getElementById("productBrand").value;
  const productImageURL = document.getElementById("productImageUrl").value;
  const productPrice = parseFloat(
    document.getElementById("productPrice").value
  );

  // Crea un oggetto prodotto
  const productDataForm = new ProductData(
    productName,
    productDescription,
    productBrand,
    productImageURL,
    productPrice
  );

  // Invia i dati tramite una chiamata POST
  fetch(endpointURL, {
    method: "POST",
    body: JSON.stringify(productDataForm),
    headers: {
      "Content-type": "application/json",
      Authorization: psw,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        alert("Prodotto inserito con successo!");
        location.assign("index.html"); // Reindirizza alla pagina principale
      } else {
        throw new Error("Errore nella creazione del prodotto");
      }
    })
    .catch((error) => {
      console.error("Errore:", error);
      alert("Errore:", error);
    });
};

document.querySelector("form").addEventListener("submit", submitEvent);
