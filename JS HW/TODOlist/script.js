function addTask() {
    let taskText = document.getElementById("taskInput").value;
    if (taskText === "") return;

    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = taskText;

/* Done Button Function */
    let doneButton = document.createElement("button");
    doneButton.textContent = "Mark as Done";
    doneButton.onclick = function() {
        span.classList.toggle("done");
    };
    
/* Delete Button Function */
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        li.remove();
    };
    
/* Add Done Button and Delete Button to the added Task */
    li.appendChild(span);
    li.appendChild(doneButton);
    li.appendChild(deleteButton);
    
    document.getElementById("taskList").appendChild(li);
    document.getElementById("taskInput").value = "";

    console.log(doneButton);
    console.log(deleteButton);
}

