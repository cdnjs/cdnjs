import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { ModalPageContext } from '../ModalPage/ModalPageContext';
import { PanelHeader } from '../PanelHeader/PanelHeader';
import { Separator } from '../Separator/Separator';
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
    const { labelId } = React.useContext(ModalPageContext);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiModalPageHeader", platform !== 'vkcom' && "vkuiModalPageHeader--withGaps", isDesktop && "vkuiModalPageHeader--desktop"),
                ref: getRootRef,
                children: /*#__PURE__*/ _jsx(PanelHeader, _object_spread_props(_object_spread({
                    className: classNames('vkuiInternalModalPageHeader__in', className),
                    typographyProps: _object_spread({
                        Component: 'h2',
                        id: labelId
                    }, typographyProps)
                }, restProps), {
                    fixed: false,
                    delimiter: "none",
                    transparent: true,
                    children: children
                }))
            }),
            !noSeparator && /*#__PURE__*/ _jsx(Separator, {
                wide: sizeX === 'regular'
            })
        ]
    });
};

//# sourceMappingURL=ModalPageHeader.js.map