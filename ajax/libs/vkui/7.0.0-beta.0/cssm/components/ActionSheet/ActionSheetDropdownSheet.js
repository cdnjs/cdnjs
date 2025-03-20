import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import styles from "./ActionSheet.module.css";
const stopPropagation = (e)=>e.stopPropagation();
export const ActionSheetDropdownSheet = ({ children, closing, // these 2 props are only omitted - ActionSheetDesktop compat
toggleRef, className, ...restProps })=>{
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(FocusTrap, {
        ...restProps,
        onClick: stopPropagation,
        className: classNames(styles.host, platform === 'ios' && styles.ios, closing ? styles.closing : styles.opening, sizeY === 'compact' && styles.sizeYCompact, className),
        children: children
    });
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map