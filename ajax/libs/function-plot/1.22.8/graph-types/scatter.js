"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const d3_color_1 = require("d3-color");
const utils_1 = __importDefault(require("../utils"));
const evaluate_1 = __importDefault(require("../evaluate"));
function scatter(chart) {
    const xScale = chart.meta.xScale;
    const yScale = chart.meta.yScale;
    function scatter(selection) {
        selection.each(function (d) {
            let i, j;
            const index = d.index;
            const color = utils_1.default.color(d, index);
            const evaluatedData = evaluate_1.default(chart, d);
            // scatter doesn't need groups, therefore each group is
            // flattened into a single array
            const joined = [];
            for (i = 0; i < evaluatedData.length; i += 1) {
                for (j = 0; j < evaluatedData[i].length; j += 1) {
                    joined.push(evaluatedData[i][j]);
                }
            }
            const innerSelection = d3_selection_1.select(this)
                .selectAll(':scope > circle')
                .data(joined);
            const innerSelectionEnter = innerSelection.enter()
                .append('circle');
            const selection = innerSelection.merge(innerSelectionEnter)
                .attr('fill', d3_color_1.hsl(color.toString()).brighter(1.5).hex())
                .attr('stroke', color)
                .attr('opacity', 0.7)
                .attr('r', 1)
                .attr('cx', function (d) { return xScale(d[0]); })
                .attr('cy', function (d) { return yScale(d[1]); });
            if (d.attr) {
                for (let k in d.attr) {
                    if (d.attr.hasOwnProperty(k)) {
                        selection.attr(k, d.attr[k]);
                    }
                }
            }
            innerSelection.exit().remove();
        });
    }
    return scatter;
}
exports.default = scatter;
//# sourceMappingURL=scatter.js.map