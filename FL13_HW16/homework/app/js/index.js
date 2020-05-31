const BASE_URL = 'http://localhost:3000';

const TABLE_HEADER_NAMES = ['ID', 'Name', 'Full Name', 'Update', 'Delete'];

const CREATE_USER_INPUTS = [
  { type: 'text', id: 'name', name: 'name', placeholder: 'Name', required: 'required' },
  { type: 'text', id: 'username', name: 'username', placeholder: 'Full Name', required: 'required' },
  { type: 'submit', name: 'submit', value: 'Add New User' }
];

const VALIDATION_FAILED = { message: 'All fields are required' };

const headers = { 'Content-type': 'application/json; charset=UTF-8' };
const GET_USERS = { method: 'GET', uri: '/users', code: 200 };
const CREATE_USER = { method: 'POST', uri: '/users', code: 201, headers };
const UPDATE_USER = { method: 'PUT', uri: '/users/', code: 204, headers };
const DELETE_USER = { method: 'DELETE', uri: '/users/', code: 204, headers: { 'Authorization': 'admin' } };

const appContainer = document.getElementById('app-container');

let newUserForm;
let errorMessageElement;
let spinnerElement;
let usersTableBody;
let cachedDb = [];

const getId = ({ target: { parentElement: { parentElement: { id } } } }) => id;

const createElement = (nodeType, options = {}, parent, events = [], ...children) => {
  const element = Object.assign(document.createElement(nodeType), options);
  events.forEach(([eventName, handler]) => element.addEventListener(eventName, handler));
  element.append(...children);
  return parent ? parent.appendChild(element) : element;
};

const createElementShort = (nodeType, ...children) => createElement(nodeType, {}, null, [], ...children);

const createElementWithText = (nodeType, textValue, parent, options, events) =>
  createElement(nodeType, options, parent, events, document.createTextNode(textValue));

const createInputCellElement = (name, value, type = 'text', events) =>
  createElementShort('td',
    createElement('input', { type, name, value, required: 'required' }, undefined, events)
  );

const createRow = ({ id, name, username }) =>
  createElement('tr', { id }, usersTableBody, [],
    createElementWithText('td', id),
    createInputCellElement('name', name),
    createInputCellElement('username', username),
    createInputCellElement('', 'Update', 'button', [['click', updateUser]]),
    createInputCellElement('', 'Delete', 'button', [['click', deleteUser]])
  );

function renderPage() {
  createElementWithText('h2', 'User management', appContainer);
  newUserForm = createElement('form', { id: 'add-user' }, appContainer, [['submit', newUser]],
    ...CREATE_USER_INPUTS.map(options => createElement('input', options))
  );
  createElement('div', { className: 'spinner-wrapper' }, appContainer, [],
    spinnerElement = createElementWithText('div', 'Loading...', undefined, { className: 'spinner' }),
    errorMessageElement = createElement('h2', { id: 'error-message' })
  );
  createElementWithText('h2', 'Users', appContainer);
  createElement('table', { id: 'users' }, appContainer, [],
    createElementShort('thead',
      createElementShort('tr',
        ...TABLE_HEADER_NAMES.map(name => createElementWithText('th', name))
      )
    ),
    usersTableBody = createElement('tbody', {})
  );
}

function setSpinnerStatus(message) {
  spinnerElement.style.display = message ? 'inline-block' : 'none';
  defaultErrorHandler({ message });
}

function initialization() {
  renderPage();
  window.addEventListener('load', () => getAllUsers('Loading...'));
}

function parseJson(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

function defaultErrorHandler({ status, statusText, responseText, message = 'Status: Online' } = {}) {
  if (status >= 0) {
    errorMessageElement.textContent = `Error: response code: ${status}, status text: ${statusText}, ` +
      `response text: ${responseText}`;
    errorMessageElement.className = 'error-text';
  } else {
    errorMessageElement.textContent = message;
    errorMessageElement.className = 'status-text';
  }
}

const fetchData = (
  spinnerStatus,
  { uri, method, headers = {}, code },
  { body, id = '' } = {}
) => new Promise((resolve, reject) => {
  setSpinnerStatus(spinnerStatus);
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      setSpinnerStatus();
      if (httpRequest.status === code) {
        defaultErrorHandler();
        resolve(httpRequest.responseText);
      } else {
        reject(httpRequest);
      }
    }
  }
  httpRequest.open(method, `${BASE_URL}${uri}${id}`, true);
  Object.entries(headers).forEach(([key, value]) => httpRequest.setRequestHeader(key, value));
  httpRequest.send(body);
});

