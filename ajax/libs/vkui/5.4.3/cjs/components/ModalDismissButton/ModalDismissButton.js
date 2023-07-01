"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalDismissButton", {
    enumerable: true,
    get: function() {
        return ModalDismissButton;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _tappable = require("../Tappable/Tappable");
var ModalDismissButton = function(_param) {
    var tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Закрыть" : tmp, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "aria-label",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({
        className: (0, _vkjs.classNames)("vkuiModalDismissButton", className)
    }, restProps), {
        "aria-label": ariaLabel,
        activeMode: "vkuiModalDismissButton--active",
        hoverMode: "vkuiModalDismissButton--hover"
    }), /*#__PURE__*/ _react.createElement(_icons.Icon20Cancel, null));
};

//# sourceMappingURL=ModalDismissButton.js.map