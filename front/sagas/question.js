import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAILURE,
  //
  QUESTION_UPDATE_COMPLETE_REQUEST,
  QUESTION_UPDATE_COMPLETE_SUCCESS,
  QUESTION_UPDATE_COMPLETE_FAILURE,
  //
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAILURE,
} from "../reducers/question";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function questionListAPI(data) {
  return axios.get(`/api/question/list/${data.listType}`);
}

function* questionList(action) {
  try {
    const result = yield call(questionListAPI, action.data);

    yield put({
      type: QUESTION_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: QUESTION_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function questionCompleteAPI(data) {
  return axios.patch(`/api/question/updateComplete`, data);
}

function* questionComplete(action) {
  try {
    const result = yield call(questionCompleteAPI, action.data);

    yield put({
      type: QUESTION_UPDATE_COMPLETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: QUESTION_UPDATE_COMPLETE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function questionCreateAPI(data) {
  return axios.post(`/api/question/create`, data);
}

function* questionCreate(action) {
  try {
    const result = yield call(questionCreateAPI, action.data);

    yield put({
      type: QUESTION_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: QUESTION_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchQuestionList() {
  yield takeLatest(QUESTION_LIST_REQUEST, questionList);
}

function* watchQuestionComplete() {
  yield takeLatest(QUESTION_UPDATE_COMPLETE_REQUEST, questionComplete);
}

function* watchQuestionCreate() {
  yield takeLatest(QUESTION_CREATE_REQUEST, questionCreate);
}

//////////////////////////////////////////////////////////////
export default function* questionSaga() {
  yield all([
    fork(watchQuestionList),
    fork(watchQuestionComplete),
    fork(watchQuestionCreate),
  ]);
}
