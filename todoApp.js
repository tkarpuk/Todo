// initial assinings
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const addTaskForm = document.querySelector('#addTaskForm');

// create a task
const createTaskItem = (task) => `
   <li>
    <input type="checkbox" name="task" value="${task}"
        onChange="toggleTaskCompletion(event)">
    <label for="task">${task}</label>
    <button type="button" onclick="removeTask(event)">X</button>
   </li>
`;

// retrive tasks from storage
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const renderTasks = () => {
    storedTasks.forEach(task => {
        taskList.insertAdjacentHTML('beforeend', createTaskItem(task));
    });
}

window.onload = renderTasks;

// add task to the list
const addTask = (event) => {
    event.preventDefault();

    const task = taskInput.value;
    const taskItem = createTaskItem(task);
    taskList.insertAdjacentHTML('beforeend', taskItem);

    storedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    addTaskForm.reset();
}

addTaskForm.addEventListener('submit', addTask);

// marking task as completed
const toggleTaskCompletion = (event) => {
    const taskItem = event.target.parentElement;
    const task = taskItem.querySelector('label');

    if (event.target.checked) {
        task.style.textDecoration = 'line-through'
    } else {
        task.style.textDecoration = 'none'
    }
}

// remove task
const removeTask = (event) => {
    const taskItem = event.target.parentElement;
    const task = taskItem.querySelector('label').value;

    removeTaskFromStorage(task);
    taskItem.remove();
}

const removeTaskFromStorage = (task) => {
    const taskIndex = storedTasks.indexOf(task);
    storedTasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));    
}