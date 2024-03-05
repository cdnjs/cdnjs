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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _callMultiple = require("../../lib/callMultiple");
const _FormField = require("../FormField/FormField");
const _Text = require("../Typography/Text/Text");
const sizeYClassNames = {
    none: "vkuiTextarea--sizeY-none",
    ['compact']: "vkuiTextarea--sizeY-compact"
};
const Textarea = (_param)=>{
    var { grow = true, style, onResize, className, getRootRef, getRef, rows = 2, maxHeight, status, onChange } = _param, restProps = _object_without_properties._(_param, [
        "grow",
        "style",
        "onResize",
        "className",
        "getRootRef",
        "getRef",
        "rows",
        "maxHeight",
        "status",
        "onChange"
    ]);
    const currentScrollHeight = _react.useRef();
    const elementRef = (0, _useExternRef.useExternRef)(getRef);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const autosizeInput = ()=>{
        const el = elementRef.current;
        if (grow && (el === null || el === void 0 ? void 0 : el.offsetParent)) {
            el.style.height = '';
            el.style.height = `${el.scrollHeight}px`;
            if (el.scrollHeight !== currentScrollHeight.current && onResize) {
                onResize(el);
                currentScrollHeight.current = el.scrollHeight;
            }
        }
    };
    _react.useEffect(autosizeInput, [
        grow,
        sizeY,
        elementRef,
        onResize
    ]);
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        className: (0, _vkjs.classNames)("vkuiTextarea", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status
    }, /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "textarea",
        normalize: false,
        style: {
            maxHeight
        },
        rows: rows,
        className: "vkuiTextarea__el",
        onChange: (0, _callMultiple.callMultiple)(onChange, autosizeInput),
        getRootRef: elementRef
    })));
};

//# sourceMappingURL=Textarea.js.map