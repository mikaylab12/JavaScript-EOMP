const idStorage = window.localStorage

let itemId = idStorage.getItem('id')
// fetch(`https://flask-project-eomp.herokuapp.com/view-product/${itemId}/`)
// .then(res => res.json())
// .then(data =>{
//         console.log(data)
//         console.log(data['data'][1])
//     let cartContainer = document.querySelector('#checkout-container')
//     cartContainer.innerHTML = ""
//         //  document.getElementsByClassName('product_id').innerHTML = `${data['data'][0]}`
//         //  document.getElementsByClassName('cartProduct_title').innerHTML = `${data['data'][1]}`
//     let cart = JSON.parse(idStorage.getItem('cart'))
//     cart.forEach(product => {
//     cartContainer.innerHTML += `<div class = 'cartProduct'>
//                                 <img src="${data.data[5]}" class="cartProduct_image">
//                                 <div class="cartProduct_info"> 
//                                     <h1 class="cartProduct_id">${data.data[0]}.</h1>
//                                     <h4 class="cartProduct_title">${data.data[1]}</h4>
//                                 </div>
//                                 <p class="cartProduct_price">R ${data.data[2]}<p> 
        
//                                 </div>`
// })
// })
let cart = JSON.parse(idStorage.getItem('cart'))

function createcart() {
    console.log(cart)
    let cartContainer = document.querySelector('#checkout-container')
    cartContainer.innerHTML = ''
    cart.forEach(product => {
    cartContainer.innerHTML += `<div class = 'cartProduct'>
                                <img src="${product['image']}" class="cartProduct_image">
                                <div class="cartProduct_info"> 
                                    <h1 class="cartProduct_id">${product['id']}.</h1>
                                    <h4 class="cartProduct_title">${product['name']}</h4>
                                </div>
                                <input class="cartProduct-quantity-input" type="number" value="1">
                                <p class="cartProduct_price">R ${product['price']}<p> 
                                <div class="remove-btn"> 
                                    <button class="removeProduct" id='${product['name']}' >REMOVE</button>
                                </div>
                                </div>`;               
    });
    document.querySelectorAll('.cartProduct-quantity-input').forEach(counter => {console.log(counter); counter.addEventListener('change', quantityChange)});
    document.querySelectorAll('.removeProduct').forEach( button => button.addEventListener('click', removeItem))
    cartTotal()
}
createcart()
// let carts = document.querySelector(".add-cart");

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


// fetch(`https://flask-project-eomp.herokuapp.com/show-products/${id}`, {
//         method: 'GET',
//         // body: JSON.stringify({
//         //     // "product_id": document.getElementById("id").value,
//         //     "product_name": document.getElementById("product-name").value,
//         //     "product_price": document.getElementById("price").value,
//         //     "product_quantity": document.getElementById("quantity").value,
//         //     "product_description": document.getElementById("description").value,
//         //     "product_image": document.getElementById("picture").value,
//         //     "total": document.getElementById("total").value,
//         // }),
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
//         console.log('product added successfully')})


// function to show products in cart 
// function addProduct(){
//     fetch(`https://flask-project-eomp.herokuapp.com/show-products/${id}`), {
//         method: 'GET',
//         body: JSON.stringify(),
//         headers: {
//             'Content-Type' : 'application/json',
//             // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
//         },
//     }
//     .then(res => res.json())
//     .then(res => {
//         console.log(res);
//         console.log(res["access_token"]);
//         myStorage.setItem("jwt-token", res["access_token"]);
//         console.log('product added successfully')})
// }
// let productContainer = document.querySelector('#product-container')
//     productContainer.innerHTML = "";
//     data['data'].forEach(product => {
//         productContainer.innerHTML += `<div class = 'product'>
//                                         <img src="${product[5]}" class="product_image">
//                                         <h2 class="product_title">${product[1]}</h2>
//                                         <p class="product_price">R ${product[2]}<p> 
                                        
//                                         <div class="cart">
//                                         <button class="btn-cart">Add to cart</button>
//                                         <button class="btn-cart">Remove</button>
//                                         </div>
                                        
//                                         </div>`
//     })


    
// function to increase quantity
    function quantityChange(event){
        let input = event.target
        if (isNaN(input.value) || input.value <= 0){
            input.value = 1
        } 
        cartTotal()
    }
    
    
// function to remove item 
    function removeItem(e){
        console.log(e.target.id)
        let itemname = e.target.id
        console.log(itemname)
        // let removeCart = document.getElementsByClassName('')
        // for(let i = 0; i < removeCart.length; i++){
        //     let button = removeCart[i]
        //     button.addEventListener('click', function(event){
        //         let btnClicked = event.target
        //         btnClicked.parentElement.parentElement.remove()
        //         // cartTotal()
        //     })
        let quantityInputs = document.getElementsByClassName('cartProduct-quantity-input')
        for(let i = 0; i < quantityInputs.length; i++){
            let input = quantityInputs[i]
            input.addEventListener('change', quantityChange)
        }
        for (let  item in cart){
            if (itemname == cart[item]['name']){
                cart.splice(item, 1)
                idStorage['cart'] = JSON.stringify(cart)
                console.log(idStorage.getItem('cart'))
                createcart()
            }
        }
        cartTotal()
    }

// function to calculate total amount : Tashwill
function cartTotal(){
    let cartContainer = document.querySelector('#checkout-container')[0]
    let cartRow = document.getElementsByClassName('cartProduct')
    let total = 0
    for(let i = 0; i < cartRow.length; i++){
        let row = cartRow[i]
        console.log(row)
        let priceItem = row.querySelector('.cartProduct_price')
        let quantityItem = row.getElementsByClassName('cartProduct-quantity-input')[0]
        let price = parseFloat(priceItem.innerText.replace('R ', ''))
        let quantity = quantityItem.value
        total = Math.round(total + (price * quantity))
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-price')[0].innerHTML = '   R ' + total

}

// let itemId = idStorage.getItem('id')
// // function to show products 
// fetch(`https://flask-project-eomp.herokuapp.com/view-product/${itemId}/`)
// .then(res => res.json())
// .then(data =>{
//     console.log(data)
//     console.log(data['data'][1])
//     // document.getElementsByClassName('product_id').innerText += `${data['data'][0]}`


//     let cartContainer = document.getElementById('checkout-container')
//     cartContainer.innerHTML = "";
//     data['data'].forEach(product => {
//         cartContainer.innerHTML += `<div class = 'cartProduct'>
//                                         <h1 class="cartProductroduct_id">${product[0]}.</h1>
//                                         <img src="${product[5]}" class="cartProductroduct_image">
//                                         <h4 class="cartProductroduct_title">${product[1]}</h4>
//                                         <p class="cartProductroduct_price">R ${product[2]}<p> 
                
//                                         </div>`
// })
// })