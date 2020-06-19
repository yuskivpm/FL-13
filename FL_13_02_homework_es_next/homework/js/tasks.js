const maxElement = array => Math.max(...array);

const copyArray = array => [...array];

const addUniqueIs = object => ({ ...object, id: Symbol() });

const regroupObject = ({ name: firstName, details: { id, age, university } = {} } = {}) => ({
  university,
  user: { age, firstName, id },
});

const findUniqueElements = array => [...new Set(array)];

const hideNumber = phoneNumber => phoneNumber.slice(-4).padStart(phoneNumber.length, '*');

const required = () => {
  throw new Error('Missing property');
};

const add = (first = required(), second = required()) => first + second;

const fetchReposData = (accountName = 'yuskivpm') =>
  fetch(`https://api.github.com/users/${accountName}/repos`)
    .then(data => data.json())
    .then(reposList => reposList.map(({ name }) => name))
    .then(repoNames => console.log(repoNames.sort()))
    .catch(err => console.error(err));

async function fetchReposDataAsync(accountName = 'yuskivpm') {
  try {
    const jsonData = await fetch(`https://api.github.com/users/${accountName}/repos`);
    const reposList = await jsonData.json();
    const namesList = reposList.map(({ name }) => name);
    console.log(namesList.sort());
  } catch (err) {
    console.error(err);
  }
}
