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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _iconButton = require("../IconButton/IconButton");
var _tappable = require("../Tappable/Tappable");
var _headline = require("../Typography/Headline/Headline");
var _subhead = require("../Typography/Subhead/Subhead");
var _text = require("../Typography/Text/Text");
var _title = require("../Typography/Title/Title");
var Banner = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, _param_imageTheme = _param.imageTheme, imageTheme = _param_imageTheme === void 0 ? "dark" : _param_imageTheme, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, before = _param.before, asideMode = _param.asideMode, header = _param.header, subheader = _param.subheader, text = _param.text, children = _param.children, background = _param.background, actions = _param.actions, onDismiss = _param.onDismiss, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Скрыть" : _param_dismissLabel, className = _param.className, getRootRef = _param.getRootRef, restProps = _objectWithoutProperties(_param, [
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
        "className",
        "getRootRef"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var HeaderTypography = size === "m" ? _title.Title : _headline.Headline;
    var SubheaderTypography = size === "m" ? _text.Text : _subhead.Subhead;
    var IconDismissIOS = mode === "image" ? _icons.Icon24DismissDark : _icons.Icon24DismissSubstract;
    var content = /*#__PURE__*/ _react.createElement(_react.Fragment, null, mode === "image" && background && /*#__PURE__*/ _react.createElement("div", {
        "aria-hidden": true,
        className: "vkuiBanner__bg"
    }, background), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__content"
    }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(HeaderTypography, {
        Component: "span",
        className: "vkuiBanner__header",
        weight: "2",
        level: size === "m" ? "2" : "1"
    }, header), (0, _vkjs.hasReactNode)(subheader) && /*#__PURE__*/ _react.createElement(SubheaderTypography, {
        Component: "span",
        className: "vkuiBanner__subheader"
    }, subheader), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_text.Text, {
        className: "vkuiBanner__text"
    }, text), (0, _vkjs.hasReactNode)(actions) && _react.Children.count(actions) > 0 && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__actions"
    }, actions)));
    return /*#__PURE__*/ _react.createElement("section", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiBanner", platform === _platform.Platform.IOS && "vkuiBanner--ios", mode === "image" && "vkuiBanner--mode-image", {
            s: "vkuiBanner--size-s",
            m: "vkuiBanner--size-m"
        }[size], mode === "image" && imageTheme === "dark" && "vkuiBanner--inverted", className),
        ref: getRootRef
    }), asideMode === "expand" ? /*#__PURE__*/ _react.createElement(_tappable.Tappable, {
        className: "vkuiBanner__in",
        activeMode: platform === _platform.Platform.IOS ? "opacity" : "background",
        role: "button"
    }, content, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ _react.createElement(_icons.Icon24Chevron, null))) : /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__in"
    }, content, asideMode === "dismiss" && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ _react.createElement(_iconButton.IconButton, {
        "aria-label": dismissLabel,
        className: "vkuiBanner__dismiss",
        onClick: onDismiss,
        hoverMode: "opacity",
        hasActive: false
    }, platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(IconDismissIOS, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Cancel, null)))));
};

//# sourceMappingURL=Banner.js.map