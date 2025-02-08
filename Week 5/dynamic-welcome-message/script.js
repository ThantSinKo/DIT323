function setWelcomeMessage() {
    const welcomeDiv = document.getElementById("welcome-message");
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let message = "Welcome to My Portfolio!";

    // Bonus: Change message based on time of day
    if (currentHour < 12) {
        message = "Good morning! Welcome to My Portfolio!";
    } else if (currentHour >= 12 && currentHour < 18) {
        message = "Good afternoon! Welcome to My Portfolio!";
    } else {
        message = "Good evening! Welcome to My Portfolio!";
    }

    welcomeDiv.innerText = message;
}

// Call the function when the page loads
window.onload = setWelcomeMessage;