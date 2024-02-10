"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const d3_color_1 = require("d3-color");
const utils_1 = __importDefault(require("../utils"));
const evaluate_1 = __importDefault(require("../evaluate"));
function Scatter(chart) {
    const xScale = chart.meta.xScale;
    const yScale = chart.meta.yScale;
    function scatter(selection) {
        selection.each(function (d) {
            let i, j;
            const index = d.index;
            const color = utils_1.default.color(d, index);
            const evaluatedData = (0, evaluate_1.default)(chart, d);
            // scatter doesn't need groups, therefore each group is
            // flattened into a single array
            const joined = [];
            for (i = 0; i < evaluatedData.length; i += 1) {
                for (j = 0; j < evaluatedData[i].length; j += 1) {
                    joined.push(evaluatedData[i][j]);
                }
            }
            const innerSelection = (0, d3_selection_1.select)(this).selectAll(':scope > circle.scatter').data(joined);
            const cls = `scatter scatter-${index}`;
            const innerSelectionEnter = innerSelection.enter().append('circle').attr('class', cls);
            const selection = innerSelection
                .merge(innerSelectionEnter)
                .attr('fill', (0, d3_color_1.hsl)(color.toString()).brighter(1.5).formatHex())
                .attr('stroke', color)
                .attr('opacity', 0.7)
                .attr('r', 1)
                .attr('cx', function (d) {
                return xScale(d[0]);
            })
                .attr('cy', function (d) {
                return yScale(d[1]);
            });
            if (d.attr) {
                for (const k in d.attr) {
                    // If the attribute to modify is class then append the default class
                    // or otherwise the d3 selection won't work.
                    let val = d.attr[k];
                    if (k === 'class') {
                        val = `${cls} ${d.attr[k]}`;
                    }
                    selection.attr(k, val);
                }
            }
            innerSelection.exit().remove();
        });
    }
    return scatter;
}
exports.default = Scatter;
//# sourceMappingURL=scatter.js.map