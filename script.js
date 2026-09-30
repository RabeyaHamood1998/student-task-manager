function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("prioritySelect");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText + " - " + priority.value + " Priority";

    li.appendChild(taskContent);

    li.onclick = function () {
        li.classList.toggle("completed");
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function (event) {
        event.stopPropagation();
        li.remove();
    };

    li.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
    priority.value = "Medium";
}


function filterTasks(filter) {
    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(function (task) {
        const isCompleted = task.classList.contains("completed");

        if (filter === "all") {
            task.style.display = "block";
        } else if (filter === "active") {
            task.style.display = isCompleted ? "none" : "block";
        } else if (filter === "completed") {
            task.style.display = isCompleted ? "block" : "none";
        }
    });
}
