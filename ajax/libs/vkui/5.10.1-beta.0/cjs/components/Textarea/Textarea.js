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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _FormField = require("../FormField/FormField");
var _Text = require("../Typography/Text/Text");
var sizeYClassNames = _define_property._({
    none: "vkuiTextarea--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiTextarea--sizeY-compact");
var Textarea = function(_param) {
    var _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, _param_grow = _param.grow, grow = _param_grow === void 0 ? true : _param_grow, style = _param.style, onResize = _param.onResize, className = _param.className, getRootRef = _param.getRootRef, getRef = _param.getRef, _param_rows = _param.rows, rows = _param_rows === void 0 ? 2 : _param_rows, maxHeight = _param.maxHeight, status = _param.status, onChangeProp = _param.onChange, valueProp = _param.value, restProps = _object_without_properties._(_param, [
        "defaultValue",
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
        "value"
    ]);
    var _useEnsuredControl1 = _sliced_to_array._((0, _useEnsuredControl.useEnsuredControl)({
        defaultValue: defaultValue,
        onChange: onChangeProp,
        value: valueProp
    }), 2), value = _useEnsuredControl1[0], onChange = _useEnsuredControl1[1];
    var currentScrollHeight = _react.useRef();
    var elementRef = (0, _useExternRef.useExternRef)(getRef);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    // autosize input
    _react.useEffect(function() {
        var el = elementRef.current;
        if (grow && (el === null || el === void 0 ? void 0 : el.offsetParent)) {
            el.style.height = "";
            el.style.height = "".concat(el.scrollHeight, "px");
            if (el.scrollHeight !== currentScrollHeight.current && onResize) {
                onResize(el);
                currentScrollHeight.current = el.scrollHeight;
            }
        }
    }, [
        grow,
        value,
        sizeY,
        elementRef,
        onResize
    ]);
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        className: (0, _vkjs.classNames)("vkuiTextarea", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status
    }, /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "textarea",
        normalize: false,
        style: {
            maxHeight: maxHeight
        },
        rows: rows,
        className: "vkuiTextarea__el",
        value: value,
        onChange: onChange,
        getRootRef: elementRef
    })));
};

//# sourceMappingURL=Textarea.js.map