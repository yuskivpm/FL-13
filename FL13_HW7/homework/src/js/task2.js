if (!confirm('Do you want to play a game?')) {
  alert('You did not become a billionaire, but can.');
} else {

  const ATTEMPTS_COUNT = 3;
  const START_PRIZE_NUMBER = 5;
  const START_PRIZE_AMOUNT = 100;

  let roundPrizeNumber;
  let roundMaxNumber;
  let roundMaxPossiblePrize;
  let roundPossiblePrize;
  let roundAttemptsCount;
  let totalPrize;

  do {
    totalPrize = 0;
    roundMaxNumber = START_PRIZE_NUMBER;
    roundMaxPossiblePrize = START_PRIZE_AMOUNT;

    do {
      roundPossiblePrize = roundMaxPossiblePrize;
      roundAttemptsCount = ATTEMPTS_COUNT;
      roundPrizeNumber = Math.trunc(Math.random() * (roundMaxNumber + 1));
      while (
        roundPrizeNumber !== Number(prompt(
          `Choose a roulette pocket number from 0 to ${roundMaxNumber}\n` +
          `Attempts left: ${roundAttemptsCount}\n` +
          `Total prize: ${totalPrize}$\n` +
          `Possible prize on current attempt: ${roundPossiblePrize}$`))
        && --roundAttemptsCount
      ) {
        roundPossiblePrize >>= 1;
      }

      if (roundAttemptsCount) {
        totalPrize += roundPossiblePrize;
        if (confirm(`Congratulation, you won!\n` +
          `Your prize is ${roundPossiblePrize}$\n` +
          `Do you want to continue?`)) {
          roundMaxNumber += START_PRIZE_NUMBER;
          roundMaxPossiblePrize <<= 1;
        } else {
          roundAttemptsCount = 0;
        }
      }
    } while (roundAttemptsCount);

    alert(`Thank you for your participation. your prize is: ${totalPrize}$`);
  } while (confirm('Do you want to continue?'));
}