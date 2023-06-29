"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormItem", {
    enumerable: true,
    get: function() {
        return FormItem;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _removable = require("../Removable/Removable");
var _footnote = require("../Typography/Footnote/Footnote");
var _subhead = require("../Typography/Subhead/Subhead");
var sizeYClassNames = _defineProperty({
    none: (0, _vkjs.classNames)("vkuiFormItem--sizeY-none", "vkuiInternalFormItem--sizeY-none")
}, _adaptivity.SizeType.COMPACT, (0, _vkjs.classNames)("vkuiFormItem--sizeY-compact", "vkuiInternalFormItem--sizeY-compact"));
var FormItem = function(_param) {
    var children = _param.children, top = _param.top, bottom = _param.bottom, _param_status = _param.status, status = _param_status === void 0 ? "default" : _param_status, _param_Component = _param.Component, Component = _param_Component === void 0 ? "div" : _param_Component, removable = _param.removable, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? _vkjs.noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, getRootRef = _param.getRootRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "top",
        "bottom",
        "status",
        "Component",
        "removable",
        "onRemove",
        "removePlaceholder",
        "getRootRef",
        "className"
    ]);
    var rootEl = (0, _useExternRef.useExternRef)(getRootRef);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var wrappedChildren = /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _vkjs.hasReactNode)(top) && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
        className: "vkuiFormItem__top"
    }, top), children, (0, _vkjs.hasReactNode)(bottom) && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiFormItem__bottom"
    }, bottom));
    return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        ref: rootEl,
        className: (0, _vkjs.classNames)("vkuiFormItem", "vkuiInternalFormItem", status !== "default" && ({
            error: (0, _vkjs.classNames)("vkuiFormItem--status-error", "vkuiInternalFormItem--status-error"),
            valid: (0, _vkjs.classNames)("vkuiFormItem--status-valid", "vkuiInternalFormItem--status-valid")
        })[status], sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], (0, _vkjs.hasReactNode)(top) && (0, _vkjs.classNames)("vkuiFormItem--withTop", "vkuiInternalFormItem--withTop"), removable && (0, _vkjs.classNames)("vkuiFormItem--removable", "vkuiInternalFormItem--removable"), className)
    }), removable ? /*#__PURE__*/ _react.createElement(_removable.Removable, {
        align: "start",
        onRemove: function(e) {
            if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                onRemove(e, rootEl.current);
            }
        },
        removePlaceholder: removePlaceholder,
        indent: removable === "indent"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiFormItem__removable", "vkuiInternalFormItem__removable")
    }, wrappedChildren)) : wrappedChildren);
};

//# sourceMappingURL=FormItem.js.map