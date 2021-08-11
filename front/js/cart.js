let productPurchased = JSON.parse(localStorage.getItem("teddy"));
console.log(productPurchased);

function displayProduct(productPurchased) {
    document.getElementById("my-order-1__name").textContent = productPurchased.name
    document.getElementById("my-order-1__price").textContent = productPurchased.price
    document.getElementById("my-order-1__img").src = productPurchased.imageUrl
}