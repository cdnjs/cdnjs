import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { calculateGap, columnGapClassNames, rowGapClassNames } from '../../lib/layouts';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './SimpleGrid.module.css';
const marginClassNames = {
    'auto': styles['SimpleGrid--margin-auto'],
    'auto-inline': styles['SimpleGrid--margin-auto-inline'],
    'auto-block': styles['SimpleGrid--margin-auto-block']
};
const alignClassNames = {
    start: styles['SimpleGrid--align-start'],
    end: styles['SimpleGrid--align-end'],
    center: styles['SimpleGrid--align-center'],
    stretch: styles['SimpleGrid--align-stretch'],
    baseline: styles['SimpleGrid--align-baseline']
};
export const SimpleGrid = ({ columns = 1, gap, style: styleProp, margin = 'none', minColWidth, align = 'stretch', ...props })=>{
    const style = {};
    const [columnGap, rowGap] = calculateGap(gap);
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
        baseClassName: classNames(styles.SimpleGrid, margin !== 'none' && marginClassNames[margin], alignClassNames[align], minColWidth && styles['SimpleGrid--with-min-width'], typeof columnGap === 'string' && columnGapClassNames[columnGap], typeof rowGap === 'string' && rowGapClassNames[rowGap]),
        style: {
            ...style,
            ...styleProp
        }
    });
};

//# sourceMappingURL=SimpleGrid.js.map