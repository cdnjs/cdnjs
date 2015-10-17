/** @preserve Copyright © 2013, Itinken Limited.
 * MIT Licence */
/*
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * See (http://jquery.com/).
 * @name jQuery
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http://jquery.com/)
 * @name fn
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf jQuery
 */

//noinspection JSUnnecessarySemicolon
;
//noinspection JSUnusedLocalSymbols
(function ($, window, document, undefined) {
	'use strict';
	var pluginName = "jinplace";

	/**
	 * @typedef {object} Options
	 * @class Options
	 * @property {!string} type - The type of field. Defaults to 'input'
	 * @property {string} url - The url to submit to. Defaults to same page
	 * @property {string} data - Text or JSON data as initial editing text
	 * @property {string} loadurl - The URL to load content for editing
	 * @property {string} elementId - The ID of the element
	 * @property {string} object - A name to pass back on submit
	 * @property {string} attribute - Another name to pass back on submit
	 * @property {string} okButton - Create a submit button with this name
	 * @property {string} cancelButton - Create a cancel button with this name
	 * @property {string} inputClass - A css class that is added to the input field
	 * @property {jQuery|string} activator - Object (or css selector) for object to activate editing. Defaults to the element itself.
	 * @property {boolean} textOnly - When true (the default) text returned from server is displayed literally and not as html.
	 * @property {string} placeholder - Text to display in empty elements.
	 * @property {submitFunction} submitFunction - Function that is called to submit the new value.
	 * @property {loadFunction} loadFunction - Function that is called to load the editing data
	 */

	var option_list = ['type',
		'url',
		'data',
		'loadurl',
		'elementId',
		'object',
		'attribute',
		'okButton',
		'cancelButton',
		'inputClass',
		'activator',
		'textOnly',
		'placeholder',
		'submitFunction'
	];

	// Pairs of settings new,old.  We look for the old name and set the new.
	var fallbacks = [
		['placeholder', 'nil']  // will be removed at v1.0
	];

	/**
	 * The actual constructor of the JinPlace object.
	 *
	 * @class jinplace
	 * @memberOf jQuery.fn
	 * @constructor
	 *
	 * @property {jQuery} element - The element containing plain text to be edited.
	 * @property {Options} opts - The final set of options.
	 */
	function JinPlace(element, options) {
		var $el = this.element = $(element); // The editable element (often a span or div).

		if (options) {
			$.each(fallbacks, function (index, newold) {
				var new_name = newold[0];
				options[new_name] = options[new_name] || options[newold[1]];
			});
		}

		var elementOptions = this.elementOptions($el);

		var act = elementOptions.activator || element;
		elementOptions.activator = $(act);

		// So we have 1) options defined in defaults, 2) passed into the plugin, 3) set
		// on the element. Combine all these together.
		var opts = $.extend({},
				$.fn[pluginName].defaults,
				options,
				elementOptions);

		this.opts = opts;

		this.bindElement(opts);
	}

	JinPlace.prototype = {

		/**
		 * Get the options that are set on the editable element with the data-* attributes.
		 *
		 * @param {jQuery} $el The element that is being made editable.
		 */
		elementOptions: function ($el) {
			var opts = {};
			function upperToHyphenLower(match) {
				return '-' + match.toLowerCase();
			}

			function make_attr_name(value) {
				return "data-" + value.replace(/[A-Z]/g, upperToHyphenLower);
			}

			$.each(option_list, function(index, value) {
				opts[value] = $el.attr(make_attr_name(value));
			});

			opts.elementId = $el.attr('id');

			$.each(fallbacks, function (index, newold) {
				var new_name = newold[0];
				opts[new_name] = opts[new_name] || $el.attr(make_attr_name(newold[1]));
			});

			if (opts.textOnly)
				opts.textOnly = opts.textOnly !== 'false';

			return opts;
		},

		/**
		 * Prepare the activator element to receive click events.
		 *
		 * This involves setting placeholder text if the element is empty.
		 *
		 * @param {Options} opts - The editor options.
		 */
		bindElement: function(opts) {
			// Remove any existing handler we set and bind to the activation click handler.
			opts.activator
					.off('click.jip')
					.on('click.jip', $.proxy(this.clickHandler, this));

			// If there is no content, then we replace it with the empty indicator.
			var $el = this.element;
			if ($.trim($el.html()) == "")
				$el.html(opts.placeholder);
		},

		/**
		 * Handle a click that is activating the element.  This click can be on any element
		 * so is not directly useful.  Things are always set up so that 'this' is this object
		 * and not the element that the click occurred on.
		 *
		 * @this {JinPlace}
		 * @param ev The event.
		 */
		clickHandler: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			// Turn off the activation handler, and disable any effect in case the activator
			// was a button that might submit.
			$(ev.currentTarget)
					.off('click.jip')
					.on('click.jip', function(ev) {
						ev.preventDefault();
					});

			var self = this,
					opts = self.opts;

			/** A new editor is created for every activation. So it is OK to keep instance
			 * data on it.
			 * @type {editorBase}
			 */
			var editor = $.extend({}, editorBase, $.fn[pluginName].editors[opts.type]);

			// Save original for use when cancelling.
			self.origValue = self.element.html();

			self.fetchData(opts).done(function(data) {

				var field = editor.makeField(self.element, data);
				if (!editor.inputField)
					editor.inputField = field;
				field.addClass(opts.inputClass);

				var form = createForm(opts, field, editor.buttonsAllowed);

				// Add the form to the element to be edited
				self.element.html(form);

				// Now we can setup handlers and focus or otherwise activate the field.

				form
						.on("jip:submit submit", function(ev) {
							self.submit(editor, opts);
							return false;
						})
						.on("jip:cancel", function(ev) {
							self.cancel(editor);
							return false;
						})
						.on("keyup", function(ev) {
							if (ev.keyCode == 27) {
								self.cancel(editor);
							}
						});

				editor.activate(form, field);

				// The action to take on blur can be set on the editor.  If not, and there
				// are automatically added buttons, then the blur action is set according to
				// which ones exist. By default nothing happens on blur.
				var act = editor.blurAction || (
						(!opts.okButton)? 'submit':
								(!opts.cancelButton)? 'jip:cancel':
										undefined);
				editor.blurEvent(field, form, act);
			});
		},

		/**
		 * Fetch the data that will be placed into the editing control.  The data is
		 * obtained from the following sources in this order:
		 * 1. data-data (or options.data)
		 * 2. data-loadurl (or options.loadurl) a request is made to the given url and the
		 *    resulting data is used.
		 * 3. The existing contents of 'element'.
		 *
		 * @param {Options} opts
		 */
		fetchData: function(opts) {
			var data;
			if (opts.data) {
				data = opts.data;

			} else if (opts.loadurl) {
				data = opts.loadFunction(opts);
			} else {
				data = $.trim(this.element.html());
			}

			var placeholderFilter = function (data) {
				if (data == opts.placeholder)
					return '';
				return data;
			};

			var when = $.when(data);
			if (when.pipe) {
				return when.pipe(placeholderFilter);
			} else {
				return when.then(placeholderFilter);
			}
		},

		/**
		 * Throw away any edits and return the element to its original text.
		 *
		 * @param {editorBase} editor The element editor.
		 * @return {void}
		 */
		cancel: function(editor) {
			var self = this;
			self.element.html(self.origValue);

			editor.finish();

			// Rebind the element for the next time
			self.bindElement(self.opts);
		},

		/**
		 * Called to submit the changed data to the server.
		 *
		 * This method is always called with 'this' set to this object.
		 *
		 * @this {JinPlace}
		 * @param {editorBase} editor
         * @param {Options} opts
		 */
		submit: function (editor, opts) {
			var self = this;
			var rval;
			var rejected = $.Deferred().reject();

			// Since the function is user defined protect against exceptions and
			// returning nothing. Either problem causes the edit to be cancelled.
			// Of course it is possible that some action has been taken depending
			// on why the exception was thrown, but there is no way to know that.
			try {
				rval = opts.submitFunction.call(undefined, opts, editor.value());
				if (rval === undefined)
					rval = rejected;
			} catch (e) {
				rval = rejected;
			}

			$.when(rval)
					.done(function(data) {
						self.onUpdate(editor, opts, data);
					})
					.fail(function() {
						self.cancel(editor);
					});
		},

		/**
		 * The server has received our data and replied successfully and the new data to
		 * be displayed is available.
		 *
		 * @param {editorBase} editor The element editor.
		 * @param {Options} opts The element options.
		 * @param {string} data The data to display from the server.
		 */
		onUpdate: function(editor, opts, data) {
			var self = this;
			self.setContent(editor.displayValue(data));
			editor.finish();
			self.bindElement(opts);
		},

		/**
		 * Set the content of the element.  Called to update the value from the value
		 * returned by the server.
		 *
		 * @param data The data to be displayed, it has been converted to the display format.
		 */
		setContent: function(data) {
			var element = this.element;

			if (!data)
				data = this.opts.placeholder;

			if (this.opts.textOnly) {
				element.text(data);
			} else {
				element.html(data);
			}
		}

	};

	/**
	 * Get the parameters that will be sent in the ajax call to the server.
	 * Called for both the url and loadurl cases.
	 *
	 * @param {Options} opts The options from the element and config settings.
	 * @param {*=} [value] The value of the control as returned by editor.value().
	 * @returns {object}
	 */
	var requestParams = function (opts, value) {
		var params = {
			"id": opts.elementId,
			"object": opts.object,
			attribute: opts.attribute
		};

		if ($.isPlainObject(value)) {
			$.extend(params, value);
		} else if (value !== undefined) {
			params.value = value;
		}

		return params;
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new JinPlace(this, options));
			}
		});
	};

	/** These are the plugin defaults. You can override these if required.
	 * @type {Options}
	 */
	$.fn[pluginName].defaults = {
		url: document.location.pathname,
		type: "input",
		textOnly: 2,
		placeholder: '[ --- ]',

		/**
		 * @name Options.submitFunction
		 *
		 * The function to call when an editor form is submitted. This can be supplied as an
		 * option to completely change the default action.
		 *
		 * @callback submitFunction
		 * @param {Options} opts The options for this element.
		 * @param {string} value The value that was submitted.
		 * @returns {string|object} Returns a string which will be used to populate the element text or
		 * a promise that will resolve to a string.
		 */
		submitFunction: function(opts, value) {
			return $.ajax(opts.url, {
				type: "post",
				data: requestParams(opts, value),
				dataType: 'text',

				// iOS 6 has a dreadful bug where POST requests are not sent to the
				// server if they are in the cache.
				headers: {'Cache-Control': 'no-cache'} // Apple!
			});
		},

		/**
		 * @name Options.loadFunction
		 *
		 * @callback loadFunction
		 * @param {Options} opts
		 * @returns {string}
		 */
		loadFunction: function(opts) {
			return $.ajax(opts.loadurl, {
				data: requestParams(opts)
			});
		}
	};

	/**
	 * Create a form for the editing area.  The input element is added and if buttons
	 * are required then they are added. Event handlers are set up.
	 *
	 * @param {Options} opts The options for this editor.
	 * @param {jQuery} inputField The newly created input field.
	 * @param {boolean} [buttons] True if buttons can be added.  Whether buttons really are added
	 * depends on the options and data-* attributes.
	 * @returns {jQuery} The newly created form element.
	 */
	var createForm = function (opts, inputField, buttons) {
		var form = $("<form>")
				.attr("style", "display: inline;")
				.attr("action", "javascript:void(0);")
				.append(inputField);

		if (buttons)
			addButtons(form, opts);

		return form;
	};

	/**
	 * Add any requested buttons to the output.
	 *
	 * @param {jQuery} form The form that is being created.
	 * @param {Options} opts The options set for this editor.
	 */
	var addButtons = function (form, opts) {
		var setHandler = function (button, action) {
			form.append(button);
			button.one('click', function(ev) {
				ev.stopPropagation();
				form.trigger(action);
			});
		};

		var ok = opts.okButton;
		if (ok) {
			var $button = $("<input>").attr("type", "button").attr("value", ok)
					.addClass('jip-button jip-ok-button');
			setHandler($button, 'submit');
		}

		var cancel = opts.cancelButton;
		if (cancel) {
			$button = $("<input>").attr("type", "button").attr("value", cancel)
					.addClass('jip-button jip-cancel-button');
			setHandler($button, 'jip:cancel');
		}
	};

	//noinspection UnnecessaryLocalVariableJS
	/**
	 * This is the interface of an editor function. Plugins need only redefine the methods
	 * or data that are appropriate.
	 * @class
	 */
	var editorBase = {
		/**
		 * Are we allowed to automatically add buttons to the form. Set this to
		 * true for a text input where it might make sense.  They are only added
		 * if the user asks for them in any case.
		 *
		 * @name editorBase.buttonsAllowed,
		 * @type {boolean}
		 */

		/**
		 * The input field returned by makeField() will be saved as this.inputField unless
		 * it is set within the makeField() method itself.
		 *
		 * @name editorBase.inputField
		 * @type {jQuery}
		 */

		/**
		 * Set up default blur handlers to cause the given action of 'submit' or 'cancel'.
		 * If the default mechanism is not appropriate, then define this with the value 'ignore'
		 * and no default processing will be provided and you must set it up yourself if you
		 * want any action on blur.
		 *
		 * @name editorBase.blurAction
		 * @type {string}
		 */

		/**
		 * Make the editing field that will be added to the form. Editing field is
		 * a general term; it could be a complex control or just a plain <input>.
		 *
		 * You may set this.inputField within the body of this method, if you do
		 * not then it will be set to the value you return.
		 *
		 * @param {jQuery} element The original element that we are going to edit.
		 * @param {string|Object} data The initial data that should be used to initialise the
		 * field.  For text inputs this will be just text, but for other types of
		 * input it may be an object specific to that field.
		 * @returns {jQuery} The new field wrapped in a jquery object.
		 */
		makeField: function (element, data) {
			// This is an implementation for <input type="text">. You would almost
			// always need to override this.
			return $("<input>")
					.attr("type", "text")
					.val(data);
		},

		/**
		 * Activate the field. It is now part of the document.
		 *
		 * Set up events as required.  You should ensure that the events 'jip:submit' or
		 * 'jip:cancel' are triggered on the form to submit the field or to cancel the
		 * edit as appropriate.
		 *
		 * You can use 'submit' instead of 'jip:submit' to take advantage of standard
		 * form processing.
		 *
		 * The default implementation is only useful for straight-forward text inputs.
		 *
		 * @param {jQuery} form The form your editor is contained in. If you want to avoid
		 * events bubbling up, you can stop them here.
		 * @param {jQuery} field The editing field.  Passed as a convenience so we don't have
		 * to save it.
		 */
		activate: function (form, field) {
			field.focus();
		},

		/**
		 * The value of the editor. This is the value returned by the input field
		 * or component that should be sent to the server.
		 *
		 * The default implementation just calls .val() on the inputField.
		 *
		 * @returns {string} The value that should be submitted to the server for this editor.
		 */
		value: function () {
			return this.inputField.val();
		},

		/**
		 * We are just about to remove the edit control and we have data returned from
		 * the server. This method converts the server form of the data into the on page
		 * value.
		 *
		 * The default implementation returns the data unchanged, which is suitable
		 * for a text input.
		 *
		 * For a select list, you might have [['1', 'blue'], ['2', 'green']]; if the server
		 * returns '2', then you return 'green' from this method.
		 *
		 * @param {string} data The data as returned by the server which is to be used to populate
		 * the page after the edit control is removed. A string, but could be a JSON string.
		 * @returns {string} The data modified in any way that is appropriate.
		 */
		displayValue: function (data) {
			return data;
		},

		/**
		 * This is not a method to be overridden. Used to set up blur event handlers
		 * when you want the blur to be cancelled if there is a click on the control
		 * or any of its components as will usually be the case.
		 *
		 * @param {jQuery} blurElement This is the element to set the blur handler on.
		 * @param {jQuery} cancelElement These elements will cancel the blur action when clicked.
		 * @param {string} action The action to take on blur. This will be 'submit' or 'jip:cancel'.
		 * Can be set to 'ignore' to ensure that it is ignored and default values do not
		 * get used.
		 */
		blurEvent: function (blurElement, cancelElement, action) {
			if (!action || action == 'ignore') return;

			var onBlur = function (ev) {
				var t = setTimeout(function () {
					blurElement.trigger(action);
				}, 300);

				// If a click occurs on these elements, then the blur is cancelled.
				cancelElement.on('click', function () {
					clearTimeout(t);
				});
			};

			// Set the handler to our wrapper.
			blurElement.on('blur', onBlur);
		},

		/**
		 * This is guaranteed to be called after editing is complete and before the element
		 * is rebound.
		 *
		 * @type {function}
		 * @return {void}
		 */
		finish: function() {}
	};

	// The base implementation that can be extended. This is normally handled automatically.
	$.fn[pluginName].editorBase = editorBase;


	/** The field editors can be overridden or added to
	 *
	 * @type {Object.<string, editorBase>}
	 */
	$.fn[pluginName].editors = {

		/**
		 * A regular text input field.  All methods inherit from the base 'class'.
		 */
		input: {
			buttonsAllowed: true
		},

		/*
		 * A multi-line text area field.
		 */
		textarea: {
			buttonsAllowed: true,

			makeField: function (element, data) {
				/**
				 * Textarea jQuery object.
				 * @property {function=} elastic - set if elastic plugin is installed.
				 */
				var field = $("<textarea>")
						.css({
							'min-width': element.width(),
							'min-height': element.height()
						})
						.val(data);


				if (field.elastic)
					field.elastic();

				return field;
			}
		},

		/*
		 * A selection.  This is slightly more complex as we have to pass in the possible
		 * values so that one can be selected.
		 */
		select: {
			makeField: function (element, data) {
				var field = $("<select>"),
						choices = $.parseJSON(data);

				var selected = false;
				var elementChoice = null;
				$.each(choices, function(index, value) {
					var opt = $("<option>").val(value[0]).html(value[1]);
					if (value[2]) {
						opt.attr("selected", "1");
						selected = true;
					}
					if (value[1] == element.text())
						elementChoice = opt;
					field.append(opt);
				});

				// If we didn't get any indication of the selected element from the
				// given data, then use the match we found with the element text.
				if (!selected && elementChoice)
					elementChoice.attr("selected", "1");

				// Save the choices so we can decode the response.
				this.choices = choices;

				return field;
			},

			activate: function(form, field) {
				field.focus();
				field.on('change', function() {
					field.trigger('jip:submit');
				});
			},

			displayValue: function(data) {
				var display = '';
				$.each(this.choices, function(index, value) {
					if (data == value[0]) {
						display = value[1];
						return false;
					}
					return true;
				});
				return display;
			}
		}
	};
})(jQuery, window, document);

