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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _usePlatform = require("../../hooks/usePlatform");
const _useResizeObserver = require("../../hooks/useResizeObserver");
const _dom = require("../../lib/dom");
const _utils = require("../../lib/utils");
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
    const ref = _react.useRef(null);
    const [width, setWidth] = _react.useState(undefined);
    const { window } = (0, _dom.useDOM)();
    const { colRef } = _react.useContext(_SplitColContext.SplitColContext);
    const parentRef = _react.useRef(null);
    const handleRootRef = (0, _react.useCallback)((node)=>{
        if (!node) {
            return;
        }
        (0, _utils.setRef)(node, getRootRef);
        (0, _utils.setRef)(node, ref);
        (0, _utils.setRef)(node.parentElement, parentRef);
    }, [
        getRootRef
    ]);
    const doResize = ()=>{
        if (useParentWidth && parentRef.current) {
            const parentWidth = parentRef.current.getBoundingClientRect().width;
            setWidth(parentWidth ? `${parentWidth}px` : undefined);
        } else if (colRef === null || colRef === void 0 ? void 0 : colRef.current) {
            const computedStyle = getComputedStyle(colRef.current);
            setWidth(`${colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft || '0') - parseFloat(computedStyle.paddingRight || '0')}px`);
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
    (0, _useResizeObserver.useResizeObserver)(useParentWidth ? parentRef : colRef, doResize);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_OnboardingTooltipContainer.OnboardingTooltipContainer, _object_spread_props._(_object_spread._({}, restProps), {
        fixed: true,
        ref: handleRootRef,
        className: (0, _vkjs.classNames)("vkuiFixedLayout", platform === 'ios' && 'vkuiInternalFixedLayout--ios', filled && "vkuiFixedLayout--filled", vertical && stylesVertical[vertical], className),
        style: _object_spread_props._(_object_spread._({}, style), {
            width
        }),
        children: children
    }));
};

//# sourceMappingURL=FixedLayout.js.map