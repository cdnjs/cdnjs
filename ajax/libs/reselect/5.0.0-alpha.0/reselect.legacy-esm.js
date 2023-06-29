// src/defaultMemoize.ts
var NOT_FOUND = "NOT_FOUND";
function createSingletonCache(equals) {
  let entry;
  return {
    get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }
      return NOT_FOUND;
    },
    put(key, value) {
      entry = { key, value };
    },
    getEntries() {
      return entry ? [entry] : [];
    },
    clear() {
      entry = void 0;
    }
  };
}
function createLruCache(maxSize, equals) {
  let entries = [];
  function get(key) {
    const cacheIndex = entries.findIndex((entry) => equals(key, entry.key));
    if (cacheIndex > -1) {
      const entry = entries[cacheIndex];
      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }
      return entry.value;
    }
    return NOT_FOUND;
  }
  function put(key, value) {
    if (get(key) === NOT_FOUND) {
      entries.unshift({ key, value });
      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }
  function getEntries() {
    return entries;
  }
  function clear() {
    entries = [];
  }
  return { get, put, getEntries, clear };
}
var defaultEqualityCheck = (a, b) => {
  return a === b;
};
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    }
    const length = prev.length;
    for (let i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }
    return true;
  };
}
function defaultMemoize(func, equalityCheckOrOptions) {
  const providedOptions = typeof equalityCheckOrOptions === "object" ? equalityCheckOrOptions : { equalityCheck: equalityCheckOrOptions };
  const {
    equalityCheck = defaultEqualityCheck,
    maxSize = 1,
    resultEqualityCheck
  } = providedOptions;
  const comparator = createCacheKeyComparator(equalityCheck);
  const cache = maxSize === 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator);
  function memoized() {
    let value = cache.get(arguments);
    if (value === NOT_FOUND) {
      value = func.apply(null, arguments);
      if (resultEqualityCheck) {
        const entries = cache.getEntries();
        const matchingEntry = entries.find(
          (entry) => resultEqualityCheck(entry.value, value)
        );
        if (matchingEntry) {
          value = matchingEntry.value;
        }
      }
      cache.put(arguments, value);
    }
    return value;
  }
  memoized.clearCache = () => cache.clear();
  return memoized;
}

// src/index.ts
function getDependencies(funcs) {
  const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
  if (!dependencies.every((dep) => typeof dep === "function")) {
    const dependencyTypes = dependencies.map(
      (dep) => typeof dep === "function" ? `function ${dep.name || "unnamed"}()` : typeof dep
    ).join(", ");
    throw new Error(
      `createSelector expects all input-selectors to be functions, but received the following types: [${dependencyTypes}]`
    );
  }
  return dependencies;
}
function createSelectorCreator(memoize, ...memoizeOptionsFromArgs) {
  const createSelector2 = (...funcs) => {
    let recomputations = 0;
    let lastResult;
    let directlyPassedOptions = {
      memoizeOptions: void 0
    };
    let resultFunc = funcs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = funcs.pop();
    }
    if (typeof resultFunc !== "function") {
      throw new Error(
        `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
      );
    }
    const { memoizeOptions = memoizeOptionsFromArgs } = directlyPassedOptions;
    const finalMemoizeOptions = Array.isArray(memoizeOptions) ? memoizeOptions : [memoizeOptions];
    const dependencies = getDependencies(funcs);
    const memoizedResultFunc = memoize(
      function recomputationWrapper() {
        recomputations++;
        return resultFunc.apply(null, arguments);
      },
      ...finalMemoizeOptions
    );
    const selector = memoize(function dependenciesChecker() {
      const params = [];
      const length = dependencies.length;
      for (let i = 0; i < length; i++) {
        params.push(dependencies[i].apply(null, arguments));
      }
      lastResult = memoizedResultFunc.apply(null, params);
      return lastResult;
    });
    Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      lastResult: () => lastResult,
      recomputations: () => recomputations,
      resetRecomputations: () => recomputations = 0
    });
    return selector;
  };
  return createSelector2;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(defaultMemoize);
var createStructuredSelector = (selectors, selectorCreator = createSelector) => {
  if (typeof selectors !== "object") {
    throw new Error(
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof selectors}`
    );
  }
  const objectKeys = Object.keys(selectors);
  const resultSelector = selectorCreator(
    // @ts-ignore
    objectKeys.map((key) => selectors[key]),
    (...values) => {
      return values.reduce((composition, value, index) => {
        composition[objectKeys[index]] = value;
        return composition;
      }, {});
    }
  );
  return resultSelector;
};
export {
  createSelector,
  createSelectorCreator,
  createStructuredSelector,
  defaultEqualityCheck,
  defaultMemoize
};
