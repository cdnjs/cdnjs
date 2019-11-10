/*
Copyright (c) 2017 NAVER Corp.
@egjs/persist project is licensed under the MIT license

@egjs/persist JavaScript library


@version 2.1.3
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
	var location = win.location;
	var sessionStorage = win.sessionStorage;
	var navigator = win.navigator;
	var parseFloat = win.parseFloat;
	var performance = win.performance;

	var userAgent = navigator ? navigator.userAgent : "";
	var TYPE_BACK_FORWARD = performance && performance.navigation.TYPE_BACK_FORWARD || 2;

	var isNeeded = function () {
	  var isIOS = new RegExp("iPhone|iPad", "i").test(userAgent);
	  var isMacSafari = new RegExp("Mac", "i").test(userAgent) && !new RegExp("Chrome", "i").test(userAgent) && new RegExp("Apple", "i").test(userAgent);
	  var isAndroid = new RegExp("Android ", "i").test(userAgent);
	  var isWebview = new RegExp("wv; |inapp;", "i").test(userAgent);
	  var androidVersion = isAndroid ? parseFloat(new RegExp("(Android)\\s([\\d_\\.]+|\\d_0)", "i").exec(userAgent)[2]) : undefined;
	  return !(isIOS || isMacSafari || isAndroid && (androidVersion <= 4.3 && isWebview || androidVersion < 3));
	}(); // In case of IE8, TYPE_BACK_FORWARD is undefined.


	function isBackForwardNavigated() {
	  return performance && performance.navigation.type === TYPE_BACK_FORWARD;
	}

	var CONST_PERSIST = "___persist___";

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

	function getStorageKey() {
	  return storage ? location.href + CONST_PERSIST : undefined;
	}

	function getStorage() {
	  return storage;
	}
	/*
	 * Get state value
	 */


	function getState() {
	  var state;
	  var PERSIST_KEY = location.href + CONST_PERSIST;
	  var stateStr;

	  if (storage) {
	    stateStr = storage.getItem(PERSIST_KEY);
	  } else if (history.state) {
	    if (typeof history.state === "object" && history.state !== null) {
	      stateStr = history.state[PERSIST_KEY];
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

	function getStateByKey(key) {
	  if (!isSupportState && !storage) {
	    return undefined;
	  }

	  var result = getState()[key]; // some device returns "null" or undefined

	  if (result === "null" || typeof result === "undefined") {
	    result = null;
	  }

	  return result;
	}
	/*
	 * Set state value
	 */


	function setState(state) {
	  var PERSIST_KEY = (location ? location.href : "") + CONST_PERSIST;

	  if (storage) {
	    if (state) {
	      storage.setItem(PERSIST_KEY, JSON.stringify(state));
	    } else {
	      storage.removeItem(PERSIST_KEY);
	    }
	  } else {
	    try {
	      var historyState = !history || history.state == null ? {} : history.state;

	      if (history && typeof historyState === "object") {
	        historyState[PERSIST_KEY] = JSON.stringify(state);
	        history.replaceState(historyState, document.title, location.href);
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

	function setStateByKey(key, data) {
	  if (!isSupportState && !storage) {
	    return;
	  }

	  var beforeData = getState();
	  beforeData[key] = data;
	  setState(beforeData);
	}
	/*
	 * flush current history state
	 */


	function reset() {
	  setState(null);
	} // in case of reload


	!isBackForwardNavigated() && reset();

	var StorageManager = ({
		reset: reset,
		setStateByKey: setStateByKey,
		getStateByKey: getStateByKey,
		getStorageKey: getStorageKey,
		getStorage: getStorage
	});

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
	    * Constructor
	    * @param {String} key The key of the state information to be stored <ko>저장할 상태 정보의 키</ko>
	    **/
	    function Persist(key, value) {
	      this.key = key;
	    }
	    /**
	     * Read value
	     * @param {String?} path target path
	     * @return {String|Number|Boolean|Object|Array}
	     */


	    var _proto = Persist.prototype;

	    _proto.get = function get(path) {
	      // find path
	      var globalState = getStateByKey(this.key);

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

	      if (!isTargetExist || !currentItem) {
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
	      // find path
	      var globalState = getStateByKey(this.key);

	      if (path.length === 0) {
	        setStateByKey(this.key, value);
	      } else {
	        setStateByKey(this.key, setRec(globalState, path.split("."), value));
	      }

	      return this;
	    };
	    /**
	     * @static
	     * Return whether you need "Persist" module by checking the bfCache support of the current browser
	     * @return {Boolean}
	     */


	    Persist.isNeeded = function isNeeded$$1() {
	      return isNeeded;
	    };

	    return Persist;
	  }();

	  Persist.VERSION = "2.1.3";
	  Persist.StorageManager = StorageManager;
	  return Persist;
	}();

	return Persist;

})));
//# sourceMappingURL=persist.js.map
