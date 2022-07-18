import * as React from 'react';
import { useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils, classNames, DomHandler } from 'primereact/utils';

function _extends() {
  _extends = Object.assign || function (target) {
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ScrollPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var containerRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var xBarRef = React.useRef(null);
  var yBarRef = React.useRef(null);
  var isXBarClicked = React.useRef(false);
  var isYBarClicked = React.useRef(false);
  var lastPageX = React.useRef(null);
  var lastPageY = React.useRef(null);
  var scrollXRatio = React.useRef(null);
  var scrollYRatio = React.useRef(null);
  var frame = React.useRef(null);
  var initialized = React.useRef(false);

  var calculateContainerHeight = function calculateContainerHeight() {
    var containerStyles = getComputedStyle(containerRef.current);
    var xBarStyles = getComputedStyle(xBarRef.current);
    var pureContainerHeight = DomHandler.getHeight(containerRef.current) - parseInt(xBarStyles['height'], 10);

    if (containerStyles['max-height'] !== 'none' && pureContainerHeight === 0) {
      if (contentRef.current.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
        containerRef.current.style.height = containerStyles['max-height'];
      } else {
        containerRef.current.style.height = contentRef.current.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
      }
    }
  };

  var moveBar = function moveBar() {
    // horizontal scroll
    var totalWidth = contentRef.current.scrollWidth;
    var ownWidth = contentRef.current.clientWidth;
    var bottom = (containerRef.current.clientHeight - xBarRef.current.clientHeight) * -1;
    scrollXRatio.current = ownWidth / totalWidth; // vertical scroll

    var totalHeight = contentRef.current.scrollHeight;
    var ownHeight = contentRef.current.clientHeight;
    var right = (containerRef.current.clientWidth - yBarRef.current.clientWidth) * -1;
    scrollYRatio.current = ownHeight / totalHeight;
    frame.current = window.requestAnimationFrame(function () {
      if (scrollXRatio.current >= 1) {
        DomHandler.addClass(xBarRef.current, 'p-scrollpanel-hidden');
      } else {
        DomHandler.removeClass(xBarRef.current, 'p-scrollpanel-hidden');
        xBarRef.current.style.cssText = 'width:' + Math.max(scrollXRatio.current * 100, 10) + '%; left:' + contentRef.current.scrollLeft / totalWidth * 100 + '%;bottom:' + bottom + 'px;';
      }

      if (scrollYRatio.current >= 1) {
        DomHandler.addClass(yBarRef.current, 'p-scrollpanel-hidden');
      } else {
        DomHandler.removeClass(yBarRef.current, 'p-scrollpanel-hidden');
        yBarRef.current.style.cssText = 'height:' + Math.max(scrollYRatio.current * 100, 10) + '%; top: calc(' + contentRef.current.scrollTop / totalHeight * 100 + '% - ' + xBarRef.current.clientHeight + 'px);right:' + right + 'px;';
      }
    });
  };

  var onYBarMouseDown = function onYBarMouseDown(event) {
    isYBarClicked.current = true;
    lastPageY.current = event.pageY;
    DomHandler.addClass(yBarRef.current, 'p-scrollpanel-grabbed');
    DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
    event.preventDefault();
  };

  var onXBarMouseDown = function onXBarMouseDown(event) {
    isXBarClicked.current = true;
    lastPageX.current = event.pageX;
    DomHandler.addClass(xBarRef.current, 'p-scrollpanel-grabbed');
    DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
    event.preventDefault();
  };

  var onDocumentMouseMove = function onDocumentMouseMove(event) {
    if (isXBarClicked) {
      onMouseMoveForXBar(event);
    } else if (isYBarClicked) {
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
    lastPageY.current = e.pageY;
    frame.current = window.requestAnimationFrame(function () {
      contentRef.current.scrollTop += deltaY / scrollYRatio.current;
    });
  };

  var onDocumentMouseUp = function onDocumentMouseUp(event) {
    DomHandler.removeClass(yBarRef.current, 'p-scrollpanel-grabbed');
    DomHandler.removeClass(xBarRef.current, 'p-scrollpanel-grabbed');
    DomHandler.removeClass(document.body, 'p-scrollpanel-grabbed');
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
    isXBarClicked.current = false;
    isYBarClicked.current = false;
  };

  var refresh = function refresh() {
    moveBar();
  };

  useMountEffect(function () {
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
    return _objectSpread({
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
    }, props);
  });
  var otherProps = ObjectUtils.findDiffKeys(props, ScrollPanel.defaultProps);
  var className = classNames('p-scrollpanel p-component', props.className);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: containerRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), /*#__PURE__*/React.createElement("div", {
    className: "p-scrollpanel-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    ref: contentRef,
    className: "p-scrollpanel-content",
    onScroll: moveBar,
    onMouseEnter: moveBar
  }, props.children)), /*#__PURE__*/React.createElement("div", {
    ref: xBarRef,
    className: "p-scrollpanel-bar p-scrollpanel-bar-x",
    onMouseDown: onXBarMouseDown
  }), /*#__PURE__*/React.createElement("div", {
    ref: yBarRef,
    className: "p-scrollpanel-bar p-scrollpanel-bar-y",
    onMouseDown: onYBarMouseDown
  }));
});
ScrollPanel.displayName = 'ScrollPanel';
ScrollPanel.defaultProps = {
  __TYPE: 'ScrollPanel',
  id: null,
  style: null,
  className: null
};

export { ScrollPanel };
