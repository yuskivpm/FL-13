const letterCount = (text, searchChar) => text
  .toLowerCase()
  .split('')
  .reduce((count, item) => item === searchChar ? ++count : count, 0);

console.log(letterCount("Maggy", "g"));
console.log(letterCount("Barry", "b"));
console.log(letterCount("", "z"));
