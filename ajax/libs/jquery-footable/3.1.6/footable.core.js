/*
* FooTable v3 - FooTable is a jQuery plugin that aims to make HTML tables on smaller devices look awesome.
* @version 3.1.6
* @link http://fooplugins.com
* @copyright Steven Usher & Brad Vincent 2015
* @license Released under the GPLv3 license.
*/
(function($, F){
	// add in console we use in case it's missing
	window.console = window.console || { log:function(){}, error:function(){} };

	/**
	 * The jQuery plugin initializer.
	 * @function jQuery.fn.footable
	 * @param {(object|FooTable.Defaults)} [options] - The options to initialize the plugin with.
	 * @param {function} [ready] - A callback function to execute for each initialized plugin.
	 * @returns {jQuery}
	 */
	$.fn.footable = function (options, ready) {
		options = options || {};
		// make sure we only work with tables
		return this.filter('table').each(function (i, tbl) {
			F.init(tbl, options, ready);
		});
	};

	var debug_defaults = {
		events: []
	};
	F.__debug__ = JSON.parse(localStorage.getItem('footable_debug')) || false;
	F.__debug_options__ = JSON.parse(localStorage.getItem('footable_debug_options')) || debug_defaults;

	/**
	 * Gets or sets the internal debug variable which enables some additional logging to the console.
	 * When enabled this value is stored in the localStorage so it can persist across page reloads.
	 * @param {boolean} value - Whether or not to enable additional logging.
	 * @param {object} [options] - Any debug specific options.
	 * @returns {(boolean|undefined)}
	 */
	F.debug = function(value, options){
		if (!F.is.boolean(value)) return F.__debug__;
		F.__debug__ = value;
		if (F.__debug__){
			localStorage.setItem('footable_debug', JSON.stringify(F.__debug__));
			F.__debug_options__ = $.extend(true, {}, debug_defaults, options || {});
			if (F.is.hash(options)){
				localStorage.setItem('footable_debug_options', JSON.stringify(F.__debug_options__));
			}
		} else {
			localStorage.removeItem('footable_debug');
			localStorage.removeItem('footable_debug_options');
		}
	};

	/**
	 * Gets the FooTable instance of the supplied table if one exists.
	 * @param {(jQuery|jQuery.selector|HTMLTableElement)} table - The jQuery table object, selector or the HTMLTableElement to retrieve FooTable from.
	 * @returns {(FooTable.Table|undefined)}
	 */
	F.get = function(table){
		return $(table).first().data('__FooTable__');
	};

	/**
	 * Initializes a new instance of FooTable on the supplied table.
	 * @param {(jQuery|jQuery.selector|HTMLTableElement)} table - The jQuery table object, selector or the HTMLTableElement to initialize FooTable on.
	 * @param {object} options - The options to initialize FooTable with.
	 * @param {function} [ready] - A callback function to execute once the plugin is initialized.
	 * @returns {FooTable.Table}
	 */
	F.init = function(table, options, ready){
		var ft = F.get(table);
		if (ft instanceof F.Table) ft.destroy();
		return new F.Table(table, options, ready);
	};

	/**
	 * Gets the FooTable.Row instance for the supplied element.
	 * @param {(jQuery|jQuery.selector|HTMLTableElement)} element - A jQuery object, selector or the HTMLElement of an element to retrieve the FooTable.Row for.
	 * @returns {FooTable.Row}
	 */
	F.getRow = function(element){
		// to get the FooTable.Row object simply walk up the DOM, find the TR and grab the __FooTableRow__ data value
		var $row = $(element).closest('tr');
		// if this is a detail row get the previous row in the table to get the main TR element
		if ($row.hasClass('footable-detail-row')){
			$row = $row.prev();
		}
		// grab the row object
		return $row.data('__FooTableRow__');
	};

	// The below are external type definitions mainly used as pointers to jQuery docs for important information
	/**
	 * jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API
	 * that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.
	 * @name jQuery
	 * @constructor
	 * @returns {jQuery}
	 * @see {@link http://api.jquery.com/}
	 */

	/**
	 * This object provides a subset of the methods of the Deferred object (then, done, fail, always, pipe, and state) to prevent users from changing the state of the Deferred.
	 * @typedef {object} jQuery.Promise
	 * @see {@link http://api.jquery.com/Types/#Promise}
	 */

	/**
	 * As of jQuery 1.5, the Deferred object provides a way to register multiple callbacks into self-managed callback queues, invoke callback queues as appropriate,
	 * and relay the success or failure state of any synchronous or asynchronous function.
	 * @typedef {object} jQuery.Deferred
	 * @see {@link http://api.jquery.com/Types/#Deferred}
	 */

	/**
	 * jQuery's event system normalizes the event object according to W3C standards. The event object is guaranteed to be passed to the event handler. Most properties from
	 * the original event are copied over and normalized to the new event object.
	 * @typedef {object} jQuery.Event
	 * @see {@link http://api.jquery.com/category/events/event-object/}
	 */

	/**
	 * Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.
	 * @memberof jQuery
	 * @function when
	 * @param {...jQuery.Deferred} deferreds - Any number of deferred objects to wait for.
	 * @returns {jQuery.Promise}
	 * @see {@link http://api.jquery.com/jQuery.when/}
	 */

	/**
	 * The jQuery.fn namespace used to register plugins with jQuery.
	 * @memberof jQuery
	 * @namespace fn
	 * @see {@link http://learn.jquery.com/plugins/basic-plugin-creation/}
	 */
})(
	jQuery,
	/**
	 * The core FooTable namespace containing all the plugin code.
	 * @namespace
	 */
	FooTable = window.FooTable || {}
);
(function(F){
	var returnTrue = function(){ return true; };

	/**
	 * This namespace contains commonly used array utility methods.
	 * @namespace {object} FooTable.arr
	 */
	F.arr = {};

	/**
	 * Iterates over each item in the supplied array and performs the supplied function passing in the current item as the first argument.
	 * @memberof FooTable.arr
	 * @function each
	 * @param {Array} array - The array to iterate
	 * @param {function} func - The function to execute for each item. The first argument supplied to this function is the current item and the second is the current index.
	 */
	F.arr.each = function (array, func) {
		if (!F.is.array(array) || !F.is.fn(func)) return;
		for (var i = 0, len = array.length; i < len; i++) {
			if (func(array[i], i) === false) break;
		}
	};

	/**
	 * Get all items in the supplied array that optionally matches the supplied where function. If no items are found an empty array is returned.
	 * @memberof FooTable.arr
	 * @function get
	 * @param {Array} array - The array to get items from.
	 * @param {function} where - This function must return a boolean value, true includes the item in the result array.
	 * @returns {Array}
	 */
	F.arr.get = function (array, where) {
		var result = [];
		if (!F.is.array(array)) return result;
		if (!F.is.fn(where)) return array;
		for (var i = 0, len = array.length; i < len; i++) {
			if (where(array[i], i)) result.push(array[i]);
		}
		return result;
	};

	/**
	 * Get a boolean value indicating if any item exists in the supplied array that optionally matches the supplied where function.
	 * @memberof FooTable.arr
	 * @function any
	 * @param {Array} array - The array to check.
	 * @param {function} [where] - [Optional] This function must return a boolean value, true indicates that the current item is a valid match.
	 * @returns {boolean}
	 */
	F.arr.any = function (array, where) {
		if (!F.is.array(array)) return false;
		where = F.is.fn(where) ? where : returnTrue;
		for (var i = 0, len = array.length; i < len; i++) {
			if (where(array[i], i)) return true;
		}
		return false;
	};

	/**
	 * Checks if the supplied value exists in the array.
	 * @memberof FooTable.arr
	 * @function contains
	 * @param {Array} array - The array to check.
	 * @param {*} value - The value to check for.
	 * @returns {boolean}
	 */
	F.arr.contains = function(array, value){
		if (!F.is.array(array) || F.is.undef(value)) return false;
		for (var i = 0, len = array.length; i < len; i++) {
			if (array[i] == value) return true;
		}
		return false;
	};

	/**
	 * Get the first item in the supplied array that optionally matches the supplied where function. If no item is found null is returned.
	 * @memberof FooTable.arr
	 * @function first
	 * @param {Array} array - The array to get the item from.
	 * @param {function} [where] - [Optional] This function must return a boolean value, true indicates that the current item can be returned.
	 * @returns {(*|null)}
	 */
	F.arr.first = function (array, where) {
		if (!F.is.array(array)) return null;
		where = F.is.fn(where) ? where : returnTrue;
		for (var i = 0, len = array.length; i < len; i++) {
			if (where(array[i], i)) return array[i];
		}
		return null;
	};

	/**
	 * Creates a new array from the results of the supplied getter function. If no items are found an empty array is returned, to exclude an item from the results return null.
	 * @memberof FooTable.arr
	 * @function map
	 * @param {Array} array - The array to iterate.
	 * @param {function} getter - This function must return either a new value or null.
	 * The first argument is the result being returned at this point in the iteration. The second argument is the current item being iterated.
	 * @returns {(*|null)}
	 */
	F.arr.map = function (array, getter) {
		var result = [], returned = null;
		if (!F.is.array(array) || !F.is.fn(getter)) return result;
		for (var i = 0, len = array.length; i < len; i++) {
			if ((returned = getter(array[i], i)) != null) result.push(returned);
		}
		return result;
	};

	/**
	 * Removes items from the array matching the supplied where function. All removed items are returned in a new array.
	 * @memberof FooTable.arr
	 * @function remove
	 * @param {Array} array - The array to iterate and remove items from.
	 * @param {function} where - This function must return a boolean value, true includes the item in the result array.
	 * @returns {*}
	 */
	F.arr.remove = function (array, where) {
		var remove = [], removed = [];
		if (!F.is.array(array) || !F.is.fn(where)) return removed;
		var i = 0, len = array.length;
		for (; i < len; i++) {
			if (where(array[i], i, removed)){
				remove.push(i);
				removed.push(array[i]);
			}
		}
		// sort the indexes to be removed from largest to smallest
		remove.sort(function(a, b){ return b - a; });
		i = 0; len = remove.length;
		for(; i < len; i++){
			var index = remove[i] - i;
			array.splice(index, 1);
		}
		return removed;
	};

	/**
	 * Deletes a single item from the array. The item if removed is returned.
	 * @memberof FooTable.arr
	 * @function delete
	 * @param {Array} array - The array to iterate and delete the item from.
	 * @param {*} item - The item to find and delete.
	 * @returns {(*|null)}
	 */
	F.arr.delete = function(array, item){
		var remove = -1, removed = null;
		if (!F.is.array(array) || F.is.undef(item)) return removed;
		var i = 0, len = array.length;
		for (; i < len; i++) {
			if (array[i] == item){
				remove = i;
				removed = array[i];
				break;
			}
		}
		if (remove != -1) array.splice(remove, 1);
		return removed;
	};

	/**
	 * Replaces a single item in the array with a new one.
	 * @memberof FooTable.arr
	 * @function replace
	 * @param {Array} array - The array to iterate and replace the item in.
	 * @param {*} oldItem - The item to be replaced.
	 * @param {*} newItem - The item to be inserted.
	 */
	F.arr.replace = function(array, oldItem, newItem){
		var index = array.indexOf(oldItem);
		if (index !== -1) array[index] = newItem;
	};

})(FooTable);
(function (F) {

	/**
	 * This namespace contains commonly used 'is' type methods that return boolean values.
	 * @namespace FooTable.is
	 */
	F.is = {};

	/**
	 * Checks if the type of the value is the same as that supplied.
	 * @memberof FooTable.is
	 * @function type
	 * @param {*} value - The value to check the type of.
	 * @param {string} type - The type to check for.
	 * @returns {boolean}
	 */
	F.is.type = function (value, type) {
		return typeof value === type;
	};

	/**
	 * Checks if the value is defined.
	 * @memberof FooTable.is
	 * @function defined
	 * @param {*} value - The value to check is defined.
	 * @returns {boolean}
	 */
	F.is.defined = function (value) {
		return typeof value !== 'undefined';
	};

	/**
	 * Checks if the value is undefined.
	 * @memberof FooTable.is
	 * @function undef
	 * @param {*} value - The value to check is undefined.
	 * @returns {boolean}
	 */
	F.is.undef = function (value) {
		return typeof value === 'undefined';
	};

	/**
	 * Checks if the value is an array.
	 * @memberof FooTable.is
	 * @function array
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.array = function (value) {
		return '[object Array]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is a date.
	 * @memberof FooTable.is
	 * @function date
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.date = function (value) {
		return '[object Date]' === Object.prototype.toString.call(value) && !isNaN(value.getTime());
	};

	/**
	 * Checks if the value is a boolean.
	 * @memberof FooTable.is
	 * @function boolean
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.boolean = function (value) {
		return '[object Boolean]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is a string.
	 * @memberof FooTable.is
	 * @function string
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.string = function (value) {
		return '[object String]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is a number.
	 * @memberof FooTable.is
	 * @function number
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.number = function (value) {
		return '[object Number]' === Object.prototype.toString.call(value) && !isNaN(value);
	};

	/**
	 * Checks if the value is a function.
	 * @memberof FooTable.is
	 * @function fn
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.fn = function (value) {
		return (F.is.defined(window) && value === window.alert) || '[object Function]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is an error.
	 * @memberof FooTable.is
	 * @function error
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.error = function (value) {
		return '[object Error]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is an object.
	 * @memberof FooTable.is
	 * @function object
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.object = function (value) {
		return '[object Object]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is a hash.
	 * @memberof FooTable.is
	 * @function hash
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.hash = function (value) {
		return F.is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
	};

	/**
	 * Checks if the supplied object is an HTMLElement
	 * @memberof FooTable.is
	 * @function element
	 * @param {object} obj - The object to check.
	 * @returns {boolean}
	 */
	F.is.element = function (obj) {
		return typeof HTMLElement === 'object'
			? obj instanceof HTMLElement
			: obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
	};

	/**
	 * This is a simple check to determine if an object is a jQuery promise object. It simply checks the object has a "then" and "promise" function defined.
	 * The promise object is created as an object literal inside of jQuery.Deferred.
	 * It has no prototype, nor any other truly unique properties that could be used to distinguish it.
	 * This method should be a little more accurate than the internal jQuery one that simply checks for a "promise" method.
	 * @memberof FooTable.is
	 * @function promise
	 * @param {object} obj - The object to check.
	 * @returns {boolean}
	 */
	F.is.promise = function(obj){
		return F.is.object(obj) && F.is.fn(obj.then) && F.is.fn(obj.promise);
	};

	/**
	 * Checks if the supplied object is an instance of a jQuery object.
	 * @memberof FooTable.is
	 * @function jq
	 * @param {object} obj - The object to check.
	 * @returns {boolean}
	 */
	F.is.jq = function(obj){
		return F.is.defined(window.jQuery) && obj instanceof jQuery && obj.length > 0;
	};

	/**
	 * Checks if the supplied object is a moment.js date object.
	 * @memberof FooTable.is
	 * @function moment
	 * @param {object} obj - The object to check.
	 * @returns {boolean}
	 */
	F.is.moment = function(obj){
		return F.is.defined(window.moment) && F.is.object(obj) && F.is.boolean(obj._isAMomentObject)
	};

	/**
	 * Checks if the supplied value is an object and if it is empty.
	 * @memberof FooTable.is
	 * @function emptyObject
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.emptyObject = function(value){
		if (!F.is.hash(value)) return false;
		for(var prop in value) {
			if(value.hasOwnProperty(prop))
				return false;
		}
		return true;
	};

	/**
	 * Checks if the supplied value is an array and if it is empty.
	 * @memberof FooTable.is
	 * @function emptyArray
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.emptyArray = function(value){
		return F.is.array(value) ? value.length === 0 : true;
	};

	/**
	 * Checks if the supplied value is a string and if it is empty.
	 * @memberof FooTable.is
	 * @function emptyString
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.emptyString = function(value){
		return F.is.string(value) ? value.length === 0 : true;
	};

})(FooTable);
(function (F) {
	/**
	 * This namespace contains commonly used string utility methods.
	 * @namespace FooTable.str
	 */
	F.str = {};

	/**
	 * Checks if the supplied string contains the given substring.
	 * @memberof FooTable.str
	 * @function contains
	 * @param {string} str - The string to check.
	 * @param {string} contains - The string to check for.
	 * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
	 * @returns {boolean}
	 */
	F.str.contains = function (str, contains, ignoreCase) {
		if (F.is.emptyString(str) || F.is.emptyString(contains)) return false;
		return contains.length <= str.length
			&& (ignoreCase ? str.toUpperCase().indexOf(contains.toUpperCase()) : str.indexOf(contains)) !== -1;
	};

	/**
	 * Checks if the supplied string contains the exact given substring.
	 * @memberof FooTable.str
	 * @function contains
	 * @param {string} str - The string to check.
	 * @param {string} contains - The string to check for.
	 * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
	 * @returns {boolean}
	 */
	F.str.containsExact = function (str, contains, ignoreCase) {
		if (F.is.emptyString(str) || F.is.emptyString(contains) || contains.length > str.length) return false;
		return new RegExp('\\b'+ F.str.escapeRegExp(contains)+'\\b', ignoreCase ? 'i' : '').test(str);
	};

	/**
	 * Checks if the supplied string contains the given word.
	 * @memberof FooTable.str
	 * @function containsWord
	 * @param {string} str - The string to check.
	 * @param {string} word - The word to check for.
	 * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
	 * @returns {boolean}
	 */
	F.str.containsWord = function(str, word, ignoreCase){
		if (F.is.emptyString(str) || F.is.emptyString(word) || str.length < word.length)
			return false;
		var parts = str.split(/\W/);
		for (var i = 0, len = parts.length; i < len; i++){
			if (ignoreCase ? parts[i].toUpperCase() == word.toUpperCase() : parts[i] == word) return true;
		}
		return false;
	};

	/**
	 * Returns the remainder of a string split on the first index of the given substring.
	 * @memberof FooTable.str
	 * @function from
	 * @param {string} str - The string to split.
	 * @param {string} from - The substring to split on.
	 * @returns {string}
	 */
	F.str.from = function (str, from) {
		if (F.is.emptyString(str)) return str;
		return F.str.contains(str, from) ? str.substring(str.indexOf(from) + 1) : str;
	};

	/**
	 * Checks if a string starts with the supplied prefix.
	 * @memberof FooTable.str
	 * @function startsWith
	 * @param {string} str - The string to check.
	 * @param {string} prefix - The prefix to check for.
	 * @returns {boolean}
	 */
	F.str.startsWith = function (str, prefix) {
		if (F.is.emptyString(str)) return str == prefix;
		return str.slice(0, prefix.length) == prefix;
	};

	/**
	 * Takes the supplied string and converts it to camel case.
	 * @memberof FooTable.str
	 * @function toCamelCase
	 * @param {string} str - The string to camel case.
	 * @returns {string}
	 */
	F.str.toCamelCase = function (str) {
		if (F.is.emptyString(str)) return str;
		if (str.toUpperCase() === str) return str.toLowerCase();
		return str.replace(/^([A-Z])|[-\s_](\w)/g, function (match, p1, p2) {
			if (F.is.string(p2)) return p2.toUpperCase();
			return p1.toLowerCase();
		});
	};

	/**
	 * Generates a random string 9 characters long using the optional prefix if supplied.
	 * @memberof FooTable.str
	 * @function random
	 * @param {string} [prefix] - The prefix to append to the 9 random characters.
	 * @returns {string}
	 */
	F.str.random = function(prefix){
		prefix = F.is.emptyString(prefix) ? '' : prefix;
		return prefix + Math.random().toString(36).substr(2, 9);
	};

	/**
	 * Escapes a string for use in a regular expression.
	 * @memberof FooTable.str
	 * @function escapeRegExp
	 * @param {string} str - The string to escape.
	 * @returns {string}
	 */
	F.str.escapeRegExp = function(str){
		if (F.is.emptyString(str)) return str;
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	};

})(FooTable);
(function (F) {
	"use strict";

	if (!Object.create) {
		Object.create = (function () {
			var Object = function () {};
			return function (prototype) {
				if (arguments.length > 1)
					throw Error('Second argument not supported');

				if (!F.is.object(prototype))
					throw TypeError('Argument must be an object');

				Object.prototype = prototype;
				var result = new Object();
				Object.prototype = null;
				return result;
			};
		})();
	}

	/**
	 * This base implementation does nothing except provide access to the {@link FooTable.Class#extend} method.
	 * @constructs FooTable.Class
	 * @classdesc This class is based off of John Resig's [Simple JavaScript Inheritance]{@link http://ejohn.org/blog/simple-javascript-inheritance} but it has been updated to be ES 5.1
	 * compatible by implementing an [Object.create polyfill]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill}
	 * for older browsers.
	 * @see {@link http://ejohn.org/blog/simple-javascript-inheritance}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill}
	 * @returns {FooTable.Class}
	 */
	function Class() {}

	var __extendable__ = /xyz/.test(function () {xyz;}) ? /\b_super\b/ : /.*/;

	// this._super() within the context of the new function is a pointer to the original function
	// except if the hook param is specified then the this._super variable is the result of the original function
	Class.__extend__ = function(proto, name, func, original){
		// to all who venture here, here be dragons!
		proto[name] = F.is.fn(original) && __extendable__.test(func) ?
			(function (name, fn) {
				return function () {
					var tmp, ret;
					tmp = this._super;
					this._super = original;
					ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			})(name, func) : func;
	};

	/**
	 * Creates a new class that inherits from this class which in turn allows itself to be extended or if a name and function is supplied extends only that specific function on the class.
	 * @param {(object|string)} arg1 - An object containing any new methods/members to implement or the name of the method to extend.
	 * @param {function} arg2 - If the first argument is a method name then this is the new function to replace it with.
	 * @returns {FooTable.Class} A new class that inherits from the base class.
	 * @example <caption>The below shows an example of how to implement inheritance using this method.</caption>
	 * var Person = FooTable.Class.extend({
	 *   construct: function(isDancing){
	 *     this.dancing = isDancing;
	 *   },
	 *   dance: function(){
	 *     return this.dancing;
	 *   }
	 * });
	 *
	 * var Ninja = Person.extend({
	 *   construct: function(){
	 *     this._super( false );
	 *   },
	 *   dance: function(){
	 *     // Call the inherited version of dance()
	 *     return this._super();
	 *   },
	 *   swingSword: function(){
	 *     return true;
	 *   }
	 * });
	 *
	 * var p = new Person(true);
	 * p.dance(); // => true
	 *
	 * var n = new Ninja();
	 * n.dance(); // => false
	 * n.swingSword(); // => true
	 *
	 * // Should all be true
	 * p instanceof Person && p instanceof FooTable.Class &&
	 * n instanceof Ninja && n instanceof Person && n instanceof FooTable.Class
	 */
	Class.extend = function (arg1 , arg2) {
		var args = Array.prototype.slice.call(arguments);
		arg1 = args.shift();
		arg2 = args.shift();

		function __extend__(proto, name, func, original){
			// to all who venture here, here be dragons!
			proto[name] = F.is.fn(original) && __extendable__.test(func) ?
				(function (name, fn, ofn) {
					return function () {
						var tmp, ret;
						tmp = this._super;
						this._super = ofn;
						ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, func, original) : func;
		}

		if (F.is.hash(arg1)){
			var proto = Object.create(this.prototype),
				_super = this.prototype;
			for (var name in arg1) {
				if (name === '__ctor__') continue;
				__extend__(proto, name, arg1[name], _super[name]);
			}
			var obj = F.is.fn(proto.__ctor__) ? proto.__ctor__ : function () {
				if (!F.is.fn(this.construct))
					throw new SyntaxError('FooTable class objects must be constructed with the "new" keyword.');
				this.construct.apply(this, arguments);
			};
			proto.construct = F.is.fn(proto.construct) ? proto.construct : function(){};
			obj.prototype = proto;
			proto.constructor = obj;
			obj.extend = Class.extend;
			return obj;
		} else if (F.is.string(arg1) && F.is.fn(arg2)) {
			__extend__(this.prototype, arg1, arg2, this.prototype[arg1]);
		}
	};

	F.Class = Class;

	F.ClassFactory = F.Class.extend(/** @lends FooTable.ClassFactory */{
		/**
		 * This is a simple factory for {@link FooTable.Class} objects allowing them to be registered using a friendly name
		 * and then new instances can be created using this friendly name.
		 * @constructs
		 * @extends FooTable.Class
		 * @returns {FooTable.ClassFactory}
		 * @this FooTable.ClassFactory
		 */
		construct: function(){
			/**
			 * An object containing all registered classes.
			 * @type {{}}
			 */
			this.registered = {};
		},
		/**
		 * Checks if the factory contains a class registered using the supplied name.
		 * @instance
		 * @param {string} name - The name of the class to check.
		 * @returns {boolean}
		 * @this FooTable.ClassFactory
		 */
		contains: function(name){
			return F.is.defined(this.registered[name]);
		},
		/**
		 * Gets an array of all registered names.
		 * @instance
		 * @returns {Array.<string>}
		 * @this FooTable.ClassFactory
		 */
		names: function(){
			var names = [], name;
			for (name in this.registered){
				if (!this.registered.hasOwnProperty(name)) continue;
				names.push(name);
			}
			return names;
		},
		/**
		 * Registers a class object using the supplied friendly name and priority. The priority is only taken into account when loading all registered classes
		 * using the {@link FooTable.ClassFactory#load} method.
		 * @instance
		 * @param {string} name - The friendly name of the class.
		 * @param {function} klass - The class to register.
		 * @param {number} priority - This determines the order that the class is created when using the {@link FooTable.ClassFactory#load} method, higher values are loaded first.
		 * @this FooTable.ClassFactory
		 */
		register: function(name, klass, priority){
			if (!F.is.string(name) || !F.is.fn(klass)) return;
			var current = this.registered[name];
			this.registered[name] = {
				name: name,
				klass: klass,
				priority: F.is.number(priority) ? priority : (F.is.defined(current) ? current.priority : 0)
			};
		},
		/**
		 * Creates new instances of all registered classes using there priority and the supplied arguments to return them in an array.
		 * @instance
		 * @param {object} subs - An object containing classes to substitute on load.
		 * @param {*} arg1 - The first argument to supply when creating new instances of all registered classes.
		 * @param {*} [argN...] - Any number of additional arguments to supply when creating new instances of all registered classes.
		 * @returns {Array.<FooTable.Class>}
		 * @this FooTable.ClassFactory
		 */
		load: function(subs, arg1, argN){
			var self = this, args = Array.prototype.slice.call(arguments), reg = [], loaded = [], name, klass;
			subs = args.shift() || {};
			for (name in self.registered){
				if (!self.registered.hasOwnProperty(name)) continue;
				var component = self.registered[name];
				if (subs.hasOwnProperty(name)){
					klass = subs[name];
					if (F.is.string(klass)) klass = F.getFnPointer(subs[name]);
					if (F.is.fn(klass)){
						component = {name: name, klass: klass, priority: self.registered[name].priority};
					}
				}
				reg.push(component);
			}
			for (name in subs){
				if (!subs.hasOwnProperty(name) || self.registered.hasOwnProperty(name)) continue;
				klass = subs[name];
				if (F.is.string(klass)) klass = F.getFnPointer(subs[name]);
				if (F.is.fn(klass)){
					reg.push({name: name, klass: klass, priority: 0});
				}
			}
			reg.sort(function(a, b){ return b.priority - a.priority; });
			F.arr.each(reg, function(r){
				if (F.is.fn(r.klass)){
					loaded.push(self._make(r.klass, args));
				}
			});
			return loaded;
		},
		/**
		 * Create a new instance of a single class using the supplied name and arguments.
		 * @instance
		 * @param {string} name - The name of the class to create.
		 * @param {*} arg1 - The first argument to supply to the new instance.
		 * @param {*} [argN...] - Any number of additional arguments to supply to the new instance.
		 * @returns {FooTable.Class}
		 * @this FooTable.ClassFactory
		 */
		make: function(name, arg1, argN){
			var self = this, args = Array.prototype.slice.call(arguments), reg;
			name = args.shift();
			reg = self.registered[name];
			if (F.is.fn(reg.klass)){
				return self._make(reg.klass, args);
			}
			return null;
		},
		/**
		 * This in effect lets us use the "apply" method on a function using the "new" keyword.
		 * @instance
		 * @private
		 * @param {function} klass
		 * @param args
		 * @returns {FooTable.Class}
		 * @this FooTable.ClassFactory
		 */
		_make: function(klass, args){
			function Class() {
				return klass.apply(this, args);
			}
			Class.prototype = klass.prototype;
			return new Class();
		}
	});

})(FooTable);
(function($, F){

	/**
	 * Converts the supplied cssText string into JSON object.
	 * @param {string} cssText - The cssText to convert to a JSON object.
	 * @returns {object}
	 */
	F.css2json = function(cssText){
		if (F.is.emptyString(cssText)) return {};
		var json = {}, props = cssText.split(';'), pair, key, value;
		for (var i = 0, i_len = props.length; i < i_len; i++){
			if (F.is.emptyString(props[i])) continue;
			pair = props[i].split(':');
			if (F.is.emptyString(pair[0]) || F.is.emptyString(pair[1])) continue;
			key = F.str.toCamelCase($.trim(pair[0]));
			value = $.trim(pair[1]);
			json[key] = value;
		}
		return json;
	};

	/**
	 * Attempts to retrieve a function pointer using the given name.
	 * @param {string} functionName - The name of the function to fetch a pointer to.
	 * @returns {(function|object|null)}
	 */
	F.getFnPointer = function(functionName){
		if (F.is.emptyString(functionName)) return null;
		var pointer = window,
			parts = functionName.split('.');
		F.arr.each(parts, function(part){
			if (pointer[part]) pointer = pointer[part];
		});
		return F.is.fn(pointer) ? pointer : null;
	};

	/**
	 * Checks the value for function properties such as the {@link FooTable.Column#formatter} option which could also be specified using just the name
	 * and attempts to return the correct function pointer or null if none was found matching the value.
	 * @param {FooTable.Class} self - The class to use as the 'this' keyword within the context of the function.
	 * @param {(function|string)} value - The actual function or the name of the function for the property.
	 * @param {function} [def] - A default function to return if none is found.
	 * @returns {(function|null)}
	 */
	F.checkFnValue = function(self, value, def){
		def = F.is.fn(def) ? def : null;
		function wrap(t, fn, d){
			if (!F.is.fn(fn)) return d;
			return function(){
				return fn.apply(t, arguments);
			};
		}
		return F.is.fn(value) ? wrap(self, value, def) : (F.is.type(value, 'string') ? wrap(self, F.getFnPointer(value), def) : def);
	};

})(jQuery, FooTable);
(function($, F){

	F.Cell = F.Class.extend(/** @lends FooTable.Cell */{
		/**
		 * The cell class containing all the properties for cells.
		 * @constructs
		 * @extends FooTable.Class
		 * @param {FooTable.Table} table -  The root {@link FooTable.Table} this cell belongs to.
		 * @param {FooTable.Row} row - The parent {@link FooTable.Row} this cell belongs to.
		 * @param {FooTable.Column} column - The {@link FooTable.Column} this cell falls under.
		 * @param {(*|HTMLElement|jQuery)} valueOrElement - Either the value or the element for the cell.
		 * @returns {FooTable.Cell}
		 * @this FooTable.Cell
		 */
		construct: function (table, row, column, valueOrElement) {
			/**
			 * The root {@link FooTable.Table} for the cell.
			 * @instance
			 * @readonly
			 * @type {FooTable.Table}
			 */
			this.ft = table;
			/**
			 * The parent {@link FooTable.Row} for the cell.
			 * @instance
			 * @readonly
			 * @type {FooTable.Row}
			 */
			this.row = row;
			/**
			 * The {@link FooTable.Column} this cell falls under.
			 * @instance
			 * @readonly
			 * @type {FooTable.Column}
			 */
			this.column = column;
			this.created = false;
			this.define(valueOrElement);
		},
		/**
		 * This is supplied either the value or the cell element/jQuery object if it exists.
		 * If supplied the element we need set the $el property and parse the value from it.
		 * @instance
		 * @protected
		 * @param {(*|jQuery)} valueOrElement - The value or element to define the cell.
		 * @this FooTable.Cell
		 */
		define: function(valueOrElement){
			/**
			 * The jQuery table cell object this instance wraps.
			 * @instance
			 * @type {jQuery}
			 */
			this.$el = F.is.element(valueOrElement) || F.is.jq(valueOrElement) ? $(valueOrElement) : null;
			/**
			 * The jQuery row object that represents this cell in the details table.
			 * @type {jQuery}
			 */
			this.$detail = null;

			var hasOptions = F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options) && F.is.defined(valueOrElement.value);

			/**
			 * The value of the cell.
			 * @instance
			 * @type {*}
			 */
			this.value = this.column.parser.call(this.column, F.is.jq(this.$el) ? this.$el : (hasOptions ? valueOrElement.value : valueOrElement), this.ft.o);

			/**
			 * Contains any options for the cell. These are the options supplied through the plugin constructor as part of the row object itself.
			 * @type {object}
			 */
			this.o = $.extend(true, {
				classes: null,
				style: null
			}, hasOptions ? valueOrElement.options : {});
			/**
			 * An array of CSS classes for the cell.
			 * @instance
			 * @protected
			 * @type {Array.<string>}
			 */
			this.classes = F.is.jq(this.$el) && this.$el.attr('class') ? this.$el.attr('class').match(/\S+/g) : (F.is.array(this.o.classes) ? this.o.classes : (F.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : []));
			/**
			 * The inline styles for the cell.
			 * @instance
			 * @protected
			 * @type {object}
			 */
			this.style = F.is.jq(this.$el) && this.$el.attr('style') ? F.css2json(this.$el.attr('style')) : (F.is.hash(this.o.style) ? this.o.style : (F.is.string(this.o.style) ? F.css2json(this.o.style) : {}));
		},
		/**
		 * After the cell has been defined this ensures that the $el and #detail properties are jQuery objects by either creating or updating them.
		 * @instance
		 * @protected
		 * @this FooTable.Cell
		 */
		$create: function(){
			if (this.created) return;
			(this.$el = F.is.jq(this.$el) ? this.$el : $('<td/>'))
				.data('value', this.value)
				.contents().detach().end()
				.append(this.format(this.value));

			this._setClasses(this.$el);
			this._setStyle(this.$el);

			this.$detail = $('<tr/>').addClass(this.row.classes.join(' '))
				.data('__FooTableCell__', this)
				.append($('<th/>'))
				.append($('<td/>'));

			this.created = true;
		},
		/**
		 * Collapses this cell and displays it in the details row.
		 * @instance
		 * @protected
		 */
		collapse: function(){
			if (!this.created) return;
			this.$detail.children('th').html(this.column.title);
			this.$el.clone()
				.attr('id', this.$el.attr('id') ? this.$el.attr('id') + '-detail' : undefined)
				.css('display', 'table-cell')
				.html('')
				.append(this.$el.contents().detach())
				.replaceAll(this.$detail.children('td').first());

			if (!F.is.jq(this.$detail.parent()))
				this.$detail.appendTo(this.row.$details.find('.footable-details > tbody'));
		},
		/**
		 * Restores this cell from a detail row back into the normal row.
		 * @instance
		 * @protected
		 */
		restore: function(){
			if (!this.created) return;
			if (F.is.jq(this.$detail.parent())){
				var $cell = this.$detail.children('td').first();
				this.$el
					.attr('class', $cell.attr('class'))
					.attr('style', $cell.attr('style'))
					.css('display', (this.column.hidden || !this.column.visible) ? 'none' : 'table-cell')
					.append($cell.contents().detach());
			}
			this.$detail.detach();
		},
		/**
		 * Helper method to call this cell's column parser function supplying the required parameters.
		 * @instance
		 * @protected
		 * @returns {*}
		 * @see FooTable.Column#parser
		 * @this FooTable.Cell
		 */
		parse: function(){
			return this.column.parser.call(this.column, this.$el, this.ft.o);
		},
		/**
		 * Helper method to call this cell's column formatter function using the supplied value and any additional required parameters.
		 * @instance
		 * @protected
		 * @param {*} value - The value to format.
		 * @returns {(string|HTMLElement|jQuery)}
		 * @see FooTable.Column#formatter
		 * @this FooTable.Cell
		 */
		format: function(value){
			return this.column.formatter.call(this.column, value, this.ft.o, this.row.value);
		},
		/**
		 * Allows easy access to getting or setting the cell's value. If the value is set all associated properties are also updated along with the actual element.
		 * Using this method also allows us to supply an object containing options and the value for the cell.
		 * @instance
		 * @param {*} [value] - The value to set for the cell. If not supplied the current value of the cell is returned.
		 * @param {boolean} [redraw=true] - Whether or not to redraw the row once the value has been set.
		 * @param {boolean} [redrawSelf=true] - Whether or not to redraw the cell itself once the value has been set, if `false` this will override the supplied `redraw` value and prevent the row from redrawing as well.
		 * @returns {(*|undefined)}
		 * @this FooTable.Cell
		 */
		val: function(value, redraw, redrawSelf){
			if (F.is.undef(value)){
				// get
				return this.value;
			}
			// set
			var self = this, hasOptions = F.is.hash(value) && F.is.hash(value.options) && F.is.defined(value.value);
			this.o = $.extend(true, {
				classes: self.classes,
				style: self.style
			}, hasOptions ? value.options : {});

			this.value = hasOptions ? value.value : value;
			this.classes = F.is.array(this.o.classes) ? this.o.classes : (F.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : []);
			this.style = F.is.hash(this.o.style) ? this.o.style : (F.is.string(this.o.style) ? F.css2json(this.o.style) : {});

			redrawSelf = F.is.boolean(redrawSelf) ? redrawSelf : true;
			if (this.created && redrawSelf){
				this.$el.data('value', this.value).empty();

				var $detail = this.$detail.children('td').first().empty(),
					$target = F.is.jq(this.$detail.parent()) ? $detail : this.$el;

				$target.append(this.format(this.value));

				this._setClasses($target);
				this._setStyle($target);

				if (F.is.boolean(redraw) ? redraw : true) this.row.draw();
			}
		},
		_setClasses: function($el){
			var hasColClasses = !F.is.emptyArray(this.column.classes),
				hasClasses = !F.is.emptyArray(this.classes),
				classes = null;
			$el.removeAttr('class');
			if (!hasColClasses && !hasClasses) return;
			if (hasColClasses && hasClasses){
				classes = this.classes.concat(this.column.classes).join(' ');
			} else if (hasColClasses) {
				classes = this.column.classes.join(' ');
			} else if (hasClasses){
				classes = this.classes.join(' ');
			}
			if (!F.is.emptyString(classes)){
				$el.addClass(classes);
			}
		},
		_setStyle: function($el){
			var hasColStyle = !F.is.emptyObject(this.column.style),
				hasStyle = !F.is.emptyObject(this.style),
				style = null;
			$el.removeAttr('style');
			if (!hasColStyle && !hasStyle) return;
			if (hasColStyle && hasStyle){
				style = $.extend({}, this.column.style, this.style);
			} else if (hasColStyle) {
				style = this.column.style;
			} else if (hasStyle){
				style = this.style;
			}
			if (F.is.hash(style)){
				$el.css(style);
			}
		}
	});

})(jQuery, FooTable);
(function($, F){

	F.Column = F.Class.extend(/** @lends FooTable.Column */{
		/**
		 * The column class containing all the properties for columns. All members marked as "readonly" should not be used when defining {@link FooTable.Defaults#columns}.
		 * @constructs
		 * @extends FooTable.Class
		 * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this component belongs to.
		 * @param {object} definition - An object containing all the properties to set for the column.
		 * @param {string} [type] - The type of column, "text" by default.
		 * @returns {FooTable.Column}
		 * @this FooTable.Column
		 */
		construct: function(instance, definition, type){
			/**
			 * The root {@link FooTable.Table} for the column.
			 * @instance
			 * @readonly
			 * @type {FooTable.Table}
			 */
			this.ft = instance;
			/**
			 * The type of data displayed by the column.
			 * @instance
			 * @readonly
			 * @type {string}
			 */
			this.type = F.is.emptyString(type) ? 'text' : type;
			/**
			 * Whether or not the column was parsed from a standard table row containing data instead of from an actual header row.
			 * @instance
			 * @readonly
			 * @type {boolean}
			 */
			this.virtual = F.is.boolean(definition.virtual) ? definition.virtual : false;
			/**
			 * The jQuery cell object for the column header.
			 * @instance
			 * @readonly
			 * @type {jQuery}
			 */
			this.$el = F.is.jq(definition.$el) ? definition.$el : null;
			/**
			 * The index of the column in the table. This is set by the plugin during initialization.
			 * @instance
			 * @readonly
			 * @type {number}
			 * @default -1
			 */
			this.index = F.is.number(definition.index) ? definition.index : -1;
			/**
			 * Whether or not this in an internal only column.
			 * @instance
			 * @readonly
			 * @type {boolean}
			 * @description Internal columns or there cells will not be returned when calling methods such as `FooTable.Row#val`.
			 */
			this.internal = false;
			this.define(definition);
			this.$create();
		},
		/**
		 * This is supplied the column definition in the form of a simple object created by merging options supplied via the plugin constructor with those parsed from the DOM.
		 * @instance
		 * @protected
		 * @param {object} definition - The object containing the column definition.
		 * @this FooTable.Column
		 */
		define: function(definition){
			/**
			 * Whether or not this column is hidden from view and appears in the details row.
			 * @type {boolean}
			 * @default false
			 */
			this.hidden = F.is.boolean(definition.hidden) ? definition.hidden : false;
			/**
			 * Whether or not this column is completely hidden from view and will not appear in the details row.
			 * @type {boolean}
			 * @default true
			 */
			this.visible = F.is.boolean(definition.visible) ? definition.visible : true;

			/**
			 * The name of the column. This name must correspond to the property name of the JSON row data.
			 * @type {string}
			 * @default null
			 */
			this.name = F.is.string(definition.name) ? definition.name : null;
			if (this.name == null) this.name = 'col'+(definition.index+1);
			/**
			 * The title to display in the column header, this can be HTML.
			 * @type {string}
			 * @default null
			 */
			this.title = F.is.string(definition.title) ? definition.title : null;
			if (!this.virtual && this.title == null && F.is.jq(this.$el)) this.title = this.$el.html();
			if (this.title == null) this.title = 'Column '+(definition.index+1);
			/**
			 * The styles to apply to all cells in this column.
			 * @type {object}
			 */
			this.style = F.is.hash(definition.style) ? definition.style : (F.is.string(definition.style) ? F.css2json(definition.style) : {});
			/**
			 * The classes to apply to all cells in this column.
			 * @type {Array.<string>}
			 */
			this.classes = F.is.array(definition.classes) ? definition.classes : (F.is.string(definition.classes) ? definition.classes.match(/\S+/g) : []);

			// override any default functions ensuring when they are executed "this" within the context of the function points to the instance of this object.
			this.parser = F.checkFnValue(this, definition.parser, this.parser);
			this.formatter = F.checkFnValue(this, definition.formatter, this.formatter);
		},
		/**
		 * After the column has been defined this ensures that the $el property is a jQuery object by either creating or updating the current value.
		 * @instance
		 * @protected
		 * @this FooTable.Column
		 */
		$create: function(){
			(this.$el = !this.virtual && F.is.jq(this.$el) ? this.$el : $('<th/>')).html(this.title).addClass(this.classes.join(' ')).css(this.style);
		},
		/**
		 * This is supplied either the cell value or jQuery object to parse. Any value can be returned from this method and will be provided to the {@link FooTable.Column#format} function
		 * to generate the cell contents.
		 * @instance
		 * @protected
		 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
		 * @returns {string}
		 * @this FooTable.Column
		 */
		parser: function(valueOrElement){
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)){ // use jQuery to get the value
				var data = $(valueOrElement).data('value');
				return F.is.defined(data) ? data : $(valueOrElement).html();
			}
			if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement+''; // use the native toString of the value
			return null; // otherwise we have no value so return null
		},
		/**
		 * This is supplied the value retrieved from the {@link FooTable.Column#parse} function and must return a string, HTMLElement or jQuery object.
		 * The return value from this function is what is displayed in the cell in the table.
		 * @instance
		 * @protected
		 * @param {string} value - The value to format.
		 * @param {object} options - The current plugin options.
		 * @param {object} rowData - An object containing the current row data.
		 * @returns {(string|HTMLElement|jQuery)}
		 * @this FooTable.Column
		 */
		formatter: function(value, options, rowData){
			return value == null ? '' : value;
		},
		/**
		 * Creates a cell for this column from the supplied {@link FooTable.Row} object. This allows different column types to return different types of cells.
		 * @instance
		 * @protected
		 * @param {FooTable.Row} row - The row to create the cell from.
		 * @returns {FooTable.Cell}
		 * @this FooTable.Column
		 */
		createCell: function(row){
			var element = F.is.jq(row.$el) ? row.$el.children('td,th').get(this.index) : null,
				data = F.is.hash(row.value) ? row.value[this.name] : null;
			return new F.Cell(this.ft, row, this, element || data);
		}
	});

	F.columns = new F.ClassFactory();

	F.columns.register('text', F.Column);

})(jQuery, FooTable);
(function ($, F) {

	F.Component = F.Class.extend(/** @lends FooTable.Component */{
		/**
		 * The base class for all FooTable components.
		 * @constructs
		 * @extends FooTable.Class
		 * @param {FooTable.Table} instance - The parent {@link FooTable.Table} object for the component.
		 * @param {boolean} enabled - Whether or not the component is enabled.
		 * @throws {TypeError} The instance parameter must be an instance of {@link FooTable.Table}.
		 * @returns {FooTable.Component}
		 */
		construct: function (instance, enabled) {
			if (!(instance instanceof F.Table))
				throw new TypeError('The instance parameter must be an instance of FooTable.Table.');

			/**
			 * The parent {@link FooTable.Table} for the component.
			 * @type {FooTable.Table}
			 */
			this.ft = instance;
			/**
			 * Whether or not this component is enabled. Disabled components only have there preinit method called allowing for this value to be overridden.
			 * @type {boolean}
			 */
			this.enabled = F.is.boolean(enabled) ? enabled : false;
		},
		/**
		 * The preinit method is called during the parent {@link FooTable.Table} constructor call.
		 * @param {object} data - The jQuery.data() object of the root table.
		 * @instance
		 * @protected
		 * @function
		 */
		preinit: function(data){},
		/**
		 * The init method is called during the parent {@link FooTable.Table} constructor call.
		 * @instance
		 * @protected
		 * @function
		 */
		init: function(){},
		/**
		 * This method is called from the {@link FooTable.Table#destroy} method.
		 * @instance
		 * @protected
		 * @function
		 */
		destroy: function(){},
		/**
		 * This method is called from the {@link FooTable.Table#draw} method.
		 * @instance
		 * @protected
		 * @function
		 */
		predraw: function(){},
		/**
		 * This method is called from the {@link FooTable.Table#draw} method.
		 * @instance
		 * @protected
		 * @function
		 */
		draw: function(){},
		/**
		 * This method is called from the {@link FooTable.Table#draw} method.
		 * @instance
		 * @protected
		 * @function
		 */
		postdraw: function(){}
	});

	F.components = new F.ClassFactory();

})(jQuery, FooTable);
(function ($, F) {
	/**
	 * Contains all the available options for the FooTable plugin.
	 * @name FooTable.Defaults
	 * @function
	 * @constructor
	 * @returns {FooTable.Defaults}
	 */
	F.Defaults = function () {
		/**
		 * Whether or not events raised using the {@link FooTable.Table#raise} method are propagated up the DOM. By default this is set to false and all events bubble up the DOM as per usual
		 * however the reason for this option is if we have nested tables. If false the parent table would receive all the events raised by it's children and any handlers bound to both the
		 * parent and child would be triggered which is not the desired behavior.
		 * @type {boolean}
		 * @default false
		 */
		this.stopPropagation = false;
		/**
		 * An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
		 * @type {object.<string, function>}
		 * @default NULL
		 * @example <caption>This example shows how to pass an object containing the events and handlers.</caption>
		 * "on": {
		 * 	"click": function(e){
		 * 		// bind a custom click event to do something whenever the table is clicked
		 * 	},
		 * 	"init.ft.table": function(e, ft){
		 * 		// bind to the FooTable initialize event to do something
		 * 	}
		 * }
		 */
		this.on = null;
	};

	/**
	 * Contains all the default options for the plugin.
	 * @type {FooTable.Defaults}
	 */
	F.defaults = new F.Defaults();

})(jQuery, FooTable);
(function($, F){

	F.Row = F.Class.extend(/** @lends FooTable.Row */{
		/**
		 * The row class containing all the properties for a row and its' cells.
		 * @constructs
		 * @extends FooTable.Class
		 * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
		 * @param {Array.<FooTable.Column>} columns - The array of {@link FooTable.Column} for this row.
		 * @param {(*|HTMLElement|jQuery)} dataOrElement - Either the data for the row (create) or the element (parse) for the row.
		 * @returns {FooTable.Row}
		 */
		construct: function (table, columns, dataOrElement) {
			/**
			 * The {@link FooTable.Table} for the row.
			 * @type {FooTable.Table}
			 */
			this.ft = table;
			/**
			 * The array of {@link FooTable.Column} for this row.
			 * @type {Array.<FooTable.Column>}
			 */
			this.columns = columns;

			this.created = false;
			this.define(dataOrElement);
		},
		/**
		 * This is supplied either the object containing the values for the row or the row element/jQuery object if it exists.
		 * If supplied the element we need to set the $el property and parse the cells from it using the column index.
		 * If we have an object we parse the cells from it using the column name.
		 * @param {(object|jQuery)} dataOrElement - The row object or element to define the row.
		 */
		define: function(dataOrElement){
			/**
			 * The jQuery table row object this instance wraps.
			 * @instance
			 * @protected
			 * @type {jQuery}
			 */
			this.$el = F.is.element(dataOrElement) || F.is.jq(dataOrElement) ? $(dataOrElement) : null;
			/**
			 * The jQuery toggle element for the row.
			 * @instance
			 * @protected
			 * @type {jQuery}
			 */
			this.$toggle = $('<span/>', {'class': 'footable-toggle fooicon fooicon-plus'});

			var isObj = F.is.hash(dataOrElement),
				hasOptions = isObj && F.is.hash(dataOrElement.options) && F.is.hash(dataOrElement.value);

			/**
			 * The value of the row.
			 * @instance
			 * @protected
			 * @type {Object}
			 */
			this.value = isObj ? (hasOptions ? dataOrElement.value : dataOrElement) : null;

			/**
			 * Contains any options for the row.
			 * @type {object}
			 */
			this.o = $.extend(true, {
				expanded: false,
				classes: null,
				style: null
			}, hasOptions ? dataOrElement.options : {});

			/**
			 * Whether or not this row is expanded and will display it's detail row when there are any hidden columns.
			 * @instance
			 * @protected
			 * @type {boolean}
			 */
			this.expanded = F.is.jq(this.$el) ? (this.$el.data('expanded') || this.o.expanded) : this.o.expanded;
			/**
			 * An array of CSS classes for the row.
			 * @instance
			 * @protected
			 * @type {Array.<string>}
			 */
			this.classes = F.is.jq(this.$el) && this.$el.attr('class') ? this.$el.attr('class').match(/\S+/g) : (F.is.array(this.o.classes) ? this.o.classes : (F.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : []));
			/**
			 * The inline styles for the row.
			 * @instance
			 * @protected
			 * @type {object}
			 */
			this.style = F.is.jq(this.$el) && this.$el.attr('style') ? F.css2json(this.$el.attr('style')) : (F.is.hash(this.o.style) ? this.o.style : (F.is.string(this.o.style) ? F.css2json(this.o.style) : {}));

			/**
			 * The cells array. This is populated before the call to the {@link FooTable.Row#$create} method.
			 * @instance
			 * @type {Array.<FooTable.Cell>}
			 */
			this.cells = this.createCells();

			// this ensures the value contains the parsed cell values and not the supplied values
			var self = this;
			self.value = {};
			F.arr.each(self.cells, function(cell){
				self.value[cell.column.name] = cell.val();
			});
		},
		/**
		 * After the row has been defined this ensures that the $el property is a jQuery object by either creating or updating the current value.
		 * @instance
		 * @protected
		 * @this FooTable.Row
		 */
		$create: function(){
			if (this.created) return;
			(this.$el = F.is.jq(this.$el) ? this.$el : $('<tr/>'))
				.data('__FooTableRow__', this);

			this._setClasses(this.$el);
			this._setStyle(this.$el);

			if (this.ft.rows.toggleColumn == 'last') this.$toggle.addClass('last-column');

			this.$details = $('<tr/>', { 'class': 'footable-detail-row' })
				.append($('<td/>', { colspan: this.ft.columns.visibleColspan })
					.append($('<table/>', { 'class': 'footable-details ' + this.ft.classes.join(' ') })
						.append('<tbody/>')));

			var self = this;
			F.arr.each(self.cells, function(cell){
				if (!cell.created) cell.$create();
				self.$el.append(cell.$el);
			});
			self.$el.off('click.ft.row').on('click.ft.row', { self: self }, self._onToggle);
			this.created = true;
		},
		/**
		 * This is called during the construct method and uses the current column definitions to create an array of {@link FooTable.Cell} objects for the row.
		 * @instance
		 * @protected
		 * @returns {Array.<FooTable.Cell>}
		 * @this FooTable.Row
		 */
		createCells: function(){
			var self = this;
			return F.arr.map(self.columns, function(col){
				return col.createCell(self);
			});
		},
		/**
		 * Allows easy access to getting or setting the row's data. If the data is set all associated properties are also updated along with the actual element.
		 * Using this method also allows us to supply an object containing options and the data for the row at the same time.
		 * @instance
		 * @param {object} [data] - The data to set for the row. If not supplied the current value of the row is returned.
		 * @param {boolean} [redraw=true] - Whether or not to redraw the table once the value has been set.
		 * @param {boolean} [redrawSelf=true] - Whether or not to redraw the row itself once the value has been set, if `false` this will override the supplied `redraw` value and prevent the table from redrawing as well.
		 * @returns {(*|undefined)}
		 */
		val: function(data, redraw, redrawSelf){
			var self = this;
			if (!F.is.hash(data)){
				// get - check the value property and build it from the cells if required.
				if (!F.is.hash(this.value) || F.is.emptyObject(this.value)){
					this.value = {};
					F.arr.each(this.cells, function(cell){
						if (!cell.column.internal){
							self.value[cell.column.name] = cell.val();
						}
					});
				}
				return this.value;
			}
			// set
			this.collapse(false);
			var isObj = F.is.hash(data),
				hasOptions = isObj && F.is.hash(data.options) && F.is.hash(data.value);

			this.o = $.extend(true, {
				expanded: self.expanded,
				classes: self.classes,
				style: self.style
			}, hasOptions ? data.options : {});

			this.expanded = this.o.expanded;
			this.classes = F.is.array(this.o.classes) ? this.o.classes : (F.is.string(this.o.classes) ? this.o.classes.match(/\S+/g) : []);
			this.style = F.is.hash(this.o.style) ? this.o.style : (F.is.string(this.o.style) ? F.css2json(this.o.style) : {});
			if (isObj) {
				if ( hasOptions ) data = data.value;
				if (F.is.hash(this.value)){
					for (var prop in data) {
						if (!data.hasOwnProperty(prop)) continue;
						this.value[prop] = data[prop];
					}
				} else {
					this.value = data;
				}
			} else {
				this.value = null;
			}

			redrawSelf = F.is.boolean(redrawSelf) ? redrawSelf : true;
			F.arr.each(this.cells, function(cell){
				if (!cell.column.internal && F.is.defined(self.value[cell.column.name])){
					cell.val(self.value[cell.column.name], false, redrawSelf);
				}
			});

			if (this.created && redrawSelf){
				this._setClasses(this.$el);
				this._setStyle(this.$el);
				if (F.is.boolean(redraw) ? redraw : true) this.draw();
			}
		},
		_setClasses: function($el){
			var hasClasses = !F.is.emptyArray(this.classes),
				classes = null;
			$el.removeAttr('class');
			if (!hasClasses) return;
			else classes = this.classes.join(' ');
			if (!F.is.emptyString(classes)){
				$el.addClass(classes);
			}
		},
		_setStyle: function($el){
			var hasStyle = !F.is.emptyObject(this.style),
				style = null;
			$el.removeAttr('style');
			if (!hasStyle) return;
			else style = this.style;
			if (F.is.hash(style)){
				$el.css(style);
			}
		},
		/**
		 * Sets the current row to an expanded state displaying any hidden columns in a detail row just below it.
		 * @instance
		 * @fires FooTable.Row#"expand.ft.row"
		 */
		expand: function(){
			if (!this.created) return;
			var self = this;
			/**
			 * The expand.ft.row event is raised before the the row is expanded.
			 * Calling preventDefault on this event will stop the row being expanded.
			 * @event FooTable.Row#"expand.ft.row"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {FooTable.Row} row - The row about to be expanded.
			 */
			self.ft.raise('expand.ft.row',[self]).then(function(){
				self.__hidden__ = F.arr.map(self.cells, function(cell){
					return cell.column.hidden && cell.column.visible ? cell : null;
				});

				if (self.__hidden__.length > 0){
					self.$details.insertAfter(self.$el)
						.children('td').first()
						.attr('colspan', self.ft.columns.visibleColspan);

					F.arr.each(self.__hidden__, function(cell){
						cell.collapse();
					});
				}
				self.$el.attr('data-expanded', true);
				self.$toggle.removeClass('fooicon-plus').addClass('fooicon-minus');
				self.expanded = true;
				self.ft.raise('expanded.ft.row', [self]);
			});
		},
		/**
		 * Sets the current row to a collapsed state removing the detail row if it exists.
		 * @instance
		 * @param {boolean} [setExpanded] - Whether or not to set the {@link FooTable.Row#expanded} property to false.
		 * @fires FooTable.Row#"collapse.ft.row"
		 */
		collapse: function(setExpanded){
			if (!this.created) return;
			var self = this;
			/**
			 * The collapse.ft.row event is raised before the the row is collapsed.
			 * Calling preventDefault on this event will stop the row being collapsed.
			 * @event FooTable.Row#"collapse.ft.row"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {FooTable.Row} row - The row about to be expanded.
			 */
			self.ft.raise('collapse.ft.row',[self]).then(function(){
				F.arr.each(self.__hidden__, function(cell){
					cell.restore();
				});
				self.$details.detach();
				self.$el.removeAttr('data-expanded');
				self.$toggle.removeClass('fooicon-minus').addClass('fooicon-plus');
				if (F.is.boolean(setExpanded) ? setExpanded : true) self.expanded = false;
				self.ft.raise('collapsed.ft.row', [self]);
			});
		},
		/**
		 * Prior to drawing this moves the details contents back to there original cells and detaches the toggle element from the row.
		 * @instance
		 * @param {boolean} [detach] - Whether or not to detach the row.
		 * @this FooTable.Row
		 */
		predraw: function(detach){
			if (this.created){
				if (this.expanded){
					this.collapse(false);
				}
				this.$toggle.detach();
				detach = F.is.boolean(detach) ? detach : true;
				if (detach) this.$el.detach();
			}
		},
		/**
		 * Draws the current row and cells.
		 * @instance
		 * @this FooTable.Row
		 */
		draw: function($parent){
			if (!this.created) this.$create();
			if (F.is.jq($parent)) $parent.append(this.$el);
			var self = this;
			F.arr.each(self.cells, function(cell){
				cell.$el.css('display', (cell.column.hidden || !cell.column.visible  ? 'none' : 'table-cell'));
				if (self.ft.rows.showToggle && self.ft.columns.hasHidden){
					if ((self.ft.rows.toggleColumn == 'first' && cell.column.index == self.ft.columns.firstVisibleIndex)
						|| (self.ft.rows.toggleColumn == 'last' && cell.column.index == self.ft.columns.lastVisibleIndex)) {
						cell.$el.prepend(self.$toggle);
					}
				}
				cell.$el.add(cell.column.$el).removeClass('footable-first-visible footable-last-visible');
				if (cell.column.index == self.ft.columns.firstVisibleIndex){
					cell.$el.add(cell.column.$el).addClass('footable-first-visible');
				}
				if (cell.column.index == self.ft.columns.lastVisibleIndex){
					cell.$el.add(cell.column.$el).addClass('footable-last-visible');
				}
			});
			if (this.expanded){
				this.expand();
			}
		},
		/**
		 * Toggles the row between it's expanded and collapsed state if there are hidden columns.
		 * @instance
		 * @this FooTable.Row
		 */
		toggle: function(){
			if (this.created && this.ft.columns.hasHidden){
				if (this.expanded) this.collapse();
				else this.expand();
			}
		},
		/**
		 * Handles the toggle click event for rows.
		 * @instance
		 * @param {jQuery.Event} e - The jQuery.Event object for the click event.
		 * @private
		 * @this jQuery
		 */
		_onToggle: function (e) {
			var self = e.data.self;
			// only execute the toggle if the event.target is one of the approved initiators
			if ($(e.target).is(self.ft.rows.toggleSelector)){
				self.toggle();
			}
		}
	});

})(jQuery, FooTable);

