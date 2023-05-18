const socket = io();

socket.on("updateProducts", (products) => {
  console.log(products);
  const productContainer = document.getElementById("product-container");
  let content = "";
  // productContainer.innerHTML = "";

  // products.forEach((product) => {
  //   const productDiv = document.createElement("div");
  //   productDiv.innerHTML = `
  //         <div class="cardContainer">
  //           <h2>${product.title}</h2>
  //           <p class="category">${product.category}</p>
  //           <div class="imgConteiner" >
  //           <img  src="${product.thumbnail}" alt="${product.title}">
  //           </div>
  //           <p class="description">${product.description}</p>
  //           <p class="price">$ ${product.price}</p>
  //         </div>

  //       `;
  //   productContainer.appendChild(productDiv);
  // });
  products.forEach((product) => {
    content += `
          <div>
           <div class="cardContainer">
             <h2>${product.title}</h2>
             <p class="category">${product.category}</p>
             <div class="imgConteiner" >
             <img  src="${product.thumbnail}" alt="${product.title}">
             </div>
             <p class="description">${product.description}</p>
             <p class="price">$ ${product.price}</p>
           </div>
           </div>
      
         `;
    productContainer.innerHTML = content;
  });
});

console.log("conectado");
