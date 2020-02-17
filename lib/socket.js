import axios   from 'axios';
import urlJoin from 'url-join';
import config  from '../config';


export default class Socket {
  constructor() {
    this.getPage = this.getPage.bind(this);
    this.lang    = '';
  }


  setLang(lang) {
    if (config.lang.enabled !== true) return;
    this.lang = lang;
  }


  /**
   * Get global settings
   * @returns {Promise<any>}
   */
  async getSettings() {
    const url = this.resolveUrl(config.api.endpoints.settings);
    try {
      return await this.get(url);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`
⚠️ The app fails to fetch settings from your API.
If you see this error, you have enabled the use of an API to fetch app settings and the request has failed or the response is incorrect.
Please check that your API is correctly returning data for the following endpoint:
${url}
If you don't want to retrieve settings, you can disable this feature in the api.config.js file`);
        console.log('Error: ', err);
      }
      throw err;
    }
  };


  /**
   * Get data and meta-data for a defined page.
   * @param pageId
   * @returns {Promise<any>}
   */
  async getPage(pageId) {
    const url = this.resolveUrl(config.api.endpoints.pages.replace(':pageId', pageId));
    try {
      const res = await this.get(url);

      if (Array.isArray(res)) {
        return res[0];
      }

      return res;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`
⚠️ The app fails to fetch pageData for this page.
If you see this error, you have enabled the use of an API to fetch page data and the request has failed or the response is incorrect.
Please check that your API is correctly returning data for the following endpoint:
${url}
If you don't want to retrieve data for this page, you can pass a 'noPageData' parameter to the page wrapper.
If you don't want to retrieve page data for any page, you can disable this feature in the api.config.js file`)
      }
      console.log('Error: ', err);
      throw err;
    }
  };


  /**
   * Simply making a get request on a defined endpoint.
   * It is possible to set some parameters to the request as well.
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  async get(url = '', params = {}) {
    try {
      const result = await axios.get(url, params);
      if (!result.data) {
        throw { status: 404, message: 'Not found' };
      }
      return result.data;
    } catch (error) {
      throw this._computeError(error);
    }
  }


  /**
   * Makes it more easy to build
   * urls for the requests by adding the
   * base url defined in the config property of
   * the class
   * @param segments
   * @returns {*}
   */
  resolveUrl(...segments) {
    segments = segments.map(_segment => {
      if (typeof _segment === 'string' && config.lang.enabled && this.lang) {
        _segment = _segment.replace(/:lang/g, this.lang);
      }
      return _segment;
    });

    return urlJoin(config.api.getUrl(), ...segments);
  }


  /**
   * Computes axios errors to make them
   * more reusable. It is also possible to define
   * a custom message if needed.
   * @param error
   * @param message
   * @returns {{}}
   * @private
   */
  _computeError(error = {}, message) {
    const _result = { message };
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      _result.status = error.response.status;
    }

    if (error.message && !message) {
      _result.message = error.message;
    }

    return _result;
  }

}
