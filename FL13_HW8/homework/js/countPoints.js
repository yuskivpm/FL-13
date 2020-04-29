const countPoints = array => array.reduce((sum, item) => sum + (item[0] > item[2] ? 3 : item[0] === item[2]), 0);

// next code will work without any "tips" about max result values: 
// const countPoints = resultsTable => resultsTable
//   .map(resultAsString => resultAsString.split(':'))
//   .filter(resultAsArray => Number(resultAsArray[0]) >= Number(resultAsArray[1]))
//   .map(resultAsArray => resultAsArray[0] === resultAsArray[1] ? 1 : 3)
//   .reduce((sum, score) => sum + score, 0);

console.log(countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']));
console.log(countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']));



