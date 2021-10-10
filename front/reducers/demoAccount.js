import produce from "../util/produce";

export const initailState = {
  demoList: null,
  //
  st_demoAccountListLoading: false,
  st_demoAccountListDone: false,
  st_demoAccountListError: null,
  //
  st_demoAccountUpdatePermitLoading: false,
  st_demoAccountUpdatePermitDone: false,
  st_demoAccountUpdatePermitError: null,
  //
  st_demoAccountCreateLoading: false,
  st_demoAccountCreateDone: false,
  st_demoAccountCreateError: null,
};

export const DEMO_ACCOUNT_LIST_REQUEST = "DEMO_ACCOUNT_LIST_REQUEST";
export const DEMO_ACCOUNT_LIST_SUCCESS = "DEMO_ACCOUNT_LIST_SUCCESS";
export const DEMO_ACCOUNT_LIST_FAILURE = "DEMO_ACCOUNT_LIST_FAILURE";
//
export const DEMO_ACCOUNT_UPDATE_PERMIT_REQUEST =
  "DEMO_ACCOUNT_UPDATE_PERMIT_REQUEST";
export const DEMO_ACCOUNT_UPDATE_PERMIT_SUCCESS =
  "DEMO_ACCOUNT_UPDATE_PERMIT_SUCCESS";
export const DEMO_ACCOUNT_UPDATE_PERMIT_FAILURE =
  "DEMO_ACCOUNT_UPDATE_PERMIT_FAILURE";
//
export const DEMO_ACCOUNT_CREATE_REQUEST = "DEMO_ACCOUNT_CREATE_REQUEST";
export const DEMO_ACCOUNT_CREATE_SUCCESS = "DEMO_ACCOUNT_CREATE_SUCCESS";
export const DEMO_ACCOUNT_CREATE_FAILURE = "DEMO_ACCOUNT_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEMO_ACCOUNT_LIST_REQUEST: {
        draft.st_demoAccountListLoading = true;
        draft.st_demoAccountListDone = null;
        draft.st_demoAccountListError = false;
        break;
      }
      case DEMO_ACCOUNT_LIST_SUCCESS: {
        draft.st_demoAccountListLoading = false;
        draft.st_demoAccountListDone = true;
        draft.demoList = action.data.demoAccounts;
        draft.demoLen = action.data.demoLen;
        break;
      }
      case DEMO_ACCOUNT_LIST_FAILURE: {
        draft.st_demoAccountListLoading = false;
        draft.st_demoAccountListDone = false;
        draft.st_demoAccountListError = action.error;
        break;
      }
      //
      case DEMO_ACCOUNT_UPDATE_PERMIT_REQUEST: {
        draft.st_demoAccountUpdatePermitLoading = true;
        draft.st_demoAccountUpdatePermitDone = null;
        draft.st_demoAccountUpdatePermitError = false;
        break;
      }
      case DEMO_ACCOUNT_UPDATE_PERMIT_SUCCESS: {
        draft.st_demoAccountUpdatePermitLoading = false;
        draft.st_demoAccountUpdatePermitDone = true;
        break;
      }
      case DEMO_ACCOUNT_UPDATE_PERMIT_FAILURE: {
        draft.st_demoAccountUpdatePermitLoading = false;
        draft.st_demoAccountUpdatePermitDone = false;
        draft.st_demoAccountUpdatePermitError = action.error;
        break;
      }
      //
      case DEMO_ACCOUNT_CREATE_REQUEST: {
        draft.st_demoAccountCreateLoading = true;
        draft.st_demoAccountCreateDone = null;
        draft.st_demoAccountCreateError = false;
        break;
      }
      case DEMO_ACCOUNT_CREATE_SUCCESS: {
        draft.st_demoAccountCreateLoading = false;
        draft.st_demoAccountCreateDone = true;
        break;
      }
      case DEMO_ACCOUNT_CREATE_FAILURE: {
        draft.st_demoAccountCreateLoading = false;
        draft.st_demoAccountCreateDone = false;
        draft.st_demoAccountCreateError = action.error;
        break;
      }
      //
      default:
        break;
    }
  });

export default reducer;
