import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  /////////////////////////////
  USER_MY_REQUEST,
  USER_MY_SUCCESS,
  USER_MY_FAILURE,
  /////////////////////////////
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  /////////////////////////////
  USER_ID_IMAGE_FILE_REQUEST,
  USER_ID_IMAGE_FILE_SUCCESS,
  USER_ID_IMAGE_FILE_FAILURE,
  /////////////////////////////
  USER_MY_UPDATE_REQUEST,
  USER_MY_UPDATE_SUCCESS,
  USER_MY_UPDATE_FAILURE,
  /////////////////////////////
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILURE,
  ///////////////////////////
  SIGNIN_ADMIN_REQUEST,
  SIGNIN_ADMIN_SUCCESS,
  SIGNIN_ADMIN_FAILURE,
  /////////////////////////////
  UPDATE_PRICE_REQUEST,
  UPDATE_PRICE_SUCCESS,
  UPDATE_PRICE_FAILURE,
  /////////////////////////////
  USER_UPDATE_PERMIT_REQUEST,
  USER_UPDATE_PERMIT_SUCCESS,
  USER_UPDATE_PERMIT_FAILURE,
  /////////////////////////////
  USER_FIND_EMAIL_REQUEST,
  USER_FIND_EMAIL_SUCCESS,
  USER_FIND_EMAIL_FAILURE,
  /////////////////////////////
  USER_MODIFY_PASSWORD_REQUEST,
  USER_MODIFY_PASSWORD_SUCCESS,
  USER_MODIFY_PASSWORD_FAILURE,
  /////////////////////////////
  USER_MODIFY_PASSWORD_UPDATE_REQUEST,
  USER_MODIFY_PASSWORD_UPDATE_SUCCESS,
  USER_MODIFY_PASSWORD_UPDATE_FAILURE,
  ////////////////////////////
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

// ******************************************************************************************************************
// ******************************************************************************************************************
// *****

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function usersigninAPI(data) {
  return axios.post(`/api/user/signin`, data);
}

function* usersignin(action) {
  try {
    const result = yield call(usersigninAPI, action.data);
    yield put({
      type: USER_SIGN_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_SIGN_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

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

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function usersignUpAPI(data) {
  return axios.post(`/api/user/signup`, data);
}

function* usersignUp(action) {
  try {
    const result = yield call(usersignUpAPI, action.data);
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

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userListAPI(data) {
  return axios.get(
    `/api/user/list/${data.listType}?name=${data.name}&email=${data.email}`
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

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userMyAPI(data) {
  return axios.get(`/api/user/me`, data);
}

function* userMy(action) {
  try {
    const result = yield call(userMyAPI, action.data);
    yield put({
      type: USER_MY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_MY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userMyUpdateAPI(data) {
  return axios.patch(`/api/user/me/update`, data);
}

function* userMyUpdate(action) {
  try {
    const result = yield call(userMyUpdateAPI, action.data);
    yield put({
      type: USER_MY_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_MY_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function updatePriceAPI(data) {
  return axios.patch(`/api/user/updatePrice`, data);
}

function* updatePrice(action) {
  try {
    const result = yield call(updatePriceAPI, action.data);
    yield put({
      type: UPDATE_PRICE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_PRICE_FAILURE,
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
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchUserSignin() {
  yield takeLatest(USER_SIGN_IN_REQUEST, usersignin);
}

function* watchSigninAdmin() {
  yield takeLatest(SIGNIN_ADMIN_REQUEST, signinAdmin);
}

function* watchUserSignUp() {
  yield takeLatest(USER_SIGNUP_REQUEST, usersignUp);
}

function* watchUserList() {
  yield takeLatest(USER_LIST_REQUEST, userList);
}

function* watchUserMy() {
  yield takeLatest(USER_MY_REQUEST, userMy);
}
function* watchUserMyUpdate() {
  yield takeLatest(USER_MY_UPDATE_REQUEST, userMyUpdate);
}

function* watchUpdatePrice() {
  yield takeLatest(UPDATE_PRICE_REQUEST, updatePrice);
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
function* watchUserIdImageFile() {
  yield takeLatest(USER_ID_IMAGE_FILE_REQUEST, userIdImageFile);
}
//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchUserSignin),
    fork(watchSigninAdmin),
    fork(watchUserSignUp),
    fork(watchUserList),
    fork(watchUserMy),
    fork(watchUserMyUpdate),
    fork(watchUpdatePrice),
    fork(watchUserUpdatePermit),
    fork(watchUserUserFindEmail),
    fork(watchUserModifyPassword),
    fork(watchUserModifyPasswordUpdate),
    fork(watchUserIdImageFile),
    //
  ]);
}
