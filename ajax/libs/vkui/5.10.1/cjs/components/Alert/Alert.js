"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Alert", {
    enumerable: true,
    get: function() {
        return Alert;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useId = require("../../hooks/useId");
var _usePlatform = require("../../hooks/usePlatform");
var _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
var _platform = require("../../lib/platform");
var _utils = require("../../lib/utils");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _IconButton = require("../IconButton/IconButton");
var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
var _AlertActions = require("./AlertActions");
var _AlertTypography = require("./AlertTypography");
var Alert = function(_param) {
    var _param_actions = _param.actions, actions = _param_actions === void 0 ? [] : _param_actions, _param_actionsLayout = _param.actionsLayout, actionsLayout = _param_actionsLayout === void 0 ? "horizontal" : _param_actionsLayout, children = _param.children, className = _param.className, style = _param.style, text = _param.text, header = _param.header, onClose = _param.onClose, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Закрыть предупреждение" : _param_dismissLabel, renderAction = _param.renderAction, actionsAlign = _param.actionsAlign, _param_dismissButtonMode = _param.dismissButtonMode, dismissButtonMode = _param_dismissButtonMode === void 0 ? "outside" : _param_dismissButtonMode, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
        "actions",
        "actionsLayout",
        "children",
        "className",
        "style",
        "text",
        "header",
        "onClose",
        "dismissLabel",
        "renderAction",
        "actionsAlign",
        "dismissButtonMode",
        "getRootRef"
    ]);
    var generatedId = (0, _useId.useId)();
    var headerId = "vkui-alert-".concat(generatedId, "-header");
    var textId = "vkui-alert-".concat(generatedId, "-text");
    var platform = (0, _usePlatform.usePlatform)();
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    var waitTransitionFinish = (0, _useWaitTransitionFinish.useWaitTransitionFinish)().waitTransitionFinish;
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), closing = _React_useState[0], setClosing = _React_useState[1];
    var isDismissButtonVisible = isDesktop && platform !== _platform.Platform.IOS;
    var elementRef = _react.useRef(null);
    var timeout = platform === _platform.Platform.IOS ? 300 : 200;
    var close = _react.useCallback(function() {
        setClosing(true);
        waitTransitionFinish(elementRef.current, function(e) {
            if (!e || e.propertyName === "opacity") {
                onClose();
            }
        }, timeout);
    }, [
        elementRef,
        waitTransitionFinish,
        onClose,
        timeout
    ]);
    var onItemClick = _react.useCallback(function(item) {
        var action = item.action, autoClose = item.autoClose;
        if (autoClose) {
            setClosing(true);
            waitTransitionFinish(elementRef.current, function(e) {
                if (!e || e.propertyName === "opacity") {
                    onClose();
                    action && action();
                }
            }, timeout);
        } else {
            action && action();
        }
    }, [
        elementRef,
        waitTransitionFinish,
        onClose,
        timeout
    ]);
    (0, _ScrollContext.useScrollLock)();
    return /*#__PURE__*/ _react.createElement(_PopoutWrapper.PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: close,
        getRootRef: getRootRef
    }, /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, _object_spread_props._(_object_spread._({}, restProps), {
        getRootRef: elementRef,
        onClick: _utils.stopPropagation,
        onClose: close,
        timeout: timeout,
        className: (0, _vkjs.classNames)("vkuiAlert", platform === _platform.Platform.IOS && "vkuiAlert--ios", platform === _platform.Platform.VKCOM && "vkuiAlert--vkcom", closing && "vkuiAlert--closing", isDesktop && "vkuiAlert--desktop"),
        role: "alertdialog",
        "aria-modal": true,
        "aria-labelledby": headerId,
        "aria-describedby": textId
    }), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiAlert__content", dismissButtonMode === "inside" && "vkuiAlert__content--withButton")
    }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_AlertTypography.AlertHeader, {
        id: headerId
    }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_AlertTypography.AlertText, {
        id: textId
    }, text), children, isDismissButtonVisible && dismissButtonMode === "inside" && /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        "aria-label": dismissLabel,
        className: (0, _vkjs.classNames)("vkuiAlert__dismiss", "vkuiInternalAlert__dismiss"),
        onClick: close,
        hoverMode: "opacity",
        activeMode: "opacity"
    }, /*#__PURE__*/ _react.createElement(_icons.Icon20Cancel, null))), /*#__PURE__*/ _react.createElement(_AlertActions.AlertActions, {
        actions: actions,
        actionsAlign: actionsAlign,
        actionsLayout: actionsLayout,
        renderAction: renderAction,
        onItemClick: onItemClick
    }), isDismissButtonVisible && dismissButtonMode === "outside" && /*#__PURE__*/ _react.createElement(_ModalDismissButton.ModalDismissButton, {
        onClick: close,
        "aria-label": dismissLabel
    })));
};

//# sourceMappingURL=Alert.js.map