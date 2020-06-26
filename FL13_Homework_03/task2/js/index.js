/**
 * @typedef TodoItem
 * @type { object }
 * @property { string } text - task definition.
 * @property { boolean } done - signals that task has been completed.
 */

/**
  * @method AddNewItem TodoList's method - add new items
  * @param { TodoItem } item - task item to add to the TodoList
  * @returns { jQuery } parent node of created TodoItem
  */

/**
 * @method RenderTodoList TodoList's method - render TodoList
 * @returns { jQuery } parent node of TodoList
 */

/**
 * @typedef TodoList
 * @type { jQuery }
 * @property { number } doneTasks - count of completed tasks
 * @property { number } inProgressTasks - count of uncompleted tasks
 * @property { number } totalTasks - count of tasks
 * @property { string } todos - stringified array of todos items
 * @method AddNewItem
 * @method RenderTodoList
 */

/**
* jQuery plugin for creating TodoList
* @param { TodoItem[] } defaultTaskList - default list of tasks
* @returns { TodoList } parent jQuery node of TodoList
*/
$.fn.todolist = function (defaultTaskList = []) {
  const DONE_CLASS = 'done';
  const DONE_STATUS_IS_UNDEFINED = 2;

  let doneTasks = 0;
  let inProgressTasks = 0;
  let todos = defaultTaskList.map(item => ({ ...item })); // clone it

  let lastFilterText = '';
  let lastFilterDone = DONE_STATUS_IS_UNDEFINED;

  const modifyTasksCount = isDone => isDone ? doneTasks++ : inProgressTasks++;

  const isPassFilter = ({ text, done }) =>
    (!lastFilterText || text.toLowerCase().includes(lastFilterText)) &&
    (lastFilterDone === DONE_STATUS_IS_UNDEFINED || lastFilterDone == done);

  const updateTotals = isDone => {
    if (isDone !== undefined) {
      modifyTasksCount(isDone);
    }
    this.triggerHandler('update');
  }

  const decrementItemsCount = item => {
    const { done } = item;
    (item.done = !done) ? inProgressTasks-- : doneTasks--;
    return done;
  }

  const generateItem = item => {
    const { text, done } = item;
    const li = $('<li class="item"></li>');
    const span = $(`<span class="item-text ${done ? DONE_CLASS : ''}">${text}</span>`)
      .click(() => {
        span.toggleClass(DONE_CLASS);
        updateTotals(!decrementItemsCount(item));
      });
    const button = $(`<button class="item-remove">Remove</button>`)
      .click(() => {
        decrementItemsCount(item);
        todos.splice(todos.indexOf(item), 1);
        updateTotals();
        li.remove();
      });
    return this.append(li.append(span).append(button));
  };

  Object.defineProperties(this, {
    doneTasks: { get: () => doneTasks },
    inProgressTasks: { get: () => inProgressTasks },
    totalTasks: { get: () => doneTasks + inProgressTasks },
    todos: { get: () => JSON.stringify(todos) },
    renderTodoList: {
      value: ({ filterText = lastFilterText, filterDone = lastFilterDone } = {}) => {
        lastFilterText = filterText.toLowerCase();
        lastFilterDone = filterDone;
        this.empty();
        todos.forEach(item => isPassFilter(item) && generateItem(item));
        return this;
      }
    },
    addNewItem: {
      value: item => {
        todos.push(item);
        updateTotals(item.done);
        return generateItem(item);
      }
    },
  });

  defaultTaskList.forEach(({ done }) => modifyTasksCount(done));
  setTimeout(updateTotals, 0);
  return this.renderTodoList();
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

const DONE_STATUS_IS_UNDEFINED = 2;
const DONE_FILTER_CLASSES = ['done-false', 'done-true', 'done-undefined'];

const STORAGE_KEY = 'todos';

const $done = $('#done');
const $inProgress = $('#in-progress');
const $total = $('#total');

const $list = $('#list')
  .todolist(getDefaultList(DEFAULT_TODOS))
  .on('update', updateTotals);

const $input = $('#add-input')
  .on('keypress', event => {
    if (event.which == 13) {
      handleAddEvent(event);
    }
  });

const $add = $('#add-submit')
  .click(handleAddEvent);

const $filterByText = $('#search-input')
  .on('input', () => $list.renderTodoList({ filterText: $filterByText.val() }));

const $filterByDone = $('#done-input')
  .click(() => {
    $filterByDone.checkedStatus = ($filterByDone.checkedStatus + 1) % 3;
    $filterByDone.attr('class', DONE_FILTER_CLASSES[$filterByDone.checkedStatus]);
    $list.renderTodoList({ filterDone: $filterByDone.checkedStatus });
  });

$filterByDone.checkedStatus = DONE_STATUS_IS_UNDEFINED;

function getDefaultList(defaultList = []) {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultList;
}

function handleAddEvent(event) {
  event.preventDefault();
  const text = $input.val().trim();
  if (text) {
    $list.addNewItem({ text, done: false });
    $input.val('');
  } else {
    alert('Enter task text');
  }
}

function updateTotals() {
  $done.text($list.doneTasks);
  $inProgress.text($list.inProgressTasks);
  $total.text($list.totalTasks);
  localStorage.setItem(STORAGE_KEY, $list.todos);
}
