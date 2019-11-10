(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.dl = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n.default || n;
	}

	var util = createCommonjsModule(function (module) {
	var u = module.exports;

	// utility functions

	var FNAME = '__name__';

	u.namedfunc = function(name, f) { return (f[FNAME] = name, f); };

	u.name = function(f) { return f==null ? null : f[FNAME]; };

	u.identity = function(x) { return x; };

	u.true = u.namedfunc('true', function() { return true; });

	u.false = u.namedfunc('false', function() { return false; });

	u.duplicate = function(obj) {
	  return JSON.parse(JSON.stringify(obj));
	};

	u.equal = function(a, b) {
	  return JSON.stringify(a) === JSON.stringify(b);
	};

	u.extend = function(obj) {
	  for (var x, name, i=1, len=arguments.length; i<len; ++i) {
	    x = arguments[i];
	    for (name in x) { obj[name] = x[name]; }
	  }
	  return obj;
	};

	u.length = function(x) {
	  return x != null && x.length != null ? x.length : null;
	};

	u.keys = function(x) {
	  var keys = [], k;
	  for (k in x) keys.push(k);
	  return keys;
	};

	u.vals = function(x) {
	  var vals = [], k;
	  for (k in x) vals.push(x[k]);
	  return vals;
	};

	u.toMap = function(list, f) {
	  return (f = u.$(f)) ?
	    list.reduce(function(obj, x) { return (obj[f(x)] = 1, obj); }, {}) :
	    list.reduce(function(obj, x) { return (obj[x] = 1, obj); }, {});
	};

	u.keystr = function(values) {
	  // use to ensure consistent key generation across modules
	  var n = values.length;
	  if (!n) return '';
	  for (var s=String(values[0]), i=1; i<n; ++i) {
	    s += '|' + String(values[i]);
	  }
	  return s;
	};

	// type checking functions

	var toString = Object.prototype.toString;

	u.isObject = function(obj) {
	  return obj === Object(obj);
	};

	u.isFunction = function(obj) {
	  return toString.call(obj) === '[object Function]';
	};

	u.isString = function(obj) {
	  return typeof value === 'string' || toString.call(obj) === '[object String]';
	};

	u.isArray = Array.isArray || function(obj) {
	  return toString.call(obj) === '[object Array]';
	};

	u.isNumber = function(obj) {
	  return typeof obj === 'number' || toString.call(obj) === '[object Number]';
	};

	u.isBoolean = function(obj) {
	  return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
	};

	u.isDate = function(obj) {
	  return toString.call(obj) === '[object Date]';
	};

	u.isValid = function(obj) {
	  return obj != null && obj === obj;
	};

	u.isBuffer = (typeof Buffer === 'function' && Buffer.isBuffer) || u.false;

	// type coercion functions

	u.number = function(s) {
	  return s == null || s === '' ? null : +s;
	};

	u.boolean = function(s) {
	  return s == null || s === '' ? null : s==='false' ? false : !!s;
	};

	// parse a date with optional d3.time-format format
	u.date = function(s, format) {
	  var d = format ? format : Date;
	  return s == null || s === '' ? null : d.parse(s);
	};

	u.array = function(x) {
	  return x != null ? (u.isArray(x) ? x : [x]) : [];
	};

	u.str = function(x) {
	  return u.isArray(x) ? '[' + x.map(u.str) + ']'
	    : u.isObject(x) || u.isString(x) ?
	      // Output valid JSON and JS source strings.
	      // See http://timelessrepo.com/json-isnt-a-javascript-subset
	      JSON.stringify(x).replace('\u2028','\\u2028').replace('\u2029', '\\u2029')
	    : x;
	};

	// data access functions

	var field_re = /\[(.*?)\]|[^.\[]+/g;

	u.field = function(f) {
	  return String(f).match(field_re).map(function(d) {
	    return d[0] !== '[' ? d :
	      d[1] !== "'" && d[1] !== '"' ? d.slice(1, -1) :
	      d.slice(2, -2).replace(/\\(["'])/g, '$1');
	  });
	};

	u.accessor = function(f) {
	  /* jshint evil: true */
	  return f==null || u.isFunction(f) ? f :
	    u.namedfunc(f, Function('x', 'return x[' + u.field(f).map(u.str).join('][') + '];'));
	};

	// short-cut for accessor
	u.$ = u.accessor;

	u.mutator = function(f) {
	  var s;
	  return u.isString(f) && (s=u.field(f)).length > 1 ?
	    function(x, v) {
	      for (var i=0; i<s.length-1; ++i) x = x[s[i]];
	      x[s[i]] = v;
	    } :
	    function(x, v) { x[f] = v; };
	};


	u.$func = function(name, op) {
	  return function(f) {
	    f = u.$(f) || u.identity;
	    var n = name + (u.name(f) ? '_'+u.name(f) : '');
	    return u.namedfunc(n, function(d) { return op(f(d)); });
	  };
	};

	u.$valid  = u.$func('valid', u.isValid);
	u.$length = u.$func('length', u.length);

	u.$in = function(f, values) {
	  f = u.$(f);
	  var map = u.isArray(values) ? u.toMap(values) : values;
	  return function(d) { return !!map[f(d)]; };
	};

	// comparison / sorting functions

	u.comparator = function(sort) {
	  var sign = [];
	  if (sort === undefined) sort = [];
	  sort = u.array(sort).map(function(f) {
	    var s = 1;
	    if      (f[0] === '-') { s = -1; f = f.slice(1); }
	    else if (f[0] === '+') { s = +1; f = f.slice(1); }
	    sign.push(s);
	    return u.accessor(f);
	  });
	  return function(a, b) {
	    var i, n, f, c;
	    for (i=0, n=sort.length; i<n; ++i) {
	      f = sort[i];
	      c = u.cmp(f(a), f(b));
	      if (c) return c * sign[i];
	    }
	    return 0;
	  };
	};

	u.cmp = function(a, b) {
	  return (a < b || a == null) && b != null ? -1 :
	    (a > b || b == null) && a != null ? 1 :
	    ((b = b instanceof Date ? +b : b),
	     (a = a instanceof Date ? +a : a)) !== a && b === b ? -1 :
	    b !== b && a === a ? 1 : 0;
	};

	u.numcmp = function(a, b) { return a - b; };

	u.stablesort = function(array, sortBy, keyFn) {
	  var indices = array.reduce(function(idx, v, i) {
	    return (idx[keyFn(v)] = i, idx);
	  }, {});

	  array.sort(function(a, b) {
	    var sa = sortBy(a),
	        sb = sortBy(b);
	    return sa < sb ? -1 : sa > sb ? 1
	         : (indices[keyFn(a)] - indices[keyFn(b)]);
	  });

	  return array;
	};

	// permutes an array using a Knuth shuffle
	u.permute = function(a) {
	  var m = a.length,
	      swap,
	      i;

	  while (m) {
	    i = Math.floor(Math.random() * m--);
	    swap = a[m];
	    a[m] = a[i];
	    a[i] = swap;
	  }
	};

	// string functions

	u.pad = function(s, length, pos, padchar) {
	  padchar = padchar || " ";
	  var d = length - s.length;
	  if (d <= 0) return s;
	  switch (pos) {
	    case 'left':
	      return strrep(d, padchar) + s;
	    case 'middle':
	    case 'center':
	      return strrep(Math.floor(d/2), padchar) +
	         s + strrep(Math.ceil(d/2), padchar);
	    default:
	      return s + strrep(d, padchar);
	  }
	};

	function strrep(n, str) {
	  var s = "", i;
	  for (i=0; i<n; ++i) s += str;
	  return s;
	}

	u.truncate = function(s, length, pos, word, ellipsis) {
	  var len = s.length;
	  if (len <= length) return s;
	  ellipsis = ellipsis !== undefined ? String(ellipsis) : '\u2026';
	  var l = Math.max(0, length - ellipsis.length);

	  switch (pos) {
	    case 'left':
	      return ellipsis + (word ? truncateOnWord(s,l,1) : s.slice(len-l));
	    case 'middle':
	    case 'center':
	      var l1 = Math.ceil(l/2), l2 = Math.floor(l/2);
	      return (word ? truncateOnWord(s,l1) : s.slice(0,l1)) +
	        ellipsis + (word ? truncateOnWord(s,l2,1) : s.slice(len-l2));
	    default:
	      return (word ? truncateOnWord(s,l) : s.slice(0,l)) + ellipsis;
	  }
	};

	function truncateOnWord(s, len, rev) {
	  var cnt = 0, tok = s.split(truncate_word_re);
	  if (rev) {
	    s = (tok = tok.reverse())
	      .filter(function(w) { cnt += w.length; return cnt <= len; })
	      .reverse();
	  } else {
	    s = tok.filter(function(w) { cnt += w.length; return cnt <= len; });
	  }
	  return s.length ? s.join('').trim() : tok[0].slice(0, len);
	}

	var truncate_word_re = /([\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF])/;
	});

	var name = "datalib";
	var version = "1.9.2";
	var description = "JavaScript utilites for loading, summarizing and working with data.";
	var keywords = [
		"data",
		"table",
		"statistics",
		"parse",
		"csv",
		"tsv",
		"json",
		"utility"
	];
	var repository = {
		type: "git",
		url: "http://github.com/vega/datalib.git"
	};
	var author = {
		name: "Jeffrey Heer",
		url: "http://idl.cs.washington.edu"
	};
	var contributors = [
		{
			name: "Michael Correll",
			url: "http://pages.cs.wisc.edu/~mcorrell/"
		},
		{
			name: "Ryan Russell",
			url: "https://github.com/RussellSprouts"
		}
	];
	var license = "BSD-3-Clause";
	var dependencies = {
		"d3-dsv": "0.1",
		"d3-format": "0.4",
		"d3-time": "0.1",
		"d3-time-format": "0.2",
		request: "^2.67.0",
		"sync-request": "^6.0.0",
		"topojson-client": "^3.0.0"
	};
	var devDependencies = {
		chai: "^4.1.2",
		istanbul: "latest",
		jshint: "^2.9.5",
		mocha: "^5.2.0",
		rollup: "^0.62.0",
		"rollup-plugin-commonjs": "^9.1.3",
		"rollup-plugin-json": "^3.0.0",
		"rollup-plugin-node-resolve": "^3.3.0",
		"uglify-js": "^3.4.3"
	};
	var main = "src/index.js";
	var unpkg = "datalib.min.js";
	var jsdelivr = "datalib.min.js";
	var scripts = {
		deploy: "npm run test && scripts/deploy.sh",
		lint: "jshint src/",
		test: "npm run lint && TZ=America/Los_Angeles mocha --recursive test/",
		cover: "TZ=America/Los_Angeles istanbul cover _mocha -- --recursive test/",
		build: "rollup -c",
		postbuild: "uglifyjs datalib.js -c -m -o datalib.min.js"
	};
	var browser = {
		buffer: false,
		fs: false,
		http: false,
		request: false,
		"sync-request": false,
		url: false
	};
	var _package = {
		name: name,
		version: version,
		description: description,
		keywords: keywords,
		repository: repository,
		author: author,
		contributors: contributors,
		license: license,
		dependencies: dependencies,
		devDependencies: devDependencies,
		main: main,
		unpkg: unpkg,
		jsdelivr: jsdelivr,
		scripts: scripts,
		browser: browser
	};

	var _package$1 = /*#__PURE__*/Object.freeze({
		name: name,
		version: version,
		description: description,
		keywords: keywords,
		repository: repository,
		author: author,
		contributors: contributors,
		license: license,
		dependencies: dependencies,
		devDependencies: devDependencies,
		main: main,
		unpkg: unpkg,
		jsdelivr: jsdelivr,
		scripts: scripts,
		browser: browser,
		default: _package
	});

	var require$$3 = {};

	// Matches absolute URLs with optional protocol
	//   https://...    file://...    //...
	var protocol_re = /^([A-Za-z]+:)?\/\//;

	// Special treatment in node.js for the file: protocol
	var fileProtocol = 'file://';

	// Validate and cleanup URL to ensure that it is allowed to be accessed
	// Returns cleaned up URL, or false if access is not allowed
	function sanitizeUrl(opt) {
	  var url = opt.url;
	  if (!url && opt.file) { return fileProtocol + opt.file; }

	  // In case this is a relative url (has no host), prepend opt.baseURL
	  if (opt.baseURL && !protocol_re.test(url)) {
	    if (!startsWith(url, '/') && opt.baseURL[opt.baseURL.length-1] !== '/') {
	      url = '/' + url; // Ensure that there is a slash between the baseURL (e.g. hostname) and url
	    }
	    url = opt.baseURL + url;
	  }
	  // relative protocol, starts with '//'
	  if (!load.useXHR && startsWith(url, '//')) {
	    url = (opt.defaultProtocol || 'http') + ':' + url;
	  }
	  // If opt.domainWhiteList is set, only allows url, whose hostname
	  // * Is the same as the origin (window.location.hostname)
	  // * Equals one of the values in the whitelist
	  // * Is a proper subdomain of one of the values in the whitelist
	  if (opt.domainWhiteList) {
	    var domain, origin;
	    if (load.useXHR) {
	      var a = document.createElement('a');
	      a.href = url;
	      // From http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
	      // IE doesn't populate all link properties when setting .href with a relative URL,
	      // however .href will return an absolute URL which then can be used on itself
	      // to populate these additional fields.
	      if (a.host === '') {
	        a.href = a.href;
	      }
	      domain = a.hostname.toLowerCase();
	      origin = window.location.hostname;
	    } else {
	      // relative protocol is broken: https://github.com/defunctzombie/node-url/issues/5
	      var parts = require$$3.parse(url);
	      domain = parts.hostname;
	      origin = null;
	    }

	    if (origin !== domain) {
	      var whiteListed = opt.domainWhiteList.some(function(d) {
	        var idx = domain.length - d.length;
	        return d === domain ||
	          (idx > 1 && domain[idx-1] === '.' && domain.lastIndexOf(d) === idx);
	      });
	      if (!whiteListed) {
	        throw 'URL is not whitelisted: ' + url;
	      }
	    }
	  }
	  return url;
	}

	function load(opt, callback) {
	  return load.loader(opt, callback);
	}

	function loader(opt, callback) {
	  var error = callback || function(e) { throw e; }, url;

	  try {
	    url = load.sanitizeUrl(opt); // enable override
	  } catch (err) {
	    error(err);
	    return;
	  }

	  if (!url) {
	    error('Invalid URL: ' + opt.url);
	  } else if (load.useXHR) {
	    // on client, use xhr
	    return load.xhr(url, opt, callback);
	  } else if (startsWith(url, fileProtocol)) {
	    // on server, if url starts with 'file://', strip it and load from file
	    return load.file(url.slice(fileProtocol.length), opt, callback);
	  } else if (url.indexOf('://') < 0) { // TODO better protocol check?
	    // on server, if no protocol assume file
	    return load.file(url, opt, callback);
	  } else {
	    // for regular URLs on server
	    return load.http(url, opt, callback);
	  }
	}

	function xhrHasResponse(request) {
	  var type = request.responseType;
	  return type && type !== 'text' ?
	    request.response : // null on error
	    request.responseText; // '' on error
	}

	function xhr(url, opt, callback) {
	  var async = !!callback;
	  var request = new XMLHttpRequest();
	  // If IE does not support CORS, use XDomainRequest (copied from d3.xhr)
	  if (typeof XDomainRequest !== 'undefined' &&
	      !('withCredentials' in request) &&
	      /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();

	  function respond() {
	    var status = request.status;
	    if (!status && xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
	      callback(null, request.responseText);
	    } else {
	      callback(request, null);
	    }
	  }

	  if (async) {
	    if ('onload' in request) {
	      request.onload = request.onerror = respond;
	    } else {
	      request.onreadystatechange = function() {
	        if (request.readyState > 3) respond();
	      };
	    }
	  }

	  request.open('GET', url, async);
	  /* istanbul ignore else */
	  if (request.setRequestHeader) {
	    var headers = util.extend({}, load.headers, opt.headers);
	    for (var name in headers) {
	      request.setRequestHeader(name, headers[name]);
	    }
	  }
	  request.send();

	  if (!async && xhrHasResponse(request)) {
	    return request.responseText;
	  }
	}

	function file(filename, opt, callback) {
	  var fs = require$$3;
	  if (!callback) {
	    return fs.readFileSync(filename, 'utf8');
	  }
	  fs.readFile(filename, callback);
	}

	function http(url, opt, callback) {
	  var headers = util.extend({}, load.headers, opt.headers);

	  var options = {url: url, encoding: null, gzip: true, headers: headers};
	  if (!callback) {
	    return require$$3('GET', url, options).getBody();
	  }
	  require$$3(options, function(error, response, body) {
	    if (!error && response.statusCode === 200) {
	      callback(null, body);
	    } else {
	      error = error ||
	        'Load failed with response code ' + response.statusCode + '.';
	      callback(error, null);
	    }
	  });
	}

	function startsWith(string, searchString) {
	  return string == null ? false : string.lastIndexOf(searchString, 0) === 0;
	}

	// Allow these functions to be overriden by the user of the library
	load.loader = loader;
	load.sanitizeUrl = sanitizeUrl;
	load.xhr = xhr;
	load.file = file;
	load.http = http;

	// Default settings
	load.useXHR = (typeof XMLHttpRequest !== 'undefined');
	load.headers = {};

	var load_1 = load;

	var TYPES = '__types__';

	var PARSERS = {
	  boolean: util.boolean,
	  integer: util.number,
	  number:  util.number,
	  date:    util.date,
	  string:  function(x) { return x == null || x === '' ? null : x + ''; }
	};

	var TESTS = {
	  boolean: function(x) { return x==='true' || x==='false' || util.isBoolean(x); },
	  integer: function(x) { return TESTS.number(x) && (x=+x) === ~~x; },
	  number: function(x) { return !isNaN(+x) && !util.isDate(x); },
	  date: function(x) { return !isNaN(Date.parse(x)); }
	};

	function annotation(data, types) {
	  if (!types) return data && data[TYPES] || null;
	  data[TYPES] = types;
	}

	function fieldNames(datum) {
	  return util.keys(datum);
	}

	function bracket(fieldName) {
	  return '[' + fieldName + ']';
	}

	function type(values, f) {
	  values = util.array(values);
	  f = util.$(f);
	  var v, i, n;

	  // if data array has type annotations, use them
	  if (values[TYPES]) {
	    v = f(values[TYPES]);
	    if (util.isString(v)) return v;
	  }

	  for (i=0, n=values.length; !util.isValid(v) && i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	  }

	  return util.isDate(v) ? 'date' :
	    util.isNumber(v)    ? 'number' :
	    util.isBoolean(v)   ? 'boolean' :
	    util.isString(v)    ? 'string' : null;
	}

	function typeAll(data, fields) {
	  if (!data.length) return;
	  var get = fields ? util.identity : (fields = fieldNames(data[0]), bracket);
	  return fields.reduce(function(types, f) {
	    return (types[f] = type(data, get(f)), types);
	  }, {});
	}

	function infer(values, f, ignore) {
	  values = util.array(values);
	  f = util.$(f);
	  var i, j, v;

	  // types to test for, in precedence order
	  var types = ['boolean', 'integer', 'number', 'date'];

	  for (i=0; i<values.length; ++i) {
	    // get next value to test
	    v = f ? f(values[i]) : values[i];
	    // test value against remaining types
	    for (j=0; j<types.length; ++j) {
	      if ((!ignore || !ignore.test(v)) && util.isValid(v) && !TESTS[types[j]](v)) {
	        types.splice(j, 1);
	        j -= 1;
	      }
	    }
	    // if no types left, return 'string'
	    if (types.length === 0) return 'string';
	  }

	  return types[0];
	}

	function inferAll(data, fields, ignore) {
	  var get = fields ? util.identity : (fields = fieldNames(data[0]), bracket);
	  return fields.reduce(function(types, f) {
	    types[f] = infer(data, get(f), ignore);
	    return types;
	  }, {});
	}

	type.annotation = annotation;
	type.all = typeAll;
	type.infer = infer;
	type.inferAll = inferAll;
	type.parsers = PARSERS;
	var type_1 = type;

	var d3Dsv = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  factory(exports);
	}(commonjsGlobal, function (exports) {
	  function dsv(delimiter) {
	    return new Dsv(delimiter);
	  }

	  function objectConverter(columns) {
	    return new Function("d", "return {" + columns.map(function(name, i) {
	      return JSON.stringify(name) + ": d[" + i + "]";
	    }).join(",") + "}");
	  }

	  function customConverter(columns, f) {
	    var object = objectConverter(columns);
	    return function(row, i) {
	      return f(object(row), i, columns);
	    };
	  }

	  // Compute unique columns in order of discovery.
	  function inferColumns(rows) {
	    var columnSet = Object.create(null),
	        columns = [];

	    rows.forEach(function(row) {
	      for (var column in row) {
	        if (!(column in columnSet)) {
	          columns.push(columnSet[column] = column);
	        }
	      }
	    });

	    return columns;
	  }

	  function Dsv(delimiter) {
	    var reFormat = new RegExp("[\"" + delimiter + "\n]"),
	        delimiterCode = delimiter.charCodeAt(0);

	    this.parse = function(text, f) {
	      var convert, columns, rows = this.parseRows(text, function(row, i) {
	        if (convert) return convert(row, i - 1);
	        columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
	      });
	      rows.columns = columns;
	      return rows;
	    };

	    this.parseRows = function(text, f) {
	      var EOL = {}, // sentinel value for end-of-line
	          EOF = {}, // sentinel value for end-of-file
	          rows = [], // output rows
	          N = text.length,
	          I = 0, // current character index
	          n = 0, // the current line number
	          t, // the current token
	          eol; // is the current token followed by EOL?

	      function token() {
	        if (I >= N) return EOF; // special case: end of file
	        if (eol) return eol = false, EOL; // special case: end of line

	        // special case: quotes
	        var j = I, c;
	        if (text.charCodeAt(j) === 34) {
	          var i = j;
	          while (i++ < N) {
	            if (text.charCodeAt(i) === 34) {
	              if (text.charCodeAt(i + 1) !== 34) break;
	              ++i;
	            }
	          }
	          I = i + 2;
	          c = text.charCodeAt(i + 1);
	          if (c === 13) {
	            eol = true;
	            if (text.charCodeAt(i + 2) === 10) ++I;
	          } else if (c === 10) {
	            eol = true;
	          }
	          return text.slice(j + 1, i).replace(/""/g, "\"");
	        }

	        // common case: find next delimiter or newline
	        while (I < N) {
	          var k = 1;
	          c = text.charCodeAt(I++);
	          if (c === 10) eol = true; // \n
	          else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
	          else if (c !== delimiterCode) continue;
	          return text.slice(j, I - k);
	        }

	        // special case: last token before EOF
	        return text.slice(j);
	      }

	      while ((t = token()) !== EOF) {
	        var a = [];
	        while (t !== EOL && t !== EOF) {
	          a.push(t);
	          t = token();
	        }
	        if (f && (a = f(a, n++)) == null) continue;
	        rows.push(a);
	      }

	      return rows;
	    };

	    this.format = function(rows, columns) {
	      if (columns == null) columns = inferColumns(rows);
	      return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
	        return columns.map(function(column) {
	          return formatValue(row[column]);
	        }).join(delimiter);
	      })).join("\n");
	    };

	    this.formatRows = function(rows) {
	      return rows.map(formatRow).join("\n");
	    };

	    function formatRow(row) {
	      return row.map(formatValue).join(delimiter);
	    }

	    function formatValue(text) {
	      return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
	    }
	  }

	  dsv.prototype = Dsv.prototype;

	  var csv = dsv(",");
	  var tsv = dsv("\t");

	  var version = "0.1.14";

	  exports.version = version;
	  exports.dsv = dsv;
	  exports.csv = csv;
	  exports.tsv = tsv;

	}));
	});

	function dsv(data, format) {
	  if (data) {
	    var h = format.header;
	    data = (h ? h.join(format.delimiter) + '\n' : '') + data;
	  }
	  return d3Dsv.dsv(format.delimiter).parse(data);
	}

	dsv.delimiter = function(delim) {
	  var fmt = {delimiter: delim};
	  return function(data, format) {
	    return dsv(data, format ? util.extend(format, fmt) : fmt);
	  };
	};

	var dsv_1 = dsv;

	var json = function(data, format) {
	  var d = util.isObject(data) && !util.isBuffer(data) ?
	    data : JSON.parse(data);
	  if (format && format.property) {
	    d = util.accessor(format.property)(d);
	  }
	  return d;
	};

	function identity(x) {
	  return x;
	}

	function transform(transform) {
	  if (transform == null) return identity;
	  var x0,
	      y0,
	      kx = transform.scale[0],
	      ky = transform.scale[1],
	      dx = transform.translate[0],
	      dy = transform.translate[1];
	  return function(input, i) {
	    if (!i) x0 = y0 = 0;
	    var j = 2, n = input.length, output = new Array(n);
	    output[0] = (x0 += input[0]) * kx + dx;
	    output[1] = (y0 += input[1]) * ky + dy;
	    while (j < n) output[j] = input[j], ++j;
	    return output;
	  };
	}

	function bbox(topology) {
	  var t = transform(topology.transform), key,
	      x0 = Infinity, y0 = x0, x1 = -x0, y1 = -x0;

	  function bboxPoint(p) {
	    p = t(p);
	    if (p[0] < x0) x0 = p[0];
	    if (p[0] > x1) x1 = p[0];
	    if (p[1] < y0) y0 = p[1];
	    if (p[1] > y1) y1 = p[1];
	  }

	  function bboxGeometry(o) {
	    switch (o.type) {
	      case "GeometryCollection": o.geometries.forEach(bboxGeometry); break;
	      case "Point": bboxPoint(o.coordinates); break;
	      case "MultiPoint": o.coordinates.forEach(bboxPoint); break;
	    }
	  }

	  topology.arcs.forEach(function(arc) {
	    var i = -1, n = arc.length, p;
	    while (++i < n) {
	      p = t(arc[i], i);
	      if (p[0] < x0) x0 = p[0];
	      if (p[0] > x1) x1 = p[0];
	      if (p[1] < y0) y0 = p[1];
	      if (p[1] > y1) y1 = p[1];
	    }
	  });

	  for (key in topology.objects) {
	    bboxGeometry(topology.objects[key]);
	  }

	  return [x0, y0, x1, y1];
	}

	function reverse(array, n) {
	  var t, j = array.length, i = j - n;
	  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
	}

	function feature(topology, o) {
	  return o.type === "GeometryCollection"
	      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature$1(topology, o); })}
	      : feature$1(topology, o);
	}

	function feature$1(topology, o) {
	  var id = o.id,
	      bbox = o.bbox,
	      properties = o.properties == null ? {} : o.properties,
	      geometry = object(topology, o);
	  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
	      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
	      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
	}

	function object(topology, o) {
	  var transformPoint = transform(topology.transform),
	      arcs = topology.arcs;

	  function arc(i, points) {
	    if (points.length) points.pop();
	    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
	      points.push(transformPoint(a[k], k));
	    }
	    if (i < 0) reverse(points, n);
	  }

	  function point(p) {
	    return transformPoint(p);
	  }

	  function line(arcs) {
	    var points = [];
	    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
	    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
	    return points;
	  }

	  function ring(arcs) {
	    var points = line(arcs);
	    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
	    return points;
	  }

	  function polygon(arcs) {
	    return arcs.map(ring);
	  }

	  function geometry(o) {
	    var type = o.type, coordinates;
	    switch (type) {
	      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
	      case "Point": coordinates = point(o.coordinates); break;
	      case "MultiPoint": coordinates = o.coordinates.map(point); break;
	      case "LineString": coordinates = line(o.arcs); break;
	      case "MultiLineString": coordinates = o.arcs.map(line); break;
	      case "Polygon": coordinates = polygon(o.arcs); break;
	      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
	      default: return null;
	    }
	    return {type: type, coordinates: coordinates};
	  }

	  return geometry(o);
	}

	function stitch(topology, arcs) {
	  var stitchedArcs = {},
	      fragmentByStart = {},
	      fragmentByEnd = {},
	      fragments = [],
	      emptyIndex = -1;

	  // Stitch empty arcs first, since they may be subsumed by other arcs.
	  arcs.forEach(function(i, j) {
	    var arc = topology.arcs[i < 0 ? ~i : i], t;
	    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
	      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
	    }
	  });

	  arcs.forEach(function(i) {
	    var e = ends(i),
	        start = e[0],
	        end = e[1],
	        f, g;

	    if (f = fragmentByEnd[start]) {
	      delete fragmentByEnd[f.end];
	      f.push(i);
	      f.end = end;
	      if (g = fragmentByStart[end]) {
	        delete fragmentByStart[g.start];
	        var fg = g === f ? f : f.concat(g);
	        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
	      } else {
	        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
	      }
	    } else if (f = fragmentByStart[end]) {
	      delete fragmentByStart[f.start];
	      f.unshift(i);
	      f.start = start;
	      if (g = fragmentByEnd[start]) {
	        delete fragmentByEnd[g.end];
	        var gf = g === f ? f : g.concat(f);
	        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
	      } else {
	        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
	      }
	    } else {
	      f = [i];
	      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
	    }
	  });

	  function ends(i) {
	    var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
	    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
	    else p1 = arc[arc.length - 1];
	    return i < 0 ? [p1, p0] : [p0, p1];
	  }

	  function flush(fragmentByEnd, fragmentByStart) {
	    for (var k in fragmentByEnd) {
	      var f = fragmentByEnd[k];
	      delete fragmentByStart[f.start];
	      delete f.start;
	      delete f.end;
	      f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
	      fragments.push(f);
	    }
	  }

	  flush(fragmentByEnd, fragmentByStart);
	  flush(fragmentByStart, fragmentByEnd);
	  arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

	  return fragments;
	}

	function mesh(topology) {
	  return object(topology, meshArcs.apply(this, arguments));
	}

	function meshArcs(topology, object$$1, filter) {
	  var arcs, i, n;
	  if (arguments.length > 1) arcs = extractArcs(topology, object$$1, filter);
	  else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
	  return {type: "MultiLineString", arcs: stitch(topology, arcs)};
	}

	function extractArcs(topology, object$$1, filter) {
	  var arcs = [],
	      geomsByArc = [],
	      geom;

	  function extract0(i) {
	    var j = i < 0 ? ~i : i;
	    (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
	  }

	  function extract1(arcs) {
	    arcs.forEach(extract0);
	  }

	  function extract2(arcs) {
	    arcs.forEach(extract1);
	  }

	  function extract3(arcs) {
	    arcs.forEach(extract2);
	  }

	  function geometry(o) {
	    switch (geom = o, o.type) {
	      case "GeometryCollection": o.geometries.forEach(geometry); break;
	      case "LineString": extract1(o.arcs); break;
	      case "MultiLineString": case "Polygon": extract2(o.arcs); break;
	      case "MultiPolygon": extract3(o.arcs); break;
	    }
	  }

	  geometry(object$$1);

	  geomsByArc.forEach(filter == null
	      ? function(geoms) { arcs.push(geoms[0].i); }
	      : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });

	  return arcs;
	}

	function planarRingArea(ring) {
	  var i = -1, n = ring.length, a, b = ring[n - 1], area = 0;
	  while (++i < n) a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];
	  return Math.abs(area); // Note: doubled area!
	}

	function merge(topology) {
	  return object(topology, mergeArcs.apply(this, arguments));
	}

	function mergeArcs(topology, objects) {
	  var polygonsByArc = {},
	      polygons = [],
	      groups = [];

	  objects.forEach(geometry);

	  function geometry(o) {
	    switch (o.type) {
	      case "GeometryCollection": o.geometries.forEach(geometry); break;
	      case "Polygon": extract(o.arcs); break;
	      case "MultiPolygon": o.arcs.forEach(extract); break;
	    }
	  }

	  function extract(polygon) {
	    polygon.forEach(function(ring) {
	      ring.forEach(function(arc) {
	        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
	      });
	    });
	    polygons.push(polygon);
	  }

	  function area(ring) {
	    return planarRingArea(object(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]);
	  }

	  polygons.forEach(function(polygon) {
	    if (!polygon._) {
	      var group = [],
	          neighbors = [polygon];
	      polygon._ = 1;
	      groups.push(group);
	      while (polygon = neighbors.pop()) {
	        group.push(polygon);
	        polygon.forEach(function(ring) {
	          ring.forEach(function(arc) {
	            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
	              if (!polygon._) {
	                polygon._ = 1;
	                neighbors.push(polygon);
	              }
	            });
	          });
	        });
	      }
	    }
	  });

	  polygons.forEach(function(polygon) {
	    delete polygon._;
	  });

	  return {
	    type: "MultiPolygon",
	    arcs: groups.map(function(polygons) {
	      var arcs = [], n;

	      // Extract the exterior (unique) arcs.
	      polygons.forEach(function(polygon) {
	        polygon.forEach(function(ring) {
	          ring.forEach(function(arc) {
	            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
	              arcs.push(arc);
	            }
	          });
	        });
	      });

	      // Stitch the arcs into one or more rings.
	      arcs = stitch(topology, arcs);

	      // If more than one ring is returned,
	      // at most one of these rings can be the exterior;
	      // choose the one with the greatest absolute area.
	      if ((n = arcs.length) > 1) {
	        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
	          if ((ki = area(arcs[i])) > k) {
	            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
	          }
	        }
	      }

	      return arcs;
	    })
	  };
	}

	function bisect(a, x) {
	  var lo = 0, hi = a.length;
	  while (lo < hi) {
	    var mid = lo + hi >>> 1;
	    if (a[mid] < x) lo = mid + 1;
	    else hi = mid;
	  }
	  return lo;
	}

	function neighbors(objects) {
	  var indexesByArc = {}, // arc index -> array of object indexes
	      neighbors = objects.map(function() { return []; });

	  function line(arcs, i) {
	    arcs.forEach(function(a) {
	      if (a < 0) a = ~a;
	      var o = indexesByArc[a];
	      if (o) o.push(i);
	      else indexesByArc[a] = [i];
	    });
	  }

	  function polygon(arcs, i) {
	    arcs.forEach(function(arc) { line(arc, i); });
	  }

	  function geometry(o, i) {
	    if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
	    else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
	  }

	  var geometryType = {
	    LineString: line,
	    MultiLineString: polygon,
	    Polygon: polygon,
	    MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
	  };

	  objects.forEach(geometry);

	  for (var i in indexesByArc) {
	    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
	      for (var k = j + 1; k < m; ++k) {
	        var ij = indexes[j], ik = indexes[k], n;
	        if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
	        if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
	      }
	    }
	  }

	  return neighbors;
	}

	function untransform(transform) {
	  if (transform == null) return identity;
	  var x0,
	      y0,
	      kx = transform.scale[0],
	      ky = transform.scale[1],
	      dx = transform.translate[0],
	      dy = transform.translate[1];
	  return function(input, i) {
	    if (!i) x0 = y0 = 0;
	    var j = 2,
	        n = input.length,
	        output = new Array(n),
	        x1 = Math.round((input[0] - dx) / kx),
	        y1 = Math.round((input[1] - dy) / ky);
	    output[0] = x1 - x0, x0 = x1;
	    output[1] = y1 - y0, y0 = y1;
	    while (j < n) output[j] = input[j], ++j;
	    return output;
	  };
	}

	function quantize(topology, transform) {
	  if (topology.transform) throw new Error("already quantized");

	  if (!transform || !transform.scale) {
	    if (!((n = Math.floor(transform)) >= 2)) throw new Error("n must be ≥2");
	    box = topology.bbox || bbox(topology);
	    var x0 = box[0], y0 = box[1], x1 = box[2], y1 = box[3], n;
	    transform = {scale: [x1 - x0 ? (x1 - x0) / (n - 1) : 1, y1 - y0 ? (y1 - y0) / (n - 1) : 1], translate: [x0, y0]};
	  } else {
	    box = topology.bbox;
	  }

	  var t = untransform(transform), box, key, inputs = topology.objects, outputs = {};

	  function quantizePoint(point) {
	    return t(point);
	  }

	  function quantizeGeometry(input) {
	    var output;
	    switch (input.type) {
	      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(quantizeGeometry)}; break;
	      case "Point": output = {type: "Point", coordinates: quantizePoint(input.coordinates)}; break;
	      case "MultiPoint": output = {type: "MultiPoint", coordinates: input.coordinates.map(quantizePoint)}; break;
	      default: return input;
	    }
	    if (input.id != null) output.id = input.id;
	    if (input.bbox != null) output.bbox = input.bbox;
	    if (input.properties != null) output.properties = input.properties;
	    return output;
	  }

	  function quantizeArc(input) {
	    var i = 0, j = 1, n = input.length, p, output = new Array(n); // pessimistic
	    output[0] = t(input[0], 0);
	    while (++i < n) if ((p = t(input[i], i))[0] || p[1]) output[j++] = p; // non-coincident points
	    if (j === 1) output[j++] = [0, 0]; // an arc must have at least two points
	    output.length = j;
	    return output;
	  }

	  for (key in inputs) outputs[key] = quantizeGeometry(inputs[key]);

	  return {
	    type: "Topology",
	    bbox: box,
	    transform: transform,
	    objects: outputs,
	    arcs: topology.arcs.map(quantizeArc)
	  };
	}



	var topojsonClient = /*#__PURE__*/Object.freeze({
		bbox: bbox,
		feature: feature,
		mesh: mesh,
		meshArcs: meshArcs,
		merge: merge,
		mergeArcs: mergeArcs,
		neighbors: neighbors,
		quantize: quantize,
		transform: transform,
		untransform: untransform
	});

	var reader = function(data, format) {
	  var topojson = reader.topojson;
	  if (topojson == null) { throw Error('TopoJSON library not loaded.'); }

	  var t = json(data, format), obj;

	  if (format && format.feature) {
	    if ((obj = t.objects[format.feature])) {
	      return topojson.feature(t, obj).features;
	    } else {
	      throw Error('Invalid TopoJSON object: ' + format.feature);
	    }
	  } else if (format && format.mesh) {
	    if ((obj = t.objects[format.mesh])) {
	      return [topojson.mesh(t, t.objects[format.mesh])];
	    } else {
	      throw Error('Invalid TopoJSON object: ' + format.mesh);
	    }
	  } else {
	    throw Error('Missing TopoJSON feature or mesh parameter.');
	  }
	};

	reader.topojson = topojsonClient;
	var topojson = reader;

	var treejson = function(tree, format) {
	  return toTable(json(tree, format), format);
	};

	function toTable(root, fields) {
	  var childrenField = fields && fields.children || 'children',
	      parentField = fields && fields.parent || 'parent',
	      table = [];

	  function visit(node, parent) {
	    node[parentField] = parent;
	    table.push(node);
	    var children = node[childrenField];
	    if (children) {
	      for (var i=0; i<children.length; ++i) {
	        visit(children[i], node);
	      }
	    }
	  }

	  visit(root, null);
	  return (table.root = root, table);
	}

	var formats = {
	  json: json,
	  topojson: topojson,
	  treejson: treejson,
	  dsv: dsv_1,
	  csv: dsv_1.delimiter(','),
	  tsv: dsv_1.delimiter('\t')
	};

	var d3Time = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  factory(exports);
	}(commonjsGlobal, function (exports) {
	  var t0 = new Date;
	  var t1 = new Date;
	  function newInterval(floori, offseti, count, field) {

	    function interval(date) {
	      return floori(date = new Date(+date)), date;
	    }

	    interval.floor = interval;

	    interval.round = function(date) {
	      var d0 = new Date(+date),
	          d1 = new Date(date - 1);
	      floori(d0), floori(d1), offseti(d1, 1);
	      return date - d0 < d1 - date ? d0 : d1;
	    };

	    interval.ceil = function(date) {
	      return floori(date = new Date(date - 1)), offseti(date, 1), date;
	    };

	    interval.offset = function(date, step) {
	      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
	    };

	    interval.range = function(start, stop, step) {
	      var range = [];
	      start = new Date(start - 1);
	      stop = new Date(+stop);
	      step = step == null ? 1 : Math.floor(step);
	      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
	      offseti(start, 1), floori(start);
	      if (start < stop) range.push(new Date(+start));
	      while (offseti(start, step), floori(start), start < stop) range.push(new Date(+start));
	      return range;
	    };

	    interval.filter = function(test) {
	      return newInterval(function(date) {
	        while (floori(date), !test(date)) date.setTime(date - 1);
	      }, function(date, step) {
	        while (--step >= 0) while (offseti(date, 1), !test(date));
	      });
	    };

	    if (count) {
	      interval.count = function(start, end) {
	        t0.setTime(+start), t1.setTime(+end);
	        floori(t0), floori(t1);
	        return Math.floor(count(t0, t1));
	      };

	      interval.every = function(step) {
	        step = Math.floor(step);
	        return !isFinite(step) || !(step > 0) ? null
	            : !(step > 1) ? interval
	            : interval.filter(field
	                ? function(d) { return field(d) % step === 0; }
	                : function(d) { return interval.count(0, d) % step === 0; });
	      };
	    }

	    return interval;
	  }
	  var millisecond = newInterval(function() {
	    // noop
	  }, function(date, step) {
	    date.setTime(+date + step);
	  }, function(start, end) {
	    return end - start;
	  });

	  // An optimized implementation for this simple case.
	  millisecond.every = function(k) {
	    k = Math.floor(k);
	    if (!isFinite(k) || !(k > 0)) return null;
	    if (!(k > 1)) return millisecond;
	    return newInterval(function(date) {
	      date.setTime(Math.floor(date / k) * k);
	    }, function(date, step) {
	      date.setTime(+date + step * k);
	    }, function(start, end) {
	      return (end - start) / k;
	    });
	  };

	  var second = newInterval(function(date) {
	    date.setMilliseconds(0);
	  }, function(date, step) {
	    date.setTime(+date + step * 1e3);
	  }, function(start, end) {
	    return (end - start) / 1e3;
	  }, function(date) {
	    return date.getSeconds();
	  });

	  var minute = newInterval(function(date) {
	    date.setSeconds(0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * 6e4);
	  }, function(start, end) {
	    return (end - start) / 6e4;
	  }, function(date) {
	    return date.getMinutes();
	  });

	  var hour = newInterval(function(date) {
	    date.setMinutes(0, 0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * 36e5);
	  }, function(start, end) {
	    return (end - start) / 36e5;
	  }, function(date) {
	    return date.getHours();
	  });

	  var day = newInterval(function(date) {
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setDate(date.getDate() + step);
	  }, function(start, end) {
	    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5;
	  }, function(date) {
	    return date.getDate() - 1;
	  });

	  function weekday(i) {
	    return newInterval(function(date) {
	      date.setHours(0, 0, 0, 0);
	      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
	    }, function(date, step) {
	      date.setDate(date.getDate() + step * 7);
	    }, function(start, end) {
	      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5;
	    });
	  }

	  var sunday = weekday(0);
	  var monday = weekday(1);
	  var tuesday = weekday(2);
	  var wednesday = weekday(3);
	  var thursday = weekday(4);
	  var friday = weekday(5);
	  var saturday = weekday(6);

	  var month = newInterval(function(date) {
	    date.setHours(0, 0, 0, 0);
	    date.setDate(1);
	  }, function(date, step) {
	    date.setMonth(date.getMonth() + step);
	  }, function(start, end) {
	    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
	  }, function(date) {
	    return date.getMonth();
	  });

	  var year = newInterval(function(date) {
	    date.setHours(0, 0, 0, 0);
	    date.setMonth(0, 1);
	  }, function(date, step) {
	    date.setFullYear(date.getFullYear() + step);
	  }, function(start, end) {
	    return end.getFullYear() - start.getFullYear();
	  }, function(date) {
	    return date.getFullYear();
	  });

	  var utcSecond = newInterval(function(date) {
	    date.setUTCMilliseconds(0);
	  }, function(date, step) {
	    date.setTime(+date + step * 1e3);
	  }, function(start, end) {
	    return (end - start) / 1e3;
	  }, function(date) {
	    return date.getUTCSeconds();
	  });

	  var utcMinute = newInterval(function(date) {
	    date.setUTCSeconds(0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * 6e4);
	  }, function(start, end) {
	    return (end - start) / 6e4;
	  }, function(date) {
	    return date.getUTCMinutes();
	  });

	  var utcHour = newInterval(function(date) {
	    date.setUTCMinutes(0, 0, 0);
	  }, function(date, step) {
	    date.setTime(+date + step * 36e5);
	  }, function(start, end) {
	    return (end - start) / 36e5;
	  }, function(date) {
	    return date.getUTCHours();
	  });

	  var utcDay = newInterval(function(date) {
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCDate(date.getUTCDate() + step);
	  }, function(start, end) {
	    return (end - start) / 864e5;
	  }, function(date) {
	    return date.getUTCDate() - 1;
	  });

	  function utcWeekday(i) {
	    return newInterval(function(date) {
	      date.setUTCHours(0, 0, 0, 0);
	      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
	    }, function(date, step) {
	      date.setUTCDate(date.getUTCDate() + step * 7);
	    }, function(start, end) {
	      return (end - start) / 6048e5;
	    });
	  }

	  var utcSunday = utcWeekday(0);
	  var utcMonday = utcWeekday(1);
	  var utcTuesday = utcWeekday(2);
	  var utcWednesday = utcWeekday(3);
	  var utcThursday = utcWeekday(4);
	  var utcFriday = utcWeekday(5);
	  var utcSaturday = utcWeekday(6);

	  var utcMonth = newInterval(function(date) {
	    date.setUTCHours(0, 0, 0, 0);
	    date.setUTCDate(1);
	  }, function(date, step) {
	    date.setUTCMonth(date.getUTCMonth() + step);
	  }, function(start, end) {
	    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
	  }, function(date) {
	    return date.getUTCMonth();
	  });

	  var utcYear = newInterval(function(date) {
	    date.setUTCHours(0, 0, 0, 0);
	    date.setUTCMonth(0, 1);
	  }, function(date, step) {
	    date.setUTCFullYear(date.getUTCFullYear() + step);
	  }, function(start, end) {
	    return end.getUTCFullYear() - start.getUTCFullYear();
	  }, function(date) {
	    return date.getUTCFullYear();
	  });

	  var milliseconds = millisecond.range;
	  var seconds = second.range;
	  var minutes = minute.range;
	  var hours = hour.range;
	  var days = day.range;
	  var sundays = sunday.range;
	  var mondays = monday.range;
	  var tuesdays = tuesday.range;
	  var wednesdays = wednesday.range;
	  var thursdays = thursday.range;
	  var fridays = friday.range;
	  var saturdays = saturday.range;
	  var weeks = sunday.range;
	  var months = month.range;
	  var years = year.range;

	  var utcMillisecond = millisecond;
	  var utcMilliseconds = milliseconds;
	  var utcSeconds = utcSecond.range;
	  var utcMinutes = utcMinute.range;
	  var utcHours = utcHour.range;
	  var utcDays = utcDay.range;
	  var utcSundays = utcSunday.range;
	  var utcMondays = utcMonday.range;
	  var utcTuesdays = utcTuesday.range;
	  var utcWednesdays = utcWednesday.range;
	  var utcThursdays = utcThursday.range;
	  var utcFridays = utcFriday.range;
	  var utcSaturdays = utcSaturday.range;
	  var utcWeeks = utcSunday.range;
	  var utcMonths = utcMonth.range;
	  var utcYears = utcYear.range;

	  var version = "0.1.1";

	  exports.version = version;
	  exports.milliseconds = milliseconds;
	  exports.seconds = seconds;
	  exports.minutes = minutes;
	  exports.hours = hours;
	  exports.days = days;
	  exports.sundays = sundays;
	  exports.mondays = mondays;
	  exports.tuesdays = tuesdays;
	  exports.wednesdays = wednesdays;
	  exports.thursdays = thursdays;
	  exports.fridays = fridays;
	  exports.saturdays = saturdays;
	  exports.weeks = weeks;
	  exports.months = months;
	  exports.years = years;
	  exports.utcMillisecond = utcMillisecond;
	  exports.utcMilliseconds = utcMilliseconds;
	  exports.utcSeconds = utcSeconds;
	  exports.utcMinutes = utcMinutes;
	  exports.utcHours = utcHours;
	  exports.utcDays = utcDays;
	  exports.utcSundays = utcSundays;
	  exports.utcMondays = utcMondays;
	  exports.utcTuesdays = utcTuesdays;
	  exports.utcWednesdays = utcWednesdays;
	  exports.utcThursdays = utcThursdays;
	  exports.utcFridays = utcFridays;
	  exports.utcSaturdays = utcSaturdays;
	  exports.utcWeeks = utcWeeks;
	  exports.utcMonths = utcMonths;
	  exports.utcYears = utcYears;
	  exports.millisecond = millisecond;
	  exports.second = second;
	  exports.minute = minute;
	  exports.hour = hour;
	  exports.day = day;
	  exports.sunday = sunday;
	  exports.monday = monday;
	  exports.tuesday = tuesday;
	  exports.wednesday = wednesday;
	  exports.thursday = thursday;
	  exports.friday = friday;
	  exports.saturday = saturday;
	  exports.week = sunday;
	  exports.month = month;
	  exports.year = year;
	  exports.utcSecond = utcSecond;
	  exports.utcMinute = utcMinute;
	  exports.utcHour = utcHour;
	  exports.utcDay = utcDay;
	  exports.utcSunday = utcSunday;
	  exports.utcMonday = utcMonday;
	  exports.utcTuesday = utcTuesday;
	  exports.utcWednesday = utcWednesday;
	  exports.utcThursday = utcThursday;
	  exports.utcFriday = utcFriday;
	  exports.utcSaturday = utcSaturday;
	  exports.utcWeek = utcSunday;
	  exports.utcMonth = utcMonth;
	  exports.utcYear = utcYear;
	  exports.interval = newInterval;

	}));
	});

	var d3TimeFormat = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  factory(exports, d3Time);
	}(commonjsGlobal, function (exports,d3Time$$1) {
	  function localDate(d) {
	    if (0 <= d.y && d.y < 100) {
	      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
	      date.setFullYear(d.y);
	      return date;
	    }
	    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
	  }

	  function utcDate(d) {
	    if (0 <= d.y && d.y < 100) {
	      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
	      date.setUTCFullYear(d.y);
	      return date;
	    }
	    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
	  }

	  function newYear(y) {
	    return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
	  }

	  function locale$1(locale) {
	    var locale_dateTime = locale.dateTime,
	        locale_date = locale.date,
	        locale_time = locale.time,
	        locale_periods = locale.periods,
	        locale_weekdays = locale.days,
	        locale_shortWeekdays = locale.shortDays,
	        locale_months = locale.months,
	        locale_shortMonths = locale.shortMonths;

	    var periodRe = formatRe(locale_periods),
	        periodLookup = formatLookup(locale_periods),
	        weekdayRe = formatRe(locale_weekdays),
	        weekdayLookup = formatLookup(locale_weekdays),
	        shortWeekdayRe = formatRe(locale_shortWeekdays),
	        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
	        monthRe = formatRe(locale_months),
	        monthLookup = formatLookup(locale_months),
	        shortMonthRe = formatRe(locale_shortMonths),
	        shortMonthLookup = formatLookup(locale_shortMonths);

	    var formats = {
	      "a": formatShortWeekday,
	      "A": formatWeekday,
	      "b": formatShortMonth,
	      "B": formatMonth,
	      "c": null,
	      "d": formatDayOfMonth,
	      "e": formatDayOfMonth,
	      "H": formatHour24,
	      "I": formatHour12,
	      "j": formatDayOfYear,
	      "L": formatMilliseconds,
	      "m": formatMonthNumber,
	      "M": formatMinutes,
	      "p": formatPeriod,
	      "S": formatSeconds,
	      "U": formatWeekNumberSunday,
	      "w": formatWeekdayNumber,
	      "W": formatWeekNumberMonday,
	      "x": null,
	      "X": null,
	      "y": formatYear,
	      "Y": formatFullYear,
	      "Z": formatZone,
	      "%": formatLiteralPercent
	    };

	    var utcFormats = {
	      "a": formatUTCShortWeekday,
	      "A": formatUTCWeekday,
	      "b": formatUTCShortMonth,
	      "B": formatUTCMonth,
	      "c": null,
	      "d": formatUTCDayOfMonth,
	      "e": formatUTCDayOfMonth,
	      "H": formatUTCHour24,
	      "I": formatUTCHour12,
	      "j": formatUTCDayOfYear,
	      "L": formatUTCMilliseconds,
	      "m": formatUTCMonthNumber,
	      "M": formatUTCMinutes,
	      "p": formatUTCPeriod,
	      "S": formatUTCSeconds,
	      "U": formatUTCWeekNumberSunday,
	      "w": formatUTCWeekdayNumber,
	      "W": formatUTCWeekNumberMonday,
	      "x": null,
	      "X": null,
	      "y": formatUTCYear,
	      "Y": formatUTCFullYear,
	      "Z": formatUTCZone,
	      "%": formatLiteralPercent
	    };

	    var parses = {
	      "a": parseShortWeekday,
	      "A": parseWeekday,
	      "b": parseShortMonth,
	      "B": parseMonth,
	      "c": parseLocaleDateTime,
	      "d": parseDayOfMonth,
	      "e": parseDayOfMonth,
	      "H": parseHour24,
	      "I": parseHour24,
	      "j": parseDayOfYear,
	      "L": parseMilliseconds,
	      "m": parseMonthNumber,
	      "M": parseMinutes,
	      "p": parsePeriod,
	      "S": parseSeconds,
	      "U": parseWeekNumberSunday,
	      "w": parseWeekdayNumber,
	      "W": parseWeekNumberMonday,
	      "x": parseLocaleDate,
	      "X": parseLocaleTime,
	      "y": parseYear,
	      "Y": parseFullYear,
	      "Z": parseZone,
	      "%": parseLiteralPercent
	    };

	    // These recursive directive definitions must be deferred.
	    formats.x = newFormat(locale_date, formats);
	    formats.X = newFormat(locale_time, formats);
	    formats.c = newFormat(locale_dateTime, formats);
	    utcFormats.x = newFormat(locale_date, utcFormats);
	    utcFormats.X = newFormat(locale_time, utcFormats);
	    utcFormats.c = newFormat(locale_dateTime, utcFormats);

	    function newFormat(specifier, formats) {
	      return function(date) {
	        var string = [],
	            i = -1,
	            j = 0,
	            n = specifier.length,
	            c,
	            pad,
	            format;

	        if (!(date instanceof Date)) date = new Date(+date);

	        while (++i < n) {
	          if (specifier.charCodeAt(i) === 37) {
	            string.push(specifier.slice(j, i));
	            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
	            else pad = c === "e" ? " " : "0";
	            if (format = formats[c]) c = format(date, pad);
	            string.push(c);
	            j = i + 1;
	          }
	        }

	        string.push(specifier.slice(j, i));
	        return string.join("");
	      };
	    }

	    function newParse(specifier, newDate) {
	      return function(string) {
	        var d = newYear(1900),
	            i = parseSpecifier(d, specifier, string += "", 0);
	        if (i != string.length) return null;

	        // The am-pm flag is 0 for AM, and 1 for PM.
	        if ("p" in d) d.H = d.H % 12 + d.p * 12;

	        // Convert day-of-week and week-of-year to day-of-year.
	        if ("W" in d || "U" in d) {
	          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
	          var day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
	          d.m = 0;
	          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
	        }

	        // If a time zone is specified, all fields are interpreted as UTC and then
	        // offset according to the specified time zone.
	        if ("Z" in d) {
	          d.H += d.Z / 100 | 0;
	          d.M += d.Z % 100;
	          return utcDate(d);
	        }

	        // Otherwise, all fields are in local time.
	        return newDate(d);
	      };
	    }

	    function parseSpecifier(d, specifier, string, j) {
	      var i = 0,
	          n = specifier.length,
	          m = string.length,
	          c,
	          parse;

	      while (i < n) {
	        if (j >= m) return -1;
	        c = specifier.charCodeAt(i++);
	        if (c === 37) {
	          c = specifier.charAt(i++);
	          parse = parses[c in pads ? specifier.charAt(i++) : c];
	          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
	        } else if (c != string.charCodeAt(j++)) {
	          return -1;
	        }
	      }

	      return j;
	    }

	    function parsePeriod(d, string, i) {
	      var n = periodRe.exec(string.slice(i));
	      return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseShortWeekday(d, string, i) {
	      var n = shortWeekdayRe.exec(string.slice(i));
	      return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseWeekday(d, string, i) {
	      var n = weekdayRe.exec(string.slice(i));
	      return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseShortMonth(d, string, i) {
	      var n = shortMonthRe.exec(string.slice(i));
	      return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseMonth(d, string, i) {
	      var n = monthRe.exec(string.slice(i));
	      return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseLocaleDateTime(d, string, i) {
	      return parseSpecifier(d, locale_dateTime, string, i);
	    }

	    function parseLocaleDate(d, string, i) {
	      return parseSpecifier(d, locale_date, string, i);
	    }

	    function parseLocaleTime(d, string, i) {
	      return parseSpecifier(d, locale_time, string, i);
	    }

	    function formatShortWeekday(d) {
	      return locale_shortWeekdays[d.getDay()];
	    }

	    function formatWeekday(d) {
	      return locale_weekdays[d.getDay()];
	    }

	    function formatShortMonth(d) {
	      return locale_shortMonths[d.getMonth()];
	    }

	    function formatMonth(d) {
	      return locale_months[d.getMonth()];
	    }

	    function formatPeriod(d) {
	      return locale_periods[+(d.getHours() >= 12)];
	    }

	    function formatUTCShortWeekday(d) {
	      return locale_shortWeekdays[d.getUTCDay()];
	    }

	    function formatUTCWeekday(d) {
	      return locale_weekdays[d.getUTCDay()];
	    }

	    function formatUTCShortMonth(d) {
	      return locale_shortMonths[d.getUTCMonth()];
	    }

	    function formatUTCMonth(d) {
	      return locale_months[d.getUTCMonth()];
	    }

	    function formatUTCPeriod(d) {
	      return locale_periods[+(d.getUTCHours() >= 12)];
	    }

	    return {
	      format: function(specifier) {
	        var f = newFormat(specifier += "", formats);
	        f.parse = newParse(specifier, localDate);
	        f.toString = function() { return specifier; };
	        return f;
	      },
	      utcFormat: function(specifier) {
	        var f = newFormat(specifier += "", utcFormats);
	        f.parse = newParse(specifier, utcDate);
	        f.toString = function() { return specifier; };
	        return f;
	      }
	    };
	  }
	  var pads = {"-": "", "_": " ", "0": "0"};
	  var numberRe = /^\s*\d+/;
	  var percentRe = /^%/;
	  var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
	  function pad(value, fill, width) {
	    var sign = value < 0 ? "-" : "",
	        string = (sign ? -value : value) + "",
	        length = string.length;
	    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
	  }

	  function requote(s) {
	    return s.replace(requoteRe, "\\$&");
	  }

	  function formatRe(names) {
	    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
	  }

	  function formatLookup(names) {
	    var map = {}, i = -1, n = names.length;
	    while (++i < n) map[names[i].toLowerCase()] = i;
	    return map;
	  }

	  function parseWeekdayNumber(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 1));
	    return n ? (d.w = +n[0], i + n[0].length) : -1;
	  }

	  function parseWeekNumberSunday(d, string, i) {
	    var n = numberRe.exec(string.slice(i));
	    return n ? (d.U = +n[0], i + n[0].length) : -1;
	  }

	  function parseWeekNumberMonday(d, string, i) {
	    var n = numberRe.exec(string.slice(i));
	    return n ? (d.W = +n[0], i + n[0].length) : -1;
	  }

	  function parseFullYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 4));
	    return n ? (d.y = +n[0], i + n[0].length) : -1;
	  }

	  function parseYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
	  }

	  function parseZone(d, string, i) {
	    var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
	    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
	  }

	  function parseMonthNumber(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
	  }

	  function parseDayOfMonth(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.d = +n[0], i + n[0].length) : -1;
	  }

	  function parseDayOfYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 3));
	    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
	  }

	  function parseHour24(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.H = +n[0], i + n[0].length) : -1;
	  }

	  function parseMinutes(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.M = +n[0], i + n[0].length) : -1;
	  }

	  function parseSeconds(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.S = +n[0], i + n[0].length) : -1;
	  }

	  function parseMilliseconds(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 3));
	    return n ? (d.L = +n[0], i + n[0].length) : -1;
	  }

	  function parseLiteralPercent(d, string, i) {
	    var n = percentRe.exec(string.slice(i, i + 1));
	    return n ? i + n[0].length : -1;
	  }

	  function formatDayOfMonth(d, p) {
	    return pad(d.getDate(), p, 2);
	  }

	  function formatHour24(d, p) {
	    return pad(d.getHours(), p, 2);
	  }

	  function formatHour12(d, p) {
	    return pad(d.getHours() % 12 || 12, p, 2);
	  }

	  function formatDayOfYear(d, p) {
	    return pad(1 + d3Time$$1.day.count(d3Time$$1.year(d), d), p, 3);
	  }

	  function formatMilliseconds(d, p) {
	    return pad(d.getMilliseconds(), p, 3);
	  }

	  function formatMonthNumber(d, p) {
	    return pad(d.getMonth() + 1, p, 2);
	  }

	  function formatMinutes(d, p) {
	    return pad(d.getMinutes(), p, 2);
	  }

	  function formatSeconds(d, p) {
	    return pad(d.getSeconds(), p, 2);
	  }

	  function formatWeekNumberSunday(d, p) {
	    return pad(d3Time$$1.sunday.count(d3Time$$1.year(d), d), p, 2);
	  }

	  function formatWeekdayNumber(d) {
	    return d.getDay();
	  }

	  function formatWeekNumberMonday(d, p) {
	    return pad(d3Time$$1.monday.count(d3Time$$1.year(d), d), p, 2);
	  }

	  function formatYear(d, p) {
	    return pad(d.getFullYear() % 100, p, 2);
	  }

	  function formatFullYear(d, p) {
	    return pad(d.getFullYear() % 10000, p, 4);
	  }

	  function formatZone(d) {
	    var z = d.getTimezoneOffset();
	    return (z > 0 ? "-" : (z *= -1, "+"))
	        + pad(z / 60 | 0, "0", 2)
	        + pad(z % 60, "0", 2);
	  }

	  function formatUTCDayOfMonth(d, p) {
	    return pad(d.getUTCDate(), p, 2);
	  }

	  function formatUTCHour24(d, p) {
	    return pad(d.getUTCHours(), p, 2);
	  }

	  function formatUTCHour12(d, p) {
	    return pad(d.getUTCHours() % 12 || 12, p, 2);
	  }

	  function formatUTCDayOfYear(d, p) {
	    return pad(1 + d3Time$$1.utcDay.count(d3Time$$1.utcYear(d), d), p, 3);
	  }

	  function formatUTCMilliseconds(d, p) {
	    return pad(d.getUTCMilliseconds(), p, 3);
	  }

	  function formatUTCMonthNumber(d, p) {
	    return pad(d.getUTCMonth() + 1, p, 2);
	  }

	  function formatUTCMinutes(d, p) {
	    return pad(d.getUTCMinutes(), p, 2);
	  }

	  function formatUTCSeconds(d, p) {
	    return pad(d.getUTCSeconds(), p, 2);
	  }

	  function formatUTCWeekNumberSunday(d, p) {
	    return pad(d3Time$$1.utcSunday.count(d3Time$$1.utcYear(d), d), p, 2);
	  }

	  function formatUTCWeekdayNumber(d) {
	    return d.getUTCDay();
	  }

	  function formatUTCWeekNumberMonday(d, p) {
	    return pad(d3Time$$1.utcMonday.count(d3Time$$1.utcYear(d), d), p, 2);
	  }

	  function formatUTCYear(d, p) {
	    return pad(d.getUTCFullYear() % 100, p, 2);
	  }

	  function formatUTCFullYear(d, p) {
	    return pad(d.getUTCFullYear() % 10000, p, 4);
	  }

	  function formatUTCZone() {
	    return "+0000";
	  }

	  function formatLiteralPercent() {
	    return "%";
	  }

	  var locale = locale$1({
	    dateTime: "%a %b %e %X %Y",
	    date: "%m/%d/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	  });

	  var caES = locale$1({
	    dateTime: "%A, %e de %B de %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
	    shortDays: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
	    months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
	    shortMonths: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."]
	  });

	  var deCH = locale$1({
	    dateTime: "%A, der %e. %B %Y, %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	    shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	    shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
	  });

	  var deDE = locale$1({
	    dateTime: "%A, der %e. %B %Y, %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	    shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	    shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
	  });

	  var enCA = locale$1({
	    dateTime: "%a %b %e %X %Y",
	    date: "%Y-%m-%d",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	  });

	  var enGB = locale$1({
	    dateTime: "%a %e %b %X %Y",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	  });

	  var esES = locale$1({
	    dateTime: "%A, %e de %B de %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
	    shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
	    months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
	    shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
	  });

	  var fiFI = locale$1({
	    dateTime: "%A, %-d. %Bta %Y klo %X",
	    date: "%-d.%-m.%Y",
	    time: "%H:%M:%S",
	    periods: ["a.m.", "p.m."],
	    days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
	    shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
	    months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
	    shortMonths: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"]
	  });

	  var frCA = locale$1({
	    dateTime: "%a %e %b %Y %X",
	    date: "%Y-%m-%d",
	    time: "%H:%M:%S",
	    periods: ["", ""],
	    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
	    shortDays: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
	    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	    shortMonths: ["jan", "fév", "mar", "avr", "mai", "jui", "jul", "aoû", "sep", "oct", "nov", "déc"]
	  });

	  var frFR = locale$1({
	    dateTime: "%A, le %e %B %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
	    shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
	    months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	    shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
	  });

	  var heIL = locale$1({
	    dateTime: "%A, %e ב%B %Y %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
	    shortDays: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
	    months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
	    shortMonths: ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"]
	  });

	  var huHU = locale$1({
	    dateTime: "%Y. %B %-e., %A %X",
	    date: "%Y. %m. %d.",
	    time: "%H:%M:%S",
	    periods: ["de.", "du."], // unused
	    days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
	    shortDays: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
	    months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
	    shortMonths: ["jan.", "feb.", "már.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."]
	  });

	  var itIT = locale$1({
	    dateTime: "%A %e %B %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
	    shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
	    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
	    shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
	  });

	  var jaJP = locale$1({
	    dateTime: "%Y %b %e %a %X",
	    date: "%Y/%m/%d",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
	    shortDays: ["日", "月", "火", "水", "木", "金", "土"],
	    months: ["睦月", "如月", "弥生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走"],
	    shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	  });

	  var koKR = locale$1({
	    dateTime: "%Y/%m/%d %a %X",
	    date: "%Y/%m/%d",
	    time: "%H:%M:%S",
	    periods: ["오전", "오후"],
	    days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
	    shortDays: ["일", "월", "화", "수", "목", "금", "토"],
	    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
	    shortMonths: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
	  });

	  var mkMK = locale$1({
	    dateTime: "%A, %e %B %Y г. %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
	    shortDays: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
	    months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
	    shortMonths: ["јан", "фев", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "ное", "дек"]
	  });

	  var nlNL = locale$1({
	    dateTime: "%a %e %B %Y %T",
	    date: "%d-%m-%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
	    shortDays: ["zo", "ma", "di", "wo", "do", "vr", "za"],
	    months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
	    shortMonths: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
	  });

	  var plPL = locale$1({
	    dateTime: "%A, %e %B %Y, %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"], // unused
	    days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
	    shortDays: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
	    months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
	    shortMonths: ["Stycz.", "Luty", "Marz.", "Kwie.", "Maj", "Czerw.", "Lipc.", "Sierp.", "Wrz.", "Paźdz.", "Listop.", "Grudz."]/* In Polish language abbraviated months are not commonly used so there is a dispute about the proper abbraviations. */
	  });

	  var ptBR = locale$1({
	    dateTime: "%A, %e de %B de %Y. %X",
	    date: "%d/%m/%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
	    shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
	    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	    shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
	  });

	  var ruRU = locale$1({
	    dateTime: "%A, %e %B %Y г. %X",
	    date: "%d.%m.%Y",
	    time: "%H:%M:%S",
	    periods: ["AM", "PM"],
	    days: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
	    shortDays: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
	    months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
	    shortMonths: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
	  });

	  var svSE = locale$1({
	    dateTime: "%A den %d %B %Y %X",
	    date: "%Y-%m-%d",
	    time: "%H:%M:%S",
	    periods: ["fm", "em"],
	    days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
	    shortDays: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
	    months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
	  });

	  var zhCN = locale$1({
	    dateTime: "%a %b %e %X %Y",
	    date: "%Y/%-m/%-d",
	    time: "%H:%M:%S",
	    periods: ["上午", "下午"],
	    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	    shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	    shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
	  });

	  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

	  function formatIsoNative(date) {
	    return date.toISOString();
	  }

	  formatIsoNative.parse = function(string) {
	    var date = new Date(string);
	    return isNaN(date) ? null : date;
	  };

	  formatIsoNative.toString = function() {
	    return isoSpecifier;
	  };

	  var formatIso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z")
	      ? formatIsoNative
	      : locale.utcFormat(isoSpecifier);

	  var format = locale.format;
	  var utcFormat = locale.utcFormat;

	  var version = "0.2.1";

	  exports.version = version;
	  exports.format = format;
	  exports.utcFormat = utcFormat;
	  exports.locale = locale$1;
	  exports.localeCaEs = caES;
	  exports.localeDeCh = deCH;
	  exports.localeDeDe = deDE;
	  exports.localeEnCa = enCA;
	  exports.localeEnGb = enGB;
	  exports.localeEnUs = locale;
	  exports.localeEsEs = esES;
	  exports.localeFiFi = fiFI;
	  exports.localeFrCa = frCA;
	  exports.localeFrFr = frFR;
	  exports.localeHeIl = heIL;
	  exports.localeHuHu = huHU;
	  exports.localeItIt = itIT;
	  exports.localeJaJp = jaJP;
	  exports.localeKoKr = koKR;
	  exports.localeMkMk = mkMK;
	  exports.localeNlNl = nlNL;
	  exports.localePlPl = plPL;
	  exports.localePtBr = ptBR;
	  exports.localeRuRu = ruRU;
	  exports.localeSvSe = svSE;
	  exports.localeZhCn = zhCN;
	  exports.isoFormat = formatIso;

	}));
	});

	var d3Format = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  factory(exports);
	}(commonjsGlobal, function (exports) {
	  // Computes the decimal coefficient and exponent of the specified number x with
	  // significant digits p, where x is positive and p is in [1, 21] or undefined.
	  // For example, formatDecimal(1.23) returns ["123", 0].
	  function formatDecimal(x, p) {
	    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
	    var i, coefficient = x.slice(0, i);

	    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
	    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
	    return [
	      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
	      +x.slice(i + 1)
	    ];
	  }
	  function exponent(x) {
	    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
	  }
	  function formatGroup(grouping, thousands) {
	    return function(value, width) {
	      var i = value.length,
	          t = [],
	          j = 0,
	          g = grouping[0],
	          length = 0;

	      while (i > 0 && g > 0) {
	        if (length + g + 1 > width) g = Math.max(1, width - length);
	        t.push(value.substring(i -= g, i + g));
	        if ((length += g + 1) > width) break;
	        g = grouping[j = (j + 1) % grouping.length];
	      }

	      return t.reverse().join(thousands);
	    };
	  }
	  var prefixExponent;

	  function formatPrefixAuto(x, p) {
	    var d = formatDecimal(x, p);
	    if (!d) return x + "";
	    var coefficient = d[0],
	        exponent = d[1],
	        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
	        n = coefficient.length;
	    return i === n ? coefficient
	        : i > n ? coefficient + new Array(i - n + 1).join("0")
	        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
	        : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
	  }
	  function formatRounded(x, p) {
	    var d = formatDecimal(x, p);
	    if (!d) return x + "";
	    var coefficient = d[0],
	        exponent = d[1];
	    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
	        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
	        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	  }
	  function formatDefault(x, p) {
	    x = x.toPrecision(p);

	    out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
	      switch (x[i]) {
	        case ".": i0 = i1 = i; break;
	        case "0": if (i0 === 0) i0 = i; i1 = i; break;
	        case "e": break out;
	        default: if (i0 > 0) i0 = 0; break;
	      }
	    }

	    return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
	  }
	  var formatTypes = {
	    "": formatDefault,
	    "%": function(x, p) { return (x * 100).toFixed(p); },
	    "b": function(x) { return Math.round(x).toString(2); },
	    "c": function(x) { return x + ""; },
	    "d": function(x) { return Math.round(x).toString(10); },
	    "e": function(x, p) { return x.toExponential(p); },
	    "f": function(x, p) { return x.toFixed(p); },
	    "g": function(x, p) { return x.toPrecision(p); },
	    "o": function(x) { return Math.round(x).toString(8); },
	    "p": function(x, p) { return formatRounded(x * 100, p); },
	    "r": formatRounded,
	    "s": formatPrefixAuto,
	    "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
	    "x": function(x) { return Math.round(x).toString(16); }
	  };

	  // [[fill]align][sign][symbol][0][width][,][.precision][type]
	  var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

	  function formatSpecifier(specifier) {
	    return new FormatSpecifier(specifier);
	  }
	  function FormatSpecifier(specifier) {
	    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);

	    var match,
	        fill = match[1] || " ",
	        align = match[2] || ">",
	        sign = match[3] || "-",
	        symbol = match[4] || "",
	        zero = !!match[5],
	        width = match[6] && +match[6],
	        comma = !!match[7],
	        precision = match[8] && +match[8].slice(1),
	        type = match[9] || "";

	    // The "n" type is an alias for ",g".
	    if (type === "n") comma = true, type = "g";

	    // Map invalid types to the default format.
	    else if (!formatTypes[type]) type = "";

	    // If zero fill is specified, padding goes after sign and before digits.
	    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

	    this.fill = fill;
	    this.align = align;
	    this.sign = sign;
	    this.symbol = symbol;
	    this.zero = zero;
	    this.width = width;
	    this.comma = comma;
	    this.precision = precision;
	    this.type = type;
	  }

	  FormatSpecifier.prototype.toString = function() {
	    return this.fill
	        + this.align
	        + this.sign
	        + this.symbol
	        + (this.zero ? "0" : "")
	        + (this.width == null ? "" : Math.max(1, this.width | 0))
	        + (this.comma ? "," : "")
	        + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
	        + this.type;
	  };

	  var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

	  function identity(x) {
	    return x;
	  }

	  function locale(locale) {
	    var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
	        currency = locale.currency,
	        decimal = locale.decimal;

	    function format(specifier) {
	      specifier = formatSpecifier(specifier);

	      var fill = specifier.fill,
	          align = specifier.align,
	          sign = specifier.sign,
	          symbol = specifier.symbol,
	          zero = specifier.zero,
	          width = specifier.width,
	          comma = specifier.comma,
	          precision = specifier.precision,
	          type = specifier.type;

	      // Compute the prefix and suffix.
	      // For SI-prefix, the suffix is lazily computed.
	      var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
	          suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? "%" : "";

	      // What format function should we use?
	      // Is this an integer type?
	      // Can this type generate exponential notation?
	      var formatType = formatTypes[type],
	          maybeSuffix = !type || /[defgprs%]/.test(type);

	      // Set the default precision if not specified,
	      // or clamp the specified precision to the supported range.
	      // For significant precision, it must be in [1, 21].
	      // For fixed precision, it must be in [0, 20].
	      precision = precision == null ? (type ? 6 : 12)
	          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
	          : Math.max(0, Math.min(20, precision));

	      return function(value) {
	        var valuePrefix = prefix,
	            valueSuffix = suffix;

	        if (type === "c") {
	          valueSuffix = formatType(value) + valueSuffix;
	          value = "";
	        } else {
	          value = +value;

	          // Convert negative to positive, and compute the prefix.
	          // Note that -0 is not less than 0, but 1 / -0 is!
	          var valueNegative = (value < 0 || 1 / value < 0) && (value *= -1, true);

	          // Perform the initial formatting.
	          value = formatType(value, precision);

	          // If the original value was negative, it may be rounded to zero during
	          // formatting; treat this as (positive) zero.
	          if (valueNegative) {
	            var i = -1, n = value.length, c;
	            valueNegative = false;
	            while (++i < n) {
	              if (c = value.charCodeAt(i), (48 < c && c < 58)
	                  || (type === "x" && 96 < c && c < 103)
	                  || (type === "X" && 64 < c && c < 71)) {
	                valueNegative = true;
	                break;
	              }
	            }
	          }

	          // Compute the prefix and suffix.
	          valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
	          valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

	          // Break the formatted value into the integer “value” part that can be
	          // grouped, and fractional or exponential “suffix” part that is not.
	          if (maybeSuffix) {
	            var i = -1, n = value.length, c;
	            while (++i < n) {
	              if (c = value.charCodeAt(i), 48 > c || c > 57) {
	                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
	                value = value.slice(0, i);
	                break;
	              }
	            }
	          }
	        }

	        // If the fill character is not "0", grouping is applied before padding.
	        if (comma && !zero) value = group(value, Infinity);

	        // Compute the padding.
	        var length = valuePrefix.length + value.length + valueSuffix.length,
	            padding = length < width ? new Array(width - length + 1).join(fill) : "";

	        // If the fill character is "0", grouping is applied after padding.
	        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

	        // Reconstruct the final output based on the desired alignment.
	        switch (align) {
	          case "<": return valuePrefix + value + valueSuffix + padding;
	          case "=": return valuePrefix + padding + value + valueSuffix;
	          case "^": return padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
	        }
	        return padding + valuePrefix + value + valueSuffix;
	      };
	    }

	    function formatPrefix(specifier, value) {
	      var f = format((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
	          k = Math.pow(10, -e),
	          prefix = prefixes[8 + e / 3];
	      return function(value) {
	        return f(k * value) + prefix;
	      };
	    }

	    return {
	      format: format,
	      formatPrefix: formatPrefix
	    };
	  }
	  var defaultLocale = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["$", ""]
	  });

	  var caES = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });

	  var csCZ = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "\xa0Kč"],
	  });

	  var deCH = locale({
	    decimal: ",",
	    thousands: "'",
	    grouping: [3],
	    currency: ["", "\xa0CHF"]
	  });

	  var deDE = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });

	  var enCA = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["$", ""]
	  });

	  var enGB = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["£", ""]
	  });

	  var esES = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });

	  var fiFI = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });

	  var frCA = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "$"]
	  });

	  var frFR = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0€"]
	  });

	  var heIL = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["₪", ""]
	  });

	  var huHU = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "\xa0Ft"]
	  });

	  var itIT = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["€", ""]
	  });

	  var jaJP = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["", "円"]
	  });

	  var koKR = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["₩", ""]
	  });

	  var mkMK = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "\xa0ден."]
	  });

	  var nlNL = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["€\xa0", ""]
	  });

	  var plPL = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["", "zł"]
	  });

	  var ptBR = locale({
	    decimal: ",",
	    thousands: ".",
	    grouping: [3],
	    currency: ["R$", ""]
	  });

	  var ruRU = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "\xa0руб."]
	  });

	  var svSE = locale({
	    decimal: ",",
	    thousands: "\xa0",
	    grouping: [3],
	    currency: ["", "SEK"]
	  });

	  var zhCN = locale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["¥", ""]
	  });

	  function precisionFixed(step) {
	    return Math.max(0, -exponent(Math.abs(step)));
	  }
	  function precisionPrefix(step, value) {
	    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
	  }
	  function precisionRound(step, max) {
	    step = Math.abs(step), max = Math.abs(max) - step;
	    return Math.max(0, exponent(max) - exponent(step)) + 1;
	  }
	  var format = defaultLocale.format;
	  var formatPrefix = defaultLocale.formatPrefix;

	  var version = "0.4.2";

	  exports.version = version;
	  exports.format = format;
	  exports.formatPrefix = formatPrefix;
	  exports.locale = locale;
	  exports.localeCaEs = caES;
	  exports.localeCsCz = csCZ;
	  exports.localeDeCh = deCH;
	  exports.localeDeDe = deDE;
	  exports.localeEnCa = enCA;
	  exports.localeEnGb = enGB;
	  exports.localeEnUs = defaultLocale;
	  exports.localeEsEs = esES;
	  exports.localeFiFi = fiFI;
	  exports.localeFrCa = frCA;
	  exports.localeFrFr = frFR;
	  exports.localeHeIl = heIL;
	  exports.localeHuHu = huHU;
	  exports.localeItIt = itIT;
	  exports.localeJaJp = jaJP;
	  exports.localeKoKr = koKR;
	  exports.localeMkMk = mkMK;
	  exports.localeNlNl = nlNL;
	  exports.localePlPl = plPL;
	  exports.localePtBr = ptBR;
	  exports.localeRuRu = ruRU;
	  exports.localeSvSe = svSE;
	  exports.localeZhCn = zhCN;
	  exports.formatSpecifier = formatSpecifier;
	  exports.precisionFixed = precisionFixed;
	  exports.precisionPrefix = precisionPrefix;
	  exports.precisionRound = precisionRound;

	}));
	});

	var numberF = d3Format, // defaults to EN-US
	    timeF = d3TimeFormat,     // defaults to EN-US
	    tmpDate = new Date(2000, 0, 1),
	    monthFull, monthAbbr, dayFull, dayAbbr;


	var format = {
	  // Update number formatter to use provided locale configuration.
	  // For more see https://github.com/d3/d3-format
	  numberLocale: numberLocale,
	  number:       function(f) { return numberF.format(f); },
	  numberPrefix: function(f, v) { return numberF.formatPrefix(f, v); },

	  // Update time formatter to use provided locale configuration.
	  // For more see https://github.com/d3/d3-time-format
	  timeLocale:   timeLocale,
	  time:         function(f) { return timeF.format(f); },
	  utc:          function(f) { return timeF.utcFormat(f); },

	  // Set number and time locale simultaneously.
	  locale:       function(l) { numberLocale(l); timeLocale(l); },

	  // automatic formatting functions
	  auto: {
	    number:   autoNumberFormat,
	    linear:   linearNumberFormat,
	    time:     function() { return timeAutoFormat(); },
	    utc:      function() { return utcAutoFormat(); }
	  },

	  month:      monthFormat,      // format month name from integer code
	  day:        dayFormat,        // format week day name from integer code
	  quarter:    quarterFormat,    // format quarter name from timestamp
	  utcQuarter: utcQuarterFormat  // format quarter name from utc timestamp
	};

	// -- Locales ----

	// transform 'en-US' style locale string to match d3-format v0.4+ convention
	function localeRef(l) {
	  return l.length > 4 && 'locale' + (
	    l[0].toUpperCase() + l[1].toLowerCase() +
	    l[3].toUpperCase() + l[4].toLowerCase()
	  );
	}

	function numberLocale(l) {
	  var f = util.isString(l) ? d3Format[localeRef(l)] : d3Format.locale(l);
	  if (f == null) throw Error('Unrecognized locale: ' + l);
	  numberF = f;
	}

	function timeLocale(l) {
	  var f = util.isString(l) ? d3TimeFormat[localeRef(l)] : d3TimeFormat.locale(l);
	  if (f == null) throw Error('Unrecognized locale: ' + l);
	  timeF = f;
	  monthFull = monthAbbr = dayFull = dayAbbr = null;
	}

	// -- Number Formatting ----

	var e10 = Math.sqrt(50),
	    e5 = Math.sqrt(10),
	    e2 = Math.sqrt(2);

	function linearRange(domain, count) {
	  if (!domain.length) domain = [0];
	  if (count == null) count = 10;

	  var start = domain[0],
	      stop = domain[domain.length - 1];

	  if (stop < start) { error = stop; stop = start; start = error; }

	  var span = (stop - start) || (count = 1, start || stop || 1),
	      step = Math.pow(10, Math.floor(Math.log(span / count) / Math.LN10)),
	      error = span / count / step;

	  // Filter ticks to get closer to the desired count.
	  if (error >= e10) step *= 10;
	  else if (error >= e5) step *= 5;
	  else if (error >= e2) step *= 2;

	  // Round start and stop values to step interval.
	  return [
	    Math.ceil(start / step) * step,
	    Math.floor(stop / step) * step + step / 2, // inclusive
	    step
	  ];
	}

	function trimZero(f, decimal) {
	  return function(x) {
	    var s = f(x),
	        n = s.indexOf(decimal);
	    if (n < 0) return s;

	    var idx = rightmostDigit(s, n),
	        end = idx < s.length ? s.slice(idx) : '';

	    while (--idx > n) {
	      if (s[idx] !== '0') { ++idx; break; }
	    }
	    return s.slice(0, idx) + end;
	  };
	}

	function rightmostDigit(s, n) {
	  var i = s.lastIndexOf('e'), c;
	  if (i > 0) return i;
	  for (i=s.length; --i > n;) {
	    c = s.charCodeAt(i);
	    if (c >= 48 && c <= 57) return i+1; // is digit
	  }
	}

	function autoNumberFormat(f) {
	  var decimal = numberF.format('.1f')(1)[1]; // get decimal char
	  if (f == null) f = ',';
	  f = d3Format.formatSpecifier(f);
	  if (f.precision == null) f.precision = 12;
	  switch (f.type) {
	    case '%': f.precision -= 2; break;
	    case 'e': f.precision -= 1; break;
	  }
	  return trimZero(numberF.format(f), decimal);
	}

	function linearNumberFormat(domain, count, f) {
	  var range = linearRange(domain, count);

	  if (f == null) f = ',f';

	  switch (f = d3Format.formatSpecifier(f), f.type) {
	    case 's': {
	      var value = Math.max(Math.abs(range[0]), Math.abs(range[1]));
	      if (f.precision == null) f.precision = d3Format.precisionPrefix(range[2], value);
	      return numberF.formatPrefix(f, value);
	    }
	    case '':
	    case 'e':
	    case 'g':
	    case 'p':
	    case 'r': {
	      if (f.precision == null) f.precision = d3Format.precisionRound(range[2], Math.max(Math.abs(range[0]), Math.abs(range[1]))) - (f.type === 'e');
	      break;
	    }
	    case 'f':
	    case '%': {
	      if (f.precision == null) f.precision = d3Format.precisionFixed(range[2]) - 2 * (f.type === '%');
	      break;
	    }
	  }
	  return numberF.format(f);
	}

	// -- Datetime Formatting ----

	function timeAutoFormat() {
	  var f = timeF.format,
	      formatMillisecond = f('.%L'),
	      formatSecond = f(':%S'),
	      formatMinute = f('%I:%M'),
	      formatHour = f('%I %p'),
	      formatDay = f('%a %d'),
	      formatWeek = f('%b %d'),
	      formatMonth = f('%B'),
	      formatYear = f('%Y');

	  return function(date) {
	    var d = +date;
	    return (d3Time.second(date) < d ? formatMillisecond
	        : d3Time.minute(date) < d ? formatSecond
	        : d3Time.hour(date) < d ? formatMinute
	        : d3Time.day(date) < d ? formatHour
	        : d3Time.month(date) < d ?
	          (d3Time.week(date) < d ? formatDay : formatWeek)
	        : d3Time.year(date) < d ? formatMonth
	        : formatYear)(date);
	  };
	}

	function utcAutoFormat() {
	  var f = timeF.utcFormat,
	      formatMillisecond = f('.%L'),
	      formatSecond = f(':%S'),
	      formatMinute = f('%I:%M'),
	      formatHour = f('%I %p'),
	      formatDay = f('%a %d'),
	      formatWeek = f('%b %d'),
	      formatMonth = f('%B'),
	      formatYear = f('%Y');

	  return function(date) {
	    var d = +date;
	    return (d3Time.utcSecond(date) < d ? formatMillisecond
	        : d3Time.utcMinute(date) < d ? formatSecond
	        : d3Time.utcHour(date) < d ? formatMinute
	        : d3Time.utcDay(date) < d ? formatHour
	        : d3Time.utcMonth(date) < d ?
	          (d3Time.utcWeek(date) < d ? formatDay : formatWeek)
	        : d3Time.utcYear(date) < d ? formatMonth
	        : formatYear)(date);
	  };
	}

	function monthFormat(month, abbreviate) {
	  var f = abbreviate ?
	    (monthAbbr || (monthAbbr = timeF.format('%b'))) :
	    (monthFull || (monthFull = timeF.format('%B')));
	  return (tmpDate.setMonth(month), f(tmpDate));
	}

	function dayFormat(day, abbreviate) {
	  var f = abbreviate ?
	    (dayAbbr || (dayAbbr = timeF.format('%a'))) :
	    (dayFull || (dayFull = timeF.format('%A')));
	  return (tmpDate.setMonth(0), tmpDate.setDate(2 + day), f(tmpDate));
	}

	function quarterFormat(date) {
	  return Math.floor(date.getMonth() / 3) + 1;
	}

	function utcQuarterFormat(date) {
	  return Math.floor(date.getUTCMonth() / 3) + 1;
	}

	var timeF$1 = format.time;

	function read(data, format$$1) {
	  var type = (format$$1 && format$$1.type) || 'json';
	  data = formats[type](data, format$$1);
	  if (format$$1 && format$$1.parse) parse(data, format$$1.parse);
	  return data;
	}

	function parse(data, types) {
	  var cols, parsers, d, i, j, clen, len = data.length;

	  types = (types==='auto') ? type_1.inferAll(data) : util.duplicate(types);
	  cols = util.keys(types);
	  parsers = cols.map(function(c) {
	    var t = types[c];
	    if (t && t.indexOf('date:') === 0) {
	      var parts = t.split(/:(.+)?/, 2),  // split on first :
	          pattern = parts[1];
	      if ((pattern[0] === '\'' && pattern[pattern.length-1] === '\'') ||
	          (pattern[0] === '"'  && pattern[pattern.length-1] === '"')) {
	        pattern = pattern.slice(1, -1);
	      } else {
	        throw Error('Format pattern must be quoted: ' + pattern);
	      }
	      pattern = timeF$1(pattern);
	      return function(v) { return pattern.parse(v); };
	    }
	    if (!type_1.parsers[t]) {
	      throw Error('Illegal format pattern: ' + c + ':' + t);
	    }
	    return type_1.parsers[t];
	  });

	  for (i=0, clen=cols.length; i<len; ++i) {
	    d = data[i];
	    for (j=0; j<clen; ++j) {
	      d[cols[j]] = parsers[j](d[cols[j]]);
	    }
	  }
	  type_1.annotation(data, types);
	}

	read.formats = formats;
	var read_1 = read;

	var generate = createCommonjsModule(function (module) {
	var gen = module.exports;

	gen.repeat = function(val, n) {
	  var a = Array(n), i;
	  for (i=0; i<n; ++i) a[i] = val;
	  return a;
	};

	gen.zeros = function(n) {
	  return gen.repeat(0, n);
	};

	gen.range = function(start, stop, step) {
	  if (arguments.length < 3) {
	    step = 1;
	    if (arguments.length < 2) {
	      stop = start;
	      start = 0;
	    }
	  }
	  if ((stop - start) / step == Infinity) throw new Error('Infinite range');
	  var range = [], i = -1, j;
	  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j);
	  else while ((j = start + step * ++i) < stop) range.push(j);
	  return range;
	};

	gen.random = {};

	gen.random.uniform = function(min, max) {
	  if (max === undefined) {
	    max = min === undefined ? 1 : min;
	    min = 0;
	  }
	  var d = max - min;
	  var f = function() {
	    return min + d * Math.random();
	  };
	  f.samples = function(n) {
	    return gen.zeros(n).map(f);
	  };
	  f.pdf = function(x) {
	    return (x >= min && x <= max) ? 1/d : 0;
	  };
	  f.cdf = function(x) {
	    return x < min ? 0 : x > max ? 1 : (x - min) / d;
	  };
	  f.icdf = function(p) {
	    return (p >= 0 && p <= 1) ? min + p*d : NaN;
	  };
	  return f;
	};

	gen.random.integer = function(a, b) {
	  if (b === undefined) {
	    b = a;
	    a = 0;
	  }
	  var d = b - a;
	  var f = function() {
	    return a + Math.floor(d * Math.random());
	  };
	  f.samples = function(n) {
	    return gen.zeros(n).map(f);
	  };
	  f.pdf = function(x) {
	    return (x === Math.floor(x) && x >= a && x < b) ? 1/d : 0;
	  };
	  f.cdf = function(x) {
	    var v = Math.floor(x);
	    return v < a ? 0 : v >= b ? 1 : (v - a + 1) / d;
	  };
	  f.icdf = function(p) {
	    return (p >= 0 && p <= 1) ? a - 1 + Math.floor(p*d) : NaN;
	  };
	  return f;
	};

	gen.random.normal = function(mean, stdev) {
	  mean = mean || 0;
	  stdev = stdev || 1;
	  var next;
	  var f = function() {
	    var x = 0, y = 0, rds, c;
	    if (next !== undefined) {
	      x = next;
	      next = undefined;
	      return x;
	    }
	    do {
	      x = Math.random()*2-1;
	      y = Math.random()*2-1;
	      rds = x*x + y*y;
	    } while (rds === 0 || rds > 1);
	    c = Math.sqrt(-2*Math.log(rds)/rds); // Box-Muller transform
	    next = mean + y*c*stdev;
	    return mean + x*c*stdev;
	  };
	  f.samples = function(n) {
	    return gen.zeros(n).map(f);
	  };
	  f.pdf = function(x) {
	    var exp = Math.exp(Math.pow(x-mean, 2) / (-2 * Math.pow(stdev, 2)));
	    return (1 / (stdev * Math.sqrt(2*Math.PI))) * exp;
	  };
	  f.cdf = function(x) {
	    // Approximation from West (2009)
	    // Better Approximations to Cumulative Normal Functions
	    var cd,
	        z = (x - mean) / stdev,
	        Z = Math.abs(z);
	    if (Z > 37) {
	      cd = 0;
	    } else {
	      var sum, exp = Math.exp(-Z*Z/2);
	      if (Z < 7.07106781186547) {
	        sum = 3.52624965998911e-02 * Z + 0.700383064443688;
	        sum = sum * Z + 6.37396220353165;
	        sum = sum * Z + 33.912866078383;
	        sum = sum * Z + 112.079291497871;
	        sum = sum * Z + 221.213596169931;
	        sum = sum * Z + 220.206867912376;
	        cd = exp * sum;
	        sum = 8.83883476483184e-02 * Z + 1.75566716318264;
	        sum = sum * Z + 16.064177579207;
	        sum = sum * Z + 86.7807322029461;
	        sum = sum * Z + 296.564248779674;
	        sum = sum * Z + 637.333633378831;
	        sum = sum * Z + 793.826512519948;
	        sum = sum * Z + 440.413735824752;
	        cd = cd / sum;
	      } else {
	        sum = Z + 0.65;
	        sum = Z + 4 / sum;
	        sum = Z + 3 / sum;
	        sum = Z + 2 / sum;
	        sum = Z + 1 / sum;
	        cd = exp / sum / 2.506628274631;
	      }
	    }
	    return z > 0 ? 1 - cd : cd;
	  };
	  f.icdf = function(p) {
	    // Approximation of Probit function using inverse error function.
	    if (p <= 0 || p >= 1) return NaN;
	    var x = 2*p - 1,
	        v = (8 * (Math.PI - 3)) / (3 * Math.PI * (4-Math.PI)),
	        a = (2 / (Math.PI*v)) + (Math.log(1 - Math.pow(x,2)) / 2),
	        b = Math.log(1 - (x*x)) / v,
	        s = (x > 0 ? 1 : -1) * Math.sqrt(Math.sqrt((a*a) - b) - a);
	    return mean + stdev * Math.SQRT2 * s;
	  };
	  return f;
	};

	gen.random.bootstrap = function(domain, smooth) {
	  // Generates a bootstrap sample from a set of observations.
	  // Smooth bootstrapping adds random zero-centered noise to the samples.
	  var val = domain.filter(util.isValid),
	      len = val.length,
	      err = smooth ? gen.random.normal(0, smooth) : null;
	  var f = function() {
	    return val[~~(Math.random()*len)] + (err ? err() : 0);
	  };
	  f.samples = function(n) {
	    return gen.zeros(n).map(f);
	  };
	  return f;
	};
	});

	var stats_1 = createCommonjsModule(function (module) {
	var stats = module.exports;

	// Collect unique values.
	// Output: an array of unique values, in first-observed order
	stats.unique = function(values, f, results) {
	  f = util.$(f);
	  results = results || [];
	  var u = {}, v, i, n;
	  for (i=0, n=values.length; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (v in u) continue;
	    u[v] = 1;
	    results.push(v);
	  }
	  return results;
	};

	// Return the length of the input array.
	stats.count = function(values) {
	  return values && values.length || 0;
	};

	// Count the number of non-null, non-undefined, non-NaN values.
	stats.count.valid = function(values, f) {
	  f = util.$(f);
	  var v, i, n, valid = 0;
	  for (i=0, n=values.length; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) valid += 1;
	  }
	  return valid;
	};

	// Count the number of null or undefined values.
	stats.count.missing = function(values, f) {
	  f = util.$(f);
	  var v, i, n, count = 0;
	  for (i=0, n=values.length; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (v == null) count += 1;
	  }
	  return count;
	};

	// Count the number of distinct values.
	// Null, undefined and NaN are each considered distinct values.
	stats.count.distinct = function(values, f) {
	  f = util.$(f);
	  var u = {}, v, i, n, count = 0;
	  for (i=0, n=values.length; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (v in u) continue;
	    u[v] = 1;
	    count += 1;
	  }
	  return count;
	};

	// Construct a map from distinct values to occurrence counts.
	stats.count.map = function(values, f) {
	  f = util.$(f);
	  var map = {}, v, i, n;
	  for (i=0, n=values.length; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    map[v] = (v in map) ? map[v] + 1 : 1;
	  }
	  return map;
	};

	// Compute the median of an array of numbers.
	stats.median = function(values, f) {
	  if (f) values = values.map(util.$(f));
	  values = values.filter(util.isValid).sort(util.cmp);
	  return stats.quantile(values, 0.5);
	};

	// Computes the quartile boundaries of an array of numbers.
	stats.quartile = function(values, f) {
	  if (f) values = values.map(util.$(f));
	  values = values.filter(util.isValid).sort(util.cmp);
	  var q = stats.quantile;
	  return [q(values, 0.25), q(values, 0.50), q(values, 0.75)];
	};

	// Compute the quantile of a sorted array of numbers.
	// Adapted from the D3.js implementation.
	stats.quantile = function(values, f, p) {
	  if (p === undefined) { p = f; f = util.identity; }
	  f = util.$(f);
	  var H = (values.length - 1) * p + 1,
	      h = Math.floor(H),
	      v = +f(values[h - 1]),
	      e = H - h;
	  return e ? v + e * (f(values[h]) - v) : v;
	};

	// Compute the sum of an array of numbers.
	stats.sum = function(values, f) {
	  f = util.$(f);
	  for (var sum=0, i=0, n=values.length, v; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) sum += v;
	  }
	  return sum;
	};

	// Compute the mean (average) of an array of numbers.
	stats.mean = function(values, f) {
	  f = util.$(f);
	  var mean = 0, delta, i, n, c, v;
	  for (i=0, c=0, n=values.length; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) {
	      delta = v - mean;
	      mean = mean + delta / (++c);
	    }
	  }
	  return mean;
	};

	// Compute the geometric mean of an array of numbers.
	stats.mean.geometric = function(values, f) {
	  f = util.$(f);
	  var mean = 1, c, n, v, i;
	  for (i=0, c=0, n=values.length; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) {
	      if (v <= 0) {
	        throw Error("Geometric mean only defined for positive values.");
	      }
	      mean *= v;
	      ++c;
	    }
	  }
	  mean = c > 0 ? Math.pow(mean, 1/c) : 0;
	  return mean;
	};

	// Compute the harmonic mean of an array of numbers.
	stats.mean.harmonic = function(values, f) {
	  f = util.$(f);
	  var mean = 0, c, n, v, i;
	  for (i=0, c=0, n=values.length; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) {
	      mean += 1/v;
	      ++c;
	    }
	  }
	  return c / mean;
	};

	// Compute the sample variance of an array of numbers.
	stats.variance = function(values, f) {
	  f = util.$(f);
	  if (!util.isArray(values) || values.length < 2) return 0;
	  var mean = 0, M2 = 0, delta, i, c, v;
	  for (i=0, c=0; i<values.length; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) {
	      delta = v - mean;
	      mean = mean + delta / (++c);
	      M2 = M2 + delta * (v - mean);
	    }
	  }
	  M2 = M2 / (c - 1);
	  return M2;
	};

	// Compute the sample standard deviation of an array of numbers.
	stats.stdev = function(values, f) {
	  return Math.sqrt(stats.variance(values, f));
	};

	// Compute the Pearson mode skewness ((median-mean)/stdev) of an array of numbers.
	stats.modeskew = function(values, f) {
	  var avg = stats.mean(values, f),
	      med = stats.median(values, f),
	      std = stats.stdev(values, f);
	  return std === 0 ? 0 : (avg - med) / std;
	};

	// Find the minimum value in an array.
	stats.min = function(values, f) {
	  return stats.extent(values, f)[0];
	};

	// Find the maximum value in an array.
	stats.max = function(values, f) {
	  return stats.extent(values, f)[1];
	};

	// Find the minimum and maximum of an array of values.
	stats.extent = function(values, f) {
	  f = util.$(f);
	  var a, b, v, i, n = values.length;
	  for (i=0; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) { a = b = v; break; }
	  }
	  for (; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) {
	      if (v < a) a = v;
	      if (v > b) b = v;
	    }
	  }
	  return [a, b];
	};

	// Find the integer indices of the minimum and maximum values.
	stats.extent.index = function(values, f) {
	  f = util.$(f);
	  var x = -1, y = -1, a, b, v, i, n = values.length;
	  for (i=0; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) { a = b = v; x = y = i; break; }
	  }
	  for (; i<n; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) {
	      if (v < a) { a = v; x = i; }
	      if (v > b) { b = v; y = i; }
	    }
	  }
	  return [x, y];
	};

	// Compute the dot product of two arrays of numbers.
	stats.dot = function(values, a, b) {
	  var sum = 0, i, v;
	  if (!b) {
	    if (values.length !== a.length) {
	      throw Error('Array lengths must match.');
	    }
	    for (i=0; i<values.length; ++i) {
	      v = values[i] * a[i];
	      if (v === v) sum += v;
	    }
	  } else {
	    a = util.$(a);
	    b = util.$(b);
	    for (i=0; i<values.length; ++i) {
	      v = a(values[i]) * b(values[i]);
	      if (v === v) sum += v;
	    }
	  }
	  return sum;
	};

	// Compute the vector distance between two arrays of numbers.
	// Default is Euclidean (exp=2) distance, configurable via exp argument.
	stats.dist = function(values, a, b, exp) {
	  var f = util.isFunction(b) || util.isString(b),
	      X = values,
	      Y = f ? values : a,
	      e = f ? exp : b,
	      L2 = e === 2 || e == null,
	      n = values.length, s = 0, d, i;
	  if (f) {
	    a = util.$(a);
	    b = util.$(b);
	  }
	  for (i=0; i<n; ++i) {
	    d = f ? (a(X[i])-b(Y[i])) : (X[i]-Y[i]);
	    s += L2 ? d*d : Math.pow(Math.abs(d), e);
	  }
	  return L2 ? Math.sqrt(s) : Math.pow(s, 1/e);
	};

	// Compute the Cohen's d effect size between two arrays of numbers.
	stats.cohensd = function(values, a, b) {
	  var X = b ? values.map(util.$(a)) : values,
	      Y = b ? values.map(util.$(b)) : a,
	      x1 = stats.mean(X),
	      x2 = stats.mean(Y),
	      n1 = stats.count.valid(X),
	      n2 = stats.count.valid(Y);

	  if ((n1+n2-2) <= 0) {
	    // if both arrays are size 1, or one is empty, there's no effect size
	    return 0;
	  }
	  // pool standard deviation
	  var s1 = stats.variance(X),
	      s2 = stats.variance(Y),
	      s = Math.sqrt((((n1-1)*s1) + ((n2-1)*s2)) / (n1+n2-2));
	  // if there is no variance, there's no effect size
	  return s===0 ? 0 : (x1 - x2) / s;
	};

	// Computes the covariance between two arrays of numbers
	stats.covariance = function(values, a, b) {
	  var X = b ? values.map(util.$(a)) : values,
	      Y = b ? values.map(util.$(b)) : a,
	      n = X.length,
	      xm = stats.mean(X),
	      ym = stats.mean(Y),
	      sum = 0, c = 0, i, x, y, vx, vy;

	  if (n !== Y.length) {
	    throw Error('Input lengths must match.');
	  }

	  for (i=0; i<n; ++i) {
	    x = X[i]; vx = util.isValid(x);
	    y = Y[i]; vy = util.isValid(y);
	    if (vx && vy) {
	      sum += (x-xm) * (y-ym);
	      ++c;
	    } else if (vx || vy) {
	      throw Error('Valid values must align.');
	    }
	  }
	  return sum / (c-1);
	};

	// Compute ascending rank scores for an array of values.
	// Ties are assigned their collective mean rank.
	stats.rank = function(values, f) {
	  f = util.$(f) || util.identity;
	  var a = values.map(function(v, i) {
	      return {idx: i, val: f(v)};
	    })
	    .sort(util.comparator('val'));

	  var n = values.length,
	      r = Array(n),
	      tie = -1, p = {}, i, v, mu;

	  for (i=0; i<n; ++i) {
	    v = a[i].val;
	    if (tie < 0 && p === v) {
	      tie = i - 1;
	    } else if (tie > -1 && p !== v) {
	      mu = 1 + (i-1 + tie) / 2;
	      for (; tie<i; ++tie) r[a[tie].idx] = mu;
	      tie = -1;
	    }
	    r[a[i].idx] = i + 1;
	    p = v;
	  }

	  if (tie > -1) {
	    mu = 1 + (n-1 + tie) / 2;
	    for (; tie<n; ++tie) r[a[tie].idx] = mu;
	  }

	  return r;
	};

	// Compute the sample Pearson product-moment correlation of two arrays of numbers.
	stats.cor = function(values, a, b) {
	  var fn = b;
	  b = fn ? values.map(util.$(b)) : a;
	  a = fn ? values.map(util.$(a)) : values;

	  var dot = stats.dot(a, b),
	      mua = stats.mean(a),
	      mub = stats.mean(b),
	      sda = stats.stdev(a),
	      sdb = stats.stdev(b),
	      n = values.length;

	  return (dot - n*mua*mub) / ((n-1) * sda * sdb);
	};

	// Compute the Spearman rank correlation of two arrays of values.
	stats.cor.rank = function(values, a, b) {
	  var ra = b ? stats.rank(values, a) : stats.rank(values),
	      rb = b ? stats.rank(values, b) : stats.rank(a),
	      n = values.length, i, s, d;

	  for (i=0, s=0; i<n; ++i) {
	    d = ra[i] - rb[i];
	    s += d * d;
	  }

	  return 1 - 6*s / (n * (n*n-1));
	};

	// Compute the distance correlation of two arrays of numbers.
	// http://en.wikipedia.org/wiki/Distance_correlation
	stats.cor.dist = function(values, a, b) {
	  var X = b ? values.map(util.$(a)) : values,
	      Y = b ? values.map(util.$(b)) : a;

	  var A = stats.dist.mat(X),
	      B = stats.dist.mat(Y),
	      n = A.length,
	      i, aa, bb, ab;

	  for (i=0, aa=0, bb=0, ab=0; i<n; ++i) {
	    aa += A[i]*A[i];
	    bb += B[i]*B[i];
	    ab += A[i]*B[i];
	  }

	  return Math.sqrt(ab / Math.sqrt(aa*bb));
	};

	// Simple linear regression.
	// Returns a "fit" object with slope (m), intercept (b),
	// r value (R), and sum-squared residual error (rss).
	stats.linearRegression = function(values, a, b) {
	  var X = b ? values.map(util.$(a)) : values,
	      Y = b ? values.map(util.$(b)) : a,
	      n = X.length,
	      xy = stats.covariance(X, Y), // will throw err if valid vals don't align
	      sx = stats.stdev(X),
	      sy = stats.stdev(Y),
	      slope = xy / (sx*sx),
	      icept = stats.mean(Y) - slope * stats.mean(X),
	      fit = {slope: slope, intercept: icept, R: xy / (sx*sy), rss: 0},
	      res, i;

	  for (i=0; i<n; ++i) {
	    if (util.isValid(X[i]) && util.isValid(Y[i])) {
	      res = (slope*X[i] + icept) - Y[i];
	      fit.rss += res * res;
	    }
	  }

	  return fit;
	};

	// Namespace for bootstrap
	stats.bootstrap = {};

	// Construct a bootstrapped confidence interval at a given percentile level
	// Arguments are an array, an optional n (defaults to 1000),
	//  an optional alpha (defaults to 0.05), and an optional smoothing parameter
	stats.bootstrap.ci = function(values, a, b, c, d) {
	  var X, N, alpha, smooth, bs, means, i;
	  if (util.isFunction(a) || util.isString(a)) {
	    X = values.map(util.$(a));
	    N = b;
	    alpha = c;
	    smooth = d;
	  } else {
	    X = values;
	    N = a;
	    alpha = b;
	    smooth = c;
	  }
	  N = N ? +N : 1000;
	  alpha = alpha || 0.05;

	  bs = generate.random.bootstrap(X, smooth);
	  for (i=0, means = Array(N); i<N; ++i) {
	    means[i] = stats.mean(bs.samples(X.length));
	  }
	  means.sort(util.numcmp);
	  return [
	    stats.quantile(means, alpha/2),
	    stats.quantile(means, 1-(alpha/2))
	  ];
	};

	// Namespace for z-tests
	stats.z = {};

	// Construct a z-confidence interval at a given significance level
	// Arguments are an array and an optional alpha (defaults to 0.05).
	stats.z.ci = function(values, a, b) {
	  var X = values, alpha = a;
	  if (util.isFunction(a) || util.isString(a)) {
	    X = values.map(util.$(a));
	    alpha = b;
	  }
	  alpha = alpha || 0.05;

	  var z = alpha===0.05 ? 1.96 : generate.random.normal(0, 1).icdf(1-(alpha/2)),
	      mu = stats.mean(X),
	      SE = stats.stdev(X) / Math.sqrt(stats.count.valid(X));
	  return [mu - (z*SE), mu + (z*SE)];
	};

	// Perform a z-test of means. Returns the p-value.
	// If a single array is provided, performs a one-sample location test.
	// If two arrays or a table and two accessors are provided, performs
	// a two-sample location test. A paired test is performed if specified
	// by the options hash.
	// The options hash format is: {paired: boolean, nullh: number}.
	// http://en.wikipedia.org/wiki/Z-test
	// http://en.wikipedia.org/wiki/Paired_difference_test
	stats.z.test = function(values, a, b, opt) {
	  if (util.isFunction(b) || util.isString(b)) { // table and accessors
	    return (opt && opt.paired ? ztestP : ztest2)(opt, values, a, b);
	  } else if (util.isArray(a)) { // two arrays
	    return (b && b.paired ? ztestP : ztest2)(b, values, a);
	  } else if (util.isFunction(a) || util.isString(a)) {
	    return ztest1(b, values, a); // table and accessor
	  } else {
	    return ztest1(a, values); // one array
	  }
	};

	// Perform a z-test of means. Returns the p-value.
	// Assuming we have a list of values, and a null hypothesis. If no null
	// hypothesis, assume our null hypothesis is mu=0.
	function ztest1(opt, X, f) {
	  var nullH = opt && opt.nullh || 0,
	      gaussian = generate.random.normal(0, 1),
	      mu = stats.mean(X,f),
	      SE = stats.stdev(X,f) / Math.sqrt(stats.count.valid(X,f));

	  if (SE===0) {
	    // Test not well defined when standard error is 0.
	    return (mu - nullH) === 0 ? 1 : 0;
	  }
	  // Two-sided, so twice the one-sided cdf.
	  var z = (mu - nullH) / SE;
	  return 2 * gaussian.cdf(-Math.abs(z));
	}

	// Perform a two sample paired z-test of means. Returns the p-value.
	function ztestP(opt, values, a, b) {
	  var X = b ? values.map(util.$(a)) : values,
	      Y = b ? values.map(util.$(b)) : a,
	      n1 = stats.count(X),
	      n2 = stats.count(Y),
	      diffs = Array(), i;

	  if (n1 !== n2) {
	    throw Error('Array lengths must match.');
	  }
	  for (i=0; i<n1; ++i) {
	    // Only valid differences should contribute to the test statistic
	    if (util.isValid(X[i]) && util.isValid(Y[i])) {
	      diffs.push(X[i] - Y[i]);
	    }
	  }
	  return stats.z.test(diffs, opt && opt.nullh || 0);
	}

	// Perform a two sample z-test of means. Returns the p-value.
	function ztest2(opt, values, a, b) {
	  var X = b ? values.map(util.$(a)) : values,
	      Y = b ? values.map(util.$(b)) : a,
	      n1 = stats.count.valid(X),
	      n2 = stats.count.valid(Y),
	      gaussian = generate.random.normal(0, 1),
	      meanDiff = stats.mean(X) - stats.mean(Y) - (opt && opt.nullh || 0),
	      SE = Math.sqrt(stats.variance(X)/n1 + stats.variance(Y)/n2);

	  if (SE===0) {
	    // Not well defined when pooled standard error is 0.
	    return meanDiff===0 ? 1 : 0;
	  }
	  // Two-tailed, so twice the one-sided cdf.
	  var z = meanDiff / SE;
	  return 2 * gaussian.cdf(-Math.abs(z));
	}

	// Construct a mean-centered distance matrix for an array of numbers.
	stats.dist.mat = function(X) {
	  var n = X.length,
	      m = n*n,
	      A = Array(m),
	      R = generate.zeros(n),
	      M = 0, v, i, j;

	  for (i=0; i<n; ++i) {
	    A[i*n+i] = 0;
	    for (j=i+1; j<n; ++j) {
	      A[i*n+j] = (v = Math.abs(X[i] - X[j]));
	      A[j*n+i] = v;
	      R[i] += v;
	      R[j] += v;
	    }
	  }

	  for (i=0; i<n; ++i) {
	    M += R[i];
	    R[i] /= n;
	  }
	  M /= m;

	  for (i=0; i<n; ++i) {
	    for (j=i; j<n; ++j) {
	      A[i*n+j] += M - R[i] - R[j];
	      A[j*n+i] = A[i*n+j];
	    }
	  }

	  return A;
	};

	// Compute the Shannon entropy (log base 2) of an array of counts.
	stats.entropy = function(counts, f) {
	  f = util.$(f);
	  var i, p, s = 0, H = 0, n = counts.length;
	  for (i=0; i<n; ++i) {
	    s += (f ? f(counts[i]) : counts[i]);
	  }
	  if (s === 0) return 0;
	  for (i=0; i<n; ++i) {
	    p = (f ? f(counts[i]) : counts[i]) / s;
	    if (p) H += p * Math.log(p);
	  }
	  return -H / Math.LN2;
	};

	// Compute the mutual information between two discrete variables.
	// Returns an array of the form [MI, MI_distance]
	// MI_distance is defined as 1 - I(a,b) / H(a,b).
	// http://en.wikipedia.org/wiki/Mutual_information
	stats.mutual = function(values, a, b, counts) {
	  var x = counts ? values.map(util.$(a)) : values,
	      y = counts ? values.map(util.$(b)) : a,
	      z = counts ? values.map(util.$(counts)) : b;

	  var px = {},
	      py = {},
	      n = z.length,
	      s = 0, I = 0, H = 0, p, t, i;

	  for (i=0; i<n; ++i) {
	    px[x[i]] = 0;
	    py[y[i]] = 0;
	  }

	  for (i=0; i<n; ++i) {
	    px[x[i]] += z[i];
	    py[y[i]] += z[i];
	    s += z[i];
	  }

	  t = 1 / (s * Math.LN2);
	  for (i=0; i<n; ++i) {
	    if (z[i] === 0) continue;
	    p = (s * z[i]) / (px[x[i]] * py[y[i]]);
	    I += z[i] * t * Math.log(p);
	    H += z[i] * t * Math.log(z[i]/s);
	  }

	  return [I, 1 + I/H];
	};

	// Compute the mutual information between two discrete variables.
	stats.mutual.info = function(values, a, b, counts) {
	  return stats.mutual(values, a, b, counts)[0];
	};

	// Compute the mutual information distance between two discrete variables.
	// MI_distance is defined as 1 - I(a,b) / H(a,b).
	stats.mutual.dist = function(values, a, b, counts) {
	  return stats.mutual(values, a, b, counts)[1];
	};

	// Compute a profile of summary statistics for a variable.
	stats.profile = function(values, f) {
	  var mean = 0,
	      valid = 0,
	      missing = 0,
	      distinct = 0,
	      min = null,
	      max = null,
	      M2 = 0,
	      vals = [],
	      u = {}, delta, sd, i, v, x;

	  // compute summary stats
	  for (i=0; i<values.length; ++i) {
	    v = f ? f(values[i]) : values[i];

	    // update unique values
	    u[v] = (v in u) ? u[v] + 1 : (distinct += 1, 1);

	    if (v == null) {
	      ++missing;
	    } else if (util.isValid(v)) {
	      // update stats
	      x = (typeof v === 'string') ? v.length : v;
	      if (min===null || x < min) min = x;
	      if (max===null || x > max) max = x;
	      delta = x - mean;
	      mean = mean + delta / (++valid);
	      M2 = M2 + delta * (x - mean);
	      vals.push(x);
	    }
	  }
	  M2 = M2 / (valid - 1);
	  sd = Math.sqrt(M2);

	  // sort values for median and iqr
	  vals.sort(util.cmp);

	  return {
	    type:     type_1(values, f),
	    unique:   u,
	    count:    values.length,
	    valid:    valid,
	    missing:  missing,
	    distinct: distinct,
	    min:      min,
	    max:      max,
	    mean:     mean,
	    stdev:    sd,
	    median:   (v = stats.quantile(vals, 0.5)),
	    q1:       stats.quantile(vals, 0.25),
	    q3:       stats.quantile(vals, 0.75),
	    modeskew: sd === 0 ? 0 : (mean - v) / sd
	  };
	};

	// Compute profiles for all variables in a data set.
	stats.summary = function(data, fields) {
	  fields = fields || util.keys(data[0]);
	  var s = fields.map(function(f) {
	    var p = stats.profile(data, util.$(f));
	    return (p.field = f, p);
	  });
	  return (s.__summary__ = true, s);
	};
	});

	var types = {
	  'values': measure({
	    name: 'values',
	    init: 'cell.collect = true;',
	    set:  'cell.data.values()', idx: -1
	  }),
	  'count': measure({
	    name: 'count',
	    set:  'cell.num'
	  }),
	  'missing': measure({
	    name: 'missing',
	    set:  'this.missing'
	  }),
	  'valid': measure({
	    name: 'valid',
	    set:  'this.valid'
	  }),
	  'sum': measure({
	    name: 'sum',
	    init: 'this.sum = 0;',
	    add:  'this.sum += v;',
	    rem:  'this.sum -= v;',
	    set:  'this.sum'
	  }),
	  'mean': measure({
	    name: 'mean',
	    init: 'this.mean = 0;',
	    add:  'var d = v - this.mean; this.mean += d / this.valid;',
	    rem:  'var d = v - this.mean; this.mean -= this.valid ? d / this.valid : this.mean;',
	    set:  'this.mean'
	  }),
	  'average': measure({
	    name: 'average',
	    set:  'this.mean',
	    req:  ['mean'], idx: 1
	  }),
	  'variance': measure({
	    name: 'variance',
	    init: 'this.dev = 0;',
	    add:  'this.dev += d * (v - this.mean);',
	    rem:  'this.dev -= d * (v - this.mean);',
	    set:  'this.valid > 1 ? this.dev / (this.valid-1) : 0',
	    req:  ['mean'], idx: 1
	  }),
	  'variancep': measure({
	    name: 'variancep',
	    set:  'this.valid > 1 ? this.dev / this.valid : 0',
	    req:  ['variance'], idx: 2
	  }),
	  'stdev': measure({
	    name: 'stdev',
	    set:  'this.valid > 1 ? Math.sqrt(this.dev / (this.valid-1)) : 0',
	    req:  ['variance'], idx: 2
	  }),
	  'stdevp': measure({
	    name: 'stdevp',
	    set:  'this.valid > 1 ? Math.sqrt(this.dev / this.valid) : 0',
	    req:  ['variance'], idx: 2
	  }),
	  'stderr': measure({
	    name: 'stderr',
	    set:  'this.valid > 1 ? Math.sqrt(this.dev / (this.valid * (this.valid-1))) : 0',
	    req:  ['variance'], idx: 2
	  }),
	  'median': measure({
	    name: 'median',
	    set:  'cell.data.q2(this.get)',
	    req:  ['values'], idx: 3
	  }),
	  'q1': measure({
	    name: 'q1',
	    set:  'cell.data.q1(this.get)',
	    req:  ['values'], idx: 3
	  }),
	  'q3': measure({
	    name: 'q3',
	    set:  'cell.data.q3(this.get)',
	    req:  ['values'], idx: 3
	  }),
	  'distinct': measure({
	    name: 'distinct',
	    set:  'this.distinct(cell.data.values(), this.get)',
	    req:  ['values'], idx: 3
	  }),
	  'argmin': measure({
	    name: 'argmin',
	    add:  'if (v < this.min) this.argmin = t;',
	    rem:  'if (v <= this.min) this.argmin = null;',
	    set:  'this.argmin = this.argmin || cell.data.argmin(this.get)',
	    req:  ['min'], str: ['values'], idx: 3
	  }),
	  'argmax': measure({
	    name: 'argmax',
	    add:  'if (v > this.max) this.argmax = t;',
	    rem:  'if (v >= this.max) this.argmax = null;',
	    set:  'this.argmax = this.argmax || cell.data.argmax(this.get)',
	    req:  ['max'], str: ['values'], idx: 3
	  }),
	  'min': measure({
	    name: 'min',
	    init: 'this.min = +Infinity;',
	    add:  'if (v < this.min) this.min = v;',
	    rem:  'if (v <= this.min) this.min = NaN;',
	    set:  'this.min = (isNaN(this.min) ? cell.data.min(this.get) : this.min)',
	    str:  ['values'], idx: 4
	  }),
	  'max': measure({
	    name: 'max',
	    init: 'this.max = -Infinity;',
	    add:  'if (v > this.max) this.max = v;',
	    rem:  'if (v >= this.max) this.max = NaN;',
	    set:  'this.max = (isNaN(this.max) ? cell.data.max(this.get) : this.max)',
	    str:  ['values'], idx: 4
	  }),
	  'modeskew': measure({
	    name: 'modeskew',
	    set:  'this.dev===0 ? 0 : (this.mean - cell.data.q2(this.get)) / Math.sqrt(this.dev/(this.valid-1))',
	    req:  ['mean', 'variance', 'median'], idx: 5
	  })
	};

	function measure(base) {
	  return function(out) {
	    var m = util.extend({init:'', add:'', rem:'', idx:0}, base);
	    m.out = out || base.name;
	    return m;
	  };
	}

	function resolve(agg, stream) {
	  function collect(m, a) {
	    function helper(r) { if (!m[r]) collect(m, m[r] = types[r]()); }
	    if (a.req) a.req.forEach(helper);
	    if (stream && a.str) a.str.forEach(helper);
	    return m;
	  }
	  var map = agg.reduce(
	    collect,
	    agg.reduce(function(m, a) { return (m[a.name] = a, m); }, {})
	  );
	  return util.vals(map).sort(function(a, b) { return a.idx - b.idx; });
	}

	function create(agg, stream, accessor, mutator) {
	  var all = resolve(agg, stream),
	      ctr = 'this.cell = cell; this.tuple = t; this.valid = 0; this.missing = 0;',
	      add = 'if (v==null) this.missing++; if (!this.isValid(v)) return; ++this.valid;',
	      rem = 'if (v==null) this.missing--; if (!this.isValid(v)) return; --this.valid;',
	      set = 'var t = this.tuple; var cell = this.cell;';

	  all.forEach(function(a) {
	    if (a.idx < 0) {
	      ctr = a.init + ctr;
	      add = a.add + add;
	      rem = a.rem + rem;
	    } else {
	      ctr += a.init;
	      add += a.add;
	      rem += a.rem;
	    }
	  });
	  agg.slice()
	    .sort(function(a, b) { return a.idx - b.idx; })
	    .forEach(function(a) {
	      set += 'this.assign(t,\''+a.out+'\','+a.set+');';
	    });
	  set += 'return t;';

	  /* jshint evil: true */
	  ctr = Function('cell', 't', ctr);
	  ctr.prototype.assign = mutator;
	  ctr.prototype.add = Function('t', 'var v = this.get(t);' + add);
	  ctr.prototype.rem = Function('t', 'var v = this.get(t);' + rem);
	  ctr.prototype.set = Function(set);
	  ctr.prototype.get = accessor;
	  ctr.prototype.distinct = stats_1.count.distinct;
	  ctr.prototype.isValid = util.isValid;
	  ctr.fields = agg.map(util.$('out'));
	  return ctr;
	}

	types.create = create;
	var measures = types;

	var REM = '__dl_rem__';

	function Collector(key) {
	  this._add = [];
	  this._rem = [];
	  this._key = key || null;
	  this._last = null;
	}

	var proto = Collector.prototype;

	proto.add = function(v) {
	  this._add.push(v);
	};

	proto.rem = function(v) {
	  this._rem.push(v);
	};

	proto.values = function() {
	  this._get = null;
	  if (this._rem.length === 0) return this._add;

	  var a = this._add,
	      r = this._rem,
	      k = this._key,
	      x = Array(a.length - r.length),
	      i, j, n, m;

	  if (!util.isObject(r[0])) {
	    // processing raw values
	    m = stats_1.count.map(r);
	    for (i=0, j=0, n=a.length; i<n; ++i) {
	      if (m[a[i]] > 0) {
	        m[a[i]] -= 1;
	      } else {
	        x[j++] = a[i];
	      }
	    }
	  } else if (k) {
	    // has unique key field, so use that
	    m = util.toMap(r, k);
	    for (i=0, j=0, n=a.length; i<n; ++i) {
	      if (!m.hasOwnProperty(k(a[i]))) { x[j++] = a[i]; }
	    }
	  } else {
	    // no unique key, mark tuples directly
	    for (i=0, n=r.length; i<n; ++i) {
	      r[i][REM] = 1;
	    }
	    for (i=0, j=0, n=a.length; i<n; ++i) {
	      if (!a[i][REM]) { x[j++] = a[i]; }
	    }
	    for (i=0, n=r.length; i<n; ++i) {
	      delete r[i][REM];
	    }
	  }

	  this._rem = [];
	  return (this._add = x);
	};

	// memoizing statistics methods

	proto.extent = function(get) {
	  if (this._get !== get || !this._ext) {
	    var v = this.values(),
	        i = stats_1.extent.index(v, get);
	    this._ext = [v[i[0]], v[i[1]]];
	    this._get = get;
	  }
	  return this._ext;
	};

	proto.argmin = function(get) {
	  return this.extent(get)[0];
	};

	proto.argmax = function(get) {
	  return this.extent(get)[1];
	};

	proto.min = function(get) {
	  var m = this.extent(get)[0];
	  return m != null ? get(m) : +Infinity;
	};

	proto.max = function(get) {
	  var m = this.extent(get)[1];
	  return m != null ? get(m) : -Infinity;
	};

	proto.quartile = function(get) {
	  if (this._get !== get || !this._q) {
	    this._q = stats_1.quartile(this.values(), get);
	    this._get = get;
	  }
	  return this._q;
	};

	proto.q1 = function(get) {
	  return this.quartile(get)[0];
	};

	proto.q2 = function(get) {
	  return this.quartile(get)[1];
	};

	proto.q3 = function(get) {
	  return this.quartile(get)[2];
	};

	var collector = Collector;

	function Aggregator() {
	  this._cells = {};
	  this._aggr = [];
	  this._stream = false;
	}

	var Flags = Aggregator.Flags = {
	  ADD_CELL: 1,
	  MOD_CELL: 2
	};

	var proto$1 = Aggregator.prototype;

	// Parameters

	proto$1.stream = function(v) {
	  if (v == null) return this._stream;
	  this._stream = !!v;
	  this._aggr = [];
	  return this;
	};

	// key accessor to use for streaming removes
	proto$1.key = function(key) {
	  if (key == null) return this._key;
	  this._key = util.$(key);
	  return this;
	};

	// Input: array of objects of the form
	// {name: string, get: function}
	proto$1.groupby = function(dims) {
	  this._dims = util.array(dims).map(function(d, i) {
	    d = util.isString(d) ? {name: d, get: util.$(d)}
	      : util.isFunction(d) ? {name: util.name(d) || d.name || ('_' + i), get: d}
	      : (d.name && util.isFunction(d.get)) ? d : null;
	    if (d == null) throw 'Invalid groupby argument: ' + d;
	    return d;
	  });
	  return this.clear();
	};

	// Input: array of objects of the form
	// {name: string, ops: [string, ...]}
	proto$1.summarize = function(fields) {
	  fields = summarize_args(fields);
	  this._count = true;
	  var aggr = (this._aggr = []),
	      m, f, i, j, op, as, get;

	  for (i=0; i<fields.length; ++i) {
	    for (j=0, m=[], f=fields[i]; j<f.ops.length; ++j) {
	      op = f.ops[j];
	      if (op !== 'count') this._count = false;
	      as = (f.as && f.as[j]) || (op + (f.name==='*' ? '' : '_'+f.name));
	      m.push(measures[op](as));
	    }
	    get = f.get && util.$(f.get) ||
	      (f.name === '*' ? util.identity : util.$(f.name));
	    aggr.push({
	      name: f.name,
	      measures: measures.create(
	        m,
	        this._stream, // streaming remove flag
	        get,          // input tuple getter
	        this._assign) // output tuple setter
	    });
	  }
	  return this.clear();
	};

	// Convenience method to summarize by count
	proto$1.count = function() {
	  return this.summarize({'*':'count'});
	};

	// Override to perform custom tuple value assignment
	proto$1._assign = function(object, name, value) {
	  object[name] = value;
	};

	function summarize_args(fields) {
	  if (util.isArray(fields)) { return fields; }
	  if (fields == null) { return []; }
	  var a = [], name, ops;
	  for (name in fields) {
	    ops = util.array(fields[name]);
	    a.push({name: name, ops: ops});
	  }
	  return a;
	}

	// Cell Management

	proto$1.clear = function() {
	  return (this._cells = {}, this);
	};

	proto$1._cellkey = function(x) {
	  var d = this._dims,
	      n = d.length, i,
	      k = String(d[0].get(x));
	  for (i=1; i<n; ++i) {
	    k += '|' + d[i].get(x);
	  }
	  return k;
	};

	proto$1._cell = function(x) {
	  var key = this._dims.length ? this._cellkey(x) : '';
	  return this._cells[key] || (this._cells[key] = this._newcell(x, key));
	};

	proto$1._newcell = function(x, key) {
	  var cell = {
	    num:   0,
	    tuple: this._newtuple(x, key),
	    flag:  Flags.ADD_CELL,
	    aggs:  {}
	  };

	  var aggr = this._aggr, i;
	  for (i=0; i<aggr.length; ++i) {
	    cell.aggs[aggr[i].name] = new aggr[i].measures(cell, cell.tuple);
	  }
	  if (cell.collect) {
	    cell.data = new collector(this._key);
	  }
	  return cell;
	};

	proto$1._newtuple = function(x) {
	  var dims = this._dims,
	      t = {}, i, n;
	  for (i=0, n=dims.length; i<n; ++i) {
	    t[dims[i].name] = dims[i].get(x);
	  }
	  return this._ingest(t);
	};

	// Override to perform custom tuple ingestion
	proto$1._ingest = util.identity;

	// Process Tuples

	proto$1._add = function(x) {
	  var cell = this._cell(x),
	      aggr = this._aggr, i;

	  cell.num += 1;
	  if (!this._count) { // skip if count-only
	    if (cell.collect) cell.data.add(x);
	    for (i=0; i<aggr.length; ++i) {
	      cell.aggs[aggr[i].name].add(x);
	    }
	  }
	  cell.flag |= Flags.MOD_CELL;
	  if (this._on_add) this._on_add(x, cell);
	};

	proto$1._rem = function(x) {
	  var cell = this._cell(x),
	      aggr = this._aggr, i;

	  cell.num -= 1;
	  if (!this._count) { // skip if count-only
	    if (cell.collect) cell.data.rem(x);
	    for (i=0; i<aggr.length; ++i) {
	      cell.aggs[aggr[i].name].rem(x);
	    }
	  }
	  cell.flag |= Flags.MOD_CELL;
	  if (this._on_rem) this._on_rem(x, cell);
	};

	proto$1._mod = function(curr, prev) {
	  var cell0 = this._cell(prev),
	      cell1 = this._cell(curr),
	      aggr = this._aggr, i;

	  if (cell0 !== cell1) {
	    cell0.num -= 1;
	    cell1.num += 1;
	    if (cell0.collect) cell0.data.rem(prev);
	    if (cell1.collect) cell1.data.add(curr);
	  } else if (cell0.collect && !util.isObject(curr)) {
	    cell0.data.rem(prev);
	    cell0.data.add(curr);
	  }

	  for (i=0; i<aggr.length; ++i) {
	    cell0.aggs[aggr[i].name].rem(prev);
	    cell1.aggs[aggr[i].name].add(curr);
	  }
	  cell0.flag |= Flags.MOD_CELL;
	  cell1.flag |= Flags.MOD_CELL;
	  if (this._on_mod) this._on_mod(curr, prev, cell0, cell1);
	};

	proto$1._markMod = function(x) {
	  var cell0 = this._cell(x);
	  cell0.flag |= Flags.MOD_CELL;
	};

	proto$1.result = function() {
	  var result = [],
	      aggr = this._aggr,
	      cell, i, k;

	  for (k in this._cells) {
	    cell = this._cells[k];
	    if (cell.num > 0) {
	      // consolidate collector values
	      if (cell.collect) {
	        cell.data.values();
	      }
	      // update tuple properties
	      for (i=0; i<aggr.length; ++i) {
	        cell.aggs[aggr[i].name].set();
	      }
	      // add output tuple
	      result.push(cell.tuple);
	    } else {
	      delete this._cells[k];
	    }
	    cell.flag = 0;
	  }

	  this._rems = false;
	  return result;
	};

	proto$1.changes = function(output) {
	  var changes = output || {add:[], rem:[], mod:[]},
	      aggr = this._aggr,
	      cell, flag, i, k;

	  for (k in this._cells) {
	    cell = this._cells[k];
	    flag = cell.flag;

	    // consolidate collector values
	    if (cell.collect) {
	      cell.data.values();
	    }

	    // update tuple properties
	    for (i=0; i<aggr.length; ++i) {
	      cell.aggs[aggr[i].name].set();
	    }

	    // organize output tuples
	    if (cell.num <= 0) {
	      changes.rem.push(cell.tuple); // if (flag === Flags.MOD_CELL) { ??
	      delete this._cells[k];
	      if (this._on_drop) this._on_drop(cell);
	    } else {
	      if (this._on_keep) this._on_keep(cell);
	      if (flag & Flags.ADD_CELL) {
	        changes.add.push(cell.tuple);
	      } else if (flag & Flags.MOD_CELL) {
	        changes.mod.push(cell.tuple);
	      }
	    }

	    cell.flag = 0;
	  }

	  this._rems = false;
	  return changes;
	};

	proto$1.execute = function(input) {
	  return this.clear().insert(input).result();
	};

	proto$1.insert = function(input) {
	  this._consolidate();
	  for (var i=0; i<input.length; ++i) {
	    this._add(input[i]);
	  }
	  return this;
	};

	proto$1.remove = function(input) {
	  if (!this._stream) {
	    throw 'Aggregator not configured for streaming removes.' +
	      ' Call stream(true) prior to calling summarize.';
	  }
	  for (var i=0; i<input.length; ++i) {
	    this._rem(input[i]);
	  }
	  this._rems = true;
	  return this;
	};

	// consolidate removals
	proto$1._consolidate = function() {
	  if (!this._rems) return;
	  for (var k in this._cells) {
	    if (this._cells[k].collect) {
	      this._cells[k].data.values();
	    }
	  }
	  this._rems = false;
	};

	var aggregator = Aggregator;

	var groupby = function() {
	  // flatten arguments into a single array
	  var args = [].reduce.call(arguments, function(a, x) {
	    return a.concat(util.array(x));
	  }, []);
	  // create and return an aggregator
	  return new aggregator()
	    .groupby(args)
	    .summarize({'*':'values'});
	};

	var tempDate = new Date(),
	    baseDate = new Date(0, 0, 1).setFullYear(0), // Jan 1, 0 AD
	    utcBaseDate = new Date(Date.UTC(0, 0, 1)).setUTCFullYear(0);

	function date(d) {
	  return (tempDate.setTime(+d), tempDate);
	}

	// create a time unit entry
	function entry(type, date, unit, step, min, max) {
	  var e = {
	    type: type,
	    date: date,
	    unit: unit
	  };
	  if (step) {
	    e.step = step;
	  } else {
	    e.minstep = 1;
	  }
	  if (min != null) e.min = min;
	  if (max != null) e.max = max;
	  return e;
	}

	function create$1(type, unit, base, step, min, max) {
	  return entry(type,
	    function(d) { return unit.offset(base, d); },
	    function(d) { return unit.count(base, d); },
	    step, min, max);
	}

	var locale = [
	  create$1('second', d3Time.second, baseDate),
	  create$1('minute', d3Time.minute, baseDate),
	  create$1('hour',   d3Time.hour,   baseDate),
	  create$1('day',    d3Time.day,    baseDate, [1, 7]),
	  create$1('month',  d3Time.month,  baseDate, [1, 3, 6]),
	  create$1('year',   d3Time.year,   baseDate),

	  // periodic units
	  entry('seconds',
	    function(d) { return new Date(1970, 0, 1, 0, 0, d); },
	    function(d) { return date(d).getSeconds(); },
	    null, 0, 59
	  ),
	  entry('minutes',
	    function(d) { return new Date(1970, 0, 1, 0, d); },
	    function(d) { return date(d).getMinutes(); },
	    null, 0, 59
	  ),
	  entry('hours',
	    function(d) { return new Date(1970, 0, 1, d); },
	    function(d) { return date(d).getHours(); },
	    null, 0, 23
	  ),
	  entry('weekdays',
	    function(d) { return new Date(1970, 0, 4+d); },
	    function(d) { return date(d).getDay(); },
	    [1], 0, 6
	  ),
	  entry('dates',
	    function(d) { return new Date(1970, 0, d); },
	    function(d) { return date(d).getDate(); },
	    [1], 1, 31
	  ),
	  entry('months',
	    function(d) { return new Date(1970, d % 12, 1); },
	    function(d) { return date(d).getMonth(); },
	    [1], 0, 11
	  )
	];

	var utc = [
	  create$1('second', d3Time.utcSecond, utcBaseDate),
	  create$1('minute', d3Time.utcMinute, utcBaseDate),
	  create$1('hour',   d3Time.utcHour,   utcBaseDate),
	  create$1('day',    d3Time.utcDay,    utcBaseDate, [1, 7]),
	  create$1('month',  d3Time.utcMonth,  utcBaseDate, [1, 3, 6]),
	  create$1('year',   d3Time.utcYear,   utcBaseDate),

	  // periodic units
	  entry('seconds',
	    function(d) { return new Date(Date.UTC(1970, 0, 1, 0, 0, d)); },
	    function(d) { return date(d).getUTCSeconds(); },
	    null, 0, 59
	  ),
	  entry('minutes',
	    function(d) { return new Date(Date.UTC(1970, 0, 1, 0, d)); },
	    function(d) { return date(d).getUTCMinutes(); },
	    null, 0, 59
	  ),
	  entry('hours',
	    function(d) { return new Date(Date.UTC(1970, 0, 1, d)); },
	    function(d) { return date(d).getUTCHours(); },
	    null, 0, 23
	  ),
	  entry('weekdays',
	    function(d) { return new Date(Date.UTC(1970, 0, 4+d)); },
	    function(d) { return date(d).getUTCDay(); },
	    [1], 0, 6
	  ),
	  entry('dates',
	    function(d) { return new Date(Date.UTC(1970, 0, d)); },
	    function(d) { return date(d).getUTCDate(); },
	    [1], 1, 31
	  ),
	  entry('months',
	    function(d) { return new Date(Date.UTC(1970, d % 12, 1)); },
	    function(d) { return date(d).getUTCMonth(); },
	    [1], 0, 11
	  )
	];

	var STEPS = [
	  [31536e6, 5],  // 1-year
	  [7776e6, 4],   // 3-month
	  [2592e6, 4],   // 1-month
	  [12096e5, 3],  // 2-week
	  [6048e5, 3],   // 1-week
	  [1728e5, 3],   // 2-day
	  [864e5, 3],    // 1-day
	  [432e5, 2],    // 12-hour
	  [216e5, 2],    // 6-hour
	  [108e5, 2],    // 3-hour
	  [36e5, 2],     // 1-hour
	  [18e5, 1],     // 30-minute
	  [9e5, 1],      // 15-minute
	  [3e5, 1],      // 5-minute
	  [6e4, 1],      // 1-minute
	  [3e4, 0],      // 30-second
	  [15e3, 0],     // 15-second
	  [5e3, 0],      // 5-second
	  [1e3, 0]       // 1-second
	];

	function find(units, span, minb, maxb) {
	  var step = STEPS[0], i, n, bins;

	  for (i=1, n=STEPS.length; i<n; ++i) {
	    step = STEPS[i];
	    if (span > step[0]) {
	      bins = span / step[0];
	      if (bins > maxb) {
	        return units[STEPS[i-1][1]];
	      }
	      if (bins >= minb) {
	        return units[step[1]];
	      }
	    }
	  }
	  return units[STEPS[n-1][1]];
	}

	function toUnitMap(units) {
	  var map = {}, i, n;
	  for (i=0, n=units.length; i<n; ++i) {
	    map[units[i].type] = units[i];
	  }
	  map.find = function(span, minb, maxb) {
	    return find(units, span, minb, maxb);
	  };
	  return map;
	}

	var time = toUnitMap(locale);
	var utc_1 = toUnitMap(utc);
	time.utc = utc_1;

	var EPSILON = 1e-15;

	function bins(opt) {
	  if (!opt) { throw Error("Missing binning options."); }

	  // determine range
	  var maxb = opt.maxbins || 15,
	      base = opt.base || 10,
	      logb = Math.log(base),
	      div = opt.div || [5, 2],
	      min = opt.min,
	      max = opt.max,
	      span = max - min,
	      step, level, minstep, precision, v, i, eps;

	  if (opt.step) {
	    // if step size is explicitly given, use that
	    step = opt.step;
	  } else if (opt.steps) {
	    // if provided, limit choice to acceptable step sizes
	    step = opt.steps[Math.min(
	      opt.steps.length - 1,
	      bisect$1(opt.steps, span/maxb, 0, opt.steps.length)
	    )];
	  } else {
	    // else use span to determine step size
	    level = Math.ceil(Math.log(maxb) / logb);
	    minstep = opt.minstep || 0;
	    step = Math.max(
	      minstep,
	      Math.pow(base, Math.round(Math.log(span) / logb) - level)
	    );

	    // increase step size if too many bins
	    while (Math.ceil(span/step) > maxb) { step *= base; }

	    // decrease step size if allowed
	    for (i=0; i<div.length; ++i) {
	      v = step / div[i];
	      if (v >= minstep && span / v <= maxb) step = v;
	    }
	  }

	  // update precision, min and max
	  v = Math.log(step);
	  precision = v >= 0 ? 0 : ~~(-v / logb) + 1;
	  eps = Math.pow(base, -precision - 1);
	  min = Math.min(min, Math.floor(min / step + eps) * step);
	  max = Math.ceil(max / step) * step;

	  return {
	    start: min,
	    stop:  max,
	    step:  step,
	    unit:  {precision: precision},
	    value: value$1,
	    index: index
	  };
	}

	function bisect$1(a, x, lo, hi) {
	  while (lo < hi) {
	    var mid = lo + hi >>> 1;
	    if (util.cmp(a[mid], x) < 0) { lo = mid + 1; }
	    else { hi = mid; }
	  }
	  return lo;
	}

	function value$1(v) {
	  return this.step * Math.floor(v / this.step + EPSILON);
	}

	function index(v) {
	  return Math.floor((v - this.start) / this.step + EPSILON);
	}

	function date_value(v) {
	  return this.unit.date(value$1.call(this, v));
	}

	function date_index(v) {
	  return index.call(this, this.unit.unit(v));
	}

	bins.date = function(opt) {
	  if (!opt) { throw Error("Missing date binning options."); }

	  // find time step, then bin
	  var units = opt.utc ? time.utc : time,
	      dmin = opt.min,
	      dmax = opt.max,
	      maxb = opt.maxbins || 20,
	      minb = opt.minbins || 4,
	      span = (+dmax) - (+dmin),
	      unit = opt.unit ? units[opt.unit] : units.find(span, minb, maxb),
	      spec = bins({
	        min:     unit.min != null ? unit.min : unit.unit(dmin),
	        max:     unit.max != null ? unit.max : unit.unit(dmax),
	        maxbins: maxb,
	        minstep: unit.minstep,
	        steps:   unit.step
	      });

	  spec.unit = unit;
	  spec.index = date_index;
	  if (!opt.raw) spec.value = date_value;
	  return spec;
	};

	var bins_1 = bins;

	var qtype = {
	  'integer': 1,
	  'number': 1,
	  'date': 1
	};

	function $bin(values, f, opt) {
	  opt = options(values, f, opt);
	  var b = spec(opt);
	  return !b ? (opt.accessor || util.identity) :
	    util.$func('bin', b.unit.unit ?
	      function(x) { return b.value(b.unit.unit(x)); } :
	      function(x) { return b.value(x); }
	    )(opt.accessor);
	}

	function histogram(values, f, opt) {
	  opt = options(values, f, opt);
	  var b = spec(opt);
	  return b ?
	    numerical(values, opt.accessor, b) :
	    categorical(values, opt.accessor, opt && opt.sort);
	}

	function spec(opt) {
	  var t = opt.type, b = null;
	  if (t == null || qtype[t]) {
	    if (t === 'integer' && opt.minstep == null) opt.minstep = 1;
	    b = (t === 'date') ? bins_1.date(opt) : bins_1(opt);
	  }
	  return b;
	}

	function options() {
	  var a = arguments,
	      i = 0,
	      values = util.isArray(a[i]) ? a[i++] : null,
	      f = util.isFunction(a[i]) || util.isString(a[i]) ? util.$(a[i++]) : null,
	      opt = util.extend({}, a[i]);

	  if (values) {
	    opt.type = opt.type || type_1(values, f);
	    if (qtype[opt.type]) {
	      var ext = stats_1.extent(values, f);
	      opt = util.extend({min: ext[0], max: ext[1]}, opt);
	    }
	  }
	  if (f) { opt.accessor = f; }
	  return opt;
	}

	function numerical(values, f, b) {
	  var h = generate.range(b.start, b.stop + b.step/2, b.step)
	    .map(function(v) { return {value: b.value(v), count: 0}; });

	  for (var i=0, v, j; i<values.length; ++i) {
	    v = f ? f(values[i]) : values[i];
	    if (util.isValid(v)) {
	      j = b.index(v);
	      if (j < 0 || j >= h.length || !isFinite(j)) continue;
	      h[j].count += 1;
	    }
	  }
	  h.bins = b;
	  return h;
	}

	function categorical(values, f, sort) {
	  var u = stats_1.unique(values, f),
	      c = stats_1.count.map(values, f);
	  return u.map(function(k) { return {value: k, count: c[k]}; })
	    .sort(util.comparator(sort ? '-count' : '+value'));
	}

	var histogram_1 = {
	  $bin: $bin,
	  histogram: histogram
	};

	var context = {
	  formats:    [],
	  format_map: {},
	  truncate:   util.truncate,
	  pad:        util.pad,
	  day:        format.day,
	  month:      format.month,
	  quarter:    format.quarter,
	  utcQuarter: format.utcQuarter
	};

	function template(text) {
	  var src = source(text, 'd');
	  src = 'var __t; return ' + src + ';';

	  /* jshint evil: true */
	  return (new Function('d', src)).bind(context);
	}

	template.source = source;
	template.context = context;
	template.format = get_format;
	var template_1 = template;

	// Clear cache of format objects.
	// This can *break* prior template functions, so invoke with care!
	template.clearFormatCache = function() {
	  context.formats = [];
	  context.format_map = {};
	};

	// Generate property access code for use within template source.
	// object: the name of the object (variable) containing template data
	// property: the property access string, verbatim from template tag
	template.property = function(object, property) {
	  var src = util.field(property).map(util.str).join('][');
	  return object + '[' + src + ']';
	};

	// Generate source code for a template function.
	// text: the template text
	// variable: the name of the data object variable ('obj' by default)
	// properties: optional hash for collecting all accessed properties
	function source(text, variable, properties) {
	  variable = variable || 'obj';
	  var index = 0;
	  var src = '\'';
	  var regex = template_re;

	  // Compile the template source, escaping string literals appropriately.
	  text.replace(regex, function(match, interpolate, offset) {
	    src += text
	      .slice(index, offset)
	      .replace(template_escaper, template_escapeChar);
	    index = offset + match.length;

	    if (interpolate) {
	      src += '\'\n+((__t=(' +
	        template_var(interpolate, variable, properties) +
	        '))==null?\'\':__t)+\n\'';
	    }

	    // Adobe VMs need the match returned to produce the correct offest.
	    return match;
	  });
	  return src + '\'';
	}

	function template_var(text, variable, properties) {
	  var filters = text.match(filter_re);
	  var prop = filters.shift().trim();
	  var stringCast = true;

	  function strcall(fn) {
	    fn = fn || '';
	    if (stringCast) {
	      stringCast = false;
	      src = 'String(' + src + ')' + fn;
	    } else {
	      src += fn;
	    }
	    return src;
	  }

	  function date() {
	    return '(typeof ' + src + '==="number"?new Date('+src+'):'+src+')';
	  }

	  function formatter(type) {
	    var pattern = args[0];
	    if ((pattern[0] === '\'' && pattern[pattern.length-1] === '\'') ||
	        (pattern[0] === '"'  && pattern[pattern.length-1] === '"')) {
	      pattern = pattern.slice(1, -1);
	    } else {
	      throw Error('Format pattern must be quoted: ' + pattern);
	    }
	    a = template_format(pattern, type);
	    stringCast = false;
	    var arg = type === 'number' ? src : date();
	    src = 'this.formats['+a+']('+arg+')';
	  }

	  if (properties) properties[prop] = 1;
	  var src = template.property(variable, prop);

	  for (var i=0; i<filters.length; ++i) {
	    var f = filters[i], args = null, pidx, a, b;

	    if ((pidx=f.indexOf(':')) > 0) {
	      f = f.slice(0, pidx);
	      args = filters[i].slice(pidx+1)
	        .match(args_re)
	        .map(function(s) { return s.trim(); });
	    }
	    f = f.trim();

	    switch (f) {
	      case 'length':
	        strcall('.length');
	        break;
	      case 'lower':
	        strcall('.toLowerCase()');
	        break;
	      case 'upper':
	        strcall('.toUpperCase()');
	        break;
	      case 'lower-locale':
	        strcall('.toLocaleLowerCase()');
	        break;
	      case 'upper-locale':
	        strcall('.toLocaleUpperCase()');
	        break;
	      case 'trim':
	        strcall('.trim()');
	        break;
	      case 'left':
	        a = util.number(args[0]);
	        strcall('.slice(0,' + a + ')');
	        break;
	      case 'right':
	        a = util.number(args[0]);
	        strcall('.slice(-' + a +')');
	        break;
	      case 'mid':
	        a = util.number(args[0]);
	        b = a + util.number(args[1]);
	        strcall('.slice(+'+a+','+b+')');
	        break;
	      case 'slice':
	        a = util.number(args[0]);
	        strcall('.slice('+ a +
	          (args.length > 1 ? ',' + util.number(args[1]) : '') +
	          ')');
	        break;
	      case 'truncate':
	        a = util.number(args[0]);
	        b = args[1];
	        b = (b!=='left' && b!=='middle' && b!=='center') ? 'right' : b;
	        src = 'this.truncate(' + strcall() + ',' + a + ',\'' + b + '\')';
	        break;
	      case 'pad':
	        a = util.number(args[0]);
	        b = args[1];
	        b = (b!=='left' && b!=='middle' && b!=='center') ? 'right' : b;
	        src = 'this.pad(' + strcall() + ',' + a + ',\'' + b + '\')';
	        break;
	      case 'number':
	        formatter('number');
	        break;
	      case 'time':
	        formatter('time');
	        break;
	      case 'time-utc':
	        formatter('utc');
	        break;
	      case 'month':
	        src = 'this.month(' + src + ')';
	        break;
	      case 'month-abbrev':
	        src = 'this.month(' + src + ',true)';
	        break;
	      case 'day':
	        src = 'this.day(' + src + ')';
	        break;
	      case 'day-abbrev':
	        src = 'this.day(' + src + ',true)';
	        break;
	      case 'quarter':
	        src = 'this.quarter(' + src + ')';
	        break;
	      case 'quarter-utc':
	        src = 'this.utcQuarter(' + src + ')';
	        break;
	      default:
	        throw Error('Unrecognized template filter: ' + f);
	    }
	  }

	  return src;
	}

	var template_re = /\{\{(.+?)\}\}|$/g,
	    filter_re = /(?:"[^"]*"|\'[^\']*\'|[^\|"]+|[^\|\']+)+/g,
	    args_re = /(?:"[^"]*"|\'[^\']*\'|[^,"]+|[^,\']+)+/g;

	// Certain characters need to be escaped so that they can be put into a
	// string literal.
	var template_escapes = {
	  '\'':     '\'',
	  '\\':     '\\',
	  '\r':     'r',
	  '\n':     'n',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};

	var template_escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	function template_escapeChar(match) {
	  return '\\' + template_escapes[match];
	}

	function template_format(pattern, type) {
	  var key = type + ':' + pattern;
	  if (context.format_map[key] == null) {
	    var f = format[type](pattern);
	    var i = context.formats.length;
	    context.formats.push(f);
	    context.format_map[key] = i;
	    return i;
	  }
	  return context.format_map[key];
	}

	function get_format(pattern, type) {
	  return context.formats[template_format(pattern, type)];
	}

	var accessor = createCommonjsModule(function (module) {
	var utc = time.utc;

	var u = module.exports;

	u.$year   = util.$func('year', time.year.unit);
	u.$month  = util.$func('month', time.months.unit);
	u.$date   = util.$func('date', time.dates.unit);
	u.$day    = util.$func('day', time.weekdays.unit);
	u.$hour   = util.$func('hour', time.hours.unit);
	u.$minute = util.$func('minute', time.minutes.unit);
	u.$second = util.$func('second', time.seconds.unit);

	u.$utcYear   = util.$func('utcYear', utc.year.unit);
	u.$utcMonth  = util.$func('utcMonth', utc.months.unit);
	u.$utcDate   = util.$func('utcDate', utc.dates.unit);
	u.$utcDay    = util.$func('utcDay', utc.weekdays.unit);
	u.$utcHour   = util.$func('utcHour', utc.hours.unit);
	u.$utcMinute = util.$func('utcMinute', utc.minutes.unit);
	u.$utcSecond = util.$func('utcSecond', utc.seconds.unit);
	});

	var readers = util
	  .keys(read_1.formats)
	  .reduce(function(out, type) {
	    out[type] = function(opt, format, callback) {
	      // process arguments
	      if (util.isString(opt)) { opt = {url: opt}; }
	      if (arguments.length === 2 && util.isFunction(format)) {
	        callback = format;
	        format = undefined;
	      }

	      // set up read format
	      format = util.extend({parse: 'auto'}, format);
	      format.type = type;

	      // load data
	      var data = load_1(opt, callback ? function(error, data) {
	        if (error) { callback(error, null); return; }
	        try {
	          // data loaded, now parse it (async)
	          data = read_1(data, format);
	          callback(null, data);
	        } catch (e) {
	          callback(e, null);
	        }
	      } : undefined);

	      // data loaded, now parse it (sync)
	      if (!callback) return read_1(data, format);
	    };
	    return out;
	  }, {});

	var formatTables = {
	  table:   formatTable,  // format a data table
	  summary: formatSummary // format a data table summary
	};

	var FMT = {
	  'date':    '|time:"%m/%d/%Y %H:%M:%S"',
	  'number':  '|number:".4f"',
	  'integer': '|number:"d"'
	};

	var POS = {
	  'number':  'left',
	  'integer': 'left'
	};

	function formatTable(data, opt) {
	  opt = util.extend({separator:' ', minwidth: 8, maxwidth: 15}, opt);
	  var fields = opt.fields || util.keys(data[0]),
	      types = type_1.all(data);

	  if (opt.start || opt.limit) {
	    var a = opt.start || 0,
	        b = opt.limit ? a + opt.limit : data.length;
	    data = data.slice(a, b);
	  }

	  // determine char width of fields
	  var lens = fields.map(function(name) {
	    var format = FMT[types[name]] || '',
	        t = template_1('{{' + name + format + '}}'),
	        l = stats_1.max(data, function(x) { return t(x).length; });
	    l = Math.max(Math.min(name.length, opt.minwidth), l);
	    return opt.maxwidth > 0 ? Math.min(l, opt.maxwidth) : l;
	  });

	  // print header row
	  var head = fields.map(function(name, i) {
	    return util.truncate(util.pad(name, lens[i], 'center'), lens[i]);
	  }).join(opt.separator);

	  // build template function for each row
	  var tmpl = template_1(fields.map(function(name, i) {
	    return '{{' +
	      name +
	      (FMT[types[name]] || '') +
	      ('|pad:' + lens[i] + ',' + (POS[types[name]] || 'right')) +
	      ('|truncate:' + lens[i]) +
	    '}}';
	  }).join(opt.separator));

	  // print table
	  return head + "\n" + data.map(tmpl).join('\n');
	}

	function formatSummary(s) {
	  s = s ? s.__summary__ ? s : stats_1.summary(s) : this;
	  var str = [], i, n;
	  for (i=0, n=s.length; i<n; ++i) {
	    str.push('-- ' + s[i].field + ' --');
	    if (s[i].type === 'string' || s[i].distinct < 10) {
	      str.push(printCategoricalProfile(s[i]));
	    } else {
	      str.push(printQuantitativeProfile(s[i]));
	    }
	    str.push('');
	  }
	  return str.join('\n');
	}

	function printQuantitativeProfile(p) {
	  return [
	    'valid:    ' + p.valid,
	    'missing:  ' + p.missing,
	    'distinct: ' + p.distinct,
	    'min:      ' + p.min,
	    'max:      ' + p.max,
	    'median:   ' + p.median,
	    'mean:     ' + p.mean,
	    'stdev:    ' + p.stdev,
	    'modeskew: ' + p.modeskew
	  ].join('\n');
	}

	function printCategoricalProfile(p) {
	  var list = [
	    'valid:    ' + p.valid,
	    'missing:  ' + p.missing,
	    'distinct: ' + p.distinct,
	    'top values: '
	  ];
	  var u = p.unique;
	  var top = util.keys(u)
	    .sort(function(a,b) { return u[b] - u[a]; })
	    .slice(0, 6)
	    .map(function(v) { return ' \'' + v + '\' (' + u[v] + ')'; });
	  return list.concat(top).join('\n');
	}

	var require$$0 = getCjsExportFromNamespace(_package$1);

	var dl = {
	  version:    require$$0.version,
	  load:       load_1,
	  read:       read_1,
	  type:       type_1,
	  Aggregator: aggregator,
	  groupby:    groupby,
	  bins:       bins_1,
	  $bin:       histogram_1.$bin,
	  histogram:  histogram_1.histogram,
	  format:     format,
	  template:   template_1,
	  time:       time
	};

	util.extend(dl, util);
	util.extend(dl, accessor);
	util.extend(dl, generate);
	util.extend(dl, stats_1);
	util.extend(dl, readers);
	util.extend(dl.format, formatTables);

	// backwards-compatible, deprecated API
	// will remove in the future
	dl.print = {
	  table:   dl.format.table,
	  summary: dl.format.summary
	};

	var src = dl;

	return src;

})));
//# sourceMappingURL=datalib.js.map
