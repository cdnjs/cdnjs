"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderButton", {
    enumerable: true,
    get: function() {
        return PanelHeaderButton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _accessibility = require("../../lib/accessibility");
const _warnOnce = require("../../lib/warnOnce");
const _Tappable = require("../Tappable/Tappable");
const _Text = require("../Typography/Text/Text");
const _Title = require("../Typography/Title/Title");
const platformClassNames = {
    ios: "vkuiPanelHeaderButton--ios",
    android: "vkuiPanelHeaderButton--android",
    vkcom: "vkuiPanelHeaderButton--vkcom"
};
const ButtonTypography = ({ primary, children })=>{
    const platform = (0, _usePlatform.usePlatform)();
    if (platform === 'ios') {
        return /*#__PURE__*/ _react.createElement(_Title.Title, {
            Component: "span",
            level: "3",
            weight: primary ? '1' : '3'
        }, children);
    }
    return /*#__PURE__*/ _react.createElement(_Text.Text, {
        weight: platform === 'vkcom' ? undefined : '2'
    }, children);
};
const warn = (0, _warnOnce.warnOnce)('PanelHeaderButton');
const PanelHeaderButton = (_param)=>{
    var { children, primary = false, label, className } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "primary",
        "label",
        "className"
    ]);
    const isPrimitive = (0, _vkjs.isPrimitiveReactNode)(children);
    const isPrimitiveLabel = (0, _vkjs.isPrimitiveReactNode)(label);
    const platform = (0, _usePlatform.usePlatform)();
    let hoverMode;
    let activeMode;
    switch(platform){
        case 'ios':
            hoverMode = 'background';
            activeMode = 'opacity';
            break;
        case 'vkcom':
            hoverMode = "vkuiPanelHeaderButton--hover";
            activeMode = "vkuiPanelHeaderButton--active";
            break;
        default:
            hoverMode = 'background';
            activeMode = 'background';
    }
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = (0, _accessibility.hasAccessibleName)(_object_spread._({
            children: [
                children,
                label
            ]
        }, restProps));
        if (!isAccessible) {
            warn(_warnOnce.COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        Component: restProps.href ? 'a' : 'button'
    }, restProps), {
        hoverMode: hoverMode,
        activeEffectDelay: 200,
        activeMode: activeMode,
        className: (0, _vkjs.classNames)('vkuiInternalPanelHeaderButton', "vkuiPanelHeaderButton", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isPrimitive && "vkuiPanelHeaderButton--primitive", !isPrimitive && !isPrimitiveLabel && "vkuiPanelHeaderButton--notPrimitive", className)
    }), isPrimitive ? /*#__PURE__*/ _react.createElement(ButtonTypography, {
        primary: primary
    }, children) : children, isPrimitiveLabel ? /*#__PURE__*/ _react.createElement(ButtonTypography, {
        primary: primary,
        className: "vkuiPanelHeaderButton__label"
    }, label) : label);
};

//# sourceMappingURL=PanelHeaderButton.js.map