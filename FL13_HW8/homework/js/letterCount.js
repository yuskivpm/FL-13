const letterCount = (text, subString) => subString ? text.toLowerCase().split(subString).length - 1 : 0;

console.log(letterCount("Maggy", "g"));
console.log(letterCount("Barry", "b"));
console.log(letterCount("", "z"));
