// Get the button and the sidebar elements
const toggleButton = document.getElementById('toggle-button');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');

// Add a click event listener to the button
toggleButton.addEventListener('click', () => {
    // This method adds the 'collapsed' class if it's not there,
    // and removes it if it is. It's perfect for a toggle.
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
});