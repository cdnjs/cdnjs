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
		var scope = this;

		// set up module based on attributes
		this.setup();

		// bind to specified event and trigger
		this.$el.on(this.on, function(e) {
			// stop propagation
			e.stopImmediatePropagation();

			// only disable default if <a>
			if($(this).prop('tagName') === 'A') {
				e.preventDefault();
			}

			scope.trigger(scope.triggered);

		// listen for gumby.trigger to dynamically trigger toggle/switch
		}).on('gumby.trigger', function() {
			scope.trigger(scope.triggered);
		// re-initialize module
		}).on('gumby.initialize', function() {
			scope.setup();
		});
	};

	// set up module based on attributes
	Toggle.prototype.setup = function() {
		this.targets = this.parseTargets();
		this.on = Gumby.selectAttr.apply(this.$el, ['on']) || Gumby.click;
		this.className = Gumby.selectAttr.apply(this.$el, ['classname']) || 'active';
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
		targets = targetStr.split('|');
		return targets.length > 1 ? [$(targets[0]), $(targets[1])] : [$(targets[0])];
	};

	// call triggered event and pass target data
	Toggle.prototype.triggered = function() {
		// trigger gumby.onTrigger event and pass array of target status data
		this.$el.trigger('gumby.onTrigger', [this.$el.hasClass(this.className)]);
	};

	// Switch object inherits from Toggle
	Switch.prototype = new Toggle();

	// Toggle specific trigger method
	Toggle.prototype.trigger = function(cb) {
		// no targets just toggle active class on toggle
		if(!this.targets) {
			this.$el.toggleClass(this.className);

		// combine single target with toggle and toggle active class
		} else if(this.targets.length == 1) {
			this.$el.add(this.targets[0]).toggleClass(this.className);

		// if two targets check active state of first
		// always combine toggle and first target
		} else if(this.targets.length > 1) {
			if(this.targets[0].hasClass(this.className)) {
				this.$el.add(this.targets[0]).removeClass(this.className);
				this.targets[1].addClass(this.className);
			} else {
				this.targets[1].removeClass(this.className);
				this.$el.add(this.targets[0]).addClass(this.className);
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
			this.$el.addClass(this.className);

		// combine single target with switch and add active class
		} else if(this.targets.length == 1) {
			this.$el.add(this.targets[0]).addClass(this.className);

		// if two targets check active state of first
		// always combine switch and first target
		} else if(this.targets.length > 1) {
			this.$el.add(this.targets[0]).addClass(this.className);
			this.targets[1].removeClass(this.className);
		}

		// call event handler here, applying scope of object Switch/Toggle
		if(cb && typeof cb === 'function') {
			cb.apply(this);
		}
	};

	// add toggle initialisation
	Gumby.addInitalisation('toggles', function(all) {
		$('.toggle').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isToggle') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isToggle') && all) {
				$this.trigger('gumby.initialize');
			}

			// mark element as initialized
			$this.data('isToggle', true);
			new Toggle($this);
		});
	});

	// add switches initialisation
	Gumby.addInitalisation('switches', function(all) {
		$('.switch').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isSwitch') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isSwitch') && all) {
				$this.trigger('gumby.initialize');
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
