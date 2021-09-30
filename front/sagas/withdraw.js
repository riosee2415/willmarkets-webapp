import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  WITHDRAW_LIST_FAILURE,
  WITHDRAW_LIST_REQUEST,
  WITHDRAW_LIST_SUCCESS,
  //
  UPDATE_WITHDRAW_PERMIT_SUCCESS,
  UPDATE_WITHDRAW_PERMIT_FAILURE,
  //
  CREATE_WITHDRAW_SUCCESS,
  CREATE_WITHDRAW_FAILURE,
  UPDATE_WITHDRAW_PERMIT_REQUEST,
  CREATE_WITHDRAW_REQUEST,
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
function updatewithdrawPermitAPI(data) {
  return axios.patch(`/api/withdraw/withdrawPermit`);
}

function* updatewithdrawPermit(action) {
  try {
    const result = yield call(updatewithdrawPermitAPI, action.data);

    yield put({
      type: UPDATE_WITHDRAW_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_WITHDRAW_PERMIT_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function createWithdrawAPI(data) {
  return axios.patch(`/api/withdraw/create`);
}

function* createWithdraw(action) {
  try {
    const result = yield call(createWithdrawAPI, action.data);

    yield put({
      type: CREATE_WITHDRAW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CREATE_WITHDRAW_FAILURE,
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
function* watchUpdateWithdrawPermit() {
  yield takeLatest(UPDATE_WITHDRAW_PERMIT_REQUEST, updatewithdrawPermit);
}
function* watchCreateWithdraw() {
  yield takeLatest(CREATE_WITHDRAW_REQUEST, createWithdraw);
}
//////////////////////////////////////////////////////////////
export default function* withdrawSaga() {
  yield all([
    fork(watchWithdrawList),
    fork(watchUpdateWithdrawPermit),
    fork(watchCreateWithdraw),

    //
  ]);
}
