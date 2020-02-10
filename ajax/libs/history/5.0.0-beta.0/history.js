(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.History = {})));
}(this, (function (exports) { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var PopAction = 'POP';
  var PushAction = 'PUSH';
  var ReplaceAction = 'REPLACE';
  var BeforeUnloadEventType = 'beforeunload';
  var PopStateEventType = 'popstate';
  var HashChangeEventType = 'hashchange'; // There's some duplication in this code, but only one create* method
  // should ever be used in a given web page, so it's best for minifying
  // to just inline everything.

  /**
   * Memory history stores the current location in memory. It is designed
   * for use in stateful non-browser environments like headless tests (in
   * node.js) and React Native.
   */

  var createMemoryHistory = function createMemoryHistory(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$initialEntries = _ref.initialEntries,
        initialEntries = _ref$initialEntries === void 0 ? ['/'] : _ref$initialEntries,
        _ref$initialIndex = _ref.initialIndex,
        initialIndex = _ref$initialIndex === void 0 ? 0 : _ref$initialIndex;

    var entries = initialEntries.map(function (entry) {
      var location = createReadOnlyObject(_extends({
        pathname: '/',
        search: '',
        hash: '',
        state: null,
        key: createKey()
      }, typeof entry === 'string' ? parsePath(entry) : entry));

      {
        if (location.pathname.charAt(0) !== '/') {
          var arg = JSON.stringify(entry);
          throw new Error("Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: " + arg + ")");
        }
      }

      return location;
    });
    var index = clamp(initialIndex, 0, entries.length - 1);
    var action = PopAction;
    var location = entries[index];
    var blockers = createEvents();
    var listeners = createEvents();
    var createHref = createPath;

    var getNextLocation = function getNextLocation(to, state) {
      if (state === void 0) {
        state = null;
      }

      return createReadOnlyObject(_extends({}, location, {}, typeof to === 'string' ? parsePath(to) : to, {
        state: state,
        key: createKey()
      }));
    };

    var allowTx = function allowTx(action, location, retry) {
      return !blockers.length || (blockers.call({
        action: action,
        location: location,
        retry: retry
      }), false);
    };

    var applyTx = function applyTx(nextAction, nextLocation) {
      action = nextAction;
      location = nextLocation;
      listeners.call({
        action: action,
        location: location
      });
    };

    var push = function push(to, state) {
      var nextAction = PushAction;
      var nextLocation = getNextLocation(to, state);

      var retry = function retry() {
        return push(to, state);
      };

      {
        if (nextLocation.pathname.charAt(0) !== '/') {
          var arg = JSON.stringify(to);
          throw new Error("Relative pathnames are not supported in createMemoryHistory().push(" + arg + ")");
        }
      }

      if (allowTx(nextAction, nextLocation, retry)) {
        index += 1;
        entries.splice(index, entries.length, nextLocation);
        applyTx(nextAction, nextLocation);
      }
    };

    var replace = function replace(to, state) {
      var nextAction = ReplaceAction;
      var nextLocation = getNextLocation(to, state);

      var retry = function retry() {
        return replace(to, state);
      };

      {
        if (nextLocation.pathname.charAt(0) !== '/') {
          var arg = JSON.stringify(to);
          throw new Error("Relative pathnames are not supported in createMemoryHistory().replace(" + arg + ")");
        }
      }

      if (allowTx(nextAction, nextLocation, retry)) {
        entries[index] = nextLocation;
        applyTx(nextAction, nextLocation);
      }
    };

    var go = function go(n) {
      var nextIndex = clamp(index + n, 0, entries.length - 1);
      var nextAction = PopAction;
      var nextLocation = entries[nextIndex];

      var retry = function retry() {
        go(n);
      };

      if (allowTx(nextAction, nextLocation, retry)) {
        index = nextIndex;
        applyTx(nextAction, nextLocation);
      }
    };

    var back = function back() {
      go(-1);
    };

    var forward = function forward() {
      go(1);
    };

    var listen = function listen(fn) {
      return listeners.push(fn);
    };

    var block = function block(fn) {
      return blockers.push(fn);
    };

    var history = {
      get action() {
        return action;
      },

      get location() {
        return location;
      },

      createHref: createHref,
      push: push,
      replace: replace,
      go: go,
      back: back,
      forward: forward,
      listen: listen,
      block: block
    };
    return history;
  };
  /**
   * Browser history stores the location in regular URLs. This is the
   * standard for most web apps, but it requires some configuration on
   * the server to ensure you serve the same app at multiple URLs.
   */

  var createBrowserHistory = function createBrowserHistory(_temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$window = _ref2.window,
        window = _ref2$window === void 0 ? document.defaultView : _ref2$window;

    var globalHistory = window.history;

    var getIndexAndLocation = function getIndexAndLocation() {
      var _window$location = window.location,
          pathname = _window$location.pathname,
          search = _window$location.search,
          hash = _window$location.hash;
      var state = globalHistory.state || {};
      return [state.idx, createReadOnlyObject({
        pathname: pathname,
        search: search,
        hash: hash,
        state: state.usr || null,
        key: state.key || 'default'
      })];
    };

    var blockedPopTx = null;

    var handlePop = function handlePop() {
      if (blockedPopTx) {
        blockers.call(blockedPopTx);
        blockedPopTx = null;
      } else {
        var nextAction = PopAction;

        var _getIndexAndLocation = getIndexAndLocation(),
            nextIndex = _getIndexAndLocation[0],
            nextLocation = _getIndexAndLocation[1];

        if (blockers.length) {
          if (nextIndex != null) {
            var n = index - nextIndex;

            if (n) {
              // Revert the POP
              blockedPopTx = {
                action: nextAction,
                location: nextLocation,
                retry: function retry() {
                  go(n * -1);
                }
              };
              go(n);
            }
          } else {
            // Trying to POP to a location with no index. We did not create
            // this location, so we can't effectively block the navigation.
            {
              // TODO: Write up a doc that explains our blocking strategy in
              // detail and link to it here so people can understand better
              // what is going on and how to avoid it.
              throw new Error("You are trying to block a POP navigation to a location that was not " + "created by the history library. The block will fail silently in " + "production, but in general you should do all navigation with the " + "history library (instead of using window.history.pushState directly) " + "to avoid this situation.");
            }
          }
        } else {
          applyTx(nextAction);
        }
      }
    };

    window.addEventListener(PopStateEventType, handlePop);
    var action = PopAction;

    var _getIndexAndLocation2 = getIndexAndLocation(),
        index = _getIndexAndLocation2[0],
        location = _getIndexAndLocation2[1];

    var blockers = createEvents();
    var listeners = createEvents();

    if (index == null) {
      index = 0;
      globalHistory.replaceState(_extends({}, globalHistory.state, {
        idx: index
      }), null);
    }

    var createHref = createPath;

    var getNextLocation = function getNextLocation(to, state) {
      if (state === void 0) {
        state = null;
      }

      return createReadOnlyObject(_extends({}, location, {}, typeof to === 'string' ? parsePath(to) : to, {
        state: state,
        key: createKey()
      }));
    };

    var getHistoryStateAndUrl = function getHistoryStateAndUrl(nextLocation, index) {
      return [{
        usr: nextLocation.state,
        key: nextLocation.key,
        idx: index
      }, createHref(nextLocation)];
    };

    var allowTx = function allowTx(action, location, retry) {
      return !blockers.length || (blockers.call({
        action: action,
        location: location,
        retry: retry
      }), false);
    };

    var applyTx = function applyTx(nextAction) {
      action = nextAction;

      var _getIndexAndLocation3 = getIndexAndLocation();

      index = _getIndexAndLocation3[0];
      location = _getIndexAndLocation3[1];
      listeners.call({
        action: action,
        location: location
      });
    };

    var push = function push(to, state) {
      var nextAction = PushAction;
      var nextLocation = getNextLocation(to, state);

      var retry = function retry() {
        return push(to, state);
      };

      if (allowTx(nextAction, nextLocation, retry)) {
        var _getHistoryStateAndUr = getHistoryStateAndUrl(nextLocation, index + 1),
            historyState = _getHistoryStateAndUr[0],
            url = _getHistoryStateAndUr[1]; // TODO: Support forced reloading
        // try...catch because iOS limits us to 100 pushState calls :/


        try {
          globalHistory.pushState(historyState, null, url);
        } catch (error) {
          // They are going to lose state here, but there is no real
          // way to warn them about it since the page will refresh...
          window.location.assign(url);
        }

        applyTx(nextAction);
      }
    };

    var replace = function replace(to, state) {
      var nextAction = ReplaceAction;
      var nextLocation = getNextLocation(to, state);

      var retry = function retry() {
        return replace(to, state);
      };

      if (allowTx(nextAction, nextLocation, retry)) {
        var _getHistoryStateAndUr2 = getHistoryStateAndUrl(nextLocation, index),
            historyState = _getHistoryStateAndUr2[0],
            url = _getHistoryStateAndUr2[1]; // TODO: Support forced reloading


        globalHistory.replaceState(historyState, null, url);
        applyTx(nextAction);
      }
    };

    var go = function go(n) {
      globalHistory.go(n);
    };

    var back = function back() {
      go(-1);
    };

    var forward = function forward() {
      go(1);
    };

    var listen = function listen(fn) {
      return listeners.push(fn);
    };

    var block = function block(fn) {
      var unblock = blockers.push(fn);

      if (blockers.length === 1) {
        window.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }

      return function () {
        unblock(); // Remove the beforeunload listener so the document may
        // still be salvageable in the pagehide event.
        // See https://html.spec.whatwg.org/#unloading-documents

        if (!blockers.length) {
          window.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    };

    var history = {
      get action() {
        return action;
      },

      get location() {
        return location;
      },

      createHref: createHref,
      push: push,
      replace: replace,
      go: go,
      back: back,
      forward: forward,
      listen: listen,
      block: block
    };
    return history;
  };
  /**
   * Hash history stores the location in window.location.hash. This makes
   * it ideal for situations where you don't want to send the location to
   * the server for some reason, either because you do cannot configure it
   * or the URL space is reserved for something else.
   */

  var createHashHistory = function createHashHistory(_temp3) {
    var _ref3 = _temp3 === void 0 ? {} : _temp3,
        _ref3$window = _ref3.window,
        window = _ref3$window === void 0 ? document.defaultView : _ref3$window;

    var globalHistory = window.history;

    var getIndexAndLocation = function getIndexAndLocation() {
      var _parsePath = parsePath(window.location.hash.substr(1)),
          _parsePath$pathname = _parsePath.pathname,
          pathname = _parsePath$pathname === void 0 ? '/' : _parsePath$pathname,
          _parsePath$search = _parsePath.search,
          search = _parsePath$search === void 0 ? '' : _parsePath$search,
          _parsePath$hash = _parsePath.hash,
          hash = _parsePath$hash === void 0 ? '' : _parsePath$hash;

      var state = globalHistory.state || {};
      return [state.idx, createReadOnlyObject({
        pathname: pathname,
        search: search,
        hash: hash,
        state: state.usr || null,
        key: state.key || 'default'
      })];
    };

    var blockedPopTx = null;

    var handlePop = function handlePop() {
      if (blockedPopTx) {
        blockers.call(blockedPopTx);
        blockedPopTx = null;
      } else {
        var nextAction = PopAction;

        var _getIndexAndLocation4 = getIndexAndLocation(),
            nextIndex = _getIndexAndLocation4[0],
            nextLocation = _getIndexAndLocation4[1];

        if (blockers.length) {
          if (nextIndex != null) {
            var n = index - nextIndex;

            if (n) {
              // Revert the POP
              blockedPopTx = {
                action: nextAction,
                location: nextLocation,
                retry: function retry() {
                  go(n * -1);
                }
              };
              go(n);
            }
          } else {
            // Trying to POP to a location with no index. We did not create
            // this location, so we can't effectively block the navigation.
            {
              // TODO: Write up a doc that explains our blocking strategy in
              // detail and link to it here so people can understand better
              // what is going on and how to avoid it.
              throw new Error("You are trying to block a POP navigation to a location that was not " + "created by the history library. The block will fail silently in " + "production, but in general you should do all navigation with the " + "history library (instead of using window.history.pushState directly) " + "to avoid this situation.");
            }
          }
        } else {
          applyTx(nextAction);
        }
      }
    };

    window.addEventListener(PopStateEventType, handlePop); // TODO: Is this still necessary? Which browsers do
    // not trigger popstate when the hash changes?

    window.addEventListener(HashChangeEventType, function (event) {
      var _getIndexAndLocation5 = getIndexAndLocation(),
          nextLocation = _getIndexAndLocation5[1]; // Ignore extraneous hashchange events.


      if (createPath(nextLocation) !== createPath(location)) {
        handlePop();
      }
    });
    var action = PopAction;

    var _getIndexAndLocation6 = getIndexAndLocation(),
        index = _getIndexAndLocation6[0],
        location = _getIndexAndLocation6[1];

    var blockers = createEvents();
    var listeners = createEvents();

    if (index == null) {
      index = 0;
      globalHistory.replaceState(_extends({}, globalHistory.state, {
        idx: index
      }), null);
    }

    var createHref = function createHref(location) {
      var base = document.querySelector('base');
      var href = '';

      if (base && base.getAttribute('href')) {
        var url = window.location.href;
        var hashIndex = url.indexOf('#');
        href = hashIndex === -1 ? url : url.slice(0, hashIndex);
      }

      return href + '#' + createPath(location);
    };

    var getNextLocation = function getNextLocation(to, state) {
      if (state === void 0) {
        state = null;
      }

      return createReadOnlyObject(_extends({}, location, {}, typeof to === 'string' ? parsePath(to) : to, {
        state: state,
        key: createKey()
      }));
    };

    var getHistoryStateAndUrl = function getHistoryStateAndUrl(nextLocation, index) {
      return [{
        usr: nextLocation.state,
        key: nextLocation.key,
        idx: index
      }, createHref(nextLocation)];
    };

    var allowTx = function allowTx(action, location, retry) {
      return !blockers.length || (blockers.call({
        action: action,
        location: location,
        retry: retry
      }), false);
    };

    var applyTx = function applyTx(nextAction) {
      action = nextAction;

      var _getIndexAndLocation7 = getIndexAndLocation();

      index = _getIndexAndLocation7[0];
      location = _getIndexAndLocation7[1];
      listeners.call({
        action: action,
        location: location
      });
    };

    var push = function push(to, state) {
      var nextAction = PushAction;
      var nextLocation = getNextLocation(to, state);

      var retry = function retry() {
        return push(to, state);
      };

      {
        if (nextLocation.pathname.charAt(0) !== '/') {
          var arg = JSON.stringify(to);
          throw new Error("Relative pathnames are not supported in createHashHistory().push(" + arg + ")");
        }
      }

      if (allowTx(nextAction, nextLocation, retry)) {
        var _getHistoryStateAndUr3 = getHistoryStateAndUrl(nextLocation, index + 1),
            historyState = _getHistoryStateAndUr3[0],
            url = _getHistoryStateAndUr3[1]; // TODO: Support forced reloading
        // try...catch because iOS limits us to 100 pushState calls :/


        try {
          globalHistory.pushState(historyState, null, url);
        } catch (error) {
          // They are going to lose state here, but there is no real
          // way to warn them about it since the page will refresh...
          window.location.assign(url);
        }

        applyTx(nextAction);
      }
    };

    var replace = function replace(to, state) {
      var nextAction = ReplaceAction;
      var nextLocation = getNextLocation(to, state);

      var retry = function retry() {
        return replace(to, state);
      };

      {
        if (nextLocation.pathname.charAt(0) !== '/') {
          var arg = JSON.stringify(to);
          throw new Error("Relative pathnames are not supported in createHashHistory().replace(" + arg + ")");
        }
      }

      if (allowTx(nextAction, nextLocation, retry)) {
        var _getHistoryStateAndUr4 = getHistoryStateAndUrl(nextLocation, index),
            historyState = _getHistoryStateAndUr4[0],
            url = _getHistoryStateAndUr4[1]; // TODO: Support forced reloading


        globalHistory.replaceState(historyState, null, url);
        applyTx(nextAction);
      }
    };

    var go = function go(n) {
      globalHistory.go(n);
    };

    var back = function back() {
      go(-1);
    };

    var forward = function forward() {
      go(1);
    };

    var listen = function listen(fn) {
      return listeners.push(fn);
    };

    var block = function block(fn) {
      var unblock = blockers.push(fn);

      if (blockers.length === 1) {
        window.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }

      return function () {
        unblock(); // Remove the beforeunload listener so the document may
        // still be salvageable in the pagehide event.
        // See https://html.spec.whatwg.org/#unloading-documents

        if (!blockers.length) {
          window.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    };

    var history = {
      get action() {
        return action;
      },

      get location() {
        return location;
      },

      createHref: createHref,
      push: push,
      replace: replace,
      go: go,
      back: back,
      forward: forward,
      listen: listen,
      block: block
    };
    return history;
  }; // Utils

  var promptBeforeUnload = function promptBeforeUnload(event) {
    // Cancel the event.
    event.preventDefault(); // Chrome (and legacy IE) requires returnValue to be set.

    event.returnValue = '';
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, 8);
  }; // TODO: Probably only do this in dev?


  var createReadOnlyObject = function createReadOnlyObject(props) {
    return Object.keys(props).reduce(function (obj, key) {
      return Object.defineProperty(obj, key, {
        enumerable: true,
        value: props[key]
      });
    }, Object.create(null));
  };

  var createPath = function createPath(_ref4) {
    var _ref4$pathname = _ref4.pathname,
        pathname = _ref4$pathname === void 0 ? '/' : _ref4$pathname,
        _ref4$search = _ref4.search,
        search = _ref4$search === void 0 ? '' : _ref4$search,
        _ref4$hash = _ref4.hash,
        hash = _ref4$hash === void 0 ? '' : _ref4$hash;
    return pathname + search + hash;
  };

  var parsePath = function parsePath(path) {
    var pieces = {};

    if (path) {
      var hashIndex = path.indexOf('#');

      if (hashIndex >= 0) {
        pieces.hash = path.substr(hashIndex);
        path = path.substr(0, hashIndex);
      }

      var searchIndex = path.indexOf('?');

      if (searchIndex >= 0) {
        pieces.search = path.substr(searchIndex);
        path = path.substr(0, searchIndex);
      }

      if (path) {
        pieces.pathname = path;
      }
    }

    return pieces;
  };

  var createEvents = function createEvents() {
    var handlers = [];
    return {
      get length() {
        return handlers.length;
      },

      push: function push(fn) {
        return handlers.push(fn) && function () {
          handlers = handlers.filter(function (handler) {
            return handler !== fn;
          });
        };
      },
      call: function call(arg) {
        handlers.forEach(function (fn) {
          return fn && fn(arg);
        });
      }
    };
  };

  var clamp = function clamp(n, lowerBound, upperBound) {
    return Math.min(Math.max(n, lowerBound), upperBound);
  };

  exports.createMemoryHistory = createMemoryHistory;
  exports.createBrowserHistory = createBrowserHistory;
  exports.createHashHistory = createHashHistory;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
