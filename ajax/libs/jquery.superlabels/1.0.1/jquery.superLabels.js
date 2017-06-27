/*
 *	Title: jQuery Super Labels Plugin - Give your forms a helping of awesome!
 *	Author: Rémy Bach
 *	Version: 1.0.1
 *	License: http://remybach.mit-license.org
 *	Url: http://github.com/remybach/jQuery.superLabels
 *	Description:
 *	This plugin allows you to display your form labels on top of your form fields, saving you space on your page.
 */
(function($) {
	var defaults = {
		baseZindex:0, // The base z-index which we display on top of.
		debug:false,
		duration:500, // Time of the slide in milliseconds.
		easingIn:($.easing.def ? 'easeInOutCubic' : false), // The easing in function to use for the slide.
		easingOut:($.easing.def ? 'easeInOutCubic' : false), // The easing out function to use for the slide.
		fadeDuration:250, // Duration of animation when it's fade only.
		labelLeft:0, // The distance from the left for the label.
		labelTop:0, // The distance from the top for the label.
		noAnimate:false, // Whether or not to animate (slide and fade) the label. If true, we'll just hide it.
		opacity:0.5, // The opacity to fade the label to.
		slide:true, // Whether or not to slide the label across the input field.
		wrapSelector:false // The selector for the element you have wrapping each field.
	};

	var acceptedInputTypes = ['text', 'search', 'url', 'tel', 'email', 'password', 'number'];
	var acceptedElements = ['input', 'textarea', 'select'];

	$.fn.superLabels = function(options) {
		// If this has been run on an empty set of elements, pop out.
		if (this.length === 0) return false;

		// Remove any NaNs from the positions (if present)
		if (options && options.labelLeft && isNaN(options.labelLeft))
			options.labelLeft = Number(options.labelLeft.replace(/\D+/, ''));
		if (options && options.labelTop && isNaN(options.labelTop))
			options.labelTop = Number(options.labelTop.replace(/\D+/, ''));
		
		// If options were passed in, merge them with the defaults.
		$.extend(defaults, options || {});
		if (!$.easing.def) { _info('Easing plugin not found - using standard jQuery animations.'); }

		var _fields = this;

		// Check for whether the user has just passed in the form. If so, we need to fetch all the accepted fields, etc..
		if (this.length === 1 && this[0].tagName.match(/form/i)) {
			_fields = $(acceptedElements.join(','), this);
		}

		// Do our magic on each form field.
		return _fields.each(function() {
			var _field = $(this);
			
			// Don't even bother going further if this isn't one of the accepted input field types or elements.
			if ((_field[0].tagName.toLowerCase() === 'input' && $.inArray(_field.attr('type'), acceptedInputTypes)) === -1 && $.inArray(_field[0].tagName.toLowerCase(), acceptedElements) !== -1) {
				_info('Doh! The following '+this.tagName.toLowerCase()+', is not supported.', this);
				return true; // Equivalent to continue in a normal for loop.
			}

			var _label = _getLabel(this);
			var _placeholder = _field.attr('placeholder');

			// Check for the placeholder attribute first.
			if (_placeholder) {
				var _placeholderLabel = $('<label for="'+(_field.attr('id') || _field.attr('name'))+'">'+_placeholder+'</label>');

				// If there isn't a label for this field, create one, otherwise replace the existing one with the placeholder one.
				if (_label.length === 0) {
					_label = _placeholderLabel;
					_field.prev(_label);
				} else {
					_label.replaceWith(_placeholderLabel);
				}
				_field.removeAttr('placeholder');
			}
			
			// Make sure this form field has a label
			if (_label.length === 0) {
				_info('Doh! The following '+this.tagName.toLowerCase()+' has no related label.', this);
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
		var _label = $(_field).siblings('label');

		if (_label.length === 0) {
			// If a selector is present for the wrapping element, use that, otherwise, proceed to use more traditional methods.
			if (defaults.wrapSelector) {
				_label = $(_field).parents(defaults.wrapSelector).find('label');
			} else {
				_for = _field.id || _field.name;
				_label = $('[for="'+_for+'"]');
			}
		}

		return _label;
	};

	// Position the label.
	_prepLabel = function(_field, _label) {
		// Handle drop down list labels differently
		if (_field[0].tagName.match(/select/i)) {
			// Checking whether the field has a value doesn't work (the browser just seems to select the first <option>
			// before the page has loaded), so I'm going to assume that if the form is prefilled or values are remembered
			// between page loads, then the [selected attribute will be used.
			var _selected = _field.find('[selected]').length === 0 ? ' selected' : '';
			
			_field.prepend('<option value="" disabled'+_selected+' rel="label">'+_label.html()+'</option>');

			_label.css('display','none');
		} else {
			_field.css({ zIndex:defaults.baseZindex+1 }).addClass('sl_field');
			_label.css({
				left:_noVal(_field) ? defaults.labelLeft : $(_field).width()-_label.width(),
				opacity:_noVal(_field) ? 1 : 0,
				position:'absolute',
				top:defaults.labelTop,
				zIndex:defaults.baseZindex+2
			}).addClass('sl_label');
		}
	};

	// The focus and blur functions
	_focus = function() {
		if (_noVal(this)) {
			var _duration = defaults.duration;
			var _label = _getLabel(this);
			var _to ={ opacity:0 };

			if (defaults.noAnimate) {
				_label.hide();
				return false;
			}
			
			if (defaults.slide) {
				_to.left = $(this).width()-_label.width();
				_to.opacity = defaults.opacity;
			} else {
				_duration = defaults.fadeDuration;
			}
			
			_label.animate(_to, _duration, defaults.easingOut);
		}
	};
	_blur = function() {
		if (_noVal(this) ) {
			var _duration = defaults.duration;
			var _label = _getLabel(this);
			var _to ={ opacity:1 };

			if (defaults.noAnimate) {
				_label.show();
				return false;
			}
			
			if (defaults.slide) {
				_to.left = defaults.labelLeft;
			} else {
				_duration = defaults.fadeDuration;
			}
			
			_label.animate(_to, _duration, defaults.easingOut);
		}
	};
	_keyup = function() {
		if (defaults.noAnimate) return false; // We don't need any keyup checking done if we're not animating (the label would be in the way while trying to type).
		
		var _label = _getLabel(this);
		var _o = 0;
		
		// Let's check whether there's even a need to animate anything first.
		if ((_noVal(this) && _label.css('opacity') > 0) || (!_noVal(this) && _label.css('opacity') === 0 )) {
			return false;
		}


		// If the field is empty and the label isn't showing, make it show up again.
		if (_noVal(this) && _label.css('opacity') !== 0) {
			_o = defaults.opacity;
		}

		_label.animate({ opacity:_o }, defaults.fadeDuration, defaults.easingOut);
	};

	/*===== Utility Functions =====*/
	// Tell us whether the form field has a value.
	_noVal = function(_el) { return $(_el).val() === ''; };
	
	// Console Functions (We need these to make sure this only displays when the console exists.)
	_log = function() { if (defaults.debug && console && console.log) console.log.apply(console, arguments); };
	_info = function() { if (defaults.debug && console && console.info) console.info.apply(console, arguments); };
	_error = function() { if (defaults.debug && console && console.error) console.error.apply(console, arguments); };
})(jQuery);