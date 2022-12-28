"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAutoDetectAppearance = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));
var _dom = require("../lib/dom");
var _utils = require("../lib/utils");
var _appearance = require("../helpers/appearance");
var initialAppearance = null;
_vkBridge.default.send("VKWebAppGetConfig").then(function (data) {
  initialAppearance = (0, _appearance.resolveAppearance)(data);
}).catch(console.error);
function autoDetectAppearanceByBridge(setAppearance, onDetectAppearanceByBridge) {
  function bridgeListener(e) {
    var _e$detail = e.detail,
      type = _e$detail.type,
      data = _e$detail.data;
    if (type !== "VKWebAppUpdateConfig") {
      return;
    }
    initialAppearance = (0, _appearance.resolveAppearance)(data);
    if (initialAppearance) {
      onDetectAppearanceByBridge();
      setAppearance(initialAppearance);
    }
  }
  _vkBridge.default.subscribe(bridgeListener);
  return function () {
    return _vkBridge.default.unsubscribe(bridgeListener);
  };
}
function autoDetectAppearance(window, setAppearance) {
  var mediaQuery = window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  if (mediaQuery === undefined) {
    return _utils.noop;
  }
  var check = function check(event) {
    // eslint-disable-next-line no-restricted-properties
    setAppearance(event.matches ? "dark" : "light");
  };
  check(mediaQuery);
  mediaQuery.addEventListener("change", check);
  return function () {
    return mediaQuery.removeEventListener("change", check);
  };
}
var useAutoDetectAppearance = function useAutoDetectAppearance(appearanceProp, onDetectAppearanceByBridge) {
  var _useDOM = (0, _dom.useDOM)(),
    window = _useDOM.window;
  var onceDetectAppearanceByBridge = React.useRef(function () {
    onDetectAppearanceByBridge && onDetectAppearanceByBridge();
    onceDetectAppearanceByBridge.current = _utils.noop;
  });
  var _React$useState = React.useState(function () {
      if (appearanceProp) {
        return appearanceProp;
      }
      if (initialAppearance) {
        onceDetectAppearanceByBridge.current();
        return initialAppearance;
      }
      var mediaQuery = window && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

      // eslint-disable-next-line no-restricted-properties
      return mediaQuery !== null && mediaQuery !== void 0 && mediaQuery.matches ? "dark" : "light";
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    appearance = _React$useState2[0],
    setAppearance = _React$useState2[1];
  React.useEffect(function () {
    if (appearanceProp) {
      setAppearance(appearanceProp);
      return _utils.noop;
    }
    if (_vkBridge.default.isEmbedded()) {
      return autoDetectAppearanceByBridge(setAppearance, onceDetectAppearanceByBridge.current);
    }
    return autoDetectAppearance(window, setAppearance);
  }, [window, appearanceProp]);
  return appearance;
};
exports.useAutoDetectAppearance = useAutoDetectAppearance;
//# sourceMappingURL=useAutoDetectAppearance.js.map