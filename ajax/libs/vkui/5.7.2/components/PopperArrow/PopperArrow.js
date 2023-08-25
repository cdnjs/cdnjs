import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { DefaultIcon } from "./DefaultIcon";
var placementClassNames = {
    right: "vkuiPopperArrow--placement-right",
    bottom: "vkuiPopperArrow--placement-bottom",
    left: "vkuiPopperArrow--placement-left"
};
export var PopperArrow = function(param) {
    var coords = param.coords, arrowClassName = param.arrowClassName, placement = param.placement, getRootRef = param.getRootRef, _param_Icon = param.Icon, Icon = _param_Icon === void 0 ? DefaultIcon : _param_Icon;
    var _getArrowPositionData = _sliced_to_array(getArrowPositionData(placement, coords), 2), arrowPlacement = _getArrowPositionData[0], arrowStyles = _getArrowPositionData[1];
    return /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        style: arrowStyles,
        className: classNames("vkuiPopperArrow", arrowPlacement && placementClassNames[arrowPlacement])
    }, /*#__PURE__*/ React.createElement(Icon, {
        className: classNames("vkuiPopperArrow__in", arrowClassName)
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