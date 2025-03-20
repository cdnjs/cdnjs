"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Textarea", {
    enumerable: true,
    get: function() {
        return Textarea;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _usePlatform = require("../../hooks/usePlatform");
const _callMultiple = require("../../lib/callMultiple");
const _dom = require("../../lib/dom");
const _FormField = require("../FormField/FormField");
const _UnstyledTextField = require("../UnstyledTextField/UnstyledTextField");
const _useResizeTextarea = require("./useResizeTextarea");
const sizeYClassNames = {
    none: "vkuiTextarea--sizeY-none",
    compact: "vkuiTextarea--sizeY-compact"
};
const Textarea = (_param)=>{
    var { grow = true, style, onResize, className, getRootRef, getRef, rows = 2, maxHeight, status, onChange, align, mode, after, before, afterAlign, beforeAlign, value } = _param, restProps = _object_without_properties._(_param, [
        "grow",
        "style",
        "onResize",
        "className",
        "getRootRef",
        "getRef",
        "rows",
        "maxHeight",
        "status",
        "onChange",
        "align",
        "mode",
        "after",
        "before",
        "afterAlign",
        "beforeAlign",
        "value"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const platform = (0, _usePlatform.usePlatform)();
    const { window } = (0, _dom.useDOM)();
    const [refResizeTextarea, resize] = (0, _useResizeTextarea.useResizeTextarea)(onResize, grow);
    const elementRef = (0, _useExternRef.useExternRef)(getRef, refResizeTextarea);
    _react.useEffect(resize, [
        resize,
        sizeY,
        platform,
        value
    ]);
    (0, _useGlobalEventListener.useGlobalEventListener)(window, 'resize', resize);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_FormField.FormField, {
        className: (0, _vkjs.classNames)("vkuiTextarea", sizeY !== 'regular' && sizeYClassNames[sizeY], align === 'right' && "vkuiTextarea--align-right", align === 'center' && "vkuiTextarea--align-center", className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status,
        mode: mode,
        after: after,
        before: before,
        afterAlign: afterAlign,
        beforeAlign: beforeAlign,
        maxHeight: maxHeight,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_UnstyledTextField.UnstyledTextField, _object_spread_props._(_object_spread._({}, restProps), {
            value: value,
            as: "textarea",
            rows: rows,
            className: "vkuiTextarea__el",
            onChange: (0, _callMultiple.callMultiple)(onChange, resize),
            getRootRef: elementRef
        }))
    });
};

//# sourceMappingURL=Textarea.js.map