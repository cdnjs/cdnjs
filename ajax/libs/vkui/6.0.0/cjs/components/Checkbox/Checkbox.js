"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Checkbox", {
    enumerable: true,
    get: function() {
        return Checkbox;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
const _useExternRef = require("../../hooks/useExternRef");
const _usePlatform = require("../../hooks/usePlatform");
const _warnOnce = require("../../lib/warnOnce");
const _useState = require("../Clickable/useState");
const _Tappable = require("../Tappable/Tappable");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Text = require("../Typography/Text/Text");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiCheckbox--sizeY-none",
    ['compact']: "vkuiCheckbox--sizeY-compact"
};
const warn = (0, _warnOnce.warnOnce)('Checkbox');
const Checkbox = (_param)=>{
    var { children, className, style, getRootRef, getRef, description, indeterminate, defaultIndeterminate, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, onChange, titleAfter } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "style",
        "getRootRef",
        "getRef",
        "description",
        "indeterminate",
        "defaultIndeterminate",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode",
        "onChange",
        "titleAfter"
    ]);
    const inputRef = (0, _useExternRef.useExternRef)(getRef);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { sizeY: adaptiveSizeY } = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)();
    _react.useEffect(()=>{
        const indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
        if (inputRef.current) {
            inputRef.current.indeterminate = Boolean(indeterminateValue);
        }
    }, [
        defaultIndeterminate,
        indeterminate,
        inputRef
    ]);
    const handleChange = _react.useCallback((event)=>{
        if (defaultIndeterminate !== undefined && indeterminate === undefined && restProps.checked === undefined && inputRef.current) {
            inputRef.current.indeterminate = false;
        }
        if (indeterminate !== undefined && inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
        onChange && onChange(event);
    }, [
        defaultIndeterminate,
        indeterminate,
        restProps.checked,
        onChange,
        inputRef
    ]);
    if (process.env.NODE_ENV === 'development') {
        if (defaultIndeterminate && restProps.defaultChecked) {
            warn('defaultIndeterminate и defaultChecked не могут быть true одновременно', 'error');
        }
        if (indeterminate && restProps.checked) {
            warn('indeterminate и checked не могут быть true одновременно', 'error');
        }
        if (restProps.defaultChecked && restProps.checked) {
            warn('defaultChecked и checked не могут быть true одновременно', 'error');
        }
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
        Component: "label",
        className: (0, _vkjs.classNames)("vkuiCheckbox", sizeY !== 'regular' && sizeYClassNames[sizeY], !((0, _vkjs.hasReactNode)(children) || (0, _vkjs.hasReactNode)(description)) && "vkuiCheckbox--simple", className),
        style: style,
        disabled: restProps.disabled,
        activeEffectDelay: platform === 'ios' ? 100 : _useState.DEFAULT_ACTIVE_EFFECT_DELAY,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        type: "checkbox",
        onChange: handleChange,
        className: "vkuiCheckbox__input",
        getRootRef: inputRef
    })), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCheckbox__icon", "vkuiCheckbox__icon--on")
    }, platform === 'vkcom' ? /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxOn, null) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxOn, {
        className: adaptiveSizeY.compact.className
    }), adaptiveSizeY.regular && /*#__PURE__*/ _react.createElement(_icons.Icon24CheckBoxOn, {
        className: adaptiveSizeY.regular.className
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCheckbox__icon", "vkuiCheckbox__icon--off")
    }, platform === 'vkcom' ? /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxOff, null) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxOff, {
        className: adaptiveSizeY.compact.className
    }), adaptiveSizeY.regular && /*#__PURE__*/ _react.createElement(_icons.Icon24CheckBoxOff, {
        className: adaptiveSizeY.regular.className
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCheckbox__icon", "vkuiCheckbox__icon--indeterminate")
    }, platform === 'vkcom' ? /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxIndetermanate, {
        width: 20,
        height: 20
    }) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxIndetermanate, {
        className: adaptiveSizeY.compact.className,
        width: 20,
        height: 20
    }), adaptiveSizeY.regular && /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxIndetermanate, {
        className: adaptiveSizeY.regular.className,
        width: 24,
        height: 24
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCheckbox__content"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCheckbox__title"
    }, /*#__PURE__*/ _react.createElement(_Text.Text, {
        className: "vkuiCheckbox__titleBefore"
    }, children), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCheckbox__titleAfter"
    }, titleAfter)), (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiCheckbox__description"
    }, description)));
};

//# sourceMappingURL=Checkbox.js.map