import { select as d3Select } from 'd3-selection';
import { asyncIntervalEvaluate, intervalEvaluate } from '../evaluate-datum.js';
import { infinity, color } from '../utils.mjs';
function clampRange(minWidthHeight, vLo, vHi, gLo, gHi) {
    // issue 69
    // by adding the option `invert` to both the xAxis and the `yAxis`
    // it might be possible that after the transformation to canvas space
    // the y limits of the rectangle get inverted i.e. gLo > gHi
    //
    // e.g.
    //
    //   functionPlot({
    //     target: '#playground',
    //     yAxis: { invert: true },
    //     // ...
    //   })
    //
    if (gLo > gHi) {
        const t = gLo;
        gLo = gHi;
        gHi = t;
    }
    const hi = Math.min(vHi, gHi);
    const lo = Math.max(vLo, gLo);
    if (lo > hi) {
        // no overlap
        return [-minWidthHeight, 0];
    }
    return [lo, hi];
}
export function createPathD(xScale, yScale, minWidthHeight, points, closed) {
    let path = '';
    const range = yScale.range();
    const minY = Math.min.apply(Math, range);
    const maxY = Math.max.apply(Math, range);
    for (let i = 0, length = points.length; i < length; i += 1) {
        if (points[i]) {
            const x = points[i][0];
            const y = points[i][1];
            let yLo = y.lo;
            let yHi = y.hi;
            // if options.closed is set to true then one of the bounds must be zero
            if (closed) {
                yLo = Math.min(yLo, 0);
                yHi = Math.max(yHi, 0);
            }
            // points.scaledDX is added because of the stroke-width
            const moveX = xScale(x.lo) + points.scaledDx / 2;
            const viewportY = clampRange(minWidthHeight, minY, maxY, isFinite(yHi) ? yScale(yHi) : -infinity(), isFinite(yLo) ? yScale(yLo) : infinity());
            const vLo = viewportY[0];
            const vHi = viewportY[1];
            path += ' M ' + moveX + ' ' + vLo;
            path += ' v ' + Math.max(vHi - vLo, minWidthHeight);
        }
    }
    return path;
}
export default function interval(chart) {
    const xScale = chart.meta.xScale;
    const yScale = chart.meta.yScale;
    function plotLine(selection) {
        selection.each(async function (d) {
            const el = (plotLine.el = d3Select(this));
            const index = d.index;
            const closed = d.closed;
            let evaluatedData;
            if (d.fnType === 'linear' && typeof d.fn === 'string' && d.sampler === 'asyncInterval') {
                evaluatedData = await asyncIntervalEvaluate(chart, d);
            }
            else {
                evaluatedData = intervalEvaluate(chart, d);
            }
            const innerSelection = el.selectAll(':scope > path.line').data(evaluatedData);
            // the min height/width of the rects drawn by the path generator
            const minWidthHeight = Math.max(evaluatedData[0].scaledDx, 1);
            const cls = `line line-${index}`;
            const innerSelectionEnter = innerSelection.enter().append('path').attr('class', cls).attr('fill', 'none');
            // enter + update
            const selection = innerSelection
                .merge(innerSelectionEnter)
                .attr('stroke-width', minWidthHeight)
                .attr('stroke', color(d, index))
                .attr('opacity', closed ? 0.5 : 1)
                .attr('d', function (d) {
                return createPathD(xScale, yScale, minWidthHeight, d, closed);
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
    return plotLine;
}
//# sourceMappingURL=interval.js.map