import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  LIVE_ACCOUNT_LIST_REQUEST,
  LIVE_ACCOUNT_LIST_SUCCESS,
  LIVE_ACCOUNT_LIST_FAILURE,
  //
  LIVE_ACCOUNT_CREATE_FAILURE,
  LIVE_ACCOUNT_CREATE_REQUEST,
  LIVE_ACCOUNT_CREATE_SUCCESS,
  //
  LIVE_ACCOUNT_UPDATE_PERMIT_FAILURE,
  LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST,
  LIVE_ACCOUNT_UPDATE_PERMIT_SUCCESS,
} from "../reducers/liveAccount";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function liveAccountListAPI(data) {
  return axios.get(
    `/api/liveAccount/list/?page=${data.page}&search=${data.search}`
  );
}

function* liveAccountList(action) {
  try {
    const result = yield call(liveAccountListAPI, action.data);
    yield put({
      type: LIVE_ACCOUNT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIVE_ACCOUNT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function liveAccountUpdatePermitAPI(data) {
  return axios.patch(`/api/liveAccount/updatePermit`, data);
}

function* liveAccountUpdatePermit(action) {
  try {
    const result = yield call(liveAccountUpdatePermitAPI, action.data);

    yield put({
      type: LIVE_ACCOUNT_UPDATE_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIVE_ACCOUNT_UPDATE_PERMIT_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function liveAccountCreateAPI(data) {
  return axios.post(`/api/liveAccount/create`, data);
}

function* liveAccountCreate(action) {
  try {
    const result = yield call(liveAccountCreateAPI, action.data);

    yield put({
      type: LIVE_ACCOUNT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIVE_ACCOUNT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchLiveAccountList() {
  yield takeLatest(LIVE_ACCOUNT_LIST_REQUEST, liveAccountList);
}
function* watchLiveAccountUpdatePermit() {
  yield takeLatest(LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST, liveAccountUpdatePermit);
}
function* watchLiveAccountCreate() {
  yield takeLatest(LIVE_ACCOUNT_CREATE_REQUEST, liveAccountCreate);
}
//////////////////////////////////////////////////////////////
export default function* liveAccountSaga() {
  yield all([
    fork(watchLiveAccountList),
    fork(watchLiveAccountUpdatePermit),
    fork(watchLiveAccountCreate),
  ]);
}
