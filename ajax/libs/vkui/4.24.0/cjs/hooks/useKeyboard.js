"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreciseKeyboardState = getPreciseKeyboardState;
exports.useKeyboard = useKeyboard;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _dom = require("../lib/dom");

var _useGlobalEventListener = require("./useGlobalEventListener");

/**
 Проверяет, закрыла ли клавиатура часть экрана, 24% подошло к большиству устройств
 Работает на iOS и Android, где софт-клавиатура ресайзит viewport в браузерах
 */
function getPreciseKeyboardState(window) {
  var availHeight = window.screen.availHeight;
  var innerHeight = window.innerHeight;
  var coveredViewportPercentage = Math.round((1 - innerHeight / availHeight) * 100);
  return coveredViewportPercentage > 24;
}

function useKeyboard() {
  var _useDOM = (0, _dom.useDOM)(),
      window = _useDOM.window,
      document = _useDOM.document;

  var _React$useState = React.useState({
    isOpened: false,
    isPrecise: false
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
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

  (0, _useGlobalEventListener.useGlobalEventListener)(document, "focusout", onFocus, eventOptions);
  (0, _useGlobalEventListener.useGlobalEventListener)(document, "focusin", onFocus, eventOptions);
  return keyboardState;
}
//# sourceMappingURL=useKeyboard.js.map