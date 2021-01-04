const todoForm = document.querySelector(".js-todoForm"),
  todoInput = document.querySelector(".js-todoInput"),
  todoList = document.querySelector(".js-todoList");
const TODO_LS = "todoList";

let toDos = [];

function saveTodo() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}
function handleDeleteBtn(e) {
  const btn = e.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanedTodo = toDos.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  toDos = cleanedTodo;
  saveTodo();
}

function paintTodos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", handleDeleteBtn);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  todoList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId,
  };
  toDos.push(todoObj);
  saveTodo();
}

function handleListSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodos(currentValue);
  todoInput.value = "";
}

function loadTodo() {
  const loadedTodo = localStorage.getItem(TODO_LS);
  if (loadedTodo !== null) {
    const parsedTodo = JSON.parse(loadedTodo);
    parsedTodo.forEach((todo) => {
      paintTodos(todo.text);
    });
  }
}

function init() {
  loadTodo();
  todoForm.addEventListener("submit", handleListSubmit);
}
init();
