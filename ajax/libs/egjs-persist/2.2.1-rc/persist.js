/*
Copyright (c) 2017 NAVER Corp.
@egjs/persist project is licensed under the MIT license

@egjs/persist JavaScript library


@version 2.2.0
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.eg = global.eg || {}, global.eg.Persist = factory());
}(this, (function () { 'use strict';

	var win = typeof window !== "undefined" && window || {};
	var console$1 = win.console;
	var document$1 = win.document;
	var history = win.history;
	var localStorage = win.localStorage;
	var location$1 = win.location;
	var sessionStorage = win.sessionStorage;
	var navigator = win.navigator;
	var parseFloat = win.parseFloat;
	var performance = win.performance;

	var CONST_PERSIST = "___persist___";
	var CONST_PERSIST_STATE = "state" + CONST_PERSIST;
	var CONST_DEPTHS = "depths";
	var CONST_LAST_URL = "lastUrl";
	var navigation = performance && performance.navigation;
	var TYPE_NAVIGATE = navigation && navigation.TYPE_NAVIGATE || 0;
	var TYPE_RELOAD = navigation && navigation.TYPE_RELOAD || 1;
	var TYPE_BACK_FORWARD = navigation && navigation.TYPE_BACK_FORWARD || 2;

	var isSupportState = history && "replaceState" in history && "state" in history;

	function isStorageAvailable(storage) {
	  if (!storage) {
	    return undefined;
	  }

	  var TMP_KEY = "__tmp__" + CONST_PERSIST;

	  try {
	    // In case of iOS safari private mode, calling setItem on storage throws error
	    storage.setItem(TMP_KEY, CONST_PERSIST); // In Chrome incognito mode, can not get saved value
	    // In IE8, calling storage.getItem occasionally makes "Permission denied" error

	    return storage.getItem(TMP_KEY) === CONST_PERSIST;
	  } catch (e) {
	    return false;
	  }
	}

	var storage = function () {
	  var strg;

	  if (isStorageAvailable(sessionStorage)) {
	    strg = sessionStorage;
	  } else if (isStorageAvailable(localStorage)) {
	    strg = localStorage;
	  }

	  return strg;
	}();

	function warnInvalidStorageValue() {
	  /* eslint-disable no-console */
	  console.warn("window.history or session/localStorage has no valid " + "format data to be handled in persist.");
	  /* eslint-enable no-console */
	}

	function getStorage() {
	  return storage;
	}
	/*
	 * Get state value
	 */


	function getState(key) {
	  var state;
	  var stateStr;

	  if (storage) {
	    stateStr = storage.getItem(key);
	  } else if (history.state) {
	    if (typeof history.state === "object" && history.state !== null) {
	      stateStr = history.state[key];
	    } else {
	      warnInvalidStorageValue();
	    }
	  } else {
	    stateStr = history.state;
	  } // the storage is clean


	  if (stateStr === null) {
	    return {};
	  } // "null" is not a valid


	  var isValidStateStr = typeof stateStr === "string" && stateStr.length > 0 && stateStr !== "null";

	  try {
	    state = JSON.parse(stateStr); // like '[ ... ]', '1', '1.234', '"123"' is also not valid

	    var isValidType = !(typeof state !== "object" || state instanceof Array);

	    if (!isValidStateStr || !isValidType) {
	      throw new Error();
	    }
	  } catch (e) {
	    warnInvalidStorageValue();
	    state = {};
	  } // Note2 (Android 4.3) return value is null


	  return state;
	}

	function getStateByKey(key, valueKey) {
	  if (!isSupportState && !storage) {
	    return undefined;
	  }

	  var result = getState(key)[valueKey]; // some device returns "null" or undefined

	  if (result === "null" || typeof result === "undefined") {
	    result = null;
	  }

	  return result;
	}
	/*
	 * Set state value
	 */


	function setState(key, state) {
	  if (storage) {
	    if (state) {
	      storage.setItem(key, JSON.stringify(state));
	    } else {
	      storage.removeItem(key);
	    }
	  } else {
	    try {
	      var historyState = !history || history.state == null ? {} : history.state;

	      if (history && typeof historyState === "object") {
	        historyState[key] = JSON.stringify(state);
	        history.replaceState(historyState, document.title, location$1.href);
	      } else {
	        /* eslint-disable no-console */
	        console.warn("To use a history object, it must be an object that is not a primitive type.");
	        /* eslint-enable no-console */
	      }
	    } catch (e) {
	      /* eslint-disable no-console */
	      console.warn(e.message);
	      /* eslint-enable no-console */
	    }
	  }

	  state ? win[CONST_PERSIST] = true : delete win[CONST_PERSIST];
	}

	function setStateByKey(key, valueKey, data) {
	  if (!isSupportState && !storage) {
	    return;
	  }

	  var beforeData = getState(key);
	  beforeData[valueKey] = data;
	  setState(key, beforeData);
	}
	/*
	 * flush current history state
	 */


	function reset(key) {
	  setState(key, null);
	}

	var userAgent = navigator ? navigator.userAgent : "";

	var isNeeded = function () {
	  var isIOS = new RegExp("iPhone|iPad", "i").test(userAgent);
	  var isMacSafari = new RegExp("Mac", "i").test(userAgent) && !new RegExp("Chrome", "i").test(userAgent) && new RegExp("Apple", "i").test(userAgent);
	  var isAndroid = new RegExp("Android ", "i").test(userAgent);
	  var isWebview = new RegExp("wv; |inapp;", "i").test(userAgent);
	  var androidVersion = isAndroid ? parseFloat(new RegExp("(Android)\\s([\\d_\\.]+|\\d_0)", "i").exec(userAgent)[2]) : undefined;
	  return !(isIOS || isMacSafari || isAndroid && (androidVersion <= 4.3 && isWebview || androidVersion < 3));
	}(); // In case of IE8, TYPE_BACK_FORWARD is undefined.


	function getNavigationType() {
	  return performance && performance.navigation && performance.navigation.type;
	}

	function getUrl() {
	  return location.href.split("#")[0];
	}

	function getStorageKey(name) {
	  return name + CONST_PERSIST;
	}

	/* eslint-disable no-use-before-define */
	var currentUrl = "";

	function setRec(obj, path, value) {
	  var _obj = obj;

	  if (!_obj) {
	    _obj = isNaN(path[0]) ? {} : [];
	  }

	  var head = path.shift();

	  if (path.length === 0) {
	    if (_obj instanceof Array && isNaN(head)) {
	      console$1.warn("Don't use key string on array");
	    }

	    _obj[head] = value;
	    return _obj;
	  }

	  _obj[head] = setRec(_obj[head], path, value);
	  return _obj;
	}

	function setPersistState(key, value) {
	  try {
	    setStateByKey(CONST_PERSIST_STATE, key, value);
	  } catch (e) {
	    if (clearFirst()) {
	      if (key === CONST_LAST_URL) {
	        setPersistState(key, value);
	      } else if (key === CONST_DEPTHS) {
	        setPersistState(key, value && value.slice(1));
	      }
	    } else {
	      // There is no more size to fit in.
	      throw e;
	    }
	  }
	}

	function getPersistState(key) {
	  return getStateByKey(CONST_PERSIST_STATE, key);
	}

	function updateDepth(type) {
	  var url = getUrl();

	  if (currentUrl === url) {
	    return;
	  } // url is not the same for the first time, pushState, or replaceState.


	  currentUrl = url;
	  var depths = getPersistState(CONST_DEPTHS) || [];

	  if (type === TYPE_BACK_FORWARD) {
	    // Change current url only
	    var currentIndex = depths.indexOf(currentUrl);
	    ~currentIndex && setPersistState(CONST_LAST_URL, currentUrl);
	  } else {
	    var prevLastUrl = getPersistState(CONST_LAST_URL);
	    reset(getStorageKey(currentUrl));

	    if (type === TYPE_NAVIGATE && url !== prevLastUrl) {
	      // Remove all url lists with higher index than current index
	      var prevLastIndex = depths.indexOf(prevLastUrl);
	      var removedList = depths.splice(prevLastIndex + 1, depths.length);
	      removedList.forEach(function (removedUrl) {
	        reset(getStorageKey(removedUrl));
	      }); // If the type is NAVIGATE and there is information about current url, delete it.

	      var _currentIndex = depths.indexOf(currentUrl);

	      ~_currentIndex && depths.splice(_currentIndex, 1);
	    } // Add depth for new address.


	    if (depths.indexOf(url) < 0) {
	      depths.push(url);
	    }

	    setPersistState(CONST_DEPTHS, depths);
	    setPersistState(CONST_LAST_URL, url);
	  }
	}

	function clearFirst() {
	  var depths = getPersistState(CONST_DEPTHS) || [];
	  var removed = depths.splice(0, 1);

	  if (!removed.length) {
	    // There is an error because there is no depth to add data.
	    return false;
	  }

	  var removedUrl = removed[0];
	  reset(getStorageKey(removedUrl));

	  if (currentUrl === removedUrl) {
	    currentUrl = "";
	    setPersistState(CONST_LAST_URL, "");

	    if (!depths.length) {
	      // I tried to add myself, but it didn't add up, so I got an error.
	      return false;
	    }
	  }

	  setPersistState(CONST_DEPTHS, depths); // Clear the previous record and try to add data again.

	  return true;
	}

	function _clear() {
	  var depths = getPersistState(CONST_DEPTHS) || [];
	  depths.forEach(function (url) {
	    reset(getStorageKey(url));
	  });
	  reset(CONST_PERSIST_STATE);
	  currentUrl = "";
	}

	if ("onpopstate" in win) {
	  win.addEventListener("popstate", function () {
	    // popstate event occurs when backward or forward
	    updateDepth(TYPE_BACK_FORWARD);
	  });
	}
	/**
	 * Get or store the current state of the web page using JSON.
	 * @ko 웹 페이지의 현재 상태를 JSON 형식으로 저장하거나 읽는다.
	 * @alias eg.Persist
	 *
	 * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
	 */


	var Persist =
	/*#__PURE__*/
	function () {
	  var Persist =
	  /*#__PURE__*/
	  function () {
	    /**
	     * @static
	     * Clear all information in Persist
	     */
	    Persist.clear = function clear() {
	      _clear();
	    };
	    /**
	     * @static
	     * Return whether you need "Persist" module by checking the bfCache support of the current browser
	     * @return {Boolean}
	     */


	    Persist.isNeeded = function isNeeded$$1() {
	      return isNeeded;
	    };
	    /**
	    * Constructor
	    * @param {String} key The key of the state information to be stored <ko>저장할 상태 정보의 키</ko>
	    **/


	    function Persist(key) {
	      this.key = key || "";
	    }
	    /**
	     * Read value
	     * @param {String?} path target path
	     * @return {String|Number|Boolean|Object|Array}
	     */


	    var _proto = Persist.prototype;

	    _proto.get = function get(path) {
	      var urlKey = getStorageKey(getUrl()); // update url for pushState, replaceState

	      updateDepth(TYPE_NAVIGATE); // find path

	      var globalState = getStateByKey(urlKey, this.key);

	      if (!path || path.length === 0) {
	        return globalState;
	      }

	      var pathToken = path.split(".");
	      var currentItem = globalState;
	      var isTargetExist = true;

	      for (var i = 0; i < pathToken.length; i++) {
	        if (!currentItem) {
	          isTargetExist = false;
	          break;
	        }

	        currentItem = currentItem[pathToken[i]];
	      }

	      if (!isTargetExist || currentItem == null) {
	        return null;
	      }

	      return currentItem;
	    };
	    /**
	     * Save value
	     * @param {String} path target path
	     * @param {String|Number|Boolean|Object|Array} value value to save
	     * @return {Persist}
	     */


	    _proto.set = function set(path, value) {
	      var urlKey = getStorageKey(getUrl()); // update url for pushState, replaceState

	      updateDepth(TYPE_NAVIGATE); // find path

	      var key = this.key;
	      var globalState = getStateByKey(urlKey, key);

	      try {
	        if (path.length === 0) {
	          setStateByKey(urlKey, key, value);
	        } else {
	          setStateByKey(urlKey, key, setRec(globalState, path.split("."), value));
	        }
	      } catch (e) {
	        if (clearFirst(e)) {
	          this.set(path, value);
	        } else {
	          // There is no more size to fit in.
	          throw e;
	        }
	      }

	      return this;
	    };

	    return Persist;
	  }();

	  Persist.VERSION = "2.2.0";
	  Persist.StorageManager = {
	    reset: reset,
	    setStateByKey: setStateByKey,
	    getStateByKey: getStateByKey,
	    getStorage: getStorage
	  };
	  return Persist;
	}(); // If navigation's type is not TYPE_BACK_FORWARD, delete information about current url.


	updateDepth(getNavigationType());

	return Persist;

})));
//# sourceMappingURL=persist.js.map
