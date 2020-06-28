export default class Game {
  constructor(maxItemCount) {
    this.maxItemCount = maxItemCount;
  }
  round = (playerChoice) => {
    this._roundCount++;
    this._lastRoundResult = this._compare(
      (this._lastPlayerChoice = playerChoice),
      (this._lastComputerChoice = this._generateComputerChoice())
    );
  };
  reset = () => {
    this._roundCount = 0;
    this._computerScore = 0;
    this._playerScore = 0;
    this._lastRoundResult = 0;
    this._lastComputerChoice = -1;
    this._lastPlayerChoice = -1;
  };
  set maxItemCount(itemsCount) {
    this._maxItemCount = itemsCount;
    this._center = (itemsCount - 1) / 2;
    this.reset();
  }
  get roundCount() {
    return this._roundCount;
  }
  get computerScore() {
    return this._computerScore;
  }
  get playerScore() {
    return this._playerScore;
  }
  get lastComputerChoice() {
    return this._lastComputerChoice;
  }
  get lastPlayerChoice() {
    return this._lastPlayerChoice;
  }
  get lastRoundResult() {
    return this._lastRoundResult;
  }
  get maxItemCount() {
    return this._maxItemCount;
  }
  _generateComputerChoice = () => Math.floor(Math.random() * this._maxItemCount);
  _compare = (first, second) => {
    if (first === second) {
      return 0;
    } else {
      const result = (this._maxItemCount + first - second) % this._maxItemCount;
      if (result <= this._center) {
        this._playerScore++;
        return 1;
      } else {
        this._computerScore++;
        return -1;
      }
    }
  };
}
