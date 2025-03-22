"use strict";
exports.id = 1253;
exports.ids = [1253];
exports.modules = {

/***/ 1253:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Aj: () => (/* binding */ getRelativePath),
/* harmony export */   DC: () => (/* binding */ reduceTextsToStrings),
/* harmony export */   DT: () => (/* binding */ getBasePath),
/* harmony export */   DV: () => (/* binding */ parseOldDate),
/* harmony export */   EB: () => (/* binding */ getHMStime),
/* harmony export */   Fy: () => (/* binding */ parseXmlNode),
/* harmony export */   GB: () => (/* binding */ roundTo),
/* harmony export */   GM: () => (/* binding */ attrForEach),
/* harmony export */   GV: () => (/* binding */ $HTML),
/* harmony export */   HC: () => (/* binding */ getXmlText),
/* harmony export */   HR: () => (/* binding */ getImgClipUrl),
/* harmony export */   H_: () => (/* binding */ getXmlNodeText),
/* harmony export */   Hb: () => (/* binding */ getCaretCharacterOffsetWithin),
/* harmony export */   He: () => (/* binding */ setLogLevel),
/* harmony export */   I4: () => (/* binding */ checkColor),
/* harmony export */   Im: () => (/* binding */ isEmpty),
/* harmony export */   Mk: () => (/* binding */ stringToWords),
/* harmony export */   NQ: () => (/* binding */ getRootHead),
/* harmony export */   Os: () => (/* binding */ getPercent),
/* harmony export */   PD: () => (/* binding */ getTriState),
/* harmony export */   Pj: () => (/* binding */ isNullOrUndef),
/* harmony export */   Rm: () => (/* binding */ log),
/* harmony export */   SV: () => (/* binding */ toCssSize),
/* harmony export */   TQ: () => (/* binding */ findParentsWithChild),
/* harmony export */   Ts: () => (/* binding */ init),
/* harmony export */   UM: () => (/* binding */ compareMultipleOptions),
/* harmony export */   W0: () => (/* binding */ settings),
/* harmony export */   WZ: () => (/* binding */ getNumber),
/* harmony export */   Yn: () => (/* binding */ getPath),
/* harmony export */   bG: () => (/* binding */ cleanOldLanguageTag),
/* harmony export */   c0: () => (/* binding */ colorHasTransparency),
/* harmony export */   c4: () => (/* binding */ nSlash),
/* harmony export */   d5: () => (/* binding */ endsWith),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   dw: () => (/* binding */ appendStyleAtHead),
/* harmony export */   eG: () => (/* binding */ setSelectionRange),
/* harmony export */   eH: () => (/* binding */ getVal),
/* harmony export */   fx: () => (/* binding */ fx),
/* harmony export */   g8: () => (/* binding */ svgToURI),
/* harmony export */   h2: () => (/* binding */ cloneObject),
/* harmony export */   iu: () => (/* binding */ getAttr),
/* harmony export */   k$: () => (/* binding */ isSeparator),
/* harmony export */   l2: () => (/* binding */ isEquivalent),
/* harmony export */   ob: () => (/* binding */ setAttr),
/* harmony export */   pW: () => (/* binding */ getBoolean),
/* harmony export */   qG: () => (/* binding */ getMsg),
/* harmony export */   qN: () => (/* binding */ DEFAULT),
/* harmony export */   r4: () => (/* binding */ getSvg),
/* harmony export */   vD: () => (/* binding */ fillString),
/* harmony export */   w1: () => (/* binding */ startsWith),
/* harmony export */   wF: () => (/* binding */ mReplace),
/* harmony export */   xw: () => (/* binding */ getPathPromise)
/* harmony export */ });
/* unused harmony exports pkg, LOG_LEVELS, LOG_PRINT_LABELS, LOG_OPTIONS, normalizeLocale, checkPreferredLanguage, zp, getDateTime, FALSE, TRUE, cssToString, normalizeObject, getValue, buildObj, isWordDelimiter, isURL, getTextNodesIn, Utils */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8194);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jszip_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6402);
/* harmony import */ var jszip_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jszip_utils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _GlobalData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(277);
/**
 *  File    : Utils.js
 *  Created : 01/04/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

/* global Promise, window, document, console, HTMLElement */






/**
 * Exports third-party NPM packages used by JClic, so they become available to other scripts through
 * the global variable `JClicObject` (defined in {@link module:JClic.JClic})
 * @type: {object}
 */
const pkg = {
  $: (jquery__WEBPACK_IMPORTED_MODULE_0___default()),
  JSZip: (jszip__WEBPACK_IMPORTED_MODULE_1___default()),
  JSZipUtils: (jszip_utils__WEBPACK_IMPORTED_MODULE_2___default()),
};

/**
 * List of valid verbosity levels
 * @const {string[]}
 */
const LOG_LEVELS = ['none', 'error', 'warn', 'info', 'debug', 'trace', 'all'];

/**
 * Labels printed on logs for each message type
 * @const {string[]}
 */
const LOG_PRINT_LABELS = ['     ', 'ERROR', 'WARN ', 'INFO ', 'DEBUG', 'TRACE', 'ALL  '];

/**
 * Options of the logging system
 * @type {object} */
const LOG_OPTIONS = {
  level: 2, // warn
  prefix: 'JClic',
  timestamp: true,
  popupOnErrors: false,
  chainTo: null,
  pipeTo: null,
};

/**
 * Current dictionary of string translations
 */
let _messages = {};

/**
 * Initializes the global settings
 * @param {object} options - An object with global settings
 * @param {boolean} [setLog=true] - When `true`, the log level will be set
 * @param {boolean} [setLang=true] - When `true`, the current language will be set
 * @returns {object} The normalized `options` object
 */
