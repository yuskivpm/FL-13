import { createElement, createTextElement } from './domHelpers';
import gameRules from './gameRules';
import '../scss/main.scss';
import '../scss/choice-buttons.scss';

const ui = {};

const generateUi = (rootNode, onChoice, onReset, ruleIndex = 0) => {
  ruleIndex = +ruleIndex;
  ui.activeRule = gameRules[ruleIndex];
  const { names: buttonNames, rules, image, size, coords } = gameRules[ruleIndex];
  rootNode.innerHTML = '';

  const handleChangeGameRule = (event) => {
    generateUi(rootNode, onChoice, onReset, event.target.value);
    onReset();
  };

  const createGameTypeItem = (rule, index) =>
    createTextElement(
      rule.names.length,
      'option',
      index === ruleIndex ? { value: index, selected: 'selected' } : { value: index }
    );

  const createImageChoiceButton = ([x, y], index) =>
    createElement(
      'div',
      {
        id: `button-${index}`,
        className: `choice-button`,
        style: `position: absolute; width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;`,
      },
      undefined,
      [['click', () => onChoice(index)]]
    );

  const createRuleItem = (rule) => createTextElement(rule, 'li', { className: 'rules-list-item' });

  const createChoiceButton = (name, index) =>
    createElement('input', { className: 'game-button', type: 'button', value: name }, rootNode, [
      ['click', () => onChoice(index)],
    ]);

  createElement(
    'div',
    { className: 'game-type' },
    rootNode,
    [],
    createTextElement(`Let’s play!`, 'h2', { className: 'game-header' }),
    createTextElement('Select the number of items in the game', 'label', {
      htmlFor: 'game-type',
      className: 'game-type-label',
    }),
    createElement(
      'select',
      { id: 'game-type', className: 'game-type-select' },
      undefined,
      [['change', handleChangeGameRule]],
      ...gameRules.map(createGameTypeItem)
    )
  );

  createElement(
    'div',
    { className: 'game' },
    rootNode,
    [],
    createElement(
      'div',
      { className: 'rules-div' },
      undefined,
      [],
      createElement('img', { className: 'rules-img', src: image }),
      ...(ui.buttons = coords.map(createImageChoiceButton))
    ),

    createElement(
      'div',
      { className: 'rules' },
      undefined,
      [],
      createTextElement('Rules', 'h2', { className: 'rules-header' }),
      createElement('ul', { className: 'rules-list' }, undefined, [], ...rules.map(createRuleItem)),
      createElement(
        'div',
        { className: 'game-buttons' },
        undefined,
        [],
        ...(ui.buttons = buttonNames.map(createChoiceButton))
      ),
      createElement('br'),
      (ui.reset = createElement('input', { className: 'game-button', type: 'button', value: 'Reset' }, rootNode, [
        ['click', onReset],
      ]))
    )
  );

  const logger = createElement('div', { className: 'game-logger' }, rootNode);

  ui.addToLog = (message) => createElement('p', { className: 'game-log-message' }, logger, [], message);
  ui.clearLog = () => (logger.innerHTML = '');

  return ui;
};

export default generateUi;
