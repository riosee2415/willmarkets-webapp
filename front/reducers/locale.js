import produce from "../util/produce";

export const initailState = {
  locale: "ko",
};

export const CHANGE_LOCALE = "CHANGE_LOCALE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
