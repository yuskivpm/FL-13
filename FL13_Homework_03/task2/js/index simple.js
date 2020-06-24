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

const FILTER_DONE_UNDEFINED = 2;
const FILTER_DONE_CLASSES = ['done-false', 'done-true', 'done-undefined'];

const DONE = 'done';
const STORAGE_KEY = 'todos';

let lastFilterText = '';
let lastFilterDone = FILTER_DONE_UNDEFINED;

let state = {
  doneTasks: 0,
  inProgressTasks: 0,
  todos: DEFAULT_TODOS,
};

const $list = $('#list');
const $input = $('#add-input');
const $add = $('#add-submit');

const $done = $('#done');
const $inProgress = $('#in-progress');
const $total = $('#total');

const $filterByText = $('#search-input').on('input', () => $list.renderTodoList({ filterText: $filterByText.val() }));
const $filterByDone = $('#done-input').click(() => {
  $filterByDone.checkedStatus = ($filterByDone.checkedStatus + 1) % 3;
  $filterByDone.attr('class', FILTER_DONE_CLASSES[$filterByDone.checkedStatus]);
  $list.renderTodoList({ filterDone: $filterByDone.checkedStatus });
});

$filterByDone.checkedStatus = FILTER_DONE_UNDEFINED;

$.fn.generateItem = function (item) {
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

$.fn.addItem = function (item) {
  state.todos.push(item);
  updateTotals(item.done);
  return this.generateItem(item);
};

const passFilter = ({ text, done }) =>
  (!lastFilterText || text.toLowerCase().includes(lastFilterText)) &&
  (lastFilterDone === FILTER_DONE_UNDEFINED || lastFilterDone == done);

$.fn.renderTodoList = function ({ filterText = lastFilterText, filterDone = lastFilterDone } = {}) {
  lastFilterText = filterText.toLowerCase();
  lastFilterDone = filterDone;
  this.empty();
  state.todos.forEach(item => passFilter(item) && this.generateItem(item));
  return this;
};

function updateTotals(isDone) {
  if (isDone !== undefined) {
    isDone ? state.doneTasks++ : state.inProgressTasks++;
  }
  $done.text(state.doneTasks);
  $inProgress.text(state.inProgressTasks);
  $total.text(state.doneTasks + state.inProgressTasks);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function decrementItemsCount(itemData) {
  const { done } = itemData;
  itemData.done = !done;
  done ? state.doneTasks-- : state.inProgressTasks--;
  return done;
}

$add.click(event => {
  event.preventDefault();
  const text = $input.val().trim();
  if (text) {
    $list.addItem({ text, done: false });
  } else {
    alert('Enter task text');
  }
});

(function () {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    state = JSON.parse(saved);
  }
  state.todos.forEach(({ done }) => (done ? state.doneTasks++ : state.inProgressTasks++));
  $list.renderTodoList();
  updateTotals();
})();
