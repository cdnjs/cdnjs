/*[global-shim-start]*/
(function(exports, global, doEval){ // jshint ignore:line
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var set = function(name, val){
		var parts = name.split("."),
			cur = global,
			i, part, next;
		for(i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if(!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod){
		if(!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, "default": true };
		for(var p in mod) {
			if(!esProps[p]) return false;
		}
		return true;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		result = module && module.exports ? module.exports : result;
		modules[moduleName] = result;

		// Set global exports
		var globalExport = exports[moduleName];
		if(globalExport && !get(globalExport)) {
			if(useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				doEval(__load.source, global);
			}
		};
	});
}
)({"jquery":"jQuery","can-util/namespace":"can","kefir":"Kefir","validate.js":"validate"},window,function(__$source__, __$global__) { // jshint ignore:line
	eval("(function() { " + __$source__ + " \n }).call(__$global__);");
}
)
/*can-namespace@1.0.0#can-namespace*/
define('can-namespace', function (require, exports, module) {
    module.exports = {};
});
/*can-util@3.2.2#namespace*/
define('can-util/namespace', function (require, exports, module) {
    module.exports = require('can-namespace');
});
/*can-util@3.2.2#js/assign/assign*/
define('can-util/js/assign/assign', function (require, exports, module) {
    module.exports = function (d, s) {
        for (var prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
});
/*can-util@3.2.2#js/is-array/is-array*/
define('can-util/js/is-array/is-array', function (require, exports, module) {
    module.exports = function (arr) {
        return Array.isArray(arr);
    };
});
/*can-util@3.2.2#js/is-function/is-function*/
define('can-util/js/is-function/is-function', function (require, exports, module) {
    var isFunction = function () {
        if (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') {
            return function (value) {
                return Object.prototype.toString.call(value) === '[object Function]';
            };
        }
        return function (value) {
            return typeof value === 'function';
        };
    }();
    module.exports = isFunction;
});
/*can-util@3.2.2#js/is-plain-object/is-plain-object*/
define('can-util/js/is-plain-object/is-plain-object', function (require, exports, module) {
    var core_hasOwn = Object.prototype.hasOwnProperty;
    function isWindow(obj) {
        return obj !== null && obj == obj.window;
    }
    function isPlainObject(obj) {
        if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
            return false;
        }
        try {
            if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                return false;
            }
        } catch (e) {
            return false;
        }
        var key;
        for (key in obj) {
        }
        return key === undefined || core_hasOwn.call(obj, key);
    }
    module.exports = isPlainObject;
});
/*can-util@3.2.2#js/deep-assign/deep-assign*/
define('can-util/js/deep-assign/deep-assign', function (require, exports, module) {
    var isArray = require('can-util/js/is-array/is-array');
    var isFunction = require('can-util/js/is-function/is-function');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    function deepAssign() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length;
        if (typeof target !== 'object' && !isFunction(target)) {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[name] = deepAssign(clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
    module.exports = deepAssign;
});
/*can-util@3.2.2#js/log/log*/
define('can-util/js/log/log', function (require, exports, module) {
    exports.warnTimeout = 5000;
    exports.logLevel = 0;
    exports.warn = function (out) {
        var ll = this.logLevel;
        if (ll < 2) {
            Array.prototype.unshift.call(arguments, 'WARN:');
            if (typeof console !== 'undefined' && console.warn) {
                this._logger('warn', Array.prototype.slice.call(arguments));
            } else if (typeof console !== 'undefined' && console.log) {
                this._logger('log', Array.prototype.slice.call(arguments));
            } else if (window && window.opera && window.opera.postError) {
                window.opera.postError('CanJS WARNING: ' + out);
            }
        }
    };
    exports.log = function (out) {
        var ll = this.logLevel;
        if (ll < 1) {
            if (typeof console !== 'undefined' && console.log) {
                Array.prototype.unshift.call(arguments, 'INFO:');
                this._logger('log', Array.prototype.slice.call(arguments));
            } else if (window && window.opera && window.opera.postError) {
                window.opera.postError('CanJS INFO: ' + out);
            }
        }
    };
    exports.error = function (out) {
        var ll = this.logLevel;
        if (ll < 1) {
            if (typeof console !== 'undefined' && console.error) {
                Array.prototype.unshift.call(arguments, 'ERROR:');
                this._logger('error', Array.prototype.slice.call(arguments));
            } else if (window && window.opera && window.opera.postError) {
                window.opera.postError('ERROR: ' + out);
            }
        }
    };
    exports._logger = function (type, arr) {
        try {
            console[type].apply(console, arr);
        } catch (e) {
            console[type](arr);
        }
    };
});
/*can-util@3.2.2#js/dev/dev*/
define('can-util/js/dev/dev', function (require, exports, module) {
    var canLog = require('can-util/js/log/log');
    module.exports = {
        warnTimeout: 5000,
        logLevel: 0,
        warn: function () {
            canLog.warn.apply(this, arguments);
        },
        log: function () {
            canLog.log.apply(this, arguments);
        },
        _logger: canLog._logger
    };
});
/*can-util@3.2.2#js/is-array-like/is-array-like*/
define('can-util/js/is-array-like/is-array-like', function (require, exports, module) {
    function isArrayLike(obj) {
        var type = typeof obj;
        if (type === 'string') {
            return true;
        }
        var length = obj && type !== 'boolean' && typeof obj !== 'number' && 'length' in obj && obj.length;
        return typeof arr !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
    }
    module.exports = isArrayLike;
});
/*can-types@1.0.2#can-types*/
define('can-types', function (require, exports, module) {
    var namespace = require('can-namespace');
    var types = {
        isMapLike: function () {
            return false;
        },
        isListLike: function () {
            return false;
        },
        isPromise: function (obj) {
            return obj instanceof Promise || Object.prototype.toString.call(obj) === '[object Promise]';
        },
        isConstructor: function (func) {
            if (typeof func !== 'function') {
                return false;
            }
            for (var prop in func.prototype) {
                return true;
            }
            return false;
        },
        isCallableForValue: function (obj) {
            return typeof obj === 'function' && !types.isConstructor(obj);
        },
        isCompute: function (obj) {
            return obj && obj.isComputed;
        },
        iterator: typeof Symbol === 'function' && Symbol.iterator || '@@iterator',
        DefaultMap: null,
        DefaultList: null,
        queueTask: function (task) {
            var args = task[2] || [];
            task[0].apply(task[1], args);
        },
        wrapElement: function (element) {
            return element;
        },
        unwrapElement: function (element) {
            return element;
        }
    };
    if (namespace.types) {
        throw new Error('You can\'t have two versions of can-types, check your dependencies');
    } else {
        module.exports = namespace.types = types;
    }
});
/*can-util@3.2.2#js/is-iterable/is-iterable*/
define('can-util/js/is-iterable/is-iterable', function (require, exports, module) {
    var types = require('can-types');
    module.exports = function (obj) {
        return obj && !!obj[types.iterator];
    };
});
/*can-util@3.2.2#js/each/each*/
define('can-util/js/each/each', function (require, exports, module) {
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    var has = Object.prototype.hasOwnProperty;
    var isIterable = require('can-util/js/is-iterable/is-iterable');
    var types = require('can-types');
    function each(elements, callback, context) {
        var i = 0, key, len, item;
        if (elements) {
            if (isArrayLike(elements)) {
                for (len = elements.length; i < len; i++) {
                    item = elements[i];
                    if (callback.call(context || item, item, i, elements) === false) {
                        break;
                    }
                }
            } else if (isIterable(elements)) {
                var iter = elements[types.iterator]();
                var res, value;
                while (!(res = iter.next()).done) {
                    value = res.value;
                    callback.call(context || elements, Array.isArray(value) ? value[1] : value, value[0]);
                }
            } else if (typeof elements === 'object') {
                for (key in elements) {
                    if (has.call(elements, key) && callback.call(context || elements[key], elements[key], key, elements) === false) {
                        break;
                    }
                }
            }
        }
        return elements;
    }
    module.exports = each;
});
/*can-util@3.2.2#js/make-array/make-array*/
define('can-util/js/make-array/make-array', function (require, exports, module) {
    var each = require('can-util/js/each/each');
    function makeArray(arr) {
        var ret = [];
        each(arr, function (a, i) {
            ret[i] = a;
        });
        return ret;
    }
    module.exports = makeArray;
});
/*can-util@3.2.2#js/is-container/is-container*/
define('can-util/js/is-container/is-container', function (require, exports, module) {
    module.exports = function (current) {
        return /^f|^o/.test(typeof current);
    };
});
/*can-util@3.2.2#js/get/get*/
define('can-util/js/get/get', function (require, exports, module) {
    var isContainer = require('can-util/js/is-container/is-container');
    function get(obj, name) {
        var parts = typeof name !== 'undefined' ? (name + '').replace(/\[/g, '.').replace(/]/g, '').split('.') : [], length = parts.length, current, i, container;
        if (!length) {
            return obj;
        }
        current = obj;
        for (i = 0; i < length && isContainer(current); i++) {
            container = current;
            current = container[parts[i]];
        }
        return current;
    }
    module.exports = get;
});
/*can-util@3.2.2#js/string/string*/
define('can-util/js/string/string', function (require, exports, module) {
    var get = require('can-util/js/get/get');
    var isContainer = require('can-util/js/is-container/is-container');
    var canDev = require('can-util/js/dev/dev');
    var isArray = require('can-util/js/is-array/is-array');
    var strUndHash = /_|-/, strColons = /\=\=/, strWords = /([A-Z]+)([A-Z][a-z])/g, strLowUp = /([a-z\d])([A-Z])/g, strDash = /([a-z\d])([A-Z])/g, strReplacer = /\{([^\}]+)\}/g, strQuote = /"/g, strSingleQuote = /'/g, strHyphenMatch = /-+(.)?/g, strCamelMatch = /[a-z][A-Z]/g, convertBadValues = function (content) {
            var isInvalid = content === null || content === undefined || isNaN(content) && '' + content === 'NaN';
            return '' + (isInvalid ? '' : content);
        }, deleteAtPath = function (data, path) {
            var parts = path ? path.replace(/\[/g, '.').replace(/]/g, '').split('.') : [];
            var current = data;
            for (var i = 0; i < parts.length - 1; i++) {
                if (current) {
                    current = current[parts[i]];
                }
            }
            if (current) {
                delete current[parts[parts.length - 1]];
            }
        };
    var string = {
        esc: function (content) {
            return convertBadValues(content).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(strQuote, '&#34;').replace(strSingleQuote, '&#39;');
        },
        getObject: function (name, roots) {
            canDev.warn('string.getObject is deprecated, please use can-util/js/get/get instead.');
            roots = isArray(roots) ? roots : [roots || window];
            var result, l = roots.length;
            for (var i = 0; i < l; i++) {
                result = get(roots[i], name);
                if (result) {
                    return result;
                }
            }
        },
        capitalize: function (s, cache) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        },
        camelize: function (str) {
            return convertBadValues(str).replace(strHyphenMatch, function (match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
        },
        hyphenate: function (str) {
            return convertBadValues(str).replace(strCamelMatch, function (str, offset) {
                return str.charAt(0) + '-' + str.charAt(1).toLowerCase();
            });
        },
        underscore: function (s) {
            return s.replace(strColons, '/').replace(strWords, '$1_$2').replace(strLowUp, '$1_$2').replace(strDash, '_').toLowerCase();
        },
        sub: function (str, data, remove) {
            var obs = [];
            str = str || '';
            obs.push(str.replace(strReplacer, function (whole, inside) {
                var ob = get(data, inside);
                if (remove === true) {
                    deleteAtPath(data, inside);
                }
                if (ob === undefined || ob === null) {
                    obs = null;
                    return '';
                }
                if (isContainer(ob) && obs) {
                    obs.push(ob);
                    return '';
                }
                return '' + ob;
            }));
            return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
        },
        replacer: strReplacer,
        undHash: strUndHash
    };
    module.exports = string;
});
/*can-construct@3.0.6#can-construct*/
define('can-construct', function (require, exports, module) {
    'use strict';
    var assign = require('can-util/js/assign/assign');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var dev = require('can-util/js/dev/dev');
    var makeArray = require('can-util/js/make-array/make-array');
    var types = require('can-types');
    var namespace = require('can-namespace');
    var CanString = require('can-util/js/string/string');
    var reservedWords = {
        'abstract': true,
        'boolean': true,
        'break': true,
        'byte': true,
        'case': true,
        'catch': true,
        'char': true,
        'class': true,
        'const': true,
        'continue': true,
        'debugger': true,
        'default': true,
        'delete': true,
        'do': true,
        'double': true,
        'else': true,
        'enum': true,
        'export': true,
        'extends': true,
        'false': true,
        'final': true,
        'finally': true,
        'float': true,
        'for': true,
        'function': true,
        'goto': true,
        'if': true,
        'implements': true,
        'import': true,
        'in': true,
        'instanceof': true,
        'int': true,
        'interface': true,
        'let': true,
        'long': true,
        'native': true,
        'new': true,
        'null': true,
        'package': true,
        'private': true,
        'protected': true,
        'public': true,
        'return': true,
        'short': true,
        'static': true,
        'super': true,
        'switch': true,
        'synchronized': true,
        'this': true,
        'throw': true,
        'throws': true,
        'transient': true,
        'true': true,
        'try': true,
        'typeof': true,
        'var': true,
        'void': true,
        'volatile': true,
        'while': true,
        'with': true
    };
    var constructorNameRegex = /[^A-Z0-9_]/gi;
    var initializing = 0;
    var namedCtor = function (cache) {
        return function (name, fn) {
            return (name in cache ? cache[name] : cache[name] = new Function('__', 'function ' + name + '(){return __.apply(this,arguments)};return ' + name))(fn);
        };
    }({});
    var Construct = function () {
        if (arguments.length) {
            return Construct.extend.apply(Construct, arguments);
        }
    };
    var canGetDescriptor;
    try {
        Object.getOwnPropertyDescriptor({});
        canGetDescriptor = true;
    } catch (e) {
        canGetDescriptor = false;
    }
    var getDescriptor = function (newProps, name) {
            var descriptor = Object.getOwnPropertyDescriptor(newProps, name);
            if (descriptor && (descriptor.get || descriptor.set)) {
                return descriptor;
            }
            return null;
        }, inheritGetterSetter = function (newProps, oldProps, addTo) {
            addTo = addTo || newProps;
            var descriptor;
            for (var name in newProps) {
                if (descriptor = getDescriptor(newProps, name)) {
                    this._defineProperty(addTo, oldProps, name, descriptor);
                } else {
                    Construct._overwrite(addTo, oldProps, name, newProps[name]);
                }
            }
        }, simpleInherit = function (newProps, oldProps, addTo) {
            addTo = addTo || newProps;
            for (var name in newProps) {
                Construct._overwrite(addTo, oldProps, name, newProps[name]);
            }
        };
    assign(Construct, {
        constructorExtends: true,
        newInstance: function () {
            var inst = this.instance(), args;
            if (inst.setup) {
                Object.defineProperty(inst, '__inSetup', {
                    configurable: true,
                    enumerable: false,
                    value: true,
                    writable: true
                });
                args = inst.setup.apply(inst, arguments);
                inst.__inSetup = false;
            }
            if (inst.init) {
                inst.init.apply(inst, args || arguments);
            }
            return inst;
        },
        _inherit: canGetDescriptor ? inheritGetterSetter : simpleInherit,
        _defineProperty: function (what, oldProps, propName, descriptor) {
            Object.defineProperty(what, propName, descriptor);
        },
        _overwrite: function (what, oldProps, propName, val) {
            Object.defineProperty(what, propName, {
                value: val,
                configurable: true,
                enumerable: true,
                writable: true
            });
        },
        setup: function (base) {
            this.defaults = deepAssign(true, {}, base.defaults, this.defaults);
        },
        instance: function () {
            initializing = 1;
            var inst = new this();
            initializing = 0;
            return inst;
        },
        extend: function (name, staticProperties, instanceProperties) {
            var shortName = name, klass = staticProperties, proto = instanceProperties;
            if (typeof shortName !== 'string') {
                proto = klass;
                klass = shortName;
                shortName = null;
            }
            if (!proto) {
                proto = klass;
                klass = null;
            }
            proto = proto || {};
            var _super_class = this, _super = this.prototype, Constructor, prototype;
            prototype = this.instance();
            Construct._inherit(proto, _super, prototype);
            if (shortName) {
            } else if (klass && klass.shortName) {
                shortName = klass.shortName;
            } else if (this.shortName) {
                shortName = this.shortName;
            }
            var constructorName = shortName ? shortName.replace(constructorNameRegex, '_') : 'Constructor';
            if (reservedWords[constructorName]) {
                constructorName = CanString.capitalize(constructorName);
            }
            function init() {
                if (!initializing) {
                    if (!this || this.constructor !== Constructor && arguments.length && Constructor.constructorExtends) {
                        dev.warn('can/construct/construct.js: extending a Construct without calling extend');
                    }
                    return (!this || this.constructor !== Constructor) && arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) : Constructor.newInstance.apply(Constructor, arguments);
                }
            }
            Constructor = typeof namedCtor === 'function' ? namedCtor(constructorName, init) : function () {
                return init.apply(this, arguments);
            };
            for (var propName in _super_class) {
                if (_super_class.hasOwnProperty(propName)) {
                    Constructor[propName] = _super_class[propName];
                }
            }
            Construct._inherit(klass, _super_class, Constructor);
            assign(Constructor, {
                constructor: Constructor,
                prototype: prototype
            });
            if (shortName !== undefined) {
                Constructor.shortName = shortName;
            }
            Constructor.prototype.constructor = Constructor;
            var t = [_super_class].concat(makeArray(arguments)), args = Constructor.setup.apply(Constructor, t);
            if (Constructor.init) {
                Constructor.init.apply(Constructor, args || t);
            }
            return Constructor;
        }
    });
    Construct.prototype.setup = function () {
    };
    Construct.prototype.init = function () {
    };
    var oldIsConstructor = types.isConstructor;
    types.isConstructor = function (obj) {
        return obj.prototype instanceof Construct || oldIsConstructor.call(null, obj);
    };
    module.exports = namespace.Construct = Construct;
});
/*can-util@3.2.2#js/is-empty-object/is-empty-object*/
define('can-util/js/is-empty-object/is-empty-object', function (require, exports, module) {
    module.exports = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
});
/*can-util@3.2.2#dom/data/data*/
define('can-util/dom/data/data', function (require, exports, module) {
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var data = {};
    var expando = 'can' + new Date();
    var uuid = 0;
    var setData = function (name, value) {
        var id = this[expando] || (this[expando] = ++uuid), store = data[id] || (data[id] = {});
        if (name !== undefined) {
            store[name] = value;
        }
        return store;
    };
    module.exports = {
        getCid: function () {
            return this[expando];
        },
        cid: function () {
            return this[expando] || (this[expando] = ++uuid);
        },
        expando: expando,
        clean: function (prop) {
            var id = this[expando];
            if (data[id] && data[id][prop]) {
                delete data[id][prop];
            }
            if (isEmptyObject(data[id])) {
                delete data[id];
            }
        },
        get: function (key) {
            var id = this[expando], store = id && data[id];
            return key === undefined ? store || setData(this) : store && store[key];
        },
        set: setData
    };
});
/*can-util@3.2.2#dom/class-name/class-name*/
define('can-util/dom/class-name/class-name', function (require, exports, module) {
    var has = function (className) {
        if (this.classList) {
            return this.classList.contains(className);
        } else {
            return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    };
    module.exports = {
        has: has,
        add: function (className) {
            if (this.classList) {
                this.classList.add(className);
            } else if (!has.call(this, className)) {
                this.className += ' ' + className;
            }
        },
        remove: function (className) {
            if (this.classList) {
                this.classList.remove(className);
            } else if (has.call(this, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                this.className = this.className.replace(reg, ' ');
            }
        }
    };
});
/*can-util@3.2.2#js/global/global*/
define('can-util/js/global/global', function (require, exports, module) {
    (function (global) {
        var GLOBAL;
        module.exports = function (setGlobal) {
            if (setGlobal !== undefined) {
                GLOBAL = setGlobal;
            }
            if (GLOBAL) {
                return GLOBAL;
            } else {
                return GLOBAL = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : typeof process === 'object' && {}.toString.call(process) === '[object process]' ? global : window;
            }
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#dom/document/document*/
define('can-util/dom/document/document', function (require, exports, module) {
    (function (global) {
        var global = require('can-util/js/global/global');
        var setDocument;
        module.exports = function (setDoc) {
            if (setDoc) {
                setDocument = setDoc;
            }
            return setDocument || global().document;
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#dom/events/events*/
define('can-util/dom/events/events', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var _document = require('can-util/dom/document/document');
    module.exports = {
        addEventListener: function () {
            this.addEventListener.apply(this, arguments);
        },
        removeEventListener: function () {
            this.removeEventListener.apply(this, arguments);
        },
        canAddEventListener: function () {
            return this.nodeName && (this.nodeType === 1 || this.nodeType === 9) || this === window;
        },
        dispatch: function (event, args, bubbles) {
            var doc = _document();
            var ev = doc.createEvent('HTMLEvents');
            var isString = typeof event === 'string';
            ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);
            if (!isString) {
                assign(ev, event);
            }
            ev.args = args;
            return this.dispatchEvent(ev);
        }
    };
});
/*can-cid@1.0.1#can-cid*/
define('can-cid', function (require, exports, module) {
    var namespace = require('can-namespace');
    var _cid = 0;
    var cid = function (object, name) {
        if (!object._cid) {
            _cid++;
            object._cid = (name || '') + _cid;
        }
        return object._cid;
    };
    if (namespace.cid) {
        throw new Error('You can\'t have two versions of can-cid, check your dependencies');
    } else {
        module.exports = namespace.cid = cid;
    }
});
/*can-util@3.2.2#dom/dispatch/dispatch*/
define('can-util/dom/dispatch/dispatch', function (require, exports, module) {
    var domEvents = require('can-util/dom/events/events');
    module.exports = function () {
        return domEvents.dispatch.apply(this, arguments);
    };
});
/*can-util@3.2.2#dom/matches/matches*/
define('can-util/dom/matches/matches', function (require, exports, module) {
    var matchesMethod = function (element) {
        return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
    };
    module.exports = function () {
        var method = matchesMethod(this);
        return method ? method.apply(this, arguments) : false;
    };
});
/*can-util@3.2.2#dom/events/delegate/delegate*/
define('can-util/dom/events/delegate/delegate', function (require, exports, module) {
    var domEvents = require('can-util/dom/events/events');
    var domData = require('can-util/dom/data/data');
    var domMatches = require('can-util/dom/matches/matches');
    var each = require('can-util/js/each/each');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var dataName = 'delegateEvents';
    var useCapture = function (eventType) {
        return eventType === 'focus' || eventType === 'blur';
    };
    var handleEvent = function (ev) {
        var events = domData.get.call(this, dataName);
        var eventTypeEvents = events[ev.type];
        var matches = [];
        if (eventTypeEvents) {
            var selectorDelegates = [];
            each(eventTypeEvents, function (delegates) {
                selectorDelegates.push(delegates);
            });
            var cur = ev.target;
            do {
                selectorDelegates.forEach(function (delegates) {
                    if (domMatches.call(cur, delegates[0].selector)) {
                        matches.push({
                            target: cur,
                            delegates: delegates
                        });
                    }
                });
                cur = cur.parentNode;
            } while (cur && cur !== ev.currentTarget);
        }
        var oldStopProp = ev.stopPropagation;
        ev.stopPropagation = function () {
            oldStopProp.apply(this, arguments);
            this.cancelBubble = true;
        };
        for (var i = 0; i < matches.length; i++) {
            var match = matches[i];
            var delegates = match.delegates;
            for (var d = 0, dLen = delegates.length; d < dLen; d++) {
                if (delegates[d].handler.call(match.target, ev) === false) {
                    return false;
                }
                if (ev.cancelBubble) {
                    return;
                }
            }
        }
    };
    domEvents.addDelegateListener = function (eventType, selector, handler) {
        var events = domData.get.call(this, dataName), eventTypeEvents;
        if (!events) {
            domData.set.call(this, dataName, events = {});
        }
        if (!(eventTypeEvents = events[eventType])) {
            eventTypeEvents = events[eventType] = {};
            domEvents.addEventListener.call(this, eventType, handleEvent, useCapture(eventType));
        }
        if (!eventTypeEvents[selector]) {
            eventTypeEvents[selector] = [];
        }
        eventTypeEvents[selector].push({
            handler: handler,
            selector: selector
        });
    };
    domEvents.removeDelegateListener = function (eventType, selector, handler) {
        var events = domData.get.call(this, dataName);
        if (events[eventType] && events[eventType][selector]) {
            var eventTypeEvents = events[eventType], delegates = eventTypeEvents[selector], i = 0;
            while (i < delegates.length) {
                if (delegates[i].handler === handler) {
                    delegates.splice(i, 1);
                } else {
                    i++;
                }
            }
            if (delegates.length === 0) {
                delete eventTypeEvents[selector];
                if (isEmptyObject(eventTypeEvents)) {
                    domEvents.removeEventListener.call(this, eventType, handleEvent, useCapture(eventType));
                    delete events[eventType];
                    if (isEmptyObject(events)) {
                        domData.clean.call(this, dataName);
                    }
                }
            }
        }
    };
});
/*can-event@3.0.2#can-event*/
define('can-event', function (require, exports, module) {
    var domEvents = require('can-util/dom/events/events');
    var CID = require('can-cid');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var domDispatch = require('can-util/dom/dispatch/dispatch');
    var namespace = require('can-namespace');
    require('can-util/dom/events/delegate/delegate');
    function makeHandlerArgs(event, args) {
        if (typeof event === 'string') {
            event = { type: event };
        }
        var handlerArgs = [event];
        if (args) {
            handlerArgs.push.apply(handlerArgs, args);
        }
        return handlerArgs;
    }
    function getHandlers(eventName) {
        var events = this.__bindEvents;
        if (!events) {
            return;
        }
        var handlers = events[eventName];
        if (!handlers) {
            return;
        } else {
            return handlers;
        }
    }
    var canEvent = {
        addEventListener: function (event, handler) {
            var allEvents = this.__bindEvents || (this.__bindEvents = {}), eventList = allEvents[event] || (allEvents[event] = []);
            eventList.push(handler);
            return this;
        },
        removeEventListener: function (event, fn) {
            if (!this.__bindEvents) {
                return this;
            }
            var handlers = this.__bindEvents[event] || [], i = 0, handler, isFunction = typeof fn === 'function';
            while (i < handlers.length) {
                handler = handlers[i];
                if (isFunction && handler === fn || !isFunction && (handler.cid === fn || !fn)) {
                    handlers.splice(i, 1);
                } else {
                    i++;
                }
            }
            return this;
        },
        dispatchSync: function (event, args) {
            var handlerArgs = makeHandlerArgs(event, args);
            var handlers = getHandlers.call(this, handlerArgs[0].type);
            if (!handlers) {
                return;
            }
            handlers = handlers.slice(0);
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].apply(this, handlerArgs);
            }
            return handlerArgs[0];
        },
        on: function (eventName, selector, handler) {
            var method = typeof selector === 'string' ? 'addDelegateListener' : 'addEventListener';
            var listenWithDOM = domEvents.canAddEventListener.call(this);
            var eventBinder = listenWithDOM ? domEvents[method] : this[method] || canEvent[method];
            return eventBinder.apply(this, arguments);
        },
        off: function (eventName, selector, handler) {
            var method = typeof selector === 'string' ? 'removeDelegateListener' : 'removeEventListener';
            var listenWithDOM = domEvents.canAddEventListener.call(this);
            var eventBinder = listenWithDOM ? domEvents[method] : this[method] || canEvent[method];
            return eventBinder.apply(this, arguments);
        },
        trigger: function () {
            var listenWithDOM = domEvents.canAddEventListener.call(this);
            var dispatch = listenWithDOM ? domDispatch : canEvent.dispatch;
            return dispatch.apply(this, arguments);
        },
        one: function (event, handler) {
            var one = function () {
                canEvent.off.call(this, event, one);
                return handler.apply(this, arguments);
            };
            canEvent.on.call(this, event, one);
            return this;
        },
        listenTo: function (other, event, handler) {
            var idedEvents = this.__listenToEvents;
            if (!idedEvents) {
                idedEvents = this.__listenToEvents = {};
            }
            var otherId = CID(other);
            var othersEvents = idedEvents[otherId];
            if (!othersEvents) {
                othersEvents = idedEvents[otherId] = {
                    obj: other,
                    events: {}
                };
            }
            var eventsEvents = othersEvents.events[event];
            if (!eventsEvents) {
                eventsEvents = othersEvents.events[event] = [];
            }
            eventsEvents.push(handler);
            canEvent.on.call(other, event, handler);
        },
        stopListening: function (other, event, handler) {
            var idedEvents = this.__listenToEvents, iterIdedEvents = idedEvents, i = 0;
            if (!idedEvents) {
                return this;
            }
            if (other) {
                var othercid = CID(other);
                (iterIdedEvents = {})[othercid] = idedEvents[othercid];
                if (!idedEvents[othercid]) {
                    return this;
                }
            }
            for (var cid in iterIdedEvents) {
                var othersEvents = iterIdedEvents[cid], eventsEvents;
                other = idedEvents[cid].obj;
                if (!event) {
                    eventsEvents = othersEvents.events;
                } else {
                    (eventsEvents = {})[event] = othersEvents.events[event];
                }
                for (var eventName in eventsEvents) {
                    var handlers = eventsEvents[eventName] || [];
                    i = 0;
                    while (i < handlers.length) {
                        if (handler && handler === handlers[i] || !handler) {
                            canEvent.off.call(other, eventName, handlers[i]);
                            handlers.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    if (!handlers.length) {
                        delete othersEvents.events[eventName];
                    }
                }
                if (isEmptyObject(othersEvents.events)) {
                    delete idedEvents[cid];
                }
            }
            return this;
        }
    };
    canEvent.addEvent = canEvent.bind = function () {
        return canEvent.addEventListener.apply(this, arguments);
    };
    canEvent.unbind = canEvent.removeEvent = function () {
        return canEvent.removeEventListener.apply(this, arguments);
    };
    canEvent.delegate = canEvent.on;
    canEvent.undelegate = canEvent.off;
    canEvent.dispatch = canEvent.dispatchSync;
    Object.defineProperty(canEvent, 'makeHandlerArgs', {
        enumerable: false,
        value: makeHandlerArgs
    });
    Object.defineProperty(canEvent, 'handlers', {
        enumerable: false,
        value: getHandlers
    });
    Object.defineProperty(canEvent, 'flush', {
        enumerable: false,
        writable: true,
        value: function () {
        }
    });
    module.exports = namespace.event = canEvent;
});
/*can-util@3.2.2#js/last/last*/
define('can-util/js/last/last', function (require, exports, module) {
    module.exports = function (arr) {
        return arr && arr[arr.length - 1];
    };
});
/*can-event@3.0.2#batch/batch*/
define('can-event/batch/batch', function (require, exports, module) {
    'use strict';
    var canEvent = require('can-event');
    var last = require('can-util/js/last/last');
    var namespace = require('can-namespace');
    var canTypes = require('can-types');
    var canDev = require('can-util/js/dev/dev');
    var group = console.group && console.group.bind(console) || console.log;
    var groupEnd = console.groupEnd && console.groupEnd.bind(console) || function () {
    };
    var batchNum = 1, collectionQueue = null, queues = [], dispatchingQueues = false, makeHandlerArgs = canEvent.makeHandlerArgs, getHandlers = canEvent.handlers;
    function addToCollectionQueue(item, event, args, handlers) {
        var handlerArgs = makeHandlerArgs(event, args);
        var tasks = [];
        for (var i = 0, len = handlers.length; i < len; i++) {
            tasks[i] = [
                handlers[i],
                item,
                handlerArgs
            ];
        }
        [].push.apply(collectionQueue.tasks, tasks);
    }
    var canBatch = {
        transactions: 0,
        start: function (batchStopHandler) {
            canBatch.transactions++;
            if (canBatch.transactions === 1) {
                var queue = {
                    number: batchNum++,
                    index: 0,
                    tasks: [],
                    batchEnded: false,
                    callbacksIndex: 0,
                    callbacks: [],
                    complete: false
                };
                if (batchStopHandler) {
                    queue.callbacks.push(batchStopHandler);
                }
                collectionQueue = queue;
            }
        },
        collecting: function () {
            return collectionQueue;
        },
        dispatching: function () {
            return queues[0];
        },
        stop: function (force, callStart) {
            if (force) {
                canBatch.transactions = 0;
            } else {
                canBatch.transactions--;
            }
            if (canBatch.transactions === 0) {
                queues.push(collectionQueue);
                collectionQueue = null;
                if (!dispatchingQueues) {
                    canEvent.flush();
                }
            }
        },
        flush: function () {
            var debug = canDev.logLevel >= 1;
            dispatchingQueues = true;
            while (queues.length) {
                var queue = queues[0];
                var tasks = queue.tasks, callbacks = queue.callbacks;
                canBatch.batchNum = queue.number;
                var len = tasks.length, index;
                if (debug && queue.index === 0 && queue.index < len) {
                    group('batch running ' + queue.number);
                }
                while (queue.index < len) {
                    index = queue.index++;
                    if (debug) {
                        var context = tasks[index][1];
                        var args = tasks[index][2];
                        if (args && args[0]) {
                            console.log('dispatching', args[0].type, 'on', context);
                        }
                    }
                    tasks[index][0].apply(tasks[index][1], tasks[index][2]);
                }
                if (!queue.batchEnded) {
                    if (debug) {
                        console.log('tasks ended');
                    }
                    queue.batchEnded = true;
                    canEvent.dispatchSync.call(canBatch, 'batchEnd', [queue.number]);
                }
                if (debug && queue.callbacksIndex < callbacks.length) {
                    console.log('calling callbacks');
                }
                while (queue.callbacksIndex < callbacks.length) {
                    callbacks[queue.callbacksIndex++]();
                }
                if (!queue.complete) {
                    queue.complete = true;
                    canBatch.batchNum = undefined;
                    queues.shift();
                    if (debug) {
                        groupEnd();
                    }
                }
            }
            dispatchingQueues = false;
        },
        dispatch: function (event, args) {
            var item = this, handlers;
            if (!item.__inSetup) {
                event = typeof event === 'string' ? { type: event } : event;
                if (event.batchNum) {
                    canEvent.dispatchSync.call(item, event, args);
                } else if (collectionQueue) {
                    handlers = getHandlers.call(this, event.type);
                    if (handlers) {
                        event.batchNum = collectionQueue.number;
                        addToCollectionQueue(item, event, args, handlers);
                    }
                } else if (queues.length) {
                    handlers = getHandlers.call(this, event.type);
                    if (handlers) {
                        canBatch.start();
                        event.batchNum = collectionQueue.number;
                        addToCollectionQueue(item, event, args, handlers);
                        last(queues).callbacks.push(canBatch.stop);
                    }
                } else {
                    handlers = getHandlers.call(this, event.type);
                    if (handlers) {
                        canBatch.start();
                        event.batchNum = collectionQueue.number;
                        addToCollectionQueue(item, event, args, handlers);
                        canBatch.stop();
                    }
                }
            }
        },
        queue: function (task, inCurrentBatch) {
            if (collectionQueue) {
                collectionQueue.tasks.push(task);
            } else if (queues.length) {
                if (inCurrentBatch && queues[0].index < queues.tasks.length) {
                    queues[0].tasks.push(task);
                } else {
                    canBatch.start();
                    collectionQueue.tasks.push(task);
                    last(queues).callbacks.push(canBatch.stop);
                }
            } else {
                canBatch.start();
                collectionQueue.tasks.push(task);
                canBatch.stop();
            }
        },
        queues: function () {
            return queues;
        },
        afterPreviousEvents: function (handler) {
            this.queue([handler]);
        },
        after: function (handler) {
            var queue = collectionQueue || queues[0];
            if (queue) {
                queue.callbacks.push(handler);
            } else {
                handler({});
            }
        }
    };
    canEvent.flush = canBatch.flush;
    canEvent.dispatch = canBatch.dispatch;
    canBatch.trigger = function () {
        console.warn('use canEvent.dispatch instead');
        return canEvent.dispatch.apply(this, arguments);
    };
    canTypes.queueTask = canBatch.queue;
    module.exports = namespace.batch = canBatch;
});
/*can-observation@3.0.6#can-observation*/
define('can-observation', function (require, exports, module) {
    require('can-event');
    var canEvent = require('can-event');
    var canBatch = require('can-event/batch/batch');
    var assign = require('can-util/js/assign/assign');
    var namespace = require('can-namespace');
    var remaining = {
        updates: 0,
        notifications: 0
    };
    function Observation(func, context, compute) {
        this.newObserved = {};
        this.oldObserved = null;
        this.func = func;
        this.context = context;
        this.compute = compute.updater ? compute : { updater: compute };
        this.onDependencyChange = this.onDependencyChange.bind(this);
        this.childDepths = {};
        this.ignore = 0;
        this.needsUpdate = false;
    }
    var observationStack = [];
    assign(Observation.prototype, {
        get: function () {
            if (this.bound) {
                canEvent.flush();
                if (remaining.updates) {
                    Observation.updateChildrenAndSelf(this);
                }
                return this.value;
            } else {
                return this.func.call(this.context);
            }
        },
        getPrimaryDepth: function () {
            return this.compute._primaryDepth || 0;
        },
        addEdge: function (objEv) {
            objEv.obj.addEventListener(objEv.event, this.onDependencyChange);
            if (objEv.obj.observation) {
                this.depth = null;
            }
        },
        removeEdge: function (objEv) {
            objEv.obj.removeEventListener(objEv.event, this.onDependencyChange);
            if (objEv.obj.observation) {
                this.depth = null;
            }
        },
        dependencyChange: function (ev) {
            if (this.bound) {
                if (ev.batchNum !== this.batchNum) {
                    Observation.registerUpdate(this, ev.batchNum);
                    this.batchNum = ev.batchNum;
                }
            }
        },
        onDependencyChange: function (ev, newVal, oldVal) {
            this.dependencyChange(ev, newVal, oldVal);
        },
        update: function (batchNum) {
            if (this.needsUpdate) {
                remaining.updates--;
            }
            this.needsUpdate = false;
            if (this.bound) {
                var oldValue = this.value;
                this.oldValue = null;
                this.start();
                if (oldValue !== this.value) {
                    this.compute.updater(this.value, oldValue, batchNum);
                    return true;
                }
            }
        },
        getValueAndBind: function () {
            console.warn('can-observation: call start instead of getValueAndBind');
            return this.start();
        },
        start: function () {
            this.bound = true;
            this.oldObserved = this.newObserved || {};
            this.ignore = 0;
            this.newObserved = {};
            observationStack.push(this);
            this.value = this.func.call(this.context);
            observationStack.pop();
            this.updateBindings();
        },
        updateBindings: function () {
            var newObserved = this.newObserved, oldObserved = this.oldObserved, name, obEv;
            for (name in newObserved) {
                obEv = newObserved[name];
                if (!oldObserved[name]) {
                    this.addEdge(obEv);
                } else {
                    oldObserved[name] = null;
                }
            }
            for (name in oldObserved) {
                obEv = oldObserved[name];
                if (obEv) {
                    this.removeEdge(obEv);
                }
            }
        },
        teardown: function () {
            console.warn('can-observation: call stop instead of teardown');
            return this.stop();
        },
        stop: function () {
            this.bound = false;
            for (var name in this.newObserved) {
                var ob = this.newObserved[name];
                this.removeEdge(ob);
            }
            this.newObserved = {};
        }
    });
    var updateOrder = [], curPrimaryDepth = Infinity, maxPrimaryDepth = 0, currentBatchNum, isUpdating = false;
    var updateUpdateOrder = function (observation) {
        var primaryDepth = observation.getPrimaryDepth();
        if (primaryDepth < curPrimaryDepth) {
            curPrimaryDepth = primaryDepth;
        }
        if (primaryDepth > maxPrimaryDepth) {
            maxPrimaryDepth = primaryDepth;
        }
        var primary = updateOrder[primaryDepth] || (updateOrder[primaryDepth] = []);
        return primary;
    };
    Observation.registerUpdate = function (observation, batchNum) {
        if (observation.needsUpdate) {
            return;
        }
        remaining.updates++;
        observation.needsUpdate = true;
        var objs = updateUpdateOrder(observation);
        objs.push(observation);
    };
    var afterCallbacks = [];
    Observation.updateAndNotify = function (ev, batchNum) {
        currentBatchNum = batchNum;
        if (isUpdating) {
            return;
        }
        isUpdating = true;
        while (true) {
            if (curPrimaryDepth <= maxPrimaryDepth) {
                var primary = updateOrder[curPrimaryDepth];
                var lastUpdate = primary && primary.pop();
                if (lastUpdate) {
                    lastUpdate.update(currentBatchNum);
                } else {
                    curPrimaryDepth++;
                }
            } else {
                updateOrder = [];
                curPrimaryDepth = Infinity;
                maxPrimaryDepth = 0;
                isUpdating = false;
                var afterCB = afterCallbacks;
                afterCallbacks = [];
                afterCB.forEach(function (cb) {
                    cb();
                });
                return;
            }
        }
    };
    canEvent.addEventListener.call(canBatch, 'batchEnd', Observation.updateAndNotify);
    Observation.afterUpdateAndNotify = function (callback) {
        canBatch.after(function () {
            if (isUpdating) {
                afterCallbacks.push(callback);
            } else {
                callback();
            }
        });
    };
    Observation.updateChildrenAndSelf = function (observation) {
        if (observation.needsUpdate) {
            return Observation.unregisterAndUpdate(observation);
        }
        var childHasChanged;
        for (var prop in observation.newObserved) {
            if (observation.newObserved[prop].obj.observation) {
                if (Observation.updateChildrenAndSelf(observation.newObserved[prop].obj.observation)) {
                    childHasChanged = true;
                }
            }
        }
        if (childHasChanged) {
            return observation.update(currentBatchNum);
        }
    };
    Observation.unregisterAndUpdate = function (observation) {
        var primaryDepth = observation.getPrimaryDepth();
        var primary = updateOrder[primaryDepth];
        if (primary) {
            var index = primary.indexOf(observation);
            if (index !== -1) {
                primary.splice(index, 1);
            }
        }
        return observation.update(currentBatchNum);
    };
    Observation.add = function (obj, event) {
        var top = observationStack[observationStack.length - 1];
        if (top && !top.ignore) {
            var evStr = event + '', name = obj._cid + '|' + evStr;
            if (top.traps) {
                top.traps.push({
                    obj: obj,
                    event: evStr,
                    name: name
                });
            } else {
                top.newObserved[name] = {
                    obj: obj,
                    event: evStr
                };
            }
        }
    };
    Observation.addAll = function (observes) {
        var top = observationStack[observationStack.length - 1];
        if (top) {
            if (top.traps) {
                top.traps.push.apply(top.traps, observes);
            } else {
                for (var i = 0, len = observes.length; i < len; i++) {
                    var trap = observes[i], name = trap.name;
                    if (!top.newObserved[name]) {
                        top.newObserved[name] = trap;
                    }
                }
            }
        }
    };
    Observation.ignore = function (fn) {
        return function () {
            if (observationStack.length) {
                var top = observationStack[observationStack.length - 1];
                top.ignore++;
                var res = fn.apply(this, arguments);
                top.ignore--;
                return res;
            } else {
                return fn.apply(this, arguments);
            }
        };
    };
    Observation.trap = function () {
        if (observationStack.length) {
            var top = observationStack[observationStack.length - 1];
            var oldTraps = top.traps;
            var traps = top.traps = [];
            return function () {
                top.traps = oldTraps;
                return traps;
            };
        } else {
            return function () {
                return [];
            };
        }
    };
    Observation.trapsCount = function () {
        if (observationStack.length) {
            var top = observationStack[observationStack.length - 1];
            return top.traps.length;
        } else {
            return 0;
        }
    };
    Observation.isRecording = function () {
        var len = observationStack.length;
        var last = len && observationStack[len - 1];
        return last && last.ignore === 0 && last;
    };
    if (namespace.Observation) {
        throw new Error('You can\'t have two versions of can-observation, check your dependencies');
    } else {
        module.exports = namespace.Observation = Observation;
    }
});
/*can-event@3.0.2#lifecycle/lifecycle*/
define('can-event/lifecycle/lifecycle', function (require, exports, module) {
    var canEvent = require('can-event');
    module.exports = {
        addAndSetup: function () {
            canEvent.addEventListener.apply(this, arguments);
            if (!this.__inSetup) {
                if (!this._bindings) {
                    this._bindings = 1;
                    if (this._eventSetup) {
                        this._eventSetup();
                    }
                } else {
                    this._bindings++;
                }
            }
            return this;
        },
        removeAndTeardown: function (event, handler) {
            if (!this.__bindEvents) {
                return this;
            }
            var handlers = this.__bindEvents[event] || [];
            var handlerCount = handlers.length;
            canEvent.removeEventListener.apply(this, arguments);
            if (this._bindings === null) {
                this._bindings = 0;
            } else {
                this._bindings = this._bindings - (handlerCount - handlers.length);
            }
            if (!this._bindings && this._eventTeardown) {
                this._eventTeardown();
            }
            return this;
        }
    };
});
/*can-observation@3.0.6#reader/reader*/
define('can-observation/reader/reader', function (require, exports, module) {
    var Observation = require('can-observation');
    var assign = require('can-util/js/assign/assign');
    var CID = require('can-cid');
    var types = require('can-types');
    var dev = require('can-util/js/dev/dev');
    var canEvent = require('can-event');
    var each = require('can-util/js/each/each');
    var observeReader;
    var isAt = function (index, reads) {
        var prevRead = reads[index - 1];
        return prevRead && prevRead.at;
    };
    var readValue = function (value, index, reads, options, state, prev) {
        var usedValueReader;
        do {
            usedValueReader = false;
            for (var i = 0, len = observeReader.valueReaders.length; i < len; i++) {
                if (observeReader.valueReaders[i].test(value, index, reads, options)) {
                    value = observeReader.valueReaders[i].read(value, index, reads, options, state, prev);
                }
            }
        } while (usedValueReader);
        return value;
    };
    var specialRead = {
        index: true,
        key: true,
        event: true,
        element: true,
        viewModel: true
    };
    var checkForObservableAndNotify = function (options, state, getObserves, value, index) {
        if (options.foundObservable && !state.foundObservable) {
            if (Observation.trapsCount()) {
                Observation.addAll(getObserves());
                options.foundObservable(value, index);
                state.foundObservable = true;
            }
        }
    };
    observeReader = {
        read: function (parent, reads, options) {
            options = options || {};
            var state = { foundObservable: false };
            var getObserves;
            if (options.foundObservable) {
                getObserves = Observation.trap();
            }
            var cur = readValue(parent, 0, reads, options, state), type, prev, readLength = reads.length, i = 0, last;
            checkForObservableAndNotify(options, state, getObserves, parent, 0);
            while (i < readLength) {
                prev = cur;
                for (var r = 0, readersLength = observeReader.propertyReaders.length; r < readersLength; r++) {
                    var reader = observeReader.propertyReaders[r];
                    if (reader.test(cur)) {
                        cur = reader.read(cur, reads[i], i, options, state);
                        break;
                    }
                }
                checkForObservableAndNotify(options, state, getObserves, prev, i);
                last = cur;
                i = i + 1;
                cur = readValue(cur, i, reads, options, state, prev);
                checkForObservableAndNotify(options, state, getObserves, prev, i - 1);
                type = typeof cur;
                if (i < reads.length && (cur === null || type !== 'function' && type !== 'object')) {
                    if (options.earlyExit) {
                        options.earlyExit(prev, i - 1, cur);
                    }
                    return {
                        value: undefined,
                        parent: prev
                    };
                }
            }
            if (cur === undefined) {
                if (options.earlyExit) {
                    options.earlyExit(prev, i - 1);
                }
            }
            return {
                value: cur,
                parent: prev
            };
        },
        get: function (parent, reads, options) {
            return observeReader.read(parent, observeReader.reads(reads), options || {}).value;
        },
        valueReadersMap: {},
        valueReaders: [
            {
                name: 'function',
                test: function (value, i, reads, options) {
                    return types.isCallableForValue(value) && !types.isCompute(value);
                },
                read: function (value, i, reads, options, state, prev) {
                    if (isAt(i, reads)) {
                        return i === reads.length ? value.bind(prev) : value;
                    } else if (options.callMethodsOnObservables && types.isMapLike(prev)) {
                        return value.apply(prev, options.args || []);
                    } else if (options.isArgument && i === reads.length) {
                        return options.proxyMethods !== false ? value.bind(prev) : value;
                    }
                    return value.apply(prev, options.args || []);
                }
            },
            {
                name: 'compute',
                test: function (value, i, reads, options) {
                    return types.isCompute(value) && !isAt(i, reads);
                },
                read: function (value, i, reads, options, state) {
                    if (options.readCompute === false && i === reads.length) {
                        return value;
                    }
                    return value.get ? value.get() : value();
                },
                write: function (base, newVal) {
                    if (base.set) {
                        base.set(newVal);
                    } else {
                        base(newVal);
                    }
                }
            }
        ],
        propertyReadersMap: {},
        propertyReaders: [
            {
                name: 'map',
                test: function () {
                    return types.isMapLike.apply(this, arguments) || types.isListLike.apply(this, arguments);
                },
                read: function (value, prop, index, options, state) {
                    var res = value.get ? value.get(prop.key) : value.attr(prop.key);
                    if (res !== undefined) {
                        return res;
                    } else {
                        return value[prop.key];
                    }
                },
                write: function (base, prop, newVal) {
                    if (typeof base.set === 'function') {
                        base.set(prop, newVal);
                    } else {
                        base.attr(prop, newVal);
                    }
                }
            },
            {
                name: 'promise',
                test: function (value) {
                    return types.isPromise(value);
                },
                read: function (value, prop, index, options, state) {
                    var observeData = value.__observeData;
                    if (!value.__observeData) {
                        observeData = value.__observeData = {
                            isPending: true,
                            state: 'pending',
                            isResolved: false,
                            isRejected: false,
                            value: undefined,
                            reason: undefined
                        };
                        CID(observeData);
                        assign(observeData, canEvent);
                        value.then(function (value) {
                            observeData.isPending = false;
                            observeData.isResolved = true;
                            observeData.value = value;
                            observeData.state = 'resolved';
                            observeData.dispatch('state', [
                                'resolved',
                                'pending'
                            ]);
                        }, function (reason) {
                            observeData.isPending = false;
                            observeData.isRejected = true;
                            observeData.reason = reason;
                            observeData.state = 'rejected';
                            observeData.dispatch('state', [
                                'rejected',
                                'pending'
                            ]);
                        });
                    }
                    Observation.add(observeData, 'state');
                    return prop.key in observeData ? observeData[prop.key] : value[prop.key];
                }
            },
            {
                name: 'object',
                test: function () {
                    return true;
                },
                read: function (value, prop) {
                    if (value == null) {
                        return undefined;
                    } else {
                        if (typeof value === 'object') {
                            if (prop.key in value) {
                                return value[prop.key];
                            } else if (prop.at && specialRead[prop.key] && '@' + prop.key in value) {
                                dev.warn('Use %' + prop.key + ' in place of @' + prop.key + '.');
                                return value['@' + prop.key];
                            }
                        } else {
                            return value[prop.key];
                        }
                    }
                },
                write: function (base, prop, newVal) {
                    base[prop] = newVal;
                }
            }
        ],
        reads: function (key) {
            var keys = [];
            var last = 0;
            var at = false;
            if (key.charAt(0) === '@') {
                last = 1;
                at = true;
            }
            var keyToAdd = '';
            for (var i = last; i < key.length; i++) {
                var character = key.charAt(i);
                if (character === '.' || character === '@') {
                    if (key.charAt(i - 1) !== '\\') {
                        keys.push({
                            key: keyToAdd,
                            at: at
                        });
                        at = character === '@';
                        keyToAdd = '';
                    } else {
                        keyToAdd = keyToAdd.substr(0, keyToAdd.length - 1) + '.';
                    }
                } else {
                    keyToAdd += character;
                }
            }
            keys.push({
                key: keyToAdd,
                at: at
            });
            return keys;
        },
        write: function (parent, key, value, options) {
            var keys = typeof key === 'string' ? observeReader.reads(key) : key;
            var last;
            if (keys.length > 1) {
                last = keys.pop();
                parent = observeReader.read(parent, keys, options).value;
                keys.push(last);
            } else {
                last = keys[0];
            }
            if (observeReader.valueReadersMap.compute.test(parent[last.key], keys.length - 1, keys, options)) {
                observeReader.valueReadersMap.compute.write(parent[last.key], value, options);
            } else {
                if (observeReader.valueReadersMap.compute.test(parent, keys.length - 1, keys, options)) {
                    parent = parent();
                }
                if (observeReader.propertyReadersMap.map.test(parent)) {
                    observeReader.propertyReadersMap.map.write(parent, last.key, value, options);
                } else if (observeReader.propertyReadersMap.object.test(parent)) {
                    observeReader.propertyReadersMap.object.write(parent, last.key, value, options);
                }
            }
        }
    };
    each(observeReader.propertyReaders, function (reader) {
        observeReader.propertyReadersMap[reader.name] = reader;
    });
    each(observeReader.valueReaders, function (reader) {
        observeReader.valueReadersMap[reader.name] = reader;
    });
    observeReader.set = observeReader.write;
    module.exports = observeReader;
});
/*can-compute@3.0.5#proto-compute*/
define('can-compute/proto-compute', function (require, exports, module) {
    var Observation = require('can-observation');
    var canEvent = require('can-event');
    var eventLifecycle = require('can-event/lifecycle/lifecycle');
    require('can-event/batch/batch');
    var observeReader = require('can-observation/reader/reader');
    var getObject = require('can-util/js/get/get');
    var CID = require('can-cid');
    var assign = require('can-util/js/assign/assign');
    var types = require('can-types');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var Compute = function (getterSetter, context, eventName, bindOnce) {
        CID(this, 'compute');
        var args = [];
        for (var i = 0, arglen = arguments.length; i < arglen; i++) {
            args[i] = arguments[i];
        }
        var contextType = typeof args[1];
        if (typeof args[0] === 'function') {
            this._setupGetterSetterFn(args[0], args[1], args[2], args[3]);
        } else if (args[1] !== undefined) {
            if (contextType === 'string' || contextType === 'number') {
                var isListLike = types.isListLike(args[0]);
                if (types.isMapLike(args[0]) || isListLike) {
                    var map = args[0];
                    var propertyName = args[1];
                    var mapGetterSetter = function (newValue) {
                        if (arguments.length) {
                            observeReader.set(map, propertyName, newValue);
                        } else {
                            if (isListLike) {
                                observeReader.get(map, 'length');
                            }
                            return observeReader.get(map, '' + propertyName);
                        }
                    };
                    this._setupGetterSetterFn(mapGetterSetter, args[1], args[2], args[3]);
                } else {
                    this._setupProperty(args[0], args[1], args[2]);
                }
            } else if (contextType === 'function') {
                this._setupSetter(args[0], args[1], args[2]);
            } else {
                if (args[1] && args[1].fn) {
                    this._setupAsyncCompute(args[0], args[1]);
                } else {
                    this._setupSettings(args[0], args[1]);
                }
            }
        } else {
            this._setupSimpleValue(args[0]);
        }
        this._args = args;
        this._primaryDepth = 0;
        this.isComputed = true;
    };
    var updateOnChange = function (compute, newValue, oldValue, batchNum) {
        var valueChanged = newValue !== oldValue && !(newValue !== newValue && oldValue !== oldValue);
        if (valueChanged) {
            canEvent.dispatch.call(compute, {
                type: 'change',
                batchNum: batchNum
            }, [
                newValue,
                oldValue
            ]);
        }
    };
    var setupComputeHandlers = function (compute, func, context) {
        var observation = new Observation(func, context, compute);
        compute.observation = observation;
        return {
            _on: function () {
                observation.start();
                compute.value = observation.value;
                compute.hasDependencies = !isEmptyObject(observation.newObserved);
            },
            _off: function () {
                observation.stop();
            },
            getDepth: function () {
                return observation.getDepth();
            }
        };
    };
    assign(Compute.prototype, {
        setPrimaryDepth: function (depth) {
            this._primaryDepth = depth;
        },
        _setupGetterSetterFn: function (getterSetter, context, eventName) {
            this._set = context ? getterSetter.bind(context) : getterSetter;
            this._get = context ? getterSetter.bind(context) : getterSetter;
            this._canObserve = eventName === false ? false : true;
            var handlers = setupComputeHandlers(this, getterSetter, context || this);
            assign(this, handlers);
        },
        _setupProperty: function (target, propertyName, eventName) {
            var self = this, handler;
            handler = function () {
                self.updater(self._get(), self.value);
            };
            this._get = function () {
                return getObject(target, propertyName);
            };
            this._set = function (value) {
                var properties = propertyName.split('.'), leafPropertyName = properties.pop(), targetProperty = getObject(target, properties.join('.'));
                targetProperty[leafPropertyName] = value;
            };
            this._on = function (update) {
                canEvent.on.call(target, eventName || propertyName, handler);
                this.value = this._get();
            };
            this._off = function () {
                return canEvent.off.call(target, eventName || propertyName, handler);
            };
        },
        _setupSetter: function (initialValue, setter, eventName) {
            this.value = initialValue;
            this._set = setter;
            assign(this, eventName);
        },
        _setupSettings: function (initialValue, settings) {
            this.value = initialValue;
            this._set = settings.set || this._set;
            this._get = settings.get || this._get;
            if (!settings.__selfUpdater) {
                var self = this, oldUpdater = this.updater;
                this.updater = function () {
                    oldUpdater.call(self, self._get(), self.value);
                };
            }
            this._on = settings.on ? settings.on : this._on;
            this._off = settings.off ? settings.off : this._off;
        },
        _setupAsyncCompute: function (initialValue, settings) {
            var self = this;
            var getter = settings.fn;
            var bindings;
            this.value = initialValue;
            this._setUpdates = true;
            this.lastSetValue = new Compute(initialValue);
            this._set = function (newVal) {
                if (newVal === self.lastSetValue.get()) {
                    return this.value;
                }
                return self.lastSetValue.set(newVal);
            };
            this._get = function () {
                return getter.call(settings.context, self.lastSetValue.get());
            };
            if (getter.length === 0) {
                bindings = setupComputeHandlers(this, getter, settings.context);
            } else if (getter.length === 1) {
                bindings = setupComputeHandlers(this, function () {
                    return getter.call(settings.context, self.lastSetValue.get());
                }, settings);
            } else {
                var oldUpdater = this.updater, resolve = Observation.ignore(function (newVal) {
                        oldUpdater.call(self, newVal, self.value);
                    });
                this.updater = function (newVal) {
                    oldUpdater.call(self, newVal, self.value);
                };
                bindings = setupComputeHandlers(this, function () {
                    var res = getter.call(settings.context, self.lastSetValue.get(), resolve);
                    return res !== undefined ? res : this.value;
                }, this);
            }
            assign(this, bindings);
        },
        _setupSimpleValue: function (initialValue) {
            this.value = initialValue;
        },
        _eventSetup: Observation.ignore(function () {
            this.bound = true;
            this._on(this.updater);
        }),
        _eventTeardown: function () {
            this._off(this.updater);
            this.bound = false;
        },
        addEventListener: eventLifecycle.addAndSetup,
        removeEventListener: eventLifecycle.removeAndTeardown,
        clone: function (context) {
            if (context && typeof this._args[0] === 'function') {
                this._args[1] = context;
            } else if (context) {
                this._args[2] = context;
            }
            return new Compute(this._args[0], this._args[1], this._args[2], this._args[3]);
        },
        _on: function () {
        },
        _off: function () {
        },
        get: function () {
            var recordingObservation = Observation.isRecording();
            if (recordingObservation && this._canObserve !== false) {
                Observation.add(this, 'change');
                if (!this.bound) {
                    Compute.temporarilyBind(this);
                }
            }
            if (this.bound) {
                if (this.observation) {
                    return this.observation.get();
                } else {
                    return this.value;
                }
            } else {
                return this._get();
            }
        },
        _get: function () {
            return this.value;
        },
        set: function (newVal) {
            var old = this.value;
            var setVal = this._set(newVal, old);
            if (this._setUpdates) {
                return this.value;
            }
            if (this.hasDependencies) {
                return this._get();
            }
            this.updater(setVal === undefined ? this._get() : setVal, old);
            return this.value;
        },
        _set: function (newVal) {
            return this.value = newVal;
        },
        updater: function (newVal, oldVal, batchNum) {
            this.value = newVal;
            if (this.observation) {
                this.observation.value = newVal;
            }
            updateOnChange(this, newVal, oldVal, batchNum);
        },
        toFunction: function () {
            return this._computeFn.bind(this);
        },
        _computeFn: function (newVal) {
            if (arguments.length) {
                return this.set(newVal);
            }
            return this.get();
        },
        trace: function () {
            var me = {
                computeValue: this.get(),
                definition: this.observation && this.observation.func,
                cid: this._cid
            };
            if (this.observation) {
                var deps = [];
                for (var name in this.observation.newObserved) {
                    var obs = assign({}, this.observation.newObserved[name]);
                    if (obs.obj.isComputed) {
                        deps.push(obs.obj.trace());
                    } else {
                        deps.push(obs);
                    }
                }
                me.dependencies = deps;
            }
            return me;
        },
        log: function () {
            var log = function (trace) {
                var currentTrace = '';
                if (trace.dependencies && trace.dependencies.length) {
                    currentTrace = trace.cid + ' = ' + trace.computeValue;
                    if (console.group) {
                        console.group(currentTrace);
                    } else {
                        console.log(currentTrace);
                    }
                    trace.dependencies.forEach(function (dep) {
                        if (dep.hasOwnProperty('computeValue')) {
                            log(dep);
                        } else {
                            console.log(dep.obj, dep.event);
                        }
                    });
                    if (console.groupEnd) {
                        console.groupEnd();
                    }
                } else {
                    console.log(trace.cid + ' - ' + trace.computeValue);
                }
                return trace;
            };
            return log(this.trace());
        }
    });
    Compute.prototype.on = Compute.prototype.bind = Compute.prototype.addEventListener;
    Compute.prototype.off = Compute.prototype.unbind = Compute.prototype.removeEventListener;
    var k = function () {
    };
    var computes;
    var unbindComputes = function () {
        for (var i = 0, len = computes.length; i < len; i++) {
            computes[i].removeEventListener('change', k);
        }
        computes = null;
    };
    Compute.temporarilyBind = function (compute) {
        var computeInstance = compute.computeInstance || compute;
        computeInstance.addEventListener('change', k);
        if (!computes) {
            computes = [];
            setTimeout(unbindComputes, 10);
        }
        computes.push(computeInstance);
    };
    Compute.async = function (initialValue, asyncComputer, context) {
        return new Compute(initialValue, {
            fn: asyncComputer,
            context: context
        });
    };
    Compute.truthy = function (compute) {
        return new Compute(function () {
            var res = compute.get();
            if (typeof res === 'function') {
                res = res.get();
            }
            return !!res;
        });
    };
    module.exports = exports = Compute;
});
/*can-compute@3.0.5#can-compute*/
define('can-compute', function (require, exports, module) {
    require('can-event');
    require('can-event/batch/batch');
    var Compute = require('can-compute/proto-compute');
    var CID = require('can-cid');
    var namespace = require('can-namespace');
    var addEventListener = function (ev, handler) {
        var compute = this;
        var computeHandler = handler && handler[compute.handlerKey];
        if (handler && !computeHandler) {
            computeHandler = handler[compute.handlerKey] = function () {
                handler.apply(compute, arguments);
            };
        }
        return compute.computeInstance.addEventListener(ev, computeHandler);
    };
    var removeEventListener = function (ev, handler) {
        var compute = this;
        var computeHandler = handler && handler[compute.handlerKey];
        if (computeHandler) {
            delete handler[compute.handlerKey];
            return compute.computeInstance.removeEventListener(ev, computeHandler);
        }
        return compute.computeInstance.removeEventListener.apply(compute.computeInstance, arguments);
    };
    var COMPUTE = function (getterSetter, context, eventName, bindOnce) {
        function compute(val) {
            if (arguments.length) {
                return compute.computeInstance.set(val);
            }
            return compute.computeInstance.get();
        }
        var cid = CID(compute, 'compute');
        compute.computeInstance = new Compute(getterSetter, context, eventName, bindOnce);
        compute.handlerKey = '__handler' + cid;
        compute.on = compute.bind = compute.addEventListener = addEventListener;
        compute.off = compute.unbind = compute.removeEventListener = removeEventListener;
        compute.isComputed = compute.computeInstance.isComputed;
        compute.clone = function (ctx) {
            if (typeof getterSetter === 'function') {
                context = ctx;
            }
            return COMPUTE(getterSetter, context, ctx, bindOnce);
        };
        return compute;
    };
    COMPUTE.truthy = function (compute) {
        return COMPUTE(function () {
            var res = compute();
            if (typeof res === 'function') {
                res = res();
            }
            return !!res;
        });
    };
    COMPUTE.async = function (initialValue, asyncComputer, context) {
        return COMPUTE(initialValue, {
            fn: asyncComputer,
            context: context
        });
    };
    COMPUTE.temporarilyBind = Compute.temporarilyBind;
    module.exports = namespace.compute = COMPUTE;
});
/*can-control@3.0.5#can-control*/
define('can-control', function (require, exports, module) {
    var Construct = require('can-construct');
    var namespace = require('can-namespace');
    var string = require('can-util/js/string/string');
    var assign = require('can-util/js/assign/assign');
    var isFunction = require('can-util/js/is-function/is-function');
    var each = require('can-util/js/each/each');
    var dev = require('can-util/js/dev/dev');
    var types = require('can-types');
    var get = require('can-util/js/get/get');
    var domData = require('can-util/dom/data/data');
    var className = require('can-util/dom/class-name/class-name');
    var domEvents = require('can-util/dom/events/events');
    var canEvent = require('can-event');
    var canCompute = require('can-compute');
    var observeReader = require('can-observation/reader/reader');
    var processors;
    require('can-util/dom/dispatch/dispatch');
    require('can-util/dom/events/delegate/delegate');
    var bind = function (el, ev, callback) {
            canEvent.on.call(el, ev, callback);
            return function () {
                canEvent.off.call(el, ev, callback);
            };
        }, slice = [].slice, paramReplacer = /\{([^\}]+)\}/g, delegate = function (el, selector, ev, callback) {
            canEvent.on.call(el, ev, selector, callback);
            return function () {
                canEvent.off.call(el, ev, selector, callback);
            };
        }, binder = function (el, ev, callback, selector) {
            return selector ? delegate(el, selector.trim(), ev, callback) : bind(el, ev, callback);
        }, basicProcessor;
    var Control = Construct.extend({
        setup: function () {
            Construct.setup.apply(this, arguments);
            if (Control) {
                var control = this, funcName;
                control.actions = {};
                for (funcName in control.prototype) {
                    if (control._isAction(funcName)) {
                        control.actions[funcName] = control._action(funcName);
                    }
                }
            }
        },
        _shifter: function (context, name) {
            var method = typeof name === 'string' ? context[name] : name;
            if (!isFunction(method)) {
                method = context[method];
            }
            return function () {
                var wrapped = types.wrapElement(this);
                context.called = name;
                return method.apply(context, [wrapped].concat(slice.call(arguments, 0)));
            };
        },
        _isAction: function (methodName) {
            var val = this.prototype[methodName], type = typeof val;
            return methodName !== 'constructor' && (type === 'function' || type === 'string' && isFunction(this.prototype[val])) && !!(Control.isSpecial(methodName) || processors[methodName] || /[^\w]/.test(methodName));
        },
        _action: function (methodName, options, controlInstance) {
            var readyCompute;
            paramReplacer.lastIndex = 0;
            if (options || !paramReplacer.test(methodName)) {
                readyCompute = canCompute(function () {
                    var delegate;
                    var name = methodName.replace(paramReplacer, function (matched, key) {
                        var value, parent;
                        if (this._isDelegate(options, key)) {
                            delegate = this._getDelegate(options, key);
                            return '';
                        }
                        key = this._removeDelegateFromKey(key);
                        parent = this._lookup(options)[0];
                        value = observeReader.read(parent, observeReader.reads(key), { readCompute: false }).value;
                        if (value === undefined && typeof window !== 'undefined') {
                            value = get(window, key);
                        }
                        if (!parent || !types.isMapLike(parent) && !value) {
                            dev.log('can/control/control.js: No property found for handling ' + methodName);
                            return null;
                        }
                        if (typeof value === 'string') {
                            return value;
                        } else {
                            delegate = value;
                            return '';
                        }
                    }.bind(this));
                    name = name.trim();
                    var parts = name.split(/\s+/g), event = parts.pop();
                    return {
                        processor: this.processors[event] || basicProcessor,
                        parts: [
                            name,
                            parts.join(' '),
                            event
                        ],
                        delegate: delegate || undefined
                    };
                }, this);
                if (controlInstance) {
                    var handler = function (ev, ready) {
                        controlInstance._bindings.control[methodName](controlInstance.element);
                        controlInstance._bindings.control[methodName] = ready.processor(ready.delegate || controlInstance.element, ready.parts[2], ready.parts[1], methodName, controlInstance);
                    };
                    readyCompute.bind('change', handler);
                    controlInstance._bindings.readyComputes[methodName] = {
                        compute: readyCompute,
                        handler: handler
                    };
                }
                return readyCompute();
            }
        },
        _lookup: function (options) {
            return [
                options,
                window
            ];
        },
        _removeDelegateFromKey: function (key) {
            return key;
        },
        _isDelegate: function (options, key) {
            return key === 'element';
        },
        _getDelegate: function (options, key) {
            return undefined;
        },
        processors: {},
        defaults: {},
        convertElement: function (element) {
            element = typeof element === 'string' ? document.querySelector(element) : element;
            return types.wrapElement(element);
        },
        isSpecial: function (eventName) {
            return eventName === 'inserted' || eventName === 'removed';
        }
    }, {
        setup: function (element, options) {
            var cls = this.constructor, pluginname = cls.pluginName || cls.shortName, arr;
            this.element = cls.convertElement(element);
            if (pluginname && pluginname !== 'can_control') {
                className.add.call(element, pluginname);
            }
            arr = domData.get.call(this.element, 'controls');
            if (!arr) {
                arr = [];
                domData.set.call(this.element, 'controls', arr);
            }
            arr.push(this);
            if (types.isMapLike(options)) {
                for (var prop in cls.defaults) {
                    if (!options.hasOwnProperty(prop)) {
                        observeReader.set(options, prop, cls.defaults[prop]);
                    }
                }
                this.options = options;
            } else {
                this.options = assign(assign({}, cls.defaults), options);
            }
            this.on();
            return [
                this.element,
                this.options
            ];
        },
        on: function (el, selector, eventName, func) {
            if (!el) {
                this.off();
                var cls = this.constructor, bindings = this._bindings, actions = cls.actions, element = types.unwrapElement(this.element), destroyCB = Control._shifter(this, 'destroy'), funcName, ready;
                for (funcName in actions) {
                    if (actions.hasOwnProperty(funcName)) {
                        ready = actions[funcName] || cls._action(funcName, this.options, this);
                        if (ready) {
                            bindings.control[funcName] = ready.processor(ready.delegate || element, ready.parts[2], ready.parts[1], funcName, this);
                        }
                    }
                }
                domEvents.addEventListener.call(element, 'removed', destroyCB);
                bindings.user.push(function (el) {
                    domEvents.removeEventListener.call(el, 'removed', destroyCB);
                });
                return bindings.user.length;
            }
            if (typeof el === 'string') {
                func = eventName;
                eventName = selector;
                selector = el;
                el = this.element;
            }
            if (func === undefined) {
                func = eventName;
                eventName = selector;
                selector = null;
            }
            if (typeof func === 'string') {
                func = Control._shifter(this, func);
            }
            this._bindings.user.push(binder(el, eventName, func, selector));
            return this._bindings.user.length;
        },
        off: function () {
            var el = types.unwrapElement(this.element), bindings = this._bindings;
            if (bindings) {
                each(bindings.user || [], function (value) {
                    value(el);
                });
                each(bindings.control || {}, function (value) {
                    value(el);
                });
                each(bindings.readyComputes || {}, function (value) {
                    value.compute.unbind('change', value.handler);
                });
            }
            this._bindings = {
                user: [],
                control: {},
                readyComputes: {}
            };
        },
        destroy: function () {
            if (this.element === null) {
                dev.warn('can/control/control.js: Control already destroyed');
                return;
            }
            var Class = this.constructor, pluginName = Class.pluginName || Class.shortName && string.underscore(Class.shortName), controls;
            this.off();
            if (pluginName && pluginName !== 'can_control') {
                className.remove.call(this.element, pluginName);
            }
            controls = domData.get.call(this.element, 'controls');
            controls.splice(controls.indexOf(this), 1);
            canEvent.dispatch.call(this, 'destroyed');
            this.element = null;
        }
    });
    processors = Control.processors;
    basicProcessor = function (el, event, selector, methodName, control) {
        return binder(el, event, Control._shifter(control, methodName), selector);
    };
    each([
        'change',
        'click',
        'contextmenu',
        'dblclick',
        'keydown',
        'keyup',
        'keypress',
        'mousedown',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'reset',
        'resize',
        'scroll',
        'select',
        'submit',
        'focusin',
        'focusout',
        'mouseenter',
        'mouseleave',
        'touchstart',
        'touchmove',
        'touchcancel',
        'touchend',
        'touchleave',
        'inserted',
        'removed',
        'dragstart',
        'dragenter',
        'dragover',
        'dragleave',
        'drag',
        'drop',
        'dragend'
    ], function (v) {
        processors[v] = basicProcessor;
    });
    module.exports = namespace.Control = Control;
});
/*can-component@3.0.5#control/control*/
define('can-component/control/control', function (require, exports, module) {
    var Control = require('can-control');
    var canEach = require('can-util/js/each/each');
    var string = require('can-util/js/string/string');
    var canCompute = require('can-compute');
    var observeReader = require('can-observation/reader/reader');
    var paramReplacer = /\{([^\}]+)\}/g;
    var ComponentControl = Control.extend({
        _lookup: function (options) {
            return [
                options.scope,
                options,
                window
            ];
        },
        _removeDelegateFromKey: function (key) {
            return key.replace(/^(scope|^viewModel)\./, '');
        },
        _isDelegate: function (options, key) {
            return key === 'scope' || key === 'viewModel';
        },
        _getDelegate: function (options, key) {
            return options[key];
        },
        _action: function (methodName, options, controlInstance) {
            var hasObjectLookup;
            paramReplacer.lastIndex = 0;
            hasObjectLookup = paramReplacer.test(methodName);
            if (!controlInstance && hasObjectLookup) {
                return;
            } else {
                return Control._action.apply(this, arguments);
            }
        }
    }, {
        setup: function (el, options) {
            this.scope = options.scope;
            this.viewModel = options.viewModel;
            return Control.prototype.setup.call(this, el, options);
        },
        off: function () {
            if (this._bindings) {
                canEach(this._bindings.readyComputes || {}, function (value) {
                    value.compute.unbind('change', value.handler);
                });
            }
            Control.prototype.off.apply(this, arguments);
            this._bindings.readyComputes = {};
        },
        destroy: function () {
            Control.prototype.destroy.apply(this, arguments);
            if (typeof this.options.destroy === 'function') {
                this.options.destroy.apply(this, arguments);
            }
        }
    });
    module.exports = ComponentControl;
});
/*can-simple-map@3.1.2#can-simple-map*/
define('can-simple-map', function (require, exports, module) {
    var Construct = require('can-construct');
    var canEvent = require('can-event');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var types = require('can-types');
    var Observation = require('can-observation');
    var SimpleMap = Construct.extend({
        setup: function (initialData) {
            this._data = {};
            this.attr(initialData);
        },
        attr: function (prop, value) {
            var self = this;
            if (arguments.length === 0) {
                return assign({}, this._data);
            } else if (arguments.length > 1) {
                var old = this._data[prop];
                this._data[prop] = value;
                canEvent.dispatch.call(this, prop, [
                    value,
                    old
                ]);
            } else if (typeof prop === 'object') {
                Object.keys(prop).forEach(function (key) {
                    self.attr(key, prop[key]);
                });
            } else {
                if (prop !== 'constructor') {
                    Observation.add(this, prop);
                    return this._data[prop];
                }
                return this.constructor;
            }
        },
        serialize: function () {
            var serialized = {};
            each(this._data, function (data, prop) {
                serialized[prop] = data && typeof data.serialize === 'function' ? data.serialize() : data;
            });
            return serialized;
        },
        get: function () {
            return this.attr.apply(this, arguments);
        },
        set: function () {
            return this.attr.apply(this, arguments);
        }
    });
    assign(SimpleMap.prototype, canEvent);
    var oldIsMapLike = types.isMapLike;
    types.isMapLike = function (obj) {
        if (obj instanceof SimpleMap) {
            return true;
        }
        return oldIsMapLike.call(this, obj);
    };
    if (!types.DefaultMap) {
        types.DefaultMap = SimpleMap;
    }
    module.exports = SimpleMap;
});
/*can-view-scope@3.1.2#reference-map*/
define('can-view-scope/reference-map', function (require, exports, module) {
    var types = require('can-types');
    var SimpleMap = require('can-simple-map');
    var ReferenceMap = SimpleMap.extend({});
    var oldIsMapLike = types.isMapLike;
    types.isMapLike = function (obj) {
        if (obj instanceof ReferenceMap) {
            return true;
        }
        return oldIsMapLike.call(this, obj);
    };
    module.exports = ReferenceMap;
});
/*can-view-scope@3.1.2#compute_data*/
define('can-view-scope/compute_data', function (require, exports, module) {
    var Observation = require('can-observation');
    var observeReader = require('can-observation/reader/reader');
    var makeCompute = require('can-compute');
    var types = require('can-types');
    var isFunction = require('can-util/js/is-function/is-function');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var isFastPath = function (computeData) {
        if (computeData.reads && computeData.reads.length === 1) {
            var root = computeData.root;
            if (types.isCompute(root)) {
                root = root();
            }
            return types.isMapLike(root) && !isFunction(root[computeData.reads[0].key]);
        }
        return;
    };
    var scopeReader = function (scope, key, options, computeData, newVal) {
        if (arguments.length > 4) {
            var root = computeData.root || computeData.setRoot;
            if (root) {
                observeReader.write(root, computeData.reads, newVal, options);
            } else {
                scope.set(key, newVal, options);
            }
        } else {
            if (computeData.root) {
                return observeReader.read(computeData.root, computeData.reads, options).value;
            }
            var data = scope.read(key, options);
            computeData.scope = data.scope;
            computeData.initialValue = data.value;
            computeData.reads = data.reads;
            computeData.root = data.rootObserve;
            computeData.setRoot = data.setRoot;
            return data.value;
        }
    };
    module.exports = function (scope, key, options) {
        options = options || { args: [] };
        var computeData = {}, scopeRead = function (newVal) {
                if (arguments.length) {
                    return scopeReader(scope, key, options, computeData, newVal);
                } else {
                    return scopeReader(scope, key, options, computeData);
                }
            }, compute = makeCompute(undefined, {
                on: function () {
                    observation.start();
                    if (isFastPath(computeData)) {
                        observation.dependencyChange = function (ev, newVal) {
                            if (types.isMapLike(ev.target) && typeof newVal !== 'function') {
                                this.newVal = newVal;
                            } else {
                                observation.dependencyChange = Observation.prototype.dependencyChange;
                                observation.start = Observation.prototype.start;
                                compute.fastPath = false;
                            }
                            return Observation.prototype.dependencyChange.call(this, ev);
                        };
                        observation.start = function () {
                            this.value = this.newVal;
                        };
                        compute.fastPath = true;
                    }
                    compute.computeInstance.value = observation.value;
                    compute.computeInstance.hasDependencies = !isEmptyObject(observation.newObserved);
                },
                off: function () {
                    observation.stop();
                },
                set: scopeRead,
                get: scopeRead,
                __selfUpdater: true
            }), observation = new Observation(scopeRead, null, compute.computeInstance);
        compute.computeInstance.observation = observation;
        computeData.compute = compute;
        return computeData;
    };
});
/*can-view-scope@3.1.2#can-view-scope*/
define('can-view-scope', function (require, exports, module) {
    var observeReader = require('can-observation/reader/reader');
    var Observation = require('can-observation');
    var ReferenceMap = require('can-view-scope/reference-map');
    var makeComputeData = require('can-view-scope/compute_data');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var namespace = require('can-namespace');
    var dev = require('can-util/js/dev/dev');
    function Scope(context, parent, meta) {
        this._context = context;
        this._parent = parent;
        this._meta = meta || {};
        this.__cache = {};
    }
    assign(Scope, {
        read: observeReader.read,
        Refs: ReferenceMap,
        refsScope: function () {
            return new Scope(new this.Refs());
        }
    });
    assign(Scope.prototype, {
        add: function (context, meta) {
            if (context !== this._context) {
                return new this.constructor(context, this, meta);
            } else {
                return this;
            }
        },
        read: function (attr, options) {
            if (attr === '%root') {
                return { value: this.getRoot() };
            }
            var isInCurrentContext = attr.substr(0, 2) === './', isInParentContext = attr.substr(0, 3) === '../', isCurrentContext = attr === '.' || attr === 'this', isParentContext = attr === '..', isContextBased = isInCurrentContext || isInParentContext || isCurrentContext || isParentContext;
            if (isContextBased && this._meta.notContext) {
                return this._parent.read(attr, options);
            }
            var currentScopeOnly;
            if (isInCurrentContext) {
                currentScopeOnly = true;
                attr = attr.substr(2);
            } else if (isInParentContext) {
                var parent = this._parent;
                while (parent._meta.notContext) {
                    parent = parent._parent;
                }
                return parent.read(attr.substr(3) || '.', options);
            } else if (isCurrentContext) {
                return { value: this._context };
            } else if (isParentContext) {
                return { value: this._parent._context };
            }
            var keyReads = observeReader.reads(attr);
            if (keyReads[0].key.charAt(0) === '*') {
                return this.getRefs()._read(keyReads, options, true);
            } else {
                return this._read(keyReads, options, currentScopeOnly);
            }
        },
        _read: function (keyReads, options, currentScopeOnly) {
            var currentScope = this, currentContext, undefinedObserves = [], currentObserve, currentReads, setObserveDepth = -1, currentSetReads, currentSetObserve, readOptions = assign({
                    foundObservable: function (observe, nameIndex) {
                        currentObserve = observe;
                        currentReads = keyReads.slice(nameIndex);
                    },
                    earlyExit: function (parentValue, nameIndex) {
                        if (nameIndex > setObserveDepth || nameIndex === setObserveDepth && (typeof parentValue === 'object' && keyReads[nameIndex].key in parentValue)) {
                            currentSetObserve = currentObserve;
                            currentSetReads = currentReads;
                            setObserveDepth = nameIndex;
                        }
                    }
                }, options);
            while (currentScope) {
                currentContext = currentScope._context;
                if (currentContext !== null && (typeof currentContext === 'object' || typeof currentContext === 'function')) {
                    var getObserves = Observation.trap();
                    var data = observeReader.read(currentContext, keyReads, readOptions);
                    var observes = getObserves();
                    if (data.value !== undefined) {
                        Observation.addAll(observes);
                        return {
                            scope: currentScope,
                            rootObserve: currentObserve,
                            value: data.value,
                            reads: currentReads
                        };
                    } else {
                        undefinedObserves.push.apply(undefinedObserves, observes);
                    }
                }
                if (currentScopeOnly) {
                    currentScope = null;
                } else {
                    currentScope = currentScope._parent;
                }
            }
            Observation.addAll(undefinedObserves);
            return {
                setRoot: currentSetObserve,
                reads: currentSetReads,
                value: undefined
            };
        },
        get: function (key, options) {
            options = assign({ isArgument: true }, options);
            var res = this.read(key, options);
            return res.value;
        },
        peek: Observation.ignore(function (key, options) {
            return this.get(key, options);
        }),
        peak: Observation.ignore(function (key, options) {
            dev.warn('peak is deprecated, please use peek instead');
            return this.peek(key, options);
        }),
        getScope: function (tester) {
            var scope = this;
            while (scope) {
                if (tester(scope)) {
                    return scope;
                }
                scope = scope._parent;
            }
        },
        getContext: function (tester) {
            var res = this.getScope(tester);
            return res && res._context;
        },
        getRefs: function () {
            return this.getScope(function (scope) {
                return scope._context instanceof Scope.Refs;
            });
        },
        getRoot: function () {
            var cur = this, child = this;
            while (cur._parent) {
                child = cur;
                cur = cur._parent;
            }
            if (cur._context instanceof Scope.Refs) {
                cur = child;
            }
            return cur._context;
        },
        set: function (key, value, options) {
            var dotIndex = key.lastIndexOf('.'), slashIndex = key.lastIndexOf('/'), contextPath, propName;
            if (slashIndex > dotIndex) {
                contextPath = key.substring(0, slashIndex);
                propName = key.substring(slashIndex + 1, key.length);
            } else {
                if (dotIndex !== -1) {
                    contextPath = key.substring(0, dotIndex);
                    propName = key.substring(dotIndex + 1, key.length);
                } else {
                    contextPath = '.';
                    propName = key;
                }
            }
            if (key.charAt(0) === '*') {
                observeReader.write(this.getRefs()._context, key, value, options);
            } else {
                var context = this.read(contextPath, options).value;
                observeReader.write(context, propName, value, options);
            }
        },
        attr: Observation.ignore(function (key, value, options) {
            console.warn('can-view-scope::attr is deprecated, please use peek, get or set');
            options = assign({ isArgument: true }, options);
            if (arguments.length === 2) {
                return this.set(key, value, options);
            } else {
                return this.get(key, options);
            }
        }),
        computeData: function (key, options) {
            return makeComputeData(this, key, options);
        },
        compute: function (key, options) {
            return this.computeData(key, options).compute;
        },
        cloneFromRef: function () {
            var contexts = [];
            var scope = this, context, parent;
            while (scope) {
                context = scope._context;
                if (context instanceof Scope.Refs) {
                    parent = scope._parent;
                    break;
                }
                contexts.unshift(context);
                scope = scope._parent;
            }
            if (parent) {
                each(contexts, function (context) {
                    parent = parent.add(context);
                });
                return parent;
            } else {
                return this;
            }
        }
    });
    function Options(data, parent, meta) {
        if (!data.helpers && !data.partials && !data.tags) {
            data = { helpers: data };
        }
        Scope.call(this, data, parent, meta);
    }
    Options.prototype = new Scope();
    Options.prototype.constructor = Options;
    Scope.Options = Options;
    namespace.view = namespace.view || {};
    module.exports = namespace.view.Scope = Scope;
});
/*can-stache@3.0.19#src/utils*/
define('can-stache/src/utils', function (require, exports, module) {
    var Scope = require('can-view-scope');
    var Observation = require('can-observation');
    var observationReader = require('can-observation/reader/reader');
    var compute = require('can-compute');
    var types = require('can-types');
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    var Options = Scope.Options;
    module.exports = {
        isArrayLike: isArrayLike,
        emptyHandler: function () {
        },
        jsonParse: function (str) {
            if (str[0] === '\'') {
                return str.substr(1, str.length - 2);
            } else if (str === 'undefined') {
                return undefined;
            } else {
                return JSON.parse(str);
            }
        },
        mixins: {
            last: function () {
                return this.stack[this.stack.length - 1];
            },
            add: function (chars) {
                this.last().add(chars);
            },
            subSectionDepth: function () {
                return this.stack.length - 1;
            }
        },
        convertToScopes: function (helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer, isStringOnly) {
            if (truthyRenderer) {
                helperOptions.fn = this.makeRendererConvertScopes(truthyRenderer, scope, options, nodeList, isStringOnly);
            }
            if (falseyRenderer) {
                helperOptions.inverse = this.makeRendererConvertScopes(falseyRenderer, scope, options, nodeList, isStringOnly);
            }
        },
        makeRendererConvertScopes: function (renderer, parentScope, parentOptions, nodeList, observeObservables) {
            var rendererWithScope = function (ctx, opts, parentNodeList) {
                return renderer(ctx || parentScope, opts, parentNodeList);
            };
            var convertedRenderer = function (newScope, newOptions, parentNodeList) {
                if (newScope !== undefined && !(newScope instanceof Scope)) {
                    newScope = parentScope.add(newScope);
                }
                if (newOptions !== undefined && !(newOptions instanceof Options)) {
                    newOptions = parentOptions.add(newOptions);
                }
                var result = rendererWithScope(newScope, newOptions || parentOptions, parentNodeList || nodeList);
                return result;
            };
            return observeObservables ? convertedRenderer : Observation.ignore(convertedRenderer);
        },
        getItemsStringContent: function (items, isObserveList, helperOptions, options) {
            var txt = '', len = observationReader.get(items, 'length'), isObservable = types.isMapLike(items) || types.isListLike(items);
            for (var i = 0; i < len; i++) {
                var item = isObservable ? compute(items, '' + i) : items[i];
                txt += helperOptions.fn(item, options);
            }
            return txt;
        },
        getItemsFragContent: function (items, helperOptions, scope, asVariable) {
            var result = [], len = observationReader.get(items, 'length'), isObservable = types.isMapLike(items) || types.isListLike(items);
            for (var i = 0; i < len; i++) {
                var aliases = {
                    '%index': i,
                    '@index': i
                };
                var item = isObservable ? compute(items, '' + i) : items[i];
                if (asVariable) {
                    aliases[asVariable] = item;
                }
                result.push(helperOptions.fn(scope.add(aliases, { notContext: true }).add(item)));
            }
            return result;
        },
        Options: Options
    };
});
/*can-view-parser@3.0.6#can-view-parser*/
define('can-view-parser', function (require, exports, module) {
    var namespace = require('can-namespace'), dev = require('can-util/js/dev/dev');
    function each(items, callback) {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], i);
        }
    }
    function makeMap(str) {
        var obj = {}, items = str.split(',');
        each(items, function (name) {
            obj[name] = true;
        });
        return obj;
    }
    function handleIntermediate(intermediate, handler) {
        for (var i = 0, len = intermediate.length; i < len; i++) {
            var item = intermediate[i];
            handler[item.tokenType].apply(handler, item.args);
        }
        return intermediate;
    }
    var alphaNumeric = 'A-Za-z0-9', alphaNumericHU = '-:_' + alphaNumeric, camelCase = /([a-z])([A-Z])/g, defaultMagicStart = '{{', endTag = new RegExp('^<\\/([' + alphaNumericHU + ']+)[^>]*>'), defaultMagicMatch = new RegExp('\\{\\{([^\\}]*)\\}\\}\\}?', 'g'), space = /\s/, alphaRegex = new RegExp('[' + alphaNumeric + ']');
    var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed');
    var caseMattersAttributes = makeMap('allowReorder,attributeName,attributeType,autoReverse,baseFrequency,baseProfile,calcMode,clipPathUnits,contentScriptType,contentStyleType,diffuseConstant,edgeMode,externalResourcesRequired,filterRes,filterUnits,glyphRef,gradientTransform,gradientUnits,kernelMatrix,kernelUnitLength,keyPoints,keySplines,keyTimes,lengthAdjust,limitingConeAngle,markerHeight,markerUnits,markerWidth,maskContentUnits,maskUnits,patternContentUnits,patternTransform,patternUnits,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,repeatCount,repeatDur,requiredExtensions,requiredFeatures,specularConstant,specularExponent,spreadMethod,startOffset,stdDeviation,stitchTiles,surfaceScale,systemLanguage,tableValues,textLength,viewBox,viewTarget,xChannelSelector,yChannelSelector');
    var caseMattersElements = makeMap('altGlyph,altGlyphDef,altGlyphItem,animateColor,animateMotion,animateTransform,clipPath,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,foreignObject,glyphRef,linearGradient,radialGradient,textPath');
    var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');
    var special = makeMap('script');
    var tokenTypes = 'start,end,close,attrStart,attrEnd,attrValue,chars,comment,special,done'.split(',');
    var fn = function () {
    };
    var HTMLParser = function (html, handler, returnIntermediate) {
        if (typeof html === 'object') {
            return handleIntermediate(html, handler);
        }
        var intermediate = [];
        handler = handler || {};
        if (returnIntermediate) {
            each(tokenTypes, function (name) {
                var callback = handler[name] || fn;
                handler[name] = function () {
                    if (callback.apply(this, arguments) !== false) {
                        intermediate.push({
                            tokenType: name,
                            args: [].slice.call(arguments, 0)
                        });
                    }
                };
            });
        }
        var magicMatch = handler.magicMatch || defaultMagicMatch, magicStart = handler.magicStart || defaultMagicStart;
        function parseStartTag(tag, tagName, rest, unary) {
            tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();
            if (closeSelf[tagName] && stack.last() === tagName) {
                parseEndTag('', tagName);
            }
            unary = empty[tagName] || !!unary;
            handler.start(tagName, unary);
            if (!unary) {
                stack.push(tagName);
            }
            HTMLParser.parseAttrs(rest, handler);
            handler.end(tagName, unary);
        }
        function parseEndTag(tag, tagName) {
            var pos;
            if (!tagName) {
                pos = 0;
            } else {
                tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();
                for (pos = stack.length - 1; pos >= 0; pos--) {
                    if (stack[pos] === tagName) {
                        break;
                    }
                }
            }
            if (pos >= 0) {
                for (var i = stack.length - 1; i >= pos; i--) {
                    if (handler.close) {
                        handler.close(stack[i]);
                    }
                }
                stack.length = pos;
            }
        }
        function parseMustache(mustache, inside) {
            if (handler.special) {
                handler.special(inside);
            }
        }
        var callChars = function () {
            if (charsText) {
                if (handler.chars) {
                    handler.chars(charsText);
                }
            }
            charsText = '';
        };
        var index, chars, match, stack = [], last = html, charsText = '';
        stack.last = function () {
            return this[this.length - 1];
        };
        while (html) {
            chars = true;
            if (!stack.last() || !special[stack.last()]) {
                if (html.indexOf('<!--') === 0) {
                    index = html.indexOf('-->');
                    if (index >= 0) {
                        callChars();
                        if (handler.comment) {
                            handler.comment(html.substring(4, index));
                        }
                        html = html.substring(index + 3);
                        chars = false;
                    }
                } else if (html.indexOf('</') === 0) {
                    match = html.match(endTag);
                    if (match) {
                        callChars();
                        html = html.substring(match[0].length);
                        match[0].replace(endTag, parseEndTag);
                        chars = false;
                    }
                } else if (html.indexOf('<') === 0) {
                    var res = HTMLParser.searchStartTag(html);
                    if (res) {
                        callChars();
                        html = res.html;
                        parseStartTag.apply(null, res.match);
                        chars = false;
                    }
                } else if (html.indexOf(magicStart) === 0) {
                    match = html.match(magicMatch);
                    if (match) {
                        callChars();
                        html = html.substring(match[0].length);
                        match[0].replace(magicMatch, parseMustache);
                    }
                }
                if (chars) {
                    index = findBreak(html, magicStart);
                    if (index === 0 && html === last) {
                        charsText += html.charAt(0);
                        html = html.substr(1);
                        index = findBreak(html, magicStart);
                    }
                    var text = index < 0 ? html : html.substring(0, index);
                    html = index < 0 ? '' : html.substring(index);
                    if (text) {
                        charsText += text;
                    }
                }
            } else {
                html = html.replace(new RegExp('([\\s\\S]*?)</' + stack.last() + '[^>]*>'), function (all, text) {
                    text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2');
                    if (handler.chars) {
                        handler.chars(text);
                    }
                    return '';
                });
                parseEndTag('', stack.last());
            }
            if (html === last) {
                throw new Error('Parse Error: ' + html);
            }
            last = html;
        }
        callChars();
        parseEndTag();
        handler.done();
        return intermediate;
    };
    var callAttrStart = function (state, curIndex, handler, rest) {
        var attrName = rest.substring(typeof state.nameStart === 'number' ? state.nameStart : curIndex, curIndex), newAttrName = attrName, oldAttrName = attrName;
        if (!caseMattersAttributes[attrName] && camelCase.test(attrName)) {
            newAttrName = attrName.replace(camelCase, camelCaseToSpinalCase);
            dev.warn('can-view-parser: Found attribute with name: ', oldAttrName, '. Converting to: ', newAttrName);
        }
        state.attrStart = newAttrName;
        handler.attrStart(state.attrStart);
        state.inName = false;
    };
    var callAttrEnd = function (state, curIndex, handler, rest) {
        if (state.valueStart !== undefined && state.valueStart < curIndex) {
            handler.attrValue(rest.substring(state.valueStart, curIndex));
        } else if (!state.inValue) {
        }
        handler.attrEnd(state.attrStart);
        state.attrStart = undefined;
        state.valueStart = undefined;
        state.inValue = false;
        state.inName = false;
        state.lookingForEq = false;
        state.inQuote = false;
        state.lookingForName = true;
    };
    var findBreak = function (str, magicStart) {
        var magicLength = magicStart.length;
        for (var i = 0, len = str.length; i < len; i++) {
            if (str[i] === '<' || str.substr(i, magicLength) === magicStart) {
                return i;
            }
        }
        return -1;
    };
    var camelCaseToSpinalCase = function (match, lowerCaseChar, upperCaseChar) {
        return lowerCaseChar + '-' + upperCaseChar.toLowerCase();
    };
    HTMLParser.parseAttrs = function (rest, handler) {
        if (!rest) {
            return;
        }
        var magicMatch = handler.magicMatch || defaultMagicMatch, magicStart = handler.magicStart || defaultMagicStart;
        var i = 0;
        var curIndex;
        var state = {
            inName: false,
            nameStart: undefined,
            inValue: false,
            valueStart: undefined,
            inQuote: false,
            attrStart: undefined,
            lookingForName: true,
            lookingForValue: false,
            lookingForEq: false
        };
        while (i < rest.length) {
            curIndex = i;
            var cur = rest.charAt(i);
            i++;
            if (magicStart === rest.substr(curIndex, magicStart.length)) {
                if (state.inValue && curIndex > state.valueStart) {
                    handler.attrValue(rest.substring(state.valueStart, curIndex));
                } else if (state.inName && state.nameStart < curIndex) {
                    callAttrStart(state, curIndex, handler, rest);
                    callAttrEnd(state, curIndex, handler, rest);
                } else if (state.lookingForValue) {
                    state.inValue = true;
                } else if (state.lookingForEq && state.attrStart) {
                    callAttrEnd(state, curIndex, handler, rest);
                }
                magicMatch.lastIndex = curIndex;
                var match = magicMatch.exec(rest);
                if (match) {
                    handler.special(match[1]);
                    i = curIndex + match[0].length;
                    if (state.inValue) {
                        state.valueStart = curIndex + match[0].length;
                    }
                }
            } else if (state.inValue) {
                if (state.inQuote) {
                    if (cur === state.inQuote) {
                        callAttrEnd(state, curIndex, handler, rest);
                    }
                } else if (space.test(cur)) {
                    callAttrEnd(state, curIndex, handler, rest);
                }
            } else if (cur === '=' && (state.lookingForEq || state.lookingForName || state.inName)) {
                if (!state.attrStart) {
                    callAttrStart(state, curIndex, handler, rest);
                    if (i === rest.length) {
                        callAttrEnd(state, curIndex, handler, rest);
                    }
                }
                state.lookingForValue = true;
                state.lookingForEq = false;
                state.lookingForName = false;
            } else if (state.inName) {
                if (space.test(cur)) {
                    callAttrStart(state, curIndex, handler, rest);
                    state.lookingForEq = true;
                }
            } else if (state.lookingForName) {
                if (!space.test(cur)) {
                    if (state.attrStart) {
                        callAttrEnd(state, curIndex, handler, rest);
                    }
                    state.nameStart = curIndex;
                    state.inName = true;
                }
            } else if (state.lookingForValue) {
                if (!space.test(cur)) {
                    state.lookingForValue = false;
                    state.inValue = true;
                    if (cur === '\'' || cur === '"') {
                        state.inQuote = cur;
                        state.valueStart = curIndex + 1;
                    } else {
                        state.valueStart = curIndex;
                    }
                } else if (i === rest.length) {
                    callAttrEnd(state, curIndex, handler, rest);
                }
            }
        }
        if (state.inName) {
            callAttrStart(state, curIndex + 1, handler, rest);
            callAttrEnd(state, curIndex + 1, handler, rest);
        } else if (state.lookingForEq) {
            callAttrEnd(state, curIndex + 1, handler, rest);
        } else if (state.inValue) {
            callAttrEnd(state, curIndex + 1, handler, rest);
        }
        magicMatch.lastIndex = 0;
    };
    HTMLParser.searchStartTag = function (html) {
        var closingIndex = html.indexOf('>');
        if (closingIndex === -1 || !alphaRegex.test(html[1])) {
            return null;
        }
        var tagName, tagContent, match, rest = '', unary = '';
        var startTag = html.substring(0, closingIndex + 1);
        var isUnary = startTag[startTag.length - 2] === '/';
        var spaceIndex = startTag.search(space);
        if (isUnary) {
            unary = '/';
            tagContent = startTag.substring(1, startTag.length - 2).trim();
        } else {
            tagContent = startTag.substring(1, startTag.length - 1).trim();
        }
        if (spaceIndex === -1) {
            tagName = tagContent;
        } else {
            spaceIndex--;
            tagName = tagContent.substring(0, spaceIndex);
            rest = tagContent.substring(spaceIndex);
        }
        match = [
            startTag,
            tagName,
            rest,
            unary
        ];
        return {
            match: match,
            html: html.substring(startTag.length)
        };
    };
    module.exports = namespace.HTMLParser = HTMLParser;
});
/*can-util@3.2.2#js/set-immediate/set-immediate*/
define('can-util/js/set-immediate/set-immediate', function (require, exports, module) {
    (function (global) {
        var global = require('can-util/js/global/global')();
        module.exports = global.setImmediate || function (cb) {
            return setTimeout(cb, 0);
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#dom/mutation-observer/mutation-observer*/
define('can-util/dom/mutation-observer/mutation-observer', function (require, exports, module) {
    (function (global) {
        var global = require('can-util/js/global/global')();
        var setMutationObserver;
        module.exports = function (setMO) {
            if (setMO !== undefined) {
                setMutationObserver = setMO;
            }
            return setMutationObserver !== undefined ? setMutationObserver : global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#dom/child-nodes/child-nodes*/
define('can-util/dom/child-nodes/child-nodes', function (require, exports, module) {
    function childNodes(node) {
        var childNodes = node.childNodes;
        if ('length' in childNodes) {
            return childNodes;
        } else {
            var cur = node.firstChild;
            var nodes = [];
            while (cur) {
                nodes.push(cur);
                cur = cur.nextSibling;
            }
            return nodes;
        }
    }
    module.exports = childNodes;
});
/*can-util@3.2.2#dom/contains/contains*/
define('can-util/dom/contains/contains', function (require, exports, module) {
    module.exports = function (child) {
        return this.contains(child);
    };
});
/*can-util@3.2.2#dom/mutate/mutate*/
define('can-util/dom/mutate/mutate', function (require, exports, module) {
    var makeArray = require('can-util/js/make-array/make-array');
    var setImmediate = require('can-util/js/set-immediate/set-immediate');
    var CID = require('can-cid');
    var getMutationObserver = require('can-util/dom/mutation-observer/mutation-observer');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var domContains = require('can-util/dom/contains/contains');
    var domDispatch = require('can-util/dom/dispatch/dispatch');
    var DOCUMENT = require('can-util/dom/document/document');
    var mutatedElements;
    var checks = {
        inserted: function (root, elem) {
            return domContains.call(root, elem);
        },
        removed: function (root, elem) {
            return !domContains.call(root, elem);
        }
    };
    var fireOn = function (elems, root, check, event, dispatched) {
        if (!elems.length) {
            return;
        }
        var children, cid;
        for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
            cid = CID(elem);
            if (elem.getElementsByTagName && check(root, elem) && !dispatched[cid]) {
                dispatched[cid] = true;
                children = makeArray(elem.getElementsByTagName('*'));
                domDispatch.call(elem, event, [], false);
                for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                    cid = CID(child);
                    if (!dispatched[cid]) {
                        domDispatch.call(child, event, [], false);
                        dispatched[cid] = true;
                    }
                }
            }
        }
    };
    var fireMutations = function () {
        var mutations = mutatedElements;
        mutatedElements = null;
        var firstElement = mutations[0][1][0];
        var doc = DOCUMENT() || firstElement.ownerDocument || firstElement;
        var root = doc.contains ? doc : doc.body;
        var dispatched = {
            inserted: {},
            removed: {}
        };
        mutations.forEach(function (mutation) {
            fireOn(mutation[1], root, checks[mutation[0]], mutation[0], dispatched[mutation[0]]);
        });
    };
    var mutated = function (elements, type) {
        if (!getMutationObserver() && elements.length) {
            var firstElement = elements[0];
            var doc = DOCUMENT() || firstElement.ownerDocument || firstElement;
            var root = doc.contains ? doc : doc.body;
            if (checks.inserted(root, firstElement)) {
                if (!mutatedElements) {
                    mutatedElements = [];
                    setImmediate(fireMutations);
                }
                mutatedElements.push([
                    type,
                    elements
                ]);
            }
        }
    };
    module.exports = {
        appendChild: function (child) {
            if (getMutationObserver()) {
                this.appendChild(child);
            } else {
                var children;
                if (child.nodeType === 11) {
                    children = makeArray(childNodes(child));
                } else {
                    children = [child];
                }
                this.appendChild(child);
                mutated(children, 'inserted');
            }
        },
        insertBefore: function (child, ref, document) {
            if (getMutationObserver()) {
                this.insertBefore(child, ref);
            } else {
                var children;
                if (child.nodeType === 11) {
                    children = makeArray(childNodes(child));
                } else {
                    children = [child];
                }
                this.insertBefore(child, ref);
                mutated(children, 'inserted');
            }
        },
        removeChild: function (child) {
            if (getMutationObserver()) {
                this.removeChild(child);
            } else {
                mutated([child], 'removed');
                this.removeChild(child);
            }
        },
        replaceChild: function (newChild, oldChild) {
            if (getMutationObserver()) {
                this.replaceChild(newChild, oldChild);
            } else {
                var children;
                if (newChild.nodeType === 11) {
                    children = makeArray(childNodes(newChild));
                } else {
                    children = [newChild];
                }
                mutated([oldChild], 'removed');
                this.replaceChild(newChild, oldChild);
                mutated(children, 'inserted');
            }
        },
        inserted: function (elements) {
            mutated(elements, 'inserted');
        },
        removed: function (elements) {
            mutated(elements, 'removed');
        }
    };
});
/*can-util@3.2.2#js/cid-map/cid-map*/
define('can-util/js/cid-map/cid-map', function (require, exports, module) {
    (function (global) {
        var GLOBAL = require('can-util/js/global/global');
        var each = require('can-util/js/each/each');
        var CID = require('can-cid');
        var domData = require('can-util/dom/data/data');
        var CIDSet;
        var getCID = function (obj) {
            if (typeof obj.nodeType === 'number') {
                return domData.cid.call(obj);
            } else {
                return CID(obj);
            }
        };
        if (GLOBAL().Map) {
            CIDSet = GLOBAL().Map;
        } else {
            var CIDSet = function () {
                this.values = {};
            };
            CIDSet.prototype.set = function (key, value) {
                this.values[getCID(key)] = value;
            };
            CIDSet.prototype['delete'] = function (key) {
                var has = getCID(key) in this.values;
                if (has) {
                    delete this.values[getCID(key)];
                }
                return has;
            };
            CIDSet.prototype.forEach = function (cb, thisArg) {
                each(this.values, cb, thisArg);
            };
            CIDSet.prototype.has = function (key) {
                return getCID(key) in this.values;
            };
            CIDSet.prototype.get = function (key) {
                return this.values[getCID(key)];
            };
            CIDSet.prototype.clear = function (key) {
                return this.values = {};
            };
            Object.defineProperty(CIDSet.prototype, 'size', {
                get: function () {
                    var size = 0;
                    each(this.values, function () {
                        size++;
                    });
                    return size;
                }
            });
        }
        module.exports = CIDSet;
    }(function () {
        return this;
    }()));
});
/*can-view-nodelist@3.0.4#can-view-nodelist*/
define('can-view-nodelist', function (require, exports, module) {
    var makeArray = require('can-util/js/make-array/make-array');
    var each = require('can-util/js/each/each');
    var namespace = require('can-namespace');
    var domMutate = require('can-util/dom/mutate/mutate');
    var CIDMap = require('can-util/js/cid-map/cid-map');
    var nodeMap = new CIDMap(), splice = [].splice, push = [].push, itemsInChildListTree = function (list) {
            var count = 0;
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];
                if (item.nodeType) {
                    count++;
                } else {
                    count += itemsInChildListTree(item);
                }
            }
            return count;
        }, replacementMap = function (replacements, idMap) {
            var map = new CIDMap();
            for (var i = 0, len = replacements.length; i < len; i++) {
                var node = nodeLists.first(replacements[i]);
                map.set(node, replacements[i]);
            }
            return map;
        }, addUnfoundAsDeepChildren = function (list, rMap) {
            rMap.forEach(function (replacement) {
                list.newDeepChildren.push(replacement);
            });
        };
    var nodeLists = {
        update: function (nodeList, newNodes) {
            var oldNodes = nodeLists.unregisterChildren(nodeList);
            newNodes = makeArray(newNodes);
            var oldListLength = nodeList.length;
            splice.apply(nodeList, [
                0,
                oldListLength
            ].concat(newNodes));
            if (nodeList.replacements) {
                nodeLists.nestReplacements(nodeList);
                nodeList.deepChildren = nodeList.newDeepChildren;
                nodeList.newDeepChildren = [];
            } else {
                nodeLists.nestList(nodeList);
            }
            return oldNodes;
        },
        nestReplacements: function (list) {
            var index = 0, idMap = {}, rMap = replacementMap(list.replacements, idMap), rCount = list.replacements.length;
            while (index < list.length && rCount) {
                var node = list[index], replacement = rMap.get(node);
                if (replacement) {
                    rMap['delete'](node);
                    list.splice(index, itemsInChildListTree(replacement), replacement);
                    rCount--;
                }
                index++;
            }
            if (rCount) {
                addUnfoundAsDeepChildren(list, rMap);
            }
            list.replacements = [];
        },
        nestList: function (list) {
            var index = 0;
            while (index < list.length) {
                var node = list[index], childNodeList = nodeMap.get(node);
                if (childNodeList) {
                    if (childNodeList !== list) {
                        list.splice(index, itemsInChildListTree(childNodeList), childNodeList);
                    }
                } else {
                    nodeMap.set(node, list);
                }
                index++;
            }
        },
        last: function (nodeList) {
            var last = nodeList[nodeList.length - 1];
            if (last.nodeType) {
                return last;
            } else {
                return nodeLists.last(last);
            }
        },
        first: function (nodeList) {
            var first = nodeList[0];
            if (first.nodeType) {
                return first;
            } else {
                return nodeLists.first(first);
            }
        },
        flatten: function (nodeList) {
            var items = [];
            for (var i = 0; i < nodeList.length; i++) {
                var item = nodeList[i];
                if (item.nodeType) {
                    items.push(item);
                } else {
                    items.push.apply(items, nodeLists.flatten(item));
                }
            }
            return items;
        },
        register: function (nodeList, unregistered, parent, directlyNested) {
            nodeList.unregistered = unregistered;
            nodeList.parentList = parent;
            nodeList.nesting = parent && typeof parent.nesting !== 'undefined' ? parent.nesting + 1 : 0;
            if (parent) {
                nodeList.deepChildren = [];
                nodeList.newDeepChildren = [];
                nodeList.replacements = [];
                if (parent !== true) {
                    if (directlyNested) {
                        parent.replacements.push(nodeList);
                    } else {
                        parent.newDeepChildren.push(nodeList);
                    }
                }
            } else {
                nodeLists.nestList(nodeList);
            }
            return nodeList;
        },
        unregisterChildren: function (nodeList) {
            var nodes = [];
            each(nodeList, function (node) {
                if (node.nodeType) {
                    if (!nodeList.replacements) {
                        nodeMap['delete'](node);
                    }
                    nodes.push(node);
                } else {
                    push.apply(nodes, nodeLists.unregister(node, true));
                }
            });
            each(nodeList.deepChildren, function (nodeList) {
                nodeLists.unregister(nodeList, true);
            });
            return nodes;
        },
        unregister: function (nodeList, isChild) {
            var nodes = nodeLists.unregisterChildren(nodeList, true);
            if (nodeList.unregistered) {
                var unregisteredCallback = nodeList.unregistered;
                nodeList.replacements = nodeList.unregistered = null;
                if (!isChild) {
                    var deepChildren = nodeList.parentList && nodeList.parentList.deepChildren;
                    if (deepChildren) {
                        var index = deepChildren.indexOf(nodeList);
                        if (index !== -1) {
                            deepChildren.splice(index, 1);
                        }
                    }
                }
                unregisteredCallback();
            }
            return nodes;
        },
        after: function (oldElements, newFrag) {
            var last = oldElements[oldElements.length - 1];
            if (last.nextSibling) {
                domMutate.insertBefore.call(last.parentNode, newFrag, last.nextSibling);
            } else {
                domMutate.appendChild.call(last.parentNode, newFrag);
            }
        },
        replace: function (oldElements, newFrag) {
            var selectedValue, parentNode = oldElements[0].parentNode;
            if (parentNode.nodeName.toUpperCase() === 'SELECT' && parentNode.selectedIndex >= 0) {
                selectedValue = parentNode.value;
            }
            if (oldElements.length === 1) {
                domMutate.replaceChild.call(parentNode, newFrag, oldElements[0]);
            } else {
                nodeLists.after(oldElements, newFrag);
                nodeLists.remove(oldElements);
            }
            if (selectedValue !== undefined) {
                parentNode.value = selectedValue;
            }
        },
        remove: function (elementsToBeRemoved) {
            var parent = elementsToBeRemoved[0] && elementsToBeRemoved[0].parentNode;
            each(elementsToBeRemoved, function (child) {
                domMutate.removeChild.call(parent, child);
            });
        },
        nodeMap: nodeMap
    };
    module.exports = namespace.nodeLists = nodeLists;
});
/*can-util@3.2.2#dom/fragment/fragment*/
define('can-util/dom/fragment/fragment', function (require, exports, module) {
    var getDocument = require('can-util/dom/document/document'), childNodes = require('can-util/dom/child-nodes/child-nodes');
    var fragmentRE = /^\s*<(\w+)[^>]*>/, toString = {}.toString, fragment = function (html, name, doc) {
            if (name === undefined) {
                name = fragmentRE.test(html) && RegExp.$1;
            }
            if (html && toString.call(html.replace) === '[object Function]') {
                html = html.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, '<$1></$2>');
            }
            var container = doc.createElement('div'), temp = doc.createElement('div');
            if (name === 'tbody' || name === 'tfoot' || name === 'thead' || name === 'colgroup') {
                temp.innerHTML = '<table>' + html + '</table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
            } else if (name === 'col') {
                temp.innerHTML = '<table><colgroup>' + html + '</colgroup></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
            } else if (name === 'tr') {
                temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
            } else if (name === 'td' || name === 'th') {
                temp.innerHTML = '<table><tbody><tr>' + html + '</tr></tbody></table>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild.firstChild;
            } else if (name === 'option') {
                temp.innerHTML = '<select>' + html + '</select>';
                container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
            } else {
                container.innerHTML = '' + html;
            }
            var tmp = {}, children = childNodes(container);
            tmp.length = children.length;
            for (var i = 0; i < children.length; i++) {
                tmp[i] = children[i];
            }
            return [].slice.call(tmp);
        };
    var buildFragment = function (html, doc) {
        if (html && html.nodeType === 11) {
            return html;
        }
        if (!doc) {
            doc = getDocument();
        } else if (doc.length) {
            doc = doc[0];
        }
        var parts = fragment(html, undefined, doc), frag = (doc || document).createDocumentFragment();
        for (var i = 0, length = parts.length; i < length; i++) {
            frag.appendChild(parts[i]);
        }
        return frag;
    };
    module.exports = buildFragment;
});
/*can-util@3.2.2#dom/frag/frag*/
define('can-util/dom/frag/frag', function (require, exports, module) {
    var getDocument = require('can-util/dom/document/document');
    var fragment = require('can-util/dom/fragment/fragment');
    var each = require('can-util/js/each/each');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var makeFrag = function (item, doc) {
        var document = doc || getDocument();
        var frag;
        if (!item || typeof item === 'string') {
            frag = fragment(item == null ? '' : '' + item, document);
            if (!frag.childNodes.length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        } else if (item.nodeType === 11) {
            return item;
        } else if (typeof item.nodeType === 'number') {
            frag = document.createDocumentFragment();
            frag.appendChild(item);
            return frag;
        } else if (typeof item.length === 'number') {
            frag = document.createDocumentFragment();
            each(item, function (item) {
                frag.appendChild(makeFrag(item));
            });
            if (!childNodes(frag).length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        } else {
            frag = fragment('' + item, document);
            if (!childNodes(frag).length) {
                frag.appendChild(document.createTextNode(''));
            }
            return frag;
        }
    };
    module.exports = makeFrag;
});
/*can-util@3.2.2#dom/mutation-observer/document/document*/
define('can-util/dom/mutation-observer/document/document', function (require, exports, module) {
    (function (global) {
        var getDocument = require('can-util/dom/document/document');
        var domData = require('can-util/dom/data/data');
        module.exports = {
            add: function (handler) {
                var documentElement = getDocument().documentElement;
                var globalObserverData = domData.get.call(documentElement, 'globalObserverData');
                if (!globalObserverData) {
                    var observer = new MutationObserver(function (mutations) {
                        globalObserverData.handlers.forEach(function (handler) {
                            handler(mutations);
                        });
                    });
                    observer.observe(documentElement, {
                        childList: true,
                        subtree: true
                    });
                    globalObserverData = {
                        observer: observer,
                        handlers: []
                    };
                    domData.set.call(documentElement, 'globalObserverData', globalObserverData);
                }
                globalObserverData.handlers.push(handler);
            },
            remove: function (handler) {
                var documentElement = getDocument().documentElement;
                var globalObserverData = domData.get.call(documentElement, 'globalObserverData');
                if (globalObserverData) {
                    var index = globalObserverData.handlers.indexOf(handler);
                    if (index >= 0) {
                        globalObserverData.handlers.splice(index, 1);
                    }
                    if (globalObserverData.handlers.length === 0) {
                        globalObserverData.observer.disconnect();
                        domData.clean.call(documentElement, 'globalObserverData');
                    }
                }
            }
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#js/cid-set/cid-set*/
define('can-util/js/cid-set/cid-set', function (require, exports, module) {
    (function (global) {
        var GLOBAL = require('can-util/js/global/global');
        var each = require('can-util/js/each/each');
        var CID = require('can-cid');
        var domData = require('can-util/dom/data/data');
        var CIDSet;
        var getCID = function (obj) {
            if (typeof obj.nodeType === 'number') {
                return domData.cid.call(obj);
            } else {
                return CID(obj);
            }
        };
        if (GLOBAL().Set) {
            CIDSet = GLOBAL().Set;
        } else {
            var CIDSet = function () {
                this.values = {};
            };
            CIDSet.prototype.add = function (value) {
                this.values[getCID(value)] = value;
            };
            CIDSet.prototype['delete'] = function (key) {
                var has = getCID(key) in this.values;
                if (has) {
                    delete this.values[getCID(key)];
                }
                return has;
            };
            CIDSet.prototype.forEach = function (cb, thisArg) {
                each(this.values, cb, thisArg);
            };
            CIDSet.prototype.has = function (value) {
                return this.values[getCID(value)];
            };
            CIDSet.prototype.clear = function (key) {
                return this.values = {};
            };
            Object.defineProperty(CIDSet.prototype, 'size', {
                get: function () {
                    var size = 0;
                    each(this.values, function () {
                        size++;
                    });
                    return size;
                }
            });
        }
        module.exports = CIDSet;
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#dom/is-of-global-document/is-of-global-document*/
define('can-util/dom/is-of-global-document/is-of-global-document', function (require, exports, module) {
    var getDocument = require('can-util/dom/document/document');
    module.exports = function (el) {
        return (el.ownerDocument || el) === getDocument();
    };
});
/*can-util@3.2.2#dom/events/make-mutation-event/make-mutation-event*/
define('can-util/dom/events/make-mutation-event/make-mutation-event', function (require, exports, module) {
    (function (global) {
        var each = require('can-util/js/each/each');
        var makeArray = require('can-util/js/make-array/make-array');
        var events = require('can-util/dom/events/events');
        var domData = require('can-util/dom/data/data');
        var getMutationObserver = require('can-util/dom/mutation-observer/mutation-observer');
        var domDispatch = require('can-util/dom/dispatch/dispatch');
        var mutationDocument = require('can-util/dom/mutation-observer/document/document');
        var getDocument = require('can-util/dom/document/document');
        var CIDStore = require('can-util/js/cid-set/cid-set');
        require('can-util/dom/is-of-global-document/is-of-global-document');
        module.exports = function (specialEventName, mutationNodesProperty) {
            var originalAdd = events.addEventListener, originalRemove = events.removeEventListener;
            var dispatchIfListening = function (mutatedNode, specialEventData, dispatched) {
                var doDispatch = true;
                if (dispatched.has(mutatedNode)) {
                    return true;
                }
                dispatched.add(mutatedNode);
                if (specialEventName === 'removed') {
                    var documentElement = getDocument().documentElement;
                    if (documentElement.contains(mutatedNode)) {
                        doDispatch = false;
                    }
                }
                if (doDispatch && specialEventData.nodeIdsRespondingToInsert.has(mutatedNode)) {
                    domDispatch.call(mutatedNode, specialEventName, [], false);
                }
            };
            events.addEventListener = function (eventName) {
                if (eventName === specialEventName && getMutationObserver()) {
                    var documentElement = getDocument().documentElement;
                    var specialEventData = domData.get.call(documentElement, specialEventName + 'Data');
                    if (!specialEventData) {
                        specialEventData = {
                            handler: function (mutations) {
                                var dispatched = new CIDStore();
                                mutations.forEach(function (mutation) {
                                    each(mutation[mutationNodesProperty], function (mutatedNode) {
                                        var children = mutatedNode.getElementsByTagName && makeArray(mutatedNode.getElementsByTagName('*'));
                                        var alreadyChecked = dispatchIfListening(mutatedNode, specialEventData, dispatched);
                                        if (children && !alreadyChecked) {
                                            for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                                                dispatchIfListening(child, specialEventData, dispatched);
                                            }
                                        }
                                    });
                                });
                            },
                            nodeIdsRespondingToInsert: new CIDStore()
                        };
                        mutationDocument.add(specialEventData.handler);
                        domData.set.call(documentElement, specialEventName + 'Data', specialEventData);
                    }
                    specialEventData.nodeIdsRespondingToInsert.add(this);
                }
                return originalAdd.apply(this, arguments);
            };
            events.removeEventListener = function (eventName) {
                if (eventName === specialEventName && getMutationObserver()) {
                    var documentElement = getDocument().documentElement;
                    var specialEventData = domData.get.call(documentElement, specialEventName + 'Data');
                    if (specialEventData) {
                        specialEventData.nodeIdsRespondingToInsert['delete'](this);
                        if (!specialEventData.nodeIdsRespondingToInsert.size) {
                            mutationDocument.remove(specialEventData.handler);
                            domData.clean.call(documentElement, specialEventName + 'Data');
                        }
                    }
                }
                return originalRemove.apply(this, arguments);
            };
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#dom/events/removed/removed*/
define('can-util/dom/events/removed/removed', function (require, exports, module) {
    var makeMutationEvent = require('can-util/dom/events/make-mutation-event/make-mutation-event');
    makeMutationEvent('removed', 'removedNodes');
});
/*can-view-live@3.0.5#lib/core*/
define('can-view-live/lib/core', function (require, exports, module) {
    var parser = require('can-view-parser');
    var domEvents = require('can-util/dom/events/events');
    var nodeLists = require('can-view-nodelist');
    var makeFrag = require('can-util/dom/frag/frag');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    require('can-util/dom/events/removed/removed');
    var childMutationCallbacks = {};
    var live = {
        setup: function (el, bind, unbind) {
            var tornDown = false, teardown = function () {
                    if (!tornDown) {
                        tornDown = true;
                        unbind(data);
                        domEvents.removeEventListener.call(el, 'removed', teardown);
                    }
                    return true;
                }, data = {
                    teardownCheck: function (parent) {
                        return parent ? false : teardown();
                    }
                };
            domEvents.addEventListener.call(el, 'removed', teardown);
            bind(data);
            return data;
        },
        listen: function (el, compute, change) {
            return live.setup(el, function () {
                compute.computeInstance.addEventListener('change', change);
            }, function (data) {
                compute.computeInstance.removeEventListener('change', change);
                if (data.nodeList) {
                    nodeLists.unregister(data.nodeList);
                }
            });
        },
        getAttributeParts: function (newVal) {
            var attrs = {}, attr;
            parser.parseAttrs(newVal, {
                attrStart: function (name) {
                    attrs[name] = '';
                    attr = name;
                },
                attrValue: function (value) {
                    attrs[attr] += value;
                },
                attrEnd: function () {
                }
            });
            return attrs;
        },
        isNode: function (obj) {
            return obj && obj.nodeType;
        },
        addTextNodeIfNoChildren: function (frag) {
            if (!frag.firstChild) {
                frag.appendChild(frag.ownerDocument.createTextNode(''));
            }
        },
        registerChildMutationCallback: function (tag, callback) {
            if (callback) {
                childMutationCallbacks[tag] = callback;
            } else {
                return childMutationCallbacks[tag];
            }
        },
        callChildMutationCallback: function (el) {
            var callback = el && childMutationCallbacks[el.nodeName.toLowerCase()];
            if (callback) {
                callback(el);
            }
        },
        replace: function (nodes, val, teardown) {
            var oldNodes = nodes.slice(0), frag = makeFrag(val);
            nodeLists.register(nodes, teardown);
            nodeLists.update(nodes, childNodes(frag));
            nodeLists.replace(oldNodes, frag);
            return nodes;
        },
        getParentNode: function (el, defaultParentNode) {
            return defaultParentNode && el.parentNode.nodeType === 11 ? defaultParentNode : el.parentNode;
        },
        makeString: function (txt) {
            return txt == null ? '' : '' + txt;
        }
    };
    module.exports = live;
});
/*can-util@3.2.2#dom/events/attributes/attributes*/
define('can-util/dom/events/attributes/attributes', function (require, exports, module) {
    (function (global) {
        var events = require('can-util/dom/events/events');
        var isOfGlobalDocument = require('can-util/dom/is-of-global-document/is-of-global-document');
        var domData = require('can-util/dom/data/data');
        var getMutationObserver = require('can-util/dom/mutation-observer/mutation-observer');
        var assign = require('can-util/js/assign/assign');
        var domDispatch = require('can-util/dom/dispatch/dispatch');
        var originalAdd = events.addEventListener, originalRemove = events.removeEventListener;
        events.addEventListener = function (eventName) {
            if (eventName === 'attributes') {
                var MutationObserver = getMutationObserver();
                if (isOfGlobalDocument(this) && MutationObserver) {
                    var self = this;
                    var observer = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {
                            var copy = assign({}, mutation);
                            domDispatch.call(self, copy, [], false);
                        });
                    });
                    observer.observe(this, {
                        attributes: true,
                        attributeOldValue: true
                    });
                    domData.set.call(this, 'canAttributesObserver', observer);
                } else {
                    domData.set.call(this, 'canHasAttributesBindings', true);
                }
            }
            return originalAdd.apply(this, arguments);
        };
        events.removeEventListener = function (eventName) {
            if (eventName === 'attributes') {
                var MutationObserver = getMutationObserver();
                var observer;
                if (isOfGlobalDocument(this) && MutationObserver) {
                    observer = domData.get.call(this, 'canAttributesObserver');
                    if (observer && observer.disconnect) {
                        observer.disconnect();
                        domData.clean.call(this, 'canAttributesObserver');
                    }
                } else {
                    domData.clean.call(this, 'canHasAttributesBindings');
                }
            }
            return originalRemove.apply(this, arguments);
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#dom/attr/attr*/
define('can-util/dom/attr/attr', function (require, exports, module) {
    (function (global) {
        var setImmediate = require('can-util/js/set-immediate/set-immediate');
        var getDocument = require('can-util/dom/document/document');
        var global = require('can-util/js/global/global')();
        var isOfGlobalDocument = require('can-util/dom/is-of-global-document/is-of-global-document');
        var setData = require('can-util/dom/data/data');
        var domContains = require('can-util/dom/contains/contains');
        var domEvents = require('can-util/dom/events/events');
        var domDispatch = require('can-util/dom/dispatch/dispatch');
        var MUTATION_OBSERVER = require('can-util/dom/mutation-observer/mutation-observer');
        var each = require('can-util/js/each/each');
        var types = require('can-types');
        require('can-util/dom/events/attributes/attributes');
        var namespaces = { 'xlink': 'http://www.w3.org/1999/xlink' };
        var formElements = {
                'INPUT': true,
                'TEXTAREA': true,
                'SELECT': true
            }, toString = function (value) {
                if (value == null) {
                    return '';
                } else {
                    return '' + value;
                }
            }, isSVG = function (el) {
                return el.namespaceURI === 'http://www.w3.org/2000/svg';
            }, truthy = function () {
                return true;
            }, getSpecialTest = function (special) {
                return special && special.test || truthy;
            }, propProp = function (prop, obj) {
                obj = obj || {};
                obj.get = function () {
                    return this[prop];
                };
                obj.set = function (value) {
                    if (this[prop] !== value) {
                        this[prop] = value;
                    }
                    return value;
                };
                return obj;
            }, booleanProp = function (prop) {
                return {
                    isBoolean: true,
                    set: function (value) {
                        if (prop in this) {
                            this[prop] = value !== false;
                        } else {
                            this.setAttribute(prop, '');
                        }
                    },
                    remove: function () {
                        this[prop] = false;
                    }
                };
            }, setupMO = function (el, callback) {
                var attrMO = setData.get.call(el, 'attrMO');
                if (!attrMO) {
                    var onMutation = function () {
                        callback.call(el);
                    };
                    var MO = MUTATION_OBSERVER();
                    if (MO) {
                        var observer = new MO(onMutation);
                        observer.observe(el, {
                            childList: true,
                            subtree: true
                        });
                        setData.set.call(el, 'attrMO', observer);
                    } else {
                        setData.set.call(el, 'attrMO', true);
                        setData.set.call(el, 'canBindingCallback', { onMutation: onMutation });
                    }
                }
            }, setChildOptions = function (el, value) {
                if (value != null) {
                    var child = el.firstChild, hasSelected = false;
                    while (child) {
                        if (child.nodeName === 'OPTION') {
                            if (value === child.value) {
                                hasSelected = child.selected = true;
                                break;
                            }
                        }
                        child = child.nextSibling;
                    }
                    if (!hasSelected) {
                        el.selectedIndex = -1;
                    }
                } else {
                    el.selectedIndex = -1;
                }
            }, setChildOptionsOnChange = function (select, aEL) {
                var handler = setData.get.call(select, 'attrSetChildOptions');
                if (handler) {
                    return Function.prototype;
                }
                handler = function () {
                    setChildOptions(select, select.value);
                };
                setData.set.call(select, 'attrSetChildOptions', handler);
                aEL.call(select, 'change', handler);
                return function (rEL) {
                    setData.clean.call(select, 'attrSetChildOptions');
                    rEL.call(select, 'change', handler);
                };
            }, attr = {
                special: {
                    checked: {
                        get: function () {
                            return this.checked;
                        },
                        set: function (val) {
                            var notFalse = !!val || val === undefined || val === '';
                            this.checked = notFalse;
                            if (notFalse && this.type === 'radio') {
                                this.defaultChecked = true;
                            }
                            return val;
                        },
                        remove: function () {
                            this.checked = false;
                        },
                        test: function () {
                            return this.nodeName === 'INPUT';
                        }
                    },
                    'class': {
                        get: function () {
                            if (isSVG(this)) {
                                return this.getAttribute('class');
                            }
                            return this.className;
                        },
                        set: function (val) {
                            val = val || '';
                            if (isSVG(this)) {
                                this.setAttribute('class', '' + val);
                            } else {
                                this.className = val;
                            }
                            return val;
                        }
                    },
                    disabled: booleanProp('disabled'),
                    focused: {
                        get: function () {
                            return this === document.activeElement;
                        },
                        set: function (val) {
                            var cur = attr.get(this, 'focused');
                            if (cur !== val) {
                                var element = this;
                                types.queueTask([
                                    function () {
                                        if (val) {
                                            element.focus();
                                        } else {
                                            element.blur();
                                        }
                                    },
                                    this,
                                    []
                                ]);
                            }
                            return !!val;
                        },
                        addEventListener: function (eventName, handler, aEL) {
                            aEL.call(this, 'focus', handler);
                            aEL.call(this, 'blur', handler);
                            return function (rEL) {
                                rEL.call(this, 'focus', handler);
                                rEL.call(this, 'blur', handler);
                            };
                        },
                        test: function () {
                            return this.nodeName === 'INPUT';
                        }
                    },
                    'for': propProp('htmlFor'),
                    innertext: propProp('innerText'),
                    innerhtml: propProp('innerHTML'),
                    innerHTML: propProp('innerHTML', {
                        addEventListener: function (eventName, handler, aEL) {
                            var handlers = [];
                            var el = this;
                            each([
                                'change',
                                'blur'
                            ], function (eventName) {
                                var localHandler = function () {
                                    handler.apply(this, arguments);
                                };
                                domEvents.addEventListener.call(el, eventName, localHandler);
                                handlers.push([
                                    eventName,
                                    localHandler
                                ]);
                            });
                            return function (rEL) {
                                each(handlers, function (info) {
                                    rEL.call(el, info[0], info[1]);
                                });
                            };
                        }
                    }),
                    required: booleanProp('required'),
                    readonly: booleanProp('readOnly'),
                    selected: {
                        get: function () {
                            return this.selected;
                        },
                        set: function (val) {
                            val = !!val;
                            setData.set.call(this, 'lastSetValue', val);
                            return this.selected = val;
                        },
                        addEventListener: function (eventName, handler, aEL) {
                            var option = this;
                            var select = this.parentNode;
                            var lastVal = option.selected;
                            var localHandler = function (changeEvent) {
                                var curVal = option.selected;
                                lastVal = setData.get.call(option, 'lastSetValue') || lastVal;
                                if (curVal !== lastVal) {
                                    lastVal = curVal;
                                    domDispatch.call(option, eventName);
                                }
                            };
                            var removeChangeHandler = setChildOptionsOnChange(select, aEL);
                            domEvents.addEventListener.call(select, 'change', localHandler);
                            aEL.call(option, eventName, handler);
                            return function (rEL) {
                                removeChangeHandler(rEL);
                                domEvents.removeEventListener.call(select, 'change', localHandler);
                                rEL.call(option, eventName, handler);
                            };
                        },
                        test: function () {
                            return this.nodeName === 'OPTION' && this.parentNode && this.parentNode.nodeName === 'SELECT';
                        }
                    },
                    src: {
                        set: function (val) {
                            if (val == null || val === '') {
                                this.removeAttribute('src');
                                return null;
                            } else {
                                this.setAttribute('src', val);
                                return val;
                            }
                        }
                    },
                    style: {
                        set: function () {
                            var el = global.document && getDocument().createElement('div');
                            if (el && el.style && 'cssText' in el.style) {
                                return function (val) {
                                    return this.style.cssText = val || '';
                                };
                            } else {
                                return function (val) {
                                    return this.setAttribute('style', val);
                                };
                            }
                        }()
                    },
                    textcontent: propProp('textContent'),
                    value: {
                        get: function () {
                            var value = this.value;
                            if (this.nodeName === 'SELECT') {
                                if ('selectedIndex' in this && this.selectedIndex === -1) {
                                    value = undefined;
                                }
                            }
                            return value;
                        },
                        set: function (value) {
                            var nodeName = this.nodeName.toLowerCase();
                            if (nodeName === 'input') {
                                value = toString(value);
                            }
                            if (this.value !== value || nodeName === 'option') {
                                this.value = value;
                            }
                            if (attr.defaultValue[nodeName]) {
                                this.defaultValue = value;
                            }
                            if (nodeName === 'select') {
                                setData.set.call(this, 'attrValueLastVal', value);
                                setChildOptions(this, value === null ? value : this.value);
                                var docEl = this.ownerDocument.documentElement;
                                if (!domContains.call(docEl, this)) {
                                    var select = this;
                                    var initialSetHandler = function () {
                                        domEvents.removeEventListener.call(select, 'inserted', initialSetHandler);
                                        setChildOptions(select, value === null ? value : select.value);
                                    };
                                    domEvents.addEventListener.call(this, 'inserted', initialSetHandler);
                                }
                                setupMO(this, function () {
                                    var value = setData.get.call(this, 'attrValueLastVal');
                                    attr.set(this, 'value', value);
                                    domDispatch.call(this, 'change');
                                });
                            }
                            return value;
                        },
                        test: function () {
                            return formElements[this.nodeName];
                        }
                    },
                    values: {
                        get: function () {
                            var values = [];
                            var child = this.firstChild;
                            while (child) {
                                if (child.nodeName === 'OPTION' && child.selected) {
                                    values.push(child.value);
                                }
                                child = child.nextSibling;
                            }
                            setData.set.call(this, 'valuesLastVal', values);
                            return values;
                        },
                        set: function (values) {
                            values = values || [];
                            var child = this.firstChild;
                            while (child) {
                                if (child.nodeName === 'OPTION') {
                                    child.selected = values.indexOf(child.value) !== -1;
                                }
                                child = child.nextSibling;
                            }
                            setData.set.call(this, 'valuesLastVal', values);
                            setupMO(this, function () {
                                var lastVal = setData.get.call(this, 'valuesLastVal');
                                attr.set(this, 'values', lastVal);
                                domDispatch.call(this, 'values');
                            });
                            return values;
                        },
                        addEventListener: function (eventName, handler, aEL) {
                            var localHandler = function () {
                                domDispatch.call(this, 'values');
                            };
                            domEvents.addEventListener.call(this, 'change', localHandler);
                            aEL.call(this, eventName, handler);
                            return function (rEL) {
                                domEvents.removeEventListener.call(this, 'change', localHandler);
                                rEL.call(this, eventName, handler);
                            };
                        }
                    }
                },
                defaultValue: {
                    input: true,
                    textarea: true
                },
                setAttrOrProp: function (el, attrName, val) {
                    attrName = attrName.toLowerCase();
                    var special = attr.special[attrName];
                    if (special && special.isBoolean && !val) {
                        this.remove(el, attrName);
                    } else {
                        this.set(el, attrName, val);
                    }
                },
                set: function (el, attrName, val) {
                    var usingMutationObserver = isOfGlobalDocument(el) && MUTATION_OBSERVER();
                    attrName = attrName.toLowerCase();
                    var oldValue;
                    if (!usingMutationObserver) {
                        oldValue = attr.get(el, attrName);
                    }
                    var newValue;
                    var special = attr.special[attrName];
                    var setter = special && special.set;
                    var test = getSpecialTest(special);
                    if (typeof setter === 'function' && test.call(el)) {
                        newValue = setter.call(el, val);
                    } else {
                        attr.setAttribute(el, attrName, val);
                    }
                    if (!usingMutationObserver && newValue !== oldValue) {
                        attr.trigger(el, attrName, oldValue);
                    }
                },
                setSelectValue: function (el, value) {
                    attr.set(el, 'value', value);
                },
                setAttribute: function () {
                    var doc = getDocument();
                    if (doc && document.createAttribute) {
                        try {
                            doc.createAttribute('{}');
                        } catch (e) {
                            var invalidNodes = {}, attributeDummy = document.createElement('div');
                            return function (el, attrName, val) {
                                var first = attrName.charAt(0), cachedNode, node, attr;
                                if ((first === '{' || first === '(' || first === '*') && el.setAttributeNode) {
                                    cachedNode = invalidNodes[attrName];
                                    if (!cachedNode) {
                                        attributeDummy.innerHTML = '<div ' + attrName + '=""></div>';
                                        cachedNode = invalidNodes[attrName] = attributeDummy.childNodes[0].attributes[0];
                                    }
                                    node = cachedNode.cloneNode();
                                    node.value = val;
                                    el.setAttributeNode(node);
                                } else {
                                    attr = attrName.split(':');
                                    if (attr.length !== 1) {
                                        el.setAttributeNS(namespaces[attr[0]], attrName, val);
                                    } else {
                                        el.setAttribute(attrName, val);
                                    }
                                }
                            };
                        }
                    }
                    return function (el, attrName, val) {
                        el.setAttribute(attrName, val);
                    };
                }(),
                trigger: function (el, attrName, oldValue) {
                    if (setData.get.call(el, 'canHasAttributesBindings')) {
                        attrName = attrName.toLowerCase();
                        return setImmediate(function () {
                            domDispatch.call(el, {
                                type: 'attributes',
                                attributeName: attrName,
                                target: el,
                                oldValue: oldValue,
                                bubbles: false
                            }, []);
                        });
                    }
                },
                get: function (el, attrName) {
                    attrName = attrName.toLowerCase();
                    var special = attr.special[attrName];
                    var getter = special && special.get;
                    var test = getSpecialTest(special);
                    if (typeof getter === 'function' && test.call(el)) {
                        return getter.call(el);
                    } else {
                        return el.getAttribute(attrName);
                    }
                },
                remove: function (el, attrName) {
                    attrName = attrName.toLowerCase();
                    var oldValue;
                    if (!MUTATION_OBSERVER()) {
                        oldValue = attr.get(el, attrName);
                    }
                    var special = attr.special[attrName];
                    var setter = special && special.set;
                    var remover = special && special.remove;
                    var test = getSpecialTest(special);
                    if (typeof remover === 'function' && test.call(el)) {
                        remover.call(el);
                    } else if (typeof setter === 'function' && test.call(el)) {
                        setter.call(el, undefined);
                    } else {
                        el.removeAttribute(attrName);
                    }
                    if (!MUTATION_OBSERVER() && oldValue != null) {
                        attr.trigger(el, attrName, oldValue);
                    }
                },
                has: function () {
                    var el = getDocument() && document.createElement('div');
                    if (el && el.hasAttribute) {
                        return function (el, name) {
                            return el.hasAttribute(name);
                        };
                    } else {
                        return function (el, name) {
                            return el.getAttribute(name) !== null;
                        };
                    }
                }()
            };
        var oldAddEventListener = domEvents.addEventListener;
        domEvents.addEventListener = function (eventName, handler) {
            var special = attr.special[eventName];
            if (special && special.addEventListener) {
                var teardown = special.addEventListener.call(this, eventName, handler, oldAddEventListener);
                var teardowns = setData.get.call(this, 'attrTeardowns');
                if (!teardowns) {
                    setData.set.call(this, 'attrTeardowns', teardowns = {});
                }
                if (!teardowns[eventName]) {
                    teardowns[eventName] = [];
                }
                teardowns[eventName].push({
                    teardown: teardown,
                    handler: handler
                });
                return;
            }
            return oldAddEventListener.apply(this, arguments);
        };
        var oldRemoveEventListener = domEvents.removeEventListener;
        domEvents.removeEventListener = function (eventName, handler) {
            var special = attr.special[eventName];
            if (special && special.addEventListener) {
                var teardowns = setData.get.call(this, 'attrTeardowns');
                if (teardowns && teardowns[eventName]) {
                    var eventTeardowns = teardowns[eventName];
                    for (var i = 0, len = eventTeardowns.length; i < len; i++) {
                        if (eventTeardowns[i].handler === handler) {
                            eventTeardowns[i].teardown.call(this, oldRemoveEventListener);
                            eventTeardowns.splice(i, 1);
                            break;
                        }
                    }
                    if (eventTeardowns.length === 0) {
                        delete teardowns[eventName];
                    }
                }
                return;
            }
            return oldRemoveEventListener.apply(this, arguments);
        };
        module.exports = exports = attr;
    }(function () {
        return this;
    }()));
});
/*can-view-live@3.0.5#lib/attr*/
define('can-view-live/lib/attr', function (require, exports, module) {
    var attr = require('can-util/dom/attr/attr');
    var live = require('can-view-live/lib/core');
    live.attr = function (el, attributeName, compute) {
        live.listen(el, compute, function (ev, newVal) {
            attr.set(el, attributeName, newVal);
        });
        attr.set(el, attributeName, compute());
    };
});
/*can-view-callbacks@3.0.4#can-view-callbacks*/
define('can-view-callbacks', function (require, exports, module) {
    (function (global) {
        var Observation = require('can-observation');
        var dev = require('can-util/js/dev/dev');
        var getGlobal = require('can-util/js/global/global');
        var domMutate = require('can-util/dom/mutate/mutate');
        var namespace = require('can-namespace');
        var attr = function (attributeName, attrHandler) {
            if (attrHandler) {
                if (typeof attributeName === 'string') {
                    attributes[attributeName] = attrHandler;
                } else {
                    regExpAttributes.push({
                        match: attributeName,
                        handler: attrHandler
                    });
                }
            } else {
                var cb = attributes[attributeName];
                if (!cb) {
                    for (var i = 0, len = regExpAttributes.length; i < len; i++) {
                        var attrMatcher = regExpAttributes[i];
                        if (attrMatcher.match.test(attributeName)) {
                            cb = attrMatcher.handler;
                            break;
                        }
                    }
                }
                return cb;
            }
        };
        var attributes = {}, regExpAttributes = [], automaticCustomElementCharacters = /[-\:]/;
        var tag = function (tagName, tagHandler) {
            if (tagHandler) {
                if (typeof tags[tagName.toLowerCase()] !== 'undefined') {
                    dev.warn('Custom tag: ' + tagName.toLowerCase() + ' is already defined');
                }
                if (!automaticCustomElementCharacters.test(tagName) && tagName !== 'content') {
                    dev.warn('Custom tag: ' + tagName.toLowerCase() + ' hyphen missed');
                }
                if (getGlobal().html5) {
                    getGlobal().html5.elements += ' ' + tagName;
                    getGlobal().html5.shivDocument();
                }
                tags[tagName.toLowerCase()] = tagHandler;
            } else {
                var cb;
                if (tagHandler === null) {
                    delete tags[tagName.toLowerCase()];
                } else {
                    cb = tags[tagName.toLowerCase()];
                }
                if (!cb && automaticCustomElementCharacters.test(tagName)) {
                    cb = function () {
                    };
                }
                return cb;
            }
        };
        var tags = {};
        var callbacks = {
            _tags: tags,
            _attributes: attributes,
            _regExpAttributes: regExpAttributes,
            tag: tag,
            attr: attr,
            tagHandler: function (el, tagName, tagData) {
                var helperTagCallback = tagData.options.get('tags.' + tagName, { proxyMethods: false }), tagCallback = helperTagCallback || tags[tagName];
                var scope = tagData.scope, res;
                if (tagCallback) {
                    res = Observation.ignore(tagCallback)(el, tagData);
                } else {
                    res = scope;
                }
                if (!tagCallback) {
                    dev.warn('can/view/scanner.js: No custom element found for ' + tagName);
                }
                if (res && tagData.subtemplate) {
                    if (scope !== res) {
                        scope = scope.add(res);
                    }
                    var result = tagData.subtemplate(scope, tagData.options);
                    var frag = typeof result === 'string' ? can.view.frag(result) : result;
                    domMutate.appendChild.call(el, frag);
                }
            }
        };
        namespace.view = namespace.view || {};
        if (namespace.view.callbacks) {
            throw new Error('You can\'t have two versions of can-view-callbacks, check your dependencies');
        } else {
            module.exports = namespace.view.callbacks = callbacks;
        }
    }(function () {
        return this;
    }()));
});
/*can-view-live@3.0.5#lib/attrs*/
define('can-view-live/lib/attrs', function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    var viewCallbacks = require('can-view-callbacks');
    var attr = require('can-util/dom/attr/attr');
    var domEvents = require('can-util/dom/events/events');
    var types = require('can-types');
    live.attrs = function (el, compute, scope, options) {
        if (!types.isCompute(compute)) {
            var attrs = live.getAttributeParts(compute);
            for (var name in attrs) {
                attr.set(el, name, attrs[name]);
            }
            return;
        }
        var oldAttrs = {};
        var setAttrs = function (newVal) {
            var newAttrs = live.getAttributeParts(newVal), name;
            for (name in newAttrs) {
                var newValue = newAttrs[name], oldValue = oldAttrs[name];
                if (newValue !== oldValue) {
                    attr.set(el, name, newValue);
                    var callback = viewCallbacks.attr(name);
                    if (callback) {
                        callback(el, {
                            attributeName: name,
                            scope: scope,
                            options: options
                        });
                    }
                }
                delete oldAttrs[name];
            }
            for (name in oldAttrs) {
                attr.remove(el, name);
            }
            oldAttrs = newAttrs;
        };
        var handler = function (ev, newVal) {
            setAttrs(newVal);
        };
        compute.addEventListener('change', handler);
        domEvents.addEventListener.call(el, 'removed', function () {
            compute.removeEventListener('change', handler);
        });
        setAttrs(compute());
    };
});
/*can-view-live@3.0.5#lib/html*/
define('can-view-live/lib/html', function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    var nodeLists = require('can-view-nodelist');
    var makeFrag = require('can-util/dom/frag/frag');
    var makeArray = require('can-util/js/make-array/make-array');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    live.html = function (el, compute, parentNode, nodeList) {
        var data;
        parentNode = live.getParentNode(el, parentNode);
        data = live.listen(parentNode, compute, function (ev, newVal, oldVal) {
            var attached = nodeLists.first(nodes).parentNode;
            if (attached) {
                makeAndPut(newVal);
            }
            var pn = nodeLists.first(nodes).parentNode;
            data.teardownCheck(pn);
            live.callChildMutationCallback(pn);
        });
        var nodes = nodeList || [el], makeAndPut = function (val) {
                var isFunction = typeof val === 'function', aNode = live.isNode(val), frag = makeFrag(isFunction ? '' : val), oldNodes = makeArray(nodes);
                live.addTextNodeIfNoChildren(frag);
                oldNodes = nodeLists.update(nodes, childNodes(frag));
                if (isFunction) {
                    val(frag.firstChild);
                }
                nodeLists.replace(oldNodes, frag);
            };
        data.nodeList = nodes;
        if (!nodeList) {
            nodeLists.register(nodes, data.teardownCheck);
        } else {
            nodeList.unregistered = data.teardownCheck;
        }
        makeAndPut(compute());
    };
});
/*can-view-live@3.0.5#lib/util/runInOrder*/
define('can-view-live/lib/util/runInOrder', function (require, exports, module) {
    module.exports = function makeRunInOrder() {
        var running = 0;
        var tasks = [];
        return function runInOrder(fn) {
            return function () {
                var fnArgs = arguments;
                if (running) {
                    tasks.push({
                        fn: fn,
                        args: fnArgs
                    });
                    return;
                }
                running++;
                fn.apply(null, fnArgs);
                running--;
                while (tasks.length) {
                    running++;
                    tasks[0].fn.apply(null, tasks[0].args);
                    tasks.shift();
                    running--;
                }
            };
        };
    };
});
/*can-util@3.2.2#js/diff/diff*/
define('can-util/js/diff/diff', function (require, exports, module) {
    var slice = [].slice;
    var defaultIdentity = function (a, b) {
        return a === b;
    };
    module.exports = exports = function (oldList, newList, identity) {
        identity = identity || defaultIdentity;
        var oldIndex = 0, newIndex = 0, oldLength = oldList.length, newLength = newList.length, patches = [];
        while (oldIndex < oldLength && newIndex < newLength) {
            var oldItem = oldList[oldIndex], newItem = newList[newIndex];
            if (identity(oldItem, newItem)) {
                oldIndex++;
                newIndex++;
                continue;
            }
            if (newIndex + 1 < newLength && identity(oldItem, newList[newIndex + 1])) {
                patches.push({
                    index: newIndex,
                    deleteCount: 0,
                    insert: [newList[newIndex]]
                });
                oldIndex++;
                newIndex += 2;
                continue;
            } else if (oldIndex + 1 < oldLength && identity(oldList[oldIndex + 1], newItem)) {
                patches.push({
                    index: newIndex,
                    deleteCount: 1,
                    insert: []
                });
                oldIndex += 2;
                newIndex++;
                continue;
            } else {
                patches.push({
                    index: newIndex,
                    deleteCount: oldLength - oldIndex,
                    insert: slice.call(newList, newIndex)
                });
                return patches;
            }
        }
        if (newIndex === newLength && oldIndex === oldLength) {
            return patches;
        }
        patches.push({
            index: newIndex,
            deleteCount: oldLength - oldIndex,
            insert: slice.call(newList, newIndex)
        });
        return patches;
    };
});
/*can-view-live@3.0.5#lib/list*/
define('can-view-live/lib/list', function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    var makeRunInOrder = require('can-view-live/lib/util/runInOrder');
    var runInOrder = makeRunInOrder();
    var nodeLists = require('can-view-nodelist');
    var makeCompute = require('can-compute');
    var canBatch = require('can-event/batch/batch');
    var frag = require('can-util/dom/frag/frag');
    var domMutate = require('can-util/dom/mutate/mutate');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var makeArray = require('can-util/js/make-array/make-array');
    var each = require('can-util/js/each/each');
    var isFunction = require('can-util/js/is-function/is-function');
    var diff = require('can-util/js/diff/diff');
    var splice = [].splice;
    var renderAndAddToNodeLists = function (newNodeLists, parentNodeList, render, context, args) {
            var itemNodeList = [];
            if (parentNodeList) {
                nodeLists.register(itemNodeList, null, parentNodeList, true);
                itemNodeList.parentList = parentNodeList;
                itemNodeList.expression = '#each SUBEXPRESSION';
            }
            var itemHTML = render.apply(context, args.concat([itemNodeList])), itemFrag = frag(itemHTML);
            var children = makeArray(childNodes(itemFrag));
            if (parentNodeList) {
                nodeLists.update(itemNodeList, children);
                newNodeLists.push(itemNodeList);
            } else {
                newNodeLists.push(nodeLists.register(children));
            }
            return itemFrag;
        }, removeFromNodeList = function (masterNodeList, index, length) {
            var removedMappings = masterNodeList.splice(index + 1, length), itemsToRemove = [];
            each(removedMappings, function (nodeList) {
                var nodesToRemove = nodeLists.unregister(nodeList);
                [].push.apply(itemsToRemove, nodesToRemove);
            });
            return itemsToRemove;
        }, addFalseyIfEmpty = function (list, falseyRender, masterNodeList, nodeList) {
            if (falseyRender && list.length === 0) {
                var falseyNodeLists = [];
                var falseyFrag = renderAndAddToNodeLists(falseyNodeLists, nodeList, falseyRender, list, [list]);
                nodeLists.after([masterNodeList[0]], falseyFrag);
                masterNodeList.push(falseyNodeLists[0]);
            }
        };
    live.list = function (el, compute, render, context, parentNode, nodeList, falseyRender) {
        var masterNodeList = nodeList || [el], indexMap = [], afterPreviousEvents = false, isTornDown = false, add = runInOrder(function add(ev, items, index) {
                if (!afterPreviousEvents) {
                    return;
                }
                var frag = text.ownerDocument.createDocumentFragment(), newNodeLists = [], newIndicies = [];
                each(items, function (item, key) {
                    var itemIndex = makeCompute(key + index), itemCompute = makeCompute(function (newVal) {
                            if (arguments.length) {
                                if ('set' in list) {
                                    list.set(itemIndex(), newVal);
                                } else {
                                    list.attr(itemIndex(), newVal);
                                }
                            } else {
                                return item;
                            }
                        }), itemFrag = renderAndAddToNodeLists(newNodeLists, nodeList, render, context, [
                            itemCompute,
                            itemIndex
                        ]);
                    frag.appendChild(itemFrag);
                    newIndicies.push(itemIndex);
                });
                var masterListIndex = index + 1;
                if (!indexMap.length) {
                    var falseyItemsToRemove = removeFromNodeList(masterNodeList, 0, masterNodeList.length - 1);
                    nodeLists.remove(falseyItemsToRemove);
                }
                if (!masterNodeList[masterListIndex]) {
                    nodeLists.after(masterListIndex === 1 ? [text] : [nodeLists.last(masterNodeList[masterListIndex - 1])], frag);
                } else {
                    var el = nodeLists.first(masterNodeList[masterListIndex]);
                    domMutate.insertBefore.call(el.parentNode, frag, el);
                }
                splice.apply(masterNodeList, [
                    masterListIndex,
                    0
                ].concat(newNodeLists));
                splice.apply(indexMap, [
                    index,
                    0
                ].concat(newIndicies));
                for (var i = index + newIndicies.length, len = indexMap.length; i < len; i++) {
                    indexMap[i](i);
                }
                if (ev.callChildMutationCallback !== false) {
                    live.callChildMutationCallback(text.parentNode);
                }
            }), set = function (ev, newVal, index) {
                remove({}, { length: 1 }, index, true);
                add({}, [newVal], index);
            }, remove = runInOrder(function remove(ev, items, index, duringTeardown, fullTeardown) {
                if (!afterPreviousEvents) {
                    return;
                }
                if (!duringTeardown && data.teardownCheck(text.parentNode)) {
                    return;
                }
                if (index < 0) {
                    index = indexMap.length + index;
                }
                var itemsToRemove = removeFromNodeList(masterNodeList, index, items.length);
                indexMap.splice(index, items.length);
                for (var i = index, len = indexMap.length; i < len; i++) {
                    indexMap[i](i);
                }
                if (!fullTeardown) {
                    addFalseyIfEmpty(list, falseyRender, masterNodeList, nodeList);
                    nodeLists.remove(itemsToRemove);
                    if (ev.callChildMutationCallback !== false) {
                        live.callChildMutationCallback(text.parentNode);
                    }
                } else {
                    nodeLists.unregister(masterNodeList);
                }
            }), move = function (ev, item, newIndex, currentIndex) {
                if (!afterPreviousEvents) {
                    return;
                }
                newIndex = newIndex + 1;
                currentIndex = currentIndex + 1;
                var referenceNodeList = masterNodeList[newIndex];
                var movedElements = frag(nodeLists.flatten(masterNodeList[currentIndex]));
                var referenceElement;
                if (currentIndex < newIndex) {
                    referenceElement = nodeLists.last(referenceNodeList).nextSibling;
                } else {
                    referenceElement = nodeLists.first(referenceNodeList);
                }
                var parentNode = masterNodeList[0].parentNode;
                parentNode.insertBefore(movedElements, referenceElement);
                var temp = masterNodeList[currentIndex];
                [].splice.apply(masterNodeList, [
                    currentIndex,
                    1
                ]);
                [].splice.apply(masterNodeList, [
                    newIndex,
                    0,
                    temp
                ]);
                newIndex = newIndex - 1;
                currentIndex = currentIndex - 1;
                var indexCompute = indexMap[currentIndex];
                [].splice.apply(indexMap, [
                    currentIndex,
                    1
                ]);
                [].splice.apply(indexMap, [
                    newIndex,
                    0,
                    indexCompute
                ]);
                var i = Math.min(currentIndex, newIndex);
                var len = indexMap.length;
                for (i, len; i < len; i++) {
                    indexMap[i](i);
                }
                if (ev.callChildMutationCallback !== false) {
                    live.callChildMutationCallback(text.parentNode);
                }
            }, text = el.ownerDocument.createTextNode(''), list, teardownList = function (fullTeardown) {
                if (list && list.removeEventListener) {
                    list.removeEventListener('add', add);
                    list.removeEventListener('set', set);
                    list.removeEventListener('remove', remove);
                    list.removeEventListener('move', move);
                }
                remove({ callChildMutationCallback: !!fullTeardown }, { length: masterNodeList.length - 1 }, 0, true, fullTeardown);
            }, updateList = function (ev, newList, oldList) {
                if (isTornDown) {
                    return;
                }
                afterPreviousEvents = true;
                if (newList && oldList) {
                    list = newList || [];
                    var patches = diff(oldList, newList);
                    if (oldList.removeEventListener) {
                        oldList.removeEventListener('add', add);
                        oldList.removeEventListener('set', set);
                        oldList.removeEventListener('remove', remove);
                        oldList.removeEventListener('move', move);
                    }
                    for (var i = 0, patchLen = patches.length; i < patchLen; i++) {
                        var patch = patches[i];
                        if (patch.deleteCount) {
                            remove({ callChildMutationCallback: false }, { length: patch.deleteCount }, patch.index, true);
                        }
                        if (patch.insert.length) {
                            add({ callChildMutationCallback: false }, patch.insert, patch.index);
                        }
                    }
                } else {
                    if (oldList) {
                        teardownList();
                    }
                    list = newList || [];
                    add({ callChildMutationCallback: false }, list, 0);
                    addFalseyIfEmpty(list, falseyRender, masterNodeList, nodeList);
                }
                live.callChildMutationCallback(text.parentNode);
                afterPreviousEvents = false;
                if (list.addEventListener) {
                    list.addEventListener('add', add);
                    list.addEventListener('set', set);
                    list.addEventListener('remove', remove);
                    list.addEventListener('move', move);
                }
                canBatch.afterPreviousEvents(function () {
                    afterPreviousEvents = true;
                });
            };
        parentNode = live.getParentNode(el, parentNode);
        var data = live.setup(parentNode, function () {
            if (isFunction(compute)) {
                compute.addEventListener('change', updateList);
            }
        }, function () {
            if (isFunction(compute)) {
                compute.removeEventListener('change', updateList);
            }
            teardownList(true);
        });
        if (!nodeList) {
            live.replace(masterNodeList, text, data.teardownCheck);
        } else {
            nodeLists.replace(masterNodeList, text);
            nodeLists.update(masterNodeList, [text]);
            nodeList.unregistered = function () {
                data.teardownCheck();
                isTornDown = true;
            };
        }
        updateList({}, isFunction(compute) ? compute() : compute);
    };
});
/*can-view-live@3.0.5#lib/text*/
define('can-view-live/lib/text', function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    var nodeLists = require('can-view-nodelist');
    live.text = function (el, compute, parentNode, nodeList) {
        var parent = live.getParentNode(el, parentNode);
        var data = live.listen(parent, compute, function (ev, newVal, oldVal) {
            if (typeof node.nodeValue !== 'unknown') {
                node.nodeValue = live.makeString(newVal);
            }
            data.teardownCheck(node.parentNode);
        });
        var node = el.ownerDocument.createTextNode(live.makeString(compute()));
        if (nodeList) {
            nodeList.unregistered = data.teardownCheck;
            data.nodeList = nodeList;
            nodeLists.update(nodeList, [node]);
            nodeLists.replace([el], node);
        } else {
            data.nodeList = live.replace([el], node, data.teardownCheck);
        }
    };
});
/*can-view-live@3.0.5#can-view-live*/
define('can-view-live', function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    require('can-view-live/lib/attr');
    require('can-view-live/lib/attrs');
    require('can-view-live/lib/html');
    require('can-view-live/lib/list');
    require('can-view-live/lib/text');
    module.exports = live;
});
/*can-util@3.2.2#js/base-url/base-url*/
define('can-util/js/base-url/base-url', function (require, exports, module) {
    (function (global) {
        var getGlobal = require('can-util/js/global/global');
        var setBaseUrl;
        module.exports = function (setUrl) {
            if (setUrl !== undefined) {
                setBaseUrl = setUrl;
            }
            if (setBaseUrl !== undefined) {
                return setBaseUrl;
            }
            var global = getGlobal();
            if (global.location) {
                var href = global.location.href;
                var lastSlash = href.lastIndexOf('/');
                return lastSlash !== -1 ? href.substr(0, lastSlash) : href;
            } else if (typeof process !== 'undefined') {
                return process.cwd();
            }
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#js/parse-uri/parse-uri*/
define('can-util/js/parse-uri/parse-uri', function (require, exports, module) {
    module.exports = function (url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null;
    };
});
/*can-util@3.2.2#js/join-uris/join-uris*/
define('can-util/js/join-uris/join-uris', function (require, exports, module) {
    var parseURI = require('can-util/js/parse-uri/parse-uri');
    module.exports = function (base, href) {
        function removeDotSegments(input) {
            var output = [];
            input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function (p) {
                if (p === '/..') {
                    output.pop();
                } else {
                    output.push(p);
                }
            });
            return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
        }
        href = parseURI(href || '');
        base = parseURI(base || '');
        return !href || !base ? null : (href.protocol || base.protocol) + (href.protocol || href.authority ? href.authority : base.authority) + removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : href.pathname ? (base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname : base.pathname) + (href.protocol || href.authority || href.pathname ? href.search : href.search || base.search) + href.hash;
    };
});
/*can-stache@3.0.19#helpers/core*/
define('can-stache/helpers/core', function (require, exports, module) {
    var live = require('can-view-live');
    var nodeLists = require('can-view-nodelist');
    var compute = require('can-compute');
    var utils = require('can-stache/src/utils');
    var types = require('can-types');
    var isFunction = require('can-util/js/is-function/is-function');
    var getBaseURL = require('can-util/js/base-url/base-url');
    var joinURIs = require('can-util/js/join-uris/join-uris');
    var each = require('can-util/js/each/each');
    var assign = require('can-util/js/assign/assign');
    var isIterable = require('can-util/js/is-iterable/is-iterable');
    var domData = require('can-util/dom/data/data');
    var looksLikeOptions = function (options) {
        return options && typeof options.fn === 'function' && typeof options.inverse === 'function';
    };
    var resolve = function (value) {
        if (isFunction(value)) {
            return value();
        } else {
            return value;
        }
    };
    var resolveHash = function (hash) {
        var params = {};
        for (var prop in hash) {
            var value = hash[prop];
            if (value && value.isComputed) {
                params[prop] = value();
            } else {
                params[prop] = value;
            }
        }
        return params;
    };
    var helpers = {
        'each': function (items) {
            var args = [].slice.call(arguments), options = args.pop(), argsLen = args.length, argExprs = options.exprData.argExprs, resolved = resolve(items), asVariable, aliases, key;
            if (argsLen === 2 || argsLen === 3 && argExprs[1].key === 'as') {
                asVariable = args[argsLen - 1];
                if (typeof asVariable !== 'string') {
                    asVariable = argExprs[argsLen - 1].key;
                }
            }
            if (types.isListLike(resolved) && !options.stringOnly) {
                return function (el) {
                    var nodeList = [el];
                    nodeList.expression = 'live.list';
                    nodeLists.register(nodeList, null, options.nodeList, true);
                    nodeLists.update(options.nodeList, [el]);
                    var cb = function (item, index, parentNodeList) {
                        var aliases = {
                            '%index': index,
                            '@index': index
                        };
                        if (asVariable) {
                            aliases[asVariable] = item;
                        }
                        return options.fn(options.scope.add(aliases, { notContext: true }).add(item), options.options, parentNodeList);
                    };
                    live.list(el, items, cb, options.context, el.parentNode, nodeList, function (list, parentNodeList) {
                        return options.inverse(options.scope.add(list), options.options, parentNodeList);
                    });
                };
            }
            var expr = resolved, result;
            if (!!expr && utils.isArrayLike(expr)) {
                result = utils.getItemsFragContent(expr, options, options.scope, asVariable);
                return options.stringOnly ? result.join('') : result;
            } else if (isIterable(expr)) {
                result = [];
                each(expr, function (value, key) {
                    aliases = { '%key': key };
                    if (asVariable) {
                        aliases[asVariable] = value;
                    }
                    result.push(options.fn(options.scope.add(aliases, { notContext: true }).add(value)));
                });
                return options.stringOnly ? result.join('') : result;
            } else if (types.isMapLike(expr)) {
                result = [];
                (expr.forEach || expr.each).call(expr, function (val, key) {
                    var value = compute(expr, key);
                    aliases = {
                        '%key': key,
                        '@key': key
                    };
                    if (asVariable) {
                        aliases[asVariable] = expr[key];
                    }
                    result.push(options.fn(options.scope.add(aliases, { notContext: true }).add(value)));
                });
                return options.stringOnly ? result.join('') : result;
            } else if (expr instanceof Object) {
                result = [];
                for (key in expr) {
                    aliases = {
                        '%key': key,
                        '@key': key
                    };
                    if (asVariable) {
                        aliases[asVariable] = expr[key];
                    }
                    result.push(options.fn(options.scope.add(aliases, { notContext: true }).add(expr[key])));
                }
                return options.stringOnly ? result.join('') : result;
            }
        },
        '@index': function (offset, options) {
            if (!options) {
                options = offset;
                offset = 0;
            }
            var index = options.scope.peek('@index');
            return '' + ((isFunction(index) ? index() : index) + offset);
        },
        'if': function (expr, options) {
            var value;
            if (isFunction(expr)) {
                value = compute.truthy(expr)();
            } else {
                value = !!resolve(expr);
            }
            if (value) {
                return options.fn(options.scope || this);
            } else {
                return options.inverse(options.scope || this);
            }
        },
        'is': function () {
            var lastValue, curValue, options = arguments[arguments.length - 1];
            if (arguments.length - 2 <= 0) {
                return options.inverse();
            }
            var args = arguments;
            var callFn = compute(function () {
                for (var i = 0; i < args.length - 1; i++) {
                    curValue = resolve(args[i]);
                    curValue = isFunction(curValue) ? curValue() : curValue;
                    if (i > 0) {
                        if (curValue !== lastValue) {
                            return false;
                        }
                    }
                    lastValue = curValue;
                }
                return true;
            });
            return callFn() ? options.fn() : options.inverse();
        },
        'eq': function () {
            return helpers.is.apply(this, arguments);
        },
        'unless': function (expr, options) {
            return helpers['if'].apply(this, [
                expr,
                assign(assign({}, options), {
                    fn: options.inverse,
                    inverse: options.fn
                })
            ]);
        },
        'with': function (expr, options) {
            var ctx = expr;
            expr = resolve(expr);
            if (!!expr) {
                return options.fn(ctx);
            }
        },
        'log': function (options) {
            var logs = [];
            each(arguments, function (val) {
                if (!looksLikeOptions(val)) {
                    logs.push(val);
                }
            });
            if (typeof console !== 'undefined' && console.log) {
                if (!logs.length) {
                    console.log(options.context);
                } else {
                    console.log.apply(console, logs);
                }
            }
        },
        'data': function (attr) {
            var data = arguments.length === 2 ? this : arguments[1];
            return function (el) {
                domData.set.call(el, attr, data || this.context);
            };
        },
        'switch': function (expression, options) {
            resolve(expression);
            var found = false;
            var newOptions = options.helpers.add({
                'case': function (value, options) {
                    if (!found && resolve(expression) === resolve(value)) {
                        found = true;
                        return options.fn(options.scope || this);
                    }
                },
                'default': function (options) {
                    if (!found) {
                        return options.fn(options.scope || this);
                    }
                }
            });
            return options.fn(options.scope, newOptions);
        },
        'joinBase': function (firstExpr) {
            var args = [].slice.call(arguments);
            var options = args.pop();
            var moduleReference = args.map(function (expr) {
                var value = resolve(expr);
                return isFunction(value) ? value() : value;
            }).join('');
            var templateModule = options.helpers.peek('helpers.module');
            var parentAddress = templateModule ? templateModule.uri : undefined;
            var isRelative = moduleReference[0] === '.';
            if (isRelative && parentAddress) {
                return joinURIs(parentAddress, moduleReference);
            } else {
                var baseURL = typeof System !== 'undefined' && (System.renderingBaseURL || System.baseURL) || getBaseURL();
                if (moduleReference[0] !== '/' && baseURL[baseURL.length - 1] !== '/') {
                    baseURL += '/';
                }
                return joinURIs(baseURL, moduleReference);
            }
        }
    };
    helpers.eachOf = helpers.each;
    var registerHelper = function (name, callback) {
        helpers[name] = callback;
    };
    var makeSimpleHelper = function (fn) {
        return function () {
            var realArgs = [];
            each(arguments, function (val, i) {
                if (i <= arguments.length) {
                    while (val && val.isComputed) {
                        val = val();
                    }
                    realArgs.push(val);
                }
            });
            return fn.apply(this, realArgs);
        };
    };
    module.exports = {
        registerHelper: registerHelper,
        registerSimpleHelper: function (name, callback) {
            registerHelper(name, makeSimpleHelper(callback));
        },
        getHelper: function (name, options) {
            var helper = options && options.get && options.get('helpers.' + name, { proxyMethods: false });
            if (!helper) {
                helper = helpers[name];
            }
            if (helper) {
                return { fn: helper };
            }
        },
        resolve: resolve,
        resolveHash: resolveHash,
        looksLikeOptions: looksLikeOptions
    };
});
/*can-stache@3.0.19#src/expression*/
define('can-stache/src/expression', function (require, exports, module) {
    var compute = require('can-compute');
    var observeReader = require('can-observation/reader/reader');
    var utils = require('can-stache/src/utils');
    var mustacheHelpers = require('can-stache/helpers/core');
    var each = require('can-util/js/each/each');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var dev = require('can-util/js/dev/dev');
    var assign = require('can-util/js/assign/assign');
    var last = require('can-util/js/last/last');
    var getKeyComputeData = function (key, scope, readOptions) {
            var data = scope.computeData(key, readOptions);
            compute.temporarilyBind(data.compute);
            return data;
        }, lookupValue = function (key, scope, helperOptions, readOptions) {
            var prop = getValueOfComputeOrFunction(key);
            var computeData = getKeyComputeData(prop, scope, readOptions);
            if (!computeData.compute.computeInstance.hasDependencies) {
                return {
                    value: computeData.initialValue,
                    computeData: computeData
                };
            } else {
                return {
                    value: computeData.compute,
                    computeData: computeData
                };
            }
        }, lookupValueOrHelper = function (key, scope, helperOptions, readOptions) {
            var res = lookupValue(key, scope, helperOptions, readOptions);
            if (res.computeData.initialValue === undefined) {
                if (key.charAt(0) === '@' && key !== '@index') {
                    key = key.substr(1);
                }
                var helper = mustacheHelpers.getHelper(key, helperOptions);
                res.helper = helper && helper.fn;
            }
            return res;
        }, lookupValueInResult = function (keyOrCompute, lookupOrCall, scope, helperOptions, readOptions) {
            var result = lookupOrCall.value(scope, {}, {});
            var c = compute(function (newVal) {
                var key = getValueOfComputeOrFunction(keyOrCompute);
                if (arguments.length) {
                    observeReader.write(result, observeReader.reads(key), newVal);
                } else {
                    return observeReader.get(result, '' + key);
                }
            });
            return { value: c };
        }, getValueOfComputeOrFunction = function (computeOrFunction) {
            if (typeof computeOrFunction.value === 'function') {
                return computeOrFunction.value();
            }
            if (typeof computeOrFunction === 'function') {
                return computeOrFunction();
            }
            return computeOrFunction;
        }, convertToArgExpression = function (expr) {
            if (!(expr instanceof Arg) && !(expr instanceof Literal)) {
                return new Arg(expr);
            } else {
                return expr;
            }
        };
    var Bracket = function (key, root) {
        this.root = root;
        this.key = key;
    };
    Bracket.prototype.value = function (scope) {
        var prop = this.key;
        var obj = this.root;
        if (prop instanceof Lookup) {
            prop = lookupValue(prop.key, scope, {}, {});
        } else if (prop instanceof Call) {
            prop = prop.value(scope, {}, {});
        }
        if (prop.computeData != null && prop.hasOwnProperty('value')) {
            prop = prop.value;
        }
        if (!obj) {
            return lookupValue(prop, scope, {}, {}).value;
        } else {
            return lookupValueInResult(prop, obj, scope, {}, {}).value;
        }
    };
    var Literal = function (value) {
        this._value = value;
    };
    Literal.prototype.value = function () {
        return this._value;
    };
    var Lookup = function (key, root) {
        this.key = key;
        this.rootExpr = root;
    };
    Lookup.prototype.value = function (scope, helperOptions) {
        var result = {};
        if (this.rootExpr) {
            result = lookupValueInResult(this.key, this.rootExpr, scope, {}, {});
        } else {
            result = lookupValueOrHelper(this.key, scope, helperOptions);
        }
        this.isHelper = result.helper && !result.helper.callAsMethod;
        return result.helper || result.value;
    };
    var ScopeLookup = function (key, root) {
        Lookup.apply(this, arguments);
    };
    ScopeLookup.prototype.value = function (scope, helperOptions) {
        if (this.rootExpr) {
            return lookupValueInResult(this.key, this.rootExpr, scope, {}, {}).value;
        }
        return lookupValue(this.key, scope, helperOptions).value;
    };
    var Arg = function (expression, modifiers) {
        this.expr = expression;
        this.modifiers = modifiers || {};
        this.isCompute = false;
    };
    Arg.prototype.value = function () {
        return this.expr.value.apply(this.expr, arguments);
    };
    var Hash = function () {
    };
    var Hashes = function (hashes) {
        this.hashExprs = hashes;
    };
    Hashes.prototype.value = function (scope, helperOptions) {
        var hash = {};
        for (var prop in this.hashExprs) {
            var val = convertToArgExpression(this.hashExprs[prop]), value = val.value.apply(val, arguments);
            hash[prop] = {
                call: value && value.isComputed && !val.modifiers.compute,
                value: value
            };
        }
        return compute(function () {
            var finalHash = {};
            for (var prop in hash) {
                finalHash[prop] = hash[prop].call ? hash[prop].value() : hash[prop].value;
            }
            return finalHash;
        });
    };
    var Call = function (methodExpression, argExpressions) {
        this.methodExpr = methodExpression;
        this.argExprs = argExpressions.map(convertToArgExpression);
    };
    Call.prototype.args = function (scope, helperOptions) {
        var args = [];
        for (var i = 0, len = this.argExprs.length; i < len; i++) {
            var arg = this.argExprs[i];
            var value = arg.value.apply(arg, arguments);
            args.push({
                call: value && value.isComputed && !arg.modifiers.compute,
                value: value
            });
        }
        return function () {
            var finalArgs = [];
            for (var i = 0, len = args.length; i < len; i++) {
                finalArgs[i] = args[i].call ? args[i].value() : args[i].value;
            }
            return finalArgs;
        };
    };
    Call.prototype.value = function (scope, helperScope, helperOptions) {
        var method = this.methodExpr.value(scope, helperScope);
        var isHelper = this.isHelper = this.methodExpr.isHelper;
        var getArgs = this.args(scope, helperScope);
        return compute(function (newVal) {
            var func = method;
            if (func && func.isComputed) {
                func = func();
            }
            if (typeof func === 'function') {
                var args = getArgs();
                if (isHelper && helperOptions) {
                    args.push(helperOptions);
                }
                if (arguments.length) {
                    args.unshift(new expression.SetIdentifier(newVal));
                }
                return func.apply(null, args);
            }
        });
    };
    var HelperLookup = function () {
        Lookup.apply(this, arguments);
    };
    HelperLookup.prototype.value = function (scope, helperOptions) {
        var result = lookupValueOrHelper(this.key, scope, helperOptions, {
            isArgument: true,
            args: [
                scope.peek('.'),
                scope
            ]
        });
        return result.helper || result.value;
    };
    var HelperScopeLookup = function () {
        Lookup.apply(this, arguments);
    };
    HelperScopeLookup.prototype.value = function (scope, helperOptions) {
        return lookupValue(this.key, scope, helperOptions, {
            callMethodsOnObservables: true,
            isArgument: true,
            args: [
                scope.peek('.'),
                scope
            ]
        }).value;
    };
    var Helper = function (methodExpression, argExpressions, hashExpressions) {
        this.methodExpr = methodExpression;
        this.argExprs = argExpressions;
        this.hashExprs = hashExpressions;
        this.mode = null;
    };
    Helper.prototype.args = function (scope, helperOptions) {
        var args = [];
        for (var i = 0, len = this.argExprs.length; i < len; i++) {
            var arg = this.argExprs[i];
            args.push(arg.value.apply(arg, arguments));
        }
        return args;
    };
    Helper.prototype.hash = function (scope, helperOptions) {
        var hash = {};
        for (var prop in this.hashExprs) {
            var val = this.hashExprs[prop];
            hash[prop] = val.value.apply(val, arguments);
        }
        return hash;
    };
    Helper.prototype.helperAndValue = function (scope, helperOptions) {
        var looksLikeAHelper = this.argExprs.length || !isEmptyObject(this.hashExprs), helper, value, methodKey = this.methodExpr instanceof Literal ? '' + this.methodExpr._value : this.methodExpr.key, initialValue, args;
        if (looksLikeAHelper) {
            helper = mustacheHelpers.getHelper(methodKey, helperOptions);
            var context = scope.peek('.');
            if (!helper && typeof context[methodKey] === 'function') {
                dev.warn('can-stache/src/expression.js: In 3.0, method "' + methodKey + '" will not be called as a helper, but as a method.');
                helper = { fn: context[methodKey] };
            }
        }
        if (!helper) {
            args = this.args(scope, helperOptions);
            var computeData = getKeyComputeData(methodKey, scope, {
                    isArgument: false,
                    args: args && args.length ? args : [
                        scope.peek('.'),
                        scope
                    ]
                }), compute = computeData.compute;
            initialValue = computeData.initialValue;
            if (computeData.compute.computeInstance.hasDependencies) {
                value = compute;
            } else {
                value = initialValue;
            }
            if (!looksLikeAHelper && initialValue === undefined) {
                helper = mustacheHelpers.getHelper(methodKey, helperOptions);
            }
        }
        if (!helper && initialValue === undefined) {
            if (looksLikeAHelper) {
                dev.warn('can-stache/src/expression.js: Unable to find helper "' + methodKey + '".');
            } else {
                dev.warn('can-stache/src/expression.js: Unable to find key or helper "' + methodKey + '".');
            }
        }
        return {
            value: value,
            args: args,
            helper: helper && helper.fn
        };
    };
    Helper.prototype.evaluator = function (helper, scope, helperOptions, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly) {
        var helperOptionArg = {
                fn: function () {
                },
                inverse: function () {
                },
                stringOnly: stringOnly
            }, context = scope.peek('.'), args = this.args(scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly), hash = this.hash(scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
        utils.convertToScopes(helperOptionArg, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
        assign(helperOptionArg, {
            context: context,
            scope: scope,
            contexts: scope,
            hash: hash,
            nodeList: nodeList,
            exprData: this,
            helperOptions: helperOptions,
            helpers: helperOptions
        });
        args.push(helperOptionArg);
        return function () {
            return helper.apply(context, args);
        };
    };
    Helper.prototype.value = function (scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly) {
        var helperAndValue = this.helperAndValue(scope, helperOptions);
        var helper = helperAndValue.helper;
        if (!helper) {
            return helperAndValue.value;
        }
        var fn = this.evaluator(helper, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
        var computeValue = compute(fn);
        compute.temporarilyBind(computeValue);
        if (!computeValue.computeInstance.hasDependencies) {
            return computeValue();
        } else {
            return computeValue;
        }
    };
    var keyRegExp = /[\w\.\\\-_@\/\&%]+/, tokensRegExp = /('.*?'|".*?"|=|[\w\.\\\-_@\/*%\$]+|[\(\)]|,|\~|\[|\]\s*|\s*(?=\[))/g, bracketSpaceRegExp = /\]\s+/, literalRegExp = /^('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)$/;
    var isTokenKey = function (token) {
        return keyRegExp.test(token);
    };
    var testDot = /^[\.@]\w/;
    var isAddingToExpression = function (token) {
        return isTokenKey(token) && testDot.test(token);
    };
    var ensureChildren = function (type) {
        if (!type.children) {
            type.children = [];
        }
        return type;
    };
    var Stack = function () {
        this.root = {
            children: [],
            type: 'Root'
        };
        this.current = this.root;
        this.stack = [this.root];
    };
    assign(Stack.prototype, {
        top: function () {
            return last(this.stack);
        },
        isRootTop: function () {
            return this.top() === this.root;
        },
        popTo: function (types) {
            this.popUntil(types);
            this.pop();
        },
        pop: function () {
            if (!this.isRootTop()) {
                this.stack.pop();
            }
        },
        first: function (types) {
            var curIndex = this.stack.length - 1;
            while (curIndex > 0 && types.indexOf(this.stack[curIndex].type) === -1) {
                curIndex--;
            }
            return this.stack[curIndex];
        },
        firstParent: function (types) {
            var curIndex = this.stack.length - 2;
            while (curIndex > 0 && types.indexOf(this.stack[curIndex].type) === -1) {
                curIndex--;
            }
            return this.stack[curIndex];
        },
        popUntil: function (types) {
            while (types.indexOf(this.top().type) === -1 && !this.isRootTop()) {
                this.stack.pop();
            }
            return this.top();
        },
        addTo: function (types, type) {
            var cur = this.popUntil(types);
            ensureChildren(cur).children.push(type);
        },
        addToAndPush: function (types, type) {
            this.addTo(types, type);
            this.stack.push(type);
        },
        push: function (type) {
            this.stack.push(type);
        },
        topLastChild: function () {
            return last(this.top().children);
        },
        replaceTopLastChild: function (type) {
            var children = ensureChildren(this.top()).children;
            children.pop();
            children.push(type);
            return type;
        },
        replaceTopLastChildAndPush: function (type) {
            this.replaceTopLastChild(type);
            this.stack.push(type);
        },
        replaceTopAndPush: function (type) {
            var children;
            if (this.top() === this.root) {
                children = ensureChildren(this.top()).children;
            } else {
                this.stack.pop();
                children = ensureChildren(this.top()).children;
            }
            children.pop();
            children.push(type);
            this.stack.push(type);
            return type;
        }
    });
    var convertKeyToLookup = function (key) {
        var lastPath = key.lastIndexOf('./');
        var lastDot = key.lastIndexOf('.');
        if (lastDot > lastPath) {
            return key.substr(0, lastDot) + '@' + key.substr(lastDot + 1);
        }
        var firstNonPathCharIndex = lastPath === -1 ? 0 : lastPath + 2;
        var firstNonPathChar = key.charAt(firstNonPathCharIndex);
        if (firstNonPathChar === '.' || firstNonPathChar === '@') {
            return key.substr(0, firstNonPathCharIndex) + '@' + key.substr(firstNonPathCharIndex + 1);
        } else {
            return key.substr(0, firstNonPathCharIndex) + '@' + key.substr(firstNonPathCharIndex);
        }
    };
    var convertToAtLookup = function (ast) {
        if (ast.type === 'Lookup') {
            ast.key = convertKeyToLookup(ast.key);
        }
        return ast;
    };
    var convertToHelperIfTopIsLookup = function (stack) {
        var top = stack.top();
        if (top && top.type === 'Lookup') {
            var base = stack.stack[stack.stack.length - 2];
            if (base.type !== 'Helper' && base) {
                stack.replaceTopAndPush({
                    type: 'Helper',
                    method: top
                });
            }
        }
    };
    var expression = {
        convertKeyToLookup: convertKeyToLookup,
        Literal: Literal,
        Lookup: Lookup,
        ScopeLookup: ScopeLookup,
        Arg: Arg,
        Hash: Hash,
        Hashes: Hashes,
        Call: Call,
        Helper: Helper,
        HelperLookup: HelperLookup,
        HelperScopeLookup: HelperScopeLookup,
        Bracket: Bracket,
        SetIdentifier: function (value) {
            this.value = value;
        },
        tokenize: function (expression) {
            var tokens = [];
            (expression.trim() + ' ').replace(tokensRegExp, function (whole, arg) {
                if (bracketSpaceRegExp.test(arg)) {
                    tokens.push(arg[0]);
                    tokens.push(arg.slice(1));
                } else {
                    tokens.push(arg);
                }
            });
            return tokens;
        },
        lookupRules: {
            'default': function (ast, methodType, isArg) {
                var name = (methodType === 'Helper' && !ast.root ? 'Helper' : '') + (isArg ? 'Scope' : '') + 'Lookup';
                return expression[name];
            },
            'method': function (ast, methodType, isArg) {
                return ScopeLookup;
            }
        },
        methodRules: {
            'default': function (ast) {
                return ast.type === 'Call' ? Call : Helper;
            },
            'call': function (ast) {
                return Call;
            }
        },
        parse: function (expressionString, options) {
            options = options || {};
            var ast = this.ast(expressionString);
            if (!options.lookupRule) {
                options.lookupRule = 'default';
            }
            if (typeof options.lookupRule === 'string') {
                options.lookupRule = expression.lookupRules[options.lookupRule];
            }
            if (!options.methodRule) {
                options.methodRule = 'default';
            }
            if (typeof options.methodRule === 'string') {
                options.methodRule = expression.methodRules[options.methodRule];
            }
            var expr = this.hydrateAst(ast, options, options.baseMethodType || 'Helper');
            return expr;
        },
        hydrateAst: function (ast, options, methodType, isArg) {
            var hashes;
            if (ast.type === 'Lookup') {
                return new (options.lookupRule(ast, methodType, isArg))(ast.key, ast.root && this.hydrateAst(ast.root, options, methodType));
            } else if (ast.type === 'Literal') {
                return new Literal(ast.value);
            } else if (ast.type === 'Arg') {
                return new Arg(this.hydrateAst(ast.children[0], options, methodType, isArg), { compute: true });
            } else if (ast.type === 'Hash') {
                throw new Error('');
            } else if (ast.type === 'Hashes') {
                hashes = {};
                each(ast.children, function (hash) {
                    hashes[hash.prop] = this.hydrateAst(hash.children[0], options, methodType, true);
                }, this);
                return new Hashes(hashes);
            } else if (ast.type === 'Call' || ast.type === 'Helper') {
                hashes = {};
                var args = [], children = ast.children, ExpressionType = options.methodRule(ast);
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if (child.type === 'Hashes' && ast.type === 'Helper' && ExpressionType !== Call) {
                            each(child.children, function (hash) {
                                hashes[hash.prop] = this.hydrateAst(hash.children[0], options, ast.type, true);
                            }, this);
                        } else {
                            args.push(this.hydrateAst(child, options, ast.type, true));
                        }
                    }
                }
                return new ExpressionType(this.hydrateAst(ast.method, options, ast.type), args, hashes);
            } else if (ast.type === 'Bracket') {
                return new Bracket(this.hydrateAst(ast.children[0], options), ast.root ? this.hydrateAst(ast.root, options) : undefined);
            }
        },
        ast: function (expression) {
            var tokens = this.tokenize(expression);
            return this.parseAst(tokens, { index: 0 });
        },
        parseAst: function (tokens, cursor) {
            var stack = new Stack(), top, firstParent, lastToken;
            while (cursor.index < tokens.length) {
                var token = tokens[cursor.index], nextToken = tokens[cursor.index + 1];
                cursor.index++;
                if (literalRegExp.test(token)) {
                    convertToHelperIfTopIsLookup(stack);
                    firstParent = stack.first([
                        'Helper',
                        'Call',
                        'Hash',
                        'Bracket'
                    ]);
                    if (firstParent.type === 'Hash' && (firstParent.children && firstParent.children.length > 0)) {
                        stack.addTo([
                            'Helper',
                            'Call',
                            'Bracket'
                        ], {
                            type: 'Literal',
                            value: utils.jsonParse(token)
                        });
                    } else if (firstParent.type === 'Bracket' && (firstParent.children && firstParent.children.length > 0)) {
                        stack.addTo([
                            'Helper',
                            'Call',
                            'Hash'
                        ], {
                            type: 'Literal',
                            value: utils.jsonParse(token)
                        });
                    } else {
                        stack.addTo([
                            'Helper',
                            'Call',
                            'Hash',
                            'Bracket'
                        ], {
                            type: 'Literal',
                            value: utils.jsonParse(token)
                        });
                    }
                } else if (nextToken === '=') {
                    top = stack.top();
                    if (top && top.type === 'Lookup') {
                        firstParent = stack.firstParent([
                            'Call',
                            'Helper',
                            'Hash'
                        ]);
                        if (firstParent.type === 'Call' || firstParent.type === 'Root') {
                            stack.popUntil(['Call']);
                            top = stack.top();
                            stack.replaceTopAndPush({
                                type: 'Helper',
                                method: top.type === 'Root' ? last(top.children) : top
                            });
                        }
                    }
                    firstParent = stack.firstParent([
                        'Call',
                        'Helper',
                        'Hashes'
                    ]);
                    var hash = {
                        type: 'Hash',
                        prop: token
                    };
                    if (firstParent.type === 'Hashes') {
                        stack.addToAndPush(['Hashes'], hash);
                    } else {
                        stack.addToAndPush([
                            'Helper',
                            'Call'
                        ], {
                            type: 'Hashes',
                            children: [hash]
                        });
                        stack.push(hash);
                    }
                    cursor.index++;
                } else if (keyRegExp.test(token)) {
                    lastToken = stack.topLastChild();
                    firstParent = stack.first([
                        'Helper',
                        'Call',
                        'Hash',
                        'Bracket'
                    ]);
                    if (lastToken && lastToken.type === 'Call' && isAddingToExpression(token)) {
                        stack.replaceTopLastChildAndPush({
                            type: 'Lookup',
                            root: lastToken,
                            key: token.slice(1)
                        });
                    } else if (firstParent.type === 'Bracket') {
                        if (!(firstParent.children && firstParent.children.length > 0)) {
                            stack.addToAndPush(['Bracket'], {
                                type: 'Lookup',
                                key: token
                            });
                        } else {
                            if (stack.first([
                                    'Helper',
                                    'Call',
                                    'Hash',
                                    'Arg'
                                ]).type === 'Helper' && token[0] !== '.') {
                                stack.addToAndPush(['Helper'], {
                                    type: 'Lookup',
                                    key: token
                                });
                            } else {
                                stack.replaceTopAndPush({
                                    type: 'Lookup',
                                    key: token.slice(1),
                                    root: firstParent
                                });
                            }
                        }
                    } else {
                        convertToHelperIfTopIsLookup(stack);
                        stack.addToAndPush([
                            'Helper',
                            'Call',
                            'Hash',
                            'Arg',
                            'Bracket'
                        ], {
                            type: 'Lookup',
                            key: token
                        });
                    }
                } else if (token === '~') {
                    convertToHelperIfTopIsLookup(stack);
                    stack.addToAndPush([
                        'Helper',
                        'Call',
                        'Hash'
                    ], {
                        type: 'Arg',
                        key: token
                    });
                } else if (token === '(') {
                    top = stack.top();
                    if (top.type === 'Lookup') {
                        stack.replaceTopAndPush({
                            type: 'Call',
                            method: convertToAtLookup(top)
                        });
                    } else {
                        throw new Error('Unable to understand expression ' + tokens.join(''));
                    }
                } else if (token === ')') {
                    stack.popTo(['Call']);
                } else if (token === ',') {
                    stack.popUntil(['Call']);
                } else if (token === '[') {
                    top = stack.top();
                    lastToken = stack.topLastChild();
                    if (lastToken && lastToken.type === 'Call') {
                        stack.replaceTopAndPush({
                            type: 'Bracket',
                            root: lastToken
                        });
                    } else if (top.type === 'Lookup' || top.type === 'Bracket') {
                        stack.replaceTopAndPush({
                            type: 'Bracket',
                            root: top
                        });
                    } else if (top.type === 'Call') {
                        stack.addToAndPush(['Call'], { type: 'Bracket' });
                    } else if (top === ' ') {
                        stack.popUntil(['Lookup']);
                        convertToHelperIfTopIsLookup(stack);
                        stack.addToAndPush([
                            'Helper',
                            'Call',
                            'Hash'
                        ], { type: 'Bracket' });
                    } else {
                        stack.replaceTopAndPush({ type: 'Bracket' });
                    }
                } else if (token === ']') {
                    stack.pop();
                } else if (token === ' ') {
                    stack.push(token);
                }
            }
            return stack.root.children[0];
        }
    };
    module.exports = expression;
});
/*can-view-model@3.1.3#can-view-model*/
define('can-view-model', function (require, exports, module) {
    'use strict';
    var domData = require('can-util/dom/data/data');
    var SimpleMap = require('can-simple-map');
    var types = require('can-types');
    var ns = require('can-namespace');
    var getDocument = require('can-util/dom/document/document');
    module.exports = ns.viewModel = function (el, attr, val) {
        el = typeof el === 'string' ? getDocument().querySelector(el) : el;
        var scope = domData.get.call(el, 'viewModel');
        if (!scope) {
            scope = types.DefaultMap ? new types.DefaultMap() : new SimpleMap();
            domData.set.call(el, 'viewModel', scope);
        }
        switch (arguments.length) {
        case 0:
        case 1:
            return scope;
        case 2:
            return 'attr' in scope ? scope.attr(attr) : scope[attr];
        default:
            if ('attr' in scope) {
                scope.attr(attr, val);
            } else {
                scope[attr] = val;
            }
            return el;
        }
    };
});
/*can-stache-bindings@3.0.6#can-stache-bindings*/
define('can-stache-bindings', function (require, exports, module) {
    var expression = require('can-stache/src/expression');
    var viewCallbacks = require('can-view-callbacks');
    var live = require('can-view-live');
    var Scope = require('can-view-scope');
    var canViewModel = require('can-view-model');
    var canEvent = require('can-event');
    var canBatch = require('can-event/batch/batch');
    var compute = require('can-compute');
    var observeReader = require('can-observation/reader/reader');
    var Observation = require('can-observation');
    var assign = require('can-util/js/assign/assign');
    var makeArray = require('can-util/js/make-array/make-array');
    var each = require('can-util/js/each/each');
    var string = require('can-util/js/string/string');
    var dev = require('can-util/js/dev/dev');
    var types = require('can-types');
    var last = require('can-util/js/last/last');
    var getMutationObserver = require('can-util/dom/mutation-observer/mutation-observer');
    var domEvents = require('can-util/dom/events/events');
    require('can-util/dom/events/removed/removed');
    var domData = require('can-util/dom/data/data');
    var attr = require('can-util/dom/attr/attr');
    var behaviors = {
        viewModel: function (el, tagData, makeViewModel, initialViewModelData) {
            initialViewModelData = initialViewModelData || {};
            var bindingsSemaphore = {}, viewModel, onCompleteBindings = [], onTeardowns = {}, bindingInfos = {}, attributeViewModelBindings = assign({}, initialViewModelData);
            each(makeArray(el.attributes), function (node) {
                var dataBinding = makeDataBinding(node, el, {
                    templateType: tagData.templateType,
                    scope: tagData.scope,
                    semaphore: bindingsSemaphore,
                    getViewModel: function () {
                        return viewModel;
                    },
                    attributeViewModelBindings: attributeViewModelBindings,
                    alreadyUpdatedChild: true,
                    nodeList: tagData.parentNodeList
                });
                if (dataBinding) {
                    if (dataBinding.onCompleteBinding) {
                        if (dataBinding.bindingInfo.parentToChild && dataBinding.value !== undefined) {
                            initialViewModelData[cleanVMName(dataBinding.bindingInfo.childName)] = dataBinding.value;
                        }
                        onCompleteBindings.push(dataBinding.onCompleteBinding);
                    }
                    onTeardowns[node.name] = dataBinding.onTeardown;
                }
            });
            viewModel = makeViewModel(initialViewModelData);
            for (var i = 0, len = onCompleteBindings.length; i < len; i++) {
                onCompleteBindings[i]();
            }
            domEvents.addEventListener.call(el, 'attributes', function (ev) {
                var attrName = ev.attributeName, value = el.getAttribute(attrName);
                if (onTeardowns[attrName]) {
                    onTeardowns[attrName]();
                }
                var parentBindingWasAttribute = bindingInfos[attrName] && bindingInfos[attrName].parent === 'attribute';
                if (value !== null || parentBindingWasAttribute) {
                    var dataBinding = makeDataBinding({
                        name: attrName,
                        value: value
                    }, el, {
                        templateType: tagData.templateType,
                        scope: tagData.scope,
                        semaphore: {},
                        getViewModel: function () {
                            return viewModel;
                        },
                        attributeViewModelBindings: attributeViewModelBindings,
                        initializeValues: true,
                        nodeList: tagData.parentNodeList
                    });
                    if (dataBinding) {
                        if (dataBinding.onCompleteBinding) {
                            dataBinding.onCompleteBinding();
                        }
                        bindingInfos[attrName] = dataBinding.bindingInfo;
                        onTeardowns[attrName] = dataBinding.onTeardown;
                    }
                }
            });
            return function () {
                for (var attrName in onTeardowns) {
                    onTeardowns[attrName]();
                }
            };
        },
        data: function (el, attrData) {
            if (domData.get.call(el, 'preventDataBindings')) {
                return;
            }
            var viewModel = canViewModel(el), semaphore = {}, teardown;
            var dataBinding = makeDataBinding({
                name: attrData.attributeName,
                value: el.getAttribute(attrData.attributeName),
                nodeList: attrData.nodeList
            }, el, {
                templateType: attrData.templateType,
                scope: attrData.scope,
                semaphore: semaphore,
                getViewModel: function () {
                    return viewModel;
                }
            });
            if (dataBinding.onCompleteBinding) {
                dataBinding.onCompleteBinding();
            }
            teardown = dataBinding.onTeardown;
            canEvent.one.call(el, 'removed', function () {
                teardown();
            });
            domEvents.addEventListener.call(el, 'attributes', function (ev) {
                var attrName = ev.attributeName, value = el.getAttribute(attrName);
                if (attrName === attrData.attributeName) {
                    if (teardown) {
                        teardown();
                    }
                    if (value !== null) {
                        var dataBinding = makeDataBinding({
                            name: attrName,
                            value: value
                        }, el, {
                            templateType: attrData.templateType,
                            scope: attrData.scope,
                            semaphore: semaphore,
                            getViewModel: function () {
                                return viewModel;
                            },
                            initializeValues: true,
                            nodeList: attrData.nodeList
                        });
                        if (dataBinding) {
                            if (dataBinding.onCompleteBinding) {
                                dataBinding.onCompleteBinding();
                            }
                            teardown = dataBinding.onTeardown;
                        }
                    }
                }
            });
        },
        reference: function (el, attrData) {
            if (el.getAttribute(attrData.attributeName)) {
                console.warn('*reference attributes can only export the view model.');
            }
            var name = string.camelize(attrData.attributeName.substr(1).toLowerCase());
            var viewModel = canViewModel(el);
            var refs = attrData.scope.getRefs();
            refs._context.attr('*' + name, viewModel);
        },
        event: function (el, data) {
            var attributeName = data.attributeName, legacyBinding = attributeName.indexOf('can-') === 0, event = attributeName.indexOf('can-') === 0 ? attributeName.substr('can-'.length) : removeBrackets(attributeName, '(', ')'), onBindElement = legacyBinding;
            if (event.charAt(0) === '$') {
                event = event.substr(1);
                onBindElement = true;
            }
            var handler = function (ev) {
                var attrVal = el.getAttribute(attributeName);
                if (!attrVal) {
                    return;
                }
                var viewModel = canViewModel(el);
                var expr = expression.parse(removeBrackets(attrVal), {
                    lookupRule: 'method',
                    methodRule: 'call'
                });
                if (!(expr instanceof expression.Call) && !(expr instanceof expression.Helper)) {
                    var defaultArgs = [
                        data.scope._context,
                        el
                    ].concat(makeArray(arguments)).map(function (data) {
                        return new expression.Arg(new expression.Literal(data));
                    });
                    expr = new expression.Call(expr, defaultArgs, {});
                }
                var localScope = data.scope.add({
                    '@element': el,
                    '@event': ev,
                    '@viewModel': viewModel,
                    '@scope': data.scope,
                    '@context': data.scope._context,
                    '%element': this,
                    '$element': types.wrapElement(el),
                    '%event': ev,
                    '%viewModel': viewModel,
                    '%scope': data.scope,
                    '%context': data.scope._context,
                    '%arguments': arguments
                }, { notContext: true });
                var scopeData = localScope.read(expr.methodExpr.key, { isArgument: true });
                if (!scopeData.value) {
                    scopeData = localScope.read(expr.methodExpr.key, { isArgument: true });
                    dev.warn('can/view/bindings: ' + attributeName + ' couldn\'t find method named ' + expr.methodExpr.key, {
                        element: el,
                        scope: data.scope
                    });
                    return null;
                }
                var args = expr.args(localScope, null)();
                return scopeData.value.apply(scopeData.parent, args);
            };
            if (special[event]) {
                var specialData = special[event](data, el, handler);
                handler = specialData.handler;
                event = specialData.event;
            }
            canEvent.on.call(onBindElement ? el : canViewModel(el), event, handler);
            var attributesHandler = function (ev) {
                if (ev.attributeName === attributeName && !this.getAttribute(attributeName)) {
                    canEvent.off.call(onBindElement ? el : canViewModel(el), event, handler);
                    canEvent.off.call(el, 'attributes', attributesHandler);
                }
            };
            canEvent.on.call(el, 'attributes', attributesHandler);
        },
        value: function (el, data) {
            var propName = '$value', attrValue = removeBrackets(el.getAttribute('can-value')).trim(), nodeName = el.nodeName.toLowerCase(), elType = nodeName === 'input' && (el.type || el.getAttribute('type')), getterSetter;
            if (nodeName === 'input' && (elType === 'checkbox' || elType === 'radio')) {
                var property = getComputeFrom.scope(el, data.scope, attrValue, {}, true);
                if (el.type === 'checkbox') {
                    var trueValue = attr.has(el, 'can-true-value') ? el.getAttribute('can-true-value') : true, falseValue = attr.has(el, 'can-false-value') ? el.getAttribute('can-false-value') : false;
                    getterSetter = compute(function (newValue) {
                        if (arguments.length) {
                            property(newValue ? trueValue : falseValue);
                        } else {
                            return property() == trueValue;
                        }
                    });
                } else if (elType === 'radio') {
                    getterSetter = compute(function (newValue) {
                        if (arguments.length) {
                            if (newValue) {
                                property(el.value);
                            }
                        } else {
                            return property() == el.value;
                        }
                    });
                }
                propName = '$checked';
                attrValue = 'getterSetter';
                data.scope = new Scope({ getterSetter: getterSetter });
            } else if (isContentEditable(el)) {
                propName = '$innerHTML';
            }
            var dataBinding = makeDataBinding({
                name: '{(' + propName + '})',
                value: attrValue
            }, el, {
                templateType: data.templateType,
                scope: data.scope,
                semaphore: {},
                initializeValues: true,
                legacyBindings: true,
                syncChildWithParent: true
            });
            canEvent.one.call(el, 'removed', function () {
                dataBinding.onTeardown();
            });
        }
    };
    viewCallbacks.attr(/^\{[^\}]+\}$/, behaviors.data);
    viewCallbacks.attr(/\*[\w\.\-_]+/, behaviors.reference);
    viewCallbacks.attr(/^\([\$?\w\.]+\)$/, behaviors.event);
    function syntaxWarning(el, attrData) {
        dev.warn('can/view/bindings/bindings.js: mismatched binding syntax - ' + attrData.attributeName);
    }
    viewCallbacks.attr(/^\(.+\}$/, syntaxWarning);
    viewCallbacks.attr(/^\{.+\)$/, syntaxWarning);
    viewCallbacks.attr(/^\(\{.+\}\)$/, syntaxWarning);
    viewCallbacks.attr(/can-[\w\.]+/, behaviors.event);
    viewCallbacks.attr('can-value', behaviors.value);
    var getComputeFrom = {
        scope: function (el, scope, scopeProp, bindingData, mustBeACompute, stickyCompute) {
            if (!scopeProp) {
                return compute();
            } else {
                if (mustBeACompute) {
                    var parentExpression = expression.parse(scopeProp, { baseMethodType: 'Call' });
                    return parentExpression.value(scope, new Scope.Options({}));
                } else {
                    return function (newVal) {
                        scope.attr(cleanVMName(scopeProp), newVal);
                    };
                }
            }
        },
        viewModel: function (el, scope, vmName, bindingData, mustBeACompute, stickyCompute) {
            var setName = cleanVMName(vmName);
            if (mustBeACompute) {
                return compute(function (newVal) {
                    var viewModel = bindingData.getViewModel();
                    if (arguments.length) {
                        if (types.isMapLike(viewModel)) {
                            observeReader.set(viewModel, setName, newVal);
                        } else {
                            viewModel[setName] = newVal;
                        }
                    } else {
                        return vmName === '.' ? viewModel : observeReader.read(viewModel, observeReader.reads(vmName), {}).value;
                    }
                });
            } else {
                return function (newVal) {
                    var childCompute;
                    var viewModel = bindingData.getViewModel();
                    function updateViewModel(value, options) {
                        if (types.isMapLike(viewModel)) {
                            observeReader.set(viewModel, setName, value, options);
                        } else {
                            viewModel[setName] = value;
                        }
                    }
                    if (stickyCompute) {
                        childCompute = observeReader.get(viewModel, setName, { readCompute: false });
                        if (!childCompute || !childCompute.isComputed) {
                            childCompute = compute();
                            updateViewModel(childCompute, { readCompute: false });
                        }
                        childCompute(newVal);
                    } else {
                        updateViewModel(newVal);
                    }
                };
            }
        },
        attribute: function (el, scope, prop, bindingData, mustBeACompute, stickyCompute, event) {
            if (!event) {
                if (attr.special[prop] && attr.special[prop].addEventListener) {
                    event = prop;
                } else {
                    event = 'change';
                }
            }
            var hasChildren = el.nodeName.toLowerCase() === 'select', isMultiselectValue = prop === 'value' && hasChildren && el.multiple, set = function (newVal) {
                    if (bindingData.legacyBindings && hasChildren && 'selectedIndex' in el && prop === 'value') {
                        attr.setAttrOrProp(el, prop, newVal == null ? '' : newVal);
                    } else {
                        attr.setAttrOrProp(el, prop, newVal);
                    }
                    return newVal;
                }, get = function () {
                    return attr.get(el, prop);
                };
            if (isMultiselectValue) {
                prop = 'values';
            }
            return compute(get(), {
                on: function (updater) {
                    canEvent.on.call(el, event, updater);
                },
                off: function (updater) {
                    canEvent.off.call(el, event, updater);
                },
                get: get,
                set: set
            });
        }
    };
    var bind = {
        childToParent: function (el, parentCompute, childCompute, bindingsSemaphore, attrName, syncChild) {
            var parentUpdateIsFunction = typeof parentCompute === 'function';
            var updateParent = function (ev, newVal) {
                if (!bindingsSemaphore[attrName]) {
                    if (parentUpdateIsFunction) {
                        parentCompute(newVal);
                        if (syncChild) {
                            if (parentCompute() !== childCompute()) {
                                bindingsSemaphore[attrName] = (bindingsSemaphore[attrName] || 0) + 1;
                                childCompute(parentCompute());
                                Observation.afterUpdateAndNotify(function () {
                                    --bindingsSemaphore[attrName];
                                });
                            }
                        }
                    } else if (types.isMapLike(parentCompute)) {
                        parentCompute.attr(newVal, true);
                    }
                }
            };
            if (childCompute && childCompute.isComputed) {
                childCompute.bind('change', updateParent);
            }
            return updateParent;
        },
        parentToChild: function (el, parentCompute, childUpdate, bindingsSemaphore, attrName) {
            var updateChild = function (ev, newValue) {
                bindingsSemaphore[attrName] = (bindingsSemaphore[attrName] || 0) + 1;
                canBatch.start();
                childUpdate(newValue);
                Observation.afterUpdateAndNotify(function () {
                    --bindingsSemaphore[attrName];
                });
                canBatch.stop();
            };
            if (parentCompute && parentCompute.isComputed) {
                parentCompute.bind('change', updateChild);
            }
            return updateChild;
        }
    };
    var DOUBLE_CURLY_BRACE_REGEX = /\{\{/g;
    var getBindingInfo = function (node, attributeViewModelBindings, templateType, tagName) {
        var bindingInfo, attributeName = node.name, attributeValue = node.value || '';
        var matches = attributeName.match(bindingsRegExp);
        if (!matches) {
            var ignoreAttribute = ignoreAttributesRegExp.test(attributeName);
            var vmName = string.camelize(attributeName);
            if (ignoreAttribute && node.value.replace(DOUBLE_CURLY_BRACE_REGEX, '').indexOf('{') > -1) {
                dev.warn('can-component: looks like you\'re trying to pass ' + attributeName + ' as an attribute into a component, ' + 'but it is not a supported attribute');
            }
            if (ignoreAttribute || viewCallbacks.attr(attributeName)) {
                return;
            }
            var syntaxRight = attributeValue[0] === '{' && last(attributeValue) === '}';
            var isAttributeToChild = templateType === 'legacy' ? attributeViewModelBindings[vmName] : !syntaxRight;
            var scopeName = syntaxRight ? attributeValue.substr(1, attributeValue.length - 2) : attributeValue;
            if (isAttributeToChild) {
                return {
                    bindingAttributeName: attributeName,
                    parent: 'attribute',
                    parentName: attributeName,
                    child: 'viewModel',
                    childName: vmName,
                    parentToChild: true,
                    childToParent: true
                };
            } else {
                return {
                    bindingAttributeName: attributeName,
                    parent: 'scope',
                    parentName: scopeName,
                    child: 'viewModel',
                    childName: vmName,
                    parentToChild: true,
                    childToParent: true
                };
            }
        }
        var twoWay = !!matches[1], childToParent = twoWay || !!matches[2], parentToChild = twoWay || !childToParent;
        var childName = matches[3];
        var isDOM = childName.charAt(0) === '$';
        if (isDOM) {
            bindingInfo = {
                parent: 'scope',
                child: 'attribute',
                childToParent: childToParent,
                parentToChild: parentToChild,
                bindingAttributeName: attributeName,
                childName: childName.substr(1),
                parentName: attributeValue,
                initializeValues: true
            };
            if (tagName === 'select') {
                bindingInfo.stickyParentToChild = true;
            }
            return bindingInfo;
        } else {
            bindingInfo = {
                parent: 'scope',
                child: 'viewModel',
                childToParent: childToParent,
                parentToChild: parentToChild,
                bindingAttributeName: attributeName,
                childName: string.camelize(childName),
                parentName: attributeValue,
                initializeValues: true
            };
            if (attributeValue.trim().charAt(0) === '~') {
                bindingInfo.stickyParentToChild = true;
            }
            return bindingInfo;
        }
    };
    var bindingsRegExp = /\{(\()?(\^)?([^\}\)]+)\)?\}/, ignoreAttributesRegExp = /^(data-view-id|class|id|\[[\w\.-]+\]|#[\w\.-])$/i;
    var makeDataBinding = function (node, el, bindingData) {
        var bindingInfo = getBindingInfo(node, bindingData.attributeViewModelBindings, bindingData.templateType, el.nodeName.toLowerCase());
        if (!bindingInfo) {
            return;
        }
        bindingInfo.alreadyUpdatedChild = bindingData.alreadyUpdatedChild;
        if (bindingData.initializeValues) {
            bindingInfo.initializeValues = true;
        }
        var parentCompute = getComputeFrom[bindingInfo.parent](el, bindingData.scope, bindingInfo.parentName, bindingData, bindingInfo.parentToChild), childCompute = getComputeFrom[bindingInfo.child](el, bindingData.scope, bindingInfo.childName, bindingData, bindingInfo.childToParent, bindingInfo.stickyParentToChild && parentCompute), updateParent, updateChild, childLifecycle;
        if (bindingData.nodeList) {
            if (parentCompute && parentCompute.isComputed) {
                parentCompute.computeInstance.setPrimaryDepth(bindingData.nodeList.nesting + 1);
            }
            if (childCompute && childCompute.isComputed) {
                childCompute.computeInstance.setPrimaryDepth(bindingData.nodeList.nesting + 1);
            }
        }
        if (bindingInfo.parentToChild) {
            updateChild = bind.parentToChild(el, parentCompute, childCompute, bindingData.semaphore, bindingInfo.bindingAttributeName);
        }
        var completeBinding = function () {
            if (bindingInfo.childToParent) {
                updateParent = bind.childToParent(el, parentCompute, childCompute, bindingData.semaphore, bindingInfo.bindingAttributeName, bindingData.syncChildWithParent);
            } else if (bindingInfo.stickyParentToChild) {
                childCompute.bind('change', childLifecycle = function () {
                });
            }
            if (bindingInfo.initializeValues) {
                initializeValues(bindingInfo, childCompute, parentCompute, updateChild, updateParent);
            }
        };
        var onTeardown = function () {
            unbindUpdate(parentCompute, updateChild);
            unbindUpdate(childCompute, updateParent);
            unbindUpdate(childCompute, childLifecycle);
        };
        if (bindingInfo.child === 'viewModel') {
            return {
                value: bindingInfo.stickyParentToChild ? compute(getValue(parentCompute)) : getValue(parentCompute),
                onCompleteBinding: completeBinding,
                bindingInfo: bindingInfo,
                onTeardown: onTeardown
            };
        } else {
            completeBinding();
            return {
                bindingInfo: bindingInfo,
                onTeardown: onTeardown
            };
        }
    };
    var initializeValues = function (bindingInfo, childCompute, parentCompute, updateChild, updateParent) {
        var doUpdateParent = false;
        if (bindingInfo.parentToChild && !bindingInfo.childToParent) {
        } else if (!bindingInfo.parentToChild && bindingInfo.childToParent) {
            doUpdateParent = true;
        } else if (getValue(childCompute) === undefined) {
        } else if (getValue(parentCompute) === undefined) {
            doUpdateParent = true;
        }
        if (doUpdateParent) {
            updateParent({}, getValue(childCompute));
        } else {
            if (!bindingInfo.alreadyUpdatedChild) {
                updateChild({}, getValue(parentCompute));
            }
        }
    };
    if (!getMutationObserver()) {
        var updateSelectValue = function (el) {
            var bindingCallback = domData.get.call(el, 'canBindingCallback');
            if (bindingCallback) {
                bindingCallback.onMutation(el);
            }
        };
        live.registerChildMutationCallback('select', updateSelectValue);
        live.registerChildMutationCallback('optgroup', function (el) {
            updateSelectValue(el.parentNode);
        });
    }
    var isContentEditable = function () {
            var values = {
                '': true,
                'true': true,
                'false': false
            };
            var editable = function (el) {
                if (!el || !el.getAttribute) {
                    return;
                }
                var attr = el.getAttribute('contenteditable');
                return values[attr];
            };
            return function (el) {
                var val = editable(el);
                if (typeof val === 'boolean') {
                    return val;
                } else {
                    return !!editable(el.parentNode);
                }
            };
        }(), removeBrackets = function (value, open, close) {
            open = open || '{';
            close = close || '}';
            if (value[0] === open && value[value.length - 1] === close) {
                return value.substr(1, value.length - 2);
            }
            return value;
        }, getValue = function (value) {
            return value && value.isComputed ? value() : value;
        }, unbindUpdate = function (compute, updateOther) {
            if (compute && compute.isComputed && typeof updateOther === 'function') {
                compute.unbind('change', updateOther);
            }
        }, cleanVMName = function (name) {
            return name.replace(/@/g, '');
        };
    var special = {
        enter: function (data, el, original) {
            return {
                event: 'keyup',
                handler: function (ev) {
                    if (ev.keyCode === 13 || ev.key === 'Enter') {
                        return original.call(this, ev);
                    }
                }
            };
        }
    };
    module.exports = {
        behaviors: behaviors,
        getBindingInfo: getBindingInfo,
        special: special
    };
});
/*can-util@3.2.2#dom/events/inserted/inserted*/
define('can-util/dom/events/inserted/inserted', function (require, exports, module) {
    var makeMutationEvent = require('can-util/dom/events/make-mutation-event/make-mutation-event');
    makeMutationEvent('inserted', 'addedNodes');
});
/*can-component@3.0.5#can-component*/
define('can-component', function (require, exports, module) {
    var ComponentControl = require('can-component/control/control');
    var namespace = require('can-namespace');
    var Construct = require('can-construct');
    var stacheBindings = require('can-stache-bindings');
    var Scope = require('can-view-scope');
    var viewCallbacks = require('can-view-callbacks');
    var nodeLists = require('can-view-nodelist');
    var domData = require('can-util/dom/data/data');
    var domMutate = require('can-util/dom/mutate/mutate');
    var getChildNodes = require('can-util/dom/child-nodes/child-nodes');
    var domDispatch = require('can-util/dom/dispatch/dispatch');
    var types = require('can-types');
    var string = require('can-util/js/string/string');
    var canEach = require('can-util/js/each/each');
    var isFunction = require('can-util/js/is-function/is-function');
    require('can-util/dom/events/inserted/inserted');
    require('can-util/dom/events/removed/removed');
    require('can-view-model');
    var Component = Construct.extend({
        setup: function () {
            Construct.setup.apply(this, arguments);
            if (Component) {
                var self = this;
                this.Control = ComponentControl.extend(this.prototype.events);
                var protoViewModel = this.prototype.viewModel || this.prototype.scope;
                if (protoViewModel && this.prototype.ViewModel) {
                    throw new Error('Cannot provide both a ViewModel and a viewModel property');
                }
                var vmName = string.capitalize(string.camelize(this.prototype.tag)) + 'VM';
                if (this.prototype.ViewModel) {
                    if (typeof this.prototype.ViewModel === 'function') {
                        this.ViewModel = this.prototype.ViewModel;
                    } else {
                        this.ViewModel = types.DefaultMap.extend(vmName, this.prototype.ViewModel);
                    }
                } else {
                    if (protoViewModel) {
                        if (typeof protoViewModel === 'function') {
                            if (types.isMapLike(protoViewModel.prototype)) {
                                this.ViewModel = protoViewModel;
                            } else {
                                this.viewModelHandler = protoViewModel;
                            }
                        } else {
                            if (types.isMapLike(protoViewModel)) {
                                console.warn('can-component: ' + this.prototype.tag + ' is sharing a single map across all component instances');
                                this.viewModelInstance = protoViewModel;
                            } else {
                                this.ViewModel = types.DefaultMap.extend(vmName, protoViewModel);
                            }
                        }
                    } else {
                        this.ViewModel = types.DefaultMap.extend(vmName, {});
                    }
                }
                if (this.prototype.template) {
                    console.warn('can-component.prototype.template: is deprecated and will be removed in a future release. Use can-component.prototype.view');
                    this.renderer = this.prototype.template;
                }
                if (this.prototype.view) {
                    this.renderer = this.prototype.view;
                }
                viewCallbacks.tag(this.prototype.tag, function (el, options) {
                    new self(el, options);
                });
            }
        }
    }, {
        setup: function (el, componentTagData) {
            var component = this;
            var lexicalContent = (typeof this.leakScope === 'undefined' ? true : !this.leakScope) && !!(this.template || this.view);
            var teardownFunctions = [];
            var initialViewModelData = {};
            var callTeardownFunctions = function () {
                for (var i = 0, len = teardownFunctions.length; i < len; i++) {
                    teardownFunctions[i]();
                }
            };
            var setupBindings = !domData.get.call(el, 'preventDataBindings');
            var viewModel, frag;
            var teardownBindings;
            if (setupBindings) {
                var setupFn = componentTagData.setupBindings || function (el, callback, data) {
                    return stacheBindings.behaviors.viewModel(el, componentTagData, callback, data);
                };
                teardownBindings = setupFn(el, function (initialViewModelData) {
                    var ViewModel = component.constructor.ViewModel, viewModelHandler = component.constructor.viewModelHandler, viewModelInstance = component.constructor.viewModelInstance;
                    if (viewModelHandler) {
                        var scopeResult = viewModelHandler.call(component, initialViewModelData, componentTagData.scope, el);
                        if (types.isMapLike(scopeResult)) {
                            viewModelInstance = scopeResult;
                        } else if (types.isMapLike(scopeResult.prototype)) {
                            ViewModel = scopeResult;
                        } else {
                            ViewModel = types.DefaultMap.extend(scopeResult);
                        }
                    }
                    if (ViewModel) {
                        viewModelInstance = new component.constructor.ViewModel(initialViewModelData);
                    }
                    viewModel = viewModelInstance;
                    return viewModelInstance;
                }, initialViewModelData);
            }
            this.viewModel = viewModel;
            domData.set.call(el, 'viewModel', viewModel);
            domData.set.call(el, 'preventDataBindings', true);
            var shadowScope;
            if (lexicalContent) {
                shadowScope = Scope.refsScope().add(this.viewModel, { viewModel: true });
            } else {
                shadowScope = (this.constructor.renderer ? componentTagData.scope.add(new Scope.Refs()) : componentTagData.scope).add(this.viewModel, { viewModel: true });
            }
            var options = { helpers: {} }, addHelper = function (name, fn) {
                    options.helpers[name] = function () {
                        return fn.apply(viewModel, arguments);
                    };
                };
            canEach(this.helpers || {}, function (val, prop) {
                if (isFunction(val)) {
                    addHelper(prop, val);
                }
            });
            this._control = new this.constructor.Control(el, {
                scope: this.viewModel,
                viewModel: this.viewModel,
                destroy: callTeardownFunctions
            });
            var nodeList = nodeLists.register([], function () {
                domDispatch.call(el, 'beforeremove', [], false);
                if (teardownBindings) {
                    teardownBindings();
                }
            }, componentTagData.parentNodeList || true, false);
            nodeList.expression = '<' + this.tag + '>';
            teardownFunctions.push(function () {
                nodeLists.unregister(nodeList);
            });
            if (this.constructor.renderer) {
                if (!options.tags) {
                    options.tags = {};
                }
                options.tags.content = function contentHookup(el, contentTagData) {
                    var subtemplate = componentTagData.subtemplate || contentTagData.subtemplate, renderingLightContent = subtemplate === componentTagData.subtemplate;
                    if (subtemplate) {
                        delete options.tags.content;
                        var lightTemplateData;
                        if (renderingLightContent) {
                            if (lexicalContent) {
                                lightTemplateData = componentTagData;
                            } else {
                                lightTemplateData = {
                                    scope: contentTagData.scope.cloneFromRef(),
                                    options: contentTagData.options
                                };
                            }
                        } else {
                            lightTemplateData = contentTagData;
                        }
                        if (contentTagData.parentNodeList) {
                            var frag = subtemplate(lightTemplateData.scope, lightTemplateData.options, contentTagData.parentNodeList);
                            nodeLists.replace([el], frag);
                        } else {
                            nodeLists.replace([el], subtemplate(lightTemplateData.scope, lightTemplateData.options));
                        }
                        options.tags.content = contentHookup;
                    }
                };
                frag = this.constructor.renderer(shadowScope, componentTagData.options.add(options), nodeList);
            } else {
                frag = componentTagData.subtemplate ? componentTagData.subtemplate(shadowScope, componentTagData.options.add(options), nodeList) : document.createDocumentFragment();
            }
            domMutate.appendChild.call(el, frag);
            nodeLists.update(nodeList, getChildNodes(el));
        }
    });
    viewCallbacks.tag('content', function (el, tagData) {
        return tagData.scope;
    });
    module.exports = namespace.Component = Component;
});
/*can-connect@1.2.0#connect*/
define('can-connect/connect', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var connect = function (behaviors, options) {
        behaviors = behaviors.map(function (behavior, index) {
            var sortedIndex = -1;
            if (typeof behavior === 'string') {
                sortedIndex = connect.order.indexOf(behavior);
                behavior = behaviorsMap[behavior];
            } else if (behavior.isBehavior) {
                sortedIndex = connect.order.indexOf(behavior.behaviorName);
            } else {
                behavior = connect.behavior(behavior);
            }
            return {
                originalIndex: index,
                sortedIndex: sortedIndex,
                behavior: behavior
            };
        }).sort(function (b1, b2) {
            if (~b1.sortedIndex && ~b2.sortedIndex) {
                return b1.sortedIndex - b2.sortedIndex;
            }
            return b1.originalIndex - b2.originalIndex;
        });
        behaviors = behaviors.map(function (b) {
            return b.behavior;
        });
        var behavior = connect.base(connect.behavior('options', function () {
            return options;
        })());
        behaviors.forEach(function (behave) {
            behavior = behave(behavior);
        });
        if (behavior.init) {
            behavior.init();
        }
        return behavior;
    };
    connect.order = [
        'data/localstorage-cache',
        'data/url',
        'data/parse',
        'cache-requests',
        'data/combine-requests',
        'constructor',
        'constructor/store',
        'can/map',
        'can/ref',
        'fall-through-cache',
        'data/worker',
        'real-time',
        'data/callbacks-cache',
        'data/callbacks',
        'constructor/callbacks-once'
    ];
    connect.behavior = function (name, behavior) {
        if (typeof name !== 'string') {
            behavior = name;
            name = undefined;
        }
        var behaviorMixin = function (base) {
            var Behavior = function () {
            };
            Behavior.name = name;
            Behavior.prototype = base;
            var newBehavior = new Behavior();
            var res = typeof behavior === 'function' ? behavior.apply(newBehavior, arguments) : behavior;
            assign(newBehavior, res);
            newBehavior.__behaviorName = name;
            return newBehavior;
        };
        if (name) {
            behaviorMixin.behaviorName = name;
            behaviorsMap[name] = behaviorMixin;
        }
        behaviorMixin.isBehavior = true;
        return behaviorMixin;
    };
    var behaviorsMap = {};
    module.exports = connect;
});
/*can-connect@1.2.0#base/base*/
define('can-connect/base/base', function (require, exports, module) {
    var connect = require('can-connect/connect');
    module.exports = connect.behavior('base', function (baseConnection) {
        return {
            id: function (instance) {
                var ids = [], algebra = this.algebra;
                if (algebra && algebra.clauses && algebra.clauses.id) {
                    for (var prop in algebra.clauses.id) {
                        ids.push(instance[prop]);
                    }
                }
                if (this.idProp && !ids.length) {
                    ids.push(instance[this.idProp]);
                }
                if (!ids.length) {
                    ids.push(instance.id);
                }
                return ids.length > 1 ? ids.join('@|@') : ids[0];
            },
            idProp: baseConnection.idProp || 'id',
            listSet: function (list) {
                return list[this.listSetProp];
            },
            listSetProp: '__listSet',
            init: function () {
            }
        };
    });
});
/*can-connect@1.2.0#can-connect*/
define('can-connect', function (require, exports, module) {
    var connect = require('can-connect/connect');
    var base = require('can-connect/base/base');
    var ns = require('can-namespace');
    connect.base = base;
    module.exports = ns.connect = connect;
});
/*can-connect@1.2.0#helpers/get-items*/
define('can-connect/helpers/get-items', function (require, exports, module) {
    var isArray = require('can-util/js/is-array/is-array');
    module.exports = function (data) {
        if (isArray(data)) {
            return data;
        } else {
            return data.data;
        }
    };
});
/*can-set@1.0.3#src/helpers*/
define('can-set/src/helpers', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var last = require('can-util/js/last/last');
    var IgnoreType = function () {
    };
    var helpers;
    module.exports = helpers = {
        eachInUnique: function (a, acb, b, bcb, defaultReturn) {
            var bCopy = assign({}, b), res;
            for (var prop in a) {
                res = acb(a[prop], b[prop], a, b, prop);
                if (res !== undefined) {
                    return res;
                }
                delete bCopy[prop];
            }
            for (prop in bCopy) {
                res = bcb(undefined, b[prop], a, b, prop);
                if (res !== undefined) {
                    return res;
                }
            }
            return defaultReturn;
        },
        doubleLoop: function (arr, callbacks) {
            if (typeof callbacks === 'function') {
                callbacks = { iterate: callbacks };
            }
            var i = 0;
            while (i < arr.length) {
                if (callbacks.start) {
                    callbacks.start(arr[i]);
                }
                var j = i + 1;
                while (j < arr.length) {
                    if (callbacks.iterate(arr[j], j, arr[i], i) === false) {
                        arr.splice(j, 1);
                    } else {
                        j++;
                    }
                }
                if (callbacks.end) {
                    callbacks.end(arr[i]);
                }
                i++;
            }
        },
        identityMap: function (arr) {
            var map = {};
            each(arr, function (value) {
                map[value] = 1;
            });
            return map;
        },
        arrayUnionIntersectionDifference: function (arr1, arr2) {
            var map = {};
            var intersection = [];
            var union = [];
            var difference = arr1.slice(0);
            each(arr1, function (value) {
                map[value] = true;
                union.push(value);
            });
            each(arr2, function (value) {
                if (map[value]) {
                    intersection.push(value);
                    var index = helpers.indexOf.call(difference, value);
                    if (index !== -1) {
                        difference.splice(index, 1);
                    }
                } else {
                    union.push(value);
                }
            });
            return {
                intersection: intersection,
                union: union,
                difference: difference
            };
        },
        arraySame: function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                return false;
            }
            var map = helpers.identityMap(arr1);
            for (var i = 0; i < arr2.length; i++) {
                var val = map[arr2[i]];
                if (!val) {
                    return false;
                } else if (val > 1) {
                    return false;
                } else {
                    map[arr2[i]]++;
                }
            }
            return true;
        },
        indexOf: Array.prototype.indexOf || function (item) {
            for (var i = 0, thisLen = this.length; i < thisLen; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        },
        map: Array.prototype.map || function (cb) {
            var out = [];
            for (var i = 0, len = this.length; i < len; i++) {
                out.push(cb(this[i], i, this));
            }
            return out;
        },
        filter: Array.prototype.filter || function (cb) {
            var out = [];
            for (var i = 0, len = this.length; i < len; i++) {
                if (cb(this[i], i, this)) {
                    out.push(this[i]);
                }
            }
            return out;
        },
        ignoreType: new IgnoreType(),
        firstProp: function (set) {
            for (var prop in set) {
                return prop;
            }
        },
        index: function (compare, items, props) {
            if (!items || !items.length) {
                return undefined;
            }
            if (compare(props, items[0]) === -1) {
                return 0;
            } else if (compare(props, last(items)) === 1) {
                return items.length;
            }
            var low = 0, high = items.length;
            while (low < high) {
                var mid = low + high >>> 1, item = items[mid], computed = compare(props, item);
                if (computed === -1) {
                    high = mid;
                } else {
                    low = mid + 1;
                }
            }
            return high;
        },
        defaultSort: function (sortPropValue, item1, item2) {
            var parts = sortPropValue.split(' ');
            var sortProp = parts[0];
            var item1Value = item1[sortProp];
            var item2Value = item2[sortProp];
            var temp;
            var desc = parts[1] || '';
            desc = desc.toLowerCase() === 'desc';
            if (desc) {
                temp = item1Value;
                item1Value = item2Value;
                item2Value = temp;
            }
            if (item1Value < item2Value) {
                return -1;
            }
            if (item1Value > item2Value) {
                return 1;
            }
            return 0;
        }
    };
});
/*can-set@1.0.3#src/clause*/
define('can-set/src/clause', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var clause = {};
    module.exports = clause;
    clause.TYPES = [
        'where',
        'order',
        'paginate',
        'id'
    ];
    each(clause.TYPES, function (type) {
        var className = type.charAt(0).toUpperCase() + type.substr(1);
        clause[className] = function (compare) {
            assign(this, compare);
        };
        clause[className].type = type;
    });
});
/*can-set@1.0.3#src/compare*/
define('can-set/src/compare', function (require, exports, module) {
    var h = require('can-set/src/helpers');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var makeArray = require('can-util/js/make-array/make-array');
    var compareHelpers;
    var loop = function (a, b, aParent, bParent, prop, compares, options) {
        var checks = options.checks;
        for (var i = 0; i < checks.length; i++) {
            var res = checks[i](a, b, aParent, bParent, prop, compares || {}, options);
            if (res !== undefined) {
                return res;
            }
        }
        return options['default'];
    };
    var addIntersectedPropertyToResult = function (a, b, aParent, bParent, prop, compares, options) {
        var subsetCheck;
        if (!(prop in aParent)) {
            subsetCheck = 'subsetB';
        } else if (prop in bParent) {
            return false;
        }
        if (!(prop in bParent)) {
            subsetCheck = 'subsetA';
        }
        if (subsetCheck === 'subsetB') {
            options.result[prop] = b;
        } else {
            options.result[prop] = a;
        }
        return undefined;
    };
    var addToResult = function (fn, name) {
        return function (a, b, aParent, bParent, prop, compares, options) {
            var res = fn.apply(this, arguments);
            if (res === true) {
                if (prop !== undefined && !(prop in options.result)) {
                    options.result[prop] = a;
                }
                return true;
            } else {
                return res;
            }
        };
    };
    module.exports = compareHelpers = {
        equal: function (a, b, aParent, bParent, prop, compares, options) {
            options.checks = [
                compareHelpers.equalComparesType,
                compareHelpers.equalBasicTypes,
                compareHelpers.equalArrayLike,
                compareHelpers.equalObject
            ];
            options['default'] = false;
            return loop(a, b, aParent, bParent, prop, compares, options);
        },
        equalComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    return compareResult;
                } else if (compareResult && typeof compareResult === 'object') {
                    if ('intersection' in compareResult && !('difference' in compareResult)) {
                        var reverseResult = compares(b, a, bParent, aParent, prop, options);
                        return 'intersection' in reverseResult && !('difference' in reverseResult);
                    }
                    return false;
                }
                return compareResult;
            }
        },
        equalBasicTypes: function (a, b, aParent, bParent, prop, compares, options) {
            if (a === null || b === null) {
                return a === b;
            }
            if (a instanceof Date || b instanceof Date) {
                return a === b;
            }
            if (options.deep === -1) {
                return typeof a === 'object' || a === b;
            }
            if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
                return false;
            }
            if (a === b) {
                return true;
            }
        },
        equalArrayLike: function (a, b, aParent, bParent, prop, compares, options) {
            if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length !== b.length) {
                    return false;
                }
                for (var i = 0; i < a.length; i++) {
                    var compare = compares[i] === undefined ? compares['*'] : compares[i];
                    if (!loop(a[i], b[i], a, b, i, compare, options)) {
                        return false;
                    }
                }
                return true;
            }
        },
        equalObject: function (a, b, aParent, bParent, parentProp, compares, options) {
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                var bCopy = assign({}, b);
                if (options.deep === false) {
                    options.deep = -1;
                }
                for (var prop in a) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    if (!loop(a[prop], b[prop], a, b, prop, compare, options)) {
                        return false;
                    }
                    delete bCopy[prop];
                }
                for (prop in bCopy) {
                    if (compares[prop] === undefined || !loop(undefined, b[prop], a, b, prop, compares[prop], options)) {
                        return false;
                    }
                }
                return true;
            }
        },
        subset: function (a, b, aParent, bParent, prop, compares, options) {
            options.checks = [
                compareHelpers.subsetComparesType,
                compareHelpers.equalBasicTypes,
                compareHelpers.equalArrayLike,
                compareHelpers.subsetObject
            ];
            options.getSubsets = [];
            options['default'] = false;
            return loop(a, b, aParent, bParent, prop, compares, options);
        },
        subsetObject: function (a, b, aParent, bParent, parentProp, compares, options) {
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                return h.eachInUnique(a, function (a, b, aParent, bParent, prop) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    if (!loop(a, b, aParent, bParent, prop, compare, options) && prop in bParent) {
                        return false;
                    }
                }, b, function (a, b, aParent, bParent, prop) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    if (!loop(a, b, aParent, bParent, prop, compare, options)) {
                        return false;
                    }
                }, true);
            }
        },
        subsetComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    return compareResult;
                } else if (compareResult && typeof compareResult === 'object') {
                    if (compareResult.getSubset) {
                        if (h.indexOf.call(options.getSubsets, compareResult.getSubset) === -1) {
                            options.getSubsets.push(compareResult.getSubset);
                        }
                    }
                    if (compareResult.intersection === h.ignoreType || compareResult.difference === h.ignoreType) {
                        return true;
                    }
                    if ('intersection' in compareResult && !('difference' in compareResult)) {
                        var reverseResult = compares(b, a, bParent, aParent, prop, options);
                        return 'intersection' in reverseResult;
                    }
                    return false;
                }
                return compareResult;
            }
        },
        properSupersetObject: function (a, b, aParent, bParent, parentProp, compares, options) {
            var bType = typeof b;
            var hasAdditionalProp = false;
            if (bType === 'object' || bType === 'function') {
                var aCopy = assign({}, a);
                if (options.deep === false) {
                    options.deep = -1;
                }
                for (var prop in b) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    var compareResult = loop(a[prop], b[prop], a, b, prop, compare, options);
                    if (compareResult === h.ignoreType) {
                    } else if (!(prop in a) || options.performedDifference) {
                        hasAdditionalProp = true;
                    } else if (!compareResult) {
                        return false;
                    }
                    delete aCopy[prop];
                }
                for (prop in aCopy) {
                    if (compares[prop] === undefined || !loop(a[prop], undefined, a, b, prop, compares[prop], options)) {
                        return false;
                    }
                }
                return hasAdditionalProp;
            }
        },
        properSubsetComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    return compareResult;
                } else if (compareResult && typeof compareResult === 'object') {
                    if ('intersection' in compareResult && !('difference' in compareResult)) {
                        var reverseResult = compares(b, a, bParent, aParent, prop, options);
                        return 'intersection' in reverseResult && 'difference' in reverseResult;
                    }
                    return false;
                }
                return compareResult;
            }
        },
        difference: function (a, b, aParent, bParent, prop, compares, options) {
            options.result = {};
            options.performedDifference = 0;
            options.checks = [
                compareHelpers.differenceComparesType,
                addToResult(compareHelpers.equalBasicTypes, 'equalBasicTypes'),
                addToResult(compareHelpers.equalArrayLike, 'equalArrayLike'),
                addToResult(compareHelpers.properSupersetObject, 'properSubsetObject')
            ];
            options['default'] = true;
            var res = loop(a, b, aParent, bParent, prop, compares, options);
            if (res === true && options.performedDifference) {
                return options.result;
            }
            return res;
        },
        differenceComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    if (compareResult === true) {
                        options.result[prop] = a;
                        return true;
                    } else {
                        return compareResult;
                    }
                } else if (compareResult && typeof compareResult === 'object') {
                    if ('difference' in compareResult) {
                        if (compareResult.difference === h.ignoreType) {
                            return h.ignoreType;
                        } else if (compareResult.difference != null) {
                            options.result[prop] = compareResult.difference;
                            options.performedDifference++;
                            return true;
                        } else {
                            return true;
                        }
                    } else {
                        if (compareHelpers.equalComparesType.apply(this, arguments)) {
                            options.performedDifference++;
                            options.result[prop] = compareResult.union;
                        } else {
                            return false;
                        }
                    }
                }
            }
        },
        union: function (a, b, aParent, bParent, prop, compares, options) {
            options.result = {};
            options.performedUnion = 0;
            options.checks = [
                compareHelpers.unionComparesType,
                addToResult(compareHelpers.equalBasicTypes, 'equalBasicTypes'),
                addToResult(compareHelpers.unionArrayLike, 'unionArrayLike'),
                addToResult(compareHelpers.unionObject, 'unionObject')
            ];
            options.getUnions = [];
            options['default'] = false;
            var res = loop(a, b, aParent, bParent, prop, compares, options);
            if (res === true) {
                return options.result;
            }
            return false;
        },
        unionComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    if (compareResult === true) {
                        options.result[prop] = a;
                        return true;
                    } else {
                        return compareResult;
                    }
                } else if (compareResult && typeof compareResult === 'object') {
                    if (compareResult.getUnion) {
                        if (h.indexOf.call(options.getUnions, compareResult.getUnion) === -1) {
                            options.getUnions.push(compareResult.getUnion);
                        }
                    }
                    if ('union' in compareResult) {
                        if (compareResult.union === h.ignoreType) {
                            return compareResult.union;
                        }
                        if (compareResult.union !== undefined) {
                            options.result[prop] = compareResult.union;
                        }
                        options.performedUnion++;
                        return true;
                    }
                }
            }
        },
        unionObject: function (a, b, aParent, bParent, prop, compares, options) {
            var subsetCompare = function (a, b, aParent, bParent, prop) {
                var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                if (!loop(a, b, aParent, bParent, prop, compare, options)) {
                    var subsetCheck;
                    if (!(prop in aParent)) {
                        subsetCheck = 'subsetB';
                    }
                    if (!(prop in bParent)) {
                        subsetCheck = 'subsetA';
                    }
                    if (subsetCheck) {
                        if (!options.subset) {
                            options.subset = subsetCheck;
                        }
                        return options.subset === subsetCheck ? undefined : false;
                    }
                    return false;
                }
            };
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                return h.eachInUnique(a, subsetCompare, b, subsetCompare, true);
            }
        },
        unionArrayLike: function (a, b, aParent, bParent, prop, compares, options) {
            if (Array.isArray(a) && Array.isArray(b)) {
                var combined = makeArray(a).concat(makeArray(b));
                h.doubleLoop(combined, function (item, j, cur, i) {
                    var res = !compareHelpers.equal(cur, item, aParent, bParent, undefined, compares['*'], { 'default': false });
                    return res;
                });
                options.result[prop] = combined;
                return true;
            }
        },
        count: function (a, b, aParent, bParent, prop, compares, options) {
            options.checks = [
                compareHelpers.countComparesType,
                compareHelpers.equalBasicTypes,
                compareHelpers.equalArrayLike,
                compareHelpers.loopObject
            ];
            options['default'] = false;
            loop(a, b, aParent, bParent, prop, compares, options);
            if (typeof options.count === 'number') {
                return options.count;
            }
            return Infinity;
        },
        countComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    return true;
                } else if (compareResult && typeof compareResult === 'object') {
                    if (typeof compareResult.count === 'number') {
                        if (!('count' in options) || compareResult.count === options.count) {
                            options.count = compareResult.count;
                        } else {
                            options.count = Infinity;
                        }
                    }
                    return true;
                }
            }
        },
        loopObject: function (a, b, aParent, bParent, prop, compares, options) {
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                each(a, function (aValue, prop) {
                    var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                    loop(aValue, b[prop], a, b, prop, compare, options);
                });
                return true;
            }
        },
        intersection: function (a, b, aParent, bParent, prop, compares, options) {
            options.result = {};
            options.performedIntersection = 0;
            options.checks = [
                compareHelpers.intersectionComparesType,
                addToResult(compareHelpers.equalBasicTypes, 'equalBasicTypes'),
                addToResult(compareHelpers.intersectionArrayLike, 'intersectionArrayLike'),
                compareHelpers.intersectionObject
            ];
            options['default'] = false;
            var res = loop(a, b, aParent, bParent, prop, compares, options);
            if (res === true) {
                return options.result;
            }
            return false;
        },
        intersectionComparesType: function (a, b, aParent, bParent, prop, compares, options) {
            if (typeof compares === 'function') {
                var compareResult = compares(a, b, aParent, bParent, prop, options);
                if (typeof compareResult === 'boolean') {
                    if (compareResult === true) {
                        options.result[prop] = a;
                        return true;
                    } else {
                        return compareResult;
                    }
                } else if (compareResult && typeof compareResult === 'object') {
                    if ('intersection' in compareResult) {
                        if (compareResult.intersection !== undefined) {
                            options.result[prop] = compareResult.intersection;
                        }
                        options.performedIntersection++;
                        return true;
                    }
                }
            }
        },
        intersectionObject: function (a, b, aParent, bParent, prop, compares, options) {
            var subsetCompare = function (a, b, aParent, bParent, prop) {
                var compare = compares[prop] === undefined ? compares['*'] : compares[prop];
                if (!loop(a, b, aParent, bParent, prop, compare, options)) {
                    return addIntersectedPropertyToResult(a, b, aParent, bParent, prop, compares, options);
                }
            };
            var aType = typeof a;
            if (aType === 'object' || aType === 'function') {
                return h.eachInUnique(a, subsetCompare, b, subsetCompare, true);
            }
        },
        intersectionArrayLike: function (a, b, aParent, bParent, prop, compares, options) {
            if (Array.isArray(a) && Array.isArray(b)) {
                var intersection = [];
                each(makeArray(a), function (cur) {
                    for (var i = 0; i < b.length; i++) {
                        if (compareHelpers.equal(cur, b[i], aParent, bParent, undefined, compares['*'], { 'default': false })) {
                            intersection.push(cur);
                            break;
                        }
                    }
                });
                options.result[prop] = intersection;
                return true;
            }
        }
    };
});
/*can-set@1.0.3#src/get*/
define('can-set/src/get', function (require, exports, module) {
    var compare = require('can-set/src/compare');
    var h = require('can-set/src/helpers');
    var each = require('can-util/js/each/each');
    var filterData = function (data, clause, props) {
        return h.filter.call(data, function (item) {
            var isSubset = compare.subset(item, clause, undefined, undefined, undefined, props, {});
            return isSubset;
        });
    };
    module.exports = {
        subsetData: function (a, b, bData, algebra) {
            var aClauseProps = algebra.getClauseProperties(a);
            var bClauseProps = algebra.getClauseProperties(b);
            var options = {};
            var aData = filterData(bData, aClauseProps.where, algebra.clauses.where);
            if (aData.length && (aClauseProps.enabled.order || bClauseProps.enabled.order)) {
                options = {};
                var propName = h.firstProp(aClauseProps.order), compareOrder = algebra.clauses.order[propName];
                aData = aData.sort(function (aItem, bItem) {
                    return compareOrder(a[propName], aItem, bItem);
                });
            }
            if (aData.length && (aClauseProps.enabled.paginate || bClauseProps.enabled.paginate)) {
                options = {};
                compare.subset(aClauseProps.paginate, bClauseProps.paginate, undefined, undefined, undefined, algebra.clauses.paginate, options);
                each(options.getSubsets, function (filter) {
                    aData = filter(a, b, aData, algebra, options);
                });
            }
            return aData;
        }
    };
});
/*can-set@1.0.3#src/set-core*/
define('can-set/src/set-core', function (require, exports, module) {
    var h = require('can-set/src/helpers');
    var clause = require('can-set/src/clause');
    var compare = require('can-set/src/compare');
    var get = require('can-set/src/get');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var makeArray = require('can-util/js/make-array/make-array');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    function Translate(clause, options) {
        if (typeof options === 'string') {
            var path = options;
            options = {
                fromSet: function (set, setRemainder) {
                    return set[path] || {};
                },
                toSet: function (set, wheres) {
                    set[path] = wheres;
                    return set;
                }
            };
        }
        this.clause = clause;
        assign(this, options);
    }
    var Algebra = function () {
        var clauses = this.clauses = {
            where: {},
            order: {},
            paginate: {},
            id: {}
        };
        this.translators = {
            where: new Translate('where', {
                fromSet: function (set, setRemainder) {
                    return setRemainder;
                },
                toSet: function (set, wheres) {
                    return assign(set, wheres);
                }
            })
        };
        var self = this;
        each(arguments, function (arg) {
            if (arg) {
                if (arg instanceof Translate) {
                    self.translators[arg.clause] = arg;
                } else {
                    assign(clauses[arg.constructor.type || 'where'], arg);
                }
            }
        });
    };
    Algebra.make = function (compare, count) {
        if (compare instanceof Algebra) {
            return compare;
        } else {
            return new Algebra(compare, count);
        }
    };
    assign(Algebra.prototype, {
        getClauseProperties: function (set, options) {
            options = options || {};
            var setClone = assign({}, set);
            var clauses = this.clauses;
            var checkClauses = [
                'order',
                'paginate',
                'id'
            ];
            var clauseProps = {
                enabled: {
                    where: true,
                    order: false,
                    paginate: false,
                    id: false
                }
            };
            if (options.omitClauses) {
                checkClauses = h.arrayUnionIntersectionDifference(checkClauses, options.omitClauses).difference;
            }
            each(checkClauses, function (clauseName) {
                var valuesForClause = {};
                var prop;
                for (prop in clauses[clauseName]) {
                    if (prop in setClone) {
                        valuesForClause[prop] = setClone[prop];
                        delete setClone[prop];
                    }
                }
                clauseProps[clauseName] = valuesForClause;
                clauseProps.enabled[clauseName] = !isEmptyObject(valuesForClause);
            });
            clauseProps.where = options.isProperties ? setClone : this.translators.where.fromSet(set, setClone);
            return clauseProps;
        },
        getDifferentClauseTypes: function (aClauses, bClauses) {
            var self = this;
            var differentTypes = [];
            each(clause.TYPES, function (type) {
                if (!self.evaluateOperator(compare.equal, aClauses[type], bClauses[type], { isProperties: true }, { isProperties: true })) {
                    differentTypes.push(type);
                }
            });
            return differentTypes;
        },
        updateSet: function (set, clause, result, useSet) {
            if (result && typeof result === 'object' && useSet !== false) {
                if (this.translators[clause]) {
                    set = this.translators.where.toSet(set, result);
                } else {
                    set = assign(set, result);
                }
                return true;
            } else if (result) {
                return useSet === undefined ? undefined : false;
            } else {
                return false;
            }
        },
        evaluateOperator: function (operator, a, b, aOptions, bOptions, evaluateOptions) {
            aOptions = aOptions || {};
            bOptions = bOptions || {};
            evaluateOptions = assign({
                evaluateWhere: operator,
                evaluatePaginate: operator,
                evaluateOrder: operator,
                shouldEvaluatePaginate: function (aClauseProps, bClauseProps) {
                    return aClauseProps.enabled.paginate || bClauseProps.enabled.paginate;
                },
                shouldEvaluateOrder: function (aClauseProps, bClauseProps) {
                    return aClauseProps.enabled.order && compare.equal(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {});
                }
            }, evaluateOptions || {});
            var aClauseProps = this.getClauseProperties(a, aOptions), bClauseProps = this.getClauseProperties(b, bOptions), set = {}, useSet;
            var result = evaluateOptions.evaluateWhere(aClauseProps.where, bClauseProps.where, undefined, undefined, undefined, this.clauses.where, {});
            useSet = this.updateSet(set, 'where', result, useSet);
            if (result && evaluateOptions.shouldEvaluatePaginate(aClauseProps, bClauseProps)) {
                if (evaluateOptions.shouldEvaluateOrder(aClauseProps, bClauseProps)) {
                    result = evaluateOptions.evaluateOrder(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {});
                    useSet = this.updateSet(set, 'order', result, useSet);
                }
                if (result) {
                    result = evaluateOptions.evaluatePaginate(aClauseProps.paginate, bClauseProps.paginate, undefined, undefined, undefined, this.clauses.paginate, {});
                    useSet = this.updateSet(set, 'paginate', result, useSet);
                }
            } else if (result && evaluateOptions.shouldEvaluateOrder(aClauseProps, bClauseProps)) {
                result = operator(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {});
                useSet = this.updateSet(set, 'order', result, useSet);
            }
            return result && useSet ? set : result;
        },
        equal: function (a, b) {
            return this.evaluateOperator(compare.equal, a, b);
        },
        subset: function (a, b) {
            var aClauseProps = this.getClauseProperties(a);
            var bClauseProps = this.getClauseProperties(b);
            var compatibleSort = true;
            var result;
            if (bClauseProps.enabled.paginate && (aClauseProps.enabled.order || bClauseProps.enabled.order)) {
                compatibleSort = compare.equal(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {});
            }
            if (!compatibleSort) {
                result = false;
            } else {
                result = this.evaluateOperator(compare.subset, a, b);
            }
            return result;
        },
        properSubset: function (a, b) {
            return this.subset(a, b) && !this.equal(a, b);
        },
        difference: function (a, b) {
            var aClauseProps = this.getClauseProperties(a);
            var bClauseProps = this.getClauseProperties(b);
            var differentClauses = this.getDifferentClauseTypes(aClauseProps, bClauseProps);
            var result;
            switch (differentClauses.length) {
            case 0: {
                    result = false;
                    break;
                }
            case 1: {
                    var clause = differentClauses[0];
                    result = compare.difference(aClauseProps[clause], bClauseProps[clause], undefined, undefined, undefined, this.clauses[clause], {});
                    if (this.translators[clause] && typeof result === 'object') {
                        result = this.translators[clause].toSet({}, result);
                    }
                    break;
                }
            }
            return result;
        },
        union: function (a, b) {
            return this.evaluateOperator(compare.union, a, b);
        },
        intersection: function (a, b) {
            return this.evaluateOperator(compare.intersection, a, b);
        },
        count: function (set) {
            return this.evaluateOperator(compare.count, set, {});
        },
        has: function (set, props) {
            var aClauseProps = this.getClauseProperties(set);
            var propsClauseProps = this.getClauseProperties(props, { isProperties: true });
            var compatibleSort = true;
            var result;
            if ((propsClauseProps.enabled.paginate || aClauseProps.enabled.paginate) && (propsClauseProps.enabled.order || aClauseProps.enabled.order)) {
                compatibleSort = compare.equal(propsClauseProps.order, aClauseProps.order, undefined, undefined, undefined, {}, {});
            }
            if (!compatibleSort) {
                result = false;
            } else {
                result = this.evaluateOperator(compare.subset, props, set, { isProperties: true }, undefined);
            }
            return result;
        },
        index: function (set, items, item) {
            var aClauseProps = this.getClauseProperties(set);
            var propName = h.firstProp(aClauseProps.order), compare, orderValue;
            if (propName) {
                compare = this.clauses.order[propName];
                orderValue = set[propName];
                return h.index(function (itemA, itemB) {
                    return compare(orderValue, itemA, itemB);
                }, items, item);
            }
            propName = h.firstProp(this.clauses.id);
            if (propName) {
                compare = h.defaultSort;
                orderValue = propName;
                return h.index(function (itemA, itemB) {
                    return compare(orderValue, itemA, itemB);
                }, items, item);
            }
            return;
        },
        getSubset: function (a, b, bData) {
            var aClauseProps = this.getClauseProperties(a);
            var bClauseProps = this.getClauseProperties(b);
            var isSubset = this.subset(assign({}, aClauseProps.where, aClauseProps.paginate), assign({}, bClauseProps.where, bClauseProps.paginate));
            if (isSubset) {
                return get.subsetData(a, b, bData, this);
            }
        },
        getUnion: function (a, b, aItems, bItems) {
            var aClauseProps = this.getClauseProperties(a);
            var bClauseProps = this.getClauseProperties(b);
            var algebra = this;
            var options;
            if (this.subset(a, b)) {
                return bItems;
            } else if (this.subset(b, a)) {
                return aItems;
            }
            var combined;
            if (aClauseProps.enabled.paginate || bClauseProps.enabled.paginate) {
                options = {};
                var isUnion = compare.union(aClauseProps.paginate, bClauseProps.paginate, undefined, undefined, undefined, this.clauses.paginate, options);
                if (!isUnion) {
                    return;
                } else {
                    each(options.getUnions, function (filter) {
                        var items = filter(a, b, aItems, bItems, algebra, options);
                        aItems = items[0];
                        bItems = items[1];
                    });
                    combined = aItems.concat(bItems);
                }
            } else {
                combined = aItems.concat(bItems);
            }
            if (combined.length && aClauseProps.enabled.order && compare.equal(aClauseProps.order, bClauseProps.order, undefined, undefined, undefined, {}, {})) {
                options = {};
                var propName = h.firstProp(aClauseProps.order), compareOrder = algebra.clauses.order[propName];
                combined = combined.sort(function (aItem, bItem) {
                    return compareOrder(a[propName], aItem, bItem);
                });
            }
            return combined;
        }
    });
    var callOnAlgebra = function (methodName, algebraArgNumber) {
        return function () {
            var args = makeArray(arguments).slice(0, algebraArgNumber);
            var algebra = Algebra.make(arguments[algebraArgNumber]);
            return algebra[methodName].apply(algebra, args);
        };
    };
    module.exports = {
        Algebra: Algebra,
        Translate: Translate,
        difference: callOnAlgebra('difference', 2),
        equal: callOnAlgebra('equal', 2),
        subset: callOnAlgebra('subset', 2),
        properSubset: callOnAlgebra('properSubset', 2),
        union: callOnAlgebra('union', 2),
        intersection: callOnAlgebra('intersection', 2),
        count: callOnAlgebra('count', 1),
        has: callOnAlgebra('has', 2),
        index: callOnAlgebra('index', 3),
        getSubset: callOnAlgebra('getSubset', 3),
        getUnion: callOnAlgebra('getUnion', 4)
    };
});
/*can-set@1.0.3#src/props*/
define('can-set/src/props', function (require, exports, module) {
    var h = require('can-set/src/helpers');
    var clause = require('can-set/src/clause');
    var each = require('can-util/js/each/each');
    var within = function (value, range) {
        return value >= range[0] && value <= range[1];
    };
    var numericProperties = function (setA, setB, property1, property2) {
        return {
            sAv1: +setA[property1],
            sAv2: +setA[property2],
            sBv1: +setB[property1],
            sBv2: +setB[property2]
        };
    };
    var diff = function (setA, setB, property1, property2) {
        var numProps = numericProperties(setA, setB, property1, property2);
        var sAv1 = numProps.sAv1, sAv2 = numProps.sAv2, sBv1 = numProps.sBv1, sBv2 = numProps.sBv2, count = sAv2 - sAv1 + 1;
        var after = {
            difference: [
                sBv2 + 1,
                sAv2
            ],
            intersection: [
                sAv1,
                sBv2
            ],
            union: [
                sBv1,
                sAv2
            ],
            count: count,
            meta: 'after'
        };
        var before = {
            difference: [
                sAv1,
                sBv1 - 1
            ],
            intersection: [
                sBv1,
                sAv2
            ],
            union: [
                sAv1,
                sBv2
            ],
            count: count,
            meta: 'before'
        };
        if (sAv1 === sBv1 && sAv2 === sBv2) {
            return {
                intersection: [
                    sAv1,
                    sAv2
                ],
                union: [
                    sAv1,
                    sAv2
                ],
                count: count,
                meta: 'equal'
            };
        } else if (sAv1 === sBv1 && sBv2 < sAv2) {
            return after;
        } else if (sAv2 === sBv2 && sBv1 > sAv1) {
            return before;
        } else if (within(sAv1, [
                sBv1,
                sBv2
            ]) && within(sAv2, [
                sBv1,
                sBv2
            ])) {
            return {
                intersection: [
                    sAv1,
                    sAv2
                ],
                union: [
                    sBv1,
                    sBv2
                ],
                count: count,
                meta: 'subset'
            };
        } else if (within(sBv1, [
                sAv1,
                sAv2
            ]) && within(sBv2, [
                sAv1,
                sAv2
            ])) {
            return {
                intersection: [
                    sBv1,
                    sBv2
                ],
                difference: [
                    null,
                    null
                ],
                union: [
                    sAv1,
                    sAv2
                ],
                count: count,
                meta: 'superset'
            };
        } else if (sAv1 < sBv1 && within(sAv2, [
                sBv1,
                sBv2
            ])) {
            return before;
        } else if (sBv1 < sAv1 && within(sBv2, [
                sAv1,
                sAv2
            ])) {
            return after;
        } else if (sAv2 === sBv1 - 1) {
            return {
                difference: [
                    sAv1,
                    sAv2
                ],
                union: [
                    sAv1,
                    sBv2
                ],
                count: count,
                meta: 'disjoint-before'
            };
        } else if (sBv2 === sAv1 - 1) {
            return {
                difference: [
                    sAv1,
                    sAv2
                ],
                union: [
                    sBv1,
                    sAv2
                ],
                count: count,
                meta: 'disjoint-after'
            };
        }
        if (!isNaN(count)) {
            return {
                count: count,
                meta: 'disjoint'
            };
        }
    };
    var cleanUp = function (value, enumData) {
        if (!value) {
            return enumData;
        }
        if (!Array.isArray(value)) {
            value = [value];
        }
        if (!value.length) {
            return enumData;
        }
        return value;
    };
    var stringConvert = {
        '0': false,
        'false': false,
        'null': undefined,
        'undefined': undefined
    };
    var convertToBoolean = function (value) {
        if (typeof value === 'string') {
            return value.toLowerCase() in stringConvert ? stringConvert[value.toLowerCase()] : true;
        }
        return value;
    };
    var props = {
        'enum': function (prop, enumData) {
            var compares = new clause.Where({});
            compares[prop] = function (vA, vB, A, B) {
                vA = cleanUp(vA, enumData);
                vB = cleanUp(vB, enumData);
                var data = h.arrayUnionIntersectionDifference(vA, vB);
                if (!data.difference.length) {
                    delete data.difference;
                }
                each(data, function (value, prop) {
                    if (Array.isArray(value)) {
                        if (h.arraySame(enumData, value)) {
                            data[prop] = undefined;
                        } else if (value.length === 1) {
                            data[prop] = value[0];
                        }
                    }
                });
                return data;
            };
            return compares;
        },
        paginate: function (propStart, propEnd, translateToStartEnd, reverseTranslate) {
            var compares = {};
            var makeResult = function (result, index) {
                var res = {};
                each([
                    'intersection',
                    'difference',
                    'union'
                ], function (prop) {
                    if (result[prop]) {
                        var set = {
                            start: result[prop][0],
                            end: result[prop][1]
                        };
                        res[prop] = reverseTranslate(set)[index === 0 ? propStart : propEnd];
                    }
                });
                if (result.count) {
                    res.count = result.count;
                }
                return res;
            };
            compares[propStart] = function (vA, vB, A, B) {
                if (vA === undefined) {
                    return;
                }
                var res = diff(translateToStartEnd(A), translateToStartEnd(B), 'start', 'end');
                var result = makeResult(res, 0);
                result.getSubset = function (a, b, bItems, algebra, options) {
                    return bItems;
                };
                result.getUnion = function (a, b, aItems, bItems, algebra, options) {
                    return [
                        aItems,
                        bItems
                    ];
                };
                return result;
            };
            compares[propEnd] = function (vA, vB, A, B) {
                if (vA === undefined) {
                    return;
                }
                var data = diff(translateToStartEnd(A), translateToStartEnd(B), 'start', 'end');
                var res = makeResult(data, 1);
                res.getSubset = function (a, b, bItems, algebra, options) {
                    var tA = translateToStartEnd(a);
                    var tB = translateToStartEnd(b);
                    var numProps = numericProperties(tA, tB, 'start', 'end');
                    var aStartValue = numProps.sAv1, aEndValue = numProps.sAv2;
                    var bStartValue = numProps.sBv1;
                    if (!('end' in tB) || !('end' in tA)) {
                        return bItems.slice(aStartValue, aEndValue + 1);
                    }
                    return bItems.slice(aStartValue - bStartValue, aEndValue - bStartValue + 1);
                };
                res.getUnion = function (a, b, aItems, bItems, algebra, options) {
                    var tA = translateToStartEnd(a);
                    var tB = translateToStartEnd(b);
                    if (data.meta.indexOf('after') >= 0) {
                        if (data.intersection) {
                            bItems = bItems.slice(0, data.intersection[0] - +tB.start);
                        }
                        return [
                            bItems,
                            aItems
                        ];
                    }
                    if (data.intersection) {
                        aItems = aItems.slice(0, data.intersection[0] - +tA.start);
                    }
                    return [
                        aItems,
                        bItems
                    ];
                };
                return res;
            };
            return new clause.Paginate(compares);
        },
        'boolean': function (propertyName) {
            var compares = new clause.Where({});
            compares[propertyName] = function (propA, propB) {
                propA = convertToBoolean(propA);
                propB = convertToBoolean(propB);
                var notA = !propA, notB = !propB;
                if (propA === notB && propB === notA) {
                    return {
                        difference: !propB,
                        union: undefined
                    };
                } else if (propA === undefined) {
                    return {
                        difference: !propB,
                        intersection: propB,
                        union: undefined
                    };
                } else if (propA === propB) {
                    return true;
                }
            };
            return compares;
        },
        'sort': function (prop, sortFunc) {
            if (!sortFunc) {
                sortFunc = h.defaultSort;
            }
            var compares = {};
            compares[prop] = sortFunc;
            return new clause.Order(compares);
        },
        'id': function (prop) {
            var compares = {};
            compares[prop] = prop;
            return new clause.Id(compares);
        }
    };
    var assignExcept = function (d, s, props) {
        for (var prop in s) {
            if (!props[prop]) {
                d[prop] = s[prop];
            }
        }
        return d;
    };
    var translateToOffsetLimit = function (set, offsetProp, limitProp) {
        var newSet = assignExcept({}, set, {
            start: 1,
            end: 1
        });
        if ('start' in set) {
            newSet[offsetProp] = set.start;
        }
        if ('end' in set) {
            newSet[limitProp] = set.end - set.start + 1;
        }
        return newSet;
    };
    var translateToStartEnd = function (set, offsetProp, limitProp) {
        var except = {};
        except[offsetProp] = except[limitProp] = 1;
        var newSet = assignExcept({}, set, except);
        if (offsetProp in set) {
            newSet.start = parseInt(set[offsetProp], 10);
        }
        if (limitProp in set) {
            newSet.end = newSet.start + parseInt(set[limitProp]) - 1;
        }
        return newSet;
    };
    props.offsetLimit = function (offsetProp, limitProp) {
        offsetProp = offsetProp || 'offset';
        limitProp = limitProp || 'limit';
        return props.paginate(offsetProp, limitProp, function (set) {
            return translateToStartEnd(set, offsetProp, limitProp);
        }, function (set) {
            return translateToOffsetLimit(set, offsetProp, limitProp);
        });
    };
    props.rangeInclusive = function (startIndexProperty, endIndexProperty) {
        startIndexProperty = startIndexProperty || 'start';
        endIndexProperty = endIndexProperty || 'end';
        return props.paginate(startIndexProperty, endIndexProperty, function (set) {
            var except = {};
            except[startIndexProperty] = except[endIndexProperty] = 1;
            var newSet = assignExcept({}, set, except);
            if (startIndexProperty in set) {
                newSet.start = set[startIndexProperty];
            }
            if (endIndexProperty in set) {
                newSet.end = set[endIndexProperty];
            }
            return newSet;
        }, function (set) {
            var except = {
                start: 1,
                end: 1
            };
            var newSet = assignExcept({}, set, except);
            newSet[startIndexProperty] = set.start;
            newSet[endIndexProperty] = set.end;
            return newSet;
        });
    };
    module.exports = props;
});
/*can-set@1.0.3#src/set*/
define('can-set', function (require, exports, module) {
    var set = require('can-set/src/set-core');
    var ns = require('can-namespace');
    var props = require('can-set/src/props');
    var clause = require('can-set/src/clause');
    set.comparators = props;
    set.props = props;
    set.helpers = require('can-set/src/helpers');
    set.clause = clause;
    module.exports = ns.set = set;
});
/*can-connect@1.2.0#cache-requests/cache-requests*/
define('can-connect/cache-requests/cache-requests', function (require, exports, module) {
    var connect = require('can-connect');
    var getItems = require('can-connect/helpers/get-items');
    var canSet = require('can-set');
    var forEach = [].forEach;
    module.exports = connect.behavior('cache-requests', function (baseConnection) {
        return {
            getDiff: function (params, availableSets) {
                var minSets, self = this;
                forEach.call(availableSets, function (set) {
                    var curSets;
                    var difference = canSet.difference(params, set, self.algebra);
                    if (typeof difference === 'object') {
                        curSets = {
                            needed: difference,
                            cached: canSet.intersection(params, set, self.algebra),
                            count: canSet.count(difference, self.algebra)
                        };
                    } else if (canSet.subset(params, set, self.algebra)) {
                        curSets = {
                            cached: params,
                            count: 0
                        };
                    }
                    if (curSets) {
                        if (!minSets || curSets.count < minSets.count) {
                            minSets = curSets;
                        }
                    }
                });
                if (!minSets) {
                    return { needed: params };
                } else {
                    return {
                        needed: minSets.needed,
                        cached: minSets.cached
                    };
                }
            },
            getUnion: function (params, diff, neededItems, cachedItems) {
                return { data: canSet.getUnion(diff.needed, diff.cached, getItems(neededItems), getItems(cachedItems), this.algebra) };
            },
            getListData: function (set) {
                set = set || {};
                var self = this;
                return this.cacheConnection.getSets(set).then(function (sets) {
                    var diff = self.getDiff(set, sets);
                    if (!diff.needed) {
                        return self.cacheConnection.getListData(diff.cached);
                    } else if (!diff.cached) {
                        return baseConnection.getListData(diff.needed).then(function (data) {
                            return self.cacheConnection.updateListData(getItems(data), diff.needed).then(function () {
                                return data;
                            });
                        });
                    } else {
                        var cachedPromise = self.cacheConnection.getListData(diff.cached);
                        var needsPromise = baseConnection.getListData(diff.needed);
                        var savedPromise = needsPromise.then(function (data) {
                            return self.cacheConnection.updateListData(getItems(data), diff.needed).then(function () {
                                return data;
                            });
                        });
                        var combinedPromise = Promise.all([
                            cachedPromise,
                            needsPromise
                        ]).then(function (result) {
                            var cached = result[0], needed = result[1];
                            return self.getUnion(set, diff, needed, cached);
                        });
                        return Promise.all([
                            combinedPromise,
                            savedPromise
                        ]).then(function (data) {
                            return data[0];
                        });
                    }
                });
            }
        };
    });
});
/*can-connect@1.2.0#helpers/weak-reference-map*/
define('can-connect/helpers/weak-reference-map', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var WeakReferenceMap = function () {
        this.set = {};
    };
    assign(WeakReferenceMap.prototype, {
        has: function (key) {
            return !!this.set[key];
        },
        addReference: function (key, item) {
            var data = this.set[key];
            if (!data) {
                data = this.set[key] = {
                    item: item,
                    referenceCount: 0,
                    key: key
                };
            }
            data.referenceCount++;
        },
        deleteReference: function (key) {
            var data = this.set[key];
            if (data) {
                data.referenceCount--;
                if (data.referenceCount === 0) {
                    delete this.set[key];
                }
            }
        },
        get: function (key) {
            var data = this.set[key];
            if (data) {
                return data.item;
            }
        },
        forEach: function (cb) {
            for (var id in this.set) {
                cb(this.set[id].item, id);
            }
        }
    });
    module.exports = WeakReferenceMap;
});
/*can-connect@1.2.0#helpers/overwrite*/
define('can-connect/helpers/overwrite', function (require, exports, module) {
    module.exports = function (d, s, id) {
        for (var prop in d) {
            if (prop !== id && !(prop in s)) {
                delete d[prop];
            }
        }
        for (prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
});
/*can-connect@1.2.0#helpers/id-merge*/
define('can-connect/helpers/id-merge', function (require, exports, module) {
    var map = [].map;
    module.exports = function (list, update, id, make) {
        var listIndex = 0, updateIndex = 0;
        while (listIndex < list.length && updateIndex < update.length) {
            var listItem = list[listIndex], updateItem = update[updateIndex], lID = id(listItem), uID = id(updateItem);
            if (id(listItem) === id(updateItem)) {
                listIndex++;
                updateIndex++;
                continue;
            }
            if (updateIndex + 1 < update.length && id(update[updateIndex + 1]) === lID) {
                list.splice(listIndex, 0, make(update[updateIndex]));
                listIndex++;
                updateIndex++;
                continue;
            } else if (listIndex + 1 < list.length && id(list[listIndex + 1]) === uID) {
                list.splice(listIndex, 1);
                listIndex++;
                updateIndex++;
                continue;
            } else {
                list.splice.apply(list, [
                    listIndex,
                    list.length - listIndex
                ].concat(map.call(update.slice(updateIndex), make)));
                return list;
            }
        }
        if (updateIndex === update.length && listIndex === list.length) {
            return;
        }
        list.splice.apply(list, [
            listIndex,
            list.length - listIndex
        ].concat(map.call(update.slice(updateIndex), make)));
        return;
    };
});
/*can-connect@1.2.0#constructor/constructor*/
define('can-connect/constructor/constructor', function (require, exports, module) {
    var isArray = require('can-util/js/is-array/is-array');
    var makeArray = require('can-util/js/make-array/make-array');
    var assign = require('can-util/js/assign/assign');
    var connect = require('can-connect');
    var WeakReferenceMap = require('can-connect/helpers/weak-reference-map');
    var overwrite = require('can-connect/helpers/overwrite');
    var idMerge = require('can-connect/helpers/id-merge');
    module.exports = connect.behavior('constructor', function (baseConnection) {
        var behavior = {
            cidStore: new WeakReferenceMap(),
            _cid: 0,
            get: function (params) {
                var self = this;
                return this.getData(params).then(function (data) {
                    return self.hydrateInstance(data);
                });
            },
            getList: function (set) {
                set = set || {};
                var self = this;
                return this.getListData(set).then(function (data) {
                    return self.hydrateList(data, set);
                });
            },
            hydrateList: function (listData, set) {
                if (isArray(listData)) {
                    listData = { data: listData };
                }
                var arr = [];
                for (var i = 0; i < listData.data.length; i++) {
                    arr.push(this.hydrateInstance(listData.data[i]));
                }
                listData.data = arr;
                if (this.list) {
                    return this.list(listData, set);
                } else {
                    var list = listData.data.slice(0);
                    list[this.listSetProp || '__listSet'] = set;
                    copyMetadata(listData, list);
                    return list;
                }
            },
            hydrateInstance: function (props) {
                if (this.instance) {
                    return this.instance(props);
                } else {
                    return assign({}, props);
                }
            },
            save: function (instance) {
                var serialized = this.serializeInstance(instance);
                var id = this.id(instance);
                var self = this;
                if (id === undefined) {
                    var cid = this._cid++;
                    this.cidStore.addReference(cid, instance);
                    return this.createData(serialized, cid).then(function (data) {
                        if (data !== undefined) {
                            self.createdInstance(instance, data);
                        }
                        self.cidStore.deleteReference(cid, instance);
                        return instance;
                    });
                } else {
                    return this.updateData(serialized).then(function (data) {
                        if (data !== undefined) {
                            self.updatedInstance(instance, data);
                        }
                        return instance;
                    });
                }
            },
            destroy: function (instance) {
                var serialized = this.serializeInstance(instance), self = this;
                return this.destroyData(serialized).then(function (data) {
                    if (data !== undefined) {
                        self.destroyedInstance(instance, data);
                    }
                    return instance;
                });
            },
            createdInstance: function (instance, props) {
                assign(instance, props);
            },
            updatedInstance: function (instance, data) {
                overwrite(instance, data, this.idProp);
            },
            updatedList: function (list, listData, set) {
                var instanceList = [];
                for (var i = 0; i < listData.data.length; i++) {
                    instanceList.push(this.hydrateInstance(listData.data[i]));
                }
                idMerge(list, instanceList, this.id.bind(this), this.hydrateInstance.bind(this));
                copyMetadata(listData, list);
            },
            destroyedInstance: function (instance, data) {
                overwrite(instance, data, this.idProp);
            },
            serializeInstance: function (instance) {
                return assign({}, instance);
            },
            serializeList: function (list) {
                var self = this;
                return makeArray(list).map(function (instance) {
                    return self.serializeInstance(instance);
                });
            },
            isNew: function (instance) {
                var id = this.id(instance);
                return !(id || id === 0);
            }
        };
        return behavior;
    });
    function copyMetadata(listData, list) {
        for (var prop in listData) {
            if (prop !== 'data') {
                if (typeof list.set === 'function') {
                    list.set(prop, listData[prop]);
                } else if (typeof list.attr === 'function') {
                    list.attr(prop, listData[prop]);
                } else {
                    list[prop] = listData[prop];
                }
            }
        }
    }
});
/*can-connect@1.2.0#helpers/sorted-set-json*/
define('can-connect/helpers/sorted-set-json', function (require, exports, module) {
    var forEach = [].forEach;
    var keys = Object.keys;
    module.exports = function (set) {
        if (set == null) {
            return set;
        } else {
            var sorted = {};
            forEach.call(keys(set).sort(), function (prop) {
                sorted[prop] = set[prop];
            });
            return JSON.stringify(sorted);
        }
    };
});
/*can-connect@1.2.0#constructor/callbacks-once/callbacks-once*/
define('can-connect/constructor/callbacks-once/callbacks-once', function (require, exports, module) {
    var connect = require('can-connect');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var forEach = [].forEach;
    var callbacks = [
        'createdInstance',
        'updatedInstance',
        'destroyedInstance'
    ];
    module.exports = connect.behavior('constructor/callbacks-once', function (baseConnection) {
        var behavior = {};
        forEach.call(callbacks, function (name) {
            behavior[name] = function (instance, data) {
                var lastSerialized = this.getInstanceMetaData(instance, 'last-data');
                var serialize = sortedSetJSON(data), serialized = sortedSetJSON(this.serializeInstance(instance));
                if (lastSerialized !== serialize) {
                    var result = baseConnection[name].apply(this, arguments);
                    this.addInstanceMetaData(instance, 'last-data', serialize);
                    return result;
                }
            };
        });
        return behavior;
    });
});
/*can-connect@1.2.0#constructor/store/store*/
define('can-connect/constructor/store/store', function (require, exports, module) {
    var connect = require('can-connect');
    var WeakReferenceMap = require('can-connect/helpers/weak-reference-map');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var canEvent = require('can-event');
    var assign = require('can-util/js/assign/assign');
    var pendingRequests = 0;
    var noRequestsTimer = null;
    var requests = {
        increment: function (connection) {
            pendingRequests++;
            clearTimeout(noRequestsTimer);
        },
        decrement: function (connection) {
            pendingRequests--;
            if (pendingRequests === 0) {
                noRequestsTimer = setTimeout(function () {
                    requests.dispatch('end');
                }, 10);
            }
        },
        count: function () {
            return pendingRequests;
        }
    };
    assign(requests, canEvent);
    var constructorStore = connect.behavior('constructor/store', function (baseConnection) {
        var behavior = {
            instanceStore: new WeakReferenceMap(),
            listStore: new WeakReferenceMap(),
            _requestInstances: {},
            _requestLists: {},
            _finishedRequest: function () {
                var id;
                requests.decrement(this);
                if (requests.count() === 0) {
                    for (id in this._requestInstances) {
                        this.instanceStore.deleteReference(id);
                    }
                    this._requestInstances = {};
                    for (id in this._requestLists) {
                        this.listStore.deleteReference(id);
                    }
                    this._requestLists = {};
                }
            },
            addInstanceReference: function (instance, id) {
                this.instanceStore.addReference(id || this.id(instance), instance);
            },
            addInstanceMetaData: function (instance, name, value) {
                var data = this.instanceStore.set[this.id(instance)];
                if (data) {
                    data[name] = value;
                }
            },
            getInstanceMetaData: function (instance, name) {
                var data = this.instanceStore.set[this.id(instance)];
                if (data) {
                    return data[name];
                }
            },
            deleteInstanceMetaData: function (instance, name) {
                var data = this.instanceStore.set[this.id(instance)];
                delete data[name];
            },
            deleteInstanceReference: function (instance) {
                this.instanceStore.deleteReference(this.id(instance), instance);
            },
            addListReference: function (list, set) {
                var id = sortedSetJSON(set || this.listSet(list));
                if (id) {
                    this.listStore.addReference(id, list);
                }
            },
            deleteListReference: function (list, set) {
                var id = sortedSetJSON(set || this.listSet(list));
                if (id) {
                    this.listStore.deleteReference(id, list);
                }
            },
            hydratedInstance: function (instance) {
                if (requests.count() > 0) {
                    var id = this.id(instance);
                    if (!this._requestInstances[id]) {
                        this.addInstanceReference(instance);
                        this._requestInstances[id] = instance;
                    }
                }
            },
            hydrateInstance: function (props) {
                var id = this.id(props);
                if ((id || id === 0) && this.instanceStore.has(id)) {
                    var storeInstance = this.instanceStore.get(id);
                    this.updatedInstance(storeInstance, props);
                    return storeInstance;
                }
                var instance = baseConnection.hydrateInstance.call(this, props);
                this.hydratedInstance(instance);
                return instance;
            },
            hydratedList: function (list, set) {
                if (requests.count() > 0) {
                    var id = sortedSetJSON(set || this.listSet(list));
                    if (id) {
                        if (!this._requestLists[id]) {
                            this.addListReference(list, set);
                            this._requestLists[id] = list;
                        }
                    }
                }
            },
            hydrateList: function (listData, set) {
                set = set || this.listSet(listData);
                var id = sortedSetJSON(set);
                if (id && this.listStore.has(id)) {
                    var storeList = this.listStore.get(id);
                    this.updatedList(storeList, listData, set);
                    return storeList;
                }
                var list = baseConnection.hydrateList.call(this, listData, set);
                this.hydratedList(list, set);
                return list;
            },
            getList: function (params) {
                var self = this;
                requests.increment(this);
                var promise = baseConnection.getList.call(this, params);
                promise.then(function (instances) {
                    self._finishedRequest();
                }, function () {
                    self._finishedRequest();
                });
                return promise;
            },
            get: function (params) {
                var self = this;
                requests.increment(this);
                var promise = baseConnection.get.call(this, params);
                promise.then(function (instance) {
                    self._finishedRequest();
                }, function () {
                    self._finishedRequest();
                });
                return promise;
            },
            save: function (instance) {
                var self = this;
                requests.increment(this);
                var updating = !this.isNew(instance);
                if (updating) {
                    this.addInstanceReference(instance);
                }
                var promise = baseConnection.save.call(this, instance);
                promise.then(function (instances) {
                    if (updating) {
                        self.deleteInstanceReference(instance);
                    }
                    self._finishedRequest();
                }, function () {
                    self._finishedRequest();
                });
                return promise;
            },
            destroy: function (instance) {
                var self = this;
                requests.increment(this);
                var promise = baseConnection.destroy.call(this, instance);
                promise.then(function (instance) {
                    self._finishedRequest();
                }, function () {
                    self._finishedRequest();
                });
                return promise;
            }
        };
        return behavior;
    });
    constructorStore.requests = requests;
    module.exports = constructorStore;
});
/*can-connect@1.2.0#data/callbacks/callbacks*/
define('can-connect/data/callbacks/callbacks', function (require, exports, module) {
    var connect = require('can-connect');
    var each = require('can-util/js/each/each');
    var pairs = {
        getListData: 'gotListData',
        createData: 'createdData',
        updateData: 'updatedData',
        destroyData: 'destroyedData'
    };
    module.exports = connect.behavior('data/callbacks', function (baseConnection) {
        var behavior = {};
        each(pairs, function (callbackName, name) {
            behavior[name] = function (params, cid) {
                var self = this;
                return baseConnection[name].call(this, params).then(function (data) {
                    if (self[callbackName]) {
                        return self[callbackName].call(self, data, params, cid);
                    } else {
                        return data;
                    }
                });
            };
        });
        return behavior;
    });
});
/*can-connect@1.2.0#data/callbacks-cache/callbacks-cache*/
define('can-connect/data/callbacks-cache/callbacks-cache', function (require, exports, module) {
    var connect = require('can-connect');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var pairs = {
        createdData: 'createData',
        updatedData: 'updateData',
        destroyedData: 'destroyData'
    };
    module.exports = connect.behavior('data/callbacks-cache', function (baseConnection) {
        var behavior = {};
        each(pairs, function (cacheCallback, dataCallbackName) {
            behavior[dataCallbackName] = function (data, set, cid) {
                this.cacheConnection[cacheCallback](assign(assign({}, set), data));
                return baseConnection[dataCallbackName].call(this, data, set, cid);
            };
        });
        return behavior;
    });
});
/*can-connect@1.2.0#helpers/deferred*/
define('can-connect/helpers/deferred', function (require, exports, module) {
    module.exports = function () {
        var def = {};
        def.promise = new Promise(function (resolve, reject) {
            def.resolve = resolve;
            def.reject = reject;
        });
        return def;
    };
});
/*can-connect@1.2.0#data/combine-requests/combine-requests*/
define('can-connect/data/combine-requests/combine-requests', function (require, exports, module) {
    var connect = require('can-connect');
    var canSet = require('can-set');
    var getItems = require('can-connect/helpers/get-items');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var makeDeferred = require('can-connect/helpers/deferred');
    var forEach = [].forEach;
    module.exports = connect.behavior('data/combine-requests', function (baseConnection) {
        var pendingRequests;
        return {
            unionPendingRequests: function (pendingRequests) {
                var self = this;
                pendingRequests.sort(function (pReq1, pReq2) {
                    if (canSet.subset(pReq1.set, pReq2.set, self.algebra)) {
                        return 1;
                    } else if (canSet.subset(pReq2.set, pReq1.set, self.algebra)) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                var combineData = [];
                var current;
                doubleLoop(pendingRequests, {
                    start: function (pendingRequest) {
                        current = {
                            set: pendingRequest.set,
                            pendingRequests: [pendingRequest]
                        };
                        combineData.push(current);
                    },
                    iterate: function (pendingRequest) {
                        var combined = canSet.union(current.set, pendingRequest.set, self.algebra);
                        if (combined) {
                            current.set = combined;
                            current.pendingRequests.push(pendingRequest);
                            return true;
                        }
                    }
                });
                return Promise.resolve(combineData);
            },
            getSubset: function (set, unionSet, data) {
                return canSet.getSubset(set, unionSet, data, this.algebra);
            },
            time: 1,
            getListData: function (set) {
                set = set || {};
                var self = this;
                if (!pendingRequests) {
                    pendingRequests = [];
                    setTimeout(function () {
                        var combineDataPromise = self.unionPendingRequests(pendingRequests);
                        pendingRequests = null;
                        combineDataPromise.then(function (combinedData) {
                            forEach.call(combinedData, function (combined) {
                                var combinedSet = deepAssign({}, combined.set);
                                baseConnection.getListData(combinedSet).then(function (data) {
                                    if (combined.pendingRequests.length === 1) {
                                        combined.pendingRequests[0].deferred.resolve(data);
                                    } else {
                                        forEach.call(combined.pendingRequests, function (pending) {
                                            pending.deferred.resolve({ data: self.getSubset(pending.set, combined.set, getItems(data)) });
                                        });
                                    }
                                }, function (err) {
                                    if (combined.pendingRequests.length === 1) {
                                        combined.pendingRequests[0].deferred.reject(err);
                                    } else {
                                        forEach.call(combined.pendingRequests, function (pending) {
                                            pending.deferred.reject(err);
                                        });
                                    }
                                });
                            });
                        });
                    }, this.time || 1);
                }
                var deferred = makeDeferred();
                pendingRequests.push({
                    deferred: deferred,
                    set: set
                });
                return deferred.promise;
            }
        };
    });
    var doubleLoop = function (arr, callbacks) {
        var i = 0;
        while (i < arr.length) {
            callbacks.start(arr[i]);
            var j = i + 1;
            while (j < arr.length) {
                if (callbacks.iterate(arr[j]) === true) {
                    arr.splice(j, 1);
                } else {
                    j++;
                }
            }
            i++;
        }
    };
});
/*can-connect@1.2.0#helpers/set-add*/
define('can-connect/helpers/set-add', function (require, exports, module) {
    var canSet = require('can-set');
    module.exports = function (connection, setItems, items, item, algebra) {
        var index = canSet.index(setItems, items, item, algebra);
        if (index === undefined) {
            index = items.length;
        }
        var copy = items.slice(0);
        copy.splice(index, 0, item);
        return copy;
    };
});
/*can-connect@1.2.0#helpers/get-index-by-id*/
define('can-connect/helpers/get-index-by-id', function (require, exports, module) {
    module.exports = function (connection, props, items) {
        var id = connection.id(props);
        for (var i = 0; i < items.length; i++) {
            var connId = connection.id(items[i]);
            if (id == connId) {
                return i;
            }
        }
        return -1;
    };
});
/*can-connect@1.2.0#data/localstorage-cache/localstorage-cache*/
define('can-connect/data/localstorage-cache/localstorage-cache', function (require, exports, module) {
    var getItems = require('can-connect/helpers/get-items');
    var connect = require('can-connect');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var canSet = require('can-set');
    var forEach = [].forEach;
    var map = [].map;
    var setAdd = require('can-connect/helpers/set-add');
    var indexOf = require('can-connect/helpers/get-index-by-id');
    var assign = require('can-util/js/assign/assign');
    var overwrite = require('can-connect/helpers/overwrite');
    module.exports = connect.behavior('data/localstorage-cache', function (baseConnection) {
        var behavior = {
            _instances: {},
            getSetData: function () {
                var sets = {};
                var self = this;
                forEach.call(JSON.parse(localStorage.getItem(this.name + '-sets')) || [], function (set) {
                    var setKey = sortedSetJSON(set);
                    if (localStorage.getItem(self.name + '/set/' + setKey)) {
                        sets[setKey] = {
                            set: set,
                            setKey: setKey
                        };
                    }
                });
                return sets;
            },
            _getSets: function (setData) {
                var sets = [];
                setData = setData || this.getSetData();
                for (var setKey in setData) {
                    sets.push(JSON.parse(setKey));
                }
                return sets;
            },
            getInstance: function (id) {
                var res = localStorage.getItem(this.name + '/instance/' + id);
                if (res) {
                    return JSON.parse(res);
                }
            },
            updateInstance: function (props) {
                var id = this.id(props);
                var instance = this.getInstance(id);
                if (!instance) {
                    instance = props;
                } else {
                    overwrite(instance, props, this.idProp);
                }
                localStorage.setItem(this.name + '/instance/' + id, JSON.stringify(instance));
                return instance;
            },
            getInstances: function (ids) {
                var self = this;
                return map.call(ids, function (id) {
                    return self.getInstance(id);
                });
            },
            removeSet: function (setKey) {
                var sets = this.getSetData();
                localStorage.removeItem(this.name + '/set/' + setKey);
                delete sets[setKey];
            },
            updateSets: function (sets) {
                var setData = this._getSets(sets);
                localStorage.setItem(this.name + '-sets', JSON.stringify(setData));
            },
            updateSet: function (setDatum, items, newSet) {
                var newSetKey = newSet ? sortedSetJSON(newSet) : setDatum.setKey;
                if (newSet) {
                    if (newSetKey !== setDatum.setKey) {
                        var sets = this.getSetData();
                        localStorage.removeItem(this.name + '/set/' + setDatum.setKey);
                        delete sets[setDatum.setKey];
                        sets[newSetKey] = {
                            setKey: newSetKey,
                            set: newSet
                        };
                        this.updateSets(sets);
                    }
                }
                setDatum.items = items;
                var self = this;
                var ids = map.call(items, function (item) {
                    var id = self.id(item);
                    localStorage.setItem(self.name + '/instance/' + id, JSON.stringify(item));
                    return id;
                });
                localStorage.setItem(this.name + '/set/' + newSetKey, JSON.stringify(ids));
            },
            addSet: function (set, data) {
                var items = getItems(data);
                var sets = this.getSetData();
                var setKey = sortedSetJSON(set);
                sets[setKey] = {
                    setKey: setKey,
                    items: items,
                    set: set
                };
                var self = this;
                var ids = map.call(items, function (item) {
                    var id = self.id(item);
                    localStorage.setItem(self.name + '/instance/' + id, JSON.stringify(item));
                    return id;
                });
                localStorage.setItem(this.name + '/set/' + setKey, JSON.stringify(ids));
                this.updateSets(sets);
            },
            _eachSet: function (cb) {
                var sets = this.getSetData();
                var self = this;
                var loop = function (setDatum, setKey) {
                    return cb.call(self, setDatum, setKey, function () {
                        if (!('items' in setDatum)) {
                            var ids = JSON.parse(localStorage.getItem(self.name + '/set/' + setKey));
                            setDatum.items = self.getInstances(ids);
                        }
                        return setDatum.items;
                    });
                };
                for (var setKey in sets) {
                    var setDatum = sets[setKey];
                    var result = loop(setDatum, setKey);
                    if (result !== undefined) {
                        return result;
                    }
                }
            },
            clear: function () {
                var sets = this.getSetData();
                for (var setKey in sets) {
                    localStorage.removeItem(this.name + '/set/' + setKey);
                }
                localStorage.removeItem(this.name + '-sets');
                var keys = [];
                for (var i = 0, len = localStorage.length; i < len; ++i) {
                    if (localStorage.key(i).indexOf(this.name + '/instance/') === 0) {
                        keys.push(localStorage.key(i));
                    }
                }
                forEach.call(keys, function (key) {
                    localStorage.removeItem(key);
                });
                this._instances = {};
            },
            getSets: function () {
                return Promise.resolve(this._getSets());
            },
            getListData: function (set) {
                set = set || {};
                var listData = this.getListDataSync(set);
                if (listData) {
                    return Promise.resolve(listData);
                }
                return Promise.reject({
                    message: 'no data',
                    error: 404
                });
            },
            getListDataSync: function (set) {
                var sets = this._getSets();
                for (var i = 0; i < sets.length; i++) {
                    var checkSet = sets[i];
                    if (canSet.subset(set, checkSet, this.algebra)) {
                        var items = canSet.getSubset(set, checkSet, this.__getListData(checkSet), this.algebra);
                        return { data: items };
                    }
                }
            },
            __getListData: function (set) {
                var setKey = sortedSetJSON(set);
                var setDatum = this.getSetData()[setKey];
                if (setDatum) {
                    var localData = localStorage.getItem(this.name + '/set/' + setKey);
                    if (localData) {
                        return this.getInstances(JSON.parse(localData));
                    }
                }
            },
            getData: function (params) {
                var id = this.id(params);
                var res = localStorage.getItem(this.name + '/instance/' + id);
                if (res) {
                    return Promise.resolve(JSON.parse(res));
                } else {
                    return Promise.reject({
                        message: 'no data',
                        error: 404
                    });
                }
            },
            updateListData: function (data, set) {
                set = set || {};
                var items = getItems(data);
                var sets = this.getSetData();
                var self = this;
                for (var setKey in sets) {
                    var setDatum = sets[setKey];
                    var union = canSet.union(setDatum.set, set, this.algebra);
                    if (union) {
                        return this.getListData(setDatum.set).then(function (setData) {
                            self.updateSet(setDatum, canSet.getUnion(setDatum.set, set, getItems(setData), items, this.algebra), union);
                        });
                    }
                }
                this.addSet(set, data);
                return Promise.resolve();
            },
            createData: function (props) {
                var self = this;
                var instance = this.updateInstance(props);
                this._eachSet(function (setDatum, setKey, getItems) {
                    if (canSet.has(setDatum.set, instance, this.algebra)) {
                        self.updateSet(setDatum, setAdd(self, setDatum.set, getItems(), instance, self.algebra), setDatum.set);
                    }
                });
                return Promise.resolve(assign({}, instance));
            },
            updateData: function (props) {
                var self = this;
                var instance = this.updateInstance(props);
                this._eachSet(function (setDatum, setKey, getItems) {
                    var items = getItems();
                    var index = indexOf(self, instance, items);
                    if (canSet.has(setDatum.set, instance, this.algebra)) {
                        if (index === -1) {
                            self.updateSet(setDatum, setAdd(self, setDatum.set, getItems(), instance, self.algebra));
                        } else {
                            items.splice(index, 1, instance);
                            self.updateSet(setDatum, items);
                        }
                    } else if (index !== -1) {
                        items.splice(index, 1);
                        self.updateSet(setDatum, items);
                    }
                });
                return Promise.resolve(assign({}, instance));
            },
            destroyData: function (props) {
                var self = this;
                var instance = this.updateInstance(props);
                this._eachSet(function (setDatum, setKey, getItems) {
                    var items = getItems();
                    var index = indexOf(self, instance, items);
                    if (index !== -1) {
                        items.splice(index, 1);
                        self.updateSet(setDatum, items);
                    }
                });
                var id = this.id(instance);
                localStorage.removeItem(this.name + '/instance/' + id);
                return Promise.resolve(assign({}, instance));
            }
        };
        return behavior;
    });
});
/*can-connect@1.2.0#helpers/clone-data*/
define('can-connect/helpers/clone-data', function (require, exports, module) {
    var isArray = require('can-util/js/is-array/is-array');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    module.exports = function (data) {
        return isArray(data) ? data.slice(0) : deepAssign({}, data);
    };
});
/*can-connect@1.2.0#data/memory-cache/memory-cache*/
define('can-connect/data/memory-cache/memory-cache', function (require, exports, module) {
    var getItems = require('can-connect/helpers/get-items');
    var connect = require('can-connect');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var canSet = require('can-set');
    var overwrite = require('can-connect/helpers/overwrite');
    var setAdd = require('can-connect/helpers/set-add');
    var indexOf = require('can-connect/helpers/get-index-by-id');
    var assign = require('can-util/js/assign/assign');
    var cloneData = require('can-connect/helpers/clone-data');
    module.exports = connect.behavior('data/memory-cache', function (baseConnection) {
        var behavior = {
            _sets: {},
            getSetData: function () {
                return this._sets;
            },
            __getListData: function (set) {
                var setsData = this.getSetData();
                var setData = setsData[sortedSetJSON(set)];
                if (setData) {
                    return setData.items;
                }
            },
            _instances: {},
            getInstance: function (id) {
                return this._instances[id];
            },
            removeSet: function (setKey, noUpdate) {
                var sets = this.getSetData();
                delete sets[setKey];
                if (noUpdate !== true) {
                    this.updateSets();
                }
            },
            updateSets: function () {
            },
            updateInstance: function (props) {
                var id = this.id(props);
                if (!(id in this._instances)) {
                    this._instances[id] = props;
                } else {
                    overwrite(this._instances[id], props, this.idProp);
                }
                return this._instances[id];
            },
            updateSet: function (setDatum, items, newSet) {
                var newSetKey = newSet ? sortedSetJSON(newSet) : setDatum.setKey;
                if (newSet) {
                    if (newSetKey !== setDatum.setKey) {
                        var sets = this.getSetData();
                        var oldSetKey = setDatum.setKey;
                        sets[newSetKey] = setDatum;
                        setDatum.setKey = newSetKey;
                        setDatum.set = assign({}, newSet);
                        this.removeSet(oldSetKey);
                    }
                }
                setDatum.items = items;
                var self = this;
                items.forEach(function (item) {
                    self.updateInstance(item);
                });
            },
            addSet: function (set, data) {
                var items = getItems(data);
                var sets = this.getSetData();
                var setKey = sortedSetJSON(set);
                sets[setKey] = {
                    setKey: setKey,
                    items: items,
                    set: assign({}, set)
                };
                var self = this;
                items.forEach(function (item) {
                    self.updateInstance(item);
                });
                this.updateSets();
            },
            _eachSet: function (cb) {
                var sets = this.getSetData();
                var self = this;
                var loop = function (setDatum, setKey) {
                    return cb.call(self, setDatum, setKey, function () {
                        return setDatum.items;
                    });
                };
                for (var setKey in sets) {
                    var setDatum = sets[setKey];
                    var result = loop(setDatum, setKey);
                    if (result !== undefined) {
                        return result;
                    }
                }
            },
            _getSets: function () {
                var sets = [], setsData = this.getSetData();
                for (var prop in setsData) {
                    sets.push(setsData[prop].set);
                }
                return sets;
            },
            getSets: function () {
                return Promise.resolve(this._getSets());
            },
            clear: function () {
                this._instances = {};
                this._sets = {};
            },
            getListData: function (set) {
                set = set || {};
                var listData = this.getListDataSync(set);
                if (listData) {
                    return Promise.resolve(listData);
                }
                return Promise.reject({
                    message: 'no data',
                    error: 404
                });
            },
            getListDataSync: function (set) {
                var sets = this._getSets();
                for (var i = 0; i < sets.length; i++) {
                    var checkSet = sets[i];
                    if (canSet.subset(set, checkSet, this.algebra)) {
                        var source = this.__getListData(checkSet);
                        var items = canSet.getSubset(set, checkSet, source, this.algebra);
                        return {
                            data: items,
                            count: source.length
                        };
                    }
                }
            },
            _getListData: function (set) {
                return this.getListDataSync(set);
            },
            updateListData: function (data, set) {
                set = set || {};
                var clonedData = cloneData(data);
                var items = getItems(clonedData);
                var sets = this.getSetData();
                var self = this;
                for (var setKey in sets) {
                    var setDatum = sets[setKey];
                    var union = canSet.union(setDatum.set, set, this.algebra);
                    if (union) {
                        var getSet = assign({}, setDatum.set);
                        return this.getListData(getSet).then(function (setData) {
                            self.updateSet(setDatum, canSet.getUnion(getSet, set, getItems(setData), items, self.algebra), union);
                        });
                    }
                }
                this.addSet(set, clonedData);
                return Promise.resolve();
            },
            getData: function (params) {
                var id = this.id(params);
                var res = this.getInstance(id);
                if (res) {
                    return Promise.resolve(res);
                } else {
                    return Promise.reject({
                        message: 'no data',
                        error: 404
                    });
                }
            },
            createData: function (props) {
                var self = this;
                var instance = this.updateInstance(props);
                this._eachSet(function (setDatum, setKey, getItems) {
                    if (canSet.has(setDatum.set, instance, this.algebra)) {
                        self.updateSet(setDatum, setAdd(self, setDatum.set, getItems(), instance, self.algebra), setDatum.set);
                    }
                });
                return Promise.resolve(assign({}, instance));
            },
            updateData: function (props) {
                var self = this;
                var instance = this.updateInstance(props);
                this._eachSet(function (setDatum, setKey, getItems) {
                    var items = getItems();
                    var index = indexOf(self, instance, items);
                    if (canSet.subset(instance, setDatum.set, this.algebra)) {
                        if (index === -1) {
                            self.updateSet(setDatum, setAdd(self, setDatum.set, getItems(), instance, self.algebra));
                        } else {
                            items.splice(index, 1, instance);
                            self.updateSet(setDatum, items);
                        }
                    } else if (index !== -1) {
                        items.splice(index, 1);
                        self.updateSet(setDatum, items);
                    }
                });
                return Promise.resolve(assign({}, instance));
            },
            destroyData: function (props) {
                var self = this;
                this._eachSet(function (setDatum, setKey, getItems) {
                    var items = getItems();
                    var index = indexOf(self, props, items);
                    if (index !== -1) {
                        items.splice(index, 1);
                        self.updateSet(setDatum, items);
                    }
                });
                var id = this.id(props);
                delete this._instances[id];
                return Promise.resolve(assign({}, props));
            }
        };
        return behavior;
    });
});
/*can-connect@1.2.0#data/parse/parse*/
define('can-connect/data/parse/parse', function (require, exports, module) {
    var connect = require('can-connect');
    var each = require('can-util/js/each/each');
    var isArray = require('can-util/js/is-array/is-array');
    var getObject = require('can-util/js/get/get');
    module.exports = connect.behavior('data/parse', function (baseConnection) {
        var behavior = {
            parseListData: function (responseData) {
                if (baseConnection.parseListData) {
                    responseData = baseConnection.parseListData.apply(this, arguments);
                }
                var result;
                if (isArray(responseData)) {
                    result = { data: responseData };
                } else {
                    var prop = this.parseListProp || 'data';
                    responseData.data = getObject(responseData, prop);
                    result = responseData;
                    if (prop !== 'data') {
                        delete responseData[prop];
                    }
                    if (!isArray(result.data)) {
                        throw new Error('Could not get any raw data while converting using .parseListData');
                    }
                }
                var arr = [];
                for (var i = 0; i < result.data.length; i++) {
                    arr.push(this.parseInstanceData(result.data[i]));
                }
                result.data = arr;
                return result;
            },
            parseInstanceData: function (props) {
                if (baseConnection.parseInstanceData) {
                    props = baseConnection.parseInstanceData.apply(this, arguments) || props;
                }
                return this.parseInstanceProp ? getObject(props, this.parseInstanceProp) || props : props;
            }
        };
        each(pairs, function (parseFunction, name) {
            behavior[name] = function (params) {
                var self = this;
                return baseConnection[name].call(this, params).then(function () {
                    return self[parseFunction].apply(self, arguments);
                });
            };
        });
        return behavior;
    });
    var pairs = {
        getListData: 'parseListData',
        getData: 'parseInstanceData',
        createData: 'parseInstanceData',
        updateData: 'parseInstanceData',
        destroyData: 'parseInstanceData'
    };
});
/*can-util@3.2.2#dom/ajax/ajax*/
define('can-util/dom/ajax/ajax', function (require, exports, module) {
    (function (global) {
        var Global = require('can-util/js/global/global');
        var assign = require('can-util/js/assign/assign');
        var namespace = require('can-namespace');
        var parseURI = require('can-util/js/parse-uri/parse-uri');
        var xhrs = [
                function () {
                    return new XMLHttpRequest();
                },
                function () {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                },
                function () {
                    return new ActiveXObject('MSXML2.XMLHTTP.3.0');
                },
                function () {
                    return new ActiveXObject('MSXML2.XMLHTTP');
                }
            ], _xhrf = null;
        var originUrl = parseURI(Global().location.href);
        var $ = {};
        $.xhr = function () {
            if (_xhrf != null) {
                return _xhrf();
            }
            for (var i = 0, l = xhrs.length; i < l; i++) {
                try {
                    var f = xhrs[i], req = f();
                    if (req != null) {
                        _xhrf = f;
                        return req;
                    }
                } catch (e) {
                    continue;
                }
            }
            return function () {
            };
        };
        $._xhrResp = function (xhr, options) {
            switch (options.dataType || xhr.getResponseHeader('Content-Type').split(';')[0]) {
            case 'text/xml':
            case 'xml':
                return xhr.responseXML;
            case 'text/json':
            case 'application/json':
            case 'text/javascript':
            case 'application/javascript':
            case 'application/x-javascript':
            case 'json':
                return JSON.parse(xhr.responseText);
            default:
                return xhr.responseText;
            }
        };
        $._formData = function (o) {
            var kvps = [], regEx = /%20/g;
            for (var k in o) {
                kvps.push(encodeURIComponent(k).replace(regEx, '+') + '=' + encodeURIComponent(o[k].toString()).replace(regEx, '+'));
            }
            return kvps.join('&');
        };
        module.exports = namespace.ajax = function (o) {
            var xhr = $.xhr(), timer, n = 0;
            var deferred = {};
            var promise = new Promise(function (resolve, reject) {
                deferred.resolve = resolve;
                deferred.reject = reject;
            });
            var requestUrl;
            promise.abort = function () {
                xhr.abort();
            };
            o = assign({
                userAgent: 'XMLHttpRequest',
                lang: 'en',
                type: 'GET',
                data: null,
                dataType: 'json'
            }, o);
            if (o.crossDomain == null) {
                try {
                    requestUrl = parseURI(o.url);
                    o.crossDomain = !!(requestUrl.protocol && requestUrl.protocol !== originUrl.protocol || requestUrl.host && requestUrl.host !== originUrl.host);
                } catch (e) {
                    o.crossDomain = true;
                }
            }
            if (o.timeout) {
                timer = setTimeout(function () {
                    xhr.abort();
                    if (o.timeoutFn) {
                        o.timeoutFn(o.url);
                    }
                }, o.timeout);
            }
            xhr.onreadystatechange = function () {
                try {
                    if (xhr.readyState === 4) {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        if (xhr.status < 300) {
                            if (o.success) {
                                o.success($._xhrResp(xhr, o));
                            }
                        } else if (o.error) {
                            o.error(xhr, xhr.status, xhr.statusText);
                        }
                        if (o.complete) {
                            o.complete(xhr, xhr.statusText);
                        }
                        if (xhr.status >= 200 && xhr.status < 300) {
                            deferred.resolve($._xhrResp(xhr, o));
                        } else {
                            deferred.reject(xhr);
                        }
                    } else if (o.progress) {
                        o.progress(++n);
                    }
                } catch (e) {
                    deferred.reject(e);
                }
            };
            var url = o.url, data = null, type = o.type.toUpperCase();
            var isPost = type === 'POST' || type === 'PUT';
            if (!isPost && o.data) {
                url += '?' + $._formData(o.data);
            }
            xhr.open(type, url);
            if (isPost) {
                var isJson = o.dataType.indexOf('json') >= 0;
                data = isJson && !o.crossDomain ? typeof o.data === 'object' ? JSON.stringify(o.data) : o.data : $._formData(o.data);
                xhr.setRequestHeader('Content-Type', isJson && !o.crossDomain ? 'application/json' : 'application/x-www-form-urlencoded');
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(data);
            return promise;
        };
    }(function () {
        return this;
    }()));
});
/*can-connect@1.2.0#helpers/get-id-props*/
define('can-connect/helpers/get-id-props', function (require, exports, module) {
    module.exports = function (connection) {
        var ids = [], algebra = this.algebra;
        if (algebra && algebra.clauses && algebra.clauses.id) {
            for (var prop in algebra.clauses.id) {
                ids.push(prop);
            }
        }
        if (connection.idProp && !ids.length) {
            ids.push(connection.idProp);
        }
        if (!ids.length) {
            ids.push('id');
        }
        return ids;
    };
});
/*can-util@3.2.2#js/is-promise-like/is-promise-like*/
define('can-util/js/is-promise-like/is-promise-like', function (require, exports, module) {
    module.exports = function (obj) {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    };
});
/*can-util@3.2.2#js/is-promise/is-promise*/
define('can-util/js/is-promise/is-promise', function (require, exports, module) {
    var types = require('can-types');
    module.exports = function (obj) {
        return types.isPromise(obj);
    };
});
/*can-util@3.2.2#js/make-promise/make-promise*/
define('can-util/js/make-promise/make-promise', function (require, exports, module) {
    var isPromiseLike = require('can-util/js/is-promise-like/is-promise-like');
    var isPromise = require('can-util/js/is-promise/is-promise');
    module.exports = function (obj) {
        if (isPromiseLike(obj) && !isPromise(obj)) {
            return new Promise(function (resolve, reject) {
                obj.then(resolve, reject);
            });
        } else {
            return obj;
        }
    };
});
/*can-connect@1.2.0#data/url/url*/
define('can-connect/data/url/url', function (require, exports, module) {
    var isArray = require('can-util/js/is-array/is-array');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var ajax = require('can-util/dom/ajax/ajax');
    var string = require('can-util/js/string/string');
    var getIdProps = require('can-connect/helpers/get-id-props');
    var dev = require('can-util/js/dev/dev');
    var connect = require('can-connect');
    var makePromise = require('can-util/js/make-promise/make-promise');
    module.exports = connect.behavior('data/url', function (baseConnection) {
        var behavior = {};
        each(pairs, function (reqOptions, name) {
            behavior[name] = function (params) {
                if (typeof this.url === 'object') {
                    if (typeof this.url[reqOptions.prop] === 'function') {
                        return makePromise(this.url[reqOptions.prop](params));
                    } else if (this.url[reqOptions.prop]) {
                        return makePromise(makeAjax(this.url[reqOptions.prop], params, reqOptions.type, this.ajax || ajax, findContentType(this.url), reqOptions));
                    }
                }
                var resource = typeof this.url === 'string' ? this.url : this.url.resource;
                if (resource) {
                    var idProps = getIdProps(this);
                    return makePromise(makeAjax(createURLFromResource(resource, idProps[0], reqOptions.prop), params, reqOptions.type, this.ajax || ajax, findContentType(this.url), reqOptions));
                }
                return baseConnection[name].call(this, params);
            };
        });
        return behavior;
    });
    var pairs = {
        getListData: {
            prop: 'getListData',
            type: 'GET'
        },
        getData: {
            prop: 'getData',
            type: 'GET'
        },
        createData: {
            prop: 'createData',
            type: 'POST'
        },
        updateData: {
            prop: 'updateData',
            type: 'PUT'
        },
        destroyData: {
            prop: 'destroyData',
            type: 'DELETE',
            includeData: false
        }
    };
    var findContentType = function (url) {
        if (typeof url === 'object' && url.contentType) {
            var acceptableType = url.contentType === 'application/x-www-form-urlencoded' || url.contentType === 'application/json';
            if (acceptableType) {
                return url.contentType;
            } else {
                dev.warn('Unacceptable contentType on can-connect request. ' + 'Use \'application/json\' or \'application/x-www-form-urlencoded\'');
            }
        }
        return 'application/json';
    };
    var makeAjax = function (ajaxOb, data, type, ajax, contentType, reqOptions) {
        var params = {};
        if (typeof ajaxOb === 'string') {
            var parts = ajaxOb.split(/\s+/);
            params.url = parts.pop();
            if (parts.length) {
                params.type = parts.pop();
            }
        } else {
            assign(params, ajaxOb);
        }
        params.data = typeof data === 'object' && !isArray(data) ? assign(params.data || {}, data) : data;
        params.url = string.sub(params.url, params.data, true);
        var encodeJSON = contentType !== 'application/x-www-form-urlencoded' && (type && (type === 'POST' || type === 'PUT'));
        if (encodeJSON) {
            params.data = JSON.stringify(params.data);
            params.contentType = contentType;
        }
        if (reqOptions.includeData === false) {
            delete params.data;
        }
        return ajax(assign({
            type: type || 'post',
            dataType: 'json'
        }, params));
    };
    var createURLFromResource = function (resource, idProp, name) {
        var url = resource.replace(/\/+$/, '');
        if (name === 'getListData' || name === 'createData') {
            return url;
        } else {
            return url + '/{' + idProp + '}';
        }
    };
});
/*can-connect@1.2.0#fall-through-cache/fall-through-cache*/
define('can-connect/fall-through-cache/fall-through-cache', function (require, exports, module) {
    var connect = require('can-connect');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    module.exports = connect.behavior('fall-through-cache', function (baseConnection) {
        var behavior = {
            hydrateList: function (listData, set) {
                set = set || this.listSet(listData);
                var id = sortedSetJSON(set);
                var list = baseConnection.hydrateList.call(this, listData, set);
                if (this._getHydrateListCallbacks[id]) {
                    this._getHydrateListCallbacks[id].shift()(list);
                    if (!this._getHydrateListCallbacks[id].length) {
                        delete this._getHydrateListCallbacks[id];
                    }
                }
                return list;
            },
            _getHydrateListCallbacks: {},
            _getHydrateList: function (set, callback) {
                var id = sortedSetJSON(set);
                if (!this._getHydrateListCallbacks[id]) {
                    this._getHydrateListCallbacks[id] = [];
                }
                this._getHydrateListCallbacks[id].push(callback);
            },
            getListData: function (set) {
                set = set || {};
                var self = this;
                return this.cacheConnection.getListData(set).then(function (data) {
                    self._getHydrateList(set, function (list) {
                        self.addListReference(list, set);
                        setTimeout(function () {
                            baseConnection.getListData.call(self, set).then(function (listData) {
                                self.cacheConnection.updateListData(listData, set);
                                self.updatedList(list, listData, set);
                                self.deleteListReference(list, set);
                            }, function (e) {
                                console.log('REJECTED', e);
                            });
                        }, 1);
                    });
                    return data;
                }, function () {
                    var listData = baseConnection.getListData.call(self, set);
                    listData.then(function (listData) {
                        self.cacheConnection.updateListData(listData, set);
                    });
                    return listData;
                });
            },
            hydrateInstance: function (props) {
                var id = this.id(props);
                var instance = baseConnection.hydrateInstance.apply(this, arguments);
                if (this._getMakeInstanceCallbacks[id]) {
                    this._getMakeInstanceCallbacks[id].shift()(instance);
                    if (!this._getMakeInstanceCallbacks[id].length) {
                        delete this._getMakeInstanceCallbacks[id];
                    }
                }
                return instance;
            },
            _getMakeInstanceCallbacks: {},
            _getMakeInstance: function (id, callback) {
                if (!this._getMakeInstanceCallbacks[id]) {
                    this._getMakeInstanceCallbacks[id] = [];
                }
                this._getMakeInstanceCallbacks[id].push(callback);
            },
            getData: function (params) {
                var self = this;
                return this.cacheConnection.getData(params).then(function (instanceData) {
                    self._getMakeInstance(self.id(instanceData) || self.id(params), function (instance) {
                        self.addInstanceReference(instance);
                        setTimeout(function () {
                            baseConnection.getData.call(self, params).then(function (instanceData2) {
                                self.cacheConnection.updateData(instanceData2);
                                self.updatedInstance(instance, instanceData2);
                                self.deleteInstanceReference(instance);
                            }, function (e) {
                                console.log('REJECTED', e);
                            });
                        }, 1);
                    });
                    return instanceData;
                }, function () {
                    var listData = baseConnection.getData.call(self, params);
                    listData.then(function (instanceData) {
                        self.cacheConnection.updateData(instanceData);
                    });
                    return listData;
                });
            }
        };
        return behavior;
    });
});
/*can-connect@1.2.0#real-time/real-time*/
define('can-connect/real-time/real-time', function (require, exports, module) {
    var connect = require('can-connect');
    var canSet = require('can-set');
    var setAdd = require('can-connect/helpers/set-add');
    var indexOf = require('can-connect/helpers/get-index-by-id');
    var canDev = require('can-util/js/dev/dev');
    module.exports = connect.behavior('real-time', function (baseConnection) {
        return {
            createInstance: function (props) {
                var id = this.id(props);
                var instance = this.instanceStore.get(id);
                var serialized;
                if (instance) {
                    return this.updateInstance(props);
                } else {
                    instance = this.hydrateInstance(props);
                    serialized = this.serializeInstance(instance);
                    var self = this;
                    this.addInstanceReference(instance);
                    return Promise.resolve(this.createdData(props, serialized)).then(function () {
                        self.deleteInstanceReference(instance);
                        return instance;
                    });
                }
            },
            createdData: function (props, params, cid) {
                var instance;
                if (cid !== undefined) {
                    instance = this.cidStore.get(cid);
                } else {
                    instance = this.instanceStore.get(this.id(props));
                }
                this.addInstanceReference(instance, this.id(props));
                this.createdInstance(instance, props);
                create.call(this, this.serializeInstance(instance));
                this.deleteInstanceReference(instance);
                return undefined;
            },
            updatedData: function (props, params) {
                var instance = this.instanceStore.get(this.id(params));
                this.updatedInstance(instance, props);
                update.call(this, this.serializeInstance(instance));
                return undefined;
            },
            updateInstance: function (props) {
                var id = this.id(props);
                var instance = this.instanceStore.get(id);
                if (!instance) {
                    instance = this.hydrateInstance(props);
                }
                this.addInstanceReference(instance);
                var serialized = this.serializeInstance(instance), self = this;
                return Promise.resolve(this.updatedData(props, serialized)).then(function () {
                    self.deleteInstanceReference(instance);
                    return instance;
                });
            },
            destroyedData: function (props, params) {
                var id = this.id(params || props);
                var instance = this.instanceStore.get(id);
                if (!instance) {
                    instance = this.hydrateInstance(props);
                }
                var serialized = this.serializeInstance(instance);
                this.destroyedInstance(instance, props);
                destroy.call(this, serialized);
                return undefined;
            },
            destroyInstance: function (props) {
                var id = this.id(props);
                var instance = this.instanceStore.get(id);
                if (!instance) {
                    instance = this.hydrateInstance(props);
                }
                this.addInstanceReference(instance);
                var serialized = this.serializeInstance(instance), self = this;
                return Promise.resolve(this.destroyedData(props, serialized)).then(function () {
                    self.deleteInstanceReference(instance);
                    return instance;
                });
            },
            gotListData: function (items, set) {
                var self = this;
                if (this.algebra) {
                    for (var item, i = 0, l = items.data.length; i < l; i++) {
                        item = items.data[i];
                        if (!self.algebra.has(set, item)) {
                            var msg = 'One or more items were retrieved which do not match the \'Set\' parameters used to load them. ' + 'Read the docs for more information: http://v3.canjs.com/doc/can-set.html#SolvingCommonIssues' + '\n\nBelow are the \'Set\' parameters:' + '\n' + JSON.stringify(set, null, '  ') + '\n\nAnd below is an item which does not match those parameters:' + '\n' + JSON.stringify(item, null, '  ');
                            canDev.warn(msg);
                            break;
                        }
                    }
                }
                return Promise.resolve(items);
            }
        };
    });
    var create = function (props) {
        var self = this;
        this.listStore.forEach(function (list, id) {
            var set = JSON.parse(id);
            var index = indexOf(self, props, list);
            if (canSet.has(set, props, self.algebra)) {
                if (index === -1) {
                    var items = self.serializeList(list);
                    self.updatedList(list, { data: setAdd(self, set, items, props, self.algebra) }, set);
                } else {
                }
            }
        });
    };
    var update = function (props) {
        var self = this;
        this.listStore.forEach(function (list, id) {
            var items;
            var set = JSON.parse(id);
            var index = indexOf(self, props, list);
            if (canSet.has(set, props, self.algebra)) {
                items = self.serializeList(list);
                if (index === -1) {
                    self.updatedList(list, { data: setAdd(self, set, items, props, self.algebra) }, set);
                } else {
                    var sortedIndex = canSet.index(set, items, props, self.algebra);
                    if (sortedIndex !== undefined && sortedIndex !== index) {
                        var copy = items.slice(0);
                        if (index < sortedIndex) {
                            copy.splice(sortedIndex, 0, props);
                            copy.splice(index, 1);
                        } else {
                            copy.splice(index, 1);
                            copy.splice(sortedIndex, 0, props);
                        }
                        self.updatedList(list, { data: copy }, set);
                    }
                }
            } else if (index !== -1) {
                items = self.serializeList(list);
                items.splice(index, 1);
                self.updatedList(list, { data: items }, set);
            }
        });
    };
    var destroy = function (props) {
        var self = this;
        this.listStore.forEach(function (list, id) {
            var set = JSON.parse(id);
            var index = indexOf(self, props, list);
            if (index !== -1) {
                var items = self.serializeList(list);
                items.splice(index, 1);
                self.updatedList(list, { data: items }, set);
            }
        });
    };
});
/*can-connect@1.2.0#can/map/map*/
define('can-connect/can/map/map', function (require, exports, module) {
    'use strict';
    var each = require('can-util/js/each/each');
    var connect = require('can-connect');
    var canBatch = require('can-event/batch/batch');
    var canEvent = require('can-event');
    var Observation = require('can-observation');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var isArray = require('can-util/js/is-array/is-array');
    var types = require('can-types');
    var each = require('can-util/js/each/each');
    var isFunction = require('can-util/js/is-function/is-function');
    var dev = require('can-util/js/dev/dev');
    var setExpando = function (map, prop, value) {
        if ('attr' in map) {
            map[prop] = value;
        } else {
            map._data[prop] = value;
        }
    };
    var getExpando = function (map, prop) {
        if ('attr' in map) {
            return map[prop];
        } else {
            return map._data[prop];
        }
    };
    var canMapBehavior = connect.behavior('can/map', function (baseConnection) {
        var behavior = {
            init: function () {
                this.Map = this.Map || types.DefaultMap.extend({});
                this.List = this.List || types.DefaultList.extend({});
                overwrite(this, this.Map, mapOverwrites, mapStaticOverwrites);
                overwrite(this, this.List, listPrototypeOverwrites, listStaticOverwrites);
                baseConnection.init.apply(this, arguments);
            },
            id: function (instance) {
                if (!isPlainObject(instance)) {
                    var ids = [], algebra = this.algebra;
                    if (algebra && algebra.clauses && algebra.clauses.id) {
                        for (var prop in algebra.clauses.id) {
                            ids.push(readObservabe(instance, prop));
                        }
                    }
                    if (this.idProp && !ids.length) {
                        ids.push(readObservabe(instance, this.idProp));
                    }
                    if (!ids.length) {
                        ids.push(readObservabe(instance, 'id'));
                    }
                    return ids.length > 1 ? ids.join('@|@') : ids[0];
                } else {
                    return baseConnection.id(instance);
                }
            },
            serializeInstance: function (instance) {
                return instance.serialize();
            },
            serializeList: function (list) {
                return list.serialize();
            },
            instance: function (props) {
                var _Map = this.Map || types.DefaultMap;
                return new _Map(props);
            },
            list: function (listData, set) {
                var _List = this.List || this.Map && this.Map.List || types.DefaultList;
                var list = new _List(listData.data);
                each(listData, function (val, prop) {
                    if (prop !== 'data') {
                        list[list.set ? 'set' : 'attr'](prop, val);
                    }
                });
                list.__listSet = set;
                return list;
            },
            updatedList: function () {
                canBatch.start();
                var res = baseConnection.updatedList.apply(this, arguments);
                canBatch.stop();
                return res;
            },
            save: function (instance) {
                setExpando(instance, '_saving', true);
                canEvent.dispatch.call(instance, '_saving', [
                    true,
                    false
                ]);
                var done = function () {
                    setExpando(instance, '_saving', false);
                    canEvent.dispatch.call(instance, '_saving', [
                        false,
                        true
                    ]);
                };
                var base = baseConnection.save.apply(this, arguments);
                base.then(done, done);
                return base;
            },
            destroy: function (instance) {
                setExpando(instance, '_destroying', true);
                canEvent.dispatch.call(instance, '_destroying', [
                    true,
                    false
                ]);
                var done = function () {
                    setExpando(instance, '_destroying', false);
                    canEvent.dispatch.call(instance, '_destroying', [
                        false,
                        true
                    ]);
                };
                var base = baseConnection.destroy.apply(this, arguments);
                base.then(done, done);
                return base;
            }
        };
        each([
            'created',
            'updated',
            'destroyed'
        ], function (funcName) {
            behavior[funcName + 'Instance'] = function (instance, props) {
                if (props && typeof props === 'object') {
                    if ('set' in instance) {
                        instance.set(isFunction(props.get) ? props.get() : props, this.constructor.removeAttr || false);
                    } else if ('attr' in instance) {
                        instance.attr(isFunction(props.attr) ? props.attr() : props, this.constructor.removeAttr || false);
                    } else {
                        canBatch.start();
                        each(props, function (value, prop) {
                            instance[prop] = value;
                        });
                        canBatch.stop();
                    }
                }
                canMapBehavior.callbackInstanceEvents(funcName, instance);
            };
        });
        return behavior;
    });
    canMapBehavior.callbackInstanceEvents = function (funcName, instance) {
        var constructor = instance.constructor;
        canEvent.dispatch.call(instance, {
            type: funcName,
            target: instance
        });
        if (this.id) {
            dev.log('can-connect/can/map/map.js - ' + (constructor.shortName || this.name) + ' ' + this.id(instance) + ' ' + funcName);
        }
        canEvent.dispatch.call(constructor, funcName, [instance]);
    };
    var callCanReadingOnIdRead = true;
    var mapStaticOverwrites = {
        getList: function (base, connection) {
            return function (set) {
                return connection.getList(set);
            };
        },
        findAll: function (base, connection) {
            return function (set) {
                return connection.getList(set);
            };
        },
        get: function (base, connection) {
            return function (params) {
                return connection.get(params);
            };
        },
        findOne: function (base, connection) {
            return function (params) {
                return connection.get(params);
            };
        }
    };
    var mapOverwrites = {
        _eventSetup: function (base, connection) {
            return function () {
                callCanReadingOnIdRead = false;
                connection.addInstanceReference(this);
                callCanReadingOnIdRead = true;
                return base.apply(this, arguments);
            };
        },
        _eventTeardown: function (base, connection) {
            return function () {
                callCanReadingOnIdRead = false;
                connection.deleteInstanceReference(this);
                callCanReadingOnIdRead = true;
                return base.apply(this, arguments);
            };
        },
        ___set: function (base, connection) {
            return function (prop, val) {
                base.apply(this, arguments);
                if (prop === connection.idProp && this._bindings) {
                    connection.addInstanceReference(this);
                }
            };
        },
        isNew: function (base, connection) {
            return function () {
                var id = connection.id(this);
                return !(id || id === 0);
            };
        },
        isSaving: function (base, connection) {
            return function () {
                Observation.add(this, '_saving');
                return !!getExpando(this, '_saving');
            };
        },
        isDestroying: function (base, connection) {
            return function () {
                Observation.add(this, '_destroying');
                return !!getExpando(this, '_destroying');
            };
        },
        save: function (base, connection) {
            return function (success, error) {
                var promise = connection.save(this);
                promise.then(success, error);
                return promise;
            };
        },
        destroy: function (base, connection) {
            return function (success, error) {
                var promise;
                if (this.isNew()) {
                    promise = Promise.resolve(this);
                    connection.destroyedInstance(this, {});
                } else {
                    promise = connection.destroy(this);
                }
                promise.then(success, error);
                return promise;
            };
        }
    };
    var listPrototypeOverwrites = {
        setup: function (base, connection) {
            return function (params) {
                if (isPlainObject(params) && !isArray(params)) {
                    this.__listSet = params;
                    base.apply(this);
                    this.replace(types.isPromise(params) ? params : connection.getList(params));
                } else {
                    base.apply(this, arguments);
                }
            };
        },
        _eventSetup: function (base, connection) {
            return function () {
                connection.addListReference(this);
                if (base) {
                    return base.apply(this, arguments);
                }
            };
        },
        _eventTeardown: function (base, connection) {
            return function () {
                connection.deleteListReference(this);
                if (base) {
                    return base.apply(this, arguments);
                }
            };
        }
    };
    var listStaticOverwrites = {
        _bubbleRule: function (base, connection) {
            return function (eventName, list) {
                var bubbleRules = base(eventName, list);
                bubbleRules.push('destroyed');
                return bubbleRules;
            };
        }
    };
    var readObservabe = function (instance, prop) {
        if ('__get' in instance) {
            if (callCanReadingOnIdRead) {
                Observation.add(instance, prop);
            }
            return instance.__get(prop);
        } else {
            if (callCanReadingOnIdRead) {
                return instance[prop];
            } else {
                return Observation.ignore(function () {
                    return instance[prop];
                })();
            }
        }
    };
    var overwrite = function (connection, Constructor, prototype, statics) {
        var prop;
        for (prop in prototype) {
            Constructor.prototype[prop] = prototype[prop](Constructor.prototype[prop], connection);
        }
        if (statics) {
            for (prop in statics) {
                Constructor[prop] = statics[prop](Constructor[prop], connection);
            }
        }
    };
    module.exports = canMapBehavior;
});
/*can-util@3.2.2#js/defaults/defaults*/
define('can-util/js/defaults/defaults', function (require, exports, module) {
    module.exports = function (target) {
        var length = arguments.length;
        for (var i = 1; i < length; i++) {
            for (var prop in arguments[i]) {
                if (target[prop] === undefined) {
                    target[prop] = arguments[i][prop];
                }
            }
        }
        return target;
    };
});
/*can-define@1.0.15#can-define*/
define('can-define', function (require, exports, module) {
    'use strict';
    'format cjs';
    var event = require('can-event');
    var eventLifecycle = require('can-event/lifecycle/lifecycle');
    var canBatch = require('can-event/batch/batch');
    var canEvent = require('can-event');
    var compute = require('can-compute');
    var Observation = require('can-observation');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var assign = require('can-util/js/assign/assign');
    var dev = require('can-util/js/dev/dev');
    var CID = require('can-cid');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var isArray = require('can-util/js/is-array/is-array');
    var types = require('can-types');
    var each = require('can-util/js/each/each');
    var defaults = require('can-util/js/defaults/defaults');
    var ns = require('can-namespace');
    var eventsProto, define, make, makeDefinition, replaceWith, getDefinitionsAndMethods, isDefineType, getDefinitionOrMethod;
    var defineConfigurableAndNotEnumerable = function (obj, prop, value) {
        Object.defineProperty(obj, prop, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value
        });
    };
    var eachPropertyDescriptor = function (map, cb) {
        for (var prop in map) {
            if (map.hasOwnProperty(prop)) {
                cb(prop, Object.getOwnPropertyDescriptor(map, prop));
            }
        }
    };
    module.exports = define = ns.define = function (objPrototype, defines, baseDefine) {
        var dataInitializers = Object.create(baseDefine ? baseDefine.dataInitializers : null), computedInitializers = Object.create(baseDefine ? baseDefine.computedInitializers : null);
        var result = getDefinitionsAndMethods(defines, baseDefine);
        result.dataInitializers = dataInitializers;
        result.computedInitializers = computedInitializers;
        each(result.definitions, function (definition, property) {
            define.property(objPrototype, property, definition, dataInitializers, computedInitializers);
        });
        replaceWith(objPrototype, '_data', function () {
            var map = this;
            var data = {};
            for (var prop in dataInitializers) {
                replaceWith(data, prop, dataInitializers[prop].bind(map), true);
            }
            return data;
        });
        replaceWith(objPrototype, '_computed', function () {
            var map = this;
            var data = {};
            for (var prop in computedInitializers) {
                replaceWith(data, prop, computedInitializers[prop].bind(map));
            }
            return data;
        });
        for (var prop in eventsProto) {
            Object.defineProperty(objPrototype, prop, {
                enumerable: false,
                value: eventsProto[prop],
                configurable: true,
                writable: true
            });
        }
        Object.defineProperty(objPrototype, '_define', {
            enumerable: false,
            value: result,
            configurable: true,
            writable: true
        });
        if (!objPrototype[types.iterator]) {
            defineConfigurableAndNotEnumerable(objPrototype, types.iterator, function () {
                return new define.Iterator(this);
            });
        }
        return result;
    };
    define.extensions = function () {
    };
    var onlyType = function (obj) {
        for (var prop in obj) {
            if (prop !== 'type') {
                return false;
            }
        }
        return true;
    };
    define.property = function (objPrototype, prop, definition, dataInitializers, computedInitializers) {
        var propertyDefinition = define.extensions.apply(this, arguments);
        if (propertyDefinition) {
            definition = propertyDefinition;
        }
        var type = definition.type;
        if (type && onlyType(definition) && type === define.types['*']) {
            Object.defineProperty(objPrototype, prop, {
                get: make.get.data(prop),
                set: make.set.events(prop, make.get.data(prop), make.set.data(prop), make.eventType.data(prop)),
                enumerable: true
            });
            return;
        }
        definition.type = type;
        var dataProperty = definition.get ? 'computed' : 'data', reader = make.read[dataProperty](prop), getter = make.get[dataProperty](prop), setter = make.set[dataProperty](prop), getInitialValue;
        var typeConvert = function (val) {
            return val;
        };
        if (definition.Type) {
            typeConvert = make.set.Type(prop, definition.Type, typeConvert);
        }
        if (type) {
            typeConvert = make.set.type(prop, type, typeConvert);
        }
        var eventsSetter = make.set.events(prop, reader, setter, make.eventType[dataProperty](prop));
        if (definition.value !== undefined || definition.Value !== undefined) {
            getInitialValue = make.get.defaultValue(prop, definition, typeConvert, eventsSetter);
        }
        if (definition.get) {
            computedInitializers[prop] = make.compute(prop, definition.get, getInitialValue);
        } else if (getInitialValue) {
            dataInitializers[prop] = getInitialValue;
        }
        if (definition.get && definition.set) {
            setter = make.set.setter(prop, definition.set, make.read.lastSet(prop), setter, true);
        } else if (definition.set) {
            setter = make.set.setter(prop, definition.set, reader, eventsSetter, false);
        } else if (!definition.get) {
            setter = eventsSetter;
        }
        if (type) {
            setter = make.set.type(prop, type, setter);
        }
        if (definition.Type) {
            setter = make.set.Type(prop, definition.Type, setter);
        }
        Object.defineProperty(objPrototype, prop, {
            get: getter,
            set: setter,
            enumerable: 'serialize' in definition ? !!definition.serialize : !definition.get
        });
    };
    define.Constructor = function (defines) {
        var constructor = function (props) {
            define.setup.call(this, props);
        };
        define(constructor.prototype, defines);
        return constructor;
    };
    make = {
        compute: function (prop, get, defaultValueFn) {
            return function () {
                var map = this, defaultValue = defaultValueFn && defaultValueFn.call(this), computeFn;
                if (defaultValue) {
                    computeFn = defaultValue.isComputed ? defaultValue : compute.async(defaultValue, get, map);
                } else {
                    computeFn = compute.async(defaultValue, get, map);
                }
                return {
                    compute: computeFn,
                    count: 0,
                    handler: function (ev, newVal, oldVal) {
                        canEvent.dispatch.call(map, {
                            type: prop,
                            target: map
                        }, [
                            newVal,
                            oldVal
                        ]);
                    }
                };
            };
        },
        set: {
            data: function (prop) {
                return function (newVal) {
                    this._data[prop] = newVal;
                };
            },
            computed: function (prop) {
                return function (val) {
                    this._computed[prop].compute(val);
                };
            },
            events: function (prop, getCurrent, setData, eventType) {
                return function (newVal) {
                    var current = getCurrent.call(this);
                    if (newVal !== current) {
                        setData.call(this, newVal);
                        canEvent.dispatch.call(this, {
                            type: prop,
                            target: this
                        }, [
                            newVal,
                            current
                        ]);
                    }
                };
            },
            setter: function (prop, setter, getCurrent, setEvents, hasGetter) {
                return function (value) {
                    var asyncTimer;
                    var self = this;
                    canBatch.start();
                    var setterCalled = false, current = getCurrent.call(this), setValue = setter.call(this, value, function (value) {
                            setEvents.call(self, value);
                            setterCalled = true;
                            clearTimeout(asyncTimer);
                        }, current);
                    if (setterCalled) {
                        canBatch.stop();
                    } else {
                        if (hasGetter) {
                            if (setValue !== undefined) {
                                if (current !== setValue) {
                                    setEvents.call(this, setValue);
                                }
                                canBatch.stop();
                            } else if (setter.length === 0) {
                                setEvents.call(this, value);
                                canBatch.stop();
                                return;
                            } else if (setter.length === 1) {
                                canBatch.stop();
                            } else {
                                asyncTimer = setTimeout(function () {
                                    dev.warn('can/map/setter.js: Setter "' + prop + '" did not return a value or call the setter callback.');
                                }, dev.warnTimeout);
                                canBatch.stop();
                                return;
                            }
                        } else {
                            if (setValue !== undefined) {
                                setEvents.call(this, setValue);
                                canBatch.stop();
                            } else if (setter.length === 0) {
                                setEvents.call(this, value);
                                canBatch.stop();
                                return;
                            } else if (setter.length === 1) {
                                setEvents.call(this, undefined);
                                canBatch.stop();
                            } else {
                                asyncTimer = setTimeout(function () {
                                    dev.warn('can/map/setter.js: Setter "' + prop + '" did not return a value or call the setter callback.');
                                }, dev.warnTimeout);
                                canBatch.stop();
                                return;
                            }
                        }
                    }
                };
            },
            type: function (prop, type, set) {
                if (typeof type === 'object') {
                    return make.set.Type(prop, type, set);
                } else {
                    return function (newValue) {
                        return set.call(this, type.call(this, newValue, prop));
                    };
                }
            },
            Type: function (prop, Type, set) {
                if (isArray(Type) && types.DefineList) {
                    Type = types.DefineList.extend({ '#': Type[0] });
                } else if (typeof Type === 'object') {
                    if (types.DefineMap) {
                        Type = types.DefineMap.extend(Type);
                    } else {
                        Type = define.constructor(Type);
                    }
                }
                return function (newValue) {
                    if (newValue instanceof Type || newValue == null) {
                        return set.call(this, newValue);
                    } else {
                        return set.call(this, new Type(newValue));
                    }
                };
            }
        },
        eventType: {
            data: function (prop) {
                return function (newVal, oldVal) {
                    return oldVal !== undefined || this._data.hasOwnProperty(prop) ? 'set' : 'add';
                };
            },
            computed: function () {
                return function () {
                    return 'set';
                };
            }
        },
        read: {
            data: function (prop) {
                return function () {
                    return this._data[prop];
                };
            },
            computed: function (prop) {
                return function () {
                    return this._computed[prop].compute();
                };
            },
            lastSet: function (prop) {
                return function () {
                    var lastSetValue = this._computed[prop].compute.computeInstance.lastSetValue;
                    return lastSetValue && lastSetValue.get();
                };
            }
        },
        get: {
            defaultValue: function (prop, definition, typeConvert, callSetter) {
                return function () {
                    var value = definition.value;
                    if (value !== undefined) {
                        if (typeof value === 'function') {
                            value = value.call(this);
                        }
                        value = typeConvert(value);
                    } else {
                        var Value = definition.Value;
                        if (Value) {
                            value = typeConvert(new Value());
                        }
                    }
                    if (definition.set) {
                        var VALUE;
                        var sync = true;
                        var setter = make.set.setter(prop, definition.set, function () {
                        }, function (value) {
                            if (sync) {
                                VALUE = value;
                            } else {
                                callSetter.call(this, value);
                            }
                        }, definition.get);
                        setter.call(this, value);
                        sync = false;
                        return VALUE;
                    }
                    return value;
                };
            },
            data: function (prop) {
                return function () {
                    Observation.add(this, prop);
                    return this._data[prop];
                };
            },
            computed: function (prop) {
                return function () {
                    return this._computed[prop].compute();
                };
            }
        }
    };
    define.behaviors = [
        'get',
        'set',
        'value',
        'Value',
        'type',
        'Type',
        'serialize'
    ];
    var addDefinition = function (definition, behavior, value) {
        if (behavior === 'type') {
            var behaviorDef = value;
            if (typeof behaviorDef === 'string') {
                behaviorDef = define.types[behaviorDef];
                if (typeof behaviorDef === 'object') {
                    assign(definition, behaviorDef);
                    behaviorDef = behaviorDef[behavior];
                }
            }
            definition[behavior] = behaviorDef;
        } else {
            definition[behavior] = value;
        }
    };
    makeDefinition = function (prop, def, defaultDefinition) {
        var definition = {};
        each(def, function (value, behavior) {
            addDefinition(definition, behavior, value);
        });
        each(defaultDefinition, function (value, prop) {
            if (definition[prop] === undefined) {
                if (prop !== 'type' && prop !== 'Type') {
                    definition[prop] = value;
                }
            }
        });
        if (!definition.type && !definition.Type) {
            defaults(definition, defaultDefinition);
        }
        if (isEmptyObject(definition)) {
            definition.type = define.types['*'];
        }
        return definition;
    };
    getDefinitionOrMethod = function (prop, value, defaultDefinition) {
        var definition;
        if (typeof value === 'string') {
            definition = { type: value };
        } else if (typeof value === 'function') {
            if (types.isConstructor(value)) {
                definition = { Type: value };
            } else if (isDefineType(value)) {
                definition = { type: value };
            }
        } else if (isArray(value)) {
            definition = { Type: value };
        } else if (isPlainObject(value)) {
            definition = value;
        }
        if (definition) {
            return makeDefinition(prop, definition, defaultDefinition);
        } else {
            return value;
        }
    };
    getDefinitionsAndMethods = function (defines, baseDefines) {
        var definitions = Object.create(baseDefines ? baseDefines.definitions : null);
        var methods = {};
        var defaults = defines['*'], defaultDefinition;
        if (defaults) {
            delete defines['*'];
            defaultDefinition = getDefinitionOrMethod('*', defaults, {});
        } else {
            defaultDefinition = {};
        }
        eachPropertyDescriptor(defines, function (prop, propertyDescriptor) {
            var value;
            if (propertyDescriptor.get || propertyDescriptor.set) {
                value = {
                    get: propertyDescriptor.get,
                    set: propertyDescriptor.set
                };
            } else {
                value = propertyDescriptor.value;
            }
            if (prop === 'constructor') {
                methods[prop] = value;
                return;
            } else {
                var result = getDefinitionOrMethod(prop, value, defaultDefinition);
                if (result && typeof result === 'object') {
                    definitions[prop] = result;
                } else {
                    methods[prop] = result;
                }
            }
        });
        if (defaults) {
            defines['*'] = defaults;
        }
        return {
            definitions: definitions,
            methods: methods,
            defaultDefinition: defaultDefinition
        };
    };
    replaceWith = function (obj, prop, cb, writable) {
        Object.defineProperty(obj, prop, {
            configurable: true,
            get: function () {
                var value = cb.call(this, obj, prop);
                Object.defineProperty(this, prop, {
                    value: value,
                    writable: !!writable
                });
                return value;
            }
        });
    };
    eventsProto = assign({}, event);
    assign(eventsProto, {
        _eventSetup: function () {
        },
        _eventTeardown: function () {
        },
        addEventListener: function (eventName, handler) {
            var computedBinding = this._computed && this._computed[eventName];
            if (computedBinding && computedBinding.compute) {
                if (!computedBinding.count) {
                    computedBinding.count = 1;
                    computedBinding.compute.addEventListener('change', computedBinding.handler);
                } else {
                    computedBinding.count++;
                }
            }
            return eventLifecycle.addAndSetup.apply(this, arguments);
        },
        removeEventListener: function (eventName, handler) {
            var computedBinding = this._computed && this._computed[eventName];
            if (computedBinding) {
                if (computedBinding.count === 1) {
                    computedBinding.count = 0;
                    computedBinding.compute.removeEventListener('change', computedBinding.handler);
                } else {
                    computedBinding.count--;
                }
            }
            return eventLifecycle.removeAndTeardown.apply(this, arguments);
        }
    });
    eventsProto.on = eventsProto.bind = eventsProto.addEventListener;
    eventsProto.off = eventsProto.unbind = eventsProto.removeEventListener;
    delete eventsProto.one;
    define.setup = function (props, sealed) {
        defineConfigurableAndNotEnumerable(this, '_cid');
        defineConfigurableAndNotEnumerable(this, '__bindEvents', {});
        defineConfigurableAndNotEnumerable(this, '_bindings', 0);
        CID(this);
        var definitions = this._define.definitions;
        var instanceDefinitions = {};
        var map = this;
        each(props, function (value, prop) {
            if (definitions[prop]) {
                map[prop] = value;
            } else {
                var def = define.makeSimpleGetterSetter(prop);
                instanceDefinitions[prop] = {};
                Object.defineProperty(map, prop, def);
                map[prop] = define.types.observable(value);
            }
        });
        if (!isEmptyObject(instanceDefinitions)) {
            defineConfigurableAndNotEnumerable(this, '_instanceDefinitions', instanceDefinitions);
        }
        this._data;
        this._computed;
        if (sealed !== false) {
            Object.seal(this);
        }
    };
    define.replaceWith = replaceWith;
    define.eventsProto = eventsProto;
    define.defineConfigurableAndNotEnumerable = defineConfigurableAndNotEnumerable;
    define.make = make;
    define.getDefinitionOrMethod = getDefinitionOrMethod;
    var simpleGetterSetters = {};
    define.makeSimpleGetterSetter = function (prop) {
        if (!simpleGetterSetters[prop]) {
            var setter = make.set.events(prop, make.get.data(prop), make.set.data(prop), make.eventType.data(prop));
            simpleGetterSetters[prop] = {
                get: make.get.data(prop),
                set: function (newVal) {
                    return setter.call(this, define.types.observable(newVal));
                },
                enumerable: true
            };
        }
        return simpleGetterSetters[prop];
    };
    define.Iterator = function (obj) {
        this.obj = obj;
        this.definitions = Object.keys(obj._define.definitions);
        this.instanceDefinitions = obj._instanceDefinitions ? Object.keys(obj._instanceDefinitions) : Object.keys(obj);
        this.hasGet = typeof obj.get === 'function';
    };
    define.Iterator.prototype.next = function () {
        var key;
        if (this.definitions.length) {
            key = this.definitions.shift();
            var def = this.obj._define.definitions[key];
            if (def.get) {
                return this.next();
            }
        } else if (this.instanceDefinitions.length) {
            key = this.instanceDefinitions.shift();
        } else {
            return {
                value: undefined,
                done: true
            };
        }
        return {
            value: [
                key,
                this.hasGet ? this.obj.get(key) : this.obj[key]
            ],
            done: false
        };
    };
    isDefineType = function (func) {
        return func && func.canDefineType === true;
    };
    define.types = {
        'date': function (str) {
            var type = typeof str;
            if (type === 'string') {
                str = Date.parse(str);
                return isNaN(str) ? null : new Date(str);
            } else if (type === 'number') {
                return new Date(str);
            } else {
                return str;
            }
        },
        'number': function (val) {
            if (val == null) {
                return val;
            }
            return +val;
        },
        'boolean': function (val) {
            if (val == null) {
                return val;
            }
            if (val === 'false' || val === '0' || !val) {
                return false;
            }
            return true;
        },
        'observable': function (newVal) {
            if (isArray(newVal) && types.DefineList) {
                newVal = new types.DefineList(newVal);
            } else if (isPlainObject(newVal) && types.DefineMap) {
                newVal = new types.DefineMap(newVal);
            }
            return newVal;
        },
        'stringOrObservable': function (newVal) {
            if (isArray(newVal)) {
                return new types.DefaultList(newVal);
            } else if (isPlainObject(newVal)) {
                return new types.DefaultMap(newVal);
            } else {
                return define.types.string(newVal);
            }
        },
        'htmlbool': function (val) {
            return typeof val === 'string' || !!val;
        },
        '*': function (val) {
            return val;
        },
        'any': function (val) {
            return val;
        },
        'string': function (val) {
            if (val == null) {
                return val;
            }
            return '' + val;
        },
        'compute': {
            set: function (newValue, setVal, setErr, oldValue) {
                if (newValue && newValue.isComputed) {
                    return newValue;
                }
                if (oldValue && oldValue.isComputed) {
                    oldValue(newValue);
                    return oldValue;
                }
                return newValue;
            },
            get: function (value) {
                return value && value.isComputed ? value() : value;
            }
        }
    };
});
/*can-connect@1.2.0#can/ref/ref*/
define('can-connect/can/ref/ref', function (require, exports, module) {
    var connect = require('can-connect');
    var getIdProps = require('can-connect/helpers/get-id-props');
    var WeakReferenceMap = require('can-connect/helpers/weak-reference-map');
    var Observation = require('can-observation');
    var constructorStore = require('can-connect/constructor/store/store');
    var define = require('can-define');
    var makeRef = function (connection) {
        var idProp = getIdProps(connection)[0];
        var Ref = function (id, value) {
            if (typeof id === 'object') {
                value = id;
                id = value[idProp];
            }
            if (Ref.store.has(id)) {
                return Ref.store.get(id);
            }
            this[idProp] = id;
            if (value) {
                if (value instanceof connection.Map) {
                    this._value = value;
                } else {
                    this._value = connection.hydrateInstance(value);
                }
            }
            if (constructorStore.requests.count() > 0) {
                if (!Ref._requestInstances[id]) {
                    Ref.store.addReference(id, this);
                    Ref._requestInstances[id] = this;
                }
            }
        };
        Ref.store = new WeakReferenceMap();
        Ref._requestInstances = {};
        Ref.type = function (ref) {
            if (ref && typeof ref !== 'object') {
                return new Ref(ref);
            } else {
                return new Ref(ref[idProp], ref);
            }
        };
        var defs = {
            promise: {
                get: function () {
                    if (this._value) {
                        return Promise.resolve(this._value);
                    } else {
                        var props = {};
                        props[idProp] = this[idProp];
                        return connection.Map.get(props);
                    }
                }
            },
            _state: {
                get: function (lastSet, resolve) {
                    if (resolve) {
                        this.promise.then(function () {
                            resolve('resolved');
                        }, function () {
                            resolve('rejected');
                        });
                    }
                    return 'pending';
                }
            },
            value: {
                get: function (lastSet, resolve) {
                    if (this._value) {
                        return this._value;
                    } else if (resolve) {
                        this.promise.then(function (value) {
                            resolve(value);
                        });
                    }
                }
            },
            reason: {
                get: function (lastSet, resolve) {
                    if (this._value) {
                        return undefined;
                    } else {
                        this.promise.catch(function (value) {
                            resolve(value);
                        });
                    }
                }
            }
        };
        defs[idProp] = {
            type: '*',
            set: function () {
                this._value = undefined;
            }
        };
        define(Ref.prototype, defs);
        Ref.prototype.unobservedId = Observation.ignore(function () {
            return this[idProp];
        });
        Ref.prototype.isResolved = function () {
            return !!this._value || this._state === 'resolved';
        };
        Ref.prototype.isRejected = function () {
            return this._state === 'rejected';
        };
        Ref.prototype.isPending = function () {
            return !this._value && (this._state !== 'resolved' || this._state !== 'rejected');
        };
        Ref.prototype.serialize = function () {
            return this[idProp];
        };
        var baseEventSetup = Ref.prototype._eventSetup;
        Ref.prototype._eventSetup = function () {
            Ref.store.addReference(this.unobservedId(), this);
            return baseEventSetup.apply(this, arguments);
        };
        var baseTeardown = Ref.prototype._eventTeardown;
        Ref.prototype._eventTeardown = function () {
            Ref.store.deleteReference(this.unobservedId(), this);
            return baseTeardown.apply(this, arguments);
        };
        constructorStore.requests.on('end', function () {
            for (var id in Ref._requestInstances) {
                Ref.store.deleteReference(id);
            }
            Ref._requestInstances = {};
        });
        return Ref;
    };
    module.exports = connect.behavior('can/ref', function (baseConnection) {
        return {
            init: function () {
                baseConnection.init.apply(this, arguments);
                this.Map.Ref = makeRef(this);
            }
        };
    });
});
/*can-connect@1.2.0#can/super-map/super-map*/
define('can-connect/can/super-map/super-map', function (require, exports, module) {
    var connect = require('can-connect');
    var constructor = require('can-connect/constructor/constructor');
    var canMap = require('can-connect/can/map/map');
    var canRef = require('can-connect/can/ref/ref');
    var constructorStore = require('can-connect/constructor/store/store');
    var dataCallbacks = require('can-connect/data/callbacks/callbacks');
    var callbacksCache = require('can-connect/data/callbacks-cache/callbacks-cache');
    var combineRequests = require('can-connect/data/combine-requests/combine-requests');
    var localCache = require('can-connect/data/localstorage-cache/localstorage-cache');
    var dataParse = require('can-connect/data/parse/parse');
    var dataUrl = require('can-connect/data/url/url');
    var fallThroughCache = require('can-connect/fall-through-cache/fall-through-cache');
    var realTime = require('can-connect/real-time/real-time');
    var callbacksOnce = require('can-connect/constructor/callbacks-once/callbacks-once');
    var $ = require('jquery');
    connect.superMap = function (options) {
        var behaviors = [
            constructor,
            canMap,
            canRef,
            constructorStore,
            dataCallbacks,
            combineRequests,
            dataParse,
            dataUrl,
            realTime,
            callbacksOnce
        ];
        if (typeof localStorage !== 'undefined') {
            if (!options.cacheConnection) {
                options.cacheConnection = connect([localCache], {
                    name: options.name + 'Cache',
                    idProp: options.idProp,
                    algebra: options.algebra
                });
            }
            behaviors.push(callbacksCache, fallThroughCache);
        }
        if ($ && $.ajax) {
            options.ajax = $.ajax;
        }
        return connect(behaviors, options);
    };
    module.exports = connect.superMap;
});
/*can-connect@1.2.0#can/tag/tag*/
define('can-connect/can/tag/tag', function (require, exports, module) {
    require('can-stache-bindings');
    var connect = require('can-connect');
    var compute = require('can-compute');
    var expression = require('can-stache/src/expression');
    var viewCallbacks = require('can-view-callbacks');
    var Observation = require('can-observation');
    var nodeLists = require('can-view-nodelist');
    var canEvent = require('can-event');
    var each = require('can-util/js/each/each');
    var domMutate = require('can-util/dom/mutate/mutate');
    var domData = require('can-util/dom/data/data');
    require('can-util/dom/events/removed/removed');
    var convertToValue = function (arg) {
        if (typeof arg === 'function') {
            return convertToValue(arg());
        } else {
            return arg;
        }
    };
    connect.tag = function (tagName, connection) {
        var removeBrackets = function (value, open, close) {
            open = open || '{';
            close = close || '}';
            if (value[0] === open && value[value.length - 1] === close) {
                return value.substr(1, value.length - 2);
            }
            return value;
        };
        viewCallbacks.tag(tagName, function (el, tagData) {
            var getList = el.getAttribute('getList') || el.getAttribute('get-list');
            var getInstance = el.getAttribute('get');
            var attrValue = getList || getInstance;
            var method = getList ? 'getList' : 'get';
            var attrInfo = expression.parse('tmp(' + removeBrackets(attrValue) + ')', { baseMethodType: 'Call' });
            var addedToPageData = false;
            var addToPageData = Observation.ignore(function (set, promise) {
                if (!addedToPageData) {
                    var root = tagData.scope.peek('%root') || tagData.scope.peek('@root');
                    if (root && root.pageData) {
                        if (method === 'get') {
                            set = connection.id(set);
                        }
                        root.pageData(connection.name, set, promise);
                    }
                }
                addedToPageData = true;
            });
            var request = compute(function () {
                var hash = {};
                if (typeof attrInfo.hash === 'object') {
                    each(attrInfo.hash, function (val, key) {
                        if (val && val.hasOwnProperty('get')) {
                            hash[key] = tagData.scope.read(val.get, {}).value;
                        } else {
                            hash[key] = val;
                        }
                    });
                } else if (typeof attrInfo.hash === 'function') {
                    var getHash = attrInfo.hash(tagData.scope, tagData.options, {});
                    each(getHash(), function (val, key) {
                        hash[key] = convertToValue(val);
                    });
                } else {
                    hash = attrInfo.argExprs.length ? attrInfo.argExprs[0].value(tagData.scope, tagData.options)() : {};
                }
                var promise = connection[method](hash);
                addToPageData(hash, promise);
                return promise;
            });
            domData.set.call(el, 'viewModel', request);
            var nodeList = nodeLists.register([], undefined, tagData.parentNodeList || true);
            var frag = tagData.subtemplate ? tagData.subtemplate(tagData.scope.add(request), tagData.options, nodeList) : document.createDocumentFragment();
            domMutate.appendChild.call(el, frag);
            nodeLists.update(nodeList, el.childNodes);
            canEvent.one.call(el, 'removed', function () {
                nodeLists.unregister(nodeList);
            });
        });
    };
    module.exports = connect.tag;
});
/*can-connect@1.2.0#can/base-map/base-map*/
define('can-connect/can/base-map/base-map', function (require, exports, module) {
    var connect = require('can-connect');
    var constructor = require('can-connect/constructor/constructor');
    var canMap = require('can-connect/can/map/map');
    var canRef = require('can-connect/can/ref/ref');
    var constructorStore = require('can-connect/constructor/store/store');
    var dataCallbacks = require('can-connect/data/callbacks/callbacks');
    var callbacksCache = require('can-connect/data/callbacks-cache/callbacks-cache');
    var dataParse = require('can-connect/data/parse/parse');
    var dataUrl = require('can-connect/data/url/url');
    var realTime = require('can-connect/real-time/real-time');
    var callbacksOnce = require('can-connect/constructor/callbacks-once/callbacks-once');
    var $ = require('jquery');
    connect.baseMap = function (options) {
        var behaviors = [
            constructor,
            canMap,
            canRef,
            constructorStore,
            dataCallbacks,
            dataParse,
            dataUrl,
            realTime,
            callbacksOnce
        ];
        if ($ && $.ajax) {
            options.ajax = $.ajax;
        }
        return connect(behaviors, options);
    };
    module.exports = connect.baseMap;
});
/*can-connect@1.2.0#all*/
define('can-connect/all', function (require, exports, module) {
    var connect = require('can-connect');
    connect.cacheRequests = require('can-connect/cache-requests/cache-requests');
    connect.constructor = require('can-connect/constructor/constructor');
    connect.constructorCallbacksOnce = require('can-connect/constructor/callbacks-once/callbacks-once');
    connect.constructorStore = require('can-connect/constructor/store/store');
    connect.dataCallbacks = require('can-connect/data/callbacks/callbacks');
    connect.dataCallbacksCache = require('can-connect/data/callbacks-cache/callbacks-cache');
    connect.dataCombineRequests = require('can-connect/data/combine-requests/combine-requests');
    connect.dataLocalStorageCache = require('can-connect/data/localstorage-cache/localstorage-cache');
    connect.dataMemoryCache = require('can-connect/data/memory-cache/memory-cache');
    connect.dataParse = require('can-connect/data/parse/parse');
    connect.dataUrl = require('can-connect/data/url/url');
    connect.fallThroughCache = require('can-connect/fall-through-cache/fall-through-cache');
    connect.realTime = require('can-connect/real-time/real-time');
    connect.superMap = require('can-connect/can/super-map/super-map');
    connect.tag = require('can-connect/can/tag/tag');
    connect.baseMap = require('can-connect/can/base-map/base-map');
    module.exports = connect;
});
/*can-define@1.0.15#define-helpers/define-helpers*/
define('can-define/define-helpers/define-helpers', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var CID = require('can-cid');
    var define = require('can-define');
    var canBatch = require('can-event/batch/batch');
    var canEvent = require('can-event');
    var hasMethod = function (obj, method) {
        return obj && typeof obj === 'object' && method in obj;
    };
    var defineHelpers = {
        extendedSetup: function (props) {
            assign(this, props);
        },
        toObject: function (map, props, where, Type) {
            if (props instanceof Type) {
                props.each(function (value, prop) {
                    where[prop] = value;
                });
                return where;
            } else {
                return props;
            }
        },
        defineExpando: function (map, prop, value) {
            var constructorDefines = map._define.definitions;
            if (constructorDefines && constructorDefines[prop]) {
                return;
            }
            var instanceDefines = map._instanceDefinitions;
            if (!instanceDefines) {
                instanceDefines = map._instanceDefinitions = {};
            }
            if (!instanceDefines[prop]) {
                var defaultDefinition = map._define.defaultDefinition || { type: define.types.observable };
                define.property(map, prop, defaultDefinition, {}, {});
                map._data[prop] = defaultDefinition.type ? defaultDefinition.type(value) : define.types.observable(value);
                instanceDefines[prop] = defaultDefinition;
                canBatch.start();
                canEvent.dispatch.call(map, {
                    type: '__keys',
                    target: map
                });
                if (map._data[prop] !== undefined) {
                    canEvent.dispatch.call(map, {
                        type: prop,
                        target: map
                    }, [
                        map._data[prop],
                        undefined
                    ]);
                }
                canBatch.stop();
                return true;
            }
        },
        getValue: function (map, name, val, how) {
            if (how === 'serialize') {
                var constructorDefinitions = map._define.definitions;
                var propDef = constructorDefinitions[name];
                if (propDef && typeof propDef.serialize === 'function') {
                    return propDef.serialize.call(map, val, name);
                }
                var defaultDefinition = map._define.defaultDefinition;
                if (defaultDefinition && typeof defaultDefinition.serialize === 'function') {
                    return defaultDefinition.serialize.call(map, val, name);
                }
            }
            if (hasMethod(val, how)) {
                return val[how]();
            } else {
                return val;
            }
        },
        serialize: function () {
            var serializeMap = null;
            return function (map, how, where) {
                var cid = CID(map), firstSerialize = false;
                if (!serializeMap) {
                    firstSerialize = true;
                    serializeMap = {
                        get: {},
                        serialize: {}
                    };
                }
                serializeMap[how][cid] = where;
                map.each(function (val, name) {
                    var result, isObservable = hasMethod(val, how), serialized = isObservable && serializeMap[how][CID(val)];
                    if (serialized) {
                        result = serialized;
                    } else {
                        result = defineHelpers.getValue(map, name, val, how);
                    }
                    if (result !== undefined) {
                        where[name] = result;
                    }
                });
                if (firstSerialize) {
                    serializeMap = null;
                }
                return where;
            };
        }()
    };
    module.exports = defineHelpers;
});
/*can-define@1.0.15#map/map*/
define('can-define/map/map', function (require, exports, module) {
    var Construct = require('can-construct');
    var define = require('can-define');
    var assign = require('can-util/js/assign/assign');
    var isArray = require('can-util/js/is-array/is-array');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var defineHelpers = require('can-define/define-helpers/define-helpers');
    var Observation = require('can-observation');
    var types = require('can-types');
    var canBatch = require('can-event/batch/batch');
    var ns = require('can-namespace');
    var readWithoutObserve = Observation.ignore(function (map, prop) {
        return map[prop];
    });
    var eachDefinition = function (map, cb, thisarg, definitions, observe) {
        for (var prop in definitions) {
            var definition = definitions[prop];
            if (typeof definition !== 'object' || ('serialize' in definition ? !!definition.serialize : !definition.get)) {
                var item = observe === false ? readWithoutObserve(map, prop) : map[prop];
                if (cb.call(thisarg || item, item, prop, map) === false) {
                    return false;
                }
            }
        }
    };
    var setProps = function (props, remove) {
        props = assign({}, props);
        var prop, self = this, newVal;
        canBatch.start();
        this.each(function (curVal, prop) {
            if (prop === '_cid') {
                return;
            }
            newVal = props[prop];
            if (newVal === undefined) {
                if (remove) {
                    self[prop] = undefined;
                }
                return;
            }
            if (typeof curVal !== 'object' || curVal === null) {
                self.set(prop, newVal);
            } else if ('replace' in curVal && isArray(newVal)) {
                curVal.replace(newVal);
            } else if ('set' in curVal && (isPlainObject(newVal) || isArray(newVal))) {
                curVal.set(newVal, remove);
            } else if ('attr' in curVal && (isPlainObject(newVal) || isArray(newVal))) {
                curVal.attr(newVal, remove);
            } else if (curVal !== newVal) {
                self.set(prop, newVal);
            }
            delete props[prop];
        }, this, false);
        for (prop in props) {
            if (prop !== '_cid') {
                newVal = props[prop];
                this.set(prop, newVal);
            }
        }
        canBatch.stop();
        return this;
    };
    var DefineMap = Construct.extend('DefineMap', {
        setup: function (base) {
            if (DefineMap) {
                var prototype = this.prototype;
                define(prototype, prototype, base.prototype._define);
                this.prototype.setup = function (props) {
                    define.setup.call(this, defineHelpers.toObject(this, props, {}, DefineMap), this.constructor.seal);
                };
            }
        }
    }, {
        setup: function (props, sealed) {
            if (!this._define) {
                Object.defineProperty(this, '_define', {
                    enumerable: false,
                    value: { definitions: {} }
                });
                Object.defineProperty(this, '_data', {
                    enumerable: false,
                    value: {}
                });
            }
            define.setup.call(this, defineHelpers.toObject(this, props, {}, DefineMap), sealed === true);
        },
        get: function (prop) {
            if (prop) {
                var value = this[prop];
                if (value !== undefined || prop in this || Object.isSealed(this)) {
                    return value;
                } else {
                    Observation.add(this, prop);
                    return this[prop];
                }
            } else {
                return defineHelpers.serialize(this, 'get', {});
            }
        },
        set: function (prop, value) {
            if (typeof prop === 'object') {
                return setProps.call(this, prop, value);
            }
            var defined = defineHelpers.defineExpando(this, prop, value);
            if (!defined) {
                this[prop] = value;
            }
            return this;
        },
        serialize: function () {
            return defineHelpers.serialize(this, 'serialize', {});
        },
        forEach: function (cb, thisarg, observe) {
            if (observe !== false) {
                Observation.add(this, '__keys');
            }
            var res;
            var constructorDefinitions = this._define.definitions;
            if (constructorDefinitions) {
                res = eachDefinition(this, cb, thisarg, constructorDefinitions, observe);
            }
            if (res === false) {
                return this;
            }
            if (this._instanceDefinitions) {
                eachDefinition(this, cb, thisarg, this._instanceDefinitions, observe);
            }
            return this;
        },
        '*': { type: define.types.observable }
    });
    for (var prop in define.eventsProto) {
        DefineMap[prop] = define.eventsProto[prop];
        Object.defineProperty(DefineMap.prototype, prop, {
            enumerable: false,
            value: define.eventsProto[prop],
            writable: true
        });
    }
    types.DefineMap = DefineMap;
    types.DefaultMap = DefineMap;
    DefineMap.prototype.toObject = function () {
        console.warn('Use DefineMap::get instead of DefineMap::toObject');
        return this.get();
    };
    DefineMap.prototype.each = DefineMap.prototype.forEach;
    var oldIsMapLike = types.isMapLike;
    types.isMapLike = function (obj) {
        return obj instanceof DefineMap || oldIsMapLike.apply(this, arguments);
    };
    module.exports = ns.DefineMap = DefineMap;
});
/*can-define@1.0.15#list/list*/
define('can-define/list/list', function (require, exports, module) {
    var Construct = require('can-construct');
    var define = require('can-define');
    var make = define.make;
    var canEvent = require('can-event');
    var canBatch = require('can-event/batch/batch');
    var Observation = require('can-observation');
    var defineHelpers = require('can-define/define-helpers/define-helpers');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var isArray = require('can-util/js/is-array/is-array');
    var makeArray = require('can-util/js/make-array/make-array');
    var types = require('can-types');
    var ns = require('can-namespace');
    var splice = [].splice;
    var identity = function (x) {
        return x;
    };
    var makeFilterCallback = function (props) {
        return function (item) {
            for (var prop in props) {
                if (item[prop] !== props[prop]) {
                    return false;
                }
            }
            return true;
        };
    };
    var DefineList = Construct.extend('DefineList', {
        setup: function (base) {
            if (DefineList) {
                var prototype = this.prototype;
                var result = define(prototype, prototype, base.prototype._define);
                var itemsDefinition = result.definitions['#'] || result.defaultDefinition;
                if (itemsDefinition) {
                    if (itemsDefinition.Type) {
                        this.prototype.__type = make.set.Type('*', itemsDefinition.Type, identity);
                    } else if (itemsDefinition.type) {
                        this.prototype.__type = make.set.type('*', itemsDefinition.type, identity);
                    }
                }
            }
        }
    }, {
        setup: function (items) {
            if (!this._define) {
                Object.defineProperty(this, '_define', {
                    enumerable: false,
                    value: { definitions: {} }
                });
                Object.defineProperty(this, '_data', {
                    enumerable: false,
                    value: {}
                });
            }
            define.setup.call(this, {}, false);
            this._length = 0;
            if (items) {
                this.splice.apply(this, [
                    0,
                    0
                ].concat(defineHelpers.toObject(this, items, [], DefineList)));
            }
        },
        __type: define.types.observable,
        _triggerChange: function (attr, how, newVal, oldVal) {
            canBatch.start();
            var index = +attr;
            if (!~('' + attr).indexOf('.') && !isNaN(index)) {
                var itemsDefinition = this._define.definitions['#'];
                if (how === 'add') {
                    if (itemsDefinition && typeof itemsDefinition.added === 'function') {
                        Observation.ignore(itemsDefinition.added).call(this, newVal, index);
                    }
                    canEvent.dispatch.call(this, how, [
                        newVal,
                        index
                    ]);
                    canEvent.dispatch.call(this, 'length', [this._length]);
                } else if (how === 'remove') {
                    if (itemsDefinition && typeof itemsDefinition.removed === 'function') {
                        Observation.ignore(itemsDefinition.removed).call(this, oldVal, index);
                    }
                    canEvent.dispatch.call(this, how, [
                        oldVal,
                        index
                    ]);
                    canEvent.dispatch.call(this, 'length', [this._length]);
                } else {
                    canEvent.dispatch.call(this, how, [
                        newVal,
                        index
                    ]);
                }
            } else {
                canEvent.dispatch.call(this, {
                    type: '' + attr,
                    target: this
                }, [
                    newVal,
                    oldVal
                ]);
            }
            canBatch.stop();
        },
        get: function (index) {
            if (arguments.length) {
                Observation.add(this, '' + index);
                return this[index];
            } else {
                return defineHelpers.serialize(this, 'get', []);
            }
        },
        set: function (prop, value) {
            if (typeof prop !== 'object') {
                prop = isNaN(+prop) || prop % 1 ? prop : +prop;
                if (typeof prop === 'number') {
                    if (typeof prop === 'number' && prop > this._length - 1) {
                        var newArr = new Array(prop + 1 - this._length);
                        newArr[newArr.length - 1] = value;
                        this.push.apply(this, newArr);
                        return newArr;
                    }
                    this.splice(prop, 1, value);
                } else {
                    var defined = defineHelpers.defineExpando(this, prop, value);
                    if (!defined) {
                        this[prop] = value;
                    }
                }
            } else {
                if (isArray(prop)) {
                    if (value) {
                        this.replace(prop);
                    } else {
                        this.splice.apply(this, [
                            0,
                            prop.length
                        ].concat(prop));
                    }
                } else {
                    each(prop, function (value, prop) {
                        this.set(prop, value);
                    }, this);
                }
            }
            return this;
        },
        _items: function () {
            var arr = [];
            this._each(function (item) {
                arr.push(item);
            });
            return arr;
        },
        _each: function (callback) {
            for (var i = 0, len = this._length; i < len; i++) {
                callback(this[i], i);
            }
        },
        splice: function (index, howMany) {
            var args = makeArray(arguments), added = [], i, len, listIndex, allSame = args.length > 2;
            index = index || 0;
            for (i = 0, len = args.length - 2; i < len; i++) {
                listIndex = i + 2;
                args[listIndex] = this.__type(args[listIndex], listIndex);
                added.push(args[listIndex]);
                if (this[i + index] !== args[listIndex]) {
                    allSame = false;
                }
            }
            if (allSame && this._length <= added.length) {
                return added;
            }
            if (howMany === undefined) {
                howMany = args[1] = this._length - index;
            }
            var removed = splice.apply(this, args);
            canBatch.start();
            if (howMany > 0) {
                this._triggerChange('' + index, 'remove', undefined, removed);
            }
            if (args.length > 2) {
                this._triggerChange('' + index, 'add', added, removed);
            }
            canBatch.stop();
            return removed;
        },
        serialize: function () {
            return defineHelpers.serialize(this, 'serialize', []);
        }
    });
    var getArgs = function (args) {
        return args[0] && Array.isArray(args[0]) ? args[0] : makeArray(args);
    };
    each({
        push: 'length',
        unshift: 0
    }, function (where, name) {
        var orig = [][name];
        DefineList.prototype[name] = function () {
            var args = [], len = where ? this._length : 0, i = arguments.length, res, val;
            while (i--) {
                val = arguments[i];
                args[i] = this.__type(val, i);
            }
            res = orig.apply(this, args);
            if (!this.comparator || args.length) {
                this._triggerChange('' + len, 'add', args, undefined);
            }
            return res;
        };
    });
    each({
        pop: 'length',
        shift: 0
    }, function (where, name) {
        DefineList.prototype[name] = function () {
            if (!this._length) {
                return undefined;
            }
            var args = getArgs(arguments), len = where && this._length ? this._length - 1 : 0;
            var res = [][name].apply(this, args);
            this._triggerChange('' + len, 'remove', undefined, [res]);
            return res;
        };
    });
    assign(DefineList.prototype, {
        indexOf: function (item, fromIndex) {
            for (var i = fromIndex || 0, len = this.length; i < len; i++) {
                if (this.get(i) === item) {
                    return i;
                }
            }
            return -1;
        },
        join: function () {
            Observation.add(this, 'length');
            return [].join.apply(this, arguments);
        },
        reverse: function () {
            var list = [].reverse.call(this._items());
            return this.replace(list);
        },
        slice: function () {
            Observation.add(this, 'length');
            var temp = Array.prototype.slice.apply(this, arguments);
            return new this.constructor(temp);
        },
        concat: function () {
            var args = [];
            each(arguments, function (arg) {
                if (types.isListLike(arg) || Array.isArray(arg)) {
                    var arr = types.isListLike(arg) ? makeArray(arg) : arg;
                    each(arr, function (innerArg) {
                        args.push(this.__type(innerArg));
                    }, this);
                } else {
                    args.push(this.__type(arg));
                }
            }, this);
            return new this.constructor(Array.prototype.concat.apply(makeArray(this), args));
        },
        forEach: function (cb, thisarg) {
            var item;
            for (var i = 0, len = this.length; i < len; i++) {
                item = this.get(i);
                if (cb.call(thisarg || item, item, i, this) === false) {
                    break;
                }
            }
            return this;
        },
        replace: function (newList) {
            this.splice.apply(this, [
                0,
                this._length
            ].concat(makeArray(newList || [])));
            return this;
        },
        filter: function (callback, thisArg) {
            var filteredList = [], self = this, filtered;
            if (typeof callback === 'object') {
                callback = makeFilterCallback(callback);
            }
            this.each(function (item, index, list) {
                filtered = callback.call(thisArg | self, item, index, self);
                if (filtered) {
                    filteredList.push(item);
                }
            });
            return new this.constructor(filteredList);
        },
        map: function (callback, thisArg) {
            var mappedList = [], self = this;
            this.each(function (item, index, list) {
                var mapped = callback.call(thisArg | self, item, index, self);
                mappedList.push(mapped);
            });
            return new this.constructor(mappedList);
        },
        sort: function (compareFunction) {
            var removed = Array.prototype.slice.call(this);
            Array.prototype.sort.call(this, compareFunction);
            var added = Array.prototype.slice.call(this);
            canBatch.start();
            canEvent.dispatch.call(this, 'remove', [
                removed,
                0
            ]);
            canEvent.dispatch.call(this, 'add', [
                added,
                0
            ]);
            canEvent.dispatch.call(this, 'length', [
                this._length,
                this._length
            ]);
            canBatch.stop();
            return this;
        }
    });
    for (var prop in define.eventsProto) {
        DefineList[prop] = define.eventsProto[prop];
        Object.defineProperty(DefineList.prototype, prop, {
            enumerable: false,
            value: define.eventsProto[prop],
            writable: true
        });
    }
    Object.defineProperty(DefineList.prototype, 'length', {
        get: function () {
            if (!this.__inSetup) {
                Observation.add(this, 'length');
            }
            return this._length;
        },
        set: function (newVal) {
            this._length = newVal;
        },
        enumerable: true
    });
    var oldIsListLike = types.isListLike;
    types.isListLike = function (obj) {
        return obj instanceof DefineList || oldIsListLike.apply(this, arguments);
    };
    DefineList.prototype.each = DefineList.prototype.forEach;
    DefineList.prototype.attr = function (prop, value) {
        console.warn('DefineMap::attr shouldn\'t be called');
        if (arguments.length === 0) {
            return this.get();
        } else if (prop && typeof prop === 'object') {
            return this.set.apply(this, arguments);
        } else if (arguments.length === 1) {
            return this.get(prop);
        } else {
            return this.set(prop, value);
        }
    };
    DefineList.prototype.item = function (index, value) {
        if (arguments.length === 1) {
            return this.get(index);
        } else {
            return this.set(index, value);
        }
    };
    DefineList.prototype.items = function () {
        console.warn('DefineList::get should should be used instead of DefineList::items');
        return this.get();
    };
    types.DefineList = DefineList;
    types.DefaultList = DefineList;
    module.exports = ns.DefineList = DefineList;
});
/*can-util@3.2.2#js/deparam/deparam*/
define('can-util/js/deparam/deparam', function (require, exports, module) {
    var each = require('can-util/js/each/each');
    var digitTest = /^\d+$/, keyBreaker = /([^\[\]]+)|(\[\])/g, paramTest = /([^?#]*)(#.*)?$/, prep = function (str) {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        };
    module.exports = function (params) {
        var data = {}, pairs, lastPart;
        if (params && paramTest.test(params)) {
            pairs = params.split('&');
            each(pairs, function (pair) {
                var parts = pair.split('='), key = prep(parts.shift()), value = prep(parts.join('=')), current = data;
                if (key) {
                    parts = key.match(keyBreaker);
                    for (var j = 0, l = parts.length - 1; j < l; j++) {
                        if (!current[parts[j]]) {
                            current[parts[j]] = digitTest.test(parts[j + 1]) || parts[j + 1] === '[]' ? [] : {};
                        }
                        current = current[parts[j]];
                    }
                    lastPart = parts.pop();
                    if (lastPart === '[]') {
                        current.push(value);
                    } else {
                        current[lastPart] = value;
                    }
                }
            });
        }
        return data;
    };
});
/*can-util@3.2.2#js/param/param*/
define('can-util/js/param/param', function (require, exports, module) {
    var isArray = require('can-util/js/is-array/is-array');
    function buildParam(prefix, obj, add) {
        if (isArray(obj)) {
            for (var i = 0, l = obj.length; i < l; ++i) {
                add(prefix + '[]', obj[i]);
            }
        } else if (obj && typeof obj === 'object') {
            for (var name in obj) {
                buildParam(prefix + '[' + name + ']', obj[name], add);
            }
        } else {
            add(prefix, obj);
        }
    }
    module.exports = function param(object) {
        var pairs = [], add = function (key, value) {
                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            };
        for (var name in object) {
            buildParam(name, object[name], add);
        }
        return pairs.join('&').replace(/%20/g, '+');
    };
});
/*can-util@3.2.2#js/is-web-worker/is-web-worker*/
define('can-util/js/is-web-worker/is-web-worker', function (require, exports, module) {
    (function (global) {
        module.exports = function () {
            return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#js/is-browser-window/is-browser-window*/
define('can-util/js/is-browser-window/is-browser-window', function (require, exports, module) {
    (function (global) {
        module.exports = function () {
            return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#js/diff-object/diff-object*/
define('can-util/js/diff-object/diff-object', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    module.exports = exports = function (oldObject, newObject) {
        var oldObjectClone, patches = [];
        oldObjectClone = assign({}, oldObject);
        for (var newProp in newObject) {
            if (!oldObject || !oldObject.hasOwnProperty(newProp)) {
                patches.push({
                    property: newProp,
                    type: 'add',
                    value: newObject[newProp]
                });
            } else if (newObject[newProp] !== oldObject[newProp]) {
                patches.push({
                    property: newProp,
                    type: 'set',
                    value: newObject[newProp]
                });
            }
            delete oldObjectClone[newProp];
        }
        for (var oldProp in oldObjectClone) {
            patches.push({
                property: oldProp,
                type: 'remove'
            });
        }
        return patches;
    };
});
/*can-route@3.0.6#can-route*/
define('can-route', function (require, exports, module) {
    var canBatch = require('can-event/batch/batch');
    var canEvent = require('can-event');
    var Observation = require('can-observation');
    var compute = require('can-compute');
    var namespace = require('can-namespace');
    var deparam = require('can-util/js/deparam/deparam');
    var each = require('can-util/js/each/each');
    var string = require('can-util/js/string/string');
    var isFunction = require('can-util/js/is-function/is-function');
    var param = require('can-util/js/param/param');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var isWebWorker = require('can-util/js/is-web-worker/is-web-worker');
    var isBrowserWindow = require('can-util/js/is-browser-window/is-browser-window');
    var makeArray = require('can-util/js/make-array/make-array');
    var assign = require('can-util/js/assign/assign');
    var types = require('can-types');
    var dev = require('can-util/js/dev/dev');
    var diff = require('can-util/js/diff/diff');
    var diffObject = require('can-util/js/diff-object/diff-object');
    var curliesMatcher = /\{\s*([\w.]+)\s*\}/g;
    var colonMatcher = /\:([\w.]+)/g;
    var paramsMatcher = /^(?:&[^=]+=[^&]*)+/;
    var makeProps = function (props) {
        var tags = [];
        each(props, function (val, name) {
            tags.push((name === 'className' ? 'class' : name) + '="' + (name === 'href' ? val : string.esc(val)) + '"');
        });
        return tags.join(' ');
    };
    var matchesData = function (route, data) {
        var count = 0, i = 0, defaults = {};
        for (var name in route.defaults) {
            if (route.defaults[name] === data[name]) {
                defaults[name] = 1;
                count++;
            }
        }
        for (; i < route.names.length; i++) {
            if (!data.hasOwnProperty(route.names[i])) {
                return -1;
            }
            if (!defaults[route.names[i]]) {
                count++;
            }
        }
        return count;
    };
    var location = typeof window !== 'undefined' ? window.location : {};
    var wrapQuote = function (str) {
        return (str + '').replace(/([.?*+\^$\[\]\\(){}|\-])/g, '\\$1');
    };
    var attrHelper = function (prop, value) {
        if ('attr' in this) {
            return this.attr.apply(this, arguments);
        } else {
            if (arguments.length > 1) {
                this.set(prop, value);
                return this;
            } else if (typeof prop === 'object') {
                this.set(prop);
                return this;
            } else if (arguments.length === 1) {
                return this.get(prop);
            } else {
                return this.toObject();
            }
        }
    };
    var stringify = function (obj) {
        if (obj && typeof obj === 'object') {
            if (obj && typeof obj === 'object' && 'serialize' in obj) {
                obj = obj.serialize();
            } else {
                obj = isFunction(obj.slice) ? obj.slice() : assign({}, obj);
            }
            each(obj, function (val, prop) {
                obj[prop] = stringify(val);
            });
        } else if (obj !== undefined && obj !== null && isFunction(obj.toString)) {
            obj = obj.toString();
        }
        return obj;
    };
    var removeBackslash = function (str) {
        return str.replace(/\\/g, '');
    };
    var timer;
    var curParams;
    var lastHash;
    var changingData;
    var changedAttrs = [];
    var eventsObject = assign({}, canEvent);
    var canRoute = function (url, defaults) {
        var root = canRoute._call('root');
        if (root.lastIndexOf('/') === root.length - 1 && url.indexOf('/') === 0) {
            url = url.substr(1);
        }
        defaults = defaults || {};
        var names = [], res, test = '', matcher, lastIndex, next, querySeparator = canRoute._call('querySeparator'), matchSlashes = canRoute._call('matchSlashes');
        if (colonMatcher.test(url)) {
            matcher = colonMatcher;
            dev.warn('update route "' + url + '" to "' + url.replace(colonMatcher, function (name, key) {
                return '{' + key + '}';
            }) + '"');
        } else {
            matcher = curliesMatcher;
        }
        lastIndex = matcher.lastIndex = 0;
        while (res = matcher.exec(url)) {
            names.push(res[1]);
            test += removeBackslash(url.substring(lastIndex, matcher.lastIndex - res[0].length));
            next = '\\' + (removeBackslash(url.substr(matcher.lastIndex, 1)) || querySeparator + (matchSlashes ? '' : '|/'));
            test += '([^' + next + ']' + (defaults[res[1]] ? '*' : '+') + ')';
            lastIndex = matcher.lastIndex;
        }
        test += url.substr(lastIndex).replace('\\', '');
        each(canRoute.routes, function (r) {
            var existingKeys = r.names.concat(Object.keys(r.defaults)).sort();
            var keys = names.concat(Object.keys(defaults)).sort();
            var sameMapKeys = !diff(existingKeys, keys).length;
            var sameDefaultValues = !diffObject(r.defaults, defaults).length;
            if (sameMapKeys && sameDefaultValues) {
                dev.warn('two routes were registered with matching keys:\n' + '\t(1) route("' + r.route + '", ' + JSON.stringify(r.defaults) + ')\n' + '\t(2) route("' + url + '", ' + JSON.stringify(defaults) + ')\n' + '(1) will always be chosen since it was registered first');
            }
        });
        canRoute.routes[url] = {
            test: new RegExp('^' + test + '($|' + wrapQuote(querySeparator) + ')'),
            route: url,
            names: names,
            defaults: defaults,
            length: url.split('/').length
        };
        return canRoute;
    };
    var oldProperties = null;
    var onRouteDataChange = function (ev, newProps, oldProps) {
        changingData = 1;
        if (!oldProperties) {
            oldProperties = oldProps;
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            var old = oldProperties;
            oldProperties = null;
            changingData = 0;
            var serialized = canRoute.data.serialize(), path = canRoute.param(serialized, true);
            canRoute._call('setURL', path, newProps, old);
            canEvent.dispatch.call(eventsObject, '__url', [
                path,
                lastHash
            ]);
            lastHash = path;
            changedAttrs = [];
        }, 10);
    };
    var stringCoercingMapDecorator = function (map) {
        var attrSuper = map.attr;
        map.attr = function (prop, val) {
            var serializable = this.define === undefined || this.define[prop] === undefined || !!this.define[prop].serialize, args;
            if (serializable) {
                args = stringify(Array.apply(null, arguments));
            } else {
                args = arguments;
            }
            return attrSuper.apply(this, args);
        };
        return map;
    };
    var recursiveClean = function (old, cur, data) {
        for (var attr in old) {
            if (cur[attr] === undefined) {
                if ('removeAttr' in data) {
                    data.removeAttr(attr);
                } else {
                    cur[attr] = undefined;
                }
            } else if (Object.prototype.toString.call(old[attr]) === '[object Object]') {
                recursiveClean(old[attr], cur[attr], attrHelper.call(data, attr));
            }
        }
    };
    var matchCheck = function (source, matcher) {
        for (var prop in source) {
            var s = source[prop], m = matcher[prop];
            if (s && m && typeof s === 'object' && typeof matcher === 'object') {
                return matchCheck(s, m);
            }
            if (s != m) {
                return false;
            }
        }
        return true;
    };
    var setState = canRoute.setState = function () {
        var hash = canRoute._call('matchingPartOfURL');
        var oldParams = curParams;
        curParams = canRoute.deparam(hash);
        var matched;
        if (!changingData || hash !== lastHash) {
            canRoute.batch.start();
            recursiveClean(oldParams, curParams, canRoute.data);
            matched = curParams.route;
            delete curParams.route;
            canRoute.matched(matched);
            canRoute.attr(curParams);
            curParams.route = matched;
            canEvent.dispatch.call(eventsObject, '__url', [
                hash,
                lastHash
            ]);
            canRoute.batch.stop();
        }
    };
    assign(canRoute, {
        param: function (data, _setRoute) {
            var route, matches = 0, matchCount, routeName = data.route, propCount = 0, cpy, res, after, matcher;
            delete data.route;
            each(data, function () {
                propCount++;
            });
            each(canRoute.routes, function (temp, name) {
                matchCount = matchesData(temp, data);
                if (matchCount > matches) {
                    route = temp;
                    matches = matchCount;
                }
                if (matchCount >= propCount) {
                    return false;
                }
            });
            if (canRoute.routes[routeName] && matchesData(canRoute.routes[routeName], data) === matches) {
                route = canRoute.routes[routeName];
            }
            if (route) {
                cpy = assign({}, data);
                matcher = colonMatcher.test(route.route) ? colonMatcher : curliesMatcher;
                res = route.route.replace(matcher, function (whole, name) {
                    delete cpy[name];
                    return data[name] === route.defaults[name] ? '' : encodeURIComponent(data[name]);
                }).replace('\\', '');
                each(route.defaults, function (val, name) {
                    if (cpy[name] === val) {
                        delete cpy[name];
                    }
                });
                after = param(cpy);
                if (_setRoute) {
                    canRoute.matched(route.route);
                }
                return res + (after ? canRoute._call('querySeparator') + after : '');
            }
            return isEmptyObject(data) ? '' : canRoute._call('querySeparator') + param(data);
        },
        deparam: function (url) {
            var root = canRoute._call('root');
            if (root.lastIndexOf('/') === root.length - 1 && url.indexOf('/') === 0) {
                url = url.substr(1);
            }
            var route = { length: -1 }, querySeparator = canRoute._call('querySeparator'), paramsMatcher = canRoute._call('paramsMatcher');
            each(canRoute.routes, function (temp, name) {
                if (temp.test.test(url) && temp.length > route.length) {
                    route = temp;
                }
            });
            if (route.length > -1) {
                var parts = url.match(route.test), start = parts.shift(), remainder = url.substr(start.length - (parts[parts.length - 1] === querySeparator ? 1 : 0)), obj = remainder && paramsMatcher.test(remainder) ? deparam(remainder.slice(1)) : {};
                obj = deepAssign(true, {}, route.defaults, obj);
                each(parts, function (part, i) {
                    if (part && part !== querySeparator) {
                        obj[route.names[i]] = decodeURIComponent(part);
                    }
                });
                obj.route = route.route;
                return obj;
            }
            if (url.charAt(0) !== querySeparator) {
                url = querySeparator + url;
            }
            return paramsMatcher.test(url) ? deparam(url.slice(1)) : {};
        },
        map: function (data) {
            dev.warn('Set route.data directly instead of calling route.map');
            canRoute.data = data;
        },
        routes: {},
        ready: function (val) {
            if (val !== true) {
                canRoute._setup();
                if (isBrowserWindow() || isWebWorker()) {
                    canRoute.setState();
                }
            }
            return canRoute;
        },
        url: function (options, merge) {
            if (merge) {
                Observation.add(eventsObject, '__url');
                var baseOptions = canRoute.deparam(canRoute._call('matchingPartOfURL'));
                options = assign(assign({}, baseOptions), options);
            }
            return canRoute._call('root') + canRoute.param(options);
        },
        link: function (name, options, props, merge) {
            return '<a ' + makeProps(assign({ href: canRoute.url(options, merge) }, props)) + '>' + name + '</a>';
        },
        current: function (options, subsetMatch) {
            Observation.add(eventsObject, '__url');
            if (subsetMatch) {
                var baseOptions = canRoute.deparam(canRoute._call('matchingPartOfURL'));
                return matchCheck(options, baseOptions);
            } else {
                return this._call('matchingPartOfURL') === canRoute.param(options);
            }
        },
        bindings: {
            hashchange: {
                paramsMatcher: paramsMatcher,
                querySeparator: '&',
                matchSlashes: false,
                bind: function () {
                    canEvent.on.call(window, 'hashchange', setState);
                },
                unbind: function () {
                    canEvent.on.call(window, 'hashchange', setState);
                },
                matchingPartOfURL: function () {
                    var loc = canRoute.location || location;
                    return loc.href.split(/#!?/)[1] || '';
                },
                setURL: function (path) {
                    if (location.hash !== '#' + path) {
                        location.hash = '!' + path;
                    }
                    return path;
                },
                root: '#!'
            }
        },
        defaultBinding: 'hashchange',
        currentBinding: null,
        _setup: function () {
            if (!canRoute.currentBinding) {
                canRoute._call('bind');
                canRoute.serializedCompute.addEventListener('change', onRouteDataChange);
                canRoute.currentBinding = canRoute.defaultBinding;
            }
        },
        _teardown: function () {
            if (canRoute.currentBinding) {
                canRoute._call('unbind');
                canRoute.serializedCompute.removeEventListener('change', onRouteDataChange);
                canRoute.currentBinding = null;
            }
            clearTimeout(timer);
            changingData = 0;
        },
        _call: function () {
            var args = makeArray(arguments), prop = args.shift(), binding = canRoute.bindings[canRoute.currentBinding || canRoute.defaultBinding], method = binding[prop];
            if (method.apply) {
                return method.apply(binding, args);
            } else {
                return method;
            }
        },
        matched: compute()
    });
    each([
        'addEventListener',
        'removeEventListener',
        'bind',
        'unbind',
        'on',
        'off',
        'delegate',
        'undelegate',
        'removeAttr',
        'compute',
        '_get',
        '___get',
        'each'
    ], function (name) {
        canRoute[name] = function () {
            if (!canRoute.data[name]) {
                return;
            }
            return canRoute.data[name].apply(canRoute.data, arguments);
        };
    });
    var routeData;
    var setRouteData = function (data) {
        routeData = data;
        return routeData;
    };
    var serializedCompute;
    Object.defineProperty(canRoute, 'serializedCompute', {
        get: function () {
            if (!serializedCompute) {
                serializedCompute = compute(function () {
                    return canRoute.data.serialize();
                });
            }
            return serializedCompute;
        }
    });
    Object.defineProperty(canRoute, 'data', {
        get: function () {
            if (routeData) {
                return routeData;
            } else if (types.DefaultMap) {
                if (types.DefaultMap.prototype.toObject) {
                    var DefaultRouteMap = types.DefaultMap.extend({ seal: false }, { '*': 'stringOrObservable' });
                    return setRouteData(new DefaultRouteMap());
                } else {
                    return setRouteData(stringCoercingMapDecorator(new types.DefaultMap()));
                }
            } else {
                throw new Error('can.route.data accessed without being set');
            }
        },
        set: function (data) {
            if (types.isConstructor(data)) {
                data = new data();
            }
            if ('attr' in data) {
                setRouteData(stringCoercingMapDecorator(data));
            } else {
                setRouteData(data);
            }
        }
    });
    canRoute.attr = function () {
        return attrHelper.apply(canRoute.data, arguments);
    };
    canRoute.batch = canBatch;
    var oldIsCallableForValue = types.isCallableForValue;
    types.isCallableForValue = function (obj) {
        if (obj === canRoute) {
            return false;
        } else {
            return oldIsCallableForValue.call(this, obj);
        }
    };
    module.exports = namespace.route = canRoute;
});
/*can-view-target@3.0.7#can-view-target*/
define('can-view-target', function (require, exports, module) {
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var domAttr = require('can-util/dom/attr/attr');
    var each = require('can-util/js/each/each');
    var makeArray = require('can-util/js/make-array/make-array');
    var getDocument = require('can-util/dom/document/document');
    var domMutate = require('can-util/dom/mutate/mutate');
    var namespace = require('can-namespace');
    var MUTATION_OBSERVER = require('can-util/dom/mutation-observer/mutation-observer');
    var processNodes = function (nodes, paths, location, document) {
            var frag = document.createDocumentFragment();
            for (var i = 0, len = nodes.length; i < len; i++) {
                var node = nodes[i];
                frag.appendChild(processNode(node, paths, location.concat(i), document));
            }
            return frag;
        }, keepsTextNodes = typeof document !== 'undefined' && function () {
            var testFrag = document.createDocumentFragment();
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(''));
            div.appendChild(document.createTextNode(''));
            testFrag.appendChild(div);
            var cloned = testFrag.cloneNode(true);
            return childNodes(cloned.firstChild).length === 2;
        }(), clonesWork = typeof document !== 'undefined' && function () {
            var el = document.createElement('a');
            el.innerHTML = '<xyz></xyz>';
            var clone = el.cloneNode(true);
            var works = clone.innerHTML === '<xyz></xyz>';
            var MO, observer;
            if (works) {
                el = document.createDocumentFragment();
                el.appendChild(document.createTextNode('foo-bar'));
                MO = MUTATION_OBSERVER();
                if (MO) {
                    observer = new MO(function () {
                    });
                    observer.observe(document.documentElement, {
                        childList: true,
                        subtree: true
                    });
                    clone = el.cloneNode(true);
                    observer.disconnect();
                } else {
                    clone = el.cloneNode(true);
                }
                return clone.childNodes.length === 1;
            }
            return works;
        }(), namespacesWork = typeof document !== 'undefined' && !!document.createElementNS;
    var cloneNode = clonesWork ? function (el) {
        return el.cloneNode(true);
    } : function (node) {
        var document = node.ownerDocument;
        var copy;
        if (node.nodeType === 1) {
            copy = document.createElement(node.nodeName);
        } else if (node.nodeType === 3) {
            copy = document.createTextNode(node.nodeValue);
        } else if (node.nodeType === 8) {
            copy = document.createComment(node.nodeValue);
        } else if (node.nodeType === 11) {
            copy = document.createDocumentFragment();
        }
        if (node.attributes) {
            var attributes = makeArray(node.attributes);
            each(attributes, function (node) {
                if (node && node.specified) {
                    domAttr.setAttribute(copy, node.nodeName || node.name, node.nodeValue || node.value);
                }
            });
        }
        if (node && node.firstChild) {
            var child = node.firstChild;
            while (child) {
                copy.appendChild(cloneNode(child));
                child = child.nextSibling;
            }
        }
        return copy;
    };
    function processNode(node, paths, location, document) {
        var callback, loc = location, nodeType = typeof node, el, p, i, len;
        var getCallback = function () {
            if (!callback) {
                callback = {
                    path: location,
                    callbacks: []
                };
                paths.push(callback);
                loc = [];
            }
            return callback;
        };
        if (nodeType === 'object') {
            if (node.tag) {
                if (namespacesWork && node.namespace) {
                    el = document.createElementNS(node.namespace, node.tag);
                } else {
                    el = document.createElement(node.tag);
                }
                if (node.attrs) {
                    for (var attrName in node.attrs) {
                        var value = node.attrs[attrName];
                        if (typeof value === 'function') {
                            getCallback().callbacks.push({ callback: value });
                        } else {
                            domAttr.setAttribute(el, attrName, value);
                        }
                    }
                }
                if (node.attributes) {
                    for (i = 0, len = node.attributes.length; i < len; i++) {
                        getCallback().callbacks.push({ callback: node.attributes[i] });
                    }
                }
                if (node.children && node.children.length) {
                    if (callback) {
                        p = callback.paths = [];
                    } else {
                        p = paths;
                    }
                    el.appendChild(processNodes(node.children, p, loc, document));
                }
            } else if (node.comment) {
                el = document.createComment(node.comment);
                if (node.callbacks) {
                    for (i = 0, len = node.attributes.length; i < len; i++) {
                        getCallback().callbacks.push({ callback: node.callbacks[i] });
                    }
                }
            }
        } else if (nodeType === 'string') {
            el = document.createTextNode(node);
        } else if (nodeType === 'function') {
            if (keepsTextNodes) {
                el = document.createTextNode('');
                getCallback().callbacks.push({ callback: node });
            } else {
                el = document.createComment('~');
                getCallback().callbacks.push({
                    callback: function () {
                        var el = document.createTextNode('');
                        domMutate.replaceChild.call(this.parentNode, el, this);
                        return node.apply(el, arguments);
                    }
                });
            }
        }
        return el;
    }
    function getCallbacks(el, pathData, elementCallbacks) {
        var path = pathData.path, callbacks = pathData.callbacks, paths = pathData.paths, child = el, pathLength = path ? path.length : 0, pathsLength = paths ? paths.length : 0;
        for (var i = 0; i < pathLength; i++) {
            child = child.childNodes.item(path[i]);
        }
        for (i = 0; i < pathsLength; i++) {
            getCallbacks(child, paths[i], elementCallbacks);
        }
        elementCallbacks.push({
            element: child,
            callbacks: callbacks
        });
    }
    function hydrateCallbacks(callbacks, args) {
        var len = callbacks.length, callbacksLength, callbackElement, callbackData;
        for (var i = 0; i < len; i++) {
            callbackData = callbacks[i];
            callbacksLength = callbackData.callbacks.length;
            callbackElement = callbackData.element;
            for (var c = 0; c < callbacksLength; c++) {
                callbackData.callbacks[c].callback.apply(callbackElement, args);
            }
        }
    }
    function makeTarget(nodes, doc) {
        var paths = [];
        var frag = processNodes(nodes, paths, [], doc || getDocument());
        return {
            paths: paths,
            clone: frag,
            hydrate: function () {
                var cloned = cloneNode(this.clone);
                var args = makeArray(arguments);
                var callbacks = [];
                for (var i = 0; i < paths.length; i++) {
                    getCallbacks(cloned, paths[i], callbacks);
                }
                hydrateCallbacks(callbacks, args);
                return cloned;
            }
        };
    }
    makeTarget.keepsTextNodes = keepsTextNodes;
    makeTarget.cloneNode = cloneNode;
    namespace.view = namespace.view || {};
    module.exports = namespace.view.target = makeTarget;
});
/*can-stache@3.0.19#src/mustache_core*/
define('can-stache/src/mustache_core', function (require, exports, module) {
    var live = require('can-view-live');
    var nodeLists = require('can-view-nodelist');
    var compute = require('can-compute');
    var Observation = require('can-observation');
    var utils = require('can-stache/src/utils');
    var expression = require('can-stache/src/expression');
    var types = require('can-types');
    var frag = require('can-util/dom/frag/frag');
    var attr = require('can-util/dom/attr/attr');
    var mustacheLineBreakRegExp = /(?:(?:^|(\r?)\n)(\s*)(\{\{([^\}]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([^\}]*)\}\}\}?)/g, k = function () {
        };
    var core = {
        expression: expression,
        makeEvaluator: function (scope, helperOptions, nodeList, mode, exprData, truthyRenderer, falseyRenderer, stringOnly) {
            if (mode === '^') {
                var temp = truthyRenderer;
                truthyRenderer = falseyRenderer;
                falseyRenderer = temp;
            }
            var value, helperOptionArg;
            if (exprData instanceof expression.Call) {
                helperOptionArg = {
                    fn: function () {
                    },
                    inverse: function () {
                    },
                    context: scope.peek('.'),
                    scope: scope,
                    nodeList: nodeList,
                    exprData: exprData,
                    helpersScope: helperOptions
                };
                utils.convertToScopes(helperOptionArg, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
                value = exprData.value(scope, helperOptions, helperOptionArg);
                if (exprData.isHelper) {
                    return value;
                }
            } else if (exprData instanceof expression.Bracket) {
                value = exprData.value(scope);
                if (exprData.isHelper) {
                    return value;
                }
            } else if (exprData instanceof expression.Lookup) {
                value = exprData.value(scope);
                if (exprData.isHelper) {
                    return value;
                }
            } else if (exprData instanceof expression.Helper && exprData.methodExpr instanceof expression.Bracket) {
                value = exprData.methodExpr.value(scope);
                if (exprData.isHelper) {
                    return value;
                }
            } else {
                var readOptions = {
                    isArgument: true,
                    args: [
                        scope.peek('.'),
                        scope
                    ],
                    asCompute: true
                };
                var helperAndValue = exprData.helperAndValue(scope, helperOptions, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
                var helper = helperAndValue.helper;
                value = helperAndValue.value;
                if (helper) {
                    return exprData.evaluator(helper, scope, helperOptions, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
                }
            }
            if (!mode) {
                if (value && value.isComputed) {
                    return value;
                } else {
                    return function () {
                        return '' + (value != null ? value : '');
                    };
                }
            } else if (mode === '#' || mode === '^') {
                helperOptionArg = {
                    fn: function () {
                    },
                    inverse: function () {
                    }
                };
                utils.convertToScopes(helperOptionArg, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
                return function () {
                    var finalValue;
                    if (types.isCompute(value)) {
                        finalValue = value();
                    } else {
                        finalValue = value;
                    }
                    if (typeof finalValue === 'function') {
                        return finalValue;
                    } else if (typeof finalValue !== 'string' && utils.isArrayLike(finalValue)) {
                        var isObserveList = types.isMapLike(finalValue);
                        if (isObserveList ? finalValue.attr('length') : finalValue.length) {
                            if (stringOnly) {
                                return utils.getItemsStringContent(finalValue, isObserveList, helperOptionArg, helperOptions);
                            } else {
                                return frag(utils.getItemsFragContent(finalValue, helperOptionArg, scope));
                            }
                        } else {
                            return helperOptionArg.inverse(scope, helperOptions);
                        }
                    } else {
                        return finalValue ? helperOptionArg.fn(finalValue || scope, helperOptions) : helperOptionArg.inverse(scope, helperOptions);
                    }
                };
            } else {
            }
        },
        makeLiveBindingPartialRenderer: function (expressionString, state) {
            expressionString = expressionString.trim();
            var exprData, partialName = expressionString.split(/\s+/).shift();
            if (partialName !== expressionString) {
                exprData = core.expression.parse(expressionString);
            }
            return function (scope, options, parentSectionNodeList) {
                var nodeList = [this];
                nodeList.expression = '>' + partialName;
                nodeLists.register(nodeList, null, parentSectionNodeList || true, state.directlyNested);
                var partialFrag = compute(function () {
                    var localPartialName = partialName;
                    if (exprData && exprData.argExprs.length === 1) {
                        var newContext = exprData.argExprs[0].value(scope, options)();
                        if (typeof newContext === 'undefined') {
                            dev.warn('The context (' + exprData.argExprs[0].key + ') you passed into the' + 'partial (' + partialName + ') is not defined in the scope!');
                        } else {
                            scope = scope.add(newContext);
                        }
                    }
                    var partial = options.peek('partials.' + localPartialName), renderer;
                    if (partial) {
                        renderer = function () {
                            return partial.render ? partial.render(scope, options, nodeList) : partial(scope, options);
                        };
                    } else {
                        var scopePartialName = scope.read(localPartialName, { isArgument: true }).value;
                        if (scopePartialName === null || !scopePartialName && localPartialName[0] === '*') {
                            return frag('');
                        }
                        if (scopePartialName) {
                            localPartialName = scopePartialName;
                        }
                        renderer = function () {
                            if (typeof localPartialName === 'function') {
                                return localPartialName(scope, options, nodeList);
                            } else {
                                return core.getTemplateById(localPartialName)(scope, options, nodeList);
                            }
                        };
                    }
                    var res = Observation.ignore(renderer)();
                    return frag(res);
                });
                partialFrag.computeInstance.setPrimaryDepth(nodeList.nesting);
                live.html(this, partialFrag, this.parentNode, nodeList);
            };
        },
        makeStringBranchRenderer: function (mode, expressionString) {
            var exprData = core.expression.parse(expressionString), fullExpression = mode + expressionString;
            if (!(exprData instanceof expression.Helper) && !(exprData instanceof expression.Call)) {
                exprData = new expression.Helper(exprData, [], {});
            }
            return function branchRenderer(scope, options, truthyRenderer, falseyRenderer) {
                var evaluator = scope.__cache[fullExpression];
                if (mode || !evaluator) {
                    evaluator = makeEvaluator(scope, options, null, mode, exprData, truthyRenderer, falseyRenderer, true);
                    if (!mode) {
                        scope.__cache[fullExpression] = evaluator;
                    }
                }
                var res = evaluator();
                return res == null ? '' : '' + res;
            };
        },
        makeLiveBindingBranchRenderer: function (mode, expressionString, state) {
            var exprData = core.expression.parse(expressionString);
            if (!(exprData instanceof expression.Helper) && !(exprData instanceof expression.Call) && !(exprData instanceof expression.Bracket) && !(exprData instanceof expression.Lookup)) {
                exprData = new expression.Helper(exprData, [], {});
            }
            return function branchRenderer(scope, options, parentSectionNodeList, truthyRenderer, falseyRenderer) {
                var nodeList = [this];
                nodeList.expression = expressionString;
                nodeLists.register(nodeList, null, parentSectionNodeList || true, state.directlyNested);
                var evaluator = makeEvaluator(scope, options, nodeList, mode, exprData, truthyRenderer, falseyRenderer, state.tag);
                var gotCompute = evaluator.isComputed, computeValue;
                if (gotCompute) {
                    computeValue = evaluator;
                } else {
                    computeValue = compute(evaluator, null, false);
                }
                computeValue.computeInstance.setPrimaryDepth(nodeList.nesting);
                computeValue.computeInstance.bind('change', k);
                var value = computeValue();
                if (typeof value === 'function') {
                    Observation.ignore(value)(this);
                } else if (gotCompute || computeValue.computeInstance.hasDependencies) {
                    if (state.attr) {
                        live.attr(this, state.attr, computeValue);
                    } else if (state.tag) {
                        live.attrs(this, computeValue);
                    } else if (state.text && typeof value !== 'object') {
                        live.text(this, computeValue, this.parentNode, nodeList);
                    } else {
                        live.html(this, computeValue, this.parentNode, nodeList);
                    }
                } else {
                    if (state.attr) {
                        attr.set(this, state.attr, value);
                    } else if (state.tag) {
                        live.attrs(this, value);
                    } else if (state.text && typeof value === 'string') {
                        this.nodeValue = value;
                    } else if (value != null) {
                        nodeLists.replace([this], frag(value, this.ownerDocument));
                    }
                }
                computeValue.computeInstance.unbind('change', k);
            };
        },
        splitModeFromExpression: function (expression, state) {
            expression = expression.trim();
            var mode = expression.charAt(0);
            if ('#/{&^>!'.indexOf(mode) >= 0) {
                expression = expression.substr(1).trim();
            } else {
                mode = null;
            }
            if (mode === '{' && state.node) {
                mode = null;
            }
            return {
                mode: mode,
                expression: expression
            };
        },
        cleanLineEndings: function (template) {
            return template.replace(mustacheLineBreakRegExp, function (whole, returnBefore, spaceBefore, special, expression, spaceAfter, returnAfter, spaceLessSpecial, spaceLessExpression, matchIndex) {
                spaceAfter = spaceAfter || '';
                returnBefore = returnBefore || '';
                spaceBefore = spaceBefore || '';
                var modeAndExpression = splitModeFromExpression(expression || spaceLessExpression, {});
                if (spaceLessSpecial || '>{'.indexOf(modeAndExpression.mode) >= 0) {
                    return whole;
                } else if ('^#!/'.indexOf(modeAndExpression.mode) >= 0) {
                    return special + (matchIndex !== 0 && returnAfter.length ? returnBefore + '\n' : '');
                } else {
                    return spaceBefore + special + spaceAfter + (spaceBefore.length || matchIndex !== 0 ? returnBefore + '\n' : '');
                }
            });
        },
        Options: utils.Options,
        getTemplateById: function () {
        }
    };
    var makeEvaluator = core.makeEvaluator, splitModeFromExpression = core.splitModeFromExpression;
    module.exports = core;
});
/*can-stache@3.0.19#src/html_section*/
define('can-stache/src/html_section', function (require, exports, module) {
    var target = require('can-view-target');
    var Scope = require('can-view-scope');
    var utils = require('can-stache/src/utils');
    var mustacheCore = require('can-stache/src/mustache_core');
    var getDocument = require('can-util/dom/document/document');
    var assign = require('can-util/js/assign/assign');
    var last = require('can-util/js/last/last');
    var decodeHTML = typeof document !== 'undefined' && function () {
        var el = getDocument().createElement('div');
        return function (html) {
            if (html.indexOf('&') === -1) {
                return html.replace(/\r\n/g, '\n');
            }
            el.innerHTML = html;
            return el.childNodes.length === 0 ? '' : el.childNodes.item(0).nodeValue;
        };
    }();
    var HTMLSectionBuilder = function () {
        this.stack = [new HTMLSection()];
    };
    assign(HTMLSectionBuilder.prototype, utils.mixins);
    assign(HTMLSectionBuilder.prototype, {
        startSubSection: function (process) {
            var newSection = new HTMLSection(process);
            this.stack.push(newSection);
            return newSection;
        },
        endSubSectionAndReturnRenderer: function () {
            if (this.last().isEmpty()) {
                this.stack.pop();
                return null;
            } else {
                var htmlSection = this.endSection();
                return htmlSection.compiled.hydrate.bind(htmlSection.compiled);
            }
        },
        startSection: function (process) {
            var newSection = new HTMLSection(process);
            this.last().add(newSection.targetCallback);
            this.stack.push(newSection);
        },
        endSection: function () {
            this.last().compile();
            return this.stack.pop();
        },
        inverse: function () {
            this.last().inverse();
        },
        compile: function () {
            var compiled = this.stack.pop().compile();
            return function (scope, options, nodeList) {
                if (!(scope instanceof Scope)) {
                    scope = Scope.refsScope().add(scope || {});
                }
                if (!(options instanceof mustacheCore.Options)) {
                    options = new mustacheCore.Options(options || {});
                }
                return compiled.hydrate(scope, options, nodeList);
            };
        },
        push: function (chars) {
            this.last().push(chars);
        },
        pop: function () {
            return this.last().pop();
        }
    });
    var HTMLSection = function (process) {
        this.data = 'targetData';
        this.targetData = [];
        this.targetStack = [];
        var self = this;
        this.targetCallback = function (scope, options, sectionNode) {
            process.call(this, scope, options, sectionNode, self.compiled.hydrate.bind(self.compiled), self.inverseCompiled && self.inverseCompiled.hydrate.bind(self.inverseCompiled));
        };
    };
    assign(HTMLSection.prototype, {
        inverse: function () {
            this.inverseData = [];
            this.data = 'inverseData';
        },
        push: function (data) {
            this.add(data);
            this.targetStack.push(data);
        },
        pop: function () {
            return this.targetStack.pop();
        },
        add: function (data) {
            if (typeof data === 'string') {
                data = decodeHTML(data);
            }
            if (this.targetStack.length) {
                last(this.targetStack).children.push(data);
            } else {
                this[this.data].push(data);
            }
        },
        compile: function () {
            this.compiled = target(this.targetData, getDocument());
            if (this.inverseData) {
                this.inverseCompiled = target(this.inverseData, getDocument());
                delete this.inverseData;
            }
            this.targetStack = this.targetData = null;
            return this.compiled;
        },
        children: function () {
            if (this.targetStack.length) {
                return last(this.targetStack).children;
            } else {
                return this[this.data];
            }
        },
        isEmpty: function () {
            return !this.targetData.length;
        }
    });
    HTMLSectionBuilder.HTMLSection = HTMLSection;
    module.exports = HTMLSectionBuilder;
});
/*can-stache@3.0.19#src/text_section*/
define('can-stache/src/text_section', function (require, exports, module) {
    var compute = require('can-compute');
    var live = require('can-view-live');
    var utils = require('can-stache/src/utils');
    var attr = require('can-util/dom/attr/attr');
    var assign = require('can-util/js/assign/assign');
    var noop = function () {
    };
    var TextSectionBuilder = function () {
        this.stack = [new TextSection()];
    };
    assign(TextSectionBuilder.prototype, utils.mixins);
    assign(TextSectionBuilder.prototype, {
        startSection: function (process) {
            var subSection = new TextSection();
            this.last().add({
                process: process,
                truthy: subSection
            });
            this.stack.push(subSection);
        },
        endSection: function () {
            this.stack.pop();
        },
        inverse: function () {
            this.stack.pop();
            var falseySection = new TextSection();
            this.last().last().falsey = falseySection;
            this.stack.push(falseySection);
        },
        compile: function (state) {
            var renderer = this.stack[0].compile();
            return function (scope, options) {
                var computeValue = compute(function () {
                    return renderer(scope, options);
                }, null, false);
                computeValue.computeInstance.addEventListener('change', noop);
                var value = computeValue();
                if (computeValue.computeInstance.hasDependencies) {
                    if (state.textContentOnly) {
                        live.text(this, computeValue);
                    } else if (state.attr) {
                        live.attr(this, state.attr, computeValue);
                    } else {
                        live.attrs(this, computeValue, scope, options);
                    }
                    computeValue.computeInstance.removeEventListener('change', noop);
                } else {
                    if (state.textContentOnly) {
                        this.nodeValue = value;
                    } else if (state.attr) {
                        attr.set(this, state.attr, value);
                    } else {
                        live.attrs(this, value);
                    }
                }
            };
        }
    });
    var passTruthyFalsey = function (process, truthy, falsey) {
        return function (scope, options) {
            return process.call(this, scope, options, truthy, falsey);
        };
    };
    var TextSection = function () {
        this.values = [];
    };
    assign(TextSection.prototype, {
        add: function (data) {
            this.values.push(data);
        },
        last: function () {
            return this.values[this.values.length - 1];
        },
        compile: function () {
            var values = this.values, len = values.length;
            for (var i = 0; i < len; i++) {
                var value = this.values[i];
                if (typeof value === 'object') {
                    values[i] = passTruthyFalsey(value.process, value.truthy && value.truthy.compile(), value.falsey && value.falsey.compile());
                }
            }
            return function (scope, options) {
                var txt = '', value;
                for (var i = 0; i < len; i++) {
                    value = values[i];
                    txt += typeof value === 'string' ? value : value.call(this, scope, options);
                }
                return txt;
            };
        }
    });
    module.exports = TextSectionBuilder;
});
/*can-stache@3.0.19#helpers/converter*/
define('can-stache/helpers/converter', function (require, exports, module) {
    var helpers = require('can-stache/helpers/core');
    var expression = require('can-stache/src/expression');
    var makeArray = require('can-util/js/make-array/make-array');
    helpers.registerConverter = function (name, getterSetter) {
        getterSetter = getterSetter || {};
        helpers.registerHelper(name, function (newVal, source) {
            var args = makeArray(arguments);
            if (newVal instanceof expression.SetIdentifier) {
                return typeof getterSetter.set === 'function' ? getterSetter.set.apply(this, [newVal.value].concat(args.slice(1))) : source(newVal.value);
            } else {
                return typeof getterSetter.get === 'function' ? getterSetter.get.apply(this, args) : args[0];
            }
        });
    };
    module.exports = helpers;
});
/*can-stache@3.0.19#src/intermediate_and_imports*/
define('can-stache/src/intermediate_and_imports', function (require, exports, module) {
    var mustacheCore = require('can-stache/src/mustache_core');
    var parser = require('can-view-parser');
    module.exports = function (source) {
        var template = mustacheCore.cleanLineEndings(source);
        var imports = [], dynamicImports = [], ases = {}, inImport = false, inFrom = false, inAs = false, isUnary = false, currentAs = '', currentFrom = '';
        var intermediate = parser(template, {
            start: function (tagName, unary) {
                isUnary = unary;
                if (tagName === 'can-import') {
                    inImport = true;
                } else if (inImport) {
                    inImport = false;
                }
            },
            attrStart: function (attrName) {
                if (attrName === 'from') {
                    inFrom = true;
                } else if (attrName === 'as' || attrName === 'export-as') {
                    inAs = true;
                }
            },
            attrEnd: function (attrName) {
                if (attrName === 'from') {
                    inFrom = false;
                } else if (attrName === 'as' || attrName === 'export-as') {
                    inAs = false;
                }
            },
            attrValue: function (value) {
                if (inFrom && inImport) {
                    imports.push(value);
                    if (!isUnary) {
                        dynamicImports.push(value);
                    }
                    currentFrom = value;
                } else if (inAs && inImport) {
                    currentAs = value;
                }
            },
            end: function (tagName) {
                if (tagName === 'can-import') {
                    if (currentAs) {
                        ases[currentAs] = currentFrom;
                        currentAs = '';
                    }
                }
            },
            close: function (tagName) {
                if (tagName === 'can-import') {
                    imports.pop();
                }
            }
        }, true);
        return {
            intermediate: intermediate,
            imports: imports,
            dynamicImports: dynamicImports,
            ases: ases,
            exports: ases
        };
    };
});
/*can-util@3.2.2#js/import/import*/
define('can-util/js/import/import', function (require, exports, module) {
    (function (global) {
        var isFunction = require('can-util/js/is-function/is-function');
        var global = require('can-util/js/global/global')();
        module.exports = function (moduleName, parentName) {
            return new Promise(function (resolve, reject) {
                try {
                    if (typeof global.System === 'object' && isFunction(global.System['import'])) {
                        global.System['import'](moduleName, { name: parentName }).then(resolve, reject);
                    } else if (global.define && global.define.amd) {
                        global.require([moduleName], function (value) {
                            resolve(value);
                        });
                    } else if (global.require) {
                        resolve(global.require(moduleName));
                    } else {
                        resolve();
                    }
                } catch (err) {
                    reject(err);
                }
            });
        };
    }(function () {
        return this;
    }()));
});
/*can-stache@3.0.19#can-stache*/
define('can-stache', function (require, exports, module) {
    var parser = require('can-view-parser');
    var viewCallbacks = require('can-view-callbacks');
    var HTMLSectionBuilder = require('can-stache/src/html_section');
    var TextSectionBuilder = require('can-stache/src/text_section');
    var mustacheCore = require('can-stache/src/mustache_core');
    var mustacheHelpers = require('can-stache/helpers/core');
    require('can-stache/helpers/converter');
    var getIntermediateAndImports = require('can-stache/src/intermediate_and_imports');
    var namespace = require('can-namespace');
    var DOCUMENT = require('can-util/dom/document/document');
    var assign = require('can-util/js/assign/assign');
    var last = require('can-util/js/last/last');
    var importer = require('can-util/js/import/import');
    require('can-view-target');
    require('can-view-nodelist');
    var svgNamespace = 'http://www.w3.org/2000/svg';
    var namespaces = {
            'svg': svgNamespace,
            'g': svgNamespace
        }, textContentOnlyTag = {
            style: true,
            script: true
        };
    function stache(template) {
        if (typeof template === 'string') {
            template = mustacheCore.cleanLineEndings(template);
        }
        var section = new HTMLSectionBuilder(), state = {
                node: null,
                attr: null,
                sectionElementStack: [],
                text: false,
                namespaceStack: [],
                textContentOnly: null
            }, makeRendererAndUpdateSection = function (section, mode, stache) {
                if (mode === '>') {
                    section.add(mustacheCore.makeLiveBindingPartialRenderer(stache, copyState()));
                } else if (mode === '/') {
                    section.endSection();
                    if (section instanceof HTMLSectionBuilder) {
                        state.sectionElementStack.pop();
                    }
                } else if (mode === 'else') {
                    section.inverse();
                } else {
                    var makeRenderer = section instanceof HTMLSectionBuilder ? mustacheCore.makeLiveBindingBranchRenderer : mustacheCore.makeStringBranchRenderer;
                    if (mode === '{' || mode === '&') {
                        section.add(makeRenderer(null, stache, copyState()));
                    } else if (mode === '#' || mode === '^') {
                        section.startSection(makeRenderer(mode, stache, copyState()));
                        if (section instanceof HTMLSectionBuilder) {
                            state.sectionElementStack.push('section');
                        }
                    } else {
                        section.add(makeRenderer(null, stache, copyState({ text: true })));
                    }
                }
            }, copyState = function (overwrites) {
                var lastElement = state.sectionElementStack[state.sectionElementStack.length - 1];
                var cur = {
                    tag: state.node && state.node.tag,
                    attr: state.attr && state.attr.name,
                    directlyNested: state.sectionElementStack.length ? lastElement === 'section' || lastElement === 'custom' : true,
                    textContentOnly: !!state.textContentOnly
                };
                return overwrites ? assign(cur, overwrites) : cur;
            }, addAttributesCallback = function (node, callback) {
                if (!node.attributes) {
                    node.attributes = [];
                }
                node.attributes.unshift(callback);
            };
        parser(template, {
            start: function (tagName, unary) {
                var matchedNamespace = namespaces[tagName];
                if (matchedNamespace && !unary) {
                    state.namespaceStack.push(matchedNamespace);
                }
                state.node = {
                    tag: tagName,
                    children: [],
                    namespace: matchedNamespace || last(state.namespaceStack)
                };
            },
            end: function (tagName, unary) {
                var isCustomTag = viewCallbacks.tag(tagName);
                if (unary) {
                    section.add(state.node);
                    if (isCustomTag) {
                        addAttributesCallback(state.node, function (scope, options, parentNodeList) {
                            viewCallbacks.tagHandler(this, tagName, {
                                scope: scope,
                                options: options,
                                subtemplate: null,
                                templateType: 'stache',
                                parentNodeList: parentNodeList
                            });
                        });
                    }
                } else {
                    section.push(state.node);
                    state.sectionElementStack.push(isCustomTag ? 'custom' : tagName);
                    if (isCustomTag) {
                        section.startSubSection();
                    } else if (textContentOnlyTag[tagName]) {
                        state.textContentOnly = new TextSectionBuilder();
                    }
                }
                state.node = null;
            },
            close: function (tagName) {
                var matchedNamespace = namespaces[tagName];
                if (matchedNamespace) {
                    state.namespaceStack.pop();
                }
                var isCustomTag = viewCallbacks.tag(tagName), renderer;
                if (isCustomTag) {
                    renderer = section.endSubSectionAndReturnRenderer();
                }
                if (textContentOnlyTag[tagName]) {
                    section.last().add(state.textContentOnly.compile(copyState()));
                    state.textContentOnly = null;
                }
                var oldNode = section.pop();
                if (isCustomTag) {
                    addAttributesCallback(oldNode, function (scope, options, parentNodeList) {
                        viewCallbacks.tagHandler(this, tagName, {
                            scope: scope,
                            options: options,
                            subtemplate: renderer,
                            templateType: 'stache',
                            parentNodeList: parentNodeList
                        });
                    });
                }
                state.sectionElementStack.pop();
            },
            attrStart: function (attrName) {
                if (state.node.section) {
                    state.node.section.add(attrName + '="');
                } else {
                    state.attr = {
                        name: attrName,
                        value: ''
                    };
                }
            },
            attrEnd: function (attrName) {
                if (state.node.section) {
                    state.node.section.add('" ');
                } else {
                    if (!state.node.attrs) {
                        state.node.attrs = {};
                    }
                    state.node.attrs[state.attr.name] = state.attr.section ? state.attr.section.compile(copyState()) : state.attr.value;
                    var attrCallback = viewCallbacks.attr(attrName);
                    if (attrCallback) {
                        if (!state.node.attributes) {
                            state.node.attributes = [];
                        }
                        state.node.attributes.push(function (scope, options, nodeList) {
                            attrCallback(this, {
                                attributeName: attrName,
                                scope: scope,
                                options: options,
                                nodeList: nodeList
                            });
                        });
                    }
                    state.attr = null;
                }
            },
            attrValue: function (value) {
                var section = state.node.section || state.attr.section;
                if (section) {
                    section.add(value);
                } else {
                    state.attr.value += value;
                }
            },
            chars: function (text) {
                (state.textContentOnly || section).add(text);
            },
            special: function (text) {
                var firstAndText = mustacheCore.splitModeFromExpression(text, state), mode = firstAndText.mode, expression = firstAndText.expression;
                if (expression === 'else') {
                    var inverseSection;
                    if (state.attr && state.attr.section) {
                        inverseSection = state.attr.section;
                    } else if (state.node && state.node.section) {
                        inverseSection = state.node.section;
                    } else {
                        inverseSection = state.textContentOnly || section;
                    }
                    inverseSection.inverse();
                    return;
                }
                if (mode === '!') {
                    return;
                }
                if (state.node && state.node.section) {
                    makeRendererAndUpdateSection(state.node.section, mode, expression);
                    if (state.node.section.subSectionDepth() === 0) {
                        state.node.attributes.push(state.node.section.compile(copyState()));
                        delete state.node.section;
                    }
                } else if (state.attr) {
                    if (!state.attr.section) {
                        state.attr.section = new TextSectionBuilder();
                        if (state.attr.value) {
                            state.attr.section.add(state.attr.value);
                        }
                    }
                    makeRendererAndUpdateSection(state.attr.section, mode, expression);
                } else if (state.node) {
                    if (!state.node.attributes) {
                        state.node.attributes = [];
                    }
                    if (!mode) {
                        state.node.attributes.push(mustacheCore.makeLiveBindingBranchRenderer(null, expression, copyState()));
                    } else if (mode === '#' || mode === '^') {
                        if (!state.node.section) {
                            state.node.section = new TextSectionBuilder();
                        }
                        makeRendererAndUpdateSection(state.node.section, mode, expression);
                    } else {
                        throw new Error(mode + ' is currently not supported within a tag.');
                    }
                } else {
                    makeRendererAndUpdateSection(state.textContentOnly || section, mode, expression);
                }
            },
            comment: function (text) {
                section.add({ comment: text });
            },
            done: function () {
            }
        });
        return section.compile();
    }
    assign(stache, mustacheHelpers);
    stache.safeString = function (text) {
        return {
            toString: function () {
                return text;
            }
        };
    };
    stache.async = function (source) {
        var iAi = getIntermediateAndImports(source);
        var importPromises = iAi.imports.map(function (moduleName) {
            return importer(moduleName);
        });
        return Promise.all(importPromises).then(function () {
            return stache(iAi.intermediate);
        });
    };
    var templates = {};
    stache.from = mustacheCore.getTemplateById = function (id) {
        if (!templates[id]) {
            var el = DOCUMENT().getElementById(id);
            templates[id] = stache(el.innerHTML);
        }
        return templates[id];
    };
    stache.registerPartial = function (id, partial) {
        templates[id] = typeof partial === 'string' ? stache(partial) : partial;
    };
    module.exports = namespace.stache = stache;
});
/*can-stache@3.0.19#helpers/route*/
define('can-stache/helpers/route', function (require, exports, module) {
    var helpers = require('can-stache/helpers/core');
    var route = require('can-route');
    var getLast = require('can-util/js/last/last');
    var stacheExpression = require('can-stache/src/expression');
    var each = require('can-util/js/each/each');
    var looksLikeOptions = helpers.looksLikeOptions;
    var calculateArgs = function () {
        var finalParams, finalMerge, optionsArg;
        each(arguments, function (arg) {
            if (typeof arg === 'boolean') {
                finalMerge = arg;
            } else if (arg && typeof arg === 'object') {
                if (!looksLikeOptions(arg)) {
                    finalParams = helpers.resolveHash(arg);
                } else {
                    optionsArg = arg;
                }
            }
        });
        if (!finalParams && optionsArg) {
            finalParams = helpers.resolveHash(optionsArg.hash);
        }
        return {
            finalParams: finalParams || {},
            finalMerge: finalMerge,
            optionsArg: optionsArg
        };
    };
    helpers.registerHelper('routeUrl', function () {
        var args = calculateArgs.apply(this, arguments);
        return route.url(args.finalParams, typeof args.finalMerge === 'boolean' ? args.finalMerge : undefined);
    });
    var routeCurrent = function () {
        var args = calculateArgs.apply(this, arguments);
        var result = route.current(args.finalParams, typeof args.finalMerge === 'boolean' ? args.finalMerge : undefined);
        if (args.optionsArg && !(args.optionsArg instanceof stacheExpression.Call)) {
            if (result) {
                return args.optionsArg.fn();
            } else {
                return args.optionsArg.inverse();
            }
        } else {
            return result;
        }
    };
    routeCurrent.callAsMethod = true;
    helpers.registerHelper('routeCurrent', routeCurrent);
});
/*can@3.4.1#can*/
define('can', function (require, exports, module) {
    var can = require('can-util/namespace');
    require('can-component');
    require('can-compute');
    require('can-connect/all');
    require('can-define/map/map');
    require('can-define/list/list');
    require('can-route');
    require('can-set');
    require('can-stache');
    require('can-stache/helpers/route');
    require('can-stache-bindings');
    module.exports = can;
});
/*can-util@3.2.2#js/omit/omit*/
define('can-util/js/omit/omit', function (require, exports, module) {
    module.exports = function (source, propsToOmit) {
        var result = {};
        for (var prop in source) {
            if (propsToOmit.indexOf(prop) < 0) {
                result[prop] = source[prop];
            }
        }
        return result;
    };
});
/*can-util@3.2.2#dom/dom*/
define('can-util/dom/dom', function (require, exports, module) {
    (function (global) {
        module.exports = {
            ajax: require('can-util/dom/ajax/ajax'),
            attr: require('can-util/dom/attr/attr'),
            childNodes: require('can-util/dom/child-nodes/child-nodes'),
            className: require('can-util/dom/class-name/class-name'),
            contains: require('can-util/dom/contains/contains'),
            data: require('can-util/dom/data/data'),
            dispatch: require('can-util/dom/dispatch/dispatch'),
            document: require('can-util/dom/document/document'),
            events: require('can-util/dom/events/events'),
            frag: require('can-util/dom/frag/frag'),
            fragment: require('can-util/dom/fragment/fragment'),
            isOfGlobalDocument: require('can-util/dom/is-of-global-document/is-of-global-document'),
            matches: require('can-util/dom/matches/matches'),
            mutate: require('can-util/dom/mutate/mutate'),
            mutationObserver: require('can-util/dom/mutation-observer/mutation-observer')
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#js/cid/cid*/
define('can-util/js/cid/cid', function (require, exports, module) {
    module.exports = require('can-cid');
});
/*can-util@3.2.2#js/is-node/is-node*/
define('can-util/js/is-node/is-node', function (require, exports, module) {
    (function (global) {
        module.exports = function () {
            return typeof process === 'object' && {}.toString.call(process) === '[object process]';
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#js/is-string/is-string*/
define('can-util/js/is-string/is-string', function (require, exports, module) {
    module.exports = function isString(obj) {
        return typeof obj === 'string';
    };
});
/*can-util@3.2.2#js/types/types*/
define('can-util/js/types/types', function (require, exports, module) {
    module.exports = require('can-types');
});
/*can-util@3.2.2#js/js*/
define('can-util/js/js', function (require, exports, module) {
    (function (global) {
        module.exports = {
            assign: require('can-util/js/assign/assign'),
            cid: require('can-util/js/cid/cid'),
            deepAssign: require('can-util/js/deep-assign/deep-assign'),
            dev: require('can-util/js/dev/dev'),
            diff: require('can-util/js/diff/diff'),
            each: require('can-util/js/each/each'),
            global: require('can-util/js/global/global'),
            'import': require('can-util/js/import/import'),
            isArray: require('can-util/js/is-array/is-array'),
            isArrayLike: require('can-util/js/is-array-like/is-array-like'),
            isBrowserWindow: require('can-util/js/is-browser-window/is-browser-window'),
            isEmptyObject: require('can-util/js/is-empty-object/is-empty-object'),
            isFunction: require('can-util/js/is-function/is-function'),
            isNode: require('can-util/js/is-node/is-node'),
            isPlainObject: require('can-util/js/is-plain-object/is-plain-object'),
            isPromise: require('can-util/js/is-promise/is-promise'),
            isString: require('can-util/js/is-string/is-string'),
            isWebWorker: require('can-util/js/is-web-worker/is-web-worker'),
            joinURIs: require('can-util/js/join-uris/join-uris'),
            last: require('can-util/js/last/last'),
            makeArray: require('can-util/js/make-array/make-array'),
            omit: require('can-util/js/omit/omit'),
            setImmediate: require('can-util/js/set-immediate/set-immediate'),
            string: require('can-util/js/string/string'),
            types: require('can-util/js/types/types')
        };
    }(function () {
        return this;
    }()));
});
/*can-util@3.2.2#can-util*/
define('can-util', function (require, exports, module) {
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var omit = require('can-util/js/omit/omit');
    var namespace = require('can-namespace');
    module.exports = deepAssign(namespace, require('can-util/dom/dom'), omit(require('can-util/js/js'), [
        'cid',
        'types'
    ]));
});
/*can-construct-super@3.0.2#can-construct-super*/
define('can-construct-super', function (require, exports, module) {
    (function (global) {
        var can = require('can-util');
        var Construct = require('can-construct');
        var isFunction = can.isFunction, fnTest = /xyz/.test(function () {
                return this.xyz;
            }) ? /\b_super\b/ : /.*/, getset = [
                'get',
                'set'
            ], getSuper = function (base, name, fn) {
                return function () {
                    var tmp = this._super, ret;
                    this._super = base[name];
                    ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            };
        Construct._defineProperty = function (addTo, base, name, descriptor) {
            var _super = Object.getOwnPropertyDescriptor(base, name);
            if (_super) {
                can.each(getset, function (method) {
                    if (isFunction(_super[method]) && isFunction(descriptor[method])) {
                        descriptor[method] = getSuper(_super, method, descriptor[method]);
                    } else if (!isFunction(descriptor[method])) {
                        descriptor[method] = _super[method];
                    }
                });
            }
            Object.defineProperty(addTo, name, descriptor);
        };
        var getPrototypeOf = Object.getPrototypeOf || function (obj) {
            return obj.__proto__;
        };
        var getPropertyDescriptor = Object.getPropertyDescriptor || function (subject, name) {
            if (name in subject) {
                var pd = Object.getOwnPropertyDescriptor(subject, name);
                var proto = getPrototypeOf(subject);
                while (pd === undefined && proto !== null) {
                    pd = Object.getOwnPropertyDescriptor(proto, name);
                    proto = getPrototypeOf(proto);
                }
                return pd;
            }
        };
        Construct._overwrite = function (addTo, base, name, val) {
            var baseDescriptor = getPropertyDescriptor(base, name);
            var baseValue = baseDescriptor && baseDescriptor.value;
            Object.defineProperty(addTo, name, {
                value: isFunction(val) && isFunction(baseValue) && fnTest.test(val) ? getSuper(base, name, val) : val,
                configurable: true,
                enumerable: true,
                writable: true
            });
        };
        module.exports = Construct;
    }(function () {
        return this;
    }()));
});
/*can-fixture@1.0.12#helpers/getid*/
define('can-fixture/helpers/getid', function (require, exports, module) {
    module.exports = function (xhrSettings, fixtureSettings) {
        var id = xhrSettings.data.id;
        if (id === undefined && typeof xhrSettings.data === 'number') {
            id = xhrSettings.data;
        }
        if (id === undefined) {
            xhrSettings.url.replace(/\/(\d+)(\/|$|\.)/g, function (all, num) {
                id = num;
            });
        }
        if (id === undefined) {
            id = xhrSettings.url.replace(/\/(\w+)(\/|$|\.)/g, function (all, num) {
                if (num !== 'update') {
                    id = num;
                }
            });
        }
        if (id === undefined) {
            id = Math.round(Math.random() * 1000);
        }
        return id;
    };
});
/*can-fixture@1.0.12#helpers/legacyStore*/
define('can-fixture/helpers/legacyStore', function (require, exports, module) {
    var getId = require('can-fixture/helpers/getid');
    var canSet = require('can-set');
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    var each = require('can-util/js/each/each');
    var assign = require('can-util/js/assign/assign');
    module.exports = function (count, make, filter) {
        var currentId = 0, items, findOne = function (id) {
                for (var i = 0; i < items.length; i++) {
                    if (id == items[i].id) {
                        return items[i];
                    }
                }
            }, methods = {}, types, reset;
        if (isArrayLike(count) && typeof count[0] === 'string') {
            types = count;
            count = make;
            make = filter;
            filter = arguments[3];
        } else if (typeof count === 'string') {
            types = [
                count + 's',
                count
            ];
            count = make;
            make = filter;
            filter = arguments[3];
        }
        if (typeof count === 'number') {
            items = [];
            reset = function () {
                items = [];
                for (var i = 0; i < count; i++) {
                    var item = make(i, items);
                    if (!item.id) {
                        item.id = i;
                    }
                    currentId = Math.max(item.id + 1, currentId + 1) || items.length;
                    items.push(item);
                }
            };
        } else {
            filter = make;
            var initialItems = count;
            reset = function () {
                items = initialItems.slice(0);
            };
        }
        assign(methods, {
            getListData: function (request) {
                request = request || {};
                var retArr = items.slice(0);
                request.data = request.data || {};
                each((request.data.order || []).slice(0).reverse(), function (name) {
                    var split = name.split(' ');
                    retArr = retArr.sort(function (a, b) {
                        if (split[1].toUpperCase() !== 'ASC') {
                            if (a[split[0]] < b[split[0]]) {
                                return 1;
                            } else if (a[split[0]] === b[split[0]]) {
                                return 0;
                            } else {
                                return -1;
                            }
                        } else {
                            if (a[split[0]] < b[split[0]]) {
                                return -1;
                            } else if (a[split[0]] === b[split[0]]) {
                                return 0;
                            } else {
                                return 1;
                            }
                        }
                    });
                });
                each((request.data.group || []).slice(0).reverse(), function (name) {
                    var split = name.split(' ');
                    retArr = retArr.sort(function (a, b) {
                        return a[split[0]] > b[split[0]];
                    });
                });
                var offset = parseInt(request.data.offset, 10) || 0, limit = parseInt(request.data.limit, 10) || items.length - offset, i = 0;
                for (var param in request.data) {
                    i = 0;
                    if (request.data[param] !== undefined && (param.indexOf('Id') !== -1 || param.indexOf('_id') !== -1)) {
                        while (i < retArr.length) {
                            if (request.data[param] != retArr[i][param]) {
                                retArr.splice(i, 1);
                            } else {
                                i++;
                            }
                        }
                    }
                }
                if (typeof filter === 'function') {
                    i = 0;
                    while (i < retArr.length) {
                        if (!filter(retArr[i], request)) {
                            retArr.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                } else if (typeof filter === 'object') {
                    i = 0;
                    while (i < retArr.length) {
                        var subset = canSet.subset(retArr[i], request.data, filter);
                        if (!subset) {
                            retArr.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }
                var responseData = {
                    'count': retArr.length,
                    'data': retArr.slice(offset, offset + limit)
                };
                each([
                    'limit',
                    'offset'
                ], function (prop) {
                    if (prop in request.data) {
                        responseData[prop] = request.data[prop];
                    }
                });
                return responseData;
            },
            getData: function (request, response) {
                var item = findOne(getId(request));
                if (typeof item === 'undefined') {
                    return response(404, 'Requested resource not found');
                }
                response(item);
            },
            updateData: function (request, response) {
                var id = getId(request), item = findOne(id);
                if (typeof item === 'undefined') {
                    return response(404, 'Requested resource not found');
                }
                assign(item, request.data);
                response({ id: id }, { location: request.url || '/' + getId(request) });
            },
            destroyData: function (request, response) {
                var id = getId(request), item = findOne(id);
                if (typeof item === 'undefined') {
                    return response(404, 'Requested resource not found');
                }
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id == id) {
                        items.splice(i, 1);
                        break;
                    }
                }
                return {};
            },
            createData: function (settings, response) {
                var item = typeof make === 'function' ? make(items.length, items) : {};
                assign(item, settings.data);
                if (!item.id) {
                    item.id = currentId++;
                }
                items.push(item);
                response({ id: item.id }, { location: settings.url + '/' + item.id });
            }
        });
        reset();
        return assign({
            findAll: methods.getListData,
            findOne: methods.getData,
            create: methods.createData,
            update: methods.updateData,
            destroy: methods.destroyData,
            getId: getId,
            find: function (settings) {
                return findOne(getId(settings));
            },
            reset: reset
        }, methods);
    };
});
/*can-fixture@1.0.12#store*/
define('can-fixture/store', function (require, exports, module) {
    var canSet = require('can-set');
    var connect = require('can-connect');
    var legacyStore = require('can-fixture/helpers/legacyStore');
    var each = require('can-util/js/each/each');
    var assign = require('can-util/js/assign/assign');
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    var dataMemoryCache = require('can-connect/data/memory-cache/memory-cache');
    var firstProp = function (obj) {
        for (var prop in obj) {
            return prop;
        }
    };
    var connectToConnection = function (method) {
        return function (req, res) {
            this.connection[method](req.data).then(function (data) {
                res(data);
            }, function (err) {
                res(403, err);
            });
        };
    };
    var makeMakeItems = function (baseItems, idProp) {
        return function () {
            var items = [], maxId = 0;
            each(baseItems, function (item) {
                items.push(JSON.parse(JSON.stringify(item)));
                maxId = Math.max(item[idProp] + 1, maxId + 1) || items.length;
            });
            return {
                maxId: maxId,
                items: items
            };
        };
    };
    var Store = function (connection, makeItems, idProp) {
        this.connection = connection;
        this.makeItems = makeItems;
        this.idProp = idProp;
        this.reset();
        for (var method in Store.prototype) {
            this[method] = this[method].bind(this);
        }
    };
    assign(Store.prototype, {
        getListData: connectToConnection('getListData'),
        getData: connectToConnection('getData'),
        createData: function (req, res) {
            var idProp = this.idProp;
            req.data[idProp] = ++this.maxId;
            this.connection.createData(req.data).then(function (data) {
                var responseData = {};
                responseData[idProp] = req.data[idProp];
                res(responseData);
            }, function (err) {
                res(403, err);
            });
        },
        updateData: connectToConnection('updateData'),
        destroyData: connectToConnection('destroyData'),
        reset: function (newItems) {
            if (newItems) {
                this.makeItems = makeMakeItems(newItems, this.idProp);
            }
            var itemData = this.makeItems();
            this.maxId = itemData.maxId;
            this.connection.addSet({}, { data: itemData.items });
        },
        get: function (params) {
            var id = this.connection.id(params);
            return this.connection.getInstance(id);
        },
        getList: function (set) {
            return this.connection._getListData(set);
        }
    });
    each({
        findAll: 'getListData',
        findOne: 'getData',
        create: 'createData',
        update: 'updateData',
        destroy: 'destroyData'
    }, function (method, prop) {
        Store.prototype[prop] = function () {
            return this[method].apply(this, arguments);
        };
    });
    Store.make = function (count, make, algebra) {
        var isNew = false;
        if (count instanceof canSet.Algebra || make instanceof canSet.Algebra || algebra instanceof canSet.Algebra) {
            isNew = true;
        }
        if (!isNew) {
            return legacyStore.apply(this, arguments);
        }
        var makeItems, idProp;
        if (typeof count === 'number') {
            idProp = firstProp(algebra.clauses.id || {}) || 'id';
            makeItems = function () {
                var items = [];
                var maxId = 0;
                for (var i = 0; i < count; i++) {
                    var item = make(i, items);
                    if (!item[idProp]) {
                        item[idProp] = i;
                    }
                    maxId = Math.max(item[idProp] + 1, maxId + 1) || items.length;
                    items.push(item);
                }
                return {
                    maxId: maxId,
                    items: items
                };
            };
        } else if (isArrayLike(count)) {
            algebra = make;
            idProp = firstProp(algebra.clauses.id || {}) || 'id';
            makeItems = makeMakeItems(count, idProp);
        }
        var connection = connect([dataMemoryCache], {
            algebra: algebra,
            idProp: idProp
        });
        return new Store(connection, makeItems, idProp);
    };
    module.exports = Store;
});
/*can-fixture@1.0.12#core*/
define('can-fixture/core', function (require, exports, module) {
    var canSet = require('can-set');
    var sub = require('can-util/js/string/string').sub;
    var each = require('can-util/js/each/each');
    var assign = require('can-util/js/assign/assign');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    require('can-fixture/store');
    var fixtures = [];
    exports.fixtures = fixtures;
    exports.add = function (settings, fixture) {
        if (fixture && (fixture.getData || fixture.getListData)) {
            var root = settings, store = fixture, idProp = store.idProp, itemRegex = new RegExp('\\/\\{' + idProp + '\\}.*'), rootIsItemUrl = itemRegex.test(root), getListUrl = rootIsItemUrl ? root.replace(itemRegex, '') : root, getItemUrl = rootIsItemUrl ? root : root.trim() + '/{' + idProp + '}';
            fixture = undefined;
            settings = {};
            settings['GET ' + getItemUrl] = store.getData;
            settings['DELETE ' + getItemUrl] = store.destroyData;
            settings['PUT ' + getItemUrl] = store.updateData;
            settings['GET ' + getListUrl] = store.getListData;
            settings['POST ' + getListUrl] = store.createData;
        }
        if (fixture !== undefined) {
            if (typeof settings === 'string') {
                var matches = settings.match(/(GET|POST|PUT|DELETE|PATCH) (.+)/i);
                if (!matches) {
                    settings = { url: settings };
                } else {
                    settings = {
                        url: matches[2],
                        type: matches[1]
                    };
                }
            }
            var index = exports.index(settings, true);
            if (index > -1) {
                fixtures.splice(index, 1);
            }
            if (fixture == null) {
                return;
            }
            if (typeof fixture === 'object') {
                var data = fixture;
                fixture = function () {
                    return data;
                };
            }
            settings.fixture = fixture;
            fixtures.unshift(settings);
        } else {
            each(settings, function (fixture, url) {
                exports.add(url, fixture);
            });
        }
    };
    var $fixture = exports.add;
    $fixture.on = true;
    $fixture.delay = 10;
    exports.callDynamicFixture = function (xhrSettings, fixtureSettings, cb) {
        xhrSettings.data = fixtureSettings.data;
        var json = JSON.stringify(xhrSettings.data);
        exports.log('' + xhrSettings.type.toUpperCase() + ' ' + xhrSettings.url + ' ' + json.substr(0, 50) + ' -> handler(req,res)');
        var response = function () {
            var res = exports.extractResponse.apply(xhrSettings, arguments);
            return cb.apply(this, res);
        };
        var callFixture = function () {
            var result = fixtureSettings.fixture(xhrSettings, response, xhrSettings.headers, fixtureSettings);
            if (result !== undefined) {
                response(200, result);
            }
        };
        if (!xhrSettings.async) {
            callFixture();
            return null;
        } else {
            return setTimeout(callFixture, $fixture.delay);
        }
    };
    exports.index = function (settings, exact) {
        for (var i = 0; i < fixtures.length; i++) {
            if (exports.matches(settings, fixtures[i], exact)) {
                return i;
            }
        }
        return -1;
    };
    exports.get = function (xhrSettings) {
        if (!$fixture.on) {
            return;
        }
        var index = exports.index(xhrSettings, true);
        if (index === -1) {
            index = exports.index(xhrSettings, false);
        }
        var fixtureSettings = index >= 0 ? assign({}, fixtures[index]) : undefined;
        if (fixtureSettings) {
            var url = fixtureSettings.fixture, data = exports.dataFromUrl(fixtureSettings.url, xhrSettings.url);
            if (typeof fixtureSettings.fixture === 'string') {
                if (data) {
                    url = sub(url, data);
                }
                fixtureSettings.url = url;
                fixtureSettings.data = null;
                fixtureSettings.type = 'GET';
                if (!fixtureSettings.error) {
                    fixtureSettings.error = function (xhr, error, message) {
                        throw 'fixtures.js Error ' + error + ' ' + message;
                    };
                }
            } else {
                var xhrData = assign({}, xhrSettings.data || {});
                fixtureSettings.data = assign(xhrData, data);
            }
        }
        return fixtureSettings;
    };
    exports.matches = function (settings, fixture, exact) {
        if (exact) {
            return canSet.equal(settings, fixture, {
                fixture: function () {
                    return true;
                }
            });
        } else {
            return canSet.subset(settings, fixture, exports.defaultCompare);
        }
    };
    var isEmptyOrNull = function (a, b) {
        if (a == null && isEmptyObject(b)) {
            return true;
        } else if (b == null && isEmptyObject(a)) {
            return true;
        } else {
            return canSet.equal(a, b);
        }
    };
    var isEmptyOrSubset = function (a, b) {
        if (a == null && isEmptyObject(b)) {
            return true;
        } else if (b == null && isEmptyObject(a)) {
            return true;
        } else {
            return canSet.subset(a, b);
        }
    };
    exports.defaultCompare = {
        url: function (a, b) {
            return !!exports.dataFromUrl(b, a);
        },
        fixture: function () {
            return true;
        },
        xhr: function () {
            return true;
        },
        type: function (a, b) {
            return b && a ? a.toLowerCase() === b.toLowerCase() : b === a;
        },
        method: function (a, b) {
            return b && a ? a.toLowerCase() === b.toLowerCase() : b === a;
        },
        helpers: function () {
            return true;
        },
        headers: isEmptyOrNull,
        data: isEmptyOrSubset
    };
    var replacer = /\{([^\}]+)\}/g;
    exports.dataFromUrl = function (fixtureUrl, url) {
        if (!fixtureUrl) {
            return {};
        }
        var order = [], fixtureUrlAdjusted = fixtureUrl.replace('.', '\\.').replace('?', '\\?'), res = new RegExp(fixtureUrlAdjusted.replace(replacer, function (whole, part) {
                order.push(part);
                return '([^/]+)';
            }) + '$').exec(url), data = {};
        if (!res) {
            return null;
        }
        res.shift();
        each(order, function (name) {
            data[name] = res.shift();
        });
        return data;
    };
    exports.extractResponse = function (status, response, headers, statusText) {
        if (typeof status !== 'number') {
            headers = response;
            response = status;
            status = 200;
        }
        if (typeof headers === 'string') {
            statusText = headers;
            headers = {};
        }
        return [
            status,
            response,
            headers,
            statusText
        ];
    };
    exports.log = function () {
        console.log('can-fixture: ' + Array.prototype.slice.call(arguments).join(' '));
    };
});
/*can-fixture@1.0.12#helpers/deparam*/
define('can-fixture/helpers/deparam', function (require, exports, module) {
    var each = require('can-util/js/each/each');
    var digitTest = /^\d+$/, keyBreaker = /([^\[\]]+)|(\[\])/g, paramTest = /([^?#]*)(#.*)?$/, prep = function (str) {
            return decodeURIComponent(str.replace(/\+/g, ' '));
        };
    module.exports = function (params) {
        var data = {}, pairs, lastPart;
        if (params && paramTest.test(params)) {
            pairs = params.split('&');
            each(pairs, function (pair) {
                var parts = pair.split('='), key = prep(parts.shift()), value = prep(parts.join('=')), current = data;
                if (key) {
                    parts = key.match(keyBreaker);
                    for (var j = 0, l = parts.length - 1; j < l; j++) {
                        if (!current[parts[j]]) {
                            current[parts[j]] = digitTest.test(parts[j + 1]) || parts[j + 1] === '[]' ? [] : {};
                        }
                        current = current[parts[j]];
                    }
                    lastPart = parts.pop();
                    if (lastPart === '[]') {
                        current.push(value);
                    } else {
                        current[lastPart] = value;
                    }
                }
            });
        }
        return data;
    };
});
/*can-fixture@1.0.12#xhr*/
define('can-fixture/xhr', function (require, exports, module) {
    (function (global) {
        var fixtureCore = require('can-fixture/core');
        var deparam = require('can-fixture/helpers/deparam');
        var assign = require('can-util/js/assign/assign');
        var each = require('can-util/js/each/each');
        var XHR = XMLHttpRequest, GLOBAL = typeof global !== 'undefined' ? global : window;
        var props = [
            'type',
            'url',
            'async',
            'response',
            'responseText',
            'responseType',
            'responseXML',
            'responseURL',
            'status',
            'statusText',
            'readyState'
        ];
        var events = [
            'abort',
            'error',
            'load',
            'loadend',
            'loadstart',
            'progress',
            'readystatechange'
        ];
        (function () {
            var x = new XHR();
            for (var prop in x) {
                if (prop.indexOf('on') === 0) {
                    if (events.indexOf(prop.substr(2)) === -1) {
                        events.push(prop.substr(2));
                    }
                } else if (props.indexOf(prop) === -1 && typeof x[prop] !== 'function') {
                    props.push(prop);
                }
            }
        }());
        function callEvents(xhr, ev) {
            var evs = xhr.__events[ev] || [], fn;
            for (var i = 0, len = evs.length; i < len; i++) {
                fn = evs[i];
                fn.call(xhr);
            }
        }
        GLOBAL.XMLHttpRequest = function () {
            var mockXHR = this;
            var realXHR = new XHR();
            this._xhr = realXHR;
            this._requestHeaders = {};
            this.__events = {};
            each(events, function (eventName) {
                realXHR['on' + eventName] = function () {
                    callEvents(mockXHR, eventName);
                    if (mockXHR['on' + eventName]) {
                        return mockXHR['on' + eventName].apply(mockXHR, arguments);
                    }
                };
            });
            this.onload = null;
        };
        GLOBAL.XMLHttpRequest._XHR = XHR;
        assign(XMLHttpRequest.prototype, {
            setRequestHeader: function (name, value) {
                this._requestHeaders[name] = value;
            },
            open: function (type, url, async) {
                this.type = type;
                this.url = url;
                this.async = async === false ? false : true;
            },
            getAllResponseHeaders: function () {
                return this._xhr.getAllResponseHeaders.apply(this._xhr, arguments);
            },
            addEventListener: function (ev, fn) {
                var evs = this.__events[ev] = this.__events[ev] || [];
                evs.push(fn);
            },
            removeEventListener: function (ev, fn) {
                var evs = this.__events[ev] = this.__events[ev] || [];
                var idx = evs.indexOf(fn);
                if (idx >= 0) {
                    evs.splice(idx, 1);
                }
            },
            setDisableHeaderCheck: function (val) {
                this._disableHeaderCheck = !!val;
            },
            getResponseHeader: function (key) {
                return this._xhr.getResponseHeader(key);
            },
            abort: function () {
                var xhr = this._xhr;
                if (this.timeoutId !== undefined) {
                    clearTimeout(this.timeoutId);
                    xhr.open(this.type, this.url, this.async === false ? false : true);
                    xhr.send();
                }
                return xhr.abort();
            },
            send: function (data) {
                var type = this.type.toLowerCase() || 'get';
                var xhrSettings = {
                    url: this.url,
                    data: data,
                    headers: this._requestHeaders,
                    type: type,
                    method: type,
                    async: this.async,
                    xhr: this
                };
                if (!xhrSettings.data && xhrSettings.type === 'get' || xhrSettings.type === 'delete') {
                    xhrSettings.data = deparam(xhrSettings.url.split('?')[1]);
                    xhrSettings.url = xhrSettings.url.split('?')[0];
                }
                if (typeof xhrSettings.data === 'string') {
                    try {
                        xhrSettings.data = JSON.parse(xhrSettings.data);
                    } catch (e) {
                        xhrSettings.data = deparam(xhrSettings.data);
                    }
                }
                var fixtureSettings = fixtureCore.get(xhrSettings);
                var mockXHR = this;
                if (fixtureSettings && typeof fixtureSettings.fixture === 'function') {
                    this.timeoutId = fixtureCore.callDynamicFixture(xhrSettings, fixtureSettings, function (status, body, headers, statusText) {
                        body = typeof body === 'string' ? body : JSON.stringify(body);
                        mockXHR._xhr = {
                            open: function () {
                            },
                            send: function () {
                            },
                            abort: function () {
                            },
                            getResponseHeader: function () {
                            }
                        };
                        assign(mockXHR, {
                            readyState: 4,
                            status: status
                        });
                        var success = status >= 200 && status < 300 || status === 304;
                        if (success) {
                            assign(mockXHR, {
                                statusText: statusText || 'OK',
                                responseText: body
                            });
                        } else {
                            assign(mockXHR, {
                                statusText: statusText || 'error',
                                responseText: body
                            });
                        }
                        mockXHR.getAllResponseHeaders = function () {
                            var ret = [];
                            each(headers || {}, function (value, name) {
                                Array.prototype.push.apply(ret, [
                                    name,
                                    ': ',
                                    value,
                                    '\r\n'
                                ]);
                            });
                            return ret.join('');
                        };
                        if (mockXHR.onreadystatechange) {
                            mockXHR.onreadystatechange({ target: mockXHR });
                        }
                        callEvents(mockXHR, 'progress');
                        if (mockXHR.onprogress) {
                            mockXHR.onprogress();
                        }
                        callEvents(mockXHR, 'load');
                        if (mockXHR.onload) {
                            mockXHR.onload();
                        }
                        callEvents(mockXHR, 'loadend');
                        if (mockXHR.onloadend) {
                            mockXHR.onloadend();
                        }
                    });
                    return;
                }
                var makeRequest = function () {
                    mockXHR._xhr.open(mockXHR._xhr.type, mockXHR._xhr.url, mockXHR._xhr.async);
                    if (mockXHR._requestHeaders) {
                        Object.keys(mockXHR._requestHeaders).forEach(function (key) {
                            mockXHR._xhr.setRequestHeader(key, mockXHR._requestHeaders[key]);
                        });
                    }
                    return mockXHR._xhr.send(data);
                };
                if (fixtureSettings && typeof fixtureSettings.fixture === 'number') {
                    fixtureCore.log(xhrSettings.url + ' -> delay ' + fixtureSettings.fixture + 'ms');
                    this.timeoutId = setTimeout(makeRequest, fixtureSettings.fixture);
                    return;
                }
                if (fixtureSettings) {
                    fixtureCore.log(xhrSettings.url + ' -> ' + fixtureSettings.url);
                    assign(mockXHR, fixtureSettings);
                }
                return makeRequest();
            }
        });
        each(props, function (prop) {
            Object.defineProperty(XMLHttpRequest.prototype, prop, {
                get: function () {
                    return this._xhr[prop];
                },
                set: function (newVal) {
                    try {
                        this._xhr[prop] = newVal;
                    } catch (e) {
                    }
                }
            });
        });
    }(function () {
        return this;
    }()));
});
/*can-fixture@1.0.12#fixture*/
define('can-fixture', function (require, exports, module) {
    var core = require('can-fixture/core');
    var fixture = core.add;
    var Store = require('can-fixture/store');
    require('can-fixture/xhr');
    var assign = require('can-util/js/assign/assign');
    var ns = require('can-namespace');
    var noop = function () {
    };
    assign(fixture, {
        rand: function randomize(arr, min, max) {
            if (typeof arr === 'number') {
                if (typeof min === 'number') {
                    return arr + Math.floor(Math.random() * (min - arr + 1));
                } else {
                    return Math.floor(Math.random() * (arr + 1));
                }
            }
            var choices = arr.slice(0);
            if (min === undefined) {
                min = 1;
                max = choices.length;
            } else if (max === undefined) {
                max = min;
            }
            var result = [];
            var selectedCount = min + Math.round(randomize(max - min));
            for (var i = 0; i < selectedCount; i++) {
                var selectedIndex = randomize(choices.length - 1), selected = choices.splice(selectedIndex, 1)[0];
                result.push(selected);
            }
            return result;
        },
        xhr: function (xhr) {
            return assign({}, {
                abort: noop,
                getAllResponseHeaders: function () {
                    return '';
                },
                getResponseHeader: function () {
                    return '';
                },
                open: noop,
                overrideMimeType: noop,
                readyState: 4,
                responseText: '',
                responseXML: null,
                send: noop,
                setRequestHeader: noop,
                status: 200,
                statusText: 'OK'
            }, xhr);
        },
        store: Store.make,
        fixtures: core.fixtures
    });
    if (typeof window !== 'undefined' && typeof require.resolve !== 'function') {
        window.fixture = fixture;
    }
    module.exports = ns.fixture = fixture;
});
/*can-jquery@3.0.3#can-jquery*/
define('can-jquery', function (require, exports, module) {
    var $ = require('jquery');
    var ns = require('can-util/namespace');
    var buildFragment = require('can-util/dom/fragment/fragment');
    var domEvents = require('can-util/dom/events/events');
    var domData = require('can-util/dom/data/data');
    var domDispatch = require('can-util/dom/dispatch/dispatch');
    var each = require('can-util/js/each/each');
    var getChildNodes = require('can-util/dom/child-nodes/child-nodes');
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    var makeArray = require('can-util/js/make-array/make-array');
    var mutate = require('can-util/dom/mutate/mutate');
    var setImmediate = require('can-util/js/set-immediate/set-immediate');
    var canViewModel = require('can-view-model');
    module.exports = ns.$ = $;
    var specialEvents = {};
    var nativeDispatchEvents = { focus: true };
    var inSpecial = false;
    var EVENT_HANDLER = 'can-jquery.eventHandler';
    var slice = Array.prototype.slice;
    if ($) {
        var domDispatch = domEvents.dispatch;
        domEvents.dispatch = function (event, args) {
            if (!specialEvents[event] && !nativeDispatchEvents[event]) {
                $(this).trigger(event, args);
            } else {
                domDispatch.apply(this, arguments);
            }
        };
        var addEventListener = domEvents.addEventListener;
        domEvents.addEventListener = function (event, callback) {
            var handler;
            if (!inSpecial) {
                if (event === 'removed') {
                    var element = this;
                    handler = function (ev) {
                        ev.eventArguments = slice.call(arguments, 1);
                        domEvents.removeEventListener.call(element, event, handler);
                        var self = this, args = arguments;
                        return setImmediate(function () {
                            return callback.apply(self, args);
                        });
                    };
                    domData.set.call(callback, EVENT_HANDLER, handler);
                }
                $(this).on(event, handler || callback);
                return;
            }
            return addEventListener.call(this, event, handler || callback);
        };
        var removeEventListener = domEvents.removeEventListener;
        domEvents.removeEventListener = function (event, callback) {
            if (!inSpecial) {
                var eventHandler;
                if (event === 'removed') {
                    eventHandler = domData.get.call(callback, EVENT_HANDLER);
                }
                $(this).off(event, eventHandler || callback);
                return;
            }
            return removeEventListener.apply(this, arguments);
        };
        var delegateEventType = function delegateEventType(type) {
            var typeMap = {
                focus: 'focusin',
                blur: 'focusout'
            };
            return typeMap[type] || type;
        };
        domEvents.addDelegateListener = function (type, selector, callback) {
            $(this).on(delegateEventType(type), selector, callback);
        };
        domEvents.removeDelegateListener = function (type, selector, callback) {
            $(this).off(delegateEventType(type), selector, callback);
        };
        var withSpecial = function withSpecial(callback) {
            return function () {
                inSpecial = true;
                callback.apply(this, arguments);
                inSpecial = false;
            };
        };
        var setupSpecialEvent = function setupSpecialEvent(eventName) {
            specialEvents[eventName] = true;
            var handler = function () {
                $(this).trigger(eventName);
            };
            $.event.special[eventName] = {
                noBubble: true,
                setup: withSpecial(function () {
                    domEvents.addEventListener.call(this, eventName, handler);
                }),
                teardown: withSpecial(function () {
                    domEvents.removeEventListener.call(this, eventName, handler);
                })
            };
        };
        [
            'inserted',
            'removed',
            'attributes'
        ].forEach(setupSpecialEvent);
        var oldDomManip = $.fn.domManip, cbIndex;
        $.fn.domManip = function () {
            for (var i = 1; i < arguments.length; i++) {
                if (typeof arguments[i] === 'function') {
                    cbIndex = i;
                    break;
                }
            }
            return oldDomManip.apply(this, arguments);
        };
        $(document.createElement('div')).append(document.createElement('div'));
        if (cbIndex === undefined) {
            $.fn.domManip = oldDomManip;
            each([
                'after',
                'prepend',
                'before',
                'append',
                'replaceWith'
            ], function (name) {
                var original = $.fn[name];
                $.fn[name] = function () {
                    var elems = [], args = makeArray(arguments);
                    if (args[0] != null) {
                        if (typeof args[0] === 'string') {
                            args[0] = buildFragment(args[0]);
                        }
                        if (args[0].nodeType === 11) {
                            elems = getChildNodes(args[0]);
                        } else if (isArrayLike(args[0])) {
                            elems = makeArray(args[0]);
                        } else {
                            elems = [args[0]];
                        }
                    }
                    var ret = original.apply(this, args);
                    mutate.inserted(elems);
                    return ret;
                };
            });
        } else {
            $.fn.domManip = cbIndex === 2 ? function (args, table, callback) {
                return oldDomManip.call(this, args, table, function (elem) {
                    var elems;
                    if (elem.nodeType === 11) {
                        elems = makeArray(getChildNodes(elem));
                    }
                    var ret = callback.apply(this, arguments);
                    mutate.inserted(elems ? elems : [elem]);
                    return ret;
                });
            } : function (args, callback) {
                return oldDomManip.call(this, args, function (elem) {
                    var elems;
                    if (elem.nodeType === 11) {
                        elems = makeArray(getChildNodes(elem));
                    }
                    var ret = callback.apply(this, arguments);
                    mutate.inserted(elems ? elems : [elem]);
                    return ret;
                });
            };
        }
        var oldClean = $.cleanData;
        $.cleanData = function (elems) {
            $.each(elems, function (i, elem) {
                if (elem) {
                    domDispatch.call(elem, 'removed', [], false);
                }
            });
            oldClean(elems);
        };
        $.fn.viewModel = function () {
            return canViewModel(this[0]);
        };
    }
});
/*can-fixture-socket@0.5.11#src/store*/
define('can-fixture-socket/src/store', function (require, exports, module) {
    var extractResponse = require('can-fixture/core').extractResponse;
    function requestHandlerToListener(method) {
        return function (query, fn) {
            var req = { data: query };
            var res = function () {
                var response = extractResponse.apply(null, arguments);
                if (response[0] === 200) {
                    fn(null, response[1]);
                } else {
                    fn(response[1]);
                }
            };
            method(req, res);
        };
    }
    function storeToListeners(fixtureStore) {
        var methods = [
            'getListData',
            'getData',
            'updateData',
            'createData',
            'destroyData'
        ];
        return methods.reduce(function (listeners, method) {
            listeners[method] = requestHandlerToListener(fixtureStore[method]);
            return listeners;
        }, {});
    }
    module.exports = {
        requestHandlerToListener: requestHandlerToListener,
        storeToListeners: storeToListeners
    };
});
/*can-fixture-socket@0.5.11#src/feathers-client*/
define('can-fixture-socket/src/feathers-client', function (require, exports, module) {
    var storeToListeners = require('can-fixture-socket/src/store').storeToListeners;
    var assign = require('can-util/js/assign/assign');
    function subscribeFeathersStoreToServer(serviceName, fixtureStore, mockServer, options) {
        var listeners = storeToListeners(fixtureStore);
        mockServer.on(serviceName + '::find', toFeathersDataHandler(listeners.getListData, null, toFeathersFind));
        mockServer.on(serviceName + '::get', toFeathersDataHandler(listeners.getData, wrapToId(options), null));
        mockServer.on(serviceName + '::remove', toFeathersRemoveHandler(listeners.getData, listeners.destroyData, options));
        mockServer.on(serviceName + '::create', toFeathersCreateHandler(listeners.createData));
        mockServer.on(serviceName + '::update', toFeathersUpdateHandler(listeners.updateData, options));
    }
    function toFeathersDataHandler(method, queryTransformer, dataTransformer) {
        return function (query) {
            var args = Array.prototype.slice.call(arguments), fn;
            if (typeof args[args.length - 1] === 'function') {
                fn = args[args.length - 1];
            }
            query = queryTransformer ? queryTransformer(query) : query;
            method(query, function (err, data) {
                if (err) {
                    fn && fn(err);
                } else {
                    data = dataTransformer ? dataTransformer(data) : data;
                    fn && fn(null, data);
                }
            });
        };
    }
    function wrapToId(options) {
        return function (id) {
            var o = {}, idProp = options && options.id || 'id';
            o[idProp] = id;
            return o;
        };
    }
    function toFeathersFind(data) {
        return {
            total: data.count,
            limit: data.limit,
            skip: data.offset,
            data: data.data
        };
    }
    function toFeathersRemoveHandler(getData, destroyData, options) {
        return function (id, query, fn) {
            var setQuery = wrapToId(options)(id);
            getData(setQuery, function (err, item) {
                if (err) {
                    fn(err);
                } else {
                    destroyData(setQuery, function (err, data) {
                        if (err) {
                            fn(err);
                        } else {
                            fn(null, item);
                        }
                    });
                }
            });
        };
    }
    function toFeathersUpdateHandler(updateData, options) {
        return function (id, data, query, fn) {
            var setQuery = wrapToId(options)(id);
            updateData(assign(setQuery, data), function (err, data2) {
                if (err) {
                    fn(err);
                } else {
                    fn(null, assign(setQuery, assign(data, data2)));
                }
            });
        };
    }
    function toFeathersCreateHandler(createData) {
        return function (data, query, fn) {
            createData(data, function (err, data2) {
                if (err) {
                    fn(err);
                } else {
                    fn(null, assign(data, data2));
                }
            });
        };
    }
    module.exports = { subscribeFeathersStoreToServer: subscribeFeathersStoreToServer };
});
/*can-fixture-socket@0.5.11#src/index*/
define('can-fixture-socket/src/index', function (require, exports, module) {
    var subscribeFeathersStoreToServer = require('can-fixture-socket/src/feathers-client').subscribeFeathersStoreToServer;
    var MockedServer = function (io) {
        this.io = io;
        this.events = {};
        this.subscribers = {};
        resetManagerCache(io.managers);
        this.origs = mockManager(io.Manager.prototype, this);
    };
    MockedServer.prototype.on = function (event, cb) {
        var self = this;
        var events = {};
        if (typeof event === 'string') {
            events[event] = cb;
        }
        if (typeof event === 'object') {
            events = event;
        }
        Object.keys(events).forEach(function (name) {
            sub(self.events, name, events[name]);
        });
    };
    MockedServer.prototype.emit = function (event) {
        var dataArgs = Array.prototype.slice.call(arguments, 1);
        pub(this.subscribers, event, dataArgs);
    };
    MockedServer.prototype.onFeathersService = function (serviceName, fixtureStore, options) {
        subscribeFeathersStoreToServer(serviceName, fixtureStore, this, options);
    };
    MockedServer.prototype.restore = function () {
        restoreManager(this.io.Manager.prototype, this.origs);
        resetManagerCache(this.io.managers);
    };
    var MockedSocket = function (server) {
        this._server = server;
    };
    MockedSocket.prototype = {
        on: function (event, cb) {
            debug('MockedSocket.on ... ' + event);
            sub(this._server.subscribers, event, cb);
        },
        emit: function (event) {
            var dataArgs = Array.prototype.slice.call(arguments, 1);
            debug('MockedSocket.emit ...' + event);
            pub(this._server.events, event, dataArgs);
        },
        once: function () {
            debug('MockedSocket.once ...');
        },
        off: function (event, cb) {
            debug('MockedSocket.off ... ' + event);
            unsub(this._server.subscribers, event, cb);
        },
        open: function () {
            return this.connect();
        },
        connect: function () {
            this.connected = true;
            this.disconnected = false;
        },
        close: function () {
            return this.disconnect();
        },
        disconnect: function () {
            this.connected = false;
            this.disconnected = true;
        }
    };
    function pub(pubsub, event, dataArgs) {
        debug(' >>> pub ' + event);
        var subscribers = pubsub[event] || [];
        subscribers.forEach(function (subscriber) {
            subscriber.apply(null, dataArgs);
        });
    }
    function sub(pubsub, event, cb) {
        debug(' <<< sub ' + event);
        if (!pubsub[event]) {
            pubsub[event] = [];
        }
        pubsub[event].push(cb);
    }
    function unsub(pubsub, event, cb) {
        debug(' <<< unsub ' + event);
        pubsub[event].forEach(function (registeredCb, index) {
            if (registeredCb === cb) {
                pubsub[event].splice(index, 1);
            }
        });
    }
    function mockManager(managerProto, server) {
        var methods = [
            'open',
            'socket'
        ];
        var origs = methods.map(function (name) {
            return {
                name: name,
                method: managerProto[name]
            };
        });
        managerProto.open = managerProto.connect = function () {
            debug('MockedManager.prototype.open or connect ... arguments:', arguments);
            setTimeout(function () {
                pub(server.subscribers, 'connect');
                pub(server.events, 'connection');
            }, 0);
        };
        managerProto.socket = function () {
            debug('MockedManager.prototype.socket ...');
            var socket = new MockedSocket(server);
            socket.connected = true;
            socket.disconnected = false;
            return socket;
        };
        return origs;
    }
    function restoreManager(managerProto, origs) {
        debug('Restore.');
        origs.forEach(function (orig) {
            managerProto[orig.name] = orig.method;
        });
    }
    function resetManagerCache(cache) {
        for (var i in cache) {
            if (cache.hasOwnProperty(i)) {
                delete cache[i];
            }
        }
    }
    var _DEBUG = false;
    function debug(msg, obj) {
        if (_DEBUG) {
            console.log.apply(console, arguments);
        }
    }
    module.exports = {
        Server: MockedServer,
        mockSocketManager: mockManager,
        restoreManager: restoreManager
    };
});
/*can-fixture-socket@0.5.11#can-fixture-socket*/
define('can-fixture-socket', function (require, exports, module) {
    var fixtureSocket = require('can-fixture-socket/src/index');
    var fixtureStore = require('can-fixture-socket/src/store');
    module.exports = {
        Server: fixtureSocket.Server,
        requestHandlerToListener: fixtureStore.requestHandlerToListener,
        storeToListeners: fixtureStore.storeToListeners
    };
});
/*can-connect-feathers@3.1.0#service/service*/
define('can-connect-feathers/service/service', function (require, exports, module) {
    var connect = require('can-connect');
    module.exports = connect.behavior('data/feathers-service', function () {
        var helpURL = 'https://canjs.com/doc/can-connect-feathers.html';
        if (!this.feathersService) {
            throw new Error('You must provide a feathersService to the feathers-service behavior: ' + helpURL);
        }
        var service = this.feathersService;
        return {
            init: function () {
                var self = this;
                service.on('created', function (message) {
                    self.createInstance(message);
                });
                service.on('updated', function (message) {
                    self.updateInstance(message);
                });
                service.on('patched', function (message) {
                    self.updateInstance(message);
                });
                service.on('removed', function (message) {
                    self.destroyInstance(message);
                });
            },
            getListData: function (params) {
                return service.find({ query: params });
            },
            getData: function (params) {
                var id = null;
                if (typeof params === 'string' || typeof params === 'number') {
                    id = params;
                    params = {};
                } else if (params && typeof params[this.idProp] !== 'undefined') {
                    id = params[this.idProp];
                    delete params[this.idProp];
                }
                return service.get(id, params);
            },
            createData: function (data) {
                return service.create(data);
            },
            updateData: function (instance) {
                return service.update(instance[this.idProp], instance);
            },
            destroyData: function (instance) {
                return service.remove(instance[this.idProp]);
            }
        };
    });
});
/*ms@0.7.2#index*/
define('ms', function (require, exports, module) {
    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module.exports = function (val, options) {
        options = options || {};
        var type = typeof val;
        if (type === 'string' && val.length > 0) {
            return parse(val);
        } else if (type === 'number' && isNaN(val) === false) {
            return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
    };
    function parse(str) {
        str = String(str);
        if (str.length > 10000) {
            return;
        }
        var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
        if (!match) {
            return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || 'ms').toLowerCase();
        switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
        }
    }
    function fmtShort(ms) {
        if (ms >= d) {
            return Math.round(ms / d) + 'd';
        }
        if (ms >= h) {
            return Math.round(ms / h) + 'h';
        }
        if (ms >= m) {
            return Math.round(ms / m) + 'm';
        }
        if (ms >= s) {
            return Math.round(ms / s) + 's';
        }
        return ms + 'ms';
    }
    function fmtLong(ms) {
        return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
    }
    function plural(ms, n, name) {
        if (ms < n) {
            return;
        }
        if (ms < n * 1.5) {
            return Math.floor(ms / n) + ' ' + name;
        }
        return Math.ceil(ms / n) + ' ' + name + 's';
    }
});
/*debug@2.6.0#src/debug*/
define('debug/src/debug', function (require, exports, module) {
    exports = module.exports = createDebug.debug = createDebug.default = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require('ms');
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
        var hash = 0, i;
        for (i in namespace) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
        }
        return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
        function debug() {
            if (!debug.enabled)
                return;
            var self = debug;
            var curr = +new Date();
            var ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; i++) {
                args[i] = arguments[i];
            }
            args[0] = exports.coerce(args[0]);
            if ('string' !== typeof args[0]) {
                args.unshift('%O');
            }
            var index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
                if (match === '%%')
                    return match;
                index++;
                var formatter = exports.formatters[format];
                if ('function' === typeof formatter) {
                    var val = args[index];
                    match = formatter.call(self, val);
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            exports.formatArgs.call(self, args);
            var logFn = debug.log || exports.log || console.log.bind(console);
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.enabled = exports.enabled(namespace);
        debug.useColors = exports.useColors();
        debug.color = selectColor(namespace);
        if ('function' === typeof exports.init) {
            exports.init(debug);
        }
        return debug;
    }
    function enable(namespaces) {
        exports.save(namespaces);
        var split = (namespaces || '').split(/[\s,]+/);
        var len = split.length;
        for (var i = 0; i < len; i++) {
            if (!split[i])
                continue;
            namespaces = split[i].replace(/\*/g, '.*?');
            if (namespaces[0] === '-') {
                exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
            } else {
                exports.names.push(new RegExp('^' + namespaces + '$'));
            }
        }
    }
    function disable() {
        exports.enable('');
    }
    function enabled(name) {
        var i, len;
        for (i = 0, len = exports.skips.length; i < len; i++) {
            if (exports.skips[i].test(name)) {
                return false;
            }
        }
        for (i = 0, len = exports.names.length; i < len; i++) {
            if (exports.names[i].test(name)) {
                return true;
            }
        }
        return false;
    }
    function coerce(val) {
        if (val instanceof Error)
            return val.stack || val.message;
        return val;
    }
});
/*debug@2.6.0#src/browser*/
define('debug', function (require, exports, module) {
    exports = module.exports = require('debug/src/debug');
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
        'lightseagreen',
        'forestgreen',
        'goldenrod',
        'dodgerblue',
        'darkorchid',
        'crimson'
    ];
    function useColors() {
        if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
            return true;
        }
        return typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style || typeof window !== 'undefined' && window && window.console && (console.firebug || console.exception && console.table) || typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function (v) {
        try {
            return JSON.stringify(v);
        } catch (err) {
            return '[UnexpectedJSONParseError]: ' + err.message;
        }
    };
    function formatArgs(args) {
        var useColors = this.useColors;
        args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
        if (!useColors)
            return;
        var c = 'color: ' + this.color;
        args.splice(1, 0, c, 'color: inherit');
        var index = 0;
        var lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, function (match) {
            if ('%%' === match)
                return;
            index++;
            if ('%c' === match) {
                lastC = index;
            }
        });
        args.splice(lastC, 0, c);
    }
    function log() {
        return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
        try {
            if (null == namespaces) {
                exports.storage.removeItem('debug');
            } else {
                exports.storage.debug = namespaces;
            }
        } catch (e) {
        }
    }
    function load() {
        try {
            return exports.storage.debug;
        } catch (e) {
        }
        if (typeof process !== 'undefined' && 'env' in process) {
            return process.env.DEBUG;
        }
    }
    exports.enable(load());
    function localstorage() {
        try {
            return window.localStorage;
        } catch (e) {
        }
    }
});
/*feathers-errors@2.5.0#lib/index*/
define('feathers-errors', function (require, exports, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _extendableBuiltin(cls) {
        function ExtendableBuiltin() {
            var instance = Reflect.construct(cls, Array.from(arguments));
            Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
            return instance;
        }
        ExtendableBuiltin.prototype = Object.create(cls.prototype, {
            constructor: {
                value: cls,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(ExtendableBuiltin, cls);
        } else {
            ExtendableBuiltin.__proto__ = cls;
        }
        return ExtendableBuiltin;
    }
    var debug = require('debug')('feathers-errors');
    var FeathersError = function (_extendableBuiltin2) {
        _inherits(FeathersError, _extendableBuiltin2);
        function FeathersError(msg, name, code, className, data) {
            _classCallCheck(this, FeathersError);
            msg = msg || 'Error';
            var errors = void 0;
            var message = void 0;
            var newData = void 0;
            if (msg instanceof Error) {
                message = msg.message || 'Error';
                if (msg.errors) {
                    errors = msg.errors;
                }
            } else if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
                message = msg.message || 'Error';
                data = msg;
            } else {
                message = msg;
            }
            if (data) {
                newData = _extends({}, data);
                if (newData.errors) {
                    errors = newData.errors;
                    delete newData.errors;
                }
            }
            var _this = _possibleConstructorReturn(this, (FeathersError.__proto__ || Object.getPrototypeOf(FeathersError)).call(this, message));
            _this.type = 'FeathersError';
            _this.name = name;
            _this.message = message;
            _this.code = code;
            _this.className = className;
            _this.data = newData;
            _this.errors = errors || {};
            debug(_this.name + '(' + _this.code + '): ' + _this.message);
            return _this;
        }
        _createClass(FeathersError, [{
                key: 'toJSON',
                value: function toJSON() {
                    return {
                        name: this.name,
                        message: this.message,
                        code: this.code,
                        className: this.className,
                        data: this.data,
                        errors: this.errors
                    };
                }
            }]);
        return FeathersError;
    }(_extendableBuiltin(Error));
    var BadRequest = function (_FeathersError) {
        _inherits(BadRequest, _FeathersError);
        function BadRequest(message, data) {
            _classCallCheck(this, BadRequest);
            return _possibleConstructorReturn(this, (BadRequest.__proto__ || Object.getPrototypeOf(BadRequest)).call(this, message, 'BadRequest', 400, 'bad-request', data));
        }
        return BadRequest;
    }(FeathersError);
    var NotAuthenticated = function (_FeathersError2) {
        _inherits(NotAuthenticated, _FeathersError2);
        function NotAuthenticated(message, data) {
            _classCallCheck(this, NotAuthenticated);
            return _possibleConstructorReturn(this, (NotAuthenticated.__proto__ || Object.getPrototypeOf(NotAuthenticated)).call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data));
        }
        return NotAuthenticated;
    }(FeathersError);
    var PaymentError = function (_FeathersError3) {
        _inherits(PaymentError, _FeathersError3);
        function PaymentError(message, data) {
            _classCallCheck(this, PaymentError);
            return _possibleConstructorReturn(this, (PaymentError.__proto__ || Object.getPrototypeOf(PaymentError)).call(this, message, 'PaymentError', 402, 'payment-error', data));
        }
        return PaymentError;
    }(FeathersError);
    var Forbidden = function (_FeathersError4) {
        _inherits(Forbidden, _FeathersError4);
        function Forbidden(message, data) {
            _classCallCheck(this, Forbidden);
            return _possibleConstructorReturn(this, (Forbidden.__proto__ || Object.getPrototypeOf(Forbidden)).call(this, message, 'Forbidden', 403, 'forbidden', data));
        }
        return Forbidden;
    }(FeathersError);
    var NotFound = function (_FeathersError5) {
        _inherits(NotFound, _FeathersError5);
        function NotFound(message, data) {
            _classCallCheck(this, NotFound);
            return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).call(this, message, 'NotFound', 404, 'not-found', data));
        }
        return NotFound;
    }(FeathersError);
    var MethodNotAllowed = function (_FeathersError6) {
        _inherits(MethodNotAllowed, _FeathersError6);
        function MethodNotAllowed(message, data) {
            _classCallCheck(this, MethodNotAllowed);
            return _possibleConstructorReturn(this, (MethodNotAllowed.__proto__ || Object.getPrototypeOf(MethodNotAllowed)).call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data));
        }
        return MethodNotAllowed;
    }(FeathersError);
    var NotAcceptable = function (_FeathersError7) {
        _inherits(NotAcceptable, _FeathersError7);
        function NotAcceptable(message, data) {
            _classCallCheck(this, NotAcceptable);
            return _possibleConstructorReturn(this, (NotAcceptable.__proto__ || Object.getPrototypeOf(NotAcceptable)).call(this, message, 'NotAcceptable', 406, 'not-acceptable', data));
        }
        return NotAcceptable;
    }(FeathersError);
    var Timeout = function (_FeathersError8) {
        _inherits(Timeout, _FeathersError8);
        function Timeout(message, data) {
            _classCallCheck(this, Timeout);
            return _possibleConstructorReturn(this, (Timeout.__proto__ || Object.getPrototypeOf(Timeout)).call(this, message, 'Timeout', 408, 'timeout', data));
        }
        return Timeout;
    }(FeathersError);
    var Conflict = function (_FeathersError9) {
        _inherits(Conflict, _FeathersError9);
        function Conflict(message, data) {
            _classCallCheck(this, Conflict);
            return _possibleConstructorReturn(this, (Conflict.__proto__ || Object.getPrototypeOf(Conflict)).call(this, message, 'Conflict', 409, 'conflict', data));
        }
        return Conflict;
    }(FeathersError);
    var LengthRequired = function (_FeathersError10) {
        _inherits(LengthRequired, _FeathersError10);
        function LengthRequired(message, data) {
            _classCallCheck(this, LengthRequired);
            return _possibleConstructorReturn(this, (LengthRequired.__proto__ || Object.getPrototypeOf(LengthRequired)).call(this, message, 'LengthRequired', 411, 'length-required', data));
        }
        return LengthRequired;
    }(FeathersError);
    var Unprocessable = function (_FeathersError11) {
        _inherits(Unprocessable, _FeathersError11);
        function Unprocessable(message, data) {
            _classCallCheck(this, Unprocessable);
            return _possibleConstructorReturn(this, (Unprocessable.__proto__ || Object.getPrototypeOf(Unprocessable)).call(this, message, 'Unprocessable', 422, 'unprocessable', data));
        }
        return Unprocessable;
    }(FeathersError);
    var TooManyRequests = function (_FeathersError12) {
        _inherits(TooManyRequests, _FeathersError12);
        function TooManyRequests(message, data) {
            _classCallCheck(this, TooManyRequests);
            return _possibleConstructorReturn(this, (TooManyRequests.__proto__ || Object.getPrototypeOf(TooManyRequests)).call(this, message, 'TooManyRequests', 429, 'too-many-requests', data));
        }
        return TooManyRequests;
    }(FeathersError);
    var GeneralError = function (_FeathersError13) {
        _inherits(GeneralError, _FeathersError13);
        function GeneralError(message, data) {
            _classCallCheck(this, GeneralError);
            return _possibleConstructorReturn(this, (GeneralError.__proto__ || Object.getPrototypeOf(GeneralError)).call(this, message, 'GeneralError', 500, 'general-error', data));
        }
        return GeneralError;
    }(FeathersError);
    var NotImplemented = function (_FeathersError14) {
        _inherits(NotImplemented, _FeathersError14);
        function NotImplemented(message, data) {
            _classCallCheck(this, NotImplemented);
            return _possibleConstructorReturn(this, (NotImplemented.__proto__ || Object.getPrototypeOf(NotImplemented)).call(this, message, 'NotImplemented', 501, 'not-implemented', data));
        }
        return NotImplemented;
    }(FeathersError);
    var BadGateway = function (_FeathersError15) {
        _inherits(BadGateway, _FeathersError15);
        function BadGateway(message, data) {
            _classCallCheck(this, BadGateway);
            return _possibleConstructorReturn(this, (BadGateway.__proto__ || Object.getPrototypeOf(BadGateway)).call(this, message, 'BadGateway', 502, 'bad-gateway', data));
        }
        return BadGateway;
    }(FeathersError);
    var Unavailable = function (_FeathersError16) {
        _inherits(Unavailable, _FeathersError16);
        function Unavailable(message, data) {
            _classCallCheck(this, Unavailable);
            return _possibleConstructorReturn(this, (Unavailable.__proto__ || Object.getPrototypeOf(Unavailable)).call(this, message, 'Unavailable', 503, 'unavailable', data));
        }
        return Unavailable;
    }(FeathersError);
    var errors = {
        FeathersError: FeathersError,
        BadRequest: BadRequest,
        NotAuthenticated: NotAuthenticated,
        PaymentError: PaymentError,
        Forbidden: Forbidden,
        NotFound: NotFound,
        MethodNotAllowed: MethodNotAllowed,
        NotAcceptable: NotAcceptable,
        Timeout: Timeout,
        Conflict: Conflict,
        LengthRequired: LengthRequired,
        Unprocessable: Unprocessable,
        TooManyRequests: TooManyRequests,
        GeneralError: GeneralError,
        NotImplemented: NotImplemented,
        BadGateway: BadGateway,
        Unavailable: Unavailable,
        400: BadRequest,
        401: NotAuthenticated,
        402: PaymentError,
        403: Forbidden,
        404: NotFound,
        405: MethodNotAllowed,
        406: NotAcceptable,
        408: Timeout,
        409: Conflict,
        411: LengthRequired,
        422: Unprocessable,
        429: TooManyRequests,
        500: GeneralError,
        501: NotImplemented,
        502: BadGateway,
        503: Unavailable
    };
    function convert(error) {
        if (!error) {
            return error;
        }
        var FeathersError = errors[error.name];
        var result = FeathersError ? new FeathersError(error.message, error.data) : new Error(error.message || error);
        if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
            _extends(result, error);
        }
        return result;
    }
    exports.default = _extends({
        convert: convert,
        types: errors,
        errors: errors
    }, errors);
    module.exports = exports['default'];
});
/*events@1.1.1#events*/
define('events', function (require, exports, module) {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function (n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
            throw TypeError('n must be a positive number');
        this._maxListeners = n;
        return this;
    };
    EventEmitter.prototype.emit = function (type) {
        var er, handler, len, args, i, listeners;
        if (!this._events)
            this._events = {};
        if (type === 'error') {
            if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
                er = arguments[1];
                if (er instanceof Error) {
                    throw er;
                } else {
                    var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
                    err.context = er;
                    throw err;
                }
            }
        }
        handler = this._events[type];
        if (isUndefined(handler))
            return false;
        if (isFunction(handler)) {
            switch (arguments.length) {
            case 1:
                handler.call(this);
                break;
            case 2:
                handler.call(this, arguments[1]);
                break;
            case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;
            default:
                args = Array.prototype.slice.call(arguments, 1);
                handler.apply(this, args);
            }
        } else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);
        }
        return true;
    };
    EventEmitter.prototype.addListener = function (type, listener) {
        var m;
        if (!isFunction(listener))
            throw TypeError('listener must be a function');
        if (!this._events)
            this._events = {};
        if (this._events.newListener)
            this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
        if (!this._events[type])
            this._events[type] = listener;
        else if (isObject(this._events[type]))
            this._events[type].push(listener);
        else
            this._events[type] = [
                this._events[type],
                listener
            ];
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
            } else {
                m = EventEmitter.defaultMaxListeners;
            }
            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
                if (typeof console.trace === 'function') {
                    console.trace();
                }
            }
        }
        return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function (type, listener) {
        if (!isFunction(listener))
            throw TypeError('listener must be a function');
        var fired = false;
        function g() {
            this.removeListener(type, g);
            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }
        g.listener = listener;
        this.on(type, g);
        return this;
    };
    EventEmitter.prototype.removeListener = function (type, listener) {
        var list, position, length, i;
        if (!isFunction(listener))
            throw TypeError('listener must be a function');
        if (!this._events || !this._events[type])
            return this;
        list = this._events[type];
        length = list.length;
        position = -1;
        if (list === listener || isFunction(list.listener) && list.listener === listener) {
            delete this._events[type];
            if (this._events.removeListener)
                this.emit('removeListener', type, listener);
        } else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                    position = i;
                    break;
                }
            }
            if (position < 0)
                return this;
            if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
            } else {
                list.splice(position, 1);
            }
            if (this._events.removeListener)
                this.emit('removeListener', type, listener);
        }
        return this;
    };
    EventEmitter.prototype.removeAllListeners = function (type) {
        var key, listeners;
        if (!this._events)
            return this;
        if (!this._events.removeListener) {
            if (arguments.length === 0)
                this._events = {};
            else if (this._events[type])
                delete this._events[type];
            return this;
        }
        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === 'removeListener')
                    continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = {};
            return this;
        }
        listeners = this._events[type];
        if (isFunction(listeners)) {
            this.removeListener(type, listeners);
        } else if (listeners) {
            while (listeners.length)
                this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];
        return this;
    };
    EventEmitter.prototype.listeners = function (type) {
        var ret;
        if (!this._events || !this._events[type])
            ret = [];
        else if (isFunction(this._events[type]))
            ret = [this._events[type]];
        else
            ret = this._events[type].slice();
        return ret;
    };
    EventEmitter.prototype.listenerCount = function (type) {
        if (this._events) {
            var evlistener = this._events[type];
            if (isFunction(evlistener))
                return 1;
            else if (evlistener)
                return evlistener.length;
        }
        return 0;
    };
    EventEmitter.listenerCount = function (emitter, type) {
        return emitter.listenerCount(type);
    };
    function isFunction(arg) {
        return typeof arg === 'function';
    }
    function isNumber(arg) {
        return typeof arg === 'number';
    }
    function isObject(arg) {
        return typeof arg === 'object' && arg !== null;
    }
    function isUndefined(arg) {
        return arg === void 0;
    }
});
/*feathers-authentication-popups@0.1.2#lib/feathers-authentication-popups*/
define('feathers-authentication-popups', function (require, exports, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.authAgent = undefined;
    exports.default = openLoginPopup;
    exports.getCenterCoordinates = getCenterCoordinates;
    var _events = require('events');
    var _events2 = _interopRequireDefault(_events);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    window.authAgent = new _events2.default();
    var authAgent = exports.authAgent = window.authAgent;
    function openLoginPopup(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var width = options.width || 1024;
        var height = options.height || 640;
        var _getCenterCoordinates = getCenterCoordinates(window, width, height), top = _getCenterCoordinates.top, left = _getCenterCoordinates.left;
        var params = 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left;
        return window.open(url, 'authWindow', params);
    }
    function getCenterCoordinates(window, width, height) {
        return {
            left: window.screenX + (window.outerWidth - width) / 2,
            top: window.screenY + (window.outerHeight - height) / 2
        };
    }
});
/*jwt-decode@2.1.0#lib/atob*/
define('jwt-decode/lib/atob', function (require, exports, module) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    function InvalidCharacterError(message) {
        this.message = message;
    }
    InvalidCharacterError.prototype = new Error();
    InvalidCharacterError.prototype.name = 'InvalidCharacterError';
    function polyfill(input) {
        var str = String(input).replace(/=+$/, '');
        if (str.length % 4 == 1) {
            throw new InvalidCharacterError('\'atob\' failed: The string to be decoded is not correctly encoded.');
        }
        for (var bc = 0, bs, buffer, idx = 0, output = ''; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
            buffer = chars.indexOf(buffer);
        }
        return output;
    }
    module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;
});
/*jwt-decode@2.1.0#lib/base64_url_decode*/
define('jwt-decode/lib/base64_url_decode', function (require, exports, module) {
    var atob = require('jwt-decode/lib/atob');
    function b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
            var code = p.charCodeAt(0).toString(16).toUpperCase();
            if (code.length < 2) {
                code = '0' + code;
            }
            return '%' + code;
        }));
    }
    module.exports = function (str) {
        var output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
        }
        try {
            return b64DecodeUnicode(output);
        } catch (err) {
            return atob(output);
        }
    };
});
/*jwt-decode@2.1.0#lib/index*/
define('jwt-decode', function (require, exports, module) {
    'use strict';
    var base64_url_decode = require('jwt-decode/lib/base64_url_decode');
    module.exports = function (token, options) {
        if (typeof token !== 'string') {
            throw new Error('Invalid token specified');
        }
        options = options || {};
        var pos = options.header === true ? 0 : 1;
        return JSON.parse(base64_url_decode(token.split('.')[pos]));
    };
});
/*can-connect-feathers@3.1.0#utils/utils*/
define('can-connect-feathers/utils/utils', function (require, exports, module) {
    var decode = require('jwt-decode');
    var assign = require('can-util/js/assign/assign');
    function readCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
    function getStoredToken(storageLocation) {
        var token = readCookie(storageLocation);
        if (!token && (window && window.localStorage || window.sessionStorage)) {
            token = window.sessionStorage.getItem(storageLocation) || window.localStorage.getItem(storageLocation);
        }
        return token;
    }
    function payloadIsValid(payload) {
        return payload && payload.exp * 1000 > new Date().getTime();
    }
    function hasValidToken(storageLocation) {
        var token = getStoredToken(storageLocation);
        if (token) {
            try {
                var payload = decode(token);
                return payloadIsValid(payload);
            } catch (error) {
                return false;
            }
        }
        return false;
    }
    function convertLocalAuthData(originalData) {
        var data = assign({}, originalData);
        if (data && data.strategy === 'local' && data.user) {
            Object.keys(data.user).forEach(function (key) {
                data[key] = data.user[key];
            });
            delete data.user;
        }
        return data;
    }
    module.exports = {
        readCookie: readCookie,
        getStoredToken: getStoredToken,
        hasValidToken: hasValidToken,
        payloadIsValid: payloadIsValid,
        convertLocalAuthData: convertLocalAuthData
    };
});
/*can-connect-feathers@3.1.0#session/storage*/
define('can-connect-feathers/session/storage', function (require, exports, module) {
    module.exports = {
        data: {},
        getStore: function () {
            if (window.doneSsr) {
                var CanZone = window.CanZone || undefined;
                return typeof CanZone === 'undefined' ? this.data : CanZone.current.data;
            }
            return this.data;
        },
        setItem: function (prop, value) {
            var store = this.getStore();
            store[prop] = value;
        },
        getItem: function (prop) {
            var store = this.getStore();
            return store[prop];
        },
        removeItem: function (prop) {
            var store = this.getStore();
            delete store[prop];
        }
    };
});
/*can-connect-feathers@3.1.0#session/session*/
define('can-connect-feathers/session/session', function (require, exports, module) {
    var connect = require('can-connect');
    var errors = require('feathers-errors');
    var authAgent = require('feathers-authentication-popups').authAgent;
    var decode = require('jwt-decode');
    var payloadIsValid = require('can-connect-feathers/utils/utils').payloadIsValid;
    var hasValidToken = require('can-connect-feathers/utils/utils').hasValidToken;
    var convertLocalAuthData = require('can-connect-feathers/utils/utils').convertLocalAuthData;
    var Observation = require('can-observation');
    var zoneStorage = require('can-connect-feathers/session/storage');
    module.exports = connect.behavior('data/feathers-session', function () {
        var helpURL = 'https://canjs.com/doc/can-connect-feathers.html';
        var feathersClient = this.feathersClient;
        if (!feathersClient) {
            throw new Error('You must provide a feathersClient instance to the feathers-session behavior. See ' + helpURL);
        }
        if (!this.Map) {
            throw new Error('You must provide a Map instance to the feathers-session behavior. See ' + helpURL);
        }
        if (!feathersClient.passport) {
            throw new Error('You must register the feathers-authentication-client plugin before using the feathers-session behavior. See ' + helpURL);
        }
        var options = feathersClient.passport.options;
        var Session = this.Map;
        Object.defineProperty(Session, 'current', {
            get: function () {
                Observation.add(Session, 'current');
                if (!zoneStorage.getItem('can-connect-feathers-session')) {
                    Session.get().then(function (session) {
                        zoneStorage.setItem('can-connect-feathers-session', session);
                        Session.dispatch('current', [session]);
                    }).catch(function (error) {
                        if (!error.className || error.className.indexOf('not-authenticated') < 0) {
                            return Promise.reject(error);
                        }
                    });
                }
                return zoneStorage.getItem('can-connect-feathers-session');
            }
        });
        Session.on('created', function (ev, session) {
            zoneStorage.setItem('can-connect-feathers-session', session);
            Session.dispatch('current', [session]);
        });
        Session.on('destroyed', function () {
            zoneStorage.removeItem('can-connect-feathers-session');
            Session.dispatch('current', [
                undefined,
                zoneStorage.getItem('can-connect-feathers-session')
            ]);
        });
        return {
            init: function () {
                var connection = this;
                authAgent.on('login', function (token) {
                    try {
                        var payload = decode(token);
                        if (!payloadIsValid(payload)) {
                            throw new Error('invalid token');
                        }
                    } catch (error) {
                        throw new Error('An invalid token was received through the feathers-authentication-popups authAgent');
                    }
                    feathersClient.authenticate({
                        strategy: 'jwt',
                        accessToken: token
                    }).then(function (data) {
                        var payload = decode(data.accessToken);
                        connection.createInstance(payload);
                    });
                });
            },
            createData: function (data) {
                var requestData = convertLocalAuthData(data);
                return feathersClient.authenticate(requestData).then(function (response) {
                    return decode(response.accessToken);
                });
            },
            getData: function () {
                return new Promise(function (resolve, reject) {
                    var tokenLocation = options.tokenKey || options.cookie;
                    if (hasValidToken(tokenLocation) && !window.doneSsr) {
                        feathersClient.authenticate().then(function (data) {
                            var payload = decode(data.accessToken);
                            return resolve(payload);
                        }).catch(reject);
                    } else {
                        reject(new errors.NotAuthenticated('Not Authenticated'));
                    }
                });
            },
            destroyData: function (session) {
                return feathersClient.logout().then(function () {
                    return session;
                });
            }
        };
    });
});
/*can-connect-feathers@3.1.0#can-connect-feathers*/
define('can-connect-feathers', function (require, exports, module) {
    module.exports = {
        service: require('can-connect-feathers/service/service'),
        session: require('can-connect-feathers/session/session')
    };
});
/*can-util@3.2.2#js/string-to-any/string-to-any*/
define('can-util/js/string-to-any/string-to-any', function (require, exports, module) {
    module.exports = function (str) {
        switch (str) {
        case 'NaN':
        case 'Infinity':
            return +str;
        case 'null':
            return null;
        case 'undefined':
            return undefined;
        case 'true':
        case 'false':
            return str === 'true';
        default:
            var val = +str;
            if (!isNaN(val)) {
                return val;
            } else {
                return str;
            }
        }
    };
});
/*can-stache-converters@3.0.6#can-stache-converters*/
define('can-stache-converters', function (require, exports, module) {
    var stache = require('can-stache');
    var stringToAny = require('can-util/js/string-to-any/string-to-any');
    require('can-stache-bindings');
    stache.registerConverter('boolean-to-inList', {
        get: function (item, list) {
            if (!list) {
                return false;
            } else {
                return list.indexOf(item) !== -1;
            }
        },
        set: function (newVal, item, list) {
            if (!list) {
                return;
            }
            if (!newVal) {
                var idx = list.indexOf(item);
                if (idx !== -1) {
                    list.splice(idx, 1);
                }
            } else {
                list.push(item);
            }
        }
    });
    stache.registerConverter('string-to-any', {
        get: function (compute) {
            return '' + compute();
        },
        set: function (newVal, compute) {
            var converted = stringToAny(newVal);
            compute(converted);
        }
    });
    stache.registerConverter('not', {
        get: function (compute) {
            return !compute();
        },
        set: function (newVal, compute) {
            compute(!newVal);
        }
    });
    stache.registerConverter('index-to-selected', {
        get: function (item, list) {
            var val = item.isComputed ? item() : item;
            var idx = list.indexOf(val);
            return idx;
        },
        set: function (idx, item, list) {
            var newVal = list[idx];
            if (newVal !== -1 && item.isComputed) {
                item(newVal);
            }
        }
    });
    stache.registerConverter('either-or', {
        get: function (chosen, a, b) {
            return b !== chosen();
        },
        set: function (newVal, chosen, a, b) {
            chosen(newVal ? a : b);
        }
    });
    stache.registerConverter('equal', {
        get: function (compute, comparer) {
            var val = compute && compute.isComputed ? compute() : compute;
            return val === comparer;
        },
        set: function (b, compute, comparer) {
            if (b) {
                compute(comparer);
            }
        }
    });
});
/*can-view-import@3.0.4#can-view-import*/
define('can-view-import', function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var canData = require('can-util/dom/data/data');
    var importer = require('can-util/js/import/import');
    var nodeLists = require('can-view-nodelist');
    var tag = require('can-view-callbacks').tag;
    var events = require('can-event');
    var canLog = require('can-util/js/log/log');
    tag('can-import', function (el, tagData) {
        var moduleName = el.getAttribute('from');
        var templateModule = tagData.options.get('helpers.module');
        var parentName = templateModule ? templateModule.id : undefined;
        if (!moduleName) {
            return Promise.reject('No module name provided');
        }
        var importPromise = importer(moduleName, parentName);
        importPromise.catch(function (err) {
            canLog.error(err);
        });
        canData.set.call(el, 'viewModel', importPromise);
        canData.set.call(el, 'scope', importPromise);
        var scope = tagData.scope.add(importPromise);
        var handOffTag = el.getAttribute('can-tag');
        if (handOffTag) {
            var callback = tag(handOffTag);
            canData.set.call(el, 'preventDataBindings', true);
            callback(el, assign(tagData, { scope: scope }));
            canData.set.call(el, 'preventDataBindings', false);
            canData.set.call(el, 'viewModel', importPromise);
            canData.set.call(el, 'scope', importPromise);
        } else {
            var frag = tagData.subtemplate ? tagData.subtemplate(scope, tagData.options) : document.createDocumentFragment();
            var nodeList = nodeLists.register([], undefined, true);
            events.one.call(el, 'removed', function () {
                nodeLists.unregister(nodeList);
            });
            el.appendChild(frag);
            nodeLists.update(nodeList, el.childNodes);
        }
    });
});
/*can-zone@0.6.2#lib/env*/
define('can-zone/lib/env', function (require, exports, module) {
    (function (global) {
        var isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
        var nodeRequire = typeof System !== 'undefined' && System._nodeRequire ? System._nodeRequire : typeof require === 'function' ? require : function () {
        };
        var isNW = isNode && function () {
            try {
                return nodeRequire('nw.gui') !== 'undefined';
            } catch (e) {
                return false;
            }
        }();
        var g = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : isNW ? window : isNode ? global : window;
        exports.isNode = isNode;
        exports.isNW = isNW;
        exports.global = g;
    }(function () {
        return this;
    }()));
});
/*can-zone@0.6.2#lib/util*/
define('can-zone/lib/util', function (require, exports, module) {
    exports.forEach = Array.prototype.forEach || function (fn) {
        for (var i = 0, len = this.length; i < len; i++) {
            fn.call(this, this[i], i);
        }
    };
    var supportsSymbol = typeof Symbol === 'function';
    exports.symbol = function (str) {
        return supportsSymbol ? Symbol(str) : str;
    };
    exports.defineProperty = function (obj, prop, defn) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop, defn);
        } else {
            obj[prop] = defn.value;
        }
    };
});
/*can-zone@0.6.2#lib/zones/globals*/
define('can-zone/lib/zones/globals', function (require, exports, module) {
    (function (global) {
        var util = require('can-zone/lib/util');
        var env = require('can-zone/lib/env');
        var g = env.global;
        var Zone = require('can-zone');
        if (env.isNode) {
            var globalTimeoutId = 1;
        }
        module.exports = function () {
            var globals, overrides = [];
            return {
                name: 'globals',
                plugins: [promiseZone],
                created: function () {
                    var zone = this;
                    globals = this.globals || {};
                    function findObj(name, obj) {
                        var parts = name.split('.');
                        var property = parts.pop();
                        util.forEach.call(parts, function (prop) {
                            var n = obj[prop];
                            if (!n) {
                                n = obj[prop] = {};
                            }
                            obj = n;
                        });
                        return {
                            obj: obj,
                            prop: property
                        };
                    }
                    function addGlobal(name, value) {
                        var info = findObj(name, g);
                        overrides.push(new Override(info.obj, info.prop, function () {
                            return value;
                        }));
                    }
                    for (var name in globals) {
                        addGlobal(name, globals[name]);
                    }
                },
                beforeTask: function (task) {
                    if (task.nestedTask)
                        return;
                    util.forEach.call(overrides, function (o) {
                        o.trap();
                    });
                },
                afterTask: function (task) {
                    if (task.nestedTask)
                        return;
                    util.forEach.call(overrides, function (o) {
                        o.release();
                    });
                }
            };
        };
        function Override(obj, name, fn) {
            this.oldValue = obj[name];
            this.obj = obj;
            this.name = name;
            this.value = fn(this.oldValue, this);
        }
        Override.prototype.trap = function () {
            this.obj[this.name] = this.value;
        };
        Override.prototype.release = function () {
            this.obj[this.name] = this.oldValue;
        };
        function promiseZone() {
            var promiseThen = function () {
                    if (!Zone.current || oldPromiseThen.zoneWrapped) {
                        return oldPromiseThen.apply(this, arguments);
                    }
                    return Zone.tasks.then(oldPromiseThen).apply(this, arguments);
                }, oldPromiseThen;
            return {
                beforeTask: function (task) {
                    if (task.nestedTask)
                        return;
                    oldPromiseThen = Promise.prototype.then;
                    Promise.prototype.then = promiseThen;
                },
                afterTask: function (task) {
                    if (task.nestedTask)
                        return;
                    Promise.prototype.then = oldPromiseThen;
                }
            };
        }
    }(function () {
        return this;
    }()));
});
/*can-zone@0.6.2#register*/
define('can-zone/register', function (require, exports, module) {
    (function (global) {
        'format cjs';
        (function () {
            var isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
            var g = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : isNode ? global : window;
            if (typeof module !== 'undefined' && !!module.exports) {
                module.exports = wrapAll;
            }
            var wrapped = g.__canZoneWrapped;
            if (!wrapped) {
                wrapped = g.__canZoneWrapped = {};
            }
            var forEach = Array.prototype.forEach || function (cb) {
                var i = 0, len = this.length;
                for (; i < len; i++) {
                    cb.call(this, this[i], i);
                }
            };
            var props = [
                'setTimeout',
                'clearTimeout',
                'requestAnimationFrame',
                'Promise.prototype.then',
                'XMLHttpRequest.prototype.send',
                'process.nextTick',
                'setImmediate',
                'clearImmediate',
                {
                    prop: 'MutationObserver',
                    fn: function (MutationObserver) {
                        return function (fn) {
                            return new MutationObserver(fn);
                        };
                    }
                }
            ];
            wrapAll();
            if (g.Promise) {
                monitor(g, 'Promise', 'Promise.prototype.then');
            }
            function extract(obj, prop) {
                var parts = prop.split('.');
                while (parts.length > 1) {
                    prop = parts.shift();
                    obj = obj[prop];
                    if (!obj)
                        break;
                    if (parts.length === 1)
                        prop = parts[0];
                }
                return [
                    obj,
                    prop
                ];
            }
            function wrapAll() {
                forEach.call(props, function (prop) {
                    var fn;
                    if (typeof prop === 'object') {
                        fn = prop.fn;
                        prop = prop.prop;
                    }
                    var key = prop;
                    if (wrapped[key]) {
                        return;
                    }
                    var results = extract(g, prop);
                    var obj = results[0];
                    prop = results[1];
                    if (!obj || !obj[prop]) {
                        return;
                    } else {
                        wrapped[key] = true;
                    }
                    wrapInZone(obj, prop, fn);
                });
            }
            function wrapInZone(object, property, fn) {
                if (fn) {
                    fn = fn(object[property]);
                } else {
                    fn = object[property];
                }
                var wrappedFn = function () {
                    if (typeof CanZone !== 'undefined' && !!CanZone.current) {
                        return CanZone.tasks[property](fn).apply(this, arguments);
                    }
                    return fn.apply(this, arguments);
                };
                wrappedFn.zoneWrapped = true;
                object[property] = wrappedFn;
            }
            function monitor(object, property, thingToRewrap) {
                var current = object[property];
                Object.defineProperty(object, property, {
                    get: function () {
                        return current;
                    },
                    set: function (val) {
                        var hasChanged = !val.zoneWrapped && val !== current;
                        current = val;
                        if (hasChanged) {
                            var results = extract(object, thingToRewrap);
                            var localObject = results[0];
                            var localProperty = results[1];
                            wrapInZone(localObject, localProperty);
                            monitor(object, property, thingToRewrap);
                        }
                    }
                });
            }
        }());
    }(function () {
        return this;
    }()));
});
/*can-zone@0.6.2#lib/tasks*/
define('can-zone/lib/tasks', function (require, exports, module) {
    (function (global) {
        var env = require('can-zone/lib/env');
        var slice = Array.prototype.slice;
        if (env.isNode) {
            var globalTimeoutId = 1;
        }
        var addTimer = function (callback) {
            var timeoutId = callback();
            var id = timeoutId;
            if (env.isNode) {
                id = timeoutId.__timeoutId = globalTimeoutId++;
            }
            var zone = CanZone.current;
            if (!zone.isResolved) {
                zone.ids[id] = timeoutId;
            }
            return {
                timeoutId: timeoutId,
                id: id
            };
        };
        var removeTimer = function (timeoutId, callback) {
            if (timeoutId == null) {
                return callback();
            }
            var zone = CanZone.current;
            var ids = zone.ids;
            var id = env.isNode ? timeoutId.__timeoutId : timeoutId;
            if (!zone.isResolved && ids[id]) {
                delete ids[id];
                zone.removeWait();
            }
            return callback();
        };
        exports.setTimeout = function (setTimeout) {
            return function (fn, timeout) {
                var args = Array.prototype.slice.call(arguments);
                var zone = CanZone.current;
                var idInfo;
                args[0] = zone.waitFor(function () {
                    delete zone.ids[idInfo.id];
                    return fn.apply(this, arguments);
                });
                var self = this;
                idInfo = addTimer(function () {
                    return setTimeout.apply(self, args);
                });
                return idInfo.timeoutId;
            };
        };
        exports.clearTimeout = function (clearTimeout) {
            return function (timeoutId) {
                var args = arguments, self = this;
                return removeTimer(timeoutId, function () {
                    return clearTimeout.apply(self, args);
                });
            };
        };
        exports.setImmediate = function (setImmediate) {
            return function (fn) {
                var idInfo;
                var zone = CanZone.current;
                var callback = zone.waitFor(function () {
                    delete zone.ids[idInfo.id];
                    return fn.apply(this, arguments);
                });
                var self = this, args = slice.call(arguments, 1);
                idInfo = addTimer(function () {
                    return setImmediate.apply(self, [callback].concat(args));
                });
                return idInfo.timeoutId;
            };
        };
        exports.clearImmediate = function (clearImmediate) {
            return function (immediateId) {
                var args = arguments, self = this;
                return removeTimer(immediateId, function () {
                    return clearImmediate.apply(self, args);
                });
            };
        };
        exports.requestAnimationFrame = function (rAF) {
            return function (fn) {
                var callback = CanZone.current.waitFor(fn);
                return rAF.call(this, callback);
            };
        };
        exports.then = function (then) {
            return function (onFulfilled, onRejected) {
                var fn;
                var rejected;
                var callback = CanZone.current.waitFor(function (val) {
                    if (fn) {
                        return fn.apply(this, arguments);
                    } else if (rejected) {
                        val = typeof val === 'string' ? new Error(val) : val;
                        throw val;
                    }
                    return val;
                }, false);
                var callWith = function (cb, isError) {
                    return function () {
                        fn = cb;
                        rejected = !!isError;
                        return callback.apply(this, arguments);
                    };
                };
                return then.call(this, callWith(onFulfilled), callWith(onRejected, true));
            };
        };
        var supportsOnload = undefined;
        exports.send = function (send) {
            if (typeof supportsOnload === 'undefined') {
                supportsOnload = 'onload' in new XMLHttpRequest();
            }
            return function () {
                var onreadystatechange = this.onreadystatechange, onload = this.onload, onerror = this.onerror, thisXhr = this, zone = CanZone.current;
                zone.addWait();
                if (supportsOnload) {
                    this.onload = createCallback(onload);
                    this.onerror = createCallback(onerror);
                } else {
                    onreadystatechange = onreadystatechange || function () {
                    };
                    var callback = createCallback(onreadystatechange);
                    this.onreadystatechange = function (ev) {
                        var xhr = ev ? ev.target : thisXhr;
                        if (xhr.readyState === 4) {
                            return callback.apply(this, arguments);
                        } else {
                            return onreadystatechange.apply(this, arguments);
                        }
                    };
                }
                function createCallback(fn) {
                    fn = fn || function () {
                    };
                    return function () {
                        var task = new CanZone.Task(zone, fn);
                        var res = task.run(this, arguments);
                        zone.removeWait();
                        return res;
                    };
                }
                return send.apply(this, arguments);
            };
        };
        exports.nextTick = function (nextTick) {
            return function (fn) {
                var callback = CanZone.current.waitFor(fn);
                var args = slice.call(arguments, 1);
                args.unshift(callback);
                return nextTick.apply(process, args);
            };
        };
        exports.MutationObserver = function (MutationObserver) {
            return function (fn) {
                fn = CanZone.current.wrap(fn);
                return new MutationObserver(fn);
            };
        };
    }(function () {
        return this;
    }()));
});
/*can-zone@0.6.2#lib/zone*/
define('can-zone', function (require, exports, module) {
    (function (global) {
        var g = require('can-zone/lib/env').global;
        var Promise = g.Promise;
        var globalsZone = require('can-zone/lib/zones/globals');
        var forEach = require('can-zone/lib/util').forEach;
        require('can-zone/register');
        var slice = Array.prototype.slice;
        var noop = function () {
        };
        function Deferred() {
            var dfd = this;
            this.promise = new Promise(function (resolve, reject) {
                dfd.resolve = resolve;
                dfd.reject = reject;
            });
        }
        function Task(zone, fn, catchErrors) {
            this.zone = zone;
            this.fn = fn;
            this.catchErrors = catchErrors;
            this.nestedTask = zone.runningTask;
        }
        Task.prototype.run = function (ctx, args) {
            var previousZone = Zone.current;
            var zone = Zone.current = this.zone;
            if (!this.nestedTask)
                zone.execHook('beforeTask', this);
            var res;
            try {
                zone.runningTask = true;
                res = this.fn.apply(ctx, args);
                Zone.current = previousZone;
                if (!this.nestedTask)
                    zone.execHookR('afterTask', this);
            } catch (err) {
                Zone.current = previousZone;
                if (!this.nestedTask)
                    zone.execHookR('afterTask', this);
                if (this.catchErrors !== false) {
                    zone.errors.push(err);
                } else {
                    throw err;
                }
            } finally {
                zone.runningTask = this.nestedTask;
            }
            return res;
        };
        var hooks = [
            'beforeTask',
            'afterTask',
            'created',
            'ended',
            'beforeRun'
        ];
        var commonGlobals = [
            'document',
            'window',
            'location'
        ];
        function buildZoneSpec(zone, spec, plugins, processedSpecs) {
            spec = spec || {};
            processedSpecs = processedSpecs || [];
            if (processedSpecs.indexOf(spec) !== -1) {
                return;
            } else {
                processedSpecs.push(spec);
            }
            plugins = plugins || [];
            if (typeof spec === 'function') {
                spec = spec(zone.data);
            }
            if (spec.plugins) {
                plugins = plugins.concat(spec.plugins);
            }
            forEach.call(plugins, function (plugin) {
                buildZoneSpec(zone, plugin, null, processedSpecs);
            });
            if (spec.hooks) {
                zone.hooks = zone.hooks.concat(spec.hooks);
            }
            forEach.call(zone.hooks, function (hook) {
                var propName = hook + 's';
                var array = zone[propName];
                if (!array) {
                    array = zone[propName] = [];
                }
                if (spec[hook]) {
                    array.push(spec[hook]);
                }
            });
            var globals = extend({}, spec.globals || {});
            forEach.call(commonGlobals, function (name) {
                if (spec[name])
                    globals[name] = spec[name];
            });
            for (var p in globals) {
                zone.globals[p] = globals[p];
            }
        }
        function Zone(spec) {
            spec = spec || {};
            this.deferred = new Deferred();
            this.waits = 0;
            this.ids = {};
            this.errors = [];
            this.data = {};
            this.globals = {};
            this.parent = Zone.current;
            this.hooks = slice.call(hooks);
            buildZoneSpec(this, spec, [globalsZone]);
            this.execHook('created');
        }
        Zone.waitFor = function (fn, catchErrors) {
            fn = fn || noop;
            var zone = Zone.current;
            if (!zone)
                return fn;
            return zone.waitFor(fn, catchErrors);
        };
        Zone.error = function (error) {
            var zone = Zone.current;
            if (!zone)
                return error;
            zone.errors.push(error);
            return error;
        };
        Zone.ignore = function (fn) {
            return function () {
                var zone = Zone.current;
                if (!zone)
                    return fn.apply(this, arguments);
                var task = new Task(zone);
                Zone.current = undefined;
                zone.execHookR('afterTask', task);
                var res = fn.apply(this, arguments);
                zone.execHook('beforeTask', task);
                Zone.current = zone;
                return res;
            };
        };
        Zone.prototype.runTask = function (fn, ctx, args, catchErrors, decrementWaits) {
            var res, error;
            var task = new Task(this, fn, catchErrors);
            try {
                res = task.run(ctx, args);
            } catch (err) {
                error = err;
            }
            if (decrementWaits && this.removeWait)
                this.removeWait();
            if (error)
                throw error;
            return res;
        };
        Zone.prototype.run = function (fn) {
            if (this.isResolved) {
                this.deferred = new Deferred();
                this.isResolved = false;
            } else {
                this.execHook('beforeRun');
            }
            var task = new Task(this, fn);
            this.data.result = task.run();
            if (!this.waits || this.errors.length) {
                this.end();
            }
            return this.deferred.promise;
        };
        Zone.prototype.fork = function (zoneSpec) {
            var plugins = [];
            if (zoneSpec)
                plugins.push(zoneSpec);
            plugins.unshift(this);
            var newZone = new Zone({ plugins: plugins });
            return newZone;
        };
        Zone.prototype.execHook = function (hook) {
            var args = slice.call(arguments, 1);
            var zone = this;
            var prop = hook + 's';
            var array = this[prop];
            if (array) {
                forEach.call(array, function (fn) {
                    fn.apply(zone, args);
                });
            }
        };
        Zone.prototype.execHookR = function (hook) {
            var args = slice.call(arguments, 1);
            var zone = this;
            var prop = hook + 's';
            var array = this[prop];
            if (array) {
                var i = array.length - 1;
                for (; i >= 0; i--) {
                    array[i].apply(zone, args);
                }
            }
        };
        Zone.prototype.wrap = function (fn, catchErrors) {
            var zone = this;
            return function () {
                return zone.runTask(fn, this, arguments, catchErrors);
            };
        };
        Zone.prototype.end = function () {
            this.execHook('ended');
            var dfd = this.deferred;
            if (this.errors.length) {
                var error = this.errors[0];
                error.errors = this.errors;
                dfd.reject(error);
            } else {
                dfd.resolve(this.data);
            }
            this.isResolved = true;
        };
        Zone.prototype.waitFor = function (fn, catchErrors) {
            this.addWait();
            var zone = this;
            return function () {
                return zone.runTask(fn, this, arguments, catchErrors, true);
            };
        };
        Zone.prototype.addWait = function () {
            this.waits++;
            if (this.parent) {
                this.parent.addWait();
            }
        };
        Zone.prototype.removeWait = function () {
            this.waits--;
            if (this.waits === 0) {
                this.end();
            }
            if (this.parent) {
                this.parent.removeWait();
            }
        };
        Zone.Task = Task;
        function extend(a, b) {
            if (!b)
                return a;
            for (var p in b) {
                a[p] = b[p];
            }
            return a;
        }
        Zone.tasks = {};
        addTasks(require('can-zone/lib/tasks'));
        function addTasks(tasks) {
            for (var p in tasks) {
                Zone.tasks[p] = tasks[p];
            }
        }
        g.CanZone = g.CanZone || Zone;
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = Zone;
        }
    }(function () {
        return this;
    }()));
});
/*can-stream@0.0.5#can-stream*/
define('can-stream', function (require, exports, module) {
    var compute = require('can-compute');
    var Kefir = require('kefir');
    var makeArray = require('can-util/js/make-array/make-array');
    var assign = require('can-util/js/assign/assign');
    var canEvent = require('can-event');
    var namespace = require('can-util/namespace');
    var canStream = {};
    canStream.singleComputeToStream = function (compute) {
        return Kefir.stream(function (emitter) {
            var changeHandler = function (ev, newVal) {
                emitter.emit(newVal);
            };
            compute.on('change', changeHandler);
            emitter.emit(compute());
            return function () {
                compute.off('change', changeHandler);
            };
        });
    };
    canStream.toStreamFromCompute = function () {
        var computes = makeArray(arguments);
        var callback;
        if (computes[computes.length - 1].isComputed) {
            callback = function () {
                return arguments.length > 1 ? Kefir.merge(arguments) : arguments[0];
            };
        } else {
            callback = computes.pop();
        }
        var streams = computes.map(canStream.singleComputeToStream);
        return callback.apply(this, streams);
    };
    canStream.toStreamFromProperty = function (obs, propName) {
        return canStream.toStreamFromCompute(compute(obs, propName));
    };
    canStream.toStreamFromEvent = function () {
        var obs = arguments[0];
        var eventName, propName;
        if (arguments.length === 2) {
            eventName = arguments[1];
            return Kefir.stream(function (emitter) {
                var handler = function (ev) {
                    var clone = assign({}, ev);
                    clone.args = Array.prototype.slice.call(arguments, 1);
                    emitter.emit(clone);
                };
                canEvent.addEventListener.call(obs, eventName, handler);
                return function () {
                    canEvent.removeEventListener.call(obs, eventName, handler);
                };
            });
        } else {
            propName = arguments[1];
            eventName = arguments[2];
            var propValueStream = canStream.toStreamFromProperty(obs, propName);
            return Kefir.stream(function (emitter) {
                var handler = function (ev) {
                    var clone = assign({}, ev);
                    clone.args = Array.prototype.slice.call(arguments, 1);
                    emitter.emit(clone);
                };
                var curValue;
                propValueStream.onValue(function (value) {
                    if (curValue) {
                        canEvent.removeEventListener.call(curValue, eventName, handler);
                    }
                    if (value) {
                        canEvent.addEventListener.call(value, eventName, handler);
                    }
                    curValue = value;
                });
                return function () {
                    if (curValue) {
                        canEvent.removeEventListener.call(curValue, eventName, handler);
                    }
                };
            });
        }
    };
    canStream.toSingleStream = function () {
        return Kefir.merge(arguments);
    };
    canStream.toStream = function () {
        if (arguments.length === 1) {
            return canStream.toStreamFromCompute(arguments[0]);
        } else if (arguments.length > 1) {
            var obs = arguments[0];
            var eventNameOrPropName = arguments[1].trim();
            if (eventNameOrPropName.indexOf(' ') === -1) {
                if (eventNameOrPropName.indexOf('.') === 0) {
                    return canStream.toStreamFromProperty(obs, eventNameOrPropName.slice(1));
                } else {
                    return canStream.toStreamFromEvent(obs, eventNameOrPropName);
                }
            } else {
                var splitEventNameAndProperty = eventNameOrPropName.split(' ');
                return canStream.toStreamFromEvent(obs, splitEventNameAndProperty[0].slice(1), splitEventNameAndProperty[1]);
            }
        }
        return undefined;
    };
    module.exports = namespace.stream = canStream;
});
/*can-stream@0.0.4#can-stream*/
define('can-stream', function (require, exports, module) {
    var compute = require('can-compute');
    var Kefir = require('kefir');
    var makeArray = require('can-util/js/make-array/make-array');
    var assign = require('can-util/js/assign/assign');
    var canEvent = require('can-event');
    var canStream = {};
    canStream.singleComputeToStream = function (compute) {
        return Kefir.stream(function (emitter) {
            var changeHandler = function (ev, newVal) {
                emitter.emit(newVal);
            };
            compute.on('change', changeHandler);
            emitter.emit(compute());
            return function () {
                compute.off('change', changeHandler);
            };
        });
    };
    canStream.toStreamFromCompute = function () {
        var computes = makeArray(arguments);
        var callback;
        if (computes[computes.length - 1].isComputed) {
            callback = function () {
                return arguments.length > 1 ? Kefir.merge(arguments) : arguments[0];
            };
        } else {
            callback = computes.pop();
        }
        var streams = computes.map(canStream.singleComputeToStream);
        return callback.apply(this, streams);
    };
    canStream.toStreamFromProperty = function (obs, propName) {
        return canStream.toStreamFromCompute(compute(obs, propName));
    };
    canStream.toStreamFromEvent = function () {
        var obs = arguments[0];
        var eventName, propName;
        if (arguments.length === 2) {
            eventName = arguments[1];
            return Kefir.stream(function (emitter) {
                var handler = function (ev) {
                    var clone = assign({}, ev);
                    clone.args = Array.prototype.slice.call(arguments, 1);
                    emitter.emit(clone);
                };
                canEvent.addEventListener.call(obs, eventName, handler);
                return function () {
                    canEvent.removeEventListener.call(obs, eventName, handler);
                };
            });
        } else {
            propName = arguments[1];
            eventName = arguments[2];
            var propValueStream = canStream.toStreamFromProperty(obs, propName);
            return Kefir.stream(function (emitter) {
                var handler = function (ev) {
                    var clone = assign({}, ev);
                    clone.args = Array.prototype.slice.call(arguments, 1);
                    emitter.emit(clone);
                };
                var curValue;
                propValueStream.onValue(function (value) {
                    if (curValue) {
                        canEvent.removeEventListener.call(curValue, eventName, handler);
                    }
                    if (value) {
                        canEvent.addEventListener.call(value, eventName, handler);
                    }
                    curValue = value;
                });
                return function () {
                    if (curValue) {
                        canEvent.removeEventListener.call(curValue, eventName, handler);
                    }
                };
            });
        }
    };
    canStream.toSingleStream = function () {
        return Kefir.merge(arguments);
    };
    canStream.toStream = function () {
        if (arguments.length === 1) {
            return canStream.toStreamFromCompute(arguments[0]);
        } else if (arguments.length > 1) {
            var obs = arguments[0];
            var eventNameOrPropName = arguments[1].trim();
            if (eventNameOrPropName.indexOf(' ') === -1) {
                if (eventNameOrPropName.indexOf('.') === 0) {
                    return canStream.toStreamFromProperty(obs, eventNameOrPropName.slice(1));
                } else {
                    return canStream.toStreamFromEvent(obs, eventNameOrPropName);
                }
            } else {
                var splitEventNameAndProperty = eventNameOrPropName.split(' ');
                return canStream.toStreamFromEvent(obs, splitEventNameAndProperty[0].slice(1), splitEventNameAndProperty[1]);
            }
        }
        return undefined;
    };
    module.exports = canStream;
});
/*can-define-stream@0.0.6#can-define-stream*/
define('can-define-stream', function (require, exports, module) {
    var define = require('can-define');
    var canStream = require('can-stream');
    var assign = require('can-util/js/assign/assign');
    var DefineMap = require('can-define/map/map');
    var DefineList = require('can-define/list/list');
    var Kefir = require('kefir');
    var compute = require('can-compute');
    var oldExtensions = define.extensions;
    define.behaviors.push('stream');
    var makeComputeWithSetter = function (valueStream, willHaveEmitter) {
        var streamHandler, lastValue;
        var valueCompute = compute(undefined, {
            get: function () {
                return lastValue;
            },
            set: function (val) {
                willHaveEmitter.emitter.emit(val);
                return val;
            },
            on: function (updated) {
                streamHandler = function (val) {
                    lastValue = val;
                    updated();
                };
                valueStream.onValue(streamHandler);
            },
            off: function () {
                valueStream.offValue(streamHandler);
            }
        });
        return valueCompute;
    };
    var makeComputeFromStream = function (map, makeStream) {
        var willHaveEmitter = {};
        var setterStream = Kefir.stream(function (emitter) {
            willHaveEmitter.emitter = emitter;
        });
        var valueStream = makeStream.call(map, setterStream);
        return makeComputeWithSetter(valueStream, willHaveEmitter);
    };
    define.extensions = function (objPrototype, prop, definition) {
        if (definition.stream) {
            return assign({
                value: function () {
                    return makeComputeFromStream(this, definition.stream);
                }
            }, define.types.compute);
        } else {
            return oldExtensions.apply(this, arguments);
        }
    };
    DefineList.prototype.stream = DefineMap.prototype.stream = function () {
        [].unshift.call(arguments, this);
        return canStream.toStream.apply(this, arguments);
    };
});
/*can@3.4.1#ecosystem*/
define('can/ecosystem', function (require, exports, module) {
    var can = require('can-util/namespace');
    require('can-construct-super');
    require('can-fixture');
    require('can-jquery');
    require('can-fixture-socket');
    require('can-connect-feathers');
    require('can-stache-converters');
    require('can-view-import');
    require('can-zone');
    require('can-stream');
    require('can-define-stream');
    module.exports = can;
});
/*can-map@3.0.4#bubble*/
define('can-map/bubble', function (require, exports, module) {
    var canEvent = require('can-event');
    var makeArray = require('can-util/js/make-array/make-array');
    var types = require('can-types');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var bubble = {
        bind: function (parent, eventName) {
            if (!parent.__inSetup) {
                var bubbleEvents = bubble.events(parent, eventName), len = bubbleEvents.length, bubbleEvent;
                if (!parent._bubbleBindings) {
                    parent._bubbleBindings = {};
                }
                for (var i = 0; i < len; i++) {
                    bubbleEvent = bubbleEvents[i];
                    if (!parent._bubbleBindings[bubbleEvent]) {
                        parent._bubbleBindings[bubbleEvent] = 1;
                        bubble.childrenOf(parent, bubbleEvent);
                    } else {
                        parent._bubbleBindings[bubbleEvent]++;
                    }
                }
            }
        },
        unbind: function (parent, eventName) {
            var bubbleEvents = bubble.events(parent, eventName), len = bubbleEvents.length, bubbleEvent;
            for (var i = 0; i < len; i++) {
                bubbleEvent = bubbleEvents[i];
                if (parent._bubbleBindings) {
                    parent._bubbleBindings[bubbleEvent]--;
                }
                if (parent._bubbleBindings && !parent._bubbleBindings[bubbleEvent]) {
                    delete parent._bubbleBindings[bubbleEvent];
                    bubble.teardownChildrenFrom(parent, bubbleEvent);
                    if (isEmptyObject(parent._bubbleBindings)) {
                        delete parent._bubbleBindings;
                    }
                }
            }
        },
        add: function (parent, child, prop) {
            if (types.isMapLike(child) && parent._bubbleBindings) {
                for (var eventName in parent._bubbleBindings) {
                    if (parent._bubbleBindings[eventName]) {
                        bubble.teardownFromParent(parent, child, eventName);
                        bubble.toParent(child, parent, prop, eventName);
                    }
                }
            }
        },
        addMany: function (parent, children) {
            for (var i = 0, len = children.length; i < len; i++) {
                bubble.add(parent, children[i], i);
            }
        },
        remove: function (parent, child) {
            if (types.isMapLike(child) && parent._bubbleBindings) {
                for (var eventName in parent._bubbleBindings) {
                    if (parent._bubbleBindings[eventName]) {
                        bubble.teardownFromParent(parent, child, eventName);
                    }
                }
            }
        },
        removeMany: function (parent, children) {
            for (var i = 0, len = children.length; i < len; i++) {
                bubble.remove(parent, children[i]);
            }
        },
        set: function (parent, prop, value, current) {
            if (types.isMapLike(value)) {
                bubble.add(parent, value, prop);
            }
            if (types.isMapLike(current)) {
                bubble.remove(parent, current);
            }
            return value;
        },
        events: function (map, boundEventName) {
            return map.constructor._bubbleRule(boundEventName, map);
        },
        toParent: function (child, parent, prop, eventName) {
            canEvent.listenTo.call(parent, child, eventName, function () {
                var args = makeArray(arguments), ev = args.shift();
                args[0] = (types.isListLike(parent) ? parent.indexOf(child) : prop) + (args[0] ? '.' + args[0] : '');
                ev.triggeredNS = ev.triggeredNS || {};
                if (ev.triggeredNS[parent._cid]) {
                    return;
                }
                ev.triggeredNS[parent._cid] = true;
                canEvent.dispatch.call(parent, ev, args);
                if (eventName === 'change') {
                    canEvent.dispatch.call(parent, args[0], [
                        args[2],
                        args[3]
                    ]);
                }
            });
        },
        childrenOf: function (parent, eventName) {
            parent._each(function (child, prop) {
                if (child && child.bind) {
                    bubble.toParent(child, parent, prop, eventName);
                }
            });
        },
        teardownFromParent: function (parent, child, eventName) {
            if (child && child.unbind) {
                canEvent.stopListening.call(parent, child, eventName);
            }
        },
        teardownChildrenFrom: function (parent, eventName) {
            parent._each(function (child) {
                bubble.teardownFromParent(parent, child, eventName);
            });
        },
        isBubbling: function (parent, eventName) {
            return parent._bubbleBindings && parent._bubbleBindings[eventName];
        }
    };
    module.exports = bubble;
});
/*can-map@3.0.4#map-helpers*/
define('can-map/map-helpers', function (require, exports, module) {
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var isArray = require('can-util/js/is-array/is-array');
    var isPromise = require('can-util/js/is-promise/is-promise');
    var CID = require('can-cid');
    var types = require('can-types');
    var assign = require('can-util/js/assign/assign');
    var madeMap = null;
    var teardownMap = function () {
        for (var cid in madeMap) {
            if (madeMap[cid].added) {
                delete madeMap[cid].obj._cid;
            }
        }
        madeMap = null;
    };
    var mapHelpers = {
        attrParts: function (attr, keepKey) {
            if (keepKey) {
                return [attr];
            }
            return typeof attr === 'object' ? attr : ('' + attr).split('.');
        },
        canMakeObserve: function (obj) {
            return obj && !isPromise(obj) && (isArray(obj) || isPlainObject(obj));
        },
        serialize: function () {
            var serializeMap = null;
            return function (map, how, where) {
                var cid = CID(map), firstSerialize = false;
                if (!serializeMap) {
                    firstSerialize = true;
                    serializeMap = {
                        attr: {},
                        serialize: {}
                    };
                }
                serializeMap[how][cid] = where;
                map.each(function (val, name) {
                    var result, isObservable = types.isMapLike(val), serialized = isObservable && serializeMap[how][CID(val)];
                    if (serialized) {
                        result = serialized;
                    } else {
                        if (map['___' + how]) {
                            result = map['___' + how](name, val);
                        } else {
                            result = mapHelpers.getValue(map, name, val, how);
                        }
                    }
                    if (result !== undefined) {
                        where[name] = result;
                    }
                });
                if (firstSerialize) {
                    serializeMap = null;
                }
                return where;
            };
        }(),
        getValue: function (map, name, val, how) {
            if (types.isMapLike(val)) {
                return val[how]();
            } else {
                return val;
            }
        },
        define: null,
        addComputedAttr: function (map, attrName, compute) {
            map._computedAttrs[attrName] = {
                compute: compute,
                count: 0,
                handler: function (ev, newVal, oldVal) {
                    map._triggerChange(attrName, 'set', newVal, oldVal, ev.batchNum);
                }
            };
        },
        addToMap: function addToMap(obj, instance) {
            var teardown;
            if (!madeMap) {
                teardown = teardownMap;
                madeMap = {};
            }
            var hasCid = obj._cid;
            var cid = CID(obj);
            if (!madeMap[cid]) {
                madeMap[cid] = {
                    obj: obj,
                    instance: instance,
                    added: !hasCid
                };
            }
            return teardown;
        },
        getMapFromObject: function (obj) {
            return madeMap && madeMap[obj._cid] && madeMap[obj._cid].instance;
        },
        twoLevelDeepExtend: function (destination, source) {
            for (var prop in source) {
                destination[prop] = destination[prop] || {};
                assign(destination[prop], source[prop]);
            }
        }
    };
    module.exports = exports = mapHelpers;
});
/*can-map@3.0.4#can-map*/
define('can-map', function (require, exports, module) {
    var bubble = require('can-map/bubble');
    var mapHelpers = require('can-map/map-helpers');
    var canEvent = require('can-event');
    var canBatch = require('can-event/batch/batch');
    var eventLifecycle = require('can-event/lifecycle/lifecycle');
    var Construct = require('can-construct');
    var Observation = require('can-observation');
    var ObserveReader = require('can-observation/reader/reader');
    var canCompute = require('can-compute');
    var namespace = require('can-namespace');
    var dev = require('can-util/js/dev/dev');
    var CID = require('can-cid');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var isFunction = require('can-util/js/is-function/is-function');
    var assign = require('can-util/js/assign/assign');
    var types = require('can-types');
    var isArray = require('can-util/js/is-array/is-array');
    var unobservable = { 'constructor': true };
    var Map = Construct.extend({
        setup: function (baseMap) {
            Construct.setup.apply(this, arguments);
            this._computedPropertyNames = [];
            if (Map) {
                if (this.prototype.define && !mapHelpers.define) {
                    dev.warn('can/map/define is not included, yet there is a define property ' + 'used. You may want to add this plugin.');
                }
                if (this.define && !mapHelpers.define) {
                    dev.warn('The define property should be on the map\'s prototype properties, ' + 'not the static properties. Also, can/map/define is not included.');
                }
                if (!this.defaults) {
                    this.defaults = {};
                }
                for (var prop in this.prototype) {
                    if (prop !== 'define' && prop !== 'constructor' && (typeof this.prototype[prop] !== 'function' || this.prototype[prop].prototype instanceof Construct)) {
                        this.defaults[prop] = this.prototype[prop];
                    } else if (this.prototype[prop].isComputed) {
                        this._computedPropertyNames.push(prop);
                    }
                }
                if (mapHelpers.define) {
                    mapHelpers.define(this, baseMap.prototype.define);
                }
            }
        },
        shortName: 'Map',
        _bubbleRule: function (eventName) {
            return eventName === 'change' || eventName.indexOf('.') >= 0 ? ['change'] : [];
        },
        addEventListener: eventLifecycle.addAndSetup,
        removeEventListener: eventLifecycle.removeAndTeardown,
        keys: function (map) {
            var keys = [];
            Observation.add(map, '__keys');
            for (var keyName in map._data) {
                keys.push(keyName);
            }
            return keys;
        }
    }, {
        setup: function (obj) {
            if (obj instanceof Map) {
                obj = obj.serialize();
            }
            this._data = {};
            CID(this, '.map');
            this._setupComputedProperties();
            var teardownMapping = obj && mapHelpers.addToMap(obj, this);
            var defaultValues = this._setupDefaults(obj);
            var data = assign(deepAssign(true, {}, defaultValues), obj);
            this.attr(data);
            if (teardownMapping) {
                teardownMapping();
            }
        },
        _setupComputedProperties: function () {
            this._computedAttrs = {};
            var computes = this.constructor._computedPropertyNames;
            for (var i = 0, len = computes.length; i < len; i++) {
                var attrName = computes[i];
                mapHelpers.addComputedAttr(this, attrName, this[attrName].clone(this));
            }
        },
        _setupDefaults: function () {
            return this.constructor.defaults || {};
        },
        attr: function (attr, val) {
            var type = typeof attr;
            if (attr === undefined) {
                return this._getAttrs();
            } else if (type !== 'string' && type !== 'number') {
                return this._setAttrs(attr, val);
            } else if (arguments.length === 1) {
                return this._get(attr + '');
            } else {
                this._set(attr + '', val);
                return this;
            }
        },
        _get: function (attr) {
            var dotIndex = attr.indexOf('.');
            if (dotIndex >= 0) {
                var value = this.___get(attr);
                if (value !== undefined) {
                    Observation.add(this, attr);
                    return value;
                }
                var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1);
                var current = this.__get(first);
                return current && current._get ? current._get(second) : undefined;
            } else {
                return this.__get(attr);
            }
        },
        __get: function (attr) {
            if (!unobservable[attr] && !this._computedAttrs[attr]) {
                Observation.add(this, attr);
            }
            return this.___get(attr);
        },
        ___get: function (attr) {
            if (attr !== undefined) {
                var computedAttr = this._computedAttrs[attr];
                if (computedAttr && computedAttr.compute) {
                    return computedAttr.compute();
                } else {
                    return this._data.hasOwnProperty(attr) ? this._data[attr] : undefined;
                }
            } else {
                return this._data;
            }
        },
        _set: function (attr, value, keepKey) {
            var dotIndex = attr.indexOf('.'), current;
            if (dotIndex >= 0 && !keepKey) {
                var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1);
                current = this.__inSetup ? undefined : this.___get(first);
                if (types.isMapLike(current)) {
                    current._set(second, value);
                } else {
                    throw new Error('can-map: Object does not exist');
                }
            } else {
                current = this.__inSetup ? undefined : this.___get(attr);
                if (this.__convert) {
                    value = this.__convert(attr, value);
                }
                this.__set(attr, this.__type(value, attr), current);
            }
        },
        __type: function (value, prop) {
            if (typeof value === 'object' && !types.isMapLike(value) && mapHelpers.canMakeObserve(value) && !isArray(value)) {
                var cached = mapHelpers.getMapFromObject(value);
                if (cached) {
                    return cached;
                }
                var MapConstructor = this.constructor.Map || Map;
                return new MapConstructor(value);
            }
            return value;
        },
        __set: function (prop, value, current) {
            if (value !== current) {
                var computedAttr = this._computedAttrs[prop];
                var changeType = computedAttr || current !== undefined || this.___get().hasOwnProperty(prop) ? 'set' : 'add';
                this.___set(prop, typeof value === 'object' ? bubble.set(this, prop, value, current) : value);
                if (!computedAttr || !computedAttr.count) {
                    this._triggerChange(prop, changeType, value, current);
                }
                if (typeof current === 'object') {
                    bubble.teardownFromParent(this, current);
                }
            }
        },
        ___set: function (prop, val) {
            var computedAttr = this._computedAttrs[prop];
            if (computedAttr) {
                computedAttr.compute(val);
            } else {
                this._data[prop] = val;
            }
            if (typeof this.constructor.prototype[prop] !== 'function' && !computedAttr) {
                this[prop] = val;
            }
        },
        removeAttr: function (attr) {
            return this._remove(attr);
        },
        _remove: function (attr) {
            var parts = mapHelpers.attrParts(attr), prop = parts.shift(), current = this.___get(prop);
            if (parts.length && current) {
                return current.removeAttr(parts);
            } else {
                if (typeof attr === 'string' && !!~attr.indexOf('.')) {
                    prop = attr;
                }
                this.__remove(prop, current);
                return current;
            }
        },
        __remove: function (prop, current) {
            if (prop in this._data) {
                this.___remove(prop);
                this._triggerChange(prop, 'remove', undefined, current);
            }
        },
        ___remove: function (prop) {
            delete this._data[prop];
            if (!(prop in this.constructor.prototype)) {
                delete this[prop];
            }
        },
        ___serialize: function (name, val) {
            return mapHelpers.getValue(this, name, val, 'serialize');
        },
        _getAttrs: function () {
            return mapHelpers.serialize(this, 'attr', {});
        },
        _setAttrs: function (props, remove) {
            props = assign({}, props);
            var prop, self = this, newVal;
            canBatch.start();
            this._each(function (curVal, prop) {
                if (prop === '_cid') {
                    return;
                }
                newVal = props[prop];
                if (newVal === undefined) {
                    if (remove) {
                        self.removeAttr(prop);
                    }
                    return;
                }
                if (self.__convert) {
                    newVal = self.__convert(prop, newVal);
                }
                if (types.isMapLike(curVal) && mapHelpers.canMakeObserve(newVal)) {
                    curVal.attr(newVal, remove);
                } else if (curVal !== newVal) {
                    self.__set(prop, self.__type(newVal, prop), curVal);
                }
                delete props[prop];
            });
            for (prop in props) {
                if (prop !== '_cid') {
                    newVal = props[prop];
                    this._set(prop, newVal, true);
                }
            }
            canBatch.stop();
            return this;
        },
        serialize: function () {
            return mapHelpers.serialize(this, 'serialize', {});
        },
        _triggerChange: function (attr, how, newVal, oldVal, batchNum) {
            if (bubble.isBubbling(this, 'change')) {
                canEvent.dispatch.call(this, {
                    type: 'change',
                    target: this,
                    batchNum: batchNum
                }, [
                    attr,
                    how,
                    newVal,
                    oldVal
                ]);
            }
            canEvent.dispatch.call(this, {
                type: attr,
                target: this,
                batchNum: batchNum
            }, [
                newVal,
                oldVal
            ]);
            if (how === 'remove' || how === 'add') {
                canEvent.dispatch.call(this, {
                    type: '__keys',
                    target: this,
                    batchNum: batchNum
                });
            }
        },
        _eventSetup: function () {
        },
        _eventTeardown: function () {
        },
        one: canEvent.one,
        addEventListener: function (eventName, handler) {
            var computedBinding = this._computedAttrs && this._computedAttrs[eventName];
            if (computedBinding && computedBinding.compute) {
                if (!computedBinding.count) {
                    computedBinding.count = 1;
                    computedBinding.compute.addEventListener('change', computedBinding.handler);
                } else {
                    computedBinding.count++;
                }
            }
            bubble.bind(this, eventName);
            return eventLifecycle.addAndSetup.apply(this, arguments);
        },
        removeEventListener: function (eventName, handler) {
            var computedBinding = this._computedAttrs && this._computedAttrs[eventName];
            if (computedBinding) {
                if (computedBinding.count === 1) {
                    computedBinding.count = 0;
                    computedBinding.compute.removeEventListener('change', computedBinding.handler);
                } else {
                    computedBinding.count--;
                }
            }
            bubble.unbind(this, eventName);
            return eventLifecycle.removeAndTeardown.apply(this, arguments);
        },
        compute: function (prop) {
            if (isFunction(this.constructor.prototype[prop])) {
                return canCompute(this[prop], this);
            } else {
                var reads = ObserveReader.reads(prop);
                var last = reads.length - 1;
                return canCompute(function (newVal) {
                    if (arguments.length) {
                        ObserveReader.write(this, reads[last].key, newVal);
                    } else {
                        return ObserveReader.get(this, prop);
                    }
                }, this);
            }
        },
        each: function (callback, context) {
            var key, item;
            var keys = Map.keys(this);
            for (var i = 0, len = keys.length; i < len; i++) {
                key = keys[i];
                item = this.attr(key);
                if (callback.call(context || item, item, key, this) === false) {
                    break;
                }
            }
            return this;
        },
        _each: function (callback) {
            var data = this.___get();
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    callback(data[prop], prop);
                }
            }
        },
        dispatch: canEvent.dispatch
    });
    Map.prototype.on = Map.prototype.bind = Map.prototype.addEventListener;
    Map.prototype.off = Map.prototype.unbind = Map.prototype.removeEventListener;
    Map.on = Map.bind = Map.addEventListener;
    Map.off = Map.unbind = Map.removeEventListener;
    var oldIsMapLike = types.isMapLike;
    types.isMapLike = function (obj) {
        if (obj instanceof Map) {
            return true;
        } else {
            return oldIsMapLike.call(this, obj);
        }
    };
    if (!types.DefaultMap) {
        types.DefaultMap = Map;
    }
    module.exports = namespace.Map = Map;
});
/*can-list@3.0.2#can-list*/
define('can-list', function (require, exports, module) {
    require('can-event');
    var namespace = require('can-namespace');
    var Map = require('can-map');
    var bubble = require('can-map/bubble');
    var mapHelpers = require('can-map/map-helpers');
    var canBatch = require('can-event/batch/batch');
    var canEvent = require('can-event');
    var Observation = require('can-observation');
    var CID = require('can-cid');
    var isPromise = require('can-util/js/is-promise/is-promise');
    var makeArray = require('can-util/js/make-array/make-array');
    var assign = require('can-util/js/assign/assign');
    var types = require('can-types');
    var each = require('can-util/js/each/each');
    var splice = [].splice, spliceRemovesProps = function () {
            var obj = {
                0: 'a',
                length: 1
            };
            splice.call(obj, 0, 1);
            return !obj[0];
        }();
    var serializeNonTypes = function (MapType, arg, args) {
        if (arg && arg.serialize && !(arg instanceof MapType)) {
            args.push(new MapType(arg.serialize()));
        } else {
            args.push(arg);
        }
    };
    var List = Map.extend({ Map: Map }, {
            setup: function (instances, options) {
                this.length = 0;
                CID(this, '.map');
                this._setupComputedProperties();
                instances = instances || [];
                var teardownMapping;
                if (isPromise(instances)) {
                    this.replace(instances);
                } else {
                    teardownMapping = instances.length && mapHelpers.addToMap(instances, this);
                    this.push.apply(this, makeArray(instances || []));
                }
                if (teardownMapping) {
                    teardownMapping();
                }
                assign(this, options);
            },
            _triggerChange: function (attr, how, newVal, oldVal) {
                Map.prototype._triggerChange.apply(this, arguments);
                var index = +attr;
                if (!~('' + attr).indexOf('.') && !isNaN(index)) {
                    if (how === 'add') {
                        canEvent.dispatch.call(this, how, [
                            newVal,
                            index
                        ]);
                        canEvent.dispatch.call(this, 'length', [this.length]);
                    } else if (how === 'remove') {
                        canEvent.dispatch.call(this, how, [
                            oldVal,
                            index
                        ]);
                        canEvent.dispatch.call(this, 'length', [this.length]);
                    } else {
                        canEvent.dispatch.call(this, how, [
                            newVal,
                            index
                        ]);
                    }
                }
            },
            ___get: function (attr) {
                if (attr) {
                    var computedAttr = this._computedAttrs[attr];
                    if (computedAttr && computedAttr.compute) {
                        return computedAttr.compute();
                    }
                    if (this[attr] && this[attr].isComputed && typeof this.constructor.prototype[attr] === 'function') {
                        return this[attr]();
                    } else {
                        return this[attr];
                    }
                } else {
                    return this;
                }
            },
            __set: function (prop, value, current) {
                prop = isNaN(+prop) || prop % 1 ? prop : +prop;
                if (typeof prop === 'number') {
                    if (prop > this.length - 1) {
                        var newArr = new Array(prop + 1 - this.length);
                        newArr[newArr.length - 1] = value;
                        this.push.apply(this, newArr);
                        return newArr;
                    } else {
                        this.splice(prop, 1, value);
                        return this;
                    }
                }
                return Map.prototype.__set.call(this, '' + prop, value, current);
            },
            ___set: function (attr, val) {
                this[attr] = val;
                if (+attr >= this.length) {
                    this.length = +attr + 1;
                }
            },
            __remove: function (prop, current) {
                if (isNaN(+prop)) {
                    delete this[prop];
                    this._triggerChange(prop, 'remove', undefined, current);
                } else {
                    this.splice(prop, 1);
                }
            },
            _each: function (callback) {
                var data = this.___get();
                for (var i = 0; i < data.length; i++) {
                    callback(data[i], i);
                }
            },
            serialize: function () {
                return mapHelpers.serialize(this, 'serialize', []);
            },
            splice: function (index, howMany) {
                var args = makeArray(arguments), added = [], i, len, listIndex, allSame = args.length > 2;
                index = index || 0;
                for (i = 0, len = args.length - 2; i < len; i++) {
                    listIndex = i + 2;
                    args[listIndex] = this.__type(args[listIndex], listIndex);
                    added.push(args[listIndex]);
                    if (this[i + index] !== args[listIndex]) {
                        allSame = false;
                    }
                }
                if (allSame && this.length <= added.length) {
                    return added;
                }
                if (howMany === undefined) {
                    howMany = args[1] = this.length - index;
                }
                var removed = splice.apply(this, args);
                if (!spliceRemovesProps) {
                    for (i = this.length; i < removed.length + this.length; i++) {
                        delete this[i];
                    }
                }
                canBatch.start();
                if (howMany > 0) {
                    bubble.removeMany(this, removed);
                    this._triggerChange('' + index, 'remove', undefined, removed);
                }
                if (args.length > 2) {
                    bubble.addMany(this, added);
                    this._triggerChange('' + index, 'add', added, removed);
                }
                canBatch.stop();
                return removed;
            },
            _getAttrs: function () {
                return mapHelpers.serialize(this, 'attr', []);
            },
            _setAttrs: function (items, remove) {
                items = makeArray(items);
                canBatch.start();
                this._updateAttrs(items, remove);
                canBatch.stop();
            },
            _updateAttrs: function (items, remove) {
                var len = Math.min(items.length, this.length);
                for (var prop = 0; prop < len; prop++) {
                    var curVal = this[prop], newVal = items[prop];
                    if (types.isMapLike(curVal) && mapHelpers.canMakeObserve(newVal)) {
                        curVal.attr(newVal, remove);
                    } else if (curVal !== newVal) {
                        this._set(prop + '', newVal);
                    } else {
                    }
                }
                if (items.length > this.length) {
                    this.push.apply(this, items.slice(this.length));
                } else if (items.length < this.length && remove) {
                    this.splice(items.length);
                }
            }
        }), getArgs = function (args) {
            return args[0] && Array.isArray(args[0]) ? args[0] : makeArray(args);
        };
    each({
        push: 'length',
        unshift: 0
    }, function (where, name) {
        var orig = [][name];
        List.prototype[name] = function () {
            var args = [], len = where ? this.length : 0, i = arguments.length, res, val;
            while (i--) {
                val = arguments[i];
                args[i] = bubble.set(this, i, this.__type(val, i));
            }
            res = orig.apply(this, args);
            if (!this.comparator || args.length) {
                this._triggerChange('' + len, 'add', args, undefined);
            }
            return res;
        };
    });
    each({
        pop: 'length',
        shift: 0
    }, function (where, name) {
        List.prototype[name] = function () {
            if (!this.length) {
                return undefined;
            }
            var args = getArgs(arguments), len = where && this.length ? this.length - 1 : 0;
            var res = [][name].apply(this, args);
            this._triggerChange('' + len, 'remove', undefined, [res]);
            if (res && res.removeEventListener) {
                bubble.remove(this, res);
            }
            return res;
        };
    });
    assign(List.prototype, {
        indexOf: function (item, fromIndex) {
            Observation.add(this, 'length');
            for (var i = fromIndex || 0, len = this.length; i < len; i++) {
                if (this.attr(i) === item) {
                    return i;
                }
            }
            return -1;
        },
        join: function () {
            Observation.add(this, 'length');
            return [].join.apply(this, arguments);
        },
        reverse: function () {
            var list = [].reverse.call(makeArray(this));
            return this.replace(list);
        },
        slice: function () {
            Observation.add(this, 'length');
            var temp = Array.prototype.slice.apply(this, arguments);
            return new this.constructor(temp);
        },
        concat: function () {
            var args = [], MapType = this.constructor.Map;
            each(arguments, function (arg) {
                if (types.isListLike(arg) || Array.isArray(arg)) {
                    var arr = types.isListLike(arg) ? makeArray(arg) : arg;
                    each(arr, function (innerArg) {
                        serializeNonTypes(MapType, innerArg, args);
                    });
                } else {
                    serializeNonTypes(MapType, arg, args);
                }
            });
            return new this.constructor(Array.prototype.concat.apply(makeArray(this), args));
        },
        forEach: function (cb, thisarg) {
            var item;
            for (var i = 0, len = this.attr('length'); i < len; i++) {
                item = this.attr(i);
                if (item !== undefined && cb.call(thisarg || item, item, i, this) === false) {
                    break;
                }
            }
            return this;
        },
        replace: function (newList) {
            if (isPromise(newList)) {
                if (this._promise) {
                    this._promise.__isCurrentPromise = false;
                }
                var promise = this._promise = newList;
                promise.__isCurrentPromise = true;
                var self = this;
                newList.then(function (newList) {
                    if (promise.__isCurrentPromise) {
                        self.replace(newList);
                    }
                });
            } else {
                this.splice.apply(this, [
                    0,
                    this.length
                ].concat(makeArray(newList || [])));
            }
            return this;
        },
        filter: function (callback, thisArg) {
            var filteredList = new this.constructor(), self = this, filtered;
            this.each(function (item, index, list) {
                filtered = callback.call(thisArg | self, item, index, self);
                if (filtered) {
                    filteredList.push(item);
                }
            });
            return filteredList;
        },
        map: function (callback, thisArg) {
            var filteredList = new List(), self = this;
            this.each(function (item, index, list) {
                var mapped = callback.call(thisArg | self, item, index, self);
                filteredList.push(mapped);
            });
            return filteredList;
        }
    });
    var oldIsListLike = types.isListLike;
    types.isListLike = function (obj) {
        return obj instanceof List || oldIsListLike.apply(this, arguments);
    };
    var oldType = Map.prototype.__type;
    Map.prototype.__type = function (value, prop) {
        if (typeof value === 'object' && Array.isArray(value)) {
            var cached = mapHelpers.getMapFromObject(value);
            if (cached) {
                return cached;
            }
            return new List(value);
        }
        return oldType.apply(this, arguments);
    };
    var oldSetup = Map.setup;
    Map.setup = function () {
        oldSetup.apply(this, arguments);
        if (!(this.prototype instanceof List)) {
            this.List = Map.List.extend({ Map: this }, {});
        }
    };
    if (!types.DefaultList) {
        types.DefaultList = List;
    }
    List.prototype.each = List.prototype.forEach;
    Map.List = List;
    module.exports = namespace.List = List;
});
/*can-map-backup@3.0.2#can-map-backup*/
define('can-map-backup', function (require, exports, module) {
    var compute = require('can-compute');
    var CanMap = require('can-map');
    var compare = require('can-set/src/compare');
    var assign = require('can-util/js/assign/assign');
    var flatProps = function (a, cur) {
        var obj = {};
        for (var prop in a) {
            if (typeof a[prop] !== 'object' || a[prop] === null || a[prop] instanceof Date) {
                obj[prop] = a[prop];
            } else {
                obj[prop] = cur.attr(prop);
            }
        }
        return obj;
    };
    var oldSetup = CanMap.prototype.setup;
    assign(CanMap.prototype, {
        setup: function () {
            this._backupStore = compute();
            return oldSetup.apply(this, arguments);
        },
        backup: function () {
            this._backupStore(this.attr());
            return this;
        },
        isDirty: function (checkAssociations) {
            var backupStore = this._backupStore();
            if (!backupStore) {
                return false;
            }
            var currentValue = this.attr();
            var aParent, bParent, parentProp;
            var compares = {};
            var options = { deep: !!checkAssociations };
            return !compare.equal(currentValue, backupStore, aParent, bParent, parentProp, compares, options);
        },
        restore: function (restoreAssociations) {
            var props = restoreAssociations ? this._backupStore() : flatProps(this._backupStore(), this);
            if (this.isDirty(restoreAssociations)) {
                this.attr(props, true);
            }
            return this;
        }
    });
    module.exports = exports = CanMap;
});
/*can-map-define@3.0.3#can-map-define*/
define('can-map-define', function (require, exports, module) {
    var dev = require('can-util/js/dev/dev');
    var extend = require('can-util/js/assign/assign');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var canEvent = require('can-event');
    var batch = require('can-event/batch/batch');
    var mapHelpers = require('can-map/map-helpers');
    var CanMap = require('can-map');
    var compute = require('can-compute');
    var define = {};
    var getPropDefineBehavior = function (behavior, attr, define) {
        var prop, defaultProp;
        if (define) {
            prop = define[attr];
            defaultProp = define['*'];
            if (prop && prop[behavior] !== undefined) {
                return prop[behavior];
            } else if (defaultProp && defaultProp[behavior] !== undefined) {
                return defaultProp[behavior];
            }
        }
    };
    mapHelpers.define = function (Map, baseDefine) {
        var definitions = Map.prototype.define;
        if (baseDefine) {
            var defines = extend({}, baseDefine);
            mapHelpers.twoLevelDeepExtend(defines, definitions);
            extend(definitions, defines);
        }
        if (Map.define) {
            dev.warn('The define property should be on the map\'s prototype properties, ' + 'not the static properties.');
        }
        Map.defaultGenerators = {};
        for (var prop in definitions) {
            var type = definitions[prop].type;
            if (typeof type === 'string') {
                if (typeof define.types[type] === 'object') {
                    delete definitions[prop].type;
                    extend(definitions[prop], define.types[type]);
                }
            }
            if ('value' in definitions[prop]) {
                if (typeof definitions[prop].value === 'function') {
                    Map.defaultGenerators[prop] = definitions[prop].value;
                } else {
                    Map.defaults[prop] = definitions[prop].value;
                }
            }
            if (typeof definitions[prop].Value === 'function') {
                (function (Constructor) {
                    Map.defaultGenerators[prop] = function () {
                        return new Constructor();
                    };
                }(definitions[prop].Value));
            }
        }
    };
    var oldSetupDefaults = CanMap.prototype._setupDefaults;
    CanMap.prototype._setupDefaults = function (obj) {
        var defaults = oldSetupDefaults.call(this), propsCommittedToAttr = {}, Map = this.constructor, originalGet = this._get;
        this._get = function (originalProp) {
            var prop = originalProp.indexOf('.') !== -1 ? originalProp.substr(0, originalProp.indexOf('.')) : originalProp;
            if (prop in defaults && !(prop in propsCommittedToAttr)) {
                this.attr(prop, defaults[prop]);
                propsCommittedToAttr[prop] = true;
            }
            return originalGet.apply(this, arguments);
        };
        for (var prop in Map.defaultGenerators) {
            if (!obj || !(prop in obj)) {
                defaults[prop] = Map.defaultGenerators[prop].call(this);
            }
        }
        delete this._get;
        return defaults;
    };
    var proto = CanMap.prototype, oldSet = proto.__set;
    proto.__set = function (prop, value, current, success, error) {
        var asyncTimer;
        var self = this;
        var errorCallback = function (errors) {
                clearTimeout(asyncTimer);
                var stub = error && error.call(self, errors);
                if (stub !== false) {
                    canEvent.trigger(self, 'error', [
                        prop,
                        errors
                    ], true);
                }
                return false;
            }, setter = getPropDefineBehavior('set', prop, this.define), getter = getPropDefineBehavior('get', prop, this.define);
        if (setter) {
            batch.start();
            var setterCalled = false, setValue = setter.call(this, value, function (value) {
                    if (getter) {
                        self[prop](value);
                    } else {
                        oldSet.call(self, prop, value, current, success, errorCallback);
                    }
                    setterCalled = true;
                    clearTimeout(asyncTimer);
                }, errorCallback, getter ? this._computedAttrs[prop].compute.computeInstance.lastSetValue.get() : current);
            if (getter) {
                if (setValue !== undefined && !setterCalled && setter.length >= 1) {
                    this._computedAttrs[prop].compute(setValue);
                }
                batch.stop();
                return;
            } else if (setValue === undefined && !setterCalled && setter.length > 1) {
                asyncTimer = setTimeout(function () {
                    dev.warn('can/map/define: Setter "' + prop + '" did not return a value or call the setter callback.');
                }, dev.warnTimeout);
                batch.stop();
                return;
            } else {
                if (!setterCalled) {
                    oldSet.call(self, prop, setter.length === 0 && setValue === undefined ? value : setValue, current, success, errorCallback);
                }
                batch.stop();
                return this;
            }
        } else {
            oldSet.call(self, prop, value, current, success, errorCallback);
        }
        return this;
    };
    define.types = {
        'date': function (str) {
            var type = typeof str;
            if (type === 'string') {
                str = Date.parse(str);
                return isNaN(str) ? null : new Date(str);
            } else if (type === 'number') {
                return new Date(str);
            } else {
                return str;
            }
        },
        'number': function (val) {
            if (val == null) {
                return val;
            }
            return +val;
        },
        'boolean': function (val) {
            if (val == null) {
                return val;
            }
            if (val === 'false' || val === '0' || !val) {
                return false;
            }
            return true;
        },
        'htmlbool': function (val) {
            return typeof val === 'string' || !!val;
        },
        '*': function (val) {
            return val;
        },
        'string': function (val) {
            if (val == null) {
                return val;
            }
            return '' + val;
        },
        'compute': {
            set: function (newValue, setVal, setErr, oldValue) {
                if (newValue && newValue.isComputed) {
                    return newValue;
                }
                if (oldValue && oldValue.isComputed) {
                    oldValue(newValue);
                    return oldValue;
                }
                return newValue;
            },
            get: function (value) {
                return value && value.isComputed ? value() : value;
            }
        }
    };
    var oldType = proto.__type;
    proto.__type = function (value, prop) {
        var type = getPropDefineBehavior('type', prop, this.define), Type = getPropDefineBehavior('Type', prop, this.define), newValue = value;
        if (typeof type === 'string') {
            type = define.types[type];
        }
        if (type || Type) {
            if (type) {
                newValue = type.call(this, newValue, prop);
            }
            if (Type && newValue != null && !(newValue instanceof Type)) {
                newValue = new Type(newValue);
            }
            return newValue;
        } else if (isPlainObject(newValue) && newValue.define) {
            newValue = CanMap.extend(newValue);
            newValue = new newValue();
        }
        return oldType.call(this, newValue, prop);
    };
    var oldRemove = proto.__remove;
    proto.__remove = function (prop, current) {
        var remove = getPropDefineBehavior('remove', prop, this.define), res;
        if (remove) {
            batch.start();
            res = remove.call(this, current);
            if (res === false) {
                batch.stop();
                return;
            } else {
                res = oldRemove.call(this, prop, current);
                batch.stop();
                return res;
            }
        }
        return oldRemove.call(this, prop, current);
    };
    var oldSetupComputes = proto._setupComputedProperties;
    proto._setupComputedProperties = function () {
        oldSetupComputes.apply(this, arguments);
        for (var attr in this.define) {
            var def = this.define[attr], get = def.get;
            if (get) {
                mapHelpers.addComputedAttr(this, attr, compute.async(undefined, get, this));
            }
        }
    };
    var oldSingleSerialize = proto.___serialize;
    var serializeProp = function (map, attr, val) {
        var serializer = attr === '*' ? false : getPropDefineBehavior('serialize', attr, map.define);
        if (serializer === undefined) {
            return oldSingleSerialize.call(map, attr, val);
        } else if (serializer !== false) {
            return typeof serializer === 'function' ? serializer.call(map, val, attr) : oldSingleSerialize.call(map, attr, val);
        }
    };
    proto.___serialize = function (name, val) {
        return serializeProp(this, name, val);
    };
    var oldSerialize = proto.serialize;
    proto.serialize = function (property) {
        var serialized = oldSerialize.apply(this, arguments);
        if (property) {
            return serialized;
        }
        var serializer, val;
        for (var attr in this.define) {
            if (!(attr in serialized)) {
                serializer = this.define && (this.define[attr] && this.define[attr].serialize || this.define['*'] && this.define['*'].serialize);
                if (serializer) {
                    val = serializeProp(this, attr, this.attr(attr));
                    if (val !== undefined) {
                        serialized[attr] = val;
                    }
                }
            }
        }
        return serialized;
    };
    module.exports = define;
});
/*can-connect@1.2.0#can/model/model*/
define('can-connect/can/model/model', function (require, exports, module) {
    var $ = require('jquery'), connect = require('can-connect'), persist = require('can-connect/data/url/url'), constructor = require('can-connect/constructor/constructor'), instanceStore = require('can-connect/constructor/store/store'), parseData = require('can-connect/data/parse/parse'), CanMap = require('can-map'), CanList = require('can-list'), Observation = require('can-observation'), canEvent = require('can-event'), ns = require('can-namespace');
    var each = require('can-util/js/each/each');
    var dev = require('can-util/js/dev/dev');
    var makeArray = require('can-util/js/make-array/make-array');
    var types = require('can-types');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var callCanReadingOnIdRead = true;
    var getBaseValue = function (prop) {
        if (typeof prop === 'function' && 'base' in prop) {
            return prop.base;
        } else {
            return prop;
        }
    };
    var resolveSingleExport = function (originalPromise) {
        var promise = originalPromise.then(function (first) {
            return first;
        });
        promise.abort = function () {
            originalPromise.abort();
        };
        return promise;
    };
    var mapBehavior = connect.behavior(function (baseConnection) {
        var behavior = {
            id: function (inst) {
                var idProp = inst.constructor.id || 'id';
                if (inst instanceof CanMap) {
                    if (callCanReadingOnIdRead) {
                        Observation.add(inst, idProp);
                    }
                    return inst.__get(idProp);
                } else {
                    if (callCanReadingOnIdRead) {
                        return inst[idProp];
                    } else {
                        return Observation.ignore(function () {
                            return inst[idProp];
                        });
                    }
                }
            },
            listSet: function () {
                return undefined;
            },
            idProp: baseConnection.constructor.id || 'id',
            serializeInstance: function (instance) {
                return instance.serialize();
            },
            findAll: function (params, success, error) {
                var promise = resolveSingleExport(baseConnection.getList.call(this, params));
                promise.then(success, error);
                return promise;
            },
            findOne: function (params, success, error) {
                var promise = resolveSingleExport(baseConnection.get.call(this, params));
                promise.then(success, error);
                return promise;
            },
            parseInstanceData: function (props) {
                if (typeof this.parseModel === 'function') {
                    return this.parseModel.apply(this.constructor, arguments);
                } else {
                    return baseConnection.parseInstanceData.apply(baseConnection, arguments);
                }
            },
            parseListData: function (props) {
                if (typeof this.parseModels === 'function') {
                    return this.parseModels.apply(this.constructor, arguments);
                } else {
                    return baseConnection.parseListData.apply(baseConnection, arguments);
                }
            }
        };
        each([
            'created',
            'updated',
            'destroyed'
        ], function (funcName) {
            behavior[funcName + 'Instance'] = function (instance, attrs) {
                var constructor = instance.constructor;
                if (attrs && typeof attrs === 'object') {
                    instance.attr(typeof attrs.attr === 'function' ? attrs.attr() : attrs, this.constructor.removeAttr || false);
                }
                canEvent.dispatch.call(instance, {
                    type: funcName,
                    target: instance
                });
                dev.log('Model.js - ' + constructor.shortName + ' ' + funcName);
                canEvent.dispatch.call(constructor, funcName, [instance]);
            };
        });
        return behavior;
    });
    var CanModel = CanMap.extend({
        setup: function (base, fullName, staticProps, protoProps) {
            if (typeof fullName !== 'string') {
                protoProps = staticProps;
                staticProps = fullName;
            }
            if (!protoProps) {
                dev.warn('can/model/model.js: CanModel extended without static properties.');
                protoProps = staticProps;
            }
            this.store = {};
            CanMap.setup.apply(this, arguments);
            if (!CanModel) {
                return;
            }
            if (staticProps && staticProps.List) {
                this.List = staticProps.List;
                this.List.Map = this;
            } else {
                this.List = base.List.extend({ Map: this }, {});
            }
            var self = this;
            var staticMethods = [
                'findAll',
                'findOne',
                'create',
                'update',
                'destroy'
            ];
            var parseMethods = {
                parseModel: 'parseInstanceData',
                parseModels: 'parseListData'
            };
            var connectionOptions = {
                url: {
                    getListData: getBaseValue(this.findAll),
                    getData: getBaseValue(this.findOne),
                    createData: getBaseValue(this.create),
                    updateData: getBaseValue(this.update),
                    destroyData: getBaseValue(this.destroy),
                    resource: this.resource
                },
                idProp: this.id,
                parseInstanceProp: typeof getBaseValue(this.parseModel) === 'string' ? getBaseValue(this.parseModel) : undefined,
                parseListProp: typeof getBaseValue(this.parseModels) === 'string' ? getBaseValue(this.parseModels) : undefined,
                instance: function (values) {
                    return new self(values);
                },
                list: function (listData) {
                    var list = new self.List(listData.data);
                    each(listData, function (val, prop) {
                        if (prop !== 'data') {
                            list.attr(prop, val);
                        }
                    });
                    return list;
                },
                constructor: this,
                parseModel: getBaseValue(this.parseModel),
                parseModels: getBaseValue(this.parseModels),
                ajax: function () {
                    var promiseLike = $.ajax.apply($, arguments);
                    return new Promise(function (resolve, reject) {
                        promiseLike.then(resolve, reject);
                    });
                }
            };
            this.connection = mapBehavior(instanceStore(constructor(parseData(persist(connectionOptions)))));
            this.store = this.connection.instanceStore;
            each(staticMethods, function (name) {
                if (self.connection[name]) {
                    var fn = self.connection[name].bind(self.connection);
                    fn.base = self[name];
                    CanMap._overwrite(self, base, name, fn);
                }
            });
            each(parseMethods, function (connectionName, name) {
                var fn = self.connection[connectionName].bind(self.connection);
                fn.base = self[name];
                CanMap._overwrite(self, base, name, fn);
            });
        },
        models: function (raw, oldList) {
            var args = makeArray(arguments);
            args[0] = this.connection.parseListData.apply(this.connection, arguments);
            var list = this.connection.hydrateList.apply(this.connection, args);
            if (oldList instanceof CanList) {
                return oldList.replace(list);
            } else {
                return list;
            }
        },
        model: function (raw) {
            var args = makeArray(arguments);
            args[0] = this.connection.parseInstanceData.apply(this.connection, arguments);
            var instance = this.connection.hydrateInstance.apply(this.connection, arguments);
            return instance;
        }
    }, {
        isNew: function () {
            var id = this.constructor.connection.id(this);
            return !(id || id === 0);
        },
        save: function (success, error) {
            var promise = resolveSingleExport(this.constructor.connection.save(this));
            promise.then(success, error);
            return promise;
        },
        destroy: function (success, error) {
            var promise;
            if (this.isNew()) {
                promise = Promise.resolve(this);
                this.constructor.connection.destroyedInstance(this, {});
            } else {
                promise = this.constructor.connection.destroy(this);
            }
            promise.then(success, error);
            return promise;
        },
        _eventSetup: function () {
            callCanReadingOnIdRead = false;
            this.constructor.connection.addInstanceReference(this);
            callCanReadingOnIdRead = true;
            return CanMap.prototype._eventSetup.apply(this, arguments);
        },
        _eventTeardown: function () {
            callCanReadingOnIdRead = false;
            this.constructor.connection.deleteInstanceReference(this);
            callCanReadingOnIdRead = true;
            return CanMap.prototype._eventTeardown.apply(this, arguments);
        },
        ___set: function (prop, val) {
            CanMap.prototype.___set.call(this, prop, val);
            if (prop === (this.constructor.id || 'id') && this._bindings) {
                this.constructor.connection.addInstanceReference(this);
            }
        }
    });
    CanModel.List = CanList.extend({
        _bubbleRule: function (eventName, list) {
            var bubbleRules = CanList._bubbleRule(eventName, list);
            bubbleRules.push('destroyed');
            return bubbleRules;
        }
    }, {
        setup: function (params) {
            if (isPlainObject(params) && !Array.isArray(params)) {
                CanList.prototype.setup.apply(this);
                this.replace(types.isPromise(params) ? params : this.constructor.Map.findAll(params));
            } else {
                CanList.prototype.setup.apply(this, arguments);
            }
            this._init = 1;
            this.bind('destroyed', this._destroyed.bind(this));
            delete this._init;
        },
        _destroyed: function (ev, attr) {
            if (/\w+/.test(attr)) {
                var index;
                while ((index = this.indexOf(ev.target)) > -1) {
                    this.splice(index, 1);
                }
            }
        }
    });
    if (!ns.Model) {
        ns.Model = CanModel;
    }
    module.exports = CanModel;
});
/*can-legacy-view-helpers@0.5.0#src/view*/
define('can-legacy-view-helpers/src/view', function (require, exports, module) {
    var isFunction = require('can-util/js/is-function/is-function'), makeArray = require('can-util/js/make-array/make-array'), deepAssign = require('can-util/js/deep-assign/deep-assign'), canFrag = require('can-util/dom/frag/frag'), each = require('can-util/js/each/each'), hookupId = 1;
    var $view = function (view, data, helpers, callback) {
        if (isFunction(helpers)) {
            callback = helpers;
            helpers = undefined;
        }
        return $view.renderAs('fragment', view, data, helpers, callback);
    };
    deepAssign($view, {
        frag: function (result, parentNode) {
            return $view.hookup($view.fragment(result), parentNode);
        },
        fragment: function (result) {
            return canFrag(result, document);
        },
        toId: function (src) {
            return src.toString().split(/\/|\./g).map(function (part) {
                if (part) {
                    return part;
                }
            }).join('_');
        },
        toStr: function (txt) {
            return txt == null ? '' : '' + txt;
        },
        hookup: function (fragment, parentNode) {
            var hookupEls = [], id, func;
            each(fragment.childNodes ? makeArray(fragment.childNodes) : fragment, function (node) {
                if (node.nodeType === 1) {
                    hookupEls.push(node);
                    hookupEls.push.apply(hookupEls, makeArray(node.getElementsByTagName('*')));
                }
            });
            each(hookupEls, function (el) {
                if (el.getAttribute && (id = el.getAttribute('data-view-id')) && (func = $view.hookups[id])) {
                    func(el, parentNode, id);
                    delete $view.hookups[id];
                    el.removeAttribute('data-view-id');
                }
            });
            return fragment;
        },
        hookups: {},
        hook: function (cb) {
            $view.hookups[++hookupId] = cb;
            return ' data-view-id=\'' + hookupId + '\'';
        },
        cached: {},
        cachedRenderers: {},
        simpleHelper: function (fn) {
            return function () {
                var realArgs = [];
                var fnArgs = arguments;
                each(fnArgs, function (val, i) {
                    if (i <= fnArgs.length) {
                        while (val && val.isComputed) {
                            val = val();
                        }
                        realArgs.push(val);
                    }
                });
                return fn.apply(this, realArgs);
            };
        }
    });
    module.exports = $view;
});
/*can-legacy-view-helpers@0.5.0#src/node_list*/
define('can-legacy-view-helpers/src/node_list', function (require, exports, module) {
    var makeArray = require('can-util/js/make-array/make-array');
    var CID = require('can-util/js/cid/cid');
    var each = require('can-util/js/each/each');
    var domMutate = require('can-util/dom/mutate/mutate');
    var canExpando = true, readId, nodeLists;
    try {
        document.createTextNode('')._ = 0;
    } catch (ex) {
        canExpando = false;
    }
    var nodeMap = {}, textNodeMap = {}, expando = 'ejs_' + Math.random(), _id = 0, id = function (node, localMap) {
            var _textNodeMap = localMap || textNodeMap;
            var id = readId(node, _textNodeMap);
            if (id) {
                return id;
            } else {
                if (canExpando || node.nodeType !== 3) {
                    ++_id;
                    return node[expando] = (node.nodeName ? 'element_' : 'obj_') + _id;
                } else {
                    ++_id;
                    _textNodeMap['text_' + _id] = node;
                    return 'text_' + _id;
                }
            }
        };
    readId = function (node, textNodeMap) {
        if (canExpando || node.nodeType !== 3) {
            return node[expando];
        } else {
            for (var textNodeID in textNodeMap) {
                if (textNodeMap[textNodeID] === node) {
                    return textNodeID;
                }
            }
        }
    };
    var splice = [].splice, push = [].push, itemsInChildListTree = function (list) {
            var count = 0;
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];
                if (item.nodeType) {
                    count++;
                } else {
                    count += itemsInChildListTree(item);
                }
            }
            return count;
        }, replacementMap = function (replacements, idMap) {
            var map = {};
            for (var i = 0, len = replacements.length; i < len; i++) {
                var node = nodeLists.first(replacements[i]);
                map[id(node, idMap)] = replacements[i];
            }
            return map;
        }, addUnfoundAsDeepChildren = function (list, rMap, foundIds) {
            for (var repId in rMap) {
                if (!foundIds[repId]) {
                    list.newDeepChildren.push(rMap[repId]);
                }
            }
        };
    nodeLists = {
        id: id,
        update: function (nodeList, newNodes) {
            var oldNodes = nodeLists.unregisterChildren(nodeList);
            newNodes = makeArray(newNodes);
            var oldListLength = nodeList.length;
            splice.apply(nodeList, [
                0,
                oldListLength
            ].concat(newNodes));
            if (nodeList.replacements) {
                nodeLists.nestReplacements(nodeList);
                nodeList.deepChildren = nodeList.newDeepChildren;
                nodeList.newDeepChildren = [];
            } else {
                nodeLists.nestList(nodeList);
            }
            return oldNodes;
        },
        nestReplacements: function (list) {
            var index = 0, idMap = {}, rMap = replacementMap(list.replacements, idMap), rCount = list.replacements.length, foundIds = {};
            while (index < list.length && rCount) {
                var node = list[index], nodeId = readId(node, idMap), replacement = rMap[nodeId];
                if (replacement) {
                    list.splice(index, itemsInChildListTree(replacement), replacement);
                    foundIds[nodeId] = true;
                    rCount--;
                }
                index++;
            }
            if (rCount) {
                addUnfoundAsDeepChildren(list, rMap, foundIds);
            }
            list.replacements = [];
        },
        nestList: function (list) {
            var index = 0;
            while (index < list.length) {
                var node = list[index], childNodeList = nodeMap[id(node)];
                if (childNodeList) {
                    if (childNodeList !== list) {
                        list.splice(index, itemsInChildListTree(childNodeList), childNodeList);
                    }
                } else {
                    nodeMap[id(node)] = list;
                }
                index++;
            }
        },
        last: function (nodeList) {
            var last = nodeList[nodeList.length - 1];
            if (last.nodeType) {
                return last;
            } else {
                return nodeLists.last(last);
            }
        },
        first: function (nodeList) {
            var first = nodeList[0];
            if (first.nodeType) {
                return first;
            } else {
                return nodeLists.first(first);
            }
        },
        flatten: function (nodeList) {
            var items = [];
            for (var i = 0; i < nodeList.length; i++) {
                var item = nodeList[i];
                if (item.nodeType) {
                    items.push(item);
                } else {
                    items.push.apply(items, nodeLists.flatten(item));
                }
            }
            return items;
        },
        register: function (nodeList, unregistered, parent, directlyNested) {
            CID(nodeList);
            nodeList.unregistered = unregistered;
            nodeList.parentList = parent;
            nodeList.nesting = parent && typeof parent.nesting !== 'undefined' ? parent.nesting + 1 : 0;
            if (parent) {
                nodeList.deepChildren = [];
                nodeList.newDeepChildren = [];
                nodeList.replacements = [];
                if (parent !== true) {
                    if (directlyNested) {
                        parent.replacements.push(nodeList);
                    } else {
                        parent.newDeepChildren.push(nodeList);
                    }
                }
            } else {
                nodeLists.nestList(nodeList);
            }
            return nodeList;
        },
        unregisterChildren: function (nodeList) {
            var nodes = [];
            each(nodeList, function (node) {
                if (node.nodeType) {
                    if (!nodeList.replacements) {
                        delete nodeMap[id(node)];
                    }
                    nodes.push(node);
                } else {
                    push.apply(nodes, nodeLists.unregister(node, true));
                }
            });
            each(nodeList.deepChildren, function (nodeList) {
                nodeLists.unregister(nodeList, true);
            });
            return nodes;
        },
        unregister: function (nodeList, isChild) {
            var nodes = nodeLists.unregisterChildren(nodeList, true);
            if (nodeList.unregistered) {
                var unregisteredCallback = nodeList.unregistered;
                nodeList.replacements = nodeList.unregistered = null;
                if (!isChild) {
                    var deepChildren = nodeList.parentList && nodeList.parentList.deepChildren;
                    if (deepChildren) {
                        var index = deepChildren.indexOf(nodeList);
                        if (index !== -1) {
                            deepChildren.splice(index, 1);
                        }
                    }
                }
                unregisteredCallback();
            }
            return nodes;
        },
        nodeMap: nodeMap,
        after: function (oldElements, newFrag) {
            var last = oldElements[oldElements.length - 1];
            if (last.nextSibling) {
                domMutate.insertBefore.call(last.parentNode, newFrag, last.nextSibling);
            } else {
                domMutate.appendChild.call(last.parentNode, newFrag);
            }
        },
        replace: function (oldElements, newFrag) {
            var selectedValue, parentNode = oldElements[0].parentNode;
            if (parentNode.nodeName.toUpperCase() === 'SELECT' && parentNode.selectedIndex >= 0) {
                selectedValue = parentNode.value;
            }
            if (oldElements.length === 1) {
                domMutate.replaceChild.call(parentNode, newFrag, oldElements[0]);
            } else {
                nodeLists.after(oldElements, newFrag);
                nodeLists.remove(oldElements);
            }
            if (selectedValue !== undefined) {
                parentNode.value = selectedValue;
            }
        },
        remove: function (elementsToBeRemoved) {
            var parent = elementsToBeRemoved[0] && elementsToBeRemoved[0].parentNode;
            each(elementsToBeRemoved, function (child) {
                domMutate.removeChild.call(parent, child);
            });
        }
    };
    module.exports = nodeLists;
});
/*can-legacy-view-helpers@0.5.0#src/elements*/
define('can-legacy-view-helpers/src/elements', function (require, exports, module) {
    var nodeLists = require('can-legacy-view-helpers/src/node_list');
    var doc = typeof document !== 'undefined' ? document : null;
    var elements = {
        tagToContentPropMap: {
            option: doc && 'textContent' in document.createElement('option') ? 'textContent' : 'innerText',
            textarea: 'value'
        },
        tagMap: {
            '': 'span',
            colgroup: 'col',
            table: 'tbody',
            tr: 'td',
            ol: 'li',
            ul: 'li',
            tbody: 'tr',
            thead: 'tr',
            tfoot: 'tr',
            select: 'option',
            optgroup: 'option'
        },
        reverseTagMap: {
            col: 'colgroup',
            tr: 'tbody',
            option: 'select',
            td: 'tr',
            th: 'tr',
            li: 'ul'
        },
        selfClosingTags: { col: true },
        getParentNode: function (el, defaultParentNode) {
            return defaultParentNode && el.parentNode.nodeType === 11 ? defaultParentNode : el.parentNode;
        },
        contentText: function (text) {
            if (typeof text === 'string') {
                return text;
            }
            if (!text && text !== 0) {
                return '';
            }
            return '' + text;
        },
        after: nodeLists.after,
        replace: nodeLists.replace
    };
    module.exports = elements;
});
/*can-legacy-view-helpers@0.5.0#src/live*/
define('can-legacy-view-helpers/src/live', function (require, exports, module) {
    var elements = require('can-legacy-view-helpers/src/elements');
    var nodeLists = require('can-legacy-view-helpers/src/node_list');
    var parser = require('can-view-parser');
    var diff = require('can-util/js/diff/diff');
    var view = require('can-legacy-view-helpers/src/view');
    var domEvent = require('can-util/dom/events/events');
    var canFrag = require('can-util/dom/frag/frag');
    var makeArray = require('can-util/js/make-array/make-array');
    var each = require('can-util/js/each/each');
    var canCompute = require('can-compute');
    var domAttr = require('can-util/dom/attr/attr');
    var domData = require('can-util/dom/data/data');
    var domMutate = require('can-util/dom/mutate/mutate');
    var canBatch = require('can-event/batch/batch');
    require('can-util/dom/events/removed/removed');
    var newLine = /(\r|\n)+/g;
    var getValue = function (val) {
        var regexp = /^["'].*["']$/;
        val = val.replace(elements.attrReg, '').replace(newLine, '');
        return regexp.test(val) ? val.substr(1, val.length - 2) : val;
    };
    var setup = function (el, bind, unbind) {
            var data;
            var tornDown = false, teardown = function () {
                    if (!tornDown) {
                        tornDown = true;
                        unbind(data);
                        domEvent.removeEventListener.call(el, 'removed', teardown);
                    }
                    return true;
                };
            data = {
                teardownCheck: function (parent) {
                    return parent ? false : teardown();
                }
            };
            domEvent.addEventListener.call(el, 'removed', teardown);
            bind(data);
            return data;
        }, getChildNodes = function (node) {
            var childNodes = node.childNodes;
            if ('length' in childNodes) {
                return childNodes;
            } else {
                var cur = node.firstChild;
                var nodes = [];
                while (cur) {
                    nodes.push(cur);
                    cur = cur.nextSibling;
                }
                return nodes;
            }
        }, listen = function (el, compute, change) {
            return setup(el, function () {
                compute.computeInstance.bind('change', change);
            }, function (data) {
                compute.computeInstance.unbind('change', change);
                if (data.nodeList) {
                    nodeLists.unregister(data.nodeList);
                }
            });
        }, getAttributeParts = function (newVal) {
            var attrs = {}, attr;
            parser.parseAttrs(newVal, {
                attrStart: function (name) {
                    attrs[name] = '';
                    attr = name;
                },
                attrValue: function (value) {
                    attrs[attr] += value;
                },
                attrEnd: function () {
                }
            });
            return attrs;
        }, splice = [].splice, isNode = function (obj) {
            return obj && obj.nodeType;
        }, addTextNodeIfNoChildren = function (frag) {
            if (!frag.firstChild) {
                frag.appendChild(frag.ownerDocument.createTextNode(''));
            }
        }, getLiveFragment = function (itemHTML) {
            var gotText = typeof itemHTML === 'string', itemFrag = canFrag(itemHTML);
            return gotText ? view.hookup(itemFrag) : itemFrag;
        }, renderAndAddToNodeLists = function (newNodeLists, parentNodeList, render, context, args) {
            var itemNodeList = [];
            if (parentNodeList) {
                nodeLists.register(itemNodeList, null, true, true);
                itemNodeList.parentList = parentNodeList;
                itemNodeList.expression = '#each SUBEXPRESSION';
            }
            var itemHTML = render.apply(context, args.concat([itemNodeList])), itemFrag = getLiveFragment(itemHTML);
            var childNodes = makeArray(getChildNodes(itemFrag));
            if (parentNodeList) {
                nodeLists.update(itemNodeList, childNodes);
                newNodeLists.push(itemNodeList);
            } else {
                newNodeLists.push(nodeLists.register(childNodes));
            }
            return itemFrag;
        }, removeFromNodeList = function (masterNodeList, index, length) {
            var removedMappings = masterNodeList.splice(index + 1, length), itemsToRemove = [];
            each(removedMappings, function (nodeList) {
                var nodesToRemove = nodeLists.unregister(nodeList);
                [].push.apply(itemsToRemove, nodesToRemove);
            });
            return itemsToRemove;
        }, addFalseyIfEmpty = function (list, falseyRender, masterNodeList, nodeList) {
            if (falseyRender && list.length === 0) {
                var falseyNodeLists = [];
                var falseyFrag = renderAndAddToNodeLists(falseyNodeLists, nodeList, falseyRender, list, [list]);
                elements.after([masterNodeList[0]], falseyFrag);
                masterNodeList.push(falseyNodeLists[0]);
            }
        }, childMutationCallbacks = {};
    var live = {
        registerChildMutationCallback: function (tag, callback) {
            if (callback) {
                childMutationCallbacks[tag] = callback;
            } else {
                return childMutationCallbacks[tag];
            }
        },
        callChildMutationCallback: function (el) {
            var callback = el && childMutationCallbacks[el.nodeName.toLowerCase()];
            if (callback) {
                callback(el);
            }
        },
        list: function (el, compute, render, context, parentNode, nodeList, falseyRender) {
            var remove, text, list, data;
            var masterNodeList = nodeList || [el], indexMap = [], afterPreviousEvents = false, isTornDown = false, add = function (ev, items, index) {
                    if (!afterPreviousEvents) {
                        return;
                    }
                    var frag = text.ownerDocument.createDocumentFragment(), newNodeLists = [], newIndicies = [];
                    each(items, function (item, key) {
                        var itemIndex = canCompute(key + index), itemFrag = renderAndAddToNodeLists(newNodeLists, nodeList, render, context, [
                                item,
                                itemIndex
                            ]);
                        frag.appendChild(itemFrag);
                        newIndicies.push(itemIndex);
                    });
                    var masterListIndex = index + 1;
                    if (!indexMap.length) {
                        var falseyItemsToRemove = removeFromNodeList(masterNodeList, 0, masterNodeList.length - 1);
                        nodeLists.remove(falseyItemsToRemove);
                    }
                    if (!masterNodeList[masterListIndex]) {
                        elements.after(masterListIndex === 1 ? [text] : [nodeLists.last(masterNodeList[masterListIndex - 1])], frag);
                    } else {
                        var el = nodeLists.first(masterNodeList[masterListIndex]);
                        domMutate.insertBefore.call(el.parentNode, frag, el);
                    }
                    splice.apply(masterNodeList, [
                        masterListIndex,
                        0
                    ].concat(newNodeLists));
                    splice.apply(indexMap, [
                        index,
                        0
                    ].concat(newIndicies));
                    for (var i = index + newIndicies.length, len = indexMap.length; i < len; i++) {
                        indexMap[i](i);
                    }
                    if (ev.callChildMutationCallback !== false) {
                        live.callChildMutationCallback(text.parentNode);
                    }
                }, set = function (ev, newVal, index) {
                    remove({}, { length: 1 }, index, true);
                    add({}, [newVal], index);
                };
            remove = function (ev, items, index, duringTeardown, fullTeardown) {
                if (!afterPreviousEvents) {
                    return;
                }
                if (!duringTeardown && data.teardownCheck(text.parentNode)) {
                    return;
                }
                if (index < 0) {
                    index = indexMap.length + index;
                }
                var itemsToRemove = removeFromNodeList(masterNodeList, index, items.length);
                indexMap.splice(index, items.length);
                for (var i = index, len = indexMap.length; i < len; i++) {
                    indexMap[i](i);
                }
                if (!fullTeardown) {
                    addFalseyIfEmpty(list, falseyRender, masterNodeList, nodeList);
                    nodeLists.remove(itemsToRemove);
                    if (ev.callChildMutationCallback !== false) {
                        live.callChildMutationCallback(text.parentNode);
                    }
                } else {
                    nodeLists.unregister(masterNodeList);
                }
            };
            var move = function (ev, item, newIndex, currentIndex) {
                if (!afterPreviousEvents) {
                    return;
                }
                newIndex = newIndex + 1;
                currentIndex = currentIndex + 1;
                var referenceNodeList = masterNodeList[newIndex];
                var movedElements = canFrag(nodeLists.flatten(masterNodeList[currentIndex]));
                var referenceElement;
                if (currentIndex < newIndex) {
                    referenceElement = nodeLists.last(referenceNodeList).nextSibling;
                } else {
                    referenceElement = nodeLists.first(referenceNodeList);
                }
                var parentNode = masterNodeList[0].parentNode;
                parentNode.insertBefore(movedElements, referenceElement);
                var temp = masterNodeList[currentIndex];
                [].splice.apply(masterNodeList, [
                    currentIndex,
                    1
                ]);
                [].splice.apply(masterNodeList, [
                    newIndex,
                    0,
                    temp
                ]);
                newIndex = newIndex - 1;
                currentIndex = currentIndex - 1;
                var indexCompute = indexMap[currentIndex];
                [].splice.apply(indexMap, [
                    currentIndex,
                    1
                ]);
                [].splice.apply(indexMap, [
                    newIndex,
                    0,
                    indexCompute
                ]);
                var i = Math.min(currentIndex, newIndex);
                var len = indexMap.length;
                for (i, len; i < len; i++) {
                    indexMap[i](i);
                }
                if (ev.callChildMutationCallback !== false) {
                    live.callChildMutationCallback(text.parentNode);
                }
            };
            text = el.ownerDocument.createTextNode('');
            var teardownList = function (fullTeardown) {
                    if (list && list.unbind) {
                        list.unbind('add', add).unbind('set', set).unbind('remove', remove).unbind('move', move);
                    }
                    remove({ callChildMutationCallback: !!fullTeardown }, { length: masterNodeList.length - 1 }, 0, true, fullTeardown);
                }, updateList = function (ev, newList, oldList) {
                    if (isTornDown) {
                        return;
                    }
                    afterPreviousEvents = true;
                    if (newList && oldList) {
                        list = newList || [];
                        var patches = diff(oldList, newList);
                        if (oldList.unbind) {
                            oldList.unbind('add', add).unbind('set', set).unbind('remove', remove).unbind('move', move);
                        }
                        for (var i = 0, patchLen = patches.length; i < patchLen; i++) {
                            var patch = patches[i];
                            if (patch.deleteCount) {
                                remove({ callChildMutationCallback: false }, { length: patch.deleteCount }, patch.index, true);
                            }
                            if (patch.insert.length) {
                                add({ callChildMutationCallback: false }, patch.insert, patch.index);
                            }
                        }
                    } else {
                        if (oldList) {
                            teardownList();
                        }
                        list = newList || [];
                        add({ callChildMutationCallback: false }, list, 0);
                        addFalseyIfEmpty(list, falseyRender, masterNodeList, nodeList);
                    }
                    live.callChildMutationCallback(text.parentNode);
                    afterPreviousEvents = false;
                    if (list.bind) {
                        list.bind('add', add).bind('set', set).bind('remove', remove).bind('move', move);
                    }
                    canBatch.afterPreviousEvents(function () {
                        afterPreviousEvents = true;
                    });
                };
            parentNode = elements.getParentNode(el, parentNode);
            data = setup(parentNode, function () {
                if (typeof compute === 'function') {
                    compute.bind('change', updateList);
                }
            }, function () {
                if (typeof compute === 'function') {
                    compute.unbind('change', updateList);
                }
                teardownList(true);
            });
            if (!nodeList) {
                live.replace(masterNodeList, text, data.teardownCheck);
            } else {
                elements.replace(masterNodeList, text);
                nodeLists.update(masterNodeList, [text]);
                nodeList.unregistered = function () {
                    data.teardownCheck();
                    isTornDown = true;
                };
            }
            updateList({}, typeof compute === 'function' ? compute() : compute);
        },
        html: function (el, compute, parentNode, nodeList) {
            var data, nodes, makeAndPut;
            parentNode = elements.getParentNode(el, parentNode);
            data = listen(parentNode, compute, function (ev, newVal) {
                var attached = nodeLists.first(nodes).parentNode;
                if (attached) {
                    makeAndPut(newVal);
                }
                var pn = nodeLists.first(nodes).parentNode;
                data.teardownCheck(pn);
                live.callChildMutationCallback(pn);
            });
            nodes = nodeList || [el];
            makeAndPut = function (val) {
                var isFunction = typeof val === 'function', aNode = isNode(val), frag = canFrag(isFunction ? '' : val), oldNodes = makeArray(nodes);
                addTextNodeIfNoChildren(frag);
                if (!aNode && !isFunction) {
                    frag = view.hookup(frag, parentNode);
                }
                oldNodes = nodeLists.update(nodes, getChildNodes(frag));
                if (isFunction) {
                    val(frag.firstChild);
                }
                elements.replace(oldNodes, frag);
            };
            data.nodeList = nodes;
            if (!nodeList) {
                nodeLists.register(nodes, data.teardownCheck);
            } else {
                nodeList.unregistered = data.teardownCheck;
            }
            makeAndPut(compute());
        },
        replace: function (nodes, val, teardown) {
            var oldNodes = nodes.slice(0), frag = canFrag(val);
            nodeLists.register(nodes, teardown);
            if (typeof val === 'string') {
                frag = view.hookup(frag, nodes[0].parentNode);
            }
            nodeLists.update(nodes, getChildNodes(frag));
            elements.replace(oldNodes, frag);
            return nodes;
        },
        text: function (el, compute, parentNode, nodeList) {
            var parent = elements.getParentNode(el, parentNode), node;
            var data = listen(parent, compute, function (ev, newVal) {
                if (typeof node.nodeValue !== 'unknown') {
                    node.nodeValue = view.toStr(newVal);
                }
                data.teardownCheck(node.parentNode);
            });
            node = el.ownerDocument.createTextNode(view.toStr(compute()));
            if (nodeList) {
                nodeList.unregistered = data.teardownCheck;
                data.nodeList = nodeList;
                nodeLists.update(nodeList, [node]);
                elements.replace([el], node);
            } else {
                data.nodeList = live.replace([el], node, data.teardownCheck);
            }
        },
        setAttributes: function (el, newVal) {
            var attrs = getAttributeParts(newVal);
            for (var name in attrs) {
                domAttr.set(el, name, attrs[name]);
            }
        },
        attributes: function (el, compute, currentValue) {
            var oldAttrs = {};
            var setAttrs = function (newVal) {
                var newAttrs = getAttributeParts(newVal), name;
                for (name in newAttrs) {
                    var newValue = newAttrs[name], oldValue = oldAttrs[name];
                    if (newValue !== oldValue) {
                        domAttr.set(el, name, newValue);
                    }
                    delete oldAttrs[name];
                }
                for (name in oldAttrs) {
                    domAttr.remove(el, name);
                }
                oldAttrs = newAttrs;
            };
            listen(el, compute, function (ev, newVal) {
                setAttrs(newVal);
            });
            if (arguments.length >= 3) {
                oldAttrs = getAttributeParts(currentValue);
            } else {
                setAttrs(compute());
            }
        },
        attributePlaceholder: '__!!__',
        attributeReplace: /__!!__/g,
        attribute: function (el, attributeName, compute) {
            var hook;
            listen(el, compute, function () {
                domAttr.set(el, attributeName, hook.render());
            });
            var hooks;
            hooks = domData.get.call(el, 'hooks');
            if (!hooks) {
                domData.set.call(el, 'hooks', hooks = {});
            }
            var attr = String(domAttr.get(el, attributeName)), parts = attr.split(live.attributePlaceholder), goodParts = [];
            goodParts.push(parts.shift(), parts.join(live.attributePlaceholder));
            if (hooks[attributeName]) {
                hooks[attributeName].computes.push(compute);
            } else {
                hooks[attributeName] = {
                    render: function () {
                        var i = 0, newAttr = attr ? attr.replace(live.attributeReplace, function () {
                                return view.contentText(hook.computes[i++]());
                            }) : view.contentText(hook.computes[i++]());
                        return newAttr;
                    },
                    computes: [compute],
                    batchNum: undefined
                };
            }
            hook = hooks[attributeName];
            goodParts.splice(1, 0, compute());
            domAttr.set(el, attributeName, goodParts.join(''));
        },
        specialAttribute: function (el, attributeName, compute) {
            listen(el, compute, function (ev, newVal) {
                domAttr.set(el, attributeName, getValue(newVal));
            });
            domAttr.set(el, attributeName, getValue(compute()));
        },
        simpleAttribute: function (el, attributeName, compute) {
            listen(el, compute, function (ev, newVal) {
                elements.setAttr(el, attributeName, newVal);
            });
            elements.setAttr(el, attributeName, compute());
        }
    };
    live.attr = live.simpleAttribute;
    live.attrs = live.attributes;
    live.getAttributeParts = getAttributeParts;
    module.exports = live;
});
/*can-legacy-view-helpers@0.5.0#src/render*/
define('can-legacy-view-helpers/src/render', function (require, exports, module) {
    var view = require('can-legacy-view-helpers/src/view');
    var elements = require('can-legacy-view-helpers/src/elements');
    var string = require('can-util/js/string/string');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var canCompute = require('can-compute');
    var live = require('can-legacy-view-helpers/src/live');
    var pendingHookups = [], tagChildren = function (tagName) {
            var newTag = elements.tagMap[tagName] || 'span';
            if (newTag === 'span') {
                return '@@!!@@';
            }
            return '<' + newTag + '>' + tagChildren(newTag) + '</' + newTag + '>';
        }, contentText = function (input, tag) {
            if (typeof input === 'string') {
                return input;
            }
            if (!input && input !== 0) {
                return '';
            }
            var hook = input.hookup && function (el, id) {
                input.hookup.call(input, el, id);
            } || typeof input === 'function' && input;
            if (hook) {
                if (tag) {
                    return '<' + tag + ' ' + view.hook(hook) + '></' + tag + '>';
                } else {
                    pendingHookups.push(hook);
                }
                return '';
            }
            return '' + input;
        }, contentEscape = function (txt, tag) {
            return typeof txt === 'string' || typeof txt === 'number' ? string.esc(txt) : contentText(txt, tag);
        }, withinTemplatedSectionWithinAnElement = false, emptyHandler = function () {
        };
    var lastHookups;
    deepAssign(view, {
        contentText: contentText,
        live: live,
        setupLists: function () {
            var old = view.lists, data;
            view.lists = function (list, renderer) {
                data = {
                    list: list,
                    renderer: renderer
                };
                return Math.random();
            };
            return function () {
                view.lists = old;
                return data;
            };
        },
        getHooks: function () {
            var hooks = pendingHookups.slice(0);
            lastHookups = hooks;
            pendingHookups = [];
            return hooks;
        },
        onlytxt: function (self, func) {
            return contentEscape(func.call(self));
        },
        txt: function (escape, tagName, status, self, func) {
            var tag = elements.tagMap[tagName] || 'span', setupLiveBinding = false, value, listData, compute, unbind = emptyHandler, attributeName;
            if (withinTemplatedSectionWithinAnElement) {
                value = func.call(self);
            } else {
                if (typeof status === 'string' || status === 1) {
                    withinTemplatedSectionWithinAnElement = true;
                }
                var listTeardown = view.setupLists();
                unbind = function () {
                    compute.unbind('change', emptyHandler);
                };
                compute = canCompute(func, self, false);
                compute.bind('change', emptyHandler);
                listData = listTeardown();
                value = compute();
                withinTemplatedSectionWithinAnElement = false;
                setupLiveBinding = compute.computeInstance.hasDependencies;
            }
            if (listData) {
                unbind();
                return '<' + tag + view.hook(function (el, parentNode) {
                    live.list(el, listData.list, listData.renderer, self, parentNode);
                }) + '></' + tag + '>';
            }
            if (!setupLiveBinding || typeof value === 'function') {
                unbind();
                return (withinTemplatedSectionWithinAnElement || escape === 2 || !escape ? contentText : contentEscape)(value, status === 0 && tag);
            }
            var contentProp = elements.tagToContentPropMap[tagName];
            if (status === 0 && !contentProp) {
                var selfClosing = !!elements.selfClosingTags[tag];
                return '<' + tag + view.hook(escape && typeof value !== 'object' ? function (el, parentNode) {
                    live.text(el, compute, parentNode);
                    unbind();
                } : function (el, parentNode) {
                    live.html(el, compute, parentNode);
                    unbind();
                }) + (selfClosing ? '/>' : '>' + tagChildren(tag) + '</' + tag + '>');
            } else if (status === 1) {
                pendingHookups.push(function (el) {
                    live.attributes(el, compute, compute());
                    unbind();
                });
                return compute();
            } else if (escape === 2) {
                attributeName = status;
                pendingHookups.push(function (el) {
                    live.specialAttribute(el, attributeName, compute);
                    unbind();
                });
                return compute();
            } else {
                attributeName = status === 0 ? contentProp : status;
                (status === 0 ? lastHookups : pendingHookups).push(function (el) {
                    live.attribute(el, attributeName, compute);
                    unbind();
                });
                return live.attributePlaceholder;
            }
        }
    });
    module.exports = view;
});
/*can-legacy-view-helpers@0.5.0#src/scanner*/
define('can-legacy-view-helpers/src/scanner', function (require, exports, module) {
    var elements = require('can-legacy-view-helpers/src/elements');
    var viewCallbacks = require('can-view-callbacks');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var view = require('can-legacy-view-helpers/src/view');
    var each = require('can-util/js/each/each');
    var newLine = /(\r|\n)+/g, notEndTag = /\//, clean = function (content) {
            return content.split('\\').join('\\\\').split('\n').join('\\n').split('"').join('\\"').split('\t').join('\\t');
        }, getTag = function (tagName, tokens, i) {
            if (tagName) {
                return tagName;
            } else {
                while (i < tokens.length) {
                    if (tokens[i] === '<' && !notEndTag.test(tokens[i + 1])) {
                        return elements.reverseTagMap[tokens[i + 1]] || 'span';
                    }
                    i++;
                }
            }
            return '';
        }, bracketNum = function (content) {
            return --content.split('{').length - --content.split('}').length;
        }, myEval = function (script) {
            eval(script);
        }, attrReg = /([^\s]+)[\s]*=[\s]*$/, startTxt = 'var ___v1ew = [];', finishTxt = 'return ___v1ew.join(\'\')', put_cmd = '___v1ew.push(\n', insert_cmd = put_cmd, htmlTag = null, quote = null, beforeQuote = null, rescan = null, getAttrName = function () {
            var matches = beforeQuote.match(attrReg);
            return matches && matches[1];
        }, _status = function () {
            return quote ? '\'' + getAttrName() + '\'' : htmlTag ? 1 : 0;
        }, _top = function (stack) {
            return stack[stack.length - 1];
        }, Scanner;
    var Scanner = function (options) {
        deepAssign(this, {
            text: {},
            tokens: []
        }, options);
        this.text.options = this.text.options || '';
        this.tokenReg = [];
        this.tokenSimple = {
            '<': '<',
            '>': '>',
            '"': '"',
            '\'': '\''
        };
        this.tokenComplex = [];
        this.tokenMap = {};
        for (var i = 0, token; token = this.tokens[i]; i++) {
            if (token[2]) {
                this.tokenReg.push(token[2]);
                this.tokenComplex.push({
                    abbr: token[1],
                    re: new RegExp(token[2]),
                    rescan: token[3]
                });
            } else {
                this.tokenReg.push(token[1]);
                this.tokenSimple[token[1]] = token[0];
            }
            this.tokenMap[token[0]] = token[1];
        }
        this.tokenReg = new RegExp('(' + this.tokenReg.slice(0).concat([
            '<',
            '>',
            '"',
            '\''
        ]).join('|') + ')', 'g');
    };
    Scanner.prototype = {
        helpers: [],
        scan: function (source, name) {
            var tokens = [], last = 0, simple = this.tokenSimple, complex = this.tokenComplex;
            source = source.replace(newLine, '\n');
            if (this.transform) {
                source = this.transform(source);
            }
            source.replace(this.tokenReg, function (whole, part) {
                var offset = arguments[arguments.length - 2];
                if (offset > last) {
                    tokens.push(source.substring(last, offset));
                }
                if (simple[whole]) {
                    tokens.push(whole);
                } else {
                    for (var i = 0, token; token = complex[i]; i++) {
                        if (token.re.test(whole)) {
                            tokens.push(token.abbr);
                            if (token.rescan) {
                                tokens.push(token.rescan(part));
                            }
                            break;
                        }
                    }
                }
                last = offset + part.length;
            });
            if (last < source.length) {
                tokens.push(source.substr(last));
            }
            var content = '', buff = [startTxt + (this.text.start || '')], put = function (content, bonus) {
                    buff.push(put_cmd, '"', clean(content), '"' + (bonus || '') + ');');
                }, endStack = [], lastToken, startTag = null, magicInTag = false, specialStates = {
                    attributeHookups: [],
                    tagHookups: [],
                    lastTagHookup: ''
                }, popTagHookup = function () {
                    specialStates.lastTagHookup = specialStates.tagHookups.pop() + specialStates.tagHookups.length;
                }, tagName = '', tagNames = [], popTagName = false, bracketCount, specialAttribute = false, i = 0, token, tmap = this.tokenMap, attrName;
            htmlTag = quote = beforeQuote = null;
            for (; (token = tokens[i++]) !== undefined;) {
                if (startTag === null) {
                    switch (token) {
                    case tmap.left:
                    case tmap.escapeLeft:
                    case tmap.returnLeft:
                        magicInTag = htmlTag && 1;
                    case tmap.commentLeft:
                        startTag = token;
                        if (content.length) {
                            put(content);
                        }
                        content = '';
                        break;
                    case tmap.escapeFull:
                        magicInTag = htmlTag && 1;
                        rescan = 1;
                        startTag = tmap.escapeLeft;
                        if (content.length) {
                            put(content);
                        }
                        rescan = tokens[i++];
                        content = rescan.content || rescan;
                        if (rescan.before) {
                            put(rescan.before);
                        }
                        tokens.splice(i, 0, tmap.right);
                        break;
                    case tmap.commentFull:
                        break;
                    case tmap.templateLeft:
                        content += tmap.left;
                        break;
                    case '<':
                        if (tokens[i].indexOf('!--') !== 0) {
                            htmlTag = 1;
                            magicInTag = 0;
                        }
                        content += token;
                        break;
                    case '>':
                        htmlTag = 0;
                        var emptyElement = content.substr(content.length - 1) === '/' || content.substr(content.length - 2) === '--', attrs = '';
                        if (specialStates.attributeHookups.length) {
                            attrs = 'attrs: [\'' + specialStates.attributeHookups.join('\',\'') + '\'], ';
                            specialStates.attributeHookups = [];
                        }
                        if (tagName + specialStates.tagHookups.length !== specialStates.lastTagHookup && tagName === _top(specialStates.tagHookups)) {
                            if (emptyElement) {
                                content = content.substr(0, content.length - 1);
                            }
                            buff.push(put_cmd, '"', clean(content), '"', ',CAN_LEGACY_HELPERS.view.pending({tagName:\'' + tagName + '\',' + attrs + 'scope: ' + (this.text.scope || 'this') + this.text.options);
                            if (emptyElement) {
                                buff.push('}));');
                                content = '/>';
                                popTagHookup();
                            } else if (tokens[i] === '<' && tokens[i + 1] === '/' + tagName) {
                                buff.push('}));');
                                content = token;
                                popTagHookup();
                            } else {
                                buff.push(',subtemplate: function(' + this.text.argNames + '){\n' + startTxt + (this.text.start || ''));
                                content = '';
                            }
                        } else if (magicInTag || !popTagName && elements.tagToContentPropMap[tagNames[tagNames.length - 1]] || attrs) {
                            var pendingPart = ',CAN_LEGACY_HELPERS.view.pending({' + attrs + 'scope: ' + (this.text.scope || 'this') + this.text.options + '}),"';
                            if (emptyElement) {
                                put(content.substr(0, content.length - 1), pendingPart + '/>"');
                            } else {
                                put(content, pendingPart + '>"');
                            }
                            content = '';
                            magicInTag = 0;
                        } else {
                            content += token;
                        }
                        if (emptyElement || popTagName) {
                            tagNames.pop();
                            tagName = tagNames[tagNames.length - 1];
                            popTagName = false;
                        }
                        specialStates.attributeHookups = [];
                        break;
                    case '\'':
                    case '"':
                        if (htmlTag) {
                            if (quote && quote === token) {
                                quote = null;
                                var attr = getAttrName();
                                if (viewCallbacks.attr(attr)) {
                                    specialStates.attributeHookups.push(attr);
                                }
                                if (specialAttribute) {
                                    content += token;
                                    put(content);
                                    buff.push(finishTxt, '}));\n');
                                    content = '';
                                    specialAttribute = false;
                                    break;
                                }
                            } else if (quote === null) {
                                quote = token;
                                beforeQuote = lastToken;
                                attrName = getAttrName();
                                if (tagName === 'img' && attrName === 'src' || attrName === 'style') {
                                    put(content.replace(attrReg, ''));
                                    content = '';
                                    specialAttribute = true;
                                    buff.push(insert_cmd, 'CAN_LEGACY_HELPERS.view.txt(2,\'' + getTag(tagName, tokens, i) + '\',' + _status() + ',this,function(){', startTxt);
                                    put(attrName + '=' + token);
                                    break;
                                }
                            }
                        }
                    default:
                        if (lastToken === '<') {
                            tagName = token.substr(0, 3) === '!--' ? '!--' : token.split(/\s/)[0];
                            var isClosingTag = false, cleanedTagName;
                            if (tagName.indexOf('/') === 0) {
                                isClosingTag = true;
                                cleanedTagName = tagName.substr(1);
                            }
                            if (isClosingTag) {
                                if (_top(tagNames) === cleanedTagName) {
                                    tagName = cleanedTagName;
                                    popTagName = true;
                                }
                                if (_top(specialStates.tagHookups) === cleanedTagName) {
                                    put(content.substr(0, content.length - 1));
                                    buff.push(finishTxt + '}}) );');
                                    content = '><';
                                    popTagHookup();
                                }
                            } else {
                                if (tagName.lastIndexOf('/') === tagName.length - 1) {
                                    tagName = tagName.substr(0, tagName.length - 1);
                                }
                                if (tagName !== '!--' && viewCallbacks.tag(tagName)) {
                                    if (tagName === 'content' && elements.tagMap[_top(tagNames)]) {
                                        token = token.replace('content', elements.tagMap[_top(tagNames)]);
                                    }
                                    specialStates.tagHookups.push(tagName);
                                }
                                tagNames.push(tagName);
                            }
                        }
                        content += token;
                        break;
                    }
                } else {
                    switch (token) {
                    case tmap.right:
                    case tmap.returnRight:
                        switch (startTag) {
                        case tmap.left:
                            bracketCount = bracketNum(content);
                            if (bracketCount === 1) {
                                buff.push(insert_cmd, 'CAN_LEGACY_HELPERS.view.txt(0,\'' + getTag(tagName, tokens, i) + '\',' + _status() + ',this,function(){', startTxt, content);
                                endStack.push({
                                    before: '',
                                    after: finishTxt + '}));\n'
                                });
                            } else {
                                last = endStack.length && bracketCount === -1 ? endStack.pop() : { after: ';' };
                                if (last.before) {
                                    buff.push(last.before);
                                }
                                buff.push(content, ';', last.after);
                            }
                            break;
                        case tmap.escapeLeft:
                        case tmap.returnLeft:
                            bracketCount = bracketNum(content);
                            if (bracketCount) {
                                endStack.push({
                                    before: finishTxt,
                                    after: '}));\n'
                                });
                            }
                            var escaped = startTag === tmap.escapeLeft ? 1 : 0, commands = {
                                    insert: insert_cmd,
                                    tagName: getTag(tagName, tokens, i),
                                    status: _status(),
                                    specialAttribute: specialAttribute
                                };
                            for (var ii = 0; ii < this.helpers.length; ii++) {
                                var helper = this.helpers[ii];
                                if (helper.name.test(content)) {
                                    content = helper.fn(content, commands);
                                    if (helper.name.source === /^>[\s]*\w*/.source) {
                                        escaped = 0;
                                    }
                                    break;
                                }
                            }
                            if (typeof content === 'object') {
                                if (content.startTxt && content.end && specialAttribute) {
                                    buff.push(insert_cmd, 'CAN_LEGACY_HELPERS.view.toStr( ', content.content, '() ) );');
                                } else {
                                    if (content.startTxt) {
                                        buff.push(insert_cmd, 'CAN_LEGACY_HELPERS.view.txt(\n' + (typeof _status() === 'string' || (content.escaped != null ? content.escaped : escaped)) + ',\n\'' + tagName + '\',\n' + _status() + ',\nthis,\n');
                                    } else if (content.startOnlyTxt) {
                                        buff.push(insert_cmd, 'CAN_LEGACY_HELPERS.view.onlytxt(this,\n');
                                    }
                                    buff.push(content.content);
                                    if (content.end) {
                                        buff.push('));');
                                    }
                                }
                            } else if (specialAttribute) {
                                buff.push(insert_cmd, content, ');');
                            } else {
                                buff.push(insert_cmd, 'CAN_LEGACY_HELPERS.view.txt(\n' + (typeof _status() === 'string' || escaped) + ',\n\'' + tagName + '\',\n' + _status() + ',\nthis,\nfunction(){ ' + (this.text.escape || '') + 'return ', content, bracketCount ? startTxt : '}));\n');
                            }
                            if (rescan && rescan.after && rescan.after.length) {
                                put(rescan.after.length);
                                rescan = null;
                            }
                            break;
                        }
                        startTag = null;
                        content = '';
                        break;
                    case tmap.templateLeft:
                        content += tmap.left;
                        break;
                    default:
                        content += token;
                        break;
                    }
                }
                lastToken = token;
            }
            if (content.length) {
                put(content);
            }
            buff.push(';');
            var template = buff.join(''), out = { out: (this.text.outStart || '') + template + ' ' + finishTxt + (this.text.outEnd || '') };
            myEval.call(out, 'this.fn = (function(' + this.text.argNames + '){' + out.out + '});\r\n//# sourceURL=' + name + '.js');
            return out;
        }
    };
    view.pending = function (viewData) {
        var hooks = view.getHooks();
        return view.hook(function (el) {
            each(hooks, function (fn) {
                fn(el);
            });
            viewData.templateType = 'legacy';
            if (viewData.tagName) {
                viewCallbacks.tagHandler(el, viewData.tagName, viewData);
            }
            each(viewData && viewData.attrs || [], function (attributeName) {
                viewData.attributeName = attributeName;
                var callback = viewCallbacks.attr(attributeName);
                if (callback) {
                    callback(el, viewData);
                }
            });
        });
    };
    view.Scanner = Scanner;
    module.exports = Scanner;
});
/*can-legacy-view-helpers@0.5.0#can-legacy-view-helpers*/
define('can-legacy-view-helpers', function (require, exports, module) {
    var render = require('can-legacy-view-helpers/src/render');
    var scanner = require('can-legacy-view-helpers/src/scanner');
    var view = require('can-legacy-view-helpers/src/view');
    var elements = require('can-legacy-view-helpers/src/elements');
    var live = require('can-legacy-view-helpers/src/live');
    var nodeLists = require('can-legacy-view-helpers/src/node_list');
    var legacyHelpers = {
        render: render,
        Scanner: scanner,
        view: view,
        elements: elements,
        live: live,
        nodeLists: nodeLists
    };
    window.CAN_LEGACY_HELPERS = legacyHelpers;
    module.exports = legacyHelpers;
});
/*can-ejs@3.0.3#can-ejs*/
define('can-ejs', function (require, exports, module) {
    var legacyHelpers = require('can-legacy-view-helpers');
    var extend = require('can-util/js/assign/assign');
    var namespace = require('can-namespace');
    var each = require('can-util/js/each/each');
    var types = require('can-types');
    var observationReader = require('can-observation/reader/reader');
    var DOCUMENT = require('can-util/dom/document/document');
    var templateId = 0;
    var EJS = function (options) {
        if (!this || this.constructor !== EJS) {
            var ejs = new EJS(options);
            return function (data, helpers) {
                return legacyHelpers.view.frag(ejs.render(data, helpers));
            };
        }
        if (typeof options === 'function') {
            this.template = { fn: options };
            return;
        }
        if (typeof options === 'string') {
            options = {
                text: options,
                name: '' + ++templateId
            };
        }
        extend(this, options);
        this.template = this.scanner.scan(this.text, this.name);
    };
    namespace.EJS = EJS;
    EJS.prototype.render = function (object, extraHelpers) {
        object = object || {};
        return this.template.fn.call(object, object, new EJS.Helpers(object, extraHelpers || {}));
    };
    extend(EJS.prototype, {
        scanner: new legacyHelpers.Scanner({
            text: {
                outStart: 'with(_VIEW) { with (_CONTEXT) {',
                outEnd: '}}',
                argNames: '_CONTEXT,_VIEW',
                context: 'this'
            },
            tokens: [
                [
                    'templateLeft',
                    '<%%'
                ],
                [
                    'templateRight',
                    '%>'
                ],
                [
                    'returnLeft',
                    '<%=='
                ],
                [
                    'escapeLeft',
                    '<%='
                ],
                [
                    'commentLeft',
                    '<%#'
                ],
                [
                    'left',
                    '<%'
                ],
                [
                    'right',
                    '%>'
                ],
                [
                    'returnRight',
                    '%>'
                ]
            ],
            helpers: [{
                    name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                    fn: function (content) {
                        var quickFunc = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, parts = content.match(quickFunc);
                        return '(function(__){var ' + parts[1] + '=__;' + parts[2] + '}).bind(this);';
                    }
                }],
            transform: function (source) {
                return source.replace(/<%([\s\S]+?)%>/gm, function (whole, part) {
                    var brackets = [], foundBracketPair, i;
                    part.replace(/[{}]/gm, function (bracket, offset) {
                        brackets.push([
                            bracket,
                            offset
                        ]);
                    });
                    do {
                        foundBracketPair = false;
                        for (i = brackets.length - 2; i >= 0; i--) {
                            if (brackets[i][0] === '{' && brackets[i + 1][0] === '}') {
                                brackets.splice(i, 2);
                                foundBracketPair = true;
                                break;
                            }
                        }
                    } while (foundBracketPair);
                    if (brackets.length >= 2) {
                        var result = ['<%'], bracket, last = 0;
                        for (i = 0; bracket = brackets[i]; i++) {
                            result.push(part.substring(last, last = bracket[1]));
                            if (bracket[0] === '{' && i < brackets.length - 1 || bracket[0] === '}' && i > 0) {
                                result.push(bracket[0] === '{' ? '{ %><% ' : ' %><% }');
                            } else {
                                result.push(bracket[0]);
                            }
                            ++last;
                        }
                        result.push(part.substring(last), '%>');
                        return result.join('');
                    } else {
                        return '<%' + part + '%>';
                    }
                });
            }
        })
    });
    EJS.Helpers = function (data, extras) {
        this._data = data;
        this._extras = extras;
        extend(this, extras);
    };
    EJS.Helpers.prototype = {
        list: function (list, cb) {
            if (types.isListLike(list)) {
                observationReader.get(list, 'length');
            }
            each(list, function (item, i) {
                cb(item, i, list);
            });
        },
        each: function (list, cb) {
            if (Array.isArray(list)) {
                this.list(list, cb);
            } else {
                legacyHelpers.view.lists(list, cb);
            }
        }
    };
    var templates = {};
    EJS.from = function (id) {
        if (!templates[id]) {
            var el = DOCUMENT().getElementById(id);
            templates[id] = EJS(el.innerHTML);
        }
        return templates[id];
    };
    module.exports = EJS;
});
/*can-validate-legacy@1.0.0#can-validate*/
define('can-validate-legacy', function (require, exports, module) {
    var dev = require('can-util/js/dev/dev');
    var namespace = require('can-util/namespace');
    var Validate = {
        _validatorId: '',
        _validators: {},
        validator: function () {
            return this._validators[this._validatorId];
        },
        register: function (id, validator) {
            this._validatorId = id;
            this._validators[id] = validator;
        },
        isValid: function () {
            if (!this._validatorId) {
                dev.warn('A validator library is required for can.validate to work properly.');
            }
            return this.validator().isValid.apply(this, arguments);
        },
        once: function () {
            if (!this._validatorId) {
                dev.warn('A validator library is required for can.validate to work properly.');
            }
            return this.validator().once.apply(this, arguments);
        },
        validate: function () {
            var validateArgs = arguments;
            if (!this._validatorId) {
                dev.warn('A validator library is required for can.validate to work properly.');
            }
            if (typeof arguments[0] !== 'object') {
                dev.warn('Attempting to pass single value to validate, use can.validator.once instead.');
            }
            return this.validator().validate.apply(this, validateArgs);
        }
    };
    namespace.validate = Validate;
    module.exports = Validate;
});
/*can@3.4.1#legacy*/
define('can/legacy', function (require, exports, module) {
    var can = require('can-util/namespace');
    require('can-component');
    require('can-route');
    require('can-stache');
    require('can-stache-bindings');
    require('can-compute');
    require('can-event');
    require('can-view-model');
    require('can-map');
    require('can-list');
    require('can-map-backup');
    require('can-map-define');
    require('can-connect/can/model/model');
    require('can-ejs');
    require('can-validate-legacy');
    can.view.attr = can.view.callbacks.attr;
    can.view.tag = can.view.callbacks.tag;
    module.exports = can;
});
/*can@3.4.1#all*/
define('can/all', function (require, exports, module) {
    var can = require('can-util/namespace');
    require('can');
    require('can/ecosystem');
    require('can/legacy');
    module.exports = can;
});
/*[global-shim-end]*/
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();