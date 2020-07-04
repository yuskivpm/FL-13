import * as actionTypes from './actionTypes';
import schedule from './defaultState';

let lastId = 0;

const generateId = () => ++lastId;

const generateIds = preloadedState => preloadedState.map(item => ({ ...item, id: generateId() }));

const preloadedState = {
  // rows: TTodoItem[]
  rows: generateIds(schedule),

  // list of ordered visible key's names for TodoItem
  todoItemDataOrder: ['startDate', 'title', 'description', 'duration'],

  // "activePage": string
  // undefined / '' - open TodoList
  // 'edit' - open Editor
  activePage: '',

  //"filter": string,
  // filter text, if non empty - use filter
  filter: '',

  // "editItem": TTodoItem,
  // undefined - add new item
  // !undefined - edit item
  editItem: undefined,
};

const getItemById = (rows, id) => rows.find(item => item.id === id);

function timeLine(state = preloadedState, action) {
  switch (action.type) {
    case actionTypes.OPEN_EDITOR:
      return {
        ...state,
        ...action.payload,
        editItem: getItemById(state.rows, action.payload.editItem),
      };

    case actionTypes.FILTER_CHANGE:
      return {
        ...state,
        filter: action.payload,
      };

    case actionTypes.DELETE_ITEM_BY_ID:
      return {
        ...state,
        rows: state.rows.filter(item => item.id !== action.payload),
      };

    case actionTypes.GOTO_MAIN_PAGE:
      return {
        ...state,
        activePage: '',
        editItem: undefined,
      };

    case actionTypes.SAVE_ITEM:
      let rows;
      const newItem = action.payload;
      if (newItem.id) {
        rows = state.rows.map(item => item.id === newItem.id ? newItem : item);
      } else {
        newItem.id = generateId();
        rows = [...state.rows, newItem];
      }
      return {
        ...state,
        activePage: '',
        editItem: undefined,
        rows,
      };

    default:
      return state;
  }
}

export default timeLine;
