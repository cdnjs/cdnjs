/**
* Gumby Retina
*/
!function($) {

	'use strict';

	function Retina($el) {
		
		Gumby.debug('Initializing Retina', $el);

		this.$el = $el;
		this.imageSrc = this.$el.attr('src');
		this.retinaSrc = this.fetchRetinaImage();
		this.$retinaImg = $(new Image());

		var scope = this;

		// image src not valid
		if(!this.retinaSrc) {
			return false;
		}

		// load retina image
		this.$retinaImg.attr('src', this.retinaSrc).load(function() {
			scope.retinaImageLoaded();
		}).error(function() {
			Gumby.error('Couln\'t load retina image: '+scope.retinaSrc);
		});
	}

	// fetch retina src by appending '@2x' to image string before extension
	Retina.prototype.fetchRetinaImage = function() {
		var imgSrc = this.imageSrc,
			index = this.imageSrc.search(/(\.|\/)(gif|jpe?g|png)$/i);

		// image src is not valid
		if(index < 0) {
			return false;
		}

		// return retina src
		return imgSrc.substr(0, index) + '@2x' + imgSrc.substr(index, imgSrc.length);
	};

	// once retina image loaded swap original src
	Retina.prototype.retinaImageLoaded = function() {
		Gumby.debug('Swapping image for retina version', this.$el);
		Gumby.debug('Triggering onRetina event', this.$el);
		this.$el.attr('src', this.$retinaImg.attr('src')).trigger('gumby.onRetina');
	};

	// add initialisation
	Gumby.addInitalisation('retina', function() {

		// this module is for retina devices only
		if(!window.devicePixelRatio || window.devicePixelRatio <= 1) {
			return;
		}

		$('img[data-retina],img[gumby-retina],img[retina]').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isRetina')) {
				return true;
			}
			// mark element as initialized
			$this.data('isRetina', true);
			new Retina($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'retina',
		events: ['onRetina'],
		init: function() {
			Gumby.initialize('retina');
		}
	});
}(jQuery);
