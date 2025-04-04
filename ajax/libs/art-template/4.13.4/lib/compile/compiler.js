'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var esTokenizer = require('./es-tokenizer');
var tplTokenizer = require('./tpl-tokenizer');

/** 传递给模板的数据引用 */
var DATA = '$data';

/** 外部导入的所有全局变量引用 */
var IMPORTS = '$imports';

/**  $imports.$escape */
var ESCAPE = '$escape';

/**  $imports.$each */
var EACH = '$each';

/** 文本输出函数 */
var PRINT = 'print';

/** 包含子模板函数 */
var INCLUDE = 'include';

/** 继承布局模板函数 */
var EXTEND = 'extend';

/** “模板块”读写函数 */
var BLOCK = 'block';

/** 字符串拼接变量 */
var OUT = '$$out';

/** 运行时逐行调试记录变量 [line, start, source] */
var LINE = '$$line';

/** 所有“模板块”变量 */
var BLOCKS = '$$blocks';

/** 截取模版输出“流”的函数 */
var SLICE = '$$slice';

/** 继承的布局模板的文件地址变量 */
var FROM = '$$from';

/** 编译设置变量 */
var OPTIONS = '$$options';

var has = function has(object, key) {
    return Object.hasOwnProperty.call(object, key);
};
var stringify = JSON.stringify;

