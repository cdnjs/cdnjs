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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _Headline = require("../Typography/Headline/Headline");
const _Title = require("../Typography/Title/Title");
const PlaceholderContainer = (_param)=>{
    var { stretched, noPadding = false } = _param, restProps = _object_without_properties._(_param, [
        "stretched",
        "noPadding"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", !noPadding && "vkuiPlaceholder--withPadding")
    }, restProps));
};
const PlaceholderIcon = (props)=>/*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: "vkuiPlaceholder__icon"
    }, props));
const PlaceholderHeader = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_Title.Title, _object_spread._({
        level: "2",
        weight: "2",
        className: (0, _vkjs.classNames)(className, "vkuiPlaceholder__header")
    }, restProps));
};
const PlaceholderText = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_Headline.Headline, _object_spread._({
        weight: "3",
        className: (0, _vkjs.classNames)(className, "vkuiPlaceholder__text")
    }, restProps));
};
const PlaceholderActions = (props)=>/*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: "vkuiPlaceholder__action"
    }, props));
const Placeholder = (_param)=>{
    var { icon, header, children, action, noPadding = false } = _param, restProps = _object_without_properties._(_param, [
        "icon",
        "header",
        "children",
        "action",
        "noPadding"
    ]);
    return /*#__PURE__*/ _react.createElement(PlaceholderContainer, _object_spread._({
        noPadding: noPadding
    }, restProps), (0, _vkjs.hasReactNode)(icon) && /*#__PURE__*/ _react.createElement(PlaceholderIcon, null, icon), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(PlaceholderHeader, null, header), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement(PlaceholderText, null, children), (0, _vkjs.hasReactNode)(action) && /*#__PURE__*/ _react.createElement(PlaceholderActions, null, action));
};
Placeholder.Container = PlaceholderContainer;
Placeholder.Icon = PlaceholderIcon;
Placeholder.Header = PlaceholderHeader;
Placeholder.Text = PlaceholderText;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map