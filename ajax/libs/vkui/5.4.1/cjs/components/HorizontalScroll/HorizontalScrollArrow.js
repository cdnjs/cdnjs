"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HorizontalScrollArrow", {
    enumerable: true,
    get: function() {
        return HorizontalScrollArrow;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _tappable = require("../Tappable/Tappable");
var HorizontalScrollArrow = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "l" : _param_size, offsetY = _param.offsetY, direction = _param.direction, onClick = _param.onClick, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "size",
        "offsetY",
        "direction",
        "onClick",
        "className"
    ]);
    var ArrowIcon;
    if (size === "m") {
        ArrowIcon = direction === "left" ? _icons.Icon16ChevronLeft : _icons.Icon16Chevron;
    } else {
        ArrowIcon = direction === "left" ? _icons.Icon24ChevronCompactLeft : _icons.Icon24Chevron;
    }
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({}, restProps), {
        Component: "button",
        hasHover: false,
        hasActive: false,
        className: (0, _vkjs.classNames)("vkuiHorizontalScrollArrow", {
            m: "vkuiHorizontalScrollArrow--size-m",
            l: "vkuiHorizontalScrollArrow--size-l"
        }[size], {
            left: "vkuiHorizontalScrollArrow--direction-left",
            right: "vkuiHorizontalScrollArrow--direction-right"
        }[direction], className),
        onClick: onClick
    }), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiHorizontalScrollArrow__icon",
        style: offsetY ? {
            top: offsetY
        } : undefined
    }, /*#__PURE__*/ _react.createElement(ArrowIcon, null)));
};

//# sourceMappingURL=HorizontalScrollArrow.js.map