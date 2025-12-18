function renderTasks(){
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    
    if(currentFilter === "pending"){
        filteredTasks = tasks.filter(task => !task.comp);
    }

    if(currentFilter === "completed"){
        filteredTasks = tasks.filter(task => task.comp);
    }

    filteredTasks.forEach(function(task){
        const li = document.createElement("li");
        li.textContent = task.text;

        if(task.comp){
            li.classList.add("completed");
        }

        li.addEventListener("click",function(){
            task.comp = !task.comp;
            saveTasks();
            renderTasks();
        })

        const btn = document.createElement("button");
        btn.textContent="❌";
        btn.style.marginLeft = "20px";

        const index = tasks.indexOf(task);
        btn.addEventListener("click",function(event){
            event.stopPropagation();
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });
        
        li.appendChild(btn);
        taskList.appendChild(li);
    });
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){
    const storedTasks=localStorage.getItem("tasks");
    if(storedTasks){
        tasks=JSON.parse(storedTasks);
    }
}

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks=[];
let currentFilter = "all";

taskForm.addEventListener("submit",function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if(taskText === "") return;

    tasks.push({
        text : taskText,
        comp : false
    });
    saveTasks();
    renderTasks();

    taskInput.value = "";
});

loadTasks();
renderTasks();

const filterButtons = document.querySelectorAll("#filters button");

filterButtons.forEach(function (btn){
    btn.addEventListener("click",function(){
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

