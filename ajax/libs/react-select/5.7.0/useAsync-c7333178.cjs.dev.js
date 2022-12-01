'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var index = require('./index-5b950e59.cjs.dev.js');

var _excluded = ["defaultOptions", "cacheOptions", "loadOptions", "options", "isLoading", "onInputChange", "filterOption"];
function useAsync(_ref) {
  var _ref$defaultOptions = _ref.defaultOptions,
    propsDefaultOptions = _ref$defaultOptions === void 0 ? false : _ref$defaultOptions,
    _ref$cacheOptions = _ref.cacheOptions,
    cacheOptions = _ref$cacheOptions === void 0 ? false : _ref$cacheOptions,
    propsLoadOptions = _ref.loadOptions;
    _ref.options;
    var _ref$isLoading = _ref.isLoading,
    propsIsLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
    propsOnInputChange = _ref.onInputChange,
    _ref$filterOption = _ref.filterOption,
    filterOption = _ref$filterOption === void 0 ? null : _ref$filterOption,
    restSelectProps = _objectWithoutProperties(_ref, _excluded);
  var propsInputValue = restSelectProps.inputValue;
  var lastRequest = React.useRef(undefined);
  var mounted = React.useRef(false);
  var _useState = React.useState(Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined),
    _useState2 = _slicedToArray(_useState, 2),
    defaultOptions = _useState2[0],
    setDefaultOptions = _useState2[1];
  var _useState3 = React.useState(typeof propsInputValue !== 'undefined' ? propsInputValue : ''),
    _useState4 = _slicedToArray(_useState3, 2),
    stateInputValue = _useState4[0],
    setStateInputValue = _useState4[1];
  var _useState5 = React.useState(propsDefaultOptions === true),
    _useState6 = _slicedToArray(_useState5, 2),
    isLoading = _useState6[0],
    setIsLoading = _useState6[1];
  var _useState7 = React.useState(undefined),
    _useState8 = _slicedToArray(_useState7, 2),
    loadedInputValue = _useState8[0],
    setLoadedInputValue = _useState8[1];
  var _useState9 = React.useState([]),
    _useState10 = _slicedToArray(_useState9, 2),
    loadedOptions = _useState10[0],
    setLoadedOptions = _useState10[1];
  var _useState11 = React.useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    passEmptyOptions = _useState12[0],
    setPassEmptyOptions = _useState12[1];
  var _useState13 = React.useState({}),
    _useState14 = _slicedToArray(_useState13, 2),
    optionsCache = _useState14[0],
    setOptionsCache = _useState14[1];
  var _useState15 = React.useState(undefined),
    _useState16 = _slicedToArray(_useState15, 2),
    prevDefaultOptions = _useState16[0],
    setPrevDefaultOptions = _useState16[1];
  var _useState17 = React.useState(undefined),
    _useState18 = _slicedToArray(_useState17, 2),
    prevCacheOptions = _useState18[0],
    setPrevCacheOptions = _useState18[1];
  if (cacheOptions !== prevCacheOptions) {
    setOptionsCache({});
    setPrevCacheOptions(cacheOptions);
  }
  if (propsDefaultOptions !== prevDefaultOptions) {
    setDefaultOptions(Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined);
    setPrevDefaultOptions(propsDefaultOptions);
  }
  React.useEffect(function () {
    mounted.current = true;
    return function () {
      mounted.current = false;
    };
  }, []);
  var loadOptions = React.useCallback(function (inputValue, callback) {
    if (!propsLoadOptions) return callback();
    var loader = propsLoadOptions(inputValue, callback);
    if (loader && typeof loader.then === 'function') {
      loader.then(callback, function () {
        return callback();
      });
    }
  }, [propsLoadOptions]);
  React.useEffect(function () {
    if (propsDefaultOptions === true) {
      loadOptions(stateInputValue, function (options) {
        if (!mounted.current) return;
        setDefaultOptions(options || []);
        setIsLoading(!!lastRequest.current);
      });
    }
    // NOTE: this effect is designed to only run when the component mounts,
    // so we don't want to include any hook dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var onInputChange = React.useCallback(function (newValue, actionMeta) {
    var inputValue = index.handleInputChange(newValue, actionMeta, propsOnInputChange);
    if (!inputValue) {
      lastRequest.current = undefined;
      setStateInputValue('');
      setLoadedInputValue('');
      setLoadedOptions([]);
      setIsLoading(false);
      setPassEmptyOptions(false);
      return;
    }
    if (cacheOptions && optionsCache[inputValue]) {
      setStateInputValue(inputValue);
      setLoadedInputValue(inputValue);
      setLoadedOptions(optionsCache[inputValue]);
      setIsLoading(false);
      setPassEmptyOptions(false);
    } else {
      var request = lastRequest.current = {};
      setStateInputValue(inputValue);
      setIsLoading(true);
      setPassEmptyOptions(!loadedInputValue);
      loadOptions(inputValue, function (options) {
        if (!mounted) return;
        if (request !== lastRequest.current) return;
        lastRequest.current = undefined;
        setIsLoading(false);
        setLoadedInputValue(inputValue);
        setLoadedOptions(options || []);
        setPassEmptyOptions(false);
        setOptionsCache(options ? _objectSpread(_objectSpread({}, optionsCache), {}, _defineProperty({}, inputValue, options)) : optionsCache);
      });
    }
  }, [cacheOptions, loadOptions, loadedInputValue, optionsCache, propsOnInputChange]);
  var options = passEmptyOptions ? [] : stateInputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
  return _objectSpread(_objectSpread({}, restSelectProps), {}, {
    options: options,
    isLoading: isLoading || propsIsLoading,
    onInputChange: onInputChange,
    filterOption: filterOption
  });
}

exports.useAsync = useAsync;
