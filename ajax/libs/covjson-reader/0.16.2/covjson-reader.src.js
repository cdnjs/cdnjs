(function (exports,covutils) {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

	function interopDefault(ex) {
		return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var iota = createCommonjsModule(function (module) {
	"use strict"

	function iota(n) {
	  var result = new Array(n)
	  for(var i=0; i<n; ++i) {
	    result[i] = i
	  }
	  return result
	}

	module.exports = iota
	});

	var iota$1 = interopDefault(iota);


	var require$$1 = Object.freeze({
	  default: iota$1
	});

	var index = createCommonjsModule(function (module) {
	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}
	});

	var index$1 = interopDefault(index);


	var require$$0 = Object.freeze({
	  default: index$1
	});

	var ndarray = createCommonjsModule(function (module) {
	var iota = interopDefault(require$$1)
	var isBuffer = interopDefault(require$$0)

	var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

	function compare1st(a, b) {
	  return a[0] - b[0]
	}

	function order() {
	  var stride = this.stride
	  var terms = new Array(stride.length)
	  var i
	  for(i=0; i<terms.length; ++i) {
	    terms[i] = [Math.abs(stride[i]), i]
	  }
	  terms.sort(compare1st)
	  var result = new Array(terms.length)
	  for(i=0; i<result.length; ++i) {
	    result[i] = terms[i][1]
	  }
	  return result
	}

	function compileConstructor(dtype, dimension) {
	  var className = ["View", dimension, "d", dtype].join("")
	  if(dimension < 0) {
	    className = "View_Nil" + dtype
	  }
	  var useGetters = (dtype === "generic")

	  if(dimension === -1) {
	    //Special case for trivial arrays
	    var code =
	      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
	    var procedure = new Function(code)
	    return procedure()
	  } else if(dimension === 0) {
	    //Special case for 0d arrays
	    var code =
	      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
	"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
	    var procedure = new Function("TrivialArray", code)
	    return procedure(CACHED_CONSTRUCTORS[dtype][0])
	  }

	  var code = ["'use strict'"]

	  //Create constructor for view
	  var indices = iota(dimension)
	  var args = indices.map(function(i) { return "i"+i })
	  var index_str = "this.offset+" + indices.map(function(i) {
	        return "this.stride[" + i + "]*i" + i
	      }).join("+")
	  var shapeArg = indices.map(function(i) {
	      return "b"+i
	    }).join(",")
	  var strideArg = indices.map(function(i) {
	      return "c"+i
	    }).join(",")
	  code.push(
	    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
	      "this.shape=[" + shapeArg + "]",
	      "this.stride=[" + strideArg + "]",
	      "this.offset=d|0}",
	    "var proto="+className+".prototype",
	    "proto.dtype='"+dtype+"'",
	    "proto.dimension="+dimension)

	  //view.size:
	  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
	"}})")

	  //view.order:
	  if(dimension === 1) {
	    code.push("proto.order=[0]")
	  } else {
	    code.push("Object.defineProperty(proto,'order',{get:")
	    if(dimension < 4) {
	      code.push("function "+className+"_order(){")
	      if(dimension === 2) {
	        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
	      } else if(dimension === 3) {
	        code.push(
	"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
	      }
	    } else {
	      code.push("ORDER})")
	    }
	  }

	  //view.set(i0, ..., v):
	  code.push(
	"proto.set=function "+className+"_set("+args.join(",")+",v){")
	  if(useGetters) {
	    code.push("return this.data.set("+index_str+",v)}")
	  } else {
	    code.push("return this.data["+index_str+"]=v}")
	  }

	  //view.get(i0, ...):
	  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
	  if(useGetters) {
	    code.push("return this.data.get("+index_str+")}")
	  } else {
	    code.push("return this.data["+index_str+"]}")
	  }

	  //view.index:
	  code.push(
	    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

	  //view.hi():
	  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "this.stride["+i + "]"
	    }).join(",")+",this.offset)}")

	  //view.lo():
	  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
	  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
	  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
	  for(var i=0; i<dimension; ++i) {
	    code.push(
	"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
	  }
	  code.push("return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return "a"+i
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "c"+i
	    }).join(",")+",b)}")

	  //view.step():
	  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
	    indices.map(function(i) {
	      return "a"+i+"=this.shape["+i+"]"
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "b"+i+"=this.stride["+i+"]"
	    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
	  for(var i=0; i<dimension; ++i) {
	    code.push(
	"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
	  }
	  code.push("return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return "a" + i
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "b" + i
	    }).join(",")+",c)}")

	  //view.transpose():
	  var tShape = new Array(dimension)
	  var tStride = new Array(dimension)
	  for(var i=0; i<dimension; ++i) {
	    tShape[i] = "a[i"+i+"]"
	    tStride[i] = "b[i"+i+"]"
	  }
	  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
	    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
	    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

	  //view.pick():
	  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
	  for(var i=0; i<dimension; ++i) {
	    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
	  }
	  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

	  //Add return statement
	  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
	    indices.map(function(i) {
	      return "shape["+i+"]"
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "stride["+i+"]"
	    }).join(",")+",offset)}")

	  //Compile procedure
	  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
	  return procedure(CACHED_CONSTRUCTORS[dtype], order)
	}

	function arrayDType(data) {
	  if(isBuffer(data)) {
	    return "buffer"
	  }
	  if(hasTypedArrays) {
	    switch(Object.prototype.toString.call(data)) {
	      case "[object Float64Array]":
	        return "float64"
	      case "[object Float32Array]":
	        return "float32"
	      case "[object Int8Array]":
	        return "int8"
	      case "[object Int16Array]":
	        return "int16"
	      case "[object Int32Array]":
	        return "int32"
	      case "[object Uint8Array]":
	        return "uint8"
	      case "[object Uint16Array]":
	        return "uint16"
	      case "[object Uint32Array]":
	        return "uint32"
	      case "[object Uint8ClampedArray]":
	        return "uint8_clamped"
	    }
	  }
	  if(Array.isArray(data)) {
	    return "array"
	  }
	  return "generic"
	}

	var CACHED_CONSTRUCTORS = {
	  "float32":[],
	  "float64":[],
	  "int8":[],
	  "int16":[],
	  "int32":[],
	  "uint8":[],
	  "uint16":[],
	  "uint32":[],
	  "array":[],
	  "uint8_clamped":[],
	  "buffer":[],
	  "generic":[]
	}

	;(function() {
	  for(var id in CACHED_CONSTRUCTORS) {
	    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
	  }
	});

	function wrappedNDArrayCtor(data, shape, stride, offset) {
	  if(data === undefined) {
	    var ctor = CACHED_CONSTRUCTORS.array[0]
	    return ctor([])
	  } else if(typeof data === "number") {
	    data = [data]
	  }
	  if(shape === undefined) {
	    shape = [ data.length ]
	  }
	  var d = shape.length
	  if(stride === undefined) {
	    stride = new Array(d)
	    for(var i=d-1, sz=1; i>=0; --i) {
	      stride[i] = sz
	      sz *= shape[i]
	    }
	  }
	  if(offset === undefined) {
	    offset = 0
	    for(var i=0; i<d; ++i) {
	      if(stride[i] < 0) {
	        offset -= (shape[i]-1)*stride[i]
	      }
	    }
	  }
	  var dtype = arrayDType(data)
	  var ctor_list = CACHED_CONSTRUCTORS[dtype]
	  while(ctor_list.length <= d+1) {
	    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
	  }
	  var ctor = ctor_list[d+1]
	  return ctor(data, shape, stride, offset)
	}

	module.exports = wrappedNDArrayCtor
	});

	var ndarray$1 = interopDefault(ndarray);

	var urlTemplate = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
	    if (typeof exports === 'object') {
	        module.exports = factory();
	    } else if (typeof define === 'function' && define.amd) {
	        define([], factory);
	    } else {
	        root.urltemplate = factory();
	    }
	}(commonjsGlobal, function () {
	  /**
	   * @constructor
	   */
	  function UrlTemplate() {
	  }

	  /**
	   * @private
	   * @param {string} str
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeReserved = function (str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	      if (!/%[0-9A-Fa-f]/.test(part)) {
	        part = encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']');
	      }
	      return part;
	    }).join('');
	  };

	  /**
	   * @private
	   * @param {string} str
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeUnreserved = function (str) {
	    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
	      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	    });
	  }

	  /**
	   * @private
	   * @param {string} operator
	   * @param {string} value
	   * @param {string} key
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeValue = function (operator, value, key) {
	    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : this.encodeUnreserved(value);

	    if (key) {
	      return this.encodeUnreserved(key) + '=' + value;
	    } else {
	      return value;
	    }
	  };

	  /**
	   * @private
	   * @param {*} value
	   * @return {boolean}
	   */
	  UrlTemplate.prototype.isDefined = function (value) {
	    return value !== undefined && value !== null;
	  };

	  /**
	   * @private
	   * @param {string}
	   * @return {boolean}
	   */
	  UrlTemplate.prototype.isKeyOperator = function (operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	  };

	  /**
	   * @private
	   * @param {Object} context
	   * @param {string} operator
	   * @param {string} key
	   * @param {string} modifier
	   */
	  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {
	    var value = context[key],
	        result = [];

	    if (this.isDefined(value) && value !== '') {
	      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	        value = value.toString();

	        if (modifier && modifier !== '*') {
	          value = value.substring(0, parseInt(modifier, 10));
	        }

	        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	      } else {
	        if (modifier === '*') {
	          if (Array.isArray(value)) {
	            value.filter(this.isDefined).forEach(function (value) {
	              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	            }, this);
	          } else {
	            Object.keys(value).forEach(function (k) {
	              if (this.isDefined(value[k])) {
	                result.push(this.encodeValue(operator, value[k], k));
	              }
	            }, this);
	          }
	        } else {
	          var tmp = [];

	          if (Array.isArray(value)) {
	            value.filter(this.isDefined).forEach(function (value) {
	              tmp.push(this.encodeValue(operator, value));
	            }, this);
	          } else {
	            Object.keys(value).forEach(function (k) {
	              if (this.isDefined(value[k])) {
	                tmp.push(this.encodeUnreserved(k));
	                tmp.push(this.encodeValue(operator, value[k].toString()));
	              }
	            }, this);
	          }

	          if (this.isKeyOperator(operator)) {
	            result.push(this.encodeUnreserved(key) + '=' + tmp.join(','));
	          } else if (tmp.length !== 0) {
	            result.push(tmp.join(','));
	          }
	        }
	      }
	    } else {
	      if (operator === ';') {
	        if (this.isDefined(value)) {
	          result.push(this.encodeUnreserved(key));
	        }
	      } else if (value === '' && (operator === '&' || operator === '?')) {
	        result.push(this.encodeUnreserved(key) + '=');
	      } else if (value === '') {
	        result.push('');
	      }
	    }
	    return result;
	  };

	  /**
	   * @param {string} template
	   * @return {function(Object):string}
	   */
	  UrlTemplate.prototype.parse = function (template) {
	    var that = this;
	    var operators = ['+', '#', '.', '/', ';', '?', '&'];

	    return {
	      expand: function (context) {
	        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	          if (expression) {
	            var operator = null,
	                values = [];

	            if (operators.indexOf(expression.charAt(0)) !== -1) {
	              operator = expression.charAt(0);
	              expression = expression.substr(1);
	            }

	            expression.split(/,/g).forEach(function (variable) {
	              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	            });

	            if (operator && operator !== '+') {
	              var separator = ',';

	              if (operator === '?') {
	                separator = '&';
	              } else if (operator !== '#') {
	                separator = operator;
	              }
	              return (values.length !== 0 ? operator : '') + values.join(separator);
	            } else {
	              return values.join(',');
	            }
	          } else {
	            return that.encodeReserved(literal);
	          }
	        });
	      }
	    };
	  };

	  return new UrlTemplate();
	}));
	});

	var template = interopDefault(urlTemplate);

	var LINKRELPREFIX = 'http://www.iana.org/assignments/relation/';

	var PREFIX = 'https://covjson.org/def/';
	var CORE_PREFIX = PREFIX + 'core#';
	var DOMAINTYPES_PREFIX = PREFIX + 'domainTypes#';

	/**
	 * @ignore
	 */
	function assert(condition, message) {
	  if (!condition) {
	    message = message || 'Assertion failed';
	    throw new Error(message);
	  }
	}

	/**
	 * @ignore
	 */
	function shallowcopy(obj) {
	  var copy = Object.create(Object.getPrototypeOf(obj));
	  for (var prop in obj) {
	    copy[prop] = obj[prop];
	  }
	  return copy;
	}

	/**
	 * Extracts all the directly included namespaces from the `@context` field,
	 * not following remote JSON-LD contexts.
	 * 
	 * @ignore
	 * @param doc A JSON-LD document. 
	 * @returns {Map<string,string>} 
	 */
	function getNamespacePrefixes(doc) {
	  var context = doc['@context'];
	  if (!context) {
	    return;
	  }
	  if (!Array.isArray(context)) {
	    context = [context];
	  }
	  var prefixes = new Map();
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = context[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var item = _step.value;

	      if (typeof item === 'string') {
	        continue;
	      }
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = Object.keys(item)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var key = _step2.value;

	          if (typeof item[key] === 'string') {
	            prefixes.set(key, item[key]);
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return prefixes;
	}

	var MEDIATYPE = {
	  COVJSON: 'application/prs.coverage+json',
	  JSONLD: 'application/ld+json',
	  JSON: 'application/json',
	  TEXT: 'text/plain'
	};

	var COVJSON_PROFILE_STANDALONE = CORE_PREFIX + 'standalone';

	/**
	 * Returns an Accept header value for requesting CoverageJSON documents.
	 * 
	 * @param {bool} standalone Whether to include the standalone profile of CoverageJSON or not.
	 */
	function getAcceptHeader(standalone) {
	  var covjsonProfile = standalone ? '; profile="' + COVJSON_PROFILE_STANDALONE + '"' : '';
	  var accept = MEDIATYPE.COVJSON + covjsonProfile + '; q=1.0, ' + MEDIATYPE.JSONLD + '; q=0.1, ' + MEDIATYPE.JSON + '; q=0.1';
	  return accept;
	}

	/**
	 * See reader.js#load for docs.
	 * 
	 * Browser implementation.
	 */
	function load$1(url) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var responseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'arraybuffer';

	  if (['arraybuffer', 'text'].indexOf(responseType) === -1) {
	    throw new Error();
	  }
	  var headers = options.headers || {};
	  return new Promise(function (resolve, reject) {
	    var req = new XMLHttpRequest();
	    req.open('GET', url);
	    req.responseType = responseType;
	    var accept = getAcceptHeader(options.eagerload);
	    req.setRequestHeader('Accept', accept);
	    if (headers) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.keys(headers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var header = _step.value;

	          req.setRequestHeader(header, headers[header]);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }

	    req.addEventListener('load', function () {
	      try {
	        if (!(req.status >= 200 && req.status < 300 || req.status === 304)) {
	          // as in jquery
	          reject(new Error('Resource "' + url + '" not found, HTTP status code: ' + req.status));
	          return;
	        }

	        var data = void 0;
	        if (responseType === 'arraybuffer') {
	          if (window.TextDecoder) {
	            var t0 = new Date();
	            data = JSON.parse(new TextDecoder().decode(new DataView(req.response)));
	            console.log('JSON decoding: ' + (new Date() - t0) + 'ms');
	          } else {
	            // load again (from cache) to get correct response type
	            // Note we use 'text' and not 'json' as we want to throw parsing errors.
	            // With 'json', the response is just 'null'.
	            reject({ responseType: 'text' });
	            return;
	          }
	        } else {
	          var _t = new Date();
	          data = JSON.parse(req.response);
	          console.log('JSON decoding (slow path): ' + (new Date() - _t) + 'ms');
	        }
	        var responseHeaders = parseResponseHeaders(req.getAllResponseHeaders());
	        resolve({
	          data: data,
	          headers: responseHeaders
	        });
	      } catch (e) {
	        reject(e);
	      }
	    });
	    req.addEventListener('error', function () {
	      reject(new Error('Network error loading resource at ' + url));
	    });

	    req.send();
	  }).catch(function (e) {
	    if (e.responseType) {
	      return load$1(url, headers, e.responseType);
	    } else {
	      throw e;
	    }
	  });
	}

	/**
	 * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
	 * headers according to the format described here:
	 * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
	 * This method parses that string into a user-friendly key/value pair object.
	 * Header names are lower-cased.
	 * 
	 * https://gist.github.com/monsur/706839
	 */
	function parseResponseHeaders(headerStr) {
	  var headers = {};
	  if (!headerStr) {
	    return headers;
	  }
	  var headerPairs = headerStr.split('\r\n');
	  for (var i = 0; i < headerPairs.length; i++) {
	    var headerPair = headerPairs[i];
	    // Can't use split() here because it does the wrong thing
	    // if the header value has the string ": " in it.
	    var index = headerPair.indexOf(': ');
	    if (index > 0) {
	      var key = headerPair.substring(0, index).toLowerCase();
	      var val = headerPair.substring(index + 2);
	      headers[key] = val;
	    }
	  }
	  return headers;
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var asyncGenerator = function () {
	  function AwaitValue(value) {
	    this.value = value;
	  }

	  function AsyncGenerator(gen) {
	    var front, back;

	    function send(key, arg) {
	      return new Promise(function (resolve, reject) {
	        var request = {
	          key: key,
	          arg: arg,
	          resolve: resolve,
	          reject: reject,
	          next: null
	        };

	        if (back) {
	          back = back.next = request;
	        } else {
	          front = back = request;
	          resume(key, arg);
	        }
	      });
	    }

	    function resume(key, arg) {
	      try {
	        var result = gen[key](arg);
	        var value = result.value;

	        if (value instanceof AwaitValue) {
	          Promise.resolve(value.value).then(function (arg) {
	            resume("next", arg);
	          }, function (arg) {
	            resume("throw", arg);
	          });
	        } else {
	          settle(result.done ? "return" : "normal", result.value);
	        }
	      } catch (err) {
	        settle("throw", err);
	      }
	    }

	    function settle(type, value) {
	      switch (type) {
	        case "return":
	          front.resolve({
	            value: value,
	            done: true
	          });
	          break;

	        case "throw":
	          front.reject(value);
	          break;

	        default:
	          front.resolve({
	            value: value,
	            done: false
	          });
	          break;
	      }

	      front = front.next;

	      if (front) {
	        resume(front.key, front.arg);
	      } else {
	        back = null;
	      }
	    }

	    this._invoke = send;

	    if (typeof gen.return !== "function") {
	      this.return = undefined;
	    }
	  }

	  if (typeof Symbol === "function" && Symbol.asyncIterator) {
	    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
	      return this;
	    };
	  }

	  AsyncGenerator.prototype.next = function (arg) {
	    return this._invoke("next", arg);
	  };

	  AsyncGenerator.prototype.throw = function (arg) {
	    return this._invoke("throw", arg);
	  };

	  AsyncGenerator.prototype.return = function (arg) {
	    return this._invoke("return", arg);
	  };

	  return {
	    wrap: function (fn) {
	      return function () {
	        return new AsyncGenerator(fn.apply(this, arguments));
	      };
	    },
	    await: function (value) {
	      return new AwaitValue(value);
	    }
	  };
	}();

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	/** 
	 * Wraps a CoverageJSON Coverage object as a Coverage API object.
	 * 
	 * @see https://github.com/Reading-eScience-Centre/coverage-jsapi
	 */

	var Coverage = function () {

	  /**
	   * Create a Coverage instance.
	   * 
	   * @param {Object} covjson A CoverageJSON Coverage object.
	   * @param {Object} [options] 
	   * @param {boolean} [options.cacheRanges]
	   *   If true, then any range that was loaded remotely is cached.
	   *   (The domain is always cached.)
	   * @param {Array} [options.referencing]
	   *   Referencing info to use (e.g. from containing collection).                        
	   */
	  function Coverage(covjson, options) {
	    classCallCheck(this, Coverage);

	    this._covjson = covjson;

	    /**
	     * The constant "Coverage".
	     * 
	     * @type {string}
	     */
	    this.type = covutils.COVERAGE;

	    /**
	     * JSON-LD document
	     * 
	     * @type {Object}
	     */
	    this.ld = {};

	    this._exposeLd(covjson);

	    this.prefixes = getNamespacePrefixes(this.ld);

	    /**
	     * The options object that was passed in to the constructor. 
	     * 
	     * @type {Object} 
	     */
	    this.options = options ? shallowcopy(options) : {};

	    /** 
	     * ID of the coverage.
	     * 
	     * @type {string|undefined} 
	     */
	    this.id = covjson.id;

	    /**
	     * A Map from key to {@link Parameter} object.
	     * The key is a short alias of a {@link Parameter}, typically what is called a "variable name" or similar.
	     * 
	     * @type {Map<string,Parameter>}
	     */
	    this.parameters = new Map();
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = Object.keys(covjson.parameters)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var key = _step.value;

	        transformParameter(covjson.parameters, key);
	        this.parameters.set(key, covjson.parameters[key]);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    var domainType = void 0;
	    if (typeof this._covjson.domain === 'string') {
	      domainType = this._covjson.domainType;
	    } else {
	      domainType = this._covjson.domain.domainType || this._covjson.domainType;
	    }
	    if (domainType && domainType.indexOf(':') === -1) {
	      domainType = DOMAINTYPES_PREFIX + domainType;
	    }

	    /**
	     * If defined, then the coverage has a domain that follows the given domain type,
	     * either a full URI or a namespace-prefixed term. (See .prefixes)
	     *  
	     * @type {string|undefined} 
	     */
	    this.domainType = domainType;

	    this._updateLoadStatus();
	  }

	  createClass(Coverage, [{
	    key: '_updateLoadStatus',
	    value: function _updateLoadStatus() {
	      var _this = this;

	      var isLoaded = function isLoaded(prop) {
	        return (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object';
	      };
	      var domainLoaded = isLoaded(this._covjson.domain);
	      var rangesLoaded = Object.keys(this._covjson.ranges).every(function (key) {
	        return isLoaded(_this._covjson.ranges[key]);
	      });

	      /**
	       * A boolean which indicates whether all coverage data is already loaded in memory.
	       * If true then this typically means that calls to .loadDomain(), .loadRange(),
	       * .loadRanges(), .subsetByIndex(), and .subsetByValue() will not invoke a network request.
	       * 
	       * @type {boolean}
	       */
	      this.loaded = domainLoaded && rangesLoaded;
	    }
	  }, {
	    key: '_exposeLd',
	    value: function _exposeLd(covjson) {
	      if (!covjson['@context']) {
	        // no LD love here...
	        return;
	      }
	      // make a deep copy since the object gets modified in-place later
	      // but first, remove domain and range which may be embedded
	      var copy = shallowcopy(covjson);
	      delete copy.domain;
	      delete copy.ranges;
	      this.ld = JSON.parse(JSON.stringify(copy));
	    }

	    /**
	     * Returns a Promise succeeding with a {@link Domain} object.
	     * 
	     * @return {Promise<Domain>}
	     */

	  }, {
	    key: 'loadDomain',
	    value: function loadDomain() {
	      var _this2 = this;

	      var domainOrUrl = this._covjson.domain;
	      if (this._domainPromise) return this._domainPromise;
	      var promise = void 0;
	      if ((typeof domainOrUrl === 'undefined' ? 'undefined' : _typeof(domainOrUrl)) === 'object') {
	        var domain = domainOrUrl;
	        transformDomain(domain, this.options.referencing, this.domainType);
	        promise = Promise.resolve(domain);
	      } else {
	        var url = domainOrUrl;
	        promise = load$1(url).then(function (result) {
	          var domain = result.data;
	          transformDomain(domain, _this2.options.referencing, _this2.domainType);
	          _this2._covjson.domain = domain;
	          _this2._updateLoadStatus();
	          return domain;
	        });
	      }
	      /* The promise gets cached so that the domain is not loaded twice remotely.
	       * This might otherwise happen when loadDomain and loadRange is used
	       * with Promise.all(). Remember that loadRange also invokes loadDomain.
	       */
	      this._domainPromise = promise;
	      return promise;
	    }

	    /**
	     * Returns a Promise succeeding with a {@link Range} object.
	     * 
	     * Note that this method implicitly loads the domain as well. 
	     * 
	     * @example
	     * cov.loadRange('salinity').then(function (sal) {
	     *   // work with Range object
	     * }).catch(function (e) {
	     *   // there was an error when loading the range
	     *   console.log(e.message)
	     * }) 
	     * @param {string} paramKey The key of the Parameter for which to load the range.
	     * @return {Promise<Range>} A Promise object which loads the requested range data and succeeds with a Range object.
	     */

	  }, {
	    key: 'loadRange',
	    value: function loadRange(paramKey) {
	      return loadRangeFn(this)(paramKey);
	    }

	    /**
	     * Returns the requested range data as a Promise.
	     * 
	     * Note that this method implicitly loads the domain as well. 
	     * 
	     * @example
	     * cov.loadRanges(['salinity','temp']).then(function (ranges) {
	     *   // work with Map object
	     *   console.log(ranges.get('salinity').values)
	     * }).catch(function (e) {
	     *   // there was an error when loading the range data
	     *   console.log(e)
	     * }) 
	     * @param {iterable<string>} [paramKeys] An iterable of parameter keys for which to load the range data. If not given, loads all range data.
	     * @return {Promise<Map<string,Range>>} A Promise object which loads the requested range data and succeeds with a Map object.
	     */

	  }, {
	    key: 'loadRanges',
	    value: function loadRanges(paramKeys) {
	      return loadRangesFn(this)(paramKeys);
	    }

	    /**
	     * Returns a Promise object which provides a copy of this Coverage object
	     * with the domain subsetted by the given indices specification.
	     * 
	     * Note that the coverage type and/or domain type of the resulting coverage
	     * may be different than in the original coverage.
	     * 
	     * Note that the subsetted ranges are a view over the original ranges, meaning
	     * that no copying is done but also no memory is released if the original
	     * coverage is garbage collected.
	     * 
	     * @example
	     * cov.subsetByIndex({t: 4, z: {start: 10, stop: 20} }).then(function(subsetCov) {
	     *   // work with subsetted coverage
	     * })
	     * @param {Object} constraints An object which describes the subsetting constraints.
	     *   Every property of it refers to an axis name as defined in Domain.names,
	     *   and its value must either be an integer
	     *   or an object with start, stop, and optionally step (defaults to 1) properties
	     *   whose values are integers.
	     *   Properties that have the values undefined or null are ignored. 
	     *   All integers must be non-negative, step must not be zero.
	     *   An integer constrains the axis to the given index,
	     *   a start/stop/step object to a range of indices:
	     *   If step=1, this includes all indices starting at start and ending at stop (exclusive);
	     *   if step>1, all indices start, start + step, ..., start + (q + r - 1) step where 
	     *   q and r are the quotient and remainder obtained by dividing stop - start by step.
	     * @returns {Promise<Coverage>} A Promise object with the subsetted coverage object as result.
	     */

	  }, {
	    key: 'subsetByIndex',
	    value: function subsetByIndex(constraints) {
	      return subsetByIndexFn(this)(constraints);
	    }

	    /**
	     * Returns a Promise object which provides a copy of this Coverage object
	     * with the domain subsetted by the given value specification.
	     * 
	     * Note that the coverage type and/or domain type of the resulting coverage
	     * may be different than in the original coverage.
	     * 
	     * Note that the subsetted ranges are a view over the original ranges, meaning
	     * that no copying is done but also no memory is released if the original
	     * coverage is garbage collected.
	     * 
	     * @example
	     * cov.subsetByValue({
	     *   t: '2015-01-01T01:00:00',
	     *   z: {start: -10, stop: -5} 
	     * }).then(function(subsetCov) {
	     *   // work with subsetted coverage
	     * })
	     * @example
	     * cov.subsetByValue({z: {target: -10} }).then(function(subsetCov) {
	     *   // work with subsetted coverage
	     * }
	     * @param {Object} constraints An object which describes the subsetting constraints.
	     *  Every property of it refers to an axis name as defined in Domain.names,
	     *  and its value must either be a number or string, or,
	     *  if the axis has an ordering relation, an object with start and stop properties
	     *  whose values are numbers or strings, or an object with a target property
	     *  whose value is a number or string.
	     *  Properties that have the values undefined or null are ignored.
	     *  A number or string constrains the axis to exactly the given value,
	     *  a start/stop object to the values intersecting the extent,
	     *  and a target object to the value closest to the given value.
	     * @returns {Promise<Coverage>} A Promise object with the subsetted coverage object as result.
	     */

	  }, {
	    key: 'subsetByValue',
	    value: function subsetByValue(constraints) {
	      return covutils.subsetByValue(this, constraints);
	    }
	  }]);
	  return Coverage;
	}();

	function getRangeAxisOrder(domain, range) {
	  if (!domain) {
	    return range._axisNames;
	  }
	  // backwards-compatibility, in the future the range always has an explicit axis ordering
	  var needsRangeAxisOrder = [].concat(toConsumableArray(domain.axes.values())).filter(function (axis) {
	    return axis.values.length > 1;
	  }).length > 1;

	  // domain is checked for backwards-compatibility
	  var axisOrder = domain._rangeAxisOrder || range._axisNames;
	  if (needsRangeAxisOrder && !axisOrder) {
	    throw new Error('Range axis order missing');
	  }
	  axisOrder = axisOrder || [].concat(toConsumableArray(domain.axes.keys()));
	  return axisOrder;
	}

	function getRangeShapeArray(domain, range) {
	  if (!domain) {
	    return range._shape;
	  }
	  // mostly backwards-compatibility, in the future this just returns range._shape
	  var axisOrder = getRangeAxisOrder(domain, range);
	  var shape = axisOrder.map(function (k) {
	    return domain.axes.get(k).values.length;
	  });
	  if (range._shape) {
	    var matchesDomain = range._shape.length === shape.length && range._shape.every(function (v, i) {
	      return v === shape[i];
	    });
	    if (!matchesDomain) {
	      throw new Error('range.shape must match domain axis sizes');
	    }
	  }
	  return shape;
	}

	function loadRangesFn(cov) {
	  return function (paramKeys) {
	    if (paramKeys === undefined) paramKeys = cov.parameters.keys();
	    paramKeys = Array.from(paramKeys);
	    return Promise.all(paramKeys.map(function (k) {
	      return cov.loadRange(k);
	    })).then(function (ranges) {
	      var map = new Map();
	      for (var i = 0; i < paramKeys.length; i++) {
	        map.set(paramKeys[i], ranges[i]);
	      }
	      return map;
	    });
	  };
	}

	function loadRangeFn(cov, globalConstraints) {
	  return function (paramKey) {
	    // Since the shape of the range array is derived from the domain, it has to be loaded as well.
	    return cov.loadDomain().then(function () {
	      var rangeOrUrl = cov._covjson.ranges[paramKey];
	      if ((typeof rangeOrUrl === 'undefined' ? 'undefined' : _typeof(rangeOrUrl)) === 'object') {
	        var rawRange = rangeOrUrl;
	        // we need the original domain here, not a potentially subsetted one,
	        // therefore we access cov._covjson directly
	        // this legacy code will disappear once the old range format is not supported anymore
	        return doLoadRange(cov, paramKey, rawRange, cov._covjson.domain, globalConstraints);
	      } else {
	        var url = rangeOrUrl;
	        return load$1(url).then(function (result) {
	          var rawRange = result.data;
	          return doLoadRange(cov, paramKey, rawRange, cov._covjson.domain, globalConstraints);
	        });
	      }
	    });
	  };
	}

	function doLoadRange(cov, paramKey, range, domain) {
	  var globalConstraints = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

	  globalConstraints = covutils.normalizeIndexSubsetConstraints(domain, globalConstraints);

	  if (range.type === 'NdArray' || range.type === 'Range') {
	    // if an NdArray, then we modify it in-place (only done the first time)
	    transformNdArrayRange(range, domain);
	    if (cov.options.cacheRanges) {
	      cov._covjson.ranges[paramKey] = range;
	      cov._updateLoadStatus();
	    }

	    var newrange = subsetNdArrayRangeByIndex(range, domain, globalConstraints);
	    return Promise.resolve(newrange);
	  } else if (range.type === 'TiledNdArray') {
	    return loadTiledNdArraySubset(range, globalConstraints);
	  } else {
	    throw new Error('Unsupported: ' + range.type);
	  }
	}

	/**
	 * 
	 * @param {object} range TiledNdArray range object
	 * @param {object} constraints subsetting constraints
	 * @returns {Promise<Range>}
	 */
	function loadTiledNdArraySubset(range, constraints) {
	  var constraintsArr = range.axisNames.map(function (name) {
	    return constraints[name];
	  });

	  // step 1: select tileset with least network effort
	  var fillNulls = function fillNulls(tileShape) {
	    return tileShape.map(function (v, i) {
	      return v === null ? range.shape[i] : v;
	    });
	  };
	  var tilesetsStats = range.tileSets.map(function (ts) {
	    return getTilesetStats(fillNulls(ts.tileShape), constraintsArr);
	  });
	  var idxBestTileset = indexOfBestTileset(tilesetsStats);
	  var tileset = range.tileSets[idxBestTileset];
	  var urlTemplate = template.parse(tileset.urlTemplate);
	  var tileShape = fillNulls(tileset.tileShape);

	  // step 2: determine the tiles to load
	  var subsetTilesetAxes = [];
	  for (var ax = 0; ax < tileShape.length; ax++) {
	    var _constraintsArr$ax = constraintsArr[ax];
	    var start = _constraintsArr$ax.start;
	    var stop = _constraintsArr$ax.stop;
	    var step = _constraintsArr$ax.step;

	    var tileSize = tileShape[ax];

	    // the indices of the first and last tile containing the subsetting constraints
	    var tileStart = Math.floor(start / tileSize); // inclusive
	    var tileStop = Math.ceil(stop / tileSize); // exclusive

	    var tilesetAxis = [];
	    for (var t = tileStart; t < tileStop; t++) {
	      var mid = (t + 0.5) * tileSize;
	      // regard the subset constraint as a list of [x,y) half-closed intervals and find out where 'mid' falls into
	      var iv = Math.floor((mid - start) / step);

	      // start and end point of the interval in range index space
	      var ivStart = start + iv * step;
	      var ivStop = start + (iv + 1) * step;

	      // tile start and end in range index space
	      var tileStartR = t * tileSize;
	      var tileStopR = (t + 1) * tileSize;

	      // check if the start or end point of the interval lies within the tile
	      if (ivStart >= tileStartR || tileStopR <= ivStop) {
	        tilesetAxis.push(t);
	      }
	    }
	    subsetTilesetAxes.push(tilesetAxis);
	  }

	  var tiles = cartesianProduct(subsetTilesetAxes);
	  var subsetShape = constraintsArr.map(function (_ref) {
	    var start = _ref.start;
	    var stop = _ref.stop;
	    var step = _ref.step;
	    return Math.floor((stop - start) / step) + (stop - start) % step;
	  });

	  function getTileUrl(tile) {
	    var tileUrlVars = {};
	    tile.forEach(function (v, i) {
	      return tileUrlVars[range.axisNames[i]] = v;
	    });
	    return urlTemplate.expand(tileUrlVars);
	  }

	  // step 3a: check if only a single tile will be loaded and avoid copying data around in that case
	  if (tiles.length === 1 && subsetShape.every(function (v, i) {
	    return v === tileShape[i];
	  })) {
	    var url = getTileUrl(tiles[0]);
	    return load$1(url).then(function (result) {
	      var tileRange = result.data;
	      transformNdArrayRange(tileRange);
	      return tileRange;
	    });
	  } else {
	    var _ret = function () {
	      // step 3b: create an empty ndarray of the subset shape that will be filled with tile data
	      var subsetSize = subsetShape.reduce(function (l, r) {
	        return l * r;
	      });
	      var subsetNdArr = ndarray$1(new Array(subsetSize), subsetShape);

	      // step 4: load tiles and fill subset ndarray
	      var promises = tiles.map(function (tile) {
	        var url = getTileUrl(tile);
	        return load$1(url).then(function (result) {
	          var tileRange = result.data;
	          transformNdArrayRange(tileRange);

	          // figure out which parts of the tile to copy into which part of the final ndarray
	          var tileOffsets = tile.map(function (v, i) {
	            return v * tileShape[i];
	          });

	          // iterate all tile values and for each check if they are part of the subset
	          // TODO this code is probably quite slow, consider pre-compiling etc
	          //      -> use ndarray-ops#assign for fast copies
	          var tileAxesSubsetIndices = [];
	          for (var _ax = 0; _ax < tileShape.length; _ax++) {
	            var _constraintsArr$_ax = constraintsArr[_ax];
	            var start = _constraintsArr$_ax.start;
	            var stop = _constraintsArr$_ax.stop;
	            var step = _constraintsArr$_ax.step;

	            var tileAxisSize = tileShape[_ax];
	            var tileAxisOffset = tileOffsets[_ax];
	            var tileAxisSubsetIndices = [];
	            var startIdx = 0;
	            if (tileAxisOffset < start) {
	              startIdx = start - tileAxisOffset;
	            }
	            var stopIdx = tileAxisSize;
	            if (tileAxisOffset + stopIdx > stop) {
	              stopIdx = stop - tileAxisOffset;
	            }

	            for (var i = startIdx; i < stopIdx; i++) {
	              var idx = tileAxisOffset + i;
	              if ((idx - start) % step === 0) {
	                tileAxisSubsetIndices.push(i);
	              }
	            }
	            tileAxesSubsetIndices.push(tileAxisSubsetIndices);
	          }
	          var tileSubsetIndices = cartesianProduct(tileAxesSubsetIndices);
	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;

	          try {
	            for (var _iterator2 = tileSubsetIndices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var _tileRange$_ndarr;

	              var tileInd = _step2.value;

	              var val = (_tileRange$_ndarr = tileRange._ndarr).get.apply(_tileRange$_ndarr, toConsumableArray(tileInd));
	              var subsetInd = tileInd.map(function (i, ax) {
	                var idx = tileOffsets[ax] + i;
	                return Math.floor((idx - constraintsArr[ax].start) / constraintsArr[ax].step);
	              });
	              subsetNdArr.set.apply(subsetNdArr, toConsumableArray(subsetInd).concat([val]));
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }
	        });
	      });

	      // step 5: create and return the new range
	      return {
	        v: Promise.all(promises).then(function () {
	          var newrange = {
	            dataType: range.dataType,
	            get: createRangeGetFunction(subsetNdArr, range.axisNames),
	            _ndarr: subsetNdArr,
	            _axisNames: range.axisNames,
	            _shape: subsetShape
	          };
	          newrange.shape = new Map(range.axisNames.map(function (v, i) {
	            return [v, subsetNdArr.shape[i]];
	          }));
	          return newrange;
	        })
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}

	/**
	 * Return the cartesian product of the given arrays.
	 * 
	 * @see http://stackoverflow.com/a/36234242
	 */
	function cartesianProduct(arr) {
	  return arr.reduce(function (a, b) {
	    return a.map(function (x) {
	      return b.map(function (y) {
	        return x.concat(y);
	      });
	    }).reduce(function (a, b) {
	      return a.concat(b);
	    }, []);
	  }, [[]]);
	}

	/**
	 * Returns the number of tiles and values that have to be loaded, given a set of subsetting constraints.
	 * 
	 * @param {Array<number>} tileShape
	 * @param {Array<object>} constraints - start/stop/step subset constraints for each axis, stop is exclusive
	 * @returns {number}
	 */
	function getTilesetStats(tileShape, constraints) {
	  var tileCount = 1;
	  for (var i = 0; i < tileShape.length; i++) {
	    var _constraints$i = constraints[i];
	    var start = _constraints$i.start;
	    var stop = _constraints$i.stop;
	    var step = _constraints$i.step;

	    var tileSize = tileShape[i];

	    // the indices of the first and last tile containing the subsetting constraints
	    var tileStart = Math.floor(start / tileSize); // inclusive
	    var tileStop = Math.ceil(stop / tileSize); // exclusive

	    // total number of values within the tiles containing the subsetting constraints
	    var nvalues = tileSize * (tileStop - tileStart);

	    // number of tiles that intersect with the subsetting constraints
	    tileCount *= Math.ceil(nvalues / Math.max(step, tileSize));
	  }
	  // the value count is an upper bound as it doesn't account for edge tiles that may be smaller
	  var valueCount = tileCount * tileShape.reduce(function (l, r) {
	    return l * r;
	  });

	  return { tileCount: tileCount, valueCount: valueCount };
	}

	/**
	 * Returns the index of the tileset with minimum network effort based on the given tileset statistics.
	 * Effort here means a combination of number of requested tiles and values.
	 * 
	 * @param {Array<object>} tilesetsStats
	 * @returns {number} index of the tileset with minimum network effort
	 */
	function indexOfBestTileset(tilesetsStats) {
	  // one tile request shall have an equal effort as receiving 1000 values
	  var tileValueRatio = 1000;
	  var efforts = tilesetsStats.map(function (s) {
	    return s.tileCount + s.valueCount / tileValueRatio;
	  });
	  var minEffortIdx = efforts.reduce(function (imin, x, i, arr) {
	    return x < arr[imin] ? i : imin;
	  }, 0);
	  return minEffortIdx;
	}

	function subsetNdArrayRangeByIndex(range, domain, constraints) {
	  var _ndarr$hi$lo, _ndarr$hi;

	  var ndarr = range._ndarr;

	  // fast ndarray view
	  var axisNames = getRangeAxisOrder(domain, range);
	  var los = axisNames.map(function (name) {
	    return constraints[name].start;
	  });
	  var his = axisNames.map(function (name) {
	    return constraints[name].stop;
	  });
	  var steps = axisNames.map(function (name) {
	    return constraints[name].step;
	  });
	  var newndarr = (_ndarr$hi$lo = (_ndarr$hi = ndarr.hi.apply(ndarr, toConsumableArray(his))).lo.apply(_ndarr$hi, toConsumableArray(los))).step.apply(_ndarr$hi$lo, toConsumableArray(steps));

	  var newrange = {
	    dataType: range.dataType,
	    get: createRangeGetFunction(newndarr, axisNames),
	    _ndarr: newndarr,
	    _axisNames: axisNames,
	    _shape: newndarr.shape
	  };
	  newrange.shape = new Map(axisNames.map(function (v, i) {
	    return [v, newndarr.shape[i]];
	  }));
	  return newrange;
	}

	function subsetByIndexFn(cov, globalConstraints) {
	  return function (constraints) {
	    return cov.loadDomain().then(function (domain) {
	      constraints = covutils.normalizeIndexSubsetConstraints(domain, constraints);
	      var newdomain = covutils.subsetDomainByIndex(domain, constraints);

	      var newGlobalConstraints = toGlobalSubsetConstraints(constraints, globalConstraints);

	      // backwards-compatibility
	      if (domain._rangeAxisOrder) {
	        newdomain._rangeAxisOrder = domain._rangeAxisOrder;
	      }

	      // assemble everything to a new coverage
	      var newcov = {
	        _covjson: cov._covjson,
	        options: cov.options,
	        type: covutils.COVERAGE,
	        // TODO are the profiles still valid?
	        domainProfiles: cov.domainProfiles,
	        domainType: cov.domainType,
	        parameters: cov.parameters,
	        loadDomain: function loadDomain() {
	          return Promise.resolve(newdomain);
	        }
	      };
	      newcov.loadRange = loadRangeFn(newcov, newGlobalConstraints);
	      newcov.loadRanges = loadRangesFn(newcov);
	      newcov.subsetByIndex = subsetByIndexFn(newcov, newGlobalConstraints);
	      newcov.subsetByValue = covutils.subsetByValue.bind(null, newcov);
	      return newcov;
	    });
	  };
	}

	/**
	 * Currently unused, but may need in future.
	 * This determines the best array type for categorical data which
	 * doesn't have missing values.
	 */
	/*
	function arrayType (validMin, validMax) {
	  let type
	  if (validMin !== undefined) {
	    if (validMin >= 0) {
	      if (validMax < Math.pow(2,8)) {
	        type = Uint8Array
	      } else if (validMax < Math.pow(2,16)) {
	        type = Uint16Array
	      } else if (validMax < Math.pow(2,32)) {
	        type = Uint32Array
	      } else {
	        type = Array
	      }
	    } else {
	      let max = Math.max(Math.abs(validMin), validMax)
	      if (max < Math.pow(2,8)) {
	        type = Int8Array
	      } else if (validMax < Math.pow(2,16)) {
	        type = Int16Array
	      } else if (validMax < Math.pow(2,32)) {
	        type = Int32Array
	      } else {
	        type = Array
	      }
	    }
	  } else {
	    type = Array
	  }
	  return type
	}
	*/

	/**
	 * Transforms a CoverageJSON parameter to the Coverage API format, that is,
	 * some elements are converted from objects to Maps. Transformation is made in-place.
	 * 
	 * @param {Object} param The original parameter.
	 * @access private
	 */
	function transformParameter(params, key) {
	  if ('__transformDone' in params[key]) return;
	  var param = params[key];
	  param.key = key;
	  if (param.unit) {
	    if (typeof param.unit.symbol === 'string') {
	      param.unit.symbol = {
	        value: param.unit.symbol
	        // no type member, since the scheme is unknown
	      };
	    }
	  }
	  if (param.categoryEncoding) {
	    var map = new Map();
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	      for (var _iterator3 = Object.keys(param.categoryEncoding)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var category = _step3.value;

	        var vals = param.categoryEncoding[category];
	        if (!Array.isArray(vals)) {
	          vals = [vals];
	        }
	        map.set(category, vals);
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }

	    param.categoryEncoding = map;
	  }
	  param.__transformDone = true;
	}

	/**
	 * Transforms a CoverageJSON NdArray range to the Coverage API format. Transformation is made in-place.
	 * 
	 * @param {Object} range The original NdArray range.
	 * @param {Object} [domain] The CoverageJSON domain object. 
	 * @return {Object} The transformed range.
	 */
	function transformNdArrayRange(range, domain) {
	  if ('__transformDone' in range) return;

	  var values = range.values;

	  if (range.actualMin === undefined) {
	    var _minMax = covutils.minMax(values);

	    var _minMax2 = slicedToArray(_minMax, 2);

	    var min = _minMax2[0];
	    var max = _minMax2[1];

	    if (min !== null) {
	      range.actualMin = min;
	      range.actualMax = max;
	    }
	  }

	  // store the array as we will expose a Map on range.shape in the next step
	  if (range.shape) {
	    range._shape = range.shape;
	  }
	  if (range.axisNames) {
	    // not part of public API
	    range._axisNames = range.axisNames;
	    delete range.axisNames;
	  }

	  var axisNames = getRangeAxisOrder(domain, range);
	  var shapeArr = getRangeShapeArray(domain, range);

	  var ndarr = ndarray$1(values, shapeArr);
	  range._ndarr = ndarr;
	  range.get = createRangeGetFunction(ndarr, axisNames);
	  range.shape = new Map(axisNames.map(function (v, i) {
	    return [v, shapeArr[i]];
	  }));

	  range.__transformDone = true;
	  return range;
	}

	/**
	 * 
	 * @param axisOrder An array of axis names.
	 * @returns Function
	 */
	function createRangeGetFunction(ndarr, axisOrder) {
	  // see below for slower reference version
	  var ndargs = '';
	  for (var i = 0; i < axisOrder.length; i++) {
	    if (ndargs) ndargs += ',';
	    ndargs += '\'' + axisOrder[i] + '\' in obj ? obj[\'' + axisOrder[i] + '\'] : 0';
	  }
	  var fn = new Function('ndarr', 'return function ndarrget (obj) { return ndarr.get(' + ndargs + ') }')(ndarr);
	  return fn;
	}

	/*
	 * Reference version of createRangeGetFunction().
	 * Around 50% slower (on Chrome 46) compared to precompiled version.
	 * 
	function createRangeGetFunction (ndarr, axisOrder) {
	  axisOrder = axisOrder.slice() // help the JIT (possibly..)
	  const axisCount = axisOrder.length
	  return obj => {
	    let indices = new Array(axisCount)
	    for (let i=0; i < axisCount; i++) {
	      indices[i] = axisOrder[i] in obj ? obj[axisOrder[i]] : 0
	    }
	    return ndarr.get(...indices)
	  }
	}
	*/

	/**
	 * Transforms a CoverageJSON domain to the Coverage API format.
	 * Transformation is made in-place.
	 * 
	 * @param {Object} domain The original domain object.
	 * @param {Array} [referencing] Referencing info to inject.
	 * @return {Object} The transformed domain object.
	 * @access private
	 */
	function transformDomain(domain, referencing, domainType) {
	  if ('__transformDone' in domain) return;

	  domainType = domain.domainType || domainType;
	  if (domainType && domainType.indexOf(':') === -1) {
	    domainType = DOMAINTYPES_PREFIX + domainType;
	  }
	  domain.domainType = domainType;

	  var axes = new Map(); // axis name -> axis object

	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;

	  try {
	    for (var _iterator4 = Object.keys(domain.axes)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var axisName = _step4.value;

	      axes.set(axisName, domain.axes[axisName]);
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }

	  domain.axes = axes;

	  // expand start/stop/num regular axes
	  // replace 1D numeric axis arrays with typed arrays for efficiency
	  var _iteratorNormalCompletion5 = true;
	  var _didIteratorError5 = false;
	  var _iteratorError5 = undefined;

	  try {
	    for (var _iterator5 = axes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	      var _step5$value = slicedToArray(_step5.value, 2);

	      var key = _step5$value[0];
	      var axis = _step5$value[1];

	      axis.key = key;

	      if (axis.dataType && axis.dataType.indexOf(':') === -1) {
	        axis.dataType = CORE_PREFIX + axis.dataType;
	      }

	      // TODO remove this if-block later, just here for backwards-compatibility 
	      if (axis.components) {
	        axis.coordinates = axis.components;
	      }

	      if (!axis.coordinates) {
	        axis.coordinates = [key];
	      }

	      // TODO remove this line later, just here for backwards-compatibility 
	      axis.components = axis.coordinates;

	      if ('start' in axis && 'stop' in axis && 'num' in axis) {
	        var arr = new Float64Array(axis.num);
	        var step = void 0;
	        if (axis.num === 1) {
	          if (axis.start !== axis.stop) {
	            throw new Error('regular axis of length 1 must have equal start/stop values');
	          }
	          step = 0;
	        } else {
	          step = (axis.stop - axis.start) / (axis.num - 1);
	        }
	        for (var i = 0; i < axis.num; i++) {
	          arr[i] = axis.start + i * step;
	        }

	        axis.values = arr;
	        delete axis.start;
	        delete axis.stop;
	        delete axis.num;
	      }

	      if (Array.isArray(axis.values) && typeof axis.values[0] === 'number') {
	        var _arr = new Float64Array(axis.values.length);
	        for (var _i = 0; _i < axis.values.length; _i++) {
	          _arr[_i] = axis.values[_i];
	        }
	        axis.values = _arr;
	      }

	      axis.bounds = wrapBounds(axis);
	    }
	  } catch (err) {
	    _didIteratorError5 = true;
	    _iteratorError5 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion5 && _iterator5.return) {
	        _iterator5.return();
	      }
	    } finally {
	      if (_didIteratorError5) {
	        throw _iteratorError5;
	      }
	    }
	  }

	  if (referencing) {
	    domain.referencing = referencing;
	  }

	  // TODO remove this later, just here for backwards-compatibility 
	  var _iteratorNormalCompletion6 = true;
	  var _didIteratorError6 = false;
	  var _iteratorError6 = undefined;

	  try {
	    for (var _iterator6 = domain.referencing[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	      var obj = _step6.value;

	      if (obj.components) {
	        obj.coordinates = obj.components;
	      }
	    }
	  } catch (err) {
	    _didIteratorError6 = true;
	    _iteratorError6 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion6 && _iterator6.return) {
	        _iterator6.return();
	      }
	    } finally {
	      if (_didIteratorError6) {
	        throw _iteratorError6;
	      }
	    }
	  }

	  if (domain.rangeAxisOrder) {
	    domain._rangeAxisOrder = domain.rangeAxisOrder;
	    delete domain.rangeAxisOrder;
	  }

	  domain.__transformDone = true;

	  return domain;
	}

	/**
	 * Applies the local index subset constraints to the existing global constraints.
	 * Both constraint objects must be normalized, that is, must contain the same axes
	 * as start/stop/step objects.
	 * 
	 * @example
	 * var local = {x: {start: 0, stop: 50, step: 2}}
	 * var global = {x: {start: 500, stop: 1000}}
	 * var newGlobal = toGlobalSubsetConstraints(local, global)
	 * // newGlobal == {x: {start: 500, stop: 550, step: 2}}
	 * 
	 * @example
	 * var local = {x: {start: 5, stop: 10, step: 2}} // 5, 7, 9
	 * var global = {x: {start: 500, stop: 1000, step: 10}} // 500, 510, 520,...
	 * var newGlobal = toGlobalSubsetConstraints(local, global) 
	 * // newGlobal == {x: {start: 550, stop: 600, step: 20}} // 550, 570, 590
	 */
	function toGlobalSubsetConstraints(localConstraints) {
	  var globalConstraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var res = {};
	  var _iteratorNormalCompletion7 = true;
	  var _didIteratorError7 = false;
	  var _iteratorError7 = undefined;

	  try {
	    for (var _iterator7 = Object.keys(localConstraints)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	      var axis = _step7.value;

	      var local = localConstraints[axis];

	      var _ref2 = globalConstraints[axis] || {};

	      var _ref2$start = _ref2.start;
	      var globalStart = _ref2$start === undefined ? 0 : _ref2$start;
	      var _ref2$step = _ref2.step;
	      var globalStep = _ref2$step === undefined ? 1 : _ref2$step;

	      res[axis] = {
	        start: globalStart + globalStep * local.start,
	        stop: globalStart + globalStep * local.stop,
	        step: globalStep * local.step
	      };
	    }
	  } catch (err) {
	    _didIteratorError7 = true;
	    _iteratorError7 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion7 && _iterator7.return) {
	        _iterator7.return();
	      }
	    } finally {
	      if (_didIteratorError7) {
	        throw _iteratorError7;
	      }
	    }
	  }

	  return res;
	}

	function wrapBounds(axis) {
	  if (axis.bounds) {
	    var _ret2 = function () {
	      var bounds = axis.bounds;
	      return {
	        v: {
	          get: function get(i) {
	            return [bounds[2 * i], bounds[2 * i + 1]];
	          }
	        }
	      };
	    }();

	    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	  }
	}

	/** 
	 * Wraps a CoverageJSON Collection object as a CoverageCollection API object.
	 * 
	 * @see https://github.com/Reading-eScience-Centre/coverage-jsapi
	 * 
	 */

	var CoverageCollection = function () {
	  /**
	   * @param {Object} covjson The CoverageJSON Collection document.
	   */
	  function CoverageCollection(covjson) {
	    classCallCheck(this, CoverageCollection);

	    /**
	     * The constant "CoverageCollection".
	     * 
	     * @type {string}
	     */
	    this.type = covutils.COVERAGECOLLECTION;

	    /**
	     * JSON-LD document
	     * 
	     * @type {Object}
	     */
	    this.ld = {};

	    this._exposeLd(covjson);

	    this.prefixes = getNamespacePrefixes(this.ld);

	    /** 
	     * ID of the coverage collection.
	     * 
	     * @type {string|undefined} 
	     */
	    this.id = covjson.id;

	    var domainType = covjson.domainType;
	    if (domainType && domainType.indexOf(':') === -1) {
	      domainType = DOMAINTYPES_PREFIX + domainType;
	    }

	    /**
	     * If defined, every coverage in the collection has the given domain type, typically a URI.
	     * 
	     * @type {string|undefined}
	     */
	    this.domainType = domainType;

	    var covs = [];
	    var rootParams = covjson.parameters ? covjson.parameters : {};
	    // generate local parameter IDs if not existing
	    // this is to keep track of same parameters when copied into the coverages
	    // (e.g. to synchronize legends etc.)
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = Object.keys(rootParams)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _key = _step.value;

	        var param = rootParams[_key];
	        if (!param.id) {
	          param.id = Math.round(new Date().getTime() * Math.random()).toString();
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    var covOptions = {};
	    if (covjson.referencing) {
	      covOptions.referencing = covjson.referencing;
	    }
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = covjson.coverages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var coverage = _step2.value;

	        if (!coverage.domainType) {
	          coverage.domainType = domainType;
	        }
	        if (!coverage.parameters) {
	          coverage.parameters = {};
	        }
	        var _iteratorNormalCompletion4 = true;
	        var _didIteratorError4 = false;
	        var _iteratorError4 = undefined;

	        try {
	          for (var _iterator4 = Object.keys(rootParams)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	            var _key2 = _step4.value;

	            if (_key2 in coverage.ranges) {
	              coverage.parameters[_key2] = rootParams[_key2];
	            }
	          }
	        } catch (err) {
	          _didIteratorError4 = true;
	          _iteratorError4 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	              _iterator4.return();
	            }
	          } finally {
	            if (_didIteratorError4) {
	              throw _iteratorError4;
	            }
	          }
	        }

	        if (covjson['@context']) {
	          coverage['@context'] = covjson['@context'];
	        }
	        covs.push(new Coverage(coverage, covOptions));
	      }

	      /** 
	       * The Coverages of this collection.
	       * 
	       * @type {Array<Coverage>} 
	       */
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }

	    this.coverages = covs;
	    if (covjson.parameters) {
	      /**
	       * A Map from key to {@link Parameter} object.
	       * The key is a short alias of a {@link Parameter}, typically what is called a "variable name" or similar.
	       * 
	       * @type {Map<string,Parameter>}
	       */
	      this.parameters = new Map();
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = Object.keys(covjson.parameters)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var key = _step3.value;

	          transformParameter(covjson.parameters, key);
	          this.parameters.set(key, covjson.parameters[key]);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	    if (covjson.domainTemplate) {
	      transformDomain(covjson.domainTemplate);
	      /**
	       * @ignore
	       */
	      this.domainTemplate = covjson.domainTemplate;
	    }
	  }

	  /**
	   * 
	   * @return {CollectionQuery}
	   */


	  createClass(CoverageCollection, [{
	    key: 'query',
	    value: function query() {
	      return new covutils.CollectionQuery(this);
	    }
	  }, {
	    key: '_exposeLd',
	    value: function _exposeLd(covjson) {
	      if (!covjson['@context']) {
	        // no LD love here...
	        return;
	      }
	      // make a deep copy since the object gets modified in-place later
	      // but first, remove the coverages (those have their own .ld property)
	      var copy = shallowcopy(covjson);
	      delete copy.coverages;
	      this.ld = JSON.parse(JSON.stringify(copy));
	    }
	  }]);
	  return CoverageCollection;
	}();

	/**
	 * Loads a CoverageJSON document from a given URL and returns a {@link Promise} object
	 * that succeeds with the unmodified CoverageJSON object.
	 * 
	 * @param {string} url The URL to load the CoverageJSON document from.
	 * @param {Object} [options] An options object. 
	 * @param {Object} [options.headers] Additional HTTP headers to send if input is a URL.
	 * @param {Object} [options.eagerload]
	 *   Request a stand-alone CoverageJSON document (with domain and ranges embedded) if input is a URL.
	 *   Note that the server may ignore that preference.
	 * @return {Promise}
	 *   A Promise succeeding with an object <code>{data, headers}</code> where data is the CoverageJSON object
	 *   and headers are the HTTP response headers with lower-cased header names as object keys.
	 *   The promise fails if the resource at the given URL is not a valid JSON or CBOR document. 
	 */
	function load(url, options) {
	  return load$1(url, options);
	}

	/**
	 * Reads a CoverageJSON document and returns a {@link Promise} that succeeds with
	 * a Domain, {@link Coverage}, or {@link CoverageCollection} object.
	 * 
	 * Note that if the document references external domain or range documents,
	 * then these are not loaded immediately. 
	 * 
	 * 
	 * @example
	 * CovJSON.read('http://example.com/coverage.covjson').then(function (cov) {
	 *   // work with Coverage data object
	 * }).catch(function (e) {
	 *   // there was an error when loading the coverage data
	 *   console.log(e)
	 * })
	 * @param {Object|string} input 
	 *    A CoverageJSON Domain, Coverage, or Coverage Collection document, as URL or object.
	 * @param {Object} [options]
	 *   An options object. 
	 * @param {Object} [options.headers]
	 *   Additional HTTP headers to send if input is a URL.
	 * @param {Object} [options.eagerload]
	 *   Request a stand-alone CoverageJSON document (with domain and ranges embedded) if input is a URL.
	 *   Note that the server may ignore that preference. 
	 * @return {Promise} 
	 *    A promise object succeeding with a Domain, {@link Coverage}, or {@link CoverageCollection} object,
	 *    and failing with an {@link Error} object.
	 */
	function read(input) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
	    return Promise.resolve().then(function () {
	      return transformCovJSON(input);
	    });
	  } else {
	    return load(input, options).then(function (_ref) {
	      var data = _ref.data;
	      var headers = _ref.headers;
	      return transformCovJSON(data, headers);
	    });
	  }
	}

	/**
	 * Transforms a CoverageJSON object into one or more Coverage objects.
	 *  
	 * @param {object} obj A CoverageJSON object of type Coverage or CoverageCollection.
	 * @param {array} headers An optional array of HTTP headers. Keys are lower-cased header names.
	 * @return {Coverage|Array of Coverage}
	 */
	function transformCovJSON(obj, headers) {
	  checkValidCovJSON(obj);
	  if ([covutils.COVERAGE, covutils.COVERAGECOLLECTION, covutils.DOMAIN].indexOf(obj.type) === -1) {
	    throw new Error('CoverageJSON document must be of Coverage, CoverageCollection, or Domain type');
	  }

	  var result = void 0;
	  if (obj.type === covutils.DOMAIN) {
	    transformDomain(obj);
	    result = obj;
	  } else if (obj.type === covutils.COVERAGE) {
	    result = new Coverage(obj);
	  } else {
	    result = new CoverageCollection(obj);
	  }

	  if (obj.type === covutils.COVERAGE || obj.type === covutils.COVERAGECOLLECTION) {
	    addLinkRelations(result, headers);
	  }

	  return result;
	}

	/**
	 * Scans the supplied HTTP headers for Link relations and adds them
	 * to the .ld property of the Coverage/CoverageCollection.
	 */
	function addLinkRelations(cov, headers) {
	  if (!headers || !headers['link']) {
	    return;
	  }

	  var ld = cov.ld;

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = headers['link'].split(',')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var link = _step.value;

	      link = link.trim();
	      // FIXME this will fail if the URL contains a ";" which is valid (see RFC5988)
	      var parts = link.split(';');
	      var url = parts[0].substr(1, parts[0].length - 2);
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = parts.slice(1)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var param = _step2.value;

	          var relStart = param.indexOf('rel=');
	          if (relStart === -1) {
	            continue;
	          }
	          var rel = param.substring(relStart + 5, param.length - 1);
	          if (!rel.startsWith('http://') && !rel.startsWith('https://')) {
	            rel = LINKRELPREFIX + rel;
	          }
	          if (ld[rel]) {
	            if (Array.isArray(ld[rel])) {
	              ld[rel].push(url);
	            } else {
	              ld[rel] = [ld[rel], url];
	            }
	          } else {
	            ld[rel] = url;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

	/**
	 * Performs basic structural checks to validate whether a given object is a CoverageJSON object.
	 * 
	 * Note that this method is not comprehensive and should not be used for checking
	 * whether an object fully conforms to the CoverageJSON specification.
	 * 
	 * @param obj
	 * @throws {Error} when obj is not a valid CoverageJSON document 
	 */
	function checkValidCovJSON(obj) {
	  assert('type' in obj, '"type" missing');
	  if (obj.type === covutils.COVERAGE) {
	    assert('parameters' in obj, '"parameters" missing');
	    assert('domain' in obj, '"domain" missing');
	    assert('ranges' in obj, '"ranges" missing');
	  } else if (obj.type === covutils.COVERAGECOLLECTION) {
	    assert(Array.isArray(obj.coverages), '"coverages" must be an array');
	  }
	}

	exports.load = load;
	exports.read = read;

}((this.CovJSON = this.CovJSON || {}),CovUtils));
//# sourceMappingURL=covjson-reader.src.js.map