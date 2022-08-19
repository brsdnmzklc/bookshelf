const reducers = (state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {...state, username: action.payload};
    case 'SET_FAVORITES':
      return {...state, favorites: action.payload};
    case 'SET_READLIST':
      return {...state, readlist: action.payload};
    case 'REMOVE_FAVORITES':
      const newFavorites = state.favorites.filter(
        e => e.key !== action.payload,
      );
      return {...state, favorites: newFavorites};
    case 'REMOVE_READLIST':
      const newReadlist = state.readlist.filter(e => e.key !== action.payload);
      return {...state, readlist: newReadlist};
    default:
      return state;
  }
};
export default reducers;
