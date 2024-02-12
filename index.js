document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from local storage
    loadTasks();

    // Event listener for adding a new task
    document.getElementById("taskInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        let taskText = document.getElementById("taskInput").value.trim();
        if (taskText === "") return;

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let newTask = { text: taskText, completed: false };
        tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();

        // Clear the input field
        document.getElementById("taskInput").value = "";
    }

    // Function to load tasks from local storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            let taskItem = document.createElement("div");
            taskItem.classList.add("task");
            if (task.completed) {
                taskItem.classList.add("completed");
            }

            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="actions">
                    <button onclick="completeTask(${index})">&#10003;</button>
                    <button onclick="deleteTask(${index})">&#10005;</button>
                    <button onclick="updateTask(${index})">&#9998;</button>
                </div>
            `;

            taskList.appendChild(taskItem);
        });
    }

    // Function to mark a task as completed
    window.completeTask = function (index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    // Function to delete a task
    window.deleteTask = function (index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    // Function to update a task
    window.updateTask = function (index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let updatedTaskText = prompt("Update task name:", tasks[index].text);
        if (updatedTaskText !== null) {
            tasks[index].text = updatedTaskText.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        }
    };
});
