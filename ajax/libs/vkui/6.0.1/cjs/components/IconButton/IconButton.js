"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IconButton", {
    enumerable: true,
    get: function() {
        return IconButton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _usePlatform = require("../../hooks/usePlatform");
const _accessibility = require("../../lib/accessibility");
const _warnOnce = require("../../lib/warnOnce");
const _Tappable = require("../Tappable/Tappable");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiIconButton--sizeY-none",
    compact: "vkuiIconButton--sizeY-compact"
};
const warn = (0, _warnOnce.warnOnce)('IconButton');
const IconButton = (_param)=>{
    var { label, children, className } = _param, restProps = _object_without_properties._(_param, [
        "label",
        "children",
        "className"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
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
        activeEffectDelay: 200,
        activeMode: "background",
        Component: restProps.href ? 'a' : 'button'
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiIconButton", sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' && "vkuiIconButton--ios", className)
    }), label && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, label), children);
};

//# sourceMappingURL=IconButton.js.map