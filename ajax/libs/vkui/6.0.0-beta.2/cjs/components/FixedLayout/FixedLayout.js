"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FixedLayout", {
    enumerable: true,
    get: function() {
        return FixedLayout;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _usePlatform = require("../../hooks/usePlatform");
const _dom = require("../../lib/dom");
const _OnboardingTooltipContainer = require("../OnboardingTooltip/OnboardingTooltipContainer");
const _SplitColContext = require("../SplitCol/SplitColContext");
const stylesVertical = {
    top: "vkuiFixedLayout--vertical-top",
    bottom: (0, _vkjs.classNames)("vkuiFixedLayout--vertical-bottom", 'vkuiInternalFixedLayout--vertical-bottom')
};
const FixedLayout = (_param)=>{
    var { children, style, vertical, getRootRef, filled, className, useParentWidth } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "style",
        "vertical",
        "getRootRef",
        "filled",
        "className",
        "useParentWidth"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const ref = (0, _useExternRef.useExternRef)(getRootRef);
    const [width, setWidth] = _react.useState(undefined);
    const { window } = (0, _dom.useDOM)();
    const { colRef } = _react.useContext(_SplitColContext.SplitColContext);
    const doResize = ()=>{
        if (useParentWidth && ref.current) {
            var _ref_current_parentElement;
            const parentWidth = (_ref_current_parentElement = ref.current.parentElement) === null || _ref_current_parentElement === void 0 ? void 0 : _ref_current_parentElement.getBoundingClientRect().width;
            setWidth(parentWidth ? `${parentWidth}px` : undefined);
        } else if (colRef === null || colRef === void 0 ? void 0 : colRef.current) {
            const computedStyle = getComputedStyle(colRef.current);
            setWidth(`${colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight)}px`);
        } else {
            setWidth(undefined);
        }
    };
    _react.useEffect(doResize, [
        colRef,
        platform,
        ref,
        useParentWidth
    ]);
    (0, _useGlobalEventListener.useGlobalEventListener)(window, 'resize', doResize);
    return /*#__PURE__*/ _react.createElement(_OnboardingTooltipContainer.OnboardingTooltipContainer, _object_spread_props._(_object_spread._({}, restProps), {
        fixed: true,
        ref: ref,
        className: (0, _vkjs.classNames)("vkuiFixedLayout", platform === 'ios' && 'vkuiInternalFixedLayout--ios', filled && "vkuiFixedLayout--filled", vertical && stylesVertical[vertical], className),
        style: _object_spread_props._(_object_spread._({}, style), {
            width
        })
    }), children);
};

//# sourceMappingURL=FixedLayout.js.map