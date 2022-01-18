import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onStart", "onStartX", "onStartY", "onMove", "onMoveX", "onMoveY", "onLeave", "onEnter", "onEnd", "onEndX", "onEndY", "onClickCapture", "usePointerHover", "slideThreshold", "useCapture", "Component", "getRootRef", "noSlideClick", "stopPropagation"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { getSupportedEvents, coordX, coordY, touchEnabled } from "../../lib/touch";
import { useDOM } from "../../lib/dom";
import { useExternRef } from "../../hooks/useExternRef";
import { useEventListener } from "../../hooks/useEventListener";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
export var Touch = function Touch(_ref) {
  var onStart = _ref.onStart,
      onStartX = _ref.onStartX,
      onStartY = _ref.onStartY,
      _onMove = _ref.onMove,
      onMoveX = _ref.onMoveX,
      onMoveY = _ref.onMoveY,
      onLeave = _ref.onLeave,
      onEnter = _ref.onEnter,
      _onEnd = _ref.onEnd,
      onEndX = _ref.onEndX,
      onEndY = _ref.onEndY,
      onClickCapture = _ref.onClickCapture,
      usePointerHover = _ref.usePointerHover,
      _ref$slideThreshold = _ref.slideThreshold,
      slideThreshold = _ref$slideThreshold === void 0 ? 5 : _ref$slideThreshold,
      _ref$useCapture = _ref.useCapture,
      useCapture = _ref$useCapture === void 0 ? false : _ref$useCapture,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'div' : _ref$Component,
      getRootRef = _ref.getRootRef,
      _ref$noSlideClick = _ref.noSlideClick,
      noSlideClick = _ref$noSlideClick === void 0 ? false : _ref$noSlideClick,
      _ref$stopPropagation = _ref.stopPropagation,
      stopPropagation = _ref$stopPropagation === void 0 ? false : _ref$stopPropagation,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var events = React.useMemo(getSupportedEvents, []);
  var didSlide = React.useRef(false);
  var gesture = React.useRef({});

  var handle = function handle(e, handers) {
    stopPropagation && e.stopPropagation();
    handers.forEach(function (cb) {
      var duration = Date.now() - gesture.current.startT.getTime();
      cb && cb(_objectSpread(_objectSpread({}, gesture.current), {}, {
        duration: duration,
        originalEvent: e
      }));
    });
  };

  var enterHandler = useEventListener(usePointerHover ? 'pointerenter' : 'mouseenter', onEnter);
  var leaveHandler = useEventListener(usePointerHover ? 'pointerleave' : 'mouseleave', onLeave);
  var startHandler = useEventListener(events[0], function (e) {
    gesture.current = {
      startX: coordX(e),
      startY: coordY(e),
      startT: new Date(),
      isPressed: true
    };
    handle(e, [onStart, onStartX, onStartY]);
    !touchEnabled() && subscribe(document);
  }, {
    capture: useCapture,
    passive: false
  });
  var containerRef = useExternRef(getRootRef);
  useIsomorphicLayoutEffect(function () {
    var el = containerRef.current;
    enterHandler.add(el);
    leaveHandler.add(el);
    startHandler.add(el);
    touchEnabled() && subscribe(el);
  }, [Component]);

  function onMove(e) {
    var _gesture$current = gesture.current,
        isPressed = _gesture$current.isPressed,
        isX = _gesture$current.isX,
        isY = _gesture$current.isY,
        startX = _gesture$current.startX,
        startY = _gesture$current.startY;

    if (isPressed) {
      // смещения
      var shiftX = coordX(e) - startX;
      var shiftY = coordY(e) - startY; // абсолютные значения смещений

      var shiftXAbs = Math.abs(shiftX);
      var shiftYAbs = Math.abs(shiftY); // Если определяем мультитач, то прерываем жест

      if (!!e.touches && e.touches.length > 1) {
        return onEnd(e);
      } // если мы ещё не определились


      if (!isX && !isY) {
        var willBeX = shiftXAbs >= slideThreshold && shiftXAbs > shiftYAbs;
        var willBeY = shiftYAbs >= slideThreshold && shiftYAbs > shiftXAbs;
        var willBeSlidedX = willBeX && (!!onMoveX || !!_onMove);
        var willBeSlidedY = willBeY && (!!onMoveY || !!_onMove);
        Object.assign(gesture.current, {
          isY: willBeY,
          isX: willBeX,
          isSlideX: willBeSlidedX,
          isSlideY: willBeSlidedY,
          isSlide: willBeSlidedX || willBeSlidedY
        });
      }

      if (gesture.current.isSlide) {
        Object.assign(gesture.current, {
          shiftX: shiftX,
          shiftY: shiftY,
          shiftXAbs: shiftXAbs,
          shiftYAbs: shiftYAbs
        });
        handle(e, [_onMove, gesture.current.isSlideX && onMoveX, gesture.current.isSlideY && onMoveY]);
      }
    }
  }

  function onEnd(e) {
    var _gesture$current2 = gesture.current,
        isPressed = _gesture$current2.isPressed,
        isSlide = _gesture$current2.isSlide,
        isSlideX = _gesture$current2.isSlideX,
        isSlideY = _gesture$current2.isSlideY;

    if (isPressed) {
      handle(e, [_onEnd, isSlideY && onEndY, isSlideX && onEndX]);
    }

    didSlide.current = isSlide;
    gesture.current = {}; // Если это был тач-евент, симулируем отмену hover

    if (e.type === 'touchend' || e.type === 'touchcancel') {
      onLeave && onLeave(e);
    }

    !touchEnabled() && subscribe(null);
  }

  var listenerParams = {
    capture: useCapture,
    passive: false
  };
  var listeners = [useEventListener(events[1], onMove, listenerParams), useEventListener(events[2], onEnd, listenerParams), useEventListener(events[3], onEnd, listenerParams)];

  function subscribe(el) {
    listeners.forEach(function (l) {
      return l.add(el);
    });
  }
  /**
   * Обработчик событий dragstart
   * Отменяет нативное браузерное поведение для вложенных ссылок и изображений
   */


  var onDragStart = function onDragStart(e) {
    var target = e.target;

    if (target.tagName === 'A' || target.tagName === 'IMG') {
      e.preventDefault();
    }
  };
  /**
   * Обработчик клика по компоненту
   * Отменяет переход по вложенной ссылке, если был зафиксирован свайп
   */


  var postGestureClick = function postGestureClick(e) {
    if (!didSlide.current) {
      return onClickCapture && onClickCapture(e);
    }

    if (e.target.tagName === 'A') {
      e.preventDefault();
    }

    if (noSlideClick) {
      e.stopPropagation();
    } else {
      onClickCapture && onClickCapture(e);
    }

    didSlide.current = false;
  };

  return createScopedElement(Component, _extends({}, restProps, {
    onDragStart: onDragStart,
    onClickCapture: postGestureClick,
    ref: containerRef
  }));
};
//# sourceMappingURL=Touch.js.map