/**
 * jQuery Opacity Rollover plugin
 *
 * Copyright (c) 2009 Trent Foley (http://trentacular.com)
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
;(function($) {
	var defaults = {
		mouseOutOpacity:   0.67,
		mouseOverOpacity:  1.0,
		fadeSpeed:         'fast',
		exemptionSelector: '.selected'
	};

	$.fn.opacityrollover = function(settings) {
		// Initialize the effect
		$.extend(this, defaults, settings);

		var config = this;

		function fadeTo(element, opacity) {
			var $target = $(element);
			
			if (config.exemptionSelector)
				$target = $target.not(config.exemptionSelector);	
			
			$target.fadeTo(config.fadeSpeed, opacity);
		}

		this.css('opacity', this.mouseOutOpacity)
			.hover(
				function () {
					fadeTo(this, config.mouseOverOpacity);
				},
				function () {
					fadeTo(this, config.mouseOutOpacity);
				});

		return this;
	};
})(jQuery);
