import config from '../config';


export default class Socket {
  constructor() {
    this.lang = '';
  }


  setLang(lang) {
    if (config.lang.enabled !== true) return;
    this.lang = lang;
  }
}
