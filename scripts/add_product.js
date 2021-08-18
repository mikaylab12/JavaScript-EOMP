const myStorage = window.localStorage
const idStorage = window.localStorage

let cart = []

if (JSON.parse(myStorage.getItem('cart')).length > 0){
    cart = JSON.parse(myStorage.getItem('cart'))
}

// function to open and close add modal 
let modalBtn = document.querySelector(".create-product")
let modal = document.querySelector(".modal")
let modalClose = document.querySelector(".close-modal")

modalBtn.addEventListener('click', function(){
    modal.classList.add("modal-active")
    document.querySelectorAll('.product').forEach(product => product.style.zIndex = -1)
})

modalClose.addEventListener('click', function(){
    modal.classList.remove("modal-active")
    document.querySelectorAll('.product').forEach(product => product.style.zIndex = 0)
})


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
                                        <button class="btn-cart1" onclick="addToCart(${product[0]})">ADD TO CART</button>
                                        </div>
                                        
                                        </div>`
})
})


// function to add to cart
function addToCart(id){
    let object = {}
    console.log(id)
    fetch(`https://flask-project-eomp.herokuapp.com/view-product/${id}`, {
        headers: {
            // 'Authorization': `jwt ${mystorage.getItem('jwt-token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        object['id'] = data['data'][0];
        object['image'] = data['data'][5];
        object['name'] = data['data'][1];
        object['price'] = data['data'][2]
        // object['quantity'] = parseInt(quantity);
        // object['totalprice'] =  parseInt(data['data'][0][2]);
        console.log(object);
        for (let item in cart){
            console.log(item)
            if (object['name'] == cart[item]['name']){
                cart[item]['quantity'] += object['quantity'];
                cart[item]['totalprice'] += object['totalprice'];
                console.log(cart)
                myStorage.setItem('cart', JSON.stringify(cart))
                idStorage.setItem('id', data['data'][0])
                alert('Cart item updated')
                return
            };
        }    
        cart = cart.concat(object)
        console.log(cart)
        myStorage.setItem('cart', JSON.stringify(cart))
        alert('Item added to cart successfully')
    })
}


// add product to list of products available 
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

// function to increase quantity
function quantityChange(){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    } 
    cartTotal()
}


// function to remove item 
function removeItem(){
let removeCart = document.getElementsByClassName('btn-danger')
for(let i = 0; i < removeCart.length; i++){
    let button = removeCart[i]
    button.addEventListener('click', function(event){
        let btnClicked = event.target
        btnClicked.parentElement.parentElement.remove()
        cartTotal()
    })
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChange)
    }
}
}

// function to calculate total amount 
function cartTotal(){
let cartContainer = document.getElementsByClassName('cart-items')[0]
let cartRow = cartContainer.getElementsByClassName('cart-row')
let total = 0
for(let i = 0; i < cartRow.length; i++){
    let row = cartRow[i]
    let priceItem = row.getElementsByClassName('cart-price')[0]
    let quantityItem = row.getElementsByClassName('cart-quantity-input')[0]
    let price = parseFloat(priceItem.innerText.replace('R', ''))
    let quantity = quantityItem.value
    total = Math.round(total + (price * quantity))
}
total = Math.round(total * 100) / 100
document.getElementsByClassName('cart-total-price')[0].innerHTML = 'R' + total

}