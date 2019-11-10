(function () {
var table = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var noop = function () {
  };
  var noarg = function (f) {
    return function () {
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
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
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
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
  var $_e1ub5rjijd09ex0p = {
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

  var never$1 = $_e1ub5rjijd09ex0p.never;
  var always$1 = $_e1ub5rjijd09ex0p.always;
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
      toString: $_e1ub5rjijd09ex0p.constant('none()')
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
  var $_dmlx9ujhjd09ex0f = {
    some: some,
    none: none,
    from: from
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
    return r === -1 ? $_dmlx9ujhjd09ex0f.none() : $_dmlx9ujhjd09ex0f.some(r);
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
        return $_dmlx9ujhjd09ex0f.some(x);
      }
    }
    return $_dmlx9ujhjd09ex0f.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_dmlx9ujhjd09ex0f.some(i);
      }
    }
    return $_dmlx9ujhjd09ex0f.none();
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
    return xs.length === 0 ? $_dmlx9ujhjd09ex0f.none() : $_dmlx9ujhjd09ex0f.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_dmlx9ujhjd09ex0f.none() : $_dmlx9ujhjd09ex0f.some(xs[xs.length - 1]);
  };
  var $_51vcxojgjd09ex09 = {
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
    last: last
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
        return $_dmlx9ujhjd09ex0f.some(x);
      }
    }
    return $_dmlx9ujhjd09ex0f.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_3bxkuvjkjd09ex15 = {
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
    var fields = arguments;
    return function () {
      var values = new Array(arguments.length);
      for (var i = 0; i < values.length; i++)
        values[i] = arguments[i];
      if (fields.length !== values.length)
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      var struct = {};
      $_51vcxojgjd09ex09.each(fields, function (name, i) {
        struct[name] = $_e1ub5rjijd09ex0p.constant(values[i]);
      });
      return struct;
    };
  }

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
  var $_byo4m9jpjd09ex1f = {
    isString: isType('string'),
    isObject: isType('object'),
    isArray: isType('array'),
    isNull: isType('null'),
    isBoolean: isType('boolean'),
    isUndefined: isType('undefined'),
    isFunction: isType('function'),
    isNumber: isType('number')
  };

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
    if (!$_byo4m9jpjd09ex1f.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_51vcxojgjd09ex09.each(array, function (a) {
      if (!$_byo4m9jpjd09ex1f.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_51vcxojgjd09ex09.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_a2xgc9jojd09ex1d = {
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
    $_a2xgc9jojd09ex1d.validateStrArr('required', required);
    $_a2xgc9jojd09ex1d.validateStrArr('optional', optional);
    $_a2xgc9jojd09ex1d.checkDupes(everything);
    return function (obj) {
      var keys = $_3bxkuvjkjd09ex15.keys(obj);
      var allReqd = $_51vcxojgjd09ex09.forall(required, function (req) {
        return $_51vcxojgjd09ex09.contains(keys, req);
      });
      if (!allReqd)
        $_a2xgc9jojd09ex1d.reqMessage(required, keys);
      var unsupported = $_51vcxojgjd09ex09.filter(keys, function (key) {
        return !$_51vcxojgjd09ex09.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_a2xgc9jojd09ex1d.unsuppMessage(unsupported);
      var r = {};
      $_51vcxojgjd09ex09.each(required, function (req) {
        r[req] = $_e1ub5rjijd09ex0p.constant(obj[req]);
      });
      $_51vcxojgjd09ex09.each(optional, function (opt) {
        r[opt] = $_e1ub5rjijd09ex0p.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_dmlx9ujhjd09ex0f.some(obj[opt]) : $_dmlx9ujhjd09ex0f.none());
      });
      return r;
    };
  }

  var $_6c8np0jljd09ex18 = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var dimensions = $_6c8np0jljd09ex18.immutable('width', 'height');
  var grid = $_6c8np0jljd09ex18.immutable('rows', 'columns');
  var address = $_6c8np0jljd09ex18.immutable('row', 'column');
  var coords = $_6c8np0jljd09ex18.immutable('x', 'y');
  var detail = $_6c8np0jljd09ex18.immutable('element', 'rowspan', 'colspan');
  var detailnew = $_6c8np0jljd09ex18.immutable('element', 'rowspan', 'colspan', 'isNew');
  var extended = $_6c8np0jljd09ex18.immutable('element', 'rowspan', 'colspan', 'row', 'column');
  var rowdata = $_6c8np0jljd09ex18.immutable('element', 'cells', 'section');
  var elementnew = $_6c8np0jljd09ex18.immutable('element', 'isNew');
  var rowdatanew = $_6c8np0jljd09ex18.immutable('element', 'cells', 'section', 'isNew');
  var rowcells = $_6c8np0jljd09ex18.immutable('cells', 'section');
  var rowdetails = $_6c8np0jljd09ex18.immutable('details', 'section');
  var bounds = $_6c8np0jljd09ex18.immutable('startRow', 'startCol', 'finishRow', 'finishCol');
  var $_1hu5nejrjd09ex1m = {
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
    return { dom: $_e1ub5rjijd09ex0p.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_dmlx9ujhjd09ex0f.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_f1ygtcjvjd09ex2h = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_92cb9ajwjd09ex2k = {
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

  var ELEMENT = $_92cb9ajwjd09ex2k.ELEMENT;
  var DOCUMENT = $_92cb9ajwjd09ex2k.DOCUMENT;
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
    return bypassSelector(base) ? [] : $_51vcxojgjd09ex09.map(base.querySelectorAll(selector), $_f1ygtcjvjd09ex2h.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? $_dmlx9ujhjd09ex0f.none() : $_dmlx9ujhjd09ex0f.from(base.querySelector(selector)).map($_f1ygtcjvjd09ex2h.fromDom);
  };
  var $_7pd8kyjujd09ex27 = {
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
  var $_2u01nkjyjd09ex31 = { toArray: toArray };

  var global = typeof window !== 'undefined' ? window : Function('return this;')();

  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : global;
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
    var o = target !== undefined ? target : global;
    for (var i = 0; i < parts.length; ++i)
      o = step(o, parts[i]);
    return o;
  };
  var namespace = function (name, target) {
    var parts = name.split('.');
    return forge(parts, target);
  };
  var $_aagql1k2jd09ex3c = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_aagql1k2jd09ex3c.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_fop8q1k1jd09ex3a = { getOrDie: getOrDie };

  var node = function () {
    var f = $_fop8q1k1jd09ex3a.getOrDie('Node');
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
  var $_3n2mu5k0jd09ex39 = {
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
  var $_800s80k5jd09ex3g = { cached: cached };

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
  var $_ei11fkk8jd09ex3l = {
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
      version: $_ei11fkk8jd09ex3l.unknown()
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
  var $_eat4ack7jd09ex3j = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_e1ub5rjijd09ex0p.constant(edge),
    chrome: $_e1ub5rjijd09ex0p.constant(chrome),
    ie: $_e1ub5rjijd09ex0p.constant(ie),
    opera: $_e1ub5rjijd09ex0p.constant(opera),
    firefox: $_e1ub5rjijd09ex0p.constant(firefox),
    safari: $_e1ub5rjijd09ex0p.constant(safari)
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
      version: $_ei11fkk8jd09ex3l.unknown()
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
  var $_9aggbxk9jd09ex3n = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_e1ub5rjijd09ex0p.constant(windows),
    ios: $_e1ub5rjijd09ex0p.constant(ios),
    android: $_e1ub5rjijd09ex0p.constant(android),
    linux: $_e1ub5rjijd09ex0p.constant(linux),
    osx: $_e1ub5rjijd09ex0p.constant(osx),
    solaris: $_e1ub5rjijd09ex0p.constant(solaris),
    freebsd: $_e1ub5rjijd09ex0p.constant(freebsd)
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
      isiPad: $_e1ub5rjijd09ex0p.constant(isiPad),
      isiPhone: $_e1ub5rjijd09ex0p.constant(isiPhone),
      isTablet: $_e1ub5rjijd09ex0p.constant(isTablet),
      isPhone: $_e1ub5rjijd09ex0p.constant(isPhone),
      isTouch: $_e1ub5rjijd09ex0p.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_e1ub5rjijd09ex0p.constant(iOSwebview)
    };
  }

  var detect$1 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_51vcxojgjd09ex09.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_ei11fkk8jd09ex3l.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_ei11fkk8jd09ex3l.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_5mq2dzkbjd09ex3s = {
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
  var $_6n0a17kejd09ex42 = {
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
    return str === '' ? $_dmlx9ujhjd09ex0f.none() : $_dmlx9ujhjd09ex0f.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? $_dmlx9ujhjd09ex0f.none() : $_dmlx9ujhjd09ex0f.some(str.substring(1));
  };
  var $_drek1dkfjd09ex43 = {
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
    return startsWith(str, prefix) ? $_6n0a17kejd09ex42.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_6n0a17kejd09ex42.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_6n0a17kejd09ex42.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_6n0a17kejd09ex42.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_drek1dkfjd09ex43.head(str).bind(function (head) {
      return $_drek1dkfjd09ex43.tail(str).map(function (tail) {
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
  var $_bfonkwkdjd09ex3z = {
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
      return $_bfonkwkdjd09ex3z.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_bfonkwkdjd09ex3z.contains(uastring, 'edge/') && $_bfonkwkdjd09ex3z.contains(uastring, 'chrome') && $_bfonkwkdjd09ex3z.contains(uastring, 'safari') && $_bfonkwkdjd09ex3z.contains(uastring, 'applewebkit');
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
        return $_bfonkwkdjd09ex3z.contains(uastring, 'chrome') && !$_bfonkwkdjd09ex3z.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_bfonkwkdjd09ex3z.contains(uastring, 'msie') || $_bfonkwkdjd09ex3z.contains(uastring, 'trident');
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
        return ($_bfonkwkdjd09ex3z.contains(uastring, 'safari') || $_bfonkwkdjd09ex3z.contains(uastring, 'mobile/')) && $_bfonkwkdjd09ex3z.contains(uastring, 'applewebkit');
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
        return $_bfonkwkdjd09ex3z.contains(uastring, 'iphone') || $_bfonkwkdjd09ex3z.contains(uastring, 'ipad');
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
  var $_5ybev9kcjd09ex3v = {
    browsers: $_e1ub5rjijd09ex0p.constant(browsers),
    oses: $_e1ub5rjijd09ex0p.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_5ybev9kcjd09ex3v.browsers();
    var oses = $_5ybev9kcjd09ex3v.oses();
    var browser = $_5mq2dzkbjd09ex3s.detectBrowser(browsers, userAgent).fold($_eat4ack7jd09ex3j.unknown, $_eat4ack7jd09ex3j.nu);
    var os = $_5mq2dzkbjd09ex3s.detectOs(oses, userAgent).fold($_9aggbxk9jd09ex3n.unknown, $_9aggbxk9jd09ex3n.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_dultilk6jd09ex3h = { detect: detect$2 };

  var detect$3 = $_800s80k5jd09ex3g.cached(function () {
    var userAgent = navigator.userAgent;
    return $_dultilk6jd09ex3h.detect(userAgent);
  });
  var $_3qhsx8k4jd09ex3f = { detect: detect$3 };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_51vcxojgjd09ex09.exists(elements, $_e1ub5rjijd09ex0p.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_3n2mu5k0jd09ex39.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_3qhsx8k4jd09ex3f.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_a4998rjzjd09ex33 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_7pd8kyjujd09ex27.is
  };

  var owner = function (element) {
    return $_f1ygtcjvjd09ex2h.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_f1ygtcjvjd09ex2h.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_f1ygtcjvjd09ex2h.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return $_dmlx9ujhjd09ex0f.from(dom.parentNode).map($_f1ygtcjvjd09ex2h.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_51vcxojgjd09ex09.findIndex(kin, function (elem) {
        return $_a4998rjzjd09ex33.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_byo4m9jpjd09ex1f.isFunction(isRoot) ? isRoot : $_e1ub5rjijd09ex0p.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_f1ygtcjvjd09ex2h.fromDom(rawParent);
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
      return $_51vcxojgjd09ex09.filter(elements, function (x) {
        return !$_a4998rjzjd09ex33.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return $_dmlx9ujhjd09ex0f.from(dom.offsetParent).map($_f1ygtcjvjd09ex2h.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return $_dmlx9ujhjd09ex0f.from(dom.previousSibling).map($_f1ygtcjvjd09ex2h.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return $_dmlx9ujhjd09ex0f.from(dom.nextSibling).map($_f1ygtcjvjd09ex2h.fromDom);
  };
  var prevSiblings = function (element) {
    return $_51vcxojgjd09ex09.reverse($_2u01nkjyjd09ex31.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_2u01nkjyjd09ex31.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_51vcxojgjd09ex09.map(dom.childNodes, $_f1ygtcjvjd09ex2h.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return $_dmlx9ujhjd09ex0f.from(children[index]).map($_f1ygtcjvjd09ex2h.fromDom);
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
  var spot = $_6c8np0jljd09ex18.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_cunhv4jxjd09ex2m = {
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
    return filterFirstLayer(scope, selector, $_e1ub5rjijd09ex0p.constant(true));
  };
  var filterFirstLayer = function (scope, selector, predicate) {
    return $_51vcxojgjd09ex09.bind($_cunhv4jxjd09ex2m.children(scope), function (x) {
      return $_7pd8kyjujd09ex27.is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
    });
  };
  var $_d1u09zjtjd09ex21 = {
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
    return type(element) === $_92cb9ajwjd09ex2k.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_92cb9ajwjd09ex2k.ELEMENT);
  var isText = isType$1($_92cb9ajwjd09ex2k.TEXT);
  var isDocument = isType$1($_92cb9ajwjd09ex2k.DOCUMENT);
  var $_q4uvfkhjd09ex4i = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_byo4m9jpjd09ex1f.isString(value) || $_byo4m9jpjd09ex1f.isBoolean(value) || $_byo4m9jpjd09ex1f.isNumber(value)) {
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
    $_3bxkuvjkjd09ex15.each(attrs, function (v, k) {
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
    return $_51vcxojgjd09ex09.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_q4uvfkhjd09ex4i.isElement(source) || !$_q4uvfkhjd09ex4i.isElement(destination))
      return;
    $_51vcxojgjd09ex09.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_d01oh0kgjd09ex47 = {
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
    var dom = $_q4uvfkhjd09ex4i.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_800s80k5jd09ex3g.cached(function () {
    return getBody($_f1ygtcjvjd09ex2h.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_f1ygtcjvjd09ex2h.fromDom(body);
  };
  var $_1csexbkkjd09ex4o = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var all$1 = function (predicate) {
    return descendants($_1csexbkkjd09ex4o.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_51vcxojgjd09ex09.filter($_cunhv4jxjd09ex2m.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_51vcxojgjd09ex09.filter($_cunhv4jxjd09ex2m.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_51vcxojgjd09ex09.filter($_cunhv4jxjd09ex2m.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_51vcxojgjd09ex09.each($_cunhv4jxjd09ex2m.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_3dhgdnkjjd09ex4l = {
    all: all$1,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$2 = function (selector) {
    return $_7pd8kyjujd09ex27.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_3dhgdnkjjd09ex4l.ancestors(scope, function (e) {
      return $_7pd8kyjujd09ex27.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_3dhgdnkjjd09ex4l.siblings(scope, function (e) {
      return $_7pd8kyjujd09ex27.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_3dhgdnkjjd09ex4l.children(scope, function (e) {
      return $_7pd8kyjujd09ex27.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_7pd8kyjujd09ex27.all(selector, scope);
  };
  var $_baxp2xkijd09ex4k = {
    all: all$2,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? $_dmlx9ujhjd09ex0f.some(scope) : $_byo4m9jpjd09ex1f.isFunction(isRoot) && isRoot(scope) ? $_dmlx9ujhjd09ex0f.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_1csexbkkjd09ex4o.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_byo4m9jpjd09ex1f.isFunction(isRoot) ? isRoot : $_e1ub5rjijd09ex0p.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_f1ygtcjvjd09ex2h.fromDom(element);
      if (predicate(el))
        return $_dmlx9ujhjd09ex0f.some(el);
      else if (stop(el))
        break;
    }
    return $_dmlx9ujhjd09ex0f.none();
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
      return $_dmlx9ujhjd09ex0f.none();
    return child$1($_f1ygtcjvjd09ex2h.fromDom(element.parentNode), function (x) {
      return !$_a4998rjzjd09ex33.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_51vcxojgjd09ex09.find(scope.dom().childNodes, $_e1ub5rjijd09ex0p.compose(predicate, $_f1ygtcjvjd09ex2h.fromDom));
    return result.map($_f1ygtcjvjd09ex2h.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_f1ygtcjvjd09ex2h.fromDom(element.childNodes[i])))
          return $_dmlx9ujhjd09ex0f.some($_f1ygtcjvjd09ex2h.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return $_dmlx9ujhjd09ex0f.none();
    };
    return descend(scope.dom());
  };
  var $_d4i6ihkmjd09ex4s = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var first$2 = function (selector) {
    return $_7pd8kyjujd09ex27.one(selector);
  };
  var ancestor$1 = function (scope, selector, isRoot) {
    return $_d4i6ihkmjd09ex4s.ancestor(scope, function (e) {
      return $_7pd8kyjujd09ex27.is(e, selector);
    }, isRoot);
  };
  var sibling$1 = function (scope, selector) {
    return $_d4i6ihkmjd09ex4s.sibling(scope, function (e) {
      return $_7pd8kyjujd09ex27.is(e, selector);
    });
  };
  var child$2 = function (scope, selector) {
    return $_d4i6ihkmjd09ex4s.child(scope, function (e) {
      return $_7pd8kyjujd09ex27.is(e, selector);
    });
  };
  var descendant$1 = function (scope, selector) {
    return $_7pd8kyjujd09ex27.one(selector, scope);
  };
  var closest$1 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_7pd8kyjujd09ex27.is, ancestor$1, scope, selector, isRoot);
  };
  var $_2ljr38kljd09ex4r = {
    first: first$2,
    ancestor: ancestor$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1,
    closest: closest$1
  };

  var lookup = function (tags, element, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_e1ub5rjijd09ex0p.constant(false);
    if (isRoot(element))
      return $_dmlx9ujhjd09ex0f.none();
    if ($_51vcxojgjd09ex09.contains(tags, $_q4uvfkhjd09ex4i.name(element)))
      return $_dmlx9ujhjd09ex0f.some(element);
    var isRootOrUpperTable = function (element) {
      return $_7pd8kyjujd09ex27.is(element, 'table') || isRoot(element);
    };
    return $_2ljr38kljd09ex4r.ancestor(element, tags.join(','), isRootOrUpperTable);
  };
  var cell = function (element, isRoot) {
    return lookup([
      'td',
      'th'
    ], element, isRoot);
  };
  var cells = function (ancestor) {
    return $_d1u09zjtjd09ex21.firstLayer(ancestor, 'th,td');
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
    return $_cunhv4jxjd09ex2m.parent(element).map(function (parent) {
      return $_baxp2xkijd09ex4k.children(parent, selector);
    });
  };
  var neighbourCells = $_e1ub5rjijd09ex0p.curry(neighbours, 'th,td');
  var neighbourRows = $_e1ub5rjijd09ex0p.curry(neighbours, 'tr');
  var firstCell = function (ancestor) {
    return $_2ljr38kljd09ex4r.descendant(ancestor, 'th,td');
  };
  var table = function (element, isRoot) {
    return $_2ljr38kljd09ex4r.closest(element, 'table', isRoot);
  };
  var row = function (element, isRoot) {
    return lookup(['tr'], element, isRoot);
  };
  var rows = function (ancestor) {
    return $_d1u09zjtjd09ex21.firstLayer(ancestor, 'tr');
  };
  var attr = function (element, property) {
    return parseInt($_d01oh0kgjd09ex47.get(element, property), 10);
  };
  var grid$1 = function (element, rowProp, colProp) {
    var rows = attr(element, rowProp);
    var cols = attr(element, colProp);
    return $_1hu5nejrjd09ex1m.grid(rows, cols);
  };
  var $_t50u2jsjd09ex1p = {
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
    var rows = $_t50u2jsjd09ex1p.rows(table);
    return $_51vcxojgjd09ex09.map(rows, function (row) {
      var element = row;
      var parent = $_cunhv4jxjd09ex2m.parent(element);
      var parentSection = parent.bind(function (parent) {
        var parentName = $_q4uvfkhjd09ex4i.name(parent);
        return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
      });
      var cells = $_51vcxojgjd09ex09.map($_t50u2jsjd09ex1p.cells(row), function (cell) {
        var rowspan = $_d01oh0kgjd09ex47.has(cell, 'rowspan') ? parseInt($_d01oh0kgjd09ex47.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_d01oh0kgjd09ex47.has(cell, 'colspan') ? parseInt($_d01oh0kgjd09ex47.get(cell, 'colspan'), 10) : 1;
        return $_1hu5nejrjd09ex1m.detail(cell, rowspan, colspan);
      });
      return $_1hu5nejrjd09ex1m.rowdata(element, cells, parentSection);
    });
  };
  var fromPastedRows = function (rows, example) {
    return $_51vcxojgjd09ex09.map(rows, function (row) {
      var cells = $_51vcxojgjd09ex09.map($_t50u2jsjd09ex1p.cells(row), function (cell) {
        var rowspan = $_d01oh0kgjd09ex47.has(cell, 'rowspan') ? parseInt($_d01oh0kgjd09ex47.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_d01oh0kgjd09ex47.has(cell, 'colspan') ? parseInt($_d01oh0kgjd09ex47.get(cell, 'colspan'), 10) : 1;
        return $_1hu5nejrjd09ex1m.detail(cell, rowspan, colspan);
      });
      return $_1hu5nejrjd09ex1m.rowdata(row, cells, example.section());
    });
  };
  var $_42cwa1jqjd09ex1g = {
    fromTable: fromTable,
    fromPastedRows: fromPastedRows
  };

  var key = function (row, column) {
    return row + ',' + column;
  };
  var getAt = function (warehouse, row, column) {
    var raw = warehouse.access()[key(row, column)];
    return raw !== undefined ? $_dmlx9ujhjd09ex0f.some(raw) : $_dmlx9ujhjd09ex0f.none();
  };
  var findItem = function (warehouse, item, comparator) {
    var filtered = filterItems(warehouse, function (detail) {
      return comparator(item, detail.element());
    });
    return filtered.length > 0 ? $_dmlx9ujhjd09ex0f.some(filtered[0]) : $_dmlx9ujhjd09ex0f.none();
  };
  var filterItems = function (warehouse, predicate) {
    var all = $_51vcxojgjd09ex09.bind(warehouse.all(), function (r) {
      return r.cells();
    });
    return $_51vcxojgjd09ex09.filter(all, predicate);
  };
  var generate = function (list) {
    var access = {};
    var cells = [];
    var maxRows = list.length;
    var maxColumns = 0;
    $_51vcxojgjd09ex09.each(list, function (details, r) {
      var currentRow = [];
      $_51vcxojgjd09ex09.each(details.cells(), function (detail, c) {
        var start = 0;
        while (access[key(r, start)] !== undefined) {
          start++;
        }
        var current = $_1hu5nejrjd09ex1m.extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
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
      cells.push($_1hu5nejrjd09ex1m.rowdata(details.element(), currentRow, details.section()));
    });
    var grid = $_1hu5nejrjd09ex1m.grid(maxRows, maxColumns);
    return {
      grid: $_e1ub5rjijd09ex0p.constant(grid),
      access: $_e1ub5rjijd09ex0p.constant(access),
      all: $_e1ub5rjijd09ex0p.constant(cells)
    };
  };
  var justCells = function (warehouse) {
    var rows = $_51vcxojgjd09ex09.map(warehouse.all(), function (w) {
      return w.cells();
    });
    return $_51vcxojgjd09ex09.flatten(rows);
  };
  var $_6h2u4hkojd09ex5a = {
    generate: generate,
    getAt: getAt,
    findItem: findItem,
    filterItems: filterItems,
    justCells: justCells
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_66xlv4kqjd09ex5r = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_byo4m9jpjd09ex1f.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_66xlv4kqjd09ex5r.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_66xlv4kqjd09ex5r.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$1 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_3bxkuvjkjd09ex15.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_3bxkuvjkjd09ex15.each(css, function (v, k) {
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
    var v = r === '' && !$_1csexbkkjd09ex4o.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_66xlv4kqjd09ex5r.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return $_dmlx9ujhjd09ex0f.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_66xlv4kqjd09ex5r.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_f1ygtcjvjd09ex2h.fromTag(tag);
    set$1(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$1 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_d01oh0kgjd09ex47.has(element, 'style') && $_bfonkwkdjd09ex3z.trim($_d01oh0kgjd09ex47.get(element, 'style')) === '') {
      $_d01oh0kgjd09ex47.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_d01oh0kgjd09ex47.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_d01oh0kgjd09ex47.remove : $_d01oh0kgjd09ex47.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_66xlv4kqjd09ex5r.isSupported(sourceDom) && $_66xlv4kqjd09ex5r.isSupported(targetDom)) {
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
    if (!$_q4uvfkhjd09ex4i.isElement(source) || !$_q4uvfkhjd09ex4i.isElement(destination))
      return;
    $_51vcxojgjd09ex09.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_6bq7pnkpjd09ex5h = {
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
    var parent = $_cunhv4jxjd09ex2m.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_cunhv4jxjd09ex2m.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_cunhv4jxjd09ex2m.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_cunhv4jxjd09ex2m.firstChild(parent);
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
    $_cunhv4jxjd09ex2m.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_dzzvfkkrjd09ex5s = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_51vcxojgjd09ex09.each(elements, function (x) {
      $_dzzvfkkrjd09ex5s.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_51vcxojgjd09ex09.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_dzzvfkkrjd09ex5s.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_51vcxojgjd09ex09.each(elements.slice().reverse(), function (x) {
      $_dzzvfkkrjd09ex5s.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_51vcxojgjd09ex09.each(elements, function (x) {
      $_dzzvfkkrjd09ex5s.append(parent, x);
    });
  };
  var $_3507pkktjd09ex5w = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_51vcxojgjd09ex09.each($_cunhv4jxjd09ex2m.children(element), function (rogue) {
      remove$2(rogue);
    });
  };
  var remove$2 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_cunhv4jxjd09ex2m.children(wrapper);
    if (children.length > 0)
      $_3507pkktjd09ex5w.before(wrapper, children);
    remove$2(wrapper);
  };
  var $_9alt55ksjd09ex5u = {
    empty: empty,
    remove: remove$2,
    unwrap: unwrap
  };

  var stats = $_6c8np0jljd09ex18.immutable('minRow', 'minCol', 'maxRow', 'maxCol');
  var findSelectedStats = function (house, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    var minRow = totalRows;
    var minCol = totalColumns;
    var maxRow = 0;
    var maxCol = 0;
    $_3bxkuvjkjd09ex15.each(house.access(), function (detail) {
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
    var td = $_f1ygtcjvjd09ex2h.fromTag('td');
    $_dzzvfkkrjd09ex5s.append(td, $_f1ygtcjvjd09ex2h.fromTag('br'));
    var f = seenSelected ? $_dzzvfkkrjd09ex5s.append : $_dzzvfkkrjd09ex5s.prepend;
    f(row, td);
  };
  var fillInGaps = function (list, house, stats, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    for (var i = 0; i < totalRows; i++) {
      var seenSelected = false;
      for (var j = 0; j < totalColumns; j++) {
        if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
          var needCell = $_6h2u4hkojd09ex5a.getAt(house, i, j).filter(isSelected).isNone();
          if (needCell)
            makeCell(list, seenSelected, i);
          else
            seenSelected = true;
        }
      }
    }
  };
  var clean = function (table, stats) {
    var emptyRows = $_51vcxojgjd09ex09.filter($_d1u09zjtjd09ex21.firstLayer(table, 'tr'), function (row) {
      return row.dom().childElementCount === 0;
    });
    $_51vcxojgjd09ex09.each(emptyRows, $_9alt55ksjd09ex5u.remove);
    if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
      $_51vcxojgjd09ex09.each($_d1u09zjtjd09ex21.firstLayer(table, 'th,td'), function (cell) {
        $_d01oh0kgjd09ex47.remove(cell, 'rowspan');
        $_d01oh0kgjd09ex47.remove(cell, 'colspan');
      });
    }
    $_d01oh0kgjd09ex47.remove(table, 'width');
    $_d01oh0kgjd09ex47.remove(table, 'height');
    $_6bq7pnkpjd09ex5h.remove(table, 'width');
    $_6bq7pnkpjd09ex5h.remove(table, 'height');
  };
  var extract = function (table, selectedSelector) {
    var isSelected = function (detail) {
      return $_7pd8kyjujd09ex27.is(detail.element(), selectedSelector);
    };
    var list = $_42cwa1jqjd09ex1g.fromTable(table);
    var house = $_6h2u4hkojd09ex5a.generate(list);
    var stats = findSelectedStats(house, isSelected);
    var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
    var unselectedCells = $_d1u09zjtjd09ex21.filterFirstLayer(table, 'th,td', function (cell) {
      return $_7pd8kyjujd09ex27.is(cell, selector);
    });
    $_51vcxojgjd09ex09.each(unselectedCells, $_9alt55ksjd09ex5u.remove);
    fillInGaps(list, house, stats, isSelected);
    clean(table, stats);
    return table;
  };
  var $_dmbkrfjjjd09ex0t = { extract: extract };

  var clone$1 = function (original, deep) {
    return $_f1ygtcjvjd09ex2h.fromDom(original.dom().cloneNode(deep));
  };
  var shallow = function (original) {
    return clone$1(original, false);
  };
  var deep = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_f1ygtcjvjd09ex2h.fromTag(tag);
    var attributes = $_d01oh0kgjd09ex47.clone(original);
    $_d01oh0kgjd09ex47.setAll(nu, attributes);
    return nu;
  };
  var copy$1 = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_cunhv4jxjd09ex2m.children(deep(original));
    $_3507pkktjd09ex5w.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_dzzvfkkrjd09ex5s.before(original, nu);
    var children = $_cunhv4jxjd09ex2m.children(original);
    $_3507pkktjd09ex5w.append(nu, children);
    $_9alt55ksjd09ex5u.remove(original);
    return nu;
  };
  var $_gblvyukvjd09ex6e = {
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
        return $_dmlx9ujhjd09ex0f.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? $_dmlx9ujhjd09ex0f.from(element.dom().nodeValue) : $_dmlx9ujhjd09ex0f.none();
    };
    var browser = $_3qhsx8k4jd09ex3f.detect().browser;
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

  var api = NodeValue($_q4uvfkhjd09ex4i.isText, 'text');
  var get$2 = function (element) {
    return api.get(element);
  };
  var getOption = function (element) {
    return api.getOption(element);
  };
  var set$2 = function (element, value) {
    api.set(element, value);
  };
  var $_3v8a0jkyjd09ex6m = {
    get: get$2,
    getOption: getOption,
    set: set$2
  };

  var getEnd = function (element) {
    return $_q4uvfkhjd09ex4i.name(element) === 'img' ? 1 : $_3v8a0jkyjd09ex6m.getOption(element).fold(function () {
      return $_cunhv4jxjd09ex2m.children(element).length;
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
    return $_3v8a0jkyjd09ex6m.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_51vcxojgjd09ex09.contains(elementsWithCursorPosition, $_q4uvfkhjd09ex4i.name(elem));
  };
  var $_at3nybkxjd09ex6k = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var first$3 = function (element) {
    return $_d4i6ihkmjd09ex4s.descendant(element, $_at3nybkxjd09ex6k.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_at3nybkxjd09ex6k.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_cunhv4jxjd09ex2m.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return $_dmlx9ujhjd09ex0f.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return $_dmlx9ujhjd09ex0f.none();
    };
    return descend(scope);
  };
  var $_dczsdckwjd09ex6h = {
    first: first$3,
    last: last$2
  };

  var cell$1 = function () {
    var td = $_f1ygtcjvjd09ex2h.fromTag('td');
    $_dzzvfkkrjd09ex5s.append(td, $_f1ygtcjvjd09ex2h.fromTag('br'));
    return td;
  };
  var replace = function (cell, tag, attrs) {
    var replica = $_gblvyukvjd09ex6e.copy(cell, tag);
    $_3bxkuvjkjd09ex15.each(attrs, function (v, k) {
      if (v === null)
        $_d01oh0kgjd09ex47.remove(replica, k);
      else
        $_d01oh0kgjd09ex47.set(replica, k, v);
    });
    return replica;
  };
  var pasteReplace = function (cellContent) {
    return cellContent;
  };
  var newRow = function (doc) {
    return function () {
      return $_f1ygtcjvjd09ex2h.fromTag('tr', doc.dom());
    };
  };
  var cloneFormats = function (oldCell, newCell, formats) {
    var first = $_dczsdckwjd09ex6h.first(oldCell);
    return first.map(function (firstText) {
      var formatSelector = formats.join(',');
      var parents = $_baxp2xkijd09ex4k.ancestors(firstText, formatSelector, function (element) {
        return $_a4998rjzjd09ex33.eq(element, oldCell);
      });
      return $_51vcxojgjd09ex09.foldr(parents, function (last, parent) {
        var clonedFormat = $_gblvyukvjd09ex6e.shallow(parent);
        $_dzzvfkkrjd09ex5s.append(last, clonedFormat);
        return clonedFormat;
      }, newCell);
    }).getOr(newCell);
  };
  var cellOperations = function (mutate, doc, formatsToClone) {
    var newCell = function (prev) {
      var doc = $_cunhv4jxjd09ex2m.owner(prev.element());
      var td = $_f1ygtcjvjd09ex2h.fromTag($_q4uvfkhjd09ex4i.name(prev.element()), doc.dom());
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
      $_dzzvfkkrjd09ex5s.append(lastNode, $_f1ygtcjvjd09ex2h.fromTag('br'));
      $_6bq7pnkpjd09ex5h.copy(prev.element(), td);
      $_6bq7pnkpjd09ex5h.remove(td, 'height');
      if (prev.colspan() !== 1)
        $_6bq7pnkpjd09ex5h.remove(prev.element(), 'width');
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
  var $_5vywgckujd09ex5z = {
    cellOperations: cellOperations,
    paste: paste
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_cunhv4jxjd09ex2m.children($_f1ygtcjvjd09ex2h.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_51vcxojgjd09ex09.map(tags, function (x) {
      return $_f1ygtcjvjd09ex2h.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_51vcxojgjd09ex09.map(texts, function (x) {
      return $_f1ygtcjvjd09ex2h.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_51vcxojgjd09ex09.map(nodes, $_f1ygtcjvjd09ex2h.fromDom);
  };
  var $_5514ykl0jd09ex6z = {
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
      return $_f1ygtcjvjd09ex2h.fromDom(element.dom().cloneNode(false));
    };
    var isBoundary = function (element) {
      if (!$_q4uvfkhjd09ex4i.isElement(element))
        return false;
      if ($_q4uvfkhjd09ex4i.name(element) === 'body')
        return true;
      return $_51vcxojgjd09ex09.contains(TagBoundaries, $_q4uvfkhjd09ex4i.name(element));
    };
    var isEmptyTag = function (element) {
      if (!$_q4uvfkhjd09ex4i.isElement(element))
        return false;
      return $_51vcxojgjd09ex09.contains([
        'br',
        'img',
        'hr',
        'input'
      ], $_q4uvfkhjd09ex4i.name(element));
    };
    var comparePosition = function (element, other) {
      return element.dom().compareDocumentPosition(other.dom());
    };
    var copyAttributesTo = function (source, destination) {
      var as = $_d01oh0kgjd09ex47.clone(source);
      $_d01oh0kgjd09ex47.setAll(destination, as);
    };
    return {
      up: $_e1ub5rjijd09ex0p.constant({
        selector: $_2ljr38kljd09ex4r.ancestor,
        closest: $_2ljr38kljd09ex4r.closest,
        predicate: $_d4i6ihkmjd09ex4s.ancestor,
        all: $_cunhv4jxjd09ex2m.parents
      }),
      down: $_e1ub5rjijd09ex0p.constant({
        selector: $_baxp2xkijd09ex4k.descendants,
        predicate: $_3dhgdnkjjd09ex4l.descendants
      }),
      styles: $_e1ub5rjijd09ex0p.constant({
        get: $_6bq7pnkpjd09ex5h.get,
        getRaw: $_6bq7pnkpjd09ex5h.getRaw,
        set: $_6bq7pnkpjd09ex5h.set,
        remove: $_6bq7pnkpjd09ex5h.remove
      }),
      attrs: $_e1ub5rjijd09ex0p.constant({
        get: $_d01oh0kgjd09ex47.get,
        set: $_d01oh0kgjd09ex47.set,
        remove: $_d01oh0kgjd09ex47.remove,
        copyTo: copyAttributesTo
      }),
      insert: $_e1ub5rjijd09ex0p.constant({
        before: $_dzzvfkkrjd09ex5s.before,
        after: $_dzzvfkkrjd09ex5s.after,
        afterAll: $_3507pkktjd09ex5w.after,
        append: $_dzzvfkkrjd09ex5s.append,
        appendAll: $_3507pkktjd09ex5w.append,
        prepend: $_dzzvfkkrjd09ex5s.prepend,
        wrap: $_dzzvfkkrjd09ex5s.wrap
      }),
      remove: $_e1ub5rjijd09ex0p.constant({
        unwrap: $_9alt55ksjd09ex5u.unwrap,
        remove: $_9alt55ksjd09ex5u.remove
      }),
      create: $_e1ub5rjijd09ex0p.constant({
        nu: $_f1ygtcjvjd09ex2h.fromTag,
        clone: clone,
        text: $_f1ygtcjvjd09ex2h.fromText
      }),
      query: $_e1ub5rjijd09ex0p.constant({
        comparePosition: comparePosition,
        prevSibling: $_cunhv4jxjd09ex2m.prevSibling,
        nextSibling: $_cunhv4jxjd09ex2m.nextSibling
      }),
      property: $_e1ub5rjijd09ex0p.constant({
        children: $_cunhv4jxjd09ex2m.children,
        name: $_q4uvfkhjd09ex4i.name,
        parent: $_cunhv4jxjd09ex2m.parent,
        isText: $_q4uvfkhjd09ex4i.isText,
        isComment: $_q4uvfkhjd09ex4i.isComment,
        isElement: $_q4uvfkhjd09ex4i.isElement,
        getText: $_3v8a0jkyjd09ex6m.get,
        setText: $_3v8a0jkyjd09ex6m.set,
        isBoundary: isBoundary,
        isEmptyTag: isEmptyTag
      }),
      eq: $_a4998rjzjd09ex33.eq,
      is: $_a4998rjzjd09ex33.is
    };
  }

  var leftRight = $_6c8np0jljd09ex18.immutable('left', 'right');
  var bisect = function (universe, parent, child) {
    var children = universe.property().children(parent);
    var index = $_51vcxojgjd09ex09.findIndex(children, $_e1ub5rjijd09ex0p.curry(universe.eq, child));
    return index.map(function (ind) {
      return {
        before: $_e1ub5rjijd09ex0p.constant(children.slice(0, ind)),
        after: $_e1ub5rjijd09ex0p.constant(children.slice(ind + 1))
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
    var result = $_6c8np0jljd09ex18.immutable('first', 'second', 'splits');
    var next = function (child, group, splits) {
      var fallback = result(child, $_dmlx9ujhjd09ex0f.none(), splits);
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
            return next(nextChild, $_dmlx9ujhjd09ex0f.some(breakage.right()), splits.concat(extra));
          }).getOr(fallback);
        });
      }
    };
    return next(item, $_dmlx9ujhjd09ex0f.none(), []);
  };
  var $_9cngqgl9jd09ex8u = {
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
    return elements.length > 0 ? all$3(universe, look, elements, unsafeOne) : $_dmlx9ujhjd09ex0f.none();
  };
  var unsafeOne = function (universe, look, head, tail) {
    var start = look(universe, head);
    return $_51vcxojgjd09ex09.foldr(tail, function (b, a) {
      var current = look(universe, a);
      return commonElement(universe, b, current);
    }, start);
  };
  var commonElement = function (universe, start, end) {
    return start.bind(function (s) {
      return end.filter($_e1ub5rjijd09ex0p.curry(universe.eq, s));
    });
  };
  var $_fcsr6qlajd09ex91 = { oneAll: oneAll };

  var eq$1 = function (universe, item) {
    return $_e1ub5rjijd09ex0p.curry(universe.eq, item);
  };
  var unsafeSubset = function (universe, common, ps1, ps2) {
    var children = universe.property().children(common);
    if (universe.eq(common, ps1[0]))
      return $_dmlx9ujhjd09ex0f.some([ps1[0]]);
    if (universe.eq(common, ps2[0]))
      return $_dmlx9ujhjd09ex0f.some([ps2[0]]);
    var finder = function (ps) {
      var topDown = $_51vcxojgjd09ex09.reverse(ps);
      var index = $_51vcxojgjd09ex09.findIndex(topDown, eq$1(universe, common)).getOr(-1);
      var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];
      return $_51vcxojgjd09ex09.findIndex(children, eq$1(universe, item));
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
    var isRoot = _isRoot !== undefined ? _isRoot : $_e1ub5rjijd09ex0p.constant(false);
    var ps1 = [start].concat(universe.up().all(start));
    var ps2 = [end].concat(universe.up().all(end));
    var prune = function (path) {
      var index = $_51vcxojgjd09ex09.findIndex(path, isRoot);
      return index.fold(function () {
        return path;
      }, function (ind) {
        return path.slice(0, ind + 1);
      });
    };
    var pruned1 = prune(ps1);
    var pruned2 = prune(ps2);
    var shared = $_51vcxojgjd09ex09.find(pruned1, function (x) {
      return $_51vcxojgjd09ex09.exists(pruned2, eq$1(universe, x));
    });
    return {
      firstpath: $_e1ub5rjijd09ex0p.constant(pruned1),
      secondpath: $_e1ub5rjijd09ex0p.constant(pruned2),
      shared: $_e1ub5rjijd09ex0p.constant(shared)
    };
  };
  var subset = function (universe, start, end) {
    var ancs = ancestors$2(universe, start, end);
    return ancs.shared().bind(function (shared) {
      return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
    });
  };
  var $_b4qbfhlbjd09ex96 = {
    subset: subset,
    ancestors: ancestors$2
  };

  var sharedOne = function (universe, look, elements) {
    return $_fcsr6qlajd09ex91.oneAll(universe, look, elements);
  };
  var subset$1 = function (universe, start, finish) {
    return $_b4qbfhlbjd09ex96.subset(universe, start, finish);
  };
  var ancestors$3 = function (universe, start, finish, _isRoot) {
    return $_b4qbfhlbjd09ex96.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$1 = function (universe, parent, child) {
    return $_9cngqgl9jd09ex8u.breakToLeft(universe, parent, child);
  };
  var breakToRight$1 = function (universe, parent, child) {
    return $_9cngqgl9jd09ex8u.breakToRight(universe, parent, child);
  };
  var breakPath$1 = function (universe, child, isTop, breaker) {
    return $_9cngqgl9jd09ex8u.breakPath(universe, child, isTop, breaker);
  };
  var $_dx07nnl8jd09ex8n = {
    sharedOne: sharedOne,
    subset: subset$1,
    ancestors: ancestors$3,
    breakToLeft: breakToLeft$1,
    breakToRight: breakToRight$1,
    breakPath: breakPath$1
  };

  var universe = DomUniverse();
  var sharedOne$1 = function (look, elements) {
    return $_dx07nnl8jd09ex8n.sharedOne(universe, function (universe, element) {
      return look(element);
    }, elements);
  };
  var subset$2 = function (start, finish) {
    return $_dx07nnl8jd09ex8n.subset(universe, start, finish);
  };
  var ancestors$4 = function (start, finish, _isRoot) {
    return $_dx07nnl8jd09ex8n.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$2 = function (parent, child) {
    return $_dx07nnl8jd09ex8n.breakToLeft(universe, parent, child);
  };
  var breakToRight$2 = function (parent, child) {
    return $_dx07nnl8jd09ex8n.breakToRight(universe, parent, child);
  };
  var breakPath$2 = function (child, isTop, breaker) {
    return $_dx07nnl8jd09ex8n.breakPath(universe, child, isTop, function (u, p, c) {
      return breaker(p, c);
    });
  };
  var $_gbfptvl5jd09ex7y = {
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
    var detailIsWithin = $_e1ub5rjijd09ex0p.curry(isWithin, bounds);
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        isRect = isRect && $_6h2u4hkojd09ex5a.getAt(warehouse, i, j).exists(detailIsWithin);
      }
    }
    return isRect ? $_dmlx9ujhjd09ex0f.some(bounds) : $_dmlx9ujhjd09ex0f.none();
  };
  var $_erypurlejd09ex9k = {
    inSelection: inSelection,
    isWithin: isWithin,
    isRectangular: isRectangular
  };

  var getBounds = function (detailA, detailB) {
    return $_1hu5nejrjd09ex1m.bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
  };
  var getAnyBox = function (warehouse, startCell, finishCell) {
    var startCoords = $_6h2u4hkojd09ex5a.findItem(warehouse, startCell, $_a4998rjzjd09ex33.eq);
    var finishCoords = $_6h2u4hkojd09ex5a.findItem(warehouse, finishCell, $_a4998rjzjd09ex33.eq);
    return startCoords.bind(function (sc) {
      return finishCoords.map(function (fc) {
        return getBounds(sc, fc);
      });
    });
  };
  var getBox = function (warehouse, startCell, finishCell) {
    return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
      return $_erypurlejd09ex9k.isRectangular(warehouse, bounds);
    });
  };
  var $_6jywcklfjd09ex9o = {
    getAnyBox: getAnyBox,
    getBox: getBox
  };

  var moveBy = function (warehouse, cell, row, column) {
    return $_6h2u4hkojd09ex5a.findItem(warehouse, cell, $_a4998rjzjd09ex33.eq).bind(function (detail) {
      var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
      var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
      var dest = $_6h2u4hkojd09ex5a.getAt(warehouse, startRow + row, startCol + column);
      return dest.map(function (d) {
        return d.element();
      });
    });
  };
  var intercepts = function (warehouse, start, finish) {
    return $_6jywcklfjd09ex9o.getAnyBox(warehouse, start, finish).map(function (bounds) {
      var inside = $_6h2u4hkojd09ex5a.filterItems(warehouse, $_e1ub5rjijd09ex0p.curry($_erypurlejd09ex9k.inSelection, bounds));
      return $_51vcxojgjd09ex09.map(inside, function (detail) {
        return detail.element();
      });
    });
  };
  var parentCell = function (warehouse, innerCell) {
    var isContainedBy = function (c1, c2) {
      return $_a4998rjzjd09ex33.contains(c2, c1);
    };
    return $_6h2u4hkojd09ex5a.findItem(warehouse, innerCell, isContainedBy).bind(function (detail) {
      return detail.element();
    });
  };
  var $_3t46rmldjd09ex9e = {
    moveBy: moveBy,
    intercepts: intercepts,
    parentCell: parentCell
  };

  var moveBy$1 = function (cell, deltaRow, deltaColumn) {
    return $_t50u2jsjd09ex1p.table(cell).bind(function (table) {
      var warehouse = getWarehouse(table);
      return $_3t46rmldjd09ex9e.moveBy(warehouse, cell, deltaRow, deltaColumn);
    });
  };
  var intercepts$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_3t46rmldjd09ex9e.intercepts(warehouse, first, last);
  };
  var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
    var warehouse = getWarehouse(table);
    var startCell = $_a4998rjzjd09ex33.eq(table, firstTable) ? first : $_3t46rmldjd09ex9e.parentCell(warehouse, first);
    var lastCell = $_a4998rjzjd09ex33.eq(table, lastTable) ? last : $_3t46rmldjd09ex9e.parentCell(warehouse, last);
    return $_3t46rmldjd09ex9e.intercepts(warehouse, startCell, lastCell);
  };
  var getBox$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_6jywcklfjd09ex9o.getBox(warehouse, first, last);
  };
  var getWarehouse = function (table) {
    var list = $_42cwa1jqjd09ex1g.fromTable(table);
    return $_6h2u4hkojd09ex5a.generate(list);
  };
  var $_1k6ssslcjd09ex9b = {
    moveBy: moveBy$1,
    intercepts: intercepts$1,
    nestedIntercepts: nestedIntercepts,
    getBox: getBox$1
  };

  var lookupTable = function (container, isRoot) {
    return $_2ljr38kljd09ex4r.ancestor(container, 'table');
  };
  var identified = $_6c8np0jljd09ex18.immutableBag([
    'boxes',
    'start',
    'finish'
  ], []);
  var identify = function (start, finish, isRoot) {
    var getIsRoot = function (rootTable) {
      return function (element) {
        return isRoot(element) || $_a4998rjzjd09ex33.eq(element, rootTable);
      };
    };
    if ($_a4998rjzjd09ex33.eq(start, finish)) {
      return $_dmlx9ujhjd09ex0f.some(identified({
        boxes: $_dmlx9ujhjd09ex0f.some([start]),
        start: start,
        finish: finish
      }));
    } else {
      return lookupTable(start, isRoot).bind(function (startTable) {
        return lookupTable(finish, isRoot).bind(function (finishTable) {
          if ($_a4998rjzjd09ex33.eq(startTable, finishTable)) {
            return $_dmlx9ujhjd09ex0f.some(identified({
              boxes: $_1k6ssslcjd09ex9b.intercepts(startTable, start, finish),
              start: start,
              finish: finish
            }));
          } else if ($_a4998rjzjd09ex33.contains(startTable, finishTable)) {
            var ancestorCells = $_baxp2xkijd09ex4k.ancestors(finish, 'td,th', getIsRoot(startTable));
            var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
            return $_dmlx9ujhjd09ex0f.some(identified({
              boxes: $_1k6ssslcjd09ex9b.nestedIntercepts(startTable, start, startTable, finish, finishTable),
              start: start,
              finish: finishCell
            }));
          } else if ($_a4998rjzjd09ex33.contains(finishTable, startTable)) {
            var ancestorCells = $_baxp2xkijd09ex4k.ancestors(start, 'td,th', getIsRoot(finishTable));
            var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
            return $_dmlx9ujhjd09ex0f.some(identified({
              boxes: $_1k6ssslcjd09ex9b.nestedIntercepts(finishTable, start, startTable, finish, finishTable),
              start: start,
              finish: startCell
            }));
          } else {
            return $_gbfptvl5jd09ex7y.ancestors(start, finish).shared().bind(function (lca) {
              return $_2ljr38kljd09ex4r.closest(lca, 'table', isRoot).bind(function (lcaTable) {
                var finishAncestorCells = $_baxp2xkijd09ex4k.ancestors(finish, 'td,th', getIsRoot(lcaTable));
                var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                var startAncestorCells = $_baxp2xkijd09ex4k.ancestors(start, 'td,th', getIsRoot(lcaTable));
                var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                return $_dmlx9ujhjd09ex0f.some(identified({
                  boxes: $_1k6ssslcjd09ex9b.nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
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
    var sels = $_baxp2xkijd09ex4k.descendants(container, selector);
    return sels.length > 0 ? $_dmlx9ujhjd09ex0f.some(sels) : $_dmlx9ujhjd09ex0f.none();
  };
  var getLast = function (boxes, lastSelectedSelector) {
    return $_51vcxojgjd09ex09.find(boxes, function (box) {
      return $_7pd8kyjujd09ex27.is(box, lastSelectedSelector);
    });
  };
  var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_2ljr38kljd09ex4r.descendant(container, firstSelectedSelector).bind(function (first) {
      return $_2ljr38kljd09ex4r.descendant(container, lastSelectedSelector).bind(function (last) {
        return $_gbfptvl5jd09ex7y.sharedOne(lookupTable, [
          first,
          last
        ]).map(function (tbl) {
          return {
            first: $_e1ub5rjijd09ex0p.constant(first),
            last: $_e1ub5rjijd09ex0p.constant(last),
            table: $_e1ub5rjijd09ex0p.constant(tbl)
          };
        });
      });
    });
  };
  var expandTo = function (finish, firstSelectedSelector) {
    return $_2ljr38kljd09ex4r.ancestor(finish, 'table').bind(function (table) {
      return $_2ljr38kljd09ex4r.descendant(table, firstSelectedSelector).bind(function (start) {
        return identify(start, finish).bind(function (identified) {
          return identified.boxes().map(function (boxes) {
            return {
              boxes: $_e1ub5rjijd09ex0p.constant(boxes),
              start: $_e1ub5rjijd09ex0p.constant(identified.start()),
              finish: $_e1ub5rjijd09ex0p.constant(identified.finish())
            };
          });
        });
      });
    });
  };
  var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
    return getLast(boxes, lastSelectedSelector).bind(function (last) {
      return $_1k6ssslcjd09ex9b.moveBy(last, deltaRow, deltaColumn).bind(function (finish) {
        return expandTo(finish, firstSelectedSelector);
      });
    });
  };
  var $_u1a8ml4jd09ex7j = {
    identify: identify,
    retrieve: retrieve,
    shiftSelection: shiftSelection,
    getEdges: getEdges
  };

  var retrieve$1 = function (container, selector) {
    return $_u1a8ml4jd09ex7j.retrieve(container, selector);
  };
  var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_u1a8ml4jd09ex7j.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
      var isRoot = function (ancestor) {
        return $_a4998rjzjd09ex33.eq(container, ancestor);
      };
      var firstAncestor = $_2ljr38kljd09ex4r.ancestor(edges.first(), 'thead,tfoot,tbody,table', isRoot);
      var lastAncestor = $_2ljr38kljd09ex4r.ancestor(edges.last(), 'thead,tfoot,tbody,table', isRoot);
      return firstAncestor.bind(function (fA) {
        return lastAncestor.bind(function (lA) {
          return $_a4998rjzjd09ex33.eq(fA, lA) ? $_1k6ssslcjd09ex9b.getBox(edges.table(), edges.first(), edges.last()) : $_dmlx9ujhjd09ex0f.none();
        });
      });
    });
  };
  var $_146qqcl3jd09ex7d = {
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
  var $_7k08wvlgjd09ex9t = {
    selected: $_e1ub5rjijd09ex0p.constant(selected),
    selectedSelector: $_e1ub5rjijd09ex0p.constant(selectedSelector),
    attributeSelector: $_e1ub5rjijd09ex0p.constant(attributeSelector),
    firstSelected: $_e1ub5rjijd09ex0p.constant(firstSelected),
    firstSelectedSelector: $_e1ub5rjijd09ex0p.constant(firstSelectedSelector),
    lastSelected: $_e1ub5rjijd09ex0p.constant(lastSelected),
    lastSelectedSelector: $_e1ub5rjijd09ex0p.constant(lastSelectedSelector)
  };

  var generate$1 = function (cases) {
    if (!$_byo4m9jpjd09ex1f.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_51vcxojgjd09ex09.each(cases, function (acase, count) {
      var keys = $_3bxkuvjkjd09ex15.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_byo4m9jpjd09ex1f.isArray(value)) {
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
          var branchKeys = $_3bxkuvjkjd09ex15.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_51vcxojgjd09ex09.forall(constructors, function (reqKey) {
            return $_51vcxojgjd09ex09.contains(branchKeys, reqKey);
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
  var $_5sjgc9lijd09ex9x = { generate: generate$1 };

  var type$1 = $_5sjgc9lijd09ex9x.generate([
    { none: [] },
    { multiple: ['elements'] },
    { single: ['selection'] }
  ]);
  var cata = function (subject, onNone, onMultiple, onSingle) {
    return subject.fold(onNone, onMultiple, onSingle);
  };
  var $_f7bzc7lhjd09ex9v = {
    cata: cata,
    none: type$1.none,
    multiple: type$1.multiple,
    single: type$1.single
  };

  var selection = function (cell, selections) {
    return $_f7bzc7lhjd09ex9v.cata(selections.get(), $_e1ub5rjijd09ex0p.constant([]), $_e1ub5rjijd09ex0p.identity, $_e1ub5rjijd09ex0p.constant([cell]));
  };
  var unmergable = function (cell, selections) {
    var hasSpan = function (elem) {
      return $_d01oh0kgjd09ex47.has(elem, 'rowspan') && parseInt($_d01oh0kgjd09ex47.get(elem, 'rowspan'), 10) > 1 || $_d01oh0kgjd09ex47.has(elem, 'colspan') && parseInt($_d01oh0kgjd09ex47.get(elem, 'colspan'), 10) > 1;
    };
    var candidates = selection(cell, selections);
    return candidates.length > 0 && $_51vcxojgjd09ex09.forall(candidates, hasSpan) ? $_dmlx9ujhjd09ex0f.some(candidates) : $_dmlx9ujhjd09ex0f.none();
  };
  var mergable = function (table, selections) {
    return $_f7bzc7lhjd09ex9v.cata(selections.get(), $_dmlx9ujhjd09ex0f.none, function (cells, _env) {
      if (cells.length === 0) {
        return $_dmlx9ujhjd09ex0f.none();
      }
      return $_146qqcl3jd09ex7d.retrieveBox(table, $_7k08wvlgjd09ex9t.firstSelectedSelector(), $_7k08wvlgjd09ex9t.lastSelectedSelector()).bind(function (bounds) {
        return cells.length > 1 ? $_dmlx9ujhjd09ex0f.some({
          bounds: $_e1ub5rjijd09ex0p.constant(bounds),
          cells: $_e1ub5rjijd09ex0p.constant(cells)
        }) : $_dmlx9ujhjd09ex0f.none();
      });
    }, $_dmlx9ujhjd09ex0f.none);
  };
  var $_e8tyuel2jd09ex76 = {
    mergable: mergable,
    unmergable: unmergable,
    selection: selection
  };

  var noMenu = function (cell) {
    return {
      element: $_e1ub5rjijd09ex0p.constant(cell),
      mergable: $_dmlx9ujhjd09ex0f.none,
      unmergable: $_dmlx9ujhjd09ex0f.none,
      selection: $_e1ub5rjijd09ex0p.constant([cell])
    };
  };
  var forMenu = function (selections, table, cell) {
    return {
      element: $_e1ub5rjijd09ex0p.constant(cell),
      mergable: $_e1ub5rjijd09ex0p.constant($_e8tyuel2jd09ex76.mergable(table, selections)),
      unmergable: $_e1ub5rjijd09ex0p.constant($_e8tyuel2jd09ex76.unmergable(cell, selections)),
      selection: $_e1ub5rjijd09ex0p.constant($_e8tyuel2jd09ex76.selection(cell, selections))
    };
  };
  var notCell$1 = function (element) {
    return noMenu(element);
  };
  var paste$1 = $_6c8np0jljd09ex18.immutable('element', 'clipboard', 'generators');
  var pasteRows = function (selections, table, cell, clipboard, generators) {
    return {
      element: $_e1ub5rjijd09ex0p.constant(cell),
      mergable: $_dmlx9ujhjd09ex0f.none,
      unmergable: $_dmlx9ujhjd09ex0f.none,
      selection: $_e1ub5rjijd09ex0p.constant($_e8tyuel2jd09ex76.selection(cell, selections)),
      clipboard: $_e1ub5rjijd09ex0p.constant(clipboard),
      generators: $_e1ub5rjijd09ex0p.constant(generators)
    };
  };
  var $_6y2jcpl1jd09ex72 = {
    noMenu: noMenu,
    forMenu: forMenu,
    notCell: notCell$1,
    paste: paste$1,
    pasteRows: pasteRows
  };

  var extractSelected = function (cells) {
    return $_t50u2jsjd09ex1p.table(cells[0]).map($_gblvyukvjd09ex6e.deep).map(function (replica) {
      return [$_dmbkrfjjjd09ex0t.extract(replica, $_7k08wvlgjd09ex9t.attributeSelector())];
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
          e.content = $_51vcxojgjd09ex09.map(elements, function (elm) {
            return serializeElement(editor, elm);
          }).join('');
        });
      };
      if (e.selection === true) {
        $_f7bzc7lhjd09ex9v.cata(selections.get(), $_e1ub5rjijd09ex0p.noop, multiCellContext, $_e1ub5rjijd09ex0p.noop);
      }
    });
    editor.on('BeforeSetContent', function (e) {
      if (e.selection === true && e.paste === true) {
        var cellOpt = $_dmlx9ujhjd09ex0f.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        cellOpt.each(function (domCell) {
          var cell = $_f1ygtcjvjd09ex2h.fromDom(domCell);
          var table = $_t50u2jsjd09ex1p.table(cell);
          table.bind(function (table) {
            var elements = $_51vcxojgjd09ex09.filter($_5514ykl0jd09ex6z.fromHtml(e.content), function (content) {
              return $_q4uvfkhjd09ex4i.name(content) !== 'meta';
            });
            if (elements.length === 1 && $_q4uvfkhjd09ex4i.name(elements[0]) === 'table') {
              e.preventDefault();
              var doc = $_f1ygtcjvjd09ex2h.fromDom(editor.getDoc());
              var generators = $_5vywgckujd09ex5z.paste(doc);
              var targets = $_6y2jcpl1jd09ex72.paste(cell, elements[0], generators);
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
  var $_2zfsqojfjd09ewzu = { registerEvents: registerEvents };

  var makeTable = function () {
    return $_f1ygtcjvjd09ex2h.fromTag('table');
  };
  var tableBody = function () {
    return $_f1ygtcjvjd09ex2h.fromTag('tbody');
  };
  var tableRow = function () {
    return $_f1ygtcjvjd09ex2h.fromTag('tr');
  };
  var tableHeaderCell = function () {
    return $_f1ygtcjvjd09ex2h.fromTag('th');
  };
  var tableCell = function () {
    return $_f1ygtcjvjd09ex2h.fromTag('td');
  };
  var render = function (rows, columns, rowHeaders, columnHeaders) {
    var table = makeTable();
    $_6bq7pnkpjd09ex5h.setAll(table, {
      'border-collapse': 'collapse',
      width: '100%'
    });
    $_d01oh0kgjd09ex47.set(table, 'border', '1');
    var tbody = tableBody();
    $_dzzvfkkrjd09ex5s.append(table, tbody);
    var trs = [];
    for (var i = 0; i < rows; i++) {
      var tr = tableRow();
      for (var j = 0; j < columns; j++) {
        var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
        if (j < columnHeaders) {
          $_d01oh0kgjd09ex47.set(td, 'scope', 'row');
        }
        if (i < rowHeaders) {
          $_d01oh0kgjd09ex47.set(td, 'scope', 'col');
        }
        $_dzzvfkkrjd09ex5s.append(td, $_f1ygtcjvjd09ex2h.fromTag('br'));
        $_6bq7pnkpjd09ex5h.set(td, 'width', 100 / columns + '%');
        $_dzzvfkkrjd09ex5s.append(tr, td);
      }
      trs.push(tr);
    }
    $_3507pkktjd09ex5w.append(tbody, trs);
    return table;
  };
  var $_5s7ns3lljd09exa7 = { render: render };

  var $_9hadwelkjd09exa6 = { render: $_5s7ns3lljd09exa7.render };

  var get$3 = function (element) {
    return element.dom().innerHTML;
  };
  var set$3 = function (element, content) {
    var owner = $_cunhv4jxjd09ex2m.owner(element);
    var docDom = owner.dom();
    var fragment = $_f1ygtcjvjd09ex2h.fromDom(docDom.createDocumentFragment());
    var contentElements = $_5514ykl0jd09ex6z.fromHtml(content, docDom);
    $_3507pkktjd09ex5w.append(fragment, contentElements);
    $_9alt55ksjd09ex5u.empty(element);
    $_dzzvfkkrjd09ex5s.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_f1ygtcjvjd09ex2h.fromTag('div');
    var clone = $_f1ygtcjvjd09ex2h.fromDom(element.dom().cloneNode(true));
    $_dzzvfkkrjd09ex5s.append(container, clone);
    return get$3(container);
  };
  var $_dywhlxlmjd09exaf = {
    get: get$3,
    set: set$3,
    getOuter: getOuter
  };

  var placeCaretInCell = function (editor, cell) {
    editor.selection.select(cell.dom(), true);
    editor.selection.collapse(true);
  };
  var selectFirstCellInTable = function (editor, tableElm) {
    $_2ljr38kljd09ex4r.descendant(tableElm, 'td,th').each($_e1ub5rjijd09ex0p.curry(placeCaretInCell, editor));
  };
  var insert = function (editor, columns, rows) {
    var tableElm;
    var renderedHtml = $_9hadwelkjd09exa6.render(rows, columns, 0, 0);
    $_d01oh0kgjd09ex47.set(renderedHtml, 'id', '__mce');
    var html = $_dywhlxlmjd09exaf.getOuter(renderedHtml);
    editor.insertContent(html);
    tableElm = editor.dom.get('__mce');
    editor.dom.setAttrib(tableElm, 'id', null);
    editor.$('tr', tableElm).each(function (index, row) {
      editor.fire('newrow', { node: row });
      editor.$('th,td', row).each(function (index, cell) {
        editor.fire('newcell', { node: cell });
      });
    });
    editor.dom.setAttribs(tableElm, editor.settings.table_default_attributes || {});
    editor.dom.setStyles(tableElm, editor.settings.table_default_styles || {});
    selectFirstCellInTable(editor, $_f1ygtcjvjd09ex2h.fromDom(tableElm));
    return tableElm;
  };
  var $_f5phx5ljjd09exa0 = { insert: insert };

  function Dimension (name, getOffset) {
    var set = function (element, h) {
      if (!$_byo4m9jpjd09ex1f.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_66xlv4kqjd09ex5r.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_6bq7pnkpjd09ex5h.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_51vcxojgjd09ex09.foldl(properties, function (acc, property) {
        var val = $_6bq7pnkpjd09ex5h.get(element, property);
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
    return $_1csexbkkjd09ex4o.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$4 = function (element, h) {
    api$1.set(element, h);
  };
  var get$4 = function (element) {
    return api$1.get(element);
  };
  var getOuter$1 = function (element) {
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
    $_6bq7pnkpjd09ex5h.set(element, 'max-height', absMax + 'px');
  };
  var $_75gazclrjd09exbm = {
    set: set$4,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var api$2 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$5 = function (element, h) {
    api$2.set(element, h);
  };
  var get$5 = function (element) {
    return api$2.get(element);
  };
  var getOuter$2 = function (element) {
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
    $_6bq7pnkpjd09ex5h.set(element, 'max-width', absMax + 'px');
  };
  var $_6cnumhltjd09exbr = {
    set: set$5,
    get: get$5,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var platform = $_3qhsx8k4jd09ex3f.detect();
  var needManualCalc = function () {
    return platform.browser.isIE() || platform.browser.isEdge();
  };
  var toNumber = function (px, fallback) {
    var num = parseFloat(px);
    return isNaN(num) ? fallback : num;
  };
  var getProp = function (elm, name, fallback) {
    return toNumber($_6bq7pnkpjd09ex5h.get(elm, name), fallback);
  };
  var getCalculatedHeight = function (cell) {
    var paddingTop = getProp(cell, 'padding-top', 0);
    var paddingBottom = getProp(cell, 'padding-bottom', 0);
    var borderTop = getProp(cell, 'border-top-width', 0);
    var borderBottom = getProp(cell, 'border-bottom-width', 0);
    var height = cell.dom().getBoundingClientRect().height;
    var boxSizing = $_6bq7pnkpjd09ex5h.get(cell, 'box-sizing');
    var borders = borderTop + borderBottom;
    return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
  };
  var getWidth = function (cell) {
    return getProp(cell, 'width', $_6cnumhltjd09exbr.get(cell));
  };
  var getHeight = function (cell) {
    return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', $_75gazclrjd09exbm.get(cell));
  };
  var $_6pjdl3lqjd09exbg = {
    getWidth: getWidth,
    getHeight: getHeight
  };

  var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
  var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
  var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
  var setPixelWidth = function (cell, amount) {
    $_6bq7pnkpjd09ex5h.set(cell, 'width', amount + 'px');
  };
  var setPercentageWidth = function (cell, amount) {
    $_6bq7pnkpjd09ex5h.set(cell, 'width', amount + '%');
  };
  var setHeight = function (cell, amount) {
    $_6bq7pnkpjd09ex5h.set(cell, 'height', amount + 'px');
  };
  var getHeightValue = function (cell) {
    return $_6bq7pnkpjd09ex5h.getRaw(cell, 'height').getOrThunk(function () {
      return $_6pjdl3lqjd09exbg.getHeight(cell) + 'px';
    });
  };
  var convert = function (cell, number, getter, setter) {
    var newSize = $_t50u2jsjd09ex1p.table(cell).map(function (table) {
      var total = getter(table);
      return Math.floor(number / 100 * total);
    }).getOr(number);
    setter(cell, newSize);
    return newSize;
  };
  var normalizePixelSize = function (value, cell, getter, setter) {
    var number = parseInt(value, 10);
    return $_bfonkwkdjd09ex3z.endsWith(value, '%') && $_q4uvfkhjd09ex4i.name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
  };
  var getTotalHeight = function (cell) {
    var value = getHeightValue(cell);
    if (!value)
      return $_75gazclrjd09exbm.get(cell);
    return normalizePixelSize(value, cell, $_75gazclrjd09exbm.get, setHeight);
  };
  var get$6 = function (cell, type, f) {
    var v = f(cell);
    var span = getSpan(cell, type);
    return v / span;
  };
  var getSpan = function (cell, type) {
    return $_d01oh0kgjd09ex47.has(cell, type) ? parseInt($_d01oh0kgjd09ex47.get(cell, type), 10) : 1;
  };
  var getRawWidth = function (element) {
    var cssWidth = $_6bq7pnkpjd09ex5h.getRaw(element, 'width');
    return cssWidth.fold(function () {
      return $_dmlx9ujhjd09ex0f.from($_d01oh0kgjd09ex47.get(element, 'width'));
    }, function (width) {
      return $_dmlx9ujhjd09ex0f.some(width);
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
      var fallbackWidth = $_6cnumhltjd09exbr.get(element);
      var intWidth = parseInt(fallbackWidth, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }
  };
  var getPercentageWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_6cnumhltjd09exbr.get(cell);
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
      var fallbackWidth = $_6cnumhltjd09exbr.get(element);
      return parseInt(fallbackWidth, 10);
    }
  };
  var getPixelWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_6cnumhltjd09exbr.get(cell);
      var intWidth = parseInt(width, 10);
      return intWidth;
    }, function (width) {
      return choosePixelSize(cell, width, tableSize);
    });
  };
  var getHeight$1 = function (cell) {
    return get$6(cell, 'rowspan', getTotalHeight);
  };
  var getGenericWidth = function (cell) {
    var width = getRawWidth(cell);
    return width.bind(function (width) {
      if (genericSizeRegex.test(width)) {
        var match = genericSizeRegex.exec(width);
        return $_dmlx9ujhjd09ex0f.some({
          width: $_e1ub5rjijd09ex0p.constant(match[1]),
          unit: $_e1ub5rjijd09ex0p.constant(match[3])
        });
      } else {
        return $_dmlx9ujhjd09ex0f.none();
      }
    });
  };
  var setGenericWidth = function (cell, amount, unit) {
    $_6bq7pnkpjd09ex5h.set(cell, 'width', amount + unit);
  };
  var $_7u6stblpjd09exb3 = {
    percentageBasedSizeRegex: $_e1ub5rjijd09ex0p.constant(percentageBasedSizeRegex),
    pixelBasedSizeRegex: $_e1ub5rjijd09ex0p.constant(pixelBasedSizeRegex),
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
    var width = $_7u6stblpjd09exb3.getGenericWidth(main);
    width.each(function (width) {
      var newWidth = width.width() / 2;
      $_7u6stblpjd09exb3.setGenericWidth(main, newWidth, width.unit());
      $_7u6stblpjd09exb3.setGenericWidth(other, newWidth, width.unit());
    });
  };
  var $_4u7yjylojd09exb1 = { halve: halve };

  var attached = function (element, scope) {
    var doc = scope || $_f1ygtcjvjd09ex2h.fromDom(document.documentElement);
    return $_d4i6ihkmjd09ex4s.ancestor(element, $_e1ub5rjijd09ex0p.curry($_a4998rjzjd09ex33.eq, doc)).isSome();
  };
  var windowOf = function (element) {
    var dom = element.dom();
    if (dom === dom.window)
      return element;
    return $_q4uvfkhjd09ex4i.isDocument(element) ? dom.defaultView || dom.parentWindow : null;
  };
  var $_c2hc8plyjd09exc5 = {
    attached: attached,
    windowOf: windowOf
  };

  var r = function (left, top) {
    var translate = function (x, y) {
      return r(left + x, top + y);
    };
    return {
      left: $_e1ub5rjijd09ex0p.constant(left),
      top: $_e1ub5rjijd09ex0p.constant(top),
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
    var win = $_c2hc8plyjd09exc5.windowOf($_f1ygtcjvjd09ex2h.fromDom(doc));
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
    var html = $_f1ygtcjvjd09ex2h.fromDom(doc.documentElement);
    if (body === dom)
      return r(body.offsetLeft, body.offsetTop);
    if (!$_c2hc8plyjd09exc5.attached(element, html))
      return r(0, 0);
    return boxPosition(dom);
  };
  var $_614ir5lxjd09exc3 = {
    absolute: absolute,
    relative: relative,
    viewport: viewport
  };

  var rowInfo = $_6c8np0jljd09ex18.immutable('row', 'y');
  var colInfo = $_6c8np0jljd09ex18.immutable('col', 'x');
  var rtlEdge = function (cell) {
    var pos = $_614ir5lxjd09exc3.absolute(cell);
    return pos.left() + $_6cnumhltjd09exbr.getOuter(cell);
  };
  var ltrEdge = function (cell) {
    return $_614ir5lxjd09exc3.absolute(cell).left();
  };
  var getLeftEdge = function (index, cell) {
    return colInfo(index, ltrEdge(cell));
  };
  var getRightEdge = function (index, cell) {
    return colInfo(index, rtlEdge(cell));
  };
  var getTop = function (cell) {
    return $_614ir5lxjd09exc3.absolute(cell).top();
  };
  var getTopEdge = function (index, cell) {
    return rowInfo(index, getTop(cell));
  };
  var getBottomEdge = function (index, cell) {
    return rowInfo(index, getTop(cell) + $_75gazclrjd09exbm.getOuter(cell));
  };
  var findPositions = function (getInnerEdge, getOuterEdge, array) {
    if (array.length === 0)
      return [];
    var lines = $_51vcxojgjd09ex09.map(array.slice(1), function (cellOption, index) {
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
    delta: $_e1ub5rjijd09ex0p.identity,
    positions: $_e1ub5rjijd09ex0p.curry(findPositions, getTopEdge, getBottomEdge),
    edge: getTop
  };
  var ltr = {
    delta: $_e1ub5rjijd09ex0p.identity,
    edge: ltrEdge,
    positions: $_e1ub5rjijd09ex0p.curry(findPositions, getLeftEdge, getRightEdge)
  };
  var rtl = {
    delta: negate,
    edge: rtlEdge,
    positions: $_e1ub5rjijd09ex0p.curry(findPositions, getRightEdge, getLeftEdge)
  };
  var $_194vj8lwjd09exbv = {
    height: height,
    rtl: rtl,
    ltr: ltr
  };

  var $_8i1eflvjd09exbu = {
    ltr: $_194vj8lwjd09exbv.ltr,
    rtl: $_194vj8lwjd09exbv.rtl
  };

  function TableDirection (directionAt) {
    var auto = function (table) {
      return directionAt(table).isRtl() ? $_8i1eflvjd09exbu.rtl : $_8i1eflvjd09exbu.ltr;
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
    var input = $_42cwa1jqjd09ex1g.fromTable(table);
    var warehouse = $_6h2u4hkojd09ex5a.generate(input);
    return warehouse.grid();
  };
  var $_d4vb6cm0jd09exca = { getGridSize: getGridSize };

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
      validate: $_byo4m9jpjd09ex1f.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_a2xgc9jojd09ex1d.validateStrArr('required', required);
    $_a2xgc9jojd09ex1d.checkDupes(required);
    return function (obj) {
      var keys = $_3bxkuvjkjd09ex15.keys(obj);
      var allReqd = $_51vcxojgjd09ex09.forall(required, function (req) {
        return $_51vcxojgjd09ex09.contains(keys, req);
      });
      if (!allReqd)
        $_a2xgc9jojd09ex1d.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_51vcxojgjd09ex09.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_a2xgc9jojd09ex1d.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_51vcxojgjd09ex09.filter(keys, function (key) {
      return !$_51vcxojgjd09ex09.contains(required, key);
    });
    if (unsupported.length > 0)
      $_a2xgc9jojd09ex1d.unsuppMessage(unsupported);
  };
  var allowExtra = $_e1ub5rjijd09ex0p.noop;
  var $_2zb56wm4jd09exd8 = {
    exactly: $_e1ub5rjijd09ex0p.curry(base, handleExact),
    ensure: $_e1ub5rjijd09ex0p.curry(base, allowExtra),
    ensureWith: $_e1ub5rjijd09ex0p.curry(baseWith, allowExtra)
  };

  var elementToData = function (element) {
    var colspan = $_d01oh0kgjd09ex47.has(element, 'colspan') ? parseInt($_d01oh0kgjd09ex47.get(element, 'colspan'), 10) : 1;
    var rowspan = $_d01oh0kgjd09ex47.has(element, 'rowspan') ? parseInt($_d01oh0kgjd09ex47.get(element, 'rowspan'), 10) : 1;
    return {
      element: $_e1ub5rjijd09ex0p.constant(element),
      colspan: $_e1ub5rjijd09ex0p.constant(colspan),
      rowspan: $_e1ub5rjijd09ex0p.constant(rowspan)
    };
  };
  var modification = function (generators, _toData) {
    contract(generators);
    var position = Cell($_dmlx9ujhjd09ex0f.none());
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
        position.set($_dmlx9ujhjd09ex0f.some(replacement));
      recent = $_dmlx9ujhjd09ex0f.some({
        item: element,
        replacement: replacement
      });
      return replacement;
    };
    var recent = $_dmlx9ujhjd09ex0f.none();
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
      var position = Cell($_dmlx9ujhjd09ex0f.none());
      contract(generators);
      var list = [];
      var find = function (element, comparator) {
        return $_51vcxojgjd09ex09.find(list, function (x) {
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
          position.set($_dmlx9ujhjd09ex0f.some(cell));
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
    var position = Cell($_dmlx9ujhjd09ex0f.none());
    var combine = function (cell) {
      if (position.get().isNone())
        position.set($_dmlx9ujhjd09ex0f.some(cell));
      return function () {
        var raw = generators.cell({
          element: $_e1ub5rjijd09ex0p.constant(cell),
          colspan: $_e1ub5rjijd09ex0p.constant(1),
          rowspan: $_e1ub5rjijd09ex0p.constant(1)
        });
        $_6bq7pnkpjd09ex5h.remove(raw, 'width');
        $_6bq7pnkpjd09ex5h.remove(cell, 'width');
        return raw;
      };
    };
    return {
      combine: combine,
      cursor: position.get
    };
  };
  var contract = $_2zb56wm4jd09exd8.exactly([
    'cell',
    'row',
    'replace',
    'gap'
  ]);
  var $_1o0mgem2jd09excx = {
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
    return $_51vcxojgjd09ex09.contains([
      'ol',
      'ul'
    ], tagName);
  };
  var isBlock = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_51vcxojgjd09ex09.contains(blockList, tagName);
  };
  var isFormatting = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_51vcxojgjd09ex09.contains([
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
    return $_51vcxojgjd09ex09.contains([
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isContainer = function (universe, item) {
    return $_51vcxojgjd09ex09.contains([
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
    return $_51vcxojgjd09ex09.contains([
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
  var $_593epcm7jd09exdr = {
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
    return $_593epcm7jd09exdr.isBlock(universe$1, element);
  };
  var isList$1 = function (element) {
    return $_593epcm7jd09exdr.isList(universe$1, element);
  };
  var isFormatting$1 = function (element) {
    return $_593epcm7jd09exdr.isFormatting(universe$1, element);
  };
  var isHeading$1 = function (element) {
    return $_593epcm7jd09exdr.isHeading(universe$1, element);
  };
  var isContainer$1 = function (element) {
    return $_593epcm7jd09exdr.isContainer(universe$1, element);
  };
  var isEmptyTag$1 = function (element) {
    return $_593epcm7jd09exdr.isEmptyTag(universe$1, element);
  };
  var isFrame$1 = function (element) {
    return $_593epcm7jd09exdr.isFrame(universe$1, element);
  };
  var isInline$1 = function (element) {
    return $_593epcm7jd09exdr.isInline(universe$1, element);
  };
  var $_bxiktim6jd09exdo = {
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
      return $_q4uvfkhjd09ex4i.name(el) === 'br';
    };
    var advancedBr = function (children) {
      return $_51vcxojgjd09ex09.forall(children, function (c) {
        return isBr(c) || $_q4uvfkhjd09ex4i.isText(c) && $_3v8a0jkyjd09ex6m.get(c).trim().length === 0;
      });
    };
    var isListItem = function (el) {
      return $_q4uvfkhjd09ex4i.name(el) === 'li' || $_d4i6ihkmjd09ex4s.ancestor(el, $_bxiktim6jd09exdo.isList).isSome();
    };
    var siblingIsBlock = function (el) {
      return $_cunhv4jxjd09ex2m.nextSibling(el).map(function (rightSibling) {
        if ($_bxiktim6jd09exdo.isBlock(rightSibling))
          return true;
        if ($_bxiktim6jd09exdo.isEmptyTag(rightSibling)) {
          return $_q4uvfkhjd09ex4i.name(rightSibling) === 'img' ? false : true;
        }
      }).getOr(false);
    };
    var markCell = function (cell) {
      return $_dczsdckwjd09ex6h.last(cell).bind(function (rightEdge) {
        var rightSiblingIsBlock = siblingIsBlock(rightEdge);
        return $_cunhv4jxjd09ex2m.parent(rightEdge).map(function (parent) {
          return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || $_bxiktim6jd09exdo.isBlock(parent) && !$_a4998rjzjd09ex33.eq(cell, parent) ? [] : [$_f1ygtcjvjd09ex2h.fromTag('br')];
        });
      }).getOr([]);
    };
    var markContent = function () {
      var content = $_51vcxojgjd09ex09.bind(cells, function (cell) {
        var children = $_cunhv4jxjd09ex2m.children(cell);
        return advancedBr(children) ? [] : children.concat(markCell(cell));
      });
      return content.length === 0 ? [$_f1ygtcjvjd09ex2h.fromTag('br')] : content;
    };
    var contents = markContent();
    $_9alt55ksjd09ex5u.empty(cells[0]);
    $_3507pkktjd09ex5w.append(cells[0], contents);
  };
  var $_gc78b4m5jd09exdb = { merge: merge };

  var shallow$1 = function (old, nu) {
    return nu;
  };
  var deep$1 = function (old, nu) {
    var bothObjects = $_byo4m9jpjd09ex1f.isObject(old) && $_byo4m9jpjd09ex1f.isObject(nu);
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
  var $_mf3fhm9jd09exe6 = {
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
    return $_dmlx9ujhjd09ex0f.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return $_dmlx9ujhjd09ex0f.none();
      }
    }
    return $_dmlx9ujhjd09ex0f.some(f.apply(null, r));
  };
  var $_3rmc78majd09exe8 = {
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
    return $_1hu5nejrjd09ex1m.rowcells(cells, gridRow.section());
  };
  var mapCells = function (gridRow, f) {
    var cells = gridRow.cells();
    var r = $_51vcxojgjd09ex09.map(cells, f);
    return $_1hu5nejrjd09ex1m.rowcells(r, gridRow.section());
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
  var $_2y8jacmdjd09exep = {
    addCell: addCell,
    setCells: setCells,
    mutateCell: mutateCell,
    getCell: getCell,
    getCellElement: getCellElement,
    mapCells: mapCells,
    cellLength: cellLength
  };

  var getColumn = function (grid, index) {
    return $_51vcxojgjd09ex09.map(grid, function (row) {
      return $_2y8jacmdjd09exep.getCell(row, index);
    });
  };
  var getRow = function (grid, index) {
    return grid[index];
  };
  var findDiff = function (xs, comp) {
    if (xs.length === 0)
      return 0;
    var first = xs[0];
    var index = $_51vcxojgjd09ex09.findIndex(xs, function (x) {
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
      colspan: $_e1ub5rjijd09ex0p.constant(endColIndex),
      rowspan: $_e1ub5rjijd09ex0p.constant(endRowIndex)
    };
  };
  var $_2p8y3tmcjd09exel = { subgrid: subgrid };

  var toDetails = function (grid, comparator) {
    var seen = $_51vcxojgjd09ex09.map(grid, function (row, ri) {
      return $_51vcxojgjd09ex09.map(row.cells(), function (col, ci) {
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
    return $_51vcxojgjd09ex09.map(grid, function (row, ri) {
      var details = $_51vcxojgjd09ex09.bind(row.cells(), function (cell, ci) {
        if (seen[ri][ci] === false) {
          var result = $_2p8y3tmcjd09exel.subgrid(grid, ri, ci, comparator);
          updateSeen(ri, ci, result.rowspan(), result.colspan());
          return [$_1hu5nejrjd09ex1m.detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew())];
        } else {
          return [];
        }
      });
      return $_1hu5nejrjd09ex1m.rowdetails(details, row.section());
    });
  };
  var toGrid = function (warehouse, generators, isNew) {
    var grid = [];
    for (var i = 0; i < warehouse.grid().rows(); i++) {
      var rowCells = [];
      for (var j = 0; j < warehouse.grid().columns(); j++) {
        var element = $_6h2u4hkojd09ex5a.getAt(warehouse, i, j).map(function (item) {
          return $_1hu5nejrjd09ex1m.elementnew(item.element(), isNew);
        }).getOrThunk(function () {
          return $_1hu5nejrjd09ex1m.elementnew(generators.gap(), true);
        });
        rowCells.push(element);
      }
      var row = $_1hu5nejrjd09ex1m.rowcells(rowCells, warehouse.all()[i].section());
      grid.push(row);
    }
    return grid;
  };
  var $_74ud5qmbjd09exeh = {
    toDetails: toDetails,
    toGrid: toGrid
  };

  var setIfNot = function (element, property, value, ignore) {
    if (value === ignore)
      $_d01oh0kgjd09ex47.remove(element, property);
    else
      $_d01oh0kgjd09ex47.set(element, property, value);
  };
  var render$1 = function (table, grid) {
    var newRows = [];
    var newCells = [];
    var renderSection = function (gridSection, sectionName) {
      var section = $_2ljr38kljd09ex4r.child(table, sectionName).getOrThunk(function () {
        var tb = $_f1ygtcjvjd09ex2h.fromTag(sectionName, $_cunhv4jxjd09ex2m.owner(table).dom());
        $_dzzvfkkrjd09ex5s.append(table, tb);
        return tb;
      });
      $_9alt55ksjd09ex5u.empty(section);
      var rows = $_51vcxojgjd09ex09.map(gridSection, function (row) {
        if (row.isNew()) {
          newRows.push(row.element());
        }
        var tr = row.element();
        $_9alt55ksjd09ex5u.empty(tr);
        $_51vcxojgjd09ex09.each(row.cells(), function (cell) {
          if (cell.isNew()) {
            newCells.push(cell.element());
          }
          setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
          setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
          $_dzzvfkkrjd09ex5s.append(tr, cell.element());
        });
        return tr;
      });
      $_3507pkktjd09ex5w.append(section, rows);
    };
    var removeSection = function (sectionName) {
      $_2ljr38kljd09ex4r.child(table, sectionName).bind($_9alt55ksjd09ex5u.remove);
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
    $_51vcxojgjd09ex09.each(grid, function (row) {
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
      newRows: $_e1ub5rjijd09ex0p.constant(newRows),
      newCells: $_e1ub5rjijd09ex0p.constant(newCells)
    };
  };
  var copy$2 = function (grid) {
    var rows = $_51vcxojgjd09ex09.map(grid, function (row) {
      var tr = $_gblvyukvjd09ex6e.shallow(row.element());
      $_51vcxojgjd09ex09.each(row.cells(), function (cell) {
        var clonedCell = $_gblvyukvjd09ex6e.deep(cell.element());
        setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
        setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
        $_dzzvfkkrjd09ex5s.append(tr, clonedCell);
      });
      return tr;
    });
    return rows;
  };
  var $_a1vejhmejd09exet = {
    render: render$1,
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
    $_51vcxojgjd09ex09.each(xs, function (x, i) {
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
      return $_dmlx9ujhjd09ex0f.none();
    var current = xs[index].fold(function () {
      var rest = $_51vcxojgjd09ex09.reverse(xs.slice(0, index));
      return $_3rmc78majd09exe8.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (c) {
      return $_dmlx9ujhjd09ex0f.some({
        value: c,
        delta: 0
      });
    });
    var next = xs[index + 1].fold(function () {
      var rest = xs.slice(index + 1);
      return $_3rmc78majd09exe8.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (n) {
      return $_dmlx9ujhjd09ex0f.some({
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
  var $_bwbl0imhjd09exfq = {
    repeat: repeat,
    range: range$1,
    unique: unique,
    deduce: deduce
  };

  var columns = function (warehouse) {
    var grid = warehouse.grid();
    var cols = $_bwbl0imhjd09exfq.range(0, grid.columns());
    var rows = $_bwbl0imhjd09exfq.range(0, grid.rows());
    return $_51vcxojgjd09ex09.map(cols, function (col) {
      var getBlock = function () {
        return $_51vcxojgjd09ex09.bind(rows, function (r) {
          return $_6h2u4hkojd09ex5a.getAt(warehouse, r, col).filter(function (detail) {
            return detail.column() === col;
          }).fold($_e1ub5rjijd09ex0p.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.colspan() === 1;
      };
      var getFallback = function () {
        return $_6h2u4hkojd09ex5a.getAt(warehouse, 0, col);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var decide = function (getBlock, isSingle, getFallback) {
    var inBlock = getBlock();
    var singleInBlock = $_51vcxojgjd09ex09.find(inBlock, isSingle);
    var detailOption = singleInBlock.orThunk(function () {
      return $_dmlx9ujhjd09ex0f.from(inBlock[0]).orThunk(getFallback);
    });
    return detailOption.map(function (detail) {
      return detail.element();
    });
  };
  var rows$1 = function (warehouse) {
    var grid = warehouse.grid();
    var rows = $_bwbl0imhjd09exfq.range(0, grid.rows());
    var cols = $_bwbl0imhjd09exfq.range(0, grid.columns());
    return $_51vcxojgjd09ex09.map(rows, function (row) {
      var getBlock = function () {
        return $_51vcxojgjd09ex09.bind(cols, function (c) {
          return $_6h2u4hkojd09ex5a.getAt(warehouse, row, c).filter(function (detail) {
            return detail.row() === row;
          }).fold($_e1ub5rjijd09ex0p.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.rowspan() === 1;
      };
      var getFallback = function () {
        return $_6h2u4hkojd09ex5a.getAt(warehouse, row, 0);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var $_2twbpvmgjd09exfk = {
    columns: columns,
    rows: rows$1
  };

  var col = function (column, x, y, w, h) {
    var blocker = $_f1ygtcjvjd09ex2h.fromTag('div');
    $_6bq7pnkpjd09ex5h.setAll(blocker, {
      position: 'absolute',
      left: x - w / 2 + 'px',
      top: y + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_d01oh0kgjd09ex47.setAll(blocker, {
      'data-column': column,
      'role': 'presentation'
    });
    return blocker;
  };
  var row$1 = function (row, x, y, w, h) {
    var blocker = $_f1ygtcjvjd09ex2h.fromTag('div');
    $_6bq7pnkpjd09ex5h.setAll(blocker, {
      position: 'absolute',
      left: x + 'px',
      top: y - h / 2 + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_d01oh0kgjd09ex47.setAll(blocker, {
      'data-row': row,
      'role': 'presentation'
    });
    return blocker;
  };
  var $_bvjbvamijd09exfx = {
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
  var $_cxho5xmkjd09exg4 = { css: css };

  var styles = $_cxho5xmkjd09exg4.css('ephox-snooker');
  var $_yhrw5mjjd09exg1 = { resolve: styles.resolve };

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
    var value = $_d01oh0kgjd09ex47.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read(element, attr);
    var nu = old.concat([id]);
    $_d01oh0kgjd09ex47.set(element, attr, nu.join(' '));
  };
  var remove$3 = function (element, attr, id) {
    var nu = $_51vcxojgjd09ex09.filter(read(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_d01oh0kgjd09ex47.set(element, attr, nu.join(' '));
    else
      $_d01oh0kgjd09ex47.remove(element, attr);
  };
  var $_58xlo4mojd09exgi = {
    read: read,
    add: add,
    remove: remove$3
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$7 = function (element) {
    return $_58xlo4mojd09exgi.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_58xlo4mojd09exgi.add(element, 'class', clazz);
  };
  var remove$4 = function (element, clazz) {
    return $_58xlo4mojd09exgi.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_51vcxojgjd09ex09.contains(get$7(element), clazz)) {
      remove$4(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_6idyogmnjd09exgf = {
    get: get$7,
    add: add$1,
    remove: remove$4,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_6idyogmnjd09exgf.supports(element))
      element.dom().classList.add(clazz);
    else
      $_6idyogmnjd09exgf.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_6idyogmnjd09exgf.supports(element) ? element.dom().classList : $_6idyogmnjd09exgf.get(element);
    if (classList.length === 0) {
      $_d01oh0kgjd09ex47.remove(element, 'class');
    }
  };
  var remove$5 = function (element, clazz) {
    if ($_6idyogmnjd09exgf.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_6idyogmnjd09exgf.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_6idyogmnjd09exgf.supports(element) ? element.dom().classList.toggle(clazz) : $_6idyogmnjd09exgf.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_6idyogmnjd09exgf.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_6idyogmnjd09exgf.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_6idyogmnjd09exgf.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_6idyogmnjd09exgf.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_dp12qlmljd09exg5 = {
    add: add$2,
    remove: remove$5,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var resizeBar = $_yhrw5mjjd09exg1.resolve('resizer-bar');
  var resizeRowBar = $_yhrw5mjjd09exg1.resolve('resizer-rows');
  var resizeColBar = $_yhrw5mjjd09exg1.resolve('resizer-cols');
  var BAR_THICKNESS = 7;
  var clear = function (wire) {
    var previous = $_baxp2xkijd09ex4k.descendants(wire.parent(), '.' + resizeBar);
    $_51vcxojgjd09ex09.each(previous, $_9alt55ksjd09ex5u.remove);
  };
  var drawBar = function (wire, positions, create) {
    var origin = wire.origin();
    $_51vcxojgjd09ex09.each(positions, function (cpOption, i) {
      cpOption.each(function (cp) {
        var bar = create(origin, cp);
        $_dp12qlmljd09exg5.add(bar, resizeBar);
        $_dzzvfkkrjd09ex5s.append(wire.parent(), bar);
      });
    });
  };
  var refreshCol = function (wire, colPositions, position, tableHeight) {
    drawBar(wire, colPositions, function (origin, cp) {
      var colBar = $_bvjbvamijd09exfx.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
      $_dp12qlmljd09exg5.add(colBar, resizeColBar);
      return colBar;
    });
  };
  var refreshRow = function (wire, rowPositions, position, tableWidth) {
    drawBar(wire, rowPositions, function (origin, cp) {
      var rowBar = $_bvjbvamijd09exfx.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
      $_dp12qlmljd09exg5.add(rowBar, resizeRowBar);
      return rowBar;
    });
  };
  var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
    var position = $_614ir5lxjd09exc3.absolute(table);
    var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
    refreshRow(wire, rowPositions, position, $_6cnumhltjd09exbr.getOuter(table));
    var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
    refreshCol(wire, colPositions, position, $_75gazclrjd09exbm.getOuter(table));
  };
  var refresh = function (wire, table, hdirection, vdirection) {
    clear(wire);
    var list = $_42cwa1jqjd09ex1g.fromTable(table);
    var warehouse = $_6h2u4hkojd09ex5a.generate(list);
    var rows = $_2twbpvmgjd09exfk.rows(warehouse);
    var cols = $_2twbpvmgjd09exfk.columns(warehouse);
    refreshGrid(wire, table, rows, cols, hdirection, vdirection);
  };
  var each$2 = function (wire, f) {
    var bars = $_baxp2xkijd09ex4k.descendants(wire.parent(), '.' + resizeBar);
    $_51vcxojgjd09ex09.each(bars, f);
  };
  var hide = function (wire) {
    each$2(wire, function (bar) {
      $_6bq7pnkpjd09ex5h.set(bar, 'display', 'none');
    });
  };
  var show = function (wire) {
    each$2(wire, function (bar) {
      $_6bq7pnkpjd09ex5h.set(bar, 'display', 'block');
    });
  };
  var isRowBar = function (element) {
    return $_dp12qlmljd09exg5.has(element, resizeRowBar);
  };
  var isColBar = function (element) {
    return $_dp12qlmljd09exg5.has(element, resizeColBar);
  };
  var $_41aemvmfjd09exf7 = {
    refresh: refresh,
    hide: hide,
    show: show,
    destroy: clear,
    isRowBar: isRowBar,
    isColBar: isColBar
  };

  var fromWarehouse = function (warehouse, generators) {
    return $_74ud5qmbjd09exeh.toGrid(warehouse, generators, false);
  };
  var deriveRows = function (rendered, generators) {
    var findRow = function (details) {
      var rowOfCells = $_3rmc78majd09exe8.findMap(details, function (detail) {
        return $_cunhv4jxjd09ex2m.parent(detail.element()).map(function (row) {
          var isNew = $_cunhv4jxjd09ex2m.parent(row).isNone();
          return $_1hu5nejrjd09ex1m.elementnew(row, isNew);
        });
      });
      return rowOfCells.getOrThunk(function () {
        return $_1hu5nejrjd09ex1m.elementnew(generators.row(), true);
      });
    };
    return $_51vcxojgjd09ex09.map(rendered, function (details) {
      var row = findRow(details.details());
      return $_1hu5nejrjd09ex1m.rowdatanew(row.element(), details.details(), details.section(), row.isNew());
    });
  };
  var toDetailList = function (grid, generators) {
    var rendered = $_74ud5qmbjd09exeh.toDetails(grid, $_a4998rjzjd09ex33.eq);
    return deriveRows(rendered, generators);
  };
  var findInWarehouse = function (warehouse, element) {
    var all = $_51vcxojgjd09ex09.flatten($_51vcxojgjd09ex09.map(warehouse.all(), function (r) {
      return r.cells();
    }));
    return $_51vcxojgjd09ex09.find(all, function (e) {
      return $_a4998rjzjd09ex33.eq(element, e.element());
    });
  };
  var run = function (operation, extract, adjustment, postAction, genWrappers) {
    return function (wire, table, target, generators, direction) {
      var input = $_42cwa1jqjd09ex1g.fromTable(table);
      var warehouse = $_6h2u4hkojd09ex5a.generate(input);
      var output = extract(warehouse, target).map(function (info) {
        var model = fromWarehouse(warehouse, generators);
        var result = operation(model, info, $_a4998rjzjd09ex33.eq, genWrappers(generators));
        var grid = toDetailList(result.grid(), generators);
        return {
          grid: $_e1ub5rjijd09ex0p.constant(grid),
          cursor: result.cursor
        };
      });
      return output.fold(function () {
        return $_dmlx9ujhjd09ex0f.none();
      }, function (out) {
        var newElements = $_a1vejhmejd09exet.render(table, out.grid());
        adjustment(table, out.grid(), direction);
        postAction(table);
        $_41aemvmfjd09exf7.refresh(wire, table, $_194vj8lwjd09exbv.height, direction);
        return $_dmlx9ujhjd09ex0f.some({
          cursor: out.cursor,
          newRows: newElements.newRows,
          newCells: newElements.newCells
        });
      });
    };
  };
  var onCell = function (warehouse, target) {
    return $_t50u2jsjd09ex1p.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell);
    });
  };
  var onPaste = function (warehouse, target) {
    return $_t50u2jsjd09ex1p.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell).map(function (details) {
        return $_mf3fhm9jd09exe6.merge(details, {
          generators: target.generators,
          clipboard: target.clipboard
        });
      });
    });
  };
  var onPasteRows = function (warehouse, target) {
    var details = $_51vcxojgjd09ex09.map(target.selection(), function (cell) {
      return $_t50u2jsjd09ex1p.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_3rmc78majd09exe8.cat(details);
    return cells.length > 0 ? $_dmlx9ujhjd09ex0f.some($_mf3fhm9jd09exe6.merge({ cells: cells }, {
      generators: target.generators,
      clipboard: target.clipboard
    })) : $_dmlx9ujhjd09ex0f.none();
  };
  var onMergable = function (warehouse, target) {
    return target.mergable();
  };
  var onUnmergable = function (warehouse, target) {
    return target.unmergable();
  };
  var onCells = function (warehouse, target) {
    var details = $_51vcxojgjd09ex09.map(target.selection(), function (cell) {
      return $_t50u2jsjd09ex1p.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_3rmc78majd09exe8.cat(details);
    return cells.length > 0 ? $_dmlx9ujhjd09ex0f.some(cells) : $_dmlx9ujhjd09ex0f.none();
  };
  var $_4rzg99m8jd09exdw = {
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
      return $_dmlx9ujhjd09ex0f.some(o);
    };
    return {
      is: is,
      isValue: $_e1ub5rjijd09ex0p.constant(true),
      isError: $_e1ub5rjijd09ex0p.constant(false),
      getOr: $_e1ub5rjijd09ex0p.constant(o),
      getOrThunk: $_e1ub5rjijd09ex0p.constant(o),
      getOrDie: $_e1ub5rjijd09ex0p.constant(o),
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
      return $_e1ub5rjijd09ex0p.die(message)();
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
      is: $_e1ub5rjijd09ex0p.constant(false),
      isValue: $_e1ub5rjijd09ex0p.constant(false),
      isError: $_e1ub5rjijd09ex0p.constant(true),
      getOr: $_e1ub5rjijd09ex0p.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_e1ub5rjijd09ex0p.noop,
      bind: bind,
      exists: $_e1ub5rjijd09ex0p.constant(false),
      forall: $_e1ub5rjijd09ex0p.constant(true),
      toOption: $_dmlx9ujhjd09ex0f.none
    };
  };
  var $_508k1omrjd09exgv = {
    value: value$1,
    error: error
  };

  var measure = function (startAddress, gridA, gridB) {
    if (startAddress.row() >= gridA.length || startAddress.column() > $_2y8jacmdjd09exep.cellLength(gridA[0]))
      return $_508k1omrjd09exgv.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
    var rowRemainder = gridA.slice(startAddress.row());
    var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
    var colRequired = $_2y8jacmdjd09exep.cellLength(gridB[0]);
    var rowRequired = gridB.length;
    return $_508k1omrjd09exgv.value({
      rowDelta: $_e1ub5rjijd09ex0p.constant(rowRemainder.length - rowRequired),
      colDelta: $_e1ub5rjijd09ex0p.constant(colRemainder.length - colRequired)
    });
  };
  var measureWidth = function (gridA, gridB) {
    var colLengthA = $_2y8jacmdjd09exep.cellLength(gridA[0]);
    var colLengthB = $_2y8jacmdjd09exep.cellLength(gridB[0]);
    return {
      rowDelta: $_e1ub5rjijd09ex0p.constant(0),
      colDelta: $_e1ub5rjijd09ex0p.constant(colLengthA - colLengthB)
    };
  };
  var fill = function (cells, generator) {
    return $_51vcxojgjd09ex09.map(cells, function () {
      return $_1hu5nejrjd09ex1m.elementnew(generator.cell(), true);
    });
  };
  var rowFill = function (grid, amount, generator) {
    return grid.concat($_bwbl0imhjd09exfq.repeat(amount, function (_row) {
      return $_2y8jacmdjd09exep.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
    }));
  };
  var colFill = function (grid, amount, generator) {
    return $_51vcxojgjd09ex09.map(grid, function (row) {
      return $_2y8jacmdjd09exep.setCells(row, row.cells().concat(fill($_bwbl0imhjd09exfq.range(0, amount), generator)));
    });
  };
  var tailor = function (gridA, delta, generator) {
    var fillCols = delta.colDelta() < 0 ? colFill : $_e1ub5rjijd09ex0p.identity;
    var fillRows = delta.rowDelta() < 0 ? rowFill : $_e1ub5rjijd09ex0p.identity;
    var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
    var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
    return tailoredGrid;
  };
  var $_g3hhrimqjd09exgp = {
    measure: measure,
    measureWidth: measureWidth,
    tailor: tailor
  };

  var merge$2 = function (grid, bounds, comparator, substitution) {
    if (grid.length === 0)
      return grid;
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        $_2y8jacmdjd09exep.mutateCell(grid[i], j, $_1hu5nejrjd09ex1m.elementnew(substitution(), false));
      }
    }
    return grid;
  };
  var unmerge = function (grid, target, comparator, substitution) {
    var first = true;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < $_2y8jacmdjd09exep.cellLength(grid[0]); j++) {
        var current = $_2y8jacmdjd09exep.getCellElement(grid[i], j);
        var isToReplace = comparator(current, target);
        if (isToReplace === true && first === false) {
          $_2y8jacmdjd09exep.mutateCell(grid[i], j, $_1hu5nejrjd09ex1m.elementnew(substitution(), true));
        } else if (isToReplace === true) {
          first = false;
        }
      }
    }
    return grid;
  };
  var uniqueCells = function (row, comparator) {
    return $_51vcxojgjd09ex09.foldl(row, function (rest, cell) {
      return $_51vcxojgjd09ex09.exists(rest, function (currentCell) {
        return comparator(currentCell.element(), cell.element());
      }) ? rest : rest.concat([cell]);
    }, []);
  };
  var splitRows = function (grid, index, comparator, substitution) {
    if (index > 0 && index < grid.length) {
      var rowPrevCells = grid[index - 1].cells();
      var cells = uniqueCells(rowPrevCells, comparator);
      $_51vcxojgjd09ex09.each(cells, function (cell) {
        var replacement = $_dmlx9ujhjd09ex0f.none();
        for (var i = index; i < grid.length; i++) {
          for (var j = 0; j < $_2y8jacmdjd09exep.cellLength(grid[0]); j++) {
            var current = grid[i].cells()[j];
            var isToReplace = comparator(current.element(), cell.element());
            if (isToReplace) {
              if (replacement.isNone()) {
                replacement = $_dmlx9ujhjd09ex0f.some(substitution());
              }
              replacement.each(function (sub) {
                $_2y8jacmdjd09exep.mutateCell(grid[i], j, $_1hu5nejrjd09ex1m.elementnew(sub, true));
              });
            }
          }
        }
      });
    }
    return grid;
  };
  var $_6qbsm1msjd09exgy = {
    merge: merge$2,
    unmerge: unmerge,
    splitRows: splitRows
  };

  var isSpanning = function (grid, row, col, comparator) {
    var candidate = $_2y8jacmdjd09exep.getCell(grid[row], col);
    var matching = $_e1ub5rjijd09ex0p.curry(comparator, candidate.element());
    var currentRow = grid[row];
    return grid.length > 1 && $_2y8jacmdjd09exep.cellLength(currentRow) > 1 && (col > 0 && matching($_2y8jacmdjd09exep.getCellElement(currentRow, col - 1)) || col < currentRow.length - 1 && matching($_2y8jacmdjd09exep.getCellElement(currentRow, col + 1)) || row > 0 && matching($_2y8jacmdjd09exep.getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching($_2y8jacmdjd09exep.getCellElement(grid[row + 1], col)));
  };
  var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
    var startRow = startAddress.row();
    var startCol = startAddress.column();
    var mergeHeight = gridB.length;
    var mergeWidth = $_2y8jacmdjd09exep.cellLength(gridB[0]);
    var endRow = startRow + mergeHeight;
    var endCol = startCol + mergeWidth;
    for (var r = startRow; r < endRow; r++) {
      for (var c = startCol; c < endCol; c++) {
        if (isSpanning(gridA, r, c, comparator)) {
          $_6qbsm1msjd09exgy.unmerge(gridA, $_2y8jacmdjd09exep.getCellElement(gridA[r], c), comparator, generator.cell);
        }
        var newCell = $_2y8jacmdjd09exep.getCellElement(gridB[r - startRow], c - startCol);
        var replacement = generator.replace(newCell);
        $_2y8jacmdjd09exep.mutateCell(gridA[r], c, $_1hu5nejrjd09ex1m.elementnew(replacement, true));
      }
    }
    return gridA;
  };
  var merge$3 = function (startAddress, gridA, gridB, generator, comparator) {
    var result = $_g3hhrimqjd09exgp.measure(startAddress, gridA, gridB);
    return result.map(function (delta) {
      var fittedGrid = $_g3hhrimqjd09exgp.tailor(gridA, delta, generator);
      return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
    });
  };
  var insert$1 = function (index, gridA, gridB, generator, comparator) {
    $_6qbsm1msjd09exgy.splitRows(gridA, index, comparator, generator.cell);
    var delta = $_g3hhrimqjd09exgp.measureWidth(gridB, gridA);
    var fittedNewGrid = $_g3hhrimqjd09exgp.tailor(gridB, delta, generator);
    var secondDelta = $_g3hhrimqjd09exgp.measureWidth(gridA, fittedNewGrid);
    var fittedOldGrid = $_g3hhrimqjd09exgp.tailor(gridA, secondDelta, generator);
    return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
  };
  var $_8u0s90mpjd09exgl = {
    merge: merge$3,
    insert: insert$1
  };

  var insertRowAt = function (grid, index, example, comparator, substitution) {
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_2y8jacmdjd09exep.mapCells(grid[example], function (ex, c) {
      var withinSpan = index > 0 && index < grid.length && comparator($_2y8jacmdjd09exep.getCellElement(grid[index - 1], c), $_2y8jacmdjd09exep.getCellElement(grid[index], c));
      var ret = withinSpan ? $_2y8jacmdjd09exep.getCell(grid[index], c) : $_1hu5nejrjd09ex1m.elementnew(substitution(ex.element(), comparator), true);
      return ret;
    });
    return before.concat([between]).concat(after);
  };
  var insertColumnAt = function (grid, index, example, comparator, substitution) {
    return $_51vcxojgjd09ex09.map(grid, function (row) {
      var withinSpan = index > 0 && index < $_2y8jacmdjd09exep.cellLength(row) && comparator($_2y8jacmdjd09exep.getCellElement(row, index - 1), $_2y8jacmdjd09exep.getCellElement(row, index));
      var sub = withinSpan ? $_2y8jacmdjd09exep.getCell(row, index) : $_1hu5nejrjd09ex1m.elementnew(substitution($_2y8jacmdjd09exep.getCellElement(row, example), comparator), true);
      return $_2y8jacmdjd09exep.addCell(row, index, sub);
    });
  };
  var splitCellIntoColumns = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleCol + 1;
    return $_51vcxojgjd09ex09.map(grid, function (row, i) {
      var isTargetCell = i === exampleRow;
      var sub = isTargetCell ? $_1hu5nejrjd09ex1m.elementnew(substitution($_2y8jacmdjd09exep.getCellElement(row, exampleCol), comparator), true) : $_2y8jacmdjd09exep.getCell(row, exampleCol);
      return $_2y8jacmdjd09exep.addCell(row, index, sub);
    });
  };
  var splitCellIntoRows = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleRow + 1;
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_2y8jacmdjd09exep.mapCells(grid[exampleRow], function (ex, i) {
      var isTargetCell = i === exampleCol;
      return isTargetCell ? $_1hu5nejrjd09ex1m.elementnew(substitution(ex.element(), comparator), true) : ex;
    });
    return before.concat([between]).concat(after);
  };
  var deleteColumnsAt = function (grid, start, finish) {
    var rows = $_51vcxojgjd09ex09.map(grid, function (row) {
      var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
      return $_1hu5nejrjd09ex1m.rowcells(cells, row.section());
    });
    return $_51vcxojgjd09ex09.filter(rows, function (row) {
      return row.cells().length > 0;
    });
  };
  var deleteRowsAt = function (grid, start, finish) {
    return grid.slice(0, start).concat(grid.slice(finish + 1));
  };
  var $_7ieucamtjd09exh4 = {
    insertRowAt: insertRowAt,
    insertColumnAt: insertColumnAt,
    splitCellIntoColumns: splitCellIntoColumns,
    splitCellIntoRows: splitCellIntoRows,
    deleteRowsAt: deleteRowsAt,
    deleteColumnsAt: deleteColumnsAt
  };

  var replaceIn = function (grid, targets, comparator, substitution) {
    var isTarget = function (cell) {
      return $_51vcxojgjd09ex09.exists(targets, function (target) {
        return comparator(cell.element(), target.element());
      });
    };
    return $_51vcxojgjd09ex09.map(grid, function (row) {
      return $_2y8jacmdjd09exep.mapCells(row, function (cell) {
        return isTarget(cell) ? $_1hu5nejrjd09ex1m.elementnew(substitution(cell.element(), comparator), true) : cell;
      });
    });
  };
  var notStartRow = function (grid, rowIndex, colIndex, comparator) {
    return $_2y8jacmdjd09exep.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator($_2y8jacmdjd09exep.getCellElement(grid[rowIndex - 1], colIndex), $_2y8jacmdjd09exep.getCellElement(grid[rowIndex], colIndex)));
  };
  var notStartColumn = function (row, index, comparator) {
    return index > 0 && comparator($_2y8jacmdjd09exep.getCellElement(row, index - 1), $_2y8jacmdjd09exep.getCellElement(row, index));
  };
  var replaceColumn = function (grid, index, comparator, substitution) {
    var targets = $_51vcxojgjd09ex09.bind(grid, function (row, i) {
      var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
      return alreadyAdded ? [] : [$_2y8jacmdjd09exep.getCell(row, index)];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var replaceRow = function (grid, index, comparator, substitution) {
    var targetRow = grid[index];
    var targets = $_51vcxojgjd09ex09.bind(targetRow.cells(), function (item, i) {
      var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
      return alreadyAdded ? [] : [item];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var $_31jccumujd09exh8 = {
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
  var $_9hov78mxjd09exhm = {
    none: none$1,
    only: only,
    left: left,
    middle: middle,
    right: right
  };

  var neighbours$1 = function (input, index) {
    if (input.length === 0)
      return $_9hov78mxjd09exhm.none();
    if (input.length === 1)
      return $_9hov78mxjd09exhm.only(0);
    if (index === 0)
      return $_9hov78mxjd09exhm.left(0, 1);
    if (index === input.length - 1)
      return $_9hov78mxjd09exhm.right(index - 1, index);
    if (index > 0 && index < input.length - 1)
      return $_9hov78mxjd09exhm.middle(index - 1, index, index + 1);
    return $_9hov78mxjd09exhm.none();
  };
  var determine = function (input, column, step, tableSize) {
    var result = input.slice(0);
    var context = neighbours$1(input, column);
    var zero = function (array) {
      return $_51vcxojgjd09ex09.map(array, $_e1ub5rjijd09ex0p.constant(0));
    };
    var onNone = $_e1ub5rjijd09ex0p.constant(zero(result));
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
  var $_aym55vmwjd09exhi = { determine: determine };

  var getSpan$1 = function (cell, type) {
    return $_d01oh0kgjd09ex47.has(cell, type) && parseInt($_d01oh0kgjd09ex47.get(cell, type), 10) > 1;
  };
  var hasColspan = function (cell) {
    return getSpan$1(cell, 'colspan');
  };
  var hasRowspan = function (cell) {
    return getSpan$1(cell, 'rowspan');
  };
  var getInt = function (element, property) {
    return parseInt($_6bq7pnkpjd09ex5h.get(element, property), 10);
  };
  var $_c13nljmzjd09exhv = {
    hasColspan: hasColspan,
    hasRowspan: hasRowspan,
    minWidth: $_e1ub5rjijd09ex0p.constant(10),
    minHeight: $_e1ub5rjijd09ex0p.constant(10),
    getInt: getInt
  };

  var getRaw$1 = function (cell, property, getter) {
    return $_6bq7pnkpjd09ex5h.getRaw(cell, property).fold(function () {
      return getter(cell) + 'px';
    }, function (raw) {
      return raw;
    });
  };
  var getRawW = function (cell) {
    return getRaw$1(cell, 'width', $_7u6stblpjd09exb3.getPixelWidth);
  };
  var getRawH = function (cell) {
    return getRaw$1(cell, 'height', $_7u6stblpjd09exb3.getHeight);
  };
  var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
    var columns = $_2twbpvmgjd09exfk.columns(warehouse);
    var backups = $_51vcxojgjd09ex09.map(columns, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_51vcxojgjd09ex09.map(columns, function (cellOption, c) {
      var columnCell = cellOption.filter($_e1ub5rjijd09ex0p.not($_c13nljmzjd09exhv.hasColspan));
      return columnCell.fold(function () {
        var deduced = $_bwbl0imhjd09exfq.deduce(backups, c);
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
    return getWidthFrom(warehouse, direction, $_7u6stblpjd09exb3.getPercentageWidth, function (deduced) {
      return deduced.fold(function () {
        return tableSize.minCellWidth();
      }, function (cellWidth) {
        return cellWidth / tableSize.pixelWidth() * 100;
      });
    }, tableSize);
  };
  var getPixelWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_7u6stblpjd09exb3.getPixelWidth, function (deduced) {
      return deduced.getOrThunk(tableSize.minCellWidth);
    }, tableSize);
  };
  var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
    var rows = $_2twbpvmgjd09exfk.rows(warehouse);
    var backups = $_51vcxojgjd09ex09.map(rows, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_51vcxojgjd09ex09.map(rows, function (cellOption, c) {
      var rowCell = cellOption.filter($_e1ub5rjijd09ex0p.not($_c13nljmzjd09exhv.hasRowspan));
      return rowCell.fold(function () {
        var deduced = $_bwbl0imhjd09exfq.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getHeight(cell);
      });
    });
  };
  var getPixelHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, $_7u6stblpjd09exb3.getHeight, function (deduced) {
      return deduced.getOrThunk($_c13nljmzjd09exhv.minHeight);
    });
  };
  var getRawHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, getRawH, getDeduced);
  };
  var $_7e38jmyjd09exhp = {
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
    var all = $_6h2u4hkojd09ex5a.justCells(warehouse);
    return $_51vcxojgjd09ex09.map(all, function (cell) {
      var width = total(cell.column(), cell.column() + cell.colspan(), widths);
      return {
        element: cell.element,
        width: $_e1ub5rjijd09ex0p.constant(width),
        colspan: cell.colspan
      };
    });
  };
  var recalculateHeight = function (warehouse, heights) {
    var all = $_6h2u4hkojd09ex5a.justCells(warehouse);
    return $_51vcxojgjd09ex09.map(all, function (cell) {
      var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
      return {
        element: cell.element,
        height: $_e1ub5rjijd09ex0p.constant(height),
        rowspan: cell.rowspan
      };
    });
  };
  var matchRowHeight = function (warehouse, heights) {
    return $_51vcxojgjd09ex09.map(warehouse.all(), function (row, i) {
      return {
        element: row.element,
        height: $_e1ub5rjijd09ex0p.constant(heights[i])
      };
    });
  };
  var $_f22uevn0jd09exi0 = {
    recalculateWidth: recalculateWidth,
    recalculateHeight: recalculateHeight,
    matchRowHeight: matchRowHeight
  };

  var percentageSize = function (width, element) {
    var floatWidth = parseFloat(width);
    var pixelWidth = $_6cnumhltjd09exbr.get(element);
    var getCellDelta = function (delta) {
      return delta / pixelWidth * 100;
    };
    var singleColumnWidth = function (width, _delta) {
      return [100 - width];
    };
    var minCellWidth = function () {
      return $_c13nljmzjd09exhv.minWidth() / pixelWidth * 100;
    };
    var setTableWidth = function (table, _newWidths, delta) {
      var total = floatWidth + delta;
      $_7u6stblpjd09exb3.setPercentageWidth(table, total);
    };
    return {
      width: $_e1ub5rjijd09ex0p.constant(floatWidth),
      pixelWidth: $_e1ub5rjijd09ex0p.constant(pixelWidth),
      getWidths: $_7e38jmyjd09exhp.getPercentageWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: minCellWidth,
      setElementWidth: $_7u6stblpjd09exb3.setPercentageWidth,
      setTableWidth: setTableWidth
    };
  };
  var pixelSize = function (width) {
    var intWidth = parseInt(width, 10);
    var getCellDelta = $_e1ub5rjijd09ex0p.identity;
    var singleColumnWidth = function (width, delta) {
      var newNext = Math.max($_c13nljmzjd09exhv.minWidth(), width + delta);
      return [newNext - width];
    };
    var setTableWidth = function (table, newWidths, _delta) {
      var total = $_51vcxojgjd09ex09.foldr(newWidths, function (b, a) {
        return b + a;
      }, 0);
      $_7u6stblpjd09exb3.setPixelWidth(table, total);
    };
    return {
      width: $_e1ub5rjijd09ex0p.constant(intWidth),
      pixelWidth: $_e1ub5rjijd09ex0p.constant(intWidth),
      getWidths: $_7e38jmyjd09exhp.getPixelWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: $_c13nljmzjd09exhv.minWidth,
      setElementWidth: $_7u6stblpjd09exb3.setPixelWidth,
      setTableWidth: setTableWidth
    };
  };
  var chooseSize = function (element, width) {
    if ($_7u6stblpjd09exb3.percentageBasedSizeRegex().test(width)) {
      var percentMatch = $_7u6stblpjd09exb3.percentageBasedSizeRegex().exec(width);
      return percentageSize(percentMatch[1], element);
    } else if ($_7u6stblpjd09exb3.pixelBasedSizeRegex().test(width)) {
      var pixelMatch = $_7u6stblpjd09exb3.pixelBasedSizeRegex().exec(width);
      return pixelSize(pixelMatch[1]);
    } else {
      var fallbackWidth = $_6cnumhltjd09exbr.get(element);
      return pixelSize(fallbackWidth);
    }
  };
  var getTableSize = function (element) {
    var width = $_7u6stblpjd09exb3.getRawWidth(element);
    return width.fold(function () {
      var fallbackWidth = $_6cnumhltjd09exbr.get(element);
      return pixelSize(fallbackWidth);
    }, function (width) {
      return chooseSize(element, width);
    });
  };
  var $_7j649on1jd09exi5 = { getTableSize: getTableSize };

  var getWarehouse$1 = function (list) {
    return $_6h2u4hkojd09ex5a.generate(list);
  };
  var sumUp = function (newSize) {
    return $_51vcxojgjd09ex09.foldr(newSize, function (b, a) {
      return b + a;
    }, 0);
  };
  var getTableWarehouse = function (table) {
    var list = $_42cwa1jqjd09ex1g.fromTable(table);
    return getWarehouse$1(list);
  };
  var adjustWidth = function (table, delta, index, direction) {
    var tableSize = $_7j649on1jd09exi5.getTableSize(table);
    var step = tableSize.getCellDelta(delta);
    var warehouse = getTableWarehouse(table);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var deltas = $_aym55vmwjd09exhi.determine(widths, index, step, tableSize);
    var newWidths = $_51vcxojgjd09ex09.map(deltas, function (dx, i) {
      return dx + widths[i];
    });
    var newSizes = $_f22uevn0jd09exi0.recalculateWidth(warehouse, newWidths);
    $_51vcxojgjd09ex09.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    if (index === warehouse.grid().columns() - 1) {
      tableSize.setTableWidth(table, newWidths, step);
    }
  };
  var adjustHeight = function (table, delta, index, direction) {
    var warehouse = getTableWarehouse(table);
    var heights = $_7e38jmyjd09exhp.getPixelHeights(warehouse, direction);
    var newHeights = $_51vcxojgjd09ex09.map(heights, function (dy, i) {
      return index === i ? Math.max(delta + dy, $_c13nljmzjd09exhv.minHeight()) : dy;
    });
    var newCellSizes = $_f22uevn0jd09exi0.recalculateHeight(warehouse, newHeights);
    var newRowSizes = $_f22uevn0jd09exi0.matchRowHeight(warehouse, newHeights);
    $_51vcxojgjd09ex09.each(newRowSizes, function (row) {
      $_7u6stblpjd09exb3.setHeight(row.element(), row.height());
    });
    $_51vcxojgjd09ex09.each(newCellSizes, function (cell) {
      $_7u6stblpjd09exb3.setHeight(cell.element(), cell.height());
    });
    var total = sumUp(newHeights);
    $_7u6stblpjd09exb3.setHeight(table, total);
  };
  var adjustWidthTo = function (table, list, direction) {
    var tableSize = $_7j649on1jd09exi5.getTableSize(table);
    var warehouse = getWarehouse$1(list);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var newSizes = $_f22uevn0jd09exi0.recalculateWidth(warehouse, widths);
    $_51vcxojgjd09ex09.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    var total = $_51vcxojgjd09ex09.foldr(widths, function (b, a) {
      return a + b;
    }, 0);
    if (newSizes.length > 0) {
      tableSize.setElementWidth(table, total);
    }
  };
  var $_1bde7rmvjd09exhc = {
    adjustWidth: adjustWidth,
    adjustHeight: adjustHeight,
    adjustWidthTo: adjustWidthTo
  };

  var prune = function (table) {
    var cells = $_t50u2jsjd09ex1p.cells(table);
    if (cells.length === 0)
      $_9alt55ksjd09ex5u.remove(table);
  };
  var outcome = $_6c8np0jljd09ex18.immutable('grid', 'cursor');
  var elementFromGrid = function (grid, row, column) {
    return findIn(grid, row, column).orThunk(function () {
      return findIn(grid, 0, 0);
    });
  };
  var findIn = function (grid, row, column) {
    return $_dmlx9ujhjd09ex0f.from(grid[row]).bind(function (r) {
      return $_dmlx9ujhjd09ex0f.from(r.cells()[column]).bind(function (c) {
        return $_dmlx9ujhjd09ex0f.from(c.element());
      });
    });
  };
  var bundle = function (grid, row, column) {
    return outcome(grid, findIn(grid, row, column));
  };
  var uniqueRows = function (details) {
    return $_51vcxojgjd09ex09.foldl(details, function (rest, detail) {
      return $_51vcxojgjd09ex09.exists(rest, function (currentDetail) {
        return currentDetail.row() === detail.row();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.row() - detailB.row();
    });
  };
  var uniqueColumns = function (details) {
    return $_51vcxojgjd09ex09.foldl(details, function (rest, detail) {
      return $_51vcxojgjd09ex09.exists(rest, function (currentDetail) {
        return currentDetail.column() === detail.column();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.column() - detailB.column();
    });
  };
  var insertRowBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row();
    var newGrid = $_7ieucamtjd09exh4.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsBefore = function (grid, details, comparator, genWrappers) {
    var example = details[0].row();
    var targetIndex = details[0].row();
    var rows = uniqueRows(details);
    var newGrid = $_51vcxojgjd09ex09.foldl(rows, function (newGrid, _row) {
      return $_7ieucamtjd09exh4.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertRowAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row() + detail.rowspan();
    var newGrid = $_7ieucamtjd09exh4.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsAfter = function (grid, details, comparator, genWrappers) {
    var rows = uniqueRows(details);
    var example = rows[rows.length - 1].row();
    var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
    var newGrid = $_51vcxojgjd09ex09.foldl(rows, function (newGrid, _row) {
      return $_7ieucamtjd09exh4.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column();
    var newGrid = $_7ieucamtjd09exh4.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
    var columns = uniqueColumns(details);
    var example = columns[0].column();
    var targetIndex = columns[0].column();
    var newGrid = $_51vcxojgjd09ex09.foldl(columns, function (newGrid, _row) {
      return $_7ieucamtjd09exh4.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column() + detail.colspan();
    var newGrid = $_7ieucamtjd09exh4.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
    var example = details[details.length - 1].column();
    var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
    var columns = uniqueColumns(details);
    var newGrid = $_51vcxojgjd09ex09.foldl(columns, function (newGrid, _row) {
      return $_7ieucamtjd09exh4.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var makeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_31jccumujd09exh8.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_31jccumujd09exh8.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_31jccumujd09exh8.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_31jccumujd09exh8.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoColumns$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_7ieucamtjd09exh4.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoRows$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_7ieucamtjd09exh4.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var eraseColumns = function (grid, details, comparator, _genWrappers) {
    var columns = uniqueColumns(details);
    var newGrid = $_7ieucamtjd09exh4.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var eraseRows = function (grid, details, comparator, _genWrappers) {
    var rows = uniqueRows(details);
    var newGrid = $_7ieucamtjd09exh4.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var mergeCells = function (grid, mergable, comparator, _genWrappers) {
    var cells = mergable.cells();
    $_gc78b4m5jd09exdb.merge(cells);
    var newGrid = $_6qbsm1msjd09exgy.merge(grid, mergable.bounds(), comparator, $_e1ub5rjijd09ex0p.constant(cells[0]));
    return outcome(newGrid, $_dmlx9ujhjd09ex0f.from(cells[0]));
  };
  var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
    var newGrid = $_51vcxojgjd09ex09.foldr(unmergable, function (b, cell) {
      return $_6qbsm1msjd09exgy.unmerge(b, cell, comparator, genWrappers.combine(cell));
    }, grid);
    return outcome(newGrid, $_dmlx9ujhjd09ex0f.from(unmergable[0]));
  };
  var pasteCells = function (grid, pasteDetails, comparator, genWrappers) {
    var gridify = function (table, generators) {
      var list = $_42cwa1jqjd09ex1g.fromTable(table);
      var wh = $_6h2u4hkojd09ex5a.generate(list);
      return $_74ud5qmbjd09exeh.toGrid(wh, generators, true);
    };
    var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
    var startAddress = $_1hu5nejrjd09ex1m.address(pasteDetails.row(), pasteDetails.column());
    var mergedGrid = $_8u0s90mpjd09exgl.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
    return mergedGrid.fold(function () {
      return outcome(grid, $_dmlx9ujhjd09ex0f.some(pasteDetails.element()));
    }, function (nuGrid) {
      var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
      return outcome(nuGrid, cursor);
    });
  };
  var gridifyRows = function (rows, generators, example) {
    var pasteDetails = $_42cwa1jqjd09ex1g.fromPastedRows(rows, example);
    var wh = $_6h2u4hkojd09ex5a.generate(pasteDetails);
    return $_74ud5qmbjd09exeh.toGrid(wh, generators, true);
  };
  var pasteRowsBefore = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[0].row();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_8u0s90mpjd09exgl.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var pasteRowsAfter = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_8u0s90mpjd09exgl.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var resize = $_1bde7rmvjd09exhc.adjustWidthTo;
  var $_7hqjslm1jd09excd = {
    insertRowBefore: $_4rzg99m8jd09exdw.run(insertRowBefore, $_4rzg99m8jd09exdw.onCell, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    insertRowsBefore: $_4rzg99m8jd09exdw.run(insertRowsBefore, $_4rzg99m8jd09exdw.onCells, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    insertRowAfter: $_4rzg99m8jd09exdw.run(insertRowAfter, $_4rzg99m8jd09exdw.onCell, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    insertRowsAfter: $_4rzg99m8jd09exdw.run(insertRowsAfter, $_4rzg99m8jd09exdw.onCells, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    insertColumnBefore: $_4rzg99m8jd09exdw.run(insertColumnBefore, $_4rzg99m8jd09exdw.onCell, resize, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    insertColumnsBefore: $_4rzg99m8jd09exdw.run(insertColumnsBefore, $_4rzg99m8jd09exdw.onCells, resize, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    insertColumnAfter: $_4rzg99m8jd09exdw.run(insertColumnAfter, $_4rzg99m8jd09exdw.onCell, resize, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    insertColumnsAfter: $_4rzg99m8jd09exdw.run(insertColumnsAfter, $_4rzg99m8jd09exdw.onCells, resize, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    splitCellIntoColumns: $_4rzg99m8jd09exdw.run(splitCellIntoColumns$1, $_4rzg99m8jd09exdw.onCell, resize, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    splitCellIntoRows: $_4rzg99m8jd09exdw.run(splitCellIntoRows$1, $_4rzg99m8jd09exdw.onCell, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    eraseColumns: $_4rzg99m8jd09exdw.run(eraseColumns, $_4rzg99m8jd09exdw.onCells, resize, prune, $_1o0mgem2jd09excx.modification),
    eraseRows: $_4rzg99m8jd09exdw.run(eraseRows, $_4rzg99m8jd09exdw.onCells, $_e1ub5rjijd09ex0p.noop, prune, $_1o0mgem2jd09excx.modification),
    makeColumnHeader: $_4rzg99m8jd09exdw.run(makeColumnHeader, $_4rzg99m8jd09exdw.onCell, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.transform('row', 'th')),
    unmakeColumnHeader: $_4rzg99m8jd09exdw.run(unmakeColumnHeader, $_4rzg99m8jd09exdw.onCell, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.transform(null, 'td')),
    makeRowHeader: $_4rzg99m8jd09exdw.run(makeRowHeader, $_4rzg99m8jd09exdw.onCell, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.transform('col', 'th')),
    unmakeRowHeader: $_4rzg99m8jd09exdw.run(unmakeRowHeader, $_4rzg99m8jd09exdw.onCell, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.transform(null, 'td')),
    mergeCells: $_4rzg99m8jd09exdw.run(mergeCells, $_4rzg99m8jd09exdw.onMergable, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.merging),
    unmergeCells: $_4rzg99m8jd09exdw.run(unmergeCells, $_4rzg99m8jd09exdw.onUnmergable, resize, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.merging),
    pasteCells: $_4rzg99m8jd09exdw.run(pasteCells, $_4rzg99m8jd09exdw.onPaste, resize, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    pasteRowsBefore: $_4rzg99m8jd09exdw.run(pasteRowsBefore, $_4rzg99m8jd09exdw.onPasteRows, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification),
    pasteRowsAfter: $_4rzg99m8jd09exdw.run(pasteRowsAfter, $_4rzg99m8jd09exdw.onPasteRows, $_e1ub5rjijd09ex0p.noop, $_e1ub5rjijd09ex0p.noop, $_1o0mgem2jd09excx.modification)
  };

  var getBody$1 = function (editor) {
    return $_f1ygtcjvjd09ex2h.fromDom(editor.getBody());
  };
  var getIsRoot = function (editor) {
    return function (element) {
      return $_a4998rjzjd09ex33.eq(element, getBody$1(editor));
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
  var $_5ioit5n2jd09exij = {
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
    return $_6bq7pnkpjd09ex5h.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_9yh3pwn4jd09exip = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var ltr$1 = { isRtl: $_e1ub5rjijd09ex0p.constant(false) };
  var rtl$1 = { isRtl: $_e1ub5rjijd09ex0p.constant(true) };
  var directionAt = function (element) {
    var dir = $_9yh3pwn4jd09exip.getDirection(element);
    return dir === 'rtl' ? rtl$1 : ltr$1;
  };
  var $_2pqq9jn3jd09exim = { directionAt: directionAt };

  function TableActions (editor, lazyWire) {
    var isTableBody = function (editor) {
      return $_q4uvfkhjd09ex4i.name($_5ioit5n2jd09exij.getBody(editor)) === 'table';
    };
    var lastRowGuard = function (table) {
      var size = $_d4vb6cm0jd09exca.getGridSize(table);
      return isTableBody(editor) === false || size.rows() > 1;
    };
    var lastColumnGuard = function (table) {
      var size = $_d4vb6cm0jd09exca.getGridSize(table);
      return isTableBody(editor) === false || size.columns() > 1;
    };
    var fireNewRow = function (node) {
      editor.fire('newrow', { node: node.dom() });
      return node.dom();
    };
    var fireNewCell = function (node) {
      editor.fire('newcell', { node: node.dom() });
      return node.dom();
    };
    var cloneFormatsArray;
    if (editor.settings.table_clone_elements !== false) {
      if (typeof editor.settings.table_clone_elements === 'string') {
        cloneFormatsArray = editor.settings.table_clone_elements.split(/[ ,]/);
      } else if (Array.isArray(editor.settings.table_clone_elements)) {
        cloneFormatsArray = editor.settings.table_clone_elements;
      }
    }
    var cloneFormats = $_dmlx9ujhjd09ex0f.from(cloneFormatsArray);
    var execute = function (operation, guard, mutate, lazyWire) {
      return function (table, target) {
        var dataStyleCells = $_baxp2xkijd09ex4k.descendants(table, 'td[data-mce-style],th[data-mce-style]');
        $_51vcxojgjd09ex09.each(dataStyleCells, function (cell) {
          $_d01oh0kgjd09ex47.remove(cell, 'data-mce-style');
        });
        var wire = lazyWire();
        var doc = $_f1ygtcjvjd09ex2h.fromDom(editor.getDoc());
        var direction = TableDirection($_2pqq9jn3jd09exim.directionAt);
        var generators = $_5vywgckujd09ex5z.cellOperations(mutate, doc, cloneFormats);
        return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
          $_51vcxojgjd09ex09.each(result.newRows(), function (row) {
            fireNewRow(row);
          });
          $_51vcxojgjd09ex09.each(result.newCells(), function (cell) {
            fireNewCell(cell);
          });
          return result.cursor().map(function (cell) {
            var rng = editor.dom.createRng();
            rng.setStart(cell.dom(), 0);
            rng.setEnd(cell.dom(), 0);
            return rng;
          });
        }) : $_dmlx9ujhjd09ex0f.none();
      };
    };
    var deleteRow = execute($_7hqjslm1jd09excd.eraseRows, lastRowGuard, $_e1ub5rjijd09ex0p.noop, lazyWire);
    var deleteColumn = execute($_7hqjslm1jd09excd.eraseColumns, lastColumnGuard, $_e1ub5rjijd09ex0p.noop, lazyWire);
    var insertRowsBefore = execute($_7hqjslm1jd09excd.insertRowsBefore, $_e1ub5rjijd09ex0p.always, $_e1ub5rjijd09ex0p.noop, lazyWire);
    var insertRowsAfter = execute($_7hqjslm1jd09excd.insertRowsAfter, $_e1ub5rjijd09ex0p.always, $_e1ub5rjijd09ex0p.noop, lazyWire);
    var insertColumnsBefore = execute($_7hqjslm1jd09excd.insertColumnsBefore, $_e1ub5rjijd09ex0p.always, $_4u7yjylojd09exb1.halve, lazyWire);
    var insertColumnsAfter = execute($_7hqjslm1jd09excd.insertColumnsAfter, $_e1ub5rjijd09ex0p.always, $_4u7yjylojd09exb1.halve, lazyWire);
    var mergeCells = execute($_7hqjslm1jd09excd.mergeCells, $_e1ub5rjijd09ex0p.always, $_e1ub5rjijd09ex0p.noop, lazyWire);
    var unmergeCells = execute($_7hqjslm1jd09excd.unmergeCells, $_e1ub5rjijd09ex0p.always, $_e1ub5rjijd09ex0p.noop, lazyWire);
    var pasteRowsBefore = execute($_7hqjslm1jd09excd.pasteRowsBefore, $_e1ub5rjijd09ex0p.always, $_e1ub5rjijd09ex0p.noop, lazyWire);
    var pasteRowsAfter = execute($_7hqjslm1jd09excd.pasteRowsAfter, $_e1ub5rjijd09ex0p.always, $_e1ub5rjijd09ex0p.noop, lazyWire);
    var pasteCells = execute($_7hqjslm1jd09excd.pasteCells, $_e1ub5rjijd09ex0p.always, $_e1ub5rjijd09ex0p.noop, lazyWire);
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
  }

  var copyRows = function (table, target, generators) {
    var list = $_42cwa1jqjd09ex1g.fromTable(table);
    var house = $_6h2u4hkojd09ex5a.generate(list);
    var details = $_4rzg99m8jd09exdw.onCells(house, target);
    return details.map(function (selectedCells) {
      var grid = $_74ud5qmbjd09exeh.toGrid(house, generators, false);
      var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
      var slicedDetails = $_4rzg99m8jd09exdw.toDetailList(slicedGrid, generators);
      return $_a1vejhmejd09exet.copy(slicedDetails);
    });
  };
  var $_29az3wn6jd09exj1 = { copyRows: copyRows };

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

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
    Tools.each('left center right'.split(' '), function (name) {
      editor.formatter.remove('align' + name, {}, elm);
    });
  };
  var unApplyVAlign = function (editor, elm) {
    Tools.each('top middle bottom'.split(' '), function (name) {
      editor.formatter.remove('valign' + name, {}, elm);
    });
  };
  var $_8ghqi9najd09exjc = {
    applyAlign: applyAlign,
    applyVAlign: applyVAlign,
    unApplyAlign: unApplyAlign,
    unApplyVAlign: unApplyVAlign,
    getTDTHOverallStyle: getTDTHOverallStyle
  };

  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      Tools.each(values, function (item) {
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
      css.width = data.width ? $_5ioit5n2jd09exij.addSizeSuffix(data.width) : '';
      css.height = data.height ? $_5ioit5n2jd09exij.addSizeSuffix(data.height) : '';
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
      var colorPickerCallback = editor.settings.color_picker_callback;
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
      defaults: { onchange: $_e1ub5rjijd09ex0p.curry(updateStyleField, editor) },
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
              onselect: $_e1ub5rjijd09ex0p.curry(updateStyleField, editor),
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
  var $_f3a12vnbjd09exje = {
    createStyleForm: createStyleForm,
    buildListItems: buildListItems,
    updateStyleField: updateStyleField,
    extractAdvancedStyles: extractAdvancedStyles
  };

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
  var extractDataFromElement = function (editor, tableElm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(tableElm, 'width') || dom.getAttrib(tableElm, 'width'),
      height: dom.getStyle(tableElm, 'height') || dom.getAttrib(tableElm, 'height'),
      cellspacing: dom.getStyle(tableElm, 'border-spacing') || dom.getAttrib(tableElm, 'cellspacing'),
      cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') || $_8ghqi9najd09exjc.getTDTHOverallStyle(editor.dom, tableElm, 'padding'),
      border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') || $_8ghqi9najd09exjc.getTDTHOverallStyle(editor.dom, tableElm, 'border'),
      borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
      caption: !!dom.select('caption', tableElm)[0],
      class: dom.getAttrib(tableElm, 'class')
    };
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(tableElm, 'align' + name)) {
        data.align = name;
      }
    });
    if (editor.settings.table_advtab !== false) {
      Tools.extend(data, $_f3a12vnbjd09exje.extractAdvancedStyles(dom, tableElm));
    }
    return data;
  };
  var applyDataToElement = function (editor, tableElm, data) {
    var dom = editor.dom;
    var attrs = {};
    var styles = {};
    attrs.class = data.class;
    styles.height = $_5ioit5n2jd09exij.addSizeSuffix(data.height);
    if (dom.getAttrib(tableElm, 'width') && !editor.settings.table_style_by_css) {
      attrs.width = $_5ioit5n2jd09exij.removePxSuffix(data.width);
    } else {
      styles.width = $_5ioit5n2jd09exij.addSizeSuffix(data.width);
    }
    if (editor.settings.table_style_by_css) {
      styles['border-width'] = $_5ioit5n2jd09exij.addSizeSuffix(data.border);
      styles['border-spacing'] = $_5ioit5n2jd09exij.addSizeSuffix(data.cellspacing);
      Tools.extend(attrs, {
        'data-mce-border-color': data.borderColor,
        'data-mce-cell-padding': data.cellpadding,
        'data-mce-border': data.border
      });
    } else {
      Tools.extend(attrs, {
        border: data.border,
        cellpadding: data.cellpadding,
        cellspacing: data.cellspacing
      });
    }
    if (editor.settings.table_style_by_css) {
      if (tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': $_5ioit5n2jd09exij.addSizeSuffix(data.border),
            'border-color': data.borderColor,
            'padding': $_5ioit5n2jd09exij.addSizeSuffix(data.cellpadding)
          });
        }
      }
    }
    if (data.style) {
      Tools.extend(styles, dom.parseStyle(data.style));
    } else {
      styles = Tools.extend({}, dom.parseStyle(dom.getAttrib(tableElm, 'style')), styles);
    }
    attrs.style = dom.serializeStyle(styles);
    dom.setAttribs(tableElm, attrs);
  };
  var onSubmitTableForm = function (editor, tableElm, evt) {
    var dom = editor.dom;
    var captionElm;
    var data;
    $_f3a12vnbjd09exje.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    if (data.class === false) {
      delete data.class;
    }
    editor.undoManager.transact(function () {
      if (!tableElm) {
        tableElm = $_f5phx5ljjd09exa0.insert(editor, data.cols || 1, data.rows || 1);
      }
      applyDataToElement(editor, tableElm, data);
      captionElm = dom.select('caption', tableElm)[0];
      if (captionElm && !data.caption) {
        dom.remove(captionElm);
      }
      if (!captionElm && data.caption) {
        captionElm = dom.create('caption');
        captionElm.innerHTML = !Env.ie ? '<br data-mce-bogus="1"/>' : '\xA0';
        tableElm.insertBefore(captionElm, tableElm.firstChild);
      }
      $_8ghqi9najd09exjc.unApplyAlign(editor, tableElm);
      if (data.align) {
        $_8ghqi9najd09exjc.applyAlign(editor, tableElm, data.align);
      }
      editor.focus();
      editor.addVisual();
    });
  };
  var open = function (editor, isProps) {
    var dom = editor.dom;
    var tableElm, colsCtrl, rowsCtrl, classListCtrl, data = {}, generalTableForm;
    if (isProps === true) {
      tableElm = dom.getParent(editor.selection.getStart(), 'table');
      if (tableElm) {
        data = extractDataFromElement(editor, tableElm);
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
    if (editor.settings.table_class_list) {
      if (data.class) {
        data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
      }
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_f3a12vnbjd09exje.buildListItems(editor.settings.table_class_list, function (item) {
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
          items: editor.settings.table_appearance_options !== false ? [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_e1ub5rjijd09ex0p.curry($_f3a12vnbjd09exje.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_e1ub5rjijd09ex0p.curry($_f3a12vnbjd09exje.updateStyleField, editor)
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
              onchange: $_e1ub5rjijd09ex0p.curry($_f3a12vnbjd09exje.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_e1ub5rjijd09ex0p.curry($_f3a12vnbjd09exje.updateStyleField, editor)
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
    if (editor.settings.table_advtab !== false) {
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
          $_f3a12vnbjd09exje.createStyleForm(editor)
        ],
        onsubmit: $_e1ub5rjijd09ex0p.curry(onSubmitTableForm, editor, tableElm)
      });
    } else {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        body: generalTableForm,
        onsubmit: $_e1ub5rjijd09ex0p.curry(onSubmitTableForm, editor, tableElm)
      });
    }
  };
  var $_5az2byn8jd09exj5 = { open: open };

  var extractDataFromElement$1 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class')
    };
    data.type = elm.parentNode.nodeName.toLowerCase();
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    if (editor.settings.table_row_advtab !== false) {
      Tools.extend(data, $_f3a12vnbjd09exje.extractAdvancedStyles(dom, elm));
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
  function onSubmitRowForm(editor, rows, evt) {
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
    $_f3a12vnbjd09exje.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      Tools.each(rows, function (rowElm) {
        setAttrib(rowElm, 'scope', data.scope);
        setAttrib(rowElm, 'style', data.style);
        setAttrib(rowElm, 'class', data.class);
        setStyle(rowElm, 'height', $_5ioit5n2jd09exij.addSizeSuffix(data.height));
        if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
          switchRowType(editor.dom, rowElm, data.type);
        }
        if (rows.length === 1) {
          $_8ghqi9najd09exjc.unApplyAlign(editor, rowElm);
        }
        if (data.align) {
          $_8ghqi9najd09exjc.applyAlign(editor, rowElm, data.align);
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
    Tools.each(tableElm.rows, function (row) {
      Tools.each(row.cells, function (cell) {
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
        class: '',
        align: '',
        type: rowElm.parentNode.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$1(editor, rowElm);
    }
    if (editor.settings.table_row_class_list) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_f3a12vnbjd09exje.buildListItems(editor.settings.table_row_class_list, function (item) {
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
    if (editor.settings.table_row_advtab !== false) {
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
          $_f3a12vnbjd09exje.createStyleForm(editor)
        ],
        onsubmit: $_e1ub5rjijd09ex0p.curry(onSubmitRowForm, editor, rows)
      });
    } else {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        body: generalRowForm,
        onsubmit: $_e1ub5rjijd09ex0p.curry(onSubmitRowForm, editor, rows)
      });
    }
  };
  var $_6ks9wwncjd09exjj = { open: open$1 };

  var updateStyles = function (elm, cssText) {
    elm.style.cssText += ';' + cssText;
  };
  var extractDataFromElement$2 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class')
    };
    data.type = elm.nodeName.toLowerCase();
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    Tools.each('top middle bottom'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'valign' + name)) {
        data.valign = name;
      }
    });
    if (editor.settings.table_cell_advtab !== false) {
      Tools.extend(data, $_f3a12vnbjd09exje.extractAdvancedStyles(dom, elm));
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
    $_f3a12vnbjd09exje.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      Tools.each(cells, function (cellElm) {
        setAttrib(cellElm, 'scope', data.scope);
        if (cells.length === 1) {
          setAttrib(cellElm, 'style', data.style);
        } else {
          updateStyles(cellElm, data.style);
        }
        setAttrib(cellElm, 'class', data.class);
        setStyle(cellElm, 'width', $_5ioit5n2jd09exij.addSizeSuffix(data.width));
        setStyle(cellElm, 'height', $_5ioit5n2jd09exij.addSizeSuffix(data.height));
        if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
          cellElm = dom.rename(cellElm, data.type);
        }
        if (cells.length === 1) {
          $_8ghqi9najd09exjc.unApplyAlign(editor, cellElm);
          $_8ghqi9najd09exjc.unApplyVAlign(editor, cellElm);
        }
        if (data.align) {
          $_8ghqi9najd09exjc.applyAlign(editor, cellElm, data.align);
        }
        if (data.valign) {
          $_8ghqi9najd09exjc.applyVAlign(editor, cellElm, data.valign);
        }
      });
      editor.focus();
    });
  };
  var open$2 = function (editor) {
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
        style: '',
        type: cellElm.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$2(editor, cellElm);
    }
    if (editor.settings.table_cell_class_list) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_f3a12vnbjd09exje.buildListItems(editor.settings.table_cell_class_list, function (item) {
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
              onchange: $_e1ub5rjijd09ex0p.curry($_f3a12vnbjd09exje.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_e1ub5rjijd09ex0p.curry($_f3a12vnbjd09exje.updateStyleField, editor)
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
    if (editor.settings.table_cell_advtab !== false) {
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
          $_f3a12vnbjd09exje.createStyleForm(editor)
        ],
        onsubmit: $_e1ub5rjijd09ex0p.curry(onSubmitCellForm, editor, cells)
      });
    } else {
      editor.windowManager.open({
        title: 'Cell properties',
        data: data,
        body: generalCellForm,
        onsubmit: $_e1ub5rjijd09ex0p.curry(onSubmitCellForm, editor, cells)
      });
    }
  };
  var $_akd3i2ndjd09exjp = { open: open$2 };

  var each$3 = Tools.each;
  var clipboardRows = $_dmlx9ujhjd09ex0f.none();
  var getClipboardRows = function () {
    return clipboardRows.fold(function () {
      return;
    }, function (rows) {
      return $_51vcxojgjd09ex09.map(rows, function (row) {
        return row.dom();
      });
    });
  };
  var setClipboardRows = function (rows) {
    var sugarRows = $_51vcxojgjd09ex09.map(rows, $_f1ygtcjvjd09ex2h.fromDom);
    clipboardRows = $_dmlx9ujhjd09ex0f.from(sugarRows);
  };
  var registerCommands = function (editor, actions, cellSelection, selections) {
    var isRoot = $_5ioit5n2jd09exij.getIsRoot(editor);
    var eraseTable = function () {
      var cell = $_f1ygtcjvjd09ex2h.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
      var table = $_t50u2jsjd09ex1p.table(cell, isRoot);
      table.filter($_e1ub5rjijd09ex0p.not(isRoot)).each(function (table) {
        var cursor = $_f1ygtcjvjd09ex2h.fromText('');
        $_dzzvfkkrjd09ex5s.after(table, cursor);
        $_9alt55ksjd09ex5u.remove(table);
        var rng = editor.dom.createRng();
        rng.setStart(cursor.dom(), 0);
        rng.setEnd(cursor.dom(), 0);
        editor.selection.setRng(rng);
      });
    };
    var getSelectionStartCell = function () {
      return $_f1ygtcjvjd09ex2h.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
    };
    var getTableFromCell = function (cell) {
      return $_t50u2jsjd09ex1p.table(cell, isRoot);
    };
    var actOnSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      table.each(function (table) {
        var targets = $_6y2jcpl1jd09ex72.forMenu(selections, table, cell);
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
        var doc = $_f1ygtcjvjd09ex2h.fromDom(editor.getDoc());
        var targets = $_6y2jcpl1jd09ex72.forMenu(selections, table, cell);
        var generators = $_5vywgckujd09ex5z.cellOperations($_e1ub5rjijd09ex0p.noop, doc, $_dmlx9ujhjd09ex0f.none());
        return $_29az3wn6jd09exj1.copyRows(table, targets, generators);
      });
    };
    var pasteOnSelection = function (execute) {
      clipboardRows.each(function (rows) {
        var clonedRows = $_51vcxojgjd09ex09.map(rows, function (row) {
          return $_gblvyukvjd09ex6e.deep(row);
        });
        var cell = getSelectionStartCell();
        var table = getTableFromCell(cell);
        table.bind(function (table) {
          var doc = $_f1ygtcjvjd09ex2h.fromDom(editor.getDoc());
          var generators = $_5vywgckujd09ex5z.paste(doc);
          var targets = $_6y2jcpl1jd09ex72.pasteRows(selections, table, cell, clonedRows, generators);
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
        clipboardRows = copyRowSelection();
        actOnSelection(actions.deleteRow);
      },
      mceTableCopyRow: function (grid) {
        clipboardRows = copyRowSelection();
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
      mceInsertTable: $_e1ub5rjijd09ex0p.curry($_5az2byn8jd09exj5.open, editor),
      mceTableProps: $_e1ub5rjijd09ex0p.curry($_5az2byn8jd09exj5.open, editor, true),
      mceTableRowProps: $_e1ub5rjijd09ex0p.curry($_6ks9wwncjd09exjj.open, editor),
      mceTableCellProps: $_e1ub5rjijd09ex0p.curry($_akd3i2ndjd09exjp.open, editor)
    }, function (func, name) {
      editor.addCommand(name, function (ui, val) {
        func(val);
      });
    });
  };
  var $_35zvpin5jd09exir = {
    registerCommands: registerCommands,
    getClipboardRows: getClipboardRows,
    setClipboardRows: setClipboardRows
  };

  var only$1 = function (element) {
    var parent = $_dmlx9ujhjd09ex0f.from(element.dom().documentElement).map($_f1ygtcjvjd09ex2h.fromDom).getOr(element);
    return {
      parent: $_e1ub5rjijd09ex0p.constant(parent),
      view: $_e1ub5rjijd09ex0p.constant(element),
      origin: $_e1ub5rjijd09ex0p.constant(r(0, 0))
    };
  };
  var detached = function (editable, chrome) {
    var origin = $_e1ub5rjijd09ex0p.curry($_614ir5lxjd09exc3.absolute, chrome);
    return {
      parent: $_e1ub5rjijd09ex0p.constant(chrome),
      view: $_e1ub5rjijd09ex0p.constant(editable),
      origin: origin
    };
  };
  var body$1 = function (editable, chrome) {
    return {
      parent: $_e1ub5rjijd09ex0p.constant(chrome),
      view: $_e1ub5rjijd09ex0p.constant(editable),
      origin: $_e1ub5rjijd09ex0p.constant(r(0, 0))
    };
  };
  var $_czyno0nfjd09expm = {
    only: only$1,
    detached: detached,
    body: body$1
  };

  function Event (fields) {
    var struct = $_6c8np0jljd09ex18.immutable.apply(null, fields);
    var handlers = [];
    var bind = function (handler) {
      if (handler === undefined) {
        throw 'Event bind error: undefined handler';
      }
      handlers.push(handler);
    };
    var unbind = function (handler) {
      handlers = $_51vcxojgjd09ex09.filter(handlers, function (h) {
        return h !== handler;
      });
    };
    var trigger = function () {
      var event = struct.apply(null, arguments);
      $_51vcxojgjd09ex09.each(handlers, function (handler) {
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
    var registry = $_3bxkuvjkjd09ex15.map(typeDefs, function (event) {
      return {
        bind: event.bind,
        unbind: event.unbind
      };
    });
    var trigger = $_3bxkuvjkjd09ex15.map(typeDefs, function (event) {
      return event.trigger;
    });
    return {
      registry: registry,
      trigger: trigger
    };
  };
  var $_funoqgnijd09exq3 = { create: create };

  var mode = $_2zb56wm4jd09exd8.exactly([
    'compare',
    'extract',
    'mutate',
    'sink'
  ]);
  var sink = $_2zb56wm4jd09exd8.exactly([
    'element',
    'start',
    'stop',
    'destroy'
  ]);
  var api$3 = $_2zb56wm4jd09exd8.exactly([
    'forceDrop',
    'drop',
    'move',
    'delayDrop'
  ]);
  var $_7tt67tnmjd09exqz = {
    mode: mode,
    sink: sink,
    api: api$3
  };

  var styles$1 = $_cxho5xmkjd09exg4.css('ephox-dragster');
  var $_cqqzoxnojd09exr9 = { resolve: styles$1.resolve };

  function Blocker (options) {
    var settings = $_mf3fhm9jd09exe6.merge({ 'layerClass': $_cqqzoxnojd09exr9.resolve('blocker') }, options);
    var div = $_f1ygtcjvjd09ex2h.fromTag('div');
    $_d01oh0kgjd09ex47.set(div, 'role', 'presentation');
    $_6bq7pnkpjd09ex5h.setAll(div, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%'
    });
    $_dp12qlmljd09exg5.add(div, $_cqqzoxnojd09exr9.resolve('blocker'));
    $_dp12qlmljd09exg5.add(div, settings.layerClass);
    var element = function () {
      return div;
    };
    var destroy = function () {
      $_9alt55ksjd09ex5u.remove(div);
    };
    return {
      element: element,
      destroy: destroy
    };
  }

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_e1ub5rjijd09ex0p.constant(target),
      'x': $_e1ub5rjijd09ex0p.constant(x),
      'y': $_e1ub5rjijd09ex0p.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_e1ub5rjijd09ex0p.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_f1ygtcjvjd09ex2h.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_e1ub5rjijd09ex0p.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_e1ub5rjijd09ex0p.curry(unbind, element, event, wrapped, useCapture) };
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
  var $_k39unnqjd09exrf = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_e1ub5rjijd09ex0p.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_k39unnqjd09exrf.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_k39unnqjd09exrf.capture(element, event, filter$1, handler);
  };
  var $_fnbmumnpjd09exrc = {
    bind: bind$2,
    capture: capture$1
  };

  var compare = function (old, nu) {
    return r(nu.left() - old.left(), nu.top() - old.top());
  };
  var extract$1 = function (event) {
    return $_dmlx9ujhjd09ex0f.some(r(event.x(), event.y()));
  };
  var mutate$1 = function (mutation, info) {
    mutation.mutate(info.left(), info.top());
  };
  var sink$1 = function (dragApi, settings) {
    var blocker = Blocker(settings);
    var mdown = $_fnbmumnpjd09exrc.bind(blocker.element(), 'mousedown', dragApi.forceDrop);
    var mup = $_fnbmumnpjd09exrc.bind(blocker.element(), 'mouseup', dragApi.drop);
    var mmove = $_fnbmumnpjd09exrc.bind(blocker.element(), 'mousemove', dragApi.move);
    var mout = $_fnbmumnpjd09exrc.bind(blocker.element(), 'mouseout', dragApi.delayDrop);
    var destroy = function () {
      blocker.destroy();
      mup.unbind();
      mmove.unbind();
      mout.unbind();
      mdown.unbind();
    };
    var start = function (parent) {
      $_dzzvfkkrjd09ex5s.append(parent, blocker.element());
    };
    var stop = function () {
      $_9alt55ksjd09ex5u.remove(blocker.element());
    };
    return $_7tt67tnmjd09exqz.sink({
      element: blocker.element,
      start: start,
      stop: stop,
      destroy: destroy
    });
  };
  var MouseDrag = $_7tt67tnmjd09exqz.mode({
    compare: compare,
    extract: extract$1,
    sink: sink$1,
    mutate: mutate$1
  });

  function InDrag () {
    var previous = $_dmlx9ujhjd09ex0f.none();
    var reset = function () {
      previous = $_dmlx9ujhjd09ex0f.none();
    };
    var update = function (mode, nu) {
      var result = previous.map(function (old) {
        return mode.compare(old, nu);
      });
      previous = $_dmlx9ujhjd09ex0f.some(nu);
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
    var events = $_funoqgnijd09exq3.create({ move: Event(['info']) });
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
      reset: $_e1ub5rjijd09ex0p.noop
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
  var $_7hran0nvjd09exrz = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var setup = function (mutation, mode, settings) {
    var active = false;
    var events = $_funoqgnijd09exq3.create({
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
    var throttledDrop = $_7hran0nvjd09exrz.last(drop, 200);
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
    var sink = mode.sink($_7tt67tnmjd09exqz.api({
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
  var $_3h68p0nrjd09exri = { setup: setup };

  var transform$1 = function (mutation, options) {
    var settings = options !== undefined ? options : {};
    var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
    return $_3h68p0nrjd09exri.setup(mutation, mode, options);
  };
  var $_fkdejonkjd09exqq = { transform: transform$1 };

  function Mutation () {
    var events = $_funoqgnijd09exq3.create({
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
    var events = $_funoqgnijd09exq3.create({
      drag: Event([
        'xDelta',
        'yDelta',
        'target'
      ])
    });
    var target = $_dmlx9ujhjd09ex0f.none();
    var delegate = Mutation();
    delegate.events.drag.bind(function (event) {
      target.each(function (t) {
        events.trigger.drag(event.xDelta(), event.yDelta(), t);
      });
    });
    var assign = function (t) {
      target = $_dmlx9ujhjd09ex0f.some(t);
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
    return $_2ljr38kljd09ex4r.first(selector).isSome();
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_2ljr38kljd09ex4r.ancestor(scope, selector, isRoot).isSome();
  };
  var sibling$2 = function (scope, selector) {
    return $_2ljr38kljd09ex4r.sibling(scope, selector).isSome();
  };
  var child$3 = function (scope, selector) {
    return $_2ljr38kljd09ex4r.child(scope, selector).isSome();
  };
  var descendant$2 = function (scope, selector) {
    return $_2ljr38kljd09ex4r.descendant(scope, selector).isSome();
  };
  var closest$2 = function (scope, selector, isRoot) {
    return $_2ljr38kljd09ex4r.closest(scope, selector, isRoot).isSome();
  };
  var $_dubvaenyjd09exsa = {
    any: any,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var resizeBarDragging = $_yhrw5mjjd09exg1.resolve('resizer-bar-dragging');
  function BarManager (wire, direction, hdirection) {
    var mutation = BarMutation();
    var resizing = $_fkdejonkjd09exqq.transform(mutation, {});
    var hoverTable = $_dmlx9ujhjd09ex0f.none();
    var getResizer = function (element, type) {
      return $_dmlx9ujhjd09ex0f.from($_d01oh0kgjd09ex47.get(element, type));
    };
    mutation.events.drag.bind(function (event) {
      getResizer(event.target(), 'data-row').each(function (_dataRow) {
        var currentRow = $_c13nljmzjd09exhv.getInt(event.target(), 'top');
        $_6bq7pnkpjd09ex5h.set(event.target(), 'top', currentRow + event.yDelta() + 'px');
      });
      getResizer(event.target(), 'data-column').each(function (_dataCol) {
        var currentCol = $_c13nljmzjd09exhv.getInt(event.target(), 'left');
        $_6bq7pnkpjd09ex5h.set(event.target(), 'left', currentCol + event.xDelta() + 'px');
      });
    });
    var getDelta = function (target, direction) {
      var newX = $_c13nljmzjd09exhv.getInt(target, direction);
      var oldX = parseInt($_d01oh0kgjd09ex47.get(target, 'data-initial-' + direction), 10);
      return newX - oldX;
    };
    resizing.events.stop.bind(function () {
      mutation.get().each(function (target) {
        hoverTable.each(function (table) {
          getResizer(target, 'data-row').each(function (row) {
            var delta = getDelta(target, 'top');
            $_d01oh0kgjd09ex47.remove(target, 'data-initial-top');
            events.trigger.adjustHeight(table, delta, parseInt(row, 10));
          });
          getResizer(target, 'data-column').each(function (column) {
            var delta = getDelta(target, 'left');
            $_d01oh0kgjd09ex47.remove(target, 'data-initial-left');
            events.trigger.adjustWidth(table, delta, parseInt(column, 10));
          });
          $_41aemvmfjd09exf7.refresh(wire, table, hdirection, direction);
        });
      });
    });
    var handler = function (target, direction) {
      events.trigger.startAdjust();
      mutation.assign(target);
      $_d01oh0kgjd09ex47.set(target, 'data-initial-' + direction, parseInt($_6bq7pnkpjd09ex5h.get(target, direction), 10));
      $_dp12qlmljd09exg5.add(target, resizeBarDragging);
      $_6bq7pnkpjd09ex5h.set(target, 'opacity', '0.2');
      resizing.go(wire.parent());
    };
    var mousedown = $_fnbmumnpjd09exrc.bind(wire.parent(), 'mousedown', function (event) {
      if ($_41aemvmfjd09exf7.isRowBar(event.target()))
        handler(event.target(), 'top');
      if ($_41aemvmfjd09exf7.isColBar(event.target()))
        handler(event.target(), 'left');
    });
    var isRoot = function (e) {
      return $_a4998rjzjd09ex33.eq(e, wire.view());
    };
    var mouseover = $_fnbmumnpjd09exrc.bind(wire.view(), 'mouseover', function (event) {
      if ($_q4uvfkhjd09ex4i.name(event.target()) === 'table' || $_dubvaenyjd09exsa.ancestor(event.target(), 'table', isRoot)) {
        hoverTable = $_q4uvfkhjd09ex4i.name(event.target()) === 'table' ? $_dmlx9ujhjd09ex0f.some(event.target()) : $_2ljr38kljd09ex4r.ancestor(event.target(), 'table', isRoot);
        hoverTable.each(function (ht) {
          $_41aemvmfjd09exf7.refresh(wire, ht, hdirection, direction);
        });
      } else if ($_1csexbkkjd09ex4o.inBody(event.target())) {
        $_41aemvmfjd09exf7.destroy(wire);
      }
    });
    var destroy = function () {
      mousedown.unbind();
      mouseover.unbind();
      resizing.destroy();
      $_41aemvmfjd09exf7.destroy(wire);
    };
    var refresh = function (tbl) {
      $_41aemvmfjd09exf7.refresh(wire, tbl, hdirection, direction);
    };
    var events = $_funoqgnijd09exq3.create({
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
      hideBars: $_e1ub5rjijd09ex0p.curry($_41aemvmfjd09exf7.hide, wire),
      showBars: $_e1ub5rjijd09ex0p.curry($_41aemvmfjd09exf7.show, wire),
      events: events.registry
    };
  }

  function TableResize (wire, vdirection) {
    var hdirection = $_194vj8lwjd09exbv.height;
    var manager = BarManager(wire, vdirection, hdirection);
    var events = $_funoqgnijd09exq3.create({
      beforeResize: Event(['table']),
      afterResize: Event(['table']),
      startDrag: Event([])
    });
    manager.events.adjustHeight.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = hdirection.delta(event.delta(), event.table());
      $_1bde7rmvjd09exhc.adjustHeight(event.table(), delta, event.row(), hdirection);
      events.trigger.afterResize(event.table());
    });
    manager.events.startAdjust.bind(function (event) {
      events.trigger.startDrag();
    });
    manager.events.adjustWidth.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = vdirection.delta(event.delta(), event.table());
      $_1bde7rmvjd09exhc.adjustWidth(event.table(), delta, event.column(), vdirection);
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
    var container = $_f1ygtcjvjd09ex2h.fromTag('div');
    $_6bq7pnkpjd09ex5h.setAll(container, {
      position: 'static',
      height: '0',
      width: '0',
      padding: '0',
      margin: '0',
      border: '0'
    });
    $_dzzvfkkrjd09ex5s.append($_1csexbkkjd09ex4o.body(), container);
    return container;
  };
  var get$8 = function (editor, container) {
    return editor.inline ? $_czyno0nfjd09expm.body($_5ioit5n2jd09exij.getBody(editor), createContainer()) : $_czyno0nfjd09expm.only($_f1ygtcjvjd09ex2h.fromDom(editor.getDoc()));
  };
  var remove$6 = function (editor, wire) {
    if (editor.inline) {
      $_9alt55ksjd09ex5u.remove(wire.parent());
    }
  };
  var $_5r9459nzjd09exsc = {
    get: get$8,
    remove: remove$6
  };

  function ResizeHandler (editor) {
    var selectionRng = $_dmlx9ujhjd09ex0f.none();
    var resize = $_dmlx9ujhjd09ex0f.none();
    var wire = $_dmlx9ujhjd09ex0f.none();
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
      return wire.getOr($_czyno0nfjd09expm.only($_f1ygtcjvjd09ex2h.fromDom(editor.getBody())));
    };
    var destroy = function () {
      resize.each(function (sz) {
        sz.destroy();
      });
      wire.each(function (w) {
        $_5r9459nzjd09exsc.remove(editor, w);
      });
    };
    editor.on('init', function () {
      var direction = TableDirection($_2pqq9jn3jd09exim.directionAt);
      var rawWire = $_5r9459nzjd09exsc.get(editor);
      wire = $_dmlx9ujhjd09ex0f.some(rawWire);
      if (editor.settings.object_resizing && editor.settings.table_resize_bars !== false && (editor.settings.object_resizing === true || editor.settings.object_resizing === 'table')) {
        var sz = TableResize(rawWire, direction);
        sz.on();
        sz.events.startDrag.bind(function (event) {
          selectionRng = $_dmlx9ujhjd09ex0f.some(editor.selection.getRng());
        });
        sz.events.afterResize.bind(function (event) {
          var table = event.table();
          var dataStyleCells = $_baxp2xkijd09ex4k.descendants(table, 'td[data-mce-style],th[data-mce-style]');
          $_51vcxojgjd09ex09.each(dataStyleCells, function (cell) {
            $_d01oh0kgjd09ex47.remove(cell, 'data-mce-style');
          });
          selectionRng.each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
          });
          editor.undoManager.add();
        });
        resize = $_dmlx9ujhjd09ex0f.some(sz);
      }
    });
    editor.on('ObjectResizeStart', function (e) {
      if (isTable(e.target)) {
        startW = e.width;
        startRawW = getRawWidth(e.target);
      }
    });
    editor.on('ObjectResized', function (e) {
      if (isTable(e.target)) {
        var table = e.target;
        if (percentageBasedSizeRegex.test(startRawW)) {
          var percentW = parseFloat(percentageBasedSizeRegex.exec(startRawW)[1]);
          var targetPercentW = e.width * percentW / startW;
          editor.dom.setStyle(table, 'width', targetPercentW + '%');
        } else {
          var newCellSizes_1 = [];
          Tools.each(table.rows, function (row) {
            Tools.each(row.cells, function (cell) {
              var width = editor.dom.getStyle(cell, 'width', true);
              newCellSizes_1.push({
                cell: cell,
                width: width
              });
            });
          });
          Tools.each(newCellSizes_1, function (newCellSize) {
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
  }

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
  var $_78j205o2jd09ext1 = {
    none: none$2,
    first: first$5,
    middle: middle$1,
    last: last$4
  };

  var detect$4 = function (current, isRoot) {
    return $_t50u2jsjd09ex1p.table(current, isRoot).bind(function (table) {
      var all = $_t50u2jsjd09ex1p.cells(table);
      var index = $_51vcxojgjd09ex09.findIndex(all, function (x) {
        return $_a4998rjzjd09ex33.eq(current, x);
      });
      return index.map(function (ind) {
        return {
          index: $_e1ub5rjijd09ex0p.constant(ind),
          all: $_e1ub5rjijd09ex0p.constant(all)
        };
      });
    });
  };
  var next = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_78j205o2jd09ext1.none(current);
    }, function (info) {
      return info.index() + 1 < info.all().length ? $_78j205o2jd09ext1.middle(current, info.all()[info.index() + 1]) : $_78j205o2jd09ext1.last(current);
    });
  };
  var prev = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_78j205o2jd09ext1.none();
    }, function (info) {
      return info.index() - 1 >= 0 ? $_78j205o2jd09ext1.middle(current, info.all()[info.index() - 1]) : $_78j205o2jd09ext1.first(current);
    });
  };
  var $_bys6m1o1jd09exsw = {
    next: next,
    prev: prev
  };

  var adt = $_5sjgc9lijd09ex9x.generate([
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
    return situ.fold($_e1ub5rjijd09ex0p.identity, $_e1ub5rjijd09ex0p.identity, $_e1ub5rjijd09ex0p.identity);
  };
  var $_18idwio4jd09ext7 = {
    before: adt.before,
    on: adt.on,
    after: adt.after,
    cata: cata$1,
    getStart: getStart
  };

  var type$2 = $_5sjgc9lijd09ex9x.generate([
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
  var range$2 = $_6c8np0jljd09ex18.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$2.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_f1ygtcjvjd09ex2h.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_18idwio4jd09ext7.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_cunhv4jxjd09ex2m.defaultView(start);
  };
  var $_2thekfo3jd09ext4 = {
    domRange: type$2.domRange,
    relative: type$2.relative,
    exact: type$2.exact,
    exactFromRange: exactFromRange,
    range: range$2,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_cunhv4jxjd09ex2m.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_f1ygtcjvjd09ex2h.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_a4998rjzjd09ex33.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_7h6vwwo6jd09exth = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_51vcxojgjd09ex09.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_f1ygtcjvjd09ex2h.fromDom(fragment);
  };
  var $_ci62bto7jd09extj = { fromElements: fromElements };

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
    return $_f1ygtcjvjd09ex2h.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_e1ub5rjijd09ex0p.constant(rect.left),
      top: $_e1ub5rjijd09ex0p.constant(rect.top),
      right: $_e1ub5rjijd09ex0p.constant(rect.right),
      bottom: $_e1ub5rjijd09ex0p.constant(rect.bottom),
      width: $_e1ub5rjijd09ex0p.constant(rect.width),
      height: $_e1ub5rjijd09ex0p.constant(rect.height)
    };
  };
  var getFirstRect = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_dmlx9ujhjd09ex0f.some(rect).map(toRect) : $_dmlx9ujhjd09ex0f.none();
  };
  var getBounds$1 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_dmlx9ujhjd09ex0f.some(rect).map(toRect) : $_dmlx9ujhjd09ex0f.none();
  };
  var toString = function (rng) {
    return rng.toString();
  };
  var $_ehlpn9o8jd09exts = {
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

  var adt$1 = $_5sjgc9lijd09ex9x.generate([
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
    return type($_f1ygtcjvjd09ex2h.fromDom(range.startContainer), range.startOffset, $_f1ygtcjvjd09ex2h.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_e1ub5rjijd09ex0p.constant(rng),
          rtl: $_dmlx9ujhjd09ex0f.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_800s80k5jd09ex3g.cached(function () {
            return $_ehlpn9o8jd09exts.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_800s80k5jd09ex3g.cached(function () {
            return $_dmlx9ujhjd09ex0f.some($_ehlpn9o8jd09exts.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_800s80k5jd09ex3g.cached(function () {
            return $_ehlpn9o8jd09exts.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_800s80k5jd09ex3g.cached(function () {
            return $_dmlx9ujhjd09ex0f.some($_ehlpn9o8jd09exts.exactToNative(win, finish, foffset, start, soffset));
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
        return adt$1.rtl($_f1ygtcjvjd09ex2h.fromDom(rev.endContainer), rev.endOffset, $_f1ygtcjvjd09ex2h.fromDom(rev.startContainer), rev.startOffset);
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
  var $_cr5s9yo9jd09exu3 = {
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
  var $_33wudgocjd09exuk = {
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
    var length = $_3v8a0jkyjd09ex6m.get(textnode).length;
    var offset = $_33wudgocjd09exuk.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_3rmc78majd09exe8.findMap(rects, function (rect) {
      return $_33wudgocjd09exuk.inRect(rect, x, y) ? $_dmlx9ujhjd09ex0f.some(rect) : $_dmlx9ujhjd09ex0f.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_71usnkodjd09exum = { locate: locate };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_cunhv4jxjd09ex2m.children(node);
    return $_3rmc78majd09exe8.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_33wudgocjd09exuk.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : $_dmlx9ujhjd09ex0f.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_q4uvfkhjd09ex4i.isText(node) ? $_71usnkodjd09exum.locate : searchInChildren;
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
  var $_26o5a7objd09exuf = { locate: locate$1 };

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
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_dczsdckwjd09ex6h.first : $_dczsdckwjd09ex6h.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return $_dmlx9ujhjd09ex0f.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search = function (doc, node, x) {
    var f = $_cunhv4jxjd09ex2m.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_19y5e2oejd09exur = { search: search };

  var caretPositionFromPoint = function (doc, x, y) {
    return $_dmlx9ujhjd09ex0f.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return $_dmlx9ujhjd09ex0f.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return $_dmlx9ujhjd09ex0f.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return $_dmlx9ujhjd09ex0f.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_26o5a7objd09exuf.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_f1ygtcjvjd09ex2h.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_19y5e2oejd09exur.search(doc, elem, x);
      };
      return $_cunhv4jxjd09ex2m.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_f1ygtcjvjd09ex2h.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_2thekfo3jd09ext4.range($_f1ygtcjvjd09ex2h.fromDom(rng.startContainer), rng.startOffset, $_f1ygtcjvjd09ex2h.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_8xjpxmoajd09exuc = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_ehlpn9o8jd09exts.create(win);
    var self = $_7pd8kyjujd09ex27.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_baxp2xkijd09ex4k.descendants(ancestor, selector));
    return $_51vcxojgjd09ex09.filter(elements, function (elem) {
      $_ehlpn9o8jd09exts.selectNodeContentsUsing(innerRange, elem);
      return $_ehlpn9o8jd09exts.isWithin(outerRange, innerRange);
    });
  };
  var find$3 = function (win, selection, selector) {
    var outerRange = $_cr5s9yo9jd09exu3.asLtrRange(win, selection);
    var ancestor = $_f1ygtcjvjd09ex2h.fromDom(outerRange.commonAncestorContainer);
    return $_q4uvfkhjd09ex4i.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_59lq87ofjd09exuu = { find: find$3 };

  var beforeSpecial = function (element, offset) {
    var name = $_q4uvfkhjd09ex4i.name(element);
    if ('input' === name)
      return $_18idwio4jd09ext7.after(element);
    else if (!$_51vcxojgjd09ex09.contains([
        'br',
        'img'
      ], name))
      return $_18idwio4jd09ext7.on(element, offset);
    else
      return offset === 0 ? $_18idwio4jd09ext7.before(element) : $_18idwio4jd09ext7.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_18idwio4jd09ext7.before, beforeSpecial, $_18idwio4jd09ext7.after);
    var finish = finishSitu.fold($_18idwio4jd09ext7.before, beforeSpecial, $_18idwio4jd09ext7.after);
    return $_2thekfo3jd09ext4.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_2thekfo3jd09ext4.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_f1ygtcjvjd09ex2h.fromDom(rng.startContainer);
        var finish = $_f1ygtcjvjd09ex2h.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_9t2fh5ogjd09exux = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    $_dmlx9ujhjd09ex0f.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_ehlpn9o8jd09exts.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_59lq87ofjd09exuu.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_cr5s9yo9jd09exu3.diagnose(win, relative).match({
      ltr: function (start, soffset, finish, foffset) {
        doSetRange(win, start, soffset, finish, foffset);
      },
      rtl: function (start, soffset, finish, foffset) {
        var selection = win.getSelection();
        if (selection.extend) {
          selection.collapse(start.dom(), soffset);
          selection.extend(finish.dom(), foffset);
        } else {
          doSetRange(win, finish, foffset, start, soffset);
        }
      }
    });
  };
  var setExact = function (win, start, soffset, finish, foffset) {
    var relative = $_9t2fh5ogjd09exux.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_9t2fh5ogjd09exux.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_2thekfo3jd09ext4.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_ehlpn9o8jd09exts.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_9t2fh5ogjd09exux.preprocess(selection);
    return $_cr5s9yo9jd09exu3.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return $_dmlx9ujhjd09ex0f.some($_2thekfo3jd09ext4.range($_f1ygtcjvjd09ex2h.fromDom(firstRng.startContainer), firstRng.startOffset, $_f1ygtcjvjd09ex2h.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return $_dmlx9ujhjd09ex0f.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_f1ygtcjvjd09ex2h.fromDom(selection.anchorNode);
    var focusNode = $_f1ygtcjvjd09ex2h.fromDom(selection.focusNode);
    return $_7h6vwwo6jd09exth.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? $_dmlx9ujhjd09ex0f.some($_2thekfo3jd09ext4.range($_f1ygtcjvjd09ex2h.fromDom(selection.anchorNode), selection.anchorOffset, $_f1ygtcjvjd09ex2h.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_ehlpn9o8jd09exts.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_ehlpn9o8jd09exts.selectNodeContents(win, element);
    return $_2thekfo3jd09ext4.range($_f1ygtcjvjd09ex2h.fromDom(rng.startContainer), rng.startOffset, $_f1ygtcjvjd09ex2h.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : $_dmlx9ujhjd09ex0f.none();
  };
  var get$9 = function (win) {
    return getExact(win).map(function (range) {
      return $_2thekfo3jd09ext4.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_cr5s9yo9jd09exu3.asLtrRange(win, selection);
    return $_ehlpn9o8jd09exts.getFirstRect(rng);
  };
  var getBounds$2 = function (win, selection) {
    var rng = $_cr5s9yo9jd09exu3.asLtrRange(win, selection);
    return $_ehlpn9o8jd09exts.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_8xjpxmoajd09exuc.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_cr5s9yo9jd09exu3.asLtrRange(win, selection);
    return $_ehlpn9o8jd09exts.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$2 = function (win, selection) {
    var rng = $_cr5s9yo9jd09exu3.asLtrRange(win, selection);
    return $_ehlpn9o8jd09exts.cloneFragment(rng);
  };
  var replace$1 = function (win, selection, elements) {
    var rng = $_cr5s9yo9jd09exu3.asLtrRange(win, selection);
    var fragment = $_ci62bto7jd09extj.fromElements(elements, win.document);
    $_ehlpn9o8jd09exts.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_cr5s9yo9jd09exu3.asLtrRange(win, selection);
    $_ehlpn9o8jd09exts.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_a4998rjzjd09ex33.eq(start, finish) && soffset === foffset;
  };
  var $_fu5loo5jd09extb = {
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

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var forward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_bys6m1o1jd09exsw.next(cell), lazyWire);
  };
  var backward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_bys6m1o1jd09exsw.prev(cell), lazyWire);
  };
  var getCellFirstCursorPosition = function (editor, cell) {
    var selection = $_2thekfo3jd09ext4.exact(cell, 0, cell, 0);
    return $_fu5loo5jd09extb.toNative(selection);
  };
  var getNewRowCursorPosition = function (editor, table) {
    var rows = $_baxp2xkijd09ex4k.descendants(table, 'tr');
    return $_51vcxojgjd09ex09.last(rows).bind(function (last) {
      return $_2ljr38kljd09ex4r.descendant(last, 'td,th').map(function (first) {
        return getCellFirstCursorPosition(editor, first);
      });
    });
  };
  var go = function (editor, isRoot, cell, actions, lazyWire) {
    return cell.fold($_dmlx9ujhjd09ex0f.none, $_dmlx9ujhjd09ex0f.none, function (current, next) {
      return $_dczsdckwjd09ex6h.first(next).map(function (cell) {
        return getCellFirstCursorPosition(editor, cell);
      });
    }, function (current) {
      return $_t50u2jsjd09ex1p.table(current, isRoot).bind(function (table) {
        var targets = $_6y2jcpl1jd09ex72.noMenu(current);
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
    if (event.keyCode === VK.TAB) {
      var body_1 = $_5ioit5n2jd09exij.getBody(editor);
      var isRoot_1 = function (element) {
        var name = $_q4uvfkhjd09ex4i.name(element);
        return $_a4998rjzjd09ex33.eq(element, body_1) || $_51vcxojgjd09ex09.contains(rootElements, name);
      };
      var rng = editor.selection.getRng();
      if (rng.collapsed) {
        var start = $_f1ygtcjvjd09ex2h.fromDom(rng.startContainer);
        $_t50u2jsjd09ex1p.cell(start, isRoot_1).each(function (cell) {
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
  var $_8zihlao0jd09exsj = { handle: handle$1 };

  var response = $_6c8np0jljd09ex18.immutable('selection', 'kill');
  var $_9a7sjvokjd09exvy = { response: response };

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
  var $_98579yoljd09exw0 = {
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
    var rng = $_cr5s9yo9jd09exu3.asLtrRange(win, selection);
    return {
      start: $_e1ub5rjijd09ex0p.constant($_f1ygtcjvjd09ex2h.fromDom(rng.startContainer)),
      soffset: $_e1ub5rjijd09ex0p.constant(rng.startOffset),
      finish: $_e1ub5rjijd09ex0p.constant($_f1ygtcjvjd09ex2h.fromDom(rng.endContainer)),
      foffset: $_e1ub5rjijd09ex0p.constant(rng.endOffset)
    };
  };
  var makeSitus = function (start, soffset, finish, foffset) {
    return {
      start: $_e1ub5rjijd09ex0p.constant($_18idwio4jd09ext7.on(start, soffset)),
      finish: $_e1ub5rjijd09ex0p.constant($_18idwio4jd09ext7.on(finish, foffset))
    };
  };
  var $_eso6yxonjd09exwc = {
    convertToRange: convertToRange,
    makeSitus: makeSitus
  };

  var isSafari = $_3qhsx8k4jd09ex3f.detect().browser.isSafari();
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
    var pos = $_614ir5lxjd09exc3.absolute(element);
    var doc = $_f1ygtcjvjd09ex2h.fromDom(win.document);
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
    var previous = $_dmlx9ujhjd09ex0f.none();
    var save = function () {
      previous = $_dmlx9ujhjd09ex0f.some(get$10(doc));
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
    if (isSafari && $_byo4m9jpjd09ex1f.isFunction(element.dom().scrollIntoViewIfNeeded)) {
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
    var scrollDiv = $_f1ygtcjvjd09ex2h.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
    $_dzzvfkkrjd09ex5s.after($_1csexbkkjd09ex4o.body(), scrollDiv);
    var w = scrollDiv.dom().offsetWidth - scrollDiv.dom().clientWidth;
    $_9alt55ksjd09ex5u.remove(scrollDiv);
    return w;
  };
  var $_63paloojd09exwj = {
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
      return $_dmlx9ujhjd09ex0f.from(win.document.elementFromPoint(x, y)).map($_f1ygtcjvjd09ex2h.fromDom);
    };
    var getRect = function (element) {
      return element.dom().getBoundingClientRect();
    };
    var getRangedRect = function (start, soffset, finish, foffset) {
      var sel = $_2thekfo3jd09ext4.exact(start, soffset, finish, foffset);
      return $_fu5loo5jd09extb.getFirstRect(win, sel).map(function (structRect) {
        return $_3bxkuvjkjd09ex15.map(structRect, $_e1ub5rjijd09ex0p.apply);
      });
    };
    var getSelection = function () {
      return $_fu5loo5jd09extb.get(win).map(function (exactAdt) {
        return $_eso6yxonjd09exwc.convertToRange(win, exactAdt);
      });
    };
    var fromSitus = function (situs) {
      var relative = $_2thekfo3jd09ext4.relative(situs.start(), situs.finish());
      return $_eso6yxonjd09exwc.convertToRange(win, relative);
    };
    var situsFromPoint = function (x, y) {
      return $_fu5loo5jd09extb.getAtPoint(win, x, y).map(function (exact) {
        return {
          start: $_e1ub5rjijd09ex0p.constant($_18idwio4jd09ext7.on(exact.start(), exact.soffset())),
          finish: $_e1ub5rjijd09ex0p.constant($_18idwio4jd09ext7.on(exact.finish(), exact.foffset()))
        };
      });
    };
    var clearSelection = function () {
      $_fu5loo5jd09extb.clear(win);
    };
    var selectContents = function (element) {
      $_fu5loo5jd09extb.setToElement(win, element);
    };
    var setSelection = function (sel) {
      $_fu5loo5jd09extb.setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
    };
    var setRelativeSelection = function (start, finish) {
      $_fu5loo5jd09extb.setRelative(win, start, finish);
    };
    var getInnerHeight = function () {
      return win.innerHeight;
    };
    var getScrollY = function () {
      var pos = $_63paloojd09exwj.get($_f1ygtcjvjd09ex2h.fromDom(win.document));
      return pos.top();
    };
    var scrollBy = function (x, y) {
      $_63paloojd09exwj.by(x, y, $_f1ygtcjvjd09ex2h.fromDom(win.document));
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
    if (!($_a4998rjzjd09ex33.eq(start, finish) && soffset === foffset)) {
      return $_2ljr38kljd09ex4r.closest(start, 'td,th', isRoot).bind(function (s) {
        return $_2ljr38kljd09ex4r.closest(finish, 'td,th', isRoot).bind(function (f) {
          return detect$5(container, isRoot, s, f, selectRange);
        });
      });
    } else {
      return $_dmlx9ujhjd09ex0f.none();
    }
  };
  var detect$5 = function (container, isRoot, start, finish, selectRange) {
    if (!$_a4998rjzjd09ex33.eq(start, finish)) {
      return $_u1a8ml4jd09ex7j.identify(start, finish, isRoot).bind(function (cellSel) {
        var boxes = cellSel.boxes().getOr([]);
        if (boxes.length > 0) {
          selectRange(container, boxes, cellSel.start(), cellSel.finish());
          return $_dmlx9ujhjd09ex0f.some($_9a7sjvokjd09exvy.response($_dmlx9ujhjd09ex0f.some($_eso6yxonjd09exwc.makeSitus(start, 0, start, $_at3nybkxjd09ex6k.getEnd(start))), true));
        } else {
          return $_dmlx9ujhjd09ex0f.none();
        }
      });
    }
  };
  var update = function (rows, columns, container, selected, annotations) {
    var updateSelection = function (newSels) {
      annotations.clear(container);
      annotations.selectRange(container, newSels.boxes(), newSels.start(), newSels.finish());
      return newSels.boxes();
    };
    return $_u1a8ml4jd09ex7j.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
  };
  var $_3ldm85opjd09exwp = {
    sync: sync,
    detect: detect$5,
    update: update
  };

  var nu$3 = $_6c8np0jljd09ex18.immutableBag([
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
  var $_3x0o9xosjd09exxw = {
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
    if (offset >= 0 && offset < $_at3nybkxjd09ex6k.getEnd(element))
      return bridge.getRangedRect(element, offset, element, offset + 1);
    else if (offset > 0)
      return bridge.getRangedRect(element, offset - 1, element, offset);
    return $_dmlx9ujhjd09ex0f.none();
  };
  var toCaret = function (rect) {
    return $_3x0o9xosjd09exxw.nu({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    });
  };
  var getElemBox = function (bridge, element) {
    return $_dmlx9ujhjd09ex0f.some(bridge.getRect(element));
  };
  var getBoxAt = function (bridge, element, offset) {
    if ($_q4uvfkhjd09ex4i.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_q4uvfkhjd09ex4i.isText(element))
      return getPartialBox(bridge, element, offset).map(toCaret);
    else
      return $_dmlx9ujhjd09ex0f.none();
  };
  var getEntireBox = function (bridge, element) {
    if ($_q4uvfkhjd09ex4i.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_q4uvfkhjd09ex4i.isText(element))
      return bridge.getRangedRect(element, 0, element, $_at3nybkxjd09ex6k.getEnd(element)).map(toCaret);
    else
      return $_dmlx9ujhjd09ex0f.none();
  };
  var $_bz05ltotjd09exxz = {
    getBoxAt: getBoxAt,
    getEntireBox: getEntireBox
  };

  var traverse = $_6c8np0jljd09ex18.immutable('item', 'mode');
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
      fallback: $_dmlx9ujhjd09ex0f.none()
    },
    {
      current: sidestep,
      next: advance,
      fallback: $_dmlx9ujhjd09ex0f.some(backtrack)
    },
    {
      current: advance,
      next: advance,
      fallback: $_dmlx9ujhjd09ex0f.some(sidestep)
    }
  ];
  var go$1 = function (universe, item, mode, direction, rules) {
    var rules = rules !== undefined ? rules : successors;
    var ruleOpt = $_51vcxojgjd09ex09.find(rules, function (succ) {
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
  var $_25jx52oyjd09exyo = {
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
      return children.length > 0 ? $_dmlx9ujhjd09ex0f.some(children[children.length - 1]) : $_dmlx9ujhjd09ex0f.none();
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
      return children.length > 0 ? $_dmlx9ujhjd09ex0f.some(children[0]) : $_dmlx9ujhjd09ex0f.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var $_tnc2fozjd09exyu = {
    left: left$1,
    right: right$1
  };

  var hone = function (universe, item, predicate, mode, direction, isRoot) {
    var next = $_25jx52oyjd09exyo.go(universe, item, mode, direction);
    return next.bind(function (n) {
      if (isRoot(n.item()))
        return $_dmlx9ujhjd09ex0f.none();
      else
        return predicate(n.item()) ? $_dmlx9ujhjd09ex0f.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
    });
  };
  var left$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_25jx52oyjd09exyo.sidestep, $_tnc2fozjd09exyu.left(), isRoot);
  };
  var right$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_25jx52oyjd09exyo.sidestep, $_tnc2fozjd09exyu.right(), isRoot);
  };
  var $_2vcoevoxjd09exym = {
    left: left$2,
    right: right$2
  };

  var isLeaf = function (universe, element) {
    return universe.property().children(element).length === 0;
  };
  var before$2 = function (universe, item, isRoot) {
    return seekLeft(universe, item, $_e1ub5rjijd09ex0p.curry(isLeaf, universe), isRoot);
  };
  var after$3 = function (universe, item, isRoot) {
    return seekRight(universe, item, $_e1ub5rjijd09ex0p.curry(isLeaf, universe), isRoot);
  };
  var seekLeft = function (universe, item, predicate, isRoot) {
    return $_2vcoevoxjd09exym.left(universe, item, predicate, isRoot);
  };
  var seekRight = function (universe, item, predicate, isRoot) {
    return $_2vcoevoxjd09exym.right(universe, item, predicate, isRoot);
  };
  var walkers = function () {
    return {
      left: $_tnc2fozjd09exyu.left,
      right: $_tnc2fozjd09exyu.right
    };
  };
  var walk = function (universe, item, mode, direction, _rules) {
    return $_25jx52oyjd09exyo.go(universe, item, mode, direction, _rules);
  };
  var $_2rypcwowjd09exyj = {
    before: before$2,
    after: after$3,
    seekLeft: seekLeft,
    seekRight: seekRight,
    walkers: walkers,
    walk: walk,
    backtrack: $_25jx52oyjd09exyo.backtrack,
    sidestep: $_25jx52oyjd09exyo.sidestep,
    advance: $_25jx52oyjd09exyo.advance
  };

  var universe$2 = DomUniverse();
  var gather = function (element, prune, transform) {
    return $_2rypcwowjd09exyj.gather(universe$2, element, prune, transform);
  };
  var before$3 = function (element, isRoot) {
    return $_2rypcwowjd09exyj.before(universe$2, element, isRoot);
  };
  var after$4 = function (element, isRoot) {
    return $_2rypcwowjd09exyj.after(universe$2, element, isRoot);
  };
  var seekLeft$1 = function (element, predicate, isRoot) {
    return $_2rypcwowjd09exyj.seekLeft(universe$2, element, predicate, isRoot);
  };
  var seekRight$1 = function (element, predicate, isRoot) {
    return $_2rypcwowjd09exyj.seekRight(universe$2, element, predicate, isRoot);
  };
  var walkers$1 = function () {
    return $_2rypcwowjd09exyj.walkers();
  };
  var walk$1 = function (item, mode, direction, _rules) {
    return $_2rypcwowjd09exyj.walk(universe$2, item, mode, direction, _rules);
  };
  var $_eccjgpovjd09exyg = {
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
  var adt$2 = $_5sjgc9lijd09ex9x.generate([
    { 'none': [] },
    { 'retry': ['caret'] }
  ]);
  var isOutside = function (caret, box) {
    return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
  };
  var inOutsideBlock = function (bridge, element, caret) {
    return $_d4i6ihkmjd09ex4s.closest(element, $_bxiktim6jd09exdo.isBlock).fold($_e1ub5rjijd09ex0p.constant(false), function (cell) {
      return $_bz05ltotjd09exxz.getEntireBox(bridge, cell).exists(function (box) {
        return isOutside(caret, box);
      });
    });
  };
  var adjustDown = function (bridge, element, guessBox, original, caret) {
    var lowerCaret = $_3x0o9xosjd09exxw.moveDown(caret, JUMP_SIZE);
    if (Math.abs(guessBox.bottom() - original.bottom()) < 1)
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() > caret.bottom())
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() === caret.bottom())
      return adt$2.retry($_3x0o9xosjd09exxw.moveDown(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_3x0o9xosjd09exxw.translate(lowerCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var adjustUp = function (bridge, element, guessBox, original, caret) {
    var higherCaret = $_3x0o9xosjd09exxw.moveUp(caret, JUMP_SIZE);
    if (Math.abs(guessBox.top() - original.top()) < 1)
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() < caret.top())
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() === caret.top())
      return adt$2.retry($_3x0o9xosjd09exxw.moveUp(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_3x0o9xosjd09exxw.translate(higherCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var upMovement = {
    point: $_3x0o9xosjd09exxw.getTop,
    adjuster: adjustUp,
    move: $_3x0o9xosjd09exxw.moveUp,
    gather: $_eccjgpovjd09exyg.before
  };
  var downMovement = {
    point: $_3x0o9xosjd09exxw.getBottom,
    adjuster: adjustDown,
    move: $_3x0o9xosjd09exxw.moveDown,
    gather: $_eccjgpovjd09exyg.after
  };
  var isAtTable = function (bridge, x, y) {
    return bridge.elementFromPoint(x, y).filter(function (elm) {
      return $_q4uvfkhjd09ex4i.name(elm) === 'table';
    }).isSome();
  };
  var adjustForTable = function (bridge, movement, original, caret, numRetries) {
    return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
  };
  var adjustTil = function (bridge, movement, original, caret, numRetries) {
    if (numRetries === 0)
      return $_dmlx9ujhjd09ex0f.some(caret);
    if (isAtTable(bridge, caret.left(), movement.point(caret)))
      return adjustForTable(bridge, movement, original, caret, numRetries - 1);
    return bridge.situsFromPoint(caret.left(), movement.point(caret)).bind(function (guess) {
      return guess.start().fold($_dmlx9ujhjd09ex0f.none, function (element, offset) {
        return $_bz05ltotjd09exxz.getEntireBox(bridge, element, offset).bind(function (guessBox) {
          return movement.adjuster(bridge, element, guessBox, original, caret).fold($_dmlx9ujhjd09ex0f.none, function (newCaret) {
            return adjustTil(bridge, movement, original, newCaret, numRetries - 1);
          });
        }).orThunk(function () {
          return $_dmlx9ujhjd09ex0f.some(caret);
        });
      }, $_dmlx9ujhjd09ex0f.none);
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
      return $_dmlx9ujhjd09ex0f.some(movement.point(adjusted) - bridge.getInnerHeight());
    else if (movement.point(adjusted) < 0)
      return $_dmlx9ujhjd09ex0f.some(-movement.point(adjusted));
    else
      return $_dmlx9ujhjd09ex0f.none();
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
  var $_aca5fmoujd09exy5 = {
    tryUp: $_e1ub5rjijd09ex0p.curry(retry, upMovement),
    tryDown: $_e1ub5rjijd09ex0p.curry(retry, downMovement),
    ieTryUp: ieTryUp,
    ieTryDown: ieTryDown,
    getJumpSize: $_e1ub5rjijd09ex0p.constant(JUMP_SIZE)
  };

  var adt$3 = $_5sjgc9lijd09ex9x.generate([
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
    return $_2ljr38kljd09ex4r.closest(after, 'td,th', isRoot).bind(function (afterCell) {
      return $_2ljr38kljd09ex4r.closest(before, 'td,th', isRoot).map(function (beforeCell) {
        if (!$_a4998rjzjd09ex33.eq(afterCell, beforeCell)) {
          return $_gbfptvl5jd09ex7y.sharedOne(isRow, [
            afterCell,
            beforeCell
          ]).fold(function () {
            return isOverlapping(bridge, beforeCell, afterCell) ? adt$3.success() : failure(beforeCell);
          }, function (sharedRow) {
            return failure(beforeCell);
          });
        } else {
          return $_a4998rjzjd09ex33.eq(after, afterCell) && $_at3nybkxjd09ex6k.getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$3.none('in same cell');
        }
      });
    }).getOr(adt$3.none('default'));
  };
  var isRow = function (elem) {
    return $_2ljr38kljd09ex4r.closest(elem, 'tr');
  };
  var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
    return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
  };
  var $_73fbx9p0jd09exyx = {
    verify: verify,
    cata: cata$2,
    adt: adt$3
  };

  var point = $_6c8np0jljd09ex18.immutable('element', 'offset');
  var delta = $_6c8np0jljd09ex18.immutable('element', 'deltaOffset');
  var range$3 = $_6c8np0jljd09ex18.immutable('element', 'start', 'finish');
  var points = $_6c8np0jljd09ex18.immutable('begin', 'end');
  var text = $_6c8np0jljd09ex18.immutable('element', 'text');
  var $_g5powqp2jd09exzh = {
    point: point,
    delta: delta,
    range: range$3,
    points: points,
    text: text
  };

  var inAncestor = $_6c8np0jljd09ex18.immutable('ancestor', 'descendants', 'element', 'index');
  var inParent = $_6c8np0jljd09ex18.immutable('parent', 'children', 'element', 'index');
  var childOf = function (element, ancestor) {
    return $_d4i6ihkmjd09ex4s.closest(element, function (elem) {
      return $_cunhv4jxjd09ex2m.parent(elem).exists(function (parent) {
        return $_a4998rjzjd09ex33.eq(parent, ancestor);
      });
    });
  };
  var indexInParent = function (element) {
    return $_cunhv4jxjd09ex2m.parent(element).bind(function (parent) {
      var children = $_cunhv4jxjd09ex2m.children(parent);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var indexOf$1 = function (elements, element) {
    return $_51vcxojgjd09ex09.findIndex(elements, $_e1ub5rjijd09ex0p.curry($_a4998rjzjd09ex33.eq, element));
  };
  var selectorsInParent = function (element, selector) {
    return $_cunhv4jxjd09ex2m.parent(element).bind(function (parent) {
      var children = $_baxp2xkijd09ex4k.children(parent, selector);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
    return $_2ljr38kljd09ex4r.closest(element, ancestorSelector).bind(function (ancestor) {
      var descendants = $_baxp2xkijd09ex4k.descendants(ancestor, descendantSelector);
      return indexOf$1(descendants, element).map(function (index) {
        return inAncestor(ancestor, descendants, element, index);
      });
    });
  };
  var $_2bsd80p3jd09exzj = {
    childOf: childOf,
    indexOf: indexOf$1,
    indexInParent: indexInParent,
    selectorsInParent: selectorsInParent,
    descendantsInAncestor: descendantsInAncestor
  };

  var isBr = function (elem) {
    return $_q4uvfkhjd09ex4i.name(elem) === 'br';
  };
  var gatherer = function (cand, gather, isRoot) {
    return gather(cand, isRoot).bind(function (target) {
      return $_q4uvfkhjd09ex4i.isText(target) && $_3v8a0jkyjd09ex6m.get(target).trim().length === 0 ? gatherer(target, gather, isRoot) : $_dmlx9ujhjd09ex0f.some(target);
    });
  };
  var handleBr = function (isRoot, element, direction) {
    return direction.traverse(element).orThunk(function () {
      return gatherer(element, direction.gather, isRoot);
    }).map(direction.relative);
  };
  var findBr = function (element, offset) {
    return $_cunhv4jxjd09ex2m.child(element, offset).filter(isBr).orThunk(function () {
      return $_cunhv4jxjd09ex2m.child(element, offset - 1).filter(isBr);
    });
  };
  var handleParent = function (isRoot, element, offset, direction) {
    return findBr(element, offset).bind(function (br) {
      return direction.traverse(br).fold(function () {
        return gatherer(br, direction.gather, isRoot).map(direction.relative);
      }, function (adjacent) {
        return $_2bsd80p3jd09exzj.indexInParent(adjacent).map(function (info) {
          return $_18idwio4jd09ext7.on(info.parent(), info.index());
        });
      });
    });
  };
  var tryBr = function (isRoot, element, offset, direction) {
    var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
    return target.map(function (tgt) {
      return {
        start: $_e1ub5rjijd09ex0p.constant(tgt),
        finish: $_e1ub5rjijd09ex0p.constant(tgt)
      };
    });
  };
  var process = function (analysis) {
    return $_73fbx9p0jd09exyx.cata(analysis, function (message) {
      return $_dmlx9ujhjd09ex0f.none('BR ADT: none');
    }, function () {
      return $_dmlx9ujhjd09ex0f.none();
    }, function (cell) {
      return $_dmlx9ujhjd09ex0f.some($_g5powqp2jd09exzh.point(cell, 0));
    }, function (cell) {
      return $_dmlx9ujhjd09ex0f.some($_g5powqp2jd09exzh.point(cell, $_at3nybkxjd09ex6k.getEnd(cell)));
    });
  };
  var $_dpg6fwp1jd09exz4 = {
    tryBr: tryBr,
    process: process
  };

  var MAX_RETRIES = 20;
  var platform$1 = $_3qhsx8k4jd09ex3f.detect();
  var findSpot = function (bridge, isRoot, direction) {
    return bridge.getSelection().bind(function (sel) {
      return $_dpg6fwp1jd09exz4.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
        return $_dmlx9ujhjd09ex0f.some($_g5powqp2jd09exzh.point(sel.finish(), sel.foffset()));
      }, function (brNeighbour) {
        var range = bridge.fromSitus(brNeighbour);
        var analysis = $_73fbx9p0jd09exyx.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
        return $_dpg6fwp1jd09exz4.process(analysis);
      });
    });
  };
  var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
    if (numRetries === 0)
      return $_dmlx9ujhjd09ex0f.none();
    return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
      var range = bridge.fromSitus(situs);
      var analysis = $_73fbx9p0jd09exyx.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
      return $_73fbx9p0jd09exyx.cata(analysis, function () {
        return $_dmlx9ujhjd09ex0f.none();
      }, function () {
        return $_dmlx9ujhjd09ex0f.some(situs);
      }, function (cell) {
        if ($_a4998rjzjd09ex33.eq(element, cell) && offset === 0)
          return tryAgain(bridge, element, offset, $_3x0o9xosjd09exxw.moveUp, direction);
        else
          return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
      }, function (cell) {
        if ($_a4998rjzjd09ex33.eq(element, cell) && offset === $_at3nybkxjd09ex6k.getEnd(cell))
          return tryAgain(bridge, element, offset, $_3x0o9xosjd09exxw.moveDown, direction);
        else
          return scan(bridge, isRoot, cell, $_at3nybkxjd09ex6k.getEnd(cell), direction, numRetries - 1);
      });
    });
  };
  var tryAgain = function (bridge, element, offset, move, direction) {
    return $_bz05ltotjd09exxz.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, move(box, $_aca5fmoujd09exy5.getJumpSize()));
    });
  };
  var tryAt = function (bridge, direction, box) {
    if (platform$1.browser.isChrome() || platform$1.browser.isSafari() || platform$1.browser.isFirefox() || platform$1.browser.isEdge())
      return direction.otherRetry(bridge, box);
    else if (platform$1.browser.isIE())
      return direction.ieRetry(bridge, box);
    else
      return $_dmlx9ujhjd09ex0f.none();
  };
  var tryCursor = function (bridge, isRoot, element, offset, direction) {
    return $_bz05ltotjd09exxz.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, box);
    });
  };
  var handle$2 = function (bridge, isRoot, direction) {
    return findSpot(bridge, isRoot, direction).bind(function (spot) {
      return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
    });
  };
  var $_g6f5mforjd09exxi = { handle: handle$2 };

  var any$1 = function (predicate) {
    return $_d4i6ihkmjd09ex4s.first(predicate).isSome();
  };
  var ancestor$3 = function (scope, predicate, isRoot) {
    return $_d4i6ihkmjd09ex4s.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$3 = function (scope, predicate, isRoot) {
    return $_d4i6ihkmjd09ex4s.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$3 = function (scope, predicate) {
    return $_d4i6ihkmjd09ex4s.sibling(scope, predicate).isSome();
  };
  var child$4 = function (scope, predicate) {
    return $_d4i6ihkmjd09ex4s.child(scope, predicate).isSome();
  };
  var descendant$3 = function (scope, predicate) {
    return $_d4i6ihkmjd09ex4s.descendant(scope, predicate).isSome();
  };
  var $_15qxakp4jd09exzx = {
    any: any$1,
    ancestor: ancestor$3,
    closest: closest$3,
    sibling: sibling$3,
    child: child$4,
    descendant: descendant$3
  };

  var detection = $_3qhsx8k4jd09ex3f.detect();
  var inSameTable = function (elem, table) {
    return $_15qxakp4jd09exzx.ancestor(elem, function (e) {
      return $_cunhv4jxjd09ex2m.parent(e).exists(function (p) {
        return $_a4998rjzjd09ex33.eq(p, table);
      });
    });
  };
  var simulate = function (bridge, isRoot, direction, initial, anchor) {
    return $_2ljr38kljd09ex4r.closest(initial, 'td,th', isRoot).bind(function (start) {
      return $_2ljr38kljd09ex4r.closest(start, 'table', isRoot).bind(function (table) {
        if (!inSameTable(anchor, table))
          return $_dmlx9ujhjd09ex0f.none();
        return $_g6f5mforjd09exxi.handle(bridge, isRoot, direction).bind(function (range) {
          return $_2ljr38kljd09ex4r.closest(range.finish(), 'td,th', isRoot).map(function (finish) {
            return {
              start: $_e1ub5rjijd09ex0p.constant(start),
              finish: $_e1ub5rjijd09ex0p.constant(finish),
              range: $_e1ub5rjijd09ex0p.constant(range)
            };
          });
        });
      });
    });
  };
  var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
    if (detection.browser.isIE()) {
      return $_dmlx9ujhjd09ex0f.none();
    } else {
      return precheck(initial, isRoot).orThunk(function () {
        return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
          var range = info.range();
          return $_9a7sjvokjd09exvy.response($_dmlx9ujhjd09ex0f.some($_eso6yxonjd09exwc.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
        });
      });
    }
  };
  var firstUpCheck = function (initial, isRoot) {
    return $_2ljr38kljd09ex4r.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_2ljr38kljd09ex4r.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_baxp2xkijd09ex4k.descendants(table, 'tr');
        if ($_a4998rjzjd09ex33.eq(startRow, rows[0])) {
          return $_eccjgpovjd09exyg.seekLeft(table, function (element) {
            return $_dczsdckwjd09ex6h.last(element).isSome();
          }, isRoot).map(function (last) {
            var lastOffset = $_at3nybkxjd09ex6k.getEnd(last);
            return $_9a7sjvokjd09exvy.response($_dmlx9ujhjd09ex0f.some($_eso6yxonjd09exwc.makeSitus(last, lastOffset, last, lastOffset)), true);
          });
        } else {
          return $_dmlx9ujhjd09ex0f.none();
        }
      });
    });
  };
  var lastDownCheck = function (initial, isRoot) {
    return $_2ljr38kljd09ex4r.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_2ljr38kljd09ex4r.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_baxp2xkijd09ex4k.descendants(table, 'tr');
        if ($_a4998rjzjd09ex33.eq(startRow, rows[rows.length - 1])) {
          return $_eccjgpovjd09exyg.seekRight(table, function (element) {
            return $_dczsdckwjd09ex6h.first(element).isSome();
          }, isRoot).map(function (first) {
            return $_9a7sjvokjd09exvy.response($_dmlx9ujhjd09ex0f.some($_eso6yxonjd09exwc.makeSitus(first, 0, first, 0)), true);
          });
        } else {
          return $_dmlx9ujhjd09ex0f.none();
        }
      });
    });
  };
  var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
    return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
      return $_3ldm85opjd09exwp.detect(container, isRoot, info.start(), info.finish(), selectRange);
    });
  };
  var $_3updcdoqjd09exx0 = {
    navigate: navigate,
    select: select,
    firstUpCheck: firstUpCheck,
    lastDownCheck: lastDownCheck
  };

  var findCell = function (target, isRoot) {
    return $_2ljr38kljd09ex4r.closest(target, 'td,th', isRoot);
  };
  function MouseSelection (bridge, container, isRoot, annotations) {
    var cursor = $_dmlx9ujhjd09ex0f.none();
    var clearState = function () {
      cursor = $_dmlx9ujhjd09ex0f.none();
    };
    var mousedown = function (event) {
      annotations.clear(container);
      cursor = findCell(event.target(), isRoot);
    };
    var mouseover = function (event) {
      cursor.each(function (start) {
        annotations.clear(container);
        findCell(event.target(), isRoot).each(function (finish) {
          $_u1a8ml4jd09ex7j.identify(start, finish, isRoot).each(function (cellSel) {
            var boxes = cellSel.boxes().getOr([]);
            if (boxes.length > 1 || boxes.length === 1 && !$_a4998rjzjd09ex33.eq(start, finish)) {
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

  var $_arsgspp6jd09ey04 = {
    down: {
      traverse: $_cunhv4jxjd09ex2m.nextSibling,
      gather: $_eccjgpovjd09exyg.after,
      relative: $_18idwio4jd09ext7.before,
      otherRetry: $_aca5fmoujd09exy5.tryDown,
      ieRetry: $_aca5fmoujd09exy5.ieTryDown,
      failure: $_73fbx9p0jd09exyx.adt.failedDown
    },
    up: {
      traverse: $_cunhv4jxjd09ex2m.prevSibling,
      gather: $_eccjgpovjd09exyg.before,
      relative: $_18idwio4jd09ext7.before,
      otherRetry: $_aca5fmoujd09exy5.tryUp,
      ieRetry: $_aca5fmoujd09exy5.ieTryUp,
      failure: $_73fbx9p0jd09exyx.adt.failedUp
    }
  };

  var rc = $_6c8np0jljd09ex18.immutable('rows', 'cols');
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
      return $_dmlx9ujhjd09ex0f.none();
    };
    var keydown = function (event, start, soffset, finish, foffset, direction) {
      var keycode = event.raw().which;
      var shiftKey = event.raw().shiftKey === true;
      var handler = $_u1a8ml4jd09ex7j.retrieve(container, annotations.selectedSelector()).fold(function () {
        if ($_98579yoljd09exw0.isDown(keycode) && shiftKey) {
          return $_e1ub5rjijd09ex0p.curry($_3updcdoqjd09exx0.select, bridge, container, isRoot, $_arsgspp6jd09ey04.down, finish, start, annotations.selectRange);
        } else if ($_98579yoljd09exw0.isUp(keycode) && shiftKey) {
          return $_e1ub5rjijd09ex0p.curry($_3updcdoqjd09exx0.select, bridge, container, isRoot, $_arsgspp6jd09ey04.up, finish, start, annotations.selectRange);
        } else if ($_98579yoljd09exw0.isDown(keycode)) {
          return $_e1ub5rjijd09ex0p.curry($_3updcdoqjd09exx0.navigate, bridge, isRoot, $_arsgspp6jd09ey04.down, finish, start, $_3updcdoqjd09exx0.lastDownCheck);
        } else if ($_98579yoljd09exw0.isUp(keycode)) {
          return $_e1ub5rjijd09ex0p.curry($_3updcdoqjd09exx0.navigate, bridge, isRoot, $_arsgspp6jd09ey04.up, finish, start, $_3updcdoqjd09exx0.firstUpCheck);
        } else {
          return $_dmlx9ujhjd09ex0f.none;
        }
      }, function (selected) {
        var update = function (attempts) {
          return function () {
            var navigation = $_3rmc78majd09exe8.findMap(attempts, function (delta) {
              return $_3ldm85opjd09exwp.update(delta.rows(), delta.cols(), container, selected, annotations);
            });
            return navigation.fold(function () {
              return $_u1a8ml4jd09ex7j.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                var relative = $_98579yoljd09exw0.isDown(keycode) || direction.isForward(keycode) ? $_18idwio4jd09ext7.after : $_18idwio4jd09ext7.before;
                bridge.setRelativeSelection($_18idwio4jd09ext7.on(edges.first(), 0), relative(edges.table()));
                annotations.clear(container);
                return $_9a7sjvokjd09exvy.response($_dmlx9ujhjd09ex0f.none(), true);
              });
            }, function (_) {
              return $_dmlx9ujhjd09ex0f.some($_9a7sjvokjd09exvy.response($_dmlx9ujhjd09ex0f.none(), true));
            });
          };
        };
        if ($_98579yoljd09exw0.isDown(keycode) && shiftKey)
          return update([rc(+1, 0)]);
        else if ($_98579yoljd09exw0.isUp(keycode) && shiftKey)
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
        else if ($_98579yoljd09exw0.isNavigation(keycode) && shiftKey === false)
          return clearToNavigate;
        else
          return $_dmlx9ujhjd09ex0f.none;
      });
      return handler();
    };
    var keyup = function (event, start, soffset, finish, foffset) {
      return $_u1a8ml4jd09ex7j.retrieve(container, annotations.selectedSelector()).fold(function () {
        var keycode = event.raw().which;
        var shiftKey = event.raw().shiftKey === true;
        if (shiftKey === false)
          return $_dmlx9ujhjd09ex0f.none();
        if ($_98579yoljd09exw0.isNavigation(keycode))
          return $_3ldm85opjd09exwp.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
        else
          return $_dmlx9ujhjd09ex0f.none();
      }, $_dmlx9ujhjd09ex0f.none);
    };
    return {
      keydown: keydown,
      keyup: keyup
    };
  };
  var $_2yy3clojjd09exvj = {
    mouse: mouse,
    keyboard: keyboard
  };

  var add$3 = function (element, classes) {
    $_51vcxojgjd09ex09.each(classes, function (x) {
      $_dp12qlmljd09exg5.add(element, x);
    });
  };
  var remove$7 = function (element, classes) {
    $_51vcxojgjd09ex09.each(classes, function (x) {
      $_dp12qlmljd09exg5.remove(element, x);
    });
  };
  var toggle$2 = function (element, classes) {
    $_51vcxojgjd09ex09.each(classes, function (x) {
      $_dp12qlmljd09exg5.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_51vcxojgjd09ex09.forall(classes, function (clazz) {
      return $_dp12qlmljd09exg5.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_51vcxojgjd09ex09.exists(classes, function (clazz) {
      return $_dp12qlmljd09exg5.has(element, clazz);
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
    return $_6idyogmnjd09exgf.supports(element) ? getNative(element) : $_6idyogmnjd09exgf.get(element);
  };
  var $_cin7rcp9jd09ey0i = {
    add: add$3,
    remove: remove$7,
    toggle: toggle$2,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$11
  };

  var addClass = function (clazz) {
    return function (element) {
      $_dp12qlmljd09exg5.add(element, clazz);
    };
  };
  var removeClass = function (clazz) {
    return function (element) {
      $_dp12qlmljd09exg5.remove(element, clazz);
    };
  };
  var removeClasses = function (classes) {
    return function (element) {
      $_cin7rcp9jd09ey0i.remove(element, classes);
    };
  };
  var hasClass = function (clazz) {
    return function (element) {
      return $_dp12qlmljd09exg5.has(element, clazz);
    };
  };
  var $_eiohc2p8jd09ey0h = {
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    hasClass: hasClass
  };

  var byClass = function (ephemera) {
    var addSelectionClass = $_eiohc2p8jd09ey0h.addClass(ephemera.selected());
    var removeSelectionClasses = $_eiohc2p8jd09ey0h.removeClasses([
      ephemera.selected(),
      ephemera.lastSelected(),
      ephemera.firstSelected()
    ]);
    var clear = function (container) {
      var sels = $_baxp2xkijd09ex4k.descendants(container, ephemera.selectedSelector());
      $_51vcxojgjd09ex09.each(sels, removeSelectionClasses);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_51vcxojgjd09ex09.each(cells, addSelectionClass);
      $_dp12qlmljd09exg5.add(start, ephemera.firstSelected());
      $_dp12qlmljd09exg5.add(finish, ephemera.lastSelected());
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
      $_d01oh0kgjd09ex47.remove(element, ephemera.selected());
      $_d01oh0kgjd09ex47.remove(element, ephemera.firstSelected());
      $_d01oh0kgjd09ex47.remove(element, ephemera.lastSelected());
    };
    var addSelectionAttribute = function (element) {
      $_d01oh0kgjd09ex47.set(element, ephemera.selected(), '1');
    };
    var clear = function (container) {
      var sels = $_baxp2xkijd09ex4k.descendants(container, ephemera.selectedSelector());
      $_51vcxojgjd09ex09.each(sels, removeSelectionAttributes);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_51vcxojgjd09ex09.each(cells, addSelectionAttribute);
      $_d01oh0kgjd09ex47.set(start, ephemera.firstSelected(), '1');
      $_d01oh0kgjd09ex47.set(finish, ephemera.lastSelected(), '1');
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var $_azwcf4p7jd09ey09 = {
    byClass: byClass,
    byAttr: byAttr
  };

  function CellSelection$1 (editor, lazyResize) {
    var handlerStruct = $_6c8np0jljd09ex18.immutableBag([
      'mousedown',
      'mouseover',
      'mouseup',
      'keyup',
      'keydown'
    ], []);
    var handlers = $_dmlx9ujhjd09ex0f.none();
    var annotations = $_azwcf4p7jd09ey09.byAttr($_7k08wvlgjd09ex9t);
    editor.on('init', function (e) {
      var win = editor.getWin();
      var body = $_5ioit5n2jd09exij.getBody(editor);
      var isRoot = $_5ioit5n2jd09exij.getIsRoot(editor);
      var syncSelection = function () {
        var sel = editor.selection;
        var start = $_f1ygtcjvjd09ex2h.fromDom(sel.getStart());
        var end = $_f1ygtcjvjd09ex2h.fromDom(sel.getEnd());
        var startTable = $_t50u2jsjd09ex1p.table(start);
        var endTable = $_t50u2jsjd09ex1p.table(end);
        var sameTable = startTable.bind(function (tableStart) {
          return endTable.bind(function (tableEnd) {
            return $_a4998rjzjd09ex33.eq(tableStart, tableEnd) ? $_dmlx9ujhjd09ex0f.some(true) : $_dmlx9ujhjd09ex0f.none();
          });
        });
        sameTable.fold(function () {
          annotations.clear(body);
        }, $_e1ub5rjijd09ex0p.noop);
      };
      var mouseHandlers = $_2yy3clojjd09exvj.mouse(win, body, isRoot, annotations);
      var keyHandlers = $_2yy3clojjd09exvj.keyboard(win, body, isRoot, annotations);
      var handleResponse = function (event, response) {
        if (response.kill()) {
          event.kill();
        }
        response.selection().each(function (ns) {
          var relative = $_2thekfo3jd09ext4.relative(ns.start(), ns.finish());
          var rng = $_cr5s9yo9jd09exu3.asLtrRange(win, relative);
          editor.selection.setRng(rng);
        });
      };
      var keyup = function (event) {
        var wrappedEvent = wrapEvent(event);
        if (wrappedEvent.raw().shiftKey && $_98579yoljd09exw0.isNavigation(wrappedEvent.raw().which)) {
          var rng = editor.selection.getRng();
          var start = $_f1ygtcjvjd09ex2h.fromDom(rng.startContainer);
          var end = $_f1ygtcjvjd09ex2h.fromDom(rng.endContainer);
          keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
        }
      };
      var checkLast = function (last) {
        return !$_d01oh0kgjd09ex47.has(last, 'data-mce-bogus') && $_q4uvfkhjd09ex4i.name(last) !== 'br' && !($_q4uvfkhjd09ex4i.isText(last) && $_3v8a0jkyjd09ex6m.get(last).length === 0);
      };
      var getLast = function () {
        var body = $_f1ygtcjvjd09ex2h.fromDom(editor.getBody());
        var lastChild = $_cunhv4jxjd09ex2m.lastChild(body);
        var getPrevLast = function (last) {
          return $_cunhv4jxjd09ex2m.prevSibling(last).bind(function (prevLast) {
            return checkLast(prevLast) ? $_dmlx9ujhjd09ex0f.some(prevLast) : getPrevLast(prevLast);
          });
        };
        return lastChild.bind(function (last) {
          return checkLast(last) ? $_dmlx9ujhjd09ex0f.some(last) : getPrevLast(last);
        });
      };
      var keydown = function (event) {
        var wrappedEvent = wrapEvent(event);
        lazyResize().each(function (resize) {
          resize.hideBars();
        });
        if (event.which === 40) {
          getLast().each(function (last) {
            if ($_q4uvfkhjd09ex4i.name(last) === 'table') {
              if (editor.settings.forced_root_block) {
                editor.dom.add(editor.getBody(), editor.settings.forced_root_block, editor.settings.forced_root_block_attrs, '<br/>');
              } else {
                editor.dom.add(editor.getBody(), 'br');
              }
            }
          });
        }
        var rng = editor.selection.getRng();
        var startContainer = $_f1ygtcjvjd09ex2h.fromDom(editor.selection.getStart());
        var start = $_f1ygtcjvjd09ex2h.fromDom(rng.startContainer);
        var end = $_f1ygtcjvjd09ex2h.fromDom(rng.endContainer);
        var direction = $_2pqq9jn3jd09exim.directionAt(startContainer).isRtl() ? $_98579yoljd09exw0.rtl : $_98579yoljd09exw0.ltr;
        keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
          handleResponse(wrappedEvent, response);
        });
        lazyResize().each(function (resize) {
          resize.showBars();
        });
      };
      var wrapEvent = function (event) {
        var target = $_f1ygtcjvjd09ex2h.fromDom(event.target);
        var stop = function () {
          event.stopPropagation();
        };
        var prevent = function () {
          event.preventDefault();
        };
        var kill = $_e1ub5rjijd09ex0p.compose(prevent, stop);
        return {
          target: $_e1ub5rjijd09ex0p.constant(target),
          x: $_e1ub5rjijd09ex0p.constant(event.x),
          y: $_e1ub5rjijd09ex0p.constant(event.y),
          stop: stop,
          prevent: prevent,
          kill: kill,
          raw: $_e1ub5rjijd09ex0p.constant(event)
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
        if (isLeftMouse) {
          mouseHandlers.mouseup(wrapEvent(e));
        }
      };
      editor.on('mousedown', mouseDown);
      editor.on('mouseover', mouseOver);
      editor.on('mouseup', mouseUp);
      editor.on('keyup', keyup);
      editor.on('keydown', keydown);
      editor.on('nodechange', syncSelection);
      handlers = $_dmlx9ujhjd09ex0f.some(handlerStruct({
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

  function Selections (editor) {
    var get = function () {
      var body = $_5ioit5n2jd09exij.getBody(editor);
      return $_146qqcl3jd09ex7d.retrieve(body, $_7k08wvlgjd09ex9t.selectedSelector()).fold(function () {
        if (editor.selection.getStart() === undefined) {
          return $_f7bzc7lhjd09ex9v.none();
        } else {
          return $_f7bzc7lhjd09ex9v.single(editor.selection);
        }
      }, function (cells) {
        return $_f7bzc7lhjd09ex9v.multiple(cells);
      });
    };
    return { get: get };
  }

  var each$4 = Tools.each;
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
      onclick: $_e1ub5rjijd09ex0p.curry($_5az2byn8jd09exj5.open, editor, true),
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
    var toolbarItems = editor.settings.table_toolbar;
    if (toolbarItems === '' || toolbarItems === false) {
      return;
    }
    if (!toolbarItems) {
      toolbarItems = 'tableprops tabledelete | ' + 'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' + 'tableinsertcolbefore tableinsertcolafter tabledeletecol';
    }
    editor.addContextToolbar(isTable, toolbarItems);
  };
  var $_5vq7qxpbjd09ey0s = {
    addButtons: addButtons,
    addToolbars: addToolbars
  };

  var addMenuItems = function (editor, selections) {
    var targets = $_dmlx9ujhjd09ex0f.none();
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
        $_51vcxojgjd09ex09.each(tableCtrls, noTargetDisable);
        $_51vcxojgjd09ex09.each(cellCtrls, noTargetDisable);
        $_51vcxojgjd09ex09.each(mergeCtrls, noTargetDisable);
        $_51vcxojgjd09ex09.each(unmergeCtrls, noTargetDisable);
      }, function (targets) {
        $_51vcxojgjd09ex09.each(tableCtrls, ctrlEnable);
        $_51vcxojgjd09ex09.each(cellCtrls, ctrlEnable);
        $_51vcxojgjd09ex09.each(mergeCtrls, function (mergeCtrl) {
          mergeCtrl.disabled(targets.mergable().isNone());
        });
        $_51vcxojgjd09ex09.each(unmergeCtrls, function (unmergeCtrl) {
          unmergeCtrl.disabled(targets.unmergable().isNone());
        });
      });
    };
    editor.on('init', function () {
      editor.on('nodechange', function (e) {
        var cellOpt = $_dmlx9ujhjd09ex0f.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        targets = cellOpt.bind(function (cellDom) {
          var cell = $_f1ygtcjvjd09ex2h.fromDom(cellDom);
          var table = $_t50u2jsjd09ex1p.table(cell);
          return table.map(function (table) {
            return $_6y2jcpl1jd09ex72.forMenu(selections, table, cell);
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
    var insertTable = editor.settings.table_grid === false ? {
      text: 'Table',
      icon: 'table',
      context: 'table',
      onclick: $_e1ub5rjijd09ex0p.curry($_5az2byn8jd09exj5.open, editor)
    } : {
      text: 'Table',
      icon: 'table',
      context: 'table',
      ariaHideMenu: true,
      onclick: function (e) {
        if (e.aria) {
          this.parent().hideAll();
          e.stopImmediatePropagation();
          $_5az2byn8jd09exj5.open(editor);
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
                $_f5phx5ljjd09exa0.insert(editor, self.lastX + 1, self.lastY + 1);
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
      onclick: $_e1ub5rjijd09ex0p.curry($_5az2byn8jd09exj5.open, editor, true)
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
  var $_b48l8qpcjd09ey0x = { addMenuItems: addMenuItems };

  function Plugin(editor) {
    var self = this;
    var resizeHandler = ResizeHandler(editor);
    var cellSelection = CellSelection$1(editor, resizeHandler.lazyResize);
    var actions = TableActions(editor, resizeHandler.lazyWire);
    var selections = Selections(editor);
    $_35zvpin5jd09exir.registerCommands(editor, actions, cellSelection, selections);
    $_2zfsqojfjd09ewzu.registerEvents(editor, selections, actions, cellSelection);
    $_b48l8qpcjd09ey0x.addMenuItems(editor, selections);
    $_5vq7qxpbjd09ey0s.addButtons(editor);
    $_5vq7qxpbjd09ey0s.addToolbars(editor);
    editor.on('PreInit', function () {
      editor.serializer.addTempAttr($_7k08wvlgjd09ex9t.firstSelected());
      editor.serializer.addTempAttr($_7k08wvlgjd09ex9t.lastSelected());
    });
    if (editor.settings.table_tab_navigation !== false) {
      editor.on('keydown', function (e) {
        $_8zihlao0jd09exsj.handle(e, editor, actions, resizeHandler.lazyWire);
      });
    }
    editor.on('remove', function () {
      resizeHandler.destroy();
      cellSelection.destroy();
    });
    self.insertTable = function (columns, rows) {
      return $_f5phx5ljjd09exa0.insert(editor, columns, rows);
    };
    self.setClipboardRows = $_35zvpin5jd09exir.setClipboardRows;
    self.getClipboardRows = $_35zvpin5jd09exir.getClipboardRows;
  }
  PluginManager.add('table', Plugin);
  function Plugin$1 () {
  }

  return Plugin$1;

}());
})()
