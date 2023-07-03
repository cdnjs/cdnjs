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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feathers = exports.version = exports.feathers = void 0;
const commons_1 = require("@feathersjs/commons");
const version_1 = __importDefault(require("./version"));
exports.version = version_1.default;
const application_1 = require("./application");
Object.defineProperty(exports, "Feathers", { enumerable: true, get: function () { return application_1.Feathers; } });
function feathers() {
    return new application_1.Feathers();
}
exports.feathers = feathers;
feathers.setDebug = commons_1.setDebug;
__exportStar(require("./hooks"), exports);
__exportStar(require("./declarations"), exports);
__exportStar(require("./service"), exports);
if (typeof module !== 'undefined') {
    module.exports = Object.assign(feathers, module.exports);
}
//# sourceMappingURL=index.js.map