import {
  GET_NOTE_LIST_REQUEST,
  GET_NOTE_LIST_SUCCESS,
  GET_NOTE_LIST_FAILED,
  GET_NOTE_LIST_LOADING
} from "./app.types";

export const getNoteListRequest = () => ({ type: GET_NOTE_LIST_REQUEST });

export const getNoteListLoading = () => ({ type: GET_NOTE_LIST_LOADING });

export const getNoteListSuccess = (payload: any) => ({
  type: GET_NOTE_LIST_SUCCESS,
  payload
});

export const getNoteListFailed = (payload: any) => ({
  type: GET_NOTE_LIST_FAILED,
  payload
});
