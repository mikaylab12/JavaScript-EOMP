// Login Function
// let entry_token = window.localStorage.getItem("jwt-token")

function login(){
    fetch('https://flask-project-eomp.herokuapp.com/login-admin/', {
    method: "POST",
    body: JSON.stringify({
        'admin_username': document.getElementById("username").value,
        'admin_password': document.getElementById("password").value,
    }),
    headers: {
        'Content-type': 'application/json',
    }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // mystorage = window.localStorage
        // console.log(data['entry__token'])
        // mystorage.setItem('jwt-token', data['entry__token'])
    // if (data['message'] == "Please enter valid credentials."){    
    if (data['description'] == "Invalid credentials"){
        alert("Username or password is incorrect. Please enter correct details")
    }else{
        // console.log(data['access_token'])
        // mystorage.setItem('jwt-token', data['access_token'])
        window.location.href = "./admin.html"
    }
 });
        
}

function submitForm(event) {
    event.preventDefault();
    login();
}

form.addEventListener("submit", submitForm);
