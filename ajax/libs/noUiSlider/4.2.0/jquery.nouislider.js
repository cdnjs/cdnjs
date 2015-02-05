/** noUiSlider
 ** @author: Léon Gersen
 ** @documentation: http://refreshless.com/nouislider/
 **/
/*jslint browser: true, devel: true, plusplus: true, white: true, unparam: true */
(function( $, undefined ){

	"use strict";

	if ( $.zepto && !$.fn.removeData ) {
		throw new ReferenceError("Zepto is loaded without the data module.");
	}

	$.fn.noUiSlider = function( options ){

		var  namespace = '.nui'
			// Create a shorthand for document event binding.
			,all = $(document)
			// Create a map of touch and mouse actions.
			,actions = {
				 start: 'mousedown touchstart'
				,move: 'mousemove touchmove'
				,end: 'mouseup touchend'
			}
			// Make a copy of the current 'val' function.
			,$VAL = $.fn.val
			// Define a set of standard HTML classes for
			// the various structures noUiSlider uses.
			,clsList = [
				 'noUi-base'		// 0
				,'noUi-origin'		// 1
				,'noUi-handle'		// 2
				,'noUi-input'		// 3
				,'noUi-active'		// 4
				,'noUi-state-tap'	// 5
				,'noUi-target'		// 6
				,'-lower'			// 7
				,'-upper'			// 8
				,'noUi-connect'		// 9
				,'noUi-vertical'	// 10
				,'noUi-horizontal'	// 11
				,'noUi-background'	// 12
				,'noUi-z-index'		// 13
			]
			// Define an extendible object with base classes for the various
			// structure elements in the slider. These can be extended by simply
			// pushing to the array, which reduces '.addClass()' calls.
			,stdCls = {
				 base: [clsList[0]]
				,origin: [clsList[1]]
				,handle: [clsList[2]]
			}
			// This object contains some well tested functions to convert
			// values to and from percentages. It can be a bit strange to wrap
			// your head around the individual calls, but they'll do their job
			// with all positive and negative input values.
			,percentage = {
				 to: function ( range, value ) {
					value = range[0] < 0 ? value + Math.abs(range[0]) : value - range[0];
					return (value * 100) / this.len(range);
				}
				,from: function ( range, value ) {
					return (value * 100) / this.len(range);
				}
				,is: function ( range, value ) {
					return ((value * this.len(range)) / 100) + range[0];
				}
				,len: function ( range ) {
					return (range[0] > range[1] ? range[0] - range[1] : range[1] - range[0]);
				}
			}
			// Event handlers bound to elements to perform basic tasks.
			,eventHandlers = [
				// Assign input field values to the slider,
				// and signal unevaluated input.
				 function ( ) {

					this.target.val([
						 !this.i ? this.val() : null
						, this.i ? this.val() : null
					], { trusted: false });

				}
				// Shorthand for stopping propagation on an object.
				// Calling a function prevents having to define
				// one within other code.
				,function ( e ) {
					e.stopPropagation();
				}
			];

		// When the browser supports MsPointerEvents,
		// Don't bind touch or mouse events. The touch events are
		// currently only implemented by IE(10), but they are stable
		// and convenient to use.
		if ( window.navigator.msPointerEnabled ) {
			actions = {
				 start: 'MSPointerDown'
				,move: 'MSPointerMove'
				,end: 'MSPointerUp'
			};
		}

		// Test an array of objects, and calls them if they are a function.
		function call ( f, scope, args ) {

			// Allow the passing of an unwrapped function.
			// Leaves other code a more comprehensible.
			if( !$.isArray(f) ){
				f = [f];
			}

			$.each(f,function(i,q){
				if (typeof q === "function") {
					q.call(scope, args);
				}
			});
		}

		function instance ( object ) {
			return object instanceof $ || ( $.zepto && $.zepto.isZ ( object ) );
		}

		function fixEvent ( e ) {

			// Required (in at the very least Chrome) to prevent
			// scrolling and panning while attempting to slide.
			// The tap event also depends on this. This doesn't
			// seem to prevent panning in Firefox, which is an issue.
			// Prevent-default will also stop Chrome from setting a text-cursor.
			e.preventDefault();

			// Filter the event to register the type,
			// which can be touch, mouse or pointer. Since noUiSlider 4
			// so longer binds touch OR mouse, but rather touch AND mouse,
			// offset changes need to be made on an event specific basis.
			var  touch = e.type.indexOf('touch') === 0
				,mouse = e.type.indexOf('mouse') === 0
				,pointer = e.type.indexOf('MSPointer') === 0
				,x,y, event = e;

			// Get the originalEvent, if the event has been wrapped
			// by jQuery. Zepto doesn't wrap the event.
			if ( e.originalEvent ) {
				e = e.originalEvent;
			}

			if ( touch ) {
				// noUiSlider supports one movement at a time, for now.
				// It is therefore safe to select the first 'changedTouch'.
				x = e.changedTouches[0].pageX;
				y = e.changedTouches[0].pageY;
			}
			if ( mouse || pointer ) {

				// Polyfill the pageXOffset and pageYOffset
				// variables for IE7 and IE8;
				if( !pointer && window.pageXOffset === undefined ){
					window.pageXOffset = document.documentElement.scrollLeft;
					window.pageYOffset = document.documentElement.scrollTop;
				}

				x = e.clientX + window.pageXOffset;
				y = e.clientY + window.pageYOffset;
			}

			return $.extend( event, { x:x, y:y } );

		}

		// Handler for attaching events trough a proxy
		function attach ( events, target, callback, scope, noAbstraction ) {

			// Add the noUiSlider namespace to all events.
			events = events.replace( /\s/g, namespace + ' ' ) + namespace;

			// The 'noAbstraction' argument can be set to prevent
			// event checking, and instead just proxy the event to
			// the right namespace. 'noAbstraction' can be level 1 or 2.
			if ( noAbstraction ) {
				if ( noAbstraction > 1 ){
					scope = $.extend(target, scope);
				}
				return target.on( events, $.proxy( callback, scope ));
			}

			// Make the callback available in a lower scope
			scope.handler = callback;

			return target.on( events, $.proxy( function( e ){

				// Test if there is anything that should prevent an event
				// from being handled, such as a disabled state or an active
				// 'tap' transition. Prevent interaction with disabled sliders.
				if( this.target.is('[class*="noUi-state-"], [disabled]') ) {
					return false;
				}

				// Call the event handler with the original event as argument.
				// The handler won't know it has been passed trough this
				// proxy, and it won't have to filter event validity, because
				// that was done here. Since the scope can just be 'this',
				// there is no need to use .call().
				this.handler( fixEvent ( e ) );

			}, scope ));
		}

		// Checks whether a variable is numerical.
		function isNumeric ( a ) {
			return !isNaN( parseFloat( a ) ) && isFinite( a );
		}

		// jQuery doesn't have a method to return a CSS value as a percentage.
		function getPercentage( a ){
			return parseFloat(this.style[a]);
		}

		function test ( o, set ){

			// Checks whether a variable is a candidate to be a
			// valid serialization target.
			function ser(r){
				return ( instance ( r ) || typeof r === 'string' || r === false );
			}

		//	These tests are structured with an item for every option available.
		//	Every item contains an 'r' flag, which marks a required option, and
		//	a 't' function, which in turn takes some arguments:
		//	- the value for the option
		//	- [optional] a reference to options object
		//	- [optional] the option name
		//	The testing function returns false when an error is detected,
		//	or true when everything is OK. Every test also has an 'init'
		//	method which appends the parent object to all children.

			var TESTS = {
				/*	Handles.
				 *	Has default, can be 1 or 2.
				 */
				 "handles": {
					 r: true
					,t: function(q){
						q = parseInt(q, 10);
						return ( q === 1 || q === 2 );
					}
				}
				/*	Range.
				 *	Must be an array of two numerical floats,
				 *	which can't be identical.
				 */
				,"range": {
					 r: true
					,t: function(q,o,w){
						if(q.length!==2){
							return false;
						}
						// Reset the array to floats
						q = [parseFloat(q[0]),parseFloat(q[1])];
						// Test if those floats are numerical
						if(!isNumeric(q[0])||!isNumeric(q[1])){
							return false;
						}
						// When this test is run for range, the values can't
						// be identical.
						if(w==="range" && q[0] === q[1]){
							return false;
						}
						// The lowest value must really be the lowest value.
						if(q[1]<q[0]){
							return false;
						}
						o[w]=q;
						return true;
					}
				 }
				/*	Start.
				 *	Must be an array of two numerical floats when handles = 2;
				 *	Uses 'range' test.
				 *	When handles = 1, a single float is also allowed.
				 */
				,"start": {
					 r: true
					,t: function(q,o,w){
						if(o.handles === 1){
							if($.isArray(q)){
								q=q[0];
							}
							q = parseFloat(q);
							o.start = [q];
							return isNumeric(q);
						}
						return this.parent.range.t(q,o,w);
					}
				}
				/*	Connect.
				 *	Must be true or false when handles = 2;
				 *	Can use 'lower' and 'upper' when handles = 1.
				 */
				,"connect": {
					 t: function(q,o){
						return (   q === true
								|| q === false
								|| ( q === 'lower' && o.handles === 1)
								|| ( q === 'upper' && o.handles === 1));
					 }
				}
				/*	Connect.
				 *	Will default to horizontal, not required.
				 */
				,"orientation": {
					 t: function(q){
						return ( q === "horizontal" || q === "vertical" );
					}
				}
				/*	Margin.
				 *	Must be a float, has a default value.
				 */
				,"margin": {
					 r: true
					,t: function(q,o,w){
						q = parseFloat(q);
						o[w]=q;
						return isNumeric(q);
					}
				}
				/*	Serialization.
				 *	Required, but has default. 'resolution' and 'mark' option,
				 *	are allowed to be missing, 'to' isn't. Must be an array
				 *	when using two handles, can be a single value
				 *	when using one handle. 'mark' can only be period (.) or
				 *	comma (,) to make sure the value can be parsed properly.
				 */
				,"serialization": {
					 r: true
					,t: function(q,o){

						if(!q.resolution){
							o.serialization.resolution = 0.01;
						} else {
							switch(q.resolution){
								case 1:
								case 0.1:
								case 0.01:
								case 0.001:
								case 0.0001:
								case 0.00001:
									break;
								default:
									return false;
							}
						}

						if(!q.mark){
							o.serialization.mark = '.';
						} else {
							return ( q.mark === '.' || q.mark === ',' );
						}

						if(q.to){

							if(o.handles === 1){
								// Wrap the value for one handle into an array.
								if(!$.isArray(q.to)){
									q.to = [q.to];
								}
								// Write back to the options object;
								o.serialization.to = q.to;
								// Run test for valid serialization target.
								return ser(q.to[0]);
							}
							return (q.to.length === 2 && ser(q.to[0]) && ser(q.to[1]));

						}

						// If no 'to' option is specified,
						// the serialization option is invalid.
						return false;

					}
				}
				/*	Slide.
				 *	Not required. Must be a function.
				 */
				,"slide": {
					 t: function(q){
						return typeof q === "function";
					}
				}
				/*	Set.
				 *	Not required. Must be a function.
				 *	Tested using the 'slide' test.
				 */
				,"set": {
					 t: function(q,o){
						return this.parent.slide.t(q,o);
					}
				}
				/*	Step.
				 *	Not required. Tested using the 'margin' test.
				 */
				,"step": {
					 t: function(q,o,w){
						return this.parent.margin.t(q,o,w);
					}
				}
				/*	[init]
				 *	Not an option test. Calling this method will return the
				 *	parent object with some cross references that allow
				 *	crawling the object in an upward direction, which
				 *	normally isn't possible in JavaScript.
				 */
				,"init": function(){
					var obj = this;
					$.each(obj,function(i,c){
						c.parent = obj;
					});
					delete this.init;
					return this;
				}
			},

			// Prepare a set of tests, by adding some internal reference
			// values not available in native JavaScript object implementation.
			a = TESTS.init();

			// Loop all provided tests;
			// 'v' is the option set, 'i' is the index for the current test.
			$.each(a, function( i, v ){

				// If the value is required but not set,
				// or if the test fails, throw an error.
				if((v.r && (!o[i] && o[i] !== 0)) || ((o[i] || o[i] === 0) && !v.t(o[i],o,i))){

					// For debugging purposes it might be very useful to know
					// what option caused the trouble. Since throwing an error
					// will prevent further script execution, log the error
					// first. Test for console, as it might not be available.
					if( console && console.log && console.group ){
						console.group( "Invalid noUiSlider initialisation:" );
						console.log( "Option:\t", i );
						console.log( "Value:\t", o[i] );
						console.log( "Slider:\t", set[0] );
						console.groupEnd();
					}

					throw new RangeError("noUiSlider");
				}

			});

		}

		function closest( value, to ){
			// Round a value to the closest 'to'.
			// Used with the 'step' option.
			return Math.round(value / to) * to;
		}

		function format ( value, target ) {

			// Round the value to the resolution that was set
			// with the serialization options.
			value = value.toFixed( target.data('decimals') );

			// Apply the proper decimal mark to the value.
			return value.replace( '.', target.data('mark') );

		}

		function setHandle ( handle, to, forgive ) {

			var  nui = handle.data('nui').options
				// Get the array of handles from the base.
				// Will be undefined at initialisation.
				,handles = handle.data('nui').base.data('handles')
				// Get some settings from the handle;
				,style = handle.data('nui').style
				,hLimit;

			// Make sure the value can be parsed.
			// This will catch any potential NaN, even though
			// no internal function calling setHandle should pass
			// invalided parameters.
			if( !isNumeric(to) ) {
				return false;
			}

			// Ignore the call if the handle won't move anyway.
			if( to === handle[0].gPct(style) ) {
				return false;
			}

			// Limit 'to' to 0 - 100
			to = to < 0 ? 0 : to > 100 ? 100 : to;

			// Handle the step option, or ignore it.
			if( nui.step && !forgive ){
				to = closest( to, percentage.from(nui.range, nui.step));
			}

			// Stop handling this call if the handle won't step to a new value.
			if( to === handle[0].gPct(style) ) {
				return false;
			}

			// We're done if this is the only handle,
			// if the handle bounce is trusted to the user
			// or on initialisation when handles isn't defined yet.
			if( handle.siblings('.' + clsList[1]).length && !forgive && handles ){

				// Otherwise, the handle should bounce,
				// and stop at the other handle.
				if ( handle.data('nui').number ) {
					hLimit = handles[0][0].gPct(style) + nui.margin;
					to = to < hLimit ? hLimit : to;
				} else {
					hLimit = handles[1][0].gPct(style) - nui.margin;
					to = to > hLimit ? hLimit : to;
				}

				// Stop handling this call if the handle can't move past another.
				if( to === handle[0].gPct(style) ) {
					return false;
				}

			}

			// Fix for the z-index issue where the lower handle gets stuck
			// below the upper one. Since this function is called for every
			// movement, toggleClass cannot be used.
			if( handle.data('nui').number === 0 && to > 95 ){
				handle.addClass(clsList[13]);
			} else {
				handle.removeClass(clsList[13]);
			}

			// Set handle to new location
			handle.css( style , to + '%' );

			// Write the value to the serialization object.
			handle.data('store').val(
				format ( percentage.is( nui.range, to ), handle.data('nui').target )
			);

			return true;

		}

		function store ( handle, S ) {

			var i = handle.data('nui').number, scope = {
				 target: handle.data('nui').target
				,options: handle.data('nui').options
				,handle: handle
				,i: i
			};

			if( instance ( S.to[i] ) ) {

				// Add a change event to the supplied jQuery object, which
				// will just trigger the 'val' function on the parent. In some
				// cases, the change event will not fire on select elements,
				// so listen to 'blur' too.
				attach ( 'change blur'
						,S.to[i]
						,eventHandlers[0]
						,scope
						,2 );

				// Triggering the 'set' callback should not occur on the 'blur'
				// event, so bind it only to 'change'.
				attach ( 'change'
						,S.to[i]
						,scope.options.set
						,scope.target
						,1 );

				return S.to[i];
			}

			if ( typeof S.to[i] === "string" ) {

				// Append a new object to the noUiSlider base,
				// prevent change events flowing upward.
				return $('<input type="hidden" name="' + S.to[i] + '">')
					.appendTo(handle)
					.addClass(clsList[3])
					.change(eventHandlers[1]);
			}

			if ( S.to[i] === false ) {

				// Create an object capable of handling all jQuery calls.
				return {
					// The value will be stored a data on the handle.
					 val : function(a) {
						// Value function provides a getter and a setter.
						// Can't just test for !a, as a might be 0.
						// When no argument is provided, return the value.
						// Otherwise, set the value.
						if ( a === undefined ) {
							return this.handleElement.data('nui-val');
						}
						this.handleElement.data('nui-val', a);
					}
					// The object could be mistaken for a jQuery object,
					// make sure that doesn't trigger any errors.
					,hasClass: function(){
						return false;
					}
					// The val function needs access to the handle.
					,handleElement: handle
				};
			}
		}

		function move( event ) {

			// This function is called often, keep it light.

			var  base = this.base
				,style = base.data('style')
			// Subtract the initial movement from the current event,
			// while taking vertical sliders into account.
				,proposal = event.x - this.startEvent.x
				,baseSize = style === 'left' ? base.width() : base.height();

			// This loop prevents a long ternary for the proposal variable.
			if( style === 'top' ) {
				proposal = event.y - this.startEvent.y;
			}
			
			proposal = this.position + ( ( proposal * 100 ) / baseSize );

			setHandle( this.handle, proposal );

			// Trigger the 'slide' event, pass the target so that it is 'this'.
			call( base.data('options').slide
				 ,base.data('target') );

		}

		function end ( ) {

			var  base = this.base
				,handle = this.handle;

			// The handle is no longer active, so remove
			// the class.
			handle.children().removeClass(clsList[4]);

			// Unbind move and end events, to prevent
			// them stacking up over and over;
			all.off(actions.move);
			all.off(actions.end);

			// Some text-selection events are bound to the body.
			$('body').off(namespace);

			// Trigger the change event.
			base.data('target').change();

			// Trigger the 'end' callback.
			call( handle.data('nui').options.set
				 ,base.data('target') );

		}

		function start ( event ) {

			var  handle = this.handle
				,position = handle[0].gPct( handle.data('nui').style );

			handle.children().addClass(clsList[4]);

			// Attach the move event handler, while
			// passing all relevant information along.
			attach ( actions.move, all, move, {
				 startEvent: event
				,position: position
				,base: this.base
				,target: this.target
				,handle: handle
			});

			attach ( actions.end, all, end, {
				 base: this.base
				,target: this.target
				,handle: handle
			});

			// Prevent text selection when dragging the handles.
			// This doesn't prevent the browser defaulting to the I like cursor.
			$('body').on(
				 'selectstart' + namespace
				,function( ){ return false; }
			);
		}

		function selfEnd( event ) {

			// Stop propagation so that the tap handler doesn't interfere;
			event.stopPropagation();

			// Trigger the end handler. Supply the current scope,
			// which contains all required information.
			end.call( this );
		}

		function tap ( event ) {

			// If the target contains an active handle, don't trigger
			// this event. Tapping shouldn't be possible while dragging.
			if ( this.base.find('.' + clsList[4]).length ) {
				return;
			}

			// Getting variables from the event is not required, but
			// shortens other expressions and is far more convenient;
			var  i, handle, hCenter, base = this.base
				,handles = this.handles
				,style = base.data('style')
				,eventXY = event[style === 'left' ? 'x' : 'y']
				,baseSize = style === 'left' ? base.width() : base.height()
				,offset = {
					 handles: []
					,base: {
						 left: base.offset().left
						,top: base.offset().top
					}
				};

			// Loop handles and add data to the offset list.
			for (i = 0; i < handles.length; i++ ) {
				offset.handles.push({
					 left: handles[i].offset().left
					,top: handles[i].offset().top
				});
			}

			// Calculate the central point between the handles;
			hCenter = handles.length === 1 ? 0 :
				(( offset.handles[0][style] + offset.handles[1][style] ) / 2 );

			// If there is just one handle,
			// or the lower handles in closest to the event,
			// select the first handle. Otherwise, pick the second.
			if ( handles.length === 1 || eventXY < hCenter ){
				handle = handles[0];
			} else {
				handle = handles[1];
			}

			// Flag the slider as it is now in a transitional state.
			// Transition takes 300 ms, so re-enable the slider afterwards.
			base.addClass(clsList[5]);
			setTimeout(function(){
				base.removeClass(clsList[5]);
			}, 300);

			// Calculate the new position for the handle and
			// trigger the movement.
			setHandle(
				 handle
				,(((eventXY - offset.base[style]) * 100) / baseSize)
			);

			// Trigger the 'slide' and 'set' callbacks,
			// pass the target so that it is 'this'.
			call( [ handle.data('nui').options.slide
				   ,handle.data('nui').options.set ]
				 ,base.data('target') );

			base.data('target').change();

		}

		function create ( options ) {

			return this.each(function( index, target ){

				// Target is the wrapper that will receive all external
				// scripting interaction. It has no styling and serves no
				// other function.
				target = $(target);
				target.addClass(clsList[6]);

				// Base is the internal main 'bar'.
				var  i, style, decimals, handle
					,base = $('<div/>').appendTo(target)
					,handles = []
					,cls = {
					 base: stdCls.base
						,origin: [
							 stdCls.origin.concat([clsList[1] + clsList[7]])
							,stdCls.origin.concat([clsList[1] + clsList[8]])
						]
						,handle: [
							 stdCls.handle.concat([clsList[2] + clsList[7]])
							,stdCls.handle.concat([clsList[2] + clsList[8]])
						]
					};

				// Set defaults where applicable;
				options = $.extend({
					 handles: 2
					,margin: 0
					,orientation: "horizontal"
				}, options) || {};

				// Set a default for serialization;
				if(!options.serialization){
					options.serialization = {
						 to : [false, false]
						,resolution : 0.01
						,mark: '.'
					};
				}

				// Run all options through a testing mechanism to ensure correct
				// input. The test function will throw errors, so there is
				// no need to capture the result of this call. It should be noted
				// that options might get modified to be handled properly. E.g.
				// wrapping integers in arrays.
				test(options, target);

				// I can't type serialization any more, and it doesn't compress
				// very well, so shorten it.
				options.S = options.serialization;

				// Apply the required connection classes to the elements
				// that need them. Some classes are made up for several segments
				// listed in the class list, to allow easy renaming and provide
				// a minor compression benefit.
				if( options.connect ) {

					if( options.connect === "lower" ){
						// Add some styling classes to the base;
						cls.base.push(clsList[9], clsList[9] + clsList[7]);
						// When using the option 'Lower', there is only one
						// handle, and thus only one origin.
						cls.origin[0].push(clsList[12]);
					} else {
						cls.base.push(clsList[9] + clsList[8], clsList[12]);
						cls.origin[0].push(clsList[9]);
					}

				} else {
					cls.base.push(clsList[12]);
				}

				// Parse the syntactic sugar that is the serialization
				// resolution option to a usable integer.
				style = options.orientation === 'vertical' ? 'top' : 'left';

				decimals = options.S.resolution.toString().split('.');

				// Checking for a string "1", since the resolution needs
				// to be cast to a string to split in on the period.
				decimals = decimals[0] === "1" ? 0 : decimals[1].length;

				// Add classes for horizontal and vertical sliders.
				// The horizontal class is provided for completeness,
				// as it isn't used in the default theme.
				if( options.orientation === "vertical" ){
					cls.base.push(clsList[10]);
				} else {
					cls.base.push(clsList[11]);
				}

				// Merge base classes with default;
				base.addClass(cls.base.join(" ")).data('target', target);

				// Make data accessible in functions throughout the plugin.
				target.data({
					 base: base
					,mark: options.S.mark
					,decimals: decimals
				});

				for (i = 0; i < options.handles; i++ ) {

					handle = $('<div><div/></div>').appendTo(base);

					// Add all default and option-specific classes to the
					// origins and handles.
					handle.addClass(cls.origin[i].join(" "));
					handle.children().addClass(cls.handle[i].join(" "));

					// These events are only bound to the visual handle element,
					// not the 'real' origin element.
					attach ( actions.start, handle.children(), start, {
						 base: base
						,target: target
						,handle: handle
					});

					attach ( actions.end, handle.children(), selfEnd, {
						 base: base
						,target: target
						,handle: handle
					});

					// Make sure every handle has access to all primary
					// variables. Can't uses jQuery's .data( obj ) structure
					// here, as 'store' needs some values from the 'nui' object.
					handle.data('nui', {
						 target: target
						,decimals: decimals
						,options: options
						,base: base
						,style: style
						,number: i
					}).data('store', store (
						 handle
						,options.S
					));

					// Write a function to the native DOM element, since
					// jQuery wont let me get the current value in percentages.
					handle[0].gPct = getPercentage;

					// Make handles loop-able
					handles.push(handle);

					// Set the handle to its initial position;
					setHandle(handle, percentage.to(options.range, options.start[i]));

				}

				// The base could use the handles too;
				base.data({
					 options: options
					,handles: handles
					,style: style
				});

				// Add a reference to the handles on the target as well.
				target.data({
					handles: handles
				});

				// Attach the the tap event to the slider base.
				attach ( actions.end, base, tap, {
					 base: base
					,target: target
					,handles: handles
				});

			});

		}

		function getValue ( ) {

			var re = [];

			// Loop the handles, and get the value from the input
			// for every handle on its' own.
			$.each( $(this).data('handles'), function( i, handle ){
				re.push( handle.data('store').val() );
			});

			// If the slider has just one handle, return a single value.
			// Otherwise, return an array.
			return ( re.length === 1 ? re[0] : re );
		}

		function val ( args, modifiers ) {

			// If the function is called without arguments,
			// act as a 'getter'. Call the getValue function
			// in the same scope as this call.
			if( args === undefined ){
				return getValue.call( this );
			}

			// Passing the modifiers argument is not required.
			// The input might also be 'true', to indicate that the
			// 'set' event should be called.
			modifiers = modifiers === true ? { trigger: true } : ( modifiers || {} );

			// If the val is to be set to a number, which is valid
			// when using a one-handle slider, wrap it in an array.
			if( !$.isArray(args) ){
				args = [args];
			}

			// Setting is handled properly for each slider in the data set.
			// Note that the val method is called on the target, which can
			// therefore be used in the function.
			return this.each(function( index, target ){

				// Make sure 'target' is a jQuery element.
				target = $(target);

				$.each( $(this).data('handles'), function( j, handle ){

					// The set request might want to ignore this handle.
					// Test for 'undefined' too, as a two-handle slider
					// can still be set with an integer.
					if( args[j] === null || args[j] === undefined ) {
						return;
					}

					// Calculate a new position for the handle.
					var  value, current
						,range = handle.data('nui').options.range
						,to = args[j], result;

					// Assume the input can be trusted.
					modifiers.trusted = true;

					// Handle user facing input correction. The value is
					// 'trusted' when a developer provides it from the 'val'
					// method, not when it comes from an input element.
					if ( modifiers.trusted === false || args.length === 1 ) {
						modifiers.trusted = false;
					}

					// If one handle isn't set, the other can't move past it.
					if ( args.length === 2 && $.inArray( null, args ) >= 0 ) {
						modifiers.trusted = false;
					}

					// Add support for the comma (,) as a decimal symbol.
					// Replace it by a period so it is handled properly by
					// parseFloat. Omitting this would result in a removal
					// of decimals. This is relevant on trusted input too,
					// as a developer might input a comma separated string
					// using the 'val' method.
					if( $.type(to) === "string" ) {
						to = to.replace(',', '.');
					}

					// Calculate the new handle position
					to = percentage.to( range, parseFloat( to ) );

					// Set handle to new location, and make sure developer
					// input is always accepted. The 'trusted' flag indicates
					// input that is not coming from user facing elements.
					result = setHandle( handle, to, modifiers.trusted );

					// The 'val' method allows for an external modifier,
					// to specify a request for an 'set' event.
					if( modifiers.trigger ) {
						call( handle.data('nui').options.set
							 ,target );
					}

					// If the value of the input doesn't match the slider,
					// reset it.
					if( !result ){

						// Get the 'store' object, which can be an input
						// element or a wrapper around a 'data' call.
						value = handle.data('store').val();

						// Get the value for the current position.
						current = percentage.is(
							 range
							,handle[0].gPct(handle.data('nui').style)
						);

						// Sometimes the input is changed to a value the slider
						// has rejected. This can occur when using 'select' or
						// 'input[type="number"]' elements. In this case,
						// set the value back to the input.
						if( value !== current ){
							handle.data('store').val( format( current, target ) );
						}
					}
				});
			});
		}

		// Overwrite the native jQuery 'val' function
		// with a simple handler. noUiSlider will use the internal
		// value method, anything else will use the standard method.
		$.fn.val = function(){
			return this.hasClass(clsList[6])
				? val.apply(this, arguments)
				: $VAL.apply(this, arguments);
		};

		return create.call( this, options );

	};

}( $ ));
