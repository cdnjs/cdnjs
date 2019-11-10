(function () {
var visualchars = (function () {
  'use strict';

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

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var get = function (toggleState) {
    var isEnabled = function () {
      return toggleState.get();
    };
    return { isEnabled: isEnabled };
  };
  var $_24kv66rgjdud7dd6 = { get: get };

  var fireVisualChars = function (editor, state) {
    return editor.fire('VisualChars', { state: state });
  };
  var $_9l9nzarjjdud7dd9 = { fireVisualChars: fireVisualChars };

  var charMap = {
    '\xA0': 'nbsp',
    '\xAD': 'shy'
  };
  var charMapToRegExp = function (charMap, global) {
    var key, regExp = '';
    for (key in charMap) {
      regExp += key;
    }
    return new RegExp('[' + regExp + ']', global ? 'g' : '');
  };
  var charMapToSelector = function (charMap) {
    var key, selector = '';
    for (key in charMap) {
      if (selector) {
        selector += ',';
      }
      selector += 'span.mce-' + charMap[key];
    }
    return selector;
  };
  var $_3zn9mxrljdud7ddf = {
    charMap: charMap,
    regExp: charMapToRegExp(charMap),
    regExpGlobal: charMapToRegExp(charMap, true),
    selector: charMapToSelector(charMap),
    charMapToRegExp: charMapToRegExp,
    charMapToSelector: charMapToSelector
  };

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
  var $_d7pbczrpjdud7de5 = {
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

  var never$1 = $_d7pbczrpjdud7de5.never;
  var always$1 = $_d7pbczrpjdud7de5.always;
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
      toString: $_d7pbczrpjdud7de5.constant('none()')
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
  var $_5v5kvdrnjdud7ddl = {
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
    return { dom: $_d7pbczrpjdud7de5.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_4ggplurqjdud7de8 = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_3lsu7orsjdud7dee = {
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
  var isType = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_3lsu7orsjdud7dee.COMMENT || name(element) === '#comment';
  };
  var isElement = isType($_3lsu7orsjdud7dee.ELEMENT);
  var isText = isType($_3lsu7orsjdud7dee.TEXT);
  var isDocument = isType($_3lsu7orsjdud7dee.DOCUMENT);
  var $_g9gufcrrjdud7ded = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var wrapCharWithSpan = function (value) {
    return '<span data-mce-bogus="1" class="mce-' + $_3zn9mxrljdud7ddf.charMap[value] + '">' + value + '</span>';
  };
  var $_davixbrtjdud7def = { wrapCharWithSpan: wrapCharWithSpan };

  var isMatch = function (n) {
    return $_g9gufcrrjdud7ded.isText(n) && $_g9gufcrrjdud7ded.value(n) !== undefined && $_3zn9mxrljdud7ddf.regExp.test($_g9gufcrrjdud7ded.value(n));
  };
  var filterDescendants = function (scope, predicate) {
    var result = [];
    var dom = scope.dom();
    var children = $_5v5kvdrnjdud7ddl.map(dom.childNodes, $_4ggplurqjdud7de8.fromDom);
    $_5v5kvdrnjdud7ddl.each(children, function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(filterDescendants(x, predicate));
    });
    return result;
  };
  var findParentElm = function (elm, rootElm) {
    while (elm.parentNode) {
      if (elm.parentNode === rootElm) {
        return elm;
      }
      elm = elm.parentNode;
    }
  };
  var replaceWithSpans = function (html) {
    return html.replace($_3zn9mxrljdud7ddf.regExpGlobal, $_davixbrtjdud7def.wrapCharWithSpan);
  };
  var $_fte9o2rmjdud7ddh = {
    isMatch: isMatch,
    filterDescendants: filterDescendants,
    findParentElm: findParentElm,
    replaceWithSpans: replaceWithSpans
  };

  var show = function (editor, rootElm) {
    var node, div;
    var nodeList = $_fte9o2rmjdud7ddh.filterDescendants($_4ggplurqjdud7de8.fromDom(rootElm), $_fte9o2rmjdud7ddh.isMatch);
    $_5v5kvdrnjdud7ddl.each(nodeList, function (n) {
      var withSpans = $_fte9o2rmjdud7ddh.replaceWithSpans($_g9gufcrrjdud7ded.value(n));
      div = editor.dom.create('div', null, withSpans);
      while (node = div.lastChild) {
        editor.dom.insertAfter(node, n.dom());
      }
      editor.dom.remove(n.dom());
    });
  };
  var hide = function (editor, body) {
    var nodeList = editor.dom.select($_3zn9mxrljdud7ddf.selector, body);
    $_5v5kvdrnjdud7ddl.each(nodeList, function (node) {
      editor.dom.remove(node, 1);
    });
  };
  var toggle = function (editor) {
    var body = editor.getBody();
    var bookmark = editor.selection.getBookmark();
    var parentNode = $_fte9o2rmjdud7ddh.findParentElm(editor.selection.getNode(), body);
    parentNode = parentNode !== undefined ? parentNode : body;
    hide(editor, parentNode);
    show(editor, parentNode);
    editor.selection.moveToBookmark(bookmark);
  };
  var $_q304srkjdud7dda = {
    show: show,
    hide: hide,
    toggle: toggle
  };

  var toggleVisualChars = function (editor, toggleState) {
    var body = editor.getBody();
    var selection = editor.selection;
    var bookmark;
    toggleState.set(!toggleState.get());
    $_9l9nzarjjdud7dd9.fireVisualChars(editor, toggleState.get());
    bookmark = selection.getBookmark();
    if (toggleState.get() === true) {
      $_q304srkjdud7dda.show(editor, body);
    } else {
      $_q304srkjdud7dda.hide(editor, body);
    }
    selection.moveToBookmark(bookmark);
  };
  var $_dsw8qarijdud7dd8 = { toggleVisualChars: toggleVisualChars };

  var register = function (editor, toggleState) {
    editor.addCommand('mceVisualChars', function () {
      $_dsw8qarijdud7dd8.toggleVisualChars(editor, toggleState);
    });
  };
  var $_3pw2u8rhjdud7dd7 = { register: register };

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var setup = function (editor, toggleState) {
    var debouncedToggle = Delay.debounce(function () {
      $_q304srkjdud7dda.toggle(editor);
    }, 300);
    if (editor.settings.forced_root_block !== false) {
      editor.on('keydown', function (e) {
        if (toggleState.get() === true) {
          e.keyCode === 13 ? $_q304srkjdud7dda.toggle(editor) : debouncedToggle();
        }
      });
    }
  };
  var $_w3ptvrujdud7deg = { setup: setup };

  var toggleActiveState = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('VisualChars', function (e) {
        ctrl.active(e.state);
      });
    };
  };
  var register$1 = function (editor) {
    editor.addButton('visualchars', {
      active: false,
      title: 'Show invisible characters',
      cmd: 'mceVisualChars',
      onPostRender: toggleActiveState(editor)
    });
    editor.addMenuItem('visualchars', {
      text: 'Show invisible characters',
      cmd: 'mceVisualChars',
      onPostRender: toggleActiveState(editor),
      selectable: true,
      context: 'view',
      prependToContext: true
    });
  };

  PluginManager.add('visualchars', function (editor) {
    var toggleState = Cell(false);
    $_3pw2u8rhjdud7dd7.register(editor, toggleState);
    register$1(editor);
    $_w3ptvrujdud7deg.setup(editor, toggleState);
    return $_24kv66rgjdud7dd6.get(toggleState);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
