const MIN_LOGIN_LENGTH = 4;
const EVENING_HOURS = 20;

const usersDB = { 'User': 'UserPass', 'Admin': 'RootPass' };

const userLogin = prompt('Enter login');

if (!userLogin) {
  alert('Canceled.');
} else if (userLogin.length < MIN_LOGIN_LENGTH) {
  alert('I don\'t know any users having name length less than 4 symbols');
} else if (!usersDB.hasOwnProperty(userLogin)) {
  alert('I don\'t know you');
} else {
  const userPassword = prompt('Enter password');
  if (!userPassword) {
    alert('Canceled.');
  } else if (usersDB[userLogin] !== userPassword) {
    alert('Wrong password');
  } else {
    const hour = new Date().getHours();
    alert(`Good ${hour < EVENING_HOURS ? 'day' : 'evening'}, dear ${userLogin}!`);
  }
}
