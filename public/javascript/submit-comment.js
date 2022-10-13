// comment submission handler
// trigger on submit press
document.querySelector('#comment-form').addEventListener('submit', commentSubmissionHandler);

// handler function
async function commentSubmissionHandler(event) {
    event.preventDefault(); // prevent page refresh on submission

    // capture data
    const content = document.querySelector('#comment-text').value;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // pass info into api call
    if (post_id && content) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                content,
                post_id,
            }),
            headers: {'Content-Type': 'application/json'}
        });

        // check response
        if (response.ok) {
            document.location.replace('/post/' + post_id); // refresh homepage
            content.value = "";
        } else {
            alert('Sorry, comment submission failed. Please try again in a moment.');
        }
    }
}