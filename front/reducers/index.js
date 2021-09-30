import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import company from "./company";
import question from "./question";
import deposit from "./deposit";
import withdraw from "./withdraw";
import liveAccount from "./liveAccount";
import demoAccount from "./demoAccount";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        company,
        question,
        deposit,
        withdraw,
        liveAccount,
        demoAccount,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
