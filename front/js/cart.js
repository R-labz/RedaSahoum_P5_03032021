//Déclaration de la variable permettant d'accéder à mon local storage que l'on parse pour que les données puissent s'afficher en JSON
let productsPurchased = JSON.parse(localStorage.getItem("teddy"));

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

    for(let l = 0; l < deleteBtn.length; l++){
        deleteBtn[l].addEventListener("click" , (event) => {
            event.preventDefault();

            //sélection de l'id du produit qui va être supprimé en cliquant
            let idDeleteBtn = productsPurchased[l]._id;

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


    //********** MONTANT TOTAL DU PANIER************** */

    let totalAmount = [];

    //chercher les prix dans le panier
    for (let m = 0; m < productsPurchased.length; m++){
        let ProductsInCartPrice = productsPurchased[m].price

        //Mettre les prix du panier dans la variable totalAmount
        totalAmount.push( ProductsInCartPrice)
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

//Création/ définition d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
class formData {
        constructor(firstName, lastName, email, address, city) {
            this.lastName = document.querySelector("#name").value;
            this.firstName = document.getElementById("surname").value;
            this.email = document.querySelector("#email").value;
            this.address = document.getElementById("adress").value;
            this.city = document.getElementById("city").value;
        }
    }

    //Appel de l'instance de classe formData pour créer l'objet formData
    const formValues = new formData();
    console.log("formValues");
    console.log(formValues);

    //*******************GESTION DE VALIDATION DU FORM********** */
    const textAlert = (value) => {
        return `${value}: Donnée saisie incorrecte`
    }
    const regExpLastFirstCity = (value) => {
        return /^[A-Za-z]{3,20}$/.test(value);
    }

    function firstNameControl() {
        //Contrôle de la validité du prénom
        const firstName = formValues.firstName;
        if (regExpLastFirstCity(firstName)){
            return true;
        } else {
            alert(textAlert("Prénom"));
            return false;
        }
    }
    function lastNameControl() {
        //Contrôle de la validité du prénom
        const lastName = formValues.lastName;
        if (regExpLastFirstCity(lastName)){
            return true;
        } else {
            alert("Chiffres et symboles ne sont pas autorisés \n Ecrire plus de 3 caractères.");
            return false;
        }
    }

    if (firstNameControl() && lastNameControl()) {
    //Mettre l'objet formData dans le LS
        localStorage.setItem("formData", JSON.stringify(formValues))
 } else {
    alert("Veuillez bien remplir le formulaire");
  }
    /********************FIN DE GESTION DE VALIDATION********* */
 

    //Mettre les values du formulaire et les produits sélectionnés dans un objet à envoyer vers le serveur
    const toSend = {
        productsPurchased, 
        formData
    } 
});