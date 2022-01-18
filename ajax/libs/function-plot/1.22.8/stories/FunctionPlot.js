"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Render = exports.FunctionPlot = void 0;
const react_1 = __importStar(require("react"));
const __1 = __importDefault(require("../"));
const prism_react_renderer_1 = __importStar(require("prism-react-renderer"));
const github_1 = __importDefault(require("prism-react-renderer/themes/github"));
exports.FunctionPlot = react_1.default.memo(({ options }) => {
    const rootEl = react_1.useRef(null);
    react_1.useEffect(() => {
        try {
            __1.default(Object.assign({}, options, { target: rootEl.current }));
        }
        catch (e) { }
    });
    return (react_1.default.createElement("div", { ref: rootEl }));
}, () => false);
exports.Render = ({ id, content, noCode }) => {
    react_1.useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.textContent = content;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    });
    return (react_1.default.createElement("div", { style: { display: 'flex' } },
        noCode ? null : react_1.default.createElement("div", { style: { flex: '50%' } },
            react_1.default.createElement(prism_react_renderer_1.default, Object.assign({}, prism_react_renderer_1.defaultProps, { theme: github_1.default, code: content, language: "jsx" }), ({ className, style, tokens, getLineProps, getTokenProps }) => (react_1.default.createElement("pre", { className: className, style: style }, tokens.map((line, i) => (react_1.default.createElement("div", Object.assign({}, getLineProps({ line, key: i })), line.map((token, key) => (react_1.default.createElement("span", Object.assign({}, getTokenProps({ token, key })))))))))))),
        id ? react_1.default.createElement("div", { style: { flex: '50%' }, id: id }) : null));
};
//# sourceMappingURL=FunctionPlot.js.map