import { all, takeEvery } from "redux-saga/effects";
import { GET_NOTE_LIST_REQUEST } from "./App/app.types";
import { getNoteListRequestSaga } from "./App/app.saga";

export default function* rootSaga() {
  yield all([takeEvery(GET_NOTE_LIST_REQUEST, getNoteListRequestSaga)]);
}
