import produce from "../util/produce";
export const initailState = {
  liveList: null,
  //
  st_liveAccountListLoading: false,
  st_liveAccountListDone: false,
  st_liveAccountListError: null,
  //
  st_liveAccountUpdatePermitLoading: false,
  st_liveAccountUpdatePermitDone: false,
  st_liveAccountUpdatePermitError: null,
  //
  st_liveAccountCreateLoading: false,
  st_liveAccountCreateDone: false,
  st_liveAccountCreateError: null,
};

export const LIVE_ACCOUNT_LIST_REQUEST = "LIVE_ACCOUNT_LIST_REQUEST";
export const LIVE_ACCOUNT_LIST_SUCCESS = "LIVE_ACCOUNT_LIST_SUCCESS";
export const LIVE_ACCOUNT_LIST_FAILURE = "LIVE_ACCOUNT_LIST_FAILURE";
//
export const LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST =
  "LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST";
export const LIVE_ACCOUNT_UPDATE_PERMIT_SUCCESS =
  "LIVE_ACCOUNT_UPDATE_PERMIT_SUCCESS";
export const LIVE_ACCOUNT_UPDATE_PERMIT_FAILURE =
  "LIVE_ACCOUNT_UPDATE_PERMIT_FAILURE";
//
export const LIVE_ACCOUNT_CREATE_REQUEST = " LIVE_ACCOUNT_CREATE_REQUEST";
export const LIVE_ACCOUNT_CREATE_SUCCESS = " LIVE_ACCOUNT_CREATE_SUCCESS";
export const LIVE_ACCOUNT_CREATE_FAILURE = " LIVE_ACCOUNT_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LIVE_ACCOUNT_LIST_REQUEST: {
        draft.st_liveAccountListLoading = true;
        draft.st_liveAccountListDone = null;
        draft.st_liveAccountListError = false;
        break;
      }
      case LIVE_ACCOUNT_LIST_SUCCESS: {
        draft.st_liveAccountListLoading = false;
        draft.st_liveAccountListDone = true;
        draft.liveList = action.data;
        break;
      }
      case LIVE_ACCOUNT_LIST_FAILURE: {
        draft.st_liveAccountListLoading = false;
        draft.st_liveAccountListDone = false;
        draft.st_liveAccountListError = action.error;
        break;
      }
      //
      case LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST: {
        draft.st_liveAccountUpdatePermitLoading = true;
        draft.st_liveAccountUpdatePermitDone = null;
        draft.st_liveAccountUpdatePermitError = false;
        break;
      }
      case LIVE_ACCOUNT_UPDATE_PERMIT_SUCCESS: {
        draft.st_liveAccountUpdatePermitLoading = false;
        draft.st_liveAccountUpdatePermitDone = true;
        break;
      }
      case LIVE_ACCOUNT_UPDATE_PERMIT_FAILURE: {
        draft.st_liveAccountUpdatePermitLoading = false;
        draft.st_liveAccountUpdatePermitDone = false;
        draft.st_liveAccountUpdatePermitError = action.error;
        break;
      }
      //
      case LIVE_ACCOUNT_CREATE_REQUEST: {
        draft.st_liveAccountCreateLoading = true;
        draft.st_liveAccountCreateDone = null;
        draft.st_liveAccountCreateError = false;
        break;
      }
      case LIVE_ACCOUNT_CREATE_SUCCESS: {
        draft.st_liveAccountCreateLoading = false;
        draft.st_liveAccountCreateDone = true;
        break;
      }
      case LIVE_ACCOUNT_CREATE_FAILURE: {
        draft.st_liveAccountCreateLoading = false;
        draft.st_liveAccountCreateDone = false;
        draft.st_liveAccountCreateError = action.error;
        break;
      }
      default:
        break;
    }
  });

export default reducer;
