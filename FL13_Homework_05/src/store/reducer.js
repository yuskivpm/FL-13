import * as actions from './actions';
import { createReducer } from './toolkit';
import schedule from './defaultState';

let lastId = 0;

const generateId = () => ++lastId;

const preloadedState = {
  rows: schedule.map(item => ({ ...item, id: generateId() })),
  todoItemDataOrder: ['date', 'title', 'description', 'duration'],
  activePage: '',
  filter: '',
  editItem: undefined,
};

const getItemById = (rows, id) => rows.find(item => item.id === id);

//* simplification with custom createReducer

export default createReducer(preloadedState, {
  [actions.openEditor]: (state, { payload = {} }) => ({
    ...state,
    ...payload,
    editItem: getItemById(state.rows, payload.editItem),
  }),
  [actions.filterChange]: (state, { payload: filter }) => ({
    ...state,
    filter,
  }),
  [actions.deleteItemById]: (state, { payload: itemId }) => ({
    ...state,
    rows: state.rows.filter(({ id }) => id !== itemId),
  }),
  [actions.openMainPage]: state => ({
    ...state,
    activePage: '',
    editItem: undefined,
  }),
  [actions.saveItem]: (state, { payload: newItem }) => {
    const { id: itemId } = newItem;
    const { rows: oldRows } = state;
    const rows = itemId
      ? oldRows.map(item => item.id === itemId ? newItem : item)
      : [...oldRows, { ...newItem, id: generateId() }];
    return {
      ...state,
      activePage: '',
      editItem: undefined,
      rows,
    };
  },
});

/* For the old school way:

// import * as actionTypes from './actionTypes';

// export default (state = preloadedState, action) {
//   switch (action.type) {
//     case actionTypes.OPEN_EDITOR:
//       return {
//         ...state,
//         ...action.payload,
//         editItem: getItemById(state.rows, action.payload.editItem),
//       };

//     case actionTypes.FILTER_CHANGE:
//       return {
//         ...state,
//         filter: action.payload,
//       };

//     case actionTypes.DELETE_ITEM_BY_ID:
//       return {
//         ...state,
//         rows: state.rows.filter(item => item.id !== action.payload),
//       };

//     case actionTypes.GOTO_MAIN_PAGE:
//       return {
//         ...state,
//         activePage: '',
//         editItem: undefined,
//       };

//     case actionTypes.SAVE_ITEM:
//       let rows;
//       const newItem = action.payload;
//       if (newItem.id) {
//         rows = state.rows.map(item => item.id === newItem.id ? newItem : item);
//       } else {
//         newItem.id = generateId();
//         rows = [...state.rows, newItem];
//       }
//       return {
//         ...state,
//         activePage: '',
//         editItem: undefined,
//         rows,
//       };

//     default:
//       return state;
//   }
// }
*/
