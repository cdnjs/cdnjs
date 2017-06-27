/* ========================================================================
 * infect.js v0.4.0
 * Dependency injection for any web project
 *
 * Copyright (c) 2013 Andrew Worcester (amwmedia.com)
 * https://github.com/amwmedia/infect.js
 *
 * Author: Andrew Worcester
 * Website: amwmedia.com
 *
 * Released under the MIT license
 * https://github.com/amwmedia/infect.js/blob/master/LICENSE
 * ------------------------------------------------------------------------ */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = factory();
    } else {
        // Browser globals
        root.infect = factory();
  }
}(this, function () {
	var strains = {},
		op = '$',
		preErr = ' == infect.js => ';

	/**
	 * Type checking for any type
	 *
	 * @method type
	 * @param {Anything} obj: object to be type checked
	 * @return {String} string equiv of the type passed in
	 *			example: string, number, date, object, etc
	 */
	function type(obj) {
		return (/ (.*)]/).exec(Object.prototype.toString.call(obj))[1];
	}

	/**
	 * failure function to handle when incorrect params are passed
	 *
	 * @method fail
	 * @param {String} funcName: function name that was incorrectly called
	 * @param {Anything} *: All additional parameters are the params that were
	 *						passed to the failed function (funcName)
	 * @return {Throw} thows an error, no return
	 */
	function fail(funcName) {
		var params = [].slice.call(arguments, 1),
			pText = '', i;

		for (i=0; i<params.length; i++) {
			pText += (pText.length > 0) ? ', ' + type(params[i]) : type(params[i]);
		}

		throw preErr + 'Invalid call to infect.' + funcName + '(' + pText + ')';
	}

	/**
	 * Set a new strain (dependency) in the system for injection
	 *
	 * @method set
	 * @param {String} name: the key used to reference this dependency
	 * @param {Mutable Object} value: the dependency to store for injection
	 */
	function set(name, value) {
		if (type(name) === 'String' && type(value) !== 'Undefined' && value instanceof Object) {
			name = name.indexOf(op) === 0 ? name.substr(op.length) : name;
			strains[name] = value;
		} else { fail('set', name, value); }
	}

	/**
	 * retrieve a dependency from the store
	 *
	 * @method get
	 * @param {String} name: key that was used to set this dependency
	 * @return {Mutable Object} the dependency from the store
	 */
	function get(name) {
		if (type(name) === 'String') {
			name = name.indexOf(op) === 0 ? name.substr(op.length) : name;
			return strains[name] || undefined;
		} else { fail('get', name); }
	}

	/**
	 * inject an object with a set of dependencies
	 *
	 * @method obj
	 * @param {Object} object: the object to be injected
	 * @param {Array} list: array of keys (strings) that correspond to dependencies
	 * @return {Object} the injected object
	 */
	function obj(object, list) {
		var key, i;
		if (type(object) === 'Object' && list instanceof Array) {
			// assign parameters to more logical names
			i = list.length;
			for (; i-- ;) {
				key = list[i];
				key = key.indexOf(op) === 0 ? key.substr(op.length) : key;
				object[op + key] = get(key);
			}
			return object;
		} else { fail('obj', object, list); }
	}

	/**
	 * inject function or class with dependencies
	 *
	 * @method func
	 * @param {Function} func: the function to be injected
	 * @param {Object} scope: if the function is not used as a constructor
	 *				this object is used as this inside the Injected function
	 * @return {Function} the injected function
	 */
	function func(fnc, scope) {
		var i, key, args, argCount, Infected;

		if (type(fnc) === 'Function') {
			scope = scope || {};
			
			// pull the function's parameters as a string
			args = /\(([^)]+)/.exec(fnc.toString());
			// make sure there are parameters provided
			args = (args !== null) ? args[1] : '';
			// if we have parameters, split them into an array
			// while removing whitespace from both ends
			if (args) { args = args.split(/\s*,\s*/); }

			// store the total number of original arguments provided
			// so we know what we should expect when the function is executed
			i = argCount = args.length;
			for (; i-- ;) {
				key = args[i];
				// if the param isn't prefixed with $
				if (key.indexOf(op) !== 0) {
					// set args to the values that should be injected
					// when we execute the injected function
					args = args.slice(i+1);
					// don't process any more
					break;
				}
				// try to pull the dependency now, if it doesn't
				// exist yet, fill with the key and we'll try again
				// on execution
				args[i] = get(key) || key;
			}

			Infected = function () {
				// if the function was compiled, the $infect property can
				// be attached in order to force injection
				args = (Infected.$infect && Infected.$infect.length > 0 && !args.length) ? Infected.$infect : args;

				// convert the parameters passed to the injected
				// function to a proper array
				var _args = [].slice.call(arguments),
					// the total number of params we have for execution
					len = _args.length + args.length,
					_scope = scope;

				if (this instanceof Infected) {
					// if this function is being used as a constructor
					// use the current this object as scope for execution
					_scope = this;
				}

				for (; len < argCount; len++) {
					// stick undefined in for params that are not 
					// provided when the function was called
					_args.push(undefined);
				}

				// spin over all the injected args and check for
				// keys that have not been injected yet, try to inject
				i = args.length;
				for (; i-- ;) {
					if (type(args[i]) === 'String') {
						args[i] = get(args[i]);
					}
				}

				// we cannot handle more arguments than the function was originally
				// declared with, throw an error
				if (len > argCount) { throw preErr + 'Too many parameters! I expected ' +
											(argCount - args.length) + ' (or less) but got ' + _args.length; }

				// combine the injected params and actual params
				_args = _args.concat(args);
				
				// execute the injected function
				return fnc.apply(_scope, _args);
			};

			// make the injected function an instance of fnc so it will work as
			// a constructor properly
			Infected.prototype = fnc.prototype;
			Infected.prototype.constructor = Infected;

			// pass the $infect property through to the infected function
			// in case it was applied to the original function
			Infected.$infect = fnc.$infect;

			return Infected;
		} else { fail('func', fnc, scope); }
	}

    return {
		'set': set,
		'get': get,
		'obj': obj,
		'func': func,
		'funk': func
    };
}));