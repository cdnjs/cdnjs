(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('Reselect', ['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Reselect = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.defaultMemoize = defaultMemoize;
  exports.createSelectorCreator = createSelectorCreator;
  exports.createStructuredSelector = createStructuredSelector;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function defaultEqualityCheck(a, b) {
    return a === b;
  }

  function defaultMemoize(func) {
    var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];

    var lastArgs = null;
    var lastResult = null;
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (lastArgs === null || lastArgs.length !== args.length || !args.every(function (value, index) {
        return equalityCheck(value, lastArgs[index]);
      })) {
        lastResult = func.apply(undefined, args);
      }
      lastArgs = args;
      return lastResult;
    };
  }

  function getDependencies(funcs) {
    var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

    if (!dependencies.every(function (dep) {
      return typeof dep === 'function';
    })) {
      var dependencyTypes = dependencies.map(function (dep) {
        return typeof dep;
      }).join(', ');
      throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
    }

    return dependencies;
  }

  function createSelectorCreator(memoize) {
    for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      memoizeOptions[_key2 - 1] = arguments[_key2];
    }

    return function () {
      for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        funcs[_key3] = arguments[_key3];
      }

      var recomputations = 0;
      var resultFunc = funcs.pop();
      var dependencies = getDependencies(funcs);

      var memoizedResultFunc = memoize.apply(undefined, [function () {
        recomputations++;
        return resultFunc.apply(undefined, arguments);
      }].concat(memoizeOptions));

      var selector = function selector(state, props) {
        for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
          args[_key4 - 2] = arguments[_key4];
        }

        var params = dependencies.map(function (dependency) {
          return dependency.apply(undefined, [state, props].concat(args));
        });
        return memoizedResultFunc.apply(undefined, _toConsumableArray(params));
      };

      selector.resultFunc = resultFunc;
      selector.recomputations = function () {
        return recomputations;
      };
      selector.resetRecomputations = function () {
        return recomputations = 0;
      };
      return selector;
    };
  }

  var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);

  function createStructuredSelector(selectors) {
    var selectorCreator = arguments.length <= 1 || arguments[1] === undefined ? createSelector : arguments[1];

    if (typeof selectors !== 'object') {
      throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
    }
    var objectKeys = Object.keys(selectors);
    return selectorCreator(objectKeys.map(function (key) {
      return selectors[key];
    }), function () {
      for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        values[_key5] = arguments[_key5];
      }

      return values.reduce(function (composition, value, index) {
        composition[objectKeys[index]] = value;
        return composition;
      }, {});
    });
  }
});
