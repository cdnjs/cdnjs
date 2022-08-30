"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _Platform = _interopRequireDefault(require("../../../exports/Platform"));

var _AnimatedFlatList = _interopRequireDefault(require("./components/AnimatedFlatList"));

var _AnimatedImage = _interopRequireDefault(require("./components/AnimatedImage"));

var _AnimatedScrollView = _interopRequireDefault(require("./components/AnimatedScrollView"));

var _AnimatedSectionList = _interopRequireDefault(require("./components/AnimatedSectionList"));

var _AnimatedText = _interopRequireDefault(require("./components/AnimatedText"));

var _AnimatedView = _interopRequireDefault(require("./components/AnimatedView"));

var AnimatedMock = _interopRequireWildcard(require("./AnimatedMock"));

var AnimatedImplementation = _interopRequireWildcard(require("./AnimatedImplementation"));

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
var Animated = _Platform.default.isTesting ? AnimatedMock : AnimatedImplementation;

var _default = (0, _objectSpread2.default)({
  FlatList: _AnimatedFlatList.default,
  Image: _AnimatedImage.default,
  ScrollView: _AnimatedScrollView.default,
  SectionList: _AnimatedSectionList.default,
  Text: _AnimatedText.default,
  View: _AnimatedView.default
}, Animated);

exports.default = _default;
module.exports = exports.default;