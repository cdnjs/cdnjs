'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20Cancel } from "@vkontakte/icons";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useCSSKeyframesAnimationController } from "../../lib/animation/index.js";
import { stopPropagation } from "../../lib/utils.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import { IconButton } from "../IconButton/IconButton.js";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton.js";
import { AlertActions } from "./AlertActions.js";
import { AlertDescription, AlertTitle } from "./AlertTypography.js";
export const AlertBase = (_param)=>{
    var { actions, actionsLayout = 'horizontal', children, title, description, onClose, dismissLabel = 'Закрыть предупреждение', renderAction, actionsAlign, dismissButtonMode = 'outside', dismissButtonTestId, onClick, allowClickPropagation = false, titleTestId, descriptionTestId, closing, setClosing } = _param, restProps = _object_without_properties(_param, [
        "actions",
        "actionsLayout",
        "children",
        "title",
        "description",
        "onClose",
        "dismissLabel",
        "renderAction",
        "actionsAlign",
        "dismissButtonMode",
        "dismissButtonTestId",
        "onClick",
        "allowClickPropagation",
        "titleTestId",
        "descriptionTestId",
        "closing",
        "setClosing"
    ]);
    const generatedId = React.useId();
    const titleId = `vkui-alert-${generatedId}-title`;
    const descriptionId = `vkui-alert-${generatedId}-description`;
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const itemActionCallbackRef = React.useRef(noop);
    const [animationState, animationHandlers] = useCSSKeyframesAnimationController(closing ? 'exit' : 'enter', {
        onExited () {
            itemActionCallbackRef.current();
            itemActionCallbackRef.current = noop;
            onClose();
        }
    });
    const isDismissButtonVisible = isDesktop && platform !== 'ios';
    const elementRef = React.useRef(null);
    const close = React.useCallback(()=>{
        setClosing === null || setClosing === void 0 ? void 0 : setClosing(true);
    }, [
        setClosing
    ]);
    const onItemClick = React.useCallback((item)=>{
        const { action: itemAction, autoCloseDisabled = false } = item;
        if (autoCloseDisabled) {
            itemAction && itemAction({
                close
            });
        } else {
            if (itemAction) {
                itemActionCallbackRef.current = itemAction;
            }
            setClosing === null || setClosing === void 0 ? void 0 : setClosing(true);
        }
    }, [
        close,
        setClosing
    ]);
    const handleClick = allowClickPropagation ? onClick : (event)=>{
        stopPropagation(event);
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
    };
    return /*#__PURE__*/ _jsxs(FocusTrap, _object_spread_props(_object_spread(_object_spread_props(_object_spread({}, animationHandlers), {
        onClick: handleClick,
        getRootRef: elementRef,
        onClose: close,
        autoFocus: animationState === 'entered',
        className: classNames("vkuiAlert__host", platform === 'ios' && "vkuiAlert__ios", platform === 'vkcom' && "vkuiAlert__vkcom", closing ? "vkuiAlert__closing" : "vkuiAlert__opening", isDesktop && "vkuiAlert__desktop"),
        role: "alertdialog",
        "aria-modal": true,
        "aria-labelledby": titleId,
        "aria-describedby": descriptionId
    }), restProps), {
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: classNames("vkuiAlert__content", dismissButtonMode === 'inside' && "vkuiAlert__contentWithButton"),
                children: [
                    hasReactNode(title) && /*#__PURE__*/ _jsx(AlertTitle, {
                        "data-testid": titleTestId,
                        id: titleId,
                        children: title
                    }),
                    hasReactNode(description) && /*#__PURE__*/ _jsx(AlertDescription, {
                        "data-testid": descriptionTestId,
                        id: descriptionId,
                        children: description
                    }),
                    children,
                    isDismissButtonVisible && dismissButtonMode === 'inside' && /*#__PURE__*/ _jsx(IconButton, {
                        label: dismissLabel,
                        className: classNames("vkuiAlert__dismiss", 'vkuiInternalAlert__dismiss'),
                        onClick: close,
                        hoverMode: "opacity",
                        activeMode: "opacity",
                        "data-testid": dismissButtonTestId,
                        children: /*#__PURE__*/ _jsx(Icon20Cancel, {})
                    })
                ]
            }),
            isDismissButtonVisible && dismissButtonMode === 'outside' && /*#__PURE__*/ _jsx(ModalDismissButton, {
                onClick: close,
                "data-testid": dismissButtonTestId,
                children: dismissLabel
            }),
            /*#__PURE__*/ _jsx(AlertActions, {
                actions: actions,
                actionsAlign: actionsAlign,
                actionsLayout: actionsLayout,
                renderAction: renderAction,
                onItemClick: onItemClick
            })
        ]
    }));
};

//# sourceMappingURL=AlertBase.js.map