"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SegmentedControl", {
    enumerable: true,
    get: function() {
        return SegmentedControl;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useEnsuredControl = require("../../hooks/useEnsuredControl");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _warnOnce = require("../../lib/warnOnce");
const _RootComponent = require("../RootComponent/RootComponent");
const _SegmentedControlOption = require("./SegmentedControlOption/SegmentedControlOption");
var _options_;
const sizeYClassNames = {
    none: "vkuiSegmentedControl--sizeY-none",
    ['regular']: "vkuiSegmentedControl--sizeY-regular"
};
const warn = (0, _warnOnce.warnOnce)('SegmentedControl');
const SegmentedControl = (_param)=>{
    var { size = 'l', name, options, defaultValue = (_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value, children, onChange: onChangeProp, value: valueProp } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "name",
        "options",
        "defaultValue",
        "children",
        "onChange",
        "value"
    ]);
    const id = _react.useId();
    const [value, onChange] = (0, _useEnsuredControl.useCustomEnsuredControl)({
        onChange: onChangeProp,
        value: valueProp,
        defaultValue
    });
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const actualIndex = options.findIndex((option)=>option.value === value);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (actualIndex === -1 && process.env.NODE_ENV === 'development') {
            warn('defaultValue: такого значения нет среди опций!', 'error');
        }
    }, [
        actualIndex
    ]);
    const translateX = `translateX(${100 * actualIndex}%)`;
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiSegmentedControl", sizeY !== 'compact' && sizeYClassNames[sizeY], size === 'l' && "vkuiSegmentedControl--size-l")
    }), /*#__PURE__*/ _react.createElement("div", {
        role: "radiogroup",
        className: "vkuiSegmentedControl__in"
    }, actualIndex > -1 && /*#__PURE__*/ _react.createElement("div", {
        "aria-hidden": true,
        className: "vkuiSegmentedControl__slider",
        style: {
            width: `${100 / options.length}%`,
            transform: translateX,
            WebkitTransform: translateX
        }
    }), options.map((_param)=>{
        var { label } = _param, optionProps = _object_without_properties._(_param, [
            "label"
        ]);
        return /*#__PURE__*/ _react.createElement(_SegmentedControlOption.SegmentedControlOption, _object_spread_props._(_object_spread._({
            key: `${optionProps.value}`
        }, optionProps), {
            name: name !== null && name !== void 0 ? name : id,
            checked: value === optionProps.value,
            onChange: ()=>onChange(optionProps.value)
        }), label);
    })));
};

//# sourceMappingURL=SegmentedControl.js.map