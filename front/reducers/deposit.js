import produce from "../util/produce";

export const initailState = {
  depositList: null,

  depositImagePath: null,

  st_depositLoading: false, // 입출금 정보 가져오기
  st_depositDone: false,
  st_depositError: null,

  st_depositUpdatePermitLoading: false, // 입출금 정보 수정하기
  st_depositUpdatePermitDone: false,
  st_depositUpdatePermitError: null,

  st_depositCreateLoading: false, // 입출금 정보 추가하기
  st_depositCreateDone: false,
  st_depositCreateError: null,

  st_depositImageFileCreateLoading: false, // 입출금 정보 추가하기
  st_depositImageFileCreateDone: false,
  st_depositImageFileCreateError: null,

  st_depositImageFileLoading: false, // 입출금 정보 추가하기
  st_depositImageFileDone: false,
  st_depositImageFileError: null,
};

export const DEPOSIT_LIST_REQUEST = " DEPOSIT_LIST_REQUEST";
export const DEPOSIT_LIST_SUCCESS = " DEPOSIT_LIST_SUCCESS";
export const DEPOSIT_LIST_FAILURE = " DEPOSIT_LIST_FAILURE";

export const DEPOSIT_UPDATE_PERMIT_REQUEST = " DEPOSIT_UPDATE_PERMIT_REQUEST";
export const DEPOSIT_UPDATE_PERMIT_SUCCESS = " DEPOSIT_UPDATE_PERMIT_SUCCESS";
export const DEPOSIT_UPDATE_PERMIT_FAILURE = " DEPOSIT_UPDATE_PERMIT_FAILURE";

export const DEPOSIT_CREATE_REQUEST = " DEPOSIT_CREATE_REQUEST";
export const DEPOSIT_CREATE_SUCCESS = " DEPOSIT_CREATE_SUCCESS";
export const DEPOSIT_CREATE_FAILURE = " DEPOSIT_CREATE_FAILURE";

export const DEPOSIT_IMAGE_FILE_CREATE_REQUEST =
  " DEPOSIT_IMAGE_FILE_CREATE_REQUEST";
export const DEPOSIT_IMAGE_FILE_CREATE_SUCCESS =
  " DEPOSIT_IMAGE_FILE_CREATE_SUCCESS";
export const DEPOSIT_IMAGE_FILE_CREATE_FAILURE =
  " DEPOSIT_IMAGE_FILE_CREATE_FAILURE";

export const DEPOSIT_IMAGE_FILE_REQUEST = " DEPOSIT_IMAGE_FILE_REQUEST";
export const DEPOSIT_IMAGE_FILE_SUCCESS = " DEPOSIT_IMAGE_FILE_SUCCESS";
export const DEPOSIT_IMAGE_FILE_FAILURE = " DEPOSIT_IMAGE_FILE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEPOSIT_LIST_REQUEST: {
        draft.st_depositLoading = true;
        draft.st_depositDone = null;
        draft.st_depositError = false;
        break;
      }
      case DEPOSIT_LIST_SUCCESS: {
        draft.st_depositLoading = false;
        draft.st_depositDone = true;
        draft.depositList = action.data;
        break;
      }
      case DEPOSIT_LIST_FAILURE: {
        draft.st_depositLoading = false;
        draft.st_depositDone = false;
        draft.st_depositError = action.error;
        break;
      }
      case DEPOSIT_UPDATE_PERMIT_REQUEST: {
        draft.st_depositUpdatePermitLoading = true;
        draft.st_depositUpdatePermitDone = null;
        break;
      }
      case DEPOSIT_UPDATE_PERMIT_SUCCESS: {
        draft.st_depositUpdatePermitLoading = false;
        draft.st_depositUpdatePermitDone = true;
        draft.depositList = action.data;
        break;
      }
      case DEPOSIT_UPDATE_PERMIT_FAILURE: {
        draft.st_depositUpdatePermitLoading = false;
        draft.st_depositUpdatePermitDone = false;
        draft.st_depositUpdatePermitError = action.error;
        break;
      }
      case DEPOSIT_CREATE_REQUEST: {
        draft.st_depositCreateLoading = true;
        draft.st_depositCreateDone = null;
        break;
      }
      case DEPOSIT_CREATE_SUCCESS: {
        draft.st_depositCreateLoading = false;
        draft.st_depositCreateDone = true;
        break;
      }
      case DEPOSIT_CREATE_FAILURE: {
        draft.st_depositImageFileCreateLoading = false;
        draft.st_depositImageFileCreateDone = false;
        draft.st_depositImageFileCreateError = action.error;
        break;
      }
      case DEPOSIT_IMAGE_FILE_CREATE_REQUEST: {
        draft.st_depositImageFileCreateLoading = true;
        draft.st_depositImageFileCreateDone = null;
        draft.imagepat;
        break;
      }
      case DEPOSIT_IMAGE_FILE_CREATE_SUCCESS: {
        draft.st_depositImageFileCreateLoading = false;
        draft.st_depositImageFileCreateDone = true;
        draft.depositImagePath = action.data;
        break;
      }
      case DEPOSIT_IMAGE_FILE_CREATE_FAILURE: {
        draft.st_depositImageFileCreateLoading = false;
        draft.st_depositImageFileCreateDone = false;
        draft.st_depositImageFileCreateError = action.error;
        break;
      }
      case DEPOSIT_IMAGE_FILE_REQUEST: {
        draft.st_depositImageFileLoading = true;
        draft.st_depositImageFileDone = null;
        draft.st_depositImageFileError = action.error;
        break;
      }
      case DEPOSIT_IMAGE_FILE_SUCCESS: {
        draft.st_depositImageFileLoading = false;
        draft.st_depositImageFileDone = true;
        draft.depositImagePath = action.data;
        break;
      }
      case DEPOSIT_IMAGE_FILE_FAILURE: {
        draft.st_depositImageFileLoading = false;
        draft.st_depositImageFileDone = false;
        draft.st_depositImageFileError = action.error;
        break;
      }
      default:
        break;
    }
  });

export default reducer;
