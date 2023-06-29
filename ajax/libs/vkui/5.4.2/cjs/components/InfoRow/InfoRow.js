"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InfoRow", {
    enumerable: true,
    get: function() {
        return InfoRow;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _headline = require("../Typography/Headline/Headline");
var _subhead = require("../Typography/Subhead/Subhead");
var _visuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var InfoRow = function(_param) /*#__PURE__*/ {
    var header = _param.header, children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "header",
        "children",
        "className"
    ]);
    return _react.createElement(_headline.Headline, _objectSpreadProps(_objectSpread({}, restProps), {
        Component: "span",
        className: (0, _vkjs.classNames)("vkuiInfoRow", className),
        weight: "3"
    }), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
        Component: "strong",
        className: "vkuiInfoRow__header"
    }, header, /*#__PURE__*/ _react.createElement(_visuallyHidden.VisuallyHidden, null, "\xa0")), children);
};

//# sourceMappingURL=InfoRow.js.map