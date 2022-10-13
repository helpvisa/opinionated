// top-right clickables
var dashEl = document.querySelector('#dash');
var dropdownEl = document.querySelector('#img-dropdown');
// open or closed?
var dashOpen = false;

// listen for clicks and expand / contract
dashEl.addEventListener('click', () => {
    if (dashOpen) {
        dropdownEl.style.display = 'block';
        dashOpen = !dashOpen;
    } else {
        dropdownEl.style.display = 'none';
        dashOpen = !dashOpen;
    }
});