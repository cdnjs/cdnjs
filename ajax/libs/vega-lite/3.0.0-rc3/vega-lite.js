(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vl = {})));
}(this, (function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
	            t[p[i]] = s[p[i]];
	    return t;
	}

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __param(paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	}

	function __metadata(metadataKey, metadataValue) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	}

	function __awaiter(thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	function __exportStar(m, exports) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}

	function __values(o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	}

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	function __await(v) {
	    return this instanceof __await ? (this.v = v, this) : new __await(v);
	}

	function __asyncGenerator(thisArg, _arguments, generator) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var g = generator.apply(thisArg, _arguments || []), i, q = [];
	    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	    function fulfill(value) { resume("next", value); }
	    function reject(value) { resume("throw", value); }
	    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	}

	function __asyncDelegator(o) {
	    var i, p;
	    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
	    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
	}

	function __asyncValues(o) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var m = o[Symbol.asyncIterator], i;
	    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	}

	function __makeTemplateObject(cooked, raw) {
	    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
	    return cooked;
	}
	function __importStar(mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result.default = mod;
	    return result;
	}

	function __importDefault(mod) {
	    return (mod && mod.__esModule) ? mod : { default: mod };
	}

	var tslib_1 = /*#__PURE__*/Object.freeze({
		__extends: __extends,
		get __assign () { return __assign; },
		__rest: __rest,
		__decorate: __decorate,
		__param: __param,
		__metadata: __metadata,
		__awaiter: __awaiter,
		__generator: __generator,
		__exportStar: __exportStar,
		__values: __values,
		__read: __read,
		__spread: __spread,
		__await: __await,
		__asyncGenerator: __asyncGenerator,
		__asyncDelegator: __asyncDelegator,
		__asyncValues: __asyncValues,
		__makeTemplateObject: __makeTemplateObject,
		__importStar: __importStar,
		__importDefault: __importDefault
	});

	function accessor(fn, fields, name) {
	  fn.fields = fields || [];
	  fn.fname = name;
	  return fn;
	}

	function accessorName(fn) {
	  return fn == null ? null : fn.fname;
	}

	function accessorFields(fn) {
	  return fn == null ? null : fn.fields;
	}

	function error(message) {
	  throw Error(message);
	}

	function splitAccessPath(p) {
	  var path = [],
	      q = null,
	      b = 0,
	      n = p.length,
	      s = '',
	      i, j, c;

	  p = p + '';

	  function push() {
	    path.push(s + p.substring(i, j));
	    s = '';
	    i = j + 1;
	  }

	  for (i=j=0; j<n; ++j) {
	    c = p[j];
	    if (c === '\\') {
	      s += p.substring(i, j);
	      i = ++j;
	    } else if (c === q) {
	      push();
	      q = null;
	      b = -1;
	    } else if (q) {
	      continue;
	    } else if (i === b && c === '"') {
	      i = j + 1;
	      q = c;
	    } else if (i === b && c === "'") {
	      i = j + 1;
	      q = c;
	    } else if (c === '.' && !b) {
	      if (j > i) {
	        push();
	      } else {
	        i = j + 1;
	      }
	    } else if (c === '[') {
	      if (j > i) push();
	      b = i = j + 1;
	    } else if (c === ']') {
	      if (!b) error('Access path missing open bracket: ' + p);
	      if (b > 0) push();
	      b = 0;
	      i = j + 1;
	    }
	  }

	  if (b) error('Access path missing closing bracket: ' + p);
	  if (q) error('Access path missing closing quote: ' + p);

	  if (j > i) {
	    j++;
	    push();
	  }

	  return path;
	}

	var isArray = Array.isArray;

	function isObject(_) {
	  return _ === Object(_);
	}

	function isString(_) {
	  return typeof _ === 'string';
	}

	function $(x) {
	  return isArray(x) ? '[' + x.map($) + ']'
	    : isObject(x) || isString(x) ?
	      // Output valid JSON and JS source strings.
	      // See http://timelessrepo.com/json-isnt-a-javascript-subset
	      JSON.stringify(x).replace('\u2028','\\u2028').replace('\u2029', '\\u2029')
	    : x;
	}

	function field(field, name) {
	  var path = splitAccessPath(field),
	      code = 'return _[' + path.map($).join('][') + '];';

	  return accessor(
	    Function('_', code),
	    [(field = path.length===1 ? path[0] : field)],
	    name || field
	  );
	}

	var empty = [];

	var id = field('id');

	var identity = accessor(function(_) { return _; }, empty, 'identity');

	var zero = accessor(function() { return 0; }, empty, 'zero');

	var one = accessor(function() { return 1; }, empty, 'one');

	var truthy = accessor(function() { return true; }, empty, 'true');

	var falsy = accessor(function() { return false; }, empty, 'false');

	function log(method, level, input) {
	  var args = [level].concat([].slice.call(input));
	  console[method].apply(console, args); // eslint-disable-line no-console
	}

	var None  = 0;
	var Error$1 = 1;
	var Warn  = 2;
	var Info  = 3;
	var Debug = 4;

	function logger(_) {
	  var level = _ || None;
	  return {
	    level: function(_) {
	      if (arguments.length) {
	        level = +_;
	        return this;
	      } else {
	        return level;
	      }
	    },
	    error: function() {
	      if (level >= Error$1) log('error', 'ERROR', arguments);
	      return this;
	    },
	    warn: function() {
	      if (level >= Warn) log('warn', 'WARN', arguments);
	      return this;
	    },
	    info: function() {
	      if (level >= Info) log('log', 'INFO', arguments);
	      return this;
	    },
	    debug: function() {
	      if (level >= Debug) log('log', 'DEBUG', arguments);
	      return this;
	    }
	  }
	}

	function peek(array) {
	  return array[array.length - 1];
	}

	function toNumber(_) {
	  return _ == null || _ === '' ? null : +_;
	}

	function exp(sign) {
	  return function(x) { return sign * Math.exp(x); };
	}

	function log$1(sign) {
	  return function(x) { return Math.log(sign * x); };
	}

	function pow(exponent) {
	  return function(x) {
	    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	  };
	}

	function pan(domain, delta, lift, ground) {
	  var d0 = lift(domain[0]),
	      d1 = lift(peek(domain)),
	      dd = (d1 - d0) * delta;

	  return [
	    ground(d0 - dd),
	    ground(d1 - dd)
	  ];
	}

	function panLinear(domain, delta) {
	  return pan(domain, delta, toNumber, identity);
	}

	function panLog(domain, delta) {
	  var sign = Math.sign(domain[0]);
	  return pan(domain, delta, log$1(sign), exp(sign));
	}

	function panPow(domain, delta, exponent) {
	  return pan(domain, delta, pow(exponent), pow(1/exponent));
	}

	function zoom(domain, anchor, scale, lift, ground) {
	  var d0 = lift(domain[0]),
	      d1 = lift(peek(domain)),
	      da = anchor != null ? lift(anchor) : (d0 + d1) / 2;

	  return [
	    ground(da + (d0 - da) * scale),
	    ground(da + (d1 - da) * scale)
	  ];
	}

	function zoomLinear(domain, anchor, scale) {
	  return zoom(domain, anchor, scale, toNumber, identity);
	}

	function zoomLog(domain, anchor, scale) {
	  var sign = Math.sign(domain[0]);
	  return zoom(domain, anchor, scale, log$1(sign), exp(sign));
	}

	function zoomPow(domain, anchor, scale, exponent) {
	  return zoom(domain, anchor, scale, pow(exponent), pow(1/exponent));
	}

	function array(_) {
	  return _ != null ? (isArray(_) ? _ : [_]) : [];
	}

	function isFunction(_) {
	  return typeof _ === 'function';
	}

	function compare(fields, orders) {
	  var idx = [],
	      cmp = (fields = array(fields)).map(function(f, i) {
	        if (f == null) {
	          return null;
	        } else {
	          idx.push(i);
	          return isFunction(f) ? f
	            : splitAccessPath(f).map($).join('][');
	        }
	      }),
	      n = idx.length - 1,
	      ord = array(orders),
	      code = 'var u,v;return ',
	      i, j, f, u, v, d, t, lt, gt;

	  if (n < 0) return null;

	  for (j=0; j<=n; ++j) {
	    i = idx[j];
	    f = cmp[i];

	    if (isFunction(f)) {
	      d = 'f' + i;
	      u = '(u=this.' + d + '(a))';
	      v = '(v=this.' + d + '(b))';
	      (t = t || {})[d] = f;
	    } else {
	      u = '(u=a['+f+'])';
	      v = '(v=b['+f+'])';
	    }

	    d = '((v=v instanceof Date?+v:v),(u=u instanceof Date?+u:u))';

	    if (ord[i] !== 'descending') {
	      gt = 1;
	      lt = -1;
	    } else {
	      gt = -1;
	      lt = 1;
	    }

	    code += '(' + u+'<'+v+'||u==null)&&v!=null?' + lt
	      + ':(u>v||v==null)&&u!=null?' + gt
	      + ':'+d+'!==u&&v===v?' + lt
	      + ':v!==v&&u===u?' + gt
	      + (i < n ? ':' : ':0');
	  }

	  f = Function('a', 'b', code + ';');
	  if (t) f = f.bind(t);

	  fields = fields.reduce(function(map, field) {
	    if (isFunction(field)) {
	      (accessorFields(field) || []).forEach(function(_) { map[_] = 1; });
	    } else if (field != null) {
	      map[field + ''] = 1;
	    }
	    return map;
	  }, {});

	  return accessor(f, Object.keys(fields));
	}

	function constant(_) {
	  return isFunction(_) ? _ : function() { return _; };
	}

	function debounce(delay, handler) {
	  var tid, evt;

	  function callback() {
	    handler(evt);
	    tid = evt = null;
	  }

	  return function(e) {
	    evt = e;
	    if (tid) clearTimeout(tid);
	    tid = setTimeout(callback, delay);
	  };
	}

	function extend(_) {
	  for (var x, k, i=1, len=arguments.length; i<len; ++i) {
	    x = arguments[i];
	    for (k in x) { _[k] = x[k]; }
	  }
	  return _;
	}

	function extentIndex(array, f) {
	  var i = -1,
	      n = array.length,
	      a, b, c, u, v;

	  if (f == null) {
	    while (++i < n) {
	      b = array[i];
	      if (b != null && b >= b) {
	        a = c = b;
	        break;
	      }
	    }
	    u = v = i;
	    while (++i < n) {
	      b = array[i];
	      if (b != null) {
	        if (a > b) {
	          a = b;
	          u = i;
	        }
	        if (c < b) {
	          c = b;
	          v = i;
	        }
	      }
	    }
	  } else {
	    while (++i < n) {
	      b = f(array[i], i, array);
	      if (b != null && b >= b) {
	        a = c = b;
	        break;
	      }
	    }
	    u = v = i;
	    while (++i < n) {
	      b = f(array[i], i, array);
	      if (b != null) {
	        if (a > b) {
	          a = b;
	          u = i;
	        }
	        if (c < b) {
	          c = b;
	          v = i;
	        }
	      }
	    }
	  }

	  return [u, v];
	}

	var NULL = {};

	function fastmap(input) {
	  var obj = {},
	      map,
	      test;

	  function has(key) {
	    return obj.hasOwnProperty(key) && obj[key] !== NULL;
	  }

	  map = {
	    size: 0,
	    empty: 0,
	    object: obj,
	    has: has,
	    get: function(key) {
	      return has(key) ? obj[key] : undefined;
	    },
	    set: function(key, value) {
	      if (!has(key)) {
	        ++map.size;
	        if (obj[key] === NULL) --map.empty;
	      }
	      obj[key] = value;
	      return this;
	    },
	    delete: function(key) {
	      if (has(key)) {
	        --map.size;
	        ++map.empty;
	        obj[key] = NULL;
	      }
	      return this;
	    },
	    clear: function() {
	      map.size = map.empty = 0;
	      map.object = obj = {};
	    },
	    test: function(_) {
	      if (arguments.length) {
	        test = _;
	        return map;
	      } else {
	        return test;
	      }
	    },
	    clean: function() {
	      var next = {},
	          size = 0,
	          key, value;
	      for (key in obj) {
	        value = obj[key];
	        if (value !== NULL && (!test || !test(value))) {
	          next[key] = value;
	          ++size;
	        }
	      }
	      map.size = size;
	      map.empty = 0;
	      map.object = (obj = next);
	    }
	  };

	  if (input) Object.keys(input).forEach(function(key) {
	    map.set(key, input[key]);
	  });

	  return map;
	}

	function inherits(child, parent) {
	  var proto = (child.prototype = Object.create(parent.prototype));
	  proto.constructor = child;
	  return proto;
	}

	function isBoolean(_) {
	  return typeof _ === 'boolean';
	}

	function isDate(_) {
	  return Object.prototype.toString.call(_) === '[object Date]';
	}

	function isNumber(_) {
	  return typeof _ === 'number';
	}

	function isRegExp(_) {
	  return Object.prototype.toString.call(_) === '[object RegExp]';
	}

	function key(fields, flat) {
	  if (fields) {
	    fields = flat
	      ? array(fields).map(function(f) { return f.replace(/\\(.)/g, '$1'); })
	      : array(fields);
	  }

	  var fn = !(fields && fields.length)
	    ? function() { return ''; }
	    : Function('_', 'return \'\'+' +
	        fields.map(function(f) {
	          return '_[' + (flat
	              ? $(f)
	              : splitAccessPath(f).map($).join('][')
	            ) + ']';
	        }).join('+\'|\'+') + ';');

	  return accessor(fn, fields, 'key');
	}

	function merge(compare, array0, array1, output) {
	  var n0 = array0.length,
	      n1 = array1.length;

	  if (!n1) return array0;
	  if (!n0) return array1;

	  var merged = output || new array0.constructor(n0 + n1),
	      i0 = 0, i1 = 0, i = 0;

	  for (; i0<n0 && i1<n1; ++i) {
	    merged[i] = compare(array0[i0], array1[i1]) > 0
	       ? array1[i1++]
	       : array0[i0++];
	  }

	  for (; i0<n0; ++i0, ++i) {
	    merged[i] = array0[i0];
	  }

	  for (; i1<n1; ++i1, ++i) {
	    merged[i] = array1[i1];
	  }

	  return merged;
	}

	function repeat(str, reps) {
	  var s = '';
	  while (--reps >= 0) s += str;
	  return s;
	}

	function pad(str, length, padchar, align) {
	  var c = padchar || ' ',
	      s = str + '',
	      n = length - s.length;

	  return n <= 0 ? s
	    : align === 'left' ? repeat(c, n) + s
	    : align === 'center' ? repeat(c, ~~(n/2)) + s + repeat(c, Math.ceil(n/2))
	    : s + repeat(c, n);
	}

	function toBoolean(_) {
	  return _ == null || _ === '' ? null : !_ || _ === 'false' || _ === '0' ? false : !!_;
	}

	function defaultParser(_) {
	  return isNumber(_) ? _ : isDate(_) ? _ : Date.parse(_);
	}

	function toDate(_, parser) {
	  parser = parser || defaultParser;
	  return _ == null || _ === '' ? null : parser(_);
	}

	function toString(_) {
	  return _ == null || _ === '' ? null : _ + '';
	}

	function toSet(_) {
	  for (var s={}, i=0, n=_.length; i<n; ++i) s[_[i]] = true;
	  return s;
	}

	function truncate(str, length, align, ellipsis) {
	  var e = ellipsis != null ? ellipsis : '\u2026',
	      s = str + '',
	      n = s.length,
	      l = Math.max(0, length - e.length);

	  return n <= length ? s
	    : align === 'left' ? e + s.slice(n - l)
	    : align === 'center' ? s.slice(0, Math.ceil(l/2)) + e + s.slice(n - ~~(l/2))
	    : s.slice(0, l) + e;
	}

	function visitArray(array, filter, visitor) {
	  if (array) {
	    var i = 0, n = array.length, t;
	    if (filter) {
	      for (; i<n; ++i) {
	        if (t = filter(array[i])) visitor(t, i, array);
	      }
	    } else {
	      array.forEach(visitor);
	    }
	  }
	}



	var vega_util_1 = /*#__PURE__*/Object.freeze({
		accessor: accessor,
		accessorName: accessorName,
		accessorFields: accessorFields,
		id: id,
		identity: identity,
		zero: zero,
		one: one,
		truthy: truthy,
		falsy: falsy,
		logger: logger,
		None: None,
		Error: Error$1,
		Warn: Warn,
		Info: Info,
		Debug: Debug,
		panLinear: panLinear,
		panLog: panLog,
		panPow: panPow,
		zoomLinear: zoomLinear,
		zoomLog: zoomLog,
		zoomPow: zoomPow,
		array: array,
		compare: compare,
		constant: constant,
		debounce: debounce,
		error: error,
		extend: extend,
		extentIndex: extentIndex,
		fastmap: fastmap,
		field: field,
		inherits: inherits,
		isArray: isArray,
		isBoolean: isBoolean,
		isDate: isDate,
		isFunction: isFunction,
		isNumber: isNumber,
		isObject: isObject,
		isRegExp: isRegExp,
		isString: isString,
		key: key,
		merge: merge,
		pad: pad,
		peek: peek,
		repeat: repeat,
		splitAccessPath: splitAccessPath,
		stringValue: $,
		toBoolean: toBoolean,
		toDate: toDate,
		toNumber: toNumber,
		toString: toString,
		toSet: toSet,
		truncate: truncate,
		visitArray: visitArray
	});

	var at, // The index of the current character
	    ch, // The current character
	    escapee = {
	        '"':  '"',
	        '\\': '\\',
	        '/':  '/',
	        b:    '\b',
	        f:    '\f',
	        n:    '\n',
	        r:    '\r',
	        t:    '\t'
	    },
	    text,

	    error$1 = function (m) {
	        // Call error when something is wrong.
	        throw {
	            name:    'SyntaxError',
	            message: m,
	            at:      at,
	            text:    text
	        };
	    },
	    
	    next = function (c) {
	        // If a c parameter is provided, verify that it matches the current character.
	        if (c && c !== ch) {
	            error$1("Expected '" + c + "' instead of '" + ch + "'");
	        }
	        
	        // Get the next character. When there are no more characters,
	        // return the empty string.
	        
	        ch = text.charAt(at);
	        at += 1;
	        return ch;
	    },
	    
	    number = function () {
	        // Parse a number value.
	        var number,
	            string = '';
	        
	        if (ch === '-') {
	            string = '-';
	            next('-');
	        }
	        while (ch >= '0' && ch <= '9') {
	            string += ch;
	            next();
	        }
	        if (ch === '.') {
	            string += '.';
	            while (next() && ch >= '0' && ch <= '9') {
	                string += ch;
	            }
	        }
	        if (ch === 'e' || ch === 'E') {
	            string += ch;
	            next();
	            if (ch === '-' || ch === '+') {
	                string += ch;
	                next();
	            }
	            while (ch >= '0' && ch <= '9') {
	                string += ch;
	                next();
	            }
	        }
	        number = +string;
	        if (!isFinite(number)) {
	            error$1("Bad number");
	        } else {
	            return number;
	        }
	    },
	    
	    string = function () {
	        // Parse a string value.
	        var hex,
	            i,
	            string = '',
	            uffff;
	        
	        // When parsing for string values, we must look for " and \ characters.
	        if (ch === '"') {
	            while (next()) {
	                if (ch === '"') {
	                    next();
	                    return string;
	                } else if (ch === '\\') {
	                    next();
	                    if (ch === 'u') {
	                        uffff = 0;
	                        for (i = 0; i < 4; i += 1) {
	                            hex = parseInt(next(), 16);
	                            if (!isFinite(hex)) {
	                                break;
	                            }
	                            uffff = uffff * 16 + hex;
	                        }
	                        string += String.fromCharCode(uffff);
	                    } else if (typeof escapee[ch] === 'string') {
	                        string += escapee[ch];
	                    } else {
	                        break;
	                    }
	                } else {
	                    string += ch;
	                }
	            }
	        }
	        error$1("Bad string");
	    },

	    white = function () {

	// Skip whitespace.

	        while (ch && ch <= ' ') {
	            next();
	        }
	    },

	    word = function () {

	// true, false, or null.

	        switch (ch) {
	        case 't':
	            next('t');
	            next('r');
	            next('u');
	            next('e');
	            return true;
	        case 'f':
	            next('f');
	            next('a');
	            next('l');
	            next('s');
	            next('e');
	            return false;
	        case 'n':
	            next('n');
	            next('u');
	            next('l');
	            next('l');
	            return null;
	        }
	        error$1("Unexpected '" + ch + "'");
	    },

	    value,  // Place holder for the value function.

	    array$1 = function () {

	// Parse an array value.

	        var array = [];

	        if (ch === '[') {
	            next('[');
	            white();
	            if (ch === ']') {
	                next(']');
	                return array;   // empty array
	            }
	            while (ch) {
	                array.push(value());
	                white();
	                if (ch === ']') {
	                    next(']');
	                    return array;
	                }
	                next(',');
	                white();
	            }
	        }
	        error$1("Bad array");
	    },

	    object = function () {

	// Parse an object value.

	        var key,
	            object = {};

	        if (ch === '{') {
	            next('{');
	            white();
	            if (ch === '}') {
	                next('}');
	                return object;   // empty object
	            }
	            while (ch) {
	                key = string();
	                white();
	                next(':');
	                if (Object.hasOwnProperty.call(object, key)) {
	                    error$1('Duplicate key "' + key + '"');
	                }
	                object[key] = value();
	                white();
	                if (ch === '}') {
	                    next('}');
	                    return object;
	                }
	                next(',');
	                white();
	            }
	        }
	        error$1("Bad object");
	    };

	value = function () {

	// Parse a JSON value. It could be an object, an array, a string, a number,
	// or a word.

	    white();
	    switch (ch) {
	    case '{':
	        return object();
	    case '[':
	        return array$1();
	    case '"':
	        return string();
	    case '-':
	        return number();
	    default:
	        return ch >= '0' && ch <= '9' ? number() : word();
	    }
	};

	// Return the json_parse function. It will have access to all of the above
	// functions and variables.

	var parse = function (source, reviver) {
	    var result;
	    
	    text = source;
	    at = 0;
	    ch = ' ';
	    result = value();
	    white();
	    if (ch) {
	        error$1("Syntax error");
	    }

	    // If there is a reviver function, we recursively walk the new structure,
	    // passing each name/value pair to the reviver function for possible
	    // transformation, starting with a temporary root object that holds the result
	    // in an empty key. If there is not a reviver function, we simply return the
	    // result.

	    return typeof reviver === 'function' ? (function walk(holder, key) {
	        var k, v, value = holder[key];
	        if (value && typeof value === 'object') {
	            for (k in value) {
	                if (Object.prototype.hasOwnProperty.call(value, k)) {
	                    v = walk(value, k);
	                    if (v !== undefined) {
	                        value[k] = v;
	                    } else {
	                        delete value[k];
	                    }
	                }
	            }
	        }
	        return reviver.call(holder, key, value);
	    }({'': result}, '')) : result;
	};

	var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	    gap,
	    indent,
	    meta = {    // table of character substitutions
	        '\b': '\\b',
	        '\t': '\\t',
	        '\n': '\\n',
	        '\f': '\\f',
	        '\r': '\\r',
	        '"' : '\\"',
	        '\\': '\\\\'
	    },
	    rep;

	function quote(string) {
	    // If the string contains no control characters, no quote characters, and no
	    // backslash characters, then we can safely slap some quotes around it.
	    // Otherwise we must also replace the offending characters with safe escape
	    // sequences.
	    
	    escapable.lastIndex = 0;
	    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	        var c = meta[a];
	        return typeof c === 'string' ? c :
	            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	    }) + '"' : '"' + string + '"';
	}

	function str(key, holder) {
	    // Produce a string from holder[key].
	    var i,          // The loop counter.
	        k,          // The member key.
	        v,          // The member value.
	        length,
	        mind = gap,
	        partial,
	        value = holder[key];
	    
	    // If the value has a toJSON method, call it to obtain a replacement value.
	    if (value && typeof value === 'object' &&
	            typeof value.toJSON === 'function') {
	        value = value.toJSON(key);
	    }
	    
	    // If we were called with a replacer function, then call the replacer to
	    // obtain a replacement value.
	    if (typeof rep === 'function') {
	        value = rep.call(holder, key, value);
	    }
	    
	    // What happens next depends on the value's type.
	    switch (typeof value) {
	        case 'string':
	            return quote(value);
	        
	        case 'number':
	            // JSON numbers must be finite. Encode non-finite numbers as null.
	            return isFinite(value) ? String(value) : 'null';
	        
	        case 'boolean':
	        case 'null':
	            // If the value is a boolean or null, convert it to a string. Note:
	            // typeof null does not produce 'null'. The case is included here in
	            // the remote chance that this gets fixed someday.
	            return String(value);
	            
	        case 'object':
	            if (!value) return 'null';
	            gap += indent;
	            partial = [];
	            
	            // Array.isArray
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }
	                
	                // Join all of the elements together, separated with commas, and
	                // wrap them in brackets.
	                v = partial.length === 0 ? '[]' : gap ?
	                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
	                    '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }
	            
	            // If the replacer is an array, use it to select the members to be
	            // stringified.
	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    k = rep[i];
	                    if (typeof k === 'string') {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	            else {
	                // Otherwise, iterate through all of the keys in the object.
	                for (k in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	            
	        // Join all of the member texts together, separated with commas,
	        // and wrap them in braces.

	        v = partial.length === 0 ? '{}' : gap ?
	            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
	            '{' + partial.join(',') + '}';
	        gap = mind;
	        return v;
	    }
	}

	var stringify = function (value, replacer, space) {
	    var i;
	    gap = '';
	    indent = '';
	    
	    // If the space parameter is a number, make an indent string containing that
	    // many spaces.
	    if (typeof space === 'number') {
	        for (i = 0; i < space; i += 1) {
	            indent += ' ';
	        }
	    }
	    // If the space parameter is a string, it will be used as the indent string.
	    else if (typeof space === 'string') {
	        indent = space;
	    }

	    // If there is a replacer, it must be a function or an array.
	    // Otherwise, throw an error.
	    rep = replacer;
	    if (replacer && typeof replacer !== 'function'
	    && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
	        throw new Error('JSON.stringify');
	    }
	    
	    // Make a fake root object containing our value under the key of ''.
	    // Return the result of stringifying the value.
	    return str('', {'': value});
	};

	var parse$1 = parse;
	var stringify$1 = stringify;

	var jsonify = {
		parse: parse$1,
		stringify: stringify$1
	};

	var json = typeof JSON !== 'undefined' ? JSON : jsonify;

	var jsonStableStringify = function (obj, opts) {
	    if (!opts) opts = {};
	    if (typeof opts === 'function') opts = { cmp: opts };
	    var space = opts.space || '';
	    if (typeof space === 'number') space = Array(space+1).join(' ');
	    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
	    var replacer = opts.replacer || function(key, value) { return value; };

	    var cmp = opts.cmp && (function (f) {
	        return function (node) {
	            return function (a, b) {
	                var aobj = { key: a, value: node[a] };
	                var bobj = { key: b, value: node[b] };
	                return f(aobj, bobj);
	            };
	        };
	    })(opts.cmp);

	    var seen = [];
	    return (function stringify (parent, key, node, level) {
	        var indent = space ? ('\n' + new Array(level + 1).join(space)) : '';
	        var colonSeparator = space ? ': ' : ':';

	        if (node && node.toJSON && typeof node.toJSON === 'function') {
	            node = node.toJSON();
	        }

	        node = replacer.call(parent, key, node);

	        if (node === undefined) {
	            return;
	        }
	        if (typeof node !== 'object' || node === null) {
	            return json.stringify(node);
	        }
	        if (isArray$1(node)) {
	            var out = [];
	            for (var i = 0; i < node.length; i++) {
	                var item = stringify(node, i, node[i], level+1) || json.stringify(null);
	                out.push(indent + space + item);
	            }
	            return '[' + out.join(',') + indent + ']';
	        }
	        else {
	            if (seen.indexOf(node) !== -1) {
	                if (cycles) return json.stringify('__cycle__');
	                throw new TypeError('Converting circular structure to JSON');
	            }
	            else seen.push(node);

	            var keys = objectKeys(node).sort(cmp && cmp(node));
	            var out = [];
	            for (var i = 0; i < keys.length; i++) {
	                var key = keys[i];
	                var value = stringify(node, key, node[key], level+1);

	                if(!value) continue;

	                var keyValue = json.stringify(key)
	                    + colonSeparator
	                    + value;
	                out.push(indent + space + keyValue);
	            }
	            seen.splice(seen.indexOf(node), 1);
	            return '{' + out.join(',') + indent + '}';
	        }
	    })({ '': obj }, '', obj, 0);
	};

	var isArray$1 = Array.isArray || function (x) {
	    return {}.toString.call(x) === '[object Array]';
	};

	var objectKeys = Object.keys || function (obj) {
	    var has = Object.prototype.hasOwnProperty || function () { return true };
	    var keys = [];
	    for (var key in obj) {
	        if (has.call(obj, key)) keys.push(key);
	    }
	    return keys;
	};

	var logical = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function isLogicalOr(op) {
	    return !!op.or;
	}
	exports.isLogicalOr = isLogicalOr;
	function isLogicalAnd(op) {
	    return !!op.and;
	}
	exports.isLogicalAnd = isLogicalAnd;
	function isLogicalNot(op) {
	    return !!op.not;
	}
	exports.isLogicalNot = isLogicalNot;
	function forEachLeaf(op, fn) {
	    if (isLogicalNot(op)) {
	        forEachLeaf(op.not, fn);
	    }
	    else if (isLogicalAnd(op)) {
	        for (var _i = 0, _a = op.and; _i < _a.length; _i++) {
	            var subop = _a[_i];
	            forEachLeaf(subop, fn);
	        }
	    }
	    else if (isLogicalOr(op)) {
	        for (var _b = 0, _c = op.or; _b < _c.length; _b++) {
	            var subop = _c[_b];
	            forEachLeaf(subop, fn);
	        }
	    }
	    else {
	        fn(op);
	    }
	}
	exports.forEachLeaf = forEachLeaf;
	function normalizeLogicalOperand(op, normalizer) {
	    if (isLogicalNot(op)) {
	        return { not: normalizeLogicalOperand(op.not, normalizer) };
	    }
	    else if (isLogicalAnd(op)) {
	        return { and: op.and.map(function (o) { return normalizeLogicalOperand(o, normalizer); }) };
	    }
	    else if (isLogicalOr(op)) {
	        return { or: op.or.map(function (o) { return normalizeLogicalOperand(o, normalizer); }) };
	    }
	    else {
	        return normalizer(op);
	    }
	}
	exports.normalizeLogicalOperand = normalizeLogicalOperand;

	});

	unwrapExports(logical);
	var logical_1 = logical.isLogicalOr;
	var logical_2 = logical.isLogicalAnd;
	var logical_3 = logical.isLogicalNot;
	var logical_4 = logical.forEachLeaf;
	var logical_5 = logical.normalizeLogicalOperand;

	var util = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var json_stable_stringify_1 = tslib_1.__importDefault(jsonStableStringify);


	/**
	 * Creates an object composed of the picked object properties.
	 *
	 * Example:  (from lodash)
	 *
	 * var object = {'a': 1, 'b': '2', 'c': 3};
	 * pick(object, ['a', 'c']);
	 * // → {'a': 1, 'c': 3}
	 *
	 */
	function pick(obj, props) {
	    var copy = {};
	    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
	        var prop = props_1[_i];
	        if (obj.hasOwnProperty(prop)) {
	            copy[prop] = obj[prop];
	        }
	    }
	    return copy;
	}
	exports.pick = pick;
	/**
	 * The opposite of _.pick; this method creates an object composed of the own
	 * and inherited enumerable string keyed properties of object that are not omitted.
	 */
	function omit(obj, props) {
	    var copy = tslib_1.__assign({}, obj);
	    for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
	        var prop = props_2[_i];
	        delete copy[prop];
	    }
	    return copy;
	}
	exports.omit = omit;
	/**
	 * Converts any object into a string representation that can be consumed by humans.
	 */
	exports.stringify = json_stable_stringify_1.default;
	/**
	 * Converts any object into a string of limited size, or a number.
	 */
	function hash(a) {
	    if (vega_util_1.isNumber(a)) {
	        return a;
	    }
	    var str = vega_util_1.isString(a) ? a : json_stable_stringify_1.default(a);
	    // short strings can be used as hash directly, longer strings are hashed to reduce memory usage
	    if (str.length < 100) {
	        return str;
	    }
	    // from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
	    var h = 0;
	    for (var i = 0; i < str.length; i++) {
	        var char = str.charCodeAt(i);
	        h = (h << 5) - h + char;
	        h = h & h; // Convert to 32bit integer
	    }
	    return h;
	}
	exports.hash = hash;
	function contains(array, item) {
	    return array.indexOf(item) > -1;
	}
	exports.contains = contains;
	/** Returns the array without the elements in item */
	function without(array, excludedItems) {
	    return array.filter(function (item) { return !contains(excludedItems, item); });
	}
	exports.without = without;
	function union(array, other) {
	    return array.concat(without(other, array));
	}
	exports.union = union;
	/**
	 * Returns true if any item returns true.
	 */
	function some(arr, f) {
	    var i = 0;
	    for (var k = 0; k < arr.length; k++) {
	        if (f(arr[k], k, i++)) {
	            return true;
	        }
	    }
	    return false;
	}
	exports.some = some;
	/**
	 * Returns true if all items return true.
	 */
	function every(arr, f) {
	    var i = 0;
	    for (var k = 0; k < arr.length; k++) {
	        if (!f(arr[k], k, i++)) {
	            return false;
	        }
	    }
	    return true;
	}
	exports.every = every;
	function flatten(arrays) {
	    return [].concat.apply([], arrays);
	}
	exports.flatten = flatten;
	/**
	 * recursively merges src into dest
	 */
	function mergeDeep(dest) {
	    var src = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        src[_i - 1] = arguments[_i];
	    }
	    for (var _a = 0, src_1 = src; _a < src_1.length; _a++) {
	        var s = src_1[_a];
	        dest = deepMerge_(dest, s);
	    }
	    return dest;
	}
	exports.mergeDeep = mergeDeep;
	// recursively merges src into dest
	function deepMerge_(dest, src) {
	    if (typeof src !== 'object' || src === null) {
	        return dest;
	    }
	    for (var p in src) {
	        if (!src.hasOwnProperty(p)) {
	            continue;
	        }
	        if (src[p] === undefined) {
	            continue;
	        }
	        if (typeof src[p] !== 'object' || vega_util_1.isArray(src[p]) || src[p] === null) {
	            dest[p] = src[p];
	        }
	        else if (typeof dest[p] !== 'object' || dest[p] === null) {
	            dest[p] = mergeDeep(vega_util_1.isArray(src[p].constructor) ? [] : {}, src[p]);
	        }
	        else {
	            mergeDeep(dest[p], src[p]);
	        }
	    }
	    return dest;
	}
	function unique(values, f) {
	    var results = [];
	    var u = {};
	    var v;
	    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
	        var val = values_1[_i];
	        v = f(val);
	        if (v in u) {
	            continue;
	        }
	        u[v] = 1;
	        results.push(val);
	    }
	    return results;
	}
	exports.unique = unique;
	/**
	 * Returns true if the two dictionaries disagree. Applies only to defined values.
	 */
	function differ(dict, other) {
	    for (var key in dict) {
	        if (dict.hasOwnProperty(key)) {
	            if (other[key] && dict[key] && other[key] !== dict[key]) {
	                return true;
	            }
	        }
	    }
	    return false;
	}
	exports.differ = differ;
	function hasIntersection(a, b) {
	    for (var key in a) {
	        if (key in b) {
	            return true;
	        }
	    }
	    return false;
	}
	exports.hasIntersection = hasIntersection;
	function isNumeric(num) {
	    return !isNaN(num);
	}
	exports.isNumeric = isNumeric;
	function differArray(array, other) {
	    if (array.length !== other.length) {
	        return true;
	    }
	    array.sort();
	    other.sort();
	    for (var i = 0; i < array.length; i++) {
	        if (other[i] !== array[i]) {
	            return true;
	        }
	    }
	    return false;
	}
	exports.differArray = differArray;
	// This is a stricter version of Object.keys but with better types. See https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
	exports.keys = Object.keys;
	function vals(x) {
	    var _vals = [];
	    for (var k in x) {
	        if (x.hasOwnProperty(k)) {
	            _vals.push(x[k]);
	        }
	    }
	    return _vals;
	}
	exports.vals = vals;
	function flagKeys(f) {
	    return exports.keys(f);
	}
	exports.flagKeys = flagKeys;
	function duplicate(obj) {
	    return JSON.parse(JSON.stringify(obj));
	}
	exports.duplicate = duplicate;
	function isBoolean(b) {
	    return b === true || b === false;
	}
	exports.isBoolean = isBoolean;
	/**
	 * Convert a string into a valid variable name
	 */
	function varName(s) {
	    // Replace non-alphanumeric characters (anything besides a-zA-Z0-9_) with _
	    var alphanumericS = s.replace(/\W/g, '_');
	    // Add _ if the string has leading numbers.
	    return (s.match(/^\d+/) ? '_' : '') + alphanumericS;
	}
	exports.varName = varName;
	function logicalExpr(op, cb) {
	    if (logical.isLogicalNot(op)) {
	        return '!(' + logicalExpr(op.not, cb) + ')';
	    }
	    else if (logical.isLogicalAnd(op)) {
	        return '(' + op.and.map(function (and) { return logicalExpr(and, cb); }).join(') && (') + ')';
	    }
	    else if (logical.isLogicalOr(op)) {
	        return '(' + op.or.map(function (or) { return logicalExpr(or, cb); }).join(') || (') + ')';
	    }
	    else {
	        return cb(op);
	    }
	}
	exports.logicalExpr = logicalExpr;
	/**
	 * Delete nested property of an object, and delete the ancestors of the property if they become empty.
	 */
	function deleteNestedProperty(obj, orderedProps) {
	    if (orderedProps.length === 0) {
	        return true;
	    }
	    var prop = orderedProps.shift();
	    if (deleteNestedProperty(obj[prop], orderedProps)) {
	        delete obj[prop];
	    }
	    return Object.keys(obj).length === 0;
	}
	exports.deleteNestedProperty = deleteNestedProperty;
	function titlecase(s) {
	    return s.charAt(0).toUpperCase() + s.substr(1);
	}
	exports.titlecase = titlecase;
	/**
	 * Converts a path to an access path with datum.
	 * @param path The field name.
	 * @param datum The string to use for `datum`.
	 */
	function accessPathWithDatum(path, datum) {
	    if (datum === void 0) { datum = 'datum'; }
	    var pieces = vega_util_1.splitAccessPath(path);
	    var prefixes = [];
	    for (var i = 1; i <= pieces.length; i++) {
	        var prefix = "[" + pieces
	            .slice(0, i)
	            .map(vega_util_1.stringValue)
	            .join('][') + "]";
	        prefixes.push("" + datum + prefix);
	    }
	    return prefixes.join(' && ');
	}
	exports.accessPathWithDatum = accessPathWithDatum;
	/**
	 * Return access with datum to the flattened field.
	 *
	 * @param path The field name.
	 * @param datum The string to use for `datum`.
	 */
	function flatAccessWithDatum(path, datum) {
	    if (datum === void 0) { datum = 'datum'; }
	    return datum + "[" + vega_util_1.stringValue(vega_util_1.splitAccessPath(path).join('.')) + "]";
	}
	exports.flatAccessWithDatum = flatAccessWithDatum;
	/**
	 * Replaces path accesses with access to non-nested field.
	 * For example, `foo["bar"].baz` becomes `foo\\.bar\\.baz`.
	 */
	function replacePathInField(path) {
	    return "" + vega_util_1.splitAccessPath(path)
	        .map(function (p) { return p.replace('.', '\\.'); })
	        .join('\\.');
	}
	exports.replacePathInField = replacePathInField;
	/**
	 * Remove path accesses with access from field.
	 * For example, `foo["bar"].baz` becomes `foo.bar.baz`.
	 */
	function removePathFromField(path) {
	    return "" + vega_util_1.splitAccessPath(path).join('.');
	}
	exports.removePathFromField = removePathFromField;
	/**
	 * Count the depth of the path. Returns 1 for fields that are not nested.
	 */
	function accessPathDepth(path) {
	    if (!path) {
	        return 0;
	    }
	    return vega_util_1.splitAccessPath(path).length;
	}
	exports.accessPathDepth = accessPathDepth;
	/**
	 * This is a replacement for chained || for numeric properties or properties that respect null so that 0 will be included.
	 */
	function getFirstDefined() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
	        var arg = args_1[_a];
	        if (arg !== undefined) {
	            return arg;
	        }
	    }
	    return undefined;
	}
	exports.getFirstDefined = getFirstDefined;

	});

	unwrapExports(util);
	var util_1 = util.pick;
	var util_2 = util.omit;
	var util_3 = util.stringify;
	var util_4 = util.hash;
	var util_5 = util.contains;
	var util_6 = util.without;
	var util_7 = util.union;
	var util_8 = util.some;
	var util_9 = util.every;
	var util_10 = util.flatten;
	var util_11 = util.mergeDeep;
	var util_12 = util.unique;
	var util_13 = util.differ;
	var util_14 = util.hasIntersection;
	var util_15 = util.isNumeric;
	var util_16 = util.differArray;
	var util_17 = util.keys;
	var util_18 = util.vals;
	var util_19 = util.flagKeys;
	var util_20 = util.duplicate;
	var util_21 = util.isBoolean;
	var util_22 = util.varName;
	var util_23 = util.logicalExpr;
	var util_24 = util.deleteNestedProperty;
	var util_25 = util.titlecase;
	var util_26 = util.accessPathWithDatum;
	var util_27 = util.flatAccessWithDatum;
	var util_28 = util.replacePathInField;
	var util_29 = util.removePathFromField;
	var util_30 = util.accessPathDepth;
	var util_31 = util.getFirstDefined;

	var aggregate = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var AGGREGATE_OP_INDEX = {
	    argmax: 1,
	    argmin: 1,
	    average: 1,
	    count: 1,
	    distinct: 1,
	    max: 1,
	    mean: 1,
	    median: 1,
	    min: 1,
	    missing: 1,
	    q1: 1,
	    q3: 1,
	    ci0: 1,
	    ci1: 1,
	    stderr: 1,
	    stdev: 1,
	    stdevp: 1,
	    sum: 1,
	    valid: 1,
	    values: 1,
	    variance: 1,
	    variancep: 1
	};
	exports.AGGREGATE_OPS = util.flagKeys(AGGREGATE_OP_INDEX);
	function isAggregateOp(a) {
	    return !!AGGREGATE_OP_INDEX[a];
	}
	exports.isAggregateOp = isAggregateOp;
	exports.COUNTING_OPS = ['count', 'valid', 'missing', 'distinct'];
	function isCountingAggregateOp(aggregate) {
	    return aggregate && util.contains(exports.COUNTING_OPS, aggregate);
	}
	exports.isCountingAggregateOp = isCountingAggregateOp;
	/** Additive-based aggregation operations.  These can be applied to stack. */
	exports.SUM_OPS = ['count', 'sum', 'distinct', 'valid', 'missing'];
	/**
	 * Aggregation operators that always produce values within the range [domainMin, domainMax].
	 */
	exports.SHARED_DOMAIN_OPS = ['mean', 'average', 'median', 'q1', 'q3', 'min', 'max'];
	exports.SHARED_DOMAIN_OP_INDEX = vega_util_1.toSet(exports.SHARED_DOMAIN_OPS);

	});

	unwrapExports(aggregate);
	var aggregate_1 = aggregate.AGGREGATE_OPS;
	var aggregate_2 = aggregate.isAggregateOp;
	var aggregate_3 = aggregate.COUNTING_OPS;
	var aggregate_4 = aggregate.isCountingAggregateOp;
	var aggregate_5 = aggregate.SUM_OPS;
	var aggregate_6 = aggregate.SHARED_DOMAIN_OPS;
	var aggregate_7 = aggregate.SHARED_DOMAIN_OP_INDEX;

	var axis = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.AXIS_PARTS = ['domain', 'grid', 'labels', 'ticks', 'title'];
	/**
	 * A dictionary listing whether a certain axis property is applicable for only main axes or only grid axes.
	 * (Properties not listed are applicable for both)
	 */
	exports.AXIS_PROPERTY_TYPE = {
	    grid: 'grid',
	    gridColor: 'grid',
	    gridDash: 'grid',
	    gridOpacity: 'grid',
	    gridScale: 'grid',
	    gridWidth: 'grid',
	    orient: 'main',
	    bandPosition: 'main',
	    domain: 'main',
	    domainColor: 'main',
	    domainOpacity: 'main',
	    domainWidth: 'main',
	    format: 'main',
	    labelAlign: 'main',
	    labelAngle: 'main',
	    labelBaseline: 'main',
	    labelBound: 'main',
	    labelColor: 'main',
	    labelFlush: 'main',
	    labelFlushOffset: 'main',
	    labelFont: 'main',
	    labelFontSize: 'main',
	    labelFontWeight: 'main',
	    labelLimit: 'main',
	    labelOpacity: 'main',
	    labelOverlap: 'main',
	    labelPadding: 'main',
	    labels: 'main',
	    maxExtent: 'main',
	    minExtent: 'main',
	    offset: 'main',
	    position: 'main',
	    tickColor: 'main',
	    tickExtra: 'main',
	    tickOffset: 'main',
	    tickOpacity: 'main',
	    tickRound: 'main',
	    ticks: 'main',
	    tickSize: 'main',
	    title: 'main',
	    titleAlign: 'main',
	    titleAngle: 'main',
	    titleBaseline: 'main',
	    titleColor: 'main',
	    titleFont: 'main',
	    titleFontSize: 'main',
	    titleFontWeight: 'main',
	    titleLimit: 'main',
	    titleOpacity: 'main',
	    titlePadding: 'main',
	    titleX: 'main',
	    titleY: 'main',
	    tickWidth: 'both',
	    tickCount: 'both',
	    values: 'both',
	    scale: 'both',
	    zindex: 'both' // this is actually set afterward, so it doesn't matter
	};
	var COMMON_AXIS_PROPERTIES_INDEX = {
	    orient: 1,
	    bandPosition: 1,
	    domain: 1,
	    domainColor: 1,
	    domainOpacity: 1,
	    domainWidth: 1,
	    format: 1,
	    grid: 1,
	    gridColor: 1,
	    gridDash: 1,
	    gridOpacity: 1,
	    gridWidth: 1,
	    labelAlign: 1,
	    labelAngle: 1,
	    labelBaseline: 1,
	    labelBound: 1,
	    labelColor: 1,
	    labelFlush: 1,
	    labelFlushOffset: 1,
	    labelFont: 1,
	    labelFontSize: 1,
	    labelFontWeight: 1,
	    labelLimit: 1,
	    labelOpacity: 1,
	    labelOverlap: 1,
	    labelPadding: 1,
	    labels: 1,
	    maxExtent: 1,
	    minExtent: 1,
	    offset: 1,
	    position: 1,
	    tickColor: 1,
	    tickCount: 1,
	    tickExtra: 1,
	    tickOffset: 1,
	    tickOpacity: 1,
	    tickRound: 1,
	    ticks: 1,
	    tickSize: 1,
	    tickWidth: 1,
	    title: 1,
	    titleAlign: 1,
	    titleAngle: 1,
	    titleBaseline: 1,
	    titleColor: 1,
	    titleFont: 1,
	    titleFontSize: 1,
	    titleFontWeight: 1,
	    titleLimit: 1,
	    titleOpacity: 1,
	    titlePadding: 1,
	    titleX: 1,
	    titleY: 1,
	    values: 1,
	    zindex: 1
	};
	var AXIS_PROPERTIES_INDEX = tslib_1.__assign({}, COMMON_AXIS_PROPERTIES_INDEX, { encoding: 1, labelAngle: 1, tickStep: 1 });
	var VG_AXIS_PROPERTIES_INDEX = tslib_1.__assign({ gridScale: 1, scale: 1 }, COMMON_AXIS_PROPERTIES_INDEX, { encode: 1 });
	function isAxisProperty(prop) {
	    return !!AXIS_PROPERTIES_INDEX[prop];
	}
	exports.isAxisProperty = isAxisProperty;
	exports.VG_AXIS_PROPERTIES = util.flagKeys(VG_AXIS_PROPERTIES_INDEX);
	// Export for dependent projects
	exports.AXIS_PROPERTIES = util.flagKeys(AXIS_PROPERTIES_INDEX);

	});

	unwrapExports(axis);
	var axis_1 = axis.AXIS_PARTS;
	var axis_2 = axis.AXIS_PROPERTY_TYPE;
	var axis_3 = axis.isAxisProperty;
	var axis_4 = axis.VG_AXIS_PROPERTIES;
	var axis_5 = axis.AXIS_PROPERTIES;

	var log$2 = createCommonjsModule(function (module, exports) {
	/**
	 * Vega-Lite's singleton logger utility.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Main (default) Vega Logger instance for Vega-Lite
	 */
	var main = vega_util_1.logger(vega_util_1.Warn);
	var current = main;
	/**
	 * Logger tool for checking if the code throws correct warning
	 */
	var LocalLogger = /** @class */ (function () {
	    function LocalLogger() {
	        this.warns = [];
	        this.infos = [];
	        this.debugs = [];
	    }
	    LocalLogger.prototype.level = function () {
	        return this;
	    };
	    LocalLogger.prototype.warn = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var _a;
	        (_a = this.warns).push.apply(_a, args);
	        return this;
	    };
	    LocalLogger.prototype.info = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var _a;
	        (_a = this.infos).push.apply(_a, args);
	        return this;
	    };
	    LocalLogger.prototype.debug = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var _a;
	        (_a = this.debugs).push.apply(_a, args);
	        return this;
	    };
	    return LocalLogger;
	}());
	exports.LocalLogger = LocalLogger;
	function wrap(f) {
	    return function () {
	        current = new LocalLogger();
	        f(current);
	        reset();
	    };
	}
	exports.wrap = wrap;
	/**
	 * Set the singleton logger to be a custom logger
	 */
	function set(newLogger) {
	    current = newLogger;
	    return current;
	}
	exports.set = set;
	/**
	 * Reset the main logger to use the default Vega Logger
	 */
	function reset() {
	    current = main;
	    return current;
	}
	exports.reset = reset;
	function warn() {
	    var _ = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        _[_i] = arguments[_i];
	    }
	    current.warn.apply(current, arguments);
	}
	exports.warn = warn;
	function info() {
	    var _ = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        _[_i] = arguments[_i];
	    }
	    current.info.apply(current, arguments);
	}
	exports.info = info;
	function debug() {
	    var _ = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        _[_i] = arguments[_i];
	    }
	    current.debug.apply(current, arguments);
	}
	exports.debug = debug;
	/**
	 * Collection of all Vega-Lite Error Messages
	 */
	var message;
	(function (message) {
	    message.INVALID_SPEC = 'Invalid spec';
	    // FIT
	    message.FIT_NON_SINGLE = 'Autosize "fit" only works for single views and layered views.';
	    message.CANNOT_FIX_RANGE_STEP_WITH_FIT = 'Cannot use a fixed value of "rangeStep" when "autosize" is "fit".';
	    // SELECTION
	    function cannotProjectOnChannelWithoutField(channel) {
	        return "Cannot project a selection on encoding channel \"" + channel + "\", which has no field.";
	    }
	    message.cannotProjectOnChannelWithoutField = cannotProjectOnChannelWithoutField;
	    function nearestNotSupportForContinuous(mark) {
	        return "The \"nearest\" transform is not supported for " + mark + " marks.";
	    }
	    message.nearestNotSupportForContinuous = nearestNotSupportForContinuous;
	    function selectionNotSupported(mark) {
	        return "Selection not supported for " + mark + " yet";
	    }
	    message.selectionNotSupported = selectionNotSupported;
	    function selectionNotFound(name) {
	        return "Cannot find a selection named \"" + name + "\"";
	    }
	    message.selectionNotFound = selectionNotFound;
	    message.SCALE_BINDINGS_CONTINUOUS = 'Scale bindings are currently only supported for scales with unbinned, continuous domains.';
	    // REPEAT
	    function noSuchRepeatedValue(field) {
	        return "Unknown repeated value \"" + field + "\".";
	    }
	    message.noSuchRepeatedValue = noSuchRepeatedValue;
	    // CONCAT
	    message.CONCAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in concatenated views.';
	    // REPEAT
	    message.REPEAT_CANNOT_SHARE_AXIS = 'Axes cannot be shared in repeated views.';
	    // TITLE
	    function cannotSetTitleAnchor(type) {
	        return "Cannot set title \"anchor\" for a " + type + " spec";
	    }
	    message.cannotSetTitleAnchor = cannotSetTitleAnchor;
	    // DATA
	    function unrecognizedParse(p) {
	        return "Unrecognized parse \"" + p + "\".";
	    }
	    message.unrecognizedParse = unrecognizedParse;
	    function differentParse(field, local, ancestor) {
	        return "An ancestor parsed field \"" + field + "\" as " + ancestor + " but a child wants to parse the field as " + local + ".";
	    }
	    message.differentParse = differentParse;
	    // TRANSFORMS
	    function invalidTransformIgnored(transform) {
	        return "Ignoring an invalid transform: " + util.stringify(transform) + ".";
	    }
	    message.invalidTransformIgnored = invalidTransformIgnored;
	    message.NO_FIELDS_NEEDS_AS = 'If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the data from the secondary source.';
	    // ENCODING & FACET
	    function encodingOverridden(channels) {
	        return "Layer's shared " + channels.join(',') + " channel " + (channels.length === 1 ? 'is' : 'are') + " overriden";
	    }
	    message.encodingOverridden = encodingOverridden;
	    function projectionOverridden(opt) {
	        var parentProjection = opt.parentProjection, projection = opt.projection;
	        return "Layer's shared projection " + util.stringify(parentProjection) + " is overridden by a child projection " + util.stringify(projection) + ".";
	    }
	    message.projectionOverridden = projectionOverridden;
	    function primitiveChannelDef(channel, type, value) {
	        return "Channel " + channel + " is a " + type + ". Converted to {value: " + util.stringify(value) + "}.";
	    }
	    message.primitiveChannelDef = primitiveChannelDef;
	    function invalidFieldType(type) {
	        return "Invalid field type \"" + type + "\"";
	    }
	    message.invalidFieldType = invalidFieldType;
	    function nonZeroScaleUsedWithLengthMark(mark, channel, opt) {
	        var scaleText = opt.scaleType
	            ? opt.scaleType + " scale"
	            : opt.zeroFalse
	                ? 'scale with zero=false'
	                : 'scale with custom domain that excludes zero';
	        return "A " + scaleText + " is used to encode " + mark + "'s " + channel + ". This can be misleading as the " + (channel === 'x' ? 'width' : 'height') + " of the " + mark + " can be arbitrary based on the scale domain. You may want to use point mark instead.";
	    }
	    message.nonZeroScaleUsedWithLengthMark = nonZeroScaleUsedWithLengthMark;
	    function invalidFieldTypeForCountAggregate(type, aggregate) {
	        return "Invalid field type \"" + type + "\" for aggregate: \"" + aggregate + "\", using \"quantitative\" instead.";
	    }
	    message.invalidFieldTypeForCountAggregate = invalidFieldTypeForCountAggregate;
	    function invalidAggregate(aggregate) {
	        return "Invalid aggregation operator \"" + aggregate + "\"";
	    }
	    message.invalidAggregate = invalidAggregate;
	    function emptyOrInvalidFieldType(type, channel, newType) {
	        return "Invalid field type \"" + type + "\" for channel \"" + channel + "\", using \"" + newType + "\" instead.";
	    }
	    message.emptyOrInvalidFieldType = emptyOrInvalidFieldType;
	    function droppingColor(type, opt) {
	        var fill = opt.fill, stroke = opt.stroke;
	        return ("Dropping color " + type + " as the plot also has " + (fill && stroke ? 'fill and stroke' : fill ? 'fill' : 'stroke'));
	    }
	    message.droppingColor = droppingColor;
	    function emptyFieldDef(fieldDef, channel) {
	        return "Dropping " + util.stringify(fieldDef) + " from channel \"" + channel + "\" since it does not contain data field or value.";
	    }
	    message.emptyFieldDef = emptyFieldDef;
	    function latLongDeprecated(channel, type, newChannel) {
	        return channel + "-encoding with type " + type + " is deprecated. Replacing with " + newChannel + "-encoding.";
	    }
	    message.latLongDeprecated = latLongDeprecated;
	    message.LINE_WITH_VARYING_SIZE = 'Line marks cannot encode size with a non-groupby field. You may want to use trail marks instead.';
	    function incompatibleChannel(channel, markOrFacet, when) {
	        return channel + " dropped as it is incompatible with \"" + markOrFacet + "\"" + (when ? " when " + when : '') + ".";
	    }
	    message.incompatibleChannel = incompatibleChannel;
	    function invalidEncodingChannel(channel) {
	        return channel + "-encoding is dropped as " + channel + " is not a valid encoding channel.";
	    }
	    message.invalidEncodingChannel = invalidEncodingChannel;
	    function facetChannelShouldBeDiscrete(channel) {
	        return channel + " encoding should be discrete (ordinal / nominal / binned).";
	    }
	    message.facetChannelShouldBeDiscrete = facetChannelShouldBeDiscrete;
	    function discreteChannelCannotEncode(channel, type) {
	        return "Using discrete channel \"" + channel + "\" to encode \"" + type + "\" field can be misleading as it does not encode " + (type === 'ordinal' ? 'order' : 'magnitude') + ".";
	    }
	    message.discreteChannelCannotEncode = discreteChannelCannotEncode;
	    // Mark
	    message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL = 'Bar mark should not be used with point scale when rangeStep is null. Please use band scale instead.';
	    function lineWithRange(hasX2, hasY2) {
	        var channels = hasX2 && hasY2 ? 'x2 and y2' : hasX2 ? 'x2' : 'y2';
	        return "Line mark is for continuous lines and thus cannot be used with " + channels + ". We will use the rule mark (line segments) instead.";
	    }
	    message.lineWithRange = lineWithRange;
	    function orientOverridden(original, actual) {
	        return "Specified orient \"" + original + "\" overridden with \"" + actual + "\"";
	    }
	    message.orientOverridden = orientOverridden;
	    // SCALE
	    message.CANNOT_UNION_CUSTOM_DOMAIN_WITH_FIELD_DOMAIN = 'custom domain scale cannot be unioned with default field-based domain';
	    function cannotUseScalePropertyWithNonColor(prop) {
	        return "Cannot use the scale property \"" + prop + "\" with non-color channel.";
	    }
	    message.cannotUseScalePropertyWithNonColor = cannotUseScalePropertyWithNonColor;
	    function unaggregateDomainHasNoEffectForRawField(fieldDef) {
	        return "Using unaggregated domain with raw field has no effect (" + util.stringify(fieldDef) + ").";
	    }
	    message.unaggregateDomainHasNoEffectForRawField = unaggregateDomainHasNoEffectForRawField;
	    function unaggregateDomainWithNonSharedDomainOp(aggregate) {
	        return "Unaggregated domain not applicable for \"" + aggregate + "\" since it produces values outside the origin domain of the source data.";
	    }
	    message.unaggregateDomainWithNonSharedDomainOp = unaggregateDomainWithNonSharedDomainOp;
	    function unaggregatedDomainWithLogScale(fieldDef) {
	        return "Unaggregated domain is currently unsupported for log scale (" + util.stringify(fieldDef) + ").";
	    }
	    message.unaggregatedDomainWithLogScale = unaggregatedDomainWithLogScale;
	    function cannotApplySizeToNonOrientedMark(mark) {
	        return "Cannot apply size to non-oriented mark \"" + mark + "\".";
	    }
	    message.cannotApplySizeToNonOrientedMark = cannotApplySizeToNonOrientedMark;
	    function rangeStepDropped(channel) {
	        return "rangeStep for \"" + channel + "\" is dropped as top-level " + (channel === 'x' ? 'width' : 'height') + " is provided.";
	    }
	    message.rangeStepDropped = rangeStepDropped;
	    function scaleTypeNotWorkWithChannel(channel, scaleType, defaultScaleType) {
	        return "Channel \"" + channel + "\" does not work with \"" + scaleType + "\" scale. We are using \"" + defaultScaleType + "\" scale instead.";
	    }
	    message.scaleTypeNotWorkWithChannel = scaleTypeNotWorkWithChannel;
	    function scaleTypeNotWorkWithFieldDef(scaleType, defaultScaleType) {
	        return "FieldDef does not work with \"" + scaleType + "\" scale. We are using \"" + defaultScaleType + "\" scale instead.";
	    }
	    message.scaleTypeNotWorkWithFieldDef = scaleTypeNotWorkWithFieldDef;
	    function scalePropertyNotWorkWithScaleType(scaleType, propName, channel) {
	        return channel + "-scale's \"" + propName + "\" is dropped as it does not work with " + scaleType + " scale.";
	    }
	    message.scalePropertyNotWorkWithScaleType = scalePropertyNotWorkWithScaleType;
	    function scaleTypeNotWorkWithMark(mark, scaleType) {
	        return "Scale type \"" + scaleType + "\" does not work with mark \"" + mark + "\".";
	    }
	    message.scaleTypeNotWorkWithMark = scaleTypeNotWorkWithMark;
	    function mergeConflictingProperty(property, propertyOf, v1, v2) {
	        return "Conflicting " + propertyOf.toString() + " property \"" + property.toString() + "\" (" + util.stringify(v1) + " and " + util.stringify(v2) + ").  Using " + util.stringify(v1) + ".";
	    }
	    message.mergeConflictingProperty = mergeConflictingProperty;
	    function independentScaleMeansIndependentGuide(channel) {
	        return "Setting the scale to be independent for \"" + channel + "\" means we also have to set the guide (axis or legend) to be independent.";
	    }
	    message.independentScaleMeansIndependentGuide = independentScaleMeansIndependentGuide;
	    function domainSortDropped(sort) {
	        return "Dropping sort property " + util.stringify(sort) + " as unioned domains only support boolean or op 'count'.";
	    }
	    message.domainSortDropped = domainSortDropped;
	    message.UNABLE_TO_MERGE_DOMAINS = 'Unable to merge domains';
	    message.MORE_THAN_ONE_SORT = 'Domains that should be unioned has conflicting sort properties. Sort will be set to true.';
	    // AXIS
	    message.INVALID_CHANNEL_FOR_AXIS = 'Invalid channel for axis.';
	    // STACK
	    function cannotStackRangedMark(channel) {
	        return "Cannot stack \"" + channel + "\" if there is already \"" + channel + "2\"";
	    }
	    message.cannotStackRangedMark = cannotStackRangedMark;
	    function cannotStackNonLinearScale(scaleType) {
	        return "Cannot stack non-linear scale (" + scaleType + ")";
	    }
	    message.cannotStackNonLinearScale = cannotStackNonLinearScale;
	    function stackNonSummativeAggregate(aggregate) {
	        return "Stacking is applied even though the aggregate function is non-summative (\"" + aggregate + "\")";
	    }
	    message.stackNonSummativeAggregate = stackNonSummativeAggregate;
	    // TIMEUNIT
	    function invalidTimeUnit(unitName, value) {
	        return "Invalid " + unitName + ": " + util.stringify(value);
	    }
	    message.invalidTimeUnit = invalidTimeUnit;
	    function dayReplacedWithDate(fullTimeUnit) {
	        return "Time unit \"" + fullTimeUnit + "\" is not supported. We are replacing it with " + fullTimeUnit.replace('day', 'date') + ".";
	    }
	    message.dayReplacedWithDate = dayReplacedWithDate;
	    function droppedDay(d) {
	        return "Dropping day from datetime " + util.stringify(d) + " as day cannot be combined with other units.";
	    }
	    message.droppedDay = droppedDay;
	    function errorBarCenterAndExtentAreNotNeeded(center, extent) {
	        return "" + (extent ? 'extent ' : '') + (extent && center ? 'and ' : '') + (center ? 'center ' : '') + (extent && center ? 'are ' : 'is ') + "not needed when data are aggregated.";
	    }
	    message.errorBarCenterAndExtentAreNotNeeded = errorBarCenterAndExtentAreNotNeeded;
	    function errorBarCenterIsUsedWithWrongExtent(center, extent, mark) {
	        return center + " is not usually used with " + extent + " for " + mark + ".";
	    }
	    message.errorBarCenterIsUsedWithWrongExtent = errorBarCenterIsUsedWithWrongExtent;
	    function errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark) {
	        return "Continuous axis should not have customized aggregation function " + aggregate + "; " + compositeMark + " already agregates the axis.";
	    }
	    message.errorBarContinuousAxisHasCustomizedAggregate = errorBarContinuousAxisHasCustomizedAggregate;
	    function errorBarCenterIsNotNeeded(extent, mark) {
	        return "Center is not needed to be specified in " + mark + " when extent is " + extent + ".";
	    }
	    message.errorBarCenterIsNotNeeded = errorBarCenterIsNotNeeded;
	    function errorBand1DNotSupport(property) {
	        return "1D error band does not support " + property;
	    }
	    message.errorBand1DNotSupport = errorBand1DNotSupport;
	    // CHANNEL
	    function channelRequiredForBinned(channel) {
	        return "Channel " + channel + " is required for \"binned\" bin";
	    }
	    message.channelRequiredForBinned = channelRequiredForBinned;
	    function domainRequiredForThresholdScale(channel) {
	        return "Domain for " + channel + " is required for threshold scale";
	    }
	    message.domainRequiredForThresholdScale = domainRequiredForThresholdScale;
	})(message = exports.message || (exports.message = {}));

	});

	unwrapExports(log$2);
	var log_1 = log$2.LocalLogger;
	var log_2 = log$2.wrap;
	var log_3 = log$2.set;
	var log_4 = log$2.reset;
	var log_5 = log$2.warn;
	var log_6 = log$2.info;
	var log_7 = log$2.debug;
	var log_8 = log$2.message;

	var datetime = createCommonjsModule(function (module, exports) {
	// DateTime definition object
	Object.defineProperty(exports, "__esModule", { value: true });


	var log = tslib_1.__importStar(log$2);

	/*
	 * A designated year that starts on Sunday.
	 */
	var SUNDAY_YEAR = 2006;
	function isDateTime(o) {
	    return (!!o &&
	        (!!o.year ||
	            !!o.quarter ||
	            !!o.month ||
	            !!o.date ||
	            !!o.day ||
	            !!o.hours ||
	            !!o.minutes ||
	            !!o.seconds ||
	            !!o.milliseconds));
	}
	exports.isDateTime = isDateTime;
	exports.MONTHS = [
	    'january',
	    'february',
	    'march',
	    'april',
	    'may',
	    'june',
	    'july',
	    'august',
	    'september',
	    'october',
	    'november',
	    'december'
	];
	exports.SHORT_MONTHS = exports.MONTHS.map(function (m) { return m.substr(0, 3); });
	exports.DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	exports.SHORT_DAYS = exports.DAYS.map(function (d) { return d.substr(0, 3); });
	function normalizeQuarter(q) {
	    if (vega_util_1.isNumber(q)) {
	        if (q > 4) {
	            log.warn(log.message.invalidTimeUnit('quarter', q));
	        }
	        // We accept 1-based quarter, so need to readjust to 0-based quarter
	        return (q - 1).toString();
	    }
	    else {
	        // Invalid quarter
	        throw new Error(log.message.invalidTimeUnit('quarter', q));
	    }
	}
	function normalizeMonth(m) {
	    if (vega_util_1.isNumber(m)) {
	        // We accept 1-based month, so need to readjust to 0-based month
	        return (m - 1).toString();
	    }
	    else {
	        var lowerM = m.toLowerCase();
	        var monthIndex = exports.MONTHS.indexOf(lowerM);
	        if (monthIndex !== -1) {
	            return monthIndex + ''; // 0 for january, ...
	        }
	        var shortM = lowerM.substr(0, 3);
	        var shortMonthIndex = exports.SHORT_MONTHS.indexOf(shortM);
	        if (shortMonthIndex !== -1) {
	            return shortMonthIndex + '';
	        }
	        // Invalid month
	        throw new Error(log.message.invalidTimeUnit('month', m));
	    }
	}
	function normalizeDay(d) {
	    if (vega_util_1.isNumber(d)) {
	        // mod so that this can be both 0-based where 0 = sunday
	        // and 1-based where 7=sunday
	        return (d % 7) + '';
	    }
	    else {
	        var lowerD = d.toLowerCase();
	        var dayIndex = exports.DAYS.indexOf(lowerD);
	        if (dayIndex !== -1) {
	            return dayIndex + ''; // 0 for january, ...
	        }
	        var shortD = lowerD.substr(0, 3);
	        var shortDayIndex = exports.SHORT_DAYS.indexOf(shortD);
	        if (shortDayIndex !== -1) {
	            return shortDayIndex + '';
	        }
	        // Invalid day
	        throw new Error(log.message.invalidTimeUnit('day', d));
	    }
	}
	/**
	 * Return Vega Expression for a particular date time.
	 * @param d
	 * @param normalize whether to normalize quarter, month, day.
	 */
	function dateTimeExpr(d, normalize) {
	    if (normalize === void 0) { normalize = false; }
	    var units = [];
	    if (normalize && d.day !== undefined) {
	        if (util.keys(d).length > 1) {
	            log.warn(log.message.droppedDay(d));
	            d = util.duplicate(d);
	            delete d.day;
	        }
	    }
	    if (d.year !== undefined) {
	        units.push(d.year);
	    }
	    else if (d.day !== undefined) {
	        // Set year to 2006 for working with day since January 1 2006 is a Sunday
	        units.push(SUNDAY_YEAR);
	    }
	    else {
	        units.push(0);
	    }
	    if (d.month !== undefined) {
	        var month = normalize ? normalizeMonth(d.month) : d.month;
	        units.push(month);
	    }
	    else if (d.quarter !== undefined) {
	        var quarter = normalize ? normalizeQuarter(d.quarter) : d.quarter;
	        units.push(quarter + '*3');
	    }
	    else {
	        units.push(0); // months start at zero in JS
	    }
	    if (d.date !== undefined) {
	        units.push(d.date);
	    }
	    else if (d.day !== undefined) {
	        // HACK: Day only works as a standalone unit
	        // This is only correct because we always set year to 2006 for day
	        var day = normalize ? normalizeDay(d.day) : d.day;
	        units.push(day + '+1');
	    }
	    else {
	        units.push(1); // Date starts at 1 in JS
	    }
	    // Note: can't use TimeUnit enum here as importing it will create
	    // circular dependency problem!
	    for (var _i = 0, _a = ['hours', 'minutes', 'seconds', 'milliseconds']; _i < _a.length; _i++) {
	        var timeUnit = _a[_i];
	        if (d[timeUnit] !== undefined) {
	            units.push(d[timeUnit]);
	        }
	        else {
	            units.push(0);
	        }
	    }
	    if (d.utc) {
	        return "utc(" + units.join(', ') + ")";
	    }
	    else {
	        return "datetime(" + units.join(', ') + ")";
	    }
	}
	exports.dateTimeExpr = dateTimeExpr;

	});

	unwrapExports(datetime);
	var datetime_1 = datetime.isDateTime;
	var datetime_2 = datetime.MONTHS;
	var datetime_3 = datetime.SHORT_MONTHS;
	var datetime_4 = datetime.DAYS;
	var datetime_5 = datetime.SHORT_DAYS;
	var datetime_6 = datetime.dateTimeExpr;

	var facet = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function isFacetFieldDef(channelDef) {
	    return !!channelDef && !!channelDef['header'];
	}
	exports.isFacetFieldDef = isFacetFieldDef;

	});

	unwrapExports(facet);
	var facet_1 = facet.isFacetFieldDef;

	var timeunit = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var log = tslib_1.__importStar(log$2);

	var TimeUnit;
	(function (TimeUnit) {
	    TimeUnit.YEAR = 'year';
	    TimeUnit.MONTH = 'month';
	    TimeUnit.DAY = 'day';
	    TimeUnit.DATE = 'date';
	    TimeUnit.HOURS = 'hours';
	    TimeUnit.MINUTES = 'minutes';
	    TimeUnit.SECONDS = 'seconds';
	    TimeUnit.MILLISECONDS = 'milliseconds';
	    TimeUnit.YEARMONTH = 'yearmonth';
	    TimeUnit.YEARMONTHDATE = 'yearmonthdate';
	    TimeUnit.YEARMONTHDATEHOURS = 'yearmonthdatehours';
	    TimeUnit.YEARMONTHDATEHOURSMINUTES = 'yearmonthdatehoursminutes';
	    TimeUnit.YEARMONTHDATEHOURSMINUTESSECONDS = 'yearmonthdatehoursminutesseconds';
	    // MONTHDATE always include 29 February since we use year 0th (which is a leap year);
	    TimeUnit.MONTHDATE = 'monthdate';
	    TimeUnit.HOURSMINUTES = 'hoursminutes';
	    TimeUnit.HOURSMINUTESSECONDS = 'hoursminutesseconds';
	    TimeUnit.MINUTESSECONDS = 'minutesseconds';
	    TimeUnit.SECONDSMILLISECONDS = 'secondsmilliseconds';
	    TimeUnit.QUARTER = 'quarter';
	    TimeUnit.YEARQUARTER = 'yearquarter';
	    TimeUnit.QUARTERMONTH = 'quartermonth';
	    TimeUnit.YEARQUARTERMONTH = 'yearquartermonth';
	    TimeUnit.UTCYEAR = 'utcyear';
	    TimeUnit.UTCMONTH = 'utcmonth';
	    TimeUnit.UTCDAY = 'utcday';
	    TimeUnit.UTCDATE = 'utcdate';
	    TimeUnit.UTCHOURS = 'utchours';
	    TimeUnit.UTCMINUTES = 'utcminutes';
	    TimeUnit.UTCSECONDS = 'utcseconds';
	    TimeUnit.UTCMILLISECONDS = 'utcmilliseconds';
	    TimeUnit.UTCYEARMONTH = 'utcyearmonth';
	    TimeUnit.UTCYEARMONTHDATE = 'utcyearmonthdate';
	    TimeUnit.UTCYEARMONTHDATEHOURS = 'utcyearmonthdatehours';
	    TimeUnit.UTCYEARMONTHDATEHOURSMINUTES = 'utcyearmonthdatehoursminutes';
	    TimeUnit.UTCYEARMONTHDATEHOURSMINUTESSECONDS = 'utcyearmonthdatehoursminutesseconds';
	    // MONTHDATE always include 29 February since we use year 0th (which is a leap year);
	    TimeUnit.UTCMONTHDATE = 'utcmonthdate';
	    TimeUnit.UTCHOURSMINUTES = 'utchoursminutes';
	    TimeUnit.UTCHOURSMINUTESSECONDS = 'utchoursminutesseconds';
	    TimeUnit.UTCMINUTESSECONDS = 'utcminutesseconds';
	    TimeUnit.UTCSECONDSMILLISECONDS = 'utcsecondsmilliseconds';
	    TimeUnit.UTCQUARTER = 'utcquarter';
	    TimeUnit.UTCYEARQUARTER = 'utcyearquarter';
	    TimeUnit.UTCQUARTERMONTH = 'utcquartermonth';
	    TimeUnit.UTCYEARQUARTERMONTH = 'utcyearquartermonth';
	})(TimeUnit = exports.TimeUnit || (exports.TimeUnit = {}));
	/** Time Unit that only corresponds to only one part of Date objects. */
	var LOCAL_SINGLE_TIMEUNIT_INDEX = {
	    year: 1,
	    quarter: 1,
	    month: 1,
	    day: 1,
	    date: 1,
	    hours: 1,
	    minutes: 1,
	    seconds: 1,
	    milliseconds: 1
	};
	exports.TIMEUNIT_PARTS = util.flagKeys(LOCAL_SINGLE_TIMEUNIT_INDEX);
	function isLocalSingleTimeUnit(timeUnit) {
	    return !!LOCAL_SINGLE_TIMEUNIT_INDEX[timeUnit];
	}
	exports.isLocalSingleTimeUnit = isLocalSingleTimeUnit;
	var UTC_SINGLE_TIMEUNIT_INDEX = {
	    utcyear: 1,
	    utcquarter: 1,
	    utcmonth: 1,
	    utcday: 1,
	    utcdate: 1,
	    utchours: 1,
	    utcminutes: 1,
	    utcseconds: 1,
	    utcmilliseconds: 1
	};
	function isUtcSingleTimeUnit(timeUnit) {
	    return !!UTC_SINGLE_TIMEUNIT_INDEX[timeUnit];
	}
	exports.isUtcSingleTimeUnit = isUtcSingleTimeUnit;
	var LOCAL_MULTI_TIMEUNIT_INDEX = {
	    yearquarter: 1,
	    yearquartermonth: 1,
	    yearmonth: 1,
	    yearmonthdate: 1,
	    yearmonthdatehours: 1,
	    yearmonthdatehoursminutes: 1,
	    yearmonthdatehoursminutesseconds: 1,
	    quartermonth: 1,
	    monthdate: 1,
	    hoursminutes: 1,
	    hoursminutesseconds: 1,
	    minutesseconds: 1,
	    secondsmilliseconds: 1
	};
	var UTC_MULTI_TIMEUNIT_INDEX = {
	    utcyearquarter: 1,
	    utcyearquartermonth: 1,
	    utcyearmonth: 1,
	    utcyearmonthdate: 1,
	    utcyearmonthdatehours: 1,
	    utcyearmonthdatehoursminutes: 1,
	    utcyearmonthdatehoursminutesseconds: 1,
	    utcquartermonth: 1,
	    utcmonthdate: 1,
	    utchoursminutes: 1,
	    utchoursminutesseconds: 1,
	    utcminutesseconds: 1,
	    utcsecondsmilliseconds: 1
	};
	var UTC_TIMEUNIT_INDEX = tslib_1.__assign({}, UTC_SINGLE_TIMEUNIT_INDEX, UTC_MULTI_TIMEUNIT_INDEX);
	function isUTCTimeUnit(t) {
	    return !!UTC_TIMEUNIT_INDEX[t];
	}
	exports.isUTCTimeUnit = isUTCTimeUnit;
	function getLocalTimeUnit(t) {
	    return t.substr(3);
	}
	exports.getLocalTimeUnit = getLocalTimeUnit;
	var TIMEUNIT_INDEX = tslib_1.__assign({}, LOCAL_SINGLE_TIMEUNIT_INDEX, UTC_SINGLE_TIMEUNIT_INDEX, LOCAL_MULTI_TIMEUNIT_INDEX, UTC_MULTI_TIMEUNIT_INDEX);
	exports.TIMEUNITS = util.flagKeys(TIMEUNIT_INDEX);
	function isTimeUnit(t) {
	    return !!TIMEUNIT_INDEX[t];
	}
	exports.isTimeUnit = isTimeUnit;
	var SET_DATE_METHOD = {
	    year: 'setFullYear',
	    month: 'setMonth',
	    date: 'setDate',
	    hours: 'setHours',
	    minutes: 'setMinutes',
	    seconds: 'setSeconds',
	    milliseconds: 'setMilliseconds',
	    // Day and quarter have their own special cases
	    quarter: null,
	    day: null
	};
	/**
	 * Converts a date to only have the measurements relevant to the specified unit
	 * i.e. ('yearmonth', '2000-12-04 07:58:14') -> '2000-12-01 00:00:00'
	 * Note: the base date is Jan 01 1900 00:00:00
	 */
	function convert(unit, date) {
	    var isUTC = isUTCTimeUnit(unit);
	    var result = isUTC
	        ? // start with uniform date
	            new Date(Date.UTC(0, 0, 1, 0, 0, 0, 0))
	        : new Date(0, 0, 1, 0, 0, 0, 0);
	    for (var _i = 0, TIMEUNIT_PARTS_1 = exports.TIMEUNIT_PARTS; _i < TIMEUNIT_PARTS_1.length; _i++) {
	        var timeUnitPart = TIMEUNIT_PARTS_1[_i];
	        if (containsTimeUnit(unit, timeUnitPart)) {
	            switch (timeUnitPart) {
	                case TimeUnit.DAY:
	                    throw new Error("Cannot convert to TimeUnits containing 'day'");
	                case TimeUnit.QUARTER: {
	                    var _a = dateMethods('month', isUTC), getDateMethod_1 = _a.getDateMethod, setDateMethod_1 = _a.setDateMethod;
	                    // indicate quarter by setting month to be the first of the quarter i.e. may (4) -> april (3)
	                    result[setDateMethod_1](Math.floor(date[getDateMethod_1]() / 3) * 3);
	                    break;
	                }
	                default:
	                    var _b = dateMethods(timeUnitPart, isUTC), getDateMethod = _b.getDateMethod, setDateMethod = _b.setDateMethod;
	                    result[setDateMethod](date[getDateMethod]());
	            }
	        }
	    }
	    return result;
	}
	exports.convert = convert;
	function dateMethods(singleUnit, isUtc) {
	    var rawSetDateMethod = SET_DATE_METHOD[singleUnit];
	    var setDateMethod = isUtc ? 'setUTC' + rawSetDateMethod.substr(3) : rawSetDateMethod;
	    var getDateMethod = 'get' + (isUtc ? 'UTC' : '') + rawSetDateMethod.substr(3);
	    return { setDateMethod: setDateMethod, getDateMethod: getDateMethod };
	}
	function getTimeUnitParts(timeUnit) {
	    return exports.TIMEUNIT_PARTS.reduce(function (parts, part) {
	        if (containsTimeUnit(timeUnit, part)) {
	            return parts.concat(part);
	        }
	        return parts;
	    }, []);
	}
	exports.getTimeUnitParts = getTimeUnitParts;
	/** Returns true if fullTimeUnit contains the timeUnit, false otherwise. */
	function containsTimeUnit(fullTimeUnit, timeUnit) {
	    var index = fullTimeUnit.indexOf(timeUnit);
	    return (index > -1 && (timeUnit !== TimeUnit.SECONDS || index === 0 || fullTimeUnit.charAt(index - 1) !== 'i') // exclude milliseconds
	    );
	}
	exports.containsTimeUnit = containsTimeUnit;
	/**
	 * Returns Vega expresssion for a given timeUnit and fieldRef
	 */
	function fieldExpr(fullTimeUnit, field) {
	    var fieldRef = util.accessPathWithDatum(field);
	    var utc = isUTCTimeUnit(fullTimeUnit) ? 'utc' : '';
	    function func(timeUnit) {
	        if (timeUnit === TimeUnit.QUARTER) {
	            // quarter starting at 0 (0,3,6,9).
	            return "(" + utc + "quarter(" + fieldRef + ")-1)";
	        }
	        else {
	            return "" + utc + timeUnit + "(" + fieldRef + ")";
	        }
	    }
	    var d = exports.TIMEUNIT_PARTS.reduce(function (dateExpr, tu) {
	        if (containsTimeUnit(fullTimeUnit, tu)) {
	            dateExpr[tu] = func(tu);
	        }
	        return dateExpr;
	    }, {});
	    return datetime.dateTimeExpr(d);
	}
	exports.fieldExpr = fieldExpr;
	/**
	 * returns the signal expression used for axis labels for a time unit
	 */
	function formatExpression(timeUnit, field, shortTimeLabels, isUTCScale) {
	    if (!timeUnit) {
	        return undefined;
	    }
	    var dateComponents = [];
	    var expression = '';
	    var hasYear = containsTimeUnit(timeUnit, TimeUnit.YEAR);
	    if (containsTimeUnit(timeUnit, TimeUnit.QUARTER)) {
	        // special expression for quarter as prefix
	        expression = "'Q' + quarter(" + field + ")";
	    }
	    if (containsTimeUnit(timeUnit, TimeUnit.MONTH)) {
	        // By default use short month name
	        dateComponents.push(shortTimeLabels !== false ? '%b' : '%B');
	    }
	    if (containsTimeUnit(timeUnit, TimeUnit.DAY)) {
	        dateComponents.push(shortTimeLabels ? '%a' : '%A');
	    }
	    else if (containsTimeUnit(timeUnit, TimeUnit.DATE)) {
	        dateComponents.push('%d' + (hasYear ? ',' : '')); // add comma if there is year
	    }
	    if (hasYear) {
	        dateComponents.push(shortTimeLabels ? '%y' : '%Y');
	    }
	    var timeComponents = [];
	    if (containsTimeUnit(timeUnit, TimeUnit.HOURS)) {
	        timeComponents.push('%H');
	    }
	    if (containsTimeUnit(timeUnit, TimeUnit.MINUTES)) {
	        timeComponents.push('%M');
	    }
	    if (containsTimeUnit(timeUnit, TimeUnit.SECONDS)) {
	        timeComponents.push('%S');
	    }
	    if (containsTimeUnit(timeUnit, TimeUnit.MILLISECONDS)) {
	        timeComponents.push('%L');
	    }
	    var dateTimeComponents = [];
	    if (dateComponents.length > 0) {
	        dateTimeComponents.push(dateComponents.join(' '));
	    }
	    if (timeComponents.length > 0) {
	        dateTimeComponents.push(timeComponents.join(':'));
	    }
	    if (dateTimeComponents.length > 0) {
	        if (expression) {
	            // Add space between quarter and main time format
	            expression += " + ' ' + ";
	        }
	        // We only use utcFormat for utc scale
	        // For utc time units, the data is already converted as a part of timeUnit transform.
	        // Thus, utc time units should use timeFormat to avoid shifting the time twice.
	        if (isUTCScale) {
	            expression += "utcFormat(" + field + ", '" + dateTimeComponents.join(' ') + "')";
	        }
	        else {
	            expression += "timeFormat(" + field + ", '" + dateTimeComponents.join(' ') + "')";
	        }
	    }
	    // If expression is still an empty string, return undefined instead.
	    return expression || undefined;
	}
	exports.formatExpression = formatExpression;
	function normalizeTimeUnit(timeUnit) {
	    if (timeUnit !== 'day' && timeUnit.indexOf('day') >= 0) {
	        log.warn(log.message.dayReplacedWithDate(timeUnit));
	        return timeUnit.replace('day', 'date');
	    }
	    return timeUnit;
	}
	exports.normalizeTimeUnit = normalizeTimeUnit;

	});

	unwrapExports(timeunit);
	var timeunit_1 = timeunit.TimeUnit;
	var timeunit_2 = timeunit.TIMEUNIT_PARTS;
	var timeunit_3 = timeunit.isLocalSingleTimeUnit;
	var timeunit_4 = timeunit.isUtcSingleTimeUnit;
	var timeunit_5 = timeunit.isUTCTimeUnit;
	var timeunit_6 = timeunit.getLocalTimeUnit;
	var timeunit_7 = timeunit.TIMEUNITS;
	var timeunit_8 = timeunit.isTimeUnit;
	var timeunit_9 = timeunit.convert;
	var timeunit_10 = timeunit.getTimeUnitParts;
	var timeunit_11 = timeunit.containsTimeUnit;
	var timeunit_12 = timeunit.fieldExpr;
	var timeunit_13 = timeunit.formatExpression;
	var timeunit_14 = timeunit.normalizeTimeUnit;

	var type = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/** Constants and utilities for data type */
	/** Data type based on level of measurement */
	var Type;
	(function (Type) {
	    Type.QUANTITATIVE = 'quantitative';
	    Type.ORDINAL = 'ordinal';
	    Type.TEMPORAL = 'temporal';
	    Type.NOMINAL = 'nominal';
	    Type.GEOJSON = 'geojson';
	})(Type = exports.Type || (exports.Type = {}));
	exports.TYPE_INDEX = {
	    quantitative: 1,
	    ordinal: 1,
	    temporal: 1,
	    nominal: 1,
	    geojson: 1
	};
	function isType(t) {
	    return !!exports.TYPE_INDEX[t];
	}
	exports.isType = isType;
	exports.QUANTITATIVE = Type.QUANTITATIVE;
	exports.ORDINAL = Type.ORDINAL;
	exports.TEMPORAL = Type.TEMPORAL;
	exports.NOMINAL = Type.NOMINAL;
	exports.GEOJSON = Type.GEOJSON;
	/**
	 * Get full, lowercase type name for a given type.
	 * @param  type
	 * @return Full type name.
	 */
	function getFullName(type) {
	    if (type) {
	        type = type.toLowerCase();
	        switch (type) {
	            case 'q':
	            case exports.QUANTITATIVE:
	                return 'quantitative';
	            case 't':
	            case exports.TEMPORAL:
	                return 'temporal';
	            case 'o':
	            case exports.ORDINAL:
	                return 'ordinal';
	            case 'n':
	            case exports.NOMINAL:
	                return 'nominal';
	            case exports.GEOJSON:
	                return 'geojson';
	        }
	    }
	    // If we get invalid input, return undefined type.
	    return undefined;
	}
	exports.getFullName = getFullName;

	});

	unwrapExports(type);
	var type_1 = type.Type;
	var type_2 = type.TYPE_INDEX;
	var type_3 = type.isType;
	var type_4 = type.QUANTITATIVE;
	var type_5 = type.ORDINAL;
	var type_6 = type.TEMPORAL;
	var type_7 = type.NOMINAL;
	var type_8 = type.GEOJSON;
	var type_9 = type.getFullName;

	var fielddef = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	var log = tslib_1.__importStar(log$2);



	function isConditionalSelection(c) {
	    return c['selection'];
	}
	exports.isConditionalSelection = isConditionalSelection;
	function isRepeatRef(field) {
	    return field && !vega_util_1.isString(field) && 'repeat' in field;
	}
	exports.isRepeatRef = isRepeatRef;
	function toFieldDefBase(fieldDef) {
	    var field = fieldDef.field, timeUnit = fieldDef.timeUnit, bin$$1 = fieldDef.bin, aggregate$$1 = fieldDef.aggregate;
	    return tslib_1.__assign({}, (timeUnit ? { timeUnit: timeUnit } : {}), (bin$$1 ? { bin: bin$$1 } : {}), (aggregate$$1 ? { aggregate: aggregate$$1 } : {}), { field: field });
	}
	exports.toFieldDefBase = toFieldDefBase;
	function isConditionalDef(channelDef) {
	    return !!channelDef && !!channelDef.condition;
	}
	exports.isConditionalDef = isConditionalDef;
	/**
	 * Return if a channelDef is a ConditionalValueDef with ConditionFieldDef
	 */
	function hasConditionalFieldDef(channelDef) {
	    return !!channelDef && !!channelDef.condition && !vega_util_1.isArray(channelDef.condition) && isFieldDef(channelDef.condition);
	}
	exports.hasConditionalFieldDef = hasConditionalFieldDef;
	function hasConditionalValueDef(channelDef) {
	    return !!channelDef && !!channelDef.condition && (vega_util_1.isArray(channelDef.condition) || isValueDef(channelDef.condition));
	}
	exports.hasConditionalValueDef = hasConditionalValueDef;
	function isFieldDef(channelDef) {
	    return !!channelDef && (!!channelDef['field'] || channelDef['aggregate'] === 'count');
	}
	exports.isFieldDef = isFieldDef;
	function isStringFieldDef(channelDef) {
	    return isFieldDef(channelDef) && vega_util_1.isString(channelDef.field);
	}
	exports.isStringFieldDef = isStringFieldDef;
	function isValueDef(channelDef) {
	    return channelDef && 'value' in channelDef && channelDef['value'] !== undefined;
	}
	exports.isValueDef = isValueDef;
	function isScaleFieldDef(channelDef) {
	    return !!channelDef && (!!channelDef['scale'] || !!channelDef['sort']);
	}
	exports.isScaleFieldDef = isScaleFieldDef;
	function isPositionFieldDef(channelDef) {
	    return !!channelDef && (!!channelDef['axis'] || !!channelDef['stack'] || !!channelDef['impute']);
	}
	exports.isPositionFieldDef = isPositionFieldDef;
	function isMarkPropFieldDef(channelDef) {
	    return !!channelDef && !!channelDef['legend'];
	}
	exports.isMarkPropFieldDef = isMarkPropFieldDef;
	function isTextFieldDef(channelDef) {
	    return !!channelDef && !!channelDef['format'];
	}
	exports.isTextFieldDef = isTextFieldDef;
	function isOpFieldDef(fieldDef) {
	    return !!fieldDef['op'];
	}
	/**
	 * Get a Vega field reference from a Vega-Lite field def.
	 */
	function vgField(fieldDef, opt) {
	    if (opt === void 0) { opt = {}; }
	    var field = fieldDef.field;
	    var prefix = opt.prefix;
	    var suffix = opt.suffix;
	    if (isCount(fieldDef)) {
	        field = 'count_*';
	    }
	    else {
	        var fn = void 0;
	        if (!opt.nofn) {
	            if (isOpFieldDef(fieldDef)) {
	                fn = fieldDef.op;
	            }
	            else if (bin.isBinning(fieldDef.bin)) {
	                fn = bin.binToString(fieldDef.bin);
	                suffix = opt.binSuffix || '';
	            }
	            else if (fieldDef.aggregate) {
	                fn = String(fieldDef.aggregate);
	            }
	            else if (fieldDef.timeUnit) {
	                fn = String(fieldDef.timeUnit);
	            }
	        }
	        if (fn) {
	            field = field ? fn + "_" + field : fn;
	        }
	    }
	    if (suffix) {
	        field = field + "_" + suffix;
	    }
	    if (prefix) {
	        field = prefix + "_" + field;
	    }
	    if (opt.forAs) {
	        return field;
	    }
	    else if (opt.expr) {
	        // Expression to access flattened field. No need to escape dots.
	        return util.flatAccessWithDatum(field, opt.expr);
	    }
	    else {
	        // We flattened all fields so paths should have become dot.
	        return util.replacePathInField(field);
	    }
	}
	exports.vgField = vgField;
	function isDiscrete(fieldDef) {
	    switch (fieldDef.type) {
	        case 'nominal':
	        case 'ordinal':
	        case 'geojson':
	            return true;
	        case 'quantitative':
	            return !!fieldDef.bin;
	        case 'temporal':
	            return false;
	    }
	    throw new Error(log.message.invalidFieldType(fieldDef.type));
	}
	exports.isDiscrete = isDiscrete;
	function isContinuous(fieldDef) {
	    return !isDiscrete(fieldDef);
	}
	exports.isContinuous = isContinuous;
	function isCount(fieldDef) {
	    return fieldDef.aggregate === 'count';
	}
	exports.isCount = isCount;
	function verbalTitleFormatter(fieldDef, config) {
	    var field = fieldDef.field, bin$$1 = fieldDef.bin, timeUnit = fieldDef.timeUnit, aggregate$$1 = fieldDef.aggregate;
	    if (aggregate$$1 === 'count') {
	        return config.countTitle;
	    }
	    else if (bin.isBinning(bin$$1)) {
	        return field + " (binned)";
	    }
	    else if (timeUnit) {
	        var units = timeunit.getTimeUnitParts(timeUnit).join('-');
	        return field + " (" + units + ")";
	    }
	    else if (aggregate$$1) {
	        return util.titlecase(aggregate$$1) + " of " + field;
	    }
	    return field;
	}
	exports.verbalTitleFormatter = verbalTitleFormatter;
	function functionalTitleFormatter(fieldDef, config) {
	    var fn = fieldDef.aggregate || fieldDef.timeUnit || (bin.isBinning(fieldDef.bin) && 'bin');
	    if (fn) {
	        return fn.toUpperCase() + '(' + fieldDef.field + ')';
	    }
	    else {
	        return fieldDef.field;
	    }
	}
	exports.functionalTitleFormatter = functionalTitleFormatter;
	exports.defaultTitleFormatter = function (fieldDef, config) {
	    switch (config.fieldTitle) {
	        case 'plain':
	            return fieldDef.field;
	        case 'functional':
	            return functionalTitleFormatter(fieldDef, config);
	        default:
	            return verbalTitleFormatter(fieldDef, config);
	    }
	};
	var titleFormatter = exports.defaultTitleFormatter;
	function setTitleFormatter(formatter) {
	    titleFormatter = formatter;
	}
	exports.setTitleFormatter = setTitleFormatter;
	function resetTitleFormatter() {
	    setTitleFormatter(exports.defaultTitleFormatter);
	}
	exports.resetTitleFormatter = resetTitleFormatter;
	function title(fieldDef, config, _a) {
	    var allowDisabling = _a.allowDisabling;
	    var guide = getGuide(fieldDef) || {};
	    var guideTitle = guide.title;
	    if (allowDisabling) {
	        return util.getFirstDefined(guideTitle, fieldDef.title, defaultTitle(fieldDef, config));
	    }
	    else {
	        return guideTitle || fieldDef.title || defaultTitle(fieldDef, config);
	    }
	}
	exports.title = title;
	function getGuide(fieldDef) {
	    if (isPositionFieldDef(fieldDef) && fieldDef.axis) {
	        return fieldDef.axis;
	    }
	    else if (isMarkPropFieldDef(fieldDef) && fieldDef.legend) {
	        return fieldDef.legend;
	    }
	    else if (facet.isFacetFieldDef(fieldDef) && fieldDef.header) {
	        return fieldDef.header;
	    }
	    return undefined;
	}
	exports.getGuide = getGuide;
	function defaultTitle(fieldDef, config) {
	    return titleFormatter(fieldDef, config);
	}
	exports.defaultTitle = defaultTitle;
	function format(fieldDef) {
	    if (isTextFieldDef(fieldDef) && fieldDef.format) {
	        return fieldDef.format;
	    }
	    else {
	        var guide = getGuide(fieldDef) || {};
	        return guide.format;
	    }
	}
	exports.format = format;
	function defaultType(fieldDef, channel$$1) {
	    if (fieldDef.timeUnit) {
	        return 'temporal';
	    }
	    if (bin.isBinning(fieldDef.bin)) {
	        return 'quantitative';
	    }
	    switch (channel.rangeType(channel$$1)) {
	        case 'continuous':
	            return 'quantitative';
	        case 'discrete':
	            return 'nominal';
	        case 'flexible': // color
	            return 'nominal';
	        default:
	            return 'quantitative';
	    }
	}
	exports.defaultType = defaultType;
	/**
	 * Returns the fieldDef -- either from the outer channelDef or from the condition of channelDef.
	 * @param channelDef
	 */
	function getFieldDef(channelDef) {
	    if (isFieldDef(channelDef)) {
	        return channelDef;
	    }
	    else if (hasConditionalFieldDef(channelDef)) {
	        return channelDef.condition;
	    }
	    return undefined;
	}
	exports.getFieldDef = getFieldDef;
	/**
	 * Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
	 */
	function normalize(channelDef, channel$$1) {
	    if (vega_util_1.isString(channelDef) || vega_util_1.isNumber(channelDef) || vega_util_1.isBoolean(channelDef)) {
	        var primitiveType = vega_util_1.isString(channelDef) ? 'string' : vega_util_1.isNumber(channelDef) ? 'number' : 'boolean';
	        log.warn(log.message.primitiveChannelDef(channel$$1, primitiveType, channelDef));
	        return { value: channelDef };
	    }
	    // If a fieldDef contains a field, we need type.
	    if (isFieldDef(channelDef)) {
	        return normalizeFieldDef(channelDef, channel$$1);
	    }
	    else if (hasConditionalFieldDef(channelDef)) {
	        return tslib_1.__assign({}, channelDef, { 
	            // Need to cast as normalizeFieldDef normally return FieldDef, but here we know that it is definitely Condition<FieldDef>
	            condition: normalizeFieldDef(channelDef.condition, channel$$1) });
	    }
	    return channelDef;
	}
	exports.normalize = normalize;
	function normalizeFieldDef(fieldDef, channel$$1) {
	    // Drop invalid aggregate
	    if (fieldDef.aggregate && !aggregate.isAggregateOp(fieldDef.aggregate)) {
	        var aggregate$$1 = fieldDef.aggregate, fieldDefWithoutAggregate = tslib_1.__rest(fieldDef, ["aggregate"]);
	        log.warn(log.message.invalidAggregate(fieldDef.aggregate));
	        fieldDef = fieldDefWithoutAggregate;
	    }
	    // Normalize Time Unit
	    if (fieldDef.timeUnit) {
	        fieldDef = tslib_1.__assign({}, fieldDef, { timeUnit: timeunit.normalizeTimeUnit(fieldDef.timeUnit) });
	    }
	    // Normalize bin
	    if (bin.isBinning(fieldDef.bin)) {
	        fieldDef = tslib_1.__assign({}, fieldDef, { bin: normalizeBin(fieldDef.bin, channel$$1) });
	    }
	    if (bin.isBinned(fieldDef.bin) && !util.contains(channel.POSITION_SCALE_CHANNELS, channel$$1)) {
	        log.warn("Channel " + channel$$1 + " should not be used with \"binned\" bin");
	    }
	    // Normalize Type
	    if (fieldDef.type) {
	        var fullType = type.getFullName(fieldDef.type);
	        if (fieldDef.type !== fullType) {
	            // convert short type to full type
	            fieldDef = tslib_1.__assign({}, fieldDef, { type: fullType });
	        }
	        if (fieldDef.type !== 'quantitative') {
	            if (aggregate.isCountingAggregateOp(fieldDef.aggregate)) {
	                log.warn(log.message.invalidFieldTypeForCountAggregate(fieldDef.type, fieldDef.aggregate));
	                fieldDef = tslib_1.__assign({}, fieldDef, { type: 'quantitative' });
	            }
	        }
	    }
	    else {
	        // If type is empty / invalid, then augment with default type
	        var newType = defaultType(fieldDef, channel$$1);
	        log.warn(log.message.emptyOrInvalidFieldType(fieldDef.type, channel$$1, newType));
	        fieldDef = tslib_1.__assign({}, fieldDef, { type: newType });
	    }
	    var _a = channelCompatibility(fieldDef, channel$$1), compatible = _a.compatible, warning = _a.warning;
	    if (!compatible) {
	        log.warn(warning);
	    }
	    return fieldDef;
	}
	exports.normalizeFieldDef = normalizeFieldDef;
	function normalizeBin(bin$$1, channel$$1) {
	    if (vega_util_1.isBoolean(bin$$1)) {
	        return { maxbins: bin.autoMaxBins(channel$$1) };
	    }
	    else if (!bin$$1.maxbins && !bin$$1.step) {
	        return tslib_1.__assign({}, bin$$1, { maxbins: bin.autoMaxBins(channel$$1) });
	    }
	    else {
	        return bin$$1;
	    }
	}
	exports.normalizeBin = normalizeBin;
	var COMPATIBLE = { compatible: true };
	function channelCompatibility(fieldDef, channel$$1) {
	    var type$$1 = fieldDef.type;
	    if (type$$1 === 'geojson' && channel$$1 !== 'shape') {
	        return {
	            compatible: false,
	            warning: "Channel " + channel$$1 + " should not be used with a geojson data."
	        };
	    }
	    switch (channel$$1) {
	        case 'row':
	        case 'column':
	            if (isContinuous(fieldDef)) {
	                return {
	                    compatible: false,
	                    warning: log.message.facetChannelShouldBeDiscrete(channel$$1)
	                };
	            }
	            return COMPATIBLE;
	        case 'x':
	        case 'y':
	        case 'color':
	        case 'fill':
	        case 'stroke':
	        case 'text':
	        case 'detail':
	        case 'key':
	        case 'tooltip':
	        case 'href':
	            return COMPATIBLE;
	        case 'longitude':
	        case 'longitude2':
	        case 'latitude':
	        case 'latitude2':
	            if (type$$1 !== type.QUANTITATIVE) {
	                return {
	                    compatible: false,
	                    warning: "Channel " + channel$$1 + " should be used with a quantitative field only, not " + fieldDef.type + " field."
	                };
	            }
	            return COMPATIBLE;
	        case 'opacity':
	        case 'size':
	        case 'x2':
	        case 'y2':
	            if (type$$1 === 'nominal' && !fieldDef['sort']) {
	                return {
	                    compatible: false,
	                    warning: "Channel " + channel$$1 + " should not be used with an unsorted discrete field."
	                };
	            }
	            return COMPATIBLE;
	        case 'shape':
	            if (fieldDef.type !== 'nominal' && fieldDef.type !== 'geojson') {
	                return {
	                    compatible: false,
	                    warning: 'Shape channel should be used with only either nominal or geojson data'
	                };
	            }
	            return COMPATIBLE;
	        case 'order':
	            if (fieldDef.type === 'nominal' && !('sort' in fieldDef)) {
	                return {
	                    compatible: false,
	                    warning: "Channel order is inappropriate for nominal field, which has no inherent order."
	                };
	            }
	            return COMPATIBLE;
	    }
	    throw new Error('channelCompatability not implemented for channel ' + channel$$1);
	}
	exports.channelCompatibility = channelCompatibility;
	function isNumberFieldDef(fieldDef) {
	    return fieldDef.type === 'quantitative' || bin.isBinning(fieldDef.bin);
	}
	exports.isNumberFieldDef = isNumberFieldDef;
	function isTimeFieldDef(fieldDef) {
	    return fieldDef.type === 'temporal' || !!fieldDef.timeUnit;
	}
	exports.isTimeFieldDef = isTimeFieldDef;
	/**
	 * Getting a value associated with a fielddef.
	 * Convert the value to Vega expression if applicable (for datetime object, or string if the field def is temporal or has timeUnit)
	 */
	function valueExpr(v, _a) {
	    var timeUnit = _a.timeUnit, type$$1 = _a.type, time = _a.time, undefinedIfExprNotRequired = _a.undefinedIfExprNotRequired;
	    var _b;
	    var expr;
	    if (datetime.isDateTime(v)) {
	        expr = datetime.dateTimeExpr(v, true);
	    }
	    else if (vega_util_1.isString(v) || vega_util_1.isNumber(v)) {
	        if (timeUnit || type$$1 === 'temporal') {
	            if (timeunit.isLocalSingleTimeUnit(timeUnit)) {
	                expr = datetime.dateTimeExpr((_b = {}, _b[timeUnit] = v, _b), true);
	            }
	            else if (timeunit.isUtcSingleTimeUnit(timeUnit)) {
	                // FIXME is this really correct?
	                expr = valueExpr(v, { timeUnit: timeunit.getLocalTimeUnit(timeUnit) });
	            }
	            else {
	                // just pass the string to date function (which will call JS Date.parse())
	                expr = "datetime(" + JSON.stringify(v) + ")";
	            }
	        }
	    }
	    if (expr) {
	        return time ? "time(" + expr + ")" : expr;
	    }
	    // number or boolean or normal string
	    return undefinedIfExprNotRequired ? undefined : JSON.stringify(v);
	}
	exports.valueExpr = valueExpr;
	/**
	 * Standardize value array -- convert each value to Vega expression if applicable
	 */
	function valueArray(fieldDef, values) {
	    var timeUnit = fieldDef.timeUnit, type$$1 = fieldDef.type;
	    return values.map(function (v) {
	        var expr = valueExpr(v, { timeUnit: timeUnit, type: type$$1, undefinedIfExprNotRequired: true });
	        // return signal for the expression if we need an expression
	        if (expr !== undefined) {
	            return { signal: expr };
	        }
	        // otherwise just return the original value
	        return v;
	    });
	}
	exports.valueArray = valueArray;

	});

	unwrapExports(fielddef);
	var fielddef_1 = fielddef.isConditionalSelection;
	var fielddef_2 = fielddef.isRepeatRef;
	var fielddef_3 = fielddef.toFieldDefBase;
	var fielddef_4 = fielddef.isConditionalDef;
	var fielddef_5 = fielddef.hasConditionalFieldDef;
	var fielddef_6 = fielddef.hasConditionalValueDef;
	var fielddef_7 = fielddef.isFieldDef;
	var fielddef_8 = fielddef.isStringFieldDef;
	var fielddef_9 = fielddef.isValueDef;
	var fielddef_10 = fielddef.isScaleFieldDef;
	var fielddef_11 = fielddef.isPositionFieldDef;
	var fielddef_12 = fielddef.isMarkPropFieldDef;
	var fielddef_13 = fielddef.isTextFieldDef;
	var fielddef_14 = fielddef.vgField;
	var fielddef_15 = fielddef.isDiscrete;
	var fielddef_16 = fielddef.isContinuous;
	var fielddef_17 = fielddef.isCount;
	var fielddef_18 = fielddef.verbalTitleFormatter;
	var fielddef_19 = fielddef.functionalTitleFormatter;
	var fielddef_20 = fielddef.defaultTitleFormatter;
	var fielddef_21 = fielddef.setTitleFormatter;
	var fielddef_22 = fielddef.resetTitleFormatter;
	var fielddef_23 = fielddef.title;
	var fielddef_24 = fielddef.getGuide;
	var fielddef_25 = fielddef.defaultTitle;
	var fielddef_26 = fielddef.format;
	var fielddef_27 = fielddef.defaultType;
	var fielddef_28 = fielddef.getFieldDef;
	var fielddef_29 = fielddef.normalize;
	var fielddef_30 = fielddef.normalizeFieldDef;
	var fielddef_31 = fielddef.normalizeBin;
	var fielddef_32 = fielddef.channelCompatibility;
	var fielddef_33 = fielddef.isNumberFieldDef;
	var fielddef_34 = fielddef.isTimeFieldDef;
	var fielddef_35 = fielddef.valueExpr;
	var fielddef_36 = fielddef.valueArray;

	var mark = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var Mark;
	(function (Mark) {
	    Mark.AREA = 'area';
	    Mark.BAR = 'bar';
	    Mark.LINE = 'line';
	    Mark.POINT = 'point';
	    Mark.RECT = 'rect';
	    Mark.RULE = 'rule';
	    Mark.TEXT = 'text';
	    Mark.TICK = 'tick';
	    Mark.TRAIL = 'trail';
	    Mark.CIRCLE = 'circle';
	    Mark.SQUARE = 'square';
	    Mark.GEOSHAPE = 'geoshape';
	})(Mark = exports.Mark || (exports.Mark = {}));
	exports.AREA = Mark.AREA;
	exports.BAR = Mark.BAR;
	exports.LINE = Mark.LINE;
	exports.POINT = Mark.POINT;
	exports.TEXT = Mark.TEXT;
	exports.TICK = Mark.TICK;
	exports.TRAIL = Mark.TRAIL;
	exports.RECT = Mark.RECT;
	exports.RULE = Mark.RULE;
	exports.GEOSHAPE = Mark.GEOSHAPE;
	exports.CIRCLE = Mark.CIRCLE;
	exports.SQUARE = Mark.SQUARE;
	// Using mapped type to declare index, ensuring we always have all marks when we add more.
	var MARK_INDEX = {
	    area: 1,
	    bar: 1,
	    line: 1,
	    point: 1,
	    text: 1,
	    tick: 1,
	    trail: 1,
	    rect: 1,
	    geoshape: 1,
	    rule: 1,
	    circle: 1,
	    square: 1
	};
	function isMark(m) {
	    return !!MARK_INDEX[m];
	}
	exports.isMark = isMark;
	function isPathMark(m) {
	    return util.contains(['line', 'area', 'trail'], m);
	}
	exports.isPathMark = isPathMark;
	exports.PRIMITIVE_MARKS = util.flagKeys(MARK_INDEX);
	function isMarkDef(mark) {
	    return mark['type'];
	}
	exports.isMarkDef = isMarkDef;
	var PRIMITIVE_MARK_INDEX = vega_util_1.toSet(exports.PRIMITIVE_MARKS);
	function isPrimitiveMark(mark) {
	    var markType = isMarkDef(mark) ? mark.type : mark;
	    return markType in PRIMITIVE_MARK_INDEX;
	}
	exports.isPrimitiveMark = isPrimitiveMark;
	exports.STROKE_CONFIG = [
	    'stroke',
	    'strokeWidth',
	    'strokeDash',
	    'strokeDashOffset',
	    'strokeOpacity',
	    'strokeJoin',
	    'strokeMiterLimit'
	];
	exports.FILL_CONFIG = ['fill', 'fillOpacity'];
	exports.FILL_STROKE_CONFIG = [].concat(exports.STROKE_CONFIG, exports.FILL_CONFIG);
	exports.VL_ONLY_MARK_CONFIG_PROPERTIES = ['filled', 'color', 'tooltip'];
	exports.VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
	    area: ['line', 'point'],
	    bar: ['binSpacing', 'continuousBandSize', 'discreteBandSize'],
	    line: ['point'],
	    text: ['shortTimeLabels'],
	    tick: ['bandSize', 'thickness']
	};
	exports.defaultMarkConfig = {
	    color: '#4c78a8',
	    tooltip: { content: 'encoding' }
	};
	exports.defaultBarConfig = {
	    binSpacing: 1,
	    continuousBandSize: 5
	};
	exports.defaultTickConfig = {
	    thickness: 1
	};

	});

	unwrapExports(mark);
	var mark_1 = mark.Mark;
	var mark_2 = mark.AREA;
	var mark_3 = mark.BAR;
	var mark_4 = mark.LINE;
	var mark_5 = mark.POINT;
	var mark_6 = mark.TEXT;
	var mark_7 = mark.TICK;
	var mark_8 = mark.TRAIL;
	var mark_9 = mark.RECT;
	var mark_10 = mark.RULE;
	var mark_11 = mark.GEOSHAPE;
	var mark_12 = mark.CIRCLE;
	var mark_13 = mark.SQUARE;
	var mark_14 = mark.isMark;
	var mark_15 = mark.isPathMark;
	var mark_16 = mark.PRIMITIVE_MARKS;
	var mark_17 = mark.isMarkDef;
	var mark_18 = mark.isPrimitiveMark;
	var mark_19 = mark.STROKE_CONFIG;
	var mark_20 = mark.FILL_CONFIG;
	var mark_21 = mark.FILL_STROKE_CONFIG;
	var mark_22 = mark.VL_ONLY_MARK_CONFIG_PROPERTIES;
	var mark_23 = mark.VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX;
	var mark_24 = mark.defaultMarkConfig;
	var mark_25 = mark.defaultBarConfig;
	var mark_26 = mark.defaultTickConfig;

	var channel = createCommonjsModule(function (module, exports) {
	/*
	 * Constants and utilities for encoding channels (Visual variables)
	 * such as 'x', 'y', 'color'.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });





	var Channel;
	(function (Channel) {
	    // Facet
	    Channel.ROW = 'row';
	    Channel.COLUMN = 'column';
	    // Position
	    Channel.X = 'x';
	    Channel.Y = 'y';
	    Channel.X2 = 'x2';
	    Channel.Y2 = 'y2';
	    // Geo Position
	    Channel.LATITUDE = 'latitude';
	    Channel.LONGITUDE = 'longitude';
	    Channel.LATITUDE2 = 'latitude2';
	    Channel.LONGITUDE2 = 'longitude2';
	    // Mark property with scale
	    Channel.COLOR = 'color';
	    Channel.FILL = 'fill';
	    Channel.STROKE = 'stroke';
	    Channel.SHAPE = 'shape';
	    Channel.SIZE = 'size';
	    Channel.OPACITY = 'opacity';
	    // Non-scale channel
	    Channel.TEXT = 'text';
	    Channel.ORDER = 'order';
	    Channel.DETAIL = 'detail';
	    Channel.KEY = 'key';
	    Channel.TOOLTIP = 'tooltip';
	    Channel.HREF = 'href';
	})(Channel = exports.Channel || (exports.Channel = {}));
	exports.X = Channel.X;
	exports.Y = Channel.Y;
	exports.X2 = Channel.X2;
	exports.Y2 = Channel.Y2;
	exports.LATITUDE = Channel.LATITUDE;
	exports.LATITUDE2 = Channel.LATITUDE2;
	exports.LONGITUDE = Channel.LONGITUDE;
	exports.LONGITUDE2 = Channel.LONGITUDE2;
	exports.ROW = Channel.ROW;
	exports.COLUMN = Channel.COLUMN;
	exports.SHAPE = Channel.SHAPE;
	exports.SIZE = Channel.SIZE;
	exports.COLOR = Channel.COLOR;
	exports.FILL = Channel.FILL;
	exports.STROKE = Channel.STROKE;
	exports.TEXT = Channel.TEXT;
	exports.DETAIL = Channel.DETAIL;
	exports.KEY = Channel.KEY;
	exports.ORDER = Channel.ORDER;
	exports.OPACITY = Channel.OPACITY;
	exports.TOOLTIP = Channel.TOOLTIP;
	exports.HREF = Channel.HREF;
	exports.GEOPOSITION_CHANNEL_INDEX = {
	    longitude: 1,
	    longitude2: 1,
	    latitude: 1,
	    latitude2: 1
	};
	exports.GEOPOSITION_CHANNELS = util.flagKeys(exports.GEOPOSITION_CHANNEL_INDEX);
	var UNIT_CHANNEL_INDEX = tslib_1.__assign({ 
	    // position
	    x: 1, y: 1, x2: 1, y2: 1 }, exports.GEOPOSITION_CHANNEL_INDEX, { 
	    // color
	    color: 1, fill: 1, stroke: 1, 
	    // other non-position with scale
	    opacity: 1, size: 1, shape: 1, 
	    // channels without scales
	    order: 1, text: 1, detail: 1, key: 1, tooltip: 1, href: 1 });
	function isColorChannel(channel) {
	    return channel === 'color' || channel === 'fill' || channel === 'stroke';
	}
	exports.isColorChannel = isColorChannel;
	var FACET_CHANNEL_INDEX = {
	    row: 1,
	    column: 1
	};
	var CHANNEL_INDEX = tslib_1.__assign({}, UNIT_CHANNEL_INDEX, FACET_CHANNEL_INDEX);
	exports.CHANNELS = util.flagKeys(CHANNEL_INDEX);
	var _o = CHANNEL_INDEX.order, _d = CHANNEL_INDEX.detail, SINGLE_DEF_CHANNEL_INDEX = tslib_1.__rest(CHANNEL_INDEX, ["order", "detail"]);
	/**
	 * Channels that cannot have an array of channelDef.
	 * model.fieldDef, getFieldDef only work for these channels.
	 *
	 * (The only two channels that can have an array of channelDefs are "detail" and "order".
	 * Since there can be multiple fieldDefs for detail and order, getFieldDef/model.fieldDef
	 * are not applicable for them.  Similarly, selection projection won't work with "detail" and "order".)
	 */
	exports.SINGLE_DEF_CHANNELS = util.flagKeys(SINGLE_DEF_CHANNEL_INDEX);
	function isChannel(str) {
	    return !!CHANNEL_INDEX[str];
	}
	exports.isChannel = isChannel;
	// CHANNELS without COLUMN, ROW
	exports.UNIT_CHANNELS = util.flagKeys(UNIT_CHANNEL_INDEX);
	// NONPOSITION_CHANNELS = UNIT_CHANNELS without X, Y, X2, Y2;
	var _x = UNIT_CHANNEL_INDEX.x, _y = UNIT_CHANNEL_INDEX.y, 
	// x2 and y2 share the same scale as x and y
	_x2 = UNIT_CHANNEL_INDEX.x2, _y2 = UNIT_CHANNEL_INDEX.y2, _latitude = UNIT_CHANNEL_INDEX.latitude, _longitude = UNIT_CHANNEL_INDEX.longitude, _latitude2 = UNIT_CHANNEL_INDEX.latitude2, _longitude2 = UNIT_CHANNEL_INDEX.longitude2, 
	// The rest of unit channels then have scale
	NONPOSITION_CHANNEL_INDEX = tslib_1.__rest(UNIT_CHANNEL_INDEX, ["x", "y", "x2", "y2", "latitude", "longitude", "latitude2", "longitude2"]);
	exports.NONPOSITION_CHANNELS = util.flagKeys(NONPOSITION_CHANNEL_INDEX);
	// POSITION_SCALE_CHANNELS = X and Y;
	var POSITION_SCALE_CHANNEL_INDEX = { x: 1, y: 1 };
	exports.POSITION_SCALE_CHANNELS = util.flagKeys(POSITION_SCALE_CHANNEL_INDEX);
	// NON_POSITION_SCALE_CHANNEL = SCALE_CHANNELS without X, Y
	var 
	// x2 and y2 share the same scale as x and y
	// text and tooltip have format instead of scale,
	// href has neither format, nor scale
	_t = NONPOSITION_CHANNEL_INDEX.text, _tt = NONPOSITION_CHANNEL_INDEX.tooltip, _hr = NONPOSITION_CHANNEL_INDEX.href, 
	// detail and order have no scale
	_dd = NONPOSITION_CHANNEL_INDEX.detail, _k = NONPOSITION_CHANNEL_INDEX.key, _oo = NONPOSITION_CHANNEL_INDEX.order, NONPOSITION_SCALE_CHANNEL_INDEX = tslib_1.__rest(NONPOSITION_CHANNEL_INDEX, ["text", "tooltip", "href", "detail", "key", "order"]);
	exports.NONPOSITION_SCALE_CHANNELS = util.flagKeys(NONPOSITION_SCALE_CHANNEL_INDEX);
	// Declare SCALE_CHANNEL_INDEX
	var SCALE_CHANNEL_INDEX = tslib_1.__assign({}, POSITION_SCALE_CHANNEL_INDEX, NONPOSITION_SCALE_CHANNEL_INDEX);
	/** List of channels with scales */
	exports.SCALE_CHANNELS = util.flagKeys(SCALE_CHANNEL_INDEX);
	function isScaleChannel(channel) {
	    return !!SCALE_CHANNEL_INDEX[channel];
	}
	exports.isScaleChannel = isScaleChannel;
	/**
	 * Return whether a channel supports a particular mark type.
	 * @param channel  channel name
	 * @param mark the mark type
	 * @return whether the mark supports the channel
	 */
	function supportMark(encoding, channel, mark$$1) {
	    if (util.contains([mark.CIRCLE, mark.POINT, mark.SQUARE, mark.TICK], mark$$1) && util.contains([exports.X2, exports.Y2], channel)) {
	        var primaryFieldDef = encoding[channel === exports.X2 ? exports.X : exports.Y];
	        // circle, point, square and tick only support x2/y2 when their corresponding x/y fieldDef
	        // has "binned" data and thus need x2/y2 to specify the bin-end field.
	        if (fielddef.isFieldDef(primaryFieldDef) && fielddef.isFieldDef(encoding[channel]) && bin.isBinned(primaryFieldDef.bin)) {
	            return true;
	        }
	        else {
	            return false;
	        }
	    }
	    else {
	        return mark$$1 in getSupportedMark(channel);
	    }
	}
	exports.supportMark = supportMark;
	/**
	 * Return a dictionary showing whether a channel supports mark type.
	 * @param channel
	 * @return A dictionary mapping mark types to boolean values.
	 */
	function getSupportedMark(channel) {
	    switch (channel) {
	        case exports.COLOR:
	        case exports.FILL:
	        case exports.STROKE:
	        case exports.DETAIL:
	        case exports.KEY:
	        case exports.TOOLTIP:
	        case exports.HREF:
	        case exports.ORDER: // TODO: revise (order might not support rect, which is not stackable?)
	        case exports.OPACITY:
	        case exports.ROW:
	        case exports.COLUMN:
	            return {
	                // all marks
	                point: true,
	                tick: true,
	                rule: true,
	                circle: true,
	                square: true,
	                bar: true,
	                rect: true,
	                line: true,
	                trail: true,
	                area: true,
	                text: true,
	                geoshape: true
	            };
	        case exports.X:
	        case exports.Y:
	        case exports.LATITUDE:
	        case exports.LONGITUDE:
	            return {
	                // all marks except geoshape. geoshape does not use X, Y -- it uses a projection
	                point: true,
	                tick: true,
	                rule: true,
	                circle: true,
	                square: true,
	                bar: true,
	                rect: true,
	                line: true,
	                trail: true,
	                area: true,
	                text: true
	            };
	        case exports.X2:
	        case exports.Y2:
	        case exports.LATITUDE2:
	        case exports.LONGITUDE2:
	            return {
	                rule: true,
	                bar: true,
	                rect: true,
	                area: true
	            };
	        case exports.SIZE:
	            return {
	                point: true,
	                tick: true,
	                rule: true,
	                circle: true,
	                square: true,
	                bar: true,
	                text: true,
	                line: true,
	                trail: true
	            };
	        case exports.SHAPE:
	            return { point: true, geoshape: true };
	        case exports.TEXT:
	            return { text: true };
	    }
	}
	exports.getSupportedMark = getSupportedMark;
	function rangeType(channel) {
	    switch (channel) {
	        case exports.X:
	        case exports.Y:
	        case exports.SIZE:
	        case exports.OPACITY:
	        // X2 and Y2 use X and Y scales, so they similarly have continuous range.
	        case exports.X2:
	        case exports.Y2:
	            return 'continuous';
	        case exports.ROW:
	        case exports.COLUMN:
	        case exports.SHAPE:
	        // TEXT, TOOLTIP, and HREF have no scale but have discrete output
	        case exports.TEXT:
	        case exports.TOOLTIP:
	        case exports.HREF:
	            return 'discrete';
	        // Color can be either continuous or discrete, depending on scale type.
	        case exports.COLOR:
	        case exports.FILL:
	        case exports.STROKE:
	            return 'flexible';
	        // No scale, no range type.
	        case exports.LATITUDE:
	        case exports.LONGITUDE:
	        case exports.LATITUDE2:
	        case exports.LONGITUDE2:
	        case exports.DETAIL:
	        case exports.KEY:
	        case exports.ORDER:
	            return undefined;
	    }
	    /* istanbul ignore next: should never reach here. */
	    throw new Error('rangeType not implemented for ' + channel);
	}
	exports.rangeType = rangeType;

	});

	unwrapExports(channel);
	var channel_1 = channel.Channel;
	var channel_2 = channel.X;
	var channel_3 = channel.Y;
	var channel_4 = channel.X2;
	var channel_5 = channel.Y2;
	var channel_6 = channel.LATITUDE;
	var channel_7 = channel.LATITUDE2;
	var channel_8 = channel.LONGITUDE;
	var channel_9 = channel.LONGITUDE2;
	var channel_10 = channel.ROW;
	var channel_11 = channel.COLUMN;
	var channel_12 = channel.SHAPE;
	var channel_13 = channel.SIZE;
	var channel_14 = channel.COLOR;
	var channel_15 = channel.FILL;
	var channel_16 = channel.STROKE;
	var channel_17 = channel.TEXT;
	var channel_18 = channel.DETAIL;
	var channel_19 = channel.KEY;
	var channel_20 = channel.ORDER;
	var channel_21 = channel.OPACITY;
	var channel_22 = channel.TOOLTIP;
	var channel_23 = channel.HREF;
	var channel_24 = channel.GEOPOSITION_CHANNEL_INDEX;
	var channel_25 = channel.GEOPOSITION_CHANNELS;
	var channel_26 = channel.isColorChannel;
	var channel_27 = channel.CHANNELS;
	var channel_28 = channel.SINGLE_DEF_CHANNELS;
	var channel_29 = channel.isChannel;
	var channel_30 = channel.UNIT_CHANNELS;
	var channel_31 = channel.NONPOSITION_CHANNELS;
	var channel_32 = channel.POSITION_SCALE_CHANNELS;
	var channel_33 = channel.NONPOSITION_SCALE_CHANNELS;
	var channel_34 = channel.SCALE_CHANNELS;
	var channel_35 = channel.isScaleChannel;
	var channel_36 = channel.supportMark;
	var channel_37 = channel.getSupportedMark;
	var channel_38 = channel.rangeType;

	var bin = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function binToString(bin) {
	    if (vega_util_1.isBoolean(bin)) {
	        return 'bin';
	    }
	    return ('bin' +
	        util.keys(bin)
	            .map(function (p) { return util.varName("_" + p + "_" + bin[p]); })
	            .join(''));
	}
	exports.binToString = binToString;
	function isBinning(bin) {
	    return bin === true || isBinParams(bin);
	}
	exports.isBinning = isBinning;
	function isBinned(bin) {
	    return bin === 'binned';
	}
	exports.isBinned = isBinned;
	function isBinParams(bin) {
	    return vega_util_1.isObject(bin);
	}
	exports.isBinParams = isBinParams;
	function autoMaxBins(channel$$1) {
	    switch (channel$$1) {
	        case channel.ROW:
	        case channel.COLUMN:
	        case channel.SIZE:
	        case channel.COLOR:
	        case channel.FILL:
	        case channel.STROKE:
	        case channel.OPACITY:
	        // Facets and Size shouldn't have too many bins
	        // We choose 6 like shape to simplify the rule
	        case channel.SHAPE:
	            return 6; // Vega's "shape" has 6 distinct values
	        default:
	            return 10;
	    }
	}
	exports.autoMaxBins = autoMaxBins;

	});

	unwrapExports(bin);
	var bin_1 = bin.binToString;
	var bin_2 = bin.isBinning;
	var bin_3 = bin.isBinned;
	var bin_4 = bin.isBinParams;
	var bin_5 = bin.autoMaxBins;

	var encoding = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var log = tslib_1.__importStar(log$2);

	function channelHasField(encoding, channel$$1) {
	    var channelDef = encoding && encoding[channel$$1];
	    if (channelDef) {
	        if (vega_util_1.isArray(channelDef)) {
	            return util.some(channelDef, function (fieldDef) { return !!fieldDef.field; });
	        }
	        else {
	            return fielddef.isFieldDef(channelDef) || fielddef.hasConditionalFieldDef(channelDef);
	        }
	    }
	    return false;
	}
	exports.channelHasField = channelHasField;
	function isAggregate(encoding) {
	    return util.some(channel.CHANNELS, function (channel$$1) {
	        if (channelHasField(encoding, channel$$1)) {
	            var channelDef = encoding[channel$$1];
	            if (vega_util_1.isArray(channelDef)) {
	                return util.some(channelDef, function (fieldDef) { return !!fieldDef.aggregate; });
	            }
	            else {
	                var fieldDef = fielddef.getFieldDef(channelDef);
	                return fieldDef && !!fieldDef.aggregate;
	            }
	        }
	        return false;
	    });
	}
	exports.isAggregate = isAggregate;
	function extractTransformsFromEncoding(oldEncoding, config) {
	    var groupby = [];
	    var bins = [];
	    var timeUnits = [];
	    var aggregate$$1 = [];
	    var encoding = {};
	    forEach(oldEncoding, function (channelDef, channel$$1) {
	        if (fielddef.isFieldDef(channelDef)) {
	            var transformedField = fielddef.vgField(channelDef, { forAs: true });
	            if (channelDef.aggregate && aggregate.isAggregateOp(channelDef.aggregate)) {
	                aggregate$$1.push({
	                    op: channelDef.aggregate,
	                    field: channelDef.field,
	                    as: transformedField
	                });
	            }
	            else {
	                // Add bin or timeUnit transform if applicable
	                var bin$$1 = channelDef.bin;
	                if (bin.isBinning(bin$$1)) {
	                    var field = channelDef.field;
	                    bins.push({ bin: bin$$1, field: field, as: transformedField });
	                }
	                else if (channelDef.timeUnit) {
	                    var timeUnit = channelDef.timeUnit, field = channelDef.field;
	                    timeUnits.push({ timeUnit: timeUnit, field: field, as: transformedField });
	                }
	                // TODO(@alanbanh): make bin correct
	                groupby.push(transformedField);
	            }
	            // now the field should refer to post-transformed field instead
	            encoding[channel$$1] = {
	                field: fielddef.vgField(channelDef),
	                type: channelDef.type,
	                title: fielddef.title(channelDef, config, { allowDisabling: true })
	            };
	        }
	        else {
	            // For value def, just copy
	            encoding[channel$$1] = oldEncoding[channel$$1];
	        }
	    });
	    return {
	        bins: bins,
	        timeUnits: timeUnits,
	        aggregate: aggregate$$1,
	        groupby: groupby,
	        encoding: encoding
	    };
	}
	exports.extractTransformsFromEncoding = extractTransformsFromEncoding;
	function normalizeEncoding(encoding, mark) {
	    return util.keys(encoding).reduce(function (normalizedEncoding, channel$$1) {
	        if (!channel.isChannel(channel$$1)) {
	            // Drop invalid channel
	            log.warn(log.message.invalidEncodingChannel(channel$$1));
	            return normalizedEncoding;
	        }
	        if (!channel.supportMark(encoding, channel$$1, mark)) {
	            // Drop unsupported channel
	            log.warn(log.message.incompatibleChannel(channel$$1, mark));
	            return normalizedEncoding;
	        }
	        // Drop line's size if the field is aggregated.
	        if (channel$$1 === 'size' && mark === 'line') {
	            var fieldDef = fielddef.getFieldDef(encoding[channel$$1]);
	            if (fieldDef && fieldDef.aggregate) {
	                log.warn(log.message.LINE_WITH_VARYING_SIZE);
	                return normalizedEncoding;
	            }
	        }
	        // Drop color if either fill or stroke is specified
	        if (channel$$1 === 'color' && ('fill' in encoding || 'stroke' in encoding)) {
	            log.warn(log.message.droppingColor('encoding', { fill: 'fill' in encoding, stroke: 'stroke' in encoding }));
	            return normalizedEncoding;
	        }
	        var channelDef = encoding[channel$$1];
	        if (channel$$1 === 'detail' ||
	            (channel$$1 === 'order' && !vega_util_1.isArray(channelDef) && !fielddef.isValueDef(channelDef)) ||
	            (channel$$1 === 'tooltip' && vega_util_1.isArray(channelDef))) {
	            if (channelDef) {
	                // Array of fieldDefs for detail channel (or production rule)
	                normalizedEncoding[channel$$1] = (vega_util_1.isArray(channelDef) ? channelDef : [channelDef]).reduce(function (defs, fieldDef) {
	                    if (!fielddef.isFieldDef(fieldDef)) {
	                        log.warn(log.message.emptyFieldDef(fieldDef, channel$$1));
	                    }
	                    else {
	                        defs.push(fielddef.normalizeFieldDef(fieldDef, channel$$1));
	                    }
	                    return defs;
	                }, []);
	            }
	        }
	        else {
	            if (!fielddef.isFieldDef(channelDef) && !fielddef.isValueDef(channelDef) && !fielddef.isConditionalDef(channelDef)) {
	                log.warn(log.message.emptyFieldDef(channelDef, channel$$1));
	                return normalizedEncoding;
	            }
	            normalizedEncoding[channel$$1] = fielddef.normalize(channelDef, channel$$1);
	        }
	        return normalizedEncoding;
	    }, {});
	}
	exports.normalizeEncoding = normalizeEncoding;
	function isRanged(encoding) {
	    return encoding && ((!!encoding.x && !!encoding.x2) || (!!encoding.y && !!encoding.y2));
	}
	exports.isRanged = isRanged;
	function fieldDefs(encoding) {
	    var arr = [];
	    channel.CHANNELS.forEach(function (channel$$1) {
	        if (channelHasField(encoding, channel$$1)) {
	            var channelDef = encoding[channel$$1];
	            (vega_util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (def) {
	                if (fielddef.isFieldDef(def)) {
	                    arr.push(def);
	                }
	                else if (fielddef.hasConditionalFieldDef(def)) {
	                    arr.push(def.condition);
	                }
	            });
	        }
	    });
	    return arr;
	}
	exports.fieldDefs = fieldDefs;
	function forEach(mapping, f, thisArg) {
	    if (!mapping) {
	        return;
	    }
	    var _loop_1 = function (channel$$1) {
	        if (vega_util_1.isArray(mapping[channel$$1])) {
	            mapping[channel$$1].forEach(function (channelDef) {
	                f.call(thisArg, channelDef, channel$$1);
	            });
	        }
	        else {
	            f.call(thisArg, mapping[channel$$1], channel$$1);
	        }
	    };
	    for (var _i = 0, _a = util.keys(mapping); _i < _a.length; _i++) {
	        var channel$$1 = _a[_i];
	        _loop_1(channel$$1);
	    }
	}
	exports.forEach = forEach;
	function reduce(mapping, f, init, thisArg) {
	    if (!mapping) {
	        return init;
	    }
	    return util.keys(mapping).reduce(function (r, channel$$1) {
	        var map = mapping[channel$$1];
	        if (vega_util_1.isArray(map)) {
	            return map.reduce(function (r1, channelDef) {
	                return f.call(thisArg, r1, channelDef, channel$$1);
	            }, r);
	        }
	        else {
	            return f.call(thisArg, r, map, channel$$1);
	        }
	    }, init);
	}
	exports.reduce = reduce;

	});

	unwrapExports(encoding);
	var encoding_1 = encoding.channelHasField;
	var encoding_2 = encoding.isAggregate;
	var encoding_3 = encoding.extractTransformsFromEncoding;
	var encoding_4 = encoding.normalizeEncoding;
	var encoding_5 = encoding.isRanged;
	var encoding_6 = encoding.fieldDefs;
	var encoding_7 = encoding.forEach;
	var encoding_8 = encoding.reduce;

	var common = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var log = tslib_1.__importStar(log$2);

	function makeCompositeAggregatePartFactory(compositeMarkDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, compositeMarkConfig) {
	    var scale = continuousAxisChannelDef.scale, axis = continuousAxisChannelDef.axis;
	    return function (partName, mark$$1, positionPrefix, endPositionPrefix, extraEncoding) {
	        if (endPositionPrefix === void 0) { endPositionPrefix = undefined; }
	        if (extraEncoding === void 0) { extraEncoding = {}; }
	        var _a, _b;
	        var title = axis && axis.title !== undefined
	            ? undefined
	            : continuousAxisChannelDef.title !== undefined
	                ? continuousAxisChannelDef.title
	                : continuousAxisChannelDef.field;
	        return partLayerMixins(compositeMarkDef, partName, compositeMarkConfig, {
	            mark: mark$$1,
	            encoding: tslib_1.__assign((_a = {}, _a[continuousAxis] = tslib_1.__assign({ field: positionPrefix + '_' + continuousAxisChannelDef.field, type: continuousAxisChannelDef.type }, (title ? { title: title } : {}), (scale ? { scale: scale } : {}), (axis ? { axis: axis } : {})), _a), (vega_util_1.isString(endPositionPrefix)
	                ? (_b = {},
	                    _b[continuousAxis + '2'] = {
	                        field: endPositionPrefix + '_' + continuousAxisChannelDef.field,
	                        type: continuousAxisChannelDef.type
	                    },
	                    _b) : {}), sharedEncoding, extraEncoding)
	        });
	    };
	}
	exports.makeCompositeAggregatePartFactory = makeCompositeAggregatePartFactory;
	function partLayerMixins(markDef, part, compositeMarkConfig, partBaseSpec) {
	    var color = markDef.color, opacity = markDef.opacity;
	    var mark$$1 = markDef.type;
	    if (markDef[part] || (markDef[part] === undefined && compositeMarkConfig[part])) {
	        return [
	            tslib_1.__assign({}, partBaseSpec, { mark: tslib_1.__assign({}, compositeMarkConfig[part], (color ? { color: color } : {}), (opacity ? { opacity: opacity } : {}), (mark.isMarkDef(partBaseSpec.mark) ? partBaseSpec.mark : { type: partBaseSpec.mark }), { style: mark$$1 + "-" + part }, (vega_util_1.isBoolean(markDef[part]) ? {} : markDef[part])) })
	        ];
	    }
	    return [];
	}
	exports.partLayerMixins = partLayerMixins;
	function compositeMarkContinuousAxis(spec, orient, compositeMark) {
	    var encoding$$1 = spec.encoding;
	    var continuousAxisChannelDef;
	    var continuousAxisChannelDef2;
	    var continuousAxis;
	    if (orient === 'vertical') {
	        continuousAxis = 'y';
	        continuousAxisChannelDef = encoding$$1.y; // Safe to cast because if y is not continuous fielddef, the orient would not be vertical.
	        continuousAxisChannelDef2 = encoding$$1.y2 ? encoding$$1.y2 : undefined;
	    }
	    else {
	        continuousAxis = 'x';
	        continuousAxisChannelDef = encoding$$1.x; // Safe to cast because if x is not continuous fielddef, the orient would not be horizontal.
	        continuousAxisChannelDef2 = encoding$$1.x2 ? encoding$$1.x2 : undefined;
	    }
	    if (continuousAxisChannelDef && continuousAxisChannelDef.aggregate) {
	        var aggregate = continuousAxisChannelDef.aggregate, continuousAxisWithoutAggregate = tslib_1.__rest(continuousAxisChannelDef, ["aggregate"]);
	        if (aggregate !== compositeMark) {
	            log.warn(log.message.errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark));
	        }
	        continuousAxisChannelDef = continuousAxisWithoutAggregate;
	    }
	    if (continuousAxisChannelDef2 && continuousAxisChannelDef2.aggregate) {
	        var aggregate = continuousAxisChannelDef2.aggregate, continuousAxisWithoutAggregate2 = tslib_1.__rest(continuousAxisChannelDef2, ["aggregate"]);
	        if (aggregate !== compositeMark) {
	            log.warn(log.message.errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark));
	        }
	        continuousAxisChannelDef2 = continuousAxisWithoutAggregate2;
	    }
	    return {
	        continuousAxisChannelDef: continuousAxisChannelDef,
	        continuousAxisChannelDef2: continuousAxisChannelDef2,
	        continuousAxis: continuousAxis
	    };
	}
	exports.compositeMarkContinuousAxis = compositeMarkContinuousAxis;
	function compositeMarkOrient(spec, compositeMark) {
	    var mark$$1 = spec.mark, encoding$$1 = spec.encoding;
	    if (fielddef.isFieldDef(encoding$$1.x) && fielddef.isContinuous(encoding$$1.x)) {
	        // x is continuous
	        if (fielddef.isFieldDef(encoding$$1.y) && fielddef.isContinuous(encoding$$1.y)) {
	            // both x and y are continuous
	            if (encoding$$1.x.aggregate === undefined && encoding$$1.y.aggregate === compositeMark) {
	                return 'vertical';
	            }
	            else if (encoding$$1.y.aggregate === undefined && encoding$$1.x.aggregate === compositeMark) {
	                return 'horizontal';
	            }
	            else if (encoding$$1.x.aggregate === compositeMark && encoding$$1.y.aggregate === compositeMark) {
	                throw new Error('Both x and y cannot have aggregate');
	            }
	            else {
	                if (mark.isMarkDef(mark$$1) && mark$$1.orient) {
	                    return mark$$1.orient;
	                }
	                // default orientation = vertical
	                return 'vertical';
	            }
	        }
	        // x is continuous but y is not
	        return 'horizontal';
	    }
	    else if (fielddef.isFieldDef(encoding$$1.y) && fielddef.isContinuous(encoding$$1.y)) {
	        // y is continuous but x is not
	        return 'vertical';
	    }
	    else {
	        // Neither x nor y is continuous.
	        throw new Error('Need a valid continuous axis for ' + compositeMark + 's');
	    }
	}
	exports.compositeMarkOrient = compositeMarkOrient;
	function filterUnsupportedChannels(spec, supportedChannels, compositeMark) {
	    return tslib_1.__assign({}, spec, { encoding: encoding.reduce(spec.encoding, function (newEncoding, fieldDef, channel) {
	            if (supportedChannels.indexOf(channel) > -1) {
	                newEncoding[channel] = fieldDef;
	            }
	            else {
	                log.warn(log.message.incompatibleChannel(channel, compositeMark));
	            }
	            return newEncoding;
	        }, {}) });
	}
	exports.filterUnsupportedChannels = filterUnsupportedChannels;

	});

	unwrapExports(common);
	var common_1 = common.makeCompositeAggregatePartFactory;
	var common_2 = common.partLayerMixins;
	var common_3 = common.compositeMarkContinuousAxis;
	var common_4 = common.compositeMarkOrient;
	var common_5 = common.filterUnsupportedChannels;

	var boxplot = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var log = tslib_1.__importStar(log$2);



	exports.BOXPLOT = 'boxplot';
	var BOXPLOT_PART_INDEX = {
	    box: 1,
	    median: 1,
	    outliers: 1,
	    rule: 1,
	    ticks: 1
	};
	exports.BOXPLOT_PARTS = util.keys(BOXPLOT_PART_INDEX);
	var boxPlotSupportedChannels = ['x', 'y', 'color', 'detail', 'opacity', 'size'];
	function normalizeBoxPlot(spec, config) {
	    var _a;
	    spec = common.filterUnsupportedChannels(spec, boxPlotSupportedChannels, exports.BOXPLOT);
	    // TODO: use selection
	    var mark$$1 = spec.mark, _encoding = spec.encoding, selection = spec.selection, _p = spec.projection, outerSpec = tslib_1.__rest(spec, ["mark", "encoding", "selection", "projection"]);
	    var markDef = mark.isMarkDef(mark$$1) ? mark$$1 : { type: mark$$1 };
	    // TODO(https://github.com/vega/vega-lite/issues/3702): add selection support
	    if (selection) {
	        log.warn(log.message.selectionNotSupported('boxplot'));
	    }
	    var extent = markDef.extent || config.boxplot.extent;
	    var sizeValue = util.getFirstDefined(markDef.size, config.boxplot.size);
	    var isMinMax = !vega_util_1.isNumber(extent);
	    var _b = boxParams(spec, extent, config), transform = _b.transform, continuousAxisChannelDef = _b.continuousAxisChannelDef, continuousAxis = _b.continuousAxis, groupby = _b.groupby, encodingWithoutContinuousAxis = _b.encodingWithoutContinuousAxis, tickOrient = _b.tickOrient;
	    var color = encodingWithoutContinuousAxis.color, size = encodingWithoutContinuousAxis.size, encodingWithoutSizeColorAndContinuousAxis = tslib_1.__rest(encodingWithoutContinuousAxis, ["color", "size"]);
	    var makeBoxPlotPart = function (sharedEncoding) {
	        return common.makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, config.boxplot);
	    };
	    var makeBoxPlotExtent = makeBoxPlotPart(encodingWithoutSizeColorAndContinuousAxis);
	    var makeBoxPlotBox = makeBoxPlotPart(encodingWithoutContinuousAxis);
	    var makeBoxPlotMidTick = makeBoxPlotPart(tslib_1.__assign({}, encodingWithoutSizeColorAndContinuousAxis, (size ? { size: size } : {})));
	    var endTick = { type: 'tick', color: 'black', opacity: 1, orient: tickOrient };
	    var bar = tslib_1.__assign({ type: 'bar' }, (sizeValue ? { size: sizeValue } : {}));
	    var midTick = tslib_1.__assign({ type: 'tick' }, (vega_util_1.isObject(config.boxplot.median) && config.boxplot.median.color ? { color: config.boxplot.median.color } : {}), (sizeValue ? { size: sizeValue } : {}), { orient: tickOrient });
	    var boxLayer = makeBoxPlotExtent('rule', 'rule', 'lower_whisker', 'lower_box').concat(makeBoxPlotExtent('rule', 'rule', 'upper_box', 'upper_whisker'), makeBoxPlotExtent('ticks', endTick, 'lower_whisker'), makeBoxPlotExtent('ticks', endTick, 'upper_whisker'), makeBoxPlotBox('box', bar, 'lower_box', 'upper_box'), makeBoxPlotMidTick('median', midTick, 'mid_box'));
	    var outliersLayerMixins = [];
	    if (!isMinMax) {
	        var lowerBoxExpr = 'datum.lower_box_' + continuousAxisChannelDef.field;
	        var upperBoxExpr = 'datum.upper_box_' + continuousAxisChannelDef.field;
	        var iqrExpr = "(" + upperBoxExpr + " - " + lowerBoxExpr + ")";
	        var lowerWhiskerExpr = lowerBoxExpr + " - " + extent + " * " + iqrExpr;
	        var upperWhiskerExpr = upperBoxExpr + " + " + extent + " * " + iqrExpr;
	        var fieldExpr = "datum." + continuousAxisChannelDef.field;
	        outliersLayerMixins = common.partLayerMixins(markDef, 'outliers', config.boxplot, {
	            transform: [
	                {
	                    window: boxParamsQuartiles(continuousAxisChannelDef.field),
	                    frame: [null, null],
	                    groupby: groupby
	                },
	                {
	                    filter: "(" + fieldExpr + " < " + lowerWhiskerExpr + ") || (" + fieldExpr + " > " + upperWhiskerExpr + ")"
	                }
	            ],
	            mark: 'point',
	            encoding: tslib_1.__assign((_a = {}, _a[continuousAxis] = {
	                field: continuousAxisChannelDef.field,
	                type: continuousAxisChannelDef.type
	            }, _a), encodingWithoutSizeColorAndContinuousAxis)
	        });
	    }
	    if (outliersLayerMixins.length > 0) {
	        // tukey box plot with outliers included
	        return tslib_1.__assign({}, outerSpec, { layer: [
	                {
	                    // boxplot
	                    transform: transform,
	                    layer: boxLayer
	                }
	            ].concat(outliersLayerMixins) });
	    }
	    return tslib_1.__assign({}, outerSpec, { transform: transform, layer: boxLayer });
	}
	exports.normalizeBoxPlot = normalizeBoxPlot;
	function boxParamsQuartiles(continousAxisField) {
	    return [
	        {
	            op: 'q1',
	            field: continousAxisField,
	            as: 'lower_box_' + continousAxisField
	        },
	        {
	            op: 'q3',
	            field: continousAxisField,
	            as: 'upper_box_' + continousAxisField
	        }
	    ];
	}
	function boxParams(spec, extent, config) {
	    var orient = common.compositeMarkOrient(spec, exports.BOXPLOT);
	    var _a = common.compositeMarkContinuousAxis(spec, orient, exports.BOXPLOT), continuousAxisChannelDef = _a.continuousAxisChannelDef, continuousAxis = _a.continuousAxis;
	    var continuousFieldName = continuousAxisChannelDef.field;
	    var isMinMax = !vega_util_1.isNumber(extent);
	    var boxplotSpecificAggregate = boxParamsQuartiles(continuousFieldName).concat([
	        {
	            op: 'median',
	            field: continuousFieldName,
	            as: 'mid_box_' + continuousFieldName
	        },
	        {
	            op: 'min',
	            field: continuousFieldName,
	            as: (isMinMax ? 'lower_whisker_' : 'min_') + continuousFieldName
	        },
	        {
	            op: 'max',
	            field: continuousFieldName,
	            as: (isMinMax ? 'upper_whisker_' : 'max_') + continuousFieldName
	        }
	    ]);
	    var postAggregateCalculates = isMinMax
	        ? []
	        : [
	            {
	                calculate: "datum.upper_box_" + continuousFieldName + " - datum.lower_box_" + continuousFieldName,
	                as: 'iqr_' + continuousFieldName
	            },
	            {
	                calculate: "min(datum.upper_box_" + continuousFieldName + " + datum.iqr_" + continuousFieldName + " * " + extent + ", datum.max_" + continuousFieldName + ")",
	                as: 'upper_whisker_' + continuousFieldName
	            },
	            {
	                calculate: "max(datum.lower_box_" + continuousFieldName + " - datum.iqr_" + continuousFieldName + " * " + extent + ", datum.min_" + continuousFieldName + ")",
	                as: 'lower_whisker_' + continuousFieldName
	            }
	        ];
	    var _b = spec.encoding, _c = continuousAxis, oldContinuousAxisChannelDef = _b[_c], oldEncodingWithoutContinuousAxis = tslib_1.__rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
	    var _d = encoding.extractTransformsFromEncoding(oldEncodingWithoutContinuousAxis, config), bins = _d.bins, timeUnits = _d.timeUnits, aggregate = _d.aggregate, groupby = _d.groupby, encodingWithoutContinuousAxis = _d.encoding;
	    var tickOrient = orient === 'vertical' ? 'horizontal' : 'vertical';
	    return {
	        transform: bins.concat(timeUnits, [
	            {
	                aggregate: aggregate.concat(boxplotSpecificAggregate),
	                groupby: groupby
	            }
	        ], postAggregateCalculates),
	        groupby: groupby,
	        continuousAxisChannelDef: continuousAxisChannelDef,
	        continuousAxis: continuousAxis,
	        encodingWithoutContinuousAxis: encodingWithoutContinuousAxis,
	        tickOrient: tickOrient
	    };
	}

	});

	unwrapExports(boxplot);
	var boxplot_1 = boxplot.BOXPLOT;
	var boxplot_2 = boxplot.BOXPLOT_PARTS;
	var boxplot_3 = boxplot.normalizeBoxPlot;

	var errorbar = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var log = tslib_1.__importStar(log$2);



	exports.ERRORBAR = 'errorbar';
	var ERRORBAR_PART_INDEX = {
	    ticks: 1,
	    rule: 1
	};
	exports.ERRORBAR_PARTS = util.keys(ERRORBAR_PART_INDEX);
	function normalizeErrorBar(spec, config) {
	    var _a = errorBarParams(spec, exports.ERRORBAR, config), transform = _a.transform, continuousAxisChannelDef = _a.continuousAxisChannelDef, continuousAxis = _a.continuousAxis, encodingWithoutContinuousAxis = _a.encodingWithoutContinuousAxis, ticksOrient = _a.ticksOrient, markDef = _a.markDef, outerSpec = _a.outerSpec;
	    var makeErrorBarPart = common.makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config.errorbar);
	    var tick = { type: 'tick', orient: ticksOrient };
	    return tslib_1.__assign({}, outerSpec, { transform: transform, layer: makeErrorBarPart('ticks', tick, 'lower').concat(makeErrorBarPart('ticks', tick, 'upper'), makeErrorBarPart('rule', 'rule', 'lower', 'upper')) });
	}
	exports.normalizeErrorBar = normalizeErrorBar;
	function errorBarOrientAndRange(spec, compositeMark) {
	    var encoding$$1 = spec.encoding;
	    if (fielddef.isFieldDef(encoding$$1.x2) && fielddef.isFieldDef(encoding$$1.x) && fielddef.isContinuous(encoding$$1.x)) {
	        // having x and x2
	        if (fielddef.isFieldDef(encoding$$1.y2) && fielddef.isFieldDef(encoding$$1.y) && fielddef.isContinuous(encoding$$1.y)) {
	            // having both x, x2 and y, y2
	            throw new Error('Cannot have both x2 and y2 with both are quantiative');
	        }
	        else {
	            // having x, x2 but not y, y2
	            return { orient: 'horizontal', isRangedErrorBar: true };
	        }
	    }
	    else if (fielddef.isFieldDef(encoding$$1.y2) && fielddef.isFieldDef(encoding$$1.y) && fielddef.isContinuous(encoding$$1.y)) {
	        // having y, y2 but not x, x2
	        return { orient: 'vertical', isRangedErrorBar: true };
	    }
	    return {
	        orient: common.compositeMarkOrient(spec, compositeMark),
	        isRangedErrorBar: false
	    };
	}
	exports.errorBarSupportedChannels = ['x', 'y', 'x2', 'y2', 'color', 'detail', 'opacity'];
	function errorBarParams(spec, compositeMark, config) {
	    spec = common.filterUnsupportedChannels(spec, exports.errorBarSupportedChannels, compositeMark);
	    // TODO: use selection
	    var mark$$1 = spec.mark, encoding$$1 = spec.encoding, selection = spec.selection, _p = spec.projection, outerSpec = tslib_1.__rest(spec, ["mark", "encoding", "selection", "projection"]);
	    var markDef = mark.isMarkDef(mark$$1) ? mark$$1 : { type: mark$$1 };
	    // TODO(https://github.com/vega/vega-lite/issues/3702): add selection support
	    if (selection) {
	        log.warn(log.message.selectionNotSupported(compositeMark));
	    }
	    var _a = errorBarOrientAndRange(spec, compositeMark), orient = _a.orient, isRangedErrorBar = _a.isRangedErrorBar;
	    var _b = common.compositeMarkContinuousAxis(spec, orient, compositeMark), continuousAxisChannelDef = _b.continuousAxisChannelDef, continuousAxisChannelDef2 = _b.continuousAxisChannelDef2, continuousAxis = _b.continuousAxis;
	    var _c = errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, isRangedErrorBar, compositeMark, config), errorBarSpecificAggregate = _c.errorBarSpecificAggregate, postAggregateCalculates = _c.postAggregateCalculates;
	    var _d = continuousAxis, oldContinuousAxisChannelDef = encoding$$1[_d], _e = continuousAxis + '2', oldContinuousAxisChannelDef2 = encoding$$1[_e], oldEncodingWithoutContinuousAxis = tslib_1.__rest(encoding$$1, [typeof _d === "symbol" ? _d : _d + "", typeof _e === "symbol" ? _e : _e + ""]);
	    var _f = encoding.extractTransformsFromEncoding(oldEncodingWithoutContinuousAxis, config), bins = _f.bins, timeUnits = _f.timeUnits, oldAggregate = _f.aggregate, oldGroupBy = _f.groupby, encodingWithoutContinuousAxis = _f.encoding;
	    var aggregate = oldAggregate.concat(errorBarSpecificAggregate);
	    var groupby = isRangedErrorBar ? [] : oldGroupBy;
	    return {
	        transform: bins.concat(timeUnits, (!aggregate.length ? [] : [{ aggregate: aggregate, groupby: groupby }]), postAggregateCalculates),
	        groupby: groupby,
	        continuousAxisChannelDef: continuousAxisChannelDef,
	        continuousAxis: continuousAxis,
	        encodingWithoutContinuousAxis: encodingWithoutContinuousAxis,
	        ticksOrient: orient === 'vertical' ? 'horizontal' : 'vertical',
	        markDef: markDef,
	        outerSpec: outerSpec
	    };
	}
	exports.errorBarParams = errorBarParams;
	function errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, isRangedErrorBar, compositeMark, config) {
	    var errorBarSpecificAggregate = [];
	    var postAggregateCalculates = [];
	    var continuousFieldName = continuousAxisChannelDef.field;
	    if (isRangedErrorBar) {
	        if (markDef.center || markDef.extent) {
	            log.warn(log.message.errorBarCenterAndExtentAreNotNeeded(markDef.center, markDef.extent));
	        }
	        postAggregateCalculates = [
	            {
	                calculate: "datum." + continuousFieldName,
	                as: "lower_" + continuousFieldName
	            },
	            {
	                calculate: "datum." + continuousAxisChannelDef2.field,
	                as: "upper_" + continuousFieldName
	            }
	        ];
	    }
	    else {
	        var center = markDef.center
	            ? markDef.center
	            : markDef.extent
	                ? markDef.extent === 'iqr'
	                    ? 'median'
	                    : 'mean'
	                : config.errorbar.center;
	        var extent = markDef.extent ? markDef.extent : center === 'mean' ? 'stderr' : 'iqr';
	        if ((center === 'median') !== (extent === 'iqr')) {
	            log.warn(log.message.errorBarCenterIsUsedWithWrongExtent(center, extent, compositeMark));
	        }
	        if (extent === 'stderr' || extent === 'stdev') {
	            errorBarSpecificAggregate = [
	                {
	                    op: extent,
	                    field: continuousFieldName,
	                    as: 'extent_' + continuousFieldName
	                },
	                {
	                    op: center,
	                    field: continuousFieldName,
	                    as: 'center_' + continuousFieldName
	                }
	            ];
	            postAggregateCalculates = [
	                {
	                    calculate: "datum.center_" + continuousFieldName + " + datum.extent_" + continuousFieldName,
	                    as: 'upper_' + continuousFieldName
	                },
	                {
	                    calculate: "datum.center_" + continuousFieldName + " - datum.extent_" + continuousFieldName,
	                    as: 'lower_' + continuousFieldName
	                }
	            ];
	        }
	        else {
	            if (markDef.center && markDef.extent) {
	                log.warn(log.message.errorBarCenterIsNotNeeded(markDef.extent, compositeMark));
	            }
	            errorBarSpecificAggregate = [
	                {
	                    op: extent === 'ci' ? 'ci0' : 'q1',
	                    field: continuousFieldName,
	                    as: 'lower_' + continuousFieldName
	                },
	                {
	                    op: extent === 'ci' ? 'ci1' : 'q3',
	                    field: continuousFieldName,
	                    as: 'upper_' + continuousFieldName
	                }
	            ];
	        }
	    }
	    return { postAggregateCalculates: postAggregateCalculates, errorBarSpecificAggregate: errorBarSpecificAggregate };
	}

	});

	unwrapExports(errorbar);
	var errorbar_1 = errorbar.ERRORBAR;
	var errorbar_2 = errorbar.ERRORBAR_PARTS;
	var errorbar_3 = errorbar.normalizeErrorBar;
	var errorbar_4 = errorbar.errorBarSupportedChannels;
	var errorbar_5 = errorbar.errorBarParams;

	var errorband = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var log = tslib_1.__importStar(log$2);



	exports.ERRORBAND = 'errorband';
	var ERRORBAND_PART_INDEX = {
	    band: 1,
	    borders: 1
	};
	exports.ERRORBAND_PARTS = util.keys(ERRORBAND_PART_INDEX);
	function normalizeErrorBand(spec, config) {
	    var _a = errorbar.errorBarParams(spec, exports.ERRORBAND, config), transform = _a.transform, continuousAxisChannelDef = _a.continuousAxisChannelDef, continuousAxis = _a.continuousAxis, encodingWithoutContinuousAxis = _a.encodingWithoutContinuousAxis, markDef = _a.markDef, outerSpec = _a.outerSpec;
	    var makeErrorBandPart = common.makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config.errorband);
	    var is2D = spec.encoding.x !== undefined && spec.encoding.y !== undefined;
	    var bandMark = { type: is2D ? 'area' : 'rect' };
	    var bordersMark = { type: is2D ? 'line' : 'rule' };
	    var interpolate = tslib_1.__assign({}, (markDef.interpolate ? { interpolate: markDef.interpolate } : {}), (markDef.tension && markDef.interpolate ? { interpolate: markDef.tension } : {}));
	    if (is2D) {
	        bandMark = tslib_1.__assign({}, bandMark, interpolate);
	        bordersMark = tslib_1.__assign({}, bordersMark, interpolate);
	    }
	    else if (markDef.interpolate) {
	        log.warn(log.message.errorBand1DNotSupport('interpolate'));
	    }
	    else if (markDef.tension) {
	        log.warn(log.message.errorBand1DNotSupport('tension'));
	    }
	    return tslib_1.__assign({}, outerSpec, { transform: transform, layer: makeErrorBandPart('band', bandMark, 'lower', 'upper').concat(makeErrorBandPart('borders', bordersMark, 'lower'), makeErrorBandPart('borders', bordersMark, 'upper')) });
	}
	exports.normalizeErrorBand = normalizeErrorBand;

	});

	unwrapExports(errorband);
	var errorband_1 = errorband.ERRORBAND;
	var errorband_2 = errorband.ERRORBAND_PARTS;
	var errorband_3 = errorband.normalizeErrorBand;

	var compositemark = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Registry index for all composite mark's normalizer
	 */
	var compositeMarkRegistry = {};
	function add(mark$$1, normalizer, parts) {
	    compositeMarkRegistry[mark$$1] = { normalizer: normalizer, parts: parts };
	}
	exports.add = add;
	function remove(mark$$1) {
	    delete compositeMarkRegistry[mark$$1];
	}
	exports.remove = remove;
	function getAllCompositeMarks() {
	    return util.keys(compositeMarkRegistry);
	}
	exports.getAllCompositeMarks = getAllCompositeMarks;
	function getCompositeMarkParts(mark$$1) {
	    if (mark$$1 in compositeMarkRegistry) {
	        return compositeMarkRegistry[mark$$1].parts;
	    }
	    throw new Error("Unregistered composite mark " + mark$$1);
	}
	exports.getCompositeMarkParts = getCompositeMarkParts;
	add(boxplot.BOXPLOT, boxplot.normalizeBoxPlot, boxplot.BOXPLOT_PARTS);
	add(errorbar.ERRORBAR, errorbar.normalizeErrorBar, errorbar.ERRORBAR_PARTS);
	add(errorband.ERRORBAND, errorband.normalizeErrorBand, errorband.ERRORBAND_PARTS);
	/**
	 * Transform a unit spec with composite mark into a normal layer spec.
	 */
	function normalize(
	// This GenericUnitSpec has any as Encoding because unit specs with composite mark can have additional encoding channels.
	spec, config) {
	    var mark$$1 = mark.isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
	    if (mark$$1 in compositeMarkRegistry) {
	        var normalizer = compositeMarkRegistry[mark$$1].normalizer;
	        return normalizer(spec, config);
	    }
	    throw new Error("Invalid mark type \"" + mark$$1 + "\"");
	}
	exports.normalize = normalize;

	});

	unwrapExports(compositemark);
	var compositemark_1 = compositemark.add;
	var compositemark_2 = compositemark.remove;
	var compositemark_3 = compositemark.getAllCompositeMarks;
	var compositemark_4 = compositemark.getCompositeMarkParts;
	var compositemark_5 = compositemark.normalize;

	var guide = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VL_ONLY_GUIDE_CONFIG = ['shortTimeLabels'];

	});

	unwrapExports(guide);
	var guide_1 = guide.VL_ONLY_GUIDE_CONFIG;

	var legend = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.defaultLegendConfig = {};
	var COMMON_LEGEND_PROPERTY_INDEX = {
	    clipHeight: 1,
	    columnPadding: 1,
	    columns: 1,
	    cornerRadius: 1,
	    direction: 1,
	    fillColor: 1,
	    format: 1,
	    gradientLength: 1,
	    gradientOpacity: 1,
	    gradientStrokeColor: 1,
	    gradientStrokeWidth: 1,
	    gradientThickness: 1,
	    gridAlign: 1,
	    labelAlign: 1,
	    labelBaseline: 1,
	    labelColor: 1,
	    labelFont: 1,
	    labelFontSize: 1,
	    labelFontWeight: 1,
	    labelLimit: 1,
	    labelOffset: 1,
	    labelOpacity: 1,
	    labelOverlap: 1,
	    labelPadding: 1,
	    offset: 1,
	    orient: 1,
	    padding: 1,
	    rowPadding: 1,
	    strokeColor: 1,
	    strokeWidth: 1,
	    symbolFillColor: 1,
	    symbolOffset: 1,
	    symbolOpacity: 1,
	    symbolSize: 1,
	    symbolStrokeColor: 1,
	    symbolStrokeWidth: 1,
	    symbolType: 1,
	    tickCount: 1,
	    title: 1,
	    titleAlign: 1,
	    titleBaseline: 1,
	    titleColor: 1,
	    titleFont: 1,
	    titleFontSize: 1,
	    titleFontWeight: 1,
	    titleLimit: 1,
	    titleOpacity: 1,
	    titlePadding: 1,
	    type: 1,
	    values: 1,
	    zindex: 1
	};
	var VG_LEGEND_PROPERTY_INDEX = tslib_1.__assign({}, COMMON_LEGEND_PROPERTY_INDEX, { 
	    // channel scales
	    opacity: 1, shape: 1, stroke: 1, fill: 1, size: 1, 
	    // encode
	    encode: 1 });
	exports.LEGEND_PROPERTIES = util.flagKeys(COMMON_LEGEND_PROPERTY_INDEX);
	exports.VG_LEGEND_PROPERTIES = util.flagKeys(VG_LEGEND_PROPERTY_INDEX);

	});

	unwrapExports(legend);
	var legend_1 = legend.defaultLegendConfig;
	var legend_2 = legend.LEGEND_PROPERTIES;
	var legend_3 = legend.VG_LEGEND_PROPERTIES;

	var scale = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var log = tslib_1.__importStar(log$2);


	var ScaleType;
	(function (ScaleType) {
	    // Continuous - Quantitative
	    ScaleType.LINEAR = 'linear';
	    ScaleType.BIN_LINEAR = 'bin-linear';
	    ScaleType.LOG = 'log';
	    ScaleType.POW = 'pow';
	    ScaleType.SQRT = 'sqrt';
	    // Continuous - Time
	    ScaleType.TIME = 'time';
	    ScaleType.UTC = 'utc';
	    // sequential
	    ScaleType.SEQUENTIAL = 'sequential';
	    // Quantile, Quantize, threshold
	    ScaleType.QUANTILE = 'quantile';
	    ScaleType.QUANTIZE = 'quantize';
	    ScaleType.THRESHOLD = 'threshold';
	    ScaleType.ORDINAL = 'ordinal';
	    ScaleType.BIN_ORDINAL = 'bin-ordinal';
	    ScaleType.POINT = 'point';
	    ScaleType.BAND = 'band';
	})(ScaleType = exports.ScaleType || (exports.ScaleType = {}));
	/**
	 * Index for scale categories -- only scale of the same categories can be merged together.
	 * Current implementation is trying to be conservative and avoid merging scale type that might not work together
	 */
	var SCALE_CATEGORY_INDEX = {
	    linear: 'numeric',
	    log: 'numeric',
	    pow: 'numeric',
	    sqrt: 'numeric',
	    'bin-linear': 'bin-linear',
	    time: 'time',
	    utc: 'time',
	    sequential: 'sequential',
	    ordinal: 'ordinal',
	    'bin-ordinal': 'bin-ordinal',
	    point: 'ordinal-position',
	    band: 'ordinal-position',
	    quantile: 'discretizing',
	    quantize: 'discretizing',
	    threshold: 'discretizing'
	};
	exports.SCALE_TYPES = util.keys(SCALE_CATEGORY_INDEX);
	/**
	 * Whether the two given scale types can be merged together.
	 */
	function scaleCompatible(scaleType1, scaleType2) {
	    var scaleCategory1 = SCALE_CATEGORY_INDEX[scaleType1];
	    var scaleCategory2 = SCALE_CATEGORY_INDEX[scaleType2];
	    return (scaleCategory1 === scaleCategory2 ||
	        (scaleCategory1 === 'ordinal-position' && scaleCategory2 === 'time') ||
	        (scaleCategory2 === 'ordinal-position' && scaleCategory1 === 'time'));
	}
	exports.scaleCompatible = scaleCompatible;
	/**
	 * Index for scale precedence -- high score = higher priority for merging.
	 */
	var SCALE_PRECEDENCE_INDEX = {
	    // numeric
	    linear: 0,
	    log: 1,
	    pow: 1,
	    sqrt: 1,
	    // time
	    time: 0,
	    utc: 0,
	    // ordinal-position -- these have higher precedence than continuous scales as they support more types of data
	    point: 10,
	    band: 11,
	    // non grouped types
	    'bin-linear': 0,
	    sequential: 0,
	    ordinal: 0,
	    'bin-ordinal': 0,
	    quantile: 0,
	    quantize: 0,
	    threshold: 0
	};
	/**
	 * Return scale categories -- only scale of the same categories can be merged together.
	 */
	function scaleTypePrecedence(scaleType) {
	    return SCALE_PRECEDENCE_INDEX[scaleType];
	}
	exports.scaleTypePrecedence = scaleTypePrecedence;
	exports.CONTINUOUS_TO_CONTINUOUS_SCALES = [
	    'linear',
	    'bin-linear',
	    'log',
	    'pow',
	    'sqrt',
	    'time',
	    'utc'
	];
	var CONTINUOUS_TO_CONTINUOUS_INDEX = vega_util_1.toSet(exports.CONTINUOUS_TO_CONTINUOUS_SCALES);
	exports.CONTINUOUS_TO_DISCRETE_SCALES = ['quantile', 'quantize', 'threshold'];
	var CONTINUOUS_TO_DISCRETE_INDEX = vega_util_1.toSet(exports.CONTINUOUS_TO_DISCRETE_SCALES);
	exports.CONTINUOUS_DOMAIN_SCALES = exports.CONTINUOUS_TO_CONTINUOUS_SCALES.concat([
	    'sequential',
	    'quantile',
	    'quantize',
	    'threshold'
	]);
	var CONTINUOUS_DOMAIN_INDEX = vega_util_1.toSet(exports.CONTINUOUS_DOMAIN_SCALES);
	exports.DISCRETE_DOMAIN_SCALES = ['ordinal', 'bin-ordinal', 'point', 'band'];
	var DISCRETE_DOMAIN_INDEX = vega_util_1.toSet(exports.DISCRETE_DOMAIN_SCALES);
	var BIN_SCALES_INDEX = vega_util_1.toSet(['bin-linear', 'bin-ordinal']);
	exports.TIME_SCALE_TYPES = ['time', 'utc'];
	function hasDiscreteDomain(type$$1) {
	    return type$$1 in DISCRETE_DOMAIN_INDEX;
	}
	exports.hasDiscreteDomain = hasDiscreteDomain;
	function isBinScale(type$$1) {
	    return type$$1 in BIN_SCALES_INDEX;
	}
	exports.isBinScale = isBinScale;
	function hasContinuousDomain(type$$1) {
	    return type$$1 in CONTINUOUS_DOMAIN_INDEX;
	}
	exports.hasContinuousDomain = hasContinuousDomain;
	function isContinuousToContinuous(type$$1) {
	    return type$$1 in CONTINUOUS_TO_CONTINUOUS_INDEX;
	}
	exports.isContinuousToContinuous = isContinuousToContinuous;
	function isContinuousToDiscrete(type$$1) {
	    return type$$1 in CONTINUOUS_TO_DISCRETE_INDEX;
	}
	exports.isContinuousToDiscrete = isContinuousToDiscrete;
	exports.defaultScaleConfig = {
	    textXRangeStep: 90,
	    rangeStep: 21,
	    pointPadding: 0.5,
	    bandPaddingInner: 0.1,
	    facetSpacing: 16,
	    minBandSize: 2,
	    minFontSize: 8,
	    maxFontSize: 40,
	    minOpacity: 0.3,
	    maxOpacity: 0.8,
	    // FIXME: revise if these *can* become ratios of rangeStep
	    minSize: 9,
	    minStrokeWidth: 1,
	    maxStrokeWidth: 4,
	    quantileCount: 4,
	    quantizeCount: 4
	};
	function isExtendedScheme(scheme) {
	    return scheme && !!scheme['name'];
	}
	exports.isExtendedScheme = isExtendedScheme;
	function isSelectionDomain(domain) {
	    return domain && domain['selection'];
	}
	exports.isSelectionDomain = isSelectionDomain;
	var SCALE_PROPERTY_INDEX = {
	    type: 1,
	    domain: 1,
	    range: 1,
	    rangeStep: 1,
	    scheme: 1,
	    // Other properties
	    reverse: 1,
	    round: 1,
	    // quantitative / time
	    clamp: 1,
	    nice: 1,
	    // quantitative
	    base: 1,
	    exponent: 1,
	    interpolate: 1,
	    zero: 1,
	    // band/point
	    padding: 1,
	    paddingInner: 1,
	    paddingOuter: 1
	};
	exports.SCALE_PROPERTIES = util.flagKeys(SCALE_PROPERTY_INDEX);
	var NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX = tslib_1.__rest(SCALE_PROPERTY_INDEX, ["type", "domain", "range", "rangeStep", "scheme"]);
	exports.NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES = util.flagKeys(NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX);
	exports.SCALE_TYPE_INDEX = generateScaleTypeIndex();
	function scaleTypeSupportProperty(scaleType, propName) {
	    switch (propName) {
	        case 'type':
	        case 'domain':
	        case 'reverse':
	        case 'range':
	            return true;
	        case 'scheme':
	            return util.contains(['sequential', 'ordinal', 'bin-ordinal', 'quantile', 'quantize', 'threshold'], scaleType);
	        case 'interpolate':
	            return util.contains(['linear', 'bin-linear', 'pow', 'log', 'sqrt', 'utc', 'time'], scaleType);
	        case 'round':
	            return isContinuousToContinuous(scaleType) || scaleType === 'band' || scaleType === 'point';
	        case 'padding':
	            return isContinuousToContinuous(scaleType) || util.contains(['point', 'band'], scaleType);
	        case 'paddingOuter':
	        case 'rangeStep':
	            return util.contains(['point', 'band'], scaleType);
	        case 'paddingInner':
	            return scaleType === 'band';
	        case 'clamp':
	            return isContinuousToContinuous(scaleType) || scaleType === 'sequential';
	        case 'nice':
	            return isContinuousToContinuous(scaleType) || scaleType === 'sequential' || scaleType === 'quantize';
	        case 'exponent':
	            return scaleType === 'pow';
	        case 'base':
	            return scaleType === 'log';
	        case 'zero':
	            return (hasContinuousDomain(scaleType) &&
	                !util.contains([
	                    'log',
	                    'time',
	                    'utc',
	                    'bin-linear',
	                    'threshold',
	                    'quantile' // quantile depends on distribution so zero does not matter
	                ], scaleType));
	    }
	    /* istanbul ignore next: should never reach here*/
	    throw new Error("Invalid scale property " + propName + ".");
	}
	exports.scaleTypeSupportProperty = scaleTypeSupportProperty;
	/**
	 * Returns undefined if the input channel supports the input scale property name
	 */
	function channelScalePropertyIncompatability(channel$$1, propName) {
	    switch (propName) {
	        case 'interpolate':
	        case 'scheme':
	            if (!channel.isColorChannel(channel$$1)) {
	                return log.message.cannotUseScalePropertyWithNonColor(channel$$1);
	            }
	            return undefined;
	        case 'type':
	        case 'domain':
	        case 'range':
	        case 'base':
	        case 'exponent':
	        case 'nice':
	        case 'padding':
	        case 'paddingInner':
	        case 'paddingOuter':
	        case 'rangeStep':
	        case 'reverse':
	        case 'round':
	        case 'clamp':
	        case 'zero':
	            return undefined; // GOOD!
	    }
	    /* istanbul ignore next: it should never reach here */
	    throw new Error("Invalid scale property \"" + propName + "\".");
	}
	exports.channelScalePropertyIncompatability = channelScalePropertyIncompatability;
	function scaleTypeSupportDataType(specifiedType, fieldDefType, bin) {
	    if (util.contains([type.Type.ORDINAL, type.Type.NOMINAL], fieldDefType)) {
	        return specifiedType === undefined || hasDiscreteDomain(specifiedType);
	    }
	    else if (fieldDefType === type.Type.TEMPORAL) {
	        return util.contains([ScaleType.TIME, ScaleType.UTC, ScaleType.SEQUENTIAL, undefined], specifiedType);
	    }
	    else if (fieldDefType === type.Type.QUANTITATIVE) {
	        if (bin) {
	            return util.contains([ScaleType.BIN_LINEAR, ScaleType.BIN_ORDINAL, ScaleType.LINEAR], specifiedType);
	        }
	        return util.contains([
	            ScaleType.LOG,
	            ScaleType.POW,
	            ScaleType.SQRT,
	            ScaleType.QUANTILE,
	            ScaleType.QUANTIZE,
	            ScaleType.THRESHOLD,
	            ScaleType.LINEAR,
	            ScaleType.SEQUENTIAL,
	            undefined
	        ], specifiedType);
	    }
	    return true;
	}
	exports.scaleTypeSupportDataType = scaleTypeSupportDataType;
	function channelSupportScaleType(channel$$1, scaleType) {
	    switch (channel$$1) {
	        case channel.Channel.X:
	        case channel.Channel.Y:
	            return isContinuousToContinuous(scaleType) || util.contains(['band', 'point'], scaleType);
	        case channel.Channel.SIZE: // TODO: size and opacity can support ordinal with more modification
	        case channel.Channel.OPACITY:
	            // Although it generally doesn't make sense to use band with size and opacity,
	            // it can also work since we use band: 0.5 to get midpoint.
	            return (isContinuousToContinuous(scaleType) ||
	                isContinuousToDiscrete(scaleType) ||
	                util.contains(['band', 'point'], scaleType));
	        case channel.Channel.COLOR:
	        case channel.Channel.FILL:
	        case channel.Channel.STROKE:
	            return scaleType !== 'band'; // band does not make sense with color
	        case channel.Channel.SHAPE:
	            return scaleType === 'ordinal'; // shape = lookup only
	    }
	    /* istanbul ignore next: it should never reach here */
	    return false;
	}
	exports.channelSupportScaleType = channelSupportScaleType;
	function getSupportedScaleType(channel$$1, fieldDefType, bin) {
	    return exports.SCALE_TYPE_INDEX[generateScaleTypeIndexKey(channel$$1, fieldDefType, bin)];
	}
	exports.getSupportedScaleType = getSupportedScaleType;
	// generates ScaleTypeIndex where keys are encoding channels and values are list of valid ScaleTypes
	function generateScaleTypeIndex() {
	    var index = {};
	    for (var _i = 0, CHANNELS_1 = channel.CHANNELS; _i < CHANNELS_1.length; _i++) {
	        var channel$$1 = CHANNELS_1[_i];
	        for (var _a = 0, _b = util.keys(type.TYPE_INDEX); _a < _b.length; _a++) {
	            var fieldDefType = _b[_a];
	            for (var _c = 0, SCALE_TYPES_1 = exports.SCALE_TYPES; _c < SCALE_TYPES_1.length; _c++) {
	                var scaleType = SCALE_TYPES_1[_c];
	                for (var _d = 0, _e = [false, true]; _d < _e.length; _d++) {
	                    var bin = _e[_d];
	                    var key = generateScaleTypeIndexKey(channel$$1, fieldDefType, bin);
	                    if (channelSupportScaleType(channel$$1, scaleType) && scaleTypeSupportDataType(scaleType, fieldDefType, bin)) {
	                        index[key] = index[key] || [];
	                        index[key].push(scaleType);
	                    }
	                }
	            }
	        }
	    }
	    return index;
	}
	function generateScaleTypeIndexKey(channel$$1, fieldDefType, bin) {
	    var key = channel$$1 + '_' + fieldDefType;
	    return bin ? key + '_bin' : key;
	}

	});

	unwrapExports(scale);
	var scale_1 = scale.ScaleType;
	var scale_2 = scale.SCALE_TYPES;
	var scale_3 = scale.scaleCompatible;
	var scale_4 = scale.scaleTypePrecedence;
	var scale_5 = scale.CONTINUOUS_TO_CONTINUOUS_SCALES;
	var scale_6 = scale.CONTINUOUS_TO_DISCRETE_SCALES;
	var scale_7 = scale.CONTINUOUS_DOMAIN_SCALES;
	var scale_8 = scale.DISCRETE_DOMAIN_SCALES;
	var scale_9 = scale.TIME_SCALE_TYPES;
	var scale_10 = scale.hasDiscreteDomain;
	var scale_11 = scale.isBinScale;
	var scale_12 = scale.hasContinuousDomain;
	var scale_13 = scale.isContinuousToContinuous;
	var scale_14 = scale.isContinuousToDiscrete;
	var scale_15 = scale.defaultScaleConfig;
	var scale_16 = scale.isExtendedScheme;
	var scale_17 = scale.isSelectionDomain;
	var scale_18 = scale.SCALE_PROPERTIES;
	var scale_19 = scale.NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES;
	var scale_20 = scale.SCALE_TYPE_INDEX;
	var scale_21 = scale.scaleTypeSupportProperty;
	var scale_22 = scale.channelScalePropertyIncompatability;
	var scale_23 = scale.scaleTypeSupportDataType;
	var scale_24 = scale.channelSupportScaleType;
	var scale_25 = scale.getSupportedScaleType;

	var selection = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SELECTION_ID = '_vgsid_';
	exports.defaultConfig = {
	    single: {
	        on: 'click',
	        fields: [exports.SELECTION_ID],
	        resolve: 'global',
	        empty: 'all'
	    },
	    multi: {
	        on: 'click',
	        fields: [exports.SELECTION_ID],
	        toggle: 'event.shiftKey',
	        resolve: 'global',
	        empty: 'all'
	    },
	    interval: {
	        on: '[mousedown, window:mouseup] > window:mousemove!',
	        encodings: ['x', 'y'],
	        translate: '[mousedown, window:mouseup] > window:mousemove!',
	        zoom: 'wheel!',
	        mark: { fill: '#333', fillOpacity: 0.125, stroke: 'white' },
	        resolve: 'global'
	    }
	};

	});

	unwrapExports(selection);
	var selection_1 = selection.SELECTION_ID;
	var selection_2 = selection.defaultConfig;

	var title = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function extractTitleConfig(titleConfig) {
	    var 
	    // These are non-mark title config that need to be hardcoded
	    anchor = titleConfig.anchor, frame = titleConfig.frame, offset = titleConfig.offset, orient = titleConfig.orient, 
	    // color needs to be redirect to fill
	    color = titleConfig.color, 
	    // The rest are mark config.
	    titleMarkConfig = tslib_1.__rest(titleConfig, ["anchor", "frame", "offset", "orient", "color"]);
	    var mark = tslib_1.__assign({}, titleMarkConfig, (color ? { fill: color } : {}));
	    var nonMark = tslib_1.__assign({}, (anchor ? { anchor: anchor } : {}), (offset ? { offset: offset } : {}), (orient ? { orient: orient } : {}));
	    return { mark: mark, nonMark: nonMark };
	}
	exports.extractTitleConfig = extractTitleConfig;

	});

	unwrapExports(title);
	var title_1 = title.extractTitleConfig;

	var config = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var mark$$1 = tslib_1.__importStar(mark);
	var mark_1 = mark;




	exports.defaultViewConfig = {
	    width: 200,
	    height: 200
	};
	function isVgScheme(rangeConfig) {
	    return rangeConfig && !!rangeConfig['scheme'];
	}
	exports.isVgScheme = isVgScheme;
	exports.defaultConfig = {
	    padding: 5,
	    timeFormat: '%b %d, %Y',
	    countTitle: 'Number of Records',
	    invalidValues: 'filter',
	    view: exports.defaultViewConfig,
	    mark: mark$$1.defaultMarkConfig,
	    area: {},
	    bar: mark$$1.defaultBarConfig,
	    circle: {},
	    geoshape: {},
	    line: {},
	    point: {},
	    rect: {},
	    rule: { color: 'black' },
	    square: {},
	    text: { color: 'black' },
	    tick: mark$$1.defaultTickConfig,
	    trail: {},
	    boxplot: {
	        size: 14,
	        extent: 1.5,
	        box: {},
	        median: { color: 'white' },
	        outliers: {},
	        rule: {},
	        ticks: null
	    },
	    errorbar: {
	        center: 'mean',
	        rule: true,
	        ticks: false
	    },
	    errorband: {
	        band: {
	            opacity: 0.3
	        },
	        borders: false
	    },
	    scale: scale.defaultScaleConfig,
	    projection: {},
	    axis: {},
	    axisX: {},
	    axisY: { minExtent: 30 },
	    axisLeft: {},
	    axisRight: {},
	    axisTop: {},
	    axisBottom: {},
	    axisBand: {},
	    legend: legend.defaultLegendConfig,
	    selection: selection.defaultConfig,
	    style: {},
	    title: {}
	};
	function initConfig(config) {
	    return util.mergeDeep(util.duplicate(exports.defaultConfig), config);
	}
	exports.initConfig = initConfig;
	var MARK_STYLES = ['view'].concat(mark_1.PRIMITIVE_MARKS);
	var VL_ONLY_CONFIG_PROPERTIES = [
	    'padding',
	    'numberFormat',
	    'timeFormat',
	    'countTitle',
	    'stack',
	    'scale',
	    'selection',
	    'invalidValues',
	    'overlay' // FIXME: Redesign and unhide this
	];
	var VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = tslib_1.__assign({ view: ['width', 'height'] }, mark_1.VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX);
	function stripAndRedirectConfig(config) {
	    config = util.duplicate(config);
	    for (var _i = 0, VL_ONLY_CONFIG_PROPERTIES_1 = VL_ONLY_CONFIG_PROPERTIES; _i < VL_ONLY_CONFIG_PROPERTIES_1.length; _i++) {
	        var prop = VL_ONLY_CONFIG_PROPERTIES_1[_i];
	        delete config[prop];
	    }
	    // Remove Vega-Lite only axis/legend config
	    if (config.axis) {
	        for (var _a = 0, VL_ONLY_GUIDE_CONFIG_1 = guide.VL_ONLY_GUIDE_CONFIG; _a < VL_ONLY_GUIDE_CONFIG_1.length; _a++) {
	            var prop = VL_ONLY_GUIDE_CONFIG_1[_a];
	            delete config.axis[prop];
	        }
	    }
	    if (config.legend) {
	        for (var _b = 0, VL_ONLY_GUIDE_CONFIG_2 = guide.VL_ONLY_GUIDE_CONFIG; _b < VL_ONLY_GUIDE_CONFIG_2.length; _b++) {
	            var prop = VL_ONLY_GUIDE_CONFIG_2[_b];
	            delete config.legend[prop];
	        }
	    }
	    // Remove Vega-Lite only generic mark config
	    if (config.mark) {
	        for (var _c = 0, VL_ONLY_MARK_CONFIG_PROPERTIES_1 = mark_1.VL_ONLY_MARK_CONFIG_PROPERTIES; _c < VL_ONLY_MARK_CONFIG_PROPERTIES_1.length; _c++) {
	            var prop = VL_ONLY_MARK_CONFIG_PROPERTIES_1[_c];
	            delete config.mark[prop];
	        }
	    }
	    for (var _d = 0, MARK_STYLES_1 = MARK_STYLES; _d < MARK_STYLES_1.length; _d++) {
	        var markType = MARK_STYLES_1[_d];
	        // Remove Vega-Lite-only mark config
	        for (var _e = 0, VL_ONLY_MARK_CONFIG_PROPERTIES_2 = mark_1.VL_ONLY_MARK_CONFIG_PROPERTIES; _e < VL_ONLY_MARK_CONFIG_PROPERTIES_2.length; _e++) {
	            var prop = VL_ONLY_MARK_CONFIG_PROPERTIES_2[_e];
	            delete config[markType][prop];
	        }
	        // Remove Vega-Lite only mark-specific config
	        var vlOnlyMarkSpecificConfigs = VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX[markType];
	        if (vlOnlyMarkSpecificConfigs) {
	            for (var _f = 0, vlOnlyMarkSpecificConfigs_1 = vlOnlyMarkSpecificConfigs; _f < vlOnlyMarkSpecificConfigs_1.length; _f++) {
	                var prop = vlOnlyMarkSpecificConfigs_1[_f];
	                delete config[markType][prop];
	            }
	        }
	        // Redirect mark config to config.style so that mark config only affect its own mark type
	        // without affecting other marks that share the same underlying Vega marks.
	        // For example, config.rect should not affect bar marks.
	        redirectConfig(config, markType);
	    }
	    for (var _g = 0, _h = compositemark.getAllCompositeMarks(); _g < _h.length; _g++) {
	        var m = _h[_g];
	        // Clean up the composite mark config as we don't need them in the output specs anymore
	        delete config[m];
	    }
	    // Redirect config.title -- so that title config do not
	    // affect header labels, which also uses `title` directive to implement.
	    redirectConfig(config, 'title', 'group-title');
	    // Remove empty config objects
	    for (var prop in config) {
	        if (vega_util_1.isObject(config[prop]) && util.keys(config[prop]).length === 0) {
	            delete config[prop];
	        }
	    }
	    return util.keys(config).length > 0 ? config : undefined;
	}
	exports.stripAndRedirectConfig = stripAndRedirectConfig;
	function redirectConfig(config, prop, // string = composite mark
	toProp, compositeMarkPart) {
	    var propConfig = prop === 'title'
	        ? title.extractTitleConfig(config.title).mark
	        : compositeMarkPart
	            ? config[prop][compositeMarkPart]
	            : config[prop];
	    if (prop === 'view') {
	        toProp = 'cell'; // View's default style is "cell"
	    }
	    var style = tslib_1.__assign({}, propConfig, config.style[prop]);
	    // set config.style if it is not an empty object
	    if (util.keys(style).length > 0) {
	        config.style[toProp || prop] = style;
	    }
	    if (!compositeMarkPart) {
	        // For composite mark, so don't delete the whole config yet as we have to do multiple redirections.
	        delete config[prop];
	    }
	}

	});

	unwrapExports(config);
	var config_1 = config.defaultViewConfig;
	var config_2 = config.isVgScheme;
	var config_3 = config.defaultConfig;
	var config_4 = config.initConfig;
	var config_5 = config.stripAndRedirectConfig;

	var stack_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var log = tslib_1.__importStar(log$2);



	var STACK_OFFSET_INDEX = {
	    zero: 1,
	    center: 1,
	    normalize: 1
	};
	function isStackOffset(s) {
	    return !!STACK_OFFSET_INDEX[s];
	}
	exports.isStackOffset = isStackOffset;
	exports.STACKABLE_MARKS = [mark.BAR, mark.AREA, mark.RULE, mark.POINT, mark.CIRCLE, mark.SQUARE, mark.LINE, mark.TEXT, mark.TICK];
	exports.STACK_BY_DEFAULT_MARKS = [mark.BAR, mark.AREA];
	function potentialStackedChannel(encoding$$1) {
	    var xDef = encoding$$1.x;
	    var yDef = encoding$$1.y;
	    if (fielddef.isFieldDef(xDef) && fielddef.isFieldDef(yDef)) {
	        if (xDef.type === 'quantitative' && yDef.type === 'quantitative') {
	            if (xDef.stack) {
	                return 'x';
	            }
	            else if (yDef.stack) {
	                return 'y';
	            }
	            // if there is no explicit stacking, only apply stack if there is only one aggregate for x or y
	            if (!!xDef.aggregate !== !!yDef.aggregate) {
	                return xDef.aggregate ? 'x' : 'y';
	            }
	        }
	        else if (xDef.type === 'quantitative') {
	            return 'x';
	        }
	        else if (yDef.type === 'quantitative') {
	            return 'y';
	        }
	    }
	    else if (fielddef.isFieldDef(xDef) && xDef.type === 'quantitative') {
	        return 'x';
	    }
	    else if (fielddef.isFieldDef(yDef) && yDef.type === 'quantitative') {
	        return 'y';
	    }
	    return undefined;
	}
	// Note: CompassQL uses this method and only pass in required properties of each argument object.
	// If required properties change, make sure to update CompassQL.
	function stack(m, encoding$$1, stackConfig) {
	    var mark$$1 = mark.isMarkDef(m) ? m.type : m;
	    // Should have stackable mark
	    if (!util.contains(exports.STACKABLE_MARKS, mark$$1)) {
	        return null;
	    }
	    var fieldChannel = potentialStackedChannel(encoding$$1);
	    if (!fieldChannel) {
	        return null;
	    }
	    var stackedFieldDef = encoding$$1[fieldChannel];
	    var stackedField = fielddef.isStringFieldDef(stackedFieldDef) ? fielddef.vgField(stackedFieldDef, {}) : undefined;
	    var dimensionChannel = fieldChannel === 'x' ? 'y' : 'x';
	    var dimensionDef = encoding$$1[dimensionChannel];
	    var dimensionField = fielddef.isStringFieldDef(dimensionDef) ? fielddef.vgField(dimensionDef, {}) : undefined;
	    // Should have grouping level of detail that is different from the dimension field
	    var stackBy = channel.NONPOSITION_CHANNELS.reduce(function (sc, channel$$1) {
	        if (encoding.channelHasField(encoding$$1, channel$$1)) {
	            var channelDef = encoding$$1[channel$$1];
	            (vega_util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (cDef) {
	                var fieldDef = fielddef.getFieldDef(cDef);
	                if (fieldDef.aggregate) {
	                    return;
	                }
	                // Check whether the channel's field is identical to x/y's field or if the channel is a repeat
	                var f = fielddef.isStringFieldDef(fieldDef) ? fielddef.vgField(fieldDef, {}) : undefined;
	                if (
	                // if fielddef is a repeat, just include it in the stack by
	                !f ||
	                    // otherwise, the field must be different from x and y fields.
	                    (f !== dimensionField && f !== stackedField)) {
	                    sc.push({ channel: channel$$1, fieldDef: fieldDef });
	                }
	            });
	        }
	        return sc;
	    }, []);
	    if (stackBy.length === 0) {
	        return null;
	    }
	    // Automatically determine offset
	    var offset;
	    if (stackedFieldDef.stack !== undefined) {
	        offset = stackedFieldDef.stack;
	    }
	    else if (util.contains(exports.STACK_BY_DEFAULT_MARKS, mark$$1)) {
	        // Bar and Area with sum ops are automatically stacked by default
	        offset = util.getFirstDefined(stackConfig, 'zero');
	    }
	    else {
	        offset = stackConfig;
	    }
	    if (!offset || !isStackOffset(offset)) {
	        return null;
	    }
	    // warn when stacking non-linear
	    if (stackedFieldDef.scale && stackedFieldDef.scale.type && stackedFieldDef.scale.type !== scale.ScaleType.LINEAR) {
	        log.warn(log.message.cannotStackNonLinearScale(stackedFieldDef.scale.type));
	    }
	    // Check if it is a ranged mark
	    if (encoding.channelHasField(encoding$$1, fieldChannel === channel.X ? channel.X2 : channel.Y2)) {
	        if (stackedFieldDef.stack !== undefined) {
	            log.warn(log.message.cannotStackRangedMark(fieldChannel));
	        }
	        return null;
	    }
	    // Warn if stacking summative aggregate
	    if (stackedFieldDef.aggregate && !util.contains(aggregate.SUM_OPS, stackedFieldDef.aggregate)) {
	        log.warn(log.message.stackNonSummativeAggregate(stackedFieldDef.aggregate));
	    }
	    return {
	        groupbyChannel: dimensionDef ? dimensionChannel : undefined,
	        fieldChannel: fieldChannel,
	        impute: mark.isPathMark(mark$$1),
	        stackBy: stackBy,
	        offset: offset
	    };
	}
	exports.stack = stack;

	});

	unwrapExports(stack_1);
	var stack_2 = stack_1.isStackOffset;
	var stack_3 = stack_1.STACKABLE_MARKS;
	var stack_4 = stack_1.STACK_BY_DEFAULT_MARKS;
	var stack_5 = stack_1.stack;

	var normalize_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var compositeMark = tslib_1.__importStar(compositemark);

	var log = tslib_1.__importStar(log$2);




	function normalizeTopLevelSpec(spec$$1, config) {
	    return normalize(spec$$1, config);
	}
	exports.normalizeTopLevelSpec = normalizeTopLevelSpec;
	/**
	 * Decompose extended unit specs into composition of pure unit specs.
	 */
	function normalize(spec$$1, config) {
	    if (spec.isFacetSpec(spec$$1)) {
	        return normalizeFacet(spec$$1, config);
	    }
	    if (spec.isLayerSpec(spec$$1)) {
	        return normalizeLayer(spec$$1, config);
	    }
	    if (spec.isRepeatSpec(spec$$1)) {
	        return normalizeRepeat(spec$$1, config);
	    }
	    if (spec.isVConcatSpec(spec$$1)) {
	        return normalizeVConcat(spec$$1, config);
	    }
	    if (spec.isHConcatSpec(spec$$1)) {
	        return normalizeHConcat(spec$$1, config);
	    }
	    if (spec.isUnitSpec(spec$$1)) {
	        var hasRow = encoding.channelHasField(spec$$1.encoding, channel.ROW);
	        var hasColumn = encoding.channelHasField(spec$$1.encoding, channel.COLUMN);
	        if (hasRow || hasColumn) {
	            return normalizeFacetedUnit(spec$$1, config);
	        }
	        return normalizeNonFacetUnit(spec$$1, config);
	    }
	    throw new Error(log.message.INVALID_SPEC);
	}
	function normalizeFacet(spec$$1, config) {
	    var subspec = spec$$1.spec, rest = tslib_1.__rest(spec$$1, ["spec"]);
	    return tslib_1.__assign({}, rest, { 
	        // TODO: remove "any" once we support all facet listed in https://github.com/vega/vega-lite/issues/2760
	        spec: normalize(subspec, config) });
	}
	function mergeEncoding(opt) {
	    var parentEncoding = opt.parentEncoding, encoding$$1 = opt.encoding;
	    if (parentEncoding && encoding$$1) {
	        var overriden = util.keys(parentEncoding).reduce(function (o, key) {
	            if (encoding$$1[key]) {
	                o.push(key);
	            }
	            return o;
	        }, []);
	        if (overriden.length > 0) {
	            log.warn(log.message.encodingOverridden(overriden));
	        }
	    }
	    var merged = tslib_1.__assign({}, (parentEncoding || {}), (encoding$$1 || {}));
	    return util.keys(merged).length > 0 ? merged : undefined;
	}
	function mergeProjection(opt) {
	    var parentProjection = opt.parentProjection, projection = opt.projection;
	    if (parentProjection && projection) {
	        log.warn(log.message.projectionOverridden({ parentProjection: parentProjection, projection: projection }));
	    }
	    return projection || parentProjection;
	}
	function normalizeLayer(spec$$1, config, parentEncoding, parentProjection) {
	    var layer = spec$$1.layer, encoding$$1 = spec$$1.encoding, projection = spec$$1.projection, rest = tslib_1.__rest(spec$$1, ["layer", "encoding", "projection"]);
	    var mergedEncoding = mergeEncoding({ parentEncoding: parentEncoding, encoding: encoding$$1 });
	    var mergedProjection = mergeProjection({ parentProjection: parentProjection, projection: projection });
	    return tslib_1.__assign({}, rest, { layer: layer.map(function (subspec) {
	            if (spec.isLayerSpec(subspec)) {
	                return normalizeLayer(subspec, config, mergedEncoding, mergedProjection);
	            }
	            return normalizeNonFacetUnit(subspec, config, mergedEncoding, mergedProjection);
	        }) });
	}
	function normalizeRepeat(spec$$1, config) {
	    var subspec = spec$$1.spec, rest = tslib_1.__rest(spec$$1, ["spec"]);
	    return tslib_1.__assign({}, rest, { spec: normalize(subspec, config) });
	}
	function normalizeVConcat(spec$$1, config) {
	    var vconcat = spec$$1.vconcat, rest = tslib_1.__rest(spec$$1, ["vconcat"]);
	    return tslib_1.__assign({}, rest, { vconcat: vconcat.map(function (subspec) { return normalize(subspec, config); }) });
	}
	function normalizeHConcat(spec$$1, config) {
	    var hconcat = spec$$1.hconcat, rest = tslib_1.__rest(spec$$1, ["hconcat"]);
	    return tslib_1.__assign({}, rest, { hconcat: hconcat.map(function (subspec) { return normalize(subspec, config); }) });
	}
	function normalizeFacetedUnit(spec$$1, config) {
	    // New encoding in the inside spec should not contain row / column
	    // as row/column should be moved to facet
	    var _a = spec$$1.encoding, row = _a.row, column = _a.column, encoding$$1 = tslib_1.__rest(_a, ["row", "column"]);
	    // Mark and encoding should be moved into the inner spec
	    var mark$$1 = spec$$1.mark, width = spec$$1.width, projection = spec$$1.projection, height = spec$$1.height, selection = spec$$1.selection, _ = spec$$1.encoding, outerSpec = tslib_1.__rest(spec$$1, ["mark", "width", "projection", "height", "selection", "encoding"]);
	    return tslib_1.__assign({}, outerSpec, { facet: tslib_1.__assign({}, (row ? { row: row } : {}), (column ? { column: column } : {})), spec: normalizeNonFacetUnit(tslib_1.__assign({}, (projection ? { projection: projection } : {}), { mark: mark$$1 }, (width ? { width: width } : {}), (height ? { height: height } : {}), { encoding: encoding$$1 }, (selection ? { selection: selection } : {})), config) });
	}
	function isNonFacetUnitSpecWithPrimitiveMark(spec$$1) {
	    return mark.isPrimitiveMark(spec$$1.mark);
	}
	function getPointOverlay(markDef, markConfig, encoding$$1) {
	    if (markDef.point === 'transparent') {
	        return { opacity: 0 };
	    }
	    else if (markDef.point) {
	        // truthy : true or object
	        return vega_util_1.isObject(markDef.point) ? markDef.point : {};
	    }
	    else if (markDef.point !== undefined) {
	        // false or null
	        return null;
	    }
	    else {
	        // undefined (not disabled)
	        if (markConfig.point || encoding$$1.shape) {
	            // enable point overlay if config[mark].point is truthy or if encoding.shape is provided
	            return vega_util_1.isObject(markConfig.point) ? markConfig.point : {};
	        }
	        // markDef.point is defined as falsy
	        return null;
	    }
	}
	function getLineOverlay(markDef, markConfig) {
	    if (markDef.line) {
	        // true or object
	        return markDef.line === true ? {} : markDef.line;
	    }
	    else if (markDef.line !== undefined) {
	        // false or null
	        return null;
	    }
	    else {
	        // undefined (not disabled)
	        if (markConfig.line) {
	            // enable line overlay if config[mark].line is truthy
	            return markConfig.line === true ? {} : markConfig.line;
	        }
	        // markDef.point is defined as falsy
	        return null;
	    }
	}
	function normalizeNonFacetUnit(spec$$1, config, parentEncoding, parentProjection) {
	    var encoding$$1 = spec$$1.encoding, projection = spec$$1.projection;
	    var mark$$1 = mark.isMarkDef(spec$$1.mark) ? spec$$1.mark.type : spec$$1.mark;
	    // merge parent encoding / projection first
	    if (parentEncoding || parentProjection) {
	        var mergedProjection = mergeProjection({ parentProjection: parentProjection, projection: projection });
	        var mergedEncoding = mergeEncoding({ parentEncoding: parentEncoding, encoding: encoding$$1 });
	        return normalizeNonFacetUnit(tslib_1.__assign({}, spec$$1, (mergedProjection ? { projection: mergedProjection } : {}), (mergedEncoding ? { encoding: mergedEncoding } : {})), config);
	    }
	    if (isNonFacetUnitSpecWithPrimitiveMark(spec$$1)) {
	        // TODO: thoroughly test
	        if (encoding.isRanged(encoding$$1)) {
	            return normalizeRangedUnit(spec$$1);
	        }
	        if (mark$$1 === 'line' && (encoding$$1.x2 || encoding$$1.y2)) {
	            log.warn(log.message.lineWithRange(!!encoding$$1.x2, !!encoding$$1.y2));
	            return normalizeNonFacetUnit(tslib_1.__assign({ mark: 'rule' }, spec$$1), config, parentEncoding, parentProjection);
	        }
	        if (mark.isPathMark(mark$$1)) {
	            return normalizePathOverlay(spec$$1, config);
	        }
	        return spec$$1; // Nothing to normalize
	    }
	    else {
	        return compositeMark.normalize(spec$$1, config);
	    }
	}
	function normalizeRangedUnit(spec$$1) {
	    var hasX = encoding.channelHasField(spec$$1.encoding, channel.X);
	    var hasY = encoding.channelHasField(spec$$1.encoding, channel.Y);
	    var hasX2 = encoding.channelHasField(spec$$1.encoding, channel.X2);
	    var hasY2 = encoding.channelHasField(spec$$1.encoding, channel.Y2);
	    if ((hasX2 && !hasX) || (hasY2 && !hasY)) {
	        var normalizedSpec = util.duplicate(spec$$1);
	        if (hasX2 && !hasX) {
	            normalizedSpec.encoding.x = normalizedSpec.encoding.x2;
	            delete normalizedSpec.encoding.x2;
	        }
	        if (hasY2 && !hasY) {
	            normalizedSpec.encoding.y = normalizedSpec.encoding.y2;
	            delete normalizedSpec.encoding.y2;
	        }
	        return normalizedSpec;
	    }
	    return spec$$1;
	}
	function dropLineAndPoint(markDef) {
	    var _point = markDef.point, _line = markDef.line, mark$$1 = tslib_1.__rest(markDef, ["point", "line"]);
	    return util.keys(mark$$1).length > 1 ? mark$$1 : mark$$1.type;
	}
	function normalizePathOverlay(spec$$1, config) {
	    if (config === void 0) { config = {}; }
	    var _a;
	    // _ is used to denote a dropped property of the unit spec
	    // which should not be carried over to the layer spec
	    var selection = spec$$1.selection, projection = spec$$1.projection, encoding$$1 = spec$$1.encoding, mark$$1 = spec$$1.mark, outerSpec = tslib_1.__rest(spec$$1, ["selection", "projection", "encoding", "mark"]);
	    var markDef = mark.isMarkDef(mark$$1) ? mark$$1 : { type: mark$$1 };
	    var pointOverlay = getPointOverlay(markDef, config[markDef.type], encoding$$1);
	    var lineOverlay = markDef.type === 'area' && getLineOverlay(markDef, config[markDef.type]);
	    if (!pointOverlay && !lineOverlay) {
	        return tslib_1.__assign({}, spec$$1, { 
	            // Do not include point / line overlay in the normalize spec
	            mark: dropLineAndPoint(markDef) });
	    }
	    var layer = [
	        tslib_1.__assign({}, (selection ? { selection: selection } : {}), { 
	            // Do not include point / line overlay in the normalize spec
	            mark: dropLineAndPoint(tslib_1.__assign({}, markDef, (markDef.type === 'area' ? { opacity: 0.7 } : {}))), 
	            // drop shape from encoding as this might be used to trigger point overlay
	            encoding: util.omit(encoding$$1, ['shape']) })
	    ];
	    // FIXME: determine rules for applying selections.
	    // Need to copy stack config to overlayed layer
	    var stackProps = stack_1.stack(markDef, encoding$$1, config ? config.stack : undefined);
	    var overlayEncoding = encoding$$1;
	    if (stackProps) {
	        var stackFieldChannel = stackProps.fieldChannel, offset = stackProps.offset;
	        overlayEncoding = tslib_1.__assign({}, encoding$$1, (_a = {}, _a[stackFieldChannel] = tslib_1.__assign({}, encoding$$1[stackFieldChannel], (offset ? { stack: offset } : {})), _a));
	    }
	    if (lineOverlay) {
	        layer.push(tslib_1.__assign({}, (projection ? { projection: projection } : {}), { mark: tslib_1.__assign({ type: 'line' }, util.pick(markDef, ['clip', 'interpolate', 'tension']), lineOverlay), encoding: overlayEncoding }));
	    }
	    if (pointOverlay) {
	        layer.push(tslib_1.__assign({}, (projection ? { projection: projection } : {}), { mark: tslib_1.__assign({ type: 'point', opacity: 1, filled: true }, util.pick(markDef, ['clip']), pointOverlay), encoding: overlayEncoding }));
	    }
	    return tslib_1.__assign({}, outerSpec, { layer: layer });
	}

	});

	unwrapExports(normalize_1);
	var normalize_2 = normalize_1.normalizeTopLevelSpec;

	var spec = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var vlEncoding = tslib_1.__importStar(encoding);



	/* Custom type guards */
	function isFacetSpec(spec) {
	    return spec['facet'] !== undefined;
	}
	exports.isFacetSpec = isFacetSpec;
	function isUnitSpec(spec) {
	    return !!spec['mark'];
	}
	exports.isUnitSpec = isUnitSpec;
	function isLayerSpec(spec) {
	    return spec['layer'] !== undefined;
	}
	exports.isLayerSpec = isLayerSpec;
	function isRepeatSpec(spec) {
	    return spec['repeat'] !== undefined;
	}
	exports.isRepeatSpec = isRepeatSpec;
	function isConcatSpec(spec) {
	    return isVConcatSpec(spec) || isHConcatSpec(spec);
	}
	exports.isConcatSpec = isConcatSpec;
	function isVConcatSpec(spec) {
	    return spec['vconcat'] !== undefined;
	}
	exports.isVConcatSpec = isVConcatSpec;
	function isHConcatSpec(spec) {
	    return spec['hconcat'] !== undefined;
	}
	exports.isHConcatSpec = isHConcatSpec;

	exports.normalize = normalize_1.normalizeTopLevelSpec;
	// TODO: add vl.spec.validate & move stuff from vl.validate to here
	/* Accumulate non-duplicate fieldDefs in a dictionary */
	function accumulate(dict, defs) {
	    defs.forEach(function (fieldDef) {
	        // Consider only pure fieldDef properties (ignoring scale, axis, legend)
	        var pureFieldDef = ['field', 'type', 'value', 'timeUnit', 'bin', 'aggregate'].reduce(function (f, key) {
	            if (fieldDef[key] !== undefined) {
	                f[key] = fieldDef[key];
	            }
	            return f;
	        }, {});
	        var key = util.hash(pureFieldDef);
	        dict[key] = dict[key] || fieldDef;
	    });
	    return dict;
	}
	/* Recursively get fieldDefs from a spec, returns a dictionary of fieldDefs */
	function fieldDefIndex(spec, dict) {
	    if (dict === void 0) { dict = {}; }
	    // FIXME(https://github.com/vega/vega-lite/issues/2207): Support fieldDefIndex for repeat
	    if (isLayerSpec(spec)) {
	        spec.layer.forEach(function (layer) {
	            if (isUnitSpec(layer)) {
	                accumulate(dict, vlEncoding.fieldDefs(layer.encoding));
	            }
	            else {
	                fieldDefIndex(layer, dict);
	            }
	        });
	    }
	    else if (isFacetSpec(spec)) {
	        accumulate(dict, vlEncoding.fieldDefs(spec.facet));
	        fieldDefIndex(spec.spec, dict);
	    }
	    else if (isRepeatSpec(spec)) {
	        fieldDefIndex(spec.spec, dict);
	    }
	    else if (isConcatSpec(spec)) {
	        var childSpec = isVConcatSpec(spec) ? spec.vconcat : spec.hconcat;
	        childSpec.forEach(function (child) { return fieldDefIndex(child, dict); });
	    }
	    else {
	        // Unit Spec
	        accumulate(dict, vlEncoding.fieldDefs(spec.encoding));
	    }
	    return dict;
	}
	/* Returns all non-duplicate fieldDefs in a spec in a flat array */
	function fieldDefs(spec) {
	    return util.vals(fieldDefIndex(spec));
	}
	exports.fieldDefs = fieldDefs;
	function isStacked(spec, config) {
	    config = config || spec.config;
	    if (mark.isPrimitiveMark(spec.mark)) {
	        return stack_1.stack(spec.mark, spec.encoding, config ? config.stack : undefined) !== null;
	    }
	    return false;
	}
	exports.isStacked = isStacked;

	});

	unwrapExports(spec);
	var spec_1 = spec.isFacetSpec;
	var spec_2 = spec.isUnitSpec;
	var spec_3 = spec.isLayerSpec;
	var spec_4 = spec.isRepeatSpec;
	var spec_5 = spec.isConcatSpec;
	var spec_6 = spec.isVConcatSpec;
	var spec_7 = spec.isHConcatSpec;
	var spec_8 = spec.normalize;
	var spec_9 = spec.fieldDefs;
	var spec_10 = spec.isStacked;

	var toplevelprops = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var log = tslib_1.__importStar(log$2);
	function extractCompositionLayout(layout) {
	    var _a = layout || {}, _b = _a.align, align = _b === void 0 ? undefined : _b, _c = _a.center, center = _c === void 0 ? undefined : _c, _d = _a.bounds, bounds = _d === void 0 ? undefined : _d, _e = _a.spacing, spacing = _e === void 0 ? undefined : _e;
	    return { align: align, bounds: bounds, center: center, spacing: spacing };
	}
	exports.extractCompositionLayout = extractCompositionLayout;
	function _normalizeAutoSize(autosize) {
	    return vega_util_1.isString(autosize) ? { type: autosize } : autosize || {};
	}
	function normalizeAutoSize(topLevelAutosize, configAutosize, isUnitOrLayer) {
	    if (isUnitOrLayer === void 0) { isUnitOrLayer = true; }
	    var autosize = tslib_1.__assign({ type: 'pad' }, _normalizeAutoSize(configAutosize), _normalizeAutoSize(topLevelAutosize));
	    if (autosize.type === 'fit') {
	        if (!isUnitOrLayer) {
	            log.warn(log.message.FIT_NON_SINGLE);
	            autosize.type = 'pad';
	        }
	    }
	    return autosize;
	}
	exports.normalizeAutoSize = normalizeAutoSize;
	var TOP_LEVEL_PROPERTIES = [
	    'background',
	    'padding',
	    'datasets'
	    // We do not include "autosize" here as it is supported by only unit and layer specs and thus need to be normalized
	];
	function extractTopLevelProperties(t) {
	    return TOP_LEVEL_PROPERTIES.reduce(function (o, p) {
	        if (t && t[p] !== undefined) {
	            o[p] = t[p];
	        }
	        return o;
	    }, {});
	}
	exports.extractTopLevelProperties = extractTopLevelProperties;

	});

	unwrapExports(toplevelprops);
	var toplevelprops_1 = toplevelprops.extractCompositionLayout;
	var toplevelprops_2 = toplevelprops.normalizeAutoSize;
	var toplevelprops_3 = toplevelprops.extractTopLevelProperties;

	var data = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function isUrlData(data) {
	    return !!data['url'];
	}
	exports.isUrlData = isUrlData;
	function isInlineData(data) {
	    return !!data['values'];
	}
	exports.isInlineData = isInlineData;
	function isNamedData(data) {
	    return !!data['name'] && !isUrlData(data) && !isInlineData(data);
	}
	exports.isNamedData = isNamedData;
	exports.MAIN = 'main';
	exports.RAW = 'raw';

	});

	unwrapExports(data);
	var data_1 = data.isUrlData;
	var data_2 = data.isInlineData;
	var data_3 = data.isNamedData;
	var data_4 = data.MAIN;
	var data_5 = data.RAW;

	/**
	 * Parse an event selector string.
	 * Returns an array of event stream definitions.
	 */
	function eventSelector(selector, source, marks) {
	  DEFAULT_SOURCE = source || VIEW;
	  MARKS = marks || DEFAULT_MARKS;
	  return parseMerge(selector.trim()).map(parseSelector);
	}

	var VIEW    = 'view',
	    LBRACK  = '[',
	    RBRACK  = ']',
	    LBRACE  = '{',
	    RBRACE  = '}',
	    COLON   = ':',
	    COMMA   = ',',
	    NAME    = '@',
	    GT      = '>',
	    ILLEGAL = /[[\]{}]/,
	    DEFAULT_SOURCE,
	    MARKS,
	    DEFAULT_MARKS = {
	      '*': 1,
	      arc: 1,
	      area: 1,
	      group: 1,
	      image: 1,
	      line: 1,
	      path: 1,
	      rect: 1,
	      rule: 1,
	      shape: 1,
	      symbol: 1,
	      text: 1,
	      trail: 1
	    };

	function isMarkType(type) {
	  return MARKS.hasOwnProperty(type);
	}

	function find(s, i, endChar, pushChar, popChar) {
	  var count = 0,
	      n = s.length,
	      c;
	  for (; i<n; ++i) {
	    c = s[i];
	    if (!count && c === endChar) return i;
	    else if (popChar && popChar.indexOf(c) >= 0) --count;
	    else if (pushChar && pushChar.indexOf(c) >= 0) ++count;
	  }
	  return i;
	}

	function parseMerge(s) {
	  var output = [],
	      start = 0,
	      n = s.length,
	      i = 0;

	  while (i < n) {
	    i = find(s, i, COMMA, LBRACK + LBRACE, RBRACK + RBRACE);
	    output.push(s.substring(start, i).trim());
	    start = ++i;
	  }

	  if (output.length === 0) {
	    throw 'Empty event selector: ' + s;
	  }
	  return output;
	}

	function parseSelector(s) {
	  return s[0] === '['
	    ? parseBetween(s)
	    : parseStream(s);
	}

	function parseBetween(s) {
	  var n = s.length,
	      i = 1,
	      b, stream;

	  i = find(s, i, RBRACK, LBRACK, RBRACK);
	  if (i === n) {
	    throw 'Empty between selector: ' + s;
	  }

	  b = parseMerge(s.substring(1, i));
	  if (b.length !== 2) {
	    throw 'Between selector must have two elements: ' + s;
	  }

	  s = s.slice(i + 1).trim();
	  if (s[0] !== GT) {
	    throw 'Expected \'>\' after between selector: ' + s;
	  }

	  b = b.map(parseSelector);

	  stream = parseSelector(s.slice(1).trim());
	  if (stream.between) {
	    return {
	      between: b,
	      stream: stream
	    };
	  } else {
	    stream.between = b;
	  }

	  return stream;
	}

	function parseStream(s) {
	  var stream = {source: DEFAULT_SOURCE},
	      source = [],
	      throttle = [0, 0],
	      markname = 0,
	      start = 0,
	      n = s.length,
	      i = 0, j,
	      filter;

	  // extract throttle from end
	  if (s[n-1] === RBRACE) {
	    i = s.lastIndexOf(LBRACE);
	    if (i >= 0) {
	      try {
	        throttle = parseThrottle(s.substring(i+1, n-1));
	      } catch (e) {
	        throw 'Invalid throttle specification: ' + s;
	      }
	      s = s.slice(0, i).trim();
	      n = s.length;
	    } else throw 'Unmatched right brace: ' + s;
	    i = 0;
	  }

	  if (!n) throw s;

	  // set name flag based on first char
	  if (s[0] === NAME) markname = ++i;

	  // extract first part of multi-part stream selector
	  j = find(s, i, COLON);
	  if (j < n) {
	    source.push(s.substring(start, j).trim());
	    start = i = ++j;
	  }

	  // extract remaining part of stream selector
	  i = find(s, i, LBRACK);
	  if (i === n) {
	    source.push(s.substring(start, n).trim());
	  } else {
	    source.push(s.substring(start, i).trim());
	    filter = [];
	    start = ++i;
	    if (start === n) throw 'Unmatched left bracket: ' + s;
	  }

	  // extract filters
	  while (i < n) {
	    i = find(s, i, RBRACK);
	    if (i === n) throw 'Unmatched left bracket: ' + s;
	    filter.push(s.substring(start, i).trim());
	    if (i < n-1 && s[++i] !== LBRACK) throw 'Expected left bracket: ' + s;
	    start = ++i;
	  }

	  // marshall event stream specification
	  if (!(n = source.length) || ILLEGAL.test(source[n-1])) {
	    throw 'Invalid event selector: ' + s;
	  }

	  if (n > 1) {
	    stream.type = source[1];
	    if (markname) {
	      stream.markname = source[0].slice(1);
	    } else if (isMarkType(source[0])) {
	      stream.marktype = source[0];
	    } else {
	      stream.source = source[0];
	    }
	  } else {
	    stream.type = source[0];
	  }
	  if (stream.type.slice(-1) === '!') {
	    stream.consume = true;
	    stream.type = stream.type.slice(0, -1);
	  }
	  if (filter != null) stream.filter = filter;
	  if (throttle[0]) stream.throttle = throttle[0];
	  if (throttle[1]) stream.debounce = throttle[1];

	  return stream;
	}

	function parseThrottle(s) {
	  var a = s.split(COMMA);
	  if (!s.length || a.length > 2) throw s;
	  return a.map(function(_) {
	    var x = +_;
	    if (x !== x) throw s;
	    return x;
	  });
	}



	var vegaEventSelector = /*#__PURE__*/Object.freeze({
		selector: eventSelector
	});

	var vega_schema = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function isSignalRef(o) {
	    return !!o['signal'];
	}
	exports.isSignalRef = isSignalRef;
	function isVgRangeStep(range) {
	    return !!range['step'];
	}
	exports.isVgRangeStep = isVgRangeStep;
	function isDataRefUnionedDomain(domain) {
	    if (!vega_util_1.isArray(domain)) {
	        return 'fields' in domain && !('data' in domain);
	    }
	    return false;
	}
	exports.isDataRefUnionedDomain = isDataRefUnionedDomain;
	function isFieldRefUnionDomain(domain) {
	    if (!vega_util_1.isArray(domain)) {
	        return 'fields' in domain && 'data' in domain;
	    }
	    return false;
	}
	exports.isFieldRefUnionDomain = isFieldRefUnionDomain;
	function isDataRefDomain(domain) {
	    if (!vega_util_1.isArray(domain)) {
	        return 'field' in domain && 'data' in domain;
	    }
	    return false;
	}
	exports.isDataRefDomain = isDataRefDomain;
	function isSignalRefDomain(domain) {
	    if (!vega_util_1.isArray(domain)) {
	        return 'signal' in domain;
	    }
	    return false;
	}
	exports.isSignalRefDomain = isSignalRefDomain;
	var VG_MARK_CONFIG_INDEX = {
	    opacity: 1,
	    fill: 1,
	    fillOpacity: 1,
	    stroke: 1,
	    strokeCap: 1,
	    strokeWidth: 1,
	    strokeOpacity: 1,
	    strokeDash: 1,
	    strokeDashOffset: 1,
	    strokeJoin: 1,
	    strokeMiterLimit: 1,
	    size: 1,
	    shape: 1,
	    interpolate: 1,
	    tension: 1,
	    orient: 1,
	    align: 1,
	    baseline: 1,
	    text: 1,
	    dir: 1,
	    dx: 1,
	    dy: 1,
	    ellipsis: 1,
	    limit: 1,
	    radius: 1,
	    theta: 1,
	    angle: 1,
	    font: 1,
	    fontSize: 1,
	    fontWeight: 1,
	    fontStyle: 1,
	    cursor: 1,
	    href: 1,
	    tooltip: 1,
	    cornerRadius: 1
	    // commented below are vg channel that do not have mark config.
	    // 'x'|'x2'|'xc'|'width'|'y'|'y2'|'yc'|'height'
	    // clip: 1,
	    // endAngle: 1,
	    // innerRadius: 1,
	    // outerRadius: 1,
	    // path: 1,
	    // startAngle: 1,
	    // url: 1,
	};
	exports.VG_MARK_CONFIGS = util.flagKeys(VG_MARK_CONFIG_INDEX);

	});

	unwrapExports(vega_schema);
	var vega_schema_1 = vega_schema.isSignalRef;
	var vega_schema_2 = vega_schema.isVgRangeStep;
	var vega_schema_3 = vega_schema.isDataRefUnionedDomain;
	var vega_schema_4 = vega_schema.isFieldRefUnionDomain;
	var vega_schema_5 = vega_schema.isDataRefDomain;
	var vega_schema_6 = vega_schema.isSignalRefDomain;
	var vega_schema_7 = vega_schema.VG_MARK_CONFIGS;

	var assemble = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	function assembleTitle(title, config) {
	    if (vega_util_1.isArray(title)) {
	        return title.map(function (fieldDef) { return fielddef.defaultTitle(fieldDef, config); }).join(', ');
	    }
	    return title;
	}
	function assembleAxis(axisCmpt, kind, config, opt) {
	    if (opt === void 0) { opt = { header: false }; }
	    var _a = axisCmpt.combine(), orient = _a.orient, scale = _a.scale, title = _a.title, zindex = _a.zindex, axis$$1 = tslib_1.__rest(_a, ["orient", "scale", "title", "zindex"]);
	    // Remove properties that are not valid for this kind of axis
	    util.keys(axis$$1).forEach(function (key) {
	        var propType = axis.AXIS_PROPERTY_TYPE[key];
	        if (propType && propType !== kind && propType !== 'both') {
	            delete axis$$1[key];
	        }
	    });
	    if (kind === 'grid') {
	        if (!axis$$1.grid) {
	            return undefined;
	        }
	        // Remove unnecessary encode block
	        if (axis$$1.encode) {
	            // Only need to keep encode block for grid
	            var grid = axis$$1.encode.grid;
	            axis$$1.encode = tslib_1.__assign({}, (grid ? { grid: grid } : {}));
	            if (util.keys(axis$$1.encode).length === 0) {
	                delete axis$$1.encode;
	            }
	        }
	        return tslib_1.__assign({ scale: scale,
	            orient: orient }, axis$$1, { domain: false, labels: false, 
	            // Always set min/maxExtent to 0 to ensure that `config.axis*.minExtent` and `config.axis*.maxExtent`
	            // would not affect gridAxis
	            maxExtent: 0, minExtent: 0, ticks: false, zindex: util.getFirstDefined(zindex, 0) // put grid behind marks by default
	         });
	    }
	    else {
	        // kind === 'main'
	        if (!opt.header && axisCmpt.mainExtracted) {
	            // if mainExtracted has been extracted to a separate facet
	            return undefined;
	        }
	        // Remove unnecessary encode block
	        if (axis$$1.encode) {
	            for (var _i = 0, AXIS_PARTS_1 = axis.AXIS_PARTS; _i < AXIS_PARTS_1.length; _i++) {
	                var part = AXIS_PARTS_1[_i];
	                if (!axisCmpt.hasAxisPart(part)) {
	                    delete axis$$1.encode[part];
	                }
	            }
	            if (util.keys(axis$$1.encode).length === 0) {
	                delete axis$$1.encode;
	            }
	        }
	        var titleString = assembleTitle(title, config);
	        return tslib_1.__assign({ scale: scale,
	            orient: orient, grid: false }, (titleString ? { title: titleString } : {}), axis$$1, { zindex: util.getFirstDefined(zindex, 1) // put axis line above marks by default
	         });
	    }
	}
	exports.assembleAxis = assembleAxis;
	function assembleAxes(axisComponents, config) {
	    var _a = axisComponents.x, x = _a === void 0 ? [] : _a, _b = axisComponents.y, y = _b === void 0 ? [] : _b;
	    return x.map(function (a) { return assembleAxis(a, 'main', config); }).concat(x.map(function (a) { return assembleAxis(a, 'grid', config); }), y.map(function (a) { return assembleAxis(a, 'main', config); }), y.map(function (a) { return assembleAxis(a, 'grid', config); })).filter(function (a) { return a; }); // filter undefined
	}
	exports.assembleAxes = assembleAxes;

	});

	unwrapExports(assemble);
	var assemble_1 = assemble.assembleAxis;
	var assemble_2 = assemble.assembleAxes;

	var header = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HEADER_TITLE_PROPERTIES_MAP = {
	    titleAnchor: 'anchor',
	    titleAngle: 'angle',
	    titleBaseline: 'baseline',
	    titleColor: 'color',
	    titleFont: 'font',
	    titleFontSize: 'fontSize',
	    titleFontWeight: 'fontWeight',
	    titleLimit: 'limit',
	    titlePadding: 'offset'
	};
	exports.HEADER_LABEL_PROPERTIES_MAP = {
	    labelAngle: 'angle',
	    labelColor: 'color',
	    labelFont: 'font',
	    labelFontSize: 'fontSize',
	    labelLimit: 'limit',
	    labelPadding: 'offset'
	};
	exports.HEADER_TITLE_PROPERTIES = Object.keys(exports.HEADER_TITLE_PROPERTIES_MAP);
	exports.HEADER_LABEL_PROPERTIES = Object.keys(exports.HEADER_LABEL_PROPERTIES_MAP);

	});

	unwrapExports(header);
	var header_1 = header.HEADER_TITLE_PROPERTIES_MAP;
	var header_2 = header.HEADER_LABEL_PROPERTIES_MAP;
	var header_3 = header.HEADER_TITLE_PROPERTIES;
	var header_4 = header.HEADER_LABEL_PROPERTIES;

	var sort = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function isSortField(sort) {
	    return !!sort && (sort['op'] === 'count' || !!sort['field']) && !!sort['op'];
	}
	exports.isSortField = isSortField;
	function isSortArray(sort) {
	    return !!sort && vega_util_1.isArray(sort);
	}
	exports.isSortArray = isSortArray;

	});

	unwrapExports(sort);
	var sort_1 = sort.isSortField;
	var sort_2 = sort.isSortArray;

	var valueref = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var log = tslib_1.__importStar(log$2);




	// TODO: we need to find a way to refactor these so that scaleName is a part of scale
	// but that's complicated.  For now, this is a huge step moving forward.
	/**
	 * @return Vega ValueRef for normal x- or y-position without projection
	 */
	function position(channel$$1, channelDef, channel2Def, scaleName, scale$$1, stack, defaultRef) {
	    if (fielddef.isFieldDef(channelDef) && stack && channel$$1 === stack.fieldChannel) {
	        // x or y use stack_end so that stacked line's point mark use stack_end too.
	        return fieldRef(channelDef, scaleName, { suffix: 'end' });
	    }
	    return midPoint(channel$$1, channelDef, channel2Def, scaleName, scale$$1, stack, defaultRef);
	}
	exports.position = position;
	/**
	 * @return Vega ValueRef for normal x2- or y2-position without projection
	 */
	function position2(channel$$1, aFieldDef, a2fieldDef, scaleName, scale$$1, stack, defaultRef) {
	    if (fielddef.isFieldDef(aFieldDef) &&
	        stack &&
	        // If fieldChannel is X and channel is X2 (or Y and Y2)
	        channel$$1.charAt(0) === stack.fieldChannel.charAt(0)) {
	        return fieldRef(aFieldDef, scaleName, { suffix: 'start' });
	    }
	    return midPoint(channel$$1, a2fieldDef, undefined, scaleName, scale$$1, stack, defaultRef);
	}
	exports.position2 = position2;
	function getOffset(channel$$1, markDef) {
	    var offsetChannel = channel$$1 + 'Offset';
	    // TODO: in the future read from encoding channel too
	    var markDefOffsetValue = markDef[offsetChannel];
	    if (markDefOffsetValue) {
	        return markDefOffsetValue;
	    }
	    return undefined;
	}
	exports.getOffset = getOffset;
	/**
	 * Value Ref for binned fields
	 */
	function bin$$1(fieldDef, scaleName, side, offset) {
	    var binSuffix = side === 'start' ? undefined : 'end';
	    return fieldRef(fieldDef, scaleName, { binSuffix: binSuffix }, offset ? { offset: offset } : {});
	}
	exports.bin = bin$$1;
	function fieldRef(fieldDef, scaleName, opt, mixins) {
	    var ref = tslib_1.__assign({}, (scaleName ? { scale: scaleName } : {}), { field: fielddef.vgField(fieldDef, opt) });
	    if (mixins) {
	        return tslib_1.__assign({}, ref, mixins);
	    }
	    return ref;
	}
	exports.fieldRef = fieldRef;
	function bandRef(scaleName, band) {
	    if (band === void 0) { band = true; }
	    return {
	        scale: scaleName,
	        band: band
	    };
	}
	exports.bandRef = bandRef;
	/**
	 * Signal that returns the middle of a bin from start and end field. Should only be used with x and y.
	 */
	function binMidSignal(scaleName, fieldDef, fieldDef2) {
	    var start = fielddef.vgField(fieldDef, { expr: 'datum' });
	    var end = fieldDef2 !== undefined
	        ? fielddef.vgField(fieldDef2, { expr: 'datum' })
	        : fielddef.vgField(fieldDef, { binSuffix: 'end', expr: 'datum' });
	    return {
	        signal: "scale(\"" + scaleName + "\", (" + start + " + " + end + ") / 2)"
	    };
	}
	/**
	 * @returns {VgValueRef} Value Ref for xc / yc or mid point for other channels.
	 */
	function midPoint(channel$$1, channelDef, channel2Def, scaleName, scale$$1, stack, defaultRef) {
	    // TODO: datum support
	    if (channelDef) {
	        /* istanbul ignore else */
	        if (fielddef.isFieldDef(channelDef)) {
	            if (bin.isBinning(channelDef.bin)) {
	                // Use middle only for x an y to place marks in the center between start and end of the bin range.
	                // We do not use the mid point for other channels (e.g. size) so that properties of legends and marks match.
	                if (util.contains([channel.X, channel.Y], channel$$1) && channelDef.type === type.QUANTITATIVE) {
	                    if (stack && stack.impute) {
	                        // For stack, we computed bin_mid so we can impute.
	                        return fieldRef(channelDef, scaleName, { binSuffix: 'mid' });
	                    }
	                    // For non-stack, we can just calculate bin mid on the fly using signal.
	                    return binMidSignal(scaleName, channelDef);
	                }
	                return fieldRef(channelDef, scaleName, common$2.binRequiresRange(channelDef, channel$$1) ? { binSuffix: 'range' } : {});
	            }
	            else if (bin.isBinned(channelDef.bin)) {
	                if (fielddef.isFieldDef(channel2Def)) {
	                    return binMidSignal(scaleName, channelDef, channel2Def);
	                }
	                else {
	                    log.warn(log.message.channelRequiredForBinned(channel$$1));
	                }
	            }
	            if (scale$$1) {
	                var scaleType = scale$$1.get('type');
	                if (scale.hasDiscreteDomain(scaleType)) {
	                    if (scaleType === 'band') {
	                        // For band, to get mid point, need to offset by half of the band
	                        return fieldRef(channelDef, scaleName, { binSuffix: 'range' }, { band: 0.5 });
	                    }
	                    return fieldRef(channelDef, scaleName, { binSuffix: 'range' });
	                }
	            }
	            return fieldRef(channelDef, scaleName, {}); // no need for bin suffix
	        }
	        else if (fielddef.isValueDef(channelDef)) {
	            var value = channelDef.value;
	            if (util.contains(['x', 'x2'], channel$$1) && value === 'width') {
	                return { field: { group: 'width' } };
	            }
	            else if (util.contains(['y', 'y2'], channel$$1) && value === 'height') {
	                return { field: { group: 'height' } };
	            }
	            return { value: value };
	        }
	        // If channelDef is neither field def or value def, it's a condition-only def.
	        // In such case, we will use default ref.
	    }
	    return vega_util_1.isFunction(defaultRef) ? defaultRef() : defaultRef;
	}
	exports.midPoint = midPoint;
	function tooltipForChannelDefs(channelDefs, config) {
	    var keyValues = [];
	    var usedKey = {};
	    for (var _i = 0, channelDefs_1 = channelDefs; _i < channelDefs_1.length; _i++) {
	        var fieldDef = channelDefs_1[_i];
	        var key = fielddef.title(fieldDef, config, { allowDisabling: false });
	        var value = text(fieldDef, config).signal;
	        if (!usedKey[key]) {
	            keyValues.push("\"" + key + "\": " + value);
	        }
	        usedKey[key] = true;
	    }
	    return keyValues.length ? { signal: "{" + keyValues.join(', ') + "}" } : undefined;
	}
	exports.tooltipForChannelDefs = tooltipForChannelDefs;
	function text(channelDef, config) {
	    // text
	    if (channelDef) {
	        if (fielddef.isValueDef(channelDef)) {
	            return { value: channelDef.value };
	        }
	        if (fielddef.isFieldDef(channelDef)) {
	            return common$2.formatSignalRef(channelDef, fielddef.format(channelDef), 'datum', config);
	        }
	    }
	    return undefined;
	}
	exports.text = text;
	function mid(sizeRef) {
	    return tslib_1.__assign({}, sizeRef, { mult: 0.5 });
	}
	exports.mid = mid;
	/**
	 * Whether the scale definitely includes zero in the domain
	 */
	function domainDefinitelyIncludeZero(scale$$1) {
	    if (scale$$1.get('zero') !== false) {
	        return true;
	    }
	    var domains = scale$$1.domains;
	    if (vega_util_1.isArray(domains)) {
	        return util.some(domains, function (d) { return vega_util_1.isArray(d) && d.length === 2 && d[0] <= 0 && d[1] >= 0; });
	    }
	    return false;
	}
	function getDefaultRef(defaultRef, channel$$1, scaleName, scale$$1, mark) {
	    return function () {
	        if (vega_util_1.isString(defaultRef)) {
	            if (scaleName) {
	                var scaleType = scale$$1.get('type');
	                if (util.contains([scale.ScaleType.LOG, scale.ScaleType.TIME, scale.ScaleType.UTC], scaleType)) {
	                    // Log scales cannot have zero.
	                    // Zero in time scale is arbitrary, and does not affect ratio.
	                    // (Time is an interval level of measurement, not ratio).
	                    // See https://en.wikipedia.org/wiki/Level_of_measurement for more info.
	                    if (mark === 'bar' || mark === 'area') {
	                        log.warn(log.message.nonZeroScaleUsedWithLengthMark(mark, channel$$1, { scaleType: scaleType }));
	                    }
	                }
	                else {
	                    if (domainDefinitelyIncludeZero(scale$$1)) {
	                        return {
	                            scale: scaleName,
	                            value: 0
	                        };
	                    }
	                    if (mark === 'bar' || mark === 'area') {
	                        log.warn(log.message.nonZeroScaleUsedWithLengthMark(mark, channel$$1, { zeroFalse: scale$$1.explicit.zero === false }));
	                    }
	                }
	            }
	            if (defaultRef === 'zeroOrMin') {
	                return channel$$1 === 'x' ? { value: 0 } : { field: { group: 'height' } };
	            }
	            else {
	                // zeroOrMax
	                return channel$$1 === 'x' ? { field: { group: 'width' } } : { value: 0 };
	            }
	        }
	        return defaultRef;
	    };
	}
	exports.getDefaultRef = getDefaultRef;

	});

	unwrapExports(valueref);
	var valueref_1 = valueref.position;
	var valueref_2 = valueref.position2;
	var valueref_3 = valueref.getOffset;
	var valueref_4 = valueref.bin;
	var valueref_5 = valueref.fieldRef;
	var valueref_6 = valueref.bandRef;
	var valueref_7 = valueref.midPoint;
	var valueref_8 = valueref.tooltipForChannelDefs;
	var valueref_9 = valueref.text;
	var valueref_10 = valueref.mid;
	var valueref_11 = valueref.getDefaultRef;

	var mixins = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var log = tslib_1.__importStar(log$2);







	var ref = tslib_1.__importStar(valueref);
	function color(model) {
	    var _a, _b;
	    var markDef = model.markDef, encoding$$1 = model.encoding, config = model.config;
	    var filled = markDef.filled, markType = markDef.type;
	    var configValue = {
	        fill: common$2.getMarkConfig('fill', markDef, config),
	        stroke: common$2.getMarkConfig('stroke', markDef, config),
	        color: common$2.getMarkConfig('color', markDef, config)
	    };
	    var transparentIfNeeded = util.contains(['bar', 'point', 'circle', 'square', 'geoshape'], markType)
	        ? 'transparent'
	        : undefined;
	    var defaultValue = {
	        fill: util.getFirstDefined(markDef.fill, configValue.fill, 
	        // If there is no fill, always fill symbols, bar, geoshape
	        // with transparent fills https://github.com/vega/vega-lite/issues/1316
	        transparentIfNeeded),
	        stroke: util.getFirstDefined(markDef.stroke, configValue.stroke)
	    };
	    var colorVgChannel = filled ? 'fill' : 'stroke';
	    var fillStrokeMarkDefAndConfig = tslib_1.__assign({}, (defaultValue.fill
	        ? {
	            fill: { value: defaultValue.fill }
	        }
	        : {}), (defaultValue.stroke
	        ? {
	            stroke: { value: defaultValue.stroke }
	        }
	        : {}));
	    if (encoding$$1.fill || encoding$$1.stroke) {
	        // ignore encoding.color, markDef.color, config.color
	        if (markDef.color) {
	            // warn for markDef.color  (no need to warn encoding.color as it will be dropped in normalized already)
	            log.warn(log.message.droppingColor('property', { fill: 'fill' in encoding$$1, stroke: 'stroke' in encoding$$1 }));
	        }
	        return tslib_1.__assign({}, nonPosition('fill', model, { defaultValue: util.getFirstDefined(defaultValue.fill, transparentIfNeeded) }), nonPosition('stroke', model, { defaultValue: defaultValue.stroke }));
	    }
	    else if (encoding$$1.color) {
	        return tslib_1.__assign({}, fillStrokeMarkDefAndConfig, nonPosition('color', model, {
	            vgChannel: colorVgChannel,
	            // apply default fill/stroke first, then color config, then transparent if needed.
	            defaultValue: util.getFirstDefined(markDef[colorVgChannel], markDef.color, configValue[colorVgChannel], configValue.color, filled ? transparentIfNeeded : undefined)
	        }));
	    }
	    else if (markDef.fill !== undefined || markDef.stroke !== undefined) {
	        // Ignore markDef.color, config.color
	        if (markDef.color) {
	            log.warn(log.message.droppingColor('property', { fill: 'fill' in markDef, stroke: 'stroke' in markDef }));
	        }
	        return fillStrokeMarkDefAndConfig;
	    }
	    else if (markDef.color) {
	        return tslib_1.__assign({}, fillStrokeMarkDefAndConfig, (_a = {}, _a[colorVgChannel] = { value: markDef.color }, _a));
	    }
	    else if (configValue.fill !== undefined || configValue.stroke !== undefined) {
	        // ignore config.color
	        return fillStrokeMarkDefAndConfig;
	    }
	    else if (configValue.color) {
	        return tslib_1.__assign({}, (transparentIfNeeded ? { fill: { value: 'transparent' } } : {}), (_b = {}, _b[colorVgChannel] = { value: configValue.color }, _b));
	    }
	    return {};
	}
	exports.color = color;
	function baseEncodeEntry(model, ignore) {
	    var _a = color(model), fill = _a.fill, stroke = _a.stroke;
	    return tslib_1.__assign({}, markDefProperties(model.markDef, ignore), wrapInvalid(model, 'fill', fill), wrapInvalid(model, 'stroke', stroke), nonPosition('opacity', model), tooltip(model), text(model, 'href'));
	}
	exports.baseEncodeEntry = baseEncodeEntry;
	function wrapInvalid(model, channel$$1, valueRef) {
	    var _a, _b;
	    var config = model.config, mark$$1 = model.mark;
	    if (config.invalidValues && valueRef && !mark.isPathMark(mark$$1)) {
	        // For non-path marks, we have to exclude invalid values (null and NaN) for scales with continuous domains.
	        // For path marks, we will use "defined" property and skip these values instead.
	        var test_1 = validPredicate(model, { invalid: true, channels: channel.SCALE_CHANNELS });
	        if (test_1) {
	            return _a = {},
	                _a[channel$$1] = [
	                    // prepend the invalid case
	                    // TODO: support custom value
	                    { test: test_1, value: null }
	                ].concat(vega_util_1.array(valueRef)),
	                _a;
	        }
	    }
	    return valueRef ? (_b = {}, _b[channel$$1] = valueRef, _b) : {};
	}
	function markDefProperties(mark$$1, ignore) {
	    return vega_schema.VG_MARK_CONFIGS.reduce(function (m, prop) {
	        if (mark$$1[prop] !== undefined && ignore[prop] !== 'ignore') {
	            m[prop] = { value: mark$$1[prop] };
	        }
	        return m;
	    }, {});
	}
	function valueIfDefined(prop, value) {
	    var _a;
	    if (value !== undefined) {
	        return _a = {}, _a[prop] = { value: value }, _a;
	    }
	    return undefined;
	}
	exports.valueIfDefined = valueIfDefined;
	function validPredicate(model, _a) {
	    var _b = _a.invalid, invalid = _b === void 0 ? false : _b, channels = _a.channels;
	    var filterIndex = channels.reduce(function (aggregator, channel$$1) {
	        var scaleComponent = model.getScaleComponent(channel$$1);
	        if (scaleComponent) {
	            var scaleType = scaleComponent.get('type');
	            var field = model.vgField(channel$$1, { expr: 'datum' });
	            // While discrete domain scales can handle invalid values, continuous scales can't.
	            if (field && scale.hasContinuousDomain(scaleType)) {
	                aggregator[field] = true;
	            }
	        }
	        return aggregator;
	    }, {});
	    var fields = util.keys(filterIndex);
	    if (fields.length > 0) {
	        var op_1 = invalid ? '||' : '&&';
	        return fields
	            .map(function (field) {
	            var eq = invalid ? '===' : '!==';
	            return field + " " + eq + " null " + op_1 + " " + (invalid ? '' : '!') + "isNaN(" + field + ")";
	        })
	            .join(" " + op_1 + " ");
	    }
	    return undefined;
	}
	function defined(model) {
	    if (model.config.invalidValues === 'filter') {
	        var signal = validPredicate(model, { channels: ['x', 'y'] });
	        if (signal) {
	            return { defined: { signal: signal } };
	        }
	    }
	    return {};
	}
	exports.defined = defined;
	/**
	 * Return mixins for non-positional channels with scales.  (Text doesn't have scale.)
	 */
	function nonPosition(channel$$1, model, opt) {
	    if (opt === void 0) { opt = {}; }
	    var defaultValue = opt.defaultValue, vgChannel = opt.vgChannel;
	    var defaultRef = opt.defaultRef || (defaultValue !== undefined ? { value: defaultValue } : undefined);
	    var channelDef = model.encoding[channel$$1];
	    return wrapCondition(model, channelDef, vgChannel || channel$$1, function (cDef) {
	        return ref.midPoint(channel$$1, cDef, undefined, model.scaleName(channel$$1), model.getScaleComponent(channel$$1), null, // No need to provide stack for non-position as it does not affect mid point
	        defaultRef);
	    });
	}
	exports.nonPosition = nonPosition;
	/**
	 * Return a mixin that include a Vega production rule for a Vega-Lite conditional channel definition.
	 * or a simple mixin if channel def has no condition.
	 */
	function wrapCondition(model, channelDef, vgChannel, refFn) {
	    var _a, _b;
	    var condition = channelDef && channelDef.condition;
	    var valueRef = refFn(channelDef);
	    if (condition) {
	        var conditions = vega_util_1.isArray(condition) ? condition : [condition];
	        var vgConditions = conditions.map(function (c) {
	            var conditionValueRef = refFn(c);
	            var test = fielddef.isConditionalSelection(c) ? selection$2.selectionPredicate(model, c.selection) : predicate.expression(model, c.test);
	            return tslib_1.__assign({ test: test }, conditionValueRef);
	        });
	        return _a = {},
	            _a[vgChannel] = vgConditions.concat((valueRef !== undefined ? [valueRef] : [])),
	            _a;
	    }
	    else {
	        return valueRef !== undefined ? (_b = {}, _b[vgChannel] = valueRef, _b) : {};
	    }
	}
	exports.wrapCondition = wrapCondition;
	function tooltip(model) {
	    var encoding$$1 = model.encoding, markDef = model.markDef, config = model.config;
	    var channelDef = encoding$$1.tooltip;
	    if (vega_util_1.isArray(channelDef)) {
	        return { tooltip: ref.tooltipForChannelDefs(channelDef, config) };
	    }
	    else {
	        return wrapCondition(model, channelDef, 'tooltip', function (cDef) {
	            // use valueRef based on channelDef first
	            var tooltipRefFromChannelDef = ref.text(cDef, model.config);
	            if (tooltipRefFromChannelDef) {
	                return tooltipRefFromChannelDef;
	            }
	            // If tooltipDef does not exist, then use value from markDef or config
	            var markTooltip = util.getFirstDefined(markDef.tooltip, common$2.getMarkConfig('tooltip', markDef, config));
	            if (vega_util_1.isString(markTooltip)) {
	                return { value: markTooltip };
	            }
	            else if (vega_util_1.isObject(markTooltip)) {
	                // `tooltip` is `{fields: 'encodings' | 'fields'}`
	                if (markTooltip.content === 'encoding') {
	                    return ref.tooltipForChannelDefs(encoding.fieldDefs(encoding$$1), config);
	                }
	                else {
	                    return { signal: 'datum' };
	                }
	            }
	            return undefined;
	        });
	    }
	}
	exports.tooltip = tooltip;
	function text(model, channel$$1) {
	    if (channel$$1 === void 0) { channel$$1 = 'text'; }
	    var channelDef = model.encoding[channel$$1];
	    return wrapCondition(model, channelDef, channel$$1, function (cDef) { return ref.text(cDef, model.config); });
	}
	exports.text = text;
	function bandPosition(fieldDef, channel$$1, model) {
	    var _a, _b, _c;
	    var scaleName = model.scaleName(channel$$1);
	    var sizeChannel = channel$$1 === 'x' ? 'width' : 'height';
	    if (model.encoding.size || model.markDef.size !== undefined) {
	        var orient = model.markDef.orient;
	        if (orient) {
	            var centeredBandPositionMixins = (_a = {},
	                // Use xc/yc and place the mark at the middle of the band
	                // This way we never have to deal with size's condition for x/y position.
	                _a[channel$$1 + 'c'] = ref.fieldRef(fieldDef, scaleName, {}, { band: 0.5 }),
	                _a);
	            if (fielddef.getFieldDef(model.encoding.size)) {
	                return tslib_1.__assign({}, centeredBandPositionMixins, nonPosition('size', model, { vgChannel: sizeChannel }));
	            }
	            else if (fielddef.isValueDef(model.encoding.size)) {
	                return tslib_1.__assign({}, centeredBandPositionMixins, nonPosition('size', model, { vgChannel: sizeChannel }));
	            }
	            else if (model.markDef.size !== undefined) {
	                return tslib_1.__assign({}, centeredBandPositionMixins, (_b = {}, _b[sizeChannel] = { value: model.markDef.size }, _b));
	            }
	        }
	        else {
	            log.warn(log.message.cannotApplySizeToNonOrientedMark(model.markDef.type));
	        }
	    }
	    return _c = {},
	        _c[channel$$1] = ref.fieldRef(fieldDef, scaleName, { binSuffix: 'range' }),
	        _c[sizeChannel] = ref.bandRef(scaleName),
	        _c;
	}
	exports.bandPosition = bandPosition;
	function centeredBandPosition(channel$$1, model, defaultPosRef, defaultSizeRef) {
	    var centerChannel = channel$$1 === 'x' ? 'xc' : 'yc';
	    var sizeChannel = channel$$1 === 'x' ? 'width' : 'height';
	    return tslib_1.__assign({}, pointPosition(channel$$1, model, defaultPosRef, centerChannel), nonPosition('size', model, { defaultRef: defaultSizeRef, vgChannel: sizeChannel }));
	}
	exports.centeredBandPosition = centeredBandPosition;
	function binPosition(fieldDef, fieldDef2, channel$$1, scaleName, spacing, reverse) {
	    var _a, _b;
	    var binSpacing = {
	        x: reverse ? spacing : 0,
	        x2: reverse ? 0 : spacing,
	        y: reverse ? 0 : spacing,
	        y2: reverse ? spacing : 0
	    };
	    var channel2 = channel$$1 === channel.X ? channel.X2 : channel.Y2;
	    if (bin.isBinning(fieldDef.bin)) {
	        return _a = {},
	            _a[channel2] = ref.bin(fieldDef, scaleName, 'start', binSpacing[channel$$1 + "2"]),
	            _a[channel$$1] = ref.bin(fieldDef, scaleName, 'end', binSpacing[channel$$1]),
	            _a;
	    }
	    else if (bin.isBinned(fieldDef.bin) && fielddef.isFieldDef(fieldDef2)) {
	        return _b = {},
	            _b[channel2] = ref.fieldRef(fieldDef, scaleName, {}, { offset: binSpacing[channel$$1 + "2"] }),
	            _b[channel$$1] = ref.fieldRef(fieldDef2, scaleName, {}, { offset: binSpacing[channel$$1] }),
	            _b;
	    }
	    else {
	        log.warn(log.message.channelRequiredForBinned(channel2));
	        return undefined;
	    }
	}
	exports.binPosition = binPosition;
	/**
	 * Return mixins for point (non-band) position channels.
	 */
	function pointPosition(channel$$1, model, defaultRef, vgChannel) {
	    // TODO: refactor how refer to scale as discussed in https://github.com/vega/vega-lite/pull/1613
	    var _a;
	    var encoding$$1 = model.encoding, mark$$1 = model.mark, stack = model.stack;
	    var channelDef = encoding$$1[channel$$1];
	    var channel2Def = encoding$$1[channel$$1 === channel.X ? channel.X2 : channel.Y2];
	    var scaleName = model.scaleName(channel$$1);
	    var scale$$1 = model.getScaleComponent(channel$$1);
	    var offset = ref.getOffset(channel$$1, model.markDef);
	    var valueRef = !channelDef && (encoding$$1.latitude || encoding$$1.longitude)
	        ? // use geopoint output if there are lat/long and there is no point position overriding lat/long.
	            { field: model.getName(channel$$1) }
	        : tslib_1.__assign({}, ref.position(channel$$1, channelDef, channel2Def, scaleName, scale$$1, stack, ref.getDefaultRef(defaultRef, channel$$1, scaleName, scale$$1, mark$$1)), (offset ? { offset: offset } : {}));
	    return _a = {},
	        _a[vgChannel || channel$$1] = valueRef,
	        _a;
	}
	exports.pointPosition = pointPosition;
	/**
	 * Return mixins for x2, y2.
	 * If channel is not specified, return one channel based on orientation.
	 */
	function pointPosition2(model, defaultRef, channel$$1) {
	    var _a;
	    var encoding$$1 = model.encoding, mark$$1 = model.mark, stack = model.stack;
	    var baseChannel = channel$$1 === 'x2' ? 'x' : 'y';
	    var channelDef = encoding$$1[baseChannel];
	    var scaleName = model.scaleName(baseChannel);
	    var scale$$1 = model.getScaleComponent(baseChannel);
	    var offset = ref.getOffset(channel$$1, model.markDef);
	    var valueRef = !channelDef && (encoding$$1.latitude || encoding$$1.longitude)
	        ? // use geopoint output if there are lat2/long2 and there is no point position2 overriding lat2/long2.
	            { field: model.getName(channel$$1) }
	        : tslib_1.__assign({}, ref.position2(channel$$1, channelDef, encoding$$1[channel$$1], scaleName, scale$$1, stack, ref.getDefaultRef(defaultRef, baseChannel, scaleName, scale$$1, mark$$1)), (offset ? { offset: offset } : {}));
	    return _a = {}, _a[channel$$1] = valueRef, _a;
	}
	exports.pointPosition2 = pointPosition2;

	});

	unwrapExports(mixins);
	var mixins_1 = mixins.color;
	var mixins_2 = mixins.baseEncodeEntry;
	var mixins_3 = mixins.valueIfDefined;
	var mixins_4 = mixins.defined;
	var mixins_5 = mixins.nonPosition;
	var mixins_6 = mixins.wrapCondition;
	var mixins_7 = mixins.tooltip;
	var mixins_8 = mixins.text;
	var mixins_9 = mixins.bandPosition;
	var mixins_10 = mixins.centeredBandPosition;
	var mixins_11 = mixins.binPosition;
	var mixins_12 = mixins.pointPosition;
	var mixins_13 = mixins.pointPosition2;

	var common$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });










	function applyConfig(e, config, // TODO(#1842): consolidate MarkConfig | TextConfig?
	propsList) {
	    for (var _i = 0, propsList_1 = propsList; _i < propsList_1.length; _i++) {
	        var property = propsList_1[_i];
	        var value = config[property];
	        if (value !== undefined) {
	            e[property] = { value: value };
	        }
	    }
	    return e;
	}
	exports.applyConfig = applyConfig;
	function applyMarkConfig(e, model, propsList) {
	    for (var _i = 0, propsList_2 = propsList; _i < propsList_2.length; _i++) {
	        var property = propsList_2[_i];
	        var value = getMarkConfig(property, model.markDef, model.config);
	        if (value !== undefined) {
	            e[property] = { value: value };
	        }
	    }
	    return e;
	}
	exports.applyMarkConfig = applyMarkConfig;
	function getStyles(mark) {
	    return [].concat(mark.type, mark.style || []);
	}
	exports.getStyles = getStyles;
	/**
	 * Return property value from style or mark specific config property if exists.
	 * Otherwise, return general mark specific config.
	 */
	function getMarkConfig(prop, mark, config, _a) {
	    var _b = (_a === void 0 ? {} : _a).skipGeneralMarkConfig, skipGeneralMarkConfig = _b === void 0 ? false : _b;
	    return util.getFirstDefined(
	    // style config has highest precedence
	    getStyleConfig(prop, mark, config.style), 
	    // then mark-specific config
	    config[mark.type][prop], 
	    // then general mark config (if not skipped)
	    skipGeneralMarkConfig ? undefined : config.mark[prop]);
	}
	exports.getMarkConfig = getMarkConfig;
	function getStyleConfig(prop, mark, styleConfigIndex) {
	    var styles = getStyles(mark);
	    var value;
	    for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
	        var style = styles_1[_i];
	        var styleConfig = styleConfigIndex[style];
	        // MarkConfig extends VgMarkConfig so a prop may not be a valid property for style
	        // However here we also check if it is defined, so it is okay to cast here
	        var p = prop;
	        if (styleConfig && styleConfig[p] !== undefined) {
	            value = styleConfig[p];
	        }
	    }
	    return value;
	}
	exports.getStyleConfig = getStyleConfig;
	function formatSignalRef(fieldDef, specifiedFormat, expr, config) {
	    var format = numberFormat(fieldDef, specifiedFormat, config);
	    if (bin.isBinning(fieldDef.bin)) {
	        var startField = fielddef.vgField(fieldDef, { expr: expr });
	        var endField = fielddef.vgField(fieldDef, { expr: expr, binSuffix: 'end' });
	        return {
	            signal: binFormatExpression(startField, endField, format, config)
	        };
	    }
	    else if (fieldDef.type === 'quantitative') {
	        return {
	            signal: "" + formatExpr(fielddef.vgField(fieldDef, { expr: expr, binSuffix: 'range' }), format)
	        };
	    }
	    else if (fielddef.isTimeFieldDef(fieldDef)) {
	        var isUTCScale = fielddef.isScaleFieldDef(fieldDef) && fieldDef['scale'] && fieldDef['scale'].type === scale.ScaleType.UTC;
	        return {
	            signal: timeFormatExpression(fielddef.vgField(fieldDef, { expr: expr }), fieldDef.timeUnit, specifiedFormat, config.text.shortTimeLabels, config.timeFormat, isUTCScale, true)
	        };
	    }
	    else {
	        return {
	            signal: "''+" + fielddef.vgField(fieldDef, { expr: expr })
	        };
	    }
	}
	exports.formatSignalRef = formatSignalRef;
	/**
	 * Returns number format for a fieldDef
	 *
	 * @param format explicitly specified format
	 */
	function numberFormat(fieldDef, specifiedFormat, config) {
	    if (fieldDef.type === type.QUANTITATIVE) {
	        // add number format for quantitative type only
	        // Specified format in axis/legend has higher precedence than fieldDef.format
	        if (specifiedFormat) {
	            return specifiedFormat;
	        }
	        // TODO: need to make this work correctly for numeric ordinal / nominal type
	        return config.numberFormat;
	    }
	    return undefined;
	}
	exports.numberFormat = numberFormat;
	function formatExpr(field, format) {
	    return "format(" + field + ", \"" + (format || '') + "\")";
	}
	function numberFormatExpr(field, specifiedFormat, config) {
	    return formatExpr(field, specifiedFormat || config.numberFormat);
	}
	exports.numberFormatExpr = numberFormatExpr;
	function binFormatExpression(startField, endField, format, config) {
	    return startField + " === null || isNaN(" + startField + ") ? \"null\" : " + numberFormatExpr(startField, format, config) + " + \" - \" + " + numberFormatExpr(endField, format, config);
	}
	exports.binFormatExpression = binFormatExpression;
	/**
	 * Returns the time expression used for axis/legend labels or text mark for a temporal field
	 */
	function timeFormatExpression(field, timeUnit, format, shortTimeLabels, rawTimeFormat, // should be provided only for actual text and headers, not axis/legend labels
	isUTCScale, alwaysReturn) {
	    if (alwaysReturn === void 0) { alwaysReturn = false; }
	    if (!timeUnit || format) {
	        // If there is not time unit, or if user explicitly specify format for axis/legend/text.
	        format = format || rawTimeFormat; // only use provided timeFormat if there is no timeUnit.
	        if (format || alwaysReturn) {
	            return (isUTCScale ? 'utc' : 'time') + "Format(" + field + ", '" + format + "')";
	        }
	        else {
	            return undefined;
	        }
	    }
	    else {
	        return timeunit.formatExpression(timeUnit, field, shortTimeLabels, isUTCScale);
	    }
	}
	exports.timeFormatExpression = timeFormatExpression;
	/**
	 * Return Vega sort parameters (tuple of field and order).
	 */
	function sortParams(orderDef, fieldRefOption) {
	    return (vega_util_1.isArray(orderDef) ? orderDef : [orderDef]).reduce(function (s, orderChannelDef) {
	        s.field.push(fielddef.vgField(orderChannelDef, fieldRefOption));
	        s.order.push(orderChannelDef.sort || 'ascending');
	        return s;
	    }, { field: [], order: [] });
	}
	exports.sortParams = sortParams;
	function mergeTitleFieldDefs(f1, f2) {
	    var merged = f1.slice();
	    f2.forEach(function (fdToMerge) {
	        for (var _i = 0, merged_1 = merged; _i < merged_1.length; _i++) {
	            var fieldDef1 = merged_1[_i];
	            // If already exists, no need to append to merged array
	            if (util.stringify(fieldDef1) === util.stringify(fdToMerge)) {
	                return;
	            }
	        }
	        merged.push(fdToMerge);
	    });
	    return merged;
	}
	exports.mergeTitleFieldDefs = mergeTitleFieldDefs;
	function mergeTitle(title1, title2) {
	    return title1 === title2
	        ? title1 // if title is the same just use one of them
	        : title1 + ', ' + title2; // join title with comma if different
	}
	exports.mergeTitle = mergeTitle;
	function mergeTitleComponent(v1, v2) {
	    if (vega_util_1.isArray(v1.value) && vega_util_1.isArray(v2.value)) {
	        return {
	            explicit: v1.explicit,
	            value: mergeTitleFieldDefs(v1.value, v2.value)
	        };
	    }
	    else if (!vega_util_1.isArray(v1.value) && !vega_util_1.isArray(v2.value)) {
	        return {
	            explicit: v1.explicit,
	            value: mergeTitle(v1.value, v2.value)
	        };
	    }
	    /* istanbul ignore next: Condition should not happen -- only for warning in development. */
	    throw new Error('It should never reach here');
	}
	exports.mergeTitleComponent = mergeTitleComponent;
	/**
	 * Checks whether a fieldDef for a particular channel requires a computed bin range.
	 */
	function binRequiresRange(fieldDef, channel$$1) {
	    if (!bin.isBinning(fieldDef.bin)) {
	        console.warn('Only use this method with binned field defs');
	        return false;
	    }
	    // We need the range only when the user explicitly forces a binned field to be use discrete scale. In this case, bin range is used in axis and legend labels.
	    // We could check whether the axis or legend exists (not disabled) but that seems overkill.
	    return channel.isScaleChannel(channel$$1) && util.contains(['ordinal', 'nominal'], fieldDef.type);
	}
	exports.binRequiresRange = binRequiresRange;
	function guideEncodeEntry(encoding, model) {
	    return util.keys(encoding).reduce(function (encode, channel$$1) {
	        var valueDef = encoding[channel$$1];
	        return tslib_1.__assign({}, encode, mixins.wrapCondition(model, valueDef, channel$$1, function (x) { return ({ value: x.value }); }));
	    }, {});
	}
	exports.guideEncodeEntry = guideEncodeEntry;

	});

	unwrapExports(common$2);
	var common_1$1 = common$2.applyConfig;
	var common_2$1 = common$2.applyMarkConfig;
	var common_3$1 = common$2.getStyles;
	var common_4$1 = common$2.getMarkConfig;
	var common_5$1 = common$2.getStyleConfig;
	var common_6 = common$2.formatSignalRef;
	var common_7 = common$2.numberFormat;
	var common_8 = common$2.numberFormatExpr;
	var common_9 = common$2.binFormatExpression;
	var common_10 = common$2.timeFormatExpression;
	var common_11 = common$2.sortParams;
	var common_12 = common$2.mergeTitleFieldDefs;
	var common_13 = common$2.mergeTitle;
	var common_14 = common$2.mergeTitleComponent;
	var common_15 = common$2.binRequiresRange;
	var common_16 = common$2.guideEncodeEntry;

	var dataflow = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * A node in the dataflow tree.
	 */
	var DataFlowNode = /** @class */ (function () {
	    function DataFlowNode(parent, debugName) {
	        this.debugName = debugName;
	        this._children = [];
	        this._parent = null;
	        if (parent) {
	            this.parent = parent;
	        }
	    }
	    /**
	     * Clone this node with a deep copy but don't clone links to children or parents.
	     */
	    DataFlowNode.prototype.clone = function () {
	        throw new Error('Cannot clone node');
	    };
	    /**
	     * Set of fields that are being created by this node.
	     */
	    DataFlowNode.prototype.producedFields = function () {
	        return {};
	    };
	    DataFlowNode.prototype.dependentFields = function () {
	        return {};
	    };
	    Object.defineProperty(DataFlowNode.prototype, "parent", {
	        get: function () {
	            return this._parent;
	        },
	        /**
	         * Set the parent of the node and also add this not to the parent's children.
	         */
	        set: function (parent) {
	            this._parent = parent;
	            parent.addChild(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataFlowNode.prototype, "children", {
	        get: function () {
	            return this._children;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DataFlowNode.prototype.numChildren = function () {
	        return this._children.length;
	    };
	    DataFlowNode.prototype.addChild = function (child, loc) {
	        if (loc !== undefined) {
	            this._children.splice(loc, 0, child);
	        }
	        else {
	            this._children.push(child);
	        }
	    };
	    DataFlowNode.prototype.removeChild = function (oldChild) {
	        var loc = this._children.indexOf(oldChild);
	        this._children.splice(loc, 1);
	        return loc;
	    };
	    /**
	     * Remove node from the dataflow.
	     */
	    DataFlowNode.prototype.remove = function () {
	        var loc = this._parent.removeChild(this);
	        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            // do not use the set method because we want to insert at a particular location
	            child._parent = this._parent;
	            this._parent.addChild(child, loc++);
	        }
	    };
	    /**
	     * Insert another node as a parent of this node.
	     */
	    DataFlowNode.prototype.insertAsParentOf = function (other) {
	        var parent = other.parent;
	        parent.removeChild(this);
	        this.parent = parent;
	        other.parent = this;
	    };
	    DataFlowNode.prototype.swapWithParent = function () {
	        var parent = this._parent;
	        var newParent = parent.parent;
	        // reconnect the children
	        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.parent = parent;
	        }
	        // remove old links
	        this._children = []; // equivalent to removing every child link one by one
	        parent.removeChild(this);
	        parent.parent.removeChild(parent);
	        // swap two nodes
	        this.parent = newParent;
	        parent.parent = this;
	    };
	    return DataFlowNode;
	}());
	exports.DataFlowNode = DataFlowNode;
	var OutputNode = /** @class */ (function (_super) {
	    tslib_1.__extends(OutputNode, _super);
	    /**
	     * @param source The name of the source. Will change in assemble.
	     * @param type The type of the output node.
	     * @param refCounts A global ref counter map.
	     */
	    function OutputNode(parent, source, type, refCounts) {
	        var _this = _super.call(this, parent, source) || this;
	        _this.type = type;
	        _this.refCounts = refCounts;
	        _this._source = _this._name = source;
	        if (_this.refCounts && !(_this._name in _this.refCounts)) {
	            _this.refCounts[_this._name] = 0;
	        }
	        return _this;
	    }
	    OutputNode.prototype.clone = function () {
	        var cloneObj = new this.constructor();
	        cloneObj.debugName = 'clone_' + this.debugName;
	        cloneObj._source = this._source;
	        cloneObj._name = 'clone_' + this._name;
	        cloneObj.type = this.type;
	        cloneObj.refCounts = this.refCounts;
	        cloneObj.refCounts[cloneObj._name] = 0;
	        return cloneObj;
	    };
	    /**
	     * Request the datasource name and increase the ref counter.
	     *
	     * During the parsing phase, this will return the simple name such as 'main' or 'raw'.
	     * It is crucial to request the name from an output node to mark it as a required node.
	     * If nobody ever requests the name, this datasource will not be instantiated in the assemble phase.
	     *
	     * In the assemble phase, this will return the correct name.
	     */
	    OutputNode.prototype.getSource = function () {
	        this.refCounts[this._name]++;
	        return this._source;
	    };
	    OutputNode.prototype.isRequired = function () {
	        return !!this.refCounts[this._name];
	    };
	    OutputNode.prototype.setSource = function (source) {
	        this._source = source;
	    };
	    return OutputNode;
	}(DataFlowNode));
	exports.OutputNode = OutputNode;
	var TransformNode = /** @class */ (function (_super) {
	    tslib_1.__extends(TransformNode, _super);
	    function TransformNode() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return TransformNode;
	}(DataFlowNode));
	exports.TransformNode = TransformNode;
	function isTransformNode(x) {
	    return x instanceof TransformNode;
	}
	exports.isTransformNode = isTransformNode;

	});

	unwrapExports(dataflow);
	var dataflow_1 = dataflow.DataFlowNode;
	var dataflow_2 = dataflow.OutputNode;
	var dataflow_3 = dataflow.TransformNode;
	var dataflow_4 = dataflow.isTransformNode;

	function ASTNode(type) {
	  this.type = type;
	}

	ASTNode.prototype.visit = function(visitor) {
	  var node = this, c, i, n;

	  if (visitor(node)) return 1;

	  for (c=children(node), i=0, n=c.length; i<n; ++i) {
	    if (c[i].visit(visitor)) return 1;
	  }
	};

	function children(node) {
	  switch (node.type) {
	    case 'ArrayExpression':
	      return node.elements;
	    case 'BinaryExpression':
	    case 'LogicalExpression':
	      return [node.left, node.right];
	    case 'CallExpression':
	      var args = node.arguments.slice();
	      args.unshift(node.callee);
	      return args;
	    case 'ConditionalExpression':
	      return [node.test, node.consequent, node.alternate];
	    case 'MemberExpression':
	      return [node.object, node.property];
	    case 'ObjectExpression':
	      return node.properties;
	    case 'Property':
	      return [node.key, node.value];
	    case 'UnaryExpression':
	      return [node.argument];
	    case 'Identifier':
	    case 'Literal':
	    case 'RawCode':
	    default:
	      return [];
	  }
	}

	/*
	  The following expression parser is based on Esprima (http://esprima.org/).
	  Original header comment and license for Esprima is included here:

	  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
	  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
	  Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
	  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
	  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
	  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
	  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
	  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
	  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
	  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:

	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.

	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	var TokenName,
	    source,
	    index$1,
	    length,
	    lookahead;

	var TokenBooleanLiteral = 1,
	    TokenEOF = 2,
	    TokenIdentifier = 3,
	    TokenKeyword = 4,
	    TokenNullLiteral = 5,
	    TokenNumericLiteral = 6,
	    TokenPunctuator = 7,
	    TokenStringLiteral = 8,
	    TokenRegularExpression = 9;

	TokenName = {};
	TokenName[TokenBooleanLiteral] = 'Boolean';
	TokenName[TokenEOF] = '<end>';
	TokenName[TokenIdentifier] = 'Identifier';
	TokenName[TokenKeyword] = 'Keyword';
	TokenName[TokenNullLiteral] = 'Null';
	TokenName[TokenNumericLiteral] = 'Numeric';
	TokenName[TokenPunctuator] = 'Punctuator';
	TokenName[TokenStringLiteral] = 'String';
	TokenName[TokenRegularExpression] = 'RegularExpression';

	var SyntaxArrayExpression = 'ArrayExpression',
	    SyntaxBinaryExpression = 'BinaryExpression',
	    SyntaxCallExpression = 'CallExpression',
	    SyntaxConditionalExpression = 'ConditionalExpression',
	    SyntaxIdentifier = 'Identifier',
	    SyntaxLiteral = 'Literal',
	    SyntaxLogicalExpression = 'LogicalExpression',
	    SyntaxMemberExpression = 'MemberExpression',
	    SyntaxObjectExpression = 'ObjectExpression',
	    SyntaxProperty = 'Property',
	    SyntaxUnaryExpression = 'UnaryExpression';

	// Error messages should be identical to V8.
	var MessageUnexpectedToken = 'Unexpected token %0',
	    MessageUnexpectedNumber = 'Unexpected number',
	    MessageUnexpectedString = 'Unexpected string',
	    MessageUnexpectedIdentifier = 'Unexpected identifier',
	    MessageUnexpectedReserved = 'Unexpected reserved word',
	    MessageUnexpectedEOS = 'Unexpected end of input',
	    MessageInvalidRegExp = 'Invalid regular expression',
	    MessageUnterminatedRegExp = 'Invalid regular expression: missing /',
	    MessageStrictOctalLiteral = 'Octal literals are not allowed in strict mode.',
	    MessageStrictDuplicateProperty = 'Duplicate data property in object literal not allowed in strict mode';

	var ILLEGAL$1 = 'ILLEGAL',
	    DISABLED = 'Disabled.';

	// See also tools/generate-unicode-regex.py.
	var RegexNonAsciiIdentifierStart = new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
	    RegexNonAsciiIdentifierPart = new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]');

	// Ensure the condition is true, otherwise throw an error.
	// This is only to have a better contract semantic, i.e. another safety net
	// to catch a logic error. The condition shall be fulfilled in normal case.
	// Do NOT use this to enforce a certain condition on any user input.

	function assert(condition, message) {
	  /* istanbul ignore next */
	  if (!condition) {
	    throw new Error('ASSERT: ' + message);
	  }
	}

	function isDecimalDigit(ch) {
	  return (ch >= 0x30 && ch <= 0x39); // 0..9
	}

	function isHexDigit(ch) {
	  return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
	}

	function isOctalDigit(ch) {
	  return '01234567'.indexOf(ch) >= 0;
	}

	// 7.2 White Space

	function isWhiteSpace(ch) {
	  return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
	    (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
	}

	// 7.3 Line Terminators

	function isLineTerminator(ch) {
	  return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
	}

	// 7.6 Identifier Names and Identifiers

	function isIdentifierStart(ch) {
	  return (ch === 0x24) || (ch === 0x5F) || // $ (dollar) and _ (underscore)
	    (ch >= 0x41 && ch <= 0x5A) || // A..Z
	    (ch >= 0x61 && ch <= 0x7A) || // a..z
	    (ch === 0x5C) || // \ (backslash)
	    ((ch >= 0x80) && RegexNonAsciiIdentifierStart.test(String.fromCharCode(ch)));
	}

	function isIdentifierPart(ch) {
	  return (ch === 0x24) || (ch === 0x5F) || // $ (dollar) and _ (underscore)
	    (ch >= 0x41 && ch <= 0x5A) || // A..Z
	    (ch >= 0x61 && ch <= 0x7A) || // a..z
	    (ch >= 0x30 && ch <= 0x39) || // 0..9
	    (ch === 0x5C) || // \ (backslash)
	    ((ch >= 0x80) && RegexNonAsciiIdentifierPart.test(String.fromCharCode(ch)));
	}

	// 7.6.1.1 Keywords

	var keywords = {
	  'if':1, 'in':1, 'do':1,
	  'var':1, 'for':1, 'new':1, 'try':1, 'let':1,
	  'this':1, 'else':1, 'case':1, 'void':1, 'with':1, 'enum':1,
	  'while':1, 'break':1, 'catch':1, 'throw':1, 'const':1, 'yield':1, 'class':1, 'super':1,
	  'return':1, 'typeof':1, 'delete':1, 'switch':1, 'export':1, 'import':1, 'public':1, 'static':1,
	  'default':1, 'finally':1, 'extends':1, 'package':1, 'private':1,
	  'function':1, 'continue':1, 'debugger':1,
	  'interface':1, 'protected':1,
	  'instanceof':1, 'implements':1
	};

	function skipComment() {
	  var ch;

	  while (index$1 < length) {
	    ch = source.charCodeAt(index$1);

	    if (isWhiteSpace(ch) || isLineTerminator(ch)) {
	      ++index$1;
	    } else {
	      break;
	    }
	  }
	}

	function scanHexEscape(prefix) {
	  var i, len, ch, code = 0;

	  len = (prefix === 'u') ? 4 : 2;
	  for (i = 0; i < len; ++i) {
	    if (index$1 < length && isHexDigit(source[index$1])) {
	      ch = source[index$1++];
	      code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
	    } else {
	      throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	    }
	  }
	  return String.fromCharCode(code);
	}

	function scanUnicodeCodePointEscape() {
	  var ch, code, cu1, cu2;

	  ch = source[index$1];
	  code = 0;

	  // At least, one hex digit is required.
	  if (ch === '}') {
	    throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	  }

	  while (index$1 < length) {
	    ch = source[index$1++];
	    if (!isHexDigit(ch)) {
	      break;
	    }
	    code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
	  }

	  if (code > 0x10FFFF || ch !== '}') {
	    throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	  }

	  // UTF-16 Encoding
	  if (code <= 0xFFFF) {
	    return String.fromCharCode(code);
	  }
	  cu1 = ((code - 0x10000) >> 10) + 0xD800;
	  cu2 = ((code - 0x10000) & 1023) + 0xDC00;
	  return String.fromCharCode(cu1, cu2);
	}

	function getEscapedIdentifier() {
	  var ch, id;

	  ch = source.charCodeAt(index$1++);
	  id = String.fromCharCode(ch);

	  // '\u' (U+005C, U+0075) denotes an escaped character.
	  if (ch === 0x5C) {
	    if (source.charCodeAt(index$1) !== 0x75) {
	      throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	    }
	    ++index$1;
	    ch = scanHexEscape('u');
	    if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
	      throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	    }
	    id = ch;
	  }

	  while (index$1 < length) {
	    ch = source.charCodeAt(index$1);
	    if (!isIdentifierPart(ch)) {
	      break;
	    }
	    ++index$1;
	    id += String.fromCharCode(ch);

	    // '\u' (U+005C, U+0075) denotes an escaped character.
	    if (ch === 0x5C) {
	      id = id.substr(0, id.length - 1);
	      if (source.charCodeAt(index$1) !== 0x75) {
	        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	      }
	      ++index$1;
	      ch = scanHexEscape('u');
	      if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
	        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	      }
	      id += ch;
	    }
	  }

	  return id;
	}

	function getIdentifier() {
	  var start, ch;

	  start = index$1++;
	  while (index$1 < length) {
	    ch = source.charCodeAt(index$1);
	    if (ch === 0x5C) {
	      // Blackslash (U+005C) marks Unicode escape sequence.
	      index$1 = start;
	      return getEscapedIdentifier();
	    }
	    if (isIdentifierPart(ch)) {
	      ++index$1;
	    } else {
	      break;
	    }
	  }

	  return source.slice(start, index$1);
	}

	function scanIdentifier() {
	  var start, id, type;

	  start = index$1;

	  // Backslash (U+005C) starts an escaped character.
	  id = (source.charCodeAt(index$1) === 0x5C) ? getEscapedIdentifier() : getIdentifier();

	  // There is no keyword or literal with only one character.
	  // Thus, it must be an identifier.
	  if (id.length === 1) {
	    type = TokenIdentifier;
	  } else if (keywords.hasOwnProperty(id)) {
	    type = TokenKeyword;
	  } else if (id === 'null') {
	    type = TokenNullLiteral;
	  } else if (id === 'true' || id === 'false') {
	    type = TokenBooleanLiteral;
	  } else {
	    type = TokenIdentifier;
	  }

	  return {
	    type: type,
	    value: id,
	    start: start,
	    end: index$1
	  };
	}

	// 7.7 Punctuators

	function scanPunctuator() {
	  var start = index$1,
	    code = source.charCodeAt(index$1),
	    code2,
	    ch1 = source[index$1],
	    ch2,
	    ch3,
	    ch4;

	  switch (code) {

	    // Check for most common single-character punctuators.
	    case 0x2E: // . dot
	    case 0x28: // ( open bracket
	    case 0x29: // ) close bracket
	    case 0x3B: // ; semicolon
	    case 0x2C: // , comma
	    case 0x7B: // { open curly brace
	    case 0x7D: // } close curly brace
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x3A: // :
	    case 0x3F: // ?
	    case 0x7E: // ~
	      ++index$1;
	      return {
	        type: TokenPunctuator,
	        value: String.fromCharCode(code),
	        start: start,
	        end: index$1
	      };

	    default:
	      code2 = source.charCodeAt(index$1 + 1);

	      // '=' (U+003D) marks an assignment or comparison operator.
	      if (code2 === 0x3D) {
	        switch (code) {
	          case 0x2B: // +
	          case 0x2D: // -
	          case 0x2F: // /
	          case 0x3C: // <
	          case 0x3E: // >
	          case 0x5E: // ^
	          case 0x7C: // |
	          case 0x25: // %
	          case 0x26: // &
	          case 0x2A: // *
	            index$1 += 2;
	            return {
	              type: TokenPunctuator,
	              value: String.fromCharCode(code) + String.fromCharCode(code2),
	              start: start,
	              end: index$1
	            };

	          case 0x21: // !
	          case 0x3D: // =
	            index$1 += 2;

	            // !== and ===
	            if (source.charCodeAt(index$1) === 0x3D) {
	              ++index$1;
	            }
	            return {
	              type: TokenPunctuator,
	              value: source.slice(start, index$1),
	              start: start,
	              end: index$1
	            };
	        }
	      }
	  }

	  // 4-character punctuator: >>>=

	  ch4 = source.substr(index$1, 4);

	  if (ch4 === '>>>=') {
	    index$1 += 4;
	    return {
	      type: TokenPunctuator,
	      value: ch4,
	      start: start,
	      end: index$1
	    };
	  }

	  // 3-character punctuators: === !== >>> <<= >>=

	  ch3 = ch4.substr(0, 3);

	  if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
	    index$1 += 3;
	    return {
	      type: TokenPunctuator,
	      value: ch3,
	      start: start,
	      end: index$1
	    };
	  }

	  // Other 2-character punctuators: ++ -- << >> && ||
	  ch2 = ch3.substr(0, 2);

	  if ((ch1 === ch2[1] && ('+-<>&|'.indexOf(ch1) >= 0)) || ch2 === '=>') {
	    index$1 += 2;
	    return {
	      type: TokenPunctuator,
	      value: ch2,
	      start: start,
	      end: index$1
	    };
	  }

	  // 1-character punctuators: < > = ! + - * % & | ^ /

	  if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
	    ++index$1;
	    return {
	      type: TokenPunctuator,
	      value: ch1,
	      start: start,
	      end: index$1
	    };
	  }

	  throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	}

	// 7.8.3 Numeric Literals

	function scanHexLiteral(start) {
	  var number = '';

	  while (index$1 < length) {
	    if (!isHexDigit(source[index$1])) {
	      break;
	    }
	    number += source[index$1++];
	  }

	  if (number.length === 0) {
	    throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	  }

	  if (isIdentifierStart(source.charCodeAt(index$1))) {
	    throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	  }

	  return {
	    type: TokenNumericLiteral,
	    value: parseInt('0x' + number, 16),
	    start: start,
	    end: index$1
	  };
	}

	function scanOctalLiteral(start) {
	  var number = '0' + source[index$1++];
	  while (index$1 < length) {
	    if (!isOctalDigit(source[index$1])) {
	      break;
	    }
	    number += source[index$1++];
	  }

	  if (isIdentifierStart(source.charCodeAt(index$1)) || isDecimalDigit(source.charCodeAt(index$1))) {
	    throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	  }

	  return {
	    type: TokenNumericLiteral,
	    value: parseInt(number, 8),
	    octal: true,
	    start: start,
	    end: index$1
	  };
	}

	function scanNumericLiteral() {
	  var number, start, ch;

	  ch = source[index$1];
	  assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
	    'Numeric literal must start with a decimal digit or a decimal point');

	  start = index$1;
	  number = '';
	  if (ch !== '.') {
	    number = source[index$1++];
	    ch = source[index$1];

	    // Hex number starts with '0x'.
	    // Octal number starts with '0'.
	    if (number === '0') {
	      if (ch === 'x' || ch === 'X') {
	        ++index$1;
	        return scanHexLiteral(start);
	      }
	      if (isOctalDigit(ch)) {
	        return scanOctalLiteral(start);
	      }

	      // decimal number starts with '0' such as '09' is illegal.
	      if (ch && isDecimalDigit(ch.charCodeAt(0))) {
	        throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	      }
	    }

	    while (isDecimalDigit(source.charCodeAt(index$1))) {
	      number += source[index$1++];
	    }
	    ch = source[index$1];
	  }

	  if (ch === '.') {
	    number += source[index$1++];
	    while (isDecimalDigit(source.charCodeAt(index$1))) {
	      number += source[index$1++];
	    }
	    ch = source[index$1];
	  }

	  if (ch === 'e' || ch === 'E') {
	    number += source[index$1++];

	    ch = source[index$1];
	    if (ch === '+' || ch === '-') {
	      number += source[index$1++];
	    }
	    if (isDecimalDigit(source.charCodeAt(index$1))) {
	      while (isDecimalDigit(source.charCodeAt(index$1))) {
	        number += source[index$1++];
	      }
	    } else {
	      throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	    }
	  }

	  if (isIdentifierStart(source.charCodeAt(index$1))) {
	    throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	  }

	  return {
	    type: TokenNumericLiteral,
	    value: parseFloat(number),
	    start: start,
	    end: index$1
	  };
	}

	// 7.8.4 String Literals

	function scanStringLiteral() {
	  var str = '',
	    quote, start, ch, code, octal = false;

	  quote = source[index$1];
	  assert((quote === '\'' || quote === '"'),
	    'String literal must starts with a quote');

	  start = index$1;
	  ++index$1;

	  while (index$1 < length) {
	    ch = source[index$1++];

	    if (ch === quote) {
	      quote = '';
	      break;
	    } else if (ch === '\\') {
	      ch = source[index$1++];
	      if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
	        switch (ch) {
	          case 'u':
	          case 'x':
	            if (source[index$1] === '{') {
	              ++index$1;
	              str += scanUnicodeCodePointEscape();
	            } else {
	              str += scanHexEscape(ch);
	            }
	            break;
	          case 'n':
	            str += '\n';
	            break;
	          case 'r':
	            str += '\r';
	            break;
	          case 't':
	            str += '\t';
	            break;
	          case 'b':
	            str += '\b';
	            break;
	          case 'f':
	            str += '\f';
	            break;
	          case 'v':
	            str += '\x0B';
	            break;

	          default:
	            if (isOctalDigit(ch)) {
	              code = '01234567'.indexOf(ch);

	              // \0 is not octal escape sequence
	              if (code !== 0) {
	                octal = true;
	              }

	              if (index$1 < length && isOctalDigit(source[index$1])) {
	                octal = true;
	                code = code * 8 + '01234567'.indexOf(source[index$1++]);

	                // 3 digits are only allowed when string starts
	                // with 0, 1, 2, 3
	                if ('0123'.indexOf(ch) >= 0 &&
	                  index$1 < length &&
	                  isOctalDigit(source[index$1])) {
	                  code = code * 8 + '01234567'.indexOf(source[index$1++]);
	                }
	              }
	              str += String.fromCharCode(code);
	            } else {
	              str += ch;
	            }
	            break;
	        }
	      } else {
	        if (ch === '\r' && source[index$1] === '\n') {
	          ++index$1;
	        }
	      }
	    } else if (isLineTerminator(ch.charCodeAt(0))) {
	      break;
	    } else {
	      str += ch;
	    }
	  }

	  if (quote !== '') {
	    throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	  }

	  return {
	    type: TokenStringLiteral,
	    value: str,
	    octal: octal,
	    start: start,
	    end: index$1
	  };
	}

	function testRegExp(pattern, flags) {
	  var tmp = pattern;

	  if (flags.indexOf('u') >= 0) {
	    // Replace each astral symbol and every Unicode code point
	    // escape sequence with a single ASCII symbol to avoid throwing on
	    // regular expressions that are only valid in combination with the
	    // `/u` flag.
	    // Note: replacing with the ASCII symbol `x` might cause false
	    // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
	    // perfectly valid pattern that is equivalent to `[a-b]`, but it
	    // would be replaced by `[x-b]` which throws an error.
	    tmp = tmp
	      .replace(/\\u\{([0-9a-fA-F]+)\}/g, function($0, $1) {
	        if (parseInt($1, 16) <= 0x10FFFF) {
	          return 'x';
	        }
	        throwError({}, MessageInvalidRegExp);
	      })
	      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, 'x');
	  }

	  // First, detect invalid regular expressions.
	  try {
	  } catch (e) {
	    throwError({}, MessageInvalidRegExp);
	  }

	  // Return a regular expression object for this pattern-flag pair, or
	  // `null` in case the current environment doesn't support the flags it
	  // uses.
	  try {
	    return new RegExp(pattern, flags);
	  } catch (exception) {
	    return null;
	  }
	}

	function scanRegExpBody() {
	  var ch, str, classMarker, terminated, body;

	  ch = source[index$1];
	  assert(ch === '/', 'Regular expression literal must start with a slash');
	  str = source[index$1++];

	  classMarker = false;
	  terminated = false;
	  while (index$1 < length) {
	    ch = source[index$1++];
	    str += ch;
	    if (ch === '\\') {
	      ch = source[index$1++];
	      // ECMA-262 7.8.5
	      if (isLineTerminator(ch.charCodeAt(0))) {
	        throwError({}, MessageUnterminatedRegExp);
	      }
	      str += ch;
	    } else if (isLineTerminator(ch.charCodeAt(0))) {
	      throwError({}, MessageUnterminatedRegExp);
	    } else if (classMarker) {
	      if (ch === ']') {
	        classMarker = false;
	      }
	    } else {
	      if (ch === '/') {
	        terminated = true;
	        break;
	      } else if (ch === '[') {
	        classMarker = true;
	      }
	    }
	  }

	  if (!terminated) {
	    throwError({}, MessageUnterminatedRegExp);
	  }

	  // Exclude leading and trailing slash.
	  body = str.substr(1, str.length - 2);
	  return {
	    value: body,
	    literal: str
	  };
	}

	function scanRegExpFlags() {
	  var ch, str, flags;

	  str = '';
	  flags = '';
	  while (index$1 < length) {
	    ch = source[index$1];
	    if (!isIdentifierPart(ch.charCodeAt(0))) {
	      break;
	    }

	    ++index$1;
	    if (ch === '\\' && index$1 < length) {
	      throwError({}, MessageUnexpectedToken, ILLEGAL$1);
	    } else {
	      flags += ch;
	      str += ch;
	    }
	  }

	  if (flags.search(/[^gimuy]/g) >= 0) {
	    throwError({}, MessageInvalidRegExp, flags);
	  }

	  return {
	    value: flags,
	    literal: str
	  };
	}

	function scanRegExp() {
	  var start, body, flags, value;

	  lookahead = null;
	  skipComment();
	  start = index$1;

	  body = scanRegExpBody();
	  flags = scanRegExpFlags();
	  value = testRegExp(body.value, flags.value);

	  return {
	    literal: body.literal + flags.literal,
	    value: value,
	    regex: {
	      pattern: body.value,
	      flags: flags.value
	    },
	    start: start,
	    end: index$1
	  };
	}

	function isIdentifierName(token) {
	  return token.type === TokenIdentifier ||
	    token.type === TokenKeyword ||
	    token.type === TokenBooleanLiteral ||
	    token.type === TokenNullLiteral;
	}

	function advance() {
	  var ch;

	  skipComment();

	  if (index$1 >= length) {
	    return {
	      type: TokenEOF,
	      start: index$1,
	      end: index$1
	    };
	  }

	  ch = source.charCodeAt(index$1);

	  if (isIdentifierStart(ch)) {
	    return scanIdentifier();
	  }

	  // Very common: ( and ) and ;
	  if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
	    return scanPunctuator();
	  }

	  // String literal starts with single quote (U+0027) or double quote (U+0022).
	  if (ch === 0x27 || ch === 0x22) {
	    return scanStringLiteral();
	  }


	  // Dot (.) U+002E can also start a floating-point number, hence the need
	  // to check the next character.
	  if (ch === 0x2E) {
	    if (isDecimalDigit(source.charCodeAt(index$1 + 1))) {
	      return scanNumericLiteral();
	    }
	    return scanPunctuator();
	  }

	  if (isDecimalDigit(ch)) {
	    return scanNumericLiteral();
	  }

	  return scanPunctuator();
	}

	function lex() {
	  var token;

	  token = lookahead;
	  index$1 = token.end;

	  lookahead = advance();

	  index$1 = token.end;

	  return token;
	}

	function peek$1() {
	  var pos;

	  pos = index$1;

	  lookahead = advance();
	  index$1 = pos;
	}

	function finishArrayExpression(elements) {
	  var node = new ASTNode(SyntaxArrayExpression);
	  node.elements = elements;
	  return node;
	}

	function finishBinaryExpression(operator, left, right) {
	  var node = new ASTNode((operator === '||' || operator === '&&') ? SyntaxLogicalExpression : SyntaxBinaryExpression);
	  node.operator = operator;
	  node.left = left;
	  node.right = right;
	  return node;
	}

	function finishCallExpression(callee, args) {
	  var node = new ASTNode(SyntaxCallExpression);
	  node.callee = callee;
	  node.arguments = args;
	  return node;
	}

	function finishConditionalExpression(test, consequent, alternate) {
	  var node = new ASTNode(SyntaxConditionalExpression);
	  node.test = test;
	  node.consequent = consequent;
	  node.alternate = alternate;
	  return node;
	}

	function finishIdentifier(name) {
	  var node = new ASTNode(SyntaxIdentifier);
	  node.name = name;
	  return node;
	}

	function finishLiteral(token) {
	  var node = new ASTNode(SyntaxLiteral);
	  node.value = token.value;
	  node.raw = source.slice(token.start, token.end);
	  if (token.regex) {
	    if (node.raw === '//') {
	      node.raw = '/(?:)/';
	    }
	    node.regex = token.regex;
	  }
	  return node;
	}

	function finishMemberExpression(accessor, object, property) {
	  var node = new ASTNode(SyntaxMemberExpression);
	  node.computed = accessor === '[';
	  node.object = object;
	  node.property = property;
	  if (!node.computed) property.member = true;
	  return node;
	}

	function finishObjectExpression(properties) {
	  var node = new ASTNode(SyntaxObjectExpression);
	  node.properties = properties;
	  return node;
	}

	function finishProperty(kind, key, value) {
	  var node = new ASTNode(SyntaxProperty);
	  node.key = key;
	  node.value = value;
	  node.kind = kind;
	  return node;
	}

	function finishUnaryExpression(operator, argument) {
	  var node = new ASTNode(SyntaxUnaryExpression);
	  node.operator = operator;
	  node.argument = argument;
	  node.prefix = true;
	  return node;
	}

	// Throw an exception

	function throwError(token, messageFormat) {
	  var error,
	    args = Array.prototype.slice.call(arguments, 2),
	    msg = messageFormat.replace(
	      /%(\d)/g,
	      function(whole, index) {
	        assert(index < args.length, 'Message reference must be in range');
	        return args[index];
	      }
	    );


	  error = new Error(msg);
	  error.index = index$1;
	  error.description = msg;
	  throw error;
	}

	// Throw an exception because of the token.

	function throwUnexpected(token) {
	  if (token.type === TokenEOF) {
	    throwError(token, MessageUnexpectedEOS);
	  }

	  if (token.type === TokenNumericLiteral) {
	    throwError(token, MessageUnexpectedNumber);
	  }

	  if (token.type === TokenStringLiteral) {
	    throwError(token, MessageUnexpectedString);
	  }

	  if (token.type === TokenIdentifier) {
	    throwError(token, MessageUnexpectedIdentifier);
	  }

	  if (token.type === TokenKeyword) {
	    throwError(token, MessageUnexpectedReserved);
	  }

	  // BooleanLiteral, NullLiteral, or Punctuator.
	  throwError(token, MessageUnexpectedToken, token.value);
	}

	// Expect the next token to match the specified punctuator.
	// If not, an exception will be thrown.

	function expect(value) {
	  var token = lex();
	  if (token.type !== TokenPunctuator || token.value !== value) {
	    throwUnexpected(token);
	  }
	}

	// Return true if the next token matches the specified punctuator.

	function match(value) {
	  return lookahead.type === TokenPunctuator && lookahead.value === value;
	}

	// Return true if the next token matches the specified keyword

	function matchKeyword(keyword) {
	  return lookahead.type === TokenKeyword && lookahead.value === keyword;
	}

	// 11.1.4 Array Initialiser

	function parseArrayInitialiser() {
	  var elements = [];

	  index$1 = lookahead.start;
	  expect('[');

	  while (!match(']')) {
	    if (match(',')) {
	      lex();
	      elements.push(null);
	    } else {
	      elements.push(parseConditionalExpression());

	      if (!match(']')) {
	        expect(',');
	      }
	    }
	  }

	  lex();

	  return finishArrayExpression(elements);
	}

	// 11.1.5 Object Initialiser

	function parseObjectPropertyKey() {
	  var token;

	  index$1 = lookahead.start;
	  token = lex();

	  // Note: This function is called only from parseObjectProperty(), where
	  // EOF and Punctuator tokens are already filtered out.

	  if (token.type === TokenStringLiteral || token.type === TokenNumericLiteral) {
	    if (token.octal) {
	      throwError(token, MessageStrictOctalLiteral);
	    }
	    return finishLiteral(token);
	  }

	  return finishIdentifier(token.value);
	}

	function parseObjectProperty() {
	  var token, key, id, value;

	  index$1 = lookahead.start;
	  token = lookahead;

	  if (token.type === TokenIdentifier) {
	    id = parseObjectPropertyKey();
	    expect(':');
	    value = parseConditionalExpression();
	    return finishProperty('init', id, value);
	  }
	  if (token.type === TokenEOF || token.type === TokenPunctuator) {
	    throwUnexpected(token);
	  } else {
	    key = parseObjectPropertyKey();
	    expect(':');
	    value = parseConditionalExpression();
	    return finishProperty('init', key, value);
	  }
	}

	function parseObjectInitialiser() {
	  var properties = [],
	    property, name, key, map = {},
	    toString = String;

	  index$1 = lookahead.start;
	  expect('{');

	  while (!match('}')) {
	    property = parseObjectProperty();

	    if (property.key.type === SyntaxIdentifier) {
	      name = property.key.name;
	    } else {
	      name = toString(property.key.value);
	    }

	    key = '$' + name;
	    if (Object.prototype.hasOwnProperty.call(map, key)) {
	      throwError({}, MessageStrictDuplicateProperty);
	    } else {
	      map[key] = true;
	    }

	    properties.push(property);

	    if (!match('}')) {
	      expect(',');
	    }
	  }

	  expect('}');

	  return finishObjectExpression(properties);
	}

	// 11.1.6 The Grouping Operator

	function parseGroupExpression() {
	  var expr;

	  expect('(');

	  expr = parseExpression();

	  expect(')');

	  return expr;
	}


	// 11.1 Primary Expressions

	var legalKeywords = {
	  "if": 1,
	  "this": 1
	};

	function parsePrimaryExpression() {
	  var type, token, expr;

	  if (match('(')) {
	    return parseGroupExpression();
	  }

	  if (match('[')) {
	    return parseArrayInitialiser();
	  }

	  if (match('{')) {
	    return parseObjectInitialiser();
	  }

	  type = lookahead.type;
	  index$1 = lookahead.start;


	  if (type === TokenIdentifier || legalKeywords[lookahead.value]) {
	    expr = finishIdentifier(lex().value);
	  } else if (type === TokenStringLiteral || type === TokenNumericLiteral) {
	    if (lookahead.octal) {
	      throwError(lookahead, MessageStrictOctalLiteral);
	    }
	    expr = finishLiteral(lex());
	  } else if (type === TokenKeyword) {
	    throw new Error(DISABLED);
	  } else if (type === TokenBooleanLiteral) {
	    token = lex();
	    token.value = (token.value === 'true');
	    expr = finishLiteral(token);
	  } else if (type === TokenNullLiteral) {
	    token = lex();
	    token.value = null;
	    expr = finishLiteral(token);
	  } else if (match('/') || match('/=')) {
	    expr = finishLiteral(scanRegExp());
	    peek$1();
	  } else {
	    throwUnexpected(lex());
	  }

	  return expr;
	}

	// 11.2 Left-Hand-Side Expressions

	function parseArguments() {
	  var args = [];

	  expect('(');

	  if (!match(')')) {
	    while (index$1 < length) {
	      args.push(parseConditionalExpression());
	      if (match(')')) {
	        break;
	      }
	      expect(',');
	    }
	  }

	  expect(')');

	  return args;
	}

	function parseNonComputedProperty() {
	  var token;
	  index$1 = lookahead.start;
	  token = lex();

	  if (!isIdentifierName(token)) {
	    throwUnexpected(token);
	  }

	  return finishIdentifier(token.value);
	}

	function parseNonComputedMember() {
	  expect('.');

	  return parseNonComputedProperty();
	}

	function parseComputedMember() {
	  var expr;

	  expect('[');

	  expr = parseExpression();

	  expect(']');

	  return expr;
	}

	function parseLeftHandSideExpressionAllowCall() {
	  var expr, args, property;

	  expr = parsePrimaryExpression();

	  for (;;) {
	    if (match('.')) {
	      property = parseNonComputedMember();
	      expr = finishMemberExpression('.', expr, property);
	    } else if (match('(')) {
	      args = parseArguments();
	      expr = finishCallExpression(expr, args);
	    } else if (match('[')) {
	      property = parseComputedMember();
	      expr = finishMemberExpression('[', expr, property);
	    } else {
	      break;
	    }
	  }

	  return expr;
	}

	// 11.3 Postfix Expressions

	function parsePostfixExpression() {
	  var expr = parseLeftHandSideExpressionAllowCall();

	  if (lookahead.type === TokenPunctuator) {
	    if ((match('++') || match('--'))) {
	      throw new Error(DISABLED);
	    }
	  }

	  return expr;
	}

	// 11.4 Unary Operators

	function parseUnaryExpression() {
	  var token, expr;

	  if (lookahead.type !== TokenPunctuator && lookahead.type !== TokenKeyword) {
	    expr = parsePostfixExpression();
	  } else if (match('++') || match('--')) {
	    throw new Error(DISABLED);
	  } else if (match('+') || match('-') || match('~') || match('!')) {
	    token = lex();
	    expr = parseUnaryExpression();
	    expr = finishUnaryExpression(token.value, expr);
	  } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
	    throw new Error(DISABLED);
	  } else {
	    expr = parsePostfixExpression();
	  }

	  return expr;
	}

	function binaryPrecedence(token) {
	  var prec = 0;

	  if (token.type !== TokenPunctuator && token.type !== TokenKeyword) {
	    return 0;
	  }

	  switch (token.value) {
	    case '||':
	      prec = 1;
	      break;

	    case '&&':
	      prec = 2;
	      break;

	    case '|':
	      prec = 3;
	      break;

	    case '^':
	      prec = 4;
	      break;

	    case '&':
	      prec = 5;
	      break;

	    case '==':
	    case '!=':
	    case '===':
	    case '!==':
	      prec = 6;
	      break;

	    case '<':
	    case '>':
	    case '<=':
	    case '>=':
	    case 'instanceof':
	    case 'in':
	      prec = 7;
	      break;

	    case '<<':
	    case '>>':
	    case '>>>':
	      prec = 8;
	      break;

	    case '+':
	    case '-':
	      prec = 9;
	      break;

	    case '*':
	    case '/':
	    case '%':
	      prec = 11;
	      break;

	    default:
	      break;
	  }

	  return prec;
	}

	// 11.5 Multiplicative Operators
	// 11.6 Additive Operators
	// 11.7 Bitwise Shift Operators
	// 11.8 Relational Operators
	// 11.9 Equality Operators
	// 11.10 Binary Bitwise Operators
	// 11.11 Binary Logical Operators

	function parseBinaryExpression() {
	  var marker, markers, expr, token, prec, stack, right, operator, left, i;

	  marker = lookahead;
	  left = parseUnaryExpression();

	  token = lookahead;
	  prec = binaryPrecedence(token);
	  if (prec === 0) {
	    return left;
	  }
	  token.prec = prec;
	  lex();

	  markers = [marker, lookahead];
	  right = parseUnaryExpression();

	  stack = [left, token, right];

	  while ((prec = binaryPrecedence(lookahead)) > 0) {

	    // Reduce: make a binary expression from the three topmost entries.
	    while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
	      right = stack.pop();
	      operator = stack.pop().value;
	      left = stack.pop();
	      markers.pop();
	      expr = finishBinaryExpression(operator, left, right);
	      stack.push(expr);
	    }

	    // Shift.
	    token = lex();
	    token.prec = prec;
	    stack.push(token);
	    markers.push(lookahead);
	    expr = parseUnaryExpression();
	    stack.push(expr);
	  }

	  // Final reduce to clean-up the stack.
	  i = stack.length - 1;
	  expr = stack[i];
	  markers.pop();
	  while (i > 1) {
	    markers.pop();
	    expr = finishBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
	    i -= 2;
	  }

	  return expr;
	}

	// 11.12 Conditional Operator

	function parseConditionalExpression() {
	  var expr, consequent, alternate;

	  expr = parseBinaryExpression();

	  if (match('?')) {
	    lex();
	    consequent = parseConditionalExpression();
	    expect(':');
	    alternate = parseConditionalExpression();

	    expr = finishConditionalExpression(expr, consequent, alternate);
	  }

	  return expr;
	}

	// 11.14 Comma Operator

	function parseExpression() {
	  var expr = parseConditionalExpression();

	  if (match(',')) {
	    throw new Error(DISABLED); // no sequence expressions
	  }

	  return expr;
	}

	function parser(code) {
	  source = code;
	  index$1 = 0;
	  length = source.length;
	  lookahead = null;

	  peek$1();

	  var expr = parseExpression();

	  if (lookahead.type !== TokenEOF) {
	    throw new Error("Unexpect token after expression.");
	  }
	  return expr;
	}

	var Constants = {
	  NaN:       'NaN',
	  E:         'Math.E',
	  LN2:       'Math.LN2',
	  LN10:      'Math.LN10',
	  LOG2E:     'Math.LOG2E',
	  LOG10E:    'Math.LOG10E',
	  PI:        'Math.PI',
	  SQRT1_2:   'Math.SQRT1_2',
	  SQRT2:     'Math.SQRT2',
	  MIN_VALUE: 'Number.MIN_VALUE',
	  MAX_VALUE: 'Number.MAX_VALUE'
	};

	function Functions(codegen) {

	  function fncall(name, args, cast, type) {
	    var obj = codegen(args[0]);
	    if (cast) {
	      obj = cast + '(' + obj + ')';
	      if (cast.lastIndexOf('new ', 0) === 0) obj = '(' + obj + ')';
	    }
	    return obj + '.' + name + (type < 0 ? '' : type === 0 ?
	      '()' :
	      '(' + args.slice(1).map(codegen).join(',') + ')');
	  }

	  function fn(name, cast, type) {
	    return function(args) {
	      return fncall(name, args, cast, type);
	    };
	  }

	  var DATE = 'new Date',
	      STRING = 'String',
	      REGEXP = 'RegExp';

	  return {
	    // MATH functions
	    isNaN:    'isNaN',
	    isFinite: 'isFinite',
	    abs:      'Math.abs',
	    acos:     'Math.acos',
	    asin:     'Math.asin',
	    atan:     'Math.atan',
	    atan2:    'Math.atan2',
	    ceil:     'Math.ceil',
	    cos:      'Math.cos',
	    exp:      'Math.exp',
	    floor:    'Math.floor',
	    log:      'Math.log',
	    max:      'Math.max',
	    min:      'Math.min',
	    pow:      'Math.pow',
	    random:   'Math.random',
	    round:    'Math.round',
	    sin:      'Math.sin',
	    sqrt:     'Math.sqrt',
	    tan:      'Math.tan',

	    clamp: function(args) {
	      if (args.length < 3) error('Missing arguments to clamp function.');
	      if (args.length > 3) error('Too many arguments to clamp function.');
	      var a = args.map(codegen);
	      return 'Math.max('+a[1]+', Math.min('+a[2]+','+a[0]+'))';
	    },

	    // DATE functions
	    now:             'Date.now',
	    utc:             'Date.UTC',
	    datetime:        DATE,
	    date:            fn('getDate', DATE, 0),
	    day:             fn('getDay', DATE, 0),
	    year:            fn('getFullYear', DATE, 0),
	    month:           fn('getMonth', DATE, 0),
	    hours:           fn('getHours', DATE, 0),
	    minutes:         fn('getMinutes', DATE, 0),
	    seconds:         fn('getSeconds', DATE, 0),
	    milliseconds:    fn('getMilliseconds', DATE, 0),
	    time:            fn('getTime', DATE, 0),
	    timezoneoffset:  fn('getTimezoneOffset', DATE, 0),
	    utcdate:         fn('getUTCDate', DATE, 0),
	    utcday:          fn('getUTCDay', DATE, 0),
	    utcyear:         fn('getUTCFullYear', DATE, 0),
	    utcmonth:        fn('getUTCMonth', DATE, 0),
	    utchours:        fn('getUTCHours', DATE, 0),
	    utcminutes:      fn('getUTCMinutes', DATE, 0),
	    utcseconds:      fn('getUTCSeconds', DATE, 0),
	    utcmilliseconds: fn('getUTCMilliseconds', DATE, 0),

	    // shared sequence functions
	    length:      fn('length', null, -1),
	    indexof:     fn('indexOf', null),
	    lastindexof: fn('lastIndexOf', null),
	    slice:       fn('slice', null),

	    // STRING functions
	    parseFloat:  'parseFloat',
	    parseInt:    'parseInt',
	    upper:       fn('toUpperCase', STRING, 0),
	    lower:       fn('toLowerCase', STRING, 0),
	    substring:   fn('substring', STRING),
	    replace:     fn('replace', STRING),

	    // REGEXP functions
	    regexp:  REGEXP,
	    test:    fn('test', REGEXP),

	    // Control Flow functions
	    if: function(args) {
	        if (args.length < 3) error('Missing arguments to if function.');
	        if (args.length > 3) error('Too many arguments to if function.');
	        var a = args.map(codegen);
	        return '('+a[0]+'?'+a[1]+':'+a[2]+')';
	      }
	  };
	}

	function codegen(opt) {
	  opt = opt || {};

	  var whitelist = opt.whitelist ? toSet(opt.whitelist) : {},
	      blacklist = opt.blacklist ? toSet(opt.blacklist) : {},
	      constants = opt.constants || Constants,
	      functions = (opt.functions || Functions)(visit),
	      globalvar = opt.globalvar,
	      fieldvar = opt.fieldvar,
	      globals = {},
	      fields = {},
	      memberDepth = 0;

	  var outputGlobal = isFunction(globalvar)
	    ? globalvar
	    : function (id$$1) { return globalvar + '["' + id$$1 + '"]'; };

	  function visit(ast) {
	    if (isString(ast)) return ast;
	    var generator = Generators[ast.type];
	    if (generator == null) error('Unsupported type: ' + ast.type);
	    return generator(ast);
	  }

	  var Generators = {
	    Literal: function(n) {
	        return n.raw;
	      },

	    Identifier: function(n) {
	      var id$$1 = n.name;
	      if (memberDepth > 0) {
	        return id$$1;
	      } else if (blacklist.hasOwnProperty(id$$1)) {
	        return error('Illegal identifier: ' + id$$1);
	      } else if (constants.hasOwnProperty(id$$1)) {
	        return constants[id$$1];
	      } else if (whitelist.hasOwnProperty(id$$1)) {
	        return id$$1;
	      } else {
	        globals[id$$1] = 1;
	        return outputGlobal(id$$1);
	      }
	    },

	    MemberExpression: function(n) {
	        var d = !n.computed;
	        var o = visit(n.object);
	        if (d) memberDepth += 1;
	        var p = visit(n.property);
	        if (o === fieldvar) { fields[p] = 1; } // HACKish...
	        if (d) memberDepth -= 1;
	        return o + (d ? '.'+p : '['+p+']');
	      },

	    CallExpression: function(n) {
	        if (n.callee.type !== 'Identifier') {
	          error('Illegal callee type: ' + n.callee.type);
	        }
	        var callee = n.callee.name;
	        var args = n.arguments;
	        var fn = functions.hasOwnProperty(callee) && functions[callee];
	        if (!fn) error('Unrecognized function: ' + callee);
	        return isFunction(fn)
	          ? fn(args)
	          : fn + '(' + args.map(visit).join(',') + ')';
	      },

	    ArrayExpression: function(n) {
	        return '[' + n.elements.map(visit).join(',') + ']';
	      },

	    BinaryExpression: function(n) {
	        return '(' + visit(n.left) + n.operator + visit(n.right) + ')';
	      },

	    UnaryExpression: function(n) {
	        return '(' + n.operator + visit(n.argument) + ')';
	      },

	    ConditionalExpression: function(n) {
	        return '(' + visit(n.test) +
	          '?' + visit(n.consequent) +
	          ':' + visit(n.alternate) +
	          ')';
	      },

	    LogicalExpression: function(n) {
	        return '(' + visit(n.left) + n.operator + visit(n.right) + ')';
	      },

	    ObjectExpression: function(n) {
	        return '{' + n.properties.map(visit).join(',') + '}';
	      },

	    Property: function(n) {
	        memberDepth += 1;
	        var k = visit(n.key);
	        memberDepth -= 1;
	        return k + ':' + visit(n.value);
	      }
	  };

	  function codegen(ast) {
	    var result = {
	      code:    visit(ast),
	      globals: Object.keys(globals),
	      fields:  Object.keys(fields)
	    };
	    globals = {};
	    fields = {};
	    return result;
	  }

	  codegen.functions = functions;
	  codegen.constants = constants;

	  return codegen;
	}



	var vegaExpression = /*#__PURE__*/Object.freeze({
		ASTNode: ASTNode,
		parse: parser,
		codegen: codegen,
		functions: Functions,
		constants: Constants
	});

	var expressions = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function getName(node) {
	    var name = [];
	    if (node.type === 'Identifier') {
	        return [node.name];
	    }
	    if (node.type === 'Literal') {
	        return [node.value];
	    }
	    if (node.type === 'MemberExpression') {
	        name = name.concat(getName(node.object));
	        name = name.concat(getName(node.property));
	    }
	    return name;
	}
	function startsWithDatum(node) {
	    if (node.object.type === 'MemberExpression') {
	        return startsWithDatum(node.object);
	    }
	    return node.object.name === 'datum';
	}
	function getDependentFields(expression) {
	    var ast = vegaExpression.parse(expression);
	    var dependents = {};
	    ast.visit(function (node) {
	        if (node.type === 'MemberExpression' && startsWithDatum(node)) {
	            dependents[getName(node)
	                .slice(1)
	                .join('.')] = true;
	        }
	    });
	    return dependents;
	}
	exports.getDependentFields = getDependentFields;

	});

	unwrapExports(expressions);
	var expressions_1 = expressions.getDependentFields;

	var calculate = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	/**
	 * We don't know what a calculate node depends on so we should never move it beyond anything that produces fields.
	 */
	var CalculateNode = /** @class */ (function (_super) {
	    tslib_1.__extends(CalculateNode, _super);
	    function CalculateNode(parent, transform) {
	        var _this = _super.call(this, parent) || this;
	        _this.transform = transform;
	        _this._dependentFields = expressions.getDependentFields(_this.transform.calculate);
	        return _this;
	    }
	    CalculateNode.prototype.clone = function () {
	        return new CalculateNode(null, util.duplicate(this.transform));
	    };
	    CalculateNode.parseAllForSortIndex = function (parent, model) {
	        // get all the encoding with sort fields from model
	        model.forEachFieldDef(function (fieldDef, channel) {
	            if (!fielddef.isScaleFieldDef(fieldDef)) {
	                return;
	            }
	            if (sort.isSortArray(fieldDef.sort)) {
	                var field_1 = fieldDef.field, timeUnit_1 = fieldDef.timeUnit;
	                var sort$$1 = fieldDef.sort;
	                // generate `datum["a"] === val0 ? 0 : datum["a"] === val1 ? 1 : ... : n` via FieldEqualPredicate
	                var calculate = sort$$1
	                    .map(function (sortValue, i) {
	                    return predicate.fieldFilterExpression({ field: field_1, timeUnit: timeUnit_1, equal: sortValue }) + " ? " + i + " : ";
	                })
	                    .join('') + sort$$1.length;
	                parent = new CalculateNode(parent, {
	                    calculate: calculate,
	                    as: sortArrayIndexField(fieldDef, channel, { forAs: true })
	                });
	            }
	        });
	        return parent;
	    };
	    CalculateNode.prototype.producedFields = function () {
	        var out = {};
	        out[this.transform.as] = true;
	        return out;
	    };
	    CalculateNode.prototype.dependentFields = function () {
	        return this._dependentFields;
	    };
	    CalculateNode.prototype.assemble = function () {
	        return {
	            type: 'formula',
	            expr: this.transform.calculate,
	            as: this.transform.as
	        };
	    };
	    CalculateNode.prototype.hash = function () {
	        return "Calculate " + util.hash(this.transform);
	    };
	    return CalculateNode;
	}(dataflow.TransformNode));
	exports.CalculateNode = CalculateNode;
	function sortArrayIndexField(fieldDef, channel, opt) {
	    return fielddef.vgField(fieldDef, tslib_1.__assign({ prefix: channel, suffix: 'sort_index' }, (opt || {})));
	}
	exports.sortArrayIndexField = sortArrayIndexField;

	});

	unwrapExports(calculate);
	var calculate_1 = calculate.CalculateNode;
	var calculate_2 = calculate.sortArrayIndexField;

	var header$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });








	exports.HEADER_CHANNELS = ['row', 'column'];
	exports.HEADER_TYPES = ['header', 'footer'];
	function getHeaderType(orient) {
	    if (orient === 'top' || orient === 'left') {
	        return 'header';
	    }
	    return 'footer';
	}
	exports.getHeaderType = getHeaderType;
	function getTitleGroup(model, channel) {
	    var title = model.component.layoutHeaders[channel].title;
	    var config = model.config ? model.config : undefined;
	    var facetFieldDef = model.component.layoutHeaders[channel].facetFieldDef
	        ? model.component.layoutHeaders[channel].facetFieldDef
	        : undefined;
	    return {
	        name: channel + "-title",
	        type: 'group',
	        role: channel + "-title",
	        title: tslib_1.__assign({ text: title, offset: 10 }, (channel === 'row' ? { orient: 'left' } : {}), { style: 'guide-title' }, getHeaderProperties(config, facetFieldDef, header.HEADER_TITLE_PROPERTIES, header.HEADER_TITLE_PROPERTIES_MAP))
	    };
	}
	exports.getTitleGroup = getTitleGroup;
	function getHeaderGroups(model, channel) {
	    var layoutHeader = model.component.layoutHeaders[channel];
	    var groups = [];
	    for (var _i = 0, HEADER_TYPES_1 = exports.HEADER_TYPES; _i < HEADER_TYPES_1.length; _i++) {
	        var headerType = HEADER_TYPES_1[_i];
	        if (layoutHeader[headerType]) {
	            for (var _a = 0, _b = layoutHeader[headerType]; _a < _b.length; _a++) {
	                var headerCmpt = _b[_a];
	                groups.push(getHeaderGroup(model, channel, headerType, layoutHeader, headerCmpt));
	            }
	        }
	    }
	    return groups;
	}
	exports.getHeaderGroups = getHeaderGroups;
	// 0, (0,90), 90, (90, 180), 180, (180, 270), 270, (270, 0)
	function labelAlign(angle) {
	    // to keep angle in [0, 360)
	    angle = ((angle % 360) + 360) % 360;
	    if ((angle + 90) % 180 === 0) {
	        // for 90 and 270
	        return {}; // default center
	    }
	    else if (angle < 90 || 270 < angle) {
	        return { align: { value: 'right' } };
	    }
	    else if (135 <= angle && angle < 225) {
	        return { align: { value: 'left' } };
	    }
	    return {};
	}
	exports.labelAlign = labelAlign;
	function labelBaseline(angle) {
	    // to keep angle in [0, 360)
	    angle = ((angle % 360) + 360) % 360;
	    if (45 <= angle && angle <= 135) {
	        return { baseline: 'top' };
	    }
	    return { baseline: 'middle' };
	}
	exports.labelBaseline = labelBaseline;
	function getSort(facetFieldDef, channel) {
	    var sort$$1 = facetFieldDef.sort;
	    if (sort.isSortField(sort$$1)) {
	        return {
	            field: fielddef.vgField(sort$$1, { expr: 'datum' }),
	            order: sort$$1.order || 'ascending'
	        };
	    }
	    else if (vega_util_1.isArray(sort$$1)) {
	        return {
	            field: calculate.sortArrayIndexField(facetFieldDef, channel, { expr: 'datum' }),
	            order: 'ascending'
	        };
	    }
	    else {
	        return {
	            field: fielddef.vgField(facetFieldDef, { expr: 'datum' }),
	            order: sort$$1 || 'ascending'
	        };
	    }
	}
	function getHeaderGroup(model, channel, headerType, layoutHeader, headerCmpt) {
	    var _a;
	    if (headerCmpt) {
	        var title = null;
	        var facetFieldDef = layoutHeader.facetFieldDef;
	        if (facetFieldDef && headerCmpt.labels) {
	            var _b = facetFieldDef.header, header$$1 = _b === void 0 ? {} : _b;
	            var format = header$$1.format, labelAngle = header$$1.labelAngle;
	            var config = model.config ? model.config : undefined;
	            var update = tslib_1.__assign({}, labelAlign(labelAngle));
	            title = tslib_1.__assign({ text: common$2.formatSignalRef(facetFieldDef, format, 'parent', model.config), offset: 10 }, (channel === 'row' ? { orient: 'left' } : {}), { style: 'guide-label' }, (labelAngle !== undefined ? { angle: labelAngle } : {}), labelBaseline(labelAngle), getHeaderProperties(config, facetFieldDef, header.HEADER_LABEL_PROPERTIES, header.HEADER_LABEL_PROPERTIES_MAP), (util.keys(update).length > 0 ? { encode: { update: update } } : {}));
	        }
	        var axes = headerCmpt.axes;
	        var hasAxes = axes && axes.length > 0;
	        if (title || hasAxes) {
	            var sizeChannel = channel === 'row' ? 'height' : 'width';
	            return tslib_1.__assign({ name: model.getName(channel + "_" + headerType), type: 'group', role: channel + "-" + headerType }, (layoutHeader.facetFieldDef
	                ? {
	                    from: { data: model.getName(channel + '_domain') },
	                    sort: getSort(facetFieldDef, channel)
	                }
	                : {}), (title ? { title: title } : {}), (headerCmpt.sizeSignal
	                ? {
	                    encode: {
	                        update: (_a = {},
	                            _a[sizeChannel] = headerCmpt.sizeSignal,
	                            _a)
	                    }
	                }
	                : {}), (hasAxes ? { axes: axes } : {}));
	        }
	    }
	    return null;
	}
	exports.getHeaderGroup = getHeaderGroup;
	function getHeaderProperties(config, facetFieldDef, properties, propertiesMap) {
	    var props = {};
	    for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
	        var prop = properties_1[_i];
	        if (config && config.header) {
	            if (config.header[prop]) {
	                props[propertiesMap[prop]] = config.header[prop];
	            }
	        }
	        if (facetFieldDef && facetFieldDef.header) {
	            if (facetFieldDef.header[prop]) {
	                props[propertiesMap[prop]] = facetFieldDef.header[prop];
	            }
	        }
	    }
	    return props;
	}
	exports.getHeaderProperties = getHeaderProperties;

	});

	unwrapExports(header$2);
	var header_2$1 = header$2.HEADER_CHANNELS;
	var header_3$1 = header$2.HEADER_TYPES;
	var header_4$1 = header$2.getHeaderType;
	var header_5 = header$2.getTitleGroup;
	var header_6 = header$2.getHeaderGroups;
	var header_7 = header$2.labelAlign;
	var header_8 = header$2.labelBaseline;
	var header_9 = header$2.getHeaderGroup;
	var header_10 = header$2.getHeaderProperties;

	var assemble$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	function assembleLayoutSignals(model$$1) {
	    return [].concat(sizeSignals(model$$1, 'width'), sizeSignals(model$$1, 'height'));
	}
	exports.assembleLayoutSignals = assembleLayoutSignals;
	function sizeSignals(model$$1, sizeType) {
	    var channel = sizeType === 'width' ? 'x' : 'y';
	    var size = model$$1.component.layoutSize.get(sizeType);
	    if (!size || size === 'merged') {
	        return [];
	    }
	    // Read size signal name from name map, just in case it is the top-level size signal that got renamed.
	    var name = model$$1.getSizeSignalRef(sizeType).signal;
	    if (size === 'range-step') {
	        var scaleComponent = model$$1.getScaleComponent(channel);
	        if (scaleComponent) {
	            var type = scaleComponent.get('type');
	            var range = scaleComponent.get('range');
	            if (scale.hasDiscreteDomain(type) && vega_schema.isVgRangeStep(range)) {
	                var scaleName = model$$1.scaleName(channel);
	                if (model.isFacetModel(model$$1.parent)) {
	                    // If parent is facet and this is an independent scale, return only signal signal
	                    // as the width/height will be calculated using the cardinality from
	                    // facet's aggregate rather than reading from scale domain
	                    var parentResolve = model$$1.parent.component.resolve;
	                    if (parentResolve.scale[channel] === 'independent') {
	                        return [stepSignal(scaleName, range)];
	                    }
	                }
	                return [
	                    stepSignal(scaleName, range),
	                    {
	                        name: name,
	                        update: sizeExpr(scaleName, scaleComponent, "domain('" + scaleName + "').length")
	                    }
	                ];
	            }
	        }
	        /* istanbul ignore next: Condition should not happen -- only for warning in development. */
	        throw new Error('layout size is range step although there is no rangeStep.');
	    }
	    else {
	        return [
	            {
	                name: name,
	                value: size
	            }
	        ];
	    }
	}
	exports.sizeSignals = sizeSignals;
	function stepSignal(scaleName, range) {
	    return {
	        name: scaleName + '_step',
	        value: range.step
	    };
	}
	function sizeExpr(scaleName, scaleComponent, cardinality) {
	    var type = scaleComponent.get('type');
	    var padding = scaleComponent.get('padding');
	    var paddingOuter = util.getFirstDefined(scaleComponent.get('paddingOuter'), padding);
	    var paddingInner = scaleComponent.get('paddingInner');
	    paddingInner =
	        type === 'band'
	            ? // only band has real paddingInner
	                paddingInner !== undefined
	                    ? paddingInner
	                    : padding
	            : // For point, as calculated in https://github.com/vega/vega-scale/blob/master/src/band.js#L128,
	                // it's equivalent to have paddingInner = 1 since there is only n-1 steps between n points.
	                1;
	    return "bandspace(" + cardinality + ", " + paddingInner + ", " + paddingOuter + ") * " + scaleName + "_step";
	}
	exports.sizeExpr = sizeExpr;

	});

	unwrapExports(assemble$2);
	var assemble_1$1 = assemble$2.assembleLayoutSignals;
	var assemble_2$1 = assemble$2.sizeSignals;
	var assemble_3 = assemble$2.sizeExpr;

	var resolve = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var log = tslib_1.__importStar(log$2);


	function defaultScaleResolve(channel$$1, model$$1) {
	    if (model.isLayerModel(model$$1) || model.isFacetModel(model$$1)) {
	        return 'shared';
	    }
	    else if (model.isConcatModel(model$$1) || model.isRepeatModel(model$$1)) {
	        return util.contains(channel.POSITION_SCALE_CHANNELS, channel$$1) ? 'independent' : 'shared';
	    }
	    /* istanbul ignore next: should never reach here. */
	    throw new Error('invalid model type for resolve');
	}
	exports.defaultScaleResolve = defaultScaleResolve;
	function parseGuideResolve(resolve, channel$$1) {
	    var channelScaleResolve = resolve.scale[channel$$1];
	    var guide = util.contains(channel.POSITION_SCALE_CHANNELS, channel$$1) ? 'axis' : 'legend';
	    if (channelScaleResolve === 'independent') {
	        if (resolve[guide][channel$$1] === 'shared') {
	            log.warn(log.message.independentScaleMeansIndependentGuide(channel$$1));
	        }
	        return 'independent';
	    }
	    return resolve[guide][channel$$1] || 'shared';
	}
	exports.parseGuideResolve = parseGuideResolve;

	});

	unwrapExports(resolve);
	var resolve_1 = resolve.defaultScaleResolve;
	var resolve_2 = resolve.parseGuideResolve;

	var split = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var log = tslib_1.__importStar(log$2);

	/**
	 * Generic class for storing properties that are explicitly specified
	 * and implicitly determined by the compiler.
	 * This is important for scale/axis/legend merging as
	 * we want to prioritize properties that users explicitly specified.
	 */
	var Split = /** @class */ (function () {
	    function Split(explicit, implicit) {
	        if (explicit === void 0) { explicit = {}; }
	        if (implicit === void 0) { implicit = {}; }
	        this.explicit = explicit;
	        this.implicit = implicit;
	    }
	    Split.prototype.clone = function () {
	        return new Split(util.duplicate(this.explicit), util.duplicate(this.implicit));
	    };
	    Split.prototype.combine = function () {
	        // FIXME remove "as any".
	        // Add "as any" to avoid an error "Spread types may only be created from object types".
	        return tslib_1.__assign({}, this.explicit, this.implicit);
	    };
	    Split.prototype.get = function (key) {
	        // Explicit has higher precedence
	        return util.getFirstDefined(this.explicit[key], this.implicit[key]);
	    };
	    Split.prototype.getWithExplicit = function (key) {
	        // Explicit has higher precedence
	        if (this.explicit[key] !== undefined) {
	            return { explicit: true, value: this.explicit[key] };
	        }
	        else if (this.implicit[key] !== undefined) {
	            return { explicit: false, value: this.implicit[key] };
	        }
	        return { explicit: false, value: undefined };
	    };
	    Split.prototype.setWithExplicit = function (key, value) {
	        if (value.value !== undefined) {
	            this.set(key, value.value, value.explicit);
	        }
	    };
	    Split.prototype.set = function (key, value, explicit) {
	        delete this[explicit ? 'implicit' : 'explicit'][key];
	        this[explicit ? 'explicit' : 'implicit'][key] = value;
	        return this;
	    };
	    Split.prototype.copyKeyFromSplit = function (key, s) {
	        // Explicit has higher precedence
	        if (s.explicit[key] !== undefined) {
	            this.set(key, s.explicit[key], true);
	        }
	        else if (s.implicit[key] !== undefined) {
	            this.set(key, s.implicit[key], false);
	        }
	    };
	    Split.prototype.copyKeyFromObject = function (key, s) {
	        // Explicit has higher precedence
	        if (s[key] !== undefined) {
	            this.set(key, s[key], true);
	        }
	    };
	    /**
	     * Merge split object into this split object. Properties from the other split
	     * overwrite properties from this split.
	     */
	    Split.prototype.copyAll = function (other) {
	        for (var _i = 0, _a = util.keys(other.combine()); _i < _a.length; _i++) {
	            var key = _a[_i];
	            var val = other.getWithExplicit(key);
	            this.setWithExplicit(key, val);
	        }
	    };
	    return Split;
	}());
	exports.Split = Split;
	function makeExplicit(value) {
	    return {
	        explicit: true,
	        value: value
	    };
	}
	exports.makeExplicit = makeExplicit;
	function makeImplicit(value) {
	    return {
	        explicit: false,
	        value: value
	    };
	}
	exports.makeImplicit = makeImplicit;
	function tieBreakByComparing(compare) {
	    return function (v1, v2, property, propertyOf) {
	        var diff = compare(v1.value, v2.value);
	        if (diff > 0) {
	            return v1;
	        }
	        else if (diff < 0) {
	            return v2;
	        }
	        return defaultTieBreaker(v1, v2, property, propertyOf);
	    };
	}
	exports.tieBreakByComparing = tieBreakByComparing;
	function defaultTieBreaker(v1, v2, property, propertyOf) {
	    if (v1.explicit && v2.explicit) {
	        log.warn(log.message.mergeConflictingProperty(property, propertyOf, v1.value, v2.value));
	    }
	    // If equal score, prefer v1.
	    return v1;
	}
	exports.defaultTieBreaker = defaultTieBreaker;
	function mergeValuesWithExplicit(v1, v2, property, propertyOf, tieBreaker) {
	    if (tieBreaker === void 0) { tieBreaker = defaultTieBreaker; }
	    if (v1 === undefined || v1.value === undefined) {
	        // For first run
	        return v2;
	    }
	    if (v1.explicit && !v2.explicit) {
	        return v1;
	    }
	    else if (v2.explicit && !v1.explicit) {
	        return v2;
	    }
	    else if (util.stringify(v1.value) === util.stringify(v2.value)) {
	        return v1;
	    }
	    else {
	        return tieBreaker(v1, v2, property, propertyOf);
	    }
	}
	exports.mergeValuesWithExplicit = mergeValuesWithExplicit;

	});

	unwrapExports(split);
	var split_1 = split.Split;
	var split_2 = split.makeExplicit;
	var split_3 = split.makeImplicit;
	var split_4 = split.tieBreakByComparing;
	var split_5 = split.defaultTieBreaker;
	var split_6 = split.mergeValuesWithExplicit;

	var component = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var LegendComponent = /** @class */ (function (_super) {
	    tslib_1.__extends(LegendComponent, _super);
	    function LegendComponent() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return LegendComponent;
	}(split.Split));
	exports.LegendComponent = LegendComponent;

	});

	unwrapExports(component);
	var component_1 = component.LegendComponent;

	var encode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });








	var mixins$$1 = tslib_1.__importStar(mixins);
	function symbols(fieldDef, symbolsSpec, model, channel$$1, legendCmp) {
	    if (legendCmp.get('type') === 'gradient') {
	        return undefined;
	    }
	    var out = tslib_1.__assign({}, common$2.applyMarkConfig({}, model, mark.FILL_STROKE_CONFIG), mixins$$1.color(model)); // FIXME: remove this when VgEncodeEntry is compatible with SymbolEncodeEntry
	    switch (model.mark) {
	        case mark.BAR:
	        case mark.TICK:
	        case mark.TEXT:
	            out.shape = { value: 'square' };
	            break;
	        case mark.CIRCLE:
	        case mark.SQUARE:
	            out.shape = { value: model.mark };
	            break;
	        case mark.POINT:
	        case mark.LINE:
	        case mark.GEOSHAPE:
	        case mark.AREA:
	            // use default circle
	            break;
	    }
	    var markDef = model.markDef, encoding = model.encoding;
	    var filled = markDef.filled;
	    var opacity = getMaxValue(encoding.opacity) || markDef.opacity;
	    if (out.fill) {
	        // for fill legend, we don't want any fill in symbol
	        if (channel$$1 === 'fill' || (filled && channel$$1 === channel.COLOR)) {
	            delete out.fill;
	        }
	        else {
	            if (out.fill['field']) {
	                // For others, set fill to some opaque value (or nothing if a color is already set)
	                if (legendCmp.get('symbolFillColor')) {
	                    delete out.fill;
	                }
	                else {
	                    out.fill = { value: 'black' };
	                    out.fillOpacity = { value: opacity || 1 };
	                }
	            }
	            else if (vega_util_1.isArray(out.fill)) {
	                var fill = getFirstConditionValue(encoding.fill || encoding.color) ||
	                    markDef.fill ||
	                    (filled && markDef.color);
	                if (fill) {
	                    out.fill = { value: fill };
	                }
	            }
	        }
	    }
	    if (out.stroke) {
	        if (channel$$1 === 'stroke' || (!filled && channel$$1 === channel.COLOR)) {
	            delete out.stroke;
	        }
	        else {
	            if (out.stroke['field']) {
	                // For others, remove stroke field
	                delete out.stroke;
	            }
	            else if (vega_util_1.isArray(out.stroke)) {
	                var stroke = util.getFirstDefined(getFirstConditionValue(encoding.stroke || encoding.color), markDef.stroke, filled ? markDef.color : undefined);
	                if (stroke) {
	                    out.stroke = { value: stroke };
	                }
	            }
	        }
	    }
	    if (out.fill && out.fill['value'] !== 'transparent' && !out.stroke) {
	        // for non color channel's legend, we need to override symbol stroke config from Vega config
	        out.stroke = { value: 'transparent' };
	    }
	    if (channel$$1 !== channel.SHAPE) {
	        var shape = getFirstConditionValue(encoding.shape) || markDef.shape;
	        if (shape) {
	            out.shape = { value: shape };
	        }
	    }
	    if (channel$$1 !== channel.OPACITY) {
	        if (opacity) {
	            // only apply opacity if it is neither zero or undefined
	            out.opacity = { value: opacity };
	        }
	    }
	    out = tslib_1.__assign({}, out, symbolsSpec);
	    return util.keys(out).length > 0 ? out : undefined;
	}
	exports.symbols = symbols;
	function gradient(fieldDef, gradientSpec, model, channel$$1, legendCmp) {
	    var out = {};
	    if (legendCmp.get('type') === 'gradient') {
	        var opacity = getMaxValue(model.encoding.opacity) || model.markDef.opacity;
	        if (opacity) {
	            // only apply opacity if it is neither zero or undefined
	            out.opacity = { value: opacity };
	        }
	    }
	    out = tslib_1.__assign({}, out, gradientSpec);
	    return util.keys(out).length > 0 ? out : undefined;
	}
	exports.gradient = gradient;
	function labels(fieldDef, labelsSpec, model, channel$$1, legendCmp) {
	    var legend = model.legend(channel$$1);
	    var config = model.config;
	    var out = {};
	    if (fielddef.isTimeFieldDef(fieldDef)) {
	        var isUTCScale = model.getScaleComponent(channel$$1).get('type') === scale.ScaleType.UTC;
	        var expr = common$2.timeFormatExpression('datum.value', fieldDef.timeUnit, legend.format, config.legend.shortTimeLabels, config.timeFormat, isUTCScale);
	        labelsSpec = tslib_1.__assign({}, (expr ? { text: { signal: expr } } : {}), labelsSpec);
	    }
	    out = tslib_1.__assign({}, out, labelsSpec);
	    return util.keys(out).length > 0 ? out : undefined;
	}
	exports.labels = labels;
	function getMaxValue(channelDef) {
	    return getConditionValue(channelDef, function (v, conditionalDef) { return Math.max(v, conditionalDef.value); });
	}
	function getFirstConditionValue(channelDef) {
	    return getConditionValue(channelDef, function (v, conditionalDef) {
	        return util.getFirstDefined(v, conditionalDef.value);
	    });
	}
	function getConditionValue(channelDef, reducer) {
	    if (fielddef.hasConditionalValueDef(channelDef)) {
	        return (vega_util_1.isArray(channelDef.condition) ? channelDef.condition : [channelDef.condition]).reduce(reducer, channelDef.value);
	    }
	    else if (fielddef.isValueDef(channelDef)) {
	        return channelDef.value;
	    }
	    return undefined;
	}

	});

	unwrapExports(encode);
	var encode_1 = encode.symbols;
	var encode_2 = encode.gradient;
	var encode_3 = encode.labels;

	var properties = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function values(legend, fieldDef) {
	    var vals = legend.values;
	    if (vals) {
	        return fielddef.valueArray(fieldDef, vals);
	    }
	    return undefined;
	}
	exports.values = values;
	function clipHeight(scaleType) {
	    if (scale.hasContinuousDomain(scaleType)) {
	        return 20;
	    }
	    return undefined;
	}
	exports.clipHeight = clipHeight;
	function labelOverlap(scaleType) {
	    if (util.contains(['quantile', 'threshold', 'log'], scaleType)) {
	        return 'greedy';
	    }
	    return undefined;
	}
	exports.labelOverlap = labelOverlap;

	});

	unwrapExports(properties);
	var properties_1 = properties.values;
	var properties_2 = properties.clipHeight;
	var properties_3 = properties.labelOverlap;

	var parse$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });











	var encode$$1 = tslib_1.__importStar(encode);
	var properties$$1 = tslib_1.__importStar(properties);
	function parseLegend(model$$1) {
	    if (model.isUnitModel(model$$1)) {
	        model$$1.component.legends = parseUnitLegend(model$$1);
	    }
	    else {
	        model$$1.component.legends = parseNonUnitLegend(model$$1);
	    }
	}
	exports.parseLegend = parseLegend;
	function parseUnitLegend(model$$1) {
	    var encoding = model$$1.encoding;
	    return [channel.COLOR, channel.FILL, channel.STROKE, channel.SIZE, channel.SHAPE, channel.OPACITY].reduce(function (legendComponent, channel$$1) {
	        var def = encoding[channel$$1];
	        if (model$$1.legend(channel$$1) &&
	            model$$1.getScaleComponent(channel$$1) &&
	            !(fielddef.isFieldDef(def) && (channel$$1 === channel.SHAPE && def.type === type.GEOJSON))) {
	            legendComponent[channel$$1] = parseLegendForChannel(model$$1, channel$$1);
	        }
	        return legendComponent;
	    }, {});
	}
	function getLegendDefWithScale(model$$1, channel$$1) {
	    var _a;
	    // For binned field with continuous scale, use a special scale so we can overrride the mark props and labels
	    switch (channel$$1) {
	        case channel.COLOR:
	            var scale = model$$1.scaleName(channel.COLOR);
	            return model$$1.markDef.filled ? { fill: scale } : { stroke: scale };
	        case channel.FILL:
	        case channel.STROKE:
	        case channel.SIZE:
	        case channel.SHAPE:
	        case channel.OPACITY:
	            return _a = {}, _a[channel$$1] = model$$1.scaleName(channel$$1), _a;
	    }
	}
	function isExplicit(value, property, legend$$1, fieldDef) {
	    switch (property) {
	        case 'values':
	            // specified legend.values is already respected, but may get transformed.
	            return !!legend$$1.values;
	        case 'title':
	            // title can be explicit if fieldDef.title is set
	            if (property === 'title' && value === fieldDef.title) {
	                return true;
	            }
	    }
	    // Otherwise, things are explicit if the returned value matches the specified property
	    return value === legend$$1[property];
	}
	function parseLegendForChannel(model$$1, channel$$1) {
	    var fieldDef = model$$1.fieldDef(channel$$1);
	    var legend$$1 = model$$1.legend(channel$$1);
	    var legendCmpt = new component.LegendComponent({}, getLegendDefWithScale(model$$1, channel$$1));
	    for (var _i = 0, LEGEND_PROPERTIES_1 = legend.LEGEND_PROPERTIES; _i < LEGEND_PROPERTIES_1.length; _i++) {
	        var property = LEGEND_PROPERTIES_1[_i];
	        var value = getProperty(property, legend$$1, channel$$1, model$$1);
	        if (value !== undefined) {
	            var explicit = isExplicit(value, property, legend$$1, fieldDef);
	            if (explicit || model$$1.config.legend[property] === undefined) {
	                legendCmpt.set(property, value, explicit);
	            }
	        }
	    }
	    var legendEncoding = legend$$1.encoding || {};
	    var legendEncode = ['labels', 'legend', 'title', 'symbols', 'gradient'].reduce(function (e, part) {
	        var legendEncodingPart = common$2.guideEncodeEntry(legendEncoding[part] || {}, model$$1);
	        var value = encode$$1[part]
	            ? encode$$1[part](fieldDef, legendEncodingPart, model$$1, channel$$1, legendCmpt) // apply rule
	            : legendEncodingPart; // no rule -- just default values
	        if (value !== undefined && util.keys(value).length > 0) {
	            e[part] = { update: value };
	        }
	        return e;
	    }, {});
	    if (util.keys(legendEncode).length > 0) {
	        legendCmpt.set('encode', legendEncode, !!legend$$1.encoding);
	    }
	    return legendCmpt;
	}
	exports.parseLegendForChannel = parseLegendForChannel;
	function getProperty(property, specifiedLegend, channel$$1, model$$1) {
	    var fieldDef = model$$1.fieldDef(channel$$1);
	    switch (property) {
	        case 'format':
	            // We don't include temporal field here as we apply format in encode block
	            return common$2.numberFormat(fieldDef, specifiedLegend.format, model$$1.config);
	        case 'title':
	            return fielddef.title(fieldDef, model$$1.config, { allowDisabling: true }) || undefined;
	        // TODO: enable when https://github.com/vega/vega/issues/1351 is fixed
	        // case 'clipHeight':
	        //   return getFirstDefined(specifiedLegend.clipHeight, properties.clipHeight(model.getScaleComponent(channel).get('type')));
	        case 'labelOverlap':
	            return util.getFirstDefined(specifiedLegend.labelOverlap, properties$$1.labelOverlap(model$$1.getScaleComponent(channel$$1).get('type')));
	        case 'values':
	            return properties$$1.values(specifiedLegend, fieldDef);
	    }
	    // Otherwise, return specified property.
	    return specifiedLegend[property];
	}
	function parseNonUnitLegend(model$$1) {
	    var _a = model$$1.component, legends = _a.legends, resolve$$1 = _a.resolve;
	    var _loop_1 = function (child) {
	        parseLegend(child);
	        util.keys(child.component.legends).forEach(function (channel$$1) {
	            resolve$$1.legend[channel$$1] = resolve.parseGuideResolve(model$$1.component.resolve, channel$$1);
	            if (resolve$$1.legend[channel$$1] === 'shared') {
	                // If the resolve says shared (and has not been overridden)
	                // We will try to merge and see if there is a conflict
	                legends[channel$$1] = mergeLegendComponent(legends[channel$$1], child.component.legends[channel$$1]);
	                if (!legends[channel$$1]) {
	                    // If merge returns nothing, there is a conflict so we cannot make the legend shared.
	                    // Thus, mark legend as independent and remove the legend component.
	                    resolve$$1.legend[channel$$1] = 'independent';
	                    delete legends[channel$$1];
	                }
	            }
	        });
	    };
	    for (var _i = 0, _b = model$$1.children; _i < _b.length; _i++) {
	        var child = _b[_i];
	        _loop_1(child);
	    }
	    util.keys(legends).forEach(function (channel$$1) {
	        for (var _i = 0, _a = model$$1.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            if (!child.component.legends[channel$$1]) {
	                // skip if the child does not have a particular legend
	                continue;
	            }
	            if (resolve$$1.legend[channel$$1] === 'shared') {
	                // After merging shared legend, make sure to remove legend from child
	                delete child.component.legends[channel$$1];
	            }
	        }
	    });
	    return legends;
	}
	function mergeLegendComponent(mergedLegend, childLegend) {
	    if (!mergedLegend) {
	        return childLegend.clone();
	    }
	    var mergedOrient = mergedLegend.getWithExplicit('orient');
	    var childOrient = childLegend.getWithExplicit('orient');
	    if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
	        // TODO: throw warning if resolve is explicit (We don't have info about explicit/implicit resolve yet.)
	        // Cannot merge due to inconsistent orient
	        return undefined;
	    }
	    var typeMerged = false;
	    var _loop_2 = function (prop) {
	        var mergedValueWithExplicit = split.mergeValuesWithExplicit(mergedLegend.getWithExplicit(prop), childLegend.getWithExplicit(prop), prop, 'legend', 
	        // Tie breaker function
	        function (v1, v2) {
	            switch (prop) {
	                case 'title':
	                    return common$2.mergeTitleComponent(v1, v2);
	                case 'type':
	                    // There are only two types. If we have different types, then prefer symbol over gradient.
	                    typeMerged = true;
	                    return split.makeImplicit('symbol');
	            }
	            return split.defaultTieBreaker(v1, v2, prop, 'legend');
	        });
	        mergedLegend.setWithExplicit(prop, mergedValueWithExplicit);
	    };
	    // Otherwise, let's merge
	    for (var _i = 0, VG_LEGEND_PROPERTIES_1 = legend.VG_LEGEND_PROPERTIES; _i < VG_LEGEND_PROPERTIES_1.length; _i++) {
	        var prop = VG_LEGEND_PROPERTIES_1[_i];
	        _loop_2(prop);
	    }
	    if (typeMerged) {
	        if (((mergedLegend.implicit || {}).encode || {}).gradient) {
	            util.deleteNestedProperty(mergedLegend.implicit, ['encode', 'gradient']);
	        }
	        if (((mergedLegend.explicit || {}).encode || {}).gradient) {
	            util.deleteNestedProperty(mergedLegend.explicit, ['encode', 'gradient']);
	        }
	    }
	    return mergedLegend;
	}
	exports.mergeLegendComponent = mergeLegendComponent;

	});

	unwrapExports(parse$2);
	var parse_1 = parse$2.parseLegend;
	var parse_2 = parse$2.parseLegendForChannel;
	var parse_3 = parse$2.mergeLegendComponent;

	var assemble$4 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function assembleLegends(model) {
	    var legendComponentIndex = model.component.legends;
	    var legendByDomain = {};
	    for (var _i = 0, _a = util.keys(legendComponentIndex); _i < _a.length; _i++) {
	        var channel = _a[_i];
	        var scaleComponent = model.getScaleComponent(channel);
	        var domainHash = util.stringify(scaleComponent.domains);
	        if (legendByDomain[domainHash]) {
	            for (var _b = 0, _c = legendByDomain[domainHash]; _b < _c.length; _b++) {
	                var mergedLegendComponent = _c[_b];
	                var merged = parse$2.mergeLegendComponent(mergedLegendComponent, legendComponentIndex[channel]);
	                if (!merged) {
	                    // If cannot merge, need to add this legend separately
	                    legendByDomain[domainHash].push(legendComponentIndex[channel]);
	                }
	            }
	        }
	        else {
	            legendByDomain[domainHash] = [legendComponentIndex[channel].clone()];
	        }
	    }
	    return util.flatten(util.vals(legendByDomain)).map(function (legendCmpt) { return legendCmpt.combine(); });
	}
	exports.assembleLegends = assembleLegends;

	});

	unwrapExports(assemble$4);
	var assemble_1$2 = assemble$4.assembleLegends;

	var assemble$6 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	function assembleProjections(model$$1) {
	    if (model.isLayerModel(model$$1) || model.isConcatModel(model$$1) || model.isRepeatModel(model$$1)) {
	        return assembleProjectionsForModelAndChildren(model$$1);
	    }
	    else {
	        return assembleProjectionForModel(model$$1);
	    }
	}
	exports.assembleProjections = assembleProjections;
	function assembleProjectionsForModelAndChildren(model$$1) {
	    return model$$1.children.reduce(function (projections, child) {
	        return projections.concat(child.assembleProjections());
	    }, assembleProjectionForModel(model$$1));
	}
	exports.assembleProjectionsForModelAndChildren = assembleProjectionsForModelAndChildren;
	function assembleProjectionForModel(model$$1) {
	    var component = model$$1.component.projection;
	    if (!component || component.merged) {
	        return [];
	    }
	    var projection = component.combine();
	    var name = projection.name, rest = tslib_1.__rest(projection, ["name"]); // we need to extract name so that it is always present in the output and pass TS type validation
	    var size = {
	        signal: "[" + component.size.map(function (ref) { return ref.signal; }).join(', ') + "]"
	    };
	    var fit = component.data.reduce(function (sources, data) {
	        var source = vega_schema.isSignalRef(data) ? data.signal : "data('" + model$$1.lookupDataSource(data) + "')";
	        if (!util.contains(sources, source)) {
	            // build a unique list of sources
	            sources.push(source);
	        }
	        return sources;
	    }, []);
	    if (fit.length <= 0) {
	        throw new Error("Projection's fit didn't find any data sources");
	    }
	    return [
	        tslib_1.__assign({ name: name,
	            size: size, fit: {
	                signal: fit.length > 1 ? "[" + fit.join(', ') + "]" : fit[0]
	            } }, rest)
	    ];
	}
	exports.assembleProjectionForModel = assembleProjectionForModel;

	});

	unwrapExports(assemble$6);
	var assemble_1$3 = assemble$6.assembleProjections;
	var assemble_2$2 = assemble$6.assembleProjectionsForModelAndChildren;
	var assemble_3$1 = assemble$6.assembleProjectionForModel;

	var projection = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PROJECTION_PROPERTIES = [
	    'type',
	    'clipAngle',
	    'clipExtent',
	    'center',
	    'rotate',
	    'precision',
	    'coefficient',
	    'distance',
	    'fraction',
	    'lobes',
	    'parallel',
	    'radius',
	    'ratio',
	    'spacing',
	    'tilt'
	];

	});

	unwrapExports(projection);
	var projection_1 = projection.PROJECTION_PROPERTIES;

	var component$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var ProjectionComponent = /** @class */ (function (_super) {
	    tslib_1.__extends(ProjectionComponent, _super);
	    function ProjectionComponent(name, specifiedProjection, size, data) {
	        var _this = _super.call(this, tslib_1.__assign({}, specifiedProjection), // all explicit properties of projection
	        { name: name } // name as initial implicit property
	        ) || this;
	        _this.specifiedProjection = specifiedProjection;
	        _this.size = size;
	        _this.data = data;
	        _this.merged = false;
	        return _this;
	    }
	    return ProjectionComponent;
	}(split.Split));
	exports.ProjectionComponent = ProjectionComponent;

	});

	unwrapExports(component$2);
	var component_1$1 = component$2.ProjectionComponent;

	var parse$4 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });








	function parseProjection(model$$1) {
	    if (model.isUnitModel(model$$1)) {
	        model$$1.component.projection = parseUnitProjection(model$$1);
	    }
	    else {
	        // because parse happens from leaves up (unit specs before layer spec),
	        // we can be sure that the above if statement has already occurred
	        // and therefore we have access to child.component.projection
	        // for each of model's children
	        model$$1.component.projection = parseNonUnitProjections(model$$1);
	    }
	}
	exports.parseProjection = parseProjection;
	function parseUnitProjection(model$$1) {
	    var specifiedProjection = model$$1.specifiedProjection, config = model$$1.config, hasProjection = model$$1.hasProjection;
	    if (hasProjection) {
	        var data_2 = [];
	        [[channel.LONGITUDE, channel.LATITUDE], [channel.LONGITUDE2, channel.LATITUDE2]].forEach(function (posssiblePair) {
	            if (model$$1.channelHasField(posssiblePair[0]) || model$$1.channelHasField(posssiblePair[1])) {
	                data_2.push({
	                    signal: model$$1.getName("geojson_" + data_2.length)
	                });
	            }
	        });
	        if (model$$1.channelHasField(channel.SHAPE) && model$$1.fieldDef(channel.SHAPE).type === type.GEOJSON) {
	            data_2.push({
	                signal: model$$1.getName("geojson_" + data_2.length)
	            });
	        }
	        if (data_2.length === 0) {
	            // main source is geojson, so we can just use that
	            data_2.push(model$$1.requestDataName(data.MAIN));
	        }
	        return new component$2.ProjectionComponent(model$$1.projectionName(true), tslib_1.__assign({}, (config.projection || {}), (specifiedProjection || {})), [model$$1.getSizeSignalRef('width'), model$$1.getSizeSignalRef('height')], data_2);
	    }
	    return undefined;
	}
	function mergeIfNoConflict(first, second) {
	    var allPropertiesShared = util.every(projection.PROJECTION_PROPERTIES, function (prop) {
	        // neither has the poperty
	        if (!first.explicit.hasOwnProperty(prop) && !second.explicit.hasOwnProperty(prop)) {
	            return true;
	        }
	        // both have property and an equal value for property
	        if (first.explicit.hasOwnProperty(prop) &&
	            second.explicit.hasOwnProperty(prop) &&
	            // some properties might be signals or objects and require hashing for comparison
	            util.stringify(first.get(prop)) === util.stringify(second.get(prop))) {
	            return true;
	        }
	        return false;
	    });
	    var size = util.stringify(first.size) === util.stringify(second.size);
	    if (size) {
	        if (allPropertiesShared) {
	            return first;
	        }
	        else if (util.stringify(first.explicit) === util.stringify({})) {
	            return second;
	        }
	        else if (util.stringify(second.explicit) === util.stringify({})) {
	            return first;
	        }
	    }
	    // if all properties don't match, let each unit spec have its own projection
	    return null;
	}
	function parseNonUnitProjections(model$$1) {
	    if (model$$1.children.length === 0) {
	        return undefined;
	    }
	    var nonUnitProjection;
	    var mergable = util.every(model$$1.children, function (child) {
	        parseProjection(child);
	        var projection$$1 = child.component.projection;
	        if (!projection$$1) {
	            // child layer does not use a projection
	            return true;
	        }
	        else if (!nonUnitProjection) {
	            // cached 'projection' is null, cache this one
	            nonUnitProjection = projection$$1;
	            return true;
	        }
	        else {
	            var merge = mergeIfNoConflict(nonUnitProjection, projection$$1);
	            if (merge) {
	                nonUnitProjection = merge;
	            }
	            return !!merge;
	        }
	    });
	    // it cached one and all other children share the same projection,
	    if (nonUnitProjection && mergable) {
	        // so we can elevate it to the layer level
	        var name_1 = model$$1.projectionName(true);
	        var modelProjection_1 = new component$2.ProjectionComponent(name_1, nonUnitProjection.specifiedProjection, nonUnitProjection.size, util.duplicate(nonUnitProjection.data));
	        // rename and assign all others as merged
	        model$$1.children.forEach(function (child) {
	            if (child.component.projection) {
	                modelProjection_1.data = modelProjection_1.data.concat(child.component.projection.data);
	                child.renameProjection(child.component.projection.get('name'), name_1);
	                child.component.projection.merged = true;
	            }
	        });
	        return modelProjection_1;
	    }
	    return undefined;
	}

	});

	unwrapExports(parse$4);
	var parse_1$1 = parse$4.parseProjection;

	var aggregate$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var log = tslib_1.__importStar(log$2);



	function addDimension(dims, channel$$1, fieldDef) {
	    if (bin.isBinning(fieldDef.bin)) {
	        dims[fielddef.vgField(fieldDef, {})] = true;
	        dims[fielddef.vgField(fieldDef, { binSuffix: 'end' })] = true;
	        if (common$2.binRequiresRange(fieldDef, channel$$1)) {
	            dims[fielddef.vgField(fieldDef, { binSuffix: 'range' })] = true;
	        }
	    }
	    else {
	        dims[fielddef.vgField(fieldDef)] = true;
	    }
	    return dims;
	}
	function mergeMeasures(parentMeasures, childMeasures) {
	    for (var f in childMeasures) {
	        if (childMeasures.hasOwnProperty(f)) {
	            // when we merge a measure, we either have to add an aggregation operator or even a new field
	            var ops = childMeasures[f];
	            for (var op in ops) {
	                if (ops.hasOwnProperty(op)) {
	                    if (f in parentMeasures) {
	                        // add operator to existing measure field
	                        parentMeasures[f][op] = ops[op];
	                    }
	                    else {
	                        parentMeasures[f] = { op: ops[op] };
	                    }
	                }
	            }
	        }
	    }
	}
	var AggregateNode = /** @class */ (function (_super) {
	    tslib_1.__extends(AggregateNode, _super);
	    /**
	     * @param dimensions string set for dimensions
	     * @param measures dictionary mapping field name => dict of aggregation functions and names to use
	     */
	    function AggregateNode(parent, dimensions, measures) {
	        var _this = _super.call(this, parent) || this;
	        _this.dimensions = dimensions;
	        _this.measures = measures;
	        return _this;
	    }
	    AggregateNode.prototype.clone = function () {
	        return new AggregateNode(null, tslib_1.__assign({}, this.dimensions), util.duplicate(this.measures));
	    };
	    AggregateNode.makeFromEncoding = function (parent, model) {
	        var isAggregate = false;
	        model.forEachFieldDef(function (fd) {
	            if (fd.aggregate) {
	                isAggregate = true;
	            }
	        });
	        var meas = {};
	        var dims = {};
	        if (!isAggregate) {
	            // no need to create this node if the model has no aggregation
	            return null;
	        }
	        model.forEachFieldDef(function (fieldDef, channel$$1) {
	            var aggregate = fieldDef.aggregate, field = fieldDef.field;
	            if (aggregate) {
	                if (aggregate === 'count') {
	                    meas['*'] = meas['*'] || {};
	                    meas['*']['count'] = fielddef.vgField(fieldDef, { forAs: true });
	                }
	                else {
	                    meas[field] = meas[field] || {};
	                    meas[field][aggregate] = fielddef.vgField(fieldDef, { forAs: true });
	                    // For scale channel with domain === 'unaggregated', add min/max so we can use their union as unaggregated domain
	                    if (channel.isScaleChannel(channel$$1) && model.scaleDomain(channel$$1) === 'unaggregated') {
	                        meas[field]['min'] = fielddef.vgField({ field: field, aggregate: 'min' }, { forAs: true });
	                        meas[field]['max'] = fielddef.vgField({ field: field, aggregate: 'max' }, { forAs: true });
	                    }
	                }
	            }
	            else {
	                addDimension(dims, channel$$1, fieldDef);
	            }
	        });
	        if (util.keys(dims).length + util.keys(meas).length === 0) {
	            return null;
	        }
	        return new AggregateNode(parent, dims, meas);
	    };
	    AggregateNode.makeFromTransform = function (parent, t) {
	        var dims = {};
	        var meas = {};
	        for (var _i = 0, _a = t.aggregate; _i < _a.length; _i++) {
	            var s = _a[_i];
	            var op = s.op, field = s.field, as = s.as;
	            if (op) {
	                if (op === 'count') {
	                    meas['*'] = meas['*'] || {};
	                    meas['*']['count'] = as || fielddef.vgField(s, { forAs: true });
	                }
	                else {
	                    meas[field] = meas[field] || {};
	                    meas[field][op] = as || fielddef.vgField(s, { forAs: true });
	                }
	            }
	        }
	        for (var _b = 0, _c = t.groupby || []; _b < _c.length; _b++) {
	            var s = _c[_b];
	            dims[s] = true;
	        }
	        if (util.keys(dims).length + util.keys(meas).length === 0) {
	            return null;
	        }
	        return new AggregateNode(parent, dims, meas);
	    };
	    AggregateNode.prototype.merge = function (other) {
	        if (!util.differ(this.dimensions, other.dimensions)) {
	            mergeMeasures(this.measures, other.measures);
	            other.remove();
	        }
	        else {
	            log.debug('different dimensions, cannot merge');
	        }
	    };
	    AggregateNode.prototype.addDimensions = function (fields) {
	        var _this = this;
	        fields.forEach(function (f) { return (_this.dimensions[f] = true); });
	    };
	    AggregateNode.prototype.dependentFields = function () {
	        var out = {};
	        util.keys(this.dimensions).forEach(function (f) { return (out[f] = true); });
	        util.keys(this.measures).forEach(function (m) { return (out[m] = true); });
	        return out;
	    };
	    AggregateNode.prototype.producedFields = function () {
	        var out = {};
	        for (var _i = 0, _a = util.keys(this.measures); _i < _a.length; _i++) {
	            var field = _a[_i];
	            for (var _b = 0, _c = util.keys(this.measures[field]); _b < _c.length; _b++) {
	                var op = _c[_b];
	                out[this.measures[field][op] || op + "_" + field] = true;
	            }
	        }
	        return out;
	    };
	    AggregateNode.prototype.hash = function () {
	        return "Aggregate " + util.hash({ dimensions: this.dimensions, measures: this.measures });
	    };
	    AggregateNode.prototype.assemble = function () {
	        var ops = [];
	        var fields = [];
	        var as = [];
	        for (var _i = 0, _a = util.keys(this.measures); _i < _a.length; _i++) {
	            var field = _a[_i];
	            for (var _b = 0, _c = util.keys(this.measures[field]); _b < _c.length; _b++) {
	                var op = _c[_b];
	                as.push(this.measures[field][op]);
	                ops.push(op);
	                fields.push(util.replacePathInField(field));
	            }
	        }
	        var result = {
	            type: 'aggregate',
	            groupby: util.keys(this.dimensions),
	            ops: ops,
	            fields: fields,
	            as: as
	        };
	        return result;
	    };
	    return AggregateNode;
	}(dataflow.TransformNode));
	exports.AggregateNode = AggregateNode;

	});

	unwrapExports(aggregate$2);
	var aggregate_1$1 = aggregate$2.AggregateNode;

	var facet$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var log = tslib_1.__importStar(log$2);






	/**
	 * A node that helps us track what fields we are faceting by.
	 */
	var FacetNode = /** @class */ (function (_super) {
	    tslib_1.__extends(FacetNode, _super);
	    /**
	     * @param model The facet model.
	     * @param name The name that this facet source will have.
	     * @param data The source data for this facet data.
	     */
	    function FacetNode(parent, model, name, data) {
	        var _this = _super.call(this, parent) || this;
	        _this.model = model;
	        _this.name = name;
	        _this.data = data;
	        for (var _i = 0, _a = [channel.COLUMN, channel.ROW]; _i < _a.length; _i++) {
	            var channel$$1 = _a[_i];
	            var fieldDef = model.facet[channel$$1];
	            if (fieldDef) {
	                var bin$$1 = fieldDef.bin, sort$$1 = fieldDef.sort;
	                _this[channel$$1] = tslib_1.__assign({ name: model.getName(channel$$1 + "_domain"), fields: [fielddef.vgField(fieldDef)].concat((bin.isBinning(bin$$1) ? [fielddef.vgField(fieldDef, { binSuffix: 'end' })] : [])) }, (sort.isSortField(sort$$1)
	                    ? { sortField: sort$$1 }
	                    : vega_util_1.isArray(sort$$1)
	                        ? { sortIndexField: calculate.sortArrayIndexField(fieldDef, channel$$1) }
	                        : {}));
	            }
	        }
	        _this.childModel = model.child;
	        return _this;
	    }
	    Object.defineProperty(FacetNode.prototype, "fields", {
	        get: function () {
	            return ((this.column && this.column.fields) || []).concat(((this.row && this.row.fields) || []));
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * The name to reference this source is its name.
	     */
	    FacetNode.prototype.getSource = function () {
	        return this.name;
	    };
	    FacetNode.prototype.getChildIndependentFieldsWithStep = function () {
	        var childIndependentFieldsWithStep = {};
	        for (var _i = 0, _a = ['x', 'y']; _i < _a.length; _i++) {
	            var channel$$1 = _a[_i];
	            var childScaleComponent = this.childModel.component.scales[channel$$1];
	            if (childScaleComponent && !childScaleComponent.merged) {
	                var type = childScaleComponent.get('type');
	                var range = childScaleComponent.get('range');
	                if (scale.hasDiscreteDomain(type) && vega_schema.isVgRangeStep(range)) {
	                    var domain$$1 = domain.assembleDomain(this.childModel, channel$$1);
	                    var field = domain.getFieldFromDomain(domain$$1);
	                    if (field) {
	                        childIndependentFieldsWithStep[channel$$1] = field;
	                    }
	                    else {
	                        log.warn('Unknown field for ${channel}.  Cannot calculate view size.');
	                    }
	                }
	            }
	        }
	        return childIndependentFieldsWithStep;
	    };
	    FacetNode.prototype.assembleRowColumnData = function (channel$$1, crossedDataName, childIndependentFieldsWithStep) {
	        var childChannel = channel$$1 === 'row' ? 'y' : 'x';
	        var fields = [];
	        var ops = [];
	        var as = [];
	        if (childIndependentFieldsWithStep[childChannel]) {
	            if (crossedDataName) {
	                // If there is a crossed data, calculate max
	                fields.push("distinct_" + childIndependentFieldsWithStep[childChannel]);
	                ops.push('max');
	            }
	            else {
	                // If there is no crossed data, just calculate distinct
	                fields.push(childIndependentFieldsWithStep[childChannel]);
	                ops.push('distinct');
	            }
	            // Although it is technically a max, just name it distinct so it's easier to refer to it
	            as.push("distinct_" + childIndependentFieldsWithStep[childChannel]);
	        }
	        var _a = this[channel$$1], sortField = _a.sortField, sortIndexField = _a.sortIndexField;
	        if (sortField) {
	            var op = sortField.op, field = sortField.field;
	            fields.push(field);
	            ops.push(op);
	            as.push(fielddef.vgField(sortField, { forAs: true }));
	        }
	        else if (sortIndexField) {
	            fields.push(sortIndexField);
	            ops.push('max');
	            as.push(sortIndexField);
	        }
	        return {
	            name: this[channel$$1].name,
	            // Use data from the crossed one if it exist
	            source: crossedDataName || this.data,
	            transform: [
	                tslib_1.__assign({ type: 'aggregate', groupby: this[channel$$1].fields }, (fields.length
	                    ? {
	                        fields: fields,
	                        ops: ops,
	                        as: as
	                    }
	                    : {}))
	            ]
	        };
	    };
	    FacetNode.prototype.assemble = function () {
	        var data = [];
	        var crossedDataName = null;
	        var childIndependentFieldsWithStep = this.getChildIndependentFieldsWithStep();
	        if (this.column && this.row && (childIndependentFieldsWithStep.x || childIndependentFieldsWithStep.y)) {
	            // Need to create a cross dataset to correctly calculate cardinality
	            crossedDataName = "cross_" + this.column.name + "_" + this.row.name;
	            var fields = [].concat(childIndependentFieldsWithStep.x ? [childIndependentFieldsWithStep.x] : [], childIndependentFieldsWithStep.y ? [childIndependentFieldsWithStep.y] : []);
	            var ops = fields.map(function () { return 'distinct'; });
	            data.push({
	                name: crossedDataName,
	                source: this.data,
	                transform: [
	                    {
	                        type: 'aggregate',
	                        groupby: this.column.fields.concat(this.row.fields),
	                        fields: fields,
	                        ops: ops
	                    }
	                ]
	            });
	        }
	        for (var _i = 0, _a = [channel.COLUMN, channel.ROW]; _i < _a.length; _i++) {
	            var channel$$1 = _a[_i];
	            if (this[channel$$1]) {
	                data.push(this.assembleRowColumnData(channel$$1, crossedDataName, childIndependentFieldsWithStep));
	            }
	        }
	        return data;
	    };
	    return FacetNode;
	}(dataflow.DataFlowNode));
	exports.FacetNode = FacetNode;

	});

	unwrapExports(facet$2);
	var facet_1$1 = facet$2.FacetNode;

	var formatparse = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var log = tslib_1.__importStar(log$2);







	/**
	 * @param field The field.
	 * @param parse What to parse the field as.
	 */
	function parseExpression(field, parse) {
	    var f = util.accessPathWithDatum(field);
	    if (parse === 'number') {
	        return "toNumber(" + f + ")";
	    }
	    else if (parse === 'boolean') {
	        return "toBoolean(" + f + ")";
	    }
	    else if (parse === 'string') {
	        return "toString(" + f + ")";
	    }
	    else if (parse === 'date') {
	        return "toDate(" + f + ")";
	    }
	    else if (parse === 'flatten') {
	        return f;
	    }
	    else if (parse.indexOf('date:') === 0) {
	        var specifier = parse.slice(5, parse.length);
	        return "timeParse(" + f + "," + specifier + ")";
	    }
	    else if (parse.indexOf('utc:') === 0) {
	        var specifier = parse.slice(4, parse.length);
	        return "utcParse(" + f + "," + specifier + ")";
	    }
	    else {
	        log.warn(log.message.unrecognizedParse(parse));
	        return null;
	    }
	}
	var ParseNode = /** @class */ (function (_super) {
	    tslib_1.__extends(ParseNode, _super);
	    function ParseNode(parent, parse) {
	        var _this = _super.call(this, parent) || this;
	        _this._parse = parse;
	        return _this;
	    }
	    ParseNode.prototype.clone = function () {
	        return new ParseNode(null, util.duplicate(this._parse));
	    };
	    /**
	     * Creates a parse node from a data.format.parse and updates ancestorParse.
	     */
	    ParseNode.makeExplicit = function (parent, model$$1, ancestorParse) {
	        // Custom parse
	        var explicit = {};
	        var data = model$$1.data;
	        if (data && data.format && data.format.parse) {
	            explicit = data.format.parse;
	        }
	        return this.makeWithAncestors(parent, explicit, {}, ancestorParse);
	    };
	    ParseNode.makeImplicitFromFilterTransform = function (parent, transform, ancestorParse) {
	        var parse = {};
	        logical.forEachLeaf(transform.filter, function (filter) {
	            if (predicate.isFieldPredicate(filter)) {
	                // Automatically add a parse node for filters with filter objects
	                var val = null;
	                // For EqualFilter, just use the equal property.
	                // For RangeFilter and OneOfFilter, all array members should have
	                // the same type, so we only use the first one.
	                if (predicate.isFieldEqualPredicate(filter)) {
	                    val = filter.equal;
	                }
	                else if (predicate.isFieldRangePredicate(filter)) {
	                    val = filter.range[0];
	                }
	                else if (predicate.isFieldOneOfPredicate(filter)) {
	                    val = (filter.oneOf || filter['in'])[0];
	                } // else -- for filter expression, we can't infer anything
	                if (val) {
	                    if (datetime.isDateTime(val)) {
	                        parse[filter.field] = 'date';
	                    }
	                    else if (vega_util_1.isNumber(val)) {
	                        parse[filter.field] = 'number';
	                    }
	                    else if (vega_util_1.isString(val)) {
	                        parse[filter.field] = 'string';
	                    }
	                }
	                if (filter.timeUnit) {
	                    parse[filter.field] = 'date';
	                }
	            }
	        });
	        if (util.keys(parse).length === 0) {
	            return null;
	        }
	        return this.makeWithAncestors(parent, {}, parse, ancestorParse);
	    };
	    /**
	     * Creates a parse node for implicit parsing from a model and updates ancestorParse.
	     */
	    ParseNode.makeImplicitFromEncoding = function (parent, model$$1, ancestorParse) {
	        var implicit = {};
	        if (model.isUnitModel(model$$1) || model.isFacetModel(model$$1)) {
	            // Parse encoded fields
	            model$$1.forEachFieldDef(function (fieldDef) {
	                if (fielddef.isTimeFieldDef(fieldDef)) {
	                    implicit[fieldDef.field] = 'date';
	                }
	                else if (fielddef.isNumberFieldDef(fieldDef)) {
	                    if (!aggregate.isCountingAggregateOp(fieldDef.aggregate)) {
	                        implicit[fieldDef.field] = 'number';
	                    }
	                }
	                else if (util.accessPathDepth(fieldDef.field) > 1) {
	                    // For non-date/non-number (strings and booleans), derive a flattened field for a referenced nested field.
	                    // (Parsing numbers / dates already flattens numeric and temporal fields.)
	                    if (!(fieldDef.field in implicit)) {
	                        implicit[fieldDef.field] = 'flatten';
	                    }
	                }
	                else if (fielddef.isScaleFieldDef(fieldDef) &&
	                    sort.isSortField(fieldDef.sort) &&
	                    util.accessPathDepth(fieldDef.sort.field) > 1) {
	                    // Flatten fields that we sort by but that are not otherwise flattened.
	                    if (!(fieldDef.sort.field in implicit)) {
	                        implicit[fieldDef.sort.field] = 'flatten';
	                    }
	                }
	            });
	        }
	        return this.makeWithAncestors(parent, {}, implicit, ancestorParse);
	    };
	    /**
	     * Creates a parse node from "explicit" parse and "implicit" parse and updates ancestorParse.
	     */
	    ParseNode.makeWithAncestors = function (parent, explicit, implicit, ancestorParse) {
	        // We should not parse what has already been parsed in a parent (explicitly or implicitly) or what has been derived (maked as "derived"). We also don't need to flatten a field that has already been parsed.
	        for (var _i = 0, _a = util.keys(implicit); _i < _a.length; _i++) {
	            var field = _a[_i];
	            var parsedAs = ancestorParse.getWithExplicit(field);
	            if (parsedAs.value !== undefined) {
	                // We always ignore derived fields even if they are implicitly defined because we expect users to create the right types.
	                if (parsedAs.explicit ||
	                    parsedAs.value === implicit[field] ||
	                    parsedAs.value === 'derived' ||
	                    implicit[field] === 'flatten') {
	                    delete implicit[field];
	                }
	                else {
	                    log.warn(log.message.differentParse(field, implicit[field], parsedAs.value));
	                }
	            }
	        }
	        for (var _b = 0, _c = util.keys(explicit); _b < _c.length; _b++) {
	            var field = _c[_b];
	            var parsedAs = ancestorParse.get(field);
	            if (parsedAs !== undefined) {
	                // Don't parse a field again if it has been parsed with the same type already.
	                if (parsedAs === explicit[field]) {
	                    delete explicit[field];
	                }
	                else {
	                    log.warn(log.message.differentParse(field, explicit[field], parsedAs));
	                }
	            }
	        }
	        var parse = new split.Split(explicit, implicit);
	        // add the format parse from this model so that children don't parse the same field again
	        ancestorParse.copyAll(parse);
	        // copy only non-null parses
	        var p = {};
	        for (var _d = 0, _e = util.keys(parse.combine()); _d < _e.length; _d++) {
	            var key = _e[_d];
	            var val = parse.get(key);
	            if (val !== null) {
	                p[key] = val;
	            }
	        }
	        if (util.keys(p).length === 0 || ancestorParse.parseNothing) {
	            return null;
	        }
	        return new ParseNode(parent, p);
	    };
	    Object.defineProperty(ParseNode.prototype, "parse", {
	        get: function () {
	            return this._parse;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ParseNode.prototype.merge = function (other) {
	        this._parse = tslib_1.__assign({}, this._parse, other.parse);
	        other.remove();
	    };
	    /**
	     * Assemble an object for Vega's format.parse property.
	     */
	    ParseNode.prototype.assembleFormatParse = function () {
	        var formatParse = {};
	        for (var _i = 0, _a = util.keys(this._parse); _i < _a.length; _i++) {
	            var field = _a[_i];
	            var p = this._parse[field];
	            if (util.accessPathDepth(field) === 1) {
	                formatParse[field] = p;
	            }
	        }
	        return formatParse;
	    };
	    // format parse depends and produces all fields in its parse
	    ParseNode.prototype.producedFields = function () {
	        return vega_util_1.toSet(util.keys(this._parse));
	    };
	    ParseNode.prototype.dependentFields = function () {
	        return vega_util_1.toSet(util.keys(this._parse));
	    };
	    ParseNode.prototype.assembleTransforms = function (onlyNested) {
	        var _this = this;
	        if (onlyNested === void 0) { onlyNested = false; }
	        return util.keys(this._parse)
	            .filter(function (field) { return (onlyNested ? util.accessPathDepth(field) > 1 : true); })
	            .map(function (field) {
	            var expr = parseExpression(field, _this._parse[field]);
	            if (!expr) {
	                return null;
	            }
	            var formula = {
	                type: 'formula',
	                expr: expr,
	                as: util.removePathFromField(field) // Vega output is always flattened
	            };
	            return formula;
	        })
	            .filter(function (t) { return t !== null; });
	    };
	    return ParseNode;
	}(dataflow.DataFlowNode));
	exports.ParseNode = ParseNode;

	});

	unwrapExports(formatparse);
	var formatparse_1 = formatparse.ParseNode;

	var source$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var SourceNode = /** @class */ (function (_super) {
	    tslib_1.__extends(SourceNode, _super);
	    function SourceNode(data$$1) {
	        var _this = _super.call(this, null) || this;
	        data$$1 = data$$1 || { name: 'source' };
	        if (data.isInlineData(data$$1)) {
	            _this._data = { values: data$$1.values };
	        }
	        else if (data.isUrlData(data$$1)) {
	            _this._data = { url: data$$1.url };
	            if (!data$$1.format) {
	                data$$1.format = {};
	            }
	            if (!data$$1.format || !data$$1.format.type) {
	                // Extract extension from URL using snippet from
	                // http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
	                var defaultExtension = /(?:\.([^.]+))?$/.exec(data$$1.url)[1];
	                if (!util.contains(['json', 'csv', 'tsv', 'dsv', 'topojson'], defaultExtension)) {
	                    defaultExtension = 'json';
	                }
	                // defaultExtension has type string but we ensure that it is DataFormatType above
	                data$$1.format.type = defaultExtension;
	            }
	        }
	        else if (data.isNamedData(data$$1)) {
	            _this._data = {};
	        }
	        // any dataset can be named
	        if (data$$1.name) {
	            _this._name = data$$1.name;
	        }
	        if (data$$1.format) {
	            var _a = data$$1.format, _b = _a.parse, format = tslib_1.__rest(_a, ["parse"]);
	            _this._data.format = format;
	        }
	        return _this;
	    }
	    Object.defineProperty(SourceNode.prototype, "data", {
	        get: function () {
	            return this._data;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SourceNode.prototype.hasName = function () {
	        return !!this._name;
	    };
	    Object.defineProperty(SourceNode.prototype, "dataName", {
	        get: function () {
	            return this._name;
	        },
	        set: function (name) {
	            this._name = name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SourceNode.prototype, "parent", {
	        set: function (parent) {
	            throw new Error('Source nodes have to be roots.');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SourceNode.prototype.remove = function () {
	        throw new Error('Source nodes are roots and cannot be removed.');
	    };
	    /**
	     * Return a unique identifier for this data source.
	     */
	    SourceNode.prototype.hash = function () {
	        if (data.isInlineData(this._data)) {
	            if (!this._hash) {
	                // Hashing can be expensive for large inline datasets.
	                this._hash = util.hash(this._data);
	            }
	            return this._hash;
	        }
	        else if (data.isUrlData(this._data)) {
	            return util.hash([this._data.url, this._data.format]);
	        }
	        else {
	            return this._name;
	        }
	    };
	    SourceNode.prototype.assemble = function () {
	        return tslib_1.__assign({ name: this._name }, this._data, { transform: [] });
	    };
	    return SourceNode;
	}(dataflow.DataFlowNode));
	exports.SourceNode = SourceNode;

	});

	unwrapExports(source$1);
	var source_1 = source$1.SourceNode;

	var timeunit$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var TimeUnitNode = /** @class */ (function (_super) {
	    tslib_1.__extends(TimeUnitNode, _super);
	    function TimeUnitNode(parent, formula) {
	        var _this = _super.call(this, parent) || this;
	        _this.formula = formula;
	        return _this;
	    }
	    TimeUnitNode.prototype.clone = function () {
	        return new TimeUnitNode(null, util.duplicate(this.formula));
	    };
	    TimeUnitNode.makeFromEncoding = function (parent, model) {
	        var formula = model.reduceFieldDef(function (timeUnitComponent, fieldDef) {
	            if (fieldDef.timeUnit) {
	                var f = fielddef.vgField(fieldDef, { forAs: true });
	                timeUnitComponent[f] = {
	                    as: f,
	                    timeUnit: fieldDef.timeUnit,
	                    field: fieldDef.field
	                };
	            }
	            return timeUnitComponent;
	        }, {});
	        if (util.keys(formula).length === 0) {
	            return null;
	        }
	        return new TimeUnitNode(parent, formula);
	    };
	    TimeUnitNode.makeFromTransform = function (parent, t) {
	        var _a;
	        return new TimeUnitNode(parent, (_a = {},
	            _a[t.field] = {
	                as: t.as,
	                timeUnit: t.timeUnit,
	                field: t.field
	            },
	            _a));
	    };
	    TimeUnitNode.prototype.merge = function (other) {
	        this.formula = tslib_1.__assign({}, this.formula, other.formula);
	        other.remove();
	    };
	    TimeUnitNode.prototype.producedFields = function () {
	        var out = {};
	        util.vals(this.formula).forEach(function (f) {
	            out[f.as] = true;
	        });
	        return out;
	    };
	    TimeUnitNode.prototype.dependentFields = function () {
	        var out = {};
	        util.vals(this.formula).forEach(function (f) {
	            out[f.field] = true;
	        });
	        return out;
	    };
	    TimeUnitNode.prototype.hash = function () {
	        return "TimeUnit " + util.hash(this.formula);
	    };
	    TimeUnitNode.prototype.assemble = function () {
	        return util.vals(this.formula).map(function (c) {
	            return {
	                type: 'formula',
	                as: c.as,
	                expr: timeunit.fieldExpr(c.timeUnit, c.field)
	            };
	        });
	    };
	    return TimeUnitNode;
	}(dataflow.TransformNode));
	exports.TimeUnitNode = TimeUnitNode;

	});

	unwrapExports(timeunit$2);
	var timeunit_2$1 = timeunit$2.TimeUnitNode;

	var optimizers = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	/**
	 * Start optimization path at the leaves. Useful for merging up or removing things.
	 *
	 * If the callback returns true, the recursion continues.
	 */
	function iterateFromLeaves(f) {
	    function optimizeNextFromLeaves(node) {
	        if (node instanceof source$1.SourceNode) {
	            return;
	        }
	        var next = node.parent;
	        if (f(node)) {
	            optimizeNextFromLeaves(next);
	        }
	    }
	    return optimizeNextFromLeaves;
	}
	exports.iterateFromLeaves = iterateFromLeaves;
	/**
	 * Move parse nodes up to forks.
	 */
	function moveParseUp(node) {
	    var parent = node.parent;
	    // move parse up by merging or swapping
	    if (node instanceof formatparse.ParseNode) {
	        if (parent instanceof source$1.SourceNode) {
	            return false;
	        }
	        if (parent.numChildren() > 1) {
	            // don't move parse further up but continue with parent.
	            return true;
	        }
	        if (parent instanceof formatparse.ParseNode) {
	            parent.merge(node);
	        }
	        else {
	            // don't swap with nodes that produce something that the parse node depends on (e.g. lookup)
	            if (util.hasIntersection(parent.producedFields(), node.dependentFields())) {
	                return true;
	            }
	            node.swapWithParent();
	        }
	    }
	    return true;
	}
	exports.moveParseUp = moveParseUp;
	function mergeBucket(parent, nodes) {
	    var mergedTransform = nodes.shift();
	    nodes.forEach(function (x) {
	        parent.removeChild(x);
	        x.parent = mergedTransform;
	        x.remove();
	    });
	}
	/**
	 * Merge Identical Transforms at forks by comparing hashes.
	 */
	function mergeIdenticalTransforms(node) {
	    var transforms = node.children.filter(function (x) { return dataflow.isTransformNode(x); });
	    var hashes = transforms.map(function (x) { return x.hash(); });
	    var buckets = {};
	    for (var i = 0; i < hashes.length; i++) {
	        if (buckets[hashes[i]] === undefined) {
	            buckets[hashes[i]] = [transforms[i]];
	        }
	        else {
	            buckets[hashes[i]].push(transforms[i]);
	        }
	    }
	    for (var _i = 0, _a = util.keys(buckets); _i < _a.length; _i++) {
	        var k = _a[_i];
	        mergeBucket(node, buckets[k]);
	    }
	    node.children.forEach(mergeIdenticalTransforms);
	}
	exports.mergeIdenticalTransforms = mergeIdenticalTransforms;
	/**
	 * Repeatedly remove leaf nodes that are not output or facet nodes.
	 * The reason is that we don't need subtrees that don't have any output nodes.
	 * Facet nodes are needed for the row or column domains.
	 */
	function removeUnusedSubtrees(node) {
	    if (node instanceof dataflow.OutputNode || node.numChildren() > 0 || node instanceof facet$2.FacetNode) {
	        // no need to continue with parent because it is output node or will have children (there was a fork)
	        return false;
	    }
	    else {
	        node.remove();
	    }
	    return true;
	}
	exports.removeUnusedSubtrees = removeUnusedSubtrees;
	/**
	 * Removes duplicate time unit nodes (as determined by the name of the
	 * output field) that may be generated due to selections projected over
	 * time units.
	 */
	function removeDuplicateTimeUnits(leaf) {
	    var fields = {};
	    return iterateFromLeaves(function (node) {
	        if (node instanceof timeunit$2.TimeUnitNode) {
	            var pfields = node.producedFields();
	            var dupe = util.keys(pfields).every(function (k) { return !!fields[k]; });
	            if (dupe) {
	                node.remove();
	            }
	            else {
	                fields = tslib_1.__assign({}, fields, pfields);
	            }
	        }
	        return true;
	    })(leaf);
	}
	exports.removeDuplicateTimeUnits = removeDuplicateTimeUnits;

	});

	unwrapExports(optimizers);
	var optimizers_1 = optimizers.iterateFromLeaves;
	var optimizers_2 = optimizers.moveParseUp;
	var optimizers_3 = optimizers.mergeIdenticalTransforms;
	var optimizers_4 = optimizers.removeUnusedSubtrees;
	var optimizers_5 = optimizers.removeDuplicateTimeUnits;

	var stack$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	function getStackByFields(model) {
	    return model.stack.stackBy.reduce(function (fields, by) {
	        var fieldDef = by.fieldDef;
	        var _field = fielddef.vgField(fieldDef);
	        if (_field) {
	            fields.push(_field);
	        }
	        return fields;
	    }, []);
	}
	function isValidAsArray(as) {
	    return vega_util_1.isArray(as) && as.every(function (s) { return vega_util_1.isString(s); }) && as.length > 1;
	}
	var StackNode = /** @class */ (function (_super) {
	    tslib_1.__extends(StackNode, _super);
	    function StackNode(parent, stack) {
	        var _this = _super.call(this, parent) || this;
	        _this._stack = stack;
	        return _this;
	    }
	    StackNode.prototype.clone = function () {
	        return new StackNode(null, util.duplicate(this._stack));
	    };
	    StackNode.makeFromTransform = function (parent, stackTransform) {
	        var stack = stackTransform.stack, groupby = stackTransform.groupby, as = stackTransform.as, _a = stackTransform.offset, offset = _a === void 0 ? 'zero' : _a;
	        var sortFields = [];
	        var sortOrder = [];
	        if (stackTransform.sort !== undefined) {
	            for (var _i = 0, _b = stackTransform.sort; _i < _b.length; _i++) {
	                var sortField = _b[_i];
	                sortFields.push(sortField.field);
	                sortOrder.push(util.getFirstDefined(sortField.order, 'ascending'));
	            }
	        }
	        var sort = {
	            field: sortFields,
	            order: sortOrder
	        };
	        var normalizedAs;
	        if (isValidAsArray(as)) {
	            normalizedAs = as;
	        }
	        else if (vega_util_1.isString(as)) {
	            normalizedAs = [as, as + '_end'];
	        }
	        else {
	            normalizedAs = [stackTransform.stack + '_start', stackTransform.stack + '_end'];
	        }
	        return new StackNode(parent, {
	            stackField: stack,
	            groupby: groupby,
	            offset: offset,
	            sort: sort,
	            facetby: [],
	            as: normalizedAs
	        });
	    };
	    StackNode.makeFromEncoding = function (parent, model) {
	        var stackProperties = model.stack;
	        if (!stackProperties) {
	            return null;
	        }
	        var dimensionFieldDef;
	        if (stackProperties.groupbyChannel) {
	            dimensionFieldDef = model.fieldDef(stackProperties.groupbyChannel);
	        }
	        var stackby = getStackByFields(model);
	        var orderDef = model.encoding.order;
	        var sort;
	        if (vega_util_1.isArray(orderDef) || fielddef.isFieldDef(orderDef)) {
	            sort = common$2.sortParams(orderDef);
	        }
	        else {
	            // default = descending by stackFields
	            // FIXME is the default here correct for binned fields?
	            sort = stackby.reduce(function (s, field) {
	                s.field.push(field);
	                s.order.push('descending');
	                return s;
	            }, { field: [], order: [] });
	        }
	        return new StackNode(parent, {
	            dimensionFieldDef: dimensionFieldDef,
	            stackField: model.vgField(stackProperties.fieldChannel),
	            facetby: [],
	            stackby: stackby,
	            sort: sort,
	            offset: stackProperties.offset,
	            impute: stackProperties.impute,
	            as: [
	                model.vgField(stackProperties.fieldChannel, { suffix: 'start', forAs: true }),
	                model.vgField(stackProperties.fieldChannel, { suffix: 'end', forAs: true })
	            ]
	        });
	    };
	    Object.defineProperty(StackNode.prototype, "stack", {
	        get: function () {
	            return this._stack;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    StackNode.prototype.addDimensions = function (fields) {
	        this._stack.facetby = this._stack.facetby.concat(fields);
	    };
	    StackNode.prototype.dependentFields = function () {
	        var out = {};
	        out[this._stack.stackField] = true;
	        this.getGroupbyFields().forEach(function (f) { return (out[f] = true); });
	        this._stack.facetby.forEach(function (f) { return (out[f] = true); });
	        var field = this._stack.sort.field;
	        vega_util_1.isArray(field) ? field.forEach(function (f) { return (out[f] = true); }) : (out[field] = true);
	        return out;
	    };
	    StackNode.prototype.producedFields = function () {
	        return this._stack.as.reduce(function (result, item) {
	            result[item] = true;
	            return result;
	        }, {});
	    };
	    StackNode.prototype.hash = function () {
	        return "Stack " + util.hash(this._stack);
	    };
	    StackNode.prototype.getGroupbyFields = function () {
	        var _a = this._stack, dimensionFieldDef = _a.dimensionFieldDef, impute = _a.impute, groupby = _a.groupby;
	        if (dimensionFieldDef) {
	            if (dimensionFieldDef.bin) {
	                if (impute) {
	                    // For binned group by field with impute, we calculate bin_mid
	                    // as we cannot impute two fields simultaneously
	                    return [fielddef.vgField(dimensionFieldDef, { binSuffix: 'mid' })];
	                }
	                return [
	                    // For binned group by field without impute, we need both bin (start) and bin_end
	                    fielddef.vgField(dimensionFieldDef, {}),
	                    fielddef.vgField(dimensionFieldDef, { binSuffix: 'end' })
	                ];
	            }
	            return [fielddef.vgField(dimensionFieldDef)];
	        }
	        return groupby || [];
	    };
	    StackNode.prototype.assemble = function () {
	        var transform = [];
	        var _a = this._stack, facetby = _a.facetby, dimensionFieldDef = _a.dimensionFieldDef, field = _a.stackField, stackby = _a.stackby, sort = _a.sort, offset = _a.offset, impute = _a.impute, as = _a.as;
	        // Impute
	        if (impute && dimensionFieldDef) {
	            if (dimensionFieldDef.bin) {
	                // As we can only impute one field at a time, we need to calculate
	                // mid point for a binned field
	                transform.push({
	                    type: 'formula',
	                    expr: '(' +
	                        fielddef.vgField(dimensionFieldDef, { expr: 'datum' }) +
	                        '+' +
	                        fielddef.vgField(dimensionFieldDef, { expr: 'datum', binSuffix: 'end' }) +
	                        ')/2',
	                    as: fielddef.vgField(dimensionFieldDef, { binSuffix: 'mid', forAs: true })
	                });
	            }
	            transform.push({
	                type: 'impute',
	                field: field,
	                groupby: stackby,
	                key: fielddef.vgField(dimensionFieldDef, { binSuffix: 'mid' }),
	                method: 'value',
	                value: 0
	            });
	        }
	        // Stack
	        transform.push({
	            type: 'stack',
	            groupby: this.getGroupbyFields().concat(facetby),
	            field: field,
	            sort: sort,
	            as: as,
	            offset: offset
	        });
	        return transform;
	    };
	    return StackNode;
	}(dataflow.TransformNode));
	exports.StackNode = StackNode;

	});

	unwrapExports(stack$1);
	var stack_1$1 = stack$1.StackNode;

	var optimize = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	var optimizers$$1 = tslib_1.__importStar(optimizers);

	exports.FACET_SCALE_PREFIX = 'scale_';
	/**
	 * Clones the subtree and ignores output nodes except for the leafs, which are renamed.
	 */
	function cloneSubtree(facet) {
	    function clone(node) {
	        if (!(node instanceof facet$2.FacetNode)) {
	            var copy_1 = node.clone();
	            if (copy_1 instanceof dataflow.OutputNode) {
	                var newName = exports.FACET_SCALE_PREFIX + copy_1.getSource();
	                copy_1.setSource(newName);
	                facet.model.component.data.outputNodes[newName] = copy_1;
	            }
	            else if (copy_1 instanceof aggregate$2.AggregateNode || copy_1 instanceof stack$1.StackNode) {
	                copy_1.addDimensions(facet.fields);
	            }
	            util.flatten(node.children.map(clone)).forEach(function (n) { return (n.parent = copy_1); });
	            return [copy_1];
	        }
	        return util.flatten(node.children.map(clone));
	    }
	    return clone;
	}
	/**
	 * Move facet nodes down to the next fork or output node. Also pull the main output with the facet node.
	 * After moving down the facet node, make a copy of the subtree and make it a child of the main output.
	 */
	function moveFacetDown(node) {
	    if (node instanceof facet$2.FacetNode) {
	        if (node.numChildren() === 1 && !(node.children[0] instanceof dataflow.OutputNode)) {
	            // move down until we hit a fork or output node
	            var child = node.children[0];
	            if (child instanceof aggregate$2.AggregateNode || child instanceof stack$1.StackNode) {
	                child.addDimensions(node.fields);
	            }
	            child.swapWithParent();
	            moveFacetDown(node);
	        }
	        else {
	            // move main to facet
	            moveMainDownToFacet(node.model.component.data.main);
	            // replicate the subtree and place it before the facet's main node
	            var copy = util.flatten(node.children.map(cloneSubtree(node)));
	            copy.forEach(function (c) { return (c.parent = node.model.component.data.main); });
	        }
	    }
	    else {
	        node.children.forEach(moveFacetDown);
	    }
	}
	function moveMainDownToFacet(node) {
	    if (node instanceof dataflow.OutputNode && node.type === data.MAIN) {
	        if (node.numChildren() === 1) {
	            var child = node.children[0];
	            if (!(child instanceof facet$2.FacetNode)) {
	                child.swapWithParent();
	                moveMainDownToFacet(node);
	            }
	        }
	    }
	}
	/**
	 * Remove nodes that are not required starting from a root.
	 */
	function removeUnnecessaryNodes(node) {
	    // remove output nodes that are not required
	    if (node instanceof dataflow.OutputNode && !node.isRequired()) {
	        node.remove();
	    }
	    node.children.forEach(removeUnnecessaryNodes);
	}
	/**
	 * Return all leaf nodes.
	 */
	function getLeaves(roots) {
	    var leaves = [];
	    function append(node) {
	        if (node.numChildren() === 0) {
	            leaves.push(node);
	        }
	        else {
	            node.children.forEach(append);
	        }
	    }
	    roots.forEach(append);
	    return leaves;
	}
	/**
	 * Inserts an Intermediate ParseNode containing all non-conflicting Parse fields and removes the empty ParseNodes
	 */
	function mergeParse(node) {
	    var parseChildren = node.children.filter(function (x) { return x instanceof formatparse.ParseNode; });
	    if (parseChildren.length > 1) {
	        var commonParse = {};
	        for (var _i = 0, parseChildren_1 = parseChildren; _i < parseChildren_1.length; _i++) {
	            var parseNode = parseChildren_1[_i];
	            var parse = parseNode.parse;
	            for (var _a = 0, _b = util.keys(parse); _a < _b.length; _a++) {
	                var k = _b[_a];
	                if (commonParse[k] === undefined) {
	                    commonParse[k] = parse[k];
	                }
	                else if (commonParse[k] !== parse[k]) {
	                    delete commonParse[k];
	                }
	            }
	        }
	        if (util.keys(commonParse).length !== 0) {
	            var mergedParseNode = new formatparse.ParseNode(node, commonParse);
	            for (var _c = 0, parseChildren_2 = parseChildren; _c < parseChildren_2.length; _c++) {
	                var parseNode = parseChildren_2[_c];
	                for (var _d = 0, _e = util.keys(commonParse); _d < _e.length; _d++) {
	                    var key = _e[_d];
	                    delete parseNode.parse[key];
	                }
	                node.removeChild(parseNode);
	                parseNode.parent = mergedParseNode;
	                if (util.keys(parseNode.parse).length === 0) {
	                    parseNode.remove();
	                }
	            }
	        }
	    }
	    node.children.forEach(mergeParse);
	}
	exports.mergeParse = mergeParse;
	/**
	 * Optimizes the dataflow of the passed in data component.
	 */
	function optimizeDataflow(dataComponent) {
	    var roots = util.vals(dataComponent.sources);
	    roots.forEach(removeUnnecessaryNodes);
	    // remove source nodes that don't have any children because they also don't have output nodes
	    roots = roots.filter(function (r) { return r.numChildren() > 0; });
	    getLeaves(roots).forEach(optimizers$$1.iterateFromLeaves(optimizers$$1.removeUnusedSubtrees));
	    roots = roots.filter(function (r) { return r.numChildren() > 0; });
	    getLeaves(roots).forEach(optimizers$$1.iterateFromLeaves(optimizers$$1.moveParseUp));
	    getLeaves(roots).forEach(optimizers$$1.removeDuplicateTimeUnits);
	    roots.forEach(moveFacetDown);
	    roots.forEach(mergeParse);
	    roots.forEach(optimizers$$1.mergeIdenticalTransforms);
	    util.keys(dataComponent.sources).forEach(function (s) {
	        if (dataComponent.sources[s].numChildren() === 0) {
	            delete dataComponent.sources[s];
	        }
	    });
	}
	exports.optimizeDataflow = optimizeDataflow;

	});

	unwrapExports(optimize);
	var optimize_1 = optimize.FACET_SCALE_PREFIX;
	var optimize_2 = optimize.mergeParse;
	var optimize_3 = optimize.optimizeDataflow;

	var domain = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	var log = tslib_1.__importStar(log$2);


	var util$$1 = tslib_1.__importStar(util);






	function parseScaleDomain(model$$1) {
	    if (model.isUnitModel(model$$1)) {
	        parseUnitScaleDomain(model$$1);
	    }
	    else {
	        parseNonUnitScaleDomain(model$$1);
	    }
	}
	exports.parseScaleDomain = parseScaleDomain;
	function parseUnitScaleDomain(model$$1) {
	    var scales = model$$1.specifiedScales;
	    var localScaleComponents = model$$1.component.scales;
	    util$$1.keys(localScaleComponents).forEach(function (channel$$1) {
	        var specifiedScale = scales[channel$$1];
	        var specifiedDomain = specifiedScale ? specifiedScale.domain : undefined;
	        var domains = parseDomainForChannel(model$$1, channel$$1);
	        var localScaleCmpt = localScaleComponents[channel$$1];
	        localScaleCmpt.domains = domains;
	        if (scale.isSelectionDomain(specifiedDomain)) {
	            // As scale parsing occurs before selection parsing, we use a temporary
	            // signal here and append the scale.domain definition. This is replaced
	            // with the correct domainRaw signal during scale assembly.
	            // For more information, see isRawSelectionDomain in selection.ts.
	            // FIXME: replace this with a special property in the scaleComponent
	            localScaleCmpt.set('domainRaw', {
	                signal: selection$2.SELECTION_DOMAIN + util$$1.hash(specifiedDomain)
	            }, true);
	        }
	        if (model$$1.component.data.isFaceted) {
	            // get resolve from closest facet parent as this decides whether we need to refer to cloned subtree or not
	            var facetParent = model$$1;
	            while (!model.isFacetModel(facetParent) && facetParent.parent) {
	                facetParent = facetParent.parent;
	            }
	            var resolve = facetParent.component.resolve.scale[channel$$1];
	            if (resolve === 'shared') {
	                for (var _i = 0, domains_1 = domains; _i < domains_1.length; _i++) {
	                    var domain = domains_1[_i];
	                    // Replace the scale domain with data output from a cloned subtree after the facet.
	                    if (vega_schema.isDataRefDomain(domain)) {
	                        // use data from cloned subtree (which is the same as data but with a prefix added once)
	                        domain.data = optimize.FACET_SCALE_PREFIX + domain.data.replace(optimize.FACET_SCALE_PREFIX, '');
	                    }
	                }
	            }
	        }
	    });
	}
	function parseNonUnitScaleDomain(model$$1) {
	    for (var _i = 0, _a = model$$1.children; _i < _a.length; _i++) {
	        var child = _a[_i];
	        parseScaleDomain(child);
	    }
	    var localScaleComponents = model$$1.component.scales;
	    util$$1.keys(localScaleComponents).forEach(function (channel$$1) {
	        var domains;
	        var domainRaw = null;
	        for (var _i = 0, _a = model$$1.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            var childComponent = child.component.scales[channel$$1];
	            if (childComponent) {
	                if (domains === undefined) {
	                    domains = childComponent.domains;
	                }
	                else {
	                    domains = domains.concat(childComponent.domains);
	                }
	                var dr = childComponent.get('domainRaw');
	                if (domainRaw && dr && domainRaw.signal !== dr.signal) {
	                    log.warn('The same selection must be used to override scale domains in a layered view.');
	                }
	                domainRaw = dr;
	            }
	        }
	        localScaleComponents[channel$$1].domains = domains;
	        if (domainRaw) {
	            localScaleComponents[channel$$1].set('domainRaw', domainRaw, true);
	        }
	    });
	}
	/**
	 * Remove unaggregated domain if it is not applicable
	 * Add unaggregated domain if domain is not specified and config.scale.useUnaggregatedDomain is true.
	 */
	function normalizeUnaggregatedDomain(domain, fieldDef, scaleType, scaleConfig) {
	    if (domain === 'unaggregated') {
	        var _a = canUseUnaggregatedDomain(fieldDef, scaleType), valid = _a.valid, reason = _a.reason;
	        if (!valid) {
	            log.warn(reason);
	            return undefined;
	        }
	    }
	    else if (domain === undefined && scaleConfig.useUnaggregatedDomain) {
	        // Apply config if domain is not specified.
	        var valid = canUseUnaggregatedDomain(fieldDef, scaleType).valid;
	        if (valid) {
	            return 'unaggregated';
	        }
	    }
	    return domain;
	}
	function parseDomainForChannel(model$$1, channel$$1) {
	    var scaleType = model$$1.getScaleComponent(channel$$1).get('type');
	    var domain = normalizeUnaggregatedDomain(model$$1.scaleDomain(channel$$1), model$$1.fieldDef(channel$$1), scaleType, model$$1.config.scale);
	    if (domain !== model$$1.scaleDomain(channel$$1)) {
	        model$$1.specifiedScales[channel$$1] = tslib_1.__assign({}, model$$1.specifiedScales[channel$$1], { domain: domain });
	    }
	    // If channel is either X or Y then union them with X2 & Y2 if they exist
	    if (channel$$1 === 'x' && model$$1.channelHasField('x2')) {
	        if (model$$1.channelHasField('x')) {
	            return parseSingleChannelDomain(scaleType, domain, model$$1, 'x').concat(parseSingleChannelDomain(scaleType, domain, model$$1, 'x2'));
	        }
	        else {
	            return parseSingleChannelDomain(scaleType, domain, model$$1, 'x2');
	        }
	    }
	    else if (channel$$1 === 'y' && model$$1.channelHasField('y2')) {
	        if (model$$1.channelHasField('y')) {
	            return parseSingleChannelDomain(scaleType, domain, model$$1, 'y').concat(parseSingleChannelDomain(scaleType, domain, model$$1, 'y2'));
	        }
	        else {
	            return parseSingleChannelDomain(scaleType, domain, model$$1, 'y2');
	        }
	    }
	    return parseSingleChannelDomain(scaleType, domain, model$$1, channel$$1);
	}
	exports.parseDomainForChannel = parseDomainForChannel;
	function mapDomainToDataSignal(domain, type, timeUnit) {
	    return domain.map(function (v) {
	        var data$$1 = fielddef.valueExpr(v, { timeUnit: timeUnit, type: type });
	        return { signal: "{data: " + data$$1 + "}" };
	    });
	}
	function parseSingleChannelDomain(scaleType, domain, model$$1, channel$$1) {
	    var fieldDef = model$$1.fieldDef(channel$$1);
	    if (domain && domain !== 'unaggregated' && !scale.isSelectionDomain(domain)) {
	        // explicit value
	        var type = fieldDef.type, timeUnit = fieldDef.timeUnit;
	        if (type === 'temporal' || timeUnit) {
	            return mapDomainToDataSignal(domain, type, timeUnit);
	        }
	        return [domain];
	    }
	    var stack = model$$1.stack;
	    if (stack && channel$$1 === stack.fieldChannel) {
	        if (stack.offset === 'normalize') {
	            return [[0, 1]];
	        }
	        var data$$1 = model$$1.requestDataName(data.MAIN);
	        return [
	            {
	                data: data$$1,
	                field: model$$1.vgField(channel$$1, { suffix: 'start' })
	            },
	            {
	                data: data$$1,
	                field: model$$1.vgField(channel$$1, { suffix: 'end' })
	            }
	        ];
	    }
	    var sort$$1 = channel.isScaleChannel(channel$$1) ? domainSort(model$$1, channel$$1, scaleType) : undefined;
	    if (domain === 'unaggregated') {
	        var data$$1 = model$$1.requestDataName(data.MAIN);
	        var field = fieldDef.field;
	        return [
	            {
	                data: data$$1,
	                field: fielddef.vgField({ field: field, aggregate: 'min' })
	            },
	            {
	                data: data$$1,
	                field: fielddef.vgField({ field: field, aggregate: 'max' })
	            }
	        ];
	    }
	    else if (bin.isBinning(fieldDef.bin)) {
	        // bin
	        if (scale.isBinScale(scaleType)) {
	            var signal = model$$1.getName(bin.binToString(fieldDef.bin) + "_" + fieldDef.field + "_bins");
	            return [{ signal: "sequence(" + signal + ".start, " + signal + ".stop + " + signal + ".step, " + signal + ".step)" }];
	        }
	        if (scale.hasDiscreteDomain(scaleType)) {
	            // ordinal bin scale takes domain from bin_range, ordered by bin start
	            // This is useful for both axis-based scale (x/y) and legend-based scale (other channels).
	            return [
	                {
	                    // If sort by aggregation of a specified sort field, we need to use RAW table,
	                    // so we can aggregate values for the scale independently from the main aggregation.
	                    data: util$$1.isBoolean(sort$$1) ? model$$1.requestDataName(data.MAIN) : model$$1.requestDataName(data.RAW),
	                    // Use range if we added it and the scale does not support computing a range as a signal.
	                    field: model$$1.vgField(channel$$1, common$2.binRequiresRange(fieldDef, channel$$1) ? { binSuffix: 'range' } : {}),
	                    // we have to use a sort object if sort = true to make the sort correct by bin start
	                    sort: sort$$1 === true || !sort.isSortField(sort$$1)
	                        ? {
	                            field: model$$1.vgField(channel$$1, {}),
	                            op: 'min' // min or max doesn't matter since we sort by the start of the bin range
	                        }
	                        : sort$$1
	                }
	            ];
	        }
	        else {
	            // continuous scales
	            if (channel$$1 === 'x' || channel$$1 === 'y') {
	                if (bin.isBinParams(fieldDef.bin) && fieldDef.bin.extent) {
	                    return [fieldDef.bin.extent];
	                }
	                // X/Y position have to include start and end for non-ordinal scale
	                var data$$1 = model$$1.requestDataName(data.MAIN);
	                return [
	                    {
	                        data: data$$1,
	                        field: model$$1.vgField(channel$$1, {})
	                    },
	                    {
	                        data: data$$1,
	                        field: model$$1.vgField(channel$$1, { binSuffix: 'end' })
	                    }
	                ];
	            }
	            else {
	                // TODO: use bin_mid
	                return [
	                    {
	                        data: model$$1.requestDataName(data.MAIN),
	                        field: model$$1.vgField(channel$$1, {})
	                    }
	                ];
	            }
	        }
	    }
	    else if (sort$$1) {
	        return [
	            {
	                // If sort by aggregation of a specified sort field, we need to use RAW table,
	                // so we can aggregate values for the scale independently from the main aggregation.
	                data: util$$1.isBoolean(sort$$1) ? model$$1.requestDataName(data.MAIN) : model$$1.requestDataName(data.RAW),
	                field: model$$1.vgField(channel$$1),
	                sort: sort$$1
	            }
	        ];
	    }
	    else {
	        return [
	            {
	                data: model$$1.requestDataName(data.MAIN),
	                field: model$$1.vgField(channel$$1)
	            }
	        ];
	    }
	}
	function domainSort(model$$1, channel$$1, scaleType) {
	    if (!scale.hasDiscreteDomain(scaleType)) {
	        return undefined;
	    }
	    var fieldDef = model$$1.fieldDef(channel$$1);
	    var sort$$1 = fieldDef.sort;
	    // if the sort is specified with array, use the derived sort index field
	    if (sort.isSortArray(sort$$1)) {
	        return {
	            op: 'min',
	            field: calculate.sortArrayIndexField(fieldDef, channel$$1),
	            order: 'ascending'
	        };
	    }
	    // Sorted based on an aggregate calculation over a specified sort field (only for ordinal scale)
	    if (sort.isSortField(sort$$1)) {
	        // flatten nested fields
	        return tslib_1.__assign({}, sort$$1, (sort$$1.field ? { field: util$$1.replacePathInField(sort$$1.field) } : {}));
	    }
	    if (sort$$1 === 'descending') {
	        return {
	            op: 'min',
	            field: model$$1.vgField(channel$$1),
	            order: 'descending'
	        };
	    }
	    if (util$$1.contains(['ascending', undefined /* default =ascending*/], sort$$1)) {
	        return true;
	    }
	    // sort == null
	    return undefined;
	}
	exports.domainSort = domainSort;
	/**
	 * Determine if a scale can use unaggregated domain.
	 * @return {Boolean} Returns true if all of the following conditons applies:
	 * 1. `scale.domain` is `unaggregated`
	 * 2. Aggregation function is not `count` or `sum`
	 * 3. The scale is quantitative or time scale.
	 */
	function canUseUnaggregatedDomain(fieldDef, scaleType) {
	    if (!fieldDef.aggregate) {
	        return {
	            valid: false,
	            reason: log.message.unaggregateDomainHasNoEffectForRawField(fieldDef)
	        };
	    }
	    if (!aggregate.SHARED_DOMAIN_OP_INDEX[fieldDef.aggregate]) {
	        return {
	            valid: false,
	            reason: log.message.unaggregateDomainWithNonSharedDomainOp(fieldDef.aggregate)
	        };
	    }
	    if (fieldDef.type === 'quantitative') {
	        if (scaleType === 'log') {
	            return {
	                valid: false,
	                reason: log.message.unaggregatedDomainWithLogScale(fieldDef)
	            };
	        }
	    }
	    return { valid: true };
	}
	exports.canUseUnaggregatedDomain = canUseUnaggregatedDomain;
	/**
	 * Converts an array of domains to a single Vega scale domain.
	 */
	function mergeDomains(domains) {
	    var uniqueDomains = util$$1.unique(domains.map(function (domain) {
	        // ignore sort property when computing the unique domains
	        if (vega_schema.isDataRefDomain(domain)) {
	            var _s = domain.sort, domainWithoutSort = tslib_1.__rest(domain, ["sort"]);
	            return domainWithoutSort;
	        }
	        return domain;
	    }), util$$1.hash);
	    var sorts = util$$1.unique(domains
	        .map(function (d) {
	        if (vega_schema.isDataRefDomain(d)) {
	            var s = d.sort;
	            if (s !== undefined && !util$$1.isBoolean(s)) {
	                if (s.op === 'count') {
	                    // let's make sure that if op is count, we don't use a field
	                    delete s.field;
	                }
	                if (s.order === 'ascending') {
	                    // drop order: ascending as it is the default
	                    delete s.order;
	                }
	            }
	            return s;
	        }
	        return undefined;
	    })
	        .filter(function (s) { return s !== undefined; }), util$$1.hash);
	    if (uniqueDomains.length === 1) {
	        var domain = domains[0];
	        if (vega_schema.isDataRefDomain(domain) && sorts.length > 0) {
	            var sort_2 = sorts[0];
	            if (sorts.length > 1) {
	                log.warn(log.message.MORE_THAN_ONE_SORT);
	                sort_2 = true;
	            }
	            return tslib_1.__assign({}, domain, { sort: sort_2 });
	        }
	        return domain;
	    }
	    // only keep simple sort properties that work with unioned domains
	    var simpleSorts = util$$1.unique(sorts.map(function (s) {
	        if (util$$1.isBoolean(s)) {
	            return s;
	        }
	        if (s.op === 'count') {
	            return s;
	        }
	        log.warn(log.message.domainSortDropped(s));
	        return true;
	    }), util$$1.hash);
	    var sort$$1;
	    if (simpleSorts.length === 1) {
	        sort$$1 = simpleSorts[0];
	    }
	    else if (simpleSorts.length > 1) {
	        log.warn(log.message.MORE_THAN_ONE_SORT);
	        sort$$1 = true;
	    }
	    var allData = util$$1.unique(domains.map(function (d) {
	        if (vega_schema.isDataRefDomain(d)) {
	            return d.data;
	        }
	        return null;
	    }), function (x) { return x; });
	    if (allData.length === 1 && allData[0] !== null) {
	        // create a union domain of different fields with a single data source
	        var domain = tslib_1.__assign({ data: allData[0], fields: uniqueDomains.map(function (d) { return d.field; }) }, (sort$$1 ? { sort: sort$$1 } : {}));
	        return domain;
	    }
	    return tslib_1.__assign({ fields: uniqueDomains }, (sort$$1 ? { sort: sort$$1 } : {}));
	}
	exports.mergeDomains = mergeDomains;
	/**
	 * Return a field if a scale single field.
	 * Return `undefined` otherwise.
	 *
	 */
	function getFieldFromDomain(domain) {
	    if (vega_schema.isDataRefDomain(domain) && vega_util_1.isString(domain.field)) {
	        return domain.field;
	    }
	    else if (vega_schema.isDataRefUnionedDomain(domain)) {
	        var field = void 0;
	        for (var _i = 0, _a = domain.fields; _i < _a.length; _i++) {
	            var nonUnionDomain = _a[_i];
	            if (vega_schema.isDataRefDomain(nonUnionDomain) && vega_util_1.isString(nonUnionDomain.field)) {
	                if (!field) {
	                    field = nonUnionDomain.field;
	                }
	                else if (field !== nonUnionDomain.field) {
	                    log.warn('Detected faceted independent scales that union domain of multiple fields from different data sources.  We will use the first field.  The result view size may be incorrect.');
	                    return field;
	                }
	            }
	        }
	        log.warn('Detected faceted independent scales that union domain of identical fields from different source detected.  We will assume that this is the same field from a different fork of the same data source.  However, if this is not case, the result view size maybe incorrect.');
	        return field;
	    }
	    else if (vega_schema.isFieldRefUnionDomain(domain)) {
	        log.warn('Detected faceted independent scales that union domain of multiple fields from the same data source.  We will use the first field.  The result view size may be incorrect.');
	        var field = domain.fields[0];
	        return vega_util_1.isString(field) ? field : undefined;
	    }
	    return undefined;
	}
	exports.getFieldFromDomain = getFieldFromDomain;
	function assembleDomain(model$$1, channel$$1) {
	    var scaleComponent = model$$1.component.scales[channel$$1];
	    var domains = scaleComponent.domains.map(function (domain) {
	        // Correct references to data as the original domain's data was determined
	        // in parseScale, which happens before parseData. Thus the original data
	        // reference can be incorrect.
	        if (vega_schema.isDataRefDomain(domain)) {
	            domain.data = model$$1.lookupDataSource(domain.data);
	        }
	        return domain;
	    });
	    // domains is an array that has to be merged into a single vega domain
	    return mergeDomains(domains);
	}
	exports.assembleDomain = assembleDomain;

	});

	unwrapExports(domain);
	var domain_1 = domain.parseScaleDomain;
	var domain_2 = domain.parseDomainForChannel;
	var domain_3 = domain.domainSort;
	var domain_4 = domain.canUseUnaggregatedDomain;
	var domain_5 = domain.mergeDomains;
	var domain_6 = domain.getFieldFromDomain;
	var domain_7 = domain.assembleDomain;

	var assemble$8 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	function assembleScales(model$$1) {
	    if (model.isLayerModel(model$$1) || model.isConcatModel(model$$1) || model.isRepeatModel(model$$1)) {
	        // For concat / layer / repeat, include scales of children too
	        return model$$1.children.reduce(function (scales, child) {
	            return scales.concat(assembleScales(child));
	        }, assembleScalesForModel(model$$1));
	    }
	    else {
	        // For facet, child scales would not be included in the parent's scope.
	        // For unit, there is no child.
	        return assembleScalesForModel(model$$1);
	    }
	}
	exports.assembleScales = assembleScales;
	function assembleScalesForModel(model$$1) {
	    return util.keys(model$$1.component.scales).reduce(function (scales, channel) {
	        var scaleComponent = model$$1.component.scales[channel];
	        if (scaleComponent.merged) {
	            // Skipped merged scales
	            return scales;
	        }
	        var scale = scaleComponent.combine();
	        // need to separate const and non const object destruction
	        var domainRaw = scale.domainRaw, range = scale.range;
	        var name = scale.name, type = scale.type, _d = scale.domainRaw, _r = scale.range, otherScaleProps = tslib_1.__rest(scale, ["name", "type", "domainRaw", "range"]);
	        range = assembleScaleRange(range, name, model$$1, channel);
	        // As scale parsing occurs before selection parsing, a temporary signal
	        // is used for domainRaw. Here, we detect if this temporary signal
	        // is set, and replace it with the correct domainRaw signal.
	        // For more information, see isRawSelectionDomain in selection.ts.
	        if (domainRaw && selection$2.isRawSelectionDomain(domainRaw)) {
	            domainRaw = selection$2.selectionScaleDomain(model$$1, domainRaw);
	        }
	        scales.push(tslib_1.__assign({ name: name,
	            type: type, domain: domain.assembleDomain(model$$1, channel) }, (domainRaw ? { domainRaw: domainRaw } : {}), { range: range }, otherScaleProps));
	        return scales;
	    }, []);
	}
	exports.assembleScalesForModel = assembleScalesForModel;
	function assembleScaleRange(scaleRange, scaleName, model$$1, channel) {
	    // add signals to x/y range
	    if (channel === 'x' || channel === 'y') {
	        if (vega_schema.isVgRangeStep(scaleRange)) {
	            // For x/y range step, use a signal created in layout assemble instead of a constant range step.
	            return {
	                step: { signal: scaleName + '_step' }
	            };
	        }
	        else if (vega_util_1.isArray(scaleRange) && scaleRange.length === 2) {
	            var r0 = scaleRange[0];
	            var r1 = scaleRange[1];
	            if (r0 === 0 && vega_schema.isSignalRef(r1)) {
	                // Replace width signal just in case it is renamed.
	                return [0, { signal: model$$1.getSizeName(r1.signal) }];
	            }
	            else if (vega_schema.isSignalRef(r0) && r1 === 0) {
	                // Replace height signal just in case it is renamed.
	                return [{ signal: model$$1.getSizeName(r0.signal) }, 0];
	            }
	        }
	    }
	    return scaleRange;
	}
	exports.assembleScaleRange = assembleScaleRange;

	});

	unwrapExports(assemble$8);
	var assemble_1$4 = assemble$8.assembleScales;
	var assemble_2$3 = assemble$8.assembleScalesForModel;
	var assemble_3$2 = assemble$8.assembleScaleRange;

	var component$4 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var ScaleComponent = /** @class */ (function (_super) {
	    tslib_1.__extends(ScaleComponent, _super);
	    function ScaleComponent(name, typeWithExplicit) {
	        var _this = _super.call(this, {}, // no initial explicit property
	        { name: name } // name as initial implicit property
	        ) || this;
	        _this.merged = false;
	        _this.domains = [];
	        _this.setWithExplicit('type', typeWithExplicit);
	        return _this;
	    }
	    return ScaleComponent;
	}(split.Split));
	exports.ScaleComponent = ScaleComponent;

	});

	unwrapExports(component$4);
	var component_1$2 = component$4.ScaleComponent;

	var range = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var log = tslib_1.__importStar(log$2);

	var util$$1 = tslib_1.__importStar(util);




	exports.RANGE_PROPERTIES = ['range', 'rangeStep', 'scheme'];
	function parseScaleRange(model$$1) {
	    if (model.isUnitModel(model$$1)) {
	        parseUnitScaleRange(model$$1);
	    }
	    else {
	        properties$2.parseNonUnitScaleProperty(model$$1, 'range');
	    }
	}
	exports.parseScaleRange = parseScaleRange;
	function parseUnitScaleRange(model$$1) {
	    var localScaleComponents = model$$1.component.scales;
	    // use SCALE_CHANNELS instead of scales[channel] to ensure that x, y come first!
	    channel.SCALE_CHANNELS.forEach(function (channel$$1) {
	        var localScaleCmpt = localScaleComponents[channel$$1];
	        if (!localScaleCmpt) {
	            return;
	        }
	        var mergedScaleCmpt = model$$1.getScaleComponent(channel$$1);
	        var specifiedScale = model$$1.specifiedScales[channel$$1];
	        var fieldDef = model$$1.fieldDef(channel$$1);
	        // Read if there is a specified width/height
	        var sizeType = channel$$1 === 'x' ? 'width' : channel$$1 === 'y' ? 'height' : undefined;
	        var sizeSpecified = sizeType ? !!model$$1.component.layoutSize.get(sizeType) : undefined;
	        var scaleType = mergedScaleCmpt.get('type');
	        // if autosize is fit, size cannot be data driven
	        var rangeStep = util$$1.contains(['point', 'band'], scaleType) || !!specifiedScale.rangeStep;
	        if (sizeType && model$$1.fit && !sizeSpecified && rangeStep) {
	            log.warn(log.message.CANNOT_FIX_RANGE_STEP_WITH_FIT);
	            sizeSpecified = true;
	        }
	        var xyRangeSteps = getXYRangeStep(model$$1);
	        var rangeWithExplicit = parseRangeForChannel(channel$$1, scaleType, fieldDef.type, specifiedScale, model$$1.config, localScaleCmpt.get('zero'), model$$1.mark, sizeSpecified, model$$1.getName(sizeType), xyRangeSteps);
	        localScaleCmpt.setWithExplicit('range', rangeWithExplicit);
	    });
	}
	function getXYRangeStep(model$$1) {
	    var xyRangeSteps = [];
	    var xScale = model$$1.getScaleComponent('x');
	    var xRange = xScale && xScale.get('range');
	    if (xRange && vega_schema.isVgRangeStep(xRange) && vega_util_1.isNumber(xRange.step)) {
	        xyRangeSteps.push(xRange.step);
	    }
	    var yScale = model$$1.getScaleComponent('y');
	    var yRange = yScale && yScale.get('range');
	    if (yRange && vega_schema.isVgRangeStep(yRange) && vega_util_1.isNumber(yRange.step)) {
	        xyRangeSteps.push(yRange.step);
	    }
	    return xyRangeSteps;
	}
	/**
	 * Return mixins that includes one of the range properties (range, rangeStep, scheme).
	 */
	function parseRangeForChannel(channel$$1, scaleType, type, specifiedScale, config$$1, zero, mark, sizeSpecified, sizeSignal, xyRangeSteps) {
	    var noRangeStep = sizeSpecified || specifiedScale.rangeStep === null;
	    // Check if any of the range properties is specified.
	    // If so, check if it is compatible and make sure that we only output one of the properties
	    for (var _i = 0, RANGE_PROPERTIES_1 = exports.RANGE_PROPERTIES; _i < RANGE_PROPERTIES_1.length; _i++) {
	        var property = RANGE_PROPERTIES_1[_i];
	        if (specifiedScale[property] !== undefined) {
	            var supportedByScaleType = scale.scaleTypeSupportProperty(scaleType, property);
	            var channelIncompatability = scale.channelScalePropertyIncompatability(channel$$1, property);
	            if (!supportedByScaleType) {
	                log.warn(log.message.scalePropertyNotWorkWithScaleType(scaleType, property, channel$$1));
	            }
	            else if (channelIncompatability) {
	                // channel
	                log.warn(channelIncompatability);
	            }
	            else {
	                switch (property) {
	                    case 'range':
	                        return split.makeExplicit(specifiedScale[property]);
	                    case 'scheme':
	                        return split.makeExplicit(parseScheme(specifiedScale[property]));
	                    case 'rangeStep':
	                        var rangeStep = specifiedScale[property];
	                        if (rangeStep !== null) {
	                            if (!sizeSpecified) {
	                                return split.makeExplicit({ step: rangeStep });
	                            }
	                            else {
	                                // If top-level size is specified, we ignore specified rangeStep.
	                                log.warn(log.message.rangeStepDropped(channel$$1));
	                            }
	                        }
	                }
	            }
	        }
	    }
	    return split.makeImplicit(defaultRange(channel$$1, scaleType, type, config$$1, zero, mark, sizeSignal, xyRangeSteps, noRangeStep, specifiedScale.domain));
	}
	exports.parseRangeForChannel = parseRangeForChannel;
	function parseScheme(scheme) {
	    if (scale.isExtendedScheme(scheme)) {
	        var r = { scheme: scheme.name };
	        if (scheme.count) {
	            r.count = scheme.count;
	        }
	        if (scheme.extent) {
	            r.extent = scheme.extent;
	        }
	        return r;
	    }
	    return { scheme: scheme };
	}
	function defaultRange(channel$$1, scaleType, type, config$$1, zero, mark, sizeSignal, xyRangeSteps, noRangeStep, domain) {
	    switch (channel$$1) {
	        case channel.X:
	        case channel.Y:
	            if (util$$1.contains(['point', 'band'], scaleType) && !noRangeStep) {
	                if (channel$$1 === channel.X && mark === 'text') {
	                    if (config$$1.scale.textXRangeStep) {
	                        return { step: config$$1.scale.textXRangeStep };
	                    }
	                }
	                else {
	                    if (config$$1.scale.rangeStep) {
	                        return { step: config$$1.scale.rangeStep };
	                    }
	                }
	            }
	            // If range step is null, use zero to width or height.
	            // Note that these range signals are temporary
	            // as they can be merged and renamed.
	            // (We do not have the right size signal here since parseLayoutSize() happens after parseScale().)
	            // We will later replace these temporary names with
	            // the final name in assembleScaleRange()
	            if (channel$$1 === channel.Y && scale.hasContinuousDomain(scaleType)) {
	                // For y continuous scale, we have to start from the height as the bottom part has the max value.
	                return [{ signal: sizeSignal }, 0];
	            }
	            else {
	                return [0, { signal: sizeSignal }];
	            }
	        case channel.SIZE:
	            // TODO: support custom rangeMin, rangeMax
	            var rangeMin = sizeRangeMin(mark, zero, config$$1);
	            var rangeMax = sizeRangeMax(mark, xyRangeSteps, config$$1);
	            if (scale.isContinuousToDiscrete(scaleType)) {
	                return interpolateRange(rangeMin, rangeMax, defaultContinuousToDiscreteCount(scaleType, config$$1, domain, channel$$1));
	            }
	            else {
	                return [rangeMin, rangeMax];
	            }
	        case channel.SHAPE:
	            return 'symbol';
	        case channel.COLOR:
	        case channel.FILL:
	        case channel.STROKE:
	            if (scaleType === 'ordinal') {
	                // Only nominal data uses ordinal scale by default
	                return type === 'nominal' ? 'category' : 'ordinal';
	            }
	            else if (scale.isContinuousToDiscrete(scaleType)) {
	                var count = defaultContinuousToDiscreteCount(scaleType, config$$1, domain, channel$$1);
	                if (config$$1.range && config.isVgScheme(config$$1.range.ordinal)) {
	                    return tslib_1.__assign({}, config$$1.range.ordinal, { count: count });
	                }
	                else {
	                    return { scheme: 'blues', count: count };
	                }
	            }
	            else if (scale.isContinuousToContinuous(scaleType)) {
	                // Manually set colors for now. We will revise this after https://github.com/vega/vega/issues/1369
	                return ['#f7fbff', '#0e427f'];
	            }
	            else {
	                return mark === 'rect' || mark === 'geoshape' ? 'heatmap' : 'ramp';
	            }
	        case channel.OPACITY:
	            // TODO: support custom rangeMin, rangeMax
	            return [config$$1.scale.minOpacity, config$$1.scale.maxOpacity];
	    }
	    /* istanbul ignore next: should never reach here */
	    throw new Error("Scale range undefined for channel " + channel$$1);
	}
	exports.defaultRange = defaultRange;
	function defaultContinuousToDiscreteCount(scaleType, config$$1, domain, channel$$1) {
	    switch (scaleType) {
	        case 'quantile':
	            return config$$1.scale.quantileCount;
	        case 'quantize':
	            return config$$1.scale.quantizeCount;
	        case 'threshold':
	            if (domain !== undefined && vega_util_1.isArray(domain)) {
	                return domain.length + 1;
	            }
	            else {
	                log.warn(log.message.domainRequiredForThresholdScale(channel$$1));
	                // default threshold boundaries for threshold scale since domain has cardinality of 2
	                return 3;
	            }
	    }
	}
	exports.defaultContinuousToDiscreteCount = defaultContinuousToDiscreteCount;
	/**
	 * Returns the linear interpolation of the range according to the cardinality
	 *
	 * @param rangeMin start of the range
	 * @param rangeMax end of the range
	 * @param cardinality number of values in the output range
	 */
	function interpolateRange(rangeMin, rangeMax, cardinality) {
	    var ranges = [];
	    var step = (rangeMax - rangeMin) / (cardinality - 1);
	    for (var i = 0; i < cardinality; i++) {
	        ranges.push(rangeMin + i * step);
	    }
	    return ranges;
	}
	exports.interpolateRange = interpolateRange;
	function sizeRangeMin(mark, zero, config$$1) {
	    if (zero) {
	        return 0;
	    }
	    switch (mark) {
	        case 'bar':
	        case 'tick':
	            return config$$1.scale.minBandSize;
	        case 'line':
	        case 'trail':
	        case 'rule':
	            return config$$1.scale.minStrokeWidth;
	        case 'text':
	            return config$$1.scale.minFontSize;
	        case 'point':
	        case 'square':
	        case 'circle':
	            return config$$1.scale.minSize;
	    }
	    /* istanbul ignore next: should never reach here */
	    // sizeRangeMin not implemented for the mark
	    throw new Error(log.message.incompatibleChannel('size', mark));
	}
	function sizeRangeMax(mark, xyRangeSteps, config$$1) {
	    var scaleConfig = config$$1.scale;
	    switch (mark) {
	        case 'bar':
	        case 'tick':
	            if (config$$1.scale.maxBandSize !== undefined) {
	                return config$$1.scale.maxBandSize;
	            }
	            return minXYRangeStep(xyRangeSteps, config$$1.scale) - 1;
	        case 'line':
	        case 'trail':
	        case 'rule':
	            return config$$1.scale.maxStrokeWidth;
	        case 'text':
	            return config$$1.scale.maxFontSize;
	        case 'point':
	        case 'square':
	        case 'circle':
	            if (config$$1.scale.maxSize) {
	                return config$$1.scale.maxSize;
	            }
	            // FIXME this case totally should be refactored
	            var pointStep = minXYRangeStep(xyRangeSteps, scaleConfig);
	            return (pointStep - 2) * (pointStep - 2);
	    }
	    /* istanbul ignore next: should never reach here */
	    // sizeRangeMax not implemented for the mark
	    throw new Error(log.message.incompatibleChannel('size', mark));
	}
	/**
	 * @returns {number} Range step of x or y or minimum between the two if both are ordinal scale.
	 */
	function minXYRangeStep(xyRangeSteps, scaleConfig) {
	    if (xyRangeSteps.length > 0) {
	        return Math.min.apply(null, xyRangeSteps);
	    }
	    if (scaleConfig.rangeStep) {
	        return scaleConfig.rangeStep;
	    }
	    return 21; // FIXME: re-evaluate the default value here.
	}

	});

	unwrapExports(range);
	var range_1 = range.RANGE_PROPERTIES;
	var range_2 = range.parseScaleRange;
	var range_3 = range.parseRangeForChannel;
	var range_4 = range.defaultRange;
	var range_5 = range.defaultContinuousToDiscreteCount;
	var range_6 = range.interpolateRange;

	var properties$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var log = tslib_1.__importStar(log$2);

	var util$$1 = tslib_1.__importStar(util);
	var util_1 = util;



	function parseScaleProperty(model$$1, property) {
	    if (model.isUnitModel(model$$1)) {
	        parseUnitScaleProperty(model$$1, property);
	    }
	    else {
	        parseNonUnitScaleProperty(model$$1, property);
	    }
	}
	exports.parseScaleProperty = parseScaleProperty;
	function parseUnitScaleProperty(model$$1, property) {
	    var localScaleComponents = model$$1.component.scales;
	    util_1.keys(localScaleComponents).forEach(function (channel$$1) {
	        var specifiedScale = model$$1.specifiedScales[channel$$1];
	        var localScaleCmpt = localScaleComponents[channel$$1];
	        var mergedScaleCmpt = model$$1.getScaleComponent(channel$$1);
	        var fieldDef = model$$1.fieldDef(channel$$1);
	        var config = model$$1.config;
	        var specifiedValue = specifiedScale[property];
	        var sType = mergedScaleCmpt.get('type');
	        var supportedByScaleType = scale.scaleTypeSupportProperty(sType, property);
	        var channelIncompatability = scale.channelScalePropertyIncompatability(channel$$1, property);
	        if (specifiedValue !== undefined) {
	            // If there is a specified value, check if it is compatible with scale type and channel
	            if (!supportedByScaleType) {
	                log.warn(log.message.scalePropertyNotWorkWithScaleType(sType, property, channel$$1));
	            }
	            else if (channelIncompatability) {
	                // channel
	                log.warn(channelIncompatability);
	            }
	        }
	        if (supportedByScaleType && channelIncompatability === undefined) {
	            if (specifiedValue !== undefined) {
	                // copyKeyFromObject ensure type safety
	                localScaleCmpt.copyKeyFromObject(property, specifiedScale);
	            }
	            else {
	                var value = getDefaultValue(property, channel$$1, fieldDef, mergedScaleCmpt.get('type'), mergedScaleCmpt.get('padding'), mergedScaleCmpt.get('paddingInner'), specifiedScale.domain, model$$1.markDef, config);
	                if (value !== undefined) {
	                    localScaleCmpt.set(property, value, false);
	                }
	            }
	        }
	    });
	}
	// Note: This method is used in Voyager.
	function getDefaultValue(property, channel$$1, fieldDef, scaleType, scalePadding, scalePaddingInner, specifiedDomain, markDef, config) {
	    var scaleConfig = config.scale;
	    // If we have default rule-base, determine default value first
	    switch (property) {
	        case 'interpolate':
	            return interpolate(channel$$1, scaleType);
	        case 'nice':
	            return nice(scaleType, channel$$1, fieldDef);
	        case 'padding':
	            return padding(channel$$1, scaleType, scaleConfig, fieldDef, markDef, config.bar);
	        case 'paddingInner':
	            return paddingInner(scalePadding, channel$$1, scaleConfig);
	        case 'paddingOuter':
	            return paddingOuter(scalePadding, channel$$1, scaleType, scalePaddingInner, scaleConfig);
	        case 'reverse':
	            return reverse(scaleType, fieldDef.sort);
	        case 'zero':
	            return zero(channel$$1, fieldDef, specifiedDomain, markDef, scaleType);
	    }
	    // Otherwise, use scale config
	    return scaleConfig[property];
	}
	exports.getDefaultValue = getDefaultValue;
	function parseNonUnitScaleProperty(model$$1, property) {
	    var localScaleComponents = model$$1.component.scales;
	    for (var _i = 0, _a = model$$1.children; _i < _a.length; _i++) {
	        var child = _a[_i];
	        if (property === 'range') {
	            range.parseScaleRange(child);
	        }
	        else {
	            parseScaleProperty(child, property);
	        }
	    }
	    util_1.keys(localScaleComponents).forEach(function (channel$$1) {
	        var valueWithExplicit;
	        for (var _i = 0, _a = model$$1.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            var childComponent = child.component.scales[channel$$1];
	            if (childComponent) {
	                var childValueWithExplicit = childComponent.getWithExplicit(property);
	                valueWithExplicit = split.mergeValuesWithExplicit(valueWithExplicit, childValueWithExplicit, property, 'scale', split.tieBreakByComparing(function (v1, v2) {
	                    switch (property) {
	                        case 'range':
	                            // For range step, prefer larger step
	                            if (v1.step && v2.step) {
	                                return v1.step - v2.step;
	                            }
	                            return 0;
	                        // TODO: precedence rule for other properties
	                    }
	                    return 0;
	                }));
	            }
	        }
	        localScaleComponents[channel$$1].setWithExplicit(property, valueWithExplicit);
	    });
	}
	exports.parseNonUnitScaleProperty = parseNonUnitScaleProperty;
	function interpolate(channel$$1, scaleType) {
	    if (util_1.contains([channel.COLOR, channel.FILL, channel.STROKE], channel$$1) && scale.isContinuousToContinuous(scaleType)) {
	        return 'hcl';
	    }
	    return undefined;
	}
	exports.interpolate = interpolate;
	function nice(scaleType, channel$$1, fieldDef) {
	    if (fieldDef.bin || util$$1.contains([scale.ScaleType.TIME, scale.ScaleType.UTC], scaleType)) {
	        return undefined;
	    }
	    return util$$1.contains([channel.X, channel.Y], channel$$1) ? true : undefined;
	}
	exports.nice = nice;
	function padding(channel$$1, scaleType, scaleConfig, fieldDef, markDef, barConfig) {
	    if (util$$1.contains([channel.X, channel.Y], channel$$1)) {
	        if (scale.isContinuousToContinuous(scaleType)) {
	            if (scaleConfig.continuousPadding !== undefined) {
	                return scaleConfig.continuousPadding;
	            }
	            var type = markDef.type, orient = markDef.orient;
	            if (type === 'bar' && !fieldDef.bin) {
	                if ((orient === 'vertical' && channel$$1 === 'x') || (orient === 'horizontal' && channel$$1 === 'y')) {
	                    return barConfig.continuousBandSize;
	                }
	            }
	        }
	        if (scaleType === scale.ScaleType.POINT) {
	            return scaleConfig.pointPadding;
	        }
	    }
	    return undefined;
	}
	exports.padding = padding;
	function paddingInner(paddingValue, channel$$1, scaleConfig) {
	    if (paddingValue !== undefined) {
	        // If user has already manually specified "padding", no need to add default paddingInner.
	        return undefined;
	    }
	    if (util$$1.contains([channel.X, channel.Y], channel$$1)) {
	        // Padding is only set for X and Y by default.
	        // Basically it doesn't make sense to add padding for color and size.
	        // paddingOuter would only be called if it's a band scale, just return the default for bandScale.
	        return scaleConfig.bandPaddingInner;
	    }
	    return undefined;
	}
	exports.paddingInner = paddingInner;
	function paddingOuter(paddingValue, channel$$1, scaleType, paddingInnerValue, scaleConfig) {
	    if (paddingValue !== undefined) {
	        // If user has already manually specified "padding", no need to add default paddingOuter.
	        return undefined;
	    }
	    if (util$$1.contains([channel.X, channel.Y], channel$$1)) {
	        // Padding is only set for X and Y by default.
	        // Basically it doesn't make sense to add padding for color and size.
	        if (scaleType === scale.ScaleType.BAND) {
	            if (scaleConfig.bandPaddingOuter !== undefined) {
	                return scaleConfig.bandPaddingOuter;
	            }
	            /* By default, paddingOuter is paddingInner / 2. The reason is that
	                size (width/height) = step * (cardinality - paddingInner + 2 * paddingOuter).
	                and we want the width/height to be integer by default.
	                Note that step (by default) and cardinality are integers.) */
	            return paddingInnerValue / 2;
	        }
	    }
	    return undefined;
	}
	exports.paddingOuter = paddingOuter;
	function reverse(scaleType, sort) {
	    if (scale.hasContinuousDomain(scaleType) && sort === 'descending') {
	        // For continuous domain scales, Vega does not support domain sort.
	        // Thus, we reverse range instead if sort is descending
	        return true;
	    }
	    return undefined;
	}
	exports.reverse = reverse;
	function zero(channel$$1, fieldDef, specifiedScale, markDef, scaleType) {
	    // If users explicitly provide a domain range, we should not augment zero as that will be unexpected.
	    var hasCustomDomain = !!specifiedScale && specifiedScale !== 'unaggregated';
	    if (hasCustomDomain) {
	        return false;
	    }
	    // If there is no custom domain, return true only for the following cases:
	    // 1) using quantitative field with size
	    // While this can be either ratio or interval fields, our assumption is that
	    // ratio are more common. However, if the scaleType is discretizing scale, we want to return
	    // false so that range doesn't start at zero
	    if (channel$$1 === 'size' && fieldDef.type === 'quantitative' && !scale.isContinuousToDiscrete(scaleType)) {
	        return true;
	    }
	    // 2) non-binned, quantitative x-scale or y-scale
	    // (For binning, we should not include zero by default because binning are calculated without zero.)
	    if (!fieldDef.bin && util$$1.contains([channel.X, channel.Y], channel$$1)) {
	        var orient = markDef.orient, type = markDef.type;
	        if (util_1.contains(['bar', 'area', 'line', 'trail'], type)) {
	            if ((orient === 'horizontal' && channel$$1 === 'y') || (orient === 'vertical' && channel$$1 === 'x')) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	}
	exports.zero = zero;

	});

	unwrapExports(properties$2);
	var properties_1$1 = properties$2.parseScaleProperty;
	var properties_2$1 = properties$2.getDefaultValue;
	var properties_3$1 = properties$2.parseNonUnitScaleProperty;
	var properties_4 = properties$2.interpolate;
	var properties_5 = properties$2.nice;
	var properties_6 = properties$2.padding;
	var properties_7 = properties$2.paddingInner;
	var properties_8 = properties$2.paddingOuter;
	var properties_9 = properties$2.reverse;
	var properties_10 = properties$2.zero;

	var type$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var log = tslib_1.__importStar(log$2);

	var util$$1 = tslib_1.__importStar(util);
	/**
	 * Determine if there is a specified scale type and if it is appropriate,
	 * or determine default type if type is unspecified or inappropriate.
	 */
	// NOTE: CompassQL uses this method.
	function scaleType(specifiedScale, channel$$1, fieldDef, mark, scaleConfig) {
	    var defaultScaleType = defaultType(channel$$1, fieldDef, mark, specifiedScale, scaleConfig);
	    var type = specifiedScale.type;
	    if (!channel.isScaleChannel(channel$$1)) {
	        // There is no scale for these channels
	        return null;
	    }
	    if (type !== undefined) {
	        // Check if explicitly specified scale type is supported by the channel
	        if (!scale.channelSupportScaleType(channel$$1, type)) {
	            log.warn(log.message.scaleTypeNotWorkWithChannel(channel$$1, type, defaultScaleType));
	            return defaultScaleType;
	        }
	        // Check if explicitly specified scale type is supported by the data type
	        if (!scale.scaleTypeSupportDataType(type, fieldDef.type, fieldDef.bin)) {
	            log.warn(log.message.scaleTypeNotWorkWithFieldDef(type, defaultScaleType));
	            return defaultScaleType;
	        }
	        return type;
	    }
	    return defaultScaleType;
	}
	exports.scaleType = scaleType;
	/**
	 * Determine appropriate default scale type.
	 */
	// NOTE: Voyager uses this method.
	function defaultType(channel$$1, fieldDef, mark, specifiedScale, scaleConfig) {
	    switch (fieldDef.type) {
	        case 'nominal':
	        case 'ordinal':
	            if (channel.isColorChannel(channel$$1) || channel.rangeType(channel$$1) === 'discrete') {
	                if (channel$$1 === 'shape' && fieldDef.type === 'ordinal') {
	                    log.warn(log.message.discreteChannelCannotEncode(channel$$1, 'ordinal'));
	                }
	                return 'ordinal';
	            }
	            if (util$$1.contains(['x', 'y'], channel$$1)) {
	                if (util$$1.contains(['rect', 'bar', 'rule'], mark)) {
	                    // The rect/bar mark should fit into a band.
	                    // For rule, using band scale to make rule align with axis ticks better https://github.com/vega/vega-lite/issues/3429
	                    return 'band';
	                }
	                if (mark === 'bar') {
	                    return 'band';
	                }
	            }
	            // Otherwise, use ordinal point scale so we can easily get center positions of the marks.
	            return 'point';
	        case 'temporal':
	            if (channel.isColorChannel(channel$$1)) {
	                return 'sequential';
	            }
	            else if (channel.rangeType(channel$$1) === 'discrete') {
	                log.warn(log.message.discreteChannelCannotEncode(channel$$1, 'temporal'));
	                // TODO: consider using quantize (equivalent to binning) once we have it
	                return 'ordinal';
	            }
	            return 'time';
	        case 'quantitative':
	            if (channel.isColorChannel(channel$$1)) {
	                if (bin.isBinning(fieldDef.bin)) {
	                    return 'bin-ordinal';
	                }
	                var _a = specifiedScale || {}, _b = _a.domain, domain = _b === void 0 ? undefined : _b, _c = _a.range, range = _c === void 0 ? undefined : _c;
	                if (domain && vega_util_1.isArray(domain) && domain.length > 2 && (range && vega_util_1.isArray(range) && range.length > 2)) {
	                    // If there are piecewise domain and range specified, use lineaer as default color scale as sequential does not support piecewise domain
	                    return 'linear';
	                }
	                // Use `sequential` as the default color scale for continuous data
	                // since it supports both array range and scheme range.
	                return 'sequential';
	            }
	            else if (channel.rangeType(channel$$1) === 'discrete') {
	                log.warn(log.message.discreteChannelCannotEncode(channel$$1, 'quantitative'));
	                // TODO: consider using quantize (equivalent to binning) once we have it
	                return 'ordinal';
	            }
	            // x and y use a linear scale because selections don't work with bin scales.
	            // Binned scales apply discretization but pan/zoom apply transformations to a [min, max] extent domain.
	            if (bin.isBinning(fieldDef.bin) && channel$$1 !== 'x' && channel$$1 !== 'y') {
	                return 'bin-linear';
	            }
	            return 'linear';
	        case 'geojson':
	            return undefined;
	    }
	    /* istanbul ignore next: should never reach this */
	    throw new Error(log.message.invalidFieldType(fieldDef.type));
	}

	});

	unwrapExports(type$2);
	var type_1$1 = type$2.scaleType;

	var parse$6 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });














	function parseScale(model$$1) {
	    parseScaleCore(model$$1);
	    domain.parseScaleDomain(model$$1);
	    for (var _i = 0, NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES_1 = scale.NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES; _i < NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES_1.length; _i++) {
	        var prop = NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES_1[_i];
	        properties$2.parseScaleProperty(model$$1, prop);
	    }
	    // range depends on zero
	    range.parseScaleRange(model$$1);
	}
	exports.parseScale = parseScale;
	function parseScaleCore(model$$1) {
	    if (model.isUnitModel(model$$1)) {
	        model$$1.component.scales = parseUnitScaleCore(model$$1);
	    }
	    else {
	        model$$1.component.scales = parseNonUnitScaleCore(model$$1);
	    }
	}
	exports.parseScaleCore = parseScaleCore;
	/**
	 * Parse scales for all channels of a model.
	 */
	function parseUnitScaleCore(model$$1) {
	    var encoding = model$$1.encoding, config = model$$1.config, mark$$1 = model$$1.mark;
	    return channel.SCALE_CHANNELS.reduce(function (scaleComponents, channel$$1) {
	        var fieldDef;
	        var specifiedScale;
	        var channelDef = encoding[channel$$1];
	        // Don't generate scale for shape of geoshape
	        if (fielddef.isFieldDef(channelDef) && mark$$1 === mark.GEOSHAPE && channel$$1 === channel.SHAPE && channelDef.type === type.GEOJSON) {
	            return scaleComponents;
	        }
	        if (fielddef.isFieldDef(channelDef)) {
	            fieldDef = channelDef;
	            specifiedScale = channelDef.scale;
	        }
	        else if (fielddef.hasConditionalFieldDef(channelDef)) {
	            fieldDef = channelDef.condition;
	            specifiedScale = channelDef.condition['scale']; // We use ['scale'] since we know that channel here has scale for sure
	        }
	        else if (channel$$1 === channel.X) {
	            fieldDef = fielddef.getFieldDef(encoding.x2);
	        }
	        else if (channel$$1 === channel.Y) {
	            fieldDef = fielddef.getFieldDef(encoding.y2);
	        }
	        if (fieldDef && specifiedScale !== null && specifiedScale !== false) {
	            specifiedScale = specifiedScale || {};
	            var sType = type$2.scaleType(specifiedScale, channel$$1, fieldDef, mark$$1, config.scale);
	            scaleComponents[channel$$1] = new component$4.ScaleComponent(model$$1.scaleName(channel$$1 + '', true), {
	                value: sType,
	                explicit: specifiedScale.type === sType
	            });
	        }
	        return scaleComponents;
	    }, {});
	}
	var scaleTypeTieBreaker = split.tieBreakByComparing(function (st1, st2) { return scale.scaleTypePrecedence(st1) - scale.scaleTypePrecedence(st2); });
	function parseNonUnitScaleCore(model$$1) {
	    var scaleComponents = (model$$1.component.scales = {});
	    var scaleTypeWithExplicitIndex = {};
	    var resolve$$1 = model$$1.component.resolve;
	    var _loop_1 = function (child) {
	        parseScaleCore(child);
	        // Instead of always merging right away -- check if it is compatible to merge first!
	        util.keys(child.component.scales).forEach(function (channel$$1) {
	            // if resolve is undefined, set default first
	            resolve$$1.scale[channel$$1] = resolve$$1.scale[channel$$1] || resolve.defaultScaleResolve(channel$$1, model$$1);
	            if (resolve$$1.scale[channel$$1] === 'shared') {
	                var explicitScaleType = scaleTypeWithExplicitIndex[channel$$1];
	                var childScaleType = child.component.scales[channel$$1].getWithExplicit('type');
	                if (explicitScaleType) {
	                    if (scale.scaleCompatible(explicitScaleType.value, childScaleType.value)) {
	                        // merge scale component if type are compatible
	                        scaleTypeWithExplicitIndex[channel$$1] = split.mergeValuesWithExplicit(explicitScaleType, childScaleType, 'type', 'scale', scaleTypeTieBreaker);
	                    }
	                    else {
	                        // Otherwise, update conflicting channel to be independent
	                        resolve$$1.scale[channel$$1] = 'independent';
	                        // Remove from the index so they don't get merged
	                        delete scaleTypeWithExplicitIndex[channel$$1];
	                    }
	                }
	                else {
	                    scaleTypeWithExplicitIndex[channel$$1] = childScaleType;
	                }
	            }
	        });
	    };
	    // Parse each child scale and determine if a particular channel can be merged.
	    for (var _i = 0, _a = model$$1.children; _i < _a.length; _i++) {
	        var child = _a[_i];
	        _loop_1(child);
	    }
	    // Merge each channel listed in the index
	    util.keys(scaleTypeWithExplicitIndex).forEach(function (channel$$1) {
	        // Create new merged scale component
	        var name = model$$1.scaleName(channel$$1, true);
	        var typeWithExplicit = scaleTypeWithExplicitIndex[channel$$1];
	        scaleComponents[channel$$1] = new component$4.ScaleComponent(name, typeWithExplicit);
	        // rename each child and mark them as merged
	        for (var _i = 0, _a = model$$1.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            var childScale = child.component.scales[channel$$1];
	            if (childScale) {
	                child.renameScale(childScale.get('name'), name);
	                childScale.merged = true;
	            }
	        }
	    });
	    return scaleComponents;
	}

	});

	unwrapExports(parse$6);
	var parse_1$2 = parse$6.parseScale;
	var parse_2$1 = parse$6.parseScaleCore;

	var model = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var log = tslib_1.__importStar(log$2);


















	var NameMap = /** @class */ (function () {
	    function NameMap() {
	        this.nameMap = {};
	    }
	    NameMap.prototype.rename = function (oldName, newName) {
	        this.nameMap[oldName] = newName;
	    };
	    NameMap.prototype.has = function (name) {
	        return this.nameMap[name] !== undefined;
	    };
	    NameMap.prototype.get = function (name) {
	        // If the name appears in the _nameMap, we need to read its new name.
	        // We have to loop over the dict just in case the new name also gets renamed.
	        while (this.nameMap[name] && name !== this.nameMap[name]) {
	            name = this.nameMap[name];
	        }
	        return name;
	    };
	    return NameMap;
	}());
	exports.NameMap = NameMap;
	/*
	  We use type guards instead of `instanceof` as `instanceof` makes
	  different parts of the compiler depend on the actual implementation of
	  the model classes, which in turn depend on different parts of the compiler.
	  Thus, `instanceof` leads to circular dependency problems.

	  On the other hand, type guards only make different parts of the compiler
	  depend on the type of the model classes, but not the actual implementation.
	*/
	function isUnitModel(model) {
	    return model && model.type === 'unit';
	}
	exports.isUnitModel = isUnitModel;
	function isFacetModel(model) {
	    return model && model.type === 'facet';
	}
	exports.isFacetModel = isFacetModel;
	function isRepeatModel(model) {
	    return model && model.type === 'repeat';
	}
	exports.isRepeatModel = isRepeatModel;
	function isConcatModel(model) {
	    return model && model.type === 'concat';
	}
	exports.isConcatModel = isConcatModel;
	function isLayerModel(model) {
	    return model && model.type === 'layer';
	}
	exports.isLayerModel = isLayerModel;
	var Model = /** @class */ (function () {
	    function Model(spec$$1, parent, parentGivenName, config, repeater, resolve) {
	        var _this = this;
	        this.children = [];
	        /**
	         * Corrects the data references in marks after assemble.
	         */
	        this.correctDataNames = function (mark) {
	            // TODO: make this correct
	            // for normal data references
	            if (mark.from && mark.from.data) {
	                mark.from.data = _this.lookupDataSource(mark.from.data);
	            }
	            // for access to facet data
	            if (mark.from && mark.from.facet && mark.from.facet.data) {
	                mark.from.facet.data = _this.lookupDataSource(mark.from.facet.data);
	            }
	            return mark;
	        };
	        this.parent = parent;
	        this.config = config;
	        this.repeater = repeater;
	        // If name is not provided, always use parent's givenName to avoid name conflicts.
	        this.name = spec$$1.name || parentGivenName;
	        this.title = vega_util_1.isString(spec$$1.title) ? { text: spec$$1.title } : spec$$1.title;
	        // Shared name maps
	        this.scaleNameMap = parent ? parent.scaleNameMap : new NameMap();
	        this.projectionNameMap = parent ? parent.projectionNameMap : new NameMap();
	        this.layoutSizeNameMap = parent ? parent.layoutSizeNameMap : new NameMap();
	        this.data = spec$$1.data;
	        this.description = spec$$1.description;
	        this.transforms = transform.normalizeTransform(spec$$1.transform || []);
	        this.layout = spec.isUnitSpec(spec$$1) || spec.isLayerSpec(spec$$1) ? undefined : toplevelprops.extractCompositionLayout(spec$$1);
	        this.component = {
	            data: {
	                sources: parent ? parent.component.data.sources : {},
	                outputNodes: parent ? parent.component.data.outputNodes : {},
	                outputNodeRefCounts: parent ? parent.component.data.outputNodeRefCounts : {},
	                // data is faceted if the spec is a facet spec or the parent has faceted data and no data is defined
	                isFaceted: spec.isFacetSpec(spec$$1) || (parent && parent.component.data.isFaceted && !spec$$1.data)
	            },
	            layoutSize: new split.Split(),
	            layoutHeaders: { row: {}, column: {} },
	            mark: null,
	            resolve: tslib_1.__assign({ scale: {}, axis: {}, legend: {} }, (resolve || {})),
	            selection: null,
	            scales: null,
	            projection: null,
	            axes: {},
	            legends: {}
	        };
	    }
	    Object.defineProperty(Model.prototype, "width", {
	        get: function () {
	            return this.getSizeSignalRef('width');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Model.prototype, "height", {
	        get: function () {
	            return this.getSizeSignalRef('height');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.initSize = function (size) {
	        var width = size.width, height = size.height;
	        if (width) {
	            this.component.layoutSize.set('width', width, true);
	        }
	        if (height) {
	            this.component.layoutSize.set('height', height, true);
	        }
	    };
	    Model.prototype.parse = function () {
	        this.parseScale();
	        this.parseLayoutSize(); // depends on scale
	        this.renameTopLevelLayoutSize();
	        this.parseSelection();
	        this.parseProjection();
	        this.parseData(); // (pathorder) depends on markDef; selection filters depend on parsed selections; depends on projection because some transforms require the finalized projection name.
	        this.parseAxisAndHeader(); // depends on scale and layout size
	        this.parseLegend(); // depends on scale, markDef
	        this.parseMarkGroup(); // depends on data name, scale, layout size, axisGroup, and children's scale, axis, legend and mark.
	    };
	    Model.prototype.parseScale = function () {
	        parse$6.parseScale(this);
	    };
	    Model.prototype.parseProjection = function () {
	        parse$4.parseProjection(this);
	    };
	    /**
	     * Rename top-level spec's size to be just width / height, ignoring model name.
	     * This essentially merges the top-level spec's width/height signals with the width/height signals
	     * to help us reduce redundant signals declaration.
	     */
	    Model.prototype.renameTopLevelLayoutSize = function () {
	        if (this.getName('width') !== 'width') {
	            this.renameLayoutSize(this.getName('width'), 'width');
	        }
	        if (this.getName('height') !== 'height') {
	            this.renameLayoutSize(this.getName('height'), 'height');
	        }
	    };
	    Model.prototype.parseLegend = function () {
	        parse$2.parseLegend(this);
	    };
	    Model.prototype.assembleGroupStyle = function () {
	        if (this.type === 'unit' || this.type === 'layer') {
	            return 'cell';
	        }
	        return undefined;
	    };
	    Model.prototype.assembleLayoutSize = function () {
	        if (this.type === 'unit' || this.type === 'layer') {
	            return {
	                width: this.getSizeSignalRef('width'),
	                height: this.getSizeSignalRef('height')
	            };
	        }
	        return undefined;
	    };
	    Model.prototype.assembleLayout = function () {
	        if (!this.layout) {
	            return undefined;
	        }
	        var _a = this.layout, align = _a.align, bounds = _a.bounds, center = _a.center, _b = _a.spacing, spacing = _b === void 0 ? {} : _b;
	        return tslib_1.__assign({ padding: vega_util_1.isNumber(spacing)
	                ? spacing
	                : {
	                    row: spacing.row || 10,
	                    column: spacing.column || 10
	                } }, this.assembleDefaultLayout(), (align ? { align: align } : {}), (bounds ? { bounds: bounds } : {}), (center ? { center: center } : {}));
	    };
	    Model.prototype.assembleDefaultLayout = function () {
	        return {};
	    };
	    Model.prototype.assembleHeaderMarks = function () {
	        var layoutHeaders = this.component.layoutHeaders;
	        var headerMarks = [];
	        for (var _i = 0, HEADER_CHANNELS_1 = header$2.HEADER_CHANNELS; _i < HEADER_CHANNELS_1.length; _i++) {
	            var channel$$1 = HEADER_CHANNELS_1[_i];
	            if (layoutHeaders[channel$$1].title) {
	                headerMarks.push(header$2.getTitleGroup(this, channel$$1));
	            }
	        }
	        for (var _a = 0, HEADER_CHANNELS_2 = header$2.HEADER_CHANNELS; _a < HEADER_CHANNELS_2.length; _a++) {
	            var channel$$1 = HEADER_CHANNELS_2[_a];
	            headerMarks = headerMarks.concat(header$2.getHeaderGroups(this, channel$$1));
	        }
	        return headerMarks;
	    };
	    Model.prototype.assembleAxes = function () {
	        return assemble.assembleAxes(this.component.axes, this.config);
	    };
	    Model.prototype.assembleLegends = function () {
	        return assemble$4.assembleLegends(this);
	    };
	    Model.prototype.assembleProjections = function () {
	        return assemble$6.assembleProjections(this);
	    };
	    Model.prototype.assembleTitle = function () {
	        var _a = this.title || {}, encoding$$1 = _a.encoding, titleNoEncoding = tslib_1.__rest(_a, ["encoding"]);
	        var title$$1 = tslib_1.__assign({}, title.extractTitleConfig(this.config.title).nonMark, titleNoEncoding, (encoding$$1 ? { encode: { update: encoding$$1 } } : {}));
	        if (title$$1.text) {
	            if (!util.contains(['unit', 'layer'], this.type)) {
	                // As described in https://github.com/vega/vega-lite/issues/2875:
	                // Due to vega/vega#960 (comment), we only support title's anchor for unit and layered spec for now.
	                if (title$$1.anchor && title$$1.anchor !== 'start') {
	                    log.warn(log.message.cannotSetTitleAnchor(this.type));
	                }
	                title$$1.anchor = 'start';
	            }
	            return util.keys(title$$1).length > 0 ? title$$1 : undefined;
	        }
	        return undefined;
	    };
	    /**
	     * Assemble the mark group for this model.  We accept optional `signals` so that we can include concat top-level signals with the top-level model's local signals.
	     */
	    Model.prototype.assembleGroup = function (signals) {
	        if (signals === void 0) { signals = []; }
	        var group = {};
	        signals = signals.concat(this.assembleSelectionSignals());
	        if (signals.length > 0) {
	            group.signals = signals;
	        }
	        var layout = this.assembleLayout();
	        if (layout) {
	            group.layout = layout;
	        }
	        group.marks = [].concat(this.assembleHeaderMarks(), this.assembleMarks());
	        // Only include scales if this spec is top-level or if parent is facet.
	        // (Otherwise, it will be merged with upper-level's scope.)
	        var scales = !this.parent || isFacetModel(this.parent) ? assemble$8.assembleScales(this) : [];
	        if (scales.length > 0) {
	            group.scales = scales;
	        }
	        var axes = this.assembleAxes();
	        if (axes.length > 0) {
	            group.axes = axes;
	        }
	        var legends = this.assembleLegends();
	        if (legends.length > 0) {
	            group.legends = legends;
	        }
	        return group;
	    };
	    Model.prototype.hasDescendantWithFieldOnChannel = function (channel$$1) {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            if (isUnitModel(child)) {
	                if (child.channelHasField(channel$$1)) {
	                    return true;
	                }
	            }
	            else {
	                if (child.hasDescendantWithFieldOnChannel(channel$$1)) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    };
	    Model.prototype.getName = function (text) {
	        return util.varName((this.name ? this.name + '_' : '') + text);
	    };
	    /**
	     * Request a data source name for the given data source type and mark that data source as required. This method should be called in parse, so that all used data source can be correctly instantiated in assembleData().
	     */
	    Model.prototype.requestDataName = function (name) {
	        var fullName = this.getName(name);
	        // Increase ref count. This is critical because otherwise we won't create a data source.
	        // We also increase the ref counts on OutputNode.getSource() calls.
	        var refCounts = this.component.data.outputNodeRefCounts;
	        refCounts[fullName] = (refCounts[fullName] || 0) + 1;
	        return fullName;
	    };
	    Model.prototype.getSizeSignalRef = function (sizeType) {
	        if (isFacetModel(this.parent)) {
	            var channel$$1 = sizeType === 'width' ? 'x' : 'y';
	            var scaleComponent = this.component.scales[channel$$1];
	            if (scaleComponent && !scaleComponent.merged) {
	                // independent scale
	                var type = scaleComponent.get('type');
	                var range = scaleComponent.get('range');
	                if (scale.hasDiscreteDomain(type) && vega_schema.isVgRangeStep(range)) {
	                    var scaleName = scaleComponent.get('name');
	                    var domain$$1 = domain.assembleDomain(this, channel$$1);
	                    var field = domain.getFieldFromDomain(domain$$1);
	                    if (field) {
	                        var fieldRef = fielddef.vgField({ aggregate: 'distinct', field: field }, { expr: 'datum' });
	                        return {
	                            signal: assemble$2.sizeExpr(scaleName, scaleComponent, fieldRef)
	                        };
	                    }
	                    else {
	                        log.warn('Unknown field for ${channel}.  Cannot calculate view size.');
	                        return null;
	                    }
	                }
	            }
	        }
	        return {
	            signal: this.layoutSizeNameMap.get(this.getName(sizeType))
	        };
	    };
	    /**
	     * Lookup the name of the datasource for an output node. You probably want to call this in assemble.
	     */
	    Model.prototype.lookupDataSource = function (name) {
	        var node = this.component.data.outputNodes[name];
	        if (!node) {
	            // Name not found in map so let's just return what we got.
	            // This can happen if we already have the correct name.
	            return name;
	        }
	        return node.getSource();
	    };
	    Model.prototype.getSizeName = function (oldSizeName) {
	        return this.layoutSizeNameMap.get(oldSizeName);
	    };
	    Model.prototype.renameLayoutSize = function (oldName, newName) {
	        this.layoutSizeNameMap.rename(oldName, newName);
	    };
	    Model.prototype.renameScale = function (oldName, newName) {
	        this.scaleNameMap.rename(oldName, newName);
	    };
	    Model.prototype.renameProjection = function (oldName, newName) {
	        this.projectionNameMap.rename(oldName, newName);
	    };
	    /**
	     * @return scale name for a given channel after the scale has been parsed and named.
	     */
	    Model.prototype.scaleName = function (originalScaleName, parse) {
	        if (parse) {
	            // During the parse phase always return a value
	            // No need to refer to rename map because a scale can't be renamed
	            // before it has the original name.
	            return this.getName(originalScaleName);
	        }
	        // If there is a scale for the channel, it should either
	        // be in the scale component or exist in the name map
	        if (
	        // If there is a scale for the channel, there should be a local scale component for it
	        (channel.isChannel(originalScaleName) && channel.isScaleChannel(originalScaleName) && this.component.scales[originalScaleName]) ||
	            // in the scale name map (the scale get merged by its parent)
	            this.scaleNameMap.has(this.getName(originalScaleName))) {
	            return this.scaleNameMap.get(this.getName(originalScaleName));
	        }
	        return undefined;
	    };
	    /**
	     * @return projection name after the projection has been parsed and named.
	     */
	    Model.prototype.projectionName = function (parse) {
	        if (parse) {
	            // During the parse phase always return a value
	            // No need to refer to rename map because a projection can't be renamed
	            // before it has the original name.
	            return this.getName('projection');
	        }
	        if ((this.component.projection && !this.component.projection.merged) ||
	            this.projectionNameMap.has(this.getName('projection'))) {
	            return this.projectionNameMap.get(this.getName('projection'));
	        }
	        return undefined;
	    };
	    /**
	     * Traverse a model's hierarchy to get the scale component for a particular channel.
	     */
	    Model.prototype.getScaleComponent = function (channel$$1) {
	        /* istanbul ignore next: This is warning for debugging test */
	        if (!this.component.scales) {
	            throw new Error('getScaleComponent cannot be called before parseScale().  Make sure you have called parseScale or use parseUnitModelWithScale().');
	        }
	        var localScaleComponent = this.component.scales[channel$$1];
	        if (localScaleComponent && !localScaleComponent.merged) {
	            return localScaleComponent;
	        }
	        return this.parent ? this.parent.getScaleComponent(channel$$1) : undefined;
	    };
	    /**
	     * Traverse a model's hierarchy to get a particular selection component.
	     */
	    Model.prototype.getSelectionComponent = function (variableName, origName) {
	        var sel = this.component.selection[variableName];
	        if (!sel && this.parent) {
	            sel = this.parent.getSelectionComponent(variableName, origName);
	        }
	        if (!sel) {
	            throw new Error(log.message.selectionNotFound(origName));
	        }
	        return sel;
	    };
	    return Model;
	}());
	exports.Model = Model;
	/** Abstract class for UnitModel and FacetModel.  Both of which can contain fieldDefs as a part of its own specification. */
	var ModelWithField = /** @class */ (function (_super) {
	    tslib_1.__extends(ModelWithField, _super);
	    function ModelWithField() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    /** Get "field" reference for Vega */
	    ModelWithField.prototype.vgField = function (channel$$1, opt) {
	        if (opt === void 0) { opt = {}; }
	        var fieldDef = this.fieldDef(channel$$1);
	        if (!fieldDef) {
	            return undefined;
	        }
	        return fielddef.vgField(fieldDef, opt);
	    };
	    ModelWithField.prototype.reduceFieldDef = function (f, init, t) {
	        return encoding.reduce(this.getMapping(), function (acc, cd, c) {
	            var fieldDef = fielddef.getFieldDef(cd);
	            if (fieldDef) {
	                return f(acc, fieldDef, c);
	            }
	            return acc;
	        }, init, t);
	    };
	    ModelWithField.prototype.forEachFieldDef = function (f, t) {
	        encoding.forEach(this.getMapping(), function (cd, c) {
	            var fieldDef = fielddef.getFieldDef(cd);
	            if (fieldDef) {
	                f(fieldDef, c);
	            }
	        }, t);
	    };
	    return ModelWithField;
	}(Model));
	exports.ModelWithField = ModelWithField;

	});

	unwrapExports(model);
	var model_1 = model.NameMap;
	var model_2 = model.isUnitModel;
	var model_3 = model.isFacetModel;
	var model_4 = model.isRepeatModel;
	var model_5 = model.isConcatModel;
	var model_6 = model.isLayerModel;
	var model_7 = model.Model;
	var model_8 = model.ModelWithField;

	var scales = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var log = tslib_1.__importStar(log$2);


	var scaleBindings = {
	    has: function (selCmpt) {
	        return selCmpt.type === 'interval' && selCmpt.resolve === 'global' && selCmpt.bind && selCmpt.bind === 'scales';
	    },
	    parse: function (model, selDef, selCmpt) {
	        var bound = (selCmpt.scales = []);
	        selCmpt.project.forEach(function (p) {
	            var channel$$1 = p.channel;
	            var scale$$1 = model.getScaleComponent(channel$$1);
	            var scaleType = scale$$1 ? scale$$1.get('type') : undefined;
	            if (!scale$$1 || !scale.hasContinuousDomain(scaleType) || scale.isBinScale(scaleType)) {
	                log.warn(log.message.SCALE_BINDINGS_CONTINUOUS);
	                return;
	            }
	            scale$$1.set('domainRaw', { signal: selection$2.channelSignalName(selCmpt, channel$$1, 'data') }, true);
	            bound.push(channel$$1);
	            // Bind both x/y for diag plot of repeated views.
	            if (model.repeater && model.repeater.row === model.repeater.column) {
	                var scale2 = model.getScaleComponent(channel$$1 === channel.X ? channel.Y : channel.X);
	                scale2.set('domainRaw', { signal: selection$2.channelSignalName(selCmpt, channel$$1, 'data') }, true);
	            }
	        });
	    },
	    topLevelSignals: function (model, selCmpt, signals) {
	        // Top-level signals are only needed when coordinating composed views.
	        if (!model.parent) {
	            return signals;
	        }
	        var channels = selCmpt.scales.filter(function (channel$$1) {
	            return !signals.filter(function (s) { return s.name === selection$2.channelSignalName(selCmpt, channel$$1, 'data'); }).length;
	        });
	        return signals.concat(channels.map(function (channel$$1) {
	            return { name: selection$2.channelSignalName(selCmpt, channel$$1, 'data') };
	        }));
	    },
	    signals: function (model, selCmpt, signals) {
	        // Nested signals need only push to top-level signals when within composed views.
	        if (model.parent) {
	            selCmpt.scales.forEach(function (channel$$1) {
	                var signal = signals.filter(function (s) { return s.name === selection$2.channelSignalName(selCmpt, channel$$1, 'data'); })[0];
	                signal.push = 'outer';
	                delete signal.value;
	                delete signal.update;
	            });
	        }
	        return signals;
	    }
	};
	exports.default = scaleBindings;
	function domain(model, channel$$1) {
	    var scale$$1 = vega_util_1.stringValue(model.scaleName(channel$$1));
	    return "domain(" + scale$$1 + ")";
	}
	exports.domain = domain;

	});

	unwrapExports(scales);
	var scales_1 = scales.domain;

	var interval_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	var scales_1 = tslib_1.__importDefault(scales);
	exports.BRUSH = '_brush';
	exports.SCALE_TRIGGER = '_scale_trigger';
	var interval = {
	    predicate: 'vlInterval',
	    scaleDomain: 'vlIntervalDomain',
	    signals: function (model, selCmpt) {
	        var name = selCmpt.name;
	        var hasScales = scales_1.default.has(selCmpt);
	        var signals = [];
	        var intervals = [];
	        var tupleTriggers = [];
	        var scaleTriggers = [];
	        if (selCmpt.translate && !hasScales) {
	            var filterExpr_1 = "!event.item || event.item.mark.name !== " + vega_util_1.stringValue(name + exports.BRUSH);
	            events(selCmpt, function (_, evt) {
	                var filters = evt.between[0].filter || (evt.between[0].filter = []);
	                if (filters.indexOf(filterExpr_1) < 0) {
	                    filters.push(filterExpr_1);
	                }
	            });
	        }
	        for (var _i = 0, _a = selCmpt.project; _i < _a.length; _i++) {
	            var p = _a[_i];
	            var channel$$1 = p.channel;
	            if (channel$$1 !== channel.X && channel$$1 !== channel.Y) {
	                log$2.warn('Interval selections only support x and y encoding channels.');
	                continue;
	            }
	            var cs = channelSignals(model, selCmpt, channel$$1);
	            var dname = selection$2.channelSignalName(selCmpt, channel$$1, 'data');
	            var vname = selection$2.channelSignalName(selCmpt, channel$$1, 'visual');
	            var scaleStr = vega_util_1.stringValue(model.scaleName(channel$$1));
	            var scaleType = model.getScaleComponent(channel$$1).get('type');
	            var toNum = scale.hasContinuousDomain(scaleType) ? '+' : '';
	            signals.push.apply(signals, cs);
	            tupleTriggers.push(dname);
	            intervals.push("{encoding: " + vega_util_1.stringValue(channel$$1) + ", " + ("field: " + vega_util_1.stringValue(p.field) + ", extent: " + dname + "}"));
	            scaleTriggers.push({
	                scaleName: model.scaleName(channel$$1),
	                expr: "(!isArray(" + dname + ") || " +
	                    ("(" + toNum + "invert(" + scaleStr + ", " + vname + ")[0] === " + toNum + dname + "[0] && ") +
	                    (toNum + "invert(" + scaleStr + ", " + vname + ")[1] === " + toNum + dname + "[1]))")
	            });
	        }
	        // Proxy scale reactions to ensure that an infinite loop doesn't occur
	        // when an interval selection filter touches the scale.
	        if (!hasScales) {
	            signals.push({
	                name: name + exports.SCALE_TRIGGER,
	                update: scaleTriggers.map(function (t) { return t.expr; }).join(' && ') + (" ? " + (name + exports.SCALE_TRIGGER) + " : {}")
	            });
	        }
	        // Only add an interval to the store if it has valid data extents. Data extents
	        // are set to null if pixel extents are equal to account for intervals over
	        // ordinal/nominal domains which, when inverted, will still produce a valid datum.
	        return signals.concat({
	            name: name + selection$2.TUPLE,
	            on: [
	                {
	                    events: tupleTriggers.map(function (t) { return ({ signal: t }); }),
	                    update: tupleTriggers.join(' && ') + (" ? {unit: " + selection$2.unitName(model) + ", intervals: [" + intervals.join(', ') + "]} : null")
	                }
	            ]
	        });
	    },
	    modifyExpr: function (model, selCmpt) {
	        var tpl = selCmpt.name + selection$2.TUPLE;
	        return tpl + ', ' + (selCmpt.resolve === 'global' ? 'true' : "{unit: " + selection$2.unitName(model) + "}");
	    },
	    marks: function (model, selCmpt, marks) {
	        var name = selCmpt.name;
	        var _a = selection$2.positionalProjections(selCmpt), xi = _a.xi, yi = _a.yi;
	        var store = "data(" + vega_util_1.stringValue(selCmpt.name + selection$2.STORE) + ")";
	        // Do not add a brush if we're binding to scales.
	        if (scales_1.default.has(selCmpt)) {
	            return marks;
	        }
	        var update = {
	            x: xi !== null ? { signal: name + "_x[0]" } : { value: 0 },
	            y: yi !== null ? { signal: name + "_y[0]" } : { value: 0 },
	            x2: xi !== null ? { signal: name + "_x[1]" } : { field: { group: 'width' } },
	            y2: yi !== null ? { signal: name + "_y[1]" } : { field: { group: 'height' } }
	        };
	        // If the selection is resolved to global, only a single interval is in
	        // the store. Wrap brush mark's encodings with a production rule to test
	        // this based on the `unit` property. Hide the brush mark if it corresponds
	        // to a unit different from the one in the store.
	        if (selCmpt.resolve === 'global') {
	            for (var _i = 0, _b = util.keys(update); _i < _b.length; _i++) {
	                var key = _b[_i];
	                update[key] = [
	                    tslib_1.__assign({ test: store + ".length && " + store + "[0].unit === " + selection$2.unitName(model) }, update[key]),
	                    { value: 0 }
	                ];
	            }
	        }
	        // Two brush marks ensure that fill colors and other aesthetic choices do
	        // not interefere with the core marks, but that the brushed region can still
	        // be interacted with (e.g., dragging it around).
	        var _c = selCmpt.mark, fill = _c.fill, fillOpacity = _c.fillOpacity, stroke = tslib_1.__rest(_c, ["fill", "fillOpacity"]);
	        var vgStroke = util.keys(stroke).reduce(function (def, k) {
	            def[k] = [
	                {
	                    test: [xi !== null && name + "_x[0] !== " + name + "_x[1]", yi != null && name + "_y[0] !== " + name + "_y[1]"]
	                        .filter(function (x) { return x; })
	                        .join(' && '),
	                    value: stroke[k]
	                },
	                { value: null }
	            ];
	            return def;
	        }, {});
	        return [
	            {
	                name: name + exports.BRUSH + '_bg',
	                type: 'rect',
	                clip: true,
	                encode: {
	                    enter: {
	                        fill: { value: fill },
	                        fillOpacity: { value: fillOpacity }
	                    },
	                    update: update
	                }
	            }
	        ].concat(marks, {
	            name: name + exports.BRUSH,
	            type: 'rect',
	            clip: true,
	            encode: {
	                enter: {
	                    fill: { value: 'transparent' }
	                },
	                update: tslib_1.__assign({}, update, vgStroke)
	            }
	        });
	    }
	};
	exports.default = interval;
	/**
	 * Returns the visual and data signals for an interval selection.
	 */
	function channelSignals(model, selCmpt, channel$$1) {
	    var vname = selection$2.channelSignalName(selCmpt, channel$$1, 'visual');
	    var dname = selection$2.channelSignalName(selCmpt, channel$$1, 'data');
	    var hasScales = scales_1.default.has(selCmpt);
	    var scaleName = model.scaleName(channel$$1);
	    var scaleStr = vega_util_1.stringValue(scaleName);
	    var scale$$1 = model.getScaleComponent(channel$$1);
	    var scaleType = scale$$1 ? scale$$1.get('type') : undefined;
	    var size = model.getSizeSignalRef(channel$$1 === channel.X ? 'width' : 'height').signal;
	    var coord = channel$$1 + "(unit)";
	    var on = events(selCmpt, function (def, evt) {
	        return def.concat({ events: evt.between[0], update: "[" + coord + ", " + coord + "]" }, // Brush Start
	        { events: evt, update: "[" + vname + "[0], clamp(" + coord + ", 0, " + size + ")]" } // Brush End
	        );
	    });
	    // React to pan/zooms of continuous scales. Non-continuous scales
	    // (bin-linear, band, point) cannot be pan/zoomed and any other changes
	    // to their domains (e.g., filtering) should clear the brushes.
	    on.push({
	        events: { signal: selCmpt.name + exports.SCALE_TRIGGER },
	        update: scale.hasContinuousDomain(scaleType) && !scale.isBinScale(scaleType)
	            ? "[scale(" + scaleStr + ", " + dname + "[0]), scale(" + scaleStr + ", " + dname + "[1])]"
	            : "[0, 0]"
	    });
	    return hasScales
	        ? [{ name: dname, on: [] }]
	        : [
	            {
	                name: vname,
	                value: [],
	                on: on
	            },
	            {
	                name: dname,
	                on: [{ events: { signal: vname }, update: vname + "[0] === " + vname + "[1] ? null : invert(" + scaleStr + ", " + vname + ")" }]
	            }
	        ];
	}
	function events(selCmpt, cb) {
	    return selCmpt.events.reduce(function (on, evt) {
	        if (!evt.between) {
	            log$2.warn(evt + " is not an ordered event stream for interval selections");
	            return on;
	        }
	        return cb(on, evt);
	    }, []);
	}

	});

	unwrapExports(interval_1);
	var interval_2 = interval_1.BRUSH;
	var interval_3 = interval_1.SCALE_TRIGGER;

	var nearest_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var log = tslib_1.__importStar(log$2);


	var VORONOI = 'voronoi';
	var nearest = {
	    has: function (selCmpt) {
	        return selCmpt.type !== 'interval' && selCmpt.nearest;
	    },
	    marks: function (model, selCmpt, marks) {
	        var _a = selection$2.positionalProjections(selCmpt), x = _a.x, y = _a.y;
	        var markType = model.mark;
	        if (mark.isPathMark(markType)) {
	            log.warn(log.message.nearestNotSupportForContinuous(markType));
	            return marks;
	        }
	        var cellDef = {
	            name: model.getName(VORONOI),
	            type: 'path',
	            from: { data: model.getName('marks') },
	            encode: {
	                enter: {
	                    fill: { value: 'transparent' },
	                    strokeWidth: { value: 0.35 },
	                    stroke: { value: 'transparent' },
	                    isVoronoi: { value: true }
	                }
	            },
	            transform: [
	                {
	                    type: 'voronoi',
	                    x: { expr: x || (!x && !y) ? 'datum.datum.x || 0' : '0' },
	                    y: { expr: y || (!x && !y) ? 'datum.datum.y || 0' : '0' },
	                    size: [model.getSizeSignalRef('width'), model.getSizeSignalRef('height')]
	                }
	            ]
	        };
	        var index = 0;
	        var exists = false;
	        marks.forEach(function (mark$$1, i) {
	            var name = mark$$1.name || '';
	            if (name === model.component.mark[0].name) {
	                index = i;
	            }
	            else if (name.indexOf(VORONOI) >= 0) {
	                exists = true;
	            }
	        });
	        if (!exists) {
	            marks.splice(index + 1, 0, cellDef);
	        }
	        return marks;
	    }
	};
	exports.default = nearest;

	});

	unwrapExports(nearest_1);

	var multi_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var nearest_1$$1 = tslib_1.__importDefault(nearest_1);
	function signals(model, selCmpt) {
	    var proj = selCmpt.project;
	    var datum = nearest_1$$1.default.has(selCmpt) ? '(item().isVoronoi ? datum.datum : datum)' : 'datum';
	    var bins = [];
	    var encodings = proj
	        .map(function (p) { return vega_util_1.stringValue(p.channel); })
	        .filter(function (e) { return e; })
	        .join(', ');
	    var fields = proj.map(function (p) { return vega_util_1.stringValue(p.field); }).join(', ');
	    var values = proj
	        .map(function (p) {
	        var channel = p.channel;
	        var fieldDef = model.fieldDef(channel);
	        // Binned fields should capture extents, for a range test against the raw field.
	        return fieldDef && fieldDef.bin
	            ? (bins.push(p.field),
	                "[" + util.accessPathWithDatum(model.vgField(channel, {}), datum) + ", " +
	                    (util.accessPathWithDatum(model.vgField(channel, { binSuffix: 'end' }), datum) + "]"))
	            : "" + util.accessPathWithDatum(p.field, datum);
	    })
	        .join(', ');
	    // Only add a discrete selection to the store if a datum is present _and_
	    // the interaction isn't occurring on a group mark. This guards against
	    // polluting interactive state with invalid values in faceted displays
	    // as the group marks are also data-driven. We force the update to account
	    // for constant null states but varying toggles (e.g., shift-click in
	    // whitespace followed by a click in whitespace; the store should only
	    // be cleared on the second click).
	    return [
	        {
	            name: selCmpt.name + selection$2.TUPLE,
	            value: {},
	            on: [
	                {
	                    events: selCmpt.events,
	                    update: "datum && item().mark.marktype !== 'group' ? " +
	                        ("{unit: " + selection$2.unitName(model) + ", encodings: [" + encodings + "], ") +
	                        ("fields: [" + fields + "], values: [" + values + "]") +
	                        (bins.length ? ', ' + bins.map(function (b) { return vega_util_1.stringValue('bin_' + b) + ": 1"; }).join(', ') : '') +
	                        '} : null',
	                    force: true
	                }
	            ]
	        }
	    ];
	}
	exports.signals = signals;
	var multi = {
	    predicate: 'vlMulti',
	    scaleDomain: 'vlMultiDomain',
	    signals: signals,
	    modifyExpr: function (model, selCmpt) {
	        var tpl = selCmpt.name + selection$2.TUPLE;
	        return tpl + ', ' + (selCmpt.resolve === 'global' ? 'null' : "{unit: " + selection$2.unitName(model) + "}");
	    }
	};
	exports.default = multi;

	});

	unwrapExports(multi_1);
	var multi_2 = multi_1.signals;

	var single_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var single = {
	    predicate: 'vlSingle',
	    scaleDomain: 'vlSingleDomain',
	    signals: multi_1.signals,
	    topLevelSignals: function (model, selCmpt, signals) {
	        var hasSignal = signals.filter(function (s) { return s.name === selCmpt.name; });
	        var data = "data(" + vega_util_1.stringValue(selCmpt.name + selection$2.STORE) + ")";
	        var values = data + "[0].values";
	        return hasSignal.length
	            ? signals
	            : signals.concat({
	                name: selCmpt.name,
	                update: data + ".length && {" + selCmpt.project.map(function (p, i) { return p.field + ": " + values + "[" + i + "]"; }).join(', ') + '}'
	            });
	    },
	    modifyExpr: function (model, selCmpt) {
	        var tpl = selCmpt.name + selection$2.TUPLE;
	        return tpl + ', ' + (selCmpt.resolve === 'global' ? 'true' : "{unit: " + selection$2.unitName(model) + "}");
	    }
	};
	exports.default = single;

	});

	unwrapExports(single_1);

	var inputs = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var nearest_1$$1 = tslib_1.__importDefault(nearest_1);
	var inputBindings = {
	    has: function (selCmpt) {
	        return selCmpt.type === 'single' && selCmpt.resolve === 'global' && selCmpt.bind && selCmpt.bind !== 'scales';
	    },
	    topLevelSignals: function (model, selCmpt, signals) {
	        var name = selCmpt.name;
	        var proj = selCmpt.project;
	        var bind = selCmpt.bind;
	        var datum = nearest_1$$1.default.has(selCmpt) ? '(item().isVoronoi ? datum.datum : datum)' : 'datum';
	        proj.forEach(function (p) {
	            var sgname = util.varName(name + "_" + p.field);
	            var hasSignal = signals.filter(function (s) { return s.name === sgname; });
	            if (!hasSignal.length) {
	                signals.unshift({
	                    name: sgname,
	                    value: '',
	                    on: [
	                        {
	                            events: selCmpt.events,
	                            update: "datum && item().mark.marktype !== 'group' ? " + util.accessPathWithDatum(p.field, datum) + " : null"
	                        }
	                    ],
	                    bind: bind[p.field] || bind[p.channel] || bind
	                });
	            }
	        });
	        return signals;
	    },
	    signals: function (model, selCmpt, signals) {
	        var name = selCmpt.name;
	        var proj = selCmpt.project;
	        var signal = signals.filter(function (s) { return s.name === name + selection$2.TUPLE; })[0];
	        var fields = proj.map(function (p) { return vega_util_1.stringValue(p.field); }).join(', ');
	        var values = proj.map(function (p) { return util.varName(name + "_" + p.field); });
	        if (values.length) {
	            signal.update = values.join(' && ') + " ? {fields: [" + fields + "], values: [" + values.join(', ') + "]} : null";
	        }
	        delete signal.value;
	        delete signal.on;
	        return signals;
	    }
	};
	exports.default = inputBindings;

	});

	unwrapExports(inputs);

	var project_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var log = tslib_1.__importStar(log$2);


	var project = {
	    has: function (selDef) {
	        var def = selDef;
	        return def.fields !== undefined || def.encodings !== undefined;
	    },
	    parse: function (model, selDef, selCmpt) {
	        var channels = {};
	        var timeUnits = {};
	        // TODO: find a possible channel mapping for these fields.
	        (selDef.fields || []).forEach(function (field) { return (channels[field] = null); });
	        (selDef.encodings || []).forEach(function (channel) {
	            var fieldDef = model.fieldDef(channel);
	            if (fieldDef) {
	                if (fieldDef.timeUnit) {
	                    var tuField = model.vgField(channel);
	                    channels[tuField] = channel;
	                    // Construct TimeUnitComponents which will be combined into a
	                    // TimeUnitNode. This node may need to be inserted into the
	                    // dataflow if the selection is used across views that do not
	                    // have these time units defined.
	                    timeUnits[tuField] = {
	                        as: tuField,
	                        field: fieldDef.field,
	                        timeUnit: fieldDef.timeUnit
	                    };
	                }
	                else {
	                    channels[fieldDef.field] = channel;
	                }
	            }
	            else {
	                log.warn(log.message.cannotProjectOnChannelWithoutField(channel));
	            }
	        });
	        var projection = selCmpt.project || (selCmpt.project = []);
	        for (var field in channels) {
	            if (channels.hasOwnProperty(field)) {
	                projection.push({ field: field, channel: channels[field] });
	            }
	        }
	        var fields = selCmpt.fields || (selCmpt.fields = {});
	        projection.filter(function (p) { return p.channel; }).forEach(function (p) { return (fields[p.channel] = p.field); });
	        if (util.keys(timeUnits).length) {
	            selCmpt.timeUnit = new timeunit$2.TimeUnitNode(null, timeUnits);
	        }
	    }
	};
	exports.default = project;

	});

	unwrapExports(project_1);

	var toggle_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var TOGGLE = '_toggle';
	var toggle = {
	    has: function (selCmpt) {
	        return selCmpt.type === 'multi' && selCmpt.toggle;
	    },
	    signals: function (model, selCmpt, signals) {
	        return signals.concat({
	            name: selCmpt.name + TOGGLE,
	            value: false,
	            on: [{ events: selCmpt.events, update: selCmpt.toggle }]
	        });
	    },
	    modifyExpr: function (model, selCmpt, expr) {
	        var tpl = selCmpt.name + selection$2.TUPLE;
	        var signal = selCmpt.name + TOGGLE;
	        return (signal + " ? null : " + tpl + ", " +
	            (selCmpt.resolve === 'global' ? signal + " ? null : true, " : signal + " ? null : {unit: " + selection$2.unitName(model) + "}, ") +
	            (signal + " ? " + tpl + " : null"));
	    }
	};
	exports.default = toggle;

	});

	unwrapExports(toggle_1);

	var translate_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var scales_1 = tslib_1.__importStar(scales);
	var ANCHOR = '_translate_anchor';
	var DELTA = '_translate_delta';
	var translate = {
	    has: function (selCmpt) {
	        return selCmpt.type === 'interval' && selCmpt.translate;
	    },
	    signals: function (model, selCmpt, signals) {
	        var name = selCmpt.name;
	        var hasScales = scales_1.default.has(selCmpt);
	        var anchor = name + ANCHOR;
	        var _a = selection$2.positionalProjections(selCmpt), x = _a.x, y = _a.y;
	        var events = vegaEventSelector.selector(selCmpt.translate, 'scope');
	        if (!hasScales) {
	            events = events.map(function (e) { return ((e.between[0].markname = name + interval_1.BRUSH), e); });
	        }
	        signals.push({
	            name: anchor,
	            value: {},
	            on: [
	                {
	                    events: events.map(function (e) { return e.between[0]; }),
	                    update: '{x: x(unit), y: y(unit)' +
	                        (x !== null
	                            ? ', extent_x: ' +
	                                (hasScales ? scales_1.domain(model, channel.X) : "slice(" + selection$2.channelSignalName(selCmpt, 'x', 'visual') + ")")
	                            : '') +
	                        (y !== null
	                            ? ', extent_y: ' +
	                                (hasScales ? scales_1.domain(model, channel.Y) : "slice(" + selection$2.channelSignalName(selCmpt, 'y', 'visual') + ")")
	                            : '') +
	                        '}'
	                }
	            ]
	        }, {
	            name: name + DELTA,
	            value: {},
	            on: [
	                {
	                    events: events,
	                    update: "{x: " + anchor + ".x - x(unit), y: " + anchor + ".y - y(unit)}"
	                }
	            ]
	        });
	        if (x !== null) {
	            onDelta(model, selCmpt, channel.X, 'width', signals);
	        }
	        if (y !== null) {
	            onDelta(model, selCmpt, channel.Y, 'height', signals);
	        }
	        return signals;
	    }
	};
	exports.default = translate;
	function onDelta(model, selCmpt, channel$$1, size, signals) {
	    var name = selCmpt.name;
	    var hasScales = scales_1.default.has(selCmpt);
	    var signal = signals.filter(function (s) {
	        return s.name === selection$2.channelSignalName(selCmpt, channel$$1, hasScales ? 'data' : 'visual');
	    })[0];
	    var anchor = name + ANCHOR;
	    var delta = name + DELTA;
	    var sizeSg = model.getSizeSignalRef(size).signal;
	    var scaleCmpt = model.getScaleComponent(channel$$1);
	    var scaleType = scaleCmpt.get('type');
	    var sign = hasScales && channel$$1 === channel.X ? '-' : ''; // Invert delta when panning x-scales.
	    var extent = anchor + ".extent_" + channel$$1;
	    var offset = "" + sign + delta + "." + channel$$1 + " / " + (hasScales ? "" + sizeSg : "span(" + extent + ")");
	    var panFn = !hasScales
	        ? 'panLinear'
	        : scaleType === 'log'
	            ? 'panLog'
	            : scaleType === 'pow'
	                ? 'panPow'
	                : 'panLinear';
	    var update = panFn + "(" + extent + ", " + offset +
	        (hasScales && scaleType === 'pow' ? ", " + (scaleCmpt.get('exponent') || 1) : '') +
	        ')';
	    signal.on.push({
	        events: { signal: delta },
	        update: hasScales ? update : "clampRange(" + update + ", 0, " + sizeSg + ")"
	    });
	}

	});

	unwrapExports(translate_1);

	var zoom_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var scales_1 = tslib_1.__importStar(scales);
	var ANCHOR = '_zoom_anchor';
	var DELTA = '_zoom_delta';
	var zoom = {
	    has: function (selCmpt) {
	        return selCmpt.type === 'interval' && selCmpt.zoom;
	    },
	    signals: function (model, selCmpt, signals) {
	        var name = selCmpt.name;
	        var hasScales = scales_1.default.has(selCmpt);
	        var delta = name + DELTA;
	        var _a = selection$2.positionalProjections(selCmpt), x = _a.x, y = _a.y;
	        var sx = vega_util_1.stringValue(model.scaleName(channel.X));
	        var sy = vega_util_1.stringValue(model.scaleName(channel.Y));
	        var events = vegaEventSelector.selector(selCmpt.zoom, 'scope');
	        if (!hasScales) {
	            events = events.map(function (e) { return ((e.markname = name + interval_1.BRUSH), e); });
	        }
	        signals.push({
	            name: name + ANCHOR,
	            on: [
	                {
	                    events: events,
	                    update: !hasScales
	                        ? "{x: x(unit), y: y(unit)}"
	                        : '{' +
	                            [sx ? "x: invert(" + sx + ", x(unit))" : '', sy ? "y: invert(" + sy + ", y(unit))" : '']
	                                .filter(function (expr) { return !!expr; })
	                                .join(', ') +
	                            '}'
	                }
	            ]
	        }, {
	            name: delta,
	            on: [
	                {
	                    events: events,
	                    force: true,
	                    update: 'pow(1.001, event.deltaY * pow(16, event.deltaMode))'
	                }
	            ]
	        });
	        if (x !== null) {
	            onDelta(model, selCmpt, 'x', 'width', signals);
	        }
	        if (y !== null) {
	            onDelta(model, selCmpt, 'y', 'height', signals);
	        }
	        return signals;
	    }
	};
	exports.default = zoom;
	function onDelta(model, selCmpt, channel$$1, size, signals) {
	    var name = selCmpt.name;
	    var hasScales = scales_1.default.has(selCmpt);
	    var signal = signals.filter(function (s) {
	        return s.name === selection$2.channelSignalName(selCmpt, channel$$1, hasScales ? 'data' : 'visual');
	    })[0];
	    var sizeSg = model.getSizeSignalRef(size).signal;
	    var scaleCmpt = model.getScaleComponent(channel$$1);
	    var scaleType = scaleCmpt.get('type');
	    var base = hasScales ? scales_1.domain(model, channel$$1) : signal.name;
	    var delta = name + DELTA;
	    var anchor = "" + name + ANCHOR + "." + channel$$1;
	    var zoomFn = !hasScales
	        ? 'zoomLinear'
	        : scaleType === 'log'
	            ? 'zoomLog'
	            : scaleType === 'pow'
	                ? 'zoomPow'
	                : 'zoomLinear';
	    var update = zoomFn + "(" + base + ", " + anchor + ", " + delta +
	        (hasScales && scaleType === 'pow' ? ", " + (scaleCmpt.get('exponent') || 1) : '') +
	        ')';
	    signal.on.push({
	        events: { signal: delta },
	        update: hasScales ? update : "clampRange(" + update + ", 0, " + sizeSg + ")"
	    });
	}

	});

	unwrapExports(zoom_1);

	var transforms = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var inputs_1 = tslib_1.__importDefault(inputs);
	var nearest_1$$1 = tslib_1.__importDefault(nearest_1);
	var project_1$$1 = tslib_1.__importDefault(project_1);
	var scales_1 = tslib_1.__importDefault(scales);
	var toggle_1$$1 = tslib_1.__importDefault(toggle_1);
	var translate_1$$1 = tslib_1.__importDefault(translate_1);
	var zoom_1$$1 = tslib_1.__importDefault(zoom_1);
	var compilers = {
	    project: project_1$$1.default,
	    toggle: toggle_1$$1.default,
	    scales: scales_1.default,
	    translate: translate_1$$1.default,
	    zoom: zoom_1$$1.default,
	    inputs: inputs_1.default,
	    nearest: nearest_1$$1.default
	};
	function forEachTransform(selCmpt, cb) {
	    for (var t in compilers) {
	        if (compilers[t].has(selCmpt)) {
	            cb(compilers[t]);
	        }
	    }
	}
	exports.forEachTransform = forEachTransform;

	});

	unwrapExports(transforms);
	var transforms_1 = transforms.forEachTransform;

	var selection$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });








	var interval_1$$1 = tslib_1.__importDefault(interval_1);
	var multi_1$$1 = tslib_1.__importDefault(multi_1);
	var single_1$$1 = tslib_1.__importDefault(single_1);

	exports.STORE = '_store';
	exports.TUPLE = '_tuple';
	exports.MODIFY = '_modify';
	exports.SELECTION_DOMAIN = '_selection_domain_';
	function parseUnitSelection(model$$1, selDefs) {
	    var selCmpts = {};
	    var selectionConfig = model$$1.config.selection;
	    var _loop_1 = function (name_1) {
	        if (!selDefs.hasOwnProperty(name_1)) {
	            return "continue";
	        }
	        var selDef = selDefs[name_1];
	        var cfg = selectionConfig[selDef.type];
	        // Set default values from config if a property hasn't been specified,
	        // or if it is true. E.g., "translate": true should use the default
	        // event handlers for translate. However, true may be a valid value for
	        // a property (e.g., "nearest": true).
	        for (var key in cfg) {
	            // A selection should contain either `encodings` or `fields`, only use
	            // default values for these two values if neither of them is specified.
	            if ((key === 'encodings' && selDef.fields) || (key === 'fields' && selDef.encodings)) {
	                continue;
	            }
	            if (key === 'mark') {
	                selDef[key] = tslib_1.__assign({}, cfg[key], selDef[key]);
	            }
	            if (selDef[key] === undefined || selDef[key] === true) {
	                selDef[key] = cfg[key] || selDef[key];
	            }
	        }
	        name_1 = util.varName(name_1);
	        var selCmpt = (selCmpts[name_1] = tslib_1.__assign({}, selDef, { name: name_1, events: vega_util_1.isString(selDef.on) ? vegaEventSelector.selector(selDef.on, 'scope') : selDef.on }));
	        transforms.forEachTransform(selCmpt, function (txCompiler) {
	            if (txCompiler.parse) {
	                txCompiler.parse(model$$1, selDef, selCmpt);
	            }
	        });
	    };
	    for (var name_1 in selDefs) {
	        _loop_1(name_1);
	    }
	    return selCmpts;
	}
	exports.parseUnitSelection = parseUnitSelection;
	function assembleUnitSelectionSignals(model$$1, signals) {
	    forEachSelection(model$$1, function (selCmpt, selCompiler) {
	        var name = selCmpt.name;
	        var modifyExpr = selCompiler.modifyExpr(model$$1, selCmpt);
	        signals.push.apply(signals, selCompiler.signals(model$$1, selCmpt));
	        transforms.forEachTransform(selCmpt, function (txCompiler) {
	            if (txCompiler.signals) {
	                signals = txCompiler.signals(model$$1, selCmpt, signals);
	            }
	            if (txCompiler.modifyExpr) {
	                modifyExpr = txCompiler.modifyExpr(model$$1, selCmpt, modifyExpr);
	            }
	        });
	        signals.push({
	            name: name + exports.MODIFY,
	            on: [
	                {
	                    events: { signal: name + exports.TUPLE },
	                    update: "modify(" + vega_util_1.stringValue(selCmpt.name + exports.STORE) + ", " + modifyExpr + ")"
	                }
	            ]
	        });
	    });
	    var facetModel = getFacetModel(model$$1);
	    if (signals.length && facetModel) {
	        var name_2 = vega_util_1.stringValue(facetModel.getName('cell'));
	        signals.unshift({
	            name: 'facet',
	            value: {},
	            on: [
	                {
	                    events: vegaEventSelector.selector('mousemove', 'scope'),
	                    update: "isTuple(facet) ? facet : group(" + name_2 + ").datum"
	                }
	            ]
	        });
	    }
	    return signals;
	}
	exports.assembleUnitSelectionSignals = assembleUnitSelectionSignals;
	function assembleTopLevelSignals(model$$1, signals) {
	    var needsUnit = false;
	    forEachSelection(model$$1, function (selCmpt, selCompiler) {
	        if (selCompiler.topLevelSignals) {
	            signals = selCompiler.topLevelSignals(model$$1, selCmpt, signals);
	        }
	        transforms.forEachTransform(selCmpt, function (txCompiler) {
	            if (txCompiler.topLevelSignals) {
	                signals = txCompiler.topLevelSignals(model$$1, selCmpt, signals);
	            }
	        });
	        needsUnit = true;
	    });
	    if (needsUnit) {
	        var hasUnit = signals.filter(function (s) { return s.name === 'unit'; });
	        if (!hasUnit.length) {
	            signals.unshift({
	                name: 'unit',
	                value: {},
	                on: [{ events: 'mousemove', update: 'isTuple(group()) ? group() : unit' }]
	            });
	        }
	    }
	    return signals;
	}
	exports.assembleTopLevelSignals = assembleTopLevelSignals;
	function assembleUnitSelectionData(model$$1, data) {
	    forEachSelection(model$$1, function (selCmpt) {
	        var contains = data.filter(function (d) { return d.name === selCmpt.name + exports.STORE; });
	        if (!contains.length) {
	            data.push({ name: selCmpt.name + exports.STORE });
	        }
	    });
	    return data;
	}
	exports.assembleUnitSelectionData = assembleUnitSelectionData;
	function assembleUnitSelectionMarks(model$$1, marks) {
	    forEachSelection(model$$1, function (selCmpt, selCompiler) {
	        marks = selCompiler.marks ? selCompiler.marks(model$$1, selCmpt, marks) : marks;
	        transforms.forEachTransform(selCmpt, function (txCompiler) {
	            if (txCompiler.marks) {
	                marks = txCompiler.marks(model$$1, selCmpt, marks);
	            }
	        });
	    });
	    return marks;
	}
	exports.assembleUnitSelectionMarks = assembleUnitSelectionMarks;
	function assembleLayerSelectionMarks(model$$1, marks) {
	    model$$1.children.forEach(function (child) {
	        if (model.isUnitModel(child)) {
	            marks = assembleUnitSelectionMarks(child, marks);
	        }
	    });
	    return marks;
	}
	exports.assembleLayerSelectionMarks = assembleLayerSelectionMarks;
	function selectionPredicate(model$$1, selections, dfnode) {
	    var stores = [];
	    function expr(name) {
	        var vname = util.varName(name);
	        var selCmpt = model$$1.getSelectionComponent(vname, name);
	        var store = vega_util_1.stringValue(vname + exports.STORE);
	        if (selCmpt.timeUnit) {
	            var child = dfnode || model$$1.component.data.raw;
	            var tunode = selCmpt.timeUnit.clone();
	            if (child.parent) {
	                tunode.insertAsParentOf(child);
	            }
	            else {
	                child.parent = tunode;
	            }
	        }
	        if (selCmpt.empty !== 'none') {
	            stores.push(store);
	        }
	        return (compiler(selCmpt.type).predicate +
	            ("(" + store + ", datum") +
	            (selCmpt.resolve === 'global' ? ')' : ", " + vega_util_1.stringValue(selCmpt.resolve) + ")"));
	    }
	    var predicateStr = util.logicalExpr(selections, expr);
	    return ((stores.length ? '!(' + stores.map(function (s) { return "length(data(" + s + "))"; }).join(' || ') + ') || ' : '') + ("(" + predicateStr + ")"));
	}
	exports.selectionPredicate = selectionPredicate;
	// Selections are parsed _after_ scales. If a scale domain is set to
	// use a selection, the SELECTION_DOMAIN constant is used as the
	// domainRaw.signal during scale.parse and then replaced with the necessary
	// selection expression function during scale.assemble. To not pollute the
	// type signatures to account for this setup, the selection domain definition
	// is coerced to a string and appended to SELECTION_DOMAIN.
	function isRawSelectionDomain(domainRaw) {
	    return domainRaw.signal.indexOf(exports.SELECTION_DOMAIN) >= 0;
	}
	exports.isRawSelectionDomain = isRawSelectionDomain;
	function selectionScaleDomain(model$$1, domainRaw) {
	    var selDomain = JSON.parse(domainRaw.signal.replace(exports.SELECTION_DOMAIN, ''));
	    var name = util.varName(selDomain.selection);
	    var selCmpt = model$$1.component.selection && model$$1.component.selection[name];
	    if (selCmpt) {
	        log$2.warn('Use "bind": "scales" to setup a binding for scales and selections within the same view.');
	    }
	    else {
	        selCmpt = model$$1.getSelectionComponent(name, selDomain.selection);
	        if (!selDomain.encoding && !selDomain.field) {
	            selDomain.field = selCmpt.project[0].field;
	            if (selCmpt.project.length > 1) {
	                log$2.warn('A "field" or "encoding" must be specified when using a selection as a scale domain. ' +
	                    ("Using \"field\": " + vega_util_1.stringValue(selDomain.field) + "."));
	            }
	        }
	        return {
	            signal: compiler(selCmpt.type).scaleDomain +
	                ("(" + vega_util_1.stringValue(name + exports.STORE) + ", " + vega_util_1.stringValue(selDomain.encoding || null) + ", ") +
	                vega_util_1.stringValue(selDomain.field || null) +
	                (selCmpt.resolve === 'global' ? ')' : ", " + vega_util_1.stringValue(selCmpt.resolve) + ")")
	        };
	    }
	    return { signal: 'null' };
	}
	exports.selectionScaleDomain = selectionScaleDomain;
	// Utility functions
	function forEachSelection(model$$1, cb) {
	    var selections = model$$1.component.selection;
	    for (var name_3 in selections) {
	        if (selections.hasOwnProperty(name_3)) {
	            var sel = selections[name_3];
	            cb(sel, compiler(sel.type));
	        }
	    }
	}
	function compiler(type) {
	    switch (type) {
	        case 'single':
	            return single_1$$1.default;
	        case 'multi':
	            return multi_1$$1.default;
	        case 'interval':
	            return interval_1$$1.default;
	    }
	    return null;
	}
	function getFacetModel(model$$1) {
	    var parent = model$$1.parent;
	    while (parent) {
	        if (model.isFacetModel(parent)) {
	            break;
	        }
	        parent = parent.parent;
	    }
	    return parent;
	}
	function unitName(model$$1) {
	    var name = vega_util_1.stringValue(model$$1.name);
	    var facet = getFacetModel(model$$1);
	    if (facet) {
	        name +=
	            (facet.facet.row ? " + '_' + (" + util.accessPathWithDatum(facet.vgField('row'), 'facet') + ")" : '') +
	                (facet.facet.column ? " + '_' + (" + util.accessPathWithDatum(facet.vgField('column'), 'facet') + ")" : '');
	    }
	    return name;
	}
	exports.unitName = unitName;
	function requiresSelectionId(model$$1) {
	    var identifier = false;
	    forEachSelection(model$$1, function (selCmpt) {
	        identifier = identifier || selCmpt.project.some(function (proj) { return proj.field === selection.SELECTION_ID; });
	    });
	    return identifier;
	}
	exports.requiresSelectionId = requiresSelectionId;
	function channelSignalName(selCmpt, channel$$1, range) {
	    var sgNames = selCmpt._signalNames || (selCmpt._signalNames = {});
	    if (sgNames[channel$$1] && sgNames[channel$$1][range]) {
	        return sgNames[channel$$1][range];
	    }
	    sgNames[channel$$1] = sgNames[channel$$1] || {};
	    var basename = util.varName(selCmpt.name + '_' + (range === 'visual' ? channel$$1 : selCmpt.fields[channel$$1]));
	    var name = basename;
	    var counter = 1;
	    while (sgNames[name]) {
	        name = basename + "_" + counter++;
	    }
	    return (sgNames[name] = sgNames[channel$$1][range] = name);
	}
	exports.channelSignalName = channelSignalName;
	function positionalProjections(selCmpt) {
	    var x = null;
	    var xi = null;
	    var y = null;
	    var yi = null;
	    selCmpt.project.forEach(function (p, i) {
	        if (p.channel === channel.X) {
	            x = p;
	            xi = i;
	        }
	        else if (p.channel === channel.Y) {
	            y = p;
	            yi = i;
	        }
	    });
	    return { x: x, xi: xi, y: y, yi: yi };
	}
	exports.positionalProjections = positionalProjections;

	});

	unwrapExports(selection$2);
	var selection_2$1 = selection$2.STORE;
	var selection_3 = selection$2.TUPLE;
	var selection_4 = selection$2.MODIFY;
	var selection_5 = selection$2.SELECTION_DOMAIN;
	var selection_6 = selection$2.parseUnitSelection;
	var selection_7 = selection$2.assembleUnitSelectionSignals;
	var selection_8 = selection$2.assembleTopLevelSignals;
	var selection_9 = selection$2.assembleUnitSelectionData;
	var selection_10 = selection$2.assembleUnitSelectionMarks;
	var selection_11 = selection$2.assembleLayerSelectionMarks;
	var selection_12 = selection$2.selectionPredicate;
	var selection_13 = selection$2.isRawSelectionDomain;
	var selection_14 = selection$2.selectionScaleDomain;
	var selection_15 = selection$2.unitName;
	var selection_16 = selection$2.requiresSelectionId;
	var selection_17 = selection$2.channelSignalName;
	var selection_18 = selection$2.positionalProjections;

	var predicate = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	function isSelectionPredicate(predicate) {
	    return predicate && predicate['selection'];
	}
	exports.isSelectionPredicate = isSelectionPredicate;
	function isFieldEqualPredicate(predicate) {
	    return predicate && !!predicate.field && predicate.equal !== undefined;
	}
	exports.isFieldEqualPredicate = isFieldEqualPredicate;
	function isFieldLTPredicate(predicate) {
	    return predicate && !!predicate.field && predicate.lt !== undefined;
	}
	exports.isFieldLTPredicate = isFieldLTPredicate;
	function isFieldLTEPredicate(predicate) {
	    return predicate && !!predicate.field && predicate.lte !== undefined;
	}
	exports.isFieldLTEPredicate = isFieldLTEPredicate;
	function isFieldGTPredicate(predicate) {
	    return predicate && !!predicate.field && predicate.gt !== undefined;
	}
	exports.isFieldGTPredicate = isFieldGTPredicate;
	function isFieldGTEPredicate(predicate) {
	    return predicate && !!predicate.field && predicate.gte !== undefined;
	}
	exports.isFieldGTEPredicate = isFieldGTEPredicate;
	function isFieldRangePredicate(predicate) {
	    if (predicate && predicate.field) {
	        if (vega_util_1.isArray(predicate.range) && predicate.range.length === 2) {
	            return true;
	        }
	    }
	    return false;
	}
	exports.isFieldRangePredicate = isFieldRangePredicate;
	function isFieldOneOfPredicate(predicate) {
	    return (predicate && !!predicate.field && (vega_util_1.isArray(predicate.oneOf) || vega_util_1.isArray(predicate.in)) // backward compatibility
	    );
	}
	exports.isFieldOneOfPredicate = isFieldOneOfPredicate;
	function isFieldValidPredicate(predicate) {
	    return predicate && !!predicate.field && predicate.valid !== undefined;
	}
	exports.isFieldValidPredicate = isFieldValidPredicate;
	function isFieldPredicate(predicate) {
	    return (isFieldOneOfPredicate(predicate) ||
	        isFieldEqualPredicate(predicate) ||
	        isFieldRangePredicate(predicate) ||
	        isFieldLTPredicate(predicate) ||
	        isFieldGTPredicate(predicate) ||
	        isFieldLTEPredicate(predicate) ||
	        isFieldGTEPredicate(predicate));
	}
	exports.isFieldPredicate = isFieldPredicate;
	/**
	 * Converts a predicate into an expression.
	 */
	// model is only used for selection filters.
	function expression(model, filterOp, node) {
	    return util.logicalExpr(filterOp, function (predicate) {
	        if (vega_util_1.isString(predicate)) {
	            return predicate;
	        }
	        else if (isSelectionPredicate(predicate)) {
	            return selection$2.selectionPredicate(model, predicate.selection, node);
	        }
	        else {
	            // Filter Object
	            return fieldFilterExpression(predicate);
	        }
	    });
	}
	exports.expression = expression;
	function predicateValueExpr(v, timeUnit) {
	    return fielddef.valueExpr(v, { timeUnit: timeUnit, time: true });
	}
	function predicateValuesExpr(vals, timeUnit) {
	    return vals.map(function (v) { return predicateValueExpr(v, timeUnit); });
	}
	// This method is used by Voyager.  Do not change its behavior without changing Voyager.
	function fieldFilterExpression(predicate, useInRange) {
	    if (useInRange === void 0) { useInRange = true; }
	    var field = predicate.field, timeUnit = predicate.timeUnit;
	    var fieldExpr = timeUnit
	        ? // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
	            // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
	            // TODO: support utc
	            'time(' + timeunit.fieldExpr(timeUnit, field) + ')'
	        : fielddef.vgField(predicate, { expr: 'datum' });
	    if (isFieldEqualPredicate(predicate)) {
	        return fieldExpr + '===' + predicateValueExpr(predicate.equal, timeUnit);
	    }
	    else if (isFieldLTPredicate(predicate)) {
	        var upper = predicate.lt;
	        return fieldExpr + "<" + predicateValueExpr(upper, timeUnit);
	    }
	    else if (isFieldGTPredicate(predicate)) {
	        var lower = predicate.gt;
	        return fieldExpr + ">" + predicateValueExpr(lower, timeUnit);
	    }
	    else if (isFieldLTEPredicate(predicate)) {
	        var upper = predicate.lte;
	        return fieldExpr + "<=" + predicateValueExpr(upper, timeUnit);
	    }
	    else if (isFieldGTEPredicate(predicate)) {
	        var lower = predicate.gte;
	        return fieldExpr + ">=" + predicateValueExpr(lower, timeUnit);
	    }
	    else if (isFieldOneOfPredicate(predicate)) {
	        return "indexof([" + predicateValuesExpr(predicate.oneOf, timeUnit).join(',') + "], " + fieldExpr + ") !== -1";
	    }
	    else if (isFieldValidPredicate(predicate)) {
	        return predicate.valid ? fieldExpr + "!==null&&!isNaN(" + fieldExpr + ")" : fieldExpr + "===null||isNaN(" + fieldExpr + ")";
	    }
	    else if (isFieldRangePredicate(predicate)) {
	        var lower = predicate.range[0];
	        var upper = predicate.range[1];
	        if (lower !== null && upper !== null && useInRange) {
	            return ('inrange(' +
	                fieldExpr +
	                ', [' +
	                predicateValueExpr(lower, timeUnit) +
	                ', ' +
	                predicateValueExpr(upper, timeUnit) +
	                '])');
	        }
	        var exprs = [];
	        if (lower !== null) {
	            exprs.push(fieldExpr + " >= " + predicateValueExpr(lower, timeUnit));
	        }
	        if (upper !== null) {
	            exprs.push(fieldExpr + " <= " + predicateValueExpr(upper, timeUnit));
	        }
	        return exprs.length > 0 ? exprs.join(' && ') : 'true';
	    }
	    /* istanbul ignore next: it should never reach here */
	    throw new Error("Invalid field predicate: " + JSON.stringify(predicate));
	}
	exports.fieldFilterExpression = fieldFilterExpression;
	function normalizePredicate(f) {
	    if (isFieldPredicate(f) && f.timeUnit) {
	        return tslib_1.__assign({}, f, { timeUnit: timeunit.normalizeTimeUnit(f.timeUnit) });
	    }
	    return f;
	}
	exports.normalizePredicate = normalizePredicate;

	});

	unwrapExports(predicate);
	var predicate_1 = predicate.isSelectionPredicate;
	var predicate_2 = predicate.isFieldEqualPredicate;
	var predicate_3 = predicate.isFieldLTPredicate;
	var predicate_4 = predicate.isFieldLTEPredicate;
	var predicate_5 = predicate.isFieldGTPredicate;
	var predicate_6 = predicate.isFieldGTEPredicate;
	var predicate_7 = predicate.isFieldRangePredicate;
	var predicate_8 = predicate.isFieldOneOfPredicate;
	var predicate_9 = predicate.isFieldValidPredicate;
	var predicate_10 = predicate.isFieldPredicate;
	var predicate_11 = predicate.expression;
	var predicate_12 = predicate.fieldFilterExpression;
	var predicate_13 = predicate.normalizePredicate;

	var transform = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function isFilter(t) {
	    return t['filter'] !== undefined;
	}
	exports.isFilter = isFilter;
	function isImputeSequence(t) {
	    return t && t['start'] !== undefined && t['stop'] !== undefined;
	}
	exports.isImputeSequence = isImputeSequence;
	function isLookup(t) {
	    return t['lookup'] !== undefined;
	}
	exports.isLookup = isLookup;
	function isSample(t) {
	    return t['sample'] !== undefined;
	}
	exports.isSample = isSample;
	function isWindow(t) {
	    return t['window'] !== undefined;
	}
	exports.isWindow = isWindow;
	function isFlatten(t) {
	    return t['flatten'] !== undefined;
	}
	exports.isFlatten = isFlatten;
	function isCalculate(t) {
	    return t['calculate'] !== undefined;
	}
	exports.isCalculate = isCalculate;
	function isBin(t) {
	    return !!t['bin'];
	}
	exports.isBin = isBin;
	function isImpute(t) {
	    return t['impute'] !== undefined;
	}
	exports.isImpute = isImpute;
	function isTimeUnit(t) {
	    return t['timeUnit'] !== undefined;
	}
	exports.isTimeUnit = isTimeUnit;
	function isAggregate(t) {
	    return t['aggregate'] !== undefined;
	}
	exports.isAggregate = isAggregate;
	function isStack(t) {
	    return t['stack'] !== undefined;
	}
	exports.isStack = isStack;
	function isFold(t) {
	    return t['fold'] !== undefined;
	}
	exports.isFold = isFold;
	function normalizeTransform(transform) {
	    return transform.map(function (t) {
	        if (isFilter(t)) {
	            return {
	                filter: logical.normalizeLogicalOperand(t.filter, predicate.normalizePredicate)
	            };
	        }
	        return t;
	    });
	}
	exports.normalizeTransform = normalizeTransform;

	});

	unwrapExports(transform);
	var transform_1 = transform.isFilter;
	var transform_2 = transform.isImputeSequence;
	var transform_3 = transform.isLookup;
	var transform_4 = transform.isSample;
	var transform_5 = transform.isWindow;
	var transform_6 = transform.isFlatten;
	var transform_7 = transform.isCalculate;
	var transform_8 = transform.isBin;
	var transform_9 = transform.isImpute;
	var transform_10 = transform.isTimeUnit;
	var transform_11 = transform.isAggregate;
	var transform_12 = transform.isStack;
	var transform_13 = transform.isFold;
	var transform_14 = transform.normalizeTransform;

	var bin$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });








	function rangeFormula(model$$1, fieldDef, channel, config) {
	    if (common$2.binRequiresRange(fieldDef, channel)) {
	        // read format from axis or legend, if there is no format then use config.numberFormat
	        var guide = model.isUnitModel(model$$1) ? model$$1.axis(channel) || model$$1.legend(channel) || {} : {};
	        var startField = fielddef.vgField(fieldDef, { expr: 'datum' });
	        var endField = fielddef.vgField(fieldDef, { expr: 'datum', binSuffix: 'end' });
	        return {
	            formulaAs: fielddef.vgField(fieldDef, { binSuffix: 'range', forAs: true }),
	            formula: common$2.binFormatExpression(startField, endField, guide.format, config)
	        };
	    }
	    return {};
	}
	function binKey(bin$$1, field) {
	    return bin.binToString(bin$$1) + "_" + field;
	}
	function getSignalsFromModel(model$$1, key) {
	    return {
	        signal: model$$1.getName(key + "_bins"),
	        extentSignal: model$$1.getName(key + "_extent")
	    };
	}
	function isBinTransform(t) {
	    return 'as' in t;
	}
	function createBinComponent(t, bin$$1, model$$1) {
	    var as;
	    if (isBinTransform(t)) {
	        as = vega_util_1.isString(t.as) ? [t.as, t.as + "_end"] : [t.as[0], t.as[1]];
	    }
	    else {
	        as = [fielddef.vgField(t, { forAs: true }), fielddef.vgField(t, { binSuffix: 'end', forAs: true })];
	    }
	    var normalizedBin = fielddef.normalizeBin(bin$$1, undefined) || {};
	    var key = binKey(normalizedBin, t.field);
	    var _a = getSignalsFromModel(model$$1, key), signal = _a.signal, extentSignal = _a.extentSignal;
	    var binComponent = tslib_1.__assign({ bin: normalizedBin, field: t.field, as: as }, (signal ? { signal: signal } : {}), (extentSignal ? { extentSignal: extentSignal } : {}));
	    return { key: key, binComponent: binComponent };
	}
	var BinNode = /** @class */ (function (_super) {
	    tslib_1.__extends(BinNode, _super);
	    function BinNode(parent, bins) {
	        var _this = _super.call(this, parent) || this;
	        _this.bins = bins;
	        return _this;
	    }
	    BinNode.prototype.clone = function () {
	        return new BinNode(null, util.duplicate(this.bins));
	    };
	    BinNode.makeFromEncoding = function (parent, model$$1) {
	        var bins = model$$1.reduceFieldDef(function (binComponentIndex, fieldDef, channel) {
	            if (bin.isBinning(fieldDef.bin)) {
	                var _a = createBinComponent(fieldDef, fieldDef.bin, model$$1), key = _a.key, binComponent = _a.binComponent;
	                binComponentIndex[key] = tslib_1.__assign({}, binComponent, binComponentIndex[key], rangeFormula(model$$1, fieldDef, channel, model$$1.config));
	            }
	            return binComponentIndex;
	        }, {});
	        if (util.keys(bins).length === 0) {
	            return null;
	        }
	        return new BinNode(parent, bins);
	    };
	    /**
	     * Creates a bin node from BinTransform.
	     * The optional parameter should provide
	     */
	    BinNode.makeFromTransform = function (parent, t, model$$1) {
	        var _a;
	        var _b = createBinComponent(t, t.bin, model$$1), key = _b.key, binComponent = _b.binComponent;
	        return new BinNode(parent, (_a = {},
	            _a[key] = binComponent,
	            _a));
	    };
	    BinNode.prototype.merge = function (other) {
	        this.bins = tslib_1.__assign({}, this.bins, other.bins);
	        other.remove();
	    };
	    BinNode.prototype.producedFields = function () {
	        var out = {};
	        util.vals(this.bins).forEach(function (c) {
	            c.as.forEach(function (f) { return (out[f] = true); });
	        });
	        return out;
	    };
	    BinNode.prototype.dependentFields = function () {
	        var out = {};
	        util.vals(this.bins).forEach(function (c) {
	            out[c.field] = true;
	        });
	        return out;
	    };
	    BinNode.prototype.hash = function () {
	        return "Bin " + util.hash(this.bins);
	    };
	    BinNode.prototype.assemble = function () {
	        return util.flatten(util.vals(this.bins).map(function (bin$$1) {
	            var transform = [];
	            var binTrans = tslib_1.__assign({ type: 'bin', field: bin$$1.field, as: bin$$1.as, signal: bin$$1.signal }, bin$$1.bin);
	            if (!bin$$1.bin.extent && bin$$1.extentSignal) {
	                transform.push({
	                    type: 'extent',
	                    field: bin$$1.field,
	                    signal: bin$$1.extentSignal
	                });
	                binTrans.extent = { signal: bin$$1.extentSignal };
	            }
	            transform.push(binTrans);
	            if (bin$$1.formula) {
	                transform.push({
	                    type: 'formula',
	                    expr: bin$$1.formula,
	                    as: bin$$1.formulaAs
	                });
	            }
	            return transform;
	        }));
	    };
	    return BinNode;
	}(dataflow.TransformNode));
	exports.BinNode = BinNode;

	});

	unwrapExports(bin$2);
	var bin_2$1 = bin$2.BinNode;

	var filter = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var FilterNode = /** @class */ (function (_super) {
	    tslib_1.__extends(FilterNode, _super);
	    function FilterNode(parent, model, filter) {
	        var _this = _super.call(this, parent) || this;
	        _this.model = model;
	        _this.filter = filter;
	        _this.expr = predicate.expression(_this.model, _this.filter, _this);
	        _this._dependentFields = expressions.getDependentFields(_this.expr);
	        return _this;
	    }
	    FilterNode.prototype.clone = function () {
	        return new FilterNode(null, this.model, util.duplicate(this.filter));
	    };
	    FilterNode.prototype.dependentFields = function () {
	        return this._dependentFields;
	    };
	    FilterNode.prototype.assemble = function () {
	        return {
	            type: 'filter',
	            expr: this.expr
	        };
	    };
	    FilterNode.prototype.hash = function () {
	        return "Filter " + util.hash(this.filter);
	    };
	    return FilterNode;
	}(dataflow.TransformNode));
	exports.FilterNode = FilterNode;

	});

	unwrapExports(filter);
	var filter_1 = filter.FilterNode;

	var flatten = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * A class for flatten transform nodes
	 */
	var FlattenTransformNode = /** @class */ (function (_super) {
	    tslib_1.__extends(FlattenTransformNode, _super);
	    function FlattenTransformNode(parent, transform) {
	        var _this = _super.call(this, parent) || this;
	        _this.transform = transform;
	        var _a = _this.transform, flatten = _a.flatten, _b = _a.as, as = _b === void 0 ? [] : _b;
	        _this.transform.as = flatten.map(function (f, i) { return as[i] || f; });
	        return _this;
	    }
	    FlattenTransformNode.prototype.clone = function () {
	        return new FlattenTransformNode(this.parent, util.duplicate(this.transform));
	    };
	    FlattenTransformNode.prototype.producedFields = function () {
	        var _this = this;
	        return this.transform.flatten.reduce(function (out, field, i) {
	            out[_this.transform.as[i]] = true;
	            return out;
	        }, {});
	    };
	    FlattenTransformNode.prototype.hash = function () {
	        return "FlattenTransform " + util.hash(this.transform);
	    };
	    FlattenTransformNode.prototype.assemble = function () {
	        var _a = this.transform, fields = _a.flatten, as = _a.as;
	        var result = {
	            type: 'flatten',
	            fields: fields,
	            as: as
	        };
	        return result;
	    };
	    return FlattenTransformNode;
	}(dataflow.TransformNode));
	exports.FlattenTransformNode = FlattenTransformNode;

	});

	unwrapExports(flatten);
	var flatten_1 = flatten.FlattenTransformNode;

	var fold = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * A class for flatten transform nodes
	 */
	var FoldTransformNode = /** @class */ (function (_super) {
	    tslib_1.__extends(FoldTransformNode, _super);
	    function FoldTransformNode(parent, transform) {
	        var _this = _super.call(this, parent) || this;
	        _this.transform = transform;
	        var specifiedAs = _this.transform.as || [undefined, undefined];
	        _this.transform.as = [specifiedAs[0] || 'key', specifiedAs[1] || 'value'];
	        return _this;
	    }
	    FoldTransformNode.prototype.clone = function () {
	        return new FoldTransformNode(this.parent, util.duplicate(this.transform));
	    };
	    FoldTransformNode.prototype.producedFields = function () {
	        return this.transform.as.reduce(function (result, item) {
	            result[item] = true;
	            return result;
	        }, {});
	    };
	    FoldTransformNode.prototype.hash = function () {
	        return "FoldTransform " + util.hash(this.transform);
	    };
	    FoldTransformNode.prototype.assemble = function () {
	        var _a = this.transform, fold = _a.fold, as = _a.as;
	        var result = {
	            type: 'fold',
	            fields: fold,
	            as: as
	        };
	        return result;
	    };
	    return FoldTransformNode;
	}(dataflow.TransformNode));
	exports.FoldTransformNode = FoldTransformNode;

	});

	unwrapExports(fold);
	var fold_1 = fold.FoldTransformNode;

	var geojson = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var GeoJSONNode = /** @class */ (function (_super) {
	    tslib_1.__extends(GeoJSONNode, _super);
	    function GeoJSONNode(parent, fields, geojson, signal) {
	        var _this = _super.call(this, parent) || this;
	        _this.fields = fields;
	        _this.geojson = geojson;
	        _this.signal = signal;
	        return _this;
	    }
	    GeoJSONNode.prototype.clone = function () {
	        return new GeoJSONNode(null, util.duplicate(this.fields), this.geojson, this.signal);
	    };
	    GeoJSONNode.parseAll = function (parent, model) {
	        var geoJsonCounter = 0;
	        [[channel.LONGITUDE, channel.LATITUDE], [channel.LONGITUDE2, channel.LATITUDE2]].forEach(function (coordinates) {
	            var pair = coordinates.map(function (channel$$1) { return (model.channelHasField(channel$$1) ? model.fieldDef(channel$$1).field : undefined); });
	            if (pair[0] || pair[1]) {
	                parent = new GeoJSONNode(parent, pair, null, model.getName("geojson_" + geoJsonCounter++));
	            }
	        });
	        if (model.channelHasField(channel.SHAPE)) {
	            var fieldDef = model.fieldDef(channel.SHAPE);
	            if (fieldDef.type === type.GEOJSON) {
	                parent = new GeoJSONNode(parent, null, fieldDef.field, model.getName("geojson_" + geoJsonCounter++));
	            }
	        }
	        return parent;
	    };
	    GeoJSONNode.prototype.assemble = function () {
	        return tslib_1.__assign({ type: 'geojson' }, (this.fields ? { fields: this.fields } : {}), (this.geojson ? { geojson: this.geojson } : {}), { signal: this.signal });
	    };
	    return GeoJSONNode;
	}(dataflow.DataFlowNode));
	exports.GeoJSONNode = GeoJSONNode;

	});

	unwrapExports(geojson);
	var geojson_1 = geojson.GeoJSONNode;

	var geopoint = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var GeoPointNode = /** @class */ (function (_super) {
	    tslib_1.__extends(GeoPointNode, _super);
	    function GeoPointNode(parent, projection, fields, as) {
	        var _this = _super.call(this, parent) || this;
	        _this.projection = projection;
	        _this.fields = fields;
	        _this.as = as;
	        return _this;
	    }
	    GeoPointNode.prototype.clone = function () {
	        return new GeoPointNode(null, this.projection, util.duplicate(this.fields), util.duplicate(this.as));
	    };
	    GeoPointNode.parseAll = function (parent, model) {
	        if (!model.projectionName()) {
	            return parent;
	        }
	        [[channel.LONGITUDE, channel.LATITUDE], [channel.LONGITUDE2, channel.LATITUDE2]].forEach(function (coordinates) {
	            var pair = coordinates.map(function (channel$$1) { return (model.channelHasField(channel$$1) ? model.fieldDef(channel$$1).field : undefined); });
	            var suffix = coordinates[0] === channel.LONGITUDE2 ? '2' : '';
	            if (pair[0] || pair[1]) {
	                parent = new GeoPointNode(parent, model.projectionName(), pair, [
	                    model.getName('x' + suffix),
	                    model.getName('y' + suffix)
	                ]);
	            }
	        });
	        return parent;
	    };
	    GeoPointNode.prototype.assemble = function () {
	        return {
	            type: 'geopoint',
	            projection: this.projection,
	            fields: this.fields,
	            as: this.as
	        };
	    };
	    return GeoPointNode;
	}(dataflow.DataFlowNode));
	exports.GeoPointNode = GeoPointNode;

	});

	unwrapExports(geopoint);
	var geopoint_1 = geopoint.GeoPointNode;

	var identifier = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var IdentifierNode = /** @class */ (function (_super) {
	    tslib_1.__extends(IdentifierNode, _super);
	    function IdentifierNode(parent) {
	        return _super.call(this, parent) || this;
	    }
	    IdentifierNode.prototype.clone = function () {
	        return new IdentifierNode(null);
	    };
	    IdentifierNode.prototype.producedFields = function () {
	        var _a;
	        return _a = {}, _a[selection.SELECTION_ID] = true, _a;
	    };
	    IdentifierNode.prototype.assemble = function () {
	        return { type: 'identifier', as: selection.SELECTION_ID };
	    };
	    return IdentifierNode;
	}(dataflow.DataFlowNode));
	exports.IdentifierNode = IdentifierNode;

	});

	unwrapExports(identifier);
	var identifier_1 = identifier.IdentifierNode;

	var area = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var mixins$$1 = tslib_1.__importStar(mixins);
	exports.area = {
	    vgMark: 'area',
	    encodeEntry: function (model) {
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'ignore', orient: 'include' }), mixins$$1.pointPosition('x', model, 'zeroOrMin'), mixins$$1.pointPosition('y', model, 'zeroOrMin'), mixins$$1.pointPosition2(model, 'zeroOrMin', model.markDef.orient === 'horizontal' ? 'x2' : 'y2'), mixins$$1.defined(model));
	    }
	};

	});

	unwrapExports(area);
	var area_1 = area.area;

	var bar = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var log = tslib_1.__importStar(log$2);




	var mixins$$1 = tslib_1.__importStar(mixins);
	var ref = tslib_1.__importStar(valueref);
	exports.bar = {
	    vgMark: 'rect',
	    encodeEntry: function (model) {
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), x(model), y(model));
	    }
	};
	function x(model) {
	    var config = model.config, encoding = model.encoding, markDef = model.markDef, width = model.width;
	    var orient = markDef.orient;
	    var sizeDef = encoding.size;
	    var xDef = encoding.x;
	    var x2Def = encoding.x2;
	    var xScaleName = model.scaleName(channel.X);
	    var xScale = model.getScaleComponent(channel.X);
	    // x, x2, and width -- we must specify two of these in all conditions
	    if (fielddef.isFieldDef(xDef) && bin.isBinned(xDef.bin)) {
	        return mixins$$1.binPosition(xDef, x2Def, channel.X, xScaleName, util.getFirstDefined(markDef.binSpacing, config.bar.binSpacing), xScale.get('reverse'));
	    }
	    else if (orient === 'horizontal' || x2Def) {
	        return tslib_1.__assign({}, mixins$$1.pointPosition('x', model, 'zeroOrMin'), mixins$$1.pointPosition2(model, 'zeroOrMin', 'x2'));
	    }
	    else {
	        // vertical
	        if (fielddef.isFieldDef(xDef)) {
	            var xScaleType = xScale.get('type');
	            if (bin.isBinning(xDef.bin) && !sizeDef && !scale.hasDiscreteDomain(xScaleType)) {
	                return mixins$$1.binPosition(xDef, undefined, channel.X, model.scaleName('x'), util.getFirstDefined(markDef.binSpacing, config.bar.binSpacing), xScale.get('reverse'));
	            }
	            else {
	                if (xScaleType === scale.ScaleType.BAND) {
	                    return mixins$$1.bandPosition(xDef, 'x', model);
	                }
	            }
	        }
	        // sized bin, normal point-ordinal axis, quantitative x-axis, or no x
	        return mixins$$1.centeredBandPosition('x', model, tslib_1.__assign({}, ref.mid(width)), defaultSizeRef(markDef, xScaleName, xScale, config));
	    }
	}
	function y(model) {
	    var config = model.config, encoding = model.encoding, height = model.height, markDef = model.markDef;
	    var orient = markDef.orient;
	    var sizeDef = encoding.size;
	    var yDef = encoding.y;
	    var y2Def = encoding.y2;
	    var yScaleName = model.scaleName(channel.Y);
	    var yScale = model.getScaleComponent(channel.Y);
	    // y, y2 & height -- we must specify two of these in all conditions
	    if (fielddef.isFieldDef(yDef) && bin.isBinned(yDef.bin)) {
	        return mixins$$1.binPosition(yDef, y2Def, channel.Y, yScaleName, util.getFirstDefined(markDef.binSpacing, config.bar.binSpacing), yScale.get('reverse'));
	    }
	    else if (orient === 'vertical' || y2Def) {
	        return tslib_1.__assign({}, mixins$$1.pointPosition('y', model, 'zeroOrMin'), mixins$$1.pointPosition2(model, 'zeroOrMin', 'y2'));
	    }
	    else {
	        if (fielddef.isFieldDef(yDef)) {
	            var yScaleType = yScale.get('type');
	            if (bin.isBinning(yDef.bin) && !sizeDef && !scale.hasDiscreteDomain(yScaleType)) {
	                return mixins$$1.binPosition(yDef, undefined, channel.Y, model.scaleName('y'), util.getFirstDefined(markDef.binSpacing, config.bar.binSpacing), yScale.get('reverse'));
	            }
	            else if (yScaleType === scale.ScaleType.BAND) {
	                return mixins$$1.bandPosition(yDef, 'y', model);
	            }
	        }
	        return mixins$$1.centeredBandPosition('y', model, ref.mid(height), defaultSizeRef(markDef, yScaleName, yScale, config));
	    }
	}
	function defaultSizeRef(markDef, scaleName, scale$$1, config) {
	    if (markDef.size !== undefined) {
	        return { value: markDef.size };
	    }
	    var sizeConfig = common$2.getMarkConfig('size', markDef, config, {
	        // config.mark.size shouldn't affect bar size
	        skipGeneralMarkConfig: true
	    });
	    if (sizeConfig !== undefined) {
	        return { value: sizeConfig };
	    }
	    if (scale$$1) {
	        var scaleType = scale$$1.get('type');
	        if (scaleType === 'point' || scaleType === 'band') {
	            if (config.bar.discreteBandSize !== undefined) {
	                return { value: config.bar.discreteBandSize };
	            }
	            if (scaleType === scale.ScaleType.POINT) {
	                var scaleRange = scale$$1.get('range');
	                if (vega_schema.isVgRangeStep(scaleRange) && vega_util_1.isNumber(scaleRange.step)) {
	                    return { value: scaleRange.step - 1 };
	                }
	                log.warn(log.message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL);
	            }
	            else {
	                // BAND
	                return ref.bandRef(scaleName);
	            }
	        }
	        else {
	            // continuous scale
	            return { value: config.bar.continuousBandSize };
	        }
	    }
	    // No Scale
	    var value = util.getFirstDefined(
	    // No scale is like discrete bar (with one item)
	    config.bar.discreteBandSize, config.scale.rangeStep ? config.scale.rangeStep - 1 : undefined, 
	    // If somehow default rangeStep is set to null or undefined, use 20 as back up
	    20);
	    return { value: value };
	}

	});

	unwrapExports(bar);
	var bar_1 = bar.bar;

	var geoshape = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var mixins$$1 = tslib_1.__importStar(mixins);


	exports.geoshape = {
	    vgMark: 'shape',
	    encodeEntry: function (model) {
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }));
	    },
	    postEncodingTransform: function (model) {
	        var encoding = model.encoding;
	        var shapeDef = encoding.shape;
	        var transform = tslib_1.__assign({ type: 'geoshape', projection: model.projectionName() }, (shapeDef && fielddef.isFieldDef(shapeDef) && shapeDef.type === type.GEOJSON
	            ? { field: fielddef.vgField(shapeDef, { expr: 'datum' }) }
	            : {}));
	        return [transform];
	    }
	};

	});

	unwrapExports(geoshape);
	var geoshape_1 = geoshape.geoshape;

	var line = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var mixins$$1 = tslib_1.__importStar(mixins);
	var ref = tslib_1.__importStar(valueref);
	exports.line = {
	    vgMark: 'line',
	    encodeEntry: function (model) {
	        var width = model.width, height = model.height;
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), mixins$$1.pointPosition('x', model, ref.mid(width)), mixins$$1.pointPosition('y', model, ref.mid(height)), mixins$$1.nonPosition('size', model, {
	            vgChannel: 'strokeWidth' // VL's line size is strokeWidth
	        }), mixins$$1.defined(model));
	    }
	};
	exports.trail = {
	    vgMark: 'trail',
	    encodeEntry: function (model) {
	        var width = model.width, height = model.height;
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'include', orient: 'ignore' }), mixins$$1.pointPosition('x', model, ref.mid(width)), mixins$$1.pointPosition('y', model, ref.mid(height)), mixins$$1.nonPosition('size', model), mixins$$1.defined(model));
	    }
	};

	});

	unwrapExports(line);
	var line_1 = line.line;
	var line_2 = line.trail;

	var point = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var mixins$$1 = tslib_1.__importStar(mixins);
	var ref = tslib_1.__importStar(valueref);
	function encodeEntry(model, fixedShape) {
	    var config = model.config, markDef = model.markDef, width = model.width, height = model.height;
	    return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'include', orient: 'ignore' }), mixins$$1.pointPosition('x', model, ref.mid(width)), mixins$$1.pointPosition('y', model, ref.mid(height)), mixins$$1.nonPosition('size', model, { defaultValue: common$2.getMarkConfig('size', markDef, config) }), shapeMixins(model, config, fixedShape));
	}
	function shapeMixins(model, config, fixedShape) {
	    if (fixedShape) {
	        return { shape: { value: fixedShape } };
	    }
	    return mixins$$1.nonPosition('shape', model, { defaultValue: common$2.getMarkConfig('shape', model.markDef, config) });
	}
	exports.shapeMixins = shapeMixins;
	exports.point = {
	    vgMark: 'symbol',
	    encodeEntry: function (model) {
	        return encodeEntry(model);
	    }
	};
	exports.circle = {
	    vgMark: 'symbol',
	    encodeEntry: function (model) {
	        return encodeEntry(model, 'circle');
	    }
	};
	exports.square = {
	    vgMark: 'symbol',
	    encodeEntry: function (model) {
	        return encodeEntry(model, 'square');
	    }
	};

	});

	unwrapExports(point);
	var point_1 = point.shapeMixins;
	var point_2 = point.point;
	var point_3 = point.circle;
	var point_4 = point.square;

	var rect = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var log = tslib_1.__importStar(log$2);


	var mixins$$1 = tslib_1.__importStar(mixins);
	exports.rect = {
	    vgMark: 'rect',
	    encodeEntry: function (model) {
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), x(model), y(model));
	    }
	};
	function x(model) {
	    var xDef = model.encoding.x;
	    var x2Def = model.encoding.x2;
	    var xScale = model.getScaleComponent(channel.X);
	    var xScaleType = xScale ? xScale.get('type') : undefined;
	    var xScaleName = model.scaleName(channel.X);
	    if (fielddef.isFieldDef(xDef) && (bin.isBinning(xDef.bin) || bin.isBinned(xDef.bin))) {
	        return mixins$$1.binPosition(xDef, x2Def, channel.X, xScaleName, 0, xScale.get('reverse'));
	    }
	    else if (fielddef.isFieldDef(xDef) && xScale && scale.hasDiscreteDomain(xScaleType)) {
	        /* istanbul ignore else */
	        if (xScaleType === scale.ScaleType.BAND) {
	            return mixins$$1.bandPosition(xDef, 'x', model);
	        }
	        else {
	            // We don't support rect mark with point/ordinal scale
	            throw new Error(log.message.scaleTypeNotWorkWithMark(mark.RECT, xScaleType));
	        }
	    }
	    else {
	        // continuous scale or no scale
	        return tslib_1.__assign({}, mixins$$1.pointPosition('x', model, 'zeroOrMax'), mixins$$1.pointPosition2(model, 'zeroOrMin', 'x2'));
	    }
	}
	exports.x = x;
	function y(model) {
	    var yDef = model.encoding.y;
	    var y2Def = model.encoding.y2;
	    var yScale = model.getScaleComponent(channel.Y);
	    var yScaleType = yScale ? yScale.get('type') : undefined;
	    var yScaleName = model.scaleName(channel.Y);
	    if (fielddef.isFieldDef(yDef) && (bin.isBinning(yDef.bin) || bin.isBinned(yDef.bin))) {
	        return mixins$$1.binPosition(yDef, y2Def, channel.Y, yScaleName, 0, yScale.get('reverse'));
	    }
	    else if (fielddef.isFieldDef(yDef) && yScale && scale.hasDiscreteDomain(yScaleType)) {
	        /* istanbul ignore else */
	        if (yScaleType === scale.ScaleType.BAND) {
	            return mixins$$1.bandPosition(yDef, 'y', model);
	        }
	        else {
	            // We don't support rect mark with point/ordinal scale
	            throw new Error(log.message.scaleTypeNotWorkWithMark(mark.RECT, yScaleType));
	        }
	    }
	    else {
	        // continuous scale or no scale
	        return tslib_1.__assign({}, mixins$$1.pointPosition('y', model, 'zeroOrMax'), mixins$$1.pointPosition2(model, 'zeroOrMin', 'y2'));
	    }
	}
	exports.y = y;

	});

	unwrapExports(rect);
	var rect_1 = rect.rect;
	var rect_2 = rect.x;
	var rect_3 = rect.y;

	var rule = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var mixins$$1 = tslib_1.__importStar(mixins);
	var ref = tslib_1.__importStar(valueref);
	exports.rule = {
	    vgMark: 'rule',
	    encodeEntry: function (model) {
	        var markDef = model.markDef, width = model.width, height = model.height;
	        var orient = markDef.orient;
	        if (!model.encoding.x && !model.encoding.y && !model.encoding.latitude && !model.encoding.longitude) {
	            // Show nothing if we have none of x, y, lat, and long.
	            return {};
	        }
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), mixins$$1.pointPosition('x', model, orient === 'horizontal' ? 'zeroOrMin' : ref.mid(width)), mixins$$1.pointPosition('y', model, orient === 'vertical' ? 'zeroOrMin' : ref.mid(height)), (orient !== 'vertical' ? mixins$$1.pointPosition2(model, 'zeroOrMax', 'x2') : {}), (orient !== 'horizontal' ? mixins$$1.pointPosition2(model, 'zeroOrMax', 'y2') : {}), mixins$$1.nonPosition('size', model, {
	            vgChannel: 'strokeWidth',
	            defaultValue: markDef.size
	        }));
	    }
	};

	});

	unwrapExports(rule);
	var rule_1 = rule.rule;

	var text$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var mixins$$1 = tslib_1.__importStar(mixins);
	var ref = tslib_1.__importStar(valueref);
	exports.text = {
	    vgMark: 'text',
	    encodeEntry: function (model) {
	        var config = model.config, encoding = model.encoding, width = model.width, height = model.height, markDef = model.markDef;
	        // We have to support mark property and config for both size and fontSize for text
	        // - size is from original Vega-Lite, which allows users to easily transition from size channel of other marks to text.
	        // - fontSize is from Vega and we need support it to make sure that all Vega configs all work correctly in Vega-Lite.
	        // Precedence: markDef > style config > mark-specific config
	        // For each of them, fontSize is more specific than size, thus has higher precedence
	        var defaultValue = util.getFirstDefined(markDef.fontSize, markDef.size, common$2.getStyleConfig('fontSize', markDef, config.style), common$2.getStyleConfig('size', markDef, config.style), config[markDef.type].fontSize, config[markDef.type].size
	        // general mark config shouldn't be used as they are only for point/circle/square
	        );
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), mixins$$1.pointPosition('x', model, ref.mid(width)), mixins$$1.pointPosition('y', model, ref.mid(height)), mixins$$1.text(model), mixins$$1.nonPosition('size', model, {
	            defaultValue: defaultValue,
	            vgChannel: 'fontSize' // VL's text size is fontSize
	        }), mixins$$1.valueIfDefined('align', align(model.markDef, encoding, config)));
	    }
	};
	function align(markDef, encoding, config) {
	    var a = markDef.align || common$2.getMarkConfig('align', markDef, config);
	    if (a === undefined) {
	        return 'center';
	    }
	    // If there is a config, Vega-parser will process this already.
	    return undefined;
	}

	});

	unwrapExports(text$1);
	var text_1 = text$1.text;

	var tick = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var mixins$$1 = tslib_1.__importStar(mixins);
	var ref = tslib_1.__importStar(valueref);
	exports.tick = {
	    vgMark: 'rect',
	    encodeEntry: function (model) {
	        var _a;
	        var config = model.config, markDef = model.markDef, width = model.width, height = model.height;
	        var orient = markDef.orient;
	        var vgSizeChannel = orient === 'horizontal' ? 'width' : 'height';
	        var vgThicknessChannel = orient === 'horizontal' ? 'height' : 'width';
	        return tslib_1.__assign({}, mixins$$1.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), mixins$$1.pointPosition('x', model, ref.mid(width), 'xc'), mixins$$1.pointPosition('y', model, ref.mid(height), 'yc'), mixins$$1.nonPosition('size', model, {
	            defaultValue: defaultSize(model),
	            vgChannel: vgSizeChannel
	        }), (_a = {}, _a[vgThicknessChannel] = { value: util.getFirstDefined(markDef.thickness, config.tick.thickness) }, _a));
	    }
	};
	function defaultSize(model) {
	    var config = model.config, markDef = model.markDef;
	    var orient = markDef.orient;
	    var scale = model.getScaleComponent(orient === 'horizontal' ? 'x' : 'y');
	    if (markDef.size !== undefined) {
	        return markDef.size;
	    }
	    else if (config.tick.bandSize !== undefined) {
	        return config.tick.bandSize;
	    }
	    else {
	        var scaleRange = scale ? scale.get('range') : undefined;
	        var rangeStep = scaleRange && vega_schema.isVgRangeStep(scaleRange) ? scaleRange.step : config.scale.rangeStep;
	        if (typeof rangeStep !== 'number') {
	            // FIXME consolidate this log
	            throw new Error('Function does not handle non-numeric rangeStep');
	        }
	        return rangeStep / 1.5;
	    }
	}

	});

	unwrapExports(tick);
	var tick_1 = tick.tick;

	var mark$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


















	var markCompiler = {
	    area: area.area,
	    bar: bar.bar,
	    circle: point.circle,
	    geoshape: geoshape.geoshape,
	    line: line.line,
	    point: point.point,
	    rect: rect.rect,
	    rule: rule.rule,
	    square: point.square,
	    text: text$1.text,
	    tick: tick.tick,
	    trail: line.trail
	};
	function parseMarkGroup(model) {
	    if (util.contains([mark.LINE, mark.AREA, mark.TRAIL], model.mark)) {
	        return parsePathMark(model);
	    }
	    else {
	        return getMarkGroups(model);
	    }
	}
	exports.parseMarkGroup = parseMarkGroup;
	var FACETED_PATH_PREFIX = 'faceted_path_';
	function parsePathMark(model) {
	    var details = pathGroupingFields(model.mark, model.encoding);
	    var pathMarks = getMarkGroups(model, {
	        // If has subfacet for line/area group, need to use faceted data from below.
	        fromPrefix: details.length > 0 ? FACETED_PATH_PREFIX : ''
	    });
	    if (details.length > 0) {
	        // have level of details - need to facet line into subgroups
	        // TODO: for non-stacked plot, map order to zindex. (Maybe rename order for layer to zindex?)
	        return [
	            {
	                name: model.getName('pathgroup'),
	                type: 'group',
	                from: {
	                    facet: {
	                        name: FACETED_PATH_PREFIX + model.requestDataName(data.MAIN),
	                        data: model.requestDataName(data.MAIN),
	                        groupby: details
	                    }
	                },
	                encode: {
	                    update: {
	                        width: { field: { group: 'width' } },
	                        height: { field: { group: 'height' } }
	                    }
	                },
	                marks: pathMarks
	            }
	        ];
	    }
	    else {
	        return pathMarks;
	    }
	}
	function getSort(model) {
	    var encoding$$1 = model.encoding, stack = model.stack, mark$$1 = model.mark, markDef = model.markDef;
	    var order = encoding$$1.order;
	    if (!vega_util_1.isArray(order) && fielddef.isValueDef(order)) {
	        return undefined;
	    }
	    else if ((vega_util_1.isArray(order) || fielddef.isFieldDef(order)) && !stack) {
	        // Sort by the order field if it is specified and the field is not stacked. (For stacked field, order specify stack order.)
	        return common$2.sortParams(order, { expr: 'datum' });
	    }
	    else if (mark.isPathMark(mark$$1)) {
	        // For both line and area, we sort values based on dimension by default
	        var dimensionChannelDef = encoding$$1[markDef.orient === 'horizontal' ? 'y' : 'x'];
	        if (fielddef.isFieldDef(dimensionChannelDef)) {
	            var s = dimensionChannelDef.sort;
	            var sortField = sort.isSortField(s)
	                ? fielddef.vgField({
	                    // FIXME: this op might not already exist?
	                    // FIXME: what if dimensionChannel (x or y) contains custom domain?
	                    aggregate: encoding.isAggregate(model.encoding) ? s.op : undefined,
	                    field: s.field
	                }, { expr: 'datum' })
	                : fielddef.vgField(dimensionChannelDef, {
	                    // For stack with imputation, we only have bin_mid
	                    binSuffix: model.stack && model.stack.impute ? 'mid' : undefined,
	                    expr: 'datum'
	                });
	            return {
	                field: sortField,
	                order: 'descending'
	            };
	        }
	        return undefined;
	    }
	    return undefined;
	}
	exports.getSort = getSort;
	function getMarkGroups(model, opt) {
	    if (opt === void 0) { opt = { fromPrefix: '' }; }
	    var mark$$1 = model.mark;
	    var clip = util.getFirstDefined(model.markDef.clip, scaleClip(model));
	    var style = common$2.getStyles(model.markDef);
	    var key = model.encoding.key;
	    var sort$$1 = getSort(model);
	    var postEncodingTransform = markCompiler[mark$$1].postEncodingTransform
	        ? markCompiler[mark$$1].postEncodingTransform(model)
	        : null;
	    return [
	        tslib_1.__assign({ name: model.getName('marks'), type: markCompiler[mark$$1].vgMark }, (clip ? { clip: true } : {}), (style ? { style: style } : {}), (key ? { key: { field: key.field } } : {}), (sort$$1 ? { sort: sort$$1 } : {}), { from: { data: opt.fromPrefix + model.requestDataName(data.MAIN) }, encode: {
	                update: markCompiler[mark$$1].encodeEntry(model)
	            } }, (postEncodingTransform
	            ? {
	                transform: postEncodingTransform
	            }
	            : {}))
	    ];
	}
	/**
	 * Returns list of path grouping fields
	 * that the model's spec contains.
	 */
	function pathGroupingFields(mark$$1, encoding$$1) {
	    return util.keys(encoding$$1).reduce(function (details, channel) {
	        switch (channel) {
	            // x, y, x2, y2, lat, long, lat1, long2, order, tooltip, href, cursor should not cause lines to group
	            case 'x':
	            case 'y':
	            case 'order':
	            case 'href':
	            case 'x2':
	            case 'y2':
	            case 'latitude':
	            case 'longitude':
	            case 'latitude2':
	            case 'longitude2':
	            // TODO: case 'cursor':
	            // text, shape, shouldn't be a part of line/trail/area
	            case 'text':
	            case 'shape':
	                return details;
	            case 'tooltip':
	            case 'detail':
	            case 'key':
	                var channelDef = encoding$$1[channel];
	                if (vega_util_1.isArray(channelDef) || fielddef.isFieldDef(channelDef)) {
	                    (vega_util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (fieldDef) {
	                        if (!fieldDef.aggregate) {
	                            details.push(fielddef.vgField(fieldDef, {}));
	                        }
	                    });
	                }
	                return details;
	            case 'size':
	                if (mark$$1 === 'trail') {
	                    // For trail, size should not group trail lines.
	                    return details;
	                }
	            // For line, it should group lines.
	            /* tslint:disable */
	            // intentional fall through
	            case 'color':
	            case 'fill':
	            case 'stroke':
	            case 'opacity':
	                // TODO strokeDashOffset:
	                /* tslint:enable */
	                var fieldDef = fielddef.getFieldDef(encoding$$1[channel]);
	                if (fieldDef && !fieldDef.aggregate) {
	                    details.push(fielddef.vgField(fieldDef, {}));
	                }
	                return details;
	            default:
	                throw new Error("Bug: Channel " + channel + " unimplemented for line mark");
	        }
	    }, []);
	}
	exports.pathGroupingFields = pathGroupingFields;
	/**
	 * If scales are bound to interval selections, we want to automatically clip
	 * marks to account for panning/zooming interactions. We identify bound scales
	 * by the domainRaw property, which gets added during scale parsing.
	 */
	function scaleClip(model) {
	    var xScale = model.getScaleComponent('x');
	    var yScale = model.getScaleComponent('y');
	    return (xScale && xScale.get('domainRaw')) || (yScale && yScale.get('domainRaw')) ? true : false;
	}

	});

	unwrapExports(mark$2);
	var mark_2$1 = mark$2.parseMarkGroup;
	var mark_3$1 = mark$2.getSort;
	var mark_4$1 = mark$2.pathGroupingFields;

	var impute = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var ImputeNode = /** @class */ (function (_super) {
	    tslib_1.__extends(ImputeNode, _super);
	    function ImputeNode(parent, transform$$1) {
	        var _this = _super.call(this, parent) || this;
	        _this.transform = transform$$1;
	        return _this;
	    }
	    ImputeNode.prototype.clone = function () {
	        return new ImputeNode(this.parent, util.duplicate(this.transform));
	    };
	    ImputeNode.prototype.producedFields = function () {
	        var _a;
	        // typescript detects true as boolean type
	        return _a = {}, _a[this.transform.impute] = true, _a;
	    };
	    ImputeNode.prototype.processSequence = function (keyvals) {
	        var _a = keyvals.start, start = _a === void 0 ? 0 : _a, stop = keyvals.stop, step = keyvals.step;
	        var result = [start, stop].concat((step ? [step] : [])).join(',');
	        return { signal: "sequence(" + result + ")" };
	    };
	    ImputeNode.makeFromTransform = function (parent, imputeTransform) {
	        return new ImputeNode(parent, imputeTransform);
	    };
	    ImputeNode.makeFromEncoding = function (parent, model) {
	        var encoding = model.encoding;
	        var xDef = encoding.x;
	        var yDef = encoding.y;
	        if (fielddef.isFieldDef(xDef) && fielddef.isFieldDef(yDef)) {
	            var imputedChannel = xDef.impute ? xDef : yDef.impute ? yDef : undefined;
	            if (imputedChannel === undefined) {
	                return undefined;
	            }
	            var keyChannel = xDef.impute ? yDef : yDef.impute ? xDef : undefined;
	            var _a = imputedChannel.impute, method = _a.method, value = _a.value, frame = _a.frame, keyvals = _a.keyvals;
	            var groupbyFields = mark$2.pathGroupingFields(model.mark, encoding);
	            return new ImputeNode(parent, tslib_1.__assign({ impute: imputedChannel.field, key: keyChannel.field }, (method ? { method: method } : {}), (value !== undefined ? { value: value } : {}), (frame ? { frame: frame } : {}), (keyvals !== undefined ? { keyvals: keyvals } : {}), (groupbyFields.length ? { groupby: groupbyFields } : {})));
	        }
	        return null;
	    };
	    ImputeNode.prototype.hash = function () {
	        return "Impute " + util.hash(this.transform);
	    };
	    ImputeNode.prototype.assemble = function () {
	        var _a = this.transform, impute = _a.impute, key = _a.key, keyvals = _a.keyvals, method = _a.method, groupby = _a.groupby, value = _a.value, _b = _a.frame, frame = _b === void 0 ? [null, null] : _b;
	        var initialImpute = tslib_1.__assign({ type: 'impute', field: impute, key: key }, (keyvals ? { keyvals: transform.isImputeSequence(keyvals) ? this.processSequence(keyvals) : keyvals } : {}), { method: 'value' }, (groupby ? { groupby: groupby } : {}), { value: null });
	        var setImputedField;
	        if (method && method !== 'value') {
	            var deriveNewField = tslib_1.__assign({ type: 'window', as: ["imputed_" + impute + "_value"], ops: [method], fields: [impute], frame: frame, ignorePeers: false }, (groupby ? { groupby: groupby } : {}));
	            var replaceOriginal = {
	                type: 'formula',
	                expr: "datum." + impute + " === null ? datum.imputed_" + impute + "_value : datum." + impute,
	                as: impute
	            };
	            setImputedField = [deriveNewField, replaceOriginal];
	        }
	        else {
	            var replaceWithValue = {
	                type: 'formula',
	                expr: "datum." + impute + " === null ? " + value + " : datum." + impute,
	                as: impute
	            };
	            setImputedField = [replaceWithValue];
	        }
	        return [initialImpute].concat(setImputedField);
	    };
	    return ImputeNode;
	}(dataflow.TransformNode));
	exports.ImputeNode = ImputeNode;

	});

	unwrapExports(impute);
	var impute_1 = impute.ImputeNode;

	var data$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Class to track interesting properties (see https://15721.courses.cs.cmu.edu/spring2016/papers/graefe-ieee1995.pdf)
	 * about how fields have been parsed or whether they have been derived in a transform. We use this to not parse the
	 * same field again (or differently).
	 */
	var AncestorParse = /** @class */ (function (_super) {
	    tslib_1.__extends(AncestorParse, _super);
	    function AncestorParse(explicit, implicit, parseNothing) {
	        if (explicit === void 0) { explicit = {}; }
	        if (implicit === void 0) { implicit = {}; }
	        if (parseNothing === void 0) { parseNothing = false; }
	        var _this = _super.call(this, explicit, implicit) || this;
	        _this.explicit = explicit;
	        _this.implicit = implicit;
	        _this.parseNothing = parseNothing;
	        return _this;
	    }
	    AncestorParse.prototype.clone = function () {
	        var clone = _super.prototype.clone.call(this);
	        clone.parseNothing = this.parseNothing;
	        return clone;
	    };
	    return AncestorParse;
	}(split.Split));
	exports.AncestorParse = AncestorParse;

	});

	unwrapExports(data$2);
	var data_1$1 = data$2.AncestorParse;

	var lookup = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var log = tslib_1.__importStar(log$2);



	var LookupNode = /** @class */ (function (_super) {
	    tslib_1.__extends(LookupNode, _super);
	    function LookupNode(parent, transform, secondary) {
	        var _this = _super.call(this, parent) || this;
	        _this.transform = transform;
	        _this.secondary = secondary;
	        return _this;
	    }
	    LookupNode.make = function (parent, model, transform, counter) {
	        var sources = model.component.data.sources;
	        var s = new source$1.SourceNode(transform.from.data);
	        var fromSource = sources[s.hash()];
	        if (!fromSource) {
	            sources[s.hash()] = s;
	            fromSource = s;
	        }
	        var fromOutputName = model.getName("lookup_" + counter);
	        var fromOutputNode = new dataflow.OutputNode(fromSource, fromOutputName, 'lookup', model.component.data.outputNodeRefCounts);
	        model.component.data.outputNodes[fromOutputName] = fromOutputNode;
	        return new LookupNode(parent, transform, fromOutputNode.getSource());
	    };
	    LookupNode.prototype.producedFields = function () {
	        return vega_util_1.toSet(this.transform.from.fields || (this.transform.as instanceof Array ? this.transform.as : [this.transform.as]));
	    };
	    LookupNode.prototype.hash = function () {
	        return "Lookup " + util.hash({ transform: this.transform, secondary: this.secondary });
	    };
	    LookupNode.prototype.assemble = function () {
	        var foreign;
	        if (this.transform.from.fields) {
	            // lookup a few fields and add create a flat output
	            foreign = tslib_1.__assign({ values: this.transform.from.fields }, (this.transform.as ? { as: this.transform.as instanceof Array ? this.transform.as : [this.transform.as] } : {}));
	        }
	        else {
	            // lookup full record and nest it
	            var asName = this.transform.as;
	            if (!vega_util_1.isString(asName)) {
	                log.warn(log.message.NO_FIELDS_NEEDS_AS);
	                asName = '_lookup';
	            }
	            foreign = {
	                as: [asName]
	            };
	        }
	        return tslib_1.__assign({ type: 'lookup', from: this.secondary, key: this.transform.from.key, fields: [this.transform.lookup] }, foreign, (this.transform.default ? { default: this.transform.default } : {}));
	    };
	    return LookupNode;
	}(dataflow.TransformNode));
	exports.LookupNode = LookupNode;

	});

	unwrapExports(lookup);
	var lookup_1 = lookup.LookupNode;

	var sample = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * A class for the sample transform nodes
	 */
	var SampleTransformNode = /** @class */ (function (_super) {
	    tslib_1.__extends(SampleTransformNode, _super);
	    function SampleTransformNode(parent, transform) {
	        var _this = _super.call(this, parent) || this;
	        _this.transform = transform;
	        return _this;
	    }
	    SampleTransformNode.prototype.clone = function () {
	        return new SampleTransformNode(this.parent, util.duplicate(this.transform));
	    };
	    SampleTransformNode.prototype.hash = function () {
	        return "SampleTransform " + util.hash(this.transform);
	    };
	    SampleTransformNode.prototype.assemble = function () {
	        return {
	            type: 'sample',
	            size: this.transform.sample
	        };
	    };
	    return SampleTransformNode;
	}(dataflow.TransformNode));
	exports.SampleTransformNode = SampleTransformNode;

	});

	unwrapExports(sample);
	var sample_1 = sample.SampleTransformNode;

	var assemble$a = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






















	/**
	 * Print debug information for dataflow tree.
	 */
	// tslint:disable-next-line
	function debug(node) {
	    console.log("" + node.constructor.name + (node.debugName ? " (" + node.debugName + ")" : '') + " -> " + node.children.map(function (c) {
	        return "" + c.constructor.name + (c.debugName ? " (" + c.debugName + ")" : '');
	    }));
	    console.log(node);
	    node.children.forEach(debug);
	}
	exports.debug = debug;
	function makeWalkTree(data$$1) {
	    // to name datasources
	    var datasetIndex = 0;
	    /**
	     * Recursively walk down the tree.
	     */
	    function walkTree(node, dataSource) {
	        if (node instanceof source$1.SourceNode) {
	            // If the source is a named data source or a data source with values, we need
	            // to put it in a different data source. Otherwise, Vega may override the data.
	            if (!data.isUrlData(node.data)) {
	                data$$1.push(dataSource);
	                var newData = {
	                    name: null,
	                    source: dataSource.name,
	                    transform: []
	                };
	                dataSource = newData;
	            }
	        }
	        if (node instanceof formatparse.ParseNode) {
	            if (node.parent instanceof source$1.SourceNode && !dataSource.source) {
	                // If node's parent is a root source and the data source does not refer to another data source, use normal format parse
	                dataSource.format = tslib_1.__assign({}, (dataSource.format || {}), { parse: node.assembleFormatParse() });
	                // add calculates for all nested fields
	                dataSource.transform = dataSource.transform.concat(node.assembleTransforms(true));
	            }
	            else {
	                // Otherwise use Vega expression to parse
	                dataSource.transform = dataSource.transform.concat(node.assembleTransforms());
	            }
	        }
	        if (node instanceof facet$2.FacetNode) {
	            if (!dataSource.name) {
	                dataSource.name = "data_" + datasetIndex++;
	            }
	            if (!dataSource.source || dataSource.transform.length > 0) {
	                data$$1.push(dataSource);
	                node.data = dataSource.name;
	            }
	            else {
	                node.data = dataSource.source;
	            }
	            node.assemble().forEach(function (d) { return data$$1.push(d); });
	            // break here because the rest of the tree has to be taken care of by the facet.
	            return;
	        }
	        if (node instanceof filter.FilterNode ||
	            node instanceof calculate.CalculateNode ||
	            node instanceof geopoint.GeoPointNode ||
	            node instanceof geojson.GeoJSONNode ||
	            node instanceof aggregate$2.AggregateNode ||
	            node instanceof lookup.LookupNode ||
	            node instanceof window$1.WindowTransformNode ||
	            node instanceof fold.FoldTransformNode ||
	            node instanceof flatten.FlattenTransformNode ||
	            node instanceof identifier.IdentifierNode ||
	            node instanceof sample.SampleTransformNode) {
	            dataSource.transform.push(node.assemble());
	        }
	        if (node instanceof bin$2.BinNode ||
	            node instanceof timeunit$2.TimeUnitNode ||
	            node instanceof impute.ImputeNode ||
	            node instanceof stack$1.StackNode) {
	            dataSource.transform = dataSource.transform.concat(node.assemble());
	        }
	        if (node instanceof aggregate$2.AggregateNode) {
	            if (!dataSource.name) {
	                dataSource.name = "data_" + datasetIndex++;
	            }
	        }
	        if (node instanceof dataflow.OutputNode) {
	            if (dataSource.source && dataSource.transform.length === 0) {
	                node.setSource(dataSource.source);
	            }
	            else if (node.parent instanceof dataflow.OutputNode) {
	                // Note that an output node may be required but we still do not assemble a
	                // separate data source for it.
	                node.setSource(dataSource.name);
	            }
	            else {
	                if (!dataSource.name) {
	                    dataSource.name = "data_" + datasetIndex++;
	                }
	                // Here we set the name of the datasource we generated. From now on
	                // other assemblers can use it.
	                node.setSource(dataSource.name);
	                // if this node has more than one child, we will add a datasource automatically
	                if (node.numChildren() === 1) {
	                    data$$1.push(dataSource);
	                    var newData = {
	                        name: null,
	                        source: dataSource.name,
	                        transform: []
	                    };
	                    dataSource = newData;
	                }
	            }
	        }
	        switch (node.numChildren()) {
	            case 0:
	                // done
	                if (node instanceof dataflow.OutputNode && (!dataSource.source || dataSource.transform.length > 0)) {
	                    // do not push empty datasources that are simply references
	                    data$$1.push(dataSource);
	                }
	                break;
	            case 1:
	                walkTree(node.children[0], dataSource);
	                break;
	            default:
	                if (!dataSource.name) {
	                    dataSource.name = "data_" + datasetIndex++;
	                }
	                var source_2 = dataSource.name;
	                if (!dataSource.source || dataSource.transform.length > 0) {
	                    data$$1.push(dataSource);
	                }
	                else {
	                    source_2 = dataSource.source;
	                }
	                node.children.forEach(function (child) {
	                    var newData = {
	                        name: null,
	                        source: source_2,
	                        transform: []
	                    };
	                    walkTree(child, newData);
	                });
	                break;
	        }
	    }
	    return walkTree;
	}
	/**
	 * Assemble data sources that are derived from faceted data.
	 */
	function assembleFacetData(root) {
	    var data$$1 = [];
	    var walkTree = makeWalkTree(data$$1);
	    root.children.forEach(function (child) {
	        return walkTree(child, {
	            source: root.name,
	            name: null,
	            transform: []
	        });
	    });
	    return data$$1;
	}
	exports.assembleFacetData = assembleFacetData;
	/**
	 * Create Vega Data array from a given compiled model and append all of them to the given array
	 *
	 * @param  model
	 * @param  data array
	 * @return modified data array
	 */
	function assembleRootData(dataComponent, datasets) {
	    var roots = util.vals(dataComponent.sources);
	    var data$$1 = [];
	    // roots.forEach(debug);
	    var walkTree = makeWalkTree(data$$1);
	    var sourceIndex = 0;
	    roots.forEach(function (root) {
	        // assign a name if the source does not have a name yet
	        if (!root.hasName()) {
	            root.dataName = "source_" + sourceIndex++;
	        }
	        var newData = root.assemble();
	        walkTree(root, newData);
	    });
	    // remove empty transform arrays for cleaner output
	    data$$1.forEach(function (d) {
	        if (d.transform.length === 0) {
	            delete d.transform;
	        }
	    });
	    // move sources without transforms (the ones that are potentially used in lookups) to the beginning
	    var whereTo = 0;
	    for (var i = 0; i < data$$1.length; i++) {
	        var d = data$$1[i];
	        if ((d.transform || []).length === 0 && !d.source) {
	            data$$1.splice(whereTo++, 0, data$$1.splice(i, 1)[0]);
	        }
	    }
	    // now fix the from references in lookup transforms
	    for (var _i = 0, data_2 = data$$1; _i < data_2.length; _i++) {
	        var d = data_2[_i];
	        for (var _a = 0, _b = d.transform || []; _a < _b.length; _a++) {
	            var t = _b[_a];
	            if (t.type === 'lookup') {
	                t.from = dataComponent.outputNodes[t.from].getSource();
	            }
	        }
	    }
	    // inline values for datasets that are in the datastore
	    for (var _c = 0, data_3 = data$$1; _c < data_3.length; _c++) {
	        var d = data_3[_c];
	        if (d.name in datasets) {
	            d.values = datasets[d.name];
	        }
	    }
	    return data$$1;
	}
	exports.assembleRootData = assembleRootData;

	});

	unwrapExports(assemble$a);
	var assemble_1$5 = assemble$a.debug;
	var assemble_2$4 = assemble$a.assembleFacetData;
	var assemble_3$3 = assemble$a.assembleRootData;

	var parse$8 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function parseLayerLayoutSize(model) {
	    parseChildrenLayoutSize(model);
	    var layoutSizeCmpt = model.component.layoutSize;
	    layoutSizeCmpt.setWithExplicit('width', parseNonUnitLayoutSizeForChannel(model, 'width'));
	    layoutSizeCmpt.setWithExplicit('height', parseNonUnitLayoutSizeForChannel(model, 'height'));
	}
	exports.parseLayerLayoutSize = parseLayerLayoutSize;
	exports.parseRepeatLayoutSize = parseLayerLayoutSize;
	function parseConcatLayoutSize(model) {
	    parseChildrenLayoutSize(model);
	    var layoutSizeCmpt = model.component.layoutSize;
	    var sizeTypeToMerge = model.isVConcat ? 'width' : 'height';
	    layoutSizeCmpt.setWithExplicit(sizeTypeToMerge, parseNonUnitLayoutSizeForChannel(model, sizeTypeToMerge));
	}
	exports.parseConcatLayoutSize = parseConcatLayoutSize;
	function parseChildrenLayoutSize(model) {
	    for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
	        var child = _a[_i];
	        child.parseLayoutSize();
	    }
	}
	exports.parseChildrenLayoutSize = parseChildrenLayoutSize;
	function parseNonUnitLayoutSizeForChannel(model, sizeType) {
	    var channel = sizeType === 'width' ? 'x' : 'y';
	    var resolve = model.component.resolve;
	    var mergedSize;
	    // Try to merge layout size
	    for (var _i = 0, _a = model.children; _i < _a.length; _i++) {
	        var child = _a[_i];
	        var childSize = child.component.layoutSize.getWithExplicit(sizeType);
	        var scaleResolve = resolve.scale[channel];
	        if (scaleResolve === 'independent' && childSize.value === 'range-step') {
	            // Do not merge independent scales with range-step as their size depends
	            // on the scale domains, which can be different between scales.
	            mergedSize = undefined;
	            break;
	        }
	        if (mergedSize) {
	            if (scaleResolve === 'independent' && mergedSize.value !== childSize.value) {
	                // For independent scale, only merge if all the sizes are the same.
	                // If the values are different, abandon the merge!
	                mergedSize = undefined;
	                break;
	            }
	            mergedSize = split.mergeValuesWithExplicit(mergedSize, childSize, sizeType, '');
	        }
	        else {
	            mergedSize = childSize;
	        }
	    }
	    if (mergedSize) {
	        // If merged, rename size and set size of all children.
	        for (var _b = 0, _c = model.children; _b < _c.length; _b++) {
	            var child = _c[_b];
	            model.renameLayoutSize(child.getName(sizeType), model.getName(sizeType));
	            child.component.layoutSize.set(sizeType, 'merged', false);
	        }
	        return mergedSize;
	    }
	    else {
	        // Otherwise, there is no merged size.
	        return {
	            explicit: false,
	            value: undefined
	        };
	    }
	}
	function parseUnitLayoutSize(model) {
	    var layoutSizeComponent = model.component.layoutSize;
	    if (!layoutSizeComponent.explicit.width) {
	        var width = defaultUnitSize(model, 'width');
	        layoutSizeComponent.set('width', width, false);
	    }
	    if (!layoutSizeComponent.explicit.height) {
	        var height = defaultUnitSize(model, 'height');
	        layoutSizeComponent.set('height', height, false);
	    }
	}
	exports.parseUnitLayoutSize = parseUnitLayoutSize;
	function defaultUnitSize(model, sizeType) {
	    var channel = sizeType === 'width' ? 'x' : 'y';
	    var config = model.config;
	    var scaleComponent = model.getScaleComponent(channel);
	    if (scaleComponent) {
	        var scaleType = scaleComponent.get('type');
	        var range = scaleComponent.get('range');
	        if (scale.hasDiscreteDomain(scaleType) && vega_schema.isVgRangeStep(range)) {
	            // For discrete domain with range.step, use dynamic width/height
	            return 'range-step';
	        }
	        else {
	            return config.view[sizeType];
	        }
	    }
	    else if (model.hasProjection) {
	        return config.view[sizeType];
	    }
	    else {
	        // No scale - set default size
	        if (sizeType === 'width' && model.mark === 'text') {
	            // width for text mark without x-field is a bit wider than typical range step
	            return config.scale.textXRangeStep;
	        }
	        // Set width/height equal to rangeStep config or if rangeStep is null, use value from default scale config.
	        return config.scale.rangeStep || scale.defaultScaleConfig.rangeStep;
	    }
	}

	});

	unwrapExports(parse$8);
	var parse_1$3 = parse$8.parseLayerLayoutSize;
	var parse_2$2 = parse$8.parseRepeatLayoutSize;
	var parse_3$1 = parse$8.parseConcatLayoutSize;
	var parse_4 = parse$8.parseChildrenLayoutSize;
	var parse_5 = parse$8.parseUnitLayoutSize;

	var repeater = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var log = tslib_1.__importStar(log$2);

	function replaceRepeaterInFacet(facet, repeater) {
	    return replaceRepeater(facet, repeater);
	}
	exports.replaceRepeaterInFacet = replaceRepeaterInFacet;
	function replaceRepeaterInEncoding(encoding, repeater) {
	    return replaceRepeater(encoding, repeater);
	}
	exports.replaceRepeaterInEncoding = replaceRepeaterInEncoding;
	/**
	 * Replaces repeated value and returns if the repeated value is valid.
	 */
	function replaceRepeat(o, repeater) {
	    if (fielddef.isRepeatRef(o.field)) {
	        if (o.field.repeat in repeater) {
	            // any needed to calm down ts compiler
	            return tslib_1.__assign({}, o, { field: repeater[o.field.repeat] });
	        }
	        else {
	            log.warn(log.message.noSuchRepeatedValue(o.field.repeat));
	            return undefined;
	        }
	    }
	    return o;
	}
	/**
	 * Replace repeater values in a field def with the concrete field name.
	 */
	function replaceRepeaterInFieldDef(fieldDef, repeater) {
	    fieldDef = replaceRepeat(fieldDef, repeater);
	    if (fieldDef === undefined) {
	        // the field def should be ignored
	        return undefined;
	    }
	    if (fieldDef.sort && sort.isSortField(fieldDef.sort)) {
	        var sort$$1 = replaceRepeat(fieldDef.sort, repeater);
	        fieldDef = tslib_1.__assign({}, fieldDef, (sort$$1 ? { sort: sort$$1 } : {}));
	    }
	    return fieldDef;
	}
	function replaceRepeaterInChannelDef(channelDef, repeater) {
	    if (fielddef.isFieldDef(channelDef)) {
	        var fd = replaceRepeaterInFieldDef(channelDef, repeater);
	        if (fd) {
	            return fd;
	        }
	        else if (fielddef.isConditionalDef(channelDef)) {
	            return { condition: channelDef.condition };
	        }
	    }
	    else {
	        if (fielddef.hasConditionalFieldDef(channelDef)) {
	            var fd = replaceRepeaterInFieldDef(channelDef.condition, repeater);
	            if (fd) {
	                return tslib_1.__assign({}, channelDef, { condition: fd });
	            }
	            else {
	                var condition = channelDef.condition, channelDefWithoutCondition = tslib_1.__rest(channelDef, ["condition"]);
	                return channelDefWithoutCondition;
	            }
	        }
	        return channelDef;
	    }
	    return undefined;
	}
	function replaceRepeater(mapping, repeater) {
	    var out = {};
	    for (var channel in mapping) {
	        if (mapping.hasOwnProperty(channel)) {
	            var channelDef = mapping[channel];
	            if (vega_util_1.isArray(channelDef)) {
	                // array cannot have condition
	                out[channel] = channelDef.map(function (cd) { return replaceRepeaterInChannelDef(cd, repeater); }).filter(function (cd) { return cd; });
	            }
	            else {
	                var cd = replaceRepeaterInChannelDef(channelDef, repeater);
	                if (cd) {
	                    out[channel] = cd;
	                }
	            }
	        }
	    }
	    return out;
	}

	});

	unwrapExports(repeater);
	var repeater_1 = repeater.replaceRepeaterInFacet;
	var repeater_2 = repeater.replaceRepeaterInEncoding;

	var facet$4 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var log = tslib_1.__importStar(log$2);















	function facetSortFieldName(fieldDef, sort$$1, opt) {
	    return fielddef.vgField(sort$$1, tslib_1.__assign({ suffix: "by_" + fielddef.vgField(fieldDef) }, (opt || {})));
	}
	exports.facetSortFieldName = facetSortFieldName;
	var FacetModel = /** @class */ (function (_super) {
	    tslib_1.__extends(FacetModel, _super);
	    function FacetModel(spec, parent, parentGivenName, repeater$$1, config) {
	        var _this = _super.call(this, spec, parent, parentGivenName, config, repeater$$1, spec.resolve) || this;
	        _this.type = 'facet';
	        _this.child = buildmodel.buildModel(spec.spec, _this, _this.getName('child'), undefined, repeater$$1, config, false);
	        _this.children = [_this.child];
	        var facet = repeater.replaceRepeaterInFacet(spec.facet, repeater$$1);
	        _this.facet = _this.initFacet(facet);
	        return _this;
	    }
	    FacetModel.prototype.initFacet = function (facet) {
	        // clone to prevent side effect to the original spec
	        return encoding.reduce(facet, function (normalizedFacet, fieldDef, channel$$1) {
	            if (!util.contains([channel.ROW, channel.COLUMN], channel$$1)) {
	                // Drop unsupported channel
	                log.warn(log.message.incompatibleChannel(channel$$1, 'facet'));
	                return normalizedFacet;
	            }
	            if (fieldDef.field === undefined) {
	                log.warn(log.message.emptyFieldDef(fieldDef, channel$$1));
	                return normalizedFacet;
	            }
	            // Convert type to full, lowercase type, or augment the fieldDef with a default type if missing.
	            normalizedFacet[channel$$1] = fielddef.normalize(fieldDef, channel$$1);
	            return normalizedFacet;
	        }, {});
	    };
	    FacetModel.prototype.channelHasField = function (channel$$1) {
	        return !!this.facet[channel$$1];
	    };
	    FacetModel.prototype.fieldDef = function (channel$$1) {
	        return this.facet[channel$$1];
	    };
	    FacetModel.prototype.parseData = function () {
	        this.component.data = parse$a.parseData(this);
	        this.child.parseData();
	    };
	    FacetModel.prototype.parseLayoutSize = function () {
	        parse$8.parseChildrenLayoutSize(this);
	    };
	    FacetModel.prototype.parseSelection = function () {
	        // As a facet has a single child, the selection components are the same.
	        // The child maintains its selections to assemble signals, which remain
	        // within its unit.
	        this.child.parseSelection();
	        this.component.selection = this.child.component.selection;
	    };
	    FacetModel.prototype.parseMarkGroup = function () {
	        this.child.parseMarkGroup();
	    };
	    FacetModel.prototype.parseAxisAndHeader = function () {
	        this.child.parseAxisAndHeader();
	        this.parseHeader('column');
	        this.parseHeader('row');
	        this.mergeChildAxis('x');
	        this.mergeChildAxis('y');
	    };
	    FacetModel.prototype.parseHeader = function (channel$$1) {
	        if (this.channelHasField(channel$$1)) {
	            var fieldDef = this.facet[channel$$1];
	            var title = fielddef.title(fieldDef, this.config, { allowDisabling: true });
	            if (this.child.component.layoutHeaders[channel$$1].title) {
	                // merge title with child to produce "Title / Subtitle / Sub-subtitle"
	                title += ' / ' + this.child.component.layoutHeaders[channel$$1].title;
	                this.child.component.layoutHeaders[channel$$1].title = null;
	            }
	            this.component.layoutHeaders[channel$$1] = {
	                title: title,
	                facetFieldDef: fieldDef,
	                // TODO: support adding label to footer as well
	                header: [this.makeHeaderComponent(channel$$1, true)]
	            };
	        }
	    };
	    FacetModel.prototype.makeHeaderComponent = function (channel$$1, labels) {
	        var sizeType = channel$$1 === 'row' ? 'height' : 'width';
	        return {
	            labels: labels,
	            sizeSignal: this.child.component.layoutSize.get(sizeType) ? this.child.getSizeSignalRef(sizeType) : undefined,
	            axes: []
	        };
	    };
	    FacetModel.prototype.mergeChildAxis = function (channel$$1) {
	        var child = this.child;
	        if (child.component.axes[channel$$1]) {
	            var _a = this.component, layoutHeaders = _a.layoutHeaders, resolve$$1 = _a.resolve;
	            resolve$$1.axis[channel$$1] = resolve.parseGuideResolve(resolve$$1, channel$$1);
	            if (resolve$$1.axis[channel$$1] === 'shared') {
	                // For shared axis, move the axes to facet's header or footer
	                var headerChannel = channel$$1 === 'x' ? 'column' : 'row';
	                var layoutHeader = layoutHeaders[headerChannel];
	                for (var _i = 0, _b = child.component.axes[channel$$1]; _i < _b.length; _i++) {
	                    var axisComponent = _b[_i];
	                    var headerType = header$2.getHeaderType(axisComponent.get('orient'));
	                    layoutHeader[headerType] = layoutHeader[headerType] || [this.makeHeaderComponent(headerChannel, false)];
	                    var mainAxis = assemble.assembleAxis(axisComponent, 'main', this.config, { header: true });
	                    // LayoutHeader no longer keep track of property precedence, thus let's combine.
	                    layoutHeader[headerType][0].axes.push(mainAxis);
	                    axisComponent.mainExtracted = true;
	                }
	            }
	        }
	    };
	    FacetModel.prototype.assembleSelectionTopLevelSignals = function (signals) {
	        return this.child.assembleSelectionTopLevelSignals(signals);
	    };
	    FacetModel.prototype.assembleSelectionSignals = function () {
	        this.child.assembleSelectionSignals();
	        return [];
	    };
	    FacetModel.prototype.assembleSelectionData = function (data) {
	        return this.child.assembleSelectionData(data);
	    };
	    FacetModel.prototype.getHeaderLayoutMixins = function () {
	        var _this = this;
	        var layoutMixins = {};
	        ['row', 'column'].forEach(function (channel$$1) {
	            ['header', 'footer'].forEach(function (headerType) {
	                var layoutHeaderComponent = _this.component.layoutHeaders[channel$$1];
	                var headerComponent = layoutHeaderComponent[headerType];
	                if (headerComponent && headerComponent[0]) {
	                    // set header/footerBand
	                    var sizeType = channel$$1 === 'row' ? 'height' : 'width';
	                    var bandType = headerType === 'header' ? 'headerBand' : 'footerBand';
	                    if (!_this.child.component.layoutSize.get(sizeType)) {
	                        // If facet child does not have size signal, then apply headerBand
	                        layoutMixins[bandType] = layoutMixins[bandType] || {};
	                        layoutMixins[bandType][channel$$1] = 0.5;
	                    }
	                    if (layoutHeaderComponent.title) {
	                        layoutMixins.offset = layoutMixins.offset || {};
	                        layoutMixins.offset[channel$$1 === 'row' ? 'rowTitle' : 'columnTitle'] = 10;
	                    }
	                }
	            });
	        });
	        return layoutMixins;
	    };
	    FacetModel.prototype.assembleDefaultLayout = function () {
	        var columns = this.channelHasField('column') ? this.columnDistinctSignal() : 1;
	        // TODO: determine default align based on shared / independent scales
	        return tslib_1.__assign({}, this.getHeaderLayoutMixins(), { columns: columns, bounds: 'full', align: 'all' });
	    };
	    FacetModel.prototype.assembleLayoutSignals = function () {
	        // FIXME(https://github.com/vega/vega-lite/issues/1193): this can be incorrect if we have independent scales.
	        return this.child.assembleLayoutSignals();
	    };
	    FacetModel.prototype.columnDistinctSignal = function () {
	        if (this.parent && this.parent instanceof FacetModel) {
	            // For nested facet, we will add columns to group mark instead
	            // See discussion in https://github.com/vega/vega/issues/952
	            // and https://github.com/vega/vega-view/releases/tag/v1.2.6
	            return undefined;
	        }
	        else {
	            // In facetNode.assemble(), the name is always this.getName('column') + '_layout'.
	            var facetLayoutDataName = this.getName('column_domain');
	            return { signal: "length(data('" + facetLayoutDataName + "'))" };
	        }
	    };
	    FacetModel.prototype.assembleGroup = function (signals) {
	        if (this.parent && this.parent instanceof FacetModel) {
	            // Provide number of columns for layout.
	            // See discussion in https://github.com/vega/vega/issues/952
	            // and https://github.com/vega/vega-view/releases/tag/v1.2.6
	            return tslib_1.__assign({}, (this.channelHasField('column')
	                ? {
	                    encode: {
	                        update: {
	                            // TODO(https://github.com/vega/vega-lite/issues/2759):
	                            // Correct the signal for facet of concat of facet_column
	                            columns: { field: fielddef.vgField(this.facet.column, { prefix: 'distinct' }) }
	                        }
	                    }
	                }
	                : {}), _super.prototype.assembleGroup.call(this, signals));
	        }
	        return _super.prototype.assembleGroup.call(this, signals);
	    };
	    /**
	     * Aggregate cardinality for calculating size
	     */
	    FacetModel.prototype.getCardinalityAggregateForChild = function () {
	        var fields = [];
	        var ops = [];
	        var as = [];
	        if (this.child instanceof FacetModel) {
	            if (this.child.channelHasField('column')) {
	                var field = fielddef.vgField(this.child.facet.column);
	                fields.push(field);
	                ops.push('distinct');
	                as.push("distinct_" + field);
	            }
	        }
	        else {
	            for (var _i = 0, _a = ['x', 'y']; _i < _a.length; _i++) {
	                var channel$$1 = _a[_i];
	                var childScaleComponent = this.child.component.scales[channel$$1];
	                if (childScaleComponent && !childScaleComponent.merged) {
	                    var type = childScaleComponent.get('type');
	                    var range = childScaleComponent.get('range');
	                    if (scale.hasDiscreteDomain(type) && vega_schema.isVgRangeStep(range)) {
	                        var domain$$1 = domain.assembleDomain(this.child, channel$$1);
	                        var field = domain.getFieldFromDomain(domain$$1);
	                        if (field) {
	                            fields.push(field);
	                            ops.push('distinct');
	                            as.push("distinct_" + field);
	                        }
	                        else {
	                            log.warn('Unknown field for ${channel}.  Cannot calculate view size.');
	                        }
	                    }
	                }
	            }
	        }
	        return { fields: fields, ops: ops, as: as };
	    };
	    FacetModel.prototype.assembleFacet = function () {
	        var _this = this;
	        var _a = this.component.data.facetRoot, name = _a.name, data = _a.data;
	        var _b = this.facet, row = _b.row, column = _b.column;
	        var _c = this.getCardinalityAggregateForChild(), fields = _c.fields, ops = _c.ops, as = _c.as;
	        var groupby = [];
	        ['row', 'column'].forEach(function (channel$$1) {
	            var fieldDef = _this.facet[channel$$1];
	            if (fieldDef) {
	                groupby.push(fielddef.vgField(fieldDef));
	                var sort$$1 = fieldDef.sort;
	                if (sort.isSortField(sort$$1)) {
	                    var field = sort$$1.field, op = sort$$1.op;
	                    var outputName = facetSortFieldName(fieldDef, sort$$1);
	                    if (row && column) {
	                        // For crossed facet, use pre-calculate field as it requires a different groupby
	                        // For each calculated field, apply max and assign them to the same name as
	                        // all values of the same group should be the same anyway.
	                        fields.push(outputName);
	                        ops.push('max');
	                        as.push(outputName);
	                    }
	                    else {
	                        fields.push(field);
	                        ops.push(op);
	                        as.push(outputName);
	                    }
	                }
	                else if (vega_util_1.isArray(sort$$1)) {
	                    var outputName = calculate.sortArrayIndexField(fieldDef, channel$$1);
	                    fields.push(outputName);
	                    ops.push('max');
	                    as.push(outputName);
	                }
	            }
	        });
	        var cross = !!row && !!column;
	        return tslib_1.__assign({ name: name,
	            data: data,
	            groupby: groupby }, (cross || fields.length
	            ? {
	                aggregate: tslib_1.__assign({}, (cross ? { cross: cross } : {}), (fields.length ? { fields: fields, ops: ops, as: as } : {}))
	            }
	            : {}));
	    };
	    FacetModel.prototype.headerSortFields = function (channel$$1) {
	        var facet = this.facet;
	        var fieldDef = facet[channel$$1];
	        if (fieldDef) {
	            if (sort.isSortField(fieldDef.sort)) {
	                return [facetSortFieldName(fieldDef, fieldDef.sort, { expr: 'datum' })];
	            }
	            else if (vega_util_1.isArray(fieldDef.sort)) {
	                return [calculate.sortArrayIndexField(fieldDef, channel$$1, { expr: 'datum' })];
	            }
	            return [fielddef.vgField(fieldDef, { expr: 'datum' })];
	        }
	        return [];
	    };
	    FacetModel.prototype.headerSortOrder = function (channel$$1) {
	        var facet = this.facet;
	        var fieldDef = facet[channel$$1];
	        if (fieldDef) {
	            var sort$$1 = fieldDef.sort;
	            var order = (sort.isSortField(sort$$1) ? sort$$1.order : !vega_util_1.isArray(sort$$1) && sort$$1) || 'ascending';
	            return [order];
	        }
	        return [];
	    };
	    FacetModel.prototype.assembleMarks = function () {
	        var child = this.child;
	        var facetRoot = this.component.data.facetRoot;
	        var data = assemble$a.assembleFacetData(facetRoot);
	        // If we facet by two dimensions, we need to add a cross operator to the aggregation
	        // so that we create all groups
	        var layoutSizeEncodeEntry = child.assembleLayoutSize();
	        var title = child.assembleTitle();
	        var style = child.assembleGroupStyle();
	        var markGroup = tslib_1.__assign({ name: this.getName('cell'), type: 'group' }, (title ? { title: title } : {}), (style ? { style: style } : {}), { from: {
	                facet: this.assembleFacet()
	            }, 
	            // TODO: move this to after data
	            sort: {
	                field: this.headerSortFields('row').concat(this.headerSortFields('column')),
	                order: this.headerSortOrder('row').concat(this.headerSortOrder('column'))
	            } }, (data.length > 0 ? { data: data } : {}), (layoutSizeEncodeEntry ? { encode: { update: layoutSizeEncodeEntry } } : {}), child.assembleGroup());
	        return [markGroup];
	    };
	    FacetModel.prototype.getMapping = function () {
	        return this.facet;
	    };
	    return FacetModel;
	}(model.ModelWithField));
	exports.FacetModel = FacetModel;

	});

	unwrapExports(facet$4);
	var facet_1$2 = facet$4.facetSortFieldName;
	var facet_2 = facet$4.FacetModel;

	var window$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	/**
	 * A class for the window transform nodes
	 */
	var WindowTransformNode = /** @class */ (function (_super) {
	    tslib_1.__extends(WindowTransformNode, _super);
	    function WindowTransformNode(parent, transform) {
	        var _this = _super.call(this, parent) || this;
	        _this.transform = transform;
	        return _this;
	    }
	    WindowTransformNode.makeFromFacet = function (parent, facet) {
	        var row = facet.row, column = facet.column;
	        if (row && column) {
	            var newParent = null;
	            // only need to make one for crossed facet
	            for (var _i = 0, _a = [row, column]; _i < _a.length; _i++) {
	                var fieldDef = _a[_i];
	                if (sort.isSortField(fieldDef.sort)) {
	                    var _b = fieldDef.sort, field = _b.field, op = _b.op;
	                    parent = newParent = new WindowTransformNode(parent, {
	                        window: [
	                            {
	                                op: op,
	                                field: field,
	                                as: facet$4.facetSortFieldName(fieldDef, fieldDef.sort, { forAs: true })
	                            }
	                        ],
	                        groupby: [fielddef.vgField(fieldDef)],
	                        frame: [null, null]
	                    });
	                }
	            }
	            return newParent;
	        }
	        return null;
	    };
	    WindowTransformNode.prototype.clone = function () {
	        return new WindowTransformNode(this.parent, util.duplicate(this.transform));
	    };
	    WindowTransformNode.prototype.producedFields = function () {
	        var _this = this;
	        var out = {};
	        this.transform.window.forEach(function (windowFieldDef) {
	            out[_this.getDefaultName(windowFieldDef)] = true;
	        });
	        return out;
	    };
	    WindowTransformNode.prototype.getDefaultName = function (windowFieldDef) {
	        return windowFieldDef.as || fielddef.vgField(windowFieldDef);
	    };
	    WindowTransformNode.prototype.hash = function () {
	        return "WindowTransform " + util.hash(this.transform);
	    };
	    WindowTransformNode.prototype.assemble = function () {
	        var fields = [];
	        var ops = [];
	        var as = [];
	        var params = [];
	        for (var _i = 0, _a = this.transform.window; _i < _a.length; _i++) {
	            var window_1 = _a[_i];
	            ops.push(window_1.op);
	            as.push(this.getDefaultName(window_1));
	            params.push(window_1.param === undefined ? null : window_1.param);
	            fields.push(window_1.field === undefined ? null : window_1.field);
	        }
	        var frame = this.transform.frame;
	        var groupby = this.transform.groupby;
	        var sortFields = [];
	        var sortOrder = [];
	        if (this.transform.sort !== undefined) {
	            for (var _b = 0, _c = this.transform.sort; _b < _c.length; _b++) {
	                var sortField = _c[_b];
	                sortFields.push(sortField.field);
	                sortOrder.push(sortField.order || 'ascending');
	            }
	        }
	        var sort$$1 = {
	            field: sortFields,
	            order: sortOrder
	        };
	        var ignorePeers = this.transform.ignorePeers;
	        var result = {
	            type: 'window',
	            params: params,
	            as: as,
	            ops: ops,
	            fields: fields,
	            sort: sort$$1
	        };
	        if (ignorePeers !== undefined) {
	            result.ignorePeers = ignorePeers;
	        }
	        if (groupby !== undefined) {
	            result.groupby = groupby;
	        }
	        if (frame !== undefined) {
	            result.frame = frame;
	        }
	        return result;
	    };
	    return WindowTransformNode;
	}(dataflow.TransformNode));
	exports.WindowTransformNode = WindowTransformNode;

	});

	unwrapExports(window$1);
	var window_1 = window$1.WindowTransformNode;

	var parse$a = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var log = tslib_1.__importStar(log$2);
























	function parseRoot(model$$1, sources) {
	    if (model$$1.data || !model$$1.parent) {
	        // if the model defines a data source or is the root, create a source node
	        var source = new source$1.SourceNode(model$$1.data);
	        var hash = source.hash();
	        if (hash in sources) {
	            // use a reference if we already have a source
	            return sources[hash];
	        }
	        else {
	            // otherwise add a new one
	            sources[hash] = source;
	            return source;
	        }
	    }
	    else {
	        // If we don't have a source defined (overriding parent's data), use the parent's facet root or main.
	        return model$$1.parent.component.data.facetRoot
	            ? model$$1.parent.component.data.facetRoot
	            : model$$1.parent.component.data.main;
	    }
	}
	/**
	 * Parses a transforms array into a chain of connected dataflow nodes.
	 */
	function parseTransformArray(head, model$$1, ancestorParse) {
	    var lookupCounter = 0;
	    model$$1.transforms.forEach(function (t) {
	        var derivedType = undefined;
	        var transformNode;
	        if (transform.isCalculate(t)) {
	            transformNode = head = new calculate.CalculateNode(head, t);
	            derivedType = 'derived';
	        }
	        else if (transform.isFilter(t)) {
	            transformNode = head = formatparse.ParseNode.makeImplicitFromFilterTransform(head, t, ancestorParse) || head;
	            head = new filter.FilterNode(head, model$$1, t.filter);
	        }
	        else if (transform.isBin(t)) {
	            transformNode = head = bin$2.BinNode.makeFromTransform(head, t, model$$1);
	            derivedType = 'number';
	        }
	        else if (transform.isTimeUnit(t)) {
	            transformNode = head = timeunit$2.TimeUnitNode.makeFromTransform(head, t);
	            derivedType = 'date';
	        }
	        else if (transform.isAggregate(t)) {
	            transformNode = head = aggregate$2.AggregateNode.makeFromTransform(head, t);
	            derivedType = 'number';
	            if (selection$2.requiresSelectionId(model$$1)) {
	                head = new identifier.IdentifierNode(head);
	            }
	        }
	        else if (transform.isLookup(t)) {
	            transformNode = head = lookup.LookupNode.make(head, model$$1, t, lookupCounter++);
	            derivedType = 'derived';
	        }
	        else if (transform.isWindow(t)) {
	            transformNode = head = new window$1.WindowTransformNode(head, t);
	            derivedType = 'number';
	        }
	        else if (transform.isStack(t)) {
	            transformNode = head = stack$1.StackNode.makeFromTransform(head, t);
	            derivedType = 'derived';
	        }
	        else if (transform.isFold(t)) {
	            transformNode = head = new fold.FoldTransformNode(head, t);
	            derivedType = 'derived';
	        }
	        else if (transform.isFlatten(t)) {
	            transformNode = head = new flatten.FlattenTransformNode(head, t);
	            derivedType = 'derived';
	        }
	        else if (transform.isSample(t)) {
	            head = new sample.SampleTransformNode(head, t);
	        }
	        else if (transform.isImpute(t)) {
	            transformNode = head = impute.ImputeNode.makeFromTransform(head, t);
	            derivedType = 'derived';
	        }
	        else {
	            log.warn(log.message.invalidTransformIgnored(t));
	            return;
	        }
	        if (transformNode && derivedType !== undefined) {
	            for (var _i = 0, _a = util.keys(transformNode.producedFields()); _i < _a.length; _i++) {
	                var field = _a[_i];
	                ancestorParse.set(field, derivedType, false);
	            }
	        }
	    });
	    return head;
	}
	exports.parseTransformArray = parseTransformArray;
	/*
	Description of the dataflow (http://asciiflow.com/):
	     +--------+
	     | Source |
	     +---+----+
	         |
	         v
	     FormatParse
	     (explicit)
	         |
	         v
	     Transforms
	(Filter, Calculate, Binning, TimeUnit, Aggregate, Window, ...)
	         |
	         v
	     FormatParse
	     (implicit)
	         |
	         v
	 Binning (in `encoding`)
	         |
	         v
	 Timeunit (in `encoding`)
	         |
	         v
	Formula From Sort Array
	         |
	         v
	      +--+--+
	      | Raw |
	      +-----+
	         |
	         v
	  Aggregate (in `encoding`)
	         |
	         v
	  Stack (in `encoding`)
	         |
	         v
	  Invalid Filter
	         |
	         v
	   +----------+
	   |   Main   |
	   +----------+
	         |
	         v
	     +-------+
	     | Facet |----> "column", "column-layout", and "row"
	     +-------+
	         |
	         v
	  ...Child data...
	*/
	function parseData(model$$1) {
	    var head = parseRoot(model$$1, model$$1.component.data.sources);
	    var _a = model$$1.component.data, outputNodes = _a.outputNodes, outputNodeRefCounts = _a.outputNodeRefCounts;
	    var ancestorParse = model$$1.parent ? model$$1.parent.component.data.ancestorParse.clone() : new data$2.AncestorParse();
	    // format.parse: null means disable parsing
	    if (model$$1.data && model$$1.data.format && model$$1.data.format.parse === null) {
	        ancestorParse.parseNothing = true;
	    }
	    head = formatparse.ParseNode.makeExplicit(head, model$$1, ancestorParse) || head;
	    // Default discrete selections require an identifier transform to
	    // uniquely identify data points as the _id field is volatile. Add
	    // this transform at the head of our pipeline such that the identifier
	    // field is available for all subsequent datasets. Additional identifier
	    // transforms will be necessary when new tuples are constructed
	    // (e.g., post-aggregation).
	    if (selection$2.requiresSelectionId(model$$1) && (model.isUnitModel(model$$1) || model.isLayerModel(model$$1))) {
	        head = new identifier.IdentifierNode(head);
	    }
	    // HACK: This is equivalent for merging bin extent for union scale.
	    // FIXME(https://github.com/vega/vega-lite/issues/2270): Correctly merge extent / bin node for shared bin scale
	    var parentIsLayer = model$$1.parent && model.isLayerModel(model$$1.parent);
	    if (model.isUnitModel(model$$1) || model.isFacetModel(model$$1)) {
	        if (parentIsLayer) {
	            head = bin$2.BinNode.makeFromEncoding(head, model$$1) || head;
	        }
	    }
	    if (model$$1.transforms.length > 0) {
	        head = parseTransformArray(head, model$$1, ancestorParse);
	    }
	    head = formatparse.ParseNode.makeImplicitFromEncoding(head, model$$1, ancestorParse) || head;
	    if (model.isUnitModel(model$$1)) {
	        head = geojson.GeoJSONNode.parseAll(head, model$$1);
	        head = geopoint.GeoPointNode.parseAll(head, model$$1);
	    }
	    if (model.isUnitModel(model$$1) || model.isFacetModel(model$$1)) {
	        if (!parentIsLayer) {
	            head = bin$2.BinNode.makeFromEncoding(head, model$$1) || head;
	        }
	        head = timeunit$2.TimeUnitNode.makeFromEncoding(head, model$$1) || head;
	        head = calculate.CalculateNode.parseAllForSortIndex(head, model$$1);
	    }
	    // add an output node pre aggregation
	    var rawName = model$$1.getName(data.RAW);
	    var raw = new dataflow.OutputNode(head, rawName, data.RAW, outputNodeRefCounts);
	    outputNodes[rawName] = raw;
	    head = raw;
	    if (model.isUnitModel(model$$1)) {
	        var agg = aggregate$2.AggregateNode.makeFromEncoding(head, model$$1);
	        if (agg) {
	            head = agg;
	            if (selection$2.requiresSelectionId(model$$1)) {
	                head = new identifier.IdentifierNode(head);
	            }
	        }
	        head = impute.ImputeNode.makeFromEncoding(head, model$$1) || head;
	        head = stack$1.StackNode.makeFromEncoding(head, model$$1) || head;
	    }
	    // output node for marks
	    var mainName = model$$1.getName(data.MAIN);
	    var main = new dataflow.OutputNode(head, mainName, data.MAIN, outputNodeRefCounts);
	    outputNodes[mainName] = main;
	    head = main;
	    // add facet marker
	    var facetRoot = null;
	    if (model.isFacetModel(model$$1)) {
	        var facetName = model$$1.getName('facet');
	        // Derive new sort index field for facet's sort array
	        head = calculate.CalculateNode.parseAllForSortIndex(head, model$$1);
	        // Derive new aggregate (via window) for facet's sort field
	        // TODO: use JoinAggregate once we have it
	        // augment data source with new fields for crossed facet
	        head = window$1.WindowTransformNode.makeFromFacet(head, model$$1.facet) || head;
	        facetRoot = new facet$2.FacetNode(head, model$$1, facetName, main.getSource());
	        outputNodes[facetName] = facetRoot;
	        head = facetRoot;
	    }
	    return tslib_1.__assign({}, model$$1.component.data, { outputNodes: outputNodes,
	        outputNodeRefCounts: outputNodeRefCounts,
	        raw: raw,
	        main: main,
	        facetRoot: facetRoot,
	        ancestorParse: ancestorParse });
	}
	exports.parseData = parseData;

	});

	unwrapExports(parse$a);
	var parse_1$4 = parse$a.parseTransformArray;
	var parse_2$3 = parse$a.parseData;

	var baseconcat = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var BaseConcatModel = /** @class */ (function (_super) {
	    tslib_1.__extends(BaseConcatModel, _super);
	    function BaseConcatModel(spec, parent, parentGivenName, config, repeater, resolve) {
	        return _super.call(this, spec, parent, parentGivenName, config, repeater, resolve) || this;
	    }
	    BaseConcatModel.prototype.parseData = function () {
	        this.component.data = parse$a.parseData(this);
	        this.children.forEach(function (child) {
	            child.parseData();
	        });
	    };
	    BaseConcatModel.prototype.parseSelection = function () {
	        var _this = this;
	        // Merge selections up the hierarchy so that they may be referenced
	        // across unit specs. Persist their definitions within each child
	        // to assemble signals which remain within output Vega unit groups.
	        this.component.selection = {};
	        var _loop_1 = function (child) {
	            child.parseSelection();
	            util.keys(child.component.selection).forEach(function (key) {
	                _this.component.selection[key] = child.component.selection[key];
	            });
	        };
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            _loop_1(child);
	        }
	    };
	    BaseConcatModel.prototype.parseMarkGroup = function () {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.parseMarkGroup();
	        }
	    };
	    BaseConcatModel.prototype.parseAxisAndHeader = function () {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.parseAxisAndHeader();
	        }
	        // TODO(#2415): support shared axes
	    };
	    BaseConcatModel.prototype.assembleSelectionTopLevelSignals = function (signals) {
	        return this.children.reduce(function (sg, child) { return child.assembleSelectionTopLevelSignals(sg); }, signals);
	    };
	    BaseConcatModel.prototype.assembleSelectionSignals = function () {
	        this.children.forEach(function (child) { return child.assembleSelectionSignals(); });
	        return [];
	    };
	    BaseConcatModel.prototype.assembleLayoutSignals = function () {
	        return this.children.reduce(function (signals, child) {
	            return signals.concat(child.assembleLayoutSignals());
	        }, assemble$2.assembleLayoutSignals(this));
	    };
	    BaseConcatModel.prototype.assembleSelectionData = function (data) {
	        return this.children.reduce(function (db, child) { return child.assembleSelectionData(db); }, data);
	    };
	    BaseConcatModel.prototype.assembleMarks = function () {
	        // only children have marks
	        return this.children.map(function (child) {
	            var title = child.assembleTitle();
	            var style = child.assembleGroupStyle();
	            var layoutSizeEncodeEntry = child.assembleLayoutSize();
	            return tslib_1.__assign({ type: 'group', name: child.getName('group') }, (title ? { title: title } : {}), (style ? { style: style } : {}), (layoutSizeEncodeEntry
	                ? {
	                    encode: {
	                        update: layoutSizeEncodeEntry
	                    }
	                }
	                : {}), child.assembleGroup());
	        });
	    };
	    return BaseConcatModel;
	}(model.Model));
	exports.BaseConcatModel = BaseConcatModel;

	});

	unwrapExports(baseconcat);
	var baseconcat_1 = baseconcat.BaseConcatModel;

	var concat = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var log = tslib_1.__importStar(log$2);




	var ConcatModel = /** @class */ (function (_super) {
	    tslib_1.__extends(ConcatModel, _super);
	    function ConcatModel(spec$$1, parent, parentGivenName, repeater, config) {
	        var _this = _super.call(this, spec$$1, parent, parentGivenName, config, repeater, spec$$1.resolve) || this;
	        _this.type = 'concat';
	        if (spec$$1.resolve && spec$$1.resolve.axis && (spec$$1.resolve.axis.x === 'shared' || spec$$1.resolve.axis.y === 'shared')) {
	            log.warn(log.message.CONCAT_CANNOT_SHARE_AXIS);
	        }
	        _this.isVConcat = spec.isVConcatSpec(spec$$1);
	        _this.children = (spec.isVConcatSpec(spec$$1) ? spec$$1.vconcat : spec$$1.hconcat).map(function (child, i) {
	            return buildmodel.buildModel(child, _this, _this.getName('concat_' + i), undefined, repeater, config, false);
	        });
	        return _this;
	    }
	    ConcatModel.prototype.parseLayoutSize = function () {
	        parse$8.parseConcatLayoutSize(this);
	    };
	    ConcatModel.prototype.parseAxisGroup = function () {
	        return null;
	    };
	    ConcatModel.prototype.assembleDefaultLayout = function () {
	        return tslib_1.__assign({}, (this.isVConcat ? { columns: 1 } : {}), { bounds: 'full', 
	            // Use align each so it can work with multiple plots with different size
	            align: 'each' });
	    };
	    return ConcatModel;
	}(baseconcat.BaseConcatModel));
	exports.ConcatModel = ConcatModel;

	});

	unwrapExports(concat);
	var concat_1 = concat.ConcatModel;

	var component$6 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function isFalseOrNull(v) {
	    return v === false || v === null;
	}
	var AxisComponent = /** @class */ (function (_super) {
	    tslib_1.__extends(AxisComponent, _super);
	    function AxisComponent(explicit, implicit, mainExtracted) {
	        if (explicit === void 0) { explicit = {}; }
	        if (implicit === void 0) { implicit = {}; }
	        if (mainExtracted === void 0) { mainExtracted = false; }
	        var _this = _super.call(this) || this;
	        _this.explicit = explicit;
	        _this.implicit = implicit;
	        _this.mainExtracted = mainExtracted;
	        return _this;
	    }
	    AxisComponent.prototype.clone = function () {
	        return new AxisComponent(util.duplicate(this.explicit), util.duplicate(this.implicit), this.mainExtracted);
	    };
	    AxisComponent.prototype.hasAxisPart = function (part) {
	        // FIXME(https://github.com/vega/vega-lite/issues/2552) this method can be wrong if users use a Vega theme.
	        if (part === 'axis') {
	            // always has the axis container part
	            return true;
	        }
	        if (part === 'grid' || part === 'title') {
	            return !!this.get(part);
	        }
	        // Other parts are enabled by default, so they should not be false or null.
	        return !isFalseOrNull(this.get(part));
	    };
	    return AxisComponent;
	}(split.Split));
	exports.AxisComponent = AxisComponent;

	});

	unwrapExports(component$6);
	var component_1$3 = component$6.AxisComponent;

	var config$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function getAxisConfig(property, config, channel, orient, scaleType) {
	    if (orient === void 0) { orient = ''; }
	    // configTypes to loop, starting from higher precedence
	    var configTypes = (scaleType === 'band' ? ['axisBand'] : []).concat([
	        channel === 'x' ? 'axisX' : 'axisY',
	        'axis' + orient.substr(0, 1).toUpperCase() + orient.substr(1),
	        'axis'
	    ]);
	    for (var _i = 0, configTypes_1 = configTypes; _i < configTypes_1.length; _i++) {
	        var configType = configTypes_1[_i];
	        if (config[configType] && config[configType][property] !== undefined) {
	            return config[configType][property];
	        }
	    }
	    return undefined;
	}
	exports.getAxisConfig = getAxisConfig;

	});

	unwrapExports(config$2);
	var config_1$1 = config$2.getAxisConfig;

	var encode$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	function labels(model, channel, specifiedLabelsSpec, orient) {
	    var fieldDef = model.fieldDef(channel) ||
	        (channel === 'x' ? model.fieldDef('x2') : channel === 'y' ? model.fieldDef('y2') : undefined);
	    var axis = model.axis(channel);
	    var config = model.config;
	    var labelsSpec = {};
	    // Text
	    if (fielddef.isTimeFieldDef(fieldDef)) {
	        var isUTCScale = model.getScaleComponent(channel).get('type') === scale.ScaleType.UTC;
	        var expr = common$2.timeFormatExpression('datum.value', fieldDef.timeUnit, axis.format, config.axis.shortTimeLabels, null, isUTCScale);
	        if (expr) {
	            labelsSpec.text = { signal: expr };
	        }
	    }
	    labelsSpec = tslib_1.__assign({}, labelsSpec, specifiedLabelsSpec);
	    return util.keys(labelsSpec).length === 0 ? undefined : labelsSpec;
	}
	exports.labels = labels;

	});

	unwrapExports(encode$2);
	var encode_1$1 = encode$2.labels;

	var properties$4 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var log = tslib_1.__importStar(log$2);




	// TODO: we need to refactor this method after we take care of config refactoring
	/**
	 * Default rules for whether to show a grid should be shown for a channel.
	 * If `grid` is unspecified, the default value is `true` for ordinal scales that are not binned
	 */
	function grid(scaleType, fieldDef) {
	    return !scale.hasDiscreteDomain(scaleType) && !bin.isBinning(fieldDef.bin);
	}
	exports.grid = grid;
	function gridScale(model, channel$$1) {
	    var gridChannel = channel$$1 === 'x' ? 'y' : 'x';
	    if (model.getScaleComponent(gridChannel)) {
	        return model.scaleName(gridChannel);
	    }
	    return undefined;
	}
	exports.gridScale = gridScale;
	function labelAngle(model, specifiedAxis, channel$$1, fieldDef) {
	    // try axis value
	    if (specifiedAxis.labelAngle !== undefined) {
	        // Make angle within [0,360)
	        return ((specifiedAxis.labelAngle % 360) + 360) % 360;
	    }
	    else {
	        // try axis config value
	        var angle = config$2.getAxisConfig('labelAngle', model.config, channel$$1, orient(channel$$1), model.getScaleComponent(channel$$1).get('type'));
	        if (angle !== undefined) {
	            return ((angle % 360) + 360) % 360;
	        }
	        else {
	            // get default value
	            if (channel$$1 === channel.X && util.contains([type.NOMINAL, type.ORDINAL], fieldDef.type)) {
	                return 270;
	            }
	            // no default
	            return undefined;
	        }
	    }
	}
	exports.labelAngle = labelAngle;
	function labelBaseline(angle, axisOrient) {
	    if (angle !== undefined) {
	        if (axisOrient === 'top' || axisOrient === 'bottom') {
	            if (angle <= 45 || 315 <= angle) {
	                return axisOrient === 'top' ? 'bottom' : 'top';
	            }
	            else if (135 <= angle && angle <= 225) {
	                return axisOrient === 'top' ? 'top' : 'bottom';
	            }
	            else {
	                return 'middle';
	            }
	        }
	        else {
	            if (angle <= 45 || 315 <= angle || (135 <= angle && angle <= 225)) {
	                return 'middle';
	            }
	            else if (45 <= angle && angle <= 135) {
	                return axisOrient === 'left' ? 'top' : 'bottom';
	            }
	            else {
	                return axisOrient === 'left' ? 'bottom' : 'top';
	            }
	        }
	    }
	    return undefined;
	}
	exports.labelBaseline = labelBaseline;
	function labelAlign(angle, axisOrient) {
	    if (angle !== undefined) {
	        angle = ((angle % 360) + 360) % 360;
	        if (axisOrient === 'top' || axisOrient === 'bottom') {
	            if (angle % 180 === 0) {
	                return 'center';
	            }
	            else if (0 < angle && angle < 180) {
	                return axisOrient === 'top' ? 'right' : 'left';
	            }
	            else {
	                return axisOrient === 'top' ? 'left' : 'right';
	            }
	        }
	        else {
	            if ((angle + 90) % 180 === 0) {
	                return 'center';
	            }
	            else if (90 <= angle && angle < 270) {
	                return axisOrient === 'left' ? 'left' : 'right';
	            }
	            else {
	                return axisOrient === 'left' ? 'right' : 'left';
	            }
	        }
	    }
	    return undefined;
	}
	exports.labelAlign = labelAlign;
	function labelFlush(fieldDef, channel$$1, specifiedAxis) {
	    if (specifiedAxis.labelFlush !== undefined) {
	        return specifiedAxis.labelFlush;
	    }
	    if (channel$$1 === 'x' && util.contains(['quantitative', 'temporal'], fieldDef.type)) {
	        return true;
	    }
	    return undefined;
	}
	exports.labelFlush = labelFlush;
	function labelOverlap(fieldDef, specifiedAxis, channel$$1, scaleType) {
	    if (specifiedAxis.labelOverlap !== undefined) {
	        return specifiedAxis.labelOverlap;
	    }
	    // do not prevent overlap for nominal data because there is no way to infer what the missing labels are
	    if (fieldDef.type !== 'nominal') {
	        if (scaleType === 'log') {
	            return 'greedy';
	        }
	        return true;
	    }
	    return undefined;
	}
	exports.labelOverlap = labelOverlap;
	function orient(channel$$1) {
	    switch (channel$$1) {
	        case channel.X:
	            return 'bottom';
	        case channel.Y:
	            return 'left';
	    }
	    /* istanbul ignore next: This should never happen. */
	    throw new Error(log.message.INVALID_CHANNEL_FOR_AXIS);
	}
	exports.orient = orient;
	function tickCount(channel$$1, fieldDef, scaleType, size, scaleName, specifiedAxis) {
	    if (!scale.hasDiscreteDomain(scaleType) &&
	        scaleType !== 'log' &&
	        !util.contains(['month', 'hours', 'day', 'quarter'], fieldDef.timeUnit)) {
	        if (specifiedAxis.tickStep) {
	            return { signal: "(domain('" + scaleName + "')[1] - domain('" + scaleName + "')[0]) / " + specifiedAxis.tickStep + " + 1" };
	        }
	        else if (bin.isBinning(fieldDef.bin)) {
	            // for binned data, we don't want more ticks than maxbins
	            return { signal: "ceil(" + size.signal + "/20)" };
	        }
	        return { signal: "ceil(" + size.signal + "/40)" };
	    }
	    return undefined;
	}
	exports.tickCount = tickCount;
	function values(specifiedAxis, model, fieldDef, channel$$1) {
	    var vals = specifiedAxis.values;
	    if (vals) {
	        return fielddef.valueArray(fieldDef, vals);
	    }
	    if (fieldDef.type === type.QUANTITATIVE) {
	        if (bin.isBinning(fieldDef.bin)) {
	            var domain = model.scaleDomain(channel$$1);
	            if (domain && domain !== 'unaggregated' && !scale.isSelectionDomain(domain)) {
	                // explicit value
	                return vals;
	            }
	            var signal = model.getName(bin.binToString(fieldDef.bin) + "_" + fieldDef.field + "_bins");
	            return { signal: "sequence(" + signal + ".start, " + signal + ".stop + " + signal + ".step, " + signal + ".step)" };
	        }
	        else if (specifiedAxis.tickStep) {
	            var scaleName = model.scaleName(channel$$1);
	            var step = specifiedAxis.tickStep;
	            return { signal: "sequence(domain('" + scaleName + "')[0], domain('" + scaleName + "')[1] + " + step + ", " + step + ")" };
	        }
	    }
	    return undefined;
	}
	exports.values = values;

	});

	unwrapExports(properties$4);
	var properties_1$2 = properties$4.grid;
	var properties_2$2 = properties$4.gridScale;
	var properties_3$2 = properties$4.labelAngle;
	var properties_4$1 = properties$4.labelBaseline;
	var properties_5$1 = properties$4.labelAlign;
	var properties_6$1 = properties$4.labelFlush;
	var properties_7$1 = properties$4.labelOverlap;
	var properties_8$1 = properties$4.orient;
	var properties_9$1 = properties$4.tickCount;
	var properties_10$1 = properties$4.values;

	var parse$c = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });











	var encode = tslib_1.__importStar(encode$2);
	var properties = tslib_1.__importStar(properties$4);
	function parseUnitAxis(model) {
	    return channel.POSITION_SCALE_CHANNELS.reduce(function (axis$$1, channel$$1) {
	        if (model.component.scales[channel$$1] && model.axis(channel$$1)) {
	            axis$$1[channel$$1] = [parseAxis(channel$$1, model)];
	        }
	        return axis$$1;
	    }, {});
	}
	exports.parseUnitAxis = parseUnitAxis;
	var OPPOSITE_ORIENT = {
	    bottom: 'top',
	    top: 'bottom',
	    left: 'right',
	    right: 'left'
	};
	function parseLayerAxis(model) {
	    var _a = model.component, axes = _a.axes, resolve$$1 = _a.resolve;
	    var axisCount = { top: 0, bottom: 0, right: 0, left: 0 };
	    for (var _i = 0, _b = model.children; _i < _b.length; _i++) {
	        var child = _b[_i];
	        child.parseAxisAndHeader();
	        for (var _c = 0, _d = util.keys(child.component.axes); _c < _d.length; _c++) {
	            var channel$$1 = _d[_c];
	            resolve$$1.axis[channel$$1] = resolve.parseGuideResolve(model.component.resolve, channel$$1);
	            if (resolve$$1.axis[channel$$1] === 'shared') {
	                // If the resolve says shared (and has not been overridden)
	                // We will try to merge and see if there is a conflict
	                axes[channel$$1] = mergeAxisComponents(axes[channel$$1], child.component.axes[channel$$1]);
	                if (!axes[channel$$1]) {
	                    // If merge returns nothing, there is a conflict so we cannot make the axis shared.
	                    // Thus, mark axis as independent and remove the axis component.
	                    resolve$$1.axis[channel$$1] = 'independent';
	                    delete axes[channel$$1];
	                }
	            }
	        }
	    }
	    // Move axes to layer's axis component and merge shared axes
	    for (var _e = 0, _f = [channel.X, channel.Y]; _e < _f.length; _e++) {
	        var channel$$1 = _f[_e];
	        for (var _g = 0, _h = model.children; _g < _h.length; _g++) {
	            var child = _h[_g];
	            if (!child.component.axes[channel$$1]) {
	                // skip if the child does not have a particular axis
	                continue;
	            }
	            if (resolve$$1.axis[channel$$1] === 'independent') {
	                // If axes are independent, concat the axisComponent array.
	                axes[channel$$1] = (axes[channel$$1] || []).concat(child.component.axes[channel$$1]);
	                // Automatically adjust orient
	                for (var _j = 0, _k = child.component.axes[channel$$1]; _j < _k.length; _j++) {
	                    var axisComponent = _k[_j];
	                    var _l = axisComponent.getWithExplicit('orient'), orient = _l.value, explicit = _l.explicit;
	                    if (axisCount[orient] > 0 && !explicit) {
	                        // Change axis orient if the number do not match
	                        var oppositeOrient = OPPOSITE_ORIENT[orient];
	                        if (axisCount[orient] > axisCount[oppositeOrient]) {
	                            axisComponent.set('orient', oppositeOrient, false);
	                        }
	                    }
	                    axisCount[orient]++;
	                    // TODO(https://github.com/vega/vega-lite/issues/2634): automaticaly add extra offset?
	                }
	            }
	            // After merging, make sure to remove axes from child
	            delete child.component.axes[channel$$1];
	        }
	    }
	}
	exports.parseLayerAxis = parseLayerAxis;
	function mergeAxisComponents(mergedAxisCmpts, childAxisCmpts) {
	    if (mergedAxisCmpts) {
	        // FIXME: this is a bit wrong once we support multiple axes
	        if (mergedAxisCmpts.length !== childAxisCmpts.length) {
	            return undefined; // Cannot merge axis component with different number of axes.
	        }
	        var length_1 = mergedAxisCmpts.length;
	        for (var i = 0; i < length_1; i++) {
	            var merged = mergedAxisCmpts[i];
	            var child = childAxisCmpts[i];
	            if (!!merged !== !!child) {
	                return undefined;
	            }
	            else if (merged && child) {
	                var mergedOrient = merged.getWithExplicit('orient');
	                var childOrient = child.getWithExplicit('orient');
	                if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
	                    // TODO: throw warning if resolve is explicit (We don't have info about explicit/implicit resolve yet.)
	                    // Cannot merge due to inconsistent orient
	                    return undefined;
	                }
	                else {
	                    mergedAxisCmpts[i] = mergeAxisComponent(merged, child);
	                }
	            }
	        }
	    }
	    else {
	        // For first one, return a copy of the child
	        return childAxisCmpts.map(function (axisComponent) { return axisComponent.clone(); });
	    }
	    return mergedAxisCmpts;
	}
	function mergeAxisComponent(merged, child) {
	    var _loop_1 = function (prop) {
	        var mergedValueWithExplicit = split.mergeValuesWithExplicit(merged.getWithExplicit(prop), child.getWithExplicit(prop), prop, 'axis', 
	        // Tie breaker function
	        function (v1, v2) {
	            switch (prop) {
	                case 'title':
	                    return common$2.mergeTitleComponent(v1, v2);
	                case 'gridScale':
	                    return {
	                        explicit: v1.explicit,
	                        value: util.getFirstDefined(v1.value, v2.value)
	                    };
	            }
	            return split.defaultTieBreaker(v1, v2, prop, 'axis');
	        });
	        merged.setWithExplicit(prop, mergedValueWithExplicit);
	    };
	    for (var _i = 0, VG_AXIS_PROPERTIES_1 = axis.VG_AXIS_PROPERTIES; _i < VG_AXIS_PROPERTIES_1.length; _i++) {
	        var prop = VG_AXIS_PROPERTIES_1[_i];
	        _loop_1(prop);
	    }
	    return merged;
	}
	function getFieldDefTitle(model, channel$$1) {
	    var channel2 = channel$$1 === 'x' ? 'x2' : 'y2';
	    var fieldDef = model.fieldDef(channel$$1);
	    var fieldDef2 = model.fieldDef(channel2);
	    var title1 = fieldDef ? fieldDef.title : undefined;
	    var title2 = fieldDef2 ? fieldDef2.title : undefined;
	    if (title1 && title2) {
	        return common$2.mergeTitle(title1, title2);
	    }
	    else if (title1) {
	        return title1;
	    }
	    else if (title2) {
	        return title2;
	    }
	    else if (title1 !== undefined) {
	        // falsy value to disable config
	        return title1;
	    }
	    else if (title2 !== undefined) {
	        // falsy value to disable config
	        return title2;
	    }
	    return undefined;
	}
	function isExplicit(value, property, axis$$1, model, channel$$1) {
	    switch (property) {
	        case 'values':
	            return !!axis$$1.values;
	        // specified axis.values is already respected, but may get transformed.
	        case 'encode':
	            // both VL axis.encoding and axis.labelAngle affect VG axis.encode
	            return !!axis$$1.encoding || !!axis$$1.labelAngle;
	        case 'title':
	            // title can be explicit if fieldDef.title is set
	            if (value === getFieldDefTitle(model, channel$$1)) {
	                return true;
	            }
	    }
	    // Otherwise, things are explicit if the returned value matches the specified property
	    return value === axis$$1[property];
	}
	function parseAxis(channel$$1, model) {
	    var axis$$1 = model.axis(channel$$1);
	    var axisComponent = new component$6.AxisComponent();
	    // 1.2. Add properties
	    axis.VG_AXIS_PROPERTIES.forEach(function (property) {
	        var value = getProperty(property, axis$$1, channel$$1, model);
	        if (value !== undefined) {
	            var explicit = isExplicit(value, property, axis$$1, model, channel$$1);
	            var configValue = config$2.getAxisConfig(property, model.config, channel$$1, axisComponent.get('orient'), model.getScaleComponent(channel$$1).get('type'));
	            // only set property if it is explicitly set or has no config value (otherwise we will accidentally override config)
	            if (explicit || configValue === undefined) {
	                // Do not apply implicit rule if there is a config value
	                axisComponent.set(property, value, explicit);
	            }
	            else if (property === 'grid' && configValue) {
	                // Grid is an exception because we need to set grid = true to generate another grid axis
	                axisComponent.set(property, configValue, false);
	            }
	        }
	    });
	    // 2) Add guide encode definition groups
	    var axisEncoding = axis$$1.encoding || {};
	    var axisEncode = axis.AXIS_PARTS.reduce(function (e, part) {
	        if (!axisComponent.hasAxisPart(part)) {
	            // No need to create encode for a disabled part.
	            return e;
	        }
	        var axisEncodingPart = common$2.guideEncodeEntry(axisEncoding[part] || {}, model);
	        var value = part === 'labels'
	            ? encode.labels(model, channel$$1, axisEncodingPart, axisComponent.get('orient'))
	            : axisEncodingPart;
	        if (value !== undefined && util.keys(value).length > 0) {
	            e[part] = { update: value };
	        }
	        return e;
	    }, {});
	    // FIXME: By having encode as one property, we won't have fine grained encode merging.
	    if (util.keys(axisEncode).length > 0) {
	        axisComponent.set('encode', axisEncode, !!axis$$1.encoding || axis$$1.labelAngle !== undefined);
	    }
	    return axisComponent;
	}
	function getProperty(property, specifiedAxis, channel$$1, model) {
	    var fieldDef = model.fieldDef(channel$$1);
	    // Some properties depend on labelAngle so we have to declare it here.
	    // Also, we don't use `getFirstDefined` for labelAngle
	    // as we want to normalize specified value to be within [0,360)
	    var labelAngle = properties.labelAngle(model, specifiedAxis, channel$$1, fieldDef);
	    switch (property) {
	        case 'scale':
	            return model.scaleName(channel$$1);
	        case 'gridScale':
	            return properties.gridScale(model, channel$$1);
	        case 'format':
	            // We don't include temporal field here as we apply format in encode block
	            return common$2.numberFormat(fieldDef, specifiedAxis.format, model.config);
	        case 'grid': {
	            if (bin.isBinned(model.fieldDef(channel$$1).bin)) {
	                return false;
	            }
	            else {
	                var scaleType = model.getScaleComponent(channel$$1).get('type');
	                return util.getFirstDefined(specifiedAxis.grid, properties.grid(scaleType, fieldDef));
	            }
	        }
	        case 'labelAlign':
	            return util.getFirstDefined(specifiedAxis.labelAlign, properties.labelAlign(labelAngle, properties.orient(channel$$1)));
	        case 'labelAngle':
	            return labelAngle;
	        case 'labelBaseline':
	            return util.getFirstDefined(specifiedAxis.labelBaseline, properties.labelBaseline(labelAngle, properties.orient(channel$$1)));
	        case 'labelFlush':
	            return properties.labelFlush(fieldDef, channel$$1, specifiedAxis);
	        case 'labelOverlap': {
	            var scaleType = model.getScaleComponent(channel$$1).get('type');
	            return properties.labelOverlap(fieldDef, specifiedAxis, channel$$1, scaleType);
	        }
	        case 'orient':
	            return util.getFirstDefined(specifiedAxis.orient, properties.orient(channel$$1));
	        case 'tickCount': {
	            var scaleType = model.getScaleComponent(channel$$1).get('type');
	            var scaleName = model.scaleName(channel$$1);
	            var sizeType = channel$$1 === 'x' ? 'width' : channel$$1 === 'y' ? 'height' : undefined;
	            var size = sizeType ? model.getSizeSignalRef(sizeType) : undefined;
	            return util.getFirstDefined(specifiedAxis.tickCount, properties.tickCount(channel$$1, fieldDef, scaleType, size, scaleName, specifiedAxis));
	        }
	        case 'title':
	            var channel2 = channel$$1 === 'x' ? 'x2' : 'y2';
	            var fieldDef2 = model.fieldDef(channel2);
	            // Keep undefined so we use default if title is unspecified.
	            // For other falsy value, keep them so we will hide the title.
	            return util.getFirstDefined(specifiedAxis.title, getFieldDefTitle(model, channel$$1), // If title not specified, store base parts of fieldDef (and fieldDef2 if exists)
	            common$2.mergeTitleFieldDefs([fielddef.toFieldDefBase(fieldDef)], fieldDef2 ? [fielddef.toFieldDefBase(fieldDef2)] : []));
	        case 'values':
	            return properties.values(specifiedAxis, model, fieldDef, channel$$1);
	    }
	    // Otherwise, return specified property.
	    return axis.isAxisProperty(property) ? specifiedAxis[property] : undefined;
	}

	});

	unwrapExports(parse$c);
	var parse_1$5 = parse$c.parseUnitAxis;
	var parse_2$4 = parse$c.parseLayerAxis;

	var init = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var log = tslib_1.__importStar(log$2);




	function normalizeMarkDef(mark$$1, encoding$$1, config) {
	    var markDef = mark.isMarkDef(mark$$1) ? tslib_1.__assign({}, mark$$1) : { type: mark$$1 };
	    // set orient, which can be overridden by rules as sometimes the specified orient is invalid.
	    var specifiedOrient = markDef.orient || common$2.getMarkConfig('orient', markDef, config);
	    markDef.orient = orient(markDef.type, encoding$$1, specifiedOrient);
	    if (specifiedOrient !== undefined && specifiedOrient !== markDef.orient) {
	        log.warn(log.message.orientOverridden(markDef.orient, specifiedOrient));
	    }
	    // set opacity and filled if not specified in mark config
	    var specifiedOpacity = util.getFirstDefined(markDef.opacity, common$2.getMarkConfig('opacity', markDef, config));
	    if (specifiedOpacity === undefined) {
	        markDef.opacity = opacity(markDef.type, encoding$$1);
	    }
	    var specifiedFilled = markDef.filled;
	    if (specifiedFilled === undefined) {
	        markDef.filled = filled(markDef, config);
	    }
	    // set cursor, which should be pointer if href channel is present unless otherwise specified
	    var specifiedCursor = markDef.cursor || common$2.getMarkConfig('cursor', markDef, config);
	    if (specifiedCursor === undefined) {
	        markDef.cursor = cursor(markDef, encoding$$1, config);
	    }
	    return markDef;
	}
	exports.normalizeMarkDef = normalizeMarkDef;
	function cursor(markDef, encoding$$1, config) {
	    if (encoding$$1.href || markDef.href || common$2.getMarkConfig('href', markDef, config)) {
	        return 'pointer';
	    }
	    return markDef.cursor;
	}
	function opacity(mark$$1, encoding$$1) {
	    if (util.contains([mark.POINT, mark.TICK, mark.CIRCLE, mark.SQUARE], mark$$1)) {
	        // point-based marks
	        if (!encoding.isAggregate(encoding$$1)) {
	            return 0.7;
	        }
	    }
	    return undefined;
	}
	function filled(markDef, config) {
	    var filledConfig = common$2.getMarkConfig('filled', markDef, config);
	    var mark$$1 = markDef.type;
	    return util.getFirstDefined(filledConfig, mark$$1 !== mark.POINT && mark$$1 !== mark.LINE && mark$$1 !== mark.RULE);
	}
	function orient(mark$$1, encoding$$1, specifiedOrient) {
	    switch (mark$$1) {
	        case mark.POINT:
	        case mark.CIRCLE:
	        case mark.SQUARE:
	        case mark.TEXT:
	        case mark.RECT:
	            // orient is meaningless for these marks.
	            return undefined;
	    }
	    var x = encoding$$1.x, y = encoding$$1.y, x2 = encoding$$1.x2, y2 = encoding$$1.y2;
	    switch (mark$$1) {
	        case mark.BAR:
	            if (fielddef.isFieldDef(x) && bin.isBinned(x.bin)) {
	                return 'vertical';
	            }
	            if (fielddef.isFieldDef(y) && bin.isBinned(y.bin)) {
	                return 'horizontal';
	            }
	            if (y2 || x2) {
	                // Ranged bar does not always have clear orientation, so we allow overriding
	                if (specifiedOrient) {
	                    return specifiedOrient;
	                }
	                // If y is range and x is non-range, non-bin Q, y is likely a prebinned field
	                if (!x2 && fielddef.isFieldDef(x) && x.type === type.QUANTITATIVE && !bin.isBinning(x.bin)) {
	                    return 'horizontal';
	                }
	                // If x is range and y is non-range, non-bin Q, x is likely a prebinned field
	                if (!y2 && fielddef.isFieldDef(y) && y.type === type.QUANTITATIVE && !bin.isBinning(y.bin)) {
	                    return 'vertical';
	                }
	            }
	        /* tslint:disable */
	        case mark.RULE: // intentionally fall through
	            // return undefined for line segment rule and bar with both axis ranged
	            if (x2 && y2) {
	                return undefined;
	            }
	        case mark.AREA: // intentionally fall through
	            // If there are range for both x and y, y (vertical) has higher precedence.
	            if (y2) {
	                if (fielddef.isFieldDef(y) && bin.isBinned(y.bin)) {
	                    return 'horizontal';
	                }
	                else {
	                    return 'vertical';
	                }
	            }
	            else if (x2) {
	                if (fielddef.isFieldDef(x) && bin.isBinned(x.bin)) {
	                    return 'vertical';
	                }
	                else {
	                    return 'horizontal';
	                }
	            }
	            else if (mark$$1 === mark.RULE) {
	                if (encoding$$1.x && !encoding$$1.y) {
	                    return 'vertical';
	                }
	                else if (encoding$$1.y && !encoding$$1.x) {
	                    return 'horizontal';
	                }
	            }
	        case mark.LINE: // intentional fall through
	        case mark.TICK: // Tick is opposite to bar, line, area and never have ranged mark.
	            /* tslint:enable */
	            var xIsContinuous = fielddef.isFieldDef(encoding$$1.x) && fielddef.isContinuous(encoding$$1.x);
	            var yIsContinuous = fielddef.isFieldDef(encoding$$1.y) && fielddef.isContinuous(encoding$$1.y);
	            if (xIsContinuous && !yIsContinuous) {
	                return mark$$1 !== 'tick' ? 'horizontal' : 'vertical';
	            }
	            else if (!xIsContinuous && yIsContinuous) {
	                return mark$$1 !== 'tick' ? 'vertical' : 'horizontal';
	            }
	            else if (xIsContinuous && yIsContinuous) {
	                var xDef = encoding$$1.x; // we can cast here since they are surely fieldDef
	                var yDef = encoding$$1.y;
	                var xIsTemporal = xDef.type === type.TEMPORAL;
	                var yIsTemporal = yDef.type === type.TEMPORAL;
	                // temporal without timeUnit is considered continuous, but better serves as dimension
	                if (xIsTemporal && !yIsTemporal) {
	                    return mark$$1 !== 'tick' ? 'vertical' : 'horizontal';
	                }
	                else if (!xIsTemporal && yIsTemporal) {
	                    return mark$$1 !== 'tick' ? 'horizontal' : 'vertical';
	                }
	                if (!xDef.aggregate && yDef.aggregate) {
	                    return mark$$1 !== 'tick' ? 'vertical' : 'horizontal';
	                }
	                else if (xDef.aggregate && !yDef.aggregate) {
	                    return mark$$1 !== 'tick' ? 'horizontal' : 'vertical';
	                }
	                if (specifiedOrient) {
	                    // When ambiguous, use user specified one.
	                    return specifiedOrient;
	                }
	                return 'vertical';
	            }
	            else {
	                // Discrete x Discrete case
	                if (specifiedOrient) {
	                    // When ambiguous, use user specified one.
	                    return specifiedOrient;
	                }
	                return undefined;
	            }
	    }
	    return 'vertical';
	}

	});

	unwrapExports(init);
	var init_1 = init.normalizeMarkDef;

	var unit = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var vlEncoding = tslib_1.__importStar(encoding);
	var encoding_1 = encoding;













	/**
	 * Internal model of Vega-Lite specification for the compiler.
	 */
	var UnitModel = /** @class */ (function (_super) {
	    tslib_1.__extends(UnitModel, _super);
	    function UnitModel(spec, parent, parentGivenName, parentGivenSize, repeater$$1, config, fit) {
	        if (parentGivenSize === void 0) { parentGivenSize = {}; }
	        var _this = _super.call(this, spec, parent, parentGivenName, config, repeater$$1, undefined) || this;
	        _this.fit = fit;
	        _this.type = 'unit';
	        _this.specifiedScales = {};
	        _this.specifiedAxes = {};
	        _this.specifiedLegends = {};
	        _this.specifiedProjection = {};
	        _this.selection = {};
	        _this.children = [];
	        _this.initSize(tslib_1.__assign({}, parentGivenSize, (spec.width ? { width: spec.width } : {}), (spec.height ? { height: spec.height } : {})));
	        var mark$$1 = mark.isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
	        var encoding$$1 = (_this.encoding = encoding_1.normalizeEncoding(repeater.replaceRepeaterInEncoding(spec.encoding || {}, repeater$$1), mark$$1));
	        _this.markDef = init.normalizeMarkDef(spec.mark, encoding$$1, config);
	        // calculate stack properties
	        _this.stack = stack_1.stack(mark$$1, encoding$$1, _this.config.stack);
	        _this.specifiedScales = _this.initScales(mark$$1, encoding$$1);
	        _this.specifiedAxes = _this.initAxes(encoding$$1);
	        _this.specifiedLegends = _this.initLegend(encoding$$1);
	        _this.specifiedProjection = spec.projection;
	        // Selections will be initialized upon parse.
	        _this.selection = spec.selection;
	        return _this;
	    }
	    Object.defineProperty(UnitModel.prototype, "hasProjection", {
	        get: function () {
	            var encoding$$1 = this.encoding;
	            var isGeoShapeMark = this.mark === mark.GEOSHAPE;
	            var hasGeoPosition = encoding$$1 && channel.GEOPOSITION_CHANNELS.some(function (channel$$1) { return fielddef.isFieldDef(encoding$$1[channel$$1]); });
	            return isGeoShapeMark || hasGeoPosition;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Return specified Vega-lite scale domain for a particular channel
	     * @param channel
	     */
	    UnitModel.prototype.scaleDomain = function (channel$$1) {
	        var scale = this.specifiedScales[channel$$1];
	        return scale ? scale.domain : undefined;
	    };
	    UnitModel.prototype.axis = function (channel$$1) {
	        return this.specifiedAxes[channel$$1];
	    };
	    UnitModel.prototype.legend = function (channel$$1) {
	        return this.specifiedLegends[channel$$1];
	    };
	    UnitModel.prototype.initScales = function (mark$$1, encoding$$1) {
	        return channel.SCALE_CHANNELS.reduce(function (scales, channel$$1) {
	            var fieldDef;
	            var specifiedScale;
	            var channelDef = encoding$$1[channel$$1];
	            if (fielddef.isFieldDef(channelDef)) {
	                fieldDef = channelDef;
	                specifiedScale = channelDef.scale;
	            }
	            else if (fielddef.hasConditionalFieldDef(channelDef)) {
	                fieldDef = channelDef.condition;
	                specifiedScale = channelDef.condition['scale'];
	            }
	            else if (channel$$1 === 'x') {
	                fieldDef = fielddef.getFieldDef(encoding$$1.x2);
	            }
	            else if (channel$$1 === 'y') {
	                fieldDef = fielddef.getFieldDef(encoding$$1.y2);
	            }
	            if (fieldDef) {
	                scales[channel$$1] = specifiedScale || {};
	            }
	            return scales;
	        }, {});
	    };
	    UnitModel.prototype.initAxes = function (encoding$$1) {
	        return [channel.X, channel.Y].reduce(function (_axis, channel$$1) {
	            // Position Axis
	            // TODO: handle ConditionFieldDef
	            var channelDef = encoding$$1[channel$$1];
	            if (fielddef.isFieldDef(channelDef) ||
	                (channel$$1 === channel.X && fielddef.isFieldDef(encoding$$1.x2)) ||
	                (channel$$1 === channel.Y && fielddef.isFieldDef(encoding$$1.y2))) {
	                var axisSpec = fielddef.isFieldDef(channelDef) ? channelDef.axis : null;
	                // We no longer support false in the schema, but we keep false here for backward compatibility.
	                if (axisSpec !== null && axisSpec !== false) {
	                    _axis[channel$$1] = tslib_1.__assign({}, axisSpec);
	                }
	            }
	            return _axis;
	        }, {});
	    };
	    UnitModel.prototype.initLegend = function (encoding$$1) {
	        return channel.NONPOSITION_SCALE_CHANNELS.reduce(function (_legend, channel$$1) {
	            var channelDef = encoding$$1[channel$$1];
	            if (channelDef) {
	                var legend = fielddef.isFieldDef(channelDef)
	                    ? channelDef.legend
	                    : fielddef.hasConditionalFieldDef(channelDef)
	                        ? channelDef.condition['legend']
	                        : null;
	                if (legend !== null && legend !== false) {
	                    _legend[channel$$1] = tslib_1.__assign({}, legend);
	                }
	            }
	            return _legend;
	        }, {});
	    };
	    UnitModel.prototype.parseData = function () {
	        this.component.data = parse$a.parseData(this);
	    };
	    UnitModel.prototype.parseLayoutSize = function () {
	        parse$8.parseUnitLayoutSize(this);
	    };
	    UnitModel.prototype.parseSelection = function () {
	        this.component.selection = selection$2.parseUnitSelection(this, this.selection);
	    };
	    UnitModel.prototype.parseMarkGroup = function () {
	        this.component.mark = mark$2.parseMarkGroup(this);
	    };
	    UnitModel.prototype.parseAxisAndHeader = function () {
	        this.component.axes = parse$c.parseUnitAxis(this);
	    };
	    UnitModel.prototype.assembleSelectionTopLevelSignals = function (signals) {
	        return selection$2.assembleTopLevelSignals(this, signals);
	    };
	    UnitModel.prototype.assembleSelectionSignals = function () {
	        return selection$2.assembleUnitSelectionSignals(this, []);
	    };
	    UnitModel.prototype.assembleSelectionData = function (data) {
	        return selection$2.assembleUnitSelectionData(this, data);
	    };
	    UnitModel.prototype.assembleLayout = function () {
	        return null;
	    };
	    UnitModel.prototype.assembleLayoutSignals = function () {
	        return assemble$2.assembleLayoutSignals(this);
	    };
	    UnitModel.prototype.assembleMarks = function () {
	        var marks = this.component.mark || [];
	        // If this unit is part of a layer, selections should augment
	        // all in concert rather than each unit individually. This
	        // ensures correct interleaving of clipping and brushed marks.
	        if (!this.parent || !model.isLayerModel(this.parent)) {
	            marks = selection$2.assembleUnitSelectionMarks(this, marks);
	        }
	        return marks.map(this.correctDataNames);
	    };
	    UnitModel.prototype.assembleLayoutSize = function () {
	        return {
	            width: this.getSizeSignalRef('width'),
	            height: this.getSizeSignalRef('height')
	        };
	    };
	    UnitModel.prototype.getMapping = function () {
	        return this.encoding;
	    };
	    UnitModel.prototype.toSpec = function (excludeConfig, excludeData) {
	        var encoding$$1 = util.duplicate(this.encoding);
	        var spec;
	        spec = {
	            mark: this.markDef,
	            encoding: encoding$$1
	        };
	        if (!excludeConfig) {
	            spec.config = util.duplicate(this.config);
	        }
	        if (!excludeData) {
	            spec.data = util.duplicate(this.data);
	        }
	        // remove defaults
	        return spec;
	    };
	    Object.defineProperty(UnitModel.prototype, "mark", {
	        get: function () {
	            return this.markDef.type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    UnitModel.prototype.channelHasField = function (channel$$1) {
	        return vlEncoding.channelHasField(this.encoding, channel$$1);
	    };
	    UnitModel.prototype.fieldDef = function (channel$$1) {
	        var channelDef = this.encoding[channel$$1];
	        return fielddef.getFieldDef(channelDef);
	    };
	    return UnitModel;
	}(model.ModelWithField));
	exports.UnitModel = UnitModel;

	});

	unwrapExports(unit);
	var unit_1 = unit.UnitModel;

	var layer = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var log = tslib_1.__importStar(log$2);










	var LayerModel = /** @class */ (function (_super) {
	    tslib_1.__extends(LayerModel, _super);
	    function LayerModel(spec$$1, parent, parentGivenName, parentGivenSize, repeater, config, fit) {
	        var _this = _super.call(this, spec$$1, parent, parentGivenName, config, repeater, spec$$1.resolve) || this;
	        _this.type = 'layer';
	        var layoutSize = tslib_1.__assign({}, parentGivenSize, (spec$$1.width ? { width: spec$$1.width } : {}), (spec$$1.height ? { height: spec$$1.height } : {}));
	        _this.initSize(layoutSize);
	        _this.children = spec$$1.layer.map(function (layer, i) {
	            if (spec.isLayerSpec(layer)) {
	                return new LayerModel(layer, _this, _this.getName('layer_' + i), layoutSize, repeater, config, fit);
	            }
	            if (spec.isUnitSpec(layer)) {
	                return new unit.UnitModel(layer, _this, _this.getName('layer_' + i), layoutSize, repeater, config, fit);
	            }
	            throw new Error(log.message.INVALID_SPEC);
	        });
	        return _this;
	    }
	    LayerModel.prototype.parseData = function () {
	        this.component.data = parse$a.parseData(this);
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.parseData();
	        }
	    };
	    LayerModel.prototype.parseLayoutSize = function () {
	        parse$8.parseLayerLayoutSize(this);
	    };
	    LayerModel.prototype.parseSelection = function () {
	        var _this = this;
	        // Merge selections up the hierarchy so that they may be referenced
	        // across unit specs. Persist their definitions within each child
	        // to assemble signals which remain within output Vega unit groups.
	        this.component.selection = {};
	        var _loop_1 = function (child) {
	            child.parseSelection();
	            util.keys(child.component.selection).forEach(function (key) {
	                _this.component.selection[key] = child.component.selection[key];
	            });
	        };
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            _loop_1(child);
	        }
	    };
	    LayerModel.prototype.parseMarkGroup = function () {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.parseMarkGroup();
	        }
	    };
	    LayerModel.prototype.parseAxisAndHeader = function () {
	        parse$c.parseLayerAxis(this);
	    };
	    LayerModel.prototype.assembleSelectionTopLevelSignals = function (signals) {
	        return this.children.reduce(function (sg, child) { return child.assembleSelectionTopLevelSignals(sg); }, signals);
	    };
	    // TODO: Support same named selections across children.
	    LayerModel.prototype.assembleSelectionSignals = function () {
	        return this.children.reduce(function (signals, child) {
	            return signals.concat(child.assembleSelectionSignals());
	        }, []);
	    };
	    LayerModel.prototype.assembleLayoutSignals = function () {
	        return this.children.reduce(function (signals, child) {
	            return signals.concat(child.assembleLayoutSignals());
	        }, assemble$2.assembleLayoutSignals(this));
	    };
	    LayerModel.prototype.assembleSelectionData = function (data) {
	        return this.children.reduce(function (db, child) { return child.assembleSelectionData(db); }, data);
	    };
	    LayerModel.prototype.assembleTitle = function () {
	        var title = _super.prototype.assembleTitle.call(this);
	        if (title) {
	            return title;
	        }
	        // If title does not provide layer, look into children
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            title = child.assembleTitle();
	            if (title) {
	                return title;
	            }
	        }
	        return undefined;
	    };
	    LayerModel.prototype.assembleLayout = function () {
	        return null;
	    };
	    LayerModel.prototype.assembleMarks = function () {
	        return selection$2.assembleLayerSelectionMarks(this, util.flatten(this.children.map(function (child) {
	            return child.assembleMarks();
	        })));
	    };
	    LayerModel.prototype.assembleLegends = function () {
	        return this.children.reduce(function (legends, child) {
	            return legends.concat(child.assembleLegends());
	        }, assemble$4.assembleLegends(this));
	    };
	    return LayerModel;
	}(model.Model));
	exports.LayerModel = LayerModel;

	});

	unwrapExports(layer);
	var layer_1 = layer.LayerModel;

	var repeat$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var log = tslib_1.__importStar(log$2);



	var RepeatModel = /** @class */ (function (_super) {
	    tslib_1.__extends(RepeatModel, _super);
	    function RepeatModel(spec, parent, parentGivenName, repeatValues, config) {
	        var _this = _super.call(this, spec, parent, parentGivenName, config, repeatValues, spec.resolve) || this;
	        _this.type = 'repeat';
	        if (spec.resolve && spec.resolve.axis && (spec.resolve.axis.x === 'shared' || spec.resolve.axis.y === 'shared')) {
	            log.warn(log.message.REPEAT_CANNOT_SHARE_AXIS);
	        }
	        _this.repeat = spec.repeat;
	        _this.children = _this._initChildren(spec, _this.repeat, repeatValues, config);
	        return _this;
	    }
	    RepeatModel.prototype._initChildren = function (spec, repeat, repeater, config) {
	        var children = [];
	        var row = repeat.row || [repeater ? repeater.row : null];
	        var column = repeat.column || [repeater ? repeater.column : null];
	        // cross product
	        for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
	            var rowField = row_1[_i];
	            for (var _a = 0, column_1 = column; _a < column_1.length; _a++) {
	                var columnField = column_1[_a];
	                var name_1 = (rowField ? '_' + rowField : '') + (columnField ? '_' + columnField : '');
	                var childRepeat = {
	                    row: rowField,
	                    column: columnField
	                };
	                children.push(buildmodel.buildModel(spec.spec, this, this.getName('child' + name_1), undefined, childRepeat, config, false));
	            }
	        }
	        return children;
	    };
	    RepeatModel.prototype.parseLayoutSize = function () {
	        parse$8.parseRepeatLayoutSize(this);
	    };
	    RepeatModel.prototype.assembleDefaultLayout = function () {
	        return {
	            columns: this.repeat && this.repeat.column ? this.repeat.column.length : 1,
	            bounds: 'full',
	            align: 'all'
	        };
	    };
	    return RepeatModel;
	}(baseconcat.BaseConcatModel));
	exports.RepeatModel = RepeatModel;

	});

	unwrapExports(repeat$1);
	var repeat_1 = repeat$1.RepeatModel;

	var buildmodel = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var log = tslib_1.__importStar(log$2);






	function buildModel(spec$$1, parent, parentGivenName, unitSize, repeater, config, fit) {
	    if (spec.isFacetSpec(spec$$1)) {
	        return new facet$4.FacetModel(spec$$1, parent, parentGivenName, repeater, config);
	    }
	    if (spec.isLayerSpec(spec$$1)) {
	        return new layer.LayerModel(spec$$1, parent, parentGivenName, unitSize, repeater, config, fit);
	    }
	    if (spec.isUnitSpec(spec$$1)) {
	        return new unit.UnitModel(spec$$1, parent, parentGivenName, unitSize, repeater, config, fit);
	    }
	    if (spec.isRepeatSpec(spec$$1)) {
	        return new repeat$1.RepeatModel(spec$$1, parent, parentGivenName, repeater, config);
	    }
	    if (spec.isConcatSpec(spec$$1)) {
	        return new concat.ConcatModel(spec$$1, parent, parentGivenName, repeater, config);
	    }
	    throw new Error(log.message.INVALID_SPEC);
	}
	exports.buildModel = buildModel;

	});

	unwrapExports(buildmodel);
	var buildmodel_1 = buildmodel.buildModel;

	var compile_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var vlFieldDef = tslib_1.__importStar(fielddef);
	var log = tslib_1.__importStar(log$2);






	/**
	 * Vega-Lite's main function, for compiling Vega-lite spec into Vega spec.
	 *
	 * At a high-level, we make the following transformations in different phases:
	 *
	 * Input spec
	 *     |
	 *     |  (Normalization)
	 *     v
	 * Normalized Spec (Row/Column channels in single-view specs becomes faceted specs, composite marks becomes layered specs.)
	 *     |
	 *     |  (Build Model)
	 *     v
	 * A model tree of the spec
	 *     |
	 *     |  (Parse)
	 *     v
	 * A model tree with parsed components (intermediate structure of visualization primitives in a format that can be easily merged)
	 *     |
	 *     | (Optimize)
	 *     v
	 * A model tree with parsed components with the data component optimized
	 *     |
	 *     | (Assemble)
	 *     v
	 * Vega spec
	 */
	function compile(inputSpec, opt) {
	    if (opt === void 0) { opt = {}; }
	    // 0. Augment opt with default opts
	    if (opt.logger) {
	        // set the singleton logger to the provided logger
	        log.set(opt.logger);
	    }
	    if (opt.fieldTitle) {
	        // set the singleton field title formatter
	        vlFieldDef.setTitleFormatter(opt.fieldTitle);
	    }
	    try {
	        // 1. Initialize config by deep merging default config with the config provided via option and the input spec.
	        var config$$1 = config.initConfig(util.mergeDeep({}, opt.config, inputSpec.config));
	        // 2. Normalize: Convert input spec -> normalized spec
	        // - Decompose all extended unit specs into composition of unit spec.  For example, a box plot get expanded into multiple layers of bars, ticks, and rules. The shorthand row/column channel is also expanded to a facet spec.
	        var spec$$1 = spec.normalize(inputSpec, config$$1);
	        // - Normalize autosize to be a autosize properties object.
	        var autosize = toplevelprops.normalizeAutoSize(inputSpec.autosize, config$$1.autosize, spec.isLayerSpec(spec$$1) || spec.isUnitSpec(spec$$1));
	        // 3. Build Model: normalized spec -> Model (a tree structure)
	        // This phases instantiates the models with default config by doing a top-down traversal. This allows us to pass properties that child models derive from their parents via their constructors.
	        // See the abstract `Model` class and its children (UnitModel, LayerModel, FacetModel, RepeatModel, ConcatModel) for different types of models.
	        var model = buildmodel.buildModel(spec$$1, null, '', undefined, undefined, config$$1, autosize.type === 'fit');
	        // 4 Parse: Model --> Model with components
	        // Note that components = intermediate representations that are equivalent to Vega specs.
	        // We need these intermediate representation because we need to merge many visualizaiton "components" like projections, scales, axes, and legends.
	        // We will later convert these components into actual Vega specs in the assemble phase.
	        // In this phase, we do a bottom-up traversal over the whole tree to
	        // parse for each type of components once (e.g., data, layout, mark, scale).
	        // By doing bottom-up traversal, we start parsing components of unit specs and
	        // then merge child components of parent composite specs.
	        //
	        // Please see inside model.parse() for order of different components parsed.
	        model.parse();
	        // 5. Optimize the dataflow.  This will modify the data component of the model.
	        optimize.optimizeDataflow(model.component.data);
	        // 6. Assemble: convert model components --> Vega Spec.
	        return assembleTopLevelModel(model, getTopLevelProperties(inputSpec, config$$1, autosize));
	    }
	    finally {
	        // Reset the singleton logger if a logger is provided
	        if (opt.logger) {
	            log.reset();
	        }
	        // Reset the singleton field title formatter if provided
	        if (opt.fieldTitle) {
	            vlFieldDef.resetTitleFormatter();
	        }
	    }
	}
	exports.compile = compile;
	function getTopLevelProperties(topLevelSpec, config$$1, autosize) {
	    return tslib_1.__assign({ autosize: util.keys(autosize).length === 1 && autosize.type ? autosize.type : autosize }, toplevelprops.extractTopLevelProperties(config$$1), toplevelprops.extractTopLevelProperties(topLevelSpec));
	}
	/*
	 * Assemble the top-level model.
	 *
	 * Note: this couldn't be `model.assemble()` since the top-level model
	 * needs some special treatment to generate top-level properties.
	 */
	function assembleTopLevelModel(model, topLevelProperties) {
	    // TODO: change type to become VgSpec
	    // Config with Vega-Lite only config removed.
	    var vgConfig = model.config ? config.stripAndRedirectConfig(model.config) : undefined;
	    var data = [].concat(model.assembleSelectionData([]), 
	    // only assemble data in the root
	    assemble$a.assembleRootData(model.component.data, topLevelProperties.datasets || {}));
	    delete topLevelProperties.datasets;
	    var projections = model.assembleProjections();
	    var title = model.assembleTitle();
	    var style = model.assembleGroupStyle();
	    var layoutSignals = model.assembleLayoutSignals();
	    // move width and height signals with values to top level
	    layoutSignals = layoutSignals.filter(function (signal) {
	        if ((signal.name === 'width' || signal.name === 'height') && signal.value !== undefined) {
	            topLevelProperties[signal.name] = +signal.value;
	            return false;
	        }
	        return true;
	    });
	    var output = tslib_1.__assign({ $schema: 'https://vega.github.io/schema/vega/v4.json' }, (model.description ? { description: model.description } : {}), topLevelProperties, (title ? { title: title } : {}), (style ? { style: style } : {}), { data: data }, (projections.length > 0 ? { projections: projections } : {}), model.assembleGroup(layoutSignals.concat(model.assembleSelectionTopLevelSignals([]))), (vgConfig ? { config: vgConfig } : {}));
	    return {
	        spec: output
	        // TODO: add warning / errors here
	    };
	}

	});

	unwrapExports(compile_1);
	var compile_2 = compile_1.compile;

	var validate = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var mark_2 = mark;
	/**
	 * Required Encoding Channels for each mark type
	 */
	exports.DEFAULT_REQUIRED_CHANNEL_MAP = {
	    text: ['text'],
	    line: ['x', 'y'],
	    trail: ['x', 'y'],
	    area: ['x', 'y']
	};
	/**
	 * Supported Encoding Channel for each mark type
	 */
	exports.DEFAULT_SUPPORTED_CHANNEL_TYPE = {
	    bar: vega_util_1.toSet(['row', 'column', 'x', 'y', 'size', 'color', 'fill', 'stroke', 'detail']),
	    line: vega_util_1.toSet(['row', 'column', 'x', 'y', 'color', 'fill', 'stroke', 'color', 'detail']),
	    trail: vega_util_1.toSet(['row', 'column', 'x', 'y', 'color', 'fill', 'stroke', 'color', 'detail', 'size']),
	    area: vega_util_1.toSet(['row', 'column', 'x', 'y', 'color', 'fill', 'stroke', 'detail']),
	    tick: vega_util_1.toSet(['row', 'column', 'x', 'y', 'color', 'fill', 'stroke', 'detail']),
	    circle: vega_util_1.toSet(['row', 'column', 'x', 'y', 'color', 'fill', 'stroke', 'size', 'detail']),
	    square: vega_util_1.toSet(['row', 'column', 'x', 'y', 'color', 'fill', 'stroke', 'size', 'detail']),
	    point: vega_util_1.toSet(['row', 'column', 'x', 'y', 'color', 'fill', 'stroke', 'size', 'detail', 'shape']),
	    geoshape: vega_util_1.toSet(['row', 'column', 'color', 'fill', 'stroke', 'detail', 'shape']),
	    text: vega_util_1.toSet(['row', 'column', 'size', 'color', 'fill', 'stroke', 'text']) // TODO(#724) revise
	};
	// TODO: consider if we should add validate method and
	// requires ZSchema in the main vega-lite repo
	/**
	 * Further check if encoding mapping of a spec is invalid and
	 * return error if it is invalid.
	 *
	 * This checks if
	 * (1) all the required encoding channels for the mark type are specified
	 * (2) all the specified encoding channels are supported by the mark type
	 * @param  {[type]} spec [description]
	 * @param  {RequiredChannelMap = DefaultRequiredChannelMap}  requiredChannelMap
	 * @param  {SupportedChannelMap = DefaultSupportedChannelMap} supportedChannelMap
	 * @return {String} Return one reason why the encoding is invalid,
	 *                  or null if the encoding is valid.
	 */
	function getEncodingMappingError(spec, requiredChannelMap, supportedChannelMap) {
	    if (requiredChannelMap === void 0) { requiredChannelMap = exports.DEFAULT_REQUIRED_CHANNEL_MAP; }
	    if (supportedChannelMap === void 0) { supportedChannelMap = exports.DEFAULT_SUPPORTED_CHANNEL_TYPE; }
	    var mark$$1 = mark.isMarkDef(spec.mark) ? spec.mark.type : spec.mark;
	    var encoding = spec.encoding;
	    var requiredChannels = requiredChannelMap[mark$$1];
	    var supportedChannels = supportedChannelMap[mark$$1];
	    for (var i in requiredChannels) {
	        // all required channels are in encoding`
	        if (!(requiredChannels[i] in encoding)) {
	            return 'Missing encoding channel "' + requiredChannels[i] + '" for mark "' + mark$$1 + '"';
	        }
	    }
	    for (var channel in encoding) {
	        // all channels in encoding are supported
	        if (!supportedChannels[channel]) {
	            return 'Encoding channel "' + channel + '" is not supported by mark type "' + mark$$1 + '"';
	        }
	    }
	    if (mark$$1 === mark_2.BAR && !encoding.x && !encoding.y) {
	        return 'Missing both x and y for bar';
	    }
	    return null;
	}
	exports.getEncodingMappingError = getEncodingMappingError;

	});

	unwrapExports(validate);
	var validate_1 = validate.DEFAULT_REQUIRED_CHANNEL_MAP;
	var validate_2 = validate.DEFAULT_SUPPORTED_CHANNEL_TYPE;
	var validate_3 = validate.getEncodingMappingError;

	var name = "vega-lite";
	var author = "Jeffrey Heer, Dominik Moritz, Kanit \"Ham\" Wongsuphasawat";
	var version = "3.0.0-rc3";
	var collaborators = [
		"Kanit Wongsuphasawat <kanitw@gmail.com> (http://kanitw.yellowpigz.com)",
		"Dominik Moritz <domoritz@cs.washington.edu> (https://www.domoritz.de)",
		"Jeffrey Heer <jheer@uw.edu> (http://jheer.org)"
	];
	var homepage = "https://vega.github.io/vega-lite/";
	var description = "Vega-Lite is a concise high-level language for interactive visualization.";
	var main = "build/vega-lite.js";
	var unpkg = "build/vega-lite.min.js";
	var jsdelivr = "build/vega-lite.min.js";
	var module$1 = "build/src/index";
	var types = "build/src/index.d.ts";
	var bin$4 = {
		vl2png: "./bin/vl2png",
		vl2svg: "./bin/vl2svg",
		vl2vg: "./bin/vl2vg"
	};
	var directories = {
		test: "test"
	};
	var scripts = {
		prebuild: "mkdir -p build/src",
		build: "npm run build:only",
		"build:only": "tsc && rollup -c",
		postbuild: "uglifyjs build/vega-lite.js -cm --source-map content=build/vega-lite.js.map,filename=build/vega-lite.min.js.map -o build/vega-lite.min.js && npm run schema",
		"build:examples": "npm run build:only",
		"postbuild:examples": "npm run data && TZ=America/Los_Angeles scripts/build-examples.sh",
		"build:examples-full": "npm run build:only",
		"postbuild:examples-full": "TZ=America/Los_Angeles scripts/build-examples.sh 1",
		"build:example": "TZ=America/Los_Angeles scripts/build-example.sh",
		"build:toc": "bundle exec jekyll build -q && scripts/generate-toc",
		"build:site": "tsc -p site && webpack --config site/webpack.config.js",
		"build:versions": "scripts/update-version.sh",
		clean: "rm -rf build && rm -f examples/compiled/*.png && find site/examples ! -name 'index.md' -type f -delete",
		data: "rsync -r node_modules/vega-datasets/data/* data",
		deploy: "scripts/deploy.sh",
		"deploy:gh": "scripts/deploy-gh.sh",
		"deploy:schema": "scripts/deploy-schema.sh",
		preschema: "npm run prebuild",
		schema: "node --stack-size=1400 ./node_modules/.bin/ts-json-schema-generator --path tsconfig.json --type TopLevelSpec > build/vega-lite-schema.json && npm run renameschema && cp build/vega-lite-schema.json _data/",
		renameschema: "scripts/rename-schema.sh",
		presite: "npm run prebuild && npm run data && npm run build:site && npm run build:toc && npm run build:versions && scripts/create-example-pages",
		site: "bundle exec jekyll serve --incremental",
		format: "tslint -p . --fix -e 'package.json' && prettier --write '{src,test,test-runtime}/**/*.ts'",
		lint: "tslint -p . -e 'package.json' && prettier --list-different '{src,test,test-runtime}/**/*.ts'",
		test: "jest test/ && npm run lint && npm run schema && jest examples/ && npm run test:runtime",
		"test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand test",
		"test:runtime": "TZ=America/Los_Angeles TS_NODE_COMPILER_OPTIONS='{\"module\":\"commonjs\"}' wdio wdio.conf.js",
		"test:runtime:generate": "rm -Rf test-runtime/resources && VL_GENERATE_TESTS=true npm run test:runtime",
		"watch:build": "npm run build:only && concurrently --kill-others -n Typescript,Rollup 'tsc -w' 'rollup -c -w'",
		"watch:site": "concurrently --kill-others -n Typescript,Webpack 'tsc -p site --watch' 'webpack --config site/webpack.config.js --mode development --watch'",
		"watch:test": "jest --watch"
	};
	var repository = {
		type: "git",
		url: "https://github.com/vega/vega-lite.git"
	};
	var license = "BSD-3-Clause";
	var bugs = {
		url: "https://github.com/vega/vega-lite/issues"
	};
	var devDependencies = {
		"@babel/core": "^7.0.0-beta.55",
		"@types/chai": "^4.1.4",
		"@types/d3": "^5.0.0",
		"@types/highlight.js": "^9.12.3",
		"@types/jest": "^23.3.1",
		"@types/json-stable-stringify": "^1.0.32",
		"@types/mkdirp": "^0.5.2",
		"@types/node": "^10.5.5",
		"@types/webdriverio": "^4.10.3",
		ajv: "^6.5.2",
		chai: "^4.1.2",
		cheerio: "^1.0.0-rc.2",
		chromedriver: "^2.41.0",
		codecov: "^3.0.4",
		concurrently: "^3.6.1",
		d3: "^5.5.0",
		"highlight.js": "^9.12.0",
		jest: "^23.4.2",
		"json-stable-stringify": "^1.0.1",
		mkdirp: "^0.5.1",
		prettier: "^1.14.0",
		rollup: "^0.63.5",
		"rollup-plugin-commonjs": "^9.1.4",
		"rollup-plugin-json": "^3.0.0",
		"rollup-plugin-node-resolve": "^3.3.0",
		"rollup-plugin-sourcemaps": "^0.4.2",
		"source-map-support": "^0.5.6",
		"svg2png-many": "^0.0.7",
		"ts-jest": "^23.1.0",
		"ts-json-schema-generator": "^0.32.0",
		"ts-node": "^7.0.0",
		tslint: "5.11.0",
		"tslint-config-prettier": "^1.14.0",
		"tslint-eslint-rules": "^5.3.1",
		typescript: "^3.0.1",
		"uglify-js": "^3.4.6",
		vega: "^4.2.0",
		"vega-datasets": "^1.19.0",
		"vega-embed": "^3.18.2",
		"vega-tooltip": "^0.12.0",
		"wdio-chromedriver-service": "^0.1.3",
		"wdio-dot-reporter": "0.0.9",
		"wdio-mocha-framework": "^0.5.13",
		"wdio-static-server-service": "^1.0.1",
		webdriverio: "^4.13.1",
		webpack: "^4.16.4",
		"webpack-cli": "^3.1.0",
		"yaml-front-matter": "^4.0.0"
	};
	var dependencies = {
		"json-stringify-pretty-compact": "^1.2.0",
		tslib: "^1.9.3",
		"vega-event-selector": "^2.0.0",
		"vega-typings": "^0.3.38",
		"vega-util": "^1.7.0",
		yargs: "^12.0.1"
	};
	var jest = {
		testURL: "http://localhost/",
		transform: {
			"^.+\\.tsx?$": "ts-jest"
		},
		testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
		moduleFileExtensions: [
			"ts",
			"tsx",
			"js",
			"jsx",
			"json",
			"node"
		],
		testPathIgnorePatterns: [
			"node_modules",
			"test-runtime",
			"<rootDir>/build",
			"_site",
			"src"
		],
		coverageDirectory: "./coverage/",
		collectCoverage: false
	};
	var _package = {
		name: name,
		author: author,
		version: version,
		collaborators: collaborators,
		homepage: homepage,
		description: description,
		main: main,
		unpkg: unpkg,
		jsdelivr: jsdelivr,
		module: module$1,
		types: types,
		bin: bin$4,
		directories: directories,
		scripts: scripts,
		repository: repository,
		license: license,
		bugs: bugs,
		devDependencies: devDependencies,
		dependencies: dependencies,
		jest: jest
	};

	var _package$1 = /*#__PURE__*/Object.freeze({
		name: name,
		author: author,
		version: version,
		collaborators: collaborators,
		homepage: homepage,
		description: description,
		main: main,
		unpkg: unpkg,
		jsdelivr: jsdelivr,
		module: module$1,
		types: types,
		bin: bin$4,
		directories: directories,
		scripts: scripts,
		repository: repository,
		license: license,
		bugs: bugs,
		devDependencies: devDependencies,
		dependencies: dependencies,
		jest: jest,
		default: _package
	});

	var require$$23 = ( _package$1 && _package ) || _package$1;

	var src = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var aggregate$$1 = tslib_1.__importStar(aggregate);
	exports.aggregate = aggregate$$1;
	var axis$$1 = tslib_1.__importStar(axis);
	exports.axis = axis$$1;
	var bin$$1 = tslib_1.__importStar(bin);
	exports.bin = bin$$1;
	var channel$$1 = tslib_1.__importStar(channel);
	exports.channel = channel$$1;
	var compositeMark = tslib_1.__importStar(compositemark);
	exports.compositeMark = compositeMark;

	exports.compile = compile_1.compile;
	var config$$1 = tslib_1.__importStar(config);
	exports.config = config$$1;
	var data$$1 = tslib_1.__importStar(data);
	exports.data = data$$1;
	var datetime$$1 = tslib_1.__importStar(datetime);
	exports.datetime = datetime$$1;
	var encoding$$1 = tslib_1.__importStar(encoding);
	exports.encoding = encoding$$1;
	var facet$$1 = tslib_1.__importStar(facet);
	exports.facet = facet$$1;
	var fieldDef = tslib_1.__importStar(fielddef);
	exports.fieldDef = fieldDef;
	var header$$1 = tslib_1.__importStar(header);
	exports.header = header$$1;
	var legend$$1 = tslib_1.__importStar(legend);
	exports.legend = legend$$1;
	var mark$$1 = tslib_1.__importStar(mark);
	exports.mark = mark$$1;
	var scale$$1 = tslib_1.__importStar(scale);
	exports.scale = scale$$1;
	var sort$$1 = tslib_1.__importStar(sort);
	exports.sort = sort$$1;
	var spec$$1 = tslib_1.__importStar(spec);
	exports.spec = spec$$1;
	var stack = tslib_1.__importStar(stack_1);
	exports.stack = stack;
	var timeUnit = tslib_1.__importStar(timeunit);
	exports.timeUnit = timeUnit;
	var transform$$1 = tslib_1.__importStar(transform);
	exports.transform = transform$$1;
	var type$$1 = tslib_1.__importStar(type);
	exports.type = type$$1;
	var util$$1 = tslib_1.__importStar(util);
	exports.util = util$$1;
	var validate$$1 = tslib_1.__importStar(validate);
	exports.validate = validate$$1;
	var package_json_1 = tslib_1.__importDefault(require$$23);
	var version = package_json_1.default.version;
	exports.version = version;

	});

	var index$4 = unwrapExports(src);
	var src_1 = src.aggregate;
	var src_2 = src.axis;
	var src_3 = src.bin;
	var src_4 = src.channel;
	var src_5 = src.compositeMark;
	var src_6 = src.compile;
	var src_7 = src.config;
	var src_8 = src.data;
	var src_9 = src.datetime;
	var src_10 = src.encoding;
	var src_11 = src.facet;
	var src_12 = src.fieldDef;
	var src_13 = src.header;
	var src_14 = src.legend;
	var src_15 = src.mark;
	var src_16 = src.scale;
	var src_17 = src.sort;
	var src_18 = src.spec;
	var src_19 = src.stack;
	var src_20 = src.timeUnit;
	var src_21 = src.transform;
	var src_22 = src.type;
	var src_23 = src.util;
	var src_24 = src.validate;
	var src_25 = src.version;

	exports.default = index$4;
	exports.aggregate = src_1;
	exports.axis = src_2;
	exports.bin = src_3;
	exports.channel = src_4;
	exports.compositeMark = src_5;
	exports.compile = src_6;
	exports.config = src_7;
	exports.data = src_8;
	exports.datetime = src_9;
	exports.encoding = src_10;
	exports.facet = src_11;
	exports.fieldDef = src_12;
	exports.header = src_13;
	exports.legend = src_14;
	exports.mark = src_15;
	exports.scale = src_16;
	exports.sort = src_17;
	exports.spec = src_18;
	exports.stack = src_19;
	exports.timeUnit = src_20;
	exports.transform = src_21;
	exports.type = src_22;
	exports.util = src_23;
	exports.validate = src_24;
	exports.version = src_25;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vega-lite.js.map
