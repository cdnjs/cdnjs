"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const graph_types_1 = require("../graph-types/");
const eval_1 = require("./eval");
const datum_defaults_1 = __importDefault(require("../datum-defaults"));
function derivative(chart) {
    const derivativeDatum = datum_defaults_1.default({
        isHelper: true,
        skipTip: true,
        skipBoundsCheck: true,
        nSamples: 2,
        graphType: 'polyline'
    });
    function computeLine(d) {
        if (!d.derivative) {
            return [];
        }
        const x0 = typeof d.derivative.x0 === 'number' ? d.derivative.x0 : Infinity;
        derivativeDatum.index = d.index;
        derivativeDatum.scope = {
            m: eval_1.builtIn(d.derivative, 'fn', { x: x0 }),
            x0: x0,
            y0: eval_1.builtIn(d, 'fn', { x: x0 })
        };
        derivativeDatum.fn = 'm * (x - x0) + y0';
        return [derivativeDatum];
    }
    function checkAutoUpdate(d) {
        const self = this;
        if (!d.derivative) {
            return;
        }
        if (d.derivative.updateOnMouseMove && !d.derivative.$$mouseListener) {
            d.derivative.$$mouseListener = function ({ x }) {
                // update initial value to be the position of the mouse
                // scope's x0 will be updated on the next call to `derivative(self)`
                if (d.derivative) {
                    d.derivative.x0 = x;
                }
                // trigger update (selection = self)
                derivative(self);
            };
            // if d.derivative is destroyed and recreated, the tip:update event
            // will be fired on the new d.derivative :)
            chart.on('tip:update', d.derivative.$$mouseListener);
        }
    }
    const derivative = function (selection) {
        selection.each(function (d) {
            const el = d3_selection_1.select(this);
            const data = computeLine.call(selection, d);
            checkAutoUpdate.call(selection, d);
            const innerSelection = el.selectAll('g.derivative')
                .data(data);
            const innerSelectionEnter = innerSelection.enter()
                .append('g')
                .attr('class', 'derivative');
            // enter + update
            innerSelection.merge(innerSelectionEnter)
                .call(graph_types_1.polyline(chart));
            // update
            // change the opacity of the line
            innerSelection.merge(innerSelectionEnter)
                .selectAll('path')
                .attr('opacity', 0.5);
            innerSelection.exit().remove();
        });
    };
    return derivative;
}
exports.default = derivative;
//# sourceMappingURL=derivative.js.map