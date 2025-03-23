"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CheckboxInput", {
    enumerable: true,
    get: function() {
        return CheckboxInput;
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
const _useAdaptivityConditionalRender = require("../../../hooks/useAdaptivityConditionalRender");
const _useExternRef = require("../../../hooks/useExternRef");
const _usePlatform = require("../../../hooks/usePlatform");
const _warnOnce = require("../../../lib/warnOnce");
const _RootComponent = require("../../RootComponent/RootComponent");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
function setIndeterminate(el, indeterminate) {
    el.indeterminate = indeterminate;
}
const warn = (0, _warnOnce.warnOnce)('Checkbox');
function CheckboxInput(_param) {
    var { className, style, getRootRef, getRef, indeterminate, defaultIndeterminate, onChange } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "style",
        "getRootRef",
        "getRef",
        "indeterminate",
        "defaultIndeterminate",
        "onChange"
    ]);
    const inputRef = (0, _useExternRef.useExternRef)(getRef);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeY: adaptiveSizeY } = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)();
    _react.useEffect(()=>{
        const indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
        if (inputRef.current) {
            setIndeterminate(inputRef.current, Boolean(indeterminateValue));
        }
    }, [
        defaultIndeterminate,
        indeterminate,
        inputRef
    ]);
    const handleChange = _react.useCallback((event)=>{
        if (defaultIndeterminate !== undefined && indeterminate === undefined && restProps.checked === undefined && inputRef.current) {
            setIndeterminate(inputRef.current, false);
        }
        if (indeterminate !== undefined && inputRef.current) {
            setIndeterminate(inputRef.current, Boolean(indeterminate));
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, {
        baseClassName: "vkuiCheckboxInput",
        className: className,
        style: style,
        getRootRef: getRootRef,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
                Component: "input",
                type: "checkbox",
                onChange: handleChange,
                className: "vkuiCheckboxInput__input",
                getRootRef: inputRef
            })),
            platform === 'vkcom' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20CheckBoxOn, {
                className: "vkuiCheckboxInput__icon--on"
            }) : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20CheckBoxOn, {
                        className: (0, _vkjs.classNames)("vkuiCheckboxInput__icon--on", adaptiveSizeY.compact.className)
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon24CheckBoxOn, {
                        className: (0, _vkjs.classNames)("vkuiCheckboxInput__icon--on", adaptiveSizeY.regular.className)
                    })
                ]
            }),
            platform === 'vkcom' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20CheckBoxOff, {
                className: "vkuiCheckboxInput__icon--off"
            }) : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20CheckBoxOff, {
                        className: (0, _vkjs.classNames)("vkuiCheckboxInput__icon--off", adaptiveSizeY.compact.className)
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon24CheckBoxOff, {
                        className: (0, _vkjs.classNames)("vkuiCheckboxInput__icon--off", adaptiveSizeY.regular.className)
                    })
                ]
            }),
            platform === 'vkcom' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20CheckBoxIndetermanate, {
                width: 20,
                height: 20,
                className: "vkuiCheckboxInput__icon--indeterminate"
            }) : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20CheckBoxIndetermanate, {
                        className: (0, _vkjs.classNames)("vkuiCheckboxInput__icon--indeterminate", adaptiveSizeY.compact.className),
                        width: 20,
                        height: 20
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20CheckBoxIndetermanate, {
                        className: (0, _vkjs.classNames)("vkuiCheckboxInput__icon--indeterminate", adaptiveSizeY.regular.className),
                        width: 24,
                        height: 24
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=CheckboxInput.js.map