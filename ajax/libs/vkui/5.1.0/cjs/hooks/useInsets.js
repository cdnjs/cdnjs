"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInsets = useInsets;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var React = _interopRequireWildcard(require("react"));
var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
var initialState = {
  bottom: null,
  top: null,
  left: null,
  right: null
};
function resolveInsets(e) {
  var _e$detail = e.detail,
    type = _e$detail.type,
    data = _e$detail.data;
  switch (type) {
    case 'VKWebAppUpdateConfig':
    case 'VKWebAppUpdateInsets':
      // Устаревшее событие vk-bridge
      var insets = data.insets;
      if (insets) {
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, insets), {}, {
          bottom: insets.bottom > 150 ? 0 : insets.bottom // если больше 150 – значит открылась клава и она сама работает как инсет, то есть наш нужно занулить
        });
      }
  }

  return null;
}
_vkBridge.default.subscribe(function (e) {
  var insets = resolveInsets(e);
  if (insets) {
    initialState = insets;
  }
});
function useInsets() {
  var _React$useState = React.useState(initialState),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    insets = _React$useState2[0],
    setInsets = _React$useState2[1];
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    function connectListener(e) {
      var insets = resolveInsets(e);
      if (insets) {
        setInsets(insets);
      }
    }
    _vkBridge.default.subscribe(connectListener);
    return function () {
      _vkBridge.default.unsubscribe(connectListener);
    };
  }, []);
  return insets;
}
//# sourceMappingURL=useInsets.js.map