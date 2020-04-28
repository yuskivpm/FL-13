const positiveSum = numberArray => numberArray.reduce((sum, item) => item > 0 ? sum + item : sum, 0);

console.log(positiveSum([2, 4, 6, 8]));
console.log(positiveSum([0, -3, 5, 7]));
