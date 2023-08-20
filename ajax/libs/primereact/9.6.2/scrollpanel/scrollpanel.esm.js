import * as React from 'react';
import { useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { mergeProps, classNames, DomHandler } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

var ScrollPanelBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'ScrollPanel',
    id: null,
    style: null,
    className: null,
    children: undefined
  }
});

var ScrollPanel = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = ScrollPanelBase.getProps(inProps, context);
  var _ScrollPanelBase$setM = ScrollPanelBase.setMetaData({
      props: props
    }),
    ptm = _ScrollPanelBase$setM.ptm;
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
        containerRef.current.style.height = contentRef.current.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
      }
    }
  };
  var moveBar = function moveBar() {
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
    className: classNames('p-scrollpanel p-component', props.className)
  }, ScrollPanelBase.getOtherProps(props), ptm('root'));
  var wrapperProps = mergeProps({
    className: 'p-scrollpanel-wrapper'
  }, ptm('wrapper'));
  var contentProps = mergeProps({
    className: 'p-scrollpanel-content',
    ref: contentRef,
    onScroll: moveBar,
    onMouseEnter: moveBar
  }, ptm('content'));
  var barXProps = mergeProps({
    ref: xBarRef,
    className: 'p-scrollpanel-bar p-scrollpanel-bar-x',
    onMouseDown: onXBarMouseDown
  }, ptm('barx'));
  var barYProps = mergeProps({
    ref: yBarRef,
    className: 'p-scrollpanel-bar p-scrollpanel-bar-y',
    onMouseDown: onYBarMouseDown
  }, ptm('bary'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", wrapperProps, /*#__PURE__*/React.createElement("div", contentProps, props.children)), /*#__PURE__*/React.createElement("div", barXProps), /*#__PURE__*/React.createElement("div", barYProps));
});
ScrollPanel.displayName = 'ScrollPanel';

export { ScrollPanel };
