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
  //
  DEPOSIT_IMAGE_FILE_CREATE_REQUEST,
  DEPOSIT_IMAGE_FILE_CREATE_SUCCESS,
  DEPOSIT_IMAGE_FILE_CREATE_FAILURE,
  //
  DEPOSIT_IMAGE_FILE_REQUEST,
  DEPOSIT_IMAGE_FILE_SUCCESS,
  DEPOSIT_IMAGE_FILE_FAILURE,
} from "../reducers/deposit";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function depositListAPI(data) {
  return axios.get(
    `/api/deposit/list/${data.listType}?page=${data.page}&search=${data.search}`
  );
}

function* depositList(action) {
  try {
    const result = yield call(depositListAPI, action.data);

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
function depositUpdatePermitAPI(data) {
  return axios.patch(`/api/deposit/updatePermit`, data);
}

function* depositUpdatePermit(action) {
  try {
    const result = yield call(depositUpdatePermitAPI, action.data);

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
function depositCreateAPI(data) {
  return axios.post(`/api/deposit/create`, data);
}

function* depositCreate(action) {
  try {
    const result = yield call(depositCreateAPI, action.data);

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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function depositImageFileCreateAPI(data) {
  return axios.post(`/api/deposit/createImage`, data);
}

function* depositImageFileCreate(action) {
  try {
    const result = yield call(depositImageFileCreateAPI, action.data);

    yield put({
      type: DEPOSIT_IMAGE_FILE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEPOSIT_IMAGE_FILE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function depositImageFileAPI(data) {
  return axios.post(`/api/deposit/image`, data);
}

function* depositImageFile(action) {
  try {
    const result = yield call(depositImageFileAPI, action.data);

    yield put({
      type: DEPOSIT_IMAGE_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEPOSIT_IMAGE_FILE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchDepositList() {
  yield takeLatest(DEPOSIT_LIST_REQUEST, depositList);
}

function* watchDepositUpdatePermit() {
  yield takeLatest(DEPOSIT_UPDATE_PERMIT_REQUEST, depositUpdatePermit);
}

function* watchDepositCreate() {
  yield takeLatest(DEPOSIT_CREATE_REQUEST, depositCreate);
}

function* watchDepositImageFileCreate() {
  yield takeLatest(DEPOSIT_IMAGE_FILE_CREATE_REQUEST, depositImageFileCreate);
}

function* watchDepositImageFile() {
  yield takeLatest(DEPOSIT_IMAGE_FILE_REQUEST, depositImageFile);
}
//////////////////////////////////////////////////////////////
export default function* depositSaga() {
  yield all([
    fork(watchDepositList),
    fork(watchDepositUpdatePermit),
    fork(watchDepositCreate),
    fork(watchDepositImageFileCreate),
    fork(watchDepositImageFile),
  ]);
}
