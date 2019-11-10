/**
 * The MIT License (MIT)
 *
 * Copyright © 2010-2012 Paulo Cesar, http://phery-php-ajax.net/
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
		window.phery = factory(window, jQuery);
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
			$document = $(document),
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
			 * @constructor
			 * @version 2.4.1
			 */
			phery = function(){ return phery; };

		vars.locked_config = false;
		vars.inline_load = true;
		vars.special_match = /\{([#~\+\-=!])[\d]+\}/;
		vars.$version = $().jquery;
		vars.has_formdata = ('FormData' in window);
		vars.has_file = vars.has_formdata && ('File' in window);
		vars.FormData = vars.has_formdata ? FormData : null;

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
		phery.version = '2.4.0';


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
		 * @return {Boolean|Object.<string, *>}
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
						obj[keyPath[lastKeyIndex]].concat(value);
					} else {
						obj[keyPath[lastKeyIndex]].push(value);
					}
				} else {
					if (force_append) {
						obj[keyPath[lastKeyIndex]] = obj[keyPath[lastKeyIndex]].concat(value);
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
				if (obj.hasOwnProperty(prop)) {
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

		functions.to_formdata = function(obj){
			obj = ($.type(obj) === 'object' ? functions.obj_to_str(obj) : obj);
			var
				fd = new vars.FormData(),
				x;

			for (x in obj) {
				if (obj.hasOwnProperty(x)) {
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
							this_data.concat(args);
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
					this_data = [].concat(this_data, args);
					break;
				case 'undefined':
					if (arg_type === 'object') {
						this_data = args;
					} else {
						this_data = [].concat(args);
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
				options,
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
				options = $this.find('option').filter(functions.filter_prop('selected'));
				if ($this.prop('multiple')) {
					value = options.map(function () {
						return this.value || this.innerHTML;
					}).get();
				} else {
					value = options.val();
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
				if (args.hasOwnProperty(x)) {
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
					fn = null,
					i;

				for (i = 0; i < cache_len; i++) {
					if (vars.call_cache[i].str === str) {
						fn = vars.call_cache[i].fn;
						break;
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
						'fn':fn
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
				'retries': 0
			},
			'enable': {
				'log': false,
				'autolock': false,
				'file_uploads': false,
				'log_history': false,
				'per_element': {
					'events': true
				},
				'clickable_structure': false
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
			$body_html,
			_callbacks = {
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
				event = $.Event(name),
				res;

			if (context) {
				event['target'] = context;
			}

			el.trigger(event, $.type(data) === 'array' ? data : [data]);

			res = (event.result !== false);

			if (bubble) {
				event['target'] = el;
				$document.trigger(event, $.type(data) === 'array' ? data : [data]);
			}

			debug(['event triggered', {
				'name':name,
				'event result':res,
				'element':el,
				'data':data
			}], 'events');

			return res;
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
			triggerData = triggerData || false;

			if (triggerData) {
				functions.trigger_and_return(callbacks, event_name, data, el);

				if (el && options.enable.per_element.events) {
					functions.trigger_and_return(el, 'phery:' + event_name, data, null, true);
				}

				return true;
			} else {
				if (functions.trigger_and_return(callbacks, event_name, data, el) === false) {
					return false;
				}

				if (el && options.enable.per_element.events) {
					return functions.trigger_and_return(el, 'phery:' + event_name, data, null, true);
				}

				return true;
			}
		};

		functions.countProperties = function(obj) {
			var count = 0;

			if (typeof obj === 'object') {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
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
				$.removeData(el);
				el.remove();
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
			var dispatch_event;

			if (this.phery('data', 'proxy') instanceof $) {
				dispatch_event = this.phery('data', 'proxy');
			} else if (element) {
				dispatch_event = element;
			} else {
				dispatch_event = this;
			}

			if (functions.trigger_phery_event(dispatch_event, 'before') === false) {
				functions.trigger_phery_event(dispatch_event, 'always', [null]);
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
				_this = this,
				tmp,
				url =  _this.attr('action') || _this.attr('href') || _this.phery('data', 'target') || el.attr('action') || el.attr('href') || el.phery('data', 'target') || options.default_href || window.location.href,
				type = _this.phery('data', 'type') || el.phery('data', 'type') || 'json',
				method = _this.attr('method') || el.attr('method') || el.phery('data', 'method') || 'GET',
				submit_id = el.attr('id') || el.parent().attr('id') || null,
				requested,
				cache = !!_this.phery('data', 'cache') || !!el.phery('data', 'cache') || false,
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
			} else if (_this.phery('data', 'remote') || el.phery('data', 'remote')) {
				data['phery']['remote'] = _this.phery('data', 'remote') || el.phery('data', 'remote');
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

			has_file = functions.countProperties(files) > 0;

			var opt = {
				url:(
					cache ? url : (
						url.indexOf('_=') === -1 ?
							(url + (url.indexOf('?') > -1 ? '&' : '?') + '_=' + requested)
							:
							(url.replace(/_=(\d+)/, '_=' + requested))
						)
					),
				data: has_file ? functions.to_formdata($.extend(files, data)) : data,
				contentType: has_file ? false : 'application/x-www-form-urlencoded',
				processData: !has_file,
				dataType:type,
				type:'POST',
				el:_this,
				global:false,
				try_count:0,
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

					return functions.trigger_phery_event(dispatch_event, 'beforeSend', [xhr, settings]) !== false;
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

					if (functions.trigger_phery_event(dispatch_event, 'fail', [xhr, status, error]) === false) {
						clean_up(this.el);
						return false;
					}

					clean_up(this.el);
					return true;
				},
				_done = function (data, text, xhr) {
					if (functions.trigger_phery_event(dispatch_event, 'done', [data, text, xhr]) === false) {
						return false;
					}

					functions.process_request.call(dispatch_event, data, dispatch_event !== _this);
					return true;
				},
				_always = function (data, text, xhr) {
					if (text === 'timeout' && data.readyState !== 4 && this.try_count > 0 && this.try_count <= this.retry_limit) {
						functions.trigger_phery_event(dispatch_event, 'always', [data]);
						return false;
					}

					do_cursor(false);

					if (functions.trigger_phery_event(dispatch_event, 'always', [text === 'timeout' ? data : xhr]) === false) {
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

		functions.convert_special = function ($this, obj) {
			var func, x, data;

			if ($.type(obj) === 'object') {
				if (typeof obj['PF'] !== 'undefined') {
					if ((func = functions.str_is_function(obj['PF'], true))) {
						obj = func;
					} else {
						obj = null;
					}
				} else if (typeof obj['PR'] !== 'undefined') {
					data = obj['PR'];
					for (x in data) {
						if (data.hasOwnProperty(x)) {
							obj = functions.process($this, functions.selector($this, x, data), data[x]);
						}
					}
				}
			}

			return obj;
		};

		functions.selector = function ($this, x, data, $last_known) {
			var $jq = false, argv, func, special = x.match(vars.special_match);

			if (special !== null) {
				special = special[1];
			}

			if (special === '=' || special === '!') {
				argv = data[x].shift();
				func = functions.process_parameters($this, argv['a'][0]);

				if (func !== argv['a'][0]) {
					if ($.type(func) === 'function') {
						if (special === '=' && func.call($last_known || $this)) {
							$jq = $last_known || $this;
						} else if (special === '!' && !func.call($last_known || $this)) {
							$jq = $last_known || $this;
						}
					} else if ($.type(func) === 'boolean') {
						if (special === '=' && func) {
							$jq = $last_known || $this;
						} else if (special === '!' && !func) {
							$jq = $last_known || $this;
						}
					} else if ($.type(func) === 'object' || $.type(func) === 'string') {
						try {
							if (special === '=') {
								if (func instanceof $ && func.length) {
									$jq = $last_known || $this;
								} else if ($(func).length) {
									$jq = $last_known || $this;
								}
							} else if (special === '!') {
								if (func instanceof $ && !func.length) {
									$jq = $last_known || $this;
								} else if (!$(func).length) {
									$jq = $last_known || $this;
								}
							}
						} catch (exception) {
							functions.trigger_phery_event($this, 'exception', [phery.log(exception)]);
						}
					}
				}
			} else if (special === '+') {
				argv = data[x].shift();
				var Obj = functions.assign_object((typeof argv['a'][1] === 'string' && argv['a'][1].match(vars.special_match)) ? functions.selector($this, argv['a'][1], data, $last_known) : window, argv['c'], undefined, false, false, true);

				if (Obj) {
					$jq = argv['a'][0] ? new Obj() : Obj;
				} else {
					functions.trigger_phery_event($this, 'exception', [phery.log('failed access to object', 'window.' + argv['c'].join('.'))]);
				}
			} else if (special === '~') {
				$jq = $this;
			} else if (special === '-') {
				argv = data[x].shift();
				argv = argv['a'];
				$jq = phery.remote(argv[0], argv[1], argv[2], argv[3]);
			} else if (special === '#') {
				$jq = $;
			} else if (x.toLowerCase() === 'window') {
				$jq = $(window);
			} else if (x.toLowerCase() === 'document') {
				$jq = $(document);
			} else {
				$jq = $(x);
			}

			return $jq;
		};

		functions.process_parameters = function ($this, args) {
			args = functions.convert_special($this, args);

			if ($.type(args) === 'object' || $.type(args) === 'array') {
				var i, x;

				for (i in args) {
					if (args.hasOwnProperty(i)) {
						switch ($.type(args[i])) {
							case 'array':
								for (x in args[i]) {
									if (args[i].hasOwnProperty(x)) {
										args[i][x] = functions.process_parameters($this, args[i][x]);
									}
								}
								break;
							case 'object':
								args[i] = functions.process_parameters($this, args[i]);
								break;
						}
					}
				}
			}

			return args;
		};

		/**
		 *
		 * @param {jQuery} $this
		 * @param {jQuery|HTMLElement} obj
		 * @param {Object} item
		 * @returns {*}
		 */
		functions.process = function ($this, obj, item) {
			var i, argv, func_name;

			for (i in item) {
				if (item.hasOwnProperty(i)) {
					argv = item[i]['a'];
					try {
						func_name = item[i]['c'];
						if (typeof obj[func_name] === 'function') {
							if (typeof argv[0] !== 'undefined') {
								argv = functions.process_parameters($this, argv[0]);
								if ($.type(argv) === 'array' && typeof argv[0] !== 'undefined') {
									obj = obj[func_name].apply(obj, argv);
								} else {
									obj = obj[func_name].call(obj, argv);
								}
							} else {
								obj = obj[func_name].apply(obj, argv);
							}
						} else {
							throw 'no function "' + func_name + '" found in object';
						}
					} catch (exception) {
						functions.trigger_phery_event($this, 'exception', [phery.log(exception, argv)]);
					}
				}
			}
			return obj;
		};

		functions.process_request = function(data, proxied) {
			/*jshint validthis:true */
			if (!this.phery('data', 'remote') && !this.phery('data', 'view') && !proxied) {
				functions.trigger_phery_event(this, 'after', []);
				return;
			}

			if ($.type(data) !== 'object') {
				functions.trigger_phery_event(this, 'after', []);
				return;
			}

			var $jq, argv, argc, $this = this, is_selector, funct, _data, _argv, special = null;

			if (data && functions.countProperties(data)) {
				var x;
				for (x in data) {
					if (data.hasOwnProperty(x)) {

						special = x.match(vars.special_match);

						if (special !== null) {
							special = special[1];
						}

						is_selector =
							(special) ||
							(x.toString().charAt(0) === '<') ||
							(x.toString().search(/^[0-9]+$/) === -1)
						;
						/* check if it has a selector */

						if (is_selector) {
							if (data[x].length) {

								$jq = functions.selector($this, x, data, $jq);

								if (special === '#' || (special === '+' && $jq !== false) || ($jq && typeof $jq['length'] === 'number' && $jq.length)) {
									$jq = functions.process($this, $jq, data[x]);
								}
							} else {
								functions.trigger_phery_event($this, 'exception', [phery.log('no commands to issue, 0 length')]);
							}
						} else {
							argc = data[x]['a'].length;
							argv = data[x]['a'];

							switch (Number(data[x]['c'])) {
								/* alert */
								case 1:
									if (typeof argv[0] !== 'undefined') {
										alert(argv[0].toString());
									} else {
										functions.trigger_phery_event($this, 'exception', [phery.log('missing message for alert()', argv)]);
									}
									break;
								/* call */
								case 2:
									try {
										funct = argv.shift();
										funct = functions.assign_object(window, funct, undefined, false);

										if (funct !== false && typeof funct[0][funct[1]] === 'function') {
											funct[0][funct[1]].apply(null, argv[0] || []);
										} else {
											throw 'no global function "' + funct + '" found';
										}
									} catch (exception) {
										functions.trigger_phery_event($this, 'exception', [phery.log(exception, argv)]);
									}
									break;
								/* script */
								case 3:
									try {
										eval('(function(){ ' + argv[0] + ' })();');
									} catch (exception) {
										functions.trigger_phery_event($this, 'exception', [phery.log(exception, argv[0])]);
									}
									break;
								/* JSON */
								case 4:
									try {
										functions.trigger_phery_event($this, 'json', [$.parseJSON(argv[0])]);
									} catch (exception) {
										functions.trigger_phery_event($this, 'exception', [phery.log(exception, argv[0])]);
									}
									break;
								/* Render View */
								case 5:
									_data = $this.phery('data', 'view');
									_argv = $.extend(true, {}, {
										'url': $this.phery('data', 'target')
									}, argv[1]);
									var _pass;

									if ($this.phery('data', 'passdata')) {
										_pass = $this.phery('data', 'passdata');
										$.removeData($this[0], 'phery-passdata');
									} else {
										_pass = {};
									}

									if (typeof _data['beforeHtml'] === 'function') {
										_data['beforeHtml'].call($this, _argv, _pass);
									}

									if (typeof _data['render'] !== 'function') {
										$this.html('').html(argv[0]);
									} else {
										_data['render'].call($this, argv[0], _argv, _pass);
									}

									if (typeof _data['afterHtml'] === 'function') {
										_data['afterHtml'].call($this, _argv, _pass);
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
										functions.trigger_phery_event($this, 'exception', [phery.log(exception, argv[0])]);
									}
									break;
								/* Trigger Exception */
								case 7:
									if (argc > 1) {
										_argv = [argv.shift()];

										do {
											_argv.push(argv.shift());
										} while (argv.length);

										functions.trigger_phery_event($this, 'exception', _argv);
									} else {
										functions.trigger_phery_event($this, 'exception', [argv[0]]);
									}
									break;
								/* Redirect (internal or external) */
								case 8:
									if (argc === 2) {
										if (argv[1]) {
											phery.view(argv[1]).navigate_to(argv[0]);
										} else {
											window.location.assign(argv[0]);
										}
									}
									break;
								/* Set/Unset a global variable with any type of data */
								case 9:
									var _obj = functions.assign_object(window, argv[0], undefined, argc === 2, true);

									if (_obj && _obj.length > 0) {
										if (argc === 2) {
											_obj[0][_obj[1]] = functions.process_parameters($this, argv[1][0]);
										} else if (argc === 1) {
											delete _obj[0][_obj[1]];
										}
									} else {
										functions.trigger_phery_event($this, 'exception', [phery.log('object path not found in window' + argv[0].join('.'))]);
									}
									break;
								/* Include script/stylesheet */
								case 10:
									var head = $('head'), file = null, i;

									switch (argv[0]) {
										case 'j':
											for (i in argv[1]) {
												if (argv[1].hasOwnProperty(i)) {
													file = $('<script></script>', {
														'type':'text/javascript',
														'src':argv[1][i],
														'id':i
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
												if (argv[1].hasOwnProperty(i)) {
													file = $('<link/>', {
														'type':'text/css',
														'rel':'stylesheet',
														'href':argv[1][i],
														'id':i
													});

													if (!head.find('link#' + i).length) {
														head[0].appendChild(file[0]);
													} else {
														if (argv[2]) {
															head.find('link#' + i).replaceWith(file);
														}
													}
												}
											}
											break;
									}
									break;
								default:
									functions.trigger_phery_event($this, 'exception', [phery.log('invalid command "' + data[x]['c'] + '" issued')]);

									break;
							}
						}
					}
				}
			}

			functions.trigger_phery_event(this, 'after', []);
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
				if (original.hasOwnProperty(x)) {
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
					if (key.hasOwnProperty(x)) {
						functions.dot_notation_option(x, options, key[x]);
					}
				}
			} else {
				functions.dot_notation_option(key, options, value);
			}

			_apply(original);
		}

		options = $.extend(true, {}, vars.defaults, options);

		$(function () {
			$body_html = $('body,html');
			$original_cursor = $body_html.css('cursor');

			_apply(options, true);
		});

		$(window).on({
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
		 * @param {String|<vars.defaults>} [key] name using dot notation (group.subconfig)
		 * @param {String|Boolean} [value] The value of the config name
		 * @return {<vars.defaults>|phery}
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
		 * @returns {phery}
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
		 * @return {jQuery.ajax|Boolean}
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
				apply = [args];

			$a.phery('data', 'remote', function_name);

			if (direct_call) {
				$a.phery('data', 'temp', true);
			}

			if (attr !== undefined && $.type(attr) === 'object') {
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
					if (attr.hasOwnProperty(i)) {
						if ('target method type proxy cache'.indexOf(i.toLowerCase()) !== -1) {
							$a.phery('data', i, attr[i]);
						} else {
							$a.attr(attr);
						}
					}
				}
			}

			return (direct_call ? functions.ajax_call.apply($a, apply) : $a);
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
		 * @param {Object.<_callbacks>|String} event Key:value containing events or string.
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
				for (var x in event) {
					if (event.hasOwnProperty(x)) {
						phery.on(x, event[x]);
					}
				}
			} else if (typeof event === 'string' && typeof cb === 'function') {
				if (event in _callbacks) {
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
				if (config.hasOwnProperty(_container)) {
					$container = $(_container);

					if ($container.length === 1) {
						_bound = _container.replace(/[#\.\s>:,~=\+\-_\*]/g, '');

						if (config[_container] === false) {
							/* Remove the view */

							$container.off('.phery.view');
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

						$container.phery('data', 'view', $.extend(true, {}, config[_container], {
							'selector': selector
						}));

						vars._containers[_container] = new functions.phery_view($container);

						$document
							.on('click.view.' + _bound, selector, vars._containers[_container], event);

						for (var _x in config[_container]) {
							if (config[_container].hasOwnProperty(_x) && typeof _callbacks[_x] !== 'undefined') {
								$container.on('phery:' + (_x) + '.phery.view', config[_container][_x]);
							}
						}

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
		 * @extends {jQuery}
		 * @this {jQuery}
		 * @param {String|Object} name String name of the phery function or object containing all calls
		 * @return {*}
		 */
		functions.phery = function (name) {
			var
				/**
				 * @type {jQuery}
				 */
				$this = this,
				_out = {
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
							if ($.type(name) === 'object') {
								for (i in name) {
									if (name.hasOwnProperty(i)) {
										$this.data('phery-' + (i), name[i]);
									}
								}
								return $this;
							}
							return $this.data('phery-' + (name));
						}

						data = $this.data();
						for (i in data) {
							if (data.hasOwnProperty(i) && !/^phery\-/.test(i)) {
								delete data[i];
							}
						}

						return data;
					},
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
					 *
					 * @return {jQuery}
					 */
					'remote':function () {
						return $this.each(function () {
							var $this = $(this);

							if ($this.is(':phery-remote')) {
								if ($this.is('form')) {
									functions.form_submit($this);
								} else {
									functions.ajax_call.call($this);
								}
							}
						});
					},
					/**
					 * Append arguments to the element, pass as many items you want
					 *
					 * @return {Object}
					 */
					'append_args':function () {
						var args = Array.prototype.slice.call(arguments);
						$this.each(function () {
							var $this = $(this);
							functions.append_args.apply($this, [args]);
						});
						return _out;
					},
					/**
					 * Set the arguments of the element. Prefer using objects or arrays
					 *
					 * @param {*} args
					 * @return {Object}
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
						return $this.phery('data', 'args');
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
								$this.attr('data-phery-remote', func).phery('data', 'remote', func);
								if (args) {
									functions.set_args.call($this, [args]);
								}
							});
						}
						return $this;
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

			if (name && $.type(name) === 'object') {
				var last;
				for (var x in name) {
					if (name.hasOwnProperty(x) && (x in _out)) {
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
							offset[0][offset[1]].concat(value);
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
				return el instanceof $ ? el.phery('data', 'remote') : $(el).phery('data', 'remote');
			},
			'phery-confirm': function(el){
				return el instanceof $ ? el.phery('data', 'confirm') : $(el).phery('data', 'confirm');
			}
		});

		$.fn.extend({
			reset: functions.reset,
			phery: functions.phery,
			serializeForm: functions.serializeForm
		});

		/**UNITTEST-BEGIN

		phery.vars = vars;
		phery.functions = functions;

		UNITTEST-END*/

		if (!('vars' in phery) && !('functions' in phery)) {
			if (typeof Object['freeze'] === 'function') {
				Object.freeze(phery);
			}
		}

		return phery;
	}
));
