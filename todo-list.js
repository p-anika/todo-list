const todoList = JSON.parse(localStorage.getItem('storedTodoList')) || []; //TAKE OUT OF LOCAL STORAGE AND SAVE HERE

renderTodoList();

function renderTodoList () {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    // code above is shortcut for the two lines of code below
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="js-delete-todo-button delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  // use querySelectorAll to get an array of all the delete buttons on page
  // loops through delete buttons and add event listeners that see when a delete button has been clicked
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        localStorage.setItem('storedTodoList', JSON.stringify(todoList));
        renderTodoList();
      });
    });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo () {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate
    // since property and variable names are equal, use shortcut above instead of code below
    // name: name,
    // dueDate: dueDate
  });

  //SAVE IN LOCAL STORAGE
  localStorage.setItem('storedTodoList', JSON.stringify(todoList));

  inputElement.value = '';

  renderTodoList();
}