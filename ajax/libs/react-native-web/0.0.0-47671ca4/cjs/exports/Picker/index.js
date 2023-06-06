"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _createElement = _interopRequireDefault(require("../createElement"));
var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));
var _usePlatformMethods = _interopRequireDefault(require("../../modules/usePlatformMethods"));
var _PickerItem = _interopRequireDefault(require("./PickerItem"));
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _excluded = ["children", "enabled", "onValueChange", "selectedValue", "style", "testID", "itemStyle", "mode", "prompt"];
var Picker = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var children = props.children,
    enabled = props.enabled,
    onValueChange = props.onValueChange,
    selectedValue = props.selectedValue,
    style = props.style,
    testID = props.testID,
    itemStyle = props.itemStyle,
    mode = props.mode,
    prompt = props.prompt,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var hostRef = React.useRef(null);
  function handleChange(e) {
    var _e$target = e.target,
      selectedIndex = _e$target.selectedIndex,
      value = _e$target.value;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }

  // $FlowFixMe
  var supportedProps = (0, _objectSpread2.default)({
    children,
    disabled: enabled === false ? true : undefined,
    onChange: handleChange,
    style: [styles.initial, style],
    testID,
    value: selectedValue
  }, other);
  var platformMethodsRef = (0, _usePlatformMethods.default)(supportedProps);
  var setRef = (0, _useMergeRefs.default)(hostRef, platformMethodsRef, forwardedRef);
  supportedProps.ref = setRef;
  return (0, _createElement.default)('select', supportedProps);
});

// $FlowFixMe
Picker.Item = _PickerItem.default;
var styles = _StyleSheet.default.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});
var _default = Picker;
exports.default = _default;
module.exports = exports.default;