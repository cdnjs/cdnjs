import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
import { useDOM } from "../lib/dom";
import { useGlobalEventListener } from "./useGlobalEventListener";

/**
 Проверяет, закрыла ли клавиатура часть экрана, 24% подошло к большиству устройств
 Работает на iOS и Android, где софт-клавиатура ресайзит viewport в браузерах
 */
export function getPreciseKeyboardState(window) {
  var innerHeight = window.innerHeight,
      availHeight = window.screen.availHeight;
  var coveredViewportPercentage = Math.round((1 - innerHeight / availHeight) * 100);
  return coveredViewportPercentage > 24;
}
var eventOptions = {
  passive: true,
  capture: false
};
export function useKeyboard() {
  var _document$activeEleme3;

  var _useDOM = useDOM(),
      window = _useDOM.window,
      document = _useDOM.document;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isOpened = _React$useState2[0],
      setIsOpened = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isPrecise = _React$useState4[0],
      setIsPrecise = _React$useState4[1];

  var transitionalTimeout = React.useRef(null);
  var onFocus = React.useCallback(function (event) {
    var _document$activeEleme, _document$activeEleme2;

    if (transitionalTimeout.current) {
      clearTimeout(transitionalTimeout.current);
    }

    var isOpened = (event === true || event.type === "focusin") && ((document === null || document === void 0 ? void 0 : (_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.tagName) === "INPUT" || (document === null || document === void 0 ? void 0 : (_document$activeEleme2 = document.activeElement) === null || _document$activeEleme2 === void 0 ? void 0 : _document$activeEleme2.tagName) === "TEXTAREA");
    setIsOpened(isOpened);
    setIsPrecise(false); // Ожидаем прохождение анимации раскрытия клавиатуры

    transitionalTimeout.current = setTimeout(function () {
      setIsOpened(isOpened);
      setIsPrecise(getPreciseKeyboardState(window));
    }, 300);
  }, [document === null || document === void 0 ? void 0 : (_document$activeEleme3 = document.activeElement) === null || _document$activeEleme3 === void 0 ? void 0 : _document$activeEleme3.tagName, window]);
  /**
   У полей с autoFocus не отлавливаются события focus, для этого вызываем вручную,
   чтобы иметь хоть какое-то понимание происходящего.
   */

  React.useEffect(function () {
    onFocus(true);
  }, [onFocus]);
  useGlobalEventListener(document, "focusout", onFocus, eventOptions);
  useGlobalEventListener(document, "focusin", onFocus, eventOptions);
  return {
    isOpened: isOpened,
    isPrecise: isPrecise
  };
}
//# sourceMappingURL=useKeyboard.js.map