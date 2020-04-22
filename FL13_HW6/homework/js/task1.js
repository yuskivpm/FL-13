const MAX_PERCENTAGE = 100;

const check = parseFloat(prompt('Enter check sum'));
const tip = parseFloat(prompt('Enter tip percentage'));

if (isNaN(check) || isNaN(tip) || check < 0 || tip < 0 || tip > MAX_PERCENTAGE) {
  alert('Invalid input data');
} else {
  const tipAmount = Math.round(check * tip) / MAX_PERCENTAGE;
  alert(`Check number: ${check}\n` +
    `Tip: ${tip}%\n` +
    `Tip amount: ${tipAmount}\n` +
    `Total sum to pay: ${check + tipAmount}`
  );
}
