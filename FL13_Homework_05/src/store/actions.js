import * as types from './actionTypes';
import { EDIT_PAGE } from '../utils/constants';

// const createAction = type => {
//   return function (...args) {
//     return {
//       type,
//       payload: !args.length ? undefined : args.length === 1 ? args[0] : args,
//     };
//   }
// }

export const openEditor = editItem => ({
  type: types.OPEN_EDITOR,
  payload: { activePage: EDIT_PAGE, editItem },
});

export const filterChange = filter => ({
  type: types.FILTER_CHANGE,
  payload: filter,
});

export const deleteItemById = id => ({
  type: types.DELETE_ITEM_BY_ID,
  payload: id,
});

export const openMainPage = () => ({
  type: types.GOTO_MAIN_PAGE,
});

export const saveItem = item => ({
  type: types.SAVE_ITEM,
  payload: item,
});
