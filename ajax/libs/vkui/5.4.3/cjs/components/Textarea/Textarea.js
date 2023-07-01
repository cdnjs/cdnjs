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
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _formField = require("../FormField/FormField");
var sizeYClassNames = _defineProperty({
    none: "vkuiTextarea--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiTextarea--sizeY-compact");
var Textarea = function(_param) {
    var _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, _param_grow = _param.grow, grow = _param_grow === void 0 ? true : _param_grow, style = _param.style, onResize = _param.onResize, className = _param.className, getRootRef = _param.getRootRef, getRef = _param.getRef, _param_rows = _param.rows, rows = _param_rows === void 0 ? 2 : _param_rows, maxHeight = _param.maxHeight, status = _param.status, onChangeProp = _param.onChange, valueProp = _param.value, restProps = _objectWithoutProperties(_param, [
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
    var _useEnsuredControl1 = _slicedToArray((0, _useEnsuredControl.useEnsuredControl)({
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
    return /*#__PURE__*/ _react.createElement(_formField.FormField, {
        className: (0, _vkjs.classNames)("vkuiTextarea", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status
    }, /*#__PURE__*/ _react.createElement("textarea", _objectSpreadProps(_objectSpread({}, restProps), {
        style: {
            maxHeight: maxHeight
        },
        rows: rows,
        className: "vkuiTextarea__el",
        value: value,
        onChange: onChange,
        ref: elementRef
    })));
};

//# sourceMappingURL=Textarea.js.map