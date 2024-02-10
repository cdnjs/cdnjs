"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const d3_color_1 = require("d3-color");
const utils_1 = __importDefault(require("../utils"));
function Text(chart) {
    const xScale = chart.meta.xScale;
    const yScale = chart.meta.yScale;
    function text(selection) {
        selection.each(function (d) {
            // Force some parameters to make it look like a vector.
            d.sampler = 'builtIn';
            d.fnType = 'vector';
            const innerSelection = (0, d3_selection_1.select)(this).selectAll(':scope > text.fn-text').data([d.location]);
            const innerSelectionEnter = innerSelection.enter().append('text').attr('class', `fn-text fn-text-${d.index}`);
            const color = utils_1.default.color(d, d.index);
            // enter + update
            const selection = innerSelection
                .merge(innerSelectionEnter)
                .attr('fill', (0, d3_color_1.hsl)(color.toString()).brighter(1.5).formatHex())
                .attr('x', (d) => xScale(d[0]))
                .attr('y', (d) => yScale(d[1]))
                .text(() => d.text);
            if (d.attr) {
                for (const k in d.attr) {
                    selection.attr(k, d.attr[k]);
                }
            }
            // exit
            innerSelection.exit().remove();
        });
    }
    return text;
}
exports.default = Text;
//# sourceMappingURL=text.js.map