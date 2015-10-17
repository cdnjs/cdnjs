/** 
 * @preserve jQuery DateTimePicker plugin v1.1.0
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * (c) 2013, Chupurnov Valeriy.
 */
(function( $ ){
	$.fn.datetimepicker = function( opt ){
		var 
			CTRLKEY = 17,
			DEL = 46,
			ENTER = 13,
			ESC = 27,
			BACKSPACE = 8,
			ARROWLEFT = 37,
			ARROWUP = 38,
			ARROWRIGHT = 39,
			ARROWDOWN = 40,
			TAB = 9,
			F5 = 116,
			AKEY = 65,
			CKEY = 67,
			VKEY = 86,
			ZKEY = 90,
			YKEY = 89;
		var default_options  = {
			i18n:{
				ru:{
					months:[
						'Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
					],
					dayOfWeek:[
						"Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
					]
				},
				en:{
					months: [
						"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
					],
					dayOfWeek: [
						"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
					]
				},
				de:{
					months:[
						'Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'
					],
					dayOfWeek:[
						"So.", "Mo", "Di", "Mi", "Do", "Fr", "Sa."
					]
				},
				nl:{
					months:[
						"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
					],
					dayOfWeek:[
						"zo", "ma", "di", "wo", "do", "vr", "za"
					]
				}
			},
			value:'',
			lang:'en',
			format:'Y/m/d H:i',
			formatTime:'H:i',
			formatDate:'Y/m/d',
			step:60,
			closeOnDateSelect:0,
			closeOnWithoutClick:true,
			timepicker:true,
			datepicker:true,
			minDate:false,
			maxDate:false,
			minTime:false,
			maxTime:false,
			allowTimes:[],
			opened:false,
			inline:false,
			onSelectDate:function(){},
			onSelectTime:function(){},
			onChangeMonth:function(){},
			onChangeDateTime:function(){},
			onShow:function(){},
			onClose:function(){},
			withoutCopyright:true,
			inverseButton:false,
			hours12:false,
			next:	'xdsoft_next',
			prev : 'xdsoft_prev',
			dayOfWeekStart:0,
			timeHeightInTimePicker:25,
			timepickerScrollbar:true,
			scrollMonth:true,
			scrollTime:true,
			scrollInput:true,
			mask:false
		};
		var options = ($.isPlainObject(opt)||!opt)?$.extend({},default_options,opt):$.extend({},default_options);
		var createDateTimePicker = function( input ){
			var datetimepicker = $('<div class="xdsoft_datetimepicker"></div>'),
				xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
				datepicker = $('<div class="xdsoft_datepicker active"></div>'),
				mounth_picker = $('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_label xdsoft_month"></div><div class="xdsoft_label xdsoft_year"></div><button type="button" class="xdsoft_next"></button></div>'),
				calendar = $('<div class="xdsoft_calendar"></div>'),
				timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
				timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
				timebox = $('<div class="xdsoft_time_variant"></div>'),
				scrollbar = $('<div class="xdsoft_scrollbar"></div>'),
				scroller = $('<div class="xdsoft_scroller"></div>');
			
			datetimepicker.setOptions = function( _options ){
				options = $.extend({},options,_options);
				if( options.inline ){
					datetimepicker.addClass('xdsoft_inline');
					input.after(datetimepicker).hide();
				}
				if( options.open||options.opened||options.inline ){
					input.trigger('open.xdsoft');
				}
				if( options.inverseButton ){
					options.next = 'xdsoft_prev';
					options.prev = 'xdsoft_next';
				}
				if( !options.datepicker && options.timepicker )
					datepicker.removeClass('active');
				if( options.datepicker && !options.timepicker )
					timepicker.removeClass('active');
				if( options.value )
					input&&input.val&&input.val(options.value);
				if( isNaN(options.dayOfWeekStart)||parseInt(options.dayOfWeekStart)<0||parseInt(options.dayOfWeekStart)>6 )
					options.dayOfWeekStart = 0;
				else 
					options.dayOfWeekStart = parseInt(options.dayOfWeekStart);
				if( !options.timepickerScrollbar )
					scrollbar.hide();
				var tmpDate = [];
				if( options.minDate && ( tmpDate = /^-(.*)$/.exec(options.minDate) ) && (tmpDate=Date.parseDate(tmpDate[1], options.formatDate)) ){
					options.minDate = new Date((new Date).getTime()-tmpDate.getTime()).dateFormat( options.formatDate );
				}
				if( options.maxDate && ( tmpDate = /^\+(.*)$/.exec(options.maxDate) ) && (tmpDate=Date.parseDate(tmpDate[1], options.formatDate)) ){
					options.maxDate = new Date((new Date).getTime()+tmpDate.getTime()).dateFormat( options.formatDate );
				}
				if( options.mask ){
					var ctrlDown=false,e,
						getCaretPos = function( input ) {
							try{
								if ( document.selection && document.selection.createRange ) {
									var range = document.selection.createRange();
									return range.getBookmark().charCodeAt(2) - 2;
								}else
									if ( input.setSelectionRange )
										return input.selectionStart;
							}catch(e){
								return 0;
							}
						},
						setCaretPos = function (node,pos){
							var node = (typeof node == "string" || node instanceof String) ? document.getElementById(node) : node;
							if(!node){
								return false;
							}else if(node.createTextRange){
								var textRange = node.createTextRange();
								textRange.collapse(true);
								textRange.moveEnd(pos);
								textRange.moveStart(pos);
								textRange.select();
								return true;
							}else if(node.setSelectionRange){
								node.setSelectionRange(pos,pos);
								return true;
							}
							return false;
						},
						isValidValue = function( mask,value ){
							var reg = mask
								.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g,'\\$1')
								.replace(/_/g,'{digit+}')
								.replace(/([0-9]{1})/g,'{digit$1}')
								.replace(/\{digit([0-9]{1})\}/g,'[0-$1_]{1}')
								.replace(/\{digit[\+]\}/g,'[0-9_]{1}');
							return RegExp(reg).test(value);
						};
					$(document).on('keydown.xdsoft',function(e){
						if ( e.keyCode == CTRLKEY ) 
							ctrlDown = true;
					}).on('keyup.xdsoft',function(e){
						if ( e.keyCode == CTRLKEY )
							ctrlDown = false;
					});
					input.off('keydown.xdsoft');
					switch(true){
						case (options.mask===true):
							options.mask = (new Date()).dateFormat( options.format );
							options.mask = options.mask.replace(/[0-9]/g,'_');
						case ($.type(options.mask) == 'string'):
							if( !isValidValue( options.mask,input.val() ) )
								input.val(options.mask.replace(/[0-9]/g,'_'))
							input.on('keydown.xdsoft',function( event ){
									var val = this.value , key = event.which;
									switch(true){
										case ((key>=48&&key<=57)||(key>=96&&key<=105))||(key==BACKSPACE||key==DEL):
											var pos = getCaretPos(this),
												digit = ( key!=BACKSPACE&&key!=DEL )?String.fromCharCode(key):'_';
											if( (key==BACKSPACE||key==DEL)&&pos ){
												pos--;
												digit='_';
											}
											while( /[^0-9_]/.test(options.mask.substr(pos,1))&&pos<options.mask.length&&pos>0 )
												pos+=( key==BACKSPACE||key==DEL )?-1:1;
												
											val = val.substr(0,pos)+digit+val.substr(pos+1);
											if( $.trim(val)=='' )
												val = options.mask.replace(/[0-9]/g,'_');
											else 
												if( pos==options.mask.length )
													break;
											pos+=(key==BACKSPACE||key==DEL)?0:1;
											while( /[^0-9_]/.test(options.mask.substr(pos,1))&&pos<options.mask.length&&pos>0 )
												pos+=(key==BACKSPACE||key==DEL)?-1:1;
											if( isValidValue( options.mask,val ) ){
												this.value = val;
												setCaretPos(this,pos);
											}else if( $.trim(val)=='' )
												this.value = options.mask.replace(/[0-9]/g,'_');
											else{
												input.trigger('error_input.xdsoft');
											}
										break;
										case (([AKEY,CKEY,VKEY,ZKEY,YKEY].indexOf(key)!==-1)&&(ctrlDown)):
										 case [ESC,ARROWUP,ARROWDOWN,ARROWLEFT,ARROWRIGHT,F5,CTRLKEY].indexOf(key)!==-1:
											return true;
										case [ENTER,TAB].indexOf(options.mask,key)!==-1:
											var elementSelector = "input:visible,textarea:visible";
											$(elementSelector ).eq($(elementSelector ).index(this) + 1).focus();
										return false;
									}
									event.preventDefault();
									return false;
								});
						break;
					}
				}
				options.dayOfWeekStartPrev = (options.dayOfWeekStart==0)?6:options.dayOfWeekStart-1;
			};
			datetimepicker.data('options',options);
			datetimepicker.on('mousedown.xdsoft',function( event ){
				event.stopPropagation();
				event.preventDefault();
				return false;
			});
			// scrollbar for timepicker
			scrollbar.append(scroller);
			timepicker.find('.xdsoft_time_box').append(scrollbar);
			(function(){
				var move = 0;
				scroller.on('mousedown.xdsoft',function( event ){
					var pageY = event.pageY,
						top = parseInt(scroller.css('margin-top')),
						h1 = scrollbar[0].offsetHeight;
					$('body').addClass('xdsoft_noselect');
					$([document.body,window]).on('mouseup.xdsoft',function(){
						$([document.body,window]).off('mouseup.xdsoft',arguments.callee)
							.off('mousemove.xdsoft',move)
							.removeClass('xdsoft_noselect');
					});
					$('body').on('mousemove.xdsoft',move = function(event){
						var offset = event.pageY-pageY+top;
						if( offset<0 )
							offset = 0;
						if( offset+scroller[0].offsetHeight>h1 )
							offset = h1-scroller[0].offsetHeight;
						
						scroller.css('margin-top',offset);
						datetimepicker.trigger('scroll.scrollbar',[offset]);
					});
				});
				datetimepicker.on('scroll.timebox',function( event,offset ){
					if( !options.timepickerScrollbar )
						return;
					var sbh 	= scrollbar.height()-scroller[0].offsetHeight,
						pheight = timeboxparent[0].offsetHeight-2,
						height 	= timebox[0].offsetHeight,
						percent = offset/(height-pheight);
					scroller.css('margin-top',sbh*percent);
				})
				.on('open.xdsoft',function( event ){
					if( !options.timepickerScrollbar )
						return;
					var pheight = timeboxparent[0].offsetHeight-2;
						height 	= timebox[0].offsetHeight,
						percent = pheight/height,
						sh = percent*scrollbar[0].offsetHeight;
					if( percent>1 )
						scroller.hide();
					else{
						scroller.show();
						scroller.css('height',parseInt(sh>10?sh:10));
					}
				});
				
			})();
			
			datetimepicker.on('scroll.scrollbar',function(event,offset){
				var sbh = scrollbar[0].offsetHeight-scroller[0].offsetHeight,
					percent = offset/sbh;
					pheight = timeboxparent[0].offsetHeight-2,
					height = timebox[0].offsetHeight;
				timebox.css('marginTop',-parseInt((height-pheight)*percent))
			});
			timepicker.find('.xdsoft_time_box').append(timebox);
			datetimepicker.append(datepicker).append(timepicker);
			if( options.withoutCopyright!==true )
				datetimepicker.append(xdsoft_copyright);
			datepicker.append(mounth_picker).append(calendar);
			$('body').append(datetimepicker);
			var xdsoft_datetime = function(){
				var self = this;
				self.now = function(){
					return new Date();
				};
				self.currentTime = this.now();
				self.isValidDate = function (d) {
					if ( Object.prototype.toString.call(d) !== "[object Date]" )
						return false;
					return !isNaN(d.getTime());
				};
				self.setCurrentTime = function( dTime){
					self.currentTime = (typeof dTime == 'string')? self.strtodatetime(dTime) : self.isValidDate(dTime) ? dTime: self.now();
					datetimepicker.trigger('change.xdsoft');
				};
				self.getCurrentTime = function( dTime){
					return self.currentTime;
				};
				self.nextMonth = function(){
					var month = self.currentTime.getMonth()+1;
					if( month==12 ){
						self.currentTime.setFullYear(self.currentTime.getFullYear()+1);
						month = 0;
					}
					self.currentTime.setMonth(month);
					options.onChangeMonth&&options.onChangeMonth.call&&options.onChangeMonth.call(datetimepicker,datetimepicker.data('xdsoft_datetime').currentTime,datetimepicker.data('input'));
					datetimepicker.trigger('change.xdsoft');
					return month;
				};
				self.prevMonth = function(){
					var month = self.currentTime.getMonth()-1;
					if( month==-1 ){
						self.currentTime.setFullYear(self.currentTime.getFullYear()-1);
						month = 11;
					}
					self.currentTime.setMonth(month);
					options.onChangeMonth&&options.onChangeMonth.call&&options.onChangeMonth.call(datetimepicker,datetimepicker.data('xdsoft_datetime').currentTime,datetimepicker.data('input'));
					datetimepicker.trigger('change.xdsoft');
					return month;
				};
				
				this.strtodatetime = function( sDateTime ){
					var currentTime = sDateTime?Date.parseDate(sDateTime, options.format):new Date;
					if( ! self.isValidDate(currentTime) )
						currentTime = new Date;
					return currentTime;
				};
				this.strtodate = function( sDate ){
					var currentTime = sDate?Date.parseDate(sDate, options.formatDate):new Date;
					if( !self.isValidDate(currentTime) )
						currentTime = new Date;
					return currentTime;
				};
				this.strtotime = function( sTime ){
					var currentTime = sTime?Date.parseDate(sTime, options.formatTime):new Date;
					if( ! self.isValidDate(currentTime) )
						currentTime = new Date;
					return currentTime;
				};
				this.str = function(){
					return this.currentTime.dateFormat(options.format);
				};	
			};
			mounth_picker.find('.xdsoft_prev,.xdsoft_next').on('mousedown.xdsoft',function(){
				var $this = $(this), timer = 0, stop = false;
				(function(v){
					var month =  datetimepicker.data('xdsoft_datetime').currentTime.getMonth();
					if( $this.hasClass( options.next ) ){
						datetimepicker.data('xdsoft_datetime').nextMonth();
					}else if( $this.hasClass( options.prev ) ){
						datetimepicker.data('xdsoft_datetime').prevMonth();
					}
					!stop&&(timer = setTimeout(arguments.callee,v?v:100));
				})(500);
				$([document.body,window]).on('mouseup.xdsoft',function(){
					clearTimeout(timer);
					stop = true;
					$([document.body,window]).off('mouseup.xdsoft',arguments.callee);
				});
			});
			timepicker.find('.xdsoft_prev,.xdsoft_next').on('mousedown.xdsoft',function(){
				var $this = $(this), timer = 0, stop = false, period = 110;
				(function(v){
					var pheight = timeboxparent[0].offsetHeight-2,
						height = timebox[0].offsetHeight,
						top = Math.abs(parseInt(timebox.css('marginTop')));
					if( $this.hasClass(options.next) && (height-pheight)- options.timeHeightInTimePicker>=top ){
						timebox.css('marginTop','-'+(top+options.timeHeightInTimePicker)+'px')
					}else if( $this.hasClass(options.prev) && top-options.timeHeightInTimePicker>=0  ){
						timebox.css('marginTop','-'+(top-options.timeHeightInTimePicker)+'px')
					}
					datetimepicker.trigger('scroll.timebox',[Math.abs(parseInt(timebox.css('marginTop')))]);
					period= ( period>10 )?10:period-10;
					!stop&&(timer = setTimeout(arguments.callee,v?v:period));
				})(500);
				$([document.body,window]).on('mouseup.xdsoft',function(){
					clearTimeout(timer);
					stop = true;
					$([document.body,window]).off('mouseup.xdsoft',arguments.callee);
				});
			});	
			datetimepicker.on('change.xdsoft',function(){
				var xd 		=	$(this).data('xdsoft_datetime'),
					table 	=	'';
				var start = new Date(xd.currentTime.getFullYear(),xd.currentTime.getMonth(),1);
				while( start.getDay()!=options.dayOfWeekStart )
					start.setDate(start.getDate()-1);
				var i = 0, today = new Date;
				table+='<table><thead><tr>';
				for(var j = 0; j<7; j++)
					table+='<th>'+options.i18n[options.lang].dayOfWeek[(j+options.dayOfWeekStart)>6?0:j+options.dayOfWeekStart]+'</th>';
				table+='</tr></thead>';
				table+='<tbody><tr>';
				while( i<xd.currentTime.getDaysInMonth()||start.getDay()!=options.dayOfWeekStart||xd.currentTime.getMonth()==start.getMonth() ){
					i++;
					table+='<td data-date="'+start.getDate()+'" data-month="'+start.getMonth()+'" data-year="'+start.getFullYear()+'"'+
						' class="'+
							(
								(options.maxDate!==false&&Math.round(xd.strtodate(options.maxDate).getTime()/86400000)<Math.round(start.getTime()/86400000))||
								(options.minDate!==false&&Math.round(xd.strtodate(options.minDate).getTime()/86400000)>Math.round(start.getTime()/86400000))
							?'xdsoft_disabled ':' ')+
							(xd.currentTime.getMonth()!=start.getMonth()?' xdsoft_other_month ':' ')+
							(xd.currentTime.dateFormat('d.m.Y')==start.dateFormat('d.m.Y')?' xdsoft_current ':' ')+
							(today.dateFormat('d.m.Y')==start.dateFormat('d.m.Y')?' xdsoft_today ':' ')
						+'"><div>'+start.getDate()+'</div></td>';
					if( start.getDay()==options.dayOfWeekStartPrev )
						table+='</tr>';
					start.setDate(start.getDate()+1);
				}
				table+='</tbody></table>';
				calendar.html(table);
				mounth_picker.find('.xdsoft_label').eq(0).text(options.i18n[options.lang].months[xd.currentTime.getMonth()]);
				mounth_picker.find('.xdsoft_label').eq(1).text(xd.currentTime.getFullYear());
				var time = '',h = '',m ='';
				var line_time = function (h,m){
					var now = new Date();
					now.setHours(h);
					h = parseInt(now.getHours());
					now.setMinutes(m);
					m = parseInt(now.getMinutes());
					time+= '<div class="'+
								(
									(options.maxTime!==false&&xd.strtotime(options.maxTime).getTime()<now.getTime())||
									(options.minTime!==false&&xd.strtotime(options.minTime).getTime()>now.getTime())
								?'xdsoft_disabled ':' ')+
								(
									(parseInt(xd.currentTime.getHours())==parseInt(h)
								&&
									parseInt(xd.currentTime.getMinutes()/options.step)*options.step==parseInt(m)
								)?' xdsoft_current ':'')+
								((parseInt(today.getHours())==parseInt(h)&&parseInt(today.getMinutes())==parseInt(m))?' xdsoft_today ':'')+
								'" data-hour="'+h+'" data-minute="'+m+'">'+now.dateFormat(options.formatTime)+'</div>';
				};
				if( !options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length ){
					for(var i=0;i<(options.hours12?12:24);i++){
						for(var j=0;j<60;j+=options.step){
							h = (i<10?'0':'')+i;
							m = (j<10?'0':'')+j;
							line_time(h,m);
						}
					}
				}else{
					for(var i=0;i<options.allowTimes.length;i++){
						h = xd.strtotime(options.allowTimes[i]).getHours();
						m = xd.strtotime(options.allowTimes[i]).getMinutes();
						line_time(h,m);
					}
				}
				timebox.html(time);
				//timebox.find('.xdsoft_current').length&&timebox.css('marginTop','-'+parseInt(timebox.find('.xdsoft_current').index()*options.timeHeightInTimePicker)+'px');
			});
			datetimepicker.on('open.xdsoft',function(){
				if( timebox.find('.xdsoft_current').length ){
					var pheight = timeboxparent[0].offsetHeight-2,
						height = timebox[0].offsetHeight,
						top = timebox.find('.xdsoft_current').index()*options.timeHeightInTimePicker+1;
					if( (height-pheight)<top )
						top = height-pheight;
					timebox.css('marginTop','-'+parseInt(top)+'px');
				}
			});
			calendar.on('mousedown.xdsoft','td',function(){
				if($(this).hasClass('xdsoft_disabled'))
					return false;
				var ct = datetimepicker.data('xdsoft_datetime').currentTime;
				ct.setFullYear($(this).data('year'));
				ct.setMonth($(this).data('month'));
				ct.setDate($(this).data('date'));
				datetimepicker.trigger('select.xdsoft',[ct]);
				input.val( datetimepicker.data('xdsoft_datetime').str() );
				if( (options.closeOnDateSelect===true||( options.closeOnDateSelect===0&&!options.timepicker ))&&!options.inline )
					datetimepicker.trigger('close.xdsoft');
				options.onSelectDate&&options.onSelectDate.call&&options.onSelectDate.call(datetimepicker,datetimepicker.data('xdsoft_datetime').currentTime,datetimepicker.data('input'));
				datetimepicker.trigger('change.xdsoft');
				datetimepicker.trigger('changedatetime.xdsoft');
			});		
			timebox.on('mousedown.xdsoft','div',function(){
				if($(this).hasClass('xdsoft_disabled'))
					return false;
				var ct = datetimepicker.data('xdsoft_datetime').currentTime;
				ct.setHours($(this).data('hour'));
				ct.setMinutes($(this).data('minute'));
				datetimepicker.trigger('select.xdsoft',[ct]);
				datetimepicker.data('input').val( datetimepicker.data('xdsoft_datetime').str() );
				!options.inline&&datetimepicker.trigger('close.xdsoft');
				options.onSelectTime&&options.onSelectTime.call&&options.onSelectTime.call(datetimepicker,datetimepicker.data('xdsoft_datetime').currentTime,datetimepicker.data('input'));
				datetimepicker.trigger('change.xdsoft');
				datetimepicker.trigger('changedatetime.xdsoft');
			});
			datetimepicker.mousewheel&&datepicker.mousewheel(function(event, delta, deltaX, deltaY) {
				if( !options.scrollMonth )
					return true;
				if( delta<0 )
					datetimepicker.data('xdsoft_datetime').nextMonth();
				else
					datetimepicker.data('xdsoft_datetime').prevMonth();
				return false;
			});		
			datetimepicker.mousewheel&&timepicker.mousewheel(function(event, delta, deltaX, deltaY) {
				if( !options.scrollTime )
					return true;
				var pheight = timeboxparent[0].offsetHeight-2,
					height = timebox[0].offsetHeight,
					top = Math.abs(parseInt(timebox.css('marginTop'))),
					fl = true;
				if( delta<0 && (height-pheight)-options.timeHeightInTimePicker>=top ){
					timebox.css('marginTop','-'+(top+options.timeHeightInTimePicker)+'px');
					fl = false;
				}else if( delta>0&&top-options.timeHeightInTimePicker>=0 ){
					timebox.css('marginTop','-'+(top-options.timeHeightInTimePicker)+'px');
					fl = false;
				}
				datetimepicker.trigger('scroll.timebox',[Math.abs(parseInt(timebox.css('marginTop')))]);
				return fl;
			});
			datetimepicker.on('changedatetime.xdsoft',function(){
				options.onChangeDateTime&&options.onChangeDateTime.call&&options.onChangeDateTime.call(datetimepicker,datetimepicker.data('xdsoft_datetime').currentTime,datetimepicker.data('input'));
			});
			var current_time_index = 0;
			input.mousewheel&&input.mousewheel(function( event, delta, deltaX, deltaY ){
				if( !options.scrollInput )
					return true;
				if( !options.datepicker && options.timepicker ){
					current_time_index = timebox.find('.xdsoft_current').length?timebox.find('.xdsoft_current').eq(0).index():0;
					if( current_time_index+delta>=0&&current_time_index+delta<timebox.children().length )
						current_time_index+=delta;
					timebox.children().eq(current_time_index).length&&timebox.children().eq(current_time_index).trigger('mousedown');
					return false;
				}else if( options.datepicker && !options.timepicker ){
					datepicker.trigger( event, [delta, deltaX, deltaY]);
					input.val&&input.val( datetimepicker.data('xdsoft_datetime').str() );
					datetimepicker.trigger('changedatetime.xdsoft');
					return false;
				}
			});
			datetimepicker.on('open.xdsoft',function(){
				var onShow = true;
				options.onShow&&options.onShow.call&&(onShow=options.onShow.call(datetimepicker,datetimepicker.data('xdsoft_datetime').currentTime,datetimepicker.data('input')));
				if( onShow!==false ){
					var setPos = function(){
						var offset = datetimepicker.data('input').offset(), top = offset.top+datetimepicker.data('input')[0].offsetHeight-1;
						if( top+datetimepicker[0].offsetHeight>$('body').height() )
							top = offset.top-datetimepicker[0].offsetHeight+1;
						datetimepicker.css({
							left:offset.left,
							top:top	
						});
					};
					datetimepicker.show();
					setPos();
					$(window).on('resize.xdsoft',setPos);
					
					if( options.closeOnWithoutClick ){
						$([document.body,window]).on('mousedown.xdsoft',function(){
							datetimepicker.trigger('close.xdsoft');
							$([document.body,window]).off('mousedown.xdsoft',arguments.callee);
						});
					}
				}
			}); 
			datetimepicker.on( 'close.xdsoft',function(){
				var onClose = true;
				options.onClose&&options.onClose.call&&(onClose=options.onClose.call(datetimepicker,datetimepicker.data('xdsoft_datetime').currentTime,datetimepicker.data('input')));
				if( onClose!==false&&!options.opened&&!options.inline ){
					datetimepicker.hide();
				}
			} );
			datetimepicker.data('input',input);
			
			var _xdsoft_datetime = new xdsoft_datetime,timer = 0,timer1 = 0;
			datetimepicker.data('xdsoft_datetime',_xdsoft_datetime);
			datetimepicker.setOptions(options);
			_xdsoft_datetime.setCurrentTime( options.value?options.value:(input&&input.val&&input.val())?input.val():new Date );
			input.data( 'xdsoft_datetimepicker',datetimepicker )
			 .on('open.xdsoft focusin.xdsoft mousedown.xdsoft',function(event){
				if( input.is(':disabled')||input.is(':hidden')||!input.is(':visible') )
					return;
				clearTimeout(timer);
				timer = setTimeout(function(){
					if( input.is(':disabled')||input.is(':hidden')||!input.is(':visible') )
						return;
					_xdsoft_datetime.setCurrentTime((input&&input.val&&input.val())?input.val():new Date);
					datetimepicker.trigger( 'open.xdsoft' );
				},100);
			 })
			 .on('focusout.xdsoft',function(event){
				clearTimeout(timer1);
				timer1 = setTimeout(function(){
					datetimepicker.trigger('close.xdsoft');
				},100);
			 });
		};
		var destroyDateTimePicker = function(input){
			var datetimepicker = input.data('xdsoft_datetimepicker');
			if( datetimepicker ){
				var _xdsoft_datetime = datetimepicker.data('xdsoft_datetime');
				delete _xdsoft_datetime;
				datetimepicker.remove();
				delete datetimepicker;
				input.data( 'xdsoft_datetimepicker',null );
				input.off( 'open.xdsoft focusin.xdsoft focusout.xdsoft mousedown.xdsoft' );
				$(window).off('resize.xdsoft');
				$([window,document.body]).off('mousedown.xdsoft');
				input.unmousewheel&&input.unmousewheel();
				delete options;
			}
		};
		return this.each(function(){
			var datetimepicker;
			if( datetimepicker = $(this).data('xdsoft_datetimepicker') ){
				if( $.type(opt) === 'string' ){
					switch(opt){
						case 'show':
							$(this).select().focus();
							datetimepicker.trigger( 'open.xdsoft' );
						break;
						case 'hide':
							datetimepicker.trigger('close.xdsoft');
						break;
						case 'destroy':
							destroyDateTimePicker($(this));
						break;
					}
				}else{
					$(this).data('xdsoft_datetimepicker').setOptions(options);
				}
				return 0;
			}else
				($.type(opt) !== 'string')&&createDateTimePicker($(this));
		});
	};
})( jQuery );

