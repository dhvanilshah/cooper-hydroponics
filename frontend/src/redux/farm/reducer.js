import actions from "./actions";

const initState = {
  currentFarmId: null,
  currentFarmName: null,
  bodyText: "Please select a farm from the dropdown."
};

export default function farmReducer(state = initState, action) {
  switch (action.type) {
    case actions.UPDATE_FARM:
      console.log(action.farmId, action.farmName);
      return {
        ...state,
        currentFarmId: action.farmId,
        currentFarmName: action.farmName
      };
    case actions.SET_MESSAGE:
      return {
        ...state,
        bodyText: action.message
      };
    // case actions.LOGOUT:
    //   console.log("logout");
    //   return initState;
    default:
      return state;
  }
}
