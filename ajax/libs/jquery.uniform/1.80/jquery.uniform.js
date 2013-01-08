/*

Uniform v1.8.0+f
Copyright © 2009 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.3 or newer

Much thanks to Thomas Reynolds and Buck Wilson for their help and advice on
this.

Disabling text selection is made possible by Mathias Bynens
<http://mathiasbynens.be/> and his noSelect plugin.
<http://github.com/mathiasbynens/noSelect-jQuery-Plugin>.

Also, thanks to David Kaneda and Eugene Bond for their contributions to the
plugin.

This version (+f) is from fidian's forked repository until the changes can
get merged upstream.  See https://github.com/fidian/uniform

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Enjoy!

*/
/*global jQuery, window, document*/

(function ($, undef) {
	"use strict";

	$.uniform = {
		// Default options that can be overridden globally or when uniformed
		// globally:  $.uniform.defaults.fileButtonHtml = "Pick A File";
		// on uniform:  $('input').uniform({fileButtonHtml: "Pick a File"});
		defaults: {
			activeClass: "active",
			autoHide: true,
			buttonClass: "button",
			checkboxClass: "checker",
			checkedClass: "checked",
			disabledClass: "disabled",
			fileButtonClass: "action",
			fileButtonHtml: "Choose File",
			fileClass: "uploader",
			fileDefaultHtml: "No file selected",
			filenameClass: "filename",
			focusClass: "focus",
			hoverClass: "hover",
			idPrefix: "uniform",
			radioClass: "radio",
			resetDefaultHtml: "Reset",
			resetSelector: false,  // We'll use our own function when you don't specify one
			selectAutoWidth: false,
			selectClass: "selector",
			submitDefaultHtml: "Submit",  // Only text allowed
			useID: true
		},

		// All uniformed elements - DOM objects
		elements: []
	};

	// Change text into HTML
	function htmlify(text) {
		if (!text) {
			return "";
		}

		return $('<span />').text(text).html();
	}

	// For backwards compatibility with older jQuery libraries
	// Also adds our namespace in one consistent location and shrinks the
	// resulting minified code
	function bindMany($el, events) {
		var name, namespaced;

		for (name in events) {
			if (events.hasOwnProperty(name)) {
				namespaced = name.replace(/ |$/g, ".uniform");
				$el.bind(name, events[name]);
			}
		}
	}

	// Bind hover, active, focus, blur UI updates
	function bindUi($el, $target, options) {
		bindMany($el, {
			focus: function () {
				$target.addClass(options.focusClass);
			},
			blur: function () {
				$target.removeClass(options.focusClass);
				$target.removeClass(options.activeClass);
			},
			mouseenter: function () {
				$target.addClass(options.hoverClass);
			},
			mouseleave: function () {
				$target.removeClass(options.hoverClass);
				$target.removeClass(options.activeClass);
			},
			"mousedown touchbegin": function () {
				if (!$el.is(":disabled")) {
					$target.addClass(options.activeClass);
				}
			},
			"mouseup touchend": function () {
				$target.removeClass(options.activeClass);
			}
		});
	}

	// Test if the element is a multiselect
	function isMultiselect($el) {
		var elSize;

		if ($el[0].multiple) {
			return true;
		}

		elSize = $el.attr("size");

		if (elSize === undef || elSize <= 1) {
			return false;
		}

		return true;
	}

	// Update the filename tag based on $el's value
	function setFilename($el, $filenameTag, options) {
		var filename = $el.val();

		if (filename === "") {
			filename = options.fileDefaultHtml;
		} else {
			filename = filename.split(/[\/\\]+/);
			filename = filename[(filename.length - 1)];
		}

		$filenameTag.text(filename);
	}

	function classClearStandard($el, options) {
		$el.removeClass(options.hoverClass + " " + options.focusClass + " " + options.activeClass);
	}

	function classToggle($el, className, enabled) {
		if (enabled) {
			$el.addClass(className);
		} else {
			$el.removeClass(className);
		}
	}

	function classToggleChecked($tag, $el, options) {
		var isChecked = $el.is(":checked");

		if ($el.prop) {
			// jQuery 1.6+
			$el.prop("checked", isChecked);
		} else {
			// jQuery 1.5 and below
			if (isChecked) {
				$el.attr("checked", "checked");
			} else {
				$el.removeAttr("checked");
			}
		}

		classToggle($tag, options.checkedClass, isChecked);
	}

	function classToggleDisabled($tag, $el, options) {
		classToggle($tag, options.disabledClass, $el.is(":disabled"));
	}

	function divSpanWrap($el, $container, method) {
		switch (method) {
		case "after":
			$el.after($container);
			return $el.next();
		case "before":
			$el.before($container);
			return $el.prev();
		case "wrap":
			$el.wrap($container);
			return $el.parent();
		}

		return null;
	}

	function divSpan($el, options, divSpanConfig) {
		var $div, $span;

		if (!divSpanConfig) {
			divSpanConfig = {};
		}

		divSpanConfig = $.extend({
			bind: {},
			css: null,
			divClass: null,
			divWrap: "wrap",
			spanClass: null,
			spanHtml: null,
			spanWrap: "wrap"
		}, divSpanConfig);

		$div = $('<div />');
		$span = $('<span />');

		if (options.autoHide && !($el.is(':visible'))) {
			$div.hide();
		}

		if (divSpanConfig.divClass) {
			$div.addClass(divSpanConfig.divClass);
		}

		if (divSpanConfig.spanClass) {
			$span.addClass(divSpanConfig.spanClass);
		}

		if (options.useID && $el.attr('id')) {
			$div.attr('id', options.idPrefix + '-' + $el.attr('id'));
		}

		if (divSpanConfig.spanHtml) {
			$span.html(divSpanConfig.spanHtml);
		}

		$div = divSpanWrap($el, $div, divSpanConfig.divWrap);
		$span = divSpanWrap($el, $span, divSpanConfig.spanWrap);

		if (divSpanConfig.css) {
			$el.css(divSpanConfig.css);
		}

		classToggleDisabled($div, $el, options);
		return {
			div: $div,
			span: $span
		};
	}

	var allowStyling = true,
		uniformHandlers = [
			{
				// Buttons
				match: function ($el) {
					return $el.is("button, :submit, :reset, a, input[type='button']");
				},
				apply: function ($el, options) {
					var $div, spanHtml, ds;
					spanHtml = options.submitDefaultHtml;

					if ($el.is(":reset")) {
						spanHtml = options.resetDefaultHtml;
					}

					if ($el.is("a, button")) {
						spanHtml = $el.html() || spanHtml;
					} else if ($el.is(":submit, :reset, input[type=button]")) {
						spanHtml = htmlify($el.attr("value")) || spanHtml;
					}

					ds = divSpan($el, options, {
						css: { display: "none" },
						divClass: options.buttonClass,
						spanHtml: spanHtml
					});
					$div = ds.div;
					bindUi($el, $div, options);
					bindMany($div, {
						"click touchend": function (e) {
							var ev;

							if ($(e.target).is("span, div")) {
								if ($el[0].dispatchEvent) {
									ev = document.createEvent("MouseEvents");
									ev.initEvent("click", true, true);
									$el[0].dispatchEvent(ev);
								} else {
									$el.click();
								}
							}
						}
					});
					$.uniform.noSelect($div);
					return {
						remove: function () {
							return $el.unwrap().unwrap();
						},
						update: function () {
							classClearStandard($div, options);
							classToggleDisabled($div, $el, options);
						}
					};
				}
			},
			{
				// Checkboxes
				match: function ($el) {
					return $el.is(":checkbox");
				},
				apply: function ($el, options) {
					var ds, $div, $span;
					ds = divSpan($el, options, {
						css: { opacity: 0 },
						divClass: options.checkboxClass
					});
					$div = ds.div;
					$span = ds.span;

					// Add focus classes, toggling, active, etc.
					bindUi($el, $div, options);
					bindMany($el, {
						"click touchend": function () {
							classToggleChecked($span, $el, options);
						}
					});
					classToggleChecked($span, $el, options);
					return {
						remove: function () {
							return $el.unwrap().unwrap();
						},
						update: function () {
							classClearStandard($div, options);
							$span.removeClass(options.checkedClass);
							classToggleChecked($span, $el, options);
							classToggleDisabled($div, $el, options);
						}
					};
				}
			},
			{
				// File selection / uploads
				match: function ($el) {
					return $el.is(":file");
				},
				apply: function ($el, options) {
					var ds, $div, $filename, $button;

					// The "span" is the button
					ds = divSpan($el, options, {
						css: { opacity: 0 },
						divClass: options.fileClass,
						spanClass: options.fileButtonClass,
						spanHtml: options.fileButtonHtml,
						spanWrap: "after"
					});
					$div = ds.div;
					$button = ds.span;
					$filename = $("<span />").html(options.fileDefaultHtml);
					$filename.addClass(options.filenameClass);
					$filename = divSpanWrap($el, $filename, "after");

					// Set the size
					if (!$el.attr("size")) {
						$el.attr("size", $div.width() / 10);
					}

					// Actions
					function filenameUpdate() {
						setFilename($el, $filename, options);
					}

					bindUi($el, $div, options);

					// Account for input saved across refreshes
					filenameUpdate();

					// IE7 doesn't fire onChange until blur or second fire.
					if ($.browser.msie) {
						// IE considers browser chrome blocking I/O, so it
						// suspends tiemouts until after the file has
						// been selected.
						bindMany($el, {
							click: function () {
								$el.trigger("change");
								setTimeout(filenameUpdate, 0);
							}
						});
					} else {
						// All other browsers behave properly
						bindMany($el, {
							change: filenameUpdate
						});
					}

					$.uniform.noSelect($filename);
					$.uniform.noSelect($button);

					return {
						remove: function () {
							// Remove sibling spans
							$el.siblings("span").remove();

							// Unwrap parent div
							$el.unwrap();
							return $el;
						},
						update: function () {
							classClearStandard($div, options);
							setFilename($el, $filename, options);
							classToggleDisabled($div, $el, options);
						}
					};
				}
			},
			{
				// Input fields (text)
				match: function ($el) {
					if ($el.is("input")) {
						var t = $el.attr("type").toLowerCase(),
							allowed = " color date datetime datetime-local email month number password search tel text time url week ";
						return allowed.indexOf(" " + t + " ") >= 0;
					}

					return false;
				},
				apply: function ($el) {
					var elType = $el.attr("type");
					$el.addClass(elType);
					return {
						remove: function () {
							$el.removeClass(elType);
						},
						update: function () {
						}
					};
				}
			},
			{
				// Radio buttons
				match: function ($el) {
					return $el.is(":radio");
				},
				apply: function ($el, options) {
					var ds, $div, $span;
					ds = divSpan($el, options, {
						css: { opacity: 0 },
						divClass: options.radioClass
					});
					$div = ds.div;
					$span = ds.span;

					// Add classes for focus, hanlde active, checked
					bindUi($el, $div, options);
					bindMany($el, {
						"click touchend": function () {
							// Deselect the rest of the radios
							var radioClass = options.radioClass.split(" ")[0],
								otherRadioSpans = "." + radioClass + " span." + options.checkedClass + ":has([name='" + $el.attr("name") + "'])";
							$(otherRadioSpans).each(function () {
								var $spanTag = $(this),
									$el = $spanTag.find(":radio");
								classToggleChecked($spanTag, $el, options);
							});

							// Select me
							classToggleChecked($span, $el, options);
						}
					});
					classToggleChecked($span, $el, options);
					return {
						remove: function () {
							// Unwrap from span and div
							return $el.unwrap().unwrap();
						},
						update: function () {
							classClearStandard($div, options);
							classToggleChecked($span, $el, options);
							classToggleDisabled($div, $el, options);
						}
					};
				}
			},
			{
				// Select lists, but do not style multiselects
				match: function ($el) {
					var elSize;

					if ($el.is("select") && !isMultiselect($el)) {
						return true;
					}

					return false;
				},
				apply: function ($el, options) {
					var ds, $div, $span, origElemWidth, px;
					origElemWidth = $el.width();
					ds = divSpan($el, options, {
						css: {
							opacity: 0,
							// The next two need some review
							left: "2px",
							width: (origElemWidth + 32) + "px"
						},
						divClass: options.selectClass,
						spanHtml: ($el.find(":selected:first") || $el.find("option:first")).html(),
						spanWrap: "before"
					});
					$div = ds.div;
					$span = ds.span;

					if (options.selectAutoWidth) {
						// This needs some critical review
						$div.width($("<div />").width() - $("<span />").width() + origElemWidth + 25);
						px = parseInt($div.css("paddingLeft"), 10);
						$span.width(origElemWidth - px - 15);
						$el.width(origElemWidth + px);
						$el.css("min-width", origElemWidth + px + "px");
						$div.width(origElemWidth + px);
					} else {
						// Set the width of select behavior
						px = $el.width();
						$div.width(px);
						$span.width(px - 25);
					}

					bindUi($el, $div, options);
					bindMany($el, {
						change: function () {
							$span.html($el.find(":selected").html());
							$div.removeClass(options.activeClass);
						},
						"click touchend": function () {
							// IE7 and IE8 may not update the value right
							// until click - issue #238
							var selHtml = $el.find(":selected").html();

							if ($span.html() !== selHtml) {
								// Change was detected
								// Fire the change event on the select tag
								$el.trigger('change');
							}
						},
						keyup: function () {
							$span.html($el.find(":selected").html());
						}
					});
					$.uniform.noSelect($span);
					return {
						remove: function () {
							// Remove sibling span
							$el.siblings("span").remove();

							// Unwrap parent div
							$el.unwrap();
							return $el;
						},
						update: function () {
							classClearStandard($div, options);

							// Reset current selected text
							$span.html($el.find(":selected").html());
							classToggleDisabled($div, $el, options);
						}
					};
				}
			},
			{
				// Select lists - multiselect lists only
				match: function ($el) {
					var elSize;

					if ($el.is("select") && isMultiselect($el)) {
						return true;
					}

					return false;
				},
				apply: function ($el) {
					$el.addClass("uniform-multiselect");
					return {
						remove: function () {
							$el.removeClass("uniform-multiselect");
						},
						update: function () {
						}
					};
				}
			},
			{
				// Textareas
				match: function ($el) {
					return $el.is("textarea");
				},
				apply: function ($el) {
					$el.addClass("uniform");
					return {
						remove: function () {
							$el.removeClass("uniform");
						},
						update: function () {
						}
					};
				}
			}
		];

	// IE6 can't be styled - can't set opacity on select
	if ($.browser.msie && $.browser.version < 7) {
		allowStyling = false;
	}

	$.fn.uniform = function (options) {
		var el = this;
		options = $.extend({}, $.uniform.defaults, options);

		// Code for specifying a reset button
		if (options.resetSelector !== false) {
			$(options.resetSelector).mouseup(function () {
				window.setTimeout(function () {
					$.uniform.update(el);
				}, 10);
			});
		}

		return this.each(function () {
			var $el = $(this), i, handler, callbacks;

			// Avoid uniforming elements already uniformed - just update
			if ($el.data("uniformed")) {
				$.uniform.update($el);
			}

			// Avoid uniforming browsers that don't work right
			if ($el.data("uniformed") || !allowStyling) {
				return;
			}

			for (i = 0; i < uniformHandlers.length; i = i + 1) {
				handler = uniformHandlers[i];

				if (handler.match($el, options)) {
					callbacks = handler.apply($el, options);

					// Mark the element as uniformed and save options
					$el.data("uniformed", callbacks);

					// Store element in our global array
					$.uniform.elements.push($el.get(0));
					return;
				}
			}
		});
	};

	$.uniform.restore = function (elem) {
		if (elem === undef) {
			elem = $.uniform.elements;
		}

		$(elem).each(function () {
			var $el = $(this), index, elementData;
			elementData = $el.data("uniformed");

			// Skip elements that are not uniformed
			if (!elementData) {
				return;
			}

			// Unbind events, remove additional markup that was added
			elementData.remove();
			$el.unbind(".uniform");

			// Remove item from list of uniformed elements
			index = $.inArray(this, $.uniform.elements);

			if (index >= 0) {
				$.uniform.elements.splice(index, 1);
			}

			$el.removeData("uniformed");
		});
	};

	// noSelect v1.0
	$.uniform.noSelect = function (elem) {
		function f() {
			return false;
		}

		$(elem).each(function () {
			this.onselectstart = this.ondragstart = f; // Webkit & IE

			// .mousedown() for Webkit and Opera
			// .css for Firefox
			$(this).mousedown(f).css({
				MozUserSelect: "none"
			});
		});
	};

	$.uniform.update = function (elem) {
		if (elem === undef) {
			elem = $.uniform.elements;
		}

		$(elem).each(function () {
			var $el = $(this), elementData;
			elementData = $el.data("uniformed");

			// Skip elements that are not uniformed
			if (!elementData) {
				return;
			}

			elementData.update($el, elementData.options);
		});
	};
}(jQuery));
