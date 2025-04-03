'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { UniqueComponentId, classNames, DomHandler } from 'primereact/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var ScrollPanelBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ScrollPanel',
    id: null,
    style: null,
    className: null,
    children: undefined,
    step: 5
  },
  css: {
    classes: {
      root: 'p-scrollpanel p-component',
      wrapper: 'p-scrollpanel-wrapper',
      content: 'p-scrollpanel-content',
      barx: 'p-scrollpanel-bar p-scrollpanel-bar-x',
      bary: 'p-scrollpanel-bar p-scrollpanel-bar-y'
    },
    styles: "\n        @layer primereact {\n            .p-scrollpanel-wrapper {\n                overflow: hidden;\n                width: 100%;\n                height: 100%;\n                position: relative;\n                z-index: 1;\n                float: left;\n            }\n\n            .p-scrollpanel-content {\n                height: calc(100% + 18px);\n                width: calc(100% + 18px);\n                padding: 0 18px 18px 0;\n                position: relative;\n                overflow: auto;\n                box-sizing: border-box;\n            }\n\n            .p-scrollpanel-bar {\n                position: relative;\n                background: #c1c1c1;\n                border-radius: 3px;\n                z-index: 2;\n                cursor: pointer;\n                opacity: 0;\n                transition: opacity 0.25s linear;\n            }\n\n            .p-scrollpanel-bar-y {\n                width: 9px;\n                top: 0;\n            }\n\n            .p-scrollpanel-bar-x {\n                height: 9px;\n                bottom: 0;\n            }\n\n            .p-scrollpanel-hidden {\n                visibility: hidden;\n            }\n\n            .p-scrollpanel:hover .p-scrollpanel-bar,\n            .p-scrollpanel:active .p-scrollpanel-bar {\n                opacity: 1;\n            }\n\n            .p-scrollpanel-grabbed {\n                user-select: none;\n            }\n        }\n        "
  }
});

