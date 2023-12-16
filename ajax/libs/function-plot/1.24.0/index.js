"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphTypeScatter = exports.GraphTypePolyline = exports.GraphTypeInterval = exports.EvalInterval = exports.EvalBuiltIn = exports.registerGraphType = exports.Chart = void 0;
require("./polyfills");
const chart_1 = require("./chart");
Object.defineProperty(exports, "Chart", { enumerable: true, get: function () { return chart_1.Chart; } });
const globals_1 = __importStar(require("./globals"));
Object.defineProperty(exports, "registerGraphType", { enumerable: true, get: function () { return globals_1.registerGraphType; } });
const graph_types_1 = require("./graph-types");
const $eval = __importStar(require("./helpers/eval"));
// register common graphTypes on library load.
(0, globals_1.registerGraphType)('polyline', graph_types_1.polyline);
(0, globals_1.registerGraphType)('interval', graph_types_1.interval);
(0, globals_1.registerGraphType)('scatter', graph_types_1.scatter);
(0, globals_1.registerGraphType)('text', graph_types_1.text);
/**
 * functionPlot is a function plotter of 2d functions.
 *
 * functionPlot creates an instance of {@link Chart} with the param options
 * and immediately calls {@link Chart#build} on it.
 *
 * `options` is augmented with additional internal computed data,
 * therefore, if you want to rerender graphs it's important to reuse
 * the same object to preserve state across builds.
 *
 * @param options The options sent to Chart
 */
function functionPlot(options) {
    options.data = options.data || [];
    let instance = chart_1.Chart.cache[options.id];
    if (!instance) {
        instance = new chart_1.Chart(options);
    }
    return instance.build();
}
exports.default = functionPlot;
functionPlot.globals = globals_1.default;
functionPlot.$eval = $eval;
functionPlot.graphTypes = { interval: graph_types_1.interval, polyline: graph_types_1.polyline, scatter: graph_types_1.scatter };
__exportStar(require("./types"), exports);
var eval_1 = require("./helpers/eval");
Object.defineProperty(exports, "EvalBuiltIn", { enumerable: true, get: function () { return eval_1.builtIn; } });
Object.defineProperty(exports, "EvalInterval", { enumerable: true, get: function () { return eval_1.interval; } });
var graph_types_2 = require("./graph-types");
Object.defineProperty(exports, "GraphTypeInterval", { enumerable: true, get: function () { return graph_types_2.interval; } });
Object.defineProperty(exports, "GraphTypePolyline", { enumerable: true, get: function () { return graph_types_2.polyline; } });
Object.defineProperty(exports, "GraphTypeScatter", { enumerable: true, get: function () { return graph_types_2.scatter; } });
__exportStar(require("./helpers"), exports);
//# sourceMappingURL=index.js.map