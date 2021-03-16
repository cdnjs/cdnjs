"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locale = locale;
exports.addLocale = addLocale;
exports.updateLocaleOption = updateLocaleOption;
exports.updateLocaleOptions = updateLocaleOptions;
exports.localeOption = localeOption;
exports.localeOptions = localeOptions;

var _PrimeReact = _interopRequireDefault(require("./PrimeReact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var locales = {
  'en': {
    accept: 'Yes',
    reject: 'No',
    choose: 'Choose',
    upload: 'Upload',
    cancel: 'Cancel',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    weekHeader: 'Wk',
    firstDayOfWeek: 0,
    dateFormat: 'mm/dd/yy',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordPrompt: 'Enter a password'
  }
};

function locale(locale) {
  if (locale) {
    _PrimeReact.default.locale = locale;
  }

  return {
    locale: _PrimeReact.default.locale,
    options: locales[_PrimeReact.default.locale]
  };
}

function addLocale(locale, options) {
  locales[locale] = _objectSpread(_objectSpread({}, locales['en']), options);
}

function updateLocaleOption(key, value, locale) {
  localeOptions(locale)[key] = value;
}

function updateLocaleOptions(options, locale) {
  var _locale = locale || _PrimeReact.default.locale;

  locales[_locale] = _objectSpread(_objectSpread({}, locales[_locale]), options);
}

function localeOption(key, locale) {
  try {
    return localeOptions(locale)[key];
  } catch (error) {
    throw new Error("The ".concat(key, " option is not found in the current locale('").concat(locale || _PrimeReact.default.locale, "')."));
  }
}

function localeOptions(locale) {
  var _locale = locale || _PrimeReact.default.locale;

  return locales[_locale];
}