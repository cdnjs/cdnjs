"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormItemTopLabel", {
    enumerable: true,
    get: function() {
        return FormItemTopLabel;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Subhead = require("../../Typography/Subhead/Subhead");
const _context = require("../context");
const FormItemTopLabel = (_param)=>{
    var { children, Component: componentProp, htmlFor, multiline } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "Component",
        "htmlFor",
        "multiline"
    ]);
    const component = componentProp || htmlFor && 'label' || 'span';
    const { required, topMultiline: multilineContext } = _react.useContext(_context.FormItemContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Subhead.Subhead, _object_spread_props._(_object_spread._({
        className: (0, _vkjs.classNames)("vkuiFormItemTop__label", (multiline !== null && multiline !== void 0 ? multiline : multilineContext) && "vkuiFormItemTop__label--multiline"),
        Component: component,
        htmlFor: htmlFor
    }, restProps), {
        children: [
            children,
            required && /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                className: "vkuiFormItemTop__label--required",
                "aria-hidden": true,
                children: "*"
            })
        ]
    }));
};
FormItemTopLabel.displayName = 'FormItemTopLabel';

//# sourceMappingURL=FormItemTopLabel.js.map