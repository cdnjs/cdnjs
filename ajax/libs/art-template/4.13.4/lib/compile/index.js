'use strict';

var Compiler = require('./compiler');
var defaults = require('./defaults');
var TemplateError = require('./error');

var debugRender = function debugRender(error, options) {
    options.onerror(error, options);
    var render = function render() {
        return '{Template Error}';
    };
    render.mappings = [];
    render.sourcesContent = [];
    return render;
};

/**
 * 编译模版
 * @param {string|Object} source   模板内容
 * @param {?Object}       options  编译选项
 * @return {function}
 */
var compile = function compile(source) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof source !== 'string') {
        options = source;
    } else {
        options.source = source;
    }

    // 合并默认配置
    options = defaults.$extend(options);
    source = options.source;

    // debug 模式
    /* istanbul ignore if */
    if (options.debug === true) {
        options.cache = false;
        options.minimize = false;
        options.compileDebug = true;
    }

    if (options.compileDebug) {
        options.minimize = false;
    }

    // 转换成绝对路径
    if (options.filename) {
        options.filename = options.resolveFilename(options.filename, options);
    }

    var filename = options.filename;
    var cache = options.cache;
    var caches = options.caches;

    // 匹配缓存
    if (cache && filename) {
        var _render = caches.get(filename);
        if (_render) {
            return _render;
        }
    }

    // 加载外部模板
    if (!source) {
        try {
            source = options.loader(filename, options);
            options.source = source;
        } catch (e) {
            var error = new TemplateError({
                name: 'CompileError',
                path: filename,
                message: 'template not found: ' + e.message,
                stack: e.stack
            });

            if (options.bail) {
                throw error;
            } else {
                return debugRender(error, options);
            }
        }
    }

    var fn = void 0;
    var compiler = new Compiler(options);

    try {
        fn = compiler.build();
    } catch (error) {
        error = new TemplateError(error);
        if (options.bail) {
            throw error;
        } else {
            return debugRender(error, options);
        }
    }

    var render = function render(data, blocks) {
        try {
            return fn(data, blocks);
        } catch (error) {
            // 运行时出错以调试模式重载
            if (!options.compileDebug) {
                options.cache = false;
                options.compileDebug = true;
                return compile(options)(data, blocks);
            }

            error = new TemplateError(error);

            if (options.bail) {
                throw error;
            } else {
                return debugRender(error, options)();
            }
        }
    };

    render.mappings = fn.mappings;
    render.sourcesContent = fn.sourcesContent;
    render.toString = function () {
        return fn.toString();
    };

    if (cache && filename) {
        caches.set(filename, render);
    }

    return render;
};

compile.Compiler = Compiler;

module.exports = compile;