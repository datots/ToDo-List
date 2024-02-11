// MAIN CONTAINER
const mainContainer = document.createElement("section");
mainContainer.classList.add("centered-main-page-element");
document.body.appendChild(mainContainer);

const mainH1 = document.createElement("hi");
mainH1.setAttribute("id", "topSectionForAddingElementToList");

mainContainer.appendChild(mainH1);

const subH1 = document.createElement("h1");
subH1.textContent = "Add Item";
subH1.setAttribute("for", "new-task");
mainH1.appendChild(subH1);

const subSection = document.createElement("section");
subSection.classList.add("task-row-wrapper");
mainH1.appendChild(subSection);

let input = document.createElement("input");
input.setAttribute("id", "new-task");
input.setAttribute("type", "text");
input.classList.add("task");
subSection.appendChild(input);

const button = document.createElement("button");
button.textContent = "Add";
subSection.appendChild(button);

const secondH1 = document.createElement("h1");
secondH1.textContent = "Todo";
mainContainer.appendChild(secondH1);

let userList = document.createElement("ul");
userList.setAttribute("id", "incompleteTasks");
mainContainer.appendChild(userList);

const thirdH1 = document.createElement("h1");
thirdH1.textContent = "Completed";
mainContainer.appendChild(thirdH1);

let secondUserList = document.createElement("ul");
secondUserList.setAttribute("id", "completed-tasks");
mainContainer.appendChild(secondUserList);
// MAIN CONTAINER

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incompleteTasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");

  var checkBox = document.createElement("input");

  var label = document.createElement("section");

  var editInput = document.createElement("input");

  var editButton = document.createElement("button");

  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("button");

  deleteButtonImg.style.fontSize = "25px";

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.textContent = "X";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log("Add Task...");

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
