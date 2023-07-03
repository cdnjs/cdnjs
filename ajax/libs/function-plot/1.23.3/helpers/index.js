"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const derivative_1 = __importDefault(require("./derivative"));
const secant_1 = __importDefault(require("./secant"));
function helpers(chart) {
    function helper(selection) {
        selection.each(function () {
            const el = (0, d3_selection_1.select)(this);
            el.call((0, derivative_1.default)(chart));
            el.call((0, secant_1.default)(chart));
        });
    }
    return helper;
}
exports.default = helpers;
//# sourceMappingURL=index.js.map