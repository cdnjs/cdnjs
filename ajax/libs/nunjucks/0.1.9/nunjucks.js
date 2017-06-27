(function() {
var modules = {};
(function() {

// A simple class system, more documentation to come

function extend(cls, name, props) {
    var prototype = Object.create(cls.prototype);
    var fnTest = /xyz/.test(function(){ xyz; }) ? /\bparent\b/ : /.*/;
    props = props || {};

    for(var k in props) {
        var src = props[k];
        var parent = prototype[k];

        if(typeof parent == "function" &&
           typeof src == "function" &&
           fnTest.test(src)) {
            prototype[k] = (function (src, parent) {
                return function() {
                    // Save the current parent method
                    var tmp = this.parent;

                    // Set parent to the previous method, call, and restore
                    this.parent = parent;
                    var res = src.apply(this, arguments);
                    this.parent = tmp;

                    return res;
                };
            })(src, parent);
        }
        else {
            prototype[k] = src;
        }
    }

    prototype.typename = name;

    var new_cls = function() { 
        if(prototype.init) {
            prototype.init.apply(this, arguments);
        }
    };

    new_cls.prototype = prototype;
    new_cls.prototype.constructor = new_cls;

    new_cls.extend = function(name, props) {
        if(typeof name == "object") {
            props = name;
            name = "anonymous";
        }
        return extend(new_cls, name, props);
    };

    return new_cls;
}

modules['object'] = extend(Object, "Object", {});
})();
(function() {
var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;

var escapeMap = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
    "<": '&lt;',
    ">": '&gt;'
};

var lookupEscape = function(ch) {
    return escapeMap[ch];
};

var exports = modules['lib'] = {};

exports.withPrettyErrors = function(path, withInternals, func) {
    try {
        return func();
    } catch (e) {
        if (!e.Update) {
            // not one of ours, cast it
            e = new exports.TemplateError(e);
        }
        e.Update(path);

        // Unless they marked the dev flag, show them a trace from here
        if (!withInternals) {
            var old = e;
            e = new Error(old.message);
            e.name = old.name;
        }

        throw e;
    }
}

exports.TemplateError = function(message, lineno, colno) {
    var err = this;

    if (message instanceof Error) { // for casting regular js errors
        err = message;
        message = message.name + ": " + message.message;
    } else {
        if(Error.captureStackTrace) {
            Error.captureStackTrace(err);
        }
    }

    err.name = "Template render error";
    err.message = message;
    err.lineno = lineno;
    err.colno = colno;
    err.firstUpdate = true;

    err.Update = function(path) {
        var message = "(" + (path || "unknown path") + ")";

        // only show lineno + colno next to path of template
        // where error occurred
        if (this.firstUpdate) {
            if(this.lineno && this.colno) {
                message += ' [Line ' + this.lineno + ', Column ' + this.colno + ']';
            }
            else if(this.lineno) {
                message += ' [Line ' + this.lineno + ']';
            }
        }

        message += '\n ';
        if (this.firstUpdate) {
            message += ' ';
        }

        this.message = message + (this.message || '');
        this.firstUpdate = false;
        return this;
    };

    return err;
};

exports.TemplateError.prototype = Error.prototype;

exports.escape = function(val) {
    return val.replace(/[&"'<>]/g, lookupEscape);
};

exports.isFunction = function(obj) {
    return ObjProto.toString.call(obj) == '[object Function]';
};

exports.isArray = Array.isArray || function(obj) {
    return ObjProto.toString.call(obj) == '[object Array]';
};

exports.isString = function(obj) {
    return ObjProto.toString.call(obj) == '[object String]';
};

exports.isObject = function(obj) {
    return obj === Object(obj);
};

exports.groupBy = function(obj, val) {
    var result = {};
    var iterator = exports.isFunction(val) ? val : function(obj) { return obj[val]; };
    for(var i=0; i<obj.length; i++) {
        var value = obj[i];
        var key = iterator(value, i);
        (result[key] || (result[key] = [])).push(value);
    }
    return result;
};

exports.toArray = function(obj) {
    return Array.prototype.slice.call(obj);
};

exports.without = function(array) {
    var result = [];
    if (!array) {
        return result;
    }
    var index = -1,
    length = array.length,
    contains = exports.toArray(arguments).slice(1);

    while(++index < length) {
        if(contains.indexOf(array[index]) === -1) {
            result.push(array[index]);
        }
    }
    return result;
};

exports.extend = function(obj, obj2) {
    for(var k in obj2) {
        obj[k] = obj2[k];
    }
    return obj;
};

exports.repeat = function(char_, n) {
    var str = '';
    for(var i=0; i<n; i++) {
        str += char_;
    }
    return str;
};

exports.each = function(obj, func, context) {
    if(obj == null) {
        return;
    }

    if(ArrayProto.each && obj.each == ArrayProto.each) {
        obj.forEach(func, context);
    }
    else if(obj.length === +obj.length) {
        for(var i=0, l=obj.length; i<l; i++) {
            func.call(context, obj[i], i, obj);
        }
    }
};

exports.map = function(obj, func) {
    var results = [];
    if(obj == null) {
        return results;
    }

    if(ArrayProto.map && obj.map === ArrayProto.map) {
        return obj.map(func);
    }

    for(var i=0; i<obj.length; i++) {
        results[results.length] = func(obj[i], i);
    }

    if(obj.length === +obj.length) {
        results.length = obj.length;
    }

    return results;
};
})();
(function() {

var lib = modules["lib"];
var Object = modules["object"];

// Frames keep track of scoping both at compile-time and run-time so
// we know how to access variables. Block tags can introduce special
// variables, for example.
var Frame = Object.extend({
    init: function(parent) {
        this.variables = {};
        this.parent = parent;
    },

    set: function(name, val) {
        // Allow variables with dots by automatically creating the
        // nested structure
        var parts = name.split('.');
        var obj = this.variables;

        for(var i=0; i<parts.length - 1; i++) {
            var id = parts[i];

            if(!obj[id]) {
                obj[id] = {};
            }
            obj = obj[id];
        }

        obj[parts[parts.length - 1]] = val;
    },

    get: function(name) {
        var val = this.variables[name];
        if(val !== undefined && val !== null) {
            return val;
        }
        return null;
    },

    lookup: function(name) {
        var p = this.parent;
        var val = this.variables[name];
        if(val !== undefined && val !== null) {
            return val;
        }
        return p && p.lookup(name);
    },

    push: function() {
        return new Frame(this);
    },

    pop: function() {
        return this.parent;
    }
});

function makeMacro(argNames, kwargNames, func) {
    return function() {
        var argCount = numArgs(arguments);
        var args;
        var kwargs = getKeywordArgs(arguments);

        if(argCount > argNames.length) {
            args = Array.prototype.slice.call(arguments, 0, argNames.length);

            // Positional arguments that should be passed in as
            // keyword arguments (essentially default values)
            var vals = Array.prototype.slice.call(arguments, args.length, argCount);
            for(var i=0; i<vals.length; i++) {
                if(i < kwargNames.length) {
                    kwargs[kwargNames[i]] = vals[i];
                }
            }

            args.push(kwargs);
        }
        else if(argCount < argNames.length) {
            args = Array.prototype.slice.call(arguments, 0, argCount);

            for(var i=argCount; i<argNames.length; i++) {
                var arg = argNames[i];

                // Keyword arguments that should be passed as
                // positional arguments, i.e. the caller explicitly
                // used the name of a positional arg
                args.push(kwargs[arg]);
                delete kwargs[arg];
            }

            args.push(kwargs);
        }
        else {
            args = arguments;
        }

        return func.apply(this, args);
    };
}

function makeKeywordArgs(obj) {
    obj.__keywords = true;
    return obj;
}

function getKeywordArgs(args) {
    var len = args.length;
    if(len) {
        var lastArg = args[len - 1];
        if(lastArg && lastArg.hasOwnProperty('__keywords')) {
            return lastArg;
        }
    }
    return {};
}

function numArgs(args) {
    var len = args.length;
    if(len === 0) {
        return 0;
    }

    var lastArg = args[len - 1];
    if(lastArg && lastArg.hasOwnProperty('__keywords')) {
        return len - 1;
    }
    else {
        return len;
    }
}

// A SafeString object indicates that the string should not be
// autoescaped. This happens magically because autoescaping only
// occurs on primitive string objects.
function SafeString(val) {
    if(typeof val != 'string') {
        return val;
    }

    this.toString = function() {
        return val;
    };

    this.length = val.length;

    var methods = [
        'charAt', 'charCodeAt', 'concat', 'contains',
        'endsWith', 'fromCharCode', 'indexOf', 'lastIndexOf',
        'length', 'localeCompare', 'match', 'quote', 'replace',
        'search', 'slice', 'split', 'startsWith', 'substr',
        'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',
        'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'
    ];

    for(var i=0; i<methods.length; i++) {
        this[methods[i]] = proxyStr(val[methods[i]]);
    }
}

function copySafeness(dest, target) {
    if(dest instanceof SafeString) {
        return new SafeString(target);
    }
    return target.toString();
}

function proxyStr(func) {
    return function() {
        var ret = func.apply(this, arguments);

        if(typeof ret == 'string') {
            return new SafeString(ret);
        }
        return ret;
    };
}

function suppressValue(val, autoescape) {
    val = (val !== undefined && val !== null) ? val : "";

    if(autoescape && typeof val === "string") {
        val = lib.escape(val);
    }

    return val;
}

function memberLookup(obj, val) {
    obj = obj || {};

    if(typeof obj[val] === 'function') {
        return function() {
            return obj[val].apply(obj, arguments);
        };
    }

    return obj[val];
}

function callWrap(obj, name, args) {
    if(!obj) {
        throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
    }
    else if(typeof obj !== 'function') {
        throw new Error('Unable to call `' + name + '`, which is not a function');
    }

    return obj.apply(this, args);
}

function contextOrFrameLookup(context, frame, name) {
    var val = context.lookup(name);
    return (val !== undefined && val !== null) ?
        val :
        frame.lookup(name);
}

function handleError(error, lineno, colno) {
    if(error.lineno) {
        throw error;
    }
    else {
        throw new lib.TemplateError(error, lineno, colno);
    }
}

modules['runtime'] = {
    Frame: Frame,
    makeMacro: makeMacro,
    makeKeywordArgs: makeKeywordArgs,
    numArgs: numArgs,
    suppressValue: suppressValue,
    memberLookup: memberLookup,
    contextOrFrameLookup: contextOrFrameLookup,
    callWrap: callWrap,
    handleError: handleError,
    isArray: lib.isArray,
    SafeString: SafeString,
    copySafeness: copySafeness
};
})();
(function() {

var lib = modules["lib"];
var r = modules["runtime"];

var filters = {
    abs: function(n) {
        return Math.abs(n);
    },

    batch: function(arr, linecount, fill_with) {
        var res = [];
        var tmp = [];

        for(var i=0; i<arr.length; i++) {
            if(i % linecount === 0 && tmp.length) {
                res.push(tmp);
                tmp = [];
            }

            tmp.push(arr[i]);
        }

        if(tmp.length) {
            if(fill_with) {
                for(var i=tmp.length; i<linecount; i++) {
                    tmp.push(fill_with);
                }
            }

            res.push(tmp);
        }

        return res;
    },

    capitalize: function(str) {
        var ret = str.toLowerCase();
        return r.copySafeness(str, ret[0].toUpperCase() + ret.slice(1));
    },

    center: function(str, width) {
        width = width || 80;

        if(str.length >= width) {
            return str;
        }

        var spaces = width - str.length;
        var pre = lib.repeat(" ", spaces/2 - spaces % 2);
        var post = lib.repeat(" ", spaces/2);
        return r.copySafeness(str, pre + str + post);
    },

    'default': function(val, def) {
        return val ? val : def;
    },

    dictsort: function(val, case_sensitive, by) {
        if (!lib.isObject(val)) {
            throw new lib.TemplateError("dictsort filter: val must be an object");
        }

        var array = [];
        for (var k in val) {
            // deliberately include properties from the object's prototype
            array.push([k,val[k]]);
        }

        var si;
        if (by === undefined || by === "key") {
            si = 0;
        } else if (by === "value") {
            si = 1;
        } else {
            throw new lib.TemplateError(
                "dictsort filter: You can only sort by either key or value");
        }

        array.sort(function(t1, t2) { 
            var a = t1[si];
            var b = t2[si];

            if (!case_sensitive) {
                if (lib.isString(a)) {
                    a = a.toUpperCase();
                }
                if (lib.isString(b)) {
                    b = b.toUpperCase();
                }
            }

            return a > b ? 1 : (a == b ? 0 : -1);
        });

        return array;
    },
    
    escape: function(str) {
        if(typeof str == 'string' || 
           str instanceof r.SafeString) {
            return lib.escape(str);
        }
        return str;
    },

    safe: function(str) {
        return new r.SafeString(str);
    },

    first: function(arr) {
        return arr[0];
    },

    groupby: function(arr, attr) {
        return lib.groupBy(arr, attr);
    },

    indent: function(str, width, indentfirst) {
        width = width || 4;
        var res = '';
        var lines = str.split('\n');
        var sp = lib.repeat(' ', width);

        for(var i=0; i<lines.length; i++) {
            if(i == 0 && !indentfirst) {
                res += lines[i] + '\n';
            }
            else {
                res += sp + lines[i] + '\n';
            }
        }

        return r.copySafeness(str, res);
    },

    join: function(arr, del, attr) {
        del = del || '';

        if(attr) {
            arr = lib.map(arr, function(v) {
                return v[attr];
            });
        }

        return arr.join(del);
    },

    last: function(arr) {
        return arr[arr.length-1];
    },

    length: function(arr) {
        return arr.length;
    },

    list: function(val) {
        if(lib.isString(val)) {
            return val.split('');
        }
        else if(lib.isObject(val)) {
            var keys = [];

            if(Object.keys) {
                keys = Object.keys(val);
            }
            else {
                for(var k in val) {
                    keys.push(k);
                }
            }

            return lib.map(keys, function(k) {
                return { key: k,
                         value: val[k] };
            });
        }
        else {
            throw new lib.TemplateError("list filter: type not iterable");
        }
    },

    lower: function(str) {
        return str.toLowerCase();
    },

    random: function(arr) {
        var i = Math.floor(Math.random() * arr.length);
        if(i == arr.length) {
            i--;
        }

        return arr[i];
    },

    replace: function(str, old, new_, maxCount) {
        var res = str;
        var last = res;
        var count = 1;
        res = res.replace(old, new_);

        while(last != res) {
            if(count >= maxCount) {
                break;
            }

            last = res;
            res = res.replace(old, new_);
            count++;
        }

        return r.copySafeness(str, res);
    },

    reverse: function(val) {
        var arr;
        if(lib.isString(val)) {
            arr = filters.list(val);
        }
        else {
            // Copy it
            arr = lib.map(val, function(v) { return v; });
        }

        arr.reverse();

        if(lib.isString(val)) {
            return r.copySafeness(val, arr.join(''));
        }
        return arr;
    },

    round: function(val, precision, method) {
        precision = precision || 0;
        var factor = Math.pow(10, precision);
        var rounder;

        if(method == 'ceil') {
            rounder = Math.ceil;
        }
        else if(method == 'floor') {
            rounder = Math.floor;
        }
        else {
            rounder = Math.round;
        }

        return rounder(val * factor) / factor;
    },

    slice: function(arr, slices, fillWith) {
        var sliceLength = Math.floor(arr.length / slices);
        var extra = arr.length % slices;
        var offset = 0;
        var res = [];

        for(var i=0; i<slices; i++) {
            var start = offset + i * sliceLength;
            if(i < extra) {
                offset++;
            }
            var end = offset + (i + 1) * sliceLength;

            var slice = arr.slice(start, end);
            if(fillWith && i >= extra) {
                slice.push(fillWith);
            }
            res.push(slice);
        }

        return res;
    },

    sort: function(arr, reverse, caseSens, attr) {
        // Copy it
        arr = lib.map(arr, function(v) { return v; });

        arr.sort(function(a, b) {
            var x, y;

            if(attr) {
                x = a[attr];
                y = b[attr];
            }
            else {
                x = a;
                y = b;
            }

            if(!caseSens && lib.isString(x) && lib.isString(y)) {
                x = x.toLowerCase();
                y = y.toLowerCase();
            }
               
            if(x < y) {
                return reverse ? 1 : -1;
            }
            else if(x > y) {
                return reverse ? -1: 1;
            }
            else {
                return 0;
            }
        });

        return arr;
    },

    string: function(obj) {
        return r.copySafeness(obj, obj);
    },

    title: function(str) {
        var words = str.split(' ');
        for(var i = 0; i < words.length; i++) {
            words[i] = filters.capitalize(words[i]);
        }
        return r.copySafeness(str, words.join(' '));
    },

    trim: function(str) {
        return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
    },

    truncate: function(input, length, killwords, end) {
        var orig = input;
        length = length || 255;

        if (input.length <= length)
            return input;

        if (killwords) {
            input = input.substring(0, length);
        } else {
            var idx = input.lastIndexOf(' ', length);
            if(idx === -1) {
                idx = length;
            }

            input = input.substring(0, idx);
        }

        input += (end !== undefined && end !== null) ? end : '...';
        return r.copySafeness(orig, input);
    },

    upper: function(str) {
        return str.toUpperCase();
    },

    wordcount: function(str) {
        return str.match(/\w+/g).length;
    },

    'float': function(val, def) {
        var res = parseFloat(val);
        return isNaN(res) ? def : res;
    },

    'int': function(val, def) {
        var res = parseInt(val, 10);
        return isNaN(res) ? def : res;
    }
};

// Aliases
filters.d = filters['default'];
filters.e = filters.escape;

modules['filters'] = filters;
})();
(function() {

function cycler(items) {
    var index = -1;
    var current = null;

    return {
        reset: function() {
            index = -1;
            current = null;
        },

        next: function() {
            index++;
            if(index >= items.length) {
                index = 0;
            }

            current = items[index];
            return current;
        }
    };

}

function joiner(sep) {
    sep = sep || ',';
    var first = true;

    return function() {
        var val = first ? '' : sep;
        first = false;
        return val;
    };
}

var globals = {
    range: function(start, stop, step) {
        if(!stop) {
            stop = start;
            start = 0;
            step = 1;
        }
        else if(!step) {
            step = 1;
        }

        var arr = [];
        for(var i=start; i<stop; i+=step) {
            arr.push(i);
        }
        return arr;
    },

    // lipsum: function(n, html, min, max) {
    // },

    cycler: function() {
        return cycler(Array.prototype.slice.call(arguments));
    },

    joiner: function(sep) {
        return joiner(sep);
    }
}

modules['globals'] = globals;
})();
(function() {
var lib = modules["lib"];
var Object = modules["object"];
var lexer = modules["lexer"];
var compiler = modules["compiler"];
var builtin_filters = modules["filters"];
var builtin_loaders = modules["loaders"];
var runtime = modules["runtime"];
var globals = modules["globals"];
var Frame = runtime.Frame;

var Environment = Object.extend({
    init: function(loaders, opts) {
        // The dev flag determines the trace that'll be shown on errors.
        // If set to true, returns the full trace from the error point,
        // otherwise will return trace starting from Template.render
        // (the full trace from within nunjucks may confuse developers using
        //  the library)
        // defaults to false
        opts = opts || {};
        this.dev = !!opts.dev;

        // The autoescape flag sets global autoescaping. If true,
        // every string variable will be escaped by default.
        // If false, strings can be manually escaped using the `escape` filter.
        // defaults to false
        this.autoesc = !!opts.autoescape;

        if(!loaders) {
            // The filesystem loader is only available client-side
            if(builtin_loaders.FileSystemLoader) {
                this.loaders = [new builtin_loaders.FileSystemLoader()];
            }
            else {
                this.loaders = [new builtin_loaders.HttpLoader('/views')];
            }
        }
        else {
            this.loaders = lib.isArray(loaders) ? loaders : [loaders];
        }

        if(opts.tags) {
            lexer.setTags(opts.tags);
        }

        this.filters = builtin_filters;
        this.cache = {};
        this.extensions = {};
        this.extensionsList = [];
    },

    addExtension: function(name, extension) {
        extension._name = name;
        this.extensions[name] = extension;
        this.extensionsList.push(extension);
    },

    getExtension: function(name) {
        return this.extensions[name];
    },

    addFilter: function(name, func) {
        this.filters[name] = func;
    },

    getFilter: function(name) {
        if(!this.filters[name]) {
            throw new Error('filter not found: ' + name);
        }
        return this.filters[name];
    },

    getTemplate: function(name, eagerCompile) {
        if (name && name.raw) {
            // this fixes autoescape for templates referenced in symbols
            name = name.raw;
        }
        var info = null;
        var tmpl = this.cache[name];
        var upToDate;

        if(typeof name !== 'string') {
            throw new Error('template names must be a string: ' + name);
        }

        if(!tmpl || !tmpl.isUpToDate()) {
            for(var i=0; i<this.loaders.length; i++) {
                if((info = this.loaders[i].getSource(name))) {
                    break;
                }
            }

            if(!info) {
                throw new Error('template not found: ' + name);
            }

            this.cache[name] = new Template(info.src,
                                            this,
                                            info.path,
                                            info.upToDate,
                                            eagerCompile);
        }

        return this.cache[name];
    },

    registerPrecompiled: function(templates) {
        for(var name in templates) {
            this.cache[name] = new Template({ type: 'code',
                                              obj: templates[name] },
                                            this,
                                            name,
                                            function() { return true; },
                                            true);
        }
    },

    express: function(app) {
        var env = this;

        if(app.render) {
            // Express >2.5.11
            app.render = function(name, ctx, k) {
                var context = {};

                if(lib.isFunction(ctx)) {
                    k = ctx;
                    ctx = {};
                }

                context = lib.extend(context, this.locals);

                if(ctx._locals) {
                    context = lib.extend(context, ctx._locals);
                }

                context = lib.extend(context, ctx);

                var res = env.render(name, context);
                k(null, res);
            };
        }
        else {
            // Express <2.5.11
            var http = modules["http"];
            var res = http.ServerResponse.prototype;

            res._render = function(name, ctx, k) {
                var app = this.app;
                var context = {};

                if(this._locals) {
                    context = lib.extend(context, this._locals);
                }

                if(ctx) {
                    context = lib.extend(context, ctx);

                    if(ctx.locals) {
                        context = lib.extend(context, ctx.locals);
                    }
                }

                context = lib.extend(context, app._locals);
                var str = env.render(name, context);

                if(k) {
                    k(null, str);
                }
                else {
                    this.send(str);
                }
            };
        }
    },

    render: function(name, ctx) {
        return this.getTemplate(name).render(ctx);
    }
});

var Context = Object.extend({
    init: function(ctx, blocks) {
        this.ctx = ctx;
        this.blocks = {};
        this.exported = [];

        for(var name in blocks) {
            this.addBlock(name, blocks[name]);
        }
    },

    lookup: function(name) {
        // This is one of the most called functions, so optimize for
        // the typical case where the name isn't in the globals
        if(name in globals && !(name in this.ctx)) {
            return globals[name];
        }
        else {
            return this.ctx[name];
        }
    },

    setVariable: function(name, val) {
        this.ctx[name] = val;
    },

    getVariables: function() {
        return this.ctx;
    },

    addBlock: function(name, block) {
        this.blocks[name] = this.blocks[name] || [];
        this.blocks[name].push(block);
    },

    getBlock: function(name) {
        if(!this.blocks[name]) {
            throw new Error('unknown block "' + name + '"');
        }

        return this.blocks[name][0];
    },

    getSuper: function(env, name, block, frame, runtime) {
        var idx = (this.blocks[name] || []).indexOf(block);
        var blk = this.blocks[name][idx + 1];
        var context = this;

        return function() {
            if(idx == -1 || !blk) {
                throw new Error('no super block available for "' + name + '"');
            }

            return blk(env, context, frame, runtime);
        };
    },

    addExport: function(name) {
        this.exported.push(name);
    },

    getExported: function() {
        var exported = {};
        for(var i=0; i<this.exported.length; i++) {
            var name = this.exported[i];
            exported[name] = this.ctx[name];
        }
        return exported;
    }
});

var Template = Object.extend({
    init: function (src, env, path, upToDate, eagerCompile) {
        this.env = env || new Environment();

        if(lib.isObject(src)) {
            switch(src.type) {
            case 'code': this.tmplProps = src.obj; break;
            case 'string': this.tmplStr = src.obj; break;
            }
        }
        else if(lib.isString(src)) {
            this.tmplStr = src;
        }
        else {
            throw new Error("src must be a string or an object describing " +
                            "the source");
        }

        this.path = path;
        this.upToDate = upToDate || function() { return false; };

        if(eagerCompile) {
            var _this = this;
            lib.withPrettyErrors(this.path,
                                 this.env.dev,
                                 function() { _this._compile(); });
        }
        else {
            this.compiled = false;
        }
    },

    render: function(ctx, frame) {
        var self = this;

        var render = function() {
            if(!self.compiled) {
                self._compile();
            }

            var context = new Context(ctx || {}, self.blocks);

            return self.rootRenderFunc(self.env,
                context,
                frame || new Frame(),
                runtime);
        };

        return lib.withPrettyErrors(this.path, this.env.dev, render);
    },

    isUpToDate: function() {
        return this.upToDate();
    },

    getExported: function() {
        if(!this.compiled) {
            this._compile();
        }

        // Run the rootRenderFunc to populate the context with exported vars
        var context = new Context({}, this.blocks);
        this.rootRenderFunc(this.env,
                            context,
                            new Frame(),
                            runtime);
        return context.getExported();
    },

    _compile: function() {
        var props;

        if(this.tmplProps) {
            props = this.tmplProps;
        }
        else {
            var source = compiler.compile(this.tmplStr, this.env.extensionsList, this.path);
            var func = new Function(source);
            props = func();
        }

        this.blocks = this._getBlocks(props);
        this.rootRenderFunc = props.root;
        this.compiled = true;
    },

    _getBlocks: function(props) {
        var blocks = {};

        for(var k in props) {
            if(k.slice(0, 2) == 'b_') {
                blocks[k.slice(2)] = props[k];
            }
        }

        return blocks;
    }
});

// var fs = modules["fs"];
// var src = fs.readFileSync('test.html', 'utf-8');
// var src = '{% macro foo(x) %}{{ x }}{% endmacro %}{{ foo("<>") }}';
// var env = new Environment(null, { autoescape: true, dev: true });

// env.addFilter('bar', function(x) {
//     return runtime.copySafeness(x, x.substring(3, 1) + x.substring(0, 2));
// });

// //env.addExtension('testExtension', new testExtension());
// console.log(compiler.compile(src));

// var tmpl = new Template(src, env);
// console.log("OUTPUT ---");
// console.log(tmpl.render({ bar: '<>&' }));

modules['environment'] = {
    Environment: Environment,
    Template: Template
};
})();
var nunjucks;

var env = modules["environment"];
var compiler = modules["compiler"];
var parser = modules["parser"];
var lexer = modules["lexer"];
var runtime = modules["runtime"];
var loaders = modules["loaders"];

nunjucks = {};
nunjucks.Environment = env.Environment;
nunjucks.Template = env.Template;

// loaders is not available when using precompiled templates
if(loaders) {
    if(loaders.FileSystemLoader) {
        nunjucks.FileSystemLoader = loaders.FileSystemLoader;
    }
    else {
        nunjucks.HttpLoader = loaders.HttpLoader;
    }
}

nunjucks.compiler = compiler;
nunjucks.parser = parser;
nunjucks.lexer = lexer;
nunjucks.runtime = runtime;

nunjucks.require = function(name) { return modules[name]; };

if(typeof define === 'function' && define.amd) {
    define(function() { return nunjucks; });
}
else {
    window.nunjucks = nunjucks;
}

})();
