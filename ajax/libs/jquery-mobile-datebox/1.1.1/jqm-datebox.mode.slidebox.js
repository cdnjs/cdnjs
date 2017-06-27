/* 
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* SLIDEBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateHigh: 'b',
		themeDatePick: 'b',
		themeDate: 'a',
		useSetButton: true,
		validHours: false,
		slen: {'y': 5, 'm':6, 'd':15, 'h':12, 'i':30}
	});
	$.extend( $.mobile.datebox.prototype, {
		'_sbox_pos': function () {
			var w = this, 
				ech, top, par, tot;
			
			w.d.intHTML.find('div.ui-datebox-sliderow-int').each(function () {
				ech = $(this);
				par = ech.parent().innerWidth();
				if ( w.__('isRTL') ) { 
					top = ech.find('div').last(); 
				} else {
					top = ech.find('div').first();
				}
				tot = ech.find('div').size() * top.outerWidth();
				top.css('marginLeft', ((tot/2)-(par/2))*-1);
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'slidebox': function () {
			var w = this,
				o = this.options, i, y, hRow, phRow, tmp, testDate,
				iDate = (w.d.input.val() === "") ? w._startOffset(w._makeDate(w.d.input.val())) : w._makeDate(w.d.input.val()),
				uid = 'ui-datebox-',
				thMod = (( this.options.mobVer < 140 ) ? 'up-' : ''),
				slideBase = $("<div class='"+uid+"sliderow-int'></div>"),
				phBase = $('<div>'),
				ctrl = $("<div>", {"class":uid+'slide'});
			
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.empty().remove()
			}
			
			w.d.input.on('datebox', function (e,p) {
				if ( p.method === 'postrefresh' ) { w._sbox_pos(); }
			});
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():w.__('titleDateDialogLabel'));
			w.d.intHTML = $('<span>')
			
			w.fldOrder = w.__('slideFieldOrder');
			w._check();
			w._minStepFix();
			
			$('<div class="'+uid+'header"><h4>'+w._formatter(w.__('headerFormat'), w.theDate)+'</h4></div>').appendTo(w.d.intHTML);
			
			w.d.intHTML.append(ctrl);
			
			for ( y=0; y<w.fldOrder.length; y++ ) {
				phRow = phBase.clone().jqmData('rowtype', w.fldOrder[y]);
				hRow = slideBase.clone().jqmData('rowtype', w.fldOrder[y]).appendTo(phRow);
				if ( w.__('isRTL') === true ) { hRow.css('direction', 'rtl'); }
				
				switch (w.fldOrder[y]) {
					case 'y':
						phRow.addClass(uid+'sliderow-ym');
						for ( i=o.slen.y*-1; i<(o.slen.y+1); i++ ) {
							tmp = (i!==0)?((iDate.get(0) === (w.theDate.get(0) + i))?o.themeDateHigh:o.themeDate):o.themeDatePick;
							$('<div>', {'class':uid+'slideyear ui-corner-all ui-btn ui-btn-'+thMod+tmp})
								.html(w.theDate.get(0)+i).jqmData('offset', i).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
					case 'm':
						phRow.addClass(uid+'sliderow-ym');
						for ( i=o.slen.m*-1; i<(o.slen.m+1); i++ ) {
							testDate = w.theDate.copy([0],[0,0,1]);
							testDate.adj(1,i);
							tmp = (i!==0)?((iDate.get(1) === testDate.get(1) && iDate.get(0) === testDate.get(0))?o.themeDateHigh:o.themeDate):o.themeDatePick;
							$('<div>', {'class':uid+'slidemonth ui-corner-all ui-btn ui-btn-'+thMod+tmp})
								.html(String(w.__('monthsOfYearShort')[testDate.get(1)]))
								.jqmData('offset', i)
								.jqmData('theme', tmp).appendTo(hRow);
						}
						break;
						
					case 'd':
						phRow.addClass(uid+'sliderow-d');
						for ( i=o.slen.d*-1; i<(o.slen.d+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(2,i);
							tmp = (i!==0)?((iDate.comp() === testDate.comp())?o.themeDateHigh:o.themeDate):o.themeDatePick;
							if ( ( o.blackDates !== false && $.inArray(testDate.iso(), o.blackDates) > -1 ) ||
								( o.blackDays !== false && $.inArray(testDate.getDay(), o.blackDays) > -1 ) ) {
								tmp += ' '+uid+'griddate-disable';
							}
							$('<div>', {'class':uid+'slideday ui-corner-all ui-btn ui-btn-'+thMod+tmp})
								.html(testDate.get(2) + '<br /><span class="'+uid+'slidewday">' + w.__('daysOfWeekShort')[testDate.getDay()] + '</span>')
								.jqmData('offset', i).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
					case 'h':
						phRow.addClass(uid+'sliderow-hi');
						for ( i=o.slen.h*-1; i<(o.slen.h+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(3,i);
							tmp = (i!==0)?o.themeDate:o.themeDatePick;
							if ( o.validHours !== false && $.inArray(testDate.get(3), o.validHours) < 0 ) {
								tmp += ' '+uid+'griddate-disable';
							}
							$('<div>', {'class':uid+'slidehour ui-corner-all ui-btn ui-btn-'+thMod+tmp})
								.html( w.__('timeFormat') === 12 ? w._formatter('%I<span class="'+uid+'slidewday">%p</span>', testDate) : testDate.get(3) )
								.jqmData('offset', i).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
					case 'i':
						phRow.addClass(uid+'sliderow-hi');
						for ( i=o.slen.i*-1; i<(o.slen.i+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(4,(i*o.minuteStep));
							tmp = (i!==0)?o.themeDate:o.themeDatePick;
							$('<div>', {'class':uid+'slidemins ui-corner-all ui-btn ui-btn-'+thMod+tmp})
								.html(w._zPad(testDate.get(4))).jqmData('offset', i*o.minuteStep).jqmData('theme', tmp).appendTo(hRow);
						}
						break;
				}
				phRow.appendTo(ctrl);
			}
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $('<div>', {'class':uid+'controls'});
				
				if ( o.useSetButton ) {
					$('<a href="#">'+w.__('setDateButtonLabel')+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							if ( w.dateOK === true ) {
								w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(w.__fmt(),w.theDate), 'date':w.theDate});
								w.d.input.trigger('datebox', {'method':'close'});
							}
						});
				}
				if ( o.useClearButton ) {
					$('<a href="#">'+w.__('clearButton')+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'delete', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val('');
							w.d.input.trigger('datebox',{'method':'clear'});
							w.d.input.trigger('datebox',{'method':'close'});
						});
				}
				if ( o.useCollapsedBut ) {
					y.addClass('ui-datebox-collapse');
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				w.d.intHTML.on('mousewheel', '.ui-datebox-sliderow-int', function(e,d) {
					e.preventDefault();
					w._offset($(this).jqmData('rowtype'), ((d<0)?-1:1)*($(this).jqmData('rowtype')==='i'?o.minuteStep:1));
				});
			}
			
			w.d.intHTML.on(o.clickEvent, '.ui-datebox-sliderow-int>div', function(e) {
				e.preventDefault();
				w._offset($(this).parent().jqmData('rowtype'), parseInt($(this).jqmData('offset'),10));
			});
			w.d.intHTML.on('vmouseover vmouseout', '.ui-datebox-sliderow-int>div', function() {
				w._hoover(this);
			});
			
			w.d.intHTML.on(w.drag.eStart, '.ui-datebox-sliderow-int', function(e) {
				if ( !w.drag.move ) {
					w.drag.move = true;
					w.drag.target = $(this);
					w.drag.pos = parseInt(w.drag.target.css('marginLeft').replace(/px/i, ''),10);
					w.drag.start = w.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
					w.drag.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		'slidebox': function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && o.mode === 'slidebox') {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
					g.target.css('marginLeft', (g.pos + g.end - g.start) + 'px');
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && o.mode === 'slidebox' ) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.find('div').first();
						w._offset(g.target.jqmData('rowtype'), ( w.__('isRTL') ? -1 : 1 )*(parseInt((g.start - g.end) / g.tmp.innerWidth(),10))*(g.target.jqmData('rowtype')==='i'?o.minuteStep:1));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
