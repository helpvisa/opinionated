// opinion post handler
// trigger on submit press
document.querySelector('#opinion-form').addEventListener('submit', opinionSubmissionHandler);

// handler function
async function opinionSubmissionHandler(event) {
    event.preventDefault(); // prevent page refresh on submission

    // capture data
    const name = document.querySelector('#opinion-name').value;
    const content = document.querySelector('#opinion-text').value;

    // pass info into api call
    if (name && content) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                name,
                content
            }),
            headers: {'Content-Type': 'application/json'}
        });

        // check response
        if (response.ok) {
            document.location.replace('/'); // refresh homepage
            name.value = "";
            content.value = "";
        } else {
            alert('Sorry, post submission failed. Please try again in a moment.');
        }
    }
}