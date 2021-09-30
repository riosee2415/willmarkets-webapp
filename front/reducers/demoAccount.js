import produce from "../util/produce";

export const initailState = {
  demoList: null,

  st_demoAccountLoading: false,
  st_demoAccountDone: false,
  st_demoAccountError: null,

  st_demoAccountUpdatePermitLoading: false,
  st_demoAccountUpdatePermitDone: false,
  st_demoAccountUpdatePermitError: null,

  st_demoAccountCreateLoading: false,
  st_demoAccountCreateDone: false,
  st_demoAccountCreateError: null,
};

export const DEMO_ACCOUNT_LIST_REQUEST = "DEMO_ACCOUNT_LIST_REQUEST";
export const DEMO_ACCOUNT_LIST_SUCCESS = "DEMO_ACCOUNT_LIST_SUCCESS";
export const DEMO_ACCOUNT_LIST_FAILURE = "DEMO_ACCOUNT_LIST_FAILURE";

export const DEMO_ACCOUNT_UPDATE_PERMIT_REQUEST =
  "DEMO_ACCOUNT_UPDATE_PERMIT_REQUEST";
export const DEMO_ACCOUNT_UPDATE_PERMIT_SUCCESS =
  "DEMO_ACCOUNT_UPDATE_PERMIT_SUCCESS";
export const DEMO_ACCOUNT_UPDATE_PERMIT_FAILURE =
  "DEMO_ACCOUNT_UPDATE_PERMIT_FAILURE";

export const DEMO_ACCOUNT_CREATE_REQUEST = " DEMO_ACCOUNT_CREATE_REQUEST";
export const DEMO_ACCOUNT_CREATE_SUCCESS = " DEMO_ACCOUNT_CREATE_SUCCESS";
export const DEMO_ACCOUNT_CREATE_FAILURE = " DEMO_ACCOUNT_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEMO_ACCOUNT_LIST_REQUEST: {
        draft.st_demoAccountLoading = true;
        draft.st_demoAccountDone = null;
        draft.st_demoAccountError = false;
        break;
      }
      case DEMO_ACCOUNT_LIST_SUCCESS: {
        draft.st_demoAccountLoading = false;
        draft.st_demoAccountDone = true;
        draft.demoList = action.data;
        break;
      }
      case DEMO_ACCOUNT_LIST_FAILURE: {
        draft.st_demoAccountLoading = false;
        draft.st_demoAccountDone = false;
        draft.st_demoAccountError = action.error;
        break;
      }
      case DEMO_ACCOUNT_UPDATE_PERMIT_REQUEST: {
        draft.st_demoAccountUpdatePermitLoading = true;
        draft.st_demoAccountUpdatePermitDone = null;
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
      case DEMO_ACCOUNT_CREATE_REQUEST: {
        draft.st_demoAccountCreateLoading = true;
        draft.st_demoAccountCreateDone = null;
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
      default:
        break;
    }
  });

export default reducer;
