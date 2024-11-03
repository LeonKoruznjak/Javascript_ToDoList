//Selectors
const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event listeners
document.addEventListener("DOMContentLoaded", getToDos);
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterToDo);

//Functions

function addToDo(event) {
  event.preventDefault(); //sprječava form da se submita

  //ToDo Div
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo"); //Kada korisnik unese novi zadatak i klikne na gumb za dodavanje, stvara se novi element li (stavku to-do) i dodaje mu klasu todo.
  //Create LI
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  newToDo.classList.add("new-item");
  toDoDiv.appendChild(newToDo); //dodavanje elementa newToDo kao dijela elementa toDoDiv
  //add todo to local storage
  saveLocalToDo(toDoInput.value);
  //Check button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>'; //U JavaScript-u, ako koristim dvostruke navodnike za definiranje stringa, ne možeš koristiti dvostruke navodnike unutar tog stringa bez da ih prethodno escape-iraš
  completedButton.classList.add("complete-button");
  toDoDiv.appendChild(completedButton);

  //Delete button
  const deleteButtton = document.createElement("button");
  deleteButtton.innerHTML = '<i class="fas fa-trash"></i>'; //U JavaScript-u, ako koristim dvostruke navodnike za definiranje stringa, ne možeš koristiti dvostruke navodnike unutar tog stringa bez da ih prethodno escape-iraš
  deleteButtton.classList.add("delete-button");
  toDoDiv.appendChild(deleteButtton);

  //Append to list

  toDoList.appendChild(toDoDiv);

  //clear text from input
  toDoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // deleete to do
  if (item.classList[0] === "delete-button") {
    const toDo = item.parentElement;
    //animation
    toDo.classList.add("fall");
    removeLocalTodos(toDo);
    toDo.addEventListener("transitionend", function () {
      toDo.remove();
    });
  }

  //check mark

  if (item.classList[0] === "complete-button") {
    const toDo = item.parentElement;
    toDo.classList.toggle("completed");
  }
}

function filterToDo(e) {
  const todos = Array.from(toDoList.children); // Converts child nodes to an array and ignores text nodes

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalToDo(todo) {
  //provjeriti jel ima vec nekih todova

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //ToDo Div
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo"); //Kada korisnik unese novi zadatak i klikne na gumb za dodavanje, stvara se novi element li (stavku to-do) i dodaje mu klasu todo.
    //Create LI
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("new-item");
    toDoDiv.appendChild(newToDo); //dodavanje elementa newToDo kao dijela elementa toDoDiv

    //Check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; //U JavaScript-u, ako koristim dvostruke navodnike za definiranje stringa, ne možeš koristiti dvostruke navodnike unutar tog stringa bez da ih prethodno escape-iraš
    completedButton.classList.add("complete-button");
    toDoDiv.appendChild(completedButton);

    //Delete button
    const deleteButtton = document.createElement("button");
    deleteButtton.innerHTML = '<i class="fas fa-trash"></i>'; //U JavaScript-u, ako koristim dvostruke navodnike za definiranje stringa, ne možeš koristiti dvostruke navodnike unutar tog stringa bez da ih prethodno escape-iraš
    deleteButtton.classList.add("delete-button");
    toDoDiv.appendChild(deleteButtton);

    //Append to list

    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Find the index of the item to remove
  const todoIndex = todos.indexOf(todo.innerText); // Using innerText to match the content
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1); // Remove the item from the array
  }

  // Update localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}
