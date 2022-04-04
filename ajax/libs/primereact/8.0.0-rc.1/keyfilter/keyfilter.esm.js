import { DomHandler } from 'primereact/utils';

var KeyFilter = {
  /* eslint-disable */
  DEFAULT_MASKS: {
    pint: /[\d]/,
    "int": /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
  },

  /* eslint-enable */
  KEYS: {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
  },
  SAFARI_KEYS: {
    63234: 37,
    // left
    63235: 39,
    // right
    63232: 38,
    // up
    63233: 40,
    // down
    63276: 33,
    // page up
    63277: 34,
    // page down
    63272: 46,
    // delete
    63273: 36,
    // home
    63275: 35 // end

  },
  isNavKeyPress: function isNavKeyPress(e) {
    var k = e.keyCode;
    k = DomHandler.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
    return k >= 33 && k <= 40 || k === KeyFilter.KEYS.RETURN || k === KeyFilter.KEYS.TAB || k === KeyFilter.KEYS.ESC;
  },
  isSpecialKey: function isSpecialKey(e) {
    var k = e.keyCode;
    return k === 9 || k === 13 || k === 27 || k === 16 || k === 17 || k >= 18 && k <= 20 || DomHandler.getBrowser().opera && !e.shiftKey && (k === 8 || k >= 33 && k <= 35 || k >= 36 && k <= 39 || k >= 44 && k <= 45);
  },
  getKey: function getKey(e) {
    var k = e.keyCode || e.charCode;
    return DomHandler.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
  },
  getCharCode: function getCharCode(e) {
    return e.charCode || e.keyCode || e.which;
  },
  onKeyPress: function onKeyPress(e, keyfilter, validateOnly) {
    if (validateOnly) {
      return;
    }

    var regex = KeyFilter.DEFAULT_MASKS[keyfilter] ? KeyFilter.DEFAULT_MASKS[keyfilter] : keyfilter;
    var browser = DomHandler.getBrowser();

    if (e.ctrlKey || e.altKey) {
      return;
    }

    var k = this.getKey(e);

    if (browser.mozilla && (this.isNavKeyPress(e) || k === KeyFilter.KEYS.BACKSPACE || k === KeyFilter.KEYS.DELETE && e.charCode === 0)) {
      return;
    }

    var c = this.getCharCode(e);
    var cc = String.fromCharCode(c);

    if (browser.mozilla && (this.isSpecialKey(e) || !cc)) {
      return;
    }

    if (!regex.test(cc)) {
      e.preventDefault();
    }
  },
  validate: function validate(e, keyfilter) {
    var value = e.target.value,
        validatePattern = true;

    if (value && !keyfilter.test(value)) {
      validatePattern = false;
    }

    return validatePattern;
  }
};

export { KeyFilter };
