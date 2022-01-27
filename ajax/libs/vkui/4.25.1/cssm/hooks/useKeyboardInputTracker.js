import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
import { Keys, pressedKey } from "../lib/accessibility";
import { useDOM } from "../lib/dom";
import { useGlobalEventListener } from "./useGlobalEventListener";
export function useKeyboardInputTracker() {
  var _useDOM = useDOM(),
      document = _useDOM.document;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isKeyboardInputActive = _React$useState2[0],
      toggleKeyboardInput = _React$useState2[1];

  var enableKeyboardInput = React.useCallback(function (e) {
    if (pressedKey(e) === Keys.TAB) {
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
  useGlobalEventListener(document, "keydown", enableKeyboardInput, eventOptions);
  useGlobalEventListener(document, "mousedown", disableKeyboardInput, eventOptions);
  useGlobalEventListener(document, "touchstart", disableKeyboardInput, eventOptions);
  return isKeyboardInputActive;
}
//# sourceMappingURL=useKeyboardInputTracker.js.map