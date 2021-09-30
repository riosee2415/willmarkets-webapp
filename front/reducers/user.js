import produce from "../util/produce";

export const initailState = {
  me: null,
  currentAdminMenu: [],
  users: null,

  email: null,
  userImagePath: null,

  updateModal: false,

  st_userListLoading: false,
  st_userListDone: false,
  st_userListError: null,
  //
  st_userMyLoading: false,
  st_userMyDone: false,
  st_userMyError: null,
  //
  st_signUpLoading: false,
  st_signUpDone: false,
  st_signUpError: null,
  //
  st_userIdImageFileLoading: false,
  st_userIdImageFileDone: false,
  st_userIdImageFileError: null,
  //
  st_userMyUpdateLoading: false,
  st_userMyUpdateDone: false,
  st_userMyUpdateError: null,
  //
  st_signinLoading: false,
  st_signinDone: false,
  st_signinError: null,
  //
  st_signinAdminLoading: false,
  st_signinAdminDone: false,
  st_signinAdminError: null,
  //
  st_updatePriceLoading: false,
  st_updatePriceDone: false,
  st_updatePriceError: null,
  //
  st_userUpdatePermitLoading: false,
  st_userUpdatePermitDone: false,
  st_userUpdatePermitError: null,

  st_userListUpdateLoading: false,
  st_userListUpdateDone: false,
  st_userListUpdateError: null,
  //
  st_userFindEmailLoading: false,
  st_userFindEmailDone: false,
  st_userFindEmailError: null,
  //
  st_userModifyPasswordLoading: false,
  st_userModifyPasswordDone: false,
  st_userModifyPasswordError: null,
  //
  st_userModifyPasswordUpdateLoading: false,
  st_userModifyPasswordUpdateDone: false,
  st_userModifyPasswordUpdateError: null,
  //
  st_loadMyInfoLoading: false, // 로그인 정보 가져오기 시도 중
  st_loadMyInfoDone: false,
  st_loadMyInfoError: null,
};

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_FAILURE = "USER_LIST_FAILURE";

export const USER_MY_REQUEST = "USER_MY_REQUEST";
export const USER_MY_SUCCESS = "USER_MY_SUCCESS";
export const USER_MY_FAILURE = "USER_MY_FAILURE";

export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const USER_ID_IMAGE_FILE_REQUEST = "USER_ID_IMAGE_FILE_REQUEST";
export const USER_ID_IMAGE_FILE_SUCCESS = "USER_ID_IMAGE_FILE_SUCCESS";
export const USER_ID_IMAGE_FILE_FAILURE = "USER_ID_IMAGE_FILE_FAILURE";

export const USER_SIGN_IN_REQUEST = "USER_SIGN_IN_REQUEST";
export const USER_SIGN_IN_SUCCESS = "USER_SIGN_IN_SUCCESS";
export const USER_SIGN_IN_FAILURE = "USER_SIGN_IN_FAILURE";

export const SIGNIN_ADMIN_REQUEST = "SIGNIN_ADMIN_REQUEST";
export const SIGNIN_ADMIN_SUCCESS = "SIGNIN_ADMIN_SUCCESS";
export const SIGNIN_ADMIN_FAILURE = "SIGNIN_ADMIN_FAILURE";

export const UPDATE_PRICE_REQUEST = "UPDATE_PRICE_REQUEST";
export const UPDATE_PRICE_SUCCESS = "UPDATE_PRICE_SUCCESS";
export const UPDATE_PRICE_FAILURE = "UPDATE_PRICE_FAILURE";

export const USER_MY_UPDATE_REQUEST = "USER_MY_UPDATE_REQUEST";
export const USER_MY_UPDATE_SUCCESS = "USER_MY_UPDATE_SUCCESS";
export const USER_MY_UPDATE_FAILURE = "USER_MY_UPDATE_FAILURE";

export const USER_UPDATE_PERMIT_REQUEST = "USER_UPDATE_PERMIT_REQUEST";
export const USER_UPDATE_PERMIT_SUCCESS = "USER_UPDATE_PERMIT_SUCCESS";
export const USER_UPDATE_PERMIT_FAILURE = "USER_UPDATE_PERMIT_FAILURE";

