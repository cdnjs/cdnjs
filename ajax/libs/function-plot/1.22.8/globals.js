"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_color_1 = require("d3-color");
// var d3 = window.d3
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
        return d3_color_1.hsl(v);
    }),
    DEFAULT_WIDTH: 550,
    DEFAULT_HEIGHT: 350,
    TIP_X_EPS: 1,
    DEFAULT_ITERATIONS: Infinity,
    MAX_ITERATIONS: 0
};
Globals.DEFAULT_ITERATIONS = null;
Globals.MAX_ITERATIONS = Globals.DEFAULT_WIDTH * 10;
// module.exports.Globals = Globals
exports.default = Globals;
//# sourceMappingURL=globals.js.map