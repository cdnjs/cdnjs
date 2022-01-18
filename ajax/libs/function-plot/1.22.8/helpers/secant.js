"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const eval_1 = require("./eval");
const datum_defaults_1 = __importDefault(require("../datum-defaults"));
const graph_types_1 = require("../graph-types/");
function secant(chart) {
    const secantDefaults = datum_defaults_1.default({
        isHelper: true,
        skipTip: true,
        skipBoundsCheck: true,
        nSamples: 2,
        graphType: 'polyline'
    });
    function computeSlope(scope) {
        scope.m = (scope.y1 - scope.y0) / (scope.x1 - scope.x0);
    }
    function updateLine(d, secant) {
        if (!('x0' in secant)) {
            throw Error('secant must have the property `x0` defined');
        }
        secant.scope = secant.scope || {};
        const x0 = secant.x0;
        const x1 = typeof secant.x1 === 'number' ? secant.x1 : Infinity;
        Object.assign(secant.scope, {
            x0: x0,
            x1: x1,
            y0: eval_1.builtIn(d, 'fn', { x: x0 }),
            y1: eval_1.builtIn(d, 'fn', { x: x1 })
        });
        computeSlope(secant.scope);
    }
    function setFn(d, secant) {
        updateLine(d, secant);
        secant.fn = 'm * (x - x0) + y0';
    }
    function setMouseListener(d, secantObject) {
        const self = this;
        if (secantObject.updateOnMouseMove && !secantObject.$$mouseListener) {
            secantObject.$$mouseListener = function ({ x }) {
                secantObject.x1 = x;
                updateLine(d, secantObject);
                secant(self);
            };
            chart.on('tip:update', secantObject.$$mouseListener);
        }
    }
    function computeLines(d) {
        const self = this;
        const data = [];
        d.secants = d.secants || [];
        for (let i = 0; i < d.secants.length; i += 1) {
            const secant = d.secants[i] = Object.assign({}, secantDefaults, d.secants[i]);
            // necessary to make the secant have the same color as d
            secant.index = d.index;
            if (!secant.fn) {
                setFn.call(self, d, secant);
                setMouseListener.call(self, d, secant);
            }
            data.push(secant);
        }
        return data;
    }
    const secant = function (selection) {
        selection.each(function (d) {
            const el = d3_selection_1.select(this);
            const data = computeLines.call(selection, d);
            const innerSelection = el.selectAll('g.secant')
                .data(data);
            const innerSelectionEnter = innerSelection.enter()
                .append('g')
                .attr('class', 'secant');
            // enter + update
            innerSelection.merge(innerSelectionEnter)
                .call(graph_types_1.polyline(chart));
            // change the opacity of the secants
            innerSelection.merge(innerSelectionEnter)
                .selectAll('path')
                .attr('opacity', 0.5);
            // exit
            innerSelection.exit().remove();
        });
    };
    return secant;
}
exports.default = secant;
//# sourceMappingURL=secant.js.map