'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { AdaptivityContext } from "../AdaptivityProvider/AdaptivityContext.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Spacing } from "../Spacing/Spacing.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Title } from "../Typography/Title/Title.js";
import { ModalCardBaseCloseButton } from "./ModalCardBaseCloseButton.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */ export const ModalCardBase = (_param)=>{
    var { icon, title, titleComponent = 'span', description, descriptionComponent = 'span', children, actions, onClose, dismissLabel = 'Скрыть', size: sizeProp, modalDismissButtonTestId, dismissButtonMode = 'outside', preventClose } = _param, restProps = _object_without_properties(_param, [
        "icon",
        "title",
        "titleComponent",
        "description",
        "descriptionComponent",
        "children",
        "actions",
        "onClose",
        "dismissLabel",
        "size",
        "modalDismissButtonTestId",
        "dismissButtonMode",
        "preventClose"
    ]);
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const size = isDesktop ? sizeProp : undefined;
    const withSafeZone = !icon && (dismissButtonMode === 'inside' || platform === 'ios' && !isDesktop && dismissButtonMode !== 'none');
    const hasTitle = hasReactNode(title);
    const hasDescription = hasReactNode(description);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames('vkuiInternalModalCardBase', platform === 'ios' && "vkuiModalCardBase__ios", isDesktop && "vkuiModalCardBase__desktop", withSafeZone && "vkuiModalCardBase__withSafeZone"),
        baseStyle: {
            maxWidth: size
        },
        children: /*#__PURE__*/ _jsxs("div", {
            className: "vkuiModalCardBase__container",
            children: [
                hasReactNode(icon) && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiModalCardBase__icon",
                    children: icon
                }),
                hasReactNode(title) && /*#__PURE__*/ _jsx(Title, {
                    level: "2",
                    weight: "2",
                    className: "vkuiModalCardBase__title",
                    Component: titleComponent,
                    children: title
                }),
                hasTitle && hasDescription && /*#__PURE__*/ _jsx(Spacing, {
                    size: 8
                }),
                hasDescription && /*#__PURE__*/ _jsx(AdaptivityContext.Provider, {
                    value: {
                        sizeY: 'regular'
                    },
                    children: /*#__PURE__*/ _jsx(Subhead, {
                        className: "vkuiModalCardBase__description",
                        Component: descriptionComponent,
                        children: description
                    })
                }),
                children,
                hasReactNode(actions) && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiModalCardBase__actions",
                    children: actions
                }),
                dismissButtonMode !== 'none' && /*#__PURE__*/ _jsx(ModalCardBaseCloseButton, {
                    testId: modalDismissButtonTestId,
                    onClose: onClose,
                    mode: dismissButtonMode,
                    children: dismissLabel
                })
            ]
        })
    }));
};

//# sourceMappingURL=ModalCardBase.js.map