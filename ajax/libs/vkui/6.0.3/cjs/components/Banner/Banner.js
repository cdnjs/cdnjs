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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _IconButton = require("../IconButton/IconButton");
const _RootComponent = require("../RootComponent/RootComponent");
const _Tappable = require("../Tappable/Tappable");
const _Headline = require("../Typography/Headline/Headline");
const _Subhead = require("../Typography/Subhead/Subhead");
const _Text = require("../Typography/Text/Text");
const _Title = require("../Typography/Title/Title");
const Banner = (_param)=>{
    var { mode = 'tint', imageTheme = 'dark', size = 's', before, asideMode, header, subheader, text, children, background, actions, onDismiss, dismissLabel = 'Скрыть' } = _param, restProps = _object_without_properties._(_param, [
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
        "dismissLabel"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const HeaderTypography = size === 'm' ? _Title.Title : _Headline.Headline;
    const SubheaderTypography = size === 'm' ? _Text.Text : _Subhead.Subhead;
    const IconDismissIOS = mode === 'image' ? _icons.Icon24DismissDark : _icons.Icon24Dismiss;
    const content = /*#__PURE__*/ _react.createElement(_react.Fragment, null, mode === 'image' && background && /*#__PURE__*/ _react.createElement("div", {
        "aria-hidden": true,
        className: "vkuiBanner__bg"
    }, background), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__content"
    }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(HeaderTypography, {
        Component: "div",
        weight: "2",
        level: size === 'm' ? '2' : '1'
    }, header), (0, _vkjs.hasReactNode)(subheader) && /*#__PURE__*/ _react.createElement(SubheaderTypography, {
        Component: "div",
        className: "vkuiBanner__subheader"
    }, subheader), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_Text.Text, {
        Component: "div",
        className: "vkuiBanner__text"
    }, text), (0, _vkjs.hasReactNode)(actions) && _react.Children.count(actions) > 0 && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__actions"
    }, actions)));
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "section"
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiBanner", platform === 'ios' && "vkuiBanner--ios", mode === 'image' && "vkuiBanner--mode-image", size === 'm' && "vkuiBanner--size-m", mode === 'image' && imageTheme === 'dark' && "vkuiBanner--inverted")
    }), asideMode === 'expand' ? /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
        className: "vkuiBanner__in",
        activeMode: platform === 'ios' ? 'opacity' : 'background',
        onClick: _vkjs.noop
    }, content, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ _react.createElement(_icons.Icon24Chevron, {
        className: "vkuiBanner__expand"
    }))) : /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__in"
    }, content, asideMode === 'dismiss' && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        label: dismissLabel,
        className: "vkuiBanner__dismiss",
        onClick: onDismiss,
        hoverMode: "opacity",
        hasActive: false
    }, platform === 'ios' ? /*#__PURE__*/ _react.createElement(IconDismissIOS, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Cancel, null)))));
};

//# sourceMappingURL=Banner.js.map