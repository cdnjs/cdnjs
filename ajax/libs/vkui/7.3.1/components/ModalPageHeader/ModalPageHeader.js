'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useModalContext } from "../../context/ModalContext.js";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { PanelHeader } from "../PanelHeader/PanelHeader.js";
import { Separator } from "../Separator/Separator.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */ export const ModalPageHeader = (_param)=>{
    var { children, noSeparator = false, getRootRef, className, typographyProps } = _param, restProps = _object_without_properties(_param, [
        "children",
        "noSeparator",
        "getRootRef",
        "className",
        "typographyProps"
    ]);
    const platform = usePlatform();
    const { isDesktop, sizeX } = useAdaptivityWithJSMediaQueries();
    const modalContext = useModalContext();
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiModalPageHeader__host", platform !== 'vkcom' && "vkuiModalPageHeader__hostWithGaps", isDesktop && "vkuiModalPageHeader__hostDesktop"),
                ref: getRootRef,
                children: /*#__PURE__*/ _jsx(PanelHeader, _object_spread_props(_object_spread({
                    className: classNames('vkuiInternalModalPageHeader__in', className),
                    typographyProps: _object_spread({
                        Component: 'h2',
                        id: modalContext.labelId
                    }, typographyProps)
                }, restProps), {
                    fixed: false,
                    delimiter: "none",
                    transparent: true,
                    children: children
                }))
            }),
            !noSeparator && /*#__PURE__*/ _jsx(Separator, {
                padding: sizeX !== 'regular'
            })
        ]
    });
};

//# sourceMappingURL=ModalPageHeader.js.map