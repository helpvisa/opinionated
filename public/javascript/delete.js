// query posts
opinionEl = document.querySelector('#opinion-container');
opinionEl.addEventListener('click', (event) => {
    if (event.target.classList.contains("delete-post")) {
        id = event.target.getAttribute("data-post-id");
        // console.log('liked' + id);
        deleteHandler(id);
    }
});

// functions
async function deleteHandler(id) {
    const response = await fetch('/api/posts/' + id, {
        method: 'delete'
    });

    // check response
    if (response.ok) {
        document.location.reload();
    }
}