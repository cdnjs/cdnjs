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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _animation = require("../../lib/animation");
const _utils = require("../../lib/utils");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _FocusTrap = require("../FocusTrap/FocusTrap");
const _IconButton = require("../IconButton/IconButton");
const _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
const _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
const _AlertActions = require("./AlertActions");
const _AlertTypography = require("./AlertTypography");
const Alert = (_param)=>{
    var { actions, actionsLayout = 'horizontal', children, className, style, text, header, onClose, dismissLabel = 'Закрыть предупреждение', renderAction, actionsAlign, dismissButtonMode = 'outside', dismissButtonTestId, getRootRef } = _param, restProps = _object_without_properties._(_param, [
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
    const [closing, setClosing] = _react.useState(false);
    const itemActionCallbackRef = _react.useRef(_vkjs.noop);
    const [animationState, animationHandlers] = (0, _animation.useCSSKeyframesAnimationController)(closing ? 'exit' : 'enter', {
        onExited () {
            itemActionCallbackRef.current();
            itemActionCallbackRef.current = _vkjs.noop;
            onClose();
        }
    });
    const isDismissButtonVisible = isDesktop && platform !== 'ios';
    const elementRef = _react.useRef(null);
    const close = _react.useCallback(()=>{
        setClosing(true);
    }, []);
    const onItemClick = _react.useCallback((item)=>{
        const { action: itemAction, autoCloseDisabled = false } = item;
        if (autoCloseDisabled) {
            itemAction && itemAction({
                close
            });
        } else {
            if (itemAction) {
                itemActionCallbackRef.current = itemAction;
            }
            setClosing(true);
        }
    }, [
        close
    ]);
    (0, _ScrollContext.useScrollLock)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_PopoutWrapper.PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: close,
        getRootRef: getRootRef,
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_FocusTrap.FocusTrap, _object_spread_props._(_object_spread._({}, restProps, animationHandlers), {
            getRootRef: elementRef,
            onClick: _utils.stopPropagation,
            onClose: close,
            autoFocus: animationState === 'entered',
            className: (0, _vkjs.classNames)("vkuiAlert", platform === 'ios' && "vkuiAlert--ios", platform === 'vkcom' && "vkuiAlert--vkcom", closing ? "vkuiAlert--closing" : "vkuiAlert--opening", isDesktop && "vkuiAlert--desktop"),
            role: "alertdialog",
            "aria-modal": true,
            "aria-labelledby": headerId,
            "aria-describedby": textId,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                    className: (0, _vkjs.classNames)("vkuiAlert__content", dismissButtonMode === 'inside' && "vkuiAlert__content--withButton"),
                    children: [
                        (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_AlertTypography.AlertHeader, {
                            id: headerId,
                            children: header
                        }),
                        (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_AlertTypography.AlertText, {
                            id: textId,
                            children: text
                        }),
                        children,
                        isDismissButtonVisible && dismissButtonMode === 'inside' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_IconButton.IconButton, {
                            label: dismissLabel,
                            className: (0, _vkjs.classNames)("vkuiAlert__dismiss", 'vkuiInternalAlert__dismiss'),
                            onClick: close,
                            hoverMode: "opacity",
                            activeMode: "opacity",
                            "data-testid": dismissButtonTestId,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon20Cancel, {})
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_AlertActions.AlertActions, {
                    actions: actions,
                    actionsAlign: actionsAlign,
                    actionsLayout: actionsLayout,
                    renderAction: renderAction,
                    onItemClick: onItemClick
                }),
                isDismissButtonVisible && dismissButtonMode === 'outside' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_ModalDismissButton.ModalDismissButton, {
                    onClick: close,
                    "data-testid": dismissButtonTestId,
                    children: dismissLabel
                })
            ]
        }))
    });
};

//# sourceMappingURL=Alert.js.map