"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyboardInputTracker = useKeyboardInputTracker;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _accessibility = require("../lib/accessibility");

var _dom = require("../lib/dom");

var _useGlobalEventListener = require("./useGlobalEventListener");

function useKeyboardInputTracker() {
  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isKeyboardInputActive = _React$useState2[0],
      toggleKeyboardInput = _React$useState2[1];

  var enableKeyboardInput = React.useCallback(function (e) {
    if ((0, _accessibility.pressedKey)(e) === _accessibility.Keys.TAB) {
      toggleKeyboardInput(true);
    }
  }, []);
  var disableKeyboardInput = React.useCallback(function () {
    toggleKeyboardInput(false);
  }, []);
  var eventOptions = {
    passive: true,
    capture: true
  };
  (0, _useGlobalEventListener.useGlobalEventListener)(document, "keydown", enableKeyboardInput, eventOptions);
  (0, _useGlobalEventListener.useGlobalEventListener)(document, "mousedown", disableKeyboardInput, eventOptions);
  (0, _useGlobalEventListener.useGlobalEventListener)(document, "touchstart", disableKeyboardInput, eventOptions);
  return isKeyboardInputActive;
}
//# sourceMappingURL=useKeyboardInputTracker.js.map