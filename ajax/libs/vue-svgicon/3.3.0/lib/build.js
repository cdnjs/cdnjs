"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var fs = require("fs-plus");
var colors = require("colors");
var glob = require("glob");
var Svgo = require("svgo");
var camelcase_1 = require("camelcase");
/**
 * build svg icon
 */
function build(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // delete previous icons
                    fs.removeSync(options.targetPath);
                    // the template file which to generate icon files
                    var tplPath = options.tpl
                        ? path.join(process.cwd(), options.tpl)
                        : path.join(__dirname, "../../default/icon.tpl" + (options.es6 ? '.es6' : '') + ".txt");
                    var tpl = fs.readFileSync(tplPath, 'utf8');
                    var svgo = new Svgo(getSvgoConfig(options.svgo));
                    glob(path.join(options.sourcePath, '**/*.svg'), function (err, files) {
                        var _this = this;
                        if (err) {
                            reject(err);
                            return;
                        }
                        files = files.map(function (f) { return path.normalize(f); });
                        files.forEach(function (filename, ix) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var name, svgContent, filePath, result, data, viewBox, content;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        name = path.basename(filename).split('.')[0];
                                        svgContent = fs.readFileSync(filename, 'utf-8');
                                        filePath = getFilePath(options.sourcePath, filename);
                                        return [4 /*yield*/, svgo.optimize(svgContent)];
                                    case 1:
                                        result = (_a.sent());
                                        data = result.data
                                            .replace(/<svg[^>]+>/gi, '')
                                            .replace(/<\/svg>/gi, '');
                                        viewBox = getViewBox(result);
                                        // add pid attr, for css
                                        data = addPid(data);
                                        // rename fill and stroke. (It can restroe in vue-svgicon)
                                        data = renameStyle(data);
                                        // replace element id, make sure ID is unique. fix #16
                                        data = changeId(data, filePath, name, options.idSP);
                                        // escape single quotes
                                        data = data.replace(/\'/g, "\\'");
                                        content = compile(tpl, {
                                            name: "" + filePath + name,
                                            width: parseFloat(result.info.width) || 16,
                                            height: parseFloat(result.info.height) || 16,
                                            viewBox: "'" + viewBox + "'",
                                            data: data
                                        });
                                        try {
                                            fs.writeFileSync(path.join(options.targetPath, filePath, name + ("." + options.ext)), content, 'utf-8');
                                            console.log(colors.yellow("Generated icon: " + filePath + name));
                                            if (ix === files.length - 1) {
                                                generateIndex(options, files);
                                                resolve();
                                            }
                                        }
                                        catch (err) {
                                            reject(err);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                })];
        });
    });
}
exports.default = build;
// simple template compile
function compile(content, data) {
    return content.replace(/\${(\w+)}/gi, function (match, name) {
        return data[name] ? data[name] : '';
    });
}
// get file path by filename
function getFilePath(sourcePath, filename, subDir) {
    if (subDir === void 0) { subDir = ''; }
    var filePath = filename
        .replace(path.resolve(sourcePath), '')
        .replace(path.basename(filename), '');
    if (subDir) {
        filePath = filePath.replace(subDir + path.sep, '');
    }
    if (/^[\/\\]/.test(filePath)) {
        filePath = filePath.substr(1);
    }
    return filePath.replace(/\\/g, '/');
}
// generate index.js, which import all icons
function generateIndex(opts, files, subDir) {
    if (subDir === void 0) { subDir = ''; }
    var shouldExport = opts.export;
    var isES6 = opts.es6;
    var content = '';
    var dirMap = {};
    switch (opts.ext) {
        case 'js':
            content += '/* eslint-disable */\n';
            break;
        case 'ts':
            content += '/* tslint:disable */\n';
            break;
    }
    files.forEach(function (file) {
        var name = path.basename(file).split('.')[0];
        var filePath = getFilePath(opts.sourcePath, file, subDir);
        var dir = filePath.split('/')[0];
        if (dir) {
            if (!dirMap[dir]) {
                dirMap[dir] = [];
                if (shouldExport) {
                    var dirName = camelcase_1.default(dir, {
                        pascalCase: true
                    });
                    content += isES6
                        ? "export * as  " + dirName + " from './" + dir + "'\n"
                        : "module.exports." + dirName + " = require('./" + dir + "')\n";
                }
                else {
                    content += isES6
                        ? "import './" + dir + "'\n"
                        : "require('./" + dir + "')\n";
                }
            }
            dirMap[dir].push(file);
        }
        else {
            if (shouldExport) {
                var fileName = camelcase_1.default(name, {
                    pascalCase: true
                });
                content += isES6
                    ? "export " + fileName + " from './" + filePath + name + "'\n"
                    : "module.exports." + fileName + " = require('./" + filePath + name + "')\n";
            }
            else {
                content += isES6
                    ? "import './" + filePath + name + "'\n"
                    : "require('./" + filePath + name + "')\n";
            }
        }
    });
    fs.writeFileSync(path.join(opts.targetPath, subDir, "index." + opts.ext), content, 'utf-8');
    console.log(colors.green("Generated " + (subDir ? subDir + path.sep : '') + "index." + opts.ext));
    // generate subDir index.js
    for (var dir in dirMap) {
        generateIndex(opts, dirMap[dir], path.join(subDir, dir));
    }
}
// get svgo config
function getSvgoConfig(svgo) {
    if (!svgo) {
        return require('../../default/svgo');
    }
    else if (typeof svgo === 'string') {
        return require(path.join(process.cwd(), svgo));
    }
    else {
        return svgo;
    }
}
// get svg viewbox
function getViewBox(svgoResult) {
    var viewBoxMatch = svgoResult.data.match(/viewBox="([-\d\.]+\s[-\d\.]+\s[-\d\.]+\s[-\d\.]+)"/);
    var viewBox = '0 0 200 200';
    if (viewBoxMatch && viewBoxMatch.length > 1) {
        viewBox = viewBoxMatch[1];
    }
    else if (svgoResult.info.height && svgoResult.info.width) {
        viewBox = "0 0 " + svgoResult.info.width + " " + svgoResult.info.height;
    }
    return viewBox;
}
// add pid attr, for css
function addPid(content) {
    var shapeReg = /<(path|rect|circle|polygon|line|polyline|ellipse)\s/gi;
    var id = 0;
    content = content.replace(shapeReg, function (match) {
        return match + ("pid=\"" + id++ + "\" ");
    });
    return content;
}
// rename fill and stroke. (It can restroe in vue-svgicon)
function renameStyle(content) {
    var styleShaeReg = /<(path|rect|circle|polygon|line|polyline|g|ellipse).+>/gi;
    var styleReg = /fill=\"|stroke="/gi;
    content = content.replace(styleShaeReg, function (shape) {
        return shape.replace(styleReg, function (styleName) {
            return '_' + styleName;
        });
    });
    return content;
}
// replace element id, make sure ID is unique. fix #16
function changeId(content, filePath, name, idSep) {
    if (idSep === void 0) { idSep = '_'; }
    var idReg = /svgicon(\w+)/g;
    content = content.replace(idReg, function (match, elId) {
        return "svgicon" + idSep + filePath.replace(/[\\\/]/g, idSep) + name + idSep + elId;
    });
    return content;
}
//# sourceMappingURL=build.js.map