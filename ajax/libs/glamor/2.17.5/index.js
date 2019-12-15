(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Glamor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

!function (f) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = f();else if ("function" == typeof define && define.amd) define([], f);else {
    var g;g = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, g.CSSOps = f();
  }
}(function () {
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = "function" == typeof require && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (_dereq_, module, exports) {
      module.exports = _dereq_("react/lib/CSSPropertyOperations");
    }, { "react/lib/CSSPropertyOperations": 14 }], 2: [function (_dereq_, module, exports) {
      "use strict";
      var canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement),
          ExecutionEnvironment = { canUseDOM: canUseDOM, canUseWorkers: "undefined" != typeof Worker, canUseEventListeners: canUseDOM && !(!window.addEventListener && !window.attachEvent), canUseViewport: canUseDOM && !!window.screen, isInWorker: !canUseDOM };module.exports = ExecutionEnvironment;
    }, {}], 3: [function (_dereq_, module, exports) {
      "use strict";
      function camelize(string) {
        return string.replace(_hyphenPattern, function (_, character) {
          return character.toUpperCase();
        });
      }var _hyphenPattern = /-(.)/g;module.exports = camelize;
    }, {}], 4: [function (_dereq_, module, exports) {
      "use strict";
      function camelizeStyleName(string) {
        return camelize(string.replace(msPattern, "ms-"));
      }var camelize = _dereq_("./camelize"),
          msPattern = /^-ms-/;module.exports = camelizeStyleName;
    }, { "./camelize": 3 }], 5: [function (_dereq_, module, exports) {
      "use strict";
      function makeEmptyFunction(arg) {
        return function () {
          return arg;
        };
      }var emptyFunction = function emptyFunction() {};emptyFunction.thatReturns = makeEmptyFunction, emptyFunction.thatReturnsFalse = makeEmptyFunction(!1), emptyFunction.thatReturnsTrue = makeEmptyFunction(!0), emptyFunction.thatReturnsNull = makeEmptyFunction(null), emptyFunction.thatReturnsThis = function () {
        return this;
      }, emptyFunction.thatReturnsArgument = function (arg) {
        return arg;
      }, module.exports = emptyFunction;
    }, {}], 6: [function (_dereq_, module, exports) {
      "use strict";
      function hyphenate(string) {
        return string.replace(_uppercasePattern, "-$1").toLowerCase();
      }var _uppercasePattern = /([A-Z])/g;module.exports = hyphenate;
    }, {}], 7: [function (_dereq_, module, exports) {
      "use strict";
      function hyphenateStyleName(string) {
        return hyphenate(string).replace(msPattern, "-ms-");
      }var hyphenate = _dereq_("./hyphenate"),
          msPattern = /^ms-/;module.exports = hyphenateStyleName;
    }, { "./hyphenate": 6 }], 8: [function (_dereq_, module, exports) {
      "use strict";
      function invariant(condition, format, a, b, c, d, e, f) {
        if (!condition) {
          var error;if (void 0 === format) error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
            var args = [a, b, c, d, e, f],
                argIndex = 0;error = new Error(format.replace(/%s/g, function () {
              return args[argIndex++];
            })), error.name = "Invariant Violation";
          }throw error.framesToPop = 1, error;
        }
      }module.exports = invariant;
    }, {}], 9: [function (_dereq_, module, exports) {
      "use strict";
      function memoizeStringOnly(callback) {
        var cache = {};return function (string) {
          return cache.hasOwnProperty(string) || (cache[string] = callback.call(this, string)), cache[string];
        };
      }module.exports = memoizeStringOnly;
    }, {}], 10: [function (_dereq_, module, exports) {
      "use strict";
      var performance,
          ExecutionEnvironment = _dereq_("./ExecutionEnvironment");ExecutionEnvironment.canUseDOM && (performance = window.performance || window.msPerformance || window.webkitPerformance), module.exports = performance || {};
    }, { "./ExecutionEnvironment": 2 }], 11: [function (_dereq_, module, exports) {
      "use strict";
      var performanceNow,
          performance = _dereq_("./performance");performanceNow = performance.now ? function () {
        return performance.now();
      } : function () {
        return Date.now();
      }, module.exports = performanceNow;
    }, { "./performance": 10 }], 12: [function (_dereq_, module, exports) {
      "use strict";
      var emptyFunction = _dereq_("./emptyFunction"),
          warning = emptyFunction;module.exports = warning;
    }, { "./emptyFunction": 5 }], 13: [function (_dereq_, module, exports) {
      "use strict";
      function prefixKey(prefix, key) {
        return prefix + key.charAt(0).toUpperCase() + key.substring(1);
      }var isUnitlessNumber = { animationIterationCount: !0, borderImageOutset: !0, borderImageSlice: !0, borderImageWidth: !0, boxFlex: !0, boxFlexGroup: !0, boxOrdinalGroup: !0, columnCount: !0, flex: !0, flexGrow: !0, flexPositive: !0, flexShrink: !0, flexNegative: !0, flexOrder: !0, gridRow: !0, gridColumn: !0, fontWeight: !0, lineClamp: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, tabSize: !0, widows: !0, zIndex: !0, zoom: !0, fillOpacity: !0, floodOpacity: !0, stopOpacity: !0, strokeDasharray: !0, strokeDashoffset: !0, strokeMiterlimit: !0, strokeOpacity: !0, strokeWidth: !0 },
          prefixes = ["Webkit", "ms", "Moz", "O"];Object.keys(isUnitlessNumber).forEach(function (prop) {
        prefixes.forEach(function (prefix) {
          isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
        });
      });var shorthandPropertyExpansions = { background: { backgroundAttachment: !0, backgroundColor: !0, backgroundImage: !0, backgroundPositionX: !0, backgroundPositionY: !0, backgroundRepeat: !0 }, backgroundPosition: { backgroundPositionX: !0, backgroundPositionY: !0 }, border: { borderWidth: !0, borderStyle: !0, borderColor: !0 }, borderBottom: { borderBottomWidth: !0, borderBottomStyle: !0, borderBottomColor: !0 }, borderLeft: { borderLeftWidth: !0, borderLeftStyle: !0, borderLeftColor: !0 }, borderRight: { borderRightWidth: !0, borderRightStyle: !0, borderRightColor: !0 }, borderTop: { borderTopWidth: !0, borderTopStyle: !0, borderTopColor: !0 }, font: { fontStyle: !0, fontVariant: !0, fontWeight: !0, fontSize: !0, lineHeight: !0, fontFamily: !0 }, outline: { outlineWidth: !0, outlineStyle: !0, outlineColor: !0 } },
          CSSProperty = { isUnitlessNumber: isUnitlessNumber, shorthandPropertyExpansions: shorthandPropertyExpansions };module.exports = CSSProperty;
    }, {}], 14: [function (_dereq_, module, exports) {
      "use strict";
      var CSSProperty = _dereq_("./CSSProperty"),
          ExecutionEnvironment = _dereq_("fbjs/lib/ExecutionEnvironment"),
          dangerousStyleValue = (_dereq_("./ReactInstrumentation"), _dereq_("fbjs/lib/camelizeStyleName"), _dereq_("./dangerousStyleValue")),
          hyphenateStyleName = _dereq_("fbjs/lib/hyphenateStyleName"),
          memoizeStringOnly = _dereq_("fbjs/lib/memoizeStringOnly"),
          processStyleName = (_dereq_("fbjs/lib/warning"), memoizeStringOnly(function (styleName) {
        return hyphenateStyleName(styleName);
      })),
          hasShorthandPropertyBug = !1,
          styleFloatAccessor = "cssFloat";if (ExecutionEnvironment.canUseDOM) {
        var tempStyle = document.createElement("div").style;try {
          tempStyle.font = "";
        } catch (e) {
          hasShorthandPropertyBug = !0;
        }void 0 === document.documentElement.style.cssFloat && (styleFloatAccessor = "styleFloat");
      }var CSSPropertyOperations = { createMarkupForStyles: function createMarkupForStyles(styles, component) {
          var serialized = "";for (var styleName in styles) {
            if (styles.hasOwnProperty(styleName)) {
              var styleValue = styles[styleName];null != styleValue && (serialized += processStyleName(styleName) + ":", serialized += dangerousStyleValue(styleName, styleValue, component) + ";");
            }
          }return serialized || null;
        }, setValueForStyles: function setValueForStyles(node, styles, component) {
          var style = node.style;for (var styleName in styles) {
            if (styles.hasOwnProperty(styleName)) {
              var styleValue = dangerousStyleValue(styleName, styles[styleName], component);if ("float" !== styleName && "cssFloat" !== styleName || (styleName = styleFloatAccessor), styleValue) style[styleName] = styleValue;else {
                var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];if (expansion) for (var individualStyleName in expansion) {
                  style[individualStyleName] = "";
                } else style[styleName] = "";
              }
            }
          }
        } };module.exports = CSSPropertyOperations;
    }, { "./CSSProperty": 13, "./ReactInstrumentation": 20, "./dangerousStyleValue": 22, "fbjs/lib/ExecutionEnvironment": 2, "fbjs/lib/camelizeStyleName": 4, "fbjs/lib/hyphenateStyleName": 7, "fbjs/lib/memoizeStringOnly": 9, "fbjs/lib/warning": 12 }], 15: [function (_dereq_, module, exports) {
      "use strict";
      function handleElement(debugID, element) {
        if (null != element && void 0 !== element._shadowChildren && element._shadowChildren !== element.props.children) {
          var isMutated = !1;if (Array.isArray(element._shadowChildren)) if (element._shadowChildren.length === element.props.children.length) for (var i = 0; i < element._shadowChildren.length; i++) {
            element._shadowChildren[i] !== element.props.children[i] && (isMutated = !0);
          } else isMutated = !0;!Array.isArray(element._shadowChildren) || isMutated;
        }
      }var ReactComponentTreeHook = _dereq_("./ReactComponentTreeHook"),
          ReactChildrenMutationWarningHook = (_dereq_("fbjs/lib/warning"), { onMountComponent: function onMountComponent(debugID) {
          handleElement(debugID, ReactComponentTreeHook.getElement(debugID));
        }, onUpdateComponent: function onUpdateComponent(debugID) {
          handleElement(debugID, ReactComponentTreeHook.getElement(debugID));
        } });module.exports = ReactChildrenMutationWarningHook;
    }, { "./ReactComponentTreeHook": 16, "fbjs/lib/warning": 12 }], 16: [function (_dereq_, module, exports) {
      "use strict";
      function isNative(fn) {
        var funcToString = Function.prototype.toString,
            hasOwnProperty = Object.prototype.hasOwnProperty,
            reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");try {
          var source = funcToString.call(fn);return reIsNative.test(source);
        } catch (err) {
          return !1;
        }
      }function getKeyFromID(id) {
        return "." + id;
      }function getIDFromKey(key) {
        return parseInt(key.substr(1), 10);
      }function get(id) {
        if (canUseCollections) return itemMap.get(id);var key = getKeyFromID(id);return itemByKey[key];
      }function remove(id) {
        if (canUseCollections) itemMap.delete(id);else {
          var key = getKeyFromID(id);delete itemByKey[key];
        }
      }function create(id, element, parentID) {
        var item = { element: element, parentID: parentID, text: null, childIDs: [], isMounted: !1, updateCount: 0 };if (canUseCollections) itemMap.set(id, item);else {
          var key = getKeyFromID(id);itemByKey[key] = item;
        }
      }function addRoot(id) {
        if (canUseCollections) rootIDSet.add(id);else {
          var key = getKeyFromID(id);rootByKey[key] = !0;
        }
      }function removeRoot(id) {
        if (canUseCollections) rootIDSet.delete(id);else {
          var key = getKeyFromID(id);delete rootByKey[key];
        }
      }function getRegisteredIDs() {
        return canUseCollections ? Array.from(itemMap.keys()) : Object.keys(itemByKey).map(getIDFromKey);
      }function getRootIDs() {
        return canUseCollections ? Array.from(rootIDSet.keys()) : Object.keys(rootByKey).map(getIDFromKey);
      }function purgeDeep(id) {
        var item = get(id);if (item) {
          var childIDs = item.childIDs;remove(id), childIDs.forEach(purgeDeep);
        }
      }function describeComponentFrame(name, source, ownerName) {
        return "\n    in " + name + (source ? " (at " + source.fileName.replace(/^.*[\\\/]/, "") + ":" + source.lineNumber + ")" : ownerName ? " (created by " + ownerName + ")" : "");
      }function _getDisplayName(element) {
        return null == element ? "#empty" : "string" == typeof element || "number" == typeof element ? "#text" : "string" == typeof element.type ? element.type : element.type.displayName || element.type.name || "Unknown";
      }function describeID(id) {
        var ownerName,
            name = ReactComponentTreeHook.getDisplayName(id),
            element = ReactComponentTreeHook.getElement(id),
            ownerID = ReactComponentTreeHook.getOwnerID(id);return ownerID && (ownerName = ReactComponentTreeHook.getDisplayName(ownerID)), describeComponentFrame(name, element && element._source, ownerName);
      }var itemMap,
          rootIDSet,
          itemByKey,
          rootByKey,
          _prodInvariant = _dereq_("./reactProdInvariant"),
          ReactCurrentOwner = _dereq_("./ReactCurrentOwner"),
          canUseCollections = (_dereq_("fbjs/lib/invariant"), _dereq_("fbjs/lib/warning"), "function" == typeof Array.from && "function" == typeof Map && isNative(Map) && null != Map.prototype && "function" == typeof Map.prototype.keys && isNative(Map.prototype.keys) && "function" == typeof Set && isNative(Set) && null != Set.prototype && "function" == typeof Set.prototype.keys && isNative(Set.prototype.keys));canUseCollections ? (itemMap = new Map(), rootIDSet = new Set()) : (itemByKey = {}, rootByKey = {});var unmountedIDs = [],
          ReactComponentTreeHook = { onSetChildren: function onSetChildren(id, nextChildIDs) {
          var item = get(id);item.childIDs = nextChildIDs;for (var i = 0; i < nextChildIDs.length; i++) {
            var nextChildID = nextChildIDs[i],
                nextChild = get(nextChildID);nextChild ? void 0 : _prodInvariant("140"), null == nextChild.childIDs && "object" == _typeof(nextChild.element) && null != nextChild.element ? _prodInvariant("141") : void 0, nextChild.isMounted ? void 0 : _prodInvariant("71"), null == nextChild.parentID && (nextChild.parentID = id), nextChild.parentID !== id ? _prodInvariant("142", nextChildID, nextChild.parentID, id) : void 0;
          }
        }, onBeforeMountComponent: function onBeforeMountComponent(id, element, parentID) {
          create(id, element, parentID);
        }, onBeforeUpdateComponent: function onBeforeUpdateComponent(id, element) {
          var item = get(id);item && item.isMounted && (item.element = element);
        }, onMountComponent: function onMountComponent(id) {
          var item = get(id);item.isMounted = !0;var isRoot = 0 === item.parentID;isRoot && addRoot(id);
        }, onUpdateComponent: function onUpdateComponent(id) {
          var item = get(id);item && item.isMounted && item.updateCount++;
        }, onUnmountComponent: function onUnmountComponent(id) {
          var item = get(id);if (item) {
            item.isMounted = !1;var isRoot = 0 === item.parentID;isRoot && removeRoot(id);
          }unmountedIDs.push(id);
        }, purgeUnmountedComponents: function purgeUnmountedComponents() {
          if (!ReactComponentTreeHook._preventPurging) {
            for (var i = 0; i < unmountedIDs.length; i++) {
              var id = unmountedIDs[i];purgeDeep(id);
            }unmountedIDs.length = 0;
          }
        }, isMounted: function isMounted(id) {
          var item = get(id);return !!item && item.isMounted;
        }, getCurrentStackAddendum: function getCurrentStackAddendum(topElement) {
          var info = "";if (topElement) {
            var type = topElement.type,
                name = "function" == typeof type ? type.displayName || type.name : type,
                owner = topElement._owner;info += describeComponentFrame(name || "Unknown", topElement._source, owner && owner.getName());
          }var currentOwner = ReactCurrentOwner.current,
              id = currentOwner && currentOwner._debugID;return info += ReactComponentTreeHook.getStackAddendumByID(id);
        }, getStackAddendumByID: function getStackAddendumByID(id) {
          for (var info = ""; id;) {
            info += describeID(id), id = ReactComponentTreeHook.getParentID(id);
          }return info;
        }, getChildIDs: function getChildIDs(id) {
          var item = get(id);return item ? item.childIDs : [];
        }, getDisplayName: function getDisplayName(id) {
          var element = ReactComponentTreeHook.getElement(id);return element ? _getDisplayName(element) : null;
        }, getElement: function getElement(id) {
          var item = get(id);return item ? item.element : null;
        }, getOwnerID: function getOwnerID(id) {
          var element = ReactComponentTreeHook.getElement(id);return element && element._owner ? element._owner._debugID : null;
        }, getParentID: function getParentID(id) {
          var item = get(id);return item ? item.parentID : null;
        }, getSource: function getSource(id) {
          var item = get(id),
              element = item ? item.element : null,
              source = null != element ? element._source : null;return source;
        }, getText: function getText(id) {
          var element = ReactComponentTreeHook.getElement(id);return "string" == typeof element ? element : "number" == typeof element ? "" + element : null;
        }, getUpdateCount: function getUpdateCount(id) {
          var item = get(id);return item ? item.updateCount : 0;
        }, getRegisteredIDs: getRegisteredIDs, getRootIDs: getRootIDs };module.exports = ReactComponentTreeHook;
    }, { "./ReactCurrentOwner": 17, "./reactProdInvariant": 23, "fbjs/lib/invariant": 8, "fbjs/lib/warning": 12 }], 17: [function (_dereq_, module, exports) {
      "use strict";
      var ReactCurrentOwner = { current: null };module.exports = ReactCurrentOwner;
    }, {}], 18: [function (_dereq_, module, exports) {
      "use strict";
      function callHook(event, fn, context, arg1, arg2, arg3, arg4, arg5) {
        try {
          fn.call(context, arg1, arg2, arg3, arg4, arg5);
        } catch (e) {
          didHookThrowForEvent[event] = !0;
        }
      }function emitEvent(event, arg1, arg2, arg3, arg4, arg5) {
        for (var i = 0; i < hooks.length; i++) {
          var hook = hooks[i],
              fn = hook[event];fn && callHook(event, fn, hook, arg1, arg2, arg3, arg4, arg5);
        }
      }function clearHistory() {
        ReactComponentTreeHook.purgeUnmountedComponents(), ReactHostOperationHistoryHook.clearHistory();
      }function getTreeSnapshot(registeredIDs) {
        return registeredIDs.reduce(function (tree, id) {
          var ownerID = ReactComponentTreeHook.getOwnerID(id),
              parentID = ReactComponentTreeHook.getParentID(id);return tree[id] = { displayName: ReactComponentTreeHook.getDisplayName(id), text: ReactComponentTreeHook.getText(id), updateCount: ReactComponentTreeHook.getUpdateCount(id), childIDs: ReactComponentTreeHook.getChildIDs(id), ownerID: ownerID || ReactComponentTreeHook.getOwnerID(parentID), parentID: parentID }, tree;
        }, {});
      }function resetMeasurements() {
        var previousStartTime = currentFlushStartTime,
            previousMeasurements = currentFlushMeasurements || [],
            previousOperations = ReactHostOperationHistoryHook.getHistory();if (0 === currentFlushNesting) return currentFlushStartTime = null, currentFlushMeasurements = null, void clearHistory();if (previousMeasurements.length || previousOperations.length) {
          var registeredIDs = ReactComponentTreeHook.getRegisteredIDs();flushHistory.push({ duration: performanceNow() - previousStartTime, measurements: previousMeasurements || [], operations: previousOperations || [], treeSnapshot: getTreeSnapshot(registeredIDs) });
        }clearHistory(), currentFlushStartTime = performanceNow(), currentFlushMeasurements = [];
      }function checkDebugID(debugID) {
        var allowRoot = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
      }function beginLifeCycleTimer(debugID, timerType) {
        0 !== currentFlushNesting && (currentTimerType && !lifeCycleTimerHasWarned && (lifeCycleTimerHasWarned = !0), currentTimerStartTime = performanceNow(), currentTimerNestedFlushDuration = 0, currentTimerDebugID = debugID, currentTimerType = timerType);
      }function endLifeCycleTimer(debugID, timerType) {
        0 !== currentFlushNesting && (currentTimerType === timerType || lifeCycleTimerHasWarned || (lifeCycleTimerHasWarned = !0), _isProfiling && currentFlushMeasurements.push({ timerType: timerType, instanceID: debugID, duration: performanceNow() - currentTimerStartTime - currentTimerNestedFlushDuration }), currentTimerStartTime = null, currentTimerNestedFlushDuration = null, currentTimerDebugID = null, currentTimerType = null);
      }function pauseCurrentLifeCycleTimer() {
        var currentTimer = { startTime: currentTimerStartTime, nestedFlushStartTime: performanceNow(), debugID: currentTimerDebugID, timerType: currentTimerType };lifeCycleTimerStack.push(currentTimer), currentTimerStartTime = null, currentTimerNestedFlushDuration = null, currentTimerDebugID = null, currentTimerType = null;
      }function resumeCurrentLifeCycleTimer() {
        var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop(),
            startTime = _lifeCycleTimerStack$.startTime,
            nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime,
            debugID = _lifeCycleTimerStack$.debugID,
            timerType = _lifeCycleTimerStack$.timerType,
            nestedFlushDuration = performanceNow() - nestedFlushStartTime;currentTimerStartTime = startTime, currentTimerNestedFlushDuration += nestedFlushDuration, currentTimerDebugID = debugID, currentTimerType = timerType;
      }var ReactInvalidSetStateWarningHook = _dereq_("./ReactInvalidSetStateWarningHook"),
          ReactHostOperationHistoryHook = _dereq_("./ReactHostOperationHistoryHook"),
          ReactComponentTreeHook = _dereq_("./ReactComponentTreeHook"),
          ReactChildrenMutationWarningHook = _dereq_("./ReactChildrenMutationWarningHook"),
          ExecutionEnvironment = _dereq_("fbjs/lib/ExecutionEnvironment"),
          performanceNow = _dereq_("fbjs/lib/performanceNow"),
          hooks = (_dereq_("fbjs/lib/warning"), []),
          didHookThrowForEvent = {},
          _isProfiling = !1,
          flushHistory = [],
          lifeCycleTimerStack = [],
          currentFlushNesting = 0,
          currentFlushMeasurements = null,
          currentFlushStartTime = null,
          currentTimerDebugID = null,
          currentTimerStartTime = null,
          currentTimerNestedFlushDuration = null,
          currentTimerType = null,
          lifeCycleTimerHasWarned = !1,
          ReactDebugTool = { addHook: function addHook(hook) {
          hooks.push(hook);
        }, removeHook: function removeHook(hook) {
          for (var i = 0; i < hooks.length; i++) {
            hooks[i] === hook && (hooks.splice(i, 1), i--);
          }
        }, isProfiling: function isProfiling() {
          return _isProfiling;
        }, beginProfiling: function beginProfiling() {
          _isProfiling || (_isProfiling = !0, flushHistory.length = 0, resetMeasurements(), ReactDebugTool.addHook(ReactHostOperationHistoryHook));
        }, endProfiling: function endProfiling() {
          _isProfiling && (_isProfiling = !1, resetMeasurements(), ReactDebugTool.removeHook(ReactHostOperationHistoryHook));
        }, getFlushHistory: function getFlushHistory() {
          return flushHistory;
        }, onBeginFlush: function onBeginFlush() {
          currentFlushNesting++, resetMeasurements(), pauseCurrentLifeCycleTimer(), emitEvent("onBeginFlush");
        }, onEndFlush: function onEndFlush() {
          resetMeasurements(), currentFlushNesting--, resumeCurrentLifeCycleTimer(), emitEvent("onEndFlush");
        }, onBeginLifeCycleTimer: function onBeginLifeCycleTimer(debugID, timerType) {
          checkDebugID(debugID), emitEvent("onBeginLifeCycleTimer", debugID, timerType), beginLifeCycleTimer(debugID, timerType);
        }, onEndLifeCycleTimer: function onEndLifeCycleTimer(debugID, timerType) {
          checkDebugID(debugID), endLifeCycleTimer(debugID, timerType), emitEvent("onEndLifeCycleTimer", debugID, timerType);
        }, onBeginProcessingChildContext: function onBeginProcessingChildContext() {
          emitEvent("onBeginProcessingChildContext");
        }, onEndProcessingChildContext: function onEndProcessingChildContext() {
          emitEvent("onEndProcessingChildContext");
        }, onHostOperation: function onHostOperation(debugID, type, payload) {
          checkDebugID(debugID), emitEvent("onHostOperation", debugID, type, payload);
        }, onSetState: function onSetState() {
          emitEvent("onSetState");
        }, onSetChildren: function onSetChildren(debugID, childDebugIDs) {
          checkDebugID(debugID), childDebugIDs.forEach(checkDebugID), emitEvent("onSetChildren", debugID, childDebugIDs);
        }, onBeforeMountComponent: function onBeforeMountComponent(debugID, element, parentDebugID) {
          checkDebugID(debugID), checkDebugID(parentDebugID, !0), emitEvent("onBeforeMountComponent", debugID, element, parentDebugID);
        }, onMountComponent: function onMountComponent(debugID) {
          checkDebugID(debugID), emitEvent("onMountComponent", debugID);
        }, onBeforeUpdateComponent: function onBeforeUpdateComponent(debugID, element) {
          checkDebugID(debugID), emitEvent("onBeforeUpdateComponent", debugID, element);
        }, onUpdateComponent: function onUpdateComponent(debugID) {
          checkDebugID(debugID), emitEvent("onUpdateComponent", debugID);
        }, onBeforeUnmountComponent: function onBeforeUnmountComponent(debugID) {
          checkDebugID(debugID), emitEvent("onBeforeUnmountComponent", debugID);
        }, onUnmountComponent: function onUnmountComponent(debugID) {
          checkDebugID(debugID), emitEvent("onUnmountComponent", debugID);
        }, onTestEvent: function onTestEvent() {
          emitEvent("onTestEvent");
        } };ReactDebugTool.addDevtool = ReactDebugTool.addHook, ReactDebugTool.removeDevtool = ReactDebugTool.removeHook, ReactDebugTool.addHook(ReactInvalidSetStateWarningHook), ReactDebugTool.addHook(ReactComponentTreeHook), ReactDebugTool.addHook(ReactChildrenMutationWarningHook);var url = ExecutionEnvironment.canUseDOM && window.location.href || "";/[?&]react_perf\b/.test(url) && ReactDebugTool.beginProfiling(), module.exports = ReactDebugTool;
    }, { "./ReactChildrenMutationWarningHook": 15, "./ReactComponentTreeHook": 16, "./ReactHostOperationHistoryHook": 19, "./ReactInvalidSetStateWarningHook": 21, "fbjs/lib/ExecutionEnvironment": 2, "fbjs/lib/performanceNow": 11, "fbjs/lib/warning": 12 }], 19: [function (_dereq_, module, exports) {
      "use strict";
      var history = [],
          ReactHostOperationHistoryHook = { onHostOperation: function onHostOperation(debugID, type, payload) {
          history.push({ instanceID: debugID, type: type, payload: payload });
        }, clearHistory: function clearHistory() {
          ReactHostOperationHistoryHook._preventClearing || (history = []);
        }, getHistory: function getHistory() {
          return history;
        } };module.exports = ReactHostOperationHistoryHook;
    }, {}], 20: [function (_dereq_, module, exports) {
      "use strict";
      var debugTool = null;module.exports = { debugTool: debugTool };
    }, { "./ReactDebugTool": 18 }], 21: [function (_dereq_, module, exports) {
      "use strict";
      var processingChildContext,
          warnInvalidSetState,
          ReactInvalidSetStateWarningHook = (_dereq_("fbjs/lib/warning"), { onBeginProcessingChildContext: function onBeginProcessingChildContext() {
          processingChildContext = !0;
        }, onEndProcessingChildContext: function onEndProcessingChildContext() {
          processingChildContext = !1;
        }, onSetState: function onSetState() {
          warnInvalidSetState();
        } });module.exports = ReactInvalidSetStateWarningHook;
    }, { "fbjs/lib/warning": 12 }], 22: [function (_dereq_, module, exports) {
      "use strict";
      function dangerousStyleValue(name, value, component) {
        var isEmpty = null == value || "boolean" == typeof value || "" === value;if (isEmpty) return "";var isNonNumeric = isNaN(value);if (isNonNumeric || 0 === value || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) return "" + value;if ("string" == typeof value) {
          value = value.trim();
        }return value + "px";
      }var CSSProperty = _dereq_("./CSSProperty"),
          isUnitlessNumber = (_dereq_("fbjs/lib/warning"), CSSProperty.isUnitlessNumber);module.exports = dangerousStyleValue;
    }, { "./CSSProperty": 13, "fbjs/lib/warning": 12 }], 23: [function (_dereq_, module, exports) {
      "use strict";
      function reactProdInvariant(code) {
        for (var argCount = arguments.length - 1, message = "Minified React error #" + code + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" + code, argIdx = 0; argIdx < argCount; argIdx++) {
          message += "&args[]=" + encodeURIComponent(arguments[argIdx + 1]);
        }message += " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var error = new Error(message);throw error.name = "Invariant Violation", error.framesToPop = 1, error;
      }module.exports = reactProdInvariant;
    }, {}] }, {}, [1])(1);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// forked from https://www.npmjs.com/package/auto-prefixer

