const reducers = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.active,
      };
    default:
      return state;
  }
};
export default reducers;
