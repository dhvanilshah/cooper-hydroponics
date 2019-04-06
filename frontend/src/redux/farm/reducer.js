import actions from "./actions";

const initState = {
  currentFarm: null
};

export default function farmReducer(state = initState, action) {
  switch (action.type) {
    case actions.UPDATE_FARM:
      return {
        ...state,
        currentFarm: action.farmId
      };
    // case actions.LOGOUT:
    //   console.log("logout");
    //   return initState;
    default:
      return state;
  }
}
