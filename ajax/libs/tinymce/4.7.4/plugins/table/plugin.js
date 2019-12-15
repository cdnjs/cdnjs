(function () {

var defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}

// Used when there is no 'main' module.
// The name is probably (hopefully) unique so minification removes for releases.
var register_3795 = function (id) {
  var module = dem(id);
  var fragments = id.split('.');
  var target = Function('return this;')();
  for (var i = 0; i < fragments.length - 1; ++i) {
    if (target[fragments[i]] === undefined)
      target[fragments[i]] = {};
    target = target[fragments[i]];
  }
  target[fragments[fragments.length - 1]] = module;
};

var instantiate = function (id) {
  var actual = defs[id];
  var dependencies = actual.deps;
  var definition = actual.defn;
  var len = dependencies.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(dependencies[i]);
  var defResult = definition.apply(null, instances);
  if (defResult === undefined)
     throw 'module [' + id + '] returned undefined';
  actual.instance = defResult;
};

var def = function (id, dependencies, definition) {
  if (typeof id !== 'string')
    throw 'module id must be a string';
  else if (dependencies === undefined)
    throw 'no dependencies for ' + id;
  else if (definition === undefined)
    throw 'no definition function for ' + id;
  defs[id] = {
    deps: dependencies,
    defn: definition,
    instance: undefined
  };
};

var dem = function (id) {
  var actual = defs[id];
  if (actual === undefined)
    throw 'module [' + id + '] was undefined';
  else if (actual.instance === undefined)
    instantiate(id);
  return actual.instance;
};

var req = function (ids, callback) {
  var len = ids.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(ids[i]);
  callback.apply(null, instances);
};

var ephox = {};

ephox.bolt = {
  module: {
    api: {
      define: def,
      require: req,
      demand: dem
    }
  }
};

var define = def;
var require = req;
var demand = dem;
// this helps with minification when using a lot of global references
var defineGlobal = function (id, ref) {
  define(id, [], function () { return ref; });
};
/*jsc
["tinymce.plugins.table.Plugin","tinymce.core.PluginManager","tinymce.plugins.table.actions.Clipboard","tinymce.plugins.table.actions.InsertTable","tinymce.plugins.table.actions.TableActions","tinymce.plugins.table.actions.TableCommands","tinymce.plugins.table.actions.ResizeHandler","tinymce.plugins.table.queries.TabContext","tinymce.plugins.table.selection.CellSelection","tinymce.plugins.table.selection.Ephemera","tinymce.plugins.table.selection.Selections","tinymce.plugins.table.ui.Buttons","tinymce.plugins.table.ui.MenuItems","global!tinymce.util.Tools.resolve","ephox.katamari.api.Arr","ephox.katamari.api.Fun","ephox.katamari.api.Option","ephox.snooker.api.CopySelected","ephox.snooker.api.TableFill","ephox.snooker.api.TableLookup","ephox.sugar.api.dom.Replication","ephox.sugar.api.node.Element","ephox.sugar.api.node.Elements","ephox.sugar.api.node.Node","tinymce.plugins.table.queries.TableTargets","tinymce.plugins.table.selection.SelectionTypes","ephox.snooker.api.TableRender","ephox.sugar.api.properties.Attr","ephox.sugar.api.properties.Html","ephox.sugar.api.search.SelectorFind","ephox.snooker.api.CellMutations","ephox.snooker.api.TableDirection","ephox.snooker.api.TableGridSize","ephox.snooker.api.TableOperations","ephox.sugar.api.search.SelectorFilter","tinymce.plugins.table.alien.Util","tinymce.plugins.table.queries.Direction","ephox.snooker.api.CopyRows","ephox.sugar.api.dom.Insert","ephox.sugar.api.dom.Remove","tinymce.core.util.Tools","tinymce.plugins.table.ui.TableDialog","tinymce.plugins.table.ui.RowDialog","tinymce.plugins.table.ui.CellDialog","ephox.snooker.api.ResizeWire","ephox.snooker.api.TableResize","tinymce.plugins.table.actions.TableWire","ephox.snooker.api.CellNavigation","ephox.sugar.api.dom.Compare","ephox.sugar.api.selection.CursorPosition","ephox.sugar.api.selection.Selection","ephox.sugar.api.selection.WindowSelection","tinymce.core.util.VK","ephox.darwin.api.InputHandlers","ephox.darwin.api.SelectionAnnotation","ephox.darwin.api.SelectionKeys","ephox.katamari.api.Struct","ephox.sugar.api.node.Text","ephox.sugar.api.search.Traverse","ephox.sugar.selection.core.SelectionDirection","ephox.darwin.api.TableSelection","global!Array","global!Error","global!Object","global!String","ephox.katamari.api.Obj","ephox.katamari.data.Immutable","ephox.katamari.data.MixedBag","ephox.snooker.model.DetailsList","ephox.snooker.model.Warehouse","ephox.snooker.util.LayerSelector","ephox.katamari.api.Type","ephox.sugar.api.node.NodeTypes","global!console","ephox.sugar.api.properties.Css","global!document","ephox.sugar.alien.Recurse","ephox.sand.api.Node","ephox.sand.api.PlatformDetection","ephox.sugar.api.search.Selectors","ephox.sugar.api.dom.InsertAll","ephox.sugar.api.search.PredicateFilter","ephox.sugar.api.search.PredicateFind","ephox.sugar.api.selection.Awareness","ephox.snooker.api.Structs","ephox.sugar.impl.ClosestOrAncestor","global!parseInt","tinymce.plugins.table.queries.CellOperations","ephox.katamari.api.Adt","ephox.snooker.operate.Render","ephox.snooker.resize.Sizes","ephox.snooker.api.ResizeDirection","ephox.snooker.api.Generators","ephox.snooker.api.TableContent","ephox.snooker.model.GridRow","ephox.snooker.model.RunOperation","ephox.snooker.model.TableMerge","ephox.snooker.model.Transitions","ephox.snooker.operate.MergingOperations","ephox.snooker.operate.ModificationOperations","ephox.snooker.operate.TransformOperations","ephox.snooker.resize.Adjustments","ephox.sugar.api.properties.Direction","ephox.snooker.operate.Redraw","tinymce.core.Env","tinymce.plugins.table.actions.Styles","tinymce.plugins.table.ui.Helpers","ephox.sugar.api.view.Location","ephox.sugar.api.view.Position","ephox.porkbun.Event","ephox.porkbun.Events","ephox.snooker.resize.BarManager","ephox.snooker.resize.BarPositions","ephox.sugar.api.node.Body","ephox.snooker.api.CellLocation","ephox.sugar.api.selection.Situ","ephox.sugar.api.dom.DocumentPosition","ephox.sugar.api.node.Fragment","ephox.sugar.selection.core.NativeRange","ephox.katamari.api.Thunk","ephox.sugar.selection.query.CaretRange","ephox.sugar.selection.query.Within","ephox.sugar.selection.quirks.Prefilter","ephox.darwin.api.Responses","ephox.darwin.api.WindowBridge","ephox.darwin.keyboard.KeySelection","ephox.darwin.keyboard.VerticalMovement","ephox.darwin.mouse.MouseSelection","ephox.darwin.navigation.KeyDirection","ephox.darwin.selection.CellSelection","ephox.katamari.api.Options","ephox.sugar.api.properties.Class","ephox.sugar.api.properties.OnNode","ephox.sugar.impl.NodeValue","ephox.snooker.api.TablePositions","ephox.katamari.util.BagUtils","ephox.sand.util.Global","ephox.sand.core.PlatformDetection","global!navigator","global!Math","ephox.sugar.impl.Style","ephox.katamari.api.Strings","global!window","ephox.robin.api.dom.DomParent","ephox.snooker.selection.CellFinder","ephox.snooker.selection.CellGroup","ephox.snooker.resize.RuntimeSize","ephox.sugar.api.view.Height","ephox.sugar.api.view.Width","ephox.sugar.api.dom.Dom","ephox.katamari.api.Cell","ephox.katamari.api.Contracts","ephox.robin.api.dom.DomStructure","ephox.katamari.api.Merger","ephox.snooker.model.TableGrid","ephox.snooker.resize.Bars","ephox.snooker.model.Fitment","ephox.snooker.calc.Deltas","ephox.snooker.resize.ColumnSizes","ephox.snooker.resize.Recalculations","ephox.snooker.resize.TableSize","ephox.snooker.util.CellUtils","ephox.dragster.api.Dragger","ephox.snooker.resize.BarMutation","ephox.snooker.style.Styles","ephox.sugar.api.events.DomEvent","ephox.sugar.api.properties.Toggler","ephox.sugar.impl.ClassList","ephox.sugar.api.search.SelectorExists","ephox.sugar.selection.query.ContainerPoint","ephox.sugar.selection.query.EdgePoint","ephox.darwin.selection.Util","ephox.darwin.keyboard.TableKeys","ephox.sugar.api.search.PredicateExists","ephox.darwin.keyboard.Retries","ephox.darwin.navigation.BeforeAfter","ephox.phoenix.api.dom.DomGather","ephox.sugar.api.properties.Classes","ephox.katamari.api.Resolve","ephox.sand.core.Browser","ephox.sand.core.OperatingSystem","ephox.sand.detect.DeviceType","ephox.sand.detect.UaString","ephox.sand.info.PlatformInfo","ephox.katamari.str.StrAppend","ephox.katamari.str.StringParts","ephox.boss.api.DomUniverse","ephox.robin.api.general.Parent","ephox.snooker.selection.CellBounds","ephox.sugar.impl.Dimension","ephox.robin.api.general.Structure","ephox.snooker.lookup.Blocks","ephox.snooker.resize.Bar","ephox.katamari.api.Namespace","ephox.sugar.api.properties.AttrList","ephox.katamari.api.Result","ephox.snooker.util.Util","ephox.snooker.calc.ColumnContext","ephox.dragster.api.MouseDrag","ephox.dragster.core.Dragging","ephox.snooker.resize.Mutation","ephox.sugar.impl.FilteredEvent","ephox.sugar.selection.alien.Geometry","ephox.sugar.selection.query.TextPoint","ephox.darwin.keyboard.Carets","ephox.darwin.keyboard.Rectangles","ephox.phoenix.api.general.Gather","ephox.darwin.navigation.BrTags","ephox.phoenix.api.data.Spot","ephox.katamari.api.Global","ephox.sand.detect.Version","ephox.boss.common.TagBoundaries","ephox.robin.parent.Breaker","ephox.robin.parent.Shared","ephox.robin.parent.Subset","ephox.dragster.api.DragApis","ephox.dragster.detect.Blocker","ephox.dragster.detect.Movement","ephox.katamari.api.Throttler","ephox.phoenix.gather.Seeker","ephox.phoenix.gather.Walker","ephox.phoenix.gather.Walkers","ephox.sugar.api.search.ElementAddress","global!Number","ephox.dragster.style.Styles","ephox.dragster.detect.InDrag","ephox.dragster.detect.NoDrag","global!clearTimeout","global!setTimeout"]
jsc*/
defineGlobal("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.PluginManager',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
  }
);

defineGlobal("global!Array", Array);
defineGlobal("global!Error", Error);
define(
  'ephox.katamari.api.Fun',

  [
    'global!Array',
    'global!Error'
  ],

  function (Array, Error) {

    var noop = function () { };

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

    var tripleEquals = function(a, b) {
      return a === b;
    };

    // Don't use array slice(arguments), makes the whole function unoptimisable on Chrome
    var curry = function (f) {
      // equivalent to arguments.slice(1)
      // starting at 1 because 0 is the f, makes things tricky.
      // Pay attention to what variable is where, and the -1 magic.
      // thankfully, we have tests for this.
      var args = new Array(arguments.length - 1);
      for (var i = 1; i < arguments.length; i++) args[i-1] = arguments[i];

      return function () {
        var newArgs = new Array(arguments.length);
        for (var j = 0; j < newArgs.length; j++) newArgs[j] = arguments[j];

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

    var call = function(f) {
      f();
    };

    var never = constant(false);
    var always = constant(true);


    return {
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
  }
);

defineGlobal("global!Object", Object);
define(
  'ephox.katamari.api.Option',

  [
    'ephox.katamari.api.Fun',
    'global!Object'
  ],

  function (Fun, Object) {

    var never = Fun.never;
    var always = Fun.always;

    /**
      Option objects support the following methods:

      fold :: this Option a -> ((() -> b, a -> b)) -> Option b

      is :: this Option a -> a -> Boolean

      isSome :: this Option a -> () -> Boolean

      isNone :: this Option a -> () -> Boolean

      getOr :: this Option a -> a -> a

      getOrThunk :: this Option a -> (() -> a) -> a

      getOrDie :: this Option a -> String -> a

      or :: this Option a -> Option a -> Option a
        - if some: return self
        - if none: return opt

      orThunk :: this Option a -> (() -> Option a) -> Option a
        - Same as "or", but uses a thunk instead of a value

      map :: this Option a -> (a -> b) -> Option b
        - "fmap" operation on the Option Functor.
        - same as 'each'

      ap :: this Option a -> Option (a -> b) -> Option b
        - "apply" operation on the Option Apply/Applicative.
        - Equivalent to <*> in Haskell/PureScript.

      each :: this Option a -> (a -> b) -> undefined
        - similar to 'map', but doesn't return a value.
        - intended for clarity when performing side effects.

      bind :: this Option a -> (a -> Option b) -> Option b
        - "bind"/"flatMap" operation on the Option Bind/Monad.
        - Equivalent to >>= in Haskell/PureScript; flatMap in Scala.

      flatten :: {this Option (Option a))} -> () -> Option a
        - "flatten"/"join" operation on the Option Monad.

      exists :: this Option a -> (a -> Boolean) -> Boolean

      forall :: this Option a -> (a -> Boolean) -> Boolean

      filter :: this Option a -> (a -> Boolean) -> Option a

      equals :: this Option a -> Option a -> Boolean

      equals_ :: this Option a -> (Option a, a -> Boolean) -> Boolean

      toArray :: this Option a -> () -> [a]

    */

    var none = function () { return NONE; };

    var NONE = (function () {
      var eq = function (o) {
        return o.isNone();
      };

      // inlined from peanut, maybe a micro-optimisation?
      var call = function (thunk) { return thunk(); };
      var id = function (n) { return n; };
      var noop = function () { };

      var me = {
        fold: function (n, s) { return n(); },
        is: never,
        isSome: never,
        isNone: always,
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
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () { return []; },
        toString: Fun.constant("none()")
      };
      if (Object.freeze) Object.freeze(me);
      return me;
    })();


    /** some :: a -> Option a */
    var some = function (a) {

      // inlined from peanut, maybe a micro-optimisation?
      var constant_a = function () { return a; };

      var self = function () {
        // can't Fun.constant this one
        return me;
      };

      var map = function (f) {
        return some(f(a));
      };

      var bind = function (f) {
        return f(a);
      };

      var me = {
        fold: function (n, s) { return s(a); },
        is: function (v) { return a === v; },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function(fab) {
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
          return o.fold(
            never,
            function (b) { return elementEq(a, b); }
          );
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

    /** from :: undefined|null|a -> Option a */
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };

    return {
      some: some,
      none: none,
      from: from
    };
  }
);

defineGlobal("global!String", String);
define(
  'ephox.katamari.api.Arr',

  [
    'ephox.katamari.api.Option',
    'global!Array',
    'global!Error',
    'global!String'
  ],

  function (Option, Array, Error, String) {
    // Use the native Array.indexOf if it is available (IE9+) otherwise fall back to manual iteration
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    var rawIndexOf = (function () {
      var pIndexOf = Array.prototype.indexOf;

      var fastIndex = function (xs, x) { return  pIndexOf.call(xs, x); };

      var slowIndex = function(xs, x) { return slowIndexOf(xs, x); };

      return pIndexOf === undefined ? slowIndex : fastIndex;
    })();

    var indexOf = function (xs, x) {
      // The rawIndexOf method does not wrap up in an option. This is for performance reasons.
      var r = rawIndexOf(xs, x);
      return r === -1 ? Option.none() : Option.some(r);
    };

    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };

    // Using findIndex is likely less optimal in Chrome (dynamic return type instead of bool)
    // but if we need that micro-optimisation we can inline it later.
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

    // It's a total micro optimisation, but these do make some difference.
    // Particularly for browsers other than Chrome.
    // - length caching
    // http://jsperf.com/browser-diet-jquery-each-vs-for-loop/69
    // - not using push
    // http://jsperf.com/array-direct-assignment-vs-push/2

    var chunk = function (array, size) {
      var r = [];
      for (var i = 0; i < array.length; i += size) {
        var s = array.slice(i, i + size);
        r.push(s);
      }
      return r;
    };

    var map = function(xs, f) {
      // pre-allocating array size when it's guaranteed to be known
      // http://jsperf.com/push-allocated-vs-dynamic/22
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i, xs);
      }
      return r;
    };

    // Unwound implementing other functions in terms of each.
    // The code size is roughly the same, and it should allow for better optimisation.
    var each = function(xs, f) {
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

    var partition = function(xs, pred) {
      var pass = [];
      var fail = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var arr = pred(x, i, xs) ? pass : fail;
        arr.push(x);
      }
      return { pass: pass, fail: fail };
    };

    var filter = function(xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          r.push(x);
        }
      }
      return r;
    };

    /*
     * Groups an array into contiguous arrays of like elements. Whether an element is like or not depends on f.
     *
     * f is a function that derives a value from an element - e.g. true or false, or a string.
     * Elements are like if this function generates the same value for them (according to ===).
     *
     *
     * Order of the elements is preserved. Arr.flatten() on the result will return the original list, as with Haskell groupBy function.
     *  For a good explanation, see the group function (which is a special case of groupBy)
     *  http://hackage.haskell.org/package/base-4.7.0.0/docs/Data-List.html#v:group
     */
    var groupBy = function (xs, f) {
      if (xs.length === 0) {
        return [];
      } else {
        var wasType = f(xs[0]); // initial case for matching
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
      // Note, this is possible because push supports multiple arguments:
      // http://jsperf.com/concat-push/6
      // Note that in the past, concat() would silently work (very slowly) for array-like objects.
      // With this change it will throw an error.
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        // Ensure that each value is an array itself
        if (! Array.prototype.isPrototypeOf(xs[i])) throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
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

    var mapToObject = function(xs, f) {
      var r = {};
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        r[String(x)] = f(x, i);
      }
      return r;
    };

    var pure = function(x) {
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

    return {
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
  }
);
define(
  'ephox.katamari.api.Obj',

  [
    'ephox.katamari.api.Option',
    'global!Object'
  ],

  function (Option, Object) {
    // There are many variations of Object iteration that are faster than the 'for-in' style:
    // http://jsperf.com/object-keys-iteration/107
    //
    // Use the native keys if it is available (IE9+), otherwise fall back to manually filtering
    var keys = (function () {
      var fastKeys = Object.keys;

      // This technically means that 'each' and 'find' on IE8 iterate through the object twice.
      // This code doesn't run on IE8 much, so it's an acceptable tradeoff.
      // If it becomes a problem we can always duplicate the feature detection inside each and find as well.
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
    })();


    var each = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i, obj);
      }
    };

    /** objectMap :: (JsObj(k, v), (v, k, JsObj(k, v) -> x)) -> JsObj(k, x) */
    var objectMap = function (obj, f) {
      return tupleMap(obj, function (x, i, obj) {
        return {
          k: i,
          v: f(x, i, obj)
        };
      });
    };

    /** tupleMap :: (JsObj(k, v), (v, k, JsObj(k, v) -> { k: x, v: y })) -> JsObj(x, y) */
    var tupleMap = function (obj, f) {
      var r = {};
      each(obj, function (x, i) {
        var tuple = f(x, i, obj);
        r[tuple.k] = tuple.v;
      });
      return r;
    };

    /** bifilter :: (JsObj(k, v), (v, k -> Bool)) -> { t: JsObj(k, v), f: JsObj(k, v) } */
    var bifilter = function (obj, pred) {
      var t = {};
      var f = {};
      each(obj, function(x, i) {
        var branch = pred(x, i) ? t : f;
        branch[i] = x;
      });
      return {
        t: t,
        f: f
      };
    };

    /** mapToArray :: (JsObj(k, v), (v, k -> a)) -> [a] */
    var mapToArray = function (obj, f) {
      var r = [];
      each(obj, function(value, name) {
        r.push(f(value, name));
      });
      return r;
    };

    /** find :: (JsObj(k, v), (v, k, JsObj(k, v) -> Bool)) -> Option v */
    var find = function (obj, pred) {
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

    /** values :: JsObj(k, v) -> [v] */
    var values = function (obj) {
      return mapToArray(obj, function (v) {
        return v;
      });
    };

    var size = function (obj) {
      return values(obj).length;
    };

    return {
      bifilter: bifilter,
      each: each,
      map: objectMap,
      mapToArray: mapToArray,
      tupleMap: tupleMap,
      find: find,
      keys: keys,
      values: values,
      size: size
    };
  }
);
define(
  'ephox.katamari.data.Immutable',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'global!Array',
    'global!Error'
  ],

  function (Arr, Fun, Array, Error) {
    return function () {
      var fields = arguments;
      return function(/* values */) {
        //  Don't use array slice(arguments), makes the whole function unoptimisable on Chrome
        var values = new Array(arguments.length);
        for (var i = 0; i < values.length; i++) values[i] = arguments[i];

        if (fields.length !== values.length)
          throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');

        var struct = {};
        Arr.each(fields, function (name, i) {
          struct[name] = Fun.constant(values[i]);
        });
        return struct;
      };
    };
  }
);

define(
  'ephox.katamari.api.Type',

  [
    'global!Array',
    'global!String'
  ],

  function (Array, String) {
    var typeOf = function(x) {
      if (x === null) return 'null';
      var t = typeof x;
      if (t === 'object' && Array.prototype.isPrototypeOf(x)) return 'array';
      if (t === 'object' && String.prototype.isPrototypeOf(x)) return 'string';
      return t;
    };

    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };

    return {
      isString: isType('string'),
      isObject: isType('object'),
      isArray: isType('array'),
      isNull: isType('null'),
      isBoolean: isType('boolean'),
      isUndefined: isType('undefined'),
      isFunction: isType('function'),
      isNumber: isType('number')
    };
  }
);


define(
  'ephox.katamari.util.BagUtils',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Type',
    'global!Error'
  ],

  function (Arr, Type, Error) {
    var sort = function (arr) {
      return arr.slice(0).sort();
    };

    var reqMessage = function (required, keys) {
      throw new Error('All required keys (' + sort(required).join(', ') + ') were not specified. Specified keys were: ' + sort(keys).join(', ') + '.');
    };

    var unsuppMessage = function (unsupported) {
      throw new Error('Unsupported keys for object: ' + sort(unsupported).join(', '));
    };

    var validateStrArr = function (label, array) {
      if (!Type.isArray(array)) throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
      Arr.each(array, function (a) {
        if (!Type.isString(a)) throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
      });
    };

    var invalidTypeMessage = function (incorrect, type) {
      throw new Error('All values need to be of type: ' + type + '. Keys (' + sort(incorrect).join(', ') + ') were not.');
    };

    var checkDupes = function (everything) {
      var sorted = sort(everything);
      var dupe = Arr.find(sorted, function (s, i) {
        return i < sorted.length -1 && s === sorted[i + 1];
      });

      dupe.each(function (d) {
        throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
      });
    };

    return {
      sort: sort,
      reqMessage: reqMessage,
      unsuppMessage: unsuppMessage,
      validateStrArr: validateStrArr,
      invalidTypeMessage: invalidTypeMessage,
      checkDupes: checkDupes
    };
  }
);
define(
  'ephox.katamari.data.MixedBag',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Obj',
    'ephox.katamari.api.Option',
    'ephox.katamari.util.BagUtils',
    'global!Error',
    'global!Object'
  ],

  function (Arr, Fun, Obj, Option, BagUtils, Error, Object) {
    
    return function (required, optional) {
      var everything = required.concat(optional);
      if (everything.length === 0) throw new Error('You must specify at least one required or optional field.');

      BagUtils.validateStrArr('required', required);
      BagUtils.validateStrArr('optional', optional);

      BagUtils.checkDupes(everything);

      return function (obj) {
        var keys = Obj.keys(obj);

        // Ensure all required keys are present.
        var allReqd = Arr.forall(required, function (req) {
          return Arr.contains(keys, req);
        });

        if (! allReqd) BagUtils.reqMessage(required, keys);

        var unsupported = Arr.filter(keys, function (key) {
          return !Arr.contains(everything, key);
        });

        if (unsupported.length > 0) BagUtils.unsuppMessage(unsupported);

        var r = {};
        Arr.each(required, function (req) {
          r[req] = Fun.constant(obj[req]);
        });

        Arr.each(optional, function (opt) {
          r[opt] = Fun.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]): Option.none());
        });

        return r;
      };
    };
  }
);
define(
  'ephox.katamari.api.Struct',

  [
    'ephox.katamari.data.Immutable',
    'ephox.katamari.data.MixedBag'
  ],

  function (Immutable, MixedBag) {
    return {
      immutable: Immutable,
      immutableBag: MixedBag
    };
  }
);

define(
  'ephox.snooker.api.Structs',

  [
    'ephox.katamari.api.Struct'
  ],

  function (Struct) {
    var dimensions = Struct.immutable('width', 'height');
    var grid = Struct.immutable('rows', 'columns');
    var address = Struct.immutable('row', 'column');
    var coords = Struct.immutable('x', 'y');
    var detail = Struct.immutable('element', 'rowspan', 'colspan');
    var detailnew = Struct.immutable('element', 'rowspan', 'colspan', 'isNew');
    var extended = Struct.immutable('element', 'rowspan', 'colspan', 'row', 'column');
    var rowdata = Struct.immutable('element', 'cells', 'section');
    var elementnew = Struct.immutable('element', 'isNew');
    var rowdatanew = Struct.immutable('element', 'cells', 'section', 'isNew');
    var rowcells = Struct.immutable('cells', 'section');
    var rowdetails = Struct.immutable('details', 'section');
    var bounds = Struct.immutable( 'startRow', 'startCol', 'finishRow', 'finishCol');

    return {
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
  }
);
define("global!console", [], function () { if (typeof console === "undefined") console = { log: function () {} }; return console; });
defineGlobal("global!document", document);
define(
  'ephox.sugar.api.node.Element',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'global!Error',
    'global!console',
    'global!document'
  ],

  function (Fun, Option, Error, console, document) {
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
      if (node === null || node === undefined) throw new Error('Node cannot be null or undefined');
      return {
        dom: Fun.constant(node)
      };
    };

    var fromPoint = function (doc, x, y) {
      return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
    };

    return {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };
  }
);

define(
  'ephox.sugar.api.node.NodeTypes',

  [

  ],

  function () {
    return {
      ATTRIBUTE:              2,
      CDATA_SECTION:          4,
      COMMENT:                8,
      DOCUMENT:               9,
      DOCUMENT_TYPE:          10,
      DOCUMENT_FRAGMENT:      11,
      ELEMENT:                1,
      TEXT:                   3,
      PROCESSING_INSTRUCTION: 7,
      ENTITY_REFERENCE:       5,
      ENTITY:                 6,
      NOTATION:               12
    };
  }
);
define(
  'ephox.sugar.api.search.Selectors',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.NodeTypes',
    'global!Error',
    'global!document'
  ],

  function (Arr, Option, Element, NodeTypes, Error, document) {
    var ELEMENT = NodeTypes.ELEMENT;
    var DOCUMENT = NodeTypes.DOCUMENT;

    var is = function (element, selector) {
      var elem = element.dom();
      if (elem.nodeType !== ELEMENT) return false; // documents have querySelector but not matches

      // As of Chrome 34 / Safari 7.1 / FireFox 34, everyone except IE has the unprefixed function.
      // Still check for the others, but do it last.
      else if (elem.matches !== undefined) return elem.matches(selector);
      else if (elem.msMatchesSelector !== undefined) return elem.msMatchesSelector(selector);
      else if (elem.webkitMatchesSelector !== undefined) return elem.webkitMatchesSelector(selector);
      else if (elem.mozMatchesSelector !== undefined) return elem.mozMatchesSelector(selector);
      else throw new Error('Browser lacks native selectors'); // unfortunately we can't throw this on startup :(
    };

    var bypassSelector = function (dom) {
      // Only elements and documents support querySelector
      return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT ||
              // IE fix for complex queries on empty nodes: http://jsfiddle.net/spyder/fv9ptr5L/
              dom.childElementCount === 0;
    };

    var all = function (selector, scope) {
      var base = scope === undefined ? document : scope.dom();
      return bypassSelector(base) ? [] : Arr.map(base.querySelectorAll(selector), Element.fromDom);
    };

    var one = function (selector, scope) {
      var base = scope === undefined ? document : scope.dom();
      return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map(Element.fromDom);
    };

    return {
      all: all,
      is: is,
      one: one
    };
  }
);

define(
  'ephox.sugar.alien.Recurse',

  [

  ],

  function () {
    /**
     * Applies f repeatedly until it completes (by returning Option.none()).
     *
     * Normally would just use recursion, but JavaScript lacks tail call optimisation.
     *
     * This is what recursion looks like when manually unravelled :)
     */
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

    return {
      toArray: toArray
    };
  }
);
define(
  'ephox.katamari.api.Global',

  [
  ],

  function () {
    // Use window object as the global if it's available since CSP will block script evals
    var global = typeof window !== 'undefined' ? window : Function('return this;')();
    return global;
  }
);


define(
  'ephox.katamari.api.Resolve',

  [
    'ephox.katamari.api.Global'
  ],

  function (Global) {
    /** path :: ([String], JsObj?) -> JsObj */
    var path = function (parts, scope) {
      var o = scope !== undefined ? scope : Global;
      for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
        o = o[parts[i]];
      return o;
    };

    /** resolve :: (String, JsObj?) -> JsObj */
    var resolve = function (p, scope) {
      var parts = p.split('.');
      return path(parts, scope);
    };

    /** step :: (JsObj, String) -> JsObj */
    var step = function (o, part) {
      if (o[part] === undefined || o[part] === null)
        o[part] = {};
      return o[part];
    };

    /** forge :: ([String], JsObj?) -> JsObj */
    var forge = function (parts, target) {
      var o = target !== undefined ? target : Global;      
      for (var i = 0; i < parts.length; ++i)
        o = step(o, parts[i]);
      return o;
    };

    /** namespace :: (String, JsObj?) -> JsObj */
    var namespace = function (name, target) {
      var parts = name.split('.');
      return forge(parts, target);
    };

    return {
      path: path,
      resolve: resolve,
      forge: forge,
      namespace: namespace
    };
  }
);


define(
  'ephox.sand.util.Global',

  [
    'ephox.katamari.api.Resolve'
  ],

  function (Resolve) {
    var unsafe = function (name, scope) {
      return Resolve.resolve(name, scope);
    };

    var getOrDie = function (name, scope) {
      var actual = unsafe(name, scope);

      if (actual === undefined) throw name + ' not available on this browser';
      return actual;
    };

    return {
      getOrDie: getOrDie
    };
  }
);
define(
  'ephox.sand.api.Node',

  [
    'ephox.sand.util.Global'
  ],

  function (Global) {
    /*
     * MDN says (yes) for IE, but it's undefined on IE8
     */
    var node = function () {
      var f = Global.getOrDie('Node');
      return f;
    };

    /*
     * Most of numerosity doesn't alter the methods on the object.
     * We're making an exception for Node, because bitwise and is so easy to get wrong.
     *
     * Might be nice to ADT this at some point instead of having individual methods.
     */

    var compareDocumentPosition = function (a, b, match) {
      // Returns: 0 if e1 and e2 are the same node, or a bitmask comparing the positions
      // of nodes e1 and e2 in their documents. See the URL below for bitmask interpretation
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
      return (a.compareDocumentPosition(b) & match) !== 0;
    };

    var documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
    };

    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
    };

    return {
      documentPositionPreceding: documentPositionPreceding,
      documentPositionContainedBy: documentPositionContainedBy
    };
  }
);
define(
  'ephox.katamari.api.Thunk',

  [
  ],

  function () {

    var cached = function (f) {
      var called = false;
      var r;
      return function() {
        if (!called) {
          called = true;
          r = f.apply(null, arguments);
        }
        return r;
      };
    };

    return {
      cached: cached
    };
  }
);

defineGlobal("global!Number", Number);
define(
  'ephox.sand.detect.Version',

  [
    'ephox.katamari.api.Arr',
    'global!Number',
    'global!String'
  ],

  function (Arr, Number, String) {
    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s)) return x;
      }
      return undefined;
    };

    var find = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r) return { major : 0, minor : 0 };
      var group = function(i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu(group(1), group(2));
    };

    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();

      if (versionRegexes.length === 0) return unknown();
      return find(versionRegexes, cleanedAgent);
    };

    var unknown = function () {
      return nu(0, 0);
    };

    var nu = function (major, minor) {
      return { major: major, minor: minor };
    };

    return {
      nu: nu,
      detect: detect,
      unknown: unknown
    };
  }
);
define(
  'ephox.sand.core.Browser',

  [
    'ephox.katamari.api.Fun',
    'ephox.sand.detect.Version'
  ],

  function (Fun, Version) {
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

    var unknown = function () {
      return nu({
        current: undefined,
        version: Version.unknown()
      });
    };

    var nu = function (info) {
      var current = info.current;
      var version = info.version;

      return {
        current: current,
        version: version,

        // INVESTIGATE: Rename to Edge ?
        isEdge: isBrowser(edge, current),
        isChrome: isBrowser(chrome, current),
        // NOTE: isIe just looks too weird
        isIE: isBrowser(ie, current),
        isOpera: isBrowser(opera, current),
        isFirefox: isBrowser(firefox, current),
        isSafari: isBrowser(safari, current)
      };
    };

    return {
      unknown: unknown,
      nu: nu,
      edge: Fun.constant(edge),
      chrome: Fun.constant(chrome),
      ie: Fun.constant(ie),
      opera: Fun.constant(opera),
      firefox: Fun.constant(firefox),
      safari: Fun.constant(safari)
    };
  }
);
define(
  'ephox.sand.core.OperatingSystem',

  [
    'ephox.katamari.api.Fun',
    'ephox.sand.detect.Version'
  ],

  function (Fun, Version) {
    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';

    // Though there is a bit of dupe with this and Browser, trying to 
    // reuse code makes it much harder to follow and change.
    var isOS = function (name, current) {
      return function () {
        return current === name;
      };
    };

    var unknown = function () {
      return nu({
        current: undefined,
        version: Version.unknown()
      });
    };

    var nu = function (info) {
      var current = info.current;
      var version = info.version;

      return {
        current: current,
        version: version,

        isWindows: isOS(windows, current),
        // TODO: Fix capitalisation
        isiOS: isOS(ios, current),
        isAndroid: isOS(android, current),
        isOSX: isOS(osx, current),
        isLinux: isOS(linux, current),
        isSolaris: isOS(solaris, current),
        isFreeBSD: isOS(freebsd, current)
      };
    };

    return {
      unknown: unknown,
      nu: nu,

      windows: Fun.constant(windows),
      ios: Fun.constant(ios),
      android: Fun.constant(android),
      linux: Fun.constant(linux),
      osx: Fun.constant(osx),
      solaris: Fun.constant(solaris),
      freebsd: Fun.constant(freebsd)
    };
  }
);
define(
  'ephox.sand.detect.DeviceType',

  [
    'ephox.katamari.api.Fun'
  ],

  function (Fun) {
    return function (os, browser, userAgent) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isAndroid3 = os.isAndroid() && os.version.major === 3;
      var isAndroid4 = os.isAndroid() && os.version.major === 4;
      var isTablet = isiPad || isAndroid3 || ( isAndroid4 && /mobile/i.test(userAgent) === true );
      var isTouch = os.isiOS() || os.isAndroid();
      var isPhone = isTouch && !isTablet;

      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;

      return {
        isiPad : Fun.constant(isiPad),
        isiPhone: Fun.constant(isiPhone),
        isTablet: Fun.constant(isTablet),
        isPhone: Fun.constant(isPhone),
        isTouch: Fun.constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: Fun.constant(iOSwebview)
      };
    };
  }
);
define(
  'ephox.sand.detect.UaString',

  [
    'ephox.katamari.api.Arr',
    'ephox.sand.detect.Version',
    'global!String'
  ],

  function (Arr, Version, String) {
    var detect = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return Arr.find(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };

    // They (browser and os) are the same at the moment, but they might
    // not stay that way.
    var detectBrowser = function (browsers, userAgent) {
      return detect(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };

    var detectOs = function (oses, userAgent) {
      return detect(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };

    return {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    };
  }
);
define(
  'ephox.katamari.str.StrAppend',

  [

  ],

  function () {
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
 
    return {
      addToStart: addToStart,
      addToEnd: addToEnd,
      removeFromStart: removeFromStart,
      removeFromEnd: removeFromEnd
    };
  }
);
define(
  'ephox.katamari.str.StringParts',

  [
    'ephox.katamari.api.Option',
    'global!Error'
  ],

  function (Option, Error) {
    /** Return the first 'count' letters from 'str'.
-     *  e.g. first("abcde", 2) === "ab"
-     */
    var first = function(str, count) {
     return str.substr(0, count);
    };

    /** Return the last 'count' letters from 'str'.
    *  e.g. last("abcde", 2) === "de"
    */
    var last = function(str, count) {
     return str.substr(str.length - count, str.length);
    };

    var head = function(str) {
      return str === '' ? Option.none() : Option.some(str.substr(0, 1));
    };

    var tail = function(str) {
      return str === '' ? Option.none() : Option.some(str.substring(1));
    };

    return {
      first: first,
      last: last,
      head: head,
      tail: tail
    };
  }
);
define(
  'ephox.katamari.api.Strings',

  [
    'ephox.katamari.str.StrAppend',
    'ephox.katamari.str.StringParts',
    'global!Error'
  ],

  function (StrAppend, StringParts, Error) {
    var checkRange = function(str, substr, start) {
      if (substr === '') return true;
      if (str.length < substr.length) return false;
      var x = str.substr(start, start + substr.length);
      return x === substr;
    };

    /** Given a string and object, perform template-replacements on the string, as specified by the object.
     * Any template fields of the form ${name} are replaced by the string or number specified as obj["name"]
     * Based on Douglas Crockford's 'supplant' method for template-replace of strings. Uses different template format.
     */
    var supplant = function(str, obj) {
      var isStringOrNumber = function(a) {
        var t = typeof a;
        return t === 'string' || t === 'number';
      };

      return str.replace(/\${([^{}]*)}/g,
        function (a, b) {
          var value = obj[b];
          return isStringOrNumber(value) ? value : a;
        }
      );
    };

    var removeLeading = function (str, prefix) {
      return startsWith(str, prefix) ? StrAppend.removeFromStart(str, prefix.length) : str;
    };

    var removeTrailing = function (str, prefix) {
      return endsWith(str, prefix) ? StrAppend.removeFromEnd(str, prefix.length) : str;
    };

    var ensureLeading = function (str, prefix) {
      return startsWith(str, prefix) ? str : StrAppend.addToStart(str, prefix);
    };

    var ensureTrailing = function (str, prefix) {
      return endsWith(str, prefix) ? str : StrAppend.addToEnd(str, prefix);
    };
 
    var contains = function(str, substr) {
      return str.indexOf(substr) !== -1;
    };

    var capitalize = function(str) {
      return StringParts.head(str).bind(function (head) {
        return StringParts.tail(str).map(function (tail) {
          return head.toUpperCase() + tail;
        });
      }).getOr(str);
    };

    /** Does 'str' start with 'prefix'?
     *  Note: all strings start with the empty string.
     *        More formally, for all strings x, startsWith(x, "").
     *        This is so that for all strings x and y, startsWith(y + x, y)
     */
    var startsWith = function(str, prefix) {
      return checkRange(str, prefix, 0);
    };

    /** Does 'str' end with 'suffix'?
     *  Note: all strings end with the empty string.
     *        More formally, for all strings x, endsWith(x, "").
     *        This is so that for all strings x and y, endsWith(x + y, y)
     */
    var endsWith = function(str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };

   
    /** removes all leading and trailing spaces */
    var trim = function(str) {
      return str.replace(/^\s+|\s+$/g, '');
    };

    var lTrim = function(str) {
      return str.replace(/^\s+/g, '');
    };

    var rTrim = function(str) {
      return str.replace(/\s+$/g, '');
    };

    return {
      supplant: supplant,
      startsWith: startsWith,
      removeLeading: removeLeading,
      removeTrailing: removeTrailing,
      ensureLeading: ensureLeading,
      ensureTrailing: ensureTrailing,
      endsWith: endsWith,
      contains: contains,
      trim: trim,
      lTrim: lTrim,
      rTrim: rTrim,
      capitalize: capitalize
    };
  }
);

define(
  'ephox.sand.info.PlatformInfo',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Strings'
  ],

  function (Fun, Strings) {
    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;

    var checkContains = function (target) {
      return function (uastring) {
        return Strings.contains(uastring, target);
      };
    };

    var browsers = [
      {
        name : 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          var monstrosity = Strings.contains(uastring, 'edge/') && Strings.contains(uastring, 'chrome') && Strings.contains(uastring, 'safari') && Strings.contains(uastring, 'applewebkit');
          return monstrosity;
        }
      },
      {
        name : 'Chrome',
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, normalVersionRegex],
        search : function (uastring) {
          return Strings.contains(uastring, 'chrome') && !Strings.contains(uastring, 'chromeframe');
        }
      },
      {
        name : 'IE',
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: function (uastring) {
          return Strings.contains(uastring, 'msie') || Strings.contains(uastring, 'trident');
        }
      },
      // INVESTIGATE: Is this still the Opera user agent?
      {
        name : 'Opera',
        versionRegexes: [normalVersionRegex, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search : checkContains('opera')
      },
      {
        name : 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search : checkContains('firefox')
      },
      {
        name : 'Safari',
        versionRegexes: [normalVersionRegex, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search : function (uastring) {
          return (Strings.contains(uastring, 'safari') || Strings.contains(uastring, 'mobile/')) && Strings.contains(uastring, 'applewebkit');
        }
      }
    ];

    var oses = [
      {
        name : 'Windows',
        search : checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name : 'iOS',
        search : function (uastring) {
          return Strings.contains(uastring, 'iphone') || Strings.contains(uastring, 'ipad');
        },
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
      },
      {
        name : 'Android',
        search : checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name : 'OSX',
        search : checkContains('os x'),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name : 'Linux',
        search : checkContains('linux'),
        versionRegexes: [ ]
      },
      { name : 'Solaris',
        search : checkContains('sunos'),
        versionRegexes: [ ]
      },
      {
       name : 'FreeBSD',
       search : checkContains('freebsd'),
       versionRegexes: [ ]
      }
    ];

    return {
      browsers: Fun.constant(browsers),
      oses: Fun.constant(oses)
    };
  }
);
define(
  'ephox.sand.core.PlatformDetection',

  [
    'ephox.sand.core.Browser',
    'ephox.sand.core.OperatingSystem',
    'ephox.sand.detect.DeviceType',
    'ephox.sand.detect.UaString',
    'ephox.sand.info.PlatformInfo'
  ],

  function (Browser, OperatingSystem, DeviceType, UaString, PlatformInfo) {
    var detect = function (userAgent) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();

      var browser = UaString.detectBrowser(browsers, userAgent).fold(
        Browser.unknown,
        Browser.nu
      );
      var os = UaString.detectOs(oses, userAgent).fold(
        OperatingSystem.unknown,
        OperatingSystem.nu
      );
      var deviceType = DeviceType(os, browser, userAgent);

      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };

    return {
      detect: detect
    };
  }
);
defineGlobal("global!navigator", navigator);
define(
  'ephox.sand.api.PlatformDetection',

  [
    'ephox.katamari.api.Thunk',
    'ephox.sand.core.PlatformDetection',
    'global!navigator'
  ],

  function (Thunk, PlatformDetection, navigator) {
    var detect = Thunk.cached(function () {
      var userAgent = navigator.userAgent;
      return PlatformDetection.detect(userAgent);
    });

    return {
      detect: detect
    };
  }
);
define(
  'ephox.sugar.api.dom.Compare',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.sand.api.Node',
    'ephox.sand.api.PlatformDetection',
    'ephox.sugar.api.search.Selectors'
  ],

  function (Arr, Fun, Node, PlatformDetection, Selectors) {

    var eq = function (e1, e2) {
      return e1.dom() === e2.dom();
    };

    var isEqualNode = function (e1, e2) {
      return e1.dom().isEqualNode(e2.dom());
    };

    var member = function (element, elements) {
      return Arr.exists(elements, Fun.curry(eq, element));
    };

    // DOM contains() method returns true if e1===e2, we define our contains() to return false (a node does not contain itself).
    var regularContains = function (e1, e2) {
      var d1 = e1.dom(), d2 = e2.dom();
      return d1 === d2 ? false : d1.contains(d2);
    };

    var ieContains = function (e1, e2) {
      // IE only implements the contains() method for Element nodes.
      // It fails for Text nodes, so implement it using compareDocumentPosition()
      // https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect
      // Note that compareDocumentPosition returns CONTAINED_BY if 'e2 *is_contained_by* e1':
      // Also, compareDocumentPosition defines a node containing itself as false.
      return Node.documentPositionContainedBy(e1.dom(), e2.dom());
    };

    var browser = PlatformDetection.detect().browser;

    // Returns: true if node e1 contains e2, otherwise false.
    // (returns false if e1===e2: A node does not contain itself).
    var contains = browser.isIE() ? ieContains : regularContains;

    return {
      eq: eq,
      isEqualNode: isEqualNode,
      member: member,
      contains: contains,

      // Only used by DomUniverse. Remove (or should Selectors.is move here?)
      is: Selectors.is
    };
  }
);

define(
  'ephox.sugar.api.search.Traverse',

  [
    'ephox.katamari.api.Type',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Struct',
    'ephox.sugar.alien.Recurse',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element'
  ],

  function (Type, Arr, Fun, Option, Struct, Recurse, Compare, Element) {
    // The document associated with the current element
    var owner = function (element) {
      return Element.fromDom(element.dom().ownerDocument);
    };

    var documentElement = function (element) {
      // TODO: Avoid unnecessary wrap/unwrap here
      var doc = owner(element);
      return Element.fromDom(doc.dom().documentElement);
    };

    // The window element associated with the element
    var defaultView = function (element) {
      var el = element.dom();
      var defaultView = el.ownerDocument.defaultView;
      return Element.fromDom(defaultView);
    };

    var parent = function (element) {
      var dom = element.dom();
      return Option.from(dom.parentNode).map(Element.fromDom);
    };

    var findIndex = function (element) {
      return parent(element).bind(function (p) {
        // TODO: Refactor out children so we can avoid the constant unwrapping
        var kin = children(p);
        return Arr.findIndex(kin, function (elem) {
          return Compare.eq(element, elem);
        });
      });
    };

    var parents = function (element, isRoot) {
      var stop = Type.isFunction(isRoot) ? isRoot : Fun.constant(false);

      // This is used a *lot* so it needs to be performant, not recursive
      var dom = element.dom();
      var ret = [];

      while (dom.parentNode !== null && dom.parentNode !== undefined) {
        var rawParent = dom.parentNode;
        var parent = Element.fromDom(rawParent);
        ret.push(parent);

        if (stop(parent) === true) break;
        else dom = rawParent;
      }
      return ret;
    };

    var siblings = function (element) {
      // TODO: Refactor out children so we can just not add self instead of filtering afterwards
      var filterSelf = function (elements) {
        return Arr.filter(elements, function (x) {
          return !Compare.eq(element, x);
        });
      };

      return parent(element).map(children).map(filterSelf).getOr([]);
    };

    var offsetParent = function (element) {
      var dom = element.dom();
      return Option.from(dom.offsetParent).map(Element.fromDom);
    };

    var prevSibling = function (element) {
      var dom = element.dom();
      return Option.from(dom.previousSibling).map(Element.fromDom);
    };

    var nextSibling = function (element) {
      var dom = element.dom();
      return Option.from(dom.nextSibling).map(Element.fromDom);
    };

    var prevSiblings = function (element) {
      // This one needs to be reversed, so they're still in DOM order
      return Arr.reverse(Recurse.toArray(element, prevSibling));
    };

    var nextSiblings = function (element) {
      return Recurse.toArray(element, nextSibling);
    };

    var children = function (element) {
      var dom = element.dom();
      return Arr.map(dom.childNodes, Element.fromDom);
    };

    var child = function (element, index) {
      var children = element.dom().childNodes;
      return Option.from(children[index]).map(Element.fromDom);
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

    var spot = Struct.immutable('element', 'offset');
    var leaf = function (element, offset) {
      var cs = children(element);
      return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
    };

    return {
      owner: owner,
      defaultView: defaultView,
      documentElement: documentElement,
      parent: parent,
      findIndex: findIndex,
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
  }
);

define(
  'ephox.snooker.util.LayerSelector',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.search.Selectors',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Arr, Fun, Selectors, Traverse) {
    var firstLayer = function (scope, selector) {
      return filterFirstLayer(scope, selector, Fun.constant(true));
    };

    var filterFirstLayer = function (scope, selector, predicate) {
      return Arr.bind(Traverse.children(scope), function (x) {
        return Selectors.is(x, selector) ?
          predicate(x) ? [ x ] : [ ]
          : filterFirstLayer(x, selector, predicate);
      });
    };

    return {
      firstLayer: firstLayer,
      filterFirstLayer: filterFirstLayer
    };
  }
);
define(
  'ephox.sugar.api.node.Node',

  [
    'ephox.sugar.api.node.NodeTypes'
  ],

  function (NodeTypes) {
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
      return type(element) === NodeTypes.COMMENT || name(element) === '#comment';
    };

    var isElement = isType(NodeTypes.ELEMENT);
    var isText = isType(NodeTypes.TEXT);
    var isDocument = isType(NodeTypes.DOCUMENT);

    return {
      name: name,
      type: type,
      value: value,
      isElement: isElement,
      isText: isText,
      isDocument: isDocument,
      isComment: isComment
    };
  }
);

define(
  'ephox.sugar.api.properties.Attr',

  [
    'ephox.katamari.api.Type',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Obj',
    'ephox.sugar.api.node.Node',
    'global!Error',
    'global!console'
  ],

  /*
   * Direct attribute manipulation has been around since IE8, but
   * was apparently unstable until IE10.
   */
  function (Type, Arr, Obj, Node, Error, console) {
    var rawSet = function (dom, key, value) {
      /*
       * JQuery coerced everything to a string, and silently did nothing on text node/null/undefined.
       *
       * We fail on those invalid cases, only allowing numbers and booleans.
       */
      if (Type.isString(value) || Type.isBoolean(value) || Type.isNumber(value)) {
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
      Obj.each(attrs, function (v, k) {
        rawSet(dom, k, v);
      });
    };

    var get = function (element, key) {
      var v = element.dom().getAttribute(key);

      // undefined is the more appropriate value for JS, and this matches JQuery
      return v === null ? undefined : v;
    };

    var has = function (element, key) {
      var dom = element.dom();

      // return false for non-element nodes, no point in throwing an error
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
      return Arr.foldl(element.dom().attributes, function (acc, attr) {
        acc[attr.name] = attr.value;
        return acc;
      }, {});
    };

    var transferOne = function (source, destination, attr) {
      // NOTE: We don't want to clobber any existing attributes
      if (has(source, attr) && !has(destination, attr)) set(destination, attr, get(source, attr));        
    };

    // Transfer attributes(attrs) from source to destination, unless they are already present
    var transfer = function (source, destination, attrs) {
      if (!Node.isElement(source) || !Node.isElement(destination)) return;
      Arr.each(attrs, function (attr) {
        transferOne(source, destination, attr);
      });
    };

    return {
      clone: clone,
      set: set,
      setAll: setAll,
      get: get,
      has: has,
      remove: remove,
      hasNone: hasNone,
      transfer: transfer
    };
  }
);

define(
  'ephox.sugar.api.node.Body',

  [
    'ephox.katamari.api.Thunk',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'global!document'
  ],

  function (Thunk, Element, Node, document) {

    // Node.contains() is very, very, very good performance
    // http://jsperf.com/closest-vs-contains/5
    var inBody = function (element) {
      // Technically this is only required on IE, where contains() returns false for text nodes.
      // But it's cheap enough to run everywhere and Sugar doesn't have platform detection (yet).
      var dom = Node.isText(element) ? element.dom().parentNode : element.dom();

      // use ownerDocument.body to ensure this works inside iframes.
      // Normally contains is bad because an element "contains" itself, but here we want that.
      return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
    };

    var body = Thunk.cached(function() {
      return getBody(Element.fromDom(document));
    });

    var getBody = function (doc) {
      var body = doc.dom().body;
      if (body === null || body === undefined) throw 'Body is not available yet';
      return Element.fromDom(body);
    };

    return {
      body: body,
      getBody: getBody,
      inBody: inBody
    };
  }
);

define(
  'ephox.sugar.api.search.PredicateFilter',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.node.Body',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Arr, Body, Traverse) {
    // maybe TraverseWith, similar to traverse but with a predicate?

    var all = function (predicate) {
      return descendants(Body.body(), predicate);
    };

    var ancestors = function (scope, predicate, isRoot) {
      return Arr.filter(Traverse.parents(scope, isRoot), predicate);
    };

    var siblings = function (scope, predicate) {
      return Arr.filter(Traverse.siblings(scope), predicate);
    };

    var children = function (scope, predicate) {
      return Arr.filter(Traverse.children(scope), predicate);
    };

    var descendants = function (scope, predicate) {
      var result = [];

      // Recurse.toArray() might help here
      Arr.each(Traverse.children(scope), function (x) {
        if (predicate(x)) {
          result = result.concat([ x ]);
        }
        result = result.concat(descendants(x, predicate));
      });
      return result;
    };

    return {
      all: all,
      ancestors: ancestors,
      siblings: siblings,
      children: children,
      descendants: descendants
    };
  }
);

define(
  'ephox.sugar.api.search.SelectorFilter',

  [
    'ephox.sugar.api.search.PredicateFilter',
    'ephox.sugar.api.search.Selectors'
  ],

  function (PredicateFilter, Selectors) {
    var all = function (selector) {
      return Selectors.all(selector);
    };

    // For all of the following:
    //
    // jQuery does siblings of firstChild. IE9+ supports scope.dom().children (similar to Traverse.children but elements only).
    // Traverse should also do this (but probably not by default).
    //

    var ancestors = function (scope, selector, isRoot) {
      // It may surprise you to learn this is exactly what JQuery does
      // TODO: Avoid all this wrapping and unwrapping
      return PredicateFilter.ancestors(scope, function (e) {
        return Selectors.is(e, selector);
      }, isRoot);
    };

    var siblings = function (scope, selector) {
      // It may surprise you to learn this is exactly what JQuery does
      // TODO: Avoid all the wrapping and unwrapping
      return PredicateFilter.siblings(scope, function (e) {
        return Selectors.is(e, selector);
      });
    };

    var children = function (scope, selector) {
      // It may surprise you to learn this is exactly what JQuery does
      // TODO: Avoid all the wrapping and unwrapping
      return PredicateFilter.children(scope, function (e) {
        return Selectors.is(e, selector);
      });
    };

    var descendants = function (scope, selector) {
      return Selectors.all(selector, scope);
    };

    return {
      all: all,
      ancestors: ancestors,
      siblings: siblings,
      children: children,
      descendants: descendants
    };
  }
);

define(
  'ephox.sugar.impl.ClosestOrAncestor',

  [
    'ephox.katamari.api.Type',
    'ephox.katamari.api.Option'
  ],

  function (Type, Option) {
    return function (is, ancestor, scope, a, isRoot) {
      return is(scope, a) ?
              Option.some(scope) :
              Type.isFunction(isRoot) && isRoot(scope) ?
                  Option.none() :
                  ancestor(scope, a, isRoot);
    };
  }
);
define(
  'ephox.sugar.api.search.PredicateFind',

  [
    'ephox.katamari.api.Type',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.node.Body',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.impl.ClosestOrAncestor'
  ],

  function (Type, Arr, Fun, Option, Body, Compare, Element, ClosestOrAncestor) {
    var first = function (predicate) {
      return descendant(Body.body(), predicate);
    };

    var ancestor = function (scope, predicate, isRoot) {
      var element = scope.dom();
      var stop = Type.isFunction(isRoot) ? isRoot : Fun.constant(false);

      while (element.parentNode) {
        element = element.parentNode;
        var el = Element.fromDom(element);

        if (predicate(el)) return Option.some(el);
        else if (stop(el)) break;
      }
      return Option.none();
    };

    var closest = function (scope, predicate, isRoot) {
      // This is required to avoid ClosestOrAncestor passing the predicate to itself
      var is = function (scope) {
        return predicate(scope);
      };
      return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
    };

    var sibling = function (scope, predicate) {
      var element = scope.dom();
      if (!element.parentNode) return Option.none();

      return child(Element.fromDom(element.parentNode), function (x) {
        return !Compare.eq(scope, x) && predicate(x);
      });
    };

    var child = function (scope, predicate) {
      var result = Arr.find(scope.dom().childNodes,
        Fun.compose(predicate, Element.fromDom));
      return result.map(Element.fromDom);
    };

    var descendant = function (scope, predicate) {
      var descend = function (element) {
        for (var i = 0; i < element.childNodes.length; i++) {
          if (predicate(Element.fromDom(element.childNodes[i])))
            return Option.some(Element.fromDom(element.childNodes[i]));

          var res = descend(element.childNodes[i]);
          if (res.isSome())
            return res;
        }

        return Option.none();
      };

      return descend(scope.dom());
    };

    return {
      first: first,
      ancestor: ancestor,
      closest: closest,
      sibling: sibling,
      child: child,
      descendant: descendant
    };
  }
);

define(
  'ephox.sugar.api.search.SelectorFind',

  [
    'ephox.sugar.api.search.PredicateFind',
    'ephox.sugar.api.search.Selectors',
    'ephox.sugar.impl.ClosestOrAncestor'
  ],

  function (PredicateFind, Selectors, ClosestOrAncestor) {
    // TODO: An internal SelectorFilter module that doesn't Element.fromDom() everything

    var first = function (selector) {
      return Selectors.one(selector);
    };

    var ancestor = function (scope, selector, isRoot) {
      return PredicateFind.ancestor(scope, function (e) {
        return Selectors.is(e, selector);
      }, isRoot);
    };

    var sibling = function (scope, selector) {
      return PredicateFind.sibling(scope, function (e) {
        return Selectors.is(e, selector);
      });
    };

    var child = function (scope, selector) {
      return PredicateFind.child(scope, function (e) {
        return Selectors.is(e, selector);
      });
    };

    var descendant = function (scope, selector) {
      return Selectors.one(selector, scope);
    };

    // Returns Some(closest ancestor element (sugared)) matching 'selector' up to isRoot, or None() otherwise
    var closest = function (scope, selector, isRoot) {
      return ClosestOrAncestor(Selectors.is, ancestor, scope, selector, isRoot);
    };

    return {
      first: first,
      ancestor: ancestor,
      sibling: sibling,
      child: child,
      descendant: descendant,
      closest: closest
    };
  }
);

defineGlobal("global!parseInt", parseInt);
define(
  'ephox.snooker.api.TableLookup',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.Structs',
    'ephox.snooker.util.LayerSelector',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.search.Selectors',
    'ephox.sugar.api.search.Traverse',
    'global!parseInt'
  ],

  function (Arr, Fun, Option, Structs, LayerSelector, Attr, Node, SelectorFilter, SelectorFind, Selectors, Traverse, parseInt) {
    // lookup inside this table
    var lookup = function (tags, element, _isRoot) {
      var isRoot = _isRoot !== undefined ? _isRoot : Fun.constant(false);
      // If the element we're inspecting is the root, we definitely don't want it.
      if (isRoot(element)) return Option.none();
      // This looks a lot like SelectorFind.closest, with one big exception - the isRoot check.
      // The code here will look for parents if passed a table, SelectorFind.closest with that specific isRoot check won't.
      if (Arr.contains(tags, Node.name(element))) return Option.some(element);

      var isRootOrUpperTable = function (element) {
        return Selectors.is(element, 'table') || isRoot(element);
      };

      return SelectorFind.ancestor(element, tags.join(','), isRootOrUpperTable);
    };

    /*
     * Identify the optional cell that element represents.
     */
    var cell = function (element, isRoot) {
      return lookup([ 'td', 'th' ], element, isRoot);
    };

    var cells = function (ancestor) {
      return LayerSelector.firstLayer(ancestor, 'th,td');
    };

    var notCell = function (element, isRoot) {
      return lookup([ 'caption', 'tr', 'tbody', 'tfoot', 'thead' ], element, isRoot);
    };

    var neighbours = function (selector, element) {
      return Traverse.parent(element).map(function (parent) {
        return SelectorFilter.children(parent, selector);
      });
    };

    var neighbourCells = Fun.curry(neighbours, 'th,td');
    var neighbourRows  = Fun.curry(neighbours, 'tr');

    var firstCell = function (ancestor) {
      return SelectorFind.descendant(ancestor, 'th,td');
    };

    var table = function (element, isRoot) {
      return SelectorFind.closest(element, 'table', isRoot);
    };

    var row = function (element, isRoot) {
       return lookup([ 'tr' ], element, isRoot);
    };

    var rows = function (ancestor) {
      return LayerSelector.firstLayer(ancestor, 'tr');
    };

    var attr = function (element, property) {
      return parseInt(Attr.get(element, property), 10);
    };

    var grid = function (element, rowProp, colProp) {
      var rows = attr(element, rowProp);
      var cols = attr(element, colProp);
      return Structs.grid(rows, cols);
    };

    return {
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
      grid: grid
    };
  }
);

define(
  'ephox.snooker.model.DetailsList',

  [
    'ephox.katamari.api.Arr',
    'ephox.snooker.api.Structs',
    'ephox.snooker.api.TableLookup',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Arr, Structs, TableLookup, Attr, Node, Traverse) {

    /*
     * Takes a DOM table and returns a list of list of:
       element: row element
       cells: (id, rowspan, colspan) structs
     */
    var fromTable = function (table) {
      var rows = TableLookup.rows(table);
      return Arr.map(rows, function (row) {
        var element = row;

        var parent = Traverse.parent(element);
        var parentSection = parent.bind(function (parent) {
          var parentName = Node.name(parent);
          return (parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody') ? parentName : 'tbody';
        });

        var cells = Arr.map(TableLookup.cells(row), function (cell) {
          var rowspan = Attr.has(cell, 'rowspan') ? parseInt(Attr.get(cell, 'rowspan'), 10) : 1;
          var colspan = Attr.has(cell, 'colspan') ? parseInt(Attr.get(cell, 'colspan'), 10) : 1;
          return Structs.detail(cell, rowspan, colspan);
        });

        return Structs.rowdata(element, cells, parentSection);
      });
    };

    var fromPastedRows = function (rows, example) {
      return Arr.map(rows, function (row) {
        var cells = Arr.map(TableLookup.cells(row), function (cell) {
          var rowspan = Attr.has(cell, 'rowspan') ? parseInt(Attr.get(cell, 'rowspan'), 10) : 1;
          var colspan = Attr.has(cell, 'colspan') ? parseInt(Attr.get(cell, 'colspan'), 10) : 1;
          return Structs.detail(cell, rowspan, colspan);
        });

        return Structs.rowdata(row, cells, example.section());
      });
    };

    return {
      fromTable: fromTable,
      fromPastedRows: fromPastedRows
    };
  }
);

defineGlobal("global!Math", Math);
define(
  'ephox.snooker.model.Warehouse',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.Structs',
    'global!Math'
  ],

  function (Arr, Fun, Option, Structs, Math) {
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
      var all = Arr.bind(warehouse.all(), function (r) { return r.cells(); });
      return Arr.filter(all, predicate);
    };

    /*
     * From a list of list of Detail, generate three pieces of information:
     *  1. the grid size
     *  2. a data structure which can efficiently identify which cell is in which row,column position
     *  3. a list of all cells in order left-to-right, top-to-bottom
     */
    var generate = function (list) {
      // list is an array of objects, made by cells and elements
      // elements: is the TR
      // cells: is an array of objects representing the cells in the row.
      //        It is made of:
      //          colspan (merge cell)
      //          element
      //          rowspan (merge cols)
      var access = {};
      var cells = [];

      var maxRows = list.length;
      var maxColumns = 0;

      Arr.each(list, function (details, r) {
        var currentRow = [];
        Arr.each(details.cells(), function (detail, c) {
          var start = 0;

          // If this spot has been taken by a previous rowspan, skip it.
          while (access[key(r, start)] !== undefined) {
            start++;
          }

          var current = Structs.extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);

          // Occupy all the (row, column) positions that this cell spans for.
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

        cells.push(Structs.rowdata(details.element(), currentRow, details.section()));
      });

      var grid = Structs.grid(maxRows, maxColumns);

      return {
        grid: Fun.constant(grid),
        access: Fun.constant(access),
        all: Fun.constant(cells)
      };
    };

    var justCells = function (warehouse) {
      var rows = Arr.map(warehouse.all(), function (w) {
        return w.cells();
      });

      return Arr.flatten(rows);
    };

    return {
      generate: generate,
      getAt: getAt,
      findItem: findItem,
      filterItems: filterItems,
      justCells: justCells
    };
  }
);

define(
  'ephox.sugar.impl.Style',

  [

  ],

  function () {
    // some elements, such as mathml, don't have style attributes
    var isSupported = function (dom) {
      return dom.style !== undefined;
    };

    return {
      isSupported: isSupported
    };
  }
);
defineGlobal("global!window", window);
define(
  'ephox.sugar.api.properties.Css',

  [
    'ephox.katamari.api.Type',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Obj',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.node.Body',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.impl.Style',
    'ephox.katamari.api.Strings',
    'global!Error',
    'global!console',
    'global!window'
  ],

  function (Type, Arr, Obj, Option, Attr, Body, Element, Node, Style, Strings, Error, console, window) {
    var internalSet = function (dom, property, value) {
      // This is going to hurt. Apologies.
      // JQuery coerces numbers to pixels for certain property names, and other times lets numbers through.
      // we're going to be explicit; strings only.
      if (!Type.isString(value)) {
        console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
      }

      // removed: support for dom().style[property] where prop is camel case instead of normal property name
      if (Style.isSupported(dom)) dom.style.setProperty(property, value);
    };

    var internalRemove = function (dom, property) {
      /*
       * IE9 and above - MDN doesn't have details, but here's a couple of random internet claims
       *
       * http://help.dottoro.com/ljopsjck.php
       * http://stackoverflow.com/a/7901886/7546
       */
      if (Style.isSupported(dom)) dom.style.removeProperty(property);
    };

    var set = function (element, property, value) {
      var dom = element.dom();
      internalSet(dom, property, value);
    };

    var setAll = function (element, css) {
      var dom = element.dom();

      Obj.each(css, function (v, k) {
        internalSet(dom, k, v);
      });
    };

    var setOptions = function(element, css) {
      var dom = element.dom();

      Obj.each(css, function (v, k) {
        v.fold(function () {
          internalRemove(dom, k);
        }, function (value) {
          internalSet(dom, k, value);
        });
      });
    };

    /*
     * NOTE: For certain properties, this returns the "used value" which is subtly different to the "computed value" (despite calling getComputedStyle).
     * Blame CSS 2.0.
     *
     * https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
     */
    var get = function (element, property) {
      var dom = element.dom();
      /*
       * IE9 and above per
       * https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle
       *
       * Not in numerosity, because it doesn't memoize and looking this up dynamically in performance critical code would be horrendous.
       *
       * JQuery has some magic here for IE popups, but we don't really need that.
       * It also uses element.ownerDocument.defaultView to handle iframes but that hasn't been required since FF 3.6.
       */
      var styles = window.getComputedStyle(dom);
      var r = styles.getPropertyValue(property);

      // jquery-ism: If r is an empty string, check that the element is not in a document. If it isn't, return the raw value.
      // Turns out we do this a lot.
      var v = (r === '' && !Body.inBody(element)) ? getUnsafeProperty(dom, property) : r;

      // undefined is the more appropriate value for JS. JQuery coerces to an empty string, but screw that!
      return v === null ? undefined : v;
    };

    var getUnsafeProperty = function (dom, property) {
      // removed: support for dom().style[property] where prop is camel case instead of normal property name
      // empty string is what the browsers (IE11 and Chrome) return when the propertyValue doesn't exists.
      return Style.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    };

    /*
     * Gets the raw value from the style attribute. Useful for retrieving "used values" from the DOM:
     * https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
     *
     * Returns NONE if the property isn't set, or the value is an empty string.
     */
    var getRaw = function (element, property) {
      var dom = element.dom();
      var raw = getUnsafeProperty(dom, property);

      return Option.from(raw).filter(function (r) { return r.length > 0; });
    };

    var getAllRaw = function (element) {
      var css = {};
      var dom = element.dom();

      if (Style.isSupported(dom)) {
        for (var i = 0; i < dom.style.length; i++) {
          var ruleName = dom.style.item(i);
          css[ruleName] = dom.style[ruleName];
        }
      }
      return css;
    };

    var isValidValue = function (tag, property, value) {
      var element = Element.fromTag(tag);
      set(element, property, value);
      var style = getRaw(element, property);
      return style.isSome();
    };

    var remove = function (element, property) {
      var dom = element.dom();

      internalRemove(dom, property);

      if (Attr.has(element, 'style') && Strings.trim(Attr.get(element, 'style')) === '') {
        // No more styles left, remove the style attribute as well
        Attr.remove(element, 'style');
      }
    };

    var preserve = function (element, f) {
      var oldStyles = Attr.get(element, 'style');
      var result = f(element);
      var restore = oldStyles === undefined ? Attr.remove : Attr.set;
      restore(element, 'style', oldStyles);
      return result;
    };

    var copy = function (source, target) {
      var sourceDom = source.dom();
      var targetDom = target.dom();
      if (Style.isSupported(sourceDom) && Style.isSupported(targetDom)) {
        targetDom.style.cssText = sourceDom.style.cssText;
      }
    };

    var reflow = function (e) {
      /* NOTE:
       * do not rely on this return value.
       * It's here so the closure compiler doesn't optimise the property access away.
       */
      return e.dom().offsetWidth;
    };

    var transferOne = function (source, destination, style) {
      getRaw(source, style).each(function (value) {
        // NOTE: We don't want to clobber any existing inline styles.
        if (getRaw(destination, style).isNone()) set(destination, style, value);
      });
    };

    var transfer = function (source, destination, styles) {
      if (!Node.isElement(source) || !Node.isElement(destination)) return;
      Arr.each(styles, function (style) {
        transferOne(source, destination, style);
      });
    };

    return {
      copy: copy,
      set: set,
      preserve: preserve,
      setAll: setAll,
      setOptions: setOptions,
      remove: remove,
      get: get,
      getRaw: getRaw,
      getAllRaw: getAllRaw,
      isValidValue: isValidValue,
      reflow: reflow,
      transfer: transfer
    };
  }
);

define(
  'ephox.sugar.api.dom.Insert',

  [
    'ephox.sugar.api.search.Traverse'
  ],

  function (Traverse) {
    var before = function (marker, element) {
      var parent = Traverse.parent(marker);
      parent.each(function (v) {
        v.dom().insertBefore(element.dom(), marker.dom());
      });
    };

    var after = function (marker, element) {
      var sibling = Traverse.nextSibling(marker);
      sibling.fold(function () {
        var parent = Traverse.parent(marker);
        parent.each(function (v) {
          append(v, element);
        });
      }, function (v) {
        before(v, element);
      });
    };

    var prepend = function (parent, element) {
      var firstChild = Traverse.firstChild(parent);
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
      Traverse.child(parent, index).fold(function () {
        append(parent, element);
      }, function (v) {
        before(v, element);
      });
    };

    var wrap = function (element, wrapper) {
      before(element, wrapper);
      append(wrapper, element);
    };

    return {
      before: before,
      after: after,
      prepend: prepend,
      append: append,
      appendAt: appendAt,
      wrap: wrap
    };
  }
);

define(
  'ephox.sugar.api.dom.InsertAll',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.dom.Insert'
  ],

  function (Arr, Insert) {
    var before = function (marker, elements) {
      Arr.each(elements, function (x) {
        Insert.before(marker, x);
      });
    };

    var after = function (marker, elements) {
      Arr.each(elements, function (x, i) {
        var e = i === 0 ? marker : elements[i - 1];
        Insert.after(e, x);
      });
    };

    var prepend = function (parent, elements) {
      Arr.each(elements.slice().reverse(), function (x) {
        Insert.prepend(parent, x);
      });
    };

    var append = function (parent, elements) {
      Arr.each(elements, function (x) {
        Insert.append(parent, x);
      });
    };

    return {
      before: before,
      after: after,
      prepend: prepend,
      append: append
    };
  }
);

define(
  'ephox.sugar.api.dom.Remove',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Arr, InsertAll, Traverse) {
    var empty = function (element) {
      // shortcut "empty node" trick. Requires IE 9.
      element.dom().textContent = '';

      // If the contents was a single empty text node, the above doesn't remove it. But, it's still faster in general
      // than removing every child node manually.
      // The following is (probably) safe for performance as 99.9% of the time the trick works and
      // Traverse.children will return an empty array.
      Arr.each(Traverse.children(element), function (rogue) {
        remove(rogue);
      });
    };

    var remove = function (element) {
      var dom = element.dom();
      if (dom.parentNode !== null)
        dom.parentNode.removeChild(dom);
    };

    var unwrap = function (wrapper) {
      var children = Traverse.children(wrapper);
      if (children.length > 0)
        InsertAll.before(wrapper, children);
      remove(wrapper);
    };

    return {
      empty: empty,
      remove: remove,
      unwrap: unwrap
    };
  }
);

define(
  'ephox.snooker.api.CopySelected',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Obj',
    'ephox.katamari.api.Struct',
    'ephox.snooker.model.DetailsList',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.util.LayerSelector',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.search.Selectors'
  ],

  function (Arr, Obj, Struct, DetailsList, Warehouse, LayerSelector, Attr, Css, Element, Insert, Remove, Selectors) {
    var stats = Struct.immutable('minRow', 'minCol', 'maxRow', 'maxCol');

    var findSelectedStats = function (house, isSelected) {
      var totalColumns = house.grid().columns();
      var totalRows = house.grid().rows();

      /* Refactor into a method returning a struct to hide the mutation */
      var minRow = totalRows;
      var minCol = totalColumns;
      var maxRow = 0;
      var maxCol = 0;
      Obj.each(house.access(), function (detail) {
        if (isSelected(detail)) {
          var startRow = detail.row();
          var endRow = startRow + detail.rowspan() - 1;
          var startCol = detail.column();
          var endCol = startCol + detail.colspan() - 1;
          if (startRow < minRow) minRow = startRow;
          else if (endRow > maxRow) maxRow = endRow;

          if (startCol < minCol) minCol = startCol;
          else if (endCol > maxCol) maxCol = endCol;
        }
      });
      return stats(minRow, minCol, maxRow, maxCol);
    };

    var makeCell = function (list, seenSelected, rowIndex) {
      // no need to check bounds, as anything outside this index is removed in the nested for loop
      var row = list[rowIndex].element();
      var td = Element.fromTag('td');
      Insert.append(td, Element.fromTag('br'));
      var f = seenSelected ? Insert.append : Insert.prepend;
      f(row, td);
    };

    var fillInGaps = function (list, house, stats, isSelected) {
      var totalColumns = house.grid().columns();
      var totalRows = house.grid().rows();
      // unselected cells have been deleted, now fill in the gaps in the model
      for (var i = 0; i < totalRows; i++) {
        var seenSelected = false;
        for (var j = 0; j < totalColumns; j++) {
          if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
            // if there is a hole in the table itself, or it's an unselected position, we need a cell
            var needCell = Warehouse.getAt(house, i, j).filter(isSelected).isNone();
            if (needCell) makeCell(list, seenSelected, i);
            // if we didn't need a cell, this position must be selected, so set the flag
            else seenSelected = true;
          }
        }
      }
    };

    var clean = function (table, stats) {
      // can't use :empty selector as that will not include TRs made up of whitespace
      var emptyRows = Arr.filter(LayerSelector.firstLayer(table, 'tr'), function (row) {
        // there is no sugar method for this, and Traverse.children() does too much processing
        return row.dom().childElementCount === 0;
      });
      Arr.each(emptyRows, Remove.remove);

      // If there is only one column, or only one row, delete all the colspan/rowspan
      if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
        Arr.each(LayerSelector.firstLayer(table, 'th,td'), function (cell) {
          Attr.remove(cell, 'rowspan');
          Attr.remove(cell, 'colspan');
        });
      }

      Attr.remove(table, 'width');
      Attr.remove(table, 'height');
      Css.remove(table, 'width');
      Css.remove(table, 'height');
    };

    var extract = function (table, selectedSelector) {
      var isSelected = function (detail) {
        return Selectors.is(detail.element(), selectedSelector);
      };

      var list = DetailsList.fromTable(table);
      var house = Warehouse.generate(list);

      var stats = findSelectedStats(house, isSelected);

      // remove unselected cells
      var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
      var unselectedCells = LayerSelector.filterFirstLayer(table, 'th,td', function (cell) {
        return Selectors.is(cell, selector);
      });
      Arr.each(unselectedCells, Remove.remove);

      fillInGaps(list, house, stats, isSelected);

      clean(table, stats);

      return table;
    };

    return {
      extract: extract
    };
  }
);
define(
  'ephox.sugar.api.dom.Replication',

  [
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Attr, Element, Insert, InsertAll, Remove, Traverse) {
    var clone = function (original, deep) {
      return Element.fromDom(original.dom().cloneNode(deep));
    };

    /** Shallow clone - just the tag, no children */
    var shallow = function (original) {
      return clone(original, false);
    };

    /** Deep clone - everything copied including children */
    var deep = function (original) {
      return clone(original, true);
    };

    /** Shallow clone, with a new tag */
    var shallowAs = function (original, tag) {
      var nu = Element.fromTag(tag);

      var attributes = Attr.clone(original);
      Attr.setAll(nu, attributes);

      return nu;
    };

    /** Deep clone, with a new tag */
    var copy = function (original, tag) {
      var nu = shallowAs(original, tag);

      // NOTE
      // previously this used serialisation:
      // nu.dom().innerHTML = original.dom().innerHTML;
      //
      // Clone should be equivalent (and faster), but if TD <-> TH toggle breaks, put it back.

      var cloneChildren = Traverse.children(deep(original));
      InsertAll.append(nu, cloneChildren);

      return nu;
    };

    /** Change the tag name, but keep all children */
    var mutate = function (original, tag) {
      var nu = shallowAs(original, tag);

      Insert.before(original, nu);
      var children = Traverse.children(original);
      InsertAll.append(nu, children);
      Remove.remove(original);
      return nu;
    };

    return {
      shallow: shallow,
      shallowAs: shallowAs,
      deep: deep,
      copy: copy,
      mutate: mutate
    };
  }
);

define(
  'ephox.sugar.impl.NodeValue',

  [
    'ephox.sand.api.PlatformDetection',
    'ephox.katamari.api.Option',
    'global!Error'
  ],

  function (PlatformDetection, Option, Error) {
    return function (is, name) {
      var get = function (element) {
        if (!is(element)) throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
        return getOption(element).getOr('');
      };

      var getOptionIE10 = function (element) {
        // Prevent IE10 from throwing exception when setting parent innerHTML clobbers (TBIO-451).
        try {
          return getOptionSafe(element);
        } catch (e) {
          return Option.none();
        }
      };

      var getOptionSafe = function (element) {
        return is(element) ? Option.from(element.dom().nodeValue) : Option.none();
      };

      var browser = PlatformDetection.detect().browser;
      var getOption = browser.isIE() && browser.version.major === 10 ? getOptionIE10 : getOptionSafe;

      var set = function (element, value) {
        if (!is(element)) throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
        element.dom().nodeValue = value;
      };

      return {
        get: get,
        getOption: getOption,
        set: set
      };
    };
  }
);
define(
  'ephox.sugar.api.node.Text',

  [
    'ephox.sugar.api.node.Node',
    'ephox.sugar.impl.NodeValue'
  ],

  function (Node, NodeValue) {
    var api = NodeValue(Node.isText, 'text');

    var get = function (element) {
      return api.get(element);
    };

    var getOption = function (element) {
      return api.getOption(element);
    };

    var set = function (element, value) {
      api.set(element, value);
    };

    return {
      get: get,
      getOption: getOption,
      set: set
    };
  }
);

define(
  'ephox.sugar.api.selection.Awareness',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.node.Text',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Arr, Node, Text, Traverse) {
    var getEnd = function (element) {
      return Node.name(element) === 'img' ? 1 : Text.getOption(element).fold(function () {
        return Traverse.children(element).length;
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

    var NBSP = '\u00A0';

    var isTextNodeWithCursorPosition = function (el) {
      return Text.getOption(el).filter(function (text) {
        // For the purposes of finding cursor positions only allow text nodes with content,
        // but trim removes &nbsp; and that's allowed
        return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
      }).isSome();
    };

    var elementsWithCursorPosition = [ 'img', 'br' ];
    var isCursorPosition = function (elem) {
      var hasCursorPosition = isTextNodeWithCursorPosition(elem);
      return hasCursorPosition || Arr.contains(elementsWithCursorPosition, Node.name(elem));
    };

    return {
      getEnd: getEnd,
      isEnd: isEnd,
      isStart: isStart,
      isCursorPosition: isCursorPosition
    };
  }
);

define(
  'ephox.sugar.api.selection.CursorPosition',

  [
    'ephox.katamari.api.Option',
    'ephox.sugar.api.search.PredicateFind',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.Awareness'
  ],

  function (Option, PredicateFind, Traverse, Awareness) {
    var first = function (element) {
      return PredicateFind.descendant(element, Awareness.isCursorPosition);
    };

    var last = function (element) {
      return descendantRtl(element, Awareness.isCursorPosition);
    };

    // Note, sugar probably needs some RTL traversals.
    var descendantRtl = function (scope, predicate) {
      var descend = function (element) {
        var children = Traverse.children(element);
        for (var i = children.length - 1; i >= 0; i--) {
          var child = children[i];
          if (predicate(child)) return Option.some(child);
          var res = descend(child);
          if (res.isSome()) return res;
        }

        return Option.none();
      };

      return descend(scope);
    };

    return {
      first: first,
      last: last
    };
  }
);

define(
  'ephox.snooker.api.TableFill',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Obj',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.Replication',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.CursorPosition'
  ],

  function (Arr, Obj, Compare, Insert, Replication, Element, Node, Attr, Css, SelectorFilter, Traverse, CursorPosition) {
    // NOTE: This may create a td instead of a th, but it is for irregular table handling.
    var cell = function () {
      var td = Element.fromTag('td');
      Insert.append(td, Element.fromTag('br'));
      return td;
    };

    var replace = function (cell, tag, attrs) {
      var replica = Replication.copy(cell, tag);
      // TODO: Snooker passes null to indicate 'remove attribute'
      Obj.each(attrs, function (v, k) {
        if (v === null) Attr.remove(replica, k);
        else Attr.set(replica, k, v);
      });
      return replica;
    };

    var pasteReplace = function (cellContent) {
      // TODO: check for empty content and don't return anything
      return cellContent;
    };

    var newRow = function (doc) {
      return function () {
        return Element.fromTag('tr', doc.dom());
      };
    };

    var cloneFormats = function (oldCell, newCell, formats) {
      var first = CursorPosition.first(oldCell);
      return first.map(function (firstText) {
        var formatSelector = formats.join(',');
        // Find the ancestors of the first text node that match the given formats.
        var parents = SelectorFilter.ancestors(firstText, formatSelector, function (element) {
          return Compare.eq(element, oldCell);
        });
        // Add the matched ancestors to the new cell, then return the new cell.
        return Arr.foldr(parents, function (last, parent) {
          var clonedFormat = Replication.shallow(parent);
          Insert.append(last, clonedFormat);
          return clonedFormat;
        }, newCell);
      }).getOr(newCell);
    };

    var cellOperations = function (mutate, doc, formatsToClone) {
      var newCell = function (prev) {
        var doc = Traverse.owner(prev.element());
        var td = Element.fromTag(Node.name(prev.element()), doc.dom());

        var formats = formatsToClone.getOr(['strong', 'em', 'b', 'i', 'span', 'font', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div']);

        // If we aren't cloning the child formatting, we can just give back the new td immediately.
        var lastNode = formats.length > 0 ? cloneFormats(prev.element(), td, formats) : td;

        Insert.append(lastNode, Element.fromTag('br'))
        // inherit the style and width, dont inherit the row height
        Css.copy(prev.element(), td);
        Css.remove(td, 'height');
        // dont inherit the width of spanning columns
        if (prev.colspan() !== 1) Css.remove(prev.element(), 'width');
        mutate(prev.element(), td);
        return td;
      };

      return {
        row: newRow(doc),
        cell: newCell,
        replace: replace,
        gap: cell
      };
    };

    var paste = function (doc) {
      return {
        row: newRow(doc),
        cell: cell,
        replace: pasteReplace,
        gap: cell
      };
    };

    return {
      cellOperations: cellOperations,
      paste: paste
    };
  }
);
define(
  'ephox.sugar.api.node.Elements',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.search.Traverse',
    'global!document'
  ],

  function (Arr, Element, Traverse, document) {
    var fromHtml = function (html, scope) {
      var doc = scope || document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      return Traverse.children(Element.fromDom(div));
    };

    var fromTags = function (tags, scope) {
      return Arr.map(tags, function (x) {
        return Element.fromTag(x, scope);
      });
    };

    var fromText = function (texts, scope) {
      return Arr.map(texts, function (x) {
        return Element.fromText(x, scope);
      });
    };

    var fromDom = function (nodes) {
      return Arr.map(nodes, Element.fromDom);
    };

    return {
      fromHtml: fromHtml,
      fromTags: fromTags,
      fromText: fromText,
      fromDom: fromDom
    };
  }
);

define(
  'ephox.boss.common.TagBoundaries',

  [

  ],

  function () {
    // TODO: We need to consolidate this list. I think when we get rid of boss/universe, we can do it then.
    return [
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
  }
);

define(
  'ephox.boss.api.DomUniverse',

  [
    'ephox.boss.common.TagBoundaries',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.PredicateFilter',
    'ephox.sugar.api.search.PredicateFind',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.node.Text',
    'ephox.sugar.api.search.Traverse'
  ],

  function (TagBoundaries, Arr, Fun, Attr, Compare, Css, Element, Insert, InsertAll, Node, PredicateFilter, PredicateFind, Remove, SelectorFilter, SelectorFind, Text, Traverse) {
    return function () {
      var clone = function (element) {
        return Element.fromDom(element.dom().cloneNode(false));
      };

      var isBoundary = function (element) {
        if (!Node.isElement(element)) return false;
        if (Node.name(element) === 'body') return true;
        return Arr.contains(TagBoundaries, Node.name(element));
      };

      var isEmptyTag = function (element) {
        if (!Node.isElement(element)) return false;
        return Arr.contains(['br', 'img', 'hr', 'input'], Node.name(element));
      };

      var comparePosition = function (element, other) {
        return element.dom().compareDocumentPosition(other.dom());
      };

      var copyAttributesTo = function (source, destination) {
        var as = Attr.clone(source);
        Attr.setAll(destination, as);
      };

      return {
        up: Fun.constant({
          selector: SelectorFind.ancestor,
          closest: SelectorFind.closest,
          predicate: PredicateFind.ancestor,
          all: Traverse.parents
        }),
        down: Fun.constant({
          selector: SelectorFilter.descendants,
          predicate: PredicateFilter.descendants
        }),
        styles: Fun.constant({
          get: Css.get,
          getRaw: Css.getRaw,
          set: Css.set,
          remove: Css.remove
        }),
        attrs: Fun.constant({
          get: Attr.get,
          set: Attr.set,
          remove: Attr.remove,
          copyTo: copyAttributesTo
        }),
        insert: Fun.constant({
          before: Insert.before,
          after: Insert.after,
          afterAll: InsertAll.after,
          append: Insert.append,
          appendAll: InsertAll.append,
          prepend: Insert.prepend,
          wrap: Insert.wrap
        }),
        remove: Fun.constant({
          unwrap: Remove.unwrap,
          remove: Remove.remove
        }),
        create: Fun.constant({
          nu: Element.fromTag,
          clone: clone,
          text: Element.fromText
        }),
        query: Fun.constant({
          comparePosition: comparePosition,
          prevSibling: Traverse.prevSibling,
          nextSibling: Traverse.nextSibling
        }),
        property: Fun.constant({
          children: Traverse.children,
          name: Node.name,
          parent: Traverse.parent,
          isText: Node.isText,
          isComment: Node.isComment,
          isElement: Node.isElement,
          getText: Text.get,
          setText: Text.set,
          isBoundary: isBoundary,
          isEmptyTag: isEmptyTag
        }),
        eq: Compare.eq,
        is: Compare.is
      };
    };
  }
);

define(
  'ephox.robin.parent.Breaker',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Struct'
  ],

  function (Arr, Fun, Option, Struct) {
    var leftRight = Struct.immutable('left', 'right');

    var bisect = function (universe, parent, child) {
      var children = universe.property().children(parent);
      var index = Arr.findIndex(children, Fun.curry(universe.eq, child));
      return index.map(function (ind) {
        return {
          before: Fun.constant(children.slice(0, ind)),
          after: Fun.constant(children.slice(ind + 1))
        };
      });
    };

    /**
     * Clone parent to the RIGHT and move everything after child in the parent element into
     * a clone of the parent (placed after parent).
     */
    var breakToRight = function (universe, parent, child) {
      return bisect(universe, parent, child).map(function (parts) {
        var second = universe.create().clone(parent);
        universe.insert().appendAll(second, parts.after());
        universe.insert().after(parent, second);
        return leftRight(parent, second);
      });
    };

    /**
     * Clone parent to the LEFT and move everything before and including child into
     * the a clone of the parent (placed before parent)
     */
    var breakToLeft = function (universe, parent, child) {
      return bisect(universe, parent, child).map(function (parts) {
        var prior = universe.create().clone(parent);
        universe.insert().appendAll(prior, parts.before().concat([ child ]));
        universe.insert().appendAll(parent, parts.after());
        universe.insert().before(parent, prior);
        return leftRight(prior, parent);
      });
    };

    /*
     * Using the breaker, break from the child up to the top element defined by the predicate.
     * It returns three values:
     *   first: the top level element that completed the break
     *   second: the optional element representing second part of the top-level split if the breaking completed successfully to the top
     *   splits: a list of (Element, Element) pairs that represent the splits that have occurred on the way to the top.
     */
    var breakPath = function (universe, item, isTop, breaker) {
      var result = Struct.immutable('first', 'second', 'splits');

      var next = function (child, group, splits) {
        var fallback = result(child, Option.none(), splits);
        // Found the top, so stop.
        if (isTop(child)) return result(child, group, splits);
        else {
          // Split the child at parent, and keep going
          return universe.property().parent(child).bind(function (parent) {
            return breaker(universe, parent, child).map(function (breakage) {
              var extra = [{ first: breakage.left, second: breakage.right }];
              // Our isTop is based on the left-side parent, so keep it regardless of split.
              var nextChild = isTop(parent) ? parent : breakage.left();
              return next(nextChild, Option.some(breakage.right()), splits.concat(extra));
            }).getOr(fallback);
          });
        }
      };

      return next(item, Option.none(), []);
    };

    return {
      breakToLeft: breakToLeft,
      breakToRight: breakToRight,
      breakPath: breakPath
    };
  }
);

define(
  'ephox.robin.parent.Shared',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option'
  ],

  function (Arr, Fun, Option) {
    var all = function (universe, look, elements, f) {
      var head = elements[0];
      var tail = elements.slice(1);
      return f(universe, look, head, tail);
    };

    /**
     * Check if look returns the same element for all elements, and return it if it exists.
     */
    var oneAll = function (universe, look, elements) {
      return elements.length > 0 ?
        all(universe, look, elements, unsafeOne) :
        Option.none();
    };

    var unsafeOne = function (universe, look, head, tail) {
      var start = look(universe, head);
      return Arr.foldr(tail, function (b, a) {
        var current = look(universe, a);
        return commonElement(universe, b, current);
      }, start);
    };

    var commonElement = function (universe, start, end) {
      return start.bind(function (s) {
        return end.filter(Fun.curry(universe.eq, s));
      });
    };

    return {
      oneAll: oneAll
    };
  }
);

define(
  'ephox.robin.parent.Subset',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'global!Math'
  ],

  function (Arr, Fun, Option, Math) {
    var eq = function (universe, item) {
      return Fun.curry(universe.eq, item);
    };

    var unsafeSubset = function (universe, common, ps1, ps2) {
      var children = universe.property().children(common);
      if (universe.eq(common, ps1[0])) return Option.some([ ps1[0] ]);
      if (universe.eq(common, ps2[0])) return Option.some([ ps2[0] ]);

      var finder = function (ps) {
        // ps is calculated bottom-up, but logically we're searching top-down
        var topDown = Arr.reverse(ps);

        // find the child of common in the ps array
        var index = Arr.findIndex(topDown, eq(universe, common)).getOr(-1);
        var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];

        // find the index of that child in the common children
        return Arr.findIndex(children, eq(universe, item));
      };

      var startIndex = finder(ps1);
      var endIndex = finder(ps2);

      // Return all common children between first and last
      return startIndex.bind(function (sIndex) {
        return endIndex.map(function (eIndex) {
          // This is required because the range could be backwards.
          var first = Math.min(sIndex, eIndex);
          var last = Math.max(sIndex, eIndex);

          return children.slice(first, last + 1);
        });
      });
    };

    // Note: this can be exported if it is required in the future.
    var ancestors = function (universe, start, end, _isRoot) {
      // Inefficient if no isRoot is supplied.
      var isRoot = _isRoot !== undefined ? _isRoot : Fun.constant(false);
      // TODO: Andy knows there is a graph-based algorithm to find a common parent, but can't remember it
      //        This also includes something to get the subset after finding the common parent
      var ps1 = [start].concat(universe.up().all(start));
      var ps2 = [end].concat(universe.up().all(end));

      var prune = function (path) {
        var index = Arr.findIndex(path, isRoot);
        return index.fold(function () {
          return path;
        }, function (ind) {
          return path.slice(0, ind + 1);
        });
      };

      var pruned1 = prune(ps1);
      var pruned2 = prune(ps2);

      var shared = Arr.find(pruned1, function (x) {
        return Arr.exists(pruned2, eq(universe, x));
      });

      return {
        firstpath: Fun.constant(pruned1),
        secondpath: Fun.constant(pruned2),
        shared: Fun.constant(shared)
      };
    };

    /**
     * Find the common element in the parents of start and end.
     *
     * Then return all children of the common element such that start and end are included.
     */
    var subset = function (universe, start, end) {
      var ancs = ancestors(universe, start, end);
      return ancs.shared().bind(function (shared) {
        return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
      });
    };

    return {
      subset: subset,
      ancestors: ancestors
    };
  }
);

define(
  'ephox.robin.api.general.Parent',

  [
    'ephox.robin.parent.Breaker',
    'ephox.robin.parent.Shared',
    'ephox.robin.parent.Subset'
  ],

  /**
   * Documentation is in the actual implementations.
   */
  function (Breaker, Shared, Subset) {
    var sharedOne = function (universe, look, elements) {
      return Shared.oneAll(universe, look, elements);
    };

    var subset = function (universe, start, finish) {
      return Subset.subset(universe, start, finish);
    };

    var ancestors = function (universe, start, finish, _isRoot) {
      return Subset.ancestors(universe, start, finish, _isRoot);
    };

    var breakToLeft = function (universe, parent, child) {
      return Breaker.breakToLeft(universe, parent, child);
    };

    var breakToRight = function (universe, parent, child) {
      return Breaker.breakToRight(universe, parent, child);
    };

    var breakPath = function (universe, child, isTop, breaker) {
      return Breaker.breakPath(universe, child, isTop, breaker);
    };

    return {
      sharedOne: sharedOne,
      subset: subset,
      ancestors: ancestors,
      breakToLeft: breakToLeft,
      breakToRight: breakToRight,
      breakPath: breakPath
    };
  }
);

define(
  'ephox.robin.api.dom.DomParent',

  [
    'ephox.boss.api.DomUniverse',
    'ephox.robin.api.general.Parent'
  ],

  /**
   * Documentation is in the actual implementations.
   */
  function (DomUniverse, Parent) {
    var universe = DomUniverse();

    var sharedOne = function (look, elements) {
      return Parent.sharedOne(universe, function (universe, element) {
        return look(element);
      }, elements);
    };

    var subset = function (start, finish) {
      return Parent.subset(universe, start, finish);
    };

    var ancestors = function (start, finish, _isRoot) {
      return Parent.ancestors(universe, start, finish, _isRoot);
    };

    var breakToLeft = function (parent, child) {
      return Parent.breakToLeft(universe, parent, child);
    };

    var breakToRight = function (parent, child) {
      return Parent.breakToRight(universe, parent, child);
    };

    var breakPath = function (child, isTop, breaker) {
      return Parent.breakPath(universe, child, isTop, function (u, p, c) {
        return breaker(p, c);
      });
    };

    return {
      sharedOne: sharedOne,
      subset: subset,
      ancestors: ancestors,
      breakToLeft: breakToLeft,
      breakToRight: breakToRight,
      breakPath: breakPath
    };
  }
);

define(
  'ephox.snooker.selection.CellBounds',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.snooker.model.Warehouse'
  ],

  function (Fun, Option, Warehouse) {
    var inSelection = function (bounds, detail) {
      var leftEdge = detail.column();
      var rightEdge = detail.column() + detail.colspan() - 1;
      var topEdge = detail.row();
      var bottomEdge = detail.row() + detail.rowspan() - 1;
      return (
        leftEdge <= bounds.finishCol() && rightEdge >= bounds.startCol()
      ) && (
        topEdge <= bounds.finishRow() && bottomEdge >= bounds.startRow()
      );
    };

    // Note, something is *within* if it is completely contained within the bounds.
    var isWithin = function (bounds, detail) {
      return (
        detail.column() >= bounds.startCol() &&
        (detail.column() + detail.colspan() - 1) <= bounds.finishCol() &&
        detail.row() >= bounds.startRow() &&
        (detail.row() + detail.rowspan() - 1) <= bounds.finishRow()
      );
    };

    var isRectangular = function (warehouse, bounds) {
      var isRect = true;
      var detailIsWithin = Fun.curry(isWithin, bounds);

      for (var i = bounds.startRow(); i<=bounds.finishRow(); i++) {
        for (var j = bounds.startCol(); j<=bounds.finishCol(); j++) {
          isRect = isRect && Warehouse.getAt(warehouse, i, j).exists(detailIsWithin);
        }
      }

      return isRect ? Option.some(bounds) : Option.none();
    };


    return {
      inSelection: inSelection,
      isWithin: isWithin,
      isRectangular: isRectangular
    };
  }
);
define(
  'ephox.snooker.selection.CellGroup',

  [
    'ephox.snooker.api.Structs',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.selection.CellBounds',
    'ephox.sugar.api.dom.Compare',
    'global!Math'
  ],

  function (Structs, Warehouse, CellBounds, Compare, Math) {
    var getBounds = function (detailA, detailB) {
      return Structs.bounds(
        Math.min(detailA.row(), detailB.row()),
        Math.min(detailA.column(), detailB.column()),
        Math.max(detailA.row() + detailA.rowspan() - 1 , detailB.row() + detailB.rowspan() - 1),
        Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1)
      );
    };

    var getAnyBox = function (warehouse, startCell, finishCell) {
      var startCoords = Warehouse.findItem(warehouse, startCell, Compare.eq);
      var finishCoords = Warehouse.findItem(warehouse, finishCell, Compare.eq);
      return startCoords.bind(function (sc) {
        return finishCoords.map(function (fc) {
          return getBounds(sc, fc);
        });
      });
    };

    var getBox = function (warehouse, startCell, finishCell) {
      return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
        return CellBounds.isRectangular(warehouse, bounds);
      });
    };

    return {
      getAnyBox: getAnyBox,
      getBox: getBox
    };
  }
);
define(
  'ephox.snooker.selection.CellFinder',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.selection.CellBounds',
    'ephox.snooker.selection.CellGroup',
    'ephox.sugar.api.dom.Compare'
  ],

  function (Arr, Fun, Warehouse, CellBounds, CellGroup, Compare) {
    var moveBy = function (warehouse, cell, row, column) {
      return Warehouse.findItem(warehouse, cell, Compare.eq).bind(function (detail) {
        var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
        var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
        var dest = Warehouse.getAt(warehouse, startRow + row, startCol + column);
        return dest.map(function (d) { return d.element(); });
      });
    };

    var intercepts = function (warehouse, start, finish) {
      return CellGroup.getAnyBox(warehouse, start, finish).map(function (bounds) {
        var inside = Warehouse.filterItems(warehouse, Fun.curry(CellBounds.inSelection, bounds));
        return Arr.map(inside, function (detail) {
          return detail.element();
        });
      });
    };

    var parentCell = function (warehouse, innerCell) {
      var isContainedBy = function (c1, c2) {
        return Compare.contains(c2, c1);
      };
      return Warehouse.findItem(warehouse, innerCell, isContainedBy).bind(function (detail) {
        return detail.element();
      });
    };

    return {
      moveBy: moveBy,
      intercepts: intercepts,
      parentCell: parentCell
    };
  }
);
define(
  'ephox.snooker.api.TablePositions',

  [
    'ephox.snooker.api.TableLookup',
    'ephox.snooker.model.DetailsList',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.selection.CellFinder',
    'ephox.snooker.selection.CellGroup',
    'ephox.sugar.api.dom.Compare'
  ],

  function (TableLookup, DetailsList, Warehouse, CellFinder, CellGroup, Compare) {
    var moveBy = function (cell, deltaRow, deltaColumn) {
      return TableLookup.table(cell).bind(function (table) {
        var warehouse = getWarehouse(table);
        return CellFinder.moveBy(warehouse, cell, deltaRow, deltaColumn);
      });
    };

    var intercepts = function (table, first, last) {
      var warehouse = getWarehouse(table);
      return CellFinder.intercepts(warehouse, first, last);
    };

    var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
      var warehouse = getWarehouse(table);
      var startCell = Compare.eq(table, firstTable) ? first : CellFinder.parentCell(warehouse, first);
      var lastCell = Compare.eq(table, lastTable) ? last : CellFinder.parentCell(warehouse, last);
      return CellFinder.intercepts(warehouse, startCell, lastCell);
    };

    var getBox = function (table, first, last) {
      var warehouse = getWarehouse(table);
      return CellGroup.getBox(warehouse, first, last);
    };

    // Private method ... keep warehouse in snooker, please.
    var getWarehouse = function (table) {
      var list = DetailsList.fromTable(table);
      return Warehouse.generate(list);
    };

    return {
      moveBy: moveBy,
      intercepts: intercepts,
      nestedIntercepts: nestedIntercepts,
      getBox: getBox
    };
  }
);
define(
  'ephox.darwin.selection.CellSelection',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.robin.api.dom.DomParent',
    'ephox.snooker.api.TablePositions',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.search.Selectors'
  ],

  function (Arr, Fun, Option, DomParent, TablePositions, Compare, SelectorFilter, SelectorFind, Selectors) {
    var lookupTable = function (container, isRoot) {
      return SelectorFind.ancestor(container, 'table');
    };

    var identify = function (start, finish, isRoot) {
      // Optimisation: If the cells are equal, it's a single cell array
      if (Compare.eq(start, finish)) {
        return Option.some([ start ]);
      } else {
        return lookupTable(start, isRoot).bind(function (startTable) {
          return lookupTable(finish, isRoot).bind(function (finishTable) {
            if (Compare.eq(startTable, finishTable)) { // Selecting from within the same table.
              return TablePositions.intercepts(startTable, start, finish);
            } else if (Compare.contains(startTable, finishTable)) { // Selecting from the parent table to the nested table.
              return TablePositions.nestedIntercepts(startTable, start, startTable, finish, finishTable);
            } else if (Compare.contains(finishTable, startTable)) { // Selecting from the nested table to the parent table.
              return TablePositions.nestedIntercepts(finishTable, start, startTable, finish, finishTable);
            } else { // Selecting from a nested table to a different nested table.
              return DomParent.ancestors(start, finish).shared().bind(function (lca) {
                return SelectorFind.closest(lca, 'table', isRoot).bind(function (lcaTable) {
                  return TablePositions.nestedIntercepts(lcaTable, start, startTable, finish, finishTable);
                });
              });
            }
          });
        });
      }
    };

    var retrieve = function (container, selector) {
      var sels = SelectorFilter.descendants(container, selector);
      return sels.length > 0 ? Option.some(sels) : Option.none();
    };

    var getLast = function (boxes, lastSelectedSelector) {
      return Arr.find(boxes, function (box) {
        return Selectors.is(box, lastSelectedSelector);
      });
    };

    var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
      return SelectorFind.descendant(container, firstSelectedSelector).bind(function (first) {
        return SelectorFind.descendant(container, lastSelectedSelector).bind(function (last) {
          return DomParent.sharedOne(lookupTable, [ first, last ]).map(function (tbl) {
            return {
              first: Fun.constant(first),
              last: Fun.constant(last),
              table: Fun.constant(tbl)
            };
          });
        });
      });
    };

    var expandTo = function (finish, firstSelectedSelector) {
      return SelectorFind.ancestor(finish, 'table').bind(function (table) {
        return SelectorFind.descendant(table, firstSelectedSelector).bind(function (start) {
          return identify(start, finish).map(function (boxes) {
            return {
              boxes: Fun.constant(boxes),
              start: Fun.constant(start),
              finish: Fun.constant(finish)
            };
          });
        });
      });
    };

    var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
      return getLast(boxes, lastSelectedSelector).bind(function (last) {
        return TablePositions.moveBy(last, deltaRow, deltaColumn).bind(function (finish) {
          return expandTo(finish, firstSelectedSelector);
        });
      });
    };

    return {
      identify: identify,
      retrieve: retrieve,
      shiftSelection: shiftSelection,
      getEdges: getEdges
    };
  }
);
define(
  'ephox.darwin.api.TableSelection',

  [
    'ephox.darwin.selection.CellSelection',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.TablePositions',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.SelectorFind'
  ],

  function (CellSelection, Option, TablePositions, Compare, SelectorFind) {
    // Explictly calling CellSelection.retrieve so that we can see the API signature.
    var retrieve = function (container, selector) {
      return CellSelection.retrieve(container, selector);
    };

    var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
      return CellSelection.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
        var isRoot = function (ancestor) {
          return Compare.eq(container, ancestor);
        };
        var firstAncestor = SelectorFind.ancestor(edges.first(), 'thead,tfoot,tbody,table', isRoot);
        var lastAncestor = SelectorFind.ancestor(edges.last(), 'thead,tfoot,tbody,table', isRoot);
        return firstAncestor.bind(function (fA) {
          return lastAncestor.bind(function (lA) {
            return Compare.eq(fA, lA) ? TablePositions.getBox(edges.table(), edges.first(), edges.last()) : Option.none();
          });
        });
      });
    };

    return {
      retrieve: retrieve,
      retrieveBox: retrieveBox
    };
  }
);
/**
 * Ephemera.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.selection.Ephemera',

  [
    'ephox.katamari.api.Fun'
  ],

  function (Fun) {
    var selected = 'data-mce-selected';
    var selectedSelector = 'td[' + selected + '],th[' + selected + ']';
    // used with not selectors
    var attributeSelector = '[' + selected + ']';
    var firstSelected = 'data-mce-first-selected';
    var firstSelectedSelector = 'td[' + firstSelected + '],th[' + firstSelected + ']';
    var lastSelected = 'data-mce-last-selected';
    var lastSelectedSelector = 'td[' + lastSelected + '],th[' + lastSelected + ']';
    return {
      selected: Fun.constant(selected),
      selectedSelector: Fun.constant(selectedSelector),
      attributeSelector: Fun.constant(attributeSelector),
      firstSelected: Fun.constant(firstSelected),
      firstSelectedSelector: Fun.constant(firstSelectedSelector),
      lastSelected: Fun.constant(lastSelected),
      lastSelectedSelector: Fun.constant(lastSelectedSelector)
    };
  }
);

define(
  'ephox.katamari.api.Adt',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Obj',
    'ephox.katamari.api.Type',
    'global!Array',
    'global!Error',
    'global!console'
  ],

  function (Arr, Obj, Type, Array, Error, console) {
    /*
     * Generates a church encoded ADT (https://en.wikipedia.org/wiki/Church_encoding)
     * For syntax and use, look at the test code.
     */
    var generate = function (cases) {
      // validation
      if (!Type.isArray(cases)) {
        throw new Error('cases must be an array');
      }
      if (cases.length === 0) {
        throw new Error('there must be at least one case');
      }

      var constructors = [ ];

      // adt is mutated to add the individual cases
      var adt = {};
      Arr.each(cases, function (acase, count) {
        var keys = Obj.keys(acase);

        // validation
        if (keys.length !== 1) {
          throw new Error('one and only one name per case');
        }

        var key = keys[0];
        var value = acase[key];

        // validation
        if (adt[key] !== undefined) {
          throw new Error('duplicate key detected:' + key);
        } else if (key === 'cata') {
          throw new Error('cannot have a case named cata (sorry)');
        } else if (!Type.isArray(value)) {
          // this implicitly checks if acase is an object
          throw new Error('case arguments must be an array');
        }

        constructors.push(key);
        //
        // constructor for key
        //
        adt[key] = function () {
          var argLength = arguments.length;

          // validation
          if (argLength !== value.length) {
            throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
          }

          // Don't use array slice(arguments), makes the whole function unoptimisable on Chrome
          var args = new Array(argLength);
          for (var i = 0; i < args.length; i++) args[i] = arguments[i];


          var match = function (branches) {
            var branchKeys = Obj.keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }

            var allReqd = Arr.forall(constructors, function (reqKey) {
              return Arr.contains(branchKeys, reqKey);
            });

            if (!allReqd) throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));

            return branches[key].apply(null, args);
          };

          //
          // the fold function for key
          //
          return {
            fold: function (/* arguments */) {
              // runtime validation
              if (arguments.length !== cases.length) {
                throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
              }
              var target = arguments[count];
              return target.apply(null, args);
            },
            match: match,

            // NOTE: Only for debugging.
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
    return {
      generate: generate
    };
  }
);
/**
 * SelectionTypes.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.selection.SelectionTypes',

  [
    'ephox.katamari.api.Adt'
  ],

  function (Adt) {
    var type = Adt.generate([
      { none: [] },
      { multiple: [ 'elements' ] },
      { single: [ 'selection' ] }
    ]);

    var cata = function (subject, onNone, onMultiple, onSingle) {
      return subject.fold(onNone, onMultiple, onSingle);
    };

    return {
      cata: cata,
      none: type.none,
      multiple: type.multiple,
      single: type.single
    };
  }
);
/**
 * CellOperations.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.queries.CellOperations',

  [
    'ephox.darwin.api.TableSelection',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.properties.Attr',
    'tinymce.plugins.table.selection.Ephemera',
    'tinymce.plugins.table.selection.SelectionTypes'
  ],

  function (TableSelection, Arr, Fun, Option, Attr, Ephemera, SelectionTypes) {
    // Return an array of the selected elements
    var selection = function (cell, selections) {
      return SelectionTypes.cata(selections.get(),
        Fun.constant([]),
        Fun.identity,
        Fun.constant([ cell ])
      );
    };

    var unmergable = function (cell, selections) {
      var hasSpan = function (elem) {
        return (Attr.has(elem, 'rowspan') && parseInt(Attr.get(elem, 'rowspan'), 10) > 1) ||
               (Attr.has(elem, 'colspan') && parseInt(Attr.get(elem, 'colspan'), 10) > 1);
      };

      var candidates = selection(cell, selections);

      return candidates.length > 0 && Arr.forall(candidates, hasSpan) ? Option.some(candidates) : Option.none();
    };

    var mergable = function (table, selections) {
      return SelectionTypes.cata(selections.get(),
        Option.none,
        function (cells, _env) {
          if (cells.length === 0) {
            return Option.none();
          }
          return TableSelection.retrieveBox(table, Ephemera.firstSelectedSelector(), Ephemera.lastSelectedSelector()).bind(function (bounds) {
            return cells.length > 1 ? Option.some({
              bounds: Fun.constant(bounds),
              cells: Fun.constant(cells)
            }) : Option.none();
          });
        },
        Option.none
      );
    };

    return {
      mergable: mergable,
      unmergable: unmergable,
      selection: selection
    };
  }
);
/**
 * TableTargets.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.queries.TableTargets',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Struct',
    'tinymce.plugins.table.queries.CellOperations'
  ],

  function (Fun, Option, Struct, CellOperations) {
    var noMenu = function (cell) {
      return {
        element: Fun.constant(cell),
        mergable: Option.none,
        unmergable: Option.none,
        selection: Fun.constant([cell])
      };
    };

    var forMenu = function (selections, table, cell) {
      return {
        element: Fun.constant(cell),
        mergable: Fun.constant(CellOperations.mergable(table, selections)),
        unmergable: Fun.constant(CellOperations.unmergable(cell, selections)),
        selection: Fun.constant(CellOperations.selection(cell, selections))
      };
    };

    var notCell = function (element) {
      return noMenu(element);
    };

    var paste = Struct.immutable('element', 'clipboard', 'generators');

    var pasteRows = function (selections, table, cell, clipboard, generators) {
      return {
        element: Fun.constant(cell),
        mergable: Option.none,
        unmergable: Option.none,
        selection: Fun.constant(CellOperations.selection(cell, selections)),
        clipboard: Fun.constant(clipboard),
        generators: Fun.constant(generators)
      };
    };

    return {
      noMenu: noMenu,
      forMenu: forMenu,
      notCell: notCell,
      paste: paste,
      pasteRows: pasteRows
    };
  }
);
/**
 * Clipboard.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.actions.Clipboard',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.CopySelected',
    'ephox.snooker.api.TableFill',
    'ephox.snooker.api.TableLookup',
    'ephox.sugar.api.dom.Replication',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Elements',
    'ephox.sugar.api.node.Node',
    'tinymce.plugins.table.queries.TableTargets',
    'tinymce.plugins.table.selection.Ephemera',
    'tinymce.plugins.table.selection.SelectionTypes'
  ],

  function (Arr, Fun, Option, CopySelected, TableFill, TableLookup, Replication, Element, Elements, Node, TableTargets, Ephemera, SelectionTypes) {
    var extractSelected = function (cells) {
      // Assume for now that we only have one table (also handles the case where we multi select outside a table)
      return TableLookup.table(cells[0]).map(Replication.deep).map(function (replica) {
        return [ CopySelected.extract(replica, Ephemera.attributeSelector()) ];
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
            e.content = Arr.map(elements, function (elm) {
              return serializeElement(editor, elm);
            }).join('');
          });
        };

        if (e.selection === true) {
          SelectionTypes.cata(selections.get(), Fun.noop, multiCellContext, Fun.noop);
        }
      });

      editor.on('BeforeSetContent', function (e) {
        if (e.selection === true && e.paste === true) {
          var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
          cellOpt.each(function (domCell) {
            var cell = Element.fromDom(domCell);
            var table = TableLookup.table(cell);
            table.bind(function (table) {

              var elements = Arr.filter(Elements.fromHtml(e.content), function (content) {
                return Node.name(content) !== 'meta';
              });

              if (elements.length === 1 && Node.name(elements[0]) === 'table') {
                e.preventDefault();

                var doc = Element.fromDom(editor.getDoc());
                var generators = TableFill.paste(doc);
                var targets = TableTargets.paste(cell, elements[0], generators);
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

    return {
      registerEvents: registerEvents
    };
  }
);

define(
  'ephox.snooker.operate.Render',

  [
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.InsertAll'
  ],

  function (Attr, Css, Element, Insert, InsertAll) {
    var makeTable = function () {
      return Element.fromTag('table');
    };

    var tableBody = function () {
      return Element.fromTag('tbody');
    }

    var tableRow = function () {
      return Element.fromTag('tr');
    };

    var tableHeaderCell = function () {
      return Element.fromTag('th');
    };

    var tableCell = function () {
      return Element.fromTag('td');
    };

    var render = function (rows, columns, rowHeaders, columnHeaders) {

      var table = makeTable();
      Css.setAll(table, {
        'border-collapse': 'collapse',
        width: '100%'
      });
      Attr.set(table, 'border', '1');

      var tbody = tableBody();
      Insert.append(table, tbody);

      var trs = [];
      for (var i = 0; i < rows; i++) {
        var tr = tableRow();
        for (var j = 0; j < columns; j++) {

          var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
          if (j < columnHeaders) { Attr.set(td, 'scope', 'row'); }
          if (i < rowHeaders) { Attr.set(td, 'scope', 'col'); }

          // Note, this is a placeholder so that the cells have height. The unicode character didn't work in IE10.
          Insert.append(td, Element.fromTag('br'));
          Css.set(td, 'width', (100 / columns) + '%');
          Insert.append(tr, td);
        }
        trs.push(tr);
      }

      InsertAll.append(tbody, trs);
      return table;
    };

    return {
      render: render
    };

  }
);

define(
  'ephox.snooker.api.TableRender',

  [
    'ephox.snooker.operate.Render'
  ],

  function (Render) {
    return {
      render: Render.render
    };
  }
);

define(
  'ephox.sugar.api.properties.Html',

  [
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Elements',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Element, Elements, Insert, InsertAll, Remove, Traverse) {
    var get = function (element) {
      return element.dom().innerHTML;
    };

    var set = function (element, content) {
      var owner = Traverse.owner(element);
      var docDom = owner.dom();

      // FireFox has *terrible* performance when using innerHTML = x
      var fragment = Element.fromDom(docDom.createDocumentFragment());
      var contentElements = Elements.fromHtml(content, docDom);
      InsertAll.append(fragment, contentElements);

      Remove.empty(element);
      Insert.append(element, fragment);
    };

    var getOuter = function (element) {
      var container = Element.fromTag('div');
      var clone = Element.fromDom(element.dom().cloneNode(true));
      Insert.append(container, clone);
      return get(container);
    };

    return {
      get: get,
      set: set,
      getOuter: getOuter
    };
  }
);

/**
 * InsertTable.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.actions.InsertTable',

  [
    'ephox.katamari.api.Fun',
    'ephox.snooker.api.TableRender',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Html',
    'ephox.sugar.api.search.SelectorFind'
  ],

  function (Fun, TableRender, Element, Attr, Html, SelectorFind) {
    var placeCaretInCell = function (editor, cell) {
      editor.selection.select(cell.dom(), true);
      editor.selection.collapse(true);
    };

    var selectFirstCellInTable = function (editor, tableElm) {
      SelectorFind.descendant(tableElm, 'td,th').each(Fun.curry(placeCaretInCell, editor));
    };

    var insert = function (editor, columns, rows) {
      var tableElm;

      var renderedHtml = TableRender.render(rows, columns, 0, 0);

      Attr.set(renderedHtml, 'id', '__mce');

      var html = Html.getOuter(renderedHtml);

      editor.insertContent(html);

      tableElm = editor.dom.get('__mce');
      editor.dom.setAttrib(tableElm, 'id', null);

      editor.$('tr', tableElm).each(function (index, row) {
        editor.fire('newrow', {
          node: row
        });

        editor.$('th,td', row).each(function (index, cell) {
          editor.fire('newcell', {
            node: cell
          });
        });
      });

      editor.dom.setAttribs(tableElm, editor.settings.table_default_attributes || {});
      editor.dom.setStyles(tableElm, editor.settings.table_default_styles || {});

      selectFirstCellInTable(editor, Element.fromDom(tableElm));

      return tableElm;
    };

    return {
      insert: insert
    };
  }
);

define(
  'ephox.sugar.impl.Dimension',

  [
    'ephox.katamari.api.Type',
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.impl.Style'
  ],

  function (Type, Arr, Css, Style) {
    return function (name, getOffset) {
      var set = function (element, h) {
        if (!Type.isNumber(h) && !h.match(/^[0-9]+$/)) throw name + '.set accepts only positive integer values. Value was ' + h;
        var dom = element.dom();
        if (Style.isSupported(dom)) dom.style[name] = h + 'px';
      };

      /*
       * jQuery supports querying width and height on the document and window objects.
       *
       * TBIO doesn't do this, so the code is removed to save space, but left here just in case.
       */
  /*
      var getDocumentWidth = function (element) {
        var dom = element.dom();
        if (Node.isDocument(element)) {
          var body = dom.body;
          var doc = dom.documentElement;
          return Math.max(
            body.scrollHeight,
            doc.scrollHeight,
            body.offsetHeight,
            doc.offsetHeight,
            doc.clientHeight
          );
        }
      };

      var getWindowWidth = function (element) {
        var dom = element.dom();
        if (dom.window === dom) {
          // There is no offsetHeight on a window, so use the clientHeight of the document
          return dom.document.documentElement.clientHeight;
        }
      };
  */


      var get = function (element) {
        var r = getOffset(element);

        // zero or null means non-standard or disconnected, fall back to CSS
        if ( r <= 0 || r === null ) {
          var css = Css.get(element, name);
          // ugh this feels dirty, but it saves cycles
          return parseFloat(css) || 0;
        }
        return r;
      };

      // in jQuery, getOuter replicates (or uses) box-sizing: border-box calculations
      // although these calculations only seem relevant for quirks mode, and edge cases TBIO doesn't rely on
      var getOuter = get;

      var aggregate = function (element, properties) {
        return Arr.foldl(properties, function (acc, property) {
          var val = Css.get(element, property);
          var value = val === undefined ? 0: parseInt(val, 10);
          return isNaN(value) ? acc : acc + value;
        }, 0);
      };

      var max = function (element, value, properties) {
        var cumulativeInclusions = aggregate(element, properties);
        // if max-height is 100px and your cumulativeInclusions is 150px, there is no way max-height can be 100px, so we return 0.
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
    };
  }
);
define(
  'ephox.sugar.api.view.Height',

  [
    'ephox.sugar.api.node.Body',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.impl.Dimension'
  ],

  function (Body, Css, Dimension) {
    var api = Dimension('height', function (element) {
      // getBoundingClientRect gives better results than offsetHeight for tables with captions on Firefox
      return Body.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
    });

    var set = function (element, h) {
      api.set(element, h);
    };

    var get = function (element) {
      return api.get(element);
    };

    var getOuter = function (element) {
      return api.getOuter(element);
    };

    var setMax = function (element, value) {
      // These properties affect the absolute max-height, they are not counted natively, we want to include these properties.
      var inclusions = [ 'margin-top', 'border-top-width', 'padding-top', 'padding-bottom', 'border-bottom-width', 'margin-bottom' ];
      var absMax = api.max(element, value, inclusions);
      Css.set(element, 'max-height', absMax + 'px');
    };

    return {
      set: set,
      get: get,
      getOuter: getOuter,
      setMax: setMax
    };
  }
);

define(
  'ephox.sugar.api.view.Width',

  [
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.impl.Dimension'
  ],

  function (Css, Dimension) {
    var api = Dimension('width', function (element) {
      // IMO passing this function is better than using dom['offset' + 'width']
      return element.dom().offsetWidth;
    });

    var set = function (element, h) {
      api.set(element, h);
    };

    var get = function (element) {
      return api.get(element);
    };

    var getOuter = function (element) {
      return api.getOuter(element);
    };

    var setMax = function (element, value) {
      // These properties affect the absolute max-height, they are not counted natively, we want to include these properties.
      var inclusions = [ 'margin-left', 'border-left-width', 'padding-left', 'padding-right', 'border-right-width', 'margin-right' ];
      var absMax = api.max(element, value, inclusions);
      Css.set(element, 'max-width', absMax + 'px');
    };

    return {
      set: set,
      get: get,
      getOuter: getOuter,
      setMax: setMax
    };
  }
);

define(
  'ephox.snooker.resize.RuntimeSize',

  [
    'ephox.sand.api.PlatformDetection',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.view.Height',
    'ephox.sugar.api.view.Width'
  ],

  function (PlatformDetection, Css, Height, Width) {
    var platform = PlatformDetection.detect();

    var needManualCalc = function () {
      return platform.browser.isIE() || platform.browser.isEdge();
    };

    var toNumber = function (px, fallback) {
      var num = parseFloat(px); // parseFloat removes suffixes like px
      return isNaN(num) ? fallback : num;
    };

    var getProp = function (elm, name, fallback) {
      return toNumber(Css.get(elm, name), fallback);
    };

    var getCalculatedHeight = function (cell) {
      var paddingTop = getProp(cell, 'padding-top', 0);
      var paddingBottom = getProp(cell, 'padding-bottom', 0);
      var borderTop = getProp(cell, 'border-top-width', 0);
      var borderBottom = getProp(cell, 'border-bottom-width', 0);
      var height = cell.dom().getBoundingClientRect().height;
      var boxSizing = Css.get(cell, 'box-sizing');
      var borders = borderTop + borderBottom;

      return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
    };

    var getWidth = function (cell) {
      return getProp(cell, 'width', Width.get(cell));
    };

    var getHeight = function (cell) {
      return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', Height.get(cell));
    };

    return {
      getWidth: getWidth,
      getHeight: getHeight
    };
  }
);

define(
  'ephox.snooker.resize.Sizes',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Strings',
    'ephox.snooker.api.TableLookup',
    'ephox.snooker.resize.RuntimeSize',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.view.Height',
    'ephox.sugar.api.view.Width',
    'global!Math',
    'global!parseInt'
  ],

  function (Fun, Option, Strings, TableLookup, RuntimeSize, Node, Attr, Css, Height, Width, Math, parseInt) {

    var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
    var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;

    var setPixelWidth = function (cell, amount) {
      Css.set(cell, 'width', amount + 'px');
    };

    var setPercentageWidth = function (cell, amount) {
      Css.set(cell, 'width', amount + '%');
    };

    var setHeight = function (cell, amount) {
      Css.set(cell, 'height', amount + 'px');
    };

    var getHeightValue = function (cell) {
      return Css.getRaw(cell, 'height').getOrThunk(function () {
        return RuntimeSize.getHeight(cell) + 'px';
      });
    };

    var convert = function (cell, number, getter, setter) {
      var newSize = TableLookup.table(cell).map(function (table) {
        var total = getter(table);
        return Math.floor((number / 100.0) * total);
      }).getOr(number);
      setter(cell, newSize);
      return newSize;
    };

    var normalizePixelSize = function (value, cell, getter, setter) {
      var number = parseInt(value, 10);
      return Strings.endsWith(value, '%') && Node.name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
    };

    var getTotalHeight = function (cell) {
      var value = getHeightValue(cell);
      if (!value) return Height.get(cell);
      return normalizePixelSize(value, cell, Height.get, setHeight);
    };

    var get = function (cell, type, f) {
      var v = f(cell);
      var span = getSpan(cell, type);
      return v / span;
    };

    var getSpan = function (cell, type) {
      return Attr.has(cell, type) ? parseInt(Attr.get(cell, type), 10) : 1;
    };

    var getRawWidth = function (element) {
      // Try to use the style width first, otherwise attempt to get attribute width
      var cssWidth = Css.getRaw(element, 'width');
      return cssWidth.fold(function () {
        return Option.from(Attr.get(element, 'width'));
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
        return parseFloat(percentMatch[1], 10);
      } else {
        var fallbackWidth = Width.get(element);
        var intWidth = parseInt(fallbackWidth, 10);
        return normalizePercentageWidth(intWidth, tableSize);
      }
    };

    // Get a percentage size for a percentage parent table
    var getPercentageWidth = function (cell, tableSize) {
      var width = getRawWidth(cell);
      return width.fold(function () {
        var width = Width.get(cell);
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
        var floatWidth = parseFloat(percentMatch[1], 10);
        return normalizePixelWidth(floatWidth, tableSize);
      } else {
        var fallbackWidth = Width.get(element);
        return parseInt(fallbackWidth, 10);
      }
    };

    var getPixelWidth = function (cell, tableSize) {
      var width = getRawWidth(cell);
      return width.fold(function () {
        var width = Width.get(cell);
        var intWidth = parseInt(width, 10);
        return intWidth;
      }, function (width) {
        return choosePixelSize(cell, width, tableSize);
      });
    };

    var getHeight = function (cell) {
      return get(cell, 'rowspan', getTotalHeight);
    };

    var getGenericWidth = function (cell) {
      var width = getRawWidth(cell);
      return width.bind(function (width) {
        if (genericSizeRegex.test(width)) {
          var match = genericSizeRegex.exec(width);
          return Option.some({
            width: Fun.constant(match[1]),
            unit: Fun.constant(match[3])
          });
        } else {
          return Option.none();
        }
      });
    };

    var setGenericWidth = function (cell, amount, unit) {
      Css.set(cell, 'width', amount + unit);
    };

    return {
      percentageBasedSizeRegex: Fun.constant(percentageBasedSizeRegex),
      pixelBasedSizeRegex: Fun.constant(pixelBasedSizeRegex),
      setPixelWidth: setPixelWidth,
      setPercentageWidth: setPercentageWidth,
      setHeight: setHeight,
      getPixelWidth: getPixelWidth,
      getPercentageWidth: getPercentageWidth,
      getGenericWidth: getGenericWidth,
      setGenericWidth: setGenericWidth,
      getHeight: getHeight,
      getRawWidth: getRawWidth
    };
  }
);

define(
  'ephox.snooker.api.CellMutations',

  [
    'ephox.snooker.resize.Sizes'
  ],

  function (Sizes) {
    var halve = function (main, other) {
      var width = Sizes.getGenericWidth(main);
      width.each(function (width) {
        var newWidth = width.width() / 2;
        Sizes.setGenericWidth(main, newWidth, width.unit());
        Sizes.setGenericWidth(other, newWidth, width.unit());
      });
    };

    return {
      halve: halve
    };
  }
);

define(
  'ephox.sugar.api.view.Position',

  [
    'ephox.katamari.api.Fun'
  ],

  function (Fun) {
    var r = function (left, top) {
      var translate = function (x, y) {
        return r(left + x, top + y);
      };

      return {
        left: Fun.constant(left),
        top: Fun.constant(top),
        translate: translate
      };
    };

    return r;
  }
);

define(
  'ephox.sugar.api.dom.Dom',

  [
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.PredicateFind',
    'global!document'
  ],

  function (Fun, Compare, Element, Node, PredicateFind, document) {
    // TEST: Is this just Body.inBody which doesn't need scope ??
    var attached = function (element, scope) {
      var doc = scope || Element.fromDom(document.documentElement);
      return PredicateFind.ancestor(element, Fun.curry(Compare.eq, doc)).isSome();
    };

    // TEST: Is this just Traverse.defaultView ??
    var windowOf = function (element) {
      var dom = element.dom();
      if (dom === dom.window) return element;
      return Node.isDocument(element) ? dom.defaultView || dom.parentWindow : null;
    };

    return {
      attached: attached,
      windowOf: windowOf
    };
  }
);

define(
  'ephox.sugar.api.view.Location',

  [
    'ephox.sugar.api.view.Position',
    'ephox.sugar.api.dom.Dom',
    'ephox.sugar.api.node.Element'
  ],

  function (Position, Dom, Element) {
    var boxPosition = function (dom) {
      var box = dom.getBoundingClientRect();
      return Position(box.left, box.top);
    };

    // Avoids falsy false fallthrough
    var firstDefinedOrZero = function (a, b) {
      return a !== undefined ? a :
             b !== undefined ? b :
             0;
    };

    var absolute = function (element) {
      var doc = element.dom().ownerDocument;
      var body = doc.body;
      var win = Dom.windowOf(Element.fromDom(doc));
      var html = doc.documentElement;


      var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
      var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);

      var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
      var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);

      return viewport(element).translate(
          scrollLeft - clientLeft,
          scrollTop - clientTop);
    };

    // This is the old $.position(), but JQuery does nonsense calculations.
    // We're only 1 <-> 1 with the old value in the single place we use this function
    // (ego.api.Dragging) so the rest can bite me.
    var relative = function (element) {
      var dom = element.dom();
      // jquery-ism: when style="position: fixed", this === boxPosition()
      // but tests reveal it returns the same thing anyway
      return Position(dom.offsetLeft, dom.offsetTop);
    };

    var viewport = function (element) {
      var dom = element.dom();

      var doc = dom.ownerDocument;
      var body = doc.body;
      var html = Element.fromDom(doc.documentElement);

      if (body === dom)
        return Position(body.offsetLeft, body.offsetTop);

      if (!Dom.attached(element, html))
        return Position(0, 0);

      return boxPosition(dom);
    };

    return {
      absolute: absolute,
      relative: relative,
      viewport: viewport
    };
  }
);

define(
  'ephox.snooker.resize.BarPositions',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Struct',
    'ephox.sugar.api.view.Height',
    'ephox.sugar.api.view.Location',
    'ephox.sugar.api.view.Width'
  ],

  function (Arr, Fun, Struct, Height, Location, Width) {
    var rowInfo = Struct.immutable('row', 'y');
    var colInfo = Struct.immutable('col', 'x');

    var rtlEdge = function (cell) {
      var pos = Location.absolute(cell);
      return pos.left() + Width.getOuter(cell);
    };

    var ltrEdge = function (cell) {
      return Location.absolute(cell).left();
    };

    var getLeftEdge = function (index, cell) {
      return colInfo(index, ltrEdge(cell));
    };

    var getRightEdge = function (index, cell) {
      return colInfo(index, rtlEdge(cell));
    };

    var getTop = function (cell) {
      return Location.absolute(cell).top();
    };

    var getTopEdge = function (index, cell) {
      return rowInfo(index, getTop(cell));
    };

    var getBottomEdge = function (index, cell) {
      return rowInfo(index, getTop(cell) + Height.getOuter(cell));
    };

    var findPositions = function (getInnerEdge, getOuterEdge, array) {
      if (array.length === 0 ) return [];
      var lines = Arr.map(array.slice(1), function (cellOption, index) {
        return cellOption.map(function (cell) {
          return getInnerEdge(index, cell);
        });
      });

      var lastLine = array[array.length - 1].map(function (cell) {
        return getOuterEdge(array.length - 1, cell);
      });

      return lines.concat([ lastLine ]);
    };

    var negate = function (step, _table) {
      return -step;
    };

    var height = {
      delta: Fun.identity,
      positions: Fun.curry(findPositions, getTopEdge, getBottomEdge),
      edge: getTop
    };

    var ltr = {
      delta: Fun.identity,
      edge: ltrEdge,
      positions: Fun.curry(findPositions, getLeftEdge, getRightEdge)
    };

    var rtl = {
      delta: negate,
      edge: rtlEdge,
      positions: Fun.curry(findPositions, getRightEdge, getLeftEdge)
    };

    return {
      height: height,
      rtl: rtl,
      ltr: ltr
    };
  }
);
define(
  'ephox.snooker.api.ResizeDirection',

  [
    'ephox.snooker.resize.BarPositions'
  ],

  function (BarPositions) {
    return {
      ltr: BarPositions.ltr,
      rtl: BarPositions.rtl
    };
  }
);
define(
  'ephox.snooker.api.TableDirection',

  [
    'ephox.snooker.api.ResizeDirection'
  ],

  function (ResizeDirection) {
    return function (directionAt) {
      var auto = function (table) {
        return directionAt(table).isRtl() ? ResizeDirection.rtl : ResizeDirection.ltr;
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
    };
  }
);
define(
  'ephox.snooker.api.TableGridSize',

  [
    'ephox.snooker.model.DetailsList',
    'ephox.snooker.model.Warehouse'
  ],

  function (DetailsList, Warehouse) {
    var getGridSize = function (table) {
      var input = DetailsList.fromTable(table);
      var warehouse = Warehouse.generate(input);
      return warehouse.grid();
    };

    return {
      getGridSize: getGridSize
    };
  }
);
define(
  'ephox.katamari.api.Cell',

  [
  ],

  function () {
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

    return Cell;
  }
);

define(
  'ephox.katamari.api.Contracts',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Obj',
    'ephox.katamari.api.Type',
    'ephox.katamari.util.BagUtils',
    'global!Error'
  ],

  function (Arr, Fun, Obj, Type, BagUtils, Error) {
    // Ensure that the object has all required fields. They must be functions.
    var base = function (handleUnsupported, required) {
      return baseWith(handleUnsupported, required, {
        validate: Type.isFunction,
        label: 'function'
      });
    };

    // Ensure that the object has all required fields. They must satisy predicates.
    var baseWith = function (handleUnsupported, required, pred) {
      if (required.length === 0) throw new Error('You must specify at least one required field.');

      BagUtils.validateStrArr('required', required);

      BagUtils.checkDupes(required);

      return function (obj) {
        var keys = Obj.keys(obj);

        // Ensure all required keys are present.
        var allReqd = Arr.forall(required, function (req) {
          return Arr.contains(keys, req);
        });

        if (! allReqd) BagUtils.reqMessage(required, keys);

        handleUnsupported(required, keys);
        
        var invalidKeys = Arr.filter(required, function (key) {
          return !pred.validate(obj[key], key);
        });

        if (invalidKeys.length > 0) BagUtils.invalidTypeMessage(invalidKeys, pred.label);

        return obj;
      };
    };

    var handleExact = function (required, keys) {
      var unsupported = Arr.filter(keys, function (key) {
        return !Arr.contains(required, key);
      });

      if (unsupported.length > 0) BagUtils.unsuppMessage(unsupported);
    };

    var allowExtra = Fun.noop;

    return {
      exactly: Fun.curry(base, handleExact),
      ensure: Fun.curry(base, allowExtra),
      ensureWith: Fun.curry(baseWith, allowExtra)
    };
  }
);
define(
  'ephox.snooker.api.Generators',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Cell',
    'ephox.katamari.api.Contracts',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Css',
    'global!parseInt'
  ],

  function (Arr, Fun, Option, Cell, Contracts, Attr, Css, parseInt) {
    var elementToData = function (element) {
      var colspan = Attr.has(element, 'colspan') ? parseInt(Attr.get(element, 'colspan'), 10) : 1;
      var rowspan = Attr.has(element, 'rowspan') ? parseInt(Attr.get(element, 'rowspan'), 10) : 1;
      return {
        element: Fun.constant(element),
        colspan: Fun.constant(colspan),
        rowspan: Fun.constant(rowspan)
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
        if (position.get().isNone()) position.set(Option.some(replacement));
        recent = Option.some({ item: element, replacement: replacement });
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
      } ;
    };

    var transform = function (scope, tag) {
      return function (generators) {
        var position = Cell(Option.none());
        contract(generators);
        var list = [];

        var find = function (element, comparator) {
          return Arr.find(list, function (x) { return comparator(x.item, element); });
        };

        var makeNew = function (element) {
          var cell = generators.replace(element, tag, {
            scope: scope
          });
          list.push({ item: element, sub: cell });
          if (position.get().isNone()) position.set(Option.some(cell));
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
        if (position.get().isNone()) position.set(Option.some(cell));
        return function () {
          var raw = generators.cell({
            element: Fun.constant(cell),
            colspan: Fun.constant(1),
            rowspan: Fun.constant(1)
          });
          // Remove any width calculations because they are no longer relevant.
          Css.remove(raw, 'width');
          Css.remove(cell, 'width');
          return raw;
        };
      };

      return {
        combine: combine,
        cursor: position.get
      };
    };

    var contract = Contracts.exactly([ 'cell', 'row', 'replace', 'gap' ]);

    return {
      modification: modification,
      transform: transform,
      merging: merging
    };
  }
);
define(
  'ephox.robin.api.general.Structure',

  [
    'ephox.katamari.api.Arr'
  ],

  function (Arr) {
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
      // --- NOTE, TagBoundaries has li here. That means universe.isBoundary => true for li tags.
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
      return Arr.contains([ 'ol', 'ul' ], tagName);
    };

    var isBlock = function (universe, item) {
      var tagName = universe.property().name(item);
      return Arr.contains(blockList, tagName);
    };

    var isFormatting = function (universe, item) {
      var tagName = universe.property().name(item);
      return Arr.contains([ 'address', 'pre', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ], tagName);
    };

    var isHeading = function (universe, item) {
      var tagName = universe.property().name(item);
      return Arr.contains([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ], tagName);
    };

    var isContainer = function (universe, item) {
      return Arr.contains([ 'div', 'li', 'td', 'th', 'blockquote', 'body', 'caption' ], universe.property().name(item));
    };

    var isEmptyTag = function (universe, item) {
      return Arr.contains([ 'br', 'img', 'hr', 'input' ], universe.property().name(item));
    };

    var isFrame = function (universe, item) {
      return universe.property().name(item) === 'iframe';
    };

    var isInline = function (universe, item) {
      return !(isBlock(universe, item) || isEmptyTag(universe, item)) && universe.property().name(item) !== 'li';
    };

    return {
      isBlock: isBlock,
      isList: isList,
      isFormatting: isFormatting,
      isHeading: isHeading,
      isContainer: isContainer,
      isEmptyTag: isEmptyTag,
      isFrame: isFrame,
      isInline: isInline
    };
  }
);

define(
  'ephox.robin.api.dom.DomStructure',

  [
    'ephox.boss.api.DomUniverse',
    'ephox.robin.api.general.Structure'
  ],

  /**
   * Documentation is in the actual implementations.
   */
  function (DomUniverse, Structure) {
    var universe = DomUniverse();

    var isBlock = function (element) {
      return Structure.isBlock(universe, element);
    };

    var isList = function (element) {
      return Structure.isList(universe, element);
    };

    var isFormatting = function (element) {
      return Structure.isFormatting(universe, element);
    };

    var isHeading = function (element) {
      return Structure.isHeading(universe, element);
    };

    var isContainer = function (element) {
      return Structure.isContainer(universe, element);
    };

    var isEmptyTag = function (element) {
      return Structure.isEmptyTag(universe, element);
    };

    var isFrame = function (element) {
      return Structure.isFrame(universe, element);
    };

    var isInline = function (element) {
      return Structure.isInline(universe, element);
    };

    return {
      isBlock: isBlock,
      isList: isList,
      isFormatting: isFormatting,
      isHeading: isHeading,
      isContainer: isContainer,
      isEmptyTag: isEmptyTag,
      isFrame: isFrame,
      isInline: isInline
    };
  }
);

define(
  'ephox.snooker.api.TableContent',

  [
    'ephox.katamari.api.Arr',
    'ephox.robin.api.dom.DomStructure',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.node.Text',
    'ephox.sugar.api.search.PredicateFind',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.CursorPosition'
  ],

  function (Arr, DomStructure, Compare, InsertAll, Remove, Element, Node, Text, PredicateFind, Traverse, CursorPosition) {
    var merge = function (cells) {
      var isBr = function (el) {
        return Node.name(el) === 'br';
      };

      var advancedBr = function (children) {
        return Arr.forall(children, function (c) {
          return isBr(c) || (Node.isText(c) && Text.get(c).trim().length === 0);
        });
      };

      var isListItem = function (el) {
        return Node.name(el) === 'li' || PredicateFind.ancestor(el, DomStructure.isList).isSome();
      };

      var siblingIsBlock = function (el) {
        return Traverse.nextSibling(el).map(function (rightSibling) {
          if (DomStructure.isBlock(rightSibling)) return true;
          if (DomStructure.isEmptyTag(rightSibling)) {
            return Node.name(rightSibling) === 'img' ? false : true;
          }
        }).getOr(false);
      };

      var markCell = function (cell) {
        return CursorPosition.last(cell).bind(function (rightEdge) {
          var rightSiblingIsBlock = siblingIsBlock(rightEdge);
          return Traverse.parent(rightEdge).map(function (parent) {
            return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || (DomStructure.isBlock(parent) && !Compare.eq(cell, parent)) ? [] :  [ Element.fromTag('br') ];
          });
        }).getOr([]);
      };

      var markContent = function () {
        var content = Arr.bind(cells, function (cell) {
          var children = Traverse.children(cell);
          return advancedBr(children) ? [ ] : children.concat(markCell(cell));
        });

        return content.length === 0 ? [ Element.fromTag('br') ] : content;
      };

      var contents = markContent();
      Remove.empty(cells[0]);
      InsertAll.append(cells[0], contents);
    };

    return {
      merge: merge
    };
  }
);
define(
  'ephox.snooker.model.GridRow',

  [
    'ephox.katamari.api.Arr',
    'ephox.snooker.api.Structs'
  ],

  function (Arr, Structs) {
    var addCell = function (gridRow, index, cell) {
      var cells = gridRow.cells();
      var before = cells.slice(0, index);
      var after = cells.slice(index);
      var newCells = before.concat([ cell ]).concat(after);
      return setCells(gridRow, newCells);
    };

    var mutateCell = function (gridRow, index, cell) {
      var cells = gridRow.cells();
      cells[index] = cell;
    };

    var setCells = function (gridRow, cells) {
      return Structs.rowcells(cells, gridRow.section());
    };

    var mapCells = function (gridRow, f) {
      var cells = gridRow.cells();
      var r = Arr.map(cells, f);
      return Structs.rowcells(r, gridRow.section());
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

    return {
      addCell: addCell,
      setCells: setCells,
      mutateCell: mutateCell,
      getCell: getCell,
      getCellElement: getCellElement,
      mapCells: mapCells,
      cellLength: cellLength
    };
  }
);

define(
  'ephox.katamari.api.Merger',

  [
    'ephox.katamari.api.Type',
    'global!Array',
    'global!Error'
  ],

  function (Type, Array, Error) {

    var shallow = function (old, nu) {
      return nu;
    };

    var deep = function (old, nu) {
      var bothObjects = Type.isObject(old) && Type.isObject(nu);
      return bothObjects ? deepMerge(old, nu) : nu;
    };

    var baseMerge = function (merger) {
      return function() {
        // Don't use array slice(arguments), makes the whole function unoptimisable on Chrome
        var objects = new Array(arguments.length);
        for (var i = 0; i < objects.length; i++) objects[i] = arguments[i];

        if (objects.length === 0) throw new Error('Can\'t merge zero objects');

        var ret = {};
        for (var j = 0; j < objects.length; j++) {
          var curObject = objects[j];
          for (var key in curObject) if (curObject.hasOwnProperty(key)) {
            ret[key] = merger(ret[key], curObject[key]);
          }
        }
        return ret;
      };
    };

    var deepMerge = baseMerge(deep);
    var merge = baseMerge(shallow);

    return {
      deepMerge: deepMerge,
      merge: merge
    };
  }
);
define(
  'ephox.katamari.api.Options',

  [
    'ephox.katamari.api.Option'
  ],

  function (Option) {
    /** cat :: [Option a] -> [a] */
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

    /** findMap :: ([a], (a, Int -> Option b)) -> Option b */
    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Option.none();
    };

    /**
     * if all elements in arr are 'some', their inner values are passed as arguments to f
     * f must have arity arr.length
    */
    var liftN = function(arr, f) {
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

    return {
      cat: cat,
      findMap: findMap,
      liftN: liftN
    };
  }
);

define(
  'ephox.snooker.model.TableGrid',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.snooker.model.GridRow'
  ],

  function (Arr, Fun, GridRow) {
    var getColumn = function (grid, index) {
      return Arr.map(grid, function (row) {
        return GridRow.getCell(row, index);
      });
    };

    var getRow = function (grid, index) {
      return grid[index];
    };


    var findDiff = function (xs, comp) {
      if (xs.length === 0) return 0;
      var first = xs[0];
      var index = Arr.findIndex(xs, function (x) {
        return !comp(first.element(), x.element());
      });
      return index.fold(function () {
        return xs.length;
      }, function (ind) {
        return ind;
      });
    };

    /*
     * grid is the grid
     * row is the row index into the grid
     * column in the column index into the grid
     *
     * Return
     *   colspan: column span of the cell at (row, column)
     *   rowspan: row span of the cell at (row, column)
     */
    var subgrid = function (grid, row, column, comparator) {
      var restOfRow = getRow(grid, row).cells().slice(column);
      var endColIndex = findDiff(restOfRow, comparator);

      var restOfColumn = getColumn(grid, column).slice(row);
      var endRowIndex = findDiff(restOfColumn, comparator);

      return {
        colspan: Fun.constant(endColIndex),
        rowspan: Fun.constant(endRowIndex)
      };
    };

    return {
      subgrid: subgrid
    };
  }
);
define(
  'ephox.snooker.model.Transitions',

  [
    'ephox.katamari.api.Arr',
    'ephox.snooker.api.Structs',
    'ephox.snooker.model.TableGrid',
    'ephox.snooker.model.Warehouse'
  ],

  function (Arr, Structs, TableGrid, Warehouse) {
    var toDetails = function (grid, comparator) {
      var seen = Arr.map(grid, function (row, ri) {
        return Arr.map(row.cells(), function (col, ci) {
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

      return Arr.map(grid, function (row, ri) {
        var details = Arr.bind(row.cells(), function (cell, ci) {
          // if we have seen this one, then skip it.
          if (seen[ri][ci] === false) {
            var result = TableGrid.subgrid(grid, ri, ci, comparator);
            updateSeen(ri, ci, result.rowspan(), result.colspan());
            return [ Structs.detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew()) ];
          } else {
            return [];
          }
        });
        return Structs.rowdetails(details, row.section());
      });
    };

    var toGrid = function (warehouse, generators, isNew) {
      var grid = [];
      for (var i = 0; i < warehouse.grid().rows(); i++) {
        var rowCells = [];
        for (var j = 0; j < warehouse.grid().columns(); j++) {
          // The element is going to be the element at that position, or a newly generated gap.
          var element = Warehouse.getAt(warehouse, i, j).map(function (item) {
            return Structs.elementnew(item.element(), isNew);
          }).getOrThunk(function () {
            return Structs.elementnew(generators.gap(), true);
          });
          rowCells.push(element);
        }
        var row = Structs.rowcells(rowCells, warehouse.all()[i].section());
        grid.push(row);
      }
      return grid;
    };

    return {
      toDetails: toDetails,
      toGrid: toGrid
    };
  }
);
define(
  'ephox.snooker.operate.Redraw',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.dom.Replication',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Arr, Fun, Attr, Element, Insert, InsertAll, Remove, Replication, SelectorFind, Traverse) {
    var setIfNot = function (element, property, value, ignore) {
      if (value === ignore) Attr.remove(element, property);
      else Attr.set(element, property, value);
    };

    var render = function (table, grid) {
      var newRows = [];
      var newCells = [];

      var renderSection = function (gridSection, sectionName) {
        var section = SelectorFind.child(table, sectionName).getOrThunk(function () {
          var tb = Element.fromTag(sectionName, Traverse.owner(table).dom());
          Insert.append(table, tb);
          return tb;
        });

        Remove.empty(section);

        var rows = Arr.map(gridSection, function (row) {
          if (row.isNew()) {
            newRows.push(row.element());
          }
          var tr = row.element();
          Remove.empty(tr);
          Arr.each(row.cells(), function (cell) {
            if (cell.isNew()) {
              newCells.push(cell.element());
            }
            setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
            setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
            Insert.append(tr, cell.element());
          });
          return tr;
        });

        InsertAll.append(section, rows);
      };

      var removeSection = function (sectionName) {
        SelectorFind.child(table, sectionName).bind(Remove.remove);
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

      Arr.each(grid, function (row) {
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
        newRows: Fun.constant(newRows),
        newCells: Fun.constant(newCells)
      };
    };

    var copy = function (grid) {
      var rows = Arr.map(grid, function (row) {
        // Shallow copy the row element
        var tr = Replication.shallow(row.element());
        Arr.each(row.cells(), function (cell) {
          var clonedCell = Replication.deep(cell.element());
          setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
          setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
          Insert.append(tr, clonedCell);
        });
        return tr;
      });
      return rows;
    };

    return {
      render: render,
      copy: copy
    };
  }
);

define(
  'ephox.snooker.util.Util',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'global!Math'
  ],

  function (Arr, Option, Options, Math) {
    // Rename this module, and repeat should be in Arr.
    var repeat = function(repititions, f) {
      var r = [];
      for (var i = 0; i < repititions; i++) {
        r.push(f(i));
      }
      return r;
    };

    var range = function (start, end) {
      var r = [];
      for (var i = start; i < end; i++) {
        r.push(i);
      }
      return r;
    };

    var unique = function (xs, comparator) {
      var result = [];
      Arr.each(xs, function (x, i) {
        if (i < xs.length - 1 && !comparator(x, xs[i + 1])) {
          result.push(x);
        } else if (i === xs.length - 1) {
          result.push(x);
        }
      });
      return result;
    };

    var deduce = function (xs, index) {
      if (index < 0 || index >= xs.length - 1) return Option.none();

      var current = xs[index].fold(function () {
        var rest = Arr.reverse(xs.slice(0, index));
        return Options.findMap(rest, function (a, i) {
          return a.map(function (aa) {
            return { value: aa, delta: i+1 };
          });
        });
      }, function (c) {
        return Option.some({ value: c, delta: 0 });
      });
      var next = xs[index + 1].fold(function () {
        var rest = xs.slice(index + 1);
        return Options.findMap(rest, function (a, i) {
          return a.map(function (aa) {
            return { value: aa, delta: i + 1 };
          });
        });
      }, function (n) {
        return Option.some({ value: n, delta: 1 });
      });

      return current.bind(function (c) {
        return next.map(function (n) {
          var extras = n.delta + c.delta;
          return Math.abs(n.value - c.value) / extras;
        });
      });
    };

    return {
      repeat: repeat,
      range: range,
      unique: unique,
      deduce: deduce
    };
  }
);

define(
  'ephox.snooker.lookup.Blocks',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.util.Util'
  ],

  function (Arr, Fun, Option, Warehouse, Util) {
    /*
     * Identify for each column, a cell that has colspan 1. Note, this
     * may actually fail, and future work will be to calculate column
     * sizes that are only available through the difference of two
     * spanning columns.
     */
    var columns = function (warehouse) {
      var grid = warehouse.grid();
      var cols = Util.range(0, grid.columns());
      var rows = Util.range(0, grid.rows());

      return Arr.map(cols, function (col) {
        var getBlock = function () {
          return Arr.bind(rows, function (r) {
            return Warehouse.getAt(warehouse, r, col).filter(function (detail) {
              return detail.column() === col;
            }).fold(Fun.constant([]), function (detail) { return [ detail ]; });
          });
        };

        var isSingle = function (detail) {
          return detail.colspan() === 1;
        };

        var getFallback = function () {
          return Warehouse.getAt(warehouse, 0, col);
        };

        return decide(getBlock, isSingle, getFallback);
      });
    };

    var decide = function (getBlock, isSingle, getFallback) {
      var inBlock = getBlock();
      var singleInBlock = Arr.find(inBlock, isSingle);

      var detailOption = singleInBlock.orThunk(function () {
        return Option.from(inBlock[0]).orThunk(getFallback);
      });

      return detailOption.map(function (detail) { return detail.element(); });
    };


    var rows = function (warehouse) {
      var grid = warehouse.grid();
      var rows = Util.range(0, grid.rows());
      var cols = Util.range(0, grid.columns());

      return Arr.map(rows, function (row) {

        var getBlock = function () {
          return Arr.bind(cols, function (c) {
            return Warehouse.getAt(warehouse, row, c).filter(function (detail) {
              return detail.row() === row;
            }).fold(Fun.constant([]), function (detail) { return [ detail ]; });
          });
        };

        var isSingle = function (detail) {
          return detail.rowspan() === 1;
        };

        var getFallback = function () {
          return Warehouse.getAt(warehouse, row, 0);
        };

        return decide(getBlock, isSingle, getFallback);

      });

    };

    return {
      columns: columns,
      rows: rows
    };
  }
);

define(
  'ephox.snooker.resize.Bar',

  [
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.node.Element'
  ],

  function (Attr, Css, Element) {
    var col = function (column, x, y, w, h) {
      var blocker = Element.fromTag('div');
      Css.setAll(blocker, {
        position: 'absolute',
        left: x - w/2 + 'px',
        top: y + 'px',
        height: h + 'px',
        width: w + 'px'
      });

      Attr.set(blocker, 'data-column', column);
      return blocker;
    };

    var row = function (row, x, y, w, h) {
      var blocker = Element.fromTag('div');
      Css.setAll(blocker, {
        position: 'absolute',
        left: x + 'px',
        top: y - h/2 + 'px',
        height: h + 'px',
        width: w + 'px'
      });

      Attr.set(blocker, 'data-row', row);
      return blocker;
    };


    return {
      col: col,
      row: row
    };
  }
);

define(
  'ephox.katamari.api.Namespace',

  [

  ],

  function () {
    // This API is intended to give the capability to return namespaced strings.
    // For CSS, since dots are not valid class names, the dots are turned into dashes.
    var css = function (namespace) {
      var dashNamespace = namespace.replace(/\./g, '-');

      var resolve = function (str) {
        return dashNamespace + '-' + str;
      };

      return {
        resolve: resolve
      };
    };

    return {
      css: css
    };
  }
);

define(
  'ephox.snooker.style.Styles',

  [
    'ephox.katamari.api.Namespace'
  ],

  function (Namespace) {
    var styles = Namespace.css('ephox-snooker');

    return {
      resolve: styles.resolve
    };
  }
);

define(
  'ephox.sugar.api.properties.Toggler',

  [
  ],

  function () {
    return function (turnOff, turnOn, initial) {
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
    };
  }
);

define(
  'ephox.sugar.api.properties.AttrList',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.properties.Attr'
  ],

  function (Arr, Attr) {
    // Methods for handling attributes that contain a list of values <div foo="alpha beta theta">
    var read = function (element, attr) {
      var value = Attr.get(element, attr);
      return value === undefined || value === '' ? [] : value.split(' ');
    };

    var add = function (element, attr, id) {
      var old = read(element, attr);
      var nu = old.concat([id]);
      Attr.set(element, attr, nu.join(' '));
    };

    var remove = function (element, attr, id) {
      var nu = Arr.filter(read(element, attr), function (v) {
        return v !== id;
      });
      if (nu.length > 0) Attr.set(element, attr, nu.join(' '));
      else Attr.remove(element, attr);
    };

    return {
      read: read,
      add: add,
      remove: remove
    };
  }
);
define(
  'ephox.sugar.impl.ClassList',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.properties.AttrList'
  ],

  function (Arr, AttrList) {

    var supports = function (element) {
      // IE11 Can return undefined for a classList on elements such as math, so we make sure it's not undefined before attempting to use it.
      return element.dom().classList !== undefined;
    };

    var get = function (element) {
      return AttrList.read(element, 'class');
    };

    var add = function (element, clazz) {
      return AttrList.add(element, 'class', clazz);
    };

    var remove = function (element, clazz) {
      return AttrList.remove(element, 'class', clazz);
    };

    var toggle = function (element, clazz) {
      if (Arr.contains(get(element), clazz)) {
        remove(element, clazz);
      } else {
        add(element, clazz);
      }
    };

    return {
      get: get,
      add: add,
      remove: remove,
      toggle: toggle,
      supports: supports
    };
  }
);
define(
  'ephox.sugar.api.properties.Class',

  [
    'ephox.sugar.api.properties.Toggler',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.impl.ClassList'
  ],

  function (Toggler, Attr, ClassList) {
    /*
     * ClassList is IE10 minimum:
     * https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
     *
     * Note that IE doesn't support the second argument to toggle (at all).
     * If it did, the toggler could be better.
     */

    var add = function (element, clazz) {
      if (ClassList.supports(element)) element.dom().classList.add(clazz);
      else ClassList.add(element, clazz);
    };

    var cleanClass = function (element) {
      var classList = ClassList.supports(element) ? element.dom().classList : ClassList.get(element);
      // classList is a "live list", so this is up to date already
      if (classList.length === 0) {
        // No more classes left, remove the class attribute as well
        Attr.remove(element, 'class');
      }
    };

    var remove = function (element, clazz) {
      if (ClassList.supports(element)) {
        var classList = element.dom().classList;
        classList.remove(clazz);
      } else
        ClassList.remove(element, clazz);

      cleanClass(element);
    };

    var toggle = function (element, clazz) {
      return ClassList.supports(element) ? element.dom().classList.toggle(clazz) :
                                           ClassList.toggle(element, clazz);
    };

    var toggler = function (element, clazz) {
      var hasClasslist = ClassList.supports(element);
      var classList = element.dom().classList;
      var off = function () {
        if (hasClasslist) classList.remove(clazz);
        else ClassList.remove(element, clazz);
      };
      var on = function () {
        if (hasClasslist) classList.add(clazz);
        else ClassList.add(element, clazz);
      };
      return Toggler(off, on, has(element, clazz));
    };

    var has = function (element, clazz) {
      // Cereal has a nasty habit of calling this with a text node >.<
      return ClassList.supports(element) && element.dom().classList.contains(clazz);
    };

    // set deleted, risks bad performance. Be deterministic.

    return {
      add: add,
      remove: remove,
      toggle: toggle,
      toggler: toggler,
      has: has
    };
  }
);

define(
  'ephox.snooker.resize.Bars',

  [
    'ephox.katamari.api.Arr',
    'ephox.snooker.lookup.Blocks',
    'ephox.snooker.model.DetailsList',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.resize.Bar',
    'ephox.snooker.style.Styles',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.properties.Class',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.view.Height',
    'ephox.sugar.api.view.Location',
    'ephox.sugar.api.view.Width'
  ],

  function (Arr, Blocks, DetailsList, Warehouse, Bar, Styles, Insert, Remove, Class, Css, SelectorFilter, Height, Location, Width) {
    var resizeBar = Styles.resolve('resizer-bar');
    var resizeRowBar = Styles.resolve('resizer-rows');
    var resizeColBar = Styles.resolve('resizer-cols');
    var BAR_THICKNESS = 7;

    var clear = function (wire) {
      var previous = SelectorFilter.descendants(wire.parent(), '.' + resizeBar);
      Arr.each(previous, Remove.remove);
    };

    var drawBar = function (wire, positions, create) {
      var origin = wire.origin();
      Arr.each(positions, function (cpOption, i) {
        cpOption.each(function (cp) {
          var bar = create(origin, cp);
          Class.add(bar, resizeBar);
          Insert.append(wire.parent(), bar);
        });
      });
    };

    var refreshCol = function (wire, colPositions, position, tableHeight) {
      drawBar(wire, colPositions, function (origin, cp) {
        var colBar = Bar.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
        Class.add(colBar, resizeColBar);
        return colBar;
      });
    };

    var refreshRow = function (wire, rowPositions, position, tableWidth) {
      drawBar(wire, rowPositions, function (origin, cp) {
        var rowBar = Bar.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
        Class.add(rowBar, resizeRowBar);
        return rowBar;
      });
    };

    var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
      var position = Location.absolute(table);
      var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
      refreshRow(wire, rowPositions, position, Width.getOuter(table));

      var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
      refreshCol(wire, colPositions, position, Height.getOuter(table));
    };

    var refresh = function (wire, table, hdirection, vdirection) {
      clear(wire, table);

      var list = DetailsList.fromTable(table);
      var warehouse = Warehouse.generate(list);
      var rows = Blocks.rows(warehouse);
      var cols = Blocks.columns(warehouse);

      refreshGrid(wire, table, rows, cols, hdirection, vdirection);
    };

    var each = function (wire, f) {
      var bars = SelectorFilter.descendants(wire.parent(), '.' + resizeBar);
      Arr.each(bars, f);
    };

    var hide = function (wire) {
      each(wire, function(bar) {
        Css.set(bar, 'display', 'none');
      });
    };

    var show = function (wire) {
      each(wire, function(bar) {
        Css.set(bar, 'display', 'block');
      });
    };

    var isRowBar = function (element) {
      return Class.has(element, resizeRowBar);
    };

    var isColBar = function (element) {
      return Class.has(element, resizeColBar);
    };

    return {
      refresh: refresh,
      hide: hide,
      show: show,
      destroy: clear,
      isRowBar: isRowBar,
      isColBar: isColBar
    };
  }
);

define(
  'ephox.snooker.model.RunOperation',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Merger',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'ephox.snooker.api.Structs',
    'ephox.snooker.api.TableLookup',
    'ephox.snooker.model.DetailsList',
    'ephox.snooker.model.Transitions',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.operate.Redraw',
    'ephox.snooker.resize.BarPositions',
    'ephox.snooker.resize.Bars',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Arr, Merger, Fun, Option, Options, Structs, TableLookup, DetailsList, Transitions, Warehouse, Redraw, BarPositions, Bars, Compare, Traverse) {
    var fromWarehouse = function (warehouse, generators) {
      return Transitions.toGrid(warehouse, generators, false);
    };

    var deriveRows = function (rendered, generators) {
      // The row is either going to be a new row, or the row of any of the cells.
      var findRow = function (details) {
        var rowOfCells = Options.findMap(details, function (detail) {
          return Traverse.parent(detail.element()).map(function (row) {
            // If the row has a parent, it's within the existing table, otherwise it's a copied row
            var isNew = Traverse.parent(row).isNone();
            return Structs.elementnew(row, isNew);
          });
        });
        return rowOfCells.getOrThunk(function () {
          return Structs.elementnew(generators.row(), true);
        });
      };

      return Arr.map(rendered, function (details) {
        var row = findRow(details.details());
        return Structs.rowdatanew(row.element(), details.details(), details.section(), row.isNew());
      });
    };

    var toDetailList = function (grid, generators) {
      var rendered = Transitions.toDetails(grid, Compare.eq);
      return deriveRows(rendered, generators);
    };

    var findInWarehouse = function (warehouse, element) {
      var all = Arr.flatten(Arr.map(warehouse.all(), function (r) { return r.cells(); }));
      return Arr.find(all, function (e) {
        return Compare.eq(element, e.element());
      });
    };

    var run = function (operation, extract, adjustment, postAction, genWrappers) {
      return function (wire, table, target, generators, direction) {
        var input = DetailsList.fromTable(table);
        var warehouse = Warehouse.generate(input);
        var output = extract(warehouse, target).map(function (info) {
          var model = fromWarehouse(warehouse, generators);
          var result = operation(model, info, Compare.eq, genWrappers(generators));
          var grid = toDetailList(result.grid(), generators);
          return {
            grid: Fun.constant(grid),
            cursor: result.cursor
          };
        });

        return output.fold(function () {
          return Option.none();
        }, function (out) {
          var newElements = Redraw.render(table, out.grid());
          adjustment(table, out.grid(), direction);
          postAction(table);
          Bars.refresh(wire, table, BarPositions.height, direction);
          return Option.some({
            cursor: out.cursor,
            newRows: newElements.newRows,
            newCells: newElements.newCells
          });
        });
      };
    };

    var onCell = function (warehouse, target) {
      return TableLookup.cell(target.element()).bind(function (cell) {
        return findInWarehouse(warehouse, cell);
      });
    };

    var onPaste = function (warehouse, target) {
      return TableLookup.cell(target.element()).bind(function (cell) {
        return findInWarehouse(warehouse, cell).map(function (details) {
          return Merger.merge(details, {
            generators: target.generators,
            clipboard: target.clipboard
          });
        });
      });
    };

    var onPasteRows = function (warehouse, target) {
      var details = Arr.map(target.selection(), function (cell) {
        return TableLookup.cell(cell).bind(function (lc) {
          return findInWarehouse(warehouse, lc);
        });
      });
      var cells = Options.cat(details);
      return cells.length > 0 ? Option.some(Merger.merge({cells: cells}, {
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
      var details = Arr.map(target.selection(), function (cell) {
        return TableLookup.cell(cell).bind(function (lc) {
          return findInWarehouse(warehouse, lc);
        });
      });
      var cells = Options.cat(details);
      return cells.length > 0 ? Option.some(cells) : Option.none();
    };

    return {
      run: run,
      toDetailList: toDetailList,
      onCell: onCell,
      onCells: onCells,
      onPaste: onPaste,
      onPasteRows: onPasteRows,
      onMergable: onMergable,
      onUnmergable: onUnmergable
    };
  }
);
define(
  'ephox.katamari.api.Result',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option'
  ],

  function (Fun, Option) {
    /* The type signatures for Result 
     * is :: this Result a -> a -> Bool
     * or :: this Result a -> Result a -> Result a
     * orThunk :: this Result a -> (_ -> Result a) -> Result a
     * map :: this Result a -> (a -> b) -> Result b
     * each :: this Result a -> (a -> _) -> _ 
     * bind :: this Result a -> (a -> Result b) -> Result b
     * fold :: this Result a -> (_ -> b, a -> b) -> b
     * exists :: this Result a -> (a -> Bool) -> Bool
     * forall :: this Result a -> (a -> Bool) -> Bool
     * toOption :: this Result a -> Option a
     * isValue :: this Result a -> Bool
     * isError :: this Result a -> Bool
     * getOr :: this Result a -> a -> a
     * getOrThunk :: this Result a -> (_ -> a) -> a
     * getOrDie :: this Result a -> a (or throws error)
    */

    var value = function (o) {
      var is = function (v) {
        return o === v;      
      };

      var or = function (opt) {
        return value(o);
      };

      var orThunk = function (f) {
        return value(o);
      };

      var map = function (f) {
        return value(f(o));
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
        isValue: Fun.constant(true),
        isError: Fun.constant(false),
        getOr: Fun.constant(o),
        getOrThunk: Fun.constant(o),
        getOrDie: Fun.constant(o),
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
        return Fun.die(message)();
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
        is: Fun.constant(false),
        isValue: Fun.constant(false),
        isError: Fun.constant(true),
        getOr: Fun.identity,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        each: Fun.noop,
        bind: bind,
        exists: Fun.constant(false),
        forall: Fun.constant(true),
        toOption: Option.none
      };
    };

    return {
      value: value,
      error: error
    };
  }
);

define(
  'ephox.snooker.model.Fitment',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Result',
    'ephox.snooker.api.Structs',
    'ephox.snooker.model.GridRow',
    'ephox.snooker.util.Util',
    'global!Array',
    'global!Error',
    'global!Math'
  ],

  function (Arr, Fun, Result, Structs, GridRow, Util, Array, Error, Math) {
    /*
      Fitment, is a module used to ensure that the Inserted table (gridB) can fit squareley within the Host table (gridA).
        - measure returns a delta of rows and cols, eg:
            - col: 3 means gridB can fit with 3 spaces to spare
            - row: -5 means gridB can needs 5 more rows to completely fit into gridA
            - col: 0, row: 0 depics perfect fitment

        - tailor, requires a delta and returns grid that is built to match the delta, tailored to fit.
          eg: 3x3 gridA, with a delta col: -3, row: 2 returns a new grid 3 rows x 6 cols

        - assumptions: All grids used by this module should be rectangular
    */

    var measure = function (startAddress, gridA, gridB) {
      if (startAddress.row() >= gridA.length || startAddress.column() > GridRow.cellLength(gridA[0])) return Result.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
      var rowRemainder = gridA.slice(startAddress.row());
      var colRemainder = rowRemainder[0].cells().slice(startAddress.column());

      var colRequired = GridRow.cellLength(gridB[0]);
      var rowRequired = gridB.length;
      return Result.value({
        rowDelta: Fun.constant(rowRemainder.length - rowRequired),
        colDelta: Fun.constant(colRemainder.length - colRequired)
      });
    };

    var measureWidth = function (gridA, gridB) {
      var colLengthA = GridRow.cellLength(gridA[0]);
      var colLengthB = GridRow.cellLength(gridB[0]);

      return {
        rowDelta: Fun.constant(0),
        colDelta: Fun.constant(colLengthA - colLengthB)
      };
    };

    var fill = function (cells, generator) {
      return Arr.map(cells, function () {
        return Structs.elementnew(generator.cell(), true);
      });
    };

    var rowFill = function (grid, amount, generator) {
      return grid.concat(Util.repeat(amount, function (_row) {
        return GridRow.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
      }));
    };

    var colFill = function (grid, amount, generator) {
      return Arr.map(grid, function (row) {
        return GridRow.setCells(row, row.cells().concat(fill(Util.range(0, amount), generator)));
      });
    };

    var tailor = function (gridA, delta, generator) {
      var fillCols = delta.colDelta() < 0 ? colFill : Fun.identity;
      var fillRows = delta.rowDelta() < 0 ? rowFill : Fun.identity;

      var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
      var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
      return tailoredGrid;
    };

    return {
      measure: measure,
      measureWidth: measureWidth,
      tailor: tailor
    };
  }
);
define(
  'ephox.snooker.operate.MergingOperations',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.Structs',
    'ephox.snooker.model.GridRow'
  ],

  function (Arr, Option, Structs, GridRow) {
    // substitution: () -> item
    var merge = function (grid, bounds, comparator, substitution) {
      // Mutating. Do we care about the efficiency gain?
      if (grid.length === 0) return grid;
      for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
        for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
          // We can probably simplify this again now that we aren't reusing merge.
          GridRow.mutateCell(grid[i], j, Structs.elementnew(substitution(), false));
        }
      }
      return grid;
    };

    // substitution: () -> item
    var unmerge = function (grid, target, comparator, substitution) {
      // Mutating. Do we care about the efficiency gain?
      var first = true;
      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < GridRow.cellLength(grid[0]); j++) {
          var current = GridRow.getCellElement(grid[i], j);
          var isToReplace = comparator(current, target);

          if (isToReplace === true && first === false) {
            GridRow.mutateCell(grid[i], j, Structs.elementnew(substitution(), true));
          }
          else if (isToReplace === true) {
            first = false;
          }
        }
      }
      return grid;
    };

    var uniqueCells = function (row, comparator) {
      return Arr.foldl(row, function (rest, cell) {
          return Arr.exists(rest, function (currentCell){
            return comparator(currentCell.element(), cell.element());
          }) ? rest : rest.concat([cell]);
      }, []);
    };

    var splitRows = function (grid, index, comparator, substitution) {
      // We don't need to split rows if we're inserting at the first or last row of the old table
      if (index > 0 && index < grid.length) {
        var rowPrevCells = grid[index - 1].cells();
        var cells = uniqueCells(rowPrevCells, comparator);
        Arr.each(cells, function (cell) {
          // only make a sub when we have to
          var replacement = Option.none();
          for (var i = index; i < grid.length; i++) {
            for (var j = 0; j < GridRow.cellLength(grid[0]); j++) {
              var current = grid[i].cells()[j];
              var isToReplace = comparator(current.element(), cell.element());

              if (isToReplace) {
                if (replacement.isNone()) {
                  replacement = Option.some(substitution());
                }
                replacement.each(function (sub) {
                  GridRow.mutateCell(grid[i], j, Structs.elementnew(sub, true));
                });
              }
            }
          }
        });
      }

      return grid;
    };

    return {
      merge: merge,
      unmerge: unmerge,
      splitRows: splitRows
    };
  }
);
define(
  'ephox.snooker.model.TableMerge',

  [
    'ephox.katamari.api.Fun',
    'ephox.snooker.api.Structs',
    'ephox.snooker.model.Fitment',
    'ephox.snooker.model.GridRow',
    'ephox.snooker.operate.MergingOperations'
  ],

  function (Fun, Structs, Fitment, GridRow, MergingOperations) {
    var isSpanning = function (grid, row, col, comparator) {
      var candidate = GridRow.getCell(grid[row], col);
      var matching = Fun.curry(comparator, candidate.element());
      var currentRow = grid[row];

      // sanity check, 1x1 has no spans
      return grid.length > 1 && GridRow.cellLength(currentRow) > 1 &&
      (
        // search left, if we're not on the left edge
        (col > 0 && matching(GridRow.getCellElement(currentRow, col-1))) ||
        // search right, if we're not on the right edge
        (col < currentRow.length - 1 && matching(GridRow.getCellElement(currentRow, col+1))) ||
        // search up, if we're not on the top edge
        (row > 0 && matching(GridRow.getCellElement(grid[row-1], col))) ||
        // search down, if we're not on the bottom edge
        (row < grid.length - 1 && matching(GridRow.getCellElement(grid[row+1], col)))
      );
    };

    var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
      // Assumes
      //  - gridA is square and gridB is square
      var startRow = startAddress.row();
      var startCol = startAddress.column();
      var mergeHeight = gridB.length;
      var mergeWidth = GridRow.cellLength(gridB[0]);
      var endRow = startRow + mergeHeight;
      var endCol = startCol + mergeWidth;
      // embrace the mutation - I think this is easier to follow? To discuss.
      for (var r = startRow; r < endRow; r++) {
        for (var c = startCol; c < endCol; c++) {
          if (isSpanning(gridA, r, c, comparator)) {
            // mutation within mutation, it's mutatception
            MergingOperations.unmerge(gridA, GridRow.getCellElement(gridA[r], c), comparator, generator.cell);
          }
          var newCell = GridRow.getCellElement(gridB[r - startRow], c - startCol);
          var replacement = generator.replace(newCell);
          GridRow.mutateCell(gridA[r], c, Structs.elementnew(replacement, true));
        }
      }
      return gridA;
    };

    var merge = function (startAddress, gridA, gridB, generator, comparator) {
      var result = Fitment.measure(startAddress, gridA, gridB);
      return result.map(function (delta) {
        var fittedGrid = Fitment.tailor(gridA, delta, generator);
        return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
      });
    };

    var insert = function (index, gridA, gridB, generator, comparator) {
      MergingOperations.splitRows(gridA, index, comparator, generator.cell);

      var delta = Fitment.measureWidth(gridB, gridA);
      var fittedNewGrid = Fitment.tailor(gridB, delta, generator);

      var secondDelta = Fitment.measureWidth(gridA, fittedNewGrid);
      var fittedOldGrid = Fitment.tailor(gridA, secondDelta, generator);

      return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
    };

    return {
      merge: merge,
      insert: insert
    };
  }
);
define(
  'ephox.snooker.operate.ModificationOperations',

  [
    'ephox.katamari.api.Arr',
    'ephox.snooker.api.Structs',
    'ephox.snooker.model.GridRow'
  ],

  function (Arr, Structs, GridRow) {
    // substitution :: (item, comparator) -> item
    // example is the location of the cursor (the row index)
    // index is the insert position (at - or after - example) (the row index)
    var insertRowAt = function (grid, index, example, comparator, substitution) {
      var before = grid.slice(0, index);
      var after = grid.slice(index);

      var between = GridRow.mapCells(grid[example], function (ex, c) {
        var withinSpan = index > 0 && index < grid.length && comparator(GridRow.getCellElement(grid[index - 1], c), GridRow.getCellElement(grid[index], c));
        var ret = withinSpan ? GridRow.getCell(grid[index], c) : Structs.elementnew(substitution(ex.element(), comparator), true);
        return ret;
      });

      return before.concat([ between ]).concat(after);
    };

    // substitution :: (item, comparator) -> item
    // example is the location of the cursor (the column index)
    // index is the insert position (at - or after - example) (the column index)
    var insertColumnAt = function (grid, index, example, comparator, substitution) {
      return Arr.map(grid, function (row) {
        var withinSpan = index > 0 && index < GridRow.cellLength(row) && comparator(GridRow.getCellElement(row, index - 1), GridRow.getCellElement(row, index));
        var sub = withinSpan ? GridRow.getCell(row, index) : Structs.elementnew(substitution(GridRow.getCellElement(row, example), comparator), true);
        return GridRow.addCell(row, index, sub);
      });
    };

    // substitution :: (item, comparator) -> item
    // Returns:
    // - a new grid with the cell at coords [exampleRow, exampleCol] split into two cells (the
    //   new cell follows, and is empty), and
    // - the other cells in that column set to span the split cell.
    var splitCellIntoColumns = function (grid, exampleRow, exampleCol, comparator, substitution) {
      var index = exampleCol + 1; // insert after
      return Arr.map(grid, function (row, i) {
        var isTargetCell = (i === exampleRow);
        var sub = isTargetCell ? Structs.elementnew(substitution(GridRow.getCellElement(row, exampleCol), comparator), true) : GridRow.getCell(row, exampleCol);
        return GridRow.addCell(row, index, sub);
      });
    };

    // substitution :: (item, comparator) -> item
    // Returns:
    // - a new grid with the cell at coords [exampleRow, exampleCol] split into two cells (the
    //   new cell below, and is empty), and
    // - the other cells in that row set to span the split cell.
    var splitCellIntoRows = function (grid, exampleRow, exampleCol, comparator, substitution) {
      var index = exampleRow + 1; // insert after
      var before = grid.slice(0, index);
      var after = grid.slice(index);

      var between = GridRow.mapCells(grid[exampleRow], function (ex, i) {
        var isTargetCell = (i === exampleCol);
        return isTargetCell ? Structs.elementnew(substitution(ex.element(), comparator), true) : ex;
      });

      return before.concat([ between ]).concat(after);
    };

    var deleteColumnsAt = function (grid, start, finish) {
      var rows = Arr.map(grid, function (row) {
        var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
        return Structs.rowcells(cells, row.section());
      });
      // We should filter out rows that have no columns for easy deletion
      return Arr.filter(rows, function (row) {
        return row.cells().length > 0;
      });
    };

    var deleteRowsAt = function (grid, start, finish) {
      return grid.slice(0, start).concat(grid.slice(finish + 1));
    };

    return {
      insertRowAt: insertRowAt,
      insertColumnAt: insertColumnAt,
      splitCellIntoColumns: splitCellIntoColumns,
      splitCellIntoRows: splitCellIntoRows,
      deleteRowsAt: deleteRowsAt,
      deleteColumnsAt: deleteColumnsAt
    };
  }
);
define(
  'ephox.snooker.operate.TransformOperations',

  [
    'ephox.katamari.api.Arr',
    'ephox.snooker.api.Structs',
    'ephox.snooker.model.GridRow'
  ],

  function (Arr, Structs, GridRow) {
    // substitution :: (item, comparator) -> item
    var replaceIn = function (grid, targets, comparator, substitution) {
      var isTarget = function (cell) {
        return Arr.exists(targets, function (target) {
          return comparator(cell.element(), target.element());
        });
      };

      return Arr.map(grid, function (row) {
        return GridRow.mapCells(row, function (cell) {
          return isTarget(cell) ? Structs.elementnew(substitution(cell.element(), comparator), true) : cell;
        });
      });
    };

    var notStartRow = function (grid, rowIndex, colIndex, comparator) {
      return GridRow.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator(GridRow.getCellElement(grid[rowIndex - 1], colIndex), GridRow.getCellElement(grid[rowIndex], colIndex)));
    };

    var notStartColumn = function (row, index, comparator) {
      return index > 0 && comparator(GridRow.getCellElement(row, index - 1), GridRow.getCellElement(row, index));
    };

    // substitution :: (item, comparator) -> item
    var replaceColumn = function (grid, index, comparator, substitution) {
      // Make this efficient later.
      var targets = Arr.bind(grid, function (row, i) {
        // check if already added.
        var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
        return alreadyAdded ? [] : [ GridRow.getCell(row, index) ];
      });

      return replaceIn(grid, targets, comparator, substitution);
    };

    // substitution :: (item, comparator) -> item
    var replaceRow = function (grid, index, comparator, substitution) {
      var targetRow = grid[index];
      var targets = Arr.bind(targetRow.cells(), function (item, i) {
        // Check that we haven't already added this one.
        var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
        return alreadyAdded ? [] : [ item ];
      });

      return replaceIn(grid, targets, comparator, substitution);
    };

    return {
      replaceColumn: replaceColumn,
      replaceRow: replaceRow
    };
  }
);
define(
  'ephox.snooker.calc.ColumnContext',

  [
  ],

  function () {
    var none = function () {
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
      return {
        fold: fold
      };
    };

    return {
      none: none,
      only: only,
      left: left,
      middle: middle,
      right: right
    };
  }
);

define(
  'ephox.snooker.calc.Deltas',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.snooker.calc.ColumnContext',
    'global!Math'
  ],

  function (Arr, Fun, ColumnContext, Math) {
    /*
     * Based on the column index, identify the context
     */
    var neighbours = function (input, index) {
      if (input.length === 0) return ColumnContext.none();
      if (input.length === 1) return ColumnContext.only(0);
      if (index === 0) return ColumnContext.left(0, 1);
      if (index === input.length - 1) return ColumnContext.right(index - 1, index);
      if (index > 0 && index < input.length - 1) return ColumnContext.middle(index - 1, index, index + 1);
      return ColumnContext.none();
    };

    /*
     * Calculate the offsets to apply to each column width (not the absolute widths themselves)
     * based on a resize at column: column of step: step. The minimum column width allowed is min
     */
    var determine = function (input, column, step, tableSize) {
      var result = input.slice(0);
      var context = neighbours(input, column);

      var zero = function (array) {
        return Arr.map(array, Fun.constant(0));
      };

      var onNone = Fun.constant(zero(result));
      var onOnly = function (index) {
        return tableSize.singleColumnWidth(result[index], step);
      };

      var onChange = function (index, next) {
        if (step >= 0) {
          var newNext = Math.max(tableSize.minCellWidth(), result[next] - step);
          return zero(result.slice(0, index)).concat([ step, newNext-result[next] ]).concat(zero(result.slice(next + 1)));
        } else {
          var newThis = Math.max(tableSize.minCellWidth(), result[index] + step);
          var diffx = result[index] - newThis;
          return zero(result.slice(0, index)).concat([ newThis - result[index], diffx ]).concat(zero(result.slice(next + 1)));
        }
      };

      var onLeft = onChange;

      var onMiddle = function (prev, index, next) {
        return onChange(index, next);
      };

      var onRight = function (prev, index) {
        if (step >= 0) {
          return zero(result.slice(0, index)).concat([ step ]);
        } else {
          var size = Math.max(tableSize.minCellWidth(), result[index] + step);
          return zero(result.slice(0, index)).concat([ size - result[index] ]);
        }
      };

      return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
    };

    return {
      determine: determine
    };
  }
);

define(
  'ephox.snooker.util.CellUtils',

  [
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Css',
    'global!parseInt'
  ],

  function (Fun, Attr, Css, parseInt) {
    var getSpan = function (cell, type) {
      return Attr.has(cell, type) && parseInt(Attr.get(cell, type), 10) > 1;
    };

    var hasColspan = function (cell) {
      return getSpan(cell, 'colspan');
    };

    var hasRowspan = function (cell) {
      return getSpan(cell, 'rowspan');
    };

    var getInt = function (element, property) {
      return parseInt(Css.get(element, property), 10);
    };

    return {
      hasColspan: hasColspan,
      hasRowspan: hasRowspan,
      minWidth: Fun.constant(10),
      minHeight: Fun.constant(10),
      getInt: getInt
    };
  }
);
define(
  'ephox.snooker.resize.ColumnSizes',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.snooker.lookup.Blocks',
    'ephox.snooker.resize.Sizes',
    'ephox.snooker.util.CellUtils',
    'ephox.snooker.util.Util',
    'ephox.sugar.api.properties.Css'
  ],

  function (Arr, Fun, Blocks, Sizes, CellUtils, Util, Css) {
    var getRaw = function (cell, property, getter) {
      return Css.getRaw(cell, property).fold(function () {
        return getter(cell) + 'px';
      }, function (raw) {
        return raw;
      });
    };

    var getRawW = function (cell) {
      return getRaw(cell, 'width', Sizes.getPixelWidth);
    };

    var getRawH = function (cell) {
      return getRaw(cell, 'height', Sizes.getHeight);
    };

    var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
      var columns = Blocks.columns(warehouse);

      var backups = Arr.map(columns, function (cellOption) {
        return cellOption.map(direction.edge);
      });

      return Arr.map(columns, function (cellOption, c) {
        // Only use the width of cells that have no column span (or colspan 1)
        var columnCell = cellOption.filter(Fun.not(CellUtils.hasColspan));
        return columnCell.fold(function () {
          // Can't just read the width of a cell, so calculate.
          var deduced = Util.deduce(backups, c);
          return fallback(deduced);
        }, function (cell) {
          return getWidth(cell, tableSize);
        });
      });
    };

    var getDeduced = function (deduced) {
      return deduced.map(function (d) { return d + 'px'; }).getOr('');
    };

    var getRawWidths = function (warehouse, direction) {
      return getWidthFrom(warehouse, direction, getRawW, getDeduced);
    };

    var getPercentageWidths = function (warehouse, direction, tableSize) {
      return getWidthFrom(warehouse, direction, Sizes.getPercentageWidth, function (deduced) {
        return deduced.fold(function () {
          return tableSize.minCellWidth();
        }, function (cellWidth) {
          return cellWidth / tableSize.pixelWidth() * 100;
        });
      }, tableSize);
    };

    var getPixelWidths = function (warehouse, direction, tableSize) {
      return getWidthFrom(warehouse, direction, Sizes.getPixelWidth, function (deduced) {
        // Minimum cell width when all else fails.
        return deduced.getOrThunk(tableSize.minCellWidth);
      }, tableSize);
    };

    var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
      var rows = Blocks.rows(warehouse);

      var backups = Arr.map(rows, function (cellOption) {
        return cellOption.map(direction.edge);
      });

      return Arr.map(rows, function (cellOption, c) {
        var rowCell = cellOption.filter(Fun.not(CellUtils.hasRowspan));

        return rowCell.fold(function () {
          var deduced = Util.deduce(backups, c);
          return fallback(deduced);
        }, function (cell) {
          return getHeight(cell);
        });
      });
    };

    var getPixelHeights = function (warehouse, direction) {
      return getHeightFrom(warehouse, direction, Sizes.getHeight, function (deduced) {
        return deduced.getOrThunk(CellUtils.minHeight);
      });
    };

    var getRawHeights = function (warehouse, direction) {
      return getHeightFrom(warehouse, direction, getRawH, getDeduced);
    };

    return {
      getRawWidths: getRawWidths,
      getPixelWidths: getPixelWidths,
      getPercentageWidths: getPercentageWidths,
      getPixelHeights: getPixelHeights,
      getRawHeights: getRawHeights
    };
  }
);
define(
  'ephox.snooker.resize.Recalculations',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.snooker.model.Warehouse',
    'global!parseInt'
  ],

  function (Arr, Fun, Warehouse, parseInt) {

    // Returns the sum of elements of measures in the half-open range [start, end)
    // Measures is in pixels, treated as an array of integers or integers in string format.
    // NOTE: beware of accumulated rounding errors over multiple columns - could result in noticeable table width changes
    var total = function (start, end, measures) {
      var r = 0;
      for (var i = start; i < end; i++) {
        r += measures[i] !== undefined ? measures[i] : 0;
      }
      return r;
    };

    // Returns an array of all cells in warehouse with updated cell-widths, using
    // the array 'widths' of the representative widths of each column of the table 'warehouse'
    var recalculateWidth = function (warehouse, widths) {
      var all = Warehouse.justCells(warehouse);

      return Arr.map(all, function (cell) {
        // width of a spanning cell is sum of widths of representative columns it spans
        var width = total(cell.column(), cell.column() + cell.colspan(), widths);
        return {
          element: cell.element,
          width: Fun.constant(width),
          colspan: cell.colspan
        };
      });
    };

    var recalculateHeight = function (warehouse, heights) {
      var all = Warehouse.justCells(warehouse);
      return Arr.map(all, function (cell) {
        var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
        return {
          element: cell.element,
          height: Fun.constant(height),
          rowspan: cell.rowspan
        };
      });
    };

    var matchRowHeight = function (warehouse, heights) {
      return Arr.map(warehouse.all(), function (row, i) {
        return {
          element: row.element,
          height: Fun.constant(heights[i])
        };
      });
    };

    return {
      recalculateWidth: recalculateWidth,
      recalculateHeight: recalculateHeight,
      matchRowHeight: matchRowHeight
    };
  }
);
define(
  'ephox.snooker.resize.TableSize',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.snooker.resize.ColumnSizes',
    'ephox.snooker.resize.Sizes',
    'ephox.snooker.util.CellUtils',
    'ephox.sugar.api.view.Width',
    'global!Math'
  ],

  function (Arr, Fun, ColumnSizes, Sizes, CellUtils, Width, Math) {
    var percentageSize = function (width, element) {
      var floatWidth = parseFloat(width, 10);
      var pixelWidth = Width.get(element);
      var getCellDelta = function (delta) {
        return delta / pixelWidth * 100;
      };
      var singleColumnWidth = function (width, _delta) {
        // If we have one column in a percent based table, that column should be 100% of the width of the table.
        return [100 - width];
      };
      // Get the width of a 10 pixel wide cell over the width of the table as a percentage
      var minCellWidth = function () {
        return CellUtils.minWidth() / pixelWidth * 100;
      };
      var setTableWidth = function (table, _newWidths, delta) {
        var total = floatWidth + delta;
        Sizes.setPercentageWidth(table, total);
      };
      return {
        width: Fun.constant(floatWidth),
        pixelWidth: Fun.constant(pixelWidth),
        getWidths: ColumnSizes.getPercentageWidths,
        getCellDelta: getCellDelta,
        singleColumnWidth: singleColumnWidth,
        minCellWidth: minCellWidth,
        setElementWidth: Sizes.setPercentageWidth,
        setTableWidth: setTableWidth
      };
    };

    var pixelSize = function (width) {
      var intWidth = parseInt(width, 10);
      var getCellDelta = Fun.identity;
      var singleColumnWidth = function (width, delta) {
        var newNext = Math.max(CellUtils.minWidth(), width + delta);
        return [ newNext - width ];
      };
      var setTableWidth = function (table, newWidths, _delta) {
        var total = Arr.foldr(newWidths, function (b, a) { return b + a; }, 0);
        Sizes.setPixelWidth(table, total);
      };
      return {
        width: Fun.constant(intWidth),
        pixelWidth: Fun.constant(intWidth),
        getWidths: ColumnSizes.getPixelWidths,
        getCellDelta: getCellDelta,
        singleColumnWidth: singleColumnWidth,
        minCellWidth: CellUtils.minWidth,
        setElementWidth: Sizes.setPixelWidth,
        setTableWidth: setTableWidth
      };
    };

    var chooseSize = function (element, width) {
      if (Sizes.percentageBasedSizeRegex().test(width)) {
        var percentMatch = Sizes.percentageBasedSizeRegex().exec(width);
        return percentageSize(percentMatch[1], element);
      } else if (Sizes.pixelBasedSizeRegex().test(width)) {
        var pixelMatch = Sizes.pixelBasedSizeRegex().exec(width);
        return pixelSize(pixelMatch[1]);
      } else {
        var fallbackWidth = Width.get(element);
        return pixelSize(fallbackWidth);
      }
    };

    var getTableSize = function (element) {
      var width = Sizes.getRawWidth(element);
      // If we have no width still, return a pixel width at least.
      return width.fold(function () {
        var fallbackWidth = Width.get(element);
        return pixelSize(fallbackWidth);
      }, function (width) {
        return chooseSize(element, width);
      });
    };

    return {
      getTableSize: getTableSize
    };
});
define(
  'ephox.snooker.resize.Adjustments',

  [
    'ephox.katamari.api.Arr',
    'ephox.snooker.calc.Deltas',
    'ephox.snooker.model.DetailsList',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.resize.ColumnSizes',
    'ephox.snooker.resize.Recalculations',
    'ephox.snooker.resize.Sizes',
    'ephox.snooker.resize.TableSize',
    'ephox.snooker.util.CellUtils',
    'global!Math'
  ],

  function (Arr, Deltas, DetailsList, Warehouse, ColumnSizes, Recalculations, Sizes, TableSize, CellUtils, Math) {
    var getWarehouse = function (list) {
      return Warehouse.generate(list);
    };

    var sumUp = function (newSize) {
      return Arr.foldr(newSize, function (b, a) { return b + a; }, 0);
    };

    var getTableWarehouse = function (table) {
      var list = DetailsList.fromTable(table);
      return getWarehouse(list);
    };

    var adjustWidth = function (table, delta, index, direction) {
      var tableSize = TableSize.getTableSize(table);
      var step = tableSize.getCellDelta(delta);
      var warehouse = getTableWarehouse(table);
      var widths = tableSize.getWidths(warehouse, direction, tableSize);

      // Calculate all of the new widths for columns
      var deltas = Deltas.determine(widths, index, step, tableSize);
      var newWidths = Arr.map(deltas, function (dx, i) {
        return dx + widths[i];
      });

      // Set the width of each cell based on the column widths
      var newSizes = Recalculations.recalculateWidth(warehouse, newWidths);
      Arr.each(newSizes, function (cell) {
        tableSize.setElementWidth(cell.element(), cell.width());
      });

      // Set the overall width of the table.
      if (index === warehouse.grid().columns() - 1) {
        tableSize.setTableWidth(table, newWidths, step);
      }
    };

    var adjustHeight = function (table, delta, index, direction) {
      var warehouse = getTableWarehouse(table);
      var heights = ColumnSizes.getPixelHeights(warehouse, direction);

      var newHeights = Arr.map(heights, function (dy, i) {
        return index === i ? Math.max(delta + dy, CellUtils.minHeight()) : dy;
      });

      var newCellSizes = Recalculations.recalculateHeight(warehouse, newHeights);
      var newRowSizes = Recalculations.matchRowHeight(warehouse, newHeights);

      Arr.each(newRowSizes, function (row) {
        Sizes.setHeight(row.element(), row.height());
      });

      Arr.each(newCellSizes, function (cell) {
        Sizes.setHeight(cell.element(), cell.height());
      });

      var total = sumUp(newHeights);
      Sizes.setHeight(table, total);
    };

    // Ensure that the width of table cells match the passed in table information.
    var adjustWidthTo = function (table, list, direction) {
      var tableSize = TableSize.getTableSize(table);
      var warehouse = getWarehouse(list);
      var widths = tableSize.getWidths(warehouse, direction, tableSize);

      // Set the width of each cell based on the column widths
      var newSizes = Recalculations.recalculateWidth(warehouse, widths);
      Arr.each(newSizes, function (cell) {
        tableSize.setElementWidth(cell.element(), cell.width());
      });

      var total = Arr.foldr(widths, function (b, a) { return a + b; }, 0);
      if (newSizes.length > 0) {
        tableSize.setElementWidth(table, total);
      }
    };

    return {
      adjustWidth: adjustWidth,
      adjustHeight: adjustHeight,
      adjustWidthTo: adjustWidthTo
    };
  }
);

define(
  'ephox.snooker.api.TableOperations',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Struct',
    'ephox.snooker.api.Generators',
    'ephox.snooker.api.Structs',
    'ephox.snooker.api.TableContent',
    'ephox.snooker.api.TableLookup',
    'ephox.snooker.model.DetailsList',
    'ephox.snooker.model.GridRow',
    'ephox.snooker.model.RunOperation',
    'ephox.snooker.model.TableMerge',
    'ephox.snooker.model.Transitions',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.operate.MergingOperations',
    'ephox.snooker.operate.ModificationOperations',
    'ephox.snooker.operate.TransformOperations',
    'ephox.snooker.resize.Adjustments',
    'ephox.sugar.api.dom.Remove'
  ],

  function (Arr, Fun, Option, Struct, Generators, Structs, TableContent, TableLookup, DetailsList, GridRow, RunOperation, TableMerge, Transitions, Warehouse, MergingOperations, ModificationOperations, TransformOperations, Adjustments, Remove) {
    var prune = function (table) {
      var cells = TableLookup.cells(table);
      if (cells.length === 0) Remove.remove(table);
    };

    var outcome = Struct.immutable('grid', 'cursor');

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
      return Arr.foldl(details, function (rest, detail) {
        return Arr.exists(rest, function (currentDetail){
            return currentDetail.row() === detail.row();
          }) ? rest : rest.concat([detail]);
        }, []).sort(function (detailA, detailB) {
        return detailA.row() - detailB.row();
      });
    };

    var uniqueColumns = function (details) {
      return Arr.foldl(details, function (rest, detail) {
        return Arr.exists(rest, function (currentDetail){
            return currentDetail.column() === detail.column();
          }) ? rest : rest.concat([detail]);
        }, []).sort(function (detailA, detailB) {
        return detailA.column() - detailB.column();
      });
    };

    var insertRowBefore = function (grid, detail, comparator, genWrappers) {
      var example = detail.row();
      var targetIndex = detail.row();
      var newGrid = ModificationOperations.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
      return bundle(newGrid, targetIndex, detail.column());
    };

    var insertRowsBefore = function (grid, details, comparator, genWrappers) {
      var example = details[0].row();
      var targetIndex = details[0].row();
      var rows = uniqueRows(details);
      var newGrid = Arr.foldl(rows, function (newGrid, _row) {
        return ModificationOperations.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, targetIndex, details[0].column());
    };

    var insertRowAfter = function (grid, detail, comparator, genWrappers) {
      var example = detail.row();
      var targetIndex = detail.row() + detail.rowspan();
      var newGrid = ModificationOperations.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
      return bundle(newGrid, targetIndex, detail.column());
    };

    var insertRowsAfter = function (grid, details, comparator, genWrappers) {
      var rows = uniqueRows(details);
      var example = rows[rows.length - 1].row();
      var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
      var newGrid = Arr.foldl(rows, function (newGrid, _row) {
        return ModificationOperations.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, targetIndex, details[0].column());
    };

    var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
      var example = detail.column();
      var targetIndex = detail.column();
      var newGrid = ModificationOperations.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
      return bundle(newGrid, detail.row(), targetIndex);
    };

    var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
      var columns = uniqueColumns(details);
      var example = columns[0].column();
      var targetIndex = columns[0].column();
      var newGrid = Arr.foldl(columns, function (newGrid, _row) {
        return ModificationOperations.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, details[0].row(), targetIndex);
    };

    var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
      var example = detail.column();
      var targetIndex = detail.column() + detail.colspan();
      var newGrid = ModificationOperations.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
      return bundle(newGrid, detail.row(), targetIndex);
    };

    var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
      var example = details[details.length - 1].column();
      var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
      var columns = uniqueColumns(details);
      var newGrid = Arr.foldl(columns, function (newGrid, _row) {
        return ModificationOperations.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, details[0].row(), targetIndex);
    };

    var makeRowHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = TransformOperations.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };

    var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = TransformOperations.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };

    var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid =  TransformOperations.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };

    var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = TransformOperations.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };

    var splitCellIntoColumns = function (grid, detail, comparator, genWrappers) {
      var newGrid = ModificationOperations.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };

    var splitCellIntoRows = function (grid, detail, comparator, genWrappers) {
      var newGrid = ModificationOperations.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };

    var eraseColumns = function (grid, details, comparator, _genWrappers) {
      var columns = uniqueColumns(details);

      var newGrid = ModificationOperations.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
      var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
      return outcome(newGrid, cursor);
    };

    var eraseRows = function (grid, details, comparator, _genWrappers) {
      var rows = uniqueRows(details);

      var newGrid = ModificationOperations.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
      var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
      return outcome(newGrid, cursor);
    };

    var mergeCells = function (grid, mergable, comparator, _genWrappers) {
      var cells = mergable.cells();
      TableContent.merge(cells);
      var newGrid = MergingOperations.merge(grid, mergable.bounds(), comparator, Fun.constant(cells[0]));
      return outcome(newGrid, Option.from(cells[0]));
    };

    var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
      var newGrid = Arr.foldr(unmergable, function (b, cell) {
        return MergingOperations.unmerge(b, cell, comparator, genWrappers.combine(cell));
      }, grid);
      return outcome(newGrid, Option.from(unmergable[0]));
    };

    var pasteCells = function (grid, pasteDetails, comparator, genWrappers) {
      var gridify = function (table, generators) {
        var list = DetailsList.fromTable(table);
        var wh = Warehouse.generate(list);
        return Transitions.toGrid(wh, generators, true);
      };
      var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
      var startAddress = Structs.address(pasteDetails.row(), pasteDetails.column());
      var mergedGrid = TableMerge.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
      return mergedGrid.fold(function () {
        return outcome(grid, Option.some(pasteDetails.element()));
      }, function (nuGrid) {
        var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
        return outcome(nuGrid, cursor);
      });
    };

    var gridifyRows = function (rows, generators, example) {
      var pasteDetails = DetailsList.fromPastedRows(rows, example);
      var wh = Warehouse.generate(pasteDetails);
      return Transitions.toGrid(wh, generators, true);
    };

    var pasteRowsBefore = function (grid, pasteDetails, comparator, genWrappers) {
      var example = grid[pasteDetails.cells[0].row()];
      var index = pasteDetails.cells[0].row();
      var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
      var mergedGrid = TableMerge.insert(index, grid, gridB, pasteDetails.generators(), comparator);
      var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
      return outcome(mergedGrid, cursor);
    };

    var pasteRowsAfter = function (grid, pasteDetails, comparator, genWrappers) {
      var example = grid[pasteDetails.cells[0].row()];
      var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
      var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
      var mergedGrid = TableMerge.insert(index, grid, gridB, pasteDetails.generators(), comparator);
      var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
      return outcome(mergedGrid, cursor);
    };

    // Only column modifications force a resizing. Everything else just tries to preserve the table as is.
    var resize = Adjustments.adjustWidthTo;

    return {
      insertRowBefore: RunOperation.run(insertRowBefore, RunOperation.onCell, Fun.noop, Fun.noop, Generators.modification),
      insertRowsBefore: RunOperation.run(insertRowsBefore, RunOperation.onCells, Fun.noop, Fun.noop, Generators.modification),
      insertRowAfter:  RunOperation.run(insertRowAfter, RunOperation.onCell, Fun.noop, Fun.noop, Generators.modification),
      insertRowsAfter: RunOperation.run(insertRowsAfter, RunOperation.onCells, Fun.noop, Fun.noop, Generators.modification),
      insertColumnBefore:  RunOperation.run(insertColumnBefore, RunOperation.onCell, resize, Fun.noop, Generators.modification),
      insertColumnsBefore: RunOperation.run(insertColumnsBefore, RunOperation.onCells, resize, Fun.noop, Generators.modification),
      insertColumnAfter:  RunOperation.run(insertColumnAfter, RunOperation.onCell, resize, Fun.noop, Generators.modification),
      insertColumnsAfter: RunOperation.run(insertColumnsAfter, RunOperation.onCells, resize, Fun.noop, Generators.modification),
      splitCellIntoColumns:  RunOperation.run(splitCellIntoColumns, RunOperation.onCell, resize, Fun.noop, Generators.modification),
      splitCellIntoRows:  RunOperation.run(splitCellIntoRows, RunOperation.onCell, Fun.noop, Fun.noop, Generators.modification),
      eraseColumns:  RunOperation.run(eraseColumns, RunOperation.onCells, resize, prune, Generators.modification),
      eraseRows:  RunOperation.run(eraseRows, RunOperation.onCells, Fun.noop, prune, Generators.modification),
      makeColumnHeader:  RunOperation.run(makeColumnHeader, RunOperation.onCell, Fun.noop, Fun.noop, Generators.transform('row', 'th')),
      unmakeColumnHeader:  RunOperation.run(unmakeColumnHeader, RunOperation.onCell, Fun.noop, Fun.noop, Generators.transform(null, 'td')),
      makeRowHeader:  RunOperation.run(makeRowHeader, RunOperation.onCell, Fun.noop, Fun.noop, Generators.transform('col', 'th')),
      unmakeRowHeader:  RunOperation.run(unmakeRowHeader, RunOperation.onCell, Fun.noop, Fun.noop, Generators.transform(null, 'td')),
      mergeCells: RunOperation.run(mergeCells, RunOperation.onMergable, Fun.noop, Fun.noop, Generators.merging),
      unmergeCells: RunOperation.run(unmergeCells, RunOperation.onUnmergable, resize, Fun.noop, Generators.merging),
      pasteCells: RunOperation.run(pasteCells, RunOperation.onPaste, resize, Fun.noop, Generators.modification),
      pasteRowsBefore: RunOperation.run(pasteRowsBefore, RunOperation.onPasteRows, Fun.noop, Fun.noop, Generators.modification),
      pasteRowsAfter: RunOperation.run(pasteRowsAfter, RunOperation.onPasteRows, Fun.noop, Fun.noop, Generators.modification)
    };
  }
);

/**
 * Clipboard.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.alien.Util',

  [
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element'
  ],

  function (Compare, Element) {
    var getBody = function (editor) {
      return Element.fromDom(editor.getBody());
    };
    var getIsRoot = function (editor) {
      return function (element) {
        return Compare.eq(element, getBody(editor));
      };
    };

    var removePxSuffix = function (size) {
      return size ? size.replace(/px$/, '') : "";
    };

    var addSizeSuffix = function (size) {
      if (/^[0-9]+$/.test(size)) {
        size += "px";
      }
      return size;
    };

    return {
      getBody: getBody,
      getIsRoot: getIsRoot,
      addSizeSuffix: addSizeSuffix,
      removePxSuffix: removePxSuffix
    };
  }
);

define(
  'ephox.sugar.api.properties.Direction',

  [
    'ephox.sugar.api.properties.Css'
  ],

  function (Css) {
    var onDirection = function (isLtr, isRtl) {
      return function (element) {
        return getDirection(element) === 'rtl' ? isRtl : isLtr;
      };
    };

    var getDirection = function (element) {
      return Css.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
    };

    return {
      onDirection: onDirection,
      getDirection: getDirection
    };
  }
);
/**
 * Direction.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.queries.Direction',

  [
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.properties.Direction'
  ],

  function (Fun, Direction) {
    var ltr = {
      isRtl: Fun.constant(false)
    };

    var rtl = {
      isRtl: Fun.constant(true)
    };

    // Get the directionality from the position in the content
    var directionAt = function (element) {
      var dir = Direction.getDirection(element);
      return dir === 'rtl' ? rtl : ltr;
    };

    return {
      directionAt: directionAt
    };
  }
);

/**
 * TableActions.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.actions.TableActions',
  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.CellMutations',
    'ephox.snooker.api.TableDirection',
    'ephox.snooker.api.TableFill',
    'ephox.snooker.api.TableGridSize',
    'ephox.snooker.api.TableOperations',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.search.SelectorFilter',
    'tinymce.plugins.table.alien.Util',
    'tinymce.plugins.table.queries.Direction'
  ],
  function (Arr, Fun, Option, CellMutations, TableDirection, TableFill, TableGridSize, TableOperations, Element, Node, Attr, SelectorFilter, Util, Direction) {
    return function (editor, lazyWire) {
      var isTableBody = function (editor) {
        return Node.name(Util.getBody(editor)) === 'table';
      };

      var lastRowGuard = function (table) {
        var size = TableGridSize.getGridSize(table);
        return isTableBody(editor) === false || size.rows() > 1;
      };

      var lastColumnGuard = function (table) {
        var size = TableGridSize.getGridSize(table);
        return isTableBody(editor) === false || size.columns() > 1;
      };

      var fireNewRow = function (node) {
        editor.fire('newrow', {
          node: node.dom()
        });
        return node.dom();
      };

      var fireNewCell = function (node) {
        editor.fire('newcell', {
          node: node.dom()
        });
        return node.dom();
      };

      var cloneFormatsArray;
      if (editor.settings.table_clone_elements !== false) {
        if (typeof editor.settings.table_clone_elements == 'string') {
          cloneFormatsArray = editor.settings.table_clone_elements.split(/[ ,]/);
        } else if (Array.isArray(editor.settings.table_clone_elements)) {
          cloneFormatsArray = editor.settings.table_clone_elements;
        }
      }
      // Option.none gives the default cloneFormats.
      var cloneFormats = Option.from(cloneFormatsArray);

      var execute = function (operation, guard, mutate, lazyWire) {
        return function (table, target) {
          var dataStyleCells = SelectorFilter.descendants(table, 'td[data-mce-style],th[data-mce-style]');
          Arr.each(dataStyleCells, function (cell) {
            Attr.remove(cell, 'data-mce-style');
          });
          var wire = lazyWire();
          var doc = Element.fromDom(editor.getDoc());
          var direction = TableDirection(Direction.directionAt);
          var generators = TableFill.cellOperations(mutate, doc, cloneFormats);
          return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
            Arr.each(result.newRows(), function (row) {
              fireNewRow(row);
            });
            Arr.each(result.newCells(), function (cell) {
              fireNewCell(cell);
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

      var deleteRow = execute(TableOperations.eraseRows, lastRowGuard, Fun.noop, lazyWire);

      var deleteColumn = execute(TableOperations.eraseColumns, lastColumnGuard, Fun.noop, lazyWire);

      var insertRowsBefore = execute(TableOperations.insertRowsBefore, Fun.always, Fun.noop, lazyWire);

      var insertRowsAfter = execute(TableOperations.insertRowsAfter, Fun.always, Fun.noop, lazyWire);

      var insertColumnsBefore = execute(TableOperations.insertColumnsBefore, Fun.always, CellMutations.halve, lazyWire);

      var insertColumnsAfter = execute(TableOperations.insertColumnsAfter, Fun.always, CellMutations.halve, lazyWire);

      var mergeCells = execute(TableOperations.mergeCells, Fun.always, Fun.noop, lazyWire);

      var unmergeCells = execute(TableOperations.unmergeCells, Fun.always, Fun.noop, lazyWire);

      var pasteRowsBefore = execute(TableOperations.pasteRowsBefore, Fun.always, Fun.noop, lazyWire);

      var pasteRowsAfter = execute(TableOperations.pasteRowsAfter, Fun.always, Fun.noop, lazyWire);

      var pasteCells = execute(TableOperations.pasteCells, Fun.always, Fun.noop, lazyWire);

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
  }
);

define(
  'ephox.snooker.api.CopyRows',

  [
    'ephox.snooker.model.DetailsList',
    'ephox.snooker.model.RunOperation',
    'ephox.snooker.model.Transitions',
    'ephox.snooker.model.Warehouse',
    'ephox.snooker.operate.Redraw'
  ],

  function (DetailsList, RunOperation, Transitions, Warehouse, Redraw) {
    var copyRows = function (table, target, generators) {
      var list = DetailsList.fromTable(table);
      var house = Warehouse.generate(list);
      var details = RunOperation.onCells(house, target);
      return details.map(function (selectedCells) {
        var grid = Transitions.toGrid(house, generators, false);
        var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
        var slicedDetails = RunOperation.toDetailList(slicedGrid, generators);
        return Redraw.copy(slicedDetails);
      });
    };
    return {
      copyRows:copyRows
    };
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.Tools',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.Tools');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.Env',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.Env');
  }
);

/**
 * Styles.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.actions.Styles',

  [
    'tinymce.core.util.Tools'
  ],

  function (Tools) {

    var getTDTHOverallStyle = function (dom, elm, name) {
      var cells = dom.select("td,th", elm), firstChildStyle;

      var checkChildren = function (firstChildStyle, elms) {
        for (var i = 0; i < elms.length; i++) {
          var currentStyle = dom.getStyle(elms[i], name);
          if (typeof firstChildStyle === "undefined") {
            firstChildStyle = currentStyle;
          }
          if (firstChildStyle != currentStyle) {
            return "";
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

    return {
      applyAlign: applyAlign,
      applyVAlign: applyVAlign,
      unApplyAlign: unApplyAlign,
      unApplyVAlign: unApplyVAlign,
      getTDTHOverallStyle: getTDTHOverallStyle
    };
  }
);

/**
 * Helpers.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * @class tinymce.table.ui.Helpers
 * @private
 */
define(
  'tinymce.plugins.table.ui.Helpers',
  [
    'ephox.katamari.api.Fun',
    'tinymce.core.util.Tools',
    'tinymce.plugins.table.alien.Util'
  ],
  function (Fun, Tools, Util) {

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
        rootControl.find('#borderStyle').value(css["border-style"] || '')[0].fire('select');
        rootControl.find('#borderColor').value(css["border-color"] || '')[0].fire('change');
        rootControl.find('#backgroundColor').value(css["background-color"] || '')[0].fire('change');
        rootControl.find('#width').value(css.width || '').fire('change');
        rootControl.find('#height').value(css.height || '').fire('change');
      } else {
        css["border-style"] = data.borderStyle;
        css["border-color"] = data.borderColor;
        css["background-color"] = data.backgroundColor;
        css.width = data.width ? Util.addSizeSuffix(data.width) : '';
        css.height = data.height ? Util.addSizeSuffix(data.height) : '';
      }

      rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
    };

    var extractAdvancedStyles = function (dom, elm) {
      var css = dom.parseStyle(dom.getAttrib(elm, 'style'));
      var data = {};

      if (css["border-style"]) {
        data.borderStyle = css["border-style"];
      }

      if (css["border-color"]) {
        data.borderColor = css["border-color"];
      }

      if (css["background-color"]) {
        data.backgroundColor = css["background-color"];
      }

      data.style = dom.serializeStyle(css);
      return data;
    };

    var createStyleForm = function (editor) {
      var createColorPickAction = function () {
        var colorPickerCallback = editor.settings.color_picker_callback;
        if (colorPickerCallback) {
          return function (evt) {
            return colorPickerCallback.call(
              editor,
              function (value) {
                evt.control.value(value).fire('change');
              },
              evt.control.value()
            );
          };
        }
      };

      return {
        title: 'Advanced',
        type: 'form',
        defaults: {
          onchange: Fun.curry(updateStyleField, editor)
        },
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
              alignH: ['start', 'right']
            },
            defaults: {
              size: 7
            },
            items: [
              {
                label: 'Border style',
                type: 'listbox',
                name: 'borderStyle',
                width: 90,
                onselect: Fun.curry(updateStyleField, editor),
                values: [
                  { text: 'Select...', value: '' },
                  { text: 'Solid', value: 'solid' },
                  { text: 'Dotted', value: 'dotted' },
                  { text: 'Dashed', value: 'dashed' },
                  { text: 'Double', value: 'double' },
                  { text: 'Groove', value: 'groove' },
                  { text: 'Ridge', value: 'ridge' },
                  { text: 'Inset', value: 'inset' },
                  { text: 'Outset', value: 'outset' },
                  { text: 'None', value: 'none' },
                  { text: 'Hidden', value: 'hidden' }
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

    return {
      createStyleForm: createStyleForm,
      buildListItems: buildListItems,
      updateStyleField: updateStyleField,
      extractAdvancedStyles: extractAdvancedStyles
    };
  }
);

/**
 * TableDialog.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * @class tinymce.table.ui.TableDialog
 * @private
 */
define(
  'tinymce.plugins.table.ui.TableDialog',
  [
    'ephox.katamari.api.Fun',
    'tinymce.core.Env',
    'tinymce.core.util.Tools',
    'tinymce.plugins.table.actions.InsertTable',
    'tinymce.plugins.table.actions.Styles',
    'tinymce.plugins.table.alien.Util',
    'tinymce.plugins.table.ui.Helpers'
  ],
  function (Fun, Env, Tools, InsertTable, Styles, Util, Helpers) {

    //Explore the layers of the table till we find the first layer of tds or ths
    function styleTDTH(dom, elm, name, value) {
      if (elm.tagName === "TD" || elm.tagName === "TH") {
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
        cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') || Styles.getTDTHOverallStyle(editor.dom, tableElm, 'padding'),
        border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') || Styles.getTDTHOverallStyle(editor.dom, tableElm, 'border'),
        borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
        caption: !!dom.select('caption', tableElm)[0],
        'class': dom.getAttrib(tableElm, 'class')
      };

      Tools.each('left center right'.split(' '), function (name) {
        if (editor.formatter.matchNode(tableElm, 'align' + name)) {
          data.align = name;
        }
      });

      if (editor.settings.table_advtab !== false) {
        Tools.extend(data, Helpers.extractAdvancedStyles(dom, tableElm));
      }
      return data;
    };

    var applyDataToElement = function (editor, tableElm, data) {
      var dom = editor.dom;
      var attrs = {}, styles = {};

      attrs['class'] = data['class'];

      styles.height = Util.addSizeSuffix(data.height);

      if (dom.getAttrib(tableElm, 'width') && !editor.settings.table_style_by_css) {
        attrs.width = Util.removePxSuffix(data.width);
      } else {
        styles.width = Util.addSizeSuffix(data.width);
      }

      if (editor.settings.table_style_by_css) {
        styles['border-width'] = Util.addSizeSuffix(data.border);
        styles['border-spacing'] = Util.addSizeSuffix(data.cellspacing);

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

      // TODO: this has to be reworked somehow, for example by introducing dedicated option, which
      // will control whether child TD/THs should be processed or not
      if (editor.settings.table_style_by_css) {
        if (tableElm.children) {
          for (var i = 0; i < tableElm.children.length; i++) {
            styleTDTH(dom, tableElm.children[i], {
              'border-width': Util.addSizeSuffix(data.border),
              'border-color': data.borderColor,
              'padding': Util.addSizeSuffix(data.cellpadding)
            });
          }
        }
      }

      if (data.style) {
        // merge the styles from Advanced tab on top
        Tools.extend(styles, dom.parseStyle(data.style));
      } else {
        // ... otherwise take styles from original elm and update them
        styles = Tools.extend({}, dom.parseStyle(dom.getAttrib(tableElm, 'style')), styles);
      }

      attrs.style = dom.serializeStyle(styles);
      dom.setAttribs(tableElm, attrs);
    };

    var onSubmitTableForm = function (editor, tableElm, evt) {
      var dom = editor.dom;
      var captionElm;
      var data;

      Helpers.updateStyleField(editor, evt);
      data = evt.control.rootControl.toJSON();

      if (data["class"] === false) {
        delete data["class"];
      }

      editor.undoManager.transact(function () {
        if (!tableElm) {
          tableElm = InsertTable.insert(editor, data.cols || 1, data.rows || 1);
        }

        applyDataToElement(editor, tableElm, data);

        // Toggle caption on/off
        captionElm = dom.select('caption', tableElm)[0];

        if (captionElm && !data.caption) {
          dom.remove(captionElm);
        }

        if (!captionElm && data.caption) {
          captionElm = dom.create('caption');
          captionElm.innerHTML = !Env.ie ? '<br data-mce-bogus="1"/>' : '\u00a0';
          tableElm.insertBefore(captionElm, tableElm.firstChild);
        }

        Styles.unApplyAlign(editor, tableElm);
        if (data.align) {
          Styles.applyAlign(editor, tableElm, data.align);
        }

        editor.focus();
        editor.addVisual();
      });
    };

    var open = function (editor, isProps) {
      var dom = editor.dom, tableElm, colsCtrl, rowsCtrl, classListCtrl, data = {}, generalTableForm;

      if (isProps === true) {
        tableElm = dom.getParent(editor.selection.getStart(), 'table');
        if (tableElm) {
          data = extractDataFromElement(editor, tableElm);
        }
      } else {
        colsCtrl = { label: 'Cols', name: 'cols' };
        rowsCtrl = { label: 'Rows', name: 'rows' };
      }

      if (editor.settings.table_class_list) {
        if (data["class"]) {
          data["class"] = data["class"].replace(/\s*mce\-item\-table\s*/g, '');
        }

        classListCtrl = {
          name: 'class',
          type: 'listbox',
          label: 'Class',
          values: Helpers.buildListItems(
            editor.settings.table_class_list,
            function (item) {
              if (item.value) {
                item.textStyle = function () {
                  return editor.formatter.getCssText({ block: 'table', classes: [item.value] });
                };
              }
            }
          )
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
            items: (editor.settings.table_appearance_options !== false) ? [
              colsCtrl,
              rowsCtrl,
              { label: 'Width', name: 'width', onchange: Fun.curry(Helpers.updateStyleField, editor) },
              { label: 'Height', name: 'height', onchange: Fun.curry(Helpers.updateStyleField, editor) },
              { label: 'Cell spacing', name: 'cellspacing' },
              { label: 'Cell padding', name: 'cellpadding' },
              { label: 'Border', name: 'border' },
              { label: 'Caption', name: 'caption', type: 'checkbox' }
            ] : [
              colsCtrl,
              rowsCtrl,
                { label: 'Width', name: 'width', onchange: Fun.curry(Helpers.updateStyleField, editor) },
                { label: 'Height', name: 'height', onchange: Fun.curry(Helpers.updateStyleField, editor) }
            ]
          },

          {
            label: 'Alignment',
            name: 'align',
            type: 'listbox',
            text: 'None',
            values: [
              { text: 'None', value: '' },
              { text: 'Left', value: 'left' },
              { text: 'Center', value: 'center' },
              { text: 'Right', value: 'right' }
            ]
          },

          classListCtrl
        ]
      };

      if (editor.settings.table_advtab !== false) {
        editor.windowManager.open({
          title: "Table properties",
          data: data,
          bodyType: 'tabpanel',
          body: [
            {
              title: 'General',
              type: 'form',
              items: generalTableForm
            },
            Helpers.createStyleForm(editor)
          ],
          onsubmit: Fun.curry(onSubmitTableForm, editor, tableElm)
        });
      } else {
        editor.windowManager.open({
          title: "Table properties",
          data: data,
          body: generalTableForm,
          onsubmit: Fun.curry(onSubmitTableForm, editor, tableElm)
        });
      }
    };

    return {
      open: open
    };

  }
);

/**
 * RowDialog.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * @class tinymce.table.ui.RowDialog
 * @private
 */
define(
  'tinymce.plugins.table.ui.RowDialog',
  [
    'ephox.katamari.api.Fun',
    'tinymce.core.util.Tools',
    'tinymce.plugins.table.actions.Styles',
    'tinymce.plugins.table.alien.Util',
    'tinymce.plugins.table.ui.Helpers'
  ],
  function (Fun, Tools, Styles, Util, Helpers) {

    var extractDataFromElement = function (editor, elm) {
      var dom = editor.dom;
      var data = {
        height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
        scope: dom.getAttrib(elm, 'scope'),
        'class': dom.getAttrib(elm, 'class')
      };

      data.type = elm.parentNode.nodeName.toLowerCase();

      Tools.each('left center right'.split(' '), function (name) {
        if (editor.formatter.matchNode(elm, 'align' + name)) {
          data.align = name;
        }
      });

      if (editor.settings.table_row_advtab !== false) {
        Tools.extend(data, Helpers.extractAdvancedStyles(dom, elm));
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
          // caption tag should be the first descendant of the table tag (see TINY-1167)
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

      Helpers.updateStyleField(editor, evt);
      data = evt.control.rootControl.toJSON();

      editor.undoManager.transact(function () {
        Tools.each(rows, function (rowElm) {
          setAttrib(rowElm, 'scope', data.scope);
          setAttrib(rowElm, 'style', data.style);
          setAttrib(rowElm, 'class', data['class']);
          setStyle(rowElm, 'height', Util.addSizeSuffix(data.height));

          if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
            switchRowType(editor.dom, rowElm, data.type);
          }

          // Apply/remove alignment
          if (rows.length === 1) {
            Styles.unApplyAlign(editor, rowElm);
          }

          if (data.align) {
            Styles.applyAlign(editor, rowElm, data.align);
          }
        });

        editor.focus();
      });
    }

    var open = function (editor) {
      var dom = editor.dom, tableElm, cellElm, rowElm, classListCtrl, data, rows = [], generalRowForm;

      tableElm = editor.dom.getParent(editor.selection.getStart(), 'table');
      cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');

      Tools.each(tableElm.rows, function (row) {
        Tools.each(row.cells, function (cell) {
          if (dom.getAttrib(cell, 'data-mce-selected') || cell == cellElm) {
            rows.push(row);
            return false;
          }
        });
      });

      rowElm = rows[0];
      if (!rowElm) {
        // If this element is null, return now to avoid crashing.
        return;
      }

      if (rows.length > 1) {
        data = {
          height: '',
          scope: '',
          'class': '',
          align: '',
          type: rowElm.parentNode.nodeName.toLowerCase()
        };
      } else {
        data = extractDataFromElement(editor, rowElm);
      }

      if (editor.settings.table_row_class_list) {
        classListCtrl = {
          name: 'class',
          type: 'listbox',
          label: 'Class',
          values: Helpers.buildListItems(
            editor.settings.table_row_class_list,
            function (item) {
              if (item.value) {
                item.textStyle = function () {
                  return editor.formatter.getCssText({ block: 'tr', classes: [item.value] });
                };
              }
            }
          )
        };
      }

      generalRowForm = {
        type: 'form',
        columns: 2,
        padding: 0,
        defaults: {
          type: 'textbox'
        },
        items: [
          {
            type: 'listbox',
            name: 'type',
            label: 'Row type',
            text: 'Header',
            maxWidth: null,
            values: [
              { text: 'Header', value: 'thead' },
              { text: 'Body', value: 'tbody' },
              { text: 'Footer', value: 'tfoot' }
            ]
          },
          {
            type: 'listbox',
            name: 'align',
            label: 'Alignment',
            text: 'None',
            maxWidth: null,
            values: [
              { text: 'None', value: '' },
              { text: 'Left', value: 'left' },
              { text: 'Center', value: 'center' },
              { text: 'Right', value: 'right' }
            ]
          },
          { label: 'Height', name: 'height' },
          classListCtrl
        ]
      };

      if (editor.settings.table_row_advtab !== false) {
        editor.windowManager.open({
          title: "Row properties",
          data: data,
          bodyType: 'tabpanel',
          body: [
            {
              title: 'General',
              type: 'form',
              items: generalRowForm
            },
            Helpers.createStyleForm(dom)
          ],
          onsubmit: Fun.curry(onSubmitRowForm, editor, rows)
        });
      } else {
        editor.windowManager.open({
          title: "Row properties",
          data: data,
          body: generalRowForm,
          onsubmit: Fun.curry(onSubmitRowForm, editor, rows)
        });
      }
    };

    return {
      open: open
    };

  }
);

/**
 * CellDialog.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * @class tinymce.table.ui.CellDialog
 * @private
 */
define(
  'tinymce.plugins.table.ui.CellDialog',
  [
    'ephox.katamari.api.Fun',
    'tinymce.core.util.Tools',
    'tinymce.plugins.table.actions.Styles',
    'tinymce.plugins.table.alien.Util',
    'tinymce.plugins.table.ui.Helpers'
  ],
  function (Fun, Tools, Styles, Util, Helpers) {
    var updateStyles = function (elm, cssText) {
      elm.style.cssText += ';' + cssText;
    };

    var extractDataFromElement = function (editor, elm) {
      var dom = editor.dom;
      var data = {
        width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
        height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
        scope: dom.getAttrib(elm, 'scope'),
        'class': dom.getAttrib(elm, 'class')
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
        Tools.extend(data, Helpers.extractAdvancedStyles(dom, elm));
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

      Helpers.updateStyleField(editor, evt);
      data = evt.control.rootControl.toJSON();

      editor.undoManager.transact(function () {
        Tools.each(cells, function (cellElm) {
          setAttrib(cellElm, 'scope', data.scope);

          if (cells.length === 1) {
            setAttrib(cellElm, 'style', data.style);
          } else {
            updateStyles(cellElm, data.style);
          }

          setAttrib(cellElm, 'class', data['class']);
          setStyle(cellElm, 'width', Util.addSizeSuffix(data.width));
          setStyle(cellElm, 'height', Util.addSizeSuffix(data.height));

          // Switch cell type
          if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
            cellElm = dom.rename(cellElm, data.type);
          }

          // Remove alignment
          if (cells.length === 1) {
            Styles.unApplyAlign(editor, cellElm);
            Styles.unApplyVAlign(editor, cellElm);
          }

          // Apply alignment
          if (data.align) {
            Styles.applyAlign(editor, cellElm, data.align);
          }

          // Apply vertical alignment
          if (data.valign) {
            Styles.applyVAlign(editor, cellElm, data.valign);
          }
        });

        editor.focus();
      });
    };

    var open = function (editor) {
      var cellElm, data, classListCtrl, cells = [];

      // Get selected cells or the current cell
      cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
      cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
      if (!cells.length && cellElm) {
        cells.push(cellElm);
      }

      cellElm = cellElm || cells[0];

      if (!cellElm) {
        // If this element is null, return now to avoid crashing.
        return;
      }

      if (cells.length > 1) {
        data = {
          width: '',
          height: '',
          scope: '',
          'class': '',
          align: '',
          style: '',
          type: cellElm.nodeName.toLowerCase()
        };
      } else {
        data = extractDataFromElement(editor, cellElm);
      }

      if (editor.settings.table_cell_class_list) {
        classListCtrl = {
          name: 'class',
          type: 'listbox',
          label: 'Class',
          values: Helpers.buildListItems(
            editor.settings.table_cell_class_list,
            function (item) {
              if (item.value) {
                item.textStyle = function () {
                  return editor.formatter.getCssText({ block: 'td', classes: [item.value] });
                };
              }
            }
          )
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
              { label: 'Width', name: 'width', onchange: Fun.curry(Helpers.updateStyleField, editor) },
              { label: 'Height', name: 'height', onchange: Fun.curry(Helpers.updateStyleField, editor) },
              {
                label: 'Cell type',
                name: 'type',
                type: 'listbox',
                text: 'None',
                minWidth: 90,
                maxWidth: null,
                values: [
                  { text: 'Cell', value: 'td' },
                  { text: 'Header cell', value: 'th' }
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
                  { text: 'None', value: '' },
                  { text: 'Row', value: 'row' },
                  { text: 'Column', value: 'col' },
                  { text: 'Row group', value: 'rowgroup' },
                  { text: 'Column group', value: 'colgroup' }
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
                  { text: 'None', value: '' },
                  { text: 'Left', value: 'left' },
                  { text: 'Center', value: 'center' },
                  { text: 'Right', value: 'right' }
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
                  { text: 'None', value: '' },
                  { text: 'Top', value: 'top' },
                  { text: 'Middle', value: 'middle' },
                  { text: 'Bottom', value: 'bottom' }
                ]
              }
            ]
          },

          classListCtrl
        ]
      };

      if (editor.settings.table_cell_advtab !== false) {
        editor.windowManager.open({
          title: "Cell properties",
          bodyType: 'tabpanel',
          data: data,
          body: [
            {
              title: 'General',
              type: 'form',
              items: generalCellForm
            },
            Helpers.createStyleForm(editor)
          ],
          onsubmit: Fun.curry(onSubmitCellForm, editor, cells)
        });
      } else {
        editor.windowManager.open({
          title: "Cell properties",
          data: data,
          body: generalCellForm,
          onsubmit: Fun.curry(onSubmitCellForm, editor, cells)
        });
      }
    };

    return {
      open: open
    };

  }
);

/**
 * TableCommands.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.actions.TableCommands',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.CopyRows',
    'ephox.snooker.api.TableFill',
    'ephox.snooker.api.TableLookup',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.dom.Replication',
    'ephox.sugar.api.node.Element',
    'tinymce.core.util.Tools',
    'tinymce.plugins.table.alien.Util',
    'tinymce.plugins.table.queries.TableTargets',
    'tinymce.plugins.table.ui.TableDialog',
    'tinymce.plugins.table.ui.RowDialog',
    'tinymce.plugins.table.ui.CellDialog'
  ],

  function (Arr, Fun, Option, CopyRows, TableFill, TableLookup, Insert, Remove, Replication, Element, Tools, Util, TableTargets, TableDialog, RowDialog, CellDialog) {
    var each = Tools.each;

    var clipboardRows = Option.none();

    var getClipboardRows = function () {
      return clipboardRows.fold(function () {
        return;
      }, function (rows) {
        return Arr.map(rows, function (row) {
          return row.dom();
        });
      });
    };

    var setClipboardRows = function (rows) {
      var sugarRows = Arr.map(rows, Element.fromDom);
      clipboardRows = Option.from(sugarRows);
    };

    var registerCommands = function (editor, actions, cellSelection, selections) {
      var isRoot = Util.getIsRoot(editor);
      var eraseTable = function () {
        var cell = Element.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        var table = TableLookup.table(cell, isRoot);
        table.filter(Fun.not(isRoot)).each(function (table) {
          var cursor = Element.fromText('');
          Insert.after(table, cursor);
          Remove.remove(table);
          var rng = editor.dom.createRng();
          rng.setStart(cursor.dom(), 0);
          rng.setEnd(cursor.dom(), 0);
          editor.selection.setRng(rng);
        });
      };

      var getSelectionStartCell = function () {
        return Element.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
      };

      var getTableFromCell = function (cell) {
        return TableLookup.table(cell, isRoot);
      };

      var actOnSelection = function (execute) {
        var cell = getSelectionStartCell();
        var table = getTableFromCell(cell);
        table.each(function (table) {
          var targets = TableTargets.forMenu(selections, table, cell);
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
          var doc = Element.fromDom(editor.getDoc());
          var targets = TableTargets.forMenu(selections, table, cell);
          var generators = TableFill.cellOperations(Fun.noop, doc, Option.none());
          return CopyRows.copyRows(table, targets, generators);
        });
      };

      var pasteOnSelection = function (execute) {
        // If we have clipboard rows to paste
        clipboardRows.each(function (rows) {
          var clonedRows = Arr.map(rows, function (row) {
            return Replication.deep(row);
          });
          var cell = getSelectionStartCell();
          var table = getTableFromCell(cell);
          table.bind(function (table) {
            var doc = Element.fromDom(editor.getDoc());
            var generators = TableFill.paste(doc);
            var targets = TableTargets.pasteRows(selections, table, cell, clonedRows, generators);
            execute(table, targets).each(function (rng) {
              editor.selection.setRng(rng);
              editor.focus();
              cellSelection.clear(table);
            });
          });
        });
      };

      // Register action commands
      each({
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

      // Register dialog commands
      each({
        mceInsertTable: Fun.curry(TableDialog.open, editor),
        mceTableProps: Fun.curry(TableDialog.open, editor, true),
        mceTableRowProps: Fun.curry(RowDialog.open, editor),
        mceTableCellProps: Fun.curry(CellDialog.open, editor)
      }, function (func, name) {
        editor.addCommand(name, function (ui, val) {
          func(val);
        });
      });
    };

    return {
      registerCommands: registerCommands,
      getClipboardRows: getClipboardRows,
      setClipboardRows: setClipboardRows
    };
  }
);

define(
  'ephox.snooker.api.ResizeWire',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.view.Location',
    'ephox.sugar.api.view.Position'
  ],

  function (Fun, Option, Element, Location, Position) {
    // parent: the container where the resize bars are appended
    //         this gets mouse event handlers only if it is not a child of 'view' (eg, detached/inline mode)
    // view: the container who listens to mouse events from content tables (eg, detached/inline mode)
    //       or the document that is a common ancestor of both the content tables and the
    //       resize bars ('parent') and so will listen to events from both (eg, iframe mode)
    // origin: the offset for the point to display the bars in the appropriate position

    var only = function (element) {
      // If element is a 'document', use the document element ('HTML' tag) for appending.
      var parent = Option.from(element.dom().documentElement).map(Element.fromDom).getOr(element);
      return {
        parent: Fun.constant(parent),
        view: Fun.constant(element),
        origin: Fun.constant(Position(0, 0))
      };
    };

    var detached = function (editable, chrome) {
      var origin = Fun.curry(Location.absolute, chrome);
      return {
        parent: Fun.constant(chrome),
        view: Fun.constant(editable),
        origin: origin
      };
    };

    var body = function (editable, chrome) {
      return {
        parent: Fun.constant(chrome),
        view: Fun.constant(editable),
        origin: Fun.constant(Position(0, 0))
      };
    };

    return {
      only: only,
      detached: detached,
      body: body
    };
  }
);
define(
  'ephox.porkbun.Event',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Struct'
  ],
  function (Arr, Struct) {

    /** :: ([String]) -> Event */
    return function (fields) {
      var struct = Struct.immutable.apply(null, fields);

      var handlers = [];

      var bind = function (handler) {
        if (handler === undefined) {
          throw 'Event bind error: undefined handler';
        }
        handlers.push(handler);
      };

      var unbind = function(handler) {
        // This is quite a bit slower than handlers.splice() but we hate mutation.
        // Unbind isn't used very often so it should be ok.
        handlers = Arr.filter(handlers, function (h) {
          return h !== handler;
        });
      };

      var trigger = function (/* values */) {
        // scullion does Array prototype slice, we don't need to as well
        var event = struct.apply(null, arguments);
        Arr.each(handlers, function (handler) {
          handler(event);
        });
      };

      return {
        bind: bind,
        unbind: unbind,
        trigger: trigger
      };
    };
  }
);

define(
  'ephox.porkbun.Events',

  [
    'ephox.katamari.api.Obj'
  ],

  function (Obj) {

    /** :: {name : Event} -> Events */
    var create = function (typeDefs) {
      var registry = Obj.map(typeDefs, function (event) {
        return {
          bind: event.bind,
          unbind: event.unbind
        };
      });

      var trigger = Obj.map(typeDefs, function (event) {
        return event.trigger;
      });

      return {
        registry: registry,
        trigger: trigger
      };
    };
    return {
      create: create
    };
  }
);

define(
  'ephox.dragster.api.DragApis',

  [
    'ephox.katamari.api.Contracts'
  ],

  function (Contracts) {
    var mode = Contracts.exactly([
      'compare',
      'extract',
      'mutate',
      'sink'
    ]);

    var sink = Contracts.exactly([
      'element',
      'start',
      'stop',
      'destroy'
    ]);

    var api = Contracts.exactly([
      'forceDrop',
      'drop',
      'move',
      'delayDrop'
    ]);

    return {
      mode: mode,
      sink: sink,
      api: api
    };
  }
);
define(
  'ephox.dragster.style.Styles',

  [
    'ephox.katamari.api.Namespace'
  ],

  function (Namespace) {

    var styles = Namespace.css('ephox-dragster');

    return {
      resolve: styles.resolve
    };
  }
);

define(
  'ephox.dragster.detect.Blocker',

  [
    'ephox.dragster.style.Styles',
    'ephox.katamari.api.Merger',
    'ephox.sugar.api.properties.Class',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.dom.Remove'
  ],

  function (Styles, Merger, Class, Css, Element, Remove) {
    return function (options) {
      var settings = Merger.merge({
        'layerClass': Styles.resolve('blocker')
      }, options);

      var div = Element.fromTag('div');
      Css.setAll(div, {
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%'
      });

      Class.add(div, Styles.resolve('blocker'));
      Class.add(div, settings.layerClass);

      var element = function () {
        return div;
      };

      var destroy = function () {
        Remove.remove(div);
      };

      return {
        element: element,
        destroy: destroy
      };
    };
  }
);

define(
  'ephox.sugar.impl.FilteredEvent',

  [
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.node.Element'
  ],

  function (Fun, Element) {

    var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
      // switched from a struct to manual Fun.constant() because we are passing functions now, not just values
      return {
        'target':  Fun.constant(target),
        'x':       Fun.constant(x),
        'y':       Fun.constant(y),
        'stop':    stop,
        'prevent': prevent,
        'kill':    kill,
        'raw':     Fun.constant(raw)
      };
    };

    var handle = function (filter, handler) {
      return function (rawEvent) {
        if (!filter(rawEvent)) return;

        // IE9 minimum
        var target = Element.fromDom(rawEvent.target);

        var stop = function () {
          rawEvent.stopPropagation();
        };

        var prevent = function () {
          rawEvent.preventDefault();
        };

        var kill = Fun.compose(prevent, stop); // more of a sequence than a compose, but same effect

        // FIX: Don't just expose the raw event. Need to identify what needs standardisation.
        var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
        handler(evt);
      };
    };

    var binder = function (element, event, filter, handler, useCapture) {
      var wrapped = handle(filter, handler);
      // IE9 minimum
      element.dom().addEventListener(event, wrapped, useCapture);

      return {
        unbind: Fun.curry(unbind, element, event, wrapped, useCapture)
      };
    };

    var bind = function (element, event, filter, handler) {
      return binder(element, event, filter, handler, false);
    };

    var capture = function (element, event, filter, handler) {
      return binder(element, event, filter, handler, true);
    };

    var unbind = function (element, event, handler, useCapture) {
      // IE9 minimum
      element.dom().removeEventListener(event, handler, useCapture);
    };

    return {
      bind: bind,
      capture: capture
    };
  }
);
define(
  'ephox.sugar.api.events.DomEvent',

  [
    'ephox.katamari.api.Fun',
    'ephox.sugar.impl.FilteredEvent'
  ],

  function (Fun, FilteredEvent) {
    var filter = Fun.constant(true); // no filter on plain DomEvents

    var bind = function (element, event, handler) {
      return FilteredEvent.bind(element, event, filter, handler);
    };

    var capture = function (element, event, handler) {
      return FilteredEvent.capture(element, event, filter, handler);
    };

    return {
      bind: bind,
      capture: capture
    };
  }
);

define(
  'ephox.dragster.api.MouseDrag',

  [
    'ephox.dragster.api.DragApis',
    'ephox.dragster.detect.Blocker',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.view.Position',
    'ephox.sugar.api.events.DomEvent',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.Remove'
  ],

  function (DragApis, Blocker, Option, Position, DomEvent, Insert, Remove) {
    var compare = function (old, nu) {
      return Position(nu.left() - old.left(), nu.top() - old.top());
    };

    var extract = function (event) {
      return Option.some(Position(event.x(), event.y()));
    };

    var mutate = function (mutation, info) {
      mutation.mutate(info.left(), info.top());
    };

    var sink = function (dragApi, settings) {
      var blocker = Blocker(settings);

      // Included for safety. If the blocker has stayed on the screen, get rid of it on a click.
      var mdown = DomEvent.bind(blocker.element(), 'mousedown', dragApi.forceDrop);

      var mup = DomEvent.bind(blocker.element(), 'mouseup', dragApi.drop);
      var mmove = DomEvent.bind(blocker.element(), 'mousemove', dragApi.move);
      var mout = DomEvent.bind(blocker.element(), 'mouseout', dragApi.delayDrop);

      var destroy = function () {
        blocker.destroy();
        mup.unbind();
        mmove.unbind();
        mout.unbind();
        mdown.unbind();
      };

      var start = function (parent) {
        Insert.append(parent, blocker.element());
      };

      var stop = function () {
        Remove.remove(blocker.element());
      };

      return DragApis.sink({
        element: blocker.element,
        start: start,
        stop: stop,
        destroy: destroy
      });
    };

    return DragApis.mode({
      compare: compare,
      extract: extract,
      sink: sink,
      mutate: mutate
    });
  }
);
define(
  'ephox.dragster.detect.InDrag',

  [
    'ephox.katamari.api.Option',
    'ephox.porkbun.Event',
    'ephox.porkbun.Events'
  ],

  function (Option, Event, Events) {
    return function () {

      var previous = Option.none();

      var reset = function () {
        previous = Option.none();
      };

      // Return position delta between previous position and nu position, 
      // or None if this is the first. Set the previous position to nu.
      var update = function (mode, nu) {
        var result = previous.map(function (old) {
          return mode.compare(old, nu);
        });

        previous = Option.some(nu);
        return result;
      };

      var onEvent = function (event, mode) {
        var dataOption = mode.extract(event);

        // Dragster move events require a position delta. The moveevent is only triggered
        // on the second and subsequent dragster move events. The first is dropped.
        dataOption.each(function (data) {
          var offset = update(mode, data);
          offset.each(function (d) {
            events.trigger.move(d);
          });
        });
      };

      var events = Events.create({
        move: Event([ 'info' ])
      });

      return {
        onEvent: onEvent,
        reset: reset,
        events: events.registry
      };
    };

  }
);

define(
  'ephox.dragster.detect.NoDrag',

  [
    'ephox.katamari.api.Fun'
  ],

  function (Fun) {
    return function (anchor) {
      var onEvent = function (event, mode) { };

      return {
        onEvent: onEvent,
        reset: Fun.noop
      };
    };
  }
);

define(
  'ephox.dragster.detect.Movement',

  [
    'ephox.dragster.detect.InDrag',
    'ephox.dragster.detect.NoDrag'
  ],

  function (InDrag, NoDrag) {

    return function () {
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
    };
  }
);

defineGlobal("global!clearTimeout", clearTimeout);
defineGlobal("global!setTimeout", setTimeout);
define(
  'ephox.katamari.api.Throttler',

  [
    'global!clearTimeout',
    'global!setTimeout'
  ],

  function (clearTimeout, setTimeout) {
    // Run a function fn afer rate ms. If another invocation occurs
    // during the time it is waiting, update the arguments f will run
    // with (but keep the current schedule)
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

    // Run a function fn after rate ms. If another invocation occurs
    // during the time it is waiting, ignore it completely.
    var first = function (fn, rate) {
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

    // Run a function fn after rate ms. If another invocation occurs
    // during the time it is waiting, reschedule the function again
    // with the new arguments.
    var last = function (fn, rate) {
      var timer = null;
      var cancel = function () {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
      };
      var throttle = function () {
        var args = arguments;
        if (timer !== null) clearTimeout(timer);
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

    return {
      adaptable: adaptable,
      first: first,
      last: last
    };
  }
);
define(
  'ephox.dragster.core.Dragging',

  [
    'ephox.dragster.api.DragApis',
    'ephox.dragster.detect.Movement',
    'ephox.katamari.api.Throttler',
    'ephox.porkbun.Event',
    'ephox.porkbun.Events',
    'global!Array'
  ],

  function (DragApis, Movement, Throttler, Event, Events, Array) {
    var setup = function (mutation, mode, settings) {
      var active = false;

      var events = Events.create({
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

      var throttledDrop = Throttler.last(drop, 200);

      var go = function (parent) {
        sink.start(parent);
        movement.on();
        events.trigger.start();
      };

      var mouseup = function (event, ui) {
        drop();
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
        // acivate some events here?
      };

      var runIfActive = function (f) {
        return function () {
          var args = Array.prototype.slice.call(arguments, 0);
          if (active) {
            return f.apply(null, args);
          }
        };
      };

      var sink = mode.sink(DragApis.api({
        // ASSUMPTION: runIfActive is not needed for mousedown. This is pretty much a safety measure for
        // inconsistent situations so that we don't block input.
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

    return {
      setup: setup
    };
  }
);
define(
  'ephox.dragster.api.Dragger',

  [
    'ephox.dragster.api.MouseDrag',
    'ephox.dragster.core.Dragging',
    'global!Array'
  ],

  function (MouseDrag, Dragging, Array) {
    var transform = function (mutation, options) {
      var settings = options !== undefined ? options : {};
      var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
      return Dragging.setup(mutation, mode, options);
    };
      
    return {
      transform: transform
    };
  }
);

define(
  'ephox.snooker.resize.Mutation',

  [
    'ephox.porkbun.Event',
    'ephox.porkbun.Events'
  ],

  function (Event, Events) {
    return function () {
      var events = Events.create({
        'drag': Event(['xDelta', 'yDelta'])
      });

      var mutate = function (x, y) {
        events.trigger.drag(x, y);
      };

      return {
        mutate: mutate,
        events: events.registry
      };
    };
  }
);

define(
  'ephox.snooker.resize.BarMutation',

  [
    'ephox.katamari.api.Option',
    'ephox.porkbun.Event',
    'ephox.porkbun.Events',
    'ephox.snooker.resize.Mutation'
  ],

  function (Option, Event, Events, Mutation) {
    return function () {
      var events = Events.create({
        drag: Event(['xDelta', 'yDelta', 'target'])
      });

      var target = Option.none();

      var delegate = Mutation();

      delegate.events.drag.bind(function (event) {
        target.each(function (t) {
          // There is always going to be this padding / border collapse / margin problem with widths. I'll have to resolve that.
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
    };
  }
);

define(
  'ephox.sugar.api.search.SelectorExists',

  [
    'ephox.sugar.api.search.SelectorFind'
  ],

  function (SelectorFind) {
    var any = function (selector) {
      return SelectorFind.first(selector).isSome();
    };

    var ancestor = function (scope, selector, isRoot) {
      return SelectorFind.ancestor(scope, selector, isRoot).isSome();
    };

    var sibling = function (scope, selector) {
      return SelectorFind.sibling(scope, selector).isSome();
    };

    var child = function (scope, selector) {
      return SelectorFind.child(scope, selector).isSome();
    };

    var descendant = function (scope, selector) {
      return SelectorFind.descendant(scope, selector).isSome();
    };

    var closest = function (scope, selector, isRoot) {
      return SelectorFind.closest(scope, selector, isRoot).isSome();
    };

    return {
      any: any,
      ancestor: ancestor,
      sibling: sibling,
      child: child,
      descendant: descendant,
      closest: closest
    };
  }
);

define(
  'ephox.snooker.resize.BarManager',

  [
    'ephox.dragster.api.Dragger',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.porkbun.Event',
    'ephox.porkbun.Events',
    'ephox.snooker.resize.BarMutation',
    'ephox.snooker.resize.Bars',
    'ephox.snooker.style.Styles',
    'ephox.snooker.util.CellUtils',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.events.DomEvent',
    'ephox.sugar.api.node.Body',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Class',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.search.SelectorExists',
    'ephox.sugar.api.search.SelectorFind',
    'global!parseInt'
  ],

  function (
    Dragger, Fun, Option, Event, Events, BarMutation, Bars, Styles, CellUtils, Compare, DomEvent, Body, Node, Attr, Class, Css, SelectorExists, SelectorFind,
    parseInt
  ) {
    var resizeBarDragging = Styles.resolve('resizer-bar-dragging');

    return function (wire, direction, hdirection) {
      var mutation = BarMutation();
      var resizing = Dragger.transform(mutation, {});

      var hoverTable = Option.none();

      var getResizer = function (element, type) {
        return Option.from(Attr.get(element, type));
      };

      /* Reposition the bar as the user drags */
      mutation.events.drag.bind(function (event) {
        getResizer(event.target(), 'data-row').each(function (_dataRow) {
          var currentRow = CellUtils.getInt(event.target(), 'top');
          Css.set(event.target(), 'top', currentRow + event.yDelta() + 'px');
        });

        getResizer(event.target(), 'data-column').each(function (_dataCol) {
          var currentCol = CellUtils.getInt(event.target(), 'left');
          Css.set(event.target(), 'left', currentCol + event.xDelta() + 'px');
        });
      });

      var getDelta = function (target, direction) {
        var newX = CellUtils.getInt(target, direction);
        var oldX = parseInt(Attr.get(target, 'data-initial-' + direction), 10);
        return newX - oldX;
      };

      /* Resize the column once the user releases the mouse */
      resizing.events.stop.bind(function () {
        mutation.get().each(function (target) {
          hoverTable.each(function (table) {
            getResizer(target, 'data-row').each(function (row) {
              var delta = getDelta(target, 'top');
              Attr.remove(target, 'data-initial-top');
              events.trigger.adjustHeight(table, delta, parseInt(row, 10));
            });

            getResizer(target, 'data-column').each(function (column) {
              var delta = getDelta(target, 'left');
              Attr.remove(target, 'data-initial-left');
              events.trigger.adjustWidth(table, delta, parseInt(column, 10));
            });

            Bars.refresh(wire, table, hdirection, direction);
          });
        });

      });

      var handler = function (target, direction) {
        events.trigger.startAdjust();
        mutation.assign(target);
        Attr.set(target, 'data-initial-' + direction, parseInt(Css.get(target, direction), 10));
        Class.add(target, resizeBarDragging);
        Css.set(target, 'opacity', '0.2');
        resizing.go(wire.parent());
      };

      /* mousedown on resize bar: start dragging when the bar is clicked, storing the initial position. */
      var mousedown = DomEvent.bind(wire.parent(), 'mousedown', function (event) {
        if (Bars.isRowBar(event.target())) handler(event.target(), 'top');

        if (Bars.isColBar(event.target())) handler(event.target(), 'left');
      });

      var isRoot = function (e) { return Compare.eq(e, wire.view()); };

      /* mouseover on table: When the mouse moves within the CONTENT AREA (NOT THE TABLE), refresh the bars. */
      var mouseover = DomEvent.bind(wire.view(), 'mouseover', function (event) {
        if (Node.name(event.target()) === 'table' || SelectorExists.ancestor(event.target(), 'table', isRoot)) {
          hoverTable = Node.name(event.target()) === 'table' ? Option.some(event.target()) : SelectorFind.ancestor(event.target(), 'table', isRoot);
          hoverTable.each(function (ht) {
            Bars.refresh(wire, ht, hdirection, direction);
          });
        } else if (Body.inBody(event.target())) {
          /*
           * mouseout is not reliable within ContentEditable, so for all other mouseover events we clear bars.
           * This is fairly safe to do frequently; it's a single querySelectorAll() on the content and Arr.map on the result.
           * If we _really_ need to optimise it further, we can start caching the bar references in the wire somehow.
           */
          Bars.destroy(wire);
        }
      });

      var destroy = function () {
        mousedown.unbind();
        mouseover.unbind();
        resizing.destroy();
        Bars.destroy(wire);
      };

      var refresh = function (tbl) {
        Bars.refresh(wire, tbl, hdirection, direction);
      };

      var events = Events.create({
        adjustHeight: Event(['table', 'delta', 'row']),
        adjustWidth: Event(['table', 'delta', 'column']),
        startAdjust: Event([])
      });

      return {
        destroy: destroy,
        refresh: refresh,
        on: resizing.on,
        off: resizing.off,
        hideBars: Fun.curry(Bars.hide, wire),
        showBars: Fun.curry(Bars.show, wire),
        events: events.registry
      };
    };
  }
);
define(
  'ephox.snooker.api.TableResize',

  [
    'ephox.porkbun.Event',
    'ephox.porkbun.Events',
    'ephox.snooker.resize.Adjustments',
    'ephox.snooker.resize.BarManager',
    'ephox.snooker.resize.BarPositions'
  ],

  function (Event, Events, Adjustments, BarManager, BarPositions) {
    /*
     * Creates and sets up a bar-based column resize manager.
     * Wire is used to provide the parent, view, and origin
     */
    return function (wire, vdirection) {
      var hdirection = BarPositions.height;
      var manager = BarManager(wire, vdirection, hdirection);

      var events = Events.create({
        beforeResize: Event(['table']),
        afterResize: Event(['table']),
        startDrag: Event([])
      });

      manager.events.adjustHeight.bind(function (event) {
        events.trigger.beforeResize(event.table());
        var delta = hdirection.delta(event.delta(), event.table());
        Adjustments.adjustHeight(event.table(), delta, event.row(), hdirection);
        events.trigger.afterResize(event.table());
      });

      manager.events.startAdjust.bind(function (event) {
        events.trigger.startDrag();
      });

      manager.events.adjustWidth.bind(function (event) {
        events.trigger.beforeResize(event.table());
        var delta = vdirection.delta(event.delta(), event.table());
        Adjustments.adjustWidth(event.table(), delta, event.column(), vdirection);
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
    };
  }
);

/**
 * TableWire.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.actions.TableWire',

  [
    'ephox.snooker.api.ResizeWire',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.node.Body',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.properties.Css',
    'tinymce.plugins.table.alien.Util'
  ],

  function (ResizeWire, Insert, Remove, Body, Element, Css, Util) {
    var createContainer = function () {
      var container = Element.fromTag('div');

      Css.setAll(container, {
        position: 'static',
        height: '0',
        width: '0',
        padding: '0',
        margin: '0',
        border: '0'
      });

      Insert.append(Body.body(), container);

      return container;
    };

    var get = function (editor, container) {
      return editor.inline ? ResizeWire.body(Util.getBody(editor), createContainer()) : ResizeWire.only(Element.fromDom(editor.getDoc()));
    };

    var remove = function (editor, wire) {
      if (editor.inline) {
        Remove.remove(wire.parent());
      }
    };

    return {
      get: get,
      remove: remove
    };
  }
);

/**
 * ResizeHandler.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.actions.ResizeHandler',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.ResizeWire',
    'ephox.snooker.api.TableDirection',
    'ephox.snooker.api.TableResize',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.search.SelectorFilter',
    'tinymce.plugins.table.actions.TableWire',
    'tinymce.plugins.table.queries.Direction',
    'tinymce.core.util.Tools'
  ],

  function (Arr, Option, ResizeWire, TableDirection, TableResize, Element, Attr, SelectorFilter, TableWire, Direction, Tools) {

    return function (editor) {
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
        return wire.getOr(ResizeWire.only(Element.fromDom(editor.getBody())));
      };

      var destroy = function () {
        resize.each(function (sz) {
          sz.destroy();
        });

        wire.each(function (w) {
          TableWire.remove(editor, w);
        });
      };

      editor.on('init', function () {
        var direction = TableDirection(Direction.directionAt);
        var rawWire = TableWire.get(editor);
        wire = Option.some(rawWire);
        if (editor.settings.object_resizing && editor.settings.table_resize_bars !== false &&
          (editor.settings.object_resizing === true || editor.settings.object_resizing === 'table')) {
          var sz = TableResize(rawWire, direction);
          sz.on();
          sz.events.startDrag.bind(function (event) {
            selectionRng = Option.some(editor.selection.getRng());
          });
          sz.events.afterResize.bind(function (event) {
            var table = event.table();
            var dataStyleCells = SelectorFilter.descendants(table, 'td[data-mce-style],th[data-mce-style]');
            Arr.each(dataStyleCells, function (cell) {
              Attr.remove(cell, 'data-mce-style');
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

      // If we're updating the table width via the old mechanic, we need to update the constituent cells' widths/heights too.
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
            var percentW = parseFloat(percentageBasedSizeRegex.exec(startRawW)[1], 10);
            var targetPercentW = e.width * percentW / startW;
            editor.dom.setStyle(table, 'width', targetPercentW + '%');
          } else {
            var newCellSizes = [];
            Tools.each(table.rows, function (row) {
              Tools.each(row.cells, function (cell) {
                var width = editor.dom.getStyle(cell, 'width', true);
                newCellSizes.push({
                  cell: cell,
                  width: width
                });
              });
            });

            Tools.each(newCellSizes, function (newCellSize) {
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
  }
);

define(
  'ephox.snooker.api.CellLocation',

  [
  ],

  function () {
    /*
     * The CellLocation ADT is used to represent a cell when navigating. The 
     * last type constructor is used because special behaviour may be required
     * when navigating past the last cell (e.g. create a new row).
     */
    var none = function (current) {
      return folder(function (n, f, m, l) {
        return n(current);
      });
    };

    var first = function (current) {
      return folder(function (n, f, m, l) {
        return f(current);
      });
    };

    var middle = function (current, target) {
      return folder(function (n, f, m, l) {
        return m(current, target);
      });
    };

    var last = function (current) {
      return folder(function (n, f, m, l) {
        return l(current);
      });
    };

    var folder = function (fold) {
      return {
        fold: fold
      };
    };

    return {
      none: none,
      first: first,
      middle: middle,
      last: last
    };
  }
);

define(
  'ephox.snooker.api.CellNavigation',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.snooker.api.CellLocation',
    'ephox.snooker.api.TableLookup',
    'ephox.sugar.api.dom.Compare'
  ],

  function (Arr, Fun, CellLocation, TableLookup, Compare) {
    /*
     * Identify the index of the current cell within all the cells, and
     * a list of the cells within its table.
     */
    var detect = function (current, isRoot) {
      return TableLookup.table(current, isRoot).bind(function (table) {
        var all = TableLookup.cells(table);
        var index = Arr.findIndex(all, function (x) {
          return Compare.eq(current, x);
        });

        return index.map(function (ind) {
          return {
            index: Fun.constant(ind),
            all: Fun.constant(all)
          };
        });
      });
    };


    /*
     * Identify the CellLocation of the cell when navigating forward from current
     */
    var next = function (current, isRoot) {
      var detection = detect(current, isRoot);
      return detection.fold(function () {
        return CellLocation.none(current);
      }, function (info) {
        return info.index() + 1 < info.all().length ? CellLocation.middle(current, info.all()[info.index() + 1]) : CellLocation.last(current);
      });
    };

    /*
     * Identify the CellLocation of the cell when navigating back from current
     */
    var prev = function (current, isRoot) {
      var detection = detect(current, isRoot);
      return detection.fold(function () {
        return CellLocation.none();
      }, function (info) {
        return info.index() - 1 >= 0 ? CellLocation.middle(current, info.all()[info.index() - 1]) : CellLocation.first(current);
      });
    };

    return {
      next: next,
      prev: prev
    };
  }
);

define(
  'ephox.sugar.api.selection.Situ',

  [
    'ephox.katamari.api.Adt',
    'ephox.katamari.api.Fun'
  ],

  function (Adt, Fun) {
    var adt = Adt.generate([
      { 'before': [ 'element' ] },
      { 'on': [ 'element', 'offset' ] },
      { after: [ 'element' ] }
    ]);

    // Probably don't need this given that we now have "match"
    var cata = function (subject, onBefore, onOn, onAfter) {
      return subject.fold(onBefore, onOn, onAfter);
    };

    var getStart = function (situ) {
      return situ.fold(Fun.identity, Fun.identity, Fun.identity)
    };

    return {
      before: adt.before,
      on: adt.on,
      after: adt.after,
      cata: cata,
      getStart: getStart
    };
  }
);

define(
  'ephox.sugar.api.selection.Selection',

  [
    'ephox.katamari.api.Adt',
    'ephox.katamari.api.Struct',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.Situ'
  ],

  function (Adt, Struct, Element, Traverse, Situ) {
    // Consider adding a type for "element"
    var type = Adt.generate([
      { domRange: [ 'rng' ] },
      { relative: [ 'startSitu', 'finishSitu' ] },
      { exact: [ 'start', 'soffset', 'finish', 'foffset' ] }
    ]);

    var range = Struct.immutable(
      'start',
      'soffset',
      'finish',
      'foffset'
    );

    var exactFromRange = function (simRange) {
      return type.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
    };

    var getStart = function (selection) {
      return selection.match({
        domRange: function (rng) {
          return Element.fromDom(rng.startContainer);
        },
        relative: function (startSitu, finishSitu) {
          return Situ.getStart(startSitu);
        },
        exact: function (start, soffset, finish, foffset) {
          return start;
        }
      });
    };

    var getWin = function (selection) {
      var start = getStart(selection);

      return Traverse.defaultView(start);
    };

    return {
      domRange: type.domRange,
      relative: type.relative,
      exact: type.exact,

      exactFromRange: exactFromRange,
      range: range,

      getWin: getWin
    };
  }
);

define(
  'ephox.sugar.api.dom.DocumentPosition',

  [
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Compare, Element, Traverse) {
    var makeRange = function (start, soffset, finish, foffset) {
      var doc = Traverse.owner(start);

      // TODO: We need to think about a better place to put native range creation code. Does it even belong in sugar?
      // Could the `Compare` checks (node.compareDocumentPosition) handle these situations better?
      var rng = doc.dom().createRange();
      rng.setStart(start.dom(), soffset);
      rng.setEnd(finish.dom(), foffset);
      return rng;
    };

    // Return the deepest - or furthest down the document tree - Node that contains both boundary points
    // of the range (start:soffset, finish:foffset).
    var commonAncestorContainer = function (start, soffset, finish, foffset) {
      var r = makeRange(start, soffset, finish, foffset);
      return Element.fromDom(r.commonAncestorContainer);
    };

    var after = function (start, soffset, finish, foffset) {
      var r = makeRange(start, soffset, finish, foffset);

      var same = Compare.eq(start, finish) && soffset === foffset;
      return r.collapsed && !same;
    };

    return {
      after: after,
      commonAncestorContainer: commonAncestorContainer
    };
  }
);
define(
  'ephox.sugar.api.node.Fragment',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.node.Element',
    'global!document'
  ],

  function (Arr, Element, document) {
    var fromElements = function (elements, scope) {
      var doc = scope || document;
      var fragment = doc.createDocumentFragment();
      Arr.each(elements, function (element) {
        fragment.appendChild(element.dom());
      });
      return Element.fromDom(fragment);
    };

    return {
      fromElements: fromElements
    };
  }
);

define(
  'ephox.sugar.selection.core.NativeRange',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element'
  ],

  function (Fun, Option, Compare, Element) {
    var selectNodeContents = function (win, element) {
      var rng = win.document.createRange();
      selectNodeContentsUsing(rng, element);
      return rng;
    };

    var selectNodeContentsUsing = function (rng, element) {
      rng.selectNodeContents(element.dom());
    };

    var isWithin = function (outerRange, innerRange) {
      // Adapted from: http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
      return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 &&
        innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
    };

    var create = function (win) {
      return win.document.createRange();
    };

    // NOTE: Mutates the range.
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
      // Note: this document fragment approach may not work on IE9.
      deleteContents(rng);
      rng.insertNode(fragment.dom());
    };

    var isCollapsed = function (start, soffset, finish, foffset) {
      return Compare.eq(start, finish) && soffset === foffset;
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
      return Element.fromDom(fragment);
    };

    var toRect = function (rect) {
      return {
        left: Fun.constant(rect.left),
        top: Fun.constant(rect.top),
        right: Fun.constant(rect.right),
        bottom: Fun.constant(rect.bottom),
        width: Fun.constant(rect.width),
        height: Fun.constant(rect.height)
      };
    };
    
    var getFirstRect = function (rng) {
      var rects = rng.getClientRects();
      // ASSUMPTION: The first rectangle is the start of the selection
      var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0  ? Option.some(rect).map(toRect) : Option.none();
    };

    var getBounds = function (rng) {
      var rect = rng.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0  ? Option.some(rect).map(toRect) : Option.none();
    };

    var toString = function (rng) {
      return rng.toString();
    };

    return {
      create: create,
      replaceWith: replaceWith,
      selectNodeContents: selectNodeContents,
      selectNodeContentsUsing: selectNodeContentsUsing,
      isCollapsed: isCollapsed,
      relativeToNative: relativeToNative,
      exactToNative: exactToNative,
      deleteContents: deleteContents,
      cloneFragment: cloneFragment,
      getFirstRect: getFirstRect,
      getBounds: getBounds,
      isWithin: isWithin,
      toString: toString
    };
  }
);

define(
  'ephox.sugar.selection.core.SelectionDirection',

  [
    'ephox.katamari.api.Adt',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Thunk',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.selection.core.NativeRange'
  ],

  function (Adt, Fun, Option, Thunk, Element, NativeRange) {
    var adt = Adt.generate([
      { ltr: [ 'start', 'soffset', 'finish', 'foffset' ] },
      { rtl: [ 'start', 'soffset', 'finish', 'foffset' ] }
    ]);

    var fromRange = function (win, type, range) {
      return type(Element.fromDom(range.startContainer), range.startOffset, Element.fromDom(range.endContainer), range.endOffset);
    };

    var getRanges = function (win, selection) {
      return selection.match({
        domRange: function (rng) {
          return {
            ltr: Fun.constant(rng),
            rtl: Option.none
          };
        },
        relative: function (startSitu, finishSitu) {
          return {
            ltr: Thunk.cached(function () {
              return NativeRange.relativeToNative(win, startSitu, finishSitu);
            }),
            rtl: Thunk.cached(function () {
              return Option.some(
                NativeRange.relativeToNative(win, finishSitu, startSitu)
              );
            })
          };
        },
        exact: function (start, soffset, finish, foffset) {
          return {
            ltr: Thunk.cached(function () {
              return NativeRange.exactToNative(win, start, soffset, finish, foffset);
            }),
            rtl: Thunk.cached(function () {
              return Option.some(
                NativeRange.exactToNative(win, finish, foffset, start, soffset)
              );
            })
          };
        }
      });
    };

    var doDiagnose = function (win, ranges) {
      // If we cannot create a ranged selection from start > finish, it could be RTL
      var rng = ranges.ltr();
      if (rng.collapsed) {
        // Let's check if it's RTL ... if it is, then reversing the direction will not be collapsed
        var reversed = ranges.rtl().filter(function (rev) {
          return rev.collapsed === false;
        });
        
        return reversed.map(function (rev) {
          // We need to use "reversed" here, because the original only has one point (collapsed)
          return adt.rtl(
            Element.fromDom(rev.endContainer), rev.endOffset,
            Element.fromDom(rev.startContainer), rev.startOffset  
          );
        }).getOrThunk(function () {
          return fromRange(win, adt.ltr, rng);
        });
      } else {
        return fromRange(win, adt.ltr, rng);
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
          // NOTE: Reversing start and finish
          var rng = win.document.createRange();
          rng.setStart(finish.dom(), foffset);
          rng.setEnd(start.dom(), soffset);
          return rng;
        }
      });
    };

    return {
      ltr: adt.ltr,
      rtl: adt.rtl,
      diagnose: diagnose,
      asLtrRange: asLtrRange
    };
  }
);

define(
  'ephox.sugar.selection.alien.Geometry',

  [
    'global!Math'
  ],

  function (Math) {
    var searchForPoint = function (rectForOffset, x, y, maxX, length) {
      // easy cases
      if (length === 0) return 0;
      else if (x === maxX) return length - 1;

      var xDelta = maxX;

      // start at 1, zero is the fallback
      for (var i = 1; i < length; i++) {
        var rect = rectForOffset(i);
        var curDeltaX = Math.abs(x - rect.left);

        if (y > rect.bottom) {
          // range is too high, above drop point, do nothing
        } else if (y < rect.top || curDeltaX > xDelta) {
          // if the search winds up on the line below the drop point,
          // or we pass the best X offset,
          // wind back to the previous (best) delta
          return i - 1;
        } else {
          // update current search delta
          xDelta = curDeltaX;
        }
      }
      return 0; // always return something, even if it's not the exact offset it'll be better than nothing
    };

    var inRect = function (rect, x, y) {
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    return {
      inRect: inRect,
      searchForPoint: searchForPoint
    };

  }
);

define(
  'ephox.sugar.selection.query.TextPoint',

  [
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'ephox.sugar.api.node.Text',
    'ephox.sugar.selection.alien.Geometry',
    'global!Math'
  ],

  function (Option, Options, Text, Geometry, Math) {
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

      var length = Text.get(textnode).length;
      var offset = Geometry.searchForPoint(rectForOffset, x, y, rect.right, length);
      return rangeForOffset(offset);
    };

    var locate = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      r.selectNode(node.dom());
      var rects = r.getClientRects();
      var foundRect = Options.findMap(rects, function (rect) {
        return Geometry.inRect(rect, x, y) ? Option.some(rect) : Option.none();
      });

      return foundRect.map(function (rect) {
        return locateOffset(doc, node, x, y, rect);
      });
    };

    return {
      locate: locate
    };
  }
);

define(
  'ephox.sugar.selection.query.ContainerPoint',

  [
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.selection.alien.Geometry',
    'ephox.sugar.selection.query.TextPoint',
    'global!Math'
  ],

  function (Option, Options, Node, Traverse, Geometry, TextPoint, Math) {
    /**
     * Future idea:
     *
     * This code requires the drop point to be contained within the nodes array somewhere. If it isn't,
     * we fall back to the extreme start or end of the node array contents.
     * This isn't really what the user intended.
     *
     * In theory, we could just find the range point closest to the boxes representing the node
     * (repartee does something similar).
     */

    var searchInChildren = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      var nodes = Traverse.children(node);
      return Options.findMap(nodes, function (n) {
        // slight mutation because we assume creating ranges is expensive
        r.selectNode(n.dom());
        return Geometry.inRect(r.getBoundingClientRect(), x, y) ?
                locateNode(doc, n, x, y) :
                Option.none();
      });
    };

    var locateNode = function (doc, node, x, y) {
      var locator = Node.isText(node) ? TextPoint.locate : searchInChildren;
      return locator(doc, node, x, y);
    };

    var locate = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      r.selectNode(node.dom());
      var rect = r.getBoundingClientRect();
      // Clamp x,y at the bounds of the node so that the locate function has SOME chance
      var boundedX = Math.max(rect.left, Math.min(rect.right, x));
      var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));

      return locateNode(doc, node, boundedX, boundedY);
    };

    return {
      locate: locate
    };
  }
);

define(
  'ephox.sugar.selection.query.EdgePoint',

  [
    'ephox.katamari.api.Option',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.CursorPosition'
  ],

  function (Option, Traverse, CursorPosition) {
    /* 
     * When a node has children, we return either the first or the last cursor
     * position, whichever is closer horizontally
     * 
     * When a node has no children, we return the start of end of the element,
     * depending on which is closer horizontally
     * */

    // TODO: Make this RTL compatible
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

      var f = collapseDirection === COLLAPSE_TO_LEFT ? CursorPosition.first : CursorPosition.last;
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
      var f = Traverse.children(node).length === 0 ? locateInEmpty : locateInElement;
      return f(doc, node, x);
    };

    return {
      search: search
    };
  }
);

define(
  'ephox.sugar.selection.query.CaretRange',

  [
    'ephox.katamari.api.Option',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.Selection',
    'ephox.sugar.selection.query.ContainerPoint',
    'ephox.sugar.selection.query.EdgePoint',
    'global!document',
    'global!Math'
  ],

  function (Option, Element, Traverse, Selection, ContainerPoint, EdgePoint, document, Math) {
    var caretPositionFromPoint = function (doc, x, y) {
      return Option.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
        // It turns out that Firefox can return null for pos.offsetNode
        if (pos.offsetNode === null) return Option.none();
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
      // Clamp x,y at the bounds of the node so that the locate function has SOME chance
      var boundedX = Math.max(rect.left, Math.min(rect.right, x));
      var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));

      return ContainerPoint.locate(doc, node, boundedX, boundedY);
    };

    var searchFromPoint = function (doc, x, y) {
      // elementFromPoint is defined to return null when there is no element at the point
      // This often happens when using IE10 event.y instead of event.clientY
      return Element.fromPoint(doc, x, y).bind(function (elem) {
        // used when the x,y position points to an image, or outside the bounds
        var fallback = function () {
          return EdgePoint.search(doc, elem, x);
        };

        return Traverse.children(elem).length === 0 ? fallback() :
                // if we have children, search for the right text node and then get the offset out of it
                searchTextNodes(doc, elem, x, y).orThunk(fallback);
      });
    };

    var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint :  // defined standard
                          document.caretRangeFromPoint ? caretRangeFromPoint :        // webkit implementation
                          searchFromPoint;                                            // fallback


    var fromPoint = function (win, x, y) {
      var doc = Element.fromDom(win.document);
      return availableSearch(doc, x, y).map(function (rng) {
        return Selection.range(
          Element.fromDom(rng.startContainer),
          rng.startOffset,
          Element.fromDom(rng.endContainer),
          rng.endOffset
        );
      });
    };

    return {
      fromPoint: fromPoint
    };
  }
);

define(
  'ephox.sugar.selection.query.Within',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.Selectors',
    'ephox.sugar.selection.core.NativeRange',
    'ephox.sugar.selection.core.SelectionDirection'
  ],

  function (Arr, Element, Node, SelectorFilter, Selectors, NativeRange, SelectionDirection) {
    var withinContainer = function (win, ancestor, outerRange, selector) {
      var innerRange = NativeRange.create(win);
      var self = Selectors.is(ancestor, selector) ? [ ancestor ] : [];
      var elements = self.concat(SelectorFilter.descendants(ancestor, selector));
      return Arr.filter(elements, function (elem) {
        // Mutate the selection to save creating new ranges each time
        NativeRange.selectNodeContentsUsing(innerRange, elem);
        return NativeRange.isWithin(outerRange, innerRange);
      });
    };

    var find = function (win, selection, selector) {
      // Reverse the selection if it is RTL when doing the comparison
      var outerRange = SelectionDirection.asLtrRange(win, selection);
      var ancestor = Element.fromDom(outerRange.commonAncestorContainer);
      // Note, this might need to change when we have to start looking for non elements.
      return Node.isElement(ancestor) ? 
        withinContainer(win, ancestor, outerRange, selector) : [];
    };

    return {
      find: find
    };
  }
);
define(
  'ephox.sugar.selection.quirks.Prefilter',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.selection.Selection',
    'ephox.sugar.api.selection.Situ'
  ],

  function (Arr, Element, Node, Selection, Situ) {
    var beforeSpecial = function (element, offset) {
      // From memory, we don't want to use <br> directly on Firefox because it locks the keyboard input.
      // It turns out that <img> directly on IE locks the keyboard as well.
      // If the offset is 0, use before. If the offset is 1, use after.
      // TBIO-3889: Firefox Situ.on <input> results in a child of the <input>; Situ.before <input> results in platform inconsistencies
      var name = Node.name(element);
      if ('input' === name) return Situ.after(element);
      else if (!Arr.contains([ 'br', 'img' ], name)) return Situ.on(element, offset);
      else return offset === 0 ? Situ.before(element) : Situ.after(element);
    };

    var preprocessRelative = function (startSitu, finishSitu) {
      var start = startSitu.fold(Situ.before, beforeSpecial, Situ.after);
      var finish = finishSitu.fold(Situ.before, beforeSpecial, Situ.after);
      return Selection.relative(start, finish);
    };

    var preprocessExact = function (start, soffset, finish, foffset) {
      var startSitu = beforeSpecial(start, soffset);
      var finishSitu = beforeSpecial(finish, foffset);
      return Selection.relative(startSitu, finishSitu);
    };

    var preprocess = function (selection) {
      return selection.match({
        domRange: function (rng) {
          var start = Element.fromDom(rng.startContainer);
          var finish = Element.fromDom(rng.endContainer);
          return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
        },
        relative: preprocessRelative,
        exact: preprocessExact
      });
    };

    return {
      beforeSpecial: beforeSpecial,
      preprocess: preprocess,
      preprocessRelative: preprocessRelative,
      preprocessExact: preprocessExact
    };
  }
);

define(
  'ephox.sugar.api.selection.WindowSelection',

  [
    'ephox.katamari.api.Option',
    'ephox.sugar.api.dom.DocumentPosition',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Fragment',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.Selection',
    'ephox.sugar.selection.core.NativeRange',
    'ephox.sugar.selection.core.SelectionDirection',
    'ephox.sugar.selection.query.CaretRange',
    'ephox.sugar.selection.query.Within',
    'ephox.sugar.selection.quirks.Prefilter'
  ],

  function (Option, DocumentPosition, Element, Fragment, Traverse, Selection, NativeRange, SelectionDirection, CaretRange, Within, Prefilter) {
    var doSetNativeRange = function (win, rng) {
      Option.from(win.getSelection()).each(function(selection) {
        selection.removeAllRanges();
        selection.addRange(rng);
      });      
    };

    var doSetRange = function (win, start, soffset, finish, foffset) {
      var rng = NativeRange.exactToNative(win, start, soffset, finish, foffset);
      doSetNativeRange(win, rng);
    };

    var findWithin = function (win, selection, selector) {
      return Within.find(win, selection, selector);
    };

    var setRangeFromRelative = function (win, relative) {
      return SelectionDirection.diagnose(win, relative).match({
        ltr: function (start, soffset, finish, foffset) {
          doSetRange(win, start, soffset, finish, foffset);
        },
        rtl: function (start, soffset, finish, foffset) {
          var selection = win.getSelection();
          // If this selection is backwards, then we need to use extend.
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
      var relative = Prefilter.preprocessExact(start, soffset, finish, foffset);

      setRangeFromRelative(win, relative);
    };

    var setRelative = function (win, startSitu, finishSitu) {
      var relative = Prefilter.preprocessRelative(startSitu, finishSitu);

      setRangeFromRelative(win, relative);
    };

    var toNative = function (selection) {
      var win = Selection.getWin(selection).dom();
      var getDomRange = function (start, soffset, finish, foffset) {
        return NativeRange.exactToNative(win, start, soffset, finish, foffset);
      };
      var filtered = Prefilter.preprocess(selection);
      return SelectionDirection.diagnose(win, filtered).match({
        ltr: getDomRange,
        rtl: getDomRange
      });
    };

    // NOTE: We are still reading the range because it gives subtly different behaviour
    // than using the anchorNode and focusNode. I'm not sure if this behaviour is any
    // better or worse; it's just different.
    var readRange = function (selection) {
      if (selection.rangeCount > 0) {
        var firstRng = selection.getRangeAt(0);
        var lastRng = selection.getRangeAt(selection.rangeCount - 1);

        return Option.some(Selection.range(
          Element.fromDom(firstRng.startContainer), 
          firstRng.startOffset,
          Element.fromDom(lastRng.endContainer),
          lastRng.endOffset
        ));
      } else {
        return Option.none();
      }
    };

    var doGetExact = function (selection) {
      var anchorNode = Element.fromDom(selection.anchorNode);
      var focusNode = Element.fromDom(selection.focusNode);
      return DocumentPosition.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? Option.some(
        Selection.range(
          Element.fromDom(selection.anchorNode),
          selection.anchorOffset,
          Element.fromDom(selection.focusNode),
          selection.focusOffset
        )
      ) : readRange(selection);
    };

    var setToElement = function (win, element) {
      var rng = NativeRange.selectNodeContents(win, element);
      doSetNativeRange(win, rng);
    };

    var forElement = function (win, element) {
      var rng = NativeRange.selectNodeContents(win, element);
      return Selection.range(
        Element.fromDom(rng.startContainer), rng.startOffset,
        Element.fromDom(rng.endContainer), rng.endOffset
      );
    };

    var getExact = function (win) {
      // We want to retrieve the selection as it is.
      var selection = win.getSelection();
      return selection.rangeCount > 0 ? doGetExact(selection) : Option.none();
    };

    // TODO: Test this.
    var get = function (win) {
      return getExact(win).map(function (range) {
        return Selection.exact(range.start(), range.soffset(), range.finish(), range.foffset());
      });
    };

    var getFirstRect = function (win, selection) {
      var rng = SelectionDirection.asLtrRange(win, selection);
      return NativeRange.getFirstRect(rng);
    };

    var getBounds = function (win, selection) {
      var rng = SelectionDirection.asLtrRange(win, selection);
      return NativeRange.getBounds(rng);
    };

    var getAtPoint = function (win, x, y) {
      return CaretRange.fromPoint(win, x, y);
    };

    var getAsString = function (win, selection) {
      var rng = SelectionDirection.asLtrRange(win, selection);
      return NativeRange.toString(rng);
    };

    var clear = function (win) {
      var selection = win.getSelection();
      selection.removeAllRanges();
    };

    var clone = function (win, selection) {
      var rng = SelectionDirection.asLtrRange(win, selection);
      return NativeRange.cloneFragment(rng);
    };

    var replace = function (win, selection, elements) {
      var rng = SelectionDirection.asLtrRange(win, selection);
      var fragment = Fragment.fromElements(elements, win.document);
      NativeRange.replaceWith(rng, fragment);
    };

    var deleteAt = function (win, selection) {
      var rng = SelectionDirection.asLtrRange(win, selection);
      NativeRange.deleteContents(rng);
    };

    return {
      setExact: setExact,
      getExact: getExact,
      get: get,
      setRelative: setRelative,
      toNative: toNative,
      setToElement: setToElement,
      clear: clear,

      clone: clone,
      replace: replace,
      deleteAt: deleteAt,

      forElement: forElement,

      getFirstRect: getFirstRect,
      getBounds: getBounds,
      getAtPoint: getAtPoint,

      findWithin: findWithin,
      getAsString: getAsString
    };
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.VK',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.VK');
  }
);

/**
 * TabContext.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.queries.TabContext',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.CellNavigation',
    'ephox.snooker.api.TableLookup',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.selection.CursorPosition',
    'ephox.sugar.api.selection.Selection',
    'ephox.sugar.api.selection.WindowSelection',
    'tinymce.core.util.VK',
    'tinymce.plugins.table.alien.Util',
    'tinymce.plugins.table.queries.TableTargets'
  ],

  function (Arr, Option, CellNavigation, TableLookup, Compare, Element, Node, SelectorFilter, SelectorFind, CursorPosition, Selection, WindowSelection, VK, Util, TableTargets) {
    var forward = function (editor, isRoot, cell, lazyWire) {
      return go(editor, isRoot, CellNavigation.next(cell), lazyWire);
    };

    var backward = function (editor, isRoot, cell, lazyWire) {
      return go(editor, isRoot, CellNavigation.prev(cell), lazyWire);
    };

    var getCellFirstCursorPosition = function (editor, cell) {
      var selection = Selection.exact(cell, 0, cell, 0);
      return WindowSelection.toNative(selection);
    };

    var getNewRowCursorPosition = function (editor, table) {
      var rows = SelectorFilter.descendants(table, 'tr');
      return Arr.last(rows).bind(function (last) {
        return SelectorFind.descendant(last, 'td,th').map(function (first) {
          return getCellFirstCursorPosition(editor, first);
        });
      });
    };

    var go = function (editor, isRoot, cell, actions, lazyWire) {
      return cell.fold(Option.none, Option.none, function (current, next) {
        return CursorPosition.first(next).map(function (cell) {
          return getCellFirstCursorPosition(editor, cell);
        });
      }, function (current) {
        return TableLookup.table(current, isRoot).bind(function (table) {
          var targets = TableTargets.noMenu(current);
          editor.undoManager.transact(function () {
            actions.insertRowsAfter(table, targets);
          });
          return getNewRowCursorPosition(editor, table);
        });
      });
    };

    var rootElements = ['table', 'li', 'dl'];

    var handle = function (event, editor, actions, lazyWire) {
      if (event.keyCode === VK.TAB) {
        var body = Util.getBody(editor);
        var isRoot = function (element) {
          var name = Node.name(element);
          return Compare.eq(element, body) || Arr.contains(rootElements, name);
        };

        var rng = editor.selection.getRng();
        if (rng.collapsed) {
          var start = Element.fromDom(rng.startContainer);
          TableLookup.cell(start, isRoot).each(function (cell) {
            event.preventDefault();
            var navigation = event.shiftKey ? backward : forward;
            var rng = navigation(editor, isRoot, cell, actions, lazyWire);
            rng.each(function (range) {
              editor.selection.setRng(range);
            });
          });
        }
      }
    };

    return {
      handle: handle
    };
  }
);

define(
  'ephox.darwin.api.Responses',

  [
    'ephox.katamari.api.Struct'
  ],

  function (Struct) {
    var response = Struct.immutable('selection', 'kill');

    return {
      response: response
    };
  }
);
define(
  'ephox.darwin.api.SelectionKeys',

  [

  ],

  function () {
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

    return {
      ltr: {
        // We need to move KEYS out of keytar and into something much more low-level.
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
  }
);
define(
  'ephox.darwin.selection.Util',

  [
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.selection.Situ',
    'ephox.sugar.selection.core.SelectionDirection'
  ],

  function (Fun, Element, Situ, SelectionDirection) {

    var convertToRange = function (win, selection) {
      // TODO: Use API packages of sugar
      var rng = SelectionDirection.asLtrRange(win, selection);
      return {
        start: Fun.constant(Element.fromDom(rng.startContainer)),
        soffset: Fun.constant(rng.startOffset),
        finish: Fun.constant(Element.fromDom(rng.endContainer)),
        foffset: Fun.constant(rng.endOffset)
      };
    };

    var makeSitus = function (start, soffset, finish, foffset) {
      return {
        start: Fun.constant(Situ.on(start, soffset)),
        finish: Fun.constant(Situ.on(finish, foffset))
      };
    };

    return {
      convertToRange: convertToRange,
      makeSitus: makeSitus
    };
  }
);

define(
  'ephox.darwin.api.WindowBridge',

  [
    'ephox.darwin.selection.Util',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Obj',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.selection.Selection',
    'ephox.sugar.api.selection.Situ',
    'ephox.sugar.api.selection.WindowSelection'
  ],

  function (Util, Fun, Obj, Option, Element, Selection, Situ, WindowSelection) {
    return function (win) {
      var elementFromPoint = function (x, y) {
        return Option.from(win.document.elementFromPoint(x, y)).map(Element.fromDom);
      };

      var getRect = function (element) {
        return element.dom().getBoundingClientRect();
      };

      var getRangedRect = function (start, soffset, finish, foffset) {
        var sel = Selection.exact(start, soffset, finish, foffset);
        return WindowSelection.getFirstRect(win, sel).map(function (structRect) {
          return Obj.map(structRect, Fun.apply);
        });
      };

      var getSelection = function () {
        return WindowSelection.get(win).map(function (exactAdt) {
          return Util.convertToRange(win, exactAdt);
        });
      };

      var fromSitus = function (situs) {
        var relative = Selection.relative(situs.start(), situs.finish());
        return Util.convertToRange(win, relative);
      };

      var situsFromPoint = function (x, y) {
        return WindowSelection.getAtPoint(win, x, y).map(function (exact) {
          return {
            start: Fun.constant(Situ.on(exact.start(), exact.soffset())),
            finish: Fun.constant(Situ.on(exact.finish(), exact.foffset()))
          };
        });
      };

      var clearSelection = function () {
        WindowSelection.clear(win);
      };

      var selectContents = function (element) {
        WindowSelection.setToElement(win, element);
      };

      var setSelection = function (sel) {
        WindowSelection.setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
      };

      var setRelativeSelection = function (start, finish) {
        WindowSelection.setRelative(win, start, finish);
      };

      var getInnerHeight = function () {
        return win.innerHeight;
      };

      var getScrollY = function () {
        return win.scrollY;
      };

      var scrollBy = function (x, y) {
        win.scrollBy(x, y);
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
    };
  }
);
define(
  'ephox.darwin.keyboard.KeySelection',

  [
    'ephox.darwin.api.Responses',
    'ephox.darwin.selection.CellSelection',
    'ephox.darwin.selection.Util',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.selection.Awareness',
    'ephox.sugar.api.selection.Selection',
    'ephox.sugar.api.selection.Situ'
  ],

  function (Responses, CellSelection, Util, Fun, Option, Compare, SelectorFind, Awareness, Selection, Situ) {
    // Based on a start and finish, select the appropriate box of cells
    var sync = function (container, isRoot, start, soffset, finish, foffset, selectRange) {
      if (!(Compare.eq(start, finish) && soffset === foffset)) {
        return SelectorFind.closest(start, 'td,th', isRoot).bind(function (s) {
          return SelectorFind.closest(finish, 'td,th', isRoot).bind(function (f) {
            return detect(container, isRoot, s, f, selectRange);
          });
        });
      } else {
        return Option.none();
      }
    };

    // If the cells are different, and there is a rectangle to connect them, select the cells.
    var detect = function (container, isRoot, start, finish, selectRange) {
      if (! Compare.eq(start, finish)) {
        var boxes = CellSelection.identify(start, finish, isRoot).getOr([]);
        if (boxes.length > 0) {
          selectRange(container, boxes, start, finish);
          return Option.some(Responses.response(
            Option.some(Util.makeSitus(start, 0, start, Awareness.getEnd(start))),
            true
          ));
        }
      }

      return Option.none();
    };

    var update = function (rows, columns, container, selected, annotations) {
      var updateSelection = function (newSels) {
        annotations.clear(container);
        annotations.selectRange(container, newSels.boxes(), newSels.start(), newSels.finish());
        return newSels.boxes();
      };

      return CellSelection.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
    };

    return {
      sync: sync,
      detect: detect,
      update: update
    };
  }
);
define(
  'ephox.darwin.keyboard.Carets',

  [
    'ephox.katamari.api.Struct'
  ],

  function (Struct) {
    var nu = Struct.immutableBag([ 'left', 'top', 'right', 'bottom' ], []);

    var moveDown = function (caret, amount) {
      return nu({
        left: caret.left(),
        top: caret.top() + amount,
        right: caret.right(),
        bottom: caret.bottom() + amount
      });
    };

    var moveUp = function (caret, amount) {
      return nu({
        left: caret.left(),
        top: caret.top() - amount,
        right: caret.right(),
        bottom: caret.bottom() - amount
      });
    };

    var moveBottomTo = function (caret, bottom) {
      var height = caret.bottom() - caret.top();
      return nu({
        left: caret.left(),
        top: bottom - height,
        right: caret.right(),
        bottom: bottom
      });
    };

    var moveTopTo = function (caret, top) {
      var height = caret.bottom() - caret.top();
      return nu({
        left: caret.left(),
        top: top,
        right: caret.right(),
        bottom: top + height
      });
    };

    var translate = function (caret, xDelta, yDelta) {
      return nu({
        left: caret.left() + xDelta,
        top: caret.top() + yDelta,
        right: caret.right() + xDelta,
        bottom: caret.bottom() + yDelta
      });
    };

    var getTop = function (caret) {
      return caret.top();
    };

    var getBottom = function (caret) {
      return caret.bottom();
    };

    var toString = function (caret) {
      return '(' + caret.left() + ', ' + caret.top() + ') -> (' + caret.right() + ', ' + caret.bottom() + ')';
    };

    return {
      nu: nu,
      moveUp: moveUp,
      moveDown: moveDown,
      moveBottomTo: moveBottomTo,
      moveTopTo: moveTopTo,
      getTop: getTop,
      getBottom: getBottom,
      translate: translate,
      toString: toString
    };
  }
);
define(
  'ephox.darwin.keyboard.Rectangles',

  [
    'ephox.darwin.keyboard.Carets',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.selection.Awareness'
  ],

  function (Carets, Option, Node, Awareness) {
    var getPartialBox = function (bridge, element, offset) {
      if (offset >= 0 && offset < Awareness.getEnd(element)) return bridge.getRangedRect(element, offset, element, offset+1);
      else if (offset > 0) return bridge.getRangedRect(element, offset - 1, element, offset);
      return Option.none();
    };

    var toCaret = function (rect) {
      return Carets.nu({
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
      // Note, we might need to consider this offset and descend.
      if (Node.isElement(element)) return getElemBox(bridge, element, offset).map(toCaret);
      else if (Node.isText(element)) return getPartialBox(bridge, element, offset).map(toCaret);
      else return Option.none();
    };

    var getEntireBox = function (bridge, element) {
      if (Node.isElement(element)) return getElemBox(bridge, element).map(toCaret);
      else if (Node.isText(element)) return bridge.getRangedRect(element, 0, element, Awareness.getEnd(element)).map(toCaret);
      else return Option.none();
    };

    return {
      getBoxAt: getBoxAt,
      getEntireBox: getEntireBox
    };
  }
);
define(
  'ephox.phoenix.gather.Walker',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Struct'
  ],

  function (Arr, Option, Struct) {
    var traverse = Struct.immutable('item', 'mode');

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

    /*
     * Rule breakdown:
     *
     * current: the traversal that we are applying.
     * next: the next traversal to apply if the current traversal succeeds (e.g. advance after sidestepping)
     * fallback: the traversal to fallback to when the current traversal does not find a node
     */
    var successors = [
      { current: backtrack, next: sidestep, fallback: Option.none() },
      { current: sidestep, next: advance, fallback: Option.some(backtrack) },
      { current: advance, next: advance, fallback: Option.some(sidestep) }
    ];

    var go = function (universe, item, mode, direction, _rules) {
      var rules = _rules !== undefined ? _rules : successors;
      // INVESTIGATE: Find a way which doesn't require an array search first to identify the current mode.
      var ruleOpt = Arr.find(rules, function (succ) {
        return succ.current === mode;
      });

      return ruleOpt.bind(function (rule) {
        // Attempt the current mode. If not, use the fallback and try again.
        return rule.current(universe, item, direction, rule.next).orThunk(function () {
          return rule.fallback.bind(function (fb) {
            return go(universe, item, fb, direction)
          });
        });
      });
    };

    return {
      backtrack: backtrack,
      sidestep: sidestep,
      advance: advance,
      go: go
    };
  }
);
define(
  'ephox.phoenix.gather.Walkers',

  [
    'ephox.katamari.api.Option'
  ],

  function (Option) {
    var left = function () {
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

    var right = function () {
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

    return {
      left: left,
      right: right
    };
  }
);
define(
  'ephox.phoenix.gather.Seeker',

  [
    'ephox.katamari.api.Option',
    'ephox.phoenix.gather.Walker',
    'ephox.phoenix.gather.Walkers'
  ],

  function (Option, Walker, Walkers) {
    var hone = function (universe, item, predicate, mode, direction, isRoot) {
      var next = Walker.go(universe, item, mode, direction);
      return next.bind(function (n) {
        if (isRoot(n.item())) return Option.none();
        else return predicate(n.item()) ? Option.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
      });
    };

    var left = function (universe, item, predicate, isRoot) {
      return hone(universe, item, predicate, Walker.sidestep, Walkers.left(), isRoot);
    };

    var right = function (universe, item, predicate, isRoot) {
      return hone(universe, item, predicate, Walker.sidestep, Walkers.right(), isRoot);
    };

    return {
      left: left,
      right: right
    };
  }
);
define(
  'ephox.phoenix.api.general.Gather',

  [
    'ephox.katamari.api.Fun',
    'ephox.phoenix.gather.Seeker',
    'ephox.phoenix.gather.Walker',
    'ephox.phoenix.gather.Walkers'
  ],

  /**
   * Documentation is in the actual implementations.
   */
  function (Fun, Seeker, Walker, Walkers) {
    var isLeaf = function (universe, element) {
      return universe.property().children(element).length === 0;
    };

    var before = function (universe, item, isRoot) {
      return seekLeft(universe, item, Fun.curry(isLeaf, universe), isRoot);
    };

    var after = function (universe, item, isRoot) {
      return seekRight(universe, item, Fun.curry(isLeaf, universe), isRoot);
    };

    var seekLeft = function (universe, item, predicate, isRoot) {
      return Seeker.left(universe, item, predicate, isRoot);
    };

    var seekRight = function (universe, item, predicate, isRoot) {
      return Seeker.right(universe, item, predicate, isRoot);
    };

    var walkers = function () {
      return {
        left: Walkers.left,
        right: Walkers.right
      };
    };

    var walk = function (universe, item, mode, direction, _rules) {
      return Walker.go(universe, item, mode, direction, _rules);
    };

    return {
      before: before,
      after: after,
      seekLeft: seekLeft,
      seekRight: seekRight,
      walkers: walkers,
      walk: walk,
      // These have to be direct references.
      backtrack: Walker.backtrack,
      sidestep: Walker.sidestep,
      advance: Walker.advance
    };
  }
);

define(
  'ephox.phoenix.api.dom.DomGather',

  [
    'ephox.boss.api.DomUniverse',
    'ephox.phoenix.api.general.Gather'
  ],

  /**
   * Documentation is in the actual implementations.
   */
  function (DomUniverse, Gather) {
    var universe = DomUniverse();

    var gather = function (element, prune, transform) {
      return Gather.gather(universe, element, prune, transform);
    };

    var before = function (element, isRoot) {
      return Gather.before(universe, element, isRoot);
    };

    var after = function (element, isRoot) {
      return Gather.after(universe, element, isRoot);
    };

    var seekLeft = function (element, predicate, isRoot) {
      return Gather.seekLeft(universe, element, predicate, isRoot);
    };

    var seekRight = function (element, predicate, isRoot) {
      return Gather.seekRight(universe, element, predicate, isRoot);
    };

    var walkers = function () {
      return Gather.walkers();
    };

    var walk = function (item, mode, direction, _rules) {
      return Gather.walk(universe, item, mode, direction, _rules);
    };

    return {
      gather: gather,
      before: before,
      after: after,
      seekLeft: seekLeft,
      seekRight: seekRight,
      walkers: walkers,
      walk: walk
      // Due to exact references being required, these can't go through the DOM layer.
      // Outside modules need to be able to creates sets of rules which use the exports directly,
      // because when we are applying the rules we use a simple equality check to work out which
      // rule is which. If we delegate here, the memory address of the API rule and the internal
      // rule will be different.
      // backtrack: backtrack,
      // sidestep: sidestep,
      // advance: advance
    };
  }
);

define(
  'ephox.darwin.keyboard.Retries',

  [
    'ephox.darwin.keyboard.Carets',
    'ephox.darwin.keyboard.Rectangles',
    'ephox.katamari.api.Adt',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.phoenix.api.dom.DomGather',
    'ephox.robin.api.dom.DomStructure',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.PredicateFind',
    'global!Math'
  ],

  function (Carets, Rectangles, Adt, Fun, Option, DomGather, DomStructure, Node, PredicateFind, Math) {
    var JUMP_SIZE = 5;
    var NUM_RETRIES = 100;

    var adt = Adt.generate([
      { 'none' : [] },
      { 'retry': [ 'caret' ] }
    ]);

    var isOutside = function (caret, box) {
      return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
    };

    // Find the block and determine whether or not that block is outside. If it is outside, move up/down and right.
    var inOutsideBlock = function (bridge, element, caret) {
      return PredicateFind.closest(element, DomStructure.isBlock).fold(Fun.constant(false), function (cell) {
        return Rectangles.getEntireBox(bridge, cell).exists(function (box) {
          return isOutside(caret, box);
        });
      });
    };

    /*
     * The approach is as follows.
     *
     * The browser APIs for caret ranges return elements that are the closest text elements to your (x, y) position, even if those
     * closest elements are miles away. This causes problems when you are trying to identify what is immediately above or below
     * a cell, because often the closest text is in a cell that is in a completely different column. Therefore, the approach needs
     * to keep moving down until the thing that we are hitting is likely to be a true positive.
     *
     * Steps:
     *
     * 1. If the y position of the next guess is not different from the original, keep going.
     * 2a. If the guess box doesn't actually include the position looked for, then the browser has returned a node that does not have
     *    a rectangle which truly intercepts the point. So, keep going. Note, we used to jump straight away here, but that means that
     *    we might skip over something that wasn't considered close enough but was a better guess than just making the y value skip.
     * 2b. If the guess box exactly aligns with the caret, then adjust by 1 and go again. This is to get a more accurate offset.
     * 3. if the guess box does include the caret, but the guess box's parent cell does not *really* contain the caret, try again shifting
     *    only the x value. If the guess box's parent cell does *really* contain the caret (i.e. it is horizontally-aligned), then stop
     *    because the guess is GOOD.
     */

    var adjustDown = function (bridge, element, guessBox, original, caret) {
      var lowerCaret = Carets.moveDown(caret, JUMP_SIZE);
      if (Math.abs(guessBox.bottom() - original.bottom()) < 1) return adt.retry(lowerCaret);
      else if (guessBox.top() > caret.bottom()) return adt.retry(lowerCaret);
      else if (guessBox.top() === caret.bottom()) return adt.retry(Carets.moveDown(caret, 1));
      else return inOutsideBlock(bridge, element, caret) ? adt.retry(Carets.translate(lowerCaret, JUMP_SIZE, 0)) : adt.none();
    };

    var adjustUp = function (bridge, element, guessBox, original, caret) {
      var higherCaret = Carets.moveUp(caret, JUMP_SIZE);
      if (Math.abs(guessBox.top() - original.top()) < 1) return adt.retry(higherCaret);
      else if (guessBox.bottom() < caret.top()) return adt.retry(higherCaret);
      else if (guessBox.bottom() === caret.top()) return adt.retry(Carets.moveUp(caret, 1));
      else return inOutsideBlock(bridge, element, caret) ? adt.retry(Carets.translate(higherCaret, JUMP_SIZE, 0)) : adt.none();
    };

    var upMovement = {
      point: Carets.getTop,
      adjuster: adjustUp,
      move: Carets.moveUp,
      gather: DomGather.before
    };

    var downMovement = {
      point: Carets.getBottom,
      adjuster: adjustDown,
      move: Carets.moveDown,
      gather: DomGather.after
    };

    var isAtTable = function (bridge, x, y) {
      return bridge.elementFromPoint(x, y).filter(function (elm) {
        return Node.name(elm) === 'table';
      }).isSome();
    };

    var adjustForTable = function (bridge, movement, original, caret, numRetries) {
      return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
    };

    var adjustTil = function (bridge, movement, original, caret, numRetries) {
      if (numRetries === 0) return Option.some(caret);
      if (isAtTable(bridge, caret.left(), movement.point(caret))) return adjustForTable(bridge, movement, original, caret, numRetries-1);

      return bridge.situsFromPoint(caret.left(), movement.point(caret)).bind(function (guess) {
        return guess.start().fold(Option.none, function (element, offset) {
          return Rectangles.getEntireBox(bridge, element, offset).bind(function (guessBox) {
            return movement.adjuster(bridge, element, guessBox, original, caret).fold(
              Option.none,
              function (newCaret) {
                return adjustTil(bridge, movement, original, newCaret, numRetries-1);
              }
            );
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
      // I'm not convinced that this is right. Let's re-examine it later.
      if (movement.point(adjusted) > bridge.getInnerHeight()) return Option.some(movement.point(adjusted) - bridge.getInnerHeight());
      else if (movement.point(adjusted) < 0) return Option.some(-movement.point(adjusted));
      else return Option.none();
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

    return {
      tryUp: Fun.curry(retry, upMovement),
      tryDown: Fun.curry(retry, downMovement),
      ieTryUp: ieTryUp,
      ieTryDown: ieTryDown,
      getJumpSize: Fun.constant(JUMP_SIZE)
    };
  }
);
define(
  'ephox.darwin.navigation.BeforeAfter',

  [
    'ephox.katamari.api.Adt',
    'ephox.robin.api.dom.DomParent',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.selection.Awareness'
  ],

  function (Adt, DomParent, Compare, SelectorFind, Awareness) {
    var adt = Adt.generate([
      { 'none' : [ 'message'] },
      { 'success': [ ] },
      { 'failedUp': [ 'cell' ] },
      { 'failedDown': [ 'cell' ] }
    ]);

    // Let's get some bounding rects, and see if they overlap (x-wise)
    var isOverlapping = function (bridge, before, after) {
      var beforeBounds = bridge.getRect(before);
      var afterBounds = bridge.getRect(after);
      return afterBounds.right > beforeBounds.left && afterBounds.left < beforeBounds.right;
    };

    var verify = function (bridge, before, beforeOffset, after, afterOffset, failure, isRoot) {
      // Identify the cells that the before and after are in.
      return SelectorFind.closest(after, 'td,th', isRoot).bind(function (afterCell) {
        return SelectorFind.closest(before, 'td,th', isRoot).map(function (beforeCell) {
          // If they are not in the same cell
          if (! Compare.eq(afterCell, beforeCell)) {
            return DomParent.sharedOne(isRow, [ afterCell, beforeCell ]).fold(function () {
              // No shared row, and they overlap x-wise -> success, otherwise: failed
              return isOverlapping(bridge, beforeCell, afterCell) ? adt.success() : failure(beforeCell);
            }, function (sharedRow) {
              // In the same row, so it failed.
              return failure(beforeCell);
            });
          } else {
            return Compare.eq(after, afterCell) && Awareness.getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt.none('in same cell');
          }
        });
      }).getOr(adt.none('default'));
    };

    var isRow = function (elem) {
      return SelectorFind.closest(elem, 'tr');
    };

    var cata = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
      return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
    };

    return {
      verify: verify,
      cata: cata,
      adt: adt
    };
  }
);
define(
  'ephox.phoenix.api.data.Spot',

  [
    'ephox.katamari.api.Struct'
  ],

  function (Struct) {
    var point = Struct.immutable('element', 'offset');
    var delta = Struct.immutable('element', 'deltaOffset');
    var range = Struct.immutable('element', 'start', 'finish');
    var points = Struct.immutable('begin', 'end');
    var text = Struct.immutable('element', 'text');

    return {
      point: point,
      delta: delta,
      range: range,
      points: points,
      text: text
    };
  }
);

define(
  'ephox.sugar.api.search.ElementAddress',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Struct',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.PredicateFind',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.search.Traverse'
  ],

  function (Arr, Fun, Option, Struct, Compare, PredicateFind, SelectorFilter, SelectorFind, Traverse) {
    var inAncestor = Struct.immutable('ancestor', 'descendants', 'element', 'index');
    var inParent = Struct.immutable('parent', 'children', 'element', 'index');

    var childOf = function (element, ancestor) {
      return PredicateFind.closest(element, function (elem) {
        return Traverse.parent(elem).exists(function (parent) {
          return Compare.eq(parent, ancestor);
        });
      });
    };

    var indexInParent = function (element) {
      return Traverse.parent(element).bind(function (parent) {
        var children = Traverse.children(parent);
        return indexOf(children, element).map(function (index) {
          return inParent(parent, children, element, index);
        });
      });
    };

    var indexOf = function (elements, element) {
      return Arr.findIndex(elements, Fun.curry(Compare.eq, element));
    };

    var selectorsInParent = function (element, selector) {
      return Traverse.parent(element).bind(function (parent) {
        var children = SelectorFilter.children(parent, selector);
        return indexOf(children, element).map(function (index) {
          return inParent(parent, children, element, index);
        });
      });
    };

    var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
      return SelectorFind.closest(element, ancestorSelector).bind(function (ancestor) {
        var descendants = SelectorFilter.descendants(ancestor, descendantSelector);
        return indexOf(descendants, element).map(function (index) {
          return inAncestor(ancestor, descendants, element, index);
        });
      });
    };

    return {
      childOf: childOf,
      indexOf: indexOf,
      indexInParent: indexInParent,
      selectorsInParent: selectorsInParent,
      descendantsInAncestor: descendantsInAncestor
    };
  }
);
define(
  'ephox.darwin.navigation.BrTags',

  [
    'ephox.darwin.navigation.BeforeAfter',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.phoenix.api.data.Spot',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.node.Text',
    'ephox.sugar.api.search.ElementAddress',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.Awareness',
    'ephox.sugar.api.selection.Situ'
  ],

  function (BeforeAfter, Fun, Option, Spot, Node, Text, ElementAddress, Traverse, Awareness, Situ) {
    var isBr = function (elem) {
      return Node.name(elem) === 'br';
    };

    var gatherer = function (cand, gather, isRoot) {
      return gather(cand, isRoot).bind(function (target) {
        return Node.isText(target) && Text.get(target).trim().length === 0 ? gatherer(target, gather, isRoot) : Option.some(target);
      });
    };

    var handleBr = function (isRoot, element, direction) {
      // 1. Has a neighbouring sibling ... position relative to neighbouring element
      // 2. Has no neighbouring sibling ... position relative to gathered element
      return direction.traverse(element).orThunk(function () {
        return gatherer(element, direction.gather, isRoot);
      }).map(direction.relative);
    };

    var findBr = function (element, offset) {
      return Traverse.child(element, offset).filter(isBr).orThunk(function () {
        // Can be either side of the br, and still be a br.
        return Traverse.child(element, offset-1).filter(isBr);
      });
    };

    var handleParent = function (isRoot, element, offset, direction) {
      // 1. Has no neighbouring sibling, position relative to gathered element
      // 2. Has a neighbouring sibling, position at the neighbouring sibling with respect to parent
      return findBr(element, offset).bind(function (br) {
        return direction.traverse(br).fold(function () {
          return gatherer(br, direction.gather, isRoot).map(direction.relative);
        }, function (adjacent) {
          return ElementAddress.indexInParent(adjacent).map(function (info) {
            return Situ.on(info.parent(), info.index());
          });
        });
      });
    };

    var tryBr = function (isRoot, element, offset, direction) {
      // Three different situations
      // 1. the br is the child, and it has a previous sibling. Use parent, index-1)
      // 2. the br is the child and it has no previous sibling, set to before the previous gather result
      // 3. the br is the element and it has a previous sibling, use parent index-1)
      // 4. the br is the element and it has no previous sibling, set to before the previous gather result.
      // 2. the element is the br itself,
      var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
      return target.map(function (tgt) {
        return {
          start: Fun.constant(tgt),
          finish: Fun.constant(tgt)
        };
      });
    };

    var process = function (analysis) {
      return BeforeAfter.cata(analysis,
        function (message) {
          return Option.none('BR ADT: none');
        },
        function () {
          return Option.none();
        },
        function (cell) {
          return Option.some(Spot.point(cell, 0));
        },
        function (cell) {
          return Option.some(Spot.point(cell, Awareness.getEnd(cell)));
        }
      );
    };

    return {
      tryBr: tryBr,
      process: process
    };
  }
);
define(
  'ephox.darwin.keyboard.TableKeys',

  [
    'ephox.darwin.keyboard.Carets',
    'ephox.darwin.keyboard.Rectangles',
    'ephox.darwin.keyboard.Retries',
    'ephox.darwin.navigation.BeforeAfter',
    'ephox.darwin.navigation.BrTags',
    'ephox.katamari.api.Option',
    'ephox.phoenix.api.data.Spot',
    'ephox.sand.api.PlatformDetection',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.selection.Awareness'
  ],

  function (Carets, Rectangles, Retries, BeforeAfter, BrTags, Option, Spot, PlatformDetection, Compare, Awareness) {
    var MAX_RETRIES = 20;

    var platform = PlatformDetection.detect();

    var findSpot = function (bridge, isRoot, direction) {
      return bridge.getSelection().bind(function (sel) {
        return BrTags.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
          return Option.some(Spot.point(sel.finish(), sel.foffset()));
        }, function (brNeighbour) {
          var range = bridge.fromSitus(brNeighbour);
          var analysis = BeforeAfter.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
          return BrTags.process(analysis);
        });
      });
    };

    var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
      if (numRetries === 0) return Option.none();
      // Firstly, move the (x, y) and see what element we end up on.
      return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
        var range = bridge.fromSitus(situs);
        // Now, check to see if the element is a new cell.
        var analysis = BeforeAfter.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
        return BeforeAfter.cata(analysis, function () {
          return Option.none();
        }, function () {
          // We have a new cell, so we stop looking.
          return Option.some(situs);
        }, function (cell) {
          if (Compare.eq(element, cell) && offset === 0) return tryAgain(bridge, element, offset, Carets.moveUp, direction);
          // We need to look again from the start of our current cell
          else return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
        }, function (cell) {
          // If we were here last time, move and try again.
          if (Compare.eq(element, cell) && offset === Awareness.getEnd(cell)) return tryAgain(bridge, element, offset, Carets.moveDown, direction);
          // We need to look again from the end of our current cell
          else return scan(bridge, isRoot, cell, Awareness.getEnd(cell), direction, numRetries - 1);
        });
      });
    };

    var tryAgain = function (bridge, element, offset, move, direction) {
      return Rectangles.getBoxAt(bridge, element, offset).bind(function (box) {
        return tryAt(bridge, direction, move(box, Retries.getJumpSize()));
      });
    };

    var tryAt = function (bridge, direction, box) {
      // NOTE: As we attempt to take over selection everywhere, we'll probably need to separate these again.
        if (platform.browser.isChrome() || platform.browser.isSafari() || platform.browser.isFirefox() || platform.browser.isEdge()) return direction.otherRetry(bridge, box);
        else if (platform.browser.isIE()) return direction.ieRetry(bridge, box);
        else return Option.none();
    };

    var tryCursor = function (bridge, isRoot, element, offset, direction) {
      return Rectangles.getBoxAt(bridge, element, offset).bind(function (box) {
        return tryAt(bridge, direction, box);
      });
    };

    var handle = function (bridge, isRoot, direction) {
      return findSpot(bridge, isRoot, direction).bind(function (spot) {
        // There is a point to start doing box-hitting from
        return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
      });
    };

    return {
      handle: handle
    };
  }
);
define(
  'ephox.sugar.api.search.PredicateExists',

  [
    'ephox.sugar.api.search.PredicateFind'
  ],

  function (PredicateFind) {
    var any = function (predicate) {
      return PredicateFind.first(predicate).isSome();
    };

    var ancestor = function (scope, predicate, isRoot) {
      return PredicateFind.ancestor(scope, predicate, isRoot).isSome();
    };

    var closest = function (scope, predicate, isRoot) {
      return PredicateFind.closest(scope, predicate, isRoot).isSome();
    };

    var sibling = function (scope, predicate) {
      return PredicateFind.sibling(scope, predicate).isSome();
    };

    var child = function (scope, predicate) {
      return PredicateFind.child(scope, predicate).isSome();
    };

    var descendant = function (scope, predicate) {
      return PredicateFind.descendant(scope, predicate).isSome();
    };

    return {
      any: any,
      ancestor: ancestor,
      closest: closest,
      sibling: sibling,
      child: child,
      descendant: descendant
    };
  }
);

define(
  'ephox.darwin.keyboard.VerticalMovement',

  [
    'ephox.darwin.api.Responses',
    'ephox.darwin.keyboard.KeySelection',
    'ephox.darwin.keyboard.TableKeys',
    'ephox.darwin.selection.Util',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.sand.api.PlatformDetection',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.PredicateExists',
    'ephox.sugar.api.search.SelectorFilter',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.Awareness',
    'ephox.sugar.api.selection.CursorPosition'
  ],

  function (
    Responses, KeySelection, TableKeys, Util, Arr, Fun, Option, PlatformDetection, Compare, PredicateExists, SelectorFilter, SelectorFind, Traverse, Awareness,
    CursorPosition
  ) {
    var detection = PlatformDetection.detect();

    var inSameTable = function (elem, table) {
      return PredicateExists.ancestor(elem, function (e) {
        return Traverse.parent(e).exists(function (p) {
          return Compare.eq(p, table);
        });
      });
    };

    // Note: initial is the finishing element, because that's where the cursor starts from
    // Anchor is the starting element, and is only used to work out if we are in the same table
    var simulate = function (bridge, isRoot, direction, initial, anchor) {
      return SelectorFind.closest(initial, 'td,th', isRoot).bind(function (start) {
        return SelectorFind.closest(start, 'table', isRoot).bind(function (table) {
          if (!inSameTable(anchor, table)) return Option.none();
          return TableKeys.handle(bridge, isRoot, direction).bind(function (range) {
            return SelectorFind.closest(range.finish(), 'td,th', isRoot).map(function (finish) {
              return {
                start: Fun.constant(start),
                finish: Fun.constant(finish),
                range: Fun.constant(range)
              };
            });
          });
        });
      });
    };

    var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
      // Do not override the up/down keys on IE.
      if (detection.browser.isIE()) {
        return Option.none();
      } else {
        return precheck(initial, isRoot).orThunk(function () {
          return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
            var range = info.range();
            return Responses.response(
              Option.some(Util.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())),
              true
            );
          });
        });
      }
    };

    var firstUpCheck = function (initial, isRoot) {
      return SelectorFind.closest(initial, 'tr', isRoot).bind(function (startRow) {
        return SelectorFind.closest(startRow, 'table', isRoot).bind(function (table) {
          var rows = SelectorFilter.descendants(table, 'tr');
          if (Compare.eq(startRow, rows[0])) {
            return Traverse.prevSibling(table).bind(CursorPosition.last).map(function (last) {
              var lastOffset = Awareness.getEnd(last);
              return Responses.response(
                Option.some(Util.makeSitus(last, lastOffset, last, lastOffset)),
                true
              );
            });
          } else {
            return Option.none();
          }
        });
      });
    };

    var lastDownCheck = function (initial, isRoot) {
      return SelectorFind.closest(initial, 'tr', isRoot).bind(function (startRow) {
        return SelectorFind.closest(startRow, 'table', isRoot).bind(function (table) {
          var rows = SelectorFilter.descendants(table, 'tr');
          if (Compare.eq(startRow, rows[rows.length - 1])) {
            return Traverse.nextSibling(table).bind(CursorPosition.first).map(function (first) {
              return Responses.response(
                Option.some(Util.makeSitus(first, 0, first, 0)),
                true
              );
            });
          } else {
            return Option.none();
          }
        });
      });
    };

    var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
      return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
        return KeySelection.detect(container, isRoot, info.start(), info.finish(), selectRange);
      });
    };

    return {
      navigate: navigate,
      select: select,
      firstUpCheck: firstUpCheck,
      lastDownCheck: lastDownCheck
    };
  }
);
define(
  'ephox.darwin.mouse.MouseSelection',

  [
    'ephox.darwin.selection.CellSelection',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.SelectorFind'
  ],

  function (CellSelection, Option, Compare, SelectorFind) {
    var findCell = function (target, isRoot) {
      return SelectorFind.closest(target, 'td,th', isRoot);
    };

    return function (bridge, container, isRoot, annotations) {
      var cursor = Option.none();
      var clearState = function () {
        cursor = Option.none();
      };

      /* Keep this as lightweight as possible when we're not in a table selection, it runs constantly */
      var mousedown = function (event) {
        annotations.clear(container);
        cursor = findCell(event.target(), isRoot);
      };

      /* Keep this as lightweight as possible when we're not in a table selection, it runs constantly */
      var mouseover = function (event) {
        cursor.each(function (start) {
          annotations.clear(container);
          findCell(event.target(), isRoot).each(function (finish) {
            var boxes = CellSelection.identify(start, finish, isRoot).getOr([]);
            // Wait until we have more than one, otherwise you can't do text selection inside a cell.
            // Alternatively, if the one cell selection starts in one cell and ends in a different cell,
            // we can assume that the user is trying to make a one cell selection in two different tables which should be possible.
            if (boxes.length > 1 || (boxes.length === 1 && !Compare.eq(start, finish))) {
              annotations.selectRange(container, boxes, start, finish);

              // stop the browser from creating a big text selection, select the cell where the cursor is
              bridge.selectContents(finish);
            }
          });
        });
      };

      /* Keep this as lightweight as possible when we're not in a table selection, it runs constantly */
      var mouseup = function () {
        cursor.each(clearState);
      };

      return {
        mousedown: mousedown,
        mouseover: mouseover,
        mouseup: mouseup
      };
    };
  }
);
define(
  'ephox.darwin.navigation.KeyDirection',

  [
    'ephox.darwin.keyboard.Retries',
    'ephox.darwin.navigation.BeforeAfter',
    'ephox.phoenix.api.dom.DomGather',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.Situ'
  ],

  function (Retries, BeforeAfter, DomGather, Traverse, Situ) {
    return {
      down: {
        traverse: Traverse.nextSibling,
        gather: DomGather.after,
        relative: Situ.before,
        otherRetry: Retries.tryDown,
        ieRetry: Retries.ieTryDown,
        failure: BeforeAfter.adt.failedDown
      },
      up: {
        traverse: Traverse.prevSibling,
        gather: DomGather.before,
        relative: Situ.before,
        otherRetry: Retries.tryUp,
        ieRetry: Retries.ieTryUp,
        failure: BeforeAfter.adt.failedUp
      }
    };
  }
);
define(
  'ephox.darwin.api.InputHandlers',

  [
    'ephox.darwin.api.Responses',
    'ephox.darwin.api.SelectionKeys',
    'ephox.darwin.api.WindowBridge',
    'ephox.darwin.keyboard.KeySelection',
    'ephox.darwin.keyboard.VerticalMovement',
    'ephox.darwin.mouse.MouseSelection',
    'ephox.darwin.navigation.KeyDirection',
    'ephox.darwin.selection.CellSelection',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'ephox.katamari.api.Struct',
    'ephox.sugar.api.selection.Situ'
  ],

  function (Responses, SelectionKeys, WindowBridge, KeySelection, VerticalMovement, MouseSelection, KeyDirection, CellSelection, Fun, Option, Options, Struct, Situ) {
    var rc = Struct.immutable('rows', 'cols');

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

        var handler = CellSelection.retrieve(container, annotations.selectedSelector()).fold(function () {
          // Shift down should predict the movement and set the selection.
          if (SelectionKeys.isDown(keycode) && shiftKey) {
            return Fun.curry(VerticalMovement.select, bridge, container, isRoot, KeyDirection.down, finish, start, annotations.selectRange);
          }
          // Shift up should predict the movement and set the selection.
          else if (SelectionKeys.isUp(keycode) && shiftKey) {
            return Fun.curry(VerticalMovement.select, bridge, container, isRoot, KeyDirection.up, finish, start, annotations.selectRange);
          }
          // Down should predict the movement and set the cursor
          else if (SelectionKeys.isDown(keycode)) {
            return Fun.curry(VerticalMovement.navigate, bridge, isRoot, KeyDirection.down, finish, start, VerticalMovement.lastDownCheck);
          }
          // Up should predict the movement and set the cursor
          else if (SelectionKeys.isUp(keycode)) {
            return Fun.curry(VerticalMovement.navigate, bridge, isRoot, KeyDirection.up, finish, start, VerticalMovement.firstUpCheck);
          }
          else {
            return Option.none;
          }
        }, function (selected) {

          var update = function (attempts) {
            return function () {
              var navigation = Options.findMap(attempts, function (delta) {
                return KeySelection.update(delta.rows(), delta.cols(), container, selected, annotations);
              });

              // Shift the selected rows and update the selection.
              return navigation.fold(function () {
                // The cell selection went outside the table, so clear it and bridge from the first box to before/after
                // the table
                return CellSelection.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                  var relative = SelectionKeys.isDown(keycode) || direction.isForward(keycode) ? Situ.after : Situ.before;
                  bridge.setRelativeSelection(Situ.on(edges.first(), 0), relative(edges.table()));
                  annotations.clear(container);
                  return Responses.response(Option.none(), true);
                });
              }, function (_) {
                return Option.some(Responses.response(Option.none(), true));
              });
            };
          };

          if (SelectionKeys.isDown(keycode) && shiftKey) return update([ rc(+1, 0) ]);
          else if (SelectionKeys.isUp(keycode) && shiftKey) return update([ rc(-1, 0) ]);
          // Left and right should try up/down respectively if they fail.
          else if (direction.isBackward(keycode) && shiftKey) return update([ rc(0, -1), rc(-1, 0) ]);
          else if (direction.isForward(keycode) && shiftKey) return update([ rc(0, +1), rc(+1, 0) ]);
          // Clear the selection on normal arrow keys.
          else if (SelectionKeys.isNavigation(keycode) && shiftKey === false) return clearToNavigate;
          else return Option.none;
        });

        return handler();
      };

      var keyup = function (event, start, soffset, finish, foffset) {
        return CellSelection.retrieve(container, annotations.selectedSelector()).fold(function () {
          var keycode = event.raw().which;
          var shiftKey = event.raw().shiftKey === true;
          if (shiftKey === false) return Option.none();
          if (SelectionKeys.isNavigation(keycode)) return KeySelection.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
          else return Option.none();
        }, Option.none);
      };

      return {
        keydown: keydown,
        keyup: keyup
      };
    };

    return {
      mouse: mouse,
      keyboard: keyboard
    };
  }
);
define(
  'ephox.sugar.api.properties.Classes',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.properties.Class',
    'ephox.sugar.impl.ClassList',
    'global!Array'
  ],

  function (Arr, Class, ClassList, Array) {
    /*
     * ClassList is IE10 minimum:
     * https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
     */
    var add = function (element, classes) {
      Arr.each(classes, function (x) {
        Class.add(element, x);
      });
    };

    var remove = function (element, classes) {
      Arr.each(classes, function (x) {
        Class.remove(element, x);
      });
    };

    var toggle = function (element, classes) {
      Arr.each(classes, function (x) {
        Class.toggle(element, x);
      });
    };

    var hasAll = function (element, classes) {
      return Arr.forall(classes, function (clazz) {
        return Class.has(element, clazz);
      });
    };

    var hasAny = function (element, classes) {
      return Arr.exists(classes, function (clazz) {
        return Class.has(element, clazz);
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

    var get = function (element) {
      return ClassList.supports(element) ? getNative(element) : ClassList.get(element);
    };

    // set deleted, risks bad performance. Be deterministic.

    return {
      add: add,
      remove: remove,
      toggle: toggle,
      hasAll: hasAll,
      hasAny: hasAny,
      get: get
    };
  }
);

define(
  'ephox.sugar.api.properties.OnNode',

  [
    'ephox.sugar.api.properties.Class',
    'ephox.sugar.api.properties.Classes'
  ],

  function (Class, Classes) {
     var addClass = function (clazz) {
      return function (element) {
        Class.add(element, clazz);
      };
    };

    var removeClass = function (clazz) {
      return function (element) {
        Class.remove(element, clazz);
      };
    };

    var removeClasses = function (classes) {
      return function (element) {
        Classes.remove(element, classes);
      };
    };

    var hasClass = function (clazz) {
      return function (element) {
        return Class.has(element, clazz);
      };
    };

    return {
      addClass: addClass,
      removeClass: removeClass,
      removeClasses: removeClasses,
      hasClass: hasClass
    };
  }
);
define(
  'ephox.darwin.api.SelectionAnnotation',

  [
    'ephox.katamari.api.Arr',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Class',
    'ephox.sugar.api.properties.OnNode',
    'ephox.sugar.api.search.SelectorFilter'
  ],

  function (Arr, Attr, Class, OnNode, SelectorFilter) {
    var byClass = function (ephemera) {
      var addSelectionClass = OnNode.addClass(ephemera.selected());
      var removeSelectionClasses = OnNode.removeClasses([ ephemera.selected(), ephemera.lastSelected(), ephemera.firstSelected() ]);

      var clear = function (container) {
        var sels = SelectorFilter.descendants(container, ephemera.selectedSelector());
        Arr.each(sels, removeSelectionClasses);
      };

      var selectRange = function (container, cells, start, finish) {
        clear(container);
        Arr.each(cells, addSelectionClass);
        Class.add(start, ephemera.firstSelected());
        Class.add(finish, ephemera.lastSelected());
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
        Attr.remove(element, ephemera.selected());
        Attr.remove(element, ephemera.firstSelected());
        Attr.remove(element, ephemera.lastSelected());
      };

      var addSelectionAttribute = function (element) {
        Attr.set(element, ephemera.selected(), '1');
      };

      var clear = function (container) {
        var sels = SelectorFilter.descendants(container, ephemera.selectedSelector());
        Arr.each(sels, removeSelectionAttributes);
      };

      var selectRange = function (container, cells, start, finish) {
        clear(container);
        Arr.each(cells, addSelectionAttribute);
        Attr.set(start, ephemera.firstSelected(), '1');
        Attr.set(finish, ephemera.lastSelected(), '1');
      };
      return {
        clear: clear,
        selectRange: selectRange,
        selectedSelector: ephemera.selectedSelector,
        firstSelectedSelector: ephemera.firstSelectedSelector,
        lastSelectedSelector: ephemera.lastSelectedSelector
      };
    };
    return {
      byClass: byClass,
      byAttr: byAttr
    };
  }
);

/**
 * CellSelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

 /*eslint no-bitwise:0 */

define(
  'tinymce.plugins.table.selection.CellSelection',

  [
    'ephox.darwin.api.InputHandlers',
    'ephox.darwin.api.SelectionAnnotation',
    'ephox.darwin.api.SelectionKeys',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Struct',
    'ephox.snooker.api.TableLookup',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.node.Text',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.search.Traverse',
    'ephox.sugar.api.selection.Selection',
    'ephox.sugar.selection.core.SelectionDirection',
    'tinymce.plugins.table.alien.Util',
    'tinymce.plugins.table.queries.Direction',
    'tinymce.plugins.table.selection.Ephemera'
  ],

  function (InputHandlers, SelectionAnnotation, SelectionKeys, Fun, Option, Struct, TableLookup, Compare, Element, Node, Text, Attr, Traverse, Selection, SelectionDirection, Util, Direction, Ephemera) {
    return function (editor, lazyResize) {
      var handlerStruct = Struct.immutableBag(['mousedown', 'mouseover', 'mouseup', 'keyup', 'keydown'], []);
      var handlers = Option.none();

      var annotations = SelectionAnnotation.byAttr(Ephemera);

      editor.on('init', function (e) {
        var win = editor.getWin();
        var body = Util.getBody(editor);
        var isRoot = Util.getIsRoot(editor);

        var syncSelection = function () {
          var sel = editor.selection;
          var start = Element.fromDom(sel.getStart());
          var end = Element.fromDom(sel.getEnd());
          var startTable = TableLookup.table(start);
          var endTable = TableLookup.table(end);
          var sameTable = startTable.bind(function (tableStart) {
            return endTable.bind(function (tableEnd) {
              return Compare.eq(tableStart, tableEnd) ? Option.some(true) : Option.none();
            });
          });
          sameTable.fold(function () {
            annotations.clear(body);
          }, Fun.noop);
        };

        var mouseHandlers = InputHandlers.mouse(win, body, isRoot, annotations);
        var keyHandlers = InputHandlers.keyboard(win, body, isRoot, annotations);

        var handleResponse = function (event, response) {
          if (response.kill()) {
            event.kill();
          }
          response.selection().each(function (ns) {
            var relative = Selection.relative(ns.start(), ns.finish());
            var rng = SelectionDirection.asLtrRange(win, relative);
            editor.selection.setRng(rng);
          });
        };

        var keyup = function (event) {
          var wrappedEvent = wrapEvent(event);
          // Note, this is an optimisation.
          if (wrappedEvent.raw().shiftKey && SelectionKeys.isNavigation(wrappedEvent.raw().which)) {
            var rng = editor.selection.getRng();
            var start = Element.fromDom(rng.startContainer);
            var end = Element.fromDom(rng.endContainer);
            keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
              handleResponse(wrappedEvent, response);
            });
          }
        };

        var checkLast = function (last) {
          return !Attr.has(last, 'data-mce-bogus') && Node.name(last) !== 'br' && !(Node.isText(last) && Text.get(last).length === 0);
        };

        var getLast = function () {
          var body = Element.fromDom(editor.getBody());

          var lastChild = Traverse.lastChild(body);

          var getPrevLast = function (last) {
            return Traverse.prevSibling(last).bind(function (prevLast) {
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
              if (Node.name(last) === 'table') {
                if (editor.settings.forced_root_block) {
                  editor.dom.add(
                    editor.getBody(),
                    editor.settings.forced_root_block,
                    editor.settings.forced_root_block_attrs,
                    '<br/>'
                  );
                } else {
                  editor.dom.add(editor.getBody(), 'br');
                }
              }
            });
          }

          var rng = editor.selection.getRng();
          var startContainer = Element.fromDom(editor.selection.getStart());
          var start = Element.fromDom(rng.startContainer);
          var end = Element.fromDom(rng.endContainer);
          var direction = Direction.directionAt(startContainer).isRtl() ? SelectionKeys.rtl : SelectionKeys.ltr;
          keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
          lazyResize().each(function (resize) {
            resize.showBars();
          });
        };

        var wrapEvent = function (event) {
          // IE9 minimum
          var target = Element.fromDom(event.target);

          var stop = function () {
            event.stopPropagation();
          };

          var prevent = function () {
            event.preventDefault();
          };

          var kill = Fun.compose(prevent, stop); // more of a sequence than a compose, but same effect

          // FIX: Don't just expose the raw event. Need to identify what needs standardisation.
          return {
            'target':  Fun.constant(target),
            'x':       Fun.constant(event.x),
            'y':       Fun.constant(event.y),
            'stop':    stop,
            'prevent': prevent,
            'kill':    kill,
            'raw':     Fun.constant(event)
          };
        };

        var isLeftMouse = function (raw) {
          return raw.button === 0;
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
        var isLeftButtonPressed = function (raw) {
          // Only added by Chrome/Firefox in June 2015.
          // This is only to fix a 1px bug (TBIO-2836) so return true if we're on an older browser
          if (raw.buttons === undefined) {
            return true;
          }

          // use bitwise & for optimal comparison
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
          // editor.off('mousedown', handlers.mousedown());
          // editor.off('mouseover', handlers.mouseover());
          // editor.off('mouseup', handlers.mouseup());
          // editor.off('keyup', handlers.keyup());
          // editor.off('keydown', handlers.keydown());
        });
      };

      return {
        clear: annotations.clear,
        destroy: destroy
      };
    };
  }
);

/**
 * Selections.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.selection.Selections',

  [
    'ephox.darwin.api.TableSelection',
    'tinymce.plugins.table.alien.Util',
    'tinymce.plugins.table.selection.Ephemera',
    'tinymce.plugins.table.selection.SelectionTypes'
  ],

  function (TableSelection, Util, Ephemera, SelectionTypes) {
    return function (editor) {
      var get = function () {
        var body = Util.getBody(editor);

        return TableSelection.retrieve(body, Ephemera.selectedSelector()).fold(function () {
          if (editor.selection.getStart() === undefined) {
            return SelectionTypes.none();
          } else {
            return SelectionTypes.single(editor.selection);
          }
        }, function (cells) {
          return SelectionTypes.multiple(cells);
        });
      };

      return {
        get: get
      };
    };
  }
);

/**
 * Buttons.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.ui.Buttons',

  [
    'ephox.katamari.api.Fun',
    'tinymce.core.util.Tools',
    'tinymce.plugins.table.ui.TableDialog'
  ],

  function (Fun, Tools, TableDialog) {
    var each = Tools.each;

    var addButtons = function (editor) {
      var menuItems = [];
      each("inserttable tableprops deletetable | cell row column".split(' '), function (name) {
        if (name == '|') {
          menuItems.push({ text: '-' });
        } else {
          menuItems.push(editor.menuItems[name]);
        }
      });

      editor.addButton("table", {
        type: "menubutton",
        title: "Table",
        menu: menuItems
      });

      function cmd(command) {
        return function () {
          editor.execCommand(command);
        };
      }

      editor.addButton('tableprops', {
        title: 'Table properties',
        onclick: Fun.curry(TableDialog.open, editor, true),
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
        toolbarItems = 'tableprops tabledelete | ' +
          'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
          'tableinsertcolbefore tableinsertcolafter tabledeletecol';
      }

      editor.addContextToolbar(
        isTable,
        toolbarItems
      );
    };

    return {
      addButtons: addButtons,
      addToolbars: addToolbars
    };
  }
);

/**
 * MenuItems.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.table.ui.MenuItems',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.snooker.api.TableLookup',
    'ephox.sugar.api.node.Element',
    'tinymce.plugins.table.actions.InsertTable',
    'tinymce.plugins.table.queries.TableTargets',
    'tinymce.plugins.table.ui.TableDialog'
  ],

  function (Fun, Arr, Option, TableLookup, Element, InsertTable, TableTargets, TableDialog) {
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
          Arr.each(tableCtrls, noTargetDisable);
          Arr.each(cellCtrls, noTargetDisable);
          Arr.each(mergeCtrls, noTargetDisable);
          Arr.each(unmergeCtrls, noTargetDisable);
        }, function (targets) {
          Arr.each(tableCtrls, ctrlEnable);
          Arr.each(cellCtrls, ctrlEnable);
          Arr.each(mergeCtrls, function (mergeCtrl) {
            mergeCtrl.disabled(targets.mergable().isNone());
          });
          Arr.each(unmergeCtrls, function (unmergeCtrl) {
            unmergeCtrl.disabled(targets.unmergable().isNone());
          });
        });
      };

      editor.on('init', function () {
        editor.on('nodechange', function (e) {
          var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
          targets = cellOpt.bind(function (cellDom) {
            var cell = Element.fromDom(cellDom);
            var table = TableLookup.table(cell);
            return table.map(function (table) {
              return TableTargets.forMenu(selections, table, cell);
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
            html += '<td role="gridcell" tabindex="-1"><a id="mcegrid' + (y * 10 + x) + '" href="#" ' +
              'data-mce-x="' + x + '" data-mce-y="' + y + '"></a></td>';
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
        var rtl = control.isRtl() || control.parent().rel == 'tl-tr';

        table.nextSibling.innerHTML = (tx + 1) + ' x ' + (ty + 1);

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
        onclick: Fun.curry(TableDialog.open, editor)
      } : {
        text: 'Table',
        icon: 'table',
        context: 'table',
        ariaHideMenu: true,
        onclick: function (e) {
          if (e.aria) {
            this.parent().hideAll();
            e.stopImmediatePropagation();
            TableDialog.open(editor);
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
        menu: [
          {
            type: 'container',
            html: generateTableGrid(),

            onPostRender: function () {
              this.lastX = this.lastY = 0;
            },

            onmousemove: function (e) {
              var target = e.target, x, y;

              if (target.tagName.toUpperCase() == 'A') {
                x = parseInt(target.getAttribute('data-mce-x'), 10);
                y = parseInt(target.getAttribute('data-mce-y'), 10);

                if (this.isRtl() || this.parent().rel == 'tl-tr') {
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

              if (e.target.tagName.toUpperCase() == 'A') {
                e.preventDefault();
                e.stopPropagation();
                self.parent().cancel();

                editor.undoManager.transact(function () {
                  InsertTable.insert(editor, self.lastX + 1, self.lastY + 1);
                });

                editor.addVisual();
              }
            }
          }
        ]
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
        onclick: Fun.curry(TableDialog.open, editor, true)
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
          { text: 'Insert row before', onclick: cmd('mceTableInsertRowBefore'), onPostRender: pushCell },
          { text: 'Insert row after', onclick: cmd('mceTableInsertRowAfter'), onPostRender: pushCell },
          { text: 'Delete row', onclick: cmd('mceTableDeleteRow'), onPostRender: pushCell },
          { text: 'Row properties', onclick: cmd('mceTableRowProps'), onPostRender: pushCell },
          { text: '-' },
          { text: 'Cut row', onclick: cmd('mceTableCutRow'), onPostRender: pushCell },
          { text: 'Copy row', onclick: cmd('mceTableCopyRow'), onPostRender: pushCell },
          { text: 'Paste row before', onclick: cmd('mceTablePasteRowBefore'), onPostRender: pushCell },
          { text: 'Paste row after', onclick: cmd('mceTablePasteRowAfter'), onPostRender: pushCell }
        ]
      };

      var column = {
        text: 'Column',
        context: 'table',
        menu: [
          { text: 'Insert column before', onclick: cmd('mceTableInsertColBefore'), onPostRender: pushCell },
          { text: 'Insert column after', onclick: cmd('mceTableInsertColAfter'), onPostRender: pushCell },
          { text: 'Delete column', onclick: cmd('mceTableDeleteCol'), onPostRender: pushCell }
        ]
      };

      var cell = {
        separator: 'before',
        text: 'Cell',
        context: 'table',
        menu: [
          { text: 'Cell properties', onclick: cmd('mceTableCellProps'), onPostRender: pushCell },
          { text: 'Merge cells', onclick: cmd('mceTableMergeCells'), onPostRender: pushMerge },
          { text: 'Split cell', onclick: cmd('mceTableSplitCells'), onPostRender: pushUnmerge }
        ]
      };

      editor.addMenuItem('inserttable', insertTable);
      editor.addMenuItem('tableprops', tableProperties);
      editor.addMenuItem('deletetable', deleteTable);
      editor.addMenuItem('row', row);
      editor.addMenuItem('column', column);
      editor.addMenuItem('cell', cell);
    };
    return {
      addMenuItems: addMenuItems
    };
  }
);

/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains all core logic for the table plugin.
 *
 * @class tinymce.table.Plugin
 * @private
 */
define(
  'tinymce.plugins.table.Plugin',
  [
    'tinymce.core.PluginManager',
    'tinymce.plugins.table.actions.Clipboard',
    'tinymce.plugins.table.actions.InsertTable',
    'tinymce.plugins.table.actions.TableActions',
    'tinymce.plugins.table.actions.TableCommands',
    'tinymce.plugins.table.actions.ResizeHandler',
    'tinymce.plugins.table.queries.TabContext',
    'tinymce.plugins.table.selection.CellSelection',
    'tinymce.plugins.table.selection.Ephemera',
    'tinymce.plugins.table.selection.Selections',
    'tinymce.plugins.table.ui.Buttons',
    'tinymce.plugins.table.ui.MenuItems'
  ],
  function (PluginManager, Clipboard, InsertTable, TableActions, TableCommands, ResizeHandler, TabContext, CellSelection, Ephemera, Selections, Buttons, MenuItems) {
    function Plugin(editor) {
      var self = this;

      var resizeHandler = ResizeHandler(editor);
      var cellSelection = CellSelection(editor, resizeHandler.lazyResize);
      var actions = TableActions(editor, resizeHandler.lazyWire);
      var selections = Selections(editor);

      TableCommands.registerCommands(editor, actions, cellSelection, selections);

      Clipboard.registerEvents(editor, selections, actions, cellSelection);

      MenuItems.addMenuItems(editor, selections);
      Buttons.addButtons(editor);
      Buttons.addToolbars(editor);


      editor.on('PreInit', function () {
        // Remove internal data attributes
        editor.serializer.addTempAttr(Ephemera.firstSelected());
        editor.serializer.addTempAttr(Ephemera.lastSelected());
      });

      // Enable tab key cell navigation
      if (editor.settings.table_tab_navigation !== false) {
        editor.on('keydown', function (e) {
          TabContext.handle(e, editor, actions, resizeHandler.lazyWire);
        });
      }

      editor.on('remove', function () {
        resizeHandler.destroy();
        cellSelection.destroy();
      });

      self.insertTable = function (columns, rows) {
        return InsertTable.insert(editor, columns, rows);
      };
      self.setClipboardRows = TableCommands.setClipboardRows;
      self.getClipboardRows = TableCommands.getClipboardRows;
    }

    PluginManager.add('table', Plugin);

    return function () { };
  }
);

dem('tinymce.plugins.table.Plugin')();
})();
