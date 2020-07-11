import * as actionTypes from './core.actions';


function pushPage(state, action) {
  return {
    ...state, pages: {
      ...(state.pages || {}),
      [action.pageId]: action.page,
    },
  };
}

function setAppLanguage(state, action) {
  return { ...state, lang: action.lang };
}

function setAppSettings(state, action) {
  return {
    ...state,
    settings: action.settings,
    syncSettings: true, // To now that the settings has been set
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {

    case actionTypes.CORE_PUSH_PAGE:
      return pushPage(state, action);

    case actionTypes.CORE_SET_APP_LANGUAGE:
      return setAppLanguage(state, action);

    case actionTypes.CORE_SET_APP_SETTINGS:
      return setAppSettings(state, action);

    default:
      return state;
  }
};