var ScrollPanel = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ScrollPanelBase.getProps(inProps, context);
  var _React$useState = React.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React.useState('vertical'),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    orientationState = _React$useState4[0],
    setOrientationState = _React$useState4[1];
  var _ScrollPanelBase$setM = ScrollPanelBase.setMetaData({
      props: props
    }),
    ptm = _ScrollPanelBase$setM.ptm,
    cx = _ScrollPanelBase$setM.cx,
    isUnstyled = _ScrollPanelBase$setM.isUnstyled;
  useHandleStyle(ScrollPanelBase.css.styles, isUnstyled, {
    name: 'scrollpanel'
  });
  var containerRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var xBarRef = React.useRef(null);
  var yBarRef = React.useRef(null);
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    lastScrollLeft = _React$useState6[0],
    setLastScrollLeft = _React$useState6[1];
  var _React$useState7 = React.useState(0),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    lastScrollTop = _React$useState8[0],
    setLastScrollTop = _React$useState8[1];
  var isXBarClicked = React.useRef(false);
  var isYBarClicked = React.useRef(false);
  var lastPageX = React.useRef(null);
  var lastPageY = React.useRef(null);
  var scrollXRatio = React.useRef(null);
  var scrollYRatio = React.useRef(null);
  var frame = React.useRef(null);
  var initialized = React.useRef(false);
  var timer = React.useRef(null);
  var contentId = idState + '_content';
  var calculateContainerHeight = function calculateContainerHeight() {
    var containerStyles = getComputedStyle(containerRef.current);
    var xBarStyles = getComputedStyle(xBarRef.current);
    var pureContainerHeight = DomHandler.getHeight(containerRef.current) - parseInt(xBarStyles.height, 10);
    if (containerStyles['max-height'] !== 'none' && pureContainerHeight === 0) {
      if (contentRef.current.offsetHeight + parseInt(xBarStyles.height, 10) > parseInt(containerStyles['max-height'], 10)) {
        containerRef.current.style.height = containerStyles['max-height'];
      } else {
        containerRef.current.style.height = contentRef.current.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
      }
    }
  };
  var moveBar = function moveBar() {
    if (!contentRef.current) return;
    // horizontal scroll
    var totalWidth = contentRef.current.scrollWidth;
    var ownWidth = contentRef.current.clientWidth;
    var bottom = (containerRef.current.clientHeight - xBarRef.current.clientHeight) * -1;
    scrollXRatio.current = ownWidth / totalWidth;

    // vertical scroll
    var totalHeight = contentRef.current.scrollHeight;
    var ownHeight = contentRef.current.clientHeight;
    var right = (containerRef.current.clientWidth - yBarRef.current.clientWidth) * -1;
    scrollYRatio.current = ownHeight / totalHeight;
    frame.current = window.requestAnimationFrame(function () {
      if (scrollXRatio.current >= 1) {
        DomHandler.addClass(xBarRef.current, 'p-scrollpanel-hidden');
      } else {
        DomHandler.removeClass(xBarRef.current, 'p-scrollpanel-hidden');
        DomHandler.applyStyle(xBarRef.current, {
          width: Math.max(scrollXRatio.current * 100, 10) + '%',
          left: contentRef.current.scrollLeft / totalWidth * 100 + '%',
          bottom: bottom + 'px'
        });
      }
      if (scrollYRatio.current >= 1) {
        DomHandler.addClass(yBarRef.current, 'p-scrollpanel-hidden');
      } else {
        DomHandler.removeClass(yBarRef.current, 'p-scrollpanel-hidden');
        DomHandler.applyStyle(yBarRef.current, {
          height: Math.max(scrollYRatio.current * 100, 10) + '%',
          top: 'calc(' + contentRef.current.scrollTop / totalHeight * 100 + '% - ' + xBarRef.current.clientHeight + 'px)',
          right: right + 'px'
        });
      }
    });
  };
  var onFocus = function onFocus(event) {
    if (xBarRef.current.isSameNode(event.target)) {
      setOrientationState('horizontal');
    } else if (yBarRef.current.isSameNode(event.target)) {
      setOrientationState('vertical');
    }
  };
  var onBlur = function onBlur() {
    if (orientationState === 'horizontal') {
      setOrientationState('vertical');
    }
  };
  var onScroll = function onScroll(event) {
    if (lastScrollLeft !== event.target.scrollLeft) {
      setLastScrollLeft(event.target.scrollLeft);
      setOrientationState('horizontal');
    } else if (lastScrollTop !== event.target.scrollTop) {
      setLastScrollTop(event.target.scrollTop);
      setOrientationState('vertical');
    }
    moveBar();
  };
  var onYBarMouseDown = function onYBarMouseDown(event) {
    isYBarClicked.current = true;
    lastPageY.current = event.pageY;
    DomHandler.addClass(yBarRef.current, 'p-scrollpanel-grabbed');
    DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', _onDocumentMouseUp);
    event.preventDefault();
  };
  var onXBarMouseDown = function onXBarMouseDown(event) {
    isXBarClicked.current = true;
    lastPageX.current = event.pageX;
    DomHandler.addClass(xBarRef.current, 'p-scrollpanel-grabbed');
    DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', _onDocumentMouseUp);
    event.preventDefault();
  };
  var onDocumentMouseMove = function onDocumentMouseMove(event) {
    if (isXBarClicked.current) {
      onMouseMoveForXBar(event);
    } else if (isYBarClicked.current) {
      onMouseMoveForYBar(event);
    } else {
      onMouseMoveForXBar(event);
      onMouseMoveForYBar(event);
    }
  };
  var onMouseMoveForXBar = function onMouseMoveForXBar(event) {
    var deltaX = event.pageX - lastPageX.current;
    lastPageX.current = event.pageX;
    frame.current = window.requestAnimationFrame(function () {
      contentRef.current.scrollLeft += deltaX / scrollXRatio.current;
    });
  };
  var onMouseMoveForYBar = function onMouseMoveForYBar(event) {
    var deltaY = event.pageY - lastPageY.current;
    lastPageY.current = event.pageY;
    frame.current = window.requestAnimationFrame(function () {
      contentRef.current.scrollTop += deltaY / scrollYRatio.current;
    });
  };
  var _onDocumentMouseUp = function onDocumentMouseUp(event) {
    DomHandler.removeClass(yBarRef.current, 'p-scrollpanel-grabbed');
    DomHandler.removeClass(xBarRef.current, 'p-scrollpanel-grabbed');
    DomHandler.removeClass(document.body, 'p-scrollpanel-grabbed');
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', _onDocumentMouseUp);
    isXBarClicked.current = false;
    isYBarClicked.current = false;
  };
  var onKeyDown = function onKeyDown(event) {
    if (orientationState === 'vertical') {
      switch (event.code) {
        case 'ArrowDown':
          {
            setTimer('scrollTop', props.step);
            event.preventDefault();
            break;
          }
        case 'ArrowUp':
          {
            setTimer('scrollTop', props.step * -1);
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
        case 'ArrowRight':
          {
            event.preventDefault();
            break;
          }
      }
    } else if (orientationState === 'horizontal') {
      switch (event.code) {
        case 'ArrowRight':
          {
            setTimer('scrollLeft', props.step);
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            setTimer('scrollLeft', props.step * -1);
            event.preventDefault();
            break;
          }
        case 'ArrowDown':
        case 'ArrowUp':
          {
            event.preventDefault();
            break;
          }
      }
    }
  };
  var onKeyUp = function onKeyUp() {
    clearTimer();
  };
  var repeat = function repeat(bar, step) {
    contentRef.current[bar] += step;
    moveBar();
  };
  var setTimer = function setTimer(bar, step) {
    clearTimer();
    timer.current = setTimeout(function () {
      repeat(bar, step);
    }, 40);
  };
  var clearTimer = function clearTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };
  var refresh = function refresh() {
    moveBar();
  };
  useMountEffect(function () {
    if (!props.id) {
      setIdState(UniqueComponentId());
    }
    moveBar();
    window.addEventListener('resize', moveBar);
    calculateContainerHeight();
    initialized.current = true;
  });
  useUnmountEffect(function () {
    if (initialized.current) {
      window.removeEventListener('resize', moveBar);
    }
    if (frame.current) {
      window.cancelAnimationFrame(frame.current);
    }
  });
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      refresh: refresh,
      getElement: function getElement() {
        return containerRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      },
      getXBar: function getXBar() {
        return xBarRef.current;
      },
      getYBar: function getYBar() {
        return yBarRef.current;
      }
    };
  });
  var rootProps = mergeProps({
    id: props.id,
    ref: containerRef,
    style: props.style,
    className: classNames(props.className, cx('root'))
  }, ScrollPanelBase.getOtherProps(props), ptm('root'));
  var wrapperProps = mergeProps({
    className: cx('wrapper')
  }, ptm('wrapper'));
  var contentProps = mergeProps({
    className: cx('content'),
    onScroll: onScroll,
    onMouseEnter: moveBar
  }, ptm('content'));
  var barXProps = mergeProps({
    ref: xBarRef,
    role: 'scrollbar',
    className: cx('barx'),
    tabIndex: 0,
    'aria-valuenow': lastScrollTop,
    'aria-controls': contentId,
    'aria-orientation': 'horizontal',
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onMouseDown: onXBarMouseDown
  }, ptm('barx'));
  var barYProps = mergeProps({
    ref: yBarRef,
    role: 'scrollbar',
    className: cx('bary'),
    tabIndex: 0,
    'aria-valuenow': lastScrollLeft,
    'aria-controls': contentId,
    'aria-orientation': 'vertical',
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onMouseDown: onYBarMouseDown
  }, ptm('bary'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", wrapperProps, /*#__PURE__*/React.createElement("div", _extends({
    ref: contentRef
  }, contentProps), props.children)), /*#__PURE__*/React.createElement("div", barXProps), /*#__PURE__*/React.createElement("div", barYProps));
});
ScrollPanel.displayName = 'ScrollPanel';

export { ScrollPanel };
