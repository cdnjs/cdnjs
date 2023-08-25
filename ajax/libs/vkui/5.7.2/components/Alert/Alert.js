import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { useId } from "../../hooks/useId";
import { usePlatform } from "../../hooks/usePlatform";
import { useWaitTransitionFinish } from "../../hooks/useWaitTransitionFinish";
import { Platform } from "../../lib/platform";
import { stopPropagation } from "../../lib/utils";
import { useScrollLock } from "../AppRoot/ScrollContext";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { AlertActions } from "./AlertActions";
import { AlertHeader, AlertText } from "./AlertTypography";
/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */ export var Alert = function(_param) {
    var _param_actions = _param.actions, actions = _param_actions === void 0 ? [] : _param_actions, _param_actionsLayout = _param.actionsLayout, actionsLayout = _param_actionsLayout === void 0 ? "horizontal" : _param_actionsLayout, children = _param.children, className = _param.className, style = _param.style, text = _param.text, header = _param.header, onClose = _param.onClose, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Закрыть предупреждение" : _param_dismissLabel, renderAction = _param.renderAction, actionsAlign = _param.actionsAlign, restProps = _object_without_properties(_param, [
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
        "actionsAlign"
    ]);
    var generatedId = useId();
    var headerId = "vkui-alert-".concat(generatedId, "-header");
    var textId = "vkui-alert-".concat(generatedId, "-text");
    var platform = usePlatform();
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    var waitTransitionFinish = useWaitTransitionFinish().waitTransitionFinish;
    var _React_useState = _sliced_to_array(React.useState(false), 2), closing = _React_useState[0], setClosing = _React_useState[1];
    var elementRef = React.useRef(null);
    var timeout = platform === Platform.IOS ? 300 : 200;
    var close = React.useCallback(function() {
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
    var onItemClick = React.useCallback(function(item) {
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
    useScrollLock();
    return /*#__PURE__*/ React.createElement(PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: close
    }, /*#__PURE__*/ React.createElement(FocusTrap, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: elementRef,
        onClick: stopPropagation,
        onClose: close,
        timeout: timeout,
        className: classNames("vkuiAlert", platform === Platform.IOS && "vkuiAlert--ios", platform === Platform.VKCOM && "vkuiAlert--vkcom", closing && "vkuiAlert--closing", isDesktop && "vkuiAlert--desktop"),
        role: "alertdialog",
        "aria-modal": true,
        "aria-labelledby": headerId,
        "aria-describedby": textId
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiAlert__content"
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(AlertHeader, {
        id: headerId
    }, header), hasReactNode(text) && /*#__PURE__*/ React.createElement(AlertText, {
        id: textId
    }, text), children), /*#__PURE__*/ React.createElement(AlertActions, {
        actions: actions,
        actionsAlign: actionsAlign,
        actionsLayout: actionsLayout,
        renderAction: renderAction,
        onItemClick: onItemClick
    }), isDesktop && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        onClick: close,
        "aria-label": dismissLabel
    })));
};

//# sourceMappingURL=Alert.js.map