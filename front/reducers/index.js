import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import question from "./question";
import deposit from "./deposit";
import withdraw from "./withdraw";
import liveAccount from "./liveAccount";
import demoAccount from "./demoAccount";
import popup from "./popup";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        question,
        deposit,
        withdraw,
        liveAccount,
        demoAccount,
        popup,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
