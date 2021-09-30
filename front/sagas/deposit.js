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
function updateDepositPermitAPI(data) {
  return axios.patch(`/api/deposit/updatePermit`);
}

function* updateDepositPermit(action) {
  try {
    const result = yield call(updateDepositPermitAPI, action.data);

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
function createDepositAPI(data) {
  return axios.patch(`/api/deposit/create`, data);
}

function* createDeposit(action) {
  try {
    const result = yield call(createDepositAPI, action.data);

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
function createDepositImageFileAPI(data) {
  return axios.patch(`/api/deposit/createImage`, data);
}

function* createDepositImageFile(action) {
  try {
    const result = yield call(createDepositImageFileAPI, action.data);

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
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function depositImageFileAPI(data) {
  return axios.patch(`/api/deposit/image`, data);
}

function* depositImageFile(action) {
  try {
    const result = yield call(depositImageFileAPI, action.data);

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

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchDepositList() {
  yield takeLatest(DEPOSIT_LIST_REQUEST, depositList);
}

function* watchUpdateDepositPermit() {
  yield takeLatest(DEPOSIT_UPDATE_PERMIT_REQUEST, updateDepositPermit);
}

function* watchCreateDeposit() {
  yield takeLatest(DEPOSIT_CREATE_REQUEST, createDeposit);
}

function* watchCreateDepositImageFile() {
  yield takeLatest(DEPOSIT_IMAGE_FILE_CREATE_REQUEST, createDepositImageFile);
}

function* watchDepositImageFile() {
  yield takeLatest(DEPOSIT_IMAGE_FILE_REQUEST, depositImageFile);
}
//////////////////////////////////////////////////////////////
export default function* depositSaga() {
  yield all([
    fork(watchDepositList),
    fork(watchUpdateDepositPermit),
    fork(watchCreateDeposit),
    fork(watchCreateDepositImageFile),
    fork(watchDepositImageFile),

    //
  ]);
}
