import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onStart", "onStartX", "onStartY", "onMove", "onMoveX", "onMoveY", "onLeave", "onEnter", "onEnd", "onEndX", "onEndY", "onClickCapture", "usePointerHover", "slideThreshold", "useCapture", "Component", "getRootRef", "noSlideClick", "stopPropagation"];
import * as React from 'react';
import { getSupportedEvents, coordX, coordY, touchEnabled } from '../../lib/touch';
import { useDOM } from '../../lib/dom';
import { useExternRef } from '../../hooks/useExternRef';
import { useEventListener } from '../../hooks/useEventListener';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
/**
 * @see https://vkcom.github.io/VKUI/#/Touch
 */
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
  var gesture = React.useRef(null);
  var handle = function handle(e, handlers) {
    stopPropagation && e.stopPropagation();
    handlers.forEach(function (cb) {
      var _gesture$current$star, _gesture$current, _gesture$current$star2;
      var duration = Date.now() - ((_gesture$current$star = (_gesture$current = gesture.current) === null || _gesture$current === void 0 ? void 0 : (_gesture$current$star2 = _gesture$current.startT) === null || _gesture$current$star2 === void 0 ? void 0 : _gesture$current$star2.getTime()) !== null && _gesture$current$star !== void 0 ? _gesture$current$star : 0);
      cb && cb(_objectSpread(_objectSpread({}, gesture.current), {}, {
        duration: duration,
        originalEvent: e
      }));
    });
  };
  var enterHandler = useEventListener(usePointerHover ? 'pointerenter' : 'mouseenter', onEnter);
  var leaveHandler = useEventListener(usePointerHover ? 'pointerleave' : 'mouseleave', onLeave);
  var startHandler = useEventListener(events[0], function (e) {
    gesture.current = initGesture(coordX(e), coordY(e));
    handle(e, [onStart, onStartX, onStartY]);
    // 1 line, 2 bad specs, 2 workarounds:
    subscribe(touchEnabled() ?
    // Touch events fire on initial target, and won't bubble if its removed
    // see: #235, #1968, https://stackoverflow.com/a/45760014
    e.target :
    // Mouse events fire on the element under pointer, so we lose move / end
    // if pointer goes outside container.
    // Can be fixed by PointerEvents' setPointerCapture later
    document);
  }, {
    capture: useCapture,
    passive: false
  });
  var containerRef = useExternRef(getRootRef);
  useIsomorphicLayoutEffect(function () {
    var el = containerRef.current;
    if (el) {
      enterHandler.add(el);
      leaveHandler.add(el);
      startHandler.add(el);
    }
  }, [Component]);
  function onMove(e) {
    var _gesture$current2;
    var _ref2 = (_gesture$current2 = gesture.current) !== null && _gesture$current2 !== void 0 ? _gesture$current2 : {},
      isPressed = _ref2.isPressed,
      isX = _ref2.isX,
      isY = _ref2.isY,
      _ref2$startX = _ref2.startX,
      startX = _ref2$startX === void 0 ? 0 : _ref2$startX,
      _ref2$startY = _ref2.startY,
      startY = _ref2$startY === void 0 ? 0 : _ref2$startY;
    if (isPressed) {
      var _gesture$current3;
      // смещения
      var shiftX = coordX(e) - startX;
      var shiftY = coordY(e) - startY;

      // абсолютные значения смещений
      var shiftXAbs = Math.abs(shiftX);
      var shiftYAbs = Math.abs(shiftY);

      // Если определяем мультитач, то прерываем жест
      if (!!e.touches && e.touches.length > 1) {
        return onEnd(e);
      }

      // если мы ещё не определились
      if (!isX && !isY) {
        var willBeX = shiftXAbs >= slideThreshold && shiftXAbs > shiftYAbs;
        var willBeY = shiftYAbs >= slideThreshold && shiftYAbs > shiftXAbs;
        var willBeSlidedX = willBeX && (!!onMoveX || !!_onMove);
        var willBeSlidedY = willBeY && (!!onMoveY || !!_onMove);
        if (gesture.current) {
          Object.assign(gesture.current, {
            isY: willBeY,
            isX: willBeX,
            isSlideX: willBeSlidedX,
            isSlideY: willBeSlidedY,
            isSlide: willBeSlidedX || willBeSlidedY
          });
        }
      }
      if ((_gesture$current3 = gesture.current) !== null && _gesture$current3 !== void 0 && _gesture$current3.isSlide) {
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
    var _gesture$current4;
    var _ref3 = (_gesture$current4 = gesture.current) !== null && _gesture$current4 !== void 0 ? _gesture$current4 : {},
      isPressed = _ref3.isPressed,
      isSlide = _ref3.isSlide,
      isSlideX = _ref3.isSlideX,
      isSlideY = _ref3.isSlideY;
    if (isPressed) {
      handle(e, [_onEnd, isSlideY && onEndY, isSlideX && onEndX]);
    }
    didSlide.current = Boolean(isSlide);
    gesture.current = {};

    // Если это был тач-евент, симулируем отмену hover
    if (touchEnabled()) {
      onLeave && onLeave(e);
    }
    unsubscribe();
  }
  var listenerParams = {
    capture: useCapture,
    passive: false
  };
  var listeners = [useEventListener(events[1], onMove, listenerParams), useEventListener(events[2], onEnd, listenerParams), useEventListener(events[3], onEnd, listenerParams)];
  function subscribe(el) {
    if (el) {
      listeners.forEach(function (l) {
        return l.add(el);
      });
    }
  }
  function unsubscribe() {
    listeners.forEach(function (l) {
      return l.remove();
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
    // eslint-disable-next-line no-restricted-properties
    if (e.target.closest('a')) {
      e.preventDefault();
    }
    if (noSlideClick) {
      e.stopPropagation();
    } else {
      onClickCapture && onClickCapture(e);
    }
    didSlide.current = false;
  };
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    onDragStart: onDragStart,
    onClickCapture: postGestureClick,
    ref: containerRef
  }));
};
function initGesture(startX, startY) {
  return {
    startX: startX,
    startY: startY,
    startT: new Date(),
    duration: 0,
    isPressed: true,
    isY: false,
    isX: false,
    isSlideX: false,
    isSlideY: false,
    isSlide: false,
    shiftX: 0,
    shiftY: 0,
    shiftXAbs: 0,
    shiftYAbs: 0
  };
}
//# sourceMappingURL=Touch.js.map