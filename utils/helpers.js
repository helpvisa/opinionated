// helper functions for handlebars
// format dates for blog post display
function formatDate(date) {
    return `${new Date(date).getMonth() + 1}-${new Date(date).getDate()}-${new Date(date).getFullYear()}`;
}

// format plural words for comments display
function formatPlural(word, amount) {
    if (amount !== 1) {
        return word + 's';
    }
    return word;
}

// determine if a post is by a user
function isByUser(id, user_id) {
    return id == user_id;
}

// export helpers
module.exports = {formatDate, formatPlural, isByUser};