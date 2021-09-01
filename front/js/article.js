
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

    /**************CHOIX COULEUR PRODUIT*********** */

    const productColor = productData.colors;
    
    const productColorSelector = document.getElementById("product-color");

    for(i = 0; i < productColor.length; i++){
        console.log(productColor[i])
        productColorSelector.innerHTML = `
        <option value="[i]">${productColor[i]}</option>
        <option value="[i]">${productColor[i]}</option>

        `
    } 

    /************CHOIX QUANTITE PRODUITS********** */
  

    const positionElementQuantite = document.querySelector("#quantite_produit");
    const choixQuantite = positionElementQuantite.value;
    console.log(choixQuantite)
    
     /*****ADD EVENT LISTENER DE LA QUANTITE******************** */

    positionElementQuantite.addEventListener('change', (event) => {
        alert(`you chose ${event.target.value} teddies`);
        const quantityInLs = event.target.value;
        localStorage.setItem("quantity", JSON.stringify(quantityInLs));
    })


    /********************************************** */

    document.getElementById('purchase-btn').onclick = (event) => {
        event.preventDefault()

        const quantityInLs = JSON.parse(localStorage.getItem("quantity"));

        class Teddies {
            constructor(_id, firstname, price, quantity){
            this._id = _id    
            this.firstname = firstname
            this.price = price
            this.quantity = quantity
            }
        }

        let teddy = new Teddies(productData._id, productData.name, (productData.price * quantityInLs)/100, quantityInLs)
        let arrayProductsAlreadyInCart = [];

        localStorage.removeItem("quantity")

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