function init(options, setLog = true, setLang = true) {
  options = normalizeObject(options);
  if (setLog) {
    if (typeof options.logLevel !== 'undefined')
      setLogLevel(options.logLevel);
    if (typeof options.chainLogTo === 'function')
      LOG_OPTIONS.chainTo = options.chainLogTo;
    if (typeof options.pipeLogTo === 'function')
      LOG_OPTIONS.pipeTo = options.pipeLogTo;
  }

  if (setLang) {
    const lngRequested = options.lang;
    const lng = checkPreferredLanguage(_GlobalData_js__WEBPACK_IMPORTED_MODULE_3__["default"].languages, 'en', lngRequested);
    log('debug', `Language ${lngRequested ? `requested: "${lngRequested}" ` : ''} used: "${lng}"`);
    _messages = lng === 'en' ? {} : _GlobalData_js__WEBPACK_IMPORTED_MODULE_3__["default"].messages[lng];
  }

  return options;
};

/**
 * Function that will return the translation of the provided key
 * into the current language.
 * @param {string} key - ID of the expression to be translated
 * @returns {string} - The translated text
 */
function getMsg(key) {
  return _messages[key] || key;
}

/**
 * Converts expressions of type 'pt-br', 'FR', 'ca_es@valencia'... to the format expected by the i18n system:
 * lc[_CC][@variant] where 'lc' is a two or three lowercase letter language code, CC is an optional two uppercase
 * letter country code, followed by an optional 'variant' consisting in letters and/or digits.
 * @param {string} locale - The locale expression to be normalized
 * @returns string - The normalized locale
 */
function normalizeLocale(locale = '') {
  const [, language = null, country = null, variant = null] = /^([a-zA-Z]{2,3})[_-]?([a-zA-Z]{2})?@?([a-zA-Z0-9]*)?$/.exec(locale.trim()) || [];
  return language
    ? `${language.toLowerCase()}${country ? `_${country.toUpperCase()}` : ''}${variant ? `@${variant.toLowerCase()}` : ''}`
    : '';
};

/**
 * Checks if the language preferred by the user (based on browser and/or specific settings)
 * is in a list of available languages.
 * @param {string[]} availableLangs - Array of available languages. It should contain at least one item.
 * @param {string} [defaultLang=en] - Language to be used by default when not found the selected one
 * @param {string} [requestedLang=''] - Request this specific language
 * @returns {string} - The most suitable language for this request
 */
function checkPreferredLanguage(availableLangs, defaultLang = 'en', requestedLang = '') {
  let result = -1;

  // Create an array to store possible values
  let tries = [];

  // If "setLang" is specified, check it
  if (requestedLang) {
    // Normalize requested locale
    const lang = normalizeLocale(requestedLang);
    if (lang)
      tries.push(lang);
  }

  // Add user's preferred languages, if any
  if (window.navigator.languages)
    tries = tries.concat(window.navigator.languages);

  // Add the navigator main language, if defined
  if (window.navigator.language)
    tries.push(window.navigator.language);

  // Add English as final option
  tries.push(defaultLang);

  for (let i = 0; i < tries.length; i++) {
    let match = -1;
    for (let n in availableLangs) {
      if (tries[i].indexOf(availableLangs[n]) === 0) {
        match = n;
        if (tries[i] === availableLangs[n]) {
          result = n;
          break;
        }
      }
    }
    if (result >= 0 || (result = match) >= 0)
      break;
  }
  return availableLangs[result >= 0 ? result : 0];
};

/**
 * Establishes the current verbosity level of the logging system
 * @param {string} level - One of the valid strings in {@link module:Utils.LOG_LEVELS}
 */
function setLogLevel(level) {
  const log = LOG_LEVELS.indexOf(level);
  if (log >= 0)
    LOG_OPTIONS.level = log;
};

/**
 * Reports a new message to the logging system
 * @param {string} type - The type of message. Mus be `error`, `warn`, `info`, `debug` or `trace`.
 * @param {string} msg - The main message to be logged. Additional parameters can be added, like
 * in `console.log` (see: {@link https://developer.mozilla.org/en-US/docs/Web/API/Console/log})
 */
function log(type, msg) {
  const level = LOG_LEVELS.indexOf(type);
  const args = Array.prototype.slice.call(arguments);

  // Check if message should currently be logged
  if (level < 0 || level <= LOG_OPTIONS.level) {
    if (LOG_OPTIONS.pipeTo)
      LOG_OPTIONS.pipeTo.apply(null, args);
    else {
      const mainMsg = `${LOG_OPTIONS.prefix || ''} ${LOG_PRINT_LABELS[level]} ${LOG_OPTIONS.timestamp ? getDateTime() : ''} ${msg}`;
      console[level === 1 ? 'error' : level === 2 ? 'warn' : 'log'].apply(console, [mainMsg].concat(args.slice(2)));
      // Call chained logger, if anny
      if (LOG_OPTIONS.chainTo)
        LOG_OPTIONS.chainTo.apply(null, args);
    }
  }
};

/**
 * Gets a boolean value from a textual expression
 * @param {string} val - The value to be parsed (`true` for true, null or otherwise for `false`)
 * @param {boolean} [defaultValue=false] - The default value to return when `val` is false
 * @returns {number}
 */
function getBoolean(val, defaultValue = false) {
  return val === 'true' ? true : val === 'false' ? false : defaultValue;
};

/**
 * Gets a value from an given expression that can be `null`, `undefined` or empty string ('')
 * @param {any} val - The expression to parse
 * @param {any} [defaultValue=null] - The value to return when `val` is `null`, `''` or `undefined`
 * @returns {any}
 */
function getVal(val, defaultValue = null) {
  return (val === '' || val === null || typeof val === 'undefined') ? defaultValue : val;
};

/**
 * Gets a number from a string or another number
 * @param {any} val - The expression to parse
 * @param {number} [defaultValue=0] - The default value
 * @returns {number}
 */
function getNumber(val, defaultValue) {
  return Number(getVal(val, defaultValue));
};

/**
 * Gets the plain percent expression (without decimals) of the given value
 * @param {number} val - The value to be expressed as a percentile
 * @returns {string}
 */
function getPercent(val) {
  return `${Math.round(val * 100)}%`;
}

/**
 * Returns the two-digits text expression representing the given number (lesser than 100) zero-padded at left
 * Useful for representing hours, minutes and seconds
 * @param {number} val - The number to be processed
 * @returns {string}
 */
function zp(val) {
  return `0${val}`.slice(-2);
};

