
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


var createTaskHandler = function(event) {
    event.preventDefault();
    //console.dir(taskNameInput);
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = taskNameInput;
    //getting directly from taskNameInput object
    tasksToDoEl.appendChild(listItemEl);
    
}


formEl.addEventListener("submit", createTaskHandler);