const fetchAllUsers = (spinnerStatus = 'Refresh') =>
  fetchData(spinnerStatus, GET_USERS)
    .then(data => parseJson(data) || [])
    .catch(defaultErrorHandler);

const getAllUsers = spinnerStatus =>
  fetchAllUsers(spinnerStatus)
    .then((users = []) => {
      usersTableBody.innerHTML = '';
      cachedDb = users.map(user => {
        user.node = createRow(user);
        return user;
      });
    });

const getCurUserButtons = ({ node }) => node.querySelectorAll('input[type=button]') || [];

const setDisableStatus = (buttons, status) =>
  buttons.forEach(button => {
    button.disabled = status;
  });

const loadFormData = form =>
  Array.prototype.reduce.call(
    form.querySelectorAll('input[type=text]'),
    (acc, { name, value }) => {
      acc[name] = value.trim();
      return acc;
    }, {}
  );

const isValidUser = ({ name, username }) =>
  name && username ? true : defaultErrorHandler(VALIDATION_FAILED);

const sendUserToServer = (saveType, requestType, startPhase, finallyPhase, body, id) =>
  fetchData(`Attempt to ${saveType} user's record`, requestType, { id, body: JSON.stringify(body) })
    .then(startPhase)
    .then(() => fetchAllUsers())
    .then(compareChanges)
    .catch(defaultErrorHandler)
    .finally(finallyPhase);

const getUserById = id => cachedDb.find(({ id: curId }) => curId === id);

function deleteUser(event) {
  const id = getId(event);
  const selectedUser = getUserById(id);
  if (selectedUser) {
    let buttons = getCurUserButtons(selectedUser);
    setDisableStatus(buttons, true);
    sendUserToServer(
      'delete',
      DELETE_USER,
      () => {
        selectedUser.node.remove();
        buttons = [];
        const selectedUserIndex = cachedDb.indexOf(selectedUser);
        if (selectedUserIndex >= 0) {
          cachedDb.splice(selectedUserIndex, 1);
        }
      },
      () => setDisableStatus(buttons, false),
      undefined,
      id
    );
  }
}

function updateUser(event) {
  const body = loadFormData(event.target.parentElement.parentElement);
  if (isValidUser(body)) {
    const id = getId(event);
    const selectedUser = getUserById(id);
    if (!selectedUser || body.name === selectedUser.name && body.username === selectedUser.username) {
      return defaultErrorHandler({ message: 'Nothing to save' });
    }
    const buttons = getCurUserButtons(selectedUser);
    setDisableStatus(buttons, true);
    sendUserToServer(
      'update',
      UPDATE_USER,
      () => {
        selectedUser.name = body.name;
        selectedUser.username = body.username;
      },
      () => setDisableStatus(buttons, false),
      body,
      id
    );
  }
}

function newUser(event) {
  event.preventDefault();
  const body = loadFormData(newUserForm);
  if (isValidUser(body)) {
    newUserForm['submit'].disabled = true;
    sendUserToServer(
      'create',
      CREATE_USER,
      undefined,
      () => {
        newUserForm['name'].value = '';
        newUserForm['username'].value = '';
        newUserForm['submit'].disabled = false;
      },
      body
    );
  }
}

function updateField(user, fieldName, newValue) {
  if (user[fieldName] !== newValue) {
    user[fieldName] = newValue;
    user.querySelector(`input[name=${fieldName}]`).value = newValue;
  }
}

function compareChanges(newUsersDb) {
  cachedDb = cachedDb
    .map(user => {
      const newUser = newUsersDb.find(({ id }) => id === user.id);
      if (newUser) {
        updateField(user, 'name', newUser.name);
        updateField(user, 'username', newUser.username);
        newUser.id = '';
      } else {
        user.node.remove();
        user.id = '';
      }
      return user;
    })
    .filter(({ id }) => id);
  newUsersDb.forEach(aUser => {
    if (aUser.id) {
      aUser.node = createRow(aUser);
      cachedDb.push(aUser);
    }
  });
}

initialization();
