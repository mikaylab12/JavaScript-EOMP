const myStorage = window.localStorage

// function to open and close add modal 
let modalBtn = document.querySelector(".create-product")
let modal = document.querySelector(".modal")
let modalClose = document.querySelector(".close-modal")

modalBtn.addEventListener('click', function(){
    modal.classList.add("modal-active")
})

modalClose.addEventListener('click', function(){
    modal.classList.remove("modal-active")
})

// function to add to cart 
function addToCart(){

    let carts = document.querySelector(".btn-cart");
    
// for(let i=0; i< carts.length; i++){
//     carts[i].addEventListener('click', () => {
//         console.log("Added to cart");
//         cartNumbers();
//     })
// }

// function cartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');
//     console.log(productNumbers)
//     productNumbers = parseInt(productNumbers)
//     localStorage.setItem('cartNumbers', 1);
// }

}


// function to show products 
fetch('https://flask-project-eomp.herokuapp.com/show-products')
.then(res => res.json())
.then(data =>{
    console.log(data)


let productContainer = document.querySelector('#product-container')
productContainer.innerHTML = "";
data['data'].forEach(product => {
productContainer.innerHTML += `<div class = 'product'>
                                 <h1 class="product_id">${product[0]}.</h1>
                                 <img src="${product[5]}" class="product_image">
                                 <h4 class="product_title">${product[1]}</h4>
                                 <p class="product_price">R ${product[2]}<p> 
                                 <p class="product_description">${product[4]}<p>
                                
                                 <div class="cart">
                                 <button class="btn-cart" onClick="addToCart()">Add to cart</button>
                                 </div>
                                 
                                 </div>`
})
})

// add product
function addProduct(){
    fetch(`https://flask-project-eomp.herokuapp.com/add-product/`, {
        method: 'POST',
        body: JSON.stringify({
            // "product_id": document.getElementById("id").value,
            "product_name": document.getElementById("product-name").value,
            "product_price": document.getElementById("price").value,
            "product_quantity": document.getElementById("quantity").value,
            "product_description": document.getElementById("description").value,
            "product_image": document.getElementById("picture").value,
            "total": document.getElementById("total").value,
        }),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        console.log(res["access_token"]);
        myStorage.setItem("jwt-token", res["access_token"]);
        alert("Product added successfully.")})
}

// update products
// function updateProducts(){
//     let productID = document.querySelector("#product-id").value
//     fetch(`https://flask-project-eomp.herokuapp.com/edit-product/${productID}/`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             // "user_id": document.getElementById("user-id").value,
//             "first_name": document.getElementById("name").value,
//             "last_name": document.getElementById("surname").value,
//             "email_address": document.getElementById("email").value,
//             "username": document.getElementById("username").value,
//             "password": document.getElementById("password").value,
            
//         }),
//         headers: {
//             'Content-Type' : 'application/json',
//             // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
//         },
//     })
//     .then(res => res.json())
//     .then(res => {
//         console.log(res);
//         console.log(res["access_token"]);
//         myStorage.setItem("jwt-token", res["access_token"]);
//         alert("Product updated successfully.")})
// }