//http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
/*
 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, version 2.1.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 */
Date.parseFunctions={count:0};Date.parseRegexes=[];Date.formatFunctions={count:0};Date.prototype.dateFormat=function(format){if(Date.formatFunctions[format]==null){Date.createNewFormat(format)}var func=Date.formatFunctions[format];return this[func]()};Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++;Date.formatFunctions[format]=funcName;var code="Date.prototype."+funcName+" = function(){return ";var special=false;var ch='';for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true}else if(special){special=false;code+="'"+String.escape(ch)+"' + "}else{code+=Date.getFormatCode(ch)}}eval(code.substring(0,code.length-3)+";}")};Date.getFormatCode=function(character){switch(character){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";case"D":return"Date.dayNames[this.getDay()].substring(0, 3) + ";case"j":return"this.getDate() + ";case"l":return"Date.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"this.getWeekOfYear() + ";case"F":return"Date.monthNames[this.getMonth()] + ";case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"Date.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"String.leftPad(this.getHours(), 2, '0') + ";case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"this.getGMTOffset() + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+String.escape(character)+"' + "}};Date.parseDate=function(input,format){if(Date.parseFunctions[format]==null){Date.createParser(format)}var func=Date.parseFunctions[format];return Date[func](input)};Date.createParser=function(format){var funcName="parse"+Date.parseFunctions.count++;var regexNum=Date.parseRegexes.length;var currentGroup=1;Date.parseFunctions[format]=funcName;var code="Date."+funcName+" = function(input){\n"+"var y = -1, m = -1, d = -1, h = -1, i = -1, s = -1;\n"+"var d = new Date();\n"+"y = d.getFullYear();\n"+"m = d.getMonth();\n"+"d = d.getDate();\n"+"var results = input.match(Date.parseRegexes["+regexNum+"]);\n"+"if (results && results.length > 0) {";var regex="";var special=false;var ch='';for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true}else if(special){special=false;regex+=String.escape(ch)}else{obj=Date.formatCodeToRegex(ch,currentGroup);currentGroup+=obj.g;regex+=obj.s;if(obj.g&&obj.c){code+=obj.c}}}code+="if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n"+"{return new Date(y, m, d, h, i, s);}\n"+"else if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n"+"{return new Date(y, m, d, h, i);}\n"+"else if (y > 0 && m >= 0 && d > 0 && h >= 0)\n"+"{return new Date(y, m, d, h);}\n"+"else if (y > 0 && m >= 0 && d > 0)\n"+"{return new Date(y, m, d);}\n"+"else if (y > 0 && m >= 0)\n"+"{return new Date(y, m);}\n"+"else if (y > 0)\n"+"{return new Date(y);}\n"+"}return null;}";Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$");eval(code)};Date.formatCodeToRegex=function(character,currentGroup){switch(character){case"D":return{g:0,c:null,s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};case"j":case"d":return{g:1,c:"d = parseInt(results["+currentGroup+"], 10);\n",s:"(\\d{1,2})"};case"l":return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"};case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};case"w":return{g:0,c:null,s:"\\d"};case"z":return{g:0,c:null,s:"(?:\\d{1,3})"};case"W":return{g:0,c:null,s:"(?:\\d{2})"};case"F":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+currentGroup+"].substring(0, 3)], 10);\n",s:"("+Date.monthNames.join("|")+")"};case"M":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+currentGroup+"]], 10);\n",s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};case"n":case"m":return{g:1,c:"m = parseInt(results["+currentGroup+"], 10) - 1;\n",s:"(\\d{1,2})"};case"t":return{g:0,c:null,s:"\\d{1,2}"};case"L":return{g:0,c:null,s:"(?:1|0)"};case"Y":return{g:1,c:"y = parseInt(results["+currentGroup+"], 10);\n",s:"(\\d{4})"};case"y":return{g:1,c:"var ty = parseInt(results["+currentGroup+"], 10);\n"+"y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};case"a":return{g:1,c:"if (results["+currentGroup+"] == 'am') {\n"+"if (h == 12) { h = 0; }\n"+"} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};case"A":return{g:1,c:"if (results["+currentGroup+"] == 'AM') {\n"+"if (h == 12) { h = 0; }\n"+"} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};case"g":case"G":case"h":case"H":return{g:1,c:"h = parseInt(results["+currentGroup+"], 10);\n",s:"(\\d{1,2})"};case"i":return{g:1,c:"i = parseInt(results["+currentGroup+"], 10);\n",s:"(\\d{2})"};case"s":return{g:1,c:"s = parseInt(results["+currentGroup+"], 10);\n",s:"(\\d{2})"};case"O":return{g:0,c:null,s:"[+-]\\d{4}"};case"T":return{g:0,c:null,s:"[A-Z]{3}"};case"Z":return{g:0,c:null,s:"[+-]\\d{1,5}"};default:return{g:0,c:null,s:String.escape(character)}}};Date.prototype.getTimezone=function(){return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3")};Date.prototype.getGMTOffset=function(){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(this.getTimezoneOffset()/60),2,"0")+String.leftPad(this.getTimezoneOffset()%60,2,"0")};Date.prototype.getDayOfYear=function(){var num=0;Date.daysInMonth[1]=this.isLeapYear()?29:28;for(var i=0;i<this.getMonth();++i){num+=Date.daysInMonth[i]}return num+this.getDate()-1};Date.prototype.getWeekOfYear=function(){var now=this.getDayOfYear()+(4-this.getDay());var jan1=new Date(this.getFullYear(),0,1);var then=(7-jan1.getDay()+4);document.write(then);return String.leftPad(((now-then)/7)+1,2,"0")};Date.prototype.isLeapYear=function(){var year=this.getFullYear();return((year&3)==0&&(year%100||(year%400==0&&year)))};Date.prototype.getFirstDayOfMonth=function(){var day=(this.getDay()-(this.getDate()-1))%7;return(day<0)?(day+7):day};Date.prototype.getLastDayOfMonth=function(){var day=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;return(day<0)?(day+7):day};Date.prototype.getDaysInMonth=function(){Date.daysInMonth[1]=this.isLeapYear()?29:28;return Date.daysInMonth[this.getMonth()]};Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}};String.escape=function(string){return string.replace(/('|\\)/g,"\\$1")};String.leftPad=function(val,size,ch){var result=new String(val);if(ch==null){ch=" "}while(result.length<size){result=ch+result}return result};Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.y2kYear=50;Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};Date.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};

//https://github.com/brandonaaron/jquery-mousewheel/blob/master/jquery.mousewheel.js
/*
 * Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 *
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports==='object'){module.exports=factory}else{factory(jQuery)}}(function($){var toFix=['wheel','mousewheel','DOMMouseScroll','MozMousePixelScroll'];var toBind='onwheel'in document||document.documentMode>=9?['wheel']:['mousewheel','DomMouseScroll','MozMousePixelScroll'];var lowestDelta,lowestDeltaXY;if($.event.fixHooks){for(var i=toFix.length;i;){$.event.fixHooks[toFix[--i]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=toBind.length;i;){this.addEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=toBind.length;i;){this.removeEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0,absDeltaXY=0,fn;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta}if(orgEvent.detail){delta=orgEvent.detail*-1}if(orgEvent.deltaY){deltaY=orgEvent.deltaY*-1;delta=deltaY}if(orgEvent.deltaX){deltaX=orgEvent.deltaX;delta=deltaX*-1}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY}if(orgEvent.wheelDeltaX!==undefined){deltaX=orgEvent.wheelDeltaX*-1}absDelta=Math.abs(delta);if(!lowestDelta||absDelta<lowestDelta){lowestDelta=absDelta}absDeltaXY=Math.max(Math.abs(deltaY),Math.abs(deltaX));if(!lowestDeltaXY||absDeltaXY<lowestDeltaXY){lowestDeltaXY=absDeltaXY}fn=delta>0?'floor':'ceil';delta=Math[fn](delta/lowestDelta);deltaX=Math[fn](deltaX/lowestDeltaXY);deltaY=Math[fn](deltaY/lowestDeltaXY);args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}}));
