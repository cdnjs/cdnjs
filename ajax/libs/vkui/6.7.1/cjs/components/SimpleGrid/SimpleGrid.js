"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SimpleGrid", {
    enumerable: true,
    get: function() {
        return SimpleGrid;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _layouts = require("../../lib/layouts");
const _RootComponent = require("../RootComponent/RootComponent");
const marginClassNames = {
    'auto': "vkuiSimpleGrid--margin-auto",
    'auto-inline': "vkuiSimpleGrid--margin-auto-inline",
    'auto-block': "vkuiSimpleGrid--margin-auto-block"
};
const alignClassNames = {
    start: "vkuiSimpleGrid--align-start",
    end: "vkuiSimpleGrid--align-end",
    center: "vkuiSimpleGrid--align-center",
    stretch: "vkuiSimpleGrid--align-stretch",
    baseline: "vkuiSimpleGrid--align-baseline"
};
const SimpleGrid = (_param)=>{
    var { columns = 1, gap, style: styleProp, margin = 'none', minColWidth, align = 'stretch' } = _param, props = _object_without_properties._(_param, [
        "columns",
        "gap",
        "style",
        "margin",
        "minColWidth",
        "align"
    ]);
    const style = {};
    const [columnGap, rowGap] = (0, _layouts.calculateGap)(gap);
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, props), {
        baseClassName: (0, _vkjs.classNames)("vkuiSimpleGrid", margin !== 'none' && marginClassNames[margin], alignClassNames[align], minColWidth && "vkuiSimpleGrid--with-min-width", typeof columnGap === 'string' && _layouts.columnGapClassNames[columnGap], typeof rowGap === 'string' && _layouts.rowGapClassNames[rowGap]),
        style: _object_spread._({}, style, styleProp)
    }));
};

//# sourceMappingURL=SimpleGrid.js.map