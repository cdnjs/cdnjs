import { line as d3Line } from 'd3-shape';
import { select as d3Select } from 'd3-selection';
import { color, clamp, infinity, isValidNumber, getterSetter } from './utils.mjs';
import globals from './globals.mjs';
import { builtIn as builtInEvaluator } from './samplers/eval.mjs';
export default function mouseTip(config) {
    config = Object.assign({
        xLine: false,
        yLine: false,
        renderer: function (x, y) {
            return '(' + x.toFixed(3) + ', ' + y.toFixed(3) + ')';
        },
        owner: null
    }, config);
    const MARGIN = 20;
    const line = d3Line()
        .x(function (d) {
        return d[0];
    })
        .y(function (d) {
        return d[1];
    });
    function lineGenerator(el, data) {
        return el
            .append('path')
            .datum(data)
            .attr('stroke', 'grey')
            .attr('stroke-dasharray', '5,5')
            .attr('opacity', 0.5)
            .attr('d', line);
    }
    let tipInnerJoin, tipInnerEnter;
    function tip(selection) {
        const join = selection.selectAll('g.tip').data(function (d) {
            return [d];
        });
        // enter
        const tipEnter = join
            .enter()
            .append('g')
            .attr('class', 'tip')
            .attr('clip-path', 'url(#function-plot-clip-' + config.owner.id + ')');
        // enter + update = enter inner tip
        tipInnerJoin = join
            .merge(tipEnter)
            .selectAll('g.inner-tip')
            .data(function (d) {
            // debugger
            return [d];
        });
        tipInnerEnter = tipInnerJoin
            .enter()
            .append('g')
            .attr('class', 'inner-tip')
            .style('display', 'none')
            .each(function () {
            const el = d3Select(this);
            lineGenerator(el, [
                [0, -config.owner.meta.height - MARGIN],
                [0, config.owner.meta.height + MARGIN]
            ])
                .attr('class', 'tip-x-line')
                .style('display', 'none');
            lineGenerator(el, [
                [-config.owner.meta.width - MARGIN, 0],
                [config.owner.meta.width + MARGIN, 0]
            ])
                .attr('class', 'tip-y-line')
                .style('display', 'none');
            el.append('circle').attr('r', 3);
            el.append('text').attr('transform', 'translate(5,-5)');
        });
        // enter + update
        tipInnerJoin
            .merge(tipInnerEnter)
            .selectAll('.tip-x-line')
            .style('display', config.xLine ? null : 'none');
        tipInnerJoin
            .merge(tipInnerEnter)
            .selectAll('.tip-y-line')
            .style('display', config.yLine ? null : 'none');
    }
    tip.move = function (coordinates) {
        let minDist = Infinity;
        let closestIndex = -1;
        let x, y;
        const selection = tipInnerJoin.merge(tipInnerEnter);
        const meta = config.owner.meta;
        const data = selection.datum().data;
        const xScale = meta.xScale;
        const yScale = meta.yScale;
        const width = meta.width;
        const height = meta.height;
        const x0 = coordinates.x;
        const y0 = coordinates.y;
        for (let i = 0; i < data.length; i += 1) {
            // skipTip=true skips the evaluation in the datum
            // implicit equations cannot be evaluated with a single point
            // parametric equations cannot be evaluated with a single point
            // polar equations cannot be evaluated with a single point
            if (data[i].skipTip || data[i].fnType !== 'linear') {
                continue;
            }
            const range = data[i].range || [-infinity(), infinity()];
            let candidateY;
            if (x0 > range[0] - globals.TIP_X_EPS && x0 < range[1] + globals.TIP_X_EPS) {
                try {
                    candidateY = builtInEvaluator(data[i], 'fn', { x: x0 });
                }
                catch (e) { }
                if (isValidNumber(candidateY)) {
                    const tDist = Math.abs(candidateY - y0);
                    if (tDist < minDist) {
                        minDist = tDist;
                        closestIndex = i;
                    }
                }
            }
        }
        if (closestIndex !== -1) {
            x = x0;
            if (data[closestIndex].range) {
                x = Math.max(x, data[closestIndex].range[0]);
                x = Math.min(x, data[closestIndex].range[1]);
            }
            y = builtInEvaluator(data[closestIndex], 'fn', { x });
            tip.show();
            config.owner.emit('tip:update', { x, y, index: closestIndex });
            // @ts-ignore
            const clampX = clamp(x, xScale.invert(-MARGIN), xScale.invert(width + MARGIN));
            // @ts-ignore
            const clampY = clamp(y, yScale.invert(height + MARGIN), yScale.invert(-MARGIN));
            const computedColor = color(data[closestIndex], closestIndex);
            selection.style('color', 'red');
            selection.attr('transform', 'translate(' + xScale(clampX) + ',' + yScale(clampY) + ')');
            selection.select('circle').attr('fill', computedColor);
            selection.select('text').attr('fill', computedColor).text(config.renderer(x, y, closestIndex));
        }
        else {
            tip.hide();
        }
    };
    tip.show = function () {
        tipInnerJoin.merge(tipInnerEnter).style('display', null);
    };
    tip.hide = function () {
        tipInnerJoin.merge(tipInnerEnter).style('display', 'none');
    };
    // generations of getters/setters
    Object.keys(config).forEach(function (option) {
        getterSetter.call(tip, config, option);
    });
    return tip;
}
//# sourceMappingURL=tip.js.map