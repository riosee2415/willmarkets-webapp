import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  WITHDRAW_LIST_REQUEST,
  WITHDRAW_LIST_SUCCESS,
  WITHDRAW_LIST_FAILURE,
  //
  WITHDRAW_UPDATE_PERMIT_REQUEST,
  WITHDRAW_UPDATE_PERMIT_SUCCESS,
  WITHDRAW_UPDATE_PERMIT_FAILURE,
  //
  WITHDRAW_CREATE_REQUEST,
  WITHDRAW_CREATE_SUCCESS,
  WITHDRAW_CREATE_FAILURE,
} from "../reducers/withdraw";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function withdrawListAPI(data) {
  return axios.get(
    `/api/withdraw/list/?page=${data.page}&search=${data.search}`
  );
}

function* withdrawList(action) {
  try {
    const result = yield call(withdrawListAPI, action.data);

    yield put({
      type: WITHDRAW_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WITHDRAW_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function withdrawUpdatePermitAPI(data) {
  return axios.patch(`/api/withdraw/updatePermit`, data);
}

function* withdrawUpdatePermit(action) {
  try {
    const result = yield call(withdrawUpdatePermitAPI, action.data);

    yield put({
      type: WITHDRAW_UPDATE_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WITHDRAW_UPDATE_PERMIT_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function withdrawCreateAPI(data) {
  return axios.post(`/api/withdraw/create`, data);
}

function* withdrawCreate(action) {
  try {
    const result = yield call(withdrawCreateAPI, action.data);

    yield put({
      type: WITHDRAW_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WITHDRAW_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchWithdrawList() {
  yield takeLatest(WITHDRAW_LIST_REQUEST, withdrawList);
}
function* watchWithdrawUpdatePermit() {
  yield takeLatest(WITHDRAW_UPDATE_PERMIT_REQUEST, withdrawUpdatePermit);
}
function* watchWithdrawCreate() {
  yield takeLatest(WITHDRAW_CREATE_REQUEST, withdrawCreate);
}
//////////////////////////////////////////////////////////////
export default function* withdrawSaga() {
  yield all([
    fork(watchWithdrawList),
    fork(watchWithdrawUpdatePermit),
    fork(watchWithdrawCreate),
  ]);
}
