// Login Function
let entry_token = window.localStorage.getItem("jwt-token")

function login(){
    fetch('https://flask-project-eomp.herokuapp.com/auth', {
    method: "POST",
    body: JSON.stringify({
        'username': document.getElementById("username").value,
        'password': document.getElementById("password").value,
    }),
    headers: {
        'Content-type': 'application/json',
    }
    }).then(res => res.json()).then(data => {
        console.log(data)
        mystorage = window.localStorage
        console.log(data['entry__token'])
        mystorage.setItem('jwt-token', data['entry__token'])
    });
    if (entry_token !== ""){
        window.location="products.html"
        }
    else{
        alert("Error, This is not a valid login in!")
     }
}

function submitForm(event) {
    event.preventDefault();
    login();
}

form.addEventListener("submit", submitForm);