/*;(async () => {
    const productId = getProductId()
    const productData = await getProductData(productId)
    displayData(productData)
})*/

async function test() {
    console.log("test")
    const productId = getProductId()
    const productData = await getProductData(productId)
    displayData(productData)
    }

function getProductId(){
    return new URL(window.location.href).searchParams.get("id")
} 

function getProductData(productId) {
    return fetch("http://localhost:3000/api/teddies/" + productId)
    .then((res) => res.json())
    .then((productData) => productData)
} 

function displayData(productData) {
    console.log(productData)
    document.getElementById("name").textContent = productData.name
    document.getElementById("description").textContent = productData.description
    document.getElementById("price").textContent = productData.price/100 + "€"
    document.getElementById("image").src = productData.imageUrl
}

test()