this.primereact = this.primereact || {};
this.primereact.componentbase = (function (exports, PrimeReact, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, primereact.api, primereact.utils);
