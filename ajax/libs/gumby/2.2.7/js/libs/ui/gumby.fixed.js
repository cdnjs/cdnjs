/**
* Gumby Fixed
*/
!function() {

	'use strict';

	function Fixed($el) {
		this.$el = $el;
		this.$holder = Gumby.selectAttr.apply(this.$el, ['holder']);
		this.fixedPoint = Gumby.selectAttr.apply(this.$el, ['fixed']);
		this.unfixPoint = false;

		// if holder attr set then create jQuery object
		// otherwise use window for scrolling cals
		if(this.$holder) {
			this.$holder = $(this.$holder);
		} else {
			this.$holder = $(window);
		}

		// fix/unfix points specified
		if(this.fixedPoint.indexOf('|') > -1) {
			var points = this.fixedPoint.split('|');
			this.fixedPoint = points[0];
			this.unfixPoint = points[1];
		}

		// parse possible parameters
		this.fixedPoint = this.parseAttrValue(this.fixedPoint);
		if(this.unfixPoint) {
			this.unfixPoint = this.parseAttrValue(this.unfixPoint);
		}

		var scope = this;
		this.$holder.scroll(function() {
			scope.scroll();
		});
	}

	// handle scroll event on window/specified holder
	Fixed.prototype.scroll = function() {
		var offset = this.$holder.scrollTop(),
			fixedPoint = this.fixedPoint,
			unfixPoint = this.unfixPoint,
			endPoint = this.endPoint;

		// if fixed point, unfix point or end point are DOM fragements
		// then re-calculate values as could have been updated
		fixedPoint = fixedPoint instanceof jQuery ? this.fixedPoint.offset().top : this.fixedPoint;
		unfixPoint = unfixPoint instanceof jQuery ? this.unfixPoint.offset().top : this.unfixPoint;

		// ensure unfix point is never reached if not set
		if(!unfixPoint) {
			unfixPoint = offset * 2;
		}

		// scrolled past fixed point and no fixed class present
		if((offset >= fixedPoint) && (offset < unfixPoint)  && !this.$el.hasClass('fixed')) {
			this.$el.addClass('fixed').trigger('gumby.onFixed');

		// before fixed point, pass 0 to onUnfixed event
		} else if((offset <= fixedPoint) && this.$el.hasClass('fixed')) {
			this.$el.removeClass('fixed').trigger('gumby.onUnfixed', 0);
		}

		// after unfix point, pass 1 to onUnfixed event
		// separate conditional as should override
		if(unfixPoint && (offset >= unfixPoint) && this.$el.hasClass('fixed')) {
			this.$el.removeClass('fixed').trigger('gumby.onUnfixed', 1);
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
			return $el.length ? $el : false;
		}
	};

	// add initialisation
	Gumby.addInitalisation('fixed', function() {
		$('[data-fixed],[gumby-fixed],[fixed]').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isFixed')) {
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
		events: ['onFixed', 'onUnfixed'],
		init: function() {
			Gumby.initialize('fixed');
		}
	});
}();
