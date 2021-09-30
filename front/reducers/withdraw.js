import produce from "../util/produce";

export const initailState = {
  withdrawList: null,
  //
  st_withdrawListLoading: false,
  st_withdrawListDone: false,
  st_withdrawListError: null,
  //
  st_withdrawUpdatePermitLoading: false,
  st_withdrawUpdatePermitDone: false,
  st_withdrawUpdatePermitError: null,
  //
  st_withdrawCreateLoading: false,
  st_withdrawCreateDone: false,
  st_withdrawCreateError: null,
};

export const WITHDRAW_LIST_REQUEST = "WITHDRAW_LIST_REQUEST";
export const WITHDRAW_LIST_SUCCESS = "WITHDRAW_LIST_SUCCESS";
export const WITHDRAW_LIST_FAILURE = "WITHDRAW_LIST_FAILURE";
//
export const WITHDRAW_UPDATE_PERMIT_REQUEST = "WITHDRAW_UPDATE_PERMIT_REQUEST";
export const WITHDRAW_UPDATE_PERMIT_SUCCESS = "WITHDRAW_UPDATE_PERMIT_SUCCESS";
export const WITHDRAW_UPDATE_PERMIT_FAILURE = "WITHDRAW_UPDATE_PERMIT_FAILURE";
//
export const WITHDRAW_CREATE_REQUEST = "WITHDRAW_CREATE_REQUEST";
export const WITHDRAW_CREATE_SUCCESS = "WITHDRAW_CREATE_SUCCESS";
export const WITHDRAW_CREATE_FAILURE = "WITHDRAW_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case WITHDRAW_LIST_REQUEST: {
        draft.st_withdrawListLoading = true;
        draft.st_withdrawListDone = null;
        draft.st_withdrawListError = false;
        break;
      }
      case WITHDRAW_LIST_SUCCESS: {
        draft.st_withdrawListLoading = false;
        draft.st_withdrawListDone = true;
        draft.withdrawList = action.data;
        break;
      }
      case WITHDRAW_LIST_FAILURE: {
        draft.st_withdrawListLoading = false;
        draft.st_withdrawListDone = false;
        draft.st_withdrawError = action.error;
        break;
      }
      //
      case WITHDRAW_UPDATE_PERMIT_REQUEST: {
        draft.st_withdrawUpdatePermitLoading = true;
        draft.st_withdrawUpdatePermitDone = null;
        draft.st_withdrawUpdatePermitError = false;
        break;
      }
      case WITHDRAW_UPDATE_PERMIT_SUCCESS: {
        draft.st_withdrawUpdatePermitLoading = false;
        draft.st_withdrawUpdatePermitDone = true;
        break;
      }
      case WITHDRAW_UPDATE_PERMIT_FAILURE: {
        draft.st_withdrawUpdatePermitLoading = false;
        draft.st_withdrawUpdatePermitDone = false;
        draft.st_withdrawUpdatePermitError = action.error;
        break;
      }
      //
      case WITHDRAW_CREATE_REQUEST: {
        draft.st_withdrawCreateLoading = true;
        draft.st_withdrawCreateDone = null;
        draft.st_withdrawCreateError = false;
        break;
      }
      case WITHDRAW_CREATE_SUCCESS: {
        draft.st_withdrawCreateLoading = false;
        draft.st_withdrawCreateDone = true;
        break;
      }
      case WITHDRAW_CREATE_FAILURE: {
        draft.st_withdrawCreateLoading = false;
        draft.st_withdrawCreateDone = false;
        draft.st_withdrawCreateError = action.error;
        break;
      }
      default:
        break;
    }
  });

export default reducer;
