import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
import vkBridge from '@vkontakte/vk-bridge';
import { useDOM } from '../lib/dom';
import { noop } from '@vkontakte/vkjs';
import { resolveAppearance } from '../helpers/appearance';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../lib/matchMedia';
var initialAppearance = null;
vkBridge.send('VKWebAppGetConfig').then(function (data) {
  initialAppearance = resolveAppearance(data);
}).catch(console.error);
function autoDetectAppearanceByBridge(setAppearance, onDetectAppearanceByBridge) {
  function bridgeListener(e) {
    var _e$detail = e.detail,
      type = _e$detail.type,
      data = _e$detail.data;
    if (type !== 'VKWebAppUpdateConfig') {
      return;
    }
    initialAppearance = resolveAppearance(data);
    if (initialAppearance) {
      onDetectAppearanceByBridge();
      setAppearance(initialAppearance);
    }
  }
  vkBridge.subscribe(bridgeListener);
  return function () {
    return vkBridge.unsubscribe(bridgeListener);
  };
}
function autoDetectAppearance(window, setAppearance) {
  var mediaQuery = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (mediaQuery === undefined) {
    return noop;
  }
  var check = function check(event) {
    // eslint-disable-next-line no-restricted-properties
    setAppearance(event.matches ? 'dark' : 'light');
  };
  check(mediaQuery);
  matchMediaListAddListener(mediaQuery, check);
  return function () {
    return matchMediaListRemoveListener(mediaQuery, check);
  };
}
export var useAutoDetectAppearance = function useAutoDetectAppearance(appearanceProp, onDetectAppearanceByBridge) {
  var _useDOM = useDOM(),
    window = _useDOM.window;
  var onceDetectAppearanceByBridge = React.useRef(function () {
    onDetectAppearanceByBridge && onDetectAppearanceByBridge();
    onceDetectAppearanceByBridge.current = noop;
  });
  var _React$useState = React.useState(function () {
      if (appearanceProp) {
        return appearanceProp;
      }
      if (initialAppearance) {
        onceDetectAppearanceByBridge.current();
        return initialAppearance;
      }
      var mediaQuery = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

      // eslint-disable-next-line no-restricted-properties
      return mediaQuery !== null && mediaQuery !== void 0 && mediaQuery.matches ? 'dark' : 'light';
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    appearance = _React$useState2[0],
    setAppearance = _React$useState2[1];
  React.useEffect(function () {
    if (appearanceProp) {
      setAppearance(appearanceProp);
      return noop;
    }
    if (vkBridge.isEmbedded()) {
      return autoDetectAppearanceByBridge(setAppearance, onceDetectAppearanceByBridge.current);
    }
    return autoDetectAppearance(window, setAppearance);
  }, [window, appearanceProp]);
  return appearance;
};
//# sourceMappingURL=useAutoDetectAppearance.js.map