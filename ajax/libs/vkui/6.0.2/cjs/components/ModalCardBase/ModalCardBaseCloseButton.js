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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
const _Tappable = require("../Tappable/Tappable");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
function ModalCardBaseCloseButton({ children = 'Закрыть', testId, mode, onClose }) {
    const platform = (0, _usePlatform.usePlatform)();
    const { isDesktop } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    if (isDesktop && mode === 'outside') {
        return /*#__PURE__*/ _react.createElement(_ModalDismissButton.ModalDismissButton, {
            "data-testid": testId,
            onClick: onClose
        }, children);
    }
    if (mode === 'inside' || platform === 'ios' && !isDesktop) {
        return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
            className: "vkuiModalCardBase__dismiss",
            onClick: onClose,
            hoverMode: "opacity",
            activeMode: "opacity",
            "data-testid": testId
        }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children), platform === 'ios' ? /*#__PURE__*/ _react.createElement(_icons.Icon24Dismiss, null) : /*#__PURE__*/ _react.createElement(_icons.Icon20Cancel, null));
    }
    return null;
}

//# sourceMappingURL=ModalCardBaseCloseButton.js.map