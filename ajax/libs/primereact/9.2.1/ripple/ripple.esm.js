import * as React from 'react';
import PrimeReact from 'primereact/api';
import { useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { DomHandler } from 'primereact/utils';

var Ripple = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function () {
  var inkRef = React.useRef(null);
  var targetRef = React.useRef(null);
  var getTarget = function getTarget() {
    return inkRef.current && inkRef.current.parentElement;
  };
  var bindEvents = function bindEvents() {
    if (targetRef.current) {
      targetRef.current.addEventListener('mousedown', onMouseDown);
      DomHandler.isTouchDevice() && targetRef.current.addEventListener('touchstart', onTouchStart);
    }
  };
  var unbindEvents = function unbindEvents() {
    if (targetRef.current) {
      targetRef.current.removeEventListener('mousedown', onMouseDown);
      DomHandler.isTouchDevice() && targetRef.current.removeEventListener('touchstart', onTouchStart);
    }
  };
  var onTouchStart = function onTouchStart(event) {
    var offset = DomHandler.getOffset(targetRef.current);
    var offsetX = event.targetTouches[0].pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(inkRef.current) / 2;
    var offsetY = event.targetTouches[0].pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(inkRef.current) / 2;
    activateRipple(offsetX, offsetY);
  };
  var onMouseDown = function onMouseDown(event) {
    if (DomHandler.isTouchDevice()) {
      // already started ripple with onTouchStart
      return;
    }
    var offset = DomHandler.getOffset(targetRef.current);
    var offsetX = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(inkRef.current) / 2;
    var offsetY = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(inkRef.current) / 2;
    activateRipple(offsetX, offsetY);
  };
  var activateRipple = function activateRipple(offsetX, offsetY) {
    if (!inkRef.current || getComputedStyle(inkRef.current, null).display === 'none') {
      return;
    }
    DomHandler.removeClass(inkRef.current, 'p-ink-active');
    if (!DomHandler.getHeight(inkRef.current) && !DomHandler.getWidth(inkRef.current)) {
      var d = Math.max(DomHandler.getOuterWidth(targetRef.current), DomHandler.getOuterHeight(targetRef.current));
      inkRef.current.style.height = d + 'px';
      inkRef.current.style.width = d + 'px';
    }
    inkRef.current.style.top = offsetY + 'px';
    inkRef.current.style.left = offsetX + 'px';
    DomHandler.addClass(inkRef.current, 'p-ink-active');
  };
  var onAnimationEnd = function onAnimationEnd(event) {
    DomHandler.removeClass(event.currentTarget, 'p-ink-active');
  };
  useMountEffect(function () {
    if (inkRef.current) {
      targetRef.current = getTarget();
      bindEvents();
    }
  });
  useUpdateEffect(function () {
    if (inkRef.current && !targetRef.current) {
      targetRef.current = getTarget();
      bindEvents();
    }
  });
  useUnmountEffect(function () {
    if (inkRef.current) {
      targetRef.current = null;
      unbindEvents();
    }
  });
  return PrimeReact.ripple ? /*#__PURE__*/React.createElement("span", {
    role: "presentation",
    ref: inkRef,
    className: "p-ink",
    onAnimationEnd: onAnimationEnd
  }) : null;
}));
Ripple.displayName = 'Ripple';

export { Ripple };
