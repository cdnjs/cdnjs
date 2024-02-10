import { select as d3Select } from 'd3-selection';
import { hsl as d3Hsl } from 'd3-color';
import { color } from '../utils.mjs';
import { builtInEvaluate } from '../evaluate-datum.js';
export default function Scatter(chart) {
    const xScale = chart.meta.xScale;
    const yScale = chart.meta.yScale;
    function scatter(selection) {
        selection.each(function (d) {
            const index = d.index;
            const computedColor = color(d, index);
            const evaluatedData = builtInEvaluate(chart, d);
            // scatter doesn't need groups, therefore each group is
            // flattened into a single array
            const joined = [];
            for (let i = 0; i < evaluatedData.length; i += 1) {
                for (let j = 0; j < evaluatedData[i].length; j += 1) {
                    joined.push(evaluatedData[i][j]);
                }
            }
            const innerSelection = d3Select(this).selectAll(':scope > circle.scatter').data(joined);
            const cls = `scatter scatter-${index}`;
            const innerSelectionEnter = innerSelection.enter().append('circle').attr('class', cls);
            const selection = innerSelection
                .merge(innerSelectionEnter)
                .attr('fill', d3Hsl(computedColor.toString()).brighter(1.5).formatHex())
                .attr('stroke', computedColor)
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
//# sourceMappingURL=scatter.js.map