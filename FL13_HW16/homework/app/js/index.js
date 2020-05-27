const BASE_URL = 'http://localhost:3000';

const TABLE_HEADER_NAMES = ['ID', 'Name', 'Full Name', 'Update', 'Delete'];

const CREATE_USER_INPUTS = [
  { type: 'text', id: 'name', name: 'name', placeholder: 'Name', required: 'required' },
  { type: 'text', id: 'username', name: 'username', placeholder: 'Full Name', required: 'required' },
  { type: 'submit', name: 'submit', value: 'Add New User' }
];

const GET_USERS = {
  method: 'GET',
  uri: '/users',
  code: 200
};
const CREATE_USER = {
  method: 'POST',
  uri: '/users',
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  code: 201
};
const UPDATE_USER = {
  method: 'PUT',
  uri: '/users/',
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  code: 204
};
const DELETE_USER = {
  method: 'DELETE',
  uri: '/users/',
  headers: { 'Authorization': 'admin' },
  code: 204
};

const REFRESH_SPINNER_STATUS = 'Refresh';
const EMPTY_MESSAGE = 'Online';

const appContainer = document.getElementById('app-container');
let newUserForm;
let errorMessageElement;
let usersTableBody;
let cachedDb = [];

const getId = ({ target: { parentElement: { parentElement: { id } } } }) => id;

const createElement = (nodeType, options = {}, parent, events = [], ...children) => {
  const element = Object.assign(document.createElement(nodeType), options);
  events.forEach(([eventName, handler]) => element.addEventListener(eventName, handler));
  children.forEach(child => element.appendChild(child));
  return parent ? parent.appendChild(element) : element;
};

const createElementShort = (nodeType, ...children) => createElement(nodeType, {}, null, [], ...children);

const createElementWithText = (nodeType, textValue, parent, options, events) =>
  createElement(nodeType, options, parent, events, document.createTextNode(textValue));

const createInputCellElement = (name, value, type = 'text', events) =>
  createElementShort('td',
    createElement('input', { type, name, value }, undefined, events)
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
  errorMessageElement = createElement('h2', { id: 'error-message' }, appContainer);
  createElementWithText('h2', 'Users', appContainer);
  usersTableBody = createElement('tbody', {},
    createElement('table', { id: 'users' }, appContainer, [],
      createElementShort('thead',
        createElementShort('tr',
          ...TABLE_HEADER_NAMES.map(name => createElementWithText('th', name))
        )
      )
    )
  );
}

function setSpinnerStatus(message = EMPTY_MESSAGE) {
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

function defaultErrorHandler({ status, statusText, responseText, message = 'Online' } = {}) {
  errorMessageElement.textContent = status
    ? `Error: response code: ${status}, status text: ${statusText}, ` +
    `response text: ${responseText}`
    : message;
}

const fetchData = (
  spinnerStatus,
  { uri, method, headers = {}, code },
  { body, id = '' } = {}
) => new Promise(function (resolve, reject) {
  setSpinnerStatus(spinnerStatus);
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
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

const fetchAllUsers = (spinnerStatus = REFRESH_SPINNER_STATUS) =>
  fetchData(spinnerStatus, GET_USERS)
    .then(data => parseJson(data) || [])
    .catch(defaultErrorHandler);

const getAllUsers = (spinnerStatus = REFRESH_SPINNER_STATUS) =>
  fetchAllUsers(spinnerStatus)
    .then(users => {
      usersTableBody.innerHTML = '';
      cachedDb = users.map(user => {
        user.node = createRow(user);
        return user;
      });
    });

function getCurUserButtons(index) {
  return index >= 0 ? cachedDb[index].node.querySelectorAll('input[type=button]') : [];
}

const setDisableStatus = (buttons, status) =>
  buttons.forEach(button => {
    button.disabled = status;
  });

function deleteUser(event) {
  const id = getId(event);
  const selectedUserIndex = cachedDb.findIndex(({ id: curId }) => curId === id);
  let buttons = getCurUserButtons(selectedUserIndex);
  setDisableStatus(buttons, true);
  fetchData('Attempt to delete user\'s record', DELETE_USER, { id })
    .then(() => {
      if (selectedUserIndex >= 0) {
        cachedDb[selectedUserIndex].node.remove();
        buttons = [];
        cachedDb.splice(selectedUserIndex, 1);
      }
      return fetchAllUsers();
    })
    .then(compareChanges)
    .catch(defaultErrorHandler)
    .finally(() => {
      setDisableStatus(buttons, false);
    });
}

function updateUser(event) {
  const inputs = event.target.parentElement.parentElement.querySelectorAll('input[type=text]');
  const body = Array.prototype.reduce.call(inputs, (acc, { name, value }) => {
    acc[name] = value.trim();
    return acc;
  }, {});
  if (!body.name || !body.username) {
    defaultErrorHandler({ message: 'All fields are required' });
    return;
  }
  const id = getId(event);
  const selectedUserIndex = cachedDb.findIndex(({ id: curId }) => curId === id);
  const { name, username } = selectedUserIndex >= 0 ? cachedDb[selectedUserIndex] : {};
  if (body.name === name && body.username === username) {
    defaultErrorHandler({ message: 'Nothing to save' });
    return;
  }
  const buttons = getCurUserButtons(selectedUserIndex);
  setDisableStatus(buttons, true);
  fetchData('Attempt to update user\'s record', UPDATE_USER, { id, body: JSON.stringify(body) })
    .then(() => {
      if (selectedUserIndex >= 0) {
        cachedDb[selectedUserIndex].name = body.name;
        cachedDb[selectedUserIndex].username = body.username;
      }
      return fetchAllUsers();
    })
    .then(compareChanges)
    .catch(defaultErrorHandler)
    .finally(() => {
      setDisableStatus(buttons, false);
    });
}

function newUser(event) {
  event.preventDefault();
  const body = { name: newUserForm['name'].value.trim(), username: newUserForm['username'].value.trim() };
  if (!body.name || !body.username) {
    defaultErrorHandler({ message: 'All fields required' });
    return;
  }
  newUserForm['submit'].disabled = true;
  newUserForm['name'].value = '';
  newUserForm['username'].value = '';
  fetchData('Attempt to create user\'s record', CREATE_USER, { body: JSON.stringify(body) })
    .then(() => fetchAllUsers())
    .then(compareChanges)
    .catch(defaultErrorHandler)
    .finally(() => {
      newUserForm['submit'].disabled = false;
    });
}

function updateField(user, fieldName, newValue) {
  if (user[fieldName] !== newValue) {
    user[fieldName] = newValue;
    user.querySelector(`input[name=${fieldName}]`).value = newValue;
  }
}

function compareChanges(newUsersDb) {
  cachedDb = cachedDb.map(user => {
    const newUser = newUsersDb.find(aUser => aUser.id === user.id);
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
    .filter(user => user.id);
  newUsersDb.forEach(aUser => {
    if (aUser.id) {
      aUser.node = createRow(aUser);
      cachedDb.push(aUser);
    }
  });
}

initialization();
