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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Headline = require("../Typography/Headline/Headline");
var _Title = require("../Typography/Title/Title");
var Placeholder = function(_param) /*#__PURE__*/ {
    var icon = _param.icon, header = _param.header, action = _param.action, children = _param.children, stretched = _param.stretched, getRootRef = _param.getRootRef, className = _param.className, _param_withPadding = _param.withPadding, withPadding = _param_withPadding === void 0 ? true : _param_withPadding, restProps = _object_without_properties._(_param, [
        "icon",
        "header",
        "action",
        "children",
        "stretched",
        "getRootRef",
        "className",
        "withPadding"
    ]);
    return _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", withPadding && "vkuiPlaceholder--withPadding", className)
    }), (0, _vkjs.hasReactNode)(icon) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPlaceholder__icon"
    }, icon), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_Title.Title, {
        level: "2",
        weight: "2",
        className: "vkuiPlaceholder__header"
    }, header), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement(_Headline.Headline, {
        weight: "3",
        className: "vkuiPlaceholder__text"
    }, children), (0, _vkjs.hasReactNode)(action) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPlaceholder__action"
    }, action));
};

//# sourceMappingURL=Placeholder.js.map