const defaultPrepareAction = (arg) => arg;

export const createAction = (type, prepareAction = defaultPrepareAction) => {
  function creator(...args) {
    return {
      type,
      payload: args.length === 1 ? prepareAction(args[0]) : prepareAction(args),
    };
  }
  creator.toString = () => `${type}`;
  return creator;
};

export const createReducer = (initialState, reducers) => {
  return (state = initialState, action = {}) => {
    const reducer = reducers[action.type];
    return reducer && typeof reducer === 'function'
      ? reducer(state, action)
      : state;
  };
};
