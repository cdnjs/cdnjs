/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
/* FLIPBOX Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeDateHigh: 'b',
		themeDatePick: 'b',
		themeDate: 'a',
		useSetButton: true,
		validHours: false,
		flen: {'y': 15, 'm':12, 'd':15, 'h':12, 'i':15, 'a':3}
	});
	$.extend( $.mobile.datebox.prototype, {
		'_fbox_pos': function () {
			var w = this,
				ech = null,
				top = null,
				par = this.d.intHTML.find('.ui-datebox-flipcontent').innerHeight(),
				tot = null;
				
			w.d.intHTML.find('.ui-datebox-flipcenter').each(function() {
				ech = $(this);
				top = ech.innerHeight();
				ech.css('top', ((par/2)-(top/2)+4)*-1);
			});
			w.d.intHTML.find('ul').each(function () {
				ech = $(this);
				par = ech.parent().innerHeight();
				top = ech.find('li').first();
				tot = ech.find('li').size() * top.outerHeight();
				top.css('marginTop', ((tot/2)-(par/2)+(top.outerHeight()/2))*-1);
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'timeflipbox': function() {
			this._build.flipbox.apply(this);
		},
		'flipbox': function () {
			var w = this,
				o = this.options, i, y, hRow, tmp, testDate,
				iDate = (w.d.input.val() === "") ? w._startOffset(w._makeDate(w.d.input.val())) : w._makeDate(w.d.input.val()),
				uid = 'ui-datebox-',
				flipBase = $("<div class='ui-overlay-shadow'><ul></ul></div>"),
				ctrl = $("<div>", {"class":uid+'flipcontent'});
			
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.empty();
			}
			
			w.d.input.on('datebox', function (e,p) {
				if ( p.method === 'postrefresh' ) {
					w._fbox_pos();
				}
			});
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():((o.mode==='flipbox')?w.__('titleDateDialogLabel'):w.__('titleTimeDialogLabel')));
			w.d.intHTML = $('<span>')
			
			w.fldOrder = ((o.mode==='flipbox')?w.__('dateFieldOrder'):w.__('timeFieldOrder'));
			w._check();
			w._minStepFix();
			
			if ( o.mode === 'flipbox' ) { $('<div class="'+uid+'header"><h4>'+w._formatter(w.__('headerFormat'), w.theDate)+'</h4></div>').appendTo(w.d.intHTML); }
			
			w.d.intHTML.append(ctrl);
			
			for ( y=0; y<w.fldOrder.length; y++ ) {
				switch (w.fldOrder[y]) {
					case 'y':
						hRow = w._makeEl(flipBase, {'attr': {'field':'y','amount':1} });
						for ( i=o.flen.y*-1; i<(o.flen.y+1); i++ ) {
							tmp = (i!==0)?((iDate.get(0) === (w.theDate.get(0) + i))?o.themeDateHigh:o.themeDate):o.themeDatePick;
							$('<li>', {'class':'ui-body-'+tmp})
								.html('<span>'+(w.theDate.get(0)+i)+'</span>').appendTo(hRow.find('ul'));
						}
						hRow.appendTo(ctrl);
						break;
					case 'm':
						hRow = w._makeEl(flipBase, {'attr': {'field':'m','amount':1} });
						for ( i=o.flen.m*-1; i<(o.flen.m+1); i++ ) {
							testDate = w.theDate.copy([0],[0,0,1]);
							testDate.adj(1,i);
							tmp = (i!==0)?((iDate.get(1) === testDate.get(1) && iDate.get(0) === testDate.get(0))?o.themeDateHigh:o.themeDate):o.themeDatePick;
							$("<li>", { 'class' : 'ui-body-'+tmp})
								.html("<span>"+w.__('monthsOfYearShort')[testDate.getMonth()]+"</span>").appendTo(hRow.find('ul'));
						}
						hRow.appendTo(ctrl);
						break;
					case 'd':
						hRow = w._makeEl(flipBase, {'attr': {'field':'d','amount':1} });
						for ( i=o.flen.d*-1; i<(o.flen.d+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(2,i);
							tmp = (i!==0)?((iDate.comp() === testDate.comp())?o.themeDateHigh:o.themeDate):o.themeDatePick;
							if ( ( o.blackDates !== false && $.inArray(testDate.iso(), o.blackDates) > -1 ) ||
								( o.blackDays !== false && $.inArray(testDate.getDay(), o.blackDays) > -1 ) ) {
								tmp += ' '+uid+'griddate-disable';
							}
							$("<li>", { 'class' : 'ui-body-'+tmp})
								.html("<span>"+testDate.getDate()+"</span>").appendTo(hRow.find('ul'));
						}
						hRow.appendTo(ctrl);
						break;
					case 'h':
						hRow = w._makeEl(flipBase, {'attr': {'field':'h','amount':1} });
						for ( i=o.flen.h*-1; i<(o.flen.h+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(3,i);
							tmp = (i!==0)?o.themeDate:o.themeDatePick;
							if ( o.validHours !== false && $.inArray(testDate.get(3), o.validHours) < 0 ) {
								tmp += ' '+uid+'griddate-disable';
							}
							$("<li>", { 'class' : 'ui-body-'+tmp})
								.html("<span>"+((w.__('timeFormat')===12) ? (( testDate.get(3) === 0 ) ? '12' : (( testDate.get(3) < 13 ) ? testDate.get(3) : (testDate.get(3)-12))) : testDate.get(3))+"</span>").appendTo(hRow.find('ul'));
						}
						hRow.appendTo(ctrl);
						break;
					case 'i':
						hRow = w._makeEl(flipBase, {'attr': {'field':'i','amount':o.minuteStep} });
						for ( i=o.flen.i*-1; i<(o.flen.i+1); i++ ) {
							testDate = w.theDate.copy();
							testDate.adj(4,(i*o.minuteStep));
							tmp = (i!==0)?o.themeDate:o.themeDatePick;
							$("<li>", { 'class' : 'ui-body-'+tmp})
								.html("<span>"+w._zPad(testDate.get(4))+"</span>").appendTo(hRow.find('ul'));
						}
						hRow.appendTo(ctrl);
						break;
					case 'a':
						if ( w.__('timeFormat') !== 12 ) { break; }
						hRow = w._makeEl(flipBase, {'attr': {'field':'a','amount':1} });
						testDate = $("<li class='ui-body-"+o.themeDate+"'><span> </span></li>");
						
						for ( i=0; i<o.flen.a; i++ ) { testDate.clone().appendTo(hRow.find('ul')); }
						if ( w.theDate.get(3) < 12 ) { testDate.clone().appendTo(hRow.find('ul')); }
						
						tmp = (w.theDate.get(3) > 11) ? [o.themeDate,o.themeDatePick] : [o.themeDatePick,o.themeDate];
						
						$("<li>", { 'class' : 'ui-body-'+tmp[0]}).html('<span>'+w.__('meridiem')[0]+'</span>').appendTo(hRow.find('ul'));
						$("<li>", { 'class' : 'ui-body-'+tmp[1]}).html('<span>'+w.__('meridiem')[1]+'</span>').appendTo(hRow.find('ul'));
						
						if ( w.theDate.get(3) > 11 ) { testDate.clone().appendTo(hRow.find('ul')); }
						for ( i=0; i<o.flen.a; i++ ) { testDate.clone().appendTo(hRow.find('ul')); }
						
						hRow.appendTo(ctrl);
						break;
				}
			}
			
			$("<div>", {"class":uid+'flipcenter ui-overlay-shadow'}).css('pointerEvents', 'none').appendTo(w.d.intHTML);
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $('<div>', {'class':uid+'controls'});
				
				if ( o.useSetButton ) {
					$('<a href="#">'+((o.mode==='flipbox')?w.__('setDateButtonLabel'):w.__('setTimeButtonLabel'))+'</a>')
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
				w.d.intHTML.on('mousewheel', '.ui-overlay-shadow', function(e,d) {
					e.preventDefault();
					w._offset($(this).jqmData('field'), ((d<0)?-1:1)*$(this).jqmData('amount'));
				});
			}
			
			w.d.intHTML.on(w.drag.eStart, 'ul', function(e,f) {
				if ( !w.drag.move ) {
					if ( typeof f !== "undefined" ) { e = f; }
					w.drag.move = true;
					w.drag.target = $(this).find('li').first();
					w.drag.pos = parseInt(w.drag.target.css('marginTop').replace(/px/i, ''),10);
					w.drag.start = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					w.drag.end = false;
					e.stopPropagation();
					e.preventDefault();
				}
			});
			
			w.d.intHTML.on(w.drag.eStart, '.'+uid+'flipcenter', function(e) { // Used only on old browsers and IE.
				if ( !w.drag.move ) {
					w.drag.target = w.touch ? e.originalEvent.changedTouches[0].pageX - $(e.currentTarget).offset().left : e.pageX - $(e.currentTarget).offset().left;
					w.drag.tmp = w.d.intHTML.find('.'+uid+'flipcenter').innerWidth() / (( $.inArray('a', w.fldOrder) > -1 && w.__('timeFormat') !== 12 )?w.fldOrder.length-1:w.fldOrder.length);
					$(w.d.intHTML.find('ul').get(parseInt(w.drag.target / w.drag.tmp,10))).trigger(w.drag.eStart,e);
				}
			});
		}
	});
	$.extend( $.mobile.datebox.prototype._drag, {
		'timeflipbox': function() {
			this._drag.flipbox.apply(this);
		},
		'flipbox': function() {
			var w = this,
				o = this.options,
				g = this.drag;
			
			$(document).on(g.eMove, function(e) {
				if ( g.move && ( o.mode === 'flipbox' || o.mode === 'timeflipbox' )) {
					g.end = w.touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
					g.target.css('marginTop', (g.pos + g.end - g.start) + 'px');
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});
			
			$(document).on(g.eEnd, function(e) {
				if ( g.move && (o.mode === 'flipbox' || o.mode === 'timeflipbox' )) {
					g.move = false;
					if ( g.end !== false ) {
						e.preventDefault();
						e.stopPropagation();
						g.tmp = g.target.parent().parent();
						w._offset(g.tmp.jqmData('field'), (parseInt((g.start - g.end) / g.target.innerHeight(),10) * g.tmp.jqmData('amount')));
					}
					g.start = false;
					g.end = false;
				}
			});
		}
	});
})( jQuery );
