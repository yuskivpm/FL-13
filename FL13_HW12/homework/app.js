const root = document.getElementById('root');

const APP_BOOKS_STORAGE_KEY = 'books';

const DYNAMIC_PAGE_ID = 'dynamic-page';

const EDIT_FORM_ID = 'new-id';
const EDIT_FORM_NAME = 'new-name';
const EDIT_FORM_AUTHOR = 'new-author';
const EDIT_FORM_IMAGE = 'new-image';
const EDIT_FORM_PLOT = 'new-plot';

const ALERT_TIMEOUT = 300;

const MAX_PARAMETERS_COUNT = 2;

const COMMAND_RENDER_EMPTY_PAGE = 0;
const COMMAND_ADD_BOOK = COMMAND_RENDER_EMPTY_PAGE + 1;
const COMMANDS = [
  { command: '', render: () => createElementWithText('p', 'Nothing selected') },
  { command: 'add', render: renderEditPage },
  { command: 'preview', render: renderPreviewPage },
  { command: 'edit', render: renderEditPage }
];

const EMPTY_BOOK = { id: '', name: '', author: '', url: '', plot: '' };
const BOOK_HOLDER_CLASS = { className: 'book-holder' };

const books = loadBooksFromStorage();
let maxId = books.reduce((max, { id }) => Math.max(max, id), 0);

const getBookById = bookId => books.find(({ id }) => id === bookId);
const fillElement = (target, source) => Object.assign(target, source);
const createElement = document.createElement.bind(document);

const booksListPage = root.appendChild(createElement('div'));
const booksListElement = booksListPage.appendChild(createElement('div'));
const dynamicPage = fillElement(root.appendChild(createElement('div')), { className: 'flex' });

generateBooksElements();
window.addEventListener('popstate', handleUrlChange);
handleUrlChange();

function loadBooksFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(APP_BOOKS_STORAGE_KEY));
  } catch (e) {
    return {};
  }
}

function generateBooksElements() {
  booksListPage.className = 'flex';
  booksListElement.className = 'books-list';
  books.forEach(renderBookItem);
  booksListPage.appendChild(renderLink('add', location.pathname, 'Add'));
}

function renderBookItem(book) {
  const bookHolder = fillElement(booksListElement.appendChild(createElement('div')), BOOK_HOLDER_CLASS);
  book.nameElement = bookHolder.appendChild(renderLink('preview', `?id=${book.id}`, book.name));
  bookHolder.appendChild(renderLink('edit', `?id=${book.id}`, 'Edit'));
}

function renderLink(hash, prefix, text) {
  const link = fillElement(createElementWithText('a', text), { className: `${hash}-id`, href: `${prefix}#${hash}` });
  link.addEventListener('click', handleClick);
  return link;
}

function createElementWithText(elementType, elementText) {
  const element = createElement(elementType);
  element.appendChild(document.createTextNode(elementText));
  return element;
}

function handleClick(event) {
  history.pushState(null, null, event.currentTarget.href);
  handleUrlChange(event);
}

function getCommandFromUrl() {
  const hash = location.hash.substr(1);
  const search = location.search.substr(1);
  const commandIndex = COMMANDS.findIndex(({ command }) => command === hash);
  if (commandIndex > COMMAND_RENDER_EMPTY_PAGE && search.indexOf('&') < 0) {
    if (commandIndex === COMMAND_ADD_BOOK) {
      return { commandId: search.length ? COMMAND_RENDER_EMPTY_PAGE : COMMAND_ADD_BOOK };
    }
    const param = search.split('=');
    const hasCorrectId = param.length === MAX_PARAMETERS_COUNT && param[0] === 'id' && getBookById(param[1]);
    if (hasCorrectId) {
      return { commandId: commandIndex, bookId: param[1] };
    }
  }
  return { commandId: COMMAND_RENDER_EMPTY_PAGE };
}

