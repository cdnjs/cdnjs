/**
* Gumby SkipLink
*/
!function() {

	'use strict';

	function SkipLink($el) {

		this.$el = $el;
		this.targetPos = 0;
		this.duration = Number(Gumby.selectAttr.apply(this.$el, ['duration'])) || 200;
		this.offset = Gumby.selectAttr.apply(this.$el, ['offset']) || false;
		this.easing = Gumby.selectAttr.apply(this.$el, ['easing']) || 'swing';

		var scope = this;

		// skip to target element on click or trigger of gumby.skipTo event
		this.$el.on(Gumby.click+' gumby.skip', function(e) {
			e.preventDefault();
			// calculate target on each click
			// other UI interactions could effect this
			scope.calculateTarget();
		});
	}

	// calculate target px point to skip to
	SkipLink.prototype.calculateTarget = function() {

		var scope = this,
			target = Gumby.selectAttr.apply(this.$el, ['goto']),
			$target;

		// 'top' specified so target is 0px
		if(target == 'top') {
			this.targetPos = 0;

		// px point specified
		} else if($.isNumeric(target)) {
			this.targetPos = Number(target);
		} else {

			// check for element with target as selector
			$target = $(target);

			// target does not exist, we need a target
			if(!$target) {
				return false;
			}

			this.targetPos = $target.offset().top;
		}

		// skip to target
		this.skipTo();
	};

	// animate body, html scrollTop value to target px point
	SkipLink.prototype.skipTo = function() {
		var scope = this;

		// slide to position of target
		$('html,body').animate({
			'scrollTop' : this.calculateOffset()
		}, this.duration, this.easing).promise().done(function() {
			scope.$el.trigger('gumby.onComplete');
		});
	};

	// calculate offset with current target point
	SkipLink.prototype.calculateOffset = function() {
		// no offset so return target here
		if(!this.offset) {
			return this.targetPos;
		}

		// negative / positive
		var op = this.offset.substr(0, 1),
			off = Number(this.offset.substr(1, this.offset.length));

		// subtract offset from target position
		if(op === '-') {
			return this.targetPos - off;
		// add offset to target position
		} else if(op === '+') {
			return this.targetPos + off;
		}
	};

	// add initialisation
	Gumby.addInitalisation('skiplinks', function() {
		$('.skiplink > a, .skip').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isSkipLink')) {
				return true;
			}
			// mark element as initialized
			$this.data('isSkipLink', true);
			new SkipLink($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'skiplink',
		events: ['onComplete', 'skip'],
		init: function() {
			Gumby.initialize('skiplinks');
		}
	});
}();