function capitalize(str) {
  return str && str.charAt(0).toUpperCase() + str.substring(1);
}

function includes(obj, search) {
  if (typeof obj === 'number') {
    obj = obj.toString();
  }
  return obj.indexOf(search) !== -1;
}

function values(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
}

var webkitPrefix = 'Webkit';
var mozPrefix = 'Moz';
var msPrefix = 'ms';
var oPrefix = 'o';

var webkit = [webkitPrefix];
var webkitO = [webkitPrefix, oPrefix];
var moz = [mozPrefix];
var ms = [msPrefix];

var webkitMoz = [webkitPrefix, mozPrefix];
var webkitMozO = [webkitPrefix, mozPrefix, oPrefix];
var webkitMozMs = [webkitPrefix, mozPrefix, msPrefix];
var webkitMs = [webkitPrefix, msPrefix];
var allPrefixes = [webkitPrefix, msPrefix, mozPrefix, oPrefix];

var neededRules = {
  alignContent: webkit,
  alignItems: webkit,
  alignSelf: webkit,
  animation: webkitMoz,
  animationDelay: webkitMoz,
  animationDirection: webkitMoz,
  animationDuration: webkitMoz,
  animationFillMode: webkitMoz,
  animationIterationCount: webkitMoz,
  animationName: webkitMoz,
  animationPlayState: webkitMoz,
  animationTimingFunction: webkitMoz,
  appearance: webkitMoz,
  backfaceVisibility: webkitMoz,
  backgroundClip: webkit,
  borderImage: webkitMozO,
  borderImageSlice: webkitMozO,
  boxShadow: webkitMozMs,
  boxSizing: webkitMoz,
  clipPath: webkit,
  columns: webkitMoz,
  cursor: webkitMoz,
  flex: webkitMs, //new flex and 2012 specification , no support for old specification
  flexBasis: webkitMs,
  flexDirection: webkitMs,
  flexFlow: webkitMs,
  flexGrow: webkitMs,
  flexShrink: webkitMs,
  flexWrap: webkitMs,
  fontSmoothing: webkitMoz,
  justifyContent: webkitMoz,
  order: webkitMoz,
  perspective: webkitMoz,
  perspectiveOrigin: webkitMoz,
  transform: webkitMozMs,
  transformOrigin: webkitMozMs,
  transformOriginX: webkitMozMs,
  transformOriginY: webkitMozMs,
  transformOriginZ: webkitMozMs,
  transformStyle: webkitMozMs,
  transition: webkitMozMs,
  transitionDelay: webkitMozMs,
  transitionDuration: webkitMozMs,
  transitionProperty: webkitMozMs,
  transitionTimingFunction: webkitMozMs,
  userSelect: webkitMozMs
};

