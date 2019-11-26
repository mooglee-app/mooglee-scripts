export const CORE_PUSH_PAGE = 'CORE_PUSH_PAGE';
export function pushPage(pageId, page) {
  return {
    type: CORE_PUSH_PAGE,
    pageId,
    page
  };
}

export const CORE_SET_APP_LANGUAGE = 'CORE_SET_APP_LANGUAGE';
export function _setAppLanguage(lang) {
    return {
      type: CORE_SET_APP_LANGUAGE,
      lang,
  }
}

export const CORE_SET_APP_SETTINGS = 'CORE_SET_APP_SETTINGS';
export function setAppSettings(settings) {
  return {
    type: CORE_SET_APP_SETTINGS,
    settings
  };
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

 /**
 * Fetch the app settings from the API
 */
export const fetchAppSettings = (cb = ()=>{}) => async (dispatch, getState, socket) => {
  try {
    const result = await socket.getSettings();

    dispatch(setAppSettings(result));
    return cb(result);
  } catch (err) {
    cb(err, null);
  }
};

/**
 * Fetch a page config (defined by a slug) from the API
 * @param pageId
 * @param updateIfExist
 * @param cb
 * @returns {function(*, *, *)}
 */
export const fetchPage = (pageId, updateIfExist = false, cb = () => {}) => async (dispatch, getState, socket) => {
  try {
    const result = await socket.getPage(pageId);
    dispatch(pushPage(pageId, result, new Date()));
    cb(result);
    return result;
  } catch (err) {
    return (cb(null, err));
  }
};
