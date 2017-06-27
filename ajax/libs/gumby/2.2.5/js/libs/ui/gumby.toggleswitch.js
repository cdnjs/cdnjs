/**
* Gumby Toggles/Switches
*/
!function() {

	'use strict';

	// Toggle constructor
	function Toggle($el) {
		this.$el = $($el);
		this.targets = [];
		this.on = '';

		if(this.$el.length) {
			this.init();
		}
	}

	// Switch constructor
	function Switch($el) {
		this.$el = $($el);
		this.targets = [];
		this.on = '';

		if(this.$el.length) {
			this.init();
		}
	}

	// intialise toggles, switches will inherit method
	Toggle.prototype.init = function() {
		this.targets = this.parseTargets();
		this.on = Gumby.selectAttr.apply(this.$el, ['on']) || Gumby.click;

		var scope = this;

		// bind to specified event and trigger
		this.$el.on(this.on, function(e) {
			// only disable default if <a>
			if($(this).prop('tagName') === 'A') {
				e.preventDefault();
			}

			// stop propagation
			e.stopPropagation();

			scope.trigger(scope.triggered);

		// listen for gumby.trigger to dynamically trigger toggle/switch
		}).on('gumby.trigger', function() {
			scope.trigger(scope.triggered);
		});
	};

	// parse data-for attribute, switches will inherit method
	Toggle.prototype.parseTargets = function() {
		var targetStr = Gumby.selectAttr.apply(this.$el, ['trigger']),
			secondaryTargets = 0,
			targets = [];

		// no targets so return false
		if(!targetStr) {
			return false;
		}

		secondaryTargets = targetStr.indexOf('|');

		// no secondary targets specified so return single target
		if(secondaryTargets === -1) {
			return [$(targetStr)];
		}

		// return array of both targets, split and return 0, 1
		var targets = targetStr.split('|');
		return targets.length > 1 ? [$(targets[0]), $(targets[1])] : [$(targets[0])];
	};

	// call triggered event and pass target data
	Toggle.prototype.triggered = function() {
		var targetLength = this.targets.length,
			// if no targets then use toggle/switch itself
			targetData = !targetLength ? [this.$el.hasClass('active')] : [],
			i;

		// loop round targets and store boolean indicating if selector is active
		for(i = 0; i < targetLength; i++) {
			targetData.push(this.targets[i].hasClass('active'));
		}

		// trigger gumby.onTrigger event and pass array of target status data
		this.$el.trigger('gumby.onTrigger', targetData);
	};

	// Switch object inherits from Toggle
	Switch.prototype = new Toggle();
	Switch.constructor = Switch;

	// Toggle specific trigger method
	Toggle.prototype.trigger = function(cb) {
		// no targets just toggle active class on toggle
		if(!this.targets) {
			this.$el.toggleClass('active');

		// combine single target with toggle and toggle active class
		} else if(this.targets.length == 1) {
			this.$el.add(this.targets[0]).toggleClass('active');

		// if two targets check active state of first
		// always combine toggle and first target
		} else if(this.targets.length > 1) {
			if(this.targets[0].hasClass('active')) {
				this.$el.add(this.targets[0]).removeClass('active');
				this.targets[1].addClass('active');
			} else {
				this.targets[1].removeClass('active');
				this.$el.add(this.targets[0]).addClass('active');
			}
		}

		// call event handler here, applying scope of object Switch/Toggle
		if(cb && typeof cb === 'function') {
			cb.apply(this);
		}
	};

	// Switch specific trigger method
	Switch.prototype.trigger = function(cb) {
		// no targets just add active class to switch
		if(!this.targets) {
			this.$el.addClass('active');

		// combine single target with switch and add active class
		} else if(this.targets.length == 1) {
			this.$el.add(this.targets[0]).addClass('active');

		// if two targets check active state of first
		// always combine switch and first target
		} else if(this.targets.length > 1) {
			this.$el.add(this.targets[0]).addClass('active');
			this.targets[1].removeClass('active');
		}

		// call event handler here, applying scope of object Switch/Toggle
		if(cb && typeof cb === 'function') {
			cb.apply(this);
		}
	};

	// add toggle initialisation
	Gumby.addInitalisation('toggles', function() {
		$('.toggle').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isToggle')) {
				return true;
			}
			// mark element as initialized
			$this.data('isToggle', true);
			new Toggle($this);
		});
	});

	// add switches initialisation
	Gumby.addInitalisation('switches', function() {
		$('.switch').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isSwitch')) {
				return true;
			}
			// mark element as initialized
			$this.data('isSwitch', true);
			new Switch($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'toggleswitch',
		events: ['trigger', 'onTrigger'],
		init: function() {
			// Run initialize methods
			Gumby.initialize('switches');
			Gumby.initialize('toggles');
		}
	});
}();
