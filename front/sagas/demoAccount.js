import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DEPOSIT_LIST_REQUEST,
  DEPOSIT_LIST_SUCCESS,
  DEPOSIT_LIST_FAILURE,
  //
  DEPOSIT_UPDATE_PERMIT_REQUEST,
  DEPOSIT_UPDATE_PERMIT_SUCCESS,
  DEPOSIT_UPDATE_PERMIT_FAILURE,
  //
  DEPOSIT_CREATE_REQUEST,
  DEPOSIT_CREATE_SUCCESS,
  DEPOSIT_CREATE_FAILURE,
} from "../reducers/deposit";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function demoListAPI(data) {
  return axios.get(
    `/api/demoAccount/list/?page=${data.page}&search=${data.search}`
  );
}

function* demoList(action) {
  try {
    const result = yield call(demoListAPI, action.data);

    yield put({
      type: DEPOSIT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEPOSIT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function updateDemoPermitAPI(data) {
  return axios.patch(`/api/demoAccount/updatePermit`);
}

function* updateDemoPermit(action) {
  try {
    const result = yield call(updateDemoPermitAPI, action.data);

    yield put({
      type: DEPOSIT_UPDATE_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEPOSIT_UPDATE_PERMIT_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function createDemoAPI(data) {
  return axios.patch(`/api/demoAccount/create`);
}

function* createDemo(action) {
  try {
    const result = yield call(createDemoAPI, action.data);

    yield put({
      type: DEPOSIT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEPOSIT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchDemoList() {
  yield takeLatest(DEPOSIT_LIST_REQUEST, demoList);
}
function* watchUpdateDemoPermit() {
  yield takeLatest(DEPOSIT_UPDATE_PERMIT_REQUEST, updateDemoPermit);
}
function* watchCreateDemo() {
  yield takeLatest(DEPOSIT_CREATE_REQUEST, createDemo);
}
//////////////////////////////////////////////////////////////
export default function* demoAccountSaga() {
  yield all([
    fork(watchDemoList),
    fork(watchUpdateDemoPermit),
    fork(watchCreateDemo),

    //
  ]);
}
