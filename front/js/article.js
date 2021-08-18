
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

    document.getElementById("name").textContent = productData.name
    document.getElementById("description").textContent = productData.description
    document.getElementById("price").textContent = productData.price/100 + "€"
    document.getElementById("image").src = productData.imageUrl;
    console.log(productData)

    /************CHOIX QUANTITE PRODUITS********** */
    const quantityStructure = `
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    `;

    const positionElementQuantite = document.querySelector("#quantite_produit");
    positionElementQuantite.innerHTML = quantityStructure;
    const choixQuantite = positionElementQuantite.value;
    console.log("choixQuantite");
    console.log(choixQuantite);

    /********************************************** */

    document.getElementById('purchase-btn').onclick = (event) => {
        event.preventDefault()

        class Teddies {
            constructor(_id, firstname, price, quantity){
            this._id = _id    
            this.firstname = firstname
            this.price = price
            this.quantity = quantity
            }
        }

        let teddy = new Teddies(productData._id, productData.name, (productData.price * choixQuantite)/100, choixQuantite)
        let arrayProductsAlreadyInCart = [];

        // On récupère le contenu du local storage s'il y en a un, on l'insère dans le tableau arrayProductsAlreadyInCart, et on le renvoie vers le localStorage avec le nouveau produit ajouté.
            if(localStorage.getItem("teddy") !==null) {
            arrayProductsAlreadyInCart = JSON.parse(localStorage.getItem("teddy"));
     
            // Si le LS est vide, on le crée avec le produit ajouté
        }
        arrayProductsAlreadyInCart.push(teddy);
        localStorage.setItem("teddy", JSON.stringify(arrayProductsAlreadyInCart));
        redirectToShoppingCart();
        alert("Votre article a bien été ajouté au panier.")
      }
}

test()

  function redirectToShoppingCart() {
    window.location.href = `${window.location.origin}/front/cart.html`
  };

