'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed'),
  todoRemove = document.querySelector('.todo-remove'),
  btn = document.querySelector('#add'),
  todo = document.querySelector('.todo');

let todoData = [];

const showArr = function () {
  if (localStorage.getItem('storedData')) {
    todoData = JSON.parse(localStorage.getItem('storedData'));
  }
};

const updateLocStorage = () => {
  localStorage.setItem('storedData', JSON.stringify(todoData));
};


const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }


    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function () {
      todoData = todoData.filter(el => el !== item);
      render();
    });

  });
  updateLocStorage();

};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (headerInput.value === '') {
    return;
  }
  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  headerInput.value = '';

  todoData.push(newTodo);
  render();
});


showArr();
render();