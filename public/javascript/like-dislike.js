// handles likes and dislikes
// listen for clicks on child elements
opinionEl = document.querySelector('#opinion-container');
opinionEl.addEventListener('click', (event) => {
    if (event.target.classList.contains("like")) {
        id = event.target.getAttribute("data-post-id");
        // console.log('liked' + id);
        sendLike(id, event.target);
    } else if (event.target.classList.contains("dislike")) {
        id = event.target.getAttribute("data-post-id");
        // console.log('disliked' + id);
        sendDislike(id, event.target);
    } else if (event.target.classList.contains("comment-page")) {
        id = event.target.getAttribute("data-post-id");
        // console.log('go to comments' + id);
        document.location.replace('/post/' + id);
    }
});

// functions
async function sendLike(id, el) {
    const response = await fetch('/api/posts/like/' + id, {
        method: 'put'
    });

    // check response
    if (response.ok) {
        document.location.reload();
    }
}

async function sendDislike(id, el) {
    const response = await fetch('/api/posts/dislike/' + id, {
        method: 'put'
    });

    // check response
    if (response.ok) {
        document.location.reload();
    }
}