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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
const _utils = require("../../lib/utils");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _FocusTrap = require("../FocusTrap/FocusTrap");
const _IconButton = require("../IconButton/IconButton");
const _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
const _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
const _AlertActions = require("./AlertActions");
const _AlertTypography = require("./AlertTypography");
const Alert = (_param)=>{
    var { actions = [], actionsLayout = 'horizontal', children, className, style, text, header, onClose, dismissLabel = 'Закрыть предупреждение', renderAction, actionsAlign, dismissButtonMode = 'outside', dismissButtonTestId, getRootRef } = _param, restProps = _object_without_properties._(_param, [
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
        "dismissButtonTestId",
        "getRootRef"
    ]);
    const generatedId = _react.useId();
    const headerId = `vkui-alert-${generatedId}-header`;
    const textId = `vkui-alert-${generatedId}-text`;
    const platform = (0, _usePlatform.usePlatform)();
    const { isDesktop } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const { waitTransitionFinish } = (0, _useWaitTransitionFinish.useWaitTransitionFinish)();
    const [closing, setClosing] = _react.useState(false);
    const isDismissButtonVisible = isDesktop && platform !== 'ios';
    const elementRef = _react.useRef(null);
    const timeout = platform === 'ios' ? 300 : 200;
    const close = _react.useCallback(()=>{
        setClosing(true);
        waitTransitionFinish(elementRef.current, (e)=>{
            if (!e || e.propertyName === 'opacity') {
                onClose();
            }
        }, timeout);
    }, [
        elementRef,
        waitTransitionFinish,
        onClose,
        timeout
    ]);
    const onItemClick = _react.useCallback((item)=>{
        const { action, autoCloseDisabled = false } = item;
        if (!autoCloseDisabled) {
            setClosing(true);
            waitTransitionFinish(elementRef.current, (e)=>{
                if (!e || e.propertyName === 'opacity') {
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
        className: (0, _vkjs.classNames)("vkuiAlert", platform === 'ios' && "vkuiAlert--ios", platform === 'vkcom' && "vkuiAlert--vkcom", closing && "vkuiAlert--closing", isDesktop && "vkuiAlert--desktop"),
        role: "alertdialog",
        "aria-modal": true,
        "aria-labelledby": headerId,
        "aria-describedby": textId
    }), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiAlert__content", dismissButtonMode === 'inside' && "vkuiAlert__content--withButton")
    }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_AlertTypography.AlertHeader, {
        id: headerId
    }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_AlertTypography.AlertText, {
        id: textId
    }, text), children, isDismissButtonVisible && dismissButtonMode === 'inside' && /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        label: dismissLabel,
        className: (0, _vkjs.classNames)("vkuiAlert__dismiss", 'vkuiInternalAlert__dismiss'),
        onClick: close,
        hoverMode: "opacity",
        activeMode: "opacity",
        "data-testid": dismissButtonTestId
    }, /*#__PURE__*/ _react.createElement(_icons.Icon20Cancel, null))), /*#__PURE__*/ _react.createElement(_AlertActions.AlertActions, {
        actions: actions,
        actionsAlign: actionsAlign,
        actionsLayout: actionsLayout,
        renderAction: renderAction,
        onItemClick: onItemClick
    }), isDismissButtonVisible && dismissButtonMode === 'outside' && /*#__PURE__*/ _react.createElement(_ModalDismissButton.ModalDismissButton, {
        onClick: close,
        "data-testid": dismissButtonTestId
    }, dismissLabel)));
};

//# sourceMappingURL=Alert.js.map