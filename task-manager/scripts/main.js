 /* ========================================
   AUREX INTERNSHIP - WEEK 4
   TASK MANAGEMENT APPLICATION
======================================== */


/* ========================================
   1. SELECT HTML ELEMENTS
======================================== */

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

const errorMessage = document.getElementById("errorMessage");

const taskCount = document.getElementById("taskCount");

const filterButtons = document.querySelectorAll(".filter-btn");



/* ========================================
   2. GET SAVED TASKS
======================================== */

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];


/*
   This stores the currently selected filter.

   Possible values:
   "all"
   "active"
   "completed"
*/

let currentFilter = "all";



/* ========================================
   3. SAVE TASKS
======================================== */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}



/* ========================================
   4. DISPLAY TASKS
======================================== */

function displayTasks() {

    /*
       Remove the old list before displaying
       the updated tasks.
    */

    taskList.innerHTML = "";


    let filteredTasks = tasks;



    /* Show active tasks */

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );

    }



    /* Show completed tasks */

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );

    }



    /*
       Loop through every task
       and create its HTML.
    */

    filteredTasks.forEach(task => {

        const li = document.createElement("li");


        li.className = "task-item";



        /*
           Add completed class if
           the task is completed.
        */

        if (task.completed) {

            li.classList.add("completed");

        }



        /*
           Create the task content.
        */

        li.innerHTML = `

            <input
                type="checkbox"
                class="complete-checkbox"
                data-id="${task.id}"
                ${task.completed ? "checked" : ""}
            >

            <span class="task-text">
                ${task.text}
            </span>

            <div class="task-actions">

                <button
                    class="edit-btn"
                    data-id="${task.id}">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-id="${task.id}">
                    Delete
                </button>

            </div>

        `;



        /*
           Add the new task to
           the task list.
        */

        taskList.appendChild(li);

    });



    updateTaskCount();

}



/* ========================================
   5. ADD TASK
======================================== */

taskForm.addEventListener(
    "submit",
    function(event) {

        /*
           Prevent the form from
           refreshing the page.
        */

        event.preventDefault();



        /*
           Get the value entered
           by the user.
        */

        const taskText =
            taskInput.value.trim();



        /* ==============================
           VALIDATION
        ============================== */

        if (taskText === "") {

            errorMessage.textContent =
                "Please enter a task.";

            return;

        }



        /*
           Remove error message
           when input is valid.
        */

        errorMessage.textContent = "";



        /* ==============================
           CREATE TASK OBJECT
        ============================== */

        const newTask = {

            id: Date.now(),

            text: taskText,

            completed: false

        };



        /*
           Add the new task
           to the tasks array.
        */

        tasks.push(newTask);



        /*
           Save task in localStorage.
        */

        saveTasks();



        /*
           Update the page.
        */

        displayTasks();



        /*
           Clear the input box.
        */

        taskInput.value = "";

    }
);



/* ========================================
   6. DELETE TASK
======================================== */

function deleteTask(id) {

    /*
       Keep every task except
       the task being deleted.
    */

    tasks = tasks.filter(
        task => task.id !== id
    );



    saveTasks();

    displayTasks();

}



/* ========================================
   7. EDIT TASK
======================================== */

function editTask(id) {

    /*
       Find the task using its ID.
    */

    const task = tasks.find(
        task => task.id === id
    );



    /*
       If task doesn't exist,
       stop the function.
    */

    if (!task) {

        return;

    }



    /*
       Ask user for the new task text.
    */

    const newText = prompt(
        "Edit your task:",
        task.text
    );



    /*
       User clicked Cancel.
    */

    if (newText === null) {

        return;

    }



    /*
       Prevent empty task.
    */

    if (newText.trim() === "") {

        alert("Task cannot be empty.");

        return;

    }



    /*
       Update the task.
    */

    task.text = newText.trim();



    saveTasks();

    displayTasks();

}



/* ========================================
   8. MARK TASK COMPLETE
======================================== */

function toggleTask(id) {

    /*
       Find the selected task.
    */

    const task = tasks.find(
        task => task.id === id
    );



    if (!task) {

        return;

    }



    /*
       Change:

       false → true

       OR

       true → false
    */

    task.completed = !task.completed;



    saveTasks();

    displayTasks();

}



/* ========================================
   9. EDIT AND DELETE EVENTS
======================================== */

taskList.addEventListener(
    "click",
    function(event) {

        /*
           Get the task ID
           from the clicked button.
        */

        const id =
            Number(event.target.dataset.id);



        /* Delete button */

        if (
            event.target.classList.contains(
                "delete-btn"
            )
        ) {

            deleteTask(id);

        }



        /* Edit button */

        if (
            event.target.classList.contains(
                "edit-btn"
            )
        ) {

            editTask(id);

        }

    }
);



/* ========================================
   10. COMPLETE CHECKBOX
======================================== */

taskList.addEventListener(
    "change",
    function(event) {

        if (
            event.target.classList.contains(
                "complete-checkbox"
            )
        ) {

            const id =
                Number(event.target.dataset.id);


            toggleTask(id);

        }

    }
);



/* ========================================
   11. FILTER BUTTONS
======================================== */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function() {

                /*
                   Get selected filter.
                */

                currentFilter =
                    button.dataset.filter;



                /*
                   Remove active class
                   from all buttons.
                */

                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );



                /*
                   Highlight selected button.
                */

                button.classList.add("active");



                /*
                   Display filtered tasks.
                */

                displayTasks();

            }
        );

    }
);



/* ========================================
   12. TASK COUNTER
======================================== */

function updateTaskCount() {

    /*
       Count tasks that are
       not completed.
    */

    const remainingTasks =
        tasks.filter(
            task => !task.completed
        ).length;



    taskCount.textContent =
        `${remainingTasks} task(s) remaining`;

}



/* ========================================
   13. LOAD TASKS
======================================== */

/*
   Run displayTasks() when the
   page first opens.

   This loads tasks saved in
   localStorage.
*/

displayTasks();