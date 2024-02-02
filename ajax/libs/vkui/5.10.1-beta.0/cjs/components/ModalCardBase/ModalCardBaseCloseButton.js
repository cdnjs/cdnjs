"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalCardBaseCloseButton", {
    enumerable: true,
    get: function() {
        return ModalCardBaseCloseButton;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _Tappable = require("../Tappable/Tappable");
function ModalCardBaseCloseButton(param) {
    var dismissLabel = param.dismissLabel, testId = param.testId, mode = param.mode, onClose = param.onClose;
    var platform = (0, _usePlatform.usePlatform)();
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    if (isDesktop && mode === "outside") {
        return /*#__PURE__*/ _react.createElement(_ModalDismissButton.ModalDismissButton, {
            "aria-label": dismissLabel,
            "data-testid": testId,
            onClick: onClose
        });
    }
    if (mode === "inside" || platform === _platform.Platform.IOS && !isDesktop) {
        return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
            "aria-label": dismissLabel,
            className: "vkuiModalCardBase__dismiss",
            onClick: onClose,
            hoverMode: "opacity",
            activeMode: "opacity",
            "data-testid": testId
        }, platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(_icons.Icon24Dismiss, null) : /*#__PURE__*/ _react.createElement(_icons.Icon20Cancel, null));
    }
    return null;
}

//# sourceMappingURL=ModalCardBaseCloseButton.js.map