"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBridgeAdaptivity = useBridgeAdaptivity;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
var initialState = {
  type: '',
  viewportWidth: 0,
  viewportHeight: 0
};
function resolveAdaptivity(e) {
  var _e$detail = e.detail,
    type = _e$detail.type,
    data = _e$detail.data;
  if (type !== 'VKWebAppUpdateConfig' || !data) {
    return null;
  }
  var adaptivity = data.adaptivity,
    viewportWidth = data.viewport_width,
    viewportHeight = data.viewport_height;
  var bridgeAdaptivity = {
    type: '',
    viewportWidth: isFinite(viewportWidth) ? +viewportWidth : 0,
    viewportHeight: isFinite(viewportHeight) ? +viewportHeight : 0
  };
  switch (adaptivity) {
    case 'force_mobile':
    case 'force_mobile_compact':
    case 'adaptive':
      bridgeAdaptivity.type = adaptivity;
  }
  return bridgeAdaptivity;
}
_vkBridge.default.subscribe(function (e) {
  var bridgeAdaptivity = resolveAdaptivity(e);
  if (bridgeAdaptivity) {
    initialState = bridgeAdaptivity;
  }
});
function useBridgeAdaptivity() {
  var _React$useState = React.useState(initialState),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    bridgeAdaptivity = _React$useState2[0],
    setBridgeAdaptivity = _React$useState2[1];
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    function bridgeListener(e) {
      var newBridgeAdaptivity = resolveAdaptivity(e);
      if (newBridgeAdaptivity) {
        setBridgeAdaptivity(newBridgeAdaptivity);
      }
    }
    _vkBridge.default.subscribe(bridgeListener);
    return function () {
      _vkBridge.default.unsubscribe(bridgeListener);
    };
  }, []);
  return bridgeAdaptivity;
}
//# sourceMappingURL=useBridgeAdaptivity.js.map