//! ng-stats version 2.3.1 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kent.doddsfamily.us), Viper Bailey <jinxidoru@gmail.com> (http://jinxidoru.blogspot.com) (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["showAngularStats"] = factory(require("angular"));
	else
		root["showAngularStats"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint no-console:0 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var angular = _angular2['default'];

	/* istanbul ignore next */
	if (!angular.version) {
	  // we're doing this because some versions
	  // of angular don't expose itself correctly
	  angular = window.angular;
	}

	exports['default'] = showAngularStats;

	var autoloadKey = 'showAngularStats_autoload';
	var current = null;
	// define the timer function to use based upon whether or not 'performance is available'
	var timerNow = window.self.performance && window.self.performance.now ? function () {
	  return window.self.performance.now();
	} : function () {
	  return Date.now();
	};

	var lastWatchCountRun = timerNow();
	var watchCountTimeout = null;
	var lastWatchCount = getWatcherCount() || 0;
	var lastDigestLength = 0;

	var $rootScope;

	var digestIsHijacked = false;

	var listeners = {
	  watchCount: {},
	  digestLength: {}
	};

	// Hijack $digest to time it and update data on every digest.
	function hijackDigest() {
	  if (digestIsHijacked) {
	    return;
	  }
	  digestIsHijacked = true;
	  var scopePrototype = Object.getPrototypeOf(getRootScope());
	  var oldDigest = scopePrototype.$digest;
	  scopePrototype.$digest = function $digest() {
	    var start = timerNow();
	    oldDigest.apply(this, arguments);
	    var diff = timerNow() - start;
	    updateData(getWatcherCount(), diff);
	  };
	}

	// used to prevent localstorage error in chrome packaged apps
	function isChromeApp() {
	  return typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined' && typeof chrome.storage.local !== 'undefined';
	}

	// check for autoload
	var autoloadOptions = sessionStorage[autoloadKey] || !isChromeApp() && localStorage[autoloadKey];
	if (autoloadOptions) {
	  autoload(JSON.parse(autoloadOptions));
	}

	function autoload(options) {
	  if (window.self.angular && getRootScope()) {
	    showAngularStats(options);
	  } else {
	    // wait for angular to load...
	    window.self.setTimeout(function () {
	      autoload(options);
	    }, 200);
	  }
	}

	function showAngularStats(opts) {
	  /* eslint max-statements:[2, 43] */
	  /* eslint complexity:[2, 18] */
	  /* eslint consistent-return:0 */
	  // TODO ^^ fix these things...
	  opts = opts !== undefined ? opts : {};
	  var returnData = {
	    listeners: listeners
	  };
	  // delete the previous one
	  if (current) {
	    current.$el && current.$el.remove();
	    current.active = false;
	    current = null;
	  }

	  // Remove autoload if they did not specifically request it
	  if (opts === false || !opts.autoload) {
	    sessionStorage.removeItem(autoloadKey);
	    localStorage.removeItem(autoloadKey);
	    // do nothing if the argument is false
	    if (opts === false) {
	      return;
	    }
	  }

	  opts.position = opts.position || 'top-left';
	  opts = angular.extend({
	    htmlId: null,
	    digestTimeThreshold: 16,
	    autoload: false,
	    trackDigest: false,
	    trackWatches: false,
	    logDigest: false,
	    logWatches: false,
	    styles: {
	      position: 'fixed',
	      background: 'black',
	      borderBottom: '1px solid #666',
	      borderRight: '1px solid #666',
	      color: 'red',
	      fontFamily: 'Courier',
	      width: 130,
	      zIndex: 9999,
	      textAlign: 'right',
	      top: opts.position.indexOf('top') === -1 ? null : 0,
	      bottom: opts.position.indexOf('bottom') === -1 ? null : 0,
	      right: opts.position.indexOf('right') === -1 ? null : 0,
	      left: opts.position.indexOf('left') === -1 ? null : 0
	    }
	  }, opts || {});

	  hijackDigest();

	  // setup the state
	  var state = current = { active: true };

	  // auto-load on startup
	  if (opts.autoload) {
	    if (opts.autoload === 'localStorage') {
	      localStorage.setItem(autoloadKey, JSON.stringify(opts));
	    } else if (opts.autoload === 'sessionStorage' || typeof opts.autoload === 'boolean') {
	      sessionStorage.setItem(autoloadKey, JSON.stringify(opts));
	    } else {
	      throw new Error('Invalid value for autoload: ' + opts.autoload + ' can only be "localStorage" "sessionStorage" or boolean.');
	    }
	  }

	  // general variables
	  var bodyEl = angular.element(document.body);
	  var noDigestSteps = 0;

	  // add the DOM element
	  var htmlId = opts.htmlId ? ' id="' + opts.htmlId + '"' : '';
	  state.$el = angular.element('<div' + htmlId + '><canvas></canvas><div></div></div>').css(opts.styles);
	  bodyEl.append(state.$el);
	  var $text = state.$el.find('div');

	  // initialize the canvas
	  var graphSz = { width: 130, height: 40 };
	  var cvs = state.$el.find('canvas').attr(graphSz)[0];

	  // add listeners
	  listeners.digestLength.ngStatsAddToCanvas = function (digestLength) {
	    addDataToCanvas(null, digestLength);
	  };

	  listeners.watchCount.ngStatsAddToCanvas = function (watchCount) {
	    addDataToCanvas(watchCount);
	  };

	  track('digest', listeners.digestLength);
	  track('watches', listeners.watchCount, true);

	  log('digest', listeners.digestLength);
	  log('watches', listeners.watchCount, true);

	  function track(thingToTrack, listenerCollection, diffOnly) {
	    var capThingToTrack = thingToTrack.charAt(0).toUpperCase() + thingToTrack.slice(1);
	    if (opts['track' + capThingToTrack]) {
	      returnData[thingToTrack] = [];
	      listenerCollection['track + capThingToTrack'] = function (tracked) {
	        if (!diffOnly || returnData[thingToTrack][returnData.length - 1] !== tracked) {
	          returnData[thingToTrack][returnData.length - 1] = tracked;
	          returnData[thingToTrack].push(tracked);
	        }
	      };
	    }
	  }

	  function log(thingToLog, listenerCollection, diffOnly) {
	    var capThingToLog = thingToLog.charAt(0).toUpperCase() + thingToLog.slice(1);
	    if (opts['log' + capThingToLog]) {
	      var last;
	      listenerCollection['log' + capThingToLog] = function (tracked) {
	        if (!diffOnly || last !== tracked) {
	          last = tracked;
	          var color = colorLog(thingToLog, tracked);
	          if (color) {
	            console.log('%c' + thingToLog + ':', color, tracked);
	          } else {
	            console.log(thingToLog + ':', tracked);
	          }
	        }
	      };
	    }
	  }

	  function colorLog(thingToLog, tracked) {
	    var color;
	    if (thingToLog === 'digest') {
	      color = tracked > opts.digestTimeThreshold ? 'color:red' : 'color:green';
	    }
	    return color;
	  }

	  function addDataToCanvas(watchCount, digestLength) {
	    var averageDigest = digestLength || lastDigestLength;
	    var color = averageDigest > opts.digestTimeThreshold ? 'red' : 'green';
	    lastWatchCount = nullOrUndef(watchCount) ? lastWatchCount : watchCount;
	    lastDigestLength = nullOrUndef(digestLength) ? lastDigestLength : digestLength;
	    $text.text(lastWatchCount + ' | ' + lastDigestLength.toFixed(2)).css({ color: color });

	    if (!digestLength) {
	      return;
	    }

	    // color the sliver if this is the first step
	    var ctx = cvs.getContext('2d');
	    if (noDigestSteps > 0) {
	      noDigestSteps = 0;
	      ctx.fillStyle = '#333';
	      ctx.fillRect(graphSz.width - 1, 0, 1, graphSz.height);
	    }

	    // mark the point on the graph
	    ctx.fillStyle = color;
	    ctx.fillRect(graphSz.width - 1, Math.max(0, graphSz.height - averageDigest), 2, 2);
	  }

	  // Shift the canvas to the left.
	  function shiftLeft() {
	    if (state.active) {
	      window.self.setTimeout(shiftLeft, 250);
	      var ctx = cvs.getContext('2d');
	      var imageData = ctx.getImageData(1, 0, graphSz.width - 1, graphSz.height);
	      ctx.putImageData(imageData, 0, 0);
	      ctx.fillStyle = noDigestSteps++ > 2 ? 'black' : '#333';
	      ctx.fillRect(graphSz.width - 1, 0, 1, graphSz.height);
	    }
	  }

	  // start everything
	  shiftLeft();
	  if (!$rootScope.$$phase) {
	    $rootScope.$digest();
	  }

	  return returnData;
	}

	angular.module('angularStats', []).directive('angularStats', function () {
	  var index = 1;
	  return {
	    scope: {
	      digestLength: '@',
	      watchCount: '@',
	      watchCountRoot: '@',
	      onDigestLengthUpdate: '&?',
	      onWatchCountUpdate: '&?'
	    },
	    link: function link(scope, el, attrs) {
	      hijackDigest();
	      var directiveIndex = index++;

	      setupDigestLengthElement();
	      setupWatchCountElement();
	      addWatchCountListener();
	      addDigestLengthListener();
	      scope.$on('$destroy', destroyListeners);

	      function setupDigestLengthElement() {
	        if (attrs.hasOwnProperty('digestLength')) {
	          var digestEl = el;
	          if (attrs.digestLength) {
	            digestEl = angular.element(el[0].querySelector(attrs.digestLength));
	          }
	          listeners.digestLength['ngStatsDirective' + directiveIndex] = function (length) {
	            window.dirDigestNode = digestEl[0];
	            digestEl.text((length || 0).toFixed(2));
	          };
	        }
	      }

	      function setupWatchCountElement() {
	        if (attrs.hasOwnProperty('watchCount')) {
	          var watchCountRoot;
	          var watchCountEl = el;
	          if (scope.watchCount) {
	            watchCountEl = angular.element(el[0].querySelector(attrs.watchCount));
	          }

	          if (scope.watchCountRoot) {
	            if (scope.watchCountRoot === 'this') {
	              watchCountRoot = el;
	            } else {
	              // In the case this directive is being compiled and it's not in the dom,
	              // we're going to do the find from the root of what we have...
	              var rootParent;
	              if (attrs.hasOwnProperty('watchCountOfChild')) {
	                rootParent = el[0];
	              } else {
	                rootParent = findRootOfElement(el);
	              }
	              watchCountRoot = angular.element(rootParent.querySelector(scope.watchCountRoot));
	              if (!watchCountRoot.length) {
	                throw new Error('no element at selector: ' + scope.watchCountRoot);
	              }
	            }
	          }

	          listeners.watchCount['ngStatsDirective' + directiveIndex] = function (count) {
	            var watchCount = count;
	            if (watchCountRoot) {
	              watchCount = getWatcherCountForElement(watchCountRoot);
	            }
	            watchCountEl.text(watchCount);
	          };
	        }
	      }

	      function addWatchCountListener() {
	        if (attrs.hasOwnProperty('onWatchCountUpdate')) {
	          listeners.watchCount['ngStatsDirectiveUpdate' + directiveIndex] = function (count) {
	            scope.onWatchCountUpdate({ watchCount: count });
	          };
	        }
	      }

	      function addDigestLengthListener() {
	        if (attrs.hasOwnProperty('onDigestLengthUpdate')) {
	          listeners.digestLength['ngStatsDirectiveUpdate' + directiveIndex] = function (length) {
	            scope.onDigestLengthUpdate({ digestLength: length });
	          };
	        }
	      }

	      function destroyListeners() {
	        delete listeners.digestLength['ngStatsDirectiveUpdate' + directiveIndex];
	        delete listeners.watchCount['ngStatsDirectiveUpdate' + directiveIndex];
	        delete listeners.digestLength['ngStatsDirective' + directiveIndex];
	        delete listeners.watchCount['ngStatsDirective' + directiveIndex];
	      }
	    }
	  };

	  function findRootOfElement(el) {
	    var parent = el[0];
	    while (parent.parentElement) {
	      parent = parent.parentElement;
	    }
	    return parent;
	  }
	});

	// UTILITY FUNCTIONS

	function getRootScope() {
	  if ($rootScope) {
	    return $rootScope;
	  }
	  var scopeEl = document.querySelector('.ng-scope');
	  if (!scopeEl) {
	    return null;
	  }
	  $rootScope = angular.element(scopeEl).scope().$root;
	  return $rootScope;
	}

	// Uses timeouts to ensure that this is only run every 300ms (it's a perf bottleneck)
	function getWatcherCount() {
	  window.self.clearTimeout(watchCountTimeout);
	  var now = timerNow();
	  if (now - lastWatchCountRun > 300) {
	    lastWatchCountRun = now;
	    lastWatchCount = getWatcherCountForScope();
	  } else {
	    watchCountTimeout = window.self.setTimeout(function () {
	      updateData(getWatcherCount());
	    }, 350);
	  }
	  return lastWatchCount;
	}

	function getWatcherCountForElement(element) {
	  var startingScope = getClosestChildScope(element);
	  return getWatcherCountForScope(startingScope);
	}

	function getClosestChildScope(element) {
	  element = angular.element(element);
	  var scope = element.scope();
	  if (!scope) {
	    element = angular.element(element.querySelector('.ng-scope'));
	    scope = element.scope();
	  }
	  return scope;
	}

	function getWatchersFromScope(scope) {
	  return scope && scope.$$watchers ? scope.$$watchers : [];
	}

	// iterate through listeners to call them with the watchCount and digestLength
	function updateData(watchCount, digestLength) {
	  // update the listeners
	  if (!nullOrUndef(watchCount)) {
	    angular.forEach(listeners.watchCount, function (listener) {
	      listener(watchCount);
	    });
	  }
	  if (!nullOrUndef(digestLength)) {
	    angular.forEach(listeners.digestLength, function (listener) {
	      listener(digestLength);
	    });
	  }
	}

	function nullOrUndef(item) {
	  return item === null || item === undefined;
	}

	function getWatcherCountForScope(scope) {
	  var count = 0;
	  iterateScopes(scope, function (childScope) {
	    count += getWatchersFromScope(childScope).length;
	  });
	  return count;
	}

	function iterateScopes(currentScope, fn) {
	  if (typeof currentScope === 'function') {
	    fn = currentScope;
	    currentScope = null;
	  }
	  currentScope = currentScope || getRootScope();
	  currentScope = _makeScopeReference(currentScope);
	  if (!currentScope) {
	    return;
	  }
	  var ret = fn(currentScope);
	  if (ret === false) {
	    return ret;
	  }
	  return iterateChildren(currentScope, fn);
	}

	function iterateSiblings(start, fn) {
	  var ret;
	  /* eslint no-extra-boolean-cast:0 */
	  while (!!(start = start.$$nextSibling)) {
	    ret = fn(start);
	    if (ret === false) {
	      break;
	    }

	    ret = iterateChildren(start, fn);
	    if (ret === false) {
	      break;
	    }
	  }
	  return ret;
	}

	function iterateChildren(start, fn) {
	  var ret;
	  while (!!(start = start.$$childHead)) {
	    ret = fn(start);
	    if (ret === false) {
	      break;
	    }

	    ret = iterateSiblings(start, fn);
	    if (ret === false) {
	      break;
	    }
	  }
	  return ret;
	}

	function getScopeById(id) {
	  var myScope = null;
	  iterateScopes(function (scope) {
	    if (scope.$id === id) {
	      myScope = scope;
	      return false;
	    }
	  });
	  return myScope;
	}

	function _makeScopeReference(scope) {
	  if (_isScopeId(scope)) {
	    scope = getScopeById(scope);
	  }
	  return scope;
	}

	function _isScopeId(scope) {
	  return typeof scope === 'string' || typeof scope === 'number';
	}
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;