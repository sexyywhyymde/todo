const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");

// Listeners
document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    addNewTodo(todo.text, todo.isCompleted);
  });
});

form.addEventListener("submit", handleSubmit);
list.addEventListener("click", (e) => {
  const deleteButton = e.target.closest("button[name='delete']");
  const checkButton = e.target.closest("button[name='check']");
  if (deleteButton) {
    deleteButtonClick(e);
  } else if (checkButton) {
    checkButtonClick(e);
  }
});
// Helpers
function saveToLocalStorage() {
  const todos = [];
  const todoItems = document.querySelectorAll(".todo-list-item");
  todoItems.forEach((todoItem) => {
    const isCompleted = todoItem.classList.contains("completed");
    const todoText = todoItem.querySelector(".todo-item").textContent;
    console.log(todoItem);
    const todo = {
      text: todoText,
      isCompleted: isCompleted,
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoStatus(todoText, isCompleted) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.map((todo) => {
    console.log(todo);
    if (todo.text === todoText) {
      return { ...todo, isCompleted: isCompleted };
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function removeToLocalStorage(text) {
  if (!text) return;
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => {
    return todo.text !== text;
  });
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
                  <div> <button name="check"><i class="fa-solid fa-check"></i></button>
                   <button name="delete"><i class="fa-solid fa-trash"></i></button></div>`;
  li.classList.add("todo-list-item");
  list.appendChild(li);
  saveToLocalStorage();
}

// Event Handlers
function deleteButtonClick(e) {
  const todoItem = e.target.closest(".todo-list-item");
  if (todoItem) {
    todoItem.remove();
    const todo = todoItem.querySelector(".todo-item");
    removeToLocalStorage(todo.textContent);
    console.log(todo.textContent);
  }
}

function checkButtonClick(e) {
  const todoItem = e.target.closest(".todo-list-item");
  if (todoItem) {
    const todo = todoItem.querySelector(".todo-item");
    todoItem.classList.toggle("completed");
    const isCompleted = todoItem.classList.contains("completed");
    updateTodoStatus(todo.textContent, isCompleted);
  }
}
