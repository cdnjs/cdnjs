import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { Children } from 'react';
import { classNames } from '@vkontakte/vkjs';
import { calculateGap, columnGapClassNames, rowGapClassNames } from '../../lib/layouts';
import { RootComponent } from '../RootComponent/RootComponent';
import { FlexItem } from './FlexItem/FlexItem';
const justifyClassNames = {
    'start': "vkuiFlex--justify-start",
    'end': "vkuiFlex--justify-end",
    'center': "vkuiFlex--justify-center",
    'space-around': "vkuiFlex--justify-space-around",
    'space-between': "vkuiFlex--justify-space-between",
    'space-evenly': "vkuiFlex--justify-space-evenly"
};
const alignClassNames = {
    start: "vkuiFlex--align-start",
    end: "vkuiFlex--align-end",
    center: "vkuiFlex--align-center",
    stretch: "vkuiFlex--align-stretch",
    baseline: "vkuiFlex--align-baseline"
};
export const Flex = (_param)=>{
    var { gap, align, justify, margin = 'none', noWrap = false, direction = 'row', style: styleProp, reverse = false, children } = _param, props = _object_without_properties(_param, [
        "gap",
        "align",
        "justify",
        "margin",
        "noWrap",
        "direction",
        "style",
        "reverse",
        "children"
    ]);
    const withGaps = Children.count(children) > 1 && gap;
    const [columnGap, rowGap] = calculateGap(withGaps ? gap : undefined);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: classNames("vkuiFlex", !noWrap && "vkuiFlex--wrap", reverse && "vkuiFlex--reverse", direction !== 'row' && "vkuiFlex--direction-column", margin !== 'none' && "vkuiFlex--margin-auto", align && alignClassNames[align], justify && justifyClassNames[justify], withGaps && "vkuiFlex--withGaps", withGaps && getGapsPresets(rowGap, columnGap)),
        style: withGaps ? _object_spread({}, getGapsByUser(rowGap, columnGap), styleProp) : styleProp,
        children: children
    }));
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