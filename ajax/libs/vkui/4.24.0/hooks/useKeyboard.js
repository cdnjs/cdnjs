import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
import { useDOM } from "../lib/dom";
import { useGlobalEventListener } from "./useGlobalEventListener";

/**
 Проверяет, закрыла ли клавиатура часть экрана, 24% подошло к большиству устройств
 Работает на iOS и Android, где софт-клавиатура ресайзит viewport в браузерах
 */
export function getPreciseKeyboardState(window) {
  var availHeight = window.screen.availHeight;
  var innerHeight = window.innerHeight;
  var coveredViewportPercentage = Math.round((1 - innerHeight / availHeight) * 100);
  return coveredViewportPercentage > 24;
}
export function useKeyboard() {
  var _useDOM = useDOM(),
      window = _useDOM.window,
      document = _useDOM.document;

  var _React$useState = React.useState({
    isOpened: false,
    isPrecise: false
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      keyboardState = _React$useState2[0],
      setKeyboardState = _React$useState2[1];

  var transitionalTimeout = React.useRef(null);
  var eventOptions = {
    passive: true,
    capture: false
  };
  /**
   У полей с autoFocus не отлавливаются события focus, для этого вызываем вручную,
   чтобы иметь хоть какое-то понимание происходящего.
   */

  React.useEffect(function () {
    onFocus(true);
  }, [onFocus]);

  function onFocus(event) {
    var _document$activeEleme, _document$activeEleme2;

    clearTimeout(transitionalTimeout.current);
    var returnObject = {
      isOpened: (event === true || event.type === "focusin") && (((_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.tagName) === "INPUT" || ((_document$activeEleme2 = document.activeElement) === null || _document$activeEleme2 === void 0 ? void 0 : _document$activeEleme2.tagName) === "TEXTAREA"),
      isPrecise: false
    }; // Ожидаем прохождение анимации раскрытия клавиатуры

    transitionalTimeout.current = setTimeout(function () {
      returnObject.isPrecise = getPreciseKeyboardState(window);
      setKeyboardState(returnObject);
    }, 300);
  }

  useGlobalEventListener(document, "focusout", onFocus, eventOptions);
  useGlobalEventListener(document, "focusin", onFocus, eventOptions);
  return keyboardState;
}
//# sourceMappingURL=useKeyboard.js.map