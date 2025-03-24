import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { calculateGap, columnGapClassNames, rowGapClassNames } from "../../lib/layouts/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const marginClassNames = {
    'auto': "SimpleGrid__marginAuto--c3m9Z",
    'auto-inline': "SimpleGrid__marginAutoInline--Ww24V",
    'auto-block': "SimpleGrid__marginAutoBlock--dd4zz"
};
const alignClassNames = {
    start: "SimpleGrid__alignStart--E2Xgj",
    end: "SimpleGrid__alignEnd--Mg81Z",
    center: "SimpleGrid__alignCenter--2-J3M",
    stretch: "SimpleGrid__alignStretch--ZRlUf",
    baseline: "SimpleGrid__alignBaseline--AR9Eb"
};
export const SimpleGrid = (_param)=>{
    var { columns = 1, gap, style: styleProp, margin = 'none', minColWidth, align = 'stretch' } = _param, props = _object_without_properties(_param, [
        "columns",
        "gap",
        "style",
        "margin",
        "minColWidth",
        "align"
    ]);
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, props), {
        baseClassName: classNames("SimpleGrid__host--2CkXE", margin !== 'none' && marginClassNames[margin], alignClassNames[align], minColWidth && "SimpleGrid__withMinWidth--ptgN-", typeof columnGap === 'string' && columnGapClassNames[columnGap], typeof rowGap === 'string' && rowGapClassNames[rowGap]),
        style: _object_spread({}, style, styleProp)
    }));
};

//# sourceMappingURL=SimpleGrid.js.map