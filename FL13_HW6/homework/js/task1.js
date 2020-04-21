const MAX_PERCENTAGE = 100;
const MAX_FRACTION_DIGITS = 2;

const check = parseFloat(prompt('Enter check sum'));
const tip = parseFloat(prompt('Enter tip percentage'));

if (isNaN(check) || isNaN(tip) || check < 0 || tip < 0 || tip > MAX_PERCENTAGE) {
  alert('Invalid input data');
} else {
  const tipAmount = check * tip / MAX_PERCENTAGE;
  const total = check + tipAmount;
  alert(`Check number: ${check}\n` +
    `Tip: ${tip}%\n` +
    `Tip amount: ${+tipAmount.toFixed(MAX_FRACTION_DIGITS)}\n` +
    `Total sum to pay: ${+total.toFixed(MAX_FRACTION_DIGITS)}`
  );
}
