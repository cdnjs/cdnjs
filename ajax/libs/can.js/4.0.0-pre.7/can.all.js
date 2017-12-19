/*[global-shim-start]*/
(function(exports, global, doEval) {
	// jshint ignore:line
	var origDefine = global.define;

	var get = function(name) {
		var parts = name.split("."),
			cur = global,
			i;
		for (i = 0; i < parts.length; i++) {
			if (!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var set = function(name, val) {
		var parts = name.split("."),
			cur = global,
			i,
			part,
			next;
		for (i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if (!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod) {
		if (!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, default: true };
		for (var p in mod) {
			if (!esProps[p]) return false;
		}
		return true;
	};

	var hasCjsDependencies = function(deps) {
		return (
			deps[0] === "require" && deps[1] === "exports" && deps[2] === "module"
		);
	};

	var modules =
		(global.define && global.define.modules) ||
		(global._define && global._define.modules) ||
		{};
	var ourDefine = (global.define = function(moduleName, deps, callback) {
		var module;
		if (typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for (i = 0; i < deps.length; i++) {
			args.push(
				exports[deps[i]]
					? get(exports[deps[i]])
					: modules[deps[i]] || get(deps[i])
			);
		}
		// CJS has no dependencies but 3 callback arguments
		if (hasCjsDependencies(deps) || (!deps.length && callback.length)) {
			module = { exports: {} };
			args[0] = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args[1] = module.exports;
			args[2] = module;
		} else if (!args[0] && deps[0] === "exports") {
			// Babel uses the exports and module object.
			module = { exports: {} };
			args[0] = module.exports;
			if (deps[1] === "module") {
				args[1] = module;
			}
		} else if (!args[0] && deps[0] === "module") {
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
		if (globalExport && !get(globalExport)) {
			if (useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
	});
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function() {
		// shim for @@global-helpers
		var noop = function() {};
		return {
			get: function() {
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load) {
				doEval(__load.source, global);
			}
		};
	});
})(
	{
		jquery: "jQuery",
		"can-util/namespace": "can",
		kefir: "Kefir",
		"validate.js": "validate",
		react: "React"
	},
	typeof self == "object" && self.Object == Object ? self : window,
	function(__$source__, __$global__) {
		// jshint ignore:line
		eval("(function() { " + __$source__ + " \n }).call(__$global__);");
	}
);

/*can-namespace@1.0.0#can-namespace*/
define('can-namespace', function (require, exports, module) {
    module.exports = {};
});
/*can-util@3.10.18#namespace*/
define('can-util/namespace', [
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    module.exports = require('can-namespace');
});
/*can-assign@1.1.1#can-assign*/
define('can-assign', function (require, exports, module) {
    module.exports = function (d, s) {
        for (var prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
});
/*can-util@3.10.18#js/assign/assign*/
define('can-util/js/assign/assign', [
    'require',
    'exports',
    'module',
    'can-assign'
], function (require, exports, module) {
    'use strict';
    module.exports = require('can-assign');
});
/*can-util@3.10.18#js/is-function/is-function*/
define('can-util/js/is-function/is-function', function (require, exports, module) {
    'use strict';
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
/*can-util@3.10.18#js/is-plain-object/is-plain-object*/
define('can-util/js/is-plain-object/is-plain-object', function (require, exports, module) {
    'use strict';
    var core_hasOwn = Object.prototype.hasOwnProperty;
    function isWindow(obj) {
        return obj !== null && obj == obj.window;
    }
    function isPlainObject(obj) {
        if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj) || obj.constructor && obj.constructor.shortName) {
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
/*can-util@3.10.18#js/deep-assign/deep-assign*/
define('can-util/js/deep-assign/deep-assign', [
    'require',
    'exports',
    'module',
    'can-util/js/is-function/is-function',
    'can-util/js/is-plain-object/is-plain-object'
], function (require, exports, module) {
    'use strict';
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
                    if (copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
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
/*can-log@0.1.2#can-log*/
define('can-log', function (require, exports, module) {
    'use strict';
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
/*can-log@0.1.2#dev/dev*/
define('can-log/dev/dev', [
    'require',
    'exports',
    'module',
    'can-log'
], function (require, exports, module) {
    'use strict';
    var canLog = require('can-log');
    module.exports = {
        warnTimeout: 5000,
        logLevel: 0,
        stringify: function (value) {
            var flagUndefined = function flagUndefined(key, value) {
                return value === undefined ? '/* void(undefined) */' : value;
            };
            return JSON.stringify(value, flagUndefined, '  ').replace(/"\/\* void\(undefined\) \*\/"/g, 'undefined');
        },
        warn: function () {
            canLog.warn.apply(this, arguments);
        },
        log: function () {
            canLog.log.apply(this, arguments);
        },
        error: function () {
            canLog.error.apply(this, arguments);
        },
        _logger: canLog._logger
    };
});
/*can-util@3.10.18#js/dev/dev*/
define('can-util/js/dev/dev', [
    'require',
    'exports',
    'module',
    'can-log/dev/dev'
], function (require, exports, module) {
    'use strict';
    module.exports = require('can-log/dev/dev');
});
/*can-util@3.10.18#js/is-array-like/is-array-like*/
define('can-util/js/is-array-like/is-array-like', function (require, exports, module) {
    'use strict';
    function isArrayLike(obj) {
        var type = typeof obj;
        if (type === 'string') {
            return true;
        } else if (type === 'number') {
            return false;
        }
        var length = obj && type !== 'boolean' && typeof obj !== 'number' && 'length' in obj && obj.length;
        return typeof obj !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
    }
    module.exports = isArrayLike;
});
/*can-symbol@1.5.0#can-symbol*/
define('can-symbol', [
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var namespace = require('can-namespace');
        var CanSymbol;
        if (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function') {
            CanSymbol = Symbol;
        } else {
            var symbolNum = 0;
            CanSymbol = function CanSymbolPolyfill(description) {
                var symbolValue = '@@symbol' + symbolNum++ + description;
                var symbol = {};
                Object.defineProperties(symbol, {
                    toString: {
                        value: function () {
                            return symbolValue;
                        }
                    }
                });
                return symbol;
            };
            var descriptionToSymbol = {};
            var symbolToDescription = {};
            CanSymbol.for = function (description) {
                var symbol = descriptionToSymbol[description];
                if (!symbol) {
                    symbol = descriptionToSymbol[description] = CanSymbol(description);
                    symbolToDescription[symbol] = description;
                }
                return symbol;
            };
            CanSymbol.keyFor = function (symbol) {
                return symbolToDescription[symbol];
            };
            [
                'hasInstance',
                'isConcatSpreadable',
                'iterator',
                'match',
                'prototype',
                'replace',
                'search',
                'species',
                'split',
                'toPrimitive',
                'toStringTag',
                'unscopables'
            ].forEach(function (name) {
                CanSymbol[name] = CanSymbol('Symbol.' + name);
            });
        }
        [
            'isMapLike',
            'isListLike',
            'isValueLike',
            'isFunctionLike',
            'getOwnKeys',
            'getOwnKeyDescriptor',
            'proto',
            'getOwnEnumerableKeys',
            'hasOwnKey',
            'size',
            'getName',
            'getIdentity',
            'assignDeep',
            'updateDeep',
            'getValue',
            'setValue',
            'getKeyValue',
            'setKeyValue',
            'updateValues',
            'addValue',
            'removeValues',
            'apply',
            'new',
            'onValue',
            'offValue',
            'onKeyValue',
            'offKeyValue',
            'getKeyDependencies',
            'getValueDependencies',
            'keyHasDependencies',
            'valueHasDependencies',
            'onKeys',
            'onKeysAdded',
            'onKeysRemoved',
            'onPatches'
        ].forEach(function (name) {
            CanSymbol.for('can.' + name);
        });
        module.exports = namespace.Symbol = CanSymbol;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#js/is-iterable/is-iterable*/
define('can-util/js/is-iterable/is-iterable', [
    'require',
    'exports',
    'module',
    'can-symbol'
], function (require, exports, module) {
    'use strict';
    var canSymbol = require('can-symbol');
    module.exports = function (obj) {
        return obj && !!obj[canSymbol.iterator || canSymbol.for('iterator')];
    };
});
/*can-util@3.10.18#js/each/each*/
define('can-util/js/each/each', [
    'require',
    'exports',
    'module',
    'can-util/js/is-array-like/is-array-like',
    'can-util/js/is-iterable/is-iterable',
    'can-symbol'
], function (require, exports, module) {
    'use strict';
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    var has = Object.prototype.hasOwnProperty;
    var isIterable = require('can-util/js/is-iterable/is-iterable');
    var canSymbol = require('can-symbol');
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
                var iter = elements[canSymbol.iterator || canSymbol.for('iterator')]();
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
/*can-util@3.10.18#js/make-array/make-array*/
define('can-util/js/make-array/make-array', [
    'require',
    'exports',
    'module',
    'can-util/js/each/each',
    'can-util/js/is-array-like/is-array-like'
], function (require, exports, module) {
    'use strict';
    var each = require('can-util/js/each/each');
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    function makeArray(element) {
        var ret = [];
        if (isArrayLike(element)) {
            each(element, function (a, i) {
                ret[i] = a;
            });
        } else if (element === 0 || element) {
            ret.push(element);
        }
        return ret;
    }
    module.exports = makeArray;
});
/*can-util@3.10.18#js/is-container/is-container*/
define('can-util/js/is-container/is-container', function (require, exports, module) {
    'use strict';
    module.exports = function (current) {
        return /^f|^o/.test(typeof current);
    };
});
/*can-util@3.10.18#js/get/get*/
define('can-util/js/get/get', [
    'require',
    'exports',
    'module',
    'can-util/js/is-container/is-container'
], function (require, exports, module) {
    'use strict';
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
/*can-util@3.10.18#js/is-array/is-array*/
define('can-util/js/is-array/is-array', [
    'require',
    'exports',
    'module',
    'can-log/dev/dev'
], function (require, exports, module) {
    'use strict';
    var dev = require('can-log/dev/dev');
    var hasWarned = false;
    module.exports = function (arr) {
        if (!hasWarned) {
            dev.warn('js/is-array/is-array is deprecated; use Array.isArray');
            hasWarned = true;
        }
        return Array.isArray(arr);
    };
});
/*can-util@3.10.18#js/string/string*/
define('can-util/js/string/string', [
    'require',
    'exports',
    'module',
    'can-util/js/get/get',
    'can-util/js/is-container/is-container',
    'can-log/dev/dev',
    'can-util/js/is-array/is-array'
], function (require, exports, module) {
    'use strict';
    var get = require('can-util/js/get/get');
    var isContainer = require('can-util/js/is-container/is-container');
    var canDev = require('can-log/dev/dev');
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
/*can-construct@3.2.3#can-construct*/
define('can-construct', [
    'require',
    'exports',
    'module',
    'can-util/js/assign/assign',
    'can-util/js/deep-assign/deep-assign',
    'can-util/js/dev/dev',
    'can-util/js/make-array/make-array',
    'can-namespace',
    'can-util/js/string/string'
], function (require, exports, module) {
    'use strict';
    var assign = require('can-util/js/assign/assign');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var dev = require('can-util/js/dev/dev');
    var makeArray = require('can-util/js/make-array/make-array');
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
                if (args instanceof Construct.ReturnValue) {
                    return args.value;
                }
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
        },
        ReturnValue: function (value) {
            this.value = value;
        }
    });
    Construct.prototype.setup = function () {
    };
    Construct.prototype.init = function () {
    };
    module.exports = namespace.Construct = Construct;
});
/*can-observation-recorder@0.1.3#can-observation-recorder*/
define('can-observation-recorder', [
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    var stack = [];
    var ObservationRecorder = {
        stack: stack,
        start: function () {
            stack.push({
                keyDependencies: new Map(),
                valueDependencies: new Set(),
                traps: null,
                ignore: 0
            });
        },
        stop: function () {
            return stack.pop();
        },
        add: function (obj, event) {
            var top = stack[stack.length - 1];
            if (top && top.ignore === 0) {
                if (top.traps) {
                    top.traps.push([
                        obj,
                        event
                    ]);
                } else {
                    if (event === undefined) {
                        top.valueDependencies.add(obj);
                    } else {
                        var eventSet = top.keyDependencies.get(obj);
                        if (!eventSet) {
                            eventSet = new Set();
                            top.keyDependencies.set(obj, eventSet);
                        }
                        eventSet.add(event);
                    }
                }
            }
        },
        addMany: function (observes) {
            var top = stack[stack.length - 1];
            if (top) {
                if (top.traps) {
                    top.traps.push.apply(top.traps, observes);
                } else {
                    for (var i = 0, len = observes.length; i < len; i++) {
                        this.add(observes[i][0], observes[i][1]);
                    }
                }
            }
        },
        ignore: function (fn) {
            return function () {
                if (stack.length) {
                    var top = stack[stack.length - 1];
                    top.ignore++;
                    var res = fn.apply(this, arguments);
                    top.ignore--;
                    return res;
                } else {
                    return fn.apply(this, arguments);
                }
            };
        },
        isRecording: function () {
            var len = stack.length;
            var last = len && stack[len - 1];
            return last && last.ignore === 0 && last;
        },
        makeDependenciesRecord: function () {
            return {
                traps: null,
                keyDependencies: new Map(),
                valueDependencies: new Set(),
                ignore: 0
            };
        },
        makeDependenciesRecorder: function () {
            return ObservationRecorder.makeDependenciesRecord();
        },
        trap: function () {
            if (stack.length) {
                var top = stack[stack.length - 1];
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
        },
        trapsCount: function () {
            if (stack.length) {
                var top = stack[stack.length - 1];
                return top.traps.length;
            } else {
                return 0;
            }
        }
    };
    if (namespace.ObservationRecorder) {
        throw new Error('You can\'t have two versions of can-observation-recorder, check your dependencies');
    } else {
        module.exports = namespace.ObservationRecorder = ObservationRecorder;
    }
});
/*can-reflect@1.11.0#reflections/helpers*/
define('can-reflect/reflections/helpers', [
    'require',
    'exports',
    'module',
    'can-symbol'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    module.exports = {
        makeGetFirstSymbolValue: function (symbolNames) {
            var symbols = symbolNames.map(function (name) {
                return canSymbol.for(name);
            });
            var length = symbols.length;
            return function getFirstSymbol(obj) {
                var index = -1;
                while (++index < length) {
                    if (obj[symbols[index]] !== undefined) {
                        return obj[symbols[index]];
                    }
                }
            };
        },
        hasLength: function (list) {
            var type = typeof list;
            var length = list && type !== 'boolean' && typeof list !== 'number' && 'length' in list && list.length;
            return typeof list !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in list);
        }
    };
});
/*can-reflect@1.11.0#reflections/type/type*/
define('can-reflect/reflections/type/type', [
    'require',
    'exports',
    'module',
    'can-symbol',
    'can-reflect/reflections/helpers'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var helpers = require('can-reflect/reflections/helpers');
    var plainFunctionPrototypePropertyNames = Object.getOwnPropertyNames(function () {
    }.prototype);
    var plainFunctionPrototypeProto = Object.getPrototypeOf(function () {
    }.prototype);
    function isConstructorLike(func) {
        var value = func[canSymbol.for('can.new')];
        if (value !== undefined) {
            return value;
        }
        if (typeof func !== 'function') {
            return false;
        }
        var prototype = func.prototype;
        if (!prototype) {
            return false;
        }
        if (plainFunctionPrototypeProto !== Object.getPrototypeOf(prototype)) {
            return true;
        }
        var propertyNames = Object.getOwnPropertyNames(prototype);
        if (propertyNames.length === plainFunctionPrototypePropertyNames.length) {
            for (var i = 0, len = propertyNames.length; i < len; i++) {
                if (propertyNames[i] !== plainFunctionPrototypePropertyNames[i]) {
                    return true;
                }
            }
            return false;
        } else {
            return true;
        }
    }
    var getNewOrApply = helpers.makeGetFirstSymbolValue([
        'can.new',
        'can.apply'
    ]);
    function isFunctionLike(obj) {
        var result, symbolValue = obj[canSymbol.for('can.isFunctionLike')];
        if (symbolValue !== undefined) {
            return symbolValue;
        }
        result = getNewOrApply(obj);
        if (result !== undefined) {
            return !!result;
        }
        return typeof obj === 'function';
    }
    function isPrimitive(obj) {
        var type = typeof obj;
        if (obj == null || type !== 'function' && type !== 'object') {
            return true;
        } else {
            return false;
        }
    }
    function isBuiltIn(obj) {
        if (isPrimitive(obj) || Array.isArray(obj) || isPlainObject(obj) || Object.prototype.toString.call(obj) !== '[object Object]' && Object.prototype.toString.call(obj).indexOf('[object ') !== -1) {
            return true;
        } else {
            return false;
        }
    }
    function isValueLike(obj) {
        var symbolValue;
        if (isPrimitive(obj)) {
            return true;
        }
        symbolValue = obj[canSymbol.for('can.isValueLike')];
        if (typeof symbolValue !== 'undefined') {
            return symbolValue;
        }
        var value = obj[canSymbol.for('can.getValue')];
        if (value !== undefined) {
            return !!value;
        }
    }
    function isMapLike(obj) {
        if (isPrimitive(obj)) {
            return false;
        }
        var isMapLike = obj[canSymbol.for('can.isMapLike')];
        if (typeof isMapLike !== 'undefined') {
            return !!isMapLike;
        }
        var value = obj[canSymbol.for('can.getKeyValue')];
        if (value !== undefined) {
            return !!value;
        }
        return true;
    }
    var onValueSymbol = canSymbol.for('can.onValue'), onKeyValueSymbol = canSymbol.for('can.onKeyValue'), onPatchesSymbol = canSymbol.for('can.onPatches');
    function isObservableLike(obj) {
        if (isPrimitive(obj)) {
            return false;
        }
        return Boolean(obj[onValueSymbol] || obj[onKeyValueSymbol] || obj[onPatchesSymbol]);
    }
    function isListLike(list) {
        var symbolValue, type = typeof list;
        if (type === 'string') {
            return true;
        }
        if (isPrimitive(list)) {
            return false;
        }
        symbolValue = list[canSymbol.for('can.isListLike')];
        if (typeof symbolValue !== 'undefined') {
            return symbolValue;
        }
        var value = list[canSymbol.iterator];
        if (value !== undefined) {
            return !!value;
        }
        if (Array.isArray(list)) {
            return true;
        }
        return helpers.hasLength(list);
    }
    var supportsSymbols = typeof Symbol !== 'undefined' && typeof Symbol.for === 'function';
    var isSymbolLike;
    if (supportsSymbols) {
        isSymbolLike = function (symbol) {
            return typeof symbol === 'symbol';
        };
    } else {
        var symbolStart = '@@symbol';
        isSymbolLike = function (symbol) {
            if (typeof symbol === 'object' && !Array.isArray(symbol)) {
                return symbol.toString().substr(0, symbolStart.length) === symbolStart;
            } else {
                return false;
            }
        };
    }
    var coreHasOwn = Object.prototype.hasOwnProperty;
    var funcToString = Function.prototype.toString;
    var objectCtorString = funcToString.call(Object);
    function isPlainObject(obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        var proto = Object.getPrototypeOf(obj);
        if (proto === Object.prototype || proto === null) {
            return true;
        }
        var Constructor = coreHasOwn.call(proto, 'constructor') && proto.constructor;
        return typeof Constructor === 'function' && Constructor instanceof Constructor && funcToString.call(Constructor) === objectCtorString;
    }
    module.exports = {
        isConstructorLike: isConstructorLike,
        isFunctionLike: isFunctionLike,
        isListLike: isListLike,
        isMapLike: isMapLike,
        isObservableLike: isObservableLike,
        isPrimitive: isPrimitive,
        isBuiltIn: isBuiltIn,
        isValueLike: isValueLike,
        isSymbolLike: isSymbolLike,
        isMoreListLikeThanMapLike: function (obj) {
            if (Array.isArray(obj)) {
                return true;
            }
            if (obj instanceof Array) {
                return true;
            }
            var value = obj[canSymbol.for('can.isMoreListLikeThanMapLike')];
            if (value !== undefined) {
                return value;
            }
            var isListLike = this.isListLike(obj), isMapLike = this.isMapLike(obj);
            if (isListLike && !isMapLike) {
                return true;
            } else if (!isListLike && isMapLike) {
                return false;
            }
        },
        isIteratorLike: function (obj) {
            return obj && typeof obj === 'object' && typeof obj.next === 'function' && obj.next.length === 0;
        },
        isPromise: function (obj) {
            return obj instanceof Promise || Object.prototype.toString.call(obj) === '[object Promise]';
        },
        isPlainObject: isPlainObject
    };
});
/*can-reflect@1.11.0#reflections/call/call*/
define('can-reflect/reflections/call/call', [
    'require',
    'exports',
    'module',
    'can-symbol',
    'can-reflect/reflections/type/type'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var typeReflections = require('can-reflect/reflections/type/type');
    module.exports = {
        call: function (func, context) {
            var args = [].slice.call(arguments, 2);
            var apply = func[canSymbol.for('can.apply')];
            if (apply) {
                return apply.call(func, context, args);
            } else {
                return func.apply(context, args);
            }
        },
        apply: function (func, context, args) {
            var apply = func[canSymbol.for('can.apply')];
            if (apply) {
                return apply.call(func, context, args);
            } else {
                return func.apply(context, args);
            }
        },
        'new': function (func) {
            var args = [].slice.call(arguments, 1);
            var makeNew = func[canSymbol.for('can.new')];
            if (makeNew) {
                return makeNew.apply(func, args);
            } else {
                var context = Object.create(func.prototype);
                var ret = func.apply(context, args);
                if (typeReflections.isPrimitive(ret)) {
                    return context;
                } else {
                    return ret;
                }
            }
        }
    };
});
/*can-reflect@1.11.0#reflections/get-set/get-set*/
define('can-reflect/reflections/get-set/get-set', [
    'require',
    'exports',
    'module',
    'can-symbol',
    'can-reflect/reflections/type/type'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var typeReflections = require('can-reflect/reflections/type/type');
    var setKeyValueSymbol = canSymbol.for('can.setKeyValue'), getKeyValueSymbol = canSymbol.for('can.getKeyValue'), getValueSymbol = canSymbol.for('can.getValue'), setValueSymbol = canSymbol.for('can.setValue');
    var reflections = {
        setKeyValue: function (obj, key, value) {
            if (typeReflections.isSymbolLike(key)) {
                if (typeof key === 'symbol') {
                    obj[key] = value;
                } else {
                    Object.defineProperty(obj, key, {
                        enumerable: false,
                        configurable: true,
                        value: value,
                        writable: true
                    });
                }
                return;
            }
            var setKeyValue = obj[setKeyValueSymbol];
            if (setKeyValue !== undefined) {
                return setKeyValue.call(obj, key, value);
            } else {
                obj[key] = value;
            }
        },
        getKeyValue: function (obj, key) {
            var getKeyValue = obj[getKeyValueSymbol];
            if (getKeyValue) {
                return getKeyValue.call(obj, key);
            }
            return obj[key];
        },
        deleteKeyValue: function (obj, key) {
            var deleteKeyValue = obj[canSymbol.for('can.deleteKeyValue')];
            if (deleteKeyValue) {
                return deleteKeyValue.call(obj, key);
            }
            delete obj[key];
        },
        getValue: function (value) {
            if (typeReflections.isPrimitive(value)) {
                return value;
            }
            var getValue = value[getValueSymbol];
            if (getValue) {
                return getValue.call(value);
            }
            return value;
        },
        setValue: function (item, value) {
            var setValue = item && item[setValueSymbol];
            if (setValue) {
                return setValue.call(item, value);
            } else {
                throw new Error('can-reflect.setValue - Can not set value.');
            }
        },
        splice: function (obj, index, removing, adding) {
            var howMany;
            if (typeof removing !== 'number') {
                var updateValues = obj[canSymbol.for('can.updateValues')];
                if (updateValues) {
                    return updateValues.call(obj, index, removing, adding);
                }
                howMany = removing.length;
            } else {
                howMany = removing;
            }
            var splice = obj[canSymbol.for('can.splice')];
            if (splice) {
                return splice.call(obj, index, howMany, adding);
            }
            return [].splice.apply(obj, [
                index,
                howMany
            ].concat(adding));
        },
        addValues: function (obj, adding, index) {
            var add = obj[canSymbol.for('can.addValues')];
            if (add) {
                return add.call(obj, adding, index);
            }
            if (Array.isArray(obj) && index === undefined) {
                return obj.push.apply(obj, adding);
            }
            return reflections.splice(obj, index, [], adding);
        },
        removeValues: function (obj, removing, index) {
            var removeValues = obj[canSymbol.for('can.removeValues')];
            if (removeValues) {
                return removeValues.call(obj, removing, index);
            }
            if (Array.isArray(obj) && index === undefined) {
                removing.forEach(function (item) {
                    var index = obj.indexOf(item);
                    if (index >= 0) {
                        obj.splice(index, 1);
                    }
                });
                return;
            }
            return reflections.splice(obj, index, removing, []);
        }
    };
    reflections.get = reflections.getKeyValue;
    reflections.set = reflections.setKeyValue;
    reflections['delete'] = reflections.deleteKeyValue;
    module.exports = reflections;
});
/*can-reflect@1.11.0#reflections/observe/observe*/
define('can-reflect/reflections/observe/observe', [
    'require',
    'exports',
    'module',
    'can-symbol'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var slice = [].slice;
    function makeFallback(symbolName, fallbackName) {
        return function (obj, event, handler, queueName) {
            var method = obj[canSymbol.for(symbolName)];
            if (method !== undefined) {
                return method.call(obj, event, handler, queueName);
            }
            return this[fallbackName].apply(this, arguments);
        };
    }
    function makeErrorIfMissing(symbolName, errorMessage) {
        return function (obj) {
            var method = obj[canSymbol.for(symbolName)];
            if (method !== undefined) {
                var args = slice.call(arguments, 1);
                return method.apply(obj, args);
            }
            throw new Error(errorMessage);
        };
    }
    module.exports = {
        onKeyValue: makeFallback('can.onKeyValue', 'onEvent'),
        offKeyValue: makeFallback('can.offKeyValue', 'offEvent'),
        onKeys: makeErrorIfMissing('can.onKeys', 'can-reflect: can not observe an onKeys event'),
        onKeysAdded: makeErrorIfMissing('can.onKeysAdded', 'can-reflect: can not observe an onKeysAdded event'),
        onKeysRemoved: makeErrorIfMissing('can.onKeysRemoved', 'can-reflect: can not unobserve an onKeysRemoved event'),
        getKeyDependencies: makeErrorIfMissing('can.getKeyDependencies', 'can-reflect: can not determine dependencies'),
        getWhatIChange: makeErrorIfMissing('can.getWhatIChange', 'can-reflect: can not determine dependencies'),
        getChangesDependencyRecord: function getChangesDependencyRecord(handler) {
            var fn = handler[canSymbol.for('can.getChangesDependencyRecord')];
            if (typeof fn === 'function') {
                return fn();
            }
        },
        keyHasDependencies: makeErrorIfMissing('can.keyHasDependencies', 'can-reflect: can not determine if this has key dependencies'),
        onValue: makeErrorIfMissing('can.onValue', 'can-reflect: can not observe value change'),
        offValue: makeErrorIfMissing('can.offValue', 'can-reflect: can not unobserve value change'),
        getValueDependencies: makeErrorIfMissing('can.getValueDependencies', 'can-reflect: can not determine dependencies'),
        valueHasDependencies: makeErrorIfMissing('can.valueHasDependencies', 'can-reflect: can not determine if value has dependencies'),
        onPatches: makeErrorIfMissing('can.onPatches', 'can-reflect: can not observe patches on object'),
        offPatches: makeErrorIfMissing('can.offPatches', 'can-reflect: can not unobserve patches on object'),
        onInstanceBoundChange: makeErrorIfMissing('can.onInstanceBoundChange', 'can-reflect: can not observe bound state change in instances.'),
        offInstanceBoundChange: makeErrorIfMissing('can.offInstanceBoundChange', 'can-reflect: can not unobserve bound state change'),
        isBound: makeErrorIfMissing('can.isBound', 'can-reflect: cannot determine if object is bound'),
        onEvent: function (obj, eventName, callback, queue) {
            if (obj) {
                var onEvent = obj[canSymbol.for('can.onEvent')];
                if (onEvent !== undefined) {
                    return onEvent.call(obj, eventName, callback, queue);
                } else if (obj.addEventListener) {
                    obj.addEventListener(eventName, callback, queue);
                }
            }
        },
        offEvent: function (obj, eventName, callback, queue) {
            if (obj) {
                var offEvent = obj[canSymbol.for('can.offEvent')];
                if (offEvent !== undefined) {
                    return offEvent.call(obj, eventName, callback, queue);
                } else if (obj.removeEventListener) {
                    obj.removeEventListener(eventName, callback, queue);
                }
            }
        },
        setPriority: function (obj, priority) {
            if (obj) {
                var setPriority = obj[canSymbol.for('can.setPriority')];
                if (setPriority !== undefined) {
                    setPriority.call(obj, priority);
                    return true;
                }
            }
            return false;
        },
        getPriority: function (obj) {
            if (obj) {
                var getPriority = obj[canSymbol.for('can.getPriority')];
                if (getPriority !== undefined) {
                    return getPriority.call(obj);
                }
            }
            return undefined;
        }
    };
});
/*can-reflect@1.11.0#reflections/shape/shape*/
define('can-reflect/reflections/shape/shape', [
    'require',
    'exports',
    'module',
    'can-symbol',
    'can-reflect/reflections/get-set/get-set',
    'can-reflect/reflections/type/type',
    'can-reflect/reflections/helpers'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var getSetReflections = require('can-reflect/reflections/get-set/get-set');
    var typeReflections = require('can-reflect/reflections/type/type');
    var helpers = require('can-reflect/reflections/helpers');
    var shapeReflections;
    var shiftFirstArgumentToThis = function (func) {
        return function () {
            var args = [this];
            args.push.apply(args, arguments);
            return func.apply(null, args);
        };
    };
    var getKeyValueSymbol = canSymbol.for('can.getKeyValue');
    var shiftedGetKeyValue = shiftFirstArgumentToThis(getSetReflections.getKeyValue);
    var setKeyValueSymbol = canSymbol.for('can.setKeyValue');
    var shiftedSetKeyValue = shiftFirstArgumentToThis(getSetReflections.setKeyValue);
    var sizeSymbol = canSymbol.for('can.size');
    var serializeMap = null;
    var hasUpdateSymbol = helpers.makeGetFirstSymbolValue([
        'can.updateDeep',
        'can.assignDeep',
        'can.setKeyValue'
    ]);
    var shouldUpdateOrAssign = function (obj) {
        return typeReflections.isPlainObject(obj) || Array.isArray(obj) || !!hasUpdateSymbol(obj);
    };
    function isSerializable(obj) {
        if (typeReflections.isPrimitive(obj)) {
            return true;
        }
        if (hasUpdateSymbol(obj)) {
            return false;
        }
        return typeReflections.isBuiltIn(obj) && !typeReflections.isPlainObject(obj);
    }
    var Object_Keys;
    try {
        Object.keys(1);
        Object_Keys = Object.keys;
    } catch (e) {
        Object_Keys = function (obj) {
            if (typeReflections.isPrimitive(obj)) {
                return [];
            } else {
                return Object.keys(obj);
            }
        };
    }
    function makeSerializer(methodName, symbolsToCheck) {
        return function serializer(value, MapType) {
            if (isSerializable(value)) {
                return value;
            }
            var firstSerialize;
            if (MapType && !serializeMap) {
                serializeMap = {
                    unwrap: new MapType(),
                    serialize: new MapType()
                };
                firstSerialize = true;
            }
            var serialized;
            if (typeReflections.isValueLike(value)) {
                serialized = this[methodName](getSetReflections.getValue(value));
            } else {
                var isListLike = typeReflections.isIteratorLike(value) || typeReflections.isMoreListLikeThanMapLike(value);
                serialized = isListLike ? [] : {};
                if (serializeMap) {
                    if (serializeMap[methodName].has(value)) {
                        return serializeMap[methodName].get(value);
                    } else {
                        serializeMap[methodName].set(value, serialized);
                    }
                }
                for (var i = 0, len = symbolsToCheck.length; i < len; i++) {
                    var serializer = value[symbolsToCheck[i]];
                    if (serializer) {
                        var result = serializer.call(value, serialized);
                        if (firstSerialize) {
                            serializeMap = null;
                        }
                        return result;
                    }
                }
                if (typeof obj === 'function') {
                    if (serializeMap) {
                        serializeMap[methodName].set(value, value);
                    }
                    serialized = value;
                } else if (isListLike) {
                    this.eachIndex(value, function (childValue, index) {
                        serialized[index] = this[methodName](childValue);
                    }, this);
                } else {
                    this.eachKey(value, function (childValue, prop) {
                        serialized[prop] = this[methodName](childValue);
                    }, this);
                }
            }
            if (firstSerialize) {
                serializeMap = null;
            }
            return serialized;
        };
    }
    var makeMap;
    if (typeof Map !== 'undefined') {
        makeMap = function (keys) {
            var map = new Map();
            shapeReflections.eachIndex(keys, function (key) {
                map.set(key, true);
            });
            return map;
        };
    } else {
        makeMap = function (keys) {
            var map = {};
            keys.forEach(function (key) {
                map[key] = true;
            });
            return {
                get: function (key) {
                    return map[key];
                },
                set: function (key, value) {
                    map[key] = value;
                },
                keys: function () {
                    return keys;
                }
            };
        };
    }
    var fastHasOwnKey = function (obj) {
        var hasOwnKey = obj[canSymbol.for('can.hasOwnKey')];
        if (hasOwnKey) {
            return hasOwnKey.bind(obj);
        } else {
            var map = makeMap(shapeReflections.getOwnEnumerableKeys(obj));
            return function (key) {
                return map.get(key);
            };
        }
    };
    function addPatch(patches, patch) {
        var lastPatch = patches[patches.length - 1];
        if (lastPatch) {
            if (lastPatch.deleteCount === lastPatch.insert.length && patch.index - lastPatch.index === lastPatch.deleteCount) {
                lastPatch.insert.push.apply(lastPatch.insert, patch.insert);
                lastPatch.deleteCount += patch.deleteCount;
                return;
            }
        }
        patches.push(patch);
    }
    function updateDeepList(target, source, isAssign) {
        var sourceArray = this.toArray(source);
        var patches = [], lastIndex = -1;
        this.eachIndex(target, function (curVal, index) {
            lastIndex = index;
            if (index >= sourceArray.length) {
                if (!isAssign) {
                    addPatch(patches, {
                        index: index,
                        deleteCount: sourceArray.length - index + 1,
                        insert: []
                    });
                }
                return false;
            }
            var newVal = sourceArray[index];
            if (typeReflections.isPrimitive(curVal) || typeReflections.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false) {
                addPatch(patches, {
                    index: index,
                    deleteCount: 1,
                    insert: [newVal]
                });
            } else {
                this.updateDeep(curVal, newVal);
            }
        }, this);
        if (sourceArray.length > lastIndex) {
            addPatch(patches, {
                index: lastIndex + 1,
                deleteCount: 0,
                insert: sourceArray.slice(lastIndex + 1)
            });
        }
        for (var i = 0, patchLen = patches.length; i < patchLen; i++) {
            var patch = patches[i];
            getSetReflections.splice(target, patch.index, patch.deleteCount, patch.insert);
        }
        return target;
    }
    shapeReflections = {
        each: function (obj, callback, context) {
            if (typeReflections.isIteratorLike(obj) || typeReflections.isMoreListLikeThanMapLike(obj)) {
                return this.eachIndex(obj, callback, context);
            } else {
                return this.eachKey(obj, callback, context);
            }
        },
        eachIndex: function (list, callback, context) {
            if (Array.isArray(list)) {
                return this.eachListLike(list, callback, context);
            } else {
                var iter, iterator = list[canSymbol.iterator];
                if (typeReflections.isIteratorLike(list)) {
                    iter = list;
                } else if (iterator) {
                    iter = iterator.call(list);
                }
                if (iter) {
                    var res, index = 0;
                    while (!(res = iter.next()).done) {
                        if (callback.call(context || list, res.value, index++, list) === false) {
                            break;
                        }
                    }
                } else {
                    this.eachListLike(list, callback, context);
                }
            }
            return list;
        },
        eachListLike: function (list, callback, context) {
            var index = -1;
            var length = list.length;
            if (length === undefined) {
                var size = list[sizeSymbol];
                if (size) {
                    length = size.call(list);
                } else {
                    throw new Error('can-reflect: unable to iterate.');
                }
            }
            while (++index < length) {
                var item = list[index];
                if (callback.call(context || item, item, index, list) === false) {
                    break;
                }
            }
            return list;
        },
        toArray: function (obj) {
            var arr = [];
            this.each(obj, function (value) {
                arr.push(value);
            });
            return arr;
        },
        eachKey: function (obj, callback, context) {
            if (obj) {
                var enumerableKeys = this.getOwnEnumerableKeys(obj);
                var getKeyValue = obj[getKeyValueSymbol] || shiftedGetKeyValue;
                return this.eachIndex(enumerableKeys, function (key) {
                    var value = getKeyValue.call(obj, key);
                    return callback.call(context || obj, value, key, obj);
                });
            }
            return obj;
        },
        'hasOwnKey': function (obj, key) {
            var hasOwnKey = obj[canSymbol.for('can.hasOwnKey')];
            if (hasOwnKey) {
                return hasOwnKey.call(obj, key);
            }
            var getOwnKeys = obj[canSymbol.for('can.getOwnKeys')];
            if (getOwnKeys) {
                var found = false;
                this.eachIndex(getOwnKeys.call(obj), function (objKey) {
                    if (objKey === key) {
                        found = true;
                        return false;
                    }
                });
                return found;
            }
            return obj.hasOwnProperty(key);
        },
        getOwnEnumerableKeys: function (obj) {
            var getOwnEnumerableKeys = obj[canSymbol.for('can.getOwnEnumerableKeys')];
            if (getOwnEnumerableKeys) {
                return getOwnEnumerableKeys.call(obj);
            }
            if (obj[canSymbol.for('can.getOwnKeys')] && obj[canSymbol.for('can.getOwnKeyDescriptor')]) {
                var keys = [];
                this.eachIndex(this.getOwnKeys(obj), function (key) {
                    var descriptor = this.getOwnKeyDescriptor(obj, key);
                    if (descriptor.enumerable) {
                        keys.push(key);
                    }
                }, this);
                return keys;
            } else {
                return Object_Keys(obj);
            }
        },
        getOwnKeys: function (obj) {
            var getOwnKeys = obj[canSymbol.for('can.getOwnKeys')];
            if (getOwnKeys) {
                return getOwnKeys.call(obj);
            } else {
                return Object.getOwnPropertyNames(obj);
            }
        },
        getOwnKeyDescriptor: function (obj, key) {
            var getOwnKeyDescriptor = obj[canSymbol.for('can.getOwnKeyDescriptor')];
            if (getOwnKeyDescriptor) {
                return getOwnKeyDescriptor.call(obj, key);
            } else {
                return Object.getOwnPropertyDescriptor(obj, key);
            }
        },
        unwrap: makeSerializer('unwrap', [canSymbol.for('can.unwrap')]),
        serialize: makeSerializer('serialize', [
            canSymbol.for('can.serialize'),
            canSymbol.for('can.unwrap')
        ]),
        assignMap: function (target, source) {
            var hasOwnKey = fastHasOwnKey(target);
            var getKeyValue = target[getKeyValueSymbol] || shiftedGetKeyValue;
            var setKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;
            this.eachKey(source, function (value, key) {
                if (!hasOwnKey(key) || getKeyValue.call(target, key) !== value) {
                    setKeyValue.call(target, key, value);
                }
            });
            return target;
        },
        assignList: function (target, source) {
            var inserting = this.toArray(source);
            getSetReflections.splice(target, 0, inserting, inserting);
            return target;
        },
        assign: function (target, source) {
            if (typeReflections.isIteratorLike(source) || typeReflections.isMoreListLikeThanMapLike(source)) {
                this.assignList(target, source);
            } else {
                this.assignMap(target, source);
            }
            return target;
        },
        assignDeepMap: function (target, source) {
            var hasOwnKey = fastHasOwnKey(target);
            var getKeyValue = target[getKeyValueSymbol] || shiftedGetKeyValue;
            var setKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;
            this.eachKey(source, function (newVal, key) {
                if (!hasOwnKey(key)) {
                    getSetReflections.setKeyValue(target, key, newVal);
                } else {
                    var curVal = getKeyValue.call(target, key);
                    if (newVal === curVal) {
                    } else if (typeReflections.isPrimitive(curVal) || typeReflections.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false) {
                        setKeyValue.call(target, key, newVal);
                    } else {
                        this.assignDeep(curVal, newVal);
                    }
                }
            }, this);
            return target;
        },
        assignDeepList: function (target, source) {
            return updateDeepList.call(this, target, source, true);
        },
        assignDeep: function (target, source) {
            var assignDeep = target[canSymbol.for('can.assignDeep')];
            if (assignDeep) {
                assignDeep.call(target, source);
            } else if (typeReflections.isMoreListLikeThanMapLike(source)) {
                this.assignDeepList(target, source);
            } else {
                this.assignDeepMap(target, source);
            }
            return target;
        },
        updateMap: function (target, source) {
            var sourceKeyMap = makeMap(this.getOwnEnumerableKeys(source));
            var sourceGetKeyValue = source[getKeyValueSymbol] || shiftedGetKeyValue;
            var targetSetKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;
            this.eachKey(target, function (curVal, key) {
                if (!sourceKeyMap.get(key)) {
                    getSetReflections.deleteKeyValue(target, key);
                    return;
                }
                sourceKeyMap.set(key, false);
                var newVal = sourceGetKeyValue.call(source, key);
                if (newVal !== curVal) {
                    targetSetKeyValue.call(target, key, newVal);
                }
            }, this);
            this.eachIndex(sourceKeyMap.keys(), function (key) {
                if (sourceKeyMap.get(key)) {
                    targetSetKeyValue.call(target, key, sourceGetKeyValue.call(source, key));
                }
            });
            return target;
        },
        updateList: function (target, source) {
            var inserting = this.toArray(source);
            getSetReflections.splice(target, 0, target, inserting);
            return target;
        },
        update: function (target, source) {
            if (typeReflections.isIteratorLike(source) || typeReflections.isMoreListLikeThanMapLike(source)) {
                this.updateList(target, source);
            } else {
                this.updateMap(target, source);
            }
            return target;
        },
        updateDeepMap: function (target, source) {
            var sourceKeyMap = makeMap(this.getOwnEnumerableKeys(source));
            var sourceGetKeyValue = source[getKeyValueSymbol] || shiftedGetKeyValue;
            var targetSetKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;
            this.eachKey(target, function (curVal, key) {
                if (!sourceKeyMap.get(key)) {
                    getSetReflections.deleteKeyValue(target, key);
                    return;
                }
                sourceKeyMap.set(key, false);
                var newVal = sourceGetKeyValue.call(source, key);
                if (typeReflections.isPrimitive(curVal) || typeReflections.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false) {
                    targetSetKeyValue.call(target, key, newVal);
                } else {
                    this.updateDeep(curVal, newVal);
                }
            }, this);
            this.eachIndex(sourceKeyMap.keys(), function (key) {
                if (sourceKeyMap.get(key)) {
                    targetSetKeyValue.call(target, key, sourceGetKeyValue.call(source, key));
                }
            });
            return target;
        },
        updateDeepList: function (target, source) {
            return updateDeepList.call(this, target, source);
        },
        updateDeep: function (target, source) {
            var updateDeep = target[canSymbol.for('can.updateDeep')];
            if (updateDeep) {
                updateDeep.call(target, source);
            } else if (typeReflections.isMoreListLikeThanMapLike(source)) {
                this.updateDeepList(target, source);
            } else {
                this.updateDeepMap(target, source);
            }
            return target;
        },
        'in': function () {
        },
        getAllEnumerableKeys: function () {
        },
        getAllKeys: function () {
        },
        assignSymbols: function (target, source) {
            this.eachKey(source, function (value, key) {
                var symbol = typeReflections.isSymbolLike(canSymbol[key]) ? canSymbol[key] : canSymbol.for(key);
                getSetReflections.setKeyValue(target, symbol, value);
            });
            return target;
        },
        isSerializable: isSerializable,
        size: function (obj) {
            var size = obj[sizeSymbol];
            var count = 0;
            if (size) {
                return size.call(obj);
            } else if (helpers.hasLength(obj)) {
                return obj.length;
            } else if (typeReflections.isListLike(obj)) {
                this.each(obj, function () {
                    count++;
                });
                return count;
            } else if (obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        count++;
                    }
                }
                return count;
            } else {
                return undefined;
            }
        },
        defineInstanceKey: function (cls, key, properties) {
            var defineInstanceKey = cls[canSymbol.for('can.defineInstanceKey')];
            if (defineInstanceKey) {
                return defineInstanceKey.call(cls, key, properties);
            }
            var proto = cls.prototype;
            defineInstanceKey = proto[canSymbol.for('can.defineInstanceKey')];
            if (defineInstanceKey) {
                defineInstanceKey.call(proto, key, properties);
            } else {
                Object.defineProperty(proto, key, shapeReflections.assign({
                    configurable: true,
                    enumerable: !typeReflections.isSymbolLike(key),
                    writable: true
                }, properties));
            }
        }
    };
    shapeReflections.keys = shapeReflections.getOwnEnumerableKeys;
    module.exports = shapeReflections;
});
/*can-reflect@1.11.0#reflections/get-name/get-name*/
define('can-reflect/reflections/get-name/get-name', [
    'require',
    'exports',
    'module',
    'can-symbol',
    'can-reflect/reflections/type/type'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var typeReflections = require('can-reflect/reflections/type/type');
    var getNameSymbol = canSymbol.for('can.getName');
    function setName(obj, nameGetter) {
        if (typeof nameGetter !== 'function') {
            var value = nameGetter;
            nameGetter = function () {
                return value;
            };
        }
        Object.defineProperty(obj, getNameSymbol, { value: nameGetter });
    }
    function getName(obj) {
        var nameGetter = obj[getNameSymbol];
        if (nameGetter) {
            return nameGetter.call(obj);
        }
        if (typeof obj === 'function') {
            return obj.name;
        }
        if (obj.constructor && obj !== obj.constructor) {
            var parent = getName(obj.constructor);
            if (parent) {
                if (typeReflections.isValueLike(obj)) {
                    return parent + '<>';
                }
                if (typeReflections.isMoreListLikeThanMapLike(obj)) {
                    return parent + '[]';
                }
                if (typeReflections.isMapLike(obj)) {
                    return parent + '{}';
                }
            }
        }
        return undefined;
    }
    module.exports = {
        setName: setName,
        getName: getName
    };
});
/*can-reflect@1.11.0#types/map*/
define('can-reflect/types/map', [
    'require',
    'exports',
    'module',
    'can-reflect/reflections/shape/shape',
    'can-symbol'
], function (require, exports, module) {
    var shape = require('can-reflect/reflections/shape/shape');
    var CanSymbol = require('can-symbol');
    function keysPolyfill() {
        var keys = [];
        var currentIndex = 0;
        this.forEach(function (val, key) {
            keys.push(key);
        });
        return {
            next: function () {
                return {
                    value: keys[currentIndex],
                    done: currentIndex++ === keys.length
                };
            }
        };
    }
    if (typeof Map !== 'undefined') {
        shape.assignSymbols(Map.prototype, {
            'can.getOwnEnumerableKeys': Map.prototype.keys,
            'can.setKeyValue': Map.prototype.set,
            'can.getKeyValue': Map.prototype.get,
            'can.deleteKeyValue': Map.prototype['delete'],
            'can.hasOwnKey': Map.prototype.has
        });
        if (typeof Map.prototype.keys !== 'function') {
            Map.prototype.keys = Map.prototype[CanSymbol.for('can.getOwnEnumerableKeys')] = keysPolyfill;
        }
    }
    if (typeof WeakMap !== 'undefined') {
        shape.assignSymbols(WeakMap.prototype, {
            'can.getOwnEnumerableKeys': function () {
                throw new Error('can-reflect: WeakMaps do not have enumerable keys.');
            },
            'can.setKeyValue': WeakMap.prototype.set,
            'can.getKeyValue': WeakMap.prototype.get,
            'can.deleteKeyValue': WeakMap.prototype['delete'],
            'can.hasOwnKey': WeakMap.prototype.has
        });
    }
});
/*can-reflect@1.11.0#types/set*/
define('can-reflect/types/set', [
    'require',
    'exports',
    'module',
    'can-reflect/reflections/shape/shape',
    'can-symbol'
], function (require, exports, module) {
    var shape = require('can-reflect/reflections/shape/shape');
    var CanSymbol = require('can-symbol');
    if (typeof Set !== 'undefined') {
        shape.assignSymbols(Set.prototype, {
            'can.isMoreListLikeThanMapLike': true,
            'can.updateValues': function (index, removing, adding) {
                if (removing !== adding) {
                    shape.each(removing, function (value) {
                        this.delete(value);
                    }, this);
                }
                shape.each(adding, function (value) {
                    this.add(value);
                }, this);
            },
            'can.size': function () {
                return this.size;
            }
        });
        if (typeof Set.prototype[CanSymbol.iterator] !== 'function') {
            Set.prototype[CanSymbol.iterator] = function () {
                var arr = [];
                var currentIndex = 0;
                this.forEach(function (val) {
                    arr.push(val);
                });
                return {
                    next: function () {
                        return {
                            value: arr[currentIndex],
                            done: currentIndex++ === arr.length
                        };
                    }
                };
            };
        }
    }
    if (typeof WeakSet !== 'undefined') {
        shape.assignSymbols(WeakSet.prototype, {
            'can.isListLike': true,
            'can.isMoreListLikeThanMapLike': true,
            'can.updateValues': function (index, removing, adding) {
                if (removing !== adding) {
                    shape.each(removing, function (value) {
                        this.delete(value);
                    }, this);
                }
                shape.each(adding, function (value) {
                    this.add(value);
                }, this);
            },
            'can.size': function () {
                throw new Error('can-reflect: WeakSets do not have enumerable keys.');
            }
        });
    }
});
/*can-reflect@1.11.0#can-reflect*/
define('can-reflect', [
    'require',
    'exports',
    'module',
    'can-reflect/reflections/call/call',
    'can-reflect/reflections/get-set/get-set',
    'can-reflect/reflections/observe/observe',
    'can-reflect/reflections/shape/shape',
    'can-reflect/reflections/type/type',
    'can-reflect/reflections/get-name/get-name',
    'can-namespace',
    'can-reflect/types/map',
    'can-reflect/types/set'
], function (require, exports, module) {
    var functionReflections = require('can-reflect/reflections/call/call');
    var getSet = require('can-reflect/reflections/get-set/get-set');
    var observe = require('can-reflect/reflections/observe/observe');
    var shape = require('can-reflect/reflections/shape/shape');
    var type = require('can-reflect/reflections/type/type');
    var getName = require('can-reflect/reflections/get-name/get-name');
    var namespace = require('can-namespace');
    var reflect = {};
    [
        functionReflections,
        getSet,
        observe,
        shape,
        type,
        getName
    ].forEach(function (reflections) {
        for (var prop in reflections) {
            reflect[prop] = reflections[prop];
            if (typeof reflections[prop] === 'function') {
                var propDescriptor = Object.getOwnPropertyDescriptor(reflections[prop], 'name');
                if (!propDescriptor || propDescriptor.writable && propDescriptor.configurable) {
                    Object.defineProperty(reflections[prop], 'name', { value: 'canReflect.' + prop });
                }
            }
        }
    });
    require('can-reflect/types/map');
    require('can-reflect/types/set');
    module.exports = namespace.Reflect = reflect;
});
/*can-util@3.10.18#js/is-promise-like/is-promise-like*/
define('can-util/js/is-promise-like/is-promise-like', function (require, exports, module) {
    'use strict';
    module.exports = function (obj) {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    };
});
/*can-queues@0.3.1#queue-state*/
define('can-queues/queue-state', function (require, exports, module) {
    module.exports = { lastTask: null };
});
/*can-queues@0.3.1#queue*/
define('can-queues/queue', [
    'require',
    'exports',
    'module',
    'can-queues/queue-state',
    'can-log/dev/dev',
    'can-assign'
], function (require, exports, module) {
    var queueState = require('can-queues/queue-state');
    var canDev = require('can-log/dev/dev');
    var assign = require('can-assign');
    function noOperation() {
    }
    var Queue = function (name, callbacks) {
        this.callbacks = assign({
            onFirstTask: noOperation,
            onComplete: function () {
                queueState.lastTask = null;
            }
        }, callbacks || {});
        this.name = name;
        this.index = 0;
        this.tasks = [];
        this._log = false;
    };
    Queue.prototype.constructor = Queue;
    Queue.noop = noOperation;
    Queue.prototype.enqueue = function (fn, context, args, meta) {
        var len = this.tasks.push({
            fn: fn,
            context: context,
            args: args,
            meta: meta || {}
        });
        this._logEnqueue(this.tasks[len - 1]);
        if (len === 1) {
            this.callbacks.onFirstTask(this);
        }
    };
    Queue.prototype.flush = function () {
        while (this.index < this.tasks.length) {
            var task = this.tasks[this.index++];
            this._logFlush(task);
            task.fn.apply(task.context, task.args);
        }
        this.index = 0;
        this.tasks = [];
        this.callbacks.onComplete(this);
    };
    Queue.prototype.log = function () {
        this._log = arguments.length ? arguments[0] : true;
    };
    Queue.prototype._logEnqueue = function (task) {
        task.meta.parentTask = queueState.lastTask;
        task.meta.stack = this;
        if (this._log === true || this._log === 'enqueue') {
            var log = task.meta.log ? task.meta.log.concat(task) : [
                task.fn.name,
                task
            ];
            canDev.log.apply(canDev, [this.name + ' enqueuing:'].concat(log));
        }
    };
    Queue.prototype._logFlush = function (task) {
        if (this._log === true || this._log === 'flush') {
            var log = task.meta.log ? task.meta.log.concat(task) : [
                task.fn.name,
                task
            ];
            canDev.log.apply(canDev, [this.name + ' running  :'].concat(log));
        }
        queueState.lastTask = task;
    };
    module.exports = Queue;
});
/*can-queues@0.3.1#priority-queue*/
define('can-queues/priority-queue', [
    'require',
    'exports',
    'module',
    'can-queues/queue'
], function (require, exports, module) {
    var Queue = require('can-queues/queue');
    var PriorityQueue = function () {
        Queue.apply(this, arguments);
        this.taskMap = new Map();
        this.taskContainersByPriority = [];
        this.curPriorityIndex = Infinity;
        this.curPriorityMax = 0;
        this.isFlushing = false;
        this.tasksRemaining = 0;
    };
    PriorityQueue.prototype = Object.create(Queue.prototype);
    PriorityQueue.prototype.constructor = PriorityQueue;
    PriorityQueue.prototype.enqueue = function (fn, context, args, meta) {
        if (!this.taskMap.has(fn)) {
            this.tasksRemaining++;
            var isFirst = this.taskContainersByPriority.length === 0;
            var task = {
                fn: fn,
                context: context,
                args: args,
                meta: meta || {}
            };
            var taskContainer = this.getTaskContainerAndUpdateRange(task);
            taskContainer.tasks.push(task);
            this.taskMap.set(fn, task);
            this._logEnqueue(task);
            if (isFirst) {
                this.callbacks.onFirstTask(this);
            }
        }
    };
    PriorityQueue.prototype.getTaskContainerAndUpdateRange = function (task) {
        var priority = task.meta.priority || 0;
        if (priority < this.curPriorityIndex) {
            this.curPriorityIndex = priority;
        }
        if (priority > this.curPriorityMax) {
            this.curPriorityMax = priority;
        }
        var tcByPriority = this.taskContainersByPriority;
        var taskContainer = tcByPriority[priority];
        if (!taskContainer) {
            taskContainer = tcByPriority[priority] = {
                tasks: [],
                index: 0
            };
        }
        return taskContainer;
    };
    PriorityQueue.prototype.flush = function () {
        if (this.isFlushing) {
            return;
        }
        this.isFlushing = true;
        while (true) {
            if (this.curPriorityIndex <= this.curPriorityMax) {
                var taskContainer = this.taskContainersByPriority[this.curPriorityIndex];
                if (taskContainer && taskContainer.tasks.length > taskContainer.index) {
                    var task = taskContainer.tasks[taskContainer.index++];
                    this._logFlush(task);
                    this.tasksRemaining--;
                    this.taskMap['delete'](task.fn);
                    task.fn.apply(task.context, task.args);
                } else {
                    this.curPriorityIndex++;
                }
            } else {
                this.taskMap = new Map();
                this.curPriorityIndex = Infinity;
                this.curPriorityMax = 0;
                this.taskContainersByPriority = [];
                this.isFlushing = false;
                this.callbacks.onComplete(this);
                return;
            }
        }
    };
    PriorityQueue.prototype.isEnqueued = function (fn) {
        return this.taskMap.has(fn);
    };
    PriorityQueue.prototype.flushQueuedTask = function (fn) {
        var task = this.taskMap.get(fn);
        if (task) {
            var priority = task.meta.priority || 0;
            var taskContainer = this.taskContainersByPriority[priority];
            var index = taskContainer.tasks.indexOf(task, taskContainer.index);
            if (index >= 0) {
                taskContainer.tasks.splice(index, 1);
                this._logFlush(task);
                this.tasksRemaining--;
                this.taskMap['delete'](task.fn);
                task.fn.apply(task.context, task.args);
            }
        }
    };
    PriorityQueue.prototype.tasksRemainingCount = function () {
        return this.tasksRemaining;
    };
    module.exports = PriorityQueue;
});
/*can-queues@0.3.1#completion-queue*/
define('can-queues/completion-queue', [
    'require',
    'exports',
    'module',
    'can-queues/queue'
], function (require, exports, module) {
    var Queue = require('can-queues/queue');
    var CompletionQueue = function () {
        Queue.apply(this, arguments);
        this.flushCount = 0;
    };
    CompletionQueue.prototype = Object.create(Queue.prototype);
    CompletionQueue.prototype.constructor = CompletionQueue;
    CompletionQueue.prototype.flush = function () {
        if (this.flushCount === 0) {
            this.flushCount++;
            while (this.index < this.tasks.length) {
                var task = this.tasks[this.index++];
                this._logFlush(task);
                task.fn.apply(task.context, task.args);
            }
            this.index = 0;
            this.tasks = [];
            this.flushCount--;
            this.callbacks.onComplete(this);
        }
    };
    module.exports = CompletionQueue;
});
/*can-queues@0.3.1#can-queues*/
define('can-queues', [
    'require',
    'exports',
    'module',
    'can-util/js/dev/dev',
    'can-queues/queue',
    'can-queues/priority-queue',
    'can-queues/queue-state',
    'can-queues/completion-queue',
    'can-namespace'
], function (require, exports, module) {
    var canDev = require('can-util/js/dev/dev');
    var Queue = require('can-queues/queue');
    var PriorityQueue = require('can-queues/priority-queue');
    var queueState = require('can-queues/queue-state');
    var CompletionQueue = require('can-queues/completion-queue');
    var ns = require('can-namespace');
    var batchStartCounter = 0;
    var addedTask = false;
    var isFlushing = false;
    var batchNum = 0;
    var batchData;
    var queueNames = [
        'notify',
        'derive',
        'domUI',
        'mutate'
    ];
    var NOTIFY_QUEUE, DERIVE_QUEUE, DOM_UI_QUEUE, MUTATE_QUEUE;
    NOTIFY_QUEUE = new Queue('NOTIFY', {
        onComplete: function () {
            DERIVE_QUEUE.flush();
        },
        onFirstTask: function () {
            if (!batchStartCounter) {
                NOTIFY_QUEUE.flush();
            } else {
                addedTask = true;
            }
        }
    });
    DERIVE_QUEUE = new PriorityQueue('DERIVE', {
        onComplete: function () {
            DOM_UI_QUEUE.flush();
        },
        onFirstTask: function () {
            addedTask = true;
        }
    });
    DOM_UI_QUEUE = new CompletionQueue('DOM_UI', {
        onComplete: function () {
            MUTATE_QUEUE.flush();
        },
        onFirstTask: function () {
            addedTask = true;
        }
    });
    MUTATE_QUEUE = new Queue('MUTATE', {
        onComplete: function () {
            queueState.lastTask = null;
            isFlushing = false;
        },
        onFirstTask: function () {
            addedTask = true;
        }
    });
    var queues = {
        Queue: Queue,
        PriorityQueue: PriorityQueue,
        CompletionQueue: CompletionQueue,
        notifyQueue: NOTIFY_QUEUE,
        deriveQueue: DERIVE_QUEUE,
        domUIQueue: DOM_UI_QUEUE,
        mutateQueue: MUTATE_QUEUE,
        batch: {
            start: function () {
                batchStartCounter++;
                if (batchStartCounter === 1) {
                    batchNum++;
                    batchData = { number: batchNum };
                }
            },
            stop: function () {
                batchStartCounter--;
                if (batchStartCounter === 0) {
                    if (addedTask) {
                        addedTask = false;
                        isFlushing = true;
                        NOTIFY_QUEUE.flush();
                    }
                }
            },
            isCollecting: function () {
                return batchStartCounter > 0;
            },
            number: function () {
                return batchNum;
            },
            data: function () {
                return batchData;
            }
        },
        enqueueByQueue: function enqueueByQueue(fnByQueue, context, args, makeMeta, reasonLog) {
            if (fnByQueue) {
                queues.batch.start();
                queueNames.forEach(function (queueName) {
                    var name = queueName + 'Queue';
                    var QUEUE = queues[name];
                    var tasks = fnByQueue[queueName];
                    if (tasks !== undefined) {
                        tasks.forEach(function (fn) {
                            var meta = makeMeta != null ? makeMeta(fn, context, args) : {};
                            meta.reasonLog = reasonLog;
                            QUEUE.enqueue(fn, context, args, meta);
                        });
                    }
                });
                queues.batch.stop();
            }
        },
        stack: function () {
            var current = queueState.lastTask;
            var stack = [];
            while (current) {
                stack.unshift(current);
                current = current.meta.parentTask;
            }
            return stack;
        },
        logStack: function () {
            var stack = this.stack();
            stack.forEach(function (task, i) {
                var meta = task.meta;
                if (i === 0 && meta && meta.reasonLog) {
                    canDev.log.apply(canDev, meta.reasonLog);
                }
                var log = meta && meta.log ? meta.log : [
                    task.fn.name,
                    task
                ];
                canDev.log.apply(canDev, [task.meta.stack.name + ' ran task:'].concat(log));
            });
        },
        taskCount: function () {
            console.warn('THIS IS NOT USED RIGHT?');
            return NOTIFY_QUEUE.tasks.length + DERIVE_QUEUE.tasks.length + DOM_UI_QUEUE.tasks.length + MUTATE_QUEUE.tasks.length;
        },
        flush: function () {
            NOTIFY_QUEUE.flush();
        },
        log: function () {
            NOTIFY_QUEUE.log.apply(NOTIFY_QUEUE, arguments);
            DERIVE_QUEUE.log.apply(DERIVE_QUEUE, arguments);
            DOM_UI_QUEUE.log.apply(DOM_UI_QUEUE, arguments);
            MUTATE_QUEUE.log.apply(MUTATE_QUEUE, arguments);
        }
    };
    if (ns.queues) {
        throw new Error('You can\'t have two versions of can-queues, check your dependencies');
    } else {
        module.exports = ns.queues = queues;
    }
});
/*can-key-tree@0.1.2#can-key-tree*/
define('can-key-tree', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    var reflect = require('can-reflect');
    function isBuiltInPrototype(obj) {
        if (obj === Object.prototype) {
            return true;
        }
        var protoString = Object.prototype.toString.call(obj);
        var isNotObjObj = protoString !== '[object Object]';
        var isObjSomething = protoString.indexOf('[object ') !== -1;
        return isNotObjObj && isObjSomething;
    }
    function getDeepSize(root, level) {
        if (level === 0) {
            return reflect.size(root);
        } else if (reflect.size(root) === 0) {
            return 0;
        } else {
            var count = 0;
            reflect.each(root, function (value) {
                count += getDeepSize(value, level - 1);
            });
            return count;
        }
    }
    function getDeep(node, items, depth, maxDepth) {
        if (!node) {
            return;
        }
        if (maxDepth === depth) {
            if (reflect.isMoreListLikeThanMapLike(node)) {
                reflect.addValues(items, reflect.toArray(node));
            } else {
                throw new Error('can-key-tree: Map-type leaf containers are not supported yet.');
            }
        } else {
            reflect.each(node, function (value) {
                getDeep(value, items, depth + 1, maxDepth);
            });
        }
    }
    function clearDeep(node, depth, maxDepth) {
        if (maxDepth === depth) {
            if (reflect.isMoreListLikeThanMapLike(node)) {
                reflect.removeValues(node, reflect.toArray(node));
            } else {
                throw new Error('can-key-tree: Map-type leaf containers are not supported yet.');
            }
        } else {
            reflect.each(node, function (value, key) {
                clearDeep(value, depth + 1, maxDepth);
                reflect.deleteKeyValue(node, key);
            });
        }
    }
    var KeyTree = function (treeStructure, callbacks) {
        this.callbacks = callbacks || {};
        this.treeStructure = treeStructure;
        var FirstConstructor = treeStructure[0];
        if (reflect.isConstructorLike(FirstConstructor)) {
            this.root = new FirstConstructor();
        } else {
            this.root = FirstConstructor;
        }
    };
    reflect.assign(KeyTree.prototype, {
        add: function (keys) {
            if (keys.length > this.treeStructure.length) {
                throw new Error('can-key-tree: Can not add path deeper than tree.');
            }
            var place = this.root;
            var rootWasEmpty = reflect.size(this.root) === 0;
            for (var i = 0; i < keys.length - 1; i++) {
                var key = keys[i];
                var childNode = reflect.getKeyValue(place, key);
                if (!childNode) {
                    var Constructor = this.treeStructure[i + 1];
                    if (isBuiltInPrototype(Constructor.prototype)) {
                        childNode = new Constructor();
                    } else {
                        childNode = new Constructor(key);
                    }
                    reflect.setKeyValue(place, key, childNode);
                }
                place = childNode;
            }
            if (reflect.isMoreListLikeThanMapLike(place)) {
                reflect.addValues(place, [keys[keys.length - 1]]);
            } else {
                throw new Error('can-key-tree: Map types are not supported yet.');
            }
            if (rootWasEmpty && this.callbacks.onFirst) {
                this.callbacks.onFirst.call(this);
            }
            return this;
        },
        getNode: function (keys) {
            var node = this.root;
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                node = reflect.getKeyValue(node, key);
                if (!node) {
                    return;
                }
            }
            return node;
        },
        get: function (keys) {
            var node = this.getNode(keys);
            if (this.treeStructure.length === keys.length) {
                return node;
            } else {
                var Type = this.treeStructure[this.treeStructure.length - 1];
                var items = new Type();
                getDeep(node, items, keys.length, this.treeStructure.length - 1);
                return items;
            }
        },
        delete: function (keys) {
            var parentNode = this.root, path = [this.root], lastKey = keys[keys.length - 1];
            for (var i = 0; i < keys.length - 1; i++) {
                var key = keys[i];
                var childNode = reflect.getKeyValue(parentNode, key);
                if (childNode === undefined) {
                    return false;
                } else {
                    path.push(childNode);
                }
                parentNode = childNode;
            }
            if (!keys.length) {
                clearDeep(parentNode, 0, this.treeStructure.length - 1);
            } else if (keys.length === this.treeStructure.length) {
                if (reflect.isMoreListLikeThanMapLike(parentNode)) {
                    reflect.removeValues(parentNode, [lastKey]);
                } else {
                    throw new Error('can-key-tree: Map types are not supported yet.');
                }
            } else {
                var nodeToRemove = reflect.getKeyValue(parentNode, lastKey);
                if (nodeToRemove !== undefined) {
                    clearDeep(nodeToRemove, keys.length, this.treeStructure.length - 1);
                    reflect.deleteKeyValue(parentNode, lastKey);
                } else {
                    return false;
                }
            }
            for (i = path.length - 2; i >= 0; i--) {
                if (reflect.size(parentNode) === 0) {
                    parentNode = path[i];
                    reflect.deleteKeyValue(parentNode, keys[i]);
                } else {
                    break;
                }
            }
            if (this.callbacks.onEmpty && reflect.size(this.root) === 0) {
                this.callbacks.onEmpty.call(this);
            }
            return true;
        },
        size: function () {
            return getDeepSize(this.root, this.treeStructure.length - 1);
        }
    });
    module.exports = KeyTree;
});
/*can-reflect-promise@2.0.0-pre.5#can-reflect-promise*/
define('can-reflect-promise', [
    'require',
    'exports',
    'module',
    'can-reflect',
    'can-symbol',
    'can-observation-recorder',
    'can-queues',
    'can-key-tree',
    'can-util/js/dev/dev'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var ObservationRecorder = require('can-observation-recorder');
    var queues = require('can-queues');
    var KeyTree = require('can-key-tree');
    var dev = require('can-util/js/dev/dev');
    var getKeyValueSymbol = canSymbol.for('can.getKeyValue'), observeDataSymbol = canSymbol.for('can.meta');
    var promiseDataPrototype = {
        isPending: true,
        state: 'pending',
        isResolved: false,
        isRejected: false,
        value: undefined,
        reason: undefined
    };
    function setVirtualProp(promise, property, value) {
        var observeData = promise[observeDataSymbol];
        var old = observeData[property];
        observeData[property] = value;
        queues.enqueueByQueue(observeData.handlers.getNode([property]), promise, [
            value,
            old
        ], function () {
            return {};
        }, [
            'Promise',
            promise,
            'resolved with value',
            value,
            'and changed virtual property: ' + property
        ]);
    }
    function initPromise(promise) {
        var observeData = promise[observeDataSymbol];
        if (!observeData) {
            Object.defineProperty(promise, observeDataSymbol, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: Object.create(promiseDataPrototype)
            });
            observeData = promise[observeDataSymbol];
            observeData.handlers = new KeyTree([
                Object,
                Object,
                Array
            ]);
        }
        promise.then(function (value) {
            queues.batch.start();
            setVirtualProp(promise, 'isPending', false);
            setVirtualProp(promise, 'isResolved', true);
            setVirtualProp(promise, 'value', value);
            setVirtualProp(promise, 'state', 'resolved');
            queues.batch.stop();
        }, function (reason) {
            queues.batch.start();
            setVirtualProp(promise, 'isPending', false);
            setVirtualProp(promise, 'isRejected', true);
            setVirtualProp(promise, 'reason', reason);
            setVirtualProp(promise, 'state', 'rejected');
            queues.batch.stop();
            dev.error('Failed promise:', reason);
        });
    }
    function setupPromise(value) {
        var oldPromiseFn;
        var proto = 'getPrototypeOf' in Object ? Object.getPrototypeOf(value) : value.__proto__;
        if (value[getKeyValueSymbol] && value[observeDataSymbol]) {
            return;
        }
        if (proto === null || proto === Object.prototype) {
            proto = value;
            if (typeof proto.promise === 'function') {
                oldPromiseFn = proto.promise;
                proto.promise = function () {
                    var result = oldPromiseFn.call(proto);
                    setupPromise(result);
                    return result;
                };
            }
        }
        canReflect.assignSymbols(proto, {
            'can.getKeyValue': function (key) {
                if (!this[observeDataSymbol]) {
                    initPromise(this);
                }
                ObservationRecorder.add(this, key);
                switch (key) {
                case 'state':
                case 'isPending':
                case 'isResolved':
                case 'isRejected':
                case 'value':
                case 'reason':
                    return this[observeDataSymbol][key];
                default:
                    return this[key];
                }
            },
            'can.getValue': function () {
                return this[getKeyValueSymbol]('value');
            },
            'can.isValueLike': false,
            'can.onKeyValue': function (key, handler, queue) {
                if (!this[observeDataSymbol]) {
                    initPromise(this);
                }
                this[observeDataSymbol].handlers.add([
                    key,
                    queue || 'mutate',
                    handler
                ]);
            },
            'can.offKeyValue': function (key, handler, queue) {
                if (!this[observeDataSymbol]) {
                    initPromise(this);
                }
                this[observeDataSymbol].handlers.delete([
                    key,
                    queue || 'mutate',
                    handler
                ]);
            }
        });
    }
    module.exports = setupPromise;
});
/*can-stache-key@1.0.0-pre.15#can-stache-key*/
define('can-stache-key', [
    'require',
    'exports',
    'module',
    'can-observation-recorder',
    'can-log/dev/dev',
    'can-util/js/each/each',
    'can-symbol',
    'can-reflect',
    'can-util/js/is-promise-like/is-promise-like',
    'can-reflect-promise'
], function (require, exports, module) {
    var ObservationRecorder = require('can-observation-recorder');
    var dev = require('can-log/dev/dev');
    var each = require('can-util/js/each/each');
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    var isPromiseLike = require('can-util/js/is-promise-like/is-promise-like');
    var canReflectPromise = require('can-reflect-promise');
    var getValueSymbol = canSymbol.for('can.getValue');
    var setValueSymbol = canSymbol.for('can.setValue');
    var isValueLikeSymbol = canSymbol.for('can.isValueLike');
    var peek = ObservationRecorder.ignore(canReflect.getKeyValue.bind(canReflect));
    var observeReader;
    var bindName = Function.prototype.bind;
    bindName = function (source) {
        var fn = Function.prototype.bind.call(this, source);
        Object.defineProperty(fn, 'name', { value: canReflect.getName(source) + '.' + canReflect.getName(this) });
        return fn;
    };
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
            if (ObservationRecorder.trapsCount()) {
                ObservationRecorder.addMany(getObserves());
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
                getObserves = ObservationRecorder.trap();
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
                if (i < reads.length && (cur === null || cur === undefined)) {
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
                test: function (value) {
                    return value && canReflect.isFunctionLike(value) && !canReflect.isConstructorLike(value);
                },
                read: function (value, i, reads, options, state, prev) {
                    if (options.callMethodsOnObservables && canReflect.isObservableLike(prev) && canReflect.isMapLike(prev)) {
                        dev.warn('can-stache-key: read() called with `callMethodsOnObservables: true`.');
                        return value.apply(prev, options.args || []);
                    }
                    return options.proxyMethods !== false ? bindName.call(value, prev) : value;
                }
            },
            {
                name: 'isValueLike',
                test: function (value, i, reads, options) {
                    return value && value[getValueSymbol] && value[isValueLikeSymbol] !== false && (options.foundAt || !isAt(i, reads));
                },
                read: function (value, i, reads, options) {
                    if (options.readCompute === false && i === reads.length) {
                        return value;
                    }
                    return canReflect.getValue(value);
                },
                write: function (base, newVal) {
                    if (base[setValueSymbol]) {
                        base[setValueSymbol](newVal);
                    } else if (base.set) {
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
                test: function (value) {
                    if (isPromiseLike(value) || typeof value === 'object' && value && typeof value.then === 'function') {
                        canReflectPromise(value);
                    }
                    return canReflect.isObservableLike(value) && canReflect.isMapLike(value);
                },
                read: function (value, prop) {
                    var res = canReflect.getKeyValue(value, prop.key);
                    if (res !== undefined) {
                        return res;
                    } else {
                        return value[prop.key];
                    }
                },
                write: canReflect.setKeyValue
            },
            {
                name: 'object',
                test: function () {
                    return true;
                },
                read: function (value, prop, i, options) {
                    if (value == null) {
                        return undefined;
                    } else {
                        if (typeof value === 'object') {
                            if (prop.key in value) {
                                return value[prop.key];
                            } else if (prop.at && specialRead[prop.key] && '@' + prop.key in value) {
                                options.foundAt = true;
                                dev.warn('Use %' + prop.key + ' in place of @' + prop.key + '.');
                                return value['@' + prop.key];
                            }
                        } else {
                            return value[prop.key];
                        }
                    }
                },
                write: function (base, prop, newVal) {
                    var propValue = base[prop];
                    if (canReflect.isMapLike(propValue) && newVal && typeof newVal === 'object') {
                        dev.warn('can-stache-key: Merging data into "' + prop + '" because its parent is non-observable');
                        canReflect.update(propValue, newVal);
                    } else if (canReflect.isValueLike(propValue) && canReflect.isObservableLike(propValue)) {
                        canReflect.setValue(propValue, newVal);
                    } else {
                        base[prop] = newVal;
                    }
                }
            }
        ],
        reads: function (keyArg) {
            var key = '' + keyArg;
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
            options = options || {};
            if (keys.length > 1) {
                last = keys.pop();
                parent = observeReader.read(parent, keys, options).value;
                keys.push(last);
            } else {
                last = keys[0];
            }
            var keyValue = peek(parent, last.key);
            if (observeReader.valueReadersMap.isValueLike.test(keyValue, keys.length - 1, keys, options)) {
                observeReader.valueReadersMap.isValueLike.write(keyValue, value, options);
            } else {
                if (observeReader.valueReadersMap.isValueLike.test(parent, keys.length - 1, keys, options)) {
                    parent = parent[getValueSymbol]();
                }
                if (observeReader.propertyReadersMap.map.test(parent)) {
                    observeReader.propertyReadersMap.map.write(parent, last.key, value, options);
                } else if (observeReader.propertyReadersMap.object.test(parent)) {
                    observeReader.propertyReadersMap.object.write(parent, last.key, value, options);
                    if (options.observation) {
                        options.observation.update();
                    }
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
/*can-define-lazy-value@1.0.1#define-lazy-value*/
define('can-define-lazy-value', function (require, exports, module) {
    module.exports = function defineLazyValue(obj, prop, initializer, writable) {
        Object.defineProperty(obj, prop, {
            configurable: true,
            get: function () {
                Object.defineProperty(this, prop, {
                    value: undefined,
                    writable: true
                });
                var value = initializer.call(this, obj, prop);
                Object.defineProperty(this, prop, {
                    value: value,
                    writable: !!writable
                });
                return value;
            },
            set: function (value) {
                Object.defineProperty(this, prop, {
                    value: value,
                    writable: !!writable
                });
                return value;
            }
        });
    };
});
/*can-event-queue@0.15.2#dependency-record/merge*/
define('can-event-queue/dependency-record/merge', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var mergeValueDependencies = function mergeValueDependencies(obj, source) {
        var sourceValueDeps = source.valueDependencies;
        if (sourceValueDeps) {
            var destValueDeps = obj.valueDependencies;
            if (!destValueDeps) {
                destValueDeps = new Set();
                obj.valueDependencies = destValueDeps;
            }
            canReflect.eachIndex(sourceValueDeps, function (dep) {
                destValueDeps.add(dep);
            });
        }
    };
    var mergeKeyDependencies = function mergeKeyDependencies(obj, source) {
        var sourcekeyDeps = source.keyDependencies;
        if (sourcekeyDeps) {
            var destKeyDeps = obj.keyDependencies;
            if (!destKeyDeps) {
                destKeyDeps = new Map();
                obj.keyDependencies = destKeyDeps;
            }
            canReflect.eachKey(sourcekeyDeps, function (keys, obj) {
                var entry = destKeyDeps.get(obj);
                if (!entry) {
                    entry = new Set();
                    destKeyDeps.set(obj, entry);
                }
                canReflect.eachIndex(keys, function (key) {
                    entry.add(key);
                });
            });
        }
    };
    module.exports = function mergeDependencyRecords(object, source) {
        mergeKeyDependencies(object, source);
        mergeValueDependencies(object, source);
        return object;
    };
});
/*can-event-queue@0.15.2#value/value*/
define('can-event-queue/value/value', [
    'require',
    'exports',
    'module',
    'can-queues',
    'can-key-tree',
    'can-reflect',
    'can-define-lazy-value',
    'can-event-queue/dependency-record/merge'
], function (require, exports, module) {
    var queues = require('can-queues');
    var KeyTree = require('can-key-tree');
    var canReflect = require('can-reflect');
    var defineLazyValue = require('can-define-lazy-value');
    var mergeDependencyRecords = require('can-event-queue/dependency-record/merge');
    var properties = {
        on: function (handler, queue) {
            this.handlers.add([
                queue || 'mutate',
                handler
            ]);
        },
        off: function (handler, queueName) {
            if (handler === undefined) {
                if (queueName === undefined) {
                    this.handlers.delete([]);
                } else {
                    this.handlers.delete([queueName]);
                }
            } else {
                this.handlers.delete([
                    queueName || 'mutate',
                    handler
                ]);
            }
        }
    };
    var symbols = {
        'can.onValue': properties.on,
        'can.offValue': properties.off,
        'can.dispatch': function (value, old) {
            queues.enqueueByQueue(this.handlers.getNode([]), this, [
                value,
                old
            ], null, [
                canReflect.getName(this),
                'changed to',
                value,
                'from',
                old
            ]);
            if (typeof this._log === 'function') {
                this._log(old, value);
            }
        },
        'can.getWhatIChange': function getWhatIChange() {
            var whatIChange = {};
            var notifyHandlers = this.handlers.get(['notify']);
            var mutateHandlers = [].concat(this.handlers.get(['mutate']), this.handlers.get(['domUI']));
            if (notifyHandlers.length) {
                notifyHandlers.forEach(function (handler) {
                    var changes = canReflect.getChangesDependencyRecord(handler);
                    if (changes) {
                        var record = whatIChange.derive;
                        if (!record) {
                            record = whatIChange.derive = {};
                        }
                        mergeDependencyRecords(record, changes);
                    }
                });
            }
            if (mutateHandlers.length) {
                mutateHandlers.forEach(function (handler) {
                    var changes = canReflect.getChangesDependencyRecord(handler);
                    if (changes) {
                        var record = whatIChange.mutate;
                        if (!record) {
                            record = whatIChange.mutate = {};
                        }
                        mergeDependencyRecords(record, changes);
                    }
                });
            }
            return Object.keys(whatIChange).length ? whatIChange : undefined;
        },
        'can.isBound': function isBound() {
            return this.handlers.size() > 0;
        }
    };
    function defineLazyHandlers() {
        return new KeyTree([
            Object,
            Array
        ], {
            onFirst: this.onBound !== undefined && this.onBound.bind(this),
            onEmpty: this.onUnbound !== undefined && this.onUnbound.bind(this)
        });
    }
    var mixinValueEventBindings = function (obj) {
        canReflect.assign(obj, properties);
        canReflect.assignSymbols(obj, symbols);
        defineLazyValue(obj, 'handlers', defineLazyHandlers, true);
        return obj;
    };
    mixinValueEventBindings.addHandlers = function (obj, callbacks) {
        console.warn('can-event-queue/value: Avoid using addHandlers. Add onBound and onUnbound methods instead.');
        obj.handlers = new KeyTree([
            Object,
            Array
        ], callbacks);
        return obj;
    };
    module.exports = mixinValueEventBindings;
});
/*can-observation@4.0.0-pre.24#recorder-dependency-helpers*/
define('can-observation/recorder-dependency-helpers', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    function addNewKeyDependenciesIfNotInOld(event) {
        if (this.oldEventSet === undefined || this.oldEventSet['delete'](event) === false) {
            canReflect.onKeyValue(this.observable, event, this.onDependencyChange, 'notify');
        }
    }
    function addObservablesNewKeyDependenciesIfNotInOld(eventSet, observable) {
        eventSet.forEach(addNewKeyDependenciesIfNotInOld, {
            onDependencyChange: this.onDependencyChange,
            observable: observable,
            oldEventSet: this.oldDependencies.keyDependencies.get(observable)
        });
    }
    function removeKeyDependencies(event) {
        canReflect.offKeyValue(this.observable, event, this.onDependencyChange, 'notify');
    }
    function removeObservablesKeyDependencies(oldEventSet, observable) {
        oldEventSet.forEach(removeKeyDependencies, {
            onDependencyChange: this.onDependencyChange,
            observable: observable
        });
    }
    function addValueDependencies(observable) {
        if (this.oldDependencies.valueDependencies.delete(observable) === false) {
            canReflect.onValue(observable, this.onDependencyChange, 'notify');
        }
    }
    function removeValueDependencies(observable) {
        canReflect.offValue(observable, this.onDependencyChange, 'notify');
    }
    module.exports = {
        updateObservations: function (observationData) {
            observationData.newDependencies.keyDependencies.forEach(addObservablesNewKeyDependenciesIfNotInOld, observationData);
            observationData.oldDependencies.keyDependencies.forEach(removeObservablesKeyDependencies, observationData);
            observationData.newDependencies.valueDependencies.forEach(addValueDependencies, observationData);
            observationData.oldDependencies.valueDependencies.forEach(removeValueDependencies, observationData);
        },
        stopObserving: function (observationReciever, onDependencyChange) {
            observationReciever.keyDependencies.forEach(removeObservablesKeyDependencies, { onDependencyChange: onDependencyChange });
            observationReciever.valueDependencies.forEach(removeValueDependencies, { onDependencyChange: onDependencyChange });
        }
    };
});
/*can-observation@4.0.0-pre.24#temporarily-bind*/
define('can-observation/temporarily-bind', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var temporarilyBoundNoOperation = function () {
    };
    var observables;
    var unbindTemporarilyBoundValue = function () {
        for (var i = 0, len = observables.length; i < len; i++) {
            canReflect.offValue(observables[i], temporarilyBoundNoOperation);
        }
        observables = null;
    };
    function temporarilyBind(compute) {
        var computeInstance = compute.computeInstance || compute;
        canReflect.onValue(computeInstance, temporarilyBoundNoOperation);
        if (!observables) {
            observables = [];
            setTimeout(unbindTemporarilyBoundValue, 10);
        }
        observables.push(computeInstance);
    }
    module.exports = temporarilyBind;
});
/*can-observation@4.0.0-pre.24#can-observation*/
define('can-observation', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-reflect',
    'can-queues',
    'can-observation-recorder',
    'can-symbol',
    'can-log/dev/dev',
    'can-event-queue/value/value',
    'can-observation/recorder-dependency-helpers',
    'can-observation/temporarily-bind'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var namespace = require('can-namespace');
        var canReflect = require('can-reflect');
        var queues = require('can-queues');
        var ObservationRecorder = require('can-observation-recorder');
        var canSymbol = require('can-symbol');
        var dev = require('can-log/dev/dev');
        var valueEventBindings = require('can-event-queue/value/value');
        var recorderHelpers = require('can-observation/recorder-dependency-helpers');
        var temporarilyBind = require('can-observation/temporarily-bind');
        var dispatchSymbol = canSymbol.for('can.dispatch');
        var getChangesSymbol = canSymbol.for('can.getChangesDependencyRecord');
        var getValueDependenciesSymbol = canSymbol.for('can.getValueDependencies');
        function Observation(func, context, options) {
            this.func = func;
            this.context = context;
            this.options = options || {
                priority: 0,
                isObservable: true
            };
            this.bound = false;
            this.newDependencies = ObservationRecorder.makeDependenciesRecord();
            this.oldDependencies = null;
            var self = this;
            this.onDependencyChange = function (newVal) {
                self.dependencyChange(this, newVal);
            };
            this.update = this.update.bind(this);
            this.onDependencyChange[getChangesSymbol] = function getChanges() {
                return { valueDependencies: new Set([self]) };
            };
            Object.defineProperty(this.onDependencyChange, 'name', { value: canReflect.getName(this) + '.onDependencyChange' });
            Object.defineProperty(this.update, 'name', { value: canReflect.getName(this) + '.update' });
        }
        valueEventBindings(Observation.prototype);
        canReflect.assign(Observation.prototype, {
            onBound: function () {
                this.bound = true;
                this.oldDependencies = this.newDependencies;
                ObservationRecorder.start();
                this.value = this.func.call(this.context);
                this.newDependencies = ObservationRecorder.stop();
                recorderHelpers.updateObservations(this);
            },
            dependencyChange: function (context, args) {
                if (this.bound === true) {
                    queues.deriveQueue.enqueue(this.update, this, [], {
                        priority: this.options.priority,
                        log: [canReflect.getName(this.update)]
                    }, [
                        canReflect.getName(context),
                        'changed'
                    ]);
                }
            },
            update: function () {
                if (this.bound === true) {
                    var oldValue = this.value;
                    this.oldValue = null;
                    this.onBound();
                    if (oldValue !== this.value) {
                        this[dispatchSymbol](this.value, oldValue);
                    }
                }
            },
            onUnbound: function () {
                this.bound = false;
                recorderHelpers.stopObserving(this.newDependencies, this.onDependencyChange);
                this.newDependencies = ObservationRecorder.makeDependenciesRecorder();
            },
            get: function () {
                if (this.options.isObservable && ObservationRecorder.isRecording()) {
                    ObservationRecorder.add(this);
                    if (!this.bound) {
                        Observation.temporarilyBind(this);
                    }
                }
                if (this.bound === true) {
                    if (queues.deriveQueue.tasksRemainingCount() > 0) {
                        Observation.updateChildrenAndSelf(this);
                    }
                    return this.value;
                } else {
                    return this.func.call(this.context);
                }
            },
            hasDependencies: function () {
                var newDependencies = this.newDependencies;
                return this.bound ? newDependencies.valueDependencies.size + newDependencies.keyDependencies.size > 0 : undefined;
            },
            log: function () {
                var quoteString = function quoteString(x) {
                    return typeof x === 'string' ? JSON.stringify(x) : x;
                };
                this._log = function (previous, current) {
                    dev.log(canReflect.getName(this), '\n is  ', quoteString(current), '\n was ', quoteString(previous));
                };
            }
        });
        canReflect.assignSymbols(Observation.prototype, {
            'can.getValue': Observation.prototype.get,
            'can.isValueLike': true,
            'can.isMapLike': false,
            'can.isListLike': false,
            'can.valueHasDependencies': Observation.prototype.hasDependencies,
            'can.getValueDependencies': function () {
                if (this.bound === true) {
                    var deps = this.newDependencies, result = {};
                    if (deps.keyDependencies.size) {
                        result.keyDependencies = deps.keyDependencies;
                    }
                    if (deps.valueDependencies.size) {
                        result.valueDependencies = deps.valueDependencies;
                    }
                    return result;
                }
                return undefined;
            },
            'can.getPriority': function () {
                return this.options.priority;
            },
            'can.setPriority': function (priority) {
                this.options.priority = priority;
            },
            'can.getName': function () {
                return canReflect.getName(this.constructor) + '<' + canReflect.getName(this.func) + '>';
            }
        });
        Observation.updateChildrenAndSelf = function (observation) {
            if (observation.update !== undefined && queues.deriveQueue.isEnqueued(observation.update) === true) {
                queues.deriveQueue.flushQueuedTask(observation.update);
                return true;
            }
            if (observation[getValueDependenciesSymbol]) {
                var childHasChanged = false;
                var valueDependencies = observation[getValueDependenciesSymbol]().valueDependencies || [];
                valueDependencies.forEach(function (observable) {
                    if (Observation.updateChildrenAndSelf(observable) === true) {
                        childHasChanged = true;
                    }
                });
                return childHasChanged;
            } else {
                return false;
            }
        };
        var alias = { addAll: 'addMany' };
        [
            'add',
            'addAll',
            'ignore',
            'trap',
            'trapsCount',
            'isRecording'
        ].forEach(function (methodName) {
            Observation[methodName] = function () {
                var name = alias[methodName] ? alias[methodName] : methodName;
                console.warn('can-observation: Call ' + name + '() on can-observation-recorder.');
                return ObservationRecorder[name].apply(this, arguments);
            };
        });
        Observation.prototype.start = function () {
            console.warn('can-observation: Use .on and .off to bind.');
            return this.onBound();
        };
        Observation.prototype.stop = function () {
            console.warn('can-observation: Use .on and .off to bind.');
            return this.onUnbound();
        };
        Observation.temporarilyBind = temporarilyBind;
        module.exports = namespace.Observation = Observation;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-globals@0.3.0#can-globals-proto*/
define('can-globals/can-globals-proto', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var canReflect = require('can-reflect');
        function dispatch(key) {
            var handlers = this.eventHandlers[key];
            if (handlers) {
                var handlersCopy = handlers.slice();
                var value = this.getKeyValue(key);
                for (var i = 0; i < handlersCopy.length; i++) {
                    handlersCopy[i](value);
                }
            }
        }
        function Globals() {
            this.eventHandlers = {};
            this.properties = {};
        }
        Globals.prototype.define = function (key, value, enableCache) {
            if (enableCache === undefined) {
                enableCache = true;
            }
            if (!this.properties[key]) {
                this.properties[key] = {
                    default: value,
                    value: value,
                    enableCache: enableCache
                };
            }
            return this;
        };
        Globals.prototype.getKeyValue = function (key) {
            var property = this.properties[key];
            if (property) {
                if (typeof property.value === 'function') {
                    if (property.cachedValue) {
                        return property.cachedValue;
                    }
                    if (property.enableCache) {
                        property.cachedValue = property.value();
                        return property.cachedValue;
                    } else {
                        return property.value();
                    }
                }
                return property.value;
            }
        };
        Globals.prototype.makeExport = function (key) {
            return function (value) {
                if (arguments.length === 0) {
                    return this.getKeyValue(key);
                }
                if (typeof value === 'undefined' || value === null) {
                    this.deleteKeyValue(key);
                } else {
                    if (typeof value === 'function') {
                        this.setKeyValue(key, function () {
                            return value;
                        });
                    } else {
                        this.setKeyValue(key, value);
                    }
                    return value;
                }
            }.bind(this);
        };
        Globals.prototype.offKeyValue = function (key, handler) {
            if (this.properties[key]) {
                var handlers = this.eventHandlers[key];
                if (handlers) {
                    var i = handlers.indexOf(handler);
                    handlers.splice(i, 1);
                }
            }
            return this;
        };
        Globals.prototype.onKeyValue = function (key, handler) {
            if (this.properties[key]) {
                if (!this.eventHandlers[key]) {
                    this.eventHandlers[key] = [];
                }
                this.eventHandlers[key].push(handler);
            }
            return this;
        };
        Globals.prototype.deleteKeyValue = function (key) {
            var property = this.properties[key];
            if (property !== undefined) {
                property.value = property.default;
                property.cachedValue = undefined;
                dispatch.call(this, key);
            }
            return this;
        };
        Globals.prototype.setKeyValue = function (key, value) {
            if (!this.properties[key]) {
                return this.define(key, value);
            }
            var property = this.properties[key];
            property.value = value;
            property.cachedValue = undefined;
            dispatch.call(this, key);
            return this;
        };
        Globals.prototype.reset = function () {
            for (var key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    this.properties[key].value = this.properties[key].default;
                    this.properties[key].cachedValue = undefined;
                    dispatch.call(this, key);
                }
            }
            return this;
        };
        canReflect.assignSymbols(Globals.prototype, {
            'can.getKeyValue': Globals.prototype.getKeyValue,
            'can.setKeyValue': Globals.prototype.setKeyValue,
            'can.deleteKeyValue': Globals.prototype.deleteKeyValue,
            'can.onKeyValue': Globals.prototype.onKeyValue,
            'can.offKeyValue': Globals.prototype.offKeyValue
        });
        module.exports = Globals;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-globals@0.3.0#can-globals-instance*/
define('can-globals/can-globals-instance', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-globals/can-globals-proto'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var namespace = require('can-namespace');
        var Globals = require('can-globals/can-globals-proto');
        var globals = new Globals();
        if (namespace.globals) {
            throw new Error('You can\'t have two versions of can-globals, check your dependencies');
        } else {
            module.exports = namespace.globals = globals;
        }
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-globals@0.3.0#global/global*/
define('can-globals/global/global', [
    'require',
    'exports',
    'module',
    'can-globals/can-globals-instance'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var globals = require('can-globals/can-globals-instance');
        globals.define('global', function () {
            return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : typeof process === 'object' && {}.toString.call(process) === '[object process]' ? global : window;
        });
        module.exports = globals.makeExport('global');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-globals@0.3.0#document/document*/
define('can-globals/document/document', [
    'require',
    'exports',
    'module',
    'can-globals/global/global',
    'can-globals/can-globals-instance'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        require('can-globals/global/global');
        var globals = require('can-globals/can-globals-instance');
        globals.define('document', function () {
            return globals.getKeyValue('global').document;
        });
        module.exports = globals.makeExport('document');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-globals@0.3.0#is-node/is-node*/
define('can-globals/is-node/is-node', [
    'require',
    'exports',
    'module',
    'can-globals/can-globals-instance'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var globals = require('can-globals/can-globals-instance');
        globals.define('isNode', function () {
            return typeof process === 'object' && {}.toString.call(process) === '[object process]';
        });
        module.exports = globals.makeExport('isNode');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-globals@0.3.0#is-browser-window/is-browser-window*/
define('can-globals/is-browser-window/is-browser-window', [
    'require',
    'exports',
    'module',
    'can-globals/can-globals-instance',
    'can-globals/is-node/is-node'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var globals = require('can-globals/can-globals-instance');
        require('can-globals/is-node/is-node');
        globals.define('isBrowserWindow', function () {
            var isNode = globals.getKeyValue('isNode');
            return typeof window !== 'undefined' && typeof document !== 'undefined' && isNode === false;
        });
        module.exports = globals.makeExport('isBrowserWindow');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/events/events*/
define('can-util/dom/events/events', [
    'require',
    'exports',
    'module',
    'can-globals/document/document',
    'can-globals/is-browser-window/is-browser-window',
    'can-util/js/is-plain-object/is-plain-object',
    'can-log/dev/dev'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getDocument = require('can-globals/document/document');
        var isBrowserWindow = require('can-globals/is-browser-window/is-browser-window');
        var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
        var fixSyntheticEventsOnDisabled = false;
        var dev = require('can-log/dev/dev');
        function isDispatchingOnDisabled(element, ev) {
            var isInsertedOrRemoved = isPlainObject(ev) ? ev.type === 'inserted' || ev.type === 'removed' : ev === 'inserted' || ev === 'removed';
            var isDisabled = !!element.disabled;
            return isInsertedOrRemoved && isDisabled;
        }
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
                var ret;
                var dispatchingOnDisabled = fixSyntheticEventsOnDisabled && isDispatchingOnDisabled(this, event);
                var doc = this.ownerDocument || getDocument();
                var ev = doc.createEvent('HTMLEvents');
                var isString = typeof event === 'string';
                ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);
                if (!isString) {
                    for (var prop in event) {
                        if (ev[prop] === undefined) {
                            ev[prop] = event[prop];
                        }
                    }
                }
                if (this.disabled === true && ev.type !== 'fix_synthetic_events_on_disabled_test') {
                    dev.warn('can-util/dom/events::dispatch: Dispatching a synthetic event on a disabled is ' + 'problematic in FireFox and Internet Explorer. We recommend avoiding this if at ' + 'all possible. see https://github.com/canjs/can-util/issues/294');
                }
                ev.args = args;
                if (dispatchingOnDisabled) {
                    this.disabled = false;
                }
                ret = this.dispatchEvent(ev);
                if (dispatchingOnDisabled) {
                    this.disabled = true;
                }
                return ret;
            }
        };
        (function () {
            if (!isBrowserWindow()) {
                return;
            }
            var testEventName = 'fix_synthetic_events_on_disabled_test';
            var input = document.createElement('input');
            input.disabled = true;
            var timer = setTimeout(function () {
                fixSyntheticEventsOnDisabled = true;
            }, 50);
            var onTest = function onTest() {
                clearTimeout(timer);
                module.exports.removeEventListener.call(input, testEventName, onTest);
            };
            module.exports.addEventListener.call(input, testEventName, onTest);
            try {
                module.exports.dispatch.call(input, testEventName, [], false);
            } catch (e) {
                onTest();
                fixSyntheticEventsOnDisabled = true;
            }
        }());
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-event-queue@0.15.2#map/map*/
define('can-event-queue/map/map', [
    'require',
    'exports',
    'module',
    'can-log/dev/dev',
    'can-queues',
    'can-reflect',
    'can-symbol',
    'can-key-tree',
    'can-util/dom/events/events',
    'can-event-queue/dependency-record/merge'
], function (require, exports, module) {
    var canDev = require('can-log/dev/dev');
    var queues = require('can-queues');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var KeyTree = require('can-key-tree');
    var domEvents = require('can-util/dom/events/events');
    var mergeDependencyRecords = require('can-event-queue/dependency-record/merge');
    var metaSymbol = canSymbol.for('can.meta'), dispatchBoundChangeSymbol = canSymbol.for('can.dispatchInstanceBoundChange'), dispatchInstanceOnPatchesSymbol = canSymbol.for('can.dispatchInstanceOnPatches'), onKeyValueSymbol = canSymbol.for('can.onKeyValue'), offKeyValueSymbol = canSymbol.for('can.offKeyValue'), onEventSymbol = canSymbol.for('can.onEvent'), offEventSymbol = canSymbol.for('can.offEvent'), onValueSymbol = canSymbol.for('can.onValue'), offValueSymbol = canSymbol.for('can.offValue');
    var legacyMapBindings;
    function addHandlers(obj, meta) {
        if (!meta.handlers) {
            meta.handlers = new KeyTree([
                Object,
                Object,
                Object,
                Array
            ], {
                onFirst: function () {
                    if (obj._eventSetup !== undefined) {
                        obj._eventSetup();
                    }
                    if (obj.constructor[dispatchBoundChangeSymbol]) {
                        obj.constructor[dispatchBoundChangeSymbol](obj, true);
                    }
                },
                onEmpty: function () {
                    if (obj._eventTeardown !== undefined) {
                        obj._eventTeardown();
                    }
                    if (obj.constructor[dispatchBoundChangeSymbol]) {
                        obj.constructor[dispatchBoundChangeSymbol](obj, false);
                    }
                }
            });
        }
        if (!meta.listenHandlers) {
            meta.listenHandlers = new KeyTree([
                Map,
                Object,
                Array
            ]);
        }
    }
    var ensureMeta = function ensureMeta(obj) {
        var meta = obj[metaSymbol];
        if (!meta) {
            meta = {};
            canReflect.setKeyValue(obj, metaSymbol, meta);
        }
        addHandlers(obj, meta);
        return meta;
    };
    var props = {
        dispatch: function (event, args) {
            if (arguments.length > 4) {
                canDev.warn('Arguments to dispatch should be an array, not multiple arguments.');
                args = Array.prototype.slice.call(arguments, 1);
            }
            if (args && !Array.isArray(args)) {
                canDev.warn('Arguments to dispatch should be an array.');
                args = [args];
            }
            if (!this.__inSetup) {
                if (typeof event === 'string') {
                    event = { type: event };
                }
                var meta = ensureMeta(this);
                if (!event.reasonLog) {
                    event.reasonLog = [
                        canReflect.getName(this),
                        'dispatched',
                        '"' + event.type + '"',
                        'with'
                    ].concat(args);
                }
                if (typeof meta._log === 'function') {
                    meta._log.call(this, event, args);
                }
                var handlers = meta.handlers;
                var handlersByType = event.type !== undefined && handlers.getNode([event.type]);
                var dispatchConstructorPatches = event.patches && this.constructor[dispatchInstanceOnPatchesSymbol];
                var patchesNode = event.patches !== undefined && handlers.getNode([
                    'can.patches',
                    'onKeyValue'
                ]);
                var keysNode = event.keyChanged !== undefined && handlers.getNode([
                    'can.keys',
                    'onKeyValue'
                ]);
                var batch = dispatchConstructorPatches || handlersByType || patchesNode || keysNode;
                if (batch) {
                    queues.batch.start();
                }
                if (handlersByType) {
                    if (handlersByType.onKeyValue) {
                        queues.enqueueByQueue(handlersByType.onKeyValue, this, args, event.makeMeta, event.reasonLog);
                    }
                    if (handlersByType.event) {
                        event.batchNum = queues.batch.number();
                        var eventAndArgs = [event].concat(args);
                        queues.enqueueByQueue(handlersByType.event, this, eventAndArgs, event.makeMeta, event.reasonLog);
                    }
                }
                if (keysNode) {
                    queues.enqueueByQueue(keysNode, this, [event.keyChanged], event.makeMeta, event.reasonLog);
                }
                if (patchesNode) {
                    queues.enqueueByQueue(patchesNode, this, [event.patches], event.makeMeta, event.reasonLog);
                }
                if (dispatchConstructorPatches) {
                    this.constructor[dispatchInstanceOnPatchesSymbol](this, event.patches);
                }
                if (batch) {
                    queues.batch.stop();
                }
            }
            return event;
        },
        addEventListener: function (key, handler, queueName) {
            ensureMeta(this).handlers.add([
                key,
                'event',
                queueName || 'mutate',
                handler
            ]);
            return this;
        },
        removeEventListener: function (key, handler, queueName) {
            if (key === undefined) {
                var handlers = ensureMeta(this).handlers;
                var keyHandlers = handlers.getNode([]);
                Object.keys(keyHandlers).forEach(function (key) {
                    handlers.delete([
                        key,
                        'event'
                    ]);
                });
            } else if (!handler && !queueName) {
                ensureMeta(this).handlers.delete([
                    key,
                    'event'
                ]);
            } else if (!handler) {
                ensureMeta(this).handlers.delete([
                    key,
                    'event',
                    queueName || 'mutate'
                ]);
            } else {
                ensureMeta(this).handlers.delete([
                    key,
                    'event',
                    queueName || 'mutate',
                    handler
                ]);
            }
            return this;
        },
        one: function (event, handler) {
            var one = function () {
                legacyMapBindings.off.call(this, event, one);
                return handler.apply(this, arguments);
            };
            legacyMapBindings.on.call(this, event, one);
            return this;
        },
        listenTo: function (bindTarget, event, handler) {
            if (canReflect.isPrimitive(bindTarget)) {
                handler = event;
                event = bindTarget;
                bindTarget = this;
            }
            ensureMeta(this).listenHandlers.add([
                bindTarget,
                event,
                handler
            ]);
            legacyMapBindings.on.call(bindTarget, event, handler);
            return this;
        },
        stopListening: function (bindTarget, event, handler) {
            if (canReflect.isPrimitive(bindTarget)) {
                handler = event;
                event = bindTarget;
                bindTarget = this;
            }
            var listenHandlers = ensureMeta(this).listenHandlers;
            function stopHandler(bindTarget, event, handler) {
                legacyMapBindings.off.call(bindTarget, event, handler);
            }
            function stopEvent(bindTarget, event) {
                listenHandlers.get([
                    bindTarget,
                    event
                ]).forEach(function (handler) {
                    stopHandler(bindTarget, event, handler);
                });
            }
            function stopBindTarget(bindTarget) {
                canReflect.eachKey(listenHandlers.getNode([bindTarget]), function (handlers, event) {
                    stopEvent(bindTarget, event);
                });
            }
            if (bindTarget) {
                if (event) {
                    if (handler) {
                        stopHandler(bindTarget, event, handler);
                        listenHandlers.delete([
                            bindTarget,
                            event,
                            handler
                        ]);
                    } else {
                        stopEvent(bindTarget, event);
                        listenHandlers.delete([
                            bindTarget,
                            event
                        ]);
                    }
                } else {
                    stopBindTarget(bindTarget);
                    listenHandlers.delete([bindTarget]);
                }
            } else {
                canReflect.eachKey(listenHandlers.getNode([]), function (events, bindTarget) {
                    stopBindTarget(bindTarget);
                });
                listenHandlers.delete([]);
            }
            return this;
        },
        on: function (eventName, handler, queue) {
            var listenWithDOM = domEvents.canAddEventListener.call(this);
            if (listenWithDOM) {
                var method = typeof handler === 'string' ? 'addDelegateListener' : 'addEventListener';
                domEvents[method].call(this, eventName, handler, queue);
            } else {
                if ('addEventListener' in this) {
                    this.addEventListener(eventName, handler, queue);
                } else if (this[onKeyValueSymbol]) {
                    canReflect.onKeyValue(this, eventName, handler, queue);
                } else if (this[onEventSymbol]) {
                    this[onEventSymbol](eventName, handler, queue);
                } else {
                    if (!eventName && this[onValueSymbol]) {
                        canReflect.onValue(this, handler, queue);
                    } else {
                        throw new Error('can-event-queue: Unable to bind ' + eventName);
                    }
                }
            }
            return this;
        },
        off: function (eventName, handler, queue) {
            var listenWithDOM = domEvents.canAddEventListener.call(this);
            if (listenWithDOM) {
                var method = typeof handler === 'string' ? 'removeDelegateListener' : 'removeEventListener';
                domEvents[method].call(this, eventName, handler, queue);
            } else {
                if ('removeEventListener' in this) {
                    this.removeEventListener(eventName, handler, queue);
                } else if (this[offKeyValueSymbol]) {
                    canReflect.offKeyValue(this, eventName, handler, queue);
                } else if (this[offEventSymbol]) {
                    this[offEventSymbol](eventName, handler, queue);
                } else {
                    if (!eventName && this[offValueSymbol]) {
                        canReflect.offValue(this, handler, queue);
                    } else {
                        throw new Error('can-event-queue: Unable to unbind ' + eventName);
                    }
                }
            }
            return this;
        }
    };
    var symbols = {
        'can.onKeyValue': function (key, handler, queueName) {
            ensureMeta(this).handlers.add([
                key,
                'onKeyValue',
                queueName || 'mutate',
                handler
            ]);
        },
        'can.offKeyValue': function (key, handler, queueName) {
            ensureMeta(this).handlers.delete([
                key,
                'onKeyValue',
                queueName || 'mutate',
                handler
            ]);
        },
        'can.isBound': function () {
            return ensureMeta(this).handlers.size() > 0;
        },
        'can.getWhatIChange': function getWhatIChange(key) {
            var whatIChange = {};
            var meta = ensureMeta(this);
            var notifyHandlers = [].concat(meta.handlers.get([
                key,
                'event',
                'notify'
            ]), meta.handlers.get([
                key,
                'onKeyValue',
                'notify'
            ]));
            var mutateHandlers = [].concat(meta.handlers.get([
                key,
                'event',
                'mutate'
            ]), meta.handlers.get([
                key,
                'event',
                'domUI'
            ]), meta.handlers.get([
                key,
                'onKeyValue',
                'mutate'
            ]), meta.handlers.get([
                key,
                'onKeyValue',
                'domUI'
            ]));
            if (notifyHandlers.length) {
                notifyHandlers.forEach(function (handler) {
                    var changes = canReflect.getChangesDependencyRecord(handler);
                    if (changes) {
                        var record = whatIChange.derive;
                        if (!record) {
                            record = whatIChange.derive = {};
                        }
                        mergeDependencyRecords(record, changes);
                    }
                });
            }
            if (mutateHandlers.length) {
                mutateHandlers.forEach(function (handler) {
                    var changes = canReflect.getChangesDependencyRecord(handler);
                    if (changes) {
                        var record = whatIChange.mutate;
                        if (!record) {
                            record = whatIChange.mutate = {};
                        }
                        mergeDependencyRecords(record, changes);
                    }
                });
            }
            return Object.keys(whatIChange).length ? whatIChange : undefined;
        },
        'can.onPatches': function (handler, queue) {
            var handlers = ensureMeta(this).handlers;
            handlers.add([
                'can.patches',
                'onKeyValue',
                queue || 'notify',
                handler
            ]);
        },
        'can.offPatches': function (handler, queue) {
            var handlers = ensureMeta(this).handlers;
            handlers.delete([
                'can.patches',
                'onKeyValue',
                queue || 'notify',
                handler
            ]);
        }
    };
    legacyMapBindings = function (obj) {
        canReflect.assignMap(obj, props);
        return canReflect.assignSymbols(obj, symbols);
    };
    defineNonEnumerable(legacyMapBindings, 'addHandlers', addHandlers);
    props.bind = props.addEventListener;
    props.unbind = props.removeEventListener;
    function defineNonEnumerable(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            enumerable: false,
            value: value
        });
    }
    canReflect.assignMap(legacyMapBindings, props);
    canReflect.assignSymbols(legacyMapBindings, symbols);
    defineNonEnumerable(legacyMapBindings, 'start', function () {
        console.warn('use can-queues.batch.start()');
        queues.batch.start();
    });
    defineNonEnumerable(legacyMapBindings, 'stop', function () {
        console.warn('use can-queues.batch.stop()');
        queues.batch.stop();
    });
    defineNonEnumerable(legacyMapBindings, 'flush', function () {
        console.warn('use can-queues.flush()');
        queues.flush();
    });
    defineNonEnumerable(legacyMapBindings, 'afterPreviousEvents', function (handler) {
        console.warn('don\'t use afterPreviousEvents');
        queues.mutateQueue.enqueue(function afterPreviousEvents() {
            queues.mutateQueue.enqueue(handler);
        });
        queues.flush();
    });
    defineNonEnumerable(legacyMapBindings, 'after', function (handler) {
        console.warn('don\'t use after');
        queues.mutateQueue.enqueue(handler);
        queues.flush();
    });
    module.exports = legacyMapBindings;
});
/*can-cid@1.1.2#can-cid*/
define('can-cid', [
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    var _cid = 0;
    var domExpando = 'can' + new Date();
    var cid = function (object, name) {
        var propertyName = object.nodeName ? domExpando : '_cid';
        if (!object[propertyName]) {
            _cid++;
            object[propertyName] = (name || '') + _cid;
        }
        return object[propertyName];
    };
    cid.domExpando = domExpando;
    cid.get = function (object) {
        var type = typeof object;
        var isObject = type !== null && (type === 'object' || type === 'function');
        return isObject ? cid(object) : type + ':' + object;
    };
    if (namespace.cid) {
        throw new Error('You can\'t have two versions of can-cid, check your dependencies');
    } else {
        module.exports = namespace.cid = cid;
    }
});
/*can-dom-data-state@0.2.0#can-dom-data-state*/
define('can-dom-data-state', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-cid'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    var CID = require('can-cid');
    var data = {};
    var isEmptyObject = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
    var setData = function (name, value) {
        var id = CID(this);
        var store = data[id] || (data[id] = {});
        if (name !== undefined) {
            store[name] = value;
        }
        return store;
    };
    var deleteNode = function () {
        var id = CID.get(this);
        var nodeDeleted = false;
        if (id && data[id]) {
            nodeDeleted = true;
            delete data[id];
        }
        return nodeDeleted;
    };
    var domDataState = {
        _data: data,
        getCid: function () {
            return CID.get(this);
        },
        cid: function () {
            return CID(this);
        },
        expando: CID.domExpando,
        get: function (key) {
            var id = CID.get(this), store = id && data[id];
            return key === undefined ? store : store && store[key];
        },
        set: setData,
        clean: function (prop) {
            var id = CID.get(this);
            var itemData = data[id];
            if (itemData && itemData[prop]) {
                delete itemData[prop];
            }
            if (isEmptyObject(itemData)) {
                deleteNode.call(this);
            }
        },
        delete: deleteNode
    };
    if (namespace.domDataState) {
        throw new Error('You can\'t have two versions of can-dom-data-state, check your dependencies');
    } else {
        module.exports = namespace.domDataState = domDataState;
    }
});
/*can-globals@0.3.0#mutation-observer/mutation-observer*/
define('can-globals/mutation-observer/mutation-observer', [
    'require',
    'exports',
    'module',
    'can-globals/global/global',
    'can-globals/can-globals-instance'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        require('can-globals/global/global');
        var globals = require('can-globals/can-globals-instance');
        globals.define('MutationObserver', function () {
            var GLOBAL = globals.getKeyValue('global');
            return GLOBAL.MutationObserver || GLOBAL.WebKitMutationObserver || GLOBAL.MozMutationObserver;
        });
        module.exports = globals.makeExport('MutationObserver');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-cid@1.1.2#helpers*/
define('can-cid/helpers', function (require, exports, module) {
    module.exports = {
        each: function (obj, cb, context) {
            for (var prop in obj) {
                cb.call(context, obj[prop], prop);
            }
            return obj;
        }
    };
});
/*can-cid@1.1.2#set/set*/
define('can-cid/set/set', [
    'require',
    'exports',
    'module',
    'can-cid',
    'can-cid/helpers'
], function (require, exports, module) {
    'use strict';
    var getCID = require('can-cid').get;
    var helpers = require('can-cid/helpers');
    var CIDSet;
    if (typeof Set !== 'undefined') {
        CIDSet = Set;
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
            helpers.each(this.values, cb, thisArg);
        };
        CIDSet.prototype.has = function (value) {
            return getCID(value) in this.values;
        };
        CIDSet.prototype.clear = function () {
            return this.values = {};
        };
        Object.defineProperty(CIDSet.prototype, 'size', {
            get: function () {
                var size = 0;
                helpers.each(this.values, function () {
                    size++;
                });
                return size;
            }
        });
    }
    module.exports = CIDSet;
});
/*can-util@3.10.18#dom/mutation-observer/document/document*/
define('can-util/dom/mutation-observer/document/document', [
    'require',
    'exports',
    'module',
    'can-globals/document/document',
    'can-dom-data-state',
    'can-globals/mutation-observer/mutation-observer',
    'can-util/js/each/each',
    'can-cid/set/set',
    'can-util/js/make-array/make-array',
    'can-util/js/string/string'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getDocument = require('can-globals/document/document');
        var domDataState = require('can-dom-data-state');
        var getMutationObserver = require('can-globals/mutation-observer/mutation-observer');
        var each = require('can-util/js/each/each');
        var CIDStore = require('can-cid/set/set');
        var makeArray = require('can-util/js/make-array/make-array');
        var string = require('can-util/js/string/string');
        var dispatchIfListening = function (mutatedNode, nodes, dispatched) {
            if (dispatched.has(mutatedNode)) {
                return true;
            }
            dispatched.add(mutatedNode);
            if (nodes.name === 'removedNodes') {
                var documentElement = getDocument().documentElement;
                if (documentElement.contains(mutatedNode)) {
                    return;
                }
            }
            nodes.handlers.forEach(function (handler) {
                handler(mutatedNode);
            });
            nodes.afterHandlers.forEach(function (handler) {
                handler(mutatedNode);
            });
        };
        var mutationObserverDocument = {
            add: function (handler) {
                var MO = getMutationObserver();
                if (MO) {
                    var documentElement = getDocument().documentElement;
                    var globalObserverData = domDataState.get.call(documentElement, 'globalObserverData');
                    if (!globalObserverData) {
                        var observer = new MO(function (mutations) {
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
                        domDataState.set.call(documentElement, 'globalObserverData', globalObserverData);
                    }
                    globalObserverData.handlers.push(handler);
                }
            },
            remove: function (handler) {
                var documentElement = getDocument().documentElement;
                var globalObserverData = domDataState.get.call(documentElement, 'globalObserverData');
                if (globalObserverData) {
                    var index = globalObserverData.handlers.indexOf(handler);
                    if (index >= 0) {
                        globalObserverData.handlers.splice(index, 1);
                    }
                    if (globalObserverData.handlers.length === 0) {
                        globalObserverData.observer.disconnect();
                        domDataState.clean.call(documentElement, 'globalObserverData');
                    }
                }
            }
        };
        var makeMutationMethods = function (name) {
            var mutationName = name.toLowerCase() + 'Nodes';
            var getMutationData = function () {
                var documentElement = getDocument().documentElement;
                var mutationData = domDataState.get.call(documentElement, mutationName + 'MutationData');
                if (!mutationData) {
                    mutationData = {
                        name: mutationName,
                        handlers: [],
                        afterHandlers: [],
                        hander: null
                    };
                    if (getMutationObserver()) {
                        domDataState.set.call(documentElement, mutationName + 'MutationData', mutationData);
                    }
                }
                return mutationData;
            };
            var setup = function () {
                var mutationData = getMutationData();
                if (mutationData.handlers.length === 0 || mutationData.afterHandlers.length === 0) {
                    mutationData.handler = function (mutations) {
                        var dispatched = new CIDStore();
                        mutations.forEach(function (mutation) {
                            each(mutation[mutationName], function (mutatedNode) {
                                var children = mutatedNode.getElementsByTagName && makeArray(mutatedNode.getElementsByTagName('*'));
                                var alreadyChecked = dispatchIfListening(mutatedNode, mutationData, dispatched);
                                if (children && !alreadyChecked) {
                                    for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                                        dispatchIfListening(child, mutationData, dispatched);
                                    }
                                }
                            });
                        });
                    };
                    this.add(mutationData.handler);
                }
                return mutationData;
            };
            var teardown = function () {
                var documentElement = getDocument().documentElement;
                var mutationData = getMutationData();
                if (mutationData.handlers.length === 0 && mutationData.afterHandlers.length === 0) {
                    this.remove(mutationData.handler);
                    domDataState.clean.call(documentElement, mutationName + 'MutationData');
                }
            };
            var createOnOffHandlers = function (name, handlerList) {
                mutationObserverDocument['on' + name] = function (handler) {
                    var mutationData = setup.call(this);
                    mutationData[handlerList].push(handler);
                };
                mutationObserverDocument['off' + name] = function (handler) {
                    var mutationData = getMutationData();
                    var index = mutationData[handlerList].indexOf(handler);
                    if (index >= 0) {
                        mutationData[handlerList].splice(index, 1);
                    }
                    teardown.call(this);
                };
            };
            var createHandlers = function (name) {
                createOnOffHandlers(name, 'handlers');
                createOnOffHandlers('After' + name, 'afterHandlers');
            };
            createHandlers(string.capitalize(mutationName));
        };
        makeMutationMethods('added');
        makeMutationMethods('removed');
        module.exports = mutationObserverDocument;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/data/data*/
define('can-util/dom/data/data', [
    'require',
    'exports',
    'module',
    'can-dom-data-state',
    'can-util/dom/mutation-observer/document/document'
], function (require, exports, module) {
    'use strict';
    var domDataState = require('can-dom-data-state');
    var mutationDocument = require('can-util/dom/mutation-observer/document/document');
    var elementSetCount = 0;
    var deleteNode = function () {
        elementSetCount -= 1;
        return domDataState.delete.call(this);
    };
    var cleanupDomData = function (node) {
        if (domDataState.get.call(node) !== undefined) {
            deleteNode.call(node);
        }
        if (elementSetCount === 0) {
            mutationDocument.offAfterRemovedNodes(cleanupDomData);
        }
    };
    module.exports = {
        getCid: domDataState.getCid,
        cid: domDataState.cid,
        expando: domDataState.expando,
        clean: domDataState.clean,
        get: domDataState.get,
        set: function (name, value) {
            if (elementSetCount === 0) {
                mutationDocument.onAfterRemovedNodes(cleanupDomData);
            }
            elementSetCount += domDataState.get.call(this) ? 0 : 1;
            domDataState.set.call(this, name, value);
        },
        delete: deleteNode,
        _getElementSetCount: function () {
            return elementSetCount;
        }
    };
});
/*can-util@3.10.18#dom/class-name/class-name*/
define('can-util/dom/class-name/class-name', function (require, exports, module) {
    'use strict';
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
/*can-util@3.10.18#dom/dispatch/dispatch*/
define('can-util/dom/dispatch/dispatch', [
    'require',
    'exports',
    'module',
    'can-util/dom/events/events'
], function (require, exports, module) {
    'use strict';
    var domEvents = require('can-util/dom/events/events');
    module.exports = function () {
        return domEvents.dispatch.apply(this, arguments);
    };
});
/*can-util@3.10.18#dom/matches/matches*/
define('can-util/dom/matches/matches', function (require, exports, module) {
    'use strict';
    var matchesMethod = function (element) {
        return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
    };
    module.exports = function () {
        var method = matchesMethod(this);
        return method ? method.apply(this, arguments) : false;
    };
});
/*can-util@3.10.18#js/is-empty-object/is-empty-object*/
define('can-util/js/is-empty-object/is-empty-object', function (require, exports, module) {
    'use strict';
    module.exports = function (obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };
});
/*can-util@3.10.18#dom/events/delegate/delegate*/
define('can-util/dom/events/delegate/delegate', [
    'require',
    'exports',
    'module',
    'can-util/dom/events/events',
    'can-util/dom/data/data',
    'can-util/dom/matches/matches',
    'can-util/js/each/each',
    'can-util/js/is-empty-object/is-empty-object',
    'can-cid'
], function (require, exports, module) {
    'use strict';
    var domEvents = require('can-util/dom/events/events');
    var domData = require('can-util/dom/data/data');
    var domMatches = require('can-util/dom/matches/matches');
    var each = require('can-util/js/each/each');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var canCid = require('can-cid');
    var dataName = 'delegateEvents';
    var useCapture = function (eventType) {
        return eventType === 'focus' || eventType === 'blur';
    };
    var handleEvent = function (overrideEventType, ev) {
        var events = domData.get.call(this, dataName);
        var eventTypeEvents = events[overrideEventType || ev.type];
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
            var delegateHandler = handleEvent.bind(this, eventType);
            domData.set.call(this, canCid(handler), delegateHandler);
            domEvents.addEventListener.call(this, eventType, delegateHandler, useCapture(eventType));
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
        if (events && events[eventType] && events[eventType][selector]) {
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
                    var delegateHandler = domData.get.call(this, canCid(handler));
                    domEvents.removeEventListener.call(this, eventType, delegateHandler, useCapture(eventType));
                    delete events[eventType];
                    if (isEmptyObject(events)) {
                        domData.clean.call(this, dataName);
                    }
                }
            }
        }
    };
});
/*can-control@4.0.0-pre.7#can-control*/
define('can-control', [
    'require',
    'exports',
    'module',
    'can-construct',
    'can-namespace',
    'can-assign',
    'can-stache-key',
    'can-reflect',
    'can-observation',
    'can-event-queue/map/map',
    'can-log/dev/dev',
    'can-util/js/string/string',
    'can-util/js/get/get',
    'can-util/dom/data/data',
    'can-util/dom/class-name/class-name',
    'can-util/dom/events/events',
    'can-util/dom/dispatch/dispatch',
    'can-util/dom/events/delegate/delegate'
], function (require, exports, module) {
    var Construct = require('can-construct');
    var namespace = require('can-namespace');
    var assign = require('can-assign');
    var observeReader = require('can-stache-key');
    var canReflect = require('can-reflect');
    var Observation = require('can-observation');
    var canEvent = require('can-event-queue/map/map');
    var dev = require('can-log/dev/dev');
    var string = require('can-util/js/string/string');
    var get = require('can-util/js/get/get');
    var domData = require('can-util/dom/data/data');
    var className = require('can-util/dom/class-name/class-name');
    var domEvents = require('can-util/dom/events/events');
    var processors;
    require('can-util/dom/dispatch/dispatch');
    require('can-util/dom/events/delegate/delegate');
    var bind = function (el, ev, callback, queue) {
            canEvent.on.call(el, ev, callback, queue);
            return function () {
                canEvent.off.call(el, ev, callback, queue);
            };
        }, slice = [].slice, paramReplacer = /\{([^\}]+)\}/g, delegate = function (el, selector, ev, callback) {
            canEvent.on.call(el, ev, selector, callback);
            return function () {
                canEvent.off.call(el, ev, selector, callback);
            };
        }, binder = function (el, ev, callback, selector) {
            return selector ? delegate(el, selector.trim(), ev, callback) : bind(el, ev, callback);
        }, basicProcessor;
    var Control = Construct.extend('Control', {
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
            if (typeof method !== 'function') {
                method = context[method];
            }
            var Control = this;
            function controlMethod() {
                var wrapped = Control.wrapElement(this);
                context.called = name;
                return method.apply(context, [wrapped].concat(slice.call(arguments, 0)));
            }
            Object.defineProperty(controlMethod, 'name', { value: canReflect.getName(this) + '[' + name + ']' });
            return controlMethod;
        },
        _isAction: function (methodName) {
            var val = this.prototype[methodName], type = typeof val;
            return methodName !== 'constructor' && (type === 'function' || type === 'string' && typeof this.prototype[val] === 'function') && !!(Control.isSpecial(methodName) || processors[methodName] || /[^\w]/.test(methodName));
        },
        _action: function (methodName, options, controlInstance) {
            var readyCompute, unableToBind;
            paramReplacer.lastIndex = 0;
            if (options || !paramReplacer.test(methodName)) {
                var controlActionData = function () {
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
                        if (!parent || !(canReflect.isObservableLike(parent) && canReflect.isMapLike(parent)) && !value) {
                            unableToBind = true;
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
                };
                Object.defineProperty(controlActionData, 'name', { value: canReflect.getName(controlInstance || this.prototype) + '[' + methodName + '].actionData' });
                readyCompute = new Observation(controlActionData, this);
                if (controlInstance) {
                    var handler = function (actionData) {
                        controlInstance._bindings.control[methodName](controlInstance.element);
                        controlInstance._bindings.control[methodName] = actionData.processor(actionData.delegate || controlInstance.element, actionData.parts[2], actionData.parts[1], methodName, controlInstance);
                    };
                    Object.defineProperty(handler, 'name', { value: canReflect.getName(controlInstance) + '[' + methodName + '].handler' });
                    canReflect.onValue(readyCompute, handler, 'mutate');
                    if (unableToBind) {
                        dev.log('can-control: No property found for handling ' + methodName);
                    }
                    controlInstance._bindings.readyComputes[methodName] = {
                        compute: readyCompute,
                        handler: handler
                    };
                }
                return readyCompute.get();
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
            return this.wrapElement(element);
        },
        wrapElement: function (el) {
            return el;
        },
        unwrapElement: function (el) {
            return el;
        },
        isSpecial: function (eventName) {
            return eventName === 'inserted' || eventName === 'removed';
        }
    }, {
        setup: function (element, options) {
            var cls = this.constructor, pluginname = cls.pluginName || cls.shortName, arr;
            if (!element) {
                throw new Error('Creating an instance of a named control without passing an element');
            }
            this.element = cls.convertElement(element);
            if (pluginname && pluginname !== 'Control') {
                className.add.call(this.element, pluginname);
            }
            arr = domData.get.call(this.element, 'controls');
            if (!arr) {
                arr = [];
                domData.set.call(this.element, 'controls', arr);
            }
            arr.push(this);
            if (canReflect.isObservableLike(options) && canReflect.isMapLike(options)) {
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
                var cls = this.constructor, bindings = this._bindings, actions = cls.actions, element = this.constructor.unwrapElement(this.element), destroyCB = Control._shifter(this, 'destroy'), funcName, ready;
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
            var el = this.constructor.unwrapElement(this.element), bindings = this._bindings;
            if (bindings) {
                (bindings.user || []).forEach(function (value) {
                    value(el);
                });
                canReflect.eachKey(bindings.control || {}, function (value) {
                    value(el);
                });
                canReflect.eachKey(bindings.readyComputes || {}, function (value) {
                    canReflect.offValue(value.compute, value.handler, 'mutate');
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
                dev.warn('can-control: Control already destroyed');
                return;
            }
            var Class = this.constructor, pluginName = Class.pluginName || Class.shortName && string.underscore(Class.shortName), controls;
            this.off();
            if (pluginName && pluginName !== 'can_control') {
                className.remove.call(this.element, pluginName);
            }
            controls = domData.get.call(this.element, 'controls');
            if (controls) {
                controls.splice(controls.indexOf(this), 1);
            }
            this.element = null;
        }
    });
    processors = Control.processors;
    basicProcessor = function (el, event, selector, methodName, control) {
        return binder(el, event, Control._shifter(control, methodName), selector);
    };
    [
        'beforeremove',
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
    ].forEach(function (v) {
        processors[v] = basicProcessor;
    });
    module.exports = namespace.Control = Control;
});
/*can-component@4.0.0-pre.21#control/control*/
define('can-component/control/control', [
    'require',
    'exports',
    'module',
    'can-control',
    'can-reflect'
], function (require, exports, module) {
    var Control = require('can-control');
    var canReflect = require('can-reflect');
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
                canReflect.eachKey(this._bindings.readyComputes || {}, function (value) {
                    canReflect.offValue(value.compute, value.handler);
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
/*can-stache@4.0.0-pre.38#expressions/arg*/
define('can-stache/expressions/arg', function (require, exports, module) {
    var Arg = function (expression, modifiers) {
        this.expr = expression;
        this.modifiers = modifiers || {};
        this.isCompute = false;
    };
    Arg.prototype.value = function () {
        return this.expr.value.apply(this.expr, arguments);
    };
    Arg.prototype.sourceText = function () {
        return (this.modifiers.compute ? '~' : '') + this.expr.sourceText();
    };
    module.exports = Arg;
});
/*can-stache@4.0.0-pre.38#expressions/literal*/
define('can-stache/expressions/literal', function (require, exports, module) {
    var Literal = function (value) {
        this._value = value;
    };
    Literal.prototype.value = function () {
        return this._value;
    };
    Literal.prototype.sourceText = function () {
        return JSON.stringify(this._value);
    };
    module.exports = Literal;
});
/*can-util@3.10.18#js/single-reference/single-reference*/
define('can-util/js/single-reference/single-reference', [
    'require',
    'exports',
    'module',
    'can-cid'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var CID = require('can-cid');
        var singleReference;
        function getKeyName(key, extraKey) {
            var keyName = extraKey ? CID(key) + ':' + extraKey : CID(key);
            return keyName || key;
        }
        singleReference = {
            set: function (obj, key, value, extraKey) {
                obj[getKeyName(key, extraKey)] = value;
            },
            getAndDelete: function (obj, key, extraKey) {
                var keyName = getKeyName(key, extraKey);
                var value = obj[keyName];
                delete obj[keyName];
                return value;
            }
        };
        module.exports = singleReference;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-view-scope@4.0.0-pre.43#make-compute-like*/
define('can-view-scope/make-compute-like', [
    'require',
    'exports',
    'module',
    'can-util/js/single-reference/single-reference',
    'can-reflect'
], function (require, exports, module) {
    var singleReference = require('can-util/js/single-reference/single-reference');
    var canReflect = require('can-reflect');
    var Compute = function (newVal) {
        if (arguments.length) {
            return canReflect.setValue(this, newVal);
        } else {
            return canReflect.getValue(this);
        }
    };
    module.exports = function (observable) {
        var compute = Compute.bind(observable);
        compute.on = compute.bind = compute.addEventListener = function (event, handler) {
            var translationHandler = function (newVal, oldVal) {
                handler.call(compute, { type: 'change' }, newVal, oldVal);
            };
            singleReference.set(handler, this, translationHandler);
            observable.on(translationHandler);
        };
        compute.off = compute.unbind = compute.removeEventListener = function (event, handler) {
            observable.off(singleReference.getAndDelete(handler, this));
        };
        canReflect.assignSymbols(compute, {
            'can.getValue': function () {
                return canReflect.getValue(observable);
            },
            'can.setValue': function (newVal) {
                return canReflect.setValue(observable, newVal);
            },
            'can.onValue': function (handler, queue) {
                return canReflect.onValue(observable, handler, queue);
            },
            'can.offValue': function (handler, queue) {
                return canReflect.offValue(observable, handler, queue);
            },
            'can.valueHasDependencies': function () {
                return canReflect.valueHasDependencies(observable);
            },
            'can.getPriority': function () {
                return canReflect.getPriority(observable);
            },
            'can.setPriority': function (newPriority) {
                canReflect.setPriority(observable, newPriority);
            },
            'can.isValueLike': true,
            'can.isFunctionLike': false
        });
        compute.isComputed = true;
        return compute;
    };
});
/*can-simple-observable@2.0.0-pre.25#log*/
define('can-simple-observable/log', [
    'require',
    'exports',
    'module',
    'can-log/dev/dev',
    'can-reflect'
], function (require, exports, module) {
    var dev = require('can-log/dev/dev');
    var canReflect = require('can-reflect');
    function quoteString(x) {
        return typeof x === 'string' ? JSON.stringify(x) : x;
    }
    module.exports = function log() {
        this._log = function (previous, current) {
            dev.log(canReflect.getName(this), '\n is  ', quoteString(current), '\n was ', quoteString(previous));
        };
    };
});
/*can-simple-observable@2.0.0-pre.25#can-simple-observable*/
define('can-simple-observable', [
    'require',
    'exports',
    'module',
    'can-simple-observable/log',
    'can-namespace',
    'can-symbol',
    'can-reflect',
    'can-observation-recorder',
    'can-event-queue/value/value'
], function (require, exports, module) {
    var log = require('can-simple-observable/log');
    var ns = require('can-namespace');
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    var ObservationRecorder = require('can-observation-recorder');
    var valueEventBindings = require('can-event-queue/value/value');
    var dispatchSymbol = canSymbol.for('can.dispatch');
    function SimpleObservable(initialValue) {
        this.value = initialValue;
    }
    valueEventBindings(SimpleObservable.prototype);
    Object.assign(SimpleObservable.prototype, {
        log: log,
        get: function () {
            ObservationRecorder.add(this);
            return this.value;
        },
        set: function (value) {
            var old = this.value;
            this.value = value;
            this[dispatchSymbol](value, old);
        }
    });
    canReflect.assignSymbols(SimpleObservable.prototype, {
        'can.getValue': SimpleObservable.prototype.get,
        'can.setValue': SimpleObservable.prototype.set,
        'can.isMapLike': false,
        'can.valueHasDependencies': function () {
            return true;
        },
        'can.getName': function () {
            var value = this.value;
            if (typeof value !== 'object' || value === null) {
                value = JSON.stringify(value);
            } else {
                value = '';
            }
            return canReflect.getName(this.constructor) + '<' + value + '>';
        }
    });
    module.exports = ns.SimpleObservable = SimpleObservable;
});
/*can-simple-observable@2.0.0-pre.25#settable/settable*/
define('can-simple-observable/settable/settable', [
    'require',
    'exports',
    'module',
    'can-reflect',
    'can-observation-recorder',
    'can-simple-observable',
    'can-observation',
    'can-queues',
    'can-simple-observable/log',
    'can-event-queue/value/value'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var ObservationRecorder = require('can-observation-recorder');
    var SimpleObservable = require('can-simple-observable');
    var Observation = require('can-observation');
    var queues = require('can-queues');
    var log = require('can-simple-observable/log');
    var valueEventBindings = require('can-event-queue/value/value');
    var peek = ObservationRecorder.ignore(canReflect.getValue.bind(canReflect));
    function SettableObservable(fn, context, initialValue) {
        this.lastSetValue = new SimpleObservable(initialValue);
        function observe() {
            return fn.call(context, this.lastSetValue.get());
        }
        this.handler = this.handler.bind(this);
        canReflect.assignSymbols(this, {
            'can.getName': function () {
                return canReflect.getName(this.constructor) + '<' + canReflect.getName(fn) + '>';
            }
        });
        Object.defineProperty(this.handler, 'name', { value: canReflect.getName(this) + '.handler' });
        Object.defineProperty(observe, 'name', { value: canReflect.getName(fn) + '::' + canReflect.getName(this.constructor) });
        this.observation = new Observation(observe, this);
    }
    valueEventBindings(SettableObservable.prototype);
    Object.assign(SettableObservable.prototype, {
        log: log,
        constructor: SettableObservable,
        handler: function (newVal) {
            var old = this.value;
            this.value = newVal;
            if (typeof this._log === 'function') {
                this._log(old, newVal);
            }
            queues.enqueueByQueue(this.handlers.getNode([]), this, [
                newVal,
                old
            ], function () {
                return {};
            });
        },
        onBound: function () {
            this.bound = true;
            canReflect.onValue(this.observation, this.handler, 'notify');
            this.value = peek(this.observation);
        },
        onUnbound: function () {
            this.bound = false;
            canReflect.offValue(this.observation, this.handler, 'notify');
        },
        set: function (newVal) {
            if (newVal !== this.lastSetValue.get()) {
                this.lastSetValue.set(newVal);
            }
        },
        get: function () {
            if (ObservationRecorder.isRecording()) {
                ObservationRecorder.add(this);
                if (!this.bound) {
                    Observation.temporarilyBind(this);
                }
            }
            if (this.bound === true) {
                return this.value;
            } else {
                return this.observation.get();
            }
        },
        hasDependencies: function () {
            return canReflect.valueHasDependencies(this.observation);
        },
        getValueDependencies: function () {
            return canReflect.getValueDependencies(this.observation);
        }
    });
    canReflect.assignSymbols(SettableObservable.prototype, {
        'can.getValue': SettableObservable.prototype.get,
        'can.setValue': SettableObservable.prototype.set,
        'can.isMapLike': false,
        'can.getPriority': function () {
            return canReflect.getPriority(this.observation);
        },
        'can.setPriority': function (newPriority) {
            canReflect.setPriority(this.observation, newPriority);
        },
        'can.valueHasDependencies': SettableObservable.prototype.hasDependencies,
        'can.getValueDependencies': SettableObservable.prototype.getValueDependencies
    });
    module.exports = SettableObservable;
});
/*can-simple-observable@2.0.0-pre.25#setter/setter*/
define('can-simple-observable/setter/setter', [
    'require',
    'exports',
    'module',
    'can-reflect',
    'can-observation',
    'can-simple-observable/settable/settable',
    'can-event-queue/value/value'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var Observation = require('can-observation');
    var SettableObservable = require('can-simple-observable/settable/settable');
    var valueEventBindings = require('can-event-queue/value/value');
    function SetterObservable(getter, setter) {
        this.setter = setter;
        this.observation = new Observation(getter);
        this.handler = this.handler.bind(this);
        canReflect.assignSymbols(this, {
            'can.getName': function () {
                return canReflect.getName(this.constructor) + '<' + canReflect.getName(getter) + '>';
            }
        });
        Object.defineProperty(this.handler, 'name', { value: canReflect.getName(this) + '.handler' });
    }
    SetterObservable.prototype = Object.create(SettableObservable.prototype);
    SetterObservable.prototype.constructor = SetterObservable;
    SetterObservable.prototype.set = function (newVal) {
        this.setter(newVal);
    };
    SetterObservable.prototype.hasDependencies = function () {
        return canReflect.valueHasDependencies(this.observation);
    };
    canReflect.assignSymbols(SetterObservable.prototype, {
        'can.setValue': SetterObservable.prototype.set,
        'can.valueHasDependencies': SetterObservable.prototype.hasDependencies
    });
    module.exports = SetterObservable;
});
/*can-stache@4.0.0-pre.38#src/expression-helpers*/
define('can-stache/src/expression-helpers', [
    'require',
    'exports',
    'module',
    'can-stache/expressions/arg',
    'can-stache/expressions/literal',
    'can-reflect',
    'can-stache-key',
    'can-symbol',
    'can-observation',
    'can-view-scope/make-compute-like',
    'can-simple-observable/setter/setter'
], function (require, exports, module) {
    var Arg = require('can-stache/expressions/arg');
    var Literal = require('can-stache/expressions/literal');
    var canReflect = require('can-reflect');
    var observeReader = require('can-stache-key');
    var canSymbol = require('can-symbol');
    var Observation = require('can-observation');
    var makeComputeLike = require('can-view-scope/make-compute-like');
    var SetterObservable = require('can-simple-observable/setter/setter');
    function getObservableValue_fromKey(key, scope, readOptions) {
        var data = scope.computeData(key, readOptions);
        Observation.temporarilyBind(data);
        return data;
    }
    function computeHasDependencies(compute) {
        return compute[canSymbol.for('can.valueHasDependencies')] ? canReflect.valueHasDependencies(compute) : compute.computeInstance.hasDependencies;
    }
    function getObservableValue_fromDynamicKey_fromObservable(key, root, helperOptions, readOptions) {
        var getKey = function () {
            return ('' + canReflect.getValue(key)).replace('.', '\\.');
        };
        var computeValue = new SetterObservable(function getDynamicKey() {
            return observeReader.get(canReflect.getValue(root), getKey());
        }, function setDynamicKey(newVal) {
            observeReader.write(canReflect.getValue(root), observeReader.reads(getKey()), newVal);
        });
        Observation.temporarilyBind(computeValue);
        return computeValue;
    }
    function convertToArgExpression(expr) {
        if (!(expr instanceof Arg) && !(expr instanceof Literal)) {
            return new Arg(expr);
        } else {
            return expr;
        }
    }
    function toComputeOrValue(value) {
        if (canReflect.isObservableLike(value)) {
            if (canReflect.isValueLike(value) && canReflect.valueHasDependencies(value) === false) {
                return canReflect.getValue(value);
            }
            if (value.compute) {
                return value.compute;
            } else {
                return makeComputeLike(value);
            }
        }
        return value;
    }
    function toCompute(value) {
        if (value) {
            if (value.isComputed) {
                return value;
            }
            if (value.compute) {
                return value.compute;
            } else {
                return makeComputeLike(value);
            }
        }
        return value;
    }
    module.exports = {
        getObservableValue_fromKey: getObservableValue_fromKey,
        computeHasDependencies: computeHasDependencies,
        getObservableValue_fromDynamicKey_fromObservable: getObservableValue_fromDynamicKey_fromObservable,
        convertToArgExpression: convertToArgExpression,
        toComputeOrValue: toComputeOrValue,
        toCompute: toCompute
    };
});
/*can-stache@4.0.0-pre.38#expressions/hashes*/
define('can-stache/expressions/hashes', [
    'require',
    'exports',
    'module',
    'can-reflect',
    'can-observation',
    'can-stache/src/expression-helpers'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var Observation = require('can-observation');
    var expressionHelpers = require('can-stache/src/expression-helpers');
    var Hashes = function (hashes) {
        this.hashExprs = hashes;
    };
    Hashes.prototype.value = function (scope, helperOptions) {
        var hash = {};
        for (var prop in this.hashExprs) {
            var val = expressionHelpers.convertToArgExpression(this.hashExprs[prop]), value = val.value.apply(val, arguments);
            hash[prop] = {
                call: !val.modifiers || !val.modifiers.compute,
                value: value
            };
        }
        return new Observation(function () {
            var finalHash = {};
            for (var prop in hash) {
                finalHash[prop] = hash[prop].call ? canReflect.getValue(hash[prop].value) : expressionHelpers.toComputeOrValue(hash[prop].value);
            }
            return finalHash;
        });
    };
    Hashes.prototype.sourceText = function () {
        var hashes = [];
        canReflect.eachKey(this.hashExprs, function (expr, prop) {
            hashes.push(prop + '=' + expr.sourceText());
        });
        return hashes.join(' ');
    };
    module.exports = Hashes;
});
/*can-stache@4.0.0-pre.38#expressions/bracket*/
define('can-stache/expressions/bracket', [
    'require',
    'exports',
    'module',
    'can-symbol',
    'can-stache/src/expression-helpers'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var expressionHelpers = require('can-stache/src/expression-helpers');
    var Bracket = function (key, root, originalKey) {
        this.root = root;
        this.key = key;
        this[canSymbol.for('can-stache.originalKey')] = originalKey;
    };
    Bracket.prototype.value = function (scope, helpers) {
        var root = this.root ? this.root.value(scope, helpers) : scope.peek('this');
        return expressionHelpers.getObservableValue_fromDynamicKey_fromObservable(this.key.value(scope, helpers), root, scope, helpers, {});
    };
    Bracket.prototype.sourceText = function () {
        if (this.rootExpr) {
            return this.rootExpr.sourceText() + '[' + this.key + ']';
        } else {
            return '[' + this.key + ']';
        }
    };
    Bracket.prototype.closingTag = function () {
        return this[canSymbol.for('can-stache.originalKey')] || '';
    };
    module.exports = Bracket;
});
/*can-simple-map@4.0.0-pre.15#can-simple-map*/
define('can-simple-map', [
    'require',
    'exports',
    'module',
    'can-construct',
    'can-event-queue/map/map',
    'can-queues',
    'can-util/js/each/each',
    'can-observation-recorder',
    'can-reflect',
    'can-log/dev/dev',
    'can-symbol'
], function (require, exports, module) {
    var Construct = require('can-construct');
    var eventQueue = require('can-event-queue/map/map');
    var queues = require('can-queues');
    var each = require('can-util/js/each/each');
    var ObservationRecorder = require('can-observation-recorder');
    var canReflect = require('can-reflect');
    var dev = require('can-log/dev/dev');
    var canSymbol = require('can-symbol');
    var ensureMeta = function ensureMeta(obj) {
        var metaSymbol = canSymbol.for('can.meta');
        var meta = obj[metaSymbol];
        if (!meta) {
            meta = {};
            canReflect.setKeyValue(obj, metaSymbol, meta);
        }
        return meta;
    };
    var SimpleMap = Construct.extend('SimpleMap', {
        setup: function (initialData) {
            this._data = {};
            if (initialData && typeof initialData === 'object') {
                this.attr(initialData);
            }
        },
        attr: function (prop, value) {
            var self = this;
            if (arguments.length === 0) {
                ObservationRecorder.add(this, 'can.keys');
                var data = {};
                each(this._data, function (value, prop) {
                    ObservationRecorder.add(this, prop);
                    data[prop] = value;
                }, this);
                return data;
            } else if (arguments.length > 1) {
                var had = this._data.hasOwnProperty(prop);
                var old = this._data[prop];
                this._data[prop] = value;
                if (old !== value) {
                    if (typeof this._log === 'function') {
                        this._log(prop, value, old);
                    }
                    this.dispatch({
                        keyChanged: !had ? prop : undefined,
                        type: prop,
                        reasonLog: [
                            canReflect.getName(this) + '\'s',
                            prop,
                            'changed to',
                            value,
                            'from',
                            old
                        ]
                    }, [
                        value,
                        old
                    ]);
                }
            } else if (typeof prop === 'object') {
                queues.batch.start();
                canReflect.eachKey(prop, function (value, key) {
                    self.attr(key, value);
                });
                queues.batch.stop();
            } else {
                if (prop !== 'constructor') {
                    ObservationRecorder.add(this, prop);
                    return this._data[prop];
                }
                return this.constructor;
            }
        },
        serialize: function () {
            return canReflect.serialize(this, Map);
        },
        get: function () {
            return this.attr.apply(this, arguments);
        },
        set: function () {
            return this.attr.apply(this, arguments);
        },
        log: function (key) {
            var quoteString = function quoteString(x) {
                return typeof x === 'string' ? JSON.stringify(x) : x;
            };
            var meta = ensureMeta(this);
            meta.allowedLogKeysSet = meta.allowedLogKeysSet || new Set();
            if (key) {
                meta.allowedLogKeysSet.add(key);
            }
            this._log = function (prop, current, previous, log) {
                if (key && !meta.allowedLogKeysSet.has(prop)) {
                    return;
                }
                dev.log(canReflect.getName(this), '\n key ', quoteString(prop), '\n is  ', quoteString(current), '\n was ', quoteString(previous));
            };
        }
    });
    eventQueue(SimpleMap.prototype);
    canReflect.assignSymbols(SimpleMap.prototype, {
        'can.isMapLike': true,
        'can.isListLike': false,
        'can.isValueLike': false,
        'can.getKeyValue': SimpleMap.prototype.get,
        'can.setKeyValue': SimpleMap.prototype.set,
        'can.deleteKeyValue': function (prop) {
            if (this._data.hasOwnProperty(prop)) {
                var old = this._data[prop];
                delete this._data[prop];
                if (typeof this._log === 'function') {
                    this._log(prop, undefined, old);
                }
                this.dispatch({
                    keyChanged: prop,
                    type: prop,
                    reasonLog: [
                        canReflect.getName(this) + '\'s',
                        prop,
                        'deleted',
                        old
                    ]
                }, [
                    undefined,
                    old
                ]);
            }
        },
        'can.getOwnEnumerableKeys': function () {
            ObservationRecorder.add(this, 'can.keys');
            return Object.keys(this._data);
        },
        'can.assignDeep': function (source) {
            queues.batch.start();
            canReflect.assignMap(this, source);
            queues.batch.stop();
        },
        'can.updateDeep': function (source) {
            queues.batch.start();
            canReflect.updateMap(this, source);
            queues.batch.stop();
        },
        'can.keyHasDependencies': function (key) {
            return false;
        },
        'can.getKeyDependencies': function (key) {
            return undefined;
        },
        'can.getName': function () {
            return canReflect.getName(this.constructor) + '{}';
        }
    });
    module.exports = SimpleMap;
});
/*can-view-scope@4.0.0-pre.43#template-context*/
define('can-view-scope/template-context', [
    'require',
    'exports',
    'module',
    'can-simple-map'
], function (require, exports, module) {
    var SimpleMap = require('can-simple-map');
    var TemplateContext = function () {
        this.vars = new SimpleMap({});
        this.helpers = new SimpleMap({});
        this.partials = new SimpleMap({});
        this.tags = new SimpleMap({});
    };
    module.exports = TemplateContext;
});
/*can-reflect-dependencies@0.0.6#src/add-mutated-by*/
define('can-reflect-dependencies/src/add-mutated-by', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var makeDependencyRecord = function makeDependencyRecord() {
        return {
            keyDependencies: new Map(),
            valueDependencies: new Set()
        };
    };
    var makeRootRecord = function makeRootRecord() {
        return {
            mutateDependenciesForKey: new Map(),
            mutateDependenciesForValue: makeDependencyRecord()
        };
    };
    module.exports = function (mutatedByMap) {
        return function addMutatedBy(mutated, key, mutator) {
            var gotKey = arguments.length === 3;
            if (arguments.length === 2) {
                mutator = key;
                key = undefined;
            }
            if (!mutator.keyDependencies && !mutator.valueDependencies) {
                mutator = { valueDependencies: new Set([mutator]) };
            }
            var root = mutatedByMap.get(mutated);
            if (!root) {
                root = makeRootRecord();
                mutatedByMap.set(mutated, root);
            }
            if (gotKey) {
                root.mutateDependenciesForKey.set(key, makeDependencyRecord());
            }
            var dependencyRecord = gotKey ? root.mutateDependenciesForKey.get(key) : root.mutateDependenciesForValue;
            if (mutator.valueDependencies) {
                canReflect.addValues(dependencyRecord.valueDependencies, mutator.valueDependencies);
            }
            if (mutator.keyDependencies) {
                canReflect.each(mutator.keyDependencies, function (keysSet, obj) {
                    var entry = dependencyRecord.keyDependencies.get(obj);
                    if (!entry) {
                        entry = new Set();
                        dependencyRecord.keyDependencies.set(obj, entry);
                    }
                    canReflect.addValues(entry, keysSet);
                });
            }
        };
    };
});
/*can-reflect-dependencies@0.0.6#src/delete-mutated-by*/
define('can-reflect-dependencies/src/delete-mutated-by', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    module.exports = function (mutatedByMap) {
        return function deleteMutatedBy(mutated, key, mutator) {
            var gotKey = arguments.length === 3;
            var root = mutatedByMap.get(mutated);
            if (arguments.length === 2) {
                mutator = key;
                key = undefined;
            }
            if (!mutator.keyDependencies && !mutator.valueDependencies) {
                mutator = { valueDependencies: new Set([mutator]) };
            }
            var dependencyRecord = gotKey ? root.mutateDependenciesForKey.get(key) : root.mutateDependenciesForValue;
            if (mutator.valueDependencies) {
                canReflect.removeValues(dependencyRecord.valueDependencies, mutator.valueDependencies);
            }
            if (mutator.keyDependencies) {
                canReflect.each(mutator.keyDependencies, function (keysSet, obj) {
                    var entry = dependencyRecord.keyDependencies.get(obj);
                    if (entry) {
                        canReflect.removeValues(entry, keysSet);
                        if (!entry.size) {
                            dependencyRecord.keyDependencies.delete(obj);
                        }
                    }
                });
            }
        };
    };
});
/*can-reflect-dependencies@0.0.6#src/is-function*/
define('can-reflect-dependencies/src/is-function', function (require, exports, module) {
    module.exports = function isFunction(value) {
        return typeof value === 'function';
    };
});
/*can-reflect-dependencies@0.0.6#src/get-dependency-data-of*/
define('can-reflect-dependencies/src/get-dependency-data-of', [
    'require',
    'exports',
    'module',
    'can-symbol',
    'can-reflect',
    'can-reflect-dependencies/src/is-function'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    var isFunction = require('can-reflect-dependencies/src/is-function');
    var getWhatIChangeSymbol = canSymbol.for('can.getWhatIChange');
    var getKeyDependenciesSymbol = canSymbol.for('can.getKeyDependencies');
    var getValueDependenciesSymbol = canSymbol.for('can.getValueDependencies');
    var getKeyDependencies = function getKeyDependencies(obj, key) {
        if (isFunction(obj[getKeyDependenciesSymbol])) {
            return canReflect.getKeyDependencies(obj, key);
        }
    };
    var getValueDependencies = function getValueDependencies(obj) {
        if (isFunction(obj[getValueDependenciesSymbol])) {
            return canReflect.getValueDependencies(obj);
        }
    };
    var getMutatedKeyDependencies = function getMutatedKeyDependencies(mutatedByMap, obj, key) {
        var root = mutatedByMap.get(obj);
        var dependencyRecord;
        if (root && root.mutateDependenciesForKey.has(key)) {
            dependencyRecord = root.mutateDependenciesForKey.get(key);
        }
        return dependencyRecord;
    };
    var getMutatedValueDependencies = function getMutatedValueDependencies(mutatedByMap, obj) {
        var result;
        var root = mutatedByMap.get(obj);
        if (root) {
            var dependencyRecord = root.mutateDependenciesForValue;
            if (dependencyRecord.keyDependencies.size) {
                result = result || {};
                result.keyDependencies = dependencyRecord.keyDependencies;
            }
            if (dependencyRecord.valueDependencies.size) {
                result = result || {};
                result.valueDependencies = dependencyRecord.valueDependencies;
            }
        }
        return result;
    };
    var getWhatIChange = function getWhatIChange(obj, key) {
        if (isFunction(obj[getWhatIChangeSymbol])) {
            var gotKey = arguments.length === 2;
            return gotKey ? canReflect.getWhatIChange(obj, key) : canReflect.getWhatIChange(obj);
        }
    };
    var isEmptyRecord = function isEmptyRecord(record) {
        return record == null || !Object.keys(record).length || record.keyDependencies && !record.keyDependencies.size && (record.valueDependencies && !record.valueDependencies.size);
    };
    var getWhatChangesMe = function getWhatChangesMe(mutatedByMap, obj, key) {
        var gotKey = arguments.length === 3;
        var mutate = gotKey ? getMutatedKeyDependencies(mutatedByMap, obj, key) : getMutatedValueDependencies(mutatedByMap, obj);
        var derive = gotKey ? getKeyDependencies(obj, key) : getValueDependencies(obj);
        if (!isEmptyRecord(mutate) || !isEmptyRecord(derive)) {
            return Object.assign({}, mutate ? { mutate: mutate } : null, derive ? { derive: derive } : null);
        }
    };
    module.exports = function (mutatedByMap) {
        return function getDependencyDataOf(obj, key) {
            var gotKey = arguments.length === 2;
            var whatChangesMe = gotKey ? getWhatChangesMe(mutatedByMap, obj, key) : getWhatChangesMe(mutatedByMap, obj);
            var whatIChange = gotKey ? getWhatIChange(obj, key) : getWhatIChange(obj);
            if (whatChangesMe || whatIChange) {
                return Object.assign({}, whatIChange ? { whatIChange: whatIChange } : null, whatChangesMe ? { whatChangesMe: whatChangesMe } : null);
            }
        };
    };
});
/*can-reflect-dependencies@0.0.6#can-reflect-dependencies*/
define('can-reflect-dependencies', [
    'require',
    'exports',
    'module',
    'can-reflect-dependencies/src/add-mutated-by',
    'can-reflect-dependencies/src/delete-mutated-by',
    'can-reflect-dependencies/src/get-dependency-data-of'
], function (require, exports, module) {
    var addMutatedBy = require('can-reflect-dependencies/src/add-mutated-by');
    var deleteMutatedBy = require('can-reflect-dependencies/src/delete-mutated-by');
    var getDependencyDataOf = require('can-reflect-dependencies/src/get-dependency-data-of');
    var mutatedByMap = new WeakMap();
    module.exports = {
        addMutatedBy: addMutatedBy(mutatedByMap),
        deleteMutatedBy: deleteMutatedBy(mutatedByMap),
        getDependencyDataOf: getDependencyDataOf(mutatedByMap)
    };
});
/*can-view-scope@4.0.0-pre.43#scope-key-data*/
define('can-view-scope/scope-key-data', [
    'require',
    'exports',
    'module',
    'can-observation',
    'can-stache-key',
    'can-util/js/assign/assign',
    'can-reflect',
    'can-symbol',
    'can-observation-recorder',
    'can-cid/set/set',
    'can-view-scope/make-compute-like',
    'can-reflect-dependencies',
    'can-event-queue/value/value'
], function (require, exports, module) {
    'use strict';
    var Observation = require('can-observation');
    var observeReader = require('can-stache-key');
    var assign = require('can-util/js/assign/assign');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var ObservationRecorder = require('can-observation-recorder');
    var CIDSet = require('can-cid/set/set');
    var makeComputeLike = require('can-view-scope/make-compute-like');
    var canReflectDeps = require('can-reflect-dependencies');
    var valueEventBindings = require('can-event-queue/value/value');
    var dispatchSymbol = canSymbol.for('can.dispatch');
    var peekValue = ObservationRecorder.ignore(canReflect.getValue.bind(canReflect));
    var getFastPathRoot = ObservationRecorder.ignore(function (computeData) {
        if (computeData.reads && computeData.reads.length === 1) {
            var root = computeData.root;
            if (root && root[canSymbol.for('can.getValue')]) {
                root = canReflect.getValue(root);
            }
            return root && canReflect.isObservableLike(root) && canReflect.isMapLike(root) && typeof root[computeData.reads[0].key] !== 'function' && root;
        }
        return;
    });
    var isEventObject = function (obj) {
        return obj && typeof obj.batchNum === 'number' && typeof obj.type === 'string';
    };
    var ScopeKeyData = function (scope, key, options) {
        this.startingScope = scope;
        this.key = key;
        this.read = this.read.bind(this);
        this.dispatch = this.dispatch.bind(this);
        Object.defineProperty(this.read, 'name', { value: '{{' + this.key + '}}::ScopeKeyData.read' });
        Object.defineProperty(this.dispatch, 'name', { value: canReflect.getName(this) + '.dispatch' });
        var observation = this.observation = new Observation(this.read, this);
        this.options = assign({ observation: this.observation }, options);
        this.fastPath = undefined;
        this.root = undefined;
        this.initialValue = undefined;
        this.reads = undefined;
        this.setRoot = undefined;
        var valueDependencies = new CIDSet();
        valueDependencies.add(observation);
        this.dependencies = { valueDependencies: valueDependencies };
    };
    valueEventBindings(ScopeKeyData.prototype);
    Object.assign(ScopeKeyData.prototype, {
        constructor: ScopeKeyData,
        dispatch: function dispatch(newVal) {
            var old = this.value;
            this.value = newVal;
            this[dispatchSymbol].call(this, this.value, old);
        },
        onBound: function onBound() {
            this.bound = true;
            canReflect.onValue(this.observation, this.dispatch, 'notify');
            var fastPathRoot = getFastPathRoot(this);
            if (fastPathRoot) {
                this.toFastPath(fastPathRoot);
            }
            this.value = peekValue(this.observation);
        },
        onUnbound: function onUnbound() {
            this.bound = false;
            canReflect.offValue(this.observation, this.dispatch, 'notify');
            this.toSlowPath();
        },
        set: function (newVal) {
            var root = this.root || this.setRoot;
            if (root) {
                observeReader.write(root, this.reads, newVal, this.options);
            } else {
                this.startingScope.set(this.key, newVal, this.options);
            }
        },
        get: function () {
            if (ObservationRecorder.isRecording()) {
                ObservationRecorder.add(this);
                if (!this.bound) {
                    Observation.temporarilyBind(this);
                }
            }
            if (this.bound === true) {
                return this.value;
            } else {
                return this.observation.get();
            }
        },
        toFastPath: function (fastPathRoot) {
            var self = this, observation = this.observation;
            this.fastPath = true;
            var key = this.reads[0].key;
            canReflectDeps.addMutatedBy(fastPathRoot, key, { valueDependencies: new Set([self]) });
            observation.dependencyChange = function (target, newVal) {
                if (isEventObject(newVal)) {
                    throw 'no event objects!';
                }
                if (target === fastPathRoot && typeof newVal !== 'function') {
                    this.newVal = newVal;
                } else {
                    self.toSlowPath();
                }
                return Observation.prototype.dependencyChange.apply(this, arguments);
            };
            observation.onBound = function () {
                this.value = this.newVal;
            };
        },
        toSlowPath: function () {
            this.observation.dependencyChange = Observation.prototype.dependencyChange;
            this.observation.onBound = Observation.prototype.onBound;
            this.fastPath = false;
        },
        read: function () {
            if (this.root) {
                return observeReader.read(this.root, this.reads, this.options).value;
            }
            var data = this.startingScope.read(this.key, this.options);
            this.scope = data.scope;
            this.reads = data.reads;
            this.root = data.rootObserve;
            this.setRoot = data.setRoot;
            return this.initialValue = data.value;
        },
        hasDependencies: function () {
            return canReflect.valueHasDependencies(this.observation);
        }
    });
    canReflect.assignSymbols(ScopeKeyData.prototype, {
        'can.getValue': ScopeKeyData.prototype.get,
        'can.setValue': ScopeKeyData.prototype.set,
        'can.valueHasDependencies': ScopeKeyData.prototype.hasDependencies,
        'can.getValueDependencies': function () {
            var result = this.dependencies;
            if (this.fastPath) {
                var key = this.reads[0].key;
                var fastPathRoot = getFastPathRoot(this);
                result = {
                    keyDependencies: new Map([[
                            fastPathRoot,
                            new Set([key])
                        ]])
                };
            }
            return result;
        },
        'can.getPriority': function () {
            return canReflect.getPriority(this.observation);
        },
        'can.setPriority': function (newPriority) {
            canReflect.setPriority(this.observation, newPriority);
        },
        'can.getName': function () {
            return canReflect.getName(this.constructor) + '{{' + this.key + '}}';
        }
    });
    Object.defineProperty(ScopeKeyData.prototype, 'compute', {
        get: function () {
            var compute = makeComputeLike(this);
            Object.defineProperty(this, 'compute', {
                value: compute,
                writable: false,
                configurable: false
            });
            return compute;
        },
        configurable: true
    });
    module.exports = ScopeKeyData;
});
/*can-view-scope@4.0.0-pre.43#compute_data*/
define('can-view-scope/compute_data', [
    'require',
    'exports',
    'module',
    'can-view-scope/scope-key-data'
], function (require, exports, module) {
    'use strict';
    var ScopeKeyData = require('can-view-scope/scope-key-data');
    module.exports = function (scope, key, options) {
        return new ScopeKeyData(scope, key, options || { args: [] });
    };
});
/*can-stache-helpers@1.0.0-pre.0#can-stache-helpers*/
define('can-stache-helpers', [
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    namespace.stache = namespace.stache || {};
    if (namespace.stache.helpers) {
        throw new Error('You can\'t have two versions of can-stache-helpers, check your dependencies');
    } else {
        module.exports = namespace.stache.helpers = {};
    }
});
/*can-view-scope@4.0.0-pre.43#can-view-scope*/
define('can-view-scope', [
    'require',
    'exports',
    'module',
    'can-stache-key',
    'can-observation-recorder',
    'can-view-scope/template-context',
    'can-view-scope/compute_data',
    'can-util/js/assign/assign',
    'can-util/js/each/each',
    'can-namespace',
    'can-reflect',
    'can-log/dev/dev',
    'can-define-lazy-value',
    'can-stache-helpers'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var observeReader = require('can-stache-key');
        var ObservationRecorder = require('can-observation-recorder');
        var TemplateContext = require('can-view-scope/template-context');
        var makeComputeData = require('can-view-scope/compute_data');
        var assign = require('can-util/js/assign/assign');
        var each = require('can-util/js/each/each');
        var namespace = require('can-namespace');
        var canReflect = require('can-reflect');
        var canLog = require('can-log/dev/dev');
        var defineLazyValue = require('can-define-lazy-value');
        var stacheHelpers = require('can-stache-helpers');
        function Scope(context, parent, meta) {
            this._context = context;
            this._parent = parent;
            this._meta = meta || {};
            this.__cache = {};
        }
        assign(Scope, {
            read: observeReader.read,
            Refs: TemplateContext,
            keyInfo: function (attr) {
                var info = {};
                info.isDotSlash = attr.substr(0, 2) === './';
                info.isThisDot = attr.substr(0, 5) === 'this.';
                info.isThisAt = attr.substr(0, 5) === 'this@';
                info.isInCurrentContext = info.isDotSlash || info.isThisDot || info.isThisAt;
                info.isInParentContext = attr.substr(0, 3) === '../';
                info.isCurrentContext = attr === '.' || attr === 'this';
                info.isParentContext = attr === '..';
                info.isScope = attr === 'scope';
                info.isInScopeVars = attr.substr(0, 11) === 'scope.vars.';
                info.isInScope = info.isInScopeVars || attr.substr(0, 6) === 'scope.' || attr.substr(0, 6) === 'scope@';
                info.isContextBased = info.isInCurrentContext || info.isInParentContext || info.isCurrentContext || info.isParentContext;
                return info;
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
            find: function (attr) {
                return this.get(attr, { currentScopeOnly: false });
            },
            read: function (attr, options) {
                options = options || {};
                if (attr === './') {
                    attr = '.';
                }
                var keyInfo = Scope.keyInfo(attr);
                if (keyInfo.isContextBased && (this._meta.notContext || this._meta.special)) {
                    return this._parent.read(attr, options);
                }
                var currentScopeOnly = 'currentScopeOnly' in options ? options.currentScopeOnly : true;
                if (keyInfo.isInCurrentContext) {
                    currentScopeOnly = true;
                    attr = keyInfo.isDotSlash ? attr.substr(2) : attr.substr(5);
                } else if ((keyInfo.isInParentContext || keyInfo.isParentContext) && this._parent) {
                    var parent = this._parent;
                    while (parent._meta.notContext || parent._meta.special) {
                        parent = parent._parent;
                    }
                    if (keyInfo.isParentContext) {
                        return observeReader.read(parent._context, [], options);
                    }
                    return parent.read(attr.substr(3) || '.', options);
                } else if (keyInfo.isCurrentContext) {
                    return observeReader.read(this._context, [], options);
                } else if (keyInfo.isScope) {
                    return { value: this };
                }
                var keyReads = observeReader.reads(attr), readValue;
                if (keyInfo.isInScope) {
                    readValue = observeReader.read(this, keyReads.slice(1), options);
                    if (typeof readValue.value === 'undefined') {
                        readValue = this.getFromTemplateContext(attr.slice(6), options);
                    }
                    return readValue;
                }
                return this._read(keyReads, options, currentScopeOnly);
            },
            getFromSpecialContext: function (key) {
                var res = this._read([{
                        key: key,
                        at: false
                    }], { special: true });
                return res.value;
            },
            getFromTemplateContext: function (key, readOptions) {
                var keyReads = observeReader.reads(key);
                return observeReader.read(this.templateContext, keyReads, readOptions);
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
                var isRecording = ObservationRecorder.isRecording();
                while (currentScope) {
                    currentContext = currentScope._context;
                    if ((!options || options.special !== true) && currentScope._meta.special) {
                        currentScope = currentScope._parent;
                        continue;
                    }
                    if (options && options.special && !currentScope._meta.special) {
                        currentScope = currentScope._parent;
                        continue;
                    }
                    if (currentContext !== null && (typeof currentContext === 'object' || typeof currentContext === 'function')) {
                        var getObserves = ObservationRecorder.trap();
                        var data = observeReader.read(currentContext, keyReads, readOptions);
                        var observes = getObserves();
                        if (data.value !== undefined) {
                            if (!observes.length && isRecording) {
                                currentObserve = data.parent;
                                currentReads = keyReads.slice(keyReads.length - 1);
                            } else {
                                ObservationRecorder.addMany(observes);
                            }
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
                    var parentIsNormalContext = currentScope._parent && currentScope._parent._meta && !currentScope._parent._meta.notContext && !currentScope._parent._meta.special;
                    if (currentScopeOnly && parentIsNormalContext) {
                        currentScope = null;
                    } else {
                        currentScope = currentScope._parent;
                    }
                }
                var helper = this.getHelper(keyReads);
                if (helper && helper.value) {
                    return helper;
                }
                ObservationRecorder.addMany(undefinedObserves);
                return {
                    setRoot: currentSetObserve,
                    reads: currentSetReads,
                    value: undefined
                };
            },
            getHelper: function (keyReads) {
                var helper = observeReader.read(this.templateContext.helpers, keyReads, { proxyMethods: false });
                if (!helper || !helper.value) {
                    helper = observeReader.read(stacheHelpers, keyReads, { proxyMethods: false });
                }
                return helper;
            },
            get: function (key, options) {
                options = assign({ isArgument: true }, options);
                var res = this.read(key, options);
                return res.value;
            },
            peek: ObservationRecorder.ignore(function (key, options) {
                return this.get(key, options);
            }),
            peak: ObservationRecorder.ignore(function (key, options) {
                canLog.warn('peak is deprecated, please use peek instead');
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
            getTemplateContext: function () {
                var lastScope;
                var templateContext = this.getScope(function (scope) {
                    lastScope = scope;
                    return scope._context instanceof TemplateContext;
                });
                if (!templateContext) {
                    templateContext = new Scope(new TemplateContext());
                    lastScope._parent = templateContext;
                }
                return templateContext;
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
            getDataForScopeSet: function getDataForScopeSet(key, options) {
                var keyInfo = Scope.keyInfo(key), parent;
                if (keyInfo.isCurrentContext) {
                    return {
                        parent: this._context,
                        how: 'setValue'
                    };
                } else if (keyInfo.isInParentContext || keyInfo.isParentContext) {
                    parent = this._parent;
                    while (parent._meta.notContext) {
                        parent = parent._parent;
                    }
                    if (keyInfo.isParentContext) {
                        return {
                            parent: parent._context,
                            how: 'setValue'
                        };
                    }
                    return {
                        how: 'set',
                        parent: parent,
                        passOptions: true,
                        key: key.substr(3) || '.'
                    };
                } else if (keyInfo.isInScope) {
                    if (keyInfo.isInScopeVars) {
                        return {
                            parent: this.vars,
                            how: 'set',
                            key: key.substr(11)
                        };
                    }
                    key = key.substr(6);
                    return {
                        parent: this.templateContext,
                        how: 'setKeyValue',
                        key: key
                    };
                }
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
                var context = this.read(contextPath, options).value;
                if (context === undefined) {
                    return { error: 'Attempting to set a value at ' + key + ' where ' + contextPath + ' is undefined.' };
                }
                if (!canReflect.isObservableLike(context) && canReflect.isObservableLike(context[propName])) {
                    if (canReflect.isMapLike(context[propName])) {
                        return {
                            parent: context,
                            key: propName,
                            how: 'updateDeep',
                            warn: 'can-view-scope: Merging data into "' + propName + '" because its parent is non-observable'
                        };
                    } else if (canReflect.isValueLike(context[propName])) {
                        return {
                            parent: context,
                            key: propName,
                            how: 'setValue'
                        };
                    } else {
                        return {
                            parent: context,
                            how: 'write',
                            key: propName,
                            passOptions: true
                        };
                    }
                } else {
                    return {
                        parent: context,
                        how: 'write',
                        key: propName,
                        passOptions: true
                    };
                }
            },
            set: function (key, value, options) {
                options = options || {};
                var data = this.getDataForScopeSet(key, options);
                var parent = data.parent;
                if (data.error) {
                    return canLog.error(data.error);
                }
                if (data.warn) {
                    canLog.warn(data.warn);
                }
                switch (data.how) {
                case 'set':
                    parent.set(data.key, value, data.passOptions ? options : undefined);
                    break;
                case 'write':
                    observeReader.write(parent, data.key, value, options);
                    break;
                case 'setValue':
                    canReflect.setValue('key' in data ? parent[data.key] : parent, value);
                    break;
                case 'setKeyValue':
                    canReflect.setKeyValue(parent, data.key, value);
                    break;
                case 'updateDeep':
                    canReflect.updateDeep(parent[data.key], value);
                    break;
                }
            },
            attr: ObservationRecorder.ignore(function (key, value, options) {
                canLog.warn('can-view-scope::attr is deprecated, please use peek, get or set');
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
        defineLazyValue(Scope.prototype, 'templateContext', function () {
            return this.getTemplateContext()._context;
        });
        defineLazyValue(Scope.prototype, 'vars', function () {
            return this.templateContext.vars;
        });
        defineLazyValue(Scope.prototype, 'root', function () {
            return this.getRoot();
        });
        defineLazyValue(Scope.prototype, 'helpers', function () {
            return stacheHelpers;
        });
        var specialKeywords = [
            'index',
            'key',
            'element',
            'event',
            'viewModel',
            'arguments',
            'helperOptions'
        ];
        specialKeywords.forEach(function (key) {
            Object.defineProperty(Scope.prototype, key, {
                get: function () {
                    return this.getFromSpecialContext(key);
                }
            });
        });
        namespace.view = namespace.view || {};
        module.exports = namespace.view.Scope = Scope;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-stache@4.0.0-pre.38#src/set-identifier*/
define('can-stache/src/set-identifier', function (require, exports, module) {
    module.exports = function SetIdentifier(value) {
        this.value = value;
    };
});
/*can-stache@4.0.0-pre.38#expressions/call*/
define('can-stache/expressions/call', [
    'require',
    'exports',
    'module',
    'can-view-scope',
    'can-stache/expressions/hashes',
    'can-stache/src/set-identifier',
    'can-observation',
    'can-symbol',
    'can-simple-observable/setter/setter',
    'can-stache/src/expression-helpers',
    'can-reflect',
    'can-util/js/is-empty-object/is-empty-object',
    'can-assign'
], function (require, exports, module) {
    var Scope = require('can-view-scope');
    var Hashes = require('can-stache/expressions/hashes');
    var SetIdentifier = require('can-stache/src/set-identifier');
    var Observation = require('can-observation');
    var canSymbol = require('can-symbol');
    var sourceTextSymbol = canSymbol.for('can-stache.sourceText');
    var SetterObservable = require('can-simple-observable/setter/setter');
    var expressionHelpers = require('can-stache/src/expression-helpers');
    var canReflect = require('can-reflect');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var assign = require('can-assign');
    var Call = function (methodExpression, argExpressions) {
        this.methodExpr = methodExpression;
        this.argExprs = argExpressions.map(expressionHelpers.convertToArgExpression);
    };
    Call.prototype.args = function (scope) {
        var hashExprs = {};
        var args = [];
        for (var i = 0, len = this.argExprs.length; i < len; i++) {
            var arg = this.argExprs[i];
            if (arg.expr instanceof Hashes) {
                assign(hashExprs, arg.expr.hashExprs);
            }
            var value = arg.value.apply(arg, arguments);
            args.push({
                call: !arg.modifiers || !arg.modifiers.compute,
                value: value
            });
        }
        return function (doNotWrapArguments) {
            var finalArgs = [];
            if (!isEmptyObject(hashExprs)) {
                finalArgs.hashExprs = hashExprs;
            }
            for (var i = 0, len = args.length; i < len; i++) {
                if (doNotWrapArguments) {
                    finalArgs[i] = args[i].value;
                } else {
                    finalArgs[i] = args[i].call ? canReflect.getValue(args[i].value) : expressionHelpers.toCompute(args[i].value);
                }
            }
            return finalArgs;
        };
    };
    Call.prototype.value = function (scope, helperOptions) {
        var method = this.methodExpr.value(scope);
        var initialValue = method && method.initialValue;
        var isLiveBound = initialValue && initialValue.isLiveBound;
        var isHelper = initialValue && initialValue.isHelper;
        this.isHelper = isHelper;
        var getArgs = this.args(scope);
        var computeFn = function (newVal) {
            var func = canReflect.getValue(method);
            if (typeof func === 'function') {
                var args = getArgs(isLiveBound);
                if (isHelper && helperOptions) {
                    if (args.hashExprs && helperOptions.exprData) {
                        helperOptions.exprData.hashExprs = args.hashExprs;
                    }
                    args.push(helperOptions);
                }
                if (arguments.length) {
                    args.unshift(new SetIdentifier(newVal));
                }
                return func.apply(scope.peek('this'), args);
            }
        };
        Object.defineProperty(computeFn, 'name', { value: '{{' + this.sourceText() + '}}' });
        if (helperOptions && helperOptions.doNotWrapInObservation) {
            return computeFn();
        } else {
            var computeValue = new SetterObservable(computeFn, computeFn);
            Observation.temporarilyBind(computeValue);
            return computeValue;
        }
    };
    Call.prototype.sourceText = function () {
        var args = this.argExprs.map(function (arg) {
            return arg.sourceText();
        });
        return this.methodExpr.sourceText() + '(' + args.join(',') + ')';
    };
    Call.prototype.closingTag = function () {
        if (this.methodExpr[sourceTextSymbol]) {
            return this.methodExpr[sourceTextSymbol];
        }
        return this.methodExpr.key;
    };
    module.exports = Call;
});
/*can-stache@4.0.0-pre.38#src/key-observable*/
define('can-stache/src/key-observable', [
    'require',
    'exports',
    'module',
    'can-simple-observable/settable/settable',
    'can-stache-key'
], function (require, exports, module) {
    var SettableObservable = require('can-simple-observable/settable/settable');
    var stacheKey = require('can-stache-key');
    function KeyObservable(root, key) {
        key = '' + key;
        this.key = key;
        this.root = root;
        SettableObservable.call(this, function () {
            return stacheKey.get(this, key);
        }, root);
    }
    KeyObservable.prototype = Object.create(SettableObservable.prototype);
    KeyObservable.prototype.set = function (newVal) {
        stacheKey.set(this.root, this.key, newVal);
    };
    module.exports = KeyObservable;
});
/*can-stache@4.0.0-pre.38#src/utils*/
define('can-stache/src/utils', [
    'require',
    'exports',
    'module',
    'can-view-scope',
    'can-observation',
    'can-observation-recorder',
    'can-stache-key',
    'can-reflect',
    'can-stache/src/key-observable',
    'can-log/dev/dev',
    'can-util/js/is-empty-object/is-empty-object',
    'can-util/js/is-array-like/is-array-like'
], function (require, exports, module) {
    var Scope = require('can-view-scope');
    var Observation = require('can-observation');
    var ObservationRecorder = require('can-observation-recorder');
    var observationReader = require('can-stache-key');
    var canReflect = require('can-reflect');
    var KeyObservable = require('can-stache/src/key-observable');
    var dev = require('can-log/dev/dev');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    var noop = function () {
    };
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
        convertToScopes: function (helperOptions, scope, nodeList, truthyRenderer, falseyRenderer, isStringOnly) {
            helperOptions.fn = truthyRenderer ? this.makeRendererConvertScopes(truthyRenderer, scope, nodeList, isStringOnly) : noop;
            helperOptions.inverse = falseyRenderer ? this.makeRendererConvertScopes(falseyRenderer, scope, nodeList, isStringOnly) : noop;
            helperOptions.isSection = !!(truthyRenderer || falseyRenderer);
        },
        makeRendererConvertScopes: function (renderer, parentScope, nodeList, observeObservables) {
            var rendererWithScope = function (ctx, parentNodeList) {
                return renderer(ctx || parentScope, parentNodeList);
            };
            var convertedRenderer = function (newScope, newOptions, parentNodeList) {
                if (newScope !== undefined && !(newScope instanceof Scope)) {
                    if (parentScope) {
                        newScope = parentScope.add(newScope);
                    } else {
                        newScope = new Scope(newScope || {});
                    }
                }
                var result = rendererWithScope(newScope, parentNodeList || nodeList);
                return result;
            };
            return observeObservables ? convertedRenderer : ObservationRecorder.ignore(convertedRenderer);
        },
        getItemsStringContent: function (items, isObserveList, helperOptions) {
            var txt = '', len = observationReader.get(items, 'length'), isObservable = canReflect.isObservableLike(items);
            for (var i = 0; i < len; i++) {
                var item = isObservable ? new KeyObservable(items, i) : items[i];
                txt += helperOptions.fn(item);
            }
            return txt;
        },
        getItemsFragContent: function (items, helperOptions, scope) {
            var result = [], len = observationReader.get(items, 'length'), isObservable = canReflect.isObservableLike(items), hashExprs = helperOptions.exprData && helperOptions.exprData.hashExprs, hashOptions;
            if (!isEmptyObject(hashExprs)) {
                hashOptions = {};
                canReflect.eachKey(hashExprs, function (exprs, key) {
                    hashOptions[exprs.key] = key;
                });
            }
            for (var i = 0; i < len; i++) {
                var aliases = {};
                var item = isObservable ? new KeyObservable(items, i) : items[i];
                if (!isEmptyObject(hashOptions)) {
                    if (hashOptions.value) {
                        aliases[hashOptions.value] = item;
                    }
                    if (hashOptions.index) {
                        aliases[hashOptions.index] = i;
                    }
                }
                result.push(helperOptions.fn(scope.add(aliases, { notContext: true }).add({ index: i }, { special: true }).add(item)));
            }
            return result;
        }
    };
});
/*can-attribute-encoder@0.3.2#can-attribute-encoder*/
define('can-attribute-encoder', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-log/dev/dev'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    var dev = require('can-log/dev/dev');
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
    var caseMattersAttributes = makeMap('allowReorder,attributeName,attributeType,autoReverse,baseFrequency,baseProfile,calcMode,clipPathUnits,contentScriptType,contentStyleType,diffuseConstant,edgeMode,externalResourcesRequired,filterRes,filterUnits,glyphRef,gradientTransform,gradientUnits,kernelMatrix,kernelUnitLength,keyPoints,keySplines,keyTimes,lengthAdjust,limitingConeAngle,markerHeight,markerUnits,markerWidth,maskContentUnits,maskUnits,patternContentUnits,patternTransform,patternUnits,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,repeatCount,repeatDur,requiredExtensions,requiredFeatures,specularConstant,specularExponent,spreadMethod,startOffset,stdDeviation,stitchTiles,surfaceScale,systemLanguage,tableValues,textLength,viewBox,viewTarget,xChannelSelector,yChannelSelector');
    function camelCaseToSpinalCase(match, lowerCaseChar, upperCaseChar) {
        return lowerCaseChar + '-' + upperCaseChar.toLowerCase();
    }
    function startsWith(allOfIt, startsWith) {
        return allOfIt.indexOf(startsWith) === 0;
    }
    function endsWith(allOfIt, endsWith) {
        return allOfIt.length - allOfIt.indexOf(endsWith) === endsWith.length;
    }
    var regexes = {
        leftParens: /\(/g,
        rightParens: /\)/g,
        leftBrace: /\{/g,
        rightBrace: /\}/g,
        camelCase: /([a-z])([A-Z])/g,
        forwardSlash: /\//g,
        space: /\s/g,
        uppercase: /[A-Z]/g,
        uppercaseDelimiterThenChar: /:u:([a-z])/g,
        caret: /\^/g,
        dollar: /\$/g,
        at: /@/g
    };
    var delimiters = {
        prependUppercase: ':u:',
        replaceSpace: ':s:',
        replaceForwardSlash: ':f:',
        replaceLeftParens: ':lp:',
        replaceRightParens: ':rp:',
        replaceLeftBrace: ':lb:',
        replaceRightBrace: ':rb:',
        replaceCaret: ':c:',
        replaceDollar: ':d:',
        replaceAt: ':at:'
    };
    var encoder = {};
    encoder.encode = function (name) {
        var encoded = name;
        if (!caseMattersAttributes[encoded] && encoded.match(regexes.camelCase)) {
            if (startsWith(encoded, 'on:') || endsWith(encoded, ':to') || endsWith(encoded, ':from') || endsWith(encoded, ':bind')) {
                encoded = encoded.replace(regexes.uppercase, function (char) {
                    return delimiters.prependUppercase + char.toLowerCase();
                });
            } else {
                encoded = encoded.replace(regexes.camelCase, camelCaseToSpinalCase);
                dev.warn('can-attribute-encoder: Found attribute with name: ' + name + '. Converting to: ' + encoded + '.');
            }
        }
        encoded = encoded.replace(regexes.space, delimiters.replaceSpace).replace(regexes.forwardSlash, delimiters.replaceForwardSlash).replace(regexes.leftParens, delimiters.replaceLeftParens).replace(regexes.rightParens, delimiters.replaceRightParens).replace(regexes.leftBrace, delimiters.replaceLeftBrace).replace(regexes.rightBrace, delimiters.replaceRightBrace).replace(regexes.caret, delimiters.replaceCaret).replace(regexes.dollar, delimiters.replaceDollar).replace(regexes.at, delimiters.replaceAt);
        return encoded;
    };
    encoder.decode = function (name) {
        var decoded = name;
        decoded = decoded.replace(delimiters.replaceLeftParens, '(').replace(delimiters.replaceRightParens, ')').replace(delimiters.replaceLeftBrace, '{').replace(delimiters.replaceRightBrace, '}').replace(delimiters.replaceForwardSlash, '/').replace(delimiters.replaceSpace, ' ').replace(delimiters.replaceCaret, '^').replace(delimiters.replaceDollar, '$').replace(delimiters.replaceAt, '@');
        if (!caseMattersAttributes[decoded] && decoded.match(regexes.uppercaseDelimiterThenChar)) {
            if (startsWith(decoded, 'on:') || endsWith(decoded, ':to') || endsWith(decoded, ':from') || endsWith(decoded, ':bind')) {
                decoded = decoded.replace(regexes.uppercaseDelimiterThenChar, function (match, char) {
                    return char.toUpperCase();
                });
            }
        }
        return decoded;
    };
    if (namespace.encoder) {
        throw new Error('You can\'t have two versions of can-attribute-encoder, check your dependencies');
    } else {
        module.exports = namespace.encoder = encoder;
    }
});
/*can-view-parser@4.0.0-pre.0#can-view-parser*/
define('can-view-parser', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-log/dev/dev',
    'can-attribute-encoder'
], function (require, exports, module) {
    var namespace = require('can-namespace'), dev = require('can-log/dev/dev'), encoder = require('can-attribute-encoder');
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
    function countLines(input) {
        return input.split('\n').length - 1;
    }
    var alphaNumeric = 'A-Za-z0-9', alphaNumericHU = '-:_' + alphaNumeric, magicStart = '{{', endTag = new RegExp('^<\\/([' + alphaNumericHU + ']+)[^>]*>'), magicMatch = new RegExp('\\{\\{(![\\s\\S]*?!|[\\s\\S]*?)\\}\\}\\}?', 'g'), space = /\s/, alphaRegex = new RegExp('[' + alphaNumeric + ']');
    var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed');
    var caseMattersElements = makeMap('altGlyph,altGlyphDef,altGlyphItem,animateColor,animateMotion,animateTransform,clipPath,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,foreignObject,glyphRef,linearGradient,radialGradient,textPath');
    var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');
    var special = makeMap('script');
    var tokenTypes = 'start,end,close,attrStart,attrEnd,attrValue,chars,comment,special,done'.split(',');
    var startOppositesMap = {
        '{': '}',
        '(': ')'
    };
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
                        var end = arguments.length;
                        if (arguments[end - 1] === undefined) {
                            end = arguments.length - 1;
                        }
                        end = arguments.length;
                        intermediate.push({
                            tokenType: name,
                            args: [].slice.call(arguments, 0, end)
                        });
                    }
                };
            });
        }
        function parseStartTag(tag, tagName, rest, unary) {
            tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();
            if (closeSelf[tagName] && stack.last() === tagName) {
                parseEndTag('', tagName);
            }
            unary = empty[tagName] || !!unary;
            handler.start(tagName, unary, lineNo);
            if (!unary) {
                stack.push(tagName);
            }
            HTMLParser.parseAttrs(rest, handler, lineNo);
            lineNo += countLines(tag);
            handler.end(tagName, unary, lineNo);
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
            if (typeof tag === 'undefined') {
                if (stack.length > 0) {
                    if (handler.filename) {
                        dev.warn(handler.filename + ': expected closing tag </' + stack[pos] + '>');
                    } else {
                        dev.warn('expected closing tag </' + stack[pos] + '>');
                    }
                }
            } else if (pos < 0 || pos !== stack.length - 1) {
                if (stack.length > 0) {
                    if (handler.filename) {
                        dev.warn(handler.filename + ':' + lineNo + ': unexpected closing tag ' + tag + ' expected </' + stack[stack.length - 1] + '>');
                    } else {
                        dev.warn(lineNo + ': unexpected closing tag ' + tag + ' expected </' + stack[stack.length - 1] + '>');
                    }
                } else {
                    if (handler.filename) {
                        dev.warn(handler.filename + ':' + lineNo + ': unexpected closing tag ' + tag);
                    } else {
                        dev.warn(lineNo + ': unexpected closing tag ' + tag);
                    }
                }
            }
            if (pos >= 0) {
                for (var i = stack.length - 1; i >= pos; i--) {
                    if (handler.close) {
                        handler.close(stack[i], lineNo);
                    }
                }
                stack.length = pos;
            }
        }
        function parseMustache(mustache, inside) {
            if (handler.special) {
                handler.special(inside, lineNo);
            }
        }
        var callChars = function () {
            if (charsText) {
                if (handler.chars) {
                    handler.chars(charsText, lineNo);
                }
                lineNo += countLines(charsText);
            }
            charsText = '';
        };
        var index, chars, match, lineNo, stack = [], last = html, charsText = '';
        lineNo = 1;
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
                            handler.comment(html.substring(4, index), lineNo);
                        }
                        lineNo += countLines(html.substring(0, index + 3));
                        html = html.substring(index + 3);
                        chars = false;
                    }
                } else if (html.indexOf('</') === 0) {
                    match = html.match(endTag);
                    if (match) {
                        callChars();
                        match[0].replace(endTag, parseEndTag);
                        lineNo += countLines(html.substring(0, match[0].length));
                        html = html.substring(match[0].length);
                        chars = false;
                    }
                } else if (html.indexOf('<') === 0) {
                    var res = HTMLParser.searchStartTag(html);
                    if (res) {
                        callChars();
                        parseStartTag.apply(null, res.match);
                        html = res.html;
                        chars = false;
                    }
                } else if (html.indexOf(magicStart) === 0) {
                    match = html.match(magicMatch);
                    if (match) {
                        callChars();
                        match[0].replace(magicMatch, parseMustache);
                        lineNo += countLines(html.substring(0, match[0].length));
                        html = html.substring(match[0].length);
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
                        handler.chars(text, lineNo);
                    }
                    lineNo += countLines(text);
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
        handler.done(lineNo);
        return intermediate;
    };
    var callAttrStart = function (state, curIndex, handler, rest, lineNo) {
        var attrName = rest.substring(typeof state.nameStart === 'number' ? state.nameStart : curIndex, curIndex), newAttrName = encoder.encode(attrName);
        state.attrStart = newAttrName;
        handler.attrStart(state.attrStart, lineNo);
        state.inName = false;
    };
    var callAttrEnd = function (state, curIndex, handler, rest, lineNo) {
        if (state.valueStart !== undefined && state.valueStart < curIndex) {
            var val = rest.substring(state.valueStart, curIndex);
            var quotedVal, closedQuote;
            quotedVal = rest.substring(state.valueStart - 1, curIndex + 1);
            quotedVal = quotedVal.trim();
            closedQuote = quotedVal.charAt(quotedVal.length - 1);
            if (state.inQuote !== closedQuote) {
                if (handler.filename) {
                    dev.warn(handler.filename + ':' + lineNo + ': End quote is missing for ' + val);
                } else {
                    dev.warn(lineNo + ': End quote is missing for ' + val);
                }
            }
            handler.attrValue(val, lineNo);
        }
        handler.attrEnd(state.attrStart, lineNo);
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
    HTMLParser.parseAttrs = function (rest, handler, lineNo) {
        if (!rest) {
            return;
        }
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
                    handler.attrValue(rest.substring(state.valueStart, curIndex), lineNo);
                } else if (state.inName && state.nameStart < curIndex) {
                    callAttrStart(state, curIndex, handler, rest, lineNo);
                    callAttrEnd(state, curIndex, handler, rest, lineNo);
                } else if (state.lookingForValue) {
                    state.inValue = true;
                } else if (state.lookingForEq && state.attrStart) {
                    callAttrEnd(state, curIndex, handler, rest, lineNo);
                }
                magicMatch.lastIndex = curIndex;
                var match = magicMatch.exec(rest);
                if (match) {
                    handler.special(match[1], lineNo);
                    i = curIndex + match[0].length;
                    if (state.inValue) {
                        state.valueStart = curIndex + match[0].length;
                    }
                }
            } else if (state.inValue) {
                if (state.inQuote) {
                    if (cur === state.inQuote) {
                        callAttrEnd(state, curIndex, handler, rest, lineNo);
                    }
                } else if (space.test(cur)) {
                    callAttrEnd(state, curIndex, handler, rest, lineNo);
                }
            } else if (cur === '=' && (state.lookingForEq || state.lookingForName || state.inName)) {
                if (!state.attrStart) {
                    callAttrStart(state, curIndex, handler, rest, lineNo);
                }
                state.lookingForValue = true;
                state.lookingForEq = false;
                state.lookingForName = false;
            } else if (state.inName) {
                var started = rest[state.nameStart], otherStart, otherOpposite;
                if (startOppositesMap[started] === cur) {
                    otherStart = started === '{' ? '(' : '{';
                    otherOpposite = startOppositesMap[otherStart];
                    if (rest[curIndex + 1] === otherOpposite) {
                        callAttrStart(state, curIndex + 2, handler, rest, lineNo);
                        i++;
                    } else {
                        callAttrStart(state, curIndex + 1, handler, rest, lineNo);
                    }
                    state.lookingForEq = true;
                } else if (space.test(cur) && started !== '{' && started !== '(') {
                    callAttrStart(state, curIndex, handler, rest, lineNo);
                    state.lookingForEq = true;
                }
            } else if (state.lookingForName) {
                if (!space.test(cur)) {
                    if (state.attrStart) {
                        callAttrEnd(state, curIndex, handler, rest, lineNo);
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
                    callAttrEnd(state, curIndex, handler, rest, lineNo);
                }
            }
        }
        if (state.inName) {
            callAttrStart(state, curIndex + 1, handler, rest, lineNo);
            callAttrEnd(state, curIndex + 1, handler, rest, lineNo);
        } else if (state.lookingForEq || state.lookingForValue || state.inValue) {
            callAttrEnd(state, curIndex + 1, handler, rest, lineNo);
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
/*can-util@3.10.18#js/set-immediate/set-immediate*/
define('can-util/js/set-immediate/set-immediate', [
    'require',
    'exports',
    'module',
    'can-globals/global/global'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var global = require('can-globals/global/global')();
        module.exports = global.setImmediate || function (cb) {
            return setTimeout(cb, 0);
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/child-nodes/child-nodes*/
define('can-util/dom/child-nodes/child-nodes', function (require, exports, module) {
    'use strict';
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
/*can-util@3.10.18#dom/contains/contains*/
define('can-util/dom/contains/contains', function (require, exports, module) {
    'use strict';
    module.exports = function (child) {
        return this.contains(child);
    };
});
/*can-util@3.10.18#dom/mutate/mutate*/
define('can-util/dom/mutate/mutate', [
    'require',
    'exports',
    'module',
    'can-util/js/make-array/make-array',
    'can-util/js/set-immediate/set-immediate',
    'can-cid',
    'can-globals/mutation-observer/mutation-observer',
    'can-util/dom/child-nodes/child-nodes',
    'can-util/dom/contains/contains',
    'can-util/dom/dispatch/dispatch',
    'can-globals/document/document',
    'can-util/dom/data/data'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var makeArray = require('can-util/js/make-array/make-array');
        var setImmediate = require('can-util/js/set-immediate/set-immediate');
        var CID = require('can-cid');
        var getMutationObserver = require('can-globals/mutation-observer/mutation-observer');
        var childNodes = require('can-util/dom/child-nodes/child-nodes');
        var domContains = require('can-util/dom/contains/contains');
        var domDispatch = require('can-util/dom/dispatch/dispatch');
        var getDocument = require('can-globals/document/document');
        var domData = require('can-util/dom/data/data');
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
                    if (event === 'removed') {
                        domData.delete.call(elem);
                    }
                    for (var j = 0, child; (child = children[j]) !== undefined; j++) {
                        cid = CID(child);
                        if (!dispatched[cid]) {
                            domDispatch.call(child, event, [], false);
                            if (event === 'removed') {
                                domData.delete.call(child);
                            }
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
            var doc = getDocument() || firstElement.ownerDocument || firstElement;
            var root = doc.contains ? doc : doc.documentElement;
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
                var doc = getDocument() || firstElement.ownerDocument || firstElement;
                var root = doc.contains ? doc : doc.documentElement;
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
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-view-nodelist@4.0.0-pre.2#can-view-nodelist*/
define('can-view-nodelist', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-reflect',
    'can-util/dom/mutate/mutate'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    var canReflect = require('can-reflect');
    var domMutate = require('can-util/dom/mutate/mutate');
    var nodeMap = new Map(), splice = [].splice, push = [].push, itemsInChildListTree = function (list) {
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
        }, replacementMap = function (replacements) {
            var map = new Map();
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
            newNodes = canReflect.toArray(newNodes);
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
            var index = 0, rMap = replacementMap(list.replacements), rCount = list.replacements.length;
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
            nodeList.forEach(function (node) {
                if (node.nodeType) {
                    if (!nodeList.replacements) {
                        nodeMap['delete'](node);
                    }
                    nodes.push(node);
                } else {
                    push.apply(nodes, nodeLists.unregister(node, true));
                }
            });
            (nodeList.deepChildren || []).forEach(function (nodeList) {
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
            elementsToBeRemoved.forEach(function (child) {
                domMutate.removeChild.call(parent, child);
            });
        },
        nodeMap: nodeMap
    };
    module.exports = namespace.nodeLists = nodeLists;
});
/*can-util@3.10.18#dom/fragment/fragment*/
define('can-util/dom/fragment/fragment', [
    'require',
    'exports',
    'module',
    'can-globals/document/document',
    'can-util/dom/child-nodes/child-nodes'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getDocument = require('can-globals/document/document'), childNodes = require('can-util/dom/child-nodes/child-nodes');
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
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/frag/frag*/
define('can-util/dom/frag/frag', [
    'require',
    'exports',
    'module',
    'can-globals/document/document',
    'can-util/dom/fragment/fragment',
    'can-util/js/each/each',
    'can-util/dom/child-nodes/child-nodes'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getDocument = require('can-globals/document/document');
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
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-cid@1.1.2#map/map*/
define('can-cid/map/map', [
    'require',
    'exports',
    'module',
    'can-cid',
    'can-cid/helpers'
], function (require, exports, module) {
    'use strict';
    var getCID = require('can-cid').get;
    var helpers = require('can-cid/helpers');
    var CIDMap;
    if (typeof Map !== 'undefined') {
        CIDMap = Map;
    } else {
        var CIDMap = function () {
            this.values = {};
        };
        CIDMap.prototype.set = function (key, value) {
            this.values[getCID(key)] = {
                key: key,
                value: value
            };
        };
        CIDMap.prototype['delete'] = function (key) {
            var has = getCID(key) in this.values;
            if (has) {
                delete this.values[getCID(key)];
            }
            return has;
        };
        CIDMap.prototype.forEach = function (cb, thisArg) {
            helpers.each(this.values, function (pair) {
                return cb.call(thisArg || this, pair.value, pair.key, this);
            }, this);
        };
        CIDMap.prototype.has = function (key) {
            return getCID(key) in this.values;
        };
        CIDMap.prototype.get = function (key) {
            var obj = this.values[getCID(key)];
            return obj && obj.value;
        };
        CIDMap.prototype.clear = function () {
            return this.values = {};
        };
        Object.defineProperty(CIDMap.prototype, 'size', {
            get: function () {
                var size = 0;
                helpers.each(this.values, function () {
                    size++;
                });
                return size;
            }
        });
    }
    module.exports = CIDMap;
});
/*can-util@3.10.18#dom/is-of-global-document/is-of-global-document*/
define('can-util/dom/is-of-global-document/is-of-global-document', [
    'require',
    'exports',
    'module',
    'can-globals/document/document'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getDocument = require('can-globals/document/document');
        module.exports = function (el) {
            return (el.ownerDocument || el) === getDocument();
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/events/make-mutation-event/make-mutation-event*/
define('can-util/dom/events/make-mutation-event/make-mutation-event', [
    'require',
    'exports',
    'module',
    'can-util/dom/events/events',
    'can-util/dom/data/data',
    'can-globals/mutation-observer/mutation-observer',
    'can-util/dom/dispatch/dispatch',
    'can-util/dom/mutation-observer/document/document',
    'can-globals/document/document',
    'can-cid/map/map',
    'can-util/js/string/string',
    'can-util/dom/is-of-global-document/is-of-global-document'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var events = require('can-util/dom/events/events');
        var domData = require('can-util/dom/data/data');
        var getMutationObserver = require('can-globals/mutation-observer/mutation-observer');
        var domDispatch = require('can-util/dom/dispatch/dispatch');
        var mutationDocument = require('can-util/dom/mutation-observer/document/document');
        var getDocument = require('can-globals/document/document');
        var CIDMap = require('can-cid/map/map');
        var string = require('can-util/js/string/string');
        require('can-util/dom/is-of-global-document/is-of-global-document');
        module.exports = function (specialEventName, mutationNodesProperty) {
            var originalAdd = events.addEventListener, originalRemove = events.removeEventListener;
            events.addEventListener = function (eventName) {
                if (eventName === specialEventName && getMutationObserver()) {
                    var documentElement = getDocument().documentElement;
                    var specialEventData = domData.get.call(documentElement, specialEventName + 'Data');
                    if (!specialEventData) {
                        specialEventData = {
                            handler: function (mutatedNode) {
                                if (specialEventData.nodeIdsRespondingToInsert.has(mutatedNode)) {
                                    domDispatch.call(mutatedNode, specialEventName, [], false);
                                    specialEventData.nodeIdsRespondingToInsert.delete(mutatedNode);
                                }
                            },
                            nodeIdsRespondingToInsert: new CIDMap()
                        };
                        mutationDocument['on' + string.capitalize(mutationNodesProperty)](specialEventData.handler);
                        domData.set.call(documentElement, specialEventName + 'Data', specialEventData);
                    }
                    if (this.nodeType !== 11) {
                        var count = specialEventData.nodeIdsRespondingToInsert.get(this) || 0;
                        specialEventData.nodeIdsRespondingToInsert.set(this, count + 1);
                    }
                }
                return originalAdd.apply(this, arguments);
            };
            events.removeEventListener = function (eventName) {
                if (eventName === specialEventName && getMutationObserver()) {
                    var documentElement = getDocument().documentElement;
                    var specialEventData = domData.get.call(documentElement, specialEventName + 'Data');
                    if (specialEventData) {
                        var newCount = specialEventData.nodeIdsRespondingToInsert.get(this) - 1;
                        if (newCount) {
                            specialEventData.nodeIdsRespondingToInsert.set(this, newCount);
                        } else {
                            specialEventData.nodeIdsRespondingToInsert.delete(this);
                        }
                        if (!specialEventData.nodeIdsRespondingToInsert.size) {
                            mutationDocument['off' + string.capitalize(mutationNodesProperty)](specialEventData.handler);
                            domData.clean.call(documentElement, specialEventName + 'Data');
                        }
                    }
                }
                return originalRemove.apply(this, arguments);
            };
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/events/removed/removed*/
define('can-util/dom/events/removed/removed', [
    'require',
    'exports',
    'module',
    'can-util/dom/events/make-mutation-event/make-mutation-event'
], function (require, exports, module) {
    'use strict';
    var makeMutationEvent = require('can-util/dom/events/make-mutation-event/make-mutation-event');
    makeMutationEvent('removed', 'removedNodes');
});
/*can-view-live@4.0.0-pre.20#lib/core*/
define('can-view-live/lib/core', [
    'require',
    'exports',
    'module',
    'can-view-parser',
    'can-util/dom/events/events',
    'can-view-nodelist',
    'can-util/dom/frag/frag',
    'can-util/dom/child-nodes/child-nodes',
    'can-reflect',
    'can-reflect-dependencies',
    'can-util/dom/events/removed/removed'
], function (require, exports, module) {
    var parser = require('can-view-parser');
    var domEvents = require('can-util/dom/events/events');
    var nodeLists = require('can-view-nodelist');
    var makeFrag = require('can-util/dom/frag/frag');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var canReflect = require('can-reflect');
    var canReflectDeps = require('can-reflect-dependencies');
    require('can-util/dom/events/removed/removed');
    var live = {
        setup: function (el, bind, unbind) {
            var tornDown = false, data, teardown = function () {
                    if (!tornDown) {
                        tornDown = true;
                        unbind(data);
                        domEvents.removeEventListener.call(el, 'removed', teardown);
                    }
                    return true;
                };
            data = {
                teardownCheck: function (parent) {
                    return parent ? false : teardown();
                }
            };
            domEvents.addEventListener.call(el, 'removed', teardown);
            bind(data);
            return data;
        },
        listen: function (el, compute, change) {
            return live.setup(el, function bind() {
                canReflect.onValue(compute, change, 'notify');
                canReflectDeps.addMutatedBy(el, compute);
            }, function unbind(data) {
                canReflect.offValue(compute, change, 'notify');
                canReflectDeps.deleteMutatedBy(el, compute);
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
/*can-types@1.1.5#can-types*/
define('can-types', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-reflect',
    'can-symbol',
    'can-log/dev/dev'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var dev = require('can-log/dev/dev');
    var types = {
        isMapLike: function (obj) {
            dev.warn('can-types.isMapLike(obj) is deprecated, please use `canReflect.isObservableLike(obj) && canReflect.isMapLike(obj)` instead.');
            return canReflect.isObservableLike(obj) && canReflect.isMapLike(obj);
        },
        isListLike: function (obj) {
            dev.warn('can-types.isListLike(obj) is deprecated, please use `canReflect.isObservableLike(obj) && canReflect.isListLike(obj)` instead.');
            return canReflect.isObservableLike(obj) && canReflect.isListLike(obj);
        },
        isPromise: function (obj) {
            dev.warn('can-types.isPromise is deprecated, please use canReflect.isPromise instead.');
            return canReflect.isPromise(obj);
        },
        isConstructor: function (func) {
            dev.warn('can-types.isConstructor is deprecated, please use canReflect.isConstructorLike instead.');
            return canReflect.isConstructorLike(func);
        },
        isCallableForValue: function (obj) {
            dev.warn('can-types.isCallableForValue(obj) is deprecated, please use `canReflect.isFunctionLike(obj) && !canReflect.isConstructorLike(obj)` instead.');
            return obj && canReflect.isFunctionLike(obj) && !canReflect.isConstructorLike(obj);
        },
        isCompute: function (obj) {
            dev.warn('can-types.isCompute is deprecated.');
            return obj && obj.isComputed;
        },
        get iterator() {
            dev.warn('can-types.iterator is deprecated, use `canSymbol.iterator || canSymbol.for("iterator")` instead.');
            return canSymbol.iterator || canSymbol.for('iterator');
        },
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
/*can-util@3.10.18#js/diff/diff*/
define('can-util/js/diff/diff', function (require, exports, module) {
    'use strict';
    var slice = [].slice;
    var defaultIdentity = function (a, b) {
        return a === b;
    };
    function reverseDiff(oldDiffStopIndex, newDiffStopIndex, oldList, newList, identity) {
        var oldIndex = oldList.length - 1, newIndex = newList.length - 1;
        while (oldIndex > oldDiffStopIndex && newIndex > newDiffStopIndex) {
            var oldItem = oldList[oldIndex], newItem = newList[newIndex];
            if (identity(oldItem, newItem)) {
                oldIndex--;
                newIndex--;
                continue;
            } else {
                return [{
                        index: newDiffStopIndex,
                        deleteCount: oldIndex - oldDiffStopIndex + 1,
                        insert: slice.call(newList, newDiffStopIndex, newIndex + 1)
                    }];
            }
        }
        return [{
                index: newDiffStopIndex,
                deleteCount: oldIndex - oldDiffStopIndex + 1,
                insert: slice.call(newList, newDiffStopIndex, newIndex + 1)
            }];
    }
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
                patches.push.apply(patches, reverseDiff(oldIndex, newIndex, oldList, newList, identity));
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
/*can-util@3.10.18#dom/events/attributes/attributes*/
define('can-util/dom/events/attributes/attributes', [
    'require',
    'exports',
    'module',
    'can-util/dom/events/events',
    'can-util/dom/is-of-global-document/is-of-global-document',
    'can-util/dom/data/data',
    'can-globals/mutation-observer/mutation-observer',
    'can-assign',
    'can-util/dom/dispatch/dispatch'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var events = require('can-util/dom/events/events');
        var isOfGlobalDocument = require('can-util/dom/is-of-global-document/is-of-global-document');
        var domData = require('can-util/dom/data/data');
        var getMutationObserver = require('can-globals/mutation-observer/mutation-observer');
        var assign = require('can-assign');
        var domDispatch = require('can-util/dom/dispatch/dispatch');
        var originalAdd = events.addEventListener, originalRemove = events.removeEventListener;
        events.addEventListener = function (eventName) {
            if (eventName === 'attributes') {
                var MutationObserver = getMutationObserver();
                if (isOfGlobalDocument(this) && MutationObserver) {
                    var existingObserver = domData.get.call(this, 'canAttributesObserver');
                    if (!existingObserver) {
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
                    }
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
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/events/inserted/inserted*/
define('can-util/dom/events/inserted/inserted', [
    'require',
    'exports',
    'module',
    'can-util/dom/events/make-mutation-event/make-mutation-event'
], function (require, exports, module) {
    'use strict';
    var makeMutationEvent = require('can-util/dom/events/make-mutation-event/make-mutation-event');
    makeMutationEvent('inserted', 'addedNodes');
});
/*can-util@3.10.18#dom/attr/attr*/
define('can-util/dom/attr/attr', [
    'require',
    'exports',
    'module',
    'can-util/js/set-immediate/set-immediate',
    'can-globals/document/document',
    'can-globals/global/global',
    'can-util/dom/is-of-global-document/is-of-global-document',
    'can-util/dom/data/data',
    'can-util/dom/contains/contains',
    'can-util/dom/events/events',
    'can-util/dom/dispatch/dispatch',
    'can-globals/mutation-observer/mutation-observer',
    'can-util/js/each/each',
    'can-types',
    'can-util/js/diff/diff',
    'can-util/dom/events/attributes/attributes',
    'can-util/dom/events/inserted/inserted'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var setImmediate = require('can-util/js/set-immediate/set-immediate');
        var getDocument = require('can-globals/document/document');
        var global = require('can-globals/global/global')();
        var isOfGlobalDocument = require('can-util/dom/is-of-global-document/is-of-global-document');
        var setData = require('can-util/dom/data/data');
        var domContains = require('can-util/dom/contains/contains');
        var domEvents = require('can-util/dom/events/events');
        var domDispatch = require('can-util/dom/dispatch/dispatch');
        var getMutationObserver = require('can-globals/mutation-observer/mutation-observer');
        var each = require('can-util/js/each/each');
        var types = require('can-types');
        var diff = require('can-util/js/diff/diff');
        require('can-util/dom/events/attributes/attributes');
        require('can-util/dom/events/inserted/inserted');
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
                    var MO = getMutationObserver();
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
            }, _findOptionToSelect = function (parent, value) {
                var child = parent.firstChild;
                while (child) {
                    if (child.nodeName === 'OPTION' && value === child.value) {
                        return child;
                    }
                    if (child.nodeName === 'OPTGROUP') {
                        var groupChild = _findOptionToSelect(child, value);
                        if (groupChild) {
                            return groupChild;
                        }
                    }
                    child = child.nextSibling;
                }
            }, setChildOptions = function (el, value) {
                var option;
                if (value != null) {
                    option = _findOptionToSelect(el, value);
                }
                if (option) {
                    option.selected = true;
                } else {
                    el.selectedIndex = -1;
                }
            }, forEachOption = function (parent, fn) {
                var child = parent.firstChild;
                while (child) {
                    if (child.nodeName === 'OPTION') {
                        fn(child);
                    }
                    if (child.nodeName === 'OPTGROUP') {
                        forEachOption(child, fn);
                    }
                    child = child.nextSibling;
                }
            }, collectSelectedOptions = function (parent) {
                var selectedValues = [];
                forEachOption(parent, function (option) {
                    if (option.selected) {
                        selectedValues.push(option.value);
                    }
                });
                return selectedValues;
            }, markSelectedOptions = function (parent, values) {
                forEachOption(parent, function (option) {
                    option.selected = values.indexOf(option.value) !== -1;
                });
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
                            var notFalse = !!val || val === '' || arguments.length === 0;
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
                            var docEl = this.ownerDocument.documentElement;
                            var element = this;
                            function focusTask() {
                                if (val) {
                                    element.focus();
                                } else {
                                    element.blur();
                                }
                            }
                            if (cur !== val) {
                                if (!domContains.call(docEl, element)) {
                                    var initialSetHandler = function () {
                                        domEvents.removeEventListener.call(element, 'inserted', initialSetHandler);
                                        focusTask();
                                    };
                                    domEvents.addEventListener.call(element, 'inserted', initialSetHandler);
                                } else {
                                    types.queueTask([
                                        focusTask,
                                        this,
                                        []
                                    ]);
                                }
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
                            return collectSelectedOptions(this);
                        },
                        set: function (values) {
                            values = values || [];
                            markSelectedOptions(this, values);
                            setData.set.call(this, 'stickyValues', attr.get(this, 'values'));
                            setupMO(this, function () {
                                var previousValues = setData.get.call(this, 'stickyValues');
                                attr.set(this, 'values', previousValues);
                                var currentValues = setData.get.call(this, 'stickyValues');
                                var changes = diff(previousValues.slice().sort(), currentValues.slice().sort());
                                if (changes.length) {
                                    domDispatch.call(this, 'values');
                                }
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
                    var usingMutationObserver = isOfGlobalDocument(el) && getMutationObserver();
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
                        if (arguments.length === 2) {
                            newValue = setter.call(el);
                        } else {
                            newValue = setter.call(el, val);
                        }
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
                                    if (attr.length !== 1 && namespaces[attr[0]]) {
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
                    if (!getMutationObserver()) {
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
                    if (!getMutationObserver() && oldValue != null) {
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
    }(), require, exports, module));
});
/*can-view-live@4.0.0-pre.20#lib/attr*/
define('can-view-live/lib/attr', [
    'require',
    'exports',
    'module',
    'can-util/dom/attr/attr',
    'can-view-live/lib/core',
    'can-reflect'
], function (require, exports, module) {
    var attr = require('can-util/dom/attr/attr');
    var live = require('can-view-live/lib/core');
    var canReflect = require('can-reflect');
    live.attr = function (el, attributeName, compute) {
        function liveUpdateAttr(newVal) {
            attr.set(el, attributeName, newVal);
        }
        Object.defineProperty(liveUpdateAttr, 'name', { value: 'live.attr update::' + canReflect.getName(compute) });
        live.listen(el, compute, liveUpdateAttr);
        liveUpdateAttr(canReflect.getValue(compute));
    };
});
/*can-util@3.10.18#js/global/global*/
define('can-util/js/global/global', [
    'require',
    'exports',
    'module',
    'can-globals/global/global'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = require('can-globals/global/global');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-view-callbacks@4.0.0-pre.5#can-view-callbacks*/
define('can-view-callbacks', [
    'require',
    'exports',
    'module',
    'can-observation-recorder',
    'can-util/js/dev/dev',
    'can-util/js/global/global',
    'can-util/dom/mutate/mutate',
    'can-namespace'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var ObservationRecorder = require('can-observation-recorder');
        var dev = require('can-util/js/dev/dev');
        var getGlobal = require('can-util/js/global/global');
        var domMutate = require('can-util/dom/mutate/mutate');
        var namespace = require('can-namespace');
        var requestedAttributes = {};
        var attr = function (attributeName, attrHandler) {
            if (attrHandler) {
                if (typeof attributeName === 'string') {
                    attributes[attributeName] = attrHandler;
                    if (requestedAttributes[attributeName]) {
                        dev.warn('can-view-callbacks: ' + attributeName + ' custom attribute behavior requested before it was defined.  Make sure ' + attributeName + ' is defined before it is needed.');
                    }
                } else {
                    regExpAttributes.push({
                        match: attributeName,
                        handler: attrHandler
                    });
                    Object.keys(requestedAttributes).forEach(function (requested) {
                        if (attributeName.test(requested)) {
                            dev.warn('can-view-callbacks: ' + requested + ' custom attribute behavior requested before it was defined.  Make sure ' + attributeName + ' is defined before it is needed.');
                        }
                    });
                }
            } else {
                var cb = attributes[attributeName];
                if (!cb) {
                    for (var i = 0, len = regExpAttributes.length; i < len; i++) {
                        var attrMatcher = regExpAttributes[i];
                        if (attrMatcher.match.test(attributeName)) {
                            return attrMatcher.handler;
                        }
                    }
                }
                requestedAttributes[attributeName] = true;
                return cb;
            }
        };
        var attributes = {}, regExpAttributes = [], automaticCustomElementCharacters = /[-\:]/;
        var defaultCallback = function () {
        };
        var tag = function (tagName, tagHandler) {
            if (tagHandler) {
                var GLOBAL = getGlobal();
                if (typeof tags[tagName.toLowerCase()] !== 'undefined') {
                    dev.warn('Custom tag: ' + tagName.toLowerCase() + ' is already defined');
                }
                if (!automaticCustomElementCharacters.test(tagName) && tagName !== 'content') {
                    dev.warn('Custom tag: ' + tagName.toLowerCase() + ' hyphen missed');
                }
                if (GLOBAL.html5) {
                    GLOBAL.html5.elements += ' ' + tagName;
                    GLOBAL.html5.shivDocument();
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
                    cb = defaultCallback;
                }
                return cb;
            }
        };
        var tags = {};
        var callbacks = {
            _tags: tags,
            _attributes: attributes,
            _regExpAttributes: regExpAttributes,
            defaultCallback: defaultCallback,
            tag: tag,
            attr: attr,
            tagHandler: function (el, tagName, tagData) {
                var helperTagCallback = tagData.scope.templateContext.tags.get(tagName), tagCallback = helperTagCallback || tags[tagName];
                var scope = tagData.scope, res;
                if (tagCallback) {
                    res = ObservationRecorder.ignore(tagCallback)(el, tagData);
                } else {
                    res = scope;
                }
                if (!tagCallback) {
                    var GLOBAL = getGlobal();
                    var ceConstructor = GLOBAL.document.createElement(tagName).constructor;
                    if (ceConstructor === GLOBAL.HTMLElement || ceConstructor === GLOBAL.HTMLUnknownElement) {
                        dev.warn('can-view-callbacks: No custom element found for ' + tagName);
                    }
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
    }(), require, exports, module));
});
/*can-view-live@4.0.0-pre.20#lib/attrs*/
define('can-view-live/lib/attrs', [
    'require',
    'exports',
    'module',
    'can-view-live/lib/core',
    'can-view-callbacks',
    'can-util/dom/attr/attr',
    'can-util/dom/events/events',
    'can-reflect',
    'can-reflect-dependencies'
], function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    var viewCallbacks = require('can-view-callbacks');
    var attr = require('can-util/dom/attr/attr');
    var domEvents = require('can-util/dom/events/events');
    var canReflect = require('can-reflect');
    var canReflectDeps = require('can-reflect-dependencies');
    live.attrs = function (el, compute, scope, options) {
        if (!canReflect.isObservableLike(compute)) {
            var attrs = live.getAttributeParts(compute);
            for (var name in attrs) {
                attr.set(el, name, attrs[name]);
            }
            return;
        }
        var oldAttrs = {};
        function liveAttrsUpdate(newVal) {
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
        }
        Object.defineProperty(liveAttrsUpdate, 'name', { value: 'live.attrs update::' + canReflect.getName(compute) });
        canReflectDeps.addMutatedBy(el, compute);
        canReflect.onValue(compute, liveAttrsUpdate);
        var teardownHandler = function () {
            canReflect.offValue(compute, liveAttrsUpdate);
            domEvents.removeEventListener.call(el, 'removed', teardownHandler);
            canReflectDeps.deleteMutatedBy(el, compute);
        };
        domEvents.addEventListener.call(el, 'removed', teardownHandler);
        liveAttrsUpdate(canReflect.getValue(compute));
    };
});
/*can-view-live@4.0.0-pre.20#lib/html*/
define('can-view-live/lib/html', [
    'require',
    'exports',
    'module',
    'can-view-live/lib/core',
    'can-view-nodelist',
    'can-util/dom/frag/frag',
    'can-util/js/make-array/make-array',
    'can-util/dom/child-nodes/child-nodes',
    'can-reflect'
], function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    var nodeLists = require('can-view-nodelist');
    var makeFrag = require('can-util/dom/frag/frag');
    var makeArray = require('can-util/js/make-array/make-array');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var canReflect = require('can-reflect');
    live.html = function (el, compute, parentNode, nodeList) {
        var data, makeAndPut, nodes;
        parentNode = live.getParentNode(el, parentNode);
        function liveHTMLUpdateHTML(newVal) {
            var attached = nodeLists.first(nodes).parentNode;
            if (attached) {
                makeAndPut(newVal);
            }
            var pn = nodeLists.first(nodes).parentNode;
            data.teardownCheck(pn);
        }
        Object.defineProperty(liveHTMLUpdateHTML, 'name', { value: 'live.html update::' + canReflect.getName(compute) });
        data = live.listen(parentNode, compute, liveHTMLUpdateHTML);
        nodes = nodeList || [el];
        makeAndPut = function (val) {
            var isFunction = typeof val === 'function', frag = makeFrag(isFunction ? '' : val), oldNodes = makeArray(nodes);
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
        makeAndPut(canReflect.getValue(compute));
    };
});
/*can-view-live@4.0.0-pre.20#lib/set-observable*/
define('can-view-live/lib/set-observable', [
    'require',
    'exports',
    'module',
    'can-simple-observable',
    'can-reflect'
], function (require, exports, module) {
    var SimpleObservable = require('can-simple-observable');
    var canReflect = require('can-reflect');
    function SetObservable(initialValue, setter) {
        this.setter = setter;
        SimpleObservable.call(this, initialValue);
    }
    SetObservable.prototype = Object.create(SimpleObservable.prototype);
    SetObservable.prototype.constructor = SetObservable;
    SetObservable.prototype.set = function (newVal) {
        this.setter(newVal);
    };
    canReflect.assignSymbols(SetObservable.prototype, { 'can.setValue': SetObservable.prototype.set });
    module.exports = SetObservable;
});
/*can-view-live@4.0.0-pre.20#lib/patcher*/
define('can-view-live/lib/patcher', [
    'require',
    'exports',
    'module',
    'can-reflect',
    'can-key-tree',
    'can-symbol',
    'can-util/js/diff/diff',
    'can-queues',
    'can-symbol'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var KeyTree = require('can-key-tree');
    var canSymbol = require('can-symbol');
    var diff = require('can-util/js/diff/diff');
    var queues = require('can-queues');
    var canSymbol = require('can-symbol');
    var onValueSymbol = canSymbol.for('can.onValue'), offValueSymbol = canSymbol.for('can.offValue');
    var onPatchesSymbol = canSymbol.for('can.onPatches');
    var offPatchesSymbol = canSymbol.for('can.offPatches');
    var Patcher = function (observableOrList, priority) {
        this.handlers = new KeyTree([
            Object,
            Array
        ], {
            onFirst: this.setup.bind(this),
            onEmpty: this.teardown.bind(this)
        });
        this.observableOrList = observableOrList;
        this.isObservableValue = canReflect.isValueLike(this.observableOrList) || canReflect.isObservableLike(this.observableOrList);
        if (this.isObservableValue) {
            this.priority = canReflect.getPriority(observableOrList);
        } else {
            this.priority = priority || 0;
        }
        this.onList = this.onList.bind(this);
        this.onPatchesNotify = this.onPatchesNotify.bind(this);
        this.onPatchesDerive = this.onPatchesDerive.bind(this);
        this.patches = [];
        Object.defineProperty(this.onList, 'name', { value: 'live.list new list::' + canReflect.getName(observableOrList) });
        Object.defineProperty(this.onPatchesNotify, 'name', { value: 'live.list notify::' + canReflect.getName(observableOrList) });
        Object.defineProperty(this.onPatchesDerive, 'name', { value: 'live.list derive::' + canReflect.getName(observableOrList) });
    };
    Patcher.prototype = {
        constructor: Patcher,
        setup: function () {
            if (this.observableOrList[onValueSymbol]) {
                canReflect.onValue(this.observableOrList, this.onList, 'notify');
                this.setupList(canReflect.getValue(this.observableOrList));
            } else {
                this.setupList(this.observableOrList);
            }
        },
        teardown: function () {
            if (this.observableOrList[offValueSymbol]) {
                canReflect.offValue(this.observableOrList, this.onList, 'notify');
            }
        },
        setupList: function (list) {
            this.currentList = list;
            if (list && list[onPatchesSymbol]) {
                list[onPatchesSymbol](this.onPatchesNotify, 'notify');
            }
        },
        onList: function onList(newList) {
            var current = this.currentList || [];
            newList = newList || [];
            if (current[offPatchesSymbol]) {
                current[offPatchesSymbol](this.onPatchesNotify, 'notify');
            }
            var patches = diff(current, newList);
            this.currentList = newList;
            this.onPatchesNotify(patches);
            if (newList[onPatchesSymbol]) {
                newList[onPatchesSymbol](this.onPatchesNotify, 'notify');
            }
        },
        onPatchesNotify: function onPatchesNotify(patches) {
            this.patches.push.apply(this.patches, patches);
            queues.deriveQueue.enqueue(this.onPatchesDerive, this, [], { priority: this.priority });
        },
        onPatchesDerive: function onPatchesDerive() {
            var patches = this.patches;
            this.patches = [];
            queues.enqueueByQueue(this.handlers.getNode([]), this.currentList, [
                patches,
                this.currentList
            ], null, [
                'Apply patches',
                patches
            ]);
        }
    };
    canReflect.assignSymbols(Patcher.prototype, {
        'can.onPatches': function (handler, queue) {
            this.handlers.add([
                queue || 'mutate',
                handler
            ]);
        },
        'can.offPatches': function (handler, queue) {
            this.handlers.delete([
                queue || 'mutate',
                handler
            ]);
        }
    });
    module.exports = Patcher;
});
/*can-view-live@4.0.0-pre.20#lib/list*/
define('can-view-live/lib/list', [
    'require',
    'exports',
    'module',
    'can-view-live/lib/core',
    'can-view-nodelist',
    'can-util/dom/frag/frag',
    'can-util/dom/mutate/mutate',
    'can-util/dom/child-nodes/child-nodes',
    'can-util/js/make-array/make-array',
    'can-util/js/each/each',
    'can-symbol',
    'can-reflect',
    'can-reflect-dependencies',
    'can-simple-observable',
    'can-view-live/lib/set-observable',
    'can-view-live/lib/patcher'
], function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    var nodeLists = require('can-view-nodelist');
    var frag = require('can-util/dom/frag/frag');
    var domMutate = require('can-util/dom/mutate/mutate');
    var childNodes = require('can-util/dom/child-nodes/child-nodes');
    var makeArray = require('can-util/js/make-array/make-array');
    var each = require('can-util/js/each/each');
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    var canReflectDeps = require('can-reflect-dependencies');
    var SimpleObservable = require('can-simple-observable');
    var SetObservable = require('can-view-live/lib/set-observable');
    var Patcher = require('can-view-live/lib/patcher');
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
        };
    var onPatchesSymbol = canSymbol.for('can.onPatches');
    var offPatchesSymbol = canSymbol.for('can.offPatches');
    function ListDOMPatcher(el, compute, render, context, parentNode, nodeList, falseyRender) {
        this.patcher = new Patcher(compute);
        parentNode = live.getParentNode(el, parentNode);
        this.value = compute;
        this.render = render;
        this.context = context;
        this.parentNode = parentNode;
        this.falseyRender = falseyRender;
        this.masterNodeList = nodeList || nodeLists.register([el], null, true);
        this.placeholder = el;
        this.indexMap = [];
        this.isValueLike = canReflect.isValueLike(this.value);
        this.isObservableLike = canReflect.isObservableLike(this.value);
        this.onPatches = this.onPatches.bind(this);
        var data = this.data = live.setup(parentNode, this.setupValueBinding.bind(this), this.teardownValueBinding.bind(this));
        this.masterNodeList.unregistered = function () {
            data.teardownCheck();
        };
        Object.defineProperty(this.onPatches, 'name', { value: 'live.list update::' + canReflect.getName(compute) });
    }
    var onPatchesSymbol = canSymbol.for('can.onPatches');
    var offPatchesSymbol = canSymbol.for('can.offPatches');
    ListDOMPatcher.prototype = {
        setupValueBinding: function () {
            this.patcher[onPatchesSymbol](this.onPatches, 'domUI');
            if (this.patcher.currentList && this.patcher.currentList.length) {
                this.onPatches([{
                        insert: this.patcher.currentList,
                        index: 0,
                        deleteCount: 0
                    }]);
            } else {
                this.addFalseyIfEmpty();
            }
            canReflectDeps.addMutatedBy(this.parentNode, this.patcher.observableOrList);
        },
        teardownValueBinding: function () {
            this.patcher[offPatchesSymbol](this.onPatches, 'domUI');
            this.exit = true;
            this.remove({ length: this.patcher.currentList.length }, 0, true);
            canReflectDeps.deleteMutatedBy(this.parentNode, this.patcher.observableOrList);
        },
        onPatches: function ListDOMPatcher_onPatches(patches) {
            if (this.exit) {
                return;
            }
            for (var i = 0, patchLen = patches.length; i < patchLen; i++) {
                var patch = patches[i];
                if (patch.type === 'move') {
                    this.move(patch.toIndex, patch.fromIndex);
                } else {
                    if (patch.deleteCount) {
                        this.remove({ length: patch.deleteCount }, patch.index, true);
                    }
                    if (patch.insert && patch.insert.length) {
                        this.add(patch.insert, patch.index);
                    }
                }
            }
        },
        add: function (items, index) {
            var frag = this.placeholder.ownerDocument.createDocumentFragment(), newNodeLists = [], newIndicies = [], masterNodeList = this.masterNodeList, render = this.render, context = this.context;
            each(items, function (item, key) {
                var itemIndex = new SimpleObservable(key + index), itemCompute = new SetObservable(item, function (newVal) {
                        canReflect.setKeyValue(this.patcher.currentList, itemIndex.get(), newVal);
                    }.bind(this)), itemFrag = renderAndAddToNodeLists(newNodeLists, masterNodeList, render, context, [
                        itemCompute,
                        itemIndex
                    ]);
                frag.appendChild(itemFrag);
                newIndicies.push(itemIndex);
            }, this);
            var masterListIndex = index + 1;
            if (!this.indexMap.length) {
                var falseyItemsToRemove = removeFromNodeList(masterNodeList, 0, masterNodeList.length - 1);
                nodeLists.remove(falseyItemsToRemove);
            }
            if (!masterNodeList[masterListIndex]) {
                nodeLists.after(masterListIndex === 1 ? [this.placeholder] : [nodeLists.last(this.masterNodeList[masterListIndex - 1])], frag);
            } else {
                var el = nodeLists.first(masterNodeList[masterListIndex]);
                domMutate.insertBefore.call(el.parentNode, frag, el);
            }
            splice.apply(this.masterNodeList, [
                masterListIndex,
                0
            ].concat(newNodeLists));
            splice.apply(this.indexMap, [
                index,
                0
            ].concat(newIndicies));
            for (var i = index + newIndicies.length, len = this.indexMap.length; i < len; i++) {
                this.indexMap[i].set(i);
            }
        },
        remove: function (items, index) {
            if (index < 0) {
                index = this.indexMap.length + index;
            }
            var itemsToRemove = removeFromNodeList(this.masterNodeList, index, items.length);
            var indexMap = this.indexMap;
            indexMap.splice(index, items.length);
            for (var i = index, len = indexMap.length; i < len; i++) {
                indexMap[i].set(i);
            }
            if (!this.exit) {
                this.addFalseyIfEmpty();
                nodeLists.remove(itemsToRemove);
            } else {
                nodeLists.unregister(this.masterNodeList);
            }
        },
        addFalseyIfEmpty: function () {
            if (this.falseyRender && this.indexMap.length === 0) {
                var falseyNodeLists = [];
                var falseyFrag = renderAndAddToNodeLists(falseyNodeLists, this.masterNodeList, this.falseyRender, this.currentList, [this.currentList]);
                nodeLists.after([this.masterNodeList[0]], falseyFrag);
                this.masterNodeList.push(falseyNodeLists[0]);
            }
        },
        move: function move(newIndex, currentIndex) {
            newIndex = newIndex + 1;
            currentIndex = currentIndex + 1;
            var masterNodeList = this.masterNodeList, indexMap = this.indexMap;
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
                indexMap[i].set(i);
            }
        },
        set: function (newVal, index) {
            this.remove({ length: 1 }, index, true);
            this.add([newVal], index);
        }
    };
    live.list = function (el, list, render, context, parentNode, nodeList, falseyRender) {
        if (el.nodeType !== Node.TEXT_NODE) {
            var textNode;
            if (!nodeList) {
                textNode = document.createTextNode('');
                el.parentNode.replaceChild(textNode, el);
                el = textNode;
            } else {
                textNode = document.createTextNode('');
                nodeLists.replace(nodeList, textNode);
                nodeLists.update(nodeList, [textNode]);
                el = textNode;
            }
        }
        new ListDOMPatcher(el, list, render, context, parentNode, nodeList, falseyRender);
    };
});
/*can-view-live@4.0.0-pre.20#lib/text*/
define('can-view-live/lib/text', [
    'require',
    'exports',
    'module',
    'can-view-live/lib/core',
    'can-view-nodelist',
    'can-reflect'
], function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    var nodeLists = require('can-view-nodelist');
    var canReflect = require('can-reflect');
    live.text = function (el, compute, parentNode, nodeList) {
        if (el.nodeType !== Node.TEXT_NODE) {
            var textNode;
            if (!nodeList) {
                textNode = document.createTextNode('');
                el.parentNode.replaceChild(textNode, el);
                el = textNode;
            } else {
                textNode = document.createTextNode('');
                nodeLists.replace(nodeList, textNode);
                nodeLists.update(nodeList, [textNode]);
                el = textNode;
            }
        }
        var parent = live.getParentNode(el, parentNode);
        el.nodeValue = live.makeString(canReflect.getValue(compute));
        function liveTextUpdateTextNode(newVal) {
            el.nodeValue = live.makeString(newVal);
        }
        Object.defineProperty(liveTextUpdateTextNode, 'name', { value: 'live.text update::' + canReflect.getName(compute) });
        var data = live.listen(parent, compute, liveTextUpdateTextNode);
        if (!nodeList) {
            nodeList = nodeLists.register([el], null, true);
        }
        nodeList.unregistered = data.teardownCheck;
        data.nodeList = nodeList;
    };
});
/*can-view-live@4.0.0-pre.20#can-view-live*/
define('can-view-live', [
    'require',
    'exports',
    'module',
    'can-view-live/lib/core',
    'can-view-live/lib/attr',
    'can-view-live/lib/attrs',
    'can-view-live/lib/html',
    'can-view-live/lib/list',
    'can-view-live/lib/text'
], function (require, exports, module) {
    var live = require('can-view-live/lib/core');
    require('can-view-live/lib/attr');
    require('can-view-live/lib/attrs');
    require('can-view-live/lib/html');
    require('can-view-live/lib/list');
    require('can-view-live/lib/text');
    module.exports = live;
});
/*can-util@3.10.18#js/base-url/base-url*/
define('can-util/js/base-url/base-url', [
    'require',
    'exports',
    'module',
    'can-globals/global/global',
    'can-globals/document/document'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getGlobal = require('can-globals/global/global');
        var getDomDocument = require('can-globals/document/document');
        var setBaseUrl;
        module.exports = function (setUrl) {
            if (setUrl !== undefined) {
                setBaseUrl = setUrl;
            }
            if (setBaseUrl !== undefined) {
                return setBaseUrl;
            }
            var global = getGlobal();
            var domDocument = getDomDocument();
            if (domDocument && 'baseURI' in domDocument) {
                return domDocument.baseURI;
            } else if (global.location) {
                var href = global.location.href;
                var lastSlash = href.lastIndexOf('/');
                return lastSlash !== -1 ? href.substr(0, lastSlash) : href;
            } else if (typeof process !== 'undefined') {
                return process.cwd();
            }
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-parse-uri@1.0.1#can-parse-uri*/
define('can-parse-uri', function (require, exports, module) {
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
/*can-util@3.10.18#js/join-uris/join-uris*/
define('can-util/js/join-uris/join-uris', [
    'require',
    'exports',
    'module',
    'can-parse-uri'
], function (require, exports, module) {
    'use strict';
    var parseURI = require('can-parse-uri');
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
/*can-stache@4.0.0-pre.38#helpers/-debugger*/
define('can-stache/helpers/-debugger', [
    'require',
    'exports',
    'module',
    'can-log',
    'can-reflect',
    'can-symbol'
], function (require, exports, module) {
    var canLog = require('can-log');
    function noop() {
    }
    ;
    var resolveValue = noop;
    var evaluateArgs = noop;
    var __testing = {};
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    __testing = { allowDebugger: true };
    resolveValue = function (value) {
        if (value && value[canSymbol.for('can.getValue')]) {
            return canReflect.getValue(value);
        }
        return value;
    };
    evaluateArgs = function (left, right) {
        switch (arguments.length) {
        case 0:
            return true;
        case 1:
            return !!resolveValue(left);
        case 2:
            return resolveValue(left) === resolveValue(right);
        default:
            canLog.log([
                'Usage:',
                '  {{debugger}}: break any time this helper is evaluated',
                '  {{debugger condition}}: break when `condition` is truthy',
                '  {{debugger left right}}: break when `left` === `right`'
            ].join('\n'));
            throw new Error('{{debugger}} must have less than three arguments');
        }
    };
    function debuggerHelper(left, right) {
        var shouldBreak = evaluateArgs.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        if (!shouldBreak) {
            return;
        }
        var options = arguments[arguments.length - 1];
        var get = function (path) {
            return options.scope.get(path);
        };
        canLog.log('Use `get(<path>)` to debug this template');
        var allowDebugger = __testing.allowDebugger;
        if (allowDebugger) {
            debugger;
            return;
        }
        canLog.warn('Forgotten {{debugger}} helper');
    }
    module.exports = {
        helper: debuggerHelper,
        evaluateArgs: evaluateArgs,
        resolveValue: resolveValue,
        __testing: __testing
    };
});
/*can-stache@4.0.0-pre.38#src/truthy-observable*/
define('can-stache/src/truthy-observable', [
    'require',
    'exports',
    'module',
    'can-observation',
    'can-reflect'
], function (require, exports, module) {
    var Observation = require('can-observation');
    var canReflect = require('can-reflect');
    module.exports = function (observable) {
        return new Observation(function truthyObservation() {
            var val = canReflect.getValue(observable);
            return !!val;
        });
    };
});
/*can-stache@4.0.0-pre.38#helpers/core*/
define('can-stache/helpers/core', [
    'require',
    'exports',
    'module',
    'can-view-live',
    'can-view-nodelist',
    'can-stache/src/utils',
    'can-util/js/base-url/base-url',
    'can-util/js/join-uris/join-uris',
    'can-assign',
    'can-util/js/is-iterable/is-iterable',
    'can-log/dev/dev',
    'can-symbol',
    'can-reflect',
    'can-util/js/is-empty-object/is-empty-object',
    'can-stache/expressions/hashes',
    'can-stache/helpers/-debugger',
    'can-stache/src/key-observable',
    'can-observation',
    'can-stache/src/truthy-observable',
    'can-observation-recorder',
    'can-stache-helpers',
    'can-util/dom/data/data'
], function (require, exports, module) {
    var live = require('can-view-live');
    var nodeLists = require('can-view-nodelist');
    var utils = require('can-stache/src/utils');
    var getBaseURL = require('can-util/js/base-url/base-url');
    var joinURIs = require('can-util/js/join-uris/join-uris');
    var assign = require('can-assign');
    var isIterable = require('can-util/js/is-iterable/is-iterable');
    var dev = require('can-log/dev/dev');
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var Hashes = require('can-stache/expressions/hashes');
    var debuggerHelper = require('can-stache/helpers/-debugger').helper;
    var KeyObservable = require('can-stache/src/key-observable');
    var Observation = require('can-observation');
    var TruthyObservable = require('can-stache/src/truthy-observable');
    var observationRecorder = require('can-observation-recorder');
    var helpers = require('can-stache-helpers');
    var domData = require('can-util/dom/data/data');
    var looksLikeOptions = function (options) {
        return options && typeof options.fn === 'function' && typeof options.inverse === 'function';
    };
    var getValueSymbol = canSymbol.for('can.getValue'), isValueLikeSymbol = canSymbol.for('can.isValueLike');
    var resolve = function (value) {
        if (value && canReflect.isValueLike(value)) {
            return canReflect.getValue(value);
        } else {
            return value;
        }
    };
    var resolveHash = function (hash) {
        var params = {};
        for (var prop in hash) {
            params[prop] = resolve(hash[prop]);
        }
        return params;
    };
    var peek = observationRecorder.ignore(resolve);
    var eachHelper = function (items) {
        var args = [].slice.call(arguments), options = args.pop(), argsLen = args.length, argExprs = options.exprData.argExprs, hashExprs = options.exprData.hashExprs, resolved = peek(items), hashOptions, aliases, key;
        if (!isEmptyObject(hashExprs)) {
            hashOptions = {};
            canReflect.eachKey(hashExprs, function (exprs, key) {
                hashOptions[exprs.key] = key;
            });
        }
        if ((canReflect.isObservableLike(resolved) && canReflect.isListLike(resolved) || utils.isArrayLike(resolved) && canReflect.isValueLike(items)) && !options.stringOnly) {
            return function (el) {
                var nodeList = [el];
                nodeList.expression = 'live.list';
                nodeLists.register(nodeList, null, options.nodeList, true);
                nodeLists.update(options.nodeList, [el]);
                var cb = function (item, index, parentNodeList) {
                    var aliases = {};
                    if (!isEmptyObject(hashOptions)) {
                        if (hashOptions.value) {
                            aliases[hashOptions.value] = item;
                        }
                        if (hashOptions.index) {
                            aliases[hashOptions.index] = index;
                        }
                    }
                    return options.fn(options.scope.add(aliases, { notContext: true }).add({ index: index }, { special: true }).add(item), options.options, parentNodeList);
                };
                live.list(el, items, cb, options.context, el.parentNode, nodeList, function (list, parentNodeList) {
                    return options.inverse(options.scope.add(list), options.options, parentNodeList);
                });
            };
        }
        var expr = resolve(items), result;
        if (!!expr && utils.isArrayLike(expr)) {
            result = utils.getItemsFragContent(expr, options, options.scope);
            return options.stringOnly ? result.join('') : result;
        } else if (canReflect.isObservableLike(expr) && canReflect.isMapLike(expr) || expr instanceof Object) {
            result = [];
            canReflect.each(expr, function (val, key) {
                var value = new KeyObservable(expr, key);
                aliases = {};
                if (!isEmptyObject(hashOptions)) {
                    if (hashOptions.value) {
                        aliases[hashOptions.value] = value;
                    }
                    if (hashOptions.key) {
                        aliases[hashOptions.key] = key;
                    }
                }
                result.push(options.fn(options.scope.add(aliases, { notContext: true }).add({ key: key }, { special: true }).add(value)));
            });
            return options.stringOnly ? result.join('') : result;
        }
    };
    eachHelper.isLiveBound = true;
    var builtInHelpers = {
        'each': eachHelper,
        'index': function (offset, options) {
            if (!options) {
                options = offset;
                offset = 0;
            }
            var index = options.scope.peek('scope.index');
            return '' + ((typeof index === 'function' ? index() : index) + offset);
        },
        'if': function (expr, options) {
            var value;
            if (expr && canReflect.isValueLike(expr)) {
                value = canReflect.getValue(new TruthyObservable(expr));
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
            var callFn = new Observation(function () {
                for (var i = 0; i < args.length - 1; i++) {
                    curValue = resolve(args[i]);
                    curValue = typeof curValue === 'function' ? curValue() : curValue;
                    if (i > 0) {
                        if (curValue !== lastValue) {
                            return false;
                        }
                    }
                    lastValue = curValue;
                }
                return true;
            });
            return callFn.get() ? options.fn() : options.inverse();
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
            if (!options) {
                options = expr;
                expr = true;
                ctx = options.hash;
            } else {
                expr = resolve(expr);
                if (options.hash && !isEmptyObject(options.hash)) {
                    ctx = options.scope.add(options.hash, { notContext: true }).add(ctx);
                }
            }
            return options.fn(ctx || {});
        },
        'console': console,
        'data': function (attr) {
            var data = arguments.length === 2 ? this : arguments[1];
            return function (el) {
                domData.set.call(el, attr, data || this.context);
            };
        },
        'switch': function (expression, options) {
            resolve(expression);
            var found = false;
            var caseHelper = function (value, options) {
                if (!found && resolve(expression) === resolve(value)) {
                    found = true;
                    return options.fn(options.scope.peek('this') || this);
                }
            };
            caseHelper.isHelper = true;
            var newScope = options.scope.add({
                case: caseHelper,
                get default() {
                    return !found;
                }
            }, { notContext: true });
            return options.fn(newScope, options);
        },
        'joinBase': function (firstExpr) {
            var args = [].slice.call(arguments);
            var options = args.pop();
            var moduleReference = args.map(function (expr) {
                var value = resolve(expr);
                return typeof value === 'function' ? value() : value;
            }).join('');
            var templateModule = canReflect.getKeyValue(options.scope.templateContext.helpers, 'module');
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
    builtInHelpers.eachOf = builtInHelpers.each;
    builtInHelpers.debugger = debuggerHelper;
    var addBuiltInHelpers = function () {
        canReflect.each(builtInHelpers, function (helper, helperName) {
            helper.isHelper = true;
            helpers[helperName] = helper;
        });
    };
    addBuiltInHelpers();
    var registerHelper = function (name, callback) {
        if (helpers[name]) {
            dev.warn('The helper ' + name + ' has already been registered.');
        }
        callback.isHelper = true;
        helpers[name] = callback;
    };
    var makeSimpleHelper = function (fn) {
        return function () {
            var realArgs = [];
            canReflect.eachIndex(arguments, function (val) {
                while (val && val.isComputed) {
                    val = val();
                }
                realArgs.push(val);
            });
            return fn.apply(this, realArgs);
        };
    };
    module.exports = {
        registerHelper: registerHelper,
        addHelper: function (name, callback) {
            return registerHelper(name, makeSimpleHelper(callback));
        },
        addLiveHelper: function (name, callback) {
            callback.isLiveBound = true;
            return registerHelper(name, callback);
        },
        getHelper: function (name, scope) {
            var helper = scope && scope.getHelper(name);
            if (!helper) {
                helper = helpers[name];
            }
            return helper;
        },
        resolve: resolve,
        resolveHash: resolveHash,
        looksLikeOptions: looksLikeOptions,
        __resetHelpers: function () {
            for (var helper in helpers) {
                delete helpers[helper];
            }
            addBuiltInHelpers();
        }
    };
});
/*can-stache@4.0.0-pre.38#expressions/helper*/
define('can-stache/expressions/helper', [
    'require',
    'exports',
    'module',
    'can-stache/expressions/literal',
    'can-stache/expressions/hashes',
    'can-observation',
    'can-assign',
    'can-log/dev/dev',
    'can-util/js/is-empty-object/is-empty-object',
    'can-stache/src/expression-helpers',
    'can-stache/src/utils',
    'can-stache/helpers/core',
    'can-reflect',
    'can-view-scope/scope-key-data'
], function (require, exports, module) {
    var Literal = require('can-stache/expressions/literal');
    var Hashes = require('can-stache/expressions/hashes');
    var Observation = require('can-observation');
    var assign = require('can-assign');
    var dev = require('can-log/dev/dev');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var expressionHelpers = require('can-stache/src/expression-helpers');
    var utils = require('can-stache/src/utils');
    var mustacheHelpers = require('can-stache/helpers/core');
    var canReflect = require('can-reflect');
    var ScopeKeyData = require('can-view-scope/scope-key-data');
    var Helper = function (methodExpression, argExpressions, hashExpressions) {
        this.methodExpr = methodExpression;
        this.argExprs = argExpressions;
        this.hashExprs = hashExpressions;
        this.mode = null;
    };
    Helper.prototype.args = function (scope) {
        var args = [];
        for (var i = 0, len = this.argExprs.length; i < len; i++) {
            var arg = this.argExprs[i];
            args.push(expressionHelpers.toComputeOrValue(arg.value.apply(arg, arguments)));
        }
        return args;
    };
    Helper.prototype.hash = function (scope) {
        var hash = {};
        for (var prop in this.hashExprs) {
            var val = this.hashExprs[prop];
            hash[prop] = expressionHelpers.toComputeOrValue(val.value.apply(val, arguments));
        }
        return hash;
    };
    Helper.prototype.helperValue = function (scope) {
        var computeData, methodKey = this.methodExpr instanceof Literal ? '' + this.methodExpr._value : this.methodExpr.key, helperValue = expressionHelpers.getObservableValue_fromKey(methodKey, scope, { proxyMethods: false }), args = this.args(scope).map(expressionHelpers.toComputeOrValue), initialValue = helperValue && helperValue.initialValue, isHelper = initialValue && initialValue.isHelper;
        if (typeof initialValue === 'function') {
            helperValue = function helperFn() {
                return initialValue.apply(scope.peek('this'), isHelper ? arguments : args);
            };
            helperValue.isHelper = isHelper;
            Object.defineProperty(helperValue, 'name', { value: canReflect.getName(this) });
        } else {
            dev.warn('can-stache/expressions/helper.js: Unable to find helper "' + methodKey + '".');
        }
        return helperValue;
    };
    Helper.prototype.evaluator = function (helper, scope, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly) {
        var helperOptionArg = { stringOnly: stringOnly }, context = scope.peek('this'), args = this.args(scope), hash = this.hash(scope);
        utils.convertToScopes(helperOptionArg, scope, nodeList, truthyRenderer, falseyRenderer, stringOnly);
        assign(helperOptionArg, {
            context: context,
            scope: scope,
            contexts: scope,
            hash: hash,
            nodeList: nodeList,
            exprData: this
        });
        args.push(helperOptionArg);
        return function () {
            return helper.apply(context, args);
        };
    };
    Helper.prototype.value = function (scope, nodeList, truthyRenderer, falseyRenderer, stringOnly) {
        var helperValue = this.helperValue(scope);
        if (!helperValue.isHelper) {
            return helperValue;
        }
        var fn = this.evaluator(helper, scope, nodeList, truthyRenderer, falseyRenderer, stringOnly);
        var computeValue = new Observation(fn);
        Observation.temporarilyBind(computeValue);
        return computeValue;
    };
    Helper.prototype.closingTag = function () {
        return this.methodExpr.key;
    };
    Helper.prototype.sourceText = function () {
        var text = [this.methodExpr.sourceText()];
        if (this.argExprs.length) {
            text.push(this.argExprs.map(function (arg) {
                return arg.sourceText();
            }).join(' '));
        }
        if (!isEmptyObject(this.hashExprs)) {
            text.push(Hashes.prototype.sourceText.call(this));
        }
        return text.join(' ');
    };
    canReflect.assignSymbols(Helper.prototype, {
        'can.getName': function () {
            return canReflect.getName(this.constructor) + '{{' + this.sourceText() + '}}';
        }
    });
    module.exports = Helper;
});
/*can-stache@4.0.0-pre.38#expressions/lookup*/
define('can-stache/expressions/lookup', [
    'require',
    'exports',
    'module',
    'can-stache/src/expression-helpers',
    'can-reflect',
    'can-symbol',
    'can-assign',
    'can-log/dev/dev'
], function (require, exports, module) {
    var expressionHelpers = require('can-stache/src/expression-helpers');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var sourceTextSymbol = canSymbol.for('can-stache.sourceText');
    var assign = require('can-assign');
    var dev = require('can-log/dev/dev');
    var Lookup = function (key, root, sourceText) {
        this.key = key;
        this.rootExpr = root;
        canReflect.setKeyValue(this, sourceTextSymbol, sourceText);
    };
    Lookup.prototype.value = function (scope, readOptions) {
        var value;
        if (this.rootExpr) {
            value = expressionHelpers.getObservableValue_fromDynamicKey_fromObservable(this.key, this.rootExpr.value(scope), scope, {}, {});
        } else {
            value = expressionHelpers.getObservableValue_fromKey(this.key, scope, readOptions);
        }
        if (typeof value.initialValue === 'undefined') {
            dev.warn('can-stache/expressions/lookup.js: Unable to find key "' + this.key + '".');
        }
        return value;
    };
    Lookup.prototype.sourceText = function () {
        if (this[sourceTextSymbol]) {
            return this[sourceTextSymbol];
        } else if (this.rootExpr) {
            return this.rootExpr.sourceText() + '.' + this.key;
        } else {
            return this.key;
        }
    };
    module.exports = Lookup;
});
/*can-util@3.10.18#js/last/last*/
define('can-util/js/last/last', function (require, exports, module) {
    'use strict';
    module.exports = function (arr) {
        return arr && arr[arr.length - 1];
    };
});
/*can-stache@4.0.0-pre.38#src/expression*/
define('can-stache/src/expression', [
    'require',
    'exports',
    'module',
    'can-stache/expressions/arg',
    'can-stache/expressions/literal',
    'can-stache/expressions/hashes',
    'can-stache/expressions/bracket',
    'can-stache/expressions/call',
    'can-stache/expressions/helper',
    'can-stache/expressions/lookup',
    'can-stache/src/set-identifier',
    'can-stache/src/expression-helpers',
    'can-stache/src/utils',
    'can-assign',
    'can-util/js/last/last',
    'can-reflect',
    'can-symbol'
], function (require, exports, module) {
    var Arg = require('can-stache/expressions/arg');
    var Literal = require('can-stache/expressions/literal');
    var Hashes = require('can-stache/expressions/hashes');
    var Bracket = require('can-stache/expressions/bracket');
    var Call = require('can-stache/expressions/call');
    var Helper = require('can-stache/expressions/helper');
    var Lookup = require('can-stache/expressions/lookup');
    var SetIdentifier = require('can-stache/src/set-identifier');
    var expressionHelpers = require('can-stache/src/expression-helpers');
    var utils = require('can-stache/src/utils');
    var assign = require('can-assign');
    var last = require('can-util/js/last/last');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var sourceTextSymbol = canSymbol.for('can-stache.sourceText');
    var Hash = function () {
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
            canReflect.setKeyValue(ast, sourceTextSymbol, ast.key);
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
        toComputeOrValue: expressionHelpers.toComputeOrValue,
        convertKeyToLookup: convertKeyToLookup,
        Literal: Literal,
        Lookup: Lookup,
        Arg: Arg,
        Hash: Hash,
        Hashes: Hashes,
        Call: Call,
        Helper: Helper,
        Bracket: Bracket,
        SetIdentifier: SetIdentifier,
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
                return ast.type === 'Helper' ? Helper : Lookup;
            },
            'method': function (ast, methodType, isArg) {
                return Lookup;
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
                var LookupRule = options.lookupRule(ast, methodType, isArg);
                var lookup = new LookupRule(ast.key, ast.root && this.hydrateAst(ast.root, options, methodType), ast[sourceTextSymbol]);
                return lookup;
            } else if (ast.type === 'Literal') {
                return new Literal(ast.value);
            } else if (ast.type === 'Arg') {
                return new Arg(this.hydrateAst(ast.children[0], options, methodType, isArg), { compute: true });
            } else if (ast.type === 'Hash') {
                throw new Error('');
            } else if (ast.type === 'Hashes') {
                hashes = {};
                ast.children.forEach(function (hash) {
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
                            child.children.forEach(function (hash) {
                                hashes[hash.prop] = this.hydrateAst(hash.children[0], options, ast.type, true);
                            }, this);
                        } else {
                            args.push(this.hydrateAst(child, options, ast.type, true));
                        }
                    }
                }
                return new ExpressionType(this.hydrateAst(ast.method, options, ast.type), args, hashes);
            } else if (ast.type === 'Bracket') {
                var originalKey;
                originalKey = ast[canSymbol.for('can-stache.originalKey')];
                return new Bracket(this.hydrateAst(ast.children[0], options), ast.root ? this.hydrateAst(ast.root, options) : undefined, originalKey);
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
                if (nextToken === '=') {
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
                } else if (literalRegExp.test(token)) {
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
                } else if (keyRegExp.test(token)) {
                    lastToken = stack.topLastChild();
                    firstParent = stack.first([
                        'Helper',
                        'Call',
                        'Hash',
                        'Bracket'
                    ]);
                    if (lastToken && (lastToken.type === 'Call' || lastToken.type === 'Bracket') && isAddingToExpression(token)) {
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
                    if (lastToken && (lastToken.type === 'Call' || lastToken.type === 'Bracket')) {
                        stack.replaceTopAndPush({
                            type: 'Bracket',
                            root: lastToken
                        });
                    } else if (top.type === 'Lookup' || top.type === 'Bracket') {
                        var bracket = {
                            type: 'Bracket',
                            root: top
                        };
                        canReflect.setKeyValue(bracket, canSymbol.for('can-stache.originalKey'), top.key);
                        stack.replaceTopAndPush(bracket);
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
/*can-view-model@4.0.0-pre.5#can-view-model*/
define('can-view-model', [
    'require',
    'exports',
    'module',
    'can-util/dom/data/data',
    'can-simple-map',
    'can-namespace',
    'can-globals/document/document',
    'can-util/js/is-array-like/is-array-like',
    'can-reflect'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var domData = require('can-util/dom/data/data');
        var SimpleMap = require('can-simple-map');
        var ns = require('can-namespace');
        var getDocument = require('can-globals/document/document');
        var isArrayLike = require('can-util/js/is-array-like/is-array-like');
        var canReflect = require('can-reflect');
        module.exports = ns.viewModel = function (el, attr, val) {
            var scope;
            if (typeof el === 'string') {
                el = getDocument().querySelector(el);
            } else if (isArrayLike(el) && !el.nodeType) {
                el = el[0];
            }
            if (canReflect.isObservableLike(attr) && canReflect.isMapLike(attr)) {
                return domData.set.call(el, 'viewModel', attr);
            }
            scope = domData.get.call(el, 'viewModel');
            if (!scope) {
                scope = new SimpleMap();
                domData.set.call(el, 'viewModel', scope);
            }
            switch (arguments.length) {
            case 0:
            case 1:
                return scope;
            case 2:
                return canReflect.getKeyValue(scope, attr);
            default:
                canReflect.setKeyValue(scope, attr, val);
                return el;
            }
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-stache-bindings@4.0.0-pre.27#can-event*/
define('can-stache-bindings/can-event', [
    'require',
    'exports',
    'module',
    'can-reflect',
    'can-util/dom/events/events'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var domEvents = require('can-util/dom/events/events');
    var canEvent = {
        on: function on(eventName, handler, queue) {
            var listenWithDOM = domEvents.canAddEventListener.call(this);
            if (listenWithDOM) {
                domEvents.addEventListener.call(this, eventName, handler, queue);
            } else {
                canReflect.onKeyValue(this, eventName, handler, queue);
            }
        },
        off: function off(eventName, handler, queue) {
            var listenWithDOM = domEvents.canAddEventListener.call(this);
            if (listenWithDOM) {
                domEvents.removeEventListener.call(this, eventName, handler, queue);
            } else {
                canReflect.offKeyValue(this, eventName, handler, queue);
            }
        },
        one: function one(event, handler, queue) {
            var one = function () {
                canEvent.off.call(this, event, one, queue);
                return handler.apply(this, arguments);
            };
            canEvent.on.call(this, event, one, queue);
            return this;
        }
    };
    module.exports = canEvent;
});
/*can-stache-bindings@4.0.0-pre.27#attribute-observable/get-event-name*/
define('can-stache-bindings/attribute-observable/get-event-name', [
    'require',
    'exports',
    'module',
    'can-util/dom/attr/attr'
], function (require, exports, module) {
    var attr = require('can-util/dom/attr/attr');
    var isRadioInput = function isRadioInput(el) {
        return el.nodeName.toLowerCase() === 'input' && el.type === 'radio';
    };
    var isValidProp = function isValidProp(prop, bindingData) {
        return prop === 'checked' && !bindingData.legacyBindings;
    };
    var isSpecialProp = function isSpecialProp(prop) {
        return attr.special[prop] && attr.special[prop].addEventListener;
    };
    module.exports = function getEventName(el, prop, bindingData) {
        var event = 'change';
        if (isRadioInput(el) && isValidProp(prop, bindingData)) {
            event = 'radiochange';
        }
        if (isSpecialProp(prop)) {
            event = prop;
        }
        return event;
    };
});
/*can-stache-bindings@4.0.0-pre.27#attribute-observable/attribute-observable*/
define('can-stache-bindings/attribute-observable/attribute-observable', [
    'require',
    'exports',
    'module',
    'can-queues',
    'can-stache-bindings/can-event',
    'can-reflect',
    'can-observation',
    'can-util/dom/attr/attr',
    'can-stache-bindings/attribute-observable/get-event-name',
    'can-reflect-dependencies',
    'can-observation-recorder',
    'can-simple-observable/settable/settable'
], function (require, exports, module) {
    var queues = require('can-queues');
    var canEvent = require('can-stache-bindings/can-event');
    var canReflect = require('can-reflect');
    var Observation = require('can-observation');
    var attr = require('can-util/dom/attr/attr');
    var getEventName = require('can-stache-bindings/attribute-observable/get-event-name');
    var canReflectDeps = require('can-reflect-dependencies');
    var ObservationRecorder = require('can-observation-recorder');
    var SettableObservable = require('can-simple-observable/settable/settable');
    var isSelect = function isSelect(el) {
        return el.nodeName.toLowerCase() === 'select';
    };
    var isMultipleSelect = function isMultipleSelect(el, prop) {
        return isSelect(el) && prop === 'value' && el.multiple;
    };
    function AttributeObservable(el, prop, bindingData, event) {
        this.el = el;
        this.bound = false;
        this.bindingData = bindingData;
        this.prop = isMultipleSelect(el, prop) ? 'values' : prop;
        this.event = event || getEventName(el, prop, bindingData);
        this.handler = this.handler.bind(this);
        canReflectDeps.addMutatedBy(this.el, this.prop, this);
        canReflect.assignSymbols(this, {
            'can.getName': function getName() {
                return 'AttributeObservable<' + el.nodeName.toLowerCase() + '.' + this.prop + '>';
            }
        });
    }
    AttributeObservable.prototype = Object.create(SettableObservable.prototype);
    Object.assign(AttributeObservable.prototype, {
        constructor: AttributeObservable,
        get: function get() {
            if (ObservationRecorder.isRecording()) {
                ObservationRecorder.add(this);
                if (!this.bound) {
                    Observation.temporarilyBind(this);
                }
            }
            return attr.get(this.el, this.prop);
        },
        set: function set(newVal) {
            attr.setAttrOrProp(this.el, this.prop, newVal);
            this.value = newVal;
            return newVal;
        },
        handler: function handler(newVal) {
            var old = this.value;
            this.value = attr.get(this.el, this.prop);
            if (this.value !== old) {
                if (typeof this._log === 'function') {
                    this._log(old, newVal);
                }
                queues.enqueueByQueue(this.handlers.getNode([]), this, [
                    newVal,
                    old
                ], function () {
                    return {};
                });
            }
        },
        onBound: function onBound() {
            var observable = this;
            observable.bound = true;
            observable._handler = function () {
                observable.handler(attr.get(observable.el, observable.prop));
            };
            if (observable.event === 'radiochange') {
                canEvent.on.call(observable.el, 'change', observable._handler);
            }
            canEvent.on.call(observable.el, observable.event, observable._handler);
            this.value = attr.get(this.el, this.prop);
        },
        onUnbound: function onUnbound() {
            var observable = this;
            observable.bound = false;
            if (observable.event === 'radiochange') {
                canEvent.off.call(observable.el, 'change', observable._handler);
            }
            canEvent.off.call(observable.el, observable.event, observable._handler);
        },
        valueHasDependencies: function valueHasDependencies() {
            return true;
        },
        getValueDependencies: function getValueDependencies() {
            return {
                keyDependencies: new Map([[
                        this.el,
                        new Set([this.prop])
                    ]])
            };
        }
    });
    canReflect.assignSymbols(AttributeObservable.prototype, {
        'can.isMapLike': false,
        'can.getValue': AttributeObservable.prototype.get,
        'can.setValue': AttributeObservable.prototype.set,
        'can.onValue': AttributeObservable.prototype.on,
        'can.offValue': AttributeObservable.prototype.off,
        'can.valueHasDependencies': AttributeObservable.prototype.hasDependencies,
        'can.getValueDependencies': AttributeObservable.prototype.getValueDependencies
    });
    module.exports = AttributeObservable;
});
/*can-dom-events@1.0.7#helpers/util*/
define('can-dom-events/helpers/util', [
    'require',
    'exports',
    'module',
    'can-globals/document/document',
    'can-globals/is-browser-window/is-browser-window'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var getCurrentDocument = require('can-globals/document/document');
        var isBrowserWindow = require('can-globals/is-browser-window/is-browser-window');
        function getTargetDocument(target) {
            return target.ownerDocument || getCurrentDocument();
        }
        function createEvent(target, eventData, bubbles, cancelable) {
            var doc = getTargetDocument(target);
            var event = doc.createEvent('HTMLEvents');
            var eventType;
            if (typeof eventData === 'string') {
                eventType = eventData;
            } else {
                eventType = eventData.type;
                for (var prop in eventData) {
                    if (event[prop] === undefined) {
                        event[prop] = eventData[prop];
                    }
                }
            }
            if (bubbles === undefined) {
                bubbles = true;
            }
            event.initEvent(eventType, bubbles, cancelable);
            return event;
        }
        function isDomEventTarget(obj) {
            if (!(obj && obj.nodeName)) {
                return obj === window;
            }
            var nodeType = obj.nodeType;
            return nodeType === 1 || nodeType === 9 || nodeType === 11;
        }
        function addDomContext(context, args) {
            if (isDomEventTarget(context)) {
                args = Array.prototype.slice.call(args, 0);
                args.unshift(context);
            }
            return args;
        }
        function removeDomContext(context, args) {
            if (!isDomEventTarget(context)) {
                args = Array.prototype.slice.call(args, 0);
                context = args.shift();
            }
            return {
                context: context,
                args: args
            };
        }
        var fixSyntheticEventsOnDisabled = false;
        (function () {
            if (!isBrowserWindow()) {
                return;
            }
            var testEventName = 'fix_synthetic_events_on_disabled_test';
            var input = document.createElement('input');
            input.disabled = true;
            var timer = setTimeout(function () {
                fixSyntheticEventsOnDisabled = true;
            }, 50);
            var onTest = function onTest() {
                clearTimeout(timer);
                input.removeEventListener(testEventName, onTest);
            };
            input.addEventListener(testEventName, onTest);
            try {
                var event = document.create('HTMLEvents');
                event.initEvent(testEventName, false);
                input.dispatchEvent(event);
            } catch (e) {
                onTest();
                fixSyntheticEventsOnDisabled = true;
            }
        }());
        function isDispatchingOnDisabled(element, event) {
            var eventType = event.type;
            var isInsertedOrRemoved = eventType === 'inserted' || eventType === 'removed';
            var isDisabled = !!element.disabled;
            return isInsertedOrRemoved && isDisabled;
        }
        function forceEnabledForDispatch(element, event) {
            return fixSyntheticEventsOnDisabled && isDispatchingOnDisabled(element, event);
        }
        module.exports = {
            createEvent: createEvent,
            addDomContext: addDomContext,
            removeDomContext: removeDomContext,
            isDomEventTarget: isDomEventTarget,
            getTargetDocument: getTargetDocument,
            forceEnabledForDispatch: forceEnabledForDispatch
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-dom-events@1.0.7#helpers/add-event-compat*/
define('can-dom-events/helpers/add-event-compat', [
    'require',
    'exports',
    'module',
    'can-dom-events/helpers/util'
], function (require, exports, module) {
    'use strict';
    var util = require('can-dom-events/helpers/util');
    var addDomContext = util.addDomContext;
    var removeDomContext = util.removeDomContext;
    function isDomEvents(obj) {
        return !!(obj && obj.addEventListener && obj.removeEventListener && obj.dispatch);
    }
    function isNewEvents(obj) {
        return typeof obj.addEvent === 'function';
    }
    module.exports = function addEventCompat(domEvents, customEvent, customEventType) {
        if (!isDomEvents(domEvents)) {
            throw new Error('addEventCompat() must be passed can-dom-events or can-util/dom/events/events');
        }
        customEventType = customEventType || customEvent.defaultEventType;
        if (isNewEvents(domEvents)) {
            return domEvents.addEvent(customEvent, customEventType);
        }
        var registry = domEvents._compatRegistry;
        if (!registry) {
            registry = domEvents._compatRegistry = {};
        }
        if (registry[customEventType]) {
            return function noopRemoveOverride() {
            };
        }
        registry[customEventType] = customEvent;
        var newEvents = {
            addEventListener: function () {
                var data = removeDomContext(this, arguments);
                return domEvents.addEventListener.apply(data.context, data.args);
            },
            removeEventListener: function () {
                var data = removeDomContext(this, arguments);
                return domEvents.removeEventListener.apply(data.context, data.args);
            },
            dispatch: function () {
                var data = removeDomContext(this, arguments);
                var eventData = data.args[0];
                var eventArgs = typeof eventData === 'object' ? eventData.args : [];
                data.args.splice(1, 0, eventArgs);
                return domEvents.dispatch.apply(data.context, data.args);
            }
        };
        var isOverriding = true;
        var oldAddEventListener = domEvents.addEventListener;
        var addEventListener = domEvents.addEventListener = function addEventListener(eventName) {
            if (isOverriding && eventName === customEventType) {
                var args = addDomContext(this, arguments);
                customEvent.addEventListener.apply(newEvents, args);
            }
            return oldAddEventListener.apply(this, arguments);
        };
        var oldRemoveEventListener = domEvents.removeEventListener;
        var removeEventListener = domEvents.removeEventListener = function removeEventListener(eventName) {
            if (isOverriding && eventName === customEventType) {
                var args = addDomContext(this, arguments);
                customEvent.removeEventListener.apply(newEvents, args);
            }
            return oldRemoveEventListener.apply(this, arguments);
        };
        return function removeOverride() {
            isOverriding = false;
            registry[customEventType] = null;
            if (domEvents.addEventListener === addEventListener) {
                domEvents.addEventListener = oldAddEventListener;
            }
            if (domEvents.removeEventListener === removeEventListener) {
                domEvents.removeEventListener = oldRemoveEventListener;
            }
        };
    };
});
/*can-event-dom-enter@1.0.4#can-event-dom-enter*/
define('can-event-dom-enter', [
    'require',
    'exports',
    'module',
    'can-dom-data-state',
    'can-cid'
], function (require, exports, module) {
    'use strict';
    var domData = require('can-dom-data-state');
    var canCid = require('can-cid');
    var baseEventType = 'keyup';
    function isEnterEvent(event) {
        var hasEnterKey = event.key === 'Enter';
        var hasEnterCode = event.keyCode === 13;
        return hasEnterKey || hasEnterCode;
    }
    function getHandlerKey(eventType, handler) {
        return eventType + ':' + canCid(handler);
    }
    function associateHandler(target, eventType, handler, otherHandler) {
        var key = getHandlerKey(eventType, handler);
        domData.set.call(target, key, otherHandler);
    }
    function disassociateHandler(target, eventType, handler) {
        var key = getHandlerKey(eventType, handler);
        var otherHandler = domData.get.call(target, key);
        if (otherHandler) {
            domData.clean.call(target, key);
        }
        return otherHandler;
    }
    module.exports = {
        defaultEventType: 'enter',
        addEventListener: function (target, eventType, handler) {
            var keyHandler = function (event) {
                if (isEnterEvent(event)) {
                    return handler.apply(this, arguments);
                }
            };
            associateHandler(target, eventType, handler, keyHandler);
            this.addEventListener(target, baseEventType, keyHandler);
        },
        removeEventListener: function (target, eventType, handler) {
            var keyHandler = disassociateHandler(target, eventType, handler);
            if (keyHandler) {
                this.removeEventListener(target, baseEventType, keyHandler);
            }
        }
    };
});
/*can-event-dom-enter@1.0.4#compat*/
define('can-event-dom-enter/compat', [
    'require',
    'exports',
    'module',
    'can-dom-events/helpers/add-event-compat',
    'can-event-dom-enter'
], function (require, exports, module) {
    var addEventCompat = require('can-dom-events/helpers/add-event-compat');
    var radioChange = require('can-event-dom-enter');
    module.exports = function (domEvents, eventType) {
        return addEventCompat(domEvents, radioChange, eventType);
    };
});
/*can-dom-events@1.0.7#helpers/make-event-registry*/
define('can-dom-events/helpers/make-event-registry', function (require, exports, module) {
    'use strict';
    function EventRegistry() {
        this._registry = {};
    }
    module.exports = function makeEventRegistry() {
        return new EventRegistry();
    };
    EventRegistry.prototype.has = function (eventType) {
        return !!this._registry[eventType];
    };
    EventRegistry.prototype.get = function (eventType) {
        return this._registry[eventType];
    };
    EventRegistry.prototype.add = function (event, eventType) {
        if (!event) {
            throw new Error('An EventDefinition must be provided');
        }
        if (typeof event.addEventListener !== 'function') {
            throw new TypeError('EventDefinition addEventListener must be a function');
        }
        if (typeof event.removeEventListener !== 'function') {
            throw new TypeError('EventDefinition removeEventListener must be a function');
        }
        eventType = eventType || event.defaultEventType;
        if (typeof eventType !== 'string') {
            throw new TypeError('Event type must be a string, not ' + eventType);
        }
        if (this.has(eventType)) {
            throw new Error('Event "' + eventType + '" is already registered');
        }
        this._registry[eventType] = event;
        var self = this;
        return function remove() {
            self._registry[eventType] = undefined;
        };
    };
});
/*can-dom-events@1.0.7#can-dom-events*/
define('can-dom-events', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-dom-events/helpers/util',
    'can-dom-events/helpers/make-event-registry'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var namespace = require('can-namespace');
        var util = require('can-dom-events/helpers/util');
        var makeEventRegistry = require('can-dom-events/helpers/make-event-registry');
        var domEvents = {
            _eventRegistry: makeEventRegistry(),
            addEvent: function (event, eventType) {
                return this._eventRegistry.add(event, eventType);
            },
            addEventListener: function (target, eventType) {
                var hasCustomEvent = domEvents._eventRegistry.has(eventType);
                if (hasCustomEvent) {
                    var event = domEvents._eventRegistry.get(eventType);
                    return event.addEventListener.apply(domEvents, arguments);
                }
                var eventArgs = Array.prototype.slice.call(arguments, 1);
                return target.addEventListener.apply(target, eventArgs);
            },
            removeEventListener: function (target, eventType) {
                var hasCustomEvent = domEvents._eventRegistry.has(eventType);
                if (hasCustomEvent) {
                    var event = domEvents._eventRegistry.get(eventType);
                    return event.removeEventListener.apply(domEvents, arguments);
                }
                var eventArgs = Array.prototype.slice.call(arguments, 1);
                return target.removeEventListener.apply(target, eventArgs);
            },
            dispatch: function (target, eventData, bubbles, cancelable) {
                var event = util.createEvent(target, eventData, bubbles, cancelable);
                var enableForDispatch = util.forceEnabledForDispatch(target, event);
                if (enableForDispatch) {
                    target.disabled = false;
                }
                var ret = target.dispatchEvent(event);
                if (enableForDispatch) {
                    target.disabled = true;
                }
                return ret;
            }
        };
        module.exports = namespace.domEvents = domEvents;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-event-dom-radiochange@1.0.5#can-event-dom-radiochange*/
define('can-event-dom-radiochange', [
    'require',
    'exports',
    'module',
    'can-dom-data-state',
    'can-globals/document/document',
    'can-dom-events',
    'can-cid/map/map'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var domData = require('can-dom-data-state');
        var getDocument = require('can-globals/document/document');
        var domEvents = require('can-dom-events');
        var CIDMap = require('can-cid/map/map');
        function getRoot(el) {
            return el.ownerDocument || getDocument().documentElement;
        }
        function getRegistryName(eventName) {
            return 'can-event-radiochange:' + eventName + ':registry';
        }
        function getListenerName(eventName) {
            return 'can-event-radiochange:' + eventName + ':listener';
        }
        function getRegistry(root, eventName) {
            var name = getRegistryName(eventName);
            var registry = domData.get.call(root, name);
            if (!registry) {
                registry = new CIDMap();
                domData.set.call(root, name, registry);
            }
            return registry;
        }
        function findParentForm(el) {
            while (el) {
                if (el.nodeName === 'FORM') {
                    break;
                }
                el = el.parentNode;
            }
            return el;
        }
        function shouldReceiveEventFromRadio(source, dest) {
            var name = source.getAttribute('name');
            return name && name === dest.getAttribute('name') && findParentForm(source) === findParentForm(dest);
        }
        function isRadioInput(el) {
            return el.nodeName === 'INPUT' && el.type === 'radio';
        }
        function dispatch(eventName, target) {
            var root = getRoot(target);
            var registry = getRegistry(root, eventName);
            registry.forEach(function (el) {
                if (shouldReceiveEventFromRadio(target, el)) {
                    domEvents.dispatch(el, eventName);
                }
            });
        }
        function attachRootListener(root, eventName, events) {
            var listenerName = getListenerName(eventName);
            var listener = domData.get.call(root, listenerName);
            if (listener) {
                return;
            }
            var newListener = function (event) {
                var target = event.target;
                if (isRadioInput(target)) {
                    dispatch(eventName, target);
                }
            };
            events.addEventListener(root, 'change', newListener);
            domData.set.call(root, listenerName, newListener);
        }
        function detachRootListener(root, eventName, events) {
            var listenerName = getListenerName(eventName);
            var listener = domData.get.call(root, listenerName);
            if (!listener) {
                return;
            }
            var registry = getRegistry(root, eventName);
            if (registry.size > 0) {
                return;
            }
            events.removeEventListener(root, 'change', listener);
            domData.clean.call(root, listenerName);
        }
        function addListener(eventName, el, events) {
            if (!isRadioInput(el)) {
                throw new Error('Listeners for ' + eventName + ' must be radio inputs');
            }
            var root = getRoot(el);
            getRegistry(root, eventName).set(el, el);
            attachRootListener(root, eventName, events);
        }
        function removeListener(eventName, el, events) {
            var root = getRoot(el);
            getRegistry(root, eventName).delete(el);
            detachRootListener(root, eventName, events);
        }
        module.exports = {
            defaultEventType: 'radiochange',
            addEventListener: function (target, eventName, handler) {
                addListener(eventName, target, this);
                target.addEventListener(eventName, handler);
            },
            removeEventListener: function (target, eventName, handler) {
                removeListener(eventName, target, this);
                target.removeEventListener(eventName, handler);
            }
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-event-dom-radiochange@1.0.5#compat*/
define('can-event-dom-radiochange/compat', [
    'require',
    'exports',
    'module',
    'can-dom-events/helpers/add-event-compat',
    'can-event-dom-radiochange'
], function (require, exports, module) {
    var addEventCompat = require('can-dom-events/helpers/add-event-compat');
    var radioChange = require('can-event-dom-radiochange');
    module.exports = function (domEvents, eventType) {
        return addEventCompat(domEvents, radioChange, eventType);
    };
});
/*can-stache-bindings@4.0.0-pre.27#can-stache-bindings*/
define('can-stache-bindings', [
    'require',
    'exports',
    'module',
    'can-stache/src/expression',
    'can-view-callbacks',
    'can-view-model',
    'can-stache-key',
    'can-observation-recorder',
    'can-simple-observable',
    'can-util/js/assign/assign',
    'can-util/js/make-array/make-array',
    'can-util/js/each/each',
    'can-log/dev/dev',
    'can-util/dom/events/events',
    'can-util/dom/events/removed/removed',
    'can-util/dom/data/data',
    'can-symbol',
    'can-reflect',
    'can-reflect-dependencies',
    'can-attribute-encoder',
    'can-queues',
    'can-simple-observable/setter/setter',
    'can-stache-bindings/attribute-observable/attribute-observable',
    'can-view-scope/make-compute-like',
    'can-event-dom-enter/compat',
    'can-event-dom-radiochange/compat',
    'can-stache-bindings/can-event'
], function (require, exports, module) {
    var expression = require('can-stache/src/expression');
    var viewCallbacks = require('can-view-callbacks');
    var canViewModel = require('can-view-model');
    var observeReader = require('can-stache-key');
    var ObservationRecorder = require('can-observation-recorder');
    var SimpleObservable = require('can-simple-observable');
    var assign = require('can-util/js/assign/assign');
    var makeArray = require('can-util/js/make-array/make-array');
    var each = require('can-util/js/each/each');
    var dev = require('can-log/dev/dev');
    var domEvents = require('can-util/dom/events/events');
    require('can-util/dom/events/removed/removed');
    var domData = require('can-util/dom/data/data');
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    var canReflectDeps = require('can-reflect-dependencies');
    var encoder = require('can-attribute-encoder');
    var queues = require('can-queues');
    var SettableObservable = require('can-simple-observable/setter/setter');
    var AttributeObservable = require('can-stache-bindings/attribute-observable/attribute-observable');
    var makeCompute = require('can-view-scope/make-compute-like');
    var addEnterEvent = require('can-event-dom-enter/compat');
    addEnterEvent(domEvents);
    var addRadioChange = require('can-event-dom-radiochange/compat');
    addRadioChange(domEvents);
    var canEvent = require('can-stache-bindings/can-event');
    var noop = function () {
    };
    var onMatchStr = 'on:', vmMatchStr = 'vm:', elMatchStr = 'el:', byMatchStr = ':by:', toMatchStr = ':to', fromMatchStr = ':from', bindMatchStr = ':bind', attributesEventStr = 'attributes', removedStr = 'removed', viewModelBindingStr = 'viewModel', attributeBindingStr = 'attribute', scopeBindingStr = 'scope', viewModelOrAttributeBindingStr = 'viewModelOrAttribute', getValueSymbol = canSymbol.for('can.getValue'), onValueSymbol = canSymbol.for('can.onValue'), getChangesSymbol = canSymbol.for('can.getChangesDependencyRecord');
    var throwOnlyOneTypeOfBindingError = function () {
        throw new Error('can-stache-bindings - you can not have contextual bindings ( this:from=\'value\' ) and key bindings ( prop:from=\'value\' ) on one element.');
    };
    var checkBindingState = function (bindingState, dataBinding) {
        var isSettingOnViewModel = dataBinding.bindingInfo.parentToChild && dataBinding.bindingInfo.child === viewModelBindingStr;
        if (isSettingOnViewModel) {
            var bindingName = dataBinding.bindingInfo.childName;
            var isSettingViewModel = isSettingOnViewModel && (bindingName === 'this' || bindingName === '.');
            if (isSettingViewModel) {
                if (bindingState.isSettingViewModel || bindingState.isSettingOnViewModel) {
                    throwOnlyOneTypeOfBindingError();
                } else {
                    return {
                        isSettingViewModel: true,
                        initialViewModelData: undefined
                    };
                }
            } else {
                if (bindingState.isSettingViewModel) {
                    throwOnlyOneTypeOfBindingError();
                } else {
                    return {
                        isSettingOnViewModel: true,
                        initialViewModelData: bindingState.initialViewModelData
                    };
                }
            }
        } else {
            return bindingState;
        }
    };
    var behaviors = {
        viewModel: function (el, tagData, makeViewModel, initialViewModelData, staticDataBindingsOnly) {
            var bindingsSemaphore = {}, viewModel, onCompleteBindings = [], onTeardowns = {}, bindingInfos = {}, attributeViewModelBindings = assign({}, initialViewModelData), bindingsState = {
                    isSettingOnViewModel: false,
                    isSettingViewModel: false,
                    initialViewModelData: initialViewModelData || {}
                }, hasDataBinding = false;
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
                    nodeList: tagData.parentNodeList,
                    favorViewModel: true
                });
                if (dataBinding) {
                    bindingsState = checkBindingState(bindingsState, dataBinding);
                    hasDataBinding = true;
                    if (dataBinding.onCompleteBinding) {
                        if (dataBinding.bindingInfo.parentToChild && dataBinding.value !== undefined) {
                            if (bindingsState.isSettingViewModel) {
                                bindingsState.initialViewModelData = dataBinding.value;
                            } else {
                                bindingsState.initialViewModelData[cleanVMName(dataBinding.bindingInfo.childName, tagData.scope)] = dataBinding.value;
                            }
                        }
                        onCompleteBindings.push(dataBinding.onCompleteBinding);
                    }
                    onTeardowns[node.name] = dataBinding.onTeardown;
                }
            });
            if (staticDataBindingsOnly && !hasDataBinding) {
                return;
            }
            viewModel = makeViewModel(bindingsState.initialViewModelData, hasDataBinding);
            for (var i = 0, len = onCompleteBindings.length; i < len; i++) {
                onCompleteBindings[i]();
            }
            var attributeListener;
            if (!bindingsState.isSettingViewModel) {
                attributeListener = function (ev) {
                    var attrName = ev.attributeName, value = el.getAttribute(attrName);
                    if (onTeardowns[attrName]) {
                        onTeardowns[attrName]();
                    }
                    var parentBindingWasAttribute = bindingInfos[attrName] && bindingInfos[attrName].parent === attributeBindingStr;
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
                };
                domEvents.addEventListener.call(el, attributesEventStr, attributeListener);
            }
            return function () {
                domEvents.removeEventListener.call(el, attributesEventStr, attributeListener);
                for (var attrName in onTeardowns) {
                    onTeardowns[attrName]();
                }
            };
        },
        data: function (el, attrData) {
            if (domData.get.call(el, 'preventDataBindings')) {
                return;
            }
            var viewModel, getViewModel = ObservationRecorder.ignore(function () {
                    return viewModel || (viewModel = canViewModel(el));
                }), semaphore = {}, teardown;
            var dataBinding = makeDataBinding({
                name: attrData.attributeName,
                value: el.getAttribute(attrData.attributeName),
                nodeList: attrData.nodeList
            }, el, {
                templateType: attrData.templateType,
                scope: attrData.scope,
                semaphore: semaphore,
                getViewModel: getViewModel,
                syncChildWithParent: false
            });
            if (dataBinding.bindingInfo.child === 'viewModel' && !domData.get(el, 'viewModel')) {
                dev.warn('This element does not have a viewModel. (Attempting to bind `' + dataBinding.bindingInfo.bindingAttributeName + '="' + dataBinding.bindingInfo.parentName + '"`)');
            }
            if (dataBinding.onCompleteBinding) {
                dataBinding.onCompleteBinding();
            }
            var attributeListener = function (ev) {
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
                            getViewModel: getViewModel,
                            initializeValues: true,
                            nodeList: attrData.nodeList,
                            syncChildWithParent: false
                        });
                        if (dataBinding) {
                            if (dataBinding.onCompleteBinding) {
                                dataBinding.onCompleteBinding();
                            }
                            teardown = dataBinding.onTeardown;
                        }
                    }
                }
            };
            domEvents.addEventListener.call(el, attributesEventStr, attributeListener);
            teardown = dataBinding.onTeardown;
            canEvent.one.call(el, removedStr, function () {
                teardown();
                domEvents.removeEventListener.call(el, attributesEventStr, attributeListener);
            });
        },
        event: function (el, data) {
            var attributeName = encoder.decode(data.attributeName), event, bindingContext;
            if (attributeName.indexOf(toMatchStr + ':') !== -1 || attributeName.indexOf(fromMatchStr + ':') !== -1 || attributeName.indexOf(bindMatchStr + ':') !== -1) {
                return this.data(el, data);
            }
            if (startsWith.call(attributeName, onMatchStr)) {
                event = attributeName.substr(onMatchStr.length);
                var viewModel = domData.get.call(el, viewModelBindingStr);
                var byParent = data.scope;
                if (startsWith.call(event, elMatchStr)) {
                    event = event.substr(elMatchStr.length);
                    bindingContext = el;
                } else {
                    if (startsWith.call(event, vmMatchStr)) {
                        event = event.substr(vmMatchStr.length);
                        bindingContext = viewModel;
                        byParent = viewModel;
                    } else {
                        bindingContext = viewModel || el;
                    }
                    var byIndex = event.indexOf(byMatchStr);
                    if (byIndex >= 0) {
                        bindingContext = byParent.get(event.substr(byIndex + byMatchStr.length));
                        event = event.substr(0, byIndex);
                    }
                }
            } else {
                throw new Error('can-stache-bindings - unsupported event bindings ' + attributeName);
            }
            var handler = function (ev) {
                var attrVal = el.getAttribute(encoder.encode(attributeName));
                if (!attrVal) {
                    return;
                }
                var viewModel = canViewModel(el);
                var expr = expression.parse(attrVal, {
                    lookupRule: function () {
                        return expression.Lookup;
                    },
                    methodRule: 'call'
                });
                if (!(expr instanceof expression.Call)) {
                    throw new Error('can-stache-bindings: Event bindings must be a call expression. Make sure you have a () in ' + data.attributeName + '=' + JSON.stringify(attrVal));
                }
                var specialValues = {
                    element: el,
                    event: ev,
                    viewModel: viewModel,
                    arguments: arguments
                };
                var localScope = data.scope.add(specialValues, { special: true });
                var updateFn = function () {
                    var value = expr.value(localScope, { doNotWrapInObservation: true });
                    value = canReflect.isValueLike(value) ? canReflect.getValue(value) : value;
                    return typeof value === 'function' ? value(el) : value;
                };
                Object.defineProperty(updateFn, 'name', { value: attributeName + '="' + attrVal + '"' });
                queues.batch.start();
                queues.notifyQueue.enqueue(updateFn, null, null, {
                    reasonLog: [
                        el,
                        ev,
                        attributeName + '=' + attrVal
                    ]
                });
                queues.batch.stop();
            };
            var attributesHandler = function (ev) {
                var isEventAttribute = ev.attributeName === attributeName;
                var isRemoved = !this.getAttribute(attributeName);
                var isEventAttributeRemoved = isEventAttribute && isRemoved;
                if (isEventAttributeRemoved) {
                    unbindEvent();
                }
            };
            var removedHandler = function (ev) {
                unbindEvent();
            };
            var unbindEvent = function () {
                canEvent.off.call(bindingContext, event, handler);
                canEvent.off.call(el, attributesEventStr, attributesHandler);
                canEvent.off.call(el, removedStr, removedHandler);
            };
            canEvent.on.call(bindingContext, event, handler);
            canEvent.on.call(el, attributesEventStr, attributesHandler);
            canEvent.on.call(el, removedStr, removedHandler);
        }
    };
    viewCallbacks.attr(/[\w\.:]+:to$/, behaviors.data);
    viewCallbacks.attr(/[\w\.:]+:from$/, behaviors.data);
    viewCallbacks.attr(/[\w\.:]+:bind$/, behaviors.data);
    viewCallbacks.attr(/[\w\.:]+:to:on:[\w\.:]+/, behaviors.data);
    viewCallbacks.attr(/[\w\.:]+:from:on:[\w\.:]+/, behaviors.data);
    viewCallbacks.attr(/[\w\.:]+:bind:on:[\w\.:]+/, behaviors.data);
    viewCallbacks.attr(/on:[\w\.:]+/, behaviors.event);
    var getObservableFrom = {
        viewModelOrAttribute: function (el, scope, vmNameOrProp, bindingData, mustBeSettable, stickyCompute, event) {
            var viewModel = domData.get.call(el, viewModelBindingStr);
            if (viewModel) {
                return this.viewModel.apply(this, arguments);
            } else {
                return this.attribute.apply(this, arguments);
            }
        },
        scope: function (el, scope, scopeProp, bindingData, mustBeSettable, stickyCompute) {
            if (!scopeProp) {
                return new SimpleObservable();
            } else {
                if (mustBeSettable) {
                    var parentExpression = expression.parse(scopeProp, { baseMethodType: 'Call' });
                    return parentExpression.value(scope);
                } else {
                    var observation = {};
                    canReflect.assignSymbols(observation, {
                        'can.getValue': function getValue() {
                        },
                        'can.valueHasDependencies': function hasValueDependencies() {
                            return false;
                        },
                        'can.setValue': function setValue(newVal) {
                            scope.set(cleanVMName(scopeProp, scope), newVal);
                        },
                        'can.getWhatIChange': function getWhatIChange() {
                            var data = scope.getDataForScopeSet(cleanVMName(scopeProp, scope));
                            return {
                                mutate: {
                                    keyDependencies: new Map([[
                                            data.parent,
                                            new Set([data.key])
                                        ]])
                                }
                            };
                        },
                        'can.getName': function getName() {
                            var result = 'ObservableFromScope<>';
                            var data = scope.getDataForScopeSet(cleanVMName(scopeProp, scope));
                            if (data.parent && data.key) {
                                result = 'ObservableFromScope<' + canReflect.getName(data.parent) + '.' + data.key + '>';
                            }
                            return result;
                        }
                    });
                    var data = scope.getDataForScopeSet(cleanVMName(scopeProp, scope));
                    if (data.parent && data.key) {
                        canReflectDeps.addMutatedBy(data.parent, data.key, observation);
                    }
                    return observation;
                }
            }
        },
        viewModel: function (el, scope, vmName, bindingData, mustBeSettable, stickyCompute, childEvent) {
            var setName = cleanVMName(vmName, scope);
            var isBoundToContext = vmName === '.' || vmName === 'this';
            var keysToRead = isBoundToContext ? [] : observeReader.reads(vmName);
            function getViewModelProperty() {
                var viewModel = bindingData.getViewModel();
                return observeReader.read(viewModel, keysToRead, {}).value;
            }
            Object.defineProperty(getViewModelProperty, 'name', { value: 'viewModel.' + vmName });
            var observation = new SettableObservable(getViewModelProperty, function setViewModelProperty(newVal) {
                var viewModel = bindingData.getViewModel();
                if (stickyCompute) {
                    var oldValue = canReflect.getKeyValue(viewModel, setName);
                    if (canReflect.isObservableLike(oldValue)) {
                        canReflect.setValue(oldValue, newVal);
                    } else {
                        canReflect.setKeyValue(viewModel, setName, new SimpleObservable(canReflect.getValue(stickyCompute)));
                    }
                } else {
                    if (isBoundToContext) {
                        canReflect.setValue(viewModel, newVal);
                    } else {
                        canReflect.setKeyValue(viewModel, setName, newVal);
                    }
                }
            });
            var viewModel = bindingData.getViewModel();
            if (viewModel && setName) {
                canReflectDeps.addMutatedBy(viewModel, setName, observation);
            }
            return observation;
        },
        attribute: function (el, scope, prop, bindingData, mustBeSettable, stickyCompute, event, bindingInfo) {
            return new AttributeObservable(el, prop, bindingData, event);
        }
    };
    var bind = {
        childToParent: function (el, parentObservable, childObservable, bindingsSemaphore, attrName, syncChild, bindingInfo) {
            function updateParent(newVal) {
                if (!bindingsSemaphore[attrName]) {
                    if (parentObservable && parentObservable[getValueSymbol]) {
                        var hasDependencies = canReflect.valueHasDependencies(parentObservable);
                        if (!hasDependencies || canReflect.getValue(parentObservable) !== newVal) {
                            canReflect.setValue(parentObservable, newVal);
                        }
                        if (syncChild && hasDependencies) {
                            if (canReflect.getValue(parentObservable) !== canReflect.getValue(childObservable)) {
                                bindingsSemaphore[attrName] = (bindingsSemaphore[attrName] || 0) + 1;
                                queues.batch.start();
                                canReflect.setValue(childObservable, canReflect.getValue(parentObservable));
                                queues.mutateQueue.enqueue(function decrementChildToParentSemaphore() {
                                    --bindingsSemaphore[attrName];
                                }, null, [], {});
                                queues.batch.stop();
                            }
                        }
                    } else if (canReflect.isMapLike(parentObservable)) {
                        var attrValue = el.getAttribute(attrName);
                        dev.warn('can-stache-bindings: Merging ' + attrName + ' into ' + attrValue + ' because its parent is non-observable');
                        canReflect.eachKey(parentObservable, function (prop) {
                            canReflect.deleteKeyValue(parentObservable, prop);
                        });
                        canReflect.setValue(parentObservable, newVal && newVal.serialize ? newVal.serialize() : newVal, true);
                    }
                }
            }
            Object.defineProperty(updateParent, 'name', { value: 'update ' + bindingInfo.parent + '.' + bindingInfo.parentName + ' of <' + el.nodeName.toLowerCase() + '>' });
            if (childObservable && childObservable[getValueSymbol]) {
                canReflect.onValue(childObservable, updateParent, 'domUI');
                canReflectDeps.addMutatedBy(parentObservable, childObservable);
                updateParent[getChangesSymbol] = function getChangesDependencyRecord() {
                    return { valueDependencies: new Set([parentObservable]) };
                };
            }
            return updateParent;
        },
        parentToChild: function (el, parentObservable, childObservable, bindingsSemaphore, attrName, bindingInfo) {
            var updateChild = function updateChild(newValue) {
                bindingsSemaphore[attrName] = (bindingsSemaphore[attrName] || 0) + 1;
                queues.batch.start();
                canReflect.setValue(childObservable, newValue);
                queues.mutateQueue.enqueue(function decrementParentToChildSemaphore() {
                    --bindingsSemaphore[attrName];
                }, null, [], {});
                queues.batch.stop();
            };
            Object.defineProperty(updateChild, 'name', { value: 'update ' + bindingInfo.child + '.' + bindingInfo.childName + ' of <' + el.nodeName.toLowerCase() + '>' });
            if (parentObservable && parentObservable[getValueSymbol]) {
                canReflect.onValue(parentObservable, updateChild, 'domUI');
                canReflectDeps.addMutatedBy(childObservable, parentObservable);
                updateChild[getChangesSymbol] = function getChangesDependencyRecord() {
                    return { valueDependencies: new Set([childObservable]) };
                };
            }
            return updateChild;
        }
    };
    var startsWith = String.prototype.startsWith || function (text) {
        return this.indexOf(text) === 0;
    };
    function getEventName(result) {
        if (result.special.on !== undefined) {
            return result.tokens[result.special.on + 1];
        }
    }
    var bindingRules = {
        to: {
            childToParent: true,
            parentToChild: false,
            syncChildWithParent: false
        },
        from: {
            childToParent: false,
            parentToChild: true,
            syncChildWithParent: false
        },
        bind: {
            childToParent: true,
            parentToChild: true,
            syncChildWithParent: true
        }
    };
    var bindingNames = [];
    var special = {
        vm: true,
        on: true
    };
    each(bindingRules, function (value, key) {
        bindingNames.push(key);
        special[key] = true;
    });
    function tokenize(source) {
        var splitByColon = source.split(':');
        var result = {
            tokens: [],
            special: {}
        };
        splitByColon.forEach(function (token) {
            if (special[token]) {
                result.special[token] = result.tokens.push(token) - 1;
            } else {
                result.tokens.push(token);
            }
        });
        return result;
    }
    var getChildBindingStr = function (tokens, favorViewModel) {
        if (tokens.indexOf('vm') >= 0) {
            return viewModelBindingStr;
        } else if (tokens.indexOf('el') >= 0) {
            return attributeBindingStr;
        } else {
            return favorViewModel ? viewModelBindingStr : viewModelOrAttributeBindingStr;
        }
    };
    var getBindingInfo = function (node, attributeViewModelBindings, templateType, tagName, favorViewModel) {
        var bindingInfo, attributeName = encoder.decode(node.name), attributeValue = node.value || '';
        var result = tokenize(attributeName), dataBindingName, specialIndex;
        bindingNames.forEach(function (name) {
            if (result.special[name] !== undefined && result.special[name] > 0) {
                dataBindingName = name;
                specialIndex = result.special[name];
                return false;
            }
        });
        if (dataBindingName) {
            var childEventName = getEventName(result);
            var initializeValues = childEventName ? false : true;
            bindingInfo = assign({
                parent: scopeBindingStr,
                child: getChildBindingStr(result.tokens, favorViewModel),
                childName: result.tokens[specialIndex - 1],
                childEvent: childEventName,
                bindingAttributeName: attributeName,
                parentName: attributeValue,
                initializeValues: initializeValues
            }, bindingRules[dataBindingName]);
            if (attributeValue.trim().charAt(0) === '~') {
                bindingInfo.stickyParentToChild = true;
            }
            return bindingInfo;
        }
    };
    var makeDataBinding = function (node, el, bindingData) {
        var bindingInfo = getBindingInfo(node, bindingData.attributeViewModelBindings, bindingData.templateType, el.nodeName.toLowerCase(), bindingData.favorViewModel);
        if (!bindingInfo) {
            return;
        }
        bindingInfo.alreadyUpdatedChild = bindingData.alreadyUpdatedChild;
        if (bindingData.initializeValues) {
            bindingInfo.initializeValues = true;
        }
        var parentObservable = getObservableFrom[bindingInfo.parent](el, bindingData.scope, bindingInfo.parentName, bindingData, bindingInfo.parentToChild, undefined, undefined, bindingInfo), childObservable = getObservableFrom[bindingInfo.child](el, bindingData.scope, bindingInfo.childName, bindingData, bindingInfo.childToParent, bindingInfo.stickyParentToChild && parentObservable, bindingInfo.childEvent, bindingInfo), updateParent, updateChild;
        if (bindingData.nodeList) {
            if (parentObservable) {
                canReflect.setPriority(parentObservable, bindingData.nodeList.nesting + 1);
            }
            if (childObservable) {
                canReflect.setPriority(childObservable, bindingData.nodeList.nesting + 1);
            }
        }
        if (bindingInfo.parentToChild) {
            updateChild = bind.parentToChild(el, parentObservable, childObservable, bindingData.semaphore, bindingInfo.bindingAttributeName, bindingInfo);
        }
        var completeBinding = function () {
            if (bindingInfo.childToParent) {
                updateParent = bind.childToParent(el, parentObservable, childObservable, bindingData.semaphore, bindingInfo.bindingAttributeName, bindingInfo.syncChildWithParent, bindingInfo);
            } else if (bindingInfo.stickyParentToChild && childObservable[onValueSymbol]) {
                canReflect.onValue(childObservable, noop, 'mutate');
            }
            if (bindingInfo.initializeValues) {
                initializeValues(bindingInfo, childObservable, parentObservable, updateChild, updateParent);
            }
        };
        var onTeardown = function () {
            unbindUpdate(parentObservable, updateChild);
            unbindUpdate(childObservable, updateParent);
            unbindUpdate(childObservable, noop);
        };
        if (bindingInfo.child === viewModelBindingStr) {
            return {
                value: bindingInfo.stickyParentToChild ? makeCompute(parentObservable) : canReflect.getValue(parentObservable),
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
    var initializeValues = function (bindingInfo, childObservable, parentObservable, updateChild, updateParent) {
        var doUpdateParent = false;
        if (bindingInfo.parentToChild && !bindingInfo.childToParent) {
        } else if (!bindingInfo.parentToChild && bindingInfo.childToParent) {
            doUpdateParent = true;
        } else if (canReflect.getValue(childObservable) === undefined) {
        } else if (canReflect.getValue(parentObservable) === undefined) {
            doUpdateParent = true;
        }
        if (doUpdateParent) {
            updateParent(canReflect.getValue(childObservable));
        } else {
            if (!bindingInfo.alreadyUpdatedChild) {
                updateChild(canReflect.getValue(parentObservable));
            }
        }
    };
    var unbindUpdate = function (observable, updater) {
            if (observable && observable[getValueSymbol] && typeof updater === 'function') {
                canReflect.offValue(observable, updater, 'domUI');
            }
        }, cleanVMName = function (name, scope) {
            if (name.indexOf('@') >= 0) {
                var filename = scope.peek('scope.filename');
                var lineNumber = scope.peek('scope.lineNumber');
                dev.warn((filename ? filename + ':' : '') + (lineNumber ? lineNumber + ': ' : '') + 'functions are no longer called by default so @ is unnecessary in \'' + name + '\'.');
            }
            return name.replace(/@/g, '');
        };
    module.exports = {
        behaviors: behaviors,
        getBindingInfo: getBindingInfo
    };
});
/*can-component@4.0.0-pre.21#can-component*/
define('can-component', [
    'require',
    'exports',
    'module',
    'can-component/control/control',
    'can-namespace',
    'can-construct',
    'can-stache-bindings',
    'can-view-scope',
    'can-view-callbacks',
    'can-view-nodelist',
    'can-reflect',
    'can-simple-observable',
    'can-simple-map',
    'can-log',
    'can-log/dev/dev',
    'can-assign',
    'can-globals/document/document',
    'can-view-model',
    'can-util/dom/data/data',
    'can-util/dom/mutate/mutate',
    'can-util/dom/child-nodes/child-nodes',
    'can-util/dom/dispatch/dispatch',
    'can-util/js/string/string',
    'can-util/dom/events/events',
    'can-util/dom/events/inserted/inserted',
    'can-util/dom/events/removed/removed'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var ComponentControl = require('can-component/control/control');
        var namespace = require('can-namespace');
        var Construct = require('can-construct');
        var stacheBindings = require('can-stache-bindings');
        var Scope = require('can-view-scope');
        var viewCallbacks = require('can-view-callbacks');
        var nodeLists = require('can-view-nodelist');
        var canReflect = require('can-reflect');
        var SimpleObservable = require('can-simple-observable');
        var SimpleMap = require('can-simple-map');
        var canLog = require('can-log');
        var canDev = require('can-log/dev/dev');
        var assign = require('can-assign');
        var DOCUMENT = require('can-globals/document/document');
        require('can-view-model');
        var domData = require('can-util/dom/data/data');
        var domMutate = require('can-util/dom/mutate/mutate');
        var getChildNodes = require('can-util/dom/child-nodes/child-nodes');
        var domDispatch = require('can-util/dom/dispatch/dispatch');
        var string = require('can-util/js/string/string');
        var domEvents = require('can-util/dom/events/events');
        require('can-util/dom/events/inserted/inserted');
        require('can-util/dom/events/removed/removed');
        function addContext(el, tagData, insertionElementTagData) {
            var vm;
            domData.set.call(el, 'preventDataBindings', true);
            var teardown = stacheBindings.behaviors.viewModel(el, insertionElementTagData, function (initialData) {
                return vm = new SimpleObservable(initialData);
            }, undefined, true);
            if (!teardown) {
                return tagData;
            } else {
                return assign(assign({}, tagData), {
                    teardown: teardown,
                    scope: tagData.scope.add(vm)
                });
            }
        }
        function makeInsertionTagCallback(tagName, componentTagData, shadowTagData, leakScope, getPrimaryTemplate) {
            var options = shadowTagData.options;
            return function hookupFunction(el, insertionElementTagData) {
                var template = getPrimaryTemplate(el) || insertionElementTagData.subtemplate, renderingLightContent = template !== insertionElementTagData.subtemplate;
                if (template) {
                    delete options.tags[tagName];
                    var tagData;
                    if (renderingLightContent) {
                        if (leakScope.toLightContent) {
                            tagData = addContext(el, {
                                scope: insertionElementTagData.scope.cloneFromRef(),
                                options: insertionElementTagData.options
                            }, insertionElementTagData);
                        } else {
                            tagData = addContext(el, componentTagData, insertionElementTagData);
                        }
                    } else {
                        tagData = addContext(el, insertionElementTagData, insertionElementTagData);
                    }
                    var nodeList = nodeLists.register([el], function () {
                        if (tagData.teardown) {
                            tagData.teardown();
                        }
                    }, insertionElementTagData.parentNodeList || true, false);
                    nodeList.expression = '<can-slot name=\'' + el.getAttribute('name') + '\'/>';
                    var frag = template(tagData.scope, tagData.options, nodeList);
                    var newNodes = canReflect.toArray(getChildNodes(frag));
                    nodeLists.replace(nodeList, frag);
                    nodeLists.update(nodeList, newNodes);
                    options.tags[tagName] = hookupFunction;
                }
            };
        }
        var Component = Construct.extend({
            setup: function () {
                Construct.setup.apply(this, arguments);
                if (Component) {
                    var self = this;
                    if (this.prototype.events !== undefined && canReflect.size(this.prototype.events) !== 0) {
                        this.Control = ComponentControl.extend(this.prototype.events);
                    }
                    if (this.prototype.viewModel && canReflect.isConstructorLike(this.prototype.viewModel)) {
                        canDev.warn('can-component: Assigning a DefineMap or constructor type to the viewModel property may not be what you intended. Did you mean ViewModel instead? More info: https://canjs.com/doc/can-component.prototype.ViewModel.html');
                    }
                    var protoViewModel = this.prototype.viewModel || this.prototype.scope;
                    if (protoViewModel && this.prototype.ViewModel) {
                        throw new Error('Cannot provide both a ViewModel and a viewModel property');
                    }
                    var vmName = string.capitalize(string.camelize(this.prototype.tag)) + 'VM';
                    if (this.prototype.ViewModel) {
                        if (typeof this.prototype.ViewModel === 'function') {
                            this.ViewModel = this.prototype.ViewModel;
                        } else {
                            canLog.warn('can-component: ' + this.prototype.tag + ' is extending the ViewModel into a can-simple-map');
                            this.ViewModel = SimpleMap.extend(vmName, {}, this.prototype.ViewModel);
                        }
                    } else {
                        if (protoViewModel) {
                            if (typeof protoViewModel === 'function') {
                                if (canReflect.isObservableLike(protoViewModel.prototype) && canReflect.isMapLike(protoViewModel.prototype)) {
                                    this.ViewModel = protoViewModel;
                                } else {
                                    this.viewModelHandler = protoViewModel;
                                }
                            } else {
                                if (canReflect.isObservableLike(protoViewModel) && canReflect.isMapLike(protoViewModel)) {
                                    canLog.warn('can-component: ' + this.prototype.tag + ' is sharing a single map across all component instances');
                                    this.viewModelInstance = protoViewModel;
                                } else {
                                    canLog.warn('can-component: ' + this.prototype.tag + ' is extending the viewModel into a can-simple-map');
                                    this.ViewModel = SimpleMap.extend(vmName, {}, protoViewModel);
                                }
                            }
                        } else {
                            this.ViewModel = SimpleMap.extend(vmName, {}, {});
                        }
                    }
                    if (this.prototype.template) {
                        canLog.warn('can-component.prototype.template: is deprecated and will be removed in a future release. Use can-component.prototype.view');
                        this.renderer = this.prototype.template;
                    }
                    if (this.prototype.view) {
                        this.renderer = this.prototype.view;
                    }
                    viewCallbacks.tag(this.prototype.tag, function (el, options) {
                        new self(el, options);
                    });
                    if (this.prototype.autoMount) {
                        canReflect.eachIndex(DOCUMENT().getElementsByTagName(this.prototype.tag), function (el) {
                            if (!domData.get.call(el, 'viewModel')) {
                                new self(el, {
                                    scope: new Scope(),
                                    options: {},
                                    templates: {},
                                    subtemplate: null,
                                    mounted: true
                                });
                            }
                        });
                    }
                }
            }
        }, {
            setup: function (el, componentTagData) {
                var component = this;
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
                            if (canReflect.isObservableLike(scopeResult) && canReflect.isMapLike(scopeResult)) {
                                viewModelInstance = scopeResult;
                            } else if (canReflect.isObservableLike(scopeResult.prototype) && canReflect.isMapLike(scopeResult.prototype)) {
                                ViewModel = scopeResult;
                            } else {
                                ViewModel = SimpleMap.extend(scopeResult);
                            }
                        }
                        if (ViewModel) {
                            viewModelInstance = new component.constructor.ViewModel(initialViewModelData);
                        }
                        viewModel = viewModelInstance;
                        return viewModelInstance;
                    }, initialViewModelData);
                } else {
                    viewModel = domData.get.call(el, 'viewModel');
                }
                this.viewModel = viewModel;
                domData.set.call(el, 'viewModel', viewModel);
                domData.set.call(el, 'preventDataBindings', true);
                var options = {
                    helpers: {},
                    tags: {}
                };
                if (this.helpers !== undefined) {
                    canReflect.eachKey(this.helpers, function (val, prop) {
                        if (typeof val === 'function') {
                            options.helpers[prop] = val.bind(viewModel);
                        }
                    });
                }
                if (this.constructor.Control) {
                    this._control = new this.constructor.Control(el, {
                        scope: this.viewModel,
                        viewModel: this.viewModel,
                        destroy: callTeardownFunctions
                    });
                } else {
                    domEvents.addEventListener.call(el, 'removed', callTeardownFunctions);
                }
                var leakScope = {
                    toLightContent: this.leakScope === true,
                    intoShadowContent: this.leakScope === true
                };
                var hasShadowTemplate = !!this.constructor.renderer;
                var betweenTagsRenderer;
                var betweenTagsTagData;
                if (hasShadowTemplate) {
                    var shadowTagData;
                    if (leakScope.intoShadowContent) {
                        shadowTagData = {
                            scope: componentTagData.scope.add(this.viewModel),
                            options: options
                        };
                    } else {
                        shadowTagData = {
                            scope: new Scope(this.viewModel),
                            options: options
                        };
                    }
                    options.tags['can-slot'] = makeInsertionTagCallback('can-slot', componentTagData, shadowTagData, leakScope, function (el) {
                        return componentTagData.templates[el.getAttribute('name')];
                    });
                    options.tags.content = makeInsertionTagCallback('content', componentTagData, shadowTagData, leakScope, function () {
                        return componentTagData.subtemplate;
                    });
                    betweenTagsRenderer = this.constructor.renderer;
                    betweenTagsTagData = shadowTagData;
                } else {
                    var lightTemplateTagData = {
                        scope: componentTagData.scope.add(this.viewModel, { viewModel: true }),
                        options: options
                    };
                    betweenTagsTagData = lightTemplateTagData;
                    betweenTagsRenderer = componentTagData.subtemplate || el.ownerDocument.createDocumentFragment.bind(el.ownerDocument);
                }
                var disconnectedCallback;
                if (viewModel && viewModel.connectedCallback) {
                    if (componentTagData.mounted === true) {
                        disconnectedCallback = viewModel.connectedCallback(el);
                    } else {
                        domEvents.addEventListener.call(el, 'inserted', function connectedHandler() {
                            domEvents.removeEventListener.call(el, 'inserted', connectedHandler);
                            disconnectedCallback = viewModel.connectedCallback(el);
                        });
                    }
                }
                var nodeList = nodeLists.register([], function () {
                    domDispatch.call(el, 'beforeremove', [], false);
                    if (teardownBindings) {
                        teardownBindings();
                    }
                    if (disconnectedCallback) {
                        disconnectedCallback(el);
                    }
                }, componentTagData.parentNodeList || true, false);
                nodeList.expression = '<' + this.tag + '>';
                teardownFunctions.push(function () {
                    nodeLists.unregister(nodeList);
                });
                frag = betweenTagsRenderer(betweenTagsTagData.scope, betweenTagsTagData.options, nodeList);
                domMutate.appendChild.call(el, frag);
                nodeLists.update(nodeList, getChildNodes(el));
            }
        });
        module.exports = namespace.Component = Component;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-connect@2.0.0-pre.14#connect*/
define('can-connect/connect', [
    'require',
    'exports',
    'module',
    'can-util/js/assign/assign'
], function (require, exports, module) {
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
        });
        behaviors.sort(function (b1, b2) {
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
/*can-connect@2.0.0-pre.14#base/base*/
define('can-connect/base/base', [
    'require',
    'exports',
    'module',
    'can-connect/connect'
], function (require, exports, module) {
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
/*can-connect@2.0.0-pre.14#can-connect*/
define('can-connect', [
    'require',
    'exports',
    'module',
    'can-connect/connect',
    'can-connect/base/base',
    'can-namespace'
], function (require, exports, module) {
    var connect = require('can-connect/connect');
    var base = require('can-connect/base/base');
    var ns = require('can-namespace');
    connect.base = base;
    module.exports = ns.connect = connect;
});
/*can-connect@2.0.0-pre.14#helpers/get-items*/
define('can-connect/helpers/get-items', function (require, exports, module) {
    module.exports = function (data) {
        if (Array.isArray(data)) {
            return data;
        } else {
            return data.data;
        }
    };
});
/*can-set@1.3.3#src/helpers*/
define('can-set/src/helpers', [
    'require',
    'exports',
    'module',
    'can-util/js/assign/assign',
    'can-util/js/each/each',
    'can-util/js/last/last'
], function (require, exports, module) {
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
/*can-set@1.3.3#src/clause*/
define('can-set/src/clause', [
    'require',
    'exports',
    'module',
    'can-util/js/assign/assign',
    'can-util/js/each/each'
], function (require, exports, module) {
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
/*can-set@1.3.3#src/compare*/
define('can-set/src/compare', [
    'require',
    'exports',
    'module',
    'can-set/src/helpers',
    'can-util/js/assign/assign',
    'can-util/js/each/each',
    'can-util/js/make-array/make-array'
], function (require, exports, module) {
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
    var addResultsToNewObject = function (fn, name) {
        return function (a, b, aParent, bParent, prop, compares, options) {
            var existingResult = options.result;
            options.result = {};
            var res = fn.apply(this, arguments);
            if (res) {
                if (prop !== undefined) {
                    existingResult[prop] = options.result;
                } else {
                    assign(existingResult, options.result);
                }
            }
            options.result = existingResult;
            return res;
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
            if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
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
                addResultsToNewObject(compareHelpers.unionObject, 'unionObject')
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
                addResultsToNewObject(compareHelpers.intersectionObject)
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
/*can-set@1.3.3#src/get*/
define('can-set/src/get', [
    'require',
    'exports',
    'module',
    'can-set/src/compare',
    'can-set/src/helpers',
    'can-util/js/each/each'
], function (require, exports, module) {
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
/*can-set@1.3.3#src/set-core*/
define('can-set/src/set-core', [
    'require',
    'exports',
    'module',
    'can-set/src/helpers',
    'can-set/src/clause',
    'can-set/src/compare',
    'can-set/src/get',
    'can-util/js/assign/assign',
    'can-util/js/each/each',
    'can-util/js/make-array/make-array',
    'can-util/js/is-empty-object/is-empty-object'
], function (require, exports, module) {
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
                        if (clauseName !== 'id') {
                            delete setClone[prop];
                        }
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
                result = this.evaluateOperator(compare.subset, props, set, { isProperties: true }, undefined, {
                    shouldEvaluatePaginate: function () {
                        return false;
                    }
                });
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
        },
        id: function (props) {
            var keys = Object.keys(this.clauses.id);
            if (keys.length === 1) {
                return props[keys[0]];
            } else {
                var id = {};
                keys.forEach(function (key) {
                    id[key] = props[key];
                });
                return JSON.stringify(id);
            }
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
/*can-set@1.3.3#src/props*/
define('can-set/src/props', [
    'require',
    'exports',
    'module',
    'can-set/src/helpers',
    'can-set/src/clause',
    'can-util/js/each/each'
], function (require, exports, module) {
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
    var nestedLookup = function (obj, propNameArray) {
        if (obj === undefined) {
            return undefined;
        }
        if (propNameArray.length === 1) {
            return obj[propNameArray[0]];
        } else {
            return nestedLookup(obj[propNameArray[0]], propNameArray.slice(1));
        }
    };
    props.dotNotation = function (dotProperty) {
        var compares = new clause.Where({});
        compares[dotProperty] = function (aVal, bVal, a, b, propertyName) {
            if (aVal === undefined) {
                aVal = nestedLookup(a, propertyName.split('.'));
            }
            if (bVal === undefined) {
                bVal = nestedLookup(b, propertyName.split('.'));
            }
            return aVal === bVal;
        };
        return compares;
    };
    module.exports = props;
});
/*can-set@1.3.3#src/set*/
define('can-set', [
    'require',
    'exports',
    'module',
    'can-set/src/set-core',
    'can-namespace',
    'can-set/src/props',
    'can-set/src/clause',
    'can-set/src/helpers'
], function (require, exports, module) {
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
/*can-validate-interface@1.0.0-pre.2#index*/
define('can-validate-interface', function (require, exports, module) {
    'use strict';
    function flatten(arrays) {
        return arrays.reduce(function (ret, val) {
            return ret.concat(val);
        }, []);
    }
    function makeInterfaceValidator(interfacePropArrays) {
        var props = flatten(interfacePropArrays);
        return function (base) {
            var missingProps = props.reduce(function (missing, prop) {
                return prop in base ? missing : missing.concat(prop);
            }, []);
            return missingProps.length ? {
                message: 'missing expected properties',
                related: missingProps
            } : undefined;
        };
    }
    module.exports = makeInterfaceValidator;
});
/*can-connect@2.0.0-pre.14#helpers/validate*/
define('can-connect/helpers/validate', [
    'require',
    'exports',
    'module',
    'can-validate-interface'
], function (require, exports, module) {
    var makeInterfaceValidator = require('can-validate-interface');
    module.exports = function (extendingBehavior, interfaces) {
        var validatedBehaviour = validateArgumentInterface(extendingBehavior, 0, interfaces, function (errors, baseBehavior) {
            throw new BehaviorInterfaceError(baseBehavior, extendingBehavior, errors);
        });
        Object.keys(extendingBehavior).forEach(function (k) {
            validatedBehaviour[k] = extendingBehavior[k];
        });
        validatedBehaviour.__interfaces = interfaces;
        return validatedBehaviour;
    };
    function validateArgumentInterface(func, argIndex, interfaces, errorHandler) {
        return function () {
            var errors = makeInterfaceValidator(interfaces)(arguments[argIndex]);
            if (errors && errorHandler) {
                errorHandler(errors, arguments[argIndex]);
            }
            return func.apply(this, arguments);
        };
    }
    function BehaviorInterfaceError(baseBehavior, extendingBehavior, missingProps) {
        var extendingName = extendingBehavior.behaviorName || 'anonymous behavior', baseName = baseBehavior.__behaviorName || 'anonymous behavior', message = 'can-connect: Extending behavior "' + extendingName + '" found base behavior "' + baseName + '" was missing required properties: ' + JSON.stringify(missingProps.related), instance = new Error(message);
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        }
        return instance;
    }
    BehaviorInterfaceError.prototype = Object.create(Error.prototype, { constructor: { value: Error } });
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(BehaviorInterfaceError, Error);
    } else {
        BehaviorInterfaceError.__proto__ = Error;
    }
});
/*can-connect@2.0.0-pre.14#cache-requests/cache-requests*/
define('can-connect/cache-requests/cache-requests', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-connect/helpers/get-items',
    'can-set',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    var connect = require('can-connect');
    var getItems = require('can-connect/helpers/get-items');
    var canSet = require('can-set');
    var forEach = [].forEach;
    var cacheRequestsBehaviour = connect.behavior('cache-requests', function (baseConnection) {
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
    module.exports = cacheRequestsBehaviour;
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(cacheRequestsBehaviour, [
        'getListData',
        'cacheConnection'
    ]);
});
/*can-connect@2.0.0-pre.14#helpers/weak-reference-map*/
define('can-connect/helpers/weak-reference-map', [
    'require',
    'exports',
    'module',
    'can-util/js/assign/assign'
], function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var WeakReferenceMap = function () {
        this.set = {};
    };
    assign(WeakReferenceMap.prototype, {
        has: function (key) {
            return !!this.set[key];
        },
        addReference: function (key, item, referenceCount) {
            if (typeof key === 'undefined') {
                throw new Error('can-connect: You must provide a key to store a value in a WeakReferenceMap');
            }
            var data = this.set[key];
            if (!data) {
                data = this.set[key] = {
                    item: item,
                    referenceCount: 0,
                    key: key
                };
            }
            data.referenceCount += referenceCount || 1;
        },
        referenceCount: function (key) {
            var data = this.set[key];
            if (data) {
                return data.referenceCount;
            }
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
/*can-connect@2.0.0-pre.14#helpers/overwrite*/
define('can-connect/helpers/overwrite', function (require, exports, module) {
    module.exports = function (d, s, id) {
        for (var prop in d) {
            if (d.hasOwnProperty(prop) && !(prop.substr(0, 2) === '__') && prop !== id && !(prop in s)) {
                delete d[prop];
            }
        }
        for (prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
});
/*can-connect@2.0.0-pre.14#helpers/id-merge*/
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
/*can-connect@2.0.0-pre.14#constructor/constructor*/
define('can-connect/constructor/constructor', [
    'require',
    'exports',
    'module',
    'can-util/js/make-array/make-array',
    'can-util/js/assign/assign',
    'can-connect',
    'can-connect/helpers/weak-reference-map',
    'can-connect/helpers/overwrite',
    'can-connect/helpers/id-merge'
], function (require, exports, module) {
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
                if (Array.isArray(listData)) {
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
/*can-connect@2.0.0-pre.14#helpers/sorted-set-json*/
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
/*can-connect@2.0.0-pre.14#constructor/callbacks-once/callbacks-once*/
define('can-connect/constructor/callbacks-once/callbacks-once', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-connect/helpers/sorted-set-json',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    var connect = require('can-connect');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var forEach = [].forEach;
    var callbacks = [
        'createdInstance',
        'updatedInstance',
        'destroyedInstance'
    ];
    var callbacksOnceBehavior = connect.behavior('constructor/callbacks-once', function (baseConnection) {
        var behavior = {};
        forEach.call(callbacks, function (name) {
            behavior[name] = function (instance, data) {
                var lastSerialized = this.getInstanceMetaData(instance, 'last-data-' + name);
                var serialize = sortedSetJSON(data);
                if (lastSerialized !== serialize) {
                    var result = baseConnection[name].apply(this, arguments);
                    this.addInstanceMetaData(instance, 'last-data-' + name, serialize);
                    return result;
                }
            };
        });
        return behavior;
    });
    module.exports = callbacksOnceBehavior;
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(callbacksOnceBehavior, callbacks);
});
/*can-connect@2.0.0-pre.14#helpers/weak-reference-set*/
define('can-connect/helpers/weak-reference-set', [
    'require',
    'exports',
    'module',
    'can-util/js/assign/assign'
], function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var WeakReferenceSet = function () {
        this.set = [];
    };
    assign(WeakReferenceSet.prototype, {
        has: function (item) {
            return this._getIndex(item) !== -1;
        },
        addReference: function (item, referenceCount) {
            var index = this._getIndex(item);
            var data = this.set[index];
            if (!data) {
                data = {
                    item: item,
                    referenceCount: 0
                };
                this.set.push(data);
            }
            data.referenceCount += referenceCount || 1;
        },
        deleteReference: function (item) {
            var index = this._getIndex(item);
            var data = this.set[index];
            if (data) {
                data.referenceCount--;
                if (data.referenceCount === 0) {
                    this.set.splice(index, 1);
                }
            }
        },
        delete: function (item) {
            var index = this._getIndex(item);
            if (index !== -1) {
                this.set.splice(index, 1);
            }
        },
        get: function (item) {
            var data = this.set[this._getIndex(item)];
            if (data) {
                return data.item;
            }
        },
        referenceCount: function (item) {
            var data = this.set[this._getIndex(item)];
            if (data) {
                return data.referenceCount;
            }
        },
        _getIndex: function (item) {
            var index;
            this.set.every(function (data, i) {
                if (data.item === item) {
                    index = i;
                    return false;
                }
            });
            return index !== undefined ? index : -1;
        },
        forEach: function (cb) {
            return this.set.forEach(cb);
        }
    });
    module.exports = WeakReferenceSet;
});
/*can-event-queue@0.15.2#map/legacy/legacy*/
define('can-event-queue/map/legacy/legacy', [
    'require',
    'exports',
    'module',
    'can-event-queue/map/map'
], function (require, exports, module) {
    console.warn('Import can-event-queue/map/map instead of can-event-queue/map/legacy/legacy');
    module.exports = require('can-event-queue/map/map');
});
/*can-connect@2.0.0-pre.14#constructor/store/store*/
define('can-connect/constructor/store/store', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-connect/helpers/weak-reference-map',
    'can-connect/helpers/weak-reference-set',
    'can-connect/helpers/sorted-set-json',
    'can-event-queue/map/legacy/legacy',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    var connect = require('can-connect');
    var WeakReferenceMap = require('can-connect/helpers/weak-reference-map');
    var WeakReferenceSet = require('can-connect/helpers/weak-reference-set');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var eventQueue = require('can-event-queue/map/legacy/legacy');
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
    eventQueue(requests);
    var constructorStore = connect.behavior('constructor/store', function (baseConnection) {
        var behavior = {
            instanceStore: new WeakReferenceMap(),
            newInstanceStore: new WeakReferenceSet(),
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
                var ID = id || this.id(instance);
                if (ID === undefined) {
                    this.newInstanceStore.addReference(instance);
                } else {
                    this.instanceStore.addReference(ID, instance);
                }
            },
            createdInstance: function (instance, props) {
                baseConnection.createdInstance.apply(this, arguments);
                this.moveCreatedInstanceToInstanceStore(instance);
            },
            moveCreatedInstanceToInstanceStore: function (instance) {
                var ID = this.id(instance);
                if (this.newInstanceStore.has(instance) && ID !== undefined) {
                    var referenceCount = this.newInstanceStore.referenceCount(instance);
                    this.newInstanceStore.delete(instance);
                    this.instanceStore.addReference(ID, instance, referenceCount);
                }
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
                var ID = this.id(instance);
                if (ID === undefined) {
                    this.newInstanceStore.deleteReference(instance);
                } else {
                    this.instanceStore.deleteReference(this.id(instance), instance);
                }
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
            getList: function (listSet) {
                var self = this;
                requests.increment(this);
                var promise = baseConnection.getList.call(this, listSet);
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
                this.addInstanceReference(instance);
                requests.increment(this);
                var promise = baseConnection.destroy.call(this, instance);
                promise.then(function (instance) {
                    self._finishedRequest();
                    self.deleteInstanceReference(instance);
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
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(constructorStore, [
        'hydrateInstance',
        'hydrateList',
        'getList',
        'get',
        'save',
        'destroy'
    ]);
});
/*can-connect@2.0.0-pre.14#data/callbacks/callbacks*/
define('can-connect/data/callbacks/callbacks', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-util/js/each/each',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    var connect = require('can-connect');
    var each = require('can-util/js/each/each');
    var pairs = {
        getListData: 'gotListData',
        createData: 'createdData',
        updateData: 'updatedData',
        destroyData: 'destroyedData'
    };
    var dataCallbackBehavior = connect.behavior('data/callbacks', function (baseConnection) {
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
    module.exports = dataCallbackBehavior;
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(dataCallbackBehavior, [
        'getListData',
        'createData',
        'updateData',
        'destroyData'
    ]);
});
/*can-connect@2.0.0-pre.14#data/callbacks-cache/callbacks-cache*/
define('can-connect/data/callbacks-cache/callbacks-cache', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-util/js/assign/assign',
    'can-util/js/each/each',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    var connect = require('can-connect');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var pairs = {
        createdData: 'createData',
        updatedData: 'updateData',
        destroyedData: 'destroyData'
    };
    var callbackCache = connect.behavior('data/callbacks-cache', function (baseConnection) {
        var behavior = {};
        each(pairs, function (crudMethod, dataCallback) {
            behavior[dataCallback] = function (data, params, cid) {
                this.cacheConnection[crudMethod](assign(assign({}, params), data));
                if (baseConnection[dataCallback]) {
                    return baseConnection[dataCallback].call(this, data, params, cid);
                } else {
                    return data;
                }
            };
        });
        return behavior;
    });
    module.exports = callbackCache;
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(callbackCache, []);
});
/*can-connect@2.0.0-pre.14#helpers/deferred*/
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
/*can-connect@2.0.0-pre.14#data/combine-requests/combine-requests*/
define('can-connect/data/combine-requests/combine-requests', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-set',
    'can-connect/helpers/get-items',
    'can-util/js/deep-assign/deep-assign',
    'can-connect/helpers/deferred',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    var connect = require('can-connect');
    var canSet = require('can-set');
    var getItems = require('can-connect/helpers/get-items');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var makeDeferred = require('can-connect/helpers/deferred');
    var forEach = [].forEach;
    var combineRequests = connect.behavior('data/combine-requests', function (baseConnection) {
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
                                            pending.deferred.resolve({ data: canSet.getSubset(pending.set, combined.set, getItems(data), self.algebra) });
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
    module.exports = combineRequests;
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(combineRequests, ['getListData']);
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
/*can-connect@2.0.0-pre.14#helpers/set-add*/
define('can-connect/helpers/set-add', [
    'require',
    'exports',
    'module',
    'can-set'
], function (require, exports, module) {
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
/*can-connect@2.0.0-pre.14#helpers/get-index-by-id*/
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
/*can-connect@2.0.0-pre.14#data/localstorage-cache/localstorage-cache*/
define('can-connect/data/localstorage-cache/localstorage-cache', [
    'require',
    'exports',
    'module',
    'can-connect/helpers/get-items',
    'can-connect',
    'can-connect/helpers/sorted-set-json',
    'can-set',
    'can-connect/helpers/set-add',
    'can-connect/helpers/get-index-by-id',
    'can-util/js/assign/assign',
    'can-connect/helpers/overwrite'
], function (require, exports, module) {
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
/*can-connect@2.0.0-pre.14#helpers/clone-data*/
define('can-connect/helpers/clone-data', [
    'require',
    'exports',
    'module',
    'can-util/js/deep-assign/deep-assign'
], function (require, exports, module) {
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    module.exports = function (data) {
        return Array.isArray(data) ? data.slice(0) : deepAssign({}, data);
    };
});
/*can-connect@2.0.0-pre.14#data/memory-cache/memory-cache*/
define('can-connect/data/memory-cache/memory-cache', [
    'require',
    'exports',
    'module',
    'can-connect/helpers/get-items',
    'can-connect',
    'can-connect/helpers/sorted-set-json',
    'can-set',
    'can-connect/helpers/overwrite',
    'can-connect/helpers/set-add',
    'can-connect/helpers/get-index-by-id',
    'can-util/js/assign/assign',
    'can-connect/helpers/clone-data'
], function (require, exports, module) {
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
/*can-connect@2.0.0-pre.14#data/parse/parse*/
define('can-connect/data/parse/parse', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-util/js/each/each',
    'can-util/js/get/get'
], function (require, exports, module) {
    var connect = require('can-connect');
    var each = require('can-util/js/each/each');
    var getObject = require('can-util/js/get/get');
    module.exports = connect.behavior('data/parse', function (baseConnection) {
        var behavior = {
            parseListData: function (responseData) {
                if (baseConnection.parseListData) {
                    responseData = baseConnection.parseListData.apply(this, arguments);
                }
                var result;
                if (Array.isArray(responseData)) {
                    result = { data: responseData };
                } else {
                    var prop = this.parseListProp || 'data';
                    responseData.data = getObject(responseData, prop);
                    result = responseData;
                    if (prop !== 'data') {
                        delete responseData[prop];
                    }
                    if (!Array.isArray(result.data)) {
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
/*can-param@1.0.2#can-param*/
define('can-param', [
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    function buildParam(prefix, obj, add) {
        if (Array.isArray(obj)) {
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
    module.exports = namespace.param = function param(object) {
        var pairs = [], add = function (key, value) {
                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            };
        for (var name in object) {
            buildParam(name, object[name], add);
        }
        return pairs.join('&').replace(/%20/g, '+');
    };
});
/*can-ajax@1.1.4#can-ajax*/
define('can-ajax', [
    'require',
    'exports',
    'module',
    'can-globals/global/global',
    'can-reflect',
    'can-namespace',
    'can-parse-uri',
    'can-param'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var Global = require('can-globals/global/global');
        var canReflect = require('can-reflect');
        var namespace = require('can-namespace');
        var parseURI = require('can-parse-uri');
        var param = require('can-param');
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
        var globalSettings = {};
        var makeXhr = function () {
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
        var contentTypes = {
            json: 'application/json',
            form: 'application/x-www-form-urlencoded'
        };
        var _xhrResp = function (xhr, options) {
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
                return xhr.responseText && JSON.parse(xhr.responseText);
            default:
                return xhr.responseText;
            }
        };
        function ajax(o) {
            var xhr = makeXhr(), timer, n = 0;
            var deferred = {};
            var promise = new Promise(function (resolve, reject) {
                deferred.resolve = resolve;
                deferred.reject = reject;
            });
            var requestUrl;
            promise.abort = function () {
                xhr.abort();
            };
            o = [
                {
                    userAgent: 'XMLHttpRequest',
                    lang: 'en',
                    type: 'GET',
                    data: null,
                    dataType: 'json'
                },
                globalSettings,
                o
            ].reduce(function (a, b, i) {
                return canReflect.assignDeep(a, b);
            });
            if (!o.contentType) {
                o.contentType = o.type.toUpperCase() === 'GET' ? contentTypes.form : contentTypes.json;
            }
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
                                o.success(_xhrResp(xhr, o));
                            }
                        } else if (o.error) {
                            o.error(xhr, xhr.status, xhr.statusText);
                        }
                        if (o.complete) {
                            o.complete(xhr, xhr.statusText);
                        }
                        if (xhr.status >= 200 && xhr.status < 300) {
                            deferred.resolve(_xhrResp(xhr, o));
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
            var isJsonContentType = o.contentType === contentTypes.json;
            var isPost = type === 'POST' || type === 'PUT';
            if (!isPost && o.data) {
                url += '?' + (isJsonContentType ? JSON.stringify(o.data) : param(o.data));
            }
            xhr.open(type, url);
            var isSimpleCors = o.crossDomain && [
                'GET',
                'POST',
                'HEAD'
            ].indexOf(type) !== -1;
            if (isPost) {
                data = isJsonContentType && !isSimpleCors ? typeof o.data === 'object' ? JSON.stringify(o.data) : o.data : param(o.data);
                var setContentType = isJsonContentType && !isSimpleCors ? 'application/json' : 'application/x-www-form-urlencoded';
                xhr.setRequestHeader('Content-Type', setContentType);
            } else {
                xhr.setRequestHeader('Content-Type', o.contentType);
            }
            if (!isSimpleCors) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
            if (o.xhrFields) {
                for (var f in o.xhrFields) {
                    xhr[f] = o.xhrFields[f];
                }
            }
            xhr.send(data);
            return promise;
        }
        module.exports = namespace.ajax = ajax;
        module.exports.ajaxSetup = function (o) {
            globalSettings = o || {};
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-connect@2.0.0-pre.14#helpers/get-id-props*/
define('can-connect/helpers/get-id-props', function (require, exports, module) {
    module.exports = function (connection) {
        var ids = [], algebra = connection.algebra;
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
/*can-make-rest@0.1.2#can-make-rest*/
define('can-make-rest', [
    'require',
    'exports',
    'module',
    'can-util/js/each/each'
], function (require, exports, module) {
    var each = require('can-util/js/each/each');
    var methodMapping = {
        item: {
            'GET': 'getData',
            'PUT': 'updateData',
            'DELETE': 'destroyData'
        },
        list: {
            'GET': 'getListData',
            'POST': 'createData'
        }
    };
    function inferIdProp(url) {
        var wrappedInBraces = /\{(.*)\}/;
        var matches = url.match(wrappedInBraces);
        var isUniqueMatch = matches && matches.length === 2;
        if (isUniqueMatch) {
            return matches[1];
        }
    }
    function getItemAndListUrls(url, idProp) {
        idProp = idProp || inferIdProp(url) || 'id';
        var itemRegex = new RegExp('\\/\\{' + idProp + '\\}.*');
        var rootIsItemUrl = itemRegex.test(url);
        var listUrl = rootIsItemUrl ? url.replace(itemRegex, '') : url;
        var itemUrl = rootIsItemUrl ? url : url.trim() + '/{' + idProp + '}';
        return {
            item: itemUrl,
            list: listUrl
        };
    }
    module.exports = function (url, idProp) {
        var data = {};
        each(getItemAndListUrls(url, idProp), function (url, type) {
            each(methodMapping[type], function (interfaceMethod, method) {
                data[interfaceMethod] = {
                    method: method,
                    url: url
                };
            });
        });
        return data;
    };
});
/*can-util@3.10.18#js/is-promise/is-promise*/
define('can-util/js/is-promise/is-promise', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    'use strict';
    var canReflect = require('can-reflect');
    module.exports = function (obj) {
        return canReflect.isPromise(obj);
    };
});
/*can-util@3.10.18#js/make-promise/make-promise*/
define('can-util/js/make-promise/make-promise', [
    'require',
    'exports',
    'module',
    'can-util/js/is-promise-like/is-promise-like',
    'can-util/js/is-promise/is-promise'
], function (require, exports, module) {
    'use strict';
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
/*can-connect@2.0.0-pre.14#data/url/url*/
define('can-connect/data/url/url', [
    'require',
    'exports',
    'module',
    'can-util/js/assign/assign',
    'can-util/js/each/each',
    'can-ajax',
    'can-util/js/string/string',
    'can-connect/helpers/get-id-props',
    'can-util/js/dev/dev',
    'can-connect',
    'can-make-rest',
    'can-util/js/make-promise/make-promise',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var ajax = require('can-ajax');
    var string = require('can-util/js/string/string');
    var getIdProps = require('can-connect/helpers/get-id-props');
    var dev = require('can-util/js/dev/dev');
    var connect = require('can-connect');
    var makeRest = require('can-make-rest');
    var defaultRest = makeRest('/resource/{id}');
    var makePromise = require('can-util/js/make-promise/make-promise');
    var urlBehavior = connect.behavior('data/url', function (baseConnection) {
        var behavior = {};
        each(defaultRest, function (defaultData, dataInterfaceName) {
            behavior[dataInterfaceName] = function (params) {
                var meta = methodMetaData[dataInterfaceName];
                if (typeof this.url === 'object') {
                    if (typeof this.url[dataInterfaceName] === 'function') {
                        return makePromise(this.url[dataInterfaceName](params));
                    } else if (this.url[dataInterfaceName]) {
                        var promise = makeAjax(this.url[dataInterfaceName], params, defaultData.method, this.ajax || ajax, findContentType(this.url, defaultData.method), meta);
                        return makePromise(promise);
                    }
                }
                var resource = typeof this.url === 'string' ? this.url : this.url.resource;
                if (resource) {
                    var idProps = getIdProps(this);
                    var resourceWithoutTrailingSlashes = resource.replace(/\/+$/, '');
                    var result = makeRest(resourceWithoutTrailingSlashes, idProps[0])[dataInterfaceName];
                    return makePromise(makeAjax(result.url, params, result.method, this.ajax || ajax, findContentType(this.url, result.method), meta));
                }
                return baseConnection[name].call(this, params);
            };
        });
        return behavior;
    });
    var methodMetaData = {
        getListData: {},
        getData: {},
        createData: {},
        updateData: {},
        destroyData: { includeData: false }
    };
    var findContentType = function (url, method) {
        if (typeof url === 'object' && url.contentType) {
            var acceptableType = url.contentType === 'application/x-www-form-urlencoded' || url.contentType === 'application/json';
            if (acceptableType) {
                return url.contentType;
            } else {
                dev.warn('Unacceptable contentType on can-connect request. ' + 'Use \'application/json\' or \'application/x-www-form-urlencoded\'');
            }
        }
        return method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json';
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
        params.data = typeof data === 'object' && !Array.isArray(data) ? assign(params.data || {}, data) : data;
        params.url = string.sub(params.url, params.data, true);
        params.contentType = contentType;
        if (reqOptions.includeData === false) {
            delete params.data;
        }
        return ajax(assign({
            type: type || 'post',
            dataType: 'json'
        }, params));
    };
    module.exports = urlBehavior;
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(urlBehavior, ['url']);
});
/*can-util@3.10.18#js/log/log*/
define('can-util/js/log/log', [
    'require',
    'exports',
    'module',
    'can-log'
], function (require, exports, module) {
    'use strict';
    module.exports = require('can-log');
});
/*can-connect@2.0.0-pre.14#fall-through-cache/fall-through-cache*/
define('can-connect/fall-through-cache/fall-through-cache', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-connect/helpers/sorted-set-json',
    'can-util/js/log/log',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    var connect = require('can-connect');
    var sortedSetJSON = require('can-connect/helpers/sorted-set-json');
    var canLog = require('can-util/js/log/log');
    var fallThroughCache = connect.behavior('fall-through-cache', function (baseConnection) {
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
                                canLog.log('REJECTED', e);
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
                                canLog.log('REJECTED', e);
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
    module.exports = fallThroughCache;
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(fallThroughCache, [
        'hydrateList',
        'hydrateInstance',
        'getListData',
        'getData'
    ]);
});
/*can-connect@2.0.0-pre.14#real-time/real-time*/
define('can-connect/real-time/real-time', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-set',
    'can-connect/helpers/set-add',
    'can-connect/helpers/get-index-by-id',
    'can-util/js/dev/dev'
], function (require, exports, module) {
    var connect = require('can-connect');
    var canSet = require('can-set');
    var setAdd = require('can-connect/helpers/set-add');
    var indexOf = require('can-connect/helpers/get-index-by-id');
    var canDev = require('can-util/js/dev/dev');
    module.exports = connect.behavior('real-time', function (baseConnection) {
        var createPromise = Promise.resolve();
        return {
            createData: function () {
                var promise = baseConnection.createData.apply(this, arguments);
                var cleanPromise = promise.catch(function () {
                    return '';
                });
                createPromise = Promise.all([
                    createPromise,
                    cleanPromise
                ]);
                return promise;
            },
            createInstance: function (props) {
                var self = this;
                return new Promise(function (resolve, reject) {
                    createPromise.then(function () {
                        setTimeout(function () {
                            var id = self.id(props);
                            var instance = self.instanceStore.get(id);
                            var serialized;
                            if (instance) {
                                resolve(self.updateInstance(props));
                            } else {
                                instance = self.hydrateInstance(props);
                                serialized = self.serializeInstance(instance);
                                self.addInstanceReference(instance);
                                Promise.resolve(self.createdData(props, serialized)).then(function () {
                                    self.deleteInstanceReference(instance);
                                    resolve(instance);
                                });
                            }
                        }, 1);
                    });
                });
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
                            var msg = 'One or more items were retrieved which do not match the \'Set\' parameters used to load them. ' + 'Read the docs for more information: https://canjs.com/doc/can-set.html#SolvingCommonIssues' + '\n\nBelow are the \'Set\' parameters:' + '\n' + canDev.stringify(set) + '\n\nAnd below is an item which does not match those parameters:' + '\n' + canDev.stringify(item);
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
/*can-connect@2.0.0-pre.14#can/map/map*/
define('can-connect/can/map/map', [
    'require',
    'exports',
    'module',
    'can-util/js/each/each',
    'can-connect',
    'can-queues',
    'can-event-queue/map/legacy/legacy',
    'can-observation-recorder',
    'can-util/js/is-plain-object/is-plain-object',
    'can-types',
    'can-util/js/each/each',
    'can-util/js/dev/dev',
    'can-reflect',
    'can-symbol',
    'can-connect/helpers/validate'
], function (require, exports, module) {
    'use strict';
    var each = require('can-util/js/each/each');
    var connect = require('can-connect');
    var queues = require('can-queues');
    var eventQueue = require('can-event-queue/map/legacy/legacy');
    var ObservationRecorder = require('can-observation-recorder');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var types = require('can-types');
    var each = require('can-util/js/each/each');
    var dev = require('can-util/js/dev/dev');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var canMapBehavior = connect.behavior('can/map', function (baseConnection) {
        var behavior = {
            init: function () {
                if (!this.Map) {
                    throw new Error('can-connect/can/map/map must be configured with a Map type');
                }
                this.List = this.List || this.Map.List;
                if (!this.List) {
                    throw new Error('can-connect/can/map/map must be configured with a List type');
                }
                overwrite(this, this.Map, mapOverwrites);
                overwrite(this, this.List, listOverwrites);
                var connection = this;
                if (this.Map[canSymbol.for('can.onInstanceBoundChange')]) {
                    this.Map[canSymbol.for('can.onInstanceBoundChange')](function canConnectMap_onInstanceBoundChange(instance, isBound) {
                        var method = isBound ? 'addInstanceReference' : 'deleteInstanceReference';
                        if (connection[method]) {
                            connection[method](instance);
                        }
                    });
                } else {
                    console.warn('can-connect/can/map is unable to listen to onInstanceBoundChange on the Map type');
                }
                if (this.List[canSymbol.for('can.onInstanceBoundChange')]) {
                    this.List[canSymbol.for('can.onInstanceBoundChange')](function (list, isBound) {
                        var method = isBound ? 'addListReference' : 'deleteListReference';
                        if (connection[method]) {
                            connection[method](list);
                        }
                    });
                } else {
                    console.warn('can-connect/can/map is unable to listen to onInstanceBoundChange on the List type');
                }
                if (this.Map[canSymbol.for('can.onInstancePatches')]) {
                    this.Map[canSymbol.for('can.onInstancePatches')](function canConnectMap_onInstancePatches(instance, patches) {
                        patches.forEach(function (patch) {
                            if ((patch.type === 'add' || patch.type === 'set') && patch.key === connection.idProp && instance[canSymbol.for('can.isBound')]()) {
                                connection.addInstanceReference(instance);
                            }
                        });
                    });
                } else {
                    console.warn('can-connect/can/map is unable to listen to onInstancePatches on the Map type');
                }
                baseConnection.init.apply(this, arguments);
            },
            id: function (instance) {
                if (!isPlainObject(instance)) {
                    var ids = [], algebra = this.algebra;
                    if (algebra && algebra.clauses && algebra.clauses.id) {
                        for (var prop in algebra.clauses.id) {
                            ids.push(canReflect.getKeyValue(instance, prop));
                        }
                    }
                    if (this.idProp && !ids.length) {
                        ids.push(canReflect.getKeyValue(instance, this.idProp));
                    }
                    if (!ids.length) {
                        ids.push(canReflect.getKeyValue(instance, 'id'));
                    }
                    return ids.length > 1 ? ids.join('@|@') : ids[0];
                } else {
                    return baseConnection.id(instance);
                }
            },
            serializeInstance: function (instance) {
                return canReflect.serialize(instance);
            },
            serializeList: function (list) {
                return canReflect.serialize(list);
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
                        canReflect.setKeyValue(list, prop, val);
                    }
                });
                list.__listSet = set;
                return list;
            },
            updatedList: function (list, listData, set) {
                queues.batch.start();
                queues.mutateQueue.enqueue(baseConnection.updatedList, this, arguments, {
                    reasonLog: [
                        'set',
                        set,
                        'list',
                        list,
                        'updated with',
                        listData
                    ]
                });
                queues.batch.stop();
            },
            save: function (instance) {
                canReflect.setKeyValue(instance, '_saving', true);
                var done = function () {
                    canReflect.setKeyValue(instance, '_saving', false);
                };
                var base = baseConnection.save.apply(this, arguments);
                base.then(done, done);
                return base;
            },
            destroy: function (instance) {
                canReflect.setKeyValue(instance, '_destroying', true);
                var done = function () {
                    canReflect.setKeyValue(instance, '_destroying', false);
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
                    if (this.constructor.removeAttr) {
                        canReflect.updateDeep(instance, props);
                    } else {
                        canReflect.assignDeep(instance, props);
                    }
                }
                if (funcName === 'created' && this.moveCreatedInstanceToInstanceStore) {
                    this.moveCreatedInstanceToInstanceStore(instance);
                }
                canMapBehavior.callbackInstanceEvents(funcName, instance);
            };
        });
        return behavior;
    });
    canMapBehavior.callbackInstanceEvents = function (funcName, instance) {
        var constructor = instance.constructor;
        eventQueue.dispatch.call(instance, {
            type: funcName,
            target: instance
        });
        if (this.id) {
            dev.log('can-connect/can/map/map.js - ' + (constructor.shortName || this.name) + ' ' + this.id(instance) + ' ' + funcName);
        }
        eventQueue.dispatch.call(constructor, funcName, [instance]);
    };
    var mapOverwrites = {
        static: {
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
        },
        prototype: {
            isNew: function (base, connection) {
                return function () {
                    return connection.isNew(this);
                };
            },
            isSaving: function (base, connection) {
                return function () {
                    return !!canReflect.getKeyValue(this, '_saving');
                };
            },
            isDestroying: function (base, connection) {
                return function () {
                    return !!canReflect.getKeyValue(this, '_destroying');
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
        },
        properties: {
            _saving: {
                enumerable: false,
                value: false,
                configurable: true,
                writable: true
            },
            _destroying: {
                enumerable: false,
                value: false,
                configurable: true,
                writable: true
            }
        }
    };
    var listOverwrites = {
        static: {
            _bubbleRule: function (base, connection) {
                return function (eventName, list) {
                    var bubbleRules = base(eventName, list);
                    bubbleRules.push('destroyed');
                    return bubbleRules;
                };
            }
        },
        prototype: {
            setup: function (base, connection) {
                return function (params) {
                    if (isPlainObject(params) && !Array.isArray(params)) {
                        this.__listSet = params;
                        base.apply(this);
                        this.replace(canReflect.isPromise(params) ? params : connection.getList(params));
                    } else {
                        base.apply(this, arguments);
                    }
                };
            }
        },
        properties: {}
    };
    var overwrite = function (connection, Constructor, overwrites) {
        var prop;
        for (prop in overwrites.properties) {
            canReflect.defineInstanceKey(Constructor, prop, overwrites.properties[prop]);
        }
        for (prop in overwrites.prototype) {
            Constructor.prototype[prop] = overwrites.prototype[prop](Constructor.prototype[prop], connection);
        }
        if (overwrites.static) {
            for (prop in overwrites.static) {
                Constructor[prop] = overwrites.static[prop](Constructor[prop], connection);
            }
        }
    };
    module.exports = canMapBehavior;
    var validate = require('can-connect/helpers/validate');
    module.exports = validate(canMapBehavior, [
        'id',
        'get',
        'updatedList',
        'destroy',
        'save',
        'getList'
    ]);
});
/*can-simple-observable@2.0.0-pre.25#async/async*/
define('can-simple-observable/async/async', [
    'require',
    'exports',
    'module',
    'can-simple-observable',
    'can-observation',
    'can-queues',
    'can-simple-observable/settable/settable',
    'can-reflect',
    'can-observation-recorder',
    'can-event-queue/value/value'
], function (require, exports, module) {
    var SimpleObservable = require('can-simple-observable');
    var Observation = require('can-observation');
    var queues = require('can-queues');
    var SettableObservable = require('can-simple-observable/settable/settable');
    var canReflect = require('can-reflect');
    var ObservationRecorder = require('can-observation-recorder');
    var valueEventBindings = require('can-event-queue/value/value');
    function AsyncObservable(fn, context, initialValue) {
        this.resolve = this.resolve.bind(this);
        this.lastSetValue = new SimpleObservable(initialValue);
        this.handler = this.handler.bind(this);
        function observe() {
            this.resolveCalled = false;
            return fn.call(context, this.lastSetValue.get(), this.bound === true ? this.resolve : undefined);
        }
        canReflect.assignSymbols(this, {
            'can.getName': function () {
                return canReflect.getName(this.constructor) + '<' + canReflect.getName(fn) + '>';
            }
        });
        Object.defineProperty(this.handler, 'name', { value: canReflect.getName(this) + '.handler' });
        Object.defineProperty(observe, 'name', { value: canReflect.getName(fn) + '::' + canReflect.getName(this.constructor) });
        this.observation = new Observation(observe, this);
    }
    AsyncObservable.prototype = Object.create(SettableObservable.prototype);
    AsyncObservable.prototype.constructor = AsyncObservable;
    AsyncObservable.prototype.handler = function (newVal) {
        if (newVal !== undefined) {
            SettableObservable.prototype.handler.apply(this, arguments);
        }
    };
    var peek = ObservationRecorder.ignore(canReflect.getValue.bind(canReflect));
    AsyncObservable.prototype.onBound = function () {
        this.bound = true;
        canReflect.onValue(this.observation, this.handler, 'notify');
        if (!this.resolveCalled) {
            this.value = peek(this.observation);
        }
    };
    AsyncObservable.prototype.resolve = function resolve(newVal) {
        this.resolveCalled = true;
        var old = this.value;
        this.value = newVal;
        if (typeof this._log === 'function') {
            this._log(old, newVal);
        }
        queues.enqueueByQueue(this.handlers.getNode([]), this, [
            newVal,
            old
        ], null, [
            canReflect.getName(this),
            'resolved with',
            newVal
        ]);
    };
    module.exports = AsyncObservable;
});
/*can-event-queue@0.15.2#type/type*/
define('can-event-queue/type/type', [
    'require',
    'exports',
    'module',
    'can-reflect',
    'can-symbol',
    'can-key-tree',
    'can-queues'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var KeyTree = require('can-key-tree');
    var queues = require('can-queues');
    var metaSymbol = canSymbol.for('can.meta');
    function ensureMeta(obj) {
        var meta = obj[metaSymbol];
        if (!meta) {
            meta = {};
            canReflect.setKeyValue(obj, metaSymbol, meta);
        }
        if (!meta.lifecycleHandlers) {
            meta.lifecycleHandlers = new KeyTree([
                Object,
                Array
            ]);
        }
        if (!meta.instancePatchesHandlers) {
            meta.instancePatchesHandlers = new KeyTree([
                Object,
                Array
            ]);
        }
        return meta;
    }
    var props = {};
    function onOffAndDispatch(symbolName, dispatchName, handlersName) {
        props['can.on' + symbolName] = function (handler, queueName) {
            ensureMeta(this)[handlersName].add([
                queueName || 'mutate',
                handler
            ]);
        };
        props['can.off' + symbolName] = function (handler, queueName) {
            ensureMeta(this)[handlersName].delete([
                queueName || 'mutate',
                handler
            ]);
        };
        props['can.' + dispatchName] = function (instance, arg) {
            queues.enqueueByQueue(ensureMeta(this)[handlersName].getNode([]), this, [
                instance,
                arg
            ]);
        };
    }
    onOffAndDispatch('InstancePatches', 'dispatchInstanceOnPatches', 'instancePatchesHandlers');
    onOffAndDispatch('InstanceBoundChange', 'dispatchInstanceBoundChange', 'lifecycleHandlers');
    module.exports = function (obj) {
        return canReflect.assignSymbols(obj, props);
    };
});
/*can-util@3.10.18#js/defaults/defaults*/
define('can-util/js/defaults/defaults', function (require, exports, module) {
    'use strict';
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
/*can-util@3.10.18#js/string-to-any/string-to-any*/
define('can-util/js/string-to-any/string-to-any', function (require, exports, module) {
    'use strict';
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
/*can-define@2.0.0-pre.22#can-define*/
define('can-define', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-symbol',
    'can-reflect',
    'can-observation',
    'can-observation-recorder',
    'can-simple-observable/async/async',
    'can-simple-observable/settable/settable',
    'can-cid',
    'can-event-queue/map/map',
    'can-event-queue/type/type',
    'can-queues',
    'can-util/js/is-empty-object/is-empty-object',
    'can-util/js/assign/assign',
    'can-log/dev/dev',
    'can-util/js/is-plain-object/is-plain-object',
    'can-util/js/each/each',
    'can-util/js/defaults/defaults',
    'can-util/js/string-to-any/string-to-any',
    'can-define-lazy-value'
], function (require, exports, module) {
    'use strict';
    'format cjs';
    var ns = require('can-namespace');
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    var Observation = require('can-observation');
    var ObservationRecorder = require('can-observation-recorder');
    var AsyncObservable = require('can-simple-observable/async/async');
    var SettableObservable = require('can-simple-observable/settable/settable');
    var CID = require('can-cid');
    var eventQueue = require('can-event-queue/map/map');
    var addTypeEvents = require('can-event-queue/type/type');
    var queues = require('can-queues');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var assign = require('can-util/js/assign/assign');
    var canLogDev = require('can-log/dev/dev');
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var each = require('can-util/js/each/each');
    var defaults = require('can-util/js/defaults/defaults');
    var stringToAny = require('can-util/js/string-to-any/string-to-any');
    var defineLazyValue = require('can-define-lazy-value');
    var eventsProto, define, make, makeDefinition, getDefinitionsAndMethods, isDefineType, getDefinitionOrMethod;
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
                cb.call(map, prop, Object.getOwnPropertyDescriptor(map, prop));
            }
        }
    };
    module.exports = define = ns.define = function (objPrototype, defines, baseDefine) {
        var prop, dataInitializers = Object.create(baseDefine ? baseDefine.dataInitializers : null), computedInitializers = Object.create(baseDefine ? baseDefine.computedInitializers : null);
        var result = getDefinitionsAndMethods(defines, baseDefine);
        result.dataInitializers = dataInitializers;
        result.computedInitializers = computedInitializers;
        each(result.definitions, function (definition, property) {
            define.property(objPrototype, property, definition, dataInitializers, computedInitializers);
        });
        if (objPrototype.hasOwnProperty('_data')) {
            for (prop in dataInitializers) {
                defineLazyValue(objPrototype._data, prop, dataInitializers[prop].bind(objPrototype), true);
            }
        } else {
            defineLazyValue(objPrototype, '_data', function () {
                var map = this;
                var data = {};
                for (var prop in dataInitializers) {
                    defineLazyValue(data, prop, dataInitializers[prop].bind(map), true);
                }
                return data;
            });
        }
        if (objPrototype.hasOwnProperty('_computed')) {
            for (prop in computedInitializers) {
                defineLazyValue(objPrototype._computed, prop, computedInitializers[prop].bind(objPrototype));
            }
        } else {
            defineLazyValue(objPrototype, '_computed', function () {
                var map = this;
                var data = Object.create(null);
                for (var prop in computedInitializers) {
                    defineLazyValue(data, prop, computedInitializers[prop].bind(map));
                }
                return data;
            });
        }
        if (!objPrototype.hasOwnProperty('_cid')) {
            defineLazyValue(objPrototype, '_cid', function () {
                return CID({});
            });
        }
        for (prop in eventsProto) {
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
        var iteratorSymbol = canSymbol.iterator || canSymbol.for('iterator');
        if (!objPrototype[iteratorSymbol]) {
            defineConfigurableAndNotEnumerable(objPrototype, iteratorSymbol, function () {
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
        if (type && canReflect.isConstructorLike(type)) {
            canLogDev.warn('can-define: the definition for ' + prop + (objPrototype.constructor.shortName ? ' on ' + objPrototype.constructor.shortName : '') + ' uses a constructor for "type". Did you mean "Type"?');
        }
        if (type && onlyType(definition) && type === define.types['*']) {
            Object.defineProperty(objPrototype, prop, {
                get: make.get.data(prop),
                set: make.set.events(prop, make.get.data(prop), make.set.data(prop), make.eventType.data(prop)),
                enumerable: true,
                configurable: true
            });
            return;
        }
        definition.type = type;
        var dataProperty = definition.get ? 'computed' : 'data', reader = make.read[dataProperty](prop), getter = make.get[dataProperty](prop), setter = make.set[dataProperty](prop), getInitialValue;
        if (definition.get) {
            Object.defineProperty(definition.get, 'name', { value: canReflect.getName(objPrototype) + '\'s ' + prop + ' getter' });
        }
        if (definition.set) {
            Object.defineProperty(definition.set, 'name', { value: canReflect.getName(objPrototype) + '\'s ' + prop + ' setter' });
        }
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
            if (definition.value !== null && typeof definition.value === 'object') {
                canLogDev.warn('can-define: The value for ' + prop + ' is set to an object. This will be shared by all instances of the DefineMap. Use a function that returns the object instead.');
            }
            if (definition.value && canReflect.isConstructorLike(definition.value)) {
                canLogDev.warn('can-define: The "value" for ' + prop + ' is set to a constructor. Did you mean "Value" instead?');
            }
            getInitialValue = ObservationRecorder.ignore(make.get.defaultValue(prop, definition, typeConvert, eventsSetter));
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
        } else if (definition.get.length < 1) {
            setter = function () {
                canLogDev.warn('can-define: Set value for property ' + prop + (objPrototype.constructor.shortName ? ' on ' + objPrototype.constructor.shortName : '') + ' ignored, as its definition has a zero-argument getter and no setter');
            };
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
            enumerable: 'serialize' in definition ? !!definition.serialize : !definition.get,
            configurable: true
        });
    };
    define.makeDefineInstanceKey = function (constructor) {
        constructor[canSymbol.for('can.defineInstanceKey')] = function (property, value) {
            var defineResult = this.prototype._define;
            var definition = getDefinitionOrMethod(property, value, defineResult.defaultDefinition);
            if (definition && typeof definition === 'object') {
                define.property(constructor.prototype, property, definition, defineResult.dataInitializers, defineResult.computedInitializers);
                defineResult.definitions[property] = definition;
            } else {
                defineResult.methods[property] = definition;
            }
        };
    };
    define.Constructor = function (defines, sealed) {
        var constructor = function (props) {
            Object.defineProperty(this, '__inSetup', {
                configurable: true,
                enumerable: false,
                value: true,
                writable: true
            });
            define.setup.call(this, props, sealed);
            this.__inSetup = false;
        };
        var result = define(constructor.prototype, defines);
        addTypeEvents(constructor);
        define.makeDefineInstanceKey(constructor, result);
        return constructor;
    };
    make = {
        compute: function (prop, get, defaultValueFn) {
            return function () {
                var map = this, defaultValue = defaultValueFn && defaultValueFn.call(this), observable, computeObj;
                if (get.length === 0) {
                    observable = new Observation(get, map);
                } else if (get.length === 1) {
                    observable = new SettableObservable(get, map, defaultValue);
                } else {
                    observable = new AsyncObservable(get, map, defaultValue);
                }
                computeObj = {
                    oldValue: undefined,
                    compute: observable,
                    count: 0,
                    handler: function (newVal) {
                        var oldValue = computeObj.oldValue;
                        computeObj.oldValue = newVal;
                        map.dispatch({
                            type: prop,
                            target: map
                        }, [
                            newVal,
                            oldValue
                        ]);
                    }
                };
                Object.defineProperty(computeObj.handler, 'name', { value: canReflect.getName(get).replace('getter', 'event emitter') });
                return computeObj;
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
                    canReflect.setValue(this._computed[prop].compute, val);
                };
            },
            events: function (prop, getCurrent, setData, eventType) {
                return function (newVal) {
                    if (this.__inSetup) {
                        setData.call(this, newVal);
                    } else {
                        var current = getCurrent.call(this);
                        if (newVal !== current) {
                            setData.call(this, newVal);
                            this.dispatch({
                                patches: [{
                                        type: 'set',
                                        key: prop,
                                        value: newVal
                                    }],
                                type: prop,
                                target: this,
                                reasonLog: [
                                    canReflect.getName(this) + '\'s',
                                    prop,
                                    'changed to',
                                    newVal,
                                    'from',
                                    current
                                ]
                            }, [
                                newVal,
                                current
                            ]);
                        }
                    }
                };
            },
            setter: function (prop, setter, getCurrent, setEvents, hasGetter) {
                return function (value) {
                    var asyncTimer;
                    var self = this;
                    queues.batch.start();
                    var setterCalled = false, current = getCurrent.call(this), setValue = setter.call(this, value, function (value) {
                            setEvents.call(self, value);
                            setterCalled = true;
                            clearTimeout(asyncTimer);
                        }, current);
                    if (setterCalled) {
                        queues.batch.stop();
                    } else {
                        if (hasGetter) {
                            if (setValue !== undefined) {
                                if (current !== setValue) {
                                    setEvents.call(this, setValue);
                                }
                                queues.batch.stop();
                            } else if (setter.length === 0) {
                                setEvents.call(this, value);
                                queues.batch.stop();
                                return;
                            } else if (setter.length === 1) {
                                queues.batch.stop();
                            } else {
                                asyncTimer = setTimeout(function () {
                                    canLogDev.warn('can/map/setter.js: Setter "' + prop + '" did not return a value or call the setter callback.');
                                }, canLogDev.warnTimeout);
                                queues.batch.stop();
                                return;
                            }
                        } else {
                            if (setValue !== undefined) {
                                setEvents.call(this, setValue);
                                queues.batch.stop();
                            } else if (setter.length === 0) {
                                setEvents.call(this, value);
                                queues.batch.stop();
                                return;
                            } else if (setter.length === 1) {
                                setEvents.call(this, undefined);
                                queues.batch.stop();
                            } else {
                                asyncTimer = setTimeout(function () {
                                    canLogDev.warn('can/map/setter.js: Setter "' + prop + '" did not return a value or call the setter callback.');
                                }, canLogDev.warnTimeout);
                                queues.batch.stop();
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
                if (Array.isArray(Type) && define.DefineList) {
                    Type = define.DefineList.extend({ '#': Type[0] });
                } else if (typeof Type === 'object') {
                    if (define.DefineMap) {
                        Type = define.DefineMap.extend(Type);
                    } else {
                        Type = define.Constructor(Type);
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
                    return canReflect.getValue(this._computed[prop].compute);
                };
            },
            lastSet: function (prop) {
                return function () {
                    var observable = this._computed[prop].compute;
                    if (observable.lastSetValue) {
                        return canReflect.getValue(observable.lastSetValue);
                    }
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
                    if (!this.__inSetup) {
                        ObservationRecorder.add(this, prop);
                    }
                    return this._data[prop];
                };
            },
            computed: function (prop) {
                return function () {
                    return canReflect.getValue(this._computed[prop].compute);
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
    var addBehaviorToDefinition = function (definition, behavior, value) {
        if (behavior === 'enumerable') {
            definition.serialize = !!value;
        } else if (behavior === 'type') {
            var behaviorDef = value;
            if (typeof behaviorDef === 'string') {
                behaviorDef = define.types[behaviorDef];
                if (typeof behaviorDef === 'object') {
                    assign(definition, behaviorDef);
                    behaviorDef = behaviorDef[behavior];
                }
            }
            if (typeof behaviorDef !== 'undefined') {
                definition[behavior] = behaviorDef;
            }
        } else {
            definition[behavior] = value;
        }
    };
    makeDefinition = function (prop, def, defaultDefinition) {
        var definition = {};
        each(def, function (value, behavior) {
            addBehaviorToDefinition(definition, behavior, value);
        });
        each(defaultDefinition, function (value, prop) {
            if (definition[prop] === undefined) {
                if (prop !== 'type' && prop !== 'Type') {
                    definition[prop] = value;
                }
            }
        });
        if (typeof def.type !== 'string') {
            if (!definition.type && !definition.Type) {
                defaults(definition, defaultDefinition);
            }
            if (isEmptyObject(definition)) {
                definition.type = define.types['*'];
            }
        }
        return definition;
    };
    getDefinitionOrMethod = function (prop, value, defaultDefinition) {
        var definition;
        if (typeof value === 'string') {
            definition = { type: value };
        } else if (typeof value === 'function') {
            if (canReflect.isConstructorLike(value)) {
                definition = { Type: value };
            } else if (isDefineType(value)) {
                definition = { type: value };
            }
        } else if (Array.isArray(value)) {
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
            defaultDefinition = Object.create(null);
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
                if (result && typeof result === 'object' && !isEmptyObject(result)) {
                    definitions[prop] = result;
                } else {
                    if (typeof result === 'function') {
                        methods[prop] = result;
                    } else if (typeof result !== 'undefined') {
                        canLogDev.error(prop + (this.constructor.shortName ? ' on ' + this.constructor.shortName : '') + ' does not match a supported propDefinition. See: https://canjs.com/doc/can-define.types.propDefinition.html');
                    }
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
    eventsProto = eventQueue({});
    function setupComputed(instance, eventName) {
        var computedBinding = instance._computed && instance._computed[eventName];
        if (computedBinding && computedBinding.compute) {
            if (!computedBinding.count) {
                computedBinding.count = 1;
                canReflect.onValue(computedBinding.compute, computedBinding.handler, 'notify');
                computedBinding.oldValue = canReflect.getValue(computedBinding.compute);
            } else {
                computedBinding.count++;
            }
        }
    }
    function teardownComputed(instance, eventName) {
        var computedBinding = instance._computed && instance._computed[eventName];
        if (computedBinding) {
            if (computedBinding.count === 1) {
                computedBinding.count = 0;
                canReflect.offValue(computedBinding.compute, computedBinding.handler, 'notify');
            } else {
                computedBinding.count--;
            }
        }
    }
    var canMetaSymbol = canSymbol.for('can.meta');
    assign(eventsProto, {
        _eventSetup: function () {
        },
        _eventTeardown: function () {
        },
        addEventListener: function (eventName, handler, queue) {
            setupComputed(this, eventName);
            return eventQueue.addEventListener.apply(this, arguments);
        },
        removeEventListener: function (eventName, handler) {
            teardownComputed(this, eventName);
            return eventQueue.removeEventListener.apply(this, arguments);
        }
    });
    eventsProto.on = eventsProto.bind = eventsProto.addEventListener;
    eventsProto.off = eventsProto.unbind = eventsProto.removeEventListener;
    var onKeyValueSymbol = canSymbol.for('can.onKeyValue');
    var offKeyValueSymbol = canSymbol.for('can.offKeyValue');
    canReflect.assignSymbols(eventsProto, {
        'can.onKeyValue': function (key) {
            setupComputed(this, key);
            return eventQueue[onKeyValueSymbol].apply(this, arguments);
        },
        'can.offKeyValue': function (key) {
            teardownComputed(this, key);
            return eventQueue[offKeyValueSymbol].apply(this, arguments);
        }
    });
    delete eventsProto.one;
    define.setup = function (props, sealed) {
        CID(this);
        Object.defineProperty(this, '_cid', {
            value: this._cid,
            enumerable: false,
            writable: false
        });
        Object.defineProperty(this, 'constructor', {
            value: this.constructor,
            enumerable: false,
            writable: false
        });
        Object.defineProperty(this, canMetaSymbol, {
            value: Object.create(null),
            enumerable: false,
            writable: false
        });
        var definitions = this._define.definitions;
        var instanceDefinitions = Object.create(null);
        var map = this;
        canReflect.eachKey(props, function (value, prop) {
            if (definitions[prop] !== undefined) {
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
    define.replaceWith = defineLazyValue;
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
    function isObservableValue(obj) {
        return canReflect.isValueLike(obj) && canReflect.isObservableLike(obj);
    }
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
            if (Array.isArray(newVal) && define.DefineList) {
                newVal = new define.DefineList(newVal);
            } else if (isPlainObject(newVal) && define.DefineMap) {
                newVal = new define.DefineMap(newVal);
            }
            return newVal;
        },
        'stringOrObservable': function (newVal) {
            if (Array.isArray(newVal)) {
                return new define.DefaultList(newVal);
            } else if (isPlainObject(newVal)) {
                return new define.DefaultMap(newVal);
            } else {
                return define.types.string(newVal);
            }
        },
        'htmlbool': function (val) {
            if (val === '') {
                return true;
            }
            return !!stringToAny(val);
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
                if (isObservableValue(newValue)) {
                    return newValue;
                }
                if (isObservableValue(oldValue)) {
                    canReflect.setValue(oldValue, newValue);
                    return oldValue;
                }
                return newValue;
            },
            get: function (value) {
                return isObservableValue(value) ? canReflect.getValue(value) : value;
            }
        }
    };
});
/*can-connect@2.0.0-pre.14#can/ref/ref*/
define('can-connect/can/ref/ref', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-connect/helpers/get-id-props',
    'can-connect/helpers/weak-reference-map',
    'can-observation-recorder',
    'can-connect/constructor/store/store',
    'can-define'
], function (require, exports, module) {
    var connect = require('can-connect');
    var getIdProps = require('can-connect/helpers/get-id-props');
    var WeakReferenceMap = require('can-connect/helpers/weak-reference-map');
    var ObservationRecorder = require('can-observation-recorder');
    var constructorStore = require('can-connect/constructor/store/store');
    var define = require('can-define');
    var makeRef = function (connection) {
        var idProp = getIdProps(connection)[0];
        var Ref = function (id, value) {
            if (typeof id === 'object') {
                value = id;
                id = value[idProp];
            }
            var storeRef = Ref.store.get(id);
            if (storeRef) {
                if (value && !storeRef._value) {
                    if (value instanceof connection.Map) {
                        storeRef._value = value;
                    } else {
                        storeRef._value = connection.hydrateInstance(value);
                    }
                }
                return storeRef;
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
        Ref.prototype.unobservedId = ObservationRecorder.ignore(function () {
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
/*can-connect@2.0.0-pre.14#can/super-map/super-map*/
define('can-connect/can/super-map/super-map', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-connect/constructor/constructor',
    'can-connect/can/map/map',
    'can-connect/can/ref/ref',
    'can-connect/constructor/store/store',
    'can-connect/data/callbacks/callbacks',
    'can-connect/data/callbacks-cache/callbacks-cache',
    'can-connect/data/combine-requests/combine-requests',
    'can-connect/data/localstorage-cache/localstorage-cache',
    'can-connect/data/parse/parse',
    'can-connect/data/url/url',
    'can-connect/fall-through-cache/fall-through-cache',
    'can-connect/real-time/real-time',
    'can-connect/constructor/callbacks-once/callbacks-once',
    'can-util/js/global/global'
], function (require, exports, module) {
    (function (global, require, exports, module) {
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
        var GLOBAL = require('can-util/js/global/global');
        var $ = GLOBAL().$;
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
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-connect@2.0.0-pre.14#can/tag/tag*/
define('can-connect/can/tag/tag', [
    'require',
    'exports',
    'module',
    'can-stache-bindings',
    'can-connect',
    'can-observation',
    'can-stache/src/expression',
    'can-view-callbacks',
    'can-observation-recorder',
    'can-view-nodelist',
    'can-event-queue/map/legacy/legacy',
    'can-reflect',
    'can-util/js/each/each',
    'can-util/dom/mutate/mutate',
    'can-util/dom/data/data',
    'can-util/dom/events/removed/removed'
], function (require, exports, module) {
    require('can-stache-bindings');
    var connect = require('can-connect');
    var Observation = require('can-observation');
    var expression = require('can-stache/src/expression');
    var viewCallbacks = require('can-view-callbacks');
    var ObservationRecorder = require('can-observation-recorder');
    var nodeLists = require('can-view-nodelist');
    var eventQueue = require('can-event-queue/map/legacy/legacy');
    var canReflect = require('can-reflect');
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
            var addToPageData = ObservationRecorder.ignore(function (set, promise) {
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
            var request = new Observation(function () {
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
                    hash = attrInfo.argExprs.length ? canReflect.getValue(attrInfo.argExprs[0].value(tagData.scope, tagData.options)) : {};
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
            eventQueue.one.call(el, 'removed', function () {
                nodeLists.unregister(nodeList);
            });
        });
    };
    module.exports = connect.tag;
});
/*can-connect@2.0.0-pre.14#can/base-map/base-map*/
define('can-connect/can/base-map/base-map', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-connect/constructor/constructor',
    'can-connect/can/map/map',
    'can-connect/can/ref/ref',
    'can-connect/constructor/store/store',
    'can-connect/data/callbacks/callbacks',
    'can-connect/data/callbacks-cache/callbacks-cache',
    'can-connect/data/parse/parse',
    'can-connect/data/url/url',
    'can-connect/real-time/real-time',
    'can-connect/constructor/callbacks-once/callbacks-once',
    'can-util/js/global/global'
], function (require, exports, module) {
    (function (global, require, exports, module) {
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
        var GLOBAL = require('can-util/js/global/global');
        var $ = GLOBAL().$;
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
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-connect@2.0.0-pre.14#all*/
define('can-connect/all', [
    'require',
    'exports',
    'module',
    'can-connect',
    'can-connect/cache-requests/cache-requests',
    'can-connect/constructor/constructor',
    'can-connect/constructor/callbacks-once/callbacks-once',
    'can-connect/constructor/store/store',
    'can-connect/data/callbacks/callbacks',
    'can-connect/data/callbacks-cache/callbacks-cache',
    'can-connect/data/combine-requests/combine-requests',
    'can-connect/data/localstorage-cache/localstorage-cache',
    'can-connect/data/memory-cache/memory-cache',
    'can-connect/data/parse/parse',
    'can-connect/data/url/url',
    'can-connect/fall-through-cache/fall-through-cache',
    'can-connect/real-time/real-time',
    'can-connect/can/super-map/super-map',
    'can-connect/can/tag/tag',
    'can-connect/can/base-map/base-map'
], function (require, exports, module) {
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
/*can-define@2.0.0-pre.22#define-helpers/define-helpers*/
define('can-define/define-helpers/define-helpers', [
    'require',
    'exports',
    'module',
    'can-define',
    'can-reflect',
    'can-queues'
], function (require, exports, module) {
    var define = require('can-define');
    var canReflect = require('can-reflect');
    var queues = require('can-queues');
    var defineHelpers = {
        defineExpando: function (map, prop, value) {
            var constructorDefines = map._define.definitions;
            if (constructorDefines && constructorDefines[prop]) {
                return;
            }
            var instanceDefines = map._instanceDefinitions;
            if (!instanceDefines) {
                Object.defineProperty(map, '_instanceDefinitions', {
                    configurable: true,
                    enumerable: false,
                    value: {}
                });
                instanceDefines = map._instanceDefinitions;
            }
            if (!instanceDefines[prop]) {
                var defaultDefinition = map._define.defaultDefinition || { type: define.types.observable };
                define.property(map, prop, defaultDefinition, {}, {});
                map._data[prop] = defaultDefinition.type ? defaultDefinition.type(value) : define.types.observable(value);
                instanceDefines[prop] = defaultDefinition;
                queues.batch.start();
                map.dispatch({
                    type: 'can.keys',
                    target: map
                });
                if (map._data[prop] !== undefined) {
                    map.dispatch({
                        type: prop,
                        target: map,
                        patches: [{
                                type: 'set',
                                key: prop,
                                value: map._data[prop]
                            }]
                    }, [
                        map._data[prop],
                        undefined
                    ]);
                }
                queues.batch.stop();
                return true;
            }
        },
        reflectSerialize: function (unwrapped) {
            var constructorDefinitions = this._define.definitions;
            var defaultDefinition = this._define.defaultDefinition;
            this.forEach(function (val, name) {
                var propDef = constructorDefinitions[name];
                if (propDef && typeof propDef.serialize === 'function') {
                    val = propDef.serialize.call(this, val, name);
                } else if (defaultDefinition && typeof defaultDefinition.serialize === 'function') {
                    val = defaultDefinition.serialize.call(this, val, name);
                } else {
                    val = canReflect.serialize(val);
                }
                if (val !== undefined) {
                    unwrapped[name] = val;
                }
            }, this);
            return unwrapped;
        },
        reflectUnwrap: function (unwrapped) {
            this.forEach(function (value, key) {
                if (value !== undefined) {
                    unwrapped[key] = canReflect.unwrap(value);
                }
            });
            return unwrapped;
        }
    };
    module.exports = defineHelpers;
});
/*can-util@3.10.18#js/cid-set/cid-set*/
define('can-util/js/cid-set/cid-set', [
    'require',
    'exports',
    'module',
    'can-cid/set/set'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = require('can-cid/set/set');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#js/cid-map/cid-map*/
define('can-util/js/cid-map/cid-map', [
    'require',
    'exports',
    'module',
    'can-cid/map/map'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = require('can-cid/map/map');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-define@2.0.0-pre.22#ensure-meta*/
define('can-define/ensure-meta', [
    'require',
    'exports',
    'module',
    'can-symbol',
    'can-reflect'
], function (require, exports, module) {
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    module.exports = function ensureMeta(obj) {
        var metaSymbol = canSymbol.for('can.meta');
        var meta = obj[metaSymbol];
        if (!meta) {
            meta = {};
            canReflect.setKeyValue(obj, metaSymbol, meta);
        }
        return meta;
    };
});
/*can-define@2.0.0-pre.22#map/map*/
define('can-define/map/map', [
    'require',
    'exports',
    'module',
    'can-construct',
    'can-define',
    'can-define/define-helpers/define-helpers',
    'can-observation-recorder',
    'can-namespace',
    'can-log',
    'can-log/dev/dev',
    'can-reflect',
    'can-symbol',
    'can-util/js/cid-set/cid-set',
    'can-util/js/cid-map/cid-map',
    'can-queues',
    'can-define/ensure-meta',
    'can-log/dev/dev',
    'can-event-queue/type/type'
], function (require, exports, module) {
    var Construct = require('can-construct');
    var define = require('can-define');
    var defineHelpers = require('can-define/define-helpers/define-helpers');
    var ObservationRecorder = require('can-observation-recorder');
    var ns = require('can-namespace');
    var canLog = require('can-log');
    var canLogDev = require('can-log/dev/dev');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var CIDSet = require('can-util/js/cid-set/cid-set');
    var CIDMap = require('can-util/js/cid-map/cid-map');
    var queues = require('can-queues');
    var ensureMeta = require('can-define/ensure-meta');
    var dev = require('can-log/dev/dev');
    var addTypeEvents = require('can-event-queue/type/type');
    var keysForDefinition = function (definitions) {
        var keys = [];
        for (var prop in definitions) {
            var definition = definitions[prop];
            if (typeof definition !== 'object' || ('serialize' in definition ? !!definition.serialize : !definition.get)) {
                keys.push(prop);
            }
        }
        return keys;
    };
    function assign(source) {
        queues.batch.start();
        canReflect.assignMap(this, source || {});
        queues.batch.stop();
    }
    function update(source) {
        queues.batch.start();
        canReflect.updateMap(this, source || {});
        queues.batch.stop();
    }
    function assignDeep(source) {
        queues.batch.start();
        canReflect.assignDeepMap(this, source || {});
        queues.batch.stop();
    }
    function updateDeep(source) {
        queues.batch.start();
        canReflect.updateDeepMap(this, source || {});
        queues.batch.stop();
    }
    function setKeyValue(key, value) {
        var defined = defineHelpers.defineExpando(this, key, value);
        if (!defined) {
            this[key] = value;
        }
    }
    function getKeyValue(key) {
        var value = this[key];
        if (value !== undefined || key in this || Object.isSealed(this)) {
            return value;
        } else {
            ObservationRecorder.add(this, key);
            return this[key];
        }
    }
    var DefineMap = Construct.extend('DefineMap', {
        setup: function (base) {
            var key, prototype = this.prototype;
            if (DefineMap) {
                var result = define(prototype, prototype, base.prototype._define);
                define.makeDefineInstanceKey(this, result);
                addTypeEvents(this);
                for (key in DefineMap.prototype) {
                    define.defineConfigurableAndNotEnumerable(prototype, key, prototype[key]);
                }
                this.prototype.setup = function (props) {
                    define.setup.call(this, props || {}, this.constructor.seal);
                };
            } else {
                for (key in prototype) {
                    define.defineConfigurableAndNotEnumerable(prototype, key, prototype[key]);
                }
            }
            define.defineConfigurableAndNotEnumerable(prototype, 'constructor', this);
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
            define.setup.call(this, props || {}, sealed === true);
        },
        get: function (prop) {
            if (prop) {
                return getKeyValue.call(this, prop);
            } else {
                return canReflect.unwrap(this, CIDMap);
            }
        },
        set: function (prop, value) {
            if (typeof prop === 'object') {
                canLogDev.warn('can-define/map/map.prototype.set is deprecated; please use can-define/map/map.prototype.assign or can-define/map/map.prototype.update instead');
                if (value === true) {
                    updateDeep.call(this, prop);
                } else {
                    assignDeep.call(this, prop);
                }
            } else {
                setKeyValue.call(this, prop, value);
            }
            return this;
        },
        assignDeep: function (prop) {
            assignDeep.call(this, prop);
            return this;
        },
        updateDeep: function (prop) {
            updateDeep.call(this, prop);
            return this;
        },
        assign: function (prop) {
            assign.call(this, prop);
            return this;
        },
        update: function (prop) {
            update.call(this, prop);
            return this;
        },
        serialize: function () {
            return canReflect.serialize(this, CIDMap);
        },
        forEach: function () {
            var forEach = function (list, cb, thisarg) {
                    return canReflect.eachKey(list, cb, thisarg);
                }, noObserve = ObservationRecorder.ignore(forEach);
            return function (cb, thisarg, observe) {
                return observe === false ? noObserve(this, cb, thisarg) : forEach(this, cb, thisarg);
            };
        }(),
        '*': { type: define.types.observable },
        log: function (key) {
            var instance = this;
            var quoteString = function quoteString(x) {
                return typeof x === 'string' ? JSON.stringify(x) : x;
            };
            var meta = ensureMeta(instance);
            var allowed = meta.allowedLogKeysSet || new Set();
            meta.allowedLogKeysSet = allowed;
            if (key) {
                allowed.add(key);
            }
            meta._log = function (event, data) {
                var type = event.type;
                if (type === 'can.keys' || key && !allowed.has(type)) {
                    return;
                }
                dev.log(canReflect.getName(instance), '\n key ', quoteString(type), '\n is  ', quoteString(data[0]), '\n was ', quoteString(data[1]));
            };
        }
    });
    canReflect.assignSymbols(DefineMap.prototype, {
        'can.isMapLike': true,
        'can.isListLike': false,
        'can.isValueLike': false,
        'can.getKeyValue': getKeyValue,
        'can.setKeyValue': setKeyValue,
        'can.deleteKeyValue': function (prop) {
            this.set(prop, undefined);
            return this;
        },
        'can.getOwnEnumerableKeys': function () {
            ObservationRecorder.add(this, 'can.keys');
            return keysForDefinition(this._define.definitions).concat(keysForDefinition(this._instanceDefinitions));
        },
        'can.assignDeep': assignDeep,
        'can.updateDeep': updateDeep,
        'can.unwrap': defineHelpers.reflectUnwrap,
        'can.serialize': defineHelpers.reflectSerialize,
        'can.keyHasDependencies': function (key) {
            return !!(this._computed && this._computed[key] && this._computed[key].compute);
        },
        'can.getKeyDependencies': function (key) {
            var ret;
            if (this._computed && this._computed[key] && this._computed[key].compute) {
                ret = {};
                ret.valueDependencies = new CIDSet();
                ret.valueDependencies.add(this._computed[key].compute);
            }
            return ret;
        },
        'can.getName': function () {
            return canReflect.getName(this.constructor) + '{}';
        }
    });
    canReflect.setKeyValue(DefineMap.prototype, canSymbol.iterator, function () {
        return new define.Iterator(this);
    });
    for (var prop in define.eventsProto) {
        DefineMap[prop] = define.eventsProto[prop];
        Object.defineProperty(DefineMap.prototype, prop, {
            enumerable: false,
            value: define.eventsProto[prop],
            writable: true
        });
    }
    var eventsProtoSymbols = 'getOwnPropertySymbols' in Object ? Object.getOwnPropertySymbols(define.eventsProto) : [
        canSymbol.for('can.onKeyValue'),
        canSymbol.for('can.offKeyValue')
    ];
    eventsProtoSymbols.forEach(function (sym) {
        Object.defineProperty(DefineMap.prototype, sym, {
            enumerable: false,
            value: define.eventsProto[sym],
            writable: true
        });
    });
    define.DefineMap = DefineMap;
    Object.defineProperty(DefineMap.prototype, 'toObject', {
        enumerable: false,
        writable: true,
        value: function () {
            canLog.warn('Use DefineMap::get instead of DefineMap::toObject');
            return this.get();
        }
    });
    module.exports = ns.DefineMap = DefineMap;
});
/*can-define@2.0.0-pre.22#list/list*/
define('can-define/list/list', [
    'require',
    'exports',
    'module',
    'can-construct',
    'can-define',
    'can-queues',
    'can-event-queue/type/type',
    'can-observation-recorder',
    'can-log',
    'can-log/dev/dev',
    'can-define/define-helpers/define-helpers',
    'can-log/dev/dev',
    'can-define/ensure-meta',
    'can-util/js/assign/assign',
    'can-util/js/diff/diff',
    'can-util/js/each/each',
    'can-util/js/make-array/make-array',
    'can-namespace',
    'can-reflect',
    'can-symbol',
    'can-util/js/cid-set/cid-set',
    'can-util/js/cid-map/cid-map',
    'can-util/js/single-reference/single-reference'
], function (require, exports, module) {
    var Construct = require('can-construct');
    var define = require('can-define');
    var make = define.make;
    var queues = require('can-queues');
    var addTypeEvents = require('can-event-queue/type/type');
    var ObservationRecorder = require('can-observation-recorder');
    var canLog = require('can-log');
    var canLogDev = require('can-log/dev/dev');
    var defineHelpers = require('can-define/define-helpers/define-helpers');
    var dev = require('can-log/dev/dev');
    var ensureMeta = require('can-define/ensure-meta');
    var assign = require('can-util/js/assign/assign');
    var diff = require('can-util/js/diff/diff');
    var each = require('can-util/js/each/each');
    var makeArray = require('can-util/js/make-array/make-array');
    var ns = require('can-namespace');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var CIDSet = require('can-util/js/cid-set/cid-set');
    var CIDMap = require('can-util/js/cid-map/cid-map');
    var singleReference = require('can-util/js/single-reference/single-reference');
    var splice = [].splice;
    var runningNative = false;
    var identity = function (x) {
        return x;
    };
    var localOnPatchesSymbol = 'can.onPatches';
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
    var onKeyValue = define.eventsProto[canSymbol.for('can.onKeyValue')];
    var offKeyValue = define.eventsProto[canSymbol.for('can.offKeyValue')];
    var DefineList = Construct.extend('DefineList', {
        setup: function (base) {
            if (DefineList) {
                addTypeEvents(this);
                var prototype = this.prototype;
                var result = define(prototype, prototype, base.prototype._define);
                define.makeDefineInstanceKey(this, result);
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
                    value: {
                        definitions: {
                            length: { type: 'number' },
                            _length: { type: 'number' }
                        }
                    }
                });
                Object.defineProperty(this, '_data', {
                    enumerable: false,
                    value: {}
                });
            }
            define.setup.call(this, {}, false);
            Object.defineProperty(this, '_length', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: 0
            });
            if (items) {
                this.splice.apply(this, [
                    0,
                    0
                ].concat(canReflect.toArray(items)));
            }
        },
        __type: define.types.observable,
        _triggerChange: function (attr, how, newVal, oldVal) {
            var index = +attr;
            if (!isNaN(index)) {
                var itemsDefinition = this._define.definitions['#'];
                var patches;
                if (how === 'add') {
                    if (itemsDefinition && typeof itemsDefinition.added === 'function') {
                        ObservationRecorder.ignore(itemsDefinition.added).call(this, newVal, index);
                    }
                    queues.batch.start();
                    patches = [{
                            type: 'splice',
                            insert: newVal,
                            index: index,
                            deleteCount: 0
                        }];
                    this.dispatch({
                        type: how,
                        patches: patches,
                        reasonLog: [
                            canReflect.getName(this),
                            'added',
                            JSON.stringify(newVal),
                            'at',
                            index
                        ]
                    }, [
                        newVal,
                        index
                    ]);
                    this.dispatch(localOnPatchesSymbol, [patches]);
                    queues.batch.stop();
                } else if (how === 'remove') {
                    if (itemsDefinition && typeof itemsDefinition.removed === 'function') {
                        ObservationRecorder.ignore(itemsDefinition.removed).call(this, oldVal, index);
                    }
                    queues.batch.start();
                    patches = [{
                            type: 'splice',
                            index: index,
                            deleteCount: oldVal.length
                        }];
                    this.dispatch({
                        type: how,
                        patches: patches,
                        reasonLog: [
                            canReflect.getName(this),
                            'remove',
                            JSON.stringify(oldVal),
                            'at',
                            index
                        ]
                    }, [
                        oldVal,
                        index
                    ]);
                    this.dispatch(localOnPatchesSymbol, [patches]);
                    queues.batch.stop();
                } else {
                    this.dispatch(how, [
                        newVal,
                        index
                    ]);
                }
            } else {
                this.dispatch({
                    type: '' + attr,
                    target: this
                }, [
                    newVal,
                    oldVal
                ]);
            }
        },
        get: function (index) {
            if (arguments.length) {
                if (isNaN(index)) {
                    ObservationRecorder.add(this, index);
                } else {
                    ObservationRecorder.add(this, 'length');
                }
                return this[index];
            } else {
                return canReflect.unwrap(this, CIDMap);
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
                canLogDev.warn('can-define/list/list.prototype.set is deprecated; please use can-define/list/list.prototype.assign or can-define/list/list.prototype.update instead');
                if (canReflect.isListLike(prop)) {
                    if (value) {
                        this.replace(prop);
                    } else {
                        canReflect.assignList(this, prop);
                    }
                } else {
                    canReflect.assignMap(this, prop);
                }
            }
            return this;
        },
        assign: function (prop) {
            if (canReflect.isListLike(prop)) {
                canReflect.assignList(this, prop);
            } else {
                canReflect.assignMap(this, prop);
            }
            return this;
        },
        update: function (prop) {
            if (canReflect.isListLike(prop)) {
                canReflect.updateList(this, prop);
            } else {
                canReflect.updateMap(this, prop);
            }
            return this;
        },
        assignDeep: function (prop) {
            if (canReflect.isListLike(prop)) {
                canReflect.assignDeepList(this, prop);
            } else {
                canReflect.assignDeepMap(this, prop);
            }
            return this;
        },
        updateDeep: function (prop) {
            if (canReflect.isListLike(prop)) {
                canReflect.updateDeepList(this, prop);
            } else {
                canReflect.updateDeepMap(this, prop);
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
            var args = makeArray(arguments), added = [], i, len, listIndex, allSame = args.length > 2, oldLength = this._length;
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
            runningNative = true;
            var removed = splice.apply(this, args);
            runningNative = false;
            queues.batch.start();
            if (howMany > 0) {
                this._triggerChange('' + index, 'remove', undefined, removed);
            }
            if (args.length > 2) {
                this._triggerChange('' + index, 'add', added, removed);
            }
            this.dispatch('length', [
                this._length,
                oldLength
            ]);
            queues.batch.stop();
            return removed;
        },
        serialize: function () {
            return canReflect.serialize(this, CIDMap);
        },
        log: function (key) {
            var instance = this;
            var quoteString = function quoteString(x) {
                return typeof x === 'string' ? JSON.stringify(x) : x;
            };
            var meta = ensureMeta(instance);
            var allowed = meta.allowedLogKeysSet || new Set();
            meta.allowedLogKeysSet = allowed;
            if (key) {
                allowed.add(key);
            }
            meta._log = function (event, data) {
                var type = event.type;
                if (type === 'can.onPatches' || key && !allowed.has(type)) {
                    return;
                }
                if (type === 'add' || type === 'remove') {
                    dev.log(canReflect.getName(instance), '\n how   ', quoteString(type), '\n what  ', quoteString(data[0]), '\n index ', quoteString(data[1]));
                } else {
                    dev.log(canReflect.getName(instance), '\n key ', quoteString(type), '\n is  ', quoteString(data[0]), '\n was ', quoteString(data[1]));
                }
            };
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
            runningNative = true;
            res = orig.apply(this, args);
            runningNative = false;
            if (!this.comparator || args.length) {
                queues.batch.start();
                this._triggerChange('' + len, 'add', args, undefined);
                this.dispatch('length', [
                    this._length,
                    len
                ]);
                queues.batch.stop();
            }
            return res;
        };
    });
    each({
        pop: 'length',
        shift: 0
    }, function (where, name) {
        var orig = [][name];
        DefineList.prototype[name] = function () {
            if (!this._length) {
                return undefined;
            }
            var args = getArgs(arguments), len = where && this._length ? this._length - 1 : 0, oldLength = this._length ? this._length : 0, res;
            runningNative = true;
            res = orig.apply(this, args);
            runningNative = false;
            queues.batch.start();
            this._triggerChange('' + len, 'remove', undefined, [res]);
            this.dispatch('length', [
                this._length,
                oldLength
            ]);
            queues.batch.stop();
            return res;
        };
    });
    each({
        'map': 3,
        'filter': 3,
        'reduce': 4,
        'reduceRight': 4,
        'every': 3,
        'some': 3
    }, function a(fnLength, fnName) {
        DefineList.prototype[fnName] = function () {
            var self = this;
            var args = [].slice.call(arguments, 0);
            var callback = args[0];
            var thisArg = args[fnLength - 1] || self;
            if (typeof callback === 'object') {
                callback = makeFilterCallback(callback);
            }
            args[0] = function () {
                var cbArgs = [].slice.call(arguments, 0);
                cbArgs[fnLength - 3] = self.get(cbArgs[fnLength - 2]);
                return callback.apply(thisArg, cbArgs);
            };
            var ret = Array.prototype[fnName].apply(this, args);
            if (fnName === 'map') {
                return new DefineList(ret);
            } else if (fnName === 'filter') {
                return new self.constructor(ret);
            } else {
                return ret;
            }
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
        lastIndexOf: function (item, fromIndex) {
            fromIndex = typeof fromIndex === 'undefined' ? this.length - 1 : fromIndex;
            for (var i = fromIndex; i >= 0; i--) {
                if (this.get(i) === item) {
                    return i;
                }
            }
            return -1;
        },
        join: function () {
            ObservationRecorder.add(this, 'length');
            return [].join.apply(this, arguments);
        },
        reverse: function () {
            var list = [].reverse.call(this._items());
            return this.replace(list);
        },
        slice: function () {
            ObservationRecorder.add(this, 'length');
            var temp = Array.prototype.slice.apply(this, arguments);
            return new this.constructor(temp);
        },
        concat: function () {
            var args = [];
            each(arguments, function (arg) {
                if (canReflect.isListLike(arg)) {
                    var arr = Array.isArray(arg) ? arg : makeArray(arg);
                    arr.forEach(function (innerArg) {
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
            var patches = diff(this, newList);
            queues.batch.start();
            for (var i = 0, len = patches.length; i < len; i++) {
                this.splice.apply(this, [
                    patches[i].index,
                    patches[i].deleteCount
                ].concat(patches[i].insert));
            }
            queues.batch.stop();
            return this;
        },
        sort: function (compareFunction) {
            var removed = Array.prototype.slice.call(this);
            Array.prototype.sort.call(this, compareFunction);
            var added = Array.prototype.slice.call(this);
            queues.batch.start();
            this.dispatch('remove', [
                removed,
                0
            ]);
            this.dispatch('add', [
                added,
                0
            ]);
            this.dispatch('length', [
                this._length,
                this._length
            ]);
            queues.batch.stop();
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
                ObservationRecorder.add(this, 'length');
            }
            return this._length;
        },
        set: function (newVal) {
            if (runningNative) {
                this._length = newVal;
                return;
            }
            if (newVal == null || isNaN(+newVal) || newVal === this._length) {
                return;
            }
            if (newVal > this._length - 1) {
                var newArr = new Array(newVal - this._length);
                this.push.apply(this, newArr);
            } else {
                this.splice(newVal);
            }
        },
        enumerable: true
    });
    DefineList.prototype.attr = function (prop, value) {
        canLog.warn('DefineMap::attr shouldn\'t be called');
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
        canLog.warn('DefineList::get should should be used instead of DefineList::items');
        return this.get();
    };
    canReflect.assignSymbols(DefineList.prototype, {
        'can.isMoreListLikeThanMapLike': true,
        'can.isMapLike': true,
        'can.isListLike': true,
        'can.isValueLike': false,
        'can.getKeyValue': DefineList.prototype.get,
        'can.setKeyValue': DefineList.prototype.set,
        'can.onKeyValue': function (key, handler, queue) {
            var translationHandler;
            if (isNaN(key)) {
                return onKeyValue.apply(this, arguments);
            } else {
                translationHandler = function () {
                    handler(this[key]);
                };
                Object.defineProperty(translationHandler, 'name', { value: 'translationHandler(' + key + ')::' + canReflect.getName(this) + '.onKeyValue(\'length\',' + canReflect.getName(handler) + ')' });
                singleReference.set(handler, this, translationHandler, key);
                return onKeyValue.call(this, 'length', translationHandler, queue);
            }
        },
        'can.offKeyValue': function (key, handler, queue) {
            var translationHandler;
            if (isNaN(key)) {
                return offKeyValue.apply(this, arguments);
            } else {
                translationHandler = singleReference.getAndDelete(handler, this, key);
                return offKeyValue.call(this, 'length', translationHandler, queue);
            }
        },
        'can.deleteKeyValue': function (prop) {
            prop = isNaN(+prop) || prop % 1 ? prop : +prop;
            if (typeof prop === 'number') {
                this.splice(prop, 1);
            } else if (prop === 'length' || prop === '_length') {
                return;
            } else {
                this.set(prop, undefined);
            }
            return this;
        },
        'can.assignDeep': function (source) {
            queues.batch.start();
            canReflect.assignList(this, source);
            queues.batch.stop();
        },
        'can.updateDeep': function (source) {
            queues.batch.start();
            this.replace(source);
            queues.batch.stop();
        },
        'can.keyHasDependencies': function (key) {
            return !!(this._computed && this._computed[key] && this._computed[key].compute);
        },
        'can.getKeyDependencies': function (key) {
            var ret;
            if (this._computed && this._computed[key] && this._computed[key].compute) {
                ret = {};
                ret.valueDependencies = new CIDSet();
                ret.valueDependencies.add(this._computed[key].compute);
            }
            return ret;
        },
        'can.splice': function (index, deleteCount, insert) {
            this.splice.apply(this, [
                index,
                deleteCount
            ].concat(insert));
        },
        'can.onPatches': function (handler, queue) {
            this[canSymbol.for('can.onKeyValue')](localOnPatchesSymbol, handler, queue);
        },
        'can.offPatches': function (handler, queue) {
            this[canSymbol.for('can.offKeyValue')](localOnPatchesSymbol, handler, queue);
        },
        'can.getName': function () {
            return canReflect.getName(this.constructor) + '[]';
        }
    });
    canReflect.setKeyValue(DefineList.prototype, canSymbol.iterator, function () {
        var index = -1;
        if (typeof this._length !== 'number') {
            this._length = 0;
        }
        return {
            next: function () {
                index++;
                return {
                    value: this[index],
                    done: index >= this._length
                };
            }.bind(this)
        };
    });
    define.DefineList = DefineList;
    module.exports = ns.DefineList = DefineList;
});
/*can-util@3.10.18#js/is-web-worker/is-web-worker*/
define('can-util/js/is-web-worker/is-web-worker', function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = function () {
            return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#js/is-browser-window/is-browser-window*/
define('can-util/js/is-browser-window/is-browser-window', [
    'require',
    'exports',
    'module',
    'can-globals/is-browser-window/is-browser-window'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = require('can-globals/is-browser-window/is-browser-window');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-simple-observable@2.0.0-pre.25#make-compute/make-compute*/
define('can-simple-observable/make-compute/make-compute', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    var canReflect = require('can-reflect');
    var Compute = function (newVal) {
        if (arguments.length) {
            return canReflect.setValue(this, newVal);
        } else {
            return canReflect.getValue(this);
        }
    };
    var translationHelpers = new WeakMap();
    module.exports = function (observable) {
        var compute = Compute.bind(observable);
        compute.on = compute.bind = compute.addEventListener = function (event, handler) {
            var translationHandler = translationHelpers.get(handler);
            if (!translationHandler) {
                translationHandler = function (newVal, oldVal) {
                    handler.call(compute, { type: 'change' }, newVal, oldVal);
                };
                Object.defineProperty(translationHandler, 'name', { value: 'translationHandler(' + event + ')::' + canReflect.getName(observable) + '.onValue(' + canReflect.getName(handler) + ')' });
                translationHelpers.set(handler, translationHandler);
            }
            canReflect.onValue(observable, translationHandler);
        };
        compute.off = compute.unbind = compute.removeEventListener = function (event, handler) {
            canReflect.offValue(observable, translationHelpers.get(handler));
        };
        canReflect.assignSymbols(compute, {
            'can.getValue': function () {
                return canReflect.getValue(observable);
            },
            'can.setValue': function (newVal) {
                return canReflect.setValue(observable, newVal);
            },
            'can.onValue': function (handler, queue) {
                return canReflect.onValue(observable, handler, queue);
            },
            'can.offValue': function (handler, queue) {
                return canReflect.offValue(observable, handler, queue);
            },
            'can.valueHasDependencies': function () {
                return canReflect.valueHasDependencies(observable);
            },
            'can.getPriority': function () {
                return canReflect.getPriority(observable);
            },
            'can.setPriority': function (newPriority) {
                canReflect.setPriority(observable, newPriority);
            },
            'can.isValueLike': true,
            'can.isFunctionLike': false
        });
        compute.isComputed = true;
        return compute;
    };
});
/*can-util@3.10.18#js/diff-object/diff-object*/
define('can-util/js/diff-object/diff-object', [
    'require',
    'exports',
    'module',
    'can-assign'
], function (require, exports, module) {
    'use strict';
    var assign = require('can-assign');
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
/*can-route@4.0.0-pre.13#src/binding-proxy*/
define('can-route/src/binding-proxy', [
    'require',
    'exports',
    'module',
    'can-util/js/make-array/make-array',
    'can-symbol',
    'can-simple-observable'
], function (require, exports, module) {
    var makeArray = require('can-util/js/make-array/make-array');
    var canSymbol = require('can-symbol');
    var SimpleObservable = require('can-simple-observable');
    var defaultBinding = new SimpleObservable('hashchange');
    var bindingProxy = {
        get defaultBinding() {
            return defaultBinding.get();
        },
        set defaultBinding(newVal) {
            defaultBinding.set(newVal);
        },
        currentBinding: null,
        bindings: {},
        call: function () {
            var args = makeArray(arguments), prop = args.shift(), binding = bindingProxy.bindings[bindingProxy.currentBinding || bindingProxy.defaultBinding], method = binding[prop.indexOf('can.') === 0 ? canSymbol.for(prop) : prop];
            if (method.apply) {
                return method.apply(binding, args);
            } else {
                return method;
            }
        }
    };
    module.exports = bindingProxy;
});
/*can-route@4.0.0-pre.13#src/regexps*/
define('can-route/src/regexps', function (require, exports, module) {
    module.exports = {
        curlies: /\{\s*([\w.]+)\s*\}/g,
        colon: /\:([\w.]+)/g
    };
});
/*can-route@4.0.0-pre.13#src/register*/
define('can-route/src/register', [
    'require',
    'exports',
    'module',
    'can-util/js/diff/diff',
    'can-util/js/diff-object/diff-object',
    'can-util/js/dev/dev',
    'can-util/js/each/each',
    'can-route/src/binding-proxy',
    'can-route/src/regexps'
], function (require, exports, module) {
    var diff = require('can-util/js/diff/diff');
    var diffObject = require('can-util/js/diff-object/diff-object');
    var dev = require('can-util/js/dev/dev');
    var each = require('can-util/js/each/each');
    var bindingProxy = require('can-route/src/binding-proxy');
    var regexps = require('can-route/src/regexps');
    var removeBackslash = function (str) {
        return str.replace(/\\/g, '');
    };
    var wrapQuote = function (str) {
        return (str + '').replace(/([.?*+\^$\[\]\\(){}|\-])/g, '\\$1');
    };
    var RouteRegistry = {
        routes: {},
        register: function registerRoute(url, defaults) {
            var root = bindingProxy.call('root');
            if (root.lastIndexOf('/') === root.length - 1 && url.indexOf('/') === 0) {
                url = url.substr(1);
            }
            defaults = defaults || {};
            var names = [], res, test = '', matcher, lastIndex, next, querySeparator = bindingProxy.call('querySeparator'), matchSlashes = bindingProxy.call('matchSlashes');
            if (regexps.colon.test(url)) {
                matcher = regexps.colon;
                dev.warn('update route "' + url + '" to "' + url.replace(regexps.colon, function (name, key) {
                    return '{' + key + '}';
                }) + '"');
            } else {
                matcher = regexps.curlies;
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
            each(RouteRegistry.routes, function (r) {
                var existingKeys = r.names.concat(Object.keys(r.defaults)).sort();
                var keys = names.concat(Object.keys(defaults)).sort();
                var sameMapKeys = !diff(existingKeys, keys).length;
                var sameDefaultValues = !diffObject(r.defaults, defaults).length;
                var matchingRoutesWithoutTrailingSlash = r.route.replace(/\/$/, '') === url.replace(/\/$/, '');
                if (sameMapKeys && sameDefaultValues && !matchingRoutesWithoutTrailingSlash) {
                    dev.warn('two routes were registered with matching keys:\n' + '\t(1) route("' + r.route + '", ' + JSON.stringify(r.defaults) + ')\n' + '\t(2) route("' + url + '", ' + JSON.stringify(defaults) + ')\n' + '(1) will always be chosen since it was registered first');
                }
            });
            return RouteRegistry.routes[url] = {
                test: new RegExp('^' + test + '($|' + wrapQuote(querySeparator) + ')'),
                route: url,
                names: names,
                defaults: defaults,
                length: url.split('/').length
            };
        }
    };
    module.exports = RouteRegistry;
});
/*can-deparam@1.0.3#can-deparam*/
define('can-deparam', [
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    var digitTest = /^\d+$/, keyBreaker = /([^\[\]]+)|(\[\])/g, paramTest = /([^?#]*)(#.*)?$/, entityRegex = /%([^0-9a-f][0-9a-f]|[0-9a-f][^0-9a-f]|[^0-9a-f][^0-9a-f])/i, prep = function (str) {
            str = str.replace(/\+/g, ' ');
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return decodeURIComponent(str.replace(entityRegex, function (match, hex) {
                    return '%25' + hex;
                }));
            }
        };
    module.exports = namespace.deparam = function (params) {
        var data = {}, pairs, lastPart;
        if (params && paramTest.test(params)) {
            pairs = params.split('&');
            pairs.forEach(function (pair) {
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
/*can-route@4.0.0-pre.13#src/deparam*/
define('can-route/src/deparam', [
    'require',
    'exports',
    'module',
    'can-deparam',
    'can-util/js/each/each',
    'can-util/js/deep-assign/deep-assign',
    'can-route/src/binding-proxy',
    'can-route/src/register'
], function (require, exports, module) {
    var deparam = require('can-deparam');
    var each = require('can-util/js/each/each');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var bindingProxy = require('can-route/src/binding-proxy');
    var register = require('can-route/src/register');
    var decode = function (str) {
        try {
            return decodeURIComponent(str);
        } catch (ex) {
            return unescape(str);
        }
    };
    module.exports = function canRoute_deparam(url) {
        var root = bindingProxy.call('root');
        if (root.lastIndexOf('/') === root.length - 1 && url.indexOf('/') === 0) {
            url = url.substr(1);
        }
        var route = { length: -1 }, querySeparator = bindingProxy.call('querySeparator'), paramsMatcher = bindingProxy.call('paramsMatcher');
        each(register.routes, function (temp, name) {
            if (temp.test.test(url) && temp.length > route.length) {
                route = temp;
            }
        });
        if (route.length > -1) {
            var parts = url.match(route.test), start = parts.shift(), remainder = url.substr(start.length - (parts[parts.length - 1] === querySeparator ? 1 : 0)), obj = remainder && paramsMatcher.test(remainder) ? deparam(remainder.slice(1)) : {};
            obj = deepAssign(true, {}, route.defaults, obj);
            each(parts, function (part, i) {
                if (part && part !== querySeparator) {
                    obj[route.names[i]] = decode(part);
                }
            });
            obj.route = route.route;
            return obj;
        }
        if (url.charAt(0) !== querySeparator) {
            url = querySeparator + url;
        }
        return paramsMatcher.test(url) ? deparam(url.slice(1)) : {};
    };
});
/*can-route@4.0.0-pre.13#src/param*/
define('can-route/src/param', [
    'require',
    'exports',
    'module',
    'can-util/js/each/each',
    'can-util/js/assign/assign',
    'can-util/js/is-empty-object/is-empty-object',
    'can-param',
    'can-route/src/register',
    'can-route/src/regexps',
    'can-route/src/binding-proxy'
], function (require, exports, module) {
    var each = require('can-util/js/each/each');
    var assign = require('can-util/js/assign/assign');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var param = require('can-param');
    var register = require('can-route/src/register');
    var regexps = require('can-route/src/regexps');
    var bindingProxy = require('can-route/src/binding-proxy');
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
    function getMatchedRoute(data) {
        var route, matches = 0, matchCount, routeName = data.route, propCount = 0;
        delete data.route;
        each(data, function () {
            propCount++;
        });
        each(register.routes, function (temp, name) {
            matchCount = matchesData(temp, data);
            if (matchCount > matches) {
                route = temp;
                matches = matchCount;
            }
            if (matchCount >= propCount) {
                return false;
            }
        });
        if (register.routes[routeName] && matchesData(register.routes[routeName], data) === matches) {
            route = register.routes[routeName];
        }
        return route;
    }
    function paramFromRoute(route, data) {
        var cpy, res, after, matcher;
        if (route) {
            cpy = assign({}, data);
            matcher = regexps.colon.test(route.route) ? regexps.colon : regexps.curlies;
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
            return res + (after ? bindingProxy.call('querySeparator') + after : '');
        }
        return isEmptyObject(data) ? '' : bindingProxy.call('querySeparator') + param(data);
    }
    function canRoute_param(data) {
        return paramFromRoute(getMatchedRoute(data), data);
    }
    module.exports = canRoute_param;
    canRoute_param.paramFromRoute = paramFromRoute;
    canRoute_param.getMatchedRoute = getMatchedRoute;
});
/*can-route@4.0.0-pre.13#src/url-helpers*/
define('can-route/src/url-helpers', [
    'require',
    'exports',
    'module',
    'can-route/src/binding-proxy',
    'can-route/src/deparam',
    'can-route/src/param',
    'can-util/js/assign/assign',
    'can-util/js/each/each',
    'can-util/js/string/string'
], function (require, exports, module) {
    var bindingProxy = require('can-route/src/binding-proxy');
    var routeDeparam = require('can-route/src/deparam');
    var routeParam = require('can-route/src/param');
    var assign = require('can-util/js/assign/assign');
    var each = require('can-util/js/each/each');
    var string = require('can-util/js/string/string');
    var makeProps = function (props) {
        var tags = [];
        each(props, function (val, name) {
            tags.push((name === 'className' ? 'class' : name) + '="' + (name === 'href' ? val : string.esc(val)) + '"');
        });
        return tags.join(' ');
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
    function canRoute_url(options, merge) {
        if (merge) {
            var baseOptions = routeDeparam(bindingProxy.call('can.getValue'));
            options = assign(assign({}, baseOptions), options);
        }
        return bindingProxy.call('root') + routeParam(options);
    }
    module.exports = {
        url: canRoute_url,
        link: function canRoute_link(name, options, props, merge) {
            return '<a ' + makeProps(assign({ href: canRoute_url(options, merge) }, props)) + '>' + name + '</a>';
        },
        current: function canRoute_current(options, subsetMatch) {
            if (subsetMatch) {
                var baseOptions = routeDeparam(bindingProxy.call('can.getValue'));
                return matchCheck(options, baseOptions);
            } else {
                return bindingProxy.call('can.getValue') === routeParam(options);
            }
        }
    };
});
/*can-globals@0.3.0#location/location*/
define('can-globals/location/location', [
    'require',
    'exports',
    'module',
    'can-globals/global/global',
    'can-globals/can-globals-instance'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        require('can-globals/global/global');
        var globals = require('can-globals/can-globals-instance');
        globals.define('location', function () {
            return globals.getKeyValue('global').location;
        });
        module.exports = globals.makeExport('location');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-route@4.0.0-pre.13#src/hashchange*/
define('can-route/src/hashchange', [
    'require',
    'exports',
    'module',
    'can-globals/location/location',
    'can-reflect',
    'can-util/dom/events/events',
    'can-observation-recorder',
    'can-queues',
    'can-key-tree',
    'can-simple-observable'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var paramsMatcher = /^(?:&[^=]+=[^&]*)+/;
        var LOCATION = require('can-globals/location/location');
        var canReflect = require('can-reflect');
        var domEvents = require('can-util/dom/events/events');
        var ObservationRecorder = require('can-observation-recorder');
        var queues = require('can-queues');
        var KeyTree = require('can-key-tree');
        var SimpleObservable = require('can-simple-observable');
        function getHash() {
            var loc = LOCATION();
            return loc.href.split(/#!?/)[1] || '';
        }
        function HashchangeObservable() {
            var dispatchHandlers = this.dispatchHandlers.bind(this);
            var self = this;
            this.handlers = new KeyTree([
                Object,
                Array
            ], {
                onFirst: function () {
                    self.value = getHash();
                    domEvents.addEventListener.call(window, 'hashchange', dispatchHandlers);
                },
                onEmpty: function () {
                    domEvents.removeEventListener.call(window, 'hashchange', dispatchHandlers);
                }
            });
        }
        HashchangeObservable.prototype = Object.create(SimpleObservable.prototype);
        HashchangeObservable.constructor = HashchangeObservable;
        canReflect.assign(HashchangeObservable.prototype, {
            paramsMatcher: paramsMatcher,
            querySeparator: '&',
            matchSlashes: false,
            root: '#!',
            dispatchHandlers: function () {
                var old = this.value;
                this.value = getHash();
                if (old !== this.value) {
                    queues.enqueueByQueue(this.handlers.getNode([]), this, [
                        this.value,
                        old
                    ], null, [
                        canReflect.getName(this),
                        'changed to',
                        this.value,
                        'from',
                        old
                    ]);
                }
            },
            get: function () {
                ObservationRecorder.add(this);
                return getHash();
            },
            set: function (path) {
                var loc = LOCATION();
                if (loc.hash !== '#' + path) {
                    loc.hash = '!' + path;
                }
                return path;
            }
        });
        canReflect.assignSymbols(HashchangeObservable.prototype, {
            'can.getValue': HashchangeObservable.prototype.get,
            'can.setValue': HashchangeObservable.prototype.set,
            'can.onValue': HashchangeObservable.prototype.on,
            'can.offValue': HashchangeObservable.prototype.off,
            'can.isMapLike': false,
            'can.valueHasDependencies': function () {
                return true;
            },
            'can.getName': function () {
                return 'HashchangeObservable<' + this.value + '>';
            }
        });
        module.exports = new HashchangeObservable();
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-route@4.0.0-pre.13#can-route*/
define('can-route', [
    'require',
    'exports',
    'module',
    'can-queues',
    'can-observation',
    'can-namespace',
    'can-log/dev/dev',
    'can-util/js/each/each',
    'can-util/js/is-function/is-function',
    'can-util/js/is-web-worker/is-web-worker',
    'can-util/js/is-browser-window/is-browser-window',
    'can-util/js/assign/assign',
    'can-reflect',
    'can-symbol',
    'can-simple-observable/make-compute/make-compute',
    'can-simple-map',
    'can-route/src/register',
    'can-route/src/url-helpers',
    'can-route/src/param',
    'can-route/src/deparam',
    'can-route/src/binding-proxy',
    'can-route/src/hashchange'
], function (require, exports, module) {
    var queues = require('can-queues');
    var Observation = require('can-observation');
    var namespace = require('can-namespace');
    var devLog = require('can-log/dev/dev');
    var each = require('can-util/js/each/each');
    var isFunction = require('can-util/js/is-function/is-function');
    var isWebWorker = require('can-util/js/is-web-worker/is-web-worker');
    var isBrowserWindow = require('can-util/js/is-browser-window/is-browser-window');
    var assign = require('can-util/js/assign/assign');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var makeCompute = require('can-simple-observable/make-compute/make-compute');
    var SimpleMap = require('can-simple-map');
    var registerRoute = require('can-route/src/register');
    var urlHelpers = require('can-route/src/url-helpers');
    var routeParam = require('can-route/src/param');
    var routeDeparam = require('can-route/src/deparam');
    var bindingProxy = require('can-route/src/binding-proxy');
    var hashchange = require('can-route/src/hashchange');
    bindingProxy.bindings.hashchange = hashchange;
    bindingProxy.defaultBinding = 'hashchange';
    function canRoute(url, defaults) {
        registerRoute.register(url, defaults);
        return canRoute;
    }
    var timer;
    var matchedObservable = new Observation(function canRoute_matchedRoute() {
        var url = bindingProxy.call('can.getValue');
        return canRoute.deparam(url).route;
    });
    function updateUrl(serializedData) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            var serialized = canReflect.serialize(canRoute.data), route = routeParam.getMatchedRoute(serialized), path = routeParam.paramFromRoute(route, serialized);
            bindingProxy.call('can.setValue', path);
        }, 10);
    }
    Object.defineProperty(updateUrl, 'name', { value: 'can-route.updateUrl' });
    function updateRouteData() {
        var hash = bindingProxy.call('can.getValue');
        queues.batch.start();
        var state = canRoute.deparam(hash);
        delete state.route;
        canReflect.update(canRoute.data, state);
        queues.batch.stop();
    }
    Object.defineProperty(updateRouteData, 'name', { value: 'can-route.updateRouteData' });
    Object.defineProperty(canRoute, 'routes', {
        get: function () {
            return registerRoute.routes;
        },
        set: function (newVal) {
            return registerRoute.routes = newVal;
        }
    });
    Object.defineProperty(canRoute, 'defaultBinding', {
        get: function () {
            return bindingProxy.defaultBinding;
        },
        set: function (newVal) {
            bindingProxy.defaultBinding = newVal;
        }
    });
    Object.defineProperty(canRoute, 'currentBinding', {
        get: function () {
            return bindingProxy.currentBinding;
        },
        set: function (newVal) {
            bindingProxy.currentBinding = newVal;
        }
    });
    assign(canRoute, {
        param: routeParam,
        deparam: routeDeparam,
        map: function (data) {
            devLog.warn('Set route.data directly instead of calling route.map');
            canRoute.data = data;
        },
        start: function (val) {
            if (val !== true) {
                canRoute._setup();
                if (isBrowserWindow() || isWebWorker()) {
                    var hash = bindingProxy.call('can.getValue');
                    queues.batch.start();
                    var state = canRoute.deparam(hash);
                    delete state.route;
                    canReflect.assign(canRoute.data, state);
                    queues.batch.stop();
                }
            }
            return canRoute;
        },
        url: urlHelpers.url,
        link: urlHelpers.link,
        current: urlHelpers.current,
        bindings: bindingProxy.bindings,
        _setup: function () {
            if (!canRoute.currentBinding) {
                bindingProxy.call('can.onValue', updateRouteData);
                canReflect.onValue(canRoute.serializedObservation, updateUrl, 'notify');
                canRoute.currentBinding = canRoute.defaultBinding;
            }
        },
        _teardown: function () {
            if (canRoute.currentBinding) {
                bindingProxy.call('can.offValue', updateRouteData);
                canReflect.offValue(canRoute.serializedObservation, updateUrl, 'notify');
                canRoute.currentBinding = null;
            }
            clearTimeout(timer);
        },
        matched: makeCompute(matchedObservable)
    });
    var bindToCanRouteData = function (name, args) {
        if (!canRoute.data[name]) {
            return canRoute.data.addEventListener.apply(canRoute.data, args);
        }
        return canRoute.data[name].apply(canRoute.data, args);
    };
    each([
        'addEventListener',
        'removeEventListener',
        'bind',
        'unbind',
        'on',
        'off'
    ], function (name) {
        canRoute[name] = function (eventName, handler) {
            if (eventName === '__url') {
                return bindingProxy.call('can.onValue', handler);
            }
            return bindToCanRouteData(name, arguments);
        };
    });
    each([
        'delegate',
        'undelegate',
        'removeAttr',
        'compute',
        '_get',
        '___get',
        'each'
    ], function (name) {
        canRoute[name] = function () {
            return bindToCanRouteData(name, arguments);
        };
    });
    var routeData;
    var setRouteData = function (data) {
        routeData = data;
        return routeData;
    };
    var serializedObservation;
    var serializedCompute;
    Object.defineProperty(canRoute, 'serializedObservation', {
        get: function () {
            if (!serializedObservation) {
                serializedObservation = new Observation(function canRoute_data_serialized() {
                    return canReflect.serialize(canRoute.data);
                });
            }
            return serializedObservation;
        }
    });
    Object.defineProperty(canRoute, 'serializedCompute', {
        get: function () {
            if (!serializedCompute) {
                serializedCompute = makeCompute(canRoute.serializedObservation);
            }
            return serializedCompute;
        }
    });
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
    var stringCoercingMapDecorator = function (map) {
        var sym = canSymbol.for('can.route.stringCoercingMapDecorator');
        if (!map.attr[sym]) {
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
            canReflect.setKeyValue(map.attr, sym, true);
        }
        return map;
    };
    Object.defineProperty(canRoute, 'data', {
        get: function () {
            if (routeData) {
                return routeData;
            } else {
                return setRouteData(stringCoercingMapDecorator(new SimpleMap()));
            }
        },
        set: function (data) {
            if (canReflect.isConstructorLike(data)) {
                data = new data();
            }
            if ('attr' in data) {
                setRouteData(stringCoercingMapDecorator(data));
            } else {
                setRouteData(data);
            }
        }
    });
    canRoute.attr = function (prop, value) {
        console.warn('can-route: can-route.attr is deprecated. Use methods on can-route.data instead.');
        if ('attr' in canRoute.data) {
            return canRoute.data.attr.apply(canRoute.data, arguments);
        } else {
            if (arguments.length > 1) {
                canReflect.setKeyValue(canRoute.data, prop, value);
                return canRoute.data;
            } else if (typeof prop === 'object') {
                canReflect.assignDeep(canRoute.data, prop);
                return canRoute.data;
            } else if (arguments.length === 1) {
                return canReflect.getKeyValue(canRoute.data, prop);
            } else {
                return canReflect.unwrap(canRoute.data);
            }
        }
    };
    canReflect.setKeyValue(canRoute, canSymbol.for('can.isFunctionLike'), false);
    module.exports = namespace.route = canRoute;
});
/*can-view-target@3.1.6#can-view-target*/
define('can-view-target', [
    'require',
    'exports',
    'module',
    'can-util/dom/child-nodes/child-nodes',
    'can-util/dom/attr/attr',
    'can-util/js/each/each',
    'can-util/js/make-array/make-array',
    'can-globals/document/document',
    'can-util/dom/mutate/mutate',
    'can-namespace',
    'can-globals/mutation-observer/mutation-observer'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var childNodes = require('can-util/dom/child-nodes/child-nodes');
        var domAttr = require('can-util/dom/attr/attr');
        var each = require('can-util/js/each/each');
        var makeArray = require('can-util/js/make-array/make-array');
        var getDocument = require('can-globals/document/document');
        var domMutate = require('can-util/dom/mutate/mutate');
        var namespace = require('can-namespace');
        var MUTATION_OBSERVER = require('can-globals/mutation-observer/mutation-observer');
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
                if (node.namespaceURI !== 'http://www.w3.org/1999/xhtml' && namespacesWork && document.createElementNS) {
                    copy = document.createElementNS(node.namespaceURI, node.nodeName);
                } else {
                    copy = document.createElement(node.nodeName);
                }
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
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-stache@4.0.0-pre.38#src/mustache_core*/
define('can-stache/src/mustache_core', [
    'require',
    'exports',
    'module',
    'can-view-live',
    'can-view-nodelist',
    'can-observation',
    'can-observation-recorder',
    'can-stache/src/utils',
    'can-stache/src/expression',
    'can-util/dom/frag/frag',
    'can-util/dom/attr/attr',
    'can-symbol',
    'can-reflect',
    'can-log/dev/dev'
], function (require, exports, module) {
    var live = require('can-view-live');
    var nodeLists = require('can-view-nodelist');
    var Observation = require('can-observation');
    var ObservationRecorder = require('can-observation-recorder');
    var utils = require('can-stache/src/utils');
    var expression = require('can-stache/src/expression');
    var frag = require('can-util/dom/frag/frag');
    var attr = require('can-util/dom/attr/attr');
    var canSymbol = require('can-symbol');
    var canReflect = require('can-reflect');
    var dev = require('can-log/dev/dev');
    var mustacheLineBreakRegExp = /(?:(^|\r?\n)(\s*)(\{\{([\s\S]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([\s\S]*)\}\}\}?)/g, mustacheWhitespaceRegExp = /(\s*)(\{\{\{?)(-?)([\s\S]*?)(-?)(\}\}\}?)(\s*)/g, k = function () {
        };
    var core = {
        expression: expression,
        makeEvaluator: function (scope, nodeList, mode, exprData, truthyRenderer, falseyRenderer, stringOnly) {
            if (mode === '^') {
                var temp = truthyRenderer;
                truthyRenderer = falseyRenderer;
                falseyRenderer = temp;
            }
            var value, helperOptionArg;
            if (exprData instanceof expression.Call) {
                helperOptionArg = {
                    stringOnly: stringOnly,
                    context: scope.peek('this'),
                    scope: scope,
                    nodeList: nodeList,
                    exprData: exprData
                };
                utils.convertToScopes(helperOptionArg, scope, nodeList, truthyRenderer, falseyRenderer, stringOnly);
                scope = scope.add({ helperOptions: helperOptionArg }, { special: true });
                value = exprData.value(scope, helperOptionArg);
                if (exprData.isHelper) {
                    return value;
                }
            } else if (exprData instanceof expression.Bracket) {
                value = exprData.value(scope);
            } else if (exprData instanceof expression.Lookup) {
                value = exprData.value(scope);
            } else if (exprData instanceof expression.Helper && exprData.methodExpr instanceof expression.Bracket) {
                value = exprData.methodExpr.value(scope);
            } else {
                var readOptions = {
                    isArgument: true,
                    args: [
                        scope.peek('this'),
                        scope
                    ],
                    asCompute: true
                };
                value = exprData.helperValue(scope, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
                if (value.isHelper) {
                    return exprData.evaluator(value, scope, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
                }
            }
            if (!mode) {
                return value;
            } else if (mode === '#' || mode === '^') {
                helperOptionArg = {};
                utils.convertToScopes(helperOptionArg, scope, nodeList, truthyRenderer, falseyRenderer, stringOnly);
                return function () {
                    var finalValue = canReflect.getValue(value);
                    if (typeof finalValue === 'function') {
                        return finalValue;
                    } else if (typeof finalValue !== 'string' && utils.isArrayLike(finalValue)) {
                        var isObserveList = canReflect.isObservableLike(finalValue) && canReflect.isListLike(finalValue);
                        if (canReflect.getKeyValue(finalValue, 'length')) {
                            if (stringOnly) {
                                return utils.getItemsStringContent(finalValue, isObserveList, helperOptionArg);
                            } else {
                                return frag(utils.getItemsFragContent(finalValue, helperOptionArg, scope));
                            }
                        } else {
                            return helperOptionArg.inverse(scope);
                        }
                    } else {
                        return finalValue ? helperOptionArg.fn(finalValue || scope) : helperOptionArg.inverse(scope);
                    }
                };
            } else {
            }
        },
        makeLiveBindingPartialRenderer: function (expressionString, state, lineNo) {
            expressionString = expressionString.trim();
            var exprData, partialName = expressionString.split(/\s+/).shift();
            if (partialName !== expressionString) {
                exprData = core.expression.parse(expressionString);
            }
            return function (scope, parentSectionNodeList) {
                scope.set('scope.lineNumber', lineNo);
                var nodeList = [this];
                nodeList.expression = '>' + partialName;
                nodeLists.register(nodeList, null, parentSectionNodeList || true, state.directlyNested);
                var partialFrag = new Observation(function () {
                    var localPartialName = partialName;
                    if (exprData && exprData.argExprs.length === 1) {
                        var newContext = canReflect.getValue(exprData.argExprs[0].value(scope));
                        if (typeof newContext === 'undefined') {
                            dev.warn('The context (' + exprData.argExprs[0].key + ') you passed into the' + 'partial (' + partialName + ') is not defined in the scope!');
                        } else {
                            scope = scope.add(newContext);
                        }
                    }
                    var partial = canReflect.getKeyValue(scope.templateContext.partials, localPartialName);
                    var renderer;
                    if (partial) {
                        renderer = function () {
                            return partial.render ? partial.render(scope, nodeList) : partial(scope);
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
                                return localPartialName(scope, {}, nodeList);
                            } else {
                                return core.getTemplateById(localPartialName)(scope, {}, nodeList);
                            }
                        };
                    }
                    var res = ObservationRecorder.ignore(renderer)();
                    return frag(res);
                });
                canReflect.setPriority(partialFrag, nodeList.nesting);
                live.html(this, partialFrag, this.parentNode, nodeList);
            };
        },
        makeStringBranchRenderer: function (mode, expressionString, lineNo) {
            var exprData = core.expression.parse(expressionString), fullExpression = mode + expressionString;
            if (!(exprData instanceof expression.Helper) && !(exprData instanceof expression.Call)) {
                exprData = new expression.Helper(exprData, [], {});
            }
            var branchRenderer = function branchRenderer(scope, truthyRenderer, falseyRenderer) {
                scope.set('scope.lineNumber', lineNo);
                var evaluator = scope.__cache[fullExpression];
                if (mode || !evaluator) {
                    evaluator = makeEvaluator(scope, null, mode, exprData, truthyRenderer, falseyRenderer, true);
                    if (!mode) {
                        scope.__cache[fullExpression] = evaluator;
                    }
                }
                var gotObservableValue = evaluator[canSymbol.for('can.onValue')], res;
                if (gotObservableValue) {
                    res = canReflect.getValue(evaluator);
                } else {
                    res = evaluator();
                }
                return res == null ? '' : '' + res;
            };
            branchRenderer.exprData = exprData;
            return branchRenderer;
        },
        makeLiveBindingBranchRenderer: function (mode, expressionString, state, lineNo) {
            var exprData = core.expression.parse(expressionString);
            if (!(exprData instanceof expression.Helper) && !(exprData instanceof expression.Call) && !(exprData instanceof expression.Bracket) && !(exprData instanceof expression.Lookup)) {
                exprData = new expression.Helper(exprData, [], {});
            }
            var branchRenderer = function branchRenderer(scope, parentSectionNodeList, truthyRenderer, falseyRenderer) {
                var stringOnly = state.tag;
                scope.set('scope.lineNumber', lineNo);
                var nodeList = [this];
                nodeList.expression = expressionString;
                nodeLists.register(nodeList, null, parentSectionNodeList || true, state.directlyNested);
                var evaluator = makeEvaluator(scope, nodeList, mode, exprData, truthyRenderer, falseyRenderer, stringOnly);
                var gotObservableValue = evaluator[canSymbol.for('can.onValue')];
                var observable;
                if (gotObservableValue) {
                    observable = evaluator;
                } else {
                    Object.defineProperty(evaluator, 'name', { value: '{{' + expressionString + '}}' });
                    observable = new Observation(evaluator, null, { isObservable: false });
                }
                if (canReflect.setPriority(observable, nodeList.nesting) === false) {
                    throw new Error('can-stache unable to set priority on observable');
                }
                canReflect.onValue(observable, k);
                var value = canReflect.getValue(observable);
                if (typeof value === 'function' && !(exprData instanceof expression.Lookup)) {
                    ObservationRecorder.ignore(value)(this);
                } else if (canReflect.valueHasDependencies(observable)) {
                    if (state.attr) {
                        live.attr(this, state.attr, observable);
                    } else if (state.tag) {
                        live.attrs(this, observable);
                    } else if (state.text && typeof value !== 'object') {
                        live.text(this, observable, this.parentNode, nodeList);
                    } else {
                        live.html(this, observable, this.parentNode, nodeList);
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
                canReflect.offValue(observable, k);
            };
            branchRenderer.exprData = exprData;
            return branchRenderer;
        },
        splitModeFromExpression: function (expression, state, lineNo) {
            expression = expression.trim();
            var mode = expression.charAt(0);
            if ('#/{&^>!<'.indexOf(mode) >= 0) {
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
                    spaceBefore = returnBefore + spaceBefore && ' ';
                    return spaceBefore + special + (matchIndex !== 0 && returnAfter.length ? returnBefore + '\n' : '');
                } else {
                    return spaceBefore + special + spaceAfter + (spaceBefore.length || matchIndex !== 0 ? returnBefore + '\n' : '');
                }
            });
        },
        cleanWhitespaceControl: function (template) {
            return template.replace(mustacheWhitespaceRegExp, function (whole, spaceBefore, bracketBefore, controlBefore, expression, controlAfter, bracketAfter, spaceAfter, matchIndex) {
                if (controlBefore === '-') {
                    spaceBefore = '';
                }
                if (controlAfter === '-') {
                    spaceAfter = '';
                }
                return spaceBefore + bracketBefore + expression + bracketAfter + spaceAfter;
            });
        },
        getTemplateById: function () {
        }
    };
    var makeEvaluator = core.makeEvaluator, splitModeFromExpression = core.splitModeFromExpression;
    module.exports = core;
});
/*can-stache@4.0.0-pre.38#src/html_section*/
define('can-stache/src/html_section', [
    'require',
    'exports',
    'module',
    'can-view-target',
    'can-view-scope',
    'can-observation',
    'can-observation-recorder',
    'can-reflect',
    'can-stache/src/utils',
    'can-stache/src/mustache_core',
    'can-globals/document/document',
    'can-assign',
    'can-util/js/last/last'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var target = require('can-view-target');
        var Scope = require('can-view-scope');
        var Observation = require('can-observation');
        var ObservationRecorder = require('can-observation-recorder');
        var canReflect = require('can-reflect');
        var utils = require('can-stache/src/utils');
        var mustacheCore = require('can-stache/src/mustache_core');
        var getDocument = require('can-globals/document/document');
        var assign = require('can-assign');
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
        var HTMLSectionBuilder = function (filename) {
            if (filename) {
                this.filename = filename;
            }
            this.stack = [new HTMLSection()];
        };
        HTMLSectionBuilder.scopify = function (renderer) {
            return ObservationRecorder.ignore(function (scope, options, nodeList) {
                if (!(scope instanceof Scope)) {
                    scope = new Scope(scope || {});
                }
                if (nodeList === undefined && canReflect.isListLike(options)) {
                    nodeList = options;
                    options = undefined;
                }
                if (options && !options.helpers && !options.partials && !options.tags) {
                    options = { helpers: options };
                }
                canReflect.eachKey(options && options.helpers, function (helperValue) {
                    helperValue.isHelper = true;
                });
                var templateContext = scope.templateContext;
                canReflect.eachKey(options, function (optionValues, optionKey) {
                    var container = templateContext[optionKey];
                    if (container) {
                        canReflect.eachKey(optionValues, function (optionValue, optionValueKey) {
                            canReflect.setKeyValue(container, optionValueKey, optionValue);
                        });
                    }
                });
                return renderer(scope, nodeList);
            });
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
                return ObservationRecorder.ignore(function (scope, nodeList) {
                    if (!(scope instanceof Scope)) {
                        scope = new Scope(scope || {});
                    }
                    return compiled.hydrate(scope, nodeList);
                });
            },
            push: function (chars) {
                this.last().push(chars);
            },
            pop: function () {
                return this.last().pop();
            },
            removeCurrentNode: function () {
                this.last().removeCurrentNode();
            }
        });
        var HTMLSection = function (process) {
            this.data = 'targetData';
            this.targetData = [];
            this.targetStack = [];
            var self = this;
            this.targetCallback = function (scope, sectionNode) {
                process.call(this, scope, sectionNode, self.compiled.hydrate.bind(self.compiled), self.inverseCompiled && self.inverseCompiled.hydrate.bind(self.inverseCompiled));
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
            removeCurrentNode: function () {
                var children = this.children();
                return children.pop();
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
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-stache@4.0.0-pre.38#src/text_section*/
define('can-stache/src/text_section', [
    'require',
    'exports',
    'module',
    'can-view-live',
    'can-stache/src/utils',
    'can-util/dom/attr/attr',
    'can-assign',
    'can-reflect',
    'can-observation'
], function (require, exports, module) {
    var live = require('can-view-live');
    var utils = require('can-stache/src/utils');
    var attr = require('can-util/dom/attr/attr');
    var assign = require('can-assign');
    var canReflect = require('can-reflect');
    var Observation = require('can-observation');
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
            Object.defineProperty(renderer, 'name', { value: 'textSectionRenderer<' + state.tag + '.' + state.attr + '>' });
            return function (scope) {
                function textSectionRender() {
                    return renderer(scope);
                }
                Object.defineProperty(textSectionRender, 'name', { value: 'textSectionRender<' + state.tag + '.' + state.attr + '>' });
                var observation = new Observation(textSectionRender, null, { isObservable: false });
                canReflect.onValue(observation, noop);
                var value = canReflect.getValue(observation);
                if (canReflect.valueHasDependencies(observation)) {
                    if (state.textContentOnly) {
                        live.text(this, observation);
                    } else if (state.attr) {
                        live.attr(this, state.attr, observation);
                    } else {
                        live.attrs(this, observation, scope);
                    }
                    canReflect.offValue(observation, noop);
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
        return function (scope) {
            return process.call(this, scope, truthy, falsey);
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
            return function (scope) {
                var txt = '', value;
                for (var i = 0; i < len; i++) {
                    value = values[i];
                    txt += typeof value === 'string' ? value : value.call(this, scope);
                }
                return txt;
            };
        }
    });
    module.exports = TextSectionBuilder;
});
/*can-stache@4.0.0-pre.38#helpers/converter*/
define('can-stache/helpers/converter', [
    'require',
    'exports',
    'module',
    'can-stache/helpers/core',
    'can-stache/src/set-identifier',
    'can-reflect'
], function (require, exports, module) {
    var helpers = require('can-stache/helpers/core');
    var SetIdentifier = require('can-stache/src/set-identifier');
    var canReflect = require('can-reflect');
    helpers.registerConverter = function (name, getterSetter) {
        getterSetter = getterSetter || {};
        helpers.registerHelper(name, function (newVal, source) {
            var args = canReflect.toArray(arguments);
            if (newVal instanceof SetIdentifier) {
                return typeof getterSetter.set === 'function' ? getterSetter.set.apply(this, [newVal.value].concat(args.slice(1))) : source(newVal.value);
            } else {
                return typeof getterSetter.get === 'function' ? getterSetter.get.apply(this, args) : args[0];
            }
        });
    };
    module.exports = helpers;
});
/*can-stache@4.0.0-pre.38#src/intermediate_and_imports*/
define('can-stache/src/intermediate_and_imports', [
    'require',
    'exports',
    'module',
    'can-stache/src/mustache_core',
    'can-view-parser'
], function (require, exports, module) {
    var mustacheCore = require('can-stache/src/mustache_core');
    var parser = require('can-view-parser');
    module.exports = function (filename, source) {
        if (arguments.length === 1) {
            source = arguments[0];
            filename = undefined;
        }
        var template = source;
        template = mustacheCore.cleanWhitespaceControl(template);
        template = mustacheCore.cleanLineEndings(template);
        var imports = [], dynamicImports = [], ases = {}, inImport = false, inFrom = false, inAs = false, isUnary = false, importIsDynamic = false, currentAs = '', currentFrom = '';
        function processImport() {
            if (currentAs) {
                ases[currentAs] = currentFrom;
                currentAs = '';
            }
            if (importIsDynamic) {
                dynamicImports.push(currentFrom);
            } else {
                imports.push(currentFrom);
            }
        }
        var intermediate = parser(template, {
            filename: filename,
            start: function (tagName, unary) {
                if (tagName === 'can-import') {
                    isUnary = unary;
                    importIsDynamic = false;
                    inImport = true;
                } else if (tagName === 'can-dynamic-import') {
                    isUnary = unary;
                    importIsDynamic = true;
                    inImport = true;
                } else if (inImport) {
                    importIsDynamic = true;
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
                    currentFrom = value;
                } else if (inAs && inImport) {
                    currentAs = value;
                }
            },
            end: function (tagName) {
                if ((tagName === 'can-import' || tagName === 'can-dymamic-import') && isUnary) {
                    processImport();
                }
            },
            close: function (tagName) {
                if (tagName === 'can-import' || tagName === 'can-dymamic-import') {
                    processImport();
                }
            },
            chars: function (text) {
                if (text.trim().length > 0) {
                    importIsDynamic = true;
                }
            },
            special: function (text) {
                importIsDynamic = true;
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
/*can-util@3.10.18#js/import/import*/
define('can-util/js/import/import', [
    'require',
    'exports',
    'module',
    'can-util/js/is-function/is-function',
    'can-globals/global/global'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var isFunction = require('can-util/js/is-function/is-function');
        var global = require('can-globals/global/global')();
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
    }(), require, exports, module));
});
/*can-stache@4.0.0-pre.38#can-stache*/
define('can-stache', [
    'require',
    'exports',
    'module',
    'can-view-parser',
    'can-view-callbacks',
    'can-stache/src/html_section',
    'can-stache/src/text_section',
    'can-stache/src/mustache_core',
    'can-stache/helpers/core',
    'can-stache/helpers/converter',
    'can-stache/src/intermediate_and_imports',
    'can-stache/src/utils',
    'can-attribute-encoder',
    'can-log/dev/dev',
    'can-namespace',
    'can-globals/document/document',
    'can-assign',
    'can-util/js/last/last',
    'can-util/js/import/import',
    'can-reflect',
    'can-view-target',
    'can-view-nodelist'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var parser = require('can-view-parser');
        var viewCallbacks = require('can-view-callbacks');
        var HTMLSectionBuilder = require('can-stache/src/html_section');
        var TextSectionBuilder = require('can-stache/src/text_section');
        var mustacheCore = require('can-stache/src/mustache_core');
        var mustacheHelpers = require('can-stache/helpers/core');
        require('can-stache/helpers/converter');
        var getIntermediateAndImports = require('can-stache/src/intermediate_and_imports');
        var makeRendererConvertScopes = require('can-stache/src/utils').makeRendererConvertScopes;
        var attributeEncoder = require('can-attribute-encoder');
        var dev = require('can-log/dev/dev');
        var namespace = require('can-namespace');
        var DOCUMENT = require('can-globals/document/document');
        var assign = require('can-assign');
        var last = require('can-util/js/last/last');
        var importer = require('can-util/js/import/import');
        var canReflect = require('can-reflect');
        require('can-view-target');
        require('can-view-nodelist');
        if (!viewCallbacks.tag('content')) {
            viewCallbacks.tag('content', function (el, tagData) {
                return tagData.scope;
            });
        }
        var wrappedAttrPattern = /[{(].*[)}]/;
        var colonWrappedAttrPattern = /^on:|(:to|:from|:bind)$|.*:to:on:.*/;
        var svgNamespace = 'http://www.w3.org/2000/svg';
        var namespaces = {
                'svg': svgNamespace,
                'g': svgNamespace
            }, textContentOnlyTag = {
                style: true,
                script: true
            };
        function stache(filename, template) {
            if (arguments.length === 1) {
                template = arguments[0];
                filename = undefined;
            }
            var inlinePartials = {};
            if (typeof template === 'string') {
                template = mustacheCore.cleanWhitespaceControl(template);
                template = mustacheCore.cleanLineEndings(template);
            }
            var section = new HTMLSectionBuilder(filename), state = {
                    node: null,
                    attr: null,
                    sectionElementStack: [],
                    text: false,
                    namespaceStack: [],
                    textContentOnly: null
                }, makeRendererAndUpdateSection = function (section, mode, stache, lineNo) {
                    if (mode === '>') {
                        section.add(mustacheCore.makeLiveBindingPartialRenderer(stache, copyState(), lineNo));
                    } else if (mode === '/') {
                        var createdSection = section.last();
                        if (createdSection.startedWith === '<') {
                            inlinePartials[stache] = section.endSubSectionAndReturnRenderer();
                            section.removeCurrentNode();
                        } else {
                            section.endSection();
                        }
                        if (section instanceof HTMLSectionBuilder) {
                            var last = state.sectionElementStack[state.sectionElementStack.length - 1];
                            if (last.tag && last.type === 'section' && stache !== '' && stache !== last.tag) {
                                if (filename) {
                                    dev.warn(filename + ':' + lineNo + ': unexpected closing tag {{/' + stache + '}} expected {{/' + last.tag + '}}');
                                } else {
                                    dev.warn(lineNo + ': unexpected closing tag {{/' + stache + '}} expected {{/' + last.tag + '}}');
                                }
                            }
                            state.sectionElementStack.pop();
                        }
                    } else if (mode === 'else') {
                        section.inverse();
                    } else {
                        var makeRenderer = section instanceof HTMLSectionBuilder ? mustacheCore.makeLiveBindingBranchRenderer : mustacheCore.makeStringBranchRenderer;
                        if (mode === '{' || mode === '&') {
                            section.add(makeRenderer(null, stache, copyState(), lineNo));
                        } else if (mode === '#' || mode === '^' || mode === '<') {
                            var renderer = makeRenderer(mode, stache, copyState(), lineNo);
                            section.startSection(renderer);
                            section.last().startedWith = mode;
                            if (section instanceof HTMLSectionBuilder) {
                                var tag = typeof renderer.exprData.closingTag === 'function' ? renderer.exprData.closingTag() : '';
                                state.sectionElementStack.push({
                                    type: 'section',
                                    tag: tag
                                });
                            }
                        } else {
                            section.add(makeRenderer(null, stache, copyState({ text: true }), lineNo));
                        }
                    }
                }, copyState = function (overwrites) {
                    var lastElement = state.sectionElementStack[state.sectionElementStack.length - 1];
                    var cur = {
                        tag: state.node && state.node.tag,
                        attr: state.attr && state.attr.name,
                        directlyNested: state.sectionElementStack.length ? lastElement.type === 'section' || lastElement.type === 'custom' : true,
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
                filename: filename,
                start: function (tagName, unary, lineNo) {
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
                end: function (tagName, unary, lineNo) {
                    var isCustomTag = viewCallbacks.tag(tagName);
                    if (unary) {
                        section.add(state.node);
                        if (isCustomTag) {
                            addAttributesCallback(state.node, function (scope, parentNodeList) {
                                scope.set('scope.lineNumber', lineNo);
                                viewCallbacks.tagHandler(this, tagName, {
                                    scope: scope,
                                    subtemplate: null,
                                    templateType: 'stache',
                                    parentNodeList: parentNodeList
                                });
                            });
                        }
                    } else {
                        section.push(state.node);
                        state.sectionElementStack.push({
                            type: isCustomTag ? 'custom' : null,
                            tag: isCustomTag ? null : tagName,
                            templates: {}
                        });
                        if (isCustomTag) {
                            section.startSubSection();
                        } else if (textContentOnlyTag[tagName]) {
                            state.textContentOnly = new TextSectionBuilder();
                        }
                    }
                    state.node = null;
                },
                close: function (tagName, lineNo) {
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
                        if (tagName === 'can-template') {
                            var parent = state.sectionElementStack[state.sectionElementStack.length - 2];
                            parent.templates[oldNode.attrs.name] = makeRendererConvertScopes(renderer);
                            section.removeCurrentNode();
                        } else {
                            var current = state.sectionElementStack[state.sectionElementStack.length - 1];
                            addAttributesCallback(oldNode, function (scope, parentNodeList) {
                                scope.set('scope.lineNumber', lineNo);
                                viewCallbacks.tagHandler(this, tagName, {
                                    scope: scope,
                                    subtemplate: renderer ? makeRendererConvertScopes(renderer) : renderer,
                                    templateType: 'stache',
                                    parentNodeList: parentNodeList,
                                    templates: current.templates
                                });
                            });
                        }
                    }
                    state.sectionElementStack.pop();
                },
                attrStart: function (attrName, lineNo) {
                    if (state.node.section) {
                        state.node.section.add(attrName + '="');
                    } else {
                        state.attr = {
                            name: attrName,
                            value: ''
                        };
                    }
                },
                attrEnd: function (attrName, lineNo) {
                    if (state.node.section) {
                        state.node.section.add('" ');
                    } else {
                        if (!state.node.attrs) {
                            state.node.attrs = {};
                        }
                        state.node.attrs[state.attr.name] = state.attr.section ? state.attr.section.compile(copyState()) : state.attr.value;
                        var attrCallback = viewCallbacks.attr(attrName);
                        var decodedAttrName = attributeEncoder.decode(attrName);
                        var weirdAttribute = !!wrappedAttrPattern.test(decodedAttrName) || !!colonWrappedAttrPattern.test(decodedAttrName);
                        if (weirdAttribute && !attrCallback) {
                            dev.warn('unknown attribute binding ' + decodedAttrName + '. Is can-stache-bindings imported?');
                        }
                        if (attrCallback) {
                            if (!state.node.attributes) {
                                state.node.attributes = [];
                            }
                            state.node.attributes.push(function (scope, nodeList) {
                                scope.set('scope.lineNumber', lineNo);
                                attrCallback(this, {
                                    attributeName: attrName,
                                    scope: scope,
                                    nodeList: nodeList
                                });
                            });
                        }
                        state.attr = null;
                    }
                },
                attrValue: function (value, lineNo) {
                    var section = state.node.section || state.attr.section;
                    if (section) {
                        section.add(value);
                    } else {
                        state.attr.value += value;
                    }
                },
                chars: function (text, lineNo) {
                    (state.textContentOnly || section).add(text);
                },
                special: function (text, lineNo) {
                    var firstAndText = mustacheCore.splitModeFromExpression(text, state, lineNo), mode = firstAndText.mode, expression = firstAndText.expression;
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
                        makeRendererAndUpdateSection(state.node.section, mode, expression, lineNo);
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
                        makeRendererAndUpdateSection(state.attr.section, mode, expression, lineNo);
                    } else if (state.node) {
                        if (!state.node.attributes) {
                            state.node.attributes = [];
                        }
                        if (!mode) {
                            state.node.attributes.push(mustacheCore.makeLiveBindingBranchRenderer(null, expression, copyState(), lineNo));
                        } else if (mode === '#' || mode === '^') {
                            if (!state.node.section) {
                                state.node.section = new TextSectionBuilder();
                            }
                            makeRendererAndUpdateSection(state.node.section, mode, expression, lineNo);
                        } else {
                            throw new Error(mode + ' is currently not supported within a tag.');
                        }
                    } else {
                        makeRendererAndUpdateSection(state.textContentOnly || section, mode, expression, lineNo);
                    }
                },
                comment: function (text) {
                    section.add({ comment: text });
                },
                done: function (lineNo) {
                }
            });
            var renderer = section.compile();
            var scopifiedRenderer = HTMLSectionBuilder.scopify(function (scope, nodeList) {
                var templateContext = scope.templateContext;
                canReflect.eachKey(inlinePartials, function (partial, partialName) {
                    canReflect.setKeyValue(templateContext.partials, partialName, partial);
                });
                canReflect.setKeyValue(templateContext, 'view', scopifiedRenderer);
                canReflect.setKeyValue(templateContext, 'filename', section.filename);
                return renderer.apply(this, arguments);
            });
            return scopifiedRenderer;
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
                templates[id] = stache('#' + id, el.innerHTML);
            }
            return templates[id];
        };
        stache.registerPartial = function (id, partial) {
            templates[id] = typeof partial === 'string' ? stache(partial) : partial;
        };
        module.exports = namespace.stache = stache;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-stache-route-helpers@0.1.1#can-stache-route-helpers*/
define('can-stache-route-helpers', [
    'require',
    'exports',
    'module',
    'can-stache/helpers/core',
    'can-route',
    'can-stache/src/expression',
    'can-util/js/each/each'
], function (require, exports, module) {
    var helpers = require('can-stache/helpers/core');
    var route = require('can-route');
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
/*can@4.0.0-pre.7#can*/
define('can', [
    'require',
    'exports',
    'module',
    'can-util/namespace',
    'can-component',
    'can-connect/all',
    'can-define/map/map',
    'can-define/list/list',
    'can-route',
    'can-set',
    'can-stache',
    'can-stache-route-helpers',
    'can-stache-bindings'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var can = require('can-util/namespace');
        require('can-component');
        require('can-connect/all');
        require('can-define/map/map');
        require('can-define/list/list');
        require('can-route');
        require('can-set');
        require('can-stache');
        require('can-stache-route-helpers');
        require('can-stache-bindings');
        module.exports = can;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#js/omit/omit*/
define('can-util/js/omit/omit', function (require, exports, module) {
    'use strict';
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
/*can-util@3.10.18#dom/ajax/ajax*/
define('can-util/dom/ajax/ajax', [
    'require',
    'exports',
    'module',
    'can-log/dev/dev',
    'can-ajax'
], function (require, exports, module) {
    'use strict';
    var canDev = require('can-log/dev/dev');
    canDev.warn('dom/ajax/ajax is deprecated; please use can-ajax instead: https://github.com/canjs/can-ajax');
    module.exports = require('can-ajax');
});
/*can-util@3.10.18#dom/document/document*/
define('can-util/dom/document/document', [
    'require',
    'exports',
    'module',
    'can-globals/document/document'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = require('can-globals/document/document');
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-globals@0.3.0#can-globals*/
define('can-globals', [
    'require',
    'exports',
    'module',
    'can-globals/can-globals-instance',
    'can-globals/global/global',
    'can-globals/document/document',
    'can-globals/location/location',
    'can-globals/mutation-observer/mutation-observer',
    'can-globals/is-browser-window/is-browser-window',
    'can-globals/is-node/is-node'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var globals = require('can-globals/can-globals-instance');
        require('can-globals/global/global');
        require('can-globals/document/document');
        require('can-globals/location/location');
        require('can-globals/mutation-observer/mutation-observer');
        require('can-globals/is-browser-window/is-browser-window');
        require('can-globals/is-node/is-node');
        module.exports = globals;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/mutation-observer/mutation-observer*/
define('can-util/dom/mutation-observer/mutation-observer', [
    'require',
    'exports',
    'module',
    'can-globals'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var globals = require('can-globals');
        module.exports = function (setMO) {
            if (setMO !== undefined) {
                globals.setKeyValue('MutationObserver', function () {
                    return setMO;
                });
            }
            return globals.getKeyValue('MutationObserver');
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#dom/dom*/
define('can-util/dom/dom', [
    'require',
    'exports',
    'module',
    'can-util/dom/ajax/ajax',
    'can-util/dom/attr/attr',
    'can-util/dom/child-nodes/child-nodes',
    'can-util/dom/class-name/class-name',
    'can-util/dom/contains/contains',
    'can-util/dom/data/data',
    'can-util/dom/dispatch/dispatch',
    'can-util/dom/document/document',
    'can-util/dom/events/events',
    'can-util/dom/frag/frag',
    'can-util/dom/fragment/fragment',
    'can-util/dom/is-of-global-document/is-of-global-document',
    'can-util/dom/matches/matches',
    'can-util/dom/mutate/mutate',
    'can-util/dom/mutation-observer/mutation-observer'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
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
    }(), require, exports, module));
});
/*can-util@3.10.18#js/is-node/is-node*/
define('can-util/js/is-node/is-node', function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = function () {
            return typeof process === 'object' && {}.toString.call(process) === '[object process]';
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#js/is-string/is-string*/
define('can-util/js/is-string/is-string', [
    'require',
    'exports',
    'module',
    'can-log/dev/dev'
], function (require, exports, module) {
    'use strict';
    var dev = require('can-log/dev/dev');
    var hasWarned = false;
    module.exports = function isString(obj) {
        if (!hasWarned) {
            dev.warn('js/is-string/is-string is deprecated; use typeof x === "string"');
            hasWarned = true;
        }
        return typeof obj === 'string';
    };
});
/*can-util@3.10.18#js/js*/
define('can-util/js/js', [
    'require',
    'exports',
    'module',
    'can-assign',
    'can-cid',
    'can-util/js/deep-assign/deep-assign',
    'can-util/js/dev/dev',
    'can-util/js/diff/diff',
    'can-util/js/each/each',
    'can-util/js/global/global',
    'can-util/js/import/import',
    'can-util/js/is-array/is-array',
    'can-util/js/is-array-like/is-array-like',
    'can-util/js/is-browser-window/is-browser-window',
    'can-util/js/is-empty-object/is-empty-object',
    'can-util/js/is-function/is-function',
    'can-util/js/is-node/is-node',
    'can-util/js/is-plain-object/is-plain-object',
    'can-util/js/is-promise/is-promise',
    'can-util/js/is-string/is-string',
    'can-util/js/is-web-worker/is-web-worker',
    'can-util/js/join-uris/join-uris',
    'can-util/js/last/last',
    'can-util/js/make-array/make-array',
    'can-util/js/omit/omit',
    'can-util/js/set-immediate/set-immediate',
    'can-util/js/string/string',
    'can-types'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = {
            assign: require('can-assign'),
            cid: require('can-cid'),
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
            types: require('can-types')
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*can-util@3.10.18#can-util*/
define('can-util', [
    'require',
    'exports',
    'module',
    'can-util/js/deep-assign/deep-assign',
    'can-util/js/omit/omit',
    'can-namespace',
    'can-util/dom/dom',
    'can-util/js/js'
], function (require, exports, module) {
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var omit = require('can-util/js/omit/omit');
    var namespace = require('can-namespace');
    module.exports = deepAssign(namespace, require('can-util/dom/dom'), omit(require('can-util/js/js'), [
        'cid',
        'types'
    ]));
});
/*can-construct-super@3.1.3#can-construct-super*/
define('can-construct-super', [
    'require',
    'exports',
    'module',
    'can-util',
    'can-construct'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var can = require('can-util');
        var Construct = require('can-construct');
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var isFunction = can.isFunction, fnTest = /xyz/.test(function () {
                return this.xyz;
            }) ? /\b_super\b/ : /.*/, getset = [
                'get',
                'set'
            ], getSuper = function (base, name, fn) {
                return function () {
                    var hasExistingValue = false;
                    var existingValue;
                    var prototype = getPrototypeOf(this);
                    var existingPrototypeValue = prototype._super;
                    if (hasOwnProperty.call(this, '_super')) {
                        hasExistingValue = true;
                        existingValue = this._super;
                        delete this._super;
                    }
                    prototype._super = base[name];
                    var ret = fn.apply(this, arguments);
                    prototype._super = existingPrototypeValue;
                    if (hasExistingValue) {
                        this._super = existingValue;
                    }
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
    }(), require, exports, module));
});
/*can-fixture@2.0.0-pre.2#helpers/getid*/
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
/*can-fixture@2.0.0-pre.2#helpers/legacyStore*/
define('can-fixture/helpers/legacyStore', [
    'require',
    'exports',
    'module',
    'can-fixture/helpers/getid',
    'can-set',
    'can-util/js/is-array-like/is-array-like',
    'can-util/js/each/each',
    'can-util/js/assign/assign'
], function (require, exports, module) {
    var getId = require('can-fixture/helpers/getid');
    var canSet = require('can-set');
    var isArrayLike = require('can-util/js/is-array-like/is-array-like');
    var each = require('can-util/js/each/each');
    var assign = require('can-util/js/assign/assign');
    function getStartingId(items) {
        var startingId = 0;
        each(items, function (item) {
            if (typeof item.id === 'number') {
                startingId = Math.max(startingId, item.id + 1);
            }
        });
        return startingId;
    }
    module.exports = function (count, make, filter) {
        var nextItemId;
        var getNextItemId = function () {
            return nextItemId++;
        };
        var items, findOne = function (id) {
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
            nextItemId = 0;
            items = [];
            reset = function () {
                items = [];
                for (var i = 0; i < count; i++) {
                    var item = make(i, items);
                    if (!item.id) {
                        item.id = getNextItemId();
                    }
                    items.push(item);
                }
            };
        } else {
            filter = make;
            var initialItems = count;
            nextItemId = getStartingId(initialItems);
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
                    item.id = getNextItemId();
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
/*can-fixture@2.0.0-pre.2#store*/
define('can-fixture/store', [
    'require',
    'exports',
    'module',
    'can-set',
    'can-connect',
    'can-fixture/helpers/legacyStore',
    'can-util/js/each/each',
    'can-util/js/assign/assign',
    'can-util/js/is-array-like/is-array-like',
    'can-connect/data/memory-cache/memory-cache'
], function (require, exports, module) {
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
            console.warn('can-fixture: This form ( `fixture(count, make, filter)` ) of making a store is deprecated.  Please use the algebra-based form.');
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
/*can-fixture@2.0.0-pre.2#core*/
define('can-fixture/core', [
    'require',
    'exports',
    'module',
    'can-set',
    'can-util/js/string/string',
    'can-util/js/each/each',
    'can-util/js/assign/assign',
    'can-util/js/is-empty-object/is-empty-object',
    'can-util/js/log/log',
    'can-util/js/dev/dev',
    'can-fixture/store'
], function (require, exports, module) {
    var canSet = require('can-set');
    var sub = require('can-util/js/string/string').sub;
    var each = require('can-util/js/each/each');
    var assign = require('can-util/js/assign/assign');
    var isEmptyObject = require('can-util/js/is-empty-object/is-empty-object');
    var canLog = require('can-util/js/log/log');
    var canDev = require('can-util/js/dev/dev');
    require('can-fixture/store');
    var fixtures = [];
    exports.fixtures = fixtures;
    function isStoreLike(fixture) {
        return fixture && (fixture.getData || fixture.getListData);
    }
    var methodMapping = {
        item: {
            'GET': 'getData',
            'PUT': 'updateData',
            'DELETE': 'destroyData'
        },
        list: {
            'GET': 'getListData',
            'POST': 'createData'
        }
    };
    function getMethodAndPath(route) {
        var matches = route.match(/(GET|POST|PUT|DELETE|PATCH) (.+)/i);
        if (!matches) {
            return [
                undefined,
                route
            ];
        }
        var method = matches[1];
        var path = matches[2];
        return [
            method,
            path
        ];
    }
    function inferIdProp(url) {
        var wrappedInBraces = /\{(.*)\}/;
        var matches = url.match(wrappedInBraces);
        var isUniqueMatch = matches && matches.length === 2;
        if (isUniqueMatch) {
            return matches[1];
        }
    }
    function getItemAndListUrls(url, idProp) {
        idProp = idProp || inferIdProp(url);
        if (!idProp) {
            return [
                undefined,
                url
            ];
        }
        var itemRegex = new RegExp('\\/\\{' + idProp + '\\}.*');
        var rootIsItemUrl = itemRegex.test(url);
        var listUrl = rootIsItemUrl ? url.replace(itemRegex, '') : url;
        var itemUrl = rootIsItemUrl ? url : url.trim() + '/{' + idProp + '}';
        return [
            itemUrl,
            listUrl
        ];
    }
    function addStoreFixture(root, store) {
        var settings = {};
        var typeAndUrl = getMethodAndPath(root);
        var type = typeAndUrl[0];
        var url = typeAndUrl[1];
        var itemAndListUrls = getItemAndListUrls(url, store.idProp);
        var itemUrl = itemAndListUrls[0];
        var listUrl = itemAndListUrls[1];
        if (type) {
            var warning = ['fixture("' + root + '", fixture) must use a store method, not a store directly.'];
            if (itemUrl) {
                var itemAction = methodMapping.item[type];
                if (itemAction) {
                    settings[type + ' ' + itemUrl] = store[itemAction];
                    var itemWarning = 'Replace with fixture("' + type + ' ' + itemUrl + '", fixture.' + itemAction + ') for items.';
                    warning.push(itemWarning);
                }
            }
            var listAction = methodMapping.list[type];
            if (listAction) {
                settings[type + ' ' + listUrl] = store[listAction];
                var listWarning = 'Replace with fixture("' + type + ' ' + listUrl + '", fixture.' + listAction + ') for lists.';
                warning.push(listWarning);
            }
            var message = warning.join(' ');
            canDev.warn(message);
        } else {
            var itemMapping = methodMapping.item;
            for (var itemMethod in itemMapping) {
                var storeItemMethod = itemMapping[itemMethod];
                settings[itemMethod + ' ' + itemUrl] = store[storeItemMethod];
            }
            var listMapping = methodMapping.list;
            for (var listMethod in listMapping) {
                var storeListMethod = listMapping[listMethod];
                settings[listMethod + ' ' + listUrl] = store[storeListMethod];
            }
        }
        return settings;
    }
    function getSettingsFromString(route) {
        var typeAndUrl = getMethodAndPath(route);
        var type = typeAndUrl[0];
        var url = typeAndUrl[1];
        if (type) {
            return {
                type: type,
                url: url
            };
        }
        return { url: url };
    }
    function upsertFixture(fixtureList, settings, fixture) {
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
    }
    exports.add = function (settings, fixture) {
        if (fixture === undefined) {
            each(settings, function (fixture, url) {
                exports.add(url, fixture);
            });
            return;
        }
        if (isStoreLike(fixture)) {
            settings = addStoreFixture(settings, fixture);
            exports.add(settings);
            return;
        }
        if (typeof settings === 'string') {
            settings = getSettingsFromString(settings);
        }
        upsertFixture(fixtures, settings, fixture);
    };
    var $fixture = exports.add;
    $fixture.on = true;
    $fixture.delay = 10;
    exports.callDynamicFixture = function (xhrSettings, fixtureSettings, cb) {
        xhrSettings.data = fixtureSettings.data;
        var json = JSON.stringify(xhrSettings.data);
        canLog.log('' + xhrSettings.type.toUpperCase() + ' ' + xhrSettings.url + ' ' + json.substr(0, 50) + ' -> handler(req,res)');
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
});
/*can-fixture@2.0.0-pre.2#xhr*/
define('can-fixture/xhr', [
    'require',
    'exports',
    'module',
    'can-fixture/core',
    'can-deparam',
    'can-util/js/assign/assign',
    'can-util/js/each/each',
    'can-util/js/log/log'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var fixtureCore = require('can-fixture/core');
        var deparam = require('can-deparam');
        var assign = require('can-util/js/assign/assign');
        var each = require('can-util/js/each/each');
        var canLog = require('can-util/js/log/log');
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
                    canLog.log(xhrSettings.url + ' -> delay ' + fixtureSettings.fixture + 'ms');
                    this.timeoutId = setTimeout(makeRequest, fixtureSettings.fixture);
                    return;
                }
                if (fixtureSettings) {
                    canLog.log(xhrSettings.url + ' -> ' + fixtureSettings.url);
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
    }(), require, exports, module));
});
/*can-fixture@2.0.0-pre.2#fixture*/
define('can-fixture', [
    'require',
    'exports',
    'module',
    'can-fixture/core',
    'can-fixture/store',
    'can-fixture/xhr',
    'can-util/js/assign/assign',
    'can-namespace'
], function (require, exports, module) {
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
/*can@4.0.0-pre.7#ecosystem*/
define('can/ecosystem', [
    'require',
    'exports',
    'module',
    'can-util/namespace',
    'can-construct-super',
    'can-fixture'
], function (require, exports, module) {
    var can = require('can-util/namespace');
    require('can-construct-super');
    require('can-fixture');
    module.exports = can;
});
/*can-compute@4.0.0-pre.8#proto-compute*/
define('can-compute/proto-compute', [
    'require',
    'exports',
    'module',
    'can-observation',
    'can-observation-recorder',
    'can-event-queue/map/map',
    'can-stache-key',
    'can-util/js/get/get',
    'can-cid',
    'can-util/js/assign/assign',
    'can-reflect',
    'can-symbol',
    'can-util/js/cid-set/cid-set',
    'can-util/js/single-reference/single-reference'
], function (require, exports, module) {
    var Observation = require('can-observation');
    var ObservationRecorder = require('can-observation-recorder');
    var eventQueue = require('can-event-queue/map/map');
    var observeReader = require('can-stache-key');
    var getObject = require('can-util/js/get/get');
    var CID = require('can-cid');
    var assign = require('can-util/js/assign/assign');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var CIDSet = require('can-util/js/cid-set/cid-set');
    var singleReference = require('can-util/js/single-reference/single-reference');
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
                var isListLike = canReflect.isObservableLike(args[0]) && canReflect.isListLike(args[0]);
                var isMapLike = canReflect.isObservableLike(args[0]) && canReflect.isMapLike(args[0]);
                if (isMapLike || isListLike) {
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
            compute.dispatch({
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
        var updater = compute.updater.bind(compute);
        Object.defineProperty(updater, 'name', { value: canReflect.getName(compute) + '.updater' });
        compute.observation = observation;
        return {
            _on: function () {
                canReflect.onValue(observation, updater, 'notify');
                compute.value = observation.value;
            },
            _off: function () {
                canReflect.offValue(observation, updater, 'notify');
            },
            getDepth: function () {
                return observation.getDepth();
            }
        };
    };
    eventQueue(Compute.prototype);
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
                var properties = propertyName.split('.'), leafPropertyName = properties.pop();
                if (properties.length) {
                    var targetProperty = getObject(target, properties.join('.'));
                    targetProperty[leafPropertyName] = value;
                } else {
                    target[propertyName] = value;
                }
            };
            this._on = function (update) {
                eventQueue.on.call(target, eventName || propertyName, handler);
                this.value = this._get();
            };
            this._off = function () {
                return eventQueue.off.call(target, eventName || propertyName, handler);
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
                var oldUpdater = this.updater, resolve = ObservationRecorder.ignore(function (newVal) {
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
        _eventSetup: ObservationRecorder.ignore(function () {
            this.bound = true;
            this._on(this.updater);
        }),
        _eventTeardown: function () {
            this._off(this.updater);
            this.bound = false;
        },
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
            var recordingObservation = ObservationRecorder.isRecording();
            if (recordingObservation && this._canObserve !== false) {
                ObservationRecorder.add(this, 'change');
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
        }
    });
    var hasDependencies = function () {
        return this.observation && this.observation.hasDependencies();
    };
    Object.defineProperty(Compute.prototype, 'hasDependencies', { get: hasDependencies });
    canReflect.set(Compute.prototype, canSymbol.for('can.valueHasDependencies'), hasDependencies);
    Compute.prototype.on = Compute.prototype.bind = Compute.prototype.addEventListener;
    Compute.prototype.off = Compute.prototype.unbind = Compute.prototype.removeEventListener;
    canReflect.set(Compute.prototype, canSymbol.for('can.onValue'), function (handler, queue) {
        function translationHandler(ev, newValue) {
            handler(newValue);
        }
        singleReference.set(handler, this, translationHandler);
        Object.defineProperty(translationHandler, 'name', { value: canReflect.getName(handler) + '::onValue' });
        this.addEventListener('change', translationHandler, queue);
    });
    canReflect.set(Compute.prototype, canSymbol.for('can.offValue'), function (handler, queue) {
        this.removeEventListener('change', singleReference.getAndDelete(handler, this), queue);
    });
    canReflect.set(Compute.prototype, canSymbol.for('can.getValue'), Compute.prototype.get);
    canReflect.set(Compute.prototype, canSymbol.for('can.setValue'), Compute.prototype.set);
    Compute.temporarilyBind = Observation.temporarilyBind;
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
    canReflect.set(Compute.prototype, canSymbol.for('can.setValue'), Compute.prototype.set);
    canReflect.set(Compute.prototype, canSymbol.for('can.isValueLike'), true);
    canReflect.set(Compute.prototype, canSymbol.for('can.isMapLike'), false);
    canReflect.set(Compute.prototype, canSymbol.for('can.isListLike'), false);
    canReflect.set(Compute.prototype, canSymbol.for('can.valueHasDependencies'), function () {
        return !!this.observation;
    });
    canReflect.set(Compute.prototype, canSymbol.for('can.getValueDependencies'), function () {
        var ret;
        if (this.observation) {
            ret = { valueDependencies: new CIDSet() };
            ret.valueDependencies.add(this.observation);
        }
        return ret;
    });
    module.exports = exports = Compute;
});
/*can-compute@4.0.0-pre.8#can-compute*/
define('can-compute', [
    'require',
    'exports',
    'module',
    'can-compute/proto-compute',
    'can-namespace',
    'can-util/js/single-reference/single-reference',
    'can-reflect/reflections/get-set/get-set',
    'can-symbol'
], function (require, exports, module) {
    var Compute = require('can-compute/proto-compute');
    var namespace = require('can-namespace');
    var singleReference = require('can-util/js/single-reference/single-reference');
    var canReflect = require('can-reflect/reflections/get-set/get-set');
    var canSymbol = require('can-symbol');
    var canOnValueSymbol = canSymbol.for('can.onValue'), canOffValueSymbol = canSymbol.for('can.offValue'), canGetValue = canSymbol.for('can.getValue'), canSetValue = canSymbol.for('can.setValue'), isValueLike = canSymbol.for('can.isValueLike'), isMapLike = canSymbol.for('can.isMapLike'), isListLike = canSymbol.for('can.isListLike'), isFunctionLike = canSymbol.for('can.isFunctionLike'), canValueHasDependencies = canSymbol.for('can.valueHasDependencies'), canGetValueDependencies = canSymbol.for('can.getValueDependencies');
    var addEventListener = function (ev, handler) {
        var compute = this;
        var translationHandler;
        if (handler) {
            translationHandler = function () {
                handler.apply(compute, arguments);
            };
            singleReference.set(handler, this, translationHandler);
        }
        return compute.computeInstance.addEventListener(ev, translationHandler);
    };
    var removeEventListener = function (ev, handler) {
        var args = [];
        if (typeof ev !== 'undefined') {
            args.push(ev);
            if (typeof handler !== 'undefined') {
                args.push(singleReference.getAndDelete(handler, this));
            }
        }
        return this.computeInstance.removeEventListener.apply(this.computeInstance, args);
    };
    var onValue = function (handler, queue) {
            return this.computeInstance[canOnValueSymbol](handler, queue);
        }, offValue = function (handler, queue) {
            return this.computeInstance[canOffValueSymbol](handler, queue);
        }, getValue = function () {
            return this.computeInstance.get();
        }, setValue = function (value) {
            return this.computeInstance.set(value);
        }, hasDependencies = function () {
            return this.computeInstance.hasDependencies;
        }, getDependencies = function () {
            return this.computeInstance[canGetValueDependencies]();
        };
    var COMPUTE = function (getterSetter, context, eventName, bindOnce) {
        function compute(val) {
            if (arguments.length) {
                return compute.computeInstance.set(val);
            }
            return compute.computeInstance.get();
        }
        compute.computeInstance = new Compute(getterSetter, context, eventName, bindOnce);
        compute.on = compute.bind = compute.addEventListener = addEventListener;
        compute.off = compute.unbind = compute.removeEventListener = removeEventListener;
        compute.isComputed = compute.computeInstance.isComputed;
        compute.clone = function (ctx) {
            if (typeof getterSetter === 'function') {
                context = ctx;
            }
            return COMPUTE(getterSetter, context, ctx, bindOnce);
        };
        canReflect.set(compute, canOnValueSymbol, onValue);
        canReflect.set(compute, canOffValueSymbol, offValue);
        canReflect.set(compute, canGetValue, getValue);
        canReflect.set(compute, canSetValue, setValue);
        canReflect.set(compute, isValueLike, true);
        canReflect.set(compute, isMapLike, false);
        canReflect.set(compute, isListLike, false);
        canReflect.set(compute, isFunctionLike, false);
        canReflect.set(compute, canValueHasDependencies, hasDependencies);
        canReflect.set(compute, canGetValueDependencies, getDependencies);
        return compute;
    };
    COMPUTE.truthy = function (compute) {
        return COMPUTE(function () {
            var res = compute();
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
/*can-map@4.0.0-pre.11#bubble*/
define('can-map/bubble', [
    'require',
    'exports',
    'module',
    'can-event-queue/map/legacy/legacy',
    'can-util/js/make-array/make-array',
    'can-reflect',
    'can-util/js/is-empty-object/is-empty-object'
], function (require, exports, module) {
    var canEvent = require('can-event-queue/map/legacy/legacy');
    var makeArray = require('can-util/js/make-array/make-array');
    var canReflect = require('can-reflect');
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
            if (canReflect.isObservableLike(child) && canReflect.isMapLike(child) && parent._bubbleBindings) {
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
            if (canReflect.isObservableLike(child) && canReflect.isMapLike(child) && parent._bubbleBindings) {
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
            if (canReflect.isObservableLike(value) && canReflect.isMapLike(value)) {
                bubble.add(parent, value, prop);
            }
            if (canReflect.isObservableLike(current) && canReflect.isMapLike(current)) {
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
                args[0] = (canReflect.isObservableLike(parent) && canReflect.isListLike(parent) ? parent.indexOf(child) : prop) + (args[0] ? '.' + args[0] : '');
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
/*can-map@4.0.0-pre.11#map-helpers*/
define('can-map/map-helpers', [
    'require',
    'exports',
    'module',
    'can-util/js/is-plain-object/is-plain-object',
    'can-util/js/is-promise/is-promise',
    'can-cid',
    'can-util/js/assign/assign',
    'can-reflect'
], function (require, exports, module) {
    var isPlainObject = require('can-util/js/is-plain-object/is-plain-object');
    var isPromise = require('can-util/js/is-promise/is-promise');
    var CID = require('can-cid');
    var assign = require('can-util/js/assign/assign');
    var canReflect = require('can-reflect');
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
            return obj && !isPromise(obj) && (Array.isArray(obj) || isPlainObject(obj));
        },
        reflectSerialize: function (unwrapped) {
            this.forEach(function (val, name) {
                if (this.___serialize) {
                    val = this.___serialize(name, val);
                } else {
                    val = canReflect.serialize(val);
                }
                if (val !== undefined) {
                    unwrapped[name] = val;
                }
            }, this);
            return unwrapped;
        },
        reflectUnwrap: function (unwrapped) {
            this.forEach(function (value, key) {
                if (value !== undefined) {
                    unwrapped[key] = canReflect.unwrap(value);
                }
            });
            return unwrapped;
        },
        removeSpecialKeys: function (map) {
            if (map) {
                [
                    '_data',
                    'constructor',
                    '_cid',
                    '__bindEvents'
                ].forEach(function (key) {
                    delete map[key];
                });
            }
            return map;
        },
        define: null,
        addComputedAttr: function (map, attrName, compute) {
            map._computedAttrs[attrName] = {
                compute: compute,
                count: 0,
                handler: function (newVal, oldVal) {
                    map._triggerChange(attrName, 'set', newVal, oldVal);
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
/*can-map@4.0.0-pre.11#can-map*/
define('can-map', [
    'require',
    'exports',
    'module',
    'can-map/bubble',
    'can-map/map-helpers',
    'can-event-queue/map/legacy/legacy',
    'can-event-queue/type/type',
    'can-construct',
    'can-observation-recorder',
    'can-stache-key',
    'can-compute',
    'can-util/js/single-reference/single-reference',
    'can-namespace',
    'can-util/js/dev/dev',
    'can-cid',
    'can-util/js/deep-assign/deep-assign',
    'can-util/js/assign/assign',
    'can-types',
    'can-reflect',
    'can-symbol',
    'can-util/js/cid-set/cid-set',
    'can-util/js/cid-map/cid-map',
    'can-queues'
], function (require, exports, module) {
    var bubble = require('can-map/bubble');
    var mapHelpers = require('can-map/map-helpers');
    var canEvent = require('can-event-queue/map/legacy/legacy');
    var addTypeEvents = require('can-event-queue/type/type');
    var Construct = require('can-construct');
    var ObservationRecorder = require('can-observation-recorder');
    var ObserveReader = require('can-stache-key');
    var canCompute = require('can-compute');
    var singleReference = require('can-util/js/single-reference/single-reference');
    var namespace = require('can-namespace');
    var dev = require('can-util/js/dev/dev');
    var CID = require('can-cid');
    var deepAssign = require('can-util/js/deep-assign/deep-assign');
    var assign = require('can-util/js/assign/assign');
    var types = require('can-types');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var CIDSet = require('can-util/js/cid-set/cid-set');
    var CIDMap = require('can-util/js/cid-map/cid-map');
    var canQueues = require('can-queues');
    var unobservable = { 'constructor': true };
    var hasOwnProperty = {}.hasOwnProperty;
    var Map = Construct.extend({
        setup: function (baseMap) {
            Construct.setup.apply(this, arguments);
            this._computedPropertyNames = [];
            if (Map) {
                addTypeEvents(this);
                this[canSymbol.for('can.defineInstanceKey')] = function (prop, definition) {
                    if (definition.value !== undefined) {
                        this.defaults[prop] = definition.value;
                    }
                    if (definition.enumerable === false) {
                        this.enumerable[prop] = false;
                    }
                };
                if (this.prototype.define && !mapHelpers.define) {
                    dev.warn('can/map/define is not included, yet there is a define property ' + 'used. You may want to add this plugin.');
                }
                if (this.define && !mapHelpers.define) {
                    dev.warn('The define property should be on the map\'s prototype properties, ' + 'not the static properties. Also, can/map/define is not included.');
                }
                if (!this.defaults) {
                    this.defaults = {};
                }
                if (!this.enumerable) {
                    this.enumerable = {};
                }
                for (var prop in this.prototype) {
                    if (prop !== 'define' && prop !== 'constructor' && (typeof this.prototype[prop] !== 'function' && !canReflect.isValueLike(this.prototype[prop]) || this.prototype[prop].prototype instanceof Construct)) {
                        this.defaults[prop] = this.prototype[prop];
                    } else if (canReflect.isObservableLike(this.prototype[prop])) {
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
        addEventListener: canEvent.addEventListener,
        removeEventListener: canEvent.removeEventListener,
        keys: function (map) {
            return canReflect.getOwnEnumerableKeys(map);
        }
    }, {
        setup: function (obj) {
            if (canReflect.isObservableLike(obj) && typeof obj.serialize === 'function') {
                obj = obj.serialize();
            }
            this._data = Object.create(null);
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
            this._computedAttrs = Object.create(null);
            var computes = this.constructor._computedPropertyNames;
            for (var i = 0, len = computes.length; i < len; i++) {
                var attrName = computes[i];
                mapHelpers.addComputedAttr(this, attrName, this[attrName]);
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
                    ObservationRecorder.add(this, attr);
                    return value;
                }
                var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1);
                var current = this.__get(first);
                return current && canReflect.getKeyValue(current, second);
            } else {
                return this.__get(attr);
            }
        },
        __get: function (attr) {
            if (!unobservable[attr] && !this._computedAttrs[attr]) {
                ObservationRecorder.add(this, attr);
            }
            return this.___get(attr);
        },
        ___get: function (attr) {
            if (attr !== undefined) {
                var computedAttr = this._computedAttrs[attr];
                if (computedAttr) {
                    return canReflect.getValue(computedAttr.compute);
                } else {
                    return hasOwnProperty.call(this._data, attr) ? this._data[attr] : undefined;
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
                if (canReflect.isMapLike(current)) {
                    canReflect.setKeyValue(current, second, value);
                } else {
                    current = this.__inSetup ? undefined : this.___get(attr);
                    if (this.__convert) {
                        value = this.__convert(attr, value);
                    }
                    this.__set(attr, this.__type(value, attr), current);
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
            if (typeof value === 'object' && !canReflect.isObservableLike(value) && mapHelpers.canMakeObserve(value) && !canReflect.isListLike(value)) {
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
                var changeType = computedAttr || current !== undefined || hasOwnProperty.call(this.___get(), prop) ? 'set' : 'add';
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
                canReflect.setKeyValue(computedAttr.compute, val);
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
                return canReflect.deleteKeyValue(current, parts.join('.'));
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
            return canReflect.serialize(val, CIDMap);
        },
        _getAttrs: function () {
            return canReflect.unwrap(this, CIDMap);
        },
        _setAttrs: function (props, remove) {
            if (remove === true) {
                this[canSymbol.for('can.updateDeep')](props);
            } else {
                this[canSymbol.for('can.assignDeep')](props);
            }
            return this;
        },
        serialize: function () {
            return canReflect.serialize(this, CIDMap);
        },
        _triggerChange: function (attr, how, newVal, oldVal, batchNum) {
            canQueues.batch.start();
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
                batchNum: batchNum,
                patches: [{
                        type: 'set',
                        key: attr,
                        value: newVal
                    }]
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
            canQueues.batch.stop();
        },
        compute: function (prop) {
            if (typeof this.constructor.prototype[prop] === 'function') {
                return canCompute(this[prop], this);
            } else {
                var reads = ObserveReader.reads(prop);
                var last = reads.length - 1;
                return canCompute(function (newVal) {
                    if (arguments.length) {
                        ObserveReader.write(this, reads[last].key, newVal, {});
                    } else {
                        return ObserveReader.get(this, prop);
                    }
                }, this);
            }
        },
        forEach: function (callback, context) {
            var key, item;
            var keys = canReflect.getOwnEnumerableKeys(this);
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
                if (hasOwnProperty.call(data, prop)) {
                    callback(data[prop], prop);
                }
            }
        },
        dispatch: canEvent.dispatch
    });
    canEvent(Map.prototype);
    Map.prototype.addEventListener = function (eventName, handler) {
        var computedBinding = this._computedAttrs && this._computedAttrs[eventName];
        if (computedBinding && computedBinding.compute) {
            if (!computedBinding.count) {
                computedBinding.count = 1;
                canReflect.onValue(computedBinding.compute, computedBinding.handler, 'notify');
            } else {
                computedBinding.count++;
            }
        }
        bubble.bind(this, eventName);
        return canEvent.addEventListener.apply(this, arguments);
    };
    Map.prototype.removeEventListener = function (eventName, handler) {
        var computedBinding = this._computedAttrs && this._computedAttrs[eventName];
        if (computedBinding) {
            if (computedBinding.count === 1) {
                computedBinding.count = 0;
                canReflect.offValue(computedBinding.compute, computedBinding.handler);
            } else {
                computedBinding.count--;
            }
        }
        bubble.unbind(this, eventName);
        return canEvent.removeEventListener.apply(this, arguments);
    };
    Map.prototype.on = Map.prototype.bind = Map.prototype.addEventListener;
    Map.prototype.off = Map.prototype.unbind = Map.prototype.removeEventListener;
    Map.on = Map.bind = Map.addEventListener;
    Map.off = Map.unbind = Map.removeEventListener;
    canReflect.assignSymbols(Map.prototype, {
        'can.isMapLike': true,
        'can.isListLike': false,
        'can.isValueLike': false,
        'can.getKeyValue': Map.prototype._get,
        'can.setKeyValue': Map.prototype._set,
        'can.deleteKeyValue': Map.prototype._remove,
        'can.getOwnEnumerableKeys': function () {
            ObservationRecorder.add(this, '__keys');
            var enumerable = this.constructor.enumerable;
            if (enumerable) {
                return Object.keys(this._data).filter(function (key) {
                    return enumerable[key] !== false;
                }, this);
            } else {
                return Object.keys(this._data);
            }
        },
        'can.assignDeep': function (source) {
            canQueues.batch.start();
            canReflect.assignDeepMap(this, mapHelpers.removeSpecialKeys(canReflect.assignMap({}, source)));
            canQueues.batch.stop();
        },
        'can.updateDeep': function (source) {
            canQueues.batch.start();
            canReflect.updateDeepMap(this, mapHelpers.removeSpecialKeys(canReflect.assignMap({}, source)));
            canQueues.batch.stop();
        },
        'can.unwrap': mapHelpers.reflectUnwrap,
        'can.serialize': mapHelpers.reflectSerialize,
        'can.onKeyValue': function (key, handler, queue) {
            var translationHandler = function (ev, newValue, oldValue) {
                handler.call(this, newValue, oldValue);
            };
            singleReference.set(handler, this, translationHandler, key);
            this.addEventListener(key, translationHandler, queue);
        },
        'can.offKeyValue': function (key, handler, queue) {
            this.removeEventListener(key, singleReference.getAndDelete(handler, this, key), queue);
        },
        'can.keyHasDependencies': function (key) {
            return !!(this._computedAttrs && this._computedAttrs[key] && this._computedAttrs[key].compute);
        },
        'can.getKeyDependencies': function (key) {
            var ret;
            if (this._computedAttrs && this._computedAttrs[key] && this._computedAttrs[key].compute) {
                ret = {};
                ret.valueDependencies = new CIDSet();
                ret.valueDependencies.add(this._computedAttrs[key].compute);
            }
            return ret;
        }
    });
    if (!types.DefaultMap) {
        types.DefaultMap = Map;
    }
    module.exports = namespace.Map = Map;
});
/*can-list@4.0.0-pre.9#can-list*/
define('can-list', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-map',
    'can-map/bubble',
    'can-map/map-helpers',
    'can-queues',
    'can-event-queue/map/legacy/legacy',
    'can-observation',
    'can-cid',
    'can-util/js/is-promise/is-promise',
    'can-util/js/make-array/make-array',
    'can-util/js/assign/assign',
    'can-types',
    'can-util/js/each/each',
    'can-reflect',
    'can-symbol',
    'can-util/js/cid-map/cid-map'
], function (require, exports, module) {
    var namespace = require('can-namespace');
    var Map = require('can-map');
    var bubble = require('can-map/bubble');
    var mapHelpers = require('can-map/map-helpers');
    var queues = require('can-queues');
    var canEvent = require('can-event-queue/map/legacy/legacy');
    var Observation = require('can-observation');
    var CID = require('can-cid');
    var isPromise = require('can-util/js/is-promise/is-promise');
    var makeArray = require('can-util/js/make-array/make-array');
    var assign = require('can-util/js/assign/assign');
    var types = require('can-types');
    var each = require('can-util/js/each/each');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var CIDMap = require('can-util/js/cid-map/cid-map');
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
                queues.batch.start();
                var index = +attr, patches;
                if (!~('' + attr).indexOf('.') && !isNaN(index)) {
                    if (bubble.isBubbling(this, 'change')) {
                        canEvent.dispatch.call(this, {
                            type: 'change',
                            target: this
                        }, [
                            attr,
                            how,
                            newVal,
                            oldVal
                        ]);
                    }
                    if (how === 'add') {
                        patches = [{
                                insert: newVal,
                                index: index,
                                deleteCount: 0,
                                type: 'splice'
                            }];
                        canEvent.dispatch.call(this, {
                            type: how,
                            patches: patches
                        }, [
                            newVal,
                            index
                        ]);
                        canEvent.dispatch.call(this, 'length', [this.length]);
                        canEvent.dispatch.call(this, 'can.onPatches', [patches]);
                    } else if (how === 'remove') {
                        patches = [{
                                index: index,
                                deleteCount: oldVal.length,
                                type: 'splice'
                            }];
                        canEvent.dispatch.call(this, {
                            type: how,
                            patches: patches
                        }, [
                            oldVal,
                            index
                        ]);
                        canEvent.dispatch.call(this, 'length', [this.length]);
                        canEvent.dispatch.call(this, 'can.onPatches', [patches]);
                    } else {
                        canEvent.dispatch.call(this, how, [
                            newVal,
                            index
                        ]);
                    }
                } else {
                    Map.prototype._triggerChange.apply(this, arguments);
                }
                queues.batch.stop();
            },
            ___get: function (attr) {
                if (attr) {
                    var computedAttr = this._computedAttrs[attr];
                    if (computedAttr && computedAttr.compute) {
                        return canReflect.getValue(computedAttr.compute);
                    }
                    if (this[attr] && this[attr].isComputed && typeof this.constructor.prototype[attr] === 'function') {
                        return canReflect.getValue(this[attr]);
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
                return canReflect.serialize(this, CIDMap);
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
                queues.batch.start();
                if (howMany > 0) {
                    bubble.removeMany(this, removed);
                    this._triggerChange('' + index, 'remove', undefined, removed);
                }
                if (args.length > 2) {
                    bubble.addMany(this, added);
                    this._triggerChange('' + index, 'add', added, removed);
                }
                queues.batch.stop();
                return removed;
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
                if (canReflect.isObservableLike(arg) && canReflect.isListLike(arg) || Array.isArray(arg)) {
                    var arr = canReflect.isObservableLike(arg) && canReflect.isListLike(arg) ? makeArray(arg) : arg;
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
            this.forEach(function (item, index, list) {
                filtered = callback.call(thisArg || self, item, index, self);
                if (filtered) {
                    filteredList.push(item);
                }
            });
            return filteredList;
        },
        map: function (callback, thisArg) {
            var filteredList = new List(), self = this;
            this.forEach(function (item, index, list) {
                var mapped = callback.call(thisArg || self, item, index, self);
                filteredList.push(mapped);
            });
            return filteredList;
        }
    });
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
    canReflect.assignSymbols(List.prototype, {
        'can.isMoreListLikeThanMapLike': true,
        'can.isListLike': true,
        'can.getKeyValue': List.prototype._get,
        'can.setKeyValue': List.prototype._set,
        'can.deleteKeyValue': List.prototype._remove,
        'can.getOwnEnumerableKeys': function () {
            return Object.keys(this._data || {}).concat(this.map(function (val, index) {
                return index;
            }));
        },
        'can.assignDeep': function (source) {
            queues.batch.start();
            canReflect.assignDeepList(this, source);
            queues.batch.stop();
        },
        'can.updateDeep': function (source) {
            queues.batch.start();
            canReflect.updateDeepList(this, source);
            queues.batch.stop();
        },
        'can.unwrap': mapHelpers.reflectUnwrap,
        'can.serialize': mapHelpers.reflectSerialize,
        'can.onKeysAdded': function (handler) {
            this[canSymbol.for('can.onKeyValue')]('add', handler);
        },
        'can.onKeysRemoved': function (handler) {
            this[canSymbol.for('can.onKeyValue')]('remove', handler);
        },
        'can.onPatches': function (handler, queue) {
            this[canSymbol.for('can.onKeyValue')]('can.onPatches', handler, queue);
        },
        'can.offPatches': function (handler, queue) {
            this[canSymbol.for('can.offKeyValue')]('can.onPatches', handler, queue);
        },
        'can.splice': function (index, deleteCount, insert) {
            this.splice.apply(this, [
                index,
                deleteCount
            ].concat(insert));
        }
    });
    Map.List = List;
    module.exports = namespace.List = List;
});
/*can@4.0.0-pre.7#legacy*/
define('can/legacy', [
    'require',
    'exports',
    'module',
    'can-util/namespace',
    'can-compute',
    'can-view-model',
    'can-map',
    'can-list'
], function (require, exports, module) {
    var can = require('can-util/namespace');
    require('can-compute');
    require('can-view-model');
    require('can-map');
    require('can-list');
    module.exports = can;
});
/*can@4.0.0-pre.7#all*/
define('can/all', [
    'require',
    'exports',
    'module',
    'can-util/namespace',
    'can',
    'can/ecosystem',
    'can/legacy'
], function (require, exports, module) {
    var can = require('can-util/namespace');
    require('can');
    require('can/ecosystem');
    require('can/legacy');
    module.exports = can;
});
/*[global-shim-end]*/
(function(global) { // jshint ignore:line
	global._define = global.define;
	global.define = global.define.orig;
}
)(typeof self == "object" && self.Object == Object ? self : window);