"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _Dimensions = _interopRequireDefault(require("../Dimensions"));
var _dismissKeyboard = _interopRequireDefault(require("../../modules/dismissKeyboard"));
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
var _mergeRefs = _interopRequireDefault(require("../../modules/mergeRefs"));
var _Platform = _interopRequireDefault(require("../Platform"));
var _ScrollViewBase = _interopRequireDefault(require("./ScrollViewBase"));
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _TextInputState = _interopRequireDefault(require("../../modules/TextInputState"));
var _UIManager = _interopRequireDefault(require("../UIManager"));
var _View = _interopRequireDefault(require("../View"));
var _react = _interopRequireDefault(require("react"));
var _warning = _interopRequireDefault(require("fbjs/lib/warning"));
var _excluded = ["contentContainerStyle", "horizontal", "onContentSizeChange", "refreshControl", "stickyHeaderIndices", "pagingEnabled", "forwardedRef", "keyboardDismissMode", "onScroll", "centerContent"];
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var emptyObject = {};
var IS_ANIMATING_TOUCH_START_THRESHOLD_MS = 16;
class ScrollView extends _react.default.Component {
  constructor() {
    super(...arguments);
    this._scrollNodeRef = null;
    this._innerViewRef = null;
    this.isTouching = false;
    this.lastMomentumScrollBeginTime = 0;
    this.lastMomentumScrollEndTime = 0;
    this.observedScrollSinceBecomingResponder = false;
    this.becameResponderWhileAnimating = false;
    this.scrollResponderHandleScrollShouldSetResponder = () => {
      return this.isTouching;
    };
    this.scrollResponderHandleStartShouldSetResponderCapture = e => {
      // First see if we want to eat taps while the keyboard is up
      // var currentlyFocusedTextInput = TextInputState.currentlyFocusedField();
      // if (!this.props.keyboardShouldPersistTaps &&
      //   currentlyFocusedTextInput != null &&
      //   e.target !== currentlyFocusedTextInput) {
      //   return true;
      // }
      return this.scrollResponderIsAnimating();
    };
    this.scrollResponderHandleTerminationRequest = () => {
      return !this.observedScrollSinceBecomingResponder;
    };
    this.scrollResponderHandleTouchEnd = e => {
      var nativeEvent = e.nativeEvent;
      this.isTouching = nativeEvent.touches.length !== 0;
      this.props.onTouchEnd && this.props.onTouchEnd(e);
    };
    this.scrollResponderHandleResponderRelease = e => {
      this.props.onResponderRelease && this.props.onResponderRelease(e);

      // By default scroll views will unfocus a textField
      // if another touch occurs outside of it
      var currentlyFocusedTextInput = _TextInputState.default.currentlyFocusedField();
      if (!this.props.keyboardShouldPersistTaps && currentlyFocusedTextInput != null && e.target !== currentlyFocusedTextInput && !this.observedScrollSinceBecomingResponder && !this.becameResponderWhileAnimating) {
        this.props.onScrollResponderKeyboardDismissed && this.props.onScrollResponderKeyboardDismissed(e);
        _TextInputState.default.blurTextInput(currentlyFocusedTextInput);
      }
    };
    this.scrollResponderHandleScroll = e => {
      this.observedScrollSinceBecomingResponder = true;
      this.props.onScroll && this.props.onScroll(e);
    };
    this.scrollResponderHandleResponderGrant = e => {
      this.observedScrollSinceBecomingResponder = false;
      this.props.onResponderGrant && this.props.onResponderGrant(e);
      this.becameResponderWhileAnimating = this.scrollResponderIsAnimating();
    };
    this.scrollResponderHandleScrollBeginDrag = e => {
      this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
    };
    this.scrollResponderHandleScrollEndDrag = e => {
      this.props.onScrollEndDrag && this.props.onScrollEndDrag(e);
    };
    this.scrollResponderHandleMomentumScrollBegin = e => {
      this.lastMomentumScrollBeginTime = Date.now();
      this.props.onMomentumScrollBegin && this.props.onMomentumScrollBegin(e);
    };
    this.scrollResponderHandleMomentumScrollEnd = e => {
      this.lastMomentumScrollEndTime = Date.now();
      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e);
    };
    this.scrollResponderHandleTouchStart = e => {
      this.isTouching = true;
      this.props.onTouchStart && this.props.onTouchStart(e);
    };
    this.scrollResponderHandleTouchMove = e => {
      this.props.onTouchMove && this.props.onTouchMove(e);
    };
    this.scrollResponderIsAnimating = () => {
      var now = Date.now();
      var timeSinceLastMomentumScrollEnd = now - this.lastMomentumScrollEndTime;
      var isAnimating = timeSinceLastMomentumScrollEnd < IS_ANIMATING_TOUCH_START_THRESHOLD_MS || this.lastMomentumScrollEndTime < this.lastMomentumScrollBeginTime;
      return isAnimating;
    };
    this.scrollResponderScrollTo = (x, y, animated) => {
      if (typeof x === 'number') {
        console.warn('`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.');
      } else {
        var _ref = x || emptyObject;
        x = _ref.x;
        y = _ref.y;
        animated = _ref.animated;
      }
      var node = this.getScrollableNode();
      var left = x || 0;
      var top = y || 0;
      if (node != null) {
        if (typeof node.scroll === 'function') {
          node.scroll({
            top,
            left,
            behavior: !animated ? 'auto' : 'smooth'
          });
        } else {
          node.scrollLeft = left;
          node.scrollTop = top;
        }
      }
    };
    this.scrollResponderZoomTo = (rect, animated) => {
      if (_Platform.default.OS !== 'ios') {
        (0, _invariant.default)('zoomToRect is not implemented');
      }
    };
    this.scrollResponderScrollNativeHandleToKeyboard = (nodeHandle, additionalOffset, preventNegativeScrollOffset) => {
      this.additionalScrollOffset = additionalOffset || 0;
      this.preventNegativeScrollOffset = !!preventNegativeScrollOffset;
      _UIManager.default.measureLayout(nodeHandle, this.getInnerViewNode(), this.scrollResponderTextInputFocusError, this.scrollResponderInputMeasureAndScrollToKeyboard);
    };
    this.scrollResponderInputMeasureAndScrollToKeyboard = (left, top, width, height) => {
      var keyboardScreenY = _Dimensions.default.get('window').height;
      if (this.keyboardWillOpenTo) {
        keyboardScreenY = this.keyboardWillOpenTo.endCoordinates.screenY;
      }
      var scrollOffsetY = top - keyboardScreenY + height + this.additionalScrollOffset;

      // By default, this can scroll with negative offset, pulling the content
      // down so that the target component's bottom meets the keyboard's top.
      // If requested otherwise, cap the offset at 0 minimum to avoid content
      // shifting down.
      if (this.preventNegativeScrollOffset) {
        scrollOffsetY = Math.max(0, scrollOffsetY);
      }
      this.scrollResponderScrollTo({
        x: 0,
        y: scrollOffsetY,
        animated: true
      });
      this.additionalOffset = 0;
      this.preventNegativeScrollOffset = false;
    };
    this.scrollResponderKeyboardWillShow = e => {
      this.keyboardWillOpenTo = e;
      this.props.onKeyboardWillShow && this.props.onKeyboardWillShow(e);
    };
    this.scrollResponderKeyboardWillHide = e => {
      this.keyboardWillOpenTo = null;
      this.props.onKeyboardWillHide && this.props.onKeyboardWillHide(e);
    };
    this.scrollResponderKeyboardDidShow = e => {
      // TODO(7693961): The event for DidShow is not available on iOS yet.
      // Use the one from WillShow and do not assign.
      if (e) {
        this.keyboardWillOpenTo = e;
      }
      this.props.onKeyboardDidShow && this.props.onKeyboardDidShow(e);
    };
    this.scrollResponderKeyboardDidHide = e => {
      this.keyboardWillOpenTo = null;
      this.props.onKeyboardDidHide && this.props.onKeyboardDidHide(e);
    };
    this.flashScrollIndicators = () => {
      this.scrollResponderFlashScrollIndicators();
    };
    this.getScrollResponder = () => {
      return this;
    };
    this.getScrollableNode = () => {
      return this._scrollNodeRef;
    };
    this.getInnerViewRef = () => {
      return this._innerViewRef;
    };
    this.getInnerViewNode = () => {
      return this._innerViewRef;
    };
    this.getNativeScrollRef = () => {
      return this._scrollNodeRef;
    };
    this.scrollTo = (y, x, animated) => {
      if (typeof y === 'number') {
        console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
      } else {
        var _ref2 = y || emptyObject;
        x = _ref2.x;
        y = _ref2.y;
        animated = _ref2.animated;
      }
      this.scrollResponderScrollTo({
        x: x || 0,
        y: y || 0,
        animated: animated !== false
      });
    };
    this.scrollToEnd = options => {
      // Default to true
      var animated = (options && options.animated) !== false;
      var horizontal = this.props.horizontal;
      var scrollResponderNode = this.getScrollableNode();
      var x = horizontal ? scrollResponderNode.scrollWidth : 0;
      var y = horizontal ? 0 : scrollResponderNode.scrollHeight;
      this.scrollResponderScrollTo({
        x,
        y,
        animated
      });
    };
    this._handleContentOnLayout = e => {
      var _e$nativeEvent$layout = e.nativeEvent.layout,
        width = _e$nativeEvent$layout.width,
        height = _e$nativeEvent$layout.height;
      this.props.onContentSizeChange(width, height);
    };
    this._handleScroll = e => {
      if (process.env.NODE_ENV !== 'production') {
        if (this.props.onScroll && this.props.scrollEventThrottle == null) {
          console.log('You specified `onScroll` on a <ScrollView> but not ' + '`scrollEventThrottle`. You will only receive one event. ' + 'Using `16` you get all the events but be aware that it may ' + "cause frame drops, use a bigger number if you don't need as " + 'much precision.');
        }
      }
      if (this.props.keyboardDismissMode === 'on-drag') {
        (0, _dismissKeyboard.default)();
      }
      this.scrollResponderHandleScroll(e);
    };
    this._setInnerViewRef = node => {
      this._innerViewRef = node;
    };
    this._setScrollNodeRef = node => {
      this._scrollNodeRef = node;
      // ScrollView needs to add more methods to the hostNode in addition to those
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
    };
  }
  /**
   * ------------------------------------------------------
   * START SCROLLRESPONDER
   * ------------------------------------------------------
   */
  // Reset to false every time becomes responder. This is used to:
  // - Determine if the scroll view has been scrolled and therefore should
  // refuse to give up its responder lock.
  // - Determine if releasing should dismiss the keyboard when we are in
  // tap-to-dismiss mode (!this.props.keyboardShouldPersistTaps).
  /**
   * Invoke this from an `onScroll` event.
   */
  /**
   * Merely touch starting is not sufficient for a scroll view to become the
   * responder. Being the "responder" means that the very next touch move/end
   * event will result in an action/movement.
   *
   * Invoke this from an `onStartShouldSetResponder` event.
   *
   * `onStartShouldSetResponder` is used when the next move/end will trigger
   * some UI movement/action, but when you want to yield priority to views
   * nested inside of the view.
   *
   * There may be some cases where scroll views actually should return `true`
   * from `onStartShouldSetResponder`: Any time we are detecting a standard tap
   * that gives priority to nested views.
   *
   * - If a single tap on the scroll view triggers an action such as
   *   recentering a map style view yet wants to give priority to interaction
   *   views inside (such as dropped pins or labels), then we would return true
   *   from this method when there is a single touch.
   *
   * - Similar to the previous case, if a two finger "tap" should trigger a
   *   zoom, we would check the `touches` count, and if `>= 2`, we would return
   *   true.
   *
   */
  scrollResponderHandleStartShouldSetResponder() {
    return false;
  }

  /**
   * There are times when the scroll view wants to become the responder
   * (meaning respond to the next immediate `touchStart/touchEnd`), in a way
   * that *doesn't* give priority to nested views (hence the capture phase):
   *
   * - Currently animating.
   * - Tapping anywhere that is not the focused input, while the keyboard is
   *   up (which should dismiss the keyboard).
   *
   * Invoke this from an `onStartShouldSetResponderCapture` event.
   */

  /**
   * Invoke this from an `onResponderReject` event.
   *
   * Some other element is not yielding its role as responder. Normally, we'd
   * just disable the `UIScrollView`, but a touch has already began on it, the
   * `UIScrollView` will not accept being disabled after that. The easiest
   * solution for now is to accept the limitation of disallowing this
   * altogether. To improve this, find a way to disable the `UIScrollView` after
   * a touch has already started.
   */
  scrollResponderHandleResponderReject() {
    (0, _warning.default)(false, "ScrollView doesn't take rejection well - scrolls anyway");
  }

  /**
   * We will allow the scroll view to give up its lock iff it acquired the lock
   * during an animation. This is a very useful default that happens to satisfy
   * many common user experiences.
   *
   * - Stop a scroll on the left edge, then turn that into an outer view's
   *   backswipe.
   * - Stop a scroll mid-bounce at the top, continue pulling to have the outer
   *   view dismiss.
   * - However, without catching the scroll view mid-bounce (while it is
   *   motionless), if you drag far enough for the scroll view to become
   *   responder (and therefore drag the scroll view a bit), any backswipe
   *   navigation of a swipe gesture higher in the view hierarchy, should be
   *   rejected.
   */

  /**
   * Invoke this from an `onTouchEnd` event.
   *
   * @param {SyntheticEvent} e Event.
   */

  /**
   * Invoke this from an `onResponderRelease` event.
   */

  /**
   * Invoke this from an `onResponderGrant` event.
   */

  /**
   * Unfortunately, `onScrollBeginDrag` also fires when *stopping* the scroll
   * animation, and there's not an easy way to distinguish a drag vs. stopping
   * momentum.
   *
   * Invoke this from an `onScrollBeginDrag` event.
   */

  /**
   * Invoke this from an `onScrollEndDrag` event.
   */

  /**
   * Invoke this from an `onMomentumScrollBegin` event.
   */

  /**
   * Invoke this from an `onMomentumScrollEnd` event.
   */

  /**
   * Invoke this from an `onTouchStart` event.
   *
   * Since we know that the `SimpleEventPlugin` occurs later in the plugin
   * order, after `ResponderEventPlugin`, we can detect that we were *not*
   * permitted to be the responder (presumably because a contained view became
   * responder). The `onResponderReject` won't fire in that case - it only
   * fires when a *current* responder rejects our request.
   *
   * @param {SyntheticEvent} e Touch Start event.
   */

  /**
   * Invoke this from an `onTouchMove` event.
   *
   * Since we know that the `SimpleEventPlugin` occurs later in the plugin
   * order, after `ResponderEventPlugin`, we can detect that we were *not*
   * permitted to be the responder (presumably because a contained view became
   * responder). The `onResponderReject` won't fire in that case - it only
   * fires when a *current* responder rejects our request.
   *
   * @param {SyntheticEvent} e Touch Start event.
   */

  /**
   * A helper function for this class that lets us quickly determine if the
   * view is currently animating. This is particularly useful to know when
   * a touch has just started or ended.
   */

  /**
   * A helper function to scroll to a specific point in the scrollview.
   * This is currently used to help focus on child textviews, but can also
   * be used to quickly scroll to any element we want to focus. Syntax:
   *
   * scrollResponderScrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   *
   * Note: The weird argument signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as as alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */

  /**
   * A helper function to zoom to a specific rect in the scrollview. The argument has the shape
   * {x: number; y: number; width: number; height: number; animated: boolean = true}
   *
   * @platform ios
   */

  /**
   * Displays the scroll indicators momentarily.
   */
  scrollResponderFlashScrollIndicators() {}

  /**
   * This method should be used as the callback to onFocus in a TextInputs'
   * parent view. Note that any module using this mixin needs to return
   * the parent view's ref in getScrollViewRef() in order to use this method.
   * @param {any} nodeHandle The TextInput node handle
   * @param {number} additionalOffset The scroll view's top "contentInset".
   *        Default is 0.
   * @param {bool} preventNegativeScrolling Whether to allow pulling the content
   *        down to make it meet the keyboard's top. Default is false.
   */

  /**
   * The calculations performed here assume the scroll view takes up the entire
   * screen - even if has some content inset. We then measure the offsets of the
   * keyboard, and compensate both for the scroll view's "contentInset".
   *
   * @param {number} left Position of input w.r.t. table view.
   * @param {number} top Position of input w.r.t. table view.
   * @param {number} width Width of the text input.
   * @param {number} height Height of the text input.
   */

  scrollResponderTextInputFocusError(e) {
    console.error('Error measuring text field: ', e);
  }

  /**
   * Warning, this may be called several times for a single keyboard opening.
   * It's best to store the information in this method and then take any action
   * at a later point (either in `keyboardDidShow` or other).
   *
   * Here's the order that events occur in:
   * - focus
   * - willShow {startCoordinates, endCoordinates} several times
   * - didShow several times
   * - blur
   * - willHide {startCoordinates, endCoordinates} several times
   * - didHide several times
   *
   * The `ScrollResponder` providesModule callbacks for each of these events.
   * Even though any user could have easily listened to keyboard events
   * themselves, using these `props` callbacks ensures that ordering of events
   * is consistent - and not dependent on the order that the keyboard events are
   * subscribed to. This matters when telling the scroll view to scroll to where
   * the keyboard is headed - the scroll responder better have been notified of
   * the keyboard destination before being instructed to scroll to where the
   * keyboard will be. Stick to the `ScrollResponder` callbacks, and everything
   * will work.
   *
   * WARNING: These callbacks will fire even if a keyboard is displayed in a
   * different navigation pane. Filter out the events to determine if they are
   * relevant to you. (For example, only if you receive these callbacks after
   * you had explicitly focused a node etc).
   */

  /**
   * ------------------------------------------------------
   * END SCROLLRESPONDER
   * ------------------------------------------------------
   */

  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */

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

  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({ animated: true })` for smooth animated scrolling,
   * `scrollToEnd({ animated: false })` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */

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
          style: [isSticky && styles.stickyHeader, pagingEnabled && styles.pagingEnabledChild]
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
  }
}
var commonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  // Enable hardware compositing in modern browsers.
  // Creates a new layer with its own backing surface that can significantly
  // improve scroll performance.
  transform: 'translateZ(0)',
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