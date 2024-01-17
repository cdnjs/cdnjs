"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheetDropdownMenu", {
    enumerable: true,
    get: function() {
        return ActionSheetDropdownMenu;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _useEffectDev = require("../../hooks/useEffectDev");
const _useEventListener = require("../../hooks/useEventListener");
const _usePlatform = require("../../hooks/usePlatform");
const _dom = require("../../lib/dom");
const _isRefObject = require("../../lib/isRefObject");
const _warnOnce = require("../../lib/warnOnce");
const _FocusTrap = require("../FocusTrap/FocusTrap");
const _Popper = require("../Popper/Popper");
const warn = (0, _warnOnce.warnOnce)('ActionSheet');
function getEl(ref) {
    return ref && 'current' in ref ? ref.current : ref;
}
const ActionSheetDropdownMenu = (_param)=>{
    var { children, toggleRef, closing, onClose, className, style, popupOffsetDistance = 0, placement } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "toggleRef",
        "closing",
        "onClose",
        "className",
        "style",
        "popupOffsetDistance",
        "placement"
    ]);
    const { document } = (0, _dom.useDOM)();
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeY } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const elementRef = _react.useRef(null);
    (0, _useEffectDev.useEffectDev)(()=>{
        const toggleEl = getEl(toggleRef);
        if (!toggleEl) {
            warn(`Свойство "toggleRef" не передано`, 'error');
        }
    }, [
        toggleRef
    ]);
    const bodyClickListener = (0, _useEventListener.useEventListener)('click', (e)=>{
        const dropdownElement = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
        if (dropdownElement && !dropdownElement.contains(e.target)) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    });
    _react.useEffect(()=>{
        setTimeout(()=>{
            bodyClickListener.add(document.body);
        });
    }, [
        bodyClickListener,
        document
    ]);
    const onClick = _react.useCallback((e)=>e.stopPropagation(), []);
    const targetRef = _react.useMemo(()=>{
        if ((0, _isRefObject.isRefObject)(toggleRef)) {
            return toggleRef;
        }
        return {
            current: toggleRef
        };
    }, [
        toggleRef
    ]);
    return /*#__PURE__*/ _react.createElement(_Popper.Popper, {
        targetRef: targetRef,
        offsetByMainAxis: popupOffsetDistance,
        placement: placement,
        className: (0, _vkjs.classNames)("vkuiActionSheet", platform === 'ios' && "vkuiActionSheet--ios", "vkuiActionSheet--menu", sizeY === 'compact' && "vkuiActionSheet--sizeY-compact", className),
        style: style,
        getRootRef: elementRef,
        usePortal: false
    }, /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, _object_spread_props._(_object_spread._({
        onClose: onClose
    }, restProps), {
        onClick: onClick
    }), children));
};

//# sourceMappingURL=ActionSheetDropdownMenu.js.map