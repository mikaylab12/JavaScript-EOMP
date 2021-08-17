let carts = document.querySelector(".add-cart");

for(let i=0; i< carts.length; i++){
    carts[i].addEventListener('click', () => {
        console.log("Added to cart");
        cartNumbers();
    })
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    console.log(productNumbers)
    productNumbers = parseInt(productNumbers)
    localStorage.setItem('cartNumbers', 1);
}


fetch(`https://flask-project-eomp.herokuapp.com/show-products/${id}`, {
        method: 'GET',
        // body: JSON.stringify({
        //     // "product_id": document.getElementById("id").value,
        //     "product_name": document.getElementById("product-name").value,
        //     "product_price": document.getElementById("price").value,
        //     "product_quantity": document.getElementById("quantity").value,
        //     "product_description": document.getElementById("description").value,
        //     "product_image": document.getElementById("picture").value,
        //     "total": document.getElementById("total").value,
        // }),
        headers: {
            'Content-Type' : 'application/json',
            // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        console.log(res["access_token"]);
        myStorage.setItem("jwt-token", res["access_token"]);
        console.log('product added successfully')})


// function to show products in cart 
function addProduct(){
    fetch(`https://flask-project-eomp.herokuapp.com/show-products/${id}`), {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            // 'Content-Type' : 'application/json',
            // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
        },
    }
    .then(res => res.json())
    .then(res => {
        console.log(res);
        console.log(res["access_token"]);
        myStorage.setItem("jwt-token", res["access_token"]);
        console.log('product added successfully')})
}
let productContainer = document.querySelector('#product-container')
    productContainer.innerHTML = "";
    data['data'].forEach(product => {
        productContainer.innerHTML += `<div class = 'product'>
                                        <img src="${product[5]}" class="product_image">
                                        <h2 class="product_title">${product[1]}</h2>
                                        <p class="product_price">R ${product[2]}<p> 
                                        
                                        <div class="cart">
                                        <button class="btn-cart">Add to cart</button>
                                        <button class="btn-cart">Remove</button>
                                        </div>
                                        
                                        </div>`
    })

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

// function to calculate total amount : Tashwill
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