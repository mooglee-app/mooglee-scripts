export const CORE_SET_APP_LANGUAGE = 'CORE_SET_APP_LANGUAGE';
export function _setAppLanguage(lang) {
    return {
      type: CORE_SET_APP_LANGUAGE,
      lang,
  }
}

/****************** ASYNC ACTIONS ******************/


export const setAppLanguage = (lang) => async (dispatch, getState, socket) => {
  try {
    socket.setLang(lang);
    dispatch(_setAppLanguage(lang));
  } catch (err) {
    console.log(err);
  }
};