var neededCssValues = {
  calc: webkitMoz,
  flex: webkitMs
};

var clientPrefix = function () {
  if (typeof navigator === 'undefined') {
    //in server rendering
    return allPrefixes; //also default when not passing true to 'all vendors' explicitly
  }
  var sUsrAg = navigator.userAgent;

  if (includes(sUsrAg, 'Chrome')) {
    return webkit;
  } else if (includes(sUsrAg, 'Safari')) {
    return webkit;
  } else if (includes(sUsrAg, 'Opera')) {
    return webkitO;
  } else if (includes(sUsrAg, 'Firefox')) {
    return moz;
  } else if (includes(sUsrAg, 'MSIE')) {
    return ms;
  }

  return [];
}();

function checkAndAddPrefix(styleObj, key, val, allVendors) {
  var oldFlex = true;

  function valueWithPrefix(cssVal, prefix) {
    return includes(val, cssVal) && (allVendors || includes(clientPrefix, prefix)) ? val.replace(cssVal, ['', prefix.toLowerCase(), cssVal].join('-')) : null;
    //example return -> 'transition: -webkit-transition'
  }

  function createObjectOfValuesWithPrefixes(cssVal) {
    return neededCssValues[cssVal].reduce(function (o, v) {
      o[v.toLowerCase()] = valueWithPrefix(cssVal, v);
      return o;
    }, {});
    //example return -> {webkit: -webkit-calc(10% - 1px), moz: -moz-calc(10% - 1px)}
  }

  function composePrefixedValues(objOfPrefixedValues) {
    var composed = values(objOfPrefixedValues).filter(function (str) {
      return str !== null;
    }).map(function (str) {
      return key + ':' + str;
    }).join(';');

    if (composed) {
      styleObj[key] = styleObj[key] + ';' + composed;
    }
    //example do -> {display: "flex;display:-webkit-flex;display:-ms-flexbox"}
  }

  function valWithoutFlex() {
    return val.replace('flex-', '').toLowerCase();
  }

  if (val === 'flex' && key === 'display') {

    var flex = createObjectOfValuesWithPrefixes('flex');
    if (flex.ms) {
      flex.ms = flex.ms.replace('flex', 'flexbox');
    } //special case

    composePrefixedValues(flex);
    //if(oldFlex){styleObj[key] = styleObj[key] + ';display:-webkit-box'; }
    if (oldFlex) {
      styleObj[key] = '-webkit-box;display:' + styleObj[key];
    }

    //display:flex is simple case, no need for other checks
    return styleObj;
  }

  var allPrefixedCssValues = Object.keys(neededCssValues).filter(function (c) {
    return c !== 'flex';
  }).reduce(function (o, c) {
    o[c] = createObjectOfValuesWithPrefixes(c);
    return o;
  }, {});
  /*
   example allPrefixedCssValues = {
   calc: {
   webkit: "translateX(-webkit-calc(10% - 10px))",
   moz: "translateX(-moz-calc(10% - 10px))"
   },
   flex: {
   ms: null,
   webkit: null
   }
   };*/

  //if(includes(val, 'gradient')){
  //
  //}

  if (neededRules[key]) {

    var prefixes = allVendors ? neededRules[key] : neededRules[key].filter(function (vendor) {
      return includes(clientPrefix, vendor);
    });

    var prefixedProperties = prefixes.reduce(function (obj, prefix) {
      var property = val;

      //add valueWithPrefixes in their position and null the property
      Object.keys(allPrefixedCssValues).forEach(function (cssKey) {
        var cssVal = allPrefixedCssValues[cssKey];
        Object.keys(cssVal).forEach(function (vendor) {
          if (cssVal[vendor] && capitalize(prefix) === capitalize(vendor)) {
            property = cssVal[vendor];
            cssVal[vendor] = null;
          }
        });
      });

      obj[prefix + capitalize(key)] = property;
      return obj;
    }, {});

    if (oldFlex) {
      switch (key) {
        case 'flexDirection':
          if (includes(val, 'reverse')) {
            prefixedProperties.WebkitBoxDirection = 'reverse';
          } else {
            prefixedProperties.WebkitBoxDirection = 'normal';
          }
          if (includes(val, 'row')) {
            prefixedProperties.WebkitBoxOrient = prefixedProperties.boxOrient = 'horizontal';
          } else if (includes(val, 'column')) {
            prefixedProperties.WebkitBoxOrient = 'vertical';
          }
          break;
        case 'alignSelf':
          prefixedProperties.msFlexItemAlign = valWithoutFlex();break;
        case 'alignItems':
          prefixedProperties.WebkitBoxAlign = prefixedProperties.msFlexAlign = valWithoutFlex();break;
        case 'alignContent':
          if (val === 'spaceAround') {
            prefixedProperties.msFlexLinePack = 'distribute';
          } else if (val === 'spaceBetween') {
            prefixedProperties.msFlexLinePack = 'justify';
          } else {
            prefixedProperties.msFlexLinePack = valWithoutFlex();
          }
          break;
        case 'justifyContent':
          if (val === 'spaceAround') {
            prefixedProperties.msFlexPack = 'distribute';
          } else if (val === 'spaceBetween') {
            prefixedProperties.WebkitBoxPack = prefixedProperties.msFlexPack = 'justify';
          } else {
            prefixedProperties.WebkitBoxPack = prefixedProperties.msFlexPack = valWithoutFlex();
          }
          break;
        case 'flexBasis':
          prefixedProperties.msFlexPreferredSize = val;break;
        case 'order':
          prefixedProperties.msFlexOrder = '-moz-calc(' + val + ')'; //ugly hack to prevent react from adding 'px'
          prefixedProperties.WebkitBoxOrdinalGroup = '-webkit-calc(' + (parseInt(val) + 1) + ')'; //this might not work for browsers who don't support calc
          break;
        case 'flexGrow':
          prefixedProperties.WebkitBoxFlex = prefixedProperties.msFlexPositive = val;break;
        case 'flexShrink':
          prefixedProperties.msFlexNegative = val;break;
        case 'flex':
          prefixedProperties.WebkitBoxFlex = val;break;
      }
    }

    Object.assign(styleObj, prefixedProperties);
  }

  //if valueWithPrefixes were not added before
  Object.keys(allPrefixedCssValues).forEach(function (cssKey) {
    composePrefixedValues(allPrefixedCssValues[cssKey]);
  });
  return styleObj;
}

