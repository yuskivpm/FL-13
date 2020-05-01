function convert(...args) {
  return mapArray(args, item => parseInt(item) === item ? `${item}` : parseInt(item));
}

function executeforEach(array, callback) {
  for (const item of array) {
    callback(item);
  }
}

function mapArray(array, callback) {
  const result = [];
  executeforEach(array, item => result.push(callback(parseInt(item))));
  return result;
}

function filterArray(array, callback) {
  const result = [];
  executeforEach(array, item => callback(item) ? result.push(item) : 0);
  return result;
}

function containsValue(array, value) {
  let result = false;
  executeforEach(array, item => {
    if (item === value) {
      result = true;
    }
  });
  return result;
}

function flipOver(text) {
  let result = '';
  for (const char of text) {
    result = char + result;
  }
  return result;
}

function makeListFromRange(range) {
  const result = [];
  for (let i = range[0]; i <= range[1]; i++) {
    result.push(i);
  }
  return result;
}

function getArrayOfKeys(array, keyName) {
  const result = [];
  executeforEach(array, item => result.push(item[keyName]));
  return result;
}

const MIN_RANGE = 10;
const MAX_RANGE = 20;
function substitute(array) {
  return mapArray(array, item => item > MIN_RANGE && item < MAX_RANGE ? '*' : item);
}

function getPastDay(date, decDayCount) {
  const MILLISECONDS_IN_DAY = 86400000; //24*60*60*1000
  return new Date(date.getTime() - decDayCount * MILLISECONDS_IN_DAY).getDate();
}

const MAX_ONE_DIGIT_NUMBER = 9;
const leadingZero = number => number <= MAX_ONE_DIGIT_NUMBER ? `0${number}` : number;
function formatDate(date) {
  return `${date.getFullYear()}/${leadingZero(date.getMonth() + 1)}/${leadingZero(date.getDate())} ` +
    `${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}`
}