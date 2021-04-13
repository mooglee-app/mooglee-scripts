import * as actionTypes from './core.actions';


function setAppLanguage(state, action) {
  return { ...state, lang: action.lang };
}


const coreReducers = (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.CORE_SET_APP_LANGUAGE:
      return setAppLanguage(state, action);
    default:
      return state;
  }
};

export default coreReducers;