function autoPrefixer(obj, allVendors) {
  Object.keys(obj).forEach(function (key) {
    return obj = checkAndAddPrefix(_extends({}, obj), key, obj[key], allVendors);
  });
  return obj;
}

function gate(objOrBool) {
  var optionalBoolean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


  if (typeof objOrBool === 'boolean') {
    return function (obj) {
      return autoPrefixer(obj, objOrBool);
    };
  }
  if (!objOrBool) {
    return {};
  } else {
    return autoPrefixer(objOrBool, optionalBoolean);
  } // default: don't include all browsers
}

var isBrowser = typeof window !== 'undefined';
var autoprefix = exports.autoprefix = gate(!isBrowser);

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = clean;
// Returns true for null, false, undefined and {}
function isFalsy(value) {
  return value === null || value === undefined || value === false || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0;
}

function cleanObject(object) {
  if (isFalsy(object)) return null;
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return object;

  var acc = {},
      keys = Object.keys(object),
      hasFalsy = false;
  for (var i = 0; i < keys.length; i++) {
    var value = object[keys[i]];
    var filteredValue = clean(value);
    if (filteredValue === null || filteredValue !== value) {
      hasFalsy = true;
    }
    if (filteredValue !== null) {
      acc[keys[i]] = filteredValue;
    }
  }
  return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object;
}

