let tasksData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done];
let dragEl = null;

if (localStorage.getItem("tasks")) {

    const data = JSON.parse(localStorage.getItem("tasks"));

    console.log(data);

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            const div = document.createElement("div");

            div.classList.add("task");
            div.setAttribute("draggable", "true");

            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button>Delete</button>
            `
            column.appendChild(div);

            div.addEventListener("drag", (e) => {
                dragEl = div;
            })
        });

        const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".right");
        count.innerText = tasks.length;
    }
}

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragEl = task;
    })
});

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    column.addEventListener("drop", (e) => {
        e.preventDefault();

        column.appendChild(dragEl);
        column.classList.remove("drag-over");

        // for checking the no. of count | to check the no. of todos
        columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            tasksData[col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h2").innerText,
                    desc: t.querySelector("p").innerText
                }
            });

            localStorage.setItem("tasks", JSON.stringify(tasksData));
            count.innerText = tasks.length;
        });

    })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// modal related logic
const toggleModalBtn = document.querySelector('#toggle-modal')
const modalBg = document.querySelector(".modal .bg")
const modal = document.querySelector(".modal")
const addTaskBtn = document.querySelector("#add-new-task");

toggleModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskBtn.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value

    const taskDescription = document.querySelector("#task-description-input").value

    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
            <h2>${taskTitle}</h2>
            <p>${taskDescription}</p>
            <button>Delete</button>
    `
    todo.appendChild(div);

    // for checking the no. of count | to check the no. of todos
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        });

        localStorage.setItem("tasks", JSON.stringify(tasksData));
        count.innerText = tasks.length;
    });

    div.addEventListener("drag", (e) => {
        dragEl = div;
    });

    modal.classList.remove("active");
});


// modal related logic
// 1:38:30