(function ($, F) {

	/**
	 * An array of all currently loaded instances of the plugin.
	 * @protected
	 * @readonly
	 * @type {Array.<FooTable.Table>}
	 */
	F.instances = [];

	F.Table = F.Class.extend(/** @lends FooTable.Table */{
		/**
		 * This class is the core of the plugin and drives the logic of all components.
		 * @constructs
		 * @this FooTable.Table
		 * @extends FooTable.Class
		 * @param {(HTMLTableElement|jQuery)} element - The element or jQuery table object to bind the plugin to.
		 * @param {object} options - The options to initialize the plugin with.
		 * @param {function} [ready] - A callback function to execute once the plugin is initialized.
		 * @returns {FooTable.Table}
		 */
		construct: function (element, options, ready) {
			//BEGIN MEMBERS
			/**
			 * The timeout ID for the resize event.
			 * @instance
			 * @private
			 * @type {?number}
			 */
			this._resizeTimeout = null;
			/**
			 * The ID of the FooTable instance.
			 * @instance
			 * @type {number}
			 */
			this.id = F.instances.push(this);
			/**
			 * Whether or not the plugin and all components and add-ons are fully initialized.
			 * @instance
			 * @type {boolean}
			 */
			this.initialized = false;
			/**
			 * The jQuery table object the plugin is bound to.
			 * @instance
			 * @type {jQuery}
			 */
			this.$el = (F.is.jq(element) ? element : $(element)).first(); // ensure one table, one instance
			/**
			 * A loader jQuery instance
			 * @instance
			 * @type {jQuery}
			 */
			this.$loader = $('<div/>', { 'class': 'footable-loader' }).append($('<span/>', {'class': 'fooicon fooicon-loader'}));
			/**
			 * The options for the plugin. This is a merge of user defined options and the default options.
			 * @instance
			 * @type {object}
			 */
			this.o = $.extend(true, {}, F.defaults, options);
			/**
			 * The jQuery data object for the table at initialization.
			 * @instance
			 * @type {object}
			 */
			this.data = this.$el.data() || {};
			/**
			 * An array of all CSS classes on the table that do not start with "footable".
			 * @instance
			 * @protected
			 * @type {Array.<string>}
			 */
			this.classes = [];
			/**
			 * All components for this instance of the plugin. These are executed in the order they appear in the array for the initialize phase and in reverse order for the destroy phase of the plugin.
			 * @instance
			 * @protected
			 * @type {object}
			 * @prop {Array.<FooTable.Component>} internal - The internal components for the plugin. These are executed either before all other components in the initialize phase or after them in the destroy phase of the plugin.
			 * @prop {Array.<FooTable.Component>} core - The core components for the plugin. These are executed either after the internal components in the initialize phase or before them in the destroy phase of the plugin.
			 * @prop {Array.<FooTable.Component>} custom - The custom components for the plugin. These are executed either after the core components in the initialize phase or before them in the destroy phase of the plugin.
			 */
			this.components = F.components.load((F.is.hash(this.data.components) ? this.data.components : this.o.components), this);
			/**
			 * The breakpoints component for this instance of the plugin.
			 * @instance
			 * @type {FooTable.Breakpoints}
			 */
			this.breakpoints = this.use(FooTable.Breakpoints);
			/**
			 * The columns component for this instance of the plugin.
			 * @instance
			 * @type {FooTable.Columns}
			 */
			this.columns = this.use(FooTable.Columns);
			/**
			 * The rows component for this instance of the plugin.
			 * @instance
			 * @type {FooTable.Rows}
			 */
			this.rows = this.use(FooTable.Rows);

			//END MEMBERS
			this._construct(ready);
		},
		/**
		 * Once all properties are set this performs the actual initialization of the plugin calling the {@link FooTable.Table#_preinit} and
		 * {@link FooTable.Table#_init} methods as well as raising the {@link FooTable.Table#"ready.ft.table"} event.
		 * @this FooTable.Table
		 * @instance
		 * @param {function} [ready] - A callback function to execute once the plugin is initialized.
		 * @private
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Table#"ready.ft.table"
		 */
		_construct: function(ready){
			var self = this;
			return this._preinit().then(function(){
				return self._init().then(function(){
					/**
					 * The ready.ft.table event is raised after the plugin has been initialized and the table drawn.
					 * Calling preventDefault on this event will stop the ready callback being executed.
					 * @event FooTable.Table#"ready.ft.table"
					 * @param {jQuery.Event} e - The jQuery.Event object for the event.
					 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
					 */
					return self.raise('ready.ft.table').then(function(){
						if (F.is.fn(ready)) ready.call(self, self);
					});
				});
			}).always(function(arg){
				self.$el.show();
				if (F.is.error(arg)){
					console.error('FooTable: unhandled error thrown during initialization.', arg);
				}
			});
		},
		/**
		 * The preinit method is called prior to the plugins actual initialization and provides itself and it's components an opportunity to parse any additional option values.
		 * @instance
		 * @private
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Table#"preinit.ft.table"
		 */
		_preinit: function(){
			var self = this;
			/**
			 * The preinit.ft.table event is raised before any components.
			 * Calling preventDefault on this event will disable the entire plugin.
			 * @event FooTable.Table#"preinit.ft.table"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {object} data - The jQuery data object from the root table element.
			 */
			return this.raise('preinit.ft.table', [self.data]).then(function(){
				var classes = (self.$el.attr('class') || '').match(/\S+/g) || [];

				self.o.ajax = F.checkFnValue(self, self.data.ajax, self.o.ajax);
				self.o.stopPropagation = F.is.boolean(self.data.stopPropagation)
					? self.data.stopPropagation
					: self.o.stopPropagation;

				for (var i = 0, len = classes.length; i < len; i++){
					if (!F.str.startsWith(classes[i], 'footable')) self.classes.push(classes[i]);
				}

				self.$el.hide().after(self.$loader);
				return self.execute(false, false, 'preinit', self.data);
			});
		},
		/**
		 * Initializes this instance of the plugin and calls the callback function if one is supplied once complete.
		 * @this FooTable.Table
		 * @instance
		 * @private
		 * @return {jQuery.Promise}
		 * @fires FooTable.Table#"init.ft.table"
		 */
		_init: function(){
			var self = this;
			/**
			 * The init.ft.table event is raised before any components are initialized.
			 * Calling preventDefault on this event will disable the entire plugin.
			 * @event FooTable.Table#"init.ft.table"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			return self.raise('init.ft.table').then(function(){
				var $thead = self.$el.children('thead'),
					$tbody = self.$el.children('tbody'),
					$tfoot = self.$el.children('tfoot');
				self.$el.addClass('footable footable-' + self.id);
				if (F.is.hash(self.o.on)) self.$el.on(self.o.on);
				if ($tfoot.length == 0) self.$el.append($tfoot = $('<tfoot/>'));
				if ($tbody.length == 0) self.$el.append('<tbody/>');
				if ($thead.length == 0) self.$el.prepend($thead = $('<thead/>'));
				return self.execute(false, true, 'init').then(function(){
					self.$el.data('__FooTable__', self);
					if ($tfoot.children('tr').length == 0) $tfoot.remove();
					if ($thead.children('tr').length == 0) $thead.remove();

					/**
					 * The postinit.ft.table event is raised after any components are initialized but before the table is
					 * drawn for the first time.
					 * Calling preventDefault on this event will disable the initial drawing of the table.
					 * @event FooTable.Table#"postinit.ft.table"
					 * @param {jQuery.Event} e - The jQuery.Event object for the event.
					 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
					 */
					return self.raise('postinit.ft.table').then(function(){
						return self.draw();
					}).always(function(){
						$(window).off('resize.ft'+self.id, self._onWindowResize)
							.on('resize.ft'+self.id, { self: self }, self._onWindowResize);
						self.initialized = true;
					});
				});
			});
		},
		/**
		 * Destroys this plugin removing it from the table.
		 * @this FooTable.Table
		 * @instance
		 * @fires FooTable.Table#"destroy.ft.table"
		 */
		destroy: function () {
			var self = this;
			/**
			 * The destroy.ft.table event is called before all core components.
			 * Calling preventDefault on this event will prevent the entire plugin from being destroyed.
			 * @event FooTable.Table#"destroy.ft.table"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			return self.raise('destroy.ft.table').then(function(){
				return self.execute(true, true, 'destroy').then(function () {
					self.$el.removeData('__FooTable__').removeClass('footable-' + self.id);
					if (F.is.hash(self.o.on)) self.$el.off(self.o.on);
					$(window).off('resize.ft'+self.id, self._onWindowResize);
					self.initialized = false;
					F.instances[self.id] = null;
				});
			}).fail(function(err){
				if (F.is.error(err)){
					console.error('FooTable: unhandled error thrown while destroying the plugin.', err);
				}
			});
		},
		/**
		 * Raises an event on this instance supplying the args array as additional parameters to the handlers.
		 * @this FooTable.Table
		 * @instance
		 * @param {string} eventName - The name of the event to raise, this can include namespaces.
		 * @param {Array} [args] - An array containing additional parameters to be passed to any bound handlers.
		 * @returns {jQuery.Event}
		 */
		raise: function(eventName, args){
			var self = this,
				debug = F.__debug__ && (F.is.emptyArray(F.__debug_options__.events) || F.arr.any(F.__debug_options__.events, function(name){ return F.str.contains(eventName, name); }));
			args = args || [];
			args.unshift(this);
			return $.Deferred(function(d){
				var evt = $.Event(eventName);
				if (self.o.stopPropagation == true){
					self.$el.one(eventName, function (e) {e.stopPropagation();});
				}
				if (debug) console.log('FooTable:'+eventName+': ', args);
				self.$el.trigger(evt, args);
				if (evt.isDefaultPrevented()){
					if (debug) console.log('FooTable: default prevented for the "'+eventName+'" event.');
					d.reject(evt);
				}	else d.resolve(evt);
			});
		},
		/**
		 * Attempts to retrieve the instance of the supplied component type for this instance.
		 * @this FooTable.Table
		 * @instance
		 * @param {object} type - The content type to retrieve for this instance.
		 * @returns {(*|null)}
		 */
		use: function(type){
			for (var i = 0, len = this.components.length; i < len; i++){
				if (this.components[i] instanceof type) return this.components[i];
			}
			return null;
		},
		/**
		 * Performs the drawing of the table.
		 * @this FooTable.Table
		 * @instance
		 * @protected
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Table#"predraw.ft.table"
		 * @fires FooTable.Table#"draw.ft.table"
		 * @fires FooTable.Table#"postdraw.ft.table"
		 */
		draw: function () {
			var self = this;

			// Clone the current table and insert it into the original's place
			var $elCopy = self.$el.clone().insertBefore(self.$el);

			// Detach `self.$el` from the DOM, retaining its event handlers
			self.$el.detach();

			// when drawing the order that the components are executed is important so chain the methods but use promises to retain async safety.
			return self.execute(false, true, 'predraw').then(function(){
				/**
				 * The predraw.ft.table event is raised after all core components and add-ons have executed there predraw functions but before they execute there draw functions.
				 * @event FooTable.Table#"predraw.ft.table"
				 * @param {jQuery.Event} e - The jQuery.Event object for the event.
				 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
				 */
				return self.raise('predraw.ft.table').then(function(){
					return self.execute(false, true, 'draw').then(function(){
						/**
						 * The draw.ft.table event is raised after all core components and add-ons have executed there draw functions.
						 * @event FooTable.Table#"draw.ft.table"
						 * @param {jQuery.Event} e - The jQuery.Event object for the event.
						 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
						 */
						return self.raise('draw.ft.table').then(function(){
							return self.execute(false, true, 'postdraw').then(function(){
								/**
								 * The postdraw.ft.table event is raised after all core components and add-ons have executed there postdraw functions.
								 * @event FooTable.Table#"postdraw.ft.table"
								 * @param {jQuery.Event} e - The jQuery.Event object for the event.
								 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
								 */
								return self.raise('postdraw.ft.table');
							});
						});
					});
				});
			}).fail(function(err){
				if (F.is.error(err)){
					console.error('FooTable: unhandled error thrown during a draw operation.', err);
				}
			}).always(function(){
				// Replace the copy that we added above with the modified `self.$el`
				$elCopy.replaceWith(self.$el);
				self.$loader.remove();
			});
		},
		/**
		 * Executes the specified method with the optional number of parameters on all components and waits for the promise from each to be resolved before executing the next.
		 * @this FooTable.Table
		 * @instance
		 * @protected
		 * @param {boolean} reverse - Whether or not to execute the component methods in the reverse order to what they were registered in.
		 * @param {boolean} enabled - Whether or not to execute the method on enabled components only.
		 * @param {string} methodName - The name of the method to execute.
		 * @param {*} [param1] - The first parameter for the method.
		 * @param {...*} [paramN] - Any number of additional parameters for the method.
		 * @returns {jQuery.Promise}
		 */
		execute: function(reverse, enabled, methodName, param1, paramN){
			var self = this, args = Array.prototype.slice.call(arguments);
			reverse = args.shift();
			enabled = args.shift();
			var components = enabled ? F.arr.get(self.components, function(c){ return c.enabled; }) : self.components.slice(0);
			args.unshift(reverse ? components.reverse() : components);
			return self._execute.apply(self, args);
		},
		/**
		 * Executes the specified method with the optional number of parameters on all supplied components waiting for the result of each before executing the next.
		 * @this FooTable.Table
		 * @instance
		 * @private
		 * @param {Array.<FooTable.Component>} components - The components to call the method on.
		 * @param {string} methodName - The name of the method to execute
		 * @param {*} [param1] - The first parameter for the method.
		 * @param {...*} [paramN] - Any additional parameters for the method.
		 * @returns {jQuery.Promise}
		 */
		_execute: function(components, methodName, param1, paramN){
			if (!components || !components.length) return $.when();
			var self = this, args = Array.prototype.slice.call(arguments),
				component;
			components = args.shift();
			methodName = args.shift();
			component = components.shift();

			if (!F.is.fn(component[methodName]))
				return self._execute.apply(self, [components, methodName].concat(args));

			return $.Deferred(function(d){
				try {
					var result = component[methodName].apply(component, args);
					if (F.is.promise(result)){
						return result.then(d.resolve, d.reject);
					} else {
						d.resolve(result);
					}
				} catch (err) {
					d.reject(err);
				}
			}).then(function(){
				return self._execute.apply(self, [components, methodName].concat(args));
			});
		},
		/**
		 * Listens to the window resize event and performs a check to see if the breakpoint has changed.
		 * @this window
		 * @instance
		 * @private
		 * @fires FooTable.Table#"resize.ft.table"
		 */
		_onWindowResize: function (e) {
			var self = e.data.self;
			if (self._resizeTimeout != null) { clearTimeout(self._resizeTimeout); }
			self._resizeTimeout = setTimeout(function () {
				self._resizeTimeout = null;
				/**
				 * The resize event is raised a short time after window resize operations cease.
				 * @event FooTable.Table#"resize.ft.table"
				 * @param {jQuery.Event} e - The jQuery.Event object for the event.
				 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
				 */
				self.raise('resize.ft.table').then(function(){
					self.breakpoints.check();
				});
			}, 300);
		}
	});

})(jQuery, FooTable);
(function($, F){

	F.ArrayColumn = F.Column.extend(/** @lends FooTable.ArrayColumn */{
		/**
		 * @summary A column to handle Array values.
		 * @constructs
		 * @extends FooTable.Column
		 * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this column belongs to.
		 * @param {object} definition - An object containing all the properties to set for the column.
		 */
		construct: function(instance, definition) {
			this._super(instance, definition, 'array');
		},
		/**
		 * @summary Parses the supplied value or element to retrieve a column value.
		 * @description This is supplied either the cell value or jQuery object to parse. This method will return either the Array containing the values or null.
		 * @instance
		 * @protected
		 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
		 * @returns {(array|null)}
		 */
		parser: function(valueOrElement){
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)){ // use jQuery to get the value
				var $el = $(valueOrElement), data = $el.data('value'); // .data() will automatically convert a JSON string to an array
				if (F.is.array(data)) return data;
				data = $el.html();
				try {
					data = JSON.parse(data);
				} catch(err) {
					data = null;
				}
				return F.is.array(data) ? data : null; // if we have an array return it
			}
			if (F.is.array(valueOrElement)) return valueOrElement; // if we have an array return it
			return null; // otherwise we have no value so return null
		},
		/**
		 * @summary Formats the column value and creates the HTML seen within a cell.
		 * @description This is supplied the value retrieved from the {@link FooTable.ArrayColumn#parser} function and must return a string, HTMLElement or jQuery object.
		 * The return value from this function is what is displayed in the cell in the table.
		 * @instance
		 * @protected
		 * @param {?Array} value - The value to format.
		 * @param {object} options - The current plugin options.
		 * @param {object} rowData - An object containing the current row data.
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		formatter: function(value, options, rowData){
			return F.is.array(value) ? JSON.stringify(value) : '';
		}
	});

	F.columns.register('array', F.ArrayColumn);

})(jQuery, FooTable);
(function($, F){

	if (F.is.undef(window.moment)){
		// The DateColumn requires moment.js to parse and format date values. Goto http://momentjs.com/ to get it.
		return;
	}

	F.DateColumn = F.Column.extend(/** @lends FooTable.DateColumn */{
		/**
		 * The date column class is used to handle date values. This column is dependent on [moment.js]{@link http://momentjs.com/} to provide date parsing and formatting functionality.
		 * @constructs
		 * @extends FooTable.Column
		 * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this column belongs to.
		 * @param {object} definition - An object containing all the properties to set for the column.
		 * @returns {FooTable.DateColumn}
		 */
		construct: function(instance, definition){
			this._super(instance, definition, 'date');
			/**
			 * The format string to use when parsing and formatting dates.
			 * @instance
			 * @type {string}
			 */
			this.formatString = F.is.string(definition.formatString) ? definition.formatString : 'MM-DD-YYYY';
		},
		/**
		 * This is supplied either the cell value or jQuery object to parse. Any value can be returned from this method and will be provided to the {@link FooTable.DateColumn#format} function
		 * to generate the cell contents.
		 * @instance
		 * @protected
		 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
		 * @returns {(moment|null)}
		 * @this FooTable.DateColumn
		 */
		parser: function(valueOrElement){
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)){
				var data = $(valueOrElement).data('value');
				valueOrElement = F.is.defined(data) ? data : $(valueOrElement).text();
				if (F.is.string(valueOrElement)) valueOrElement = isNaN(valueOrElement) ? valueOrElement : +valueOrElement;
			}
			if (F.is.date(valueOrElement)) return moment(valueOrElement);
			if (F.is.object(valueOrElement) && F.is.boolean(valueOrElement._isAMomentObject)) return valueOrElement;
			if (F.is.string(valueOrElement)){
				// if it looks like a number convert it and do nothing else otherwise create a new moment using the string value and formatString
				if (isNaN(valueOrElement)){
					return moment(valueOrElement, this.formatString);
				} else {
					valueOrElement = +valueOrElement;
				}
			}
			if (F.is.number(valueOrElement)){
				return moment(valueOrElement);
			}
			return null;
		},
		/**
		 * This is supplied the value retrieved from the {@link FooTable.DateColumn#parser} function and must return a string, HTMLElement or jQuery object.
		 * The return value from this function is what is displayed in the cell in the table.
		 * @instance
		 * @protected
		 * @param {*} value - The value to format.
		 * @param {object} options - The current plugin options.
		 * @param {object} rowData - An object containing the current row data.
		 * @returns {(string|HTMLElement|jQuery)}
		 * @this FooTable.DateColumn
		 */
		formatter: function(value, options, rowData){
			return F.is.object(value) && F.is.boolean(value._isAMomentObject) && value.isValid() ? value.format(this.formatString) : '';
		},
		/**
		 * This is supplied either the cell value or jQuery object to parse. A string value must be returned from this method and will be used during filtering operations.
		 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
		 * @returns {string}
		 * @this FooTable.DateColumn
		 */
		filterValue: function(valueOrElement){
			// if we have an element or a jQuery object use jQuery to get the value
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)) valueOrElement = $(valueOrElement).data('filterValue') || $(valueOrElement).text();
			// if options are supplied with the value
			if (F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options)){
				if (F.is.string(valueOrElement.options.filterValue)) valueOrElement = valueOrElement.options.filterValue;
				if (F.is.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
			}
			// if the value is a moment object just return the formatted value
			if (F.is.object(valueOrElement) && F.is.boolean(valueOrElement._isAMomentObject)) return valueOrElement.format(this.formatString);
			// if its a string
			if (F.is.string(valueOrElement)){
				// if its not a number return it
				if (isNaN(valueOrElement)){
					return valueOrElement;
				} else { // otherwise convert it and carry on
					valueOrElement = +valueOrElement;
				}
			}
			// if the value is a number or date convert to a moment object and return the formatted result.
			if (F.is.number(valueOrElement) || F.is.date(valueOrElement)){
				return moment(valueOrElement).format(this.formatString);
			}
			// try use the native toString of the value if its not undefined or null
			if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement+'';
			return ''; // otherwise we have no value so return an empty string
		}
	});

	F.columns.register('date', F.DateColumn);

})(jQuery, FooTable);

