import produce from "../util/produce";

export const initailState = {
  liveList: null,

  st_liveAccountLoading: false,
  st_liveAccountDone: false,
  st_liveAccountError: null,

  st_liveAccountUpdatePermitLoading: false,
  st_liveAccountUpdatePermitDone: false,
  st_liveAccountUpdatePermitError: null,

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
        draft.st_liveAccountLoading = true;
        draft.st_liveAccountDone = null;
        draft.st_liveAccountError = false;
        break;
      }
      case LIVE_ACCOUNT_LIST_SUCCESS: {
        draft.st_liveAccountLoading = false;
        draft.st_liveAccountDone = true;
        draft.liveList = action.data;
        break;
      }
      case LIVE_ACCOUNT_LIST_FAILURE: {
        draft.st_liveAccountLoading = false;
        draft.st_liveAccountDone = false;
        draft.st_liveAccountError = action.error;
        break;
      }
      case LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST: {
        draft.st_liveAccountUpdatePermitLoading = true;
        draft.st_liveAccountUpdatePermitDone = null;
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
      case LIVE_ACCOUNT_CREATE_REQUEST: {
        draft.st_liveAccountCreateLoading = true;
        draft.st_liveAccountCreateDone = null;
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