function cleanArray(rules) {
  var hasFalsy = false;
  var filtered = [];
  rules.forEach(function (rule) {
    var filteredRule = clean(rule);
    if (filteredRule === null || filteredRule !== rule) {
      hasFalsy = true;
    }
    if (filteredRule !== null) {
      filtered.push(filteredRule);
    }
  });
  return filtered.length == 0 ? null : hasFalsy ? filtered : rules;
}

// Takes style array or object provided by user and clears all the falsy data 
// If there is no styles left after filtration returns null
function clean(input) {
  return Array.isArray(input) ? cleanArray(input) : cleanObject(input);
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doHash;
// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presets = exports.compose = exports.$ = exports.plugins = exports.styleSheet = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.speedy = speedy;
exports.simulations = simulations;
exports.simulate = simulate;
exports.cssLabels = cssLabels;
exports.isLikeRule = isLikeRule;
exports.idFor = idFor;
exports.insertRule = insertRule;
exports.insertGlobal = insertGlobal;
exports.rehydrate = rehydrate;
exports.flush = flush;
exports.style = style;
exports.select = select;
exports.parent = parent;
exports.merge = merge;
exports.media = media;
exports.trackMediaQueryLabels = trackMediaQueryLabels;
exports.pseudo = pseudo;
exports.active = active;
exports.any = any;
exports.checked = checked;
exports.disabled = disabled;
exports.empty = empty;
exports.enabled = enabled;
exports._default = _default;
exports.first = first;
exports.firstChild = firstChild;
exports.firstOfType = firstOfType;
exports.fullscreen = fullscreen;
exports.focus = focus;
exports.hover = hover;
exports.indeterminate = indeterminate;
exports.inRange = inRange;
exports.invalid = invalid;
exports.lastChild = lastChild;
exports.lastOfType = lastOfType;
exports.left = left;
exports.link = link;
exports.onlyChild = onlyChild;
exports.onlyOfType = onlyOfType;
exports.optional = optional;
exports.outOfRange = outOfRange;
exports.readOnly = readOnly;
exports.readWrite = readWrite;
exports.required = required;
exports.right = right;
exports.root = root;
exports.scope = scope;
exports.target = target;
exports.valid = valid;
exports.visited = visited;
exports.dir = dir;
exports.lang = lang;
exports.not = not;
exports.nthChild = nthChild;
exports.nthLastChild = nthLastChild;
exports.nthLastOfType = nthLastOfType;
exports.nthOfType = nthOfType;
exports.after = after;
exports.before = before;
exports.firstLetter = firstLetter;
exports.firstLine = firstLine;
exports.selection = selection;
exports.backdrop = backdrop;
exports.placeholder = placeholder;
exports.keyframes = keyframes;
exports.fontFace = fontFace;
exports.cssFor = cssFor;
exports.attribsFor = attribsFor;

var _sheet = require('./sheet.js');

var _CSSPropertyOperations = require('./CSSPropertyOperations');

var _clean = require('./clean.js');

var _clean2 = _interopRequireDefault(_clean);

var _plugins = require('./plugins');

var _hash = require('./hash');

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**** stylesheet  ****/

var styleSheet = exports.styleSheet = new _sheet.StyleSheet();
// an isomorphic StyleSheet shim. hides all the nitty gritty. 

// /**************** LIFTOFF IN 3... 2... 1... ****************/
styleSheet.inject(); //eslint-disable-line indent
// /****************      TO THE MOOOOOOON     ****************/

// convenience function to toggle speedy
function speedy(bool) {
  return styleSheet.speedy(bool);
}

// plugins 
// we include these by default 
var plugins = exports.plugins = styleSheet.plugins = new _plugins.PluginSet(_plugins.fallbacks, _plugins.bug20fix, _plugins.prefixes);
plugins.media = new _plugins.PluginSet(); // neat! media, font-face, keyframes
plugins.fontFace = new _plugins.PluginSet();
plugins.keyframes = new _plugins.PluginSet(_plugins.prefixes);

// define some constants 
var isBrowser = typeof window !== 'undefined';
var isDev = function (x) {
  return x === 'development' || !x;
}("production");
var isTest = "production" === 'test';

/**** simulations  ****/

// a flag to enable simulation meta tags on dom nodes 
// defaults to true in dev mode. recommend *not* to 
// toggle often. 
var canSimulate = isDev;

// we use these flags for issuing warnings when simulate is called 
// in prod / in incorrect order 
var warned1 = false,
    warned2 = false;

// toggles simulation activity. shouldn't be needed in most cases 
function simulations() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  canSimulate = !!bool;
}

