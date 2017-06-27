/* noUiSlider 3.0.9 */
(function($){

	$.fn.noUiSlider = function(options,flag){
	
		// remap the native/current val function to noUiSlider
		var valFUNCTION = jQuery.fn.val;
		jQuery.fn.val = function(){
			return this.data('_isnS_')?methods.val.call(this,arguments[0]):valFUNCTION.apply(this,arguments);
		}
		
		// test for mouse, pointer or touch
		var EVENT = window.navigator.msPointerEnabled ? 2 : 'ontouchstart' in document.documentElement ? 3 : 1;
		
		// shorthand for test=function, calling
		function call( f, scope, args ){
			if ( typeof(f) == "function" ){ f.call(scope, args) }
		}
		
		// bounce handles of eachother, the edges of the slider
		function correct(proposal,slider,handle){
		
			var
			 setup		= slider.data('setup')
			,handles	= setup.handles
			,settings	= setup.settings
			,pos		= setup.pos;
			
			proposal = proposal < 0 ? 0 : proposal > 100 ? 100 : proposal;
			
			if(settings.handles==2){
				if(handle.is(':first-child')){
					var other = parseFloat(handles[1][0].style[pos]) - settings.margin;
					proposal = proposal > other ? other : proposal;
				} else {
					var other = parseFloat(handles[0][0].style[pos]) + settings.margin;
					proposal = proposal < other ? other : proposal;
				}
			}
			
			if(settings.step){
				var per = percentage.from(settings.range,settings.step);
				proposal = Math.round(proposal / per) * per;
			}
			
			return proposal;
		
		}
		
		// get standarised clientX and clientY
		function client(f){
			return [(f.clientX||f.originalEvent.clientX||f.originalEvent.touches[0].clientX),(f.clientY||f.originalEvent.clientY||f.originalEvent.touches[0].clientY)];
		}
		
		// get native inline style value in %
		function place(handle,pos){
			return parseFloat(handle[0].style[pos]);
		}
		
		// function wrapper for calculating to and from range values
		var percentage = {
			 to: function( range, value ){
				value = range[0]<0 ? value+Math.abs(range[0]) : value-range[0];
				return ( value * 100 ) / this._length(range);	
			}
			,from: function( range, value ){
				return ( value * 100 ) / this._length(range);
			}
			,is: function( range, value ){
				return (( value * this._length(range) ) / 100 ) + range[0];
			}
			,_length: function( range ){
				return ( range[0] > range[1] ? range[0]-range[1] : range[1]-range[0] );
			}
		}
	
		// simplified defaults
		var defaults = {
			 handles: 2
			,serialization: { to: ['',''], resolution: 0.01 }
		};
	
		// contains all methods
		methods = {
			 create: function(){
				
				return this.each(function(){
		
					// set handle to position
					function setHandle(handle,to,slider){
						handle.css(pos,to+'%').data('input').val(percentage.is(settings.range,to).toFixed(res));
					}

					var
					 settings = $.extend( defaults, options )
				// handles
					,handlehtml = '<a><div></div></a>'
				// save this to variable, // allows identification
					,slider = $(this).data('_isnS_',true)
				// array of handles
					,handles = []
				// the way the handles are positioned for this slider, top/left
					,pos
				// for quick orientation testing and array matching
					,orientation
				// append classes	
					,classes = ""
				// tests numerical
					,num = function(e){
						return!isNaN(parseFloat(e))&&isFinite(e);
					}
				// counts decimals in serialization, sets default
					,split = (settings.serialization.resolution=settings.serialization.resolution||0.01).toString().split('.')
					,res = split[0] == 1 ? 0 : split[1].length;

					settings.start = num(settings.start) ? [settings.start,0] : settings.start;
					
					// logs bad input values, if possible
					$.each(settings,function(a,b){
						if(num(b)){
							settings[a]=parseFloat(b);
						}
						var e = false;
						switch(a){
							case 'range':
							case 'start': e = b.length!=2||!num(b[0])||!num(b[1]);break;
							case 'handles': e = (b<1||b>2||!num(b));break;
							case 'connect': e = b!="lower"&&b!="upper"&&typeof b!="boolean";break;
							case 'orientation': e = (b!="vertical"&&b!="horizontal");break;
							case 'margin': 
							case 'step': e = typeof b!="undefined"&&!num(b);break;
							case 'serialization': e = typeof b!="object" || !num(b.resolution) || (typeof b.to == 'object' && b.to.length !== settings.handles);break;
							case 'slide': e = typeof b != "function";break;
						}
						if(e && console){
							console.error('Bad input for '+a+' on slider:',slider); 
						}
					});
					
					settings.margin = settings.margin ? percentage.from(settings.range,settings.margin) : 0;
					
					// tests serialization to be strings or jQuery objects
					if(settings.serialization.to instanceof jQuery || typeof settings.serialization.to == 'string' || settings.serialization.to === false ){
						settings.serialization.to = [settings.serialization.to];
					}

					if(settings.orientation == "vertical"){
						classes += "vertical";
						pos = 'top';
						orientation = 1;
					} else {
						classes += "horizontal";
						pos = 'left';
						orientation = 0;
					}
					
					classes += settings.connect ? settings.connect == "lower" ? " connect lower" : " connect" : "";

					slider.addClass(classes);
					
					for(var i=0;i<settings.handles;i++){
					
						handles[i] = slider.append(handlehtml).children(':last');
						handles[i].css(pos,percentage.to(settings.range,settings.start[i])+'%');

						var bind = '.noUiSlider'
						var onEvent = 		(EVENT===1?'mousedown'	:EVENT===2?'MSPointerDown'	:'touchstart'	)+bind+'X';
						var moveEvent = 	(EVENT===1?'mousemove'	:EVENT===2?'MSPointerMove'	:'touchmove'	)+bind;
						var offEvent = 		(EVENT===1?'mouseup'	:EVENT===2?'MSPointerUp'	:'touchend'		)+bind;
						
						
						handles[i].find('div').on(onEvent,function(e){
						
							$('body').bind('selectstart'+bind,function(){ return false; });
						
							if(!slider.hasClass('disabled')){
							
								var handle = $(this).addClass('active').parent();
							
								$('body').addClass('TOUCH');
							
								var unbind = handle.add($(document)).add('body');
							
								var originalPosition = parseFloat(handle[0].style[pos]);
								var originalClick = client(e);
								var previousClick = originalClick;
								var previousProposal = false;
								
								$(document).on(moveEvent,function(f){
								
									f.preventDefault();
								
									var currentClick = client(f);
										currentClick[0]-=originalClick[0];
										currentClick[1]-=originalClick[1];
										
									var movement = [
										 previousClick[0]!=currentClick[0]
										,previousClick[1]!=currentClick[1]
									];
									
									var proposal = originalPosition + ((currentClick[orientation]*100)/(orientation?slider.height():slider.width()));
									
									proposal = correct(proposal,slider,handle);
									
									if(movement[orientation]&&proposal!=previousProposal){
										handle.css(pos,proposal+'%').data('input').val(percentage.is(settings.range,proposal).toFixed(res));
										call(settings.slide,slider.data('_n',true));
										previousProposal = proposal;
										handle.css('z-index',handles.length==2&&proposal==100&&handle.is(':first-child')?2:1);
									}
									
									previousClick = currentClick;
									
								});
								
								$(document).on(offEvent+' mouseLeave'+bind,function(){
									unbind.off(bind);
									$('body').removeClass('TOUCH');
									slider.find('.active').removeClass('active');
									if(slider.data('_n')){
										slider.data('_n',false).change();
									}
								});
							
							}
						
						}).on('click',function(e){
							e.stopPropagation();
						});
						
					}
						
					if(EVENT==1){
						slider.on('click',function(f){
						
							if(!slider.hasClass('disabled')){
							
								var currentClick = client(f),
									proposal = ((currentClick[orientation]-slider.offset()[pos])*100) / (orientation?slider.height():slider.width());

								if(handles.length>1){
									var handle = currentClick[orientation] < (handles[0].offset()[pos]+handles[1].offset()[pos])/2 ? handles[0] : handles[1];
								} else {
									var handle = handles[0];
								}
								
								setHandle(handle,correct(proposal,slider,handle),slider);
								call(settings.slide,slider);
								slider.change();
							
							}
						
						});
					}
					
					for(var i=0;i<handles.length;i++){
						var val = percentage.is(settings.range,place(handles[i],pos)).toFixed(res);
						if(typeof settings.serialization.to[i] == 'string'){
							handles[i].data('input',
								slider.append('<input type="hidden" name="'+settings.serialization.to[i]+'">').find('input:last')
								.val(val)
								.change(function(a){
									a.stopPropagation();
								})
							);
						} else if ( settings.serialization.to[i] == false ){
							handles[i].data('input',{val:function(a){
								if(typeof a != 'undefined'){
									this.handle.data('noUiVal',a);
								} else {
									return this.handle.data('noUiVal');
								}
							},handle:handles[i]});
						} else {
							handles[i].data('input',settings.serialization.to[i].data('handleNR',i).val(val).change(function(){
								var arr = [null,null];
								arr[$(this).data('handleNR')]=$(this).val();
								slider.val(arr);
							}));
						}
					}
					
					$(this).data('setup',{
						settings:settings,
						handles:handles,
						pos:pos,
						res:res
					});
					
				});
			}
			,val: function(){
			
				if(arguments[0]){
				
					var val = typeof arguments[0] == 'number' ? [arguments[0]] : arguments[0];
				
					return this.each(function(){
						
						var setup = $(this).data('setup');
					
						for(var i=0;i<setup.handles.length;i++){
							if(val[i]!=null){
								var proposal = correct(percentage.to(setup.settings.range,val[i]),$(this),setup.handles[i]);
								setup.handles[i].css(setup.pos,proposal+'%').data('input').val(percentage.is(setup.settings.range,proposal).toFixed(setup.res));
							}
						}
					});
					
				} else {
				
					var handles = $(this).data('setup').handles,re = [];
					for(var i=0;i<handles.length;i++){
						re.push(parseFloat(handles[i].data('input').val()));
					}
					return re.length == 1 ? re[0] : re;
					
				}
			}
			,disabled: function(){
				return flag ? $(this).addClass('disabled') : $(this).removeClass('disabled');
			}
		}
		
		return options == "disabled" ? methods.disabled.apply(this) : methods.create.apply(this);

	}		

})(jQuery);