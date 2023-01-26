/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));

var _usePressEvents = _interopRequireDefault(require("../../modules/usePressEvents"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _excluded = ["activeOpacity", "children", "delayPressIn", "delayPressOut", "delayLongPress", "disabled", "focusable", "onHideUnderlay", "onLongPress", "onPress", "onPressIn", "onPressOut", "onShowUnderlay", "rejectResponderTermination", "style", "testOnly_pressed", "underlayColor"];

function createExtraStyles(activeOpacity, underlayColor) {
  return {
    child: {
      opacity: activeOpacity !== null && activeOpacity !== void 0 ? activeOpacity : 0.85
    },
    underlay: {
      backgroundColor: underlayColor === undefined ? 'black' : underlayColor
    }
  };
}

function hasPressHandler(props) {
  return props.onPress != null || props.onPressIn != null || props.onPressOut != null || props.onLongPress != null;
}
/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.
 *
 * The underlay comes from wrapping the child in a new View, which can affect
 * layout, and sometimes cause unwanted visual artifacts if not used correctly,
 * for example if the backgroundColor of the wrapped view isn't explicitly set
 * to an opaque color.
 *
 * TouchableHighlight must have one child (not zero or more than one).
 * If you wish to have several child components, wrap them in a View.
 */


function TouchableHighlight(props, forwardedRef) {
  var activeOpacity = props.activeOpacity,
      children = props.children,
      delayPressIn = props.delayPressIn,
      delayPressOut = props.delayPressOut,
      delayLongPress = props.delayLongPress,
      disabled = props.disabled,
      focusable = props.focusable,
      onHideUnderlay = props.onHideUnderlay,
      onLongPress = props.onLongPress,
      onPress = props.onPress,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      onShowUnderlay = props.onShowUnderlay,
      rejectResponderTermination = props.rejectResponderTermination,
      style = props.style,
      testOnly_pressed = props.testOnly_pressed,
      underlayColor = props.underlayColor,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var hostRef = (0, React.useRef)(null);
  var setRef = (0, _useMergeRefs.default)(forwardedRef, hostRef);

  var _useState = (0, React.useState)(testOnly_pressed === true ? createExtraStyles(activeOpacity, underlayColor) : null),
      extraStyles = _useState[0],
      setExtraStyles = _useState[1];

  var showUnderlay = (0, React.useCallback)(() => {
    if (!hasPressHandler(props)) {
      return;
    }

    setExtraStyles(createExtraStyles(activeOpacity, underlayColor));

    if (onShowUnderlay != null) {
      onShowUnderlay();
    }
  }, [activeOpacity, onShowUnderlay, props, underlayColor]);
  var hideUnderlay = (0, React.useCallback)(() => {
    if (testOnly_pressed === true) {
      return;
    }

    if (hasPressHandler(props)) {
      setExtraStyles(null);

      if (onHideUnderlay != null) {
        onHideUnderlay();
      }
    }
  }, [onHideUnderlay, props, testOnly_pressed]);
  var pressConfig = (0, React.useMemo)(() => ({
    cancelable: !rejectResponderTermination,
    disabled,
    delayLongPress,
    delayPressStart: delayPressIn,
    delayPressEnd: delayPressOut,
    onLongPress,
    onPress,

    onPressStart(event) {
      showUnderlay();

      if (onPressIn != null) {
        onPressIn(event);
      }
    },

    onPressEnd(event) {
      hideUnderlay();

      if (onPressOut != null) {
        onPressOut(event);
      }
    }

  }), [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination, showUnderlay, hideUnderlay]);
  var pressEventHandlers = (0, _usePressEvents.default)(hostRef, pressConfig);
  var child = React.Children.only(children);
  return /*#__PURE__*/React.createElement(_View.default, (0, _extends2.default)({}, rest, pressEventHandlers, {
    accessibilityDisabled: disabled,
    focusable: !disabled && focusable !== false,
    pointerEvents: disabled ? 'none' : undefined,
    ref: setRef,
    style: [styles.root, style, !disabled && styles.actionable, extraStyles && extraStyles.underlay]
  }), /*#__PURE__*/React.cloneElement(child, {
    style: _StyleSheet.default.compose(child.props.style, extraStyles && extraStyles.child)
  }));
}

var styles = _StyleSheet.default.create({
  root: {
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});

var MemoedTouchableHighlight = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(TouchableHighlight));
MemoedTouchableHighlight.displayName = 'TouchableHighlight';
var _default = MemoedTouchableHighlight;
exports.default = _default;
module.exports = exports.default;