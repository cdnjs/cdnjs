"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Placeholder", {
    enumerable: true,
    get: function() {
        return Placeholder;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _headline = require("../Typography/Headline/Headline");
var _title = require("../Typography/Title/Title");
var Placeholder = function(_param) /*#__PURE__*/ {
    var icon = _param.icon, header = _param.header, action = _param.action, children = _param.children, stretched = _param.stretched, getRootRef = _param.getRootRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "icon",
        "header",
        "action",
        "children",
        "stretched",
        "getRootRef",
        "className"
    ]);
    return _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", className)
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPlaceholder__in"
    }, (0, _vkjs.hasReactNode)(icon) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPlaceholder__icon"
    }, icon), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_title.Title, {
        level: "2",
        weight: "2",
        className: "vkuiPlaceholder__header"
    }, header), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement(_headline.Headline, {
        weight: "3",
        className: "vkuiPlaceholder__text"
    }, children), (0, _vkjs.hasReactNode)(action) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPlaceholder__action"
    }, action)));
};

//# sourceMappingURL=Placeholder.js.map