"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Link", {
    enumerable: true,
    get: function() {
        return Link;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _tappable = require("../Tappable/Tappable");
var Link = function(_param) {
    var hasVisited = _param.hasVisited, children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "hasVisited",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({
        Component: restProps.href ? "a" : "button"
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiLink", hasVisited && "vkuiLink--has-visited", className),
        hasHover: false,
        activeMode: "opacity",
        focusVisibleMode: "vkuiLink--focus-visible"
    }), children);
};

//# sourceMappingURL=Link.js.map