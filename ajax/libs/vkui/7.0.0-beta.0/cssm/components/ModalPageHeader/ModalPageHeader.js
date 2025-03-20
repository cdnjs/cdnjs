import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { ModalPageContext } from "../ModalPage/ModalPageContext.js";
import { PanelHeader } from "../PanelHeader/PanelHeader.js";
import { Separator } from "../Separator/Separator.js";
import styles from "./ModalPageHeader.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */ export const ModalPageHeader = ({ children, noSeparator = false, getRootRef, className, typographyProps, ...restProps })=>{
    const platform = usePlatform();
    const { isDesktop, sizeX } = useAdaptivityWithJSMediaQueries();
    const { labelId } = React.useContext(ModalPageContext);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.host, platform !== 'vkcom' && styles.withGaps, isDesktop && styles.desktop),
                ref: getRootRef,
                children: /*#__PURE__*/ _jsx(PanelHeader, {
                    className: classNames('vkuiInternalModalPageHeader__in', className),
                    typographyProps: {
                        Component: 'h2',
                        id: labelId,
                        ...typographyProps
                    },
                    ...restProps,
                    fixed: false,
                    delimiter: "none",
                    transparent: true,
                    children: children
                })
            }),
            !noSeparator && /*#__PURE__*/ _jsx(Separator, {
                wide: sizeX === 'regular'
            })
        ]
    });
};

//# sourceMappingURL=ModalPageHeader.js.map