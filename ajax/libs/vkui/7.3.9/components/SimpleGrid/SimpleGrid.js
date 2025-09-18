import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { calculateGap, columnGapClassNames, rowGapClassNames } from "../../lib/layouts/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const marginClassNames = {
    'auto': "vkuiSimpleGrid__marginAuto",
    'auto-inline': "vkuiSimpleGrid__marginAutoInline",
    'auto-block': "vkuiSimpleGrid__marginAutoBlock"
};
const alignClassNames = {
    start: "vkuiSimpleGrid__alignStart",
    end: "vkuiSimpleGrid__alignEnd",
    center: "vkuiSimpleGrid__alignCenter",
    stretch: "vkuiSimpleGrid__alignStretch",
    baseline: "vkuiSimpleGrid__alignBaseline"
};
export const SimpleGrid = (_param)=>{
    var { columns = 1, gap, margin = 'none', minColWidth, align = 'stretch' } = _param, props = _object_without_properties(_param, [
        "columns",
        "gap",
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
        baseClassName: classNames("vkuiSimpleGrid__host", margin !== 'none' && marginClassNames[margin], alignClassNames[align], minColWidth && "vkuiSimpleGrid__withMinWidth", typeof columnGap === 'string' && columnGapClassNames[columnGap], typeof rowGap === 'string' && rowGapClassNames[rowGap]),
        baseStyle: style
    }));
};

//# sourceMappingURL=SimpleGrid.js.map