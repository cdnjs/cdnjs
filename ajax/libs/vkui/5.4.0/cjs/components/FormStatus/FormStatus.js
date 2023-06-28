"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormStatus", {
    enumerable: true,
    get: function() {
        return FormStatus;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _banner = require("../Banner/Banner");
var FormStatus = function(_param) {
    var mode = _param.mode, children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_banner.Banner, _objectSpreadProps(_objectSpread({}, restProps), {
        subheader: children,
        className: (0, _vkjs.classNames)("vkuiInternalFormStatus", mode === "error" && (0, _vkjs.classNames)("vkuiFormStatus--mode-error", "vkuiInternalFormStatus--mode-error"), className)
    }));
};

//# sourceMappingURL=FormStatus.js.map