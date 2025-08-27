'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Separator } from "../Separator/Separator.js";
import styles from "./ModalPageFooter.module.css";
export const ModalPageFooter = ({ noSeparator = false, noPadding = false, children, ...restProps })=>{
    const { sizeX, isDesktop } = useAdaptivityWithJSMediaQueries();
    return /*#__PURE__*/ _jsxs(RootComponent, {
        baseClassName: classNames(styles.host, !noPadding && styles.padded, isDesktop ? styles.hostDesktop : styles.hostMobile),
        ...restProps,
        children: [
            !noSeparator && /*#__PURE__*/ _jsx(Separator, {
                className: styles.Separator,
                padding: sizeX !== 'regular'
            }),
            children
        ]
    });
};

//# sourceMappingURL=ModalPageFooter.js.map