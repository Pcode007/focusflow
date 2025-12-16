const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit",function (event) {
    event.preventDefault();

    const taskText = taskInput.value;

    if(taskText === "") return;

    addTask(taskText)
    taskInput.value = "";
});

function addTask(taskText){
    const li = document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);
}

