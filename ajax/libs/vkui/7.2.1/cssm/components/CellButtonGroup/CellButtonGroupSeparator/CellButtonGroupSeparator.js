import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { Separator } from "../../Separator/Separator.js";
import styles from "./CellButtonGroupSeparator.module.css";
export const CellButtonGroupSeparator = ({ className, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Separator, {
        className: classNames(styles.root, className),
        ...restProps,
        direction: "vertical",
        padding: true
    });
};
CellButtonGroupSeparator.displayName = 'CellButtonGroupSeparator';

//# sourceMappingURL=CellButtonGroupSeparator.js.map