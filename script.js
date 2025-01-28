// DOM Elements
const taskInput = document.getElementById("task-input");
const taskDateTimeInput = document.getElementById("task-datetime");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const totalTasksDisplay = document.getElementById("total-tasks");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Update Total Task Count
function updateTaskCount() {
  const totalTasks = taskList.children.length;
  totalTasksDisplay.textContent = `Total Tasks: ${totalTasks}`;
}

// Add Task
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDateTime = taskDateTimeInput.value;

  if (taskText === "" || taskDateTime === "") {
    alert("Please enter both a task and a date/time.");
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  taskItem.innerHTML = `
    <span>${taskText}</span>
    <small style="display: block; font-size: 12px; color: gray;">
      Due: ${new Date(taskDateTime).toLocaleString()}
    </small>
    <div>
      <button class="edit-btn"><i class="fas fa-edit"></i></button>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>
  `;

  taskList.appendChild(taskItem);
  taskInput.value = "";
  taskDateTimeInput.value = "";

  // Add Event Listeners for Edit and Delete
  taskItem.querySelector(".edit-btn").addEventListener("click", () => editTask(taskItem));
  taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(taskItem));

  // Update task count
  updateTaskCount();
}

// Edit Task
function editTask(taskItem) {
  const taskText = taskItem.querySelector("span").textContent;
  const newTaskText = prompt("Edit Task:", taskText);

  if (newTaskText) {
    taskItem.querySelector("span").textContent = newTaskText;
  }
}

// Delete Task
function deleteTask(taskItem) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskItem.remove();
    updateTaskCount();
  }
}

// Delete All Tasks
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    taskList.innerHTML = "";
    updateTaskCount();
  }
});
