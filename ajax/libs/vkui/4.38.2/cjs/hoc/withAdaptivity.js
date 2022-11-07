"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SizeType", {
  enumerable: true,
  get: function get() {
    return _AdaptivityContext.SizeType;
  }
});
Object.defineProperty(exports, "ViewHeight", {
  enumerable: true,
  get: function get() {
    return _AdaptivityContext.ViewHeight;
  }
});
Object.defineProperty(exports, "ViewWidth", {
  enumerable: true,
  get: function get() {
    return _AdaptivityContext.ViewWidth;
  }
});
exports.withAdaptivity = withAdaptivity;

var _jsxRuntime = require("../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");

function withAdaptivity(TargetComponent, config) {
  var AdaptivityConsumer = function AdaptivityConsumer(props) {
    var context = React.useContext(_AdaptivityContext.AdaptivityContext);
    var update = false;

    if (props.sizeX || props.sizeY) {
      update = true;
    }

    var sizeX = props.sizeX || context.sizeX;
    var sizeY = props.sizeY || context.sizeY;
    var viewWidth = context.viewWidth;
    var viewHeight = context.viewHeight;
    var hasMouse = context.hasMouse;
    var deviceHasHover = context.deviceHasHover;
    var adaptivityProps = {};
    config.sizeX ? adaptivityProps.sizeX = sizeX : undefined;
    config.sizeY ? adaptivityProps.sizeY = sizeY : undefined;
    config.viewWidth ? adaptivityProps.viewWidth = viewWidth : undefined;
    config.viewHeight ? adaptivityProps.viewHeight = viewHeight : undefined;
    config.hasMouse ? adaptivityProps.hasMouse = hasMouse : undefined;
    config.deviceHasHover ? adaptivityProps.deviceHasHover = deviceHasHover : undefined;
    var target = (0, _jsxRuntime.createScopedElement)(TargetComponent, (0, _extends2.default)({}, props, adaptivityProps));

    if (update) {
      return (0, _jsxRuntime.createScopedElement)(_AdaptivityContext.AdaptivityContext.Provider, {
        value: {
          sizeX: sizeX,
          sizeY: sizeY,
          viewWidth: viewWidth,
          viewHeight: viewHeight,
          hasMouse: hasMouse,
          deviceHasHover: deviceHasHover
        }
      }, target);
    }

    return target;
  };

  return AdaptivityConsumer;
}
//# sourceMappingURL=withAdaptivity.js.map