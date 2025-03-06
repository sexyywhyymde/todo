const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");

// Listeners
document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos"))||[]

  todos.forEach((todo) => {
    addNewTodo(todo.text);
  });
});

form.addEventListener("click", handleSubmit);

// Helpers
function saveToLocalStorage() {
  const todos = [];
  const todoItems = document.querySelectorAll(".todo-list-item");
  todoItems.forEach((todoItem) => {
    const todoText = document.querySelector(".todo-item");
    const todo = { text: todoText.textContent };
    todos.push(todo)
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function handleSubmit(e) {
  e.preventDefault();
  if (input.value !== "") {
    addNewTodo(input.value);
  }
}

function addNewTodo(text) {
  const li = document.createElement("li");
  li.innerHTML = `<span class="todo-item">${text}</span>`;
  li.classList.add("todo-list-item");
  list.appendChild(li);
  saveToLocalStorage();
}
