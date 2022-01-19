import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PRICE_HISTORY_CREATE_REQUEST,
  PRICE_HISTORY_CREATE_SUCCESS,
  PRICE_HISTORY_CREATE_FAILURE,
} from "../reducers/priceHistory";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function priceHistoryCreateAPI(data) {
  return axios.post(`/api/priceHistory/create`, data);
}

function* priceHistoryCreate(action) {
  try {
    const result = yield call(priceHistoryCreateAPI, action.data);

    yield put({
      type: PRICE_HISTORY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRICE_HISTORY_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchPriceHistoryCreate() {
  yield takeLatest(PRICE_HISTORY_CREATE_REQUEST, priceHistoryCreate);
}

//////////////////////////////////////////////////////////////
export default function* priceHistorySage() {
  yield all([fork(watchPriceHistoryCreate)]);
}
