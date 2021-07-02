import './main.css'
console.log('hello, world')
const authButton = document.getElementById('auth-call-btn');


document
    .getElementById('auth-call-btn')
    .addEventListener("click",()=>{
        // console.log('click', authButton.innerHTML)
        // if(authButton.innerHTML == "Login"){
        //     changeAuthButtonLabel(false)
        // } else {
        //     changeAuthButtonLabel(true)
        // }
       window.location.href = "/auth.html"
    })

function changeAuthButtonLabel(isLoginned){
    if(isLoginned){
        console.log('true')
        authButton.innerHTML = "Logout";
    } else {
        console.log('false')
        authButton.innerHTML = "Login";
    }
}
