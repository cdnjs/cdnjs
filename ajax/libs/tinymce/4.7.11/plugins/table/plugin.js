(function () {
var table = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var noop = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      x[_i] = arguments[_i];
    }
  };
  var noarg = function (f) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never = constant(false);
  var always = constant(true);
  var $_20nfr6k7jfuw8q4g = {
    noop: noop,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never,
    always: always
  };

  var never$1 = $_20nfr6k7jfuw8q4g.never;
  var always$1 = $_20nfr6k7jfuw8q4g.always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop = function () {
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never$1,
      isSome: never$1,
      isNone: always$1,
      getOr: id,
      getOrThunk: call,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      or: id,
      orThunk: call,
      map: none,
      ap: none,
      each: noop,
      bind: none,
      flatten: none,
      exists: never$1,
      forall: always$1,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: $_20nfr6k7jfuw8q4g.constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always$1,
      isNone: never$1,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never$1, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var Option = {
    some: some,
    none: none,
    from: from
  };

  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var $_g6mvnrk8jfuw8q4k = {
    isString: isType('string'),
    isObject: isType('object'),
    isArray: isType('array'),
    isNull: isType('null'),
    isBoolean: isType('boolean'),
    isUndefined: isType('undefined'),
    isFunction: isType('function'),
    isNumber: isType('number')
  };

  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var indexOf = function (xs, x) {
    var r = rawIndexOf(xs, x);
    return r === -1 ? Option.none() : Option.some(r);
  };
  var contains = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var exists = function (xs, pred) {
    return findIndex(xs, pred).isSome();
  };
  var range = function (num, f) {
    var r = [];
    for (var i = 0; i < num; i++) {
      r.push(f(i));
    }
    return r;
  };
  var chunk = function (array, size) {
    var r = [];
    for (var i = 0; i < array.length; i += size) {
      var s = array.slice(i, i + size);
      r.push(s);
    }
    return r;
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var eachr = function (xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var partition = function (xs, pred) {
    var pass = [];
    var fail = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      var arr = pred(x, i, xs) ? pass : fail;
      arr.push(x);
    }
    return {
      pass: pass,
      fail: fail
    };
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var groupBy = function (xs, f) {
    if (xs.length === 0) {
      return [];
    } else {
      var wasType = f(xs[0]);
      var r = [];
      var group = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var type = f(x);
        if (type !== wasType) {
          r.push(group);
          group = [];
        }
        wasType = type;
        group.push(x);
      }
      if (group.length !== 0) {
        r.push(group);
      }
      return r;
    }
  };
  var foldr = function (xs, f, acc) {
    eachr(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var foldl = function (xs, f, acc) {
    each(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(i);
      }
    }
    return Option.none();
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var push = Array.prototype.push;
  var flatten = function (xs) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!Array.prototype.isPrototypeOf(xs[i]))
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      push.apply(r, xs[i]);
    }
    return r;
  };
  var bind = function (xs, f) {
    var output = map(xs, f);
    return flatten(output);
  };
  var forall = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      var x = xs[i];
      if (pred(x, i, xs) !== true) {
        return false;
      }
    }
    return true;
  };
  var equal = function (a1, a2) {
    return a1.length === a2.length && forall(a1, function (x, i) {
      return x === a2[i];
    });
  };
  var slice = Array.prototype.slice;
  var reverse = function (xs) {
    var r = slice.call(xs, 0);
    r.reverse();
    return r;
  };
  var difference = function (a1, a2) {
    return filter(a1, function (x) {
      return !contains(a2, x);
    });
  };
  var mapToObject = function (xs, f) {
    var r = {};
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      r[String(x)] = f(x, i);
    }
    return r;
  };
  var pure = function (x) {
    return [x];
  };
  var sort = function (xs, comparator) {
    var copy = slice.call(xs, 0);
    copy.sort(comparator);
    return copy;
  };
  var head = function (xs) {
    return xs.length === 0 ? Option.none() : Option.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? Option.none() : Option.some(xs[xs.length - 1]);
  };
  var from$1 = $_g6mvnrk8jfuw8q4k.isFunction(Array.from) ? Array.from : function (x) {
    return slice.call(x);
  };
  var $_tyr3yk5jfuw8q47 = {
    map: map,
    each: each,
    eachr: eachr,
    partition: partition,
    filter: filter,
    groupBy: groupBy,
    indexOf: indexOf,
    foldr: foldr,
    foldl: foldl,
    find: find,
    findIndex: findIndex,
    flatten: flatten,
    bind: bind,
    forall: forall,
    exists: exists,
    contains: contains,
    equal: equal,
    reverse: reverse,
    chunk: chunk,
    difference: difference,
    mapToObject: mapToObject,
    pure: pure,
    sort: sort,
    range: range,
    head: head,
    last: last,
    from: from$1
  };

  var keys = function () {
    var fastKeys = Object.keys;
    var slowKeys = function (o) {
      var r = [];
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          r.push(i);
        }
      }
      return r;
    };
    return fastKeys === undefined ? slowKeys : fastKeys;
  }();
  var each$1 = function (obj, f) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      f(x, i, obj);
    }
  };
  var objectMap = function (obj, f) {
    return tupleMap(obj, function (x, i, obj) {
      return {
        k: i,
        v: f(x, i, obj)
      };
    });
  };
  var tupleMap = function (obj, f) {
    var r = {};
    each$1(obj, function (x, i) {
      var tuple = f(x, i, obj);
      r[tuple.k] = tuple.v;
    });
    return r;
  };
  var bifilter = function (obj, pred) {
    var t = {};
    var f = {};
    each$1(obj, function (x, i) {
      var branch = pred(x, i) ? t : f;
      branch[i] = x;
    });
    return {
      t: t,
      f: f
    };
  };
  var mapToArray = function (obj, f) {
    var r = [];
    each$1(obj, function (value, name) {
      r.push(f(value, name));
    });
    return r;
  };
  var find$1 = function (obj, pred) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      if (pred(x, i, obj)) {
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_11yiupkajfuw8q5c = {
    bifilter: bifilter,
    each: each$1,
    map: objectMap,
    mapToArray: mapToArray,
    tupleMap: tupleMap,
    find: find$1,
    keys: keys,
    values: values,
    size: size
  };

  function Immutable () {
    var fields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      fields[_i] = arguments[_i];
    }
    return function () {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      if (fields.length !== values.length) {
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      }
      var struct = {};
      $_tyr3yk5jfuw8q47.each(fields, function (name, i) {
        struct[name] = $_20nfr6k7jfuw8q4g.constant(values[i]);
      });
      return struct;
    };
  }

  var sort$1 = function (arr) {
    return arr.slice(0).sort();
  };
  var reqMessage = function (required, keys) {
    throw new Error('All required keys (' + sort$1(required).join(', ') + ') were not specified. Specified keys were: ' + sort$1(keys).join(', ') + '.');
  };
  var unsuppMessage = function (unsupported) {
    throw new Error('Unsupported keys for object: ' + sort$1(unsupported).join(', '));
  };
  var validateStrArr = function (label, array) {
    if (!$_g6mvnrk8jfuw8q4k.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_tyr3yk5jfuw8q47.each(array, function (a) {
      if (!$_g6mvnrk8jfuw8q4k.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_tyr3yk5jfuw8q47.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_2j2nzkkejfuw8q5j = {
    sort: sort$1,
    reqMessage: reqMessage,
    unsuppMessage: unsuppMessage,
    validateStrArr: validateStrArr,
    invalidTypeMessage: invalidTypeMessage,
    checkDupes: checkDupes
  };

  function MixedBag (required, optional) {
    var everything = required.concat(optional);
    if (everything.length === 0)
      throw new Error('You must specify at least one required or optional field.');
    $_2j2nzkkejfuw8q5j.validateStrArr('required', required);
    $_2j2nzkkejfuw8q5j.validateStrArr('optional', optional);
    $_2j2nzkkejfuw8q5j.checkDupes(everything);
    return function (obj) {
      var keys = $_11yiupkajfuw8q5c.keys(obj);
      var allReqd = $_tyr3yk5jfuw8q47.forall(required, function (req) {
        return $_tyr3yk5jfuw8q47.contains(keys, req);
      });
      if (!allReqd)
        $_2j2nzkkejfuw8q5j.reqMessage(required, keys);
      var unsupported = $_tyr3yk5jfuw8q47.filter(keys, function (key) {
        return !$_tyr3yk5jfuw8q47.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_2j2nzkkejfuw8q5j.unsuppMessage(unsupported);
      var r = {};
      $_tyr3yk5jfuw8q47.each(required, function (req) {
        r[req] = $_20nfr6k7jfuw8q4g.constant(obj[req]);
      });
      $_tyr3yk5jfuw8q47.each(optional, function (opt) {
        r[opt] = $_20nfr6k7jfuw8q4g.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]) : Option.none());
      });
      return r;
    };
  }

  var $_5now9kbjfuw8q5e = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var dimensions = $_5now9kbjfuw8q5e.immutable('width', 'height');
  var grid = $_5now9kbjfuw8q5e.immutable('rows', 'columns');
  var address = $_5now9kbjfuw8q5e.immutable('row', 'column');
  var coords = $_5now9kbjfuw8q5e.immutable('x', 'y');
  var detail = $_5now9kbjfuw8q5e.immutable('element', 'rowspan', 'colspan');
  var detailnew = $_5now9kbjfuw8q5e.immutable('element', 'rowspan', 'colspan', 'isNew');
  var extended = $_5now9kbjfuw8q5e.immutable('element', 'rowspan', 'colspan', 'row', 'column');
  var rowdata = $_5now9kbjfuw8q5e.immutable('element', 'cells', 'section');
  var elementnew = $_5now9kbjfuw8q5e.immutable('element', 'isNew');
  var rowdatanew = $_5now9kbjfuw8q5e.immutable('element', 'cells', 'section', 'isNew');
  var rowcells = $_5now9kbjfuw8q5e.immutable('cells', 'section');
  var rowdetails = $_5now9kbjfuw8q5e.immutable('details', 'section');
  var bounds = $_5now9kbjfuw8q5e.immutable('startRow', 'startCol', 'finishRow', 'finishCol');
  var $_ce5pyrkgjfuw8q5v = {
    dimensions: dimensions,
    grid: grid,
    address: address,
    coords: coords,
    extended: extended,
    detail: detail,
    detailnew: detailnew,
    rowdata: rowdata,
    elementnew: elementnew,
    rowdatanew: rowdatanew,
    rowcells: rowcells,
    rowdetails: rowdetails,
    bounds: bounds
  };

  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
    return { dom: $_20nfr6k7jfuw8q4g.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_xbeoqkkjfuw8q73 = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_x3hpikljfuw8q78 = {
    ATTRIBUTE: 2,
    CDATA_SECTION: 4,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    ELEMENT: 1,
    TEXT: 3,
    PROCESSING_INSTRUCTION: 7,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    NOTATION: 12
  };

  var ELEMENT = $_x3hpikljfuw8q78.ELEMENT;
  var DOCUMENT = $_x3hpikljfuw8q78.DOCUMENT;
  var is = function (element, selector) {
    var elem = element.dom();
    if (elem.nodeType !== ELEMENT)
      return false;
    else if (elem.matches !== undefined)
      return elem.matches(selector);
    else if (elem.msMatchesSelector !== undefined)
      return elem.msMatchesSelector(selector);
    else if (elem.webkitMatchesSelector !== undefined)
      return elem.webkitMatchesSelector(selector);
    else if (elem.mozMatchesSelector !== undefined)
      return elem.mozMatchesSelector(selector);
    else
      throw new Error('Browser lacks native selectors');
  };
  var bypassSelector = function (dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0;
  };
  var all = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? [] : $_tyr3yk5jfuw8q47.map(base.querySelectorAll(selector), $_xbeoqkkjfuw8q73.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map($_xbeoqkkjfuw8q73.fromDom);
  };
  var $_enn9uikjjfuw8q6w = {
    all: all,
    is: is,
    one: one
  };

  var toArray = function (target, f) {
    var r = [];
    var recurse = function (e) {
      r.push(e);
      return f(e);
    };
    var cur = f(target);
    do {
      cur = cur.bind(recurse);
    } while (cur.isSome());
    return r;
  };
  var $_myhefknjfuw8q7m = { toArray: toArray };

  var global$1 = typeof window !== 'undefined' ? window : Function('return this;')();

  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : global$1;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var step = function (o, part) {
    if (o[part] === undefined || o[part] === null)
      o[part] = {};
    return o[part];
  };
  var forge = function (parts, target) {
    var o = target !== undefined ? target : global$1;
    for (var i = 0; i < parts.length; ++i)
      o = step(o, parts[i]);
    return o;
  };
  var namespace = function (name, target) {
    var parts = name.split('.');
    return forge(parts, target);
  };
  var $_1but6zkrjfuw8q81 = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_1but6zkrjfuw8q81.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_3og7cjkqjfuw8q7y = { getOrDie: getOrDie };

  var node = function () {
    var f = $_3og7cjkqjfuw8q7y.getOrDie('Node');
    return f;
  };
  var compareDocumentPosition = function (a, b, match) {
    return (a.compareDocumentPosition(b) & match) !== 0;
  };
  var documentPositionPreceding = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
  };
  var documentPositionContainedBy = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
  };
  var $_3crkomkpjfuw8q7x = {
    documentPositionPreceding: documentPositionPreceding,
    documentPositionContainedBy: documentPositionContainedBy
  };

  var cached = function (f) {
    var called = false;
    var r;
    return function () {
      if (!called) {
        called = true;
        r = f.apply(null, arguments);
      }
      return r;
    };
  };
  var $_cfqymdkujfuw8q85 = { cached: cached };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$2 = function (regexes, agent) {
    var r = firstMatch(regexes, agent);
    if (!r)
      return {
        major: 0,
        minor: 0
      };
    var group = function (i) {
      return Number(agent.replace(r, '$' + i));
    };
    return nu(group(1), group(2));
  };
  var detect = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0)
      return unknown();
    return find$2(versionRegexes, cleanedAgent);
  };
  var unknown = function () {
    return nu(0, 0);
  };
  var nu = function (major, minor) {
    return {
      major: major,
      minor: minor
    };
  };
  var $_yulx6kxjfuw8q8c = {
    nu: nu,
    detect: detect,
    unknown: unknown
  };

  var edge = 'Edge';
  var chrome = 'Chrome';
  var ie = 'IE';
  var opera = 'Opera';
  var firefox = 'Firefox';
  var safari = 'Safari';
  var isBrowser = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$1 = function () {
    return nu$1({
      current: undefined,
      version: $_yulx6kxjfuw8q8c.unknown()
    });
  };
  var nu$1 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isEdge: isBrowser(edge, current),
      isChrome: isBrowser(chrome, current),
      isIE: isBrowser(ie, current),
      isOpera: isBrowser(opera, current),
      isFirefox: isBrowser(firefox, current),
      isSafari: isBrowser(safari, current)
    };
  };
  var $_1x5z0nkwjfuw8q88 = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_20nfr6k7jfuw8q4g.constant(edge),
    chrome: $_20nfr6k7jfuw8q4g.constant(chrome),
    ie: $_20nfr6k7jfuw8q4g.constant(ie),
    opera: $_20nfr6k7jfuw8q4g.constant(opera),
    firefox: $_20nfr6k7jfuw8q4g.constant(firefox),
    safari: $_20nfr6k7jfuw8q4g.constant(safari)
  };

  var windows = 'Windows';
  var ios = 'iOS';
  var android = 'Android';
  var linux = 'Linux';
  var osx = 'OSX';
  var solaris = 'Solaris';
  var freebsd = 'FreeBSD';
  var isOS = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$2 = function () {
    return nu$2({
      current: undefined,
      version: $_yulx6kxjfuw8q8c.unknown()
    });
  };
  var nu$2 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isWindows: isOS(windows, current),
      isiOS: isOS(ios, current),
      isAndroid: isOS(android, current),
      isOSX: isOS(osx, current),
      isLinux: isOS(linux, current),
      isSolaris: isOS(solaris, current),
      isFreeBSD: isOS(freebsd, current)
    };
  };
  var $_87zg95kyjfuw8q8d = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_20nfr6k7jfuw8q4g.constant(windows),
    ios: $_20nfr6k7jfuw8q4g.constant(ios),
    android: $_20nfr6k7jfuw8q4g.constant(android),
    linux: $_20nfr6k7jfuw8q4g.constant(linux),
    osx: $_20nfr6k7jfuw8q4g.constant(osx),
    solaris: $_20nfr6k7jfuw8q4g.constant(solaris),
    freebsd: $_20nfr6k7jfuw8q4g.constant(freebsd)
  };

  function DeviceType (os, browser, userAgent) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isAndroid3 = os.isAndroid() && os.version.major === 3;
    var isAndroid4 = os.isAndroid() && os.version.major === 4;
    var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
    var isTouch = os.isiOS() || os.isAndroid();
    var isPhone = isTouch && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    return {
      isiPad: $_20nfr6k7jfuw8q4g.constant(isiPad),
      isiPhone: $_20nfr6k7jfuw8q4g.constant(isiPhone),
      isTablet: $_20nfr6k7jfuw8q4g.constant(isTablet),
      isPhone: $_20nfr6k7jfuw8q4g.constant(isPhone),
      isTouch: $_20nfr6k7jfuw8q4g.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_20nfr6k7jfuw8q4g.constant(iOSwebview)
    };
  }

  var detect$1 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_tyr3yk5jfuw8q47.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_yulx6kxjfuw8q8c.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_yulx6kxjfuw8q8c.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_62ehlbl0jfuw8q8o = {
    detectBrowser: detectBrowser,
    detectOs: detectOs
  };

  var addToStart = function (str, prefix) {
    return prefix + str;
  };
  var addToEnd = function (str, suffix) {
    return str + suffix;
  };
  var removeFromStart = function (str, numChars) {
    return str.substring(numChars);
  };
  var removeFromEnd = function (str, numChars) {
    return str.substring(0, str.length - numChars);
  };
  var $_1u5wzbl3jfuw8q90 = {
    addToStart: addToStart,
    addToEnd: addToEnd,
    removeFromStart: removeFromStart,
    removeFromEnd: removeFromEnd
  };

  var first = function (str, count) {
    return str.substr(0, count);
  };
  var last$1 = function (str, count) {
    return str.substr(str.length - count, str.length);
  };
  var head$1 = function (str) {
    return str === '' ? Option.none() : Option.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? Option.none() : Option.some(str.substring(1));
  };
  var $_6v04e7l4jfuw8q91 = {
    first: first,
    last: last$1,
    head: head$1,
    tail: tail
  };

  var checkRange = function (str, substr, start) {
    if (substr === '')
      return true;
    if (str.length < substr.length)
      return false;
    var x = str.substr(start, start + substr.length);
    return x === substr;
  };
  var supplant = function (str, obj) {
    var isStringOrNumber = function (a) {
      var t = typeof a;
      return t === 'string' || t === 'number';
    };
    return str.replace(/\${([^{}]*)}/g, function (a, b) {
      var value = obj[b];
      return isStringOrNumber(value) ? value : a;
    });
  };
  var removeLeading = function (str, prefix) {
    return startsWith(str, prefix) ? $_1u5wzbl3jfuw8q90.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_1u5wzbl3jfuw8q90.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_1u5wzbl3jfuw8q90.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_1u5wzbl3jfuw8q90.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_6v04e7l4jfuw8q91.head(str).bind(function (head) {
      return $_6v04e7l4jfuw8q91.tail(str).map(function (tail) {
        return head.toUpperCase() + tail;
      });
    }).getOr(str);
  };
  var startsWith = function (str, prefix) {
    return checkRange(str, prefix, 0);
  };
  var endsWith = function (str, suffix) {
    return checkRange(str, suffix, str.length - suffix.length);
  };
  var trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var lTrim = function (str) {
    return str.replace(/^\s+/g, '');
  };
  var rTrim = function (str) {
    return str.replace(/\s+$/g, '');
  };
  var $_ey09l9l2jfuw8q8y = {
    supplant: supplant,
    startsWith: startsWith,
    removeLeading: removeLeading,
    removeTrailing: removeTrailing,
    ensureLeading: ensureLeading,
    ensureTrailing: ensureTrailing,
    endsWith: endsWith,
    contains: contains$1,
    trim: trim,
    lTrim: lTrim,
    rTrim: rTrim,
    capitalize: capitalize
  };

  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
  var checkContains = function (target) {
    return function (uastring) {
      return $_ey09l9l2jfuw8q8y.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_ey09l9l2jfuw8q8y.contains(uastring, 'edge/') && $_ey09l9l2jfuw8q8y.contains(uastring, 'chrome') && $_ey09l9l2jfuw8q8y.contains(uastring, 'safari') && $_ey09l9l2jfuw8q8y.contains(uastring, 'applewebkit');
        return monstrosity;
      }
    },
    {
      name: 'Chrome',
      versionRegexes: [
        /.*?chrome\/([0-9]+)\.([0-9]+).*/,
        normalVersionRegex
      ],
      search: function (uastring) {
        return $_ey09l9l2jfuw8q8y.contains(uastring, 'chrome') && !$_ey09l9l2jfuw8q8y.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_ey09l9l2jfuw8q8y.contains(uastring, 'msie') || $_ey09l9l2jfuw8q8y.contains(uastring, 'trident');
      }
    },
    {
      name: 'Opera',
      versionRegexes: [
        normalVersionRegex,
        /.*?opera\/([0-9]+)\.([0-9]+).*/
      ],
      search: checkContains('opera')
    },
    {
      name: 'Firefox',
      versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
      search: checkContains('firefox')
    },
    {
      name: 'Safari',
      versionRegexes: [
        normalVersionRegex,
        /.*?cpu os ([0-9]+)_([0-9]+).*/
      ],
      search: function (uastring) {
        return ($_ey09l9l2jfuw8q8y.contains(uastring, 'safari') || $_ey09l9l2jfuw8q8y.contains(uastring, 'mobile/')) && $_ey09l9l2jfuw8q8y.contains(uastring, 'applewebkit');
      }
    }
  ];
  var oses = [
    {
      name: 'Windows',
      search: checkContains('win'),
      versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'iOS',
      search: function (uastring) {
        return $_ey09l9l2jfuw8q8y.contains(uastring, 'iphone') || $_ey09l9l2jfuw8q8y.contains(uastring, 'ipad');
      },
      versionRegexes: [
        /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        /.*cpu os ([0-9]+)_([0-9]+).*/,
        /.*cpu iphone os ([0-9]+)_([0-9]+).*/
      ]
    },
    {
      name: 'Android',
      search: checkContains('android'),
      versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'OSX',
      search: checkContains('os x'),
      versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    },
    {
      name: 'Linux',
      search: checkContains('linux'),
      versionRegexes: []
    },
    {
      name: 'Solaris',
      search: checkContains('sunos'),
      versionRegexes: []
    },
    {
      name: 'FreeBSD',
      search: checkContains('freebsd'),
      versionRegexes: []
    }
  ];
  var $_6xdjg7l1jfuw8q8s = {
    browsers: $_20nfr6k7jfuw8q4g.constant(browsers),
    oses: $_20nfr6k7jfuw8q4g.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_6xdjg7l1jfuw8q8s.browsers();
    var oses = $_6xdjg7l1jfuw8q8s.oses();
    var browser = $_62ehlbl0jfuw8q8o.detectBrowser(browsers, userAgent).fold($_1x5z0nkwjfuw8q88.unknown, $_1x5z0nkwjfuw8q88.nu);
    var os = $_62ehlbl0jfuw8q8o.detectOs(oses, userAgent).fold($_87zg95kyjfuw8q8d.unknown, $_87zg95kyjfuw8q8d.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_5kufzskvjfuw8q87 = { detect: detect$2 };

  var detect$3 = $_cfqymdkujfuw8q85.cached(function () {
    var userAgent = navigator.userAgent;
    return $_5kufzskvjfuw8q87.detect(userAgent);
  });
  var $_fqgee0ktjfuw8q83 = { detect: detect$3 };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_tyr3yk5jfuw8q47.exists(elements, $_20nfr6k7jfuw8q4g.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_3crkomkpjfuw8q7x.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_fqgee0ktjfuw8q83.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_e8rn66kojfuw8q7n = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_enn9uikjjfuw8q6w.is
  };

  var owner = function (element) {
    return $_xbeoqkkjfuw8q73.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_xbeoqkkjfuw8q73.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_xbeoqkkjfuw8q73.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return Option.from(dom.parentNode).map($_xbeoqkkjfuw8q73.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_tyr3yk5jfuw8q47.findIndex(kin, function (elem) {
        return $_e8rn66kojfuw8q7n.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_g6mvnrk8jfuw8q4k.isFunction(isRoot) ? isRoot : $_20nfr6k7jfuw8q4g.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_xbeoqkkjfuw8q73.fromDom(rawParent);
      ret.push(parent);
      if (stop(parent) === true)
        break;
      else
        dom = rawParent;
    }
    return ret;
  };
  var siblings = function (element) {
    var filterSelf = function (elements) {
      return $_tyr3yk5jfuw8q47.filter(elements, function (x) {
        return !$_e8rn66kojfuw8q7n.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return Option.from(dom.offsetParent).map($_xbeoqkkjfuw8q73.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.previousSibling).map($_xbeoqkkjfuw8q73.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.nextSibling).map($_xbeoqkkjfuw8q73.fromDom);
  };
  var prevSiblings = function (element) {
    return $_tyr3yk5jfuw8q47.reverse($_myhefknjfuw8q7m.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_myhefknjfuw8q7m.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_tyr3yk5jfuw8q47.map(dom.childNodes, $_xbeoqkkjfuw8q73.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return Option.from(children[index]).map($_xbeoqkkjfuw8q73.fromDom);
  };
  var firstChild = function (element) {
    return child(element, 0);
  };
  var lastChild = function (element) {
    return child(element, element.dom().childNodes.length - 1);
  };
  var childNodesCount = function (element) {
    return element.dom().childNodes.length;
  };
  var hasChildNodes = function (element) {
    return element.dom().hasChildNodes();
  };
  var spot = $_5now9kbjfuw8q5e.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_s8scrkmjfuw8q7a = {
    owner: owner,
    defaultView: defaultView,
    documentElement: documentElement,
    parent: parent,
    findIndex: findIndex$1,
    parents: parents,
    siblings: siblings,
    prevSibling: prevSibling,
    offsetParent: offsetParent,
    prevSiblings: prevSiblings,
    nextSibling: nextSibling,
    nextSiblings: nextSiblings,
    children: children,
    child: child,
    firstChild: firstChild,
    lastChild: lastChild,
    childNodesCount: childNodesCount,
    hasChildNodes: hasChildNodes,
    leaf: leaf
  };

  var firstLayer = function (scope, selector) {
    return filterFirstLayer(scope, selector, $_20nfr6k7jfuw8q4g.constant(true));
  };
  var filterFirstLayer = function (scope, selector, predicate) {
    return $_tyr3yk5jfuw8q47.bind($_s8scrkmjfuw8q7a.children(scope), function (x) {
      return $_enn9uikjjfuw8q6w.is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
    });
  };
  var $_2g609akijfuw8q6n = {
    firstLayer: firstLayer,
    filterFirstLayer: filterFirstLayer
  };

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_x3hpikljfuw8q78.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_x3hpikljfuw8q78.ELEMENT);
  var isText = isType$1($_x3hpikljfuw8q78.TEXT);
  var isDocument = isType$1($_x3hpikljfuw8q78.DOCUMENT);
  var $_a8gk30l6jfuw8q9c = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_g6mvnrk8jfuw8q4k.isString(value) || $_g6mvnrk8jfuw8q4k.isBoolean(value) || $_g6mvnrk8jfuw8q4k.isNumber(value)) {
      dom.setAttribute(key, value + '');
    } else {
      console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
      throw new Error('Attribute value was not simple');
    }
  };
  var set = function (element, key, value) {
    rawSet(element.dom(), key, value);
  };
  var setAll = function (element, attrs) {
    var dom = element.dom();
    $_11yiupkajfuw8q5c.each(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has = function (element, key) {
    var dom = element.dom();
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
  };
  var remove = function (element, key) {
    element.dom().removeAttribute(key);
  };
  var hasNone = function (element) {
    var attrs = element.dom().attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
  };
  var clone = function (element) {
    return $_tyr3yk5jfuw8q47.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_a8gk30l6jfuw8q9c.isElement(source) || !$_a8gk30l6jfuw8q9c.isElement(destination))
      return;
    $_tyr3yk5jfuw8q47.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_3q82t2l5jfuw8q93 = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has,
    remove: remove,
    hasNone: hasNone,
    transfer: transfer
  };

  var inBody = function (element) {
    var dom = $_a8gk30l6jfuw8q9c.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_cfqymdkujfuw8q85.cached(function () {
    return getBody($_xbeoqkkjfuw8q73.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_xbeoqkkjfuw8q73.fromDom(body);
  };
  var $_atd1tul9jfuw8q9i = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var all$1 = function (predicate) {
    return descendants($_atd1tul9jfuw8q9i.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_tyr3yk5jfuw8q47.filter($_s8scrkmjfuw8q7a.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_tyr3yk5jfuw8q47.filter($_s8scrkmjfuw8q7a.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_tyr3yk5jfuw8q47.filter($_s8scrkmjfuw8q7a.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_tyr3yk5jfuw8q47.each($_s8scrkmjfuw8q7a.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_4d3nfbl8jfuw8q9f = {
    all: all$1,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$2 = function (selector) {
    return $_enn9uikjjfuw8q6w.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_4d3nfbl8jfuw8q9f.ancestors(scope, function (e) {
      return $_enn9uikjjfuw8q6w.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_4d3nfbl8jfuw8q9f.siblings(scope, function (e) {
      return $_enn9uikjjfuw8q6w.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_4d3nfbl8jfuw8q9f.children(scope, function (e) {
      return $_enn9uikjjfuw8q6w.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_enn9uikjjfuw8q6w.all(selector, scope);
  };
  var $_6c9d0hl7jfuw8q9d = {
    all: all$2,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? Option.some(scope) : $_g6mvnrk8jfuw8q4k.isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_atd1tul9jfuw8q9i.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_g6mvnrk8jfuw8q4k.isFunction(isRoot) ? isRoot : $_20nfr6k7jfuw8q4g.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_xbeoqkkjfuw8q73.fromDom(element);
      if (predicate(el))
        return Option.some(el);
      else if (stop(el))
        break;
    }
    return Option.none();
  };
  var closest = function (scope, predicate, isRoot) {
    var is = function (scope) {
      return predicate(scope);
    };
    return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
  };
  var sibling = function (scope, predicate) {
    var element = scope.dom();
    if (!element.parentNode)
      return Option.none();
    return child$1($_xbeoqkkjfuw8q73.fromDom(element.parentNode), function (x) {
      return !$_e8rn66kojfuw8q7n.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_tyr3yk5jfuw8q47.find(scope.dom().childNodes, $_20nfr6k7jfuw8q4g.compose(predicate, $_xbeoqkkjfuw8q73.fromDom));
    return result.map($_xbeoqkkjfuw8q73.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_xbeoqkkjfuw8q73.fromDom(element.childNodes[i])))
          return Option.some($_xbeoqkkjfuw8q73.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope.dom());
  };
  var $_11ympzlbjfuw8q9n = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var first$2 = function (selector) {
    return $_enn9uikjjfuw8q6w.one(selector);
  };
  var ancestor$1 = function (scope, selector, isRoot) {
    return $_11ympzlbjfuw8q9n.ancestor(scope, function (e) {
      return $_enn9uikjjfuw8q6w.is(e, selector);
    }, isRoot);
  };
  var sibling$1 = function (scope, selector) {
    return $_11ympzlbjfuw8q9n.sibling(scope, function (e) {
      return $_enn9uikjjfuw8q6w.is(e, selector);
    });
  };
  var child$2 = function (scope, selector) {
    return $_11ympzlbjfuw8q9n.child(scope, function (e) {
      return $_enn9uikjjfuw8q6w.is(e, selector);
    });
  };
  var descendant$1 = function (scope, selector) {
    return $_enn9uikjjfuw8q6w.one(selector, scope);
  };
  var closest$1 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_enn9uikjjfuw8q6w.is, ancestor$1, scope, selector, isRoot);
  };
  var $_8wdrbmlajfuw8q9m = {
    first: first$2,
    ancestor: ancestor$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1,
    closest: closest$1
  };

  var lookup = function (tags, element, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_20nfr6k7jfuw8q4g.constant(false);
    if (isRoot(element))
      return Option.none();
    if ($_tyr3yk5jfuw8q47.contains(tags, $_a8gk30l6jfuw8q9c.name(element)))
      return Option.some(element);
    var isRootOrUpperTable = function (element) {
      return $_enn9uikjjfuw8q6w.is(element, 'table') || isRoot(element);
    };
    return $_8wdrbmlajfuw8q9m.ancestor(element, tags.join(','), isRootOrUpperTable);
  };
  var cell = function (element, isRoot) {
    return lookup([
      'td',
      'th'
    ], element, isRoot);
  };
  var cells = function (ancestor) {
    return $_2g609akijfuw8q6n.firstLayer(ancestor, 'th,td');
  };
  var notCell = function (element, isRoot) {
    return lookup([
      'caption',
      'tr',
      'tbody',
      'tfoot',
      'thead'
    ], element, isRoot);
  };
  var neighbours = function (selector, element) {
    return $_s8scrkmjfuw8q7a.parent(element).map(function (parent) {
      return $_6c9d0hl7jfuw8q9d.children(parent, selector);
    });
  };
  var neighbourCells = $_20nfr6k7jfuw8q4g.curry(neighbours, 'th,td');
  var neighbourRows = $_20nfr6k7jfuw8q4g.curry(neighbours, 'tr');
  var firstCell = function (ancestor) {
    return $_8wdrbmlajfuw8q9m.descendant(ancestor, 'th,td');
  };
  var table = function (element, isRoot) {
    return $_8wdrbmlajfuw8q9m.closest(element, 'table', isRoot);
  };
  var row = function (element, isRoot) {
    return lookup(['tr'], element, isRoot);
  };
  var rows = function (ancestor) {
    return $_2g609akijfuw8q6n.firstLayer(ancestor, 'tr');
  };
  var attr = function (element, property) {
    return parseInt($_3q82t2l5jfuw8q93.get(element, property), 10);
  };
  var grid$1 = function (element, rowProp, colProp) {
    var rows = attr(element, rowProp);
    var cols = attr(element, colProp);
    return $_ce5pyrkgjfuw8q5v.grid(rows, cols);
  };
  var $_aqhz9okhjfuw8q5y = {
    cell: cell,
    firstCell: firstCell,
    cells: cells,
    neighbourCells: neighbourCells,
    table: table,
    row: row,
    rows: rows,
    notCell: notCell,
    neighbourRows: neighbourRows,
    attr: attr,
    grid: grid$1
  };

  var fromTable = function (table) {
    var rows = $_aqhz9okhjfuw8q5y.rows(table);
    return $_tyr3yk5jfuw8q47.map(rows, function (row) {
      var element = row;
      var parent = $_s8scrkmjfuw8q7a.parent(element);
      var parentSection = parent.bind(function (parent) {
        var parentName = $_a8gk30l6jfuw8q9c.name(parent);
        return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
      });
      var cells = $_tyr3yk5jfuw8q47.map($_aqhz9okhjfuw8q5y.cells(row), function (cell) {
        var rowspan = $_3q82t2l5jfuw8q93.has(cell, 'rowspan') ? parseInt($_3q82t2l5jfuw8q93.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_3q82t2l5jfuw8q93.has(cell, 'colspan') ? parseInt($_3q82t2l5jfuw8q93.get(cell, 'colspan'), 10) : 1;
        return $_ce5pyrkgjfuw8q5v.detail(cell, rowspan, colspan);
      });
      return $_ce5pyrkgjfuw8q5v.rowdata(element, cells, parentSection);
    });
  };
  var fromPastedRows = function (rows, example) {
    return $_tyr3yk5jfuw8q47.map(rows, function (row) {
      var cells = $_tyr3yk5jfuw8q47.map($_aqhz9okhjfuw8q5y.cells(row), function (cell) {
        var rowspan = $_3q82t2l5jfuw8q93.has(cell, 'rowspan') ? parseInt($_3q82t2l5jfuw8q93.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_3q82t2l5jfuw8q93.has(cell, 'colspan') ? parseInt($_3q82t2l5jfuw8q93.get(cell, 'colspan'), 10) : 1;
        return $_ce5pyrkgjfuw8q5v.detail(cell, rowspan, colspan);
      });
      return $_ce5pyrkgjfuw8q5v.rowdata(row, cells, example.section());
    });
  };
  var $_dy3x0nkfjfuw8q5l = {
    fromTable: fromTable,
    fromPastedRows: fromPastedRows
  };

  var key = function (row, column) {
    return row + ',' + column;
  };
  var getAt = function (warehouse, row, column) {
    var raw = warehouse.access()[key(row, column)];
    return raw !== undefined ? Option.some(raw) : Option.none();
  };
  var findItem = function (warehouse, item, comparator) {
    var filtered = filterItems(warehouse, function (detail) {
      return comparator(item, detail.element());
    });
    return filtered.length > 0 ? Option.some(filtered[0]) : Option.none();
  };
  var filterItems = function (warehouse, predicate) {
    var all = $_tyr3yk5jfuw8q47.bind(warehouse.all(), function (r) {
      return r.cells();
    });
    return $_tyr3yk5jfuw8q47.filter(all, predicate);
  };
  var generate = function (list) {
    var access = {};
    var cells = [];
    var maxRows = list.length;
    var maxColumns = 0;
    $_tyr3yk5jfuw8q47.each(list, function (details, r) {
      var currentRow = [];
      $_tyr3yk5jfuw8q47.each(details.cells(), function (detail, c) {
        var start = 0;
        while (access[key(r, start)] !== undefined) {
          start++;
        }
        var current = $_ce5pyrkgjfuw8q5v.extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
        for (var i = 0; i < detail.colspan(); i++) {
          for (var j = 0; j < detail.rowspan(); j++) {
            var cr = r + j;
            var cc = start + i;
            var newpos = key(cr, cc);
            access[newpos] = current;
            maxColumns = Math.max(maxColumns, cc + 1);
          }
        }
        currentRow.push(current);
      });
      cells.push($_ce5pyrkgjfuw8q5v.rowdata(details.element(), currentRow, details.section()));
    });
    var grid = $_ce5pyrkgjfuw8q5v.grid(maxRows, maxColumns);
    return {
      grid: $_20nfr6k7jfuw8q4g.constant(grid),
      access: $_20nfr6k7jfuw8q4g.constant(access),
      all: $_20nfr6k7jfuw8q4g.constant(cells)
    };
  };
  var justCells = function (warehouse) {
    var rows = $_tyr3yk5jfuw8q47.map(warehouse.all(), function (w) {
      return w.cells();
    });
    return $_tyr3yk5jfuw8q47.flatten(rows);
  };
  var $_2ge24cldjfuw8qa3 = {
    generate: generate,
    getAt: getAt,
    findItem: findItem,
    filterItems: filterItems,
    justCells: justCells
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_b75qp5lfjfuw8qau = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_g6mvnrk8jfuw8q4k.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_b75qp5lfjfuw8qau.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_b75qp5lfjfuw8qau.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$1 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_11yiupkajfuw8q5c.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_11yiupkajfuw8q5c.each(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$1 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_atd1tul9jfuw8q9i.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_b75qp5lfjfuw8qau.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return Option.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_b75qp5lfjfuw8qau.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_xbeoqkkjfuw8q73.fromTag(tag);
    set$1(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$1 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_3q82t2l5jfuw8q93.has(element, 'style') && $_ey09l9l2jfuw8q8y.trim($_3q82t2l5jfuw8q93.get(element, 'style')) === '') {
      $_3q82t2l5jfuw8q93.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_3q82t2l5jfuw8q93.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_3q82t2l5jfuw8q93.remove : $_3q82t2l5jfuw8q93.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_b75qp5lfjfuw8qau.isSupported(sourceDom) && $_b75qp5lfjfuw8qau.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$1(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_a8gk30l6jfuw8q9c.isElement(source) || !$_a8gk30l6jfuw8q9c.isElement(destination))
      return;
    $_tyr3yk5jfuw8q47.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_bfod2hlejfuw8qac = {
    copy: copy,
    set: set$1,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$1,
    get: get$1,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };

  var before = function (marker, element) {
    var parent = $_s8scrkmjfuw8q7a.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_s8scrkmjfuw8q7a.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_s8scrkmjfuw8q7a.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_s8scrkmjfuw8q7a.firstChild(parent);
    firstChild.fold(function () {
      append(parent, element);
    }, function (v) {
      parent.dom().insertBefore(element.dom(), v.dom());
    });
  };
  var append = function (parent, element) {
    parent.dom().appendChild(element.dom());
  };
  var appendAt = function (parent, element, index) {
    $_s8scrkmjfuw8q7a.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_fatuxylgjfuw8qav = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_tyr3yk5jfuw8q47.each(elements, function (x) {
      $_fatuxylgjfuw8qav.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_tyr3yk5jfuw8q47.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_fatuxylgjfuw8qav.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_tyr3yk5jfuw8q47.each(elements.slice().reverse(), function (x) {
      $_fatuxylgjfuw8qav.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_tyr3yk5jfuw8q47.each(elements, function (x) {
      $_fatuxylgjfuw8qav.append(parent, x);
    });
  };
  var $_9zaoqflijfuw8qb0 = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_tyr3yk5jfuw8q47.each($_s8scrkmjfuw8q7a.children(element), function (rogue) {
      remove$2(rogue);
    });
  };
  var remove$2 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_s8scrkmjfuw8q7a.children(wrapper);
    if (children.length > 0)
      $_9zaoqflijfuw8qb0.before(wrapper, children);
    remove$2(wrapper);
  };
  var $_fl1deelhjfuw8qax = {
    empty: empty,
    remove: remove$2,
    unwrap: unwrap
  };

  var stats = $_5now9kbjfuw8q5e.immutable('minRow', 'minCol', 'maxRow', 'maxCol');
  var findSelectedStats = function (house, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    var minRow = totalRows;
    var minCol = totalColumns;
    var maxRow = 0;
    var maxCol = 0;
    $_11yiupkajfuw8q5c.each(house.access(), function (detail) {
      if (isSelected(detail)) {
        var startRow = detail.row();
        var endRow = startRow + detail.rowspan() - 1;
        var startCol = detail.column();
        var endCol = startCol + detail.colspan() - 1;
        if (startRow < minRow)
          minRow = startRow;
        else if (endRow > maxRow)
          maxRow = endRow;
        if (startCol < minCol)
          minCol = startCol;
        else if (endCol > maxCol)
          maxCol = endCol;
      }
    });
    return stats(minRow, minCol, maxRow, maxCol);
  };
  var makeCell = function (list, seenSelected, rowIndex) {
    var row = list[rowIndex].element();
    var td = $_xbeoqkkjfuw8q73.fromTag('td');
    $_fatuxylgjfuw8qav.append(td, $_xbeoqkkjfuw8q73.fromTag('br'));
    var f = seenSelected ? $_fatuxylgjfuw8qav.append : $_fatuxylgjfuw8qav.prepend;
    f(row, td);
  };
  var fillInGaps = function (list, house, stats, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    for (var i = 0; i < totalRows; i++) {
      var seenSelected = false;
      for (var j = 0; j < totalColumns; j++) {
        if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
          var needCell = $_2ge24cldjfuw8qa3.getAt(house, i, j).filter(isSelected).isNone();
          if (needCell)
            makeCell(list, seenSelected, i);
          else
            seenSelected = true;
        }
      }
    }
  };
  var clean = function (table, stats) {
    var emptyRows = $_tyr3yk5jfuw8q47.filter($_2g609akijfuw8q6n.firstLayer(table, 'tr'), function (row) {
      return row.dom().childElementCount === 0;
    });
    $_tyr3yk5jfuw8q47.each(emptyRows, $_fl1deelhjfuw8qax.remove);
    if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
      $_tyr3yk5jfuw8q47.each($_2g609akijfuw8q6n.firstLayer(table, 'th,td'), function (cell) {
        $_3q82t2l5jfuw8q93.remove(cell, 'rowspan');
        $_3q82t2l5jfuw8q93.remove(cell, 'colspan');
      });
    }
    $_3q82t2l5jfuw8q93.remove(table, 'width');
    $_3q82t2l5jfuw8q93.remove(table, 'height');
    $_bfod2hlejfuw8qac.remove(table, 'width');
    $_bfod2hlejfuw8qac.remove(table, 'height');
  };
  var extract = function (table, selectedSelector) {
    var isSelected = function (detail) {
      return $_enn9uikjjfuw8q6w.is(detail.element(), selectedSelector);
    };
    var list = $_dy3x0nkfjfuw8q5l.fromTable(table);
    var house = $_2ge24cldjfuw8qa3.generate(list);
    var stats = findSelectedStats(house, isSelected);
    var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
    var unselectedCells = $_2g609akijfuw8q6n.filterFirstLayer(table, 'th,td', function (cell) {
      return $_enn9uikjjfuw8q6w.is(cell, selector);
    });
    $_tyr3yk5jfuw8q47.each(unselectedCells, $_fl1deelhjfuw8qax.remove);
    fillInGaps(list, house, stats, isSelected);
    clean(table, stats);
    return table;
  };
  var $_bbpooak9jfuw8q4m = { extract: extract };

  var clone$1 = function (original, deep) {
    return $_xbeoqkkjfuw8q73.fromDom(original.dom().cloneNode(deep));
  };
  var shallow = function (original) {
    return clone$1(original, false);
  };
  var deep = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_xbeoqkkjfuw8q73.fromTag(tag);
    var attributes = $_3q82t2l5jfuw8q93.clone(original);
    $_3q82t2l5jfuw8q93.setAll(nu, attributes);
    return nu;
  };
  var copy$1 = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_s8scrkmjfuw8q7a.children(deep(original));
    $_9zaoqflijfuw8qb0.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_fatuxylgjfuw8qav.before(original, nu);
    var children = $_s8scrkmjfuw8q7a.children(original);
    $_9zaoqflijfuw8qb0.append(nu, children);
    $_fl1deelhjfuw8qax.remove(original);
    return nu;
  };
  var $_ddvp06lkjfuw8qbt = {
    shallow: shallow,
    shallowAs: shallowAs,
    deep: deep,
    copy: copy$1,
    mutate: mutate
  };

  function NodeValue (is, name) {
    var get = function (element) {
      if (!is(element))
        throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
      return getOption(element).getOr('');
    };
    var getOptionIE10 = function (element) {
      try {
        return getOptionSafe(element);
      } catch (e) {
        return Option.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? Option.from(element.dom().nodeValue) : Option.none();
    };
    var browser = $_fqgee0ktjfuw8q83.detect().browser;
    var getOption = browser.isIE() && browser.version.major === 10 ? getOptionIE10 : getOptionSafe;
    var set = function (element, value) {
      if (!is(element))
        throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
      element.dom().nodeValue = value;
    };
    return {
      get: get,
      getOption: getOption,
      set: set
    };
  }

  var api = NodeValue($_a8gk30l6jfuw8q9c.isText, 'text');
  var get$2 = function (element) {
    return api.get(element);
  };
  var getOption = function (element) {
    return api.getOption(element);
  };
  var set$2 = function (element, value) {
    api.set(element, value);
  };
  var $_6j8y7blnjfuw8qc3 = {
    get: get$2,
    getOption: getOption,
    set: set$2
  };

  var getEnd = function (element) {
    return $_a8gk30l6jfuw8q9c.name(element) === 'img' ? 1 : $_6j8y7blnjfuw8qc3.getOption(element).fold(function () {
      return $_s8scrkmjfuw8q7a.children(element).length;
    }, function (v) {
      return v.length;
    });
  };
  var isEnd = function (element, offset) {
    return getEnd(element) === offset;
  };
  var isStart = function (element, offset) {
    return offset === 0;
  };
  var NBSP = '\xA0';
  var isTextNodeWithCursorPosition = function (el) {
    return $_6j8y7blnjfuw8qc3.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_tyr3yk5jfuw8q47.contains(elementsWithCursorPosition, $_a8gk30l6jfuw8q9c.name(elem));
  };
  var $_6vfowrlmjfuw8qbz = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var first$3 = function (element) {
    return $_11ympzlbjfuw8q9n.descendant(element, $_6vfowrlmjfuw8qbz.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_6vfowrlmjfuw8qbz.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_s8scrkmjfuw8q7a.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return Option.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope);
  };
  var $_ejrzj4lljfuw8qbw = {
    first: first$3,
    last: last$2
  };

  var cell$1 = function () {
    var td = $_xbeoqkkjfuw8q73.fromTag('td');
    $_fatuxylgjfuw8qav.append(td, $_xbeoqkkjfuw8q73.fromTag('br'));
    return td;
  };
  var replace = function (cell, tag, attrs) {
    var replica = $_ddvp06lkjfuw8qbt.copy(cell, tag);
    $_11yiupkajfuw8q5c.each(attrs, function (v, k) {
      if (v === null)
        $_3q82t2l5jfuw8q93.remove(replica, k);
      else
        $_3q82t2l5jfuw8q93.set(replica, k, v);
    });
    return replica;
  };
  var pasteReplace = function (cellContent) {
    return cellContent;
  };
  var newRow = function (doc) {
    return function () {
      return $_xbeoqkkjfuw8q73.fromTag('tr', doc.dom());
    };
  };
  var cloneFormats = function (oldCell, newCell, formats) {
    var first = $_ejrzj4lljfuw8qbw.first(oldCell);
    return first.map(function (firstText) {
      var formatSelector = formats.join(',');
      var parents = $_6c9d0hl7jfuw8q9d.ancestors(firstText, formatSelector, function (element) {
        return $_e8rn66kojfuw8q7n.eq(element, oldCell);
      });
      return $_tyr3yk5jfuw8q47.foldr(parents, function (last, parent) {
        var clonedFormat = $_ddvp06lkjfuw8qbt.shallow(parent);
        $_fatuxylgjfuw8qav.append(last, clonedFormat);
        return clonedFormat;
      }, newCell);
    }).getOr(newCell);
  };
  var cellOperations = function (mutate, doc, formatsToClone) {
    var newCell = function (prev) {
      var doc = $_s8scrkmjfuw8q7a.owner(prev.element());
      var td = $_xbeoqkkjfuw8q73.fromTag($_a8gk30l6jfuw8q9c.name(prev.element()), doc.dom());
      var formats = formatsToClone.getOr([
        'strong',
        'em',
        'b',
        'i',
        'span',
        'font',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'div'
      ]);
      var lastNode = formats.length > 0 ? cloneFormats(prev.element(), td, formats) : td;
      $_fatuxylgjfuw8qav.append(lastNode, $_xbeoqkkjfuw8q73.fromTag('br'));
      $_bfod2hlejfuw8qac.copy(prev.element(), td);
      $_bfod2hlejfuw8qac.remove(td, 'height');
      if (prev.colspan() !== 1)
        $_bfod2hlejfuw8qac.remove(prev.element(), 'width');
      mutate(prev.element(), td);
      return td;
    };
    return {
      row: newRow(doc),
      cell: newCell,
      replace: replace,
      gap: cell$1
    };
  };
  var paste = function (doc) {
    return {
      row: newRow(doc),
      cell: cell$1,
      replace: pasteReplace,
      gap: cell$1
    };
  };
  var $_5ohg1eljjfuw8qb4 = {
    cellOperations: cellOperations,
    paste: paste
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_s8scrkmjfuw8q7a.children($_xbeoqkkjfuw8q73.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_tyr3yk5jfuw8q47.map(tags, function (x) {
      return $_xbeoqkkjfuw8q73.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_tyr3yk5jfuw8q47.map(texts, function (x) {
      return $_xbeoqkkjfuw8q73.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_tyr3yk5jfuw8q47.map(nodes, $_xbeoqkkjfuw8q73.fromDom);
  };
  var $_du13u9lpjfuw8qce = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var TagBoundaries = [
    'body',
    'p',
    'div',
    'article',
    'aside',
    'figcaption',
    'figure',
    'footer',
    'header',
    'nav',
    'section',
    'ol',
    'ul',
    'li',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'caption',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'address'
  ];

  function DomUniverse () {
    var clone = function (element) {
      return $_xbeoqkkjfuw8q73.fromDom(element.dom().cloneNode(false));
    };
    var isBoundary = function (element) {
      if (!$_a8gk30l6jfuw8q9c.isElement(element))
        return false;
      if ($_a8gk30l6jfuw8q9c.name(element) === 'body')
        return true;
      return $_tyr3yk5jfuw8q47.contains(TagBoundaries, $_a8gk30l6jfuw8q9c.name(element));
    };
    var isEmptyTag = function (element) {
      if (!$_a8gk30l6jfuw8q9c.isElement(element))
        return false;
      return $_tyr3yk5jfuw8q47.contains([
        'br',
        'img',
        'hr',
        'input'
      ], $_a8gk30l6jfuw8q9c.name(element));
    };
    var comparePosition = function (element, other) {
      return element.dom().compareDocumentPosition(other.dom());
    };
    var copyAttributesTo = function (source, destination) {
      var as = $_3q82t2l5jfuw8q93.clone(source);
      $_3q82t2l5jfuw8q93.setAll(destination, as);
    };
    return {
      up: $_20nfr6k7jfuw8q4g.constant({
        selector: $_8wdrbmlajfuw8q9m.ancestor,
        closest: $_8wdrbmlajfuw8q9m.closest,
        predicate: $_11ympzlbjfuw8q9n.ancestor,
        all: $_s8scrkmjfuw8q7a.parents
      }),
      down: $_20nfr6k7jfuw8q4g.constant({
        selector: $_6c9d0hl7jfuw8q9d.descendants,
        predicate: $_4d3nfbl8jfuw8q9f.descendants
      }),
      styles: $_20nfr6k7jfuw8q4g.constant({
        get: $_bfod2hlejfuw8qac.get,
        getRaw: $_bfod2hlejfuw8qac.getRaw,
        set: $_bfod2hlejfuw8qac.set,
        remove: $_bfod2hlejfuw8qac.remove
      }),
      attrs: $_20nfr6k7jfuw8q4g.constant({
        get: $_3q82t2l5jfuw8q93.get,
        set: $_3q82t2l5jfuw8q93.set,
        remove: $_3q82t2l5jfuw8q93.remove,
        copyTo: copyAttributesTo
      }),
      insert: $_20nfr6k7jfuw8q4g.constant({
        before: $_fatuxylgjfuw8qav.before,
        after: $_fatuxylgjfuw8qav.after,
        afterAll: $_9zaoqflijfuw8qb0.after,
        append: $_fatuxylgjfuw8qav.append,
        appendAll: $_9zaoqflijfuw8qb0.append,
        prepend: $_fatuxylgjfuw8qav.prepend,
        wrap: $_fatuxylgjfuw8qav.wrap
      }),
      remove: $_20nfr6k7jfuw8q4g.constant({
        unwrap: $_fl1deelhjfuw8qax.unwrap,
        remove: $_fl1deelhjfuw8qax.remove
      }),
      create: $_20nfr6k7jfuw8q4g.constant({
        nu: $_xbeoqkkjfuw8q73.fromTag,
        clone: clone,
        text: $_xbeoqkkjfuw8q73.fromText
      }),
      query: $_20nfr6k7jfuw8q4g.constant({
        comparePosition: comparePosition,
        prevSibling: $_s8scrkmjfuw8q7a.prevSibling,
        nextSibling: $_s8scrkmjfuw8q7a.nextSibling
      }),
      property: $_20nfr6k7jfuw8q4g.constant({
        children: $_s8scrkmjfuw8q7a.children,
        name: $_a8gk30l6jfuw8q9c.name,
        parent: $_s8scrkmjfuw8q7a.parent,
        isText: $_a8gk30l6jfuw8q9c.isText,
        isComment: $_a8gk30l6jfuw8q9c.isComment,
        isElement: $_a8gk30l6jfuw8q9c.isElement,
        getText: $_6j8y7blnjfuw8qc3.get,
        setText: $_6j8y7blnjfuw8qc3.set,
        isBoundary: isBoundary,
        isEmptyTag: isEmptyTag
      }),
      eq: $_e8rn66kojfuw8q7n.eq,
      is: $_e8rn66kojfuw8q7n.is
    };
  }

  var leftRight = $_5now9kbjfuw8q5e.immutable('left', 'right');
  var bisect = function (universe, parent, child) {
    var children = universe.property().children(parent);
    var index = $_tyr3yk5jfuw8q47.findIndex(children, $_20nfr6k7jfuw8q4g.curry(universe.eq, child));
    return index.map(function (ind) {
      return {
        before: $_20nfr6k7jfuw8q4g.constant(children.slice(0, ind)),
        after: $_20nfr6k7jfuw8q4g.constant(children.slice(ind + 1))
      };
    });
  };
  var breakToRight = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var second = universe.create().clone(parent);
      universe.insert().appendAll(second, parts.after());
      universe.insert().after(parent, second);
      return leftRight(parent, second);
    });
  };
  var breakToLeft = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var prior = universe.create().clone(parent);
      universe.insert().appendAll(prior, parts.before().concat([child]));
      universe.insert().appendAll(parent, parts.after());
      universe.insert().before(parent, prior);
      return leftRight(prior, parent);
    });
  };
  var breakPath = function (universe, item, isTop, breaker) {
    var result = $_5now9kbjfuw8q5e.immutable('first', 'second', 'splits');
    var next = function (child, group, splits) {
      var fallback = result(child, Option.none(), splits);
      if (isTop(child))
        return result(child, group, splits);
      else {
        return universe.property().parent(child).bind(function (parent) {
          return breaker(universe, parent, child).map(function (breakage) {
            var extra = [{
                first: breakage.left,
                second: breakage.right
              }];
            var nextChild = isTop(parent) ? parent : breakage.left();
            return next(nextChild, Option.some(breakage.right()), splits.concat(extra));
          }).getOr(fallback);
        });
      }
    };
    return next(item, Option.none(), []);
  };
  var $_fx4c5ilyjfuw8qf8 = {
    breakToLeft: breakToLeft,
    breakToRight: breakToRight,
    breakPath: breakPath
  };

  var all$3 = function (universe, look, elements, f) {
    var head = elements[0];
    var tail = elements.slice(1);
    return f(universe, look, head, tail);
  };
  var oneAll = function (universe, look, elements) {
    return elements.length > 0 ? all$3(universe, look, elements, unsafeOne) : Option.none();
  };
  var unsafeOne = function (universe, look, head, tail) {
    var start = look(universe, head);
    return $_tyr3yk5jfuw8q47.foldr(tail, function (b, a) {
      var current = look(universe, a);
      return commonElement(universe, b, current);
    }, start);
  };
  var commonElement = function (universe, start, end) {
    return start.bind(function (s) {
      return end.filter($_20nfr6k7jfuw8q4g.curry(universe.eq, s));
    });
  };
  var $_40yiy6lzjfuw8qfi = { oneAll: oneAll };

  var eq$1 = function (universe, item) {
    return $_20nfr6k7jfuw8q4g.curry(universe.eq, item);
  };
  var unsafeSubset = function (universe, common, ps1, ps2) {
    var children = universe.property().children(common);
    if (universe.eq(common, ps1[0]))
      return Option.some([ps1[0]]);
    if (universe.eq(common, ps2[0]))
      return Option.some([ps2[0]]);
    var finder = function (ps) {
      var topDown = $_tyr3yk5jfuw8q47.reverse(ps);
      var index = $_tyr3yk5jfuw8q47.findIndex(topDown, eq$1(universe, common)).getOr(-1);
      var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];
      return $_tyr3yk5jfuw8q47.findIndex(children, eq$1(universe, item));
    };
    var startIndex = finder(ps1);
    var endIndex = finder(ps2);
    return startIndex.bind(function (sIndex) {
      return endIndex.map(function (eIndex) {
        var first = Math.min(sIndex, eIndex);
        var last = Math.max(sIndex, eIndex);
        return children.slice(first, last + 1);
      });
    });
  };
  var ancestors$2 = function (universe, start, end, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_20nfr6k7jfuw8q4g.constant(false);
    var ps1 = [start].concat(universe.up().all(start));
    var ps2 = [end].concat(universe.up().all(end));
    var prune = function (path) {
      var index = $_tyr3yk5jfuw8q47.findIndex(path, isRoot);
      return index.fold(function () {
        return path;
      }, function (ind) {
        return path.slice(0, ind + 1);
      });
    };
    var pruned1 = prune(ps1);
    var pruned2 = prune(ps2);
    var shared = $_tyr3yk5jfuw8q47.find(pruned1, function (x) {
      return $_tyr3yk5jfuw8q47.exists(pruned2, eq$1(universe, x));
    });
    return {
      firstpath: $_20nfr6k7jfuw8q4g.constant(pruned1),
      secondpath: $_20nfr6k7jfuw8q4g.constant(pruned2),
      shared: $_20nfr6k7jfuw8q4g.constant(shared)
    };
  };
  var subset = function (universe, start, end) {
    var ancs = ancestors$2(universe, start, end);
    return ancs.shared().bind(function (shared) {
      return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
    });
  };
  var $_7m4t8jm0jfuw8qfq = {
    subset: subset,
    ancestors: ancestors$2
  };

  var sharedOne = function (universe, look, elements) {
    return $_40yiy6lzjfuw8qfi.oneAll(universe, look, elements);
  };
  var subset$1 = function (universe, start, finish) {
    return $_7m4t8jm0jfuw8qfq.subset(universe, start, finish);
  };
  var ancestors$3 = function (universe, start, finish, _isRoot) {
    return $_7m4t8jm0jfuw8qfq.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$1 = function (universe, parent, child) {
    return $_fx4c5ilyjfuw8qf8.breakToLeft(universe, parent, child);
  };
  var breakToRight$1 = function (universe, parent, child) {
    return $_fx4c5ilyjfuw8qf8.breakToRight(universe, parent, child);
  };
  var breakPath$1 = function (universe, child, isTop, breaker) {
    return $_fx4c5ilyjfuw8qf8.breakPath(universe, child, isTop, breaker);
  };
  var $_23lsh2lxjfuw8qf5 = {
    sharedOne: sharedOne,
    subset: subset$1,
    ancestors: ancestors$3,
    breakToLeft: breakToLeft$1,
    breakToRight: breakToRight$1,
    breakPath: breakPath$1
  };

  var universe = DomUniverse();
  var sharedOne$1 = function (look, elements) {
    return $_23lsh2lxjfuw8qf5.sharedOne(universe, function (universe, element) {
      return look(element);
    }, elements);
  };
  var subset$2 = function (start, finish) {
    return $_23lsh2lxjfuw8qf5.subset(universe, start, finish);
  };
  var ancestors$4 = function (start, finish, _isRoot) {
    return $_23lsh2lxjfuw8qf5.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$2 = function (parent, child) {
    return $_23lsh2lxjfuw8qf5.breakToLeft(universe, parent, child);
  };
  var breakToRight$2 = function (parent, child) {
    return $_23lsh2lxjfuw8qf5.breakToRight(universe, parent, child);
  };
  var breakPath$2 = function (child, isTop, breaker) {
    return $_23lsh2lxjfuw8qf5.breakPath(universe, child, isTop, function (u, p, c) {
      return breaker(p, c);
    });
  };
  var $_583a2nlujfuw8qdw = {
    sharedOne: sharedOne$1,
    subset: subset$2,
    ancestors: ancestors$4,
    breakToLeft: breakToLeft$2,
    breakToRight: breakToRight$2,
    breakPath: breakPath$2
  };

  var inSelection = function (bounds, detail) {
    var leftEdge = detail.column();
    var rightEdge = detail.column() + detail.colspan() - 1;
    var topEdge = detail.row();
    var bottomEdge = detail.row() + detail.rowspan() - 1;
    return leftEdge <= bounds.finishCol() && rightEdge >= bounds.startCol() && (topEdge <= bounds.finishRow() && bottomEdge >= bounds.startRow());
  };
  var isWithin = function (bounds, detail) {
    return detail.column() >= bounds.startCol() && detail.column() + detail.colspan() - 1 <= bounds.finishCol() && detail.row() >= bounds.startRow() && detail.row() + detail.rowspan() - 1 <= bounds.finishRow();
  };
  var isRectangular = function (warehouse, bounds) {
    var isRect = true;
    var detailIsWithin = $_20nfr6k7jfuw8q4g.curry(isWithin, bounds);
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        isRect = isRect && $_2ge24cldjfuw8qa3.getAt(warehouse, i, j).exists(detailIsWithin);
      }
    }
    return isRect ? Option.some(bounds) : Option.none();
  };
  var $_6nqrbhm3jfuw8qgd = {
    inSelection: inSelection,
    isWithin: isWithin,
    isRectangular: isRectangular
  };

  var getBounds = function (detailA, detailB) {
    return $_ce5pyrkgjfuw8q5v.bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
  };
  var getAnyBox = function (warehouse, startCell, finishCell) {
    var startCoords = $_2ge24cldjfuw8qa3.findItem(warehouse, startCell, $_e8rn66kojfuw8q7n.eq);
    var finishCoords = $_2ge24cldjfuw8qa3.findItem(warehouse, finishCell, $_e8rn66kojfuw8q7n.eq);
    return startCoords.bind(function (sc) {
      return finishCoords.map(function (fc) {
        return getBounds(sc, fc);
      });
    });
  };
  var getBox = function (warehouse, startCell, finishCell) {
    return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
      return $_6nqrbhm3jfuw8qgd.isRectangular(warehouse, bounds);
    });
  };
  var $_ceqdh6m4jfuw8qgj = {
    getAnyBox: getAnyBox,
    getBox: getBox
  };

  var moveBy = function (warehouse, cell, row, column) {
    return $_2ge24cldjfuw8qa3.findItem(warehouse, cell, $_e8rn66kojfuw8q7n.eq).bind(function (detail) {
      var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
      var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
      var dest = $_2ge24cldjfuw8qa3.getAt(warehouse, startRow + row, startCol + column);
      return dest.map(function (d) {
        return d.element();
      });
    });
  };
  var intercepts = function (warehouse, start, finish) {
    return $_ceqdh6m4jfuw8qgj.getAnyBox(warehouse, start, finish).map(function (bounds) {
      var inside = $_2ge24cldjfuw8qa3.filterItems(warehouse, $_20nfr6k7jfuw8q4g.curry($_6nqrbhm3jfuw8qgd.inSelection, bounds));
      return $_tyr3yk5jfuw8q47.map(inside, function (detail) {
        return detail.element();
      });
    });
  };
  var parentCell = function (warehouse, innerCell) {
    var isContainedBy = function (c1, c2) {
      return $_e8rn66kojfuw8q7n.contains(c2, c1);
    };
    return $_2ge24cldjfuw8qa3.findItem(warehouse, innerCell, isContainedBy).bind(function (detail) {
      return detail.element();
    });
  };
  var $_fej9f9m2jfuw8qg6 = {
    moveBy: moveBy,
    intercepts: intercepts,
    parentCell: parentCell
  };

  var moveBy$1 = function (cell, deltaRow, deltaColumn) {
    return $_aqhz9okhjfuw8q5y.table(cell).bind(function (table) {
      var warehouse = getWarehouse(table);
      return $_fej9f9m2jfuw8qg6.moveBy(warehouse, cell, deltaRow, deltaColumn);
    });
  };
  var intercepts$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_fej9f9m2jfuw8qg6.intercepts(warehouse, first, last);
  };
  var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
    var warehouse = getWarehouse(table);
    var startCell = $_e8rn66kojfuw8q7n.eq(table, firstTable) ? first : $_fej9f9m2jfuw8qg6.parentCell(warehouse, first);
    var lastCell = $_e8rn66kojfuw8q7n.eq(table, lastTable) ? last : $_fej9f9m2jfuw8qg6.parentCell(warehouse, last);
    return $_fej9f9m2jfuw8qg6.intercepts(warehouse, startCell, lastCell);
  };
  var getBox$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_ceqdh6m4jfuw8qgj.getBox(warehouse, first, last);
  };
  var getWarehouse = function (table) {
    var list = $_dy3x0nkfjfuw8q5l.fromTable(table);
    return $_2ge24cldjfuw8qa3.generate(list);
  };
  var $_53tlnwm1jfuw8qg2 = {
    moveBy: moveBy$1,
    intercepts: intercepts$1,
    nestedIntercepts: nestedIntercepts,
    getBox: getBox$1
  };

  var lookupTable = function (container, isRoot) {
    return $_8wdrbmlajfuw8q9m.ancestor(container, 'table');
  };
  var identified = $_5now9kbjfuw8q5e.immutableBag([
    'boxes',
    'start',
    'finish'
  ], []);
  var identify = function (start, finish, isRoot) {
    var getIsRoot = function (rootTable) {
      return function (element) {
        return isRoot(element) || $_e8rn66kojfuw8q7n.eq(element, rootTable);
      };
    };
    if ($_e8rn66kojfuw8q7n.eq(start, finish)) {
      return Option.some(identified({
        boxes: Option.some([start]),
        start: start,
        finish: finish
      }));
    } else {
      return lookupTable(start, isRoot).bind(function (startTable) {
        return lookupTable(finish, isRoot).bind(function (finishTable) {
          if ($_e8rn66kojfuw8q7n.eq(startTable, finishTable)) {
            return Option.some(identified({
              boxes: $_53tlnwm1jfuw8qg2.intercepts(startTable, start, finish),
              start: start,
              finish: finish
            }));
          } else if ($_e8rn66kojfuw8q7n.contains(startTable, finishTable)) {
            var ancestorCells = $_6c9d0hl7jfuw8q9d.ancestors(finish, 'td,th', getIsRoot(startTable));
            var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
            return Option.some(identified({
              boxes: $_53tlnwm1jfuw8qg2.nestedIntercepts(startTable, start, startTable, finish, finishTable),
              start: start,
              finish: finishCell
            }));
          } else if ($_e8rn66kojfuw8q7n.contains(finishTable, startTable)) {
            var ancestorCells = $_6c9d0hl7jfuw8q9d.ancestors(start, 'td,th', getIsRoot(finishTable));
            var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
            return Option.some(identified({
              boxes: $_53tlnwm1jfuw8qg2.nestedIntercepts(finishTable, start, startTable, finish, finishTable),
              start: start,
              finish: startCell
            }));
          } else {
            return $_583a2nlujfuw8qdw.ancestors(start, finish).shared().bind(function (lca) {
              return $_8wdrbmlajfuw8q9m.closest(lca, 'table', isRoot).bind(function (lcaTable) {
                var finishAncestorCells = $_6c9d0hl7jfuw8q9d.ancestors(finish, 'td,th', getIsRoot(lcaTable));
                var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                var startAncestorCells = $_6c9d0hl7jfuw8q9d.ancestors(start, 'td,th', getIsRoot(lcaTable));
                var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                return Option.some(identified({
                  boxes: $_53tlnwm1jfuw8qg2.nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
                  start: startCell,
                  finish: finishCell
                }));
              });
            });
          }
        });
      });
    }
  };
  var retrieve = function (container, selector) {
    var sels = $_6c9d0hl7jfuw8q9d.descendants(container, selector);
    return sels.length > 0 ? Option.some(sels) : Option.none();
  };
  var getLast = function (boxes, lastSelectedSelector) {
    return $_tyr3yk5jfuw8q47.find(boxes, function (box) {
      return $_enn9uikjjfuw8q6w.is(box, lastSelectedSelector);
    });
  };
  var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_8wdrbmlajfuw8q9m.descendant(container, firstSelectedSelector).bind(function (first) {
      return $_8wdrbmlajfuw8q9m.descendant(container, lastSelectedSelector).bind(function (last) {
        return $_583a2nlujfuw8qdw.sharedOne(lookupTable, [
          first,
          last
        ]).map(function (tbl) {
          return {
            first: $_20nfr6k7jfuw8q4g.constant(first),
            last: $_20nfr6k7jfuw8q4g.constant(last),
            table: $_20nfr6k7jfuw8q4g.constant(tbl)
          };
        });
      });
    });
  };
  var expandTo = function (finish, firstSelectedSelector) {
    return $_8wdrbmlajfuw8q9m.ancestor(finish, 'table').bind(function (table) {
      return $_8wdrbmlajfuw8q9m.descendant(table, firstSelectedSelector).bind(function (start) {
        return identify(start, finish).bind(function (identified) {
          return identified.boxes().map(function (boxes) {
            return {
              boxes: $_20nfr6k7jfuw8q4g.constant(boxes),
              start: $_20nfr6k7jfuw8q4g.constant(identified.start()),
              finish: $_20nfr6k7jfuw8q4g.constant(identified.finish())
            };
          });
        });
      });
    });
  };
  var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
    return getLast(boxes, lastSelectedSelector).bind(function (last) {
      return $_53tlnwm1jfuw8qg2.moveBy(last, deltaRow, deltaColumn).bind(function (finish) {
        return expandTo(finish, firstSelectedSelector);
      });
    });
  };
  var $_dpd405ltjfuw8qd8 = {
    identify: identify,
    retrieve: retrieve,
    shiftSelection: shiftSelection,
    getEdges: getEdges
  };

  var retrieve$1 = function (container, selector) {
    return $_dpd405ltjfuw8qd8.retrieve(container, selector);
  };
  var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_dpd405ltjfuw8qd8.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
      var isRoot = function (ancestor) {
        return $_e8rn66kojfuw8q7n.eq(container, ancestor);
      };
      var firstAncestor = $_8wdrbmlajfuw8q9m.ancestor(edges.first(), 'thead,tfoot,tbody,table', isRoot);
      var lastAncestor = $_8wdrbmlajfuw8q9m.ancestor(edges.last(), 'thead,tfoot,tbody,table', isRoot);
      return firstAncestor.bind(function (fA) {
        return lastAncestor.bind(function (lA) {
          return $_e8rn66kojfuw8q7n.eq(fA, lA) ? $_53tlnwm1jfuw8qg2.getBox(edges.table(), edges.first(), edges.last()) : Option.none();
        });
      });
    });
  };
  var $_1mynollsjfuw8qcy = {
    retrieve: retrieve$1,
    retrieveBox: retrieveBox
  };

  var selected = 'data-mce-selected';
  var selectedSelector = 'td[' + selected + '],th[' + selected + ']';
  var attributeSelector = '[' + selected + ']';
  var firstSelected = 'data-mce-first-selected';
  var firstSelectedSelector = 'td[' + firstSelected + '],th[' + firstSelected + ']';
  var lastSelected = 'data-mce-last-selected';
  var lastSelectedSelector = 'td[' + lastSelected + '],th[' + lastSelected + ']';
  var $_f8tr2nm5jfuw8qgp = {
    selected: $_20nfr6k7jfuw8q4g.constant(selected),
    selectedSelector: $_20nfr6k7jfuw8q4g.constant(selectedSelector),
    attributeSelector: $_20nfr6k7jfuw8q4g.constant(attributeSelector),
    firstSelected: $_20nfr6k7jfuw8q4g.constant(firstSelected),
    firstSelectedSelector: $_20nfr6k7jfuw8q4g.constant(firstSelectedSelector),
    lastSelected: $_20nfr6k7jfuw8q4g.constant(lastSelected),
    lastSelectedSelector: $_20nfr6k7jfuw8q4g.constant(lastSelectedSelector)
  };

  var generate$1 = function (cases) {
    if (!$_g6mvnrk8jfuw8q4k.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_tyr3yk5jfuw8q47.each(cases, function (acase, count) {
      var keys = $_11yiupkajfuw8q5c.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_g6mvnrk8jfuw8q4k.isArray(value)) {
        throw new Error('case arguments must be an array');
      }
      constructors.push(key);
      adt[key] = function () {
        var argLength = arguments.length;
        if (argLength !== value.length) {
          throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
        }
        var args = new Array(argLength);
        for (var i = 0; i < args.length; i++)
          args[i] = arguments[i];
        var match = function (branches) {
          var branchKeys = $_11yiupkajfuw8q5c.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_tyr3yk5jfuw8q47.forall(constructors, function (reqKey) {
            return $_tyr3yk5jfuw8q47.contains(branchKeys, reqKey);
          });
          if (!allReqd)
            throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
          return branches[key].apply(null, args);
        };
        return {
          fold: function () {
            if (arguments.length !== cases.length) {
              throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
            }
            var target = arguments[count];
            return target.apply(null, args);
          },
          match: match,
          log: function (label) {
            console.log(label, {
              constructors: constructors,
              constructor: key,
              params: args
            });
          }
        };
      };
    });
    return adt;
  };
  var $_7sbzam7jfuw8qgu = { generate: generate$1 };

  var type$1 = $_7sbzam7jfuw8qgu.generate([
    { none: [] },
    { multiple: ['elements'] },
    { single: ['selection'] }
  ]);
  var cata = function (subject, onNone, onMultiple, onSingle) {
    return subject.fold(onNone, onMultiple, onSingle);
  };
  var $_cx0pwam6jfuw8qgr = {
    cata: cata,
    none: type$1.none,
    multiple: type$1.multiple,
    single: type$1.single
  };

  var selection = function (cell, selections) {
    return $_cx0pwam6jfuw8qgr.cata(selections.get(), $_20nfr6k7jfuw8q4g.constant([]), $_20nfr6k7jfuw8q4g.identity, $_20nfr6k7jfuw8q4g.constant([cell]));
  };
  var unmergable = function (cell, selections) {
    var hasSpan = function (elem) {
      return $_3q82t2l5jfuw8q93.has(elem, 'rowspan') && parseInt($_3q82t2l5jfuw8q93.get(elem, 'rowspan'), 10) > 1 || $_3q82t2l5jfuw8q93.has(elem, 'colspan') && parseInt($_3q82t2l5jfuw8q93.get(elem, 'colspan'), 10) > 1;
    };
    var candidates = selection(cell, selections);
    return candidates.length > 0 && $_tyr3yk5jfuw8q47.forall(candidates, hasSpan) ? Option.some(candidates) : Option.none();
  };
  var mergable = function (table, selections) {
    return $_cx0pwam6jfuw8qgr.cata(selections.get(), Option.none, function (cells, _env) {
      if (cells.length === 0) {
        return Option.none();
      }
      return $_1mynollsjfuw8qcy.retrieveBox(table, $_f8tr2nm5jfuw8qgp.firstSelectedSelector(), $_f8tr2nm5jfuw8qgp.lastSelectedSelector()).bind(function (bounds) {
        return cells.length > 1 ? Option.some({
          bounds: $_20nfr6k7jfuw8q4g.constant(bounds),
          cells: $_20nfr6k7jfuw8q4g.constant(cells)
        }) : Option.none();
      });
    }, Option.none);
  };
  var $_3xucu8lrjfuw8qco = {
    mergable: mergable,
    unmergable: unmergable,
    selection: selection
  };

  var noMenu = function (cell) {
    return {
      element: $_20nfr6k7jfuw8q4g.constant(cell),
      mergable: Option.none,
      unmergable: Option.none,
      selection: $_20nfr6k7jfuw8q4g.constant([cell])
    };
  };
  var forMenu = function (selections, table, cell) {
    return {
      element: $_20nfr6k7jfuw8q4g.constant(cell),
      mergable: $_20nfr6k7jfuw8q4g.constant($_3xucu8lrjfuw8qco.mergable(table, selections)),
      unmergable: $_20nfr6k7jfuw8q4g.constant($_3xucu8lrjfuw8qco.unmergable(cell, selections)),
      selection: $_20nfr6k7jfuw8q4g.constant($_3xucu8lrjfuw8qco.selection(cell, selections))
    };
  };
  var notCell$1 = function (element) {
    return noMenu(element);
  };
  var paste$1 = $_5now9kbjfuw8q5e.immutable('element', 'clipboard', 'generators');
  var pasteRows = function (selections, table, cell, clipboard, generators) {
    return {
      element: $_20nfr6k7jfuw8q4g.constant(cell),
      mergable: Option.none,
      unmergable: Option.none,
      selection: $_20nfr6k7jfuw8q4g.constant($_3xucu8lrjfuw8qco.selection(cell, selections)),
      clipboard: $_20nfr6k7jfuw8q4g.constant(clipboard),
      generators: $_20nfr6k7jfuw8q4g.constant(generators)
    };
  };
  var $_5b7h1hlqjfuw8qci = {
    noMenu: noMenu,
    forMenu: forMenu,
    notCell: notCell$1,
    paste: paste$1,
    pasteRows: pasteRows
  };

  var extractSelected = function (cells) {
    return $_aqhz9okhjfuw8q5y.table(cells[0]).map($_ddvp06lkjfuw8qbt.deep).map(function (replica) {
      return [$_bbpooak9jfuw8q4m.extract(replica, $_f8tr2nm5jfuw8qgp.attributeSelector())];
    });
  };
  var serializeElement = function (editor, elm) {
    return editor.selection.serializer.serialize(elm.dom(), {});
  };
  var registerEvents = function (editor, selections, actions, cellSelection) {
    editor.on('BeforeGetContent', function (e) {
      var multiCellContext = function (cells) {
        e.preventDefault();
        extractSelected(cells).each(function (elements) {
          e.content = $_tyr3yk5jfuw8q47.map(elements, function (elm) {
            return serializeElement(editor, elm);
          }).join('');
        });
      };
      if (e.selection === true) {
        $_cx0pwam6jfuw8qgr.cata(selections.get(), $_20nfr6k7jfuw8q4g.noop, multiCellContext, $_20nfr6k7jfuw8q4g.noop);
      }
    });
    editor.on('BeforeSetContent', function (e) {
      if (e.selection === true && e.paste === true) {
        var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        cellOpt.each(function (domCell) {
          var cell = $_xbeoqkkjfuw8q73.fromDom(domCell);
          var table = $_aqhz9okhjfuw8q5y.table(cell);
          table.bind(function (table) {
            var elements = $_tyr3yk5jfuw8q47.filter($_du13u9lpjfuw8qce.fromHtml(e.content), function (content) {
              return $_a8gk30l6jfuw8q9c.name(content) !== 'meta';
            });
            if (elements.length === 1 && $_a8gk30l6jfuw8q9c.name(elements[0]) === 'table') {
              e.preventDefault();
              var doc = $_xbeoqkkjfuw8q73.fromDom(editor.getDoc());
              var generators = $_5ohg1eljjfuw8qb4.paste(doc);
              var targets = $_5b7h1hlqjfuw8qci.paste(cell, elements[0], generators);
              actions.pasteCells(table, targets).each(function (rng) {
                editor.selection.setRng(rng);
                editor.focus();
                cellSelection.clear(table);
              });
            }
          });
        });
      }
    });
  };
  var $_3y1hv8k4jfuw8q3l = { registerEvents: registerEvents };

  function Dimension (name, getOffset) {
    var set = function (element, h) {
      if (!$_g6mvnrk8jfuw8q4k.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_b75qp5lfjfuw8qau.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_bfod2hlejfuw8qac.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_tyr3yk5jfuw8q47.foldl(properties, function (acc, property) {
        var val = $_bfod2hlejfuw8qac.get(element, property);
        var value = val === undefined ? 0 : parseInt(val, 10);
        return isNaN(value) ? acc : acc + value;
      }, 0);
    };
    var max = function (element, value, properties) {
      var cumulativeInclusions = aggregate(element, properties);
      var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
      return absoluteMax;
    };
    return {
      set: set,
      get: get,
      getOuter: getOuter,
      aggregate: aggregate,
      max: max
    };
  }

  var api$1 = Dimension('height', function (element) {
    return $_atd1tul9jfuw8q9i.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$3 = function (element, h) {
    api$1.set(element, h);
  };
  var get$3 = function (element) {
    return api$1.get(element);
  };
  var getOuter = function (element) {
    return api$1.getOuter(element);
  };
  var setMax = function (element, value) {
    var inclusions = [
      'margin-top',
      'border-top-width',
      'padding-top',
      'padding-bottom',
      'border-bottom-width',
      'margin-bottom'
    ];
    var absMax = api$1.max(element, value, inclusions);
    $_bfod2hlejfuw8qac.set(element, 'max-height', absMax + 'px');
  };
  var $_cymdhgmcjfuw8qif = {
    set: set$3,
    get: get$3,
    getOuter: getOuter,
    setMax: setMax
  };

  var api$2 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$4 = function (element, h) {
    api$2.set(element, h);
  };
  var get$4 = function (element) {
    return api$2.get(element);
  };
  var getOuter$1 = function (element) {
    return api$2.getOuter(element);
  };
  var setMax$1 = function (element, value) {
    var inclusions = [
      'margin-left',
      'border-left-width',
      'padding-left',
      'padding-right',
      'border-right-width',
      'margin-right'
    ];
    var absMax = api$2.max(element, value, inclusions);
    $_bfod2hlejfuw8qac.set(element, 'max-width', absMax + 'px');
  };
  var $_fj252lmejfuw8qin = {
    set: set$4,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax$1
  };

  var platform = $_fqgee0ktjfuw8q83.detect();
  var needManualCalc = function () {
    return platform.browser.isIE() || platform.browser.isEdge();
  };
  var toNumber = function (px, fallback) {
    var num = parseFloat(px);
    return isNaN(num) ? fallback : num;
  };
  var getProp = function (elm, name, fallback) {
    return toNumber($_bfod2hlejfuw8qac.get(elm, name), fallback);
  };
  var getCalculatedHeight = function (cell) {
    var paddingTop = getProp(cell, 'padding-top', 0);
    var paddingBottom = getProp(cell, 'padding-bottom', 0);
    var borderTop = getProp(cell, 'border-top-width', 0);
    var borderBottom = getProp(cell, 'border-bottom-width', 0);
    var height = cell.dom().getBoundingClientRect().height;
    var boxSizing = $_bfod2hlejfuw8qac.get(cell, 'box-sizing');
    var borders = borderTop + borderBottom;
    return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
  };
  var getWidth = function (cell) {
    return getProp(cell, 'width', $_fj252lmejfuw8qin.get(cell));
  };
  var getHeight = function (cell) {
    return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', $_cymdhgmcjfuw8qif.get(cell));
  };
  var $_ddwgqpmbjfuw8qi6 = {
    getWidth: getWidth,
    getHeight: getHeight
  };

  var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
  var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
  var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
  var setPixelWidth = function (cell, amount) {
    $_bfod2hlejfuw8qac.set(cell, 'width', amount + 'px');
  };
  var setPercentageWidth = function (cell, amount) {
    $_bfod2hlejfuw8qac.set(cell, 'width', amount + '%');
  };
  var setHeight = function (cell, amount) {
    $_bfod2hlejfuw8qac.set(cell, 'height', amount + 'px');
  };
  var getHeightValue = function (cell) {
    return $_bfod2hlejfuw8qac.getRaw(cell, 'height').getOrThunk(function () {
      return $_ddwgqpmbjfuw8qi6.getHeight(cell) + 'px';
    });
  };
  var convert = function (cell, number, getter, setter) {
    var newSize = $_aqhz9okhjfuw8q5y.table(cell).map(function (table) {
      var total = getter(table);
      return Math.floor(number / 100 * total);
    }).getOr(number);
    setter(cell, newSize);
    return newSize;
  };
  var normalizePixelSize = function (value, cell, getter, setter) {
    var number = parseInt(value, 10);
    return $_ey09l9l2jfuw8q8y.endsWith(value, '%') && $_a8gk30l6jfuw8q9c.name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
  };
  var getTotalHeight = function (cell) {
    var value = getHeightValue(cell);
    if (!value)
      return $_cymdhgmcjfuw8qif.get(cell);
    return normalizePixelSize(value, cell, $_cymdhgmcjfuw8qif.get, setHeight);
  };
  var get$5 = function (cell, type, f) {
    var v = f(cell);
    var span = getSpan(cell, type);
    return v / span;
  };
  var getSpan = function (cell, type) {
    return $_3q82t2l5jfuw8q93.has(cell, type) ? parseInt($_3q82t2l5jfuw8q93.get(cell, type), 10) : 1;
  };
  var getRawWidth = function (element) {
    var cssWidth = $_bfod2hlejfuw8qac.getRaw(element, 'width');
    return cssWidth.fold(function () {
      return Option.from($_3q82t2l5jfuw8q93.get(element, 'width'));
    }, function (width) {
      return Option.some(width);
    });
  };
  var normalizePercentageWidth = function (cellWidth, tableSize) {
    return cellWidth / tableSize.pixelWidth() * 100;
  };
  var choosePercentageSize = function (element, width, tableSize) {
    if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      return parseFloat(percentMatch[1]);
    } else {
      var fallbackWidth = $_fj252lmejfuw8qin.get(element);
      var intWidth = parseInt(fallbackWidth, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }
  };
  var getPercentageWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_fj252lmejfuw8qin.get(cell);
      var intWidth = parseInt(width, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }, function (width) {
      return choosePercentageSize(cell, width, tableSize);
    });
  };
  var normalizePixelWidth = function (cellWidth, tableSize) {
    return cellWidth / 100 * tableSize.pixelWidth();
  };
  var choosePixelSize = function (element, width, tableSize) {
    if (pixelBasedSizeRegex.test(width)) {
      var pixelMatch = pixelBasedSizeRegex.exec(width);
      return parseInt(pixelMatch[1], 10);
    } else if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      var floatWidth = parseFloat(percentMatch[1]);
      return normalizePixelWidth(floatWidth, tableSize);
    } else {
      var fallbackWidth = $_fj252lmejfuw8qin.get(element);
      return parseInt(fallbackWidth, 10);
    }
  };
  var getPixelWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_fj252lmejfuw8qin.get(cell);
      var intWidth = parseInt(width, 10);
      return intWidth;
    }, function (width) {
      return choosePixelSize(cell, width, tableSize);
    });
  };
  var getHeight$1 = function (cell) {
    return get$5(cell, 'rowspan', getTotalHeight);
  };
  var getGenericWidth = function (cell) {
    var width = getRawWidth(cell);
    return width.bind(function (width) {
      if (genericSizeRegex.test(width)) {
        var match = genericSizeRegex.exec(width);
        return Option.some({
          width: $_20nfr6k7jfuw8q4g.constant(match[1]),
          unit: $_20nfr6k7jfuw8q4g.constant(match[3])
        });
      } else {
        return Option.none();
      }
    });
  };
  var setGenericWidth = function (cell, amount, unit) {
    $_bfod2hlejfuw8qac.set(cell, 'width', amount + unit);
  };
  var $_by2skemajfuw8qhj = {
    percentageBasedSizeRegex: $_20nfr6k7jfuw8q4g.constant(percentageBasedSizeRegex),
    pixelBasedSizeRegex: $_20nfr6k7jfuw8q4g.constant(pixelBasedSizeRegex),
    setPixelWidth: setPixelWidth,
    setPercentageWidth: setPercentageWidth,
    setHeight: setHeight,
    getPixelWidth: getPixelWidth,
    getPercentageWidth: getPercentageWidth,
    getGenericWidth: getGenericWidth,
    setGenericWidth: setGenericWidth,
    getHeight: getHeight$1,
    getRawWidth: getRawWidth
  };

  var halve = function (main, other) {
    var width = $_by2skemajfuw8qhj.getGenericWidth(main);
    width.each(function (width) {
      var newWidth = width.width() / 2;
      $_by2skemajfuw8qhj.setGenericWidth(main, newWidth, width.unit());
      $_by2skemajfuw8qhj.setGenericWidth(other, newWidth, width.unit());
    });
  };
  var $_57e49gm9jfuw8qhh = { halve: halve };

  var attached = function (element, scope) {
    var doc = scope || $_xbeoqkkjfuw8q73.fromDom(document.documentElement);
    return $_11ympzlbjfuw8q9n.ancestor(element, $_20nfr6k7jfuw8q4g.curry($_e8rn66kojfuw8q7n.eq, doc)).isSome();
  };
  var windowOf = function (element) {
    var dom = element.dom();
    if (dom === dom.window)
      return element;
    return $_a8gk30l6jfuw8q9c.isDocument(element) ? dom.defaultView || dom.parentWindow : null;
  };
  var $_a9ygj4mjjfuw8qj6 = {
    attached: attached,
    windowOf: windowOf
  };

  var r = function (left, top) {
    var translate = function (x, y) {
      return r(left + x, top + y);
    };
    return {
      left: $_20nfr6k7jfuw8q4g.constant(left),
      top: $_20nfr6k7jfuw8q4g.constant(top),
      translate: translate
    };
  };

  var boxPosition = function (dom) {
    var box = dom.getBoundingClientRect();
    return r(box.left, box.top);
  };
  var firstDefinedOrZero = function (a, b) {
    return a !== undefined ? a : b !== undefined ? b : 0;
  };
  var absolute = function (element) {
    var doc = element.dom().ownerDocument;
    var body = doc.body;
    var win = $_a9ygj4mjjfuw8qj6.windowOf($_xbeoqkkjfuw8q73.fromDom(doc));
    var html = doc.documentElement;
    var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
    var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);
    var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
    var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
    return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
  };
  var relative = function (element) {
    var dom = element.dom();
    return r(dom.offsetLeft, dom.offsetTop);
  };
  var viewport = function (element) {
    var dom = element.dom();
    var doc = dom.ownerDocument;
    var body = doc.body;
    var html = $_xbeoqkkjfuw8q73.fromDom(doc.documentElement);
    if (body === dom)
      return r(body.offsetLeft, body.offsetTop);
    if (!$_a9ygj4mjjfuw8qj6.attached(element, html))
      return r(0, 0);
    return boxPosition(dom);
  };
  var $_hsvzlmijfuw8qj4 = {
    absolute: absolute,
    relative: relative,
    viewport: viewport
  };

  var rowInfo = $_5now9kbjfuw8q5e.immutable('row', 'y');
  var colInfo = $_5now9kbjfuw8q5e.immutable('col', 'x');
  var rtlEdge = function (cell) {
    var pos = $_hsvzlmijfuw8qj4.absolute(cell);
    return pos.left() + $_fj252lmejfuw8qin.getOuter(cell);
  };
  var ltrEdge = function (cell) {
    return $_hsvzlmijfuw8qj4.absolute(cell).left();
  };
  var getLeftEdge = function (index, cell) {
    return colInfo(index, ltrEdge(cell));
  };
  var getRightEdge = function (index, cell) {
    return colInfo(index, rtlEdge(cell));
  };
  var getTop = function (cell) {
    return $_hsvzlmijfuw8qj4.absolute(cell).top();
  };
  var getTopEdge = function (index, cell) {
    return rowInfo(index, getTop(cell));
  };
  var getBottomEdge = function (index, cell) {
    return rowInfo(index, getTop(cell) + $_cymdhgmcjfuw8qif.getOuter(cell));
  };
  var findPositions = function (getInnerEdge, getOuterEdge, array) {
    if (array.length === 0)
      return [];
    var lines = $_tyr3yk5jfuw8q47.map(array.slice(1), function (cellOption, index) {
      return cellOption.map(function (cell) {
        return getInnerEdge(index, cell);
      });
    });
    var lastLine = array[array.length - 1].map(function (cell) {
      return getOuterEdge(array.length - 1, cell);
    });
    return lines.concat([lastLine]);
  };
  var negate = function (step, _table) {
    return -step;
  };
  var height = {
    delta: $_20nfr6k7jfuw8q4g.identity,
    positions: $_20nfr6k7jfuw8q4g.curry(findPositions, getTopEdge, getBottomEdge),
    edge: getTop
  };
  var ltr = {
    delta: $_20nfr6k7jfuw8q4g.identity,
    edge: ltrEdge,
    positions: $_20nfr6k7jfuw8q4g.curry(findPositions, getLeftEdge, getRightEdge)
  };
  var rtl = {
    delta: negate,
    edge: rtlEdge,
    positions: $_20nfr6k7jfuw8q4g.curry(findPositions, getRightEdge, getLeftEdge)
  };
  var $_16z2iamhjfuw8qir = {
    height: height,
    rtl: rtl,
    ltr: ltr
  };

  var $_26mw5tmgjfuw8qiq = {
    ltr: $_16z2iamhjfuw8qir.ltr,
    rtl: $_16z2iamhjfuw8qir.rtl
  };

  function TableDirection (directionAt) {
    var auto = function (table) {
      return directionAt(table).isRtl() ? $_26mw5tmgjfuw8qiq.rtl : $_26mw5tmgjfuw8qiq.ltr;
    };
    var delta = function (amount, table) {
      return auto(table).delta(amount, table);
    };
    var positions = function (cols, table) {
      return auto(table).positions(cols, table);
    };
    var edge = function (cell) {
      return auto(cell).edge(cell);
    };
    return {
      delta: delta,
      edge: edge,
      positions: positions
    };
  }

  var getGridSize = function (table) {
    var input = $_dy3x0nkfjfuw8q5l.fromTable(table);
    var warehouse = $_2ge24cldjfuw8qa3.generate(input);
    return warehouse.grid();
  };
  var $_b452wimljfuw8qjd = { getGridSize: getGridSize };

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_g6mvnrk8jfuw8q4k.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_2j2nzkkejfuw8q5j.validateStrArr('required', required);
    $_2j2nzkkejfuw8q5j.checkDupes(required);
    return function (obj) {
      var keys = $_11yiupkajfuw8q5c.keys(obj);
      var allReqd = $_tyr3yk5jfuw8q47.forall(required, function (req) {
        return $_tyr3yk5jfuw8q47.contains(keys, req);
      });
      if (!allReqd)
        $_2j2nzkkejfuw8q5j.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_tyr3yk5jfuw8q47.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_2j2nzkkejfuw8q5j.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_tyr3yk5jfuw8q47.filter(keys, function (key) {
      return !$_tyr3yk5jfuw8q47.contains(required, key);
    });
    if (unsupported.length > 0)
      $_2j2nzkkejfuw8q5j.unsuppMessage(unsupported);
  };
  var allowExtra = $_20nfr6k7jfuw8q4g.noop;
  var $_7z97w5mpjfuw8qkk = {
    exactly: $_20nfr6k7jfuw8q4g.curry(base, handleExact),
    ensure: $_20nfr6k7jfuw8q4g.curry(base, allowExtra),
    ensureWith: $_20nfr6k7jfuw8q4g.curry(baseWith, allowExtra)
  };

  var elementToData = function (element) {
    var colspan = $_3q82t2l5jfuw8q93.has(element, 'colspan') ? parseInt($_3q82t2l5jfuw8q93.get(element, 'colspan'), 10) : 1;
    var rowspan = $_3q82t2l5jfuw8q93.has(element, 'rowspan') ? parseInt($_3q82t2l5jfuw8q93.get(element, 'rowspan'), 10) : 1;
    return {
      element: $_20nfr6k7jfuw8q4g.constant(element),
      colspan: $_20nfr6k7jfuw8q4g.constant(colspan),
      rowspan: $_20nfr6k7jfuw8q4g.constant(rowspan)
    };
  };
  var modification = function (generators, _toData) {
    contract(generators);
    var position = Cell(Option.none());
    var toData = _toData !== undefined ? _toData : elementToData;
    var nu = function (data) {
      return generators.cell(data);
    };
    var nuFrom = function (element) {
      var data = toData(element);
      return nu(data);
    };
    var add = function (element) {
      var replacement = nuFrom(element);
      if (position.get().isNone())
        position.set(Option.some(replacement));
      recent = Option.some({
        item: element,
        replacement: replacement
      });
      return replacement;
    };
    var recent = Option.none();
    var getOrInit = function (element, comparator) {
      return recent.fold(function () {
        return add(element);
      }, function (p) {
        return comparator(element, p.item) ? p.replacement : add(element);
      });
    };
    return {
      getOrInit: getOrInit,
      cursor: position.get
    };
  };
  var transform = function (scope, tag) {
    return function (generators) {
      var position = Cell(Option.none());
      contract(generators);
      var list = [];
      var find = function (element, comparator) {
        return $_tyr3yk5jfuw8q47.find(list, function (x) {
          return comparator(x.item, element);
        });
      };
      var makeNew = function (element) {
        var cell = generators.replace(element, tag, { scope: scope });
        list.push({
          item: element,
          sub: cell
        });
        if (position.get().isNone())
          position.set(Option.some(cell));
        return cell;
      };
      var replaceOrInit = function (element, comparator) {
        return find(element, comparator).fold(function () {
          return makeNew(element);
        }, function (p) {
          return comparator(element, p.item) ? p.sub : makeNew(element);
        });
      };
      return {
        replaceOrInit: replaceOrInit,
        cursor: position.get
      };
    };
  };
  var merging = function (generators) {
    contract(generators);
    var position = Cell(Option.none());
    var combine = function (cell) {
      if (position.get().isNone())
        position.set(Option.some(cell));
      return function () {
        var raw = generators.cell({
          element: $_20nfr6k7jfuw8q4g.constant(cell),
          colspan: $_20nfr6k7jfuw8q4g.constant(1),
          rowspan: $_20nfr6k7jfuw8q4g.constant(1)
        });
        $_bfod2hlejfuw8qac.remove(raw, 'width');
        $_bfod2hlejfuw8qac.remove(cell, 'width');
        return raw;
      };
    };
    return {
      combine: combine,
      cursor: position.get
    };
  };
  var contract = $_7z97w5mpjfuw8qkk.exactly([
    'cell',
    'row',
    'replace',
    'gap'
  ]);
  var $_eoocrvmnjfuw8qk1 = {
    modification: modification,
    transform: transform,
    merging: merging
  };

  var blockList = [
    'body',
    'p',
    'div',
    'article',
    'aside',
    'figcaption',
    'figure',
    'footer',
    'header',
    'nav',
    'section',
    'ol',
    'ul',
    'table',
    'thead',
    'tfoot',
    'tbody',
    'caption',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'address'
  ];
  var isList = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_tyr3yk5jfuw8q47.contains([
      'ol',
      'ul'
    ], tagName);
  };
  var isBlock = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_tyr3yk5jfuw8q47.contains(blockList, tagName);
  };
  var isFormatting = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_tyr3yk5jfuw8q47.contains([
      'address',
      'pre',
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isHeading = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_tyr3yk5jfuw8q47.contains([
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isContainer = function (universe, item) {
    return $_tyr3yk5jfuw8q47.contains([
      'div',
      'li',
      'td',
      'th',
      'blockquote',
      'body',
      'caption'
    ], universe.property().name(item));
  };
  var isEmptyTag = function (universe, item) {
    return $_tyr3yk5jfuw8q47.contains([
      'br',
      'img',
      'hr',
      'input'
    ], universe.property().name(item));
  };
  var isFrame = function (universe, item) {
    return universe.property().name(item) === 'iframe';
  };
  var isInline = function (universe, item) {
    return !(isBlock(universe, item) || isEmptyTag(universe, item)) && universe.property().name(item) !== 'li';
  };
  var $_325i5bmsjfuw8qle = {
    isBlock: isBlock,
    isList: isList,
    isFormatting: isFormatting,
    isHeading: isHeading,
    isContainer: isContainer,
    isEmptyTag: isEmptyTag,
    isFrame: isFrame,
    isInline: isInline
  };

  var universe$1 = DomUniverse();
  var isBlock$1 = function (element) {
    return $_325i5bmsjfuw8qle.isBlock(universe$1, element);
  };
  var isList$1 = function (element) {
    return $_325i5bmsjfuw8qle.isList(universe$1, element);
  };
  var isFormatting$1 = function (element) {
    return $_325i5bmsjfuw8qle.isFormatting(universe$1, element);
  };
  var isHeading$1 = function (element) {
    return $_325i5bmsjfuw8qle.isHeading(universe$1, element);
  };
  var isContainer$1 = function (element) {
    return $_325i5bmsjfuw8qle.isContainer(universe$1, element);
  };
  var isEmptyTag$1 = function (element) {
    return $_325i5bmsjfuw8qle.isEmptyTag(universe$1, element);
  };
  var isFrame$1 = function (element) {
    return $_325i5bmsjfuw8qle.isFrame(universe$1, element);
  };
  var isInline$1 = function (element) {
    return $_325i5bmsjfuw8qle.isInline(universe$1, element);
  };
  var $_d9tdqtmrjfuw8ql9 = {
    isBlock: isBlock$1,
    isList: isList$1,
    isFormatting: isFormatting$1,
    isHeading: isHeading$1,
    isContainer: isContainer$1,
    isEmptyTag: isEmptyTag$1,
    isFrame: isFrame$1,
    isInline: isInline$1
  };

  var merge = function (cells) {
    var isBr = function (el) {
      return $_a8gk30l6jfuw8q9c.name(el) === 'br';
    };
    var advancedBr = function (children) {
      return $_tyr3yk5jfuw8q47.forall(children, function (c) {
        return isBr(c) || $_a8gk30l6jfuw8q9c.isText(c) && $_6j8y7blnjfuw8qc3.get(c).trim().length === 0;
      });
    };
    var isListItem = function (el) {
      return $_a8gk30l6jfuw8q9c.name(el) === 'li' || $_11ympzlbjfuw8q9n.ancestor(el, $_d9tdqtmrjfuw8ql9.isList).isSome();
    };
    var siblingIsBlock = function (el) {
      return $_s8scrkmjfuw8q7a.nextSibling(el).map(function (rightSibling) {
        if ($_d9tdqtmrjfuw8ql9.isBlock(rightSibling))
          return true;
        if ($_d9tdqtmrjfuw8ql9.isEmptyTag(rightSibling)) {
          return $_a8gk30l6jfuw8q9c.name(rightSibling) === 'img' ? false : true;
        }
      }).getOr(false);
    };
    var markCell = function (cell) {
      return $_ejrzj4lljfuw8qbw.last(cell).bind(function (rightEdge) {
        var rightSiblingIsBlock = siblingIsBlock(rightEdge);
        return $_s8scrkmjfuw8q7a.parent(rightEdge).map(function (parent) {
          return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || $_d9tdqtmrjfuw8ql9.isBlock(parent) && !$_e8rn66kojfuw8q7n.eq(cell, parent) ? [] : [$_xbeoqkkjfuw8q73.fromTag('br')];
        });
      }).getOr([]);
    };
    var markContent = function () {
      var content = $_tyr3yk5jfuw8q47.bind(cells, function (cell) {
        var children = $_s8scrkmjfuw8q7a.children(cell);
        return advancedBr(children) ? [] : children.concat(markCell(cell));
      });
      return content.length === 0 ? [$_xbeoqkkjfuw8q73.fromTag('br')] : content;
    };
    var contents = markContent();
    $_fl1deelhjfuw8qax.empty(cells[0]);
    $_9zaoqflijfuw8qb0.append(cells[0], contents);
  };
  var $_ancl40mqjfuw8qkm = { merge: merge };

  var shallow$1 = function (old, nu) {
    return nu;
  };
  var deep$1 = function (old, nu) {
    var bothObjects = $_g6mvnrk8jfuw8q4k.isObject(old) && $_g6mvnrk8jfuw8q4k.isObject(nu);
    return bothObjects ? deepMerge(old, nu) : nu;
  };
  var baseMerge = function (merger) {
    return function () {
      var objects = new Array(arguments.length);
      for (var i = 0; i < objects.length; i++)
        objects[i] = arguments[i];
      if (objects.length === 0)
        throw new Error('Can\'t merge zero objects');
      var ret = {};
      for (var j = 0; j < objects.length; j++) {
        var curObject = objects[j];
        for (var key in curObject)
          if (curObject.hasOwnProperty(key)) {
            ret[key] = merger(ret[key], curObject[key]);
          }
      }
      return ret;
    };
  };
  var deepMerge = baseMerge(deep$1);
  var merge$1 = baseMerge(shallow$1);
  var $_91sgzmujfuw8qm5 = {
    deepMerge: deepMerge,
    merge: merge$1
  };

  var cat = function (arr) {
    var r = [];
    var push = function (x) {
      r.push(x);
    };
    for (var i = 0; i < arr.length; i++) {
      arr[i].each(push);
    }
    return r;
  };
  var findMap = function (arr, f) {
    for (var i = 0; i < arr.length; i++) {
      var r = f(arr[i], i);
      if (r.isSome()) {
        return r;
      }
    }
    return Option.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return Option.none();
      }
    }
    return Option.some(f.apply(null, r));
  };
  var $_cul8qomvjfuw8qm7 = {
    cat: cat,
    findMap: findMap,
    liftN: liftN
  };

  var addCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    var before = cells.slice(0, index);
    var after = cells.slice(index);
    var newCells = before.concat([cell]).concat(after);
    return setCells(gridRow, newCells);
  };
  var mutateCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    cells[index] = cell;
  };
  var setCells = function (gridRow, cells) {
    return $_ce5pyrkgjfuw8q5v.rowcells(cells, gridRow.section());
  };
  var mapCells = function (gridRow, f) {
    var cells = gridRow.cells();
    var r = $_tyr3yk5jfuw8q47.map(cells, f);
    return $_ce5pyrkgjfuw8q5v.rowcells(r, gridRow.section());
  };
  var getCell = function (gridRow, index) {
    return gridRow.cells()[index];
  };
  var getCellElement = function (gridRow, index) {
    return getCell(gridRow, index).element();
  };
  var cellLength = function (gridRow) {
    return gridRow.cells().length;
  };
  var $_aylxzgmyjfuw8qmj = {
    addCell: addCell,
    setCells: setCells,
    mutateCell: mutateCell,
    getCell: getCell,
    getCellElement: getCellElement,
    mapCells: mapCells,
    cellLength: cellLength
  };

  var getColumn = function (grid, index) {
    return $_tyr3yk5jfuw8q47.map(grid, function (row) {
      return $_aylxzgmyjfuw8qmj.getCell(row, index);
    });
  };
  var getRow = function (grid, index) {
    return grid[index];
  };
  var findDiff = function (xs, comp) {
    if (xs.length === 0)
      return 0;
    var first = xs[0];
    var index = $_tyr3yk5jfuw8q47.findIndex(xs, function (x) {
      return !comp(first.element(), x.element());
    });
    return index.fold(function () {
      return xs.length;
    }, function (ind) {
      return ind;
    });
  };
  var subgrid = function (grid, row, column, comparator) {
    var restOfRow = getRow(grid, row).cells().slice(column);
    var endColIndex = findDiff(restOfRow, comparator);
    var restOfColumn = getColumn(grid, column).slice(row);
    var endRowIndex = findDiff(restOfColumn, comparator);
    return {
      colspan: $_20nfr6k7jfuw8q4g.constant(endColIndex),
      rowspan: $_20nfr6k7jfuw8q4g.constant(endRowIndex)
    };
  };
  var $_8v4imgmxjfuw8qme = { subgrid: subgrid };

  var toDetails = function (grid, comparator) {
    var seen = $_tyr3yk5jfuw8q47.map(grid, function (row, ri) {
      return $_tyr3yk5jfuw8q47.map(row.cells(), function (col, ci) {
        return false;
      });
    });
    var updateSeen = function (ri, ci, rowspan, colspan) {
      for (var r = ri; r < ri + rowspan; r++) {
        for (var c = ci; c < ci + colspan; c++) {
          seen[r][c] = true;
        }
      }
    };
    return $_tyr3yk5jfuw8q47.map(grid, function (row, ri) {
      var details = $_tyr3yk5jfuw8q47.bind(row.cells(), function (cell, ci) {
        if (seen[ri][ci] === false) {
          var result = $_8v4imgmxjfuw8qme.subgrid(grid, ri, ci, comparator);
          updateSeen(ri, ci, result.rowspan(), result.colspan());
          return [$_ce5pyrkgjfuw8q5v.detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew())];
        } else {
          return [];
        }
      });
      return $_ce5pyrkgjfuw8q5v.rowdetails(details, row.section());
    });
  };
  var toGrid = function (warehouse, generators, isNew) {
    var grid = [];
    for (var i = 0; i < warehouse.grid().rows(); i++) {
      var rowCells = [];
      for (var j = 0; j < warehouse.grid().columns(); j++) {
        var element = $_2ge24cldjfuw8qa3.getAt(warehouse, i, j).map(function (item) {
          return $_ce5pyrkgjfuw8q5v.elementnew(item.element(), isNew);
        }).getOrThunk(function () {
          return $_ce5pyrkgjfuw8q5v.elementnew(generators.gap(), true);
        });
        rowCells.push(element);
      }
      var row = $_ce5pyrkgjfuw8q5v.rowcells(rowCells, warehouse.all()[i].section());
      grid.push(row);
    }
    return grid;
  };
  var $_cw9o3smwjfuw8qm9 = {
    toDetails: toDetails,
    toGrid: toGrid
  };

  var setIfNot = function (element, property, value, ignore) {
    if (value === ignore)
      $_3q82t2l5jfuw8q93.remove(element, property);
    else
      $_3q82t2l5jfuw8q93.set(element, property, value);
  };
  var render = function (table, grid) {
    var newRows = [];
    var newCells = [];
    var renderSection = function (gridSection, sectionName) {
      var section = $_8wdrbmlajfuw8q9m.child(table, sectionName).getOrThunk(function () {
        var tb = $_xbeoqkkjfuw8q73.fromTag(sectionName, $_s8scrkmjfuw8q7a.owner(table).dom());
        $_fatuxylgjfuw8qav.append(table, tb);
        return tb;
      });
      $_fl1deelhjfuw8qax.empty(section);
      var rows = $_tyr3yk5jfuw8q47.map(gridSection, function (row) {
        if (row.isNew()) {
          newRows.push(row.element());
        }
        var tr = row.element();
        $_fl1deelhjfuw8qax.empty(tr);
        $_tyr3yk5jfuw8q47.each(row.cells(), function (cell) {
          if (cell.isNew()) {
            newCells.push(cell.element());
          }
          setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
          setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
          $_fatuxylgjfuw8qav.append(tr, cell.element());
        });
        return tr;
      });
      $_9zaoqflijfuw8qb0.append(section, rows);
    };
    var removeSection = function (sectionName) {
      $_8wdrbmlajfuw8q9m.child(table, sectionName).bind($_fl1deelhjfuw8qax.remove);
    };
    var renderOrRemoveSection = function (gridSection, sectionName) {
      if (gridSection.length > 0) {
        renderSection(gridSection, sectionName);
      } else {
        removeSection(sectionName);
      }
    };
    var headSection = [];
    var bodySection = [];
    var footSection = [];
    $_tyr3yk5jfuw8q47.each(grid, function (row) {
      switch (row.section()) {
      case 'thead':
        headSection.push(row);
        break;
      case 'tbody':
        bodySection.push(row);
        break;
      case 'tfoot':
        footSection.push(row);
        break;
      }
    });
    renderOrRemoveSection(headSection, 'thead');
    renderOrRemoveSection(bodySection, 'tbody');
    renderOrRemoveSection(footSection, 'tfoot');
    return {
      newRows: $_20nfr6k7jfuw8q4g.constant(newRows),
      newCells: $_20nfr6k7jfuw8q4g.constant(newCells)
    };
  };
  var copy$2 = function (grid) {
    var rows = $_tyr3yk5jfuw8q47.map(grid, function (row) {
      var tr = $_ddvp06lkjfuw8qbt.shallow(row.element());
      $_tyr3yk5jfuw8q47.each(row.cells(), function (cell) {
        var clonedCell = $_ddvp06lkjfuw8qbt.deep(cell.element());
        setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
        setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
        $_fatuxylgjfuw8qav.append(tr, clonedCell);
      });
      return tr;
    });
    return rows;
  };
  var $_c9mejomzjfuw8qmn = {
    render: render,
    copy: copy$2
  };

  var repeat = function (repititions, f) {
    var r = [];
    for (var i = 0; i < repititions; i++) {
      r.push(f(i));
    }
    return r;
  };
  var range$1 = function (start, end) {
    var r = [];
    for (var i = start; i < end; i++) {
      r.push(i);
    }
    return r;
  };
  var unique = function (xs, comparator) {
    var result = [];
    $_tyr3yk5jfuw8q47.each(xs, function (x, i) {
      if (i < xs.length - 1 && !comparator(x, xs[i + 1])) {
        result.push(x);
      } else if (i === xs.length - 1) {
        result.push(x);
      }
    });
    return result;
  };
  var deduce = function (xs, index) {
    if (index < 0 || index >= xs.length - 1)
      return Option.none();
    var current = xs[index].fold(function () {
      var rest = $_tyr3yk5jfuw8q47.reverse(xs.slice(0, index));
      return $_cul8qomvjfuw8qm7.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (c) {
      return Option.some({
        value: c,
        delta: 0
      });
    });
    var next = xs[index + 1].fold(function () {
      var rest = xs.slice(index + 1);
      return $_cul8qomvjfuw8qm7.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (n) {
      return Option.some({
        value: n,
        delta: 1
      });
    });
    return current.bind(function (c) {
      return next.map(function (n) {
        var extras = n.delta + c.delta;
        return Math.abs(n.value - c.value) / extras;
      });
    });
  };
  var $_fcnwwbn2jfuw8qoa = {
    repeat: repeat,
    range: range$1,
    unique: unique,
    deduce: deduce
  };

  var columns = function (warehouse) {
    var grid = warehouse.grid();
    var cols = $_fcnwwbn2jfuw8qoa.range(0, grid.columns());
    var rows = $_fcnwwbn2jfuw8qoa.range(0, grid.rows());
    return $_tyr3yk5jfuw8q47.map(cols, function (col) {
      var getBlock = function () {
        return $_tyr3yk5jfuw8q47.bind(rows, function (r) {
          return $_2ge24cldjfuw8qa3.getAt(warehouse, r, col).filter(function (detail) {
            return detail.column() === col;
          }).fold($_20nfr6k7jfuw8q4g.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.colspan() === 1;
      };
      var getFallback = function () {
        return $_2ge24cldjfuw8qa3.getAt(warehouse, 0, col);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var decide = function (getBlock, isSingle, getFallback) {
    var inBlock = getBlock();
    var singleInBlock = $_tyr3yk5jfuw8q47.find(inBlock, isSingle);
    var detailOption = singleInBlock.orThunk(function () {
      return Option.from(inBlock[0]).orThunk(getFallback);
    });
    return detailOption.map(function (detail) {
      return detail.element();
    });
  };
  var rows$1 = function (warehouse) {
    var grid = warehouse.grid();
    var rows = $_fcnwwbn2jfuw8qoa.range(0, grid.rows());
    var cols = $_fcnwwbn2jfuw8qoa.range(0, grid.columns());
    return $_tyr3yk5jfuw8q47.map(rows, function (row) {
      var getBlock = function () {
        return $_tyr3yk5jfuw8q47.bind(cols, function (c) {
          return $_2ge24cldjfuw8qa3.getAt(warehouse, row, c).filter(function (detail) {
            return detail.row() === row;
          }).fold($_20nfr6k7jfuw8q4g.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.rowspan() === 1;
      };
      var getFallback = function () {
        return $_2ge24cldjfuw8qa3.getAt(warehouse, row, 0);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var $_9oko5pn1jfuw8qo0 = {
    columns: columns,
    rows: rows$1
  };

  var col = function (column, x, y, w, h) {
    var blocker = $_xbeoqkkjfuw8q73.fromTag('div');
    $_bfod2hlejfuw8qac.setAll(blocker, {
      position: 'absolute',
      left: x - w / 2 + 'px',
      top: y + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_3q82t2l5jfuw8q93.setAll(blocker, {
      'data-column': column,
      'role': 'presentation'
    });
    return blocker;
  };
  var row$1 = function (row, x, y, w, h) {
    var blocker = $_xbeoqkkjfuw8q73.fromTag('div');
    $_bfod2hlejfuw8qac.setAll(blocker, {
      position: 'absolute',
      left: x + 'px',
      top: y - h / 2 + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_3q82t2l5jfuw8q93.setAll(blocker, {
      'data-row': row,
      'role': 'presentation'
    });
    return blocker;
  };
  var $_bis8idn3jfuw8qoi = {
    col: col,
    row: row$1
  };

  var css = function (namespace) {
    var dashNamespace = namespace.replace(/\./g, '-');
    var resolve = function (str) {
      return dashNamespace + '-' + str;
    };
    return { resolve: resolve };
  };
  var $_63w6atn5jfuw8qot = { css: css };

  var styles = $_63w6atn5jfuw8qot.css('ephox-snooker');
  var $_f6r94sn4jfuw8qoq = { resolve: styles.resolve };

  function Toggler (turnOff, turnOn, initial) {
    var active = initial || false;
    var on = function () {
      turnOn();
      active = true;
    };
    var off = function () {
      turnOff();
      active = false;
    };
    var toggle = function () {
      var f = active ? off : on;
      f();
    };
    var isOn = function () {
      return active;
    };
    return {
      on: on,
      off: off,
      toggle: toggle,
      isOn: isOn
    };
  }

  var read = function (element, attr) {
    var value = $_3q82t2l5jfuw8q93.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read(element, attr);
    var nu = old.concat([id]);
    $_3q82t2l5jfuw8q93.set(element, attr, nu.join(' '));
  };
  var remove$3 = function (element, attr, id) {
    var nu = $_tyr3yk5jfuw8q47.filter(read(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_3q82t2l5jfuw8q93.set(element, attr, nu.join(' '));
    else
      $_3q82t2l5jfuw8q93.remove(element, attr);
  };
  var $_61h5lon9jfuw8qp0 = {
    read: read,
    add: add,
    remove: remove$3
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$6 = function (element) {
    return $_61h5lon9jfuw8qp0.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_61h5lon9jfuw8qp0.add(element, 'class', clazz);
  };
  var remove$4 = function (element, clazz) {
    return $_61h5lon9jfuw8qp0.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_tyr3yk5jfuw8q47.contains(get$6(element), clazz)) {
      remove$4(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_f4rpvun8jfuw8qox = {
    get: get$6,
    add: add$1,
    remove: remove$4,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_f4rpvun8jfuw8qox.supports(element))
      element.dom().classList.add(clazz);
    else
      $_f4rpvun8jfuw8qox.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_f4rpvun8jfuw8qox.supports(element) ? element.dom().classList : $_f4rpvun8jfuw8qox.get(element);
    if (classList.length === 0) {
      $_3q82t2l5jfuw8q93.remove(element, 'class');
    }
  };
  var remove$5 = function (element, clazz) {
    if ($_f4rpvun8jfuw8qox.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_f4rpvun8jfuw8qox.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_f4rpvun8jfuw8qox.supports(element) ? element.dom().classList.toggle(clazz) : $_f4rpvun8jfuw8qox.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_f4rpvun8jfuw8qox.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_f4rpvun8jfuw8qox.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_f4rpvun8jfuw8qox.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_f4rpvun8jfuw8qox.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_fmcseon6jfuw8qou = {
    add: add$2,
    remove: remove$5,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var resizeBar = $_f6r94sn4jfuw8qoq.resolve('resizer-bar');
  var resizeRowBar = $_f6r94sn4jfuw8qoq.resolve('resizer-rows');
  var resizeColBar = $_f6r94sn4jfuw8qoq.resolve('resizer-cols');
  var BAR_THICKNESS = 7;
  var clear = function (wire) {
    var previous = $_6c9d0hl7jfuw8q9d.descendants(wire.parent(), '.' + resizeBar);
    $_tyr3yk5jfuw8q47.each(previous, $_fl1deelhjfuw8qax.remove);
  };
  var drawBar = function (wire, positions, create) {
    var origin = wire.origin();
    $_tyr3yk5jfuw8q47.each(positions, function (cpOption, i) {
      cpOption.each(function (cp) {
        var bar = create(origin, cp);
        $_fmcseon6jfuw8qou.add(bar, resizeBar);
        $_fatuxylgjfuw8qav.append(wire.parent(), bar);
      });
    });
  };
  var refreshCol = function (wire, colPositions, position, tableHeight) {
    drawBar(wire, colPositions, function (origin, cp) {
      var colBar = $_bis8idn3jfuw8qoi.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
      $_fmcseon6jfuw8qou.add(colBar, resizeColBar);
      return colBar;
    });
  };
  var refreshRow = function (wire, rowPositions, position, tableWidth) {
    drawBar(wire, rowPositions, function (origin, cp) {
      var rowBar = $_bis8idn3jfuw8qoi.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
      $_fmcseon6jfuw8qou.add(rowBar, resizeRowBar);
      return rowBar;
    });
  };
  var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
    var position = $_hsvzlmijfuw8qj4.absolute(table);
    var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
    refreshRow(wire, rowPositions, position, $_fj252lmejfuw8qin.getOuter(table));
    var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
    refreshCol(wire, colPositions, position, $_cymdhgmcjfuw8qif.getOuter(table));
  };
  var refresh = function (wire, table, hdirection, vdirection) {
    clear(wire);
    var list = $_dy3x0nkfjfuw8q5l.fromTable(table);
    var warehouse = $_2ge24cldjfuw8qa3.generate(list);
    var rows = $_9oko5pn1jfuw8qo0.rows(warehouse);
    var cols = $_9oko5pn1jfuw8qo0.columns(warehouse);
    refreshGrid(wire, table, rows, cols, hdirection, vdirection);
  };
  var each$2 = function (wire, f) {
    var bars = $_6c9d0hl7jfuw8q9d.descendants(wire.parent(), '.' + resizeBar);
    $_tyr3yk5jfuw8q47.each(bars, f);
  };
  var hide = function (wire) {
    each$2(wire, function (bar) {
      $_bfod2hlejfuw8qac.set(bar, 'display', 'none');
    });
  };
  var show = function (wire) {
    each$2(wire, function (bar) {
      $_bfod2hlejfuw8qac.set(bar, 'display', 'block');
    });
  };
  var isRowBar = function (element) {
    return $_fmcseon6jfuw8qou.has(element, resizeRowBar);
  };
  var isColBar = function (element) {
    return $_fmcseon6jfuw8qou.has(element, resizeColBar);
  };
  var $_jc1w5n0jfuw8qng = {
    refresh: refresh,
    hide: hide,
    show: show,
    destroy: clear,
    isRowBar: isRowBar,
    isColBar: isColBar
  };

  var fromWarehouse = function (warehouse, generators) {
    return $_cw9o3smwjfuw8qm9.toGrid(warehouse, generators, false);
  };
  var deriveRows = function (rendered, generators) {
    var findRow = function (details) {
      var rowOfCells = $_cul8qomvjfuw8qm7.findMap(details, function (detail) {
        return $_s8scrkmjfuw8q7a.parent(detail.element()).map(function (row) {
          var isNew = $_s8scrkmjfuw8q7a.parent(row).isNone();
          return $_ce5pyrkgjfuw8q5v.elementnew(row, isNew);
        });
      });
      return rowOfCells.getOrThunk(function () {
        return $_ce5pyrkgjfuw8q5v.elementnew(generators.row(), true);
      });
    };
    return $_tyr3yk5jfuw8q47.map(rendered, function (details) {
      var row = findRow(details.details());
      return $_ce5pyrkgjfuw8q5v.rowdatanew(row.element(), details.details(), details.section(), row.isNew());
    });
  };
  var toDetailList = function (grid, generators) {
    var rendered = $_cw9o3smwjfuw8qm9.toDetails(grid, $_e8rn66kojfuw8q7n.eq);
    return deriveRows(rendered, generators);
  };
  var findInWarehouse = function (warehouse, element) {
    var all = $_tyr3yk5jfuw8q47.flatten($_tyr3yk5jfuw8q47.map(warehouse.all(), function (r) {
      return r.cells();
    }));
    return $_tyr3yk5jfuw8q47.find(all, function (e) {
      return $_e8rn66kojfuw8q7n.eq(element, e.element());
    });
  };
  var run = function (operation, extract, adjustment, postAction, genWrappers) {
    return function (wire, table, target, generators, direction) {
      var input = $_dy3x0nkfjfuw8q5l.fromTable(table);
      var warehouse = $_2ge24cldjfuw8qa3.generate(input);
      var output = extract(warehouse, target).map(function (info) {
        var model = fromWarehouse(warehouse, generators);
        var result = operation(model, info, $_e8rn66kojfuw8q7n.eq, genWrappers(generators));
        var grid = toDetailList(result.grid(), generators);
        return {
          grid: $_20nfr6k7jfuw8q4g.constant(grid),
          cursor: result.cursor
        };
      });
      return output.fold(function () {
        return Option.none();
      }, function (out) {
        var newElements = $_c9mejomzjfuw8qmn.render(table, out.grid());
        adjustment(table, out.grid(), direction);
        postAction(table);
        $_jc1w5n0jfuw8qng.refresh(wire, table, $_16z2iamhjfuw8qir.height, direction);
        return Option.some({
          cursor: out.cursor,
          newRows: newElements.newRows,
          newCells: newElements.newCells
        });
      });
    };
  };
  var onCell = function (warehouse, target) {
    return $_aqhz9okhjfuw8q5y.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell);
    });
  };
  var onPaste = function (warehouse, target) {
    return $_aqhz9okhjfuw8q5y.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell).map(function (details) {
        return $_91sgzmujfuw8qm5.merge(details, {
          generators: target.generators,
          clipboard: target.clipboard
        });
      });
    });
  };
  var onPasteRows = function (warehouse, target) {
    var details = $_tyr3yk5jfuw8q47.map(target.selection(), function (cell) {
      return $_aqhz9okhjfuw8q5y.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_cul8qomvjfuw8qm7.cat(details);
    return cells.length > 0 ? Option.some($_91sgzmujfuw8qm5.merge({ cells: cells }, {
      generators: target.generators,
      clipboard: target.clipboard
    })) : Option.none();
  };
  var onMergable = function (warehouse, target) {
    return target.mergable();
  };
  var onUnmergable = function (warehouse, target) {
    return target.unmergable();
  };
  var onCells = function (warehouse, target) {
    var details = $_tyr3yk5jfuw8q47.map(target.selection(), function (cell) {
      return $_aqhz9okhjfuw8q5y.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_cul8qomvjfuw8qm7.cat(details);
    return cells.length > 0 ? Option.some(cells) : Option.none();
  };
  var $_dis709mtjfuw8qlp = {
    run: run,
    toDetailList: toDetailList,
    onCell: onCell,
    onCells: onCells,
    onPaste: onPaste,
    onPasteRows: onPasteRows,
    onMergable: onMergable,
    onUnmergable: onUnmergable
  };

  var value$1 = function (o) {
    var is = function (v) {
      return o === v;
    };
    var or = function (opt) {
      return value$1(o);
    };
    var orThunk = function (f) {
      return value$1(o);
    };
    var map = function (f) {
      return value$1(f(o));
    };
    var each = function (f) {
      f(o);
    };
    var bind = function (f) {
      return f(o);
    };
    var fold = function (_, onValue) {
      return onValue(o);
    };
    var exists = function (f) {
      return f(o);
    };
    var forall = function (f) {
      return f(o);
    };
    var toOption = function () {
      return Option.some(o);
    };
    return {
      is: is,
      isValue: $_20nfr6k7jfuw8q4g.always,
      isError: $_20nfr6k7jfuw8q4g.never,
      getOr: $_20nfr6k7jfuw8q4g.constant(o),
      getOrThunk: $_20nfr6k7jfuw8q4g.constant(o),
      getOrDie: $_20nfr6k7jfuw8q4g.constant(o),
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: each,
      bind: bind,
      exists: exists,
      forall: forall,
      toOption: toOption
    };
  };
  var error = function (message) {
    var getOrThunk = function (f) {
      return f();
    };
    var getOrDie = function () {
      return $_20nfr6k7jfuw8q4g.die(String(message))();
    };
    var or = function (opt) {
      return opt;
    };
    var orThunk = function (f) {
      return f();
    };
    var map = function (f) {
      return error(message);
    };
    var bind = function (f) {
      return error(message);
    };
    var fold = function (onError, _) {
      return onError(message);
    };
    return {
      is: $_20nfr6k7jfuw8q4g.never,
      isValue: $_20nfr6k7jfuw8q4g.never,
      isError: $_20nfr6k7jfuw8q4g.always,
      getOr: $_20nfr6k7jfuw8q4g.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_20nfr6k7jfuw8q4g.noop,
      bind: bind,
      exists: $_20nfr6k7jfuw8q4g.never,
      forall: $_20nfr6k7jfuw8q4g.always,
      toOption: Option.none
    };
  };
  var Result = {
    value: value$1,
    error: error
  };

  var measure = function (startAddress, gridA, gridB) {
    if (startAddress.row() >= gridA.length || startAddress.column() > $_aylxzgmyjfuw8qmj.cellLength(gridA[0]))
      return Result.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
    var rowRemainder = gridA.slice(startAddress.row());
    var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
    var colRequired = $_aylxzgmyjfuw8qmj.cellLength(gridB[0]);
    var rowRequired = gridB.length;
    return Result.value({
      rowDelta: $_20nfr6k7jfuw8q4g.constant(rowRemainder.length - rowRequired),
      colDelta: $_20nfr6k7jfuw8q4g.constant(colRemainder.length - colRequired)
    });
  };
  var measureWidth = function (gridA, gridB) {
    var colLengthA = $_aylxzgmyjfuw8qmj.cellLength(gridA[0]);
    var colLengthB = $_aylxzgmyjfuw8qmj.cellLength(gridB[0]);
    return {
      rowDelta: $_20nfr6k7jfuw8q4g.constant(0),
      colDelta: $_20nfr6k7jfuw8q4g.constant(colLengthA - colLengthB)
    };
  };
  var fill = function (cells, generator) {
    return $_tyr3yk5jfuw8q47.map(cells, function () {
      return $_ce5pyrkgjfuw8q5v.elementnew(generator.cell(), true);
    });
  };
  var rowFill = function (grid, amount, generator) {
    return grid.concat($_fcnwwbn2jfuw8qoa.repeat(amount, function (_row) {
      return $_aylxzgmyjfuw8qmj.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
    }));
  };
  var colFill = function (grid, amount, generator) {
    return $_tyr3yk5jfuw8q47.map(grid, function (row) {
      return $_aylxzgmyjfuw8qmj.setCells(row, row.cells().concat(fill($_fcnwwbn2jfuw8qoa.range(0, amount), generator)));
    });
  };
  var tailor = function (gridA, delta, generator) {
    var fillCols = delta.colDelta() < 0 ? colFill : $_20nfr6k7jfuw8q4g.identity;
    var fillRows = delta.rowDelta() < 0 ? rowFill : $_20nfr6k7jfuw8q4g.identity;
    var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
    var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
    return tailoredGrid;
  };
  var $_pbbdjnbjfuw8qpe = {
    measure: measure,
    measureWidth: measureWidth,
    tailor: tailor
  };

  var merge$2 = function (grid, bounds, comparator, substitution) {
    if (grid.length === 0)
      return grid;
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        $_aylxzgmyjfuw8qmj.mutateCell(grid[i], j, $_ce5pyrkgjfuw8q5v.elementnew(substitution(), false));
      }
    }
    return grid;
  };
  var unmerge = function (grid, target, comparator, substitution) {
    var first = true;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < $_aylxzgmyjfuw8qmj.cellLength(grid[0]); j++) {
        var current = $_aylxzgmyjfuw8qmj.getCellElement(grid[i], j);
        var isToReplace = comparator(current, target);
        if (isToReplace === true && first === false) {
          $_aylxzgmyjfuw8qmj.mutateCell(grid[i], j, $_ce5pyrkgjfuw8q5v.elementnew(substitution(), true));
        } else if (isToReplace === true) {
          first = false;
        }
      }
    }
    return grid;
  };
  var uniqueCells = function (row, comparator) {
    return $_tyr3yk5jfuw8q47.foldl(row, function (rest, cell) {
      return $_tyr3yk5jfuw8q47.exists(rest, function (currentCell) {
        return comparator(currentCell.element(), cell.element());
      }) ? rest : rest.concat([cell]);
    }, []);
  };
  var splitRows = function (grid, index, comparator, substitution) {
    if (index > 0 && index < grid.length) {
      var rowPrevCells = grid[index - 1].cells();
      var cells = uniqueCells(rowPrevCells, comparator);
      $_tyr3yk5jfuw8q47.each(cells, function (cell) {
        var replacement = Option.none();
        for (var i = index; i < grid.length; i++) {
          for (var j = 0; j < $_aylxzgmyjfuw8qmj.cellLength(grid[0]); j++) {
            var current = grid[i].cells()[j];
            var isToReplace = comparator(current.element(), cell.element());
            if (isToReplace) {
              if (replacement.isNone()) {
                replacement = Option.some(substitution());
              }
              replacement.each(function (sub) {
                $_aylxzgmyjfuw8qmj.mutateCell(grid[i], j, $_ce5pyrkgjfuw8q5v.elementnew(sub, true));
              });
            }
          }
        }
      });
    }
    return grid;
  };
  var $_72fqzkndjfuw8qpp = {
    merge: merge$2,
    unmerge: unmerge,
    splitRows: splitRows
  };

  var isSpanning = function (grid, row, col, comparator) {
    var candidate = $_aylxzgmyjfuw8qmj.getCell(grid[row], col);
    var matching = $_20nfr6k7jfuw8q4g.curry(comparator, candidate.element());
    var currentRow = grid[row];
    return grid.length > 1 && $_aylxzgmyjfuw8qmj.cellLength(currentRow) > 1 && (col > 0 && matching($_aylxzgmyjfuw8qmj.getCellElement(currentRow, col - 1)) || col < currentRow.length - 1 && matching($_aylxzgmyjfuw8qmj.getCellElement(currentRow, col + 1)) || row > 0 && matching($_aylxzgmyjfuw8qmj.getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching($_aylxzgmyjfuw8qmj.getCellElement(grid[row + 1], col)));
  };
  var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
    var startRow = startAddress.row();
    var startCol = startAddress.column();
    var mergeHeight = gridB.length;
    var mergeWidth = $_aylxzgmyjfuw8qmj.cellLength(gridB[0]);
    var endRow = startRow + mergeHeight;
    var endCol = startCol + mergeWidth;
    for (var r = startRow; r < endRow; r++) {
      for (var c = startCol; c < endCol; c++) {
        if (isSpanning(gridA, r, c, comparator)) {
          $_72fqzkndjfuw8qpp.unmerge(gridA, $_aylxzgmyjfuw8qmj.getCellElement(gridA[r], c), comparator, generator.cell);
        }
        var newCell = $_aylxzgmyjfuw8qmj.getCellElement(gridB[r - startRow], c - startCol);
        var replacement = generator.replace(newCell);
        $_aylxzgmyjfuw8qmj.mutateCell(gridA[r], c, $_ce5pyrkgjfuw8q5v.elementnew(replacement, true));
      }
    }
    return gridA;
  };
  var merge$3 = function (startAddress, gridA, gridB, generator, comparator) {
    var result = $_pbbdjnbjfuw8qpe.measure(startAddress, gridA, gridB);
    return result.map(function (delta) {
      var fittedGrid = $_pbbdjnbjfuw8qpe.tailor(gridA, delta, generator);
      return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
    });
  };
  var insert = function (index, gridA, gridB, generator, comparator) {
    $_72fqzkndjfuw8qpp.splitRows(gridA, index, comparator, generator.cell);
    var delta = $_pbbdjnbjfuw8qpe.measureWidth(gridB, gridA);
    var fittedNewGrid = $_pbbdjnbjfuw8qpe.tailor(gridB, delta, generator);
    var secondDelta = $_pbbdjnbjfuw8qpe.measureWidth(gridA, fittedNewGrid);
    var fittedOldGrid = $_pbbdjnbjfuw8qpe.tailor(gridA, secondDelta, generator);
    return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
  };
  var $_5jycvqnajfuw8qp5 = {
    merge: merge$3,
    insert: insert
  };

  var insertRowAt = function (grid, index, example, comparator, substitution) {
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_aylxzgmyjfuw8qmj.mapCells(grid[example], function (ex, c) {
      var withinSpan = index > 0 && index < grid.length && comparator($_aylxzgmyjfuw8qmj.getCellElement(grid[index - 1], c), $_aylxzgmyjfuw8qmj.getCellElement(grid[index], c));
      var ret = withinSpan ? $_aylxzgmyjfuw8qmj.getCell(grid[index], c) : $_ce5pyrkgjfuw8q5v.elementnew(substitution(ex.element(), comparator), true);
      return ret;
    });
    return before.concat([between]).concat(after);
  };
  var insertColumnAt = function (grid, index, example, comparator, substitution) {
    return $_tyr3yk5jfuw8q47.map(grid, function (row) {
      var withinSpan = index > 0 && index < $_aylxzgmyjfuw8qmj.cellLength(row) && comparator($_aylxzgmyjfuw8qmj.getCellElement(row, index - 1), $_aylxzgmyjfuw8qmj.getCellElement(row, index));
      var sub = withinSpan ? $_aylxzgmyjfuw8qmj.getCell(row, index) : $_ce5pyrkgjfuw8q5v.elementnew(substitution($_aylxzgmyjfuw8qmj.getCellElement(row, example), comparator), true);
      return $_aylxzgmyjfuw8qmj.addCell(row, index, sub);
    });
  };
  var splitCellIntoColumns = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleCol + 1;
    return $_tyr3yk5jfuw8q47.map(grid, function (row, i) {
      var isTargetCell = i === exampleRow;
      var sub = isTargetCell ? $_ce5pyrkgjfuw8q5v.elementnew(substitution($_aylxzgmyjfuw8qmj.getCellElement(row, exampleCol), comparator), true) : $_aylxzgmyjfuw8qmj.getCell(row, exampleCol);
      return $_aylxzgmyjfuw8qmj.addCell(row, index, sub);
    });
  };
  var splitCellIntoRows = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleRow + 1;
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_aylxzgmyjfuw8qmj.mapCells(grid[exampleRow], function (ex, i) {
      var isTargetCell = i === exampleCol;
      return isTargetCell ? $_ce5pyrkgjfuw8q5v.elementnew(substitution(ex.element(), comparator), true) : ex;
    });
    return before.concat([between]).concat(after);
  };
  var deleteColumnsAt = function (grid, start, finish) {
    var rows = $_tyr3yk5jfuw8q47.map(grid, function (row) {
      var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
      return $_ce5pyrkgjfuw8q5v.rowcells(cells, row.section());
    });
    return $_tyr3yk5jfuw8q47.filter(rows, function (row) {
      return row.cells().length > 0;
    });
  };
  var deleteRowsAt = function (grid, start, finish) {
    return grid.slice(0, start).concat(grid.slice(finish + 1));
  };
  var $_22uvfenejfuw8qpx = {
    insertRowAt: insertRowAt,
    insertColumnAt: insertColumnAt,
    splitCellIntoColumns: splitCellIntoColumns,
    splitCellIntoRows: splitCellIntoRows,
    deleteRowsAt: deleteRowsAt,
    deleteColumnsAt: deleteColumnsAt
  };

  var replaceIn = function (grid, targets, comparator, substitution) {
    var isTarget = function (cell) {
      return $_tyr3yk5jfuw8q47.exists(targets, function (target) {
        return comparator(cell.element(), target.element());
      });
    };
    return $_tyr3yk5jfuw8q47.map(grid, function (row) {
      return $_aylxzgmyjfuw8qmj.mapCells(row, function (cell) {
        return isTarget(cell) ? $_ce5pyrkgjfuw8q5v.elementnew(substitution(cell.element(), comparator), true) : cell;
      });
    });
  };
  var notStartRow = function (grid, rowIndex, colIndex, comparator) {
    return $_aylxzgmyjfuw8qmj.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator($_aylxzgmyjfuw8qmj.getCellElement(grid[rowIndex - 1], colIndex), $_aylxzgmyjfuw8qmj.getCellElement(grid[rowIndex], colIndex)));
  };
  var notStartColumn = function (row, index, comparator) {
    return index > 0 && comparator($_aylxzgmyjfuw8qmj.getCellElement(row, index - 1), $_aylxzgmyjfuw8qmj.getCellElement(row, index));
  };
  var replaceColumn = function (grid, index, comparator, substitution) {
    var targets = $_tyr3yk5jfuw8q47.bind(grid, function (row, i) {
      var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
      return alreadyAdded ? [] : [$_aylxzgmyjfuw8qmj.getCell(row, index)];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var replaceRow = function (grid, index, comparator, substitution) {
    var targetRow = grid[index];
    var targets = $_tyr3yk5jfuw8q47.bind(targetRow.cells(), function (item, i) {
      var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
      return alreadyAdded ? [] : [item];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var $_507pt2nfjfuw8qq2 = {
    replaceColumn: replaceColumn,
    replaceRow: replaceRow
  };

  var none$1 = function () {
    return folder(function (n, o, l, m, r) {
      return n();
    });
  };
  var only = function (index) {
    return folder(function (n, o, l, m, r) {
      return o(index);
    });
  };
  var left = function (index, next) {
    return folder(function (n, o, l, m, r) {
      return l(index, next);
    });
  };
  var middle = function (prev, index, next) {
    return folder(function (n, o, l, m, r) {
      return m(prev, index, next);
    });
  };
  var right = function (prev, index) {
    return folder(function (n, o, l, m, r) {
      return r(prev, index);
    });
  };
  var folder = function (fold) {
    return { fold: fold };
  };
  var $_17zkjbnijfuw8qqk = {
    none: none$1,
    only: only,
    left: left,
    middle: middle,
    right: right
  };

  var neighbours$1 = function (input, index) {
    if (input.length === 0)
      return $_17zkjbnijfuw8qqk.none();
    if (input.length === 1)
      return $_17zkjbnijfuw8qqk.only(0);
    if (index === 0)
      return $_17zkjbnijfuw8qqk.left(0, 1);
    if (index === input.length - 1)
      return $_17zkjbnijfuw8qqk.right(index - 1, index);
    if (index > 0 && index < input.length - 1)
      return $_17zkjbnijfuw8qqk.middle(index - 1, index, index + 1);
    return $_17zkjbnijfuw8qqk.none();
  };
  var determine = function (input, column, step, tableSize) {
    var result = input.slice(0);
    var context = neighbours$1(input, column);
    var zero = function (array) {
      return $_tyr3yk5jfuw8q47.map(array, $_20nfr6k7jfuw8q4g.constant(0));
    };
    var onNone = $_20nfr6k7jfuw8q4g.constant(zero(result));
    var onOnly = function (index) {
      return tableSize.singleColumnWidth(result[index], step);
    };
    var onChange = function (index, next) {
      if (step >= 0) {
        var newNext = Math.max(tableSize.minCellWidth(), result[next] - step);
        return zero(result.slice(0, index)).concat([
          step,
          newNext - result[next]
        ]).concat(zero(result.slice(next + 1)));
      } else {
        var newThis = Math.max(tableSize.minCellWidth(), result[index] + step);
        var diffx = result[index] - newThis;
        return zero(result.slice(0, index)).concat([
          newThis - result[index],
          diffx
        ]).concat(zero(result.slice(next + 1)));
      }
    };
    var onLeft = onChange;
    var onMiddle = function (prev, index, next) {
      return onChange(index, next);
    };
    var onRight = function (prev, index) {
      if (step >= 0) {
        return zero(result.slice(0, index)).concat([step]);
      } else {
        var size = Math.max(tableSize.minCellWidth(), result[index] + step);
        return zero(result.slice(0, index)).concat([size - result[index]]);
      }
    };
    return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
  };
  var $_7b8knbnhjfuw8qqd = { determine: determine };

  var getSpan$1 = function (cell, type) {
    return $_3q82t2l5jfuw8q93.has(cell, type) && parseInt($_3q82t2l5jfuw8q93.get(cell, type), 10) > 1;
  };
  var hasColspan = function (cell) {
    return getSpan$1(cell, 'colspan');
  };
  var hasRowspan = function (cell) {
    return getSpan$1(cell, 'rowspan');
  };
  var getInt = function (element, property) {
    return parseInt($_bfod2hlejfuw8qac.get(element, property), 10);
  };
  var $_63qtcvnkjfuw8qqu = {
    hasColspan: hasColspan,
    hasRowspan: hasRowspan,
    minWidth: $_20nfr6k7jfuw8q4g.constant(10),
    minHeight: $_20nfr6k7jfuw8q4g.constant(10),
    getInt: getInt
  };

  var getRaw$1 = function (cell, property, getter) {
    return $_bfod2hlejfuw8qac.getRaw(cell, property).fold(function () {
      return getter(cell) + 'px';
    }, function (raw) {
      return raw;
    });
  };
  var getRawW = function (cell) {
    return getRaw$1(cell, 'width', $_by2skemajfuw8qhj.getPixelWidth);
  };
  var getRawH = function (cell) {
    return getRaw$1(cell, 'height', $_by2skemajfuw8qhj.getHeight);
  };
  var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
    var columns = $_9oko5pn1jfuw8qo0.columns(warehouse);
    var backups = $_tyr3yk5jfuw8q47.map(columns, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_tyr3yk5jfuw8q47.map(columns, function (cellOption, c) {
      var columnCell = cellOption.filter($_20nfr6k7jfuw8q4g.not($_63qtcvnkjfuw8qqu.hasColspan));
      return columnCell.fold(function () {
        var deduced = $_fcnwwbn2jfuw8qoa.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getWidth(cell, tableSize);
      });
    });
  };
  var getDeduced = function (deduced) {
    return deduced.map(function (d) {
      return d + 'px';
    }).getOr('');
  };
  var getRawWidths = function (warehouse, direction) {
    return getWidthFrom(warehouse, direction, getRawW, getDeduced);
  };
  var getPercentageWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_by2skemajfuw8qhj.getPercentageWidth, function (deduced) {
      return deduced.fold(function () {
        return tableSize.minCellWidth();
      }, function (cellWidth) {
        return cellWidth / tableSize.pixelWidth() * 100;
      });
    }, tableSize);
  };
  var getPixelWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_by2skemajfuw8qhj.getPixelWidth, function (deduced) {
      return deduced.getOrThunk(tableSize.minCellWidth);
    }, tableSize);
  };
  var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
    var rows = $_9oko5pn1jfuw8qo0.rows(warehouse);
    var backups = $_tyr3yk5jfuw8q47.map(rows, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_tyr3yk5jfuw8q47.map(rows, function (cellOption, c) {
      var rowCell = cellOption.filter($_20nfr6k7jfuw8q4g.not($_63qtcvnkjfuw8qqu.hasRowspan));
      return rowCell.fold(function () {
        var deduced = $_fcnwwbn2jfuw8qoa.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getHeight(cell);
      });
    });
  };
  var getPixelHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, $_by2skemajfuw8qhj.getHeight, function (deduced) {
      return deduced.getOrThunk($_63qtcvnkjfuw8qqu.minHeight);
    });
  };
  var getRawHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, getRawH, getDeduced);
  };
  var $_694691njjfuw8qqm = {
    getRawWidths: getRawWidths,
    getPixelWidths: getPixelWidths,
    getPercentageWidths: getPercentageWidths,
    getPixelHeights: getPixelHeights,
    getRawHeights: getRawHeights
  };

  var total = function (start, end, measures) {
    var r = 0;
    for (var i = start; i < end; i++) {
      r += measures[i] !== undefined ? measures[i] : 0;
    }
    return r;
  };
  var recalculateWidth = function (warehouse, widths) {
    var all = $_2ge24cldjfuw8qa3.justCells(warehouse);
    return $_tyr3yk5jfuw8q47.map(all, function (cell) {
      var width = total(cell.column(), cell.column() + cell.colspan(), widths);
      return {
        element: cell.element,
        width: $_20nfr6k7jfuw8q4g.constant(width),
        colspan: cell.colspan
      };
    });
  };
  var recalculateHeight = function (warehouse, heights) {
    var all = $_2ge24cldjfuw8qa3.justCells(warehouse);
    return $_tyr3yk5jfuw8q47.map(all, function (cell) {
      var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
      return {
        element: cell.element,
        height: $_20nfr6k7jfuw8q4g.constant(height),
        rowspan: cell.rowspan
      };
    });
  };
  var matchRowHeight = function (warehouse, heights) {
    return $_tyr3yk5jfuw8q47.map(warehouse.all(), function (row, i) {
      return {
        element: row.element,
        height: $_20nfr6k7jfuw8q4g.constant(heights[i])
      };
    });
  };
  var $_2ltb63nljfuw8qr5 = {
    recalculateWidth: recalculateWidth,
    recalculateHeight: recalculateHeight,
    matchRowHeight: matchRowHeight
  };

  var percentageSize = function (width, element) {
    var floatWidth = parseFloat(width);
    var pixelWidth = $_fj252lmejfuw8qin.get(element);
    var getCellDelta = function (delta) {
      return delta / pixelWidth * 100;
    };
    var singleColumnWidth = function (width, _delta) {
      return [100 - width];
    };
    var minCellWidth = function () {
      return $_63qtcvnkjfuw8qqu.minWidth() / pixelWidth * 100;
    };
    var setTableWidth = function (table, _newWidths, delta) {
      var total = floatWidth + delta;
      $_by2skemajfuw8qhj.setPercentageWidth(table, total);
    };
    return {
      width: $_20nfr6k7jfuw8q4g.constant(floatWidth),
      pixelWidth: $_20nfr6k7jfuw8q4g.constant(pixelWidth),
      getWidths: $_694691njjfuw8qqm.getPercentageWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: minCellWidth,
      setElementWidth: $_by2skemajfuw8qhj.setPercentageWidth,
      setTableWidth: setTableWidth
    };
  };
  var pixelSize = function (width) {
    var intWidth = parseInt(width, 10);
    var getCellDelta = $_20nfr6k7jfuw8q4g.identity;
    var singleColumnWidth = function (width, delta) {
      var newNext = Math.max($_63qtcvnkjfuw8qqu.minWidth(), width + delta);
      return [newNext - width];
    };
    var setTableWidth = function (table, newWidths, _delta) {
      var total = $_tyr3yk5jfuw8q47.foldr(newWidths, function (b, a) {
        return b + a;
      }, 0);
      $_by2skemajfuw8qhj.setPixelWidth(table, total);
    };
    return {
      width: $_20nfr6k7jfuw8q4g.constant(intWidth),
      pixelWidth: $_20nfr6k7jfuw8q4g.constant(intWidth),
      getWidths: $_694691njjfuw8qqm.getPixelWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: $_63qtcvnkjfuw8qqu.minWidth,
      setElementWidth: $_by2skemajfuw8qhj.setPixelWidth,
      setTableWidth: setTableWidth
    };
  };
  var chooseSize = function (element, width) {
    if ($_by2skemajfuw8qhj.percentageBasedSizeRegex().test(width)) {
      var percentMatch = $_by2skemajfuw8qhj.percentageBasedSizeRegex().exec(width);
      return percentageSize(percentMatch[1], element);
    } else if ($_by2skemajfuw8qhj.pixelBasedSizeRegex().test(width)) {
      var pixelMatch = $_by2skemajfuw8qhj.pixelBasedSizeRegex().exec(width);
      return pixelSize(pixelMatch[1]);
    } else {
      var fallbackWidth = $_fj252lmejfuw8qin.get(element);
      return pixelSize(fallbackWidth);
    }
  };
  var getTableSize = function (element) {
    var width = $_by2skemajfuw8qhj.getRawWidth(element);
    return width.fold(function () {
      var fallbackWidth = $_fj252lmejfuw8qin.get(element);
      return pixelSize(fallbackWidth);
    }, function (width) {
      return chooseSize(element, width);
    });
  };
  var $_2o9g1qnmjfuw8qrh = { getTableSize: getTableSize };

  var getWarehouse$1 = function (list) {
    return $_2ge24cldjfuw8qa3.generate(list);
  };
  var sumUp = function (newSize) {
    return $_tyr3yk5jfuw8q47.foldr(newSize, function (b, a) {
      return b + a;
    }, 0);
  };
  var getTableWarehouse = function (table) {
    var list = $_dy3x0nkfjfuw8q5l.fromTable(table);
    return getWarehouse$1(list);
  };
  var adjustWidth = function (table, delta, index, direction) {
    var tableSize = $_2o9g1qnmjfuw8qrh.getTableSize(table);
    var step = tableSize.getCellDelta(delta);
    var warehouse = getTableWarehouse(table);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var deltas = $_7b8knbnhjfuw8qqd.determine(widths, index, step, tableSize);
    var newWidths = $_tyr3yk5jfuw8q47.map(deltas, function (dx, i) {
      return dx + widths[i];
    });
    var newSizes = $_2ltb63nljfuw8qr5.recalculateWidth(warehouse, newWidths);
    $_tyr3yk5jfuw8q47.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    if (index === warehouse.grid().columns() - 1) {
      tableSize.setTableWidth(table, newWidths, step);
    }
  };
  var adjustHeight = function (table, delta, index, direction) {
    var warehouse = getTableWarehouse(table);
    var heights = $_694691njjfuw8qqm.getPixelHeights(warehouse, direction);
    var newHeights = $_tyr3yk5jfuw8q47.map(heights, function (dy, i) {
      return index === i ? Math.max(delta + dy, $_63qtcvnkjfuw8qqu.minHeight()) : dy;
    });
    var newCellSizes = $_2ltb63nljfuw8qr5.recalculateHeight(warehouse, newHeights);
    var newRowSizes = $_2ltb63nljfuw8qr5.matchRowHeight(warehouse, newHeights);
    $_tyr3yk5jfuw8q47.each(newRowSizes, function (row) {
      $_by2skemajfuw8qhj.setHeight(row.element(), row.height());
    });
    $_tyr3yk5jfuw8q47.each(newCellSizes, function (cell) {
      $_by2skemajfuw8qhj.setHeight(cell.element(), cell.height());
    });
    var total = sumUp(newHeights);
    $_by2skemajfuw8qhj.setHeight(table, total);
  };
  var adjustWidthTo = function (table, list, direction) {
    var tableSize = $_2o9g1qnmjfuw8qrh.getTableSize(table);
    var warehouse = getWarehouse$1(list);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var newSizes = $_2ltb63nljfuw8qr5.recalculateWidth(warehouse, widths);
    $_tyr3yk5jfuw8q47.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    var total = $_tyr3yk5jfuw8q47.foldr(widths, function (b, a) {
      return a + b;
    }, 0);
    if (newSizes.length > 0) {
      tableSize.setElementWidth(table, total);
    }
  };
  var $_cwciisngjfuw8qq6 = {
    adjustWidth: adjustWidth,
    adjustHeight: adjustHeight,
    adjustWidthTo: adjustWidthTo
  };

  var prune = function (table) {
    var cells = $_aqhz9okhjfuw8q5y.cells(table);
    if (cells.length === 0)
      $_fl1deelhjfuw8qax.remove(table);
  };
  var outcome = $_5now9kbjfuw8q5e.immutable('grid', 'cursor');
  var elementFromGrid = function (grid, row, column) {
    return findIn(grid, row, column).orThunk(function () {
      return findIn(grid, 0, 0);
    });
  };
  var findIn = function (grid, row, column) {
    return Option.from(grid[row]).bind(function (r) {
      return Option.from(r.cells()[column]).bind(function (c) {
        return Option.from(c.element());
      });
    });
  };
  var bundle = function (grid, row, column) {
    return outcome(grid, findIn(grid, row, column));
  };
  var uniqueRows = function (details) {
    return $_tyr3yk5jfuw8q47.foldl(details, function (rest, detail) {
      return $_tyr3yk5jfuw8q47.exists(rest, function (currentDetail) {
        return currentDetail.row() === detail.row();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.row() - detailB.row();
    });
  };
  var uniqueColumns = function (details) {
    return $_tyr3yk5jfuw8q47.foldl(details, function (rest, detail) {
      return $_tyr3yk5jfuw8q47.exists(rest, function (currentDetail) {
        return currentDetail.column() === detail.column();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.column() - detailB.column();
    });
  };
  var insertRowBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row();
    var newGrid = $_22uvfenejfuw8qpx.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsBefore = function (grid, details, comparator, genWrappers) {
    var example = details[0].row();
    var targetIndex = details[0].row();
    var rows = uniqueRows(details);
    var newGrid = $_tyr3yk5jfuw8q47.foldl(rows, function (newGrid, _row) {
      return $_22uvfenejfuw8qpx.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertRowAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row() + detail.rowspan();
    var newGrid = $_22uvfenejfuw8qpx.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsAfter = function (grid, details, comparator, genWrappers) {
    var rows = uniqueRows(details);
    var example = rows[rows.length - 1].row();
    var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
    var newGrid = $_tyr3yk5jfuw8q47.foldl(rows, function (newGrid, _row) {
      return $_22uvfenejfuw8qpx.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column();
    var newGrid = $_22uvfenejfuw8qpx.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
    var columns = uniqueColumns(details);
    var example = columns[0].column();
    var targetIndex = columns[0].column();
    var newGrid = $_tyr3yk5jfuw8q47.foldl(columns, function (newGrid, _row) {
      return $_22uvfenejfuw8qpx.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column() + detail.colspan();
    var newGrid = $_22uvfenejfuw8qpx.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
    var example = details[details.length - 1].column();
    var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
    var columns = uniqueColumns(details);
    var newGrid = $_tyr3yk5jfuw8q47.foldl(columns, function (newGrid, _row) {
      return $_22uvfenejfuw8qpx.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var makeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_507pt2nfjfuw8qq2.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_507pt2nfjfuw8qq2.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_507pt2nfjfuw8qq2.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_507pt2nfjfuw8qq2.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoColumns$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_22uvfenejfuw8qpx.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoRows$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_22uvfenejfuw8qpx.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var eraseColumns = function (grid, details, comparator, _genWrappers) {
    var columns = uniqueColumns(details);
    var newGrid = $_22uvfenejfuw8qpx.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var eraseRows = function (grid, details, comparator, _genWrappers) {
    var rows = uniqueRows(details);
    var newGrid = $_22uvfenejfuw8qpx.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var mergeCells = function (grid, mergable, comparator, _genWrappers) {
    var cells = mergable.cells();
    $_ancl40mqjfuw8qkm.merge(cells);
    var newGrid = $_72fqzkndjfuw8qpp.merge(grid, mergable.bounds(), comparator, $_20nfr6k7jfuw8q4g.constant(cells[0]));
    return outcome(newGrid, Option.from(cells[0]));
  };
  var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
    var newGrid = $_tyr3yk5jfuw8q47.foldr(unmergable, function (b, cell) {
      return $_72fqzkndjfuw8qpp.unmerge(b, cell, comparator, genWrappers.combine(cell));
    }, grid);
    return outcome(newGrid, Option.from(unmergable[0]));
  };
  var pasteCells = function (grid, pasteDetails, comparator, genWrappers) {
    var gridify = function (table, generators) {
      var list = $_dy3x0nkfjfuw8q5l.fromTable(table);
      var wh = $_2ge24cldjfuw8qa3.generate(list);
      return $_cw9o3smwjfuw8qm9.toGrid(wh, generators, true);
    };
    var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
    var startAddress = $_ce5pyrkgjfuw8q5v.address(pasteDetails.row(), pasteDetails.column());
    var mergedGrid = $_5jycvqnajfuw8qp5.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
    return mergedGrid.fold(function () {
      return outcome(grid, Option.some(pasteDetails.element()));
    }, function (nuGrid) {
      var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
      return outcome(nuGrid, cursor);
    });
  };
  var gridifyRows = function (rows, generators, example) {
    var pasteDetails = $_dy3x0nkfjfuw8q5l.fromPastedRows(rows, example);
    var wh = $_2ge24cldjfuw8qa3.generate(pasteDetails);
    return $_cw9o3smwjfuw8qm9.toGrid(wh, generators, true);
  };
  var pasteRowsBefore = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[0].row();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_5jycvqnajfuw8qp5.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var pasteRowsAfter = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_5jycvqnajfuw8qp5.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var resize = $_cwciisngjfuw8qq6.adjustWidthTo;
  var $_2i21xzmmjfuw8qjg = {
    insertRowBefore: $_dis709mtjfuw8qlp.run(insertRowBefore, $_dis709mtjfuw8qlp.onCell, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    insertRowsBefore: $_dis709mtjfuw8qlp.run(insertRowsBefore, $_dis709mtjfuw8qlp.onCells, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    insertRowAfter: $_dis709mtjfuw8qlp.run(insertRowAfter, $_dis709mtjfuw8qlp.onCell, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    insertRowsAfter: $_dis709mtjfuw8qlp.run(insertRowsAfter, $_dis709mtjfuw8qlp.onCells, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    insertColumnBefore: $_dis709mtjfuw8qlp.run(insertColumnBefore, $_dis709mtjfuw8qlp.onCell, resize, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    insertColumnsBefore: $_dis709mtjfuw8qlp.run(insertColumnsBefore, $_dis709mtjfuw8qlp.onCells, resize, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    insertColumnAfter: $_dis709mtjfuw8qlp.run(insertColumnAfter, $_dis709mtjfuw8qlp.onCell, resize, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    insertColumnsAfter: $_dis709mtjfuw8qlp.run(insertColumnsAfter, $_dis709mtjfuw8qlp.onCells, resize, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    splitCellIntoColumns: $_dis709mtjfuw8qlp.run(splitCellIntoColumns$1, $_dis709mtjfuw8qlp.onCell, resize, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    splitCellIntoRows: $_dis709mtjfuw8qlp.run(splitCellIntoRows$1, $_dis709mtjfuw8qlp.onCell, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    eraseColumns: $_dis709mtjfuw8qlp.run(eraseColumns, $_dis709mtjfuw8qlp.onCells, resize, prune, $_eoocrvmnjfuw8qk1.modification),
    eraseRows: $_dis709mtjfuw8qlp.run(eraseRows, $_dis709mtjfuw8qlp.onCells, $_20nfr6k7jfuw8q4g.noop, prune, $_eoocrvmnjfuw8qk1.modification),
    makeColumnHeader: $_dis709mtjfuw8qlp.run(makeColumnHeader, $_dis709mtjfuw8qlp.onCell, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.transform('row', 'th')),
    unmakeColumnHeader: $_dis709mtjfuw8qlp.run(unmakeColumnHeader, $_dis709mtjfuw8qlp.onCell, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.transform(null, 'td')),
    makeRowHeader: $_dis709mtjfuw8qlp.run(makeRowHeader, $_dis709mtjfuw8qlp.onCell, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.transform('col', 'th')),
    unmakeRowHeader: $_dis709mtjfuw8qlp.run(unmakeRowHeader, $_dis709mtjfuw8qlp.onCell, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.transform(null, 'td')),
    mergeCells: $_dis709mtjfuw8qlp.run(mergeCells, $_dis709mtjfuw8qlp.onMergable, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.merging),
    unmergeCells: $_dis709mtjfuw8qlp.run(unmergeCells, $_dis709mtjfuw8qlp.onUnmergable, resize, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.merging),
    pasteCells: $_dis709mtjfuw8qlp.run(pasteCells, $_dis709mtjfuw8qlp.onPaste, resize, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    pasteRowsBefore: $_dis709mtjfuw8qlp.run(pasteRowsBefore, $_dis709mtjfuw8qlp.onPasteRows, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification),
    pasteRowsAfter: $_dis709mtjfuw8qlp.run(pasteRowsAfter, $_dis709mtjfuw8qlp.onPasteRows, $_20nfr6k7jfuw8q4g.noop, $_20nfr6k7jfuw8q4g.noop, $_eoocrvmnjfuw8qk1.modification)
  };

  var getBody$1 = function (editor) {
    return $_xbeoqkkjfuw8q73.fromDom(editor.getBody());
  };
  var getIsRoot = function (editor) {
    return function (element) {
      return $_e8rn66kojfuw8q7n.eq(element, getBody$1(editor));
    };
  };
  var removePxSuffix = function (size) {
    return size ? size.replace(/px$/, '') : '';
  };
  var addSizeSuffix = function (size) {
    if (/^[0-9]+$/.test(size)) {
      size += 'px';
    }
    return size;
  };
  var $_5xkhf2nnjfuw8qrq = {
    getBody: getBody$1,
    getIsRoot: getIsRoot,
    addSizeSuffix: addSizeSuffix,
    removePxSuffix: removePxSuffix
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_bfod2hlejfuw8qac.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_a5xia4npjfuw8qs0 = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var ltr$1 = { isRtl: $_20nfr6k7jfuw8q4g.constant(false) };
  var rtl$1 = { isRtl: $_20nfr6k7jfuw8q4g.constant(true) };
  var directionAt = function (element) {
    var dir = $_a5xia4npjfuw8qs0.getDirection(element);
    return dir === 'rtl' ? rtl$1 : ltr$1;
  };
  var $_4xd1udnojfuw8qrw = { directionAt: directionAt };

  var defaultTableToolbar = [
    'tableprops',
    'tabledelete',
    '|',
    'tableinsertrowbefore',
    'tableinsertrowafter',
    'tabledeleterow',
    '|',
    'tableinsertcolbefore',
    'tableinsertcolafter',
    'tabledeletecol'
  ];
  var defaultStyles = {
    'border-collapse': 'collapse',
    'width': '100%'
  };
  var defaultAttributes = { border: '1' };
  var getDefaultAttributes = function (editor) {
    return editor.getParam('table_default_attributes', defaultAttributes, 'object');
  };
  var getDefaultStyles = function (editor) {
    return editor.getParam('table_default_styles', defaultStyles, 'object');
  };
  var hasTableResizeBars = function (editor) {
    return editor.getParam('table_resize_bars', true, 'boolean');
  };
  var hasTabNavigation = function (editor) {
    return editor.getParam('table_tab_navigation', true, 'boolean');
  };
  var hasAdvancedCellTab = function (editor) {
    return editor.getParam('table_cell_advtab', true, 'boolean');
  };
  var hasAdvancedRowTab = function (editor) {
    return editor.getParam('table_row_advtab', true, 'boolean');
  };
  var hasAdvancedTableTab = function (editor) {
    return editor.getParam('table_advtab', true, 'boolean');
  };
  var hasAppearanceOptions = function (editor) {
    return editor.getParam('table_appearance_options', true, 'boolean');
  };
  var hasTableGrid = function (editor) {
    return editor.getParam('table_grid', true, 'boolean');
  };
  var shouldStyleWithCss = function (editor) {
    return editor.getParam('table_style_by_css', false, 'boolean');
  };
  var getCellClassList = function (editor) {
    return editor.getParam('table_cell_class_list', [], 'array');
  };
  var getRowClassList = function (editor) {
    return editor.getParam('table_row_class_list', [], 'array');
  };
  var getTableClassList = function (editor) {
    return editor.getParam('table_class_list', [], 'array');
  };
  var getColorPickerCallback = function (editor) {
    return editor.getParam('color_picker_callback');
  };
  var isPixelsForced = function (editor) {
    return editor.getParam('table_responsive_width') === false;
  };
  var getCloneElements = function (editor) {
    var cloneElements = editor.getParam('table_clone_elements');
    if ($_g6mvnrk8jfuw8q4k.isString(cloneElements)) {
      return Option.some(cloneElements.split(/[ ,]/));
    } else if (Array.isArray(cloneElements)) {
      return Option.some(cloneElements);
    } else {
      return Option.none();
    }
  };
  var hasObjectResizing = function (editor) {
    var objectResizing = editor.getParam('object_resizing', true);
    return objectResizing === 'table' || objectResizing;
  };
  var getToolbar = function (editor) {
    var toolbar = editor.getParam('table_toolbar', defaultTableToolbar);
    if (toolbar === '' || toolbar === false) {
      return [];
    } else if ($_g6mvnrk8jfuw8q4k.isString(toolbar)) {
      return toolbar.split(/[ ,]/);
    } else if ($_g6mvnrk8jfuw8q4k.isArray(toolbar)) {
      return toolbar;
    } else {
      return [];
    }
  };

  var fireNewRow = function (editor, row) {
    return editor.fire('newrow', { node: row });
  };
  var fireNewCell = function (editor, cell) {
    return editor.fire('newcell', { node: cell });
  };

  var TableActions = function (editor, lazyWire) {
    var isTableBody = function (editor) {
      return $_a8gk30l6jfuw8q9c.name($_5xkhf2nnjfuw8qrq.getBody(editor)) === 'table';
    };
    var lastRowGuard = function (table) {
      var size = $_b452wimljfuw8qjd.getGridSize(table);
      return isTableBody(editor) === false || size.rows() > 1;
    };
    var lastColumnGuard = function (table) {
      var size = $_b452wimljfuw8qjd.getGridSize(table);
      return isTableBody(editor) === false || size.columns() > 1;
    };
    var cloneFormats = getCloneElements(editor);
    var execute = function (operation, guard, mutate, lazyWire) {
      return function (table, target) {
        var dataStyleCells = $_6c9d0hl7jfuw8q9d.descendants(table, 'td[data-mce-style],th[data-mce-style]');
        $_tyr3yk5jfuw8q47.each(dataStyleCells, function (cell) {
          $_3q82t2l5jfuw8q93.remove(cell, 'data-mce-style');
        });
        var wire = lazyWire();
        var doc = $_xbeoqkkjfuw8q73.fromDom(editor.getDoc());
        var direction = TableDirection($_4xd1udnojfuw8qrw.directionAt);
        var generators = $_5ohg1eljjfuw8qb4.cellOperations(mutate, doc, cloneFormats);
        return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
          $_tyr3yk5jfuw8q47.each(result.newRows(), function (row) {
            fireNewRow(editor, row.dom());
          });
          $_tyr3yk5jfuw8q47.each(result.newCells(), function (cell) {
            fireNewCell(editor, cell.dom());
          });
          return result.cursor().map(function (cell) {
            var rng = editor.dom.createRng();
            rng.setStart(cell.dom(), 0);
            rng.setEnd(cell.dom(), 0);
            return rng;
          });
        }) : Option.none();
      };
    };
    var deleteRow = execute($_2i21xzmmjfuw8qjg.eraseRows, lastRowGuard, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    var deleteColumn = execute($_2i21xzmmjfuw8qjg.eraseColumns, lastColumnGuard, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    var insertRowsBefore = execute($_2i21xzmmjfuw8qjg.insertRowsBefore, $_20nfr6k7jfuw8q4g.always, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    var insertRowsAfter = execute($_2i21xzmmjfuw8qjg.insertRowsAfter, $_20nfr6k7jfuw8q4g.always, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    var insertColumnsBefore = execute($_2i21xzmmjfuw8qjg.insertColumnsBefore, $_20nfr6k7jfuw8q4g.always, $_57e49gm9jfuw8qhh.halve, lazyWire);
    var insertColumnsAfter = execute($_2i21xzmmjfuw8qjg.insertColumnsAfter, $_20nfr6k7jfuw8q4g.always, $_57e49gm9jfuw8qhh.halve, lazyWire);
    var mergeCells = execute($_2i21xzmmjfuw8qjg.mergeCells, $_20nfr6k7jfuw8q4g.always, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    var unmergeCells = execute($_2i21xzmmjfuw8qjg.unmergeCells, $_20nfr6k7jfuw8q4g.always, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    var pasteRowsBefore = execute($_2i21xzmmjfuw8qjg.pasteRowsBefore, $_20nfr6k7jfuw8q4g.always, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    var pasteRowsAfter = execute($_2i21xzmmjfuw8qjg.pasteRowsAfter, $_20nfr6k7jfuw8q4g.always, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    var pasteCells = execute($_2i21xzmmjfuw8qjg.pasteCells, $_20nfr6k7jfuw8q4g.always, $_20nfr6k7jfuw8q4g.noop, lazyWire);
    return {
      deleteRow: deleteRow,
      deleteColumn: deleteColumn,
      insertRowsBefore: insertRowsBefore,
      insertRowsAfter: insertRowsAfter,
      insertColumnsBefore: insertColumnsBefore,
      insertColumnsAfter: insertColumnsAfter,
      mergeCells: mergeCells,
      unmergeCells: unmergeCells,
      pasteRowsBefore: pasteRowsBefore,
      pasteRowsAfter: pasteRowsAfter,
      pasteCells: pasteCells
    };
  };

  var copyRows = function (table, target, generators) {
    var list = $_dy3x0nkfjfuw8q5l.fromTable(table);
    var house = $_2ge24cldjfuw8qa3.generate(list);
    var details = $_dis709mtjfuw8qlp.onCells(house, target);
    return details.map(function (selectedCells) {
      var grid = $_cw9o3smwjfuw8qm9.toGrid(house, generators, false);
      var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
      var slicedDetails = $_dis709mtjfuw8qlp.toDetailList(slicedGrid, generators);
      return $_c9mejomzjfuw8qmn.copy(slicedDetails);
    });
  };
  var $_8a78aqntjfuw8qsp = { copyRows: copyRows };

  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var getTDTHOverallStyle = function (dom, elm, name) {
    var cells = dom.select('td,th', elm);
    var firstChildStyle;
    var checkChildren = function (firstChildStyle, elms) {
      for (var i = 0; i < elms.length; i++) {
        var currentStyle = dom.getStyle(elms[i], name);
        if (typeof firstChildStyle === 'undefined') {
          firstChildStyle = currentStyle;
        }
        if (firstChildStyle !== currentStyle) {
          return '';
        }
      }
      return firstChildStyle;
    };
    firstChildStyle = checkChildren(firstChildStyle, cells);
    return firstChildStyle;
  };
  var applyAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('align' + name, {}, elm);
    }
  };
  var applyVAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('valign' + name, {}, elm);
    }
  };
  var unApplyAlign = function (editor, elm) {
    global$2.each('left center right'.split(' '), function (name) {
      editor.formatter.remove('align' + name, {}, elm);
    });
  };
  var unApplyVAlign = function (editor, elm) {
    global$2.each('top middle bottom'.split(' '), function (name) {
      editor.formatter.remove('valign' + name, {}, elm);
    });
  };
  var $_ch6rvmnwjfuw8qt7 = {
    applyAlign: applyAlign,
    applyVAlign: applyVAlign,
    unApplyAlign: unApplyAlign,
    unApplyVAlign: unApplyVAlign,
    getTDTHOverallStyle: getTDTHOverallStyle
  };

  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      global$2.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    };
    return appendItems(inputList, startItems || []);
  };
  var updateStyleField = function (editor, evt) {
    var dom = editor.dom;
    var rootControl = evt.control.rootControl;
    var data = rootControl.toJSON();
    var css = dom.parseStyle(data.style);
    if (evt.control.name() === 'style') {
      rootControl.find('#borderStyle').value(css['border-style'] || '')[0].fire('select');
      rootControl.find('#borderColor').value(css['border-color'] || '')[0].fire('change');
      rootControl.find('#backgroundColor').value(css['background-color'] || '')[0].fire('change');
      rootControl.find('#width').value(css.width || '').fire('change');
      rootControl.find('#height').value(css.height || '').fire('change');
    } else {
      css['border-style'] = data.borderStyle;
      css['border-color'] = data.borderColor;
      css['background-color'] = data.backgroundColor;
      css.width = data.width ? $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.width) : '';
      css.height = data.height ? $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.height) : '';
    }
    rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
  };
  var extractAdvancedStyles = function (dom, elm) {
    var css = dom.parseStyle(dom.getAttrib(elm, 'style'));
    var data = {};
    if (css['border-style']) {
      data.borderStyle = css['border-style'];
    }
    if (css['border-color']) {
      data.borderColor = css['border-color'];
    }
    if (css['background-color']) {
      data.backgroundColor = css['background-color'];
    }
    data.style = dom.serializeStyle(css);
    return data;
  };
  var createStyleForm = function (editor) {
    var createColorPickAction = function () {
      var colorPickerCallback = getColorPickerCallback(editor);
      if (colorPickerCallback) {
        return function (evt) {
          return colorPickerCallback.call(editor, function (value) {
            evt.control.value(value).fire('change');
          }, evt.control.value());
        };
      }
    };
    return {
      title: 'Advanced',
      type: 'form',
      defaults: { onchange: $_20nfr6k7jfuw8q4g.curry(updateStyleField, editor) },
      items: [
        {
          label: 'Style',
          name: 'style',
          type: 'textbox'
        },
        {
          type: 'form',
          padding: 0,
          formItemDefaults: {
            layout: 'grid',
            alignH: [
              'start',
              'right'
            ]
          },
          defaults: { size: 7 },
          items: [
            {
              label: 'Border style',
              type: 'listbox',
              name: 'borderStyle',
              width: 90,
              onselect: $_20nfr6k7jfuw8q4g.curry(updateStyleField, editor),
              values: [
                {
                  text: 'Select...',
                  value: ''
                },
                {
                  text: 'Solid',
                  value: 'solid'
                },
                {
                  text: 'Dotted',
                  value: 'dotted'
                },
                {
                  text: 'Dashed',
                  value: 'dashed'
                },
                {
                  text: 'Double',
                  value: 'double'
                },
                {
                  text: 'Groove',
                  value: 'groove'
                },
                {
                  text: 'Ridge',
                  value: 'ridge'
                },
                {
                  text: 'Inset',
                  value: 'inset'
                },
                {
                  text: 'Outset',
                  value: 'outset'
                },
                {
                  text: 'None',
                  value: 'none'
                },
                {
                  text: 'Hidden',
                  value: 'hidden'
                }
              ]
            },
            {
              label: 'Border color',
              type: 'colorbox',
              name: 'borderColor',
              onaction: createColorPickAction()
            },
            {
              label: 'Background color',
              type: 'colorbox',
              name: 'backgroundColor',
              onaction: createColorPickAction()
            }
          ]
        }
      ]
    };
  };
  var $_2fnzp5nxjfuw8qt9 = {
    createStyleForm: createStyleForm,
    buildListItems: buildListItems,
    updateStyleField: updateStyleField,
    extractAdvancedStyles: extractAdvancedStyles
  };

  var updateStyles = function (elm, cssText) {
    delete elm.dataset.mceStyle;
    elm.style.cssText += ';' + cssText;
  };
  var extractDataFromElement = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class'),
      type: elm.nodeName.toLowerCase(),
      style: '',
      align: '',
      valign: ''
    };
    global$2.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    global$2.each('top middle bottom'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'valign' + name)) {
        data.valign = name;
      }
    });
    if (hasAdvancedCellTab(editor)) {
      global$2.extend(data, $_2fnzp5nxjfuw8qt9.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var onSubmitCellForm = function (editor, cells, evt) {
    var dom = editor.dom;
    var data;
    function setAttrib(elm, name, value) {
      if (value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (value) {
        dom.setStyle(elm, name, value);
      }
    }
    $_2fnzp5nxjfuw8qt9.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      global$2.each(cells, function (cellElm) {
        setAttrib(cellElm, 'scope', data.scope);
        if (cells.length === 1) {
          setAttrib(cellElm, 'style', data.style);
        } else {
          updateStyles(cellElm, data.style);
        }
        setAttrib(cellElm, 'class', data.class);
        setStyle(cellElm, 'width', $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.width));
        setStyle(cellElm, 'height', $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.height));
        if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
          cellElm = dom.rename(cellElm, data.type);
        }
        if (cells.length === 1) {
          $_ch6rvmnwjfuw8qt7.unApplyAlign(editor, cellElm);
          $_ch6rvmnwjfuw8qt7.unApplyVAlign(editor, cellElm);
        }
        if (data.align) {
          $_ch6rvmnwjfuw8qt7.applyAlign(editor, cellElm, data.align);
        }
        if (data.valign) {
          $_ch6rvmnwjfuw8qt7.applyVAlign(editor, cellElm, data.valign);
        }
      });
      editor.focus();
    });
  };
  var open = function (editor) {
    var cellElm, data, classListCtrl, cells = [];
    cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
    cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
    if (!cells.length && cellElm) {
      cells.push(cellElm);
    }
    cellElm = cellElm || cells[0];
    if (!cellElm) {
      return;
    }
    if (cells.length > 1) {
      data = {
        width: '',
        height: '',
        scope: '',
        class: '',
        align: '',
        valign: '',
        style: '',
        type: cellElm.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement(editor, cellElm);
    }
    if (getCellClassList(editor).length > 0) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_2fnzp5nxjfuw8qt9.buildListItems(getCellClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'td',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    var generalCellForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          layout: 'grid',
          columns: 2,
          labelGapCalc: false,
          padding: 0,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: [
            {
              label: 'Width',
              name: 'width',
              onchange: $_20nfr6k7jfuw8q4g.curry($_2fnzp5nxjfuw8qt9.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_20nfr6k7jfuw8q4g.curry($_2fnzp5nxjfuw8qt9.updateStyleField, editor)
            },
            {
              label: 'Cell type',
              name: 'type',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'Cell',
                  value: 'td'
                },
                {
                  text: 'Header cell',
                  value: 'th'
                }
              ]
            },
            {
              label: 'Scope',
              name: 'scope',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Row',
                  value: 'row'
                },
                {
                  text: 'Column',
                  value: 'col'
                },
                {
                  text: 'Row group',
                  value: 'rowgroup'
                },
                {
                  text: 'Column group',
                  value: 'colgroup'
                }
              ]
            },
            {
              label: 'H Align',
              name: 'align',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Left',
                  value: 'left'
                },
                {
                  text: 'Center',
                  value: 'center'
                },
                {
                  text: 'Right',
                  value: 'right'
                }
              ]
            },
            {
              label: 'V Align',
              name: 'valign',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Top',
                  value: 'top'
                },
                {
                  text: 'Middle',
                  value: 'middle'
                },
                {
                  text: 'Bottom',
                  value: 'bottom'
                }
              ]
            }
          ]
        },
        classListCtrl
      ]
    };
    if (hasAdvancedCellTab(editor)) {
      editor.windowManager.open({
        title: 'Cell properties',
        bodyType: 'tabpanel',
        data: data,
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalCellForm
          },
          $_2fnzp5nxjfuw8qt9.createStyleForm(editor)
        ],
        onsubmit: $_20nfr6k7jfuw8q4g.curry(onSubmitCellForm, editor, cells)
      });
    } else {
      editor.windowManager.open({
        title: 'Cell properties',
        data: data,
        body: generalCellForm,
        onsubmit: $_20nfr6k7jfuw8q4g.curry(onSubmitCellForm, editor, cells)
      });
    }
  };
  var $_48j9iinvjfuw8qsu = { open: open };

  var extractDataFromElement$1 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class'),
      align: '',
      style: '',
      type: elm.parentNode.nodeName.toLowerCase()
    };
    global$2.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    if (hasAdvancedRowTab(editor)) {
      global$2.extend(data, $_2fnzp5nxjfuw8qt9.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var switchRowType = function (dom, rowElm, toType) {
    var tableElm = dom.getParent(rowElm, 'table');
    var oldParentElm = rowElm.parentNode;
    var parentElm = dom.select(toType, tableElm)[0];
    if (!parentElm) {
      parentElm = dom.create(toType);
      if (tableElm.firstChild) {
        if (tableElm.firstChild.nodeName === 'CAPTION') {
          dom.insertAfter(parentElm, tableElm.firstChild);
        } else {
          tableElm.insertBefore(parentElm, tableElm.firstChild);
        }
      } else {
        tableElm.appendChild(parentElm);
      }
    }
    parentElm.appendChild(rowElm);
    if (!oldParentElm.hasChildNodes()) {
      dom.remove(oldParentElm);
    }
  };
  function onSubmitRowForm(editor, rows, oldData, evt) {
    var dom = editor.dom;
    function setAttrib(elm, name, value) {
      if (value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (value) {
        dom.setStyle(elm, name, value);
      }
    }
    $_2fnzp5nxjfuw8qt9.updateStyleField(editor, evt);
    var data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      global$2.each(rows, function (rowElm) {
        setAttrib(rowElm, 'scope', data.scope);
        setAttrib(rowElm, 'style', data.style);
        setAttrib(rowElm, 'class', data.class);
        setStyle(rowElm, 'height', $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.height));
        if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
          switchRowType(editor.dom, rowElm, data.type);
        }
        if (data.align !== oldData.align) {
          $_ch6rvmnwjfuw8qt7.unApplyAlign(editor, rowElm);
          $_ch6rvmnwjfuw8qt7.applyAlign(editor, rowElm, data.align);
        }
      });
      editor.focus();
    });
  }
  var open$1 = function (editor) {
    var dom = editor.dom;
    var tableElm, cellElm, rowElm, classListCtrl, data;
    var rows = [];
    var generalRowForm;
    tableElm = dom.getParent(editor.selection.getStart(), 'table');
    cellElm = dom.getParent(editor.selection.getStart(), 'td,th');
    global$2.each(tableElm.rows, function (row) {
      global$2.each(row.cells, function (cell) {
        if (dom.getAttrib(cell, 'data-mce-selected') || cell === cellElm) {
          rows.push(row);
          return false;
        }
      });
    });
    rowElm = rows[0];
    if (!rowElm) {
      return;
    }
    if (rows.length > 1) {
      data = {
        height: '',
        scope: '',
        style: '',
        class: '',
        align: '',
        type: rowElm.parentNode.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$1(editor, rowElm);
    }
    if (getRowClassList(editor).length > 0) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_2fnzp5nxjfuw8qt9.buildListItems(getRowClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'tr',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalRowForm = {
      type: 'form',
      columns: 2,
      padding: 0,
      defaults: { type: 'textbox' },
      items: [
        {
          type: 'listbox',
          name: 'type',
          label: 'Row type',
          text: 'Header',
          maxWidth: null,
          values: [
            {
              text: 'Header',
              value: 'thead'
            },
            {
              text: 'Body',
              value: 'tbody'
            },
            {
              text: 'Footer',
              value: 'tfoot'
            }
          ]
        },
        {
          type: 'listbox',
          name: 'align',
          label: 'Alignment',
          text: 'None',
          maxWidth: null,
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        {
          label: 'Height',
          name: 'height'
        },
        classListCtrl
      ]
    };
    if (hasAdvancedRowTab(editor)) {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalRowForm
          },
          $_2fnzp5nxjfuw8qt9.createStyleForm(editor)
        ],
        onsubmit: $_20nfr6k7jfuw8q4g.curry(onSubmitRowForm, editor, rows, data)
      });
    } else {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        body: generalRowForm,
        onsubmit: $_20nfr6k7jfuw8q4g.curry(onSubmitRowForm, editor, rows, data)
      });
    }
  };
  var $_cshv4qnyjfuw8qtf = { open: open$1 };

  var global$3 = tinymce.util.Tools.resolve('tinymce.Env');

  var DefaultRenderOptions = {
    styles: {
      'border-collapse': 'collapse',
      width: '100%'
    },
    attributes: { border: '1' },
    percentages: true
  };
  var makeTable = function () {
    return $_xbeoqkkjfuw8q73.fromTag('table');
  };
  var tableBody = function () {
    return $_xbeoqkkjfuw8q73.fromTag('tbody');
  };
  var tableRow = function () {
    return $_xbeoqkkjfuw8q73.fromTag('tr');
  };
  var tableHeaderCell = function () {
    return $_xbeoqkkjfuw8q73.fromTag('th');
  };
  var tableCell = function () {
    return $_xbeoqkkjfuw8q73.fromTag('td');
  };
  var render$1 = function (rows, columns, rowHeaders, columnHeaders, renderOpts) {
    if (renderOpts === void 0) {
      renderOpts = DefaultRenderOptions;
    }
    var table = makeTable();
    $_bfod2hlejfuw8qac.setAll(table, renderOpts.styles);
    $_3q82t2l5jfuw8q93.setAll(table, renderOpts.attributes);
    var tbody = tableBody();
    $_fatuxylgjfuw8qav.append(table, tbody);
    var trs = [];
    for (var i = 0; i < rows; i++) {
      var tr = tableRow();
      for (var j = 0; j < columns; j++) {
        var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
        if (j < columnHeaders) {
          $_3q82t2l5jfuw8q93.set(td, 'scope', 'row');
        }
        if (i < rowHeaders) {
          $_3q82t2l5jfuw8q93.set(td, 'scope', 'col');
        }
        $_fatuxylgjfuw8qav.append(td, $_xbeoqkkjfuw8q73.fromTag('br'));
        if (renderOpts.percentages) {
          $_bfod2hlejfuw8qac.set(td, 'width', 100 / columns + '%');
        }
        $_fatuxylgjfuw8qav.append(tr, td);
      }
      trs.push(tr);
    }
    $_9zaoqflijfuw8qb0.append(tbody, trs);
    return table;
  };

  var get$7 = function (element) {
    return element.dom().innerHTML;
  };
  var set$5 = function (element, content) {
    var owner = $_s8scrkmjfuw8q7a.owner(element);
    var docDom = owner.dom();
    var fragment = $_xbeoqkkjfuw8q73.fromDom(docDom.createDocumentFragment());
    var contentElements = $_du13u9lpjfuw8qce.fromHtml(content, docDom);
    $_9zaoqflijfuw8qb0.append(fragment, contentElements);
    $_fl1deelhjfuw8qax.empty(element);
    $_fatuxylgjfuw8qav.append(element, fragment);
  };
  var getOuter$2 = function (element) {
    var container = $_xbeoqkkjfuw8q73.fromTag('div');
    var clone = $_xbeoqkkjfuw8q73.fromDom(element.dom().cloneNode(true));
    $_fatuxylgjfuw8qav.append(container, clone);
    return get$7(container);
  };
  var $_76qisuo4jfuw8qut = {
    get: get$7,
    set: set$5,
    getOuter: getOuter$2
  };

  var placeCaretInCell = function (editor, cell) {
    editor.selection.select(cell.dom(), true);
    editor.selection.collapse(true);
  };
  var selectFirstCellInTable = function (editor, tableElm) {
    $_8wdrbmlajfuw8q9m.descendant(tableElm, 'td,th').each($_20nfr6k7jfuw8q4g.curry(placeCaretInCell, editor));
  };
  var fireEvents = function (editor, table) {
    $_tyr3yk5jfuw8q47.each($_6c9d0hl7jfuw8q9d.descendants(table, 'tr'), function (row) {
      fireNewRow(editor, row.dom());
      $_tyr3yk5jfuw8q47.each($_6c9d0hl7jfuw8q9d.descendants(row, 'th,td'), function (cell) {
        fireNewCell(editor, cell.dom());
      });
    });
  };
  var isPercentage = function (width) {
    return $_g6mvnrk8jfuw8q4k.isString(width) && width.indexOf('%') !== -1;
  };
  var insert$1 = function (editor, columns, rows) {
    var defaultStyles = getDefaultStyles(editor);
    var options = {
      styles: defaultStyles,
      attributes: getDefaultAttributes(editor),
      percentages: isPercentage(defaultStyles.width) && !isPixelsForced(editor)
    };
    var table = render$1(rows, columns, 0, 0, options);
    $_3q82t2l5jfuw8q93.set(table, 'data-mce-id', '__mce');
    var html = $_76qisuo4jfuw8qut.getOuter(table);
    editor.insertContent(html);
    return $_8wdrbmlajfuw8q9m.descendant($_5xkhf2nnjfuw8qrq.getBody(editor), 'table[data-mce-id="__mce"]').map(function (table) {
      if (isPixelsForced(editor)) {
        $_bfod2hlejfuw8qac.set(table, 'width', $_bfod2hlejfuw8qac.get(table, 'width'));
      }
      $_3q82t2l5jfuw8q93.remove(table, 'data-mce-id');
      fireEvents(editor, table);
      selectFirstCellInTable(editor, table);
      return table.dom();
    }).getOr(null);
  };
  var $_1mq3b3o1jfuw8qtu = { insert: insert$1 };

  function styleTDTH(dom, elm, name, value) {
    if (elm.tagName === 'TD' || elm.tagName === 'TH') {
      dom.setStyle(elm, name, value);
    } else {
      if (elm.children) {
        for (var i = 0; i < elm.children.length; i++) {
          styleTDTH(dom, elm.children[i], name, value);
        }
      }
    }
  }
  var extractDataFromElement$2 = function (editor, tableElm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(tableElm, 'width') || dom.getAttrib(tableElm, 'width'),
      height: dom.getStyle(tableElm, 'height') || dom.getAttrib(tableElm, 'height'),
      cellspacing: dom.getStyle(tableElm, 'border-spacing') || dom.getAttrib(tableElm, 'cellspacing'),
      cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') || $_ch6rvmnwjfuw8qt7.getTDTHOverallStyle(editor.dom, tableElm, 'padding'),
      border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') || $_ch6rvmnwjfuw8qt7.getTDTHOverallStyle(editor.dom, tableElm, 'border'),
      borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
      caption: !!dom.select('caption', tableElm)[0],
      class: dom.getAttrib(tableElm, 'class')
    };
    global$2.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(tableElm, 'align' + name)) {
        data.align = name;
      }
    });
    if (hasAdvancedTableTab(editor)) {
      global$2.extend(data, $_2fnzp5nxjfuw8qt9.extractAdvancedStyles(dom, tableElm));
    }
    return data;
  };
  var applyDataToElement = function (editor, tableElm, data) {
    var dom = editor.dom;
    var attrs = {};
    var styles = {};
    attrs.class = data.class;
    styles.height = $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.height);
    if (dom.getAttrib(tableElm, 'width') && !shouldStyleWithCss(editor)) {
      attrs.width = $_5xkhf2nnjfuw8qrq.removePxSuffix(data.width);
    } else {
      styles.width = $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.width);
    }
    if (shouldStyleWithCss(editor)) {
      styles['border-width'] = $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.border);
      styles['border-spacing'] = $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.cellspacing);
      global$2.extend(attrs, {
        'data-mce-border-color': data.borderColor,
        'data-mce-cell-padding': data.cellpadding,
        'data-mce-border': data.border
      });
    } else {
      global$2.extend(attrs, {
        border: data.border,
        cellpadding: data.cellpadding,
        cellspacing: data.cellspacing
      });
    }
    if (shouldStyleWithCss(editor)) {
      if (tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.border),
            'border-color': data.borderColor,
            'padding': $_5xkhf2nnjfuw8qrq.addSizeSuffix(data.cellpadding)
          });
        }
      }
    }
    if (data.style) {
      global$2.extend(styles, dom.parseStyle(data.style));
    } else {
      styles = global$2.extend({}, dom.parseStyle(dom.getAttrib(tableElm, 'style')), styles);
    }
    attrs.style = dom.serializeStyle(styles);
    dom.setAttribs(tableElm, attrs);
  };
  var onSubmitTableForm = function (editor, tableElm, evt) {
    var dom = editor.dom;
    var captionElm;
    var data;
    $_2fnzp5nxjfuw8qt9.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    if (data.class === false) {
      delete data.class;
    }
    editor.undoManager.transact(function () {
      if (!tableElm) {
        tableElm = $_1mq3b3o1jfuw8qtu.insert(editor, data.cols || 1, data.rows || 1);
      }
      applyDataToElement(editor, tableElm, data);
      captionElm = dom.select('caption', tableElm)[0];
      if (captionElm && !data.caption) {
        dom.remove(captionElm);
      }
      if (!captionElm && data.caption) {
        captionElm = dom.create('caption');
        captionElm.innerHTML = !global$3.ie ? '<br data-mce-bogus="1"/>' : '\xA0';
        tableElm.insertBefore(captionElm, tableElm.firstChild);
      }
      $_ch6rvmnwjfuw8qt7.unApplyAlign(editor, tableElm);
      if (data.align) {
        $_ch6rvmnwjfuw8qt7.applyAlign(editor, tableElm, data.align);
      }
      editor.focus();
      editor.addVisual();
    });
  };
  var open$2 = function (editor, isProps) {
    var dom = editor.dom;
    var tableElm, colsCtrl, rowsCtrl, classListCtrl, data = {}, generalTableForm;
    if (isProps === true) {
      tableElm = dom.getParent(editor.selection.getStart(), 'table');
      if (tableElm) {
        data = extractDataFromElement$2(editor, tableElm);
      }
    } else {
      colsCtrl = {
        label: 'Cols',
        name: 'cols'
      };
      rowsCtrl = {
        label: 'Rows',
        name: 'rows'
      };
    }
    if (getTableClassList(editor).length > 0) {
      if (data.class) {
        data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
      }
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_2fnzp5nxjfuw8qt9.buildListItems(getTableClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'table',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalTableForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          labelGapCalc: false,
          padding: 0,
          layout: 'grid',
          columns: 2,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: hasAppearanceOptions(editor) ? [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_20nfr6k7jfuw8q4g.curry($_2fnzp5nxjfuw8qt9.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_20nfr6k7jfuw8q4g.curry($_2fnzp5nxjfuw8qt9.updateStyleField, editor)
            },
            {
              label: 'Cell spacing',
              name: 'cellspacing'
            },
            {
              label: 'Cell padding',
              name: 'cellpadding'
            },
            {
              label: 'Border',
              name: 'border'
            },
            {
              label: 'Caption',
              name: 'caption',
              type: 'checkbox'
            }
          ] : [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_20nfr6k7jfuw8q4g.curry($_2fnzp5nxjfuw8qt9.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_20nfr6k7jfuw8q4g.curry($_2fnzp5nxjfuw8qt9.updateStyleField, editor)
            }
          ]
        },
        {
          label: 'Alignment',
          name: 'align',
          type: 'listbox',
          text: 'None',
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        classListCtrl
      ]
    };
    if (hasAdvancedTableTab(editor)) {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalTableForm
          },
          $_2fnzp5nxjfuw8qt9.createStyleForm(editor)
        ],
        onsubmit: $_20nfr6k7jfuw8q4g.curry(onSubmitTableForm, editor, tableElm)
      });
    } else {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        body: generalTableForm,
        onsubmit: $_20nfr6k7jfuw8q4g.curry(onSubmitTableForm, editor, tableElm)
      });
    }
  };
  var $_ad8brjnzjfuw8qtm = { open: open$2 };

  var each$3 = global$2.each;
  var registerCommands = function (editor, actions, cellSelection, selections, clipboardRows) {
    var isRoot = $_5xkhf2nnjfuw8qrq.getIsRoot(editor);
    var eraseTable = function () {
      var cell = $_xbeoqkkjfuw8q73.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
      var table = $_aqhz9okhjfuw8q5y.table(cell, isRoot);
      table.filter($_20nfr6k7jfuw8q4g.not(isRoot)).each(function (table) {
        var cursor = $_xbeoqkkjfuw8q73.fromText('');
        $_fatuxylgjfuw8qav.after(table, cursor);
        $_fl1deelhjfuw8qax.remove(table);
        var rng = editor.dom.createRng();
        rng.setStart(cursor.dom(), 0);
        rng.setEnd(cursor.dom(), 0);
        editor.selection.setRng(rng);
      });
    };
    var getSelectionStartCell = function () {
      return $_xbeoqkkjfuw8q73.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
    };
    var getTableFromCell = function (cell) {
      return $_aqhz9okhjfuw8q5y.table(cell, isRoot);
    };
    var actOnSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      table.each(function (table) {
        var targets = $_5b7h1hlqjfuw8qci.forMenu(selections, table, cell);
        execute(table, targets).each(function (rng) {
          editor.selection.setRng(rng);
          editor.focus();
          cellSelection.clear(table);
        });
      });
    };
    var copyRowSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      return table.bind(function (table) {
        var doc = $_xbeoqkkjfuw8q73.fromDom(editor.getDoc());
        var targets = $_5b7h1hlqjfuw8qci.forMenu(selections, table, cell);
        var generators = $_5ohg1eljjfuw8qb4.cellOperations($_20nfr6k7jfuw8q4g.noop, doc, Option.none());
        return $_8a78aqntjfuw8qsp.copyRows(table, targets, generators);
      });
    };
    var pasteOnSelection = function (execute) {
      clipboardRows.get().each(function (rows) {
        var clonedRows = $_tyr3yk5jfuw8q47.map(rows, function (row) {
          return $_ddvp06lkjfuw8qbt.deep(row);
        });
        var cell = getSelectionStartCell();
        var table = getTableFromCell(cell);
        table.bind(function (table) {
          var doc = $_xbeoqkkjfuw8q73.fromDom(editor.getDoc());
          var generators = $_5ohg1eljjfuw8qb4.paste(doc);
          var targets = $_5b7h1hlqjfuw8qci.pasteRows(selections, table, cell, clonedRows, generators);
          execute(table, targets).each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
            cellSelection.clear(table);
          });
        });
      });
    };
    each$3({
      mceTableSplitCells: function () {
        actOnSelection(actions.unmergeCells);
      },
      mceTableMergeCells: function () {
        actOnSelection(actions.mergeCells);
      },
      mceTableInsertRowBefore: function () {
        actOnSelection(actions.insertRowsBefore);
      },
      mceTableInsertRowAfter: function () {
        actOnSelection(actions.insertRowsAfter);
      },
      mceTableInsertColBefore: function () {
        actOnSelection(actions.insertColumnsBefore);
      },
      mceTableInsertColAfter: function () {
        actOnSelection(actions.insertColumnsAfter);
      },
      mceTableDeleteCol: function () {
        actOnSelection(actions.deleteColumn);
      },
      mceTableDeleteRow: function () {
        actOnSelection(actions.deleteRow);
      },
      mceTableCutRow: function (grid) {
        clipboardRows.set(copyRowSelection());
        actOnSelection(actions.deleteRow);
      },
      mceTableCopyRow: function (grid) {
        clipboardRows.set(copyRowSelection());
      },
      mceTablePasteRowBefore: function (grid) {
        pasteOnSelection(actions.pasteRowsBefore);
      },
      mceTablePasteRowAfter: function (grid) {
        pasteOnSelection(actions.pasteRowsAfter);
      },
      mceTableDelete: eraseTable
    }, function (func, name) {
      editor.addCommand(name, func);
    });
    each$3({
      mceInsertTable: $_20nfr6k7jfuw8q4g.curry($_ad8brjnzjfuw8qtm.open, editor),
      mceTableProps: $_20nfr6k7jfuw8q4g.curry($_ad8brjnzjfuw8qtm.open, editor, true),
      mceTableRowProps: $_20nfr6k7jfuw8q4g.curry($_cshv4qnyjfuw8qtf.open, editor),
      mceTableCellProps: $_20nfr6k7jfuw8q4g.curry($_48j9iinvjfuw8qsu.open, editor)
    }, function (func, name) {
      editor.addCommand(name, function (ui, val) {
        func(val);
      });
    });
  };
  var $_srry6nsjfuw8qs8 = { registerCommands: registerCommands };

  var only$1 = function (element) {
    var parent = Option.from(element.dom().documentElement).map($_xbeoqkkjfuw8q73.fromDom).getOr(element);
    return {
      parent: $_20nfr6k7jfuw8q4g.constant(parent),
      view: $_20nfr6k7jfuw8q4g.constant(element),
      origin: $_20nfr6k7jfuw8q4g.constant(r(0, 0))
    };
  };
  var detached = function (editable, chrome) {
    var origin = $_20nfr6k7jfuw8q4g.curry($_hsvzlmijfuw8qj4.absolute, chrome);
    return {
      parent: $_20nfr6k7jfuw8q4g.constant(chrome),
      view: $_20nfr6k7jfuw8q4g.constant(editable),
      origin: origin
    };
  };
  var body$1 = function (editable, chrome) {
    return {
      parent: $_20nfr6k7jfuw8q4g.constant(chrome),
      view: $_20nfr6k7jfuw8q4g.constant(editable),
      origin: $_20nfr6k7jfuw8q4g.constant(r(0, 0))
    };
  };
  var $_e4gwgeo6jfuw8qvi = {
    only: only$1,
    detached: detached,
    body: body$1
  };

  function Event (fields) {
    var struct = $_5now9kbjfuw8q5e.immutable.apply(null, fields);
    var handlers = [];
    var bind = function (handler) {
      if (handler === undefined) {
        throw 'Event bind error: undefined handler';
      }
      handlers.push(handler);
    };
    var unbind = function (handler) {
      handlers = $_tyr3yk5jfuw8q47.filter(handlers, function (h) {
        return h !== handler;
      });
    };
    var trigger = function () {
      var event = struct.apply(null, arguments);
      $_tyr3yk5jfuw8q47.each(handlers, function (handler) {
        handler(event);
      });
    };
    return {
      bind: bind,
      unbind: unbind,
      trigger: trigger
    };
  }

  var create = function (typeDefs) {
    var registry = $_11yiupkajfuw8q5c.map(typeDefs, function (event) {
      return {
        bind: event.bind,
        unbind: event.unbind
      };
    });
    var trigger = $_11yiupkajfuw8q5c.map(typeDefs, function (event) {
      return event.trigger;
    });
    return {
      registry: registry,
      trigger: trigger
    };
  };
  var $_1fbhhho9jfuw8qw4 = { create: create };

  var mode = $_7z97w5mpjfuw8qkk.exactly([
    'compare',
    'extract',
    'mutate',
    'sink'
  ]);
  var sink = $_7z97w5mpjfuw8qkk.exactly([
    'element',
    'start',
    'stop',
    'destroy'
  ]);
  var api$3 = $_7z97w5mpjfuw8qkk.exactly([
    'forceDrop',
    'drop',
    'move',
    'delayDrop'
  ]);
  var $_aqs1mcodjfuw8qxk = {
    mode: mode,
    sink: sink,
    api: api$3
  };

  var styles$1 = $_63w6atn5jfuw8qot.css('ephox-dragster');
  var $_41gm3bofjfuw8qxz = { resolve: styles$1.resolve };

  function Blocker (options) {
    var settings = $_91sgzmujfuw8qm5.merge({ 'layerClass': $_41gm3bofjfuw8qxz.resolve('blocker') }, options);
    var div = $_xbeoqkkjfuw8q73.fromTag('div');
    $_3q82t2l5jfuw8q93.set(div, 'role', 'presentation');
    $_bfod2hlejfuw8qac.setAll(div, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%'
    });
    $_fmcseon6jfuw8qou.add(div, $_41gm3bofjfuw8qxz.resolve('blocker'));
    $_fmcseon6jfuw8qou.add(div, settings.layerClass);
    var element = function () {
      return div;
    };
    var destroy = function () {
      $_fl1deelhjfuw8qax.remove(div);
    };
    return {
      element: element,
      destroy: destroy
    };
  }

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_20nfr6k7jfuw8q4g.constant(target),
      'x': $_20nfr6k7jfuw8q4g.constant(x),
      'y': $_20nfr6k7jfuw8q4g.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_20nfr6k7jfuw8q4g.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_xbeoqkkjfuw8q73.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_20nfr6k7jfuw8q4g.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_20nfr6k7jfuw8q4g.curry(unbind, element, event, wrapped, useCapture) };
  };
  var bind$1 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
  };
  var capture = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, true);
  };
  var unbind = function (element, event, handler, useCapture) {
    element.dom().removeEventListener(event, handler, useCapture);
  };
  var $_fal932ohjfuw8qy6 = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_20nfr6k7jfuw8q4g.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_fal932ohjfuw8qy6.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_fal932ohjfuw8qy6.capture(element, event, filter$1, handler);
  };
  var $_6fxiitogjfuw8qy3 = {
    bind: bind$2,
    capture: capture$1
  };

  var compare = function (old, nu) {
    return r(nu.left() - old.left(), nu.top() - old.top());
  };
  var extract$1 = function (event) {
    return Option.some(r(event.x(), event.y()));
  };
  var mutate$1 = function (mutation, info) {
    mutation.mutate(info.left(), info.top());
  };
  var sink$1 = function (dragApi, settings) {
    var blocker = Blocker(settings);
    var mdown = $_6fxiitogjfuw8qy3.bind(blocker.element(), 'mousedown', dragApi.forceDrop);
    var mup = $_6fxiitogjfuw8qy3.bind(blocker.element(), 'mouseup', dragApi.drop);
    var mmove = $_6fxiitogjfuw8qy3.bind(blocker.element(), 'mousemove', dragApi.move);
    var mout = $_6fxiitogjfuw8qy3.bind(blocker.element(), 'mouseout', dragApi.delayDrop);
    var destroy = function () {
      blocker.destroy();
      mup.unbind();
      mmove.unbind();
      mout.unbind();
      mdown.unbind();
    };
    var start = function (parent) {
      $_fatuxylgjfuw8qav.append(parent, blocker.element());
    };
    var stop = function () {
      $_fl1deelhjfuw8qax.remove(blocker.element());
    };
    return $_aqs1mcodjfuw8qxk.sink({
      element: blocker.element,
      start: start,
      stop: stop,
      destroy: destroy
    });
  };
  var MouseDrag = $_aqs1mcodjfuw8qxk.mode({
    compare: compare,
    extract: extract$1,
    sink: sink$1,
    mutate: mutate$1
  });

  function InDrag () {
    var previous = Option.none();
    var reset = function () {
      previous = Option.none();
    };
    var update = function (mode, nu) {
      var result = previous.map(function (old) {
        return mode.compare(old, nu);
      });
      previous = Option.some(nu);
      return result;
    };
    var onEvent = function (event, mode) {
      var dataOption = mode.extract(event);
      dataOption.each(function (data) {
        var offset = update(mode, data);
        offset.each(function (d) {
          events.trigger.move(d);
        });
      });
    };
    var events = $_1fbhhho9jfuw8qw4.create({ move: Event(['info']) });
    return {
      onEvent: onEvent,
      reset: reset,
      events: events.registry
    };
  }

  function NoDrag (anchor) {
    var onEvent = function (event, mode) {
    };
    return {
      onEvent: onEvent,
      reset: $_20nfr6k7jfuw8q4g.noop
    };
  }

  function Movement () {
    var noDragState = NoDrag();
    var inDragState = InDrag();
    var dragState = noDragState;
    var on = function () {
      dragState.reset();
      dragState = inDragState;
    };
    var off = function () {
      dragState.reset();
      dragState = noDragState;
    };
    var onEvent = function (event, mode) {
      dragState.onEvent(event, mode);
    };
    var isOn = function () {
      return dragState === inDragState;
    };
    return {
      on: on,
      off: off,
      isOn: isOn,
      onEvent: onEvent,
      events: inDragState.events
    };
  }

  var adaptable = function (fn, rate) {
    var timer = null;
    var args = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        args = null;
      }
    };
    var throttle = function () {
      args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var first$4 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var last$3 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer !== null)
        clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(null, args);
        timer = null;
        args = null;
      }, rate);
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var $_4fpdigomjfuw8qyv = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var setup = function (mutation, mode, settings) {
    var active = false;
    var events = $_1fbhhho9jfuw8qw4.create({
      start: Event([]),
      stop: Event([])
    });
    var movement = Movement();
    var drop = function () {
      sink.stop();
      if (movement.isOn()) {
        movement.off();
        events.trigger.stop();
      }
    };
    var throttledDrop = $_4fpdigomjfuw8qyv.last(drop, 200);
    var go = function (parent) {
      sink.start(parent);
      movement.on();
      events.trigger.start();
    };
    var mousemove = function (event, ui) {
      throttledDrop.cancel();
      movement.onEvent(event, mode);
    };
    movement.events.move.bind(function (event) {
      mode.mutate(mutation, event.info());
    });
    var on = function () {
      active = true;
    };
    var off = function () {
      active = false;
    };
    var runIfActive = function (f) {
      return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        if (active) {
          return f.apply(null, args);
        }
      };
    };
    var sink = mode.sink($_aqs1mcodjfuw8qxk.api({
      forceDrop: drop,
      drop: runIfActive(drop),
      move: runIfActive(mousemove),
      delayDrop: runIfActive(throttledDrop.throttle)
    }), settings);
    var destroy = function () {
      sink.destroy();
    };
    return {
      element: sink.element,
      go: go,
      on: on,
      off: off,
      destroy: destroy,
      events: events.registry
    };
  };
  var $_bv42lfoijfuw8qyb = { setup: setup };

  var transform$1 = function (mutation, options) {
    var settings = options !== undefined ? options : {};
    var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
    return $_bv42lfoijfuw8qyb.setup(mutation, mode, options);
  };
  var $_a1giepobjfuw8qx7 = { transform: transform$1 };

  function Mutation () {
    var events = $_1fbhhho9jfuw8qw4.create({
      'drag': Event([
        'xDelta',
        'yDelta'
      ])
    });
    var mutate = function (x, y) {
      events.trigger.drag(x, y);
    };
    return {
      mutate: mutate,
      events: events.registry
    };
  }

  function BarMutation () {
    var events = $_1fbhhho9jfuw8qw4.create({
      drag: Event([
        'xDelta',
        'yDelta',
        'target'
      ])
    });
    var target = Option.none();
    var delegate = Mutation();
    delegate.events.drag.bind(function (event) {
      target.each(function (t) {
        events.trigger.drag(event.xDelta(), event.yDelta(), t);
      });
    });
    var assign = function (t) {
      target = Option.some(t);
    };
    var get = function () {
      return target;
    };
    return {
      assign: assign,
      get: get,
      mutate: delegate.mutate,
      events: events.registry
    };
  }

  var any = function (selector) {
    return $_8wdrbmlajfuw8q9m.first(selector).isSome();
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_8wdrbmlajfuw8q9m.ancestor(scope, selector, isRoot).isSome();
  };
  var sibling$2 = function (scope, selector) {
    return $_8wdrbmlajfuw8q9m.sibling(scope, selector).isSome();
  };
  var child$3 = function (scope, selector) {
    return $_8wdrbmlajfuw8q9m.child(scope, selector).isSome();
  };
  var descendant$2 = function (scope, selector) {
    return $_8wdrbmlajfuw8q9m.descendant(scope, selector).isSome();
  };
  var closest$2 = function (scope, selector, isRoot) {
    return $_8wdrbmlajfuw8q9m.closest(scope, selector, isRoot).isSome();
  };
  var $_44mfk0opjfuw8qze = {
    any: any,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var resizeBarDragging = $_f6r94sn4jfuw8qoq.resolve('resizer-bar-dragging');
  function BarManager (wire, direction, hdirection) {
    var mutation = BarMutation();
    var resizing = $_a1giepobjfuw8qx7.transform(mutation, {});
    var hoverTable = Option.none();
    var getResizer = function (element, type) {
      return Option.from($_3q82t2l5jfuw8q93.get(element, type));
    };
    mutation.events.drag.bind(function (event) {
      getResizer(event.target(), 'data-row').each(function (_dataRow) {
        var currentRow = $_63qtcvnkjfuw8qqu.getInt(event.target(), 'top');
        $_bfod2hlejfuw8qac.set(event.target(), 'top', currentRow + event.yDelta() + 'px');
      });
      getResizer(event.target(), 'data-column').each(function (_dataCol) {
        var currentCol = $_63qtcvnkjfuw8qqu.getInt(event.target(), 'left');
        $_bfod2hlejfuw8qac.set(event.target(), 'left', currentCol + event.xDelta() + 'px');
      });
    });
    var getDelta = function (target, direction) {
      var newX = $_63qtcvnkjfuw8qqu.getInt(target, direction);
      var oldX = parseInt($_3q82t2l5jfuw8q93.get(target, 'data-initial-' + direction), 10);
      return newX - oldX;
    };
    resizing.events.stop.bind(function () {
      mutation.get().each(function (target) {
        hoverTable.each(function (table) {
          getResizer(target, 'data-row').each(function (row) {
            var delta = getDelta(target, 'top');
            $_3q82t2l5jfuw8q93.remove(target, 'data-initial-top');
            events.trigger.adjustHeight(table, delta, parseInt(row, 10));
          });
          getResizer(target, 'data-column').each(function (column) {
            var delta = getDelta(target, 'left');
            $_3q82t2l5jfuw8q93.remove(target, 'data-initial-left');
            events.trigger.adjustWidth(table, delta, parseInt(column, 10));
          });
          $_jc1w5n0jfuw8qng.refresh(wire, table, hdirection, direction);
        });
      });
    });
    var handler = function (target, direction) {
      events.trigger.startAdjust();
      mutation.assign(target);
      $_3q82t2l5jfuw8q93.set(target, 'data-initial-' + direction, parseInt($_bfod2hlejfuw8qac.get(target, direction), 10));
      $_fmcseon6jfuw8qou.add(target, resizeBarDragging);
      $_bfod2hlejfuw8qac.set(target, 'opacity', '0.2');
      resizing.go(wire.parent());
    };
    var mousedown = $_6fxiitogjfuw8qy3.bind(wire.parent(), 'mousedown', function (event) {
      if ($_jc1w5n0jfuw8qng.isRowBar(event.target()))
        handler(event.target(), 'top');
      if ($_jc1w5n0jfuw8qng.isColBar(event.target()))
        handler(event.target(), 'left');
    });
    var isRoot = function (e) {
      return $_e8rn66kojfuw8q7n.eq(e, wire.view());
    };
    var mouseover = $_6fxiitogjfuw8qy3.bind(wire.view(), 'mouseover', function (event) {
      if ($_a8gk30l6jfuw8q9c.name(event.target()) === 'table' || $_44mfk0opjfuw8qze.closest(event.target(), 'table', isRoot)) {
        hoverTable = $_a8gk30l6jfuw8q9c.name(event.target()) === 'table' ? Option.some(event.target()) : $_8wdrbmlajfuw8q9m.ancestor(event.target(), 'table', isRoot);
        hoverTable.each(function (ht) {
          $_jc1w5n0jfuw8qng.refresh(wire, ht, hdirection, direction);
        });
      } else if ($_atd1tul9jfuw8q9i.inBody(event.target())) {
        $_jc1w5n0jfuw8qng.destroy(wire);
      }
    });
    var destroy = function () {
      mousedown.unbind();
      mouseover.unbind();
      resizing.destroy();
      $_jc1w5n0jfuw8qng.destroy(wire);
    };
    var refresh = function (tbl) {
      $_jc1w5n0jfuw8qng.refresh(wire, tbl, hdirection, direction);
    };
    var events = $_1fbhhho9jfuw8qw4.create({
      adjustHeight: Event([
        'table',
        'delta',
        'row'
      ]),
      adjustWidth: Event([
        'table',
        'delta',
        'column'
      ]),
      startAdjust: Event([])
    });
    return {
      destroy: destroy,
      refresh: refresh,
      on: resizing.on,
      off: resizing.off,
      hideBars: $_20nfr6k7jfuw8q4g.curry($_jc1w5n0jfuw8qng.hide, wire),
      showBars: $_20nfr6k7jfuw8q4g.curry($_jc1w5n0jfuw8qng.show, wire),
      events: events.registry
    };
  }

  function TableResize (wire, vdirection) {
    var hdirection = $_16z2iamhjfuw8qir.height;
    var manager = BarManager(wire, vdirection, hdirection);
    var events = $_1fbhhho9jfuw8qw4.create({
      beforeResize: Event(['table']),
      afterResize: Event(['table']),
      startDrag: Event([])
    });
    manager.events.adjustHeight.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = hdirection.delta(event.delta(), event.table());
      $_cwciisngjfuw8qq6.adjustHeight(event.table(), delta, event.row(), hdirection);
      events.trigger.afterResize(event.table());
    });
    manager.events.startAdjust.bind(function (event) {
      events.trigger.startDrag();
    });
    manager.events.adjustWidth.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = vdirection.delta(event.delta(), event.table());
      $_cwciisngjfuw8qq6.adjustWidth(event.table(), delta, event.column(), vdirection);
      events.trigger.afterResize(event.table());
    });
    return {
      on: manager.on,
      off: manager.off,
      hideBars: manager.hideBars,
      showBars: manager.showBars,
      destroy: manager.destroy,
      events: events.registry
    };
  }

  var createContainer = function () {
    var container = $_xbeoqkkjfuw8q73.fromTag('div');
    $_bfod2hlejfuw8qac.setAll(container, {
      position: 'static',
      height: '0',
      width: '0',
      padding: '0',
      margin: '0',
      border: '0'
    });
    $_fatuxylgjfuw8qav.append($_atd1tul9jfuw8q9i.body(), container);
    return container;
  };
  var get$8 = function (editor, container) {
    return editor.inline ? $_e4gwgeo6jfuw8qvi.body($_5xkhf2nnjfuw8qrq.getBody(editor), createContainer()) : $_e4gwgeo6jfuw8qvi.only($_xbeoqkkjfuw8q73.fromDom(editor.getDoc()));
  };
  var remove$6 = function (editor, wire) {
    if (editor.inline) {
      $_fl1deelhjfuw8qax.remove(wire.parent());
    }
  };
  var $_fdmzdaoqjfuw8qzh = {
    get: get$8,
    remove: remove$6
  };

  var ResizeHandler = function (editor) {
    var selectionRng = Option.none();
    var resize = Option.none();
    var wire = Option.none();
    var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    var startW, startRawW;
    var isTable = function (elm) {
      return elm.nodeName === 'TABLE';
    };
    var getRawWidth = function (elm) {
      return editor.dom.getStyle(elm, 'width') || editor.dom.getAttrib(elm, 'width');
    };
    var lazyResize = function () {
      return resize;
    };
    var lazyWire = function () {
      return wire.getOr($_e4gwgeo6jfuw8qvi.only($_xbeoqkkjfuw8q73.fromDom(editor.getBody())));
    };
    var destroy = function () {
      resize.each(function (sz) {
        sz.destroy();
      });
      wire.each(function (w) {
        $_fdmzdaoqjfuw8qzh.remove(editor, w);
      });
    };
    editor.on('init', function () {
      var direction = TableDirection($_4xd1udnojfuw8qrw.directionAt);
      var rawWire = $_fdmzdaoqjfuw8qzh.get(editor);
      wire = Option.some(rawWire);
      if (hasObjectResizing(editor) && hasTableResizeBars(editor)) {
        var sz = TableResize(rawWire, direction);
        sz.on();
        sz.events.startDrag.bind(function (event) {
          selectionRng = Option.some(editor.selection.getRng());
        });
        sz.events.afterResize.bind(function (event) {
          var table = event.table();
          var dataStyleCells = $_6c9d0hl7jfuw8q9d.descendants(table, 'td[data-mce-style],th[data-mce-style]');
          $_tyr3yk5jfuw8q47.each(dataStyleCells, function (cell) {
            $_3q82t2l5jfuw8q93.remove(cell, 'data-mce-style');
          });
          selectionRng.each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
          });
          editor.undoManager.add();
        });
        resize = Option.some(sz);
      }
    });
    editor.on('ObjectResizeStart', function (e) {
      var targetElm = e.target;
      if (isTable(targetElm)) {
        startW = e.width;
        startRawW = getRawWidth(targetElm);
      }
    });
    editor.on('ObjectResized', function (e) {
      var targetElm = e.target;
      if (isTable(targetElm)) {
        var table = targetElm;
        if (percentageBasedSizeRegex.test(startRawW)) {
          var percentW = parseFloat(percentageBasedSizeRegex.exec(startRawW)[1]);
          var targetPercentW = e.width * percentW / startW;
          editor.dom.setStyle(table, 'width', targetPercentW + '%');
        } else {
          var newCellSizes_1 = [];
          global$2.each(table.rows, function (row) {
            global$2.each(row.cells, function (cell) {
              var width = editor.dom.getStyle(cell, 'width', true);
              newCellSizes_1.push({
                cell: cell,
                width: width
              });
            });
          });
          global$2.each(newCellSizes_1, function (newCellSize) {
            editor.dom.setStyle(newCellSize.cell, 'width', newCellSize.width);
            editor.dom.setAttrib(newCellSize.cell, 'width', null);
          });
        }
      }
    });
    return {
      lazyResize: lazyResize,
      lazyWire: lazyWire,
      destroy: destroy
    };
  };

  var none$2 = function (current) {
    return folder$1(function (n, f, m, l) {
      return n(current);
    });
  };
  var first$5 = function (current) {
    return folder$1(function (n, f, m, l) {
      return f(current);
    });
  };
  var middle$1 = function (current, target) {
    return folder$1(function (n, f, m, l) {
      return m(current, target);
    });
  };
  var last$4 = function (current) {
    return folder$1(function (n, f, m, l) {
      return l(current);
    });
  };
  var folder$1 = function (fold) {
    return { fold: fold };
  };
  var $_wsunjotjfuw8r0k = {
    none: none$2,
    first: first$5,
    middle: middle$1,
    last: last$4
  };

  var detect$4 = function (current, isRoot) {
    return $_aqhz9okhjfuw8q5y.table(current, isRoot).bind(function (table) {
      var all = $_aqhz9okhjfuw8q5y.cells(table);
      var index = $_tyr3yk5jfuw8q47.findIndex(all, function (x) {
        return $_e8rn66kojfuw8q7n.eq(current, x);
      });
      return index.map(function (ind) {
        return {
          index: $_20nfr6k7jfuw8q4g.constant(ind),
          all: $_20nfr6k7jfuw8q4g.constant(all)
        };
      });
    });
  };
  var next = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_wsunjotjfuw8r0k.none(current);
    }, function (info) {
      return info.index() + 1 < info.all().length ? $_wsunjotjfuw8r0k.middle(current, info.all()[info.index() + 1]) : $_wsunjotjfuw8r0k.last(current);
    });
  };
  var prev = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_wsunjotjfuw8r0k.none();
    }, function (info) {
      return info.index() - 1 >= 0 ? $_wsunjotjfuw8r0k.middle(current, info.all()[info.index() - 1]) : $_wsunjotjfuw8r0k.first(current);
    });
  };
  var $_947ovkosjfuw8r0c = {
    next: next,
    prev: prev
  };

  var adt = $_7sbzam7jfuw8qgu.generate([
    { 'before': ['element'] },
    {
      'on': [
        'element',
        'offset'
      ]
    },
    { after: ['element'] }
  ]);
  var cata$1 = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
  };
  var getStart = function (situ) {
    return situ.fold($_20nfr6k7jfuw8q4g.identity, $_20nfr6k7jfuw8q4g.identity, $_20nfr6k7jfuw8q4g.identity);
  };
  var $_cuk0n0ovjfuw8r0r = {
    before: adt.before,
    on: adt.on,
    after: adt.after,
    cata: cata$1,
    getStart: getStart
  };

  var type$2 = $_7sbzam7jfuw8qgu.generate([
    { domRange: ['rng'] },
    {
      relative: [
        'startSitu',
        'finishSitu'
      ]
    },
    {
      exact: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var range$2 = $_5now9kbjfuw8q5e.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$2.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_xbeoqkkjfuw8q73.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_cuk0n0ovjfuw8r0r.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_s8scrkmjfuw8q7a.defaultView(start);
  };
  var $_bv1jwpoujfuw8r0m = {
    domRange: type$2.domRange,
    relative: type$2.relative,
    exact: type$2.exact,
    exactFromRange: exactFromRange,
    range: range$2,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_s8scrkmjfuw8q7a.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_xbeoqkkjfuw8q73.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_e8rn66kojfuw8q7n.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_5xef0moxjfuw8r17 = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_tyr3yk5jfuw8q47.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_xbeoqkkjfuw8q73.fromDom(fragment);
  };
  var $_8a834noyjfuw8r19 = { fromElements: fromElements };

  var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
  };
  var selectNodeContentsUsing = function (rng, element) {
    rng.selectNodeContents(element.dom());
  };
  var isWithin$1 = function (outerRange, innerRange) {
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
  };
  var create$1 = function (win) {
    return win.document.createRange();
  };
  var setStart = function (rng, situ) {
    situ.fold(function (e) {
      rng.setStartBefore(e.dom());
    }, function (e, o) {
      rng.setStart(e.dom(), o);
    }, function (e) {
      rng.setStartAfter(e.dom());
    });
  };
  var setFinish = function (rng, situ) {
    situ.fold(function (e) {
      rng.setEndBefore(e.dom());
    }, function (e, o) {
      rng.setEnd(e.dom(), o);
    }, function (e) {
      rng.setEndAfter(e.dom());
    });
  };
  var replaceWith = function (rng, fragment) {
    deleteContents(rng);
    rng.insertNode(fragment.dom());
  };
  var relativeToNative = function (win, startSitu, finishSitu) {
    var range = win.document.createRange();
    setStart(range, startSitu);
    setFinish(range, finishSitu);
    return range;
  };
  var exactToNative = function (win, start, soffset, finish, foffset) {
    var rng = win.document.createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var deleteContents = function (rng) {
    rng.deleteContents();
  };
  var cloneFragment = function (rng) {
    var fragment = rng.cloneContents();
    return $_xbeoqkkjfuw8q73.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_20nfr6k7jfuw8q4g.constant(rect.left),
      top: $_20nfr6k7jfuw8q4g.constant(rect.top),
      right: $_20nfr6k7jfuw8q4g.constant(rect.right),
      bottom: $_20nfr6k7jfuw8q4g.constant(rect.bottom),
      width: $_20nfr6k7jfuw8q4g.constant(rect.width),
      height: $_20nfr6k7jfuw8q4g.constant(rect.height)
    };
  };
  var getFirstRect = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
  };
  var getBounds$1 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
  };
  var toString = function (rng) {
    return rng.toString();
  };
  var $_dkhwcmozjfuw8r1d = {
    create: create$1,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect,
    getBounds: getBounds$1,
    isWithin: isWithin$1,
    toString: toString
  };

  var adt$1 = $_7sbzam7jfuw8qgu.generate([
    {
      ltr: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    },
    {
      rtl: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var fromRange = function (win, type, range) {
    return type($_xbeoqkkjfuw8q73.fromDom(range.startContainer), range.startOffset, $_xbeoqkkjfuw8q73.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_20nfr6k7jfuw8q4g.constant(rng),
          rtl: Option.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_cfqymdkujfuw8q85.cached(function () {
            return $_dkhwcmozjfuw8r1d.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_cfqymdkujfuw8q85.cached(function () {
            return Option.some($_dkhwcmozjfuw8r1d.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_cfqymdkujfuw8q85.cached(function () {
            return $_dkhwcmozjfuw8r1d.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_cfqymdkujfuw8q85.cached(function () {
            return Option.some($_dkhwcmozjfuw8r1d.exactToNative(win, finish, foffset, start, soffset));
          })
        };
      }
    });
  };
  var doDiagnose = function (win, ranges) {
    var rng = ranges.ltr();
    if (rng.collapsed) {
      var reversed = ranges.rtl().filter(function (rev) {
        return rev.collapsed === false;
      });
      return reversed.map(function (rev) {
        return adt$1.rtl($_xbeoqkkjfuw8q73.fromDom(rev.endContainer), rev.endOffset, $_xbeoqkkjfuw8q73.fromDom(rev.startContainer), rev.startOffset);
      }).getOrThunk(function () {
        return fromRange(win, adt$1.ltr, rng);
      });
    } else {
      return fromRange(win, adt$1.ltr, rng);
    }
  };
  var diagnose = function (win, selection) {
    var ranges = getRanges(win, selection);
    return doDiagnose(win, ranges);
  };
  var asLtrRange = function (win, selection) {
    var diagnosis = diagnose(win, selection);
    return diagnosis.match({
      ltr: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(start.dom(), soffset);
        rng.setEnd(finish.dom(), foffset);
        return rng;
      },
      rtl: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(finish.dom(), foffset);
        rng.setEnd(start.dom(), soffset);
        return rng;
      }
    });
  };
  var $_c9xxrpp0jfuw8r1k = {
    ltr: adt$1.ltr,
    rtl: adt$1.rtl,
    diagnose: diagnose,
    asLtrRange: asLtrRange
  };

  var searchForPoint = function (rectForOffset, x, y, maxX, length) {
    if (length === 0)
      return 0;
    else if (x === maxX)
      return length - 1;
    var xDelta = maxX;
    for (var i = 1; i < length; i++) {
      var rect = rectForOffset(i);
      var curDeltaX = Math.abs(x - rect.left);
      if (y > rect.bottom) {
      } else if (y < rect.top || curDeltaX > xDelta) {
        return i - 1;
      } else {
        xDelta = curDeltaX;
      }
    }
    return 0;
  };
  var inRect = function (rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };
  var $_4j2zpup3jfuw8r2b = {
    inRect: inRect,
    searchForPoint: searchForPoint
  };

  var locateOffset = function (doc, textnode, x, y, rect) {
    var rangeForOffset = function (offset) {
      var r = doc.dom().createRange();
      r.setStart(textnode.dom(), offset);
      r.collapse(true);
      return r;
    };
    var rectForOffset = function (offset) {
      var r = rangeForOffset(offset);
      return r.getBoundingClientRect();
    };
    var length = $_6j8y7blnjfuw8qc3.get(textnode).length;
    var offset = $_4j2zpup3jfuw8r2b.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_cul8qomvjfuw8qm7.findMap(rects, function (rect) {
      return $_4j2zpup3jfuw8r2b.inRect(rect, x, y) ? Option.some(rect) : Option.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_11d3zhp4jfuw8r2c = { locate: locate };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_s8scrkmjfuw8q7a.children(node);
    return $_cul8qomvjfuw8qm7.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_4j2zpup3jfuw8r2b.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_a8gk30l6jfuw8q9c.isText(node) ? $_11d3zhp4jfuw8r2c.locate : searchInChildren;
    return locator(doc, node, x, y);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
  };
  var $_6f632yp2jfuw8r25 = { locate: locate$1 };

  var COLLAPSE_TO_LEFT = true;
  var COLLAPSE_TO_RIGHT = false;
  var getCollapseDirection = function (rect, x) {
    return x - rect.left < rect.right - x ? COLLAPSE_TO_LEFT : COLLAPSE_TO_RIGHT;
  };
  var createCollapsedNode = function (doc, target, collapseDirection) {
    var r = doc.dom().createRange();
    r.selectNode(target.dom());
    r.collapse(collapseDirection);
    return r;
  };
  var locateInElement = function (doc, node, x) {
    var cursorRange = doc.dom().createRange();
    cursorRange.selectNode(node.dom());
    var rect = cursorRange.getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_ejrzj4lljfuw8qbw.first : $_ejrzj4lljfuw8qbw.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return Option.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search = function (doc, node, x) {
    var f = $_s8scrkmjfuw8q7a.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_azsqu2p5jfuw8r2i = { search: search };

  var caretPositionFromPoint = function (doc, x, y) {
    return Option.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return Option.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return Option.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return Option.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_6f632yp2jfuw8r25.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_xbeoqkkjfuw8q73.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_azsqu2p5jfuw8r2i.search(doc, elem, x);
      };
      return $_s8scrkmjfuw8q7a.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_xbeoqkkjfuw8q73.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_bv1jwpoujfuw8r0m.range($_xbeoqkkjfuw8q73.fromDom(rng.startContainer), rng.startOffset, $_xbeoqkkjfuw8q73.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_lw04hp1jfuw8r1v = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_dkhwcmozjfuw8r1d.create(win);
    var self = $_enn9uikjjfuw8q6w.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_6c9d0hl7jfuw8q9d.descendants(ancestor, selector));
    return $_tyr3yk5jfuw8q47.filter(elements, function (elem) {
      $_dkhwcmozjfuw8r1d.selectNodeContentsUsing(innerRange, elem);
      return $_dkhwcmozjfuw8r1d.isWithin(outerRange, innerRange);
    });
  };
  var find$3 = function (win, selection, selector) {
    var outerRange = $_c9xxrpp0jfuw8r1k.asLtrRange(win, selection);
    var ancestor = $_xbeoqkkjfuw8q73.fromDom(outerRange.commonAncestorContainer);
    return $_a8gk30l6jfuw8q9c.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_7efy22p6jfuw8r2m = { find: find$3 };

  var beforeSpecial = function (element, offset) {
    var name = $_a8gk30l6jfuw8q9c.name(element);
    if ('input' === name)
      return $_cuk0n0ovjfuw8r0r.after(element);
    else if (!$_tyr3yk5jfuw8q47.contains([
        'br',
        'img'
      ], name))
      return $_cuk0n0ovjfuw8r0r.on(element, offset);
    else
      return offset === 0 ? $_cuk0n0ovjfuw8r0r.before(element) : $_cuk0n0ovjfuw8r0r.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_cuk0n0ovjfuw8r0r.before, beforeSpecial, $_cuk0n0ovjfuw8r0r.after);
    var finish = finishSitu.fold($_cuk0n0ovjfuw8r0r.before, beforeSpecial, $_cuk0n0ovjfuw8r0r.after);
    return $_bv1jwpoujfuw8r0m.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_bv1jwpoujfuw8r0m.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_xbeoqkkjfuw8q73.fromDom(rng.startContainer);
        var finish = $_xbeoqkkjfuw8q73.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_cjts8ap7jfuw8r2q = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    Option.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_dkhwcmozjfuw8r1d.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_7efy22p6jfuw8r2m.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_c9xxrpp0jfuw8r1k.diagnose(win, relative).match({
      ltr: function (start, soffset, finish, foffset) {
        doSetRange(win, start, soffset, finish, foffset);
      },
      rtl: function (start, soffset, finish, foffset) {
        var selection = win.getSelection();
        if (selection.setBaseAndExtent) {
          selection.setBaseAndExtent(start.dom(), soffset, finish.dom(), foffset);
        } else if (selection.extend) {
          selection.collapse(start.dom(), soffset);
          selection.extend(finish.dom(), foffset);
        } else {
          doSetRange(win, finish, foffset, start, soffset);
        }
      }
    });
  };
  var setExact = function (win, start, soffset, finish, foffset) {
    var relative = $_cjts8ap7jfuw8r2q.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_cjts8ap7jfuw8r2q.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_bv1jwpoujfuw8r0m.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_dkhwcmozjfuw8r1d.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_cjts8ap7jfuw8r2q.preprocess(selection);
    return $_c9xxrpp0jfuw8r1k.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return Option.some($_bv1jwpoujfuw8r0m.range($_xbeoqkkjfuw8q73.fromDom(firstRng.startContainer), firstRng.startOffset, $_xbeoqkkjfuw8q73.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return Option.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_xbeoqkkjfuw8q73.fromDom(selection.anchorNode);
    var focusNode = $_xbeoqkkjfuw8q73.fromDom(selection.focusNode);
    return $_5xef0moxjfuw8r17.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? Option.some($_bv1jwpoujfuw8r0m.range($_xbeoqkkjfuw8q73.fromDom(selection.anchorNode), selection.anchorOffset, $_xbeoqkkjfuw8q73.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_dkhwcmozjfuw8r1d.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_dkhwcmozjfuw8r1d.selectNodeContents(win, element);
    return $_bv1jwpoujfuw8r0m.range($_xbeoqkkjfuw8q73.fromDom(rng.startContainer), rng.startOffset, $_xbeoqkkjfuw8q73.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : Option.none();
  };
  var get$9 = function (win) {
    return getExact(win).map(function (range) {
      return $_bv1jwpoujfuw8r0m.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_c9xxrpp0jfuw8r1k.asLtrRange(win, selection);
    return $_dkhwcmozjfuw8r1d.getFirstRect(rng);
  };
  var getBounds$2 = function (win, selection) {
    var rng = $_c9xxrpp0jfuw8r1k.asLtrRange(win, selection);
    return $_dkhwcmozjfuw8r1d.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_lw04hp1jfuw8r1v.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_c9xxrpp0jfuw8r1k.asLtrRange(win, selection);
    return $_dkhwcmozjfuw8r1d.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$2 = function (win, selection) {
    var rng = $_c9xxrpp0jfuw8r1k.asLtrRange(win, selection);
    return $_dkhwcmozjfuw8r1d.cloneFragment(rng);
  };
  var replace$1 = function (win, selection, elements) {
    var rng = $_c9xxrpp0jfuw8r1k.asLtrRange(win, selection);
    var fragment = $_8a834noyjfuw8r19.fromElements(elements, win.document);
    $_dkhwcmozjfuw8r1d.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_c9xxrpp0jfuw8r1k.asLtrRange(win, selection);
    $_dkhwcmozjfuw8r1d.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_e8rn66kojfuw8q7n.eq(start, finish) && soffset === foffset;
  };
  var $_3gcdhqowjfuw8r11 = {
    setExact: setExact,
    getExact: getExact,
    get: get$9,
    setRelative: setRelative,
    toNative: toNative,
    setToElement: setToElement,
    clear: clear$1,
    clone: clone$2,
    replace: replace$1,
    deleteAt: deleteAt,
    forElement: forElement,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$2,
    getAtPoint: getAtPoint,
    findWithin: findWithin,
    getAsString: getAsString,
    isCollapsed: isCollapsed
  };

  var global$4 = tinymce.util.Tools.resolve('tinymce.util.VK');

  var forward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_947ovkosjfuw8r0c.next(cell), lazyWire);
  };
  var backward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_947ovkosjfuw8r0c.prev(cell), lazyWire);
  };
  var getCellFirstCursorPosition = function (editor, cell) {
    var selection = $_bv1jwpoujfuw8r0m.exact(cell, 0, cell, 0);
    return $_3gcdhqowjfuw8r11.toNative(selection);
  };
  var getNewRowCursorPosition = function (editor, table) {
    var rows = $_6c9d0hl7jfuw8q9d.descendants(table, 'tr');
    return $_tyr3yk5jfuw8q47.last(rows).bind(function (last) {
      return $_8wdrbmlajfuw8q9m.descendant(last, 'td,th').map(function (first) {
        return getCellFirstCursorPosition(editor, first);
      });
    });
  };
  var go = function (editor, isRoot, cell, actions, lazyWire) {
    return cell.fold(Option.none, Option.none, function (current, next) {
      return $_ejrzj4lljfuw8qbw.first(next).map(function (cell) {
        return getCellFirstCursorPosition(editor, cell);
      });
    }, function (current) {
      return $_aqhz9okhjfuw8q5y.table(current, isRoot).bind(function (table) {
        var targets = $_5b7h1hlqjfuw8qci.noMenu(current);
        editor.undoManager.transact(function () {
          actions.insertRowsAfter(table, targets);
        });
        return getNewRowCursorPosition(editor, table);
      });
    });
  };
  var rootElements = [
    'table',
    'li',
    'dl'
  ];
  var handle$1 = function (event, editor, actions, lazyWire) {
    if (event.keyCode === global$4.TAB) {
      var body_1 = $_5xkhf2nnjfuw8qrq.getBody(editor);
      var isRoot_1 = function (element) {
        var name = $_a8gk30l6jfuw8q9c.name(element);
        return $_e8rn66kojfuw8q7n.eq(element, body_1) || $_tyr3yk5jfuw8q47.contains(rootElements, name);
      };
      var rng = editor.selection.getRng();
      if (rng.collapsed) {
        var start = $_xbeoqkkjfuw8q73.fromDom(rng.startContainer);
        $_aqhz9okhjfuw8q5y.cell(start, isRoot_1).each(function (cell) {
          event.preventDefault();
          var navigation = event.shiftKey ? backward : forward;
          var rng = navigation(editor, isRoot_1, cell, actions, lazyWire);
          rng.each(function (range) {
            editor.selection.setRng(range);
          });
        });
      }
    }
  };
  var $_djb8ceorjfuw8qzt = { handle: handle$1 };

  var response = $_5now9kbjfuw8q5e.immutable('selection', 'kill');
  var $_b7ap4hpbjfuw8r3x = { response: response };

  var isKey = function (key) {
    return function (keycode) {
      return keycode === key;
    };
  };
  var isUp = isKey(38);
  var isDown = isKey(40);
  var isNavigation = function (keycode) {
    return keycode >= 37 && keycode <= 40;
  };
  var $_9n04otpcjfuw8r40 = {
    ltr: {
      isBackward: isKey(37),
      isForward: isKey(39)
    },
    rtl: {
      isBackward: isKey(39),
      isForward: isKey(37)
    },
    isUp: isUp,
    isDown: isDown,
    isNavigation: isNavigation
  };

  var convertToRange = function (win, selection) {
    var rng = $_c9xxrpp0jfuw8r1k.asLtrRange(win, selection);
    return {
      start: $_20nfr6k7jfuw8q4g.constant($_xbeoqkkjfuw8q73.fromDom(rng.startContainer)),
      soffset: $_20nfr6k7jfuw8q4g.constant(rng.startOffset),
      finish: $_20nfr6k7jfuw8q4g.constant($_xbeoqkkjfuw8q73.fromDom(rng.endContainer)),
      foffset: $_20nfr6k7jfuw8q4g.constant(rng.endOffset)
    };
  };
  var makeSitus = function (start, soffset, finish, foffset) {
    return {
      start: $_20nfr6k7jfuw8q4g.constant($_cuk0n0ovjfuw8r0r.on(start, soffset)),
      finish: $_20nfr6k7jfuw8q4g.constant($_cuk0n0ovjfuw8r0r.on(finish, foffset))
    };
  };
  var $_81eh29pejfuw8r4k = {
    convertToRange: convertToRange,
    makeSitus: makeSitus
  };

  var isSafari = $_fqgee0ktjfuw8q83.detect().browser.isSafari();
  var get$10 = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
    var y = doc.body.scrollTop || doc.documentElement.scrollTop;
    return r(x, y);
  };
  var to = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollTo(x, y);
  };
  var by = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollBy(x, y);
  };
  var setToElement$1 = function (win, element) {
    var pos = $_hsvzlmijfuw8qj4.absolute(element);
    var doc = $_xbeoqkkjfuw8q73.fromDom(win.document);
    to(pos.left(), pos.top(), doc);
  };
  var preserve$1 = function (doc, f) {
    var before = get$10(doc);
    f();
    var after = get$10(doc);
    if (before.top() !== after.top() || before.left() !== after.left()) {
      to(before.left(), before.top(), doc);
    }
  };
  var capture$2 = function (doc) {
    var previous = Option.none();
    var save = function () {
      previous = Option.some(get$10(doc));
    };
    var restore = function () {
      previous.each(function (p) {
        to(p.left(), p.top(), doc);
      });
    };
    save();
    return {
      save: save,
      restore: restore
    };
  };
  var intoView = function (element, alignToTop) {
    if (isSafari && $_g6mvnrk8jfuw8q4k.isFunction(element.dom().scrollIntoViewIfNeeded)) {
      element.dom().scrollIntoViewIfNeeded(false);
    } else {
      element.dom().scrollIntoView(alignToTop);
    }
  };
  var intoViewIfNeeded = function (element, container) {
    var containerBox = container.dom().getBoundingClientRect();
    var elementBox = element.dom().getBoundingClientRect();
    if (elementBox.top < containerBox.top) {
      intoView(element, true);
    } else if (elementBox.bottom > containerBox.bottom) {
      intoView(element, false);
    }
  };
  var scrollBarWidth = function () {
    var scrollDiv = $_xbeoqkkjfuw8q73.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
    $_fatuxylgjfuw8qav.after($_atd1tul9jfuw8q9i.body(), scrollDiv);
    var w = scrollDiv.dom().offsetWidth - scrollDiv.dom().clientWidth;
    $_fl1deelhjfuw8qax.remove(scrollDiv);
    return w;
  };
  var $_xvhf9pfjfuw8r51 = {
    get: get$10,
    to: to,
    by: by,
    preserve: preserve$1,
    capture: capture$2,
    intoView: intoView,
    intoViewIfNeeded: intoViewIfNeeded,
    setToElement: setToElement$1,
    scrollBarWidth: scrollBarWidth
  };

  function WindowBridge (win) {
    var elementFromPoint = function (x, y) {
      return Option.from(win.document.elementFromPoint(x, y)).map($_xbeoqkkjfuw8q73.fromDom);
    };
    var getRect = function (element) {
      return element.dom().getBoundingClientRect();
    };
    var getRangedRect = function (start, soffset, finish, foffset) {
      var sel = $_bv1jwpoujfuw8r0m.exact(start, soffset, finish, foffset);
      return $_3gcdhqowjfuw8r11.getFirstRect(win, sel).map(function (structRect) {
        return $_11yiupkajfuw8q5c.map(structRect, $_20nfr6k7jfuw8q4g.apply);
      });
    };
    var getSelection = function () {
      return $_3gcdhqowjfuw8r11.get(win).map(function (exactAdt) {
        return $_81eh29pejfuw8r4k.convertToRange(win, exactAdt);
      });
    };
    var fromSitus = function (situs) {
      var relative = $_bv1jwpoujfuw8r0m.relative(situs.start(), situs.finish());
      return $_81eh29pejfuw8r4k.convertToRange(win, relative);
    };
    var situsFromPoint = function (x, y) {
      return $_3gcdhqowjfuw8r11.getAtPoint(win, x, y).map(function (exact) {
        return {
          start: $_20nfr6k7jfuw8q4g.constant($_cuk0n0ovjfuw8r0r.on(exact.start(), exact.soffset())),
          finish: $_20nfr6k7jfuw8q4g.constant($_cuk0n0ovjfuw8r0r.on(exact.finish(), exact.foffset()))
        };
      });
    };
    var clearSelection = function () {
      $_3gcdhqowjfuw8r11.clear(win);
    };
    var selectContents = function (element) {
      $_3gcdhqowjfuw8r11.setToElement(win, element);
    };
    var setSelection = function (sel) {
      $_3gcdhqowjfuw8r11.setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
    };
    var setRelativeSelection = function (start, finish) {
      $_3gcdhqowjfuw8r11.setRelative(win, start, finish);
    };
    var getInnerHeight = function () {
      return win.innerHeight;
    };
    var getScrollY = function () {
      var pos = $_xvhf9pfjfuw8r51.get($_xbeoqkkjfuw8q73.fromDom(win.document));
      return pos.top();
    };
    var scrollBy = function (x, y) {
      $_xvhf9pfjfuw8r51.by(x, y, $_xbeoqkkjfuw8q73.fromDom(win.document));
    };
    return {
      elementFromPoint: elementFromPoint,
      getRect: getRect,
      getRangedRect: getRangedRect,
      getSelection: getSelection,
      fromSitus: fromSitus,
      situsFromPoint: situsFromPoint,
      clearSelection: clearSelection,
      setSelection: setSelection,
      setRelativeSelection: setRelativeSelection,
      selectContents: selectContents,
      getInnerHeight: getInnerHeight,
      getScrollY: getScrollY,
      scrollBy: scrollBy
    };
  }

  var sync = function (container, isRoot, start, soffset, finish, foffset, selectRange) {
    if (!($_e8rn66kojfuw8q7n.eq(start, finish) && soffset === foffset)) {
      return $_8wdrbmlajfuw8q9m.closest(start, 'td,th', isRoot).bind(function (s) {
        return $_8wdrbmlajfuw8q9m.closest(finish, 'td,th', isRoot).bind(function (f) {
          return detect$5(container, isRoot, s, f, selectRange);
        });
      });
    } else {
      return Option.none();
    }
  };
  var detect$5 = function (container, isRoot, start, finish, selectRange) {
    if (!$_e8rn66kojfuw8q7n.eq(start, finish)) {
      return $_dpd405ltjfuw8qd8.identify(start, finish, isRoot).bind(function (cellSel) {
        var boxes = cellSel.boxes().getOr([]);
        if (boxes.length > 0) {
          selectRange(container, boxes, cellSel.start(), cellSel.finish());
          return Option.some($_b7ap4hpbjfuw8r3x.response(Option.some($_81eh29pejfuw8r4k.makeSitus(start, 0, start, $_6vfowrlmjfuw8qbz.getEnd(start))), true));
        } else {
          return Option.none();
        }
      });
    } else {
      return Option.none();
    }
  };
  var update = function (rows, columns, container, selected, annotations) {
    var updateSelection = function (newSels) {
      annotations.clear(container);
      annotations.selectRange(container, newSels.boxes(), newSels.start(), newSels.finish());
      return newSels.boxes();
    };
    return $_dpd405ltjfuw8qd8.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
  };
  var $_7ulhzpgjfuw8r5b = {
    sync: sync,
    detect: detect$5,
    update: update
  };

  var nu$3 = $_5now9kbjfuw8q5e.immutableBag([
    'left',
    'top',
    'right',
    'bottom'
  ], []);
  var moveDown = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() + amount,
      right: caret.right(),
      bottom: caret.bottom() + amount
    });
  };
  var moveUp = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() - amount,
      right: caret.right(),
      bottom: caret.bottom() - amount
    });
  };
  var moveBottomTo = function (caret, bottom) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: bottom - height,
      right: caret.right(),
      bottom: bottom
    });
  };
  var moveTopTo = function (caret, top) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: top,
      right: caret.right(),
      bottom: top + height
    });
  };
  var translate = function (caret, xDelta, yDelta) {
    return nu$3({
      left: caret.left() + xDelta,
      top: caret.top() + yDelta,
      right: caret.right() + xDelta,
      bottom: caret.bottom() + yDelta
    });
  };
  var getTop$1 = function (caret) {
    return caret.top();
  };
  var getBottom = function (caret) {
    return caret.bottom();
  };
  var toString$1 = function (caret) {
    return '(' + caret.left() + ', ' + caret.top() + ') -> (' + caret.right() + ', ' + caret.bottom() + ')';
  };
  var $_37xezepjjfuw8r6q = {
    nu: nu$3,
    moveUp: moveUp,
    moveDown: moveDown,
    moveBottomTo: moveBottomTo,
    moveTopTo: moveTopTo,
    getTop: getTop$1,
    getBottom: getBottom,
    translate: translate,
    toString: toString$1
  };

  var getPartialBox = function (bridge, element, offset) {
    if (offset >= 0 && offset < $_6vfowrlmjfuw8qbz.getEnd(element))
      return bridge.getRangedRect(element, offset, element, offset + 1);
    else if (offset > 0)
      return bridge.getRangedRect(element, offset - 1, element, offset);
    return Option.none();
  };
  var toCaret = function (rect) {
    return $_37xezepjjfuw8r6q.nu({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    });
  };
  var getElemBox = function (bridge, element) {
    return Option.some(bridge.getRect(element));
  };
  var getBoxAt = function (bridge, element, offset) {
    if ($_a8gk30l6jfuw8q9c.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_a8gk30l6jfuw8q9c.isText(element))
      return getPartialBox(bridge, element, offset).map(toCaret);
    else
      return Option.none();
  };
  var getEntireBox = function (bridge, element) {
    if ($_a8gk30l6jfuw8q9c.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_a8gk30l6jfuw8q9c.isText(element))
      return bridge.getRangedRect(element, 0, element, $_6vfowrlmjfuw8qbz.getEnd(element)).map(toCaret);
    else
      return Option.none();
  };
  var $_8xl6tpkjfuw8r6u = {
    getBoxAt: getBoxAt,
    getEntireBox: getEntireBox
  };

  var traverse = $_5now9kbjfuw8q5e.immutable('item', 'mode');
  var backtrack = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : sidestep;
    return universe.property().parent(item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var sidestep = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    return direction.sibling(universe, item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var advance = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    var children = universe.property().children(item);
    var result = direction.first(children);
    return result.map(function (r) {
      return traverse(r, transition);
    });
  };
  var successors = [
    {
      current: backtrack,
      next: sidestep,
      fallback: Option.none()
    },
    {
      current: sidestep,
      next: advance,
      fallback: Option.some(backtrack)
    },
    {
      current: advance,
      next: advance,
      fallback: Option.some(sidestep)
    }
  ];
  var go$1 = function (universe, item, mode, direction, rules) {
    var rules = rules !== undefined ? rules : successors;
    var ruleOpt = $_tyr3yk5jfuw8q47.find(rules, function (succ) {
      return succ.current === mode;
    });
    return ruleOpt.bind(function (rule) {
      return rule.current(universe, item, direction, rule.next).orThunk(function () {
        return rule.fallback.bind(function (fb) {
          return go$1(universe, item, fb, direction);
        });
      });
    });
  };
  var $_12nww3ppjfuw8r7x = {
    backtrack: backtrack,
    sidestep: sidestep,
    advance: advance,
    go: go$1
  };

  var left$1 = function () {
    var sibling = function (universe, item) {
      return universe.query().prevSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? Option.some(children[children.length - 1]) : Option.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var right$1 = function () {
    var sibling = function (universe, item) {
      return universe.query().nextSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? Option.some(children[0]) : Option.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var $_135xakpqjfuw8r85 = {
    left: left$1,
    right: right$1
  };

  var hone = function (universe, item, predicate, mode, direction, isRoot) {
    var next = $_12nww3ppjfuw8r7x.go(universe, item, mode, direction);
    return next.bind(function (n) {
      if (isRoot(n.item()))
        return Option.none();
      else
        return predicate(n.item()) ? Option.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
    });
  };
  var left$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_12nww3ppjfuw8r7x.sidestep, $_135xakpqjfuw8r85.left(), isRoot);
  };
  var right$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_12nww3ppjfuw8r7x.sidestep, $_135xakpqjfuw8r85.right(), isRoot);
  };
  var $_6b0zg3pojfuw8r7t = {
    left: left$2,
    right: right$2
  };

  var isLeaf = function (universe, element) {
    return universe.property().children(element).length === 0;
  };
  var before$2 = function (universe, item, isRoot) {
    return seekLeft(universe, item, $_20nfr6k7jfuw8q4g.curry(isLeaf, universe), isRoot);
  };
  var after$3 = function (universe, item, isRoot) {
    return seekRight(universe, item, $_20nfr6k7jfuw8q4g.curry(isLeaf, universe), isRoot);
  };
  var seekLeft = function (universe, item, predicate, isRoot) {
    return $_6b0zg3pojfuw8r7t.left(universe, item, predicate, isRoot);
  };
  var seekRight = function (universe, item, predicate, isRoot) {
    return $_6b0zg3pojfuw8r7t.right(universe, item, predicate, isRoot);
  };
  var walkers = function () {
    return {
      left: $_135xakpqjfuw8r85.left,
      right: $_135xakpqjfuw8r85.right
    };
  };
  var walk = function (universe, item, mode, direction, _rules) {
    return $_12nww3ppjfuw8r7x.go(universe, item, mode, direction, _rules);
  };
  var $_fivsmpnjfuw8r7p = {
    before: before$2,
    after: after$3,
    seekLeft: seekLeft,
    seekRight: seekRight,
    walkers: walkers,
    walk: walk,
    backtrack: $_12nww3ppjfuw8r7x.backtrack,
    sidestep: $_12nww3ppjfuw8r7x.sidestep,
    advance: $_12nww3ppjfuw8r7x.advance
  };

  var universe$2 = DomUniverse();
  var gather = function (element, prune, transform) {
    return $_fivsmpnjfuw8r7p.gather(universe$2, element, prune, transform);
  };
  var before$3 = function (element, isRoot) {
    return $_fivsmpnjfuw8r7p.before(universe$2, element, isRoot);
  };
  var after$4 = function (element, isRoot) {
    return $_fivsmpnjfuw8r7p.after(universe$2, element, isRoot);
  };
  var seekLeft$1 = function (element, predicate, isRoot) {
    return $_fivsmpnjfuw8r7p.seekLeft(universe$2, element, predicate, isRoot);
  };
  var seekRight$1 = function (element, predicate, isRoot) {
    return $_fivsmpnjfuw8r7p.seekRight(universe$2, element, predicate, isRoot);
  };
  var walkers$1 = function () {
    return $_fivsmpnjfuw8r7p.walkers();
  };
  var walk$1 = function (item, mode, direction, _rules) {
    return $_fivsmpnjfuw8r7p.walk(universe$2, item, mode, direction, _rules);
  };
  var $_fgafb6pmjfuw8r7l = {
    gather: gather,
    before: before$3,
    after: after$4,
    seekLeft: seekLeft$1,
    seekRight: seekRight$1,
    walkers: walkers$1,
    walk: walk$1
  };

  var JUMP_SIZE = 5;
  var NUM_RETRIES = 100;
  var adt$2 = $_7sbzam7jfuw8qgu.generate([
    { 'none': [] },
    { 'retry': ['caret'] }
  ]);
  var isOutside = function (caret, box) {
    return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
  };
  var inOutsideBlock = function (bridge, element, caret) {
    return $_11ympzlbjfuw8q9n.closest(element, $_d9tdqtmrjfuw8ql9.isBlock).fold($_20nfr6k7jfuw8q4g.constant(false), function (cell) {
      return $_8xl6tpkjfuw8r6u.getEntireBox(bridge, cell).exists(function (box) {
        return isOutside(caret, box);
      });
    });
  };
  var adjustDown = function (bridge, element, guessBox, original, caret) {
    var lowerCaret = $_37xezepjjfuw8r6q.moveDown(caret, JUMP_SIZE);
    if (Math.abs(guessBox.bottom() - original.bottom()) < 1)
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() > caret.bottom())
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() === caret.bottom())
      return adt$2.retry($_37xezepjjfuw8r6q.moveDown(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_37xezepjjfuw8r6q.translate(lowerCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var adjustUp = function (bridge, element, guessBox, original, caret) {
    var higherCaret = $_37xezepjjfuw8r6q.moveUp(caret, JUMP_SIZE);
    if (Math.abs(guessBox.top() - original.top()) < 1)
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() < caret.top())
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() === caret.top())
      return adt$2.retry($_37xezepjjfuw8r6q.moveUp(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_37xezepjjfuw8r6q.translate(higherCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var upMovement = {
    point: $_37xezepjjfuw8r6q.getTop,
    adjuster: adjustUp,
    move: $_37xezepjjfuw8r6q.moveUp,
    gather: $_fgafb6pmjfuw8r7l.before
  };
  var downMovement = {
    point: $_37xezepjjfuw8r6q.getBottom,
    adjuster: adjustDown,
    move: $_37xezepjjfuw8r6q.moveDown,
    gather: $_fgafb6pmjfuw8r7l.after
  };
  var isAtTable = function (bridge, x, y) {
    return bridge.elementFromPoint(x, y).filter(function (elm) {
      return $_a8gk30l6jfuw8q9c.name(elm) === 'table';
    }).isSome();
  };
  var adjustForTable = function (bridge, movement, original, caret, numRetries) {
    return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
  };
  var adjustTil = function (bridge, movement, original, caret, numRetries) {
    if (numRetries === 0)
      return Option.some(caret);
    if (isAtTable(bridge, caret.left(), movement.point(caret)))
      return adjustForTable(bridge, movement, original, caret, numRetries - 1);
    return bridge.situsFromPoint(caret.left(), movement.point(caret)).bind(function (guess) {
      return guess.start().fold(Option.none, function (element, offset) {
        return $_8xl6tpkjfuw8r6u.getEntireBox(bridge, element, offset).bind(function (guessBox) {
          return movement.adjuster(bridge, element, guessBox, original, caret).fold(Option.none, function (newCaret) {
            return adjustTil(bridge, movement, original, newCaret, numRetries - 1);
          });
        }).orThunk(function () {
          return Option.some(caret);
        });
      }, Option.none);
    });
  };
  var ieTryDown = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.bottom() + JUMP_SIZE);
  };
  var ieTryUp = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.top() - JUMP_SIZE);
  };
  var checkScroll = function (movement, adjusted, bridge) {
    if (movement.point(adjusted) > bridge.getInnerHeight())
      return Option.some(movement.point(adjusted) - bridge.getInnerHeight());
    else if (movement.point(adjusted) < 0)
      return Option.some(-movement.point(adjusted));
    else
      return Option.none();
  };
  var retry = function (movement, bridge, caret) {
    var moved = movement.move(caret, JUMP_SIZE);
    var adjusted = adjustTil(bridge, movement, caret, moved, NUM_RETRIES).getOr(moved);
    return checkScroll(movement, adjusted, bridge).fold(function () {
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted));
    }, function (delta) {
      bridge.scrollBy(0, delta);
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted) - delta);
    });
  };
  var $_efciv1pljfuw8r73 = {
    tryUp: $_20nfr6k7jfuw8q4g.curry(retry, upMovement),
    tryDown: $_20nfr6k7jfuw8q4g.curry(retry, downMovement),
    ieTryUp: ieTryUp,
    ieTryDown: ieTryDown,
    getJumpSize: $_20nfr6k7jfuw8q4g.constant(JUMP_SIZE)
  };

  var adt$3 = $_7sbzam7jfuw8qgu.generate([
    { 'none': ['message'] },
    { 'success': [] },
    { 'failedUp': ['cell'] },
    { 'failedDown': ['cell'] }
  ]);
  var isOverlapping = function (bridge, before, after) {
    var beforeBounds = bridge.getRect(before);
    var afterBounds = bridge.getRect(after);
    return afterBounds.right > beforeBounds.left && afterBounds.left < beforeBounds.right;
  };
  var verify = function (bridge, before, beforeOffset, after, afterOffset, failure, isRoot) {
    return $_8wdrbmlajfuw8q9m.closest(after, 'td,th', isRoot).bind(function (afterCell) {
      return $_8wdrbmlajfuw8q9m.closest(before, 'td,th', isRoot).map(function (beforeCell) {
        if (!$_e8rn66kojfuw8q7n.eq(afterCell, beforeCell)) {
          return $_583a2nlujfuw8qdw.sharedOne(isRow, [
            afterCell,
            beforeCell
          ]).fold(function () {
            return isOverlapping(bridge, beforeCell, afterCell) ? adt$3.success() : failure(beforeCell);
          }, function (sharedRow) {
            return failure(beforeCell);
          });
        } else {
          return $_e8rn66kojfuw8q7n.eq(after, afterCell) && $_6vfowrlmjfuw8qbz.getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$3.none('in same cell');
        }
      });
    }).getOr(adt$3.none('default'));
  };
  var isRow = function (elem) {
    return $_8wdrbmlajfuw8q9m.closest(elem, 'tr');
  };
  var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
    return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
  };
  var $_25fydhprjfuw8r89 = {
    verify: verify,
    cata: cata$2,
    adt: adt$3
  };

  var point = $_5now9kbjfuw8q5e.immutable('element', 'offset');
  var delta = $_5now9kbjfuw8q5e.immutable('element', 'deltaOffset');
  var range$3 = $_5now9kbjfuw8q5e.immutable('element', 'start', 'finish');
  var points = $_5now9kbjfuw8q5e.immutable('begin', 'end');
  var text = $_5now9kbjfuw8q5e.immutable('element', 'text');
  var $_1kct4uptjfuw8r98 = {
    point: point,
    delta: delta,
    range: range$3,
    points: points,
    text: text
  };

  var inAncestor = $_5now9kbjfuw8q5e.immutable('ancestor', 'descendants', 'element', 'index');
  var inParent = $_5now9kbjfuw8q5e.immutable('parent', 'children', 'element', 'index');
  var childOf = function (element, ancestor) {
    return $_11ympzlbjfuw8q9n.closest(element, function (elem) {
      return $_s8scrkmjfuw8q7a.parent(elem).exists(function (parent) {
        return $_e8rn66kojfuw8q7n.eq(parent, ancestor);
      });
    });
  };
  var indexInParent = function (element) {
    return $_s8scrkmjfuw8q7a.parent(element).bind(function (parent) {
      var children = $_s8scrkmjfuw8q7a.children(parent);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var indexOf$1 = function (elements, element) {
    return $_tyr3yk5jfuw8q47.findIndex(elements, $_20nfr6k7jfuw8q4g.curry($_e8rn66kojfuw8q7n.eq, element));
  };
  var selectorsInParent = function (element, selector) {
    return $_s8scrkmjfuw8q7a.parent(element).bind(function (parent) {
      var children = $_6c9d0hl7jfuw8q9d.children(parent, selector);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
    return $_8wdrbmlajfuw8q9m.closest(element, ancestorSelector).bind(function (ancestor) {
      var descendants = $_6c9d0hl7jfuw8q9d.descendants(ancestor, descendantSelector);
      return indexOf$1(descendants, element).map(function (index) {
        return inAncestor(ancestor, descendants, element, index);
      });
    });
  };
  var $_cz3gbvpujfuw8r9c = {
    childOf: childOf,
    indexOf: indexOf$1,
    indexInParent: indexInParent,
    selectorsInParent: selectorsInParent,
    descendantsInAncestor: descendantsInAncestor
  };

  var isBr = function (elem) {
    return $_a8gk30l6jfuw8q9c.name(elem) === 'br';
  };
  var gatherer = function (cand, gather, isRoot) {
    return gather(cand, isRoot).bind(function (target) {
      return $_a8gk30l6jfuw8q9c.isText(target) && $_6j8y7blnjfuw8qc3.get(target).trim().length === 0 ? gatherer(target, gather, isRoot) : Option.some(target);
    });
  };
  var handleBr = function (isRoot, element, direction) {
    return direction.traverse(element).orThunk(function () {
      return gatherer(element, direction.gather, isRoot);
    }).map(direction.relative);
  };
  var findBr = function (element, offset) {
    return $_s8scrkmjfuw8q7a.child(element, offset).filter(isBr).orThunk(function () {
      return $_s8scrkmjfuw8q7a.child(element, offset - 1).filter(isBr);
    });
  };
  var handleParent = function (isRoot, element, offset, direction) {
    return findBr(element, offset).bind(function (br) {
      return direction.traverse(br).fold(function () {
        return gatherer(br, direction.gather, isRoot).map(direction.relative);
      }, function (adjacent) {
        return $_cz3gbvpujfuw8r9c.indexInParent(adjacent).map(function (info) {
          return $_cuk0n0ovjfuw8r0r.on(info.parent(), info.index());
        });
      });
    });
  };
  var tryBr = function (isRoot, element, offset, direction) {
    var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
    return target.map(function (tgt) {
      return {
        start: $_20nfr6k7jfuw8q4g.constant(tgt),
        finish: $_20nfr6k7jfuw8q4g.constant(tgt)
      };
    });
  };
  var process = function (analysis) {
    return $_25fydhprjfuw8r89.cata(analysis, function (message) {
      return Option.none();
    }, function () {
      return Option.none();
    }, function (cell) {
      return Option.some($_1kct4uptjfuw8r98.point(cell, 0));
    }, function (cell) {
      return Option.some($_1kct4uptjfuw8r98.point(cell, $_6vfowrlmjfuw8qbz.getEnd(cell)));
    });
  };
  var $_62az2spsjfuw8r8p = {
    tryBr: tryBr,
    process: process
  };

  var MAX_RETRIES = 20;
  var platform$1 = $_fqgee0ktjfuw8q83.detect();
  var findSpot = function (bridge, isRoot, direction) {
    return bridge.getSelection().bind(function (sel) {
      return $_62az2spsjfuw8r8p.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
        return Option.some($_1kct4uptjfuw8r98.point(sel.finish(), sel.foffset()));
      }, function (brNeighbour) {
        var range = bridge.fromSitus(brNeighbour);
        var analysis = $_25fydhprjfuw8r89.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
        return $_62az2spsjfuw8r8p.process(analysis);
      });
    });
  };
  var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
    if (numRetries === 0)
      return Option.none();
    return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
      var range = bridge.fromSitus(situs);
      var analysis = $_25fydhprjfuw8r89.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
      return $_25fydhprjfuw8r89.cata(analysis, function () {
        return Option.none();
      }, function () {
        return Option.some(situs);
      }, function (cell) {
        if ($_e8rn66kojfuw8q7n.eq(element, cell) && offset === 0)
          return tryAgain(bridge, element, offset, $_37xezepjjfuw8r6q.moveUp, direction);
        else
          return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
      }, function (cell) {
        if ($_e8rn66kojfuw8q7n.eq(element, cell) && offset === $_6vfowrlmjfuw8qbz.getEnd(cell))
          return tryAgain(bridge, element, offset, $_37xezepjjfuw8r6q.moveDown, direction);
        else
          return scan(bridge, isRoot, cell, $_6vfowrlmjfuw8qbz.getEnd(cell), direction, numRetries - 1);
      });
    });
  };
  var tryAgain = function (bridge, element, offset, move, direction) {
    return $_8xl6tpkjfuw8r6u.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, move(box, $_efciv1pljfuw8r73.getJumpSize()));
    });
  };
  var tryAt = function (bridge, direction, box) {
    if (platform$1.browser.isChrome() || platform$1.browser.isSafari() || platform$1.browser.isFirefox() || platform$1.browser.isEdge())
      return direction.otherRetry(bridge, box);
    else if (platform$1.browser.isIE())
      return direction.ieRetry(bridge, box);
    else
      return Option.none();
  };
  var tryCursor = function (bridge, isRoot, element, offset, direction) {
    return $_8xl6tpkjfuw8r6u.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, box);
    });
  };
  var handle$2 = function (bridge, isRoot, direction) {
    return findSpot(bridge, isRoot, direction).bind(function (spot) {
      return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
    });
  };
  var $_fxzqelpijfuw8r6a = { handle: handle$2 };

  var any$1 = function (predicate) {
    return $_11ympzlbjfuw8q9n.first(predicate).isSome();
  };
  var ancestor$3 = function (scope, predicate, isRoot) {
    return $_11ympzlbjfuw8q9n.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$3 = function (scope, predicate, isRoot) {
    return $_11ympzlbjfuw8q9n.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$3 = function (scope, predicate) {
    return $_11ympzlbjfuw8q9n.sibling(scope, predicate).isSome();
  };
  var child$4 = function (scope, predicate) {
    return $_11ympzlbjfuw8q9n.child(scope, predicate).isSome();
  };
  var descendant$3 = function (scope, predicate) {
    return $_11ympzlbjfuw8q9n.descendant(scope, predicate).isSome();
  };
  var $_cs6t5xpvjfuw8r9l = {
    any: any$1,
    ancestor: ancestor$3,
    closest: closest$3,
    sibling: sibling$3,
    child: child$4,
    descendant: descendant$3
  };

  var detection = $_fqgee0ktjfuw8q83.detect();
  var inSameTable = function (elem, table) {
    return $_cs6t5xpvjfuw8r9l.ancestor(elem, function (e) {
      return $_s8scrkmjfuw8q7a.parent(e).exists(function (p) {
        return $_e8rn66kojfuw8q7n.eq(p, table);
      });
    });
  };
  var simulate = function (bridge, isRoot, direction, initial, anchor) {
    return $_8wdrbmlajfuw8q9m.closest(initial, 'td,th', isRoot).bind(function (start) {
      return $_8wdrbmlajfuw8q9m.closest(start, 'table', isRoot).bind(function (table) {
        if (!inSameTable(anchor, table))
          return Option.none();
        return $_fxzqelpijfuw8r6a.handle(bridge, isRoot, direction).bind(function (range) {
          return $_8wdrbmlajfuw8q9m.closest(range.finish(), 'td,th', isRoot).map(function (finish) {
            return {
              start: $_20nfr6k7jfuw8q4g.constant(start),
              finish: $_20nfr6k7jfuw8q4g.constant(finish),
              range: $_20nfr6k7jfuw8q4g.constant(range)
            };
          });
        });
      });
    });
  };
  var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
    if (detection.browser.isIE()) {
      return Option.none();
    } else {
      return precheck(initial, isRoot).orThunk(function () {
        return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
          var range = info.range();
          return $_b7ap4hpbjfuw8r3x.response(Option.some($_81eh29pejfuw8r4k.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
        });
      });
    }
  };
  var firstUpCheck = function (initial, isRoot) {
    return $_8wdrbmlajfuw8q9m.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_8wdrbmlajfuw8q9m.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_6c9d0hl7jfuw8q9d.descendants(table, 'tr');
        if ($_e8rn66kojfuw8q7n.eq(startRow, rows[0])) {
          return $_fgafb6pmjfuw8r7l.seekLeft(table, function (element) {
            return $_ejrzj4lljfuw8qbw.last(element).isSome();
          }, isRoot).map(function (last) {
            var lastOffset = $_6vfowrlmjfuw8qbz.getEnd(last);
            return $_b7ap4hpbjfuw8r3x.response(Option.some($_81eh29pejfuw8r4k.makeSitus(last, lastOffset, last, lastOffset)), true);
          });
        } else {
          return Option.none();
        }
      });
    });
  };
  var lastDownCheck = function (initial, isRoot) {
    return $_8wdrbmlajfuw8q9m.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_8wdrbmlajfuw8q9m.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_6c9d0hl7jfuw8q9d.descendants(table, 'tr');
        if ($_e8rn66kojfuw8q7n.eq(startRow, rows[rows.length - 1])) {
          return $_fgafb6pmjfuw8r7l.seekRight(table, function (element) {
            return $_ejrzj4lljfuw8qbw.first(element).isSome();
          }, isRoot).map(function (first) {
            return $_b7ap4hpbjfuw8r3x.response(Option.some($_81eh29pejfuw8r4k.makeSitus(first, 0, first, 0)), true);
          });
        } else {
          return Option.none();
        }
      });
    });
  };
  var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
    return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
      return $_7ulhzpgjfuw8r5b.detect(container, isRoot, info.start(), info.finish(), selectRange);
    });
  };
  var $_4f08xvphjfuw8r5l = {
    navigate: navigate,
    select: select,
    firstUpCheck: firstUpCheck,
    lastDownCheck: lastDownCheck
  };

  var findCell = function (target, isRoot) {
    return $_8wdrbmlajfuw8q9m.closest(target, 'td,th', isRoot);
  };
  function MouseSelection (bridge, container, isRoot, annotations) {
    var cursor = Option.none();
    var clearState = function () {
      cursor = Option.none();
    };
    var mousedown = function (event) {
      annotations.clear(container);
      cursor = findCell(event.target(), isRoot);
    };
    var mouseover = function (event) {
      cursor.each(function (start) {
        annotations.clear(container);
        findCell(event.target(), isRoot).each(function (finish) {
          $_dpd405ltjfuw8qd8.identify(start, finish, isRoot).each(function (cellSel) {
            var boxes = cellSel.boxes().getOr([]);
            if (boxes.length > 1 || boxes.length === 1 && !$_e8rn66kojfuw8q7n.eq(start, finish)) {
              annotations.selectRange(container, boxes, cellSel.start(), cellSel.finish());
              bridge.selectContents(finish);
            }
          });
        });
      });
    };
    var mouseup = function () {
      cursor.each(clearState);
    };
    return {
      mousedown: mousedown,
      mouseover: mouseover,
      mouseup: mouseup
    };
  }

  var $_9alrp8pxjfuw8r9w = {
    down: {
      traverse: $_s8scrkmjfuw8q7a.nextSibling,
      gather: $_fgafb6pmjfuw8r7l.after,
      relative: $_cuk0n0ovjfuw8r0r.before,
      otherRetry: $_efciv1pljfuw8r73.tryDown,
      ieRetry: $_efciv1pljfuw8r73.ieTryDown,
      failure: $_25fydhprjfuw8r89.adt.failedDown
    },
    up: {
      traverse: $_s8scrkmjfuw8q7a.prevSibling,
      gather: $_fgafb6pmjfuw8r7l.before,
      relative: $_cuk0n0ovjfuw8r0r.before,
      otherRetry: $_efciv1pljfuw8r73.tryUp,
      ieRetry: $_efciv1pljfuw8r73.ieTryUp,
      failure: $_25fydhprjfuw8r89.adt.failedUp
    }
  };

  var rc = $_5now9kbjfuw8q5e.immutable('rows', 'cols');
  var mouse = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var handlers = MouseSelection(bridge, container, isRoot, annotations);
    return {
      mousedown: handlers.mousedown,
      mouseover: handlers.mouseover,
      mouseup: handlers.mouseup
    };
  };
  var keyboard = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var clearToNavigate = function () {
      annotations.clear(container);
      return Option.none();
    };
    var keydown = function (event, start, soffset, finish, foffset, direction) {
      var keycode = event.raw().which;
      var shiftKey = event.raw().shiftKey === true;
      var handler = $_dpd405ltjfuw8qd8.retrieve(container, annotations.selectedSelector()).fold(function () {
        if ($_9n04otpcjfuw8r40.isDown(keycode) && shiftKey) {
          return $_20nfr6k7jfuw8q4g.curry($_4f08xvphjfuw8r5l.select, bridge, container, isRoot, $_9alrp8pxjfuw8r9w.down, finish, start, annotations.selectRange);
        } else if ($_9n04otpcjfuw8r40.isUp(keycode) && shiftKey) {
          return $_20nfr6k7jfuw8q4g.curry($_4f08xvphjfuw8r5l.select, bridge, container, isRoot, $_9alrp8pxjfuw8r9w.up, finish, start, annotations.selectRange);
        } else if ($_9n04otpcjfuw8r40.isDown(keycode)) {
          return $_20nfr6k7jfuw8q4g.curry($_4f08xvphjfuw8r5l.navigate, bridge, isRoot, $_9alrp8pxjfuw8r9w.down, finish, start, $_4f08xvphjfuw8r5l.lastDownCheck);
        } else if ($_9n04otpcjfuw8r40.isUp(keycode)) {
          return $_20nfr6k7jfuw8q4g.curry($_4f08xvphjfuw8r5l.navigate, bridge, isRoot, $_9alrp8pxjfuw8r9w.up, finish, start, $_4f08xvphjfuw8r5l.firstUpCheck);
        } else {
          return Option.none;
        }
      }, function (selected) {
        var update = function (attempts) {
          return function () {
            var navigation = $_cul8qomvjfuw8qm7.findMap(attempts, function (delta) {
              return $_7ulhzpgjfuw8r5b.update(delta.rows(), delta.cols(), container, selected, annotations);
            });
            return navigation.fold(function () {
              return $_dpd405ltjfuw8qd8.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                var relative = $_9n04otpcjfuw8r40.isDown(keycode) || direction.isForward(keycode) ? $_cuk0n0ovjfuw8r0r.after : $_cuk0n0ovjfuw8r0r.before;
                bridge.setRelativeSelection($_cuk0n0ovjfuw8r0r.on(edges.first(), 0), relative(edges.table()));
                annotations.clear(container);
                return $_b7ap4hpbjfuw8r3x.response(Option.none(), true);
              });
            }, function (_) {
              return Option.some($_b7ap4hpbjfuw8r3x.response(Option.none(), true));
            });
          };
        };
        if ($_9n04otpcjfuw8r40.isDown(keycode) && shiftKey)
          return update([rc(+1, 0)]);
        else if ($_9n04otpcjfuw8r40.isUp(keycode) && shiftKey)
          return update([rc(-1, 0)]);
        else if (direction.isBackward(keycode) && shiftKey)
          return update([
            rc(0, -1),
            rc(-1, 0)
          ]);
        else if (direction.isForward(keycode) && shiftKey)
          return update([
            rc(0, +1),
            rc(+1, 0)
          ]);
        else if ($_9n04otpcjfuw8r40.isNavigation(keycode) && shiftKey === false)
          return clearToNavigate;
        else
          return Option.none;
      });
      return handler();
    };
    var keyup = function (event, start, soffset, finish, foffset) {
      return $_dpd405ltjfuw8qd8.retrieve(container, annotations.selectedSelector()).fold(function () {
        var keycode = event.raw().which;
        var shiftKey = event.raw().shiftKey === true;
        if (shiftKey === false)
          return Option.none();
        if ($_9n04otpcjfuw8r40.isNavigation(keycode))
          return $_7ulhzpgjfuw8r5b.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
        else
          return Option.none();
      }, Option.none);
    };
    return {
      keydown: keydown,
      keyup: keyup
    };
  };
  var $_ev8thhpajfuw8r3k = {
    mouse: mouse,
    keyboard: keyboard
  };

  var add$3 = function (element, classes) {
    $_tyr3yk5jfuw8q47.each(classes, function (x) {
      $_fmcseon6jfuw8qou.add(element, x);
    });
  };
  var remove$7 = function (element, classes) {
    $_tyr3yk5jfuw8q47.each(classes, function (x) {
      $_fmcseon6jfuw8qou.remove(element, x);
    });
  };
  var toggle$2 = function (element, classes) {
    $_tyr3yk5jfuw8q47.each(classes, function (x) {
      $_fmcseon6jfuw8qou.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_tyr3yk5jfuw8q47.forall(classes, function (clazz) {
      return $_fmcseon6jfuw8qou.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_tyr3yk5jfuw8q47.exists(classes, function (clazz) {
      return $_fmcseon6jfuw8qou.has(element, clazz);
    });
  };
  var getNative = function (element) {
    var classList = element.dom().classList;
    var r = new Array(classList.length);
    for (var i = 0; i < classList.length; i++) {
      r[i] = classList.item(i);
    }
    return r;
  };
  var get$11 = function (element) {
    return $_f4rpvun8jfuw8qox.supports(element) ? getNative(element) : $_f4rpvun8jfuw8qox.get(element);
  };
  var $_6cu9bpq0jfuw8ram = {
    add: add$3,
    remove: remove$7,
    toggle: toggle$2,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$11
  };

  var addClass = function (clazz) {
    return function (element) {
      $_fmcseon6jfuw8qou.add(element, clazz);
    };
  };
  var removeClass = function (clazz) {
    return function (element) {
      $_fmcseon6jfuw8qou.remove(element, clazz);
    };
  };
  var removeClasses = function (classes) {
    return function (element) {
      $_6cu9bpq0jfuw8ram.remove(element, classes);
    };
  };
  var hasClass = function (clazz) {
    return function (element) {
      return $_fmcseon6jfuw8qou.has(element, clazz);
    };
  };
  var $_5za372pzjfuw8rak = {
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    hasClass: hasClass
  };

  var byClass = function (ephemera) {
    var addSelectionClass = $_5za372pzjfuw8rak.addClass(ephemera.selected());
    var removeSelectionClasses = $_5za372pzjfuw8rak.removeClasses([
      ephemera.selected(),
      ephemera.lastSelected(),
      ephemera.firstSelected()
    ]);
    var clear = function (container) {
      var sels = $_6c9d0hl7jfuw8q9d.descendants(container, ephemera.selectedSelector());
      $_tyr3yk5jfuw8q47.each(sels, removeSelectionClasses);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_tyr3yk5jfuw8q47.each(cells, addSelectionClass);
      $_fmcseon6jfuw8qou.add(start, ephemera.firstSelected());
      $_fmcseon6jfuw8qou.add(finish, ephemera.lastSelected());
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var byAttr = function (ephemera) {
    var removeSelectionAttributes = function (element) {
      $_3q82t2l5jfuw8q93.remove(element, ephemera.selected());
      $_3q82t2l5jfuw8q93.remove(element, ephemera.firstSelected());
      $_3q82t2l5jfuw8q93.remove(element, ephemera.lastSelected());
    };
    var addSelectionAttribute = function (element) {
      $_3q82t2l5jfuw8q93.set(element, ephemera.selected(), '1');
    };
    var clear = function (container) {
      var sels = $_6c9d0hl7jfuw8q9d.descendants(container, ephemera.selectedSelector());
      $_tyr3yk5jfuw8q47.each(sels, removeSelectionAttributes);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_tyr3yk5jfuw8q47.each(cells, addSelectionAttribute);
      $_3q82t2l5jfuw8q93.set(start, ephemera.firstSelected(), '1');
      $_3q82t2l5jfuw8q93.set(finish, ephemera.lastSelected(), '1');
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var $_21uhbjpyjfuw8ra4 = {
    byClass: byClass,
    byAttr: byAttr
  };

  function CellSelection$1 (editor, lazyResize) {
    var handlerStruct = $_5now9kbjfuw8q5e.immutableBag([
      'mousedown',
      'mouseover',
      'mouseup',
      'keyup',
      'keydown'
    ], []);
    var handlers = Option.none();
    var annotations = $_21uhbjpyjfuw8ra4.byAttr($_f8tr2nm5jfuw8qgp);
    editor.on('init', function (e) {
      var win = editor.getWin();
      var body = $_5xkhf2nnjfuw8qrq.getBody(editor);
      var isRoot = $_5xkhf2nnjfuw8qrq.getIsRoot(editor);
      var syncSelection = function () {
        var sel = editor.selection;
        var start = $_xbeoqkkjfuw8q73.fromDom(sel.getStart());
        var end = $_xbeoqkkjfuw8q73.fromDom(sel.getEnd());
        var startTable = $_aqhz9okhjfuw8q5y.table(start);
        var endTable = $_aqhz9okhjfuw8q5y.table(end);
        var sameTable = startTable.bind(function (tableStart) {
          return endTable.bind(function (tableEnd) {
            return $_e8rn66kojfuw8q7n.eq(tableStart, tableEnd) ? Option.some(true) : Option.none();
          });
        });
        sameTable.fold(function () {
          annotations.clear(body);
        }, $_20nfr6k7jfuw8q4g.noop);
      };
      var mouseHandlers = $_ev8thhpajfuw8r3k.mouse(win, body, isRoot, annotations);
      var keyHandlers = $_ev8thhpajfuw8r3k.keyboard(win, body, isRoot, annotations);
      var hasShiftKey = function (event) {
        return event.raw().shiftKey === true;
      };
      var handleResponse = function (event, response) {
        if (!hasShiftKey(event)) {
          return;
        }
        if (response.kill()) {
          event.kill();
        }
        response.selection().each(function (ns) {
          var relative = $_bv1jwpoujfuw8r0m.relative(ns.start(), ns.finish());
          var rng = $_c9xxrpp0jfuw8r1k.asLtrRange(win, relative);
          editor.selection.setRng(rng);
        });
      };
      var keyup = function (event) {
        var wrappedEvent = wrapEvent(event);
        if (wrappedEvent.raw().shiftKey && $_9n04otpcjfuw8r40.isNavigation(wrappedEvent.raw().which)) {
          var rng = editor.selection.getRng();
          var start = $_xbeoqkkjfuw8q73.fromDom(rng.startContainer);
          var end = $_xbeoqkkjfuw8q73.fromDom(rng.endContainer);
          keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
        }
      };
      var keydown = function (event) {
        var wrappedEvent = wrapEvent(event);
        lazyResize().each(function (resize) {
          resize.hideBars();
        });
        var rng = editor.selection.getRng();
        var startContainer = $_xbeoqkkjfuw8q73.fromDom(editor.selection.getStart());
        var start = $_xbeoqkkjfuw8q73.fromDom(rng.startContainer);
        var end = $_xbeoqkkjfuw8q73.fromDom(rng.endContainer);
        var direction = $_4xd1udnojfuw8qrw.directionAt(startContainer).isRtl() ? $_9n04otpcjfuw8r40.rtl : $_9n04otpcjfuw8r40.ltr;
        keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
          handleResponse(wrappedEvent, response);
        });
        lazyResize().each(function (resize) {
          resize.showBars();
        });
      };
      var isMouseEvent = function (event) {
        return event.hasOwnProperty('x') && event.hasOwnProperty('y');
      };
      var wrapEvent = function (event) {
        var target = $_xbeoqkkjfuw8q73.fromDom(event.target);
        var stop = function () {
          event.stopPropagation();
        };
        var prevent = function () {
          event.preventDefault();
        };
        var kill = $_20nfr6k7jfuw8q4g.compose(prevent, stop);
        return {
          target: $_20nfr6k7jfuw8q4g.constant(target),
          x: $_20nfr6k7jfuw8q4g.constant(isMouseEvent(event) ? event.x : null),
          y: $_20nfr6k7jfuw8q4g.constant(isMouseEvent(event) ? event.y : null),
          stop: stop,
          prevent: prevent,
          kill: kill,
          raw: $_20nfr6k7jfuw8q4g.constant(event)
        };
      };
      var isLeftMouse = function (raw) {
        return raw.button === 0;
      };
      var isLeftButtonPressed = function (raw) {
        if (raw.buttons === undefined) {
          return true;
        }
        return (raw.buttons & 1) !== 0;
      };
      var mouseDown = function (e) {
        if (isLeftMouse(e)) {
          mouseHandlers.mousedown(wrapEvent(e));
        }
      };
      var mouseOver = function (e) {
        if (isLeftButtonPressed(e)) {
          mouseHandlers.mouseover(wrapEvent(e));
        }
      };
      var mouseUp = function (e) {
        if (isLeftMouse(e)) {
          mouseHandlers.mouseup(wrapEvent(e));
        }
      };
      editor.on('mousedown', mouseDown);
      editor.on('mouseover', mouseOver);
      editor.on('mouseup', mouseUp);
      editor.on('keyup', keyup);
      editor.on('keydown', keydown);
      editor.on('nodechange', syncSelection);
      handlers = Option.some(handlerStruct({
        mousedown: mouseDown,
        mouseover: mouseOver,
        mouseup: mouseUp,
        keyup: keyup,
        keydown: keydown
      }));
    });
    var destroy = function () {
      handlers.each(function (handlers) {
      });
    };
    return {
      clear: annotations.clear,
      destroy: destroy
    };
  }

  var Selections = function (editor) {
    var get = function () {
      var body = $_5xkhf2nnjfuw8qrq.getBody(editor);
      return $_1mynollsjfuw8qcy.retrieve(body, $_f8tr2nm5jfuw8qgp.selectedSelector()).fold(function () {
        if (editor.selection.getStart() === undefined) {
          return $_cx0pwam6jfuw8qgr.none();
        } else {
          return $_cx0pwam6jfuw8qgr.single(editor.selection);
        }
      }, function (cells) {
        return $_cx0pwam6jfuw8qgr.multiple(cells);
      });
    };
    return { get: get };
  };

  var each$4 = global$2.each;
  var addButtons = function (editor) {
    var menuItems = [];
    each$4('inserttable tableprops deletetable | cell row column'.split(' '), function (name) {
      if (name === '|') {
        menuItems.push({ text: '-' });
      } else {
        menuItems.push(editor.menuItems[name]);
      }
    });
    editor.addButton('table', {
      type: 'menubutton',
      title: 'Table',
      menu: menuItems
    });
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    editor.addButton('tableprops', {
      title: 'Table properties',
      onclick: $_20nfr6k7jfuw8q4g.curry($_ad8brjnzjfuw8qtm.open, editor, true),
      icon: 'table'
    });
    editor.addButton('tabledelete', {
      title: 'Delete table',
      onclick: cmd('mceTableDelete')
    });
    editor.addButton('tablecellprops', {
      title: 'Cell properties',
      onclick: cmd('mceTableCellProps')
    });
    editor.addButton('tablemergecells', {
      title: 'Merge cells',
      onclick: cmd('mceTableMergeCells')
    });
    editor.addButton('tablesplitcells', {
      title: 'Split cell',
      onclick: cmd('mceTableSplitCells')
    });
    editor.addButton('tableinsertrowbefore', {
      title: 'Insert row before',
      onclick: cmd('mceTableInsertRowBefore')
    });
    editor.addButton('tableinsertrowafter', {
      title: 'Insert row after',
      onclick: cmd('mceTableInsertRowAfter')
    });
    editor.addButton('tabledeleterow', {
      title: 'Delete row',
      onclick: cmd('mceTableDeleteRow')
    });
    editor.addButton('tablerowprops', {
      title: 'Row properties',
      onclick: cmd('mceTableRowProps')
    });
    editor.addButton('tablecutrow', {
      title: 'Cut row',
      onclick: cmd('mceTableCutRow')
    });
    editor.addButton('tablecopyrow', {
      title: 'Copy row',
      onclick: cmd('mceTableCopyRow')
    });
    editor.addButton('tablepasterowbefore', {
      title: 'Paste row before',
      onclick: cmd('mceTablePasteRowBefore')
    });
    editor.addButton('tablepasterowafter', {
      title: 'Paste row after',
      onclick: cmd('mceTablePasteRowAfter')
    });
    editor.addButton('tableinsertcolbefore', {
      title: 'Insert column before',
      onclick: cmd('mceTableInsertColBefore')
    });
    editor.addButton('tableinsertcolafter', {
      title: 'Insert column after',
      onclick: cmd('mceTableInsertColAfter')
    });
    editor.addButton('tabledeletecol', {
      title: 'Delete column',
      onclick: cmd('mceTableDeleteCol')
    });
  };
  var addToolbars = function (editor) {
    var isTable = function (table) {
      var selectorMatched = editor.dom.is(table, 'table') && editor.getBody().contains(table);
      return selectorMatched;
    };
    var toolbar = getToolbar(editor);
    if (toolbar.length > 0) {
      editor.addContextToolbar(isTable, toolbar.join(' '));
    }
  };
  var $_ga9kj7q2jfuw8rau = {
    addButtons: addButtons,
    addToolbars: addToolbars
  };

  var addMenuItems = function (editor, selections) {
    var targets = Option.none();
    var tableCtrls = [];
    var cellCtrls = [];
    var mergeCtrls = [];
    var unmergeCtrls = [];
    var noTargetDisable = function (ctrl) {
      ctrl.disabled(true);
    };
    var ctrlEnable = function (ctrl) {
      ctrl.disabled(false);
    };
    var pushTable = function () {
      var self = this;
      tableCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushCell = function () {
      var self = this;
      cellCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushMerge = function () {
      var self = this;
      mergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.mergable().isNone());
      });
    };
    var pushUnmerge = function () {
      var self = this;
      unmergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.unmergable().isNone());
      });
    };
    var setDisabledCtrls = function () {
      targets.fold(function () {
        $_tyr3yk5jfuw8q47.each(tableCtrls, noTargetDisable);
        $_tyr3yk5jfuw8q47.each(cellCtrls, noTargetDisable);
        $_tyr3yk5jfuw8q47.each(mergeCtrls, noTargetDisable);
        $_tyr3yk5jfuw8q47.each(unmergeCtrls, noTargetDisable);
      }, function (targets) {
        $_tyr3yk5jfuw8q47.each(tableCtrls, ctrlEnable);
        $_tyr3yk5jfuw8q47.each(cellCtrls, ctrlEnable);
        $_tyr3yk5jfuw8q47.each(mergeCtrls, function (mergeCtrl) {
          mergeCtrl.disabled(targets.mergable().isNone());
        });
        $_tyr3yk5jfuw8q47.each(unmergeCtrls, function (unmergeCtrl) {
          unmergeCtrl.disabled(targets.unmergable().isNone());
        });
      });
    };
    editor.on('init', function () {
      editor.on('nodechange', function (e) {
        var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        targets = cellOpt.bind(function (cellDom) {
          var cell = $_xbeoqkkjfuw8q73.fromDom(cellDom);
          var table = $_aqhz9okhjfuw8q5y.table(cell);
          return table.map(function (table) {
            return $_5b7h1hlqjfuw8qci.forMenu(selections, table, cell);
          });
        });
        setDisabledCtrls();
      });
    });
    var generateTableGrid = function () {
      var html = '';
      html = '<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';
      for (var y = 0; y < 10; y++) {
        html += '<tr>';
        for (var x = 0; x < 10; x++) {
          html += '<td role="gridcell" tabindex="-1"><a id="mcegrid' + (y * 10 + x) + '" href="#" ' + 'data-mce-x="' + x + '" data-mce-y="' + y + '"></a></td>';
        }
        html += '</tr>';
      }
      html += '</table>';
      html += '<div class="mce-text-center" role="presentation">1 x 1</div>';
      return html;
    };
    var selectGrid = function (editor, tx, ty, control) {
      var table = control.getEl().getElementsByTagName('table')[0];
      var x, y, focusCell, cell, active;
      var rtl = control.isRtl() || control.parent().rel === 'tl-tr';
      table.nextSibling.innerHTML = tx + 1 + ' x ' + (ty + 1);
      if (rtl) {
        tx = 9 - tx;
      }
      for (y = 0; y < 10; y++) {
        for (x = 0; x < 10; x++) {
          cell = table.rows[y].childNodes[x].firstChild;
          active = (rtl ? x >= tx : x <= tx) && y <= ty;
          editor.dom.toggleClass(cell, 'mce-active', active);
          if (active) {
            focusCell = cell;
          }
        }
      }
      return focusCell.parentNode;
    };
    var insertTable = hasTableGrid(editor) === false ? {
      text: 'Table',
      icon: 'table',
      context: 'table',
      onclick: $_20nfr6k7jfuw8q4g.curry($_ad8brjnzjfuw8qtm.open, editor)
    } : {
      text: 'Table',
      icon: 'table',
      context: 'table',
      ariaHideMenu: true,
      onclick: function (e) {
        if (e.aria) {
          this.parent().hideAll();
          e.stopImmediatePropagation();
          $_ad8brjnzjfuw8qtm.open(editor);
        }
      },
      onshow: function () {
        selectGrid(editor, 0, 0, this.menu.items()[0]);
      },
      onhide: function () {
        var elements = this.menu.items()[0].getEl().getElementsByTagName('a');
        editor.dom.removeClass(elements, 'mce-active');
        editor.dom.addClass(elements[0], 'mce-active');
      },
      menu: [{
          type: 'container',
          html: generateTableGrid(),
          onPostRender: function () {
            this.lastX = this.lastY = 0;
          },
          onmousemove: function (e) {
            var target = e.target;
            var x, y;
            if (target.tagName.toUpperCase() === 'A') {
              x = parseInt(target.getAttribute('data-mce-x'), 10);
              y = parseInt(target.getAttribute('data-mce-y'), 10);
              if (this.isRtl() || this.parent().rel === 'tl-tr') {
                x = 9 - x;
              }
              if (x !== this.lastX || y !== this.lastY) {
                selectGrid(editor, x, y, e.control);
                this.lastX = x;
                this.lastY = y;
              }
            }
          },
          onclick: function (e) {
            var self = this;
            if (e.target.tagName.toUpperCase() === 'A') {
              e.preventDefault();
              e.stopPropagation();
              self.parent().cancel();
              editor.undoManager.transact(function () {
                $_1mq3b3o1jfuw8qtu.insert(editor, self.lastX + 1, self.lastY + 1);
              });
              editor.addVisual();
            }
          }
        }]
    };
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    var tableProperties = {
      text: 'Table properties',
      context: 'table',
      onPostRender: pushTable,
      onclick: $_20nfr6k7jfuw8q4g.curry($_ad8brjnzjfuw8qtm.open, editor, true)
    };
    var deleteTable = {
      text: 'Delete table',
      context: 'table',
      onPostRender: pushTable,
      cmd: 'mceTableDelete'
    };
    var row = {
      text: 'Row',
      context: 'table',
      menu: [
        {
          text: 'Insert row before',
          onclick: cmd('mceTableInsertRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert row after',
          onclick: cmd('mceTableInsertRowAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete row',
          onclick: cmd('mceTableDeleteRow'),
          onPostRender: pushCell
        },
        {
          text: 'Row properties',
          onclick: cmd('mceTableRowProps'),
          onPostRender: pushCell
        },
        { text: '-' },
        {
          text: 'Cut row',
          onclick: cmd('mceTableCutRow'),
          onPostRender: pushCell
        },
        {
          text: 'Copy row',
          onclick: cmd('mceTableCopyRow'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row before',
          onclick: cmd('mceTablePasteRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row after',
          onclick: cmd('mceTablePasteRowAfter'),
          onPostRender: pushCell
        }
      ]
    };
    var column = {
      text: 'Column',
      context: 'table',
      menu: [
        {
          text: 'Insert column before',
          onclick: cmd('mceTableInsertColBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert column after',
          onclick: cmd('mceTableInsertColAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete column',
          onclick: cmd('mceTableDeleteCol'),
          onPostRender: pushCell
        }
      ]
    };
    var cell = {
      separator: 'before',
      text: 'Cell',
      context: 'table',
      menu: [
        {
          text: 'Cell properties',
          onclick: cmd('mceTableCellProps'),
          onPostRender: pushCell
        },
        {
          text: 'Merge cells',
          onclick: cmd('mceTableMergeCells'),
          onPostRender: pushMerge
        },
        {
          text: 'Split cell',
          onclick: cmd('mceTableSplitCells'),
          onPostRender: pushUnmerge
        }
      ]
    };
    editor.addMenuItem('inserttable', insertTable);
    editor.addMenuItem('tableprops', tableProperties);
    editor.addMenuItem('deletetable', deleteTable);
    editor.addMenuItem('row', row);
    editor.addMenuItem('column', column);
    editor.addMenuItem('cell', cell);
  };
  var $_e80bn7q3jfuw8raz = { addMenuItems: addMenuItems };

  var getClipboardRows = function (clipboardRows) {
    return clipboardRows.get().fold(function () {
      return;
    }, function (rows) {
      return $_tyr3yk5jfuw8q47.map(rows, function (row) {
        return row.dom();
      });
    });
  };
  var setClipboardRows = function (rows, clipboardRows) {
    var sugarRows = $_tyr3yk5jfuw8q47.map(rows, $_xbeoqkkjfuw8q73.fromDom);
    clipboardRows.set(Option.from(sugarRows));
  };
  var getApi = function (editor, clipboardRows) {
    return {
      insertTable: function (columns, rows) {
        return $_1mq3b3o1jfuw8qtu.insert(editor, columns, rows);
      },
      setClipboardRows: function (rows) {
        return setClipboardRows(rows, clipboardRows);
      },
      getClipboardRows: function () {
        return getClipboardRows(clipboardRows);
      }
    };
  };

  function Plugin(editor) {
    var resizeHandler = ResizeHandler(editor);
    var cellSelection = CellSelection$1(editor, resizeHandler.lazyResize);
    var actions = TableActions(editor, resizeHandler.lazyWire);
    var selections = Selections(editor);
    var clipboardRows = Cell(Option.none());
    $_srry6nsjfuw8qs8.registerCommands(editor, actions, cellSelection, selections, clipboardRows);
    $_3y1hv8k4jfuw8q3l.registerEvents(editor, selections, actions, cellSelection);
    $_e80bn7q3jfuw8raz.addMenuItems(editor, selections);
    $_ga9kj7q2jfuw8rau.addButtons(editor);
    $_ga9kj7q2jfuw8rau.addToolbars(editor);
    editor.on('PreInit', function () {
      editor.serializer.addTempAttr($_f8tr2nm5jfuw8qgp.firstSelected());
      editor.serializer.addTempAttr($_f8tr2nm5jfuw8qgp.lastSelected());
    });
    if (hasTabNavigation(editor)) {
      editor.on('keydown', function (e) {
        $_djb8ceorjfuw8qzt.handle(e, editor, actions, resizeHandler.lazyWire);
      });
    }
    editor.on('remove', function () {
      resizeHandler.destroy();
      cellSelection.destroy();
    });
    return getApi(editor, clipboardRows);
  }
  global.add('table', Plugin);
  function Plugin$1 () {
  }

  return Plugin$1;

}());
})();
