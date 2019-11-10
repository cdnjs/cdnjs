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
	var console = win.console;
	var document = win.document;
	var history = win.history;
	var localStorage = win.localStorage;
	var location = win.location;
	var sessionStorage = win.sessionStorage;
	var navigator = win.navigator;
	var parseFloat = win.parseFloat;
	var performance = win.performance;

	/* eslint-disable */
	var persistMigrate = (function (eg) {
	  if (!eg || !eg.Persist) {
	    return;
	  }

	  var GLOBAL_KEY = "KEY___persist___";
	  var oldConstructor = eg.Persist.prototype;
	  var isNeeded = eg.Persist.isNeeded;
	  var StorageManager = eg.Persist.StorageManager;

	  eg.Persist = function Persist(key, value) {
	    // when called as plain method
	    if (!(this instanceof Persist)) {
	      if (arguments.length === 0) {
	        return StorageManager.getStateByKey(GLOBAL_KEY);
	      }

	      if (arguments.length === 1 && typeof key !== "string") {
	        var value_ = key;
	        StorageManager.setStateByKey(GLOBAL_KEY, value_);
	        return undefined;
	      }

	      if (arguments.length === 2) {
	        StorageManager.setStateByKey(key, value);
	      }

	      return StorageManager.getStateByKey(key);
	    } // when called as constructer


	    this.key = key;
	    return undefined;
	  };

	  eg.Persist.isNeeded = isNeeded;
	  eg.Persist.prototype = oldConstructor;
	  return eg.Persist;
	})(win.eg);
	/* eslint-enable */

	return persistMigrate;

})));
//# sourceMappingURL=persist-migrate.js.map
