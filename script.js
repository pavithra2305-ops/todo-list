 // DOM elements
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Event listeners
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);
window.addEventListener("load", loadTasks);

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Task enter pannunga");
    return;
  }

  createTask(taskText, false);
  saveTasks();

  taskInput.value = "";
}

// Create task element
function createTask(text, completed) {
  const li = document.createElement("li");

  if (completed) {
    li.classList.add("completed");
  }

  // Left side (checkbox + text)
  const leftDiv = document.createElement("div");
  leftDiv.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.innerText = text;

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  // Right side (buttons)
  const btnDiv = document.createElement("div");
  btnDiv.className = "task-buttons";

  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.innerText = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.innerText = "X";

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);

  // Add everything to li
  li.appendChild(leftDiv);
  li.appendChild(btnDiv);
  taskList.appendChild(li);

  // Events
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task", span.innerText);
    if (newText !== null && newText.trim() !== "") {
      span.innerText = newText.trim();
      saveTasks();
    }
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];

  document.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    createTask(task.text, task.completed);
  });
}

// Clear all tasks
function clearAllTasks() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}
