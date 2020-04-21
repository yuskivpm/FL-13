const MAX_CHAR_COUNT = 2;
let text = prompt('Enter word');

if (text === null || (text = text.trim()).length === 0) {
  alert('Invalid value');
} else {
  alert(text.substr(text.length - 1 >> 1, MAX_CHAR_COUNT - (text.length & 1)));
}
