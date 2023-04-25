const socket = io();

socket.on("updateProducts", (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <img src="${product.thumbnail}" alt="${product.title}">
          <p>${product.price}</p>
        `;
    productContainer.appendChild(productDiv);
  });
});

console.log("conectado");
