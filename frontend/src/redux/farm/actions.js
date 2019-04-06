const actions = {
  UPDATE_FARM: "UPDATE_FARM",
  updateFarm: farmId => ({ type: actions.UPDATE_FARM, farmId })
};
export default actions;
