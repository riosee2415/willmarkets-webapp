import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import questionSage from "./question";
import depositSage from "./deposit";
import withdrawSage from "./withdraw";
import liveAccount from "./liveAccount";
import demoAccount from "./demoAccount";
import popupSaga from "./popup";
//
import axios from "axios";
import backURL from "../config/config";

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(questionSage),
    fork(depositSage),
    fork(withdrawSage),
    fork(liveAccount),
    fork(demoAccount),
    fork(popupSaga),
  ]);
}
