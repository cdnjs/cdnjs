"use strict";

exports.__esModule = true;
exports.default = void 0;

var _createElement = _interopRequireDefault(require("../createElement"));

var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));

var _usePlatformMethods = _interopRequireDefault(require("../../modules/usePlatformMethods"));

var _PickerItem = _interopRequireDefault(require("./PickerItem"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Picker =
/*#__PURE__*/
(0, _react.forwardRef)(function (props, forwardedRef) {
  var children = props.children,
      enabled = props.enabled,
      onValueChange = props.onValueChange,
      selectedValue = props.selectedValue,
      style = props.style,
      testID = props.testID,
      itemStyle = props.itemStyle,
      mode = props.mode,
      prompt = props.prompt,
      other = _objectWithoutPropertiesLoose(props, ["children", "enabled", "onValueChange", "selectedValue", "style", "testID", "itemStyle", "mode", "prompt"]);

  var hostRef = (0, _react.useRef)(null);

  function handleChange(e) {
    var _e$target = e.target,
        selectedIndex = _e$target.selectedIndex,
        value = _e$target.value;

    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }

  var supportedProps = _objectSpread({
    children: children,
    disabled: enabled === false ? true : undefined,
    onChange: handleChange,
    style: [styles.initial, style],
    testID: testID,
    value: selectedValue
  }, other);

  var platformMethodsRef = (0, _usePlatformMethods.default)(supportedProps);
  var setRef = (0, _useMergeRefs.default)(hostRef, platformMethodsRef, forwardedRef);
  supportedProps.ref = setRef;
  return (0, _createElement.default)('select', supportedProps);
}); // $FlowFixMe

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