// use this on dom nodes to 'simulate' pseudoclasses
// <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
// you can even send in some weird ones, as long as it's in simple format 
// and matches an existing rule on the element 
// eg simulate('nthChild2', ':hover:active') etc 
function simulate() {
  for (var _len = arguments.length, pseudos = Array(_len), _key = 0; _key < _len; _key++) {
    pseudos[_key] = arguments[_key];
  }

  pseudos = (0, _clean2.default)(pseudos);
  if (!pseudos) return {};
  if (!canSimulate) {
    if (!warned1) {
      console.warn('can\'t simulate without once calling simulations(true)'); //eslint-disable-line no-console
      warned1 = true;
    }
    if (!isDev && !isTest && !warned2) {
      console.warn('don\'t use simulation outside dev'); //eslint-disable-line no-console
      warned2 = true;
    }
    return {};
  }
  return pseudos.reduce(function (o, p) {
    return o['data-simulate-' + simple(p)] = '', o;
  }, {});
}

/**** labels ****/
// toggle for debug labels. 
// *shouldn't* have to mess with this manually
var hasLabels = isDev;

function cssLabels(bool) {
  hasLabels = !!bool;
}

// takes a string, converts to lowercase, strips out nonalphanumeric.
function simple(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// flatten a nested array 
function flatten(inArr) {
  var arr = [];
  for (var i = 0; i < inArr.length; i++) {
    if (Array.isArray(inArr[i])) arr = arr.concat(flatten(inArr[i]));else arr = arr.concat(inArr[i]);
  }
  return arr;
}

// hashes a string to something 'unique'
// we use this to generate ids for styles


function hashify() {
  for (var _len2 = arguments.length, objs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    objs[_key2] = arguments[_key2];
  }

  return (0, _hash2.default)(objs.map(function (x) {
    return JSON.stringify(x);
  }).join('')).toString(36);
}

// of shape { 'data-css-<id>': ''}
function isLikeRule(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) {
    return false;
  }
  return !!/data\-css\-([a-zA-Z0-9]+)/.exec(keys[0]);
}

// extracts id from a { 'data-css-<id>': ''} like object 
function idFor(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) throw new Error('not a rule');
  var regex = /data\-css\-([a-zA-Z0-9]+)/;
  var match = regex.exec(keys[0]);
  if (!match) throw new Error('not a rule');
  return match[1];
}

// a simple cache to store generated rules 
var registered = styleSheet.registered = {};
function register(spec) {
  if (!registered[spec.id]) {
    registered[spec.id] = spec;
  }
}

// semi-deeply merge 2 'mega' style objects 
function deepMergeStyles(dest, src) {
  Object.keys(src).forEach(function (expr) {
    dest[expr] = dest[expr] || {};
    Object.keys(src[expr]).forEach(function (type) {
      dest[expr][type] = dest[expr][type] || {};
      Object.assign(dest[expr][type], src[expr][type]);
    });
  });
}

//todo - prevent nested media queries
function deconstruct(obj) {
  var ret = [];
  var plain = {},
      hasPlain = false;
  var hasPseudos = obj && find(Object.keys(obj), function (x) {
    return x.charAt(0) === ':';
  });
  var hasMedias = obj && find(Object.keys(obj), function (x) {
    return x.charAt(0) === '@';
  }); // todo - check @media

  if (hasPseudos || hasMedias) {

    Object.keys(obj).forEach(function (key) {
      if (key.charAt(0) === ':') {
        ret.push({
          type: 'pseudo',
          style: obj[key],
          selector: key
        });
      } else if (key.charAt(0) === '@') {
        ret.push({
          type: 'media',
          rules: deconstruct(obj[key]),
          expr: key.substring(6)
        });
      } else {
        hasPlain = true;
        plain[key] = obj[key];
      }
    });
    return hasPlain ? [plain].concat(ret) : ret;
  }
  return obj;
}

// extracts and composes styles from a rule into a 'mega' style
// with sub styles keyed by media query + 'path'
function extractStyles() {
  for (var _len3 = arguments.length, rules = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    rules[_key3] = arguments[_key3];
  }

  rules = flatten(rules);
  var exprs = {};
  // converts {[data-css-<id>]} to the backing rule 
  rules = rules.map(function (x) {
    return isLikeRule(x) ? registered[idFor(x)] : x;
  }).map(function (x) {
    return x.type === 'style' || !x.type ? deconstruct(x.style || x) : x;
  });
  rules = flatten(rules);
  rules.forEach(function (rule) {
    // avoid possible label. todo - cleaner 
    if (typeof rule === 'string') {
      return;
    }
    switch (rule.type) {
      case 'raw':
      case 'font-face':
      case 'keyframes':
        throw new Error('not implemented');

      case 'merge':
        return deepMergeStyles(exprs, extractStyles(rule.rules));

      case 'pseudo':
        if (rule.selector === ':hover' && exprs._ && exprs._['%%%:active'] && !exprs._['%%%:hover']) {
          console.warn(':active must come after :hover to work correctly'); //eslint-disable-line no-console
        }
        return deepMergeStyles(exprs, { _: _defineProperty({}, '%%%' + rule.selector, rule.style) });
      case 'select':
        return deepMergeStyles(exprs, { _: _defineProperty({}, '^^^' + rule.selector, rule.style) });
      case 'parent':
        return deepMergeStyles(exprs, { _: _defineProperty({}, '***' + rule.selector, rule.style) });

      case 'style':
        return deepMergeStyles(exprs, { _: { _: rule.style } });

      case 'media':
        return deepMergeStyles(exprs, _defineProperty({}, rule.expr, extractStyles(rule.rules)._));

      default:
        return deepMergeStyles(exprs, { _: { _: rule } });
    }
  });
  return exprs;
}

// extract label from a rule / style 
function extractLabel(rule) {
  if (isLikeRule(rule)) {
    rule = registered[idFor(rule)];
  }
  return rule.label || '{:}';
}

// given an id / 'path', generate a css selector 
function selector(id, path) {
  if (path === '_') return '.css-' + id + ',[data-css-' + id + ']';

  if (path.indexOf('%%%') === 0) {
    var x = '.css-' + id + path.slice(3) + ',[data-css-' + id + ']' + path.slice(3);
    if (canSimulate) x += ',.css-' + id + '[data-simulate-' + simple(path) + '],[data-css-' + id + '][data-simulate-' + simple(path) + ']';
    return x;
  }

  if (path.indexOf('***') === 0) {
    return path.slice(3).split(',').map(function (x) {
      return x + ' .css-' + id + ',' + x + ' [data-css-' + id + ']';
    }).join(',');
  }
  if (path.indexOf('^^^') === 0) {
    return path.slice(3).split(',').map(function (x) {
      return '.css-' + id + x + ',[data-css-' + id + ']' + x;
    }).join(',');
  }
}

function toCSS(_ref4) {
  var selector = _ref4.selector;
  var style = _ref4.style;

  var result = plugins.transform({ selector: selector, style: style });
  return result.selector + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
}

function ruleToAst(rule) {
  var styles = extractStyles(rule);
  return Object.keys(styles).reduce(function (o, expr) {
    o[expr] = Object.keys(styles[expr]).map(function (s) {
      return { selector: selector(rule.id, s), style: styles[expr][s] };
    });
    return o;
  }, {});
}

function ruleToCSS(spec) {
  var css = [];
  var ast = ruleToAst(spec);
  // plugins here 
  var _ = ast._;

  var exprs = _objectWithoutProperties(ast, ['_']);

  if (_) {
    _.map(toCSS).forEach(function (str) {
      return css.push(str);
    });
  }
  Object.keys(exprs).forEach(function (expr) {
    css.push('@media ' + expr + '{' + exprs[expr].map(toCSS).join('') + '}');
  });
  return css;
}

// this cache to track which rules have 
// been inserted into the stylesheet
var inserted = styleSheet.inserted = {};

// and helpers to insert rules into said styleSheet
function insert(spec) {
  if (!inserted[spec.id]) {
    inserted[spec.id] = true;
    ruleToCSS(spec).map(function (cssRule) {
      return styleSheet.insert(cssRule);
    });
  }
}

function insertRule(css) {
  var spec = {
    id: hashify(css),
    css: css,
    type: 'raw',
    label: '^'
  };
  register(spec);
  if (!inserted[spec.id]) {
    styleSheet.insert(spec.css);
    inserted[spec.id] = true;
  }
}

function insertGlobal(selector, style) {
  return insertRule(selector + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(style) + '}');
}

