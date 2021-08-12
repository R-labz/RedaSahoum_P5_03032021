let productsPurchased = JSON.parse(localStorage.getItem("teddy"));
console.log(productsPurchased);

productsPurchased.forEach((productPurchased) => {
    console.log(productPurchased);
    document.getElementById("my-order-1__name").textContent = productPurchased.firstname
    document.getElementById("my-order-1__price").textContent = productPurchased.price
})
