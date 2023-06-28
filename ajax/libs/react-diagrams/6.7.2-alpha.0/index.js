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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_diagrams_core_1 = require("@projectstorm/react-diagrams-core");
const react_diagrams_defaults_1 = require("@projectstorm/react-diagrams-defaults");
const react_diagrams_routing_1 = require("@projectstorm/react-diagrams-routing");
const react_canvas_core_1 = require("@projectstorm/react-canvas-core");
__exportStar(require("@projectstorm/react-diagrams-core"), exports);
__exportStar(require("@projectstorm/react-diagrams-defaults"), exports);
__exportStar(require("@projectstorm/react-diagrams-routing"), exports);
/**
 * Construct an engine with the defaults installed
 */
exports.default = (options = {}) => {
    const engine = new react_diagrams_core_1.DiagramEngine(options);
    // register model factories
    engine.getLayerFactories().registerFactory(new react_diagrams_core_1.NodeLayerFactory());
    engine.getLayerFactories().registerFactory(new react_diagrams_core_1.LinkLayerFactory());
    engine.getLayerFactories().registerFactory(new react_canvas_core_1.SelectionBoxLayerFactory());
    engine.getLabelFactories().registerFactory(new react_diagrams_defaults_1.DefaultLabelFactory());
    engine.getNodeFactories().registerFactory(new react_diagrams_defaults_1.DefaultNodeFactory()); // i cant figure out why
    engine.getLinkFactories().registerFactory(new react_diagrams_defaults_1.DefaultLinkFactory());
    engine.getLinkFactories().registerFactory(new react_diagrams_routing_1.PathFindingLinkFactory());
    engine.getPortFactories().registerFactory(new react_diagrams_defaults_1.DefaultPortFactory());
    // register the default interaction behaviours
    engine.getStateMachine().pushState(new react_diagrams_core_1.DefaultDiagramState());
    return engine;
};
//# sourceMappingURL=index.js.map