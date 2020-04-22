const MAX_CHAR_COUNT = 2;
let text = prompt('Enter word');

if (text && text.trim()) {
  alert(text.substr(text.length - 1 >> 1, MAX_CHAR_COUNT - (text.length & 1)));
} else {
  alert('Invalid value');
}
