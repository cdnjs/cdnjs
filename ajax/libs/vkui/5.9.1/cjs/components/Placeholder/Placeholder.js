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
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var _Headline = require("../Typography/Headline/Headline");
var _Title = require("../Typography/Title/Title");
var PlaceholderContainer = function(_param) /*#__PURE__*/ {
    var stretched = _param.stretched, _param_withPadding = _param.withPadding, withPadding = _param_withPadding === void 0 ? true : _param_withPadding, restProps = _object_without_properties._(_param, [
        "stretched",
        "withPadding"
    ]);
    return _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", withPadding && "vkuiPlaceholder--withPadding")
    }, restProps));
};
var PlaceholderIcon = function(props) {
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: "vkuiPlaceholder__icon"
    }, props));
};
var PlaceholderHeader = function(_param) /*#__PURE__*/ {
    var className = _param.className, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return _react.createElement(_Title.Title, _object_spread._({
        level: "2",
        weight: "2",
        className: (0, _vkjs.classNames)(className, "vkuiPlaceholder__header")
    }, restProps));
};
var PlaceholderText = function(_param) /*#__PURE__*/ {
    var className = _param.className, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return _react.createElement(_Headline.Headline, _object_spread._({
        weight: "3",
        className: (0, _vkjs.classNames)(className, "vkuiPlaceholder__text")
    }, restProps));
};
var PlaceholderActions = function(props) {
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: "vkuiPlaceholder__action"
    }, props));
};
var Placeholder = function(_param) /*#__PURE__*/ {
    var icon = _param.icon, header = _param.header, children = _param.children, action = _param.action, _param_withPadding = _param.withPadding, withPadding = _param_withPadding === void 0 ? true : _param_withPadding, restProps = _object_without_properties._(_param, [
        "icon",
        "header",
        "children",
        "action",
        "withPadding"
    ]);
    return _react.createElement(PlaceholderContainer, _object_spread._({
        withPadding: withPadding
    }, restProps), (0, _vkjs.hasReactNode)(icon) && /*#__PURE__*/ _react.createElement(PlaceholderIcon, null, icon), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(PlaceholderHeader, null, header), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement(PlaceholderText, null, children), (0, _vkjs.hasReactNode)(action) && /*#__PURE__*/ _react.createElement(PlaceholderActions, null, action));
};
Placeholder.Container = PlaceholderContainer;
Placeholder.Icon = PlaceholderIcon;
Placeholder.Header = PlaceholderHeader;
Placeholder.Text = PlaceholderText;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map