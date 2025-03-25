import { jsx as _jsx } from "react/jsx-runtime";
import { Children } from 'react';
import { classNames } from '@vkontakte/vkjs';
import { calculateGap, columnGapClassNames, rowGapClassNames } from '../../lib/layouts';
import { RootComponent } from '../RootComponent/RootComponent';
import { FlexItem } from './FlexItem/FlexItem';
import styles from './Flex.module.css';
const justifyClassNames = {
    'start': styles['Flex--justify-start'],
    'end': styles['Flex--justify-end'],
    'center': styles['Flex--justify-center'],
    'space-around': styles['Flex--justify-space-around'],
    'space-between': styles['Flex--justify-space-between'],
    'space-evenly': styles['Flex--justify-space-evenly']
};
const alignClassNames = {
    start: styles['Flex--align-start'],
    end: styles['Flex--align-end'],
    center: styles['Flex--align-center'],
    stretch: styles['Flex--align-stretch'],
    baseline: styles['Flex--align-baseline']
};
export const Flex = ({ gap, align, justify, margin = 'none', noWrap = false, direction = 'row', style: styleProp, reverse = false, children, ...props })=>{
    const withGaps = Children.count(children) > 1 && gap;
    const [columnGap, rowGap] = calculateGap(withGaps ? gap : undefined);
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...props,
        baseClassName: classNames(styles.Flex, !noWrap && styles['Flex--wrap'], reverse && styles['Flex--reverse'], direction !== 'row' && styles['Flex--direction-column'], margin !== 'none' && styles['Flex--margin-auto'], align && alignClassNames[align], justify && justifyClassNames[justify], withGaps && styles['Flex--withGaps'], withGaps && getGapsPresets(rowGap, columnGap)),
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