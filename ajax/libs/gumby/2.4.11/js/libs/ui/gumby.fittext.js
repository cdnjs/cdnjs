/**
* Gumby FitText
*
* Adapted from the awesome FitText jQuery plugin
* brought to you by Paravel - http://paravelinc.com/
*/
!function() {

	'use strict';

	function FitText($el) {
		this.$el = $el;

		this.rate = 0;
		this.fontSizes = {};

		// set up module based on attributes
		this.setup();

		var scope = this;

		// re-initialize module
		this.$el.on('gumby.initialize', function() {
			scope.setup();
		});

		// lets go
		$(window).on('load resize orientationchange', function() {
			scope.resize();
		});
	}

	// set up module based on attributes
	FitText.prototype.setup = function() {
		// optional compressor rate
		this.rate = Number(Gumby.selectAttr.apply(this.$el, ['rate'])) || 1;
		// optional font sizes (min|max)
		this.fontSizes = this.parseSizes(Gumby.selectAttr.apply(this.$el, ['sizes']));
	};

	// apply the resizing
	FitText.prototype.resize = function() {
		this.$el.css('font-size', this.calculateSize());
	};

	// calculate the font size
	FitText.prototype.calculateSize = function() {
		return Math.max(Math.min(this.$el.width() / (this.rate*10), parseFloat(this.fontSizes.max)), parseFloat(this.fontSizes.min));
	};

	// parse size attributes with min|max syntax
	FitText.prototype.parseSizes = function(attrStr) {
		var sizes = {
			min: Number.NEGATIVE_INFINITY,
			max: Number.POSITIVE_INFINITY
		};

		// attribute is optional
		if(!attrStr) { return sizes; }

		// min and/or max specified
		if(attrStr.indexOf('|') > -1) {
			attrStr = attrStr.split('|');

			// both are optional
			sizes.min = Number(attrStr[0]) || sizes.min;
			sizes.max = Number(attrStr[1]) || sizes.max;
		}

		// only one value specific without | so use as min
		sizes.min = Number(attrStr) || sizes.min;

		return sizes;
	};

	// add initialisation
	Gumby.addInitalisation('fittext', function(all) {
		$('.fittext').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isFittext') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isFittext') && all) {
				$this.trigger('gumby.initialize');
				return true;
			}

			// mark element as initialized
			$this.data('isFittext', true);
			new FitText($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'fittext',
		events: [],
		init: function() {
			Gumby.initialize('fittext');
		}
	});
}();
