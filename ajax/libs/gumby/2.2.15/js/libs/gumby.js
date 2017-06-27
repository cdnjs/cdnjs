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
!function() {

	'use strict';

	function Gumby() {
		this.$dom = $(document);
		this.isOldie = !!this.$dom.find('html').hasClass('oldie');
		this.click = 'click';
		this.onReady = this.onOldie = this.onTouch = false;
		this.uiModules = {};
		this.inits = {};
	}

	// initialize Gumby
	Gumby.prototype.init = function() {
		// init UI modules
		this.initUIModules();

		var scope = this;

		// call ready() code when dom is ready
		this.$dom.ready(function() {
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
	};

	// public helper - set Gumby ready callback
	Gumby.prototype.ready = function(code) {
		if(code && typeof code === 'function') {
			this.onReady = code;
		}
	};

	// public helper - set oldie callback
	Gumby.prototype.oldie = function(code) {
		if(code && typeof code === 'function') {
			this.onOldie = code;
		}
	};

	// public helper - set touch callback
	Gumby.prototype.touch = function(code) {
		if(code && typeof code === 'function') {
			this.onTouch = code;
		}
	};

	// public helper - return debuggin object including uiModules object
	Gumby.prototype.debug = function() {
		return {
			$dom: this.$dom,
			isOldie: this.isOldie,
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
			if(this.attr(dataAttr)) {
				return this.attr(dataAttr);

			// next test for gumby-attr
			} else if(this.attr(gumbyAttr)) {
				return this.attr(gumbyAttr);

			// finally no prefix
			} else if(this.attr(attr)) {
				return this.attr(attr);
			}
		}

		// none found
		return false;
	};

	// add an initialisation method
	Gumby.prototype.addInitalisation = function(ref, code) {
		this.inits[ref] = code;
	};

	// initialize a uiModule
	Gumby.prototype.initialize = function(ref) {
		if(this.inits[ref] && typeof this.inits[ref] === 'function') {
			this.inits[ref]();
		}
	};

	// store a UI module
	Gumby.prototype.UIModule = function(data) {
		var module = data.module;
		this.uiModules[module] = data;
	};

	// loop round and init all UI modules
	Gumby.prototype.initUIModules = function() {
		var x;
		for(x in this.uiModules) {
			this.uiModules[x].init();
		}
	};

	window.Gumby = new Gumby();

}();
