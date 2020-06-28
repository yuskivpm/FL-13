import Game from './game';
import ui from './ui';
import { ROOT_NODE, MAX_WIN_COUNT, RESULT_TEXT, PLAYER_CHOICE_CLASS, COMPUTER_CHOICE_CLASS } from './consts';

const choiceClasses = [PLAYER_CHOICE_CLASS, COMPUTER_CHOICE_CLASS];

const getResultText = (index) => `${RESULT_TEXT[1 + index]}`;

const roundLogMessage = () =>
  `Round ${game.roundCount}, ${uiElements.activeRule.names[game.lastPlayerChoice]} vs. ` +
  `${uiElements.activeRule.names[game.lastComputerChoice]}, ${getResultText(game.lastRoundResult)}!`;

const battleLogMessage = () => `${getResultText(Math.sign(game.playerScore - game.computerScore))}!!!`;

const clearChoiceClasses = () =>
  choiceClasses.forEach((name) => {
    const element = document.querySelector(`.${name}`);
    if (element) {
      element.classList.remove(name);
    }
  });

const setChoiceClasses = (...choices) =>
  choices.forEach((choice, index) => document.getElementById(`button-${choice}`).classList.add(choiceClasses[index]));

const handleChoice = (playerChoice) => {
  clearChoiceClasses();
  game.round(playerChoice);
  setChoiceClasses(game.lastPlayerChoice, game.lastComputerChoice);
  uiElements.addToLog(roundLogMessage());
  if (game.playerScore === MAX_WIN_COUNT || game.computerScore === MAX_WIN_COUNT) {
    uiElements.addToLog(battleLogMessage());
    game.reset();
  }
};

const handleReset = () => {
  uiElements.clearLog();
  clearChoiceClasses();
  game.maxItemCount = uiElements.activeRule.names.length;
};

const uiElements = ui(document.getElementById(ROOT_NODE), handleChoice, handleReset);

const game = new Game(uiElements.activeRule.names.length);
