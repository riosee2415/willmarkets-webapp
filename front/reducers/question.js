import produce from "../util/produce";

export const initailState = {
  questionList: null,
  questionLen: 0,
  //
  st_questionListLoading: false,
  st_questionListDone: false,
  st_questionListError: null,
  //
  st_questionUpdateCompleteLoading: false,
  st_questionUpdateCompleteDone: false,
  st_questionUpdateCompleteError: null,
  //
  st_questionCreateLoading: false,
  st_questionCreateDone: false,
  st_questionCreateError: null,
  //
};

export const QUESTION_LIST_REQUEST = "QUESTION_LIST_REQUEST";
export const QUESTION_LIST_SUCCESS = "QUESTION_LIST_SUCCESS";
export const QUESTION_LIST_FAILURE = "QUESTION_LIST_FAILURE";
//
export const QUESTION_UPDATE_COMPLETE_REQUEST =
  "QUESTION_UPDATE_COMPLETE_REQUEST";
export const QUESTION_UPDATE_COMPLETE_SUCCESS =
  "QUESTION_UPDATE_COMPLETE_SUCCESS";
export const QUESTION_UPDATE_COMPLETE_FAILURE =
  "QUESTION_UPDATE_COMPLETE_FAILURE";
//
export const QUESTION_CREATE_REQUEST = "QUESTION_CREATE_REQUEST";
export const QUESTION_CREATE_SUCCESS = "QUESTION_CREATE_SUCCESS";
export const QUESTION_CREATE_FAILURE = "QUESTION_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QUESTION_LIST_REQUEST: {
        draft.st_questionListLoading = true;
        draft.st_questionListDone = null;
        draft.st_questionListError = false;
        break;
      }
      case QUESTION_LIST_SUCCESS: {
        draft.st_questionListLoading = false;
        draft.st_questionListDone = true;
        draft.questionList = action.data.questions;
        draft.questionLen = action.data.questionLen;
        break;
      }
      case QUESTION_LIST_FAILURE: {
        draft.st_questionListLoading = false;
        draft.st_questionListDone = false;
        draft.st_questionListError = action.error;
        break;
      }
      //
      case QUESTION_UPDATE_COMPLETE_REQUEST: {
        draft.st_questionUpdateCompleteLoading = true;
        draft.st_questionUpdateCompleteDone = null;
        draft.st_questionUpdateCompleteError = false;
        break;
      }
      case QUESTION_UPDATE_COMPLETE_SUCCESS: {
        draft.st_questionUpdateCompleteLoading = false;
        draft.st_questionUpdateCompleteDone = true;
        break;
      }
      case QUESTION_UPDATE_COMPLETE_FAILURE: {
        draft.st_questionUpdateCompleteLoading = false;
        draft.st_questionUpdateCompleteDone = false;
        draft.st_questionUpdateCompleteError = action.error;
        break;
      }
      //
      case QUESTION_CREATE_REQUEST: {
        draft.st_questionCreateLoading = true;
        draft.st_questionCreateDone = null;
        draft.st_questionCreateError = false;
        break;
      }
      case QUESTION_CREATE_SUCCESS: {
        draft.st_questionCreateLoading = false;
        draft.st_questionCreateDone = true;
        break;
      }
      case QUESTION_CREATE_FAILURE: {
        draft.st_questionCreateLoading = false;
        draft.st_questionCreateDone = false;
        draft.st_questionCreateError = action.error;
        break;
      }
      //
      default:
        break;
    }
  });

export default reducer;
