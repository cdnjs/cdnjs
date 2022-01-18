"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_shape_1 = require("d3-shape");
const d3_selection_1 = require("d3-selection");
const clamp_1 = __importDefault(require("clamp"));
const utils_1 = __importDefault(require("./utils"));
const globals_1 = __importDefault(require("./globals"));
const eval_1 = require("./helpers/eval");
function mouseTip(config) {
    config = Object.assign({
        xLine: false,
        yLine: false,
        renderer: function (x, y) {
            return '(' + x.toFixed(3) + ', ' + y.toFixed(3) + ')';
        },
        owner: null
    }, config);
    const MARGIN = 20;
    const line = d3_shape_1.line()
        .x(function (d) { return d[0]; })
        .y(function (d) { return d[1]; });
    function lineGenerator(el, data) {
        return el.append('path')
            .datum(data)
            .attr('stroke', 'grey')
            .attr('stroke-dasharray', '5,5')
            .attr('opacity', 0.5)
            .attr('d', line);
    }
    let tipInnerJoin, tipInnerEnter;
    function tip(selection) {
        const join = selection
            .selectAll('g.tip')
            .data(function (d) { return [d]; });
        // enter
        const tipEnter = join
            .enter().append('g')
            .attr('class', 'tip')
            .attr('clip-path', 'url(#function-plot-clip-' + config.owner.id + ')');
        // enter + update = enter inner tip
        tipInnerJoin = join.merge(tipEnter)
            .selectAll('g.inner-tip')
            .data(function (d) {
            // debugger
            return [d];
        });
        tipInnerEnter = tipInnerJoin.enter()
            .append('g')
            .attr('class', 'inner-tip')
            .style('display', 'none')
            .each(function () {
            const el = d3_selection_1.select(this);
            lineGenerator(el, [[0, -config.owner.meta.height - MARGIN], [0, config.owner.meta.height + MARGIN]])
                .attr('class', 'tip-x-line')
                .style('display', 'none');
            lineGenerator(el, [[-config.owner.meta.width - MARGIN, 0], [config.owner.meta.width + MARGIN, 0]])
                .attr('class', 'tip-y-line')
                .style('display', 'none');
            el.append('circle').attr('r', 3);
            el.append('text').attr('transform', 'translate(5,-5)');
        });
        // enter + update
        tipInnerJoin.merge(tipInnerEnter)
            .selectAll('.tip-x-line').style('display', config.xLine ? null : 'none');
        tipInnerJoin.merge(tipInnerEnter)
            .selectAll('.tip-y-line').style('display', config.yLine ? null : 'none');
    }
    tip.move = function (coordinates) {
        let i;
        let minDist = Infinity;
        let closestIndex = -1;
        let x, y;
        const selection = tipInnerJoin.merge(tipInnerEnter);
        const inf = 1e8;
        const meta = config.owner.meta;
        const data = selection.datum().data;
        const xScale = meta.xScale;
        const yScale = meta.yScale;
        const width = meta.width;
        const height = meta.height;
        const x0 = coordinates.x;
        const y0 = coordinates.y;
        for (i = 0; i < data.length; i += 1) {
            // skipTip=true skips the evaluation in the datum
            // implicit equations cannot be evaluated with a single point
            // parametric equations cannot be evaluated with a single point
            // polar equations cannot be evaluated with a single point
            if (data[i].skipTip || data[i].fnType !== 'linear') {
                continue;
            }
            const range = data[i].range || [-inf, inf];
            let candidateY;
            if (x0 > range[0] - globals_1.default.TIP_X_EPS && x0 < range[1] + globals_1.default.TIP_X_EPS) {
                try {
                    candidateY = eval_1.builtIn(data[i], 'fn', { x: x0 });
                }
                catch (e) { }
                if (utils_1.default.isValidNumber(candidateY)) {
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
            y = eval_1.builtIn(data[closestIndex], 'fn', { x: x });
            tip.show();
            config.owner.emit('tip:update', { x, y, index: closestIndex });
            // @ts-ignore
            const clampX = clamp_1.default(x, xScale.invert(-MARGIN), xScale.invert(width + MARGIN));
            // @ts-ignore
            const clampY = clamp_1.default(y, yScale.invert(height + MARGIN), yScale.invert(-MARGIN));
            const color = utils_1.default.color(data[closestIndex], closestIndex);
            selection.style('color', 'red');
            selection.attr('transform', 'translate(' + xScale(clampX) + ',' + yScale(clampY) + ')');
            selection.select('circle')
                .attr('fill', color);
            selection.select('text')
                .attr('fill', color)
                .text(config.renderer(x, y, closestIndex));
        }
        else {
            tip.hide();
        }
    };
    tip.show = function () {
        tipInnerJoin.merge(tipInnerEnter)
            .style('display', null);
    };
    tip.hide = function () {
        tipInnerJoin.merge(tipInnerEnter)
            .style('display', 'none');
    };
    // generations of getters/setters
    Object.keys(config).forEach(function (option) {
        utils_1.default.getterSetter.call(tip, config, option);
    });
    return tip;
}
exports.default = mouseTip;
//# sourceMappingURL=tip.js.map