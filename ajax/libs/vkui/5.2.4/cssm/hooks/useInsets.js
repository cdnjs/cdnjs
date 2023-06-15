import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import * as React from 'react';
import vkBridge from '@vkontakte/vk-bridge';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
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
        return _objectSpread(_objectSpread({}, insets), {}, {
          bottom: insets.bottom > 150 ? 0 : insets.bottom // если больше 150 – значит открылась клава и она сама работает как инсет, то есть наш нужно занулить
        });
      }
  }

  return null;
}
vkBridge.subscribe(function (e) {
  var insets = resolveInsets(e);
  if (insets) {
    initialState = insets;
  }
});
export function useInsets() {
  var _React$useState = React.useState(initialState),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    insets = _React$useState2[0],
    setInsets = _React$useState2[1];
  useIsomorphicLayoutEffect(function () {
    function connectListener(e) {
      var insets = resolveInsets(e);
      if (insets) {
        setInsets(insets);
      }
    }
    vkBridge.subscribe(connectListener);
    return function () {
      vkBridge.unsubscribe(connectListener);
    };
  }, []);
  return insets;
}
//# sourceMappingURL=useInsets.js.map