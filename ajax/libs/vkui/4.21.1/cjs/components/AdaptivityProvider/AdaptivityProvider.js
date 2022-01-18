"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AdaptivityProvider;
exports.MEDIUM_HEIGHT = exports.MOBILE_LANDSCAPE_HEIGHT = exports.MOBILE_SIZE = exports.SMALL_TABLET_SIZE = exports.TABLET_SIZE = exports.DESKTOP_SIZE = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _vkjs = require("@vkontakte/vkjs");

var _AdaptivityContext = require("./AdaptivityContext");

var _dom = require("../../lib/dom");

var DESKTOP_SIZE = 1280;
exports.DESKTOP_SIZE = DESKTOP_SIZE;
var TABLET_SIZE = 1024;
exports.TABLET_SIZE = TABLET_SIZE;
var SMALL_TABLET_SIZE = 768;
exports.SMALL_TABLET_SIZE = SMALL_TABLET_SIZE;
var MOBILE_SIZE = 320;
exports.MOBILE_SIZE = MOBILE_SIZE;
var MOBILE_LANDSCAPE_HEIGHT = 414;
exports.MOBILE_LANDSCAPE_HEIGHT = MOBILE_LANDSCAPE_HEIGHT;
var MEDIUM_HEIGHT = 720;
exports.MEDIUM_HEIGHT = MEDIUM_HEIGHT;

function AdaptivityProvider(props) {
  var adaptivityRef = React.useRef(null);

  var _React$useState = React.useState({}),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      updateAdaptivity = _React$useState2[1];

  var _useDOM = (0, _dom.useDOM)(),
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
  return (0, _jsxRuntime.createScopedElement)(_AdaptivityContext.AdaptivityContext.Provider, {
    value: adaptivityRef.current
  }, props.children);
}

function calculateAdaptivity(windowWidth, windowHeight, props) {
  var viewWidth = _AdaptivityContext.ViewWidth.SMALL_MOBILE;
  var viewHeight = _AdaptivityContext.ViewHeight.SMALL;
  var sizeY = _AdaptivityContext.SizeType.REGULAR;
  var sizeX = _AdaptivityContext.SizeType.REGULAR;
  var hasMouse = typeof props.hasMouse === 'boolean' ? props.hasMouse : _vkjs.hasMouse;

  if (windowWidth >= DESKTOP_SIZE) {
    viewWidth = _AdaptivityContext.ViewWidth.DESKTOP;
  } else if (windowWidth >= TABLET_SIZE) {
    viewWidth = _AdaptivityContext.ViewWidth.TABLET;
  } else if (windowWidth >= SMALL_TABLET_SIZE) {
    viewWidth = _AdaptivityContext.ViewWidth.SMALL_TABLET;
  } else if (windowWidth >= MOBILE_SIZE) {
    viewWidth = _AdaptivityContext.ViewWidth.MOBILE;
  } else {
    viewWidth = _AdaptivityContext.ViewWidth.SMALL_MOBILE;
  }

  if (windowHeight >= MEDIUM_HEIGHT) {
    viewHeight = _AdaptivityContext.ViewHeight.MEDIUM;
  } else if (windowHeight > MOBILE_LANDSCAPE_HEIGHT) {
    viewHeight = _AdaptivityContext.ViewHeight.SMALL;
  } else {
    viewHeight = _AdaptivityContext.ViewHeight.EXTRA_SMALL;
  }

  props.viewWidth && (viewWidth = props.viewWidth);
  props.viewHeight && (viewHeight = props.viewHeight);

  if (viewWidth <= _AdaptivityContext.ViewWidth.MOBILE) {
    sizeX = _AdaptivityContext.SizeType.COMPACT;
  }

  if (viewWidth >= _AdaptivityContext.ViewWidth.SMALL_TABLET && hasMouse || viewHeight <= _AdaptivityContext.ViewHeight.EXTRA_SMALL) {
    sizeY = _AdaptivityContext.SizeType.COMPACT;
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