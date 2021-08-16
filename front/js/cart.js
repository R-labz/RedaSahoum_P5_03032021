//Déclaration de la variable permettant d'accéder à mon local storage que l'on parse pour que les données puissent s'afficher en JSON
let productsPurchased = JSON.parse(localStorage.getItem("teddy"));
    console.log(productsPurchased);

    //------------------------AFFICHAGE DES PRODUITS DU PANIER-----------------//

    //Classe dans laquelle je vais injecter mon code
    const listePanier = document.querySelector('#order-array')

    //si le panier est vide: afficher le panier est vide
    if(productsPurchased === null || productsPurchased == 0) {
    const panierVide = `
    <div class="container-panier-vide">
    <div> Le panier est vide </div>
    </div>
    `;
listePanier.innerHTML = panierVide;
} else {
    //si le panier n'est pas vide, afficher les produits du LS
    console.log("Le panier n'est pas vide")
    let cartProductsStructure = [];

    for(k = 0; k < productsPurchased.length; k++){
        cartProductsStructure = cartProductsStructure + `
        <div class="container-recap">
        <div> Quantité 1 - ${productsPurchased[k].firstname} ${productsPurchased[k].price}.00€- <button class="delete-btn"> supprimer </button> </div>
        </div>
        `;
        
    }
        if(k == productsPurchased.length){
        //injection de l'html dans la page panier
        listePanier.innerHTML = cartProductsStructure;
    }
}

    //------------------GESTION DU BOUTON SUPPRIMER------------//

    //Références des boutons supprimer
    let deleteBtn = document.querySelectorAll(".delete-btn");
    console.log(deleteBtn);

    for(let l = 0; l < deleteBtn.length; l++){
        deleteBtn[l].addEventListener("click" , (event) => {
            event.preventDefault();

            //sélection de l'id du produit qui va être supprimé en cliquant
            let idDeleteBtn = productsPurchased[l]._id;
            console.log(idDeleteBtn)

            //avec la méthode filter, je sélectionne les elts à garder et supp l'elt pour lequel le btn supp a été cliqué
            productsPurchased = productsPurchased.filter( el => el._id !== idDeleteBtn);

                //Envoyer la variable dans le LS
                localStorage.setItem("teddy", JSON.stringify(productsPurchased));

            //alerte pour avertir de la suppression de l'objet
            alert("Ce produit a été supprimé");
            window.location.href = "cart.html";
        });
    }
    //sélection de l'id supprimé au click du bouton supprimer


    //*****************BOUTON VIDER LE PANIER*******************/

    const deleteAllBtnHTML =`
    <button class="delete-all-btn"> Vider le panier </button>
    `;

    listePanier.insertAdjacentHTML("beforeend", deleteAllBtnHTML)

    const deleteAllBtn = document.querySelector(".delete-all-btn");

    //Suppression de la key "produit" du LS pour vider entièrement le panier
    deleteAllBtn.addEventListener('click', (e) =>{
        e.preventDefault();
 
        //.removeItem pour vider le LS
        localStorage.removeItem("teddy");
        alert("Le panier a été vidé");
        window.location.href = `${window.location.origin}/front/cart.html`;
    })


    //******************** MONTANT TOTAL DU PANIER************************ */

    let totalAmount = [];

    //chercher les prix dans le panier
    for (let m = 0; m < productsPurchased.length; m++){
        let ProductsInCartPrice = productsPurchased[m].price

        //Mettre les prix du panier dans la variable totalAmount
        totalAmount.push( ProductsInCartPrice)

        console.log(totalAmount)
    }

    //Additionner les prix qu'il y a dans le tableau de la variable totalAmount avec la méthode .reduce

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = totalAmount.reduce(reducer,0);
    console.log(total);

    //Le code HTML du prix total à afficher
    const displayTotalAmount =`
    <div class="total-amount-display> Le prix total est de : ${total} € </div>
    `
    console.log(displayTotalAmount)
    //injection html panier
    listePanier.insertAdjacentHTML("beforeend", displayTotalAmount);

    /*------------------------GESTION DU FORMULAIRE----------------------------*/

    //Sélection du bouton envoyer le formulaire
    const sendForm = document.querySelector("#order-button")

    //addEventListener

    sendForm.addEventListener("click", (e) => {
e.preventDefault();

        //Récupération des données du formulaire 
        const formData = {
            name: document.querySelector("#name").value,
            surname: document.getElementById("surname").value,
            email: document.querySelector("#email").value,
            birthdate: document.getElementById("birthdate").value,
            adress: document.getElementById("adress").value,
            city: document.getElementById("city").value,
            zipcode: document.getElementById("zipcode").value
        }
        console.log("formData")
        console.log(formData)
        
        /*localStorage.setItem("name", document.querySelector("#name").value);
        localStorage.setItem("surname", document.getElementById("surname").value);
        localStorage.setItem("email", document.querySelector("#email").value);
        localStorage.setItem("birthdate", document.getElementById("birthdate").value);
        localStorage.setItem("adress", document.getElementById("adress").value);
        localStorage.setItem("city", document.getElementById("city").value);
        localStorage.setItem("zipcode", document.getElementById("zipcode").value);*/
        //Mettre l'objet formData dans le LS
        localStorage.setItem("formData", JSON.stringify(formData))

 
    //Mettre les values du formulaire et les produits sélectionnés dans un objet à envoyer vers le serveur
    const toSend = {
        productsPurchased, 
        formData
    }
    console.log("toSend")
    console.log(toSend)
    //Envoi de l'objet vers le serveur
    })

  

