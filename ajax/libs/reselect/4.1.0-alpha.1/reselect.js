(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Reselect = {}));
}(this, (function (exports) { 'use strict';

  var defaultEqualityCheck = function defaultEqualityCheck(a, b) {
    return a === b;
  };

  function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.


    var length = prev.length;

    for (var i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }

    return true;
  }

  function defaultMemoize(func, equalityCheck) {
    if (equalityCheck === void 0) {
      equalityCheck = defaultEqualityCheck;
    }

    var lastArgs = null;
    var lastResult = null; // we reference arguments instead of spreading them for performance reasons

    return function () {
      if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
        // apply arguments instead of spreading for performance.
        // @ts-ignore
        lastResult = func.apply(null, arguments);
      }

      lastArgs = arguments;
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
      throw new Error('Selector creators expect all input-selectors to be functions, ' + ("instead received the following types: [" + dependencyTypes + "]"));
    }

    return dependencies;
  }

  function createSelectorCreator(memoize) {
    for (var _len = arguments.length, memoizeOptions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      memoizeOptions[_key - 1] = arguments[_key];
    }

    // @ts-ignore
    return function () {
      for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        funcs[_key2] = arguments[_key2];
      }

      var recomputations = 0;
      var resultFunc = funcs.pop();
      var dependencies = getDependencies(funcs); // @ts-ignore

      var memoizedResultFunc = memoize.apply(void 0, [function () {
        recomputations++; // apply arguments instead of spreading for performance.

        return resultFunc.apply(null, arguments); // @ts-ignore
      }].concat(memoizeOptions)); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
      // @ts-ignore

      var selector = memoize(function () {
        var params = [];
        var length = dependencies.length;

        for (var i = 0; i < length; i++) {
          // apply arguments instead of spreading and mutate a local list of params for performance.
          // @ts-ignore
          params.push(dependencies[i].apply(null, arguments));
        } // apply arguments instead of spreading for performance.


        return memoizedResultFunc.apply(null, params);
      });
      selector.resultFunc = resultFunc;
      selector.dependencies = dependencies;

      selector.recomputations = function () {
        return recomputations;
      };

      selector.resetRecomputations = function () {
        return recomputations = 0;
      };

      return selector;
    };
  }
  var createSelector = /* #__PURE__ */createSelectorCreator(defaultMemoize);
  // Manual definition of state and output arguments
  var createStructuredSelector = function createStructuredSelector(selectors, selectorCreator) {
    if (selectorCreator === void 0) {
      selectorCreator = createSelector;
    }

    if (typeof selectors !== 'object') {
      throw new Error('createStructuredSelector expects first argument to be an object ' + ("where each property is a selector, instead received a " + typeof selectors));
    }

    var objectKeys = Object.keys(selectors);
    return selectorCreator( // @ts-ignore
    objectKeys.map(function (key) {
      return selectors[key];
    }), function () {
      for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        values[_key3] = arguments[_key3];
      }

      return values.reduce(function (composition, value, index) {
        composition[objectKeys[index]] = value;
        return composition;
      }, {});
    });
  };

  exports.createSelector = createSelector;
  exports.createSelectorCreator = createSelectorCreator;
  exports.createStructuredSelector = createStructuredSelector;
  exports.defaultEqualityCheck = defaultEqualityCheck;
  exports.defaultMemoize = defaultMemoize;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
