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
      type: QUESTION_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: QUESTION_GET_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function updatequestionAPI(data) {
  return axios.patch(`/api/question/updateComplete`, data);
}

function* updatequestion(action) {
  try {
    const result = yield call(updatequestionAPI, action.data);

    yield put({
      type: QUESTION_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: QUESTION_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function createquestionAPI(data) {
  return axios.post(`/api/question/create`, data);
}

function* createquestion(action) {
  try {
    const result = yield call(createquestionAPI, action.data);

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

function* watchUpdateQuestion() {
  yield takeLatest(QUESTION_UPDATE_COMPLETE_REQUEST, updatequestion);
}

function* watchCreateQuestion() {
  yield takeLatest(QUESTION_CREATE_REQUEST, createquestion);
}

//////////////////////////////////////////////////////////////
export default function* questionSaga() {
  yield all([
    fork(watchQuestionList),
    fork(watchUpdateQuestion),
    fork(watchCreateQuestion),

    // ****************************************************************

    //
  ]);
}
