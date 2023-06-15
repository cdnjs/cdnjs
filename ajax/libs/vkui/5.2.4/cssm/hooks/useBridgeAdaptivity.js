import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
import vkBridge from '@vkontakte/vk-bridge';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
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
vkBridge.subscribe(function (e) {
  var bridgeAdaptivity = resolveAdaptivity(e);
  if (bridgeAdaptivity) {
    initialState = bridgeAdaptivity;
  }
});
export function useBridgeAdaptivity() {
  var _React$useState = React.useState(initialState),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    bridgeAdaptivity = _React$useState2[0],
    setBridgeAdaptivity = _React$useState2[1];
  useIsomorphicLayoutEffect(function () {
    function bridgeListener(e) {
      var newBridgeAdaptivity = resolveAdaptivity(e);
      if (newBridgeAdaptivity) {
        setBridgeAdaptivity(newBridgeAdaptivity);
      }
    }
    vkBridge.subscribe(bridgeListener);
    return function () {
      vkBridge.unsubscribe(bridgeListener);
    };
  }, []);
  return bridgeAdaptivity;
}
//# sourceMappingURL=useBridgeAdaptivity.js.map