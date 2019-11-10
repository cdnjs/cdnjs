/*
Copyright (c) 2017 NAVER Corp.
@egjs/persist project is licensed under the MIT license

@egjs/persist JavaScript library


@version 2.2.1
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.eg = global.eg || {}, global.eg.Persist = factory());
}(this, (function () { 'use strict';

	var win = typeof window !== "undefined" && window || {};
	var console = win.console;
	var document = win.document;
	var history = win.history;
	var localStorage = win.localStorage;
	var location$1 = win.location;
	var sessionStorage = win.sessionStorage;
	var navigator = win.navigator;
	var parseFloat = win.parseFloat;
	var performance = win.performance;

	var CONST_PERSIST = "___persist___";
	var navigation = performance && performance.navigation;
	var TYPE_NAVIGATE = navigation && navigation.TYPE_NAVIGATE || 0;
	var TYPE_RELOAD = navigation && navigation.TYPE_RELOAD || 1;
	var TYPE_BACK_FORWARD = navigation && navigation.TYPE_BACK_FORWARD || 2;

	var userAgent = navigator ? navigator.userAgent : "";

	var isNeeded = function () {
	  var isIOS = new RegExp("iPhone|iPad", "i").test(userAgent);
	  var isMacSafari = new RegExp("Mac", "i").test(userAgent) && !new RegExp("Chrome", "i").test(userAgent) && new RegExp("Apple", "i").test(userAgent);
	  var isAndroid = new RegExp("Android ", "i").test(userAgent);
	  var isWebview = new RegExp("wv; |inapp;", "i").test(userAgent);
	  var androidVersion = isAndroid ? parseFloat(new RegExp("(Android)\\s([\\d_\\.]+|\\d_0)", "i").exec(userAgent)[2]) : undefined;
	  return !(isIOS || isMacSafari || isAndroid && (androidVersion <= 4.3 && isWebview || androidVersion < 3));
	}(); // In case of IE8, TYPE_BACK_FORWARD is undefined.

	function getUrl() {
	  return location.href.split("#")[0];
	}

	function getStorageKey(name) {
	  return name + CONST_PERSIST;
	}

	/* eslint-disable */
	var persistMigrate = (function (eg) {
	  if (!eg || !eg.Persist) {
	    return;
	  }

	  var GLOBAL_KEY = "KEY___persist___";
	  var oldConstructor = eg.Persist.prototype;
	  var isNeeded$$1 = eg.Persist.isNeeded;
	  var StorageManager = eg.Persist.StorageManager;

	  eg.Persist = function Persist(key, value) {
	    var urlKey = getStorageKey(getUrl()); // when called as plain method

	    if (!(this instanceof Persist)) {
	      if (arguments.length === 0) {
	        return StorageManager.getStateByKey(urlKey, GLOBAL_KEY);
	      }

	      if (arguments.length === 1 && typeof key !== "string") {
	        var value_ = key;
	        StorageManager.setStateByKey(urlKey, GLOBAL_KEY, value_);
	        return undefined;
	      }

	      if (arguments.length === 2) {
	        StorageManager.setStateByKey(urlKey, key, value);
	      }

	      return StorageManager.getStateByKey(urlKey, key);
	    } // when called as constructer


	    this.key = key;
	    return undefined;
	  };

	  eg.Persist.isNeeded = isNeeded$$1;
	  eg.Persist.prototype = oldConstructor;
	  return eg.Persist;
	})(win.eg);
	/* eslint-enable */

	return persistMigrate;

})));
//# sourceMappingURL=persist-migrate.js.map
