// login / register modal handling
var loginModal = document.querySelector('#login-modal');
var loginModalBtn = document.querySelector('#show-login');
var loginSpan = document.querySelector('#login-close');

var registerModal = document.querySelector('#register-modal');
var registerModalBtn = document.querySelector('#show-register');
var registerSpan = document.querySelector('#register-close');

// login
// open modal on click
loginModalBtn.addEventListener('click', () => {
    loginModal.style.display = "block";
    registerModal.style.display = "none";
});
// close modal on click
loginSpan.addEventListener('click', () => {
    loginModal.style.display = "none";
});

// register
// open modal on click
registerModalBtn.addEventListener('click', () => {
    registerModal.style.display = "block";
    loginModal.style.display = "none";
});
// close modal on click
registerSpan.addEventListener('click', () => {
    registerModal.style.display = "none";
});


// handle form submission for login / register
// listen for button submissions
loginModal.addEventListener('submit', loginHandler);
registerModal.addEventListener('submit', registerHandler);

// functions
// login request
async function loginHandler(event) {
    event.preventDefault(); // prevent page reload

    // get variables to pass into api
    const username = document.querySelector('#login_username').value.trim();
    const password = document.querySelector('#login_pw').value.trim();

    if (username && password) { // if we have both
        const response = await fetch('/api/users/login', {
            method: 'post', // we are making a post request
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        // check our response
        if (response.ok) {
            document.location.replace('/'); // got to homepage
        } else {
            alert('Sorry, login has failed. Please try again in a moment.');
        }
    }
}

// sregister request
async function registerHandler(event) {
    event.preventDefault(); // prevent page reload

    // get vars to pass into api
    const username = document.querySelector('#register_username').value.trim();
    const password = document.querySelector('#register_pw').value.trim();

    if (username && password) { // if we have both
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        // check our response
        if (response.ok) {
            document.location.replace('/'); // got to homepage
        } else {
            alert('Sorry, signup has failed. Please try again in a moment.');
        }
    }
}