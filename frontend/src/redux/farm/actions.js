const actions = {
  UPDATE_FARM: "UPDATE_FARM",
  SET_MESSAGE: "SET_MESSSAGE",
  updateFarm: (farmId, farmName) => ({
    type: actions.UPDATE_FARM,
    farmId,
    farmName
  }),
  setMessage: message => ({
    type: actions.SET_MESSAGE,
    message
  })
};
export default actions;
