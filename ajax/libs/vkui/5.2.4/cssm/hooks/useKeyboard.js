import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
import { useDOM } from '../lib/dom';
import { useGlobalEventListener } from './useGlobalEventListener';
/**
 Проверяет, закрыла ли клавиатура часть экрана, 24% подошло к большинству устройств
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
    document = _useDOM.document;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isOpened = _React$useState2[0],
    setIsOpened = _React$useState2[1];
  var onFocus = React.useCallback(function (event) {
    var _document$activeEleme, _document$activeEleme2;
    var isOpened = (event === true || event.type === 'focusin') && ((document === null || document === void 0 ? void 0 : (_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.tagName) === 'INPUT' || (document === null || document === void 0 ? void 0 : (_document$activeEleme2 = document.activeElement) === null || _document$activeEleme2 === void 0 ? void 0 : _document$activeEleme2.tagName) === 'TEXTAREA');
    setIsOpened(isOpened);
  }, [document === null || document === void 0 ? void 0 : (_document$activeEleme3 = document.activeElement) === null || _document$activeEleme3 === void 0 ? void 0 : _document$activeEleme3.tagName]);

  /**
   У полей с autoFocus не отлавливаются события focus, для этого вызываем вручную,
   чтобы иметь хоть какое-то понимание происходящего.
   */
  React.useEffect(function () {
    onFocus(true);
  }, [onFocus]);
  useGlobalEventListener(document, 'focusout', onFocus, eventOptions);
  useGlobalEventListener(document, 'focusin', onFocus, eventOptions);
  return {
    isOpened: isOpened
  };
}
//# sourceMappingURL=useKeyboard.js.map