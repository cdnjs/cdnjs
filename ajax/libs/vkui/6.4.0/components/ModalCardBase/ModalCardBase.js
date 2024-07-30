import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useKeyboard } from '../../hooks/useKeyboard';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptivityContext } from '../AdaptivityProvider/AdaptivityContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { Spacing } from '../Spacing/Spacing';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Title } from '../Typography/Title/Title';
import { ModalCardBaseCloseButton } from './ModalCardBaseCloseButton';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */ export const ModalCardBase = (_param)=>{
    var { icon, header, headerComponent = 'span', subheader, subheaderComponent = 'span', children, actions, onClose, dismissLabel = 'Скрыть', style, size: sizeProp, modalDismissButtonTestId, dismissButtonMode = 'outside', preventClose } = _param, restProps = _object_without_properties(_param, [
        "icon",
        "header",
        "headerComponent",
        "subheader",
        "subheaderComponent",
        "children",
        "actions",
        "onClose",
        "dismissLabel",
        "style",
        "size",
        "modalDismissButtonTestId",
        "dismissButtonMode",
        "preventClose"
    ]);
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const isSoftwareKeyboardOpened = useKeyboard().isOpened;
    const size = isDesktop ? sizeProp : undefined;
    const withSafeZone = !icon && (dismissButtonMode === 'inside' || platform === 'ios' && !isDesktop && dismissButtonMode !== 'none');
    const hasHeader = hasReactNode(header);
    const hasSubheader = hasReactNode(subheader);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames('vkuiInternalModalCardBase', platform === 'ios' && "vkuiModalCardBase--ios", isDesktop && "vkuiModalCardBase--desktop", withSafeZone && "vkuiModalCardBase--withSafeZone"),
        style: _object_spread_props(_object_spread({}, style), {
            maxWidth: size
        }),
        children: /*#__PURE__*/ _jsxs("div", {
            className: classNames("vkuiModalCardBase__container", isSoftwareKeyboardOpened && "vkuiModalCardBase__container--softwareKeyboardOpened"),
            children: [
                hasReactNode(icon) && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiModalCardBase__icon",
                    children: icon
                }),
                hasReactNode(header) && /*#__PURE__*/ _jsx(Title, {
                    level: "2",
                    weight: "2",
                    className: "vkuiModalCardBase__header",
                    Component: headerComponent,
                    children: header
                }),
                hasHeader && hasSubheader && /*#__PURE__*/ _jsx(Spacing, {
                    size: 8
                }),
                hasSubheader && /*#__PURE__*/ _jsx(AdaptivityContext.Provider, {
                    value: {
                        sizeY: 'regular'
                    },
                    children: /*#__PURE__*/ _jsx(Subhead, {
                        className: "vkuiModalCardBase__subheader",
                        Component: subheaderComponent,
                        children: subheader
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