function handleUrlChange(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
    event.stopPropagation();
  }
  const { commandId, bookId } = getCommandFromUrl();
  dynamicPage.innerHTML = '';
  dynamicPage.appendChild(COMMANDS[commandId].render(bookId));
  const activeId = `?id=${bookId}#preview`;
  booksListPage.querySelectorAll('a.active').forEach(({ classList }) => classList.remove('active'));
  booksListPage.querySelectorAll(`a[href$="${activeId}"]`).forEach(({ classList }) => classList.add('active'));
  if (commandId === COMMAND_RENDER_EMPTY_PAGE && (location.search.length > 1 || location.hash.length > 1)) {
    history.replaceState(null, null, location.pathname);
  }
}

function renderPreviewPage(bookId) {
  const { name, author, url, plot } = getBookById(bookId);
  const previewPage = fillElement(createElement('div'), { id: DYNAMIC_PAGE_ID });
  previewPage.appendChild(createElementWithText('h1', name));
  previewPage.appendChild(createElementWithText('h2', author));
  previewPage.appendChild(createElement('img')).src = url;
  previewPage.appendChild(createElementWithText('p', plot));
  return previewPage;
}

function renderButton(buttonCaption, onClickHandler, parentElement) {
  const buttonElement = parentElement.appendChild(createElement('input'));
  fillElement(buttonElement, { type: 'button', value: buttonCaption, className: 'new-button' });
  buttonElement.addEventListener('click', onClickHandler);
}

function renderLabeledInput(id, labelName, value, parentElement, inputType = 'input') {
  parentElement.appendChild(createElementWithText('label', labelName)).htmlFor = id;
  parentElement.appendChild(createElement('br'));
  fillElement(parentElement.appendChild(createElement(inputType)), { id, required: true, value });
  parentElement.appendChild(createElement('br'));
}

function renderEditPage(bookId) {
  const { id, name, author, url, plot } = getBookById(bookId) || EMPTY_BOOK;
  const editFormPage = fillElement(createElement('form'), { id: DYNAMIC_PAGE_ID });
  fillElement(editFormPage.appendChild(createElement('input')), { id: EDIT_FORM_ID, hidden: true, value: id });
  renderLabeledInput(EDIT_FORM_NAME, 'Book name', name, editFormPage);
  renderLabeledInput(EDIT_FORM_AUTHOR, 'Author name', author, editFormPage);
  renderLabeledInput(EDIT_FORM_IMAGE, 'Image url', url, editFormPage);
  renderLabeledInput(EDIT_FORM_PLOT, 'Plot', plot, editFormPage, 'textarea');
  const buttonsDiv = fillElement(editFormPage.appendChild(createElement('div')), { id: 'buttons' });
  renderButton('Save', saveBook, buttonsDiv);
  renderButton('Cancel', cancelSavingBook, buttonsDiv);
  return editFormPage;
}

function cancelSavingBook() {
  if (confirm('Discard changes?')) {
    history.back();
  }
}

function saveBook() {
  const editFormPage = document.forms[DYNAMIC_PAGE_ID];
  const name = editFormPage[EDIT_FORM_NAME].value.trim();
  const author = editFormPage[EDIT_FORM_AUTHOR].value.trim();
  const url = editFormPage[EDIT_FORM_IMAGE].value.trim();
  const plot = editFormPage[EDIT_FORM_PLOT].value.trim();
  const book = { name, author, url, plot };
  if (name && author && plot && url.startsWith('http')) {
    const id = editFormPage[EDIT_FORM_ID].value.trim();
    if (id) {
      const editedBook = getBookById(id);
      fillElement(editedBook, book);
      book.nameElement = editedBook.nameElement;
      book.nameElement.textContent = name;
      setTimeout(() => alert('Book successfully updated'), ALERT_TIMEOUT);
    } else {
      book.id = `${++maxId}`;
      books.push(book);
      renderBookItem(book);
    }
    localStorage.setItem(APP_BOOKS_STORAGE_KEY, JSON.stringify(books));
    handleClick({ currentTarget: book.nameElement });
  } else {
    alert('All field required');
  }
}
