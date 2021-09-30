import produce from "../util/produce";

export const initailState = {
  withdrawList: null,

  st_withdrawLoading: false, // 입출금(심사기록) 정보 가져오기
  st_withdrawDone: false,
  st_withdrawError: null,

  st_updatewithdrawPermitLoading: false, // 입출금(심사기록) 정보 수정하기
  st_updatewithdrawPermitDone: false,
  st_updatewithdrawPermitError: null,

  st_withdrawCreateLoading: false, // 입출금(심사기록) 정보 추가하기
  st_withdrawCreateDone: false,
  st_withdrawCreateError: null,
};

export const WITHDRAW_LIST_REQUEST = "WITHDRAW_LIST_REQUEST";
export const WITHDRAW_LIST_SUCCESS = "WITHDRAW_LIST_SUCCESS";
export const WITHDRAW_LIST_FAILURE = "WITHDRAW_LIST_FAILURE";

export const UPDATE_WITHDRAW_PERMIT_REQUEST = "UPDATE_WITHDRAW_PERMIT_REQUEST";
export const UPDATE_WITHDRAW_PERMIT_SUCCESS = "UPDATE_WITHDRAW_PERMIT_SUCCESS";
export const UPDATE_WITHDRAW_PERMIT_FAILURE = "UPDATE_WITHDRAW_PERMIT_FAILURE";

export const CREATE_WITHDRAW_REQUEST = "CREATE_WITHDRAW_REQUEST";
export const CREATE_WITHDRAW_SUCCESS = "CREATE_WITHDRAW_SUCCESS";
export const CREATE_WITHDRAW_FAILURE = "CREATE_WITHDRAW_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case WITHDRAW_LIST_REQUEST: {
        draft.st_withdrawLoading = true;
        draft.st_withdrawDone = null;
        draft.st_withdrawError = false;
        break;
      }
      case WITHDRAW_LIST_SUCCESS: {
        draft.st_withdrawLoading = false;
        draft.st_withdrawDone = true;
        draft.withdrawList = action.data;
        break;
      }
      case WITHDRAW_LIST_FAILURE: {
        draft.st_withdrawLoading = false;
        draft.st_withdrawDone = false;
        draft.st_withdrawError = action.error;
        break;
      }
      case UPDATE_WITHDRAW_PERMIT_REQUEST: {
        draft.st_updatewithdrawPermitLoading = true;
        draft.st_updatewithdrawPermitDone = null;
        draft.st_updatewithdrawPermitError = false;
        break;
      }
      case UPDATE_WITHDRAW_PERMIT_SUCCESS: {
        draft.st_updatewithdrawPermitLoading = false;
        draft.st_updatewithdrawPermitDone = true;
        draft.withdrawList = action.data;
        break;
      }
      case UPDATE_WITHDRAW_PERMIT_FAILURE: {
        draft.st_updatewithdrawPermitLoading = false;
        draft.st_withdrawUpdatePermitDone = false;
        draft.st_updatewithdrawPermitError = action.error;
        break;
      }
      case CREATE_WITHDRAW_REQUEST: {
        draft.st_withdrawCreateLoading = true;
        draft.st_withdrawCreateDone = null;
        draft.st_withdrawCreateError = false;
        break;
      }
      case CREATE_WITHDRAW_SUCCESS: {
        draft.st_withdrawCreateLoading = false;
        draft.st_withdrawCreateDone = true;
        break;
      }
      case CREATE_WITHDRAW_FAILURE: {
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
