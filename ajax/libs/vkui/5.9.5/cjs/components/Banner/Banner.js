"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Banner", {
    enumerable: true,
    get: function() {
        return Banner;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _IconButton = require("../IconButton/IconButton");
var _RootComponent = require("../RootComponent/RootComponent");
var _Tappable = require("../Tappable/Tappable");
var _Headline = require("../Typography/Headline/Headline");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Text = require("../Typography/Text/Text");
var _Title = require("../Typography/Title/Title");
var Banner = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, _param_imageTheme = _param.imageTheme, imageTheme = _param_imageTheme === void 0 ? "dark" : _param_imageTheme, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, before = _param.before, asideMode = _param.asideMode, header = _param.header, subheader = _param.subheader, text = _param.text, children = _param.children, background = _param.background, actions = _param.actions, onDismiss = _param.onDismiss, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Скрыть" : _param_dismissLabel, noPadding = _param.noPadding, restProps = _object_without_properties._(_param, [
        "mode",
        "imageTheme",
        "size",
        "before",
        "asideMode",
        "header",
        "subheader",
        "text",
        "children",
        "background",
        "actions",
        "onDismiss",
        "dismissLabel",
        "noPadding"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var HeaderTypography = size === "m" ? _Title.Title : _Headline.Headline;
    var SubheaderTypography = size === "m" ? _Text.Text : _Subhead.Subhead;
    var IconDismissIOS = mode === "image" ? _icons.Icon24DismissDark : _icons.Icon24Dismiss;
    var content = /*#__PURE__*/ _react.createElement(_react.Fragment, null, mode === "image" && background && /*#__PURE__*/ _react.createElement("div", {
        "aria-hidden": true,
        className: "vkuiBanner__bg"
    }, background), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__content"
    }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(HeaderTypography, {
        Component: "p",
        weight: "2",
        level: size === "m" ? "2" : "1"
    }, header), (0, _vkjs.hasReactNode)(subheader) && /*#__PURE__*/ _react.createElement(SubheaderTypography, {
        Component: "p",
        className: "vkuiBanner__subheader"
    }, subheader), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_Text.Text, {
        Component: "p",
        className: "vkuiBanner__text"
    }, text), (0, _vkjs.hasReactNode)(actions) && _react.Children.count(actions) > 0 && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__actions"
    }, actions)));
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "section"
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiBanner", !noPadding && "vkuiBanner--withPadding", platform === _platform.Platform.IOS && "vkuiBanner--ios", mode === "image" && "vkuiBanner--mode-image", size === "m" && "vkuiBanner--size-m", mode === "image" && imageTheme === "dark" && "vkuiBanner--inverted")
    }), asideMode === "expand" ? /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
        className: "vkuiBanner__in",
        activeMode: platform === _platform.Platform.IOS ? "opacity" : "background",
        role: "button"
    }, content, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ _react.createElement(_icons.Icon24Chevron, {
        className: "vkuiBanner__expand"
    }))) : /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__in"
    }, content, asideMode === "dismiss" && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        "aria-label": dismissLabel,
        className: "vkuiBanner__dismiss",
        onClick: onDismiss,
        hoverMode: "opacity",
        hasActive: false
    }, platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(IconDismissIOS, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Cancel, null)))));
};

//# sourceMappingURL=Banner.js.map