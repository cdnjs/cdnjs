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
  var $_e8r7mrjsjdud7bkx = {
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

  var never$1 = $_e8r7mrjsjdud7bkx.never;
  var always$1 = $_e8r7mrjsjdud7bkx.always;
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
      toString: $_e8r7mrjsjdud7bkx.constant('none()')
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
  var $_2b6dlmjqjdud7bko = {
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
  var $_fzfxsxjujdud7ble = {
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
      $_2b6dlmjqjdud7bko.each(fields, function (name, i) {
        struct[name] = $_e8r7mrjsjdud7bkx.constant(values[i]);
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
  var $_duf7n8jzjdud7blu = {
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
    if (!$_duf7n8jzjdud7blu.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_2b6dlmjqjdud7bko.each(array, function (a) {
      if (!$_duf7n8jzjdud7blu.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_2b6dlmjqjdud7bko.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_jsge2jyjdud7bls = {
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
    $_jsge2jyjdud7bls.validateStrArr('required', required);
    $_jsge2jyjdud7bls.validateStrArr('optional', optional);
    $_jsge2jyjdud7bls.checkDupes(everything);
    return function (obj) {
      var keys = $_fzfxsxjujdud7ble.keys(obj);
      var allReqd = $_2b6dlmjqjdud7bko.forall(required, function (req) {
        return $_2b6dlmjqjdud7bko.contains(keys, req);
      });
      if (!allReqd)
        $_jsge2jyjdud7bls.reqMessage(required, keys);
      var unsupported = $_2b6dlmjqjdud7bko.filter(keys, function (key) {
        return !$_2b6dlmjqjdud7bko.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_jsge2jyjdud7bls.unsuppMessage(unsupported);
      var r = {};
      $_2b6dlmjqjdud7bko.each(required, function (req) {
        r[req] = $_e8r7mrjsjdud7bkx.constant(obj[req]);
      });
      $_2b6dlmjqjdud7bko.each(optional, function (opt) {
        r[opt] = $_e8r7mrjsjdud7bkx.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]) : Option.none());
      });
      return r;
    };
  }

  var $_4vwz6tjvjdud7blm = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var dimensions = $_4vwz6tjvjdud7blm.immutable('width', 'height');
  var grid = $_4vwz6tjvjdud7blm.immutable('rows', 'columns');
  var address = $_4vwz6tjvjdud7blm.immutable('row', 'column');
  var coords = $_4vwz6tjvjdud7blm.immutable('x', 'y');
  var detail = $_4vwz6tjvjdud7blm.immutable('element', 'rowspan', 'colspan');
  var detailnew = $_4vwz6tjvjdud7blm.immutable('element', 'rowspan', 'colspan', 'isNew');
  var extended = $_4vwz6tjvjdud7blm.immutable('element', 'rowspan', 'colspan', 'row', 'column');
  var rowdata = $_4vwz6tjvjdud7blm.immutable('element', 'cells', 'section');
  var elementnew = $_4vwz6tjvjdud7blm.immutable('element', 'isNew');
  var rowdatanew = $_4vwz6tjvjdud7blm.immutable('element', 'cells', 'section', 'isNew');
  var rowcells = $_4vwz6tjvjdud7blm.immutable('cells', 'section');
  var rowdetails = $_4vwz6tjvjdud7blm.immutable('details', 'section');
  var bounds = $_4vwz6tjvjdud7blm.immutable('startRow', 'startCol', 'finishRow', 'finishCol');
  var $_g6h236k1jdud7bm2 = {
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
    return { dom: $_e8r7mrjsjdud7bkx.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_2q3j53k5jdud7bmr = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_4yj7d2k6jdud7bmv = {
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

  var ELEMENT = $_4yj7d2k6jdud7bmv.ELEMENT;
  var DOCUMENT = $_4yj7d2k6jdud7bmv.DOCUMENT;
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
    return bypassSelector(base) ? [] : $_2b6dlmjqjdud7bko.map(base.querySelectorAll(selector), $_2q3j53k5jdud7bmr.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map($_2q3j53k5jdud7bmr.fromDom);
  };
  var $_zvi87k4jdud7bmn = {
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
  var $_6g257sk8jdud7bn6 = { toArray: toArray };

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
  var $_1youybkcjdud7bno = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_1youybkcjdud7bno.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_geldl3kbjdud7bnf = { getOrDie: getOrDie };

  var node = function () {
    var f = $_geldl3kbjdud7bnf.getOrDie('Node');
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
  var $_8cyrgxkajdud7bne = {
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
  var $_fkkxj4kfjdud7bns = { cached: cached };

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
  var $_1nzphakijdud7bny = {
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
      version: $_1nzphakijdud7bny.unknown()
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
  var $_egui95khjdud7bnv = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_e8r7mrjsjdud7bkx.constant(edge),
    chrome: $_e8r7mrjsjdud7bkx.constant(chrome),
    ie: $_e8r7mrjsjdud7bkx.constant(ie),
    opera: $_e8r7mrjsjdud7bkx.constant(opera),
    firefox: $_e8r7mrjsjdud7bkx.constant(firefox),
    safari: $_e8r7mrjsjdud7bkx.constant(safari)
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
      version: $_1nzphakijdud7bny.unknown()
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
  var $_11ab7ekjjdud7bo1 = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_e8r7mrjsjdud7bkx.constant(windows),
    ios: $_e8r7mrjsjdud7bkx.constant(ios),
    android: $_e8r7mrjsjdud7bkx.constant(android),
    linux: $_e8r7mrjsjdud7bkx.constant(linux),
    osx: $_e8r7mrjsjdud7bkx.constant(osx),
    solaris: $_e8r7mrjsjdud7bkx.constant(solaris),
    freebsd: $_e8r7mrjsjdud7bkx.constant(freebsd)
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
      isiPad: $_e8r7mrjsjdud7bkx.constant(isiPad),
      isiPhone: $_e8r7mrjsjdud7bkx.constant(isiPhone),
      isTablet: $_e8r7mrjsjdud7bkx.constant(isTablet),
      isPhone: $_e8r7mrjsjdud7bkx.constant(isPhone),
      isTouch: $_e8r7mrjsjdud7bkx.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_e8r7mrjsjdud7bkx.constant(iOSwebview)
    };
  }

  var detect$1 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_2b6dlmjqjdud7bko.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_1nzphakijdud7bny.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_1nzphakijdud7bny.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_3yx7dkljdud7bo6 = {
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
  var $_awqw62kojdud7boj = {
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
  var $_fhuohkkpjdud7bok = {
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
    return startsWith(str, prefix) ? $_awqw62kojdud7boj.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_awqw62kojdud7boj.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_awqw62kojdud7boj.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_awqw62kojdud7boj.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_fhuohkkpjdud7bok.head(str).bind(function (head) {
      return $_fhuohkkpjdud7bok.tail(str).map(function (tail) {
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
  var $_a5si2uknjdud7bog = {
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
      return $_a5si2uknjdud7bog.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_a5si2uknjdud7bog.contains(uastring, 'edge/') && $_a5si2uknjdud7bog.contains(uastring, 'chrome') && $_a5si2uknjdud7bog.contains(uastring, 'safari') && $_a5si2uknjdud7bog.contains(uastring, 'applewebkit');
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
        return $_a5si2uknjdud7bog.contains(uastring, 'chrome') && !$_a5si2uknjdud7bog.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_a5si2uknjdud7bog.contains(uastring, 'msie') || $_a5si2uknjdud7bog.contains(uastring, 'trident');
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
        return ($_a5si2uknjdud7bog.contains(uastring, 'safari') || $_a5si2uknjdud7bog.contains(uastring, 'mobile/')) && $_a5si2uknjdud7bog.contains(uastring, 'applewebkit');
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
        return $_a5si2uknjdud7bog.contains(uastring, 'iphone') || $_a5si2uknjdud7bog.contains(uastring, 'ipad');
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
  var $_9h3blckmjdud7bob = {
    browsers: $_e8r7mrjsjdud7bkx.constant(browsers),
    oses: $_e8r7mrjsjdud7bkx.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_9h3blckmjdud7bob.browsers();
    var oses = $_9h3blckmjdud7bob.oses();
    var browser = $_3yx7dkljdud7bo6.detectBrowser(browsers, userAgent).fold($_egui95khjdud7bnv.unknown, $_egui95khjdud7bnv.nu);
    var os = $_3yx7dkljdud7bo6.detectOs(oses, userAgent).fold($_11ab7ekjjdud7bo1.unknown, $_11ab7ekjjdud7bo1.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_4o2cd2kgjdud7bnt = { detect: detect$2 };

  var detect$3 = $_fkkxj4kfjdud7bns.cached(function () {
    var userAgent = navigator.userAgent;
    return $_4o2cd2kgjdud7bnt.detect(userAgent);
  });
  var $_e4jb8lkejdud7bnr = { detect: detect$3 };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_2b6dlmjqjdud7bko.exists(elements, $_e8r7mrjsjdud7bkx.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_8cyrgxkajdud7bne.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_e4jb8lkejdud7bnr.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_6nkapzk9jdud7bn7 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_zvi87k4jdud7bmn.is
  };

  var owner = function (element) {
    return $_2q3j53k5jdud7bmr.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_2q3j53k5jdud7bmr.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_2q3j53k5jdud7bmr.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return Option.from(dom.parentNode).map($_2q3j53k5jdud7bmr.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_2b6dlmjqjdud7bko.findIndex(kin, function (elem) {
        return $_6nkapzk9jdud7bn7.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_duf7n8jzjdud7blu.isFunction(isRoot) ? isRoot : $_e8r7mrjsjdud7bkx.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_2q3j53k5jdud7bmr.fromDom(rawParent);
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
      return $_2b6dlmjqjdud7bko.filter(elements, function (x) {
        return !$_6nkapzk9jdud7bn7.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return Option.from(dom.offsetParent).map($_2q3j53k5jdud7bmr.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.previousSibling).map($_2q3j53k5jdud7bmr.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.nextSibling).map($_2q3j53k5jdud7bmr.fromDom);
  };
  var prevSiblings = function (element) {
    return $_2b6dlmjqjdud7bko.reverse($_6g257sk8jdud7bn6.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_6g257sk8jdud7bn6.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_2b6dlmjqjdud7bko.map(dom.childNodes, $_2q3j53k5jdud7bmr.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return Option.from(children[index]).map($_2q3j53k5jdud7bmr.fromDom);
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
  var spot = $_4vwz6tjvjdud7blm.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_9s8a4jk7jdud7bmw = {
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
    return filterFirstLayer(scope, selector, $_e8r7mrjsjdud7bkx.constant(true));
  };
  var filterFirstLayer = function (scope, selector, predicate) {
    return $_2b6dlmjqjdud7bko.bind($_9s8a4jk7jdud7bmw.children(scope), function (x) {
      return $_zvi87k4jdud7bmn.is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
    });
  };
  var $_7iyapuk3jdud7bmh = {
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
    return type(element) === $_4yj7d2k6jdud7bmv.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_4yj7d2k6jdud7bmv.ELEMENT);
  var isText = isType$1($_4yj7d2k6jdud7bmv.TEXT);
  var isDocument = isType$1($_4yj7d2k6jdud7bmv.DOCUMENT);
  var $_1102zvkrjdud7bou = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_duf7n8jzjdud7blu.isString(value) || $_duf7n8jzjdud7blu.isBoolean(value) || $_duf7n8jzjdud7blu.isNumber(value)) {
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
    $_fzfxsxjujdud7ble.each(attrs, function (v, k) {
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
    return $_2b6dlmjqjdud7bko.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_1102zvkrjdud7bou.isElement(source) || !$_1102zvkrjdud7bou.isElement(destination))
      return;
    $_2b6dlmjqjdud7bko.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_1ei337kqjdud7bom = {
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
    var dom = $_1102zvkrjdud7bou.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_fkkxj4kfjdud7bns.cached(function () {
    return getBody($_2q3j53k5jdud7bmr.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_2q3j53k5jdud7bmr.fromDom(body);
  };
  var $_4q6kiskujdud7bp0 = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var all$1 = function (predicate) {
    return descendants($_4q6kiskujdud7bp0.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_2b6dlmjqjdud7bko.filter($_9s8a4jk7jdud7bmw.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_2b6dlmjqjdud7bko.filter($_9s8a4jk7jdud7bmw.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_2b6dlmjqjdud7bko.filter($_9s8a4jk7jdud7bmw.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_2b6dlmjqjdud7bko.each($_9s8a4jk7jdud7bmw.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_6237bpktjdud7box = {
    all: all$1,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$2 = function (selector) {
    return $_zvi87k4jdud7bmn.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_6237bpktjdud7box.ancestors(scope, function (e) {
      return $_zvi87k4jdud7bmn.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_6237bpktjdud7box.siblings(scope, function (e) {
      return $_zvi87k4jdud7bmn.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_6237bpktjdud7box.children(scope, function (e) {
      return $_zvi87k4jdud7bmn.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_zvi87k4jdud7bmn.all(selector, scope);
  };
  var $_b4a6sqksjdud7bov = {
    all: all$2,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? Option.some(scope) : $_duf7n8jzjdud7blu.isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_4q6kiskujdud7bp0.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_duf7n8jzjdud7blu.isFunction(isRoot) ? isRoot : $_e8r7mrjsjdud7bkx.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_2q3j53k5jdud7bmr.fromDom(element);
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
    return child$1($_2q3j53k5jdud7bmr.fromDom(element.parentNode), function (x) {
      return !$_6nkapzk9jdud7bn7.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_2b6dlmjqjdud7bko.find(scope.dom().childNodes, $_e8r7mrjsjdud7bkx.compose(predicate, $_2q3j53k5jdud7bmr.fromDom));
    return result.map($_2q3j53k5jdud7bmr.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_2q3j53k5jdud7bmr.fromDom(element.childNodes[i])))
          return Option.some($_2q3j53k5jdud7bmr.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope.dom());
  };
  var $_70n3lxkwjdud7bp4 = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var first$2 = function (selector) {
    return $_zvi87k4jdud7bmn.one(selector);
  };
  var ancestor$1 = function (scope, selector, isRoot) {
    return $_70n3lxkwjdud7bp4.ancestor(scope, function (e) {
      return $_zvi87k4jdud7bmn.is(e, selector);
    }, isRoot);
  };
  var sibling$1 = function (scope, selector) {
    return $_70n3lxkwjdud7bp4.sibling(scope, function (e) {
      return $_zvi87k4jdud7bmn.is(e, selector);
    });
  };
  var child$2 = function (scope, selector) {
    return $_70n3lxkwjdud7bp4.child(scope, function (e) {
      return $_zvi87k4jdud7bmn.is(e, selector);
    });
  };
  var descendant$1 = function (scope, selector) {
    return $_zvi87k4jdud7bmn.one(selector, scope);
  };
  var closest$1 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_zvi87k4jdud7bmn.is, ancestor$1, scope, selector, isRoot);
  };
  var $_a3r4h1kvjdud7bp3 = {
    first: first$2,
    ancestor: ancestor$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1,
    closest: closest$1
  };

  var lookup = function (tags, element, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_e8r7mrjsjdud7bkx.constant(false);
    if (isRoot(element))
      return Option.none();
    if ($_2b6dlmjqjdud7bko.contains(tags, $_1102zvkrjdud7bou.name(element)))
      return Option.some(element);
    var isRootOrUpperTable = function (element) {
      return $_zvi87k4jdud7bmn.is(element, 'table') || isRoot(element);
    };
    return $_a3r4h1kvjdud7bp3.ancestor(element, tags.join(','), isRootOrUpperTable);
  };
  var cell = function (element, isRoot) {
    return lookup([
      'td',
      'th'
    ], element, isRoot);
  };
  var cells = function (ancestor) {
    return $_7iyapuk3jdud7bmh.firstLayer(ancestor, 'th,td');
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
    return $_9s8a4jk7jdud7bmw.parent(element).map(function (parent) {
      return $_b4a6sqksjdud7bov.children(parent, selector);
    });
  };
  var neighbourCells = $_e8r7mrjsjdud7bkx.curry(neighbours, 'th,td');
  var neighbourRows = $_e8r7mrjsjdud7bkx.curry(neighbours, 'tr');
  var firstCell = function (ancestor) {
    return $_a3r4h1kvjdud7bp3.descendant(ancestor, 'th,td');
  };
  var table = function (element, isRoot) {
    return $_a3r4h1kvjdud7bp3.closest(element, 'table', isRoot);
  };
  var row = function (element, isRoot) {
    return lookup(['tr'], element, isRoot);
  };
  var rows = function (ancestor) {
    return $_7iyapuk3jdud7bmh.firstLayer(ancestor, 'tr');
  };
  var attr = function (element, property) {
    return parseInt($_1ei337kqjdud7bom.get(element, property), 10);
  };
  var grid$1 = function (element, rowProp, colProp) {
    var rows = attr(element, rowProp);
    var cols = attr(element, colProp);
    return $_g6h236k1jdud7bm2.grid(rows, cols);
  };
  var $_e5b08wk2jdud7bm5 = {
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
    var rows = $_e5b08wk2jdud7bm5.rows(table);
    return $_2b6dlmjqjdud7bko.map(rows, function (row) {
      var element = row;
      var parent = $_9s8a4jk7jdud7bmw.parent(element);
      var parentSection = parent.bind(function (parent) {
        var parentName = $_1102zvkrjdud7bou.name(parent);
        return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
      });
      var cells = $_2b6dlmjqjdud7bko.map($_e5b08wk2jdud7bm5.cells(row), function (cell) {
        var rowspan = $_1ei337kqjdud7bom.has(cell, 'rowspan') ? parseInt($_1ei337kqjdud7bom.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_1ei337kqjdud7bom.has(cell, 'colspan') ? parseInt($_1ei337kqjdud7bom.get(cell, 'colspan'), 10) : 1;
        return $_g6h236k1jdud7bm2.detail(cell, rowspan, colspan);
      });
      return $_g6h236k1jdud7bm2.rowdata(element, cells, parentSection);
    });
  };
  var fromPastedRows = function (rows, example) {
    return $_2b6dlmjqjdud7bko.map(rows, function (row) {
      var cells = $_2b6dlmjqjdud7bko.map($_e5b08wk2jdud7bm5.cells(row), function (cell) {
        var rowspan = $_1ei337kqjdud7bom.has(cell, 'rowspan') ? parseInt($_1ei337kqjdud7bom.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_1ei337kqjdud7bom.has(cell, 'colspan') ? parseInt($_1ei337kqjdud7bom.get(cell, 'colspan'), 10) : 1;
        return $_g6h236k1jdud7bm2.detail(cell, rowspan, colspan);
      });
      return $_g6h236k1jdud7bm2.rowdata(row, cells, example.section());
    });
  };
  var $_bfx1aek0jdud7blw = {
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
    var all = $_2b6dlmjqjdud7bko.bind(warehouse.all(), function (r) {
      return r.cells();
    });
    return $_2b6dlmjqjdud7bko.filter(all, predicate);
  };
  var generate = function (list) {
    var access = {};
    var cells = [];
    var maxRows = list.length;
    var maxColumns = 0;
    $_2b6dlmjqjdud7bko.each(list, function (details, r) {
      var currentRow = [];
      $_2b6dlmjqjdud7bko.each(details.cells(), function (detail, c) {
        var start = 0;
        while (access[key(r, start)] !== undefined) {
          start++;
        }
        var current = $_g6h236k1jdud7bm2.extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
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
      cells.push($_g6h236k1jdud7bm2.rowdata(details.element(), currentRow, details.section()));
    });
    var grid = $_g6h236k1jdud7bm2.grid(maxRows, maxColumns);
    return {
      grid: $_e8r7mrjsjdud7bkx.constant(grid),
      access: $_e8r7mrjsjdud7bkx.constant(access),
      all: $_e8r7mrjsjdud7bkx.constant(cells)
    };
  };
  var justCells = function (warehouse) {
    var rows = $_2b6dlmjqjdud7bko.map(warehouse.all(), function (w) {
      return w.cells();
    });
    return $_2b6dlmjqjdud7bko.flatten(rows);
  };
  var $_ftidmkkyjdud7bpf = {
    generate: generate,
    getAt: getAt,
    findItem: findItem,
    filterItems: filterItems,
    justCells: justCells
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_ac63a8l0jdud7bq3 = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_duf7n8jzjdud7blu.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_ac63a8l0jdud7bq3.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_ac63a8l0jdud7bq3.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$1 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_fzfxsxjujdud7ble.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_fzfxsxjujdud7ble.each(css, function (v, k) {
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
    var v = r === '' && !$_4q6kiskujdud7bp0.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_ac63a8l0jdud7bq3.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
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
    if ($_ac63a8l0jdud7bq3.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_2q3j53k5jdud7bmr.fromTag(tag);
    set$1(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$1 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_1ei337kqjdud7bom.has(element, 'style') && $_a5si2uknjdud7bog.trim($_1ei337kqjdud7bom.get(element, 'style')) === '') {
      $_1ei337kqjdud7bom.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_1ei337kqjdud7bom.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_1ei337kqjdud7bom.remove : $_1ei337kqjdud7bom.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_ac63a8l0jdud7bq3.isSupported(sourceDom) && $_ac63a8l0jdud7bq3.isSupported(targetDom)) {
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
    if (!$_1102zvkrjdud7bou.isElement(source) || !$_1102zvkrjdud7bou.isElement(destination))
      return;
    $_2b6dlmjqjdud7bko.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_b5rw3dkzjdud7bpm = {
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
    var parent = $_9s8a4jk7jdud7bmw.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_9s8a4jk7jdud7bmw.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_9s8a4jk7jdud7bmw.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_9s8a4jk7jdud7bmw.firstChild(parent);
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
    $_9s8a4jk7jdud7bmw.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_b9f8rkl1jdud7bq5 = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_2b6dlmjqjdud7bko.each(elements, function (x) {
      $_b9f8rkl1jdud7bq5.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_2b6dlmjqjdud7bko.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_b9f8rkl1jdud7bq5.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_2b6dlmjqjdud7bko.each(elements.slice().reverse(), function (x) {
      $_b9f8rkl1jdud7bq5.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_2b6dlmjqjdud7bko.each(elements, function (x) {
      $_b9f8rkl1jdud7bq5.append(parent, x);
    });
  };
  var $_3zxknwl3jdud7bq9 = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_2b6dlmjqjdud7bko.each($_9s8a4jk7jdud7bmw.children(element), function (rogue) {
      remove$2(rogue);
    });
  };
  var remove$2 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_9s8a4jk7jdud7bmw.children(wrapper);
    if (children.length > 0)
      $_3zxknwl3jdud7bq9.before(wrapper, children);
    remove$2(wrapper);
  };
  var $_g2ty44l2jdud7bq6 = {
    empty: empty,
    remove: remove$2,
    unwrap: unwrap
  };

  var stats = $_4vwz6tjvjdud7blm.immutable('minRow', 'minCol', 'maxRow', 'maxCol');
  var findSelectedStats = function (house, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    var minRow = totalRows;
    var minCol = totalColumns;
    var maxRow = 0;
    var maxCol = 0;
    $_fzfxsxjujdud7ble.each(house.access(), function (detail) {
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
    var td = $_2q3j53k5jdud7bmr.fromTag('td');
    $_b9f8rkl1jdud7bq5.append(td, $_2q3j53k5jdud7bmr.fromTag('br'));
    var f = seenSelected ? $_b9f8rkl1jdud7bq5.append : $_b9f8rkl1jdud7bq5.prepend;
    f(row, td);
  };
  var fillInGaps = function (list, house, stats, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    for (var i = 0; i < totalRows; i++) {
      var seenSelected = false;
      for (var j = 0; j < totalColumns; j++) {
        if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
          var needCell = $_ftidmkkyjdud7bpf.getAt(house, i, j).filter(isSelected).isNone();
          if (needCell)
            makeCell(list, seenSelected, i);
          else
            seenSelected = true;
        }
      }
    }
  };
  var clean = function (table, stats) {
    var emptyRows = $_2b6dlmjqjdud7bko.filter($_7iyapuk3jdud7bmh.firstLayer(table, 'tr'), function (row) {
      return row.dom().childElementCount === 0;
    });
    $_2b6dlmjqjdud7bko.each(emptyRows, $_g2ty44l2jdud7bq6.remove);
    if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
      $_2b6dlmjqjdud7bko.each($_7iyapuk3jdud7bmh.firstLayer(table, 'th,td'), function (cell) {
        $_1ei337kqjdud7bom.remove(cell, 'rowspan');
        $_1ei337kqjdud7bom.remove(cell, 'colspan');
      });
    }
    $_1ei337kqjdud7bom.remove(table, 'width');
    $_1ei337kqjdud7bom.remove(table, 'height');
    $_b5rw3dkzjdud7bpm.remove(table, 'width');
    $_b5rw3dkzjdud7bpm.remove(table, 'height');
  };
  var extract = function (table, selectedSelector) {
    var isSelected = function (detail) {
      return $_zvi87k4jdud7bmn.is(detail.element(), selectedSelector);
    };
    var list = $_bfx1aek0jdud7blw.fromTable(table);
    var house = $_ftidmkkyjdud7bpf.generate(list);
    var stats = findSelectedStats(house, isSelected);
    var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
    var unselectedCells = $_7iyapuk3jdud7bmh.filterFirstLayer(table, 'th,td', function (cell) {
      return $_zvi87k4jdud7bmn.is(cell, selector);
    });
    $_2b6dlmjqjdud7bko.each(unselectedCells, $_g2ty44l2jdud7bq6.remove);
    fillInGaps(list, house, stats, isSelected);
    clean(table, stats);
    return table;
  };
  var $_flk5m5jtjdud7bl0 = { extract: extract };

  var clone$1 = function (original, deep) {
    return $_2q3j53k5jdud7bmr.fromDom(original.dom().cloneNode(deep));
  };
  var shallow = function (original) {
    return clone$1(original, false);
  };
  var deep = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_2q3j53k5jdud7bmr.fromTag(tag);
    var attributes = $_1ei337kqjdud7bom.clone(original);
    $_1ei337kqjdud7bom.setAll(nu, attributes);
    return nu;
  };
  var copy$1 = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_9s8a4jk7jdud7bmw.children(deep(original));
    $_3zxknwl3jdud7bq9.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_b9f8rkl1jdud7bq5.before(original, nu);
    var children = $_9s8a4jk7jdud7bmw.children(original);
    $_3zxknwl3jdud7bq9.append(nu, children);
    $_g2ty44l2jdud7bq6.remove(original);
    return nu;
  };
  var $_dxykb7l5jdud7bqr = {
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
    var browser = $_e4jb8lkejdud7bnr.detect().browser;
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

  var api = NodeValue($_1102zvkrjdud7bou.isText, 'text');
  var get$2 = function (element) {
    return api.get(element);
  };
  var getOption = function (element) {
    return api.getOption(element);
  };
  var set$2 = function (element, value) {
    api.set(element, value);
  };
  var $_cvxenhl8jdud7bqz = {
    get: get$2,
    getOption: getOption,
    set: set$2
  };

  var getEnd = function (element) {
    return $_1102zvkrjdud7bou.name(element) === 'img' ? 1 : $_cvxenhl8jdud7bqz.getOption(element).fold(function () {
      return $_9s8a4jk7jdud7bmw.children(element).length;
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
    return $_cvxenhl8jdud7bqz.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_2b6dlmjqjdud7bko.contains(elementsWithCursorPosition, $_1102zvkrjdud7bou.name(elem));
  };
  var $_7y1bjwl7jdud7bqw = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var first$3 = function (element) {
    return $_70n3lxkwjdud7bp4.descendant(element, $_7y1bjwl7jdud7bqw.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_7y1bjwl7jdud7bqw.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_9s8a4jk7jdud7bmw.children(element);
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
  var $_b7vkeyl6jdud7bqu = {
    first: first$3,
    last: last$2
  };

  var cell$1 = function () {
    var td = $_2q3j53k5jdud7bmr.fromTag('td');
    $_b9f8rkl1jdud7bq5.append(td, $_2q3j53k5jdud7bmr.fromTag('br'));
    return td;
  };
  var replace = function (cell, tag, attrs) {
    var replica = $_dxykb7l5jdud7bqr.copy(cell, tag);
    $_fzfxsxjujdud7ble.each(attrs, function (v, k) {
      if (v === null)
        $_1ei337kqjdud7bom.remove(replica, k);
      else
        $_1ei337kqjdud7bom.set(replica, k, v);
    });
    return replica;
  };
  var pasteReplace = function (cellContent) {
    return cellContent;
  };
  var newRow = function (doc) {
    return function () {
      return $_2q3j53k5jdud7bmr.fromTag('tr', doc.dom());
    };
  };
  var cloneFormats = function (oldCell, newCell, formats) {
    var first = $_b7vkeyl6jdud7bqu.first(oldCell);
    return first.map(function (firstText) {
      var formatSelector = formats.join(',');
      var parents = $_b4a6sqksjdud7bov.ancestors(firstText, formatSelector, function (element) {
        return $_6nkapzk9jdud7bn7.eq(element, oldCell);
      });
      return $_2b6dlmjqjdud7bko.foldr(parents, function (last, parent) {
        var clonedFormat = $_dxykb7l5jdud7bqr.shallow(parent);
        $_b9f8rkl1jdud7bq5.append(last, clonedFormat);
        return clonedFormat;
      }, newCell);
    }).getOr(newCell);
  };
  var cellOperations = function (mutate, doc, formatsToClone) {
    var newCell = function (prev) {
      var doc = $_9s8a4jk7jdud7bmw.owner(prev.element());
      var td = $_2q3j53k5jdud7bmr.fromTag($_1102zvkrjdud7bou.name(prev.element()), doc.dom());
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
      $_b9f8rkl1jdud7bq5.append(lastNode, $_2q3j53k5jdud7bmr.fromTag('br'));
      $_b5rw3dkzjdud7bpm.copy(prev.element(), td);
      $_b5rw3dkzjdud7bpm.remove(td, 'height');
      if (prev.colspan() !== 1)
        $_b5rw3dkzjdud7bpm.remove(prev.element(), 'width');
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
  var $_c3joicl4jdud7bqc = {
    cellOperations: cellOperations,
    paste: paste
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_9s8a4jk7jdud7bmw.children($_2q3j53k5jdud7bmr.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_2b6dlmjqjdud7bko.map(tags, function (x) {
      return $_2q3j53k5jdud7bmr.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_2b6dlmjqjdud7bko.map(texts, function (x) {
      return $_2q3j53k5jdud7bmr.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_2b6dlmjqjdud7bko.map(nodes, $_2q3j53k5jdud7bmr.fromDom);
  };
  var $_buahlulajdud7br5 = {
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
      return $_2q3j53k5jdud7bmr.fromDom(element.dom().cloneNode(false));
    };
    var isBoundary = function (element) {
      if (!$_1102zvkrjdud7bou.isElement(element))
        return false;
      if ($_1102zvkrjdud7bou.name(element) === 'body')
        return true;
      return $_2b6dlmjqjdud7bko.contains(TagBoundaries, $_1102zvkrjdud7bou.name(element));
    };
    var isEmptyTag = function (element) {
      if (!$_1102zvkrjdud7bou.isElement(element))
        return false;
      return $_2b6dlmjqjdud7bko.contains([
        'br',
        'img',
        'hr',
        'input'
      ], $_1102zvkrjdud7bou.name(element));
    };
    var comparePosition = function (element, other) {
      return element.dom().compareDocumentPosition(other.dom());
    };
    var copyAttributesTo = function (source, destination) {
      var as = $_1ei337kqjdud7bom.clone(source);
      $_1ei337kqjdud7bom.setAll(destination, as);
    };
    return {
      up: $_e8r7mrjsjdud7bkx.constant({
        selector: $_a3r4h1kvjdud7bp3.ancestor,
        closest: $_a3r4h1kvjdud7bp3.closest,
        predicate: $_70n3lxkwjdud7bp4.ancestor,
        all: $_9s8a4jk7jdud7bmw.parents
      }),
      down: $_e8r7mrjsjdud7bkx.constant({
        selector: $_b4a6sqksjdud7bov.descendants,
        predicate: $_6237bpktjdud7box.descendants
      }),
      styles: $_e8r7mrjsjdud7bkx.constant({
        get: $_b5rw3dkzjdud7bpm.get,
        getRaw: $_b5rw3dkzjdud7bpm.getRaw,
        set: $_b5rw3dkzjdud7bpm.set,
        remove: $_b5rw3dkzjdud7bpm.remove
      }),
      attrs: $_e8r7mrjsjdud7bkx.constant({
        get: $_1ei337kqjdud7bom.get,
        set: $_1ei337kqjdud7bom.set,
        remove: $_1ei337kqjdud7bom.remove,
        copyTo: copyAttributesTo
      }),
      insert: $_e8r7mrjsjdud7bkx.constant({
        before: $_b9f8rkl1jdud7bq5.before,
        after: $_b9f8rkl1jdud7bq5.after,
        afterAll: $_3zxknwl3jdud7bq9.after,
        append: $_b9f8rkl1jdud7bq5.append,
        appendAll: $_3zxknwl3jdud7bq9.append,
        prepend: $_b9f8rkl1jdud7bq5.prepend,
        wrap: $_b9f8rkl1jdud7bq5.wrap
      }),
      remove: $_e8r7mrjsjdud7bkx.constant({
        unwrap: $_g2ty44l2jdud7bq6.unwrap,
        remove: $_g2ty44l2jdud7bq6.remove
      }),
      create: $_e8r7mrjsjdud7bkx.constant({
        nu: $_2q3j53k5jdud7bmr.fromTag,
        clone: clone,
        text: $_2q3j53k5jdud7bmr.fromText
      }),
      query: $_e8r7mrjsjdud7bkx.constant({
        comparePosition: comparePosition,
        prevSibling: $_9s8a4jk7jdud7bmw.prevSibling,
        nextSibling: $_9s8a4jk7jdud7bmw.nextSibling
      }),
      property: $_e8r7mrjsjdud7bkx.constant({
        children: $_9s8a4jk7jdud7bmw.children,
        name: $_1102zvkrjdud7bou.name,
        parent: $_9s8a4jk7jdud7bmw.parent,
        isText: $_1102zvkrjdud7bou.isText,
        isComment: $_1102zvkrjdud7bou.isComment,
        isElement: $_1102zvkrjdud7bou.isElement,
        getText: $_cvxenhl8jdud7bqz.get,
        setText: $_cvxenhl8jdud7bqz.set,
        isBoundary: isBoundary,
        isEmptyTag: isEmptyTag
      }),
      eq: $_6nkapzk9jdud7bn7.eq,
      is: $_6nkapzk9jdud7bn7.is
    };
  }

  var leftRight = $_4vwz6tjvjdud7blm.immutable('left', 'right');
  var bisect = function (universe, parent, child) {
    var children = universe.property().children(parent);
    var index = $_2b6dlmjqjdud7bko.findIndex(children, $_e8r7mrjsjdud7bkx.curry(universe.eq, child));
    return index.map(function (ind) {
      return {
        before: $_e8r7mrjsjdud7bkx.constant(children.slice(0, ind)),
        after: $_e8r7mrjsjdud7bkx.constant(children.slice(ind + 1))
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
    var result = $_4vwz6tjvjdud7blm.immutable('first', 'second', 'splits');
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
  var $_g2ys4eljjdud7bt8 = {
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
    return $_2b6dlmjqjdud7bko.foldr(tail, function (b, a) {
      var current = look(universe, a);
      return commonElement(universe, b, current);
    }, start);
  };
  var commonElement = function (universe, start, end) {
    return start.bind(function (s) {
      return end.filter($_e8r7mrjsjdud7bkx.curry(universe.eq, s));
    });
  };
  var $_b2zltilkjdud7btf = { oneAll: oneAll };

  var eq$1 = function (universe, item) {
    return $_e8r7mrjsjdud7bkx.curry(universe.eq, item);
  };
  var unsafeSubset = function (universe, common, ps1, ps2) {
    var children = universe.property().children(common);
    if (universe.eq(common, ps1[0]))
      return Option.some([ps1[0]]);
    if (universe.eq(common, ps2[0]))
      return Option.some([ps2[0]]);
    var finder = function (ps) {
      var topDown = $_2b6dlmjqjdud7bko.reverse(ps);
      var index = $_2b6dlmjqjdud7bko.findIndex(topDown, eq$1(universe, common)).getOr(-1);
      var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];
      return $_2b6dlmjqjdud7bko.findIndex(children, eq$1(universe, item));
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
    var isRoot = _isRoot !== undefined ? _isRoot : $_e8r7mrjsjdud7bkx.constant(false);
    var ps1 = [start].concat(universe.up().all(start));
    var ps2 = [end].concat(universe.up().all(end));
    var prune = function (path) {
      var index = $_2b6dlmjqjdud7bko.findIndex(path, isRoot);
      return index.fold(function () {
        return path;
      }, function (ind) {
        return path.slice(0, ind + 1);
      });
    };
    var pruned1 = prune(ps1);
    var pruned2 = prune(ps2);
    var shared = $_2b6dlmjqjdud7bko.find(pruned1, function (x) {
      return $_2b6dlmjqjdud7bko.exists(pruned2, eq$1(universe, x));
    });
    return {
      firstpath: $_e8r7mrjsjdud7bkx.constant(pruned1),
      secondpath: $_e8r7mrjsjdud7bkx.constant(pruned2),
      shared: $_e8r7mrjsjdud7bkx.constant(shared)
    };
  };
  var subset = function (universe, start, end) {
    var ancs = ancestors$2(universe, start, end);
    return ancs.shared().bind(function (shared) {
      return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
    });
  };
  var $_ksfrtlljdud7btk = {
    subset: subset,
    ancestors: ancestors$2
  };

  var sharedOne = function (universe, look, elements) {
    return $_b2zltilkjdud7btf.oneAll(universe, look, elements);
  };
  var subset$1 = function (universe, start, finish) {
    return $_ksfrtlljdud7btk.subset(universe, start, finish);
  };
  var ancestors$3 = function (universe, start, finish, _isRoot) {
    return $_ksfrtlljdud7btk.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$1 = function (universe, parent, child) {
    return $_g2ys4eljjdud7bt8.breakToLeft(universe, parent, child);
  };
  var breakToRight$1 = function (universe, parent, child) {
    return $_g2ys4eljjdud7bt8.breakToRight(universe, parent, child);
  };
  var breakPath$1 = function (universe, child, isTop, breaker) {
    return $_g2ys4eljjdud7bt8.breakPath(universe, child, isTop, breaker);
  };
  var $_40qpqslijdud7bt6 = {
    sharedOne: sharedOne,
    subset: subset$1,
    ancestors: ancestors$3,
    breakToLeft: breakToLeft$1,
    breakToRight: breakToRight$1,
    breakPath: breakPath$1
  };

  var universe = DomUniverse();
  var sharedOne$1 = function (look, elements) {
    return $_40qpqslijdud7bt6.sharedOne(universe, function (universe, element) {
      return look(element);
    }, elements);
  };
  var subset$2 = function (start, finish) {
    return $_40qpqslijdud7bt6.subset(universe, start, finish);
  };
  var ancestors$4 = function (start, finish, _isRoot) {
    return $_40qpqslijdud7bt6.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$2 = function (parent, child) {
    return $_40qpqslijdud7bt6.breakToLeft(universe, parent, child);
  };
  var breakToRight$2 = function (parent, child) {
    return $_40qpqslijdud7bt6.breakToRight(universe, parent, child);
  };
  var breakPath$2 = function (child, isTop, breaker) {
    return $_40qpqslijdud7bt6.breakPath(universe, child, isTop, function (u, p, c) {
      return breaker(p, c);
    });
  };
  var $_ef88mqlfjdud7bsc = {
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
    var detailIsWithin = $_e8r7mrjsjdud7bkx.curry(isWithin, bounds);
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        isRect = isRect && $_ftidmkkyjdud7bpf.getAt(warehouse, i, j).exists(detailIsWithin);
      }
    }
    return isRect ? Option.some(bounds) : Option.none();
  };
  var $_39qlcclojdud7bu4 = {
    inSelection: inSelection,
    isWithin: isWithin,
    isRectangular: isRectangular
  };

  var getBounds = function (detailA, detailB) {
    return $_g6h236k1jdud7bm2.bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
  };
  var getAnyBox = function (warehouse, startCell, finishCell) {
    var startCoords = $_ftidmkkyjdud7bpf.findItem(warehouse, startCell, $_6nkapzk9jdud7bn7.eq);
    var finishCoords = $_ftidmkkyjdud7bpf.findItem(warehouse, finishCell, $_6nkapzk9jdud7bn7.eq);
    return startCoords.bind(function (sc) {
      return finishCoords.map(function (fc) {
        return getBounds(sc, fc);
      });
    });
  };
  var getBox = function (warehouse, startCell, finishCell) {
    return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
      return $_39qlcclojdud7bu4.isRectangular(warehouse, bounds);
    });
  };
  var $_em65uslpjdud7bub = {
    getAnyBox: getAnyBox,
    getBox: getBox
  };

  var moveBy = function (warehouse, cell, row, column) {
    return $_ftidmkkyjdud7bpf.findItem(warehouse, cell, $_6nkapzk9jdud7bn7.eq).bind(function (detail) {
      var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
      var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
      var dest = $_ftidmkkyjdud7bpf.getAt(warehouse, startRow + row, startCol + column);
      return dest.map(function (d) {
        return d.element();
      });
    });
  };
  var intercepts = function (warehouse, start, finish) {
    return $_em65uslpjdud7bub.getAnyBox(warehouse, start, finish).map(function (bounds) {
      var inside = $_ftidmkkyjdud7bpf.filterItems(warehouse, $_e8r7mrjsjdud7bkx.curry($_39qlcclojdud7bu4.inSelection, bounds));
      return $_2b6dlmjqjdud7bko.map(inside, function (detail) {
        return detail.element();
      });
    });
  };
  var parentCell = function (warehouse, innerCell) {
    var isContainedBy = function (c1, c2) {
      return $_6nkapzk9jdud7bn7.contains(c2, c1);
    };
    return $_ftidmkkyjdud7bpf.findItem(warehouse, innerCell, isContainedBy).bind(function (detail) {
      return detail.element();
    });
  };
  var $_5jmwxzlnjdud7btz = {
    moveBy: moveBy,
    intercepts: intercepts,
    parentCell: parentCell
  };

  var moveBy$1 = function (cell, deltaRow, deltaColumn) {
    return $_e5b08wk2jdud7bm5.table(cell).bind(function (table) {
      var warehouse = getWarehouse(table);
      return $_5jmwxzlnjdud7btz.moveBy(warehouse, cell, deltaRow, deltaColumn);
    });
  };
  var intercepts$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_5jmwxzlnjdud7btz.intercepts(warehouse, first, last);
  };
  var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
    var warehouse = getWarehouse(table);
    var startCell = $_6nkapzk9jdud7bn7.eq(table, firstTable) ? first : $_5jmwxzlnjdud7btz.parentCell(warehouse, first);
    var lastCell = $_6nkapzk9jdud7bn7.eq(table, lastTable) ? last : $_5jmwxzlnjdud7btz.parentCell(warehouse, last);
    return $_5jmwxzlnjdud7btz.intercepts(warehouse, startCell, lastCell);
  };
  var getBox$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_em65uslpjdud7bub.getBox(warehouse, first, last);
  };
  var getWarehouse = function (table) {
    var list = $_bfx1aek0jdud7blw.fromTable(table);
    return $_ftidmkkyjdud7bpf.generate(list);
  };
  var $_cn9agwlmjdud7btv = {
    moveBy: moveBy$1,
    intercepts: intercepts$1,
    nestedIntercepts: nestedIntercepts,
    getBox: getBox$1
  };

  var lookupTable = function (container, isRoot) {
    return $_a3r4h1kvjdud7bp3.ancestor(container, 'table');
  };
  var identified = $_4vwz6tjvjdud7blm.immutableBag([
    'boxes',
    'start',
    'finish'
  ], []);
  var identify = function (start, finish, isRoot) {
    var getIsRoot = function (rootTable) {
      return function (element) {
        return isRoot(element) || $_6nkapzk9jdud7bn7.eq(element, rootTable);
      };
    };
    if ($_6nkapzk9jdud7bn7.eq(start, finish)) {
      return Option.some(identified({
        boxes: Option.some([start]),
        start: start,
        finish: finish
      }));
    } else {
      return lookupTable(start, isRoot).bind(function (startTable) {
        return lookupTable(finish, isRoot).bind(function (finishTable) {
          if ($_6nkapzk9jdud7bn7.eq(startTable, finishTable)) {
            return Option.some(identified({
              boxes: $_cn9agwlmjdud7btv.intercepts(startTable, start, finish),
              start: start,
              finish: finish
            }));
          } else if ($_6nkapzk9jdud7bn7.contains(startTable, finishTable)) {
            var ancestorCells = $_b4a6sqksjdud7bov.ancestors(finish, 'td,th', getIsRoot(startTable));
            var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
            return Option.some(identified({
              boxes: $_cn9agwlmjdud7btv.nestedIntercepts(startTable, start, startTable, finish, finishTable),
              start: start,
              finish: finishCell
            }));
          } else if ($_6nkapzk9jdud7bn7.contains(finishTable, startTable)) {
            var ancestorCells = $_b4a6sqksjdud7bov.ancestors(start, 'td,th', getIsRoot(finishTable));
            var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
            return Option.some(identified({
              boxes: $_cn9agwlmjdud7btv.nestedIntercepts(finishTable, start, startTable, finish, finishTable),
              start: start,
              finish: startCell
            }));
          } else {
            return $_ef88mqlfjdud7bsc.ancestors(start, finish).shared().bind(function (lca) {
              return $_a3r4h1kvjdud7bp3.closest(lca, 'table', isRoot).bind(function (lcaTable) {
                var finishAncestorCells = $_b4a6sqksjdud7bov.ancestors(finish, 'td,th', getIsRoot(lcaTable));
                var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                var startAncestorCells = $_b4a6sqksjdud7bov.ancestors(start, 'td,th', getIsRoot(lcaTable));
                var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                return Option.some(identified({
                  boxes: $_cn9agwlmjdud7btv.nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
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
    var sels = $_b4a6sqksjdud7bov.descendants(container, selector);
    return sels.length > 0 ? Option.some(sels) : Option.none();
  };
  var getLast = function (boxes, lastSelectedSelector) {
    return $_2b6dlmjqjdud7bko.find(boxes, function (box) {
      return $_zvi87k4jdud7bmn.is(box, lastSelectedSelector);
    });
  };
  var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_a3r4h1kvjdud7bp3.descendant(container, firstSelectedSelector).bind(function (first) {
      return $_a3r4h1kvjdud7bp3.descendant(container, lastSelectedSelector).bind(function (last) {
        return $_ef88mqlfjdud7bsc.sharedOne(lookupTable, [
          first,
          last
        ]).map(function (tbl) {
          return {
            first: $_e8r7mrjsjdud7bkx.constant(first),
            last: $_e8r7mrjsjdud7bkx.constant(last),
            table: $_e8r7mrjsjdud7bkx.constant(tbl)
          };
        });
      });
    });
  };
  var expandTo = function (finish, firstSelectedSelector) {
    return $_a3r4h1kvjdud7bp3.ancestor(finish, 'table').bind(function (table) {
      return $_a3r4h1kvjdud7bp3.descendant(table, firstSelectedSelector).bind(function (start) {
        return identify(start, finish).bind(function (identified) {
          return identified.boxes().map(function (boxes) {
            return {
              boxes: $_e8r7mrjsjdud7bkx.constant(boxes),
              start: $_e8r7mrjsjdud7bkx.constant(identified.start()),
              finish: $_e8r7mrjsjdud7bkx.constant(identified.finish())
            };
          });
        });
      });
    });
  };
  var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
    return getLast(boxes, lastSelectedSelector).bind(function (last) {
      return $_cn9agwlmjdud7btv.moveBy(last, deltaRow, deltaColumn).bind(function (finish) {
        return expandTo(finish, firstSelectedSelector);
      });
    });
  };
  var $_btb09flejdud7brv = {
    identify: identify,
    retrieve: retrieve,
    shiftSelection: shiftSelection,
    getEdges: getEdges
  };

  var retrieve$1 = function (container, selector) {
    return $_btb09flejdud7brv.retrieve(container, selector);
  };
  var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_btb09flejdud7brv.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
      var isRoot = function (ancestor) {
        return $_6nkapzk9jdud7bn7.eq(container, ancestor);
      };
      var firstAncestor = $_a3r4h1kvjdud7bp3.ancestor(edges.first(), 'thead,tfoot,tbody,table', isRoot);
      var lastAncestor = $_a3r4h1kvjdud7bp3.ancestor(edges.last(), 'thead,tfoot,tbody,table', isRoot);
      return firstAncestor.bind(function (fA) {
        return lastAncestor.bind(function (lA) {
          return $_6nkapzk9jdud7bn7.eq(fA, lA) ? $_cn9agwlmjdud7btv.getBox(edges.table(), edges.first(), edges.last()) : Option.none();
        });
      });
    });
  };
  var $_jbi15ldjdud7bri = {
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
  var $_f2i0m2lqjdud7buf = {
    selected: $_e8r7mrjsjdud7bkx.constant(selected),
    selectedSelector: $_e8r7mrjsjdud7bkx.constant(selectedSelector),
    attributeSelector: $_e8r7mrjsjdud7bkx.constant(attributeSelector),
    firstSelected: $_e8r7mrjsjdud7bkx.constant(firstSelected),
    firstSelectedSelector: $_e8r7mrjsjdud7bkx.constant(firstSelectedSelector),
    lastSelected: $_e8r7mrjsjdud7bkx.constant(lastSelected),
    lastSelectedSelector: $_e8r7mrjsjdud7bkx.constant(lastSelectedSelector)
  };

  var generate$1 = function (cases) {
    if (!$_duf7n8jzjdud7blu.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_2b6dlmjqjdud7bko.each(cases, function (acase, count) {
      var keys = $_fzfxsxjujdud7ble.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_duf7n8jzjdud7blu.isArray(value)) {
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
          var branchKeys = $_fzfxsxjujdud7ble.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_2b6dlmjqjdud7bko.forall(constructors, function (reqKey) {
            return $_2b6dlmjqjdud7bko.contains(branchKeys, reqKey);
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
  var $_d9zbmklsjdud7buk = { generate: generate$1 };

  var type$1 = $_d9zbmklsjdud7buk.generate([
    { none: [] },
    { multiple: ['elements'] },
    { single: ['selection'] }
  ]);
  var cata = function (subject, onNone, onMultiple, onSingle) {
    return subject.fold(onNone, onMultiple, onSingle);
  };
  var $_4ns5llrjdud7bui = {
    cata: cata,
    none: type$1.none,
    multiple: type$1.multiple,
    single: type$1.single
  };

  var selection = function (cell, selections) {
    return $_4ns5llrjdud7bui.cata(selections.get(), $_e8r7mrjsjdud7bkx.constant([]), $_e8r7mrjsjdud7bkx.identity, $_e8r7mrjsjdud7bkx.constant([cell]));
  };
  var unmergable = function (cell, selections) {
    var hasSpan = function (elem) {
      return $_1ei337kqjdud7bom.has(elem, 'rowspan') && parseInt($_1ei337kqjdud7bom.get(elem, 'rowspan'), 10) > 1 || $_1ei337kqjdud7bom.has(elem, 'colspan') && parseInt($_1ei337kqjdud7bom.get(elem, 'colspan'), 10) > 1;
    };
    var candidates = selection(cell, selections);
    return candidates.length > 0 && $_2b6dlmjqjdud7bko.forall(candidates, hasSpan) ? Option.some(candidates) : Option.none();
  };
  var mergable = function (table, selections) {
    return $_4ns5llrjdud7bui.cata(selections.get(), Option.none, function (cells, _env) {
      if (cells.length === 0) {
        return Option.none();
      }
      return $_jbi15ldjdud7bri.retrieveBox(table, $_f2i0m2lqjdud7buf.firstSelectedSelector(), $_f2i0m2lqjdud7buf.lastSelectedSelector()).bind(function (bounds) {
        return cells.length > 1 ? Option.some({
          bounds: $_e8r7mrjsjdud7bkx.constant(bounds),
          cells: $_e8r7mrjsjdud7bkx.constant(cells)
        }) : Option.none();
      });
    }, Option.none);
  };
  var $_dm2nhilcjdud7brc = {
    mergable: mergable,
    unmergable: unmergable,
    selection: selection
  };

  var noMenu = function (cell) {
    return {
      element: $_e8r7mrjsjdud7bkx.constant(cell),
      mergable: Option.none,
      unmergable: Option.none,
      selection: $_e8r7mrjsjdud7bkx.constant([cell])
    };
  };
  var forMenu = function (selections, table, cell) {
    return {
      element: $_e8r7mrjsjdud7bkx.constant(cell),
      mergable: $_e8r7mrjsjdud7bkx.constant($_dm2nhilcjdud7brc.mergable(table, selections)),
      unmergable: $_e8r7mrjsjdud7bkx.constant($_dm2nhilcjdud7brc.unmergable(cell, selections)),
      selection: $_e8r7mrjsjdud7bkx.constant($_dm2nhilcjdud7brc.selection(cell, selections))
    };
  };
  var notCell$1 = function (element) {
    return noMenu(element);
  };
  var paste$1 = $_4vwz6tjvjdud7blm.immutable('element', 'clipboard', 'generators');
  var pasteRows = function (selections, table, cell, clipboard, generators) {
    return {
      element: $_e8r7mrjsjdud7bkx.constant(cell),
      mergable: Option.none,
      unmergable: Option.none,
      selection: $_e8r7mrjsjdud7bkx.constant($_dm2nhilcjdud7brc.selection(cell, selections)),
      clipboard: $_e8r7mrjsjdud7bkx.constant(clipboard),
      generators: $_e8r7mrjsjdud7bkx.constant(generators)
    };
  };
  var $_50voclbjdud7br8 = {
    noMenu: noMenu,
    forMenu: forMenu,
    notCell: notCell$1,
    paste: paste$1,
    pasteRows: pasteRows
  };

  var extractSelected = function (cells) {
    return $_e5b08wk2jdud7bm5.table(cells[0]).map($_dxykb7l5jdud7bqr.deep).map(function (replica) {
      return [$_flk5m5jtjdud7bl0.extract(replica, $_f2i0m2lqjdud7buf.attributeSelector())];
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
          e.content = $_2b6dlmjqjdud7bko.map(elements, function (elm) {
            return serializeElement(editor, elm);
          }).join('');
        });
      };
      if (e.selection === true) {
        $_4ns5llrjdud7bui.cata(selections.get(), $_e8r7mrjsjdud7bkx.noop, multiCellContext, $_e8r7mrjsjdud7bkx.noop);
      }
    });
    editor.on('BeforeSetContent', function (e) {
      if (e.selection === true && e.paste === true) {
        var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        cellOpt.each(function (domCell) {
          var cell = $_2q3j53k5jdud7bmr.fromDom(domCell);
          var table = $_e5b08wk2jdud7bm5.table(cell);
          table.bind(function (table) {
            var elements = $_2b6dlmjqjdud7bko.filter($_buahlulajdud7br5.fromHtml(e.content), function (content) {
              return $_1102zvkrjdud7bou.name(content) !== 'meta';
            });
            if (elements.length === 1 && $_1102zvkrjdud7bou.name(elements[0]) === 'table') {
              e.preventDefault();
              var doc = $_2q3j53k5jdud7bmr.fromDom(editor.getDoc());
              var generators = $_c3joicl4jdud7bqc.paste(doc);
              var targets = $_50voclbjdud7br8.paste(cell, elements[0], generators);
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
  var $_4j7ogljpjdud7bkb = { registerEvents: registerEvents };

  function Dimension (name, getOffset) {
    var set = function (element, h) {
      if (!$_duf7n8jzjdud7blu.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_ac63a8l0jdud7bq3.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_b5rw3dkzjdud7bpm.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_2b6dlmjqjdud7bko.foldl(properties, function (acc, property) {
        var val = $_b5rw3dkzjdud7bpm.get(element, property);
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
    return $_4q6kiskujdud7bp0.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
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
    $_b5rw3dkzjdud7bpm.set(element, 'max-height', absMax + 'px');
  };
  var $_d8flr3lxjdud7bvn = {
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
    $_b5rw3dkzjdud7bpm.set(element, 'max-width', absMax + 'px');
  };
  var $_fnm25ilzjdud7bvz = {
    set: set$4,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax$1
  };

  var platform = $_e4jb8lkejdud7bnr.detect();
  var needManualCalc = function () {
    return platform.browser.isIE() || platform.browser.isEdge();
  };
  var toNumber = function (px, fallback) {
    var num = parseFloat(px);
    return isNaN(num) ? fallback : num;
  };
  var getProp = function (elm, name, fallback) {
    return toNumber($_b5rw3dkzjdud7bpm.get(elm, name), fallback);
  };
  var getCalculatedHeight = function (cell) {
    var paddingTop = getProp(cell, 'padding-top', 0);
    var paddingBottom = getProp(cell, 'padding-bottom', 0);
    var borderTop = getProp(cell, 'border-top-width', 0);
    var borderBottom = getProp(cell, 'border-bottom-width', 0);
    var height = cell.dom().getBoundingClientRect().height;
    var boxSizing = $_b5rw3dkzjdud7bpm.get(cell, 'box-sizing');
    var borders = borderTop + borderBottom;
    return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
  };
  var getWidth = function (cell) {
    return getProp(cell, 'width', $_fnm25ilzjdud7bvz.get(cell));
  };
  var getHeight = function (cell) {
    return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', $_d8flr3lxjdud7bvn.get(cell));
  };
  var $_b9l41elwjdud7bvg = {
    getWidth: getWidth,
    getHeight: getHeight
  };

  var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
  var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
  var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
  var setPixelWidth = function (cell, amount) {
    $_b5rw3dkzjdud7bpm.set(cell, 'width', amount + 'px');
  };
  var setPercentageWidth = function (cell, amount) {
    $_b5rw3dkzjdud7bpm.set(cell, 'width', amount + '%');
  };
  var setHeight = function (cell, amount) {
    $_b5rw3dkzjdud7bpm.set(cell, 'height', amount + 'px');
  };
  var getHeightValue = function (cell) {
    return $_b5rw3dkzjdud7bpm.getRaw(cell, 'height').getOrThunk(function () {
      return $_b9l41elwjdud7bvg.getHeight(cell) + 'px';
    });
  };
  var convert = function (cell, number, getter, setter) {
    var newSize = $_e5b08wk2jdud7bm5.table(cell).map(function (table) {
      var total = getter(table);
      return Math.floor(number / 100 * total);
    }).getOr(number);
    setter(cell, newSize);
    return newSize;
  };
  var normalizePixelSize = function (value, cell, getter, setter) {
    var number = parseInt(value, 10);
    return $_a5si2uknjdud7bog.endsWith(value, '%') && $_1102zvkrjdud7bou.name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
  };
  var getTotalHeight = function (cell) {
    var value = getHeightValue(cell);
    if (!value)
      return $_d8flr3lxjdud7bvn.get(cell);
    return normalizePixelSize(value, cell, $_d8flr3lxjdud7bvn.get, setHeight);
  };
  var get$5 = function (cell, type, f) {
    var v = f(cell);
    var span = getSpan(cell, type);
    return v / span;
  };
  var getSpan = function (cell, type) {
    return $_1ei337kqjdud7bom.has(cell, type) ? parseInt($_1ei337kqjdud7bom.get(cell, type), 10) : 1;
  };
  var getRawWidth = function (element) {
    var cssWidth = $_b5rw3dkzjdud7bpm.getRaw(element, 'width');
    return cssWidth.fold(function () {
      return Option.from($_1ei337kqjdud7bom.get(element, 'width'));
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
      var fallbackWidth = $_fnm25ilzjdud7bvz.get(element);
      var intWidth = parseInt(fallbackWidth, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }
  };
  var getPercentageWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_fnm25ilzjdud7bvz.get(cell);
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
      var fallbackWidth = $_fnm25ilzjdud7bvz.get(element);
      return parseInt(fallbackWidth, 10);
    }
  };
  var getPixelWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_fnm25ilzjdud7bvz.get(cell);
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
          width: $_e8r7mrjsjdud7bkx.constant(match[1]),
          unit: $_e8r7mrjsjdud7bkx.constant(match[3])
        });
      } else {
        return Option.none();
      }
    });
  };
  var setGenericWidth = function (cell, amount, unit) {
    $_b5rw3dkzjdud7bpm.set(cell, 'width', amount + unit);
  };
  var $_b1w9oplvjdud7bv2 = {
    percentageBasedSizeRegex: $_e8r7mrjsjdud7bkx.constant(percentageBasedSizeRegex),
    pixelBasedSizeRegex: $_e8r7mrjsjdud7bkx.constant(pixelBasedSizeRegex),
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
    var width = $_b1w9oplvjdud7bv2.getGenericWidth(main);
    width.each(function (width) {
      var newWidth = width.width() / 2;
      $_b1w9oplvjdud7bv2.setGenericWidth(main, newWidth, width.unit());
      $_b1w9oplvjdud7bv2.setGenericWidth(other, newWidth, width.unit());
    });
  };
  var $_dxd1kqlujdud7bv0 = { halve: halve };

  var attached = function (element, scope) {
    var doc = scope || $_2q3j53k5jdud7bmr.fromDom(document.documentElement);
    return $_70n3lxkwjdud7bp4.ancestor(element, $_e8r7mrjsjdud7bkx.curry($_6nkapzk9jdud7bn7.eq, doc)).isSome();
  };
  var windowOf = function (element) {
    var dom = element.dom();
    if (dom === dom.window)
      return element;
    return $_1102zvkrjdud7bou.isDocument(element) ? dom.defaultView || dom.parentWindow : null;
  };
  var $_7sfq1fm4jdud7bwe = {
    attached: attached,
    windowOf: windowOf
  };

  var r = function (left, top) {
    var translate = function (x, y) {
      return r(left + x, top + y);
    };
    return {
      left: $_e8r7mrjsjdud7bkx.constant(left),
      top: $_e8r7mrjsjdud7bkx.constant(top),
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
    var win = $_7sfq1fm4jdud7bwe.windowOf($_2q3j53k5jdud7bmr.fromDom(doc));
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
    var html = $_2q3j53k5jdud7bmr.fromDom(doc.documentElement);
    if (body === dom)
      return r(body.offsetLeft, body.offsetTop);
    if (!$_7sfq1fm4jdud7bwe.attached(element, html))
      return r(0, 0);
    return boxPosition(dom);
  };
  var $_1b83qkm3jdud7bwd = {
    absolute: absolute,
    relative: relative,
    viewport: viewport
  };

  var rowInfo = $_4vwz6tjvjdud7blm.immutable('row', 'y');
  var colInfo = $_4vwz6tjvjdud7blm.immutable('col', 'x');
  var rtlEdge = function (cell) {
    var pos = $_1b83qkm3jdud7bwd.absolute(cell);
    return pos.left() + $_fnm25ilzjdud7bvz.getOuter(cell);
  };
  var ltrEdge = function (cell) {
    return $_1b83qkm3jdud7bwd.absolute(cell).left();
  };
  var getLeftEdge = function (index, cell) {
    return colInfo(index, ltrEdge(cell));
  };
  var getRightEdge = function (index, cell) {
    return colInfo(index, rtlEdge(cell));
  };
  var getTop = function (cell) {
    return $_1b83qkm3jdud7bwd.absolute(cell).top();
  };
  var getTopEdge = function (index, cell) {
    return rowInfo(index, getTop(cell));
  };
  var getBottomEdge = function (index, cell) {
    return rowInfo(index, getTop(cell) + $_d8flr3lxjdud7bvn.getOuter(cell));
  };
  var findPositions = function (getInnerEdge, getOuterEdge, array) {
    if (array.length === 0)
      return [];
    var lines = $_2b6dlmjqjdud7bko.map(array.slice(1), function (cellOption, index) {
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
    delta: $_e8r7mrjsjdud7bkx.identity,
    positions: $_e8r7mrjsjdud7bkx.curry(findPositions, getTopEdge, getBottomEdge),
    edge: getTop
  };
  var ltr = {
    delta: $_e8r7mrjsjdud7bkx.identity,
    edge: ltrEdge,
    positions: $_e8r7mrjsjdud7bkx.curry(findPositions, getLeftEdge, getRightEdge)
  };
  var rtl = {
    delta: negate,
    edge: rtlEdge,
    positions: $_e8r7mrjsjdud7bkx.curry(findPositions, getRightEdge, getLeftEdge)
  };
  var $_2qb4vhm2jdud7bw4 = {
    height: height,
    rtl: rtl,
    ltr: ltr
  };

  var $_8c5foxm1jdud7bw2 = {
    ltr: $_2qb4vhm2jdud7bw4.ltr,
    rtl: $_2qb4vhm2jdud7bw4.rtl
  };

  function TableDirection (directionAt) {
    var auto = function (table) {
      return directionAt(table).isRtl() ? $_8c5foxm1jdud7bw2.rtl : $_8c5foxm1jdud7bw2.ltr;
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
    var input = $_bfx1aek0jdud7blw.fromTable(table);
    var warehouse = $_ftidmkkyjdud7bpf.generate(input);
    return warehouse.grid();
  };
  var $_eqfbxym6jdud7bwj = { getGridSize: getGridSize };

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
      validate: $_duf7n8jzjdud7blu.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_jsge2jyjdud7bls.validateStrArr('required', required);
    $_jsge2jyjdud7bls.checkDupes(required);
    return function (obj) {
      var keys = $_fzfxsxjujdud7ble.keys(obj);
      var allReqd = $_2b6dlmjqjdud7bko.forall(required, function (req) {
        return $_2b6dlmjqjdud7bko.contains(keys, req);
      });
      if (!allReqd)
        $_jsge2jyjdud7bls.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_2b6dlmjqjdud7bko.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_jsge2jyjdud7bls.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_2b6dlmjqjdud7bko.filter(keys, function (key) {
      return !$_2b6dlmjqjdud7bko.contains(required, key);
    });
    if (unsupported.length > 0)
      $_jsge2jyjdud7bls.unsuppMessage(unsupported);
  };
  var allowExtra = $_e8r7mrjsjdud7bkx.noop;
  var $_3vhhbcmajdud7bxe = {
    exactly: $_e8r7mrjsjdud7bkx.curry(base, handleExact),
    ensure: $_e8r7mrjsjdud7bkx.curry(base, allowExtra),
    ensureWith: $_e8r7mrjsjdud7bkx.curry(baseWith, allowExtra)
  };

  var elementToData = function (element) {
    var colspan = $_1ei337kqjdud7bom.has(element, 'colspan') ? parseInt($_1ei337kqjdud7bom.get(element, 'colspan'), 10) : 1;
    var rowspan = $_1ei337kqjdud7bom.has(element, 'rowspan') ? parseInt($_1ei337kqjdud7bom.get(element, 'rowspan'), 10) : 1;
    return {
      element: $_e8r7mrjsjdud7bkx.constant(element),
      colspan: $_e8r7mrjsjdud7bkx.constant(colspan),
      rowspan: $_e8r7mrjsjdud7bkx.constant(rowspan)
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
        return $_2b6dlmjqjdud7bko.find(list, function (x) {
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
          element: $_e8r7mrjsjdud7bkx.constant(cell),
          colspan: $_e8r7mrjsjdud7bkx.constant(1),
          rowspan: $_e8r7mrjsjdud7bkx.constant(1)
        });
        $_b5rw3dkzjdud7bpm.remove(raw, 'width');
        $_b5rw3dkzjdud7bpm.remove(cell, 'width');
        return raw;
      };
    };
    return {
      combine: combine,
      cursor: position.get
    };
  };
  var contract = $_3vhhbcmajdud7bxe.exactly([
    'cell',
    'row',
    'replace',
    'gap'
  ]);
  var $_7ldhy3m8jdud7bx2 = {
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
    return $_2b6dlmjqjdud7bko.contains([
      'ol',
      'ul'
    ], tagName);
  };
  var isBlock = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_2b6dlmjqjdud7bko.contains(blockList, tagName);
  };
  var isFormatting = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_2b6dlmjqjdud7bko.contains([
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
    return $_2b6dlmjqjdud7bko.contains([
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isContainer = function (universe, item) {
    return $_2b6dlmjqjdud7bko.contains([
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
    return $_2b6dlmjqjdud7bko.contains([
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
  var $_ce1o36mdjdud7by4 = {
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
    return $_ce1o36mdjdud7by4.isBlock(universe$1, element);
  };
  var isList$1 = function (element) {
    return $_ce1o36mdjdud7by4.isList(universe$1, element);
  };
  var isFormatting$1 = function (element) {
    return $_ce1o36mdjdud7by4.isFormatting(universe$1, element);
  };
  var isHeading$1 = function (element) {
    return $_ce1o36mdjdud7by4.isHeading(universe$1, element);
  };
  var isContainer$1 = function (element) {
    return $_ce1o36mdjdud7by4.isContainer(universe$1, element);
  };
  var isEmptyTag$1 = function (element) {
    return $_ce1o36mdjdud7by4.isEmptyTag(universe$1, element);
  };
  var isFrame$1 = function (element) {
    return $_ce1o36mdjdud7by4.isFrame(universe$1, element);
  };
  var isInline$1 = function (element) {
    return $_ce1o36mdjdud7by4.isInline(universe$1, element);
  };
  var $_4wh7q4mcjdud7by1 = {
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
      return $_1102zvkrjdud7bou.name(el) === 'br';
    };
    var advancedBr = function (children) {
      return $_2b6dlmjqjdud7bko.forall(children, function (c) {
        return isBr(c) || $_1102zvkrjdud7bou.isText(c) && $_cvxenhl8jdud7bqz.get(c).trim().length === 0;
      });
    };
    var isListItem = function (el) {
      return $_1102zvkrjdud7bou.name(el) === 'li' || $_70n3lxkwjdud7bp4.ancestor(el, $_4wh7q4mcjdud7by1.isList).isSome();
    };
    var siblingIsBlock = function (el) {
      return $_9s8a4jk7jdud7bmw.nextSibling(el).map(function (rightSibling) {
        if ($_4wh7q4mcjdud7by1.isBlock(rightSibling))
          return true;
        if ($_4wh7q4mcjdud7by1.isEmptyTag(rightSibling)) {
          return $_1102zvkrjdud7bou.name(rightSibling) === 'img' ? false : true;
        }
      }).getOr(false);
    };
    var markCell = function (cell) {
      return $_b7vkeyl6jdud7bqu.last(cell).bind(function (rightEdge) {
        var rightSiblingIsBlock = siblingIsBlock(rightEdge);
        return $_9s8a4jk7jdud7bmw.parent(rightEdge).map(function (parent) {
          return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || $_4wh7q4mcjdud7by1.isBlock(parent) && !$_6nkapzk9jdud7bn7.eq(cell, parent) ? [] : [$_2q3j53k5jdud7bmr.fromTag('br')];
        });
      }).getOr([]);
    };
    var markContent = function () {
      var content = $_2b6dlmjqjdud7bko.bind(cells, function (cell) {
        var children = $_9s8a4jk7jdud7bmw.children(cell);
        return advancedBr(children) ? [] : children.concat(markCell(cell));
      });
      return content.length === 0 ? [$_2q3j53k5jdud7bmr.fromTag('br')] : content;
    };
    var contents = markContent();
    $_g2ty44l2jdud7bq6.empty(cells[0]);
    $_3zxknwl3jdud7bq9.append(cells[0], contents);
  };
  var $_7jh1dhmbjdud7bxh = { merge: merge };

  var shallow$1 = function (old, nu) {
    return nu;
  };
  var deep$1 = function (old, nu) {
    var bothObjects = $_duf7n8jzjdud7blu.isObject(old) && $_duf7n8jzjdud7blu.isObject(nu);
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
  var $_9egglgmfjdud7byk = {
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
  var $_a6p6d7mgjdud7bym = {
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
    return $_g6h236k1jdud7bm2.rowcells(cells, gridRow.section());
  };
  var mapCells = function (gridRow, f) {
    var cells = gridRow.cells();
    var r = $_2b6dlmjqjdud7bko.map(cells, f);
    return $_g6h236k1jdud7bm2.rowcells(r, gridRow.section());
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
  var $_36mtvcmjjdud7byy = {
    addCell: addCell,
    setCells: setCells,
    mutateCell: mutateCell,
    getCell: getCell,
    getCellElement: getCellElement,
    mapCells: mapCells,
    cellLength: cellLength
  };

  var getColumn = function (grid, index) {
    return $_2b6dlmjqjdud7bko.map(grid, function (row) {
      return $_36mtvcmjjdud7byy.getCell(row, index);
    });
  };
  var getRow = function (grid, index) {
    return grid[index];
  };
  var findDiff = function (xs, comp) {
    if (xs.length === 0)
      return 0;
    var first = xs[0];
    var index = $_2b6dlmjqjdud7bko.findIndex(xs, function (x) {
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
      colspan: $_e8r7mrjsjdud7bkx.constant(endColIndex),
      rowspan: $_e8r7mrjsjdud7bkx.constant(endRowIndex)
    };
  };
  var $_368uccmijdud7byt = { subgrid: subgrid };

  var toDetails = function (grid, comparator) {
    var seen = $_2b6dlmjqjdud7bko.map(grid, function (row, ri) {
      return $_2b6dlmjqjdud7bko.map(row.cells(), function (col, ci) {
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
    return $_2b6dlmjqjdud7bko.map(grid, function (row, ri) {
      var details = $_2b6dlmjqjdud7bko.bind(row.cells(), function (cell, ci) {
        if (seen[ri][ci] === false) {
          var result = $_368uccmijdud7byt.subgrid(grid, ri, ci, comparator);
          updateSeen(ri, ci, result.rowspan(), result.colspan());
          return [$_g6h236k1jdud7bm2.detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew())];
        } else {
          return [];
        }
      });
      return $_g6h236k1jdud7bm2.rowdetails(details, row.section());
    });
  };
  var toGrid = function (warehouse, generators, isNew) {
    var grid = [];
    for (var i = 0; i < warehouse.grid().rows(); i++) {
      var rowCells = [];
      for (var j = 0; j < warehouse.grid().columns(); j++) {
        var element = $_ftidmkkyjdud7bpf.getAt(warehouse, i, j).map(function (item) {
          return $_g6h236k1jdud7bm2.elementnew(item.element(), isNew);
        }).getOrThunk(function () {
          return $_g6h236k1jdud7bm2.elementnew(generators.gap(), true);
        });
        rowCells.push(element);
      }
      var row = $_g6h236k1jdud7bm2.rowcells(rowCells, warehouse.all()[i].section());
      grid.push(row);
    }
    return grid;
  };
  var $_17yaacmhjdud7byp = {
    toDetails: toDetails,
    toGrid: toGrid
  };

  var setIfNot = function (element, property, value, ignore) {
    if (value === ignore)
      $_1ei337kqjdud7bom.remove(element, property);
    else
      $_1ei337kqjdud7bom.set(element, property, value);
  };
  var render = function (table, grid) {
    var newRows = [];
    var newCells = [];
    var renderSection = function (gridSection, sectionName) {
      var section = $_a3r4h1kvjdud7bp3.child(table, sectionName).getOrThunk(function () {
        var tb = $_2q3j53k5jdud7bmr.fromTag(sectionName, $_9s8a4jk7jdud7bmw.owner(table).dom());
        $_b9f8rkl1jdud7bq5.append(table, tb);
        return tb;
      });
      $_g2ty44l2jdud7bq6.empty(section);
      var rows = $_2b6dlmjqjdud7bko.map(gridSection, function (row) {
        if (row.isNew()) {
          newRows.push(row.element());
        }
        var tr = row.element();
        $_g2ty44l2jdud7bq6.empty(tr);
        $_2b6dlmjqjdud7bko.each(row.cells(), function (cell) {
          if (cell.isNew()) {
            newCells.push(cell.element());
          }
          setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
          setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
          $_b9f8rkl1jdud7bq5.append(tr, cell.element());
        });
        return tr;
      });
      $_3zxknwl3jdud7bq9.append(section, rows);
    };
    var removeSection = function (sectionName) {
      $_a3r4h1kvjdud7bp3.child(table, sectionName).bind($_g2ty44l2jdud7bq6.remove);
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
    $_2b6dlmjqjdud7bko.each(grid, function (row) {
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
      newRows: $_e8r7mrjsjdud7bkx.constant(newRows),
      newCells: $_e8r7mrjsjdud7bkx.constant(newCells)
    };
  };
  var copy$2 = function (grid) {
    var rows = $_2b6dlmjqjdud7bko.map(grid, function (row) {
      var tr = $_dxykb7l5jdud7bqr.shallow(row.element());
      $_2b6dlmjqjdud7bko.each(row.cells(), function (cell) {
        var clonedCell = $_dxykb7l5jdud7bqr.deep(cell.element());
        setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
        setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
        $_b9f8rkl1jdud7bq5.append(tr, clonedCell);
      });
      return tr;
    });
    return rows;
  };
  var $_8uhxgumkjdud7bz1 = {
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
    $_2b6dlmjqjdud7bko.each(xs, function (x, i) {
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
      var rest = $_2b6dlmjqjdud7bko.reverse(xs.slice(0, index));
      return $_a6p6d7mgjdud7bym.findMap(rest, function (a, i) {
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
      return $_a6p6d7mgjdud7bym.findMap(rest, function (a, i) {
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
  var $_fclc2pmnjdud7c04 = {
    repeat: repeat,
    range: range$1,
    unique: unique,
    deduce: deduce
  };

  var columns = function (warehouse) {
    var grid = warehouse.grid();
    var cols = $_fclc2pmnjdud7c04.range(0, grid.columns());
    var rows = $_fclc2pmnjdud7c04.range(0, grid.rows());
    return $_2b6dlmjqjdud7bko.map(cols, function (col) {
      var getBlock = function () {
        return $_2b6dlmjqjdud7bko.bind(rows, function (r) {
          return $_ftidmkkyjdud7bpf.getAt(warehouse, r, col).filter(function (detail) {
            return detail.column() === col;
          }).fold($_e8r7mrjsjdud7bkx.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.colspan() === 1;
      };
      var getFallback = function () {
        return $_ftidmkkyjdud7bpf.getAt(warehouse, 0, col);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var decide = function (getBlock, isSingle, getFallback) {
    var inBlock = getBlock();
    var singleInBlock = $_2b6dlmjqjdud7bko.find(inBlock, isSingle);
    var detailOption = singleInBlock.orThunk(function () {
      return Option.from(inBlock[0]).orThunk(getFallback);
    });
    return detailOption.map(function (detail) {
      return detail.element();
    });
  };
  var rows$1 = function (warehouse) {
    var grid = warehouse.grid();
    var rows = $_fclc2pmnjdud7c04.range(0, grid.rows());
    var cols = $_fclc2pmnjdud7c04.range(0, grid.columns());
    return $_2b6dlmjqjdud7bko.map(rows, function (row) {
      var getBlock = function () {
        return $_2b6dlmjqjdud7bko.bind(cols, function (c) {
          return $_ftidmkkyjdud7bpf.getAt(warehouse, row, c).filter(function (detail) {
            return detail.row() === row;
          }).fold($_e8r7mrjsjdud7bkx.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.rowspan() === 1;
      };
      var getFallback = function () {
        return $_ftidmkkyjdud7bpf.getAt(warehouse, row, 0);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var $_n9ugpmmjdud7bzy = {
    columns: columns,
    rows: rows$1
  };

  var col = function (column, x, y, w, h) {
    var blocker = $_2q3j53k5jdud7bmr.fromTag('div');
    $_b5rw3dkzjdud7bpm.setAll(blocker, {
      position: 'absolute',
      left: x - w / 2 + 'px',
      top: y + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_1ei337kqjdud7bom.setAll(blocker, {
      'data-column': column,
      'role': 'presentation'
    });
    return blocker;
  };
  var row$1 = function (row, x, y, w, h) {
    var blocker = $_2q3j53k5jdud7bmr.fromTag('div');
    $_b5rw3dkzjdud7bpm.setAll(blocker, {
      position: 'absolute',
      left: x + 'px',
      top: y - h / 2 + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_1ei337kqjdud7bom.setAll(blocker, {
      'data-row': row,
      'role': 'presentation'
    });
    return blocker;
  };
  var $_apsvjymojdud7c0a = {
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
  var $_btd1tomqjdud7c0h = { css: css };

  var styles = $_btd1tomqjdud7c0h.css('ephox-snooker');
  var $_1t7l1pmpjdud7c0f = { resolve: styles.resolve };

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
    var value = $_1ei337kqjdud7bom.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read(element, attr);
    var nu = old.concat([id]);
    $_1ei337kqjdud7bom.set(element, attr, nu.join(' '));
  };
  var remove$3 = function (element, attr, id) {
    var nu = $_2b6dlmjqjdud7bko.filter(read(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_1ei337kqjdud7bom.set(element, attr, nu.join(' '));
    else
      $_1ei337kqjdud7bom.remove(element, attr);
  };
  var $_89zlcqmujdud7c0o = {
    read: read,
    add: add,
    remove: remove$3
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$6 = function (element) {
    return $_89zlcqmujdud7c0o.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_89zlcqmujdud7c0o.add(element, 'class', clazz);
  };
  var remove$4 = function (element, clazz) {
    return $_89zlcqmujdud7c0o.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_2b6dlmjqjdud7bko.contains(get$6(element), clazz)) {
      remove$4(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_2n8nx3mtjdud7c0l = {
    get: get$6,
    add: add$1,
    remove: remove$4,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_2n8nx3mtjdud7c0l.supports(element))
      element.dom().classList.add(clazz);
    else
      $_2n8nx3mtjdud7c0l.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_2n8nx3mtjdud7c0l.supports(element) ? element.dom().classList : $_2n8nx3mtjdud7c0l.get(element);
    if (classList.length === 0) {
      $_1ei337kqjdud7bom.remove(element, 'class');
    }
  };
  var remove$5 = function (element, clazz) {
    if ($_2n8nx3mtjdud7c0l.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_2n8nx3mtjdud7c0l.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_2n8nx3mtjdud7c0l.supports(element) ? element.dom().classList.toggle(clazz) : $_2n8nx3mtjdud7c0l.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_2n8nx3mtjdud7c0l.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_2n8nx3mtjdud7c0l.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_2n8nx3mtjdud7c0l.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_2n8nx3mtjdud7c0l.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_119fsomrjdud7c0i = {
    add: add$2,
    remove: remove$5,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var resizeBar = $_1t7l1pmpjdud7c0f.resolve('resizer-bar');
  var resizeRowBar = $_1t7l1pmpjdud7c0f.resolve('resizer-rows');
  var resizeColBar = $_1t7l1pmpjdud7c0f.resolve('resizer-cols');
  var BAR_THICKNESS = 7;
  var clear = function (wire) {
    var previous = $_b4a6sqksjdud7bov.descendants(wire.parent(), '.' + resizeBar);
    $_2b6dlmjqjdud7bko.each(previous, $_g2ty44l2jdud7bq6.remove);
  };
  var drawBar = function (wire, positions, create) {
    var origin = wire.origin();
    $_2b6dlmjqjdud7bko.each(positions, function (cpOption, i) {
      cpOption.each(function (cp) {
        var bar = create(origin, cp);
        $_119fsomrjdud7c0i.add(bar, resizeBar);
        $_b9f8rkl1jdud7bq5.append(wire.parent(), bar);
      });
    });
  };
  var refreshCol = function (wire, colPositions, position, tableHeight) {
    drawBar(wire, colPositions, function (origin, cp) {
      var colBar = $_apsvjymojdud7c0a.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
      $_119fsomrjdud7c0i.add(colBar, resizeColBar);
      return colBar;
    });
  };
  var refreshRow = function (wire, rowPositions, position, tableWidth) {
    drawBar(wire, rowPositions, function (origin, cp) {
      var rowBar = $_apsvjymojdud7c0a.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
      $_119fsomrjdud7c0i.add(rowBar, resizeRowBar);
      return rowBar;
    });
  };
  var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
    var position = $_1b83qkm3jdud7bwd.absolute(table);
    var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
    refreshRow(wire, rowPositions, position, $_fnm25ilzjdud7bvz.getOuter(table));
    var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
    refreshCol(wire, colPositions, position, $_d8flr3lxjdud7bvn.getOuter(table));
  };
  var refresh = function (wire, table, hdirection, vdirection) {
    clear(wire);
    var list = $_bfx1aek0jdud7blw.fromTable(table);
    var warehouse = $_ftidmkkyjdud7bpf.generate(list);
    var rows = $_n9ugpmmjdud7bzy.rows(warehouse);
    var cols = $_n9ugpmmjdud7bzy.columns(warehouse);
    refreshGrid(wire, table, rows, cols, hdirection, vdirection);
  };
  var each$2 = function (wire, f) {
    var bars = $_b4a6sqksjdud7bov.descendants(wire.parent(), '.' + resizeBar);
    $_2b6dlmjqjdud7bko.each(bars, f);
  };
  var hide = function (wire) {
    each$2(wire, function (bar) {
      $_b5rw3dkzjdud7bpm.set(bar, 'display', 'none');
    });
  };
  var show = function (wire) {
    each$2(wire, function (bar) {
      $_b5rw3dkzjdud7bpm.set(bar, 'display', 'block');
    });
  };
  var isRowBar = function (element) {
    return $_119fsomrjdud7c0i.has(element, resizeRowBar);
  };
  var isColBar = function (element) {
    return $_119fsomrjdud7c0i.has(element, resizeColBar);
  };
  var $_7xp62hmljdud7bzg = {
    refresh: refresh,
    hide: hide,
    show: show,
    destroy: clear,
    isRowBar: isRowBar,
    isColBar: isColBar
  };

  var fromWarehouse = function (warehouse, generators) {
    return $_17yaacmhjdud7byp.toGrid(warehouse, generators, false);
  };
  var deriveRows = function (rendered, generators) {
    var findRow = function (details) {
      var rowOfCells = $_a6p6d7mgjdud7bym.findMap(details, function (detail) {
        return $_9s8a4jk7jdud7bmw.parent(detail.element()).map(function (row) {
          var isNew = $_9s8a4jk7jdud7bmw.parent(row).isNone();
          return $_g6h236k1jdud7bm2.elementnew(row, isNew);
        });
      });
      return rowOfCells.getOrThunk(function () {
        return $_g6h236k1jdud7bm2.elementnew(generators.row(), true);
      });
    };
    return $_2b6dlmjqjdud7bko.map(rendered, function (details) {
      var row = findRow(details.details());
      return $_g6h236k1jdud7bm2.rowdatanew(row.element(), details.details(), details.section(), row.isNew());
    });
  };
  var toDetailList = function (grid, generators) {
    var rendered = $_17yaacmhjdud7byp.toDetails(grid, $_6nkapzk9jdud7bn7.eq);
    return deriveRows(rendered, generators);
  };
  var findInWarehouse = function (warehouse, element) {
    var all = $_2b6dlmjqjdud7bko.flatten($_2b6dlmjqjdud7bko.map(warehouse.all(), function (r) {
      return r.cells();
    }));
    return $_2b6dlmjqjdud7bko.find(all, function (e) {
      return $_6nkapzk9jdud7bn7.eq(element, e.element());
    });
  };
  var run = function (operation, extract, adjustment, postAction, genWrappers) {
    return function (wire, table, target, generators, direction) {
      var input = $_bfx1aek0jdud7blw.fromTable(table);
      var warehouse = $_ftidmkkyjdud7bpf.generate(input);
      var output = extract(warehouse, target).map(function (info) {
        var model = fromWarehouse(warehouse, generators);
        var result = operation(model, info, $_6nkapzk9jdud7bn7.eq, genWrappers(generators));
        var grid = toDetailList(result.grid(), generators);
        return {
          grid: $_e8r7mrjsjdud7bkx.constant(grid),
          cursor: result.cursor
        };
      });
      return output.fold(function () {
        return Option.none();
      }, function (out) {
        var newElements = $_8uhxgumkjdud7bz1.render(table, out.grid());
        adjustment(table, out.grid(), direction);
        postAction(table);
        $_7xp62hmljdud7bzg.refresh(wire, table, $_2qb4vhm2jdud7bw4.height, direction);
        return Option.some({
          cursor: out.cursor,
          newRows: newElements.newRows,
          newCells: newElements.newCells
        });
      });
    };
  };
  var onCell = function (warehouse, target) {
    return $_e5b08wk2jdud7bm5.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell);
    });
  };
  var onPaste = function (warehouse, target) {
    return $_e5b08wk2jdud7bm5.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell).map(function (details) {
        return $_9egglgmfjdud7byk.merge(details, {
          generators: target.generators,
          clipboard: target.clipboard
        });
      });
    });
  };
  var onPasteRows = function (warehouse, target) {
    var details = $_2b6dlmjqjdud7bko.map(target.selection(), function (cell) {
      return $_e5b08wk2jdud7bm5.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_a6p6d7mgjdud7bym.cat(details);
    return cells.length > 0 ? Option.some($_9egglgmfjdud7byk.merge({ cells: cells }, {
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
    var details = $_2b6dlmjqjdud7bko.map(target.selection(), function (cell) {
      return $_e5b08wk2jdud7bm5.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_a6p6d7mgjdud7bym.cat(details);
    return cells.length > 0 ? Option.some(cells) : Option.none();
  };
  var $_5ex7nomejdud7by9 = {
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
      isValue: $_e8r7mrjsjdud7bkx.always,
      isError: $_e8r7mrjsjdud7bkx.never,
      getOr: $_e8r7mrjsjdud7bkx.constant(o),
      getOrThunk: $_e8r7mrjsjdud7bkx.constant(o),
      getOrDie: $_e8r7mrjsjdud7bkx.constant(o),
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
      return $_e8r7mrjsjdud7bkx.die(message)();
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
      is: $_e8r7mrjsjdud7bkx.never,
      isValue: $_e8r7mrjsjdud7bkx.never,
      isError: $_e8r7mrjsjdud7bkx.always,
      getOr: $_e8r7mrjsjdud7bkx.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_e8r7mrjsjdud7bkx.noop,
      bind: bind,
      exists: $_e8r7mrjsjdud7bkx.never,
      forall: $_e8r7mrjsjdud7bkx.always,
      toOption: Option.none
    };
  };
  var Result = {
    value: value$1,
    error: error
  };

  var measure = function (startAddress, gridA, gridB) {
    if (startAddress.row() >= gridA.length || startAddress.column() > $_36mtvcmjjdud7byy.cellLength(gridA[0]))
      return Result.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
    var rowRemainder = gridA.slice(startAddress.row());
    var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
    var colRequired = $_36mtvcmjjdud7byy.cellLength(gridB[0]);
    var rowRequired = gridB.length;
    return Result.value({
      rowDelta: $_e8r7mrjsjdud7bkx.constant(rowRemainder.length - rowRequired),
      colDelta: $_e8r7mrjsjdud7bkx.constant(colRemainder.length - colRequired)
    });
  };
  var measureWidth = function (gridA, gridB) {
    var colLengthA = $_36mtvcmjjdud7byy.cellLength(gridA[0]);
    var colLengthB = $_36mtvcmjjdud7byy.cellLength(gridB[0]);
    return {
      rowDelta: $_e8r7mrjsjdud7bkx.constant(0),
      colDelta: $_e8r7mrjsjdud7bkx.constant(colLengthA - colLengthB)
    };
  };
  var fill = function (cells, generator) {
    return $_2b6dlmjqjdud7bko.map(cells, function () {
      return $_g6h236k1jdud7bm2.elementnew(generator.cell(), true);
    });
  };
  var rowFill = function (grid, amount, generator) {
    return grid.concat($_fclc2pmnjdud7c04.repeat(amount, function (_row) {
      return $_36mtvcmjjdud7byy.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
    }));
  };
  var colFill = function (grid, amount, generator) {
    return $_2b6dlmjqjdud7bko.map(grid, function (row) {
      return $_36mtvcmjjdud7byy.setCells(row, row.cells().concat(fill($_fclc2pmnjdud7c04.range(0, amount), generator)));
    });
  };
  var tailor = function (gridA, delta, generator) {
    var fillCols = delta.colDelta() < 0 ? colFill : $_e8r7mrjsjdud7bkx.identity;
    var fillRows = delta.rowDelta() < 0 ? rowFill : $_e8r7mrjsjdud7bkx.identity;
    var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
    var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
    return tailoredGrid;
  };
  var $_fj2pxjmwjdud7c0w = {
    measure: measure,
    measureWidth: measureWidth,
    tailor: tailor
  };

  var merge$2 = function (grid, bounds, comparator, substitution) {
    if (grid.length === 0)
      return grid;
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        $_36mtvcmjjdud7byy.mutateCell(grid[i], j, $_g6h236k1jdud7bm2.elementnew(substitution(), false));
      }
    }
    return grid;
  };
  var unmerge = function (grid, target, comparator, substitution) {
    var first = true;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < $_36mtvcmjjdud7byy.cellLength(grid[0]); j++) {
        var current = $_36mtvcmjjdud7byy.getCellElement(grid[i], j);
        var isToReplace = comparator(current, target);
        if (isToReplace === true && first === false) {
          $_36mtvcmjjdud7byy.mutateCell(grid[i], j, $_g6h236k1jdud7bm2.elementnew(substitution(), true));
        } else if (isToReplace === true) {
          first = false;
        }
      }
    }
    return grid;
  };
  var uniqueCells = function (row, comparator) {
    return $_2b6dlmjqjdud7bko.foldl(row, function (rest, cell) {
      return $_2b6dlmjqjdud7bko.exists(rest, function (currentCell) {
        return comparator(currentCell.element(), cell.element());
      }) ? rest : rest.concat([cell]);
    }, []);
  };
  var splitRows = function (grid, index, comparator, substitution) {
    if (index > 0 && index < grid.length) {
      var rowPrevCells = grid[index - 1].cells();
      var cells = uniqueCells(rowPrevCells, comparator);
      $_2b6dlmjqjdud7bko.each(cells, function (cell) {
        var replacement = Option.none();
        for (var i = index; i < grid.length; i++) {
          for (var j = 0; j < $_36mtvcmjjdud7byy.cellLength(grid[0]); j++) {
            var current = grid[i].cells()[j];
            var isToReplace = comparator(current.element(), cell.element());
            if (isToReplace) {
              if (replacement.isNone()) {
                replacement = Option.some(substitution());
              }
              replacement.each(function (sub) {
                $_36mtvcmjjdud7byy.mutateCell(grid[i], j, $_g6h236k1jdud7bm2.elementnew(sub, true));
              });
            }
          }
        }
      });
    }
    return grid;
  };
  var $_bx6onlmyjdud7c16 = {
    merge: merge$2,
    unmerge: unmerge,
    splitRows: splitRows
  };

  var isSpanning = function (grid, row, col, comparator) {
    var candidate = $_36mtvcmjjdud7byy.getCell(grid[row], col);
    var matching = $_e8r7mrjsjdud7bkx.curry(comparator, candidate.element());
    var currentRow = grid[row];
    return grid.length > 1 && $_36mtvcmjjdud7byy.cellLength(currentRow) > 1 && (col > 0 && matching($_36mtvcmjjdud7byy.getCellElement(currentRow, col - 1)) || col < currentRow.length - 1 && matching($_36mtvcmjjdud7byy.getCellElement(currentRow, col + 1)) || row > 0 && matching($_36mtvcmjjdud7byy.getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching($_36mtvcmjjdud7byy.getCellElement(grid[row + 1], col)));
  };
  var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
    var startRow = startAddress.row();
    var startCol = startAddress.column();
    var mergeHeight = gridB.length;
    var mergeWidth = $_36mtvcmjjdud7byy.cellLength(gridB[0]);
    var endRow = startRow + mergeHeight;
    var endCol = startCol + mergeWidth;
    for (var r = startRow; r < endRow; r++) {
      for (var c = startCol; c < endCol; c++) {
        if (isSpanning(gridA, r, c, comparator)) {
          $_bx6onlmyjdud7c16.unmerge(gridA, $_36mtvcmjjdud7byy.getCellElement(gridA[r], c), comparator, generator.cell);
        }
        var newCell = $_36mtvcmjjdud7byy.getCellElement(gridB[r - startRow], c - startCol);
        var replacement = generator.replace(newCell);
        $_36mtvcmjjdud7byy.mutateCell(gridA[r], c, $_g6h236k1jdud7bm2.elementnew(replacement, true));
      }
    }
    return gridA;
  };
  var merge$3 = function (startAddress, gridA, gridB, generator, comparator) {
    var result = $_fj2pxjmwjdud7c0w.measure(startAddress, gridA, gridB);
    return result.map(function (delta) {
      var fittedGrid = $_fj2pxjmwjdud7c0w.tailor(gridA, delta, generator);
      return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
    });
  };
  var insert = function (index, gridA, gridB, generator, comparator) {
    $_bx6onlmyjdud7c16.splitRows(gridA, index, comparator, generator.cell);
    var delta = $_fj2pxjmwjdud7c0w.measureWidth(gridB, gridA);
    var fittedNewGrid = $_fj2pxjmwjdud7c0w.tailor(gridB, delta, generator);
    var secondDelta = $_fj2pxjmwjdud7c0w.measureWidth(gridA, fittedNewGrid);
    var fittedOldGrid = $_fj2pxjmwjdud7c0w.tailor(gridA, secondDelta, generator);
    return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
  };
  var $_1cg2k3mvjdud7c0r = {
    merge: merge$3,
    insert: insert
  };

  var insertRowAt = function (grid, index, example, comparator, substitution) {
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_36mtvcmjjdud7byy.mapCells(grid[example], function (ex, c) {
      var withinSpan = index > 0 && index < grid.length && comparator($_36mtvcmjjdud7byy.getCellElement(grid[index - 1], c), $_36mtvcmjjdud7byy.getCellElement(grid[index], c));
      var ret = withinSpan ? $_36mtvcmjjdud7byy.getCell(grid[index], c) : $_g6h236k1jdud7bm2.elementnew(substitution(ex.element(), comparator), true);
      return ret;
    });
    return before.concat([between]).concat(after);
  };
  var insertColumnAt = function (grid, index, example, comparator, substitution) {
    return $_2b6dlmjqjdud7bko.map(grid, function (row) {
      var withinSpan = index > 0 && index < $_36mtvcmjjdud7byy.cellLength(row) && comparator($_36mtvcmjjdud7byy.getCellElement(row, index - 1), $_36mtvcmjjdud7byy.getCellElement(row, index));
      var sub = withinSpan ? $_36mtvcmjjdud7byy.getCell(row, index) : $_g6h236k1jdud7bm2.elementnew(substitution($_36mtvcmjjdud7byy.getCellElement(row, example), comparator), true);
      return $_36mtvcmjjdud7byy.addCell(row, index, sub);
    });
  };
  var splitCellIntoColumns = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleCol + 1;
    return $_2b6dlmjqjdud7bko.map(grid, function (row, i) {
      var isTargetCell = i === exampleRow;
      var sub = isTargetCell ? $_g6h236k1jdud7bm2.elementnew(substitution($_36mtvcmjjdud7byy.getCellElement(row, exampleCol), comparator), true) : $_36mtvcmjjdud7byy.getCell(row, exampleCol);
      return $_36mtvcmjjdud7byy.addCell(row, index, sub);
    });
  };
  var splitCellIntoRows = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleRow + 1;
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_36mtvcmjjdud7byy.mapCells(grid[exampleRow], function (ex, i) {
      var isTargetCell = i === exampleCol;
      return isTargetCell ? $_g6h236k1jdud7bm2.elementnew(substitution(ex.element(), comparator), true) : ex;
    });
    return before.concat([between]).concat(after);
  };
  var deleteColumnsAt = function (grid, start, finish) {
    var rows = $_2b6dlmjqjdud7bko.map(grid, function (row) {
      var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
      return $_g6h236k1jdud7bm2.rowcells(cells, row.section());
    });
    return $_2b6dlmjqjdud7bko.filter(rows, function (row) {
      return row.cells().length > 0;
    });
  };
  var deleteRowsAt = function (grid, start, finish) {
    return grid.slice(0, start).concat(grid.slice(finish + 1));
  };
  var $_15q5cvmzjdud7c1c = {
    insertRowAt: insertRowAt,
    insertColumnAt: insertColumnAt,
    splitCellIntoColumns: splitCellIntoColumns,
    splitCellIntoRows: splitCellIntoRows,
    deleteRowsAt: deleteRowsAt,
    deleteColumnsAt: deleteColumnsAt
  };

  var replaceIn = function (grid, targets, comparator, substitution) {
    var isTarget = function (cell) {
      return $_2b6dlmjqjdud7bko.exists(targets, function (target) {
        return comparator(cell.element(), target.element());
      });
    };
    return $_2b6dlmjqjdud7bko.map(grid, function (row) {
      return $_36mtvcmjjdud7byy.mapCells(row, function (cell) {
        return isTarget(cell) ? $_g6h236k1jdud7bm2.elementnew(substitution(cell.element(), comparator), true) : cell;
      });
    });
  };
  var notStartRow = function (grid, rowIndex, colIndex, comparator) {
    return $_36mtvcmjjdud7byy.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator($_36mtvcmjjdud7byy.getCellElement(grid[rowIndex - 1], colIndex), $_36mtvcmjjdud7byy.getCellElement(grid[rowIndex], colIndex)));
  };
  var notStartColumn = function (row, index, comparator) {
    return index > 0 && comparator($_36mtvcmjjdud7byy.getCellElement(row, index - 1), $_36mtvcmjjdud7byy.getCellElement(row, index));
  };
  var replaceColumn = function (grid, index, comparator, substitution) {
    var targets = $_2b6dlmjqjdud7bko.bind(grid, function (row, i) {
      var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
      return alreadyAdded ? [] : [$_36mtvcmjjdud7byy.getCell(row, index)];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var replaceRow = function (grid, index, comparator, substitution) {
    var targetRow = grid[index];
    var targets = $_2b6dlmjqjdud7bko.bind(targetRow.cells(), function (item, i) {
      var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
      return alreadyAdded ? [] : [item];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var $_21bofun0jdud7c1g = {
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
  var $_4amvton3jdud7c1z = {
    none: none$1,
    only: only,
    left: left,
    middle: middle,
    right: right
  };

  var neighbours$1 = function (input, index) {
    if (input.length === 0)
      return $_4amvton3jdud7c1z.none();
    if (input.length === 1)
      return $_4amvton3jdud7c1z.only(0);
    if (index === 0)
      return $_4amvton3jdud7c1z.left(0, 1);
    if (index === input.length - 1)
      return $_4amvton3jdud7c1z.right(index - 1, index);
    if (index > 0 && index < input.length - 1)
      return $_4amvton3jdud7c1z.middle(index - 1, index, index + 1);
    return $_4amvton3jdud7c1z.none();
  };
  var determine = function (input, column, step, tableSize) {
    var result = input.slice(0);
    var context = neighbours$1(input, column);
    var zero = function (array) {
      return $_2b6dlmjqjdud7bko.map(array, $_e8r7mrjsjdud7bkx.constant(0));
    };
    var onNone = $_e8r7mrjsjdud7bkx.constant(zero(result));
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
  var $_62ymron2jdud7c1u = { determine: determine };

  var getSpan$1 = function (cell, type) {
    return $_1ei337kqjdud7bom.has(cell, type) && parseInt($_1ei337kqjdud7bom.get(cell, type), 10) > 1;
  };
  var hasColspan = function (cell) {
    return getSpan$1(cell, 'colspan');
  };
  var hasRowspan = function (cell) {
    return getSpan$1(cell, 'rowspan');
  };
  var getInt = function (element, property) {
    return parseInt($_b5rw3dkzjdud7bpm.get(element, property), 10);
  };
  var $_g0vp2on5jdud7c27 = {
    hasColspan: hasColspan,
    hasRowspan: hasRowspan,
    minWidth: $_e8r7mrjsjdud7bkx.constant(10),
    minHeight: $_e8r7mrjsjdud7bkx.constant(10),
    getInt: getInt
  };

  var getRaw$1 = function (cell, property, getter) {
    return $_b5rw3dkzjdud7bpm.getRaw(cell, property).fold(function () {
      return getter(cell) + 'px';
    }, function (raw) {
      return raw;
    });
  };
  var getRawW = function (cell) {
    return getRaw$1(cell, 'width', $_b1w9oplvjdud7bv2.getPixelWidth);
  };
  var getRawH = function (cell) {
    return getRaw$1(cell, 'height', $_b1w9oplvjdud7bv2.getHeight);
  };
  var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
    var columns = $_n9ugpmmjdud7bzy.columns(warehouse);
    var backups = $_2b6dlmjqjdud7bko.map(columns, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_2b6dlmjqjdud7bko.map(columns, function (cellOption, c) {
      var columnCell = cellOption.filter($_e8r7mrjsjdud7bkx.not($_g0vp2on5jdud7c27.hasColspan));
      return columnCell.fold(function () {
        var deduced = $_fclc2pmnjdud7c04.deduce(backups, c);
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
    return getWidthFrom(warehouse, direction, $_b1w9oplvjdud7bv2.getPercentageWidth, function (deduced) {
      return deduced.fold(function () {
        return tableSize.minCellWidth();
      }, function (cellWidth) {
        return cellWidth / tableSize.pixelWidth() * 100;
      });
    }, tableSize);
  };
  var getPixelWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_b1w9oplvjdud7bv2.getPixelWidth, function (deduced) {
      return deduced.getOrThunk(tableSize.minCellWidth);
    }, tableSize);
  };
  var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
    var rows = $_n9ugpmmjdud7bzy.rows(warehouse);
    var backups = $_2b6dlmjqjdud7bko.map(rows, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_2b6dlmjqjdud7bko.map(rows, function (cellOption, c) {
      var rowCell = cellOption.filter($_e8r7mrjsjdud7bkx.not($_g0vp2on5jdud7c27.hasRowspan));
      return rowCell.fold(function () {
        var deduced = $_fclc2pmnjdud7c04.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getHeight(cell);
      });
    });
  };
  var getPixelHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, $_b1w9oplvjdud7bv2.getHeight, function (deduced) {
      return deduced.getOrThunk($_g0vp2on5jdud7c27.minHeight);
    });
  };
  var getRawHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, getRawH, getDeduced);
  };
  var $_eidhfcn4jdud7c21 = {
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
    var all = $_ftidmkkyjdud7bpf.justCells(warehouse);
    return $_2b6dlmjqjdud7bko.map(all, function (cell) {
      var width = total(cell.column(), cell.column() + cell.colspan(), widths);
      return {
        element: cell.element,
        width: $_e8r7mrjsjdud7bkx.constant(width),
        colspan: cell.colspan
      };
    });
  };
  var recalculateHeight = function (warehouse, heights) {
    var all = $_ftidmkkyjdud7bpf.justCells(warehouse);
    return $_2b6dlmjqjdud7bko.map(all, function (cell) {
      var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
      return {
        element: cell.element,
        height: $_e8r7mrjsjdud7bkx.constant(height),
        rowspan: cell.rowspan
      };
    });
  };
  var matchRowHeight = function (warehouse, heights) {
    return $_2b6dlmjqjdud7bko.map(warehouse.all(), function (row, i) {
      return {
        element: row.element,
        height: $_e8r7mrjsjdud7bkx.constant(heights[i])
      };
    });
  };
  var $_n94aqn6jdud7c2c = {
    recalculateWidth: recalculateWidth,
    recalculateHeight: recalculateHeight,
    matchRowHeight: matchRowHeight
  };

  var percentageSize = function (width, element) {
    var floatWidth = parseFloat(width);
    var pixelWidth = $_fnm25ilzjdud7bvz.get(element);
    var getCellDelta = function (delta) {
      return delta / pixelWidth * 100;
    };
    var singleColumnWidth = function (width, _delta) {
      return [100 - width];
    };
    var minCellWidth = function () {
      return $_g0vp2on5jdud7c27.minWidth() / pixelWidth * 100;
    };
    var setTableWidth = function (table, _newWidths, delta) {
      var total = floatWidth + delta;
      $_b1w9oplvjdud7bv2.setPercentageWidth(table, total);
    };
    return {
      width: $_e8r7mrjsjdud7bkx.constant(floatWidth),
      pixelWidth: $_e8r7mrjsjdud7bkx.constant(pixelWidth),
      getWidths: $_eidhfcn4jdud7c21.getPercentageWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: minCellWidth,
      setElementWidth: $_b1w9oplvjdud7bv2.setPercentageWidth,
      setTableWidth: setTableWidth
    };
  };
  var pixelSize = function (width) {
    var intWidth = parseInt(width, 10);
    var getCellDelta = $_e8r7mrjsjdud7bkx.identity;
    var singleColumnWidth = function (width, delta) {
      var newNext = Math.max($_g0vp2on5jdud7c27.minWidth(), width + delta);
      return [newNext - width];
    };
    var setTableWidth = function (table, newWidths, _delta) {
      var total = $_2b6dlmjqjdud7bko.foldr(newWidths, function (b, a) {
        return b + a;
      }, 0);
      $_b1w9oplvjdud7bv2.setPixelWidth(table, total);
    };
    return {
      width: $_e8r7mrjsjdud7bkx.constant(intWidth),
      pixelWidth: $_e8r7mrjsjdud7bkx.constant(intWidth),
      getWidths: $_eidhfcn4jdud7c21.getPixelWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: $_g0vp2on5jdud7c27.minWidth,
      setElementWidth: $_b1w9oplvjdud7bv2.setPixelWidth,
      setTableWidth: setTableWidth
    };
  };
  var chooseSize = function (element, width) {
    if ($_b1w9oplvjdud7bv2.percentageBasedSizeRegex().test(width)) {
      var percentMatch = $_b1w9oplvjdud7bv2.percentageBasedSizeRegex().exec(width);
      return percentageSize(percentMatch[1], element);
    } else if ($_b1w9oplvjdud7bv2.pixelBasedSizeRegex().test(width)) {
      var pixelMatch = $_b1w9oplvjdud7bv2.pixelBasedSizeRegex().exec(width);
      return pixelSize(pixelMatch[1]);
    } else {
      var fallbackWidth = $_fnm25ilzjdud7bvz.get(element);
      return pixelSize(fallbackWidth);
    }
  };
  var getTableSize = function (element) {
    var width = $_b1w9oplvjdud7bv2.getRawWidth(element);
    return width.fold(function () {
      var fallbackWidth = $_fnm25ilzjdud7bvz.get(element);
      return pixelSize(fallbackWidth);
    }, function (width) {
      return chooseSize(element, width);
    });
  };
  var $_36fs3an7jdud7c2i = { getTableSize: getTableSize };

  var getWarehouse$1 = function (list) {
    return $_ftidmkkyjdud7bpf.generate(list);
  };
  var sumUp = function (newSize) {
    return $_2b6dlmjqjdud7bko.foldr(newSize, function (b, a) {
      return b + a;
    }, 0);
  };
  var getTableWarehouse = function (table) {
    var list = $_bfx1aek0jdud7blw.fromTable(table);
    return getWarehouse$1(list);
  };
  var adjustWidth = function (table, delta, index, direction) {
    var tableSize = $_36fs3an7jdud7c2i.getTableSize(table);
    var step = tableSize.getCellDelta(delta);
    var warehouse = getTableWarehouse(table);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var deltas = $_62ymron2jdud7c1u.determine(widths, index, step, tableSize);
    var newWidths = $_2b6dlmjqjdud7bko.map(deltas, function (dx, i) {
      return dx + widths[i];
    });
    var newSizes = $_n94aqn6jdud7c2c.recalculateWidth(warehouse, newWidths);
    $_2b6dlmjqjdud7bko.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    if (index === warehouse.grid().columns() - 1) {
      tableSize.setTableWidth(table, newWidths, step);
    }
  };
  var adjustHeight = function (table, delta, index, direction) {
    var warehouse = getTableWarehouse(table);
    var heights = $_eidhfcn4jdud7c21.getPixelHeights(warehouse, direction);
    var newHeights = $_2b6dlmjqjdud7bko.map(heights, function (dy, i) {
      return index === i ? Math.max(delta + dy, $_g0vp2on5jdud7c27.minHeight()) : dy;
    });
    var newCellSizes = $_n94aqn6jdud7c2c.recalculateHeight(warehouse, newHeights);
    var newRowSizes = $_n94aqn6jdud7c2c.matchRowHeight(warehouse, newHeights);
    $_2b6dlmjqjdud7bko.each(newRowSizes, function (row) {
      $_b1w9oplvjdud7bv2.setHeight(row.element(), row.height());
    });
    $_2b6dlmjqjdud7bko.each(newCellSizes, function (cell) {
      $_b1w9oplvjdud7bv2.setHeight(cell.element(), cell.height());
    });
    var total = sumUp(newHeights);
    $_b1w9oplvjdud7bv2.setHeight(table, total);
  };
  var adjustWidthTo = function (table, list, direction) {
    var tableSize = $_36fs3an7jdud7c2i.getTableSize(table);
    var warehouse = getWarehouse$1(list);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var newSizes = $_n94aqn6jdud7c2c.recalculateWidth(warehouse, widths);
    $_2b6dlmjqjdud7bko.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    var total = $_2b6dlmjqjdud7bko.foldr(widths, function (b, a) {
      return a + b;
    }, 0);
    if (newSizes.length > 0) {
      tableSize.setElementWidth(table, total);
    }
  };
  var $_3b8umn1jdud7c1k = {
    adjustWidth: adjustWidth,
    adjustHeight: adjustHeight,
    adjustWidthTo: adjustWidthTo
  };

  var prune = function (table) {
    var cells = $_e5b08wk2jdud7bm5.cells(table);
    if (cells.length === 0)
      $_g2ty44l2jdud7bq6.remove(table);
  };
  var outcome = $_4vwz6tjvjdud7blm.immutable('grid', 'cursor');
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
    return $_2b6dlmjqjdud7bko.foldl(details, function (rest, detail) {
      return $_2b6dlmjqjdud7bko.exists(rest, function (currentDetail) {
        return currentDetail.row() === detail.row();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.row() - detailB.row();
    });
  };
  var uniqueColumns = function (details) {
    return $_2b6dlmjqjdud7bko.foldl(details, function (rest, detail) {
      return $_2b6dlmjqjdud7bko.exists(rest, function (currentDetail) {
        return currentDetail.column() === detail.column();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.column() - detailB.column();
    });
  };
  var insertRowBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row();
    var newGrid = $_15q5cvmzjdud7c1c.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsBefore = function (grid, details, comparator, genWrappers) {
    var example = details[0].row();
    var targetIndex = details[0].row();
    var rows = uniqueRows(details);
    var newGrid = $_2b6dlmjqjdud7bko.foldl(rows, function (newGrid, _row) {
      return $_15q5cvmzjdud7c1c.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertRowAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row() + detail.rowspan();
    var newGrid = $_15q5cvmzjdud7c1c.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsAfter = function (grid, details, comparator, genWrappers) {
    var rows = uniqueRows(details);
    var example = rows[rows.length - 1].row();
    var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
    var newGrid = $_2b6dlmjqjdud7bko.foldl(rows, function (newGrid, _row) {
      return $_15q5cvmzjdud7c1c.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column();
    var newGrid = $_15q5cvmzjdud7c1c.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
    var columns = uniqueColumns(details);
    var example = columns[0].column();
    var targetIndex = columns[0].column();
    var newGrid = $_2b6dlmjqjdud7bko.foldl(columns, function (newGrid, _row) {
      return $_15q5cvmzjdud7c1c.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column() + detail.colspan();
    var newGrid = $_15q5cvmzjdud7c1c.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
    var example = details[details.length - 1].column();
    var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
    var columns = uniqueColumns(details);
    var newGrid = $_2b6dlmjqjdud7bko.foldl(columns, function (newGrid, _row) {
      return $_15q5cvmzjdud7c1c.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var makeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_21bofun0jdud7c1g.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_21bofun0jdud7c1g.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_21bofun0jdud7c1g.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_21bofun0jdud7c1g.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoColumns$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_15q5cvmzjdud7c1c.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoRows$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_15q5cvmzjdud7c1c.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var eraseColumns = function (grid, details, comparator, _genWrappers) {
    var columns = uniqueColumns(details);
    var newGrid = $_15q5cvmzjdud7c1c.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var eraseRows = function (grid, details, comparator, _genWrappers) {
    var rows = uniqueRows(details);
    var newGrid = $_15q5cvmzjdud7c1c.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var mergeCells = function (grid, mergable, comparator, _genWrappers) {
    var cells = mergable.cells();
    $_7jh1dhmbjdud7bxh.merge(cells);
    var newGrid = $_bx6onlmyjdud7c16.merge(grid, mergable.bounds(), comparator, $_e8r7mrjsjdud7bkx.constant(cells[0]));
    return outcome(newGrid, Option.from(cells[0]));
  };
  var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
    var newGrid = $_2b6dlmjqjdud7bko.foldr(unmergable, function (b, cell) {
      return $_bx6onlmyjdud7c16.unmerge(b, cell, comparator, genWrappers.combine(cell));
    }, grid);
    return outcome(newGrid, Option.from(unmergable[0]));
  };
  var pasteCells = function (grid, pasteDetails, comparator, genWrappers) {
    var gridify = function (table, generators) {
      var list = $_bfx1aek0jdud7blw.fromTable(table);
      var wh = $_ftidmkkyjdud7bpf.generate(list);
      return $_17yaacmhjdud7byp.toGrid(wh, generators, true);
    };
    var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
    var startAddress = $_g6h236k1jdud7bm2.address(pasteDetails.row(), pasteDetails.column());
    var mergedGrid = $_1cg2k3mvjdud7c0r.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
    return mergedGrid.fold(function () {
      return outcome(grid, Option.some(pasteDetails.element()));
    }, function (nuGrid) {
      var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
      return outcome(nuGrid, cursor);
    });
  };
  var gridifyRows = function (rows, generators, example) {
    var pasteDetails = $_bfx1aek0jdud7blw.fromPastedRows(rows, example);
    var wh = $_ftidmkkyjdud7bpf.generate(pasteDetails);
    return $_17yaacmhjdud7byp.toGrid(wh, generators, true);
  };
  var pasteRowsBefore = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[0].row();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_1cg2k3mvjdud7c0r.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var pasteRowsAfter = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_1cg2k3mvjdud7c0r.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var resize = $_3b8umn1jdud7c1k.adjustWidthTo;
  var $_a50jw7m7jdud7bwm = {
    insertRowBefore: $_5ex7nomejdud7by9.run(insertRowBefore, $_5ex7nomejdud7by9.onCell, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    insertRowsBefore: $_5ex7nomejdud7by9.run(insertRowsBefore, $_5ex7nomejdud7by9.onCells, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    insertRowAfter: $_5ex7nomejdud7by9.run(insertRowAfter, $_5ex7nomejdud7by9.onCell, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    insertRowsAfter: $_5ex7nomejdud7by9.run(insertRowsAfter, $_5ex7nomejdud7by9.onCells, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    insertColumnBefore: $_5ex7nomejdud7by9.run(insertColumnBefore, $_5ex7nomejdud7by9.onCell, resize, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    insertColumnsBefore: $_5ex7nomejdud7by9.run(insertColumnsBefore, $_5ex7nomejdud7by9.onCells, resize, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    insertColumnAfter: $_5ex7nomejdud7by9.run(insertColumnAfter, $_5ex7nomejdud7by9.onCell, resize, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    insertColumnsAfter: $_5ex7nomejdud7by9.run(insertColumnsAfter, $_5ex7nomejdud7by9.onCells, resize, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    splitCellIntoColumns: $_5ex7nomejdud7by9.run(splitCellIntoColumns$1, $_5ex7nomejdud7by9.onCell, resize, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    splitCellIntoRows: $_5ex7nomejdud7by9.run(splitCellIntoRows$1, $_5ex7nomejdud7by9.onCell, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    eraseColumns: $_5ex7nomejdud7by9.run(eraseColumns, $_5ex7nomejdud7by9.onCells, resize, prune, $_7ldhy3m8jdud7bx2.modification),
    eraseRows: $_5ex7nomejdud7by9.run(eraseRows, $_5ex7nomejdud7by9.onCells, $_e8r7mrjsjdud7bkx.noop, prune, $_7ldhy3m8jdud7bx2.modification),
    makeColumnHeader: $_5ex7nomejdud7by9.run(makeColumnHeader, $_5ex7nomejdud7by9.onCell, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.transform('row', 'th')),
    unmakeColumnHeader: $_5ex7nomejdud7by9.run(unmakeColumnHeader, $_5ex7nomejdud7by9.onCell, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.transform(null, 'td')),
    makeRowHeader: $_5ex7nomejdud7by9.run(makeRowHeader, $_5ex7nomejdud7by9.onCell, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.transform('col', 'th')),
    unmakeRowHeader: $_5ex7nomejdud7by9.run(unmakeRowHeader, $_5ex7nomejdud7by9.onCell, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.transform(null, 'td')),
    mergeCells: $_5ex7nomejdud7by9.run(mergeCells, $_5ex7nomejdud7by9.onMergable, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.merging),
    unmergeCells: $_5ex7nomejdud7by9.run(unmergeCells, $_5ex7nomejdud7by9.onUnmergable, resize, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.merging),
    pasteCells: $_5ex7nomejdud7by9.run(pasteCells, $_5ex7nomejdud7by9.onPaste, resize, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    pasteRowsBefore: $_5ex7nomejdud7by9.run(pasteRowsBefore, $_5ex7nomejdud7by9.onPasteRows, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification),
    pasteRowsAfter: $_5ex7nomejdud7by9.run(pasteRowsAfter, $_5ex7nomejdud7by9.onPasteRows, $_e8r7mrjsjdud7bkx.noop, $_e8r7mrjsjdud7bkx.noop, $_7ldhy3m8jdud7bx2.modification)
  };

  var getBody$1 = function (editor) {
    return $_2q3j53k5jdud7bmr.fromDom(editor.getBody());
  };
  var getIsRoot = function (editor) {
    return function (element) {
      return $_6nkapzk9jdud7bn7.eq(element, getBody$1(editor));
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
  var $_6xec71n8jdud7c2o = {
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
    return $_b5rw3dkzjdud7bpm.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_78y7btnajdud7c2w = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var ltr$1 = { isRtl: $_e8r7mrjsjdud7bkx.constant(false) };
  var rtl$1 = { isRtl: $_e8r7mrjsjdud7bkx.constant(true) };
  var directionAt = function (element) {
    var dir = $_78y7btnajdud7c2w.getDirection(element);
    return dir === 'rtl' ? rtl$1 : ltr$1;
  };
  var $_eqsr8dn9jdud7c2r = { directionAt: directionAt };

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
  var getForcedRootBlock = function (editor) {
    return editor.getParam('forced_root_block', 'p', 'string');
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
  var getForcedRootBlockAttrs = function (editor) {
    return editor.getParam('forced_block_attrs', {}, 'object');
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
    if ($_duf7n8jzjdud7blu.isString(cloneElements)) {
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
    } else if ($_duf7n8jzjdud7blu.isString(toolbar)) {
      return toolbar.split(/[ ,]/);
    } else if ($_duf7n8jzjdud7blu.isArray(toolbar)) {
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

  function TableActions (editor, lazyWire) {
    var isTableBody = function (editor) {
      return $_1102zvkrjdud7bou.name($_6xec71n8jdud7c2o.getBody(editor)) === 'table';
    };
    var lastRowGuard = function (table) {
      var size = $_eqfbxym6jdud7bwj.getGridSize(table);
      return isTableBody(editor) === false || size.rows() > 1;
    };
    var lastColumnGuard = function (table) {
      var size = $_eqfbxym6jdud7bwj.getGridSize(table);
      return isTableBody(editor) === false || size.columns() > 1;
    };
    var cloneFormats = getCloneElements(editor);
    var execute = function (operation, guard, mutate, lazyWire) {
      return function (table, target) {
        var dataStyleCells = $_b4a6sqksjdud7bov.descendants(table, 'td[data-mce-style],th[data-mce-style]');
        $_2b6dlmjqjdud7bko.each(dataStyleCells, function (cell) {
          $_1ei337kqjdud7bom.remove(cell, 'data-mce-style');
        });
        var wire = lazyWire();
        var doc = $_2q3j53k5jdud7bmr.fromDom(editor.getDoc());
        var direction = TableDirection($_eqsr8dn9jdud7c2r.directionAt);
        var generators = $_c3joicl4jdud7bqc.cellOperations(mutate, doc, cloneFormats);
        return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
          $_2b6dlmjqjdud7bko.each(result.newRows(), function (row) {
            fireNewRow(editor, row.dom());
          });
          $_2b6dlmjqjdud7bko.each(result.newCells(), function (cell) {
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
    var deleteRow = execute($_a50jw7m7jdud7bwm.eraseRows, lastRowGuard, $_e8r7mrjsjdud7bkx.noop, lazyWire);
    var deleteColumn = execute($_a50jw7m7jdud7bwm.eraseColumns, lastColumnGuard, $_e8r7mrjsjdud7bkx.noop, lazyWire);
    var insertRowsBefore = execute($_a50jw7m7jdud7bwm.insertRowsBefore, $_e8r7mrjsjdud7bkx.always, $_e8r7mrjsjdud7bkx.noop, lazyWire);
    var insertRowsAfter = execute($_a50jw7m7jdud7bwm.insertRowsAfter, $_e8r7mrjsjdud7bkx.always, $_e8r7mrjsjdud7bkx.noop, lazyWire);
    var insertColumnsBefore = execute($_a50jw7m7jdud7bwm.insertColumnsBefore, $_e8r7mrjsjdud7bkx.always, $_dxd1kqlujdud7bv0.halve, lazyWire);
    var insertColumnsAfter = execute($_a50jw7m7jdud7bwm.insertColumnsAfter, $_e8r7mrjsjdud7bkx.always, $_dxd1kqlujdud7bv0.halve, lazyWire);
    var mergeCells = execute($_a50jw7m7jdud7bwm.mergeCells, $_e8r7mrjsjdud7bkx.always, $_e8r7mrjsjdud7bkx.noop, lazyWire);
    var unmergeCells = execute($_a50jw7m7jdud7bwm.unmergeCells, $_e8r7mrjsjdud7bkx.always, $_e8r7mrjsjdud7bkx.noop, lazyWire);
    var pasteRowsBefore = execute($_a50jw7m7jdud7bwm.pasteRowsBefore, $_e8r7mrjsjdud7bkx.always, $_e8r7mrjsjdud7bkx.noop, lazyWire);
    var pasteRowsAfter = execute($_a50jw7m7jdud7bwm.pasteRowsAfter, $_e8r7mrjsjdud7bkx.always, $_e8r7mrjsjdud7bkx.noop, lazyWire);
    var pasteCells = execute($_a50jw7m7jdud7bwm.pasteCells, $_e8r7mrjsjdud7bkx.always, $_e8r7mrjsjdud7bkx.noop, lazyWire);
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
    var list = $_bfx1aek0jdud7blw.fromTable(table);
    var house = $_ftidmkkyjdud7bpf.generate(list);
    var details = $_5ex7nomejdud7by9.onCells(house, target);
    return details.map(function (selectedCells) {
      var grid = $_17yaacmhjdud7byp.toGrid(house, generators, false);
      var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
      var slicedDetails = $_5ex7nomejdud7by9.toDetailList(slicedGrid, generators);
      return $_8uhxgumkjdud7bz1.copy(slicedDetails);
    });
  };
  var $_541tawnejdud7c3h = { copyRows: copyRows };

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

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
  var $_2bgm09nhjdud7c40 = {
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
      css.width = data.width ? $_6xec71n8jdud7c2o.addSizeSuffix(data.width) : '';
      css.height = data.height ? $_6xec71n8jdud7c2o.addSizeSuffix(data.height) : '';
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
      defaults: { onchange: $_e8r7mrjsjdud7bkx.curry(updateStyleField, editor) },
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
              onselect: $_e8r7mrjsjdud7bkx.curry(updateStyleField, editor),
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
  var $_9rcqunnijdud7c43 = {
    createStyleForm: createStyleForm,
    buildListItems: buildListItems,
    updateStyleField: updateStyleField,
    extractAdvancedStyles: extractAdvancedStyles
  };

  var updateStyles = function (elm, cssText) {
    elm.style.cssText += ';' + cssText;
  };
  var extractDataFromElement = function (editor, elm) {
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
    if (hasAdvancedCellTab(editor)) {
      Tools.extend(data, $_9rcqunnijdud7c43.extractAdvancedStyles(dom, elm));
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
    $_9rcqunnijdud7c43.updateStyleField(editor, evt);
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
        setStyle(cellElm, 'width', $_6xec71n8jdud7c2o.addSizeSuffix(data.width));
        setStyle(cellElm, 'height', $_6xec71n8jdud7c2o.addSizeSuffix(data.height));
        if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
          cellElm = dom.rename(cellElm, data.type);
        }
        if (cells.length === 1) {
          $_2bgm09nhjdud7c40.unApplyAlign(editor, cellElm);
          $_2bgm09nhjdud7c40.unApplyVAlign(editor, cellElm);
        }
        if (data.align) {
          $_2bgm09nhjdud7c40.applyAlign(editor, cellElm, data.align);
        }
        if (data.valign) {
          $_2bgm09nhjdud7c40.applyVAlign(editor, cellElm, data.valign);
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
        values: $_9rcqunnijdud7c43.buildListItems(getCellClassList(editor), function (item) {
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
              onchange: $_e8r7mrjsjdud7bkx.curry($_9rcqunnijdud7c43.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_e8r7mrjsjdud7bkx.curry($_9rcqunnijdud7c43.updateStyleField, editor)
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
          $_9rcqunnijdud7c43.createStyleForm(editor)
        ],
        onsubmit: $_e8r7mrjsjdud7bkx.curry(onSubmitCellForm, editor, cells)
      });
    } else {
      editor.windowManager.open({
        title: 'Cell properties',
        data: data,
        body: generalCellForm,
        onsubmit: $_e8r7mrjsjdud7bkx.curry(onSubmitCellForm, editor, cells)
      });
    }
  };
  var $_fk6mv2ngjdud7c3u = { open: open };

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
    if (hasAdvancedRowTab(editor)) {
      Tools.extend(data, $_9rcqunnijdud7c43.extractAdvancedStyles(dom, elm));
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
    $_9rcqunnijdud7c43.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      Tools.each(rows, function (rowElm) {
        setAttrib(rowElm, 'scope', data.scope);
        setAttrib(rowElm, 'style', data.style);
        setAttrib(rowElm, 'class', data.class);
        setStyle(rowElm, 'height', $_6xec71n8jdud7c2o.addSizeSuffix(data.height));
        if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
          switchRowType(editor.dom, rowElm, data.type);
        }
        if (rows.length === 1) {
          $_2bgm09nhjdud7c40.unApplyAlign(editor, rowElm);
        }
        if (data.align) {
          $_2bgm09nhjdud7c40.applyAlign(editor, rowElm, data.align);
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
    if (getRowClassList(editor).length > 0) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_9rcqunnijdud7c43.buildListItems(getRowClassList(editor), function (item) {
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
          $_9rcqunnijdud7c43.createStyleForm(editor)
        ],
        onsubmit: $_e8r7mrjsjdud7bkx.curry(onSubmitRowForm, editor, rows)
      });
    } else {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        body: generalRowForm,
        onsubmit: $_e8r7mrjsjdud7bkx.curry(onSubmitRowForm, editor, rows)
      });
    }
  };
  var $_8pnpw3njjdud7c47 = { open: open$1 };

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var DefaultRenderOptions = {
    styles: {
      'border-collapse': 'collapse',
      width: '100%'
    },
    attributes: { border: '1' },
    percentages: true
  };
  var makeTable = function () {
    return $_2q3j53k5jdud7bmr.fromTag('table');
  };
  var tableBody = function () {
    return $_2q3j53k5jdud7bmr.fromTag('tbody');
  };
  var tableRow = function () {
    return $_2q3j53k5jdud7bmr.fromTag('tr');
  };
  var tableHeaderCell = function () {
    return $_2q3j53k5jdud7bmr.fromTag('th');
  };
  var tableCell = function () {
    return $_2q3j53k5jdud7bmr.fromTag('td');
  };
  var render$1 = function (rows, columns, rowHeaders, columnHeaders, renderOpts) {
    if (renderOpts === void 0) {
      renderOpts = DefaultRenderOptions;
    }
    var table = makeTable();
    $_b5rw3dkzjdud7bpm.setAll(table, renderOpts.styles);
    $_1ei337kqjdud7bom.setAll(table, renderOpts.attributes);
    var tbody = tableBody();
    $_b9f8rkl1jdud7bq5.append(table, tbody);
    var trs = [];
    for (var i = 0; i < rows; i++) {
      var tr = tableRow();
      for (var j = 0; j < columns; j++) {
        var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
        if (j < columnHeaders) {
          $_1ei337kqjdud7bom.set(td, 'scope', 'row');
        }
        if (i < rowHeaders) {
          $_1ei337kqjdud7bom.set(td, 'scope', 'col');
        }
        $_b9f8rkl1jdud7bq5.append(td, $_2q3j53k5jdud7bmr.fromTag('br'));
        if (renderOpts.percentages) {
          $_b5rw3dkzjdud7bpm.set(td, 'width', 100 / columns + '%');
        }
        $_b9f8rkl1jdud7bq5.append(tr, td);
      }
      trs.push(tr);
    }
    $_3zxknwl3jdud7bq9.append(tbody, trs);
    return table;
  };

  var get$7 = function (element) {
    return element.dom().innerHTML;
  };
  var set$5 = function (element, content) {
    var owner = $_9s8a4jk7jdud7bmw.owner(element);
    var docDom = owner.dom();
    var fragment = $_2q3j53k5jdud7bmr.fromDom(docDom.createDocumentFragment());
    var contentElements = $_buahlulajdud7br5.fromHtml(content, docDom);
    $_3zxknwl3jdud7bq9.append(fragment, contentElements);
    $_g2ty44l2jdud7bq6.empty(element);
    $_b9f8rkl1jdud7bq5.append(element, fragment);
  };
  var getOuter$2 = function (element) {
    var container = $_2q3j53k5jdud7bmr.fromTag('div');
    var clone = $_2q3j53k5jdud7bmr.fromDom(element.dom().cloneNode(true));
    $_b9f8rkl1jdud7bq5.append(container, clone);
    return get$7(container);
  };
  var $_9rjvonnpjdud7c52 = {
    get: get$7,
    set: set$5,
    getOuter: getOuter$2
  };

  var placeCaretInCell = function (editor, cell) {
    editor.selection.select(cell.dom(), true);
    editor.selection.collapse(true);
  };
  var selectFirstCellInTable = function (editor, tableElm) {
    $_a3r4h1kvjdud7bp3.descendant(tableElm, 'td,th').each($_e8r7mrjsjdud7bkx.curry(placeCaretInCell, editor));
  };
  var fireEvents = function (editor, table) {
    $_2b6dlmjqjdud7bko.each($_b4a6sqksjdud7bov.descendants(table, 'tr'), function (row) {
      fireNewRow(editor, row.dom());
      $_2b6dlmjqjdud7bko.each($_b4a6sqksjdud7bov.descendants(row, 'th,td'), function (cell) {
        fireNewCell(editor, cell.dom());
      });
    });
  };
  var isPercentage = function (width) {
    return $_duf7n8jzjdud7blu.isString(width) && width.indexOf('%') !== -1;
  };
  var insert$1 = function (editor, columns, rows) {
    var defaultStyles = getDefaultStyles(editor);
    var options = {
      styles: defaultStyles,
      attributes: getDefaultAttributes(editor),
      percentages: isPercentage(defaultStyles.width) && !isPixelsForced(editor)
    };
    var table = render$1(rows, columns, 0, 0, options);
    $_1ei337kqjdud7bom.set(table, 'data-mce-id', '__mce');
    var html = $_9rjvonnpjdud7c52.getOuter(table);
    editor.insertContent(html);
    return $_a3r4h1kvjdud7bp3.descendant($_6xec71n8jdud7c2o.getBody(editor), 'table[data-mce-id="__mce"]').map(function (table) {
      if (isPixelsForced(editor)) {
        $_b5rw3dkzjdud7bpm.set(table, 'width', $_b5rw3dkzjdud7bpm.get(table, 'width'));
      }
      $_1ei337kqjdud7bom.remove(table, 'data-mce-id');
      fireEvents(editor, table);
      selectFirstCellInTable(editor, table);
      return table.dom();
    }).getOr(null);
  };
  var $_n4pzbnmjdud7c4k = { insert: insert$1 };

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
      cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') || $_2bgm09nhjdud7c40.getTDTHOverallStyle(editor.dom, tableElm, 'padding'),
      border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') || $_2bgm09nhjdud7c40.getTDTHOverallStyle(editor.dom, tableElm, 'border'),
      borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
      caption: !!dom.select('caption', tableElm)[0],
      class: dom.getAttrib(tableElm, 'class')
    };
    Tools.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(tableElm, 'align' + name)) {
        data.align = name;
      }
    });
    if (hasAdvancedTableTab(editor)) {
      Tools.extend(data, $_9rcqunnijdud7c43.extractAdvancedStyles(dom, tableElm));
    }
    return data;
  };
  var applyDataToElement = function (editor, tableElm, data) {
    var dom = editor.dom;
    var attrs = {};
    var styles = {};
    attrs.class = data.class;
    styles.height = $_6xec71n8jdud7c2o.addSizeSuffix(data.height);
    if (dom.getAttrib(tableElm, 'width') && !shouldStyleWithCss(editor)) {
      attrs.width = $_6xec71n8jdud7c2o.removePxSuffix(data.width);
    } else {
      styles.width = $_6xec71n8jdud7c2o.addSizeSuffix(data.width);
    }
    if (shouldStyleWithCss(editor)) {
      styles['border-width'] = $_6xec71n8jdud7c2o.addSizeSuffix(data.border);
      styles['border-spacing'] = $_6xec71n8jdud7c2o.addSizeSuffix(data.cellspacing);
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
    if (shouldStyleWithCss(editor)) {
      if (tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': $_6xec71n8jdud7c2o.addSizeSuffix(data.border),
            'border-color': data.borderColor,
            'padding': $_6xec71n8jdud7c2o.addSizeSuffix(data.cellpadding)
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
    $_9rcqunnijdud7c43.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    if (data.class === false) {
      delete data.class;
    }
    editor.undoManager.transact(function () {
      if (!tableElm) {
        tableElm = $_n4pzbnmjdud7c4k.insert(editor, data.cols || 1, data.rows || 1);
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
      $_2bgm09nhjdud7c40.unApplyAlign(editor, tableElm);
      if (data.align) {
        $_2bgm09nhjdud7c40.applyAlign(editor, tableElm, data.align);
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
        values: $_9rcqunnijdud7c43.buildListItems(getTableClassList(editor), function (item) {
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
              onchange: $_e8r7mrjsjdud7bkx.curry($_9rcqunnijdud7c43.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_e8r7mrjsjdud7bkx.curry($_9rcqunnijdud7c43.updateStyleField, editor)
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
              onchange: $_e8r7mrjsjdud7bkx.curry($_9rcqunnijdud7c43.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_e8r7mrjsjdud7bkx.curry($_9rcqunnijdud7c43.updateStyleField, editor)
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
          $_9rcqunnijdud7c43.createStyleForm(editor)
        ],
        onsubmit: $_e8r7mrjsjdud7bkx.curry(onSubmitTableForm, editor, tableElm)
      });
    } else {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        body: generalTableForm,
        onsubmit: $_e8r7mrjsjdud7bkx.curry(onSubmitTableForm, editor, tableElm)
      });
    }
  };
  var $_bqump4nkjdud7c4d = { open: open$2 };

  var each$3 = Tools.each;
  var registerCommands = function (editor, actions, cellSelection, selections, clipboardRows) {
    var isRoot = $_6xec71n8jdud7c2o.getIsRoot(editor);
    var eraseTable = function () {
      var cell = $_2q3j53k5jdud7bmr.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
      var table = $_e5b08wk2jdud7bm5.table(cell, isRoot);
      table.filter($_e8r7mrjsjdud7bkx.not(isRoot)).each(function (table) {
        var cursor = $_2q3j53k5jdud7bmr.fromText('');
        $_b9f8rkl1jdud7bq5.after(table, cursor);
        $_g2ty44l2jdud7bq6.remove(table);
        var rng = editor.dom.createRng();
        rng.setStart(cursor.dom(), 0);
        rng.setEnd(cursor.dom(), 0);
        editor.selection.setRng(rng);
      });
    };
    var getSelectionStartCell = function () {
      return $_2q3j53k5jdud7bmr.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
    };
    var getTableFromCell = function (cell) {
      return $_e5b08wk2jdud7bm5.table(cell, isRoot);
    };
    var actOnSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      table.each(function (table) {
        var targets = $_50voclbjdud7br8.forMenu(selections, table, cell);
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
        var doc = $_2q3j53k5jdud7bmr.fromDom(editor.getDoc());
        var targets = $_50voclbjdud7br8.forMenu(selections, table, cell);
        var generators = $_c3joicl4jdud7bqc.cellOperations($_e8r7mrjsjdud7bkx.noop, doc, Option.none());
        return $_541tawnejdud7c3h.copyRows(table, targets, generators);
      });
    };
    var pasteOnSelection = function (execute) {
      clipboardRows.get().each(function (rows) {
        var clonedRows = $_2b6dlmjqjdud7bko.map(rows, function (row) {
          return $_dxykb7l5jdud7bqr.deep(row);
        });
        var cell = getSelectionStartCell();
        var table = getTableFromCell(cell);
        table.bind(function (table) {
          var doc = $_2q3j53k5jdud7bmr.fromDom(editor.getDoc());
          var generators = $_c3joicl4jdud7bqc.paste(doc);
          var targets = $_50voclbjdud7br8.pasteRows(selections, table, cell, clonedRows, generators);
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
      mceInsertTable: $_e8r7mrjsjdud7bkx.curry($_bqump4nkjdud7c4d.open, editor),
      mceTableProps: $_e8r7mrjsjdud7bkx.curry($_bqump4nkjdud7c4d.open, editor, true),
      mceTableRowProps: $_e8r7mrjsjdud7bkx.curry($_8pnpw3njjdud7c47.open, editor),
      mceTableCellProps: $_e8r7mrjsjdud7bkx.curry($_fk6mv2ngjdud7c3u.open, editor)
    }, function (func, name) {
      editor.addCommand(name, function (ui, val) {
        func(val);
      });
    });
  };
  var $_3ladizndjdud7c36 = { registerCommands: registerCommands };

  var only$1 = function (element) {
    var parent = Option.from(element.dom().documentElement).map($_2q3j53k5jdud7bmr.fromDom).getOr(element);
    return {
      parent: $_e8r7mrjsjdud7bkx.constant(parent),
      view: $_e8r7mrjsjdud7bkx.constant(element),
      origin: $_e8r7mrjsjdud7bkx.constant(r(0, 0))
    };
  };
  var detached = function (editable, chrome) {
    var origin = $_e8r7mrjsjdud7bkx.curry($_1b83qkm3jdud7bwd.absolute, chrome);
    return {
      parent: $_e8r7mrjsjdud7bkx.constant(chrome),
      view: $_e8r7mrjsjdud7bkx.constant(editable),
      origin: origin
    };
  };
  var body$1 = function (editable, chrome) {
    return {
      parent: $_e8r7mrjsjdud7bkx.constant(chrome),
      view: $_e8r7mrjsjdud7bkx.constant(editable),
      origin: $_e8r7mrjsjdud7bkx.constant(r(0, 0))
    };
  };
  var $_1xghylnrjdud7c5f = {
    only: only$1,
    detached: detached,
    body: body$1
  };

  function Event (fields) {
    var struct = $_4vwz6tjvjdud7blm.immutable.apply(null, fields);
    var handlers = [];
    var bind = function (handler) {
      if (handler === undefined) {
        throw 'Event bind error: undefined handler';
      }
      handlers.push(handler);
    };
    var unbind = function (handler) {
      handlers = $_2b6dlmjqjdud7bko.filter(handlers, function (h) {
        return h !== handler;
      });
    };
    var trigger = function () {
      var event = struct.apply(null, arguments);
      $_2b6dlmjqjdud7bko.each(handlers, function (handler) {
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
    var registry = $_fzfxsxjujdud7ble.map(typeDefs, function (event) {
      return {
        bind: event.bind,
        unbind: event.unbind
      };
    });
    var trigger = $_fzfxsxjujdud7ble.map(typeDefs, function (event) {
      return event.trigger;
    });
    return {
      registry: registry,
      trigger: trigger
    };
  };
  var $_9esbnqnujdud7c61 = { create: create };

  var mode = $_3vhhbcmajdud7bxe.exactly([
    'compare',
    'extract',
    'mutate',
    'sink'
  ]);
  var sink = $_3vhhbcmajdud7bxe.exactly([
    'element',
    'start',
    'stop',
    'destroy'
  ]);
  var api$3 = $_3vhhbcmajdud7bxe.exactly([
    'forceDrop',
    'drop',
    'move',
    'delayDrop'
  ]);
  var $_duurdpnyjdud7c6v = {
    mode: mode,
    sink: sink,
    api: api$3
  };

  var styles$1 = $_btd1tomqjdud7c0h.css('ephox-dragster');
  var $_aekl05o0jdud7c76 = { resolve: styles$1.resolve };

  function Blocker (options) {
    var settings = $_9egglgmfjdud7byk.merge({ 'layerClass': $_aekl05o0jdud7c76.resolve('blocker') }, options);
    var div = $_2q3j53k5jdud7bmr.fromTag('div');
    $_1ei337kqjdud7bom.set(div, 'role', 'presentation');
    $_b5rw3dkzjdud7bpm.setAll(div, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%'
    });
    $_119fsomrjdud7c0i.add(div, $_aekl05o0jdud7c76.resolve('blocker'));
    $_119fsomrjdud7c0i.add(div, settings.layerClass);
    var element = function () {
      return div;
    };
    var destroy = function () {
      $_g2ty44l2jdud7bq6.remove(div);
    };
    return {
      element: element,
      destroy: destroy
    };
  }

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_e8r7mrjsjdud7bkx.constant(target),
      'x': $_e8r7mrjsjdud7bkx.constant(x),
      'y': $_e8r7mrjsjdud7bkx.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_e8r7mrjsjdud7bkx.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_2q3j53k5jdud7bmr.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_e8r7mrjsjdud7bkx.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_e8r7mrjsjdud7bkx.curry(unbind, element, event, wrapped, useCapture) };
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
  var $_6faycto2jdud7c7b = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_e8r7mrjsjdud7bkx.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_6faycto2jdud7c7b.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_6faycto2jdud7c7b.capture(element, event, filter$1, handler);
  };
  var $_a29ngvo1jdud7c78 = {
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
    var mdown = $_a29ngvo1jdud7c78.bind(blocker.element(), 'mousedown', dragApi.forceDrop);
    var mup = $_a29ngvo1jdud7c78.bind(blocker.element(), 'mouseup', dragApi.drop);
    var mmove = $_a29ngvo1jdud7c78.bind(blocker.element(), 'mousemove', dragApi.move);
    var mout = $_a29ngvo1jdud7c78.bind(blocker.element(), 'mouseout', dragApi.delayDrop);
    var destroy = function () {
      blocker.destroy();
      mup.unbind();
      mmove.unbind();
      mout.unbind();
      mdown.unbind();
    };
    var start = function (parent) {
      $_b9f8rkl1jdud7bq5.append(parent, blocker.element());
    };
    var stop = function () {
      $_g2ty44l2jdud7bq6.remove(blocker.element());
    };
    return $_duurdpnyjdud7c6v.sink({
      element: blocker.element,
      start: start,
      stop: stop,
      destroy: destroy
    });
  };
  var MouseDrag = $_duurdpnyjdud7c6v.mode({
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
    var events = $_9esbnqnujdud7c61.create({ move: Event(['info']) });
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
      reset: $_e8r7mrjsjdud7bkx.noop
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
  var $_7zuks8o7jdud7c80 = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var setup = function (mutation, mode, settings) {
    var active = false;
    var events = $_9esbnqnujdud7c61.create({
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
    var throttledDrop = $_7zuks8o7jdud7c80.last(drop, 200);
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
    var sink = mode.sink($_duurdpnyjdud7c6v.api({
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
  var $_gboaj8o3jdud7c7k = { setup: setup };

  var transform$1 = function (mutation, options) {
    var settings = options !== undefined ? options : {};
    var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
    return $_gboaj8o3jdud7c7k.setup(mutation, mode, options);
  };
  var $_e0covinwjdud7c6m = { transform: transform$1 };

  function Mutation () {
    var events = $_9esbnqnujdud7c61.create({
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
    var events = $_9esbnqnujdud7c61.create({
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
    return $_a3r4h1kvjdud7bp3.first(selector).isSome();
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_a3r4h1kvjdud7bp3.ancestor(scope, selector, isRoot).isSome();
  };
  var sibling$2 = function (scope, selector) {
    return $_a3r4h1kvjdud7bp3.sibling(scope, selector).isSome();
  };
  var child$3 = function (scope, selector) {
    return $_a3r4h1kvjdud7bp3.child(scope, selector).isSome();
  };
  var descendant$2 = function (scope, selector) {
    return $_a3r4h1kvjdud7bp3.descendant(scope, selector).isSome();
  };
  var closest$2 = function (scope, selector, isRoot) {
    return $_a3r4h1kvjdud7bp3.closest(scope, selector, isRoot).isSome();
  };
  var $_f3156moajdud7c8i = {
    any: any,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var resizeBarDragging = $_1t7l1pmpjdud7c0f.resolve('resizer-bar-dragging');
  function BarManager (wire, direction, hdirection) {
    var mutation = BarMutation();
    var resizing = $_e0covinwjdud7c6m.transform(mutation, {});
    var hoverTable = Option.none();
    var getResizer = function (element, type) {
      return Option.from($_1ei337kqjdud7bom.get(element, type));
    };
    mutation.events.drag.bind(function (event) {
      getResizer(event.target(), 'data-row').each(function (_dataRow) {
        var currentRow = $_g0vp2on5jdud7c27.getInt(event.target(), 'top');
        $_b5rw3dkzjdud7bpm.set(event.target(), 'top', currentRow + event.yDelta() + 'px');
      });
      getResizer(event.target(), 'data-column').each(function (_dataCol) {
        var currentCol = $_g0vp2on5jdud7c27.getInt(event.target(), 'left');
        $_b5rw3dkzjdud7bpm.set(event.target(), 'left', currentCol + event.xDelta() + 'px');
      });
    });
    var getDelta = function (target, direction) {
      var newX = $_g0vp2on5jdud7c27.getInt(target, direction);
      var oldX = parseInt($_1ei337kqjdud7bom.get(target, 'data-initial-' + direction), 10);
      return newX - oldX;
    };
    resizing.events.stop.bind(function () {
      mutation.get().each(function (target) {
        hoverTable.each(function (table) {
          getResizer(target, 'data-row').each(function (row) {
            var delta = getDelta(target, 'top');
            $_1ei337kqjdud7bom.remove(target, 'data-initial-top');
            events.trigger.adjustHeight(table, delta, parseInt(row, 10));
          });
          getResizer(target, 'data-column').each(function (column) {
            var delta = getDelta(target, 'left');
            $_1ei337kqjdud7bom.remove(target, 'data-initial-left');
            events.trigger.adjustWidth(table, delta, parseInt(column, 10));
          });
          $_7xp62hmljdud7bzg.refresh(wire, table, hdirection, direction);
        });
      });
    });
    var handler = function (target, direction) {
      events.trigger.startAdjust();
      mutation.assign(target);
      $_1ei337kqjdud7bom.set(target, 'data-initial-' + direction, parseInt($_b5rw3dkzjdud7bpm.get(target, direction), 10));
      $_119fsomrjdud7c0i.add(target, resizeBarDragging);
      $_b5rw3dkzjdud7bpm.set(target, 'opacity', '0.2');
      resizing.go(wire.parent());
    };
    var mousedown = $_a29ngvo1jdud7c78.bind(wire.parent(), 'mousedown', function (event) {
      if ($_7xp62hmljdud7bzg.isRowBar(event.target()))
        handler(event.target(), 'top');
      if ($_7xp62hmljdud7bzg.isColBar(event.target()))
        handler(event.target(), 'left');
    });
    var isRoot = function (e) {
      return $_6nkapzk9jdud7bn7.eq(e, wire.view());
    };
    var mouseover = $_a29ngvo1jdud7c78.bind(wire.view(), 'mouseover', function (event) {
      if ($_1102zvkrjdud7bou.name(event.target()) === 'table' || $_f3156moajdud7c8i.ancestor(event.target(), 'table', isRoot)) {
        hoverTable = $_1102zvkrjdud7bou.name(event.target()) === 'table' ? Option.some(event.target()) : $_a3r4h1kvjdud7bp3.ancestor(event.target(), 'table', isRoot);
        hoverTable.each(function (ht) {
          $_7xp62hmljdud7bzg.refresh(wire, ht, hdirection, direction);
        });
      } else if ($_4q6kiskujdud7bp0.inBody(event.target())) {
        $_7xp62hmljdud7bzg.destroy(wire);
      }
    });
    var destroy = function () {
      mousedown.unbind();
      mouseover.unbind();
      resizing.destroy();
      $_7xp62hmljdud7bzg.destroy(wire);
    };
    var refresh = function (tbl) {
      $_7xp62hmljdud7bzg.refresh(wire, tbl, hdirection, direction);
    };
    var events = $_9esbnqnujdud7c61.create({
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
      hideBars: $_e8r7mrjsjdud7bkx.curry($_7xp62hmljdud7bzg.hide, wire),
      showBars: $_e8r7mrjsjdud7bkx.curry($_7xp62hmljdud7bzg.show, wire),
      events: events.registry
    };
  }

  function TableResize (wire, vdirection) {
    var hdirection = $_2qb4vhm2jdud7bw4.height;
    var manager = BarManager(wire, vdirection, hdirection);
    var events = $_9esbnqnujdud7c61.create({
      beforeResize: Event(['table']),
      afterResize: Event(['table']),
      startDrag: Event([])
    });
    manager.events.adjustHeight.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = hdirection.delta(event.delta(), event.table());
      $_3b8umn1jdud7c1k.adjustHeight(event.table(), delta, event.row(), hdirection);
      events.trigger.afterResize(event.table());
    });
    manager.events.startAdjust.bind(function (event) {
      events.trigger.startDrag();
    });
    manager.events.adjustWidth.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = vdirection.delta(event.delta(), event.table());
      $_3b8umn1jdud7c1k.adjustWidth(event.table(), delta, event.column(), vdirection);
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
    var container = $_2q3j53k5jdud7bmr.fromTag('div');
    $_b5rw3dkzjdud7bpm.setAll(container, {
      position: 'static',
      height: '0',
      width: '0',
      padding: '0',
      margin: '0',
      border: '0'
    });
    $_b9f8rkl1jdud7bq5.append($_4q6kiskujdud7bp0.body(), container);
    return container;
  };
  var get$8 = function (editor, container) {
    return editor.inline ? $_1xghylnrjdud7c5f.body($_6xec71n8jdud7c2o.getBody(editor), createContainer()) : $_1xghylnrjdud7c5f.only($_2q3j53k5jdud7bmr.fromDom(editor.getDoc()));
  };
  var remove$6 = function (editor, wire) {
    if (editor.inline) {
      $_g2ty44l2jdud7bq6.remove(wire.parent());
    }
  };
  var $_794sbxobjdud7c8k = {
    get: get$8,
    remove: remove$6
  };

  function ResizeHandler (editor) {
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
      return wire.getOr($_1xghylnrjdud7c5f.only($_2q3j53k5jdud7bmr.fromDom(editor.getBody())));
    };
    var destroy = function () {
      resize.each(function (sz) {
        sz.destroy();
      });
      wire.each(function (w) {
        $_794sbxobjdud7c8k.remove(editor, w);
      });
    };
    editor.on('init', function () {
      var direction = TableDirection($_eqsr8dn9jdud7c2r.directionAt);
      var rawWire = $_794sbxobjdud7c8k.get(editor);
      wire = Option.some(rawWire);
      if (hasObjectResizing(editor) && hasTableResizeBars(editor)) {
        var sz = TableResize(rawWire, direction);
        sz.on();
        sz.events.startDrag.bind(function (event) {
          selectionRng = Option.some(editor.selection.getRng());
        });
        sz.events.afterResize.bind(function (event) {
          var table = event.table();
          var dataStyleCells = $_b4a6sqksjdud7bov.descendants(table, 'td[data-mce-style],th[data-mce-style]');
          $_2b6dlmjqjdud7bko.each(dataStyleCells, function (cell) {
            $_1ei337kqjdud7bom.remove(cell, 'data-mce-style');
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
  var $_e2lqweoejdud7c99 = {
    none: none$2,
    first: first$5,
    middle: middle$1,
    last: last$4
  };

  var detect$4 = function (current, isRoot) {
    return $_e5b08wk2jdud7bm5.table(current, isRoot).bind(function (table) {
      var all = $_e5b08wk2jdud7bm5.cells(table);
      var index = $_2b6dlmjqjdud7bko.findIndex(all, function (x) {
        return $_6nkapzk9jdud7bn7.eq(current, x);
      });
      return index.map(function (ind) {
        return {
          index: $_e8r7mrjsjdud7bkx.constant(ind),
          all: $_e8r7mrjsjdud7bkx.constant(all)
        };
      });
    });
  };
  var next = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_e2lqweoejdud7c99.none(current);
    }, function (info) {
      return info.index() + 1 < info.all().length ? $_e2lqweoejdud7c99.middle(current, info.all()[info.index() + 1]) : $_e2lqweoejdud7c99.last(current);
    });
  };
  var prev = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_e2lqweoejdud7c99.none();
    }, function (info) {
      return info.index() - 1 >= 0 ? $_e2lqweoejdud7c99.middle(current, info.all()[info.index() - 1]) : $_e2lqweoejdud7c99.first(current);
    });
  };
  var $_b41ec1odjdud7c94 = {
    next: next,
    prev: prev
  };

  var adt = $_d9zbmklsjdud7buk.generate([
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
    return situ.fold($_e8r7mrjsjdud7bkx.identity, $_e8r7mrjsjdud7bkx.identity, $_e8r7mrjsjdud7bkx.identity);
  };
  var $_588zi3ogjdud7c9h = {
    before: adt.before,
    on: adt.on,
    after: adt.after,
    cata: cata$1,
    getStart: getStart
  };

  var type$2 = $_d9zbmklsjdud7buk.generate([
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
  var range$2 = $_4vwz6tjvjdud7blm.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$2.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_2q3j53k5jdud7bmr.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_588zi3ogjdud7c9h.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_9s8a4jk7jdud7bmw.defaultView(start);
  };
  var $_2twlhjofjdud7c9d = {
    domRange: type$2.domRange,
    relative: type$2.relative,
    exact: type$2.exact,
    exactFromRange: exactFromRange,
    range: range$2,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_9s8a4jk7jdud7bmw.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_2q3j53k5jdud7bmr.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_6nkapzk9jdud7bn7.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_7gdjefoijdud7c9w = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_2b6dlmjqjdud7bko.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_2q3j53k5jdud7bmr.fromDom(fragment);
  };
  var $_2jpet2ojjdud7c9x = { fromElements: fromElements };

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
    return $_2q3j53k5jdud7bmr.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_e8r7mrjsjdud7bkx.constant(rect.left),
      top: $_e8r7mrjsjdud7bkx.constant(rect.top),
      right: $_e8r7mrjsjdud7bkx.constant(rect.right),
      bottom: $_e8r7mrjsjdud7bkx.constant(rect.bottom),
      width: $_e8r7mrjsjdud7bkx.constant(rect.width),
      height: $_e8r7mrjsjdud7bkx.constant(rect.height)
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
  var $_ff2xi9okjdud7ca0 = {
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

  var adt$1 = $_d9zbmklsjdud7buk.generate([
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
    return type($_2q3j53k5jdud7bmr.fromDom(range.startContainer), range.startOffset, $_2q3j53k5jdud7bmr.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_e8r7mrjsjdud7bkx.constant(rng),
          rtl: Option.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_fkkxj4kfjdud7bns.cached(function () {
            return $_ff2xi9okjdud7ca0.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_fkkxj4kfjdud7bns.cached(function () {
            return Option.some($_ff2xi9okjdud7ca0.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_fkkxj4kfjdud7bns.cached(function () {
            return $_ff2xi9okjdud7ca0.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_fkkxj4kfjdud7bns.cached(function () {
            return Option.some($_ff2xi9okjdud7ca0.exactToNative(win, finish, foffset, start, soffset));
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
        return adt$1.rtl($_2q3j53k5jdud7bmr.fromDom(rev.endContainer), rev.endOffset, $_2q3j53k5jdud7bmr.fromDom(rev.startContainer), rev.startOffset);
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
  var $_ddvh1soljdud7ca6 = {
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
  var $_bhjjyaoojdud7cal = {
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
    var length = $_cvxenhl8jdud7bqz.get(textnode).length;
    var offset = $_bhjjyaoojdud7cal.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_a6p6d7mgjdud7bym.findMap(rects, function (rect) {
      return $_bhjjyaoojdud7cal.inRect(rect, x, y) ? Option.some(rect) : Option.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_5jwrp1opjdud7cam = { locate: locate };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_9s8a4jk7jdud7bmw.children(node);
    return $_a6p6d7mgjdud7bym.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_bhjjyaoojdud7cal.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_1102zvkrjdud7bou.isText(node) ? $_5jwrp1opjdud7cam.locate : searchInChildren;
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
  var $_f0nqoconjdud7cag = { locate: locate$1 };

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
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_b7vkeyl6jdud7bqu.first : $_b7vkeyl6jdud7bqu.last;
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
    var f = $_9s8a4jk7jdud7bmw.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_awnrkcoqjdud7caq = { search: search };

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
    return $_f0nqoconjdud7cag.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_2q3j53k5jdud7bmr.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_awnrkcoqjdud7caq.search(doc, elem, x);
      };
      return $_9s8a4jk7jdud7bmw.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_2q3j53k5jdud7bmr.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_2twlhjofjdud7c9d.range($_2q3j53k5jdud7bmr.fromDom(rng.startContainer), rng.startOffset, $_2q3j53k5jdud7bmr.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_cu0yncomjdud7cad = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_ff2xi9okjdud7ca0.create(win);
    var self = $_zvi87k4jdud7bmn.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_b4a6sqksjdud7bov.descendants(ancestor, selector));
    return $_2b6dlmjqjdud7bko.filter(elements, function (elem) {
      $_ff2xi9okjdud7ca0.selectNodeContentsUsing(innerRange, elem);
      return $_ff2xi9okjdud7ca0.isWithin(outerRange, innerRange);
    });
  };
  var find$3 = function (win, selection, selector) {
    var outerRange = $_ddvh1soljdud7ca6.asLtrRange(win, selection);
    var ancestor = $_2q3j53k5jdud7bmr.fromDom(outerRange.commonAncestorContainer);
    return $_1102zvkrjdud7bou.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_ggvgs8orjdud7cau = { find: find$3 };

  var beforeSpecial = function (element, offset) {
    var name = $_1102zvkrjdud7bou.name(element);
    if ('input' === name)
      return $_588zi3ogjdud7c9h.after(element);
    else if (!$_2b6dlmjqjdud7bko.contains([
        'br',
        'img'
      ], name))
      return $_588zi3ogjdud7c9h.on(element, offset);
    else
      return offset === 0 ? $_588zi3ogjdud7c9h.before(element) : $_588zi3ogjdud7c9h.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_588zi3ogjdud7c9h.before, beforeSpecial, $_588zi3ogjdud7c9h.after);
    var finish = finishSitu.fold($_588zi3ogjdud7c9h.before, beforeSpecial, $_588zi3ogjdud7c9h.after);
    return $_2twlhjofjdud7c9d.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_2twlhjofjdud7c9d.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_2q3j53k5jdud7bmr.fromDom(rng.startContainer);
        var finish = $_2q3j53k5jdud7bmr.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_dir9a6osjdud7cax = {
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
    var rng = $_ff2xi9okjdud7ca0.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_ggvgs8orjdud7cau.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_ddvh1soljdud7ca6.diagnose(win, relative).match({
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
    var relative = $_dir9a6osjdud7cax.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_dir9a6osjdud7cax.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_2twlhjofjdud7c9d.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_ff2xi9okjdud7ca0.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_dir9a6osjdud7cax.preprocess(selection);
    return $_ddvh1soljdud7ca6.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return Option.some($_2twlhjofjdud7c9d.range($_2q3j53k5jdud7bmr.fromDom(firstRng.startContainer), firstRng.startOffset, $_2q3j53k5jdud7bmr.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return Option.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_2q3j53k5jdud7bmr.fromDom(selection.anchorNode);
    var focusNode = $_2q3j53k5jdud7bmr.fromDom(selection.focusNode);
    return $_7gdjefoijdud7c9w.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? Option.some($_2twlhjofjdud7c9d.range($_2q3j53k5jdud7bmr.fromDom(selection.anchorNode), selection.anchorOffset, $_2q3j53k5jdud7bmr.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_ff2xi9okjdud7ca0.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_ff2xi9okjdud7ca0.selectNodeContents(win, element);
    return $_2twlhjofjdud7c9d.range($_2q3j53k5jdud7bmr.fromDom(rng.startContainer), rng.startOffset, $_2q3j53k5jdud7bmr.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : Option.none();
  };
  var get$9 = function (win) {
    return getExact(win).map(function (range) {
      return $_2twlhjofjdud7c9d.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_ddvh1soljdud7ca6.asLtrRange(win, selection);
    return $_ff2xi9okjdud7ca0.getFirstRect(rng);
  };
  var getBounds$2 = function (win, selection) {
    var rng = $_ddvh1soljdud7ca6.asLtrRange(win, selection);
    return $_ff2xi9okjdud7ca0.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_cu0yncomjdud7cad.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_ddvh1soljdud7ca6.asLtrRange(win, selection);
    return $_ff2xi9okjdud7ca0.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$2 = function (win, selection) {
    var rng = $_ddvh1soljdud7ca6.asLtrRange(win, selection);
    return $_ff2xi9okjdud7ca0.cloneFragment(rng);
  };
  var replace$1 = function (win, selection, elements) {
    var rng = $_ddvh1soljdud7ca6.asLtrRange(win, selection);
    var fragment = $_2jpet2ojjdud7c9x.fromElements(elements, win.document);
    $_ff2xi9okjdud7ca0.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_ddvh1soljdud7ca6.asLtrRange(win, selection);
    $_ff2xi9okjdud7ca0.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_6nkapzk9jdud7bn7.eq(start, finish) && soffset === foffset;
  };
  var $_4mbnt1ohjdud7c9m = {
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
    return go(editor, isRoot, $_b41ec1odjdud7c94.next(cell), lazyWire);
  };
  var backward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_b41ec1odjdud7c94.prev(cell), lazyWire);
  };
  var getCellFirstCursorPosition = function (editor, cell) {
    var selection = $_2twlhjofjdud7c9d.exact(cell, 0, cell, 0);
    return $_4mbnt1ohjdud7c9m.toNative(selection);
  };
  var getNewRowCursorPosition = function (editor, table) {
    var rows = $_b4a6sqksjdud7bov.descendants(table, 'tr');
    return $_2b6dlmjqjdud7bko.last(rows).bind(function (last) {
      return $_a3r4h1kvjdud7bp3.descendant(last, 'td,th').map(function (first) {
        return getCellFirstCursorPosition(editor, first);
      });
    });
  };
  var go = function (editor, isRoot, cell, actions, lazyWire) {
    return cell.fold(Option.none, Option.none, function (current, next) {
      return $_b7vkeyl6jdud7bqu.first(next).map(function (cell) {
        return getCellFirstCursorPosition(editor, cell);
      });
    }, function (current) {
      return $_e5b08wk2jdud7bm5.table(current, isRoot).bind(function (table) {
        var targets = $_50voclbjdud7br8.noMenu(current);
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
      var body_1 = $_6xec71n8jdud7c2o.getBody(editor);
      var isRoot_1 = function (element) {
        var name = $_1102zvkrjdud7bou.name(element);
        return $_6nkapzk9jdud7bn7.eq(element, body_1) || $_2b6dlmjqjdud7bko.contains(rootElements, name);
      };
      var rng = editor.selection.getRng();
      if (rng.collapsed) {
        var start = $_2q3j53k5jdud7bmr.fromDom(rng.startContainer);
        $_e5b08wk2jdud7bm5.cell(start, isRoot_1).each(function (cell) {
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
  var $_fmb5mnocjdud7c8r = { handle: handle$1 };

  var response = $_4vwz6tjvjdud7blm.immutable('selection', 'kill');
  var $_cvcdnbowjdud7cbw = { response: response };

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
  var $_71t80poxjdud7cby = {
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
    var rng = $_ddvh1soljdud7ca6.asLtrRange(win, selection);
    return {
      start: $_e8r7mrjsjdud7bkx.constant($_2q3j53k5jdud7bmr.fromDom(rng.startContainer)),
      soffset: $_e8r7mrjsjdud7bkx.constant(rng.startOffset),
      finish: $_e8r7mrjsjdud7bkx.constant($_2q3j53k5jdud7bmr.fromDom(rng.endContainer)),
      foffset: $_e8r7mrjsjdud7bkx.constant(rng.endOffset)
    };
  };
  var makeSitus = function (start, soffset, finish, foffset) {
    return {
      start: $_e8r7mrjsjdud7bkx.constant($_588zi3ogjdud7c9h.on(start, soffset)),
      finish: $_e8r7mrjsjdud7bkx.constant($_588zi3ogjdud7c9h.on(finish, foffset))
    };
  };
  var $_50qw0dozjdud7ccb = {
    convertToRange: convertToRange,
    makeSitus: makeSitus
  };

  var isSafari = $_e4jb8lkejdud7bnr.detect().browser.isSafari();
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
    var pos = $_1b83qkm3jdud7bwd.absolute(element);
    var doc = $_2q3j53k5jdud7bmr.fromDom(win.document);
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
    if (isSafari && $_duf7n8jzjdud7blu.isFunction(element.dom().scrollIntoViewIfNeeded)) {
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
    var scrollDiv = $_2q3j53k5jdud7bmr.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
    $_b9f8rkl1jdud7bq5.after($_4q6kiskujdud7bp0.body(), scrollDiv);
    var w = scrollDiv.dom().offsetWidth - scrollDiv.dom().clientWidth;
    $_g2ty44l2jdud7bq6.remove(scrollDiv);
    return w;
  };
  var $_aluts0p0jdud7cci = {
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
      return Option.from(win.document.elementFromPoint(x, y)).map($_2q3j53k5jdud7bmr.fromDom);
    };
    var getRect = function (element) {
      return element.dom().getBoundingClientRect();
    };
    var getRangedRect = function (start, soffset, finish, foffset) {
      var sel = $_2twlhjofjdud7c9d.exact(start, soffset, finish, foffset);
      return $_4mbnt1ohjdud7c9m.getFirstRect(win, sel).map(function (structRect) {
        return $_fzfxsxjujdud7ble.map(structRect, $_e8r7mrjsjdud7bkx.apply);
      });
    };
    var getSelection = function () {
      return $_4mbnt1ohjdud7c9m.get(win).map(function (exactAdt) {
        return $_50qw0dozjdud7ccb.convertToRange(win, exactAdt);
      });
    };
    var fromSitus = function (situs) {
      var relative = $_2twlhjofjdud7c9d.relative(situs.start(), situs.finish());
      return $_50qw0dozjdud7ccb.convertToRange(win, relative);
    };
    var situsFromPoint = function (x, y) {
      return $_4mbnt1ohjdud7c9m.getAtPoint(win, x, y).map(function (exact) {
        return {
          start: $_e8r7mrjsjdud7bkx.constant($_588zi3ogjdud7c9h.on(exact.start(), exact.soffset())),
          finish: $_e8r7mrjsjdud7bkx.constant($_588zi3ogjdud7c9h.on(exact.finish(), exact.foffset()))
        };
      });
    };
    var clearSelection = function () {
      $_4mbnt1ohjdud7c9m.clear(win);
    };
    var selectContents = function (element) {
      $_4mbnt1ohjdud7c9m.setToElement(win, element);
    };
    var setSelection = function (sel) {
      $_4mbnt1ohjdud7c9m.setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
    };
    var setRelativeSelection = function (start, finish) {
      $_4mbnt1ohjdud7c9m.setRelative(win, start, finish);
    };
    var getInnerHeight = function () {
      return win.innerHeight;
    };
    var getScrollY = function () {
      var pos = $_aluts0p0jdud7cci.get($_2q3j53k5jdud7bmr.fromDom(win.document));
      return pos.top();
    };
    var scrollBy = function (x, y) {
      $_aluts0p0jdud7cci.by(x, y, $_2q3j53k5jdud7bmr.fromDom(win.document));
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
    if (!($_6nkapzk9jdud7bn7.eq(start, finish) && soffset === foffset)) {
      return $_a3r4h1kvjdud7bp3.closest(start, 'td,th', isRoot).bind(function (s) {
        return $_a3r4h1kvjdud7bp3.closest(finish, 'td,th', isRoot).bind(function (f) {
          return detect$5(container, isRoot, s, f, selectRange);
        });
      });
    } else {
      return Option.none();
    }
  };
  var detect$5 = function (container, isRoot, start, finish, selectRange) {
    if (!$_6nkapzk9jdud7bn7.eq(start, finish)) {
      return $_btb09flejdud7brv.identify(start, finish, isRoot).bind(function (cellSel) {
        var boxes = cellSel.boxes().getOr([]);
        if (boxes.length > 0) {
          selectRange(container, boxes, cellSel.start(), cellSel.finish());
          return Option.some($_cvcdnbowjdud7cbw.response(Option.some($_50qw0dozjdud7ccb.makeSitus(start, 0, start, $_7y1bjwl7jdud7bqw.getEnd(start))), true));
        } else {
          return Option.none();
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
    return $_btb09flejdud7brv.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
  };
  var $_a5kpzap1jdud7ccp = {
    sync: sync,
    detect: detect$5,
    update: update
  };

  var nu$3 = $_4vwz6tjvjdud7blm.immutableBag([
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
  var $_c8vayvp4jdud7cdu = {
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
    if (offset >= 0 && offset < $_7y1bjwl7jdud7bqw.getEnd(element))
      return bridge.getRangedRect(element, offset, element, offset + 1);
    else if (offset > 0)
      return bridge.getRangedRect(element, offset - 1, element, offset);
    return Option.none();
  };
  var toCaret = function (rect) {
    return $_c8vayvp4jdud7cdu.nu({
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
    if ($_1102zvkrjdud7bou.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_1102zvkrjdud7bou.isText(element))
      return getPartialBox(bridge, element, offset).map(toCaret);
    else
      return Option.none();
  };
  var getEntireBox = function (bridge, element) {
    if ($_1102zvkrjdud7bou.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_1102zvkrjdud7bou.isText(element))
      return bridge.getRangedRect(element, 0, element, $_7y1bjwl7jdud7bqw.getEnd(element)).map(toCaret);
    else
      return Option.none();
  };
  var $_411ytop5jdud7cdx = {
    getBoxAt: getBoxAt,
    getEntireBox: getEntireBox
  };

  var traverse = $_4vwz6tjvjdud7blm.immutable('item', 'mode');
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
    var ruleOpt = $_2b6dlmjqjdud7bko.find(rules, function (succ) {
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
  var $_fy01gpajdud7ceo = {
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
  var $_eixmygpbjdud7cez = {
    left: left$1,
    right: right$1
  };

  var hone = function (universe, item, predicate, mode, direction, isRoot) {
    var next = $_fy01gpajdud7ceo.go(universe, item, mode, direction);
    return next.bind(function (n) {
      if (isRoot(n.item()))
        return Option.none();
      else
        return predicate(n.item()) ? Option.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
    });
  };
  var left$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_fy01gpajdud7ceo.sidestep, $_eixmygpbjdud7cez.left(), isRoot);
  };
  var right$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_fy01gpajdud7ceo.sidestep, $_eixmygpbjdud7cez.right(), isRoot);
  };
  var $_bhaux1p9jdud7cel = {
    left: left$2,
    right: right$2
  };

  var isLeaf = function (universe, element) {
    return universe.property().children(element).length === 0;
  };
  var before$2 = function (universe, item, isRoot) {
    return seekLeft(universe, item, $_e8r7mrjsjdud7bkx.curry(isLeaf, universe), isRoot);
  };
  var after$3 = function (universe, item, isRoot) {
    return seekRight(universe, item, $_e8r7mrjsjdud7bkx.curry(isLeaf, universe), isRoot);
  };
  var seekLeft = function (universe, item, predicate, isRoot) {
    return $_bhaux1p9jdud7cel.left(universe, item, predicate, isRoot);
  };
  var seekRight = function (universe, item, predicate, isRoot) {
    return $_bhaux1p9jdud7cel.right(universe, item, predicate, isRoot);
  };
  var walkers = function () {
    return {
      left: $_eixmygpbjdud7cez.left,
      right: $_eixmygpbjdud7cez.right
    };
  };
  var walk = function (universe, item, mode, direction, _rules) {
    return $_fy01gpajdud7ceo.go(universe, item, mode, direction, _rules);
  };
  var $_g9gzv7p8jdud7cej = {
    before: before$2,
    after: after$3,
    seekLeft: seekLeft,
    seekRight: seekRight,
    walkers: walkers,
    walk: walk,
    backtrack: $_fy01gpajdud7ceo.backtrack,
    sidestep: $_fy01gpajdud7ceo.sidestep,
    advance: $_fy01gpajdud7ceo.advance
  };

  var universe$2 = DomUniverse();
  var gather = function (element, prune, transform) {
    return $_g9gzv7p8jdud7cej.gather(universe$2, element, prune, transform);
  };
  var before$3 = function (element, isRoot) {
    return $_g9gzv7p8jdud7cej.before(universe$2, element, isRoot);
  };
  var after$4 = function (element, isRoot) {
    return $_g9gzv7p8jdud7cej.after(universe$2, element, isRoot);
  };
  var seekLeft$1 = function (element, predicate, isRoot) {
    return $_g9gzv7p8jdud7cej.seekLeft(universe$2, element, predicate, isRoot);
  };
  var seekRight$1 = function (element, predicate, isRoot) {
    return $_g9gzv7p8jdud7cej.seekRight(universe$2, element, predicate, isRoot);
  };
  var walkers$1 = function () {
    return $_g9gzv7p8jdud7cej.walkers();
  };
  var walk$1 = function (item, mode, direction, _rules) {
    return $_g9gzv7p8jdud7cej.walk(universe$2, item, mode, direction, _rules);
  };
  var $_7i72qgp7jdud7cef = {
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
  var adt$2 = $_d9zbmklsjdud7buk.generate([
    { 'none': [] },
    { 'retry': ['caret'] }
  ]);
  var isOutside = function (caret, box) {
    return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
  };
  var inOutsideBlock = function (bridge, element, caret) {
    return $_70n3lxkwjdud7bp4.closest(element, $_4wh7q4mcjdud7by1.isBlock).fold($_e8r7mrjsjdud7bkx.constant(false), function (cell) {
      return $_411ytop5jdud7cdx.getEntireBox(bridge, cell).exists(function (box) {
        return isOutside(caret, box);
      });
    });
  };
  var adjustDown = function (bridge, element, guessBox, original, caret) {
    var lowerCaret = $_c8vayvp4jdud7cdu.moveDown(caret, JUMP_SIZE);
    if (Math.abs(guessBox.bottom() - original.bottom()) < 1)
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() > caret.bottom())
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() === caret.bottom())
      return adt$2.retry($_c8vayvp4jdud7cdu.moveDown(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_c8vayvp4jdud7cdu.translate(lowerCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var adjustUp = function (bridge, element, guessBox, original, caret) {
    var higherCaret = $_c8vayvp4jdud7cdu.moveUp(caret, JUMP_SIZE);
    if (Math.abs(guessBox.top() - original.top()) < 1)
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() < caret.top())
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() === caret.top())
      return adt$2.retry($_c8vayvp4jdud7cdu.moveUp(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_c8vayvp4jdud7cdu.translate(higherCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var upMovement = {
    point: $_c8vayvp4jdud7cdu.getTop,
    adjuster: adjustUp,
    move: $_c8vayvp4jdud7cdu.moveUp,
    gather: $_7i72qgp7jdud7cef.before
  };
  var downMovement = {
    point: $_c8vayvp4jdud7cdu.getBottom,
    adjuster: adjustDown,
    move: $_c8vayvp4jdud7cdu.moveDown,
    gather: $_7i72qgp7jdud7cef.after
  };
  var isAtTable = function (bridge, x, y) {
    return bridge.elementFromPoint(x, y).filter(function (elm) {
      return $_1102zvkrjdud7bou.name(elm) === 'table';
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
        return $_411ytop5jdud7cdx.getEntireBox(bridge, element, offset).bind(function (guessBox) {
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
  var $_954k06p6jdud7ce3 = {
    tryUp: $_e8r7mrjsjdud7bkx.curry(retry, upMovement),
    tryDown: $_e8r7mrjsjdud7bkx.curry(retry, downMovement),
    ieTryUp: ieTryUp,
    ieTryDown: ieTryDown,
    getJumpSize: $_e8r7mrjsjdud7bkx.constant(JUMP_SIZE)
  };

  var adt$3 = $_d9zbmklsjdud7buk.generate([
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
    return $_a3r4h1kvjdud7bp3.closest(after, 'td,th', isRoot).bind(function (afterCell) {
      return $_a3r4h1kvjdud7bp3.closest(before, 'td,th', isRoot).map(function (beforeCell) {
        if (!$_6nkapzk9jdud7bn7.eq(afterCell, beforeCell)) {
          return $_ef88mqlfjdud7bsc.sharedOne(isRow, [
            afterCell,
            beforeCell
          ]).fold(function () {
            return isOverlapping(bridge, beforeCell, afterCell) ? adt$3.success() : failure(beforeCell);
          }, function (sharedRow) {
            return failure(beforeCell);
          });
        } else {
          return $_6nkapzk9jdud7bn7.eq(after, afterCell) && $_7y1bjwl7jdud7bqw.getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$3.none('in same cell');
        }
      });
    }).getOr(adt$3.none('default'));
  };
  var isRow = function (elem) {
    return $_a3r4h1kvjdud7bp3.closest(elem, 'tr');
  };
  var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
    return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
  };
  var $_2yfkcupcjdud7cf3 = {
    verify: verify,
    cata: cata$2,
    adt: adt$3
  };

  var point = $_4vwz6tjvjdud7blm.immutable('element', 'offset');
  var delta = $_4vwz6tjvjdud7blm.immutable('element', 'deltaOffset');
  var range$3 = $_4vwz6tjvjdud7blm.immutable('element', 'start', 'finish');
  var points = $_4vwz6tjvjdud7blm.immutable('begin', 'end');
  var text = $_4vwz6tjvjdud7blm.immutable('element', 'text');
  var $_9zt1gvpejdud7cft = {
    point: point,
    delta: delta,
    range: range$3,
    points: points,
    text: text
  };

  var inAncestor = $_4vwz6tjvjdud7blm.immutable('ancestor', 'descendants', 'element', 'index');
  var inParent = $_4vwz6tjvjdud7blm.immutable('parent', 'children', 'element', 'index');
  var childOf = function (element, ancestor) {
    return $_70n3lxkwjdud7bp4.closest(element, function (elem) {
      return $_9s8a4jk7jdud7bmw.parent(elem).exists(function (parent) {
        return $_6nkapzk9jdud7bn7.eq(parent, ancestor);
      });
    });
  };
  var indexInParent = function (element) {
    return $_9s8a4jk7jdud7bmw.parent(element).bind(function (parent) {
      var children = $_9s8a4jk7jdud7bmw.children(parent);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var indexOf$1 = function (elements, element) {
    return $_2b6dlmjqjdud7bko.findIndex(elements, $_e8r7mrjsjdud7bkx.curry($_6nkapzk9jdud7bn7.eq, element));
  };
  var selectorsInParent = function (element, selector) {
    return $_9s8a4jk7jdud7bmw.parent(element).bind(function (parent) {
      var children = $_b4a6sqksjdud7bov.children(parent, selector);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
    return $_a3r4h1kvjdud7bp3.closest(element, ancestorSelector).bind(function (ancestor) {
      var descendants = $_b4a6sqksjdud7bov.descendants(ancestor, descendantSelector);
      return indexOf$1(descendants, element).map(function (index) {
        return inAncestor(ancestor, descendants, element, index);
      });
    });
  };
  var $_4uvku2pfjdud7cfv = {
    childOf: childOf,
    indexOf: indexOf$1,
    indexInParent: indexInParent,
    selectorsInParent: selectorsInParent,
    descendantsInAncestor: descendantsInAncestor
  };

  var isBr = function (elem) {
    return $_1102zvkrjdud7bou.name(elem) === 'br';
  };
  var gatherer = function (cand, gather, isRoot) {
    return gather(cand, isRoot).bind(function (target) {
      return $_1102zvkrjdud7bou.isText(target) && $_cvxenhl8jdud7bqz.get(target).trim().length === 0 ? gatherer(target, gather, isRoot) : Option.some(target);
    });
  };
  var handleBr = function (isRoot, element, direction) {
    return direction.traverse(element).orThunk(function () {
      return gatherer(element, direction.gather, isRoot);
    }).map(direction.relative);
  };
  var findBr = function (element, offset) {
    return $_9s8a4jk7jdud7bmw.child(element, offset).filter(isBr).orThunk(function () {
      return $_9s8a4jk7jdud7bmw.child(element, offset - 1).filter(isBr);
    });
  };
  var handleParent = function (isRoot, element, offset, direction) {
    return findBr(element, offset).bind(function (br) {
      return direction.traverse(br).fold(function () {
        return gatherer(br, direction.gather, isRoot).map(direction.relative);
      }, function (adjacent) {
        return $_4uvku2pfjdud7cfv.indexInParent(adjacent).map(function (info) {
          return $_588zi3ogjdud7c9h.on(info.parent(), info.index());
        });
      });
    });
  };
  var tryBr = function (isRoot, element, offset, direction) {
    var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
    return target.map(function (tgt) {
      return {
        start: $_e8r7mrjsjdud7bkx.constant(tgt),
        finish: $_e8r7mrjsjdud7bkx.constant(tgt)
      };
    });
  };
  var process = function (analysis) {
    return $_2yfkcupcjdud7cf3.cata(analysis, function (message) {
      return Option.none();
    }, function () {
      return Option.none();
    }, function (cell) {
      return Option.some($_9zt1gvpejdud7cft.point(cell, 0));
    }, function (cell) {
      return Option.some($_9zt1gvpejdud7cft.point(cell, $_7y1bjwl7jdud7bqw.getEnd(cell)));
    });
  };
  var $_2cmmn6pdjdud7cfc = {
    tryBr: tryBr,
    process: process
  };

  var MAX_RETRIES = 20;
  var platform$1 = $_e4jb8lkejdud7bnr.detect();
  var findSpot = function (bridge, isRoot, direction) {
    return bridge.getSelection().bind(function (sel) {
      return $_2cmmn6pdjdud7cfc.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
        return Option.some($_9zt1gvpejdud7cft.point(sel.finish(), sel.foffset()));
      }, function (brNeighbour) {
        var range = bridge.fromSitus(brNeighbour);
        var analysis = $_2yfkcupcjdud7cf3.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
        return $_2cmmn6pdjdud7cfc.process(analysis);
      });
    });
  };
  var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
    if (numRetries === 0)
      return Option.none();
    return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
      var range = bridge.fromSitus(situs);
      var analysis = $_2yfkcupcjdud7cf3.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
      return $_2yfkcupcjdud7cf3.cata(analysis, function () {
        return Option.none();
      }, function () {
        return Option.some(situs);
      }, function (cell) {
        if ($_6nkapzk9jdud7bn7.eq(element, cell) && offset === 0)
          return tryAgain(bridge, element, offset, $_c8vayvp4jdud7cdu.moveUp, direction);
        else
          return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
      }, function (cell) {
        if ($_6nkapzk9jdud7bn7.eq(element, cell) && offset === $_7y1bjwl7jdud7bqw.getEnd(cell))
          return tryAgain(bridge, element, offset, $_c8vayvp4jdud7cdu.moveDown, direction);
        else
          return scan(bridge, isRoot, cell, $_7y1bjwl7jdud7bqw.getEnd(cell), direction, numRetries - 1);
      });
    });
  };
  var tryAgain = function (bridge, element, offset, move, direction) {
    return $_411ytop5jdud7cdx.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, move(box, $_954k06p6jdud7ce3.getJumpSize()));
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
    return $_411ytop5jdud7cdx.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, box);
    });
  };
  var handle$2 = function (bridge, isRoot, direction) {
    return findSpot(bridge, isRoot, direction).bind(function (spot) {
      return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
    });
  };
  var $_3eldwjp3jdud7cdm = { handle: handle$2 };

  var any$1 = function (predicate) {
    return $_70n3lxkwjdud7bp4.first(predicate).isSome();
  };
  var ancestor$3 = function (scope, predicate, isRoot) {
    return $_70n3lxkwjdud7bp4.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$3 = function (scope, predicate, isRoot) {
    return $_70n3lxkwjdud7bp4.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$3 = function (scope, predicate) {
    return $_70n3lxkwjdud7bp4.sibling(scope, predicate).isSome();
  };
  var child$4 = function (scope, predicate) {
    return $_70n3lxkwjdud7bp4.child(scope, predicate).isSome();
  };
  var descendant$3 = function (scope, predicate) {
    return $_70n3lxkwjdud7bp4.descendant(scope, predicate).isSome();
  };
  var $_6gkvmfpgjdud7cg4 = {
    any: any$1,
    ancestor: ancestor$3,
    closest: closest$3,
    sibling: sibling$3,
    child: child$4,
    descendant: descendant$3
  };

  var detection = $_e4jb8lkejdud7bnr.detect();
  var inSameTable = function (elem, table) {
    return $_6gkvmfpgjdud7cg4.ancestor(elem, function (e) {
      return $_9s8a4jk7jdud7bmw.parent(e).exists(function (p) {
        return $_6nkapzk9jdud7bn7.eq(p, table);
      });
    });
  };
  var simulate = function (bridge, isRoot, direction, initial, anchor) {
    return $_a3r4h1kvjdud7bp3.closest(initial, 'td,th', isRoot).bind(function (start) {
      return $_a3r4h1kvjdud7bp3.closest(start, 'table', isRoot).bind(function (table) {
        if (!inSameTable(anchor, table))
          return Option.none();
        return $_3eldwjp3jdud7cdm.handle(bridge, isRoot, direction).bind(function (range) {
          return $_a3r4h1kvjdud7bp3.closest(range.finish(), 'td,th', isRoot).map(function (finish) {
            return {
              start: $_e8r7mrjsjdud7bkx.constant(start),
              finish: $_e8r7mrjsjdud7bkx.constant(finish),
              range: $_e8r7mrjsjdud7bkx.constant(range)
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
          return $_cvcdnbowjdud7cbw.response(Option.some($_50qw0dozjdud7ccb.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
        });
      });
    }
  };
  var firstUpCheck = function (initial, isRoot) {
    return $_a3r4h1kvjdud7bp3.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_a3r4h1kvjdud7bp3.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_b4a6sqksjdud7bov.descendants(table, 'tr');
        if ($_6nkapzk9jdud7bn7.eq(startRow, rows[0])) {
          return $_7i72qgp7jdud7cef.seekLeft(table, function (element) {
            return $_b7vkeyl6jdud7bqu.last(element).isSome();
          }, isRoot).map(function (last) {
            var lastOffset = $_7y1bjwl7jdud7bqw.getEnd(last);
            return $_cvcdnbowjdud7cbw.response(Option.some($_50qw0dozjdud7ccb.makeSitus(last, lastOffset, last, lastOffset)), true);
          });
        } else {
          return Option.none();
        }
      });
    });
  };
  var lastDownCheck = function (initial, isRoot) {
    return $_a3r4h1kvjdud7bp3.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_a3r4h1kvjdud7bp3.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_b4a6sqksjdud7bov.descendants(table, 'tr');
        if ($_6nkapzk9jdud7bn7.eq(startRow, rows[rows.length - 1])) {
          return $_7i72qgp7jdud7cef.seekRight(table, function (element) {
            return $_b7vkeyl6jdud7bqu.first(element).isSome();
          }, isRoot).map(function (first) {
            return $_cvcdnbowjdud7cbw.response(Option.some($_50qw0dozjdud7ccb.makeSitus(first, 0, first, 0)), true);
          });
        } else {
          return Option.none();
        }
      });
    });
  };
  var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
    return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
      return $_a5kpzap1jdud7ccp.detect(container, isRoot, info.start(), info.finish(), selectRange);
    });
  };
  var $_fwxxdvp2jdud7ccy = {
    navigate: navigate,
    select: select,
    firstUpCheck: firstUpCheck,
    lastDownCheck: lastDownCheck
  };

  var findCell = function (target, isRoot) {
    return $_a3r4h1kvjdud7bp3.closest(target, 'td,th', isRoot);
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
          $_btb09flejdud7brv.identify(start, finish, isRoot).each(function (cellSel) {
            var boxes = cellSel.boxes().getOr([]);
            if (boxes.length > 1 || boxes.length === 1 && !$_6nkapzk9jdud7bn7.eq(start, finish)) {
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

  var $_4t1k61pijdud7cgb = {
    down: {
      traverse: $_9s8a4jk7jdud7bmw.nextSibling,
      gather: $_7i72qgp7jdud7cef.after,
      relative: $_588zi3ogjdud7c9h.before,
      otherRetry: $_954k06p6jdud7ce3.tryDown,
      ieRetry: $_954k06p6jdud7ce3.ieTryDown,
      failure: $_2yfkcupcjdud7cf3.adt.failedDown
    },
    up: {
      traverse: $_9s8a4jk7jdud7bmw.prevSibling,
      gather: $_7i72qgp7jdud7cef.before,
      relative: $_588zi3ogjdud7c9h.before,
      otherRetry: $_954k06p6jdud7ce3.tryUp,
      ieRetry: $_954k06p6jdud7ce3.ieTryUp,
      failure: $_2yfkcupcjdud7cf3.adt.failedUp
    }
  };

  var rc = $_4vwz6tjvjdud7blm.immutable('rows', 'cols');
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
      var handler = $_btb09flejdud7brv.retrieve(container, annotations.selectedSelector()).fold(function () {
        if ($_71t80poxjdud7cby.isDown(keycode) && shiftKey) {
          return $_e8r7mrjsjdud7bkx.curry($_fwxxdvp2jdud7ccy.select, bridge, container, isRoot, $_4t1k61pijdud7cgb.down, finish, start, annotations.selectRange);
        } else if ($_71t80poxjdud7cby.isUp(keycode) && shiftKey) {
          return $_e8r7mrjsjdud7bkx.curry($_fwxxdvp2jdud7ccy.select, bridge, container, isRoot, $_4t1k61pijdud7cgb.up, finish, start, annotations.selectRange);
        } else if ($_71t80poxjdud7cby.isDown(keycode)) {
          return $_e8r7mrjsjdud7bkx.curry($_fwxxdvp2jdud7ccy.navigate, bridge, isRoot, $_4t1k61pijdud7cgb.down, finish, start, $_fwxxdvp2jdud7ccy.lastDownCheck);
        } else if ($_71t80poxjdud7cby.isUp(keycode)) {
          return $_e8r7mrjsjdud7bkx.curry($_fwxxdvp2jdud7ccy.navigate, bridge, isRoot, $_4t1k61pijdud7cgb.up, finish, start, $_fwxxdvp2jdud7ccy.firstUpCheck);
        } else {
          return Option.none;
        }
      }, function (selected) {
        var update = function (attempts) {
          return function () {
            var navigation = $_a6p6d7mgjdud7bym.findMap(attempts, function (delta) {
              return $_a5kpzap1jdud7ccp.update(delta.rows(), delta.cols(), container, selected, annotations);
            });
            return navigation.fold(function () {
              return $_btb09flejdud7brv.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                var relative = $_71t80poxjdud7cby.isDown(keycode) || direction.isForward(keycode) ? $_588zi3ogjdud7c9h.after : $_588zi3ogjdud7c9h.before;
                bridge.setRelativeSelection($_588zi3ogjdud7c9h.on(edges.first(), 0), relative(edges.table()));
                annotations.clear(container);
                return $_cvcdnbowjdud7cbw.response(Option.none(), true);
              });
            }, function (_) {
              return Option.some($_cvcdnbowjdud7cbw.response(Option.none(), true));
            });
          };
        };
        if ($_71t80poxjdud7cby.isDown(keycode) && shiftKey)
          return update([rc(+1, 0)]);
        else if ($_71t80poxjdud7cby.isUp(keycode) && shiftKey)
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
        else if ($_71t80poxjdud7cby.isNavigation(keycode) && shiftKey === false)
          return clearToNavigate;
        else
          return Option.none;
      });
      return handler();
    };
    var keyup = function (event, start, soffset, finish, foffset) {
      return $_btb09flejdud7brv.retrieve(container, annotations.selectedSelector()).fold(function () {
        var keycode = event.raw().which;
        var shiftKey = event.raw().shiftKey === true;
        if (shiftKey === false)
          return Option.none();
        if ($_71t80poxjdud7cby.isNavigation(keycode))
          return $_a5kpzap1jdud7ccp.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
        else
          return Option.none();
      }, Option.none);
    };
    return {
      keydown: keydown,
      keyup: keyup
    };
  };
  var $_8vorfpovjdud7cbi = {
    mouse: mouse,
    keyboard: keyboard
  };

  var add$3 = function (element, classes) {
    $_2b6dlmjqjdud7bko.each(classes, function (x) {
      $_119fsomrjdud7c0i.add(element, x);
    });
  };
  var remove$7 = function (element, classes) {
    $_2b6dlmjqjdud7bko.each(classes, function (x) {
      $_119fsomrjdud7c0i.remove(element, x);
    });
  };
  var toggle$2 = function (element, classes) {
    $_2b6dlmjqjdud7bko.each(classes, function (x) {
      $_119fsomrjdud7c0i.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_2b6dlmjqjdud7bko.forall(classes, function (clazz) {
      return $_119fsomrjdud7c0i.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_2b6dlmjqjdud7bko.exists(classes, function (clazz) {
      return $_119fsomrjdud7c0i.has(element, clazz);
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
    return $_2n8nx3mtjdud7c0l.supports(element) ? getNative(element) : $_2n8nx3mtjdud7c0l.get(element);
  };
  var $_4d5njepljdud7cgr = {
    add: add$3,
    remove: remove$7,
    toggle: toggle$2,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$11
  };

  var addClass = function (clazz) {
    return function (element) {
      $_119fsomrjdud7c0i.add(element, clazz);
    };
  };
  var removeClass = function (clazz) {
    return function (element) {
      $_119fsomrjdud7c0i.remove(element, clazz);
    };
  };
  var removeClasses = function (classes) {
    return function (element) {
      $_4d5njepljdud7cgr.remove(element, classes);
    };
  };
  var hasClass = function (clazz) {
    return function (element) {
      return $_119fsomrjdud7c0i.has(element, clazz);
    };
  };
  var $_en9xukpkjdud7cgp = {
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    hasClass: hasClass
  };

  var byClass = function (ephemera) {
    var addSelectionClass = $_en9xukpkjdud7cgp.addClass(ephemera.selected());
    var removeSelectionClasses = $_en9xukpkjdud7cgp.removeClasses([
      ephemera.selected(),
      ephemera.lastSelected(),
      ephemera.firstSelected()
    ]);
    var clear = function (container) {
      var sels = $_b4a6sqksjdud7bov.descendants(container, ephemera.selectedSelector());
      $_2b6dlmjqjdud7bko.each(sels, removeSelectionClasses);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_2b6dlmjqjdud7bko.each(cells, addSelectionClass);
      $_119fsomrjdud7c0i.add(start, ephemera.firstSelected());
      $_119fsomrjdud7c0i.add(finish, ephemera.lastSelected());
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
      $_1ei337kqjdud7bom.remove(element, ephemera.selected());
      $_1ei337kqjdud7bom.remove(element, ephemera.firstSelected());
      $_1ei337kqjdud7bom.remove(element, ephemera.lastSelected());
    };
    var addSelectionAttribute = function (element) {
      $_1ei337kqjdud7bom.set(element, ephemera.selected(), '1');
    };
    var clear = function (container) {
      var sels = $_b4a6sqksjdud7bov.descendants(container, ephemera.selectedSelector());
      $_2b6dlmjqjdud7bko.each(sels, removeSelectionAttributes);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_2b6dlmjqjdud7bko.each(cells, addSelectionAttribute);
      $_1ei337kqjdud7bom.set(start, ephemera.firstSelected(), '1');
      $_1ei337kqjdud7bom.set(finish, ephemera.lastSelected(), '1');
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var $_8lo57jpjjdud7cgh = {
    byClass: byClass,
    byAttr: byAttr
  };

  function CellSelection$1 (editor, lazyResize) {
    var handlerStruct = $_4vwz6tjvjdud7blm.immutableBag([
      'mousedown',
      'mouseover',
      'mouseup',
      'keyup',
      'keydown'
    ], []);
    var handlers = Option.none();
    var annotations = $_8lo57jpjjdud7cgh.byAttr($_f2i0m2lqjdud7buf);
    editor.on('init', function (e) {
      var win = editor.getWin();
      var body = $_6xec71n8jdud7c2o.getBody(editor);
      var isRoot = $_6xec71n8jdud7c2o.getIsRoot(editor);
      var syncSelection = function () {
        var sel = editor.selection;
        var start = $_2q3j53k5jdud7bmr.fromDom(sel.getStart());
        var end = $_2q3j53k5jdud7bmr.fromDom(sel.getEnd());
        var startTable = $_e5b08wk2jdud7bm5.table(start);
        var endTable = $_e5b08wk2jdud7bm5.table(end);
        var sameTable = startTable.bind(function (tableStart) {
          return endTable.bind(function (tableEnd) {
            return $_6nkapzk9jdud7bn7.eq(tableStart, tableEnd) ? Option.some(true) : Option.none();
          });
        });
        sameTable.fold(function () {
          annotations.clear(body);
        }, $_e8r7mrjsjdud7bkx.noop);
      };
      var mouseHandlers = $_8vorfpovjdud7cbi.mouse(win, body, isRoot, annotations);
      var keyHandlers = $_8vorfpovjdud7cbi.keyboard(win, body, isRoot, annotations);
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
          var relative = $_2twlhjofjdud7c9d.relative(ns.start(), ns.finish());
          var rng = $_ddvh1soljdud7ca6.asLtrRange(win, relative);
          editor.selection.setRng(rng);
        });
      };
      var keyup = function (event) {
        var wrappedEvent = wrapEvent(event);
        if (wrappedEvent.raw().shiftKey && $_71t80poxjdud7cby.isNavigation(wrappedEvent.raw().which)) {
          var rng = editor.selection.getRng();
          var start = $_2q3j53k5jdud7bmr.fromDom(rng.startContainer);
          var end = $_2q3j53k5jdud7bmr.fromDom(rng.endContainer);
          keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
        }
      };
      var checkLast = function (last) {
        return !$_1ei337kqjdud7bom.has(last, 'data-mce-bogus') && $_1102zvkrjdud7bou.name(last) !== 'br' && !($_1102zvkrjdud7bou.isText(last) && $_cvxenhl8jdud7bqz.get(last).length === 0);
      };
      var getLast = function () {
        var body = $_2q3j53k5jdud7bmr.fromDom(editor.getBody());
        var lastChild = $_9s8a4jk7jdud7bmw.lastChild(body);
        var getPrevLast = function (last) {
          return $_9s8a4jk7jdud7bmw.prevSibling(last).bind(function (prevLast) {
            return checkLast(prevLast) ? Option.some(prevLast) : getPrevLast(prevLast);
          });
        };
        return lastChild.bind(function (last) {
          return checkLast(last) ? Option.some(last) : getPrevLast(last);
        });
      };
      var keydown = function (event) {
        var wrappedEvent = wrapEvent(event);
        lazyResize().each(function (resize) {
          resize.hideBars();
        });
        if (event.which === 40) {
          getLast().each(function (last) {
            if ($_1102zvkrjdud7bou.name(last) === 'table') {
              if (getForcedRootBlock(editor)) {
                editor.dom.add(editor.getBody(), getForcedRootBlock(editor), getForcedRootBlockAttrs(editor), '<br/>');
              } else {
                editor.dom.add(editor.getBody(), 'br');
              }
            }
          });
        }
        var rng = editor.selection.getRng();
        var startContainer = $_2q3j53k5jdud7bmr.fromDom(editor.selection.getStart());
        var start = $_2q3j53k5jdud7bmr.fromDom(rng.startContainer);
        var end = $_2q3j53k5jdud7bmr.fromDom(rng.endContainer);
        var direction = $_eqsr8dn9jdud7c2r.directionAt(startContainer).isRtl() ? $_71t80poxjdud7cby.rtl : $_71t80poxjdud7cby.ltr;
        keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
          handleResponse(wrappedEvent, response);
        });
        lazyResize().each(function (resize) {
          resize.showBars();
        });
      };
      var wrapEvent = function (event) {
        var target = $_2q3j53k5jdud7bmr.fromDom(event.target);
        var stop = function () {
          event.stopPropagation();
        };
        var prevent = function () {
          event.preventDefault();
        };
        var kill = $_e8r7mrjsjdud7bkx.compose(prevent, stop);
        return {
          target: $_e8r7mrjsjdud7bkx.constant(target),
          x: $_e8r7mrjsjdud7bkx.constant(event.x),
          y: $_e8r7mrjsjdud7bkx.constant(event.y),
          stop: stop,
          prevent: prevent,
          kill: kill,
          raw: $_e8r7mrjsjdud7bkx.constant(event)
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

  function Selections (editor) {
    var get = function () {
      var body = $_6xec71n8jdud7c2o.getBody(editor);
      return $_jbi15ldjdud7bri.retrieve(body, $_f2i0m2lqjdud7buf.selectedSelector()).fold(function () {
        if (editor.selection.getStart() === undefined) {
          return $_4ns5llrjdud7bui.none();
        } else {
          return $_4ns5llrjdud7bui.single(editor.selection);
        }
      }, function (cells) {
        return $_4ns5llrjdud7bui.multiple(cells);
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
      onclick: $_e8r7mrjsjdud7bkx.curry($_bqump4nkjdud7c4d.open, editor, true),
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
  var $_adjhh7pnjdud7cgy = {
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
        $_2b6dlmjqjdud7bko.each(tableCtrls, noTargetDisable);
        $_2b6dlmjqjdud7bko.each(cellCtrls, noTargetDisable);
        $_2b6dlmjqjdud7bko.each(mergeCtrls, noTargetDisable);
        $_2b6dlmjqjdud7bko.each(unmergeCtrls, noTargetDisable);
      }, function (targets) {
        $_2b6dlmjqjdud7bko.each(tableCtrls, ctrlEnable);
        $_2b6dlmjqjdud7bko.each(cellCtrls, ctrlEnable);
        $_2b6dlmjqjdud7bko.each(mergeCtrls, function (mergeCtrl) {
          mergeCtrl.disabled(targets.mergable().isNone());
        });
        $_2b6dlmjqjdud7bko.each(unmergeCtrls, function (unmergeCtrl) {
          unmergeCtrl.disabled(targets.unmergable().isNone());
        });
      });
    };
    editor.on('init', function () {
      editor.on('nodechange', function (e) {
        var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        targets = cellOpt.bind(function (cellDom) {
          var cell = $_2q3j53k5jdud7bmr.fromDom(cellDom);
          var table = $_e5b08wk2jdud7bm5.table(cell);
          return table.map(function (table) {
            return $_50voclbjdud7br8.forMenu(selections, table, cell);
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
      onclick: $_e8r7mrjsjdud7bkx.curry($_bqump4nkjdud7c4d.open, editor)
    } : {
      text: 'Table',
      icon: 'table',
      context: 'table',
      ariaHideMenu: true,
      onclick: function (e) {
        if (e.aria) {
          this.parent().hideAll();
          e.stopImmediatePropagation();
          $_bqump4nkjdud7c4d.open(editor);
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
                $_n4pzbnmjdud7c4k.insert(editor, self.lastX + 1, self.lastY + 1);
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
      onclick: $_e8r7mrjsjdud7bkx.curry($_bqump4nkjdud7c4d.open, editor, true)
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
  var $_dr1p3spojdud7ch3 = { addMenuItems: addMenuItems };

  var getClipboardRows = function (clipboardRows) {
    return clipboardRows.get().fold(function () {
      return;
    }, function (rows) {
      return $_2b6dlmjqjdud7bko.map(rows, function (row) {
        return row.dom();
      });
    });
  };
  var setClipboardRows = function (rows, clipboardRows) {
    var sugarRows = $_2b6dlmjqjdud7bko.map(rows, $_2q3j53k5jdud7bmr.fromDom);
    clipboardRows.set(Option.from(sugarRows));
  };
  var getApi = function (editor, clipboardRows) {
    return {
      insertTable: function (columns, rows) {
        return $_n4pzbnmjdud7c4k.insert(editor, columns, rows);
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
    $_3ladizndjdud7c36.registerCommands(editor, actions, cellSelection, selections, clipboardRows);
    $_4j7ogljpjdud7bkb.registerEvents(editor, selections, actions, cellSelection);
    $_dr1p3spojdud7ch3.addMenuItems(editor, selections);
    $_adjhh7pnjdud7cgy.addButtons(editor);
    $_adjhh7pnjdud7cgy.addToolbars(editor);
    editor.on('PreInit', function () {
      editor.serializer.addTempAttr($_f2i0m2lqjdud7buf.firstSelected());
      editor.serializer.addTempAttr($_f2i0m2lqjdud7buf.lastSelected());
    });
    if (hasTabNavigation(editor)) {
      editor.on('keydown', function (e) {
        $_fmb5mnocjdud7c8r.handle(e, editor, actions, resizeHandler.lazyWire);
      });
    }
    editor.on('remove', function () {
      resizeHandler.destroy();
      cellSelection.destroy();
    });
    return getApi(editor, clipboardRows);
  }
  PluginManager.add('table', Plugin);
  function Plugin$1 () {
  }

  return Plugin$1;

}());
})();
