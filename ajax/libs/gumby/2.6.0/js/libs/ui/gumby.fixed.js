/**
* Gumby Fixed
*/
!function($) {

	'use strict';

	function Fixed($el) {

		Gumby.debug('Initializing Fixed Position', $el);

		this.$el = $el;

		this.$window = $(window);
		this.fixedPoint = '';
		this.pinPoint = false;
		this.fixedPointjQ = false;
		this.pinPointjQ = false;
		this.offset = 0;
		this.pinOffset = 0;
		this.top = 0;
		this.constrainEl = true;
		this.state = false;
		this.measurements = {
			left: 0,
			width: 0
		};

		// set up module based on attributes
		this.setup();

		var scope = this;

		// monitor scroll and update fixed elements accordingly
		this.$window.on('scroll load', function() {
			scope.monitorScroll();
		});

		// reinitialize event listener
		this.$el.on('gumby.initialize', function() {
			Gumby.debug('Re-initializing Fixed Position', $el);
			scope.setup();
			scope.monitorScroll();
		});
	}

	// set up module based on attributes
	Fixed.prototype.setup = function() {
		var scope = this;

		this.fixedPoint = this.parseAttrValue(Gumby.selectAttr.apply(this.$el, ['fixed']));

		// pin point is optional
		this.pinPoint = Gumby.selectAttr.apply(this.$el, ['pin']) || false;

		// offset from fixed point
		this.offset = Number(Gumby.selectAttr.apply(this.$el, ['offset'])) || 0;

		// offset from pin point
		this.pinOffset = Number(Gumby.selectAttr.apply(this.$el, ['pinoffset'])) || 0;

		// top position when fixed
		this.top = Number(Gumby.selectAttr.apply(this.$el, ['top'])) || 0;

		// constrain can be turned off
		this.constrainEl = Gumby.selectAttr.apply(this.$el, ['constrain']) || true;
		if(this.constrainEl === 'false') {
			this.constrainEl = false;
		}

		// reference to the parent, row/column
		this.$parent = this.$el.parents('.columns, .column, .row');
		this.$parent = this.$parent.length ? this.$parent.first() : false;
		this.parentRow = this.$parent ? !!this.$parent.hasClass('row') : false;

		// if optional pin point set then parse now
		if(this.pinPoint) {
			this.pinPoint = this.parseAttrValue(this.pinPoint);
		}

		this.fixedPointjQ = this.fixedPoint instanceof jQuery;
		this.pinPointjQ = this.pinPoint instanceof jQuery;

		// if we have a parent constrain dimenions
		if(this.$parent && this.constrainEl) {
			// measure up
			this.measure();
			// and on resize reset measurement
			this.$window.resize(function() {
				if(scope.state) {
					scope.measure();
					scope.constrain();
				}
			});
		}
	};

	// monitor scroll and trigger changes based on position
	Fixed.prototype.monitorScroll = function() {
		var scrollAmount = this.$window.scrollTop(),
			// recalculate selector attributes as position may have changed
			fixedPoint = this.fixedPointjQ ? this.fixedPoint.offset().top : this.fixedPoint,
			pinPoint = false,
			timer;

		// if a pin point is set recalculate
		if(this.pinPoint) {
			pinPoint = this.pinPointjQ ? this.pinPoint.offset().top : this.pinPoint;
		}

		// apply offsets
		if(this.offset) { fixedPoint -= this.offset; }
		if(this.pinOffset) { pinPoint -= this.pinOffset; }

		// fix it
		if((scrollAmount >= fixedPoint) && this.state !== 'fixed') {
			if(!pinPoint || scrollAmount < pinPoint) {
				this.fix();
			}
		// unfix it
		} else if(scrollAmount < fixedPoint && this.state === 'fixed') {
			this.unfix();

		// pin it
		} else if(pinPoint && scrollAmount >= pinPoint && this.state !== 'pinned') {
			this.pin();
		}
	};

	// fix the element and update state
	Fixed.prototype.fix = function() {
		Gumby.debug('Element has been fixed', this.$el);
		Gumby.debug('Triggering onFixed event', this.$el);

		this.state = 'fixed';
		this.$el.css({
			'top' : this.top
		}).addClass('fixed').removeClass('unfixed pinned').trigger('gumby.onFixed');

		// if we have a parent constrain dimenions
		if(this.$parent) {
			this.constrain();
		}
	};

	// unfix the element and update state
	Fixed.prototype.unfix = function() {
		Gumby.debug('Element has been unfixed', this.$el);
		Gumby.debug('Triggering onUnfixed event', this.$el);

		this.state = 'unfixed';
		this.$el.addClass('unfixed').removeClass('fixed pinned').trigger('gumby.onUnfixed');
	};

	// pin the element in position
	Fixed.prototype.pin = function() {
		Gumby.debug('Element has been pinned', this.$el);
		Gumby.debug('Triggering onPinned event', this.$el);
		this.state = 'pinned';
		this.$el.css({
			'top' : this.$el.offset().top
		}).addClass('pinned fixed').removeClass('unfixed').trigger('gumby.onPinned');
	};

	// constrain elements dimensions to match width/height
	Fixed.prototype.constrain = function() {
		Gumby.debug("Constraining element", this.$el);
		this.$el.css({
			left: this.measurements.left,
			width: this.measurements.width
		});
	};

	// measure up the parent for constraining
	Fixed.prototype.measure = function() {
		var parentPadding;

		this.measurements.left = this.$parent.offset().left;
		this.measurements.width = this.$parent.width();

		// if element has a parent row then need to consider padding
		if(this.parentRow) {
			parentPadding = Number(this.$parent.css('paddingLeft').replace(/px/, ''));
			if(parentPadding) {
				this.measurements.left += parentPadding;
			}
		}
	};

	// parse attribute values, could be px, top, selector
	Fixed.prototype.parseAttrValue = function(attr) {
		// px value fixed point
		if($.isNumeric(attr)) {
			return Number(attr);
		// 'top' string fixed point
		} else if(attr === 'top') {
			return this.$el.offset().top;
		// selector specified
		} else {
			var $el = $(attr);
			if(!$el.length) {
				Gumby.error('Cannot find Fixed target: '+attr);
				return false;
			}
			return $el;
		}
	};

	// add initialisation
	Gumby.addInitalisation('fixed', function(all) {
		$('[data-fixed],[gumby-fixed],[fixed]').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isFixed') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isFixed') && all) {
				$this.trigger('gumby.initialize');
				return true;
			}

			// mark element as initialized
			$this.data('isFixed', true);
			new Fixed($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'fixed',
		events: ['initialize', 'onFixed', 'onUnfixed'],
		init: function() {
			Gumby.initialize('fixed');
		}
	});
}(jQuery);