/**
 * Returns a given time in [00h 00'00"] format
 * @param {number} millis - Amount of milliseconds to be processed
 * @returns {string}
 */
function getHMStime(millis) {
  const d = new Date(millis);
  const h = d.getUTCHours(), m = d.getUTCMinutes(), s = d.getUTCSeconds();
  return `${h ? h + 'h ' : ''}${h || m ? zp(m) + '\'' : ''}${zp(s)}"`;
};

/**
 * Returns a formatted string with the provided date and time
 * @param {external:Date} date - The date to be formatted. When `null` or `undefined`, the current date will be used.
 * @returns {string}
 */
function getDateTime(date = new Date()) {
  return `${date.getFullYear()}/${zp(date.getMonth() + 1)}/${zp(date.getDate())} ${zp(date.getHours())}:${zp(date.getMinutes())}:${zp(date.getSeconds())}`;
};

/**
 * Parse 'date' fields generated by "JClic Author" in format d/m/y, with
 * variable number of digits.
 * @param {string} text - The old 'date' field
 * @returns {external:Date} - Always return a Date object (now, if text was invalid)
 */
function parseOldDate(text) {
  let result = null;
  if (text) {
    const elements = text.trim().split('/');
    if (elements.length === 3) {
      let m = parseInt(elements[0]) || 0;
      let d = parseInt(elements[1]) || 0;
      let y = parseInt(elements[2]) || 0;
      if (m > 12 && d <= 12) {
        const t = m;
        m = d;
        d = t;
      }
      if (y < 1980)
        y += (y < 90 ? 2000 : 1900);
      if (d && m && y) {
        result = new Date(Date.parse(`${m}/${d}/${y}`));
      }
    }
  }
  return result || new Date();
};

/**
 * Extracts just the ISO-639 language code from complex
 * expressions like "English (en)", buid by JClic Author.
 * @param {string} text - The expression to parse
 * @returns {string} - The ISO-639 language code, or '--' if none found
 */
function cleanOldLanguageTag(text) {
  if (!text)
    text = '--';
  // Allow only ISO-639-1 and ISO-639-2 language codes
  else if (!text.match(/^[a-z][a-z][a-z]?$/)) {
    const matches = text.match(/\(([a-z][a-z][a-z]?)\)/);
    if (matches && matches.length === 2)
      text = matches[1];
    else
      text = '--';
  }
  return text;
};

/** @const {number} */
const FALSE = 0;

/** @const {number} */
const TRUE = 1;

/** @const {number} */
const DEFAULT = 2;

/**
 * Gets a numeric value (0, 1 or 2) from a set of possible values: `false`, `true` and `default`.
 * @param {string} val - The text to be parsed
 * @param {any} def - An optional default value
 * @returns {number}
 */
function getTriState(val, def = DEFAULT) {
  return val === 'true' ? TRUE : val === 'false' ? FALSE : def;
};

/**
 * Returns a string with the given `tag` repeated n times
 * @param {string} tag - The tag to be repeated
 * @param {number} repeats - The number of times to repeat the tag
 * @returns {string}
 */
function fillString(tag, repeats = 0) {
  return Array(repeats).fill(tag).join('');
};

/**
 * Checks if the provided value is 'null' or 'undefined'.
 * @param {any} val - The value to be parsed
 * @returns {boolean}
 */
function isNullOrUndef(val) {
  return typeof val === 'undefined' || val === null;
};

/**
 * Checks if two expressions are equivalent.
 * Returns `true` when both parameters are `null` or `undefined`, and also when both have
 * equivalent values.
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
function isEquivalent(a, b) {
  return (typeof a === 'undefined' || a === null) && (typeof b === 'undefined' || b === null) || a === b;
};

/**
 * Reads paragraphs, identified by `<p></p>` elements, inside XML data
 * @param {object} xml - The DOM-XML element to be parsed
 * @returns {string}
 */
function getXmlText(xml) {
  let text = '';
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(xml).children('p').each((_n, child) => { text += `<p>${child.textContent}</p>`; });
  return text;
};

/**
 * Parse the provided XML element node, returning a complex object
 * @param {object} xml - The root XML element to parse
 * @param {boolean} [withText=false] - When `true`, any text found inside the XML element is also included in the resulting object.
 * @returns {object}
 */
function parseXmlNode(xml, withText = false) {
  // Initialize the resulting object
  const result = {};
  // Direct copy of root element attributes as object properties
  if (xml.attributes)
    attrForEach(xml.attributes, (name, value) => result[name] = /^-?\d*$/.test(value) ? Number(value) : value);

  const keys = [];
  const children = Array.from(xml.children || xml.childNodes || []);

  // If all children is of type 'p', just compile it in a single string
  const paragraphs = children.filter(child => child.nodeName === 'p');
  if (paragraphs.length > 0 && paragraphs.length === children.filter(ch => ch.nodeName !== '#text').length) {
    const text = paragraphs.map(ch => ch.textContent).join('\n');
    if (xml.attributes) {
      result.text = text;
      return result;
    }
    return text;
  }

  // Process children elements
  children.forEach(child => {
    // Avoid extra text content collected by [xmldom](https://www.npmjs.com/package/xmldom)
    if (child.nodeName === '#text' && !withText)
      return;

    // Recursive processing of children
    const ch = parseXmlNode(child, withText);
    // Store the result into a temporary object named as the child node name,
    if (!result[child.nodeName]) {
      // Create object and save key for later processing
      result[child.nodeName] = {};
      keys.push(child.nodeName);
    }
    // Use 'id' (or an incremental number if 'id' is not set) as a key
    if (ch.id)
      result[child.nodeName][ch.id] = ch;
    else {
      const n = Object.keys(result[child.nodeName]).length;
      result[child.nodeName][n] = ch;
    }
  });
  // Check temporary objects, converting it to an array, a single object or a complex object
  keys.forEach(k => {
    // Retrieve temporary object from `keys`
    const kx = Object.keys(result[k]);
    // If all keys are numbers, convert object into an array (or leave it as a single object)
    if (!kx.find(kk => isNaN(kk))) {
      if (kx.length === 1)
        // Array with a single element. Leave it as a simple object:
        result[k] = result[k][0];
      else {
        // Object with numeric keys. Convert it to array:
        const arr = [];
        kx.forEach(kk => arr.push(result[k][kk]));
        result[k] = arr;
      }
    }
  });
  // Save text content, if any:
  if (children.length === 0 && xml.textContent)
    result.textContent = xml.textContent;
  return result;
};

