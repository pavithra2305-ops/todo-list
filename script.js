const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);
window.addEventListener("load", loadTasks);


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


function createTask(text, completed) {
  const li = document.createElement("li");

  if (completed) {
    li.classList.add("completed");
  }

  
  const leftDiv = document.createElement("div");
  leftDiv.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.innerText = text;

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

   
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

   
  li.appendChild(leftDiv);
  li.appendChild(btnDiv);
  taskList.appendChild(li);

 
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

 
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    createTask(task.text, task.completed);
  });
}

 
function clearAllTasks() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

