
	/** 
	 ** noUislider 2.5.4
	 ** No copyrights or licenses. Do what you like. Feel free to share this code, or build upon it.
	 ** @author: 		@leongersen
	 ** @repository:	https://github.com/leongersen/noUiSlider
	 **
	 **/
	
	(function( $ ){

		$.fn.noUiSlider = function( method, options ) {

			function neg(a){ return a<0; }
			function abs(a){ return Math.abs(a); }
			function roundTo(a,b) { return Math.round(a / b) * b; }
			function dup(a){ return jQuery.extend(true, {}, a); }

			var defaults, methods, helpers, options = options||[], functions, touch = ('ontouchstart' in document.documentElement);

			defaults = {
				
			/*
			 * {handles}			Specifies the number of handles. (init)
			 * [INT]				1, 2
			 */
				'handles'	:		2,
			/*
			 * {connect} 			Whether to connect the middle bar to the handles. (init)
			 * [MIXED] 				"upper", "lower", false, true
			 */
				'connect'	:		true,
			/*
			 * {scale}; 			The values represented by the slider handles. (init,move,value)
			 * [ARRAY]				[-+x,>x]
			 */
				'scale'		:		[0,100],
			/*
			 * {start}				The starting positions for the handles, mapped to {scale}. (init)
			 * [ARRAY][INT]			[y>={scale[0]}, y=<{scale[1]}], integer in range.
			 */
				'start'		:		[25,75],
			/*
			 * {to}					The position to move a handle to. (move)
			 * [INT]				Any, but will be corrected to match z > {scale[0]} || _l, z < {scale[1]} || _u
			 */
				'to'		:		0,
			/*
			 * {handle}				The handle to move. (move)
			 * [MIXED]				0,1,"lower","upper"
			 */
				'handle'	:		0,
			/*
			 * {change}				The function to be called on every change. (init)
			 * [FUNCTION]			param [STRING]'move type'
			 */
				'change'	:		'',
			/*
			 * {end}				The function when a handle is no longer being changed. (init)
			 * [FUNCTION]			param [STRING]'move type'
			 */
				'end'		:		'',
			/*
			 * {step}				Whether, and at what intervals, the slider should snap to a new position. Adheres to {scale} (init)
			 * [MIXED]				<x, FALSE
			 */
				'step'		:		false,
			/*
			 * {save}				Whether a scale give to a function should become the default for the slider it is called on. (move,value)
			 * [BOOLEAN]			true, false
			 */
				'save'		:		false,
			/*
			 * {click}				Whether the slider moves by clicking the bar
			 * [BOOLEAN]			true, false
			 */
				'click'		:		true
			
			};
			
			helpers = {

				scale:				function( a, b, c ){	
					var d = b[0],e = b[1];
					if(neg(d)){
						a=a+abs(d);
						e=e+abs(d);
					} else {
						a=a-d;
						e=e-d;
					}
					return (a*c)/e;
				},
				deScale:			function( a, b, c ){
					var d = b[0],e = b[1];
					e = neg(d) ? e + abs(d) : e - d;
					return ((a*e)/c) + d;					
				},
				connect:			function( api ){
				
					if(api.connect){
					
						if(api.handles.length>1){
							api.connect.css({'left':api.low.left(),'right':(api.slider.innerWidth()-api.up.left())});
						} else {
							api.low ? api.connect.css({'left':api.low.left(),'right':0}) : api.connect.css({'left':0,'right':(api.slider.innerWidth()-api.up.left())});
						}
					
					}
				
				},
				left:				function(){
					return parseFloat($(this).css('left'));
				},
				call:				function( f, t, n ){
					if ( typeof(f) == "function" ){ f.call(t, n) }
				},
				bounce:				function( api, n, c, handle ){

					var go = false;

					if( handle.is( api.up ) ){
					
						if( api.low && n < api.low.left() ){
						
							n = api.low.left();
							go=true;
						
						}
					
					} else {
					
						if( api.up && n > api.up.left() ){
						
							n = api.up.left();
							go=true;
							
						}
					
					}
					
					if ( n > api.slider.innerWidth() ){
					
						n = api.slider.innerWidth()
					
						go=true;
					
					} else if( n < 0 ){
					
						n = 0;
						go=true;
						
					}
					
					return [n,go];
				
				}
			
			};
			
			methods = {
			
				init:				function(){
				
					return this.each( function(){
					
						/* variables */
						
						var s, slider, api;
					
						/* fill them */
						
						slider		= $(this).css('position','relative');
						api			= new Object();
						
						api.options = $.extend( defaults, options );
						s			= api.options;
						
						typeof s.start == 'object' ? 1 : s.start=[s.start];
						
						/* Available elements */
						
						api.slider	= slider;
						api.low		= $('<div class="noUi-handle noUi-lowerHandle"><div></div></div>');
						api.up		= $('<div class="noUi-handle noUi-upperHandle"><div></div></div>');
						api.connect	= $('<div class="noUi-midBar"></div>');
						
						/* Append the middle bar */
						
						s.connect ? api.connect.appendTo(api.slider) : api.connect = false;
						
						/* Append the handles */
						
						// legacy rename
						if(s.knobs){
							s.handles=s.knobs;
						}
						
						if ( s.handles === 1 ){
						
							/*
								This always looks weird:
								Connect=lower, means activate upper, because the bar connects to 0.
							*/
						
							if ( s.connect === true || s.connect === 'lower' ){
							
								api.low		= false;
								api.up		= api.up.appendTo(api.slider);
								api.handles	= [api.up];
								
							} else if ( s.connect === 'upper' || !s.connect ) {
							
								api.low		= api.low.prependTo(api.slider);
								api.up		= false;
								api.handles	= [api.low];
							
							}
							
						} else {
						
							api.low		= api.low.prependTo(api.slider);
							api.up		= api.up.appendTo(api.slider);
							api.handles	= [api.low, api.up];
						
						}
						
						if(api.low){ api.low.left = helpers.left; }
						if(api.up){ api.up.left = helpers.left; }
						
						api.slider.children().css('position','absolute');
						
						$.each( api.handles, function( index ){
						
							$(this).css({
								'left' : helpers.scale(s.start[index],api.options.scale,api.slider.innerWidth()),
								'zIndex' : index + 1
							}).children().bind(touch?'touchstart.noUi':'mousedown.noUi',functions.start);
						
						});
						
						if(s.click){
							api.slider.click(functions.click).find('*:not(.noUi-midBar)').click(functions.flse);
						}
						
						helpers.connect(api);

						/* expose */
						api.options=s;
						api.slider.data('api',api);
					
					});
				
				},
				move:				function(){
				
					var api, bounce, to, handle, scale;
					
					api = dup($(this).data('api'));
					api.options = $.extend( api.options, options );

					// rename legacy 'knob'
					if(api.options.knob){
						api.options.handle = api.options.knob;
					}
					
					// flatten out the legacy 'lower/upper' options
					handle	= api.options.handle;
					handle	= api.handles[handle == 'lower' || handle == 0 || typeof handle == 'undefined' ? 0 : 1];
					bounce	= helpers.bounce(api, helpers.scale(api.options.to, api.options.scale, api.slider.innerWidth()), handle.left(), handle);
					
					handle.css('left',bounce[0]);
					
					if( (handle.is(api.up) && handle.left() == 0) || (handle.is(api.low) && handle.left() == api.slider.innerWidth()) ){
						handle.css('zIndex',parseInt(handle.css('zIndex'))+2);
					}
					
					if(options.save===true){
						api.options.scale = options.scale;
						$(this).data('api',api);
					}
					
					helpers.connect(api);
					helpers.call(api.options.change, api.slider, 'move');
					helpers.call(api.options.end, api.slider, 'move');
					
				},
				value:				function(){
				
					var val1, val2, api;
					
					api = dup($(this).data('api'));
					api.options = $.extend( api.options, options );
					
					val1	= api.low ? Math.round(helpers.deScale(api.low.left(), api.options.scale, api.slider.innerWidth()))  : false;
					val2	= api.up ? Math.round(helpers.deScale(api.up.left(), api.options.scale, api.slider.innerWidth()))  : false;
					
					if(options.save){
						api.options.scale = options.scale;
						$(this).data('api',api);
					}
					
					return [val1,val2];
				
				},
				api:				function(){
					return $(this).data('api');
				},
				disable:			function(){
					return this.each( function(){
						$(this).addClass('disabled');
					});
				},
				enable:				function(){
					return this.each( function(){
						$(this).removeClass('disabled');
					});
				}

			},
			
			functions = {
			
				start:				function( e ){
				
					if(! $(this).parent().parent().hasClass('disabled') ){
					
						e.preventDefault();
						$('body').bind( 'selectstart.noUi' , functions.flse);
						$(this).addClass('noUi-activeHandle');
						
						$(document).bind(touch?'touchmove.noUi':'mousemove.noUi', functions.move);
						
						touch?$(this).bind('touchend.noUi',functions.end):$(document).bind('mouseup.noUi', functions.end);
					
					}

				},
				move:				function( e ){
				
					var a,b,h,api,go = false,handle,bounce;

					h		= $('.noUi-activeHandle');
					api		= h.parent().parent().data('api');
					handle	= h.parent().is(api.low) ? api.low : api.up;
					a		= e.pageX - Math.round( api.slider.offset().left );
					
					// if there is no pageX on the event, it is probably touch, so get it there.
					if(isNaN(a)){
						a = e.originalEvent.touches[0].pageX - Math.round( api.slider.offset().left );
					}
					
					// a = p.nw  == New position 
					// b = p.cur == Old position
					
					b		= handle.left();
					bounce	= helpers.bounce(api, a, b, handle);
					a		= bounce[0];
					go		= bounce[1];
					
					if ( api.options.step && !go){
					
						// makes range a [0,X>0] scale
						var v1 = api.options.scale[0];
						var v2 = api.options.scale[1];
						if(neg(v2)){ v2=abs(v1-v2); }
						// converts step to that range
						var con = helpers.scale( api.options.step, [0,v2+abs(v1)], api.slider.innerWidth() );
						
						// if the current movement is bigger than step, set to step.
						if ( Math.abs( b - a ) >= con ){
							a = a < b ? b-con : b+con;
							go = true;
						}
						
					} else {
						go = true;
					}
					
					if(a===b){
						go=false;
					}
					
					if(go){
					
						handle.css('left',a);
						if( (handle.is(api.up) && handle.left() == 0) || (handle.is(api.low) && handle.left() == api.slider.innerWidth()) ){
							handle.css('zIndex',parseInt(handle.css('zIndex'))+2);
						}
						helpers.connect(api);
						helpers.call(api.options.change, api.slider, 'slide');
					
					}

				},
				end:				function(){
				
					var h,api;
				
					h		= $('.noUi-activeHandle');
					api		= h.parent().parent().data('api');
					
					$(document).add('body').add(h.removeClass('noUi-activeHandle').parent()).unbind('.noUi');
					
					helpers.call(api.options.end, api.slider, 'slide');
				
				},
				click:				function( e ){
				
					if(! $(this).hasClass('disabled') ){
				
						var api = $(this).data('api');
						var s	= api.options;
						var c	= e.pageX - api.slider.offset().left;
						
						c = s.step ? roundTo(c,helpers.scale( s.step, s.scale, api.slider.innerWidth() )) : c;
						
						if( api.low && api.up ){
							c < ((api.low.left()+api.up.left())/2) ? api.low.css("left", c) : api.up.css("left", c);
						} else {
							api.handles[0].css('left',c);
						}
						
						helpers.connect(api);
						helpers.call(s.change, api.slider, 'click');
						helpers.call(s.end, api.slider, 'click');
						
					}

				},
				flse:				function(){
					return false;
				}
			
			}
		
			if ( methods[method] ) {
				return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
				return methods.init.apply( this, arguments );
			} else {
				$.error( 'No such method: ' +  method );
			}

		};
	
	})( jQuery );