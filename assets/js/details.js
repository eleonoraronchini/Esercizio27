const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const psw =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBjNjhhZDEyOTAwMTU4NzZiZDMiLCJpYXQiOjE3MzE2NjIwMjIsImV4cCI6MTczMjg3MTYyMn0.ZbB0Wd457IADXc8nC8857cCL5aZAoskStsL_-J1lhHw";

// Recupero ID prodotto
const queryParams = new URLSearchParams(location.search);
const id = queryParams.get("id");

// Funzione per ottenere i dati del prodotto
const getProductDetails = () => {
  fetch(`${BASE_URL}${id}`, {
    headers: { Authorization: psw },
  })
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Errore nel recupero del prodotto");
    })
    .then((product) => {
      document.getElementById("name").innerText = product.name;
      document.getElementById("description").innerText = product.description;
      document.getElementById("brandValue").innerText = product.brand;
      document.getElementById("priceValue").innerText = product.price;
      document.getElementById("imgProduct").src = product.imageUrl;
    })
    .catch((err) => console.error(err));
};

// Funzione per modificare il prodotto
const updateProduct = () => {
  const updatedProduct = {
    name: document.getElementById("nameForm").value,
    description: document.getElementById("descriptionForm").value,
    brand: document.getElementById("brandForm").value,
    imageUrl: document.getElementById("imageUrlForm").value,
    price: document.getElementById("priceForm").value,
  };

  fetch(`${BASE_URL}${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: {
      "Content-type": "application/json",
      Authorization: psw,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        alert("Prodotto aggiornato con successo!");

        // Chiudi il modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("editModal")
        );
        modal.hide();

        // Aggiorna i dati mostrati nella pagina
        document.getElementById("name").innerText = updatedProduct.name;
        document.getElementById("description").innerText =
          updatedProduct.description;
        document.getElementById("brandValue").innerText = updatedProduct.brand;
        document.getElementById("priceValue").innerText = updatedProduct.price;
        document.getElementById("imgProduct").src = updatedProduct.imageUrl;
      } else {
        throw new Error("Errore nell'aggiornamento del prodotto");
      }
    })
    .catch((err) => console.error(err));
};

// Funzione per eliminare il prodotto
const deleteProduct = () => {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(`${BASE_URL}${id}`, {
      method: "DELETE",
      headers: { Authorization: psw },
    })
      .then((resp) => {
        if (resp.ok) {
          alert("Prodotto eliminato!");
          location.assign("index.html");
        } else throw new Error("Errore nell'eliminazione del prodotto");
      })
      .catch((err) => console.error(err));
  }
};

// Assegna eventi ai pulsanti
document.getElementById("modalLauncher").addEventListener("click", () => {
  fetch(`${BASE_URL}${id}`, { headers: { Authorization: psw } })
    .then((resp) => resp.json())
    .then((product) => {
      document.getElementById("nameForm").value = product.name;
      document.getElementById("descriptionForm").value = product.description;
      document.getElementById("brandForm").value = product.brand;
      document.getElementById("imageUrlForm").value = product.imageUrl;
      document.getElementById("priceForm").value = product.price;
    });
});

document
  .getElementById("saveChangesButton")
  .addEventListener("click", updateProduct);
document
  .getElementById("deleteButton")
  .addEventListener("click", deleteProduct);

// Carica i dettagli al caricamento della pagina
document.addEventListener("DOMContentLoaded", getProductDetails);
