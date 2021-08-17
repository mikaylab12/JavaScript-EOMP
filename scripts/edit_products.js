// function to open and close update modal 
let updModalBtn = document.querySelector(".update-product")
let updModal = document.querySelector(".updateModal")
let updModalClose = document.querySelector(".close-updateModal")

updModalBtn.addEventListener('click', function(){
    updModal.classList.add("updateModal-active")
    document.querySelectorAll('.product').forEach(product => product.style.zIndex = -1)
})

updModalClose.addEventListener('click', function(){
    updModal.classList.remove("updateModal-active")
    document.querySelectorAll('.product').forEach(product => product.style.zIndex = 0)
})



// update products
function updateProduct(){
    let productID = document.querySelector("#product-id").value
    fetch(`https://flask-project-eomp.herokuapp.com/edit-product/${productID}/`, {
        method: 'PUT',
        body: JSON.stringify({
            // "user_id": document.getElementById("user-id").value,
            "product_name": document.getElementById("updProduct-name").value,
            "product_price": document.getElementById("updPrice").value,
            "product_quantity": document.getElementById("updQuantity").value,
            "product_description": document.getElementById("updDescription").value,
            "product_picture": document.getElementById("updPicture").value,
            
        }),
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
        alert("Product deleted successfully.")})
}