export const createElement = (nodeType, options = {}, parent, events = [], ...children) => {
  const element = Object.assign(document.createElement(nodeType), options);
  events.forEach(([eventName, handler]) => element.addEventListener(eventName, handler));
  element.append(...children);
  return parent ? parent.appendChild(element) : element;
};

export const createTextElement = (textValue, nodeType = 'p', options, parent, events) =>
  createElement(nodeType, options, parent, events, textValue);
