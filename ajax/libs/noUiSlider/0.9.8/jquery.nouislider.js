		(function( $ ){

			$.fn.noUiSlider = function( method, options ) {

				var settings = {
					'dontActivate'	: '',			// Set to Upper or lower. Default = '';
					'bar'			: '',			// Use bar
					'startMax'		: 75,			// Percentage of the sliderbar to set the noUi_upperHandle to;
					'startMin'		: 25,			// Percentage of the sliderbar to set the noUi_lowerHandle to;
					'minValue'      : 0,			// Minimum selectable. Default: 0;
					'maxValue' 		: 'full',		// Maximum selectable. Default: 'full';
					'point'			: 'lower',		// Set point for Getvalue function. Default 'lower'.
				// Callbacks
					'change'		: '',
					'callback'		: '',			// Callback to be triggered on release of dot. 
					'tracker'		: '',			// Callback to be triggered on every dot movement.
					'clickmove'		: '',			// Callback to be triggered on movement by clicking.
					'step'			: 0,			// ALPHA: Set the slider to make steps in stead of fluid sliding.
					'minLimit'		: 0,			// Default zero point for getValue calculator.
					'maxLimit'		: 100			// Default maxpoint for getValue calculator.
				};

				var methods = {

					init:		function init(){
					
								return this.each(function(){
								
									function setMidBar(useMidObject){

										var one = $(useMidObject).children(".noUi_lowerHandle").css('left');
										var two = $(useMidObject).children(".noUi_upperHandle").css('left');

										one = parseInt(one.replace("px",""));
										two = parseInt(two.replace("px",""));
									
										$(useMidObject).children(".noUi_midBar").css("left",(one+lowerWidth)).css("width",(two-(one+lowerWidth)));

									}

									function activate(useObject){

										$(useObject).click(function(e) { e.stopPropagation(); });

										function getMinimum(useMinObject){

											var minimumavailable = options.minValue;		// Setting

											if ( useMinObject.hasClass('noUi_lowerHandle') ){
											
												return minimumavailable;
												
											} else {
											
												var value = $(useMinObject).parent().children('.noUi_lowerHandle').css("left");
													value = value.replace("px","");
													value = parseInt(value);
											
												return ( lowerWidth + value );
											
											}
										}
										
										function getMaximum(useMaxObject){

											var maximumavailable = options.maxValue;		// Setting
										
											if ( maximumavailable == 'full' ){
												
												maximumavailable = $(useMaxObject).parent().css('width');
												maximumavailable = maximumavailable.replace("px","");
												maximumavailable = maximumavailable - upperWidth;
											}

											if ( useMaxObject.hasClass('noUi_upperHandle') ){
											
												return maximumavailable;
												
											} else {
											
												var value =  $(useMaxObject).parent().children('.noUi_upperHandle').css("left");
													value = value.replace("px","");
													value = parseInt(value);
													value = value - lowerWidth;
											
												return ( value );
											
											}
										
										}
										
										var mainObject = useObject.parent();
									
										$(useObject).mousedown(function(e){

											var previousxpos = e.pageX;
											var previousstore;
											var counter = 0;
											var currentvalue;
											var poselementleft = $(this).css("left");
												poselementleft = poselementleft.replace("px","");
											var registeredmovement;

												$(useObject).children().addClass('noUi_activeHandle');
											
												$(document).mousemove(function(f){

													if ( options.step == 0 ){
													
														poselementleft = $(useObject).css("left");
														poselementleft = poselementleft.replace("px","");
													
														currentvalue = f.pageX;
														registeredmovement = currentvalue - previousxpos;

														var tomove = parseInt(poselementleft) + parseInt(registeredmovement);
														
														if (tomove > getMinimum(useObject)){
															
															if (tomove <= getMaximum(useObject) ){
																$(useObject).css("left",tomove);
															} else {
																$(useObject).css("left",getMaximum(useObject));
															}

														} else {
															$(useObject).css("left",getMinimum(useObject));
														}

														if ( options.bar != "off"){
															setMidBar(mainObject);
														}
														
														previousxpos = currentvalue;

													} else {	
													
														if ( f.pageX > previousstore ) {
															counter++;
														} else {
															counter--;
														}
														
														var maxwidth = $(useObject).parent().css('width');
															maxwidth = parseInt(maxwidth.replace("px",""));
															
														var maxstep = (( maxwidth * options.step ) / 100 );
														
														if ( counter > maxstep || counter < ( -1 * maxstep ) ){

															poselementleft = $(useObject).css("left");
															poselementleft = parseInt(poselementleft.replace("px",""));

															$(useObject).css("left", poselementleft + counter);
															counter = 0;
															
															setMidBar(mainObject);
															
														}
														
														previousstore = f.pageX;

													}
													
													if ( typeof options.tracker == 'function' ){
														options.tracker.call(this);
													}

												});

											$(document).bind('mouseup.NoUiSlider', function(){
											
												$(useObject).children().removeClass('noUi_activeHandle');
											
												$(document).unbind('mousemove');
												$(document).unbind('mouseup.NoUiSlider');
												
												if( typeof options.callback == 'function' ){
													options.callback.call(this);
												}
												
												if( typeof options.change == 'function' ){
													options.change.call(this);
												}
												
											});

										});
										
										if ( options.bar != "off"){
											setMidBar(mainObject);
										}

									}

								// Add required children to sliderbar

									$(this).css('position','relative').append('<div class="noUi_handle noUi_lowerHandle" onmousedown="event.preventDefault ? event.preventDefault() : event.returnValue = false"><div class="noUi_sliderKnob"></div></div>');
									
								// If the midbar is to be used...
									if ( options.bar != "off"){
										$(this).append('<div class="noUi_midBar"></div>');
									}
									
									$(this).append('<div class="noUi_handle noUi_upperHandle" onmousedown="event.preventDefault ? event.preventDefault() : event.returnValue = false"><div class="noUi_sliderKnob"></div></div><div style="display:none !important;" id="noUi_wait"></div>');

									$(this).children().css('position', 'absolute');
									
								// Hide unwanted dots
									if ( options.dontActivate == "upper" ){
										$(this).children(".noUi_upperHandle").css('width',0).children(".noUi_sliderKnob").hide();
									}
									if ( options.dontActivate == "lower" ){
										$(this).children(".noUi_lowerHandle").css('width',0).children(".noUi_sliderKnob").hide();
									}	
								
								// Get width's of dots.
									var lowerWidth = $(this).children(".noUi_lowerHandle").css('width')
										lowerWidth = parseInt(lowerWidth.replace("px",""));
									var upperWidth = $(this).children(".noUi_upperHandle").css('width')
										upperWidth = parseInt(upperWidth.replace("px",""));
										
								// Get width of bar.		
									var maxwidth = parseInt(($(this).css('width')).replace("px",""));
									
								// Set dots to defined starting point.	
									var startMaxValue = ( ( (options.startMax) * ( maxwidth - upperWidth) ) / 100 );
									var startMinValue = ( ( (options.startMin) * ( maxwidth - lowerWidth) ) / 100 );
								
									$(this).children(".noUi_lowerHandle").css('left',startMinValue);							
									$(this).children(".noUi_upperHandle").css('left',startMaxValue);	

								// Activate, if requested.
									if ( options.dontActivate != "upper" ){
										activate($(this).children(".noUi_upperHandle"));
									}
									if ( options.dontActivate != "lower" ){
										activate($(this).children(".noUi_lowerHandle"));
									}

								// ClickMove	

									$(this).click(function(e){

										var dot0 = e.pageX;
										var thebar = ($(this).offset()).left;
										
										if ( options.dontActivate != "lower" && options.dontActivate != "upper" ){
											
											var dot1 = ($(this).children(".noUi_lowerHandle").offset()).left;
											var dot2 = ($(this).children(".noUi_upperHandle").offset()).left;
											
											var z = ( (dot1 + dot2) / 2 );

											if ( dot0 > z ){
												$(this).children(".noUi_upperHandle").css("left", (dot0 - thebar));
											} else {
												$(this).children(".noUi_lowerHandle").css("left", (dot0 - thebar));
											}
											
										} else {
										
											if ( options.dontActivate != "lower" ){
												$(this).children(".noUi_lowerHandle").css("left", (dot0 - thebar));
											}
											if ( options.dontActivate != "upper" ){
												$(this).children(".noUi_upperHandle").css("left", (dot0 - thebar));
											}

										}
											
										if ( options.bar != "off"){
											setMidBar($(this));
										}
										
										if ( typeof options.clickmove == "function" ){
											options.clickmove.call(this);
										}
										
										if ( typeof options.change == "function" ){
											options.change.call(this);
										}

									});
									
								// -

								}); // end of return this.	
									
								},
							
					getValue:	function getValue(){

									var lowerWidth = this.children(".noUi_lowerHandle").css('width')
										lowerWidth = parseInt(lowerWidth.replace("px",""));
									var upperWidth = this.children(".noUi_upperHandle").css('width')
										upperWidth = parseInt(upperWidth.replace("px",""));

									var maxwidth = this.css('width');
										maxwidth = maxwidth.replace("px","");

									scaleMin = options.minLimit;
									scaleMax = options.maxLimit;
									useObject = options.point;

									if ( useObject == "lower" ){
										var val = $(this.children(".noUi_lowerHandle")).css("left");
										val = parseInt(val.replace("px",""));
										maxwidth = maxwidth - lowerWidth;
									}
									
									if ( useObject == "upper" ){
										var val = $(this.children(".noUi_upperHandle")).css("left");
										val = parseInt(val.replace("px",""));
										maxwidth = maxwidth - upperWidth;
									}

									var calc = ( ( scaleMax - scaleMin ) );
										calc = ( maxwidth / calc );
										calc = ( val / calc );
										
									return ( calc + scaleMin ) ;
								}
					
				};

				if ( options ){
					if ( options.dontActivate ) {
					
						if ( !options.startMin ){
							options.startMin = 0;
						}
						
						if ( !options.startMax ){
							options.startMax = 100;
						}
					
					}
				}
				
				var options = $.extend( settings, options );

				if ( methods[method] ) {
					return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
				} else if ( typeof method === 'object' || ! method ) {
					return methods.init.apply( this, arguments );
				} else {
					$.error( 'Method ' +  method + ' does not exist on jQuery.noUiSlider' );
				}

			};

		})( jQuery );