"use strict";

var _defineProperty = require("@babel/runtime/helpers/defineProperty"), index = require("./index-3b062ade.cjs.prod.js"), _slicedToArray = require("@babel/runtime/helpers/slicedToArray"), _objectWithoutProperties = require("@babel/runtime/helpers/objectWithoutProperties"), React = require("react");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var _defineProperty__default = _interopDefault(_defineProperty), _slicedToArray__default = _interopDefault(_slicedToArray), _objectWithoutProperties__default = _interopDefault(_objectWithoutProperties), _excluded = [ "defaultOptions", "cacheOptions", "loadOptions", "options", "isLoading", "onInputChange", "filterOption" ];

function useAsync(_ref) {
  var _ref$defaultOptions = _ref.defaultOptions, propsDefaultOptions = void 0 !== _ref$defaultOptions && _ref$defaultOptions, _ref$cacheOptions = _ref.cacheOptions, cacheOptions = void 0 !== _ref$cacheOptions && _ref$cacheOptions, propsLoadOptions = _ref.loadOptions;
  _ref.options;
  var _ref$isLoading = _ref.isLoading, propsIsLoading = void 0 !== _ref$isLoading && _ref$isLoading, propsOnInputChange = _ref.onInputChange, _ref$filterOption = _ref.filterOption, filterOption = void 0 === _ref$filterOption ? null : _ref$filterOption, restSelectProps = _objectWithoutProperties__default.default(_ref, _excluded), propsInputValue = restSelectProps.inputValue, lastRequest = React.useRef(void 0), mounted = React.useRef(!1), _useState = React.useState(Array.isArray(propsDefaultOptions) ? propsDefaultOptions : void 0), _useState2 = _slicedToArray__default.default(_useState, 2), defaultOptions = _useState2[0], setDefaultOptions = _useState2[1], _useState3 = React.useState(void 0 !== propsInputValue ? propsInputValue : ""), _useState4 = _slicedToArray__default.default(_useState3, 2), stateInputValue = _useState4[0], setStateInputValue = _useState4[1], _useState5 = React.useState(!0 === propsDefaultOptions), _useState6 = _slicedToArray__default.default(_useState5, 2), isLoading = _useState6[0], setIsLoading = _useState6[1], _useState7 = React.useState(void 0), _useState8 = _slicedToArray__default.default(_useState7, 2), loadedInputValue = _useState8[0], setLoadedInputValue = _useState8[1], _useState9 = React.useState([]), _useState10 = _slicedToArray__default.default(_useState9, 2), loadedOptions = _useState10[0], setLoadedOptions = _useState10[1], _useState11 = React.useState(!1), _useState12 = _slicedToArray__default.default(_useState11, 2), passEmptyOptions = _useState12[0], setPassEmptyOptions = _useState12[1], _useState13 = React.useState({}), _useState14 = _slicedToArray__default.default(_useState13, 2), optionsCache = _useState14[0], setOptionsCache = _useState14[1], _useState15 = React.useState(void 0), _useState16 = _slicedToArray__default.default(_useState15, 2), prevDefaultOptions = _useState16[0], setPrevDefaultOptions = _useState16[1], _useState17 = React.useState(void 0), _useState18 = _slicedToArray__default.default(_useState17, 2), prevCacheOptions = _useState18[0], setPrevCacheOptions = _useState18[1];
  cacheOptions !== prevCacheOptions && (setOptionsCache({}), setPrevCacheOptions(cacheOptions)), 
  propsDefaultOptions !== prevDefaultOptions && (setDefaultOptions(Array.isArray(propsDefaultOptions) ? propsDefaultOptions : void 0), 
  setPrevDefaultOptions(propsDefaultOptions)), React.useEffect((function() {
    return mounted.current = !0, function() {
      mounted.current = !1;
    };
  }), []);
  var loadOptions = React.useCallback((function(inputValue, callback) {
    if (!propsLoadOptions) return callback();
    var loader = propsLoadOptions(inputValue, callback);
    loader && "function" == typeof loader.then && loader.then(callback, (function() {
      return callback();
    }));
  }), [ propsLoadOptions ]);
  React.useEffect((function() {
    !0 === propsDefaultOptions && loadOptions(stateInputValue, (function(options) {
      mounted.current && (setDefaultOptions(options || []), setIsLoading(!!lastRequest.current));
    }));
  }), []);
  var onInputChange = React.useCallback((function(newValue, actionMeta) {
    var inputValue = index.handleInputChange(newValue, actionMeta, propsOnInputChange);
    if (!inputValue) return lastRequest.current = void 0, setStateInputValue(""), setLoadedInputValue(""), 
    setLoadedOptions([]), setIsLoading(!1), void setPassEmptyOptions(!1);
    if (cacheOptions && optionsCache[inputValue]) setStateInputValue(inputValue), setLoadedInputValue(inputValue), 
    setLoadedOptions(optionsCache[inputValue]), setIsLoading(!1), setPassEmptyOptions(!1); else {
      var request = lastRequest.current = {};
      setStateInputValue(inputValue), setIsLoading(!0), setPassEmptyOptions(!loadedInputValue), 
      loadOptions(inputValue, (function(options) {
        mounted && request === lastRequest.current && (lastRequest.current = void 0, setIsLoading(!1), 
        setLoadedInputValue(inputValue), setLoadedOptions(options || []), setPassEmptyOptions(!1), 
        setOptionsCache(options ? index._objectSpread2(index._objectSpread2({}, optionsCache), {}, _defineProperty__default.default({}, inputValue, options)) : optionsCache));
      }));
    }
  }), [ cacheOptions, loadOptions, loadedInputValue, optionsCache, propsOnInputChange ]), options = passEmptyOptions ? [] : stateInputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
  return index._objectSpread2(index._objectSpread2({}, restSelectProps), {}, {
    options: options,
    isLoading: isLoading || propsIsLoading,
    onInputChange: onInputChange,
    filterOption: filterOption
  });
}

exports.useAsync = useAsync;
