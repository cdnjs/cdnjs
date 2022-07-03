"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var React = _interopRequireWildcard(require("react"));

var _createElement = _interopRequireDefault(require("../createElement"));

var forwardedProps = _interopRequireWildcard(require("../../modules/forwardedProps"));

var _pick = _interopRequireDefault(require("../../modules/pick"));

var _useElementLayout = _interopRequireDefault(require("../../modules/useElementLayout"));

var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));

var _usePlatformMethods = _interopRequireDefault(require("../../modules/usePlatformMethods"));

var _useResponderEvents = _interopRequireDefault(require("../../modules/useResponderEvents"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextAncestorContext = _interopRequireDefault(require("../Text/TextAncestorContext"));

var _useLocale = require("../../modules/useLocale");

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var forwardPropsList = (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, forwardedProps.defaultProps), forwardedProps.accessibilityProps), forwardedProps.clickProps), forwardedProps.focusProps), forwardedProps.keyboardProps), forwardedProps.mouseProps), forwardedProps.touchProps), forwardedProps.styleProps), {}, {
  href: true,
  lang: true,
  onScroll: true,
  onWheel: true,
  pointerEvents: true
});

var pickProps = function pickProps(props) {
  return (0, _pick.default)(props, forwardPropsList);
};

var View = /*#__PURE__*/React.forwardRef(function (props, forwardedRef) {
  var hrefAttrs = props.hrefAttrs,
      onLayout = props.onLayout,
      onMoveShouldSetResponder = props.onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture = props.onMoveShouldSetResponderCapture,
      onResponderEnd = props.onResponderEnd,
      onResponderGrant = props.onResponderGrant,
      onResponderMove = props.onResponderMove,
      onResponderReject = props.onResponderReject,
      onResponderRelease = props.onResponderRelease,
      onResponderStart = props.onResponderStart,
      onResponderTerminate = props.onResponderTerminate,
      onResponderTerminationRequest = props.onResponderTerminationRequest,
      onScrollShouldSetResponder = props.onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture = props.onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder = props.onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture = props.onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder = props.onStartShouldSetResponder,
      onStartShouldSetResponderCapture = props.onStartShouldSetResponderCapture,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["hrefAttrs", "onLayout", "onMoveShouldSetResponder", "onMoveShouldSetResponderCapture", "onResponderEnd", "onResponderGrant", "onResponderMove", "onResponderReject", "onResponderRelease", "onResponderStart", "onResponderTerminate", "onResponderTerminationRequest", "onScrollShouldSetResponder", "onScrollShouldSetResponderCapture", "onSelectionChangeShouldSetResponder", "onSelectionChangeShouldSetResponderCapture", "onStartShouldSetResponder", "onStartShouldSetResponderCapture"]);

  if (process.env.NODE_ENV !== 'production') {
    React.Children.toArray(props.children).forEach(function (item) {
      if (typeof item === 'string') {
        console.error("Unexpected text node: " + item + ". A text node cannot be a child of a <View>.");
      }
    });
  }

  var hasTextAncestor = React.useContext(_TextAncestorContext.default);
  var hostRef = React.useRef(null);

  var _useLocaleContext = (0, _useLocale.useLocaleContext)(),
      contextDirection = _useLocaleContext.direction;

  (0, _useElementLayout.default)(hostRef, onLayout);
  (0, _useResponderEvents.default)(hostRef, {
    onMoveShouldSetResponder: onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture: onMoveShouldSetResponderCapture,
    onResponderEnd: onResponderEnd,
    onResponderGrant: onResponderGrant,
    onResponderMove: onResponderMove,
    onResponderReject: onResponderReject,
    onResponderRelease: onResponderRelease,
    onResponderStart: onResponderStart,
    onResponderTerminate: onResponderTerminate,
    onResponderTerminationRequest: onResponderTerminationRequest,
    onScrollShouldSetResponder: onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture: onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder: onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture: onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder: onStartShouldSetResponder,
    onStartShouldSetResponderCapture: onStartShouldSetResponderCapture
  });
  var component = 'div';
  var langDirection = props.lang != null ? (0, _useLocale.getLocaleDirection)(props.lang) : null;
  var componentDirection = props.dir || langDirection;
  var writingDirection = componentDirection || contextDirection;
  var supportedProps = pickProps(rest);
  supportedProps.dir = componentDirection;
  supportedProps.style = [styles.view$raw, hasTextAncestor && styles.inline, props.style];

  if (props.href != null) {
    component = 'a';

    if (hrefAttrs != null) {
      var download = hrefAttrs.download,
          rel = hrefAttrs.rel,
          target = hrefAttrs.target;

      if (download != null) {
        supportedProps.download = download;
      }

      if (rel != null) {
        supportedProps.rel = rel;
      }

      if (typeof target === 'string') {
        supportedProps.target = target.charAt(0) !== '_' ? '_' + target : target;
      }
    }
  }

  var platformMethodsRef = (0, _usePlatformMethods.default)(supportedProps);
  var setRef = (0, _useMergeRefs.default)(hostRef, platformMethodsRef, forwardedRef);
  supportedProps.ref = setRef;
  return (0, _createElement.default)(component, supportedProps, {
    writingDirection: writingDirection
  });
});
View.displayName = 'View';

var styles = _StyleSheet.default.create({
  view$raw: {
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    border: '0 solid black',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    listStyle: 'none',
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    position: 'relative',
    textDecoration: 'none',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  }
});

var _default = View;
exports.default = _default;
module.exports = exports.default;