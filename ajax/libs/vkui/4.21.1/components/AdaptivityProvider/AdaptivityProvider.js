import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { hasMouse as _hasMouse } from '@vkontakte/vkjs';
import { AdaptivityContext, SizeType, ViewHeight, ViewWidth } from "./AdaptivityContext";
import { useDOM } from "../../lib/dom";
export var DESKTOP_SIZE = 1280;
export var TABLET_SIZE = 1024;
export var SMALL_TABLET_SIZE = 768;
export var MOBILE_SIZE = 320;
export var MOBILE_LANDSCAPE_HEIGHT = 414;
export var MEDIUM_HEIGHT = 720;
export default function AdaptivityProvider(props) {
  var adaptivityRef = React.useRef(null);

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      updateAdaptivity = _React$useState2[1];

  var _useDOM = useDOM(),
      window = _useDOM.window;

  if (!adaptivityRef.current) {
    adaptivityRef.current = calculateAdaptivity(window ? window.innerWidth : 0, window ? window.innerHeight : 0, props);
  }

  React.useEffect(function () {
    function onResize() {
      var calculated = calculateAdaptivity(window.innerWidth, window.innerHeight, props);
      var _adaptivityRef$curren = adaptivityRef.current,
          viewWidth = _adaptivityRef$curren.viewWidth,
          viewHeight = _adaptivityRef$curren.viewHeight,
          sizeX = _adaptivityRef$curren.sizeX,
          sizeY = _adaptivityRef$curren.sizeY,
          hasMouse = _adaptivityRef$curren.hasMouse;

      if (viewWidth !== calculated.viewWidth || viewHeight !== calculated.viewHeight || sizeX !== calculated.sizeX || sizeY !== calculated.sizeY || hasMouse !== calculated.hasMouse) {
        adaptivityRef.current = calculated;
        updateAdaptivity({});
      }
    }

    onResize();
    window.addEventListener('resize', onResize, false);
    return function () {
      window.removeEventListener('resize', onResize, false);
    };
  }, [props.viewWidth, props.viewHeight, props.sizeX, props.sizeY, props.hasMouse]);
  return createScopedElement(AdaptivityContext.Provider, {
    value: adaptivityRef.current
  }, props.children);
}

function calculateAdaptivity(windowWidth, windowHeight, props) {
  var viewWidth = ViewWidth.SMALL_MOBILE;
  var viewHeight = ViewHeight.SMALL;
  var sizeY = SizeType.REGULAR;
  var sizeX = SizeType.REGULAR;
  var hasMouse = typeof props.hasMouse === 'boolean' ? props.hasMouse : _hasMouse;

  if (windowWidth >= DESKTOP_SIZE) {
    viewWidth = ViewWidth.DESKTOP;
  } else if (windowWidth >= TABLET_SIZE) {
    viewWidth = ViewWidth.TABLET;
  } else if (windowWidth >= SMALL_TABLET_SIZE) {
    viewWidth = ViewWidth.SMALL_TABLET;
  } else if (windowWidth >= MOBILE_SIZE) {
    viewWidth = ViewWidth.MOBILE;
  } else {
    viewWidth = ViewWidth.SMALL_MOBILE;
  }

  if (windowHeight >= MEDIUM_HEIGHT) {
    viewHeight = ViewHeight.MEDIUM;
  } else if (windowHeight > MOBILE_LANDSCAPE_HEIGHT) {
    viewHeight = ViewHeight.SMALL;
  } else {
    viewHeight = ViewHeight.EXTRA_SMALL;
  }

  props.viewWidth && (viewWidth = props.viewWidth);
  props.viewHeight && (viewHeight = props.viewHeight);

  if (viewWidth <= ViewWidth.MOBILE) {
    sizeX = SizeType.COMPACT;
  }

  if (viewWidth >= ViewWidth.SMALL_TABLET && hasMouse || viewHeight <= ViewHeight.EXTRA_SMALL) {
    sizeY = SizeType.COMPACT;
  }

  props.sizeX && (sizeX = props.sizeX);
  props.sizeY && (sizeY = props.sizeY);
  return {
    viewWidth: viewWidth,
    viewHeight: viewHeight,
    sizeX: sizeX,
    sizeY: sizeY,
    hasMouse: hasMouse
  };
}
//# sourceMappingURL=AdaptivityProvider.js.map