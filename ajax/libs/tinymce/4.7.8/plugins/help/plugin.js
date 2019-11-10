(function () {
var help = (function () {
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
  var $_ceqniyaqje4cbw9b = {
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

  var never$1 = $_ceqniyaqje4cbw9b.never;
  var always$1 = $_ceqniyaqje4cbw9b.always;
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
      toString: $_ceqniyaqje4cbw9b.constant('none()')
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
  var $_21xxy4aoje4cbw8y = {
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

  var I18n = tinymce.util.Tools.resolve('tinymce.util.I18n');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var meta = Env.mac ? '\u2318' : 'Ctrl';
  var access = Env.mac ? 'Ctrl + Alt' : 'Shift + Alt';
  var shortcuts = [
    {
      shortcut: meta + ' + B',
      action: 'Bold'
    },
    {
      shortcut: meta + ' + I',
      action: 'Italic'
    },
    {
      shortcut: meta + ' + U',
      action: 'Underline'
    },
    {
      shortcut: meta + ' + A',
      action: 'Select all'
    },
    {
      shortcut: meta + ' + Y or ' + meta + ' + Shift + Z',
      action: 'Redo'
    },
    {
      shortcut: meta + ' + Z',
      action: 'Undo'
    },
    {
      shortcut: access + ' + 1',
      action: 'Header 1'
    },
    {
      shortcut: access + ' + 2',
      action: 'Header 2'
    },
    {
      shortcut: access + ' + 3',
      action: 'Header 3'
    },
    {
      shortcut: access + ' + 4',
      action: 'Header 4'
    },
    {
      shortcut: access + ' + 5',
      action: 'Header 5'
    },
    {
      shortcut: access + ' + 6',
      action: 'Header 6'
    },
    {
      shortcut: access + ' + 7',
      action: 'Paragraph'
    },
    {
      shortcut: access + ' + 8',
      action: 'Div'
    },
    {
      shortcut: access + ' + 9',
      action: 'Address'
    },
    {
      shortcut: 'Alt + F9',
      action: 'Focus to menubar'
    },
    {
      shortcut: 'Alt + F10',
      action: 'Focus to toolbar'
    },
    {
      shortcut: 'Alt + F11',
      action: 'Focus to element path'
    },
    {
      shortcut: 'Ctrl + Shift + P > Ctrl + Shift + P',
      action: 'Focus to contextual toolbar'
    },
    {
      shortcut: meta + ' + K',
      action: 'Insert link (if link plugin activated)'
    },
    {
      shortcut: meta + ' + S',
      action: 'Save (if save plugin activated)'
    },
    {
      shortcut: meta + ' + F',
      action: 'Find (if searchreplace plugin activated)'
    }
  ];
  var $_4ln40uasje4cbw9e = { shortcuts: shortcuts };

  var makeTab = function () {
    var makeAriaLabel = function (shortcut) {
      return 'aria-label="Action: ' + shortcut.action + ', Shortcut: ' + shortcut.shortcut.replace(/Ctrl/g, 'Control') + '"';
    };
    var shortcutLisString = $_21xxy4aoje4cbw8y.map($_4ln40uasje4cbw9e.shortcuts, function (shortcut) {
      return '<tr data-mce-tabstop="1" tabindex="-1" ' + makeAriaLabel(shortcut) + '>' + '<td>' + I18n.translate(shortcut.action) + '</td>' + '<td>' + shortcut.shortcut + '</td>' + '</tr>';
    }).join('');
    return {
      title: 'Handy Shortcuts',
      type: 'container',
      style: 'overflow-y: auto; overflow-x: hidden; max-height: 250px',
      items: [{
          type: 'container',
          html: '<div>' + '<table class="mce-table-striped">' + '<thead>' + '<th>' + I18n.translate('Action') + '</th>' + '<th>' + I18n.translate('Shortcut') + '</th>' + '</thead>' + shortcutLisString + '</table>' + '</div>'
        }]
    };
  };
  var $_4uln6manje4cbw8t = { makeTab: makeTab };

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
  var $_bdcey6avje4cbw9o = {
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
  var $_b8wi86axje4cbw9u = {
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
  var $_93t4xcayje4cbw9w = {
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
    return startsWith(str, prefix) ? $_b8wi86axje4cbw9u.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_b8wi86axje4cbw9u.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_b8wi86axje4cbw9u.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_b8wi86axje4cbw9u.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_93t4xcayje4cbw9w.head(str).bind(function (head) {
      return $_93t4xcayje4cbw9w.tail(str).map(function (tail) {
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
  var $_bgpcheawje4cbw9r = {
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

  var urls = [
    {
      key: 'advlist',
      name: 'Advanced List'
    },
    {
      key: 'anchor',
      name: 'Anchor'
    },
    {
      key: 'autolink',
      name: 'Autolink'
    },
    {
      key: 'autoresize',
      name: 'Autoresize'
    },
    {
      key: 'autosave',
      name: 'Autosave'
    },
    {
      key: 'bbcode',
      name: 'BBCode'
    },
    {
      key: 'charmap',
      name: 'Character Map'
    },
    {
      key: 'code',
      name: 'Code'
    },
    {
      key: 'codesample',
      name: 'Code Sample'
    },
    {
      key: 'colorpicker',
      name: 'Color Picker'
    },
    {
      key: 'compat3x',
      name: '3.x Compatibility'
    },
    {
      key: 'contextmenu',
      name: 'Context Menu'
    },
    {
      key: 'directionality',
      name: 'Directionality'
    },
    {
      key: 'emoticons',
      name: 'Emoticons'
    },
    {
      key: 'fullpage',
      name: 'Full Page'
    },
    {
      key: 'fullscreen',
      name: 'Full Screen'
    },
    {
      key: 'help',
      name: 'Help'
    },
    {
      key: 'hr',
      name: 'Horizontal Rule'
    },
    {
      key: 'image',
      name: 'Image'
    },
    {
      key: 'imagetools',
      name: 'Image Tools'
    },
    {
      key: 'importcss',
      name: 'Import CSS'
    },
    {
      key: 'insertdatetime',
      name: 'Insert Date/Time'
    },
    {
      key: 'legacyoutput',
      name: 'Legacy Output'
    },
    {
      key: 'link',
      name: 'Link'
    },
    {
      key: 'lists',
      name: 'Lists'
    },
    {
      key: 'media',
      name: 'Media'
    },
    {
      key: 'nonbreaking',
      name: 'Nonbreaking'
    },
    {
      key: 'noneditable',
      name: 'Noneditable'
    },
    {
      key: 'pagebreak',
      name: 'Page Break'
    },
    {
      key: 'paste',
      name: 'Paste'
    },
    {
      key: 'preview',
      name: 'Preview'
    },
    {
      key: 'print',
      name: 'Print'
    },
    {
      key: 'save',
      name: 'Save'
    },
    {
      key: 'searchreplace',
      name: 'Search and Replace'
    },
    {
      key: 'spellchecker',
      name: 'Spell Checker'
    },
    {
      key: 'tabfocus',
      name: 'Tab Focus'
    },
    {
      key: 'table',
      name: 'Table'
    },
    {
      key: 'template',
      name: 'Template'
    },
    {
      key: 'textcolor',
      name: 'Text Color'
    },
    {
      key: 'textpattern',
      name: 'Text Pattern'
    },
    {
      key: 'toc',
      name: 'Table of Contents'
    },
    {
      key: 'visualblocks',
      name: 'Visual Blocks'
    },
    {
      key: 'visualchars',
      name: 'Visual Characters'
    },
    {
      key: 'wordcount',
      name: 'Word Count'
    }
  ];
  var $_3hi00aazje4cbw9y = { urls: urls };

  var makeLink = $_ceqniyaqje4cbw9b.curry($_bgpcheawje4cbw9r.supplant, '<a href="${url}" target="_blank" rel="noopener">${name}</a>');
  var maybeUrlize = function (editor, key) {
    return $_21xxy4aoje4cbw8y.find($_3hi00aazje4cbw9y.urls, function (x) {
      return x.key === key;
    }).fold(function () {
      var getMetadata = editor.plugins[key].getMetadata;
      return typeof getMetadata === 'function' ? makeLink(getMetadata()) : key;
    }, function (x) {
      return makeLink({
        name: x.name,
        url: 'https://www.tinymce.com/docs/plugins/' + x.key
      });
    });
  };
  var getPluginKeys = function (editor) {
    var keys = $_bdcey6avje4cbw9o.keys(editor.plugins);
    return editor.settings.forced_plugins === undefined ? keys : $_21xxy4aoje4cbw8y.filter(keys, $_ceqniyaqje4cbw9b.not($_ceqniyaqje4cbw9b.curry($_21xxy4aoje4cbw8y.contains, editor.settings.forced_plugins)));
  };
  var pluginLister = function (editor) {
    var pluginKeys = getPluginKeys(editor);
    var pluginLis = $_21xxy4aoje4cbw8y.map(pluginKeys, function (key) {
      return '<li>' + maybeUrlize(editor, key) + '</li>';
    });
    var count = pluginLis.length;
    var pluginsString = pluginLis.join('');
    return '<p><b>' + I18n.translate([
      'Plugins installed ({0}):',
      count
    ]) + '</b></p>' + '<ul>' + pluginsString + '</ul>';
  };
  var installedPlugins = function (editor) {
    return {
      type: 'container',
      html: '<div style="overflow-y: auto; overflow-x: hidden; max-height: 230px; height: 230px;" data-mce-tabstop="1" tabindex="-1">' + pluginLister(editor) + '</div>',
      flex: 1
    };
  };
  var availablePlugins = function () {
    return {
      type: 'container',
      html: '<div style="padding: 10px; background: #e3e7f4; height: 100%;" data-mce-tabstop="1" tabindex="-1">' + '<p><b>' + I18n.translate('Premium plugins:') + '</b></p>' + '<ul>' + '<li>PowerPaste</li>' + '<li>Spell Checker Pro</li>' + '<li>Accessibility Checker</li>' + '<li>Advanced Code Editor</li>' + '<li>Enhanced Media Embed</li>' + '<li>Link Checker</li>' + '</ul><br />' + '<p style="float: right;"><a href="https://www.tinymce.com/pricing/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" target="_blank">' + I18n.translate('Learn more...') + '</a></p>' + '</div>',
      flex: 1
    };
  };
  var makeTab$1 = function (editor) {
    return {
      title: 'Plugins',
      type: 'container',
      style: 'overflow-y: auto; overflow-x: hidden;',
      layout: 'flex',
      padding: 10,
      spacing: 10,
      items: [
        installedPlugins(editor),
        availablePlugins()
      ]
    };
  };
  var $_8seotdauje4cbw9h = { makeTab: makeTab$1 };

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var getVersion = function (major, minor) {
    return major.indexOf('@') === 0 ? 'X.X.X' : major + '.' + minor;
  };
  var makeRow = function () {
    var version = getVersion(EditorManager.majorVersion, EditorManager.minorVersion);
    var changeLogLink = '<a href="https://www.tinymce.com/docs/changelog/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" target="_blank">TinyMCE ' + version + '</a>';
    return [
      {
        type: 'label',
        html: I18n.translate([
          'You are using {0}',
          changeLogLink
        ])
      },
      {
        type: 'spacer',
        flex: 1
      },
      {
        text: 'Close',
        onclick: function () {
          this.parent().parent().close();
        }
      }
    ];
  };
  var $_30577mb0je4cbwa0 = { makeRow: makeRow };

  var open = function (editor, pluginUrl) {
    return function () {
      editor.windowManager.open({
        title: 'Help',
        bodyType: 'tabpanel',
        layout: 'flex',
        body: [
          $_4uln6manje4cbw8t.makeTab(),
          $_8seotdauje4cbw9h.makeTab(editor)
        ],
        buttons: $_30577mb0je4cbwa0.makeRow(),
        onPostRender: function () {
          var title = this.getEl('title');
          title.innerHTML = '<img src="' + pluginUrl + '/img/logo.png" alt="TinyMCE Logo" style="display: inline-block; width: 200px; height: 50px">';
        }
      });
    };
  };
  var $_dxadnvamje4cbw8s = { open: open };

  var register = function (editor, pluginUrl) {
    editor.addCommand('mceHelp', $_dxadnvamje4cbw8s.open(editor, pluginUrl));
  };
  var $_d92yl1alje4cbw8r = { register: register };

  var register$1 = function (editor, pluginUrl) {
    editor.addButton('help', {
      icon: 'help',
      onclick: $_dxadnvamje4cbw8s.open(editor, pluginUrl)
    });
    editor.addMenuItem('help', {
      text: 'Help',
      icon: 'help',
      context: 'help',
      onclick: $_dxadnvamje4cbw8s.open(editor, pluginUrl)
    });
  };
  var $_a70hsrb2je4cbwa2 = { register: register$1 };

  PluginManager.add('help', function (editor, pluginUrl) {
    $_a70hsrb2je4cbwa2.register(editor, pluginUrl);
    $_d92yl1alje4cbw8r.register(editor, pluginUrl);
    editor.shortcuts.add('Alt+0', 'Open help dialog', 'mceHelp');
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
