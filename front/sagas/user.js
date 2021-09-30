import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  //
  USER_ME_REQUEST,
  USER_ME_SUCCESS,
  USER_ME_FAILURE,
  //
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  //
  USER_ID_IMAGE_FILE_REQUEST,
  USER_ID_IMAGE_FILE_SUCCESS,
  USER_ID_IMAGE_FILE_FAILURE,
  //
  USER_ME_UPDATE_REQUEST,
  USER_ME_UPDATE_SUCCESS,
  USER_ME_UPDATE_FAILURE,
  //
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  //
  SIGNIN_ADMIN_REQUEST,
  SIGNIN_ADMIN_SUCCESS,
  SIGNIN_ADMIN_FAILURE,
  //
  USER_UPDATE_PRICE_REQUEST,
  USER_UPDATE_PRICE_SUCCESS,
  USER_UPDATE_PRICE_FAILURE,
  //
  USER_UPDATE_PERMIT_REQUEST,
  USER_UPDATE_PERMIT_SUCCESS,
  USER_UPDATE_PERMIT_FAILURE,
  //
  USER_FIND_EMAIL_REQUEST,
  USER_FIND_EMAIL_SUCCESS,
  USER_FIND_EMAIL_FAILURE,
  //
  USER_MODIFY_PASSWORD_REQUEST,
  USER_MODIFY_PASSWORD_SUCCESS,
  USER_MODIFY_PASSWORD_FAILURE,
  //
  USER_MODIFY_PASSWORD_UPDATE_REQUEST,
  USER_MODIFY_PASSWORD_UPDATE_SUCCESS,
  USER_MODIFY_PASSWORD_UPDATE_FAILURE,
  //
  USER_FIND_PASSWORD_REQUEST,
  USER_FIND_PASSWORD_SUCCESS,
  USER_FIND_PASSWORD_FAILURE,
  //
  USER_FIND_PASSWORD_CONFIRM_REQUEST,
  USER_FIND_PASSWORD_CONFIRM_SUCCESS,
  USER_FIND_PASSWORD_CONFIRM_FAILURE,
  //
  USER_FIND_PASSWORD_UPDATE_REQUEST,
  USER_FIND_PASSWORD_UPDATE_SUCCESS,
  USER_FIND_PASSWORD_UPDATE_FAILURE,
  //
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
} from "../reducers/user";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function loadMyInfoAPI(data) {
  return axios.get("/api/user/signin", data);
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userSigninAPI(data) {
  return axios.post(`/api/user/signin`, data);
}

function* userSignin(action) {
  try {
    const result = yield call(userSigninAPI, action.data);
    yield put({
      type: USER_SIGNIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_SIGNIN_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function signinAdminPI(data) {
  return axios.post(`/api/user/signin/admin`, data);
}

function* signinAdmin(action) {
  try {
    const result = yield call(signinAdminPI, action.data);
    yield put({
      type: SIGNIN_ADMIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNIN_ADMIN_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userSignUpAPI(data) {
  return axios.post(`/api/user/signup`, data);
}

function* userSignUp(action) {
  try {
    const result = yield call(userSignUpAPI, action.data);
    yield put({
      type: USER_SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userListAPI(data) {
  return axios.get(
    `/api/user/list/${data.listType}/${data.listType2}?page=${data.name}&search=${data.email}`
  );
}

function* userList(action) {
  try {
    const result = yield call(userListAPI, action.data);
    yield put({
      type: USER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userMeAPI(data) {
  return axios.get(`/api/user/me`, data);
}

function* userMe(action) {
  try {
    const result = yield call(userMeAPI, action.data);
    yield put({
      type: USER_ME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_ME_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userMeUpdateAPI(data) {
  return axios.patch(`/api/user/me/update`, data);
}

function* userMeUpdate(action) {
  try {
    const result = yield call(userMeUpdateAPI, action.data);
    yield put({
      type: USER_ME_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_ME_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userUpdatePriceAPI(data) {
  return axios.patch(`/api/user/updatePrice`, data);
}

function* userUpdatePrice(action) {
  try {
    const result = yield call(userUpdatePriceAPI, action.data);
    yield put({
      type: USER_UPDATE_PRICE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_UPDATE_PRICE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userUpdatePermitAPI(data) {
  return axios.patch(`/api/user/updatePermit`, data);
}

function* userUpdatePermit(action) {
  try {
    const result = yield call(userUpdatePermitAPI, action.data);
    yield put({
      type: USER_UPDATE_PERMIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_UPDATE_PERMIT_FAILURE,
      error: err.response.data,
    });
  }
}
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userUserFindEmailAPI(data) {
  return axios.post(`/api/user/findemail`, data);
}

function* userUserFindEmail(action) {
  try {
    const result = yield call(userUserFindEmailAPI, action.data);
    yield put({
      type: USER_FIND_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_FIND_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userModifyPasswordAPI(data) {
  return axios.post(`/api/user/modifypass`, data);
}

function* userModifyPassword(action) {
  try {
    const result = yield call(userModifyPasswordAPI, action.data);
    yield put({
      type: USER_MODIFY_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_MODIFY_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userModifyPasswordUpdateAPI(data) {
  return axios.patch(`/api/user/modifypass/update`, data);
}

function* userModifyPasswordUpdate(action) {
  try {
    const result = yield call(userModifyPasswordUpdateAPI, action.data);
    yield put({
      type: USER_MODIFY_PASSWORD_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_MODIFY_PASSWORD_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userIdImageFileAPI(data) {
  return axios.post(`/api/user/image`, data);
}

function* userIdImageFile(action) {
  try {
    const result = yield call(userIdImageFileAPI, action.data);
    yield put({
      type: USER_ID_IMAGE_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_ID_IMAGE_FILE_FAILURE,
      error: err.response.data,
    });
  }
}
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userFindPasswordAPI(data) {
  return axios.post(`/api/user/findPass`, data);
}

function* userFindPassword(action) {
  try {
    const result = yield call(userFindPasswordAPI, action.data);
    yield put({
      type: USER_FIND_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_FIND_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userFindPasswordUpdateAPI(data) {
  return axios.patcha(`/api/user/findPass/update`, data);
}

function* userFindPasswordUpdate(action) {
  try {
    const result = yield call(userFindPasswordUpdateAPI, action.data);
    yield put({
      type: USER_FIND_PASSWORD_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_FIND_PASSWORD_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userFindPasswordConfirmAPI(data) {
  return axios.post(`/api/user/findPass/confirm`, data);
}

function* userFindPasswordConfirm(action) {
  try {
    const result = yield call(userFindPasswordConfirmAPI, action.data);
    yield put({
      type: USER_FIND_PASSWORD_CONFIRM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_FIND_PASSWORD_CONFIRM_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchUserSignin() {
  yield takeLatest(USER_SIGNIN_REQUEST, userSignin);
}

function* watchSigninAdmin() {
  yield takeLatest(SIGNIN_ADMIN_REQUEST, signinAdmin);
}

function* watchUserSignUp() {
  yield takeLatest(USER_SIGNUP_REQUEST, userSignUp);
}

function* watchUserList() {
  yield takeLatest(USER_LIST_REQUEST, userList);
}

function* watchUserMe() {
  yield takeLatest(USER_ME_REQUEST, userMe);
}

function* watchUserMeUpdate() {
  yield takeLatest(USER_ME_UPDATE_REQUEST, userMeUpdate);
}

function* watchUserUpdatePrice() {
  yield takeLatest(USER_UPDATE_PRICE_REQUEST, userUpdatePrice);
}

function* watchUserUpdatePermit() {
  yield takeLatest(USER_UPDATE_PERMIT_REQUEST, userUpdatePermit);
}

function* watchUserUserFindEmail() {
  yield takeLatest(USER_FIND_EMAIL_REQUEST, userUserFindEmail);
}

function* watchUserModifyPassword() {
  yield takeLatest(USER_MODIFY_PASSWORD_REQUEST, userModifyPassword);
}

function* watchUserModifyPasswordUpdate() {
  yield takeLatest(
    USER_MODIFY_PASSWORD_UPDATE_REQUEST,
    userModifyPasswordUpdate
  );
}
function* watchUserFindPassword() {
  yield takeLatest(USER_FIND_PASSWORD_REQUEST, userFindPassword);
}

function* watchUserFindPasswordConfirm() {
  yield takeLatest(USER_FIND_PASSWORD_CONFIRM_REQUEST, userFindPasswordConfirm);
}

function* watchUserFindPasswordUpdate() {
  yield takeLatest(USER_FIND_PASSWORD_UPDATE_REQUEST, userFindPasswordUpdate);
}

function* watchUserIdImageFile() {
  yield takeLatest(USER_ID_IMAGE_FILE_REQUEST, userIdImageFile);
}
userIdImageFile;
//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchUserSignin),
    fork(watchSigninAdmin),
    fork(watchUserSignUp),
    fork(watchUserList),
    fork(watchUserMe),
    fork(watchUserMeUpdate),
    fork(watchUserUpdatePrice),
    fork(watchUserUpdatePermit),
    fork(watchUserUserFindEmail),
    fork(watchUserModifyPassword),
    fork(watchUserModifyPasswordUpdate),
    fork(watchUserFindPassword),
    fork(watchUserFindPasswordConfirm),
    fork(watchUserFindPasswordUpdate),
    fork(watchUserIdImageFile),
  ]);
}
