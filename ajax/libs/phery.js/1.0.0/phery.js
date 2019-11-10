/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is phery.
 *
 * The Initial Developer of the Original Code is
 * Paulo Cesar <https://github.com/pocesar/phery>.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * ***** END LICENSE BLOCK ***** */
/*jshint smarttabs:true,jquery:true,sub:true,evil:true,undef:true,latedef:true,immed:true,forin:false,browser:true,devel:true */
/*global _:true,Backbone:true */

(function($,window,undefined){
	/**
	 * @class
	 * @version 1.0
	 */
	"use strict";

	var
	str_is_function,
	call_cache = [],
	old_isFunction = $.isFunction,
	old_sync_libraries = {
		backbone: null,
		datatables: null
	},
	phery = window.phery = window.phery || {};

	function append_args(args) {
		this.data('args.phery', $.extend(true, args, this.data('args.phery')));
	}

	function set_args(args) {
		this.data('args.phery', $.extend(true, {}, args));
	}

	function string_callbacks(enable) {

		switch (enable) {
			case true:
				str_is_function = function(str) {
					if (!str || typeof str['toString'] !== 'function') {
						return false;
					}
					str = str.toString();
					if (! /^[\s;]*function\(/im.test(str) || ! /\};?$/m.test(str)) {
						return false;
					}
					return true;
				};

				String.prototype.apply = function(obj) {
					if ( ! str_is_function(this) ) {
						return false;
					}

					var
					str = this.toString(),
					cache_len = call_cache.length,
					fn = null,
					i, args;

					for(i = 0; i < cache_len; i++) {
						if (call_cache[i].str === str) {
							fn = call_cache[i].fn;
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

						call_cache.push({
							'str': str,
							'fn': fn
						});
						cache_len = call_cache.length;
					}

					args = Array.prototype.slice.call(arguments, 1);

					if (typeof args[0] !== 'undefined' && args[0].constructor === Array) {
						args = args[0];
					}

					try {
						return fn.apply(obj, args);
					} catch (exception) {
					}
					return null;
				};

				String.prototype.call = function(obj) {
					return this.apply(obj, Array.prototype.slice.call(arguments, 1));
				};

				$.isFunction = function( obj ) {
					return $.type(obj) === "function" || str_is_function(obj);
				};
				break;
			case false:
				str_is_function = function(){ return false; };

				if (typeof String.prototype['call'] === 'function') {
					delete String.prototype['call'];
				}
				if (typeof String.prototype['apply'] === 'function') {
					delete String.prototype['apply'];
				}

				$.isFunction = old_isFunction;
				break;
		}
	}

	var
	options = {},
	defaults = {
		'cursor': true,
		'default_href': false,
		'ajax': {
			'retries': 0
		},
		'enable': {
			'log': false,
			'log_history': false,
			'php_string_callbacks': false,
			'per_element': {
				'events': true,
				'options': false
			}
		},
		'debug': {
			'enable': false,
			'display': {
				'events': true,
				'remote': true,
				'config': true
			}
		},
		'delegate':{
			'confirm': 'click',
			'form': 'submit',
			'select_multiple': 'blur',
			'select': 'change',
			'tags': 'click'
		}
	},
	_callbacks = {
		'before': function() {
			return true;
		},
		'beforeSend': function() {
			return true;
		},
		'params': function() {
			return true;
		},
		'always': function() {
			return true;
		},
		'fail': function() {
			return true;
		},
		'done': function() {
			return true;
		},
		'after': function() {
			return true;
		},
		'exception': function() {
			return true;
		},
		'json': function() {
			return true;
		}
	},
	callbacks = $('<div/>'),
	_log = [],
	$original_cursor,
	$body_html,
	$container = null;

	function debug(data, type){
		if (options.debug.enable) {
			if (typeof console !== 'undefined' && typeof console['dir'] !== 'undefined') {
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

	function triggerAndReturn(el, name, data, context) {
		context = context || null;

		var
		event = $.Event(name),
		res;

		if (context) {
			event.target = context;
		}

		el.triggerHandler(event, data);
		res = (event.result !== false);

		debug(['event triggered', {
			'name': name,
			'event result': res,
			'element': el,
			'data': data
		}], 'events');

		return res;
	}

	function triggerPheryEvent(el, event_name, data, triggerData) {
		data = data || [];
		triggerData = triggerData || false;

		if (triggerData) {
			triggerAndReturn(callbacks, event_name, data, el);

			if (options.enable.per_element.events) {
				triggerAndReturn(el, 'phery:' + event_name, data);
			}

			return true;
		} else {
			if (triggerAndReturn(callbacks, event_name, data, el) === false) {
				return false;
			}

			if (options.enable.per_element.events) {
				return triggerAndReturn(el, 'phery:' + event_name, data);
			}

			return true;
		}
	}

	function countProperties(obj) {
		var count = 0;

		if (typeof obj === 'object') {
			for (var prop in obj) {
				if(obj.hasOwnProperty(prop)){
					++count;
				}
			}
		} else {
			if (typeof obj['length'] !== 'undefined'){
				count = obj.length;
			}
		}

		return count;
	}

	function clean_up(el) {
		if (el.data('temp.phery')) {
			el.off();
			el.removeProp();
			$.removeData(el);
			el.remove();
		}
	}

	function form_submit($this) {
		if($this.data('confirm.phery')){
			if (!confirm($this.data('confirm.phery'))) {
				return false;
			}
		}
		$this.find('input[name="phery[remote]"]').remove();
		return ajax_call.call($this);
	}

	function ajax_call() {
		/*jshint validthis:true*/
		if (triggerPheryEvent(this, 'before') === false) {
			clean_up(this);
			return false;
		}

		var
		_headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'X-Phery': 1
		},
		el				= this,
		url       = el.attr('action') || el.attr('href') || el.data('target.phery') || options.default_href || window.location.href,
		type      = el.data('type.phery') || 'json',
		submit_id = el.attr('id') || null,
		requested,
		ajax,
		data = {
			'phery': {}
		};

		if (el.data('args.phery')) {
			try {
				if (typeof el.data('args.phery') === 'object') {
					data['args'] = $.extend(true, {}, el.data('args.phery'));
				} else {
					/* integers, strings */
					data['args'] = el.data('args.phery');
				}
			} catch (exception) {
				triggerPheryEvent(el, 'exception', [phery.log(exception)]);
			}
		} else {
			if (el.is('input')) {
				if (el.attr('name')) {
					var _obj = {};

					if (!el.is('[type="checkbox"],[type="radio"]')) {
						_obj[el.attr('name')] = el.val();
					} else {
						_obj[el.attr('name')] = {
							'checked': el.prop('checked')?1:0,
							'value': el.val()
						};
					}
					data['args'] = $.extend(true, {}, _obj);
				}
			}
		}

		if (el.is('form')) {
			try {
				data['args'] =
				$.extend(
					true,
					{},
					data['args'],
					el.serializeForm(el.data('submit.phery')?el.data('submit.phery'):{})
					);
			} catch (exception) {
				triggerPheryEvent(el, 'exception', [phery.log(exception)]);
			}
		}

		if (el.is('select')) {
			if (el.attr('multiple')) {
				if (el.attr('name')) {
					data['args'] = $.extend(true, {}, data['args']);
					data['args'][el.attr('name')] =
					$.extend({},
						el
						.find('option')
						.filter(':selected')
						.map(function(){
							return $(this).val();
						}).get()
					);
				} else {
					data['args'] =
					$.extend(true, {},
						el
						.find('option')
						.filter(':selected')
						.map(function(){
							return $(this).val();
						}).get()
					);
				}
			} else {
				if (el.attr('name')) {
					data['args'] = $.extend(true, {}, data['args']);
					data['args'][el.attr('name')] = el.val();
				} else {
					data['args'] = el.val();
				}
			}
		}

		if (submit_id) {
			data['phery']['submit_id'] = submit_id;
		}

		if (el.data('view.phery')) {
			data['phery']['view'] = '#' + el.attr('id');
		} else if (el.data('remote.phery')) {
			data['phery']['remote'] = el.data('remote.phery');
		}

		var _tmp = {};
		triggerPheryEvent(el, 'params', _tmp, true);
		data['phery'] = $.extend(_tmp, data['phery']);

		requested = new Date();

		debug(['remote call', {
			'data': data,
			'timestamp': requested.getTime(),
			'time': requested.toLocaleString()
		}], 'remote');

		requested = requested.getTime();

		var opt = {
			url: (
				url.indexOf('_=') === -1?
				(url + (url.indexOf('?') > -1?'&':'?') + '_=' + requested)
				:
				(url.replace(/\_\=(\d+)/, '_=' + requested))
			),
			data: data,
			dataType: type,
			type: "POST",
			el: el,
			global: false,
			try_count: 0,
			retry_limit: options.ajax.retries,
			cache: false,
			processData: true,
			headers: _headers,
			'beforeSend': function (xhr, settings) {
				do_cursor('wait');

				if (triggerPheryEvent(this.el, 'beforeSend', [xhr, settings]) === false) {
					return false;
				}
				return true;
			}
		};

		var
		_fail = function (xhr, status, error) {
			if (this.retry_limit && status === 'timeout') {
				this.try_count++;

				if (this.try_count <= this.retry_limit) {
					this.dataType = "text " + type;

					this.url =
					this.url.indexOf('_try_count=') === -1?
					(this.url + '&_try_count=' + this.try_count) :
					(this.url.replace(/_try_count=(\d+)/, '_try_count=' + this.try_count));

					this.url = this.url.replace(/_=(\d+)/, '_=' + new Date().getTime());

					set_ajax_opts(this);
					return false;
				}
			}

			do_cursor(false);

			if (triggerPheryEvent(this.el, 'fail', [xhr, status, error]) === false) {
				clean_up(this.el);
				return false;
			}
			clean_up(this.el);
			return true;
		},
		_done = function (data, text, xhr) {
			if (triggerPheryEvent(this.el, 'done', [data, text, xhr]) === false) {
				return false;
			}
			processRequest.call(this.el, data);
			return true;
		},
		_always = function (data, text, xhr) {
			if (xhr.readyState !== 4 && this.try_count && this.try_count <= this.retry_limit) {
				return false;
			}

			do_cursor(false);

			if (triggerPheryEvent(this.el,'always', [xhr]) === false) {
				clean_up(this.el);
				return false;
			}

			clean_up(this.el);
			return true;
		};

		var set_ajax_opts = function(opt){
			var ajax = $.ajax(opt);

			ajax
			.done(_done)
			.always(_always)
			.fail(_fail);

			return ajax;
		};

		ajax = set_ajax_opts(opt);

		return ajax;
	}

	function set_events() {
		$(document)
		.off('.phery');

		$(document)
		.on(options.delegate.confirm + '.phery', '[data-confirm]:not(form)', function (e) {
			if (!confirm($(this).data('confirm.phery'))) {
				e.stopImmediatePropagation();
			} else {
				e.preventDefault();
			}
		})
		.on(options.delegate.form + '.phery', 'form[data-remote]', function (e) {
			var $this = $(this);
			form_submit($this);
			return false;
		})
		.on(options.delegate.tags + '.phery', '[data-remote]:not(form,select)', function (e) {
			var $this = $(this);

			ajax_call.call($this);

			if (!$this.is('input[type="text"],input[type="checkbox"],input[type="radio"],input[type="image"]')) {
				e.preventDefault();
			}
		})
		.on(options.delegate.select + '.phery', 'select[data-remote]:not([multiple])', function (e) {
			ajax_call.call($(this));
		})
		.on(options.delegate.select_multiple + '.phery', 'select[data-remote][multiple]', function (e) {
			ajax_call.call($(this));
		});
	}

	function processRequest(data){
		/*jshint validthis:true */
		if( ! this.data('remote.phery') && ! this.data('view.phery')){
			triggerPheryEvent(this, 'after', []);
			return;
		}

		var $jq, x, i, argv, argc, func_name, $this = this, is_selector, funct, _data, _argv;

		if (data && countProperties(data)) {
			for(x in data){
				is_selector = (x.toString().search(/^[0-9]+$/) === -1); /* check if it has a selector */

				if (is_selector){
					if (data[x].length){

						if (x.toLowerCase() === 'window') {
							$jq = $(window);
						} else if (x.toLowerCase() === 'document') {
							$jq = $(document);
						} else {
							$jq = $(x);
						}

						if ($jq.size()){
							for (i in data[x]){
								argv = data[x][i]['a'];
								try {
									func_name = argv.shift();
									if (typeof $jq[func_name] === 'function'){
										if (typeof argv[0] !== 'undefined' && argv[0].constructor === Array) {
											$jq = $jq[func_name].apply($jq, argv[0] || null);
										} else if (argv.constructor === Array) {
											$jq = $jq[func_name].apply($jq, argv || null);
										} else {
											$jq = $jq[func_name].call($jq, argv || null);
										}
									} else{
										throw 'no function "' + func_name + '" found in jQuery object';
									}
								} catch (exception) {
									triggerPheryEvent($this, 'exception', [phery.log(exception, argv)]);
								}
							}
						}
					} else {
						triggerPheryEvent($this, 'exception', [phery.log('no commands to issue, 0 length')]);
					}
				} else {
					argc = data[x]['a'].length;
					argv = data[x]['a'];

					switch (Number(data[x]['c'])) {
						/* alert */
						case 1:
							if (typeof argv[0] !== 'undefined' && typeof argv[0] === 'string') {
								alert(argv[0]);
							} else {
								triggerPheryEvent($this, 'exception', [phery.log('missing message for alert()', argv)]);
							}
							break;
						/* call */
						case 2:
							try {
								funct = argv.shift();
								if (typeof window[funct] === 'function') {
									window[funct].apply(null, argv[0] || []);
								} else {
									throw 'no global function "' + funct + '" found';
								}
							} catch (exception) {
								triggerPheryEvent($this, 'exception', [phery.log(exception, argv)]);
							}
							break;
						/* script */
						case 3:
							try {
								eval('(function(){ ' + argv[0] + '})();');
							} catch (exception) {
								triggerPheryEvent($this, 'exception', [phery.log(exception, argv[0])]);
							}
							break;
						/* JSON */
						case 4:
							try {
								triggerPheryEvent($this, 'json', [$.parseJSON(argv[0])]);
							} catch (exception) {
								triggerPheryEvent($this, 'exception', [phery.log(exception, argv[0])]);
							}
							break;
						/* Render View */
						case 5:
							_data = $this.data('view.phery');
							_argv = $.extend(true, {}, {
								'url': $this.data('target')
								}, argv[1]);

							if (typeof _data['beforeHtml'] === 'function') {
								_data['beforeHtml'].call($this, _argv);
							}

							if (typeof _data['render'] !== 'function') {
								$this.html('').html(argv[0]);
							} else {
								_data['render'].call($this, argv[0], _argv);
							}

							if (typeof _data['afterHtml'] === 'function') {
								_data['afterHtml'].call($this, _argv);
							}

							break;
						/* Dump var */
						case 6:
							try {
								if (typeof console !== 'undefined' && typeof console['log'] !== 'undefined') {
									for (var l = 0; l < argc; l++) {
										console.log(argv[l]);
									}
								}
							} catch (exception) {
								triggerPheryEvent($this, 'exception', [phery.log(exception, argv[0])]);
							}
							break;
						/* Trigger Exception */
						case 7:
							if (argc > 1) {
								_argv = [argv.shift()];

								do {
									_argv.push(argv.shift());
								} while (argv.length);

								triggerPheryEvent($this, 'exception', _argv);
							} else {
								triggerPheryEvent($this, 'exception', [argv[0]]);
							}
							break;
						default:
							triggerPheryEvent($this, 'exception', [phery.log('invalid command "' + data[x]['c'] + '" issued')]);

							break;
					}
				}
			}
		}

		triggerPheryEvent(this, 'after', []);
	}

	var dot_notation_option = function(val, step, set) {
		if (val.indexOf('.') !== -1) {
			var initial = val.split('.');
			if (initial && initial[0] && typeof step[initial[0]] !== 'undefined') {
				return dot_notation_option(initial.slice(1).join('.'), step[initial[0]], set);
			}
		} else if (typeof step[val] !== 'undefined') {
			if (typeof set !== 'undefined') {
				step[val] = set;
				return step;
			} else {
				return step[val];
			}
		}
		return null;
	};

	function _apply(original, force) {
		force = force || false;

		for(var x in original) {
			if (typeof original[x] === 'object') {
				if (_apply(original[x], force) === false) {
					return false;
				}
			} else {
				debug(['config', {
					'name': x,
					'value': original[x]
				}], 'config');

				switch (x) {
					case 'php_string_callbacks':
						if (original[x] !== options.enable.php_string_callbacks || force) {
							string_callbacks(options.enable.php_string_callbacks);
						}
						break;
					case 'confirm':
					case 'form':
					case 'select_multiple':
					case 'select':
					case 'tags':
						if (original[x] !== options.delegate[x] || force) {
							set_events();
							return false;
						}
						break;
				}
			}
		}

		return true;
	}

	function refresh_changes(key, value) {
		var
		original = $.extend(true, {}, options);

		if (typeof value === 'undefined') {
			for (var x in key)
			{
				dot_notation_option(x, options, key[x]);
			}
		} else {
			dot_notation_option(key, options, value);
		}

		_apply(original);
	}

	options = $.extend(true, {}, defaults, options);

	$(function(){
		$body_html = $('body,html');
		$original_cursor = $body_html.css('cursor');

		_apply(options, true);
	});

	/**
	 * Config phery singleton
	 * @param {String|Object} key name using dot notation (group.subconfig)
	 * @param {String|Boolean} value
	 * @return {phery}
	 */
	phery.config = function(key, value){
		if (typeof key === 'object' && key.constructor === Object) {
			refresh_changes(key);
			return phery;
		} else if (typeof key === 'string' && typeof value !== 'undefined') {
			refresh_changes(key, value);
			return phery;
		} else if (typeof key === 'string' && typeof value === 'undefined') {
			if (key in options) {
				return options[key];
			}
			return dot_notation_option(key, options);
		} else if (arguments.length === 0) {
			return $.extend(true, {}, options);
		}
		return phery;
	};

	/**
	 * Reset everything to the defaults
	 * @return {phery}
	 */
	phery.reset_to_defaults = function(){
		options = $.extend(true, {}, defaults);
		_apply(options, true);
		return phery;
	};

	/**
	 * Log function
	 * @param ... Any type of data
	 * @return {Array}
	 */
	phery.log = function(){
		var
		args = Array.prototype.slice.call(arguments);

		if (args.length) {
			if (options.enable.log) {
				if (options.enable.log_history) {
					_log.push(args);
				}

				if (typeof console !== 'undefined' && typeof console['log'] !== 'undefined'){
					if(typeof console['log'] === 'object')	{
						/* IE is still a malign force */
						console.log(args);
					}	else {
						/* Good browsers */
						console.log.apply(console, args);
					}
				}
			}

			return args.join("\n");
		} else {
			if (options.enable.log_history) {
				return _log;
			}
		}

		return [];
	};

	/**
	 * Function to call remote
	 * @param {String} function_name Name of the PHP function set through
	 * <pre>
	 *	phery::instance()->set()
	 * </pre>
	 * @param {Object} args Object containing arguments to be sent over
	 * @param {Object} attr Attributes to append to the created element
	 * @param {Boolean} direct_call Default, call the AJAX function directly. If set to false, it
	 * will return the created object that will further need the remote() call, like after binding
	 * events to it.
	 * @return {jQuery}
	 */
	phery.remote = function(function_name, args, attr, direct_call){
		if (this === phery && !function_name) {
			phery.log('first argument "function_name" on phery.remote() must be specified when calling directly');
			return phery;
		}

		direct_call = direct_call || true;

		if (this !== phery) {
			return ajax_call.call(this);
		}

		var $a = $('<a/>');

		$a.data({
			'remote.phery': function_name
		});

		if (direct_call) {
			$a.data('temp.phery', true);
		}

		if (typeof args !== 'undefined' && args !== null) {
			$a.phery('set_args', args);
		}

		if (typeof attr !== 'undefined') {
			$a.attr(attr);
		}

		if (!direct_call) {
			$a.extend({
				'remote': ajax_call
			});
		}

		return (direct_call?ajax_call.call($a):$a);
	};

	/**
	 * Set the global callbacks
	 * @param {Array|String} event Key:value containing events or string.
	 * <pre>
	 *	phery.on('always', fn); // or
	 *	phery.on({'always': fn});
	 * </pre>
	 * @param {Function} cb Callback for the event.
	 * @return {phery}
	 */
	phery.on = function(event, cb){
		if (typeof event === 'object') {
			for(var x in event){
				phery.on(x, event[x]);
			}
		} else if (typeof event === 'string' && typeof cb === 'function') {
			if (event in _callbacks) {
				debug(['phery.on', {
					event: event,
					callback: cb
				}], 'events');
				callbacks.bind(event + '.phery', cb);
			}
		}
		return phery;
	};

	/**
	 * Unset the callback
	 * @param {String} event Name of the event or space separated event names
	 * @return {phery}
	 */
	phery.off = function(event) {
		debug(['phery.off', {
			event: event
		}], 'events');
		callbacks.off(event + '.phery');
		return phery;
	};

	var
	_containers = {};

	/**
	 * Enable AJAX partials for the site. Disable links that responds
	 * to it using the <code>.no-phery</code> class
	 * @param {Object} config containing the #id references to containers and respective configs.
	 * <pre>
	 * {
	 *  '#container': {
	 *		// Optional, function to call before the
	 *		// HTML was set, can interact with existing elements on page
	 *		// The context of the callback is the container
	 *    'beforeHtml': function(data),
	 *    // Optional, function to call to render the HTML,
	 *		// in a custom way. This overwrites the original function,
	 *		// so you might set this.html(html) manually.
	 *		// The context of the callback is the container
	 *    'render': function(html, data),
	 *    // Optional, function to call after the HTML was set,
	 *		// can interact with the new contents of the page
	 *		// The context of the callback is the container.
	 *    'afterHtml': function(data),
	 *    // Optional, defaults to a[href]:not(.no-phery,[target],[data-remote],[href*=":"],[rel~="nofollow"]).
	 *		// Setting the selector manually will make it 'local' to the #container, like '#container a'
	 *		// Links like <a rel="#nameofcontainer">click me!</a>, using the rel attribute will trigger too
	 *    'selector': 'a',
	 *		// Optional, array containing conditions for links NOT to follow,
	 *		// can be string, regex and function (that returns boolean, receives the url clicked, return true to exclude)
	 *    'exclude': ['/contact', /\d$/, function]
	 *		// any other phery event, like beforeSend, params, etc
	 *  }
	 * }
	 * </pre>
	 * If you provide a string as the name of previously
	 * set container, it will return an object associated
	 * with the container as follows:
	 * <pre>
	 * {
	 *	'data': container.data,    // selector, callbacks, etc
	 *	'container': $(container), // jquery container itself
	 *	'remote': function(url)    // function to navigate to url set
	 * }
	 * </pre>
	 * @return {phery}
	 */
	phery.view = function(config){
		if (typeof config === 'string') {
			if (config[0] !== '#') {
				config = '#' + config;
			}
			if (typeof _containers[config] !== 'undefined') {
				return {
					'data': _containers[config].data('view.phery'),
					'container': _containers[config],
					'remote': function(url){
						if (url) {
							_containers[config].data('target', url);
						}
						ajax_call.call(_containers[config]);
					}
				}
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
		selector;

		$(document)
		.off('click.view');

		for (_container in config) {
			$container = $(_container);

			if ($container.size() === 1) {
				_bound = _container.replace(/[#\.\s]/g, '');

				if (config[_container] === false) {
					/* Remove the view */

					$container.off('.phery.view');
					$(document).off('click.view.' + _bound);
					debug(['phery.view uninstalled and events unbound', $container], 'config');
					continue;
				}

				if (typeof config[_container]['selector'] === 'string' &&
					/(^|\s)a($|\s|\.)/i.test(config[_container]['selector'])) {
					selector = _container + ' ' + config[_container]['selector'];
				} else {
					selector = 'a[href]:not(.no-phery,[target],[data-remote],[href*=":"],[rel~="nofollow"])';
				}

				selector = selector + ',a[href][rel="' + (_container) + '"]';

				$container.data('view.phery', $.extend(true, {}, config[_container], {
					'selector': selector
				}));

				_containers[_container] = $container;

				$(document)
				.on('click.view.' + _bound, selector, {
					'container': $container
				}, function(e){
					/* Prepare */
					var
					$this = $(this),
					href = $this.attr('href'),
					data = e.data.container.data('view.phery');

					/* Continue as normal for cmd clicks etc */
					if ( e.which == 2 || e.metaKey ) {
						return true;
					}

					if (typeof data['exclude'] !== 'undefined') {
						for (var x = 0; x < data['exclude'].length; x++) {
							switch (typeof data['exclude'][x]) {
								case 'string':
									if (href.indexOf(data['exclude'][x]) !== -1) {
										return true;
									}
									break;
								case 'object':
									if (data['exclude'][x].test(href)) {
										return true;
									}
									break;
								case 'function':
									if (data['exclude'][x].call(e.data.container, href, $this) === true) {
										return true;
									}
							}
						}
					}

					debug([
						'phery.view link clicked, loading content',
						e.data.container,
						$this.attr('href')
					], 'events');

					e.data.container.data('target', $this.attr('href'));

					ajax_call.call(e.data.container, true);

					e.stopPropagation();
					e.preventDefault();
					return false;
				});

				for(var _x in config[_container]) {
					if (config[_container].hasOwnProperty(_x) && typeof _callbacks[_x] !== 'undefined') {
						$container.on('phery:' + (_x) + '.phery.view', config[_container][_x]);
					}
				}

				debug(['phery.view installed', $container], 'config');
			} else {
				debug(['phery.view container', $container, 'isnt unique or does not exist'], 'config');
			}
		}

		return phery;
	};

	$.fn.extend({
		reset: function() {
			return this.each(function() {
				if ($(this).is('form')) {
					this.reset();
				}
			});
		},
		phery: function(name, value) {
			var
				$this = this,
				_out = {
					'exception': function(msg, data){
						triggerPheryEvent($this, 'exception', [msg, data]);
						return $this.phery();
					},
					'remote': function(){
						if ($this.is('form')) {
							return form_submit($this);
						} else {
							return ajax_call.call($this);
						}
					},
					'append_args': function(){
						append_args.apply($this, arguments);
						return $this.phery();
					},
					'set_args': function(){
						set_args.apply($this, arguments);
						return $this.phery();
					},
					'get_args': function(){
						return this.data('args.phery');
					},
					'remove': function(){
						$this.data('temp.phery', true);
						clean_up($this);
					}
				};

			if (name && (name in _out)) {
				return _out[name].apply($this, Array.prototype.slice.call(arguments, 1));
			}
			return _out;
		},
		serializeForm:function(opt) {
			opt = $.extend({}, opt);

			if (typeof opt['disabled'] === 'undefined' || opt['disabled'] === null) {
				opt['disabled'] = false;
			}
			if (typeof opt['all'] === 'undefined' || opt['all'] === null) {
				opt['all'] = false;
			}
			if (typeof opt['empty'] === 'undefined' || opt['empty'] === null) {
				opt['empty'] = true;
			}

			var
			$form = $(this),
			result = {},
			formValues =
			$form
			.find('input,textarea,select,keygen')
			.filter(function(){
				var ret = true;
				if (!opt['disabled']) {
					ret = !this.disabled;
				}
				return ret && $.trim(this.name);
			})
			.map(function(){
				var
				$this = $(this),
				radios,
				options,
				value = null;

				if ($this.is('[type="radio"]') || $this.is('[type="checkbox"]')) {
					if ($this.is('[type="radio"]')) {
						radios = $form.find('[type="radio"][name="' + this.name + '"]');
						if (radios.filter('[checked]').size()) {
							value = radios.filter('[checked]').val();
						}
					} else if ($this.prop('checked')) {
						value = $this.val();
					}
				} else if ($this.is('select')) {
					options = $this.find('option').filter(':selected');
					if($this.prop('multiple')) {
						value = options.map(function() {
							return this.value || this.innerHTML;
						}).get();
					} else {
						value = options.val();
					}
				} else {
					value = $this.val();
				}

				return {
					'name': this.name || null,
					'value': value
				};
			}).get();

			if (formValues) {
				var
				i,
				value,
				name,
				res,
				$matches,
				len,
				j,
				x,
				fields,
				_count = 0,
				last_name,
				strpath;

				var create_obj = function(create_array, res, path) {
					var
					field = fields.shift();

					if (field){
						if (typeof res[field] === "undefined" || !res[field]) {
							res[field] = (create_array?[]:{});
						}
						path.push("['"+field+"']");
						create_obj(create_array, res[field], path);
					} else {
						if (typeof field === 'string') {
							var count = (_count++).toString();

							path.push("['"+(count)+"']");
							if (typeof res[count] === "undefined" || !res[count]) {
								res[count] = {};
							}
							create_obj(create_array, res[count], path);
						}
					}
				};

				for (i = 0; i < formValues.length; i++) {
					name = formValues[i].name;
					value = formValues[i].value;

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

					if (!name) {
						continue;
					}

					$matches = name.split(/\[/);

					len = $matches.length;

					for(j = 1; j < len; j++) {
						$matches[j] = $matches[j].replace(/\]/g, '');
					}

					fields = [];
					strpath = [];

					for(j = 0; j < len; j++) {
						if ($matches[j] || j < len-1) {
							fields.push($matches[j].replace("'", ''));
						}
					}

					if ($matches[len-1] === '') {

						if ($matches[0] !== last_name) {
							last_name = $matches[0];
							_count = 0;
						}

						create_obj(true, result, strpath);

						eval('res=result' + strpath.join('') + ';');

						if(value.constructor === Array) {
							for(x = 0; x < value.length; x++) {
								res.push(value[x]);
							}
						} else {
							res.push(value);
						}
					} else {
						create_obj(false, result, strpath);

						eval('result' + strpath.join('') + '=value;');
					}
				}
			}

			return result;
		}
	});

})(jQuery, window);
