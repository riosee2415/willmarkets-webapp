import produce from "../util/produce";

export const initailState = {
  depositList: null,
  filePath: null,
  fileOriginName: null,
  //
  st_depositListLoading: false,
  st_depositListDone: false,
  st_depositListError: null,
  //
  st_depositUpdatePermitLoading: false,
  st_depositUpdatePermitDone: false,
  st_depositUpdatePermitError: null,
  //
  st_depositCreateLoading: false,
  st_depositCreateDone: false,
  st_depositCreateError: null,
  //
  st_depositImageFileCreateLoading: false,
  st_depositImageFileCreateDone: false,
  st_depositImageFileCreateError: null,
  //
  st_depositImageFileLoading: false,
  st_depositImageFileDone: false,
  st_depositImageFileError: null,
};

export const DEPOSIT_LIST_REQUEST = "DEPOSIT_LIST_REQUEST";
export const DEPOSIT_LIST_SUCCESS = "DEPOSIT_LIST_SUCCESS";
export const DEPOSIT_LIST_FAILURE = "DEPOSIT_LIST_FAILURE";
//
export const DEPOSIT_UPDATE_PERMIT_REQUEST = "DEPOSIT_UPDATE_PERMIT_REQUEST";
export const DEPOSIT_UPDATE_PERMIT_SUCCESS = "DEPOSIT_UPDATE_PERMIT_SUCCESS";
export const DEPOSIT_UPDATE_PERMIT_FAILURE = "DEPOSIT_UPDATE_PERMIT_FAILURE";
//
export const DEPOSIT_CREATE_REQUEST = "DEPOSIT_CREATE_REQUEST";
export const DEPOSIT_CREATE_SUCCESS = "DEPOSIT_CREATE_SUCCESS";
export const DEPOSIT_CREATE_FAILURE = "DEPOSIT_CREATE_FAILURE";
//
export const DEPOSIT_IMAGE_FILE_CREATE_REQUEST =
  "DEPOSIT_IMAGE_FILE_CREATE_REQUEST";
export const DEPOSIT_IMAGE_FILE_CREATE_SUCCESS =
  "DEPOSIT_IMAGE_FILE_CREATE_SUCCESS";
export const DEPOSIT_IMAGE_FILE_CREATE_FAILURE =
  "DEPOSIT_IMAGE_FILE_CREATE_FAILURE";
//
export const DEPOSIT_IMAGE_FILE_REQUEST = "DEPOSIT_IMAGE_FILE_REQUEST";
export const DEPOSIT_IMAGE_FILE_SUCCESS = "DEPOSIT_IMAGE_FILE_SUCCESS";
export const DEPOSIT_IMAGE_FILE_FAILURE = "DEPOSIT_IMAGE_FILE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEPOSIT_LIST_REQUEST: {
        draft.st_depositListLoading = true;
        draft.st_depositListDone = null;
        draft.st_depositListError = false;
        break;
      }
      case DEPOSIT_LIST_SUCCESS: {
        draft.st_depositListLoading = false;
        draft.st_depositListDone = true;
        draft.depositList = action.data;
        break;
      }
      case DEPOSIT_LIST_FAILURE: {
        draft.st_depositListLoading = false;
        draft.st_depositListDone = false;
        draft.st_depositListError = action.error;
        break;
      }
      //
      case DEPOSIT_UPDATE_PERMIT_REQUEST: {
        draft.st_depositUpdatePermitLoading = true;
        draft.st_depositUpdatePermitDone = null;
        draft.st_depositUpdatePermitError = false;
        break;
      }
      case DEPOSIT_UPDATE_PERMIT_SUCCESS: {
        draft.st_depositUpdatePermitLoading = false;
        draft.st_depositUpdatePermitDone = true;
        break;
      }
      case DEPOSIT_UPDATE_PERMIT_FAILURE: {
        draft.st_depositUpdatePermitLoading = false;
        draft.st_depositUpdatePermitDone = false;
        draft.st_depositUpdatePermitError = action.error;
        break;
      }
      //
      case DEPOSIT_CREATE_REQUEST: {
        draft.st_depositCreateLoading = true;
        draft.st_depositCreateDone = null;
        draft.st_depositCreateError = false;
        break;
      }
      case DEPOSIT_CREATE_SUCCESS: {
        draft.st_depositCreateLoading = false;
        draft.st_depositCreateDone = true;
        break;
      }
      case DEPOSIT_CREATE_FAILURE: {
        draft.st_depositCreateLoading = false;
        draft.st_depositCreateDone = false;
        draft.st_depositCreateError = action.error;
        break;
      }
      //
      case DEPOSIT_IMAGE_FILE_CREATE_REQUEST: {
        draft.st_depositImageFileCreateLoading = true;
        draft.st_depositImageFileCreateDone = null;
        draft.st_depositImageFileCreateError = false;
        break;
      }
      case DEPOSIT_IMAGE_FILE_CREATE_SUCCESS: {
        draft.st_depositImageFileCreateLoading = false;
        draft.st_depositImageFileCreateDone = true;
        break;
      }
      case DEPOSIT_IMAGE_FILE_CREATE_FAILURE: {
        draft.st_depositImageFileCreateLoading = false;
        draft.st_depositImageFileCreateDone = false;
        draft.st_depositImageFileCreateError = action.error;
        break;
      }
      //
      case DEPOSIT_IMAGE_FILE_REQUEST: {
        draft.st_depositImageFileLoading = true;
        draft.st_depositImageFileDone = null;
        draft.st_depositImageFileError = action.error;
        break;
      }
      case DEPOSIT_IMAGE_FILE_SUCCESS: {
        draft.st_depositImageFileLoading = false;
        draft.st_depositImageFileDone = true;
        draft.filePath = action.data.path;
        draft.fileOriginName = action.data.originName;
        break;
      }
      case DEPOSIT_IMAGE_FILE_FAILURE: {
        draft.st_depositImageFileLoading = false;
        draft.st_depositImageFileDone = false;
        draft.st_depositImageFileError = action.error;
        break;
      }
      //
      default:
        break;
    }
  });

export default reducer;
