// This file contains utility functions that are used across the application.

// Function to format date to a more readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to validate input fields
function validateInput(input) {
    return input && input.trim() !== '';
}

// Function to display error messages
function displayError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
}

// Function to clear error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => element.remove());
}