/**
 * Parse the given XML node, known as containing only text elements,
 * and return its content as a string (when possible)
 * @param {object} xml - The XML element to parse
 * @returns {string|object}
 */
function getXmlNodeText(node) {
  const result = parseXmlNode(node);
  return typeof result === 'string' ?
    result :
    result.hasOwnProperty('text') ?
      result.text :
      result.hasOwnProperty('textContent') ?
        result.textContent :
        result;
};

/**
 * Recursively explore the given object, converting to a string
 * all attributes with a single attribute named 'text'.
 * Example:
 * {a:1, b:{text:"hello"}, c:{d:2, text:"world"}} => {a:1, b:"hello", c:{d:2, text:"world"}}
 * @param {object} obj - The object to explore
 * @returns {object} - The same object, with text attributes reduced to strings
 */
function reduceTextsToStrings(obj) {
  if (obj) {
    const keys = Object.keys(obj);
    keys.forEach(k => {
      const attr = obj[k];
      if (typeof attr === 'object') {
        const ko = Object.keys(attr);
        if (ko.length === 1 && ko[0] === 'text')
          obj[k] = attr.text;
        else
          obj[k] = reduceTextsToStrings(attr);
      }
    });
  }
  return obj;
};

/**
 * Creates a string suitable to be used in the 'style' attribute of HTML tags, filled with the
 * CSS attributes contained in the provided object.
 * @param {object} cssObj
 * @returns {string}
 */
function cssToString(cssObj) {
  return Object.keys(cssObj).reduce((s, key) => `${s}${key}:${cssObj[key]};`, '');
};

/**
 * Converts java-like color codes (like '0xRRGGBB') to valid CSS values like '#RRGGBB' or 'rgba(r,g,b,a)'
 * @param {string} [color] - A color, as codified in Java
 * @param {string} [defaultColor] - The default color to be used
 * @returns {string}
 */
function checkColor(color, defaultColor = settings.BoxBase.BACK_COLOR) {
  if (typeof color === 'undefined' || color === null)
    color = defaultColor;
  color = color.replace('0x', '#');
  // Check for Alpha value
  if (color.charAt(0) === '#' && color.length > 7) {
    const alpha = fx(parseInt(color.substring(1, 3), 16) / 255.0, 2);
    color = `rgba(${parseInt(color.substring(3, 5), 16)},${parseInt(color.substring(5, 7), 16)},${parseInt(color.substring(7, 9), 16)},${alpha})`;
  }
  return color;
};

/**
 * Checks if the provided color has an alpha value less than 1
 * @param {string} color - The color to be analyzed
 * @returns {boolean}
 */
function colorHasTransparency(color) {
  if (startsWith(color, 'rgba(')) {
    var alpha = parseInt(color.substring(color.lastIndexOf(',')));
    return typeof alpha === 'number' && alpha < 1.0;
  }
  return false;
};

/**
 * Clones the provided object
 * See: https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
 * @param {object} obj
 * @returns {object}
 */
//cloneObject: obj => Object.assign(Object.create(Object.getPrototypeOf(obj)), obj),
function cloneObject(obj) {
  return jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, Object.create(Object.getPrototypeOf(obj)), obj);
};

/**
 * Converts string values to number or boolean when needed
 * @param {object} obj - The object to be processed
 * @returns {object} - A new object with normalized content
 */
function normalizeObject(obj) {
  const result = {};
  if (obj)
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(obj, (key, value) => {
      let s;
      if (typeof value === 'string' && (s = value.trim().toLowerCase()) !== '')
        value = s === 'true' ? true : s === 'false' ? false : isNaN(s) ? value : Number(s);
      result[key] = value;
    });
  return result;
};

/**
 * Returns an partial clone of an object, containing only the own attributes specified in an array of possible keys.
 * When the value of an attribute is of type 'Object' and this object has a method named `getAttributes`, the result of calling
 * this method is returned instead of the crude object.
 * @param {object} obj - The object to be processed
 * @param {string[]} [keys] - An optional array of keys to be included in the resulting object.
 * When null or not set, all keys of `obj` are included. Keys can include a default value separed by '|'.
 * Attributes with default value will be excluded from the resulting object.
 * @returns {object}
 */
function getAttr(obj, keys = null) {
  let result = {};
  keys = keys || Object.keys(obj);
  keys.forEach(key => {
    const [k, d] = key.split('|');
    if (obj.hasOwnProperty(k) && typeof obj[k] !== 'undefined' && obj[k] !== null && obj[k].toString() !== d) {
      const v = getValue(obj[k]);
      if (!isEmpty(v))
        result[k] = v;
    }
  });

  // Convert to string objects with only a "text" attribute
  keys = Object.keys(result);
  if (keys.length === 1 && keys[0] === 'text')
    result = result.text;

  return result;
};

/**
 * Gets the minimal representation of the given value (object, array, string, number...)
 * @param {any} value - The value to be processed
 * @returns {any}
 */
function getValue(value) {
  return value.getAttributes ?
    value.getAttributes() :
    value instanceof Array ?
      value.map(e => getValue(e)) :
      value instanceof Date ?
        value.toISOString() :
        value instanceof Object ?
          getAttr(value) :
          value;
};

/**
 * Checks if the given value is an empty object, null or a zero-length string
 * @param {any} v - The value to be checked
 * @returns {boolean} - `true` if `v` is `{}`, `null` or `""`
 */
function isEmpty(v) {
  let result = (typeof v === 'undefined' || v === null);
  if (!result) {
    switch (typeof v) {
      case 'object':
        result = Object.keys(v).length === 0;
        break;

      case 'string':
        result = v.length === 0;
        break;
    }
  }
  return result;
};

