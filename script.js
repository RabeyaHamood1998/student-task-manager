function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}


function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskContent = document.createElement("span");
        taskContent.textContent =
            task.text + " - " + task.priority + " Priority";

        li.appendChild(taskContent);

        li.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function (event) {
            event.stopPropagation();

            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        };

        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("prioritySelect");

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const tasks = getTasks();

    const newTask = {
        text: taskText,
        priority: priority.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks(tasks);

    input.value = "";
    priority.value = "Medium";

    renderTasks();
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


document.addEventListener("DOMContentLoaded", function () {
    renderTasks();
});
