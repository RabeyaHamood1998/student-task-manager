
const { addTask, getTasks } = require("./script.js");

beforeEach(() => {
    localStorage.clear();

    document.body.innerHTML = `
        <input id="taskInput" />
        <select id="prioritySelect">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <ul id="taskList"></ul>
    `;

    window.alert = jest.fn();
});

test("adds a task with High priority", () => {
    document.getElementById("taskInput").value = "Study";
    document.getElementById("prioritySelect").value = "High";

    addTask();

    const tasks = getTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].text).toBe("Study");
    expect(tasks[0].priority).toBe("High");
    expect(tasks[0].completed).toBe(false);
});

test("adds a task with Low priority", () => {
    document.getElementById("taskInput").value = "Homework";
    document.getElementById("prioritySelect").value = "Low";

    addTask();

    expect(getTasks()[0].priority).toBe("Low");
});

test("does not add an empty task", () => {
    document.getElementById("taskInput").value = "   ";

    addTask();

    expect(getTasks()).toHaveLength(0);
    expect(window.alert).toHaveBeenCalledWith(
        "Please enter a task."
    );
});

test("clears input after adding a task", () => {
    document.getElementById("taskInput").value = "Read book";

    addTask();

    expect(document.getElementById("taskInput").value).toBe("");
});

test("resets priority to Medium after adding a task", () => {
    document.getElementById("taskInput").value = "Assignment";
    document.getElementById("prioritySelect").value = "High";

    addTask();

    expect(document.getElementById("prioritySelect").value).toBe("Medium");
});

test("saves multiple tasks", () => {
    const input = document.getElementById("taskInput");

    input.value = "Task 1";
    addTask();

    input.value = "Task 2";
    addTask();

    expect(getTasks()).toHaveLength(2);
});
