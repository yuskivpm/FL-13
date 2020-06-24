/**
 * @typedef TodoItem
 * @type { object }
 * @property { string } text - task definition.
 * @property { boolean } done - signals that task has been completed.
 */

/**
 * @typedef TodoListState
 * @type { object }
 * @property { number } doneTasks - count of completed tasks.
 * @property { number } inProgressTasks - count of uncompleted tasks.
 * @property { TodoItem[] } todos - array of TodoItems.
 */

/**
 * @callback onUpdateCallback
 * onUpdate TodoList event
 * @param { TodoListState } state - internal state of TodoList
 */

/**
 * @callback onFilterCallback
 * onFilter TodoList event
 * @param { TodoItem } todoItem - item to check
 * @returns { boolean } it must return true if the item is to be displayed on the screen
 */

/**
 * @callback AddNewItem
 * it must be called to add a new item to the TodoList
 * @param { TodoItem } todoItem - new item to add to the TodoList
 */

/**
 * @callback RenderTodoList
 * it must be called to initiate TodoList render
 * @returns { jQuery } jQuery node that contains a TodoList
 */

/**
 * @typedef ControlCallbacks
 * @type { object }
 * @property { AddNewItem } addNewItem - it calls to add new item to TodoList.
 * @property { RenderTodoList } renderTodoList - it calls to render TodoList.
 */

/**
 * jQuery plugin for creating TodoList
 * @param { TodoItem[] } defaultTaskList - default list of tasks
 * @param { ControlCallbacks } controlCallbacks - an object that will receive functions to control the TodoList
 * @param { onUpdateCallback } onUpdate - it is called at any internal changes in the TodoList
 * @param { onFilterCallback } onFilter - it is called for all items inside TodoList to check if they should be displayed
 * @returns { jQuery } parent node of TodoList
 */
$.fn.todolist = function (defaultTaskList = [], controlCallbacks = {}, onUpdate = () => { }, onFilter = () => true) {
  const DONE = 'done';

  const state = {
    doneTasks: 0,
    inProgressTasks: 0,
    todos: defaultTaskList,
  };

  const modifyTasksCount = isDone => isDone ? state.doneTasks++ : state.inProgressTasks++;
  const getImmutableState = ({ doneTasks, inProgressTasks, todos } = state) => ({ doneTasks, inProgressTasks, todos: [...todos] });

  /**
   * create an HTML representation of TodoItem
   * <li class="item">
   *   <span class="item-text ${done ? DONE : ''}">${text}</span>
   *   <button class="item-remove">Remove</button>
   * </li>
   * @param { TodoItem } item
   * @returns { jQuery } parent node of TodoItem
   */
  const generateItem = item => {
    const { text, done } = item;
    const li = $('<li class="item"></li>');
    const span = $(`<span class="item-text ${done ? DONE : ''}">${text}</span>`).click(() => {
      span.toggleClass(DONE);
      updateTotals(!decrementItemsCount(item));
    });
    const button = $(`<button class="item-remove">Remove</button>`).click(() => {
      decrementItemsCount(item);
      state.todos.splice(state.todos.indexOf(item), 1);
      updateTotals();
      li.remove();
    });
    return this.append($(li.append(span).append(button)));
  };

  /**
   * update counts of done and inProgress tasks
   * fire onUpdate event
   * @param { boolean } isDone - status of the last modified task
   */
  function updateTotals(isDone) {
    if (isDone !== undefined) {
      modifyTasksCount(isDone);
    }
    onUpdate(getImmutableState());
  }

  /**
   * it is performed with any task modification to reduce the number of done / inProgress tasks
   * @param { TodoItem } item - modified task item
   * @returns { boolean } status of task
   */
  function decrementItemsCount(item) {
    const { done } = item;
    (item.done = !done) ? state.inProgressTasks-- : state.doneTasks--;
    return done;
  }

  /**
   * @callback AddNewItem
   * save callback to add new items
   * @param { TodoItem } item - task item to add to the TodoList
   * @returns { jQuery } parent node of created TodoItem
   */
  controlCallbacks.addNewItem = item => {
    state.todos.push(item);
    updateTotals(item.done);
    return generateItem(item);
  };

  /**
   * @callback RenderTodoList
   * save callback to render TodoList
   * @returns { jQuery } parent node of TodoList
   */
  controlCallbacks.renderTodoList = () => {
    this.empty();
    state.todos.forEach(item => onFilter({ ...item }) && generateItem(item));
    return this;
  };

  defaultTaskList.forEach(({ done }) => modifyTasksCount(done));
  updateTotals();
  return controlCallbacks.renderTodoList();
};

/* **************************
 *                          *
 * usage of todolist plugin *
 *                          *
 * **************************/

const DEFAULT_TODOS = [
  {
    text: 'Buy milk',
    done: false,
  },
  {
    text: 'Play with dog',
    done: true,
  },
];

const FILTER_DONE_UNDEFINED_INDEX = 2;
const FILTER_DONE_CLASSES = ['done-false', 'done-true', 'done-undefined'];

let lastFilterText = '';
let lastFilterDone = FILTER_DONE_UNDEFINED_INDEX;

const STORAGE_KEY = 'todos';

const todoListHandlers = {}; // handlers to control TodoList

const $list = $('#list');
const $input = $('#add-input');
const $add = $('#add-submit');

const $done = $('#done');
const $inProgress = $('#in-progress');
const $total = $('#total');

const $filterByText = $('#search-input').on('input', () => renderWithFilter({ filterText: $filterByText.val() }));
const $filterByDone = $('#done-input').click(() => {
  $filterByDone.checkedStatus = ($filterByDone.checkedStatus + 1) % 3;
  $filterByDone.attr('class', FILTER_DONE_CLASSES[$filterByDone.checkedStatus]);
  renderWithFilter({ filterDone: $filterByDone.checkedStatus });
});

$filterByDone.checkedStatus = FILTER_DONE_UNDEFINED_INDEX;

function renderWithFilter({ filterText = lastFilterText, filterDone = lastFilterDone } = {}) {
  lastFilterText = filterText.toLowerCase();
  lastFilterDone = filterDone;
  todoListHandlers.renderTodoList();
}

const isPassFilter = ({ text, done }) =>
  (!lastFilterText || text.toLowerCase().includes(lastFilterText)) &&
  (lastFilterDone === FILTER_DONE_UNDEFINED_INDEX || lastFilterDone == done);

function getDefaultList(defaultList = []) {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultList;
}

function updateTotals({ doneTasks, inProgressTasks, todos }) {
  $done.text(doneTasks);
  $inProgress.text(inProgressTasks);
  $total.text(doneTasks + inProgressTasks);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function handleAddEvent(event) {
  event.preventDefault();
  const text = $input.val().trim();
  if (text) {
    todoListHandlers.addNewItem({ text, done: false });
  } else {
    alert('Enter task text');
  }
}

$add.click(handleAddEvent);
$input.on('keypress', event => {
  if (event.which == 13) {
    handleAddEvent(event);
  }
});

$list.todolist(getDefaultList(DEFAULT_TODOS), todoListHandlers, updateTotals, isPassFilter);
