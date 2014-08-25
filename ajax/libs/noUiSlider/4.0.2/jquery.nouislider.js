/* noUiSlider - refreshless.com/nouislider/ */
(function($, UNDEF){

	$.fn.noUiSlider = function( options ){

		var  namespace = '.nui'
			// Create a shorthand for document event binding
			,all = $(document)
			// Create a map of touch and mouse actions
			,actions = {
				 start: 'mousedown' + namespace + ' touchstart' + namespace
				,move: 'mousemove' + namespace + ' touchmove' + namespace
				,end: 'mouseup' + namespace + ' touchend' + namespace
			}
			// Make a copy of the current val function.
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
				,'handles'			// 12
				,'noUi-background'	// 13
				,'noUi-z-index'		// 14
			]
			// Define an extendible object with base classes for the various
			// structure elements in the slider. These can be extended by simply
			// pushing to the array, which reduces '.addClass()' calls.
			,stdCls = {
				 base: [clsList[0], clsList[13]]
				,origin: [clsList[1]]
				,handle: [clsList[2]]
			}
			// The percentage object contains some well tested math to turn values
			// to and from percentages. It can be a bit strange to wrap your head
			// around the individual calls, but they'll do their job with all positive
			// and negative input values.
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
			};

		// When the browser supports MsPointerEvents,
		// Don't bind touch or mouse events. The touch events are
		// currently only implemented by IE(10), but they are stable
		// and convenient to use.
		if ( window.navigator.msPointerEnabled ) {
			actions = {
				 start: 'MSPointerDown' + namespace
				,move: 'MSPointerMove' + namespace
				,end: 'MSPointerUp' + namespace
			};
		}

		// Shorthand for stopping propagation on an object.
		// Calling a function prevents having to define one inline.
		function stopPropagation ( e ) {
			e.stopPropagation();
		}

		// Test an array of objects, and calls them if they are a function.
		function call ( f, scope, args ) {
			$.each(f,function(i,q){
				if (typeof q === "function") {
					q.call(scope, args);
				}
			});
		}

		// Test if there is anything that should prevent an event from being
		// handled, such as a disabled state of a slider moving in the 'tap' event.
		function blocked ( e ) {
			 return ( e.data.base.data('target').is('[class*="noUi-state-"], [disabled]') );
		}

		function fixEvent ( e, preventDefault ) {

			// Required (in at the very least Chrome) to prevent
			// scrolling and panning while attempting to slide.
			// The tap event also depends on this.
			if( preventDefault ) {
				e.preventDefault();
			}

			// Filter the event to register the type,
			// which can be touch, mouse or pointer. Since noUiSlider 4
			// so longer binds touch OR mouse, but rather touch AND mouse,
			// offset changes need to be made on an event specific basis.
			var  jQueryEvent = e
				,touch = e.type.indexOf('touch') === 0
				,mouse = e.type.indexOf('mouse') === 0
				,pointer = e.type.indexOf('MSPointer') === 0
				,x,y;

			// Fetch the event where jQuery didn't make any modifications.
			e = e.originalEvent;

			if (touch) {
				// noUiSlider supports one movement at a time, for now.
				// It is therefore safe to select the first 'changedTouch'.
				x = e.changedTouches[0].pageX;
				y = e.changedTouches[0].pageY;
			}
			if (mouse) {

				// Polyfill the pageXOffset and pageYOffset
				// variables for IE7 and IE8;
				if(window.pageXOffset === UNDEF){
					window.pageXOffset = document.documentElement.scrollLeft;
					window.pageYOffset = document.documentElement.scrollTop;
				}

				x = e.clientX + window.pageXOffset;
				y = e.clientY + window.pageYOffset;
			}
			if (pointer) {
				x = e.pageX;
				y = e.pageY;
			}

			return { pass: jQueryEvent.data, e:e, x:x, y:y, t: [touch, mouse, pointer] };

		}

		function getPercentage( a ){
			return parseFloat(this.style[a]);
		}

		function test ( o, set ){

			// Checks whether a variable is numerical.
			function num(e){
				return !isNaN(e) && isFinite(e);
			}
			// Checks whether a variable is a candidate to be a
			// valid serialization target.
			function ser(r){
				return ( r instanceof $ || typeof r === 'string' || r === false );
			}


	/**
			These tests are structured with an item for every option available.
			Every item contains an 'r' flag, which marks a required option, and
			a 't' function, which in turn takes some arguments:
			- a reference to options object
			- the value for the option
			- the option name (optional);
			The testing function returns false when an error is detected,
			or true when everything is OK. Every test also has an 'init'
			method which appends the parent object to all children.
	**/
			var TESTS = {
				/*	Handles. Has default, can be 1 or 2;
				 */
				 "handles": {
					 r: true
					,t: function(o,q){
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
					,t: function(o,q,w){
						if(q.length!==2){
							return false;
						}
						// Reset the array to floats
						q = [parseFloat(q[0]),parseFloat(q[1])];
						// Test if those floats are numerical
						if(!num(q[0])||!num(q[1])){
							return false;
						}
						// When this test is run for range, the values can't
						// be identical.
						if(w==="range" && q[0] === q[1]){
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
					,t: function(o,q,w){
						if(o.handles === 1){
							if($.isArray(q)){
								q=q[0];
							}
							q = parseFloat(q);
							o.start = [q];
							return num(q);
						}
						return this.parent.range.t(o,q,w);
					}
				}
				/*	Connect.
				 *	Must be true or false when handles = 2;
				 *	Can use 'lower' and 'upper' when handles = 1.
				 */
				,"connect": {
					 t: function(o,q){
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
					 t: function(o,q){
						return ( q === "horizontal" || q === "vertical" );
					}
				}
				/*	Margin.
				 *	Must be a float, has a default value.
				 */
				,"margin": {
					 r: true
					,t: function(o,q,w){
						q = parseFloat(q);
						o[w]=q;
						return num(q);
					}
				}
				/*	Serialization.
				 *	Required, but has default. Resolution option can be missing,
				 *	'to' can't. Must be an array when using two handles, can
				 *	be a singular value when using one handle.
				 */
				,"serialization": {
					 r: true
					,t: function(o,q){

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

						if(q.to){

							if(o.handles === 1){
								// Wrap the value for one handle into an array;
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
					 t: function(o,q){
					return typeof q === "function";
					}
				}
				/*	Slide.
				 *	Not required. Tested using the 'margin' function.
				 */
				,"step": {
					 t: function(o,q,w){
						return this.parent.margin.t(o,q,w);
					}
				}
				/*	[init]
				 *	Not an option test. Calling this method will return the
				 *	parent object with some cross references that allow crawling
				 *	the object upward, which normally isn't possible in Javascript.
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
			// values not available in native Javascript object implementation.
			a = TESTS.init();

			// Loop all provided tests;
			// v is the option set, i is the index for the current test.
			$.each(a, function( i, v ){

				// If the value is required but not set,
				// or if the test fails, throw an error.
				if((v.r && (!o[i] && o[i] !== 0)) || ((o[i] || o[i] === 0) && !v.t(o,o[i],i))){

					// For debugging purposes it might be very useful
					// to know what option caused the trouble.
					if(console&&console.log){
						console.log(
							"Slider:\t\t\t",	set,
							"\nOption:\t\t\t",	i,
							"\nValue:\t\t\t",	o[i]
						);
					}
					// Since 'error' will prevent further script execution,
					// log the error first.
					$.error("Error on noUiSlider initialisation.");
					return false;
				}

			});

		}

		function closest( value, to ){
			// Round a value to the closest 'to'.
			// Used with the 'step' option.
			return Math.round(value / to) * to;
		}

		function setHandle ( handle, to, forgive ) {

			var  nui = handle.data('nui').options
				// Get the array of handles from the base.
				// Will be undefined at initialisation.
				,handles = handle.data('nui').base.data(clsList[12])
				// Get some settings from the handle;
				,style = handle.data('nui').style
				,dec = handle.data('nui').decimals
				,hLimit;

			// Ignore the call if the handle won't move anyway.
			if(to === handle[0].getPercentage(style)) {
				return false;
			}

			// Limit 'to' to 0 - 100
			to = to < 0 ? 0 : to > 100 ? 100 : to;

			// Handle the step option, or ignore it.
			if( nui.step && !forgive ){
				to = closest( to, percentage.from(nui.range, nui.step));
			}

			// Stop handling this call if the handle won't step to a new value.
			if(to === handle[0].getPercentage(style)) {
				return false;
			}

			// We're done if this is the only handle,
			// if the handle bounce is trusted to the user
			// or on initialisation when handles isn't defined yet.
			if( handle.siblings('.' + clsList[1]).length && !forgive && handles ){

				// Otherwise, the handle should bounce,
				// and stop at the other handle.
				if ( handle.data('nui').number ) {
					hLimit = handles[0][0].getPercentage(style) + nui.margin;
					to = to < hLimit ? hLimit : to;
				} else {
					hLimit = handles[1][0].getPercentage(style) - nui.margin;
					to = to > hLimit ? hLimit : to;
				}

				// Stop handling this call if the handle can't move past another.
				if(to === handle[0].getPercentage(style)) {
					return false;
				}

			}

			// Fix for the z-index issue where the lower handle gets stuck
			// below the upper one. Since this function is called for every
			// movement, toggleClass cannot be used.
			if(handle.data('nui').number === 0 && to > 95){
				handle.addClass(clsList[14]);
			} else {
				handle.removeClass(clsList[14]);
			}

			// Set handle to new location
			handle.css( style , to + '%');

			// Write the value to the serialization object.
			handle.data('store').val(percentage.is(nui.range, to).toFixed(dec));

			return true;

		}

		function store ( handle, S ) {

			var i = handle.data('nui').number;

			if( S.to[i] instanceof $ ) {

				// Attach a change event to the supplied jQuery object,
				// which will just trigger the val function on the parent.
				// In some cases, the change event will not fire on select elements,
				// so listen to 'blur' too.
				return S.to[i].on('change'+namespace+' blur'+namespace, function(){
					var arr = [null, null];
					arr[i] = $(this).val();
					handle.data('nui').target.val(arr, true);
				});

			}

			if ( typeof S.to[i] === "string" ) {

				// Append a new object to the noUiSlider base,
				// prevent change events flowing upward.
				return $('<input type="hidden" class="'+clsList[3]+'" name="' + S.to[i] + '">')
					.appendTo(handle).change(stopPropagation);

			}

			if ( S.to[i] === false ) {

				// Create an object capable of handling all jQuery calls.
				return {
					// The value will be stored a data on the handle.
					 val : function(a) {
						// Value function provides a getter and a setter.
						// Can't just test for !a, as a might be 0.
						if ( a === UNDEF ) {
							// Either set...
							return this.handleElement.data('nui-val');
						}
						// ... or return;
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

			event = fixEvent( event, true );

			if(!event) {
				return;
			}

			var  base = event.pass.base
				,style = base.data('style')
			// Subtract the initial movement from the current event,
			// while taking vertical sliders into account.
				,proposal = event.x - event.pass.startEvent.x
				,baseSize = style === 'left' ? base.width() : base.height();

			// This loop prevents a long ternary for the proposal variable.
			if(style === 'top') {
				proposal = event.y - event.pass.startEvent.y;
			}

			proposal = event.pass.position + ( ( proposal * 100 ) / baseSize );

			setHandle( event.pass.handle, proposal );

			// Trigger the 'slide' event, pass the target so that it is 'this'.
			call(
				 [ event.pass.base.data('options').slide ]
				,event.pass.base.data('target')
			);

		}

		function end ( event ) {

			if ( blocked( event ) ) {
				return;
			}

			// Handle is no longer active;
			event.data.handle.children().removeClass(clsList[4]);

			// Unbind move and end events, to prevent
			// them stacking up over and over;
			all.off(actions.move);
			all.off(actions.end);
			$('body').off(namespace);

			event.data.base.data('target').change();

		}

		function start ( event ) {

			// When the slider is in a transitional state, stop.
			// Also prevents interaction with disabled sliders.
			if ( blocked( event ) ) {
				return;
			}

			event = fixEvent( event );

			if(!event) {
				return;
			}

			var  handle = event.pass.handle
				,position = handle[0].getPercentage( handle.data('nui').style );

			handle.children().addClass('noUi-active');

			// Attach the move event handler, while
			// passing all relevant information along.
			all.on(actions.move, {
				 startEvent: event
				,position: position
				,base: event.pass.base
				,handle: handle
			}, move);

			all.on(actions.end, { base: event.pass.base, handle: handle }, end);

			// Prevent text selection when dragging the handles.
			// This doesn't prevent the browser defaulting to the I like cursor.
			$('body').on('selectstart' + namespace, function(){ return false; });

		}

		function selfEnd( event ) {
			// Trigger the end handler. Supply correct data using a
			// fake object that contains all required information;
			end({ data: { base: event.data.base, handle: event.data.handle } });
			// Stop propagation so that the tap handler doesn't interfere;
			event.stopPropagation();
		}

		function tap ( event ) {

			if ( blocked( event ) || event.data.base.find('.' + clsList[4]).length ) {
				return;
			}

			event = fixEvent( event );

			// The event handler might have rejected this event.
			if(!event) {
				return;
			}

			// Getting variables from the event is not required, but
			// shortens other expressions and is far more convenient;
			var  i, handle, hCenter, base = event.pass.base
				,handles = event.pass.handles
				,style = base.data('style')
				,eventXY = event[style === 'left' ? 'x' : 'y']
				,baseSize = style === 'left' ? base.width() : base.height()

			// Create a standard set off offsets compensated with the
			// scroll distance. When required, correct for scrolling.
			// This is a bug, as far as I can see, in IE(10?).
				,correction = {
					 x: ( event.t[2] ? window.pageXOffset : 0 )
				}
				,offset = {
					 handles: []
					,base: {
						 left: base.offset().left - correction.x
						,top: base.offset().top
					}
				};

			// Loop handles and add data to the offset list.
			for (i = 0; i < handles.length; i++ ) {
				offset.handles.push({
					 left: handles[i].offset().left - correction.x
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

			// Trigger the 'slide' event, pass the target so that it is 'this'.
			call(
				 [ handle.data('nui').options.slide ]
				,base.data('target')
			);

			base.data('target').change();

		}

		function create ( ) {

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


				// INCOMPLETE
				if( options.connect ) {
					cls.origin[0].push(clsList[9]);
					if( options.connect === "lower" ){
						// Add some styling classes to the base;
						cls.base.push(clsList[9], clsList[9] + clsList[7]);
						// When using the option 'Lower', there is only one
						// handle, and thus only one origin.
						cls.origin[0].push(clsList[13]);
					} else {
						cls.base.push(clsList[9] + clsList[8]);
					}
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

				for (i = 0; i < options.handles; i++ ) {

					handle = $('<div><div/></i>').appendTo(base);

					// Add all default and option-specific classes to the
					// origins and handles.
					handle.addClass(cls.origin[i].join(" "));
					handle.children().addClass(cls.handle[i].join(" "));

					// These events are only bound to the visual handle element,
					// not the 'real' origin element.
					handle.children()
						.on(actions.start, { base: base, handle: handle }, start)
						.on(actions.end, { base: base, handle: handle }, selfEnd);

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

					// Attach a function to the native DOM element,
					// since jQuery wont let me get the current value in percentages.
					handle[0].getPercentage = getPercentage;

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

				// Add a downstream reference to the target as well.
				target.data({
					 base: base
					,handles: handles
				});

				// The tap event.
				base.on(actions.end, { base: base, handles: handles }, tap);

			});

		}

		function val ( args, ignore ) {

			// Setter
			if( args !== UNDEF ){

				// If the val is to be set to a number, which is valid
				// when using a one-handle slider, wrap it in an array.
				if(!$.isArray(args)){
					args = [args];
				}

				// Setting is handled properly for each slider in the data set.
				return this.each(function(){

					$.each($(this).data(clsList[12]), function(i, handle){

						// The set request might want to ignore this handle.
						if( args[i] === null ) {
							return;
						}

						// Calculate a new position for the handle.
						var  value, current
							,range = handle.data('nui').options.range
							,to = percentage.to(
									 range
									,parseFloat(args[i])
								 ),

						// Set handle to new location, and make sure developer
						// input is always accepted. The ignore flag indicates
						// input from user facing elements.
						result = setHandle(handle, to, (ignore === true ? false : true));

						// If the value of the input doesn't match the slider,
						// reset it.
						if(!result){

							// Get the 'store' object, which can be an input element
							// or a wrapper arround a 'data' call.
							value = handle.data('store').val();
							current = percentage.is(range,
										handle[0].getPercentage(handle.data('nui').style)
									).toFixed(handle.data('nui').decimals);

							// Sometimes the input is changed to a value the slider
							// has rejected. This can occur when using 'select' or
							// 'input[type="number"]' elements. In this case,
							// set the value back to the input.
							if(value !== current){
								handle.data('store').val(current);
							}
						}

					});

				});

			}

			// Or, if the function was called without arguments,
			// act as a 'getter';

			var re = [];

			// Loop the handles, and get the value from the input
			// for every handle on its' own.
			$.each($(this).data(clsList[12]), function(i, handle){
				re.push( handle.data('store').val() );
			});

			// If the slider has just one handle, return a single value.
			// Otherwise, return an array.
			return ( re.length === 1 ? re[0] : re) ;

		}

		// Overwrite the native jQuery val() function
		// with a simple handler. noUiSlider will use the internal
		// value method, anything else will use the standard method.
		$.fn.val = function(){
			return this.hasClass(clsList[6])
				? val.apply(this, arguments)
				: $VAL.apply(this, arguments);
		};

		return create.apply(this, arguments);

	};

}(jQuery));
