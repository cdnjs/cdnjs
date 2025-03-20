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
const _jsxruntime = require("react/jsx-runtime");
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
    const content = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            mode === 'image' && background && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                "aria-hidden": true,
                className: "vkuiBanner__bg",
                children: background
            }),
            before && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiBanner__before",
                children: before
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiBanner__content",
                children: [
                    (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ (0, _jsxruntime.jsx)(HeaderTypography, {
                        Component: "div",
                        weight: "2",
                        level: size === 'm' ? '2' : '1',
                        children: header
                    }),
                    (0, _vkjs.hasReactNode)(subheader) && /*#__PURE__*/ (0, _jsxruntime.jsx)(SubheaderTypography, {
                        Component: "div",
                        className: "vkuiBanner__subheader",
                        children: subheader
                    }),
                    (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, {
                        Component: "div",
                        className: "vkuiBanner__text",
                        children: text
                    }),
                    (0, _vkjs.hasReactNode)(actions) && _react.Children.count(actions) > 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiBanner__actions",
                        children: actions
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "section"
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiBanner", platform === 'ios' && "vkuiBanner--ios", mode === 'image' && "vkuiBanner--mode-image", size === 'm' && "vkuiBanner--size-m", mode === 'image' && imageTheme === 'dark' && "vkuiBanner--inverted"),
        children: asideMode === 'expand' ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, {
            className: "vkuiBanner__in",
            activeMode: platform === 'ios' ? 'opacity' : 'background',
            onClick: _vkjs.noop,
            children: [
                content,
                /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiBanner__aside",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon24Chevron, {
                        className: "vkuiBanner__expand"
                    })
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
            className: "vkuiBanner__in",
            children: [
                content,
                asideMode === 'dismiss' && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiBanner__aside",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_IconButton.IconButton, {
                        label: dismissLabel,
                        className: "vkuiBanner__dismiss",
                        onClick: onDismiss,
                        hoverMode: "opacity",
                        hasActive: false,
                        children: platform === 'ios' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(IconDismissIOS, {}) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon24Cancel, {})
                    })
                })
            ]
        })
    }));
};

//# sourceMappingURL=Banner.js.map