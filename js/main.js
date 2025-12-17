const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks=[];

taskForm.addEventListener("submit",function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if(taskText === "") return;

    tasks.push({
        text : taskText,
        comp : false
    });
    renderTasks();

    taskInput.value = "";
});

function renderTasks(){
    taskList.innerHTML = "";
    
    tasks.forEach(function(task,index){
        const li = document.createElement("li");
        li.textContent = task.text;

        if(task.comp){
            li.classList.add("Done");
        }

        li.addEventListener("click",function(){
            task.comp = !task.comp;
            renderTasks();
        })

        const btn = document.createElement("button");
        btn.textContent="❌";
        btn.style.marginLeft = "10px";

        btn.addEventListener("click",function(event){
            event.stopPropagation();
            tasks.splice(index,1);
            renderTasks();
        });
        
        li.appendChild(btn);
        taskList.appendChild(li);
    });
}

