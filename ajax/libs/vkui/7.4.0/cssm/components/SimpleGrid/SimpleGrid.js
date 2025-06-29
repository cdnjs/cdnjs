import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { calculateGap, columnGapClassNames, rowGapClassNames } from "../../lib/layouts/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./SimpleGrid.module.css";
const marginClassNames = {
    'auto': styles.marginAuto,
    'auto-inline': styles.marginAutoInline,
    'auto-block': styles.marginAutoBlock
};
const alignClassNames = {
    start: styles.alignStart,
    end: styles.alignEnd,
    center: styles.alignCenter,
    stretch: styles.alignStretch,
    baseline: styles.alignBaseline
};
export const SimpleGrid = ({ columns = 1, gap, margin = 'none', minColWidth, align = 'stretch', ...props })=>{
    const style = {};
    const [rowGap, columnGap] = calculateGap(gap);
    if (typeof rowGap === 'number') {
        style['--vkui_internal--row_gap'] = `${rowGap}px`;
    }
    if (typeof columnGap === 'number') {
        style['--vkui_internal--column_gap'] = `${columnGap}px`;
    }
    style['--vkui_internal--grid_columns'] = `${columns}`;
    if (minColWidth) {
        style['--vkui_internal--min_col_width'] = `${minColWidth}px`;
    }
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...props,
        baseClassName: classNames(styles.host, margin !== 'none' && marginClassNames[margin], alignClassNames[align], minColWidth && styles.withMinWidth, typeof columnGap === 'string' && columnGapClassNames[columnGap], typeof rowGap === 'string' && rowGapClassNames[rowGap]),
        baseStyle: style
    });
};

//# sourceMappingURL=SimpleGrid.js.map