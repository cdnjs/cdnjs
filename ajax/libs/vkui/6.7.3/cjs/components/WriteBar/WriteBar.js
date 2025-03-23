"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WriteBar", {
    enumerable: true,
    get: function() {
        return WriteBar;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _usePlatform = require("../../hooks/usePlatform");
const _callMultiple = require("../../lib/callMultiple");
const _useResizeTextarea = require("../Textarea/useResizeTextarea");
const _Headline = require("../Typography/Headline/Headline");
const _Title = require("../Typography/Title/Title");
const WriteBarTypography = (props)=>{
    const platform = (0, _usePlatform.usePlatform)();
    if (platform === 'ios') {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Title.Title, _object_spread_props._(_object_spread._({}, props), {
            level: "3",
            weight: "3"
        }));
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Headline.Headline, _object_spread._({
        weight: "3"
    }, props));
};
const WriteBar = (_param)=>{
    var { className, style, before, inlineAfter, after, getRootRef, getRef, onHeightChange, shadow = false, onChange } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "style",
        "before",
        "inlineAfter",
        "after",
        "getRootRef",
        "getRef",
        "onHeightChange",
        "shadow",
        "onChange"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const [refResizeTextarea, resize] = (0, _useResizeTextarea.useResizeTextarea)(onHeightChange, true);
    const textareaRef = (0, _useExternRef.useExternRef)(getRef, refResizeTextarea);
    _react.useEffect(resize, [
        resize,
        platform
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiWriteBar", platform === 'ios' && "vkuiWriteBar--ios", shadow && "vkuiWriteBar--shadow", className),
        style: style,
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
            className: "vkuiWriteBar__form",
            children: [
                (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiWriteBar__before",
                    children: before
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                    className: "vkuiWriteBar__formIn",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(WriteBarTypography, _object_spread_props._(_object_spread._({}, restProps), {
                            Component: "textarea",
                            className: "vkuiWriteBar__textarea",
                            onChange: (0, _callMultiple.callMultiple)(onChange, resize),
                            getRootRef: textareaRef
                        })),
                        (0, _vkjs.hasReactNode)(inlineAfter) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                            className: "vkuiWriteBar__inlineAfter",
                            children: inlineAfter
                        })
                    ]
                }),
                (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiWriteBar__after",
                    children: after
                })
            ]
        })
    });
};

//# sourceMappingURL=WriteBar.js.map