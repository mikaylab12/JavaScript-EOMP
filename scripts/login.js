// Login Function for users 
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
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        myStorage = window.localStorage
        console.log(data['entry__token'])
        myStorage.setItem('jwt-token', data['entry__token'])
        if (data['description'] == "Invalid credentials"){
            alert("Error, This is not a valid login in!")
        }
        // else if (entry_token == ""){
        //     alert("Error, This is not a valid login in!")
        // }
        else{
            window.location="products.html"
        }
    });
    
   
}

function submitForm(event) {
    event.preventDefault();
    login();
}

form.addEventListener("submit", submitForm);