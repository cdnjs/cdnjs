"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _dismissKeyboard = _interopRequireDefault(require("../../modules/dismissKeyboard"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _mergeRefs = _interopRequireDefault(require("../../modules/mergeRefs"));

var _ScrollResponder = _interopRequireDefault(require("../../modules/ScrollResponder"));

var _ScrollViewBase = _interopRequireDefault(require("./ScrollViewBase"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

var _excluded = ["contentContainerStyle", "horizontal", "onContentSizeChange", "refreshControl", "stickyHeaderIndices", "pagingEnabled", "forwardedRef", "keyboardDismissMode", "onScroll", "centerContent"];
var emptyObject = {};
/* eslint-disable react/prefer-es6-class */

var ScrollView = (0, _createReactClass.default)({
  displayName: "ScrollView",
  mixins: [_ScrollResponder.default.Mixin],

  getInitialState() {
    return this.scrollResponderMixinGetInitialState();
  },

  flashScrollIndicators() {
    this.scrollResponderFlashScrollIndicators();
  },

  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder() {
    return this;
  },

  getScrollableNode() {
    return this._scrollNodeRef;
  },

  getInnerViewRef() {
    return this._innerViewRef;
  },

  getInnerViewNode() {
    return this._innerViewRef;
  },

  getNativeScrollRef() {
    return this._scrollNodeRef;
  },

  /**
   * Scrolls to a given x, y offset, either immediately or with a smooth animation.
   * Syntax:
   *
   * scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   *
   * Note: The weird argument signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as as alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */
  scrollTo(y, x, animated) {
    if (typeof y === 'number') {
      console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
    } else {
      var _ref = y || emptyObject;

      x = _ref.x;
      y = _ref.y;
      animated = _ref.animated;
    }

    this.getScrollResponder().scrollResponderScrollTo({
      x: x || 0,
      y: y || 0,
      animated: animated !== false
    });
  },

  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({ animated: true })` for smooth animated scrolling,
   * `scrollToEnd({ animated: false })` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */
  scrollToEnd(options) {
    // Default to true
    var animated = (options && options.animated) !== false;
    var horizontal = this.props.horizontal;
    var scrollResponder = this.getScrollResponder();
    var scrollResponderNode = scrollResponder.scrollResponderGetScrollableNode();
    var x = horizontal ? scrollResponderNode.scrollWidth : 0;
    var y = horizontal ? 0 : scrollResponderNode.scrollHeight;
    scrollResponder.scrollResponderScrollTo({
      x,
      y,
      animated
    });
  },

  render() {
    var _this$props = this.props,
        contentContainerStyle = _this$props.contentContainerStyle,
        horizontal = _this$props.horizontal,
        onContentSizeChange = _this$props.onContentSizeChange,
        refreshControl = _this$props.refreshControl,
        stickyHeaderIndices = _this$props.stickyHeaderIndices,
        pagingEnabled = _this$props.pagingEnabled,
        forwardedRef = _this$props.forwardedRef,
        keyboardDismissMode = _this$props.keyboardDismissMode,
        onScroll = _this$props.onScroll,
        centerContent = _this$props.centerContent,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, _excluded);

    if (process.env.NODE_ENV !== 'production' && this.props.style) {
      var style = _StyleSheet.default.flatten(this.props.style);

      var childLayoutProps = ['alignItems', 'justifyContent'].filter(prop => style && style[prop] !== undefined);
      (0, _invariant.default)(childLayoutProps.length === 0, "ScrollView child layout (" + JSON.stringify(childLayoutProps) + ") " + 'must be applied through the contentContainerStyle prop.');
    }

    var contentSizeChangeProps = {};

    if (onContentSizeChange) {
      contentSizeChangeProps = {
        onLayout: this._handleContentOnLayout
      };
    }

    var hasStickyHeaderIndices = !horizontal && Array.isArray(stickyHeaderIndices);
    var children = hasStickyHeaderIndices || pagingEnabled ? _react.default.Children.map(this.props.children, (child, i) => {
      var isSticky = hasStickyHeaderIndices && stickyHeaderIndices.indexOf(i) > -1;

      if (child != null && (isSticky || pagingEnabled)) {
        return /*#__PURE__*/_react.default.createElement(_View.default, {
          style: _StyleSheet.default.compose(isSticky && styles.stickyHeader, pagingEnabled && styles.pagingEnabledChild)
        }, child);
      } else {
        return child;
      }
    }) : this.props.children;

    var contentContainer = /*#__PURE__*/_react.default.createElement(_View.default, (0, _extends2.default)({}, contentSizeChangeProps, {
      children: children,
      collapsable: false,
      ref: this._setInnerViewRef,
      style: [horizontal && styles.contentContainerHorizontal, centerContent && styles.contentContainerCenterContent, contentContainerStyle]
    }));

    var baseStyle = horizontal ? styles.baseHorizontal : styles.baseVertical;
    var pagingEnabledStyle = horizontal ? styles.pagingEnabledHorizontal : styles.pagingEnabledVertical;
    var props = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, other), {}, {
      style: [baseStyle, pagingEnabled && pagingEnabledStyle, this.props.style],
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
      onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
      onScroll: this._handleScroll,
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderReject: this.scrollResponderHandleResponderReject
    });
    var ScrollViewClass = _ScrollViewBase.default;
    (0, _invariant.default)(ScrollViewClass !== undefined, 'ScrollViewClass must not be undefined');

    var scrollView = /*#__PURE__*/_react.default.createElement(ScrollViewClass, (0, _extends2.default)({}, props, {
      ref: this._setScrollNodeRef
    }), contentContainer);

    if (refreshControl) {
      return /*#__PURE__*/_react.default.cloneElement(refreshControl, {
        style: props.style
      }, scrollView);
    }

    return scrollView;
  },

  _handleContentOnLayout(e) {
    var _e$nativeEvent$layout = e.nativeEvent.layout,
        width = _e$nativeEvent$layout.width,
        height = _e$nativeEvent$layout.height;
    this.props.onContentSizeChange(width, height);
  },

  _handleScroll(e) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.onScroll && this.props.scrollEventThrottle == null) {
        console.log('You specified `onScroll` on a <ScrollView> but not ' + '`scrollEventThrottle`. You will only receive one event. ' + 'Using `16` you get all the events but be aware that it may ' + "cause frame drops, use a bigger number if you don't need as " + 'much precision.');
      }
    }

    if (this.props.keyboardDismissMode === 'on-drag') {
      (0, _dismissKeyboard.default)();
    }

    this.scrollResponderHandleScroll(e);
  },

  _setInnerViewRef(node) {
    this._innerViewRef = node;
  },

  _setScrollNodeRef(node) {
    this._scrollNodeRef = node; // ScrollView needs to add more methods to the hostNode in addition to those
    // added by `usePlatformMethods`. This is temporarily until an API like
    // `ScrollView.scrollTo(hostNode, { x, y })` is added to React Native.

    if (node != null) {
      node.getScrollResponder = this.getScrollResponder;
      node.getInnerViewNode = this.getInnerViewNode;
      node.getInnerViewRef = this.getInnerViewRef;
      node.getNativeScrollRef = this.getNativeScrollRef;
      node.getScrollableNode = this.getScrollableNode;
      node.scrollTo = this.scrollTo;
      node.scrollToEnd = this.scrollToEnd;
      node.flashScrollIndicators = this.flashScrollIndicators;
      node.scrollResponderZoomTo = this.scrollResponderZoomTo;
      node.scrollResponderScrollNativeHandleToKeyboard = this.scrollResponderScrollNativeHandleToKeyboard;
    }

    var ref = (0, _mergeRefs.default)(this.props.forwardedRef);
    ref(node);
  }

});
var commonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  // Enable hardware compositing in modern browsers.
  // Creates a new layer with its own backing surface that can significantly
  // improve scroll performance.
  transform: [{
    translateZ: 0
  }],
  // iOS native scrolling
  WebkitOverflowScrolling: 'touch'
};

var styles = _StyleSheet.default.create({
  baseVertical: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, commonStyle), {}, {
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto'
  }),
  baseHorizontal: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, commonStyle), {}, {
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden'
  }),
  contentContainerHorizontal: {
    flexDirection: 'row'
  },
  contentContainerCenterContent: {
    justifyContent: 'center',
    flexGrow: 1
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  pagingEnabledHorizontal: {
    scrollSnapType: 'x mandatory'
  },
  pagingEnabledVertical: {
    scrollSnapType: 'y mandatory'
  },
  pagingEnabledChild: {
    scrollSnapAlign: 'start'
  }
});

var ForwardedScrollView = /*#__PURE__*/_react.default.forwardRef((props, forwardedRef) => {
  return /*#__PURE__*/_react.default.createElement(ScrollView, (0, _extends2.default)({}, props, {
    forwardedRef: forwardedRef
  }));
});

ForwardedScrollView.displayName = 'ScrollView';
var _default = ForwardedScrollView;
exports.default = _default;
module.exports = exports.default;