/**
 * The MIT License (MIT)
 *
 * Copyright © 2010-2013 Paulo Cesar, http://phery-php-ajax.net/
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*jshint jquery:true,strict:true,quotmark:"single",regexp:true,evil:true,undef:true,unused:true,sub:true,browser:true,devel:true */
/*global define:true */

(function (window, factory) {
	'use strict';

	if (typeof define === 'function' && typeof define['amd'] !== 'undefined') {
		/* AMD. Register as phery module. */
		define('phery', ['jquery'], function(jQuery){
			return factory(window, jQuery);
		});
	} else {
		/* Browser globals */
		window.phery = factory(window, window.jQuery || window.$);
	}

} ( /** @type {window} */
	this,
	/**
	 * @param {HTMLElement} window
	 * @param {jQuery} $
	 * @param [undefined]
	 * @return {phery}
	 */
	function (window, $, undefined) {
		'use strict';

		var
			/* Expose internal functions for unit testing */
			functions = {},
			/* Expose important vars for unit testing */
			vars = {},
			$document = $(window.document),
			$window = $(window),
			/**
			 * @readonly
			 * @enum {Number}
			 */
			structural_html = {
				'HTML':1,
				'BODY':1,
				'DIV':1,
				'BLOCKQUOTE':1,
				'BR':1,
				'HR':1,
				'HEAD':1,
				'H1':1, 'H2':1, 'H3':1, 'H4':1, 'H5':1, 'H6':1,
				'P':1,
				'HEADER':1,
				'FOOTER':1,
				'NAV':1,
				'SECTION':1,
				'ASIDE':1,
				'ARTICLE':1,
				'HGROUP':1,
				'FIGURE':1
			},
			/**
			 * @class
			 * @version 2.7.4
			 * @extends {jQuery}
			 */
			phery = (function(){ return function(){ return phery; }; })();

		vars.locked_config = false;
		vars.inline_load = true;
		vars.special_match = /\{([#~\+\-=!])[\d]+\}/;
		vars.$version = $().jquery;
		vars.has_formdata = ('FormData' in window);
		vars.has_file = vars.has_formdata && ('File' in window);
		vars.FormData = vars.has_formdata ? FormData : null;
		vars.subscribed = [];

		/**
		 * Function cache
		 *
		 * @type {Array.<{str: String, fn: Function}>}
		 */
		vars.call_cache = [];

		/**
		 * Phery.js semver version
		 *
		 * @type {String}
		 */
		phery.version = '2.7.4';

		/**
		 * @lends {Object.prototype.hasOwnProperty}
		 * @param {Object|Array} obj
		 * @param {String|Number} i
		 * @returns {Boolean}
		 */
		functions.hop = function(obj, i) {
			return Object.prototype.hasOwnProperty.call(obj, i);
		};

		/**
		 *
		 * @param {String} func_name
		 * @param {Boolean} do_new
		 * @param {jQuery|Undefined} element
		 *
		 * @return {jQuery.Callbacks|Boolean}
		 */
		functions.is_subscribed = function(func_name, do_new, element)
		{
			if (!element) { return false; }
			var i, len, topic = null;
			do_new = do_new === undefined ? true : !!do_new;

			for (i = 0, len = vars.subscribed.length; i < len; i++){
				if (vars.subscribed[i].topic === func_name && vars.subscribed[i].element.is(element)){
					return vars.subscribed[i];
				}
			}

			if (do_new === true) {
				var cb = $.Callbacks();
				topic = {
					callback: cb,
					pub: function(args){
						args = args || [];
						topic.callback.fireWith(element, args);
						return topic;
					},
					sub: function(fn){
						topic.callback.add(fn);
						return topic;
					},
					unsub: function(fn){
						topic.callback.remove(fn);
						return topic;
					},
					element: element,
					topic: func_name
				};

				vars.subscribed.push(topic);
				return topic;
			}
			return false;
		};

		/**
		 * Assign a n-deep object property
		 *
		 * @param {Object} obj The initial object
		 * @param {Array} keyPath Array containing the desired path
		 * @param {*} [value] Any value
		 * @param {Boolean} [create] Create the path if it doesn't exist
		 * @param {Boolean} [force] If the object is an array, it will be pushed. Force will rewrite the value regardless
		 * @param {Boolean} [as_obj] Returns the object instead of [obj, lastKey]
		 * @param {Boolean} [force_append] Force array concatenation
		 * @return {Boolean|Object.<String, *>}
		 */
		functions.assign_object = function (obj, keyPath, value, create, force, as_obj, force_append) {
			if (!keyPath || !keyPath.length) {
				return false;
			}

			if ($.type(keyPath) !== 'array') {
				if ($.type(keyPath) === 'number' || $.type(keyPath) === 'string') {
					keyPath = [keyPath];
				} else {
					return false;
				}
			}

			var lastKeyIndex = keyPath.length - 1, key;

			create = (create === undefined) ? true : create;
			force = (force === undefined) ? false : force;
			as_obj = (as_obj === undefined) ? false : as_obj;
			force_append = (force_append === undefined) ? false : force_append;

			if (value !== undefined && as_obj) {
				as_obj = false;
			}

			for (var i = 0; i < lastKeyIndex; i++) {
				key = keyPath[i];

				if (key in obj) {
					obj = obj[key];
				} else {
					if (!create) {
						return false;
					}
					obj[key] = {};
					obj = obj[key];
				}
			}

			if (typeof obj[keyPath[lastKeyIndex]] !== 'undefined' && value !== undefined) {
				if ($.type(obj[keyPath[lastKeyIndex]]) === 'array' && !force && !force_append) {
					if ($.type(value) === 'array') {
						Array.prototype.push.apply(obj[keyPath[lastKeyIndex]], value);
					} else {
						obj[keyPath[lastKeyIndex]].push(value);
					}
				} else {
					if (force_append) {
						obj[keyPath[lastKeyIndex]] = Array.prototype.concat.call(obj[keyPath[lastKeyIndex]], value);
					} else {
						obj[keyPath[lastKeyIndex]] = value;
					}
				}
			} else {
				if (value !== undefined) {
					obj[keyPath[lastKeyIndex]] = value;
				}
			}

			return as_obj ? obj[keyPath[lastKeyIndex]] : [obj, keyPath[lastKeyIndex]];
		};

		/**
		 * Make a javsacript object become a query string,
		 * but still as an object
		 *
		 * @param {Object} obj Original object
		 * @param {String} [prefix] Existing string
		 * @param {Object} [result] Result object
		 * @return {Object.<String, (String|Array|File)>}
		 */
		functions.obj_to_str = function(obj, prefix, result) {
			result = (typeof result === 'object') ? result : {};

			var prop, value, name;

			for (prop in obj) {
				if (functions.hop(obj, prop)) {
					value = obj[prop];
					name = prefix ? prefix + '[' + (prop) + ']' : prop;
					if (typeof value !== 'object' || (vars.has_file && (value instanceof window['File']))) {
						result[name] = value;
					} else {
						functions.obj_to_str(value, name, result);
					}
				}
			}

			return result;
		};

		/**
		 * Check for DOM input[type=file] and return their files as an array
		 *
		 * @param {HTMLInputElement|File} input
		 * @return {String|File|Array.<File>}
		 */
		functions.files_to_array = function(input) {
			var result = [];

			if (vars.has_file) {
				if (input instanceof window.File) {
					result.push(input);
				} else if (input instanceof window.FileList && input.length) {
					result.push(input[0]);
				} else if (input.files instanceof window.FileList && input.files.length) {
					if (input.files.length > 1) {
						for (var i = 0; i < input.files.length; i++) {
							result.push(input.files[i]);
						}
					} else {
						result.push(input.files[0]);
					}
				}
			}
			return result;
		};

		/**
		 * Make an object turn into a FormData object
		 *
		 * @param {Object.<String, String|Array|File>|Object} obj
		 * @returns {vars.FormData}
		 */
		functions.to_formdata = function(obj){
			obj = ($.type(obj) === 'object' ? functions.obj_to_str(obj) : obj);

			var
				fd = new vars.FormData(),
				x;

			for (x in obj) {
				if (functions.hop(obj, x)) {
					fd.append(x, obj[x]);
				}
			}
			return fd;
		};

		functions.per_data = function(this_data, args) {
			var
				type = $.type(this_data),
				arg_type = $.type(args),
				x, i;

			switch (type) {
				case 'array':
					switch (arg_type) {
						case 'array':
							Array.prototype.push.apply(this_data, args);
							break;
						case 'object':
						case 'string':
						case 'null':
						case 'boolean':
						case 'number':
							this_data.push(args);
							break;
					}
					break;
				case 'object':
					switch (arg_type) {
						case 'object':
							this_data = $.extend(this_data, args);
							break;
						case 'array':
							i = 0;
							for (x = 0; x < args.length; x++) {
								while (typeof this_data[i] !== 'undefined') { i++; }
								this_data[i] = args[x];
							}
							break;
						case 'number':
						case 'string':
						case 'null':
						case 'boolean':
							i = 0;
							while (typeof this_data[i] !== 'undefined') { i++; }
							this_data[i] = args;
							break;
					}
					break;
				case 'string':
				case 'number':
				case 'null':
				case 'boolean':
					this_data = Array.prototype.concat.call(this_data, args);
					break;
				case 'undefined':
					if (arg_type === 'object' || args == null) {
						this_data = args;
					} else {
						this_data = Array.prototype.concat.call(args);
					}
					break;
			}
			return this_data;
		};

		functions.filter_prop = function(type){
			return function(){
				return $(this).prop(type);
			};
		};

		functions.form_element = function($this){
			var
				radios,
				opts,
				name = $this.prop('name') || null,
				value = null,
				type = $this.prop('tagName').toLowerCase();

			if ($this.is('[type="radio"]') || $this.is('[type="checkbox"]')) {
				if ($this.is('[type="radio"]')) {
					radios = $this.prop('form') ? $($this.prop('form')).find('[type="radio"][name="' + $this.prop('name') + '"]') : $('[type="radio"][name="' + $this.prop('name') + '"]');
					if (radios.filter(functions.filter_prop('checked')).length) {
						value = radios.filter(functions.filter_prop('checked')).val();
					}
				} else if ($this.prop('checked')) {
					value = $this.is('[value]') ? $this.val() : true;
				}
			} else if ($this.is('select')) {
				opts = $this.find('option').filter(functions.filter_prop('selected'));
				if ($this.prop('multiple')) {
					value = opts.map(function () {
						return this.value || this.innerHTML;
					}).get();
				} else {
					value = opts.val();
				}
				name = name || '';
			} else if ($this.is('[type="file"]')) {
				if (vars.has_file) {
					if (name) {
						name = name.replace('[]', '');
					}
					value = functions.files_to_array($this[0]);
					type = 'file';
				} else {
					name = null;
				}
			} else {
				value = $this.val();
			}

			return {
				'name': name,
				'value':value,
				'type': type
			};
		};

		/**
		 * @this {jQuery}
		 * @param {Object|Array} args
		 */
		functions.append_args = function(args) {
			var this_data, x;

			if (typeof args[0] !== 'undefined' && args[0].constructor === Array) {
				args = args[0];
			}

			for (x in args) {
				if (functions.hop(args, x)) {
					this_data = this.phery('data', 'args');
					this.phery('data', 'args', functions.per_data(this_data, args[x]));
				}
			}
		};

		/**
		 * @this {jQuery}
		 * @param {*} args
		 */
		functions.set_args = function(args) {
			if ($.type(args) !== 'function') {
				this.phery('data', 'args', functions.per_data(undefined, args[0]));
			}
		};

		/**
		 * Compare two arrays
		 *
		 * @param {Array} x
		 * @param {Array} y
		 * @return {Boolean}
		 */
		functions.compare_array = function(x, y) {
			if (x === y) {
				return true;
			}
			if (x.length !== y.length) {
				return false;
			}
			for (var i = 0; i < x.length; i++) {
				if (x[i] !== y[i]) {
					return false;
				}
			}
			return true;
		};

		/**
		 * Create a function from a string
		 *
		 * @param {String} str
		 * @param {Boolean} process
		 * @return {*}
		 */
		functions.str_is_function = function(str, process) {
			if (!str || typeof str['toString'] !== 'function') {
				return false;
			}
			str = str.toString();
			var is_it = (str.search(/^[\s;]*function\(/im) !== -1) && (str.search(/\};?$/m));

			if (is_it && process) {
				var
					cache_len = vars.call_cache.length,
					fn = null, now = (new Date()).getTime(), i;

				for (i = 0; i < cache_len; i++) {
					if (vars.call_cache[i].str === str) {
						fn = vars.call_cache[i].fn;
						vars.call_cache[i]['lu'] = now;
						break;
					}
				}

				for (i = cache_len-1; i >= 0; i--) {
					if ((vars.call_cache[i]['lu'] + 60000) < now) {
						vars.call_cache.splice(i, 1);
					}
				}

				if (typeof fn !== 'function') {
					var
						f_args = str.match(/function\s*\(([^\)]*)\)/im)[1],
						f_body = str.slice(str.indexOf('{') + 1, str.lastIndexOf('}'));

					if (!f_body) {
						return false;
					}

					fn = new Function(f_args, f_body);

					vars.call_cache.push({
						'str':str,
						'fn':fn,
						'lu':now
					});
				}
				return fn;
			}
			return is_it;
		};

		vars.defaults = {
			'cursor': true,
			'default_href': false,
			'ajax': {
				'retries': 0,
				'timeout': 0
			},
			'enable': {
				'log': false,
				'autolock': false,
				'log_history': false,
				'per_element': {
					'events': true
				},
				'clickable_structure': false,
				'only': false
			},
			'inline': {
				'enabled': false,
				'once': true
			},
			'debug': {
				'enable': false,
				'display': {
					'events': true,
					'remote': true,
					'config': true
				}
			},
			'delegate': {
				'confirm': ['click'],
				'form': ['submit'],
				'select_multiple': ['blur'],
				'select': ['change'],
				'tags': ['click']
			}
		};

		var
			/**
			 * @extends {vars.defaults}
			 */
			options = {},
			callbacks = $('<div></div>'),
			_log = [],
			$original_cursor,
			$body_html = null;

		vars._callbacks = {
			'before':function () {
				return true;
			},
			'beforeSend':function () {
				return true;
			},
			'params':function () {
				return true;
			},
			'always':function () {
				return true;
			},
			'fail':function () {
				return true;
			},
			'progress':function () {
				return true;
			},
			'done':function () {
				return true;
			},
			'after':function () {
				return true;
			},
			'exception':function () {
				return true;
			},
			'json':function () {
				return true;
			}
		};

		function debug(data, type) {
			if (options.debug.enable) {
				if (typeof console !== 'undefined' && typeof console['dir'] === 'function') {
					if (typeof options.debug.display[type] !== 'undefined' && options.debug.display[type] === true) {
						console.dir(data);
					}
				}
			}
		}

		function do_cursor(cursor) {
			if (options.cursor) {
				if ($body_html === null) {
					$body_html = $('body,html');
					$original_cursor = $body_html.css('cursor');
				}

				if (!cursor) {
					$body_html.css('cursor', $original_cursor);
				} else {
					$body_html.css('cursor', cursor);
				}
			}
		}

		functions.trigger_and_return = function(el, name, data, context, bubble) {
			context = context || null;

			var
				event = $.Event(name);

			event['$target'] = el instanceof $ ? el : $(el);

			if (context) {
				event['target'] = context instanceof $ ? context[0] : context;
				event['$target'] = context instanceof $ ? context : $(context);
			}

			data = ($.type(data) === 'array') ? data : [data];

			if (bubble) {
				el.trigger(event, data);
			} else {
				el.each(function(){
					$.event.trigger(event, data, this, true);
				});
			}

			debug(['event triggered', {
				'name':name,
				'event result': event.result,
				'element':el,
				'data':data
			}], 'events');

			return event;
		};

		/**
		 *
		 * @param {jQuery} el
		 * @param {String} event_name
		 * @param {*} [data]
		 * @param {Boolean} [triggerData]
		 * @returns {Boolean}
		 */
		functions.trigger_phery_event = function(el, event_name, data, triggerData) {
			data = data || [];
			triggerData = triggerData === undefined ? false : triggerData;

			var res;

			if (triggerData) {
				res = functions.trigger_and_return(callbacks, event_name, data, el);

				if (el && options.enable.per_element.events) {
					functions.trigger_and_return(el, 'phery:' + event_name, data, null, true);
				}

				if (res.result === undefined) {
					res.result = true;
				}
			} else {
				res = functions.trigger_and_return(callbacks, event_name, data, el);

				if (res.result === false && res.isImmediatePropagationStopped()) {
					return res;
				}

				if (res.result === undefined) {
					res.result = true;
				}

				if (el && options.enable.per_element.events) {
					res.result = res.result && functions.trigger_and_return(el, 'phery:' + event_name, data, null, true).result;
				}
			}
			return res;
		};

		functions.count_properties = function(obj) {
			var count = 0;

			if (typeof obj === 'object') {
				for (var prop in obj) {
					if (functions.hop(obj, prop)) {
						++count;
					}
				}
			} else {
				if (typeof obj['length'] !== 'undefined') {
					count = obj.length;
				}
			}

			return count;
		};

		function clean_up(el) {
			if (el.phery('data', 'temp')) {
				el.off();
				$.removeData(el[0]);
				el.remove();
				el = null;
			}
		}

		/**
		 * @param {jQuery} $this
		 * @return {Boolean|jQuery.ajax}
		 */
		functions.form_submit = function($this) {
			var _confirm = $this.phery('data', 'confirm');
			if (_confirm) {
				if (!confirm(_confirm)) {
					return false;
				}
			}
			return functions.ajax_call.call($this);
		};

		/**
		 * Ajax calls
		 *
		 * @this {jQuery}
		 *
		 * @param {Object} [args]
		 * @param {jQuery} [element]
		 *
		 * @return {Boolean|jQuery.ajax}
		 */
		functions.ajax_call = function(args, element) {
			var dispatch_event, event_result;

			if (this.phery('data', 'proxy') instanceof $) {
				dispatch_event = this.phery('data', 'proxy');
			} else if (element) {
				dispatch_event = element;
			} else {
				dispatch_event = this;
			}

			event_result = functions.trigger_phery_event(dispatch_event, 'before');

			if (event_result.result === false) {
				if (!event_result.isImmediatePropagationStopped()) {
					functions.trigger_phery_event(dispatch_event, 'always', [null]);
				}
				clean_up(this);
				return false;
			}

			if (!this.phery('data', 'remote') && !this.phery('data', 'view')){
				functions.trigger_phery_event(dispatch_event, 'exception', [phery.log('Current element have no remote data information')]);
				functions.trigger_phery_event(dispatch_event, 'always', [null]);
				clean_up(this);
				return false;
			}

			var
				_headers = {
					'X-Requested-With':'XMLHttpRequest',
					'X-Phery':1
				},
				el = element || this,
				self = this,
				tmp,
				url =  self.attr('action') || self.attr('href') || self.phery('data', 'target') || el.attr('action') || el.attr('href') || el.phery('data', 'target') || options.default_href || window.location.href,
				type = self.phery('data', 'type') || el.phery('data', 'type') || 'json',
				method = self.attr('method') || el.attr('method') || el.phery('data', 'method') || 'GET',
				submit_id = el.attr('id') || el.parent().attr('id') || null,
				requested,
				cache = !!self.phery('data', 'cache') || !!el.phery('data', 'cache') || false,
				ajax,
				has_file,
				i,
				files = {},
				$token,
				data = {
					'args':undefined,
					'phery':{
						'method':method
					}
				};

			if ((!!el.phery('data', 'only') || options.enable.only === true) && el.phery('inprogress')) {
				return false;
			}

			el.phery('data', 'inprogress', true);

			if (($token = $('head meta#csrf-token')).length) {
				data.phery.csrf = $token.prop('content');
			}

			if (el.phery('data', 'args')) {
				try {
					data['args'] = functions.per_data({}, el.phery('data', 'args'));
				} catch (exception) {
					functions.trigger_phery_event(dispatch_event, 'exception', [phery.log(exception)]);
				}
			}

			if (args) {
				data['args'] = functions.per_data(data['args'], args);
			}

			if (el.is('form')) {
				try {
					tmp = el.serializeForm(
						el.phery('data', 'submit') ?
							$.extend({}, el.phery('data', 'submit'), {'files_apart': true})
							:
							{'files_apart': true}
					);

					data['args'] = functions.per_data(
						data['args'],
						tmp.inputs
					);

					$.extend(files, tmp.files);
				} catch (exception) {
					functions.trigger_phery_event(dispatch_event, 'exception', [phery.log(exception)]);
				}
			}

			if (el.is('textarea,input[type!="file"]')) {
				tmp = el.serializeForm();
				data['args'] = functions.per_data(data['args'], tmp);
			}

			if (el.is('input[type="file"]') && vars.has_file) {
				tmp = el.serializeForm();
				$.extend(files, tmp);
			}

			if (el.is('select')) {
				var select = functions.form_element(el);

				if (!select['name']) {
					data['args'] = functions.per_data(data['args'], select['value']);
				} else {
					var tosend = {};
					tosend[select['name']] = select['value'];
					data['args'] = functions.per_data(data['args'], tosend);
				}
			}

			if (el.phery('data', 'related')) {
				try {
					var
						_related = el.phery('data', 'related'),
						related = $(), split, _selector;

					switch (typeof _related) {
						case 'string':
							if (_related.indexOf(',') > -1) {
								split = _related.split(',');
								for (i = 0; i < split.length; i++) {
									_selector = el.find(split[i]);
									if (!_selector.length) {
										_selector = $(split[i]);
									}
									if (_selector.length) {
										related = related.add(_selector);
									}
								}
							} else {
								_selector = el.find(_related);
								if (!_selector.length) {
									_selector = $(_related);
								}
								if (_selector.length) {
									related = related.add(_selector);
								}
							}
							break;
						case 'object':
							related = _related;
							break;
						default:
							related = false;
					}

					if (related !== false) {
						if (related.length) {
							var tmprelated = {}, count = 0;

							related.each(function () {
								var $this = $(this);

								if ($this.is('form')) {
									tmp = $this.serializeForm({'files_apart': true});

									tmprelated = functions.per_data(tmprelated, tmp.inputs);

									$.extend(files, tmp.files);
                } else if ($this.is('input[type="checkbox"]') && $this.attr('name') && $this.attr('name').indexOf('[') > 0 && $this.attr('name').indexOf(']') > 0) {
                  var name = $this.serializeForm();

                  for (var i in name) {
                    if (tmprelated[i] === undefined) {
                      tmprelated[i] = [];
                    }
                    tmprelated[i] = functions.per_data(tmprelated[i], name[i]);
                  }
                } else if ($this.attr('name')) {
									tmprelated[$this.attr('name')] = $this.val();
								} else if ($this.attr('id')) {
									tmprelated[$this.attr('id')] = $this.val();
								} else {
									tmprelated[count++] = $this.val();
								}
							});

							data['args'] = functions.per_data(data['args'], tmprelated);
						} else {
							functions.trigger_phery_event(dispatch_event, 'exception', [phery.log('related selector found no elements', el.phery('data', 'related'))]);
						}
					}
				} catch (exception) {
					functions.trigger_phery_event(dispatch_event, 'exception', [phery.log(exception, 'invalid data-phery-related info')]);
				}
			}

			if (submit_id) {
				data['phery']['submit_id'] = submit_id;
			}

			if (el.phery('data', 'view')) {
				data['phery']['view'] = '#' + el.attr('id');
			} else if (self.phery('data', 'remote') || el.phery('data', 'remote')) {
				data['phery']['remote'] = self.phery('data', 'remote') || el.phery('data', 'remote');
			}

			var _tmp = {};
			functions.trigger_phery_event(dispatch_event, 'params', _tmp, true);
			data['phery'] = $.extend(_tmp, data['phery']);

			requested = new Date();

			debug(['remote call', {
				'data':data,
				'timestamp':requested.getTime(),
				'time':requested.toLocaleString()
			}], 'remote');

			requested = requested.getTime();

			has_file = functions.count_properties(files) > 0;

			var opt = {
				url:(
					cache ? url : (
						url.indexOf('_=') === -1 ?
							((url.indexOf('#') !== -1 ? url.substr(0, url.indexOf('#')) : url) + (url.indexOf('?') > -1 ? '&' : '?') + '_=' + requested)
							:
							(url.replace(/_=(\d+)/, '_=' + requested))
						)
					),
				data: has_file ? functions.to_formdata($.extend(files, data)) : data,
				contentType: has_file ? false : 'application/x-www-form-urlencoded',
				processData: !has_file,
				dataType:type,
				type:'POST',
				el:self,
				global:false,
				try_count:0,
				timeout:options.ajax.timeout,
				retry_limit:options.ajax.retries,
				cache:cache,
				headers:_headers,
				'xhr': function(){
					var xhr = $.ajaxSettings.xhr();
					if (typeof xhr['upload'] !== 'undefined') {
						xhr['upload'].onprogress = function(progress){
							functions.trigger_phery_event(dispatch_event,  'progress', [progress]);
						};
					}
					return xhr;
				},
				'beforeSend':function (xhr, settings) {
					do_cursor('wait');

					var res = functions.trigger_phery_event(dispatch_event, 'beforeSend', [xhr, settings]);

					if (res.result === false) {
						xhr.abort();
					}

					return res.result !== false;
				}
			};

			var
				_fail = function (xhr, status, error) {
					if (this.retry_limit > 0 && status === 'timeout') {
						this.try_count++;

						if (this.try_count <= this.retry_limit) {
							functions.trigger_phery_event(dispatch_event, 'before');

							this.dataType = 'text ' + type;

							this.url =
								this.url.indexOf('_try_count=') === -1 ?
									(this.url + '&_try_count=' + this.try_count) :
									(this.url.replace(/_try_count=(\d+)/, '_try_count=' + this.try_count));

							if (!cache){
								this.url = this.url.replace(/_=(\d+)/, '_=' + new Date().getTime());
							}

							ajax = set_ajax_opts(this);
							return false;
						}
					}

					do_cursor(false);

					el.phery('data', 'inprogress', false);

					if (functions.trigger_phery_event(dispatch_event, 'fail', [xhr, status, error]).result === false) {
						clean_up(this.el);
						return false;
					}

					clean_up(this.el);
					return true;
				},
				_done = function (data, text, xhr) {
					if (functions.trigger_phery_event(dispatch_event, 'done', [data, text, xhr]).result === false) {
						return false;
					}

					functions.process_request.call(dispatch_event, data, dispatch_event !== self);

					return true;
				},
				_always = function (data, text, xhr) {
					if (text === 'timeout' && data.readyState !== 4 && this.try_count > 0 && this.try_count <= this.retry_limit) {
						functions.trigger_phery_event(dispatch_event, 'always', [data]);
						return false;
					}

					do_cursor(false);

					if (text !== 'timeout')
					{
						el.phery('data', 'inprogress', false);
					}

					if (functions.trigger_phery_event(dispatch_event, 'always', [text === 'timeout' ? data : xhr]).result === false) {
						clean_up(this.el);
						return false;
					}

					clean_up(this.el);
					return true;
				};

			var set_ajax_opts = function (opt) {
				var _ajax = $.ajax(opt);

				_ajax
					.done(_done)
					.always(_always)
					.fail(_fail);

				return _ajax;
			};

			ajax = set_ajax_opts(opt);

			return ajax;
		};

		function set_events() {
			$document
				.off('.phery');

			$document
				.on(options.delegate.confirm.join('.phery,') + '.phery', ':phery-confirm:not(form)', function (e) {
					if (!confirm($(this).phery('data', 'confirm'))) {
						e.stopImmediatePropagation();
					} else {
						e.preventDefault();
					}
				});

			$document
				.on(options.delegate.form.join('.phery,') + '.phery', 'form:phery-remote', function () {
					var $this = $(this);
					functions.form_submit($this);
					return false;
				});

			$document
				.on(options.delegate.tags.join('.phery,') + '.phery', ':phery-remote:not(form,select)', function (e) {
					var $this = $(this);

					if (!options.enable.clickable_structure) {
						if (typeof structural_html[this.tagName] === 'number' && !$this.phery('data', 'clickable')) {
							return false;
						}
					}

					functions.ajax_call.call($this);

					if (!$this.is('input[type="text"],input[type="checkbox"],input[type="radio"],input[type="image"]')) {
						e.preventDefault();
					}
					return true;
				});

			$document
				.on(options.delegate.select.join('.phery,') + '.phery', 'select:phery-remote:not([multiple])', function (e) {
					functions.ajax_call.call($(e.currentTarget));
				});

			$document
				.on(options.delegate.select_multiple.join('.phery,') + '.phery', 'select:phery-remote[multiple]', function (e) {
					functions.ajax_call.call($(e.currentTarget));
				});
		}

		/**
		 * @param {jQuery} $element
		 * @param {*} data
		 * @param {Boolean|undefined} [force_current]
		 */
		functions.convertible = function($element, data, force_current) {
			var self = this, special, selector, cmd;
			self.$current = null;
			self.$last = null;
			self.skip = false;
			self.stack = [];
			self.phery = $element.phery();

			force_current = force_current === undefined ? false : force_current;

			self.set_selector = function(current) {
				self.$last = self.$current;
				self.$current = current;
				self.stack.push(current);
			};

			self.restore_selector = function() {
				if (self.$last !== null) {
					self.$current = self.$last;
					self.$last = self.$current;
				}
			};

			self.convert_special = function(obj, depth){
				var func;

				if (depth === undefined) {
					depth = 5;
				}

				depth--;

				if (depth < 0) {
					return obj;
				}

				if (($.isPlainObject(obj) || $.type(obj) === 'array')) {
					if ('PF' in obj) {
						if ((func = functions.str_is_function(obj['PF'], true))) {
							obj['PF'] = null;
							delete obj['PF'];
							obj = func;
							func = null;
						} else {
							if (func === false) {
								debug([
									'PheryFunction passed is invalid',
									obj['PF']
								], 'events');
							}
							obj['PF'] = null;
							delete obj['PF'];
						}
					} else if ('PR' in obj) {
						func = new functions.convertible($element, obj['PR']);
						delete obj['PR'];
						obj = func.$current;
						func.destroy();
						func = null;
					} else {
						for (var i in obj) {
							if (functions.hop(obj, i)) {
								obj[i] = self.convert_special(obj[i], depth);
							}
						}
					}
				}

				return obj;
			};

			self.selector = function() {
				var func, Obj;

				if (special === '=' || special === '!') {
					if (!cmd) {
						return;
					}
					func = cmd['a'][0];

					if ($.type(func) === 'function') {
						self.skip = true;
						if (special === '=' && func.call(self.$last || self.$current || $element)) {
							self.restore_selector();
							self.skip = false;
						} else if (special === '!' && !func.call(self.$last || self.$current || $element)) {
							self.restore_selector();
							self.skip = false;
						}
					} else if ($.type(func) === 'boolean') {
						self.skip = true;
						if (special === '=' && func) {
							self.restore_selector();
							self.skip = false;
						} else if (special === '!' && !func) {
							self.restore_selector();
							self.skip = false;
						}
					} else if ($.type(func) === 'object' || $.type(func) === 'string') {
						try {
							self.skip = true;
							if (special === '=') {
								if (func instanceof $ && func.length) {
									self.skip = false;
									self.restore_selector();
								} else if ($(func).length) {
									self.skip = false;
									self.restore_selector();
								}
							} else if (special === '!') {
								if (func instanceof $ && !func.length) {
									self.skip = false;
									self.restore_selector();
								} else if (!$(func).length) {
									self.skip = false;
									self.restore_selector();
								}
							}
						} catch (exception) {
							self.trigger([phery.log(exception)]);
						}
					}
				} else if (special === '+') {
					if (!cmd) {
						return;
					}
					if (typeof cmd['a'][1] === 'string' && cmd['a'][1].match(vars.special_match)) {
						Obj = {};
						Obj[cmd['a'][1]] = [];
						func = new functions.convertible($element, Obj);
					} else {
						func = null;
					}

					Obj = functions.assign_object((func !== null && func.$current !== null) ? func.$current : window, cmd['c'], undefined, false, false, true);

					if (Obj) {
						self.set_selector(cmd['a'][0] ? new Obj() : Obj);
					} else {
						self.trigger([phery.log('failed access to object', 'window.' + cmd['c'].join('.'))]);
					}

					if (func instanceof functions.convertible) {
						func.destroy();
					}
					func = null;
				} else if (special === '~') {
					/* ->this-> */
					self.set_selector($element);
				} else if (special === '-') {
					/* ->phery_remote() */
					self.set_selector(phery.remote.apply(phery, cmd['a']));
				} else if (special === '#') {
					/* ->jquery-> */
					self.set_selector($);
				} else if (selector.toLowerCase() === 'window') {
					/* ->jquery('window') */
					self.set_selector($window);
				} else if (selector.toLowerCase() === 'document') {
					/* ->jquery('document') */
					self.set_selector($document);
				} else if (typeof selector === 'string') {
					/* ->jquery('selector') */
					self.set_selector($(selector));
				}
			};

			self.trigger = function(data, event) {
				event = event || 'exception';
				functions.trigger_phery_event($element, event, data);
			};

			self.process_parameters = function(){
				if (cmd && typeof cmd['a'] !== 'undefined') {
					for (var i in cmd['a']) {
						if (functions.hop(cmd['a'], i)) {
							cmd['a'][i] = self.convert_special(cmd['a'][i]);
						}
					}
				}
			};

			self.command = function(){
				var argc, argv, command, tmp, view, pass, args;

				if (!cmd) {
					return;
				}

				argc = cmd['a'].length;
				argv = cmd['a'];
				command = Number(cmd['c']);

				switch (command) {
					/* alert */
					case 1:
						if (typeof argv[0] !== 'undefined') {
							alert(argv[0].toString());
						} else {
							self.trigger([phery.log('missing message for alert()', argv)]);
						}
						break;
					/* call */
					case 2:
						try {
							tmp = functions.assign_object(window, argv[0], undefined, false);

							if (tmp !== false && typeof tmp[0][tmp[1]] === 'function') {
								tmp[0][tmp[1]].apply(tmp[0], argv[1] || []);
							} else {
								throw 'no function "' + (tmp.join('.')) + '" found';
							}
						} catch (exception) {
							self.trigger([phery.log(exception, argv)]);
						}
						break;
					/* script */
					case 3:
						try {
							eval('(function(){ ' + (argv[0]) + ' })();');
						} catch (exception) {
							self.trigger([phery.log(exception, argv[0])]);
						}
						break;
					/* JSON */
					case 4:
						try {
							self.trigger([$.parseJSON(argv[0])], 'json');
						} catch (exception) {
							self.trigger([phery.log(exception, argv[0])]);
						}
						break;
					/* Render View */
					case 5:
						view = self.phery.data('view');

						args = $.extend(true, {}, {
							'url': self.phery.data('target')
						}, argv[1]);

						tmp = self.phery.data('passdata');

						if (tmp) {
							pass = tmp;
							$.removeData($element[0], 'phery-passdata');
						} else {
							pass = {};
						}

						if (typeof view['beforeHtml'] === 'function') {
							view['beforeHtml'].call($element, args, pass);
						}

						if (typeof view['render'] !== 'function') {
							$element.html('').html(argv[0]);
						} else {
							view['render'].call($element, argv[0], args, pass);
						}

						if (typeof view['afterHtml'] === 'function') {
							view['afterHtml'].call($element, args, pass);
						}

						break;
					/* Dump var */
					case 6:
						try {
							if (typeof console !== 'undefined' && typeof console['log'] !== 'undefined') {
								for (var l = 0; l < argc; l++) {
									console.log(argv[l][0]);
								}
							}
						} catch (exception) {
							self.trigger([phery.log(exception, argv[0])]);
						}
						break;
					/* Trigger Exception */
					case 7:
						if (argc > 1) {
							args = Array.prototype.concat.call(argv);
							self.trigger(args);
							args = null;
						} else {
							self.trigger([argv[0]]);
						}
						break;
					/* Redirect (internal or external) */
					case 8:
						if (argc === 2) {
							if (argv[1]) {
								try {
									self.phery.data('inprogress', false);
									phery.view(argv[1]).navigate_to(argv[0]);
								} catch (e) {
									self.trigger([phery.log('phery view "'+(argv[1])+'" not found')]);
								}
							} else {
								window.location.assign(argv[0]);
							}
						}
						break;
					/* Set/Unset a global variable with any type of data */
					case 9:
						tmp = functions.assign_object(window, argv[0], undefined, argc === 2, true);

						if (tmp && tmp.length > 0) {
							if (argc === 2) {
								pass = new functions.convertible($element, argv[1][0], true);
								tmp[0][tmp[1]] = pass.$current;
								pass.destroy();
								pass = null;
							} else if (argc === 1) {
								delete tmp[0][tmp[1]];
							}
						} else {
							self.trigger([phery.log('object path not found in window.' + argv[0].join('.'))]);
						}
						tmp = null;
						break;
					/* Include script/stylesheet */
					case 10:
						var head = $('head'), file = null, i;

						switch (argv[0]) {
							case 'j':
								for (i in argv[1]) {
									if (functions.hop(argv[1], i)) {
										file = $('<script></script>', {
											'type': 'text/javascript',
											'src': argv[1][i],
											'id': i
										});

										if (!head.find('script#' + i).length) {
											head[0].appendChild(file[0]);
										} else {
											if (argv[2]) {
												head.find('script#' + i).replaceWith(file);
											}
										}
									}
								}
								break;
							case 'c':
								for (i in argv[1]) {
									if (functions.hop(argv[1], i)) {
										file = $('<link/>', {
											'type': 'text/css',
											'rel': 'stylesheet',
											'href': argv[1][i],
											'id': i
										});

										if (!head.find('link#' + i).length) {
											head[0].appendChild(file[0]);
										} else {
											if (argv[2]) {
												head.find('link#' + i).replaceWith(file);
											}
										}
										file = null;
									}
								}
								break;
						}
						head = null;

						break;
					/* templating */
					case 11:
						break;
					/* pub/sub/broadcast */
					case 12:
						try {
							if (argc === 3) {
								/* broadcast */
								phery.broadcast(argv[0], argv[1][0]);
							} else if (argc === 2) {
								/* publish */
								self.phery.publish(argv[0], argv[1][0]);
							}
						} catch (e) {
							self.trigger([phery.log('invalid pub/sub operation')]);
						}
						break;
          /* Set/Renew CSRF */
          case 13:
            var meta = $('head meta#csrf-token');
            if (meta.length) {
              meta.replaceWith(argv[0]);
            } else {
              $('head').append(argv[0]);
            }
            break;
					default:
						self.trigger([phery.log('invalid command "' + (cmd['c']) + '" issued')]);
						break;
				}
			};

			self.select = function(){
				special = selector.match(vars.special_match);

				if (special !== null) {
					special = special[1];
				}

				if (special || selector.charAt(0) === '<' || selector.search(/^[0-9]+$/) === -1) {
					if (special === '!' || special === '=' || special === '+') {
						cmd = data[selector][0];
						self.process_parameters();
					}
					self.selector();
					for (var i in data[selector]) {
						if (functions.hop(data[selector], i)) {
							if (data[selector][i] === cmd) {
								continue;
							}
							if (self.skip) {
								self.skip = false;
								continue;
							}
							cmd = data[selector][i];
							self.process_parameters();
							try {
								if (typeof self.$current[cmd['c']] === 'function') {
									self.set_selector(self.$current[cmd['c']].apply(self.$current, cmd['a']));
								} else {
									throw 'no function "' + (cmd['c']) + '" found in object';
								}
							} catch (exception) {
								self.trigger([phery.log(exception)]);
							}
						}
					}
				} else {
					cmd = data[selector];
					self.process_parameters();
					self.command();
				}
			};

			self.destroy = function(){
				self.stack = self.$current = self.$last = self.phery = data = cmd = null;
			};

			if (force_current) {
				self.set_selector(self.convert_special(data));
			} else if ($.isPlainObject(data)) {
				for (selector in data) {
					if (functions.hop(data, selector)) {
						if (self.skip) {
							self.skip = false;
							continue;
						}
						self.select();
					}
				}
			}
		};

		/**
		 * @this {jQuery}
		 * @param {Object} data
		 * @param {Boolean} proxied
		 */
		functions.process_request = function(data, proxied) {
			if (!this.phery('data', 'remote') && !this.phery('data', 'view') && !proxied) {
				functions.trigger_phery_event(this, 'after', [null]);
				return;
			}

			var $jq = new functions.convertible(this, data);

			functions.trigger_phery_event(this, 'after', [$jq.$current]);

			$jq.destroy();
			$jq = null;
		};

		functions.dot_notation_option = function (val, step, set) {
			if (val.indexOf('.') !== -1) {
				var initial = val.split('.');
				if (initial && initial[0] && typeof step[initial[0]] !== 'undefined') {
					return functions.dot_notation_option(initial.slice(1).join('.'), step[initial[0]], set);
				}
			} else if (typeof step[val] !== 'undefined') {
				if (typeof set !== 'undefined') {
					if (step[val].constructor === Array && typeof set === 'string') {
						step[val].push(set);
					} else {
						step[val] = set;
					}
					return step;
				} else {
					return step[val];
				}
			}
			return null;
		};

		function _apply(original, force, group) {
			force = force || false;

			for (var x in original) {
				if (functions.hop(original, x)) {
					if (typeof original[x] === 'object' && original[x].constructor !== Array) {
						if (_apply(original[x], force, x) === false) {
							return false;
						}
					} else {
						debug(['config', {
							'group': group,
							'name':x,
							'value':original[x]
						}], 'config');

						switch (group) {
							case 'inline':
								switch (x) {
									case 'enabled':
										break;
									case 'once':
										vars.inline_load = true;
										break;
								}
								break;
							case 'delegate':
								switch (x) {
									case 'confirm':
									case 'form':
									case 'select_multiple':
									case 'select':
									case 'tags':
										if (!functions.compare_array(original[x], options.delegate[x]) || force) {
											set_events();
											return false;
										}
										break;
								}
								break;
						}
					}
				}
			}

			return true;
		}

		function refresh_changes(key, value) {
			var
				original = $.extend(true, {}, options);

			if (vars.locked_config) {
				return;
			}

			if (value === undefined) {
				for (var x in key) {
					if (functions.hop(key, x)) {
						functions.dot_notation_option(x, options, key[x]);
					}
				}
			} else {
				functions.dot_notation_option(key, options, value);
			}

			_apply(original);
		}

		options = $.extend(true, {}, vars.defaults, options);

		$window.on({
			'load': function(){
				if (options.enable.autolock) {
					vars.locked_config = true;
				}
				if (options.inline.enabled && options.inline.once) {
					vars.inline_load = false;
				}
			}
		});

		/**
		 * Config phery instance
		 *
		 * @param {String|Object.<String, *>} [key] name using dot notation, like 'enable.log'
		 *
		 * @param {Boolean} [key.cursor]
		 * Change the cursor to "wait" when AJAX requests are in progress
		 *
		 * @param {Boolean|String} [key.default_href]
		 * Set the default URL to make AJAX calls, it get's overwritten by href, target and action properties
		 *
		 * @param {Number} [key.ajax.retries]
		 * Number of retries before returning fail callback
		 *
		 * @param {Number} [key.ajax.timeout]
		 * Timeout in milliseconds
		 *
		 * @param {Boolean} [key.enable.log]
		 * Enable internal log, can be accessed through phery.log()
		 *
		 * @param {Boolean} [key.enable.autolock]
		 * Auto lock phery.js settings on page load
		 *
		 * @param {Boolean} [key.enable.file_uploads]
		 * Enable file uploads through AJAX on good browsers
		 *
		 * @param {Boolean} [key.enable.log_history]
		 * Enable internal history of log
		 *
		 * @param {Boolean} [key.enable.per_element.events]
		 * Enable the ability to bind phery:* events to elements
		 *
		 * @param {Boolean} [key.enable.clickable_structure]
		 * Make structural elements such as DIV, BODY, HTML, clickable if having phery to the element
		 *
		 * @param {Boolean} [key.inline.enabled]
		 * Enable loading string or objects without AJAX calls using phery.load({});
		 *
		 * @param {Boolean} [key.inline.once]
		 * Enable loading once on page load
		 *
		 * @param {Boolean} [key.debug.enable]
		 * Enable debugging (verbose)
		 *
		 * @param {Boolean} [key.debug.display.events]
		 * Enable displaying events to the console.log
		 *
		 * @param {Boolean} [key.debug.display.remote]
		 * Enable displaying remote calls
		 *
		 * @param {Boolean} [key.debug.display.config]
		 * Enable displaying changes in configuration
		 *
		 * @param {Array|String} [key.delegate.confirm]
		 * Set when to trigger the confirm event
		 *
		 * @param {Array|String} [key.delegate.form]
		 * Set when to trigger the form submit event
		 *
		 * @param {Array|String} [key.delegate.select_multiple]
		 * Set when to trigger the select multiple event
		 *
		 * @param {Array|String} [key.delegate.select]
		 * Set when to trigger the select change event
		 *
		 * @param {Array|String} [key.delegate.tags]
		 * Set when to trigger the element clicks
		 *
		 * @param {String|Boolean|Array} [value] The value of the config name
		 *
		 * @return {Object|phery}
		 */
		phery.config = function (key, value) {
			if (typeof key === 'object' && key.constructor === Object) {
				refresh_changes(key);
				return phery;
			} else if (typeof key === 'string' && value !== undefined) {
				refresh_changes(key, value);
				return phery;
			} else if (typeof key === 'string' && value === undefined) {
				if (key in options) {
					return options[key];
				}
				return functions.dot_notation_option(key, options);
			} else if (arguments.length === 0) {
				return $.extend(true, {}, options);
			}
			return phery;
		};

		/**
		 * Lock the config, so no subsequent changes can be made to it
		 *
		 * @return {phery}
		 */
		phery.lock_config = function() {
			vars.locked_config = true;
			return phery;
		};

		/**
		 * Reset everything to the defaults
		 * @return {phery}
		 */
		phery.reset_to_defaults = function () {
			options = $.extend(true, {}, vars.defaults);
			_apply(options, true);
			return phery;
		};

		/**
		 * Log function
		 *
		 * @return {String|Array.<String>}
		 */
		phery.log = function () {
			var
				args = Array.prototype.slice.call(arguments);

			if (args.length) {
				if (options.enable.log) {
					if (options.enable.log_history) {
						_log.push(args);
					}

					if (typeof console !== 'undefined' && typeof console['log'] !== 'undefined') {
						if (typeof console['log'] === 'object') {
							/* IE is still a malign force */
							console.log(args);
						} else {
							/* Good browsers */
							console.log.apply(console, args);
						}
					}
				}

				return args.join('\n');
			} else {
				if (options.enable.log_history) {
					return _log;
				}
			}

			return [];
		};

		/**
		 * Brodcast a topic to all elements that have it subscribed
		 *
		 * @param name
		 * @param args
		 *
		 * @return phery
		 */
		phery.broadcast = function(name, args){
			var i, len, sub;
			for (i = 0, len = vars.subscribed.length; i < len; i++){
				sub = vars.subscribed[i];
				if (sub.topic === name) {
					sub.pub(args);
				}
			}
			return phery;
		};

		/**
		 * Shorthand for setting topic subscription on memory without
		 * attaching it to DOM
		 *
		 * phery.remote('function', args, attr, false).phery('subscribe', subs);
		 *
		 * @return {jQuery}
		 */
		phery.subscribe = function(func_name, subs, args, attr){
			var remote = phery.remote(func_name, args, attr, false);
			remote.phery('subscribe', subs);
			return remote;
		};

		/**
		 * Poll the server every x miliseconds. You may start and stop the timer at will
		 *
		 * @param {jQuery|Array} element
		 * Element with phery attributes or array of phery elements. If you pass an array, it will call
		 * phery.remotes() instead, and will wait each call to succeed
		 *
		 * @param {Number} [interval]
		 * Interval in miliseconds to poll. If you dont pass an interval, you'll have to start the timer
		 * manually using start(interval)
		 *
		 * @return {Object<{start:Function, stop:Function}>}
		 */
		phery.timer = function(element, interval){
			var
				stop = false,
				handler = null,
				_interval = interval,
				timeout = function(){
					if (element.constructor === Array) {
						var arr = $.makeArray(element);
						phery.remotes(arr).done(function () {
							if (stop === false) {
								handler = setTimeout(timeout, _interval);
							}
						});
					} else {
						var promise = functions.ajax_call.call(element);
						if (promise){
							promise.always(function () {
								if (stop === false) {
									handler = setTimeout(timeout, _interval);
								}
							});
						}
					}
				};

			if (interval !== undefined) {
				timeout();
			}

			return {
				'start': function(interval){
					if (interval !== undefined){
						stop = false;
						_interval = interval;
						clearTimeout(handler);
						timeout();
					}
					return this;
				},
				'stop': function(){
					stop = true;
					clearTimeout(handler);
					return this;
				}
			};
		};

		/**
		 * Function to call remote
		 *
		 * @param {String} function_name Name of the PHP function set through
		 *
		 * <pre>
		 *    Phery::instance()->set(array('function_name' => 'phpfunction'))
		 * </pre>
		 *
		 * @param {Object} [args] Optional Object containing arguments to be sent over. Set to null to skip it
		 *
		 * @param {Object} [attr] Optional Attributes to append to the created element. Set to null to skip it
		 *
		 * There are a couple of special attrs that aren't real attributes:
		 * target: {String} Specify to which URL of the call will be made
		 * method: {String} Specify the REST type of call, POST, GET, DELETE, PUT
		 * type: {String} Specify the type of response, like xml, json, text, javascript, etc
		 * proxy: {jQuery} Proxy the events to another element. Good for reusing code or not calling the element directly
		 * el: {jQuery} Implies proxy, make the call on the behalf of another element. You can't mix this with arguments
		 * cache: {Boolean} Cache the JSON response
		 *
		 * @param {Boolean} [direct_call] Default to true, call the AJAX function directly. If set to false, it
		 * will return the created object that will further need the phery('remote') call, after binding
		 * events to it.
		 *
		 * @return {jQuery.ajax|Boolean|jQuery}
		 */
		phery.remote = function (function_name, args, attr, direct_call) {
			if (!this) {
				return false;
			}

			if (this === phery && !function_name) {
				phery.log('first argument "function_name" on phery.remote() must be specified when calling directly');
				return false;
			}

			if (direct_call !== false) {
				direct_call = true;
			}

			if (this !== phery) {
				return functions.ajax_call.call(this);
			}

			var
				$a = $('<a></a>'),
				apply = [args],
				is_temp = false;

			$a.phery('data', 'remote', function_name);

			if (direct_call === true)
			{
				if (attr !== undefined){
					if (typeof attr['temp'] !== 'undefined') {
						$a.phery('data', 'temp', true);
						is_temp = true;
					} else if (typeof attr['proxy'] === 'undefined' && typeof attr['el'] === 'undefined')  {
						$a.phery('data', 'temp', true);
						is_temp = true;
					}
				} else {
					$a.phery('data', 'temp', true);
					is_temp = true;
				}
			}

			if (attr !== undefined && $.isPlainObject(attr)) {
				if (typeof attr['proxy'] !== 'undefined') {
					if (attr['proxy'] instanceof $) {
						attr['proxy'] = attr['proxy'];
					} else if ($.type(attr['proxy']) === 'string') {
						var jq = $(attr['proxy']);
						if (jq.length) {
							attr['proxy'] = jq;
						} else {
							delete attr['proxy'];
						}
					} else {
						delete attr['proxy'];
					}
				}

				if (typeof attr['el'] !== 'undefined') {
					if (attr['el'] instanceof $) {
						apply.push(attr['el']);
					}
					delete attr['el'];
				}

				for (var i in attr) {
					if (functions.hop(attr, i)) {
						if ('target method type proxy cache'.indexOf(i.toLowerCase()) !== -1) {
							$a.phery('data', i, attr[i]);
						} else {
							$a.attr(attr);
						}
					}
				}
			}

			if (is_temp === false && args) {
				$a.phery('set_args', args);
			}

			return (direct_call ? functions.ajax_call.apply($a, apply) : $a);
		};

		/**
		 * Shorthand for phery.remote('remote', null, null, false);
		 * It's mainly to create a reusable element to make many ajax calls
		 * using
		 * <pre>
		 * var element = phery.element('function');
		 * element.phery('remote', [1,2,3]);
		 * element.phery().remote({id: 1});
		 * </pre>
		 *
		 * @param {String} remote Remote function
		 * @param {Object} attrs The attrs parameter for phery.remote
		 *
		 * @return {jQuery}
		 */
		phery.element = function(remote, attrs){
			attrs = attrs || null;
			return phery.remote(remote, null, attrs, false);
		};

		/**
		 * Shorthand for JSON callback:
		 * phery.remote(remote, null, null, false).on('phery:json', cb).phery('remote', args)
		 *
		 * @param {String} remote Remote function name
		 * @param {Object|Array} args Extra arguments to pass to the remote function
		 * @param {Function} cb Callback with function(data){  }
		 *
		 * @return {jQuery}
		 */
		phery.json = function(remote, args, cb){
			var el = phery.remote(remote, null, {'temp': true}, false);
			el.on('phery:json', function(event, data){
				return cb(data);
			});
			if (args !== undefined && args !== null) {
				el.phery('remote', args);
			} else  {
				el.phery('remote');
			}
			return el;
		};

		/**
		 * Call a series of AJAX calls in order, waiting for the last call to finish.
		 * Returns a promise for all the queued calls and they will be made in sequence
		 * regardless if they were successiful or not
		 *
		 * You may watch the progress by using:
		 *
		 * <code>
		 *     phery.remotes([
		 *       ['function3'],
		 *       ['function4']
		 *     ])
		 *     .progress(function(current){
		 *       // 'this' is the element in the array and 'current' argument is the current AJAX promise
		 *       if (this instanceof jQuery) {
		 *         if (this.hasClass('loader')){
		 *           current.always(function(){
		 *             phery.remote('accomplish', this.data('id'));
		 *           });
		 *         }
		 *       } else if (this[0] === 'function3'){ // function
		 *          this.abort();
		 *       }
		 *     })
		 *     .done(function(){
		 *       // all calls were made
		 *     });
		 * </code>
		 *
		 * @param {Array|jQuery} array An array of array of arguments, the same you'd call phery.remote with.
		 *                        You may also pass a jQuery set of elements containing phery instructions
		 * <pre>
		 *     phery.remotes([
		 *       ['function',{args:1}], //same as phery.remote('function', {args: 1});
		 *       ['function2'], // same as phery.remote('function2');
		 *       ['function3', null, {target:'/target'}] // same as phery.remote('function3', null, {target: '/target'});
		 *     ]);
		 * </pre>
		 *
		 * Passing jquery set of elements
		 *
		 * <pre>
		 *      phery.remotes($('.containers:not(.loaded)'));
		 * </pre>
		 *
		 * This isn't the same as doing $('.containers:not(.loaded)').phery('remote'),
		 * because all elements will be called at the same time
		 *
		 * @return {jQuery.Deferred}
		 */
		phery.remotes = function(array) {
			var
				$d = $.Deferred(),
				promises = [],
				count = 0,
				next = function() {
					var current = array instanceof $ ? array.eq(count++) : array.shift();
					if (current && current.length) {
						var promise =
							array instanceof $ ?
								phery.remote.apply(current)
								:
								phery.remote.apply(phery, current);

						if (promise instanceof $.Deferred) {
							promises.push(promise);
							$d.notifyWith(current, promise);
							promise.always(next);
						} else {
							next();
						}
					} else {
						$d.resolve(promises);
					}
				};

			if ($.type(array) === 'array' && array.length) {
				for (var i = 0; i < array.length; i++) {
					if ($.type(array[i]) === 'array') {
						if (array[i].length > 3) {
							array[i] = array[i].slice(0, 3);
						}
					} else {
						array.splice(i, 1);
					}
				}
			} else if (!(array instanceof $)) {
				$d.resolve([]);
				return $d.promise();
			}

			next();

			return $d.promise();
		};

		/**
		 * Set the global events
		 *
		 * @param {Object.<String, *>|String} event Key:value containing events or a string with the event name.
		 *
		 * @param {function(event:jQuery.Event):Boolean} [event.before]
		 * Execute right after click or form submission and before anything else
		 *
		 * @param {function(event:jQuery.Event, xhr:jQuery.ajax, settings:Object):Boolean} [event.beforeSend]
		 * Execute right before making the AJAX call
		 *
		 * @param {function(event:jQuery.Event, data:Object):Boolean} [event.params]
		 * Set additional temporary params to the call
		 *
		 * @param {function(event:jQuery.Event, data:(null|String|jQuery.ajax)):Boolean} [event.always]
		 * The promise that always execute regardless of error or success
		 *
		 * @param {function(event:jQuery.Event, xhr:jQuery.ajax, status:String, error:String):Boolean} [event.fail]
		 * Event that is triggered after an error
		 *
		 * @param {function(event:jQuery.Event, progress:Object):Boolean} [event.progress]
		 * File upload progress
		 *
		 * @param {function(event:jQuery.Event, data:*, text:String, xhr:jQuery.ajax):Boolean} [event.done]
		 * Called on successiful AJAX call
		 *
		 * @param {function(event:jQuery.Event, data:(jQuery|null)):Boolean} [event.after]
		 * Called after all processing is done
		 *
		 * @param {function(event:jQuery.Event, msg:String, data:*):Boolean} [event.exception]
		 * Called on exception
		 *
		 * @param {function(event:jQuery.Event, json_data:*):Boolean} [event.json]
		 * Called on JSON data
		 *
		 * <pre>
		 *    phery.on('always', fn); // or
		 *    phery.on({'always': fn});
		 * </pre>
		 *
		 * @param {function(event:jQuery.Event, ...*):Boolean} [cb] Callback for the event.
		 *
		 * @return {phery}
		 */
		phery.on = function (event, cb) {
			if (typeof event === 'object') {
				if ($.isPlainObject(event)) {
					for (var x in event) {
						if (functions.hop(event, x)) {
							phery.on(x, event[x]);
						}
					}
				}
			} else if (typeof event === 'string' && typeof cb === 'function') {
				if (event in vars._callbacks) {
					debug(['phery.on', {
						event:event,
						callback:cb
					}], 'events');

					callbacks.on(event + '.phery', cb);
				}
			}

			return phery;
		};

		/**
		 * Unset a global event
		 *
		 * @param {String} event Name of the event or space separated event names
		 * @return {phery}
		 */
		phery.off = function (event) {
			debug(['phery.off', {
				event:event
			}], 'events');

			callbacks.off(event + '.phery');
			return phery;
		};

		/**
		 * Load (once by default) inline answer without making an AJAX call through phery.remote
		 * Using the inline_load() method in PheryResponse, you may load it once per page load, so you
		 * can reuse PheryResponses in both AJAX and on page load
		 *
		 * @param {String} str PheryResponse string (using PheryResponse->inline_load())
		 * @param {jQuery} [element] An element that will "respond" for this load. If its not provided, it will create a dummy element
		 * @return {phery}
		 */
		phery.load = function(str, element){
			if (options.inline.enabled) {
				if (!vars.inline_load) {
					return phery;
				}

				if (!element) {
					element = $('<a></a>');
					element.phery('data', 'temp', true);
				}

				if ($.type(str) === 'string' && element instanceof $) {
					functions.process_request.call(element, $.parseJSON(str), true);
				}
			}
			return phery;
		};

		vars._containers = {};

		functions.excluded_url = function (href, urls) {
			if (href === '#') {
				return true;
			}
			for (var x = 0; x < urls.length; x++) {
				switch (typeof urls[x]) {
					case 'string':
						if (href.indexOf(urls[x]) !== -1) {
							return true;
						}
						break;
					case 'object':
						if (href.search(urls[x]) !== -1) {
							return true;
						}
						break;
					case 'function':
						if (urls[x].call(null, href) === true) {
							return true;
						}
				}
			}
			return false;
		};

		/**
		 * @constructor
		 * @param {jQuery} config
		 */
		functions.phery_view = function(config) {
			/**
			 * Container jQuery element
			 *
			 * @type {jQuery}
			 */
			this.container = config;

			/**
			 * Cloned data from jQuery.phery('data', 'view'), read-only
			 *
			 * @readonly
			 * @type {*}
			 */
			this.data = $.extend({}, this.container.phery('data', 'view'));

			/**
			 * Check if a given url is excluded by the view config
			 *
			 * @method
			 * @param {String} url Url to check if its excluded
			 *
			 * @return {boolean} If its excluded or not
			 */
			this.is_excluded_url = function (url) {
				var excludes = this.container.phery('data', 'view')['exclude'] || false;
				if (excludes && url) {
					return functions.excluded_url(url, excludes);
				}
				return false;
			};
			/**
			 * AJAX navigation and partial rendering
			 *
			 * @method
			 *
			 * @param {String} url URL to navigate inside the container
			 * @param {*} [args] Any extra arguments to pass through AJAX
			 * @param {*} [passdata] Any extra data to append after reaching the render, afterHtml, beforeHtml
			 *
			 * @return {jQuery.ajax}
			 */
			this.navigate_to = function (url, args, passdata) {
				if (url) {
					this.container.phery('data', 'target', url);
				}
				var ajax;
				if (passdata !== undefined) {
					this.container.phery('data', 'passdata', passdata);
				}
				if (args !== undefined && args !== null) {
					ajax = functions.ajax_call.call(this.container, args);
				} else {
					ajax = functions.ajax_call.call(this.container);
				}
				return ajax;
			};
		};

		/**
		 * Enable AJAX partials for the site, allowing you to create multiple containers that work differently
		 * from the rest of the page, with own links and content flow
		 *
		 * Disable links that responds to it using the <b>.no-phery</b> class
		 * If you provide a string as the name of previously
		 * set container, it will return an object associated
		 * with the container as follows:
		 *
		 * <pre>
		 * {
		 *      'data': container.data,			// selector, callbacks, etc
		 *      'container': $(container),		// jquery container itself
		 *      'navigate_to': function(url),	// function to navigate to url set
		 *      'is_excluded_url': function(url)// check if the URL is excluded
		 * }
		 * </pre>
		 *
		 * If you pass false value to the container, it will remove the view from the id
		 *
		 * <pre>
		 * phery.view({'#container':false});
		 * </pre>
		 *
		 * @param {Object.<string, *>|String} config containing the view references to containers and respective configs.
		 *
		 * @param {function(data:Object,passData:*)} [config.beforeHtml]
		 * Optional, function to call before the
		 * HTML was set, can interact with existing elements on page
		 * The context of the callback is the container
		 * Passdata is a temp data that is kept between requests
		 *
		 * @param {function(data:String,data:Object,passData:*)} [config.render]
		 * Optional, function to call to render the HTML,
		 * in a custom way. This overwrites the original function,
		 * so you might set this.html(html) manually.
		 * The context of the callback is the container.
		 * Passdata is a temp data that is kept between requests
		 *
		 * @param {function(data:Object,passData:*)} [config.afterHtml]
		 * Optional, function to call after the HTML was set,
		 * can interact with the new contents of the page
		 * The context of the callback is the container.
		 * Passdata is a temp data that is kept between requests
		 *
		 * @param {string} [config.selector]
		 * Optional, defaults to a[href]:not(.no-phery,[target],[data-phery-remote],[href*=":"],[rel~="nofollow"]).
		 * Setting the selector manually will make it 'local' to the #container, like '#container a'
		 * Links like <a rel="#nameofcontainer">click me!</a>, using the rel attribute will trigger too
		 *
		 * @param {Array.<(RegExp|String|function(str:string):Boolean)>} [config.exclude]
		 * Optional, array containing conditions for links NOT to follow,
		 * can be string, regex and function (that returns boolean, receives the url clicked, return true to exclude)
		 * It's easier to maintain using IDs (like "#container") instead of selectors, like "div > section:eq(0)"
		 *
		 * @return {functions.phery_view|phery}
		 */
		phery.view = function (config) {
			if (typeof config === 'string') {
				if (typeof vars._containers[config] !== 'undefined') {
					return vars._containers[config];
				} else {
					return phery;
				}
			}

			if (typeof config === 'object' && $.isEmptyObject(config)) {
				debug(['phery.view needs config'], 'config');
				return phery;
			}

			if (!$.isPlainObject(config)) {
				debug(['phery.view needs a plain object'], 'config');
				return phery;
			}

			var
				_container,
				_bound,
				$container,
				selector,
				event = function (e) {
					/* Prepare */
					var
						$this = $(this),
						href = $this.attr('href');

					/* Continue as normal for cmd clicks etc */
					if (e.which === 2 || e.metaKey) {
						return true;
					}

					if (e.data.is_excluded_url(href)) {
						return true;
					}

					debug([
						'phery.view link clicked, loading content',
						e.data.container,
						$this.attr('href')
					], 'events');

					e.data.navigate_to($this.attr('href'));

					e.stopPropagation();
					e.preventDefault();
					return false;
				};

			$document
				.off('click.view');

			for (_container in config) {
				if (functions.hop(config, _container)) {
					$container = $(_container);

					if ($container.length === 1) {
						_bound = _container.replace(/[#\.\s>:,~=\+\-_\*]/g, '');

						if (config[_container] === false) {
							/* Remove the view */

							$container.off('.pheryview');
							$document.off('click.view.' + _bound);

							debug(['phery.view uninstalled and events unbound', $container], 'config');
							continue;
						}

						if (
							typeof config[_container]['selector'] === 'string' &&
								config[_container]['selector'].search(/(^|\s)a($|\s|\.)/i) !== -1
							) {
							selector = _container + ' ' + config[_container]['selector'];
						} else {
							selector = 'a[href]:not(.no-phery,[target],[data-phery-remote],[href*=":"],[rel~="nofollow"])';
						}

						selector = selector + ',a[href][rel="' + (_container) + '"]';

						for (var _x in config[_container]) {
							if (functions.hop(config[_container], _x) && typeof _x === 'string' && typeof vars._callbacks[_x] !== 'undefined') {
								$container.on('phery:' + (_x) + '.pheryview', config[_container][_x]);
								delete config[_container][_x];
							}
						}

						$container.phery('data', 'view', $.extend(true, {}, config[_container], {
							'selector': selector
						}));

						vars._containers[_container] = new functions.phery_view($container);

						$document
							.on('click.view.' + _bound, selector, vars._containers[_container], event);


						debug(['phery.view installed', $container], 'config');
					} else {
						debug(['phery.view container', $container, 'isnt unique or does not exist'], 'config');
					}
				}
			}

			return phery;
		};

		/**
		 * Reset form(s)
		 *
		 * @extends {jQuery.fn}
		 * @return {jQuery}
		 */
		functions.reset = function () {
			return this.each(function () {
				if ($(this).is('form')) {
					this.reset();
				}
			});
		};

		/**
		 * Calls phery functions attached to the element, pass parameters after the name
		 *
		 * <pre>
		 * // Can be called in many ways
		 * $(el).phery().set_args({'hello':true});
		 * $(el).phery('set_args', {'hello':true});
		 * $(el).phery({
		 *   'set_args': [{'hello':true}]
		 * });
		 * </pre>
		 *
		 * @extends {jQuery}
		 * @extends {jQuery.fn}
		 * @this {jQuery}
		 *
		 * @param {String|Object} name String name of the phery function or object containing all calls
		 * @param {[String, *]} [name.exception]
		 * @param {[(String|Object), *]} [name.data]
		 * @param {[(jQuery|String)]} [name.proxy]
		 * @param {[*]} [name.remote]
		 * @param {[*]} [name.append_args]
		 * @param {[*]} [name.set_args]
		 * @param [name.get_args]
		 * @param [name.remove]
		 * @param {[String, *]} [name.make]
		 * @param [name.inprogress]
		 * @param {[Boolean]} [name.unmake]
		 *
		 * @return {*}
		 */
		functions.phery = function (name) {
			var
				/**
				 * @type {jQuery}
				 */
				$this = this,
				_out = (function(){
					return {
						/**
						 * Publish a message to the element
						 *
						 * @param {String} name
						 * @param {Array} args
						 *
						 * @return {jQuery}
						 */
						'publish':function (name, args) {
							return $this.each(function(){
								var $this = $(this), subs;
								subs = functions.is_subscribed(name, false, $this);
								if (subs !== false) {
									subs.pub(args);
								}
							});
						},
						/**
						 * Bind a list of subscriptions to listen from the server
						 *
						 * @param {Object} obj
						 * Key value pair of topics to subscribe to
						 *
						 * @param {Boolean} [remove]
						 * If you want to remove the functions instead of adding them
						 * to the element
						 *
						 * @return {jQuery}
						 */
						'subscribe':function (obj, remove) {
							return $this.each(function(){
								var v, $this = $(this), sub;
								for (v in obj) {
									if (functions.hop(obj, v)){
										sub = functions.is_subscribed(v, true, $this);
										if (sub !== false){
											if (remove === true) {
												sub.unsub(obj[v]);
											} else {
												sub.sub(obj[v]);
											}
										}
									}
								}
							});
						},
						/**
						 * Trigger phery exception on the element
						 *
						 * @param {String} msg
						 * @param {*} [data]
						 * @return {jQuery}
						 */
						'exception':function (msg, data) {
							return $this.each(function () {
								var $this = $(this);
								functions.trigger_phery_event($this, 'exception', [msg, data]);
							});
						},
						/**
						 * Set phery related data, namespaced to phery-
						 *
						 * @param {Object|String} [name] Name of the data item
						 * @param {*} [data] The data itself
						 * @returns {*}
						 */
						'data':function (name, data) {
							var i;
							if (data !== undefined) {
								$this.data('phery-' + (name), data);
								return $this;
							} else if (name !== undefined) {
								if ($.isPlainObject(name)) {
									for (i in name) {
										if (functions.hop(name, i)) {
											$this.data('phery-' + (i), name[i]);
										}
									}
									return $this;
								}
								return $this.data('phery-' + (name));
							}

							data = $.extend({}, $this.data());
							for (i in data) {
								if (functions.hop(data, i) && !/^phery/.test(i)) {
									delete data[i];
								}
							}

							return data;
						},
						/**
						 * Set the current element to proxy another element permanently
						 *
						 * @param {jQuery|String|null} jq
						 * If you pass a jQuery element, the proxy will be this element(s).
						 * If you pass a string, it will assume it's a selector, and will try to jQuery() it
						 * If you pass null, false, 0, it will remove proxy data from the element
						 *
						 * @returns {jQuery}
						 */
						'proxy':function (jq) {
							return $this.each(function () {
								var $_this = $(this);

								if (jq instanceof $) {
									if (jq.length) {
										$_this.phery('data', 'proxy', jq);
									}
								} else if ($.type(jq) === 'string') {
									try {
										jq = $(jq);
										if (jq.length) {
											$_this.phery('data', 'proxy', jq);
										}
									} catch (exc) {}
								} else {
									$.removeData(this, 'phery-proxy');
								}
							});
						},
						/**
						 * Call the bound remote function on the element
						 * You may pass any arguments with it, that will execute the same
						 * arguments on ALL elements
						 *
						 * @param {Object} [args] Pass additional args, either an array or an object
						 * @return {jQuery}
						 */
						'remote':function (args) {
							return $this.each(function () {
								var $this = $(this);

								if ($this.is(':phery-remote')) {
									if ($this.is('form')) {
										functions.form_submit($this);
									} else {
										functions.ajax_call.call($this, args);
									}
								}
							});
						},
						/**
						 * Call the bound remote function on the element
						 * You may pass any arguments with it, that will execute the same
						 * arguments on the first element only. Returns a promise
						 *
						 * @param {Object} [args] Pass additional args, either an array or an object
						 * @return {jQuery}
						 */
						'one':function (args) {
              if ($this.is(':phery-remote')) {
                if ($this.is('form')) {
                  return functions.form_submit($this);
                } else {
                  return functions.ajax_call.call($this, args);
                }
              }
						},
						/**
						 * Append arguments to the element, pass as many items you want
						 *
						 * @return {_out}
						 */
						'append_args':function () {
							var args = Array.prototype.slice.call(arguments);

							if (args.length) {
								$this.each(function () {
									var $this = $(this);
									functions.append_args.apply($this, [args]);
								});
							}

							return _out;
						},
						/**
						 * Set the arguments of the element.
						 *
						 * @param {*} args Prefer using objects or arrays
						 * @return {_out}
						 */
						'set_args':function (args) {
							$this.each(function () {
								var $this = $(this);
								functions.set_args.call($this, [args]);
							});
							return _out;
						},
						/**
						 * Current element arguments
						 *
						 * @return {*}
						 */
						'get_args':function () {
							return _out.data('args');
						},
						/**
						 * Remove the DOM object from the page, doing some cleanups
						 */
						'remove':function () {
							$this.each(function () {
								var $this = $(this);
								$this.phery('data', 'temp', true);
								clean_up($this);
							});
						},
						/**
						 * Make the current elements ajaxified
						 *
						 * @param {String} func Name of the AJAX function
						 * @param {Array.<*>|Object.<string, *>} [args] Arguments
						 * @return {jQuery}
						 */
						'make':function (func, args) {
							if ($.type(func) === 'string') {
								return $this.each(function () {
									var $this = $(this);

									$this
										.attr('data-phery-remote', func)
										.phery('data', {
											'remote': func,
											'inprogress': false
										});

									if (args !== undefined) {
										functions.set_args.call($this, [args]);
									}
								});
							}
							return $this;
						},
						/**
						 * Return true if there's an AJAX in progress
						 *
						 * @returns {Boolean}
						 */
						'inprogress':function() {
							return !!_out.data('inprogress');
						},
						/**
						 * Remove phery from the current elements.
						 *
						 * @param {Boolean} [unbind] Unbind phery events
						 * @return {jQuery}
						 */
						'unmake':function (unbind) {
							return $this.each(function () {
								var $this = $(this);
								if (unbind) {
									$this.off('.phery');
								}
								$.removeData(this, 'remote');
								$this
									.removeAttr('data-phery-remote')
									.removeAttr('data-phery-args')
									.removeAttr('data-phery-confirm');
							});
						}
					};
				})();

			if (name && $.isPlainObject(name)) {
				var last;
				for (var x in name) {
					if (functions.hop(name, x) && (x in _out)) {
						last = _out[x].apply($this, name[x]);
					}
				}
				return last;
			} else if (name && (name in _out)) {
				return _out[name].apply($this, Array.prototype.slice.call(arguments, 1));
			}

			return _out;
		};

		/**
		 * Create an object from a form
		 *
		 * @param {Object} [opt] Config object
		 *
		 * @param {Boolean} [opt.disabled]
		 * Process disabled form elements, defaults to false
		 *
		 * @param {Boolean} [opt.all]
		 * Include all elements from a form, including null ones, assigning an empty string to the item, defaults to false
		 *
		 * @param {Boolean} [opt.empty]
		 * Setting to false will skip empty fields (won't be submitted), setting to true will submit empty key:values pairs, this overrides "all" setting, defaults to true
		 *
		 * @param {Boolean} [opt.files_apart]
		 * Setting this to true will make serializeForm return 2 objects, instead of one, one called inputs, and another called files
		 *
		 * @extends {jQuery.fn}
		 * @return {Object.<String, (String|Array|File)>|{inputs: (String|Array|File), files: Object.<(String|File)>}}
		 */
		functions.serializeForm = function (opt) {
			opt = $.extend({
				'disabled':false,
				'all':false,
				'empty':true,
				'files_apart':false
			}, opt || {});

			var
				$form = $(this),
				result = opt['files_apart'] ? {'inputs':{}, 'files':{}} : {},
				map = function () {
					var $this = $(this);
					if (!vars.has_file && $this.is('input[type="file"]')) {
						return null;
					}
					return functions.form_element($this);
				},
				formValues =
					$form.is('form') ?
						(
							$form
							.find('input,textarea,select')
							.filter(function () {
								var ret = true;
								if (!opt['disabled']) {
									ret = !this.disabled;
								}
								return ret && $.trim(this.name) !== '';
							})
							.map(map)
							.get()
						)
						:
						(
							$form.is('select,textarea,input') ?
								[functions.form_element($form)]
								:
								[]
						);

			if (formValues.length) {
				var
					i,
					value,
					name,
					$matches,
					len,
					offset,
					j,
					type,
					fields;

				for (i = 0; i < formValues.length; i++) {
					name = formValues[i].name;
					value = formValues[i].value;
					type = formValues[i].type;

					if (!opt['all']) {
						if (value === null) {
							continue;
						}
					} else {
						if (value === null) {
							value = '';
						}
					}

					if (value === '' && !opt['empty']) {
						continue;
					}

					if (type === 'file' && value.length === 0) {
						continue;
					}

					if (!name) {
						continue;
					}

					$matches = name.split(/\[/);

					len = $matches.length;

					for (j = 1; j < len; j++) {
						$matches[j] = $matches[j].replace(/\]/g, '');
					}

					fields = [];

					for (j = 0; j < len; j++) {
						if ($matches[j] || j < len - 1) {
							fields.push($matches[j].replace(/['"]+/g, ''));
						}
					}

					if ($matches[len - 1] === '') {
						offset = functions.assign_object(
							opt['files_apart'] ?
							(
								(type === 'file') ? result['files'] : result['inputs']
							) : result,
							fields, [], true, false, false
						);

						if ($.type(value) === 'array') {
							Array.prototype.push.apply(offset[0][offset[1]], value);
						} else {
							offset[0][offset[1]].push(value);
						}
					} else {
						functions.assign_object(
							opt['files_apart'] ?
							(
								(type === 'file') ? result['files'] : result['inputs']
							) : result,
							fields, value, true, false, false, type === 'file'
						);
					}
				}
			}

			return result;
		};

		$.extend($.expr[':'], {
			'phery-remote': function(el){
				return typeof (el instanceof $ ? el.phery('data', 'remote') : $(el).phery('data', 'remote')) === 'string';
			},
			'phery-confirm': function(el){
				return typeof (el instanceof $ ? el.phery('data', 'confirm') : $(el).phery('data', 'confirm')) === 'string';
			},
			'phery-view': function(el){
				return !!(el instanceof $ ? el.phery('data', 'view') : $(el).phery('data', 'view'));
			}
		});

		/**
		 * @extends {jQuery}
		 * @extends {jQuery.fn}
		 */
		$.fn.reset = functions.reset;
		/**
		 * @extends {jQuery}
		 * @extends {jQuery.fn}
		 */
		$.fn.phery = functions.phery;
		/**
		 * @extends {jQuery}
		 * @extends {jQuery.fn}
		 */
		$.fn.serializeForm = functions.serializeForm;

		/**UNITTEST-BEGIN RUNS ON LOCALHOST ONLY*/
		if ($.inArray(window.location.host, ['127.0.0.1','::1','localhost']) > -1) {
			phery.vars = vars;
			phery.functions = functions;
		}
		/**UNITTEST-END*/

		if (!('vars' in phery) && !('functions' in phery)) {
			if (typeof Object['freeze'] === 'function') {
				Object.freeze(phery);
			}
		}

		_apply(options, true);

		return phery;
	}
));
