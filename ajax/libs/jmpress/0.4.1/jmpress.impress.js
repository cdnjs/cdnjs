/*!
 * jmpress.js v0.4.1
 * http://shama.github.com/jmpress.js
 *
 * A jQuery plugin to build a website on the infinite canvas.
 *
 * Copyright 2012 Kyle Robinson Young @shama & Tobias Koppers @sokra
 * Licensed MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Based on the foundation laid by Bartek Szopka @bartaz
 */

/*!
 * core.js
 * The core of jmpress.js
 */
(function( $, document, window, undefined ) {

	'use strict';

	/**
	 * Set supported prefixes
	 *
	 * @access protected
	 * @return Function to get prefixed property
	 */
	var pfx = (function () {
		var style = document.createElement('dummy').style,
			prefixes = 'Webkit Moz O ms Khtml'.split(' '),
			memory = {};
		return function ( prop ) {
			if ( typeof memory[ prop ] === "undefined" ) {
				var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
					props   = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');
				memory[ prop ] = null;
				for ( var i in props ) {
					if ( style[ props[i] ] !== undefined ) {
						memory[ prop ] = props[i];
						break;
					}
				}
			}
			return memory[ prop ];
		};
	}());

	/**
	 * map ex. "WebkitTransform" to "-webkit-transform"
	 */
	function mapProperty( name ) {
		if(!name) {
			return;
		}
		var index = 1 + name.substr(1).search(/[A-Z]/);
		var prefix = name.substr(0, index).toLowerCase();
		var postfix = name.substr(index).toLowerCase();
		return "-" + prefix + "-" + postfix;
	}
	function addComma( attribute ) {
		if(!attribute) {
			return "";
		}
		return attribute + ",";
	}

	/**
	 * Default Settings
	 */
	var defaults = {
		/* CLASSES */
		stepSelector: '.step'
		,containerClass: ''
		,canvasClass: ''
		,areaClass: ''
		,notSupportedClass: 'not-supported'

		/* CONFIG */
		,fullscreen: true

		/* ANIMATION */
		,animation: {
			transformOrigin: 'top left'
			,transitionProperty: addComma(mapProperty(pfx('transform'))) + addComma(mapProperty(pfx('perspective'))) + 'opacity'
			,transitionDuration: '1s'
			,transitionDelay: '500ms'
			,transitionTimingFunction: 'ease-in-out'
			,transformStyle: "preserve-3d"
		}
		,transitionDuration: 1500
	};
	var callbacks = {
		'beforeChange': 1
		,'beforeInitStep': 1
		,'initStep': 1
		,'beforeInit': 1
		,'afterInit': 1
		,'beforeDeinit': 1
		,'afterDeinit': 1
		,'applyStep': 1
		,'unapplyStep': 1
		,'setInactive': 1
		,'beforeActive': 1
		,'setActive': 1
		,'selectInitialStep': 1
		,'selectPrev': 1
		,'selectNext': 1
		,'selectHome': 1
		,'selectEnd': 1
		,'idle': 1
		,'applyTarget': 1
	};
	for(var callbackName in callbacks) {
		defaults[callbackName] = [];
	}


	/**
	 * Initialize jmpress
	 */
	function init( args ) {
		args = $.extend(true, {}, args || {});

		// accept functions and arrays of functions as callbacks
		var callbackArgs = {};
		var callbackName = null;
		for (callbackName in callbacks) {
			callbackArgs[callbackName] = $.isFunction( args[callbackName] ) ?
				[ args[callbackName] ] :
				args[callbackName];
			args[callbackName] = [];
		}

		// MERGE SETTINGS
		var settings = $.extend(true, {}, defaults, args);

		for (callbackName in callbacks) {
			if (callbackArgs[callbackName]) {
				Array.prototype.push.apply(settings[callbackName], callbackArgs[callbackName]);
			}
		}

		/*** MEMBER VARS ***/

		var jmpress = $( this )
			,container = null
			,area = null
			,oldStyle = {
				container: ""
				,area: ""
			}
			,canvas = null
			,current = null
			,active = false
			,activeSubstep = null
			,activeDelegated = false;


		/*** MEMBER FUNCTIONS ***/
		// functions have to be called with this

		/**
		 * Init a single step
		 *
		 * @param element the element of the step
		 * @param idx number of step
		 */
		function doStepInit( element, idx ) {
			var data = dataset( element );
			var step = {
				oldStyle: $(element).attr("style") || ""
			};

			var callbackData = {
				data: data
				,stepData: step
			};
			callCallback.call(this, 'beforeInitStep', $(element), callbackData);
			step.delegate = data.delegate;
			callCallback.call(this, 'initStep', $(element), callbackData);

			$(element).data('stepData', step);

			if ( !$(element).attr('id') ) {
				$(element).attr('id', 'step-' + (idx + 1));
			}

			callCallback.call(this, 'applyStep', $(element), callbackData);
		}
		/**
		 * Deinit a single step
		 *
		 * @param element the element of the step
		 */
		function doStepDeinit( element ) {
			var stepData = $(element).data('stepData');

			$(element).attr("style", stepData.oldStyle);

			callCallback.call(this, 'unapplyStep', $(element), {
				stepData: stepData
			});
		}
		/**
		 * Reapplies stepData to the element
		 *
		 * @param element
		 */
		function doStepReapply( element ) {
			callCallback.call(this, 'unapplyStep', $(element), {
				stepData: element.data("stepData")
			});

			callCallback.call(this, 'applyStep', $(element), {
				stepData: element.data("stepData")
			});
		}
		/**
		 * Completly deinit jmpress
		 *
		 */
		function deinit() {
			if ( active ) {
				callCallback.call(this, 'setInactive', active, {
					stepData: $(active).data('stepData')
					,reason: "deinit"
				} );
			}
			if (current.jmpressClass) {
				$(jmpress).removeClass(current.jmpressClass);
			}

			callCallback.call(this, 'beforeDeinit', $(this), {});

			$(settings.stepSelector, jmpress).each(function( idx ) {
				doStepDeinit.call(jmpress, this );
			});

			container.attr("style", oldStyle.container);
			if(settings.fullscreen) {
				$("html").attr("style", "");
			}
			area.attr("style", oldStyle.area);
			$(canvas).children().each(function() {
				jmpress.append( $( this ) );
			});
			if( settings.fullscreen ) {
				canvas.remove();
			} else {
				canvas.remove();
				area.remove();
			}

			callCallback.call(this, 'afterDeinit', $(this), {});

			$(jmpress).data("jmpressmethods", false);
		}
		/**
		 * Call a callback
		 *
		 * @param callbackName String callback which should be called
		 * @param element some arguments to the callback
		 * @param eventData
		 */
		function callCallback( callbackName, element, eventData ) {
			eventData.settings = settings;
			eventData.current = current;
			eventData.container = container;
			eventData.parents = element ? getStepParents(element) : null;
			eventData.current = current;
			eventData.jmpress = this;
			var result = {};
			$.each( settings[callbackName], function(idx, callback) {
				result.value = callback.call( jmpress, element, eventData ) || result.value;
			});
			return result.value;
		}
		/**
		 *
		 */
		function getStepParents( el ) {
			return $(el).parentsUntil(jmpress).not(jmpress).filter(settings.stepSelector);
		}
		/**
		 * Reselect the active step
		 *
		 * @param String type reason of reselecting step
		 */
		function reselect( type ) {
			return select( { step: active, substep: activeSubstep }, type);
		}
		/**
		 * Select a given step
		 *
		 * @param el element to select
		 * @param type reason of changing step
		 * @return Object element selected
		 */
		function select( el, type ) {
			var substep;
			if ( $.isPlainObject( el ) ) {
				substep = el.substep;
				el = el.step;
			}
			if ( typeof el === 'string') {
				el = jmpress.find( el ).first();
			}
			if ( !el || !$(el).data('stepData') ) {
				return false;
			}

			// Sometimes it's possible to trigger focus on first link with some keyboard action.
			// Browser in such a case tries to scroll the page to make this element visible
			// (even that body overflow is set to hidden) and it breaks our careful positioning.
			//
			// So, as a lousy (and lazy) workaround we will make the page scroll back to the top
			// whenever slide is selected
			//
			// If you are reading this and know any better way to handle it, I'll be glad to hear about it!
			scrollFix.call(this);

			var step = $(el).data('stepData');

			var cancelSelect = false;
			callCallback.call(this, "beforeChange", el, {
				stepData: step
				,reason: type
				,cancel: function() {
					cancelSelect = true;
				}
			});
			if (cancelSelect) {
				return undefined;
			}

			var target = {};

			var delegated = el;
			if($(el).data("stepData").delegate) {
				delegated = $(el).parentsUntil(jmpress).filter(settings.stepSelector).filter(step.delegate) ||
					$(el).near(step.delegate) ||
					$(el).near(step.delegate, true) ||
					$(step.delegate, jmpress);
				step = delegated.data("stepData");
			}
			if ( activeDelegated ) {
				callCallback.call(this, 'setInactive', activeDelegated, {
					stepData: $(activeDelegated).data('stepData')
					,delegatedFrom: active
					,reason: type
					,target: target
					,nextStep: delegated
					,nextSubstep: substep
					,nextStepData: step
				} );
			}
			var callbackData = {
				stepData: step
				,delegatedFrom: el
				,reason: type
				,target: target
				,substep: substep
				,prevStep: activeDelegated
				,prevSubstep: activeSubstep
				,prevStepData: activeDelegated && $(activeDelegated).data('stepData')
			};
			callCallback.call(this, 'beforeActive', delegated, callbackData);
			callCallback.call(this, 'setActive', delegated, callbackData);

			// Set on step class on root element
			if (current.jmpressClass) {
				$(jmpress).removeClass(current.jmpressClass);
			}
			$(jmpress).addClass(current.jmpressClass = 'step-' + $(delegated).attr('id') );
			if (current.jmpressDelegatedClass) {
				$(jmpress).removeClass(current.jmpressDelegatedClass);
			}
			$(jmpress).addClass(current.jmpressDelegatedClass = 'delegating-step-' + $(el).attr('id') );

			callCallback.call(this, "applyTarget", delegated, $.extend({
				canvas: canvas
				,area: area
				,beforeActive: activeDelegated
			}, callbackData));

			active = el;
			activeSubstep = callbackData.substep;
			activeDelegated = delegated;

			if(current.idleTimeout) {
				clearTimeout(current.idleTimeout);
			}
			current.idleTimeout = setTimeout(function() {
				callCallback.call(this, 'idle', delegated, callbackData);
			}, Math.max(1, settings.transitionDuration - 100));

			return delegated;
		}
		/**
		 * This should fix ANY kind of buggy scrolling
		 */
		function scrollFix() {
			function fix() {
				if ($(container)[0].tagName === "BODY") {
					window.scrollTo(0, 0);
				}
				$(container).scrollTop(0);
				$(container).scrollLeft(0);
				function check() {
					if ($(container).scrollTop() !== 0 ||
						$(container).scrollLeft() !== 0) {
							fix();
						}
				}
				setTimeout(check, 1);
				setTimeout(check, 10);
				setTimeout(check, 100);
				setTimeout(check, 200);
				setTimeout(check, 400);
			}
			fix();
		}
		/**
		 * Alias for select
		 */
		function goTo( el ) {
			return select.call(this, el, "jump" );
		}
		/**
		 * Goto Next Slide
		 *
		 * @return Object newly active slide
		 */
		function next() {
			return select.call(this, callCallback.call(this, 'selectNext', active, {
				stepData: $(active).data('stepData')
				,substep: activeSubstep
			}), "next" );
		}
		/**
		 * Goto Previous Slide
		 *
		 * @return Object newly active slide
		 */
		function prev() {
			return select.call(this, callCallback.call(this, 'selectPrev', active, {
				stepData: $(active).data('stepData')
				,substep: activeSubstep
			}), "prev" );
		}
		/**
		 * Goto First Slide
		 *
		 * @return Object newly active slide
		 */
		function home() {
			return select.call(this, callCallback.call(this, 'selectHome', active, {
				stepData: $(active).data('stepData')
			}), "home" );
		}
		/**
		 * Goto Last Slide
		 *
		 * @return Object newly active slide
		 */
		function end() {
			return select.call(this,   callCallback.call(this, 'selectEnd', active, {
				stepData: $(active).data('stepData')
			}), "end" );
		}
		/**
		 * Manipulate the canvas
		 *
		 * @param props
		 * @return Object
		 */
		function canvasMod( props ) {
			css(canvas, props || {});
			return $(canvas);
		}
		/**
		 * Return current step
		 *
		 * @return Object
		 */
		function getActive() {
			return activeDelegated && $(activeDelegated);
		}
		/**
		 * fire a callback
		 *
		 * @param callbackName
		 * @param element
		 * @param eventData
		 * @return void
		 */
		function fire( callbackName, element, eventData ) {
			if( !callbacks[callbackName] ) {
				$.error( "callback " + callbackName + " is not registered." );
			} else {
				return callCallback.call(this, callbackName, element, eventData);
			}
		}

		/**
		 * PUBLIC METHODS LIST
		 */
		jmpress.data("jmpressmethods", {
			select: select
			,reselect: reselect
			,scrollFix: scrollFix
			,goTo: goTo
			,next: next
			,prev: prev
			,home: home
			,end: end
			,canvas: canvasMod
			,container: function() { return container; }
			,settings: function() { return settings; }
			,active: getActive
			,current: function() { return current; }
			,fire: fire
			,init: function(step) {
				doStepInit.call(this, $(step), current.nextIdNumber++);
			}
			,deinit: function(step) {
				if(step) {
					doStepDeinit.call(this, $(step));
				} else {
					deinit.call(this);
				}
			}
			,reapply: doStepReapply
		});

		/**
		 * Check for support
		 * This will be removed in near future, when support is coming
		 *
		 * @access protected
		 * @return void
		 */
		function checkSupport() {
			var ua = navigator.userAgent.toLowerCase();
			var supported = ( ua.search(/(iphone)|(ipod)|(android)/) === -1 );
			return supported;
		}

		// BEGIN INIT

		// CHECK FOR SUPPORT
		if (checkSupport() === false) {
			if (settings.notSupportedClass) {
				jmpress.addClass(settings.notSupportedClass);
			}
			return;
		} else {
			if (settings.notSupportedClass) {
				jmpress.removeClass(settings.notSupportedClass);
			}
		}

		// grabbing all steps
		var steps = $(settings.stepSelector, jmpress);

		// GERNERAL INIT OF FRAME
		container = jmpress;
		area = $('<div />');
		canvas = $('<div />');
		$(jmpress).children().filter(steps).each(function() {
			canvas.append( $( this ) );
		});
		if(settings.fullscreen) {
			container = $('body');
			$("html").css({
				overflow: 'hidden'
			});
			area = jmpress;
		}
		oldStyle.area = area.attr("style") || "";
		oldStyle.container = container.attr("style") || "";
		if(settings.fullscreen) {
			container.css({
				height: '100%'
			});
			jmpress.append( canvas );
		} else {
			container.css({
				position: "relative"
			});
			area.append( canvas );
			jmpress.append( area );
		}

		$(container).addClass(settings.containerClass);
		$(area).addClass(settings.areaClass);
		$(canvas).addClass(settings.canvasClass);

		document.documentElement.style.height = "100%";
		container.css({
			overflow: 'hidden'
		});

		var props = {
			position: "absolute"
			,transitionDuration: '0s'
		};
		props = $.extend({}, settings.animation, props);
		css(area, props);
		css(area, {
			top: '50%'
			,left: '50%'
			,perspective: '1000px'
		});
		css(canvas, props);

		current = {};

		callCallback.call(this, 'beforeInit', null, {});

		// INITIALIZE EACH STEP
		steps.each(function( idx ) {
			doStepInit.call(jmpress, this, idx );
		});
		current.nextIdNumber = steps.length;

		callCallback.call(this, 'afterInit', null, {});

		// START
		select.call(this,  callCallback.call(this, 'selectInitialStep', "init", {}) );

		if (settings.initClass) {
			$(steps).removeClass(settings.initClass);
		}
	}
	/**
	 * Return default settings
	 *
	 * @return Object
	 */
	function getDefaults() {
		return defaults;
	}
	/**
	 * Register a callback or a jmpress function
	 *
	 * @access public
	 * @param name String the name of the callback or function
	 * @param func Function? the function to be added
	 */
	function register(name, func) {
		if( $.isFunction(func) ) {
			if( methods[name] ) {
				$.error( "function " + name + " is already registered." );
			} else {
				methods[name] = func;
			}
		} else {
			if( callbacks[name] ) {
				$.error( "callback " + name + " is already registered." );
			} else {
				callbacks[name] = 1;
				defaults[name] = [];
			}
		}
	}
	/**
	 * Set CSS on element w/ prefixes
	 *
	 * @return Object element which properties were set
	 *
	 * TODO: Consider bypassing pfx and blindly set as jQuery
	 * already checks for support
	 */
	function css( el, props ) {
		var key, pkey, cssObj = {};
		for ( key in props ) {
			if ( props.hasOwnProperty(key) ) {
				pkey = pfx(key);
				if ( pkey !== null ) {
					cssObj[pkey] = props[key];
				}
			}
		}
		$(el).css(cssObj);
		return el;
	}
	/**
	 * Return dataset for element
	 *
	 * @param el element
	 * @return Object
	 */
	function dataset( el ) {
		if ( $(el)[0].dataset ) {
			return $.extend({}, $(el)[0].dataset);
		}
		function toCamelcase( str ) {
			str = str.split( '-' );
			for( var i = 1; i < str.length; i++ ) {
				str[i] = str[i].substr(0, 1).toUpperCase() + str[i].substr(1);
			}
			return str.join( '' );
		}
		var returnDataset = {};
		var attrs = $(el)[0].attributes;
		$.each(attrs, function ( idx, attr ) {
			if ( attr.nodeName.substr(0, 5) === "data-" ) {
				returnDataset[ toCamelcase(attr.nodeName.substr(5)) ] = attr.nodeValue;
			}
		});
		return returnDataset;
	}
	/**
	 * Returns true, if jmpress is initialized
	 *
	 * @return bool
	 */
	function initialized() {
		return !!$(this).data("jmpressmethods");
	}


	/**
	 * PUBLIC STATIC METHODS LIST
	 */
	var methods = {
		init: init
		,initialized: initialized
		,deinit: function() {}
		,css: css
		,pfx: pfx
		,defaults: getDefaults
		,register: register
		,dataset: dataset
	};

	/**
	 * $.jmpress()
	 */
	$.fn.jmpress = function( method ) {
		function f() {
			var jmpressmethods = $(this).data("jmpressmethods");
			if ( jmpressmethods && jmpressmethods[method] ) {
				return jmpressmethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( methods[method] ) {
				return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( callbacks[method] && jmpressmethods ) {
				var settings = jmpressmethods.settings();
				var func = Array.prototype.slice.call( arguments, 1 )[0];
				if ($.isFunction( func )) {
					settings[method] = settings[method] || [];
					settings[method].push(func);
				}
			} else if ( typeof method === 'object' || ! method ) {
				return init.apply( this, arguments );
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.jmpress' );
			}
			// to allow chaining
			return this;
		}
		var args = arguments;
		var result;
		$(this).each(function(idx, element) {
			result = f.apply(element, args);
		});
		return result;
	};
	$.extend({
		jmpress: function( method ) {
			if ( methods[method] ) {
				return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( callbacks[method] ) {
				// plugin interface
				var func = Array.prototype.slice.call( arguments, 1 )[0];
				if ($.isFunction( func )) {
					defaults[method].push(func);
				} else {
					$.error( 'Second parameter should be a function: $.jmpress( callbackName, callbackFunction )' );
				}
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.jmpress' );
			}
		}
	});

}(jQuery, document, window));
/*!
 * near.js
 * Find steps near each other
 */
(function( $, document, window, undefined ) {

	'use strict';

	// add near( selector, backwards = false) to jquery


	function checkAndGo( elements, func, selector, backwards ) {
		var next;
		elements.each(function(idx, element) {
			if(backwards) {
				next = func(element, selector, backwards);
				if (next) {
					return false;
				}
			}
			if( $(element).is(selector) ) {
				next = element;
				return false;
			}
			if(!backwards) {
				next = func(element, selector, backwards);
				if (next) {
					return false;
				}
			}
		});
		return next;
	}
	function findNextInChildren(item, selector, backwards) {
		var children = $(item).children();
		if(backwards) {
			children = $(children.get().reverse());
		}
		return checkAndGo( children, findNextInChildren, selector, backwards );
	}
	function findNextInSiblings(item, selector, backwards) {
		return checkAndGo(
			$(item)[backwards ? "prevAll" : "nextAll"](),
			findNextInChildren, selector, backwards );
	}
	function findNextInParents(item, selector, backwards) {
		var next;
		var parents = $(item).parents();
		parents = $(parents.get());
		$.each(parents.get(), function(idx, element) {
			if( backwards && $(element).is(selector) ) {
				next = element;
				return false;
			}
			next = findNextInSiblings(element, selector, backwards);
			if(next) {
				return false;
			}
		});
		return next;
	}

	$.fn.near = function( selector, backwards ) {
		var array = [];
		$(this).each(function(idx, element) {
			var near = (backwards ?
					false :
					findNextInChildren( element, selector, backwards )) ||
				findNextInSiblings( element, selector, backwards ) ||
				findNextInParents( element, selector, backwards );
			if( near ) {
				array.push(near);
			}
		});
		return $(array);
	};
}(jQuery, document, window));
/*!
 * transform.js
 * The engine that powers the transforms or falls back to other methods
 */
(function( $, document, window, undefined ) {

	'use strict';

	/* FUNCTIONS */
	function randomString() {
		return "" + Math.round(Math.random() * 100000, 0);
	}
	function toCssNumber(number) {
		return (Math.round(10000*number)/10000)+"";
	}

	/**
	 * 3D and 2D engines
	 */
	var engines = {
		3: {
			transform: function( el, data ) {
				var transform = 'translate(-50%,-50%)';
				$.each(data, function(idx, item) {
					var coord = ["X", "Y", "Z"];
					var i;
					if(item[0] === "translate") { // ["translate", x, y, z]
						transform += " translate3d(" + toCssNumber(item[1] || 0) + "px," + toCssNumber(item[2] || 0) + "px," + toCssNumber(item[3] || 0) + "px)";
					} else if(item[0] === "rotate") {
						var order = item[4] ? [1, 2, 3] : [3, 2, 1];
						for(i = 0; i < 3; i++) {
							transform += " rotate" + coord[order[i]-1] + "(" + toCssNumber(item[order[i]] || 0) + "deg)";
						}
					} else if(item[0] === "scale") {
						for(i = 0; i < 3; i++) {
							transform += " scale" + coord[i] + "(" + toCssNumber(item[i+1] || 1) + ")";
						}
					}
				});
				$.jmpress("css", el, $.extend({}, { transform: transform }));
			}
		}
		,2: {
			transform: function( el, data ) {
				var transform = 'translate(-50%,-50%)';
				$.each(data, function(idx, item) {
					var coord = ["X", "Y"];
					if(item[0] === "translate") { // ["translate", x, y, z]
						transform += " translate(" + toCssNumber(item[1] || 0) + "px," + toCssNumber(item[2] || 0) + "px)";
					} else if(item[0] === "rotate") {
						transform += " rotate(" + toCssNumber(item[3] || 0) + "deg)";
					} else if(item[0] === "scale") {
						for(var i = 0; i < 2; i++) {
							transform += " scale" + coord[i] + "(" + toCssNumber(item[i+1] || 1) + ")";
						}
					}
				});
				$.jmpress("css", el, $.extend({}, { transform: transform }));
			}
		}
		,1: {
			// CHECK IF SUPPORT IS REALLY NEEDED?
			// this not even work without scaling...
			// it may better to display the normal view
			transform: function( el, data ) {
				var anitarget = { top: 0, left: 0 };
				$.each(data, function(idx, item) {
					var coord = ["X", "Y"];
					if(item[0] === "translate") { // ["translate", x, y, z]
						anitarget.left = Math.round(item[1] || 0) + "px";
						anitarget.top = Math.round(item[2] || 0) + "px";
					}
				});
				el.animate(anitarget, 1000); // TODO: Use animation duration
			}
		}
	};

	/**
	 * Engine to power cross-browser translate, scale and rotate.
	 */
	var engine = (function() {
		if ($.jmpress("pfx", "perspective")) {
			return engines[3];
		} else if ($.jmpress("pfx", "transform")) {
			return engines[2];
		} else {
			// CHECK IF SUPPORT IS REALLY NEEDED?
			return engines[1];
		}
	}());

	$.jmpress("defaults").reasonableAnimation = {};
	$.jmpress("initStep", function( step, eventData ) {
		var data = eventData.data;
		var stepData = eventData.stepData;
		var pf = parseFloat;
		$.extend(stepData, {
			x: pf(data.x) || 0
			,y: pf(data.y) || 0
			,z: pf(data.z) || 0
			,r: pf(data.r) || 0
			,phi: pf(data.phi) || 0
			,rotate: pf(data.rotate) || 0
			,rotateX: pf(data.rotateX) || 0
			,rotateY: pf(data.rotateY) || 0
			,rotateZ: pf(data.rotateZ) || 0
			,revertRotate: false
			,scale: pf(data.scale) || 1
			,scaleX: pf(data.scaleX) || false
			,scaleY: pf(data.scaleY) || false
			,scaleZ: pf(data.scaleZ) || 1
		});
	});
	$.jmpress("afterInit", function( nil, eventData ) {
		var stepSelector = eventData.settings.stepSelector,
			current = eventData.current;
		current.perspectiveScale = 1;
		current.maxNestedDepth = 0;
		var nestedSteps = $(eventData.jmpress).find(stepSelector).children(stepSelector);
		while(nestedSteps.length) {
			current.maxNestedDepth++;
			nestedSteps = nestedSteps.children(stepSelector);
		}
	});
	$.jmpress("applyStep", function( step, eventData ) {
		$.jmpress("css", $(step), {
			position: "absolute"
			,transformStyle: "preserve-3d"
		});
		if ( eventData.parents.length > 0 ) {
			$.jmpress("css", $(step), {
				top: "50%"
				,left: "50%"
			});
		}
		var sd = eventData.stepData;
		var transform = [
			["translate",
				sd.x || (sd.r * Math.sin(sd.phi*Math.PI/180)),
				sd.y || (-sd.r * Math.cos(sd.phi*Math.PI/180)),
				sd.z],
			["rotate",
				sd.rotateX,
				sd.rotateY,
				sd.rotateZ || sd.rotate,
				true],
			["scale",
				sd.scaleX || sd.scale,
				sd.scaleY || sd.scale,
				sd.scaleZ || sd.scale]
		];
		engine.transform( step, transform );
	});
	$.jmpress("setActive", function( element, eventData ) {
		var target = eventData.target;
		var step = eventData.stepData;
		var tf = target.transform = [];
		target.perspectiveScale = 1;

		for(var i = eventData.current.maxNestedDepth; i > (eventData.parents.length || 0); i--) {
			tf.push(["scale"], ["rotate"], ["translate"]);
		}

		tf.push(["scale",
			1 / (step.scaleX || step.scale),
			1 / (step.scaleY || step.scale),
			1 / (step.scaleZ)]);
		tf.push(["rotate",
			-step.rotateX,
			-step.rotateY,
			-(step.rotateZ || step.rotate)]);
		tf.push(["translate",
			-(step.x || (step.r * Math.sin(step.phi*Math.PI/180))),
			-(step.y || (-step.r * Math.cos(step.phi*Math.PI/180))),
			-step.z]);
		target.perspectiveScale *= (step.scaleX || step.scale);

		$.each(eventData.parents, function(idx, element) {
			var step = $(element).data("stepData");
			tf.push(["scale",
				1 / (step.scaleX || step.scale),
				1 / (step.scaleY || step.scale),
				1 / (step.scaleZ)]);
			tf.push(["rotate",
				-step.rotateX,
				-step.rotateY,
				-(step.rotateZ || step.rotate)]);
			tf.push(["translate",
				-(step.x || (step.r * Math.sin(step.phi*Math.PI/180))),
				-(step.y || (-step.r * Math.cos(step.phi*Math.PI/180))),
				-step.z]);
			target.perspectiveScale *= (step.scaleX || step.scale);
		});

		$.each(tf, function(idx, item) {
			if(item[0] !== "rotate") {
				return;
			}
			function lowRotate(name) {
				if(eventData.current["rotate"+name+"-"+idx] === undefined) {
					eventData.current["rotate"+name+"-"+idx] = item[name] || 0;
				}
				var cur = eventData.current["rotate"+name+"-"+idx], tar = item[name] || 0,
					curmod = cur % 360, tarmod = tar % 360;
				if(curmod < 0) {
					curmod += 360;
				}
				if(tarmod < 0) {
					tarmod += 360;
				}
				var diff = tarmod - curmod;
				if(diff < -180) {
					diff += 360;
				} else if(diff > 180) {
					diff -= 360;
				}
				eventData.current["rotate"+name+"-"+idx] = item[name] = cur + diff;
			}
			lowRotate(1);
			lowRotate(2);
			lowRotate(3);
		});
	});
	$.jmpress("applyTarget", function( active, eventData ) {

		var target = eventData.target,
			props, step = eventData.stepData,
			settings = eventData.settings,
			zoomin = target.perspectiveScale * 1.3 < eventData.current.perspectiveScale,
			zoomout = target.perspectiveScale > eventData.current.perspectiveScale * 1.3;

		// extract first scale from transform
		var lastScale = -1;
		$.each(target.transform, function(idx, item) {
			if(item.length <= 1) {
				return;
			}
			if(item[0] === "rotate" &&
				item[1] % 360 === 0  &&
				item[2] % 360 === 0  &&
				item[3] % 360 === 0) {
				return;
			}
			if(item[0] === "scale") {
				lastScale = idx;
			} else {
				return false;
			}
		});

		if(lastScale !== eventData.current.oldLastScale) {
			zoomin = zoomout = false;
			eventData.current.oldLastScale = lastScale;
		}

		var extracted = [];
		if(lastScale !== -1) {
			while(lastScale >= 0) {
				if(target.transform[lastScale][0] === "scale") {
					extracted.push(target.transform[lastScale]);
					target.transform[lastScale] = ["scale"];
				}
				lastScale--;
			}
		}

		var animation = settings.animation;
		if(settings.reasonableAnimation[eventData.reason]) {
			animation = $.extend({},
				animation,
				settings.reasonableAnimation[eventData.reason]);
		}

		props = {
			// to keep the perspective look similar for different scales
			// we need to 'scale' the perspective, too
			perspective: Math.round(target.perspectiveScale * 1000) + "px"
		};
		props = $.extend({}, animation, props);
		if (!zoomin) {
			props.transitionDelay = '0s';
		}
		if (!eventData.beforeActive) {
			props.transitionDuration = '0s';
			props.transitionDelay = '0s';
		}
		$.jmpress("css", eventData.area, props);
		engine.transform(eventData.area, extracted);

		props = $.extend({}, animation);
		if (!zoomout) {
			props.transitionDelay = '0s';
		}
		if (!eventData.beforeActive) {
			props.transitionDuration = '0s';
			props.transitionDelay = '0s';
		}

		eventData.current.perspectiveScale = target.perspectiveScale;

		$.jmpress("css", eventData.canvas, props);
		engine.transform(eventData.canvas, target.transform);
	});

}(jQuery, document, window));
/*!
 * active.js
 * Set the active classes on steps
 */
(function( $, document, window, undefined ) {

	'use strict';
	var $jmpress = $.jmpress;

	/* DEFINES */
	var activeClass = 'activeClass',
		nestedActiveClass = 'nestedActiveClass';

	/* DEFAULTS */
	var defaults = $jmpress( 'defaults' );
	defaults[nestedActiveClass] = "nested-active";
	defaults[activeClass]       = "active";

	/* HOOKS */
	$jmpress( 'setInactive', function( step, eventData ) {
		var settings = eventData.settings,
			activeClassSetting = settings[activeClass],
			nestedActiveClassSettings = settings[nestedActiveClass];
		if(activeClassSetting) {
			$(step).removeClass( activeClassSetting );
		}
		if(nestedActiveClassSettings) {
			$.each(eventData.parents, function(idx, element) {
				$(element).removeClass(nestedActiveClassSettings);
			});
		}
	});
	$jmpress( 'setActive', function( step, eventData ) {
		var settings = eventData.settings,
			activeClassSetting = settings[activeClass],
			nestedActiveClassSettings = settings[nestedActiveClass];
		if(activeClassSetting) {
			$(step).addClass( activeClassSetting );
		}
		if(nestedActiveClassSettings) {
			$.each(eventData.parents, function(idx, element) {
				$(element).addClass(nestedActiveClassSettings);
			});
		}
	});

}(jQuery, document, window));
/*!
 * circular.js
 * Repeat from start after end
 */
(function( $, document, window, undefined ) {

	'use strict';
	var $jmpress = $.jmpress;

	/* FUNCTIONS */
	function firstSlide( step, eventData ) {
		return $(this).find(eventData.settings.stepSelector).first();
	}
	function prevOrNext( jmpress, step, eventData, prev) {
		if (!step) {
			return false;
		}
		var stepSelector = eventData.settings.stepSelector;
		step = $(step);
		do {
			var item = step.near( stepSelector, prev );
			if (item.length === 0 || item.closest(jmpress).length === 0) {
				item = $(jmpress).find(stepSelector)[prev?"last":"first"]();
			}
			if (!item.length) {
				return false;
			}
			step = item;
		} while( step.data("stepData").exclude );
		return step;
	}

	/* HOOKS */
	$jmpress( 'initStep', function( step, eventData ) {
		eventData.stepData.exclude = eventData.data.exclude && ["false", "no"].indexOf(eventData.data.exclude) === -1;
	});
	$jmpress( 'selectInitialStep', firstSlide);
	$jmpress( 'selectHome', firstSlide);
	$jmpress( 'selectEnd', function( step, eventData ) {
		return $(this).find(eventData.settings.stepSelector).last();
	});
	$jmpress( 'selectPrev', function( step, eventData ) {
		return prevOrNext(this, step, eventData, true);
	});
	$jmpress( 'selectNext', function( step, eventData ) {
		return prevOrNext(this, step, eventData);
	});
}(jQuery, document, window));
/*!
 * hash.js
 * Detect and set the URL hash
 */
(function( $, document, window, undefined ) {

	'use strict';
	var $jmpress = $.jmpress,
		hashLink = "a[href^=#]";

	/* FUNCTIONS */
	function randomString() {
		return "" + Math.round(Math.random() * 100000, 0);
	}
	/**
	 * getElementFromUrl
	 *
	 * @return String or undefined
	 */
	function getElementFromUrl(settings) {
		// get id from url # by removing `#` or `#/` from the beginning,
		// so both "fallback" `#slide-id` and "enhanced" `#/slide-id` will work
		// TODO SECURITY check user input to be valid!
		try {
			var el = $( '#' + window.location.hash.replace(/^#\/?/,"") );
			return el.length > 0 && el.is(settings.stepSelector) ? el : undefined;
		} catch(e) {}
	}
	function setHash(stepid) {
		var shouldBeHash = "#/" + stepid;
		if(window.history && window.history.pushState) {
			// shouldBeHash = "#" + stepid;
			// consider this for future versions
			//  it has currently issues, when startup with a link with hash (webkit)
			if(window.location.hash !== shouldBeHash) {
				window.history.pushState({}, '', shouldBeHash);
			}
		} else {
			if(window.location.hash !== shouldBeHash) {
				window.location.hash = shouldBeHash;
			}
		}
	}

	/* DEFAULTS */
	$jmpress('defaults').hash = {
		use: true
		,update: true
		,bindChange: true
		// NOTICE: {use: true, update: false, bindChange: true}
		// will cause a error after clicking on a link to the current step
	};

	/* HOOKS */
	$jmpress('selectInitialStep', function( step, eventData ) {
		var settings = eventData.settings,
			hashSettings = settings.hash,
			current = eventData.current,
			jmpress = $(this);
		eventData.current.hashNamespace = ".jmpress-"+randomString();
		// HASH CHANGE EVENT
		if ( hashSettings.use ) {
			if ( hashSettings.bindChange ) {
				$(window).bind('hashchange'+current.hashNamespace, function(event) {
					var urlItem = getElementFromUrl(settings);
					if ( jmpress.jmpress('initialized') ) {
						jmpress.jmpress("scrollFix");
					}
					if(urlItem && urlItem.length) {
						if(urlItem.attr("id") !== jmpress.jmpress("active").attr("id")) {
							jmpress.jmpress('select', urlItem);
						}
						setHash(urlItem.attr("id"));
					}
					event.preventDefault();
				});
				$(hashLink).on("click"+current.hashNamespace, function(event) {
					var href = $(this).attr("href");
					try {
						if($(href).is(settings.stepSelector)) {
							jmpress.jmpress("select", href);
							event.preventDefault();
							event.stopPropagation();
						}
					} catch(e) {}
				});
			}
			return getElementFromUrl(settings);
		}
	});
	$jmpress('afterDeinit', function( nil, eventData ) {
		$(hashLink).off(eventData.current.hashNamespace);
		$(window).unbind(eventData.current.hashNamespace);
	});
	$jmpress('setActive', function( step, eventData ) {
		var settings = eventData.settings,
			current = eventData.current;
		// `#/step-id` is used instead of `#step-id` to prevent default browser
		// scrolling to element in hash
		if ( settings.hash.use && settings.hash.update ) {
			clearTimeout(current.hashtimeout);
			current.hashtimeout = setTimeout(function() {
				setHash($(eventData.delegatedFrom).attr('id'));
			}, settings.transitionDuration + 200);
		}
	});

}(jQuery, document, window));
/*!
 * keyboard.js
 * Keyboard event mapping and default keyboard actions
 */
(function( $, document, window, undefined ) {

	'use strict';
	var $jmpress = $.jmpress,
		jmpressNext = "next",
		jmpressPrev = "prev";

	/* FUNCTIONS */
	function randomString() {
		return "" + Math.round(Math.random() * 100000, 0);
	}
	function stopEvent(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	/* DEFAULTS */
	$jmpress('defaults').keyboard = {
		use: true
		,keys: {
			33: jmpressPrev // pg up
			,37: jmpressPrev // left
			,38: jmpressPrev // up

			,9: jmpressNext+":"+jmpressPrev // tab
			,32: jmpressNext // space
			,34: jmpressNext // pg down
			,39: jmpressNext // right
			,40: jmpressNext // down

			,36: "home" // home

			,35: "end" // end
		}
		,ignore: {
			"INPUT": [
				32 // space
				,37 // left
				,38 // up
				,39 // right
				,40 // down
			]
			,"TEXTAREA": [
				32 // space
				,37 // left
				,38 // up
				,39 // right
				,40 // down
			]
			,"SELECT": [
				38 // up
				,40 // down
			]
		}
		,tabSelector: "a[href]:visible, :input:visible"
	};

	/* HOOKS */
	$jmpress('afterInit', function( nil, eventData ) {
		var settings = eventData.settings,
			keyboardSettings = settings.keyboard,
			ignoreKeyboardSettings = keyboardSettings.ignore,
			current = eventData.current,
			jmpress = $(this);

		// tabindex make it focusable so that it can recieve key events
		if(!settings.fullscreen) {
			jmpress.attr("tabindex", 0);
		}

		current.keyboardNamespace = ".jmpress-"+randomString();

		// KEYPRESS EVENT: this fixes a Opera bug
		$(settings.fullscreen ? document : jmpress)
			.bind("keypress"+current.keyboardNamespace, function( event ) {

			for( var nodeName in ignoreKeyboardSettings ) {
				if ( event.target.nodeName === nodeName && ignoreKeyboardSettings[nodeName].indexOf(event.which) !== -1 ) {
					return;
				}
			}
			if(event.which >= 37 && event.which <= 40 || event.which === 32) {
				stopEvent(event);
			}
		});
		// KEYDOWN EVENT
		$(settings.fullscreen ? document : jmpress)
			.bind("keydown"+current.keyboardNamespace, function( event ) {
			var eventTarget = $(event.target);

			if ( !settings.fullscreen && !eventTarget.closest(jmpress).length || !keyboardSettings.use ) {
				return;
			}

			for( var nodeName in ignoreKeyboardSettings ) {
				if ( eventTarget[0].nodeName === nodeName && ignoreKeyboardSettings[nodeName].indexOf(event.which) !== -1 ) {
					return;
				}
			}

			var reverseSelect = false;
			var nextFocus;
			if (event.which === 9) {
				// tab
				if ( !eventTarget.closest( jmpress.jmpress('active') ).length ) {
					if ( !event.shiftKey ) {
						nextFocus = jmpress.jmpress('active').find("a[href], :input").filter(":visible").first();
					} else {
						reverseSelect = true;
					}
				} else {
					nextFocus = eventTarget.near( keyboardSettings.tabSelector, event.shiftKey );
					if( !$(nextFocus)
						.closest( settings.stepSelector )
						.is(jmpress.jmpress('active') ) ) {
						nextFocus = undefined;
					}
				}
				if( nextFocus && nextFocus.length > 0 ) {
					nextFocus.focus();
					jmpress.jmpress("scrollFix");
					stopEvent(event);
					return;
				} else {
					if(event.shiftKey) {
						reverseSelect = true;
					}
				}
			}

			var action = keyboardSettings.keys[ event.which ];
			if ( typeof action === "string" ) {
				if (action.indexOf(":") !== -1) {
					action = action.split(":");
					action = event.shiftKey ? action[1] : action[0];
				}
				jmpress.jmpress( action );
				stopEvent(event);
			} else if ( $.isFunction(action) ) {
				action.call(jmpress, event);
			} else if ( action ) {
				jmpress.jmpress.apply( jmpress, action );
				stopEvent(event);
			}

			if (reverseSelect) {
				// tab
				nextFocus = jmpress.jmpress('active').find("a[href], :input").filter(":visible").last();
				nextFocus.focus();
				jmpress.jmpress("scrollFix");
			}
		});
	});
	$jmpress('afterDeinit', function( nil, eventData ) {
		$(document).unbind(eventData.current.keyboardNamespace);
	});


}(jQuery, document, window));
/*!
 * mouse.js
 * Clicking to select a step
 */
(function( $, document, window, undefined ) {

	'use strict';
	var $jmpress = $.jmpress;

	/* FUNCTIONS */
	function randomString() {
		return "" + Math.round(Math.random() * 100000, 0);
	}

	/* DEFAULTS */
	$jmpress("defaults").mouse = {
		clickSelects: true
	};

	/* HOOKS */
	$jmpress("afterInit", function( nil, eventData ) {
		var settings = eventData.settings,
			stepSelector = settings.stepSelector,
			current = eventData.current,
			jmpress = $(this);
		current.clickableStepsNamespace = ".jmpress-"+randomString();
		jmpress.bind("click"+current.clickableStepsNamespace, function(event) {
			if (!settings.mouse.clickSelects || current.userZoom) {
				return;
			}

			// get clicked step
			var clickedStep = $(event.target).closest(stepSelector);

			// clicks on the active step do default
			if ( clickedStep.is( jmpress.jmpress("active") ) ) {
				return;
			}

			if (clickedStep.length) {
				// select the clicked step
				jmpress.jmpress("select", clickedStep[0], "click");
				event.preventDefault();
				event.stopPropagation();
			}
		});
	});
	$jmpress('afterDeinit', function( nil, eventData ) {
		$(this).unbind(eventData.current.clickableStepsNamespace);
	});

}(jQuery, document, window));