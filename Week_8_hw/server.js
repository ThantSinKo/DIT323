const express = require("express");
const app = express();
const path = require("path");

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files (CSS, images, etc.)
app.use(express.static("public"));

// Sample Projects Array
const projects = [
    { title: "Portfolio Website", description: "A personal website built with EJS and Express.", link: "#" },
    { title: "Task Manager", description: "A to-do list app with authentication.", link: "#" },
    { title: "Weather App", description: "A weather forecast application using an API.", link: "#" }
];

// Sample Blog Posts Array
const blogPosts = [
    { title: "Getting Started with EJS", date: "March 15, 2025", content: "EJS is a simple templating language that lets you generate HTML with JavaScript." },
    { title: "Building a Portfolio with Express", date: "March 18, 2025", content: "Learn how to use Express.js and EJS to build a professional portfolio website." },
    { title: "Deploying a Node.js App", date: "March 20, 2025", content: "Step-by-step guide to deploying your Node.js application using popular cloud platforms." }
];

// Home Route
app.get("/", (req, res) => {
    res.render("index", { projects, blogPosts });
});

// Projects Page
app.get("/projects", (req, res) => {
    res.render("projects", { projects });
});

// Blog Page
app.get("/blog", (req, res) => {
    res.render("blog", { blogPosts });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
