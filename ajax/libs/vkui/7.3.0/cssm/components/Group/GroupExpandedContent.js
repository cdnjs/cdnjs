import { jsx as _jsx } from "react/jsx-runtime";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Group.module.css";
const stylesDirection = {
    inline: styles.expandedContentInline,
    block: styles.expandedContentBlock
};
export const GroupExpandedContent = ({ direction = 'inline', ...restProps })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        Component: "div",
        ...restProps,
        baseClassName: stylesDirection[direction]
    });
};

//# sourceMappingURL=GroupExpandedContent.js.map