"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalOptions = exports.PlottingACurve = void 0;
const react_1 = __importDefault(require("react"));
const FunctionPlot_1 = require("./FunctionPlot");
exports.default = {
    title: 'Examples',
    component: FunctionPlot_1.FunctionPlot,
    argTypes: {
        options: { control: 'object' }
    }
};
const Template = (args) => react_1.default.createElement(FunctionPlot_1.FunctionPlot, Object.assign({}, args));
exports.PlottingACurve = Template.bind({});
exports.PlottingACurve.args = {
    options: {
        data: [{ fn: 'x^2' }]
    }
};
exports.AdditionalOptions = Template.bind({});
exports.AdditionalOptions.args = {
    options: {
        width: 600,
        height: 400,
        title: 'hello world',
        xAxis: {
            label: 'x - axis',
            domain: [-6, 6]
        },
        yAxis: {
            label: 'y - axis'
        },
        data: [{
                fn: 'x^2'
            }]
    }
};
//# sourceMappingURL=FunctionPlot.stories.js.map