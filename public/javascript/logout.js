// query logout button
document.querySelector('#logout').addEventListener('click', logoutHandler);

// function
async function logoutHandler() {
    // query our logout endpoint
    const response = await fetch('/api/users/logout', {
        method: 'post',
    });

    if (response.ok) {
        document.location.replace('/'); // return to homepage
    } else {
        alert('Logout failed. Please wait a moment and try again.');
    }
}