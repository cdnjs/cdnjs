this.primevue = this.primevue || {};
this.primevue.passthrough = (function (exports, utils, vue) {
    'use strict';

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var usePassThrough = function usePassThrough() {
      var pt1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pt2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$merge = _ref.merge,
        merge = _ref$merge === void 0 ? true : _ref$merge,
        _ref$useMergeProps = _ref.useMergeProps,
        useMergeProps = _ref$useMergeProps === void 0 ? false : _ref$useMergeProps,
        _ref$ignoredKeysOnMer = _ref.ignoredKeysOnMerge,
        ignoredKeysOnMerge = _ref$ignoredKeysOnMer === void 0 ? [] : _ref$ignoredKeysOnMer,
        _ref$customizer = _ref.customizer,
        customizer = _ref$customizer === void 0 ? undefined : _ref$customizer;
      var newPT = _objectSpread({}, pt1);
      if (merge) {
        var getPTClassValue = function getPTClassValue(value) {
          return utils.ObjectUtils.isString(value) || utils.ObjectUtils.isArray(value) ? {
            "class": value
          } : value;
        };
        var setOptionValue = function setOptionValue(to, from, nestedKey, ignoredKey) {
          var keys = nestedKey.split('.');
          var key = keys.shift();
          var getValue = function getValue(value) {
            return utils.ObjectUtils.isFunction(customizer) ? customizer({
              key: key,
              to: to,
              from: from,
              value: value
            }) : value;
          };
          if (!!ignoredKey && ignoredKey.endsWith(key)) {
            !!key && (to[key] = getValue(from[key]));
          } else {
            var matched = [Object.keys(to[key] || {}), Object.keys(from[key] || {})].flat().some(function (k) {
              return k.match(/^(class|style|on(.+))/);
            });
            if (matched) {
              to[key] = getValue(useMergeProps ? vue.mergeProps(getPTClassValue(to[key]), getPTClassValue(from[key])) : _objectSpread(_objectSpread({}, getPTClassValue(to[key])), getPTClassValue(from[key])));
            } else if (utils.ObjectUtils.isNotEmpty(from[key])) {
              to[key] = _objectSpread({}, to[key]);
              setOptionValue(to[key], from[key], keys.join('.'), ignoredKey);
            } else if (!!key) {
              to[key] = getValue(from[key]);
            }
          }
        };
        var nestedKeys = utils.ObjectUtils.nestedKeys(pt2);
        nestedKeys.forEach(function (nestedKey) {
          setOptionValue(newPT, pt2, nestedKey, ignoredKeysOnMerge.find(function (k) {
            return k.indexOf('.') > 0 ? nestedKey.startsWith(k) : nestedKey.split('.')[0] === k;
          }));
        });
      } else {
        Object.keys(pt2).forEach(function (key) {
          return newPT[key] = pt2[key];
        });
      }
      return newPT;
    };

    exports.usePassThrough = usePassThrough;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, primevue.utils, Vue);