(function($, F){

	F.HTMLColumn = F.Column.extend(/** @lends FooTable.HTMLColumn */{
		/**
		 * The HTML column class is used to handle any raw HTML columns.
		 * @constructs
		 * @extends FooTable.Column
		 * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this column belongs to.
		 * @param {object} definition - An object containing all the properties to set for the column.
		 * @returns {FooTable.HTMLColumn}
		 */
		construct: function(instance, definition){
			this._super(instance, definition, 'html');
		},
		/**
		 * This is supplied either the cell value or jQuery object to parse. Any value can be returned from this method and will be provided to the {@link FooTable.HTMLColumn#format} function
		 * to generate the cell contents.
		 * @instance
		 * @protected
		 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
		 * @returns {(jQuery|null)}
		 * @this FooTable.HTMLColumn
		 */
		parser: function(valueOrElement){
			if (F.is.string(valueOrElement)) valueOrElement = $($.trim(valueOrElement));
			if (F.is.element(valueOrElement)) valueOrElement = $(valueOrElement);
			if (F.is.jq(valueOrElement)){
				var tagName = valueOrElement.prop('tagName').toLowerCase();
				if (tagName == 'td' || tagName == 'th'){
					var data = valueOrElement.data('value');
					return F.is.defined(data) ? data : valueOrElement.contents();
				}
				return valueOrElement;
			}
			return null;
		}
	});

	F.columns.register('html', F.HTMLColumn);

})(jQuery, FooTable);
(function($, F){

	F.NumberColumn = F.Column.extend(/** @lends FooTable.NumberColumn */{
		/**
		 * The number column class is used to handle simple number columns.
		 * @constructs
		 * @extends FooTable.Column
		 * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this column belongs to.
		 * @param {object} definition - An object containing all the properties to set for the column.
		 * @returns {FooTable.NumberColumn}
		 */
		construct: function(instance, definition){
			this._super(instance, definition, 'number');
			this.decimalSeparator = F.is.string(definition.decimalSeparator) ? definition.decimalSeparator : '.';
			this.thousandSeparator = F.is.string(definition.thousandSeparator) ? definition.thousandSeparator : ',';
			this.decimalSeparatorRegex = new RegExp(F.str.escapeRegExp(this.decimalSeparator), 'g');
			this.thousandSeparatorRegex = new RegExp(F.str.escapeRegExp(this.thousandSeparator), 'g');
			this.cleanRegex = new RegExp('[^\-0-9' + F.str.escapeRegExp(this.decimalSeparator) + ']', 'g');
		},
		/**
		 * This is supplied either the cell value or jQuery object to parse. Any value can be returned from this method and will be provided to the {@link FooTable.Column#formatter} function
		 * to generate the cell contents.
		 * @instance
		 * @protected
		 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
		 * @returns {(number|null)}
		 * @this FooTable.NumberColumn
		 */
		parser: function(valueOrElement){
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)){
				var data = $(valueOrElement).data('value');
				valueOrElement = F.is.defined(data) ? data : $(valueOrElement).text().replace(this.cleanRegex, '');
			}
			if (F.is.string(valueOrElement)){
				valueOrElement = valueOrElement.replace(this.thousandSeparatorRegex, '').replace(this.decimalSeparatorRegex, '.');
				valueOrElement = parseFloat(valueOrElement);
			}
			if (F.is.number(valueOrElement)) return valueOrElement;
			return null;
		},
		/**
		 * This is supplied the value retrieved from the {@link FooTable.NumberColumn#parse} function and must return a string, HTMLElement or jQuery object.
		 * The return value from this function is what is displayed in the cell in the table.
		 * @instance
		 * @protected
		 * @param {number} value - The value to format.
		 * @param {object} options - The current plugin options.
		 * @param {object} rowData - An object containing the current row data.
		 * @returns {(string|HTMLElement|jQuery)}
		 * @this FooTable.NumberColumn
		 */
		formatter: function(value, options, rowData){
			if (value == null) return '';
			var s = (value + '').split('.');
			if (s.length == 2 && s[0].length > 3) {
				s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.thousandSeparator);
			}
			return s.join(this.decimalSeparator);
		}
	});

	F.columns.register('number', F.NumberColumn);

})(jQuery, FooTable);
(function($, F){

	F.ObjectColumn = F.Column.extend(/** @lends FooTable.ObjectColumn */{
		/**
		 * @summary A column to handle Object values.
		 * @constructs
		 * @extends FooTable.Column
		 * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this column belongs to.
		 * @param {object} definition - An object containing all the properties to set for the column.
		 */
		construct: function(instance, definition) {
			this._super(instance, definition, 'object');
		},
		/**
		 * @summary Parses the supplied value or element to retrieve a column value.
		 * @description This is supplied either the cell value or jQuery object to parse. This method will return either the Object containing the values or null.
		 * @instance
		 * @protected
		 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
		 * @returns {(object|null)}
		 */
		parser: function(valueOrElement){
			if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)){ // use jQuery to get the value
				var $el = $(valueOrElement), data = $el.data('value'); // .data() will automatically convert a JSON string to an object
				if (F.is.object(data)) return data;
				data = $el.html();
				try {
					data = JSON.parse(data);
				} catch(err) {
					data = null;
				}
				return F.is.object(data) ? data : null; // if we have an object return it
			}
			if (F.is.object(valueOrElement)) return valueOrElement; // if we have an object return it
			return null; // otherwise we have no value so return null
		},
		/**
		 * @summary Formats the column value and creates the HTML seen within a cell.
		 * @description This is supplied the value retrieved from the {@link FooTable.ObjectColumn#parser} function and must return a string, HTMLElement or jQuery object.
		 * The return value from this function is what is displayed in the cell in the table.
		 * @instance
		 * @protected
		 * @param {*} value - The value to format.
		 * @param {object} options - The current plugin options.
		 * @param {object} rowData - An object containing the current row data.
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		formatter: function(value, options, rowData){
			return F.is.object(value) ? JSON.stringify(value) : '';
		}
	});

	F.columns.register('object', F.ObjectColumn);

})(jQuery, FooTable);
(function($, F){

	F.Breakpoint = F.Class.extend(/** @lends FooTable.Breakpoint */{
		/**
		 * The breakpoint class containing the name and maximum width for the breakpoint.
		 * @constructs
		 * @extends FooTable.Class
		 * @param {string} name - The name of the breakpoint. Must contain no spaces or special characters.
		 * @param {number} width - The width of the breakpoint in pixels.
		 * @returns {FooTable.Breakpoint}
		 */
		construct: function(name, width){
			/**
			 * The name of the breakpoint.
			 * @type {string}
			 */
			this.name = name;
			/**
			 * The maximum width of the breakpoint in pixels.
			 * @type {number}
			 */
			this.width = width;
		}
	});

})(jQuery, FooTable);
(function($, F){
	F.Breakpoints = F.Component.extend(/** @lends FooTable.Breakpoints */{
		/**
		 * Contains the logic to calculate and apply breakpoints for the plugin.
		 * @constructs
		 * @extends FooTable.Component
		 * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
		 * @returns {FooTable.Breakpoints}
		 */
		construct: function(table){
			// call the base class constructor
			this._super(table, true);

			/* PROTECTED */
			/**
			 * This provides a shortcut to the {@link FooTable.Table#options} object.
			 * @protected
			 * @type {FooTable.Table#options}
			 */
			this.o = table.o;

			/* PUBLIC */
			/**
			 * The current breakpoint.
			 * @type {FooTable.Breakpoint}
			 */
			this.current = null;
			/**
			 * An array of {@link FooTable.Breakpoint} objects created from parsing the options.
			 * @type {Array.<FooTable.Breakpoint>}
			 */
			this.array = [];
			/**
			 * Whether or not breakpoints cascade. When set to true all breakpoints larger than the current will be hidden along with it.
			 * @type {boolean}
			 */
			this.cascade = this.o.cascade;
			/**
			 * Whether or not to calculate breakpoints on the width of the parent element rather than the viewport.
			 * @type {boolean}
			 */
			this.useParentWidth = this.o.useParentWidth;
			/**
			 * This value is updated each time the current breakpoint changes and contains a space delimited string of the names of the current breakpoint and all those smaller than it.
			 * @type {string}
			 */
			this.hidden = null;

			/* PRIVATE */
			/**
			 * This value is set once when the {@link FooTable.Breakpoints#array} is generated and contains a space delimited string of all the breakpoint class names.
			 * @type {string}
			 * @private
			 */
			this._classNames = '';

			// check if a function was supplied to override the default getWidth
			this.getWidth = F.checkFnValue(this, this.o.getWidth, this.getWidth);
		},

		/* PROTECTED */
		/**
		 * Checks the supplied data and options for the breakpoints component.
		 * @instance
		 * @protected
		 * @param {object} data - The jQuery data object from the parent table.
		 * @fires FooTable.Breakpoints#"preinit.ft.breakpoints"
		 */
		preinit: function(data){
			var self = this;
			/**
			 * The preinit.ft.breakpoints event is raised before any UI is created and provides the tables jQuery data object for additional options parsing.
			 * Calling preventDefault on this event will disable the entire plugin.
			 * @event FooTable.Breakpoints#"preinit.ft.breakpoints"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {object} data - The jQuery data object of the table raising the event.
			 */
			return this.ft.raise('preinit.ft.breakpoints', [data]).then(function(){
				self.cascade = F.is.boolean(data.cascade) ? data.cascade : self.cascade;
				self.o.breakpoints = F.is.hash(data.breakpoints) ? data.breakpoints : self.o.breakpoints;
				self.getWidth = F.checkFnValue(self, data.getWidth, self.getWidth);
				if (self.o.breakpoints == null) self.o.breakpoints = { "xs": 480, "sm": 768, "md": 992, "lg": 1200 };
				// Create a nice friendly array to work with out of the breakpoints object.
				for (var name in self.o.breakpoints) {
					if (!self.o.breakpoints.hasOwnProperty(name)) continue;
					self.array.push(new F.Breakpoint(name, self.o.breakpoints[name]));
					self._classNames += 'breakpoint-' + name + ' ';
				}
				// Sort the breakpoints so the largest is checked first
				self.array.sort(function (a, b) {
					return b.width - a.width;
				});
			});
		},
		/**
		 * Initializes the class parsing the options into a sorted array of {@link FooTable.Breakpoint} objects.
		 * @instance
		 * @protected
		 * @fires FooTable.Breakpoints#"init.ft.breakpoints"
		 */
		init: function(){
			var self = this;
			/**
			 * The init.ft.breakpoints event is raised before any UI is generated.
			 * Calling preventDefault on this event will disable the entire plugin.
			 * @event FooTable.Breakpoints#"init.ft.breakpoints"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			return this.ft.raise('init.ft.breakpoints').then(function(){
				self.current = self.get();
			});
		},
		/**
		 * Whenever the table is drawn this ensures the correct breakpoint class is applied to the table.
		 * @instance
		 * @protected
		 */
		draw: function(){
			this.ft.$el.removeClass(this._classNames).addClass('breakpoint-' + this.current.name);
		},

		/* PUBLIC */
		/**
		 * Calculates the current breakpoint from the {@link FooTable.Breakpoints#array} and sets the {@link FooTable.Breakpoints#current} property.
		 * @instance
		 * @returns {FooTable.Breakpoint}
		 */
		calculate: function(){
			var self = this, current = null, hidden = [], breakpoint, prev = null, width = self.getWidth();
			for (var i = 0, len = self.array.length; i < len; i++) {
				breakpoint = self.array[i];
				// if the width is smaller than the smallest breakpoint set the smallest as the current.
				// if the width is larger than the largest breakpoint set the largest as the current.
				// otherwise if the width is somewhere in between check all breakpoints testing if the width
				// is greater than the current but smaller than the previous.
				if ((!current && i == len -1)
					|| (width >= breakpoint.width && (prev instanceof F.Breakpoint ? width < prev.width : true))) {
					current = breakpoint;
				}
				if (!current) hidden.push(breakpoint.name);
				prev = breakpoint;
			}
			hidden.push(current.name);
			self.hidden = hidden.join(' ');
			return current;
		},
		/**
		 * Supplied a columns breakpoints this returns a boolean value indicating whether or not the column is visible.
		 * @param {string} breakpoints - A space separated string of breakpoint names.
		 * @returns {boolean}
		 */
		visible: function(breakpoints){
			if (F.is.emptyString(breakpoints)) return true;
			if (breakpoints === 'all') return false;
			var parts = breakpoints.split(' '), i = 0, len = parts.length;
			for (; i < len; i++){
				if (this.cascade ? F.str.containsWord(this.hidden, parts[i]) : parts[i] == this.current.name) return false;
			}
			return true;
		},
		/**
		 * Performs a check between the current breakpoint and the previous breakpoint and performs a redraw if they differ.
		 * @instance
		 * @fires FooTable.Breakpoints#"before.ft.breakpoints"
		 * @fires FooTable.Breakpoints#"after.ft.breakpoints"
		 */
		check: function(){
			var self = this, bp = self.get();
			if (!(bp instanceof F.Breakpoint)
				|| bp == self.current)
				return;

			/**
			 * The before.ft.breakpoints event is raised if the breakpoint has changed but before the UI is redrawn and is supplied both the current breakpoint
			 * and the next "new" one that is about to be applied.
			 * Calling preventDefault on this event will prevent the next breakpoint from being applied.
			 * @event FooTable.Breakpoints#"before.ft.breakpoints"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {FooTable.Breakpoint} current - The current breakpoint.
			 * @param {FooTable.Breakpoint} next - The breakpoint that is about to be applied.
			 */
			self.ft.raise('before.ft.breakpoints', [self.current, bp]).then(function(){
				var previous = self.current;
				self.current = bp;
				return self.ft.draw().then(function(){
					/**
					 * The after.ft.breakpoints event is raised after the breakpoint has changed and the UI is redrawn and is supplied both the "new" current breakpoint
					 * and the previous one that was replaced.
					 * @event FooTable.Breakpoints#"after.ft.breakpoints"
					 * @param {jQuery.Event} e - The jQuery.Event object for the event.
					 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
					 * @param {FooTable.Breakpoint} current - The current breakpoint.
					 * @param {FooTable.Breakpoint} previous - The breakpoint that was just replaced.
					 */
					self.ft.raise('after.ft.breakpoints', [self.current, previous]);
				});
			});
		},
		/**
		 * Attempts to return a {@link FooTable.Breakpoint} instance when passed a {@link FooTable.Breakpoint},
		 * the {@link FooTable.Breakpoint#name} string or if nothing is supplied the current breakpoint.
		 * @instance
		 * @param {(FooTable.Breakpoint|string|number)} [breakpoint] - The breakpoint to retrieve.
		 * @returns {FooTable.Breakpoint}
		 */
		get: function(breakpoint){
			if (F.is.undef(breakpoint)) return this.calculate();
			if (breakpoint instanceof F.Breakpoint) return breakpoint;
			if (F.is.string(breakpoint)) return F.arr.first(this.array, function (bp) { return bp.name == breakpoint; });
			if (F.is.number(breakpoint)) return breakpoint >= 0 && breakpoint < this.array.length ? this.array[breakpoint] : null;
			return null;
		},
		/**
		 * Gets the width used to determine breakpoints whether it be from the viewport, parent or a custom function.
		 * @instance
		 * @returns {number}
		 */
		getWidth: function(){
			if (F.is.fn(this.o.getWidth)) return this.o.getWidth(this.ft);
			if (this.useParentWidth == true) return this.getParentWidth();
			return this.getViewportWidth();
		},
		/**
		 * Gets the tables direct parents width.
		 * @instance
		 * @returns {number}
		 */
		getParentWidth: function(){
			return this.ft.$el.parent().width();
		},
		/**
		 * Gets the current viewport width.
		 * @instance
		 * @returns {number}
		 */
		getViewportWidth: function(){
			return Math.max(document.documentElement.clientWidth, window.innerWidth, 0);
		}
	});

	F.components.register('breakpoints', F.Breakpoints, 1000);

})(jQuery, FooTable);
(function(F){
	/**
	 * A space delimited string of breakpoint names that specify when the column will be hidden. You can also specify "all" to make a column permanently display in an expandable detail row.
	 * @type {string}
	 * @default null
	 * @example <caption>The below shows how this value would be set</caption>
	 * breakpoints: "md"
	 */
	F.Column.prototype.breakpoints = null;

	F.Column.prototype.__breakpoints_define__ = function(definition){
		this.breakpoints = F.is.emptyString(definition.breakpoints) ? null : definition.breakpoints;
	};

	F.Column.extend('define', function(definition){
		this._super(definition);
		this.__breakpoints_define__(definition);
	});
})(FooTable);
(function(F){
	/**
	 * An object containing the breakpoints for the plugin.
	 * @type {object.<string, number>}
	 * @default { "xs": 480, "sm": 768, "md": 992, "lg": 1200 }
	 */
	F.Defaults.prototype.breakpoints = null;

	/**
	 * Whether or not breakpoints cascade. When set to true all breakpoints larger than the current will also be hidden along with it.
	 * @type {boolean}
	 * @default false
	 */
	F.Defaults.prototype.cascade = false;

	/**
	 * Whether or not to calculate breakpoints on the width of the parent element rather than the viewport.
	 * @type {boolean}
	 * @default false
	 */
	F.Defaults.prototype.useParentWidth = false;

	/**
	 * A function used to override the default getWidth function with a custom one.
	 * @type {function}
	 * @default null
	 * @example <caption>The below shows what the default getWidth function would look like.</caption>
	 * getWidth: function(instance){
	 * 	if (instance.o.useParentWidth == true) return instance.$el.parent().width();
	 * 	return instance.breakpoints.getViewportWidth();
	 * }
	 */
	F.Defaults.prototype.getWidth = null;
})(FooTable);
(function($, F){
	F.Columns = F.Component.extend(/** @lends FooTable.Columns */{
		/**
		 * The columns class contains all the logic for handling columns.
		 * @constructs
		 * @extends FooTable.Component
		 * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
		 * @returns {FooTable.Columns}
		 */
		construct: function(table){
			// call the base class constructor
			this._super(table, true);

			/* PROTECTED */
			/**
			 * This provides a shortcut to the {@link FooTable.Table#options} object.
			 * @protected
			 * @type {FooTable.Table#options}
			 */
			this.o = table.o;

			/* PUBLIC */
			/**
			 * An array of {@link FooTable.Column} objects created from parsing the options and/or DOM.
			 * @type {Array.<FooTable.Column>}
			 */
			this.array = [];
			/**
			 * The jQuery header row object.
			 * @type {jQuery}
			 */
			this.$header = null;
			/**
			 * Whether or not to display the header row.
			 * @type {boolean}
			 */
			this.showHeader = table.o.showHeader;

			this._fromHTML = F.is.emptyArray(table.o.columns) && !F.is.promise(table.o.columns);
		},

		/* PROTECTED */
		/**
		 * This parses the columns from either the tables rows or the supplied options.
		 * @instance
		 * @protected
		 * @param {object} data - The tables jQuery data object.
		 * @returns {jQuery.Promise}
		 * @this FooTable.Columns
		 */
		parse: function(data){
			var self = this;
			return $.Deferred(function(d){
				function merge(cols1, cols2){
					var merged = [];
					// check if either of the arrays is empty as it can save us having to merge them by index.
					if (cols1.length == 0 || cols2.length == 0){
						merged = cols1.concat(cols2);
					} else {
						// at this point we have two arrays of column definitions, we now need to merge them based on there index properties
						// first figure out the highest column index provided so we can loop that many times to merge all columns and provide
						// defaults where nothing was specified (fill in the gaps in the array as it were).
						var highest = 0;
						F.arr.each(cols1.concat(cols2), function(c){
							if (c.index > highest) highest = c.index;
						});
						highest++;
						for (var i = 0, cols1_c, cols2_c; i < highest; i++){
							cols1_c = {};
							F.arr.each(cols1, function(c){
								if (c.index == i){
									cols1_c = c;
									return false;
								}
							});
							cols2_c = {};
							F.arr.each(cols2, function(c){
								if (c.index == i){
									cols2_c = c;
									return false;
								}
							});
							merged.push($.extend(true, {}, cols1_c, cols2_c));
						}
					}
					return merged;
				}

				var json = [], html = [];
				// get the column options from the content
				var $header = self.ft.$el.find('tr.footable-header, thead > tr:last:has([data-breakpoints]), tbody > tr:first:has([data-breakpoints]), thead > tr:last, tbody > tr:first').first(), $cell, cdata;
				if ($header.length > 0){
					var virtual = $header.parent().is('tbody') && $header.children().length == $header.children('td').length;
					if (!virtual) self.$header = $header.addClass('footable-header');
					$header.children('td,th').each(function(i, cell){
						$cell = $(cell);
						cdata = $cell.data();
						cdata.index = i;
						cdata.$el = $cell;
						cdata.virtual = virtual;
						html.push(cdata);
					});
					if (virtual) self.showHeader = false;
				}
				// get the supplied column options
				if (F.is.array(self.o.columns) && !F.is.emptyArray(self.o.columns)){
					F.arr.each(self.o.columns, function(c, i){
						c.index = i;
						json.push(c);
					});
					self.parseFinalize(d, merge(json, html));
				} else if (F.is.promise(self.o.columns)){
					self.o.columns.then(function(cols){
						F.arr.each(cols, function(c, i){
							c.index = i;
							json.push(c);
						});
						self.parseFinalize(d, merge(json, html));
					}, function(xhr){
						d.reject(Error('Columns ajax request error: ' + xhr.status + ' (' + xhr.statusText + ')'));
					});
				} else {
					self.parseFinalize(d, merge(json, html));
				}
			});
		},
		/**
		 * Used to finalize the parsing of columns it is supplied the parse deferred object which must be resolved with an array of {@link FooTable.Column} objects
		 * or rejected with an error.
		 * @instance
		 * @protected
		 * @param {jQuery.Deferred} deferred - The deferred object used for parsing.
		 * @param {Array.<object>} cols - An array of all merged column definitions.
		 */
		parseFinalize: function(deferred, cols){
			// we now have a merged array of all column definitions supplied to the plugin, time to make the objects.
			var self = this, columns = [], column;
			F.arr.each(cols, function(def){
				// if we have a column registered using the definition type then create an instance of that column otherwise just create a default text column.
				if (column = F.columns.contains(def.type) ? F.columns.make(def.type, self.ft, def) : new F.Column(self.ft, def))
					columns.push(column);
			});
			if (F.is.emptyArray(columns)){
				deferred.reject(Error("No columns supplied."));
			} else {
				// make sure to sort by the column index as the merge process may have mixed them up
				columns.sort(function(a, b){ return a.index - b.index; });
				deferred.resolve(columns);
			}
		},
		/**
		 * The columns preinit method is used to parse and check the column options supplied from both static content and through the constructor.
		 * @instance
		 * @protected
		 * @param {object} data - The jQuery data object from the root table element.
		 * @this FooTable.Columns
		 */
		preinit: function(data){
			var self = this;
			/**
			 * The preinit.ft.columns event is raised before any UI is created and provides the tables jQuery data object for additional options parsing.
			 * Calling preventDefault on this event will disable the entire plugin.
			 * @event FooTable.Columns#"preinit.ft.columns"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {object} data - The jQuery data object of the table raising the event.
			 */
			return self.ft.raise('preinit.ft.columns', [data]).then(function(){
				return self.parse(data).then(function(columns){
					self.array = columns;
					self.showHeader = F.is.boolean(data.showHeader) ? data.showHeader : self.showHeader;
				});
			});
		},
		/**
		 * Initializes the columns creating the table header if required.
		 * @instance
		 * @protected
		 * @fires FooTable.Columns#"init.ft.columns"
		 * @this FooTable.Columns
		 */
		init: function(){
			var self = this;
			/**
			 * The init.ft.columns event is raised after the header row is created/parsed for column data.
			 * @event FooTable.Columns#"init.ft.columns"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} instance - The instance of the plugin raising the event.
			 * @param {Array.<FooTable.Column>} columns - The array of {@link FooTable.Column} objects parsed from the options and/or DOM.
			 */
			return this.ft.raise('init.ft.columns', [ self.array ]).then(function(){
				self.$create();
			});
		},
		/**
		 * Destroys the columns component removing any UI generated from the table.
		 * @instance
		 * @protected
		 * @fires FooTable.Columns#"destroy.ft.columns"
		 */
		destroy: function(){
			/**
			 * The destroy.ft.columns event is raised before its UI is removed.
			 * Calling preventDefault on this event will prevent the component from being destroyed.
			 * @event FooTable.Columns#"destroy.ft.columns"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('destroy.ft.columns').then(function(){
				if (!self._fromHTML) self.$header.remove();
			});
		},
		/**
		 * The predraw method called from within the {@link FooTable.Table#draw} method.
		 * @instance
		 * @protected
		 * @this FooTable.Columns
		 */
		predraw: function(){
			var self = this, first = true;
			self.visibleColspan = 0;
			self.firstVisibleIndex = 0;
			self.lastVisibleIndex = 0;
			self.hasHidden = false;
			F.arr.each(self.array, function(col){
				col.hidden = !self.ft.breakpoints.visible(col.breakpoints);
				if (!col.hidden && col.visible){
					if (first){
						self.firstVisibleIndex = col.index;
						first = false;
					}
					self.lastVisibleIndex = col.index;
					self.visibleColspan++;
				}
				if (col.hidden) self.hasHidden = true;
			});
			self.ft.$el.toggleClass('breakpoint', self.hasHidden);
		},
		/**
		 * Performs the actual drawing of the columns, hiding or displaying them depending on there breakpoints.
		 * @instance
		 * @protected
		 * @this FooTable.Columns
		 */
		draw: function(){
			F.arr.each(this.array, function(col){
				col.$el.css('display', (col.hidden || !col.visible  ? 'none' : 'table-cell'));
			});
			if (!this.showHeader && F.is.jq(this.$header.parent())){
				this.$header.detach();
			}
		},
		/**
		 * Creates the header row for the table from the parsed column definitions.
		 * @instance
		 * @protected
		 * @this FooTable.Columns
		 */
		$create: function(){
			var self = this;
			self.$header = F.is.jq(self.$header) ? self.$header : $('<tr/>', {'class': 'footable-header'});
			self.$header.children('th,td').detach();
			F.arr.each(self.array, function(col){
				self.$header.append(col.$el);
			});
			if (self.showHeader && !F.is.jq(self.$header.parent())){
				self.ft.$el.children('thead').append(self.$header);
			}
		},
		/**
		 * Attempts to return a {@link FooTable.Column} instance when passed the {@link FooTable.Column} instance, the {@link FooTable.Column#name} string or the {@link FooTable.Column#index} number.
		 * If supplied a function this will return an array by iterating all columns passing the index and column itself to the supplied callback as arguments.
		 * Returning true in the callback will include the column in the result.
		 * @instance
		 * @param {(FooTable.Column|string|number|function)} column - The column to retrieve.
		 * @returns {(Array.<FooTable.Column>|FooTable.Column|null)} The column if one is found otherwise it returns NULL.
		 * @example <caption>This example shows retrieving a column by name assuming a column called "id" exists. The <code>columns</code> object is an instance of {@link FooTable.Columns}.</caption>
		 * var column = columns.get('id');
		 * if (column instanceof FooTable.Column){
		 * 	// found the "id" column
		 * } else {
		 * 	// no column with a name of "id" exists
		 * }
		 * // to get an array of all hidden columns
		 * var columns = columns.get(function(col){
		 *  return col.hidden;
		 * });
		 */
		get: function(column){
			if (column instanceof F.Column) return column;
			if (F.is.string(column)) return F.arr.first(this.array, function (col) { return col.name == column; });
			if (F.is.number(column)) return F.arr.first(this.array, function (col) { return col.index == column; });
			if (F.is.fn(column)) return F.arr.get(this.array, column);
			return null;
		},
		/**
		 * Takes an array of column names, index's or actual {@link FooTable.Column} and ensures that an array of only {@link FooTable.Column} is returned.
		 * @instance
		 * @param {(Array.<string>|Array.<number>|Array.<FooTable.Column>)} columns - The array of column names, index's or {@link FooTable.Column} to check.
		 * @returns {Array.<FooTable.Column>}
		 */
		ensure: function(columns){
			var self = this, result = [];
			if (!F.is.array(columns)) return result;
			F.arr.each(columns, function(name){
				result.push(self.get(name));
			});
			return result;
		}
	});

	F.components.register('columns', F.Columns, 900);

})(jQuery, FooTable);
(function(F){
	/**
	 * An array containing the column options or a jQuery promise that resolves returning the columns. The index of the definitions must match the index of each column as it should appear in the table. For more information on the options available see the {@link FooTable.Column} object.
	 * @type {(Array.<object>|jQuery.Promise)}
	 * @default []
	 * @example <caption>The below shows column definitions for a row defined as <code>{ id: Number, name: String, age: Number }</code>. The ID column has a fixed width, the table is initially sorted on the Name column and the Age column will be hidden on phones.</caption>
	 * columns: [
	 * 	{ name: 'id', title: 'ID', type: 'number' },
	 *	{ name: 'name', title: 'Name', sorted: true, direction: 'ASC' }
	 *	{ name: 'age', title: 'Age', type: 'number', breakpoints: 'xs' }
	 * ]
	 */
	F.Defaults.prototype.columns = [];

	/**
	 * Specifies whether or not the column headers should be displayed.
	 * @type {boolean}
	 * @default true
	 */
	F.Defaults.prototype.showHeader = true;
})(FooTable);
(function ($, F) {
	F.Rows = F.Component.extend(/** @lends FooTable.Rows */{
		/**
		 * The rows class contains all the logic for handling rows.
		 * @constructs
		 * @extends FooTable.Component
		 * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
		 * @returns {FooTable.Rows}
		 */
		construct: function (table) {
			// call the base class constructor
			this._super(table, true);

			/**
			 * This provides a shortcut to the {@link FooTable.Table#options} object.
			 * @instance
			 * @protected
			 * @type {FooTable.Table#options}
			 */
			this.o = table.o;
			/**
			 * The current working array of {@link FooTable.Row} objects.
			 * @instance
			 * @protected
			 * @type {Array.<FooTable.Row>}
			 * @default []
			 */
			this.array = [];
			/**
			 * The base array of rows parsed from either the DOM or the constructor options.
			 * The {@link FooTable.Rows#current} member is populated with a shallow clone of this array
			 * during the predraw operation before any core or custom components are executed.
			 * @instance
			 * @protected
			 * @type {Array.<FooTable.Row>}
			 * @default []
			 */
			this.all = [];
			/**
			 * Whether or not to display a toggle in each row when it contains hidden columns.
			 * @type {boolean}
			 * @default true
			 */
			this.showToggle = table.o.showToggle;
			/**
			 * The CSS selector used to filter row click events. If the event.target property matches the selector the row will be toggled.
			 * @type {string}
			 * @default "tr,td,.footable-toggle"
			 */
			this.toggleSelector = table.o.toggleSelector;
			/**
			 * Specifies which column the row toggle is appended to. Supports only two values; "first" and "last"
			 * @type {string}
			 */
			this.toggleColumn = table.o.toggleColumn;
			/**
			 * The text to display when the table has no rows.
			 * @type {string}
			 */
			this.emptyString = table.o.empty;
			/**
			 * Whether or not the first rows details are expanded by default when displayed on a device that hides any columns.
			 * @type {boolean}
			 */
			this.expandFirst = table.o.expandFirst;
			/**
			 * Whether or not all row details are expanded by default when displayed on a device that hides any columns.
			 * @type {boolean}
			 */
			this.expandAll = table.o.expandAll;
			/**
			 * The jQuery object that contains the empty row control.
			 * @type {jQuery}
			 */
			this.$empty = null;
			this._fromHTML = F.is.emptyArray(table.o.rows) && !F.is.promise(table.o.rows);
		},
		/**
		 * This parses the rows from either the tables rows or the supplied options.
		 * @instance
		 * @protected
		 * @returns {jQuery.Promise}
		 */
		parse: function(){
			var self = this;
			return $.Deferred(function(d){
				var $rows = self.ft.$el.children('tbody').children('tr');
				if (F.is.array(self.o.rows) && self.o.rows.length > 0){
					self.parseFinalize(d, self.o.rows);
				} else if (F.is.promise(self.o.rows)){
					self.o.rows.then(function(rows){
						self.parseFinalize(d, rows);
					}, function(xhr){
						d.reject(Error('Rows ajax request error: ' + xhr.status + ' (' + xhr.statusText + ')'));
					});
				} else if (F.is.jq($rows)){
					self.parseFinalize(d, $rows);
					$rows.detach();
				} else {
					self.parseFinalize(d, []);
				}
			});
		},
		/**
		 * Used to finalize the parsing of rows it is supplied the parse deferred object which must be resolved with an array of {@link FooTable.Row} objects
		 * or rejected with an error.
		 * @instance
		 * @protected
		 * @param {jQuery.Deferred} deferred - The deferred object used for parsing.
		 * @param {(Array.<object>|jQuery)} rows - An array of row values and options or the jQuery object containing all rows.
		 */
		parseFinalize: function(deferred, rows){
			var self = this, result = $.map(rows, function(r){
				return new F.Row(self.ft, self.ft.columns.array, r);
			});
			deferred.resolve(result);
		},
		/**
		 * The columns preinit method is used to parse and check the column options supplied from both static content and through the constructor.
		 * @instance
		 * @protected
		 * @param {object} data - The jQuery data object from the root table element.
		 * @fires FooTable.Rows#"preinit.ft.rows"
		 */
		preinit: function(data){
			var self = this;
			/**
			 * The preinit.ft.rows event is raised before any UI is created and provides the tables jQuery data object for additional options parsing.
			 * Calling preventDefault on this event will disable the entire plugin.
			 * @event FooTable.Rows#"preinit.ft.rows"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {object} data - The jQuery data object of the table raising the event.
			 */
			return self.ft.raise('preinit.ft.rows', [data]).then(function(){
				return self.parse().then(function(rows){
					self.all = rows;
					self.array = self.all.slice(0);
					self.showToggle = F.is.boolean(data.showToggle) ? data.showToggle : self.showToggle;
					self.toggleSelector = F.is.string(data.toggleSelector) ? data.toggleSelector : self.toggleSelector;
					self.toggleColumn = F.is.string(data.toggleColumn) ? data.toggleColumn : self.toggleColumn;
					if (self.toggleColumn != "first" && self.toggleColumn != "last") self.toggleColumn = "first";
					self.emptyString = F.is.string(data.empty) ? data.empty : self.emptyString;
					self.expandFirst = F.is.boolean(data.expandFirst) ? data.expandFirst : self.expandFirst;
					self.expandAll = F.is.boolean(data.expandAll) ? data.expandAll : self.expandAll;
				});
			});
		},
		/**
		 * Initializes the rows class using the supplied table and options.
		 * @instance
		 * @protected
		 * @fires FooTable.Rows#"init.ft.rows"
		 */
		init: function () {
			var self = this;
			/**
			 * The init.ft.rows event is raised after the the rows are parsed from either the DOM or the options.
			 * Calling preventDefault on this event will disable the entire plugin.
			 * @event FooTable.Rows#"init.ft.rows"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} instance - The instance of the plugin raising the event.
			 * @param {Array.<FooTable.Row>} rows - The array of {@link FooTable.Row} objects parsed from the DOM or the options.
			 */
			return self.ft.raise('init.ft.rows', [self.all]).then(function(){
				self.$create();
			});
		},
		/**
		 * Destroys the rows component removing any UI generated from the table.
		 * @instance
		 * @protected
		 * @fires FooTable.Rows#"destroy.ft.rows"
		 */
		destroy: function(){
			/**
			 * The destroy.ft.rows event is raised before its UI is removed.
			 * Calling preventDefault on this event will prevent the component from being destroyed.
			 * @event FooTable.Rows#"destroy.ft.rows"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('destroy.ft.rows').then(function(){
				F.arr.each(self.array, function(row){
					row.predraw(!self._fromHTML);
				});
				self.all = self.array = [];
			});
		},
		/**
		 * Performs the predraw operations that are required including creating the shallow clone of the {@link FooTable.Rows#array} to work with.
		 * @instance
		 * @protected
		 */
		predraw: function(){
			F.arr.each(this.array, function(row){
				row.predraw();
			});
			this.array = this.all.slice(0);
		},
		$create: function(){
			this.$empty = $('<tr/>', { 'class': 'footable-empty' }).append($('<td/>').text(this.emptyString));
		},
		/**
		 * Performs the actual drawing of the table rows.
		 * @instance
		 * @protected
		 */
		draw: function(){
			var self = this, $tbody = self.ft.$el.children('tbody'), first = true;
			// if we have rows
			if (self.array.length > 0){
				self.$empty.detach();
				// loop through them appending to the tbody and then drawing
				F.arr.each(self.array, function(row){
					if ((self.expandFirst && first) || self.expandAll){
						row.expanded = true;
						first = false;
					}
					row.draw($tbody);
				});
			} else {
				// otherwise display the $empty row
				self.$empty.children('td').attr('colspan', self.ft.columns.visibleColspan);
				$tbody.append(self.$empty);
			}
		},
		/**
		 * Loads a JSON array of row objects into the table
		 * @instance
		 * @param {Array.<object>} data - An array of row objects to load.
		 * @param {boolean} [append=false] - Whether or not to append the new rows to the current rows array or to replace them entirely.
		 */
		load: function(data, append){
			var self = this, rows = $.map(data, function(r){
				return new F.Row(self.ft, self.ft.columns.array, r);
			});
			F.arr.each(this.array, function(row){
				row.predraw();
			});
			this.all = (F.is.boolean(append) ? append : false) ? this.all.concat(rows) : rows;
			this.array = this.all.slice(0);
			this.ft.draw();
		},
		/**
		 * Expands all visible rows.
		 * @instance
		 */
		expand: function(){
			F.arr.each(this.array, function(row){
				row.expand();
			});
		},
		/**
		 * Collapses all visible rows.
		 * @instance
		 */
		collapse: function(){
			F.arr.each(this.array, function(row){
				row.collapse();
			});
		}
	});

	F.components.register('rows', F.Rows, 800);

})(jQuery, FooTable);
(function(F){
	/**
	 * An array of JSON objects containing the row data or a jQuery promise that resolves returning the row data.
	 * @type {(Array.<object>|jQuery.Promise)}
	 * @default []
	 */
	F.Defaults.prototype.rows = [];

	/**
	 * A string to display when there are no rows in the table.
	 * @type {string}
	 * @default "No results"
	 */
	F.Defaults.prototype.empty = 'No results';

	/**
	 * Whether or not the toggle is appended to each row.
	 * @type {boolean}
	 * @default true
	 */
	F.Defaults.prototype.showToggle = true;

	/**
	 * The CSS selector used to filter row click events. If the event.target property matches the selector the row will be toggled.
	 * @type {string}
	 * @default "tr,td,.footable-toggle"
	 */
	F.Defaults.prototype.toggleSelector = 'tr,td,.footable-toggle';

	/**
	 * Specifies which column to display the row toggle in. The only supported values are "first" or "last".
	 * @type {string}
	 * @default "first"
	 */
	F.Defaults.prototype.toggleColumn = 'first';

	/**
	 * Whether or not the first rows details are expanded by default when displayed on a device that hides any columns.
	 * @type {boolean}
	 */
	F.Defaults.prototype.expandFirst = false;

	/**
	 * Whether or not all row details are expanded by default when displayed on a device that hides any columns.
	 * @type {boolean}
	 */
	F.Defaults.prototype.expandAll = false;
})(FooTable);
(function(F){
	/**
	 * Loads a JSON array of row objects into the table
	 * @param {Array.<object>} data - An array of row objects to load.
	 * @param {boolean} [append=false] - Whether or not to append the new rows to the current rows array or to replace them entirely.
	 */
	F.Table.prototype.loadRows = function(data, append){
		this.rows.load(data, append);
	};
})(FooTable);