const countPoints = resultsTable => resultsTable
  .map(item => item.split(':'))
  .filter(item => item[0] >= item[1])
  .map(item => item[0] === item[1] ? 1 : 3)
  .reduce((sum, item) => sum + Number(item), 0);

console.log(countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']));
console.log(countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']));
