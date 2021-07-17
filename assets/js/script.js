
var tasks = [];

// progress variables
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
// for bubbling up problems that could arise 
var pageContentEl = document.querySelector("#page-content");

var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;


  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();

  // returns false if task doesn't have an id when edit is clicked. |  .hasAttribute  knowing if an element has a certain attribute or not is to use
  //this means we can use the same form handler for new and old tasks
  var isEdit = formEl.hasAttribute("data-task-id");
  // console.log(isEdit)

  // package up data as an object
    // var taskDataObj = {
    //     name: taskNameInput,
    //     type: taskTypeInput
    // };

   
    // has data attribute, so get task id and call function to complete edit process
    //This way, createTaskEl() will only get called if isEdit is false. If it's true, we'll call a new function, completeEditTask(), passing it three arguments: the name input value, type input value, and task id.
    
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute and is false, so create object as normal and pass to createTaskEl function
    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
      }

      createTaskEl(taskDataObj);
    }
        


};

// function, completeEditTask(), passing it three arguments: the name input value, type input value, 
// and task id. only get called if isEdit is false. If it's true, we'll call a new function
var completeEditTask = function(taskName, taskType, taskId) {
      // console.log(taskName, taskType, taskId);
      // find the matching task list item
      var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

      // set new values
      taskSelected.querySelector("h3.task-name").textContent = taskName;
      taskSelected.querySelector("span.task-type").textContent = taskType;

      // loop through task array and task object with new content
      // At each iteration of this for loop, we are checking to see if that 
      // individual task's id property matches the taskId argument that we passed into completeEditTask(). 

      // The debugger is a handy tool used by many professional developers. To check if a task has changed 
      // in the tasks array, use debugger; before and after the for loop to see what the data looks like before and after it's updated!
      for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
          tasks[i].name = taskName;
          tasks[i].type = taskType;
        }
        
      };



      alert("Task Updated!");

      //reset the form by removing the task id and changing the button text back to normal
      formEl.removeAttribute("data-task-id");
      document.querySelector("#save-task").textContent = "Add Task";

};


var createTaskEl = function(taskDataObj) {
      var listItemEl = document.createElement("li");
      listItemEl.className = "task-item";

      // add task id as a custom attribute
      listItemEl.setAttribute("data-task-id", taskIdCounter);

      var taskInfoEl = document.createElement("div");
      taskInfoEl.className = "task-info";
      taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
      listItemEl.appendChild(taskInfoEl);

      //storing createTaskActions as a variable in taskActionsEl
      var taskActionsEl = createTaskActions(taskIdCounter);
      // appending all of those buttons and drop downs to the actual list item
      listItemEl.appendChild(taskActionsEl)

      tasksToDoEl.appendChild(listItemEl);
      // property added to taskDataObj argument a giving it the value of taskIdCounter
      taskDataObj.id = taskIdCounter;


      // method adds any content between the parentheses to the end of the specified array
      tasks.push(taskDataObj);


      // increase task counter for next unique id. This way, the id of the newly created DOM element gets added to the task's object as well. 
      // We can use that id later to identify which task has changed for both the DOM and the tasks array.
      taskIdCounter++;

      console.log(taskDataObj);
      console.log(taskDataObj.status);
};



// function with parameter of ('taskID').  This is how we can pass a different id into the function each time to keep track of which elements we're creating for which task.
var createTaskActions = function(taskId) {
      var actionContainerEl = document.createElement("div");
      // add class name to div we just created
      actionContainerEl.className = "task-actions";
      // After these lines, create two new <button> elements and append them to the <div> by adding the following code:
      // creates edit button
      var editButtonEl = document.createElement('button');
      editButtonEl.textContent = "Edit";
      editButtonEl.className = "btn edit-btn";
      editButtonEl.setAttribute("data-task-id", taskId);
      // append child adds element to div
      actionContainerEl.appendChild(editButtonEl);

      // creates delete button
      var deleteButtonEl = document.createElement("button");
      deleteButtonEl.textContent = "Delete";
      deleteButtonEl.className = "btn delete-btn";
      deleteButtonEl.setAttribute("data-task-id", taskId);
      // append child adds element to div
      actionContainerEl.appendChild(deleteButtonEl);

      var statusSelectEl = document.createElement("select");
      statusSelectEl.className = "select-status";
      statusSelectEl.setAttribute("name", "status-change");
      statusSelectEl.setAttribute("data-task-id", taskId);

      // an array for the select dropdown
      var statusChoices = ["To Do", "In Progress", "Completed"];


      // js feature to execute code a certain number of times...for loop

//  var i = 0 defines an initial counter, or iterator, variable
// i < statusChoices.length keeps the for loop running by checking the iterator against the number of items in the array (length being the property that returns the number of items)
// i++ increments the counter by one after each loop iteration
// statusChoices[i] returns the value of the array at the given index (for example, when i = 0, or statusChoices[0], we get the first item)



      for (let i = 0; i < statusChoices.length; i++) {
        
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      };


      // append child adds element to div
      actionContainerEl.appendChild(statusSelectEl);


      return actionContainerEl;
  }

formEl.addEventListener("submit", taskFormHandler);


//event.target reports the element on which the event occurs, in this case, the click event.
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  
      // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
      // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
      if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
      }
    }

// reassign tasks array to be the same as updatedTaskArr
tasks = updatedTaskArr;
}

var editTask = function(taskId) {
      // console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);
    //  reuse the selectors from before to update the form.
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    // change form to say save task as opposed to 'add task'
    document.querySelector("#save-task").textContent = "Save Task";
    // add following code to include tasks id
    formEl.setAttribute("data-task-id", taskId);

}

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // moves items from one column to another by append child and doesn't recreate, simply moves.
    if (statusValue === "to do") {
      tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
      tasksCompletedEl.appendChild(taskSelected);
    };

    // update task's in tasks array
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)){
        tasks[i].status = statusValue;
      }  
    };
    
   
};

//taskButtonHandler(), which listens to events on the entire <main> element
pageContentEl.addEventListener("click", taskButtonHandler)

pageContentEl.addEventListener("change", taskStatusChangeHandler);