const myStorage = window.localStorage

// function to open and close update user modal 
let modalBtn = document.querySelector(".create-user")
let modal = document.querySelector(".modal")
let modalClose = document.querySelector(".close-modal")

modalBtn.addEventListener('click', function(){
    modal.classList.add("modal-active")
})

modalClose.addEventListener('click', function(){
    modal.classList.remove("modal-active")
})



// function to open and close delete user modal 
let delModalBtn = document.querySelector(".delete-user")
let delModal = document.querySelector(".deleteModal")
let delModalClose = document.querySelector(".close-deleteModal")

delModalBtn.addEventListener('click', function(){
    delModal.classList.add("deleteModal-active")
})

delModalClose.addEventListener('click', function(){
    delModal.classList.remove("deleteModal-active")
})



// function to show users
fetch('https://flask-project-eomp.herokuapp.com/show-users')
.then(res => res.json())
.then(data =>{
    console.log(data)


let productContainer = document.querySelector('#product-container')
productContainer.innerHTML = "";
data['data'].forEach(product => {
productContainer.innerHTML += `<div class = 'user'>
                                 <h1 class="user_id">${product[0]}.</h2>
                                 <h2 class="username">${product[4]}</h2>
                                 <h4 class="first_name">Name: ${product[1]} ${product[2]}<h4>
                                 <p class="email_address">Email: ${product[3]}<p>
                            
                                 
                                 </div>`
})
})



// function to update user
function updateUser(){
    let userID = document.querySelector("#user-id").value
    fetch(`https://flask-project-eomp.herokuapp.com/edit-user/${userID}/`, {
        method: 'PUT',
        body: JSON.stringify({
            "first_name": document.getElementById("name").value,
            "last_name": document.getElementById("surname").value,
            "email_address": document.getElementById("email").value,
            "username": document.getElementById("username").value,
            "password": document.getElementById("password").value,
            
        }),
        headers: {
            'Content-Type' : 'application/json',
            // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        // console.log(res["access_token"]);
        // myStorage.setItem("jwt-token", res["access_token"]);
        alert("User updated successfully.")})
}



// function to delete user
function deleteUser(){
    // console.log(id)
    let userID = document.querySelector("#delUser-id").value
    fetch(`https://flask-project-eomp.herokuapp.com/delete-user/${userID}`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("User deleted successfully.")
    })
}
