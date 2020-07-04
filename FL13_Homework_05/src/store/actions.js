import * as types from './actionTypes';
import { createAction } from './toolkit';
import { EDIT_PAGE } from '../utils/constants';

//* simplification with custom createAction

export const openEditor = createAction(
  types.OPEN_EDITOR,
  editItem => ({ activePage: EDIT_PAGE, editItem })
);

export const filterChange = createAction(types.FILTER_CHANGE);

export const deleteItemById = createAction(types.DELETE_ITEM_BY_ID);

export const openMainPage = createAction(types.GOTO_MAIN_PAGE);

export const saveItem = createAction(types.SAVE_ITEM);

/* For the old school way:

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

*/