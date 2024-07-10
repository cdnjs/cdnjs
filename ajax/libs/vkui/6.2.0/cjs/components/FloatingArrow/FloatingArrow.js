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
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
        ref: getRootRef,
        style: arrowStyles,
        className: (0, _vkjs.classNames)("vkuiFloatingArrow", arrowPlacement && placementClassNames[arrowPlacement])
    }, restProps), {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Icon, {
            className: (0, _vkjs.classNames)("vkuiFloatingArrow__in", iconClassName),
            style: iconStyle
        })
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
        const xOffsetProp = getXOffsetProp(placement, isStaticOffset);
        return [
            'bottom',
            {
                top: '100%',
                [xOffsetProp]: withOffset(false)
            }
        ];
    } else if (placement.startsWith('right')) {
        const yOffsetProp = getYOffsetProp(placement, isStaticOffset);
        return [
            'left',
            {
                [yOffsetProp]: withOffset(true),
                left: 0
            }
        ];
    } else if (placement.startsWith('bottom')) {
        const xOffsetProp = getXOffsetProp(placement, isStaticOffset);
        return [
            undefined,
            {
                bottom: '100%',
                [xOffsetProp]: withOffset(false)
            }
        ];
    } else {
        const yOffsetProp = getYOffsetProp(placement, isStaticOffset);
        return [
            'right',
            {
                [yOffsetProp]: withOffset(true),
                right: 0
            }
        ];
    }
}
function getXOffsetProp(placement, isStaticOffset) {
    return placement.endsWith('end') && isStaticOffset ? 'right' : 'left';
}
function getYOffsetProp(placement, isStaticOffset) {
    return placement.endsWith('end') && isStaticOffset ? 'bottom' : 'top';
}

//# sourceMappingURL=FloatingArrow.js.map