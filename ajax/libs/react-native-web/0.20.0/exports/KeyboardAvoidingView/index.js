/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["behavior", "contentContainerStyle", "keyboardVerticalOffset"];
import * as React from 'react';
import View from '../View';
class KeyboardAvoidingView extends React.Component {
  constructor() {
    super(...arguments);
    this.frame = null;
    this.onLayout = event => {
      this.frame = event.nativeEvent.layout;
    };
  }
  relativeKeyboardHeight(keyboardFrame) {
    var frame = this.frame;
    if (!frame || !keyboardFrame) {
      return 0;
    }
    var keyboardY = keyboardFrame.screenY - (this.props.keyboardVerticalOffset || 0);
    return Math.max(frame.y + frame.height - keyboardY, 0);
  }
  onKeyboardChange(event) {}
  render() {
    var _this$props = this.props,
      behavior = _this$props.behavior,
      contentContainerStyle = _this$props.contentContainerStyle,
      keyboardVerticalOffset = _this$props.keyboardVerticalOffset,
      rest = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return /*#__PURE__*/React.createElement(View, _extends({
      onLayout: this.onLayout
    }, rest));
  }
}
export default KeyboardAvoidingView;