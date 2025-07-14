import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import styles from "./FlexItem.module.css";
const flexClassNames = {
    grow: styles.flexGrow,
    shrink: styles.flexShrink,
    content: styles.flexContent,
    fixed: styles.flexFixed
};
const alignSelfClassNames = {
    start: styles.alignSelfStart,
    end: styles.alignSelfEnd,
    center: styles.alignSelfCenter,
    baseline: styles.alignSelfBaseline,
    stretch: styles.alignSelfStretch
};
export const FlexItem = ({ children, alignSelf, flex, flexBasis, ...rest })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...rest,
        baseStyle: {
            flexBasis
        },
        baseClassName: classNames(alignSelf && alignSelfClassNames[alignSelf], flex && flexClassNames[flex]),
        children: children
    });
};

//# sourceMappingURL=FlexItem.js.map