/**
 * Fills an object with specific attributes from another data object
 * @param {object} obj - The target object
 * @param {object} data - The data object
 * @param {string[]} attr - The list of attributes to be copied from `data` to `obj`
 *                          Elements of this list can be:
 *                          a) Just a string. In this case, the native object will be used as a value
 *                          b) An object with the following members:
 *                          - `key`{string} - The attribute name
 *                          - `fn` {function} - The function to be invoked to build the object
 *                          - `params` {string[]} - Optional params to be passed to the `setAttributes` method of the created object
 *                          - `group` {string} - Used when `data` is an object or an array (possible values are `object` and `array`), and multiple results
 *                                               should be aggregated in a resulting object or array with the same keys (or ordering) as data.
 *                          - `init` {string} - Optional parameter indicating if `fn` should be passed with an additional param. This param can be:
 *                            - `key` - The member's key
 *
 * @returns {object} - Always returns `obj`
 */
function setAttr(obj, data, attr) {
  attr.forEach(a => {
    if (a.key) {
      const { key, fn, group, init, params } = a;
      // A new object should be built
      if (!isEmpty(data[key])) {
        const dataset = data[key];
        if (group === 'object')
          obj[key] = Object.keys(dataset).reduce((o, k) => {
            o[k] = buildObj(fn, dataset[k], init === 'key' ? k : init, params);
            return o;
          }, {});
        else if (group === 'array')
          obj[key] = dataset.map((element, n) => buildObj(fn, element, init === 'key' ? n : init, params));
        else
          obj[key] = buildObj(fn, dataset, init, params);
      }
    } else if (!isEmpty(data[a]))
      obj[a] = data[a];
  });
  return obj;
};

/**
 * Builds a new object based on the provided constructor, data and initialization value
 * Objects used with this function should implement `setAttributes`, or an static method named `factory`
 * @param {function} objType - A class or function to be invoked to build the object.
 * @param {object} [data] - An optional object filled with the attributes to be assigned to the newly created object.
 * @param {any} [init] - An optional value to be passed to the function when invoked with `new`
 * @param {object[]} [params=[]] - Optional array of params to be passed when calling `setAttributes` on the final object
 * @returns {object} - The resulting object
 */
function buildObj(objType, data, init, params = []) {
  return objType.factory ? objType.factory(data, init, params) : new objType(init).setAttributes(data, ...params);
};

/**
 * Check if the given char is a separator
 * @param {string} ch - A string with a single character
 * @returns {boolean}
 */
function isSeparator(ch) {
  return settings.SEPARATORS.includes(ch);
};

/**
 * Check if the given char is a word delimiter
 * @param {string} ch - A string with a single character
 * @returns {boolean}
 */
function isWordDelimiter(ch) {
  return settings.WORD_DELIMITERS.includes(ch);
}

/**
 * Converts a string in an array of objects with 'text' and 'sep' attributes, where 'text' are single words and 'sep'
 * are the word separators following each word in the sentence.
 * @example
 * stringToWords("Hello, World! That's all") returns:
 * [
 *   {text: "Hello", sep: ", "},
 *   {text: "World", sep: "! "},
 *   {text: "That", sep: "'"},
 *   {text: "s", sep: " "},
 *   {text: "all", sep: ""},
 * ]
 * @param {*} str - The text to be tokenized
 * @returns {object[]}
 */
function stringToWords(str) {
  const result = [];
  let token = { text: '', sep: '' };
  let inWord = true;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charAt(i);
    const delim = isWordDelimiter(ch);
    if (inWord) {
      if (!delim)
        token.text += ch;
      else {
        inWord = false;
        token.sep = ch;
      }
    } else {
      if (delim)
        token.sep += ch;
      else {
        result.push(token);
        token = { text: ch, sep: '' };
        inWord = true;
      }
    }
  }
  result.push(token);
  return result;
}

/**
 * Rounds `v` to the nearest multiple of `n`
 * @param {number} v
 * @param {number} n - Cannot be zero!
 * @returns {number}
 */
function roundTo(v, n) {
  return Math.round(v / n) * n;
};

/**
 * Set the maximum number of decimals for a number
 * @param {any} v - The value to be converted to a fixed number of decimals. Can be anything.
 * @param {number} n=4 - the maximum number of decimals
 * @returns {any} - When `v` is a number, a number with fixed decimals is returned. Otherwise, returns `v`
 */
function fx(v, n = 4) {
  return v.toFixed ? Number(v.toFixed(n)) : v;
};

/**
 * Compares the provided answer against multiple valid options. These valid options are
 * concatenated in a string, separated by pipe chars (`|`). The comparing can be case sensitive.
 * @param {string} answer - The text to check against to
 * @param {string} check - String containing one or multiple options, separated by `|`
 * @param {boolean} [checkCase=false] - When true, the comparing will be case-sensitive
 * @param {boolean} [numeric=false] - When true, we are comparing numeric expressions
 * @returns {boolean}
 */
function compareMultipleOptions(answer, check, checkCase = false, numeric = false) {
  if (answer === null || answer.length === 0 || check === null || check.length === 0)
    return false;
  if (!checkCase && !numeric)
    answer = answer.toUpperCase();
  answer = answer.trim();

  // Check for numeric digits in answer!
  numeric = numeric && /\d/.test(answer);

  for (let token of check.split('|')) {
    if (numeric) {
      if (Number.parseFloat(answer.replace(/,/, '.')) === Number.parseFloat(token.replace(/,/, '.')))
        return true;
    }
    else if (answer === (checkCase ? token : token.toUpperCase()).trim())
      return true;
  }
  return false;
};

/**
 * Checks if the given string ends with the specified expression
 * @param {string} text - The string where to find the expression
 * @param {string} expr - The expression to search for.
 * @param {boolean} [trim] - When `true`, the `text` string will be trimmed before check
 * @returns {boolean}
 */
function endsWith(text = '', expr, trim) {
  return typeof text === 'string' && (trim ? text.trim() : text).endsWith(expr);
};

/**
 * Checks if the given string starts with the specified expression
 * @param {string} text - The string where to find the expression
 * @param {string} expr - The expression to search for.
 * @param {boolean} [trim] - When `true`, the `text` string will be trimmed before check
 * @returns {boolean}
 */