function insertKeyframe(spec) {
  if (!inserted[spec.id]) {
    (function () {
      var inner = Object.keys(spec.keyframes).map(function (kf) {
        var result = plugins.keyframes.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
        return result.name + '{' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
      }).join('');

      ['-webkit-', '-moz-', '-o-', ''].forEach(function (prefix) {
        return styleSheet.insert('@' + prefix + 'keyframes ' + (spec.name + '_' + spec.id) + '{' + inner + '}');
      });

      inserted[spec.id] = true;
    })();
  }
}

function insertFontFace(spec) {
  if (!inserted[spec.id]) {
    styleSheet.insert('@font-face{' + (0, _CSSPropertyOperations.createMarkupForStyles)(spec.font) + '}');
    inserted[spec.id] = true;
  }
}

// rehydrate the insertion cache with ids sent from 
// renderStatic / renderStaticOptimized 
function rehydrate(ids) {
  // load up ids
  Object.assign(inserted, ids.reduce(function (o, i) {
    return o[i] = true, o;
  }, {}));
  // assume css loaded separately
}

// todo - perf
var ruleCache = {};
function toRule(spec) {
  register(spec);
  insert(spec);
  if (ruleCache[spec.id]) {
    return ruleCache[spec.id];
  }

  var ret = _defineProperty({}, 'data-css-' + spec.id, hasLabels ? spec.label || '' : '');
  Object.defineProperty(ret, 'toString', {
    enumerable: false, value: function value() {
      return 'css-' + spec.id;
    }
  });
  ruleCache[spec.id] = ret;
  return ret;
}

// clears out the cache and empties the stylesheet
// best for tests, though there might be some value for SSR. 

function flush() {
  inserted = styleSheet.inserted = {};
  registered = styleSheet.registered = {};
  ruleCache = {};
  styleSheet.flush();
  styleSheet.inject();
}

function find(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i]) === true) {
      return true;
    }
  }
  return false;
}

function style(obj) {
  obj = (0, _clean2.default)(obj);

  return obj ? toRule({
    id: hashify(obj),
    type: 'style',
    style: obj,
    label: obj.label || '*'
  }) : {};
}

// unique feature 
// when you need to define 'real' css (whatever that may be)
// https://twitter.com/threepointone/status/756585907877273600
// https://twitter.com/threepointone/status/756986938033254400
function select(selector, obj) {
  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
    return style(selector);
  }
  obj = (0, _clean2.default)(obj);

  return obj ? toRule({
    id: hashify(selector, obj),
    type: 'select',
    selector: selector,
    style: obj,
    label: obj.label || '*'
  }) : {};
}

var $ = exports.$ = select; // bringin' jquery back

function parent(selector, obj) {
  obj = (0, _clean2.default)(obj);
  return obj ? toRule({
    id: hashify(selector, obj),
    type: 'parent',
    selector: selector,
    style: obj,
    label: obj.label || '*'
  }) : {};
}

// we define a function to 'merge' styles together.
// backstory - because of a browser quirk, multiple styles are applied in the order they're 
// defined in the stylesheet, not in the order of application 
// in most cases, this won't case an issue UNTIL IT DOES 
// instead, use merge() to merge styles,
// with latter styles gaining precedence over former ones 

function merge() {
  for (var _len4 = arguments.length, rules = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    rules[_key4] = arguments[_key4];
  }

  rules = (0, _clean2.default)(rules);
  return rules ? toRule({
    id: hashify(extractStyles(rules)),
    type: 'merge',
    rules: rules,
    label: '[' + (typeof rules[0] === 'string' ? rules[0] : rules.map(extractLabel).join(' + ')) + ']'
  }) : {};
}

var compose = exports.compose = merge;

function media(expr) {
  for (var _len5 = arguments.length, rules = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    rules[_key5 - 1] = arguments[_key5];
  }

  rules = (0, _clean2.default)(rules);
  return rules ? toRule({
    id: hashify(expr, extractStyles(rules)),
    type: 'media',
    rules: rules,
    expr: expr,
    label: '*mq(' + rules.map(extractLabel).join(' + ') + ')'
  }) : {};
}

var presets = exports.presets = {
  mobile: '(min-width: 400px)',
  phablet: '(min-width: 550px)',
  tablet: '(min-width: 750px)',
  desktop: '(min-width: 1000px)',
  hd: '(min-width: 1200px)'
};

/**** live media query labels ****/

// simplest implementation -
// cycle through the cache, and for every media query
// find matching elements and update the label 
function updateMediaQueryLabels() {
  Object.keys(registered).forEach(function (id) {
    var expr = registered[id].expr;

    if (expr && hasLabels && window.matchMedia) {
      (function () {
        var els = document.querySelectorAll('[data-css-' + id + ']');
        var match = window.matchMedia(expr).matches ? '✓' : '✕';
        var regex = /^(✓|✕|\*)mq/;
        [].concat(_toConsumableArray(els)).forEach(function (el) {
          return el.setAttribute('data-css-' + id, el.getAttribute('data-css-' + id).replace(regex, match + 'mq'));
        });
      })();
    }
  });
}

// saves a reference to the loop we trigger 
var interval = void 0;

function trackMediaQueryLabels() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

  if (bool) {
    if (interval) {
      console.warn('already tracking labels, call trackMediaQueryLabels(false) to stop'); // eslint-disable-line no-console 
      return;
    }
    interval = setInterval(function () {
      return updateMediaQueryLabels();
    }, period);
  } else {
    clearInterval(interval);
    interval = null;
  }
}

// in dev mode, start this up immediately 
if (isDev && isBrowser) {
  trackMediaQueryLabels(true);
  // todo - make sure hot loading isn't broken
  // todo - clearInterval on browser close  
}

function pseudo(selector, obj) {
  obj = (0, _clean2.default)(obj);
  return obj ? toRule({
    id: hashify(selector, obj),
    type: 'pseudo',
    selector: selector,
    style: obj,
    label: obj.label || ':*'
  }) : {};
}

// allllll the pseudoclasses

function active(x) {
  return pseudo(':active', x);
}

function any(x) {
  return pseudo(':any', x);
}

function checked(x) {
  return pseudo(':checked', x);
}

function disabled(x) {
  return pseudo(':disabled', x);
}

function empty(x) {
  return pseudo(':empty', x);
}

function enabled(x) {
  return pseudo(':enabled', x);
}

function _default(x) {
  return pseudo(':default', x); // note '_default' name  
}

function first(x) {
  return pseudo(':first', x);
}

function firstChild(x) {
  return pseudo(':first-child', x);
}

function firstOfType(x) {
  return pseudo(':first-of-type', x);
}

function fullscreen(x) {
  return pseudo(':fullscreen', x);
}

function focus(x) {
  return pseudo(':focus', x);
}

function hover(x) {
  return pseudo(':hover', x);
}

function indeterminate(x) {
  return pseudo(':indeterminate', x);
}

function inRange(x) {
  return pseudo(':in-range', x);
}

function invalid(x) {
  return pseudo(':invalid', x);
}

function lastChild(x) {
  return pseudo(':last-child', x);
}

function lastOfType(x) {
  return pseudo(':last-of-type', x);
}

function left(x) {
  return pseudo(':left', x);
}

function link(x) {
  return pseudo(':link', x);
}

function onlyChild(x) {
  return pseudo(':only-child', x);
}

function onlyOfType(x) {
  return pseudo(':only-of-type', x);
}

function optional(x) {
  return pseudo(':optional', x);
}

function outOfRange(x) {
  return pseudo(':out-of-range', x);
}

function readOnly(x) {
  return pseudo(':read-only', x);
}

function readWrite(x) {
  return pseudo(':read-write', x);
}

function required(x) {
  return pseudo(':required', x);
}

function right(x) {
  return pseudo(':right', x);
}

function root(x) {
  return pseudo(':root', x);
}

function scope(x) {
  return pseudo(':scope', x);
}

function target(x) {
  return pseudo(':target', x);
}

function valid(x) {
  return pseudo(':valid', x);
}

function visited(x) {
  return pseudo(':visited', x);
}

// parameterized pseudoclasses
function dir(p, x) {
  return pseudo(':dir(' + p + ')', x);
}
function lang(p, x) {
  return pseudo(':lang(' + p + ')', x);
}
function not(p, x) {
  // should this be a plugin?
  var selector = p.split(',').map(function (x) {
    return x.trim();
  }).map(function (x) {
    return ':not(' + x + ')';
  });
  if (selector.length === 1) {
    return pseudo(':not(' + p + ')', x);
  }
  return select(selector.join(''), x);
}
function nthChild(p, x) {
  return pseudo(':nth-child(' + p + ')', x);
}
function nthLastChild(p, x) {
  return pseudo(':nth-last-child(' + p + ')', x);
}
function nthLastOfType(p, x) {
  return pseudo(':nth-last-of-type(' + p + ')', x);
}
function nthOfType(p, x) {
  return pseudo(':nth-of-type(' + p + ')', x);
}

