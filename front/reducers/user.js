import produce from "../util/produce";

export const initailState = {
  userList: null,
  userLen: 0,
  me: null,
  filePath: null,
  fileOriginName: null,
  secretCode: null,
  currentAdminMenu: [],
  //
  st_userListLoading: false,
  st_userListDone: false,
  st_userListError: null,
  //
  st_userSignupLoading: false,
  st_userSignupDone: false,
  st_userSignupError: null,
  //
  st_userIdImageFileLoading: false,
  st_userIdImageFileDone: false,
  st_userIdImageFileError: null,
  //
  st_userSigninLoading: false,
  st_userSigninDone: false,
  st_userSigninError: null,
  //
  st_signinAdminLoading: false,
  st_signinAdminDone: false,
  st_signinAdminError: null,
  //
  st_userUpdatePriceLoading: false,
  st_userUpdatePriceDone: false,
  st_userUpdatePriceError: null,
  //
  st_userMeUpdateLoading: false,
  st_userMeUpdateDone: false,
  st_userMeUpdateError: null,
  //
  st_userUpdatePermitLoading: false,
  st_userUpdatePermitDone: false,
  st_userUpdatePermitError: null,
  //
  st_userFindPasswordLoading: false,
  st_userFindPasswordDone: false,
  st_userFindPasswordError: null,
  //
  st_userFindPasswordConfirmLoading: false,
  st_userFindPasswordConfirmDone: false,
  st_userFindPasswordConfirmError: null,
  //
  st_userFindPasswordUpdateLoading: false,
  st_userFindPasswordUpdateDone: false,
  st_userFindPasswordUpdateError: null,
  //
  st_userCheckEmailLoading: false,
  st_userCheckEmailDone: false,
  st_userCheckEmailError: null,
  //
  st_userSecretEmailLoading: false,
  st_userSecretEmailDone: false,
  st_userSecretEmailError: null,
  //
  st_loadMyInfoLoading: false,
  st_loadMyInfoDone: false,
  st_loadMyInfoError: null,
};

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_FAILURE = "USER_LIST_FAILURE";
//
export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";
//
export const USER_ID_IMAGE_FILE_REQUEST = "USER_ID_IMAGE_FILE_REQUEST";
export const USER_ID_IMAGE_FILE_SUCCESS = "USER_ID_IMAGE_FILE_SUCCESS";
export const USER_ID_IMAGE_FILE_FAILURE = "USER_ID_IMAGE_FILE_FAILURE";
//
export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAILURE = "USER_SIGNIN_FAILURE";
//
export const SIGNIN_ADMIN_REQUEST = "SIGNIN_ADMIN_REQUEST";
export const SIGNIN_ADMIN_SUCCESS = "SIGNIN_ADMIN_SUCCESS";
export const SIGNIN_ADMIN_FAILURE = "SIGNIN_ADMIN_FAILURE";
//
export const USER_UPDATE_PRICE_REQUEST = "USER_UPDATE_PRICE_REQUEST";
export const USER_UPDATE_PRICE_SUCCESS = "USER_UPDATE_PRICE_SUCCESS";
export const USER_UPDATE_PRICE_FAILURE = "USER_UPDATE_PRICE_FAILURE";
//
export const USER_ME_UPDATE_REQUEST = "USER_ME_UPDATE_REQUEST";
export const USER_ME_UPDATE_SUCCESS = "USER_ME_UPDATE_SUCCESS";
export const USER_ME_UPDATE_FAILURE = "USER_ME_UPDATE_FAILURE";
//
export const USER_UPDATE_PERMIT_REQUEST = "USER_UPDATE_PERMIT_REQUEST";
export const USER_UPDATE_PERMIT_SUCCESS = "USER_UPDATE_PERMIT_SUCCESS";
export const USER_UPDATE_PERMIT_FAILURE = "USER_UPDATE_PERMIT_FAILURE";
//
export const USER_FIND_PASSWORD_REQUEST = "USER_FIND_PASSWORD_REQUEST";
export const USER_FIND_PASSWORD_SUCCESS = "USER_FIND_PASSWORD_SUCCESS";
export const USER_FIND_PASSWORD_FAILURE = "USER_FIND_PASSWORD_FAILURE";
//
export const USER_FIND_PASSWORD_CONFIRM_REQUEST =
  "USER_FIND_PASSWORD_CONFIRM_REQUEST";
export const USER_FIND_PASSWORD_CONFIRM_SUCCESS =
  "USER_FIND_PASSWORD_CONFIRM_SUCCESS";
export const USER_FIND_PASSWORD_CONFIRM_FAILURE =
  "USER_FIND_PASSWORD_CONFIRM_FAILURE";
//
export const USER_FIND_PASSWORD_UPDATE_REQUEST =
  "USER_FIND_PASSWORD_UPDATE_REQUEST";
export const USER_FIND_PASSWORD_UPDATE_SUCCESS =
  "USER_FIND_PASSWORD_UPDATE_SUCCESS";
export const USER_FIND_PASSWORD_UPDATE_FAILURE =
  "USER_FIND_PASSWORD_UPDATE_SUCCESS";
