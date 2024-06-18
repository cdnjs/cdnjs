import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiModalPageHeader", platform !== 'vkcom' && "vkuiModalPageHeader--withGaps", isDesktop && "vkuiModalPageHeader--desktop"),
        ref: getRootRef
    }, /*#__PURE__*/ React.createElement(PanelHeader, _object_spread_props(_object_spread({
        className: classNames('vkuiInternalModalPageHeader__in', className),
        typographyProps: _object_spread({
            Component: 'h2',
            id: labelId
        }, typographyProps)
    }, restProps), {
        fixed: false,
        delimiter: "none",
        transparent: true
    }), children), !noSeparator && /*#__PURE__*/ React.createElement(Separator, {
        wide: sizeX === 'regular'
    }));
};

//# sourceMappingURL=ModalPageHeader.js.map