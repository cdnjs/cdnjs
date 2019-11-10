/**
* Gumby Framework
* ---------------
*
* Follow @gumbycss on twitter and spread the love.
* We worked super hard on making this awesome and released it to the web.
* All we ask is you leave this intact. #gumbyisawesome
*
* Gumby Framework
* http://gumbyframework.com
*
* Built with love by your friends @digitalsurgeons
* http://www.digitalsurgeons.com
*
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/
!function($) {

	'use strict';

	function Gumby() {
		this.$dom = $(document);
		this.$html = this.$dom.find('html');
		this.isOldie = !!this.$html.hasClass('oldie');
		this.click = 'click';
		this.onReady = this.onOldie = this.onTouch = false;
		this.autoInit = $('script[gumby-init]').attr('gumby-init') === 'false' ? false : true;
		this.debugMode = Boolean($('script[gumby-debug]').length);
		this.touchDevice = !!(Modernizr.touch || window.navigator.userAgent.indexOf("Windows Phone") > 0);
		this.gumbyTouch = false;
		this.touchEvents = 'js/libs';
		this.breakpoint = Number($('script[gumby-breakpoint]').attr('gumby-breakpoint')) || 768;
		this.touchEventsLoaded = false;
		this.uiModulesReady = false;
		this.uiModules = {};
		this.inits = {};

		// jQuery mobile touch events
		var touch = $('script[gumby-touch]').attr('gumby-touch'),
			path = $('script[gumby-path]').attr('gumby-path');

		// do not use touch events
		if(touch === 'false') {
			this.touchEvents = false;

		// set path to jQuery mobile
		// support touch/path attrs for backwards compatibility
		} else {
			if(touch) {
				this.touchEvents = touch;
			} else if(path) {
				this.touchEvents = path;
			}
		}

		// update click property to bind to click/tap
		if(this.touchDevice) {
			this.click += ' tap';
		}

		// add gumby-touch/gumby-no-touch classes
		// gumby touch == touch enabled && smaller than defined breakpoint
		if(this.touchDevice && $(window).width() < this.breakpoint) {
			this.$html.addClass('gumby-touch');
			this.gumbyTouch = true;
		} else {
			this.$html.addClass('gumby-no-touch');
		}

		if(this.debugMode) {
			this.debug('Gumby is in debug mode');
		}
	}

	// initialize Gumby
	Gumby.prototype.init = function(options) {
		var scope = this,
			opts = options ? options : {};

		// call ready() code when dom is ready
		this.$dom.ready(function() {
			if(opts.debug) {
				scope.debugMode = true;
			}

			scope.debug("Initializing Gumby");

			// init UI modules
			var mods = opts.uiModules ? opts.uiModules : false;
			scope.initUIModules(mods);

			if(scope.onReady) {
				scope.onReady();
			}

			// call oldie() callback if applicable
			if(scope.isOldie && scope.onOldie) {
				scope.onOldie();
			}

			// call touch() callback if applicable
			if(Modernizr.touch && scope.onTouch) {
				scope.onTouch();
			}
		});

		return this;
	};

	Gumby.prototype.helpers = function() {
		if(this.onReady) {
			this.onReady();
		}

		// call oldie() callback if applicable
		if(this.isOldie && this.onOldie) {
			this.onOldie();
		}

		// call touch() callback if applicable
		if(Modernizr.touch && this.onTouch) {
			this.onTouch();
		}
	};

	// public helper - set Gumby ready callback
	Gumby.prototype.ready = function(code) {
		if(code && typeof code === 'function') {
			this.onReady = code;
		}

		return this;
	};

	// public helper - set oldie callback
	Gumby.prototype.oldie = function(code) {
		if(code && typeof code === 'function') {
			this.onOldie = code;
		}

		return this;
	};

	// public helper - set touch callback
	Gumby.prototype.touch = function(code) {
		if(code && typeof code === 'function') {
			this.onTouch = code;
		}

		return this;
	};

	// print to console if available and we're in debug mode
	Gumby.prototype.console = function(type, data) {
		if(!this.debugMode || !window.console) { return; }
		console[console[type] ? type : 'log'](data.length > 1 ? Array.prototype.slice.call(data) : data[0]);
	};

	// pass args onto console method for output
	Gumby.prototype.log = function() { this.console('log', arguments); };
	Gumby.prototype.debug = function() { this.console('debug', arguments); };
	Gumby.prototype.warn = function() { this.console('warn', arguments); };
	Gumby.prototype.error = function() { this.console('error', arguments); };

	// public helper - return debuggin object including uiModules object
	Gumby.prototype.dump = function() {
		return {
			$dom: this.$dom,
			isOldie: this.isOldie,
			touchEvents: this.touchEvents,
			debugMode: this.debugMode,
			autoInit: this.autoInit,
			uiModules: this.uiModules,
			click: this.click
		};
	};

	// grab attribute value, testing data- gumby- and no prefix
	Gumby.prototype.selectAttr = function() {
		var i = 0;

		// any number of attributes can be passed
		for(; i < arguments.length; i++) {
			// various formats
			var attr = arguments[i],
				dataAttr = 'data-'+arguments[i],
				gumbyAttr = 'gumby-'+arguments[i];

			// first test for data-attr
			if(this.is('['+dataAttr+']')) {
				return this.attr(dataAttr) ? this.attr(dataAttr) : true;

			// next test for gumby-attr
			} else if(this.is('['+gumbyAttr+']')) {
				return this.attr(gumbyAttr) ? this.attr(gumbyAttr) : true;

			// finally no prefix
			} else if(this.is('['+attr+']')) {
				return this.attr(attr) ? this.attr(attr) : true;
			}
		}

		// none found
		return false;
	};

	// add an initialisation method
	Gumby.prototype.addInitalisation = function(ref, code) {
		this.inits[ref] = code;
	};

	// initialize a uiModule, single / array of module refs
	Gumby.prototype.initialize = function(ref, all) {
		if(typeof ref === 'object') {
			var i = 0;
			for(i; i < ref.length; i++) {
				if(!this.inits[ref[i]] || typeof this.inits[ref[i]] !== 'function') {
					this.error('Error initializing module: '+ref[i]);
					continue;
				}

				this.inits[ref[i]](all);
			}
		} else if(this.inits[ref] && typeof this.inits[ref] === 'function') {
			this.inits[ref](all);
		} else {
			this.error('Error initializing module: '+ref);
		}

		return this;
	};

	// store a UI module
	Gumby.prototype.UIModule = function(data) {
		var module = data.module;
		this.uiModules[module] = data;
	};

	// loop round and init all UI modules
	Gumby.prototype.initUIModules = function(mods) {
		var x, m, arr = this.uiModules;

		// only initialise specified modules
		if(mods) {
			arr = mods;
		}

		// initialise everything
		for(x in arr) {
			m = mods ? arr[x] : x;
			this.uiModules[m].init();
		}
	};

	window.Gumby = new Gumby();

}(jQuery);
