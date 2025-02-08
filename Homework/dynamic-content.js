let projects = [
  { title: "Project A", description: "Description A" },
  { title: "Project B", description: "Description B" },
  { title: "Project C", description: "Description C" },
  { title: "Project D", description: "Description D" }
];

// api call / server req / database response

// function for project generation
let genrateContent = () => {
  projects.forEach(proj => {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<h3>${proj.title}</h3><p>${proj.description}</p>`;
    document.body.appendChild(newDiv);
  });
}

// get generate button
let genBtn = document.getElementById("genBtn");
// add click event for button
genBtn.addEventListener('click', genrateContent);

console.log("created genBtn and added event listener");