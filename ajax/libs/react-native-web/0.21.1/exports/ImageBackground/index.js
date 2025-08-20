import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["children", "style", "imageStyle", "imageRef"];
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import * as React from 'react';
import { forwardRef } from 'react';
import Image from '../Image';
import StyleSheet from '../StyleSheet';
import View from '../View';
var emptyObject = {};

/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */
var ImageBackground = /*#__PURE__*/forwardRef((props, forwardedRef) => {
  var children = props.children,
    _props$style = props.style,
    style = _props$style === void 0 ? emptyObject : _props$style,
    imageStyle = props.imageStyle,
    imageRef = props.imageRef,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _StyleSheet$flatten = StyleSheet.flatten(style),
    height = _StyleSheet$flatten.height,
    width = _StyleSheet$flatten.width;
  return /*#__PURE__*/React.createElement(View, {
    ref: forwardedRef,
    style: style
  }, /*#__PURE__*/React.createElement(Image, _extends({}, rest, {
    ref: imageRef,
    style: [{
      // Temporary Workaround:
      // Current (imperfect yet) implementation of <Image> overwrites width and height styles
      // (which is not quite correct), and these styles conflict with explicitly set styles
      // of <ImageBackground> and with our internal layout model here.
      // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
      // This workaround should be removed after implementing proper support of
      // intrinsic content size of the <Image>.
      width,
      height,
      zIndex: -1
    }, StyleSheet.absoluteFill, imageStyle]
  })), children);
});
ImageBackground.displayName = 'ImageBackground';
export default ImageBackground;