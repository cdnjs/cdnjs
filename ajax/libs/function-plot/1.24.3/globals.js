"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGraphType = void 0;
const d3_color_1 = require("d3-color");
const Globals = {
    COLORS: [
        'steelblue',
        'red',
        '#05b378',
        'orange',
        '#4040e8',
        'yellow',
        'brown',
        'magenta',
        'cyan'
    ].map(function (v) {
        return (0, d3_color_1.hsl)(v);
    }),
    DEFAULT_WIDTH: 550,
    DEFAULT_HEIGHT: 350,
    DEFAULT_ITERATIONS: null,
    TIP_X_EPS: 1,
    MAX_ITERATIONS: 0,
    graphTypes: {}
};
Globals.MAX_ITERATIONS = Globals.DEFAULT_WIDTH * 10;
function registerGraphType(graphType, graphTypeBulder) {
    if (Object.hasOwn(Globals.graphTypes, graphType)) {
        throw new Error(`registerGraphType: graphType ${graphType} is already registered.`);
    }
    Globals.graphTypes[graphType] = graphTypeBulder;
}
exports.registerGraphType = registerGraphType;
exports.default = Globals;
//# sourceMappingURL=globals.js.map