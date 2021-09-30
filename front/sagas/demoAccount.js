import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DEMO_ACCOUNT_LIST_REQUEST,
  DEMO_ACCOUNT_LIST_SUCCESS,
  DEMO_ACCOUNT_LIST_FAILURE,
  //
  DEMO_ACCOUNT_UPDATE_PERMIT_REQUEST,
  DEMO_ACCOUNT_UPDATE_PERMIT_SUCCESS,
  DEMO_ACCOUNT_UPDATE_PERMIT_FAILURE,
  //
  DEMO_ACCOUNT_CREATE_REQUEST,
  DEMO_ACCOUNT_CREATE_SUCCESS,
  DEMO_ACCOUNT_CREATE_FAILURE,
} from "../reducers/demoAccount";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function demoAccountListAPI(data) {
  return axios.get(
    `/api/demoAccount/list/?page=${data.page}&search=${data.search}`
  );
}

function* demoAccountList(action) {
  try {
    const result = yield call(demoAccountListAPI, action.data);

    yield put({
      type: DEMO_ACCOUNT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEMO_ACCOUNT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function demoAccountUpdatePermitAPI(data) {
  return axios.patch(`/api/demoAccount/updatePermit`, data);
}

function* demoAccountUpdatePermit(action) {
  try {
    const result = yield call(demoAccountUpdatePermitAPI, action.data);

    yield put({
      type: DEMO_ACCOUNT_UPDATE_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEMO_ACCOUNT_UPDATE_PERMIT_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function demoAccountCreateAPI(data) {
  return axios.post(`/api/demoAccount/create`, data);
}

function* demoAccountCreate(action) {
  try {
    const result = yield call(demoAccountCreateAPI, action.data);

    yield put({
      type: DEMO_ACCOUNT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEMO_ACCOUNT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchDemoAccountList() {
  yield takeLatest(DEMO_ACCOUNT_LIST_REQUEST, demoAccountList);
}
function* watchDemoAccountUpdatePermit() {
  yield takeLatest(DEMO_ACCOUNT_UPDATE_PERMIT_REQUEST, demoAccountUpdatePermit);
}
function* watchDemoAccountCreate() {
  yield takeLatest(DEMO_ACCOUNT_CREATE_REQUEST, demoAccountCreate);
}
//////////////////////////////////////////////////////////////
export default function* demoAccountSaga() {
  yield all([
    fork(watchDemoAccountList),
    fork(watchDemoAccountUpdatePermit),
    fork(watchDemoAccountCreate),
  ]);
}
