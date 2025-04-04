'use strict';

var path = require('path');
var acorn = require('acorn');
var escodegen = require('escodegen');
var estraverse = require('estraverse');
var sourceMap = require('source-map');
var mergeSourceMap = require('merge-source-map');
var compile = require('./compile');
var defaults = require('./defaults');
var runtimePath = require.resolve('./runtime');

var CONSTS = compile.Compiler.CONSTS;
var LOCAL_MODULE = /^\.+\//;

// 获取默认设置
var getDefaults = function getDefaults(options) {
    // new defaults
    var setting = {
        imports: runtimePath,
        bail: true,
        cache: false,
        debug: false,

        sourceMap: false,
        sourceRoot: options.sourceRoot
    };

    for (var name in options) {
        setting[name] = options[name];
    }

    return defaults.$extend(setting);
};

// 转换外部模板文件引入语句的 filename 参数节点
// 所有绝对路径都转换成相对路径
var convertFilenameNode = function convertFilenameNode(node, options) {
    if (node.type === 'Literal') {
        var resolvePath = options.resolveFilename(node.value, options);
        var dirname = path.dirname(options.filename);
        var relativePath = path.relative(dirname, resolvePath);

        if (LOCAL_MODULE.test(relativePath)) {
            node.value = relativePath;
        } else {
            node.value = './' + relativePath;
        }

        delete node.raw;
    }

    return node;
};

// 获取原始渲染函数的 sourceMap
var getOldSourceMap = function getOldSourceMap(mappings, _ref) {
    var sourceRoot = _ref.sourceRoot,
        source = _ref.source,
        file = _ref.file;

    var oldSourceMap = new sourceMap.SourceMapGenerator({
        file: file,
        sourceRoot: sourceRoot
    });

    mappings.forEach(function (mapping) {
        mapping.source = source;
        oldSourceMap.addMapping(mapping);
    });

    return oldSourceMap.toJSON();
};

/**
 * 预编译模版，将模板编译成 javascript 代码
 * 使用静态分析，将模板内部之间依赖转换成 `require()`
 * @param  {Object}       options  编译选项
 * @return {Object}
 */
var precompile = function precompile() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof options.filename !== 'string') {
        throw Error('template.precompile(): "options.filename" required');
    }

    options = getDefaults(options);

    var code = null;
    var sourceMap = null;
    var ast = null;
    var imports = options.imports;
    var functions = [CONSTS.INCLUDE, CONSTS.EXTEND];

    if (typeof imports !== 'string') {
        throw Error('template.precompile(): "options.imports" is a file. Example:\n' + 'options: { imports: require.resolve("art-template/lib/runtime") }\n');
    } else {
        options.imports = require(imports);
    }

    var isLocalModule = LOCAL_MODULE.test(imports);
    var tplImportsPath = isLocalModule ? imports : path.relative(path.dirname(options.filename), imports);
    var fn = compile(options);

    code = '(' + fn.toString() + ')';
    ast = acorn.parse(code, {
        locations: options.sourceMap
    });

    var extendNode = null;
    var enter = function enter(node) {
        if (node.type === 'VariableDeclarator' && functions.indexOf(node.id.name) !== -1) {
            // TODO 对变量覆盖进行抛错
            if (node.id.name === CONSTS.INCLUDE) {
                node['init'] = {
                    type: 'FunctionExpression',
                    params: [{
                        type: 'Identifier',
                        name: 'content'
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'AssignmentExpression',
                                operator: '+=',
                                left: {
                                    type: 'Identifier',
                                    name: CONSTS.OUT
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'content'
                                }
                            }
                        }, {
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: CONSTS.OUT
                            }
                        }]
                    }
                };
                return node;
            } else {
                this.remove();
            }
        } else if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && functions.indexOf(node.callee.name) !== -1) {
            var replaceNode = void 0;
            switch (node.callee.name) {
                case CONSTS.EXTEND:
                    extendNode = convertFilenameNode(node.arguments[0], options);
                    replaceNode = {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            name: CONSTS.FROM
                        },
                        right: {
                            type: 'Literal',
                            value: true
                        }
                    };

                    break;

                case CONSTS.INCLUDE:
                    var filename = node.arguments.shift();
                    var filenameNode = filename.name === CONSTS.FROM ? extendNode : convertFilenameNode(filename, options);
                    var paramNodes = node.arguments.length ? node.arguments : [{
                        type: 'Identifier',
                        name: CONSTS.DATA
                    }];

                    replaceNode = node;
                    replaceNode['arguments'] = [{
                        type: 'CallExpression',
                        callee: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'require'
                            },
                            arguments: [filenameNode]
                        },
                        arguments: paramNodes
                    }];

                    break;
            }

            return replaceNode;
        }
    };

    ast = estraverse.replace(ast, {
        enter: enter
    });

    if (options.sourceMap) {
        var sourceRoot = options.sourceRoot;
        var source = path.relative(sourceRoot, options.filename);
        var file = path.basename(source);
        var gen = escodegen.generate(ast, {
            sourceMap: source,
            file: file,
            sourceMapRoot: sourceRoot,
            sourceMapWithCode: true
        });
        code = gen.code;

        var newSourceMap = gen.map.toJSON();
        var oldSourceMap = getOldSourceMap(fn.mappings, {
            sourceRoot: sourceRoot,
            source: source,
            file: file
        });
        sourceMap = mergeSourceMap(oldSourceMap, newSourceMap);
        sourceMap.file = file;
        sourceMap.sourcesContent = fn.sourcesContent;
    } else {
        code = escodegen.generate(ast);
    }

    code = code.replace(/^\(|\)[;\s]*?$/g, '');
    code = 'var ' + CONSTS.IMPORTS + ' = require(' + JSON.stringify(tplImportsPath) + ');\n' + 'module.exports = ' + code + ';';

    return {
        code: code,
        ast: ast,
        sourceMap: sourceMap,
        toString: function toString() {
            return code;
        }
    };
};

module.exports = precompile;