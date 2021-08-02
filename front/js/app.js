

let products = [];

const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/teddies")
        .then((res) => res.json())
        .then((data) => products = data);

        console.log(products);
    };

    const productDisplay = async () => {
        await fetchProducts();

        document.getElementById("main").innerHTML = products.map((product) => 
        `
        <div class="card">
           
            <img src=${product.imageUrl} alt="photo de ${product.name}"
            <h3>${product.name}</h3>
            <p>${product.colors}</p>
            <p>${product.description}</p>
            <p>${product.price}</p>

            <a href="article.html?id=${product._id}">Voir plus</a>
        </div>
        `)
    }
    
    productDisplay();



    