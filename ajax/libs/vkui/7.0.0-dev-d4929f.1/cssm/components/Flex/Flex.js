import { jsx as _jsx } from "react/jsx-runtime";
import { Children } from "react";
import { classNames } from "@vkontakte/vkjs";
import { calculateGap, columnGapClassNames, rowGapClassNames } from "../../lib/layouts/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { FlexItem } from "./FlexItem/FlexItem.js";
import styles from "./Flex.module.css";
const justifyClassNames = {
    'start': styles.justifyStart,
    'end': styles.justifyEnd,
    'center': styles.justifyCenter,
    'space-around': styles.justifySpaceAround,
    'space-between': styles.justifySpaceBetween,
    'space-evenly': styles.justifySpaceEvenly
};
const alignClassNames = {
    start: styles.alignStart,
    end: styles.alignEnd,
    center: styles.alignCenter,
    stretch: styles.alignStretch,
    baseline: styles.alignBaseline
};
export const Flex = ({ gap, align, justify, margin = 'none', noWrap = false, direction = 'row', style: styleProp, reverse = false, children, ...props })=>{
    const withGaps = Children.count(children) > 1 && gap;
    const [rowGap, columnGap] = calculateGap(withGaps ? gap : undefined);
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...props,
        baseClassName: classNames(styles.host, !noWrap && styles.wrap, reverse && styles.reverse, direction !== 'row' && styles.directionColumn, margin !== 'none' && styles.marginAuto, align && alignClassNames[align], justify && justifyClassNames[justify], withGaps && styles.withGaps, withGaps && getGapsPresets(rowGap, columnGap)),
        style: withGaps ? {
            ...getGapsByUser(rowGap, columnGap),
            ...styleProp
        } : styleProp,
        children: children
    });
};
function getGapsPresets(rowGap, columnGap) {
    return classNames(typeof rowGap === 'string' && rowGapClassNames[rowGap], typeof columnGap === 'string' && columnGapClassNames[columnGap]);
}
function getGapsByUser(rowGap, columnGap) {
    const style = {};
    if (typeof rowGap === 'number') {
        style['--vkui_internal--row_gap'] = `${rowGap}px`;
    }
    if (typeof columnGap === 'number') {
        style['--vkui_internal--column_gap'] = `${columnGap}px`;
    }
    return style;
}
Flex.Item = FlexItem;

//# sourceMappingURL=Flex.js.map