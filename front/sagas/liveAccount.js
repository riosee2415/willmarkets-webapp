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
function liveListAPI(data) {
  return axios.get(
    `/api/liveAccount/list/?page=${data.page}&search=${data.search}`
  );
}

function* liveList(action) {
  try {
    const result = yield call(liveListAPI, action.data);

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
function updateLivePermitAPI(data) {
  return axios.patch(`/api/liveAccount/updatePermit`);
}

function* updateLivePermit(action) {
  try {
    const result = yield call(updateLivePermitAPI, action.data);

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
function createLiveAPI(data) {
  return axios.patch(`/api/liveAccount/create`);
}

function* createLive(action) {
  try {
    const result = yield call(createLiveAPI, action.data);

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
function* watchLiveList() {
  yield takeLatest(LIVE_ACCOUNT_LIST_REQUEST, liveList);
}
function* watchUpdateLivePermit() {
  yield takeLatest(LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST, updateLivePermit);
}
function* watchCreateLive() {
  yield takeLatest(LIVE_ACCOUNT_CREATE_REQUEST, createLive);
}
//////////////////////////////////////////////////////////////
export default function* liveAccountSaga() {
  yield all([
    fork(watchLiveList),
    fork(watchUpdateLivePermit),
    fork(watchCreateLive),

    //
  ]);
}
