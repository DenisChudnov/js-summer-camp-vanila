document
    .getElementById('show-signin-form')
    .addEventListener('click', ()=>{
        document.getElementById('sign-in-container').classList.remove('hidden');
        document.getElementById('sign-up-container').classList.add('hidden');
    })

document
    .getElementById('show-signup-form')
    .addEventListener('click', ()=>{
        document.getElementById('sign-in-container').classList.add('hidden');
        document.getElementById('sign-up-container').classList.remove('hidden');
    })

document
    .getElementById('sign-up-button')
    .addEventListener('click', () => {
        alert('sign up huh')
    })

document
    .getElementById('sign-in-button')
    .addEventListener('click', () => {
        alert('sign in huh')
    })

function signin(){
    
}