export const USER_FIND_EMAIL_REQUEST = "USER_FIND_EMAIL_REQUEST";
export const USER_FIND_EMAIL_SUCCESS = "USER_FIND_EMAIL_SUCCESS";
export const USER_FIND_EMAIL_FAILURE = "USER_FIND_EMAIL_FAILURE";

export const USER_MODIFY_PASSWORD_REQUEST = "USER_MODIFY_PASSWORD_REQUEST";
export const USER_MODIFY_PASSWORD_SUCCESS = "USER_MODIFY_PASSWORD_SUCCESS";
export const USER_MODIFY_PASSWORD_FAILURE = "USER_MODIFY_PASSWORD_FAILURE";

export const USER_MODIFY_PASSWORD_UPDATE_REQUEST =
  "USER_MODIFY_PASSWORD_UPDATE_REQUEST";
export const USER_MODIFY_PASSWORD_UPDATE_SUCCESS =
  "USER_MODIFY_PASSWORD_UPDATE_SUCCESS";
export const USER_MODIFY_PASSWORD_UPDATE_FAILURE =
  "USER_MODIFY_PASSWORD_UPDATEFAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const UPDATE_MODAL_OPEN_REQUEST = "UPDATE_MODAL_OPEN_REQUEST";
export const UPDATE_MODAL_CLOSE_REQUEST = "UPDATE_MODAL_CLOSE_REQUEST";

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
        draft.users = action.data;
        break;
      }
      case USER_LIST_FAILURE: {
        draft.st_userListLoading = false;
        draft.st_userListDone = false;
        draft.st_userListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case USER_MY_REQUEST:
        draft.st_userMyLoading = true;
        draft.st_userMyError = null;
        draft.st_userMyDone = false;
        break;

      case USER_MY_SUCCESS:
        draft.st_userMyLoading = false;
        draft.st_userMyDone = true;
        draft.me = action.data;
        break;
      case USER_MY_FAILURE:
        draft.st_userMyLoading = false;
        draft.st_userMyDone = false;
        draft.st_userMyError = action.error;
        break;
      ///////////////////////////////////////////////////////
      case USER_MY_UPDATE_REQUEST:
        draft.st_userMyUpdateLoading = false;
        draft.st_userMyUpdateDone = false;
        draft.st_userMyUpdateError = action.error;
        break;

      case USER_MY_UPDATE_SUCCESS:
        draft.st_userMyUpdateLoading = true;
        draft.st_userMyUpdateDone = false;

        break;

      case USER_MY_UPDATE_FAILURE:
        draft.st_userMyUpdateLoading = false;
        draft.st_userMyUpdateDone = true;
        draft.st_userMyUpdateError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case USER_ID_IMAGE_FILE_REQUEST: {
        draft.st_userIdImageFileLoading = true;
        draft.st_userIdImageFileDone = null;
        draft.st_userIdImageFileError = false;
        break;
      }

      case USER_ID_IMAGE_FILE_SUCCESS: {
        draft.st_userIdImageFileLoading = false;
        draft.st_userIdImageFileDone = true;
        draft.userImagePath = action.data;
        break;
      }
      case USER_ID_IMAGE_FILE_FAILURE: {
        draft.st_signinLoading = false;
        draft.st_signinDone = false;
        draft.st_signinError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case USER_SIGN_IN_REQUEST: {
        draft.st_signinLoading = true;
        draft.st_signinDone = null;
        draft.st_signinError = false;
        break;
      }

      case USER_SIGN_IN_SUCCESS: {
        draft.st_loginLoading = false;
        draft.st_loginDone = true;
        draft.me = action.data;
        break;
      }
      case USER_SIGN_IN_FAILURE: {
        draft.st_signinLoading = false;
        draft.st_signinDone = false;
        draft.st_signinError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case SIGNIN_ADMIN_REQUEST: {
        draft.st_signinAdminLoading = true;
        draft.st_signinAdminDone = null;
        draft.st_signinAdminError = false;
        break;
      }
      case SIGNIN_ADMIN_SUCCESS: {
        draft.st_signinAdminLoading = false;
        draft.st_signinAdminDone = true;
        draft.me = action.data;
        break;
      }
      case SIGNIN_ADMIN_FAILURE: {
        draft.st_signinAdminLoading = false;
        draft.st_signinAdminDone = false;
        draft.st_signinAdminError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_SIGNUP_REQUEST: {
        draft.st_signUpLoading = true;
        draft.st_signUpDone = null;
        draft.st_signUpError = false;
        break;
      }
      case USER_SIGNUP_SUCCESS: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = true;
        break;
      }
      case USER_SIGNUP_FAILURE: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = false;
        draft.st_signUpError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_UPDATE_PERMIT_REQUEST: {
        draft.st_updatePriceLoading = true;
        draft.st_updatePriceDone = null;
        draft.st_updatePriceError = false;
        break;
      }
      case USER_UPDATE_PERMIT_SUCCESS: {
        draft.st_updatePriceLoading = false;
        draft.st_updatePriceDone = true;
        break;
      }
      case USER_UPDATE_PERMIT_FAILURE: {
        draft.st_updatePriceLoading = false;
        draft.st_updatePriceDone = false;
        draft.st_updatePriceError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case UPDATE_PRICE_REQUEST: {
        draft.st_userUpdatePermitLoading = true;
        draft.st_userUpdatePermitDone = null;
        draft.st_userUpdatePermitError = false;
        break;
      }
      case UPDATE_PRICE_SUCCESS: {
        draft.st_userUpdatePermitLoading = false;
        draft.st_userUpdatePermitDone = true;
        break;
      }
      case UPDATE_PRICE_FAILURE: {
        draft.st_userUpdatePermitLoading = false;
        draft.st_userUpdatePermitDone = false;
        draft.st_userUpdatePermitError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_FIND_EMAIL_REQUEST: {
        draft.st_userFindEmailLoading = true;
        draft.st_userFindEmailDone = null;
        draft.st_userFindEmailError = false;
        break;
      }
      case USER_FIND_EMAIL_SUCCESS: {
        draft.st_userFindEmailLoading = false;
        draft.st_userFindEmailDone = true;
        draft.email = action.email;
        break;
      }
      case USER_FIND_EMAIL_FAILURE: {
        draft.st_userFindEmailLoading = false;
        draft.st_userFindEmailDone = false;
        draft.st_userFindEmailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case USER_MODIFY_PASSWORD_REQUEST: {
        draft.st_userModifyPasswordLoading = true;
        draft.st_userModifyPasswordDone = null;
        draft.st_userModifyPasswordError = false;
        break;
      }
      case USER_MODIFY_PASSWORD_SUCCESS: {
        draft.st_userModifyPasswordLoading = false;
        draft.st_userModifyPasswordDone = true;
        break;
      }
      case USER_MODIFY_PASSWORD_FAILURE: {
        draft.st_userModifyPasswordLoading = false;
        draft.st_userModifyPasswordDone = false;
        draft.st_userModifyPasswordError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case USER_MODIFY_PASSWORD_UPDATE_REQUEST: {
        draft.st_userModifyPasswordUpdateLoading = true;
        draft.st_userModifyPasswordUpdateDone = null;
        draft.st_userModifyPasswordUpdateError = false;
        break;
      }
      case USER_MODIFY_PASSWORD_UPDATE_SUCCESS: {
        draft.st_userModifyPasswordUpdateLoading = false;
        draft.st_userModifyPasswordUpdateDone = true;
        break;
      }
      case USER_MODIFY_PASSWORD_UPDATE_FAILURE: {
        draft.st_userModifyPasswordUpdateLoading = false;
        draft.st_userModifyPasswordUpdateDone = false;
        draft.st_userModifyPasswordUpdateError = action.error;
        break;
      }
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

      //////////////////////////////////////////////
      //

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

      //////////////////////////////////////////////

      case UPDATE_MODAL_OPEN_REQUEST:
        draft.updateModal = true;
        break;

      case UPDATE_MODAL_CLOSE_REQUEST:
        draft.updateModal = false;
        break;

      default:
        break;
    }
  });

export default reducer;
