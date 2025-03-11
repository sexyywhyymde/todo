const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");

// Listeners
document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    addNewTodo(todo.text);
  });
});

form.addEventListener("submit", handleSubmit);
list.addEventListener("click", (e) => {
  const deleteButton = e.target.closest("button[name='delete']");
  if (deleteButton) {
    deleteButtonClick(e);
  }
});
// Helpers
function saveToLocalStorage() {
  const todos = [];
  const todoItems = document.querySelectorAll(".todo-list-item");
  todoItems.forEach((todoItem) => {
    const todoText = document.querySelector(".todo-item");
    const todo = { text: todoText.textContent };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeToLocalStorage(text) {
  if(!text)return
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => {
    return todo.text !== text;
  });
  console.log(updatedTodos);
}

function handleSubmit(e) {
  e.preventDefault();
  if (input.value !== "") {
    addNewTodo(input.value);
  }
}

function addNewTodo(text) {
  const li = document.createElement("li");
  li.innerHTML = `<span class="todo-item">${text}</span>
                   <button name="delete">Удалить</button>`;
  li.classList.add("todo-list-item");
  list.appendChild(li);
  saveToLocalStorage();
}

// Event Handlers
function deleteButtonClick(e) {
  const todoItem = e.target.closest(".todo-list-item");
  console.log(todoItem)
  if (todoItem) {
    todoItem.remove();
    const todo = todoItem.querySelector(".todo-item");
    removeToLocalStorage(todo.text);
    
  }
}
