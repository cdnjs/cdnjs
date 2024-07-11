import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
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
    var { gap, align, justify, margin = 'none', noWrap = false, direction = 'row', style: styleProp, reverse = false } = _param, props = _object_without_properties(_param, [
        "gap",
        "align",
        "justify",
        "margin",
        "noWrap",
        "direction",
        "style",
        "reverse"
    ]);
    const [columnGap, rowGap] = calculateGap(gap);
    const style = {};
    if (typeof rowGap === 'number') {
        style['--vkui_internal--row_gap'] = `${rowGap}px`;
    }
    if (typeof columnGap === 'number') {
        style['--vkui_internal--column_gap'] = `${columnGap}px`;
    }
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: classNames("vkuiFlex", !noWrap && "vkuiFlex--wrap", reverse && "vkuiFlex--reverse", direction !== 'row' && "vkuiFlex--direction-column", margin !== 'none' && "vkuiFlex--margin-auto", typeof columnGap === 'string' && columnGapClassNames[columnGap], typeof rowGap === 'string' && rowGapClassNames[rowGap], align && alignClassNames[align], justify && justifyClassNames[justify]),
        style: _object_spread({}, styleProp, style)
    }));
};
Flex.Item = FlexItem;

//# sourceMappingURL=Flex.js.map