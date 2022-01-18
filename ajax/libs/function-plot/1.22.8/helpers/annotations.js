"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_shape_1 = require("d3-shape");
const d3_selection_1 = require("d3-selection");
function annotations(options) {
    const xScale = options.owner.meta.xScale;
    const yScale = options.owner.meta.yScale;
    const line = d3_shape_1.line()
        .x(function (d) { return d[0]; })
        .y(function (d) { return d[1]; });
    return function (parentSelection) {
        parentSelection.each(function () {
            // join
            const current = d3_selection_1.select(this);
            const selection = current.selectAll('g.annotations')
                .data(function (d) { return d.annotations || []; });
            // enter
            const enter = selection.enter()
                .append('g')
                .attr('class', 'annotations');
            // enter + update
            // - path
            const yRange = yScale.range();
            const xRange = xScale.range();
            const path = selection.merge(enter).selectAll('path')
                .data(function (d) {
                if ('x' in d) {
                    return [[[0, yRange[0]], [0, yRange[1]]]];
                }
                else {
                    return [[[xRange[0], 0], [xRange[1], 0]]];
                }
            });
            path.enter()
                .append('path')
                .attr('stroke', '#eee')
                .attr('d', line);
            path.exit().remove();
            // enter + update
            // - text
            const text = selection.merge(enter).selectAll('text')
                .data(function (d) {
                return [{
                        text: d.text || '',
                        hasX: 'x' in d
                    }];
            });
            text.enter()
                .append('text')
                .attr('y', function (d) {
                return d.hasX ? 3 : 0;
            })
                .attr('x', function (d) {
                return d.hasX ? 0 : 3;
            })
                .attr('dy', function (d) {
                return d.hasX ? 5 : -5;
            })
                .attr('text-anchor', function (d) {
                return d.hasX ? 'end' : '';
            })
                .attr('transform', function (d) {
                return d.hasX ? 'rotate(-90)' : '';
            })
                .text(function (d) { return d.text; });
            text.exit().remove();
            // enter + update
            // move group
            selection.merge(enter)
                .attr('transform', function (d) {
                if ('x' in d) {
                    return 'translate(' + xScale(d.x) + ', 0)';
                }
                else {
                    return 'translate(0, ' + yScale(d.y) + ')';
                }
            });
            // exit
            selection.exit()
                .remove();
        });
    };
}
exports.default = annotations;
//# sourceMappingURL=annotations.js.map