"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _createElement = _interopRequireDefault(require("../createElement"));

var forwardedProps = _interopRequireWildcard(require("../../modules/forwardedProps"));

var _pick = _interopRequireDefault(require("../../modules/pick"));

var _useElementLayout = _interopRequireDefault(require("../../modules/useElementLayout"));

var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));

var _usePlatformMethods = _interopRequireDefault(require("../../modules/usePlatformMethods"));

var _useResponderEvents = _interopRequireDefault(require("../../modules/useResponderEvents"));

var _RTLContext = _interopRequireDefault(require("../../modules/RTLContext"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextAncestorContext = _interopRequireDefault(require("./TextAncestorContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var forwardPropsList = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, forwardedProps.defaultProps), forwardedProps.accessibilityProps), forwardedProps.clickProps), forwardedProps.focusProps), forwardedProps.keyboardProps), forwardedProps.mouseProps), forwardedProps.touchProps), forwardedProps.styleProps), {}, {
  href: true,
  lang: true,
  pointerEvents: true
});

var pickProps = function pickProps(props) {
  return (0, _pick.default)(props, forwardPropsList);
};

var Text = /*#__PURE__*/React.forwardRef(function (props, forwardedRef) {
  var dir = props.dir,
      hrefAttrs = props.hrefAttrs,
      numberOfLines = props.numberOfLines,
      onClick = props.onClick,
      onLayout = props.onLayout,
      onPress = props.onPress,
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
      selectable = props.selectable;
  var hasTextAncestor = React.useContext(_TextAncestorContext.default);
  var hostRef = React.useRef(null);
  var isRTL = React.useContext(_RTLContext.default);
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
  var handleClick = React.useCallback(function (e) {
    if (onClick != null) {
      onClick(e);
    } else if (onPress != null) {
      e.stopPropagation();
      onPress(e);
    }
  }, [onClick, onPress]);
  var component = hasTextAncestor ? 'span' : 'div';
  var supportedProps = pickProps(props);
  supportedProps.dir = dir; // 'auto' by default allows browsers to infer writing direction (root elements only)

  if (!hasTextAncestor) {
    supportedProps.dir = dir != null ? dir : 'auto';
  }

  if (onClick || onPress) {
    supportedProps.onClick = handleClick;
  }

  supportedProps.isRTL = isRTL || dir === 'rtl';
  supportedProps.style = [numberOfLines != null && {
    WebkitLineClamp: numberOfLines
  }, hasTextAncestor === true ? styles.textHasAncestor$raw : styles.text$raw, numberOfLines != null && styles.textMultiLine, props.style, selectable === true && styles.selectable, selectable === false && styles.notSelectable, onPress && styles.pressable];

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
  var element = /*#__PURE__*/React.createElement(_RTLContext.default.Provider, {
    value: supportedProps.isRTL
  }, (0, _createElement.default)(component, supportedProps));
  return hasTextAncestor ? element : /*#__PURE__*/React.createElement(_TextAncestorContext.default.Provider, {
    value: true
  }, element);
});
Text.displayName = 'Text';
var textStyle = {
  backgroundColor: 'transparent',
  border: '0 solid black',
  boxSizing: 'border-box',
  color: 'black',
  display: 'inline',
  font: '14px System',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  textAlign: 'inherit',
  textDecoration: 'none',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word'
};

var styles = _StyleSheet.default.create({
  text$raw: textStyle,
  textHasAncestor$raw: _objectSpread(_objectSpread({}, textStyle), {}, {
    color: 'inherit',
    font: 'inherit',
    whiteSpace: 'inherit'
  }),
  // See #13
  textMultiLine: {
    display: '-webkit-box',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical'
  },
  notSelectable: {
    userSelect: 'none'
  },
  selectable: {
    userSelect: 'text'
  },
  pressable: {
    cursor: 'pointer'
  }
});

var _default = Text;
exports.default = _default;
module.exports = exports.default;