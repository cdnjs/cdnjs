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
/*[global-shim-end]*/
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();