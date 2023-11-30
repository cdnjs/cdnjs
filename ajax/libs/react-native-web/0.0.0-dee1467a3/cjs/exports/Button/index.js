"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _TouchableOpacity = _interopRequireDefault(require("../TouchableOpacity"));
var _Text = _interopRequireDefault(require("../Text"));
var _warnOnce = require("../../modules/warnOnce");
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var Button = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  (0, _warnOnce.warnOnce)('Button', 'Button is deprecated. Please use Pressable.');
  var accessibilityLabel = props.accessibilityLabel,
    color = props.color,
    disabled = props.disabled,
    onPress = props.onPress,
    testID = props.testID,
    title = props.title;
  return /*#__PURE__*/React.createElement(_TouchableOpacity.default, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    disabled: disabled,
    focusable: !disabled,
    onPress: onPress,
    ref: forwardedRef,
    style: [styles.button, color && {
      backgroundColor: color
    }, disabled && styles.buttonDisabled],
    testID: testID
  }, /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.text, disabled && styles.textDisabled]
  }, title));
});
Button.displayName = 'Button';
var styles = _StyleSheet.default.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});
var _default = Button;
exports.default = _default;
module.exports = exports.default;