function startsWith(text = '', expr, trim) {
  return typeof text === 'string' && (trim ? text.trim() : text).indexOf(expr) === 0;
};

/**
 * Replaces all occurrences of the backslash character (`\`) by a regular slash (`/`)
 * This is useful to normalize bad path names present in some old JClic projects
 * @param {string} str - The string to be normalized
 * @returns {string}
 */
function nSlash(str) {
  return str ? str.replace(/\\/g, '/') : str;
};

/**
 * Checks if the given expression is an absolute URL
 * @param {string} exp - The expression to be checked
 * @returns {boolean}
 */
function isURL(exp) {
  return /^(filesystem:)?(https?|file|data|ftps?):/i.test(exp);
};

/**
 * Gets the base path of the given file path (absolute or full URL). This base path always ends
 * with `/`, meaning it can be concatenated with relative paths without adding a separator.
 * @param {string} path - The full path to be parsed
 * @returns {string}
 */
function getBasePath(path) {
  const p = path.lastIndexOf('/');
  return p >= 0 ? path.substring(0, p + 1) : '';
};

/**
 * Gets the full path of `file` relative to `basePath`
 * @param {string} file - The file name
 * @param {string} [path] - The base path
 * @returns {string}
 */
function getRelativePath(file, path) {
  return (!path || path === '' || file.indexOf(path) !== 0) ? file : file.substring(path.length);
};

/**
 * Gets the complete path of a relative or absolute URL, using the provided `basePath`
 * @param {string} basePath - The base URL
 * @param {string} path - The filename
 * @returns {string}
 */
function getPath(basePath, path) {
  return isURL(path) ? path : basePath + path;
};

/**
 * Gets a promise with the complete path of a relative or absolute URL, using the provided `basePath`
 * @param {string} basePath - The base URL
 * @param {string} path - The filename
 * @param {external:JSZip} [zip] - An optional {@link external:JSZip} object where to look
 * for the file
 * @returns {external:Promise}
 */
function getPathPromise(basePath, path, zip) {
  if (zip) {
    const fName = getRelativePath(basePath + path, zip.zipBasePath);
    if (zip.files[fName]) {
      return new Promise((resolve, reject) => {
        zip.file(fName).async('base64').then(data => {
          const ext = path.toLowerCase().split('.').pop();
          const mime = settings.MIME_TYPES[ext] || 'application/octet-stream';
          resolve(`data:${mime};base64,${data}`);
        }).catch(reject);
      });
    }
  }
  return Promise.resolve(getPath(basePath, path));
};

/**
 * Utility object that provides several methods to build simple and complex DOM objects
 * @type {object}
 */
const $HTML = {
  doubleCell: (a, b) => jquery__WEBPACK_IMPORTED_MODULE_0___default()('<tr/>').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<td/>').html(a)).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<td/>').html(b)),
  p: txt => jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').html(txt),
  td: (txt, className) => jquery__WEBPACK_IMPORTED_MODULE_0___default()('<td/>', className ? { class: className } : null).html(txt),
  th: (txt, className) => jquery__WEBPACK_IMPORTED_MODULE_0___default()('<th/>', className ? { class: className } : null).html(txt),
};

/**
 * Replaces `width`, `height` and `fill` attributes of a simple SVG image
 * with the provided values
 * @param {string} svg - The SVG image as XML string
 * @param {string} [width] - Optional setting for "width" property
 * @param {string} [height] - Optional setting for "height" property
 * @param {string} [fill] - Optional setting for "fill" property
 * @returns {string} - The resulting svg code
 */
