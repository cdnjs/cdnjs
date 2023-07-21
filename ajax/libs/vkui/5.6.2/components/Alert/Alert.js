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
import { Button } from "../Button/Button";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { Tappable } from "../Tappable/Tappable";
import { Caption } from "../Typography/Caption/Caption";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
var AlertHeader = function(props) {
    var platform = usePlatform();
    switch(platform){
        case Platform.IOS:
            return /*#__PURE__*/ React.createElement(Title, _object_spread({
                className: "vkuiAlert__header",
                weight: "1",
                level: "3"
            }, props));
        default:
            return /*#__PURE__*/ React.createElement(Title, _object_spread({
                className: "vkuiAlert__header",
                weight: "2",
                level: "2"
            }, props));
    }
};
var AlertText = function(props) {
    var platform = usePlatform();
    switch(platform){
        case Platform.VKCOM:
            return /*#__PURE__*/ React.createElement(Footnote, _object_spread({
                className: "vkuiAlert__text"
            }, props));
        case Platform.IOS:
            return /*#__PURE__*/ React.createElement(Caption, _object_spread({
                className: "vkuiAlert__text"
            }, props));
        default:
            return /*#__PURE__*/ React.createElement(Text, _object_spread({
                Component: "span",
                className: "vkuiAlert__text",
                weight: "3"
            }, props));
    }
};
var AlertAction = function(_param) {
    var action = _param.action, onItemClick = _param.onItemClick, restProps = _object_without_properties(_param, [
        "action",
        "onItemClick"
    ]);
    var platform = usePlatform();
    var handleItemClick = React.useCallback(function() {
        return onItemClick(action);
    }, [
        onItemClick,
        action
    ]);
    if (platform === Platform.IOS) {
        var title = action.title, actionProp = action.action, autoClose = action.autoClose, mode = action.mode, restActionProps = _object_without_properties(action, [
            "title",
            "action",
            "autoClose",
            "mode"
        ]);
        return /*#__PURE__*/ React.createElement(Tappable, _object_spread({
            Component: restActionProps.href ? "a" : "button",
            className: classNames("vkuiAlert__action", mode === "destructive" && "vkuiAlert__action--mode-destructive", mode === "cancel" && "vkuiAlert__action--mode-cancel"),
            onClick: handleItemClick
        }, restActionProps, restProps), title);
    }
    var mode1 = "tertiary";
    if (platform === Platform.VKCOM) {
        mode1 = action.mode === "cancel" ? "secondary" : "primary";
    }
    return /*#__PURE__*/ React.createElement(Button, {
        className: classNames("vkuiAlert__button", action.mode === "cancel" && "vkuiAlert__button--mode-cancel"),
        mode: mode1,
        size: "m",
        onClick: handleItemClick,
        Component: action.Component,
        href: action.href,
        target: action.target
    }, action.title);
};
/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */ export var Alert = function(_param) {
    var _param_actions = _param.actions, actions = _param_actions === void 0 ? [] : _param_actions, _param_actionsLayout = _param.actionsLayout, actionsLayout = _param_actionsLayout === void 0 ? "horizontal" : _param_actionsLayout, children = _param.children, className = _param.className, style = _param.style, text = _param.text, header = _param.header, onClose = _param.onClose, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Закрыть предупреждение" : _param_dismissLabel, restProps = _object_without_properties(_param, [
        "actions",
        "actionsLayout",
        "children",
        "className",
        "style",
        "text",
        "header",
        "onClose",
        "dismissLabel"
    ]);
    var generatedId = useId();
    var headerId = "vkui-alert-".concat(generatedId, "-header");
    var textId = "vkui-alert-".concat(generatedId, "-text");
    var platform = usePlatform();
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    var waitTransitionFinish = useWaitTransitionFinish().waitTransitionFinish;
    var _React_useState = _sliced_to_array(React.useState(false), 2), closing = _React_useState[0], setClosing = _React_useState[1];
    var elementRef = React.useRef(null);
    var resolvedActionsLayout = platform === Platform.VKCOM ? "horizontal" : actionsLayout;
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
        className: classNames("vkuiAlert", platform === Platform.IOS && "vkuiAlert--ios", platform === Platform.VKCOM && "vkuiAlert--vkcom", resolvedActionsLayout === "vertical" ? "vkuiAlert--v" : "vkuiAlert--h", closing && "vkuiAlert--closing", isDesktop && "vkuiAlert--desktop"),
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
    }, text), children), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiAlert__actions"
    }, actions.map(function(action, i) {
        return /*#__PURE__*/ React.createElement(AlertAction, {
            key: i,
            action: action,
            onItemClick: onItemClick
        });
    })), isDesktop && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        onClick: close,
        "aria-label": dismissLabel
    })));
};

//# sourceMappingURL=Alert.js.map