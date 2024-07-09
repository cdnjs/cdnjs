"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const d3_shape_1 = require("d3-shape");
const utils_1 = __importDefault(require("../utils"));
const evaluate_1 = __importDefault(require("../evaluate"));
function polyline(chart) {
    function plotLine(selection) {
        selection.each(function (d) {
            const el = (plotLine.el = (0, d3_selection_1.select)(this));
            const index = d.index;
            const evaluatedData = (0, evaluate_1.default)(chart, d);
            const color = utils_1.default.color(d, index);
            // join
            const innerSelection = el.selectAll(':scope > path.line').data(evaluatedData);
            const yRange = chart.meta.yScale.range();
            let yMax = yRange[0];
            let yMin = yRange[1];
            // workaround, clamp assuming that the bounds are finite but huge
            const diff = yMax - yMin;
            yMax += diff * 1e6;
            yMin -= diff * 1e6;
            if (d.skipBoundsCheck) {
                yMax = utils_1.default.infinity();
                yMin = -utils_1.default.infinity();
            }
            function y(d) {
                return utils_1.default.clamp(chart.meta.yScale(d[1]), yMin, yMax);
            }
            const line = (0, d3_shape_1.line)()
                .curve(d3_shape_1.curveLinear)
                .x(function (d) {
                return chart.meta.xScale(d[0]);
            })
                .y(y);
            const area = (0, d3_shape_1.area)()
                .x(function (d) {
                return chart.meta.xScale(d[0]);
            })
                .y0(chart.meta.yScale(0))
                .y1(y);
            const cls = `line line-${index}`;
            const innerSelectionEnter = innerSelection
                .enter()
                .append('path')
                .attr('class', cls)
                .attr('stroke-width', 1)
                .attr('stroke-linecap', 'round');
            // enter + update
            innerSelection.merge(innerSelectionEnter).each(function () {
                const path = (0, d3_selection_1.select)(this);
                let pathD;
                if (d.closed) {
                    path.attr('fill', color);
                    path.attr('fill-opacity', 0.3);
                    pathD = area;
                }
                else {
                    path.attr('fill', 'none');
                    pathD = line;
                }
                path
                    .attr('stroke', color)
                    .attr('marker-end', function () {
                    // special marker for vectors
                    return d.fnType === 'vector' ? 'url(#' + chart.markerId + ')' : null;
                })
                    .attr('d', pathD);
                if (d.attr) {
                    for (const k in d.attr) {
                        // If the attribute to modify is class then append the default class
                        // or otherwise the d3 selection won't work.
                        let val = d.attr[k];
                        if (k === 'class') {
                            val = `${cls} ${d.attr[k]}`;
                        }
                        path.attr(k, val);
                    }
                }
            });
            // exit
            innerSelection.exit().remove();
        });
    }
    return plotLine;
}
exports.default = polyline;
//# sourceMappingURL=polyline.js.map