function getSvg(svg, width, height, fill) {
  if (width)
    svg = svg.replace(/width=\"\d*\"/, `width="${width}"`);
  if (height)
    svg = svg.replace(/height=\"\d*\"/, `height="${height}"`);
  if (fill)
    svg = svg.replace(/fill=\"[#A-Za-z0-9]*\"/, `fill="${fill}"`);
  return svg;
};

/**
 * Encodes a svg expression into a {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs|data URI}
 * suitable for the `src` property of `img` elements, optionally changing its original size and fill values.
 * @param {string} svg - The SVG image as XML string
 * @param {string} [width] - Optional setting for "width" property
 * @param {string} [height] - Optional setting for "height" property
 * @param {string} [fill] - Optional setting for "fill" property
 * @returns {string} - The resulting Data URI
 */
function svgToURI(svg, width, height, fill) {
  return 'data:image/svg+xml;base64,' + window.btoa(getSvg(svg, width, height, fill));
};

/**
 * Converts the given expression into a valid value for CSS size values
 * @param {string|number} exp - The expression to be evaluated. Can be a numeric value, `null` or `undefined`.
 *                              Positive values are in "px" units, negative ones are "%"
 * @param {object} css - An optional Object where the resulting expression (if any) will be saved
 * @param {string} key - The key under which the result will be stored in `css`
 * @param {string} def - Default value to be used when `exp` is `null` or `undefined`
 * @returns {string} - A valid CSS value, or `null` if it can't be found. Default units are `px`
 */
function toCssSize(exp, css, key, def) {
  const result = typeof exp === 'undefined' || exp === null ? null : isNaN(exp) ? exp : exp < 0 ? `${Math.abs(exp)}%` : `${exp}px`;
  if (css && key && (result || def))
    css[key] = result !== null ? result : def;
  return result;
};

/**
 * Gets a clip of the give image data, in a URL base64 encoded format
 * @param {object} img - The binary data of the realized image, usually obtained from a {@link module:bads/MediaBagElement.MediaBagElement}
 * @param {module:AWT.Rectangle} rect - A rectangle containing the requested clip
 * @returns {string} - The URL with the image clip, as a PNG file encoded in base64
 */
function getImgClipUrl(img, rect) {
  const canvas = document.createElement('canvas');
  canvas.width = rect.dim.width;
  canvas.height = rect.dim.height;
  const ctx = canvas.getContext('2d');
  let result = '';
  try {
    ctx.drawImage(img, rect.pos.x, rect.pos.y, rect.dim.width, rect.dim.height, 0, 0, rect.dim.width, rect.dim.height);
    result = canvas.toDataURL();
  } catch (err) {
    // catch 'tainted canvases may not be exported' and other errors
    log('error', err);
  }
  return result;
};

/**
 * Finds the nearest `head` or root node of a given HTMLElement, useful to place `<style/>` elements when
 * the main component of JClic is behind a shadow-root.
 * This method will be replaced by a call to [Node.getRootNode()](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode)
 * when fully supported by all major browsers.
 * @param {external:HTMLElement} [el] - The element from which to start the search
 * @returns {external:HTMLElement}
 */
function getRootHead(el) {
  if (el) {
    // Skip HTMLElements
    while (el.parentElement)
      el = el.parentElement;
    // Get the parent node of the last HTMLElement
    if (el instanceof HTMLElement)
      el = el.parentNode || el;
    // If the root node has a `head`, take it
    el = el['head'] || el;
  }
  return el || document.head;
};

/**
 * Appends a stylesheet element to the `head` or root node nearest to the given `HTMLElement`.
 * @param {string} css - The content of the stylesheet
 * @param {module:JClicPlayer.JClicPlayer} [ps] - An optional `PlayStation` (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used as a base to find the root node
 * @returns {external:HTMLStyleElement} - The appended style element
 */
function appendStyleAtHead(css, ps) {
  const root = getRootHead(ps && ps.$topDiv ? ps.$topDiv[0] : null);
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  return root.appendChild(style);
};

/**
 * Traverses all the attributes defined in an Element, calling a function with its name and value as a parameters
 * @param {external:NamedNodeMap} attributes - The [Element.attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes)
 * object to be traversed
 * @param {function} callback - The function to be called for each [Attr](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap)
 * object. It should take two parametres: `name` and `value`
 */
function attrForEach(attributes, callback) {
  for (let i = 0; i < attributes.length; i++)
    callback(attributes[i].name, attributes[i].value);
};

/**
 * Recursive traversal of all nodes of the given object looking for children having the `childName` attribute
 * WARNING: Don't call this method on objects with circular dependencies!
 * @param {object} obj       - The object to be analized
 * @param {string} childName - Name of the attribute to search for
 * @returns {object[]}       - Array of children having the searched attribute
 */
function findParentsWithChild(obj, childName, _result = []) {
  if (obj[childName])
    _result.push(obj);
  else
    Object.values(obj).forEach(val => {
      if (typeof val === 'object')
        findParentsWithChild(val, childName, _result);
    });
  return _result;
};

//
// Functions useful to deal with caret position in `contentEditable` DOM elements
//
/**
 * Gets the caret position within the given element. Thanks to
 * {@link http://stackoverflow.com/users/96100/tim-down|Tim Down} answers in:
 * {@link http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container}
 * and {@link http://stackoverflow.com/questions/6240139/highlight-text-range-using-javascript/6242538}
 * @param {object} element - A DOM element
 * @returns {number}
 */
function getCaretCharacterOffsetWithin(element) {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection !== "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type !== "Control") {
    const textRange = sel.createRange();
    const preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
};

/**
 * Utility function called by {@link module:Utils.getCaretCharacterOffsetWithin}
 * @param {object} node - A text node
 * @returns {object[]}
 */
function getTextNodesIn(node) {
  const textNodes = [];
  if (node.nodeType === 3) {
    textNodes.push(node);
  } else {
    const children = node.childNodes;
    for (let i = 0, len = children.length; i < len; ++i) {
      textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
    }
  }
  return textNodes;
};

/**
 * Sets the selection range (or the cursor position, when `start` and `end` are the same) to a
 * specific position inside a DOM element.
 * @param {object} el - The DOM element where to set the cursor
 * @param {number} start - The start position of the selection (or cursor position)
 * @param {number} end - The end position of the selection. When null or identical to `start`,
 * indicates a cursor position.
 */
function setSelectionRange(el, start, end) {
  if (isNullOrUndef(end))
    end = start;
  if (document.createRange && window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const textNodes = getTextNodesIn(el);
    let foundStart = false;
    let charCount = 0, endCharCount, textNode;

    for (let i = 0; i < textNodes.length; i++) {
      textNode = textNodes[i];
      endCharCount = charCount + textNode.length;
      if (!foundStart && start >= charCount &&
        (start < endCharCount ||
          start === endCharCount && i + 1 <= textNodes.length)) {
        range.setStart(textNode, start - charCount);
        foundStart = true;
      }
      if (foundStart && end <= endCharCount) {
        range.setEnd(textNode, end - charCount);
        break;
      }
      charCount = endCharCount;
    }
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && document.body.createTextRange) {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(true);
    textRange.moveEnd('character', end);
    textRange.moveStart('character', start);
    textRange.select();
  }
};

/**
 * Performs multiple replacements on the provided string
 * See: https://stackoverflow.com/questions/2501435/replacing-multiple-patterns-in-a-block-of-data
 * @param {Object[]} replacements - Array of pairs formed by an "expression" (regexp or string) and a "value" (string) to replace the fragments found
 * @param {String} str - The string to be checked for replacements
 * @returns {String} - The original string with the fragments found already replaced
 */
function mReplace(replacements, str) {
  return replacements.reduce((result, [exp, replacement]) => result.replace(exp, replacement), str);
};

/**
 * Global constants
 * @const
 */
const settings = {
  // JClic.js Version
  VERSION: _GlobalData_js__WEBPACK_IMPORTED_MODULE_3__["default"].version,
  // Check if we are running on NodeJS with JSDOM
  NODEJS: typeof window === 'undefined' || window?.navigator?.userAgent?.includes('jsdom'),
  // layout constants
  AB: 0, BA: 1, AUB: 2, BUA: 3,
  LAYOUT_NAMES: ['AB', 'BA', 'AUB', 'BUA'],
  DEFAULT_WIDTH: 400,
  DEFAULT_HEIGHT: 300,
  MINIMUM_WIDTH: 40,
  MINIMUM_HEIGHT: 40,
  DEFAULT_NAME: '---',
  DEFAULT_MARGIN: 8,
  DEFAULT_SHUFFLES: 31,
  DEFAULT_GRID_ELEMENT_SIZE: 20,
  MIN_CELL_SIZE: 10,
  //DEFAULT_BG_COLOR: '#D3D3D3', // LightGray
  DEFAULT_BG_COLOR: '#C0C0C0', // LightGray
  ACTIONS: {
    ACTION_MATCH: 'MATCH', ACTION_PLACE: 'PLACE',
    ACTION_WRITE: 'WRITE', ACTION_SELECT: 'SELECT', ACTION_HELP: 'HELP'
  },
  PREVIOUS: 0, MAIN: 1, END: 2, END_ERROR: 3, NUM_MSG: 4,
  MSG_TYPE: ['previous', 'initial', 'final', 'finalError'],
  RANDOM_CHARS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  NUM_COUNTERS: 3,
  MAX_RECORD_LENGTH: 180,
  // BoxBase defaults
  BoxBase: {
    REDUCE_FONT_STEP: 1.0,
    MIN_FONT_SIZE: 8,
    STROKE: 1,
    AC_MARGIN: 6,
    //BACK_COLOR: 'lightgray',
    BACK_COLOR: '#C0C0C0',
    TEXT_COLOR: 'black',
    SHADOW_COLOR: 'gray',
    INACTIVE_COLOR: 'gray',
    ALTERNATIVE_COLOR: 'gray',
    BORDER_COLOR: 'black',
    BORDER_STROKE_WIDTH: 0.75,
    MARKER_STROKE_WIDTH: 2.75
  },
  FILE_TYPES: {
    image: 'gif,jpg,png,jpeg,bmp,ico,svg',
    audio: 'wav,mp3,ogg,oga,au,aiff,flac',
    video: 'avi,mov,mpeg,mp4,ogv,m4v,webm',
    font: 'ttf,otf,eot,woff,woff2',
    midi: 'mid,midi',
    anim: 'swf',
    // Used in custom skins
    xml: 'xml'
  },
  MIME_TYPES: {
    xml: 'text/xml',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    bmp: 'image/bmp',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    wav: 'audio/wav',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    m4v: 'video/mp4',
    ogg: 'audio/ogg',
    oga: 'audio/ogg',
    ogv: 'video/ogg',
    webm: 'video/webm',
    au: 'audio/basic',
    aiff: 'audio/x-aiff',
    flac: 'audio/flac',
    avi: 'video/avi',
    mov: 'video/quicktime',
    mpeg: 'video/mpeg',
    ttf: 'application/font-sfnt',
    otf: 'application/font-sfnt',
    eot: ' application/vnd.ms-fontobject',
    woff: 'application/font-woff',
    woff2: 'application/font-woff2',
    swf: 'application/x-shockwave-flash',
    mid: 'audio/midi',
    midi: 'audio/midi'
  },
  // Global settings susceptible to be modified
  COMPRESS_IMAGES: true,
  // Keyboard key codes
  VK: {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  },
  // Flag to indicate that we are running on a touch device
  TOUCH_DEVICE: false,
  // Amount of time (in milliseconds) to wait before a media resource is loaded
  LOAD_TIMEOUT: 10000,
  // Number of points to be calculated as polygon vertexs when simplifying bezier curves
  BEZIER_POINTS: 4,
  // Check if canvas accessibility features are enabled
  // See: http://codepen.io/francesc/pen/amwvRp
  // UPDATED May 2020: Detection removed since Canvas HitRegions have been deprecated
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility
  //
  // CANVAS_HITREGIONS: typeof CanvasRenderingContext2D !== 'undefined' && typeof CanvasRenderingContext2D.prototype.addHitRegion === 'function',
  // CANVAS_HITREGIONS_FOCUS: typeof CanvasRenderingContext2D !== 'undefined' && typeof CanvasRenderingContext2D.prototype.drawFocusIfNeeded === 'function',
  //
  CANVAS_DRAW_FOCUS: typeof window !== 'undefined' && typeof window?.CanvasRenderingContext2D?.prototype?.drawFocusIfNeeded === 'function',
  // See: https://emptycharacter.com/
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
  WHITESPACES: '  \f\n\r\t\v\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202f\u205f\u3000\ufeff',
};
settings.SEPARATORS = `${settings.WHITESPACES}.,;-|`;
settings.WORD_DELIMITERS = `${settings.SEPARATORS}…_<>"“”«»'\xB4\x60\u2018\u2019\u2022~+\u2013\u2014\u2015=%¿?¡!:/\\()[]{}$£€`;

/**
 * Miscellaneous utility functions and constants
 */
const Utils = {
  pkg,
  settings,
  getMsg,
  LOG_LEVELS,
  LOG_PRINT_LABELS,
  LOG_OPTIONS,
  init,
  setLogLevel,
  log,
  getBoolean,
  getVal,
  getNumber,
  getPercent,
  zp,
  getHMStime,
  getDateTime,
  parseOldDate,
  cleanOldLanguageTag,
  FALSE,
  TRUE,
  DEFAULT,
  getTriState,
  fillString,
  isNullOrUndef,
  isEquivalent,
  getXmlText,
  parseXmlNode,
  getXmlNodeText,
  reduceTextsToStrings,
  cssToString,
  checkColor,
  colorHasTransparency,
  cloneObject,
  normalizeObject,
  getAttr,
  getValue,
  isEmpty,
  setAttr,
  buildObj,
  isSeparator,
  isWordDelimiter,
  stringToWords,
  roundTo,
  fx,
  compareMultipleOptions,
  endsWith,
  startsWith,
  nSlash,
  isURL,
  getBasePath,
  getRelativePath,
  getPath,
  getPathPromise,
  $HTML,
  getSvg,
  svgToURI,
  toCssSize,
  getImgClipUrl,
  getRootHead,
  appendStyleAtHead,
  attrForEach,
  findParentsWithChild,
  getCaretCharacterOffsetWithin,
  getTextNodesIn,
  setSelectionRange
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utils);


/***/ })

};
;
//# sourceMappingURL=1253.jclic-node.js.map