var Compiler = function () {
    /**
     * 模板编译器
     * @param   {Object}    options
     */
    function Compiler(options) {
        var _internal,
            _dependencies,
            _this = this;

        _classCallCheck(this, Compiler);

        var source = options.source;
        var minimize = options.minimize;
        var htmlMinifier = options.htmlMinifier;

        // 编译选项
        this.options = options;

        // 所有语句堆栈
        this.stacks = [];

        // 运行时注入的上下文
        this.context = [];

        // 模板语句编译后的代码
        this.scripts = [];

        // context map
        this.CONTEXT_MAP = {};

        // 忽略的变量名单
        this.ignore = [DATA, IMPORTS, OPTIONS].concat(_toConsumableArray(options.ignore));

        // 按需编译到模板渲染函数的内置变量
        this.internal = (_internal = {}, _defineProperty(_internal, OUT, '\'\''), _defineProperty(_internal, LINE, '[0,0]'), _defineProperty(_internal, BLOCKS, 'arguments[1]||{}'), _defineProperty(_internal, FROM, 'null'), _defineProperty(_internal, PRINT, 'function(){var s=\'\'.concat.apply(\'\',arguments);' + OUT + '+=s;return s}'), _defineProperty(_internal, INCLUDE, 'function(src,data){var s=' + OPTIONS + '.include(src,data||' + DATA + ',arguments[2]||' + BLOCKS + ',' + OPTIONS + ');' + OUT + '+=s;return s}'), _defineProperty(_internal, EXTEND, 'function(from){' + FROM + '=from}'), _defineProperty(_internal, SLICE, 'function(c,p,s){p=' + OUT + ';' + OUT + '=\'\';c();s=' + OUT + ';' + OUT + '=p+s;return s}'), _defineProperty(_internal, BLOCK, 'function(){var a=arguments,s;if(typeof a[0]===\'function\'){return ' + SLICE + '(a[0])}else if(' + FROM + '){if(!' + BLOCKS + '[a[0]]){' + BLOCKS + '[a[0]]=' + SLICE + '(a[1])}else{' + OUT + '+=' + BLOCKS + '[a[0]]}}else{s=' + BLOCKS + '[a[0]];if(typeof s===\'string\'){' + OUT + '+=s}else{s=' + SLICE + '(a[1])}return s}}'), _internal);

        // 内置函数依赖关系声明
        this.dependencies = (_dependencies = {}, _defineProperty(_dependencies, PRINT, [OUT]), _defineProperty(_dependencies, INCLUDE, [OUT, OPTIONS, DATA, BLOCKS]), _defineProperty(_dependencies, EXTEND, [FROM, /*[*/INCLUDE /*]*/]), _defineProperty(_dependencies, BLOCK, [SLICE, FROM, OUT, BLOCKS]), _dependencies);

        this.importContext(OUT);

        if (options.compileDebug) {
            this.importContext(LINE);
        }

        if (minimize) {
            try {
                source = htmlMinifier(source, options);
            } catch (error) {}
        }

        this.source = source;
        this.getTplTokens(source, options.rules, this).forEach(function (tokens) {
            if (tokens.type === tplTokenizer.TYPE_STRING) {
                _this.parseString(tokens);
            } else {
                _this.parseExpression(tokens);
            }
        });
    }

    /**
     * 将模板代码转换成 tplToken 数组
     * @param   {string} source
     * @return  {Object[]}
     */


    _createClass(Compiler, [{
        key: 'getTplTokens',
        value: function getTplTokens() {
            return tplTokenizer.apply(undefined, arguments);
        }

        /**
         * 将模板表达式转换成 esToken 数组
         * @param   {string} source
         * @return  {Object[]}
         */

    }, {
        key: 'getEsTokens',
        value: function getEsTokens(source) {
            return esTokenizer(source);
        }

        /**
         * 获取变量列表
         * @param {Object[]} esTokens
         * @return {string[]}
         */

    }, {
        key: 'getVariables',
        value: function getVariables(esTokens) {
            var ignore = false;
            return esTokens.filter(function (esToken) {
                return esToken.type !== 'whitespace' && esToken.type !== 'comment';
            }).filter(function (esToken) {
                if (esToken.type === 'name' && !ignore) {
                    return true;
                }

                ignore = esToken.type === 'punctuator' && esToken.value === '.';

                return false;
            }).map(function (tooken) {
                return tooken.value;
            });
        }

        /**
         * 导入模板上下文
         * @param {string} name
         */

    }, {
        key: 'importContext',
        value: function importContext(name) {
            var _this2 = this;

            var value = '';
            var internal = this.internal;
            var dependencies = this.dependencies;
            var ignore = this.ignore;
            var context = this.context;
            var options = this.options;
            var imports = options.imports;
            var contextMap = this.CONTEXT_MAP;

            if (!has(contextMap, name) && ignore.indexOf(name) === -1) {
                if (has(internal, name)) {
                    value = internal[name];

                    if (has(dependencies, name)) {
                        dependencies[name].forEach(function (name) {
                            return _this2.importContext(name);
                        });
                    }

                    // imports 继承了 Global，但是继承的属性不分配到顶级变量中，避免占用了模板内部的变量名称
                } else if (name === ESCAPE || name === EACH || has(imports, name)) {
                    value = IMPORTS + '.' + name;
                } else {
                    value = DATA + '.' + name;
                }

                contextMap[name] = value;
                context.push({
                    name: name,
                    value: value
                });
            }
        }

        /**
         * 解析字符串（HTML）直接输出语句
         * @param {Object} tplToken
         */

    }, {
        key: 'parseString',
        value: function parseString(tplToken) {
            var source = tplToken.value;

            if (!source) {
                return;
            }

            var code = OUT + '+=' + stringify(source);
            this.scripts.push({
                source: source,
                tplToken: tplToken,
                code: code
            });
        }

        /**
         * 解析逻辑表达式语句
         * @param {Object} tplToken
         */

    }, {
        key: 'parseExpression',
        value: function parseExpression(tplToken) {
            var _this3 = this;

            var source = tplToken.value;
            var script = tplToken.script;
            var output = script.output;
            var escape = this.options.escape;
            var code = script.code;

            if (output) {
                if (escape === false || output === tplTokenizer.TYPE_RAW) {
                    code = OUT + '+=' + script.code;
                } else {
                    code = OUT + '+=' + ESCAPE + '(' + script.code + ')';
                }
            }

            var esToken = this.getEsTokens(code);
            this.getVariables(esToken).forEach(function (name) {
                return _this3.importContext(name);
            });

            this.scripts.push({
                source: source,
                tplToken: tplToken,
                code: code
            });
        }

        /**
         * 检查解析后的模板语句是否存在语法错误
         * @param  {string} script
         * @return {boolean}
         */

    }, {
        key: 'checkExpression',
        value: function checkExpression(script) {
            // 没有闭合的块级模板语句规则
            // 基于正则规则来补全语法不能保证 100% 准确，
            // 但是在绝大多数情况下足以满足辅助开发调试的需要
            var rules = [
            // <% } %>
            // <% }else{ %>
            // <% }else if(a){ %>
            [/^\s*}[\w\W]*?{?[\s;]*$/, ''],

            // <% fn(c,function(a,b){ %>
            // <% fn(c, a=>{ %>
            // <% fn(c,(a,b)=>{ %>
            [/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/, '$1})'],

            // <% if(a){ %>
            // <% for(var i in d){ %>
            [/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/, '$1}']];

            var index = 0;
            while (index < rules.length) {
                if (rules[index][0].test(script)) {
                    var _script;

                    script = (_script = script).replace.apply(_script, _toConsumableArray(rules[index]));
                    break;
                }
                index++;
            }

            try {
                new Function(script);
                return true;
            } catch (e) {
                return false;
            }
        }

        /**
         * 编译
         * @return  {function}
         */

    }, {
        key: 'build',
        value: function build() {
            var options = this.options;
            var context = this.context;
            var scripts = this.scripts;
            var stacks = this.stacks;
            var source = this.source;
            var filename = options.filename;
            var imports = options.imports;
            var mappings = [];
            var extendMode = has(this.CONTEXT_MAP, EXTEND);

            var offsetLine = 0;

            // Create SourceMap: mapping
            var mapping = function mapping(code, _ref) {
                var line = _ref.line,
                    start = _ref.start;

                var node = {
                    generated: {
                        line: stacks.length + offsetLine + 1,
                        column: 1
                    },
                    original: {
                        line: line + 1,
                        column: start + 1
                    }
                };

                offsetLine += code.split(/\n/).length - 1;
                return node;
            };

            // Trim code
            var trim = function trim(code) {
                return code.replace(/^[\t ]+|[\t ]$/g, '');
            };

            stacks.push('function(' + DATA + '){');
            stacks.push('\'use strict\'');
            stacks.push(DATA + '=' + DATA + '||{}');
            stacks.push('var ' + context.map(function (_ref2) {
                var name = _ref2.name,
                    value = _ref2.value;
                return name + '=' + value;
            }).join(','));

            if (options.compileDebug) {
                stacks.push('try{');

                scripts.forEach(function (script) {
                    if (script.tplToken.type === tplTokenizer.TYPE_EXPRESSION) {
                        stacks.push(LINE + '=[' + [script.tplToken.line, script.tplToken.start].join(',') + ']');
                    }

                    mappings.push(mapping(script.code, script.tplToken));
                    stacks.push(trim(script.code));
                });

                stacks.push('}catch(error){');

                stacks.push('throw {' + ['name:\'RuntimeError\'', 'path:' + stringify(filename), 'message:error.message', 'line:' + LINE + '[0]+1', 'column:' + LINE + '[1]+1', 'source:' + stringify(source), 'stack:error.stack'].join(',') + '}');

                stacks.push('}');
            } else {
                scripts.forEach(function (script) {
                    mappings.push(mapping(script.code, script.tplToken));
                    stacks.push(trim(script.code));
                });
            }

            if (extendMode) {
                stacks.push(OUT + '=\'\'');
                stacks.push(INCLUDE + '(' + FROM + ',' + DATA + ',' + BLOCKS + ')');
            }

            stacks.push('return ' + OUT);
            stacks.push('}');

            var renderCode = stacks.join('\n');

            try {
                var result = new Function(IMPORTS, OPTIONS, 'return ' + renderCode)(imports, options);
                result.mappings = mappings;
                result.sourcesContent = [source];
                return result;
            } catch (error) {
                var index = 0;
                var line = 0;
                var start = 0;
                var generated = void 0;

                while (index < scripts.length) {
                    var current = scripts[index];
                    if (!this.checkExpression(current.code)) {
                        line = current.tplToken.line;
                        start = current.tplToken.start;
                        generated = current.code;
                        break;
                    }
                    index++;
                }

                throw {
                    name: 'CompileError',
                    path: filename,
                    message: error.message,
                    line: line + 1,
                    column: start + 1,
                    source: source,
                    generated: generated,
                    stack: error.stack
                };
            }
        }
    }]);

    return Compiler;
}();

/**
 * 模板内置常量
 */


Compiler.CONSTS = {
    DATA: DATA,
    IMPORTS: IMPORTS,
    PRINT: PRINT,
    INCLUDE: INCLUDE,
    EXTEND: EXTEND,
    BLOCK: BLOCK,
    OPTIONS: OPTIONS,
    OUT: OUT,
    LINE: LINE,
    BLOCKS: BLOCKS,
    SLICE: SLICE,
    FROM: FROM,
    ESCAPE: ESCAPE,
    EACH: EACH
};

module.exports = Compiler;