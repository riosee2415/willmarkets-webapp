import produce from "../util/produce";

export const initailState = {
  st_priceHistoryCreateLoading: false,
  st_priceHistoryCreateDone: false,
  st_priceHistoryCreateError: null,
};

export const PRICE_HISTORY_CREATE_REQUEST = "PRICE_HISTORY_CREATE_REQUEST";
export const PRICE_HISTORY_CREATE_SUCCESS = "PRICE_HISTORY_CREATE_SUCCESS";
export const PRICE_HISTORY_CREATE_FAILURE = "PRICE_HISTORY_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PRICE_HISTORY_CREATE_REQUEST: {
        draft.st_priceHistoryCreateLoading = true;
        draft.st_priceHistoryCreateDone = null;
        draft.st_priceHistoryCreateError = false;
        break;
      }
      case PRICE_HISTORY_CREATE_SUCCESS: {
        draft.st_priceHistoryCreateLoading = false;
        draft.st_priceHistoryCreateDone = true;
        break;
      }
      case PRICE_HISTORY_CREATE_FAILURE: {
        draft.st_priceHistoryCreateLoading = false;
        draft.st_priceHistoryCreateDone = false;
        draft.st_priceHistoryCreateError = action.error;
        break;
      }
      //
      default:
        break;
    }
  });

export default reducer;
