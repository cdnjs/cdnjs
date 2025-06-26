import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import styles from "./DropZoneGrid.module.css";
const directionStyle = {
    row: styles.row,
    column: styles.column
};
export const DropZoneGrid = ({ direction = 'column', ...props })=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(styles.host, directionStyle[direction]),
        ...props
    });

//# sourceMappingURL=DropZoneGrid.js.map