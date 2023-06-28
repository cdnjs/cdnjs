"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "File", {
    enumerable: true,
    get: function() {
        return File;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _button = require("../Button/Button");
var _visuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var File = function(_param) {
    var _param_children = _param.children, children = _param_children === void 0 ? "Выберите файл" : _param_children, _param_align = _param.align, align = _param_align === void 0 ? "left" : _param_align, size = _param.size, mode = _param.mode, stretched = _param.stretched, before = _param.before, after = _param.after, loading = _param.loading, className = _param.className, style = _param.style, getRef = _param.getRef, getRootRef = _param.getRootRef, appearance = _param.appearance, restProps = _objectWithoutProperties(_param, [
        "children",
        "align",
        "size",
        "mode",
        "stretched",
        "before",
        "after",
        "loading",
        "className",
        "style",
        "getRef",
        "getRootRef",
        "appearance"
    ]);
    return /*#__PURE__*/ _react.createElement(_button.Button, {
        Component: "label",
        align: align,
        className: className,
        stretched: stretched,
        mode: mode,
        appearance: appearance,
        size: size,
        before: before,
        after: after,
        loading: loading,
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled
    }, /*#__PURE__*/ _react.createElement(_visuallyHidden.VisuallyHidden, _objectSpreadProps(_objectSpread({}, restProps), {
        Component: "input",
        type: "file",
        getRootRef: getRef
    })), children);
};

//# sourceMappingURL=File.js.map