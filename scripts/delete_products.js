// function to open and close delete modal 
let delModalBtn = document.querySelector(".delete-product")
let delModal = document.querySelector(".deleteModal")
let delModalClose = document.querySelector(".close-deleteModal")

delModalBtn.addEventListener('click', function(){
    delModal.classList.add("deleteModal-active")
})

delModalClose.addEventListener('click', function(){
    delModal.classList.remove("deleteModal-active")
})

// function to delete products
function deleteProduct(){
    let productID = document.querySelector("#delProduct-id").value
    fetch(`https://flask-project-eomp.herokuapp.com/delete-product/${productID}`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Product deleted successfully.")
    })
}