"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalCardBase", {
    enumerable: true,
    get: function() {
        return ModalCardBase;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useKeyboard = require("../../hooks/useKeyboard");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _modalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _panelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var _subhead = require("../Typography/Subhead/Subhead");
var _title = require("../Typography/Title/Title");
var platformClassNames = {
    ios: "vkuiModalCardBase--ios",
    android: "vkuiModalCardBase--android",
    vkcom: "vkuiModalCardBase--vkcom"
};
var ModalCardBase = function(_param) {
    var getRootRef = _param.getRootRef, icon = _param.icon, header = _param.header, subheader = _param.subheader, children = _param.children, actions = _param.actions, onClose = _param.onClose, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Скрыть" : _param_dismissLabel, className = _param.className, style = _param.style, sizeProp = _param.size, restProps = _objectWithoutProperties(_param, [
        "getRootRef",
        "icon",
        "header",
        "subheader",
        "children",
        "actions",
        "onClose",
        "dismissLabel",
        "className",
        "style",
        "size"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    var isSoftwareKeyboardOpened = (0, _useKeyboard.useKeyboard)().isOpened;
    var canShowCloseButtonIOS = platform === _platform.Platform.IOS && !isDesktop;
    var size = isDesktop ? sizeProp : undefined;
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiInternalModalCardBase", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isDesktop && "vkuiModalCardBase--desktop", className),
        ref: getRootRef,
        style: _objectSpreadProps(_objectSpread({}, style), {
            maxWidth: size
        })
    }), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiModalCardBase__container", isSoftwareKeyboardOpened && "vkuiModalCardBase__container--softwareKeyboardOpened")
    }, (0, _vkjs.hasReactNode)(icon) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalCardBase__icon"
    }, icon), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_title.Title, {
        level: "2",
        weight: "2",
        className: (0, _vkjs.classNames)("vkuiModalCardBase__header", "vkuiInternalModalCardBase__header")
    }, header), (0, _vkjs.hasReactNode)(subheader) && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
        className: (0, _vkjs.classNames)("vkuiModalCardBase__subheader", "vkuiInternalModalCardBase__subheader")
    }, subheader), children, (0, _vkjs.hasReactNode)(actions) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalCardBase__actions"
    }, actions), isDesktop && /*#__PURE__*/ _react.createElement(_modalDismissButton.ModalDismissButton, {
        onClick: onClose
    }), canShowCloseButtonIOS && /*#__PURE__*/ _react.createElement(_panelHeaderButton.PanelHeaderButton, {
        "aria-label": dismissLabel,
        className: "vkuiModalCardBase__dismiss",
        onClick: onClose
    }, /*#__PURE__*/ _react.createElement(_icons.Icon24Dismiss, null))));
};

//# sourceMappingURL=ModalCardBase.js.map