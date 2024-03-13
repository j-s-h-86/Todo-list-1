const newTaskButton = document.getElementById("addNewTaskToList");
newTaskButton.addEventListener("click", addTask);

class Tasks {
  task;
  isDone;

  constructor(task, isDone) {
    this.task = task;
    this.isDone = isDone;
  }
}

const theToDoList = document.getElementById("toDoList");
const theDoneTasks = document.getElementById("doneTasks");
const taskList = [
  new Tasks("Get rich or die trying.", false),
  new Tasks("Record the harshest album known to man.", false),
  new Tasks("Train the dog to ride the subway.", false),
  new Tasks("Go on Euro tour 2023.", true),
  new Tasks("Take the dog to the vet.", true),
  new Tasks("Get a new key tag for the front door.", true),
];

function createHTMLForTask(theTask) {
  if (theTask.isDone) return;

  let listItem = document.createElement("li");
  listItem.innerHTML = theTask.task;
  const theToDoList = document.getElementById("toDoList");
  const isDone = document.createElement("input");
  isDone.type = "checkbox";
  isDone.checked = theTask.isDone;
  isDone.addEventListener("change", () => markAsDone(theTask));
  theToDoList.appendChild(listItem);
  listItem.appendChild(isDone);
}

function createHTMLForDone(theTask) {
  if (!theTask.isDone) return;
  let listItem = document.createElement("li");
  listItem.className = "done";
  listItem.innerHTML = theTask.task;
  const theDoneTasks = document.getElementById("doneTasks");
  const isDone = document.createElement("input");
  isDone.type = "checkbox";
  isDone.checked = theTask.isDone;
  isDone.addEventListener("change", () => markAsDone(theTask));

  theDoneTasks.appendChild(listItem);
  listItem.appendChild(isDone);
}

function addTask() {
  const userInput = document.getElementById("newTask");
  const textFromUser = userInput.value;
  taskList.push(new Tasks(textFromUser, false));
  userInput.value = "";

  theToDoList.innerHTML = "";
  theDoneTasks.innerHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    createHTMLForTask(taskList[i]);
    createHTMLForDone(taskList[i]);
  }
  saveTaskList();
  loadTasklist();
}

function markAsDone(theTask) {
  loadTasklist();
  theTask.isDone = !theTask.isDone;
  theToDoList.innerHTML = "";
  theDoneTasks.innerHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    createHTMLForTask(taskList[i]);
    createHTMLForDone(taskList[i]);

    saveTaskList();
  }
}

function saveTaskList() {
  localStorage.setItem("tasklist", JSON.stringify(taskList));
}

function loadTasklist() {
  const taskListLS = localStorage.getItem("tasklist");
  let taskList = JSON.parse(taskListLS);
}

loadTasklist();

for (let i = 0; i < taskList.length; i++) {
  createHTMLForTask(taskList[i]);
  createHTMLForDone(taskList[i]);
}
