"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageBaseBadge", {
    enumerable: true,
    get: function() {
        return ImageBaseBadge;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _context = require("../context");
var _validators = require("../validators");
var backgroundStyles = {
    stroke: "vkuiImageBaseBadge--background-stroke",
    shadow: "vkuiImageBaseBadge--background-shadow"
};
var ImageBaseBadge = function(_param) {
    var _param_background = _param.background, background = _param_background === void 0 ? "shadow" : _param_background, children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "background",
        "children",
        "className"
    ]);
    if (process.env.NODE_ENV === "development") {
        if (children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            var size = _react.useContext(_context.ImageBaseContext).size;
            (0, _validators.validateBadgeIcon)(size, {
                name: "children",
                value: children
            });
        }
    }
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiImageBaseBadge", backgroundStyles[background], className)
    }), children);
};

//# sourceMappingURL=ImageBaseBadge.js.map