//
export const USER_CHECK_EMAIL_REQUEST = "USER_CHECK_EMAIL_REQUEST";
export const USER_CHECK_EMAIL_SUCCESS = "USER_CHECK_EMAIL_SUCCESS";
export const USER_CHECK_EMAIL_FAILURE = "USER_CHECK_EMAIL_FAILURE";
//
export const USER_SECRET_EMAIL_REQUEST = "USER_SECRET_EMAIL_REQUEST";
export const USER_SECRET_EMAIL_SUCCESS = "USER_SECRET_EMAIL_SUCCESS";
export const USER_SECRET_EMAIL_FAILURE = "USER_SECRET_EMAIL_FAILURE";
//
export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";
//
export const INIT_STATE_REQUEST = "INIT_STATE_REQUEST";
//
export const CURRENT_ADMINMENU_STATUS = "CURRENT_ADMINMENU_STATUS";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case USER_LIST_REQUEST: {
        draft.st_userListLoading = true;
        draft.st_userListDone = null;
        draft.st_userListError = false;
        break;
      }
      case USER_LIST_SUCCESS: {
        draft.st_userListLoading = false;
        draft.st_userListDone = true;
        draft.userList = action.data.users;
        draft.userLen = action.data.userLen;
        break;
      }
      case USER_LIST_FAILURE: {
        draft.st_userListLoading = false;
        draft.st_userListDone = false;
        draft.st_userListError = action.error;
        break;
      }
      //
      case USER_SIGNUP_REQUEST: {
        draft.st_userSignupLoading = true;
        draft.st_userSignupDone = null;
        draft.st_userSignupError = false;
        break;
      }
      case USER_SIGNUP_SUCCESS: {
        draft.st_userSignupLoading = false;
        draft.st_userSignupDone = true;
        break;
      }
      case USER_SIGNUP_FAILURE: {
        draft.st_userSignupLoading = false;
        draft.st_userSignupDone = false;
        draft.st_userSignupError = action.error;
        break;
      }
      //
      case USER_ID_IMAGE_FILE_REQUEST: {
        draft.st_userIdImageFileLoading = true;
        draft.st_userIdImageFileDone = null;
        draft.st_userIdImageFileError = false;
        break;
      }
      case USER_ID_IMAGE_FILE_SUCCESS: {
        draft.st_userIdImageFileLoading = false;
        draft.st_userIdImageFileDone = true;
        draft.filePath = action.data.path;
        draft.fileOriginName = action.data.originName;
        break;
      }
      case USER_ID_IMAGE_FILE_FAILURE: {
        draft.st_userIdImageFileLoading = false;
        draft.st_userIdImageFileDone = false;
        draft.st_userIdImageFileError = action.error;
        break;
      }
      //
      case USER_SIGNIN_REQUEST: {
        draft.st_userSigninLoading = true;
        draft.st_userSigninDone = null;
        draft.st_userSigninError = false;
        break;
      }
      case USER_SIGNIN_SUCCESS: {
        draft.st_userSigninLoading = false;
        draft.st_userSigninDone = true;
        break;
      }
      case USER_SIGNIN_FAILURE: {
        draft.st_userSigninLoading = false;
        draft.st_userSigninDone = false;
        draft.st_userSigninError = action.error;
        break;
      }
      //
      case SIGNIN_ADMIN_REQUEST: {
        draft.st_signinAdminLoading = true;
        draft.st_signinAdminDone = null;
        draft.st_signinAdminError = false;
        break;
      }
      case SIGNIN_ADMIN_SUCCESS: {
        draft.st_signinAdminLoading = false;
        draft.st_signinAdminDone = true;
        break;
      }
      case SIGNIN_ADMIN_FAILURE: {
        draft.st_signinAdminLoading = false;
        draft.st_signinAdminDone = false;
        draft.st_signinAdminError = action.error;
        break;
      }
      //
      case USER_UPDATE_PRICE_REQUEST: {
        draft.st_userUpdatePriceLoading = true;
        draft.st_userUpdatePriceDone = null;
        draft.st_userUpdatePriceError = false;
        break;
      }
      case USER_UPDATE_PRICE_SUCCESS: {
        draft.st_userUpdatePriceLoading = false;
        draft.st_userUpdatePriceDone = true;
        break;
      }
      case USER_UPDATE_PRICE_FAILURE: {
        draft.st_userUpdatePriceLoading = false;
        draft.st_userUpdatePriceDone = false;
        draft.st_userUpdatePriceError = action.error;
        break;
      }
      //
      case USER_ME_UPDATE_REQUEST:
        draft.st_userMeUpdateLoading = true;
        draft.st_userMeUpdateDone = null;
        draft.st_userMeUpdateError = false;
        break;
      case USER_ME_UPDATE_SUCCESS:
        draft.st_userMeUpdateLoading = false;
        draft.st_userMeUpdateDone = true;
        break;
      case USER_ME_UPDATE_FAILURE:
        draft.st_userMeUpdateLoading = false;
        draft.st_userMeUpdateDone = false;
        draft.st_userMeUpdateError = action.error;
        break;
      //
      case USER_UPDATE_PERMIT_REQUEST: {
        draft.st_userUpdatePermitLoading = true;
        draft.st_userUpdatePermitDone = null;
        draft.st_userUpdatePermitError = false;
        break;
      }
      case USER_UPDATE_PERMIT_SUCCESS: {
        draft.st_userUpdatePermitLoading = false;
        draft.st_userUpdatePermitDone = true;
        break;
      }
      case USER_UPDATE_PERMIT_FAILURE: {
        draft.st_userUpdatePermitLoading = false;
        draft.st_userUpdatePermitDone = false;
        draft.st_userUpdatePermitError = action.error;
        break;
      }
      //
      case USER_FIND_PASSWORD_REQUEST: {
        draft.st_userFindPasswordLoading = true;
        draft.st_userFindPasswordDone = null;
        draft.st_userFindPasswordError = false;
        break;
      }
      case USER_FIND_PASSWORD_SUCCESS: {
        draft.st_userFindPasswordLoading = false;
        draft.st_userFindPasswordDone = true;
        draft.secretCode = action.data;
        break;
      }
      case USER_FIND_PASSWORD_FAILURE: {
        draft.st_userFindPasswordLoading = false;
        draft.st_userFindPasswordDone = false;
        draft.st_userFindPasswordError = action.error;
        break;
      }
      //
      case USER_FIND_PASSWORD_CONFIRM_REQUEST: {
        draft.st_userFindPasswordConfirmLoading = true;
        draft.st_userFindPasswordConfirmDone = null;
        draft.st_userFindPasswordConfirmError = false;
        break;
      }
      case USER_FIND_PASSWORD_CONFIRM_SUCCESS: {
        draft.st_userFindPasswordConfirmLoading = false;
        draft.st_userFindPasswordConfirmDone = true;
        break;
      }
      case USER_FIND_PASSWORD_CONFIRM_FAILURE: {
        draft.st_userFindPasswordConfirmLoading = false;
        draft.st_userFindPasswordConfirmDone = false;
        draft.st_userFindPasswordConfirmError = action.error;
        break;
      }
      //
      case USER_FIND_PASSWORD_UPDATE_REQUEST: {
        draft.st_userFindPasswordUpdateLoading = true;
        draft.st_userFindPasswordUpdateDone = null;
        draft.st_userFindPasswordUpdateError = false;
        break;
      }
      case USER_FIND_PASSWORD_UPDATE_SUCCESS: {
        draft.st_userFindPasswordUpdateLoading = false;
        draft.st_userFindPasswordUpdateDone = true;
        break;
      }
      case USER_FIND_PASSWORD_UPDATE_FAILURE: {
        draft.st_userFindPasswordUpdateLoading = false;
        draft.st_userFindPasswordUpdateDone = false;
        draft.st_userFindPasswordUpdateError = action.error;
        break;
      }
      //
      case USER_CHECK_EMAIL_REQUEST:
        draft.st_userCheckEmailLoading = true;
        draft.st_userCheckEmailError = null;
        draft.st_userCheckEmailDone = false;
        break;
      case USER_CHECK_EMAIL_SUCCESS:
        draft.st_userCheckEmailLoading = false;
        draft.st_userCheckEmailDone = true;
        break;
      case USER_CHECK_EMAIL_FAILURE:
        draft.st_userCheckEmailLoading = false;
        draft.st_userCheckEmailDone = false;
        draft.st_userCheckEmailError = action.error;
        break;
      //
      case USER_SECRET_EMAIL_REQUEST:
        draft.st_userSecretEmailLoading = true;
        draft.st_userSecretEmailError = null;
        draft.st_userSecretEmailDone = false;
        break;
      case USER_SECRET_EMAIL_SUCCESS:
        draft.st_userSecretEmailLoading = false;
        draft.st_userSecretEmailDone = true;
        draft.secretCode = action.data;
        break;
      case USER_SECRET_EMAIL_FAILURE:
        draft.st_userSecretEmailLoading = false;
        draft.st_userSecretEmailDone = false;
        draft.st_userSecretEmailError = action.error;
        break;
      //
      case LOAD_MY_INFO_REQUEST:
        draft.st_loadMyInfoLoading = true;
        draft.st_loadMyInfoError = null;
        draft.st_loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = action.error;
        break;
      //
      case INIT_STATE_REQUEST:
        draft.st_userFindPasswordDone = false;
        draft.st_userFindPasswordError = false;
        draft.st_userFindPasswordConfirmDone = false;
        draft.st_userFindPasswordConfirmError = false;
        break;
      case CURRENT_ADMINMENU_STATUS: {
        const exist = draft.currentAdminMenu.filter(
          (data) => data === action.data.key
        );

        if (exist.length > 0) {
          draft.currentAdminMenu = draft.currentAdminMenu.filter(
            (data) => data !== action.data.key
          );
        } else {
          draft.currentAdminMenu = [...draft.currentAdminMenu, action.data.key];
        }

        break;
      }
      //
      default:
        break;
    }
  });

export default reducer;
