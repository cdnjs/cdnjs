"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FloatingArrow", {
    enumerable: true,
    get: function() {
        return FloatingArrow;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _DefaultIcon = require("./DefaultIcon");
const placementClassNames = {
    right: "vkuiFloatingArrow--placement-right",
    bottom: "vkuiFloatingArrow--placement-bottom",
    left: "vkuiFloatingArrow--placement-left"
};
const FloatingArrow = (_param)=>{
    var { offset, isStaticOffset, coords, iconStyle, iconClassName, placement = 'bottom', getRootRef, Icon = _DefaultIcon.DefaultIcon } = _param, restProps = _object_without_properties._(_param, [
        "offset",
        "isStaticOffset",
        "coords",
        "iconStyle",
        "iconClassName",
        "placement",
        "getRootRef",
        "Icon"
    ]);
    const [arrowPlacement, arrowStyles] = getArrowPositionData(placement, coords, offset, isStaticOffset);
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        ref: getRootRef,
        style: arrowStyles,
        className: (0, _vkjs.classNames)("vkuiFloatingArrow", arrowPlacement && placementClassNames[arrowPlacement])
    }, restProps), /*#__PURE__*/ _react.createElement(Icon, {
        className: (0, _vkjs.classNames)("vkuiFloatingArrow__in", iconClassName),
        style: iconStyle
    }));
};
function getArrowPositionData(placement, coords = {
    x: 0,
    y: 0
}, offset = 0, isStaticOffset = false) {
    const withOffset = (isVerticalPlacement)=>{
        const parsedCoords = {
            x: coords.x || 0,
            y: coords.y || 0
        };
        if (isVerticalPlacement) {
            return isStaticOffset ? offset : parsedCoords.y + offset;
        } else {
            return isStaticOffset ? offset : parsedCoords.x + offset;
        }
    };
    if (placement.startsWith('top')) {
        return [
            'bottom',
            {
                top: '100%',
                left: withOffset(false)
            }
        ];
    } else if (placement.startsWith('right')) {
        return [
            'left',
            {
                top: withOffset(true),
                left: 0
            }
        ];
    } else if (placement.startsWith('bottom')) {
        return [
            undefined,
            {
                bottom: '100%',
                left: withOffset(false)
            }
        ];
    } else {
        return [
            'right',
            {
                top: withOffset(true),
                right: 0
            }
        ];
    }
}

//# sourceMappingURL=FloatingArrow.js.map