// pseudoelements
function after(x) {
  return pseudo('::after', x);
}
function before(x) {
  return pseudo('::before', x);
}
function firstLetter(x) {
  return pseudo('::first-letter', x);
}
function firstLine(x) {
  return pseudo('::first-line', x);
}
function selection(x) {
  return pseudo('::selection', x);
}
function backdrop(x) {
  return pseudo('::backdrop', x);
}
function placeholder(x) {
  // https://github.com/threepointone/glamor/issues/14
  return merge(pseudo('::placeholder', x), pseudo('::-webkit-input-placeholder', x), pseudo('::-moz-placeholder', x), pseudo('::-ms-input-placeholder', x));
}

// we can add keyframes in a similar manner, but still generating a unique name 
// for including in styles. this gives us modularity, but still a natural api 
function keyframes(name, kfs) {
  if (!kfs) {
    kfs = name, name = 'animation';
  }

  // do not ignore empty keyframe definitions for now.
  kfs = (0, _clean2.default)(kfs) || {};
  var spec = {
    id: hashify(name, kfs),
    type: 'keyframes',
    name: name,
    keyframes: kfs
  };
  register(spec);
  insertKeyframe(spec);
  return name + '_' + spec.id;
}

// we don't go all out for fonts as much, giving a simple font loading strategy 
// use a fancier lib if you need moar power
function fontFace(font) {
  font = (0, _clean2.default)(font);
  var spec = {
    id: hashify(font),
    type: 'font-face',
    font: font
  };
  register(spec);
  insertFontFace(spec);

  return font.fontFamily;
}

/*** helpers for web components ***/
// https://github.com/threepointone/glamor/issues/16

function cssFor() {
  for (var _len6 = arguments.length, rules = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    rules[_key6] = arguments[_key6];
  }

  rules = (0, _clean2.default)(rules);
  return rules ? flatten(rules.map(function (r) {
    return registered[idFor(r)];
  }).map(ruleToCSS)).join('') : '';
}

function attribsFor() {
  for (var _len7 = arguments.length, rules = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    rules[_key7] = arguments[_key7];
  }

  rules = (0, _clean2.default)(rules);
  var htmlAttributes = rules ? rules.map(function (rule) {
    idFor(rule); // throwaway check for rule 
    var key = Object.keys(rule)[0],
        value = rule[key];
    return key + '="' + (value || '') + '"';
  }).join(' ') : '';

  return htmlAttributes;
}

},{"./CSSPropertyOperations":1,"./clean.js":3,"./hash":4,"./plugins":6,"./sheet.js":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginSet = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.fallbacks = fallbacks;
exports.prefixes = prefixes;
exports.bug20fix = bug20fix;

var _autoprefix = require('./autoprefix');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isDev = function (x) {
  return x === 'development' || !x;
}("production");

var PluginSet = exports.PluginSet = function () {
  function PluginSet() {
    _classCallCheck(this, PluginSet);

    for (var _len = arguments.length, initial = Array(_len), _key = 0; _key < _len; _key++) {
      initial[_key] = arguments[_key];
    }

    this.fns = initial || [];
  }

  _createClass(PluginSet, [{
    key: 'add',
    value: function add() {
      var _this = this;

      for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        fns[_key2] = arguments[_key2];
      }

      fns.forEach(function (fn) {
        if (_this.fns.indexOf(fn) >= 0) {
          if (isDev) {
            console.warn('adding the same plugin again, ignoring'); //eslint-disable-line no-console
          }
        } else {
          _this.fns = [fn].concat(_toConsumableArray(_this.fns));
        }
      });
    }
  }, {
    key: 'remove',
    value: function remove(fn) {
      this.fns = this.fns.filter(function (x) {
        return x !== fn;
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.fns = [];
    }
  }, {
    key: 'transform',
    value: function transform(o) {
      return this.fns.reduce(function (o, fn) {
        return fn(o);
      }, o);
    }
  }]);

  return PluginSet;
}();

function fallbacks(node) {
  var hasArray = Object.keys(node.style).map(function (x) {
    return Array.isArray(node.style[x]);
  }).indexOf(true) >= 0;
  if (hasArray) {
    var _ret = function () {
      var style = node.style;

      var rest = _objectWithoutProperties(node, ['style']);

      var flattened = Object.keys(style).reduce(function (o, key) {
        o[key] = Array.isArray(style[key]) ? style[key].join('; ' + key + ': ') : style[key];
        return o;
      }, {});
      // todo - 
      // flatten arrays which haven't been flattened yet 
      return {
        v: _extends({ style: flattened }, rest)
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return node;
}

function prefixes(_ref) {
  var style = _ref.style;

  var rest = _objectWithoutProperties(_ref, ['style']);

  return _extends({ style: (0, _autoprefix.autoprefix)(style) }, rest);
}

function bug20fix(_ref2) {
  var selector = _ref2.selector;
  var style = _ref2.style;

  // https://github.com/threepointone/glamor/issues/20
  // todo - only on chrome versions and server side   
  return { selector: selector.replace(/\:hover/g, ':hover:nth-child(n)'), style: style };
}

},{"./autoprefix":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 

high performance StyleSheet for css-in-js systems 

- uses multiple style tags behind the scenes for millions of rules 
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side 


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject() 
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }') 
- appends a css rule into the stylesheet 

styleSheet.flush() 
- empties the stylesheet of all its contents


*/

function last() {
  return this[this.length - 1];
}

function sheetForTag(tag) {
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isBrowser = typeof window !== 'undefined';
var isDev = function (x) {
  return x === 'development' || !x;
}("production");
var isTest = "production" === 'test';

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

var StyleSheet = exports.StyleSheet = function () {
  function StyleSheet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$speedy = _ref.speedy;
    var speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy;
    var _ref$maxLength = _ref.maxLength;
    var maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

    _classCallCheck(this, StyleSheet);

    this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
    this.sheet = undefined;
    this.tags = [];
    this.maxLength = maxLength;
    this.ctr = 0;
  }

  _createClass(StyleSheet, [{
    key: 'inject',
    value: function inject() {
      var _this = this;

      if (this.injected) {
        throw new Error('already injected stylesheet!');
      }
      if (isBrowser) {
        // this section is just weird alchemy I found online off many sources 
        this.tags[0] = makeStyleTag();
        // this weirdness brought to you by firefox 
        this.sheet = sheetForTag(this.tags[0]);
      } else {
        // server side 'polyfill'. just enough behavior to be useful.
        this.sheet = {
          cssRules: [],
          insertRule: function insertRule(rule) {
            // enough 'spec compliance' to be able to extract the rules later  
            // in other words, just the cssText field 
            _this.sheet.cssRules.push({ cssText: rule });
          }
        };
      }
      this.injected = true;
    }
  }, {
    key: 'speedy',
    value: function speedy(bool) {
      if (this.ctr !== 0) {
        throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
      }
      this.isSpeedy = !!bool;
    }
  }, {
    key: '_insert',
    value: function _insert(rule) {
      // this weirdness for perf, and chrome's weird bug 
      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
      try {
        this.sheet.insertRule(rule, this.sheet.cssRules.length); // todo - correct index here     
      } catch (e) {
        if (isDev) {
          // might need beter dx for this 
          console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
        }
      }
    }
  }, {
    key: 'insert',
    value: function insert(rule) {

      if (isBrowser) {
        var _context;

        // this is the ultrafast version, works across browsers 
        if (this.isSpeedy && this.sheet.insertRule) {
          this._insert(rule);
        }
        // more browser weirdness. I don't even know    
        else if (this.tags.length > 0 && (_context = this.tags, last).call(_context).styleSheet) {
            var _context2;

            (_context2 = this.tags, last).call(_context2).styleSheet.cssText += rule;
          } else {
            var _context3;

            (_context3 = this.tags, last).call(_context3).appendChild(document.createTextNode(rule));

            if (!this.isSpeedy) {
              var _context4;

              // sighhh
              this.sheet = sheetForTag((_context4 = this.tags, last).call(_context4));
            }
          }
      } else {
        // server side is pretty simple         
        this.sheet.insertRule(rule);
      }

      this.ctr++;
      if (isBrowser && this.ctr % this.maxLength === 0) {
        var _context5;

        this.tags.push(makeStyleTag());
        this.sheet = sheetForTag((_context5 = this.tags, last).call(_context5));
      }
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (isBrowser) {
        this.tags.forEach(function (tag) {
          return tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.sheet = null;
        this.ctr = 0;
        // todo - look for remnants in document.styleSheets
      } else {
        // simpler on server 
        this.sheet.cssRules = [];
      }
      this.injected = false;
    }
  }, {
    key: 'rules',
    value: function rules() {
      if (!isBrowser) {
        return this.sheet.cssRules;
      }
      var arr = [];
      this.tags.forEach(function (tag) {
        return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
      });
      return arr;
    }
  }]);

  return StyleSheet;
}();

},{}]},{},[5])(5)
});