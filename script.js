let input = document.getElementById('taskInput');
let button = document.getElementById('add-icon');
let todoSection = document.getElementById('To-do-section');
let doneSection = document.getElementById('Done-section');
let error = document.querySelector('.error');

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

button.addEventListener('click', () => {
    let inputValue = input.value.trim();
    if (inputValue === "") return;

    // Check for duplicate task
    let existingTasks = document.querySelectorAll('.content p');
    let isDuplicate = Array.from(existingTasks).some(task => task.innerText.toLowerCase() === inputValue.toLowerCase());

    if (isDuplicate) {
        error.style.display = "block";
        setTimeout(() => error.style.display = "none", 2000);
        return;  // ⛔ Stop execution if duplicate is found
    }

    // Create Task Card
    let taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    let contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    let pTag = document.createElement('p');
    pTag.classList.add('simpleP');
    pTag.innerText = inputValue;

    let iconsDiv = document.createElement('div');
    iconsDiv.classList.add('icons');

    // Tick (Move to Done)
    let tickImg = document.createElement('img');
    tickImg.src = "./assets/Tick.svg";
    tickImg.classList.add('tick');
    tickImg.addEventListener('click', () => moveToDone(taskCard, pTag));

    // Delete
    let delImg = document.createElement('img');
    delImg.src = "./assets/del.svg";
    delImg.classList.add('del');
    delImg.addEventListener('click', () => deleteTask(taskCard));

    contentDiv.appendChild(pTag);
    iconsDiv.append(tickImg, delImg);
    taskCard.append(contentDiv, iconsDiv);
    todoSection.appendChild(taskCard);

    // Save to LocalStorage
    saveTasks();

    // Clear input
    input.value = "";
});

// Move Task to Done Section
function moveToDone(taskCard, pTag) {
    taskCard.remove();
    pTag.classList.remove('simpleP');
    pTag.classList.add('task-done');
    doneSection.appendChild(taskCard);
    taskCard.querySelector('.tick').remove();
    // taskCard.querySelector('.del').remove();
    saveTasks();
}

// Delete Task
function deleteTask(taskCard) {
    taskCard.remove();
    saveTasks();
}

// Save Tasks to LocalStorage
function saveTasks() {
    let tasks = [];

    document.querySelectorAll("#To-do-section .content p").forEach(task => {
        tasks.push({ text: task.innerText, isDone: false });
    });

    document.querySelectorAll("#Done-section .content p").forEach(task => {
        tasks.push({ text: task.innerText, isDone: true });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from LocalStorage
// ✅ Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        let taskCard = document.createElement('div');
        taskCard.classList.add('task-card');

        let contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        let pTag = document.createElement('p');
        pTag.innerText = task.text;

        let iconsDiv = document.createElement('div');
        iconsDiv.classList.add('icons');

        let delImg = document.createElement('img');
        delImg.src = "./assets/del.svg";
        delImg.classList.add('del');
        delImg.addEventListener('click', () => deleteTask(taskCard));

        if (!task.isDone) {
            pTag.classList.add('simpleP');

            let tickImg = document.createElement('img');
            tickImg.src = "./assets/Tick.svg";
            tickImg.classList.add('tick');
            tickImg.addEventListener('click', () => moveToDone(taskCard, pTag));

            iconsDiv.append(tickImg, delImg);
            todoSection.appendChild(taskCard);
        } else {
            // ✅ Agar task "Done" section ka hai toh bas Delete button add hoga
            pTag.classList.add('task-done');
            iconsDiv.append(delImg);
            doneSection.appendChild(taskCard);
        }

        contentDiv.appendChild(pTag);
        taskCard.append(contentDiv, iconsDiv);
    });
}
