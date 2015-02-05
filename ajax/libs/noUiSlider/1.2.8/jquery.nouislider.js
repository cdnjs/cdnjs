		(function( $ ){

			$.fn.noUiSlider = function( method, options ) {

				var settings = {
					'bar'			: true,			// Should the bar be used? Set to 'false' or LEGACY 'off'
					'dontActivate'	: '',			// Set to Upper or lower.
					'scale'			: '',			// NEW. Use like [0,50] or omit.
					'startMin'		: '25',			
					'startMax'		: '75',
					
					'point'			: '',			// Accepts [array/both, lower, upper, 0, 1]
					'saveScale'		: false,
					'moveStyle'		: '',			// set To Animate!
					'setTo'			: '',			// INT, [INT,INT]

				// Callbacks	*/
					'change'		: '',
					'callback'		: '',			// Callback to be triggered on release of dot. 
					'knobRelease'	: '',			// rename for Callback
					'tracker'		: '',			// Callback to be triggered on every dot movement.
					'clickmove'		: '',			// Callback to be triggered on movement by clicking.
				};

				function rebuildMidBar(element){
					var handles=new Array();
					if(element.find('.noUi_handle.noUi_lowerHandle').length){
						handles[0]=parseInt(element.find('.noUi_handle.noUi_lowerHandle').css('left'));
						if(isNaN(handles[0])){handles[0] = 0;}
					} else { handles[0] = 0; }
					if(element.find('.noUi_handle.noUi_upperHandle').length){
						handles[1]=(parseInt(element.css('width'))-parseInt(element.find('.noUi_handle.noUi_upperHandle').css('left')));
						if(isNaN(handles[1])){handles[1] = '100%';}
					} else { handles[1] = 0; }
					element.find('.noUi_midBar').css({'left':handles[0],'right':handles[1]});
				}

				function locToScale(element, input, knob, scale){
					var elementWidth = parseInt(element.css('width'));
					var knobWidth = parseInt(knob.css('width'));
					if(!scale){ scale=[0,100]; }
					return ((elementWidth/(scale[1]-scale[0]))*(parseInt(input)-scale[0]))-(knobWidth/2);
				}
				
				function scaleToLoc(element, knob, scale){
					var elementWidth = parseInt(element.css('width'));
					var knobWidth = parseInt(knob.css('width'));
					if(!scale){ scale=[0,100]; }
					
					var left=knob.css('left');
					// gitHub issue #6;
					if(left=='auto'){left=0;}
					
					var value = parseInt(left) + ( knobWidth/2 );
						value = value / ( elementWidth / (scale[1]-scale[0]) );
						value = value + scale[0];
					
					return value;
				}
				
				var methods = {

					init:		function init(){
						
									return this.each(function(){
									
										if(!settings.knobRelease && settings.callBack){
											settings.knobRelease=settings.callBack;
										}
									
										var element = $(this);
										var elementWidth = parseInt(element.css('width'));
									
										$.event.props = $.event.props.join('|').replace('layerX|layerY|', '').split('|');

										$(this).css('position','relative');
										
										if(settings.dontActivate.toLowerCase()!='lower'){
											$(this).append('<div class="noUi_handle noUi_lowerHandle"><div class="noUi_sliderKnob"></div></div>');
										}
										
										if(settings.bar && settings.bar!='off'){
											$(this).append('<div class="noUi_midBar"></div>');
										}
										
										if(settings.dontActivate.toLowerCase()!='upper'){
											$(this).append('<div class="noUi_handle noUi_upperHandle"><div class="noUi_sliderKnob"></div></div>');
										}
										
										$(this).data('activated',[element.find('.noUi_handle.noUi_lowerHandle').length,element.find('.noUi_handle.noUi_upperHandle').length]);
										
										$(this)
											.children().css('position', 'absolute')
										;
										
										$(this)
											.data('change',options.change)
										;
										
										$(this)
											.find('.noUi_midBar')
											.css({'left':0,'right':0})
										;
										
										if(settings.scale){
											$(this).data('scale', settings.scale);
										}
										
										var knobs = $(this).find('.noUi_sliderKnob');
										
										knobs.each(function(){
											
											var knob = $(this).parent('.noUi_handle');

											if(knob.hasClass('noUi_lowerHandle')&&(settings.startMin || (settings.startMin===0))){
												if(typeof(settings.startMin)=='string' && (settings.startMin.indexOf('%')!=-1)){
													knob.css('left', locToScale(element,settings.startMin,knob));
												} else {
													knob.css('left', locToScale(element,settings.startMin,knob,settings.scale));
												}
											}
											
											if(knob.hasClass('noUi_upperHandle')&&settings.startMax){
												if(typeof(settings.startMax)=='string' && (settings.startMax.indexOf('%')!=-1)){
													knob.css('left', locToScale(element,settings.startMax,knob));
												} else {
													knob.css('left', locToScale(element,settings.startMax,knob,settings.scale));
												}
											}
										
										});
										
										if(settings.bar && settings.bar!='off'){rebuildMidBar(element);}

										knobs.bind('mousedown.noUiSlider',function(e){

											/* Fixes */
												e.preventDefault();
												$('body').bind('selectstart.noUiSlider', function(e){return false;});
												$(this).addClass('noUi_activeHandle');
										
											var knob = $(this).parent('.noUi_handle');
											
											var status = element.data('activated')[0] && element.data('activated')[1];

											$(document).bind('mousemove.noUiSlider', function(f){

												var knobCorrection=parseInt(knob.css('width'));
												var flattened = f.pageX-(element.offset().left);	// GitHub issue #5, fix by instanceoftom
											
												/* lower knob */
											
												if(knob.hasClass('noUi_lowerHandle')||!status){
												
													if(flattened<(-1*(parseInt(knob.css('width'))/2))){
														flattened=(-1*(parseInt(knob.css('width'))/2));
													}
													
													if(status){
														var l=(parseInt(knob.parent().find('.noUi_upperHandle').css('left'))-knobCorrection);
														if(flattened>l){
															flattened=l;
														}
													}
												
												}
												
												/* upper knob */
												
												if(knob.hasClass('noUi_upperHandle')||!status){
												
													var correctedElementWidth = (elementWidth-(knobCorrection/2));
													
													if(flattened>correctedElementWidth){
														flattened=correctedElementWidth;
													}
													
													if(status){
														var l=(parseInt(knob.parent().find('.noUi_lowerHandle').css('left'))+knobCorrection);
														if(flattened<l){
															flattened=l;
														}
													}
													
												}

												knob.css({'left':flattened});
												
												if(settings.bar&&settings.bar!='off'){
													rebuildMidBar(element);
												}
												
												if ( typeof(options.tracker) == "function" ){ options.tracker.call(this); }
											
											});

											$(document).bind('mouseup.noUiSlider',function(){

												$(this).unbind('mousemove.noUiSlider');
												knobs.removeClass('noUi_activeHandle');
												$('body').unbind('selectstart.noUiSlider');

												if ( typeof(options.knobRelease) == "function" ){ options.knobRelease.call(element); }
												if ( typeof(options.change) == "function" ){ options.change.call(element); }
												
												$(this).unbind('mouseup.noUiSlider');
											});
										
										});

										$(this).bind('click.noUiSlider',function(e){
										
											var dot0 = e.pageX;
											var thebar = $(this).offset().left;
											
											if($(this).data('activated')[0] && $(this).data('activated')[1]){
												
												var dot1 = $(this).children(".noUi_lowerHandle").offset().left;
												var dot2 = $(this).children(".noUi_upperHandle").offset().left;
												
												var z = (dot1 + dot2) / 2;

												if ( dot0 > z ){
													$(this).children(".noUi_upperHandle").css("left", (dot0 - thebar));
												} else {
													$(this).children(".noUi_lowerHandle").css("left", (dot0 - thebar));
												}

											} else {
												if ($(this).data('activated')[0]){
													$(this).children(".noUi_lowerHandle").css("left", (dot0 - thebar));
												}
												if ($(this).data('activated')[1]){
													$(this).children(".noUi_upperHandle").css("left", (dot0 - thebar));
												}
											}
											
											if(settings.bar&&settings.bar!='off'){
												rebuildMidBar(element);
											}
											
											if ( typeof(options.clickmove) == "function" ){ options.clickmove.call(this); }
											if ( typeof(options.change) == "function" ){ options.change.call(this); }
											
											e.stopPropagation();

										}).children().not('.noUi_midBar').click(function(e) {
											return false;	// issue 6
										});
										
									});
									
								},
								
					move:		function move(){

									var element = $(this);

									var ok = false;
									
									/* if point was omitted */
									if(!settings.point){
										if($(this).data('activated')[0] && $(this).data('activated')[1]){
											ok = true;
										} else {
											if($(this).data('activated')[0]){
												settings.point = 0;
											}
											if($(this).data('activated')[1]){
												settings.point = 1;
											}
										}
									}
									
									if(settings.saveScale){
										$(this).data('scale',settings.scale);
									}
					
									/* if scale was omitted */
									if(!settings.scale){
										if(!$(this).data('scale')){
											settings.scale=[0,100];
										} else {
											settings.scale=$(this).data('scale');
										}									
									}
									
									/* It is not necessary to specify an array for one dot. */
									if(typeof(settings.setTo)!='object'){
										if(settings.point=='lower'||settings.point==0){
											settings.setTo = [settings.setTo,0]
										}
										if(settings.point=='upper'||settings.point==1){
											settings.setTo = [0,settings.setTo]
										}
									}
									
									if(settings.point=='lower'||settings.point==0 ||ok){
										var newKnob1 = $(this).find('.noUi_lowerHandle');
										var value1 = locToScale(element, settings.setTo[0], newKnob1, settings.scale);
										if(settings.moveStyle=='animate'){
											newKnob1.animate({'left':value1}, {step: function(){if(settings.bar&&settings.bar!='off'){ rebuildMidBar(element); }}});
										} else {
											newKnob1.css('left',value1);
										}
									}
									
									if(settings.point=='upper'||settings.point==1||ok){
										var newKnob2 = $(this).find('.noUi_upperHandle');
										var value2 = locToScale(element, settings.setTo[1],  newKnob2, settings.scale );
										if(settings.moveStyle=='animate'){
											newKnob2.animate({'left':value2}, {step: function(){if(settings.bar&&settings.bar!='off'){ rebuildMidBar(element); }}});
										} else {
											newKnob2.css('left',value2);
										}
									}
									
									var changeFunction=$(this).data('change');
									if(settings.bar&&settings.bar!='off'){ rebuildMidBar(element); }
									if ( typeof(changeFunction) == "function" ){ changeFunction.call(this); }
									
								},
								
					reset:		function reset(){
					
					
								},
							
					getValue:	function getValue(){
					
									if(!settings.point){ settings.point = 'array'; }

									if(!settings.scale){
										if($(this).data('scale')=='undefined'){
											settings.scale=[0,100];
										} else {
											settings.scale=$(this).data('scale');
										}									
									}

									returnA = new Array();
									
									if($(this).data('activated')[0]){
										returnA.push(scaleToLoc($(this), $(this).find('.noUi_lowerHandle'), settings.scale));
									}
									
									if($(this).data('activated')[1]){
										returnA.push(scaleToLoc($(this), $(this).find('.noUi_upperHandle'), settings.scale));
									}
									
									if(settings.point=='lower'||settings.point==0){
										return returnA[0];
									}
									
									if(settings.point=='upper'||settings.point==1){
										return returnA[1];
									}
									
									if(settings.point=='array'){
										return returnA;
									}
					
								}

				};

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