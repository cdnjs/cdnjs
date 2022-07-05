"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

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

const _excluded = ["hrefAttrs", "onLayout", "onMoveShouldSetResponder", "onMoveShouldSetResponderCapture", "onResponderEnd", "onResponderGrant", "onResponderMove", "onResponderReject", "onResponderRelease", "onResponderStart", "onResponderTerminate", "onResponderTerminationRequest", "onScrollShouldSetResponder", "onScrollShouldSetResponderCapture", "onSelectionChangeShouldSetResponder", "onSelectionChangeShouldSetResponderCapture", "onStartShouldSetResponder", "onStartShouldSetResponderCapture"];
const forwardPropsList = Object.assign({}, forwardedProps.defaultProps, forwardedProps.accessibilityProps, forwardedProps.clickProps, forwardedProps.defaultProps, forwardedProps.accessibilityProps, forwardedProps.clickProps, forwardedProps.focusProps, forwardedProps.keyboardProps, forwardedProps.mouseProps, forwardedProps.touchProps, forwardedProps.styleProps, {
  href: true,
  lang: true,
  onScroll: true,
  onWheel: true,
  pointerEvents: true
});

const pickProps = props => (0, _pick.default)(props, forwardPropsList);

const View = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  const hrefAttrs = props.hrefAttrs,
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
        rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);

  if (process.env.NODE_ENV !== 'production') {
    React.Children.toArray(props.children).forEach(item => {
      if (typeof item === 'string') {
        console.error("Unexpected text node: " + item + ". A text node cannot be a child of a <View>.");
      }
    });
  }

  const hasTextAncestor = React.useContext(_TextAncestorContext.default);
  const hostRef = React.useRef(null);

  const _useLocaleContext = (0, _useLocale.useLocaleContext)(),
        contextDirection = _useLocaleContext.direction;

  (0, _useElementLayout.default)(hostRef, onLayout);
  (0, _useResponderEvents.default)(hostRef, {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture
  });
  let component = 'div';
  const langDirection = props.lang != null ? (0, _useLocale.getLocaleDirection)(props.lang) : null;
  const componentDirection = props.dir || langDirection;
  const writingDirection = componentDirection || contextDirection;
  const supportedProps = pickProps(rest);
  supportedProps.dir = componentDirection;
  supportedProps.style = [styles.view$raw, hasTextAncestor && styles.inline, props.style];

  if (props.href != null) {
    component = 'a';

    if (hrefAttrs != null) {
      const download = hrefAttrs.download,
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

  const platformMethodsRef = (0, _usePlatformMethods.default)(supportedProps);
  const setRef = (0, _useMergeRefs.default)(hostRef, platformMethodsRef, forwardedRef);
  supportedProps.ref = setRef;
  return (0, _createElement.default)(component, supportedProps, {
    writingDirection
  });
});
View.displayName = 'View';

const styles = _StyleSheet.default.create({
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