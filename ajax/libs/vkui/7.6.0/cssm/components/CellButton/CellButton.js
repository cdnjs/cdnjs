import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { SimpleCell } from "../SimpleCell/SimpleCell.js";
import "../SimpleCell/SimpleCell.module.css";
import styles from "./CellButton.module.css";
export const appearanceClassNames = {
    accent: styles.appearanceAccent,
    neutral: styles.appearanceNeutral,
    negative: styles.appearanceNegative
};
/**
 * @see https://vkui.io/components/cell-button
 */ export const CellButton = ({ centered = false, appearance = 'accent', className, ...restProps })=>{
    return /*#__PURE__*/ _jsx(SimpleCell, {
        ...restProps,
        className: classNames(styles.host, appearanceClassNames[appearance], centered && styles.centered, className)
    });
};

//# sourceMappingURL=CellButton.js.map