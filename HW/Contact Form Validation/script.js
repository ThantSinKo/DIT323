document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let isValid = true;

    // Name validation
    const name = document.getElementById("name").value.trim();
    if (name === "") {
        document.getElementById("nameError").style.display = "inline";
        isValid = false;
    } else {
        document.getElementById("nameError").style.display = "none";
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").style.display = "inline";
        isValid = false;
    } else {
        document.getElementById("emailError").style.display = "none";
    }

    // Message validation
    const message = document.getElementById("message").value.trim();
    if (message === "") {
        document.getElementById("messageError").style.display = "inline";
        isValid = false;
    } else {
        document.getElementById("messageError").style.display = "none";
    }

    // Success message
    if (isValid) {
        document.getElementById("successMessage").style.display = "block";
    } else {
        document.getElementById("successMessage").style.display = "none";
    }
});