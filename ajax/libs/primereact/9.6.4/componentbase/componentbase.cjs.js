'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PrimeReact = require('primereact/api');
var utils = require('primereact/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ComponentBase = {
  defaultProps: {
    pt: undefined
  },
  context: undefined,
  extend: function extend() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultProps = _objectSpread(_objectSpread({}, props.defaultProps), ComponentBase.defaultProps);
    var getProps = function getProps(props) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      ComponentBase.context = context;
      return utils.ObjectUtils.getMergedProps(props, defaultProps);
    };
    var getOtherProps = function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, defaultProps);
    };
    var getOptionValue = function getOptionValue() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var fKeys = String(utils.ObjectUtils.convertToFlatCase(key)).split('.');
      var fKey = fKeys.shift();
      var matchedPTOption = Object.keys(obj).find(function (k) {
        return utils.ObjectUtils.convertToFlatCase(k) === fKey;
      }) || '';
      return fKey ? utils.ObjectUtils.isObject(obj) ? getOptionValue(utils.ObjectUtils.getJSXElement(obj[matchedPTOption], params), fKeys.join('.'), params) : undefined : utils.ObjectUtils.getJSXElement(obj, params);
    };
    var getPTValue = function getPTValue() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var datasetPrefix = 'data-pc-';
      var componentName = params.props && params.props.__TYPE && utils.ObjectUtils.convertToFlatCase(params.props.__TYPE) || '';
      var pt = ComponentBase.context.pt || PrimeReact__default["default"].pt || {};
      var defaultPT = function defaultPT(key) {
        return pt && getOptionValue(pt[componentName], key);
      };
      var self = utils.ObjectUtils.getPropValue(obj, key, params)[key];
      var globalPT = defaultPT(key);
      var datasetProps = _objectSpread(_objectSpread({}, key === 'root' && _defineProperty({}, "".concat(datasetPrefix, "name"), componentName)), {}, _defineProperty({}, "".concat(datasetPrefix, "section"), utils.ObjectUtils.convertToFlatCase(key)));
      var merged = _objectSpread({}, utils.ObjectUtils.getMergedProps(globalPT, self));
      if (Object.keys(datasetProps).length) {
        merged = _objectSpread(_objectSpread({}, merged), datasetProps);
      }
      return merged;
    };
    var setMetaData = function setMetaData() {
      var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var ptm = function ptm() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return ptmo((metadata.props || {}).pt, key, _objectSpread(_objectSpread({}, metadata), params));
      };
      var ptmo = function ptmo() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return getPTValue(obj, key, params);
      };
      return {
        ptm: ptm,
        ptmo: ptmo
      };
    };
    return _objectSpread(_objectSpread({
      getProps: getProps,
      getOtherProps: getOtherProps,
      setMetaData: setMetaData
    }, props), {}, {
      defaultProps: defaultProps
    });
  }
};

exports.ComponentBase = ComponentBase;
