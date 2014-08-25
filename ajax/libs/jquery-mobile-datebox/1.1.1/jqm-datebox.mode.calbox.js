/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* CALBOX Mode */
// Version Notes: <140 :: New button theme method, still use _hoover

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateToday: 'b',
		themeDayHigh: 'b',
		themeDatePick: 'b',
		themeDateHigh: 'b',
		themeDateHighAlt: 'b',
		themeDateHighRec: 'b',
		themeDate: 'a',
		
		calHighToday: true,
		calHighPick: true,
		
		calShowDays: true,
		calOnlyMonth: false,
		calWeekMode: false,
		calWeekModeDay: 1,
		calWeekHigh: false,
		calControlGroup: false,
		calShowWeek: false,
		calUsePickers: false,
		calNoHeader: false,
		
		useTodayButton: false,
		useCollapsedBut: false,
		
		highDays: false,
		highDates: false,
		highDatesRec: false,
		highDatesAlt: false,
		enableDates: false,
		calDateList: false,
		calShowDateList: false,
	});
	$.extend( $.mobile.datebox.prototype, {
		_cal_gen: function (start,prev,last,other,month) {
			var rc = 0, cc = 0, day = 1, 
				next = 1, cal = [], row = [], stop = false;
				
			for ( rc = 0; rc <= 5; rc++ ) {
				if ( stop === false ) {
					row = [];
					for ( cc = 0; cc <= 6; cc++ ) {
						if ( rc === 0 && cc < start ) {
							if ( other === true ) {
								row.push([prev + (cc - start) + 1,month-1]);
							} else {
								row.push(false);
							}
						} else if ( rc > 3 && day > last ) {
							if ( other === true ) {
								row.push([next,month+1]); next++;
							} else {
								row.push(false);
							}
							stop = true;
						} else {
							row.push([day,month]); day++;
							if ( day > last ) { stop = true; }
						}
					}
					cal.push(row);
				}
			}
			return cal;
		},
		_cal_check : function (cal, year, month, date) {
			var w = this, i,
				o = this.options,
				ret = {},
				day = new this._date(year,month,date,0,0,0,0).getDay();
				
			ret.ok = true;
			ret.iso = year + '-' + w._zPad(month+1) + '-' + w._zPad(date);
			ret.comp = parseInt(ret.iso.replace(/-/g, ''),10);
			ret.theme = o.themeDate;
			ret.recok = true;
			ret.rectheme = false;
			
			if ( o.blackDatesRec !== false ) {
				for ( i=0; i<o.blackDatesRec.length; i++ ) {
					if ( 
						( o.blackDatesRec[i][0] === -1 || o.blackDatesRec[i][0] === year ) &&
						( o.blackDatesRec[i][1] === -1 || o.blackDatesRec[i][1] === month ) &&
						( o.blackDatesRec[i][2] === -1 || o.blackDatesRec[i][2] === date )
					) { ret.recok = false; } 
				}
			}
			
			if ( $.isArray(o.enableDates) && $.inArray(ret.iso, o.enableDates) < 0 ) {
				ret.ok = false;
			} else if ( cal.checkDates ) {
				if (
					( ret.recok !== true ) ||
					( o.afterToday === true && cal.thisDate.comp() > ret.comp ) ||
					( o.beforeToday === true && cal.thisDate.comp() < ret.comp ) ||
					( o.notToday === true && cal.thisDate.comp() === ret.comp ) ||
					( o.maxDays !== false && cal.maxDate.comp() < ret.comp ) ||
					( o.minDays !== false && cal.minDate.comp() > ret.comp ) ||
					( $.isArray(o.blackDays) && $.inArray(day, o.blackDays) > -1 ) ||
					( $.isArray(o.blackDates) && $.inArray(ret.iso, o.blackDates) > -1 ) 
				) {
					ret.ok = false;
				}
			}
			if ( ret.ok ) {
				if ( o.highDatesRec !== false ) {
					for ( i=0; i<o.highDatesRec.length; i++ ) {
						if ( 
							( o.highDatesRec[i][0] === -1 || o.highDatesRec[i][0] === year ) &&
							( o.highDatesRec[i][1] === -1 || o.highDatesRec[i][1] === month ) &&
							( o.highDatesRec[i][2] === -1 || o.highDatesRec[i][2] === date )
						) { ret.rectheme = true; } 
					}
				}
				
				if ( o.calHighPick && date === cal.presetDay && ( w.d.input.val() !== "" | o.defaultValue !== false )) {
					ret.theme = o.themeDatePick;
				} else if ( o.calHighToday && ret.comp === cal.thisDate.comp() ) {
					ret.theme = o.themeDateToday;
				} else if ( $.isArray(o.highDatesAlt) && ($.inArray(ret.iso, o.highDatesAlt) > -1) ) {
					ret.theme = o.themeDateHighAlt;
				} else if ( $.isArray(o.highDates) && ($.inArray(ret.iso, o.highDates) > -1) ) {
					ret.theme = o.themeDateHigh;
				} else if ( $.isArray(o.highDays) && ($.inArray(day, o.highDays) > -1) ) {
					ret.theme = o.themeDayHigh;
				} else if ( $.isArray(o.highDatesRec) && ret.rectheme === true ) {
					ret.theme = o.themeDateHighRec;
				}
			}
			return ret;
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'calbox': function () {
			var w = this,
				o = this.options, i,
				cal = false,
				uid = 'ui-datebox-',
				temp = false, row = false, col = false, hRow = false, checked = false;
				
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.remove();
			}
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():w.__('titleDateDialogLabel'));
			w.d.intHTML = $('<span>');

			$('<div class="'+uid+'gridheader"><div class="'+uid+'gridlabel"><h4>' +
				w._formatter(w.__('calHeaderFormat'), w.theDate) +
				'</h4></div></div>').appendTo(w.d.intHTML);
				
			// Previous and next month buttons, define booleans to decide if they should do anything
			$("<div class='"+uid+"gridplus"+(w.__('isRTL')?'-rtl':'')+"'><a href='#'>"+w.__('nextMonth')+"</a></div>")
				.prependTo(w.d.intHTML.find('.'+uid+'gridheader'))
				.buttonMarkup({theme: o.themeDate, icon: 'arrow-r', inline: true, iconpos: 'notext', corners:true, shadow:true})
				.on(o.clickEventAlt, function(e) {
					e.preventDefault();
					if ( w.calNext ) {
						if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
						w._offset('m',1);
					}
				});
			$("<div class='"+uid+"gridminus"+(w.__('isRTL')?'-rtl':'')+"'><a href='#'>"+w.__('prevMonth')+"</a></div>")
				.prependTo(w.d.intHTML.find('.'+uid+'gridheader'))
				.buttonMarkup({theme: o.themeDate, icon: 'arrow-l', inline: true, iconpos: 'notext', corners:true, shadow:true})
				.on(o.clickEventAlt, function(e) {
					e.preventDefault();
					if ( w.calPrev ) {
						if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
						w._offset('m',-1);
					}
				});
				
			if ( o.calNoHeader === true ) { w.d.intHTML.find('.'+uid+'gridheader').remove(); }
			
			cal = {'today': -1, 'highlightDay': -1, 'presetDay': -1, 'startDay': w.__('calStartDay'),
				'thisDate': new w._date(), 'maxDate': w.initDate.copy(), 'minDate': w.initDate.copy(),
				'currentMonth': false, 'weekMode': 0, 'weekDays': null };
			cal.start = (w.theDate.copy([0],[0,0,1]).getDay() - w.__('calStartDay') + 7) % 7;
			cal.thisMonth = w.theDate.getMonth();
			cal.thisYear = w.theDate.getFullYear();
			cal.wk = w.theDate.copy([0],[0,0,1]).adj(2,(-1*cal.start)+(w.__('calStartDay')===0?1:0)).getDWeek(4);
			cal.end = 32 - w.theDate.copy([0],[0,0,32,13]).getDate();
			cal.lastend = 32 - w.theDate.copy([0,-1],[0,0,32,13]).getDate();
			cal.presetDate = (w.d.input.val() === "") ? w._startOffset(w._makeDate(w.d.input.val())) : w._makeDate(w.d.input.val());
			cal.thisDateArr = cal.thisDate.getArray();
			cal.theDateArr = w.theDate.getArray();
			cal.checkDates = ( $.inArray(false, [o.afterToday, o.beforeToday, o.notToday, o.maxDays, o.minDays, o.blackDates, o.blackDays]) > -1 );

			w.calNext = true;
			w.calPrev = true;
			
			if ( cal.thisDateArr[0] === cal.theDateArr[0] && cal.thisDateArr[1] === cal.theDateArr[1] ) { cal.currentMonth = true; } 
			if ( cal.presetDate.comp() === w.theDate.comp() ) { cal.presetDay = cal.presetDate.getDate(); }
			
			if ( o.afterToday === true && 
				( cal.currentMonth === true || ( cal.thisDateArr[1] >= cal.theDateArr[1] && cal.theDateArr[0] === cal.thisDateArr[0] ) ) ) { 
				w.calPrev = false; }
			if ( o.beforeToday === true &&
				( cal.currentMonth === true || ( cal.thisDateArr[1] <= cal.theDateArr[1] && cal.theDateArr[0] === cal.thisDateArr[0] ) ) ) {
				w.calNext = false; }
			
			if ( o.minDays !== false ) {
				cal.minDate.adj(2, -1*o.minDays);
				if ( cal.theDateArr[0] === cal.minDate.getFullYear() && cal.theDateArr[1] <= cal.minDate.getMonth() ) { w.calPrev = false;}
			}
			if ( o.maxDays !== false ) {
				cal.maxDate.adj(2, o.maxDays);
				if ( cal.theDateArr[0] === cal.maxDate.getFullYear() && cal.theDateArr[1] >= cal.maxDate.getMonth() ) { w.calNext = false;}
			}
			
			if ( o.calUsePickers === true ) {
				cal.picker = $('<div>', {'class': 'ui-grid-a ui-datebox-grid','style':'padding-top: 5px; padding-bottom: 5px;'});
				
				cal.picker1 = $('<div class="ui-block-a"><select name="pickmon"></select></div>').appendTo(cal.picker).find('select');
				cal.picker2 = $('<div class="ui-block-b"><select name="pickyar"></select></div>').appendTo(cal.picker).find('select');
				
				for ( i=0; i<=11; i++ ) {
					cal.picker1.append($('<option value="'+i+'"'+((cal.thisMonth===i)?' selected="selected"':'')+'>'+w.__('monthsOfYear')[i]+'</option>'));
				}
				for ( i=(cal.thisYear-6); i<=cal.thisYear+6; i++ ) {
					cal.picker2.append($('<option value="'+i+'"'+((cal.thisYear===i)?' selected="selected"':'')+'>'+i+'</option>'));
				}
				
				cal.picker1.on('change', function () { w.theDate.setMonth($(this).val()); w.refresh(); });
				cal.picker2.on('change', function () { w.theDate.setFullYear($(this).val()); w.refresh(); });
				
				cal.picker.find('select').selectmenu({mini:true, nativeMenu: true});
				cal.picker.appendTo(w.d.intHTML);
			}
			
			temp = $('<div class="'+uid+'grid">').appendTo(w.d.intHTML);
			
			if ( o.calShowDays ) {
				w._cal_days = w.__('daysOfWeekShort').concat(w.__('daysOfWeekShort'));
				cal.weekDays = $("<div>", {'class':uid+'gridrow'}).appendTo(temp);
				if ( w.__('isRTL') === true ) { cal.weekDays.css('direction', 'rtl'); }
				if ( o.calShowWeek ) { 
					$("<div>").addClass(uid+'griddate '+uid+'griddate-empty '+uid+'griddate-label').appendTo(cal.weekDays);
				}
				for ( i=0; i<=6;i++ ) {
					$("<div>"+w._cal_days[(i+cal.startDay)%7]+"</div>").addClass(uid+'griddate '+uid+'griddate-empty '+uid+'griddate-label').appendTo(cal.weekDays);
				}
			}
			
			cal.gen = w._cal_gen(cal.start, cal.lastend, cal.end, !o.calOnlyMonth, w.theDate.getMonth());
			for ( var row=0, rows=cal.gen.length; row < rows; row++ ) {
				hRow = $('<div>', {'class': uid+'gridrow'});
				if ( w.__('isRTL') ) { hRow.css('direction', 'rtl'); }
				if ( o.calShowWeek ) {
						$('<div>', {'class':uid+'griddate '+uid+'griddate-empty'}).text('W'+cal.wk).appendTo(hRow);
						cal.wk++;
						if ( cal.wk > 52 && typeof cal.gen[parseInt(row,10)+1] !== 'undefined' ) { cal.wk = new Date(cal.theDateArr[0],cal.theDateArr[1],((w.__('calStartDay')===0)?cal.gen[parseInt(row,10)+1][1][0]:cal.gen[parseInt(row,10)+1][0][0])).getDWeek(4); }
					} 
				for ( var col=0, cols=cal.gen[row].length; col<cols; col++ ) {
					if ( o.calWeekMode ) { cal.weekMode = cal.gen[row][o.calWeekModeDay][0]; }
					if ( typeof cal.gen[row][col] === 'boolean' ) {
						$('<div>', {'class':uid+'griddate '+uid+'griddate-empty'}).appendTo(hRow);
					} else {
						checked = w._cal_check(cal, cal.theDateArr[0], cal.gen[row][col][1], cal.gen[row][col][0]);
						if (cal.gen[row][col][0]) {
							$("<div>"+String(cal.gen[row][col][0])+"</div>")
								.addClass( cal.thisMonth === cal.gen[row][col][1] ?
									(uid+'griddate ui-corner-all ui-btn ui-btn-'+(o.mobVer<140?'up-':'')+checked.theme + (checked.ok?'':' '+uid+'griddate-disable')):
									(uid+'griddate '+uid+'griddate-empty')
								)
								.jqmData('date', ((o.calWeekMode)?cal.weekMode:cal.gen[row][col][0]))
								.jqmData('theme', cal.thisMonth === cal.gen[row][col][1] ? checked.theme : '-')
								.jqmData('enabled', checked.ok)
								.jqmData('month', cal.gen[row][((o.calWeekMode)?o.calWeekModeDay:col)][1])
								.appendTo(hRow);
						}
					}
				}
				if ( o.calControlGroup === true ) {
					hRow.find('.ui-corner-all').removeClass('ui-corner-all').eq(0).addClass('ui-corner-left').end().last().addClass('ui-corner-right').addClass('ui-controlgroup-last');
				}
				hRow.appendTo(temp);
			}
			if ( o.calShowWeek ) { temp.find('.'+uid+'griddate').addClass(uid+'griddate-week'); }
			
			if ( o.calShowDateList === true && o.calDateList !== false ) {
				cal.datelist = $('<div>');
				cal.datelistpick = $('<select name="pickdate"></select>').appendTo(cal.datelist);
				
				cal.datelistpick.append('<option value="false" selected="selected">'+w.__('calDateListLabel')+'</option>');
				for ( i=0; i<o.calDateList.length; i++ ) {
					cal.datelistpick.append($('<option value="'+o.calDateList[i][0]+'">'+o.calDateList[i][1]+'</option>'));
				}
				
				cal.datelistpick.on('change', function() {
					cal.datelistdate = $(this).val().split('-');
					w.theDate = new w._date(cal.datelistdate[0], cal.datelistdate[1]-1, cal.datelistdate[2], 0,0,0,0);
					w.d.input.trigger('datebox',{'method':'doset'});
				});
				
				cal.datelist.find('select').selectmenu({mini:true, nativeMenu:true});
				cal.datelist.appendTo(w.d.intHTML);
			}
			
			if ( o.useTodayButton || o.useClearButton ) {
				hRow = $('<div>', {'class':uid+'controls'});
				
				if ( o.useTodayButton ) {
					$('<a href="#">'+w.__('calTodayButtonLabel')+'</a>')
						.appendTo(hRow).buttonMarkup({theme: o.theme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.theDate = new w._date();
							w.theDate = new w._date(w.theDate.getFullYear(), w.theDate.getMonth(), w.theDate.getDate(),0,0,0,0);
							w.d.input.trigger('datebox',{'method':'doset'});
						});
				}
				if ( o.useClearButton ) {
					$('<a href="#">'+w.__('clearButton')+'</a>')
						.appendTo(hRow).buttonMarkup({theme: o.theme, icon: 'delete', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val('');
							w.d.input.trigger('datebox',{'method':'clear'});
							w.d.input.trigger('datebox',{'method':'close'});
						});
				}
				if ( o.useCollapsedBut ) {
					hRow.addClass('ui-datebox-collapse');
				}
				hRow.appendTo(temp);
			}
			
			w.d.intHTML.on(o.clickEventAlt+' vmouseover vmouseout', 'div.'+uid+'griddate', function(e) {
				if ( e.type === o.clickEventAlt ) {
					e.preventDefault();
					if ( $(this).jqmData('enabled') ) {
						w.theDate.setD(2,1).setD(1,$(this).jqmData('month')).setD(2,$(this).jqmData('date'));
						w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(w.__fmt(),w.theDate), 'date':w.theDate});
						w.d.input.trigger('datebox', {'method':'close'});
					}
				} else {
					if ( $(this).jqmData('enabled') && typeof $(this).jqmData('theme') !== 'undefined' && o.mobVer < 140 ) {
						if ( o.calWeekMode !== false && o.calWeekHigh === true ) {
							$(this).parent().find('div').each(function() { w._hoover(this); });
						} else { w._hoover(this); }
					}
				}
			});
			w.d.intHTML
				.on('swipeleft', function() { if ( w.calNext ) { w._offset('m', 1); } })
				.on('swiperight', function() { if ( w.calPrev ) { w._offset('m', -1); } });
			
			if ( w.wheelExists) { // Mousewheel operations, if plugin is loaded
				w.d.intHTML.on('mousewheel', function(e,d) {
					e.preventDefault();
					if ( d > 0 && w.calNext ) { 
						w.theDate.setD(2,1);
						w._offset('m', 1);
					}
					if ( d < 0 && w.calPrev ) {
						w.theDate.setD(2,1);
						w._offset('m', -1);
					}
				});
			}
		}
	});
})( jQuery );
