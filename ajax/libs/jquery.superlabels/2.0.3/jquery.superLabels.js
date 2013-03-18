/*global console */
/*!
 *	Title: jQuery Super Labels Plugin - Give your forms a helping of awesome!
 *	Author: Rémy Bach
 *	Version: 2.0.3
 *	License: http://remybach.mit-license.org
 *	Url: http://github.com/remybach/jQuery.superLabels
 *	Description:
 *	This plugin allows you to display your form labels on top of your form fields, saving you space on your page.
 */
;(function($) {
	'use strict';

	var defaults = {
			autoCharLimit:false, // Whether to automatically attempt to determine the number of characters after which to fade the label out or not.
			baseZindex:0, // The base z-index which we display on top of.
			/* nominify */
			debug:false,
			/* /nominify */
			duration:500, // Time of the slide in milliseconds.
			easingIn:($.easing && $.easing.def ? 'easeInOutCubic' : false), // The easing in function to use for the slide.
			easingOut:($.easing && $.easing.def ? 'easeInOutCubic' : false), // The easing out function to use for the slide.
			fadeDuration:250, // Duration of animation when it's fade only.
			labelLeft:0, // The distance from the left for the label.
			labelTop:0, // The distance from the top for the label.
			noAnimate:false, // Whether or not to animate (slide and fade) the label. If true, we'll just hide it.
			opacity:0.5, // The opacity to fade the label to.
			slide:true, // Whether or not to slide the label across the input field.
			wrapSelector:false // The selector for the element you have wrapping each field.
		},
		acceptedInputTypes = ['text', 'search', 'url', 'tel', 'email', 'password', 'number'],
		acceptedElements = ['input', 'textarea', 'select'],

		// Function declarations
		_getLabel, _prepLabel, _focus, _blur, _keyup, _noVal, _withinCharLimit, _approximateChars/* nominify */,_log, _info, _error/* /nominify */;

	$.fn.superLabels = function(options) {
		var _fields = [],
			_newDefaults;

		// If this has been run on an empty set of elements, pop out.
		if (this.length === 0) { return false; }

		// Remove any NaNs from the positions (if present)
		if (options && options.labelLeft && isNaN(options.labelLeft)) {
			options.labelLeft = Number(options.labelLeft.replace(/\D+/, ''));
		}
		if (options && options.labelTop && isNaN(options.labelTop)) {
			options.labelTop = Number(options.labelTop.replace(/\D+/, ''));
		}

		// Make a copy of the defaults.
		_newDefaults = $.extend({}, defaults);
		// If options were passed in, merge them with the defaults.
		//	Store them on each element so that they don't get overwritten by subsequent calls
		// 	to superLabels.
		$(this).data('slDefaults', $.extend(_newDefaults, options || {})).addClass('sl-defaults');

		/* nominify */
		if (!$.easing.def) { _info('Easing plugin not found - using standard jQuery animations.'); }
		/* /nominify */

		// Check for whether the user has just passed in the form. If so, we need to fetch all the accepted fields.
		if (this.length === 1 && /form/i.test(this[0].tagName)) {
			_fields = $(acceptedElements.join(','), this);
		} else if (this.length > 1) { // we need to extrapolate these fields
			this.each(function() {
				if (/form/i.test(this.tagName)) { // if this is a form merge the accepted elements into the _fields array.
					$.merge(_fields, $(acceptedElements.join(','), this));
				} else {
					// This is a normal field, so just dump this one in.
					_fields.push(this);
				}
			});
		} else { // If all else fails, assume the user passed in the fields individually
			_fields = this;
		}

		// Do our magic on each form field.
		return $(_fields).each(function() {
			var _field = $(this),
				_label,
				_placeholder = _field.attr('placeholder'),
				_placeholderLabel;

			// Don't even bother going further if this isn't one of the accepted input field types or elements.
			if ((_field[0].tagName.toLowerCase() === 'input' && $.inArray(_field.attr('type'), acceptedInputTypes)) === -1 && $.inArray(_field[0].tagName.toLowerCase(), acceptedElements) !== -1) {
				/* nominify */
				_info('Doh! The following '+this.tagName.toLowerCase()+', is not supported.', this);
				/* /nominify */
				return true; // Equivalent to continue in a normal for loop.
			}

			// Get the label associated to this field.
			_label = _getLabel(this);

			// If there's a placeholder
			if (_placeholder) {
				// but NO label, make a label using the placeholder
				if (_label.length === 0) {
					_placeholderLabel = '<label for="'+(_field.attr('id') || _field.attr('name'))+'">'+_placeholder+'</label>';
					_placeholderLabel+= '</label>';
					_placeholderLabel = $(_placeholderLabel);

					// If there isn't a label for this field, create one, otherwise replace the existing one with the placeholder one.
					_label = _placeholderLabel;
					_field.before(_label);
				} else {
					// Otherwise, just give the label a title with the placeholder
					_label.attr('title', _placeholder);
				}
				_field.removeAttr('placeholder');
			}

			// Make sure this form field has a label
			if (_label.length === 0) {
				/* nominify */
				_info('Doh! The following '+this.tagName.toLowerCase()+' has no related label.', this);
				/* /nominify */
				return true;
			}

			// Position the labels above the form fields. Note:We do this here and not in the CSS for the purposes of progressive enhancement.
			_prepLabel(_field, _label);

			// Select boxes don't need to have any fancy label stuff done.
			if (!this.tagName.match(/select/i)) {
				// What happens when we enter the field
				_field.focus(_focus);
				// What happens when we leave the field.
				_field.blur(_blur);
				_field.change(_blur);
				// Autofil bug fixes
				_field.bind('input', _keyup); // For the currently selected field.
				_field.bind('propertychange', _blur);
				// Check for when the user is typing
				_field.keyup(_keyup);
				// Make sure the field gets focus when the label is clicked on (for those people who don't use the 'for' attribute and deserve a kick to the face).
				_label.click(function() { _field.focus(); });
			}
		});
	};

	/*========== Private Functions ==========*/
	// Get the label for a given field.
	_getLabel = function(_field) {
		var _defaults = $(_field).closest('.sl-defaults').data('slDefaults'),
			_label = $(_field).siblings('label'),
			_for;

		if (_label.length === 0) {
			// If a selector is present for the wrapping element, use that, otherwise, proceed to use more traditional methods.
			if (_defaults.wrapSelector) {
				_label = $(_field).parents(_defaults.wrapSelector).find('label');
			} else {
				_for = _field.id || _field.name;
				_label = $('[for="'+_for+'"]');
			}
		}

		return _label;
	};

	// Position the label.
	_prepLabel = function(_field, _label) {
		var _charLimitAttr = _field.data('slCharLimit'),
			_defaults = $(_field).closest('.sl-defaults').data('slDefaults'),
			_opacity = 0,
			_selected;

		// Handle drop down list labels differently
		if (_field[0].tagName.match(/select/i)) {
			// Checking whether the field has a value doesn't work (the browser just seems to select the first <option>
			// before the page has loaded), so I'm going to assume that if the form is prefilled or values are remembered
			// between page loads, then the [selected attribute will be used.
			_selected = _field.find('[selected]').length === 0 ? ' selected' : '';

			_field.prepend('<option value="" disabled'+_selected+' rel="label">'+_label.html()+'</option>');

			_label.css('display','none');
		} else {
			// If we need to figure out the length automatically (and this field isn't specifically excluded),
			//  or if this field is specifically requesting this functionality.
			if (_charLimitAttr === 'auto' || (_defaults.autoCharLimit && isNaN(_charLimitAttr))) {
				_approximateChars(_field, _label);
			}

			// If the field is empty, make the label fully opaque.
			if (_noVal(_field)) {
				_opacity = 1;
			// Otherwise, if the field is not empty, but below the character limit (if any), use the passed in option.
			} else if (_withinCharLimit(_field)) {
				_opacity = _defaults._opacity;
			}

			_field.css({ zIndex:_defaults.baseZindex+1 }).addClass('sl_field');
			_label.css({
				left:_noVal(_field) ? _defaults.labelLeft : $(_field).width()-_label.width(),
				opacity:_opacity,
				position:'absolute',
				top:_defaults.labelTop,
				zIndex:_defaults.baseZindex+2
			}).addClass('sl_label');
		}
	};

	// The event handlers for the form fields.
	_focus = function() {
		var _defaults = $(this).closest('.sl-defaults').data('slDefaults'),
			_duration = _defaults.duration,
			_label,
			_to = { opacity:0 };

		if (_noVal(this)) {
			_label = _getLabel(this);

			if (_defaults.noAnimate) {
				_label.hide();
				return false;
			}

			if (_defaults.slide) {
				_to.left = $(this).width()-_label.width();
				_to.opacity = _defaults.opacity;
			} else {
				_duration = _defaults.fadeDuration;
			}

			_label.stop(true,false).animate(_to, _duration, _defaults.easingOut);
		}
	};
	_blur = function() {
		var _defaults = $(this).closest('.sl-defaults').data('slDefaults'),
			_duration = _defaults.duration,
			_label,
			_to ={ opacity:1 };

		if (_noVal(this)) {
			_label = _getLabel(this);

			if (_defaults.noAnimate) {
				_label.show();
				return false;
			}

			if (_defaults.slide) {
				_to.left = _defaults.labelLeft;
			} else {
				_duration = _defaults.fadeDuration;
			}

			_label.stop(true,false).animate(_to, _duration, _defaults.easingOut);
		} else {
			// If there is a value, and the label is visible, fire our _keyup function so as to hide it. (this semi-fixes the autofill bug)
			_keyup.apply(this);
		}
	};
	_keyup = function() {
		var _defaults = $(this).closest('.sl-defaults').data('slDefaults'),
			_label,
			_o = 0;

		if (_defaults.noAnimate) {
			return false; // We don't need any keyup checking done if we're not animating (the label would be in the way while trying to type).
		}

		_label = _getLabel(this);

		// Let's check whether there's even a need to animate anything first.
		if ((_noVal(this) && _label.css('opacity') > 0) || (!_noVal(this) && _label.css('opacity') === 0 )) {
			return false;
		}

		// If the field is empty and the label isn't showing, make it show up again.
		if ((_noVal(this) && _label.css('opacity') !== 0) || _withinCharLimit(this)) {
			_o = _defaults.opacity;
		}

		_label.stop(true,false).animate({ opacity:_o }, _defaults.fadeDuration, _defaults.easingOut);
	};

	/*===== Utility Functions =====*/
	// Tell us whether the form field has a value.
	_noVal = function(_el) { return $(_el).val() === ''; };
	// Tell us whether the form field meets a given character limit (if necessary)
	_withinCharLimit = function(_el) {
		var _limit = $(_el).data('slCharLimit');

		// Stop here if there's no need to check for number of characters.
		if (!_limit || typeof _limit !== 'number') {
			return false;
		}

		// If this has a length property, we can assume this element is part of a
		//	jQuery object-like Array, thus: grab the DOM element from it (there should only be 1).
		_el = _el.length ? _el[0] : _el;

		return _limit && _el.value && _el.value.length <= _limit;
	};
	// Attempt to automatically set up the character limit and attach it to the field.
	// This will only run once per field on page load.
	_approximateChars = function(_field, _label) {
		var _available,
			_charLen,
			_chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
			_properties = ["font-family", "font-size", "font-weight", "letter-spacing", "line-height", "text-shadow", "text-transform"],
			_tmp = $('<div>'+_chars+'</div>');

		// Loop through each of the defined properties so that we can get the font looking the same size.
		// I know this isn't too great for performance, but for now I don't know of a better way to do this.
		// If you do know of a better way, please hit me with a pull request.
		$.each(_properties, function(i, _prop) {
			_tmp.css(_prop, _field.css(_prop));
		});

		_tmp.css({
			'position':'absolute', // so it's out of the document flow.
			'visibility':'hidden' // so that it's not visible, but still takes up space in the DOM so we can grab the width
		});

		// Append this to the parent so that it can correctly replicate the style of the field.
		_field.parent().append(_tmp);
		// Get the average length *per character*
		_charLen = Math.round(_tmp.width() / _chars.length);
		// Remove our temporary div from the DOM.
		_tmp.remove();

		// Figure out how much room we have to work with here.
		_available = _field.width() - _label.width();

		// Set the data-sl-char-limit attribute for this field to our approximated value.
		_field.data('slCharLimit', Math.floor(_available / _charLen));
	};

	/* nominify */
	// Console Functions (We need these to make sure this only displays when the console exists.)
	_log = function() {
		if (defaults.debug && console && console.log) {
			console.log.apply(console, arguments);
		}
	};
	_info = function() {
		if (defaults.debug && console && console.info) {
			console.info.apply(console, arguments);
		}
	};
	_error = function() {
		if (defaults.debug && console && console.error) {
			console.error.apply(console, arguments);
		}
	};
	/* /nominify */
})(jQuery);