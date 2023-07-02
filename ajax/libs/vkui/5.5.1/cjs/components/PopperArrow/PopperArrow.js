"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PopperArrow", {
    enumerable: true,
    get: function() {
        return PopperArrow;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _DefaultIcon = require("./DefaultIcon");
var placementClassNames = {
    right: "vkuiPopperArrow--placement-right",
    bottom: "vkuiPopperArrow--placement-bottom",
    left: "vkuiPopperArrow--placement-left"
};
var PopperArrow = function(param) {
    var coords = param.coords, arrowClassName = param.arrowClassName, placement = param.placement, getRootRef = param.getRootRef, _param_Icon = param.Icon, Icon = _param_Icon === void 0 ? _DefaultIcon.DefaultIcon : _param_Icon;
    var _getArrowPositionData = _sliced_to_array._(getArrowPositionData(placement, coords), 2), arrowPlacement = _getArrowPositionData[0], arrowStyles = _getArrowPositionData[1];
    return /*#__PURE__*/ _react.createElement("div", {
        ref: getRootRef,
        style: arrowStyles,
        className: (0, _vkjs.classNames)("vkuiPopperArrow", arrowPlacement && placementClassNames[arrowPlacement])
    }, /*#__PURE__*/ _react.createElement(Icon, {
        className: (0, _vkjs.classNames)("vkuiPopperArrow__in", arrowClassName)
    }));
};
function getArrowPositionData(placement) {
    var coords = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        x: 0,
        y: 0
    };
    if (placement.startsWith("top")) {
        return [
            "bottom",
            {
                top: "100%",
                left: coords.x
            }
        ];
    } else if (placement.startsWith("right")) {
        return [
            "left",
            {
                top: coords.y,
                left: 0
            }
        ];
    } else if (placement.startsWith("bottom")) {
        return [
            undefined,
            {
                bottom: "100%",
                left: coords.x
            }
        ];
    } else {
        return [
            "right",
            {
                top: coords.y,
                right: 0
            }
        ];
    }
}

//# sourceMappingURL=PopperArrow.js.map