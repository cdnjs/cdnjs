/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));

var _usePressEvents = _interopRequireDefault(require("../../modules/usePressEvents"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 */
function TouchableOpacity(props, forwardedRef) {
  var accessible = props.accessible,
      activeOpacity = props.activeOpacity,
      delayPressIn = props.delayPressIn,
      delayPressOut = props.delayPressOut,
      delayLongPress = props.delayLongPress,
      disabled = props.disabled,
      focusable = props.focusable,
      onLongPress = props.onLongPress,
      onPress = props.onPress,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      rejectResponderTermination = props.rejectResponderTermination,
      style = props.style,
      rest = _objectWithoutPropertiesLoose(props, ["accessible", "activeOpacity", "delayPressIn", "delayPressOut", "delayLongPress", "disabled", "focusable", "onLongPress", "onPress", "onPressIn", "onPressOut", "rejectResponderTermination", "style"]);

  var hostRef = (0, React.useRef)(null);
  var setRef = (0, _useMergeRefs.default)(forwardedRef, hostRef);

  var _useState = (0, React.useState)('0s'),
      duration = _useState[0],
      setDuration = _useState[1];

  var _useState2 = (0, React.useState)(null),
      opacityOverride = _useState2[0],
      setOpacityOverride = _useState2[1];

  var setOpacityTo = (0, React.useCallback)(function (value, duration) {
    setOpacityOverride(value);
    setDuration(duration ? duration / 1000 + "s" : '0s');
  }, [setOpacityOverride, setDuration]);
  var setOpacityActive = (0, React.useCallback)(function (duration) {
    setOpacityTo(activeOpacity !== null && activeOpacity !== void 0 ? activeOpacity : 0.2, duration);
  }, [activeOpacity, setOpacityTo]);
  var setOpacityInactive = (0, React.useCallback)(function (duration) {
    setOpacityTo(null, duration);
  }, [setOpacityTo]);
  var pressConfig = (0, React.useMemo)(function () {
    return {
      cancelable: !rejectResponderTermination,
      disabled: disabled,
      delayLongPress: delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      onLongPress: onLongPress,
      onPress: onPress,
      onPressStart: function onPressStart(event) {
        var isGrant = event.dispatchConfig != null ? event.dispatchConfig.registrationName === 'onResponderGrant' : event.type === 'keydown';
        setOpacityActive(isGrant ? 0 : 150);

        if (onPressIn != null) {
          onPressIn(event);
        }
      },
      onPressEnd: function onPressEnd(event) {
        setOpacityInactive(250);

        if (onPressOut != null) {
          onPressOut(event);
        }
      }
    };
  }, [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination, setOpacityActive, setOpacityInactive]);
  var pressEventHandlers = (0, _usePressEvents.default)(hostRef, pressConfig);
  return React.createElement(_View.default, _extends({}, rest, pressEventHandlers, {
    accessibilityState: _objectSpread({
      disabled: disabled
    }, props.accessibilityState),
    accessible: accessible !== false,
    focusable: focusable !== false && onPress !== undefined,
    ref: setRef,
    style: [styles.root, !disabled && styles.actionable, style, opacityOverride != null && {
      opacity: opacityOverride
    }, {
      transitionDuration: duration
    }]
  }));
}

var styles = _StyleSheet.default.create({
  root: {
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});

var MemoedTouchableOpacity = React.memo(React.forwardRef(TouchableOpacity));
MemoedTouchableOpacity.displayName = 'TouchableOpacity';
var _default = MemoedTouchableOpacity;
exports.default = _default;
module.exports = exports.default;