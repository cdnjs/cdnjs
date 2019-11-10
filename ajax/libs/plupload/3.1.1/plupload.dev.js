/**
 * Plupload - multi-runtime File Uploader
 * v3.1.1
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2017-10-03
 */
;(function (global, factory) {
	var extract = function() {
		var ctx = {};
		factory.apply(ctx, arguments);
		return ctx.plupload;
	};
	
	if (typeof define === "function" && define.amd) {
		define("plupload", ['./moxie'], extract);
	} else if (typeof module === "object" && module.exports) {
		module.exports = extract(require('./moxie'));
	} else {
		global.plupload = extract(global.moxie);
	}
}(this || window, function(moxie) {
/**
 * Compiled inline version. (Library mode)
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function(exports, undefined) {
	"use strict";

	var modules = {};

	function require(ids, callback) {
		var module, defs = [];

		for (var i = 0; i < ids.length; ++i) {
			module = modules[ids[i]] || resolve(ids[i]);
			if (!module) {
				throw 'module definition dependecy not found: ' + ids[i];
			}

			defs.push(module);
		}

		callback.apply(null, defs);
	}

	function define(id, dependencies, definition) {
		if (typeof id !== 'string') {
			throw 'invalid module definition, module id must be defined and be a string';
		}

		if (dependencies === undefined) {
			throw 'invalid module definition, dependencies must be specified';
		}

		if (definition === undefined) {
			throw 'invalid module definition, definition function must be specified';
		}

		require(dependencies, function() {
			modules[id] = definition.apply(null, arguments);
		});
	}

	function defined(id) {
		return !!modules[id];
	}

	function resolve(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length; ++fi) {
			if (!target[fragments[fi]]) {
				return;
			}

			target = target[fragments[fi]];
		}

		return target;
	}

	function expose(ids) {
		for (var i = 0; i < ids.length; i++) {
			var target = exports;
			var id = ids[i];
			var fragments = id.split(/[.\/]/);

			for (var fi = 0; fi < fragments.length - 1; ++fi) {
				if (target[fragments[fi]] === undefined) {
					target[fragments[fi]] = {};
				}

				target = target[fragments[fi]];
			}

			target[fragments[fragments.length - 1]] = modules[id];
		}
	}

// Included from: src/plupload.js

/**
 * plupload.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
Namespace for all Plupload related classes, methods and properties.

@class plupload
@public
@static
*/
define('plupload', [], function() {

	var o = moxie;
	var u = o.core.utils;

	// redifine event dispatcher for Flash/Silverlight runtimes
	u.Env.global_event_dispatcher = 'plupload.EventTarget.instance.dispatchEvent';


	return {
		/**
		 * Plupload version will be replaced on build.
		 *
		 * @property VERSION
		 * @static
		 * @final
		 */
		VERSION: '3.1.1',

		/**
		 * The state of the queue before it has started and after it has finished
		 *
		 * @property STOPPED
		 * @static
		 * @final
		 */
		STOPPED: 1,

		/**
		 * Upload process is running
		 *
		 * @property STARTED
		 * @static
		 * @final
		 */
		STARTED: 2,

		/**
		File is queued for upload

		@property QUEUED
		@static
		@final
		*/
		QUEUED: 1,

		/**
		File is being uploaded

		@property UPLOADING
		@static
		@final
		 */
		UPLOADING: 2,

		/**
		File has failed to be uploaded

		@property FAILED
		@static
		@final
		 */
		FAILED: 4,

		/**
		File has been uploaded successfully

		@property DONE
		@static
		@final
		 */
		DONE: 5,

		// Error constants used by the Error event

		/**
		 * Generic error for example if an exception is thrown inside Silverlight.
		 *
		 * @property GENERIC_ERROR
		 * @static
		 * @final
		 */
		GENERIC_ERROR: -100,

		/**
		 * HTTP transport error. For example if the server produces a HTTP status other than 200.
		 *
		 * @property HTTP_ERROR
		 * @static
		 * @final
		 */
		HTTP_ERROR: -200,

		/**
		 * Generic I/O error. For example if it wasn't possible to open the file stream on local machine.
		 *
		 * @property IO_ERROR
		 * @static
		 * @final
		 */
		IO_ERROR: -300,

		/**
		 * @property SECURITY_ERROR
		 * @static
		 * @final
		 */
		SECURITY_ERROR: -400,

		/**
		 * Initialization error. Will be triggered if no runtime was initialized.
		 *
		 * @property INIT_ERROR
		 * @static
		 * @final
		 */
		INIT_ERROR: -500,

		/**
		 * File size error. If the user selects a file that is too large it will be blocked and an error of this type will be triggered.
		 *
		 * @property FILE_SIZE_ERROR
		 * @static
		 * @final
		 */
		FILE_SIZE_ERROR: -600,

		/**
		 * File extension error. If the user selects a file that isn't valid according to the filters setting.
		 *
		 * @property FILE_EXTENSION_ERROR
		 * @static
		 * @final
		 */
		FILE_EXTENSION_ERROR: -601,

		/**
		 * Duplicate file error. If prevent_duplicates is set to true and user selects the same file again.
		 *
		 * @property FILE_DUPLICATE_ERROR
		 * @static
		 * @final
		 */
		FILE_DUPLICATE_ERROR: -602,

		/**
		 * Runtime will try to detect if image is proper one. Otherwise will throw this error.
		 *
		 * @property IMAGE_FORMAT_ERROR
		 * @static
		 * @final
		 */
		IMAGE_FORMAT_ERROR: -700,

		/**
		 * While working on files runtime may run out of memory and will throw this error.
		 *
		 * @since 2.1.2
		 * @property MEMORY_ERROR
		 * @static
		 * @final
		 */
		MEMORY_ERROR: -701,

		/**
		 * Each runtime has an upper limit on a dimension of the image it can handle. If bigger, will throw this error.
		 *
		 * @property IMAGE_DIMENSIONS_ERROR
		 * @static
		 * @final
		 */
		IMAGE_DIMENSIONS_ERROR: -702,


		/**
		Invalid option error. Will be thrown if user tries to alter the option that cannot be changed without
		uploader reinitialisation.

		@property OPTION_ERROR
		@static
		@final
		*/
		OPTION_ERROR: -800,

		/**
		 * Expose whole moxie (#1469).
		 *
		 * @property moxie
		 * @type Object
		 * @final
		 */
		moxie: o,

		/**
		 * In some cases sniffing is the only way around :(
		 */
		ua: u.Env,

		/**
		 * Gets the true type of the built-in object (better version of typeof).
		 * @credits Angus Croll (http://javascriptweblog.wordpress.com/)
		 *
		 * @method typeOf
		 * @static
		 * @param {Object} o Object to check.
		 * @return {String} Object [[Class]]
		 */
		typeOf: u.Basic.typeOf,

		clone: u.Basic.clone,

		inherit: u.Basic.inherit,


		/**
		 * Extends the specified object with another object.
		 *
		 * @method extend
		 * @static
		 * @param {Object} target Object to extend.
		 * @param {Object..} obj Multiple objects to extend with.
		 * @return {Object} Same as target, the extended object.
		 */
		extend: u.Basic.extend,


		extendImmutable: u.Basic.extendImmutable,

		/**
		Extends the specified object with another object(s), but only if the property exists in the target.

		@method extendIf
		@static
		@param {Object} target Object to extend.
		@param {Object} [obj]* Multiple objects to extend with.
		@return {Object} Same as target, the extended object.
		*/
		extendIf: u.Basic.extendIf,

		/**
		Recieve an array of functions (usually async) to call in sequence, each  function
		receives a callback as first argument that it should call, when it completes. Finally,
		after everything is complete, main callback is called. Passing truthy value to the
		callback as a first argument will interrupt the sequence and invoke main callback
		immediately.

		@method inSeries
		@static
		@param {Array} queue Array of functions to call in sequence
		@param {Function} cb Main callback that is called in the end, or in case of error
		*/
		inSeries: u.Basic.inSeries,

		/**
		Recieve an array of functions (usually async) to call in parallel, each  function
		receives a callback as first argument that it should call, when it completes. After
		everything is complete, main callback is called. Passing truthy value to the
		callback as a first argument will interrupt the process and invoke main callback
		immediately.

		@method inParallel
		@static
		@param {Array} queue Array of functions to call in sequence
		@param {Function} cb Main callback that is called in the end, or in case of erro
		*/
		inParallel: u.Basic.inParallel,

		/**
		 * Generates an unique ID. This is 99.99% unique since it takes the current time and 5 random numbers.
		 * The only way a user would be able to get the same ID is if the two persons at the same exact millisecond manages
		 * to get 5 the same random numbers between 0-65535 it also uses a counter so each call will be guaranteed to be page unique.
		 * It's more probable for the earth to be hit with an asteriod. You can also if you want to be 100% sure set the plupload.guidPrefix property
		 * to an user unique key.
		 *
		 * @method guid
		 * @static
		 * @return {String} Virtually unique id.
		 */
		guid: u.Basic.guid,

		/**
		 * Get array of DOM Elements by their ids.
		 *
		 * @method get
		 * @param {String} id Identifier of the DOM Element
		 * @return {Array}
		 */
		getAll: function get(ids) {
			var els = [],
				el;

			if (u.Basic.typeOf(ids) !== 'array') {
				ids = [ids];
			}

			var i = ids.length;
			while (i--) {
				el = u.Dom.get(ids[i]);
				if (el) {
					els.push(el);
				}
			}

			return els.length ? els : null;
		},

		/**
		Get DOM element by id

		@method get
		@param {String} id Identifier of the DOM Element
		@return {Node}
		*/
		get: u.Dom.get,

		/**
		 * Executes the callback function for each item in array/object. If you return false in the
		 * callback it will break the loop.
		 *
		 * @method each
		 * @static
		 * @param {Object} obj Object to iterate.
		 * @param {function} callback Callback function to execute for each item.
		 */
		each: u.Basic.each,

		/**
		 * Returns the absolute x, y position of an Element. The position will be returned in a object with x, y fields.
		 *
		 * @method getPos
		 * @static
		 * @param {Element} node HTML element or element id to get x, y position from.
		 * @param {Element} root Optional root element to stop calculations at.
		 * @return {object} Absolute position of the specified element object with x, y fields.
		 */
		getPos: u.Dom.getPos,

		/**
		 * Returns the size of the specified node in pixels.
		 *
		 * @method getSize
		 * @static
		 * @param {Node} node Node to get the size of.
		 * @return {Object} Object with a w and h property.
		 */
		getSize: u.Dom.getSize,

		/**
		 * Encodes the specified string.
		 *
		 * @method xmlEncode
		 * @static
		 * @param {String} s String to encode.
		 * @return {String} Encoded string.
		 */
		xmlEncode: function(str) {
			var xmlEncodeChars = {
					'<': 'lt',
					'>': 'gt',
					'&': 'amp',
					'"': 'quot',
					'\'': '#39'
				},
				xmlEncodeRegExp = /[<>&\"\']/g;

			return str ? ('' + str).replace(xmlEncodeRegExp, function(chr) {
				return xmlEncodeChars[chr] ? '&' + xmlEncodeChars[chr] + ';' : chr;
			}) : str;
		},

		/**
		 * Forces anything into an array.
		 *
		 * @method toArray
		 * @static
		 * @param {Object} obj Object with length field.
		 * @return {Array} Array object containing all items.
		 */
		toArray: u.Basic.toArray,

		/**
		 * Find an element in array and return its index if present, otherwise return -1.
		 *
		 * @method inArray
		 * @static
		 * @param {mixed} needle Element to find
		 * @param {Array} array
		 * @return {Int} Index of the element, or -1 if not found
		 */
		inArray: u.Basic.inArray,

		/**
		 * Extends the language pack object with new items.
		 *
		 * @method addI18n
		 * @static
		 * @param {Object} pack Language pack items to add.
		 * @return {Object} Extended language pack object.
		 */
		addI18n: o.core.I18n.addI18n,

		/**
		 * Translates the specified string by checking for the english string in the language pack lookup.
		 *
		 * @method translate
		 * @static
		 * @param {String} str String to look for.
		 * @return {String} Translated string or the input string if it wasn't found.
		 */
		translate: o.core.I18n.translate,

		/**
		 * Pseudo sprintf implementation - simple way to replace tokens with specified values.
		 *
		 * @param {String} str String with tokens
		 * @return {String} String with replaced tokens
		 */
		sprintf: u.Basic.sprintf,

		/**
		 * Checks if object is empty.
		 *
		 * @method isEmptyObj
		 * @static
		 * @param {Object} obj Object to check.
		 * @return {Boolean}
		 */
		isEmptyObj: u.Basic.isEmptyObj,

		/**
		 * Checks if specified DOM element has specified class.
		 *
		 * @method hasClass
		 * @static
		 * @param {Object} obj DOM element like object to add handler to.
		 * @param {String} name Class name
		 */
		hasClass: u.Dom.hasClass,

		/**
		 * Adds specified className to specified DOM element.
		 *
		 * @method addClass
		 * @static
		 * @param {Object} obj DOM element like object to add handler to.
		 * @param {String} name Class name
		 */
		addClass: u.Dom.addClass,

		/**
		 * Removes specified className from specified DOM element.
		 *
		 * @method removeClass
		 * @static
		 * @param {Object} obj DOM element like object to add handler to.
		 * @param {String} name Class name
		 */
		removeClass: u.Dom.removeClass,

		/**
		 * Returns a given computed style of a DOM element.
		 *
		 * @method getStyle
		 * @static
		 * @param {Object} obj DOM element like object.
		 * @param {String} name Style you want to get from the DOM element
		 */
		getStyle: u.Dom.getStyle,

		/**
		 * Adds an event handler to the specified object and store reference to the handler
		 * in objects internal Plupload registry (@see removeEvent).
		 *
		 * @method addEvent
		 * @static
		 * @param {Object} obj DOM element like object to add handler to.
		 * @param {String} name Name to add event listener to.
		 * @param {Function} callback Function to call when event occurs.
		 * @param {String} (optional) key that might be used to add specifity to the event record.
		 */
		addEvent: u.Events.addEvent,

		/**
		 * Remove event handler from the specified object. If third argument (callback)
		 * is not specified remove all events with the specified name.
		 *
		 * @method removeEvent
		 * @static
		 * @param {Object} obj DOM element to remove event listener(s) from.
		 * @param {String} name Name of event listener to remove.
		 * @param {Function|String} (optional) might be a callback or unique key to match.
		 */
		removeEvent: u.Events.removeEvent,

		/**
		 * Remove all kind of events from the specified object
		 *
		 * @method removeAllEvents
		 * @static
		 * @param {Object} obj DOM element to remove event listeners from.
		 * @param {String} (optional) unique key to match, when removing events.
		 */
		removeAllEvents: u.Events.removeAllEvents,

		/**
		 * Cleans the specified name from national characters (diacritics). The result will be a name with only a-z, 0-9 and _.
		 *
		 * @method cleanName
		 * @static
		 * @param {String} s String to clean up.
		 * @return {String} Cleaned string.
		 */
		cleanName: function(name) {
			var i, lookup;

			// Replace diacritics
			lookup = [
				/[\300-\306]/g, 'A', /[\340-\346]/g, 'a',
				/\307/g, 'C', /\347/g, 'c',
				/[\310-\313]/g, 'E', /[\350-\353]/g, 'e',
				/[\314-\317]/g, 'I', /[\354-\357]/g, 'i',
				/\321/g, 'N', /\361/g, 'n',
				/[\322-\330]/g, 'O', /[\362-\370]/g, 'o',
				/[\331-\334]/g, 'U', /[\371-\374]/g, 'u'
			];

			for (i = 0; i < lookup.length; i += 2) {
				name = name.replace(lookup[i], lookup[i + 1]);
			}

			// Replace whitespace
			name = name.replace(/\s+/g, '_');

			// Remove anything else
			name = name.replace(/[^a-z0-9_\-\.]+/gi, '');

			return name;
		},

		/**
		 * Builds a full url out of a base URL and an object with items to append as query string items.
		 *
		 * @method buildUrl
		 * @static
		 * @param {String} url Base URL to append query string items to.
		 * @param {Object} items Name/value object to serialize as a querystring.
		 * @return {String} String with url + serialized query string items.
		 */
		buildUrl: function(url, items) {
			var query = '';

			u.Basic.each(items, function(value, name) {
				query += (query ? '&' : '') + encodeURIComponent(name) + '=' + encodeURIComponent(value);
			});

			if (query) {
				url += (url.indexOf('?') > 0 ? '&' : '?') + query;
			}

			return url;
		},

		/**
		 * Formats the specified number as a size string for example 1024 becomes 1 KB.
		 *
		 * @method formatSize
		 * @static
		 * @param {Number} size Size to format as string.
		 * @return {String} Formatted size string.
		 */
		formatSize: function(size) {
			var self = this;

			function round(num, precision) {
				return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
			}

			size = parseInt(size, 10);
			if (isNaN(size)) {
				return self.translate('N/A');
			}

			var boundary = Math.pow(1024, 4);

			// TB
			if (size > boundary) {
				return round(size / boundary, 1) + " " + self.translate('tb');
			}

			// GB
			if (size > (boundary /= 1024)) {
				return round(size / boundary, 1) + " " + self.translate('gb');
			}

			// MB
			if (size > (boundary /= 1024)) {
				return round(size / boundary, 1) + " " + self.translate('mb');
			}

			// KB
			if (size > 1024) {
				return Math.round(size / 1024) + " " + self.translate('kb');
			}

			return size + " " + self.translate('b');
		},

		/**
		 * @private
		 */
		mimes2extList: moxie.core.utils.Mime.mimes2extList,

		/**
		Resolve url - among other things will turn relative url to absolute

		@method resolveUrl
		@static
		@param {String|Object} url Either absolute or relative, or a result of parseUrl call
		@return {String} Resolved, absolute url
		*/
		resolveUrl: u.Url.resolveUrl,

		/**
		 * Parses the specified size string into a byte value. For example 10kb becomes 10240.
		 *
		 * @method parseSize
		 * @static
		 * @param {String|Number} size String to parse or number to just pass through.
		 * @return {Number} Size in bytes.
		 */
		parseSize: u.Basic.parseSizeStr,

		delay: u.Basic.delay,


		/**
		Parent object for all event dispatching components and objects

		@class plupload.EventTarget
		@private
		@constructor
		*/
		EventTarget: moxie.core.EventTarget,

		/**
		Common set of methods and properties for every runtime instance

		@class plupload.Runtime
		@private

		@param {Object} options
		@param {String} type Sanitized name of the runtime
		@param {Object} [caps] Set of capabilities that differentiate specified runtime
		@param {Object} [modeCaps] Set of capabilities that do require specific operational mode
		@param {String} [preferredMode='browser'] Preferred operational mode to choose if no required capabilities were requested
		*/
		Runtime: moxie.runtime.Runtime,

		/**
		Provides a convenient way to create cross-browser file-picker. Generates file selection dialog on click,
		converts selected files to _File_ objects, to be used in conjunction with _Image_, preloaded in memory
		with _FileReader_ or uploaded to a server through _XMLHttpRequest_.

		@class plupload.FileInput
		@private
		@constructor
		@extends EventTarget
		@uses RuntimeClient
		@param {Object|String|DOMElement} options If options is string or node, argument is considered as _browse\_button_.
			@param {String|DOMElement} options.browse_button DOM Element to turn into file picker.
			@param {Array} [options.accept] Array of mime types to accept. By default accepts all.
			@param {String} [options.file='file'] Name of the file field (not the filename).
			@param {Boolean} [options.multiple=false] Enable selection of multiple files.
			@param {Boolean} [options.directory=false] Turn file input into the folder input (cannot be both at the same time).
			@param {String|DOMElement} [options.container] DOM Element to use as a container for file-picker. Defaults to parentNode
			for _browse\_button_.
			@param {Object|String} [options.required_caps] Set of required capabilities, that chosen runtime must support.
		*/
		FileInput: moxie.file.FileInput,

		/**
		Utility for preloading o.Blob/o.File objects in memory. By design closely follows [W3C FileReader](http://www.w3.org/TR/FileAPI/#dfn-filereader)
		interface. Where possible uses native FileReader, where - not falls back to shims.

		@class plupload.FileReader
		@private
		@constructor
		@extends EventTarget
		@uses RuntimeClient
		*/
		FileReader: moxie.file.FileReader
	};

});

// Included from: src/core/Collection.js

/**
 * Collection.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
Helper collection class - in a way a mix of object and array

@contsructor
@class plupload.core.Collection
@private
*/
define('plupload/core/Collection', [
    'plupload'
], function(Basic) {

    var Collection = function() {
        var _registry = {};
        var _length = 0;
        var _last;


        plupload.extend(this, {

            count: function() {
                return _length;
            },

            hasKey: function(key) {
                return _registry.hasOwnProperty(key)
            },


            get: function(key) {
                return _registry[key];
            },


            first: function() {
                for (var key in _registry) {
                    return _registry[key];
                }
            },


            last: function() {
                return _last;
            },


            toObject: function() {
                return _registry;
            },


            add: function(key, obj) {
                var self = this;

                if (typeof(key) === 'object' && !obj) {
                    return plupload.each(key, function(obj, key) {
                        self.add(key, obj);
                    });
                }

                if (_registry.hasOwnProperty(key)) {
                    return self.update.apply(self, arguments);
                }

                _registry[key] = _last = obj;
                _length++;
            },


            remove: function(key) {
                if (this.hasKey(key)) {
                    var last = _registry[key];

                    delete _registry[key];
                    _length--;

                    // renew ref to the last added item if necessary
                    if (_last === last) {
                        _last = findLast();
                    }
                }
            },


            extract: function(key) {
                var item = this.get(key);
                this.remove(key);
                return item;
            },


            shift: function() {
                var self = this,
                    first, key;

                for (key in _registry) {
                    first = _registry[key];
                    self.remove(key);
                    return first;
                }
            },


            update: function(key, obj) {
                _registry[key] = obj;
            },


            each: function(cb) {
                plupload.each(_registry, cb);
            },


            combineWith: function() {
                var newCol = new Collection();

                newCol.add(_registry);

                plupload.each(arguments, function(col) {
                    if (col instanceof Collection) {
                        newCol.add(col.toObject());
                    }
                });
                return newCol;
            },


            clear: function() {
                _registry = {};
                _last = null;
                _length = 0;
            }
        });


        function findLast() {
            var key;
            for (key in _registry) {}
            return _registry[key];
        }

    };

    return Collection;
});

// Included from: src/core/ArrCollection.js

/**
 * ArrCollection.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
@contsructor
@class plupload.core.ArrCollection
@private
*/
define('plupload/core/ArrCollection', [
    'plupload'
], function(plupload) {

    var ArrCollection = function() {
        var _registry = [];

        plupload.extend(this, {

            count: function() {
                return _registry.length;
            },

            hasKey: function(key) {
                return this.getIdx(key) > -1;
            },


            get: function(key) {
                var idx = this.getIdx(key);
                return idx > -1 ? _registry[idx] : null;
            },

            getIdx: function(key) {
                for (var i = 0, length = _registry.length; i < length; i++) {
                    if (_registry[i].uid === key) {
                        return i;
                    }
                }
                return -1;
            },

            getByIdx: function(idx) {
                return _registry[idx]
            },

            first: function() {
                return _registry[0];
            },

            last: function() {
                return _registry[_registry.length - 1];
            },

            add: function(obj) {
                obj = arguments[1] || obj; // make it compatible with Collection.add()

                var idx = this.getIdx(obj.uid);
                if (idx > -1) {
                    _registry[idx] = obj;
                    return idx;
                }

                _registry.push(obj);
                return _registry.length - 1;
            },

            remove: function(key) {
                return !!this.extract(key);
            },

            splice: function(start, length) {
                start = plupload.typeOf(start) === 'undefinded' ? 0 : Math.max(start, 0);
                length = plupload.typeOf(length) !== 'undefinded' && start + length < _registry.length ? length : _registry.length - start;

                return _registry.splice(start, length);
            },

            extract: function(key) {
                var idx = this.getIdx(key);
                if (idx > -1) {
                    return _registry.splice(idx, 1);
                }
                return null;
            },

            shift: function() {
                return _registry.shift();
            },

            update: function(key, obj) {
                var idx = this.getIdx(key);
                if (idx > -1) {
                    _registry[idx] = obj;
                    return true;
                }
                return false;
            },

            each: function(cb) {
                plupload.each(_registry, cb);
            },

            combineWith: function() {
                return Array.prototype.concat.apply(this.toArray(), arguments);
            },

            sort: function(cb) {
                _registry.sort(cb || function(a, b) {
                    return a.priority - b.priority;
                });
            },

            clear: function() {
                _registry = [];
            },

            toObject: function() {
                var obj = {};
                for (var i = 0, length = _registry.length; i < length; i++) {
                    obj[_registry[i].uid] = _registry[i];
                }
                return obj;
            },

            toArray: function() {
                return Array.prototype.slice.call(_registry);
            }
        });
    };

    return ArrCollection;
});

// Included from: src/core/Optionable.js

/**
 * Optionable.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
@contsructor
@class plupload.core.Optionable
@private
@since 3.0
*/
define('plupload/core/Optionable', [
    'plupload'
], function(plupload) {
    var EventTarget = moxie.core.EventTarget;

    var dispatches = [
        /**
         * Dispatched when option is being changed.
         *
         * @event OptionChanged
         * @param {Object} event
         * @param {String} name Name of the option being changed
         * @param {Mixed} value
         * @param {Mixed} oldValue
         */
        'OptionChanged'
    ];

    return (function(Parent) {

        /**
         * @class Optionable
         * @constructor
         * @extends EventTarget
         */
        function Optionable() {
            Parent.apply(this, arguments);

            this._options = {};
        }

        plupload.inherit(Optionable, Parent);

        plupload.extend(Optionable.prototype, {
            /**
             * Set the value for the specified option(s).
             *
             * @method setOption
             * @since 2.1
             * @param {String|Object} option Name of the option to change or the set of key/value pairs
             * @param {Mixed} [value] Value for the option (is ignored, if first argument is object)
             * @param {Boolean} [mustBeDefined] if truthy, any option that is not in defaults will be ignored
             */
            setOption: function(option, value, mustBeDefined) {
                var self = this;
                var oldValue;

                if (typeof(option) === 'object') {
                    mustBeDefined = value;
                    plupload.each(option, function(value, option) {
                        self.setOption(option, value, mustBeDefined);
                    });
                    return;
                }

                if (mustBeDefined && !self._options.hasOwnProperty(option)) {
                    return;
                }

                oldValue = plupload.clone(self._options[option]);

                //! basically if an option is of type object extend it rather than replace
                if (plupload.typeOf(value) === 'object' && plupload.typeOf(self._options[option]) === 'object') {
                     // having some options as objects was a bad idea, prefixes is the way
                    plupload.extend(self._options[option], value);
                } else {
                    self._options[option] = value;
                }

                self.trigger('OptionChanged', option, value, oldValue);
            },

            /**
             * Get the value for the specified option or the whole configuration, if not specified.
             *
             * @method getOption
             * @since 2.1
             * @param {String} [option] Name of the option to get
             * @return {Mixed} Value for the option or the whole set
             */
            getOption: function(option) {
                if (!option) {
                    return this._options;
                }

                var value = this._options[option];
                if (plupload.inArray(plupload.typeOf(value), ['array', 'object']) > -1) {
                    return plupload.extendImmutable({}, value);
                } else {
                    return value;
                }
            },


            /**
             * Set many options as once.
             *
             * @method setOptions
             * @param {Object} options
             * @param {Boolean} [mustBeDefined] if truthy, any option that is not in defaults will be ignored
             */
            setOptions: function(options, mustBeDefined) {
                if (typeof(options) !== 'object') {
                    return;
                }
                this.setOption(options, mustBeDefined);
            },


            /**
            Gets all options.

            @method getOptions
            @return {Object}
            */
            getOptions: function() {
                return this.getOption();
            }
        });

        return Optionable;

    }(EventTarget));

});

// Included from: src/core/Queueable.js

/**
 * Queueable.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.se.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
Every queue item must have properties, implement methods and fire events defined in this class

@contsructor
@class plupload.core.Queueable
@private
@decorator
@extends EventTarget
*/
define('plupload/core/Queueable', [
    'plupload',
    'plupload/core/Optionable'
], function(plupload, Optionable) {

    var dispatches = [
        /**
         * Dispatched every time the state of queue changes
         *
         * @event statechanged
         * @param {Object} event
         * @param {Number} state New state
         * @param {Number} prevState Previous state
         */
        'statechanged',


        /**
         * Dispatched when the item is put on pending list
         *
         * @event queued
         * @param {Object} event
         */
        'queued',


        /**
         * Dispatched as soon as activity starts
         *
         * @event started
         * @param {Object} event
         */
        'started',


        'paused',


        'resumed',


        'stopped',


        /**
         * Dispatched as the activity progresses
         *
         * @event
         * @param {Object} event
         *      @param {Number} event.percent
         *      @param {Number} [event.processed]
         *      @param {Number} [event.total]
         */
        'progress',


        'failed',


        'done',


        'processed',

        'destroy'
    ];


    return (function(Parent) {

        function Queueable() {
            Parent.apply(this, arguments);

            /**
            Unique identifier
            @property uid
            @type {String}
            */
            this.uid = plupload.guid();

            this.state = Queueable.IDLE;

            this.processed = 0;

            this.total = 0;

            this.percent = 0;

            this.retries = 0;

            /**
             * Can be 0-Infinity - item with higher priority will have well... higher priority
             * @property [priority=0]
             * @type {Number}
             */
            this.priority = 0;

            this.startedTimestamp = 0;

            /**
             * Set when item becomes Queueable.DONE or Queueable.FAILED.
             * Used to calculate proper processedPerSec for the queue stats.
             * @property processedTimestamp
             * @type {Number}
             */
            this.processedTimestamp = 0;

            if (MXI_DEBUG) {
                this.bind('StateChanged', function(e, state, oldState) {
                    var self = this;

                    var stateToString = function(code) {
                        switch (code) {
                            case Queueable.IDLE:
                                return 'IDLE';

                            case Queueable.PROCESSING:
                                return 'PROCESSING';

                            case Queueable.PAUSED:
                                return 'PAUSED';

                            case Queueable.RESUMED:
                                return 'RESUMED';

                            case Queueable.DONE:
                                return 'DONE';

                            case Queueable.FAILED:
                                return 'FAILED';

                            case Queueable.DESTROYED:
                                return 'DESTROYED';
                        }
                    };

                    var indent = function() {
                        switch (self.ctorName) {
                            case 'File':
                                return "\t".repeat(2);

                            case 'QueueUpload':
                            case 'QueueResize':
                                return "\t";

                            case 'FileUploader':
                                return "\t".repeat(3);

                            case 'ChunkUploader':
                                return "\t".repeat(4);

                            default:
                                return "\t";
                        }
                    };

                    plupload.ua.log("StateChanged:" + indent() + self.ctorName + '::' + self.uid + ' (' + stateToString(oldState) + ' to ' + stateToString(state) + ')');
                }, 999);
            }
        }

        Queueable.IDLE = 1;
        Queueable.PROCESSING = 2;
        Queueable.PAUSED = 6;
        Queueable.RESUMED = 7;
        Queueable.DONE = 5;
        Queueable.FAILED = 4;
        Queueable.DESTROYED = 8;

        plupload.inherit(Queueable, Parent);

        plupload.extend(Queueable.prototype, {

            start: function() {
                var prevState = this.state;

                if (this.state === Queueable.PROCESSING) {
                    return false;
                }

                if (!this.startedTimestamp) {
                    this.startedTimestamp = +new Date();
                }

                if (this.state === Queueable.IDLE) {
                    this.state = Queueable.PROCESSING;
                    this.trigger('statechanged', this.state, prevState);
                    this.pause();
                    plupload.delay.call(this, function() {
                        if (this.trigger('beforestart')) {
                            this.resume();
                        }
                    });
                    return false;
                } else {
                    this.state = Queueable.PROCESSING;
                    this.trigger('statechanged', this.state, prevState);
                    this.trigger('started');
                }

                return true;
            },


            pause: function() {
                var prevState = this.state;

                if (this.state !== Queueable.PROCESSING) {
                    return false;
                }

                this.processed = this.percent = 0; // by default reset all progress
                this.loaded = this.processed; // for backward compatibility

                this.state = Queueable.PAUSED;
                this.trigger('statechanged', this.state, prevState);
                this.trigger('paused');
                return true;
            },


            resume: function() {
                var prevState = this.state;

                if (this.state !== Queueable.PAUSED && this.state !== Queueable.RESUMED) {
                    return false;
                }

                this.state = Queueable.RESUMED;
                this.trigger('statechanged', this.state, prevState);
                this.trigger('resumed');
                return true;
            },


            stop: function() {
                var prevState = this.state;

                if (this.state === Queueable.IDLE) {
                    return false;
                }

                this.processed = this.percent = 0;
                this.loaded = this.processed; // for backward compatibility

                this.startedTimestamp = 0;

                this.state = Queueable.IDLE;
                this.trigger('statechanged', this.state, prevState);
                this.trigger('stopped');
                return true;
            },


            done: function(result) {
                var prevState = this.state;

                if (this.state === Queueable.DONE) {
                    return false;
                }

                this.processed = this.total;
                this.loaded = this.processed; // for backward compatibility
                this.percent = 100;

                this.processedTimestamp = +new Date();

                this.state = Queueable.DONE;
                this.trigger('statechanged', this.state, prevState);
                this.trigger('done', result);
                this.trigger('processed');
                return true;
            },


            failed: function(result) {
                var prevState = this.state;

                if (this.state === Queueable.FAILED) {
                    return false;
                }

                this.processed = this.percent = 0; // reset the progress
                this.loaded = this.processed; // for backward compatibility

                this.processedTimestamp = +new Date();

                this.state = Queueable.FAILED;
                this.trigger('statechanged', this.state, prevState);
                this.trigger('failed', result);
                this.trigger('processed');
                return true;
            },


            progress: function(processed, total) {
                if (total) {
                    this.total = total; // is this even required?
                }

                this.processed = Math.min(processed, this.total);
                this.loaded = this.processed; // for backward compatibility
                this.percent = Math.ceil(this.processed / this.total * 100);

                this.trigger({
                    type: 'progress',
                    loaded: this.processed,
                    total: this.total
                });
            },


            destroy: function() {
                var prevState = this.state;

                if (this.state === Queueable.DESTROYED) {
                    return false; // already destroyed
                }

                this.state = Queueable.DESTROYED;
                this.trigger('statechanged', this.state, prevState);
                this.trigger('destroy');
                this.unbindAll();
                return true;
            }

        });

        return Queueable;

    }(Optionable));
});

// Included from: src/core/Stats.js

/**
@class plupload.core.Stats
@constructor
@private
*/
define('plupload/core/Stats', [], function() {

	return function() {
		var self = this;

		/**
		 * Total queue file size.
		 *
		 * @property size
		 * @deprecated use total
		 * @type Number
		 */
		self.size = 0;

		/**
		 * Total size of the queue in units.
		 *
		 * @property total
		 * @since 3.0
		 * @type Number
		 */
		self.total = 0;

		/**
		 * Total bytes uploaded.
		 *
		 * @property loaded
		 * @type Number
		 */
		self.loaded = 0;


		/**
		 * Number of files uploaded successfully.
		 *
		 * @property uploaded
		 * @deprecated use done
		 * @type Number
		 */
		self.uploaded = 0;

		/**
		 * Number of items processed successfully.
		 *
		 * @property done
		 * @since 3.0
		 * @type Number
		 */
		self.done = 0;

		/**
		 * Number of failed items.
		 *
		 * @property failed
		 * @type Number
		 */
		self.failed = 0;

		/**
		 * Number of items yet to be processed.
		 *
		 * @property queued
		 * @type Number
		 */
		self.queued = 0;

		/**
		 * Number of items currently paused.
		 *
		 * @property paused
		 * @type Number
		 */
		self.paused = 0;

		/**
		 * Number of items being processed.
		 *
		 * @property processing
		 * @type Number
		 */
		self.processing = 0;


		/**
		 * Number of items being paused.
		 *
		 * @property paused
		 * @type Number
		 */
		self.paused = 0;

		/**
		 * Percent of processed units.
		 *
		 * @property percent
		 * @type Number
		 */
		self.percent = 0;

		/**
		 * Bytes processed per second.
		 *
		 * @property bytesPerSec
		 * @deprecated use processedPerSec
		 * @type Number
		 */
		self.bytesPerSec = 0;

		/**
		 * Units processed per second.
		 *
		 * @property processedPerSec
		 * @since 3.0
		 * @type Number
		 */
		self.processedPerSec = 0;

		/**
		 * Resets the progress to its initial values.
		 *
		 * @method reset
		 */
		self.reset = function() {
			self.size = // deprecated
			self.total =
			self.loaded = // deprecated
			self.processed =
			self.uploaded = // deprecated
			self.done =
			self.failed =
			self.queued =
			self.processing =
			self.paused =
			self.percent =
			self.bytesPerSec = // deprecated
			self.processedPerSec = 0;
		};
	};
});

// Included from: src/core/Queue.js

/**
 * Queue.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
@contsructor
@class plupload.core.Queue
@private
*/
define('plupload/core/Queue', [
    'plupload',
    'plupload/core/ArrCollection',
    'plupload/core/Queueable',
    'plupload/core/Stats'
], function(plupload, ArrCollection, Queueable, Stats) {

    var dispatches = [
        /**
         * Dispatched as soon as activity starts
         *
         * @event started
         * @param {Object} event
         */
        'Started',


        /**
         * Dispatched as activity progresses
         *
         * @event progress
         * @param {Object} event
         * @param {Number} processed
         * @param {Number} total
         * @param {plupload.core.Stats} stats
         */
        'Progress',

        /**
         * Dispatched when activity is paused
         *
         * @event paused
         * @param {Object} event
         */
        'Paused',

        /**
         * Dispatched when there's no more items in processing
         *
         * @event done
         * @param {Object} event
         */
        'Done',

        /**
         * Dispatched as soon as activity ends
         *
         * @event stopped
         * @param {Object} event
         */
        'Stopped',

        /**
         * Dispatched when queue is destroyed
         *
         * @event destroy
         * @param {Object} event
         */
        'Destroy'
    ];

    /**
     * @class Queue
     * @constructor
     * @extends EventTarget
     */
    return (function(Parent) {
        plupload.inherit(Queue, Parent);


        function Queue(options) {
            Parent.apply(this, arguments);

            /**
            @property _queue
            @type {Collection}
            @private
            */
            this._queue = new ArrCollection();


            /**
            @property stats
            @type {Stats}
            @readOnly
            */
            this.stats = new Stats();


            this._options = plupload.extend({}, this._options, {
                max_slots: 1,
                max_retries: 0,
                auto_start: false,
                finish_active: false
            }, options);
        }

        plupload.extend(Queue.prototype, {

            /**
             * Returns number of items in the queue
             *
             * @method count
             * @returns {Number}
             */
            count: function() {
                return this._queue.count();
            },

            /**
             * Start the queue
             *
             * @method start
             */
            start: function() {
                var prevState = this.state;

                if (this.state === Queueable.PROCESSING) {
                    return false;
                }

                if (!this.startedTimestamp) {
                    this.startedTimestamp = +new Date();
                }

                this.state = Queueable.PROCESSING;
                this.trigger('statechanged', this.state, prevState);
                this.trigger('started');

                return processNext.call(this);
            },


            pause: function() {
                if (!Queue.super.pause.call(this)) {
                    return false;
                }

                this.forEachItem(function(item) {
                    item.pause();
                });
            },

            /**
             * Stop the queue. If `finish_active=true` the queue will wait until active items are done, before
             * stopping.
             *
             * @method stop
             */
            stop: function() {
                if (!Queue.super.stop.call(this) || this.getOption('finish_active')) {
                    return false;
                }

                if (this.isActive()) {
                    this.forEachItem(function(item) {
                        item.stop();
                    });
                }
            },


            forEachItem: function(cb) {
                this._queue.each(cb);
            },


            getItem: function(uid) {
                return this._queue.get(uid);
            },


            /**
             * Add instance of Queueable to the queue. If `auto_start=true` queue will start as well.
             *
             * @method addItem
             * @param {Queueable} item
             */
            addItem: function(item) {
                var self = this;

                item.bind('Started', function() {
                    if (self.calcStats()) {
                        plupload.delay.call(self, processNext);
                    }
                });

                item.bind('Resumed',function() {
                    self.start();
                });

                item.bind('Paused', function() {
                    if (self.calcStats()) {
                        plupload.delay.call(self, function() {
                            if (!processNext.call(self) && !self.stats.processing) {
                                self.pause();
                            }
                        });
                    }
                });

                item.bind('Processed Stopped', function() {
                    if (self.calcStats()) {
                        plupload.delay.call(self, function() {
                            if (!processNext.call(self) && !(this.stats.processing || this.stats.paused)) {
                                self.stop();
                            }
                        });
                    }
                });

                item.bind('Progress', function() {
                    if (self.calcStats()) {
                        self.trigger('Progress', self.stats.processed, self.stats.total, self.stats);
                    }
                });

                item.bind('Failed', function() {
                    if (self.getOption('max_retries') && this.retries < self.getOption('max_retries')) {
                        this.stop();
                        this.retries++;
                    }
                });

                this._queue.add(item.uid, item);
                this.calcStats();
                item.trigger('Queued');

                if (self.getOption('auto_start') || self.state === Queueable.PAUSED) {
                    plupload.delay.call(this, this.start);
                }
            },


            /**
             * Extracts item from the queue by its uid and returns it.
             *
             * @method extractItem
             * @param {String} uid
             * @return {Queueable} Item that was removed
             */
            extractItem: function(uid) {
                var item = this._queue.get(uid);
                if (item) {
                    this.stopItem(item.uid);
                    this._queue.remove(uid);
                    this.calcStats();
                }
                return item;
            },

            /**
             * Removes item from the queue and destroys it
             *
             * @method removeItem
             * @param {String} uid
             * @returns {Boolean} Result of the operation
             */
            removeItem: function(uid) {
                var item = this.extractItem(uid);
                if (item) {
                    item.destroy();
                    return true;
                }
                return false;
            },


            stopItem: function(uid) {
                var item = this._queue.get(uid);
                if (item) {
                    return item.stop();
                } else {
                    return false;
                }
            },


            pauseItem: function(uid) {
                var item = this._queue.get(uid);
                if (item) {
                    return item.pause();
                } else {
                    return false;
                }
            },


            resumeItem: function(uid) {
                var item = this._queue.get(uid);
                if (item) {
                    plupload.delay.call(this, function() {
                        this.start(); // start() will know if it needs to restart the queue
                    });
                    return item.resume();
                } else {
                    return false;
                }
            },


            splice: function(start, length) {
                return this._queue.splice(start, length);
            },


            isActive: function() {
                return this.stats && (this.stats.processing || this.stats.paused);
            },


            countSpareSlots: function() {
                return Math.max(this.getOption('max_slots') - this.stats.processing, 0);
            },


            toArray: function() {
                return this._queue.toArray();
            },


            clear: function() {
                var self = this;

                if (self.state !== Queueable.IDLE) {
                    // stop the active queue first
                    self.bindOnce('Stopped', function() {
                        self.clear();
                    });
                    return self.stop();
                } else {
                    self._queue.clear();
                    self.stats.reset();
                }
            },


            calcStats: function() {
                var self = this;
                var stats = self.stats;
                var processed = 0;
                var processedDuringThisSession = 0;

                if (!stats) {
                    return false; // maybe queue is destroyed
                }

                stats.reset();

                self.forEachItem(function(item) {
                    switch (item.state) {
                        case Queueable.DONE:
                            stats.done++;
                            stats.uploaded = stats.done; // for backward compatibility
                            break;

                        case Queueable.FAILED:
                            stats.failed++;
                            break;

                        case Queueable.PROCESSING:
                            stats.processing++;
                            break;

                        case Queueable.PAUSED:
                            stats.paused++;
                            break;

                        default:
                            stats.queued++;
                    }

                    processed += item.processed;

                    if (!item.processedTimestamp || item.processedTimestamp > self.startedTimestamp) {
                        processedDuringThisSession += processed;
                    }

                    stats.processedPerSec = Math.ceil(processedDuringThisSession / ((+new Date() - self.startedTimestamp || 1) / 1000.0));

                    stats.processed = processed;
                    stats.total += item.total;
                    if (stats.total) {
                        stats.percent = Math.ceil(stats.processed / stats.total * 100);
                    }
                });

                // enable properties inherited from Queueable

                /* TODO: this is good but it currently conflicts with deprecated total property in Uploader
                self.processed = stats.processed;
                self.total = stats.total;
                */
                self.percent = stats.percent;

                // for backward compatibility
                stats.loaded = stats.processed;
                stats.size = stats.total;
                stats.bytesPerSec = stats.processedPerSec;

                return true;
            },


            destroy: function() {
                var self = this;

                if (self.state === Queueable.DESTROYED) {
                    return false; // already destroyed
                }

                if (self.state !== Queueable.IDLE) {
                    // stop the active queue first
                    self.bindOnce('Stopped', function() {
                        plupload.delay.call(self, self.destroy);
                    });
                    return self.stop();
                } else {
                    self.clear();
                    Queue.super.destroy.call(this);
                    self._queue = self.stats = null;
                }
                return true;
            }
        });


        /**
         * Returns another Queueable.IDLE or Queueable.RESUMED item, or null.
         */
        function getNextIdleItem() {
            var nextItem;
            this.forEachItem(function(item) {
                if (item.state === Queueable.IDLE || item.state === Queueable.RESUMED) {
                    nextItem = item;
                    return false;
                }
            });
            return nextItem ? nextItem : null;
        }


        function processNext() {
            var item;

            if (this.state !== Queueable.PROCESSING && this.state !== Queueable.PAUSED) {
                return false;
            }

            if (this.stats.processing < this.getOption('max_slots')) {
                item = getNextIdleItem.call(this);
                if (item) {
                    item.setOptions(this.getOptions());
                    return item.start();
                }
            }
            return false;
        }

        return Queue;

    }(Queueable));
});

// Included from: src/QueueUpload.js

/**
 * QueueUpload.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
 @class plupload.QueueUpload
 @extends plupload.core.Queue
 @constructor
 @private
 @final
 @since 3.0
 @param {Object} options
 */
define('plupload/QueueUpload', [
    'plupload',
    'plupload/core/Queue'
], function(plupload, Queue) {

    return (function(Parent) {
        plupload.inherit(QueueUpload, Parent);

        function QueueUpload(options) {

            Queue.call(this, {
                max_slots: 1,
                max_retries: 0,
                auto_start: false,
                finish_active: false,
                url: false,
                chunk_size: 0,
                multipart: true,
                http_method: 'POST',
                params: {},
                headers: false,
                file_data_name: 'file',
                send_file_name: true,
                stop_on_fail: true
            });

            this.setOption = function(option, value) {
                if (typeof(option) !== 'object') {
                    if (option == 'max_upload_slots') {
                        option = 'max_slots';
                    }
                }
                QueueUpload.prototype.setOption.call(this, option, value, true);
            };

            this.setOptions(options);
        }

        return QueueUpload;
    }(Queue));
});

// Included from: src/QueueResize.js

/**
 * QueueResize.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
 @class plupload.QueueResize
 @extends plupload.core.Queue
 @constructor
 @private
 @final
 @since 3.0
 @param {Object} options
*/
define('plupload/QueueResize', [
    'plupload',
    'plupload/core/Queue'
], function(plupload, Queue) {

    return (function(Parent) {
        plupload.inherit(QueueResize, Parent);

        function QueueResize(options) {

            Queue.call(this, {
                max_slots: 1,
                max_retries: 0,
                auto_start: false,
                finish_active: false,
                resize: {}
            });

            this.setOption = function(option, value) {
                if (typeof(option) !== 'object') {
                    if (option == 'max_resize_slots') {
                        option = 'max_slots';
                    }
                }
                QueueResize.prototype.setOption.call(this, option, value, true);
            };


            this.setOptions(options);
        }


        return QueueResize;
    }(Queue));
});

// Included from: src/ChunkUploader.js

/**
 * ChunkUploader.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
 * @class plupload.ChunkUploader
 * @extends plupload.core.Queueable
 * @constructor
 * @private
 * @final
 * @constructor
 */
define('plupload/ChunkUploader', [
    'plupload',
    'plupload/core/Collection',
    'plupload/core/Queueable'
], function(plupload, Collection, Queueable) {
    var XMLHttpRequest = moxie.xhr.XMLHttpRequest;
    var FormData = moxie.xhr.FormData;

    function ChunkUploader(blob) {
        var _xhr;

        Queueable.call(this);

        this._options = {
			file_data_name: 'file',
			headers: false,
			http_method: 'POST',
			multipart: true,
			params: {},
			send_file_name: true,
			url: false
		};

        plupload.extend(this, {

            start: function() {
                var self = this;
                var url;
                var formData;
                var options = self._options;

                if (this.state === Queueable.PROCESSING) {
                    return false;
                }

                _xhr = new XMLHttpRequest();

                if (_xhr.upload) {
                    _xhr.upload.onprogress = function(e) {
                        self.progress(e.loaded, e.total);
                    };
                }

                _xhr.onload = function() {
                    var result = {
                        response: this.responseText,
                        status: this.status,
                        responseHeaders: this.getAllResponseHeaders()
                    };

                    if (this.status < 200 && this.status >= 400) { // assume error
                        return self.failed(result);
                    }

                    self.done(result);
                };

                _xhr.onerror = function() {
                    self.failed(); // TODO: reason here
                };

                _xhr.onloadend = function() {
                    // we do not need _xhr anymore, so destroy it
                    setTimeout(function() { // we detach to sustain reference until all handlers are done
                        if (_xhr) {
                            _xhr.destroy();
                            _xhr = null;
                        }
                    }, 1);
                };

                try {
                    url = options.multipart ? options.url : buildUrl(options.url, options.params);
                    _xhr.open(options.http_method, url, true);


                    // headers must be set after request is already opened, otherwise INVALID_STATE_ERR exception will raise
                    if (!plupload.isEmptyObj(options.headers)) {
                        plupload.each(options.headers, function(val, key) {
                            _xhr.setRequestHeader(key, val);
                        });
                    }


                    if (options.multipart) {
                        formData = new FormData();

                        if (!plupload.isEmptyObj(options.params)) {
                            plupload.each(options.params, function(val, key) {
                                formData.append(key, val);
                            });
                        }

                        formData.append(options.file_data_name, blob);

                        _xhr.send(formData);
                    } else { // if no multipart, send as binary stream
                        if (plupload.isEmptyObj(options.headers) || !_xhr.hasRequestHeader('content-type')) {
                            _xhr.setRequestHeader('content-type', 'application/octet-stream'); // binary stream header
                        }

                        _xhr.send(blob);
                    }

                    ChunkUploader.prototype.start.call(this);
                } catch(ex) {
                    self.failed();
                }
            },


            stop: function() {
                if (_xhr) {
                    _xhr.abort();
                    _xhr.destroy();
                    _xhr = null;
                }
                ChunkUploader.prototype.stop.call(this);
            },

            setOption: function(option, value) {
				ChunkUploader.prototype.setOption.call(this, option, value, true);
			},

			setOptions: function(options) {
				ChunkUploader.prototype.setOption.call(this, options, true);
			},

            destroy: function() {
                this.stop();
                ChunkUploader.prototype.destroy.call(this);
            }
        });


        /**
         * Builds a full url out of a base URL and an object with items to append as query string items.
         *
         * @method buildUrl
         * @private
         * @param {String} url Base URL to append query string items to.
         * @param {Object} items Name/value object to serialize as a querystring.
         * @return {String} String with url + serialized query string items.
         */
        function buildUrl(url, items) {
            var query = '';

            plupload.each(items, function(value, name) {
                query += (query ? '&' : '') + encodeURIComponent(name) + '=' + encodeURIComponent(value);
            });

            if (query) {
                url += (url.indexOf('?') > 0 ? '&' : '?') + query;
            }

            return url;
        }

    }

    plupload.inherit(ChunkUploader, Queueable);

    return ChunkUploader;
});

// Included from: src/FileUploader.js

/**
 * FileUploader.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.se.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
 * @class plupload.FileUploader
 * @extends plupload.core.Queueable
 * @constructor
 * @since 3.0
 * @final
 */
define('plupload/FileUploader', [
	'plupload',
	'plupload/core/Collection',
	'plupload/core/Queueable',
	'plupload/ChunkUploader'
], function(plupload, Collection, Queueable, ChunkUploader) {


	function FileUploader(file, queue) {
		var _chunks = new Collection();
		var _totalChunks = 1;

		Queueable.call(this);

		this._options = {
			chunk_size: 0,
			params: {},
			send_file_name: true,
			stop_on_fail: true
		};

		plupload.extend(this, {
			/**
			When send_file_name is set to true, will be sent with the request as `name` param.
            Can be used on server-side to override original file name.

            @property name
			@type {String}
            */
			name: file.name,


			start: function() {
				var self = this;
				var prevState = this.state;
				var up;

				if (this.state === Queueable.PROCESSING) {
					return false;
				}

				if (this.state === Queueable.IDLE && !FileUploader.prototype.start.call(self)) {
					return false;
				}

				// send additional 'name' parameter only if required or explicitly requested
				if (self._options.send_file_name) {
					self._options.params.name = self.target_name || self.name;
				}

				if (self._options.chunk_size) {
					_totalChunks = Math.ceil(file.size / self._options.chunk_size);
					self.uploadChunk(false, true);
				} else {
					up = new ChunkUploader(file);

					up.bind('progress', function(e) {
						self.progress(e.loaded, e.total);
					});

					up.bind('done', function(e, result) {
						self.done(result);
					});

					up.bind('failed', function(e, result) {
						self.failed(result);
					});

					up.setOptions(self._options);

					queue.addItem(up);
				}

				this.state = Queueable.PROCESSING;
				this.trigger('statechanged', this.state, prevState);
				this.trigger('started');
				return true;
			},


			uploadChunk: function(seq, dontStop) {
				var self = this;
				var chunkSize = this.getOption('chunk_size');
				var up;
				var chunk = {};
				var _options;

				chunk.seq = parseInt(seq, 10) || getNextChunk();
				chunk.start = chunk.seq * chunkSize;
				chunk.end = Math.min(chunk.start + chunkSize, file.size);
				chunk.total = file.size;

				// do not proceed for weird chunks
				if (chunk.start < 0 || chunk.start >= file.size) {
					return false;
				}

				_options = plupload.extendImmutable({}, this.getOptions(), {
					params: {
						chunk: chunk.seq,
						chunks: _totalChunks
					}
				});

				up = new ChunkUploader(file.slice(chunk.start, chunk.end, file.type));

				/*up.bind('beforestart', function(e) {
					self.trigger('beforechunkupload', file, this.getOption('params'), blob)
				});*/

				up.bind('progress', function(e) {
					self.progress(calcProcessed() + e.loaded, file.size);
				});

				up.bind('failed', function(e, result) {
					_chunks.add(chunk.seq, plupload.extend({
						state: Queueable.FAILED
					}, chunk));

					self.trigger('chunkuploadfailed', plupload.extendImmutable({}, chunk, result));

					if (_options.stop_on_fail) {
						self.failed(result);
					}
				});

				up.bind('done', function(e, result) {
					_chunks.add(chunk.seq, plupload.extend({
						state: Queueable.DONE
					}, chunk));

					self.trigger('chunkuploaded', plupload.extendImmutable({}, chunk, result));

					if (calcProcessed() >= file.size) {
						self.progress(file.size, file.size);
						self.done(result); // obviously we are done
					} else if (dontStop) {
						plupload.delay(function() {
							self.uploadChunk(getNextChunk(), dontStop);
						});
					}
				});

				up.bind('processed', function() {
					this.destroy();
				});

				up.setOptions(_options);

				_chunks.add(chunk.seq, plupload.extend({
					state: Queueable.PROCESSING
				}, chunk));

				queue.addItem(up);

				// enqueue even more chunks if slots available
				if (dontStop && queue.countSpareSlots()) {
					self.uploadChunk(getNextChunk(), dontStop);
				}

				return true;
			},

			destroy: function() {
				FileUploader.prototype.destroy.call(this);
				_chunks.clear();
			}
		});


		function calcProcessed() {
			var processed = 0;

			_chunks.each(function(item) {
				if (item.state === Queueable.DONE) {
					processed += (item.end - item.start);
				}
			});

			return processed;
		}


		function getNextChunk() {
			var i = 0;
			while (i < _totalChunks && _chunks.hasKey(i)) {
				i++;
			}
			return i;
		}

	}


	plupload.inherit(FileUploader, Queueable);

	return FileUploader;
});

// Included from: src/ImageResizer.js

/**
 * ImageResizer.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
 @class plupload.ImageResizer
 @extends plupload.core.Queueable
 @constructor
 @private
 @final
 @since 3.0
 @param {plupload.File} fileRef
*/
define("plupload/ImageResizer", [
	'plupload',
	'plupload/core/Queueable'
], function(plupload, Queueable) {
	var mxiImage = moxie.image.Image;

	function ImageResizer(fileRef) {

		Queueable.call(this);

		this._options = {
			width: 0,
			height: 0,
			type: 'image/jpeg',
			quality: 90,
			crop: false,
			fit: true,
			preserveHeaders: true,
			resample: 'default',
			multipass: true
		};

		this.setOption = function(option, value) {
			if (typeof(option) !== 'object' && !this._options.hasOwnProperty(option)) {
				return;
			}
			ImageResizer.prototype.setOption.apply(this, arguments);
		};


		this.start = function(options) {
			var self = this;
			var img;

			if (options) {
				this.setOptions(options.resize);
			}

			img = new mxiImage();

			img.bind('load', function() {
				this.resize(self.getOptions());
			});

			img.bind('resize', function() {
				self.done(this.getAsBlob(self.getOption('type'), self.getOption('quality')));
				this.destroy();
			});

			img.bind('error', function() {
				self.failed();
				this.destroy();
			});

			img.load(fileRef, self.getOption('runtimeOptions'));
		};
	}

	plupload.inherit(ImageResizer, Queueable);

	// ImageResizer is only included for builds with Image manipulation support, so we add plupload.Image here manually
	plupload.Image = mxiImage;

	return ImageResizer;
});

// Included from: src/File.js

/**
 * File.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.se.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
 * @class plupload.File
 * @extends plupload.core.Queueable
 * @constructor
 * @since 3.0
 * @final
 */
define('plupload/File', [
    'plupload',
    'plupload/core/Queueable',
    'plupload/FileUploader',
    'plupload/ImageResizer'
], function(plupload, Queueable, FileUploader, ImageResizer) {

    function File(file, queueUpload, queueResize) {
        Queueable.call(this);


        plupload.extend(this, {
            /**
             * For backward compatibility
             *
             * @property id
             * @type {String}
             * @deprecated
             */
            id: this.uid,


            /**
             When send_file_name is set to true, will be sent with the request as `name` param.
             Can be used on server-side to override original file name.

             @property name
             @type {String}
             */
            name: file.name,

            /**
             @property target_name
             @type {String}
             @deprecated use name
             */
            target_name: null,

            /**
             * File type, `e.g image/jpeg`
             *
             * @property type
             * @type String
             */
            type: file.type,

            /**
             * File size in bytes (may change after client-side manupilation).
             *
             * @property size
             * @type Number
             */
            size: file.size,

            /**
             * Original file size in bytes.
             *
             * @property origSize
             * @type Number
             */
            origSize: file.size,

            start: function() {
                var prevState = this.state;

                if (this.state === Queueable.PROCESSING) {
                    return false;
                }

                this.state = Queueable.PROCESSING;
                this.trigger('statechanged', this.state, prevState);
                this.trigger('started');

                if (!plupload.isEmptyObj(this._options.resize) && isImage(this.type) && runtimeCan(file, 'send_binary_string')) {
                    this.resizeAndUpload();
                } else {
                    this.upload();
                }
                return true;
            },

            /**
             * Get the file for which this File is responsible
             *
             * @method getSource
             * @returns {moxie.file.File}
             */
            getSource: function() {
                return file;
            },

            /**
             * Returns file representation of the current runtime. For HTML5 runtime
             * this is going to be native browser File object
             * (for backward compatibility)
             *
             * @method getNative
             * @deprecated
             * @returns {File|Blob|Object}
             */
            getNative: function() {
                return this.getFile().getSource();
            },


            resizeAndUpload: function() {
                var self = this;
                var opts = self.getOptions();
                var rszr = new ImageResizer(file);

                rszr.bind('progress', function(e) {
                    self.progress(e.loaded, e.total);
                });

                rszr.bind('done', function(e, file) {
                    file = file;
                    self.upload();
                });

                rszr.bind('failed', function() {
                    self.upload();
                });

                rszr.setOption('runtimeOptions', {
                    runtime_order: opts.runtimes,
                    required_caps: opts.required_features,
                    preferred_caps: opts.preferred_caps,
                    swf_url: opts.flash_swf_url,
                    xap_url: opts.silverlight_xap_url
                });

                queueResize.addItem(rszr);
            },


            upload: function() {
                var self = this;
                var up = new FileUploader(file, queueUpload);

                up.bind('beforestart', function() {
                    return self.trigger('beforeupload');
                });

                up.bind('paused', function() {
                    self.pause();
                });

                up.bind('resumed', function() {
                    this.start();
                });

                up.bind('started', function() {
                    self.trigger('startupload');
                });

                up.bind('progress', function(e) {
                    self.progress(e.loaded, e.total);
                });

                up.bind('done', function(e, result) {
                    self.done(result);
                });

                up.bind('failed', function(e, result) {
                    self.failed(result);
                });

                up.setOptions(self.getOptions());

                up.start();
            },



            destroy: function() {
                File.prototype.destroy.call(this);
                file = null;
            }
        });
    }


    function isImage(type) {
        return plupload.inArray(type, ['image/jpeg', 'image/png']) > -1;
    }


    function runtimeCan(blob, cap) {
        if (blob.ruid) {
            var info = plupload.Runtime.getInfo(blob.ruid);
            if (info) {
                return info.can(cap);
            }
        }
        return false;
    }


    plupload.inherit(File, Queueable);

    return File;
});

// Included from: src/Uploader.js

/**
 * Uploader.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
@class plupload.Uploader
@extends plupload.core.Queue
@constructor
@public
@final

@param {Object} settings For detailed information about each option check documentation.
	@param {String|DOMElement} settings.browse_button id of the DOM element or DOM element itself to use as file dialog trigger.
	@param {Number|String} [settings.chunk_size=0] Chunk size in bytes to slice the file into. Shorcuts with b, kb, mb, gb, tb suffixes also supported. `e.g. 204800 or "204800b" or "200kb"`. By default - disabled.
	@param {Boolean} [settings.send_chunk_number=true] Whether to send chunks and chunk numbers, or total and offset bytes.
	@param {String|DOMElement} [settings.container] id of the DOM element or DOM element itself that will be used to wrap uploader structures. Defaults to immediate parent of the `browse_button` element.
	@param {String|DOMElement} [settings.drop_element] id of the DOM element or DOM element itself to use as a drop zone for Drag-n-Drop.
	@param {String} [settings.file_data_name="file"] Name for the file field in Multipart formated message.
	@param {Object} [settings.filters={}] Set of file type filters.
		@param {Array} [settings.filters.mime_types=[]] List of file types to accept, each one defined by title and list of extensions. `e.g. {title : "Image files", extensions : "jpg,jpeg,gif,png"}`. Dispatches `plupload.FILE_EXTENSION_ERROR`
		@param {String|Number} [settings.filters.max_file_size=0] Maximum file size that the user can pick, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. `e.g. "10mb" or "1gb"`. By default - not set. Dispatches `plupload.FILE_SIZE_ERROR`.
		@param {Boolean} [settings.filters.prevent_duplicates=false] Do not let duplicates into the queue. Dispatches `plupload.FILE_DUPLICATE_ERROR`.
	@param {String} [settings.flash_swf_url] URL of the Flash swf.
	@param {Object} [settings.headers] Custom headers to send with the upload. Hash of name/value pairs.
	@param {String} [settings.http_method="POST"] HTTP method to use during upload (only PUT or POST allowed).
	@param {Number} [settings.max_retries=0] How many times to retry the chunk or file, before triggering Error event.
	@param {Boolean} [settings.multipart=true] Whether to send file and additional parameters as Multipart formated message.
	@param {Boolean} [settings.multi_selection=true] Enable ability to select multiple files at once in file dialog.
	@param {Object} [settings.params] Hash of key/value pairs to send with every file upload.
	@param {String|Object} [settings.required_features] Either comma-separated list or hash of required features that chosen runtime should absolutely possess.
	@param {Object} [settings.resize] Enable resizing of images on client-side. Applies to `image/jpeg` and `image/png` only. `e.g. {width : 200, height : 200, quality : 90, crop: true}`
		 @param {Number} settings.resize.width Resulting width
		 @param {Number} [settings.resize.height=width] Resulting height (optional, if not supplied will default to width)
		 @param {String} [settings.resize.type='image/jpeg'] MIME type of the resulting image
		 @param {Number} [settings.resize.quality=90] In the case of JPEG, controls the quality of resulting image
		 @param {Boolean} [settings.resize.crop='cc'] If not falsy, image will be cropped, by default from center
		 @param {Boolean} [settings.resize.fit=true] In case of crop whether to upscale the image to fit the exact dimensions
		 @param {Boolean} [settings.resize.preserveHeaders=true] Whether to preserve meta headers (on JPEGs after resize)
		 @param {String} [settings.resize.resample='default'] Resampling algorithm to use during resize
		 @param {Boolean} [settings.resize.multipass=true] Whether to scale the image in steps (results in better quality)
 	@param {String} [settings.runtimes="html5,flash,silverlight,html4"] Comma separated list of runtimes, that Plupload will try in turn, moving to the next if previous fails.
	@param {Boolean} [settings.send_file_name=true] Whether to send file name as additional argument - 'name' (required for chunked uploads and some other cases where file name cannot be sent via normal ways).
	@param {String} [settings.silverlight_xap_url] URL of the Silverlight xap.
	@param {Boolean} [settings.unique_names=false] If true will generate unique filenames for uploaded files.
	@param {String} settings.url URL of the server-side upload handler.
*/

/**
Fires when the current RunTime has been initialized.

@event Init
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires after the init event incase you need to perform actions there.

@event PostInit
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires when the option is changed in via uploader.setOption().

@event OptionChanged
@since 2.1
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {String} name Name of the option that was changed
@param {Mixed} value New value for the specified option
@param {Mixed} oldValue Previous value of the option
 */

/**
Fires when the silverlight/flash or other shim needs to move.

@event Refresh
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires when the overall state is being changed for the upload queue.

@event StateChanged
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires when browse_button is clicked and browse dialog shows.

@event Browse
@since 2.1.2
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires for every filtered file before it is added to the queue.

@event FileFiltered
@since 2.1
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file Another file that has to be added to the queue.
 */

/**
Fires when the file queue is changed. In other words when files are added/removed to the files array of the uploader instance.

@event QueueChanged
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires after files were filtered and added to the queue.

@event FilesAdded
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {Array} files Array of FileUploader objects that were added to the queue by user.
 */

/**
Fires when file is removed from the queue.

@event FilesRemoved
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {Array} files Array of files that got removed.
 */

/**
Fires just before a file is uploaded. Can be used to cancel upload of the current file
by returning false from the handler.

@event BeforeUpload
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File to be uploaded.
 */

/**
Fires when a file is to be uploaded by the runtime.

@event UploadFile
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File to be uploaded.
 */

/**
Fires while a file is being uploaded. Use this event to update the current file upload progress.

@event UploadProgress
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File that is currently being uploaded.
 */

/**
Fires when file chunk is uploaded.

@event ChunkUploaded
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File that the chunk was uploaded for.
@param {Object} result Object with response properties.
	@param {Number} result.offset The amount of bytes the server has received so far, including this chunk.
	@param {Number} result.total The size of the file.
	@param {String} result.response The response body sent by the server.
	@param {Number} result.status The HTTP status code sent by the server.
	@param {String} result.responseHeaders All the response headers as a single string.
 */

/**
Fires when a file is successfully uploaded.

@event FileUploaded
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File that was uploaded.
@param {Object} result Object with response properties.
	@param {String} result.response The response body sent by the server.
	@param {Number} result.status The HTTP status code sent by the server.
	@param {String} result.responseHeaders All the response headers as a single string.
 */

/**
Fires when all files in a queue are uploaded

@event UploadComplete
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */


/**
Fires whenever upload is aborted for some reason

@event CancelUpload
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires when a error occurs.

@event Error
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {Object} error Contains code, message and sometimes file and other details.
	@param {Number} error.code The plupload error code.
	@param {String} error.message Description of the error (uses i18n).
 */

/**
Fires when destroy method is called.

@event Destroy
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */
define('plupload/Uploader', [
	'plupload',
	'plupload/core/Collection',
	'plupload/core/Queue',
	'plupload/QueueUpload',
	'plupload/QueueResize',
	'plupload/File'
], function(plupload, Collection, Queue, QueueUpload, QueueResize, PluploadFile) {

	var fileFilters = {};
	var undef;


	function Uploader(options) {
		var _fileInputs = [];
		var _fileDrops = [];
		var _queueUpload, _queueResize;
		var _initialized = false;
		var _disabled = false;

		var _options = normalizeOptions(plupload.extend({
			backward_compatibility: true,
			chunk_size: 0,
			file_data_name: 'file',
			filters: {
				mime_types: '*',
				prevent_duplicates: false,
				max_file_size: 0
			},
			flash_swf_url: 'js/Moxie.swf',
			// @since 2.3
			http_method: 'POST',
			// headers: false, // Plupload had a required feature with the same name, comment it to avoid confusion
			max_resize_slots: 1,
			max_retries: 0,
			max_upload_slots: 1,
			multipart: true,
			multipart_params: {}, // deprecated, use - params,
			multi_selection: true,
			// @since 3
			params: {},
			resize: false,
			runtimes: plupload.Runtime.order,
			send_chunk_number: true, // whether to send chunks and chunk numbers, instead of total and offset bytes
			send_file_name: true,
			silverlight_xap_url: 'js/Moxie.xap',

			// during normalization, these should be processed last
			required_features: false,
			preferred_caps: false
		}, options));

		Queue.call(this);


		// Add public methods
		plupload.extend(this, {

			_options: _options,

			/**
			 * Unique id for the Uploader instance.
			 *
			 * @property id
			 * @type String
			 */
			id: this.uid,

			/**
			 * Current state of the total uploading progress. This one can either be plupload.STARTED or plupload.STOPPED.
			 * These states are controlled by the stop/start methods. The default value is STOPPED.
			 *
			 * @property state
			 * @type Number
			 */
			state: plupload.STOPPED,

			/**
			 * Map of features that are available for the uploader runtime. Features will be filled
			 * before the init event is called, these features can then be used to alter the UI for the end user.
			 * Some of the current features that might be in this map is: dragdrop, chunks, jpgresize, pngresize.
			 *
			 * @property features
			 * @type Object
			 * @deprecated
			 */
			features: {},

			/**
			 * Object with name/value settings.
			 *
			 * @property settings
			 * @type Object
			 * @deprecated Use `getOption()/setOption()`
			 */
			settings : _options,

			/**
			 * Current runtime name
			 *
			 * @property runtime
			 * @type String
			 * @deprecated There might be multiple runtimes per uploader
			 */
			runtime: null,

			/**
			 * Current upload queue, an array of File instances
			 *
			 * @property files
			 * @deprecated use forEachItem(callback) to cycle over the items in the queue
			 * @type Array
			 */
			files: [],

			/**
			 * Total progess information. How many files has been uploaded, total percent etc.
			 *
			 * @property total
			 * @deprecated use stats
			 */
			total: this.stats,

			/**
			 * Initializes the Uploader instance and adds internal event listeners.
			 *
			 * @method init
			 */
			init: function() {
				var self = this, preinitOpt, err;

				preinitOpt = self.getOption('preinit');
				if (typeof(preinitOpt) == "function") {
					preinitOpt(self);
				} else {
					plupload.each(preinitOpt, function(func, name) {
						self.bind(name, func);
					});
				}

				bindEventListeners.call(self);

				// Check for required options
				plupload.each(['container', 'browse_button', 'drop_element'], function(el) {
					if (self.getOption(el) === null) {
						err = {
							code: plupload.INIT_ERROR,
							message: plupload.sprintf(plupload.translate("%s specified, but cannot be found."), el)
						}
						return false;
					}
				});

				if (err) {
					return self.trigger('Error', err);
				}


				if (!self.getOption('browse_button') && !self.getOption('drop_element')) {
					return self.trigger('Error', {
						code: plupload.INIT_ERROR,
						message: plupload.translate("You must specify either browse_button or drop_element.")
					});
				}


				initControls.call(self, function(initialized) {
					var runtime;
					var initOpt = self.getOption('init');
					var queueOpts = plupload.extendImmutable({}, self.getOption(), { auto_start: true });

					if (typeof(initOpt) == "function") {
						initOpt(self);
					} else {
						plupload.each(initOpt, function(func, name) {
							self.bind(name, func);
						});
					}

					if (initialized) {
						_initialized = true;
						runtime = plupload.Runtime.getInfo(getRUID());

						_queueUpload = new QueueUpload(queueOpts);
						_queueResize = new QueueResize(queueOpts);

						self.trigger('Init', {
							ruid: runtime.uid,
							runtime: self.runtime = runtime.type
						});

						self.trigger('PostInit');
					} else {
						self.trigger('Error', {
							code: plupload.INIT_ERROR,
							message: plupload.translate('Init error.')
						});
					}
				});
			},

			/**
			 * Set the value for the specified option(s).
			 *
			 * @method setOption
			 * @since 2.1
			 * @param {String|Object} option Name of the option to change or the set of key/value pairs
			 * @param {Mixed} [value] Value for the option (is ignored, if first argument is object)
			 */
			setOption: function(option, value) {
				if (_initialized) {
					// following options cannot be changed after initialization
					if (plupload.inArray(option, [
						'container',
						'browse_button',
						'drop_element',
						'runtimes',
						'multi_selection',
						'flash_swf_url',
						'silverlight_xap_url'
					]) > -1) {
						return this.trigger('Error', {
							code: plupload.OPTION_ERROR,
							message: plupload.sprintf(plupload.translate("%s option cannot be changed.")),
							option: option
						});
					}
				}

				if (typeof(option) !== 'object') {
					value = normalizeOption(option, value, this._options);

					// queues will take in only appropriate options
					if (_queueUpload) {
						_queueUpload.setOption(option, value);
					}
					if (_queueResize) {
						_queueResize.setOption(option, value);
					}
				}

				Uploader.prototype.setOption.call(this, option, value);
			},

			/**
			 * Refreshes the upload instance by dispatching out a refresh event to all runtimes.
			 * This would for example reposition flash/silverlight shims on the page.
			 *
			 * @method refresh
			 */
			refresh: function() {
				if (_fileInputs.length) {
					plupload.each(_fileInputs, function(fileInput) {
						fileInput.trigger('Refresh');
					});
				}

				if (_fileDrops.length) {
					plupload.each(_fileDrops, function(fileDrops) {
						fileDrops.trigger('Refresh');
					});
				}

				this.trigger('Refresh');
			},

			/**
			 * Stops the upload of the queued files.
			 *
			 * @method stop
			 */
			stop: function() {
				if (Uploader.prototype.stop.call(this) && this.state != plupload.STOPPED) {
					this.trigger('CancelUpload');
				}
			},


			/**
			 * Disables/enables browse button on request.
			 *
			 * @method disableBrowse
			 * @param {Boolean} disable Whether to disable or enable (default: true)
			 */
			disableBrowse: function() {
				_disabled = arguments[0] !== undef ? arguments[0] : true;

				if (_fileInputs.length) {
					plupload.each(_fileInputs, function(fileInput) {
						fileInput.disable(_disabled);
					});
				}

				this.trigger('DisableBrowse', _disabled);
			},

			/**
			 * Returns the specified FileUploader object by id
			 *
			 * @method getFile
			 * @deprecated use getItem()
			 * @param {String} id FileUploader id to look for
			 * @return {plupload.FileUploader}
			 */
			getFile: function(id) {
				return this.getItem(id);
			},

			/**
			 * Adds file to the queue programmatically. Can be native file, instance of Plupload.File,
			 * instance of mOxie.File, input[type="file"] element, or array of these. Fires FilesAdded,
			 * if any files were added to the queue. Otherwise nothing happens.
			 *
			 * @method addFile
			 * @since 2.0
			 * @param {plupload.File|mOxie.File|File|Node|Array} file File or files to add to the queue.
			 * @param {String} [fileName] If specified, will be used as a name for the file
			 */
			addFile: function(file, fileName) {
				var self = this;
				var queue = [];
				var ruid; // spare runtime uid, for those files that do not have their own
				var filesAdded = []; // here we track the files that got filtered and are added to the queue


				function bindListeners(fileUp) {
					fileUp.bind('beforeupload', function(e) {
						return self.trigger('BeforeUpload', e.target);
					});

					fileUp.bind('startupload', function() {
						self.trigger('UploadFile', this);
					});

					fileUp.bind('progress', function() {
						self.trigger('UploadProgress', this);
					});

					fileUp.bind('done', function(e, args) {
						self.trigger('FileUploaded', this, args);
					});

					fileUp.bind('failed', function(e, err) {
						self.trigger('Error', plupload.extend({
							code: plupload.HTTP_ERROR,
							message: plupload.translate('HTTP Error.'),
							file: this
						}, err));
					});
				}


				function filterFile(file, cb) {
					var queue = [];
					plupload.each(self.getOption('filters'), function(rule, name) {
						if (fileFilters[name]) {
							queue.push(function(cb) {
								fileFilters[name].call(self, rule, file, function(res) {
									cb(!res);
								});
							});
						}
					});
					plupload.inParallel(queue, cb);
				}

				/**
				 * @method resolveFile
				 * @private
				 * @param {mxiFile|mxiBlob|FileUploader|File|Blob|input[type="file"]} file
				 */
				function resolveFile(file) {
					var type = plupload.typeOf(file);

					// mxiFile (final step for other conditional branches)
					if (file instanceof moxie.file.File) {
						if (!file.ruid && !file.isDetached()) {
							if (!ruid) { // weird case
								return false;
							}
							file.ruid = ruid;
							file.connectRuntime(ruid);
						}

						queue.push(function(cb) {
							// run through the internal and user-defined filters, if any
							filterFile(file, function(err) {
								var fileUp;

								if (!err) {
									fileUp = new PluploadFile(file, _queueUpload, _queueResize);

									if (fileName) {
										fileUp.name = fileName;
									}

									bindListeners(fileUp);

									self.addItem(fileUp); // make files available for the filters by updating the main queue directly
									filesAdded.push(fileUp);
									self.trigger("FileFiltered", fileUp);
								}

								plupload.delay(cb); // do not build up recursions or eventually we might hit the limits
							});
						});
					}
					// mxiBlob
					else if (file instanceof moxie.file.Blob) {
						resolveFile(file.getSource());
						file.destroy();
					}
					// native File or blob
					else if (plupload.inArray(type, ['file', 'blob']) !== -1) {
						resolveFile(new moxie.file.File(null, file));
					}
					// input[type="file"]
					else if (type === 'node' && plupload.typeOf(file.files) === 'filelist') {
						// if we are dealing with input[type="file"]
						plupload.each(file.files, resolveFile);
					}
					// mixed array of any supported types (see above)
					else if (type === 'array') {
						fileName = null; // should never happen, but unset anyway to avoid funny situations
						plupload.each(file, resolveFile);
					}
				}

				ruid = getRUID();

				resolveFile(file);

				if (queue.length) {
					plupload.inParallel(queue, function() {
						// if any files left after filtration, trigger FilesAdded
						if (filesAdded.length) {
							self.trigger("FilesAdded", filesAdded);
						}
					});
				}
			},

			/**
			 * Removes a specific item from the queue
			 *
			 * @method removeFile
			 * @param {plupload.FileUploader|String} file
			 */
			removeFile: function(file) {
				var item = this.extractItem(typeof(file) === 'string' ? file : file.uid);
				if (item) {
					this.trigger("FilesRemoved", [item]);
					item.destroy();
				}
			},

			/**
			 * Removes part of the queue and returns removed files.
			 * Triggers FilesRemoved and consequently QueueChanged events.
			 *
			 * @method splice
			 * @param {Number} [start=0] Start index to remove from
			 * @param {Number} [length] Length of items to remove
			 */
			splice: function() {
				var i = 0;
				var shouldRestart = plupload.STARTED == this.state;

				var removed = Queue.prototype.splice.apply(this, arguments);
				if (removed.length) {
					this.trigger("FilesRemoved", removed);

					if (shouldRestart) {
						this.stop();
					}

					for (i = 0; i < removed.length; i++) {
						removed[i].destroy();
					}

					if (shouldRestart) {
						this.start();
					}
				}
			},

			/**
			Dispatches the specified event name and its arguments to all listeners.

			@method trigger
			@param {String} name Event name to fire.
			@param {Object..} Multiple arguments to pass along to the listener functions.
			*/

			// override the parent method to match Plupload-like event logic
			dispatchEvent: function(type) {
				var list, args, result;

				type = type.toLowerCase();

				list = this.hasEventListener(type);

				if (list) {
					// sort event list by priority
					list.sort(function(a, b) {
						return b.priority - a.priority;
					});

					// first argument should be current plupload.Uploader instance
					args = [].slice.call(arguments);
					args.shift();
					args.unshift(this);

					for (var i = 0; i < list.length; i++) {
						// Fire event, break chain if false is returned
						if (list[i].fn.apply(list[i].scope, args) === false) {
							return false;
						}
					}
				}
				return true;
			},

			/**
			Check whether uploader has any listeners to the specified event.

			@method hasEventListener
			@param {String} name Event name to check for.
			*/


			/**
			Adds an event listener by name.

			@method bind
			@param {String} name Event name to listen for.
			@param {function} fn Function to call ones the event gets fired.
			@param {Object} [scope] Optional scope to execute the specified function in.
			@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
			*/
			bind: function(name, fn, scope, priority) {
				// adapt moxie EventTarget style to Plupload-like
				plupload.Uploader.prototype.bind.call(this, name, fn, priority, scope);
			}

			/**
			Removes the specified event listener.

			@method unbind
			@param {String} name Name of event to remove.
			@param {function} fn Function to remove from listener.
			*/

			/**
			Removes all event listeners.

			@method unbindAll
			*/
		});


		// keep alive deprecated properties
		if (_options.backward_compatibility) {
			this.bind('FilesAdded FilesRemoved', function (up) {
				up.files = up.toArray();
			}, this, 999);

			this.bind('OptionChanged', function (up, name, value) {
				up.settings[name] = typeof(value) == 'object' ? plupload.extend({}, value) : value;
			}, this, 999);
		}


		function getRUID() {
			var ctrl = _fileInputs[0] || _fileDrops[0];
			if (ctrl) {
				return ctrl.getRuntime().uid;
			}
			return false;
		}


		function bindEventListeners() {
			this.bind('FilesAdded FilesRemoved', function(up) {
				up.trigger('QueueChanged');
				up.refresh();
			}, this, 999);

			this.bind('BeforeUpload', onBeforeUpload);

			this.bind('Stopped', function(up) {
				up.trigger('UploadComplete');
			});

			this.bind('Error', onError);

			this.bind('Destroy', onDestroy);
		}


		function initControls(cb) {
			var self = this;
			var initialized = 0;
			var queue = [];

			// common settings
			var options = {
				runtime_order: self.getOption('runtimes'),
				required_caps: self.getOption('required_features'),
				preferred_caps: self.getOption('preferred_caps'),
				swf_url: self.getOption('flash_swf_url'),
				xap_url: self.getOption('silverlight_xap_url')
			};

			// add runtime specific options if any
			plupload.each(self.getOption('runtimes').split(/\s*,\s*/), function(runtime) {
				if (self.getOption(runtime)) {
					options[runtime] = self.getOption(runtime);
				}
			});

			// initialize file pickers - there can be many
			if (self.getOption('browse_button')) {
				plupload.each(self.getOption('browse_button'), function(el) {
					queue.push(function(cb) {
						var fileInput = new moxie.file.FileInput(plupload.extend({}, options, {
							accept: self.getOption('filters').mime_types,
							name: self.getOption('file_data_name'),
							multiple: self.getOption('multi_selection'),
							container: self.getOption('container'),
							browse_button: el
						}));

						fileInput.onready = function() {
							var info = plupload.Runtime.getInfo(this.ruid);

							// for backward compatibility
							plupload.extend(self.features, {
								chunks: info.can('slice_blob'),
								multipart: info.can('send_multipart'),
								multi_selection: info.can('select_multiple')
							});

							initialized++;
							_fileInputs.push(this);
							cb();
						};

						fileInput.onchange = function() {
							self.addFile(this.files);
						};

						fileInput.bind('mouseenter mouseleave mousedown mouseup', function(e) {
							if (!_disabled) {
								if (self.getOption('browse_button_hover')) {
									if ('mouseenter' === e.type) {
										plupload.addClass(el, self.getOption('browse_button_hover'));
									} else if ('mouseleave' === e.type) {
										plupload.removeClass(el, self.getOption('browse_button_hover'));
									}
								}

								if (self.getOption('browse_button_active')) {
									if ('mousedown' === e.type) {
										plupload.addClass(el, self.getOption('browse_button_active'));
									} else if ('mouseup' === e.type) {
										plupload.removeClass(el, self.getOption('browse_button_active'));
									}
								}
							}
						});

						fileInput.bind('mousedown', function() {
							self.trigger('Browse');
						});

						fileInput.bind('error runtimeerror', function() {
							fileInput = null;
							cb();
						});

						fileInput.init();
					});
				});
			}

			// initialize drop zones
			if (self.getOption('drop_element')) {
				plupload.each(self.getOption('drop_element'), function(el) {
					queue.push(function(cb) {
						var fileDrop = new moxie.file.FileDrop(plupload.extend({}, options, {
							drop_zone: el
						}));

						fileDrop.onready = function() {
							var info = plupload.Runtime.getInfo(this.ruid);

							// for backward compatibility
							plupload.extend(self.features, {
								chunks: info.can('slice_blob'),
								multipart: info.can('send_multipart'),
								dragdrop: info.can('drag_and_drop')
							});

							initialized++;
							_fileDrops.push(this);
							cb();
						};

						fileDrop.ondrop = function() {
							self.addFile(this.files);
						};

						fileDrop.bind('error runtimeerror', function() {
							fileDrop = null;
							cb();
						});

						fileDrop.init();
					});
				});
			}


			plupload.inParallel(queue, function() {
				if (typeof(cb) === 'function') {
					cb(initialized);
				}
			});
		}


		// Internal event handlers
		function onBeforeUpload(up, file) {
			// Generate unique target filenames
			if (up.getOption('unique_names')) {
				var matches = file.name.match(/\.([^.]+)$/),
					ext = "part";
				if (matches) {
					ext = matches[1];
				}
				file.target_name = file.id + '.' + ext;
			}
		}


		function onError(up, err) {
			if (err.code === plupload.INIT_ERROR) {
				up.destroy();
			}
			else if (err.code === plupload.HTTP_ERROR && up.state == plupload.STARTED) {
				up.trigger('CancelUpload');
			}
		}


		function onDestroy(up) {
			up.forEachItem(function(file) {
				file.destroy();
			});

			if (_fileInputs.length) {
				plupload.each(_fileInputs, function(fileInput) {
					fileInput.destroy();
				});
				_fileInputs = [];
			}

			if (_fileDrops.length) {
				plupload.each(_fileDrops, function(fileDrop) {
					fileDrop.destroy();
				});
				_fileDrops = [];
			}

			_initialized = false;

			if (_queueUpload) {
				_queueUpload.destroy();
			}

			if (_queueResize) {
				_queueResize.destroy();
			}

			_options = _queueUpload = _queueResize = null; // purge these exclusively

		}

	}


	// convert plupload features to caps acceptable by mOxie
	function normalizeCaps(settings) {
		var features = settings.required_features,
			caps = {};

		function resolve(feature, value, strict) {
			// Feature notation is deprecated, use caps (this thing here is required for backward compatibility)
			var map = {
				chunks: 'slice_blob',
				jpgresize: 'send_binary_string',
				pngresize: 'send_binary_string',
				progress: 'report_upload_progress',
				multi_selection: 'select_multiple',
				dragdrop: 'drag_and_drop',
				drop_element: 'drag_and_drop',
				headers: 'send_custom_headers',
				urlstream_upload: 'send_binary_string',
				canSendBinary: 'send_binary',
				triggerDialog: 'summon_file_dialog'
			};

			if (map[feature]) {
				caps[map[feature]] = value;
			} else if (!strict) {
				caps[feature] = value;
			}
		}

		if (typeof(features) === 'string') {
			plupload.each(features.split(/\s*,\s*/), function(feature) {
				resolve(feature, true);
			});
		} else if (typeof(features) === 'object') {
			plupload.each(features, function(value, feature) {
				resolve(feature, value);
			});
		} else if (features === true) {
			// check settings for required features
			if (settings.chunk_size && settings.chunk_size > 0) {
				caps.slice_blob = true;
			}

			if (!plupload.isEmptyObj(settings.resize) || settings.multipart === false) {
				caps.send_binary_string = true;
			}

			if (settings.http_method) {
				caps.use_http_method = settings.http_method;
			}

			plupload.each(settings, function(value, feature) {
				resolve(feature, !!value, true); // strict check
			});
		}

		return caps;
	}

	function normalizeOptions(options) {
		plupload.each(options, function(value, option) {
			options[option] = normalizeOption(option, value, options);
		});
		return options;
	}

	/**
	Normalize an option.

	@method normalizeOption
	@private

	@param {String} option Name of the option to normalize
	@param {Mixed} value
	@param {Object} options The whole set of options, that might be modified during normalization (see max_file_size or unique_names)!
	*/
	function normalizeOption(option, value, options) {
		switch (option) {

			case 'chunk_size':
				if (value = plupload.parseSize(value)) {
					options.send_file_name = true;
				}
				break;

			case 'headers':
				var headers = {};
				if (typeof(value) === 'object') {
					plupload.each(value, function(value, key) {
						headers[key.toLowerCase()] = value;
					});
				}
				return headers;

			case 'http_method':
				return value.toUpperCase() === 'PUT' ? 'PUT' : 'POST';


			case 'filters':
				if (plupload.typeOf(value) === 'array') { // for backward compatibility
					value = {
						mime_types: value
					};
				}

				// if file format filters are being updated, regenerate the matching expressions
				if (value.mime_types) {
					if (plupload.typeOf(value.mime_types) === 'string') {
						value.mime_types = plupload.mimes2extList(value.mime_types);
					}

					// generate and cache regular expression for filtering file extensions
					options.re_ext_filter = (function(filters) {
						var extensionsRegExp = [];

						plupload.each(filters, function(filter) {
							plupload.each(filter.extensions.split(/,/), function(ext) {
								if (/^\s*\*\s*$/.test(ext)) {
									extensionsRegExp.push('\\.*');
								} else {
									extensionsRegExp.push('\\.' + ext.replace(new RegExp('[' + ('/^$.*+?|()[]{}\\'.replace(/./g, '\\$&')) + ']', 'g'), '\\$&'));
								}
							});
						});

						return new RegExp('(' + extensionsRegExp.join('|') + ')$', 'i');
					}(value.mime_types));
				}

				return value;

			case 'max_file_size':
				if (options && !options.filters) {
					options.filters = {};
				}
				options.filters.max_file_size = value;
				break;

			case 'multipart':
				if (!value) {
					options.send_file_name = true;
				}
				break;

			case 'multipart_params':
				options.params = options.multipart_params = value;
				break;

			case 'resize':
				if (value) {
					return plupload.extend({
						preserve_headers: true,
						crop: false
					}, value);
				}
				return false;

			case 'prevent_duplicates':
				if (options && !options.filters) {
					options.filters = {};
				}
				options.filters.prevent_duplicates = !!value;
				break;

			case 'unique_names':
				if (value) {
					options.send_file_name = true;
				}
				break;

			case 'required_features':
				// Normalize the list of required capabilities
				return normalizeCaps(plupload.extend({}, options));

			case 'preferred_caps':
				// Come up with the list of capabilities that can affect default mode in a multi-mode runtimes
				return normalizeCaps(plupload.extend({}, options, {
					required_features: true
				}));

				// options that require reinitialisation
			case 'container':
			case 'browse_button':
			case 'drop_element':
				return 'container' === option ? plupload.get(value) : plupload.getAll(value);
		}

		return value;
	}


	/**
	 * Registers a filter that will be executed for each file added to the queue.
	 * If callback returns false, file will not be added.
	 *
	 * Callback receives two arguments: a value for the filter as it was specified in settings.filters
	 * and a file to be filtered. Callback is executed in the context of uploader instance.
	 *
	 * @method addFileFilter
	 * @static
	 * @param {String} name Name of the filter by which it can be referenced in settings.filters
	 * @param {String} cb Callback - the actual routine that every added file must pass
	 */
	function addFileFilter(name, cb) {
		fileFilters[name] = cb;
	}


	/**
	 * A way to predict what runtime will be choosen in the current environment with the
	 * specified settings.
	 *
	 * @method predictRuntime
	 * @static
	 * @param {Object|String} config Plupload settings to check
	 * @param {String} [runtimes] Comma-separated list of runtimes to check against
	 * @return {String} Type of compatible runtime
	 */
	function predictRuntime(config, runtimes) {
		var up, runtime;

		up = new Uploader(config);
		runtime = plupload.Runtime.thatCan(up.getOption('required_features'), runtimes || config.runtimes);
		up.destroy();
		return runtime;
	}


	addFileFilter('mime_types', function(filters, file, cb) {
		if (filters.length && !this.getOption('re_ext_filter').test(file.name)) {
			this.trigger('Error', {
				code: plupload.FILE_EXTENSION_ERROR,
				message: plupload.translate('File extension error.'),
				file: file
			});
			cb(false);
		} else {
			cb(true);
		}
	});


	addFileFilter('max_file_size', function(maxSize, file, cb) {
		var undef;

		maxSize = plupload.parseSize(maxSize);

		// Invalid file size
		if (file.size !== undef && maxSize && file.size > maxSize) {
			this.trigger('Error', {
				code: plupload.FILE_SIZE_ERROR,
				message: plupload.translate('File size error.'),
				file: file
			});
			cb(false);
		} else {
			cb(true);
		}
	});


	addFileFilter('prevent_duplicates', function(value, file, cb) {
		var self = this;
		if (value) {
			this.forEachItem(function(item) {
				// Compare by name and size (size might be 0 or undefined, but still equivalent for both)
				if (file.name === item.name && file.size === item.size) {
					self.trigger('Error', {
						code: plupload.FILE_DUPLICATE_ERROR,
						message: plupload.translate('Duplicate file error.'),
						file: file
					});
					cb(false);
					return;
				}
			});
		}
		cb(true);
	});


	Uploader.addFileFilter = addFileFilter;

	plupload.inherit(Uploader, Queue);

	// for backward compatibility
	plupload.addFileFilter = addFileFilter;
	plupload.predictRuntime = predictRuntime;

	return Uploader;
});

expose(["plupload","plupload/core/Collection","plupload/core/ArrCollection","plupload/core/Optionable","plupload/core/Queueable","plupload/core/Stats","plupload/core/Queue","plupload/QueueUpload","plupload/QueueResize","plupload/ChunkUploader","plupload/FileUploader","plupload/ImageResizer","plupload/File","plupload/Uploader"]);
})(this);
}));