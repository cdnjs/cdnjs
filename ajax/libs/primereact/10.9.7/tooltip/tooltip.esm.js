'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useDisplayOrder, useGlobalOnEscapeKey, ESC_KEY_HANDLING_PRIORITIES, useResizeListener, useOverlayScrollListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { classNames, DomHandler, ZIndexUtils, ObjectUtils } from 'primereact/utils';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var classes = {
  root: function root(_ref) {
    var positionState = _ref.positionState,
      classNameState = _ref.classNameState;
    return classNames('p-tooltip p-component', _defineProperty({}, "p-tooltip-".concat(positionState), true), classNameState);
  },
  arrow: 'p-tooltip-arrow',
  text: 'p-tooltip-text'
};
var inlineStyles = {
  arrow: function arrow(_ref2) {
    var context = _ref2.context;
    return {
      top: context.bottom ? '0' : context.right || context.left || !context.right && !context.left && !context.top && !context.bottom ? '50%' : null,
      bottom: context.top ? '0' : null,
      left: context.right || !context.right && !context.left && !context.top && !context.bottom ? '0' : context.top || context.bottom ? '50%' : null,
      right: context.left ? '0' : null
    };
  }
};
var styles = "\n@layer primereact {\n    .p-tooltip {\n        position: absolute;\n        padding: .25em .5rem;\n        /* #3687: Tooltip prevent scrollbar flickering */\n        top: -9999px;\n        left: -9999px;\n    }\n    \n    .p-tooltip.p-tooltip-right,\n    .p-tooltip.p-tooltip-left {\n        padding: 0 .25rem;\n    }\n    \n    .p-tooltip.p-tooltip-top,\n    .p-tooltip.p-tooltip-bottom {\n        padding:.25em 0;\n    }\n    \n    .p-tooltip .p-tooltip-text {\n       white-space: pre-line;\n       word-break: break-word;\n    }\n    \n    .p-tooltip-arrow {\n        position: absolute;\n        width: 0;\n        height: 0;\n        border-color: transparent;\n        border-style: solid;\n    }\n    \n    .p-tooltip-right .p-tooltip-arrow {\n        top: 50%;\n        left: 0;\n        margin-top: -.25rem;\n        border-width: .25em .25em .25em 0;\n    }\n    \n    .p-tooltip-left .p-tooltip-arrow {\n        top: 50%;\n        right: 0;\n        margin-top: -.25rem;\n        border-width: .25em 0 .25em .25rem;\n    }\n    \n    .p-tooltip.p-tooltip-top {\n        padding: .25em 0;\n    }\n    \n    .p-tooltip-top .p-tooltip-arrow {\n        bottom: 0;\n        left: 50%;\n        margin-left: -.25rem;\n        border-width: .25em .25em 0;\n    }\n    \n    .p-tooltip-bottom .p-tooltip-arrow {\n        top: 0;\n        left: 50%;\n        margin-left: -.25rem;\n        border-width: 0 .25em .25rem;\n    }\n\n    .p-tooltip-target-wrapper {\n        display: inline-flex;\n    }\n}\n";
var TooltipBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Tooltip',
    appendTo: null,
    at: null,
    autoHide: true,
    autoZIndex: true,
    baseZIndex: 0,
    className: null,
    closeOnEscape: false,
    content: null,
    disabled: false,
    event: null,
    hideDelay: 0,
    hideEvent: 'mouseleave',
    id: null,
    mouseTrack: false,
    mouseTrackLeft: 5,
    mouseTrackTop: 5,
    my: null,
    onBeforeHide: null,
    onBeforeShow: null,
    onHide: null,
    onShow: null,
    position: 'right',
    showDelay: 0,
    showEvent: 'mouseenter',
    showOnDisabled: false,
    style: null,
    target: null,
    updateDelay: 0,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Tooltip = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = TooltipBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(props.position || 'right'),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    positionState = _React$useState4[0],
    setPositionState = _React$useState4[1];
  var _React$useState5 = React.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    classNameState = _React$useState6[0],
    setClassNameState = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    multipleFocusEvents = _React$useState8[0],
    setMultipleFocusEvents = _React$useState8[1];
  var isCloseOnEscape = visibleState && props.closeOnEscape;
  var overlayDisplayOrder = useDisplayOrder('tooltip', isCloseOnEscape);
  var metaData = {
    props: props,
    state: {
      visible: visibleState,
      position: positionState,
      className: classNameState
    },
    context: {
      right: positionState === 'right',
      left: positionState === 'left',
      top: positionState === 'top',
      bottom: positionState === 'bottom'
    }
  };
  var _TooltipBase$setMetaD = TooltipBase.setMetaData(metaData),
    ptm = _TooltipBase$setMetaD.ptm,
    cx = _TooltipBase$setMetaD.cx,
    sx = _TooltipBase$setMetaD.sx,
    isUnstyled = _TooltipBase$setMetaD.isUnstyled;
  useHandleStyle(TooltipBase.css.styles, isUnstyled, {
    name: 'tooltip'
  });
  useGlobalOnEscapeKey({
    callback: function callback() {
      hide();
    },
    when: isCloseOnEscape,
    priority: [ESC_KEY_HANDLING_PRIORITIES.TOOLTIP, overlayDisplayOrder]
  });
  var elementRef = React.useRef(null);
  var textRef = React.useRef(null);
  var currentTargetRef = React.useRef(null);
  var containerSize = React.useRef(null);
  var allowHide = React.useRef(true);
  var timeouts = React.useRef({});
  var currentMouseEvent = React.useRef(null);
  var _useResizeListener = useResizeListener({
      listener: function listener(event) {
        !DomHandler.isTouchDevice() && hide(event);
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
    bindWindowResizeListener = _useResizeListener2[0],
    unbindWindowResizeListener = _useResizeListener2[1];
  var _useOverlayScrollList = useOverlayScrollListener({
      target: currentTargetRef.current,
      listener: function listener(event) {
        hide(event);
      },
      when: visibleState
    }),
    _useOverlayScrollList2 = _slicedToArray(_useOverlayScrollList, 2),
    bindOverlayScrollListener = _useOverlayScrollList2[0],
    unbindOverlayScrollListener = _useOverlayScrollList2[1];
  var isTargetContentEmpty = function isTargetContentEmpty(target) {
    return !(props.content || getTargetOption(target, 'tooltip'));
  };
  var isContentEmpty = function isContentEmpty(target) {
    return !(props.content || getTargetOption(target, 'tooltip') || props.children);
  };
  var isMouseTrack = function isMouseTrack(target) {
    return getTargetOption(target, 'mousetrack') || props.mouseTrack;
  };
  var isDisabled = function isDisabled(target) {
    return getTargetOption(target, 'disabled') === 'true' || hasTargetOption(target, 'disabled') || props.disabled;
  };
  var isShowOnDisabled = function isShowOnDisabled(target) {
    return getTargetOption(target, 'showondisabled') || props.showOnDisabled;
  };
  var isAutoHide = function isAutoHide() {
    return getTargetOption(currentTargetRef.current, 'autohide') || props.autoHide;
  };
  var getTargetOption = function getTargetOption(target, option) {
    return hasTargetOption(target, "data-pr-".concat(option)) ? target.getAttribute("data-pr-".concat(option)) : null;
  };
  var hasTargetOption = function hasTargetOption(target, option) {
    return target && target.hasAttribute(option);
  };
  var getEvents = function getEvents(target) {
    var showEvents = [getTargetOption(target, 'showevent') || props.showEvent];
    var hideEvents = [getTargetOption(target, 'hideevent') || props.hideEvent];
    if (isMouseTrack(target)) {
      showEvents = ['mousemove'];
      hideEvents = ['mouseleave'];
    } else {
      var event = getTargetOption(target, 'event') || props.event;
      if (event === 'focus') {
        showEvents = ['focus'];
        hideEvents = ['blur'];
      }
      if (event === 'both') {
        showEvents = ['focus', 'mouseenter'];
        hideEvents = multipleFocusEvents ? ['blur'] : ['mouseleave', 'blur'];
      }
    }
    return {
      showEvents: showEvents,
      hideEvents: hideEvents
    };
  };
  var getPosition = function getPosition(target) {
    return getTargetOption(target, 'position') || positionState;
  };
  var getMouseTrackPosition = function getMouseTrackPosition(target) {
    var top = getTargetOption(target, 'mousetracktop') || props.mouseTrackTop;
    var left = getTargetOption(target, 'mousetrackleft') || props.mouseTrackLeft;
    return {
      top: top,
      left: left
    };
  };
  var updateText = function updateText(target, callback) {
    if (textRef.current) {
      var content = getTargetOption(target, 'tooltip') || props.content;
      if (content) {
        textRef.current.innerHTML = ''; // remove children
        textRef.current.appendChild(document.createTextNode(content));
        callback();
      } else if (props.children) {
        callback();
      }
    }
  };
  var updateTooltipState = function updateTooltipState(position) {
    updateText(currentTargetRef.current, function () {
      var _currentMouseEvent$cu = currentMouseEvent.current,
        x = _currentMouseEvent$cu.pageX,
        y = _currentMouseEvent$cu.pageY;
      if (props.autoZIndex && !ZIndexUtils.get(elementRef.current)) {
        ZIndexUtils.set('tooltip', elementRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex.tooltip || PrimeReact.zIndex.tooltip);
      }
      elementRef.current.style.left = '';
      elementRef.current.style.top = '';

      // GitHub #2695 disable pointer events when autohiding
      if (isAutoHide()) {
        elementRef.current.style.pointerEvents = 'none';
      }
      var mouseTrackCheck = isMouseTrack(currentTargetRef.current) || position === 'mouse';
      if (mouseTrackCheck && !containerSize.current || mouseTrackCheck) {
        containerSize.current = {
          width: DomHandler.getOuterWidth(elementRef.current),
          height: DomHandler.getOuterHeight(elementRef.current)
        };
      }
      align(currentTargetRef.current, {
        x: x,
        y: y
      }, position);
    });
  };
  var show = function show(e) {
    if (e.type && e.type === 'focus') setMultipleFocusEvents(true);
    currentTargetRef.current = e.currentTarget;
    var disabled = isDisabled(currentTargetRef.current);
    var empty = isContentEmpty(isShowOnDisabled(currentTargetRef.current) && disabled ? currentTargetRef.current.firstChild : currentTargetRef.current);
    if (empty || disabled) {
      return;
    }
    currentMouseEvent.current = e;
    if (visibleState) {
      applyDelay('updateDelay', updateTooltipState);
    } else {
      // #2653 give the callback a chance to return false and not continue with display
      var success = sendCallback(props.onBeforeShow, {
        originalEvent: e,
        target: currentTargetRef.current
      });
      if (success) {
        applyDelay('showDelay', function () {
          setVisibleState(true);
          sendCallback(props.onShow, {
            originalEvent: e,
            target: currentTargetRef.current
          });
        });
      }
    }
  };
  var hide = function hide(e) {
    if (e && e.type === 'blur') setMultipleFocusEvents(false);
    clearTimeouts();
    if (visibleState) {
      var success = sendCallback(props.onBeforeHide, {
        originalEvent: e,
        target: currentTargetRef.current
      });
      if (success) {
        applyDelay('hideDelay', function () {
          if (!isAutoHide() && allowHide.current === false) {
            return;
          }
          ZIndexUtils.clear(elementRef.current);
          DomHandler.removeClass(elementRef.current, 'p-tooltip-active');
          setVisibleState(false);
          sendCallback(props.onHide, {
            originalEvent: e,
            target: currentTargetRef.current
          });
        });
      }
    } else if (!props.onBeforeHide && !getDelay('hideDelay')) {
      // handles the case when visibleState change from mouseenter was queued and mouseleave handler was called earlier than queued re-render
      setVisibleState(false);
    }
  };
  var align = function align(target, coordinate, position) {
    var left = 0;
    var top = 0;
    var currentPosition = position || positionState;
    if ((isMouseTrack(target) || currentPosition == 'mouse') && coordinate) {
      var _containerSize = {
        width: DomHandler.getOuterWidth(elementRef.current),
        height: DomHandler.getOuterHeight(elementRef.current)
      };
      left = coordinate.x;
      top = coordinate.y;
      var _getMouseTrackPositio = getMouseTrackPosition(target),
        mouseTrackTop = _getMouseTrackPositio.top,
        mouseTrackLeft = _getMouseTrackPositio.left;
      switch (currentPosition) {
        case 'left':
          left = left - (_containerSize.width + mouseTrackLeft);
          top = top - (_containerSize.height / 2 - mouseTrackTop);
          break;
        case 'right':
        case 'mouse':
          left = left + mouseTrackLeft;
          top = top - (_containerSize.height / 2 - mouseTrackTop);
          break;
        case 'top':
          left = left - (_containerSize.width / 2 - mouseTrackLeft);
          top = top - (_containerSize.height + mouseTrackTop);
          break;
        case 'bottom':
          left = left - (_containerSize.width / 2 - mouseTrackLeft);
          top = top + mouseTrackTop;
          break;
      }
      if (left <= 0 || containerSize.current.width > _containerSize.width) {
        elementRef.current.style.left = '0px';
        elementRef.current.style.right = window.innerWidth - _containerSize.width - left + 'px';
      } else {
        elementRef.current.style.right = '';
        elementRef.current.style.left = left + 'px';
      }
      elementRef.current.style.top = top + 'px';
      DomHandler.addClass(elementRef.current, 'p-tooltip-active');
    } else {
      var pos = DomHandler.findCollisionPosition(currentPosition);
      var my = getTargetOption(target, 'my') || props.my || pos.my;
      var at = getTargetOption(target, 'at') || props.at || pos.at;
      elementRef.current.style.padding = '0px';
      DomHandler.flipfitCollision(elementRef.current, target, my, at, function (calculatedPosition) {
        var _calculatedPosition$a = calculatedPosition.at,
          atX = _calculatedPosition$a.x,
          atY = _calculatedPosition$a.y;
        var myX = calculatedPosition.my.x;
        var newPosition = props.at ? atX !== 'center' && atX !== myX ? atX : atY : calculatedPosition.at["".concat(pos.axis)];
        elementRef.current.style.padding = '';
        setPositionState(newPosition);
        updateContainerPosition(newPosition);
        DomHandler.addClass(elementRef.current, 'p-tooltip-active');
      });
    }
  };
  var updateContainerPosition = function updateContainerPosition(position) {
    if (elementRef.current) {
      var style = getComputedStyle(elementRef.current);
      if (position === 'left') {
        elementRef.current.style.left = parseFloat(style.left) - parseFloat(style.paddingLeft) * 2 + 'px';
      } else if (position === 'top') {
        elementRef.current.style.top = parseFloat(style.top) - parseFloat(style.paddingTop) * 2 + 'px';
      }
    }
  };
  var _onMouseEnter = function onMouseEnter() {
    if (!isAutoHide()) {
      allowHide.current = false;
    }
  };
  var _onMouseLeave = function onMouseLeave(e) {
    if (!isAutoHide()) {
      allowHide.current = true;
      hide(e);
    }
  };
  var bindTargetEvent = function bindTargetEvent(target) {
    if (target) {
      var _getEvents = getEvents(target),
        showEvents = _getEvents.showEvents,
        hideEvents = _getEvents.hideEvents;
      var currentTarget = getTarget(target);
      showEvents.forEach(function (event) {
        return currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.addEventListener(event, show);
      });
      hideEvents.forEach(function (event) {
        return currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.addEventListener(event, hide);
      });
    }
  };
  var unbindTargetEvent = function unbindTargetEvent(target) {
    if (target) {
      var _getEvents2 = getEvents(target),
        showEvents = _getEvents2.showEvents,
        hideEvents = _getEvents2.hideEvents;
      var currentTarget = getTarget(target);
      showEvents.forEach(function (event) {
        return currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.removeEventListener(event, show);
      });
      hideEvents.forEach(function (event) {
        return currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.removeEventListener(event, hide);
      });
    }
  };
  var getDelay = function getDelay(delayProp) {
    return getTargetOption(currentTargetRef.current, delayProp.toLowerCase()) || props[delayProp];
  };
  var applyDelay = function applyDelay(delayProp, callback) {
    clearTimeouts();
    var delay = getDelay(delayProp);
    delay ? timeouts.current["".concat(delayProp)] = setTimeout(function () {
      return callback();
    }, delay) : callback();
  };
  var sendCallback = function sendCallback(callback) {
    if (callback) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      var result = callback.apply(void 0, params);
      if (result === undefined) {
        result = true;
      }
      return result;
    }
    return true;
  };
  var clearTimeouts = function clearTimeouts() {
    Object.values(timeouts.current).forEach(function (t) {
      return clearTimeout(t);
    });
  };
  var getTarget = function getTarget(target) {
    if (target) {
      if (isShowOnDisabled(target)) {
        if (!target.hasWrapper) {
          var wrapper = document.createElement('div');
          var isInputElement = target.nodeName === 'INPUT';
          if (isInputElement) {
            DomHandler.addMultipleClasses(wrapper, 'p-tooltip-target-wrapper p-inputwrapper');
          } else {
            DomHandler.addClass(wrapper, 'p-tooltip-target-wrapper');
          }
          target.parentNode.insertBefore(wrapper, target);
          wrapper.appendChild(target);
          target.hasWrapper = true;
          return wrapper;
        }
        return target.parentElement;
      } else if (target.hasWrapper) {
        var _target$parentElement;
        (_target$parentElement = target.parentElement).replaceWith.apply(_target$parentElement, _toConsumableArray(target.parentElement.childNodes));
        delete target.hasWrapper;
      }
      return target;
    }
    return null;
  };
  var updateTargetEvents = function updateTargetEvents(target) {
    unloadTargetEvents(target);
    loadTargetEvents(target);
  };
  var loadTargetEvents = function loadTargetEvents(target) {
    setTargetEventOperations(target || props.target, bindTargetEvent);
  };
  var unloadTargetEvents = function unloadTargetEvents(target) {
    setTargetEventOperations(target || props.target, unbindTargetEvent);
  };
  var setTargetEventOperations = function setTargetEventOperations(target, operation) {
    target = ObjectUtils.getRefElement(target);
    if (target) {
      if (DomHandler.isElement(target)) {
        operation(target);
      } else {
        var setEvent = function setEvent(target) {
          var element = DomHandler.find(document, target);
          element.forEach(function (el) {
            operation(el);
          });
        };
        if (target instanceof Array) {
          target.forEach(function (t) {
            setEvent(t);
          });
        } else {
          setEvent(target);
        }
      }
    }
  };
  useMountEffect(function () {
    if (visibleState && currentTargetRef.current && isDisabled(currentTargetRef.current)) {
      hide();
    }
  });
  useUpdateEffect(function () {
    loadTargetEvents();
    return function () {
      unloadTargetEvents();
    };
  }, [show, hide, props.target]);
  useUpdateEffect(function () {
    if (visibleState) {
      var position = getPosition(currentTargetRef.current);
      var classname = getTargetOption(currentTargetRef.current, 'classname');
      setPositionState(position);
      setClassNameState(classname);
      updateTooltipState(position);
      bindWindowResizeListener();
      bindOverlayScrollListener();
    } else {
      setPositionState(props.position || 'right');
      setClassNameState('');
      currentTargetRef.current = null;
      containerSize.current = null;
      allowHide.current = true;
    }
    return function () {
      unbindWindowResizeListener();
      unbindOverlayScrollListener();
    };
  }, [visibleState]);
  useUpdateEffect(function () {
    var position = getPosition(currentTargetRef.current);
    if (visibleState && position !== 'mouse') {
      applyDelay('updateDelay', function () {
        updateText(currentTargetRef.current, function () {
          align(currentTargetRef.current);
        });
      });
    }
  }, [props.content]);
  useUnmountEffect(function () {
    hide();
    ZIndexUtils.clear(elementRef.current);
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      updateTargetEvents: updateTargetEvents,
      loadTargetEvents: loadTargetEvents,
      unloadTargetEvents: unloadTargetEvents,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return elementRef.current;
      },
      getTarget: function getTarget() {
        return currentTargetRef.current;
      }
    };
  });
  var createElement = function createElement() {
    var empty = isTargetContentEmpty(currentTargetRef.current);
    var rootProps = mergeProps({
      id: props.id,
      className: classNames(props.className, cx('root', {
        positionState: positionState,
        classNameState: classNameState
      })),
      style: props.style,
      role: 'tooltip',
      'aria-hidden': visibleState,
      onMouseEnter: function onMouseEnter(e) {
        return _onMouseEnter();
      },
      onMouseLeave: function onMouseLeave(e) {
        return _onMouseLeave(e);
      }
    }, TooltipBase.getOtherProps(props), ptm('root'));
    var arrowProps = mergeProps({
      className: cx('arrow'),
      style: sx('arrow', _objectSpread({}, metaData))
    }, ptm('arrow'));
    var textProps = mergeProps({
      className: cx('text')
    }, ptm('text'));
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: elementRef
    }, rootProps), /*#__PURE__*/React.createElement("div", arrowProps), /*#__PURE__*/React.createElement("div", _extends({
      ref: textRef
    }, textProps), empty && props.children));
  };
  if (visibleState) {
    var element = createElement();
    return /*#__PURE__*/React.createElement(Portal, {
      element: element,
      appendTo: props.appendTo,
      visible: true
    });
  }
  return null;
}));
Tooltip.displayName = 'Tooltip';

export { Tooltip };
