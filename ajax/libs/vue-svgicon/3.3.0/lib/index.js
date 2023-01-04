#!/usr/bin/env node
"use strict";
/**
 * build svg icon
 * @author Allenice
 * @since 2017-02-17
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yargs = require("yargs");
var path = require("path");
var build_1 = require("./build");
var colors = require("colors");
var args = yargs
    .usage('Usage: $0 -s svgSourcePath -t targetPath')
    .demandOption(['s', 't'])
    .describe('s', 'Svg source path')
    .describe('t', 'Generate icon path')
    .describe('ext', "Generated file's extension")
    .default('ext', 'js')
    .describe('tpl', 'The template file which to generate icon files')
    .describe('export', 'Should the templates export icons individually')
    .describe('es6', 'Use ES6 module')
    .describe('svgo', 'Svgo config file')
    .help('help')
    .alias('h', 'help').argv;
// svg file path
var sourcePath = path.isAbsolute(args.s)
    ? args.s
    : path.join(process.cwd(), args.s);
// generated icon path
var targetPath = path.isAbsolute(args.t)
    ? args.t
    : path.join(process.cwd(), args.t);
(function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, build_1.default({
                            sourcePath: sourcePath,
                            targetPath: targetPath,
                            tpl: args.tpl,
                            export: args.export,
                            ext: args.ext,
                            es6: args.es6,
                            svgo: args.svgo
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(colors.red(err_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=index.js.map