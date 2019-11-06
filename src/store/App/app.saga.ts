import { call, put, take } from "redux-saga/effects";
import { getNoteListSuccess, getNoteListLoading, getNoteListFailed } from "./app.action";
import { getNoteListApi } from "./app.api";

export function* getNoteListRequestSaga() {
  try {
    yield put(getNoteListLoading());

    const result = yield call(getNoteListApi);

    yield put(getNoteListSuccess(result.data.listNotes.items));
  } catch (e) {
    yield put(getNoteListFailed(e));
  }
}
