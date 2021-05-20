"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.parse = void 0;
var htmlparser2_1 = require("htmlparser2");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return htmlparser2_1.parseDocument; } });
var dom_serializer_1 = require("dom-serializer");
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return __importDefault(dom_